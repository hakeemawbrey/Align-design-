import { motion } from 'framer-motion'

const NOISE = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 0.95  0 0 0 0 0.85  0 0 0 0.9 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`

/** Four-point sparkle, softly twinkling. */
export function Sparkle4({ x, y, s, d = 0, color = '#efe6d6' }: { x: number; y: number; s: number; d?: number; color?: string }) {
  return (
    <motion.svg width={s} height={s} viewBox="0 0 24 24"
      animate={{ opacity: [0.35, 1, 0.35], scale: [0.8, 1.12, 0.8], rotate: [0, 12, 0] }}
      transition={{ duration: 3.2, repeat: Infinity, delay: d, ease: 'easeInOut' }}
      style={{ position: 'absolute', left: x - s / 2, top: y - s / 2, filter: `drop-shadow(0 0 4px ${color})`, pointerEvents: 'none' }}>
      <path d="M12 0c.5 7 4.5 11.5 12 12-7.5.5-11.5 5-12 12-.5-7-4.5-11.5-12-12 7.5-.5 11.5-5 12-12Z" fill={color} />
    </motion.svg>
  )
}

interface Props {
  /** base size; the parent positions/scales the portal with transforms */
  w?: number
  h?: number
  /** blinding open moment */
  flare?: boolean
  /** after purchase: rays turn and the light stays up */
  lit?: boolean
  sparkles?: boolean
}

/**
 * The Align+ window: an arch-topped portal onto a golden sunrise.
 * Grain, soft bloom, a ground-light line and a slow shimmer rising inside.
 * Everything animates on transform/opacity only.
 */
export default function Portal({ w = 100, h = 138, flare = false, lit = false, sparkles = true }: Props) {
  const r = w / 2
  return (
    <div style={{ position: 'relative', width: w, height: h }}>
      {/* sun rays — conic fan, only once it's lit */}
      <motion.div
        initial={false}
        animate={{ opacity: flare ? 0.95 : lit ? 0.55 : 0, scale: flare ? 1.35 : lit ? 1 : 0.6 }}
        transition={{ duration: flare ? 0.35 : 1.1, ease: 'easeOut' }}
        style={{ position: 'absolute', left: w / 2 - w * 1.9, top: h * 0.55 - w * 1.9, width: w * 3.8, height: w * 3.8, pointerEvents: 'none' }}>
        <div style={{
          width: '100%', height: '100%', borderRadius: '50%',
          background: 'repeating-conic-gradient(from 0deg, rgba(255,226,160,0.32) 0deg 4deg, transparent 4deg 16deg)',
          WebkitMaskImage: 'radial-gradient(circle, #000 12%, rgba(0,0,0,0.5) 38%, transparent 68%)',
          maskImage: 'radial-gradient(circle, #000 12%, rgba(0,0,0,0.5) 38%, transparent 68%)',
          animation: 'pw-spin 40s linear infinite',
        }} />
      </motion.div>

      {/* bloom behind the window */}
      <motion.div
        animate={flare ? { opacity: 1, scale: 2.4 } : { opacity: lit ? [0.85, 1, 0.85] : [0.6, 0.85, 0.6], scale: lit ? [1.15, 1.25, 1.15] : [1, 1.06, 1] }}
        transition={flare ? { duration: 0.4, ease: 'easeOut' } : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', left: -w * 0.9, top: -h * 0.55, width: w * 2.8, height: h * 2.1, pointerEvents: 'none',
          background: 'radial-gradient(50% 50% at 50% 55%, rgba(242,199,92,0.42) 0%, rgba(214,150,70,0.18) 40%, transparent 70%)',
        }} />

      {/* the window */}
      <div style={{
        position: 'absolute', inset: 0, overflow: 'hidden',
        borderRadius: `${r}px ${r}px 9px 9px`,
        background: 'linear-gradient(180deg, #6e5f86 0%, #94808a 20%, #c4a473 42%, #e8c264 60%, #f7d98e 75%, #fff0d4 90%, #f3d6cb 100%)',
        boxShadow: '0 0 0 1.5px rgba(246,222,170,0.85), 0 0 22px rgba(242,199,92,0.45), inset 0 0 18px rgba(40,20,60,0.45)',
      }}>
        {/* sunrise core */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(70% 38% at 50% 92%, #fffbf0 0%, rgba(255,236,190,0.85) 30%, rgba(255,214,140,0.25) 60%, transparent 80%)',
        }} />
        {/* soft mosaic panes, like light through old glass */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.5, mixBlendMode: 'soft-light',
          background: `linear-gradient(90deg, transparent 0 18%, rgba(255,255,255,0.35) 18% 34%, transparent 34% 52%, rgba(80,50,90,0.4) 52% 70%, transparent 70%),
            linear-gradient(180deg, rgba(255,255,255,0.3) 0 22%, transparent 22% 46%, rgba(60,30,80,0.35) 46% 58%, transparent 58%)`,
          filter: 'blur(3px)',
        }} />
        {/* rising shimmer */}
        <motion.div
          animate={{ y: [h * 0.9, -h * 0.9] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.2 }}
          style={{
            position: 'absolute', left: 0, right: 0, top: 0, height: h * 0.5,
            background: 'linear-gradient(180deg, transparent, rgba(255,250,235,0.45), transparent)',
          }} />
        {/* grain */}
        <div style={{ position: 'absolute', inset: -2, backgroundImage: NOISE, backgroundSize: '120px 120px', mixBlendMode: 'soft-light', opacity: 0.85 }} />
        <div style={{ position: 'absolute', inset: -2, backgroundImage: NOISE, backgroundSize: '90px 90px', mixBlendMode: 'overlay', opacity: 0.25 }} />
        {/* flare whiteout */}
        <motion.div
          initial={false}
          animate={{ opacity: flare ? 1 : lit ? 0.08 : 0 }}
          transition={{ duration: flare ? 0.25 : 0.9 }}
          style={{ position: 'absolute', inset: 0, background: 'radial-gradient(80% 70% at 50% 70%, #fff 0%, #fff7e0 50%, rgba(255,240,200,0.6) 100%)' }} />
      </div>

      {/* ground light */}
      <motion.div
        animate={{ opacity: flare ? 1 : [0.7, 1, 0.7], scaleX: flare ? 1.6 : 1 }}
        transition={flare ? { duration: 0.3 } : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', left: -w * 0.3, width: w * 1.6, top: h + 1, height: 3, borderRadius: 3, pointerEvents: 'none',
          background: 'radial-gradient(50% 50% at 50% 50%, rgba(255,226,150,0.95) 0%, rgba(242,199,92,0.4) 50%, transparent 100%)',
        }} />

      {sparkles && (
        <>
          <Sparkle4 x={-8} y={h * 0.08} s={w * 0.13} d={0} />
          <Sparkle4 x={w + 8} y={h * 0.3} s={w * 0.08} d={1.1} />
          <Sparkle4 x={-2} y={h * 0.86} s={w * 0.06} d={0.5} />
          <Sparkle4 x={w + 12} y={-h * 0.04} s={w * 0.06} d={1.8} />
        </>
      )}
      <style>{'@keyframes pw-spin { to { transform: rotate(360deg) } }'}</style>
    </div>
  )
}
