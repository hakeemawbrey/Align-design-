// r2t0317: star_talk, SOLO, "Libras on a trip | *be like.*" (~45 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole film (makeFilm solo mode, 9 cards). Ending: callback.
//   0.0–3.6    hook
//   3.6–37.8   seven outfits for one night · which restaurant? day three · 200 photos of one sunset · a group-chat vote on breakfast
//              (tie) · best friends with the whole hotel · flipped a coin, twice · souvenirs for all twelve signs
//              · checked the hotel's compatibility · trip over, already planning a prettier one
//  37.8        "Pretty trip. | *Zero decisions.*"
//  41.2        callback: "Outfits worn? | *Just one.*" — card 1's suitcase comes back: WORN 1/7.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
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

const ROSE = '#ff9cc8', TEAL = '#6fd6c8'
/** a suitcase, bursting with outfit stripes */
function suitcase(x, cx, cy, k, lt, { tag = '' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  const bulge = 1 + 0.06 * Math.sin(lt * 9) * clamp(lt)
  x.fillStyle = INK; x.fillRect(-60, -200, 120, 50); x.fillStyle = '#3a3358'; x.fillRect(-46, -188, 92, 30); x.fillStyle = INK; x.fillRect(-40, -176, 80, 18)
  x.save(); x.scale(1, bulge)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-160, -140, 330, 300)
  x.fillStyle = INK; x.fillRect(-172, -156, 344, 308); x.fillStyle = ROSE; x.fillRect(-162, -146, 324, 288)
  x.fillStyle = '#e07aa8'; x.fillRect(-162, -20, 324, 16)
  const C = [GOLD, MINT, SKYB, LAV, CREAM, '#ff9a4a', RED]
  for (let i = 0; i < 7; i++) { x.fillStyle = INK; x.fillRect(-150 + i * 43, -176, 38, 34); x.fillStyle = C[i]; x.fillRect(-146 + i * 43, -172, 30, 30) }
  x.restore()
  if (tag) { x.fillStyle = INK; x.fillRect(-110, 150, 220, 70); x.fillStyle = CREAM; x.fillRect(-104, 156, 208, 58); x.fillStyle = INK; x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(tag, 0, 186) }
  x.restore()
}
const SUN = ['....YYYY....', '..YYYYYYYY..', '.YYYYYYYYYY.', 'YYYYYYYYYYYY', 'OOOOOOOOOOOO', '.OOOOOOOOOO.', 'PPPPPPPPPPPP', '.PPPPPPPPPP.', 'PPPPPPPPPPPP']
const SUN_C = { Y: GOLD, O: '#ff9a4a', P: '#7a5cc8' }
const HOTEL = ['....RRRRRR....', '...RRRRRRRR...', '..SSSSSSSSSS..', '..SWWSWWSWWS..', '..SSSSSSSSSS..', '..SWWSWWSWWS..', '..SSSSSSSSSS..', '..SWWSWWSWWS..', '..SSSSDDSSSS..', '..SSSSDDSSSS..']
const HOTEL_C = { R: '#e23d4e', S: '#d9c9a8', W: SKYB, D: '#8a4a2e' }

const S = 'libra'
const CAMEOS = [
  { sign: S, cap: 'Packed seven outfits. | *For one night.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      suitcase(x, 770, 900, pop01(t, P.t0 + 0.15, 0.3, 2), lt)
      label(x, 770, 640, 'NIGHTS: 1 · OUTFITS: 7', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Which restaurant? | Still *deciding. Day three.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: lt => [Math.sin(lt * 5) > 0 ? 1 : -1, 0], star: { x: -60, y: 20 },
    front(x, t, lt, P) {
      sheet(x, 260, 800, pop01(t, P.t0 + 0.15, 0.3, 2), { w: 220, h: 260, head: 'PASTA', headCol: '#ff9a4a', size: 28, rot: -0.08, scale: 1, rows: [['cute', INK], ['cozy', INK]] })
      sheet(x, 820, 800, pop01(t, P.t0 + 0.3, 0.3, 2), { w: 220, h: 260, head: 'SUSHI', headCol: TEAL, size: 28, rot: 0.08, scale: 1, rows: [['cute', INK], ['also cozy', INK]] })
      label(x, 540, 1110, 'DAY 3 · STILL HUNGRY', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: RED, color: CREAM, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Took 200 photos | *of one sunset.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SUN, SUN_C, 780, 860, 24 * pop01(t, P.t0 + 0.15, 0.3, 2))
      const n = Math.min(200, Math.floor(Math.max(0, lt - 0.3) * 130))
      label(x, 780, 640, `PHOTOS: ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 40, bg: CREAM, rot: 0.04, font: MONO, weight: 700 })
      if (Math.floor(lt * 6) % 3 === 0 && lt > 0.4) { x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(600, 700, 360, 330) }
    } },
  { sign: S, cap: 'Asked the group chat | to *vote on breakfast.*', mood: lt => lt > 1.4 ? 'wide' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 770, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'POLL', headCol: ROSE, lines: [
        ['pancakes: 3', GOLD, pop01(t, P.t0 + 0.5, 0.25, 2.2)],
        ['waffles: 3', SKYB, pop01(t, P.t0 + 0.8, 0.25, 2.2)],
        ['it’s a tie', RED, pop01(t, P.t0 + 1.3, 0.25, 2.2), true],
      ] })
    } },
  { sign: S, cap: 'Day one: best friends | with *the whole hotel.*', mood: 'heart', look: [1, 0], star: { x: -200, s: 260 }, hops: [0.9, 1.7],
    front(x, t, lt, P) {
      ;[['aries', 650, 1000], ['cancer', 800, 960], ['virgo', 930, 1010]].forEach(([id, px, py], i) => {
        const k = pop01(t, P.t0 + 0.3 + i * 0.25, 0.3, 2)
        if (k > 0.01) signChar(x, t, id, px, py, 150 * k, { mood: 'heart', look: [-1, 0], seed: 40 + i, glyph: false })
      })
      bubble(x, 800, 700, 'BESTIE!!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 44, col: ROSE, tail: 'bc' })
      hearts(x, t, 800, 900, P.t0 + 1.3, { n: 6, life: 1.6, spread: 300, cell: 7, seed: 8 })
    } },
  { sign: S, cap: 'Left or right? | Flipped a coin. *Twice.*', mood: lt => lt > 1.3 ? 'squint' : 'wide', look: [0, -1], star: { x: -170 },
    front(x, t, lt, P) {
      const ph = prog(lt, 0.3, 1.0), ph2 = prog(lt, 1.2, 1.9)
      const up = Math.sin(Math.PI * ph) + Math.sin(Math.PI * ph2)
      drawBits(x, COIN, COIN_C, 780, 980 - up * 280, 28, { sx: Math.cos(t * 18) })
      label(x, 680, 680, '← LEFT', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 32, bg: SKYB, rot: -0.05, font: MONO, weight: 700 })
      label(x, 880, 760, 'RIGHT →', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 32, bg: ROSE, rot: 0.05, font: MONO, weight: 700 })
      label(x, 780, 1140, 'BEST OF FIVE?', pop01(t, P.t0 + 1.9, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Bought souvenirs | for *all twelve signs.*', mood: 'sparkle', look: [1, 0], star: { x: -220, s: 240 },
    front(x, t, lt, P) {
      const IDS = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
      IDS.forEach((id, i) => {
        const k = pop01(t, P.t0 + 0.2 + i * 0.09, 0.25, 2.2)
        if (k > 0.01) signChar(x, t, id, 590 + (i % 4) * 105, 660 + Math.floor(i / 4) * 140, 96 * k, { mood: 'happy', seed: 50 + i, glyph: false, glow: 0.6, tears: id === 'pisces' ? 1 : 0 })
      })
      label(x, 750, 1110, 'BAG FEE: WORTH IT', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Checked the hotel’s sign | *for compatibility.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, HOTEL, HOTEL_C, 780, 860, 24 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 780, 1100, 'HOTEL: A LIBRA ✓', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 780, 760, P.t0 + 1.4, { n: 5, life: 1.5, spread: 200, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Trip’s over. | *Planning a prettier one.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 765, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { w: 340, h: 380, head: 'TRIP #2', headCol: ROSE, size: 30, rows: [
        ['✓ prettier', INK, pop01(t, P.t0 + 0.5, 0.2, 2)], ['✓ pinker', INK, pop01(t, P.t0 + 0.8, 0.2, 2)],
        ['✓ 9 outfits', INK, pop01(t, P.t0 + 1.1, 0.2, 2)], ['? where', RED, pop01(t, P.t0 + 1.5, 0.2, 2)],
      ] })
    } },
]

const F = makeFilm({
  id: 'r2t0317', key: 'E', accent: ROSE, solo: 'libra', ending: 'callback',
  title: 'Libras on a trip | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Pretty trip. | *Zero decisions.*', mood: 'heart' },
  last: {
    text: 'Outfits worn? | *Just one.*',
    draw(x, t, lt) {
      const t0 = t - lt
      suitcase(x, 540, 1020, 1.1 * pop01(t, t0 + 0.6, 0.4, 2), lt, { tag: 'WORN 1/7' })
      sparkles(x, t, 540, 1000, t0 + 1.2, 8, 260, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
