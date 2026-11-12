// r2t0664: star_talk, ROLLCALL, "The signs | *at a food truck.*" (signs3kit social cut, music: lofi · D).
// Twelve signs in zodiac order, each the most extreme version of itself in the food-truck line. Ending: lesson.
//   ♈ ordered before the truck parked · ♉ the whole menu, “for tasting” · ♊ changed the order six times at the window
//   · ♋ saved a curb seat for their match · ♌ asked for the dish named after them · ♍ seven modifications · ♎ picked the
//   cutest truck, not the food · ♏ “actually spicy” · ♐ followed the truck to the next city · ♑ price per bite,
//   calculated · ♒ the secret off-menu experiment · ♓ so good they cried at the window
//   group "One truck. | *Total chaos.*"  lesson "Good food | *tastes better shared.*"  last "Line’s long. | *Worth it.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ffb34a', CREAM = '#fff4e2', RED = '#e23d4e', BROWN = '#8a4a2e', GREEN = '#2fc79a', ORANGE = '#ff9a4a'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
function box(x, cx, cy, w, h, k, rot, fn, bg = '#2a2350') {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  fn && fn(); x.restore()
}
const friend = (x, t, id, cx, cy, s, k, o = {}) => { if (k > 0.01) signChar(x, t, id, cx, cy, s * k, { glyph: false, seed: 31, look: [-1, 0], ...o }) }
const TRUCK = [
  '..WWWWWWWWWWWWWW....',
  '..WRRRRRRRRRRRRW....',
  '..WWWWWWWWWWWWWWWW..',
  '..WSSSSSSSSSSWWWSWW.',
  '..WSSSSSSSSSSWWWSSWW',
  '..WWWWWWWWWWWWWWWWWW',
  '..WWWWWWWWWWWWWWWWWW',
  '..WWKKKWWWWWWWKKKWWW',
  '....KKK.......KKK...',
]
const TRUCK_C = { W: CREAM, R: RED, S: SKYB, K: INK }
const PLATE = ['..FFFFF..', '.FTTTTTF.', 'FTTOTTTTF', 'FTTTTGTTF', '.FTTTTTF.', '..FFFFF..']
const PLATE_C = { F: '#d8dbe8', T: '#e8b04a', O: RED, G: GREEN }
const CHILI = ['......G', '.....G.', '..RRRR.', '.RRRRR.', 'RRRRR..', 'RRRR...', 'RR.....']
const BOWL = ['.QQQQQQQ.', 'QQ.....QQ', 'BBBBBBBBB', '.BBBBBBB.', '..BBBBB..']

const CAMEOS = [
  { sign: 'aries', cap: 'Ordered before | the truck *parked.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.5, 1.0],
    front(x, t, lt, P) {
      const drive = ease.outCubic(prog(lt, 0.1, 1.0))
      drawBits(x, TRUCK, TRUCK_C, lerp(1060, 790, drive), 900, 16 * pop01(t, P.t0 + 0.1, 0.3, 2))
      bubble(x, 760, 680, 'TWO TACOS!!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 800, 1100, 'ORDER #1 (ENGINE ON)', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  { sign: 'taurus', cap: 'The whole menu. | *For “tasting.”*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = Math.min(5, 1 + Math.floor(clamp((lt - 0.2) / 1.3) * 5))
      for (let i = 0; i < n; i++) drawBits(x, PLATE, PLATE_C, 790 + (i % 2 ? 40 : -40), 1020 - i * 70, 13 * pop01(t, P.t0 + 0.2 + i * 0.25, 0.25, 2.2))
      L(x, 790, 650, 'JUST A BITE', pop01(t, P.t0 + 1.5, 0.3, 2.2), PINK, 0.05, 34)
    } },
  { sign: 'gemini', cap: 'Changed the order six times. | *At the window.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const opts = ['tacos!', 'no, a wrap', 'wait—bowl?', 'tacos.', 'BOTH?', 'surprise me']
      const n = Math.min(5, Math.floor(clamp((lt - 0.2) / 1.8) * 6))
      bubble(x, 790, 760, opts[n], pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, tail: 'bl' })
      L(x, 790, 1000, `CHANGE ${n + 1} / 6`, pop01(t, P.t0 + 0.4, 0.3, 2.2), GOLD, -0.04, 36)
      L(x, 790, 1110, 'LINE: 40 DEEP', pop01(t, P.t0 + 1.6, 0.3, 2.4), BONE, 0.04, 28)
    } },
  { sign: 'cancer', cap: 'Saved a curb seat | for *their match.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      box(x, 790, 990, 340, 46, pop01(t, P.t0 + 0.15, 0.3, 2), 0, null, '#8a8aa0')
      drawBits(x, PLATE, PLATE_C, 860, 940, 10 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 760, 880, 'RESERVED ♡', pop01(t, P.t0 + 0.7, 0.3, 2.2), PINK, 0.05, 34)
      L(x, 790, 1110, '(IT’S A CURB)', pop01(t, P.t0 + 1.5, 0.3, 2.4), BONE, -0.04, 28)
      hearts(x, t, 790, 760, P.t0 + 1.2, { n: 4, life: 1.4, spread: 140, cell: 6, seed: 4 })
    } },
  { sign: 'leo', cap: 'Asked for the dish | *named after them.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      box(x, 790, 820, 330, 250, pop01(t, P.t0 + 0.15, 0.3, 2), 0.03, () => {
        x.fillStyle = '#1b1236'; x.fillRect(-150, -110, 300, 220)
        x.fillStyle = BONE; x.font = `700 26px ${MONO}`; x.fillText('MENU', 0, -80)
        x.font = `700 22px ${MONO}`; x.fillStyle = '#8a8aa0'; x.fillText('tacos ......... 4', 0, -36); x.fillText('wrap .......... 5', 0, -4)
        if (lt > 1.0) { x.fillStyle = GOLD; x.font = `800 28px ${INTER}`; x.fillText('THE ♌︎ SPECIAL', 0, 48) }
      }, BROWN)
      L(x, 790, 1100, 'THEY ADDED IT', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 32)
      sparkles(x, t, 790, 860, P.t0 + 1.0, 6, 170, 0.5)
    } },
  { sign: 'virgo', cap: 'One taco. | *Seven modifications.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      box(x, 790, 860, 280, 440, pop01(t, P.t0 + 0.15, 0.3, 2), 0.04, () => {
        x.fillStyle = CREAM; x.fillRect(-124, -206, 248, 412)
        x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'left'
        const mods = ['1 TACO', '- no onion', '- sauce SIDE', '- extra lime', '- warm, not hot', '- cut in half', '- napkins: 4', '- thank you!']
        const n = Math.min(8, 1 + Math.floor(clamp((lt - 0.2) / 1.5) * 8))
        mods.slice(0, n).forEach((m, i) => x.fillText(m, -106, -176 + i * 48))
      })
    } },
  { sign: 'libra', cap: 'Picked the cutest truck. | *Not the food.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, TRUCK, { ...TRUCK_C, W: '#ffd0e0', R: LAV }, 790, 880, 16 * pop01(t, P.t0 + 0.15, 0.3, 2))
      hearts(x, t, 800, 780, P.t0 + 0.6, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 2 })
      L(x, 790, 1100, 'FOOD: TBD', pop01(t, P.t0 + 1.5, 0.3, 2.4), BONE, -0.04, 32)
      L(x, 800, 650, 'AESTHETIC: 10/10', pop01(t, P.t0 + 0.9, 0.3, 2.2), PINK, 0.05, 30)
    } },
  { sign: 'scorpio', cap: 'Asked for it | *“actually spicy.”*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CHILI, { R: RED, G: GREEN }, 790, 880, 24 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: Math.sin(t * 9) * 0.04 })
      bubble(x, 800, 660, 'you sure?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, col: BONE, tail: 'br' })
      L(x, 790, 1100, 'CHEF: SWEATING', pop01(t, P.t0 + 1.5, 0.3, 2.4), ORANGE, -0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Followed the truck | *to the next city.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      drawBits(x, TRUCK, TRUCK_C, 790 + Math.sin(t * 3) * 10, 880, 16 * pop01(t, P.t0 + 0.15, 0.3, 2))
      L(x, 800, 660, 'TOUR STOP 3', pop01(t, P.t0 + 0.7, 0.3, 2.2), SKYB, 0.05, 36)
      L(x, 790, 1100, 'NO RETURN TICKET', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'capricorn', cap: 'Did the price per bite. | *Ordered the deal.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      box(x, 790, 860, 300, 260, pop01(t, P.t0 + 0.15, 0.3, 2), 0.03, () => {
        x.fillStyle = '#c9c9d8'; x.fillRect(-130, -110, 260, 70)
        x.fillStyle = INK; x.font = `700 32px ${MONO}`; x.textAlign = 'right'; x.fillText(lt > 1.0 ? '0.41/BITE' : '7 ÷ 17 =', 116, -74)
        x.textAlign = 'center'
        for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) { x.fillStyle = (r + c) % 3 ? '#4a3a8a' : ORANGE; x.fillRect(-120 + c * 62, -20 + r * 42, 52, 34) }
      })
      L(x, 790, 1110, 'VALUE: OPTIMAL', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Ordered the | *off-menu experiment.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BOWL, { Q: LAV, B: SKYB }, 790, 900, 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      bubble(x, 790, 720, '???', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 48, col: LAV, tail: 'bc' })
      L(x, 790, 1100, 'SECRET ITEM #7', pop01(t, P.t0 + 1.4, 0.3, 2.4), SKYB, -0.04, 32)
    } },
  { sign: 'pisces', cap: 'So good. | *Cried at the window.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PLATE, PLATE_C, 790, 900, 18 * pop01(t, P.t0 + 0.15, 0.3, 2))
      bubble(x, 800, 690, 'thank you for this', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 32, col: SKYB, tail: 'bl' })
      L(x, 790, 1100, 'REVIEW: ★★★★★', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0664', key: 'D', accent: ACC, ending: 'lesson',
  title: 'The signs | *at a food truck.*',
  cameos: CAMEOS,
  group: { cap: 'One truck. | *Total chaos.*' },
  lesson: { text: 'Good food | *tastes better shared.*', chip: 'STATUS: FULL' },
  last: {
    text: 'Line’s long. | *Worth it.*',
    draw(x, t, lt) { drawBits(x, TRUCK, TRUCK_C, 540 + Math.sin(t * 2) * 8, 780, 16 * pop01(t, t - lt + 0.5, 0.4, 2)) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
