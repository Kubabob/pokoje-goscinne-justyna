import React from 'react'
import type { Opinion as OpinionProps } from '@/payload-types'
import RichText from '@/components/RichText'

export const Opinions: React.FC<OpinionProps> = (props) => {
  const { author, opinion } = props

  return (
    <div className="container my-16">
      {author && <h2 className="text-black">{author}</h2>}
      {opinion && <RichText data={opinion} />}
    </div>
  )
}
