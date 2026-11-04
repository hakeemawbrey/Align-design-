// nh15e15: HOME FOR THE HOLIDAYS, "The kids' table." (30 s vertical, Star Talk Season 15 ep 15, music: chiptune · G)
// Story 0–25.6, then the shared end card. The season's look lives in ../../nh15e13/scenes/holikit.js.
//   0.0–3.2    hook "Seated at the *kids' table.*"  Sagittarius, far too big for a tiny chair, takes a crayon from the
//              little cousin.
//   3.2–7.4    "Grown-up table: | *small talk.*"  Aries (Sag's date) between AUNTIE and UNCLE: "so… the roads?"
//              "cold out, huh?"  Aries nods very politely.
//   7.4–12.0   "Kids' table: | *crayon finals.*"  Sag and the cousins hold up drawings, scorecards, confetti.
//   12.0       card cut. LITTLE COUSIN: "is that your *date?*"  SAG: "…maybe. *yes.*"  Sag glows pink; the cousins draw
//              the two of them, hearts and all.
//   16.6       "Aries makes a | *run* for it."  Aries hops over and squeezes into the tiniest chair (squash, wobble).
//              THE STARS: "the good table is where your person *is.*"
//   20.6       everyone at the kids' table; Pisces fountains over the portrait. "Pull up a *tiny chair.*"
import { makeEp, room, table, plate, candle, pie, mug, tissues, rel, sign, pisces, theStars, sparkles, hearts, confetti, bubble, label, box, R, glow,
  tagOf, pop01, outK, prog, lerp, clamp, ease, talkHops, INK, BONE, GOLD, PINK, RED, CPS } from '../../nh15e13/scenes/holikit.js'

const SAG = 'sagittarius', ARI = 'aries'
const SC = '#c9a6ff', AC = '#ff9a7a'
const LINES = [
  { t: 12.3, speaker: '✦ LITTLE COUSIN', color: '#ffc6e0', text: 'is that your *date?*' },
  { t: 13.75, speaker: tagOf(SAG), color: SC, text: '…maybe. *yes.*' },
  { t: 17.0, speaker: 'THE STARS', text: 'the good table is where your person *is.*' },
]
const BOXES = [{ open: 12.1, close: 15.95, from: 0, to: 2 }, { open: 16.8, close: 20.45, from: 2, to: 3 }]
const SAG_HOPS = [-0.1, 0.8, 7.6, 8.4, 9.3, 10.2, ...talkHops(LINES, tagOf(SAG), { cps: CPS }), 18.2, 20.8]
const KID_HOPS = [0.2, 0.7, 7.5, 7.9, 8.8, 9.7, 10.6, 11.1, 12.35, 12.7, 20.9]

// the tiny table + tiny chairs
function tinyChair(x, cx, base, col = '#e8344e', sq = 0) {
  x.save(); x.translate(cx, base); x.scale(1 + sq, 1 - sq)
  box(x, -50, -70, 100, 16, col, { b: 5 }); box(x, -46, -150, 14, 80, col, { b: 5 }); box(x, 32, -150, 14, 80, col, { b: 5 }); box(x, -46, -150, 92, 14, col, { b: 5 })
  box(x, -44, -54, 12, 54, col, { b: 4 }); box(x, 32, -54, 12, 54, col, { b: 4 })
  x.restore()
}
function tinyTable(x, cx, y, w) {
  box(x, cx - w / 2, y, w, 28, '#ffe08a', { b: 6, hi: '#fff0b8' })
  for (const d of [-1, 1]) box(x, cx + d * (w / 2 - 30) - 12, y + 34, 24, 110, '#7fd0ff', { b: 5 })
  R(x, '#ffffff', cx - w / 2 + 30, y - 16, 160, 16); R(x, INK, cx - w / 2 + 30, y - 20, 160, 4)
  for (let i = 0; i < 5; i++) R(x, ['#e8344e', '#3fae6a', '#3a7fd0', GOLD, '#c9a6ff'][i], cx + 60 + i * 26, y - 14, 14, 14)
}
function drawing(x, t, cx, cy, k, kind, rot = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot + 0.04 * Math.sin(t * 3 + cx)); x.scale(k, k)
  box(x, -90, -70, 180, 140, '#fffaf0', { b: 5 })
  if (kind === 'tree') { x.fillStyle = '#3fae6a'; x.beginPath(); x.moveTo(0, -50); x.lineTo(-45, 40); x.lineTo(45, 40); x.fill(); R(x, GOLD, -6, -60, 12, 12) }
  else if (kind === 'cat') { R(x, '#f39a3a', -40, -20, 80, 60); R(x, '#f39a3a', -40, -40, 16, 20); R(x, '#f39a3a', 24, -40, 16, 20); R(x, INK, -20, 0, 8, 8); R(x, INK, 12, 0, 8, 8) }
  else if (kind === 'scribble') { x.strokeStyle = '#3a7fd0'; x.lineWidth = 6; x.beginPath(); for (let i = 0; i < 9; i++) x.lineTo(-60 + i * 15, (i % 2 ? -30 : 30)); x.stroke() }
  else { // the portrait: two stars + a heart
    x.fillStyle = '#c9a6ff'; R(x, '#c9a6ff', -64, -10, 40, 40); x.fillStyle = '#ff7a5a'; R(x, '#ff7a5a', 24, -10, 40, 40)
    R(x, INK, -54, 0, 6, 6); R(x, INK, -38, 0, 6, 6); R(x, INK, 34, 0, 6, 6); R(x, INK, 50, 0, 6, 6)
    R(x, '#ff5c8a', -12, -44, 10, 10); R(x, '#ff5c8a', 2, -44, 10, 10); R(x, '#ff5c8a', -12, -36, 24, 12); R(x, '#ff5c8a', -6, -26, 12, 8)
    label(x, 'S + A', 0, 52, { size: 22, col: INK, shadow: false })
  }
  x.restore()
}
function kidsTable(x, t, S, o = {}) {
  room(x, t, { wall: '#3a5a4e', wains: '#26403a', winX: 650, winY: 580, winW: 280, winH: 280, wreathX: 250, wreathY: 660 })
  const blush = o.blush ?? 0
  const ariK = o.aries ?? 0, sq = o.squash ?? 0
  tinyChair(x, 290, 1290, '#e8344e'); tinyChair(x, 520, 1290, '#3a7fd0'); tinyChair(x, 760, 1290, '#3fae6a')
  if (ariK > 0) tinyChair(x, 930, 1290, '#f2c75c', sq * 0.4)
  rel(x, t, 'KID', { x: 290, y: 1120, s: 170, mood: o.kidMood ?? 'sparkle', look: [1, 0], hops: KID_HOPS })
  rel(x, t, 'COUSIN', { x: 760, y: 1110, s: 180, mood: o.cousinMood ?? 'happy', look: [-1, 0], hops: KID_HOPS.map(h => h + 0.2) })
  sign(x, t, SAG, { x: 520, y: 1040, s: 300, mood: o.sagMood ?? 'happy', look: [0, 0], hops: SAG_HOPS, blush: blush > 0 ? 1 : undefined, squash: -0.04 })
  if (blush > 0) glow(x, 520, 1040, 220, 0.25 * blush, '255,120,170')
  if (ariK > 0) sign(x, t, ARI, { x: lerp(1200, 930, ease.outCubic(ariK)), y: 1110, s: 210, mood: 'sparkle', look: [-1, 0], hops: [16.7, 17.05, 17.4, 21.2], squash: sq })
  tinyTable(x, 540, 1260, 760)
  // Sag's knees poke up over the tiny table
  box(x, 430, 1200, 70, 70, '#c9a6ff', { b: 6 }); box(x, 540, 1200, 70, 70, '#c9a6ff', { b: 6 })
}
function grownTable(x, t, S) {
  room(x, t, { wall: '#5e3448', winX: 120, winY: 500, winW: 260, winH: 300, wreathX: 820, wreathY: 600 })
  rel(x, t, 'AUNTIE', { x: 230, y: 1010, s: 270, mood: 'neutral', look: [1, 0], hops: [3.5, 4.2] })
  rel(x, t, 'UNCLE', { x: 850, y: 1010, s: 270, mood: 'neutral', look: [-1, 0], hops: [5.4, 6.0] })
  sign(x, t, ARI, { x: 540, y: 1000, s: 280, mood: t > 6.2 ? 'sleepy' : 'neutral', look: [t < 5.2 ? -1 : 1, 0], hops: [3.4, 4.6, 5.9], zzz: false })
  table(x, 540, 1130, 1000, {})
  plate(x, 230, 1122); plate(x, 540, 1122); plate(x, 850, 1122); candle(x, t, 380, 1122, 80); candle(x, t, 700, 1122, 80)
  bubble(x, t, 270, 780, 3.6, 7.4, 'so… the roads?', { size: 34, tail: -0.3 })
  bubble(x, t, 800, 700, 5.3, 7.4, 'cold out, huh?', { size: 34, tail: 0.3 })
  bubble(x, t, 540, 840, 4.6, 5.3, '*nods*', { size: 30, col: '#ffd9cf' })
  // far away: laughter from the kids' table
  label(x, 'HA HA!!', 960, 1300, { size: 30, col: '#ffe08a', alpha: 0.5 + 0.5 * Math.sin(t * 8), rot: 0.1 })
  tissues(x, 120, 1250, 60); pisces(x, t, { x: 140, y: 1310, s: 120, look: [1, -1] }, 1)
}
const shots = [
  { at: 0, cam: [1.12, 540, 1060], draw(x, t, S) {
    kidsTable(x, t, S, { sagMood: 'wide', kidMood: 'sparkle' })
    // the crayon, mid-hand-off
    const p = ease.inOutCubic(prog(t, -0.2, 1.0))
    x.save(); x.translate(lerp(330, 470, p), lerp(1060, 1010, p)); x.rotate(-0.6); box(x, -10, -50, 20, 100, '#e8344e', { b: 4 }); R(x, '#ffffff', -10, -20, 20, 12); x.restore()
    pisces(x, t, { x: 950, y: 1180, s: 120, look: [-1, -1] }, 1)
  } },
  { at: 3.2, cam: [1.1, 540, 1000], draw: grownTable },
  { at: 7.4, cam: [1.12, 540, 1040], draw(x, t, S) {
    kidsTable(x, t, S, { sagMood: 'sparkle' })
    drawing(x, t, 300, 880, pop01(t, 7.7, 0.3, 2.4), 'tree', -0.1)
    drawing(x, t, 520, 800, pop01(t, 8.5, 0.3, 2.4), 'cat', 0.05)
    drawing(x, t, 760, 880, pop01(t, 9.3, 0.3, 2.4), 'scribble', 0.12)
    for (const [cx, at, v] of [[300, 10.2, '10'], [520, 10.4, '10'], [760, 10.6, '11']]) { const k = pop01(t, at, 0.25, 2.6); if (k > 0.01) { x.save(); x.translate(cx, 720); x.scale(k, k); box(x, -46, -32, 92, 64, BONE, { b: 5 }); label(x, v, 0, 2, { size: 40, col: RED, shadow: false, font: "'Inter', sans-serif", weight: 800 }); x.restore() } }
    confetti(x, t, 10.7, 540, 760)
    pisces(x, t, { x: 960, y: 1180, s: 120, look: [-1, -1] }, 2)
  } },
  { at: 12.0, cam: [1.16, 540, 1040], draw(x, t, S) {
    kidsTable(x, t, S, { sagMood: t > 13.6 ? 'heart' : 'wide', blush: prog(t, 12.9, 13.4), kidMood: 'sparkle', cousinMood: t > 14.4 ? 'sparkle' : 'happy' })
    bubble(x, t, 760, 900, 14.4, 16.6, 'ooooh', { size: 34, col: '#fff3a8', tail: -0.2 })
    drawing(x, t, 300, 860, pop01(t, 15.0, 0.3, 2.4), 'portrait', -0.08)
    hearts(x, t, 13.8, 520, 900, { n: 6 })
    pisces(x, t, { x: 960, y: 1180, s: 120, look: [-1, -1] }, 2)
  } },
  { at: 16.6, cam: [1.12, 600, 1040], draw(x, t, S) {
    const ak = prog(t, 16.65, 17.4), sq = t > 17.4 && t < 18.4 ? 0.14 * Math.exp(-(t - 17.4) * 4) * Math.cos((t - 17.4) * 20) + 0.06 : 0.06
    kidsTable(x, t, S, { sagMood: 'heart', aries: ak, squash: sq })
    drawing(x, t, 300, 860, 1, 'portrait', -0.08)
    sparkles(x, t, 930, 1100, 17.4, 10, 120, 1)
    bubble(x, t, 930, 900, 17.5, 19.0, 'scooch!', { size: 32, tail: 0 })
    theStars(x, t, { x: 250, y: 600 + 6 * Math.sin(t * 2), s: 120, pop: pop01(t, 16.8, 0.34, 2.2), mood: 'happy', look: [1, 0], hops: [17.0, 17.6, 18.3] })
  } },
  { at: 20.6, cam: [1.1, 600, 1060], draw(x, t, S) {
    kidsTable(x, t, S, { sagMood: 'sparkle', aries: 1, squash: 0.06 })
    drawing(x, t, 600, 820, 1.1, 'portrait', 0.04)
    pisces(x, t, { x: 140, y: 1180, s: 150, pop: pop01(t, 20.8, 0.3, 2), look: [1, -1] }, 3); tissues(x, 140, 1320, 70)
    hearts(x, t, 21.0, 700, 950, { n: 6 })
  } },
]
const CUTS = [7.4, { t: 12.0, kind: 'flip' }, 20.6]
export const { DURATION, SCENES, CUES } = makeEp({
  duration: 30,
  hook: { text: 'Seated at the | *kids’ table.*', out: [3.0, 3.2], color: '#ffe08a', size: 88, accentSize: 140 },
  heads: [
    { at: 3.35, out: [7.2, 7.4], text: 'Grown-up table: | *small talk.*', color: '#ffd3b0' },
    { at: 7.55, out: [11.8, 12.0], text: 'Kids’ table: | *crayon finals.*', color: '#ffe08a' },
    { at: 12.15, out: [16.4, 16.6], text: 'The cousins | *have questions.*', color: '#ffc6e0' },
    { at: 16.75, out: [20.4, 20.6], text: 'Aries makes a | *run* for it.', color: AC },
  ],
  shots, lines: LINES, boxes: BOXES,
  last: { at: 20.9, text: 'Pull up a *tiny chair.*', color: '#ffe08a' },
  punch: [{ at: 6.1, dur: 1.2, z: 0.12, x: 540, y: 960 }],
  cuts: CUTS,
  pitch: { '✦ LITTLE COUSIN': 1174.66, [tagOf(SAG)]: 739.99 },
  cues: [
    ['pop', 7.7, 987.77, 0.04, -0.3], ['pop', 8.5, 1174.66, 0.04, 0], ['pop', 9.3, 1318.51, 0.04, 0.3],
    ['pop', 10.2, 880, 0.04, -0.3], ['pop', 10.4, 987.77, 0.04, 0], ['pop', 10.6, 1318.51, 0.05, 0.3], ['glitter', 10.7, 11.4],
    ['pluck', 13.0, 1567.98, 0.035, 0.6, 0], ['pop', 15.0, 1174.66, 0.04, -0.3],
    ['whoosh', 16.65, 0.5, 0.035], ['boom', 17.4, 0.12], ['tick', 17.4, 0.06], ['glitter', 17.4, 17.9],
  ],
})
