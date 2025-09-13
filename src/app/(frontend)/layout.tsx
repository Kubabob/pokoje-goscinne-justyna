import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { Montserrat } from 'next/font/google'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
// import UmamiConsent from '@/components/GDPRConsent/Umami'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import Script from 'next/script'
import { GoUpButton } from '@/components/GoUpButton'

const montserrat = Montserrat({ style: ['normal'], subsets: ['latin'] })

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const { isEnabled } = await draftMode()

    return (
        <html className={cn(montserrat.className)} lang="pl" suppressHydrationWarning>
            <head>
                <InitTheme />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
                <Script
                    async
                    defer
                    src="http://135.125.106.137:2345/script.js"
                    data-website-id="5b02b132-7d68-4069-941c-ddc27fd5ec61"
                ></Script>
            </head>
            <body className="flex flex-col min-h-screen">
                <Providers>
                    {/* <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          /> */}

                    <Header />
                    {children}
                    {/*<UmamiConsent />*/}
                    <GoUpButton />
                    <Footer />
                </Providers>
            </body>
        </html>
    )
}

export const metadata: Metadata = {
    metadataBase: new URL(getServerSideURL()),
    openGraph: mergeOpenGraph(),
    twitter: {
        card: 'summary_large_image',
        creator: '@payloadcms',
    },
}
