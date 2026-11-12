// r2t0435: star_talk, SOLO film, "Geminis on their birthday | *be like.*" (~50 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through: nine birthday moments, each the most extreme Gemini version. Ending: lesson.
//   0.0–3.6    hook · 3.6–37.8 nine cards:
//              two birthday parties, same night · made a wish, then changed it · replied to every text with a voice note
//              · the party theme changed hourly · best friends with the waiter now · read their horoscope twice (both versions)
//              · said "small party", invited 60 · ate dessert first, then dessert again · last guest left, called them back
//  37.8        "Two of them. | *Twice the party.*" · 41.0 LESSON: "Celebrate a Gemini | in *every version.*"  GUESTS: ALL
//  46.9        "Party two? | *Starting now.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff8ea', SLATE = '#9fb4c8', WOOD = '#c98f5a', SAND = '#f3d79a', ORANGE = '#ffb34a', GREEN = '#5fd068', BROWN = '#8a4a2e'
// ── shared props (each film carries its own copy)
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
    x.font = `800 30px ${INTER}`; const w = x.measureText(txt).width + 28
    x.save(); x.translate(right ? 112 - w : -112, -70 + i * 76); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -27, w, 54); x.fillStyle = INK; x.fillText(txt, 14, 2)
    x.restore()
  })
  x.restore()
}
/** a mini birth-chart wheel */
function chartWheel(x, t, cx, cy, k, r = 150) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k * r / 150, k * r / 150); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#2a2350'; x.beginPath(); x.arc(0, 0, 140, 0, Math.PI * 2); x.fill()
  const C = [RED, '#7fd08a', SAND, SKYB, GOLD, '#b6e08a', PINK, '#b07bff', '#ff9a4a', SLATE, '#6fd6ff', LAV]
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillStyle = C[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 140, a, a + Math.PI / 6 - 0.04); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, 80, 0, Math.PI * 2); x.fill()
  x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.moveTo(-60, -20); x.lineTo(50, 40); x.lineTo(-10, -62); x.closePath(); x.stroke()
  x.restore()
}
/** paper confetti falling */
function confetti(x, t, cx, cy, t0, { n = 22, spread = 340, h = 520 } = {}) {
  const lt = t - t0
  if (lt <= 0) return
  const COLS = [GOLD, PINK, MINT, SKYB, ORANGE, LAV]
  for (let i = 0; i < n; i++) {
    const ph = (lt * 0.55 + i * 0.137) % 1
    const px = cx + Math.sin(i * 2.71) * spread + Math.sin(t * 2 + i) * 18
    const py = cy - h / 2 + ph * h
    x.save(); x.translate(px, py); x.rotate(t * 3 + i); x.globalAlpha = Math.sin(Math.PI * ph)
    x.fillStyle = COLS[i % COLS.length]; x.fillRect(-9, -5, 18, 10); x.restore()
  }
}
/** a pixel bitmap that pops in at t0 (cell size c) */
const bits = (x, t, bm, cols, cx, cy, c, t0, o = {}) => drawBits(x, bm, cols, cx, cy, c * pop01(t, t0, 0.3, 2), o)
const S = 'gemini', YEL = '#ffe066'
const CAKE = ['....F..F..F....', '....C..C..C....', '..PPPPPPPPPPP..', '..PWPWPWPWPWP..', '..BBBBBBBBBBB..', '.BBBBBBBBBBBBB.', '.PPPPPPPPPPPPP.', 'BBBBBBBBBBBBBBB', 'KKKKKKKKKKKKKKK']
const CAKE_C = { F: GOLD, C: CREAM, P: PINK, W: CREAM, B: '#c98f5a', K: '#8a4a2e' }
const BALLOON = ['.BBB.', 'BBWBB', 'BBBBB', 'BBBBB', '.BBB.', '..K..', '..K..', '...K.', '..K..']
const balloon = c => ({ B: c, W: '#ffffff', K: BONE })
const ICE = ['.PPP.', 'PPPPP', 'PWPPP', '.PPP.', '.OOO.', '..O..']
const ICE_C = { P: PINK, W: '#ffffff', O: '#c98f5a' }

const CAMEOS = [
  { sign: S, cap: 'Two birthday parties. | *Same night.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: { x: -20, y: 30 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      label(x, 260, 680, 'PARTY A', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 36, bg: YEL, rot: -0.06, font: MONO, weight: 700 })
      label(x, 820, 680, 'PARTY B', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 36, bg: SKYB, rot: 0.06, font: MONO, weight: 700 })
      bits(x, t, BALLOON, balloon(PINK), 230, 900, 14, P.t0 + 0.3)
      bits(x, t, BALLOON, balloon(MINT), 850, 900, 14, P.t0 + 0.6)
      label(x, 540, 1130, 'COMMUTE: HALLWAY', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: BONE, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Made a wish. | *Then changed it.*', mood: lt => lt > 1.1 ? 'wink' : 'squint', star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, t, CAKE, CAKE_C, 790, 950, 20, P.t0 + 0.2)
      bubble(x, 780, 680, lt < 1.1 ? 'i wish for—' : 'no wait, | new wish', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 790, 1130, 'WISH v3', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: YEL, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Replied to every text | *with a voice note.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 780, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'HBD!! (48)', headCol: YEL, lines: [
        ['▶ voice 0:47', MINT, pop01(t, P.t0 + 0.5, 0.2, 2), true], ['▶ voice 1:12', MINT, pop01(t, P.t0 + 0.8, 0.2, 2), true], ['▶ voice 9:05', PINK, pop01(t, P.t0 + 1.3, 0.2, 2), true],
      ] })
    } },
  { sign: S, cap: 'The party theme? | *Changed hourly.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', star: { x: -170 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const TH = [['THEME: SPACE', SKYB], ['THEME: DISCO', PINK], ['THEME: COWBOY', ORANGE], ['THEME: ALL 3', YEL]]
      const [th, c] = TH[Math.min(3, Math.floor(clamp((lt - 0.3) / 1.6) * 4))]
      label(x, 790, 760, th, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 38, bg: c, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1040, `${7 + Math.min(3, Math.floor(clamp((lt - 0.3) / 1.6) * 4))} PM`, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Met the waiter. | *Best friends now.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      signChar(x, t, 'capricorn', 800, 930, 200 * pop01(t, P.t0 + 0.2, 0.3, 2), { mood: lt > 1.2 ? 'heart' : 'neutral', look: [-1, 0], seed: 23, glyph: false, hops: [P.t0 + 1.3] })
      bubble(x, 790, 660, 'we’re going | on holiday', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 790, 1130, 'MET: 4 MIN AGO', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: YEL, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Read their horoscope. | *Both versions.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      chartWheel(x, t, 720, 830, pop01(t, P.t0 + 0.2, 0.3, 2), 100)
      chartWheel(x, -t, 870, 900, pop01(t, P.t0 + 0.5, 0.3, 2), 100)
      label(x, 790, 1100, 'TWIN READING ×2', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: YEL, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Said “small party.” | *Invited 60.*', mood: lt => lt > 1.4 ? 'wide' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.3) / 1.6) * 60)
      sheet(x, 780, 840, pop01(t, P.t0 + 0.15, 0.3, 2), { w: 320, h: 330, head: 'SMALL PARTY', headCol: YEL, rows: [['mom', INK, 1], ['the waiter', INK, 1], [`+${Math.max(0, n - 2)} more`, RED, 1]] })
      label(x, 780, 1110, 'VENUE: STADIUM?', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Ate dessert first. | *Then dessert again.*', mood: 'heart', star: { x: -170 },
    front(x, t, lt, P) {
      bits(x, t, ICE, ICE_C, 720, 880, 22, P.t0 + 0.2)
      bits(x, t, ICE, { ...ICE_C, P: MINT }, 870, 880, 22, P.t0 + 0.8)
      label(x, 790, 680, 'DINNER: LATER', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Last guest left. | *Called them back.*', mood: lt => lt > 1.1 ? 'sparkle' : 'sleepy', look: [1, 0], star: { x: -170 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 700, '3:12 AM', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 44, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 940, 'wait, one more | story!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 38, col: YEL, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0435', key: 'F', accent: YEL, solo: S, ending: 'lesson',
  title: 'Geminis on their birthday | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Two of them. | *Twice the party.*', mood: 'sparkle' },
  lesson: { text: 'Celebrate a Gemini | in *every version.*', chip: 'GUESTS: ALL' },
  last: {
    text: 'Party two? | *Starting now.*',
    draw(x, t, lt) { confetti(x, t, 540, 1250, t - lt + 0.5, { n: 26, spread: 400, h: 600 }) },
  },
})
export const DURATION = F.DURATION
// the hook is long: widen the title box so each ' | ' line stays on one line, then scale it down to the safe width
async function build(stage) {
  const sc = await F.SCENES[0](stage)
  const tb = sc.root.children[1].children[1]
  Object.assign(tb.style, { left: '-90px', width: '1260px', transformOrigin: '50% 0', transform: 'scale(0.85)' })
  return sc
}
export const SCENES = [build]
export const CUES = F.CUES
export const T = F.T
