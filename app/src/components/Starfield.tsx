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

/** twinkle timing for the layer that twinkles */
const LAYERS = [{ d: 4.2, o: 0 }]

/**
 * Indigo atmosphere: aurora blooms + twinkling starfield. Fills its parent.
 * Stars are drawn as box-shadows on three elements, and only one of them
 * twinkles: one composited opacity animation instead of one per star, which
 * made every screen recalculate ~70 styles a frame.
 */
export default function Starfield({ count = 70, aurora = '#5b2fb8', warm = '#7a3a6a', seed = 7 }: Props) {
  const layers = useMemo(() => {
    const r = rng(seed)
    const groups: string[][] = [[], [], []]
    for (let i = 0; i < count; i++) {
      const x = r() * 100
      const y = r() * 100
      const s = 0.6 + r() * 1.6
      r(); r() // the old per-star timing draws, kept so every star stays where it was
      groups[i % 3].push(`${x.toFixed(2)}cqw ${y.toFixed(2)}cqh 0 ${(s / 2).toFixed(2)}px #efe6d6`)
    }
    return groups.map((g) => g.join(','))
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
      <div style={{ position: 'absolute', inset: 0, containerType: 'size' }}>
        {layers.map((shadow, i) => shadow && (
          <span key={i} style={{
            position: 'absolute', left: 0, top: 0, width: 0, height: 0, borderRadius: '50%', boxShadow: shadow,
            // one layer twinkles; the other two hold at different brightness so the sky still looks uneven
            ...(i === 0 ? { animation: `twinkle ${LAYERS[i].d}s ease-in-out ${LAYERS[i].o}s infinite`, willChange: 'opacity' } : { opacity: i === 1 ? 0.75 : 0.45 }),
          }} />
        ))}
      </div>
    </div>
  )
}
