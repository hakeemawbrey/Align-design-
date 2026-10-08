import type { CapacitorConfig } from '@capacitor/cli'

/**
 * iOS app: the same web app, built into dist/ and wrapped natively.
 * Build: npm run ios  (needs a Mac with Xcode; see README → iOS app)
 */
const config: CapacitorConfig = {
  appId: 'app.align.ios',
  appName: 'Align',
  webDir: 'dist',
  backgroundColor: '#0B0620',
  ios: {
    contentInset: 'never',
    backgroundColor: '#0B0620',
    // swipes are the whole app: no rubber-band scroll on the web view
    scrollEnabled: false,
  },
}

export default config
