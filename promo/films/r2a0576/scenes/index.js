// r2a0576: star_advice, ADVICE SOLO (gemini), "Signs a Gemini | *needs a break.*" (signs3kit social cut, music: lofi · D).
// Nine cards, each a relatable Gemini truth + a warm reframe, one visual gag each:
//   forty tabs open (close a few) · replying to everyone (you can mute) · two plans tonight (pick the cozy one)
//   · talking a mile a minute (breathe between) · hobby number twelve (nap first) · mind racing at 2 a.m. (it can wait)
//   · said yes to everything ("no" is allowed) · texting three matches at once (let one wait) · a quiet day in (still a story).
// Ending: group ("Both of you | deserve a nap." — the twins joke; the big Gemini dozes off).
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO, INTER } from '../../signs3kit.js'
import { L, sheet, phone, steam, confetti, zzz, bits, swapLabel, RED, CREAM, STEEL, WOOD, PLUM, NIGHT, clamp, lerp, ease, prog } from './props.js'

const S = 'gemini', ACC = '#ffd23a', ST = { x: -170 }

// a browser window with n tabs squeezed along the top
function browser(x, t, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-160, -120, 340, 270)
  x.fillStyle = INK; x.fillRect(-176, -136, 352, 272)
  x.fillStyle = PLUM; x.fillRect(-168, -128, 336, 56)
  const w = 320 / n
  for (let i = 0; i < n; i++) { x.fillStyle = [GOLD, PINK, MINT, SKYB, LAV][i % 5]; x.fillRect(-160 + i * w, -118, Math.max(2, w - 3), 40) }
  x.fillStyle = CREAM; x.fillRect(-168, -64, 336, 192)
  x.fillStyle = STEEL; for (let i = 0; i < 4; i++) x.fillRect(-140, -36 + i * 40, 200 + (i % 2) * 70, 16)
  x.restore()
}
// a pile of hobby gear
function gear(x, t, cx, cy, lt, P) {
  const ITEMS = [['BOOK', -110, 60, 16], ['LENS', 100, 40, 14], ['PEN', -20, -60, 14], ['PLANT', 120, -70, 14], ['COOKIE', -120, -70, 14], ['GLOVE', 10, 80, 13]]
  ITEMS.forEach(([n, dx, dy, c], i) => bits(x, n, cx + dx, cy + dy, c * pop01(t, P.t0 + 0.2 + i * 0.12, 0.25, 2.2), { rot: (i % 3 - 1) * 0.15 }))
}

const CAMEOS = [
  // 1 · forty tabs
  { sign: S, cap: 'Forty tabs open? | *Close a few.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = lt < 1.2 ? 40 : 3
      browser(x, t, 790, 860, 1.05 * pop01(t, P.t0 + 0.2, 0.3, 2), n)
      swapLabel(x, 790, 1110, lt, 1.2, 'TABS: 40', 'TABS: 3', { size: 34, fromBg: PINK, toBg: MINT })
      if (lt > 1.3) sparkles(x, t, 790, 860, P.t0 + 1.35, 7, 180, 0.3)
    } },
  // 2 · replying to everyone
  { sign: S, cap: 'Replying to everyone? | *You can mute.*', mood: lt => lt > 1.3 ? 'sleepy' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const muted = lt > 1.3
      const N = [['group chat (88)', PINK], ['mom', MINT], ['work', SKYB], ['who is this', GOLD]]
      phone(x, t, 790, 860, 1.05 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: muted ? 'MUTED' : '99+', headCol: muted ? LAV : RED, size: 20, lines: N.map(([s, c], i) => [s, c, muted ? 0 : pop01(t, P.t0 + 0.35 + i * 0.15, 0.2, 2), false]) })
      if (muted) zzz(x, t, 460, 680)
      L(x, 790, 1110, 'PEACE: RESTORED', pop01(t, P.t0 + 1.6, 0.3, 2.4), LAV, 0.04, 30)
    } },
  // 3 · two plans tonight
  { sign: S, cap: 'Two plans tonight? | Pick *the cozy one.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      sheet(x, 790, 760, k, { w: 340, h: 260, head: 'TONIGHT', headBg: GOLD, headInk: INK, font: MONO, weight: 700, size: 28, lines: ['8pm: party', '8pm: other party'] })
      const s = ease.inOutCubic(prog(lt, 0.9, 1.3))
      if (s > 0) { x.save(); x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.moveTo(650, 770); x.lineTo(650 + 280 * s, 770); x.moveTo(650, 808); x.lineTo(650 + 280 * s, 808); x.stroke(); x.restore() }
      bits(x, 'BLANKET', 790, 1040, 16 * pop01(t, P.t0 + 1.4, 0.3, 2))
      L(x, 790, 1150, 'NEW PLAN: BLANKET', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, 0.04, 28)
    } },
  // 4 · talking fast
  { sign: S, cap: 'Talking a mile a minute? | *Breathe between.*', mood: lt => lt > 1.4 ? 'sleepy' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const W = ['and then—', 'so anyway—', 'wait also—']
      const n = Math.min(2, Math.floor(Math.max(0, lt - 0.2) / 0.35))
      if (lt < 1.3) bubble(x, 790, 740, W[n], pop01(t, P.t0 + 0.2 + n * 0.35, 0.2, 2.2), { size: 46, tail: 'bl' })
      else bubble(x, 790, 740, 'inhale…', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 52, col: MINT, tail: 'bl' })
      L(x, 790, 960, `WORDS/MIN: ${lt < 1.3 ? 'YES' : 'CALM'}`, pop01(t, P.t0 + 0.5, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  // 5 · hobby twelve
  { sign: S, cap: 'Starting hobby twelve? | *Nap first.*', mood: lt => lt > 1.5 ? 'sleepy' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      gear(x, t, 790, 820, lt, P)
      L(x, 790, 1080, 'HOBBIES: 12', pop01(t, P.t0 + 0.9, 0.3, 2.4), LAV, -0.04, 34)
      bits(x, 'PILLOW', 450, 1080, 16 * pop01(t, P.t0 + 1.5, 0.3, 2))
      if (lt > 1.6) zzz(x, t, 460, 690)
    } },
  // 6 · mind racing at 2 a.m.
  { sign: S, cap: 'Mind racing at 2 a.m.? | *It can wait.*', mood: lt => lt > 1.4 ? 'sleepy' : 'wide', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MOON', 860, 620, 18 * pop01(t, P.t0 + 0.15, 0.3, 2))
      const TH = ['sharks?', 'new career?', 'that thing from 2014']
      TH.forEach((s, i) => { const k = pop01(t, P.t0 + 0.3 + i * 0.25, 0.25, 2.2) * (lt > 1.3 ? 1 - prog(lt, 1.3, 1.6) : 1); bubble(x, 760 + (i % 2) * 40, 760 + i * 110, s, k, { size: 32, col: [LAV, PINK, SKYB][i], tail: 'bl' }) })
      L(x, 790, 900, 'SAVED FOR TOMORROW', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 28)
    } },
  // 7 · said yes to everything
  { sign: S, cap: 'Said yes to everything? | “No” is *allowed.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 340, head: 'SATURDAY', headBg: RED, font: MONO, weight: 700, size: 24,
        lines: ['9 brunch', '10 move a couch', '11 brunch again', '12 a 5k?'], progress: prog(lt, 0.3, 1.0) })
      L(x, 790, 1090, 'NO. (NICELY)', pop01(t, P.t0 + 1.4, 0.3, 2.6), MINT, 0.05, 40)
    } },
  // 8 · Align: three matches at once
  { sign: S, cap: 'Three matches at once? | Let *one* wait.', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      phone(x, t, 790, 860, 1.05 * k, { head: '✦ MATCHES', headCol: GOLD, size: 22, lines: [['♉ hey!', MINT, pop01(t, P.t0 + 0.35, 0.2, 2), false], ['♐ hiii', SKYB, pop01(t, P.t0 + 0.5, 0.2, 2), false], ['♌ hello?', PINK, pop01(t, P.t0 + 0.65, 0.2, 2), false]], typing: lt > 0.9 ? 1 : 0 })
      L(x, 790, 1110, 'REPLY LATER: OK', pop01(t, P.t0 + 1.5, 0.3, 2.4), LAV, -0.04, 30)
    } },
  // 9 · a quiet day in
  { sign: S, cap: 'A quiet day in? | Still *a good story.*', mood: 'heart', look: [1, 0], star: { x: -170, y: -20 }, hops: [1.2],
    back(x, t, lt, P) { bits(x, 'SOFA', 400, 1060, 22 * pop01(t, P.t0 + 0.15, 0.3, 2)) },
    front(x, t, lt, P) {
      bits(x, 'BOOK', 790, 800, 18 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.08 })
      bits(x, 'MUG', 820, 1000, 15 * pop01(t, P.t0 + 0.5, 0.3, 2)); steam(x, t, 810, 940, { alpha: lt > 0.6 ? 0.6 : 0 })
      L(x, 790, 640, 'PLOT: A NAP', pop01(t, P.t0 + 1.1, 0.3, 2.4), GOLD, 0.04, 34)
      sparkles(x, t, 790, 800, P.t0 + 1.0, 6, 160, 0.2)
    } },
]

const F = makeFilm({
  id: 'r2a0576', key: 'D', accent: ACC, solo: S, ending: 'group',
  title: 'Signs a Gemini | *needs a break.*',
  cameos: CAMEOS,
  card: { a: 'gemini', b: 'taurus', chip: 'ALIGNED' },
  group: {
    cap: 'Both of you | *deserve a nap.*', mood: 'sleepy',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
