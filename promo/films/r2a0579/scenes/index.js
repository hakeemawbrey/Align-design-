// r2a0579: star_advice, ADVICE ROLL CALL (twelve signs), "Each sign’s | *dream home.*" (signs3kit social cut, music: lofi · E).
// One warm, specific dream home per sign, each with a light visual gag:
//   ♈ a big front door, always ready to go · ♉ a kitchen that smells like fresh bread · ♊ a library with a nap couch
//   · ♋ a kitchen table where everyone fits · ♌ big windows, sun on their face · ♍ labelled shelves, a calm tidy nest
//   · ♎ pretty light, fresh flowers always · ♏ a secret nook, just for them · ♐ a tiny house with a big view
//   · ♑ built it themself, brick by brick · ♒ a telescope in the roof · ♓ by the sea, happy tears daily.
// Ending: callback ("Cancer saved you | a seat." — the big kitchen table is back, with a chair marked YOURS).
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO, INTER } from '../../signs3kit.js'
import { L, sheet, phone, steam, confetti, zzz, bits, swapLabel, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffb34a', ST = { x: -170 }
const b = (x, bm, c, cx, cy, cell, o) => drawBits(x, bm, c, cx, cy, cell, o)
const DOOR = ['RRRRRRRR', 'RDDDDDDR', 'RDWWWWDR', 'RDDDDDDR', 'RDDDDDYR', 'RDDDDDYR', 'RDDDDDDR', 'RDDDDDDR', 'RRRRRRRR']
const DOOR_C = { R: '#8a5a32', D: '#ff6b5a', W: SKYB, Y: GOLD }
const BREAD = ['..CCCCCCC..', '.CCWCCWCCC.', 'CCCCCCCCCCC', 'CCCCCCCCCCC', '.CCCCCCCCC.']
const BREAD_C = { C: '#e0a56a', W: '#fff4e2' }
const TABLE = ['WWWWWWWWWWWWWWWWWW', 'WWWWWWWWWWWWWWWWWW', '.B..............B.', '.B..............B.', '.B..............B.']
const TABLE_C = { W: '#c98f5a', B: '#8a5a32' }
const CHAIR = ['B....', 'B....', 'B....', 'BBBBB', 'B...B', 'B...B']
const CHAIR_C = { B: '#8a5a32' }
const WINDOW = ['KKKKKKKKKK', 'KSSSSKSSSK', 'KSSSSKSSSK', 'KSSSSKSSSK', 'KKKKKKKKKK', 'KSSSSKSSSK', 'KSSSSKSSSK', 'KKKKKKKKKK']
const WINDOW_C = { K: '#fff4e2', S: '#8fe3ff' }
const VASE = ['.P.R.P.', 'PPRRRPP', '.P.R.P.', '..GGG..', '...G...', '..LLL..', '.LLLLL.', '.LLLLL.', '..LLL..']
const VASE_C = { P: PINK, R: '#ff4f86', G: '#4fbf6a', L: LAV }
const BRICK = ['RRRWRRRRWRRR', 'WWWWWWWWWWWW', 'RWRRRRWRRRRW', 'WWWWWWWWWWWW', 'RRRWRRRRWRRR', 'WWWWWWWWWWWW', 'RWRRRRWRRRRW']
const BRICK_C = { R: '#c9573a', W: '#e8d6c0' }
const SCOPE = ['........KK', '......KKSK', '....KKSSK.', '..KKSSSK..', 'KKSSSKK...', 'KSSKK.....', '.KK.......', '..K.......', '.K.K......', 'K...K.....']
const SCOPE_C = { K: INK, S: STEEL }
const HOUSE2 = ['....RRRR....', '..RRRRRRRR..', 'RRRRRRRRRRRR', '.WWWWWWWWWW.', '.WSSWWWWDDW.', '.WSSWWWWDDW.', '.WWWWWWWDDW.']
const HOUSE2_C = { R: '#ff6b5a', W: CREAM, S: SKYB, D: '#8a5a32' }

function shelves(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -170, 340, 340); x.fillStyle = '#c98f5a'; x.fillRect(-162, -162, 324, 324)
  const LB = ['MUGS', 'TEA', 'SOCKS', 'CALM']
  for (let r = 0; r < 2; r++) {
    x.fillStyle = INK; x.fillRect(-162, -10 + r * 160, 324, 12)
    for (let c = 0; c < 2; c++) {
      const i = r * 2 + c, a = clamp((lt - 0.4 - i * 0.2) / 0.2)
      if (a <= 0) continue
      x.globalAlpha = a; x.fillStyle = INK; x.fillRect(-140 + c * 150, -130 + r * 160, 130, 110); x.fillStyle = [MINT, SKYB, PINK, GOLD][i]; x.fillRect(-134 + c * 150, -124 + r * 160, 118, 98)
      x.fillStyle = CREAM; x.fillRect(-120 + c * 150, -92 + r * 160, 90, 34); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(LB[i], -75 + c * 150, -74 + r * 160)
      x.globalAlpha = 1
    }
  }
  x.restore()
}
function nook(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= k
  x.fillStyle = 'rgba(255,225,150,0.22)'; x.beginPath(); x.ellipse(cx, cy + 40, 200, 150, 0, 0, Math.PI * 2); x.fill(); x.restore()
  bits(x, 'LAMP', cx + 90, cy - 50, 16 * k)
  bits(x, 'BOOK', cx - 40, cy + 50, 16 * k, { rot: -0.08 })
  bits(x, 'MUG', cx + 100, cy + 80, 12 * k)
}
function starsky(x, t, k) {
  if (k <= 0.01) return
  for (let i = 0; i < 9; i++) { const sx = 640 + (i * 97) % 300, sy = 560 + (i * 61) % 180, tw = 0.5 + 0.5 * Math.sin(t * 4 + i); x.fillStyle = `rgba(255,244,192,${(k * tw).toFixed(3)})`; x.fillRect(sx, sy, 10, 10) }
}

const CAMEOS = [
  { sign: 'aries', cap: 'A big front door. | *Always ready to go.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      b(x, DOOR, DOOR_C, 790, 860, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1120, 'SHOES: ALREADY ON', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'taurus', cap: 'A kitchen that smells | like *fresh bread.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      b(x, BREAD, BREAD_C, 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 790, 820, { alpha: lt > 0.5 ? 0.7 : 0, h: 150 })
      L(x, 790, 1080, 'OVEN: ALWAYS WARM', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: 'gemini', cap: 'A library | *with a nap couch.*', mood: lt => lt > 1.4 ? 'sleepy' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) bits(x, 'BOOK', 680 + i * 56, 720, 10 * pop01(t, P.t0 + 0.2 + i * 0.08, 0.25, 2), {})
      bits(x, 'SOFA', 790, 980, 20 * pop01(t, P.t0 + 0.7, 0.3, 2))
      if (lt > 1.4) zzz(x, t, 440, 700)
      L(x, 790, 1130, 'BOOKS STARTED: ALL', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  { sign: 'cancer', cap: 'A kitchen table | *where everyone fits.*', mood: 'heart', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      b(x, TABLE, TABLE_C, 790, 960, 18 * k)
      for (let i = 0; i < 4; i++) b(x, CHAIR, CHAIR_C, 660 + i * 85, 1010, 12 * pop01(t, P.t0 + 0.4 + i * 0.12, 0.25, 2), { sx: i < 2 ? 1 : -1 })
      L(x, 790, 1130, 'CHAIRS: ALWAYS +1', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, -0.04, 30)
      hearts(x, t, 790, 880, P.t0 + 1.3, { n: 4, life: 1.6, spread: 200, cell: 7, seed: 4 })
    } },
  { sign: 'leo', cap: 'Big windows. | *Sun on their face.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.0],
    back(x, t, lt, P) {
      const k = ease.outCubic(prog(lt, 0.3, 0.7)); if (k <= 0.01) return
      x.save(); x.globalAlpha = 0.25 * k; x.fillStyle = '#fff1b0'; x.beginPath(); x.moveTo(700, 640); x.lineTo(880, 640); x.lineTo(560, 1180); x.lineTo(180, 1180); x.closePath(); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      b(x, WINDOW, WINDOW_C, 790, 760, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1060, 'GOLDEN HOUR: ALL DAY', pop01(t, P.t0 + 1.2, 0.3, 2.4), '#ffb34a', 0.04, 28)
      sparkles(x, t, 370, 880, P.t0 + 1.0, 6, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Labelled shelves. | *A calm, tidy nest.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) { shelves(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt) } },
  { sign: 'libra', cap: 'Soft light. | Fresh flowers, *always.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      b(x, VASE, VASE_C, 790, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'LAMP', 920, 700, 12 * pop01(t, P.t0 + 0.6, 0.3, 2))
      L(x, 790, 1120, 'VIBE: CURATED', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, -0.04, 32)
    } },
  { sign: 'scorpio', cap: 'A secret nook. | *Just for them.*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      nook(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 640, 'BEHIND THE BOOKCASE', pop01(t, P.t0 + 1.3, 0.3, 2.4), LAV, 0.04, 28)
    } },
  { sign: 'sagittarius', cap: 'A tiny house | *with a huge view.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8],
    front(x, t, lt, P) {
      bits(x, 'MOUNT', 790, 820, 25 * pop01(t, P.t0 + 0.2, 0.3, 2))
      b(x, HOUSE2, HOUSE2_C, 760, 1010, 10 * pop01(t, P.t0 + 0.6, 0.3, 2))
      L(x, 790, 1130, 'BACKYARD: THE WORLD', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  { sign: 'capricorn', cap: 'Built it themself. | *Brick by brick.*', mood: lt => lt > 1.6 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const rows = Math.min(7, Math.floor(Math.max(0, lt - 0.2) / 0.2))
      if (rows > 0) b(x, BRICK.slice(7 - rows), BRICK_C, 790, 1060 - rows * 11 * 1, 22, {})
      L(x, 790, 700, 'ON SCHEDULE. OBVIOUSLY.', pop01(t, P.t0 + 1.6, 0.3, 2.4), '#2fc79a', 0.04, 26)
    } },
  { sign: 'aquarius', cap: 'A telescope | *in the roof.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      starsky(x, t, clamp((lt - 0.4) / 0.4))
      b(x, SCOPE, SCOPE_C, 790, 930, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1130, 'NEIGHBOURS: ALIENS', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'pisces', cap: 'A cottage by the sea. | *Happy tears daily.*', mood: lt => lt > 0.9 ? 'heart' : 'sparkle', tears: 2, star: ST,
    front(x, t, lt, P) {
      bits(x, 'WAVE', 790, 1020 + 6 * Math.sin(t * 3), 12 * pop01(t, P.t0 + 0.2, 0.3, 2))
      b(x, HOUSE2, HOUSE2_C, 790, 850, 16 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 790, 640, 'VIEW: SOBBING', pop01(t, P.t0 + 1.2, 0.3, 2.4), SKYB, -0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2a0579', key: 'E', accent: ACC, ending: 'callback',
  title: 'Each sign’s | *dream home.*',
  cameos: CAMEOS,
  card: { a: 'cancer', b: 'taurus', chip: 'ALIGNED' },
  group: { cap: 'Twelve dream homes. | *All with snacks.*' },
  last: {
    text: 'Cancer saved you | *a seat.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'cancer', 330, 1090, 250 * k, { mood: 'heart', seed: 7, look: [1, 0], hops: [t0 + 1.3] })
      b(x, TABLE, TABLE_C, 720, 1110, 22 * pop01(t, t0 + 0.4, 0.3, 2))
      b(x, CHAIR, CHAIR_C, 950, 1140, 18 * pop01(t, t0 + 0.7, 0.3, 2), { sx: -1 })
      L(x, 900, 1290, 'YOURS', pop01(t, t0 + 1.3, 0.3, 2.4), PINK, -0.04, 40)
      hearts(x, t, 600, 1020, t0 + 1.4, { n: 6, life: 2.0, spread: 400, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
