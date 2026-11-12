// r2t0109: star_talk, ROLLCALL, "The signs trying | the local food." (~54 s vertical, signs3kit social cut, music: lofi · D)
// Twelve signs in zodiac order, each one's most extreme version of themselves trying the local food on a trip.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ ordered the spiciest, regrets nothing · ♉ one of everything, twice · ♊ can't pronounce it, ordered it anyway
//              · ♋ adopted by the cook's grandma · ♌ photographed it from forty angles · ♍ asked for the full ingredient list
//              · ♎ fed their match a bite of everything · ♏ found the place only locals know · ♐ moved there, for the soup
//              · ♑ asked about franchise rights · ♒ ordered the one nobody could explain · ♓ one bite, tears of joy
//  49.2        "Twelve signs. | *One food coma.*"  The whole group, sleepy and full (group ending: no lesson, no last line).
import { prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SAFFRON = '#ffc24a', RED = '#e23d4e', CREAM = '#fff4e2', WOOD = '#c98f2a', ORANGE = '#ffb34a'

// ── props
const BOWL = [
  'NNNNNNNNNNNN',
  '.BBBBBBBBBB.',
  '.BbBBBBBBbB.',
  '..BBBBBBBB..',
  '...BBBBBB...',
]
const bowlC = n => ({ N: n, B: CREAM, b: SKYB })
const CHILI = ['.....G', '....GG', '..RRR.', '.RRRR.', 'RRRR..', 'RRR...', 'RR....']
const CHILI_C = { R: RED, G: '#5fd068' }
const CAMERA = ['..KKK.....', 'KKKKKKKKKK', 'KGGGGGGGGK', 'KGGKKKKGGK', 'KGKWWBBKGK', 'KGKWBBBKGK', 'KGGKKKKGGK', 'KGGGGGGGGK', 'KKKKKKKKKK']
const CAMERA_C = { K: INK, G: '#9aa5c4', W: '#ffffff', B: SKYB }
const DOOR = ['KKKKKKKK', 'KDDDDDDK', 'KDDDDDDK', 'KDDDDDDK', 'KDDDDYDK', 'KDDDDDDK', 'KDDDDDDK', 'KDDDDDDK']
const DOOR_C = { K: INK, D: '#5a3a5a', Y: GOLD }

// a plate of food from above: a white rim and a coloured blob
function plate(x, cx, cy, r, food, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, r + 6, r * 0.42 + 6, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#ffffff'; x.beginPath(); x.ellipse(0, 0, r, r * 0.42, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = food; x.beginPath(); x.ellipse(0, -r * 0.08, r * 0.62, r * 0.26, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(-r * 0.3, -r * 0.2, r * 0.18, r * 0.06)
  x.restore()
}
// steam wisps rising from (cx, cy)
function steam(x, t, cx, cy, n = 3, col = 'rgba(239,230,214,0.55)') {
  for (let i = 0; i < n; i++) {
    const ph = (t * 0.7 + i / n) % 1
    x.fillStyle = col.replace('0.55', (0.55 * (1 - ph)).toFixed(3))
    x.fillRect(cx - 40 + i * 40 + Math.sin(ph * 7 + i) * 12, cy - ph * 150, 16, 26)
  }
}
// a long receipt-like ingredient list
function list(x, cx, top, k, lt) {
  if (k <= 0.01) return
  const len = lerp(80, 420, ease.outCubic(prog(lt, 0.3, 1.8)))
  x.save(); x.translate(cx, top); x.rotate(0.03); x.scale(1.25 * k, 1.25 * k)
  x.fillStyle = INK; x.fillRect(-116, -6, 232, len + 12); x.fillStyle = '#ffffff'; x.fillRect(-108, 0, 216, len)
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('INGREDIENTS', 0, 30)
  const ROWS = ['rice ✓', 'chili ✓', 'garlic ✓', 'herb #4 ✓', 'herb #5 ✓', 'love ✓', 'the secret ?']
  x.textAlign = 'left'; x.font = `700 22px ${MONO}`
  ROWS.forEach((r, i) => { const y = 74 + i * 52; if (y < len - 16) { x.fillStyle = i === 6 ? RED : INK; x.fillText(r, -88, y) } })
  x.restore()
}
// a contract with a signature line
function contract(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-136, -176, 290, 372)
  x.fillStyle = INK; x.fillRect(-148, -188, 296, 376); x.fillStyle = CREAM; x.fillRect(-140, -180, 280, 360)
  x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('FRANCHISE', 0, -138); x.fillText('PROPOSAL', 0, -104)
  for (let i = 0; i < 4; i++) { x.fillStyle = '#b9b0a0'; x.fillRect(-110, -60 + i * 40, 180 + ((i * 29) % 40), 12) }
  x.fillStyle = INK; x.fillRect(-110, 130, 220, 4)
  if (lt > 1.1) { x.strokeStyle = SKYB; x.lineWidth = 5; x.beginPath(); const e = Math.min(1, (lt - 1.1) / 0.5); for (let i = 0; i <= 20 * e; i++) { const px = -100 + i * 10, py = 112 + Math.sin(i * 1.3) * 12; i ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke() }
  x.restore()
}
// a mystery dish: a bowl with a glowing question mark rising out of it
function mystery(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.shadowColor = '#7dffb0'; x.shadowBlur = 30
  x.fillStyle = '#7dffb0'; x.font = `800 150px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('?', 0, -130 + Math.sin(t * 3) * 10)
  x.restore()
  drawBits(x, BOWL, bowlC('#7a5cff'), cx, cy + 30, 28 * k)
}

const CAMEOS = [
  { sign: 'aries', cap: 'Ordered the spiciest. | *Regrets nothing.*', mood: lt => lt > 1.0 ? 'wide' : 'sparkle', look: [1, 0], star: { x: -220 }, hops: [1.1],
    front(x, t, lt, P, F) {
      drawBits(x, BOWL, bowlC('#ff6a3a'), 780, 990, 28 * pop01(t, P.t0 + 0.15, 0.3, 2))
      drawBits(x, CHILI, CHILI_C, 800, 880, 16 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.3 })
      if (lt > 1.0) steam(x, t, F.x, F.top - 10, 3, 'rgba(255,120,90,0.55)')
      label(x, 790, 680, 'SPICE: 11/10', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 40, bg: RED, color: CREAM, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1120, 'it’s FINE', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'One of everything. | *Twice.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const FOODS = [ORANGE, '#7ad18a', RED, GOLD, '#c98f6a', PINK]
      FOODS.forEach((f, i) => plate(x, 690 + (i % 2) * 200, 720 + Math.floor(i / 2) * 150, 90, f, pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2)))
      label(x, 790, 1140, 'ROUND TWO: ORDERED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Can’t pronounce it. | *Ordered it anyway.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'the… uh… | THAT one!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: GOLD, tail: 'bl' })
      plate(x, 790, 1000, 130, '#c98f6a', pop01(t, P.t0 + 1.0, 0.3, 2))
      label(x, 790, 1130, 'NO IDEA. LOVE IT.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Adopted by | *the cook’s grandma.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -220 }, hops: [1.2],
    front(x, t, lt, P) {
      const s = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (s > 0.01) {
        signChar(x, t, 'capricorn', 800, 960, 250 * s, { mood: 'happy', look: [-1, 0], seed: 22, glyph: false })
      }
      bubble(x, 800, 680, 'eat MORE!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 44, col: PINK, tail: 'br' })
      label(x, 400, 1130, 'FAMILY NOW', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 860, P.t0 + 1.3, { n: 5, life: 1.6, spread: 160, cell: 6, seed: 2 })
    } },
  { sign: 'leo', cap: 'Photographed it | *from forty angles.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -220 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      plate(x, 800, 1040, 130, ORANGE, pop01(t, P.t0 + 0.15, 0.3, 2))
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      drawBits(x, CAMERA, CAMERA_C, 800 + Math.sin(lt * 5) * 90, 820 + Math.cos(lt * 4) * 40, 13 * k, { rot: Math.sin(lt * 5) * 0.3 })
      if (lt > 0.4 && (lt * 4) % 1 < 0.15) { x.fillStyle = 'rgba(255,255,255,0.18)'; x.fillRect(120, 480, 840, 740) }
      label(x, 790, 650, `SHOT ${Math.min(40, Math.floor(1 + lt * 17))}/40`, pop01(t, P.t0 + 0.4, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 400, 1130, 'FOOD: COLD', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Asked for the | *full ingredient list.*', mood: 'squint', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      list(x, 790, 560, pop01(t, P.t0 + 0.15, 0.3, 2), lt)
    } },
  { sign: 'libra', cap: 'Fed their match | *a bite of everything.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -220 }, hops: [1.1],
    front(x, t, lt, P, F) {
      const s = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (s > 0.01) signChar(x, t, 'taurus', 820, 940, 220 * s, { mood: lt > 1.1 ? 'heart' : 'wide', look: [-1, 0], seed: 21, glyph: false })
      const fly = (lt * 1.1) % 1
      if (lt > 0.4) { const fx = lerp(F.x + 120, 720, fly), fy = lerp(F.cy - 20, 900, fly) - Math.sin(Math.PI * fly) * 90; x.fillStyle = INK; x.fillRect(fx - 50, fy - 3, 60, 6); x.fillStyle = ORANGE; x.fillRect(fx + 6, fy - 12, 24, 24) }
      label(x, 790, 650, 'MATCH: VERY FED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 820, 820, P.t0 + 1.3, { n: 5, life: 1.6, spread: 160, cell: 6, seed: 4 })
    } },
  { sign: 'scorpio', cap: 'Found the place | *only locals know.*', mood: lt => lt > 1.1 ? 'wink' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      drawBits(x, DOOR, DOOR_C, 800, 910, 40 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 800, 680, 'NO SIGN. NO MENU.', pop01(t, P.t0 + 0.7, 0.3, 2.4), { size: 32, bg: '#c66bff', rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 1140, 'BEST MEAL EVER', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Moved there. | *For the soup.*', mood: 'sparkle', look: [1, 0], star: { x: -220 }, hops: [0.9, 1.7],
    front(x, t, lt, P) {
      drawBits(x, BOWL, bowlC(SAFFRON), 780, 980, 28 * pop01(t, P.t0 + 0.15, 0.3, 2))
      steam(x, t, 800, 900)
      label(x, 790, 660, 'NEW ADDRESS', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 42, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1130, 'worth it.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Asked about | *franchise rights.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      contract(x, 800, 880, pop01(t, P.t0 + 0.15, 0.35, 2), lt)
    } },
  { sign: 'aquarius', cap: 'Ordered the one | *nobody could explain.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -220 }, hops: [1.3],
    front(x, t, lt, P) {
      mystery(x, t, 780, 960, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1130, 'TASTES LIKE: PURPLE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'One bite. | *Tears of joy.*', mood: 'wide', tears: lt => lt > 0.6 ? 3 : 2, look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      drawBits(x, BOWL, bowlC('#f0d9a8'), 780, 990, 28 * pop01(t, P.t0 + 0.15, 0.3, 2))
      steam(x, t, 800, 920)
      bubble(x, 790, 700, 'it tastes | like a HUG', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bl' })
      label(x, 790, 1130, 'CHEF: ALSO CRYING', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0109', key: 'D', accent: SAFFRON, ending: 'group',
  title: 'The signs trying | *the local food.*',
  cameos: CAMEOS,
  group: {
    cap: 'Twelve signs. | *One food coma.*',
    moods: Array(12).fill('sleepy'),
    draw(x, t, lt) {
      label(x, 540, 690, 'FULL: 12/12', pop01(t, t - lt + 1.4, 0.3, 2.4), { size: 46, bg: SAFFRON, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
