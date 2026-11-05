// kfbe01: FIRST DATE BINGO E1, "Aries arrives 40 minutes early" (vertical, star_talk post, music: chiptune · E).
// No end card, no card transition: the story is the whole film; hard cut on the last line. Kit: ./bingokit.js.
//   0.0   frame 0: ♈ Aries mid-skid into an empty café, the chairs still upside down on the tables; the dauber is
//         mid-slam on ARRIVED WAY EARLY. Hook: "Aries got there *first.* | Way first."
//   0.5   record scratch + freeze: "THE DATE IS AT 8:00. IT'S 7:20." (the clock).
//   2.6   the clock spins to 7:58; ♎ Libra walks in at 3.4.
//   4.2   Aries talks at double speed (a bubble of words whizzing past) → TALKS AT 2× SPEED (5.2)
//   6.4   Aries's thought bubble: a calendar, "DATE 2??" → ALREADY PLANNING DATE 2 (7.4) → BINGO (7.65)
//   8.9   the host sobs "SO KEEN!!" · 9.6 Aries takes one big breath · 10.6 "hi. I'm so glad you came."
//   12.4  "Early is cute. | *Breathing* is cuter." · hard cut.
import {
  makeBingo, cafe, table, candle, star, bubble, label, shadow, glow, drawBits, hearts, sparkles, clockFace, box, R,
  prog, lerp, ease, clamp, outK, pop01, inK, win01, r3, INK, BONE, GOLD, PINK, RED, INTER, MONO,
} from './bingokit.js'

const D = 14.6
const T = { skid: [-0.35, 0.55], scratch: 0.5, thaw: 1.15, spin: [2.6, 3.2], libIn: [3.3, 4.0], fast: [4.2, 5.6], s2: 5.2, think: 6.4, s3: 7.4, bingo: 7.65,
  sob: 8.9, breath: [9.6, 10.4], hi: 10.6, last: 12.4 }

function clockTime(t) {
  if (t < T.spin[0]) return [7, 20 + Math.floor(Math.max(0, t) / 0.6)]
  if (t < T.spin[1]) { const m = lerp(24, 58, ease.inOutCubic(prog(t, ...T.spin))); return [7, m] }
  return [7, 58 + Math.min(2, Math.floor((t - T.spin[1]) / 3))]
}
function upsideChair(x, cx, y) {
  // a chair resting upside down on a table top
  R(x, INK, cx - 50, y - 96, 100, 14); R(x, '#a87452', cx - 46, y - 92, 92, 8)
  R(x, INK, cx - 46, y - 82, 12, 82); R(x, INK, cx + 34, y - 82, 12, 82)
  R(x, INK, cx - 50, y - 180, 100, 14); R(x, '#a87452', cx - 46, y - 176, 92, 8)
  R(x, INK, cx - 46, y - 176, 12, 84); R(x, INK, cx + 34, y - 176, 12, 84)
}

const EP = makeBingo({
  id: 'kfbe01', D, n: 3, ink: RED, cardTag: '♈ × ♎',
  squares: [
    { text: 'ARRIVED WAY EARLY', at: -0.04 }, { text: 'CHAIRS STILL ON THE TABLES' }, { text: 'TALKS AT 2× SPEED', at: T.s2 },
    { text: 'HIGH-FIVES THE SERVER' }, { free: true }, { text: 'ORDERS IN 3 SECONDS' },
    { text: 'RACES YOU TO THE DOOR' }, { text: 'STARTS A COMPETITION' }, { text: 'ALREADY PLANNING DATE 2', at: T.s3 },
  ],
  win: [0, 4, 8], bingoAt: T.bingo,
  heads: [
    { text: 'Early is cute. | *Breathing* is cuter.', at: T.last, accent: '#ff8fb1', late: 1, lateAt: T.last + 0.45, wobble: true },
  ],
  hook: { text: 'Aries got there *first.* | Way first.', out: [3.1, 3.35], accentColor: '#ff6a4a' },
  rec: { at: T.scratch, len: T.thaw - T.scratch + 0.5, caption: 'the date is at 8:00. *it’s 7:20.*', sub: 'yep. that’s Aries.', top: 1000 },
  scene(x, t, S) {
    cafe(x, t, { lights: t > T.thaw })
    // the clock on the wall
    const [h, m] = clockTime(t)
    clockFace(x, 200, 560, 62, h, m)
    // background tables with chairs still upside down (they come down as the café opens)
    const down = inK(t, 2.4, 0.4)
    for (const bx of [130, 950]) { table(x, bx, 1030, 220, { cloth: null }); if (down < 1) { x.save(); x.globalAlpha = 1 - down; upsideChair(x, bx, 1030 - 4); x.restore() } }
    // Libra walks in from the right
    const li = ease.outCubic(prog(t, ...T.libIn)), lx = lerp(1250, 790, li)
    const fastK = win01(t, T.fast[0], T.fast[1])
    // Aries: mid-skid at frame 0 (dust + speed lines), then seated, talking fast, thinking, breathing
    const sk = ease.outCubic(prog(t, ...T.skid)), ax = lerp(-80, 300, sk)
    const br = prog(t, ...T.breath), breathSq = br > 0 && br < 1 ? (br < 0.55 ? -0.16 * Math.sin(Math.PI * br / 0.55 / 2) : -0.16 * Math.cos(Math.PI * (br - 0.55) / 0.45 / 2)) : 0
    let am = 'wide', alook = [1, 0]
    if (t > T.thaw) { am = 'happy'; alook = undefined }
    if (t > T.spin[0] && t < T.libIn[1]) { am = 'sparkle'; alook = [1, 0] }
    if (fastK > 0.1) { am = 'happy' }
    if (t > T.think && t < T.bingo + 0.6) { am = 'sparkle'; alook = [0.6, -1] }
    if (t > T.breath[0] && t < T.breath[1]) { am = 'sleepy' }
    if (t > T.hi) { am = 'happy' }
    if (sk < 1) for (let i = 0; i < 6; i++) { const k = 1 - sk; R(x, 'rgba(255,214,160,0.85)', ax - 260 - i * 34, 790 + i * 34, 220 * k, 12) }
    if (sk < 1) for (let i = 0; i < 5; i++) { const ph = (t * 3 + i * 0.2) % 1; x.save(); x.globalAlpha = (1 - ph) * (1 - sk); R(x, '#cdb8a0', ax - 60 - ph * 120 - i * 18, 1120 - ph * 60 - i * 6, 22, 22); x.restore() }
    shadow(x, ax, 1150, 220)
    const hops = [T.thaw + 0.1, 3.5, ...Array.from({ length: 6 }, (_, i) => T.fast[0] + i * 0.22), T.hi, T.hi + 0.5, T.bingo]
    star(x, t, 'aries', { x: ax, y: 880, s: 250, mood: am, look: alook, hops, seed: 3, squash: (sk < 1 ? 0.18 * (1 - sk) : 0) + breathSq, rot: 0 })
    if (t > T.libIn[0]) {
      shadow(x, lx, 1150, 210)
      let lm = 'neutral', ll = [-1, 0]
      if (fastK > 0.1) { lm = 'wide' }
      if (t > T.hi + 0.4) { lm = 'heart'; ll = undefined }
      star(x, t, 'libra', { x: lx, y: 890, s: 230, mood: lm, look: ll, hops: [T.libIn[1] - 0.1, T.hi + 0.5], seed: 8 })
    }
    table(x, 540, 1010, 520)
    candle(x, t, 540, 1010, inK(t, 3.0, 0.3))
    // the double-speed words whizzing out of Aries
    if (fastK > 0.01) {
      const words = ['HI!', 'SO GLAD', 'I LOVE', 'THIS PLACE', 'DO YOU', 'LIKE PLACES', 'ME TOO', 'OK SO']
      words.forEach((w, i) => { const ph = ((t - T.fast[0]) * 1.8 + i / words.length) % 1; label(x, w, lerp(380, 760, ph), 700 - (i % 3) * 52, { size: 30, col: '#ffd6a0', alpha: fastK * Math.sin(Math.PI * ph), font: INTER, weight: 800 }) })
      label(x, '2×', 300, 640, { size: 64, col: '#ff6a4a', alpha: fastK, font: INTER, weight: 900, rot: -0.1 })
    }
    // the thought bubble: a calendar "DATE 2??"
    const tk = pop01(t, T.think, 0.3, 2.2) * outK(t, [T.bingo + 0.8, T.bingo + 1.05])
    if (tk > 0.01) {
      x.save(); x.translate(330, 600); x.scale(tk, tk)
      drawBits(x, ['..BBBBBBBB..', '.BBBBBBBBBB.', 'BBBBBBBBBBBB', 'BBBBBBBBBBBB', 'BBBBBBBBBBBB', '.BBBBBBBBBB.', '..BBBBBBBB..'], { B: BONE }, 0, 0, 20)
      box(x, -60, -52, 120, 96, '#fff', { b: 5 }); R(x, RED, -60, -52, 120, 24)
      x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('DATE 2??', 0, 8)
      R(x, INK, -10, 110, 22, 22); R(x, BONE, -6, 114, 14, 14); R(x, INK, -40, 150, 16, 16); R(x, BONE, -37, 153, 10, 10)
      x.restore()
    }
    // the big breath: a puff out after
    const pf = prog(t, T.breath[1] - 0.25, T.breath[1] + 0.5)
    if (pf > 0 && pf < 1) { x.save(); x.globalAlpha = 1 - pf; drawBits(x, ['.BB.', 'BBBB', '.BB.'], { B: '#d8e8ff' }, ax + 120 + pf * 90, 870 - pf * 30, 10 + pf * 8, { outline: null }); x.restore() }
    if (t > T.hi + 0.5) hearts(x, t, T.hi + 0.5, lx, 740, { n: 4 })
  },
  bubbles: [
    { t0: T.hi, t1: D + 1, x: 360, y: 660, text: "hi. I'm so glad you came.", size: 40, tail: -0.2 },
    { t0: T.sob, t1: 11.6, x: 830, y: 410, text: 'SO KEEN!!', size: 38, tail: 0.5, col: '#cfe8ff' },
  ],
  cues: [
    
    ['whoosh', T.spin[0], 0.5, 0.03], ...Array.from({ length: 8 }, (_, i) => ['tick', r3(T.spin[0] + i * 0.075), 0.03]),
    ['pop', T.libIn[1], 739.99, 0.035, 0.4],
    ...Array.from({ length: 12 }, (_, i) => ['pop', r3(T.fast[0] + i * 0.11), [880, 987.77, 1174.66][i % 3] * 1.5, 0.02, -0.3]),
    ['pluck', T.think, 1318.51, 0.03, 0.4, -0.2],
    ['riser', T.breath[0], T.breath[1] - 0.2, 0.02], ['whoosh', T.breath[1] - 0.1, 0.4, 0.025],
    ['pluck', r3(T.hi + 0.5), 1567.98, 0.035, 0.5, 0.3],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const STORY = T
void [glow, sparkles, GOLD, PINK, BONE, MONO, clamp]
