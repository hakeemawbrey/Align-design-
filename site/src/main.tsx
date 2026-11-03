import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@app/index.css'
import './site.css'
import Site from './Site'

// the artifact build loads the same faces from Google Fonts instead
if (import.meta.env.MODE !== 'artifact') void import('./fonts')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Site />
  </StrictMode>,
)
