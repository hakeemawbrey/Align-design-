// r2t0396: star_talk SOLO (virgo), "Virgos shopping | be like." (signs3kit social cut, music: lofi · C). Ending: callback.
//   nine cards: laminated list v14 · checked every avocado · read every review for a sponge · refolded the sweater table
//   · price per ounce · fixed the cart's wheel · bagged by colour · filed the receipt · checked the couch's birth chart
//   group: "Cart full. | Zero mistakes."   callback: "Avocado forty-seven: | finally chosen."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#7dd87a', RED = '#e23d4e', CREAM = '#fff4e2'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
/** a cream card with ink outline and a shadow; fn draws inside (origin = centre) */
function card(x, cx, cy, w, h, k, { rot = 0.04, bg = CREAM } = {}, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (fn) fn()
  x.restore()
}
const AVO = ['...KKK...', '..KGGGK..', '.KGGGGGK.', '.KGGGGGK.', 'KGGYYYGGK', 'KGYYBYYGK', 'KGYYYYYGK', '.KGGGGGK.', '..KKKKK..']
const AVO_C = { K: '#2f5d2a', G: '#5fa84a', Y: '#d8f08a', B: '#8a4a2e' }
const SPONGE = ['GGGGGGGGGG', 'GGGGGGGGGG', 'YYYYYYYYYY', 'YYwYYYYwYY', 'YYYYYwYYYY', 'YwYYYYYYwY', 'YYYYYYYYYY']
const SPONGE_C = { G: '#5fd068', Y: '#ffe36a', w: '#e8c43a' }
const CART = ['K..........', 'KK.........', '.KKKKKKKKKK', '.KWKWKWKWK.', '.KKKKKKKKK.', '..KWKWKWK..', '..KKKKKKK..', '..K.....K..', '.KKKKKKKKK.', '..O.....O..']
const CART_C = { K: '#9aa5c4', W: '#2a2350', O: '#1b1236' }
const WRENCH = ['.SS..', 'S..S.', 'S..S.', '.SSS.', '..SS.', '..SS.', '..SS.', '..SS.', '..SS.', '..SS.']
const BAG = ['..KKKKKK..', '..K....K..', 'BBBBBBBBBB', 'BRROOYYGGB', 'BRROOYYGGB', 'BBBBBBBBBB', 'BBBBBBBBBB', 'BBBBBBBBBB', 'BBBBBBBBBB']
const BAG_C = { K: '#8a4a2e', B: '#c98f5a', R: RED, O: '#ffb34a', Y: '#ffe36a', G: '#5fd068' }
const COUCH = ['.PPPPPPPPPP.', 'PPPPPPPPPPPP', 'PPPPPPPPPPPP', 'AAPPPPPPPPAA', 'AACCCCCCCCAA', 'AACCCCCCCCAA', 'AAAAAAAAAAAA', '.K........K.']
const COUCH_C = { P: '#c97bff', A: '#a35ce0', C: '#d9a8ff', K: INK }

const S = 'virgo', ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'The shopping list? | *Laminated.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      card(x, 790, 860, 300, 380, pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.05 }, () => {
        x.fillStyle = ACC; x.fillRect(-150, -190, 300, 56)
        x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('LIST v14', 0, -162)
        const items = ['eggs  x12', 'milk  x1', 'kale  x2', 'pens  x3', 'tape  x1']
        x.textAlign = 'left'; x.font = `700 24px ${MONO}`
        items.forEach((s, i) => { x.fillStyle = '#9aa5c4'; x.fillRect(-120, -100 + i * 56, 22, 22); x.fillStyle = INK; x.fillText(s, -84, -88 + i * 56) })
        // the laminate shine
        x.fillStyle = 'rgba(255,255,255,0.35)'; x.beginPath(); x.moveTo(-150, 100); x.lineTo(-60, -190); x.lineTo(-20, -190); x.lineTo(-110, 100); x.fill()
      })
      L(x, 790, 1110, 'COLOUR-CODED. BY AISLE.', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 26)
    } },
  { sign: S, cap: 'Checked every | *single avocado.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      for (let i = 0; i < 6; i++) drawBits(x, AVO, AVO_C, 660 + (i % 3) * 120, 900 + Math.floor(i / 3) * 110, 11 * k, { rot: (i - 2) * 0.12 })
      const n = Math.min(47, Math.floor(clamp((lt - 0.4) / 1.5) * 47))
      L(x, 790, 680, `CHECKED: ${n} / 47`, pop01(t, P.t0 + 0.4, 0.3, 2), MINT, -0.04, 34)
      bubble(x, 790, 1150, 'hmm. no.', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: S, cap: 'Buying a sponge. | Read *every review.*', mood: lt => lt > 1.5 ? 'wide' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SPONGE, SPONGE_C, 790, 780, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.08 })
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.6) * 811)
      L(x, 790, 960, `REVIEW ${n} OF 812`, pop01(t, P.t0 + 0.4, 0.3, 2), BONE, 0.04, 30)
      bubble(x, 790, 1110, 'still unsure.', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
    } },
  { sign: S, cap: 'Refolded the | *whole sweater table.*', mood: lt => lt > 1.6 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      const COLS = [PINK, SKYB, GOLD, MINT, LAV, '#ffb34a']
      const tidy = ease.inOutCubic(prog(lt, 0.5, 1.5))
      if (k > 0.01) for (let i = 0; i < 6; i++) {
        const mx = lerp(Math.sin(i * 3.1) * 70, 0, tidy), rot = lerp(Math.sin(i * 1.7) * 0.4, 0, tidy)
        x.save(); x.translate(790 + mx, 1060 - i * 50); x.rotate(rot); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-116, -26, 232, 52); x.fillStyle = COLS[i]; x.fillRect(-110, -20, 220, 40)
        x.fillStyle = 'rgba(27,18,54,0.25)'; x.fillRect(-110, 6, 220, 6); x.restore()
      }
      L(x, 790, 640, 'SHE DOESN’T WORK HERE', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 26)
      sparkles(x, t, 790, 930, P.t0 + 1.5, 7, 170, 0.4)
    } },
  { sign: S, cap: 'Price per ounce. | *Mental math.*', mood: 'squint', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      L(x, 690, 720, '$0.42 / OZ', pop01(t, P.t0 + 0.25, 0.3, 2), BONE, -0.06, 34)
      L(x, 880, 850, '$0.39 / OZ', pop01(t, P.t0 + 0.55, 0.3, 2), BONE, 0.05, 34)
      L(x, 790, 1010, 'SAVED 3 CENTS', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 38)
      sparkles(x, t, 790, 1010, P.t0 + 1.45, 6, 160, 0.2)
    } },
  { sign: S, cap: 'The cart wobbled. | Virgo *fixed it.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 1], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      const fixed = lt > 1.3
      const wob = fixed ? 0 : 0.06 * Math.sin(t * 18)
      drawBits(x, CART, CART_C, 790, 950, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: wob })
      if (lt > 0.5 && !fixed) drawBits(x, WRENCH, { S: '#d8dbe8' }, 860 + 20 * Math.sin(t * 10), 1080, 10, { rot: 0.8 })
      L(x, 790, 700, fixed ? 'WHEEL: ALIGNED' : 'WOBBLE DETECTED', 1, fixed ? MINT : RED, -0.04, 32, fixed ? INK : CREAM)
    } },
  { sign: S, cap: 'Bagged the groceries | *by colour.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BAG, BAG_C, 790, 920, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 660, 'A RAINBOW. IN A BAG.', pop01(t, P.t0 + 1.1, 0.3, 2.2), PINK, 0.04, 28)
      bubble(x, 420, 640, 'gorgeous.', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: S, cap: 'Kept the receipt. | *Filed it.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 880, 320, 300, pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.04, bg: '#e8c47a' }, () => {
        x.fillStyle = '#c98f2a'; x.fillRect(-160, -150, 140, 40)
        x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.fillText('RECEIPTS', 0, -30); x.font = `700 26px ${MONO}`; x.fillText('NOV · WEEK 2', 0, 30); x.fillText('TAB 37 OF 52', 0, 80)
      })
      const d = ease.inOutCubic(prog(lt, 0.5, 1.1))
      if (lt < 1.15) card(x, 790, lerp(560, 860, d), 130, 170, 1, { rot: 0.08, bg: '#ffffff' }, () => {
        x.fillStyle = '#9aa5c4'; for (let i = 0; i < 5; i++) x.fillRect(-46, -60 + i * 26, 92 - (i % 2) * 30, 10)
      })
      L(x, 790, 1110, 'FILED. FOREVER.', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'New couch? | Checked its *birth chart.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, COUCH, COUCH_C, 800, 1010, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const k = pop01(t, P.t0 + 0.5, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 720); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 112, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#2a2350'; x.beginPath(); x.arc(0, 0, 104, 0, Math.PI * 2); x.fill()
        x.strokeStyle = GOLD; x.lineWidth = 3; x.beginPath(); x.arc(0, 0, 80, 0, Math.PI * 2); x.stroke()
        for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + t * 0.3; x.beginPath(); x.moveTo(Math.cos(a) * 80, Math.sin(a) * 80); x.lineTo(Math.cos(a) * 104, Math.sin(a) * 104); x.stroke() }
        x.strokeStyle = PINK; x.beginPath(); x.moveTo(-50, -30); x.lineTo(40, 50); x.lineTo(30, -60); x.closePath(); x.stroke()
        x.restore()
      }
      L(x, 800, 880, 'COUCH: TAURUS. APPROVED.', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 26)
    } },
]

const F = makeFilm({
  id: 'r2t0396', key: 'C', accent: ACC, solo: 'virgo', ending: 'callback',
  title: 'Virgos shopping | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Cart full. | *Zero mistakes.*', mood: 'sparkle' },
  last: {
    text: 'Avocado forty-seven: | *finally chosen.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'virgo', 380, 1080, 280 * k, { mood: lt > 1.2 ? 'heart' : 'squint', seed: 7, look: [1, 0], hops: [t0 + 1.3] })
      drawBits(x, AVO, AVO_C, 740, 1100, 26 * pop01(t, t0 + 0.6, 0.4, 2), { rot: 0.06 * Math.sin(t * 2) })
      if (lt > 1.1) L(x, 740, 900, 'THE ONE.', pop01(t, t0 + 1.1, 0.3, 2.4), GOLD, -0.05, 44)
      if (lt > 1.2) sparkles(x, t, 740, 1100, t0 + 1.2, 8, 170, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
