'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState, useId } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { format } from 'date-fns'
import { pl } from 'date-fns/locale'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'

export type FormBlockType = {
    blockName?: string
    blockType?: 'formBlock'
    enableIntro: boolean
    form: FormType
    introContent?: SerializedEditorState
}

export const FormBlock: React.FC<
    {
        id?: string
    } & FormBlockType
> = (props) => {
    const {
        enableIntro,
        form: formFromProps,
        form: {
            id: formID,
            confirmationMessage,
            confirmationType,
            redirect,
            submitButtonLabel,
        } = {},
        introContent,
    } = props
    const instanceId = useId()
    const formElementId = props.id ?? formID ?? `form-${instanceId}`

    const formMethods = useForm({
        defaultValues: formFromProps.fields,
    })
    const {
        control,
        formState: { errors },
        handleSubmit,
        register,
    } = formMethods

    const [isLoading, setIsLoading] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [error, setError] = useState<{ message: string; status?: string } | undefined>()
    const router = useRouter()

    // Client-side stable stringify to compute deterministic fingerprint
    const stableStringify = (value: any): string => {
        if (value === null || typeof value !== 'object') return JSON.stringify(value)
        if (Array.isArray(value)) return '[' + value.map(stableStringify).join(',') + ']'
        const keys = Object.keys(value).sort()
        return (
            '{' +
            keys.map((k) => JSON.stringify(k) + ':' + stableStringify(value[k])).join(',') +
            '}'
        )
    }

    const makeFingerprint = async (payload: unknown): Promise<string> => {
        try {
            const normalized = stableStringify(payload)
            const enc = new TextEncoder().encode(normalized)
            const hashBuffer = await crypto.subtle.digest('SHA-256', enc)
            const hashArray = Array.from(new Uint8Array(hashBuffer))
            return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
        } catch (e) {
            // fallback to a simple base64 of JSON if subtle fails
            return btoa(unescape(encodeURIComponent(JSON.stringify(payload))))
        }
    }

    const onSubmit = useCallback(
        (data: FormFieldBlock[]) => {
            if (isLoading) return
            setError(undefined)
            setIsLoading(true)

            const submitForm = async () => {
                setError(undefined)

                const dataToSend = Object.entries(data).map(([name, value]) => ({
                    field: name,
                    value,
                }))

                // Client-side duplicate check using fingerprint + localStorage
                try {
                    const fp = await makeFingerprint({ formID, submission: dataToSend })
                    const key = `form-fp:${formID}:${fp}`
                    const existing =
                        typeof window !== 'undefined' ? window.localStorage.getItem(key) : null
                    const WINDOW_MS = 1000 * 60 * 2 // 2 minutes
                    if (existing) {
                        const ts = Number(existing)
                        if (!Number.isNaN(ts) && Date.now() - ts < WINDOW_MS) {
                            setIsLoading(false)
                            setError({
                                message:
                                    'Ta wiadomość została już wysłana. Proszę spróbować później.',
                            })
                            return
                        }
                    }
                    if (typeof window !== 'undefined')
                        window.localStorage.setItem(key, String(Date.now()))
                } catch (e) {
                    // fingerprinting failed; continue with submission
                }

                try {
                    // Send to form submission API
                    const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
                        body: JSON.stringify({
                            form: formID,
                            submissionData: dataToSend,
                        }),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        method: 'POST',
                    })

                    const res = await req.json()

                    if (req.status >= 400) {
                        setIsLoading(false)

                        setError({
                            message: res.errors?.[0]?.message || 'Internal Server Error',
                            status: res.status,
                        })

                        return
                    }

                    // Send email notification
                    try {
                        const formatSubmissionValue = (value: any) => {
                            if (value == null) return ''
                            if (typeof value === 'string') return value
                            if (Array.isArray(value)) return value.join(', ')
                            if (value instanceof Date) return format(value, 'PPP', { locale: pl })
                            if (typeof value === 'object') {
                                if ('from' in value) {
                                    const from = value.from
                                        ? format(new Date(value.from), 'PPP', { locale: pl })
                                        : ''
                                    const to = value.to
                                        ? format(new Date(value.to), 'PPP', { locale: pl })
                                        : ''
                                    return to ? `${from} — ${to}` : from
                                }
                                if ('value' in value) return String(value.value)
                                return JSON.stringify(value)
                            }
                            return String(value)
                        }

                        const emailHtml =
                            `<h2>Zapytanie ofertowe - ${props.blockName}</h2><ul>` +
                            dataToSend
                                .map((item) => {
                                    const formatted = formatSubmissionValue(item.value)
                                    if (item.field === 'email') {
                                        const mailto = `mailto:${formatted}?subject=${encodeURIComponent('Zapytanie ofertowe | Pokoje gościnne Justyna')}`
                                        return `<li><strong>${item.field}:</strong> <a href="${mailto}">${formatted}</a></li>`
                                    }
                                    return `<li><strong>${item.field}:</strong> ${formatted}</li>`
                                })
                                .join('') +
                            '</ul>'

                        const emailReq = await fetch(`${getClientSideURL()}/api/send-email`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                subject: `Zapytanie ze strony`,
                                html: emailHtml,
                                text: `Zapytanie ze strony`,
                            }),
                        })

                        const emailRes = await emailReq.json()
                        if (!emailReq.ok) {
                            console.warn('Email notification failed to send:', emailRes)
                        }
                    } catch (emailErr) {
                        console.warn('Error sending email notification:', emailErr)
                    }

                    setIsLoading(false)
                    setHasSubmitted(true)

                    if (confirmationType === 'redirect' && redirect) {
                        const { url } = redirect

                        const redirectUrl = url

                        if (redirectUrl) router.push(redirectUrl)
                    }
                } catch (err) {
                    console.warn(err)
                    setIsLoading(false)
                    setError({
                        message: 'Wystąpił nieoczekiwany błąd.',
                    })
                }
            }

            void submitForm()
        },
        [router, formID, redirect, confirmationType, isLoading],
    )

    return (
        <div className="container lg:max-w-[48rem] py-8">
            {enableIntro && introContent && !hasSubmitted && (
                <RichText className="mb-8 lg:mb-12" data={introContent} enableGutter={false} />
            )}
            <div className="p-4 lg:p-6 border border-border rounded-[0.8rem]">
                <FormProvider {...formMethods}>
                    {!isLoading && hasSubmitted && confirmationType === 'message' && (
                        <RichText data={confirmationMessage} />
                    )}
                    {isLoading && !hasSubmitted && <p>Wysyłanie, proszę czekać</p>}
                    {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
                    {!hasSubmitted && (
                        <form id={formElementId} onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4 last:mb-0">
                                {formFromProps &&
                                    formFromProps.fields &&
                                    formFromProps.fields?.map((field, index) => {
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        const Field: React.FC<any> =
                                            fields?.[field.blockType as keyof typeof fields]
                                        if (Field) {
                                            return (
                                                <div className="mb-6 last:mb-0" key={index}>
                                                    <Field
                                                        form={formFromProps}
                                                        {...field}
                                                        {...formMethods}
                                                        control={control}
                                                        errors={errors}
                                                        register={register}
                                                    />
                                                </div>
                                            )
                                        }
                                        return null
                                    })}
                            </div>

                            <Button
                                disabled={hasSubmitted || isLoading}
                                type="submit"
                                variant="orange"
                            >
                                {submitButtonLabel}
                            </Button>
                        </form>
                    )}
                </FormProvider>
            </div>
        </div>
    )
}
