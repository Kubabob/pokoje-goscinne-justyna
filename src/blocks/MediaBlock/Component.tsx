import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'

import { Media } from '../../components/Media'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
    enableCustomCaption,
    customCaptionType,
    customCaption,
  } = props

  let caption
  if (media && typeof media === 'object') caption = media.caption

  return (
    <div
      className={cn(
        'mx-auto',
        {
          container: enableGutter,
        },
        className,
      )}
      data-umami-event="media-block-view"
    >
      {(media || staticImage) && (
        <>
          <div className="relative md:w-full mx-auto h-full">
            <Media
              imgClassName={cn('border border-border w-full h-full object-cover', imgClassName)}
              resource={media}
              src={staticImage}
              data-umami-event="media-interaction"
            />
            <div className="absolute inset-0 bg-brand-blue/30 mix-blend-multiply" />
            {customCaption && customCaptionType === 'onTop' && (
              <div
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white backdrop-blur-sm p-4 w-1/2 h-20 flex items-center justify-center rounded-t-lg"
                data-umami-event="media-caption-top-view"
              >
                <p className="font-semibold text-2xl text-center">{customCaption}</p>
              </div>
            )}
          </div>
        </>
      )}
      {customCaption && customCaptionType !== 'onTop' && (
        <div
          className={cn(
            'mt-6',
            {
              container: !disableInnerContainer,
            },
            captionClassName,
          )}
          data-umami-event="media-caption-bottom-view"
        >
          {customCaption}
        </div>
      )}
      {!enableCustomCaption && caption && (
        <div
          className={cn(
            'mt-6',
            {
              container: !disableInnerContainer,
            },
            captionClassName,
          )}
          data-umami-event="media-default-caption-view"
        >
          <RichText data={caption} enableGutter={false} />
        </div>
      )}
    </div>
  )
}
