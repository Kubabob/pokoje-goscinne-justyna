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
        '',
        {
          container: enableGutter,
        },
        className,
      )}
    >
      {(media || staticImage) && (
        <>
          <div className="relative w-fit">
            <Media
              imgClassName={cn('border border-border rounded-[0.8rem]', imgClassName)}
              resource={media}
              src={staticImage}
            />
            {customCaption && customCaptionType === 'onTop' && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white p-2 w-1/2 text-center">
                <RichText data={customCaption} enableGutter={false} />
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
        >
          <RichText data={customCaption} enableGutter={false} />
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
        >
          <RichText data={caption} enableGutter={false} />
        </div>
      )}
    </div>
  )
}
