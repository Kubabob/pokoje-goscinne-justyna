// // 'use client'
// import React from 'react'

// type Location = [longtitude: number, latitude: number]
// type OpenStreetMapType = {
//   mapLinkText?: string
//   location: Location
//   width?: number | null
//   height?: number | null
// }

// export const OpenStreetMap: React.FC<OpenStreetMapType> = (props) => {
//   const { mapLinkText, location, width, height } = props

//   const bbox = [location[0] - 0.005, location[1] - 0.003, location[0] + 0.005, location[1] + 0.003]
//   return (
//     <>
//       {/* <iframe
//         width={`${width}`}
//         height={`${height}`}
//         src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox[0]},${bbox[1]},${bbox[2]},${bbox[3]}&amp;layer=mapnik&amp;marker=${location[1]},${location[0]};layers=M`}
//       ></iframe>
//       <small className="text-black">
//         <a
//           className="text-black"
//           href={`https://www.openstreetmap.org/?mlat=${location[1]}&amp;mlon=${location[0]}#map=17/${location[1]}/${location[0]}&amp;layers=M&marker=1`}
//         >
//           {mapLinkText}
//         </a>
//       </small> */}
//       <iframe
//         width="425"
//         height="350"
//         src="https://www.openstreetmap.org/export/embed.html?bbox=18.40342998504639,54.785790225620836,18.419533967971805,54.789477284183114&amp;layer=mapnik&amp;marker=54.78763689009598,18.411481976509094"
//       ></iframe>
//       <br />
//       <small>
//         <a href="https://www.openstreetmap.org/?mlat=54.787637&amp;mlon=${location[0]}#map=17/54.787634/${location[0]}">
//           View Larger Map
//         </a>
//       </small>
//     </>
//   )
// }

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
