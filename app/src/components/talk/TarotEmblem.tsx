import type { TalkTopic } from '../../data/talkCards'

/**
 * Gold line-art for each arcana, drawn on a 100×100 grid. Engraved look:
 * thin strokes, a few solid accents, a soft glow in the topic colour.
 */
export default function TarotEmblem({ topic, size = 100, color = '#f2d58a', glow = '#f2c75c' }: { topic: TalkTopic; size?: number; color?: string; glow?: string }) {
  const st = { fill: 'none', stroke: color, strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  const dot = (cx: number, cy: number, r = 1.4) => <circle cx={cx} cy={cy} r={r} fill={color} />
  const star4 = (x: number, y: number, r: number) => <path d={`M${x} ${y - r}Q${x + r * 0.18} ${y - r * 0.18} ${x + r} ${y}Q${x + r * 0.18} ${y + r * 0.18} ${x} ${y + r}Q${x - r * 0.18} ${y + r * 0.18} ${x - r} ${y}Q${x - r * 0.18} ${y - r * 0.18} ${x} ${y - r}Z`} fill={color} />
  const rays = (cx: number, cy: number, r1: number, r2: number, n: number, wavy = false) =>
    Array.from({ length: n }, (_, i) => {
      const a = (i / n) * Math.PI * 2
      const [x1, y1, x2, y2] = [cx + Math.cos(a) * r1, cy + Math.sin(a) * r1, cx + Math.cos(a) * r2, cy + Math.sin(a) * r2]
      if (!wavy || i % 2) return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} {...st} strokeWidth={1.2} />
      const mx = (x1 + x2) / 2 + Math.cos(a + Math.PI / 2) * 3
      const my = (y1 + y2) / 2 + Math.sin(a + Math.PI / 2) * 3
      return <path key={i} d={`M${x1} ${y1}Q${mx} ${my} ${x2} ${y2}`} {...st} strokeWidth={1.2} />
    })

  const art: Record<TalkTopic, React.ReactNode> = {
    everyday: (<>
      {rays(50, 50, 20, 34, 24, true)}
      <circle cx="50" cy="50" r="16" {...st} />
      <circle cx="50" cy="50" r="12" fill={color} opacity=".18" />
      <path d="M43 47q2-2 4 0M53 47q2-2 4 0M44 55q6 4 12 0" {...st} strokeWidth={1.2} />
    </>),
    romance: (<>
      {rays(50, 22, 6, 11, 12)}
      {dot(50, 22, 3)}
      <path d="M38 48c-6-7-17-2-12 8 3 6 12 12 12 12s9-6 12-12c5-10-6-15-12-8z" {...st} />
      <path d="M62 48c-6-7-17-2-12 8 3 6 12 12 12 12s9-6 12-12c5-10-6-15-12-8z" {...st} />
      <path d="M38 68 L50 82 L62 68" {...st} strokeWidth={1.1} opacity=".7" />
      {star4(50, 84, 3)}
    </>),
    intimacy: (<>
      <circle cx="50" cy="44" r="24" {...st} opacity=".45" />
      <path d="M58 24a22 22 0 1 0 0 40a17 17 0 1 1 0-40z" fill={color} opacity=".9" />
      {dot(30, 76, 1.6)}{dot(40, 82, 1.2)}{dot(50, 78, 1.8)}{dot(60, 84, 1.2)}{dot(70, 76, 1.6)}
      {star4(78, 22, 4)}{star4(22, 30, 2.5)}
    </>),
    food: (<>
      <path d="M34 34h32q0 22-16 26q-16-4-16-26z" {...st} />
      <path d="M50 60v14M40 78h20" {...st} />
      <path d="M50 34c0-8 0-14 0-18M44 30c-2-6-4-10-6-13M56 30c2-6 4-10 6-13" {...st} strokeWidth={1.2} />
      <ellipse cx="50" cy="16" rx="2.4" ry="4" fill={color} /><ellipse cx="38" cy="17" rx="2" ry="3.4" fill={color} transform="rotate(-25 38 17)" /><ellipse cx="62" cy="17" rx="2" ry="3.4" fill={color} transform="rotate(25 62 17)" />
      {dot(44, 44)}{dot(50, 48)}{dot(56, 44)}{dot(50, 40, 1.1)}
    </>),
    family: (<>
      <path d="M24 50 L50 26 L76 50" {...st} />
      <path d="M30 46v32h40V46" {...st} />
      <path d="M44 78V62a6 6 0 0 1 12 0v16" {...st} />
      <path d="M50 44c-3-3-8 0-5 4l5 5 5-5c3-4-2-7-5-4z" fill={color} />
      {star4(50, 16, 4)}{star4(36, 20, 2.4)}{star4(64, 20, 2.4)}
    </>),
    money: (<>
      <circle cx="50" cy="50" r="28" {...st} />
      <circle cx="50" cy="50" r="20" {...st} strokeWidth={1.1} />
      <circle cx="50" cy="50" r="5" fill={color} />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2
        return <line key={i} x1={50 + Math.cos(a) * 5} y1={50 + Math.sin(a) * 5} x2={50 + Math.cos(a) * 28} y2={50 + Math.sin(a) * 28} {...st} strokeWidth={1.1} />
      })}
      {['✦', '☽', '☼', '✧'].map((g, i) => {
        const a = (i / 4) * Math.PI * 2 + Math.PI / 4
        return <text key={i} x={50 + Math.cos(a) * 24} y={50 + Math.sin(a) * 24 + 2.5} fontSize="7" textAnchor="middle" fill={color}>{g}</text>
      })}
    </>),
    future: (<>
      <path d="M50 14 L55 43 L84 48 L55 53 L50 84 L45 53 L16 48 L45 43 Z" fill={color} opacity=".95" />
      <path d="M50 26 L62 48 L50 70 L38 48 Z" fill="none" stroke="#1a0f3a" strokeWidth=".8" opacity=".5" />
      {star4(22, 22, 4)}{star4(80, 24, 3)}{star4(20, 76, 3)}{star4(78, 78, 4.5)}{star4(66, 14, 2)}{star4(32, 88, 2)}
    </>),
    conflict: (<>
      <path d="M38 86V40h24v46" {...st} />
      <path d="M34 40h32M36 40v-6h4v4h4v-4h4v4h4v-4h4v4h4v-4h4v6" {...st} strokeWidth={1.2} />
      <path d="M46 52h8v8h-8zM46 68h8v8h-8z" {...st} strokeWidth={1.1} />
      <path d="M70 10 L58 30 L66 30 L54 48" {...st} strokeWidth={2} />
      {dot(28, 52)}{dot(24, 62, 1.1)}{dot(74, 58)}{dot(78, 70, 1.1)}
      <path d="M22 86h56" {...st} />
    </>),
    fun: (<>
      <path d="M16 78q20-6 34-2t34-6" {...st} />
      <path d="M50 20c10 0 16 8 12 15s-14 6-14-1 8-8 9-3" {...st} />
      {rays(50, 54, 10, 16, 12)}
      <circle cx="50" cy="54" r="7" fill={color} />
      {star4(24, 30, 3)}{star4(78, 36, 4)}{star4(70, 16, 2.4)}
      <path d="M30 70 l-4 -8 M30 70 l4 -8" {...st} strokeWidth={1.1} />
    </>),
  }

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: 'block', overflow: 'visible', filter: `drop-shadow(0 0 ${size * 0.04}px ${glow}aa)` }}>
      {art[topic]}
    </svg>
  )
}
