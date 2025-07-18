'use client'
import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default markers not showing
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

let DefaultIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

L.Marker.prototype.options.icon = DefaultIcon

type OpenStreetMapType = {
  mapLinkText?: string
  location: [number, number]
  width?: number
  height?: number
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
        <Marker position={[location[1], location[0]]}>
          <Popup>{mapLinkText}</Popup>
        </Marker>
      </MapContainer>
      <small>
        <a
          href={`https://www.openstreetmap.org/?mlat=${location[1]}&mlon=${location[0]}#map=17/${location[1]}/${location[0]}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {mapLinkText}
        </a>
      </small>
    </div>
  )
}
