// r2t0318: star_talk, SOLO, "Pisces shopping | *be like.*" (~45 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole film (makeFilm solo mode, 9 cards; Pisces cries in every one). Ending: callback.
//   0.0–3.6    hook
//   3.6–37.8   in for socks, out with a lamp named Gary · bought the sad plant so it feels loved · cried in the fitting room, it fit
//              · the cashier said "nice day!", besties now · a candle called "Ocean": wept, bought six
//              · horoscope said "treat yourself", took it personally · daydreamed in aisle 7 for forty minutes
//              · returned nothing, every item has a story · bought a friend a gift, cried giving it
//  37.8        "Feelings first. | *Receipt second.*"
//  41.2        callback: "Still no socks. | *Gary says hi.*" — card 1's lamp comes back, glowing, with hearts.
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

const SEA = '#8fd0ff', AQUA = '#7fe0d8'
const LAMP = ['..YYYYYY..', '.YYYYYYYY.', 'YYYYYYYYYY', 'YYYYYYYYYY', '....KK....', '....KK....', '....KK....', '....KK....', '..KKKKKK..', '.KKKKKKKK.']
const LAMP_C = { Y: '#ffd98a', K: '#6b62a8' }
const SADPLANT = ['L.........', 'LL......L.', '.LL....LL.', '..LL..LL..', '...LLLL...', '....LL....', '..TTTTTT..', '..TTTTTT..', '...TTTT...']
const SADPLANT_C = { L: '#9bbf6a', T: '#d9774a' }
const DRESS = ['....KK....', '...K..K...', '..KKKKKK..', '..DDDDDD..', '...DDDD...', '...DDDD...', '..DDDDDD..', '.DDDDDDDD.', 'DDDDDDDDDD', 'DDDDDDDDDD']
const DRESS_C = { K: '#c9c9d8', D: AQUA }
const CANDLE = ['....F....', '...FYF...', '....K....', '.BBBBBBB.', '.BWWWWWB.', '.BBBBBBB.', '.BBBBBBB.', '.BBBBBBB.', '.BBBBBBB.']
const CANDLE_C = { F: '#ff9a4a', Y: GOLD, K: INK, B: SEA, W: CREAM }
const GIFT = ['....R..R....', '.....RR.....', 'GGGGGRRGGGGG', 'GGGGGRRGGGGG', 'RRRRRRRRRRRR', 'GGGGGRRGGGGG', 'GGGGGRRGGGGG', 'GGGGGRRGGGGG']
/** a lamp with a little name tag */
function lamp(x, t, cx, cy, k, { glow = 0, tag = 'GARY' } = {}) {
  if (k <= 0.01) return
  if (glow > 0) { x.save(); x.globalAlpha = 0.35 * glow; const g = x.createRadialGradient(cx, cy - 80, 10, cx, cy - 80, 260); g.addColorStop(0, '#fff1b0'); g.addColorStop(1, 'rgba(255,241,176,0)'); x.fillStyle = g; x.fillRect(cx - 280, cy - 340, 560, 520); x.restore() }
  drawBits(x, LAMP, LAMP_C, cx, cy, 24 * k)
  label(x, cx + 120 * k, cy + 40 * k, tag, k, { size: 30, bg: CREAM, rot: 0.12, font: MONO, weight: 700 })
}

const S = 'pisces'
const CAMEOS = [
  { sign: S, cap: 'Went in for socks. | *Came home with Gary.*', mood: 'heart', tears: 1, look: [1, 0], star: { x: -170 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      lamp(x, t, 760, 880, pop01(t, P.t0 + 0.3, 0.35, 2), { glow: clamp(lt - 0.8) })
      label(x, 760, 640, 'SOCKS: 0', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: SEA, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Bought the sad plant | *so it feels loved.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', tears: 2, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SADPLANT, SADPLANT_C, 790, 900, 26 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 790, 660, 'LAST ONE · 90% OFF', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 30, bg: RED, color: CREAM, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 860, P.t0 + 1.3, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Cried in the fitting room. | *It fit perfectly.*', mood: 'wide', tears: 3, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      x.fillStyle = INK; x.fillRect(630, 600, 320, 520); x.fillStyle = '#bfe6ff'; x.fillRect(640, 610, 300, 500)
      x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(660, 630, 30, 200)
      drawBits(x, DRESS, DRESS_C, 790, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1080, 'PERFECT FIT. SOBBING.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Cashier said “nice day!” | *Besties now.*', mood: 'heart', tears: 1, look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 800, 960, 210 * k, { mood: lt > 1.3 ? 'happy' : 'neutral', look: [-1, 0], seed: 30, glyph: false })
      bubble(x, 800, 720, 'have a nice day!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, tail: 'bc' })
      label(x, 540, 640, 'FRIENDSHIP BRACELET: GIVEN', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: PINK, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A candle called “Ocean.” | *Wept. Bought six.*', mood: 'wide', tears: lt => lt > 0.8 ? 3 : 1, look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) { const k = pop01(t, P.t0 + 0.2 + (i ? 0.9 + i * 0.12 : 0), 0.3, 2); drawBits(x, CANDLE, CANDLE_C, 620 + (i % 3) * 130, 820 + Math.floor(i / 3) * 190, 15 * k) }
      label(x, 750, 1150, 'OCEAN ×6', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: SEA, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Horoscope: “treat yourself.” | *Took it personally.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', tears: 1, look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, 770, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: '♓︎ TODAY', headCol: SEA, lines: [
        ['treat yourself', GOLD, pop01(t, P.t0 + 0.5, 0.25, 2.2)], ['ok!!', PINK, pop01(t, P.t0 + 1.0, 0.25, 2.2), true], ['cart: 31', RED, pop01(t, P.t0 + 1.4, 0.25, 2.2), true],
      ] })
    } },
  { sign: S, cap: 'Daydreamed in aisle seven. | *For forty minutes.*', mood: 'sleepy', tears: 1, look: [0, -1], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 760, 700, 'what if… | dolphins could…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
      const m = Math.min(40, Math.floor(Math.max(0, lt - 0.4) * 22))
      label(x, 790, 980, `AISLE 7 · 0:${String(m).padStart(2, '0')}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Returned nothing. | *Every item has a story.*', mood: 'heart', tears: 2, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      sheet(x, 765, 860, k, { w: 300, h: 420, head: 'RECEIPT', headCol: CREAM, size: 26, rows: [
        ['gary ...... ♡', INK], ['sad plant . ♡', INK], ['ocean x6 .. ♡', INK], ['socks ..... 0', RED, pop01(t, P.t0 + 1.0, 0.2, 2)],
      ] })
      label(x, 765, 1120, 'RETURNS: NEVER', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Bought a friend a gift. | *Cried giving it.*', mood: 'heart', tears: lt => lt > 1.1 ? 3 : 1, look: [1, 0], star: { x: -170 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 830, 960, 200 * k, { mood: lt > 1.3 ? 'wide' : 'happy', look: [-1, 0], seed: 31, glyph: false, tears: lt > 1.5 ? 2 : 0 })
      drawBits(x, GIFT, { R: GOLD, G: PINK }, 640, 1040, 13 * pop01(t, P.t0 + 0.5, 0.3, 2))
      bubble(x, 790, 680, 'it’s just a mug!!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'r2t0318', key: 'G', accent: SEA, solo: 'pisces', ending: 'callback',
  title: 'Pisces shopping | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Feelings first. | *Receipt second.*', mood: 'heart' },
  last: {
    text: 'Still no socks. | *Gary says hi.*',
    draw(x, t, lt) {
      const t0 = t - lt
      lamp(x, t, 540, 1020, 1.2 * pop01(t, t0 + 0.6, 0.4, 2), { glow: clamp(lt - 1.0) })
      hearts(x, t, 540, 900, t0 + 1.3, { n: 7, life: 2, spread: 420, cell: 7, seed: 9 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
