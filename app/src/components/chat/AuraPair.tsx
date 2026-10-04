import { motion } from 'framer-motion'
import { SIGNS, type SignId } from '../../data/signs'

interface Props {
  left?: SignId
  right?: SignId
  size?: number
  /** horizontal distance between the two centres */
  gap?: number
  animate?: boolean
  children?: React.ReactNode
}

function Aura({ sign, size, delay, animate, dir }: { sign: SignId; size: number; delay: number; animate: boolean; dir: 1 | -1 }) {
  const s = SIGNS[sign]
  return (
    <motion.div
      initial={animate ? { opacity: 0, x: dir * 30, scale: 0.8 } : false}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
      style={{ position: 'relative', width: size, height: size }}
    >
      <motion.div
        animate={{ opacity: [0.5, 0.85, 0.5], scale: [0.92, 1.05, 0.92] }}
        transition={{ duration: 3.2 + dir * 0.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', inset: -size * 0.18, borderRadius: '50%',
          background: `radial-gradient(closest-side, ${s.color}66, ${s.color}18 60%, transparent)`,
        }}
      />
      <img
        src={s.auraImg}
        alt={s.name}
        style={{
          position: 'absolute', inset: 0, width: size, height: size, objectFit: 'cover', objectPosition: '50% 30%',
          borderRadius: '50%', mixBlendMode: 'screen',
          WebkitMaskImage: 'radial-gradient(closest-side, #000 55%, transparent 100%)',
          maskImage: 'radial-gradient(closest-side, #000 55%, transparent 100%)',
        }}
      />
    </motion.div>
  )
}

/** Two AuraCam figures side by side, glowing — "JUNIPER × YOU". */
export default function AuraPair({ left = 'libra', right = 'taurus', size = 80, gap = 70, animate = false, children }: Props) {
  return (
    <div style={{ position: 'relative', width: gap + size, height: size, margin: '0 auto' }}>
      <div style={{ position: 'absolute', left: 0, top: 0 }}>
        <Aura sign={left} size={size} delay={0.15} animate={animate} dir={-1} />
      </div>
      <div style={{ position: 'absolute', left: gap, top: 0 }}>
        <Aura sign={right} size={size} delay={0.25} animate={animate} dir={1} />
      </div>
      {children}
    </div>
  )
}
