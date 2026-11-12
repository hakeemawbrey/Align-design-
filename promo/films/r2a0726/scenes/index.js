// r2a0726: star_advice, ADVICE SOLO (gemini), "Gemini, celebrate | *the small wins.*" (signs3kit social cut, lofi · D).
// One sign the whole way: nine small Gemini wins, each a relatable truth with a warm reframe and one light gag.
// Ending: callback (the week-one plant made it to week two).
//   closed one tab (of forty) · finished one book of nine · texted back the same day · kept a plant alive a week
//   · drank some water · remembered a birthday on the day · skipped a plan to rest · found the keys first try
//   · checked the chart: proud of you
//   group "Small wins. | *Still wins.*" · last "The plant made it | to *week two.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, phone, bits, swapLabel, confetti, chart, B, C, RED, CREAM, STEEL, WOOD, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffd23a', S = 'gemini', ST = { x: -190 }
Object.assign(B, {
  PLANT: ['...G.G....', '..GGGGG...', '.GGLGGGG..', 'GGGGGLGG..', '.GLGGGG...', '...GG.....', '...GG.....', 'TTTTTTTT..', '.TTTTTT...', '.TTTTTT...', '..TTTT....'],
  PLANT2: ['..P...P...', '.PYP.PYP..', '..PG.GP...', '..GGGGG...', '.GGLGGGG..', 'GGGGGLGG..', '.GLGGGG...', '...GG.....', '...GG.....', 'TTTTTTTT..', '.TTTTTT...', '.TTTTTT...', '..TTTT....'],
  GLASS: ['K......K', 'KWWWWWWK', 'KBBBBBBK', 'KBWBBBBK', 'KBBBBBBK', 'KBBBBBBK', '.KBBBBK.', '.KKKKKK.'],
  CAKE: ['..Y..Y..Y..', '..W..W..W..', 'PPPPPPPPPPP', 'PCPCPCPCPCP', 'CCCCCCCCCCC', 'CCCPCCCPCCC', 'CCCCCCCCCCC', 'KKKKKKKKKKK'],
  KEYS: ['..YYY.......', '.Y...Y......', '.Y...YYYYYYY', '.Y...Y..Y.Y.', '..YYY.......', '...S........', '..SSS.......', '..S.SSSSSS..', '..SSS..S.S..'],
})
Object.assign(C, {
  PLANT: { G: '#4fbf6a', L: '#8fdc6a', T: '#c9703a' },
  PLANT2: { G: '#4fbf6a', L: '#8fdc6a', T: '#c9703a', P: PINK, Y: GOLD },
  GLASS: { K: INK, W: '#e6f4ff', B: SKYB },
  CAKE: { Y: GOLD, W: CREAM, P: PINK, C: '#fff4e2', K: WOOD },
  KEYS: { Y: GOLD, S: STEEL },
})
/** a browser window with n tabs across the top */
function tabs(x, cx, cy, k, n, closed) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-170, -110, 350, 250)
  x.fillStyle = INK; x.fillRect(-182, -126, 364, 252)
  x.fillStyle = '#2a2350'; x.fillRect(-174, -118, 348, 50)
  for (let i = 0; i < n; i++) { const off = closed && i === n - 1; x.fillStyle = off ? 'rgba(0,0,0,0)' : ['#ffd23a', '#8fe3ff', '#ff8fb1', '#7dffb0'][i % 4]; x.fillRect(-170 + i * 17.2, -110, 14, 34) }
  x.fillStyle = CREAM; x.fillRect(-174, -64, 348, 182)
  x.fillStyle = STEEL; for (let j = 0; j < 4; j++) x.fillRect(-140, -30 + j * 36, 200 + (j % 2) * 60, 16)
  x.restore()
}
/** a stack of books, the top one ticked */
function books(x, cx, cy, k, tick) {
  if (k <= 0.01) return
  const cols = ['#ff6b5a', '#8fe3ff', '#ffd23a', '#c97bff', '#7dffb0', '#ff8fb1', '#ffb34a', '#6fc3ff', '#b7a6ff']
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < 9; i++) { const w = 220 - (i % 3) * 20, y = 150 - i * 34; x.fillStyle = INK; x.fillRect(-w / 2 - 5 + (i % 2) * 10, y - 5, w + 10, 38); x.fillStyle = cols[i]; x.fillRect(-w / 2 + (i % 2) * 10, y, w, 28) }
  if (tick > 0.01) { x.save(); x.translate(150, -150); x.scale(tick, tick); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 46, 0, Math.PI * 2); x.fill(); x.fillStyle = MINT; x.beginPath(); x.arc(0, 0, 40, 0, Math.PI * 2); x.fill(); x.strokeStyle = INK; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); x.moveTo(-18, 0); x.lineTo(-4, 14); x.lineTo(20, -14); x.stroke(); x.restore() }
  x.restore()
}
/** a little month calendar page; one day circled or crossed */
function cal(x, cx, cy, k, { head = 'TODAY', mark = 'circle', p = 1, headBg = RED } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -130, 290, 280)
  x.fillStyle = INK; x.fillRect(-152, -146, 304, 292)
  x.fillStyle = CREAM; x.fillRect(-144, -138, 288, 276)
  x.fillStyle = headBg; x.fillRect(-144, -138, 288, 64)
  x.fillStyle = CREAM; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -105)
  x.fillStyle = STEEL; for (let j = 0; j < 3; j++) for (let i = 0; i < 5; i++) x.fillRect(-120 + i * 50, -50 + j * 60, 36, 36)
  x.strokeStyle = mark === 'cross' ? RED : '#2fc79a'; x.lineWidth = 9; x.lineCap = 'round'
  if (mark === 'circle') { x.beginPath(); x.arc(32, 28, 34, 0, Math.PI * 2 * clamp(p)); x.stroke() }
  else { const q = clamp(p); x.beginPath(); x.moveTo(-10, -4); x.lineTo(-10 + 60 * q, 56 * q - 4); x.stroke(); if (q > 0.5) { x.beginPath(); x.moveTo(50, -4); x.lineTo(50 - 60 * (q - 0.5) * 2, -4 + 60 * (q - 0.5) * 2); x.stroke() } }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Closed one tab? | *Progress.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      tabs(x, 800, 900, pop01(t, P.t0 + 0.2, 0.3, 2), 20, lt > 1.0)
      swapLabel(x, 800, 680, lt, 1.0, 'TABS OPEN: 40', 'TABS OPEN: 39', { size: 34, fromBg: STEEL, toBg: MINT })
      sparkles(x, t, 800, 900, P.t0 + 1.4, 7, 170, 0.2)
    } },
  { sign: S, cap: 'Finished one book? | Out of nine. *Still a win.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      books(x, 800, 900, pop01(t, P.t0 + 0.2, 0.3, 2), pop01(t, P.t0 + 1.1, 0.3, 2.4))
      L(x, 800, 1130, 'BOOK CLUB OF ONE', pop01(t, P.t0 + 1.6, 0.3, 2.2), LAV, -0.04, 30)
    } },
  { sign: S, cap: 'Texted back same day? | *Throw a parade.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.2, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 800, 880, 1.25 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'BESTIE', lines: [['dinner fri?', BONE, 1], ['yes!!', MINT, pop01(t, P.t0 + 0.8, 0.25, 2.2), true]], size: 26 })
      L(x, 800, 1160, 'SENT: SAME DAY', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 32)
      confetti(x, t, 800, 760, P.t0 + 1.3, { spread: 260 })
    } },
  { sign: S, cap: 'Kept a plant alive? | *A whole week!*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'PLANT', 820, 930, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 2) * 0.03 })
      L(x, 800, 680, 'WEEK 1: THRIVING', pop01(t, P.t0 + 0.9, 0.3, 2.2), MINT, -0.04, 34)
      hearts(x, t, 820, 820, P.t0 + 1.3, { n: 4, life: 1.6, spread: 140, cell: 6, seed: 4 })
    } },
  { sign: S, cap: 'Drank some water? | *Hydrated legend.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'GLASS', 800, 930, 32 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 700, 'GLASS #1 (OF THE DAY)', pop01(t, P.t0 + 0.8, 0.3, 2.2), SKYB, 0.04, 28)
      L(x, 800, 1150, 'LEGEND STATUS', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: S, cap: 'Remembered a birthday? | *On the actual day!*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'CAKE', 800, 1000, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 720, 'happy birthday!!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 800, 860, 'ON TIME. WOW.', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.05, 32)
    } },
  { sign: S, cap: 'Skipped one plan to rest? | *Also a win.*', mood: lt => lt > 1.4 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      cal(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'SATURDAY', mark: 'cross', p: clamp((lt - 0.6) / 0.6), headBg: LAV })
      L(x, 800, 1120, 'PLANS: 6 → 5', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, -0.04, 34)
    } },
  { sign: S, cap: 'Found your keys first try? | *Victory lap.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -190 }, hops: [1.1, 1.5, 1.9],
    front(x, t, lt, P) {
      bits(x, 'KEYS', 800, 940, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 4) * 0.1 })
      L(x, 800, 700, 'SEARCH TIME: 0 SEC', pop01(t, P.t0 + 0.7, 0.3, 2.2), CREAM, -0.04, 30)
      bubble(x, 800, 1120, 'first try!!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bc' })
      sparkles(x, t, 800, 940, P.t0 + 1.2, 7, 150, 0.3)
    } },
  { sign: S, cap: 'Checked your chart? | It says *proud of you.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 800, 880, 150, pop01(t, P.t0 + 0.2, 0.35, 2), t * 0.3)
      L(x, 800, 1100, 'TODAY: PROUD OF YOU', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 32)
      hearts(x, t, 800, 880, P.t0 + 1.3, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2a0726', key: 'D', accent: ACC, solo: S, ending: 'callback',
  title: 'Gemini, celebrate | *the small wins.*',
  cameos: CAMEOS,
  group: { cap: 'Small wins. | *Still wins.*', mood: 'sparkle' },
  last: {
    text: 'The plant made it | to *week two.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.4, 2)
      bits(x, lt > 1.4 ? 'PLANT2' : 'PLANT', 540, 1000, 34 * k)
      L(x, 540, 1300, 'WEEK 2: BLOOMING', pop01(t, t - lt + 1.5, 0.3, 2.4), MINT, -0.04, 40)
      sparkles(x, t, 540, 860, t - lt + 1.4, 8, 200, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
