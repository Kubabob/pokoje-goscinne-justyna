import clsx from 'clsx'
import React from 'react'
import { Roboto_Serif } from 'next/font/google'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

const robotoSerif = Roboto_Serif({ subsets: ['latin'] })

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    <div
      className={clsx(
        'logo flex flex-col items-center text-brand-white',
        className,
        robotoSerif.className,
      )}
      aria-label="Pokoje Gościnne Justyna"
    >
      {/* Fix for "POKOJE" with letter spacing offset correction */}
      <h1 className="tracking-[15px] text-xs font-bold text-center relative">
        <span className="inline-block ml-[15px]">POKOJE</span>
      </h1>
      <h1 className="tracking-[15px] text-xs font-bold text-center relative">
        <span className="inline-block ml-[15px]">GOŚCINNE</span>
      </h1>
      <h2 className="tracking-wide text-5xl text-center">Justyna</h2>
    </div>
  )
}
