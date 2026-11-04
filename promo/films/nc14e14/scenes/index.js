// nc14e14: CUFFING SEASON, "The double date" (40 s vertical, promo/films/next30/b02.md, music: funk · E)
// Story 0–35.6, then the shared end card. The season look lives in ../../nc14e13/cuffkit.js.
//   0.0–7.2    "The double date. | *One* couple's been at this a while."  Frame 0: an outdoor ice rink at night; ♌ Leo
//              mid-spin with ♎ Libra, ♐ Sag and ♒ Aquarius wobbling on the right. LEO: "and then we got cocoa—"
//              LIBRA: "—with the *little marshmallows.*"  Sag + Aquarius bump: "sorry!" "sorry!" "SORRY!"
//   7.2–14.4   "Date *two.*"  SAG: "are we… *behind?*"  Leo + Libra pull out matching mugs. AQUARIUS: "they have
//              *matching mugs.*"  (the ghost peeks over the rink boards, 12.0)
//  14.4        card cut.
//  14.5–21.8   "Date two vs | date *two hundred.*"  THE STARS glide in. "they're on date *two hundred.*" → "you're on date
//              *two.* that's the fun part."  LIBRA: "our date two? Leo fell in a *fountain.*"  LEO: "it was ICONIC."
//  22.0        ★ LESSON UNLOCKED "Don't skate on | *someone else's* timeline."  chip "+1 wobble, fully allowed"
//  27.0–35.1   Sag + Aquarius hold hands to stay up, laughing; Leo + Libra cheer. Last line: "Date two is | *allowed* to be
//              date two."  Pisces cries over the boards all film.
import { makeEp, star, bubble, hearts, sparkles, shadow, mug, label, R, box, glow, lights,
  pop01, outK, prog, lerp, clamp, ease, talkHops, SNOW, ICE, PINK, GOLD, RED, MINT, INK, BONE, r3 } from '../../nc14e13/cuffkit.js'

const SP = 'THE STARS', LEO = '♌︎ LEO', LIB = '♎︎ LIBRA', SAG = '♐︎ SAGITTARIUS', AQ = '♒︎ AQUARIUS'
const LC = '#ffc27a', BC = '#f4a6ee', SC = '#d0a8ff', AC = '#8fe6ff'
const L1 = [
  { t: 1.0, speaker: LEO, color: LC, text: 'and then we got cocoa—' },
  { t: 2.7, speaker: LIB, color: BC, text: '—with the *little marshmallows.*' },
]
const L2 = [
  { t: 7.6, speaker: SAG, color: SC, text: 'are we… *behind?*' },
  { t: 10.6, speaker: AQ, color: AC, text: 'they have *matching mugs.*' },
]
const L3 = [
  { t: 14.8, speaker: SP, text: "they're on date *two hundred.*" },
  { t: 16.9, speaker: SP, text: "you're on date *two.* that's the fun part." },
  { t: 19.3, speaker: LIB, color: BC, text: 'our date two? Leo fell in a *fountain.*' },
]
const T = { b1: 7.2, mugs: 10.3, cut: 14.4, b3: 14.5, lesson: 22.0, lessonOut: [26.6, 26.8], fin: 27.0, hold: 28.0 }
const BUMPS = [4.6, 5.3, 6.0]
const SAG_HOPS = [...BUMPS, ...talkHops(L2, SAG, { cps: 30 }), T.hold, 29.6, 31.4]
const AQ_HOPS = [...BUMPS.map(b => b + 0.05), ...talkHops(L2, AQ, { cps: 30 }), T.hold + 0.05, 30.2, 32.0]
const LEO_HOPS = [0.3, ...talkHops(L1, LEO, { cps: 30 }), T.mugs, 21.0, 21.4, 27.3, 29.0]
const LIB_HOPS = [0.35, ...talkHops(L1, LIB, { cps: 30 }), T.mugs + 0.05, ...talkHops(L3, LIB, { cps: 30 }), 27.35, 29.05]

function rink(x, t) {
  // the boards behind, the ice in front
  R(x, INK, 0, 1000, 1080, 140)
  R(x, SNOW, 0, 1008, 1080, 118); R(x, '#4f7cd8', 0, 1060, 1080, 16); R(x, '#c6d6f2', 0, 1110, 1080, 16)
  for (let i = 0; i < 1080; i += 180) R(x, INK, i, 1000, 6, 140)
  const g = x.createLinearGradient(0, 1140, 0, 1920); g.addColorStop(0, '#d8eefb'); g.addColorStop(1, '#8fb0dc')
  x.fillStyle = g; x.fillRect(0, 1140, 1080, 780)
  x.save(); x.globalAlpha = 0.4; x.strokeStyle = '#ffffff'; x.lineWidth = 3
  for (let i = 0; i < 7; i++) { x.beginPath(); x.ellipse(540 + (i - 3) * 90, 1320 + i * 20, 260 + i * 30, 40 + i * 6, 0.05 * i, 0.2, 2.4); x.stroke() }
  x.restore()
  lights(x, t, -20, 560, 1100, 560, { n: 14, sag: 80 })
}
// skating blades under a star
function blades(x, F, s) { if (!F) return; R(x, INK, F.ox - s * 0.26, F.oy + 4, s * 0.18, 8); R(x, INK, F.ox + s * 0.08, F.oy + 4, s * 0.18, 8); R(x, '#d8e4f2', F.ox - s * 0.26, F.oy + 4, s * 0.18, 4); R(x, '#d8e4f2', F.ox + s * 0.08, F.oy + 4, s * 0.18, 4) }

function scene(x, t, K) {
  const ok = K.ok
  rink(x, t)
  // Pisces over the boards (left), cocoa in fin, crying the whole time
  star(x, t, 'pisces', { x: 120, y: 975, s: 160, mood: t > T.hold ? 'heart' : t > T.b3 ? 'sparkle' : 'wide', look: [1, 0.3], tears: t > T.lesson ? 3 : 2, hat: '#7c74f0', pop: ok, seed: 6 })
  R(x, INK, 0, 1030, 240, 12)
  // the steady pair: a figure-eight glide in perfect sync
  const g = t * 1.1, sync = t < T.fin ? 1 : 1 - ease.inOutCubic(prog(t, T.fin, T.fin + 0.8)) * 0.5
  const hold0 = ease.inOutCubic(prog(t, T.hold - 0.4, T.hold))
  const lx = lerp(330 + 100 * Math.sin(g) * sync, 210, hold0), ly = 1150 + 26 * Math.sin(2 * g) * sync
  const leoMood = t > 19.3 && t < 21.8 ? 'wide' : t > T.fin ? 'happy' : 'sparkle'
  const libMood = t > T.fin ? 'happy' : 'heart'
  let F = star(x, t, 'leo', { x: lx - 85, y: ly, s: 230, mood: leoMood, look: [1, 0], hops: LEO_HOPS, scarf: GOLD, pop: ok, seed: 5 })
  blades(x, F, 230)
  F = star(x, t, 'libra', { x: lx + 85, y: ly, s: 230, mood: libMood, look: [-1, 0], hops: LIB_HOPS, hat: PINK, pop: ok, seed: 8 })
  blades(x, F, 230)
  // the matching mugs
  const mk = pop01(t, T.mugs, 0.3, 2.4) * outK(t, [T.b3 - 0.3, T.b3])
  if (mk > 0.01) { mug(x, t, lx - 200, ly - 10, 0.9 * mk, RED); mug(x, t, lx + 210, ly - 10, 0.9 * mk, RED) }
  sparkles(x, t, lx, ly - 170, T.mugs, 8, 150, 1, [GOLD, BONE, PINK])
  // date two: Sag + Aquarius wobbling on the right (front)
  const wob = t < T.hold ? 1 : 0.35
  const bump = BUMPS.reduce((a, b) => a + (t > b && t < b + 0.35 ? Math.sin(Math.PI * (t - b) / 0.35) : 0), 0)
  const hold = ease.inOutCubic(prog(t, T.hold - 0.4, T.hold))
  const sx = lerp(720, 560, hold), ax = lerp(900, 800, hold), yy = lerp(1400, 1380, hold)
  const sz = lerp(250, 300, hold)
  const sagMood = win(t, 7.4, 14.4) ? 'wide' : t > T.hold ? 'happy' : t > 17 ? 'sparkle' : 'squint'
  const aqMood = win(t, 10.4, 14.4) ? 'eyeroll' : t > T.hold ? 'happy' : t > 17 ? 'sparkle' : 'wide'
  F = star(x, t, 'sagittarius', { x: sx + 18 * bump + 10 * wob * Math.sin(t * 7), y: yy - 150, s: sz, mood: sagMood, look: [1, -0.2], squash: 0.06 * wob * Math.sin(t * 9), hops: SAG_HOPS, hat: '#a35cf0', scarf: MINT, pop: ok, seed: 9 })
  blades(x, F, sz)
  F = star(x, t, 'aquarius', { x: ax - 18 * bump + 10 * wob * Math.sin(t * 6 + 1), y: yy - 150, s: sz, mood: aqMood, look: [-1, -0.2], squash: 0.06 * wob * Math.sin(t * 8 + 2), hops: AQ_HOPS, hat: '#38c4ec', scarf: GOLD, pop: ok, seed: 11 })
  blades(x, F, sz)
  if (t > T.hold) { R(x, INK, sx + 60, yy - 140 + 0, ax - sx - 120, 22); R(x, BONE, sx + 66, yy - 134, ax - sx - 132, 10) }   // holding hands
  ;['sorry!', 'sorry!', 'SORRY!'].forEach((s, i) => bubble(x, t, i === 1 ? 900 : 700, 960 - i * 50, BUMPS[i] + 0.05, BUMPS[i] + 1.1, s, { size: i === 2 ? 40 : 32, tail: i === 1 ? -0.4 : 0.4 }))
  bubble(x, t, 360, 920, 21.0, 21.9, 'it was ICONIC.', { size: 36, tail: -0.3 })
  // THE STARS glide in
  const stk = pop01(t, T.b3, 0.4, 2) * outK(t, [T.lesson - 0.2, T.lesson])
  if (stk > 0.01) star(x, t, 'stars', { x: 820, y: 760, s: 170, pop: stk, mood: 'happy', hops: [T.b3 + 0.2, ...talkHops(L3, SP, { cps: 30 })], seed: 2 })
  hearts(x, t, T.hold + 0.1, (sx + ax) / 2, yy - 330, { n: 6, cell: 7 })
  sparkles(x, t, (sx + ax) / 2, yy - 200, T.hold, 10, 180, 2, [GOLD, ICE, PINK])
}
const win = (t, a, b) => t >= a && t < b

const EP = makeEp({
  id: 'nc14e14', ep: 14, duration: 40, key: 'E',
  heads: [
    { text: "The double date. | *One* couple's been | at this a while.", at: -1.4, out: [7.0, 7.2], accentColor: LC, size: 86, accentSize: 120 },
    { text: 'Date *two.*', at: T.b1 + 0.1, out: [14.1, 14.3], accentColor: SC, size: 120, accentSize: 160 },
    { text: 'Date two vs | date *two hundred.*', at: T.b3 + 0.05, out: [21.7, 21.9], accentColor: GOLD, size: 100, accentSize: 136 },
    { text: 'Date two is | *allowed* to be date two.', at: T.fin + 0.1, late: 4, lateAt: 28.1, wobble: true, out: [35.0, 35.3], accentColor: AC, size: 92, accentSize: 128 },
  ],
  boxes: [
    { lines: L1, open: 0.8, close: 7.0 },
    { lines: L2, open: 7.4, close: 14.2 },
    { lines: L3, open: 14.6, close: 21.8 },
  ],
  lesson: { at: T.lesson, out: T.lessonOut, text: "Don't skate on | *someone else's* timeline.", chip: '+1 wobble, fully allowed', color: AC },
  ghost: { at: 12.0, x: 640, y: 930, from: 'below', cell: 3 },
  cuts: [7.2, { t: T.cut, kind: 'deal' }, 26.9],
  snow: 0.7, ground: false,
  scene,
  cues: [
    ['whoosh', 0.3, 0.5, 0.03], ...BUMPS.flatMap((b, i) => [['tom', r3(b), 120 - i * 10, { gain: 0.16, decay: 0.2 }], ['pop', r3(b + 0.08), 880 + i * 120, 0.035, 0.3]]),
    ['pop', T.mugs, 1174.66, 0.045, -0.3], ['pop', T.mugs + 0.07, 1174.66, 0.04, -0.1], ['glitter', T.mugs, T.mugs + 0.4],
    ['whoosh', T.b3, 0.45, 0.035], ['pop', T.b3 + 0.2, 987.77, 0.04, 0.3],
    ['pop', 21.0, 1318.51, 0.04, -0.3], ['pop', 21.4, 1567.98, 0.04, -0.3],
    ['whoosh', T.hold - 0.4, 0.4, 0.035], ['pluck', T.hold, 1174.66, 0.045, 0.5, 0], ['pluck', T.hold + 0.12, 1567.98, 0.04, 0.5, 0], ['glitter', T.hold, T.hold + 0.5],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [box, glow, label, shadow, clamp]
