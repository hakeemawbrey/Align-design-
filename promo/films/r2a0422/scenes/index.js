// r2a0422: star_advice, ADVICE SOLO, "Capricorn, you can | *change course.*" (~45 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way: nine gentle permissions for a Capricorn to change course, each a truth + a warm reframe. Ending: callback.
//   0.0–3.6    "Capricorn, you can | *change course.*"
//   3.6–37.8   the five-year plan is a draft · outgrew a goal, that's growth · new hobby, right on time
//              · yes became no, honest beats stuck · the spreadsheet says stay, the heart gets a vote
//              · said "never a Leo", plot twist · took the scenic route, still arrived
//              · a new path up the same mountain · repainted twice, the third colour's charming
//  37.8        "Still steady. | Just *flexible now.*"
//  41.2        CALLBACK: "Different path. | *Same view.*"  the mountain comes back, Capricorn on the peak.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', GREY = '#9aa5c4', PURP = '#6b62a8', DEEP = '#2a2350'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const B = (x, cx, cy, text, k, o = {}) => bubble(x, cx, cy, text, k, { size: 44, ...o })
const ST = { x: -170 }

/** a phone with a header strip and chat pills: lines = [[text, colour, k, right?], …] */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = DEEP; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 26px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 64); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
/** soft pixel puffs rising from (cx, cy) after t0 (steam, sighs, dust) */
function puffs(x, t, cx, cy, t0, { n = 5, col = '#e6e1f2', cell = 14, rise = 200, spread = 90, seed = 0 } = {}) {
  if (t < t0) return
  for (let i = 0; i < n; i++) {
    const ph = (((t - t0) * 0.9 + i / n) % 1 + 1) % 1
    const px = cx + Math.sin(i * 2.1 + seed) * spread * 0.5 + Math.sin(ph * 5 + i) * 12, py = cy - ph * rise, r = cell * (0.8 + ph * 1.4)
    x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * 0.9
    x.fillStyle = INK; x.fillRect(px - r - 4, py - r * 0.7 - 4, 2 * r + 8, 1.4 * r + 8)
    x.fillStyle = col; x.fillRect(px - r, py - r * 0.7, 2 * r, 1.4 * r)
    x.restore()
  }
}
/** a sticky note / paper card with lines of text */
function note(x, cx, cy, k, lines, { w = 300, bg = '#ffe27a', size = 34, rot = -0.06, font = INTER, weight = 800 } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.55, h = lines.length * lh + 50
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 25 + lh * (i + 0.5)))
  x.restore()
}
/** a birth-chart wheel */
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.3)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.4, 2.6, 4.5]) x.fillRect(Math.cos(a) * r * 0.4 - 8, Math.sin(a) * r * 0.4 - 8, 16, 16)
  x.restore()
}
/** a little anger mark (four red corner ticks) */
function vein(x, cx, cy, k, t) {
  if (k <= 0.01) return
  const s = 9 * k * (1 + 0.15 * Math.sin(t * 14))
  x.save(); x.translate(cx, cy)
  for (const [dx, dy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { x.fillStyle = INK; x.fillRect(dx * s * 1.6 - s * 0.9, dy * s * 1.6 - s * 0.9, s * 1.8, s * 1.8); x.fillStyle = RED; x.fillRect(dx * s * 1.6 - s * 0.6, dy * s * 1.6 - s * 0.6, s * 1.2, s * 1.2) }
  x.restore()
}
const ACC = '#9aa5c4'
const MOUNT = ['.......WW.......', '......WWWW......', '.....GGWWGG.....', '....GGGGGGGG....', '...GGGGGGGGGG...', '..GGGGGGGGGGGG..', '.GGGGGGGGGGGGGG.', 'GGGGGGGGGGGGGGGG']
const MOUNT_C = { W: CREAM, G: '#7a86b0' }
const FLAG = ['KYYYY', 'KYYY.', 'K....', 'K....', 'K....']
const TROPHY = ['YYYYY', 'YYYYY', '.YYY.', '..Y..', '.YYY.']
const PALETTE = ['..WWWWWW..', '.WRWWBWWW.', 'WWWWWWGWWW', 'WYWWWWWWW.', 'WWWWW.....', '.WWWW.....']
const PAL_C = { W: '#e0c9a8', R: '#ff6b5a', B: SKYB, G: '#5fd068', Y: '#ffe27a' }

function sheet(x, cx, cy, k, f) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-160, -130, 320, 260); x.fillStyle = CREAM; x.fillRect(-152, -122, 304, 244)
  x.fillStyle = '#5fd068'; x.fillRect(-152, -122, 304, 40)
  x.fillStyle = '#c9b8a8'; for (let i = 1; i < 4; i++) x.fillRect(-152 + i * 76, -82, 3, 204); for (let j = 0; j < 5; j++) x.fillRect(-152, -82 + j * 40, 304, 3)
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('STAY: 94', 0, -102)
  x.restore()
}
function road(x, k, t) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = k
  x.lineWidth = 34; x.strokeStyle = INK; x.lineCap = 'round'
  const path = () => { x.beginPath(); x.moveTo(640, 1150); x.bezierCurveTo(980, 1050, 560, 980, 900, 880); x.bezierCurveTo(1060, 820, 600, 720, 820, 600) }
  path(); x.stroke(); x.lineWidth = 22; x.strokeStyle = '#c9b8a8'; path(); x.stroke()
  x.setLineDash([16, 20]); x.lineDashOffset = -t * 40; x.lineWidth = 4; x.strokeStyle = '#ffe27a'; path(); x.stroke()
  x.restore()
}

const CAMEOS = [
  // 1 · the five-year plan
  { sign: 'capricorn', cap: 'Five-year plan changed? | Plans are *drafts.*', mood: lt => lt < 1.1 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      note(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), ['5-YEAR PLAN', lt < 1.1 ? 'v1 (final)' : 'v2 ♡'], { w: 330, bg: CREAM, size: 40, rot: -0.04 })
      L(x, 790, 1080, 'EDITS: WELCOME', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 36)
      sparkles(x, t, 790, 880, P.t0 + 1.1, 6, 170, 0.3)
    } },
  // 2 · outgrew a goal
  { sign: 'capricorn', cap: 'Outgrew a goal? | That’s *growth.*', mood: 'sparkle', star: { x: -170, s: 330 },
    front(x, t, lt, P) {
      drawBits(x, TROPHY, { Y: GOLD }, 790, 1040, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 900, 'SIZE: TOO SMALL', pop01(t, P.t0 + 0.7, 0.3, 2.2), BONE, -0.04, 34)
      bubble(x, 790, 680, 'bigger one, | please', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  // 3 · a new hobby
  { sign: 'capricorn', cap: 'New hobby? | You’re *right on time.*', mood: lt => lt < 0.9 ? 'neutral' : 'heart', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, PALETTE, PAL_C, 790, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.08 })
      L(x, 790, 650, 'DAY 1 ♡', pop01(t, P.t0 + 0.7, 0.3, 2.2), PINK, 0.05, 44)
      L(x, 790, 1100, 'TALENT: LOADING', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, -0.04, 34)
    } },
  // 4 · yes became no
  { sign: 'capricorn', cap: 'Said yes, now it’s no? | *Honest* beats stuck.', mood: lt => lt < 1.0 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k1 = pop01(t, P.t0 + 0.2, 0.3, 2)
      L(x, 790, 720, 'YES!', k1, MINT, -0.05, 56)
      if (lt > 0.9) { x.save(); x.fillStyle = RED; x.translate(790, 720); x.rotate(-0.05); x.fillRect(-90 * clamp((lt - 0.9) * 4), -5, 180 * clamp((lt - 0.9) * 4), 10); x.restore() }
      L(x, 790, 920, 'NO, THANKS ♡', pop01(t, P.t0 + 1.2, 0.3, 2.2), PINK, 0.04, 48)
      L(x, 790, 1110, 'STILL KIND', pop01(t, P.t0 + 1.6, 0.3, 2.2), BONE, -0.03, 32)
    } },
  // 5 · the spreadsheet vs the heart
  { sign: 'capricorn', cap: 'Spreadsheet says stay. | Your heart *gets a vote.*', mood: lt => lt < 1.1 ? 'squint' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 820, pop01(t, P.t0 + 0.15, 0.3, 2) * 0.95)
      const k = pop01(t, P.t0 + 1.0, 0.35, 2.4)
      drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86', W: '#fff' }, 790, 1060, 18 * k * (1 + 0.08 * Math.sin(t * 8)))
      L(x, 600, 1140, 'VOTES: 1', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, -0.05, 30)
    } },
  // 6 · Align: plot twist
  { sign: 'capricorn', cap: 'Said “never a Leo”? | *Plot twist.*', mood: lt => lt < 1.0 ? 'neutral' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 470, 590, 'never a | Leo.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: LAV, tail: 'bc' })
      L(x, 790, 730, '✦ MATCH: LEO', pop01(t, P.t0 + 0.8, 0.3, 2.2), GOLD, 0.04, 40)
      const k = pop01(t, P.t0 + 1.0, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'leo', 790, 960, 200 * k, { mood: 'sparkle', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 1.4] })
      hearts(x, t, 600, 900, P.t0 + 1.4, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 3 })
    } },
  // 7 · the scenic route
  { sign: 'capricorn', cap: 'Took the scenic route? | *Still arrived.*', mood: 'happy', look: [1, -1], star: { x: -200 },
    back(x, t, lt, P) { road(x, pop01(t, P.t0 + 0.15, 0.4, 1.6), t) },
    front(x, t, lt, P) {
      drawBits(x, FLAG, { K: INK, Y: '#ffe27a' }, 830, 560, 16 * pop01(t, P.t0 + 0.7, 0.3, 2))
      L(x, 800, 1060, 'VIEWS: 10/10', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, -0.04, 34)
    } },
  // 8 · same mountain, new path
  { sign: 'capricorn', cap: 'New path up | *the same mountain.*', mood: 'sparkle', star: { x: -210, y: 60, s: 260 },
    back(x, t, lt, P) { drawBits(x, MOUNT, MOUNT_C, 720, 960, 34 * pop01(t, P.t0 + 0.1, 0.35, 1.8)) },
    front(x, t, lt, P) {
      const d = prog(lt, 0.5, 1.6)
      x.save(); x.setLineDash([14, 14]); x.lineWidth = 8; x.strokeStyle = RED; x.globalAlpha = 0.5; x.beginPath(); x.moveTo(470, 1080); x.lineTo(720, 830); x.stroke()
      x.globalAlpha = 1; x.strokeStyle = MINT; x.beginPath(); x.moveTo(980, 1080); x.lineTo(lerp(980, 740, d), lerp(1080, 830, d)); x.stroke(); x.restore()
      drawBits(x, FLAG, { K: INK, Y: '#ffe27a' }, 740, 790, 14 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 720, 600, 'SAME PEAK ✓', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, -0.03, 38)
    } },
  // 9 · repainting
  { sign: 'capricorn', cap: 'Repainted twice? | Third colour’s *charming.*', mood: lt => lt < 1.2 ? 'squint' : 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.5, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const cols = [GREY, '#c9b8a8', '#7dffb0']
      for (let i = 0; i < 3; i++) {
        const k = pop01(t, P.t0 + 0.2 + i * 0.45, 0.3, 2)
        if (k <= 0.01) continue
        x.save(); x.translate(790, 640 + i * 170); x.rotate((i - 1) * 0.05); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-130, -64, 260, 128); x.fillStyle = cols[i]; x.fillRect(-122, -56, 244, 112); x.restore()
      }
      L(x, 790, 980, 'THE ONE ♡', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, 0.04, 38)
    } },
]

const F = makeFilm({
  id: 'r2a0422', key: 'F', accent: ACC, solo: 'capricorn', ending: 'callback',
  title: 'Capricorn, you can | *change course.*',
  cameos: CAMEOS,
  group: { cap: 'Still steady. | Just *flexible now.*', mood: 'heart' },
  last: {
    text: 'Different path. | *Same view.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k <= 0.01) return
      drawBits(x, MOUNT, MOUNT_C, 540, 1260, 46 * k)
      drawBits(x, FLAG, { K: INK, Y: '#ffe27a' }, 640, 1000, 18 * pop01(t, t0 + 0.9, 0.3, 2))
      signChar(x, t, 'capricorn', 520, 990, 270 * k, { mood: lt > 1.2 ? 'heart' : 'sparkle', seed: 33, hops: [t0 + 1.2] })
      sparkles(x, t, 540, 1000, t0 + 1.2, 8, 240, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
