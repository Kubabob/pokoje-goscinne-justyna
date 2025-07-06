import { StaticImageData } from 'next/image'
import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { TextMediaBlock as TextMediaBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

type Props = TextMediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const TextMediaBlock: React.FC<Props> = (props) => {
  const {
    mediaPosition,
    enableButton,
    linkButton,
    head,
    body,
    media,
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    staticImage,
    disableInnerContainer,
  } = props

  let caption
  if (media && typeof media === 'object') caption = media.caption

  return (
    <div className="container my-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-8 gap-x-16">
        {/* Text content div */}
        <div className={cn(mediaPosition === 'right' ? 'lg:order-1' : 'lg:order-2')}>
          {head && <h2 className="text-black">{head}</h2>}
          {body && <RichText data={body} />}
          {enableButton && linkButton && <CMSLink {...linkButton} className="btn mt-4"></CMSLink>}
        </div>

        {/* Media content div */}
        <div
          className={cn(
            '',
            {
              container: enableGutter,
            },
            className,
            mediaPosition === 'right' ? 'lg:order-2' : 'lg:order-1',
          )}
        >
          {(media || staticImage) && (
            <Media
              imgClassName={cn('border border-border rounded-[0.8rem]', imgClassName)}
              resource={media}
              src={staticImage}
            />
          )}
          {caption && (
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
      </div>
    </div>
  )
}
