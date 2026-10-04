import { motion } from 'framer-motion'
import { useId } from 'react'

/** Chakra column, bottom → top: root red … crown violet */
const CHAKRAS = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff'] as const

const R = 20 // petal radius (seed of life)
const PETALS: [number, number][] = [
  [0, 0],
  ...Array.from({ length: 6 }, (_, k): [number, number] => {
    const a = (-90 + k * 60) * (Math.PI / 180)
    return [Math.cos(a) * R, Math.sin(a) * R]
  }),
]
const DOT_GAP = 10.6

interface Props {
  size?: number
  /** run the draw-in sequence (circles stroke-draw, then dots light bottom→top) */
  animate?: boolean
  /** seconds before the sequence starts */
  delay?: number
  /** seconds between dots lighting */
  dotStep?: number
  strokeOpacity?: number
  strokeWidth?: number
  /** 0..1 glow strength */
  glow?: number
  dotRadius?: number
  /** draw the bounding circle */
  outer?: boolean
  /** render the chakra column */
  dots?: boolean
  style?: React.CSSProperties
}

/** The Align mark — seed-of-life circles with a glowing 7-chakra column. */
export default function AlignMark({
  size = 120, animate = false, delay = 0, dotStep = 0.12, strokeOpacity = 0.55, strokeWidth = 0.55,
  glow = 1, dotRadius = 3.7, outer = true, dots = true, style,
}: Props) {
  const uid = useId().replace(/:/g, '')
  const drawDur = 0.85
  const dotsStart = delay + drawDur * 0.9

  const circles: { cx: number; cy: number; r: number }[] = [
    ...PETALS.map(([cx, cy]) => ({ cx, cy, r: R })),
    ...(outer ? [{ cx: 0, cy: 0, r: R * 2 }] : []),
  ]

  return (
    <svg width={size} height={size} viewBox="-44 -44 88 88" style={{ overflow: 'visible', ...style }}>
      <defs>
        {CHAKRAS.map((c, i) => (
          <g key={i}>
            <radialGradient id={`${uid}-g${i}`}>
              <stop offset="0%" stopColor={c} stopOpacity={0.9 * glow} />
              <stop offset="45%" stopColor={c} stopOpacity={0.35 * glow} />
              <stop offset="100%" stopColor={c} stopOpacity="0" />
            </radialGradient>
            <radialGradient id={`${uid}-c${i}`} cx="42%" cy="38%">
              <stop offset="0%" stopColor="#fff" />
              <stop offset="35%" stopColor={c} stopOpacity="1" />
              <stop offset="100%" stopColor={c} />
            </radialGradient>
          </g>
        ))}
      </defs>

      <g fill="none" strokeLinecap="round" stroke="#d9cdf0" strokeOpacity={strokeOpacity} strokeWidth={strokeWidth}>
        {circles.map((c, i) => (
          <motion.circle
            key={i}
            cx={c.cx} cy={c.cy} r={c.r}
            initial={animate ? { pathLength: 0, opacity: 0 } : false}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: drawDur, delay: delay + i * 0.04, ease: [0.45, 0, 0.2, 1] }}
            style={{ rotate: -90 + i * 51 }}
          />
        ))}
      </g>

      {dots && CHAKRAS.map((_, i) => {
        const cy = 3 * DOT_GAP - i * DOT_GAP
        const t = dotsStart + i * dotStep
        return (
          <g key={i}>
            <motion.circle
              cx={0} cy={cy}
              fill={`url(#${uid}-g${i})`}
              initial={animate ? { opacity: 0, r: 0 } : false}
              animate={{ opacity: 1, r: dotRadius * 3 }}
              transition={{ duration: 0.55, delay: t, ease: 'easeOut' }}
            />
            <motion.circle
              cx={0} cy={cy}
              fill={`url(#${uid}-c${i})`}
              initial={animate ? { opacity: 0, r: 0 } : false}
              animate={{ opacity: 1, r: animate ? [0, dotRadius * 1.5, dotRadius] : dotRadius }}
              transition={{ duration: 0.38, delay: t, ease: 'easeOut' }}
            />
          </g>
        )
      })}
    </svg>
  )
}
