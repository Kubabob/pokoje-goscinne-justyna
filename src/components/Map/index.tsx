'use client'
import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default markers not showing
import icon from 'public/media/marker-icon.png'
import iconShadow from 'public/media/marker-shadow.png'

const DefaultIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
  iconSize: [25, 41],
  iconAnchor: [14, 12],
})

type OpenStreetMapType = {
  mapLinkText?: string
  location: [number, number]
  width: number
  height: number
}

export const OpenStreetMap: React.FC<OpenStreetMapType> = (props) => {
  const { mapLinkText, location, width, height } = props

  return (
    <div>
      <MapContainer
        center={[location[1], location[0]]}
        zoom={15}
        style={{ height: height, width: width }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[location[1], location[0]]} icon={DefaultIcon}>
          <Popup>{mapLinkText}</Popup>
        </Marker>
      </MapContainer>
      <small>
        {mapLinkText && (
          <a
            className="animatedUnderline"
            href={`https://www.openstreetmap.org/?mlat=${location[1]}&mlon=${location[0]}#map=17/${location[1]}/${location[0]}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {mapLinkText}
          </a>
        )}
      </small>
    </div>
  )
}
