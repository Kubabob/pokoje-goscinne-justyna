'use client'

import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import React from 'react'
import { DateRange } from 'react-day-picker'
import { addDays } from 'date-fns'
import { pl } from 'date-fns/locale'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/utilities/ui'
import { DateField } from './type'
import { Control, Controller, FieldErrorsImpl } from 'react-hook-form'
import { FieldValues } from '@payloadcms/plugin-form-builder/types'
import { Error } from '../Error'
import { Width } from '../Width'
import { Label } from '@/components/ui/label'

export const DatePicker: React.FC<
    DateField & {
        control: Control<FieldValues, any>
        errors: Partial<
            FieldErrorsImpl<{
                [x: string]: any
            }>
        >
    }
> = ({ name, control, errors, label, required, width }) => {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 20),
    })
    return (
        <Width width={width}>
            <Label htmlFor={name}>
                {label}
                {required && <span className="ml-1 text-red-500">*</span>}
            </Label>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => {
                    return (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={'outline'}
                                    className={cn(
                                        'w-full pl-3 text-left font-normal',
                                        // mobile-first: allow automatic height, padding and multiline text
                                        'h-auto py-2 leading-tight whitespace-pre-line break-words items-start',
                                        !value && 'text-muted-foreground',
                                    )}
                                >
                                    {value ? (
                                        typeof value === 'string' ? (
                                            format(new Date(value), 'PPP', { locale: pl })
                                        ) : (value as any).from ? (
                                            (value as any).to ? (
                                                // Desktop: inline range. Mobile: stacked with a blank line between dates.
                                                <>
                                                    <span className="hidden md:block">
                                                        {`${format((value as any).from as Date, 'PPP', { locale: pl })} — ${format((value as any).to as Date, 'PPP', { locale: pl })}`}
                                                    </span>
                                                    <span className="block md:hidden">
                                                        {format(
                                                            (value as any).from as Date,
                                                            'PPP',
                                                            { locale: pl },
                                                        )}
                                                        <br />
                                                        -
                                                        <br />
                                                        {format((value as any).to as Date, 'PPP', {
                                                            locale: pl,
                                                        })}
                                                    </span>
                                                </>
                                            ) : (
                                                format((value as any).from as Date, 'PPP', {
                                                    locale: pl,
                                                })
                                            )
                                        ) : (
                                            <span>Wybierz termin</span>
                                        )
                                    ) : (
                                        <span>Wybierz termin</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50 self-start md:self-center" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-background" align="start">
                                <Calendar
                                    required
                                    className="bg-brand-white"
                                    captionLayout="dropdown"
                                    mode="range"
                                    selected={date}
                                    onSelect={(selected) => {
                                        setDate(selected)
                                        onChange(selected)
                                    }}
                                    locale={pl}
                                    // disabled={(date) =>
                                    //     date > new Date() || date < new Date('1900-01-01')
                                    // }
                                />
                            </PopoverContent>
                        </Popover>
                    )
                }}
                rules={{ required }}
            />
            {required && errors[name] && <Error name={name} />}
        </Width>
    )
}
