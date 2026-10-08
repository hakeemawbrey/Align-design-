import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './fonts'
import './index.css'
import App from './App.tsx'
import { initApi } from './api'
import { isNative, setupNative } from './lib/native'

setupNative()

// sign in and load your matches while the splash plays
void initApi()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// installable + offline after the first visit (production builds only)
// (not inside the iOS app: its files are already on the phone)
if (import.meta.env.PROD && !isNative && 'serviceWorker' in navigator && window.isSecureContext) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((e) => console.warn('[align] service worker not registered', e))
  })
}
