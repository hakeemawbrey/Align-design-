// guidepisces2 (15 s vertical Align ad, Star Talk "Your Star Guide", Pisces note 2 / 3: what you need) · story 0–10.6,
// then the shared end card.
//   0.00       "What you *need*, Pisces."  The ♓ guide is mid-drift, floating up off a grassy hill, bubbles trailing.
//   2.50 drop  ♓ YOUR STAR: "someone gentle with your heart…"  A coral star on the hill cups a little pixel heart in both
//              hands, carefully. The ★ ASTROLOGY SAYS chip: in traditional astrology Pisces rules the feet.
//   5.60       "who still keeps you grounded."  The guide drifts a bit too high, a string drops from it like a balloon's,
//              and the coral star catches the end (tug, bob).
//   8.40 cut   "Gentle | *and* grounded."  The coral star strolls along the hill with the guide floating on its string,
//              happy, the cupped heart glowing between them.
// One canvas (sky + hill + stars), DOM type above it. Pure f(t).
import { lerp, prog, ease } from '../../../src/lib.js'
import { talkHops, signStar } from '../../startalk.js'
import { guideFilm, BEAT, GOLD, BONE, INK, PINK, sparkles } from './guide.js'

const PIS = signStar('pisces')
const ACC = '#b3adff'
const MATE = '#ffa070'
const SPEAK = '♓ YOUR STAR'
const T = {
  hookOut: [2.15, 2.45], open: 2.3, l1: BEAT(3.4) + 0.01, cup: 3.2, fact: 3.4, factDur: 4.0,
  l2: 5.6, high: [5.6, 6.3], string: [6.1, 6.5], catch: 6.6, close: 8.3,
  cut: 8.4, last: 8.46, out: [10.2, 10.45],
}
const LINES = [
  { t: T.l1, text: 'someone gentle *with your heart…*' },
  { t: T.l2, text: 'who still keeps you *grounded.*' },
]
const HOPS = [...talkHops(LINES.map(l => ({ ...l, speaker: SPEAK })), SPEAK, { cps: 30 }).filter(h => h < T.high[0] || h > T.catch), T.catch + 0.05]
const MATE_HOPS = [T.cup, T.catch, T.last + 0.5, T.last + 1.1, T.last + 1.7]
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const GROUND = 1290

function hill(x, vis) {
  x.save(); x.globalAlpha = vis
  x.fillStyle = INK; x.beginPath(); x.ellipse(540, GROUND + 260, 760, 300, 0, Math.PI, 0); x.fill()
  x.fillStyle = '#3f8f72'; x.beginPath(); x.ellipse(540, GROUND + 268, 748, 290, 0, Math.PI, 0); x.fill()
  x.fillStyle = '#5fbf8f'; for (let i = 0; i < 18; i++) x.fillRect(120 + i * 48, GROUND - 4 + Math.abs(i - 9) * 3, 10, 18)
  x.restore()
}

function drawStage(x, t, K) {
  const out = K.popOut(t, T.out)
  if (out <= 0) return
  const last = t >= T.cut
  hill(x, out)
  // the coral star on the hill (strolls on the last line)
  const walk = last ? Math.sin((t - T.cut) * 1.2) * 90 : 0
  const m = K.guide(t, { x: 700 + walk, y: GROUND - 120, size: 240, color: MATE, glyph: null, mood: t < T.cup ? 'neutral' : 'happy', look: [-1, -1], hops: MATE_HOPS, seed: 4, pop: out, lantern: 0 })
  // the cupped heart, held gently
  const hk = K.pop01(t, T.cup, 0.4, 2) * out
  if (t > T.cup) {
    const hx = m.x - 70, hy = m.y + 10 + Math.sin(t * 2.2) * 6
    x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.3 * hk
    const g = x.createRadialGradient(hx, hy, 4, hx, hy, 90); g.addColorStop(0, 'rgba(255,120,170,0.9)'); g.addColorStop(1, 'rgba(255,120,170,0)'); x.fillStyle = g; x.fillRect(hx - 90, hy - 90, 180, 180); x.restore()
    K.drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, hx, hy, 9 * hk)
    sparkles(x, t, hx, hy, T.cup, 8, 80, 0.2, [PINK, GOLD, BONE])
  }
  // the guide floats: rising from the hill (frame 0 mid-drift) → too high → tethered and bobbing
  const rise = lerp(1140, 900, ease.outCubic(prog(t, 0, 2.4)))
  const high = ease.inOutCubic(prog(t, ...T.high)) * 180
  const tug = t > T.catch ? Math.sin((t - T.catch) * 9) * 40 * Math.exp(-(t - T.catch) * 3) : 0
  let gx = 340 + Math.sin(t * 1.3) * 30, gy = rise - high + (t > T.catch ? 80 : 0) + tug
  if (last) { gx = m.x - 230 + Math.sin(t * 1.7) * 20; gy = 920 + Math.sin(t * 2) * 16 }
  const r = K.guide(t, { x: gx, y: gy, size: 260, color: PIS.color, glyph: PIS.glyph, mood: t < T.l2 ? 'sparkle' : t < T.catch ? 'wide' : 'happy', look: t < T.catch ? [1, 1] : [1, 1], hops: HOPS, seed: 12, pop: out, bob: 0, side: -1 })
  // bubbles trailing up
  for (let i = 0; i < 5; i++) {
    const ph = ((t * 0.5 + i * 0.2) % 1)
    x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * 0.8 * out; x.strokeStyle = '#cfe8ff'; x.lineWidth = 4
    x.beginPath(); x.arc(r.x - 60 + i * 30 + Math.sin(ph * 7 + i) * 14, r.y + 120 - ph * 380, 8 + i * 2, 0, 7); x.stroke(); x.restore()
  }
  // the string: drops from the guide's lower tip, caught by the coral star
  const sp = last ? 1 : ease.outCubic(prog(t, ...T.string))
  if (sp > 0) {
    const ax = r.x, ay = r.y + 120
    const hand = t > T.catch || last ? { x: m.x - 100, y: m.y + 40 } : { x: ax + 40, y: lerp(ay, ay + 320, sp) }
    x.save(); x.globalAlpha = out; x.strokeStyle = BONE; x.lineWidth = 5; x.beginPath(); x.moveTo(ax, ay)
    x.quadraticCurveTo((ax + hand.x) / 2 + Math.sin(t * 3) * 20, Math.max(ay, hand.y) + 30, hand.x, hand.y); x.stroke(); x.restore()
    sparkles(x, t, hand.x, hand.y, T.catch, 8, 60, 0.3, [GOLD, BONE, ACC])
  }
}

const F = guideFilm({
  duration: 15, sign: 'pisces', n: 2, speaker: SPEAK, accent: ACC,
  hook: 'What you | *need,* | Pisces.', hookOut: T.hookOut, chipOut: [T.cut - 0.3, T.cut],
  lines: LINES, open: T.open, close: T.close,
  fact: { text: 'IN TRADITIONAL ASTROLOGY,|PISCES RULES THE FEET', at: T.fact, dur: T.factDur, x: 540, y: 330 },
  heads: [
    { text: 'Gentle | *and* grounded.', at: T.last, out: T.out, top: 240, size: 124, accentSize: 186, accentColor: ACC },
  ],
  drawBack: drawStage,
  cues: [
    ['riser', 0, 2.4, 0.012], ['pluck', 0.4, 1318.51, 0.02, 1.2, -0.3],
    ['pop', T.cup, 880, 0.035, 0.3], ['bell', T.cup + 0.1, 1567.98, 0.025, 1.4, 0.3],
    ['riser', T.high[0], T.high[1], 0.02], ['whoosh', T.string[0], 0.3, 0.025], ['tick', T.catch, 0.05], ['pop', T.catch + 0.05, 659.25, 0.04, 0.2],
    ['pluck', T.last + 0.5, 1174.66, 0.03, 0.6, 0],
  ],
  cuts: [{ t: T.cut, kind: 'flip' }],
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
