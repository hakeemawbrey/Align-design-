// r2a0457: star_advice, ADVICE SOLO (cancer), "Cancer, the past | *can stay there.*" (signs3kit social cut, music: lofi · F).
// Ending: callback (the ex's hoodie comes back: "Keep the hoodie. | Let the rest go.").
//   seven boxes of keepsakes (keep the good ones) · still sorry for 2019 (you're forgiven) · walking past the old house
//   (wave, keep going) · kept their hoodie (keep it, not them) · replaying one awkward "you too" (nobody remembers)
//   · your chart says new chapter · the group chat moved on, you can too · missing who you were (you grew)
//   · unpacked one old box, made room for new.
//   group "Soft heart. | Fresh start."   last "Keep the hoodie. | Let the rest go."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#9fd8ff', CREAM = '#fff4e2', RED = '#e23d4e', SLATE = '#9aa5c4'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

const BOX = ['BBBBBBBBBBBBB', 'BDDDDDDDDDDDB', 'BBBBBBBBBBBBB', 'BBBBBWWWBBBBB', 'BBBBBBBBBBBBB', 'BBBBBBBBBBBBB']
const BOX_C = { B: '#c98f5a', D: '#a8742a', W: CREAM }
const OPENBOX = ['B...........B', 'BB.........BB', 'BBBBBBBBBBBBB', 'BBBBBWWWBBBBB', 'BBBBBBBBBBBBB', 'BBBBBBBBBBBBB']
const HOUSE = ['......RR......', '.....RRRR.....', '....RRRRRR....', '...RRRRRRRR...', '..RRRRRRRRRR..', '.RRRRRRRRRRRR.', '..WWWWWWWWWW..', '..WSSWWWWSSW..', '..WSSWWWWSSW..', '..WWWWDDWWWW..', '..WWWWDDWWWW..', '..WWWWDDWWWW..']
const HOUSE_C = { R: RED, W: CREAM, S: SKYB, D: '#8a4a2e' }
const HOODIE = ['....HHHHH....', '...HH...HH...', '..HHHHHHHHH..', '.HHHHHHHHHHH.', 'HHHHHHHHHHHHH', 'HH.HHHHHHH.HH', 'HH.HHWWWHH.HH', 'HH.HHHHHHH.HH', '...HHHHHHH...', '...HHHHHHH...']
const HOODIE_C = { H: '#8f9bd6', W: CREAM }
const SPROUT = ['..L..', '.LLL.', '..L..', '..L..', 'TTTTT', '.TTT.']
const PLANT = ['..L.L.L..', '.LLLLLLL.', 'LLLLLLLLL', '.LLLLLLL.', '..LLLLL..', '....L....', '....L....', '..TTTTT..', '..TTTTT..', '...TTT...']
const PLANT_C = { L: '#5fd068', T: '#d9774a' }

/** a mini chart sheet */
function sheet(x, cx, cy, k, { w = 330, h = 300, head = '', headCol = SLATE, rows = [], rot = 0.04, size = 30 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = CREAM; x.fillRect(-w / 2, -h / 2, w, h)
  if (head) { x.fillStyle = headCol; x.fillRect(-w / 2, -h / 2, w, 60); x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 31) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  rows.forEach(([txt, col, kk = 1], i) => {
    if (kk <= 0.01) return
    x.save(); x.globalAlpha *= clamp(kk); x.fillStyle = col || INK; x.font = `700 ${size}px ${MONO}`
    x.fillText(txt, -w / 2 + 22, -h / 2 + (head ? 60 : 0) + 44 + i * (size + 18)); x.restore()
  })
  x.restore()
}
/** a phone with chat bubbles that scroll up and away */
function chat(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-154, -224, 308, 448)
  x.fillStyle = '#2a2350'; x.fillRect(-144, -214, 288, 428)
  x.fillStyle = '#140c30'; x.fillRect(-130, -188, 260, 376)
  x.fillStyle = MINT; x.fillRect(-118, -174, 236, 52); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('GROUP CHAT', 0, -147)
  x.save(); x.beginPath(); x.rect(-130, -116, 260, 300); x.clip()
  const sc = ease.inOutCubic(prog(lt, 0.6, 1.6)) * 230
  const ROWS = [['remember 2017?', LAV], ['lol', GOLD], ['ANYWAY', SKYB], ['brunch sat?', PINK], ['yes!!', MINT]]
  x.textAlign = 'left'
  ROWS.forEach(([txt, col], i) => { x.font = `800 30px ${INTER}`; const w = x.measureText(txt).width + 28, y = -80 + i * 66 - sc; x.fillStyle = col; x.fillRect(i % 2 ? 112 - w : -112, y - 25, w, 50); x.fillStyle = INK; x.fillText(txt, (i % 2 ? 112 - w : -112) + 14, y + 2) })
  x.restore(); x.restore()
}

const S = 'cancer', ST = { x: -170 }
const CAMEOS = [
  // 1 · seven boxes of keepsakes
  { sign: S, cap: 'Seven boxes of keepsakes? | *Keep the good ones.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) drawBits(x, BOX, BOX_C, 790 + (i % 2 ? 14 : -14), 1060 - i * 106, 16 * pop01(t, P.t0 + 0.2 + i * 0.2, 0.25, 2), { rot: (i % 2 ? 0.04 : -0.04) })
      L(x, 790, 560, 'BOX 7 OF 7', pop01(t, P.t0 + 1.1, 0.3, 2.4), GOLD, -0.04, 36)
    } },
  // 2 · still sorry for 2019
  { sign: S, cap: 'Still sorry about 2019? | *You’re forgiven.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'about that one | time in 2019…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 800, 920, 'what time?? ♡', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 40, col: MINT, tail: 'br' })
      L(x, 790, 1120, 'APOLOGY: ACCEPTED', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, 0.04, 30)
    } },
  // 3 · walking past the old house
  { sign: S, cap: 'Passing the old house? | *Wave. Keep walking.*', mood: 'happy', look: [1, 0], star: ST, hops: [0.9, 1.5],
    front(x, t, lt, P) {
      drawBits(x, HOUSE, HOUSE_C, 820 + lt * 18, 880, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 560, 640, 'bye, house!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 790, 1120, 'NEXT STOP: NOW', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 34)
    } },
  // 4 · kept their hoodie
  { sign: S, cap: 'Kept their hoodie? | Keep it. *Not them.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, HOODIE, HOODIE_C, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04 })
      L(x, 790, 1110, 'COZY: STILL', pop01(t, P.t0 + 1.2, 0.3, 2.4), ACC, -0.04, 38)
    } },
  // 5 · replaying "you too"
  { sign: S, cap: 'That awkward “you too”? | *Nobody remembers.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 760, 640, 'enjoy your meal!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, col: LAV, tail: 'br' })
      bubble(x, 800, 840, 'you too!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 44, tail: 'bl' })
      L(x, 790, 1060, 'REPLAYS: 400', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.04, 36)
    } },
  // 6 · Align: your chart agrees
  { sign: S, cap: 'Your chart agrees: | *new chapter.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      sheet(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 360, h: 240, size: 32, head: '♋︎ YOUR MOON', headCol: ACC, rows: [
        ['the past: done', '#9a90b8', pop01(t, P.t0 + 0.5, 0.2, 2)], ['NEXT: CHAPTER 2', RED, pop01(t, P.t0 + 1.0, 0.2, 2)],
      ] })
      sparkles(x, t, 790, 850, P.t0 + 1.1, 7, 190, 0.2)
    } },
  // 7 · the group chat moved on
  { sign: S, cap: 'The group chat moved on. | *You can too.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) { chat(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt) } },
  // 8 · missing who you were
  { sign: S, cap: 'Missing who you were? | *You grew from them.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), g = lt > 1.0
      if (!g) drawBits(x, SPROUT, PLANT_C, 790, 1000, 18 * k)
      else drawBits(x, PLANT, PLANT_C, 790, 900, 22 * pop01(lt, 1.0, 0.35, 2))
      L(x, 790, 640, g ? 'NOW: BLOOMING' : 'THEN: TINY', pop01(t, P.t0 + 0.4, 0.3, 2), g ? MINT : SLATE, 0.04, 34)
    } },
  // 9 · unpacked one old box
  { sign: S, cap: 'Unpacked one old box. | *Made room for new.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const op = lt > 0.9
      drawBits(x, op ? OPENBOX : BOX, BOX_C, 790, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (op) sparkles(x, t, 790, 860, P.t0 + 0.9 * 1.29, 8, 160, 0.4, [GOLD, ACC, BONE])
      L(x, 790, 680, 'ROOM: MADE', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 40)
    } },
]

const F = makeFilm({
  id: 'r2a0457', key: 'F', accent: ACC, solo: S,
  title: 'Cancer, the past | *can stay there.*',
  cameos: CAMEOS,
  ending: 'callback',
  group: { cap: 'Soft heart. | *Fresh start.*', mood: 'heart' },
  last: {
    text: 'Keep the hoodie. | *Let the rest go.*',
    draw(x, t, lt) {
      drawBits(x, HOODIE, HOODIE_C, 540, 1080, 26 * pop01(t, t - lt + 0.6, 0.4, 2), { rot: 0.04 })
      hearts(x, t, 540, 960, t - lt + 1.2, { n: 6, life: 1.8, spread: 300, cell: 7, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
