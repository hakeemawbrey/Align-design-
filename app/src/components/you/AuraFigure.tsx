import { motion } from 'framer-motion'

interface Props {
  src: string
  width: number
  height: number
  /** bloom colour behind the figure */
  glow?: string
  style?: React.CSSProperties
}

const MASK = 'radial-gradient(50% 50% at 50% 50%, #000 52%, rgba(0,0,0,0.6) 70%, transparent 100%)'

/**
 * Illustrated constellation figure, lifted off its black plate:
 * screen-blended, feathered with a radial mask, a blurred copy behind as bloom,
 * and a slow float. Fills nothing — position it with `style`.
 */
export default function AuraFigure({ src, width, height, glow = '#9be35a', style }: Props) {
  return (
    <motion.div
      animate={{ y: [0, -7, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      style={{ position: 'absolute', width, height, pointerEvents: 'none', willChange: 'transform', ...style }}
    >
      <motion.div
        animate={{ opacity: [0.45, 0.7, 0.45], scale: [0.96, 1.04, 0.96] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', inset: '-12%',
          background: `radial-gradient(45% 45% at 50% 48%, ${glow}55 0%, ${glow}18 50%, transparent 75%)`,
          filter: 'blur(10px)',
        }}
      />
      <img src={src} alt="" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
        mixBlendMode: 'screen', filter: 'blur(14px) saturate(1.3)', opacity: 0.55,
        WebkitMaskImage: MASK, maskImage: MASK,
      }} />
      <img src={src} alt="" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
        mixBlendMode: 'screen', filter: 'contrast(1.08) brightness(1.05)',
        WebkitMaskImage: MASK, maskImage: MASK,
      }} />
    </motion.div>
  )
}
