import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    // <img
    //   alt="Payload Logo"
    //   width={193}
    //   height={34}
    //   loading={loading}
    //   fetchPriority={priority}
    //   decoding="async"
    //   className={clsx(className)}
    //   src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-logo-light.svg"
    // />
    <div className={clsx('logo', className)}>
      <svg
        width="193"
        height="34"
        viewBox="0 0 193 34"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text x="0" y="24" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold">
          Pokoje Justyna
        </text>
      </svg>
    </div>
  )
}
