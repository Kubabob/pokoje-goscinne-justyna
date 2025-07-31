import { Roboto_Serif } from 'next/font/google'
import { StaticImageData } from 'next/image'
import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { TextMediaBlock as TextMediaBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

const robotoSerif = Roboto_Serif({ subsets: ['latin'] })

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
              imgClassName={cn('border border-border', imgClassName)}
              resource={media}
              src={staticImage}
            />
          )}
          {caption && (
            <div
              className={cn(
                'mt-4',
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

        {/* Text content div with vertical line */}
        <div
          className={cn(
            'relative pl-8',
            mediaPosition === 'right' ? 'lg:order-1' : 'lg:order-2',
            'content-center',
          )}
        >
          {head && (
            <h2
              className={cn(
                robotoSerif.className,
                'text-brand-blue font-bold tracking-[0.02em] text-3xl mb-4',
              )}
            >
              {head}
            </h2>
          )}

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute -left-10 top-0 bottom-0 w-[2px] bg-brand-blue hidden md:block"></div>
            {body && (
              <div className="text-brand-blue mb-6">
                <RichText data={body} className="px-0" />
              </div>
            )}

            {enableButton && linkButton && (
              <CMSLink
                {...linkButton}
                className="btn mt-2 hover:opacity-90 transition-opacity text-brand-white"
              ></CMSLink>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
