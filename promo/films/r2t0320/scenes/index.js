// r2t0320: star_talk, BE LIKE (twelve signs), "Staying calm? | Zodiacs *be like.*" (topic: Zodiacs trying to stay calm be like) (~53 s vertical, signs3kit social cut, music: lofi · F)
// Twelve signs in zodiac order, each failing (lovingly) to stay calm. Ending: callback.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ counted to ten, got to three · ♉ calm until someone touched the fries · ♊ calm outside, fourteen tabs inside
//              · ♋ totally fine, hugging a pillow hard · ♌ calm until nobody noticed the haircut · ♍ a colour-coded breathing plan
//              · ♎ calm face, panicking about seats · ♏ smiling calmly, eye twitching · ♐ laughed it off, too loud, in a library
//              · ♑ scheduled the panic for Friday · ♒ meditated, invented a thing · ♓ rain sounds to relax, cried at the rain
//  49.2        "Calm? | *Mostly.*"
//  52.6        callback: "Aries made it to ten. | *Eventually.*" — card 1's count comes back: 10 ✓.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SLATE = '#9fb4c8', RED = '#e23d4e', CREAM = '#fff8ea', WOOD = '#c98f5a', SAND = '#f3d79a'
// ── props
/** a paper sheet / screen with a coloured header and text rows: [text, colour?, k?] */
function sheet(x, cx, cy, k, { w = 330, h = 380, head = '', headCol = SLATE, rows = [], rot = 0.04, size = 30, scale = 1.12, paper = CREAM, ink = INK, font = MONO } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * scale, k * scale)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = paper; x.fillRect(-w / 2, -h / 2, w, h)
  if (head) { x.fillStyle = headCol; x.fillRect(-w / 2, -h / 2, w, 60); x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 31) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  const top = -h / 2 + (head ? 60 : 0) + 44
  rows.forEach(([txt, col, kk = 1], i) => {
    if (kk <= 0.01) return
    x.save(); x.globalAlpha *= clamp(kk); x.fillStyle = col || ink; x.font = `700 ${size}px ${font}`
    x.fillText(txt, -w / 2 + 22, top + i * (size + 16)); x.restore()
  })
  x.restore()
}
/** a wall clock */
function clock(x, cx, cy, k, hh, mm) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 132, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 120, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * 100 - 5, Math.sin(a) * 100 - 5, 10, 10) }
  const ha = ((hh % 12) + mm / 60) / 12 * Math.PI * 2 - Math.PI / 2, ma = mm / 60 * Math.PI * 2 - Math.PI / 2
  x.lineCap = 'square'; x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(ha) * 56, Math.sin(ha) * 56); x.stroke()
  x.lineWidth = 9; x.strokeStyle = RED; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(ma) * 88, Math.sin(ma) * 88); x.stroke()
  x.fillStyle = INK; x.fillRect(-10, -10, 20, 20)
  x.restore()
}
/** a mini birth-chart wheel */
function chartWheel(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#2a2350'; x.beginPath(); x.arc(0, 0, 140, 0, Math.PI * 2); x.fill()
  const C = [RED, '#7fd08a', SAND, SKYB, GOLD, '#b6e08a', PINK, '#b07bff', '#ff9a4a', SLATE, '#6fd6ff', LAV]
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillStyle = C[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 140, a, a + Math.PI / 6 - 0.04); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, 80, 0, Math.PI * 2); x.fill()
  x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.moveTo(-60, -20); x.lineTo(50, 40); x.lineTo(-10, -62); x.closePath(); x.stroke()
  x.restore()
}
const LAPTOP = ['..KKKKKKKKKKKK..', '..KSSSSSSSSSSK..', '..KSWWWWWWWSSK..', '..KSSSSSSSSSSK..', '..KSWWWWWSSSSK..', '..KSSSSSSSSSSK..', '..KKKKKKKKKKKK..', 'GGGGGGGGGGGGGGGG', '.GGGGGGGGGGGGGG.']
const LAPTOP_C = { K: INK, S: SKYB, W: CREAM, G: '#a9a9bf' }
const UMBRELLA = ['....RRRRRRR....', '..RRWWRRRWWRR..', '.RRWWWRRRWWWRR.', 'RRRRRRRRRRRRRRR', '.......K.......', '.......K.......', '.......K.......', '.......K.......', '.......K.......', '.......K.......', '......KK.......']
const UMBRELLA_C = { R: '#ff6b5a', W: CREAM, K: INK }
const CAKE = ['....F..F..F....', '....C..C..C....', '..PPPPPPPPPPP..', '..PWPWPWPWPWP..', '..BBBBBBBBBBB..', '.BBBBBBBBBBBBB.', '.PPPPPPPPPPPPP.', 'BBBBBBBBBBBBBBB', 'BBBBBBBBBBBBBBB', 'KKKKKKKKKKKKKKK']
const CAKE_C = { F: GOLD, C: CREAM, P: PINK, W: CREAM, B: '#c98f5a', K: '#8a4a2e' }
/** a phone with message bubbles: [text, colour, k, right?] */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -212, 296, 440)
  x.fillStyle = INK; x.fillRect(-154, -224, 308, 448)
  x.fillStyle = '#2a2350'; x.fillRect(-144, -214, 288, 428)
  x.fillStyle = '#140c30'; x.fillRect(-130, -188, 260, 376)
  if (head) { x.fillStyle = headCol; x.fillRect(-118, -174, 236, 52); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -147) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `800 32px ${INTER}`; const w = x.measureText(txt).width + 30
    x.save(); x.translate(right ? 112 - w : -112, -70 + i * 76); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -27, w, 54); x.fillStyle = INK; x.fillText(txt, 15, 2)
    x.restore()
  })
  x.restore()
}
const MEDAL = ['RR.....RR', '.RR...RR.', '..RR.RR..', '...RRR...', '..GGGGG..', '.GGYYYGG.', 'GGYGGGYGG', 'GGYGGGYGG', 'GGYGGGYGG', '.GGYYYGG.', '..GGGGG..']
const MEDAL_C = { R: '#e23d4e', G: GOLD, Y: '#fff1a8' }
const BOOK = ['KKKKKKKKKKKKKKKK', 'KWWWWWWKKWWWWWWK', 'KWLLLLWKKWLLLLWK', 'KWWWWWWKKWWWWWWK', 'KWLLLLWKKWLLLWWK', 'KWWWWWWKKWWWWWWK', 'KWLLLWWKKWLLLLWK', 'KWWWWWWKKWWWWWWK', 'KWLLLLWKKWLLWWWK', 'KWWWWWWKKWWWWWWK', 'KKKKKKKKKKKKKKKK']
const BOOK_C = { K: '#8a4a2e', W: '#fff8ea', L: '#9a90b8' }
const PIGGY = ['......PP....', '.PPPPPPPPP..', 'PPPPPPPPPPP.', 'PPKPPPPPPPPS', 'PPPPPPPPPPPS', 'PPPPPPPPPPP.', '.PPPPPPPPP..', '.PP.....PP..']
const PIGGY_C = { P: '#ff9cc0', K: INK, S: '#ff6fa3' }
const COIN = ['.YYYY.', 'YYWYYY', 'YWYYYY', 'YYYYYY', 'YYYYYY', '.YYYY.']
const COIN_C = { Y: GOLD, W: '#fff1a8' }
const PLANT = ['....L.L....', '...LL.LL...', '..LLL.LLL..', '...LLLLL...', '.....L.....', '.....L.....', '.TTTTTTTTT.', '.TTTTTTTTT.', '..TTTTTTT..', '..TTTTTTT..', '...TTTTT...']
const PLANT_C = { L: '#5fd068', T: '#d9774a' }
const BED = ['WW.............', 'WW.............', 'WWPPPBBBBBBBBBB', 'WWPPPBBBBBBBBBB', 'WWBBBBBBBBBBBBB', 'WWWWWWWWWWWWWWW', 'W.............W']
const BED_C = { W: '#c98f5a', P: '#fff8ea', B: '#8fb8ff' }

const CALM = '#8fe3c8'
const FRIES = ['.Y.Y.Y.Y.', '.YYY.YYY.', 'YYYYYYYYY', 'RRRRRRRRR', 'RRWWRRRRR', 'RRRRRRRRR', '.RRRRRRR.', '.RRRRRRR.']
const FRIES_C = { Y: GOLD, R: RED, W: CREAM }
const PILLOW = ['.PPPPPPPPPP.', 'PPPPPPPPPPPP', 'PPPWPPPPPPPP', 'PPPPPPPPPPPP', 'PPPPPPPPPPPP', '.PPPPPPPPPP.']
const CHAIR = ['KKKKKK', 'KCCCCK', 'KCCCCK', 'KKKKKK', 'KCCCCK', 'KKKKKK', 'K....K', 'K....K']
const BULB = ['..YYYY..', '.YYWYYY.', 'YYWYYYYY', 'YYYYYYYY', 'YYYYYYYY', '.YYYYYY.', '..YYYY..', '..KKKK..', '..KKKK..', '...KK...']
const BULB_C = { Y: '#fff1a8', W: '#ffffff', K: '#8a8aa0' }
const CLOUD = ['...WWWW.....', '..WWWWWWWW..', '.WWWWWWWWWW.', 'WWWWWWWWWWWW', '.WWWWWWWWWW.']
/** an Aries-style count bubble */
function count(x, cx, cy, k, n, { size = 64, bg = GOLD } = {}) { label(x, cx, cy, n, k, { size, bg, rot: -0.04, font: MONO, weight: 700 }) }

const CAMEOS = [
  { sign: 'aries', cap: 'Counted to ten. | *Got to three.*', mood: lt => lt > 1.4 ? 'wide' : 'squint', look: [1, 0], star: { x: -170 }, squash: lt => lt > 1.4 ? 0.08 : 0,
    front(x, t, lt, P) {
      const n = lt < 0.5 ? '1…' : lt < 0.9 ? '1… 2…' : '1… 2… 3—'
      count(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), n, { size: 52 })
      label(x, 790, 1000, 'CALM: EXPIRED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: RED, color: CREAM, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Calm. Until someone | *touched the fries.*', mood: lt => lt > 1.1 ? 'squint' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, FRIES, FRIES_C, 790, 920, 22 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: lt > 1.1 ? Math.sin(t * 30) * 0.05 : 0 })
      bubble(x, 780, 660, 'HANDS. OFF.', pop01(t, P.t0 + 1.1, 0.25, 2.4), { size: 46, col: RED, ink: INK, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Calm on the outside. | *Fourteen tabs inside.*', mood: 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(14, 1 + Math.floor(Math.max(0, lt - 0.3) * 9))
      for (let i = 0; i < n; i++) { x.fillStyle = INK; x.fillRect(640 + (i % 7) * 46, 700 + Math.floor(i / 7) * 34 + i * 18, 44, 30); x.fillStyle = [SKYB, GOLD, PINK, MINT][i % 4]; x.fillRect(643 + (i % 7) * 46, 703 + Math.floor(i / 7) * 34 + i * 18, 38, 24) }
      label(x, 790, 1130, `TABS OPEN: ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Totally fine. | *Hugging a pillow hard.*', mood: 'wide', look: [1, 0], star: { x: -60, y: 10 },
    front(x, t, lt, P) {
      const sq = 1 - 0.25 * clamp((lt - 0.6) * 2) * (0.8 + 0.2 * Math.sin(t * 20))
      drawBits(x, PILLOW, { P: '#ffb8d2', W: CREAM }, 540, 990, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { sx: sq, sy: 2 - sq })
      bubble(x, 760, 650, 'I’m fine!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Calm, until nobody | *noticed the haircut.*', mood: lt => lt > 1.3 ? 'squint' : 'sparkle', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 770, 680, 'notice anything?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 790, 900, 'ANYTHING?!', pop01(t, P.t0 + 1.3, 0.25, 2.4), { size: 52, col: GOLD, tail: 'bl' })
      sparkles(x, t, 370, 720, P.t0 + 0.3, 6, 120, 0.4)
    } },
  { sign: 'virgo', cap: 'A breathing exercise. | *Colour-coded.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 765, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { w: 320, h: 360, head: 'BREATHE.XLS', headCol: MINT, size: 30, rows: [
        ['IN   4 sec', '#2f8a4a', pop01(t, P.t0 + 0.5, 0.2, 2)], ['HOLD 4 sec', '#b88a1a', pop01(t, P.t0 + 0.8, 0.2, 2)], ['OUT  4 sec', '#3a6ab8', pop01(t, P.t0 + 1.1, 0.2, 2)], ['RELAX ?? sec', RED, pop01(t, P.t0 + 1.5, 0.2, 2)],
      ] })
    } },
  { sign: 'libra', cap: 'Calm face. | *Panicking about seats.*', mood: 'happy', look: lt => [Math.sin(lt * 6) > 0 ? 1 : -1, 0], star: { x: 0, y: -20 },
    front(x, t, lt, P) {
      drawBits(x, CHAIR, { K: INK, C: PINK }, 250, 1040, 28 * pop01(t, P.t0 + 0.15, 0.3, 2))
      drawBits(x, CHAIR, { K: INK, C: SKYB }, 830, 1040, 28 * pop01(t, P.t0 + 0.25, 0.3, 2))
      label(x, 540, 640, 'SEAT DECISION: 0%', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Smiling calmly. | *Eye twitching.*', mood: lt => Math.floor(lt * 5) % 3 === 0 && lt > 0.8 ? 'wink' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 760, 'TWITCH COUNT: ' + Math.floor(Math.max(0, lt - 0.8) * 5), pop01(t, P.t0 + 0.8, 0.3, 2), { size: 34, bg: RED, color: CREAM, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 980, 'it’s fine :)', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Laughed it off. | *Loudly. In a library.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.5, 0.9],
    front(x, t, lt, P) {
      bubble(x, 760, 700, 'HA HA HA HA', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 48, col: GOLD, tail: 'bl' })
      label(x, 790, 960, 'SHHH!', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 60, bg: CREAM, rot: -0.06, font: INTER, weight: 800 })
    } },
  { sign: 'capricorn', cap: 'Stayed calm. | *Scheduled the panic.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 765, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { w: 320, h: 300, head: 'FRIDAY', headCol: SLATE, size: 32, rows: [
        ['3:00 work', INK], ['4:00 PANIC', RED, pop01(t, P.t0 + 0.9, 0.2, 2)], ['4:15 work', INK, pop01(t, P.t0 + 1.3, 0.2, 2)],
      ] })
    } },
  { sign: 'aquarius', cap: 'Meditated. | *Invented a thing.*', mood: lt => lt > 1.2 ? 'wide' : 'sleepy', look: [0, -1], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 1.1, 0.3, 2.4)
      drawBits(x, BULB, BULB_C, 790, 860, 24 * k)
      sparkles(x, t, 790, 860, P.t0 + 1.15, 8, 180, 0.3)
      label(x, 790, 640, 'OM… OH!', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 40, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Rain sounds to relax. | *Cried at the rain.*', mood: 'wide', tears: lt => lt > 0.9 ? 3 : 1, look: [0, -1], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CLOUD, { W: '#c9d4e8' }, 790, 700, 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      for (let i = 0; i < 8; i++) { const ph = (t * 1.4 + i * 0.13) % 1; x.fillStyle = SKYB; x.fillRect(680 + i * 30, 780 + ph * 360, 8, 22) }
      label(x, 790, 1150, 'SO BEAUTIFUL (SOB)', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0320', key: 'F', accent: CALM, ending: 'callback',
  title: 'Staying calm? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Calm? | *Mostly.*' },
  last: {
    text: 'Aries made it to ten. | *Eventually.*',
    draw(x, t, lt) {
      const t0 = t - lt, F = signChar(x, t, 'aries', 540, 1080, 400 * pop01(t, t0 + 0.4, 0.4, 2), { mood: lt > 1.4 ? 'sparkle' : 'squint', seed: 5, hops: [t0 + 1.5] })
      label(x, 540, 800, lt < 1.4 ? '…9…' : '10 ✓', pop01(t, t0 + 0.8, 0.3, 2.2), { size: 64, bg: lt < 1.4 ? GOLD : MINT, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 540, 820, t0 + 1.45, 9, 220, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
