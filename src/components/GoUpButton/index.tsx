'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export const GoUpButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false)

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset >= innerHeight / 2) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }
        window.addEventListener('scroll', toggleVisibility)

        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    return (
        // <p hidden={!isVisible} className="fixed right-4 bottom-10" onClick={scrollToTop}>
        //     Go Up
        // </p>
        <div
            className="fixed right-0 bottom-4 md:right-4 md:bottom-10 transform -translate-x-1/2 cursor-pointer z-20"
            onClick={scrollToTop}
            hidden={!isVisible}
        >
            <div className="flex items-center justify-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    viewBox="0 0 24 24"
                    className="arrow-animation"
                    fill="#E0B973"
                    aria-hidden="true"
                    focusable="false"
                >
                    <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" />
                    <path
                        transform="rotate(180 12 12)"
                        d="M12 12.586 8.707 9.293l-1.414 1.414L12 15.414l4.707-4.707-1.414-1.414L12 12.586z"
                    />
                </svg>
            </div>
        </div>
    )
}
