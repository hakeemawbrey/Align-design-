import { useEffect } from 'react'
import { animate, motion, useMotionTemplate, useMotionValue, useTransform } from 'framer-motion'

interface Props {
  photo: string
  veil: string
  /** start lifting the veil */
  lift: boolean
  height: number
  /** fires once the photo is mostly visible (for the sparkle burst) */
  onPeak?: () => void
  onDone?: () => void
  children?: React.ReactNode
}

const LIFT_S = 1.25

/**
 * The money shot: the aura veil dissolves upward (soft mask edge + a light
 * seam riding the edge) while the photo underneath pulls into focus.
 */
export default function VeilPhoto({ photo, veil, lift, height, onPeak, onDone, children }: Props) {
  const p = useMotionValue(0)

  useEffect(() => {
    if (!lift) return
    let peaked = false
    const unsub = p.on('change', (v) => {
      if (!peaked && v > 0.55) { peaked = true; onPeak?.() }
    })
    const ctl = animate(p, 1, { duration: LIFT_S, ease: [0.65, 0, 0.25, 1], onComplete: () => onDone?.() })
    return () => { unsub(); ctl.stop() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lift])

  // photo comes into focus
  const blur = useTransform(p, [0, 0.85], [16, 0])
  const sat = useTransform(p, [0, 1], [0.6, 1.08])
  const scale = useTransform(p, [0, 1], [1.14, 1])
  const photoFilter = useMotionTemplate`blur(${blur}px) saturate(${sat})`

  // veil mask: transparent region grows from the bottom
  const edge = useTransform(p, [0, 1], [0, 135])
  const edgeLo = useTransform(edge, (e) => e - 35)
  const veilMask = useMotionTemplate`linear-gradient(to top, transparent ${edgeLo}%, #000 ${edge}%)`
  const veilY = useTransform(p, [0, 1], [0, -height * 0.18])
  const veilBlur = useTransform(p, [0, 1], [2, 12])
  const veilFilter = useMotionTemplate`blur(${veilBlur}px) saturate(1.3) brightness(1.1)`

  // light seam sits in the middle of the soft edge
  const seamY = useTransform(p, (v) => height * (1 - (v * 1.35 - 0.175)) - 30)
  const seamO = useTransform(p, [0, 0.08, 0.75, 1], [0, 1, 0.9, 0])

  return (
    <div style={{ position: 'relative', height, borderRadius: 14, overflow: 'hidden', background: '#1a0c38', isolation: 'isolate' }}>
      <motion.img
        src={photo}
        alt=""
        draggable={false}
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 38%',
          filter: photoFilter, scale, willChange: 'filter, transform',
        }}
      />
      {/* aura veil */}
      <motion.div
        style={{
          position: 'absolute', inset: '-4%', y: veilY,
          WebkitMaskImage: veilMask, maskImage: veilMask,
          willChange: 'transform',
        }}
      >
        <motion.img
          src={veil}
          alt=""
          draggable={false}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 30%', filter: veilFilter }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(70% 80% at 50% 40%, transparent 40%, rgba(77,26,73,0.6) 100%)' }} />
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 12, textAlign: 'center',
          fontFamily: 'var(--mono)', fontSize: 8.5, letterSpacing: '0.2em', color: 'rgba(239,230,214,0.6)',
        }}>
          NO PHOTO UNTIL YOU BOTH ALIGN
        </div>
      </motion.div>
      {/* light seam */}
      <motion.div
        style={{
          position: 'absolute', left: '-10%', right: '-10%', top: 0, height: 60, y: seamY, opacity: seamO,
          background: 'radial-gradient(50% 50% at 50% 50%, rgba(255,250,235,0.85) 0%, rgba(255,189,246,0.45) 35%, rgba(242,199,92,0.15) 60%, transparent 75%)',
          mixBlendMode: 'screen', pointerEvents: 'none',
        }}
      />
      <div className="grain" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.6 }} />
      {children}
    </div>
  )
}
