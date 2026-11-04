// nhse21: HOLIDAY SURVIVAL GUIDE No. 21, "The day-after slump" (28 s vertical, star_advice post, music: dreamy · Db).
// The show look lives in ../../nhse13/scenes/survkit.js. Story 0–25.6, then the shared 2.4 s short end card.
//   0.0–5.4    hook "The holidays are over. | *Now what?*" Frame 0: ♐ Sag melted flat into the couch among drifts of
//              wrapping paper and empty boxes; the tree's lights blink, one by one, off. ♓ Pisces in a wrapping-paper
//              pile, crying at a bow. SITUATION: "the quiet after the big days."
//   5.4–9.4    1 "Let it be quiet for a *day.*" Sag under a blanket with cocoa; a permission slip: REST DAY ✓.
//   9.4–13.4   2 "Get outside for ten minutes." A snowy walk; a 10-minute timer ticks; frosty breath puffs; Sag perks up.
//   13.4–17.4  3 "Plan one small, *nice* thing." A sticky note lands on the calendar: "SAT · pancakes with
//              Leo". The phone buzzes back: ♌ "YES!!" Sag sparkles.
//   17.4–25.6  THE STARS: "the glow fades. the *people* don't." Saturday: Sag and ♌ Leo at a table with a tall
//              pancake stack; Pisces happy-cries. endHead "Saturday. | *Pancakes.*"  Last line: "Plan one | *small* thing."
import { makeSurvival, R, box, drawBits, label, bubble, star, pisces, sparkles, hearts, snow, room, sofa, table, mug, calendar, windowPane, lerp, prog, ease, clamp, pop01, outK, INK, BONE, GOLD, RED, PINK, MINT, PAPER, INTER, MONO, SERIF, PANEL, HEART, drawPixelStar } from '../../nhse13/scenes/survkit.js'

const P = PANEL
const FLOOR = 1120
const SAG = 'sagittarius', LEO = 'leo'

function paperPile(x, cx, base, seed = 1, n = 9) {
  const cols = ['#c8283c', '#2f9a5a', GOLD, '#3a5aa8', '#e163d6']
  for (let i = 0; i < n; i++) {
    const a = Math.sin(i * 7.1 + seed) * 0.5, w = 60 + ((i * 37 + seed * 13) % 50)
    x.save(); x.translate(cx - 120 + ((i * 53 + seed * 29) % 240), base - 10 - ((i * 17) % 40)); x.rotate(a)
    box(x, -w / 2, -18, w, 36, cols[(i + seed) % 5], { b: 4 }); R(x, 'rgba(255,255,255,0.35)', -w / 2 + 6, -12, w * 0.3, 6)
    x.restore()
  }
}
function lounge(x, t, { lightsOff = 0 } = {}) {
  room(x, { wall: '#2e2a4e', floor: '#4a3e5e', floorY: FLOOR })
  windowPane(x, 300, 620, 200, 170, t, { snowing: true })
  // the little tree, lights going out one by one
  const cx = 870
  x.fillStyle = INK; x.beginPath(); x.moveTo(cx - 110, 1060); x.lineTo(cx, 720); x.lineTo(cx + 110, 1060); x.fill()
  x.fillStyle = '#2f9a5a'; x.beginPath(); x.moveTo(cx - 100, 1052); x.lineTo(cx, 736); x.lineTo(cx + 100, 1052); x.fill()
  R(x, '#7a4a2a', cx - 14, 1052, 28, 60)
  for (let i = 0; i < 9; i++) { const on = i / 9 >= lightsOff; R(x, on ? [GOLD, RED, '#7fd0ff'][i % 3] : '#4a4466', cx - 70 + ((i * 47) % 140) * (1 - (i % 4) * 0.12), 780 + i * 30, 12, 12) }
}

function set(x, t, S) {
  if (!S.end) {
    lounge(x, t, { lightsOff: clamp(prog(t, 0.5, 4.5)) })
    sofa(x, 470, FLOOR + 10, 440, '#7a5aa8')
    // Sag, melted flat
    star(x, t, SAG, { x: 470, y: 990, s: 230, mood: 'sleepy', look: [0, 1], squash: 0.32 + 0.03 * Math.sin(t * 1.5), zzz: false })
    paperPile(x, 470, FLOOR + 30, 1, 10)
    // empty boxes
    box(x, 150, 1040, 110, 80, '#c8a070', { b: 5 }); box(x, 180, 990, 80, 50, '#c8a070', { b: 5 })
    pisces(x, t, { x: 700, y: 1080, s: 120, tears: 2, mood: 'wide', look: [-1, -1] })
    paperPile(x, 720, FLOOR + 60, 3, 5)
    if (t > 2.2) label(x, 'sigh.', 560, 800, { size: 36, col: BONE, alpha: pop01(t, 2.2, 0.3, 2) * outK(t, [5.0, 5.3]), rot: 0.06 })
    return
  }
  // Saturday: pancakes with Leo
  room(x, { wall: '#4a3a2a', wall2: 'rgba(255,220,160,0.05)', floor: '#6a4a3a', floorY: FLOOR })
  windowPane(x, 540, 620, 220, 180, t, { night: false, snowing: false })
  const top = table(x, 540, FLOOR + 20, 560, { cloth: '#2f8f86' })
  // the pancake stack
  for (let i = 0; i < 7; i++) box(x, 470 + Math.sin(i * 2) * 6, top - 22 - i * 22, 140, 18, '#e8b060', { b: 4 })
  R(x, '#fff1a8', 520, top - 22 - 7 * 22 - 4, 40, 14)
  star(x, t, SAG, { x: 290, y: top - 110, s: 200, mood: 'happy', look: [1, 0], hops: [17.8, 19.0, 21.5] })
  star(x, t, LEO, { x: 790, y: top - 110, s: 200, mood: 'sparkle', look: [-1, 0], hops: [17.9, 19.1, 21.55] })
  pisces(x, t, { x: 900, y: 600, s: 120, tears: 3, mood: 'happy', look: [-1, 1] })
  mug(x, 380, top - 6, '#e8344e', 1, t); mug(x, 700, top - 6, '#38c4ec', 1, t)
  hearts(x, t, 18.6, 540, top - 180, { n: 5, col: GOLD })
}

// ── step 1: let it be quiet for a day
function step1(x, t, S) {
  const u = S.u
  lounge(x, t, { lightsOff: 1 })
  sofa(x, 470, FLOOR + 10, 440, '#7a5aa8')
  star(x, t, SAG, { x: 470, y: 980, s: 230, mood: 'happy', look: [1, 0], squash: 0.08 })
  // the blanket
  box(x, 320, 1000, 300, 110, '#c8604a', { b: 6 }); for (let i = 0; i < 6; i++) R(x, '#f2c27a', 330 + i * 48, 1010, 22, 90)
  mug(x, 620, 990, '#e8344e', 1, t)
  // the permission slip
  const k = pop01(u, 0.4, 0.35, 2)
  x.save(); x.translate(780, 640); x.rotate(0.06); x.scale(k, k)
  box(x, -160, -100, 320, 200, PAPER, { b: 6 })
  x.font = `700 22px ${MONO}`; x.fillStyle = '#2f8f86'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('PERMISSION SLIP', 0, -66)
  x.font = `800 40px ${INTER}`; x.fillStyle = INK; x.fillText('REST DAY', -20, 0)
  const ck = prog(u, 1.4, 1.7)
  box(x, 96, -22, 44, 44, '#ffffff', { b: 4 })
  if (ck > 0) { x.strokeStyle = RED; x.lineWidth = 9; x.beginPath(); x.moveTo(102, 0); x.lineTo(102 + 12 * Math.min(1, ck * 2), 0 + 14 * Math.min(1, ck * 2)); if (ck > 0.5) x.lineTo(114 + 24 * (ck - 0.5) * 2, 14 - 38 * (ck - 0.5) * 2); x.stroke() }
  x.font = `italic 600 26px ${SERIF}`; x.fillStyle = '#2c2a7a'; x.fillText('signed, the stars', 0, 64)
  x.restore()
}

// ── step 2: ten minutes outside
function step2(x, t, S) {
  const u = S.u
  R(x, '#2a3460', P.x, P.y, P.w, P.h)
  for (let i = 0; i < 4; i++) { x.fillStyle = '#1e2850'; x.beginPath(); x.moveTo(P.x + i * 260, 980); x.lineTo(P.x + 130 + i * 260, 760 - (i % 2) * 60); x.lineTo(P.x + 260 + i * 260, 980); x.fill() }
  R(x, '#dfe8f6', P.x, 980, P.w, P.y + P.h - 980); R(x, '#ffffff', P.x, 980, P.w, 8)
  snow(x, t, { X: P.x, Y: P.y, w: P.w, h: P.h, n: 40, speed: 50, seed: 21 })
  const walk = (u * 90) % 1
  // footprints behind
  for (let i = 0; i < 8; i++) R(x, '#b8c4dc', 200 + i * 50, 1060 + (i % 2) * 14, 20, 10)
  star(x, t, SAG, { x: 640, y: 960, s: 220, mood: u < 1.4 ? 'neutral' : 'happy', look: [1, -1], hops: [S.t0 + 0.4, S.t0 + 1.0, S.t0 + 1.6, S.t0 + 2.2, S.t0 + 2.8] })
  // frosty breath puffs
  for (let i = 0; i < 3; i++) { const p = ((u * 0.9 + i / 3) % 1); x.save(); x.globalAlpha = 0.7 * Math.sin(Math.PI * p); R(x, '#ffffff', 760 + p * 90, 880 - p * 40 + i * 6, 22 - p * 8, 18 - p * 6); x.restore() }
  // the timer
  const left = Math.max(0, 10 - Math.floor(u * 3))
  box(x, 150, 520, 230, 90, '#14102a', { b: 6 })
  x.font = `700 46px ${MONO}`; x.fillStyle = '#9fe6b0'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`${String(left).padStart(2, '0')}:00`, 265, 568)
  label(x, 'MIN OUTSIDE', 265, 640, { size: 22, col: MINT, font: MONO, weight: 700 })
  void walk
}

// ── step 3: plan one small, nice thing
function step3(x, t, S) {
  const u = S.u
  lounge(x, t, { lightsOff: 1 })
  calendar(x, 540, 700, 1.15, { title: 'JANUARY', first: 5 })
  const nk = pop01(u, 0.4, 0.35, 2.2)
  x.save(); x.translate(640, 760); x.rotate(-0.08); x.scale(nk, nk)
  box(x, -130, -80, 260, 160, '#fff6a8', { b: 5 })
  x.font = `800 30px ${INTER}`; x.fillStyle = RED; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SAT', 0, -42)
  x.font = `italic 600 34px ${SERIF}`; x.fillStyle = '#2c2a7a'; x.fillText('pancakes', 0, 2); x.fillText('with Leo', 0, 42)
  x.restore()
  star(x, t, SAG, { x: 230, y: 1030, s: 210, mood: u > 1.8 ? 'sparkle' : 'happy', look: [1, -1], hops: [S.t0 + 0.4, S.t0 + 1.9] })
  // the phone buzz: Leo says YES
  if (u > 1.6) bubble(x, t, 820, 1000, S.t0 + 1.6, S.t1, '♌︎ YES!! I’m in', { size: 32, col: '#ffd8b0', tail: 0 })
  sparkles(x, t, 230, 940, S.t0 + 1.9, 8, 120, 1)
}

const EP = makeSurvival({
  no: 21,
  accent: '#c9a6ff',
  hook: 'The holidays are over. | *Now what?*',
  hookSize: 86,
  situation: 'the quiet after the big days.',
  guide: 'How to survive: | *the slump.*',
  endHead: 'Saturday. | *Pancakes.*',
  line: "the glow fades. the *people* don't.",
  last: 'Plan one | *small* thing.',
  set,
  steps: [
    { text: 'Let it be quiet for a *day.*', draw: step1, cues: [['pop', 0.4, 783.99, 0.035, 0.3], ['tick', 1.4, 0.06], ['pop', 1.6, 1174.66, 0.035, 0.3]] },
    { text: 'Get outside for ten minutes.', draw: step2, cues: [...Array.from({ length: 6 }, (_, i) => ['tick', +(0.4 + i * 0.6).toFixed(2), 0.025]), ['pluck', 1.4, 987.77, 0.03, 0.6, 0.2]] },
    { text: 'Plan one small, *nice* thing.', draw: step3, cues: [['whoosh', 0.35, 0.3, 0.03], ['pop', 0.45, 880, 0.04, 0.2], ['tick', 1.55, 0.03], ['tick', 1.62, 0.03], ['pop', 1.65, 1318.51, 0.04, 0.3], ['glitter', 1.9, 2.3]] },
  ],
  cues: [...Array.from({ length: 9 }, (_, i) => ['tick', +(0.5 + i * 0.44).toFixed(2), 0.012]), ['pluck', 2.2, 440, 0.03, 1.0, 0.2]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, HEART, drawPixelStar]
