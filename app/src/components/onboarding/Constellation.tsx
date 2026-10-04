import { AnimatePresence, motion } from 'framer-motion'
import type { SignId } from '../../data/signs'

type Shape = { pts: [number, number][]; lines: [number, number][] }

const chain = (n: number, from = 0): [number, number][] => Array.from({ length: n - 1 }, (_, i) => [from + i, from + i + 1])

/** Simplified star figures in a 100×70 box. */
export const CONSTELLATIONS: Record<SignId, Shape> = {
  aries: { pts: [[5, 45], [42, 22], [68, 26], [88, 42]], lines: chain(4) },
  taurus: {
    pts: [[33, 0], [69, 0], [27, 25], [71, 25], [21, 48], [77, 48], [15, 70], [84, 70]],
    lines: [[0, 2], [2, 4], [4, 6], [1, 3], [3, 5], [5, 7], [2, 3]],
  },
  gemini: {
    pts: [[28, 0], [26, 24], [22, 48], [18, 70], [66, 0], [68, 24], [71, 48], [74, 70]],
    lines: [...chain(4), ...chain(4, 4), [0, 4], [2, 6]],
  },
  cancer: { pts: [[50, 0], [48, 30], [16, 66], [82, 60], [58, 50]], lines: [[0, 1], [1, 2], [1, 4], [4, 3]] },
  leo: {
    pts: [[78, 14], [66, 0], [50, 6], [50, 24], [60, 34], [54, 48], [22, 52], [4, 68], [26, 36]],
    lines: [...chain(6), [5, 6], [6, 7], [6, 8], [8, 3]],
  },
  virgo: { pts: [[0, 8], [20, 20], [40, 14], [55, 30], [72, 24], [88, 44], [60, 56], [42, 70]], lines: [...chain(6), [3, 6], [6, 7]] },
  libra: { pts: [[50, 0], [18, 28], [82, 28], [24, 62], [76, 58]], lines: [[0, 1], [0, 2], [1, 2], [1, 3], [2, 4]] },
  scorpio: { pts: [[2, 6], [12, 0], [18, 16], [32, 26], [46, 36], [54, 50], [64, 62], [80, 68], [94, 56]], lines: [[0, 2], [1, 2], ...chain(7, 2)] },
  sagittarius: {
    pts: [[10, 36], [28, 22], [46, 28], [44, 50], [22, 54], [62, 14], [80, 6], [66, 40], [90, 60]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [2, 5], [5, 6], [2, 7], [7, 8]],
  },
  capricorn: { pts: [[0, 10], [30, 34], [56, 60], [80, 44], [96, 10], [50, 18]], lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]] },
  aquarius: { pts: [[0, 34], [16, 22], [32, 34], [48, 22], [64, 34], [80, 18], [96, 28]], lines: chain(7) },
  pisces: { pts: [[0, 12], [22, 32], [46, 64], [70, 42], [90, 22], [98, 8], [84, 6]], lines: [...chain(5), [4, 5], [5, 6], [6, 4]] },
}

/** Live constellation glyph that re-draws whenever the sign changes. */
export default function Constellation({ sign, color = '#efe6d6', width = 76 }: { sign: SignId; color?: string; width?: number }) {
  const c = CONSTELLATIONS[sign]
  return (
    <div style={{ position: 'relative', width, height: width * 0.78 }}>
      <AnimatePresence>
        <motion.svg
          key={sign}
          viewBox="-8 -8 116 86"
          initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 1.1, rotate: 4, transition: { duration: 0.25 } }}
          transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}
        >
          {c.lines.map(([a, b], i) => (
            <motion.line key={i}
              x1={c.pts[a][0]} y1={c.pts[a][1]} x2={c.pts[b][0]} y2={c.pts[b][1]}
              stroke={color} strokeOpacity={0.55} strokeWidth={1.1}
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.35, delay: 0.05 + i * 0.04 }}
            />
          ))}
          {c.pts.map(([x, y], i) => (
            <motion.circle key={i} cx={x} cy={y}
              fill="#fff"
              initial={{ r: 0 }} animate={{ r: [0, 4.2, 2.6] }}
              transition={{ duration: 0.4, delay: i * 0.035 }}
              style={{ filter: `drop-shadow(0 0 3px ${color})` }}
            />
          ))}
        </motion.svg>
      </AnimatePresence>
    </div>
  )
}
