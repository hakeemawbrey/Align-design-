// v3a096: star_advice, ADVICE SOLO, "Signs you're | a healed Pisces." (~45 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): the small wins of a healed Pisces. Pisces cries in every
// card (it's still Pisces), but now the tears come with water, boundaries and glitter.
//   0.0–3.6    "Signs you're | *a healed Pisces.*"
//   3.6–37.8   nine cards (3.8 s each):
//              you cry, then drink water (HYDRATED) · one sad song, not the album (TRACK 1 ONLY) · a no without a speech
//              · your dreams have deadlines (DUE FRIDAY) · no more fixer-uppers (NOT YOUR JOB) · you read the chart AND the
//              red flags · still cry at movies, proudly · keep some magic for you (a jar of stars: MINE)
//              · your boundaries have glitter (a sparkly little fence)
//  37.8        "Soft. | *And strong.*"  Pisces comes back, big.
//  41.2        callback: "The red flag? | *Walked past it.*"  the red flag comes back, waved goodbye.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PIS = '#7c74f0', RED = '#e23d4e', WOOD = '#c98f2a'
const S = 'pisces'

const GLASS = ['GGGGGGGG', 'G......G', 'GBBBBBBG', 'GBwBBBBG', 'GBBBBBBG', 'GBBBBBBG', '.GBBBBG.', '.GGGGGG.']
const GLASS_C = { G: '#dff6ff', B: SKYB, w: '#ffffff' }
const FLAG = ['PRRRRRR.', 'PRRRRRRR', 'PRRRRRRR', 'PRRRRRR.', 'P.......', 'P.......', 'P.......', 'P.......', 'P.......']
const FLAG_C = { P: BONE, R: RED }
const POPCORN = ['.W.WW.W.', 'WWWWWWWW', 'WYWWWYWW', 'RWRWRWRW', 'RWRWRWRW', 'RWRWRWRW', '.RWRWRW.']
const POPCORN_C = { W: '#fff4e2', Y: GOLD, R: RED }
const RECORD = ['..KKKKK..', '.KKKKKKK.', 'KKKgggKKK', 'KKgPPPgKK', 'KKgPKPgKK', 'KKgPPPgKK', 'KKKgggKKK', '.KKKKKKK.', '..KKKKK..']
const RECORD_C = { K: '#2a2350', g: '#3d3470', P: PINK }

function chart(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(t * 0.25); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 120, 0, 7); x.fill(); x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, 110, 0, 7); x.fill()
  x.strokeStyle = LAV; x.lineWidth = 4; x.beginPath(); x.arc(0, 0, 110, 0, 7); x.stroke(); x.beginPath(); x.arc(0, 0, 70, 0, 7); x.stroke()
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.beginPath(); x.moveTo(Math.cos(a) * 70, Math.sin(a) * 70); x.lineTo(Math.cos(a) * 110, Math.sin(a) * 110); x.stroke() }
  x.restore()
}
function jar(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-100, -150, 200, 290); x.fillStyle = 'rgba(191,232,255,0.35)'; x.fillRect(-92, -120, 184, 252)
  x.fillStyle = WOOD; x.fillRect(-92, -142, 184, 30)
  const COLS = [GOLD, PINK, MINT, SKYB, BONE]
  for (let i = 0; i < 9; i++) { const px = -60 + (i % 3) * 60 + 8 * Math.sin(t * 2 + i), py = -60 + Math.floor(i / 3) * 60 + 8 * Math.cos(t * 2.4 + i); x.globalAlpha = 0.6 + 0.4 * Math.sin(t * 4 + i); x.fillStyle = COLS[i % 5]; x.fillRect(px - 9, py - 9, 18, 18); x.fillRect(px - 3, py - 18, 6, 36); x.fillRect(px - 18, py - 3, 36, 6) }
  x.globalAlpha = 1
  x.restore()
}
function fence(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < 4; i++) { const fx = -150 + i * 100; x.fillStyle = INK; x.beginPath(); x.moveTo(fx - 30, -60); x.lineTo(fx, -100); x.lineTo(fx + 30, -60); x.lineTo(fx + 30, 110); x.lineTo(fx - 30, 110); x.fill(); x.fillStyle = '#fff4e2'; x.beginPath(); x.moveTo(fx - 22, -58); x.lineTo(fx, -88); x.lineTo(fx + 22, -58); x.lineTo(fx + 22, 102); x.lineTo(fx - 22, 102); x.fill() }
  x.fillStyle = INK; x.fillRect(-190, -20, 380, 30); x.fillRect(-190, 50, 380, 30); x.fillStyle = PINK; x.fillRect(-184, -14, 368, 18); x.fillRect(-184, 56, 368, 18)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'You cry. | Then *drink water.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', tears: lt => lt > 1.4 ? 1 : 2, look: [1, 0], star: { x: -220 }, hops: [1.5],
    front(x, t, lt, P) {
      drawBits(x, GLASS, GLASS_C, 790, 900, 24 * pop01(t, P.t0 + 0.4, 0.3, 2))
      label(x, 790, 1100, 'HYDRATED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'One sad song. | *Not the whole album.*', mood: lt => lt > 1.5 ? 'happy' : 'sleepy', tears: 2, look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      drawBits(x, RECORD, RECORD_C, 790, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt < 1.5 ? t * 3 : 0 })
      label(x, 790, 1100, 'TRACK 1 ONLY', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You say no | *without a speech.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', tears: 1, look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'sagittarius', 830, 990, 170 * k, { mood: lt > 1.4 ? 'happy' : 'sparkle', look: [-1, 0], seed: 21, glyph: false })
      bubble(x, 820, 650, 'help me move | 3 sofas?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 30, tail: 'br' })
      bubble(x, 360, 650, 'no thanks!', pop01(t, P.t0 + 0.9, 0.25, 2.4), { size: 36, tail: 'bl', col: '#d7d3ff' })
      label(x, 600, 1140, 'THAT’S IT. DONE.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your dreams | have *deadlines* now.', mood: lt => lt > 1.4 ? 'sparkle' : 'sleepy', tears: 1, look: [1, -1], star: { x: -220 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 1.8)
      if (k > 0.01) { x.save(); x.globalAlpha = k; for (const [cx, cy, r] of [[770, 780, 115], [675, 800, 78], [865, 800, 80], [770, 840, 105]]) { x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, r + 8, 0, 7); x.fill() } for (const [cx, cy, r] of [[770, 780, 115], [675, 800, 78], [865, 800, 80], [770, 840, 105]]) { x.fillStyle = '#efeaff'; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill() } x.restore() }
      label(x, 770, 790, 'OPEN A BAKERY', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
      label(x, 790, 1060, 'DUE: FRIDAY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'No more | *fixer-uppers.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', tears: 1, look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'scorpio', 820, 980, 170 * k, { mood: 'eyeroll', look: [-1, 0], seed: 22, glyph: false })
      bubble(x, 800, 650, 'you can | fix me', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 32, tail: 'br' })
      label(x, 600, 1130, 'NOT YOUR JOB', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: PIS, color: BONE, rot: -0.04 })
    } },
  { sign: S, cap: 'You read the chart | *and the red flags.*', mood: lt => lt > 1.4 ? 'squint' : 'sparkle', tears: 1, look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      chart(x, t, 720, 860, pop01(t, P.t0 + 0.2, 0.35, 2))
      drawBits(x, FLAG, FLAG_C, 890, 900, 18 * pop01(t, P.t0 + 1.1, 0.3, 2.4), { rot: 0.1 * Math.sin(t * 6) })
      label(x, 790, 1120, 'NOTED.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 40, bg: BONE, rot: -0.04 })
    } },
  { sign: S, cap: 'Crying at movies? | *Still. Proudly.*', mood: 'wide', tears: lt => lt > 0.9 ? 3 : 2, look: [1, -1], star: { x: -220 },
    front(x, t, lt, P) {
      drawBits(x, POPCORN, POPCORN_C, 800, 930, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 690, 'THE DOG LIVED', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You keep some magic | *just for you.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', tears: 1, look: [1, 0], star: { x: -220 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      jar(x, t, 800, 880, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 800, 1100, 'MINE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 44, bg: LAV, rot: -0.05 })
    } },
  { sign: S, cap: 'Your boundaries | *have glitter.*', mood: 'sparkle', tears: 1, look: [1, 0], star: { x: -220 }, hops: [0.9, 1.7],
    front(x, t, lt, P) {
      fence(x, t, 770, 920, 0.85 * pop01(t, P.t0 + 0.2, 0.35, 2))
      sparkles(x, t, 790, 880, P.t0 + 0.6, 8, 190, 0.2, [GOLD, PINK, SKYB])
      sparkles(x, t, 790, 880, P.t0 + 1.4, 8, 220, 1.0, [MINT, BONE, PINK])
      label(x, 790, 690, 'CUTE BUT FIRM', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a096', key: 'D', accent: LAV, solo: S, ending: 'callback',
  title: 'Signs you’re | *a healed Pisces.*',
  cameos: CAMEOS,
  group: { cap: 'Soft. | *And strong.*', mood: 'heart' },
  last: {
    text: 'The red flag? | *Walked past it.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.45, 1.8), go = ease.inCubic(prog(lt, 1.6, 3.2))
      drawBits(x, FLAG, FLAG_C, 540 + go * 700, 1000, 30 * k, { rot: 0.1 * Math.sin(t * 6) })
      label(x, 540, 1260, 'BYE!', pop01(t, t - lt + 1.0, 0.3, 2.4), { size: 48, bg: PIS, color: BONE, rot: -0.05 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
