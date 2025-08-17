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
    enableGutter = false,
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
            // 'w-3/4 min-h-80',
            {
              container: enableGutter,
            },
            className,
            mediaPosition === 'right' ? 'lg:order-2' : 'lg:order-1',
          )}
        >
          {(media || staticImage) && (
            <Media
              imgClassName={cn(
                'md:w-4/5 md:min-h-80 object-cover border border-border',
                imgClassName,
              )}
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
            'relative md:pl-8',
            mediaPosition === 'right' ? 'lg:order-1' : 'lg:order-2',
            'content-center',
          )}
        >
          {head && (
            <h2
              className={cn(
                robotoSerif.className,
                'text-brand-blue font-bold tracking-[0.02em] text-3xl mb-4 text-left',
              )}
            >
              {head}
            </h2>
          )}

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute -left-10 top-0 bottom-0 w-[2px] bg-brand-blue hidden md:block"></div>
            {body && (
              <div className="text-brand-blue mb-6 text-left">
                <RichText data={body} className="px-0 text-left" />
              </div>
            )}

            {enableButton && linkButton && (
              <CMSLink
                {...linkButton}
                className="btn mt-2 hover:opacity-90 transition-opacity text-brand-white text-left"
              ></CMSLink>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
