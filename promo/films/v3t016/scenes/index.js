// v3t016: THE SIGNS AS… v3, "Meeting a match | be like." (~57 s vertical, signs3kit social cut, music: lofi · C)
//   0.0–3.6    "Meeting a match | *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   meeting a match in person, one sign per card (3.8 s each), each pushed to the extreme:
//              ♈ spotted them, sprinted · ♉ met for coffee, brought a picnic · ♊ asked twelve questions, answered all twelve
//              · ♋ hugged them hello, adopted them · ♌ made an entrance, with confetti · ♍ fixed their collar before hello
//              · ♎ late: outfit seven of seven · ♏ said three words, match obsessed · ♐ turned coffee into a 14 km hike
//              · ♑ handed over a business card · ♒ became best friends, oops · ♓ hands touched, Pisces fainted
//  49.2        "Smooth? | *Not one of them.*"
//  52.6        callback: "Leo is still | *sweeping.*"  (the confetti comes back, Leo with a broom)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', GREEN = '#5fd068', CREAM = '#fff4e2'

const BASKET = [
  '...BBBBBBB...',
  '..B.......B..',
  '.B.........B.',
  'RWRWRWRWRWRWR',
  'BbBbBbBbBbBbB',
  'bBbBbBbBbBbBb',
  'BbBbBbBbBbBbB',
  '.bBbBbBbBbBb.',
]
const BASKET_C = { B: '#c97a3a', b: '#8a4a2e', R: RED, W: CREAM }
const CUP = ['.S.S.', '..S..', 'WWWWW', 'WCCCW', 'WCCCW', '.WWW.']
const CUP_C = { S: '#ffffff', W: CREAM, C: '#8a4a2e' }
const MOUNTAIN = [
  '.......W.......',
  '......WWW......',
  '.....GGGGG.....',
  '....GGGgGGG....',
  '...GGgGGGgGG...',
  '..GGGGGgGGGGG..',
  '.GGgGGGGGGgGGG.',
  'GGGGGGgGGGGGGGG',
]
const MOUNTAIN_C = { W: '#ffffff', G: '#6fa86f', g: '#4a7a4a' }
const BROOM = [
  '..K.......',
  '...K......',
  '....K.....',
  '.....K....',
  '......K...',
  '.....YYY..',
  '....YYYYY.',
  '...YYYYYYY',
]
const BROOM_C = { K: '#8a4a2e', Y: GOLD }

/** confetti falling over a rectangle (Leo's entrance and the callback) */
function confetti(x, t, t0, { cx = 540, w = 760, top = 480, fall = 760, n = 34, floor = null } = {}) {
  if (t < t0) return
  const C = [GOLD, PINK, MINT, SKYB, LAV, ORANGE]
  for (let i = 0; i < n; i++) {
    const born = t0 + (i % 7) * 0.12
    const ph = (t - born) / 1.8
    if (ph < 0) continue
    const sx = cx + (((i * 97) % 100) / 100 - 0.5) * w + Math.sin(ph * 6 + i) * 18
    let sy = top + Math.min(1, ph) * fall
    if (floor !== null) sy = Math.min(floor - (i % 3) * 8, sy)
    x.save(); x.translate(sx, sy); x.rotate(i + t * (ph < 1 ? 4 : 0)); x.fillStyle = C[i % C.length]; x.fillRect(-9, -5, 18, 10); x.restore()
  }
}

const CAMEOS = [
  { sign: 'aries', cap: 'Spotted their match. | *Sprinted.*', mood: lt => lt > 1.0 ? 'heart' : 'sparkle', star: { x: -150 }, hops: [0.3, 0.55, 0.8, 1.05],
    back(x, t, lt, P) {
      // speed lines
      const k = clamp((lt - 0.2) / 0.3) * (1 - clamp((lt - 1.4) / 0.4))
      if (k > 0) { x.save(); x.globalAlpha = 0.6 * k; x.fillStyle = BONE; for (let i = 0; i < 5; i++) x.fillRect(150 + ((t * 900 + i * 130) % 160), 760 + i * 50, 120, 8); x.restore() }
    },
    front(x, t, lt, P) {
      label(x, 790, 760, 'TOP SPEED', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 38, bg: RED, color: CREAM, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'HIIIII!!', pop01(t, P.t0 + 1.1, 0.25, 2.4), { size: 52, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Met for coffee. | *Brought a picnic.*', mood: 'heart', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CUP, CUP_C, 700, 760, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 860, 760, 'coffee?', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 30, bg: BONE, rot: 0.05 })
      drawBits(x, BASKET, BASKET_C, 790, 980, 22 * pop01(t, P.t0 + 0.9, 0.35, 2))
      label(x, 790, 1150, 'SERVES: 6', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Asked twelve questions. | *Answered all twelve.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      const Q = ['fave food? pizza!', 'pets? a cat!', 'travel? yes!', 'sign? mine? gemini!']
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.45))
      bubble(x, 780, 720, Q[n], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 790, 920, `Q ${3 + n * 3} OF 12`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 36, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1060, 'MATCH SPOKE: 0', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Hugged them hello. | *Adopted them.*', mood: 'heart', star: { x: -120 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'sagittarius', 720, 910, 220 * k, { mood: lt > 1.2 ? 'wide' : 'happy', look: [-1, 0], seed: 13, glyph: false })
      label(x, 760, 660, 'FAMILY: +1', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
      hearts(x, t, 560, 860, P.t0 + 0.8, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Made an entrance. | *With confetti.*', mood: 'sparkle', star: { x: -100 }, hops: [0.5, 1.1, 1.7],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      confetti(x, t, P.t0 + 0.6, { cx: 540, w: 760, top: 480, fall: 700 })
      label(x, 760, 700, 'TA-DA!', pop01(t, P.t0 + 0.5, 0.3, 2.6), { size: 48, bg: ORANGE, rot: 0.06, font: MONO, weight: 700 })
      sparkles(x, t, 440, 860, P.t0 + 0.6, 7, 180, 0.2)
    } },
  { sign: 'virgo', cap: 'Fixed their collar. | *Before hello.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -130 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 730, 920, 220 * k, { mood: lt > 1.0 ? 'wide' : 'happy', look: [-1, 0], seed: 15, glyph: false })
      label(x, 760, 660, 'COLLAR: FIXED', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 760, 1110, 'oh! hi?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'Running late. | Couldn’t *pick a shirt.*', mood: lt => lt > 1.6 ? 'wide' : 'squint', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(7, 1 + Math.floor(Math.max(0, lt - 0.2) * 3.4))
      const C = [PINK, MINT, SKYB, GOLD, LAV, ORANGE, '#ffffff']
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 900); x.scale(k, k); x.rotate(0.05)
        x.fillStyle = INK; x.fillRect(-100, -110, 200, 220); x.fillRect(-150, -110, 300, 80)
        x.fillStyle = C[(n - 1) % 7]; x.fillRect(-92, -102, 184, 204); x.fillRect(-142, -102, 284, 64)
        x.fillStyle = INK; x.fillRect(-26, -110, 52, 30)
        x.restore()
      }
      label(x, 790, 700, `OUTFIT ${n}/7`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 38, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 1110, 'LATE: 40 MIN', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: RED, color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Said three words. | Match is *obsessed.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 700, '“hm. interesting. bye.”', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 32, col: LAV, tail: 'bl' })
      label(x, 790, 900, 'MATCH: SPELLBOUND', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 30, bg: '#c97bff', color: CREAM, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 1080, P.t0 + 1.3, { n: 6, life: 1.6, spread: 200, cell: 7, seed: 6 })
    } },
  { sign: 'sagittarius', cap: 'Coffee date. | Became *a 14 km hike.*', mood: 'sparkle', star: { x: 150, y: 20 }, hops: [0.5, 1.0, 1.5],
    back(x, t, lt, P) { drawBits(x, MOUNTAIN, MOUNTAIN_C, 320, 960, 26 * pop01(t, P.t0 + 0.2, 0.35, 2)) },
    front(x, t, lt, P) {
      const km = Math.min(14, Math.floor(Math.max(0, lt - 0.4) * 9))
      label(x, 320, 660, `KM: ${km}`, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 40, bg: GOLD, rot: -0.06, font: MONO, weight: 700 })
      bubble(x, 720, 640, 'almost there!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Handed their match | a *business card.*', mood: 'neutral', look: [-1, 0], star: { x: 160 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(320, 860); x.scale(k, k); x.rotate(-0.06)
        x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-160, -84, 320, 180)
        x.fillStyle = INK; x.fillRect(-166, -96, 332, 192); x.fillStyle = CREAM; x.fillRect(-160, -90, 320, 180)
        x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.font = `800 34px Inter, Arial, sans-serif`; x.fillText('CAPRICORN', 0, -34)
        x.font = `700 22px ${MONO}`; x.fillStyle = '#2fc79a'; x.fillText('Boyfriend · Est. today', 0, 14)
        x.fillStyle = '#6b62a8'; x.fillText('call: 9–5 only', 0, 52)
        x.restore()
      }
      label(x, 320, 1080, 'NETWORKING ✓', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: '#2fc79a', rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Met their match. | *Now best friends.* Oops.', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [1, 0], star: { x: -130 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'leo', 730, 920, 220 * k, { mood: 'happy', look: [-1, 0], seed: 19, glyph: false })
      label(x, 760, 660, 'BFF ✦ 4EVER', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 38, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 760, 1110, 'wait… what?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Their hands touched. | Pisces *fainted.*', mood: lt => lt < 1.0 ? 'heart' : 'wide', tears: lt => lt < 1.0 ? 2 : 3, star: { x: -170 }, squash: lt => lt > 1.0 ? 0.1 : 0,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'they touched | my HAND', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 960, 'STATUS: SWOONING', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 1100, P.t0 + 1.0, { n: 6, life: 1.8, spread: 200, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'v3t016', key: 'C', accent: GOLD, ending: 'callback',
  title: 'Meeting a match | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Smooth? | *Not one of them.*' },
  last: {
    text: 'Leo is still | *sweeping.*',
    draw(x, t, lt) {
      confetti(x, t, t - lt + 0.2, { cx: 540, w: 820, top: 700, fall: 520, n: 40, floor: 1200 })
      const k = pop01(t, t - lt + 0.5, 0.45, 2)
      if (k > 0.01) {
        signChar(x, t, 'leo', 440, 1020, 360 * k, { mood: lt > 1.8 ? 'squint' : 'happy', look: [1, 1], seed: 9, glyph: false })
        drawBits(x, BROOM, BROOM_C, 690, 1100, 22 * k, { rot: 0.25 * Math.sin(t * 6) })
      }
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
