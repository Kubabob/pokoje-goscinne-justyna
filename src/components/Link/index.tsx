import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import type { Page, Post } from '@/payload-types'
import type { Media } from '@/payload-types'

type CMSLinkType = {
    appearance?: 'inline' | 'image' | ButtonProps['variant']
    children?: React.ReactNode
    className?: string
    label?: string | null
    newTab?: boolean | null
    reference?: {
        relationTo: 'pages' | 'posts'
        value: Page | Post | string | number
    } | null
    size?: ButtonProps['size'] | null
    type?: 'custom' | 'reference' | null
    url?: string | null
    image?: (number | null) | Media
    additionalImage?: (number | null) | Media
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
    const {
        type,
        appearance = 'inline',
        children,
        className,
        label,
        newTab,
        reference,
        size: sizeFromProps,
        url,
        image,
        additionalImage,
        onClick,
    } = props

    const href =
        type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
            ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
                  reference.value.slug
              }`
            : url

    if (!href) return null

    const size = appearance === 'link' ? 'clear' : sizeFromProps
    const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

    /* Ensure we don't break any styles set by richText */
    if (appearance === 'inline') {
        return (
            <Link
                className={cn(className)}
                href={href || url || ''}
                {...newTabProps}
                onClick={onClick}
            >
                {label && label}
                {children && children}
            </Link>
        )
    }

    /* Handle image buttons */
    if (appearance === 'image' && image && typeof image === 'object') {
        return (
            <Link
                href={href || url || ''}
                {...newTabProps}
                className={cn(className)}
                onClick={onClick}
            >
                {image.url && (
                    <Image
                        src={image.url}
                        alt={image.alt || label || 'Button image'}
                        width={image.width || 300}
                        height={image.height || 200}
                        className=""
                    />
                )}
            </Link>
        )
    } else if (additionalImage && typeof additionalImage === 'object') {
        return (
            <Button asChild className={className} size={size} variant={appearance}>
                <Link
                    className={cn(className)}
                    href={href || url || ''}
                    {...newTabProps}
                    onClick={onClick}
                >
                    <span className="flex items-center gap-2">
                        {additionalImage.url && (
                            <Image
                                src={additionalImage.url}
                                alt={additionalImage.alt || label || 'Button image'}
                                width={size === 'sm' ? 18 : size === 'lg' ? 28 : 24}
                                height={size === 'sm' ? 18 : size === 'lg' ? 28 : 24}
                                className="object-contain"
                            />
                        )}

                        {(label || children) && (
                            <span>
                                {label && label}
                                {children && children}
                            </span>
                        )}
                    </span>
                </Link>
            </Button>
        )
    } else {
        return (
            <Button asChild className={className} size={size} variant={appearance}>
                <Link
                    className={cn(className)}
                    href={href || url || ''}
                    {...newTabProps}
                    onClick={onClick}
                >
                    {label && label}
                    {children && children}
                </Link>
            </Button>
        )
    }
}
