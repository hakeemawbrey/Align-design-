// r2a0434: star_advice, ADVICE ROLL CALL, "How each sign | *makes a house a home.*" (~62 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order: one warm, specific, relatable line each, with one light visual gag. Ending: lesson.
//   0.0–3.6    hook · 3.6–49.2 twelve cards (3.8 s each):
//              ♈ pictures up on day one (a little crooked) · ♉ the comfiest couch · ♊ books in every room, all half-read
//              · ♋ dinner smell at the door · ♌ fairy lights everywhere · ♍ a labelled drawer for everything
//              · ♎ fresh flowers every week · ♏ candles, mood: perfect · ♐ souvenirs from everywhere
//              · ♑ bills paid, plants alive · ♒ one weird lamp you love · ♓ a cozy nook for big feelings
//  49.2        "Twelve ways | to *feel at home.*" · 52.4 LESSON: "Home isn’t the house. | It’s *who’s in it.*"  STATUS: HOME
//  58.3        "Come over. | *Kettle’s on.*"
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
const FRAME = ['KKKKKKKKKK', 'KYYYYYYYYK', 'KYSSSSSSYK', 'KYSSSGSSYK', 'KYSSGGGSYK', 'KYSGGGGGYK', 'KYYYYYYYYK', 'KKKKKKKKKK']
const FRAME_C = { K: INK, Y: GOLD, S: SKYB, G: GREEN }
const COUCH = ['..CCCCCCCCCCCC..', '.CCCCCCCCCCCCCC.', 'CCCPPPCCCCPPPCCC', 'CCCPPPCCCCPPPCCC', 'CCCCCCCCCCCCCCCC', 'CCCCCCCCCCCCCCCC', '.K............K.']
const COUCH_C = { C: '#c0805a', P: SAND, K: INK }
const BOOK = ['KKKKKK', 'KRRRRK', 'KRWWRK', 'KRRRRK', 'KRRRRK', 'KRRRRK', 'KKKKKK']
const POT = ['..KKKKKKKKKK..', 'KKKKKKKKKKKKKK', 'K.KMMMMMMMMK.K', '..KMMMMMMMMK..', '..KMMMMMMMMK..', '...KKKKKKKK...']
const POT_C = { K: INK, M: '#ff8f6b' }
const VASE = ['.F.P.F.', 'FFPPPFF', '.FGPGF.', '..GGG..', '...G...', '..BBB..', '.BBBBB.', '.BBBBB.', '..BBB..']
const VASE_C = { F: PINK, P: GOLD, G: GREEN, B: SKYB }
const CANDLE = ['..F..', '.FYF.', '.FYF.', '..K..', 'WWWWW', 'WWWWW', 'WWWWW', 'WWWWW', 'WWWWW']
const CANDLE_C = { F: '#ff9a4a', Y: '#ffe066', K: INK, W: CREAM }
const PLANT = ['....L.L....', '...LL.LL...', '..LLL.LLL..', '...LLLLL...', '.....L.....', '.TTTTTTTTT.', '..TTTTTTT..', '...TTTTT...']
const PLANT_C = { L: GREEN, T: '#d9774a' }
const LAMP = ['..PPPPP..', '.PPWPWPP.', 'PPPPPPPPP', '....K....', '...K.....', '....K....', '.....K...', '....K....', '..KKKKK..']
const LAMP_C = { P: '#b07bff', W: '#ffe066', K: '#2a2350' }
const NOOK = ['LLLLLLLLLLLLLL', 'LPPPPPPPPPPPPL', 'LPLLLPPPPPPPPL', 'LPLLLPPPPPPPPL', 'LPPPPPPPPPPPPL', 'LLLLLLLLLLLLLL']
const NOOK_C = { L: LAV, P: PINK }
const MUG = ['.S..S...', '..S..S..', '.S..S...', 'KKKKKK..', 'KWWWWKKK', 'KWWWWK.K', 'KWWWWKKK', 'KWWWWK..', 'KKKKKK..']
const MUG_C = { S: BONE, K: '#ff8f6b', W: '#8a4a2e' }
// little fairy lights strung across the panel
function lights(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k); x.strokeStyle = 'rgba(239,230,214,0.6)'; x.lineWidth = 3
  for (const yy of [620, 1100]) {
    x.beginPath(); for (let i = 0; i <= 20; i++) { const fx = 150 + i * 39, fy = yy + 24 * Math.sin(Math.PI * i / 20); i ? x.lineTo(fx, fy) : x.moveTo(fx, fy) } x.stroke()
    for (let i = 1; i < 20; i += 2) { const fx = 150 + i * 39, fy = yy + 24 * Math.sin(Math.PI * i / 20) + 10; x.fillStyle = [GOLD, PINK, MINT, SKYB][(i + Math.floor(t * 3)) % 4]; x.shadowColor = x.fillStyle; x.shadowBlur = 14; x.fillRect(fx - 7, fy - 7, 14, 14) }
  }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Pictures up | *on day one.*', mood: 'sparkle', star: { x: -170 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      bits(x, t, FRAME, FRAME_C, 790, 860, 24, P.t0 + 0.2, { rot: 0.12 })
      label(x, 790, 1090, 'SLIGHTLY CROOKED ♡', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'The comfiest couch. | *Always.*', mood: lt => lt > 1.2 ? 'sleepy' : 'heart', star: { x: -170 },
    front(x, t, lt, P) {
      bits(x, t, COUCH, COUCH_C, 790, 920, 20, P.t0 + 0.2)
      label(x, 790, 700, 'SINK-IN LEVEL: MAX', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 28, bg: SAND, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Books in every room. | *All half-read.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      const C = [RED, SKYB, GOLD, MINT, PINK]
      C.forEach((c, i) => bits(x, t, BOOK, { K: INK, R: c, W: CREAM }, 700 + (i % 3) * 90, 820 + Math.floor(i / 3) * 140, 14, P.t0 + 0.2 + i * 0.15, { rot: (i - 2) * 0.08 }))
      label(x, 790, 1100, 'BOOKMARKS: ALL p.40', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 26, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Dinner smell | *by the front door.*', mood: 'heart', star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, t, POT, POT_C, 790, 950, 22, P.t0 + 0.2)
      x.save(); x.strokeStyle = 'rgba(239,230,214,0.6)'; x.lineWidth = 8
      for (let i = 0; i < 3; i++) { if (lt < 0.5) break; x.beginPath(); for (let j = 0; j <= 12; j++) { const yy = 860 - j * 16, xx = 730 + i * 60 + 14 * Math.sin(j * 0.8 + t * 3 + i); j ? x.lineTo(xx, yy) : x.moveTo(xx, yy) } x.stroke() }
      x.restore()
      bubble(x, 790, 640, 'you’re home!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, col: PINK, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Fairy lights. | *Everywhere.*', mood: 'sparkle', star: { x: -60 }, hops: [1.3],
    back(x, t, lt, P) { lights(x, t, pop01(t, P.t0 + 0.2, 0.4, 2)) },
    front(x, t, lt, P) { label(x, 750, 1000, 'EVEN THE FRIDGE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 }) } },
  { sign: 'virgo', cap: 'A labelled drawer | *for everything.*', mood: 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      ;['SPOONS (SMALL)', 'SPOONS (BIG)', 'MISC (SORTED)'].forEach((s, i) => label(x, 790, 700 + i * 150, s, pop01(t, P.t0 + 0.2 + i * 0.45, 0.3, 2.2), { size: 28, bg: i === 2 ? '#b6e08a' : BONE, rot: (i - 1) * 0.03, font: MONO, weight: 700 }))
    } },
  { sign: 'libra', cap: 'Fresh flowers | *every week.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bits(x, t, VASE, VASE_C, 790, 860, 26, P.t0 + 0.2)
      label(x, 790, 1090, 'VASE #4 THIS MONTH', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 28, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 800, P.t0 + 1.0, 6, 150, 0.2)
    } },
  { sign: 'scorpio', cap: 'Candles lit. | *Mood: perfect.*', mood: 'wink', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bits(x, t, CANDLE, CANDLE_C, 700 + i * 90, 900 + (i % 2) * 30, 16 + (i === 1 ? 4 : 0), P.t0 + 0.2 + i * 0.25)
      label(x, 790, 680, 'LIGHTING: MOODY', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: '#b07bff', color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Souvenirs | *from everywhere.*', mood: 'sparkle', star: { x: -170 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      ;[['♡ PARIS?', PINK], ['☼ BEACH', GOLD], ['▲ MOUNTAIN', MINT]].forEach(([s, c], i) =>
        label(x, 770 + (i % 2) * 50, 680 + i * 130, s, pop01(t, P.t0 + 0.2 + i * 0.35, 0.3, 2.2), { size: 32, bg: c, rot: (i % 2 ? 0.06 : -0.06), font: MONO, weight: 700 }))
      label(x, 790, 1100, 'FRIDGE: FULL', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: BONE, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Bills paid. | *Plants alive.*', mood: lt => lt < 1.0 ? 'neutral' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bits(x, t, PLANT, PLANT_C, 790, 920, 22, P.t0 + 0.2)
      label(x, 790, 680, 'BILLS: PAID ✓', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1110, 'WATERED: TUESDAY', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'One weird lamp | *you secretly love.*', mood: 'sparkle', look: [1, -1], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, t, LAMP, LAMP_C, 790, 870, 26, P.t0 + 0.2, { rot: 0.05 * Math.sin(t * 2) })
      label(x, 790, 1100, 'NAME: STEVE', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: '#6fd6ff', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'A cozy nook | *for big feelings.*', mood: 'heart', tears: 2, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, t, NOOK, NOOK_C, 790, 900, 24, P.t0 + 0.2)
      label(x, 790, 690, 'TISSUES + TEA', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1090, 'ALL FEELINGS WELCOME', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 26, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0434', key: 'E', accent: '#ffb38a', ending: 'lesson',
  title: 'How each sign | *makes a house a home.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve ways | to *feel at home.*' },
  lesson: { text: 'Home isn’t the house. | It’s *who’s in it.*', chip: 'STATUS: HOME' },
  last: {
    text: 'Come over. | *Kettle’s on.*',
    draw(x, t, lt) { drawBits(x, MUG, MUG_C, 540, 1590, 26 * pop01(t, t - lt + 0.5, 0.4, 2)) },
  },
})
export const DURATION = F.DURATION
// the hook is long: widen the title box so each ' | ' line stays on one line, then scale it down to the safe width
async function build(stage) {
  const sc = await F.SCENES[0](stage)
  const tb = sc.root.children[1].children[1]
  Object.assign(tb.style, { left: '-160px', width: '1400px', transformOrigin: '50% 0', transform: 'scale(0.76)' })
  return sc
}
export const SCENES = [build]
export const CUES = F.CUES
export const T = F.T
