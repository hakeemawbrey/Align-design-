// r2t0316: star_talk, SOLO, "Your Capricorn | coworker *be like.*" (~45 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole film (makeFilm solo mode, 9 cards). Ending: callback.
//   0.0–3.6    "Your Capricorn | coworker *be like.*"
//   3.6–37.8   nine office moments, each pushed to the extreme:
//              in at 6 a.m., the office opens at 9 · a spreadsheet for the party (FUN: 2:00–2:15) · sick day, 40 emails
//              · small talk with an agenda · read the team's birth charts, for efficiency · a fifty-year plan
//              · vacation, brought the laptop to the beach · scheduled the birthday cake (3:00–3:07) · your compliment went on the résumé
//  37.8        "Boss energy. | *Since day one.*"
//  41.2        callback: "They stayed for cake. | *All seven minutes.*" — card 8's invite comes back, ACCEPTED, with the cake.
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

const S = 'capricorn'
const CAMEOS = [
  { sign: S, cap: 'In at 6 a.m. | The office *opens at 9.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      clock(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), 6, Math.min(4, lt * 2))
      label(x, 790, 1060, 'LIGHTS: STILL OFF', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: SLATE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Made a spreadsheet | for *the office party.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 762, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 360, h: 400, head: 'PARTY.XLS', headCol: '#7fd08a', size: 28, rows: [
        ['1:55 ARRIVE', INK, pop01(t, P.t0 + 0.5, 0.2, 2)],
        ['2:00 FUN', '#2f8a4a', pop01(t, P.t0 + 0.8, 0.2, 2)],
        ['2:15 FUN ENDS', RED, pop01(t, P.t0 + 1.1, 0.2, 2)],
        ['2:16 BACK TO IT', INK, pop01(t, P.t0 + 1.4, 0.2, 2)],
      ] })
    } },
  { sign: S, cap: 'Took a sick day. | *Answered 40 emails.*', mood: 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, LAPTOP, LAPTOP_C, 790, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = Math.min(40, Math.floor(Math.max(0, lt - 0.4) * 28))
      label(x, 790, 680, `REPLIED: ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 420, 640, '*cough* | per my last', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 32, tail: 'bc' })
    } },
  { sign: S, cap: 'Small talk? | They brought *an agenda.*', mood: 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      sheet(x, 762, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, h: 380, head: 'AGENDA', headCol: SAND, size: 30, rows: [
        ['1. weather', INK, pop01(t, P.t0 + 0.5, 0.2, 2)],
        ['2. weekend?', INK, pop01(t, P.t0 + 0.8, 0.2, 2)],
        ['3. nod', INK, pop01(t, P.t0 + 1.1, 0.2, 2)],
        ['4. adjourn', RED, pop01(t, P.t0 + 1.4, 0.2, 2)],
      ] })
      bubble(x, 420, 640, 'item one:', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: S, cap: 'Read the team’s birth charts. | *For efficiency.*', mood: lt => lt > 1.3 ? 'squint' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      chartWheel(x, t, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1070, 'GEMINI: NO DEADLINES', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Five-year plan? | Try *fifty years.*', mood: 'sparkle', look: [1, -1], star: { x: -170 }, hops: [1.5],
    front(x, t, lt, P) {
      sheet(x, 762, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, h: 400, head: 'THE PLAN', headCol: SLATE, size: 30, rows: [
        ['2027 promoted', INK, pop01(t, P.t0 + 0.4, 0.2, 2)],
        ['2040 the boss', INK, pop01(t, P.t0 + 0.7, 0.2, 2)],
        ['2060 statue', INK, pop01(t, P.t0 + 1.0, 0.2, 2)],
        ['2076 rest (1 day)', RED, pop01(t, P.t0 + 1.4, 0.2, 2)],
      ] })
    } },
  { sign: S, cap: 'On vacation. | *Brought the laptop.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    back(x, t, lt, P) {
      x.fillStyle = SAND; x.fillRect(110, 1080, 860, 140)
      drawBits(x, UMBRELLA, UMBRELLA_C, 800, 900, 24 * pop01(t, P.t0 + 0.15, 0.3, 2))
    },
    front(x, t, lt, P) {
      drawBits(x, LAPTOP, LAPTOP_C, 600, 1070, 15 * pop01(t, P.t0 + 0.9, 0.3, 2.2))
      label(x, 790, 640, 'OUT OF OFFICE (NOT)', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your birthday cake? | *Scheduled.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 762, 820, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 360, h: 300, head: 'INVITE', headCol: PINK, size: 34, rows: [
        ['CAKE', INK], ['3:00–3:07', RED, pop01(t, P.t0 + 0.7, 0.2, 2)], ['attendance: req.', '#6b62a8', pop01(t, P.t0 + 1.1, 0.2, 2)],
      ] })
      drawBits(x, CAKE, CAKE_C, 790, 1090, 10 * pop01(t, P.t0 + 1.4, 0.3, 2.2))
    } },
  { sign: S, cap: 'You said “nice shoes.” | It’s *on their résumé.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      sheet(x, 762, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 370, h: 400, head: 'RÉSUMÉ', headCol: SLATE, size: 26, rows: [
        ['EXPERIENCE ........', '#9a90b8'], ['SKILLS ............', '#9a90b8'],
        ['PRAISE:', INK, pop01(t, P.t0 + 0.8, 0.2, 2)],
        ['“nice shoes”', RED, pop01(t, P.t0 + 1.2, 0.2, 2)],
        ['  – a coworker', INK, pop01(t, P.t0 + 1.4, 0.2, 2)],
      ] })
      sparkles(x, t, 790, 900, P.t0 + 1.25, 6, 190, 0.5)
    } },
]

const F = makeFilm({
  id: 'r2t0316', key: 'C', accent: SLATE, solo: 'capricorn', ending: 'callback',
  title: 'Your Capricorn | coworker *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Boss energy. | *Since day one.*', mood: 'sparkle' },
  last: {
    text: 'They stayed for cake. | *All seven minutes.*',
    draw(x, t, lt) {
      const t0 = t - lt
      sheet(x, 540, 880, 1.0 * pop01(t, t0 + 0.6, 0.4, 2), { w: 400, h: 260, head: 'CAKE 3:00–3:07', headCol: PINK, size: 34, rows: [['✓ ACCEPTED', '#2f8a4a', pop01(t, t0 + 1.2, 0.25, 2.2)], ['stayed: 7:00', INK, pop01(t, t0 + 1.5, 0.25, 2.2)]] })
      drawBits(x, CAKE, CAKE_C, 540, 1210, 15 * pop01(t, t0 + 0.9, 0.35, 2))
      hearts(x, t, 540, 700, t0 + 1.4, { n: 6, life: 1.8, spread: 700, cell: 7, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
