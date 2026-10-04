import type { ScreenProps } from './types'
import Starfield from '../components/Starfield'

/** PLACEHOLDER — to be built. */
export default function Match({ go }: ScreenProps) {
  return (
    <div style={{ position: 'absolute', inset: 0 }} onClick={() => go('deck')}>
      <Starfield />
      <div className="h-display" style={{ position: 'absolute', top: 380, width: '100%', textAlign: 'center' }}>Match</div>
    </div>
  )
}
