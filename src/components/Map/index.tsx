import React from 'react'

type OpenStreetMapType = {
  caption?: string
}

export const OpenStreetMap: React.FC<OpenStreetMapType> = (props) => {
  const { caption = 'Zobacz większą mapę' } = props
  return (
    <>
      <iframe
        width="425"
        height="350"
        src="https://www.openstreetmap.org/export/embed.html?bbox=18.40342998504639%2C54.78462712397507%2C18.419533967971805%2C54.79067117571774&amp;layer=mapnik&amp;marker=54.787649262772895%2C18.411481976509094"
      ></iframe>
      <small>
        <a href="https://www.openstreetmap.org/?mlat=54.787649&amp;mlon=18.411482#map=17/54.787649/18.411482&amp;layers=N">
          {caption}
        </a>
      </small>
    </>
  )
}
