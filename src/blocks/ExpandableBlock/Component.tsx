import type { StaticImageData } from 'next/image'
import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import type { ExpandableBlock as ExpandableBlockProps } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { Media } from '@/components/Media'

type Props = ExpandableBlockProps & {
  imgClassName?: string
  staticImage?: StaticImageData
}

export const ExpandableBlock: React.FC<Props> = (props) => {
  const {
    enableMedia,
    mediaItems,
    title,
    enableButton,
    buttonText,
    inside,
    staticImage,
    imgClassName,
  } = props

  return (
    <>
      {/* <div className="relative w-fit">
        {(media || staticImage) && (
          <Media imgClassName={cn('border', imgClassName)} resource={media} src={staticImage} />
        )}
      </div> */}
      {mediaItems &&
        mediaItems.map(({ media }, id) => {
          return <Media imgClassName={cn('border', imgClassName)} resource={media} key={id} />
        })}
      {title && <h3 className="bg-blue-500">{title}</h3>}
      <div>
        <details>
          <summary>Szczegóły</summary>
          {inside?.content && <RichText data={inside?.content} />}
        </details>
        {enableButton && buttonText && (
          <Button variant={'orange'}>
            <RichText data={buttonText} />
          </Button>
        )}
      </div>
    </>
  )
}
