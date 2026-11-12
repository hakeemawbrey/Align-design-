// r2a0302: star_advice, ADVICE SOLO, "Pisces, here's your | *Sunday reset.*" (~43 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way: a nine-step Sunday reset for a Pisces, each a relatable truth + a warm reframe. Pisces cries in
// every card (happy tears too). Ending: group.
//   0.0–3.6    "Pisces, here's your | *Sunday reset.*"
//   3.6–37.8   nine cards: cried at an advert, count it as a cleanse · clean one corner, that counts · mute the group chat
//              · let the sad playlist do the crying · water your plants, and you · daydreaming is planning
//              · say no to one plan · blanket, tea, nap · Monday can wait
//  37.8        group (the ending): "Soft reset. | *Fresh week.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#a9b8ff', RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', LEAF = '#5fd48a'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const ST = { x: -170 }

const TV = ['KKKKKKKKKKKK', 'KSSSSSSSSSSK', 'KSSSSSSSSSSK', 'KSSSSSSSSSSK', 'KSSSSSSSSSSK', 'KSSSSSSSSSSK', 'KKKKKKKKKKKK', '...KK..KK...', '..KKKKKKKK..']
const BROOM = ['....K....', '....K....', '....K....', '....K....', '....K....', '....K....', '..YYYYY..', '.YYYYYYY.', 'YYYYYYYYY', 'Y.Y.Y.Y.Y']
const HEADP = ['..KKKKKK..', '.K......K.', 'K........K', 'K........K', 'PP......PP', 'PP......PP', 'PP......PP']
const CAN = ['.........S', 'KKKKKK..S.', 'KBBBBKKS..', 'KBBBBBK...', 'KBBBBBK...', 'KBBBBBK...', 'KKKKKKK...']
const PLANT = ['.L...L.', 'LLL.LLL', '.LLLLL.', '...L...', 'KKKKKKK', '.KTTTK.', '.KTTTK.', '..KKK..']
const MUG = ['.W.W..', 'W.W...', 'KKKKK.', 'KTTTKK', 'KTTTK.K', 'KTTTKK', '.KKK..']
const BLANKET = ['..BBBBBBBBBB..', '.BBLBBLBBLBBB.', 'BBBBBBBBBBBBBB', 'BLBBLBBLBBLBBB', 'BBBBBBBBBBBBBB', '.BBBBBBBBBBBB.']

function phone(x, cx, cy, k, head, rows) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-140, -210, 280, 420)
  x.fillStyle = '#2a2350'; x.fillRect(-130, -200, 260, 400)
  x.fillStyle = '#140c30'; x.fillRect(-118, -176, 236, 352)
  x.fillStyle = ACC; x.fillRect(-106, -162, 212, 50); x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -136)
  rows.forEach(([txt, col], i) => { x.fillStyle = col; x.fillRect(-106, -82 + i * 72, 212, 54); x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.fillText(txt, 0, -54 + i * 72) })
  x.restore()
}
function cal(x, cx, cy, k, rows, crossAt, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-166, -176, 332, 352)
  x.fillStyle = BONE; x.fillRect(-158, -168, 316, 336)
  x.fillStyle = ACC; x.fillRect(-158, -168, 316, 64)
  x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SUNDAY', 0, -136)
  x.textAlign = 'left'; x.font = `800 32px ${INTER}`
  rows.forEach((r, i) => {
    const y = -60 + i * 76; x.fillStyle = INK; x.fillText(r, -128, y)
    if (i === crossAt && lt > 0.9) { const p = clamp((lt - 0.9) / 0.3); x.strokeStyle = RED; x.lineWidth = 7; x.beginPath(); x.moveTo(-136, y); x.lineTo(-136 + 270 * p, y); x.stroke() }
  })
  x.restore()
}

const S = 'pisces'
const CAMEOS = [
  { sign: S, cap: 'Cried at an advert? | *Count it as a cleanse.*', mood: lt => lt > 1.5 ? 'happy' : 'heart', tears: lt => lt < 1.4 ? 3 : 2, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, TV, { K: INK, S: '#2a2350' }, 790, 820, 26 * k)
      if (k > 0.6) drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: PINK }, 790, 790, 14)
      L(x, 790, 1090, 'RESET STEP 1 ✓', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT)
    } },
  { sign: S, cap: 'Clean one corner. | *That counts.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', tears: 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const sw = lt > 0.5 && lt < 1.3 ? Math.sin(lt * 14) * 0.25 : 0
      drawBits(x, BROOM, { K: '#c98f5a', Y: GOLD }, 800, 860, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.2 + sw })
      if (lt > 1.2) sparkles(x, t, 860, 980, P.t0 + 1.2, 7, 120, 0.3)
      L(x, 790, 640, 'ONE CORNER: SPARKLING', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.04, 28)
    } },
  { sign: S, cap: 'Mute the group chat. | *They’ll survive.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', tears: 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(99, 12 + Math.floor(lt * 40))
      phone(x, 760, 850, 1.3 * pop01(t, P.t0 + 0.2, 0.3, 2), 'GROUP CHAT', [[lt > 1.2 ? '99+ (muted)' : `${n} new`, lt > 1.2 ? MINT : PINK], ['who’s up?', BONE], ['hello??', BONE]])
      L(x, 760, 1150, 'NOTIFICATIONS: SHH', pop01(t, P.t0 + 1.3, 0.3, 2.4), LAV, -0.04, 28)
    } },
  { sign: S, cap: 'Sad playlist? | Let it *do the crying.*', mood: 'sleepy', tears: 2, star: { x: -150 },
    back(x, t, lt, P, F) { drawBits(x, HEADP, { K: INK, P: PINK }, F.x, F.cy - 30, 26 * pop01(t, P.t0 + 0.2, 0.3, 2)) },
    front(x, t, lt, P) {
      notes(x, t, 790, 960, { n: 5, cell: 9, col: ACC, seed: 3 })
      L(x, 790, 1100, 'NOW PLAYING: FEELINGS', pop01(t, P.t0 + 1.0, 0.3, 2.4), ACC, 0.04, 28)
    } },
  { sign: S, cap: 'Water your plants. | *And yourself.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', tears: 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PLANT, { L: LEAF, K: INK, T: '#c98f5a' }, 760, 960, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, CAN, { K: INK, B: SKYB, S: SKYB }, 860, 740, 24 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: lt > 0.9 ? 0.35 : 0 })
      L(x, 790, 1120, 'YOU: HYDRATED ✓', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT)
    } },
  { sign: S, cap: 'Daydreaming isn’t lazy. | *It’s planning.*', mood: 'sparkle', tears: 2, look: [1, -1], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      for (let i = 0; i < 3; i++) { x.fillStyle = BONE; x.globalAlpha = k; x.beginPath(); x.arc(580 + i * 50, 840 - i * 50, 10 + i * 6, 0, 7); x.fill() }
      x.globalAlpha = 1
      bubble(x, 800, 700, 'a cottage. | a cat. | a boat?', k, { size: 38, col: CREAM, tail: 'bl' })
      L(x, 790, 1100, 'PLANS: VERY BIG', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04)
    } },
  { sign: S, cap: 'Say no to one plan. | *Guilt-free.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', tears: 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      cal(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), ['brunch', 'party', 'rest'], 1, lt)
      L(x, 790, 1110, 'GUILT: 0 (ALLOWED)', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Blanket, tea, *nap.* | In that order.', mood: 'sleepy', tears: 2, star: { x: -110, y: 30 },
    front(x, t, lt, P, F) {
      drawBits(x, BLANKET, { B: LAV, L: CREAM }, F.x + 10, F.cy + 150, 26 * pop01(t, P.t0 + 0.3, 0.3, 2))
      drawBits(x, MUG, { K: INK, W: CREAM, T: ORANGE }, 840, 960, 26 * pop01(t, P.t0 + 0.8, 0.3, 2))
      L(x, 790, 660, 'NAP: SCHEDULED', pop01(t, P.t0 + 1.4, 0.3, 2.4), ACC, 0.04)
    } },
  { sign: S, cap: 'Monday can wait. | *You come first.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', tears: lt => lt > 1.3 ? 3 : 2, look: [1, 0], star: ST, hops: [1.4, 1.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const push = ease.inOutCubic(prog(lt, 0.8, 1.4))
      L(x, 790 + push * 50, 800 - push * 40, 'MONDAY', pop01(t, P.t0 + 0.2, 0.3, 2) * (1 - 0.5 * push), '#9aa5c4', 0.06 + push * 0.4, 50)
      L(x, 790, 1060, 'ON HOLD: TILL 9 AM', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 30)
      if (lt > 1.3) hearts(x, t, 560, 800, P.t0 + 1.4, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2a0302', key: 'F', accent: ACC, solo: 'pisces', ending: 'group',
  title: 'Pisces, here’s your | *Sunday reset.*',
  cameos: CAMEOS,
  group: { cap: 'Soft reset. | *Fresh week.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
