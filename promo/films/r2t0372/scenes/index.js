// r2t0372: star_talk, SOLO (sagittarius), "Your Sagittarius sibling | *be like.*" (signs3kit social cut, music: lofi · E). Ending: lesson.
//   borrowed your hoodie, it's in another country · asked for honest feedback, too honest · "back in ten", three days
//   · a car ride became a road trip · fifty family photos, all blurry · signed you both up for a marathon
//   · moved out, moved back, moved out · packed for a month in one backpack · set you up with a match nine hours ahead
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', ACC = '#c97bff', ORANGE = '#ffb34a'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })

const HOODIE = ['..GGGGGG..', '.GGGKKGGG.', 'GGGGKKGGGG', 'GGGGGGGGGG', 'GG.GGGG.GG', 'GG.GWWG.GG', 'GG.GGGG.GG', 'GG.GGGG.GG', '...GGGG...']
const SHOE = ['.....RRR...', '....RWRR...', '...RRRRRR..', 'RRRRRRRRRRR', 'WWWWWWWWWWW']
const BOX = ['TTTTTTTTTT', 'TTTTKKTTTT', 'BBBBKKBBBB', 'BBBBBBBBBB', 'BBBWWWWBBB', 'BBBBBBBBBB', 'BBBBBBBBBB']
const BOX_C = { T: '#e0b07a', K: '#c98f5a', B: '#c98f5a', W: CREAM }
const PACK = ['...GGGG...', '..G....G..', '.GGGGGGGG.', 'GGGGGGGGGG', 'GGRRRRRRGG', 'GGRWWWWRGG', 'GGRRRRRRGG', 'GGGGGGGGGG', 'GGGGGGGGGG', '.GGGGGGGG.']
const CAM = ['..KKK.......', 'KKKKKKKKKKKK', 'KGGGGGGGGGGK', 'KGGGWWWWGGGK', 'KGGWSSSSWGGK', 'KGGWSSSSWGGK', 'KGGGWWWWGGGK', 'KKKKKKKKKKKK']

/** a postcard: a little scene on the left, writing on the right */
function postcard(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.06); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-170, -104, 356, 230)
  x.fillStyle = INK; x.fillRect(-182, -122, 364, 244); x.fillStyle = CREAM; x.fillRect(-174, -114, 348, 228)
  x.fillStyle = SKYB; x.fillRect(-160, -100, 150, 200); x.fillStyle = '#5fd068'; x.fillRect(-160, 40, 150, 60)
  x.fillStyle = '#9aa5c4'; x.beginPath(); x.moveTo(-160, 40); x.lineTo(-110, -40); x.lineTo(-60, 40); x.fill()
  x.fillStyle = '#fff'; x.beginPath(); x.moveTo(-124, -18); x.lineTo(-110, -40); x.lineTo(-96, -18); x.fill()
  drawBits(x, HOODIE, { G: ACC, K: INK, W: CREAM }, -50, 40, 6)
  x.fillStyle = RED; x.fillRect(110, -100, 50, 60)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText('wish you', 10, -10); x.fillText('were here!', 10, 22); x.fillText('– your hoodie', 4, 70)
  x.restore()
}
/** a map with a dotted route that keeps growing */
function routeMap(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-170, -150, 356, 320)
  x.fillStyle = INK; x.fillRect(-180, -166, 360, 332); x.fillStyle = '#d9f0c8'; x.fillRect(-172, -158, 344, 316)
  x.fillStyle = '#8fe3ff'; x.fillRect(-172, 60, 120, 98); x.fillStyle = '#b9e09a'; x.fillRect(20, -158, 152, 120)
  const PTS = [[-130, 110], [-80, 30], [-120, -60], [-20, -110], [60, -40], [10, 40], [110, 70], [140, -100], [-40, 120]]
  const n = Math.max(1, Math.floor(clamp((lt - 0.2) / 1.6) * (PTS.length - 1)) + 1)
  x.fillStyle = RED
  for (let i = 0; i < n - 1; i++) { const [a, b] = PTS[i], [c, d] = PTS[i + 1]; for (let s = 0; s < 1; s += 0.12) x.fillRect(lerp(a, c, s) - 5, lerp(b, d, s) - 5, 10, 10) }
  x.fillStyle = INK; x.fillRect(PTS[0][0] - 12, PTS[0][1] - 12, 24, 24); x.fillStyle = MINT; x.fillRect(PTS[0][0] - 8, PTS[0][1] - 8, 16, 16)
  x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.fillText('SHOP', PTS[0][0], PTS[0][1] + 30)
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

const S = 'sagittarius', ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Borrowed your hoodie. | It’s in *another country.*', mood: lt => lt > 1.3 ? 'wink' : 'sparkle', star: ST, hops: [1.3],
    front(x, t, lt, P) {
      postcard(x, 790, 820, pop01(t, P.t0 + 0.3, 0.35, 2), lt)
      L(x, 790, 1070, 'HOODIE: ABROAD', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Asked for honest feedback? | *Too honest.*', mood: lt => lt > 1.2 ? 'happy' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 810, 980, 200 * k, { mood: lt > 1.3 ? 'wide' : 'happy', look: [-1, 0], seed: 13, glyph: false, hops: [P.t0 + 1.4] })
      bubble(x, 560, 620, 'the haircut | is… brave.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 810, 760, 'NEW HAIRCUT', pop01(t, P.t0 + 0.35, 0.3, 2), PINK, 0.05, 28)
    } },
  { sign: S, cap: '“Back in ten.” | *Three days later.*', mood: 'sparkle', star: ST, hops: [0.5, 1.6],
    front(x, t, lt, P) {
      const late = lt > 1.0
      L(x, 790, 760, late ? '3 DAYS' : '10 MIN', late ? pop01(t, P.t0 + 1.0, 0.3, 2.6) : pop01(t, P.t0 + 0.3, 0.3, 2), late ? RED : MINT, -0.05, 72, late ? CREAM : INK)
      bubble(x, 790, 980, 'got a little | sidetracked', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'A quick trip to the shop | became *a road trip.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      routeMap(x, t, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.6) * 8)
      L(x, 790, 1080, `DETOUR #${n}`, pop01(t, P.t0 + 0.5, 0.3, 2), GOLD, 0.04, 36)
    } },
  { sign: S, cap: 'Family photo? | *Mid-jump.* Every time.', mood: 'wide', star: { x: -150, y: -40 }, hops: [0.3, 0.8, 1.3, 1.8],
    front(x, t, lt, P) {
      drawBits(x, CAM, { K: INK, G: '#6b62a8', W: CREAM, S: SKYB }, 800, 760, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const fl = Math.floor(lt * 2.4) % 2 === 0 && lt > 0.5
      if (fl) { x.save(); x.globalAlpha = 0.14; x.fillStyle = '#fff'; x.fillRect(120, 480, 840, 740); x.restore() }
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.8) * 49)
      L(x, 800, 960, `TAKE ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), BONE, -0.04, 40)
      L(x, 800, 1060, 'ALL BLURRY', pop01(t, P.t0 + 1.6, 0.3, 2.4), RED, 0.05, 32, CREAM)
    } },
  { sign: S, cap: 'Signed you both up | for *a marathon.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      drawBits(x, SHOE, { R: RED, W: CREAM }, 720, 1000, 14 * pop01(t, P.t0 + 0.3, 0.3, 2))
      drawBits(x, SHOE, { R: SKYB, W: CREAM }, 880, 1010, 14 * pop01(t, P.t0 + 0.5, 0.3, 2), { sx: -1 })
      L(x, 800, 720, 'RUNNERS: 2', pop01(t, P.t0 + 0.7, 0.3, 2), MINT, -0.04, 36)
      L(x, 800, 820, 'TRAINED: 1', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.05, 36)
    } },
  { sign: S, cap: 'Moved out. Moved back. | *Moved out again.*', mood: 'sparkle', star: ST, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      const n = Math.min(5, 1 + Math.floor(Math.max(0, lt - 0.2) / 0.35))
      for (let i = 0; i < n; i++) drawBits(x, BOX, BOX_C, 720 + (i % 2) * 150, 1080 - Math.floor(i / 2) * 110 - (i % 2) * 20, 15 * pop01(t, P.t0 + 0.2 + i * 0.35, 0.25, 2))
      L(x, 800, 620, `MOVE #${6 + n}`, pop01(t, P.t0 + 0.4, 0.3, 2), ORANGE, 0.05, 40)
    } },
  { sign: S, cap: 'Packed for a month. | *One backpack.*', mood: lt => lt > 1.3 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PACK, { G: '#2fc79a', R: '#1f8f6e', W: CREAM }, 790, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 640, 'CONTENTS:', pop01(t, P.t0 + 0.6, 0.3, 2), BONE, -0.04, 28)
      L(x, 790, 1110, '1 SOCK + VIBES', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 34)
    } },
  { sign: S, cap: 'Set you up with a match | *nine hours ahead.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      phone(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ NEW MATCH', headCol: GOLD, lines: [
        ['met them on', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2), true],
        ['a mountain!!', BONE, pop01(t, P.t0 + 0.8, 0.25, 2.2), true],
        ['it’s 4am here', MINT, pop01(t, P.t0 + 1.3, 0.25, 2.2)],
      ] })
      hearts(x, t, 560, 760, P.t0 + 1.5, { n: 4, life: 1.5, spread: 160, cell: 7, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'r2t0372', key: 'E', accent: ACC, solo: 'sagittarius', ending: 'lesson',
  title: 'Your Sagittarius | sibling *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Total chaos. | *Best stories.*', mood: 'wink' },
  lesson: { text: 'They roam far. | Love *travels* too.', chip: 'STATUS: HOME (FOR NOW)' },
  last: {
    text: 'Text them. | *They’re boarding.*',
    draw(x, t, lt) {
      const t0 = t - lt
      drawBits(x, HOODIE, { G: ACC, K: INK, W: CREAM }, 540, 1210, 12 * pop01(t, t0 + 0.7, 0.35, 2), { rot: 0.08 })
      label(x, 540, 1330, 'HOODIE: STILL ABROAD', pop01(t, t0 + 1.1, 0.3, 2.2), { size: 28, bg: GOLD, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
