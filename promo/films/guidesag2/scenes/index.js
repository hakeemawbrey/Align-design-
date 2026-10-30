// guidesag2 (15 s vertical Align ad, Star Talk "Your Star Guide", ♐ note 2 / 3: what you need) · story 0–10.6, then the end card.
//   0.00  "What you need, Sagittarius."  A long road runs off to the hills. The ♐ guide, lantern lit, is mid-stride up it,
//         waving back at a little house where a pale star stands on the porch under a warm porch light.
//   2.6   ♐ YOUR STAR: "someone who lets you roam…"  Sag strolls off over the hill; a postcard flutters back:
//         WISH YOU WERE HERE. The porch light stays on. Chip: the 9th house (travel).
//   5.5   "and is still there when you're back."  Sag comes back down the road; the porch light glows brighter; a hug.
//   8.05  card flip · "Freedom *and* home."  Both on the porch under the light, the road still running off behind them.
// One canvas (sky + hills + road + house + two stars), DOM type above it. Pure f(t).
import { lerp, prog, ease, clamp } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { guideFilm, GOLD, BONE, INK, MONO, SERIF } from './guidefilm.js'

const SAG = signStar('sagittarius'), COL = SAG.color, ACC = '#c9a0ff', PAL = '#ffb3c8'
const T = {
  hookOut: [2.15, 2.45], open: 2.4, l1: 2.6, away: [2.3, 4.3], card: 4.35, fact: 3.2,
  l2: 5.5, back: [5.5, 7.1], hug: 7.15, close: 7.9,
  cut: 8.05, last: 8.12, lastLand: 8.5, out: [10.15, 10.45],
}
const LINES = [
  { t: T.l1, text: 'someone who lets you *roam*…' },
  { t: T.l2, text: "and is still there when you're *back.*" },
]
const NEAR = { x: 640, y: 1190 }, FAR = { x: 760, y: 790 }
const HOME = { x: 470, y: 1180 }
const HOUSE = { x: 230, y: 1010 }, LAMP = { x: 368, y: 930 }
const PX = 300, PY = 1190
const K_out = t => 1 - ease.inCubic(prog(t, ...T.out))

/** Sag's spot on the road: s 0 = near, 1 = over the hill */
function road(t) {
  if (t < T.away[0]) return { s: 0.08 + 0.02 * t, home: 0 }
  if (t < T.back[0]) return { s: lerp(0.12, 1, ease.inCubic(prog(t, ...T.away))), home: 0 }
  const p = prog(t, ...T.back)
  return { s: lerp(1, 0, ease.outCubic(p)), home: ease.inOutCubic(clamp((p - 0.6) / 0.4)) }
}
function sagPos(t) {
  const { s, home } = road(t)
  const k = Math.pow(s, 0.8)
  const x0 = lerp(NEAR.x, FAR.x, k), y0 = lerp(NEAR.y, FAR.y, k)
  return { x: lerp(x0, HOME.x, home), y: lerp(y0, HOME.y, home), size: lerp(260, 34, k), s }
}

function drawLand(x, t) {
  // hills
  x.fillStyle = '#1f1446'; x.beginPath(); x.moveTo(0, 860); for (let i = 0; i <= 1080; i += 40) x.lineTo(i, 820 + Math.sin(i * 0.008 + 1) * 30); x.lineTo(1080, 1920); x.lineTo(0, 1920); x.fill()
  x.fillStyle = '#170f36'; x.beginPath(); x.moveTo(0, 900); for (let i = 0; i <= 1080; i += 40) x.lineTo(i, 880 + Math.sin(i * 0.012) * 24); x.lineTo(1080, 1920); x.lineTo(0, 1920); x.fill()
  // the road, narrowing to the hill
  x.fillStyle = '#3a3060'; x.beginPath(); x.moveTo(NEAR.x - 230, 1330); x.lineTo(NEAR.x + 230, 1330); x.lineTo(FAR.x + 14, FAR.y + 20); x.lineTo(FAR.x - 14, FAR.y + 20); x.fill()
  x.fillStyle = 'rgba(255,207,90,0.7)'
  for (let i = 0; i < 9; i++) {
    const k0 = i / 9, k1 = k0 + 0.05
    const a = { x: lerp(NEAR.x, FAR.x, k0), y: lerp(1330, FAR.y + 20, k0) }, b = { x: lerp(NEAR.x, FAR.x, k1), y: lerp(1330, FAR.y + 20, k1) }
    const w = lerp(12, 2, k0)
    x.fillRect(Math.min(a.x, b.x) - w / 2, b.y, w + Math.abs(a.x - b.x), a.y - b.y)
  }
  // the ground in front
  x.fillStyle = 'rgba(239,230,214,0.12)'; x.fillRect(0, 1326, 1080, 6)
}

function drawHouse(x, t) {
  const { x: hx, y: hy } = HOUSE
  // porch light glow (brightens when Sag heads home)
  const bright = 1 + 0.5 * clamp(prog(t, T.back[0] + 0.6, T.back[1]))
  const fl = 0.9 + 0.1 * Math.sin(t * 11)
  const R = 230 * bright
  const g = x.createRadialGradient(LAMP.x, LAMP.y, 0, LAMP.x, LAMP.y, R)
  g.addColorStop(0, `rgba(255,214,120,${0.55 * fl})`); g.addColorStop(1, 'rgba(255,214,120,0)')
  x.fillStyle = g; x.fillRect(LAMP.x - R, LAMP.y - R, 2 * R, 2 * R)
  // body + roof
  x.fillStyle = INK; x.fillRect(hx - 160, hy - 120, 300, 300)
  x.fillStyle = '#5a3a6a'; x.fillRect(hx - 152, hy - 112, 284, 284)
  x.fillStyle = INK; for (let k = 0; k < 9; k++) x.fillRect(hx - 190 + k * 18, hy - 130 - k * 20, 360 - k * 36, 22)
  x.fillStyle = '#8a3a4a'; for (let k = 0; k < 8; k++) x.fillRect(hx - 182 + k * 18, hy - 126 - k * 20, 344 - k * 36, 14)
  // window (warm)
  x.fillStyle = INK; x.fillRect(hx - 120, hy - 70, 90, 80); x.fillStyle = '#ffcf6a'; x.fillRect(hx - 114, hy - 64, 78, 68); x.fillStyle = INK; x.fillRect(hx - 78, hy - 64, 6, 68); x.fillRect(hx - 114, hy - 33, 78, 6)
  // door
  x.fillStyle = INK; x.fillRect(hx + 10, hy + 20, 90, 160); x.fillStyle = '#9c6a44'; x.fillRect(hx + 16, hy + 26, 78, 154); x.fillStyle = GOLD; x.fillRect(hx + 78, hy + 100, 10, 10)
  // porch lamp
  x.fillStyle = INK; x.fillRect(LAMP.x - 22, LAMP.y - 30, 44, 56); x.fillStyle = `rgba(255,236,170,${fl})`; x.fillRect(LAMP.x - 16, LAMP.y - 24, 32, 44)
  // porch boards
  x.fillStyle = INK; x.fillRect(hx - 170, 1300, 420, 30); x.fillStyle = '#9c6a44'; x.fillRect(hx - 164, 1304, 408, 20)
}

function postcard(x, t, K) {
  const k = K.pop01(t, T.card, 0.4, 2.0) * (1 - ease.inCubic(prog(t, T.back[0] + 0.1, T.back[0] + 0.4)))
  if (k <= 0.01) return
  const fl = Math.sin(t * 3) * 0.05
  x.save(); x.translate(790, 620 + (1 - k) * 200); x.rotate(0.08 + fl); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -110, 340, 220)
  x.fillStyle = '#f5eedf'; x.fillRect(-162, -102, 324, 204)
  x.fillStyle = '#5fa06a'; x.fillRect(-150, -10, 150, 90)
  x.fillStyle = '#8fd3ff'; x.fillRect(-150, -90, 150, 80)
  x.fillStyle = '#efe6d6'; x.beginPath(); x.moveTo(-140, -10); x.lineTo(-90, -70); x.lineTo(-40, -10); x.fill()
  x.fillStyle = INK; x.fillRect(4, -96, 2, 186)
  x.fillStyle = '#e23d4f'; x.fillRect(100, -90, 50, 56); x.fillStyle = '#f5eedf'; x.fillRect(106, -84, 38, 44)
  x.fillStyle = INK; x.font = `italic 500 30px ${SERIF}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText('wish you', 20, 0); x.fillText('were here!', 20, 36); x.font = `700 22px ${MONO}`; x.fillText('— ♐', 20, 74)
  x.restore()
}

const F = guideFilm({
  duration: 15, speaker: '♐ YOUR STAR', color: COL, accent: ACC, glyph: SAG.glyph,
  chip: { sign: 'SAGITTARIUS', glyph: '♐', n: 2, of: 3 },
  hook: { text: 'What you *need,* | Sagittarius.', out: T.hookOut, size: 100 },
  lines: LINES, open: T.open, close: T.close,
  fact: { text: 'SAGITTARIUS RULES THE|9TH HOUSE (TRAVEL)', at: T.fact, dur: T.close - T.fact - 0.15, x: 540, y: 1356, size: 28 },
  heads: [{ text: 'Freedom | *and* home.', at: T.last, out: T.out, top: 196, size: 124, accentSize: 180, accentColor: ACC, late: 2, lateAt: T.lastLand }],
  guide(t) {
    const p = sagPos(t)
    if (p.s > 0.97) return { hidden: true }
    const walking = (t < T.away[1]) || (t > T.back[0] && t < T.back[1])
    const mood = t < T.away[0] ? { mood: 'happy' } : t < T.back[0] ? { mood: 'happy', look: [0.4, -1] } : t < T.hug ? { mood: 'sparkle', look: [-1, 0] } : { mood: 'heart' }
    return { x: p.x, y: p.y, size: p.size, ...mood, squash: walking ? 0.05 * Math.abs(Math.sin(t * 9)) : 0, pop: K_out(t), side: 1, lanternGlow: p.size > 120 ? 1 : 0.7, glyph: p.size > 120 ? SAG.glyph : null, hops: [] }
  },
  drawBack(x, t, K) {
    const ko = K_out(t)
    x.save(); x.globalAlpha = clamp(ko * 1.3)
    drawLand(x, t)
    drawHouse(x, t)
    x.restore()
    postcard(x, t, K)
  },
  drawFront(x, t, K) {
    const ko = K_out(t)
    if (ko <= 0.01) return
    const wave = t < T.away[0] + 0.6 || (t > T.back[0] + 0.5 && t < T.hug) ? 0.05 * Math.sin(t * 12) : 0
    const pm = t < T.away[1] ? { mood: 'happy', look: [1, -0.4] } : t < T.back[0] ? { mood: 'neutral', look: [1, -1] } : t < T.hug ? { mood: 'sparkle', look: [1, -0.4] } : { mood: 'heart' }
    K.star({ x: PX, y: PY, size: 190, t, color: PAL, glyph: null, ...pm, seed: 9, hops: [], squash: wave, pop: ko })
    K.sparkles(t, (PX + HOME.x) / 2, PY - 110, T.hug, 10, 170, 0.3, [GOLD, ACC, PAL])
    K.sparkles(t, LAMP.x, LAMP.y, T.back[1] - 0.4, 8, 110, 0.7, [GOLD, BONE])
  },
  cues: [
    ['pop', 0.3, 987.77, 0.02, -0.4], ['pop', 1.1, 1174.66, 0.02, -0.4],
    ...[2.5, 2.9, 3.3, 3.7, 4.1].map(v => ['tick', v, 0.018]),
    ['whoosh', T.card - 0.05, 0.4, 0.03], ['pluck', T.card + 0.3, 1318.51, 0.04, 0.6, 0.4],
    ['whoosh', T.back[0], 0.3, 0.02], ...[5.9, 6.3, 6.7].map(v => ['tick', v, 0.022]), ['bell', T.back[1] - 0.4, 1567.98, 0.03, 1.2, -0.3],
    ['pop', T.hug, 1318.51, 0.045, 0], ['glitter', T.hug, T.hug + 0.5],
    ['whoosh', T.out[0], 0.35, 0.03],
  ],
  cuts: [{ t: T.cut, kind: 'flip' }],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
