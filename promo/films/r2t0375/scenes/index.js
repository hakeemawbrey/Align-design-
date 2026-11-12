// r2t0375: star_talk, SOLO (pisces), "Your Pisces mom | *be like.*" (signs3kit social cut, music: lofi · F). Ending: callback.
//   Pisces cries in every card: still cries at your baby photos · you said "I'm fine", she knew · kept every drawing you
//   ever made · sends a heart every hour · named the houseplants, they have birthdays · read your match's chart before you
//   did · cried at a cartoon · waves goodbye until you're out of sight · lost her keys, found a rainbow
//   Callback: still waving, an hour later.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', ACC = '#9fb4ff', ORANGE = '#ffb34a'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })

/** an open photo album with a tiny baby star inside */
function album(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-180, -110, 376, 240)
  x.fillStyle = INK; x.fillRect(-190, -126, 380, 252); x.fillStyle = '#c97bff'; x.fillRect(-182, -118, 364, 236)
  x.fillStyle = CREAM; x.fillRect(-170, -106, 166, 212); x.fillRect(4, -106, 166, 212)
  x.fillStyle = '#ffd8e8'; x.fillRect(-150, -86, 126, 120); x.fillStyle = '#d8f0ff'; x.fillRect(24, -86, 126, 120)
  x.fillStyle = INK; x.font = `700 18px ${MONO}`; x.textAlign = 'center'; x.fillText('day 1 ♡', -87, 70); x.fillText('first sock', 87, 70)
  x.restore()
  signChar(x, t, 'gemini', cx - 87 * k, cy - 30 * k, 80 * k, { mood: 'sleepy', seed: 51, glyph: false, glow: 0.4, zzz: false })
  drawBits(x, ['WWWWW..', 'RRRRR..', 'RRRRRRR', '.RRRRR.'], { W: CREAM, R: PINK }, cx + 87 * k, cy - 26 * k, 9 * k)
}
/** a fridge plastered with kid drawings */
function fridge(x, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -260, 300, 520); x.fillStyle = '#e6ecf5'; x.fillRect(-142, -252, 284, 504)
  x.fillStyle = '#b9c3d8'; x.fillRect(-142, -70, 284, 8); x.fillRect(110, -220, 10, 100); x.fillRect(110, -30, 10, 120)
  const D = [[-80, -180, '#ffe76a'], [20, -190, '#ffd8e8'], [-70, -110, '#d8f0ff'], [40, -120, '#d9f0c8'], [-90, 10, '#ffe7a8'], [10, 0, '#ffd8e8'], [-60, 120, '#d8f0ff'], [40, 110, '#ffe76a'], [-10, 200, '#d9f0c8']]
  D.slice(0, n).forEach(([px, py, bg], i) => {
    x.save(); x.translate(px, py); x.rotate((i % 3 - 1) * 0.12)
    x.fillStyle = INK; x.fillRect(-46, -36, 92, 72); x.fillStyle = bg; x.fillRect(-42, -32, 84, 64)
    x.fillStyle = [RED, '#2fc79a', '#6b62a8'][i % 3]; x.fillRect(-26, -14, 14, 14); x.fillRect(4, 2, 22, 8); x.fillRect(-10, -24, 6, 30)
    x.fillStyle = RED; x.fillRect(-6, -40, 12, 10)
    x.restore()
  })
  x.restore()
}
/** a pixel phone with a header bar and rows: [[text, colour, k, right?], …] */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * 1.18, k * 1.18)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 24px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 64); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.4)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.restore()
}
const PLANT = ['...L...L...', '..LL..LL.L.', 'L.LLL.L.LL.', 'LL.LLLLLL..', '.LLLLLLL..L', '..LLLLLLLL.', '....LLL....', '.TTTTTTTTT.', '.TTTTTTTTT.', '..TTTTTTT..', '...TTTTT...']
const CAKE = ['...Y.Y...', '...K.K...', '.PPPPPPP.', 'PWPWPWPWP', 'PPPPPPPPP', 'CCCCCCCCC', 'CCCCCCCCC']
const TV = ['....K.....K....', '.....K...K.....', 'GGGGGGGGGGGGGGG', 'GSSSSSSSSSSSSSG', 'GSSSSSSSSSSSSSG', 'GSSSSSSSSSSSSSG', 'GSSSSSSSSSSSSSG', 'GSSSSSSSSSSSSSG', 'GSSSSSSSSSSSSSG', 'GGGGGGGGGGGGGGG', '..G.........G..']
const CAR = ['...RRRRRR.....', '..RSSRRSSR....', 'RRRRRRRRRRRRRR', 'RRRRRRRRRRRRRR', '.KK.......KK..', '.KK.......KK..']
const KEYS = ['.GGG.....', 'G...G....', 'G...GGGGG', 'G...G.G.G', '.GGG.....']

/** a soft pixel rainbow arc */
function rainbow(x, cx, cy, r, k) {
  if (k <= 0.01) return
  const COLS = ['#ff6b8a', ORANGE, '#ffe76a', '#7dffb0', '#8fe3ff', '#c97bff']
  x.save(); x.translate(cx, cy); x.scale(k, k)
  COLS.forEach((c, i) => { x.strokeStyle = c; x.lineWidth = 20; x.beginPath(); x.arc(0, 0, r - i * 20, Math.PI, 0); x.stroke() })
  x.fillStyle = CREAM; for (const s of [-1, 1]) { x.beginPath(); x.arc(s * (r - 50), 0, 46, 0, Math.PI * 2); x.arc(s * (r - 90), 10, 36, 0, Math.PI * 2); x.fill() }
  x.restore()
}

const S = 'pisces', ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Still cries | at *your baby photos.*', mood: 'heart', tears: 2, star: ST,
    front(x, t, lt, P) {
      album(x, t, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 790, 1060, 'YOU’RE 31', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 36)
    } },
  { sign: S, cap: 'You said “I’m fine.” | She *knew you weren’t.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', tears: 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 640, 'I’m fine.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, col: '#9aa5c4', tail: 'br' })
      L(x, 790, 820, 'MOM RADAR: ON', pop01(t, P.t0 + 0.8, 0.3, 2.4), PINK, -0.04, 34)
      bubble(x, 800, 1000, 'come here. | hug. now.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, col: CREAM, tail: 'bl' })
    } },
  { sign: S, cap: 'Kept every drawing | *you ever made.*', mood: 'sparkle', tears: 1, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      fridge(x, t, 0, 0, 0)
    } },
  { sign: S, cap: 'Sends a heart. | *Every hour.*', mood: 'heart', tears: 1, star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'MOM ♡', headCol: PINK, lines: [
        ['9:00 ♡', BONE, pop01(t, P.t0 + 0.4, 0.2, 2.2)], ['10:00 ♡', BONE, pop01(t, P.t0 + 0.8, 0.2, 2.2)], ['11:00 ♡♡♡', PINK, pop01(t, P.t0 + 1.2, 0.2, 2.2)],
      ] })
      hearts(x, t, 400, 820, P.t0 + 1.3, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Named the houseplants. | They *have birthdays.*', mood: 'sparkle', tears: 2, look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, PLANT, { L: '#5fd068', T: '#e0884a' }, 720, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, CAKE, { Y: GOLD, K: INK, P: PINK, W: CREAM, C: '#c98f5a' }, 890, 1010, 14 * pop01(t, P.t0 + 0.6, 0.3, 2))
      L(x, 790, 650, 'HAPPY 3RD, GERALD', pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Read your match’s chart | *before you did.*', mood: 'heart', tears: 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 790, 790, 130, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 790, 1000, 'SHE APPROVES ♡', pop01(t, P.t0 + 1.0, 0.3, 2.4), PINK, -0.04, 34)
      L(x, 790, 1090, 'ALREADY KNITTING', pop01(t, P.t0 + 1.6, 0.3, 2.2), BONE, 0.04, 26)
    } },
  { sign: S, cap: 'Cried at a sad film. | *It was a cartoon.*', mood: 'wide', tears: lt => lt < 0.9 ? 2 : 3, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, TV, { K: '#9aa5c4', G: '#6b62a8', S: '#2a2350' }, 790, 860, 20 * k)
      if (k > 0.7) signChar(x, t, 'taurus', 790, 870, 120, { mood: 'happy', seed: 61, glyph: false, glow: 0.4 })
      L(x, 790, 1100, 'RATED: FOR KIDS', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Waves goodbye | *till you’re out of sight.*', mood: 'heart', tears: 2, star: ST, hops: [0.5, 1.0, 1.5, 2.0],
    front(x, t, lt, P) {
      const go = ease.inCubic(prog(lt, 0.3, 2.2))
      drawBits(x, CAR, { R: SKYB, S: '#e6f6ff', K: INK }, lerp(640, 960, go), lerp(1040, 900, go), 16 * (1 - go * 0.7) * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 560, 620, 'BYE!! | love you!!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, col: CREAM, tail: 'bl' })
      L(x, 800, 1130, 'STILL WAVING', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Lost her keys. | *Found a rainbow.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', tears: 1, look: [1, -1], star: ST,
    front(x, t, lt, P) {
      rainbow(x, 780, 880, 165, pop01(t, P.t0 + 0.9, 0.4, 1.8))
      L(x, 790, 640, 'KEYS: ???', pop01(t, P.t0 + 0.2, 0.3, 2), BONE, -0.04, 34)
      L(x, 790, 1000, 'DAY: MADE', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 34)
    } },
]
// card 3: the fridge fills up with drawings, one by one
CAMEOS[2].front = (x, t, lt, P) => {
  fridge(x, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), Math.floor(Math.max(0, lt - 0.3) / 0.16) + 1)
  L(x, 560, 620, 'GALLERY: FULL', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, -0.06, 30)
}

const F = makeFilm({
  id: 'r2t0375', key: 'F', accent: ACC, solo: 'pisces', ending: 'callback',
  title: 'Your Pisces mom | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Feels everything. | *Loves you more.*', mood: 'heart' },
  last: {
    text: 'Still waving. | *An hour later.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'pisces', 460, 1060, 300 * k, { mood: 'heart', seed: 9, tears: 3, hops: [t0 + 0.8, t0 + 1.3, t0 + 1.8, t0 + 2.3, t0 + 2.8] })
      L(x, 790, 900, 'YOU LEFT AT 3:00', pop01(t, t0 + 0.9, 0.3, 2.4), GOLD, 0.04, 36)
      if (lt > 1.4) bubble(x, 790, 1080, 'bye!! ♡', pop01(t, t0 + 1.4, 0.25, 2.2), { size: 40, col: CREAM, tail: 'bl' })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
