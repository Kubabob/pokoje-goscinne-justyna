declare global {
  interface Window {
    // This property is used to signal to Umami whether to track the user.
    // It's set to `true` if the user declines consent.
    doNotTrack?: boolean

    // This is the Umami tracking object, which becomes available after
    // the Umami script has loaded.
    umami?: {
      // The track function allows you to manually record events.
      track: (event: string) => void
    }
  }
}

// By adding `export {}`, we ensure this file is treated as a module.
// This is a common practice in TypeScript declaration files.
export {}
