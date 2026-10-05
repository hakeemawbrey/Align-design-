import { useRef } from 'react'
import { resetDemo } from '../lib/demo'
import { sfx } from '../lib/sfx'

/** iOS-style status bar, 9:41. Sits at the top of every screen. Triple-tap the clock to reset the demo. */
export default function StatusBar({ dim = false }: { dim?: boolean }) {
  const taps = useRef<number[]>([])
  const onClock = () => {
    const now = Date.now()
    taps.current = [...taps.current.filter((t) => now - t < 900), now]
    if (taps.current.length >= 3) { taps.current = []; sfx.sparkle(); resetDemo() }
  }
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 50, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 30px 0 34px', pointerEvents: 'none', opacity: dim ? 0.5 : 1,
      fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 16, color: 'var(--label-1)',
    }}>
      <span onClick={onClock} style={{ pointerEvents: 'auto', cursor: 'default', padding: '6px 10px', margin: '-6px -10px' }}>9:41</span>
      <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor"><rect x="0" y="7" width="3" height="4" rx="1"/><rect x="4.5" y="5" width="3" height="6" rx="1"/><rect x="9" y="2.5" width="3" height="8.5" rx="1"/><rect x="13.5" y="0" width="3" height="11" rx="1"/></svg>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor"><path d="M7.5 2.2c2 0 3.9.8 5.3 2.1l1.1-1.1A9 9 0 0 0 7.5.6 9 9 0 0 0 1.1 3.2l1.1 1.1A7.6 7.6 0 0 1 7.5 2.2Zm0 3.1c1.2 0 2.3.4 3.1 1.2l1.1-1.1a6 6 0 0 0-8.4 0l1.1 1.1c.8-.8 1.9-1.2 3.1-1.2Zm0 3.1c-.5 0-.9.2-1.2.5L7.5 10l1.2-1.1c-.3-.3-.7-.5-1.2-.5Z"/></svg>
        <svg width="26" height="12" viewBox="0 0 26 12" fill="none"><rect x=".5" y=".5" width="22" height="11" rx="3.5" stroke="currentColor" opacity=".4"/><rect x="2" y="2" width="19" height="8" rx="2" fill="currentColor"/><rect x="23.5" y="4" width="1.6" height="4" rx=".8" fill="currentColor" opacity=".5"/></svg>
      </span>
    </div>
  )
}
