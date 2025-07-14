// 'use client'
import React from 'react'

import { OpenStreetMap } from '@/components/Map'
import type { MapBlock as MapBlockProps } from '@/payload-types'

export const MapBlock: React.FC<MapBlockProps> = (props) => {
  const { mapLinkText, location, width, height } = props
  return (
    <OpenStreetMap mapLinkText={mapLinkText} location={location} width={width} height={height} />
  )
}
