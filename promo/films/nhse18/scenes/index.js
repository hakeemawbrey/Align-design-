// nhse18: HOLIDAY SURVIVAL GUIDE No. 18, "Working the holiday" (28 s vertical, star_advice post, music: cinematic · Cm).
// The show look lives in ../../nhse13/scenes/survkit.js. Story 0–25.6, then the shared 2.4 s short end card.
//   0.0–5.4    hook "Working on the | *holiday.*" Frame 0: a split set. WORK: ♒ Aquarius at a night desk under a clock at
//              11:00, a NIGHT SHIFT sign, typing. HOME: ♓ Pisces at the table, crying over a plate under foil.
//              SITUATION: "one of you works the big day."
//   5.4–9.4    1 "Pick your *own* holiday date." A calendar: the big day gets a gentle X, a heart lands on the 28th.
//   9.4–13.4   2 "Keep one tiny ritual." Pisces tucks a note into the work bag; at 11 PM Aquarius finds it: "proud of
//              you ♡". Hearts.
//   13.4–17.4  3 "Save a plate, not a *guilt trip.*" Pisces' thought "you missed EVERYTHING" gets crossed
//              out; the plate gets a sticky note: "FOR YOU ♡ · 2 MIN".
//   17.4–25.6  THE STARS: "love doesn't check the *calendar.*" The 28th at home: both at the little table with the
//              saved plate, string lights on; Pisces happy-cries. endHead "The 28th. | *Our* holiday."
//              Last line: "The date is | just a *date.*"
import { makeSurvival, R, box, drawBits, label, bubble, star, pisces, sparkles, hearts, snow, room, table, mug, calendar, clockFace, windowPane, lerp, prog, ease, clamp, pop01, outK, INK, BONE, GOLD, RED, PINK, MINT, PAPER, INTER, MONO, SERIF, PANEL, HEART, drawPixelStar } from '../../nhse13/scenes/survkit.js'

const P = PANEL
const FLOOR = 1120
const AQU = 'aquarius'
const MID = 540

function plate(x, cx, cy, { foil = true, note = 0 } = {}) {
  x.fillStyle = INK; x.beginPath(); x.ellipse(cx, cy, 96, 30, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#f4f8ff'; x.beginPath(); x.ellipse(cx, cy - 2, 88, 24, 0, 0, Math.PI * 2); x.fill()
  if (foil) { x.fillStyle = INK; x.beginPath(); x.ellipse(cx, cy - 24, 76, 40, 0, Math.PI, 0); x.fill(); x.fillStyle = '#c8d0e0'; x.beginPath(); x.ellipse(cx, cy - 24, 70, 34, 0, Math.PI, 0); x.fill(); R(x, '#ffffff', cx - 40, cy - 46, 22, 6) }
  else { R(x, '#c98a4a', cx - 50, cy - 26, 40, 22); R(x, '#6fcf5a', cx - 4, cy - 22, 34, 18); R(x, '#e8a23a', cx + 34, cy - 24, 24, 20) }
  if (note > 0.01) {
    x.save(); x.translate(cx + 40, cy - 70); x.rotate(0.12); x.scale(note, note)
    box(x, -70, -44, 140, 88, '#fff6a8', { b: 4 })
    x.font = `800 22px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('FOR YOU', -8, -14); x.fillText('2 MIN', 0, 18)
    drawBits(x, HEART, { H: RED }, 52, -14, 3, { outline: null })
    x.restore()
  }
}
function work(x, t, { w0 = P.x, w1 = MID, typing = true } = {}) {
  R(x, '#1e2a40', w0, P.y, w1 - w0, P.h)
  for (let i = 0; i < 6; i++) R(x, 'rgba(255,255,255,0.04)', w0 + i * 84, P.y, 38, P.h)
  R(x, '#2e3a50', w0, FLOOR, w1 - w0, P.y + P.h - FLOOR)
  clockFace(x, (w0 + w1) / 2 + 40, 560, 62, 11, 0)
  box(x, w0 + 40, 520, 150, 60, '#14102a', { b: 5 }); label(x, 'NIGHT', w0 + 115, 538, { size: 20, col: '#9fe6b0', font: MONO, weight: 700, stroke: null }); label(x, 'SHIFT', w0 + 115, 562, { size: 20, col: '#9fe6b0', font: MONO, weight: 700, stroke: null })
  // the desk + monitor
  box(x, w0 + 30, 1000, w1 - w0 - 60, 30, '#5a5470', { b: 5 }); R(x, INK, w0 + 60, 1030, 18, 90); R(x, INK, w1 - 78, 1030, 18, 90)
  box(x, (w0 + w1) / 2 + 60, 860, 150, 110, '#14102a', { b: 6 }); R(x, INK, (w0 + w1) / 2 + 128, 976, 14, 26)
  for (let i = 0; i < 4; i++) R(x, '#38c4ec', (w0 + w1) / 2 + 76, 880 + i * 20, typing ? 40 + ((Math.floor(t * 6) + i * 3) % 7) * 12 : 80, 8)
}
function home(x, t, { w0 = MID, w1 = P.x + P.w, lights = 0 } = {}) {
  R(x, '#3a2a4a', w0, P.y, w1 - w0, P.h)
  for (let i = 0; i < 6; i++) R(x, 'rgba(255,214,160,0.05)', w0 + i * 84, P.y, 38, P.h)
  R(x, '#5a4060', w0, FLOOR, w1 - w0, P.y + P.h - FLOOR)
  windowPane(x, (w0 + w1) / 2, 600, 160, 150, t)
  if (lights > 0) for (let i = 0; i < Math.floor((w1 - w0) / 50); i++) { const on = Math.sin(t * 2.5 + i * 1.3) > -0.3; R(x, on ? [GOLD, PINK, '#7fd0ff'][i % 3] : '#5a5470', w0 + 20 + i * 50, P.y + 26 + 10 * Math.sin(i * 0.9), 12, 12) }
}
function divider(x) { R(x, INK, MID - 6, P.y, 12, P.h); R(x, GOLD, MID - 2, P.y, 4, P.h) }

function set(x, t, S) {
  if (!S.end) {
    work(x, t)
    home(x, t)
    divider(x)
    label(x, 'WORK', 300, 480, { size: 30, col: '#7fd0ff', font: MONO, weight: 700 })
    label(x, 'HOME', 780, 480, { size: 30, col: PINK, font: MONO, weight: 700 })
    star(x, t, AQU, { x: 250, y: 960, s: 190, mood: 'neutral', look: [1, 0], squash: 0.02 * Math.sin(t * 30) })
    table(x, 790, FLOOR + 20, 340, { cloth: '#7a3a5a' })
    plate(x, 760, 960)
    pisces(x, t, { x: 900, y: 900, s: 170, tears: 2, mood: 'wide', look: [-1, 1] })
    return
  }
  // the 28th at home, both of them
  const u = S.u
  home(x, t, { w0: P.x, w1: P.x + P.w, lights: 1 })
  table(x, 540, FLOOR + 20, 520, { cloth: '#7a3a5a' })
  plate(x, 540, 960, { foil: false })
  mug(x, 350, 975, '#38c4ec', 1, t); mug(x, 740, 975, '#e8344e', 1, t)
  star(x, t, AQU, { x: 300, y: 900, s: 200, mood: 'happy', look: [1, 0], hops: [17.8, 19.2, 21.5] })
  pisces(x, t, { x: 790, y: 900, s: 200, tears: 3, mood: 'happy', look: [-1, 0], hops: [17.9, 19.3, 21.55] })
  calendar(x, 540, 640, 0.55, { marks: [{ day: 28, kind: 'heart' }] })
  hearts(x, t, 18.5, 540, 820, { n: 5 })
  void u
}

// ── step 1: pick your own date
function step1(x, t, S) {
  const u = S.u
  home(x, t, { w0: P.x, w1: P.x + P.w })
  calendar(x, 540, 700, 1.25, { marks: [{ day: 25, kind: 'x', k: ease.outCubic(prog(u, 0.6, 0.9)) }, { day: 28, kind: 'heart', k: pop01(u, 1.4, 0.35, 2.4) }] })
  star(x, t, AQU, { x: 210, y: 1080, s: 170, mood: u > 1.5 ? 'happy' : 'neutral', look: [1, -1], hops: [S.t0 + 1.5] })
  pisces(x, t, { x: 700, y: 1080, s: 170, tears: u > 1.5 ? 2 : 1, mood: u > 1.5 ? 'happy' : 'wide', look: [-1, -1], hops: [S.t0 + 1.55] })
  if (u > 1.6) label(x, 'OUR DAY', 760, 520, { size: 32, col: GOLD, alpha: pop01(u, 1.6, 0.25, 2), rot: 0.08 })
  sparkles(x, t, 720, 800, S.t0 + 1.45, 8, 90, 1)
}

// ── step 2: one tiny ritual
function step2(x, t, S) {
  const u = S.u
  const second = u > 1.8
  if (!second) {
    home(x, t, { w0: P.x, w1: P.x + P.w })
    // the work bag + the note going in
    box(x, 520, 960, 220, 150, '#4a5a7a', { b: 6 }); R(x, INK, 590, 920, 80, 12); R(x, INK, 584, 920, 12, 46); R(x, INK, 664, 920, 12, 46)
    const np = ease.inOutCubic(prog(u, 0.5, 1.3))
    x.save(); x.translate(lerp(400, 630, np), lerp(820, 960, np)); x.rotate(lerp(-0.3, 0.1, np)); box(x, -44, -30, 88, 60, '#fff6a8', { b: 4 }); drawBits(x, HEART, { H: RED }, 0, 0, 4, { outline: null }); x.restore()
    pisces(x, t, { x: 300, y: 960, s: 200, tears: 1, mood: 'happy', look: [1, 0], hops: [S.t0 + 0.5, S.t0 + 1.3] })
    label(x, 'shh.', 300, 790, { size: 32, col: PINK, alpha: pop01(u, 0.5, 0.25, 2) })
  } else {
    work(x, t, { w0: P.x, w1: P.x + P.w, typing: false })
    star(x, t, AQU, { x: 300, y: 960, s: 210, mood: u > 2.3 ? 'heart' : 'wide', look: [1, -1], hops: [S.t0 + 2.3] })
    const k = pop01(u, 1.95, 0.35, 2)
    x.save(); x.translate(560, 720); x.rotate(-0.05); x.scale(k, k)
    box(x, -170, -100, 340, 200, '#fff6a8', { b: 6 })
    x.font = `italic 600 46px ${SERIF}`; x.fillStyle = '#2c2a7a'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('proud of you', 0, -22)
    drawBits(x, HEART, { H: RED }, 0, 44, 7, { outline: null })
    x.restore()
    hearts(x, t, S.t0 + 2.3, 300, 830, { n: 6 })
  }
}

// ── step 3: save a plate, not a guilt trip
function step3(x, t, S) {
  const u = S.u
  home(x, t, { w0: P.x, w1: P.x + P.w })
  table(x, 600, FLOOR + 20, 460, { cloth: '#7a3a5a' })
  plate(x, 600, 960, { note: pop01(u, 1.6, 0.35, 2.4) })
  pisces(x, t, { x: 250, y: 960, s: 200, tears: u > 1.6 ? 2 : 1, mood: u > 1.6 ? 'happy' : 'squint', look: [1, -1], hops: [S.t0 + 1.6] })
  // the thought that gets crossed out
  const k = pop01(u, 0.2, 0.3, 2) * outK(u, [2.6, 2.9])
  if (k > 0.01) {
    x.save(); x.translate(560, 620); x.scale(k, k)
    box(x, -250, -60, 500, 120, BONE, { b: 6 })
    x.font = `700 34px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('you missed EVERYTHING', 0, 2)
    const xp = prog(u, 0.9, 1.2)
    if (xp > 0) { x.strokeStyle = RED; x.lineWidth = 12; x.beginPath(); x.moveTo(-226, 0); x.lineTo(-226 + 452 * xp, 0); x.stroke() }
    x.restore()
  }
  sparkles(x, t, 640, 890, S.t0 + 1.6, 8, 100, 2)
}

const EP = makeSurvival({
  no: 18,
  accent: '#7fd0ff',
  hook: 'Working on the | *holiday.*',
  situation: 'one of you works the big day.',
  guide: 'How to survive: | *the holiday shift.*',
  endHead: 'The 28th. | *Our* holiday.',
  line: "love doesn't check the *calendar.*",
  last: 'The date is | just a *date.*',
  set,
  steps: [
    { text: 'Pick your *own* holiday date.', draw: step1, cues: [['tick', 0.6, 0.05], ['whoosh', 0.62, 0.2, 0.025], ['pop', 1.4, 1174.66, 0.045, 0.2], ['bell', 1.45, 1567.98, 0.025, 1.0, 0.2]] },
    { text: 'Keep one tiny ritual.', draw: step2, cues: [['whoosh', 0.5, 0.6, 0.025], ['tick', 1.3, 0.05], ['whoosh', 1.8, 0.3, 0.03], ['pop', 1.95, 880, 0.04, 0], ['pluck', 2.3, 1174.66, 0.04, 0.6, -0.2], ['pluck', 2.42, 1567.98, 0.035, 0.6, -0.2]] },
    { text: 'Save a plate, not a *guilt trip.*', draw: step3, cues: [['pop', 0.2, 659.25, 0.035, 0], ['tick', 0.9, 0.06], ['whoosh', 0.92, 0.3, 0.03], ['pop', 1.6, 1318.51, 0.045, 0.2], ['glitter', 1.6, 2.0]] },
  ],
  cues: [...Array.from({ length: 16 }, (_, i) => ['tick', +(0.2 + i * 0.3).toFixed(2), 0.012]), ['pluck', 2.0, 523.25, 0.025, 1.0, 0.4]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [snow, MINT, PAPER, clamp, drawPixelStar]
