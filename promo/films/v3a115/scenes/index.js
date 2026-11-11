// v3a115: star_advice, ADVICE SOLO, "Taurus, read this | before your date." (~43 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): warm first-date advice for a Taurus, one gag each.
//   0.0–3.6    "Taurus, read this | *before your date.*"
//   3.6–37.8   nine cards: thirty identical cozy sweaters, OUTFIT 31: FINE · the teddy peeking out of the bag
//              · six backup snacks · arrived at 6:40 for a 7:00 · ask a real question · compatibility says TBD, go anyway
//              · dessert isn't the whole point (it's most of it) · a warm mug: COZY = GOOD SIGN
//              · won't budge? Virgo calls it loyal: GREEN FLAG
//  37.8        group ending: "Take it slow. | *Bring one snack.*"  (pays off the six backup snacks)
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'taurus'
const RED = '#e23d4e', GREEN = '#5fd068', WOOD = '#c98f2a', ROSE = '#ff9ccf'

const card = (x, cx, cy, w, h, k, rot = 0, bg = BONE) => {
  x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
}
const SWEATER = ['.SS..SS.', 'SSSSSSSS', 'SSSSSSSS', 'SSsSSsSS', '.SSSSSS.', '.SSSSSS.', '.SSSSSS.']
const BEAR = ['BB...BB', 'BBBBBBB', '.BKBKB.', '.BBnBB.', '..BBB..']
const BAG = ['..HHHH..', '.H....H.', 'TTTTTTTT', 'TTTTTTTT', 'TTTTTTTT', 'TTTTTTTT', 'TTTTTTTT']
const SNACK = ['.RRRR.', 'RWWWWR', 'RWYYWR', 'RWYYWR', 'RWWWWR', '.RRRR.']
const MUG = ['.......', 'WWWWWW.', 'WWHWWWW', 'WHHHWW.W', 'WWHWWW.W', 'WWWWWWW.', '.WWWWW..']
const CAKE = ['.......WW', '.....WWPP', '...WWPPPP', '.WWPPPPPP', 'WWWWWWWWW', 'PPPPPPPPP', 'YYYYYYYYY', 'PPPPPPPPP']
function clock(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 118, 0, Math.PI * 2); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 108, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * 90 - 4, Math.sin(a) * 90 - 4, 8, 8) }
  const m = (40 + lt * 4) / 60 * Math.PI * 2 - Math.PI / 2, h = (6 + 40 / 60) / 12 * Math.PI * 2 - Math.PI / 2
  x.strokeStyle = INK; x.lineWidth = 10; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(h) * 52, Math.sin(h) * 52); x.stroke()
  x.lineWidth = 6; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(m) * 82, Math.sin(m) * 82); x.stroke()
  x.restore()
}
function compat(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); card(x, cx, cy, 340, 260, k, -0.04, '#140c30')
  x.fillStyle = GREEN; x.fillRect(-170, -130, 340, 54)
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✦ COMPATIBILITY', 0, -103)
  x.fillStyle = BONE; x.font = `700 30px ${MONO}`; x.fillText('♉︎ + ♌︎', 0, -30)
  const dots = '.'.repeat(1 + Math.floor((lt * 3) % 3))
  x.fillStyle = GOLD; x.font = `800 40px ${INTER}`; x.fillText(lt > 1.1 ? 'MAYBE?' : 'reading' + dots, 0, 50)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'You don’t need | *the perfect outfit.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) drawBits(x, SWEATER, { S: '#ff9a7a', s: BONE }, 660 + (i % 3) * 120, 760 + Math.floor(i / 3) * 140, 13 * pop01(t, P.t0 + 0.2 + i * 0.08, 0.3, 2))
      label(x, 780, 1080, 'OUTFIT 31: ALSO FINE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Let them see | *the soft side.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), peek = ease.outBack ? clamp(prog(lt, 0.8, 1.2)) : prog(lt, 0.8, 1.2)
      drawBits(x, BEAR, { B: WOOD, K: INK, n: '#5b2e1a' }, 790, 870 - 90 * peek, 20 * k)
      drawBits(x, BAG, { H: INK, T: '#7a86b8' }, 790, 1000, 26 * k)
      label(x, 790, 640, 'MR. SNUGGLES SAYS HI', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'One backup snack | *is plenty.*', mood: lt => lt > 1.4 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) drawBits(x, SNACK, { R: [RED, GREEN, SKYB, '#ffb34a', LAV, PINK][i], W: BONE, Y: GOLD }, 650 + (i % 3) * 120, 800 + Math.floor(i / 3) * 140, 14 * pop01(t, P.t0 + 0.3 + i * 0.15, 0.3, 2.2), { rot: (i - 2.5) * 0.08 })
      const n = Math.min(6, Math.max(0, Math.floor((lt - 0.2) / 0.2)))
      label(x, 770, 1090, `SNACKS PACKED: ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2.4), { size: 36, bg: n >= 6 ? RED : GOLD, color: n >= 6 ? BONE : INK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Early is cute. | It’s *not a test.*', mood: lt => lt > 1.4 ? 'happy' : 'sleepy', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      clock(x, t, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1060, 'HERE SINCE 6:40', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 38, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1140, 'DATE AT 7:00', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Ask them | *a real question.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -220, s: 270 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 820, 980, 210 * k, { mood: lt > 1.3 ? 'sparkle' : 'happy', look: [-1, 0], seed: 71, glyph: false, hops: [P.t0 + 1.8] })
      bubble(x, 560, 620, 'what makes | you happy?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      bubble(x, 830, 760, 'nobody asks | that!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 32, col: SKYB, tail: 'br' })
    } },
  { sign: S, cap: 'Compatibility says *maybe?* | Go anyway.', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      compat(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1060, 'FIND OUT IN PERSON', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Dessert isn’t | *the whole point.*', mood: lt => lt > 1.2 ? 'wink' : 'heart', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CAKE, { W: '#fff4e2', P: ROSE, Y: GOLD }, 790, 880, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1090, '(IT’S MOST OF IT)', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Feels cozy? | *That’s a good sign.*', mood: 'sleepy', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, MUG, { W: BONE, H: PINK }, 790, 900, 26 * k)
      if (k > 0.5) for (let i = 0; i < 3; i++) { const ph = (t * 0.6 + i / 3) % 1; x.globalAlpha = Math.sin(Math.PI * ph) * 0.8; x.fillStyle = BONE; x.fillRect(740 + i * 40 + 8 * Math.sin(ph * 8), 780 - ph * 140, 12, 30); x.globalAlpha = 1 }
      label(x, 790, 1100, 'COZY = GOOD SIGN', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Won’t budge? | *Call it loyal.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', star: { x: -200, s: 270 }, squash: 0.06,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 820, 980, 210 * k, { mood: lt > 1.2 ? 'heart' : 'happy', look: [-1, 0], seed: 72, glyph: false, hops: [P.t0 + 1.7] })
      label(x, 340, 640, 'WON’T BUDGE', pop01(t, P.t0 + 0.4, 0.3, 2.4), { size: 36, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 800, 690, 'I like that.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bc' })
      label(x, 540, 1140, 'GREEN FLAG', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 44, bg: GREEN, rot: 0.04 })
    } },
]

const F = makeFilm({
  id: 'v3a115', key: 'C', accent: GREEN, solo: S, ending: 'group',
  title: 'Taurus, read this | *before your date.*',
  cameos: CAMEOS,
  group: {
    cap: 'Take it slow. | *Bring one snack.*', mood: 'wink',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
