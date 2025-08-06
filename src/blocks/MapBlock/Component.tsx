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
    <OpenStreetMap mapLinkText={mapLinkText} location={location} width={width} height={height} />
  )
}
