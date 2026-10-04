import { useMemo } from 'react'

interface Props {
  count?: number
  /** colour of the top aurora bloom; null hides it */
  aurora?: string | null
  /** colour of the bottom warm bloom; null hides it */
  warm?: string | null
  seed?: number
}

function rng(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

/** Indigo atmosphere: aurora blooms + twinkling starfield. Fills its parent. */
export default function Starfield({ count = 70, aurora = '#5b2fb8', warm = '#7a3a6a', seed = 7 }: Props) {
  const stars = useMemo(() => {
    const r = rng(seed)
    return Array.from({ length: count }, () => ({
      x: r() * 100,
      y: r() * 100,
      s: 0.6 + r() * 1.6,
      d: 2 + r() * 4,
      o: r() * 4,
    }))
  }, [count, seed])

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', background: 'var(--void)' }}>
      {aurora && (
        <div style={{
          position: 'absolute', left: '-10%', top: '-8%', width: '120%', height: '55%',
          background: `radial-gradient(50% 50% at 50% 45%, ${aurora}88 0%, ${aurora}22 55%, transparent 75%)`,
          filter: 'blur(20px)',
        }} />
      )}
      {warm && (
        <div style={{
          position: 'absolute', left: '0%', bottom: '-12%', width: '100%', height: '35%',
          background: `radial-gradient(50% 50% at 50% 60%, ${warm}66 0%, transparent 70%)`,
          filter: 'blur(24px)',
        }} />
      )}
      {stars.map((st, i) => (
        <span key={i} style={{
          position: 'absolute', left: `${st.x}%`, top: `${st.y}%`,
          width: st.s, height: st.s, borderRadius: '50%', background: '#efe6d6',
          animation: `twinkle ${st.d}s ease-in-out ${st.o}s infinite`,
        }} />
      ))}
    </div>
  )
}
