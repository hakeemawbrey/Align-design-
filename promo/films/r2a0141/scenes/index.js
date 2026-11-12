// r2a0141: star_advice, ADVICE SOLO, "Leo, you're not | too much." (~51 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Leo truth + a warm reframe, one gag each.
//   0.0–3.6    "Leo, you're not | *too much.*"
//   3.6–37.8   nine cards (3.8 s each):
//              loud laugh, the best sound (a volume meter maxed on JOY) · dressed up to buy milk, main character energy
//              · texted in all caps, just excitement · hyped a friend up, they needed it (megaphone) · want to be seen,
//              totally human (a spotlight) · big feelings, big heart (a giant beating heart) · danced at the bus stop,
//              made someone's day · asked "was I too much?", the answer is "never" · the right match loves your volume
//  37.8        "Not too much. | *Just enough.*"  Leo comes back, big.
//  41.0        LESSON UNLOCKED: "Your warmth is a gift. | *Keep it lit.*"  STATUS: GLOWING
//  46.9        "Turn it up, | *Leo.*"  the volume meter comes back, maxed.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e'
const S = 'leo'

// ── props
// a volume meter: bars fill left to right, the last ones red; the readout says JOY
function meter(x, cx, cy, k, p, { word = 'JOY' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-176, -96, 364, 212)
  x.fillStyle = INK; x.fillRect(-188, -108, 376, 216); x.fillStyle = '#2a2350'; x.fillRect(-178, -98, 356, 196)
  const n = 8, on = Math.round(p * n)
  for (let i = 0; i < n; i++) { const h = 30 + i * 12; x.fillStyle = i < on ? (i >= 6 ? RED : i >= 4 ? ORANGE : MINT) : '#3d3470'; x.fillRect(-150 + i * 38, 40 - h, 26, h) }
  x.fillStyle = BONE; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`VOLUME: ${p >= 0.99 ? word : Math.round(p * 10)}`, 0, 72)
  x.restore()
}
const BOTTLE = ['.WW.', '.BB.', 'WWWW', 'WWWW', 'WBBW', 'WBBW', 'WWWW', 'WWWW']
const BOTTLE_C = { W: '#f4f1ff', B: SKYB }
const CROWN = ['Y...Y...Y', 'YY.YYY.YY', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY']
const CROWN_C = { Y: GOLD, R: RED, B: SKYB }
const MEGA = [
  '........RR',
  '......RRRR',
  'KK..RRRRRR',
  'KKRRRRRRRR',
  'KKRRRRRRRR',
  'KK..RRRRRR',
  '......RRRR',
  '........RR',
]
const MEGA_C = { R: '#ff6b5a', K: '#2a2350' }
const BIGHEART = ['.HH...HH.', 'HHHH.HHHH', 'HWHHHHHHH', 'HWHHHHHHH', 'HHHHHHHHH', '.HHHHHHH.', '..HHHHH..', '...HHH...', '....H....']
// a phone with a message thread
function phone(x, cx, cy, k, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-118, -178, 252, 372)
  x.fillStyle = INK; x.fillRect(-130, -190, 260, 380); x.fillStyle = '#2a2350'; x.fillRect(-120, -180, 240, 360)
  x.fillStyle = '#140c30'; x.fillRect(-108, -158, 216, 316)
  fn(x); x.restore()
}
function msg(x, y, text, col, right, size = 30) {
  x.font = `800 ${size}px ${INTER}`
  const w = x.measureText(text).width + 28, h = size + 22, l = right ? 96 - w : -96
  x.fillStyle = col; x.fillRect(l, y - h / 2, w, h)
  x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(text, l + 14, y + 2)
}
// a little bus stop sign
function busStop(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-10, -120, 20, 360)
  x.fillStyle = INK; x.beginPath(); x.arc(0, -150, 74, 0, 7); x.fill()
  x.fillStyle = '#2fc79a'; x.beginPath(); x.arc(0, -150, 64, 0, 7); x.fill()
  x.fillStyle = BONE; x.font = `800 38px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BUS', 0, -148)
  x.restore()
}
// a match profile card: a star inside, a chip under it
function profile(x, t, cx, cy, k, id, chip) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -150, 260, 320)
  x.fillStyle = INK; x.fillRect(-136, -164, 272, 328)
  x.fillStyle = '#2a2350'; x.fillRect(-128, -156, 256, 312)
  x.fillStyle = '#140c30'; x.fillRect(-114, -142, 228, 210)
  x.restore()
  signChar(x, t, id, cx - 2, cy - 50 * k, 160 * k, { mood: 'heart', seed: 51, glyph: false, glow: 0.8 })
  label(x, cx, cy + 108 * k, chip, k, { size: 26, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
}

const CAMEOS = [
  { sign: S, cap: 'Loud laugh? | It’s *the best sound.*', mood: lt => lt > 0.6 ? 'happy' : 'sparkle', look: [1, 0], star: { x: -200 }, hops: [0.7, 1.1, 1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      meter(x, 780, 880, pop01(t, P.t0 + 0.2, 0.3, 2), clamp((lt - 0.4) / 1.1))
      bubble(x, 780, 650, 'HA HA HA', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: S, cap: 'Dressed up to buy milk? | *Main character energy.*', mood: 'sparkle', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, BOTTLE, BOTTLE_C, 780, 880, 26 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.1 })
      drawBits(x, CROWN, CROWN_C, P.cx - 200, 690, 12 * pop01(t, P.t0 + 0.9, 0.3, 2), { rot: -0.08 })
      label(x, 780, 1100, 'JUST GETTING MILK', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 340, 860, P.t0 + 1.1, 7, 180, 0.4)
    } },
  { sign: S, cap: 'Texted in all caps? | That’s *just excitement.*', mood: lt => lt > 1.0 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      phone(x, 780, 880, pop01(t, P.t0 + 0.2, 0.3, 2), x => {
        if (lt > 0.5) msg(x, -100, 'got the job!', LAV, false, 28)
        if (lt > 0.9) msg(x, -20, 'OMG YES!!!', ORANGE, true, 34)
        if (lt > 1.3) msg(x, 60, 'SO PROUD', ORANGE, true, 34)
        if (lt > 1.7) msg(x, 130, 'haha thank u', LAV, false, 26)
      })
    } },
  { sign: S, cap: 'Hyped your friend up? | *They needed that.*', mood: 'sparkle', look: [1, 0], star: { x: -220 }, hops: [0.9],
    front(x, t, lt, P, F) {
      drawBits(x, MEGA, MEGA_C, F.x + 170, F.cy - 10, 13 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const k = pop01(t, P.t0 + 0.5, 0.35, 2), up = lt > 1.2
      if (k > 0.01) signChar(x, t, 'virgo', 830, 980, 200 * k, { mood: up ? 'sparkle' : 'neutral', look: up ? [0, 0] : [0, 1], seed: 17, glyph: false, hops: [P.t0 + 1.6] })
      bubble(x, 800, 660, 'YOU GOT THIS!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, tail: 'bl' })
      if (up) sparkles(x, t, 830, 960, P.t0 + 1.2 * 1.29, 7, 150, 0.6)
    } },
  { sign: S, cap: 'Want to be seen? | *Totally human.*', mood: lt => lt > 0.9 ? 'happy' : 'neutral', star: { x: -40 }, hops: [1.0],
    back(x, t, lt, P) {
      const k = clamp(ease.outCubic(prog(lt, 0.4, 0.9)))
      if (k <= 0.01) return
      x.save(); x.globalAlpha = 0.28 * k; x.fillStyle = '#fff1c8'
      x.beginPath(); x.moveTo(470, 470); x.lineTo(610, 470); x.lineTo(760, 1150); x.lineTo(320, 1150); x.closePath(); x.fill()
      x.restore()
    },
    front(x, t, lt, P) {
      label(x, 820, 690, 'SEEN ✦', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.06, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Big feelings? | *Big heart.* Same thing.', mood: 'heart', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2), beat = 1 + 0.08 * Math.max(0, Math.sin(t * 8))
      drawBits(x, BIGHEART, { H: '#ff4f86', W: '#fff' }, 780, 860, 30 * k * beat)
      label(x, 780, 1100, 'SIZE: XXL', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Danced at the bus stop? | *Made someone’s day.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', star: { x: -200 }, hops: [0.4, 0.8, 1.2, 1.6, 2.0],
    squash: lt => 0.06 * Math.sin(lt * 14),
    back(x, t, lt, P) { busStop(x, 620, 960, pop01(t, P.t0 + 0.15, 0.3, 2)) },
    front(x, t, lt, P) {
      notes(x, t, 360, 760, { n: 4, cell: 7, col: ORANGE, seed: 2 })
      const k = pop01(t, P.t0 + 0.9, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 830, 1000, 190 * k, { mood: lt > 1.5 ? 'happy' : 'neutral', look: [-1, 0], seed: 13, glyph: false })
      if (lt > 1.5) hearts(x, t, 830, 900, P.t0 + 1.5 * 1.29, { n: 4, life: 1.4, spread: 120, cell: 7, seed: 5 })
    } },
  { sign: S, cap: '“Was I too much?” | The answer: *never.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 770, 700, 'was i too much?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
      bubble(x, 800, 930, 'NEVER.', pop01(t, P.t0 + 1.1, 0.25, 2.4), { size: 62, col: GOLD, tail: 'br' })
      if (lt > 1.2) hearts(x, t, 560, 900, P.t0 + 1.2 * 1.29, { n: 5, life: 1.6, spread: 140, cell: 7, seed: 6 })
    } },
  { sign: S, cap: 'The right match | loves *your volume.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      profile(x, t, 780, 860, pop01(t, P.t0 + 0.3, 0.35, 2), 'sagittarius', '✦ LOVES LOUD')
      hearts(x, t, 560, 820, P.t0 + 1.4, { n: 5, life: 1.7, spread: 160, cell: 7, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'r2a0141', key: 'D', accent: ORANGE, solo: S, ending: 'lesson',
  title: 'Leo, you’re not | *too much.*',
  cameos: CAMEOS,
  group: { cap: 'Not too much. | *Just enough.*', mood: 'sparkle' },
  lesson: { text: 'Your warmth is a gift. | *Keep it lit.*', chip: 'STATUS: GLOWING' },
  last: {
    text: 'Turn it up, | *Leo.*',
    draw(x, t, lt) { meter(x, 540, 1250, 1.2 * pop01(t, t - lt + 0.5, 0.4, 1.8), clamp((lt - 0.8) / 1.2), { word: 'JOY' }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
