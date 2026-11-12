// r2a0639: star_advice, ADVICE SOLO (aquarius), "Aquarius, a sign | *to slow down.*" (signs3kit social cut, music:
// lofi · E). Nine gentle truths for an Aquarius whose brain never stops, each with a warm reframe and one light gag.
// Ending: lesson.
//   forty tabs, close one · three side projects, pick a favourite · a 3 a.m. idea, write it down and sleep · ten steps
//   ahead, smell this flower · lunch at the keyboard, lunch at a table · planned a date on Mars, try the park · a walk
//   with no goal is allowed · a new project? "maybe later" works · lie in the grass, watch a cloud (it's a duck)
//   group "Big ideas. | *Slow mornings.*"  lesson "You don’t have to | invent it *all today.*"  PACE: GENTLE
//   last "Laptop: closed. | *Cloud: spotted.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, zzz, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#6fc3ff', S = 'aquarius', ST = { x: -190 }
const cross = (x, cx, cy, r, k) => { if (k <= 0.01) return; x.save(); x.strokeStyle = RED; x.lineWidth = 14; x.lineCap = 'round'; x.globalAlpha = clamp(k); x.beginPath(); x.moveTo(cx - r, cy - r); x.lineTo(cx + r, cy + r); x.moveTo(cx + r, cy - r); x.lineTo(cx - r, cy + r); x.stroke(); x.restore() }

const CAMEOS = [
  { sign: S, cap: 'Forty tabs open? | *Close one.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'LAPTOP', 800, 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 690, lt < 1.4 ? 'TABS: 40' : 'TABS: 39', pop01(t, P.t0 + 0.4, 0.3, 2), lt < 1.4 ? RED : MINT, -0.04, 44)
      if (lt > 1.4) sparkles(x, t, 800, 690, P.t0 + 1.4, 6, 140, 0.3)
    } },
  { sign: S, cap: 'Three side projects? | *Pick a favourite.*', mood: lt => lt > 1.5 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      ;['AN APP', 'A BAND', 'BEES'].forEach((p, i) => {
        const k = pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2), pick = lt > 1.5 && i === 2
        x.save(); x.globalAlpha = lt > 1.5 && !pick ? 0.4 : 1
        L(x, 800, 680 + i * 180, p, k * (pick ? 1.15 : 1), pick ? GOLD : BONE, (i - 1) * 0.04, 42)
        x.restore()
      })
      if (lt > 1.5) hearts(x, t, 800, 960, P.t0 + 1.55, { n: 4, life: 1.4, spread: 120, cell: 6, seed: 3 })
    } },
  { sign: S, cap: 'Big idea at 3 a.m.? | *Write it down. Sleep.*', mood: lt => lt > 1.4 ? 'sleepy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MOON', 860, 610, 11 * pop01(t, P.t0 + 0.2, 0.3, 2))
      sheet(x, 790, 860, pop01(t, P.t0 + 0.4, 0.3, 2), { w: 360, h: 270, head: 'IDEA #212', headBg: SKYB, headInk: INK, lines: ['socks', 'for birds'], size: 40 })
      if (lt > 1.4) L(x, 790, 1100, 'SAVED. GOODNIGHT.', pop01(t, P.t0 + 1.4, 0.3, 2.2), LAV, 0.04, 32)
    } },
  { sign: S, cap: 'Ten steps ahead? | *Smell this flower.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      L(x, 800, 640, lt < 1.3 ? 'STEP 10: ???' : 'STEP 1: HERE', pop01(t, P.t0 + 0.2, 0.3, 2), lt < 1.3 ? STEEL : MINT, -0.04, 38)
      bits(x, 'FLOWER', 800, 920, 20 * pop01(t, P.t0 + 0.8, 0.3, 2), { rot: 0.06 * Math.sin(t * 2) })
      if (lt > 1.3) hearts(x, t, 800, 800, P.t0 + 1.35, { n: 4, life: 1.6, spread: 140, cell: 6, seed: 5 })
    } },
  { sign: S, cap: 'Lunch at the keyboard? | *Lunch at a table.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'LAPTOP', 800, 760, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { alpha: lt > 1.3 ? 0.4 : 1 })
      cross(x, 800, 760, 90, (lt - 1.1) * 4)
      bits(x, 'SANDWICH', 800, 1020, 18 * pop01(t, P.t0 + 1.3, 0.3, 2))
      if (lt > 1.6) L(x, 800, 1150, 'CRUMBS IN KEYBOARD: 0', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: S, cap: 'Planned a date on Mars? | *Try the park.*', mood: lt => lt > 1.5 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.5, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 790, 840, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ MATCH: GEMINI', headCol: GOLD, size: 30,
        lines: [['date: mars?', SKYB, pop01(t, P.t0 + 0.4, 0.25, 2), true], ['uh, park?', BONE, pop01(t, P.t0 + 1.0, 0.25, 2), false], ['park! 3pm :)', MINT, pop01(t, P.t0 + 1.5, 0.25, 2), true]] })
    } },
  { sign: S, cap: 'A walk with no goal? | *Totally allowed.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST, hops: [1.4, 1.9],
    front(x, t, lt, P) {
      bits(x, 'MAP', 800, 820, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { alpha: lt > 1.2 ? 0.45 : 1 })
      cross(x, 800, 820, 100, (lt - 1.0) * 4)
      L(x, 800, 1080, 'ROUTE: WHEREVER', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, 0.04, 34)
    } },
  { sign: S, cap: 'New project offer? | *“Maybe later” works.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 760, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 360, h: 250, head: 'NEW PROJECT?', headBg: RED, lines: ['start: now', 'sleep: never'], size: 34 })
      bubble(x, 800, 1040, 'maybe later!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 48, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Lie in the grass. | *Watch a cloud.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -190, y: 40 },
    keyCue: t0 => ['pluck', t0 + 1.3, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { x.fillStyle = '#4fbf6a'; x.fillRect(120, 1080, 840, 140); x.fillStyle = '#2f8a48'; for (let i = 0; i < 28; i++) x.fillRect(130 + i * 30, 1064 + (i % 3) * 6, 10, 22) },
    front(x, t, lt, P) {
      bits(x, 'CLOUD', 760 + 20 * Math.sin(t * 0.8), 700, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 900, 'CLOUD SHAPE: DUCK', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, 0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0639', key: 'E', accent: ACC, solo: S, ending: 'lesson',
  title: 'Aquarius, a sign | *to slow down.*',
  cameos: CAMEOS,
  group: { cap: 'Big ideas. | *Slow mornings.*', mood: 'sleepy' },
  lesson: { text: 'You don’t have to | invent it *all today.*', chip: 'PACE: GENTLE' },
  last: {
    text: 'Laptop: closed. | *Cloud: spotted.*',
    draw(x, t, lt) { bits(x, 'CLOUD', 540 + 30 * Math.sin(t * 0.7), 1180, 26 * pop01(t, t - lt + 0.6, 0.4, 2)) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
