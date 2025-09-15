'use client'
import React from 'react'
import dynamic from 'next/dynamic'

const OpenStreetMap = dynamic(() => import('@/components/Map').then((mod) => mod.OpenStreetMap), {
    ssr: false,
})
import type { MapBlock as MapBlockProps } from '@/payload-types'

export const MapBlock: React.FC<MapBlockProps> = (props) => {
    const { mapLinkText, location, width, height } = props
    return (
        // <OpenStreetMap
        //   mapLinkText={mapLinkText ?? undefined}
        //   location={location}
        //   width={width}
        //   height={height}
        // />
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2300.56236611256!2d18.408894613063456!3d54.78765947262858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46fdb32f95cf02cf%3A0xfcf48b7120f7d8e5!2zUG9rb2plIEdvxZtjaW5uZSAiSnVzdHluYSIgV8WCYWR5c8WCYXdvd28!5e0!3m2!1spl!2spl!4v1757936207407!5m2!1spl!2spl"
            width={width}
            height={height}
            className={`border-none border-0 max-w-[91vw]`}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
    )
}
