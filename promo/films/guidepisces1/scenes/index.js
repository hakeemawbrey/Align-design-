// guidepisces1 (20 s vertical Align ad, Star Talk "Your Star Guide", Pisces note 1 / 3: the blind spot) · story 0–15.6,
// then the shared end card.
//   0.00       "*Pisces*, your star has a note."  The ♓ guide, starry-eyed, gazes up at a dreamy thought bubble: the coral star
//              in a crown and cape under a rainbow. The real coral star stands right there, waving, holding a coffee.
//   2.82 drop  ♓ YOUR STAR: "you fall for who they could be."  The dream gets grander: the rainbow arcs in, sparkles.
//              The ★ ASTROLOGY SAYS chip: mutable water; Jupiter (traditional) and Neptune (modern).
//   6.40       "date who they are today."  POP! The bubble bursts; the crown clinks to the ground. The guide blinks, turns,
//              and sees the real coral star, still smiling, still holding out the coffee. Heart eyes.
//   10.40 cut  "Love the | *real* them."  Side by side; the coral star hands over a second coffee; a heart.
// One canvas (sky + bubble + stars), DOM type above it. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { talkHops, signStar } from '../../startalk.js'
import { drawBurst } from '../../stguide.js'
import { guideFilm, BEAT, GOLD, BONE, INK, PINK, sparkles } from './guide.js'

const PIS = signStar('pisces')
const ACC = '#b3adff'
const MATE = '#ffa070'
const SPEAK = '♓ YOUR STAR'
const T = {
  hookOut: [2.3, 2.6], open: 2.6, l1: BEAT(4) + 0.02, rainbow: [3.6, 4.4], fact: 4.6, factDur: 3.9,
  l2: 6.4, pop: 7.0, crown: [7.0, 7.7], turn: 7.9, love: 8.7, close: 9.9,
  cut: 10.4, last: 10.48, give: [11.2, 11.8], heart: 12.0, out: [15.15, 15.45],
}
const LINES = [
  { t: T.l1, text: 'you fall for who they *could be.*' },
  { t: T.l2, text: 'date who they are *today.*' },
]
const HOPS = [...talkHops(LINES.map(l => ({ ...l, speaker: SPEAK })), SPEAK, { cps: 30 }), T.turn, T.love, T.heart]
const MATE_HOPS = [0.3, 1.5, T.turn + 0.3, T.give[1], T.heart]
const CROWN = ['Y.Y.Y', 'YYYYY', 'YRYBY', 'YYYYY']
const CUP = ['.SSS.', 'WWWWWW', 'WCCCWW', 'WCCCW.', 'WCCCW.', '.WWW..']
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const BC = { x: 480, y: 830, r: 215 }

function cup(x, K, cx, cy, s, a = 1) { K.drawBits(x, CUP, { S: 'rgba(239,230,214,0.7)', W: BONE, C: '#8a5a3a' }, cx, cy, s, { alpha: a }) }

function dream(x, t, K, vis) {
  const burst = t >= T.pop
  if (burst) return
  const k = vis * (1 + 0.02 * Math.sin(t * 2))
  x.save(); x.globalAlpha = vis
  // trailing thought puffs down toward the guide
  for (const [px, py, pr] of [[300, 1080, 18], [340, 1040, 26]]) { x.fillStyle = INK; x.beginPath(); x.arc(px, py, pr + 7, 0, 7); x.fill(); x.fillStyle = '#f3ecff'; x.beginPath(); x.arc(px, py, pr, 0, 7); x.fill() }
  // the cloud bubble (bumpy)
  const bumps = 10
  x.fillStyle = INK
  for (let i = 0; i < bumps; i++) { const a = i / bumps * Math.PI * 2; x.beginPath(); x.arc(BC.x + Math.cos(a) * BC.r * k, BC.y + Math.sin(a) * BC.r * 0.72 * k, 82 * k + 8, 0, 7); x.fill() }
  x.fillStyle = '#f3ecff'
  for (let i = 0; i < bumps; i++) { const a = i / bumps * Math.PI * 2; x.beginPath(); x.arc(BC.x + Math.cos(a) * BC.r * k, BC.y + Math.sin(a) * BC.r * 0.72 * k, 82 * k, 0, 7); x.fill() }
  x.beginPath(); x.ellipse(BC.x, BC.y, BC.r * k, BC.r * 0.72 * k, 0, 0, 7); x.fill()
  // a dreamy pink wash inside
  const g = x.createRadialGradient(BC.x, BC.y, 10, BC.x, BC.y, BC.r); g.addColorStop(0, 'rgba(255,190,230,0.65)'); g.addColorStop(1, 'rgba(200,180,255,0.1)')
  x.fillStyle = g; x.beginPath(); x.ellipse(BC.x, BC.y, BC.r * k, BC.r * 0.72 * k, 0, 0, 7); x.fill()
  // rainbow
  const rp = ease.outCubic(prog(t, ...T.rainbow))
  if (rp > 0) {
    const cols = ['#ff6b6b', '#ffb84d', '#ffe66d', '#6bdc8a', '#5fb3ff', '#a98bff']
    cols.forEach((c, i) => { x.strokeStyle = c; x.lineWidth = 12; x.beginPath(); x.arc(BC.x, BC.y + 100, 170 - i * 12, Math.PI, Math.PI + Math.PI * rp); x.stroke() })
  }
  x.restore()
}

function drawStage(x, t, K) {
  const out = K.popOut(t, T.out)
  if (out <= 0) return
  const last = t >= T.cut
  if (!last) dream(x, t, K, out)
  // the dream version inside the bubble: coral star, crown, cape-ish sparkle
  if (!last && t < T.pop) {
    const d = K.guide(t, { x: BC.x, y: BC.y + 40, size: 200, color: MATE, glyph: null, mood: 'wink', look: [0, 0], seed: 9, pop: out, lantern: 0, glow: 1.4 })
    K.drawBits(x, CROWN, { Y: '#ffd24a', R: '#ff4f86', B: '#5fb3ff' }, d.x, d.top - 10, 14)
    K.sparkles(t, BC.x, BC.y, T.rainbow[1], 10, 200, 0.6, [GOLD, PINK, '#ffffff'])
  }
  if (!last && t >= T.pop) {
    drawBurst(x, BC.x, BC.y, 200, t, T.pop, { word: 'POP!' })
    sparkles(x, t, BC.x, BC.y, T.pop, 14, 240, 0.2, [PINK, '#f3ecff', GOLD])
    // the crown falls and clinks
    const cp = prog(t, ...T.crown)
    const cy = cp < 1 ? lerp(BC.y - 120, 1270, ease.inQuad(cp)) : 1270 - Math.abs(Math.sin((t - T.crown[1]) * 9)) * 18 * Math.exp(-(t - T.crown[1]) * 4)
    K.drawBits(x, CROWN, { Y: '#ffd24a', R: '#ff4f86', B: '#5fb3ff' }, BC.x + 40, cy, 12, { rot: cp * 2.6 })
  }
  // the real coral star (always right there)
  const mx = last ? 720 : 820
  const m = K.guide(t, { x: mx, y: 1180, size: 250, color: MATE, glyph: null, mood: 'happy', look: [-1, 0], hops: MATE_HOPS, seed: 4, pop: out, lantern: 0 })
  cup(x, K, m.x - 120, m.y + 10 + Math.sin(t * 3) * 4, 12, out)
  if (last) {
    const gp = ease.inOutCubic(prog(t, ...T.give))
    cup(x, K, lerp(m.x + 120, 470, gp), m.y + 10 - Math.sin(Math.PI * gp) * 60, 12, out)
  }
  const look = t < T.turn ? [-1, -1] : [1, 0]
  const mood = t < T.pop ? 'sparkle' : t < T.turn ? 'wide' : t < T.love ? 'neutral' : 'heart'
  K.guide(t, { x: last ? 360 : 300, y: 1180, size: 280, color: PIS.color, glyph: PIS.glyph, mood: last ? (t > T.heart ? 'heart' : 'happy') : mood, look, hops: HOPS, seed: 12, pop: out, side: -1 })
  if (last && t > T.heart) for (let i = 0; i < 3; i++) { const b = T.heart + i * 0.45, p = prog(t, b, b + 1.3); if (p > 0 && p < 1) K.drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, 540 + (i - 1) * 80, 960 - p * 200, 8, { alpha: Math.sin(Math.PI * p) }) }
}

const F = guideFilm({
  duration: 20, sign: 'pisces', n: 1, speaker: SPEAK, accent: ACC,
  hook: '*Pisces,* | your star | has a note.', hookOut: T.hookOut, chipOut: [T.cut - 0.3, T.cut],
  lines: LINES, open: T.open, close: T.close,
  fact: { text: 'PISCES: MUTABLE WATER|RULED BY JUPITER (TRADITIONAL)|AND NEPTUNE (MODERN)', at: T.fact, dur: T.factDur, x: 540, y: 330 },
  heads: [
    { text: 'Love the | *real* them.', at: T.last, out: T.out, top: 230, size: 124, accentSize: 186, accentColor: ACC },
  ],
  drawBack: drawStage,
  cues: [
    ['pluck', 0.3, 1318.51, 0.02, 1.2, -0.3], ['pluck', 1.2, 1567.98, 0.02, 1.2, -0.3],
    ['riser', T.rainbow[0], T.rainbow[1], 0.02], ['glitter', T.rainbow[1], T.rainbow[1] + 0.5],
    ['boom', T.pop, 0.1], ['pop', T.pop, 1760, 0.05, -0.2], ['glitter', T.pop, T.pop + 0.5],
    ['tick', T.crown[1], 0.06], ['tick', T.crown[1] + 0.15, 0.04], ['pop', T.crown[1], 2093, 0.025, -0.2],
    ['whoosh', T.turn, 0.3, 0.025], ['pluck', T.love, 1174.66, 0.04, 0.6, 0],
    ['whoosh', T.give[0], 0.4, 0.025], ['pop', T.give[1], 880, 0.035, 0], ['pluck', T.heart, 1318.51, 0.04, 0.6, 0],
    ['whoosh', T.out[0], 0.35, 0.03],
  ],
  cuts: [{ t: T.cut, kind: 'flip' }],
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
