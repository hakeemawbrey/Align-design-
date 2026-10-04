import { useMemo } from 'react'
import { motion } from 'framer-motion'

interface Props {
  /** centre, in phone px */
  x: number
  y: number
  /** bump to replay */
  fireKey: number
  /** 1 = full jackpot (white flash + 2 rings + 22 stars) */
  power?: number
  colors?: string[]
}

function rng(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

/** White flash + radial shockwave rings + gold star particles. Pure transform/opacity. */
export default function Burst({ x, y, fireKey, power = 1, colors = ['#f2c75c', '#fff4cf', '#ffbdf6', '#efe6d6'] }: Props) {
  const stars = useMemo(() => {
    const r = rng(31 + fireKey * 7)
    const count = Math.round(22 * power)
    return Array.from({ length: count }, (_, i) => {
      const a = (i / count) * Math.PI * 2 + r() * 0.4
      const d = (110 + r() * 150) * (0.6 + 0.4 * power)
      return {
        dx: Math.cos(a) * d,
        dy: Math.sin(a) * d,
        s: 9 + r() * 12,
        rot: (r() - 0.5) * 300,
        c: colors[i % colors.length],
        delay: r() * 0.08,
        dur: 0.9 + r() * 0.7,
      }
    })
  }, [fireKey, power, colors])

  if (!fireKey) return null

  return (
    <div key={fireKey} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 30 }}>
      {/* flash */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.95 * power, 0] }}
        transition={{ duration: 0.75, times: [0, 0.12, 1], ease: 'easeOut' }}
        style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(circle at ${x}px ${y}px, #fffaf0 0%, rgba(255,244,220,0.85) 14%, rgba(242,199,92,0.35) 36%, rgba(154,123,224,0.12) 60%, transparent 80%)`,
        }}
      />
      {/* core bloom */}
      <motion.div
        initial={{ scale: 0.2, opacity: 1 }}
        animate={{ scale: 2.4, opacity: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', left: x - 60, top: y - 60, width: 120, height: 120, borderRadius: '50%',
          background: 'radial-gradient(circle, #fff 0%, rgba(255,240,200,0.8) 30%, transparent 70%)',
        }}
      />
      {/* shockwave rings */}
      {[0, 0.12, 0.26].slice(0, power >= 0.8 ? 3 : 1).map((d, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.1, opacity: 0.95 }}
          animate={{ scale: 5.2 - i * 0.9, opacity: 0 }}
          transition={{ duration: 1.1 + i * 0.15, delay: d, ease: [0.1, 0.9, 0.3, 1] }}
          style={{
            position: 'absolute', left: x - 50, top: y - 50, width: 100, height: 100, borderRadius: '50%',
            border: `${i === 0 ? 2 : 1}px solid ${i === 1 ? '#ffbdf6' : '#fff4cf'}`,
            boxShadow: `0 0 18px ${i === 1 ? 'rgba(225,99,214,0.7)' : 'rgba(242,199,92,0.7)'}, inset 0 0 14px rgba(255,244,207,0.5)`,
          }}
        />
      ))}
      {/* star particles */}
      {stars.map((s, i) => (
        <motion.span
          key={i}
          initial={{ x: 0, y: 0, scale: 0.2, opacity: 1, rotate: 0 }}
          animate={{ x: s.dx, y: s.dy + 30, scale: [0.2, 1.2, 0.6], opacity: [1, 1, 0], rotate: s.rot }}
          transition={{ duration: s.dur, delay: s.delay, ease: [0.12, 0.8, 0.3, 1] }}
          style={{
            position: 'absolute', left: x - s.s / 2, top: y - s.s / 2, width: s.s, height: s.s,
            color: s.c, fontSize: s.s, lineHeight: 1, textAlign: 'center',
            textShadow: `0 0 8px ${s.c}, 0 0 16px ${s.c}`,
          }}
        >
          ✦
        </motion.span>
      ))}
    </div>
  )
}
