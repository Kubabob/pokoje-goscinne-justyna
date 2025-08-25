'use client'
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

// --- Helper function to get the consent value ---
// This function safely accesses localStorage only on the client-side.
const getUmamiConsent = () => {
  if (typeof window === 'undefined') {
    return null
  }
  return window.localStorage.getItem('umami-consent')
}

// --- Main Consent Banner Component ---
export default function UmamiConsent() {
  // State to control the visibility of the banner.
  // It defaults to false and is updated client-side.
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // We run this logic only on the client.
    const consent = getUmamiConsent()

    // If consent is not given ('false') or has been explicitly denied,
    // we tell Umami not to track.
    if (consent === 'false') {
      window.doNotTrack = true
    }

    // If no choice has been made yet (consent is null), we show the banner.
    if (consent === null) {
      setShowBanner(true)
    }
  }, [])

  // --- Event Handlers ---

  const handleAccept = () => {
    // Store the user's consent.
    window.localStorage.setItem('umami-consent', 'true')

    // Ensure Umami tracking is enabled.
    window.doNotTrack = false

    // Hide the banner.
    setShowBanner(false)

    // Optional: You might want to track a specific event for consent.
    if (window.umami) {
      window.umami.track('consent-given')
    }
  }

  const handleDecline = () => {
    // Store the user's decision.
    window.localStorage.setItem('umami-consent', 'false')

    // Disable Umami tracking.
    window.doNotTrack = true

    // Hide the banner.
    setShowBanner(false)

    // Optional: Track the decline event.
    if (window.umami) {
      window.umami.track('consent-declined')
    }
  }

  // If the banner shouldn't be shown, render nothing.
  if (!showBanner) {
    return null
  }

  // --- Render the Banner ---
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-brand-blue text-brand-white p-4 shadow-lg">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-4 md:px-6">
        <p className="text-sm text-brand-white text-center sm:text-left">
          Używamy plików cookie do analizy ruchu na stronie i ulepszania Twoich doświadczeń.
          Akceptując, zgadzasz się na użycie przez nas analityki.
        </p>
        <div className="flex-shrink-0 flex items-center gap-3">
          <Button
            onClick={handleDecline}
            variant="orange"
            size="default"
            className="border-brand-white text-brand-white hover:bg-brand-white/10"
          >
            Odrzuć
          </Button>
          <Button
            onClick={handleAccept}
            variant="orange"
            size="default"
            className="bg-brand-white text-brand-blue hover:bg-brand-white/90"
          >
            Akceptuj
          </Button>
        </div>
      </div>
    </div>
  )
}
