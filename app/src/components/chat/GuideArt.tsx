import { motion } from 'framer-motion'
import { CardOrb } from '../CardFrame'
import { SIGN_ORDER } from '../../lib/astro'
import type { ChartRow } from '../../lib/compat'
import { SIGNS, type SignId } from '../../data/signs'

/**
 * Pictures for the alignment guide, so it isn't a wall of reading. Each part
 * gets a small moving picture of the two signs; the Chart tab gets a zodiac
 * wheel with both charts on it. They illustrate, they don't measure: nothing
 * here is a score, a meter or a rating.
 */

const ORB = 46

/** the two of you, as orbs, doing what the part is about */
export function PairArt({ kind, mine, theirs }: { kind: 'pull' | 'push' | 'align' | 'relationship'; mine: SignId; theirs: SignId }) {
  const a = SIGNS[mine], b = SIGNS[theirs]
  const orb = (s: typeof a) => <CardOrb tint={s.color} size={ORB}>{s.glyph}</CardOrb>
  const box: React.CSSProperties = { position: 'relative', height: 92, margin: '2px 0 10px', borderRadius: 14, overflow: 'hidden', display: 'grid', placeItems: 'center',
    background: `radial-gradient(60% 120% at 28% 50%, color-mix(in srgb, ${a.color} 26%, transparent), transparent 70%), radial-gradient(60% 120% at 72% 50%, color-mix(in srgb, ${b.color} 26%, transparent), transparent 70%), rgba(10,5,24,0.5)` }
  const at = (x: number): React.CSSProperties => ({ position: 'absolute', left: '50%', top: '50%', marginLeft: x - ORB / 2, marginTop: -ORB / 2 })

  if (kind === 'pull') {
    // spark: they lean in, and stars catch between them
    return (
      <div aria-hidden style={box}>
        <motion.div style={at(-58)} animate={{ x: [0, 9, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}>{orb(a)}</motion.div>
        <motion.div style={at(58)} animate={{ x: [0, -9, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}>{orb(b)}</motion.div>
        {[[-10, -16, 13], [8, 10, 10], [0, -2, 18], [-14, 14, 9], [14, -12, 9]].map(([x, y, s], i) => (
          <motion.span key={i} animate={{ opacity: [0, 1, 0], scale: [0.4, 1.15, 0.4], rotate: [0, 40, 0] }} transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.28, ease: 'easeInOut' }}
            style={{ position: 'absolute', left: '50%', top: '50%', marginLeft: x - s / 2, marginTop: y - s / 2, fontSize: s, lineHeight: 1, color: '#fff3c9', textShadow: '0 0 10px #ffe08a' }}>✦</motion.span>
        ))}
      </div>
    )
  }
  if (kind === 'push') {
    // clash: they bump, and it cracks
    return (
      <div aria-hidden style={box}>
        <motion.div style={at(-52)} animate={{ x: [0, 22, 14, 0], rotate: [0, 0, -8, 0] }} transition={{ duration: 1.9, repeat: Infinity, times: [0, 0.32, 0.42, 1], ease: 'easeInOut' }}>{orb(a)}</motion.div>
        <motion.div style={at(52)} animate={{ x: [0, -22, -14, 0], rotate: [0, 0, 8, 0] }} transition={{ duration: 1.9, repeat: Infinity, times: [0, 0.32, 0.42, 1], ease: 'easeInOut' }}>{orb(b)}</motion.div>
        <motion.svg width="26" height="54" viewBox="0 0 26 54" style={{ position: 'absolute', left: '50%', top: '50%', marginLeft: -13, marginTop: -27, filter: 'drop-shadow(0 0 8px #ff8fb1)' }}
          animate={{ opacity: [0, 0, 1, 0], scale: [0.8, 0.8, 1.15, 0.9] }} transition={{ duration: 1.9, repeat: Infinity, times: [0, 0.3, 0.38, 0.7] }}>
          <path d="M15 1 4 24h8L7 53 22 22h-8l5-21Z" fill="#ffd3e0" />
        </motion.svg>
      </div>
    )
  }
  if (kind === 'align') {
    // align: they come to rest overlapping, and a line of light sits where they meet
    return (
      <div aria-hidden style={box}>
        <motion.div style={at(-56)} initial={{ x: 0 }} animate={{ x: [0, 38, 38, 0] }} transition={{ duration: 5, repeat: Infinity, times: [0, 0.3, 0.8, 1], ease: 'easeInOut' }}>{orb(a)}</motion.div>
        <motion.div style={{ ...at(56), mixBlendMode: 'screen' }} initial={{ x: 0 }} animate={{ x: [0, -38, -38, 0] }} transition={{ duration: 5, repeat: Infinity, times: [0, 0.3, 0.8, 1], ease: 'easeInOut' }}>{orb(b)}</motion.div>
        <motion.div animate={{ opacity: [0, 1, 1, 0], scaleY: [0.4, 1, 1, 0.4] }} transition={{ duration: 5, repeat: Infinity, times: [0.2, 0.36, 0.76, 0.9] }}
          style={{ position: 'absolute', left: '50%', top: 14, bottom: 14, width: 2, marginLeft: -1, borderRadius: 1, background: 'linear-gradient(#b45cff, #2fd0e6, #5fdc54, #ffd23f, #ff7a2e)', boxShadow: '0 0 12px #f2c75c' }} />
      </div>
    )
  }
  // the long game: they keep circling each other
  return (
    <div aria-hidden style={box}>
      <span style={{ position: 'absolute', left: '50%', top: '50%', width: 150, height: 62, margin: '-31px 0 0 -75px', borderRadius: '50%', border: '1px dashed rgba(220,170,242,0.45)' }} />
      {[0, 0.5].map((phase, i) => (
        <motion.div key={i} style={at(0)}
          animate={{ x: [0, 1, 0, -1, 0].map((v) => v * 75 * (i ? -1 : 1)), y: [-1, 0, 1, 0, -1].map((v) => v * 31 * (i ? -1 : 1)), scale: i ? [0.82, 1, 1.12, 1, 0.82] : [1.12, 1, 0.82, 1, 1.12] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'linear', delay: -phase }}>
          {orb(i ? b : a)}
        </motion.div>
      ))}
    </div>
  )
}

/** two signs side by side, as small orbs: a pairing from the chart */
export function PairChip({ row }: { row: ChartRow }) {
  const a = SIGNS[row.mine.sign], b = SIGNS[row.theirs.sign]
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
      <CardOrb tint={a.color} size={26}>{a.glyph}</CardOrb>
      <span style={{ width: 14, height: 2, background: `linear-gradient(90deg, ${a.color}, ${b.color})`, opacity: 0.8 }} />
      <CardOrb tint={b.color} size={26}>{b.glyph}</CardOrb>
    </span>
  )
}

const PLANET_GLYPH: Record<string, string> = { Sun: '☉', Moon: '☽', Rising: '↑', Venus: '♀' }

/**
 * Both charts on one zodiac wheel: your placements on the outer ring, theirs
 * on the inner, and a line for each pairing the guide reads.
 */
export function ChartWheel({ rows, mine, theirs, name }: { rows: ChartRow[]; mine: SignId; theirs: SignId; name: string }) {
  const R = 118, C = 130
  const mineCol = SIGNS[mine].light, theirCol = SIGNS[theirs].light
  const angle = (sign: SignId, nudge = 0) => ((SIGN_ORDER.indexOf(sign) * 30 + 15 + nudge - 90) * Math.PI) / 180
  const pt = (sign: SignId, r: number, nudge = 0) => [C + Math.cos(angle(sign, nudge)) * r, C + Math.sin(angle(sign, nudge)) * r] as const
  // one dot per placement on each side; planets sharing a sign fan out a little
  const dots = (side: 'mine' | 'theirs') => {
    const seen = new Map<string, { planet: string; sign: SignId }>()
    rows.forEach((x) => { const p = x[side]; seen.set(`${p.planet}-${p.sign}`, p) })
    const perSign = new Map<SignId, number>()
    return [...seen.values()].map((p) => {
      const n = perSign.get(p.sign) ?? 0
      perSign.set(p.sign, n + 1)
      return { ...p, nudge: n ? (n % 2 ? 1 : -1) * Math.ceil(n / 2) * 9 : 0 }
    })
  }
  const mineDots = dots('mine'), theirDots = dots('theirs')
  const find = (list: typeof mineDots, p: { planet: string; sign: SignId }) => list.find((d) => d.planet === p.planet && d.sign === p.sign)!
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4px 0 12px' }}>
      <svg width="260" height="260" viewBox="0 0 260 260" role="img" aria-label={`Your chart and ${name}’s on one wheel`}>
        <circle cx={C} cy={C} r={R} fill="rgba(10,5,24,0.5)" stroke="rgba(201,190,219,0.45)" strokeWidth="1.2" />
        <circle cx={C} cy={C} r={R - 24} fill="none" stroke="rgba(201,190,219,0.22)" strokeWidth="1" />
        <circle cx={C} cy={C} r={48} fill="none" stroke="rgba(201,190,219,0.16)" strokeWidth="1" strokeDasharray="2 4" />
        {SIGN_ORDER.map((s, i) => {
          const a = ((i * 30 - 90) * Math.PI) / 180
          const [gx, gy] = pt(s, R - 12)
          return (
            <g key={s}>
              <line x1={C + Math.cos(a) * (R - 24)} y1={C + Math.sin(a) * (R - 24)} x2={C + Math.cos(a) * R} y2={C + Math.sin(a) * R} stroke="rgba(201,190,219,0.25)" strokeWidth="1" />
              <text x={gx} y={gy} textAnchor="middle" dominantBaseline="central" fontSize="12" fill={SIGNS[s].light} opacity="0.9">{SIGNS[s].glyph}</text>
            </g>
          )
        })}
        {/* a line for each pairing */}
        {rows.map((row, i) => {
          const m = find(mineDots, row.mine), t = find(theirDots, row.theirs)
          const [x1, y1] = pt(m.sign, 78, m.nudge), [x2, y2] = pt(t.sign, 52, t.nudge)
          return <motion.line key={row.id} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#gw)" strokeWidth="1.4" strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.85 }} transition={{ duration: 0.7, delay: 0.35 + i * 0.14 }} />
        })}
        <defs><linearGradient id="gw" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={mineCol} /><stop offset="1" stopColor={theirCol} /></linearGradient></defs>
        {mineDots.map((d, i) => {
          const [x, y] = pt(d.sign, 78, d.nudge)
          return (
            <motion.g key={`m${i}`} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 + i * 0.07 }} style={{ transformOrigin: `${x}px ${y}px` }}>
              <circle cx={x} cy={y} r="9.5" fill={mineCol} stroke="#1a0f2e" strokeWidth="1.5" />
              <text x={x} y={y} textAnchor="middle" dominantBaseline="central" fontSize="10" fill="#1a0f2e">{PLANET_GLYPH[d.planet]}{'︎'}</text>
            </motion.g>
          )
        })}
        {theirDots.map((d, i) => {
          const [x, y] = pt(d.sign, 52, d.nudge)
          return (
            <motion.g key={`t${i}`} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.2 + i * 0.07 }} style={{ transformOrigin: `${x}px ${y}px` }}>
              <circle cx={x} cy={y} r="9.5" fill={theirCol} stroke="#1a0f2e" strokeWidth="1.5" />
              <text x={x} y={y} textAnchor="middle" dominantBaseline="central" fontSize="10" fill="#1a0f2e">{PLANET_GLYPH[d.planet]}{'︎'}</text>
            </motion.g>
          )
        })}
      </svg>
      <div className="mono" style={{ display: 'flex', gap: 16, fontSize: 9, letterSpacing: '0.14em', color: 'var(--label-2)', marginTop: 2 }}>
        <span><span style={{ display: 'inline-block', width: 9, height: 9, borderRadius: 5, background: mineCol, marginRight: 6, verticalAlign: -1 }} />YOU · OUTER</span>
        <span><span style={{ display: 'inline-block', width: 9, height: 9, borderRadius: 5, background: theirCol, marginRight: 6, verticalAlign: -1 }} />{name.toUpperCase()} · INNER</span>
      </div>
    </div>
  )
}
