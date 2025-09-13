'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import nodemailer from 'nodemailer'
import { format } from 'date-fns'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'
import { it } from 'node:test'

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
    const [hasSubmitted, setHasSubmitted] = useState<boolean>()
    const [error, setError] = useState<{ message: string; status?: string } | undefined>()
    const router = useRouter()

    const onSubmit = useCallback(
        (data: FormFieldBlock[]) => {
            let loadingTimerID: ReturnType<typeof setTimeout>
            const submitForm = async () => {
                setError(undefined)

                const dataToSend = Object.entries(data).map(([name, value]) => ({
                    field: name,
                    value,
                }))

                // delay loading indicator by 1s
                loadingTimerID = setTimeout(() => {
                    setIsLoading(true)
                }, 500)

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

                    clearTimeout(loadingTimerID)

                    if (req.status >= 400) {
                        setIsLoading(false)

                        setError({
                            message: res.errors?.[0]?.message || 'Internal Server Error',
                            status: res.status,
                        })

                        return
                    }

                    // Send email notification using nodemailer
                    try {
                        // Create HTML email body from form data
                        const formatSubmissionValue = (value: any) => {
                            if (value == null) return ''
                            if (typeof value === 'string') return value
                            if (Array.isArray(value)) return value.join(', ')
                            if (value instanceof Date) return format(value, 'PPP')
                            if (typeof value === 'object') {
                                if ('from' in value) {
                                    const from = value.from
                                        ? format(new Date(value.from), 'PPP')
                                        : ''
                                    const to = value.to ? format(new Date(value.to), 'PPP') : ''
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
                                subject: `Zapytanie ze strony numer ${formID}`,
                                html: emailHtml,
                                text: `Zapytanie ze strony numer ${formID}`,
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
        [router, formID, redirect, confirmationType],
    )

    return (
        <div className="container lg:max-w-[48rem]">
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
                        <form id={formID} onSubmit={handleSubmit(onSubmit)}>
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
                                form={formID}
                                disabled={hasSubmitted}
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
