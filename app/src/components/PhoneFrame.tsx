import { useEffect, useState, type ReactNode } from 'react'

/**
 * 390×844 iPhone canvas, scaled to fit the browser window so it records
 * crisply at any size. On a real phone (narrow viewport) it goes full-bleed.
 */
export default function PhoneFrame({ children }: { children: ReactNode }) {
  const [scale, setScale] = useState(1)
  const [bare, setBare] = useState(false)

  useEffect(() => {
    const fit = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const isPhone = w < 500
      setBare(isPhone)
      setScale(isPhone ? Math.min(w / 390, h / 844) : Math.min((h - 48) / 868, (w - 48) / 414))
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  return (
    <div style={{
      position: 'fixed', inset: 0, display: 'grid', placeItems: 'center',
      background: bare ? 'var(--void)' : 'radial-gradient(60% 60% at 50% 40%, #1a0f3a 0%, #07040f 70%)',
    }}>
      <div style={{
        width: 390 + (bare ? 0 : 24), height: 844 + (bare ? 0 : 24),
        transform: `scale(${scale})`, transformOrigin: 'center',
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
