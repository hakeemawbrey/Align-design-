import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * 390×844 iPhone canvas, scaled to fit the browser window so it records
 * crisply at any size. On a real phone (narrow viewport) it goes full-bleed.
 * In app mode (installed, or any phone) it covers the whole screen, under the
 * real status bar and home indicator, where the fake ones used to sit.
 */
export function isAppMode() {
  if (typeof window === 'undefined') return false
  const standalone = window.matchMedia?.('(display-mode: standalone)').matches || (navigator as { standalone?: boolean }).standalone === true
  const phone = window.matchMedia?.('(pointer: coarse)').matches && Math.min(window.innerWidth, window.innerHeight) < 500
  return Boolean(standalone || phone)
}

export default function PhoneFrame({ children, app = false }: { children: ReactNode; app?: boolean }) {
  const [scale, setScale] = useState(1)
  const [bare, setBare] = useState(false)
  const box = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // measure the area inside the phone's safe-area insets, not the raw window,
    // so the bottom of the app never sits under a home bar or viewer controls
    const fit = () => {
      const r = box.current?.getBoundingClientRect()
      const w = r?.width || window.innerWidth
      const h = r?.height || window.innerHeight
      const isPhone = app || w < 500
      setBare(isPhone)
      setScale(isPhone ? Math.min(w / 390, h / 844) : Math.min((h - 48) / 868, (w - 48) / 414))
    }
    fit()
    window.addEventListener('resize', fit)
    const ro = typeof ResizeObserver !== 'undefined' && box.current ? new ResizeObserver(fit) : null
    if (ro && box.current) ro.observe(box.current)
    return () => { window.removeEventListener('resize', fit); ro?.disconnect() }
  }, [app])

  return (
    <div ref={box} style={{
      position: 'fixed', display: 'grid', placeItems: 'center',
      ...(app ? { inset: 0 } : {
        top: 'env(safe-area-inset-top, 0px)', bottom: 'env(safe-area-inset-bottom, 0px)',
        left: 'env(safe-area-inset-left, 0px)', right: 'env(safe-area-inset-right, 0px)',
      }),
      background: bare ? 'var(--void)' : 'radial-gradient(60% 60% at 50% 40%, #1a0f3a 0%, #07040f 70%)',
    }}>
      <div style={{
        // absolutely centred, then scaled: grid centring pins an oversized item to the top
        position: 'absolute', left: '50%', top: '50%',
        width: 390 + (bare ? 0 : 24), height: 844 + (bare ? 0 : 24),
        transform: `translate(-50%, -50%) scale(${scale})`, transformOrigin: 'center',
        borderRadius: bare ? 0 : 64, padding: bare ? 0 : 12,
        background: bare ? 'none' : 'linear-gradient(145deg, #2a2438, #0d0a14 40%, #1d1828)',
        boxShadow: bare ? 'none' : '0 0 0 1.5px #3a3348, 0 40px 120px rgba(90, 47, 184, 0.35), 0 20px 60px rgba(0,0,0,0.6)',
        flexShrink: 0,
      }}>
        <div id="phone" style={{
          position: 'relative', width: 390, height: 844, overflow: 'hidden',
          borderRadius: bare ? 0 : 52, background: 'var(--void)', isolation: 'isolate',
        }}>
          {children}
          {!bare && (
            <div style={{
              position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)',
              width: 124, height: 36, borderRadius: 20, background: '#000', zIndex: 100, pointerEvents: 'none',
            }} />
          )}
        </div>
      </div>
    </div>
  )
}
