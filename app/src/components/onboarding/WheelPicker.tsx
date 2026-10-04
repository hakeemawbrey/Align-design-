import { useEffect, useRef } from 'react'
import { animate, motion, useMotionValue, useTransform, type MotionValue } from 'framer-motion'
import { sfx } from '../../lib/sfx'

export const ROW = 40
const VISIBLE = 5
export const WHEEL_H = ROW * VISIBLE
const CENTER = (WHEEL_H - ROW) / 2

const SPRING = { type: 'spring' as const, stiffness: 260, damping: 30, mass: 0.7 }

function Item({ i, label, y, align }: { i: number; label: string; y: MotionValue<number>; align: 'center' | 'left' | 'right' }) {
  const d = useTransform(y, (v) => (i * ROW + v) / ROW)
  const opacity = useTransform(d, (x) => Math.max(0, 1 - Math.abs(x) * 0.36 - (Math.abs(x) > 0.5 ? 0.12 : 0)))
  const scale = useTransform(d, (x) => 1 - Math.min(Math.abs(x), 2.6) * 0.075)
  const rotateX = useTransform(d, (x) => x * -16)
  const color = useTransform(d, (x) => (Math.abs(x) < 0.5 ? '#efe6d6' : '#b3a6c4'))
  return (
    <motion.div
      style={{
        position: 'absolute', left: 0, right: 0, top: i * ROW, height: ROW,
        display: 'flex', alignItems: 'center', justifyContent: align === 'center' ? 'center' : align === 'left' ? 'flex-start' : 'flex-end',
        fontSize: 20, fontWeight: 500, letterSpacing: '0.01em', opacity, scale, rotateX, color,
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {label}
    </motion.div>
  )
}

interface ColProps {
  items: string[]
  index: number
  onChange: (i: number) => void
  width: number
  align?: 'center' | 'left' | 'right'
}

/** One wheel column: drag (with fling), scroll-wheel or click a row. Snaps; ticks as rows pass. */
export function WheelColumn({ items, index, onChange, width, align = 'center' }: ColProps) {
  const y = useMotionValue(-index * ROW)
  const last = useRef(index)
  const drag = useRef<{ startY: number; startOff: number; moved: number; samples: [number, number][] } | null>(null)
  const anim = useRef<ReturnType<typeof animate> | null>(null)
  const wheelAcc = useRef(0)
  const target = useRef(index)
  const n = items.length
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  const clampIdx = (i: number) => Math.max(0, Math.min(n - 1, i))

  // tick + live-report as rows cross the band
  useEffect(() => y.on('change', (v) => {
    const i = Math.max(0, Math.min(n - 1, Math.round(-v / ROW)))
    if (i !== last.current) {
      last.current = i
      sfx.tap()
      onChangeRef.current(i)
    }
  }), [y, n])

  const goTo = (i: number) => {
    const t = clampIdx(i)
    target.current = t
    anim.current?.stop()
    anim.current = animate(y, -t * ROW, SPRING)
  }

  // external clamp (e.g. day 31 → 30 when the month changes)
  useEffect(() => {
    if (drag.current) return
    if (Math.round(-y.get() / ROW) !== index) goTo(index)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, n])

  return (
    <div
      style={{ position: 'relative', width, height: WHEEL_H, cursor: 'grab', touchAction: 'none', perspective: 400 }}
      onPointerDown={(e) => {
        anim.current?.stop()
        e.currentTarget.setPointerCapture(e.pointerId)
        drag.current = { startY: e.clientY, startOff: y.get(), moved: 0, samples: [[performance.now(), e.clientY]] }
      }}
      onPointerMove={(e) => {
        const d = drag.current
        if (!d) return
        const scale = e.currentTarget.getBoundingClientRect().height / WHEEL_H || 1
        const dy = (e.clientY - d.startY) / scale
        d.moved = Math.max(d.moved, Math.abs(dy))
        let off = d.startOff + dy
        const min = -(n - 1) * ROW
        if (off > 0) off = off * 0.35
        if (off < min) off = min + (off - min) * 0.35
        y.set(off)
        d.samples.push([performance.now(), e.clientY / scale])
        if (d.samples.length > 6) d.samples.shift()
      }}
      onPointerUp={(e) => {
        const d = drag.current
        drag.current = null
        if (!d) return
        if (d.moved < 4) {
          // click: jump to the tapped row
          const r = e.currentTarget.getBoundingClientRect()
          const scale = r.height / WHEEL_H || 1
          const py = (e.clientY - r.top) / scale
          const rel = Math.round((py - CENTER - ROW / 2) / ROW)
          if (rel !== 0) goTo(Math.round(-y.get() / ROW) + rel)
          return
        }
        const s = d.samples
        const [t0, y0] = s[0]
        const [t1, y1] = s[s.length - 1]
        const v = t1 - t0 > 0 ? (y1 - y0) / (t1 - t0) : 0 // px per ms
        const projected = y.get() + v * 220
        goTo(Math.round(-projected / ROW))
      }}
      onPointerCancel={() => { drag.current = null; goTo(Math.round(-y.get() / ROW)) }}
      onWheel={(e) => {
        wheelAcc.current += e.deltaY
        const steps = Math.trunc(wheelAcc.current / 34)
        if (steps !== 0) {
          wheelAcc.current -= steps * 34
          goTo(target.current + steps)
        }
      }}
    >
      <motion.div style={{ position: 'absolute', left: 0, right: 0, top: CENTER, y, transformStyle: 'preserve-3d' }}>
        {items.map((label, i) => <Item key={i} i={i} label={label} y={y} align={align} />)}
      </motion.div>
    </div>
  )
}
