// nh15e14: HOME FOR THE HOLIDAYS, "“So what do you do?”" (28 s vertical, Star Talk Season 15 ep 14, music: funk · E)
// Story 0–25.6, then the shared end card. The season's look lives in ../../nh15e13/scenes/holikit.js.
//   0.0–3.2    hook "“So… what do you *do?*”"  UNCLE leans right over the pie at Virgo (Gemini's date).
//   3.2–8.0    "The *résumé* answer."  A pixel slide deck pops up over the table: TITLE, QUARTERLY GOALS, a bar chart,
//              slide 3/14. Uncle's eyes go sleepy, a z floats up. Gemini facepalms.
//   8.0–12.6   "Gemini | *whispers.*"  GEMINI: "tell him the other thing!" → VIRGO: "i also make a very serious *soup.*"
//   12.6       card cut. "Uncle | *lights up.*"  He pulls out his own soup flask. Hearts. THE STARS: "it's not a test.
//              it's a *door.*"
//   19.0       a talk card lands on the table: "What are you into lately?"  Pisces cries into the soup steam.
//              "Answer with what you *love.*"
import { makeEp, room, table, plate, candle, pie, mug, tissues, rel, sign, pisces, theStars, sparkles, hearts, bubble, label, box, R, glow, talkCard,
  tagOf, pop01, outK, prog, lerp, clamp, ease, talkHops, INK, BONE, GOLD, PINK, RED, CPS } from '../../nh15e13/scenes/holikit.js'

const VIR = 'virgo', GEM = 'gemini'
const VC = '#9fe6b0', GC = '#ffe27a'
const LINES = [
  { t: 8.45, speaker: tagOf(GEM), color: GC, text: 'tell him the *other* thing!' },
  { t: 9.95, speaker: tagOf(VIR), color: VC, text: 'i also make a very serious *soup.*' },
  { t: 15.0, speaker: 'THE STARS', text: "it's not a test. it's a *door.*" },
]
const BOXES = [{ open: 8.25, close: 12.45, from: 0, to: 2 }, { open: 14.8, close: 18.8, from: 2, to: 3 }]
const VIR_HOPS = [0.4, 3.4, ...talkHops(LINES, tagOf(VIR), { cps: CPS }), 13.3, 19.2]
const GEM_HOPS = [1.0, 6.6, ...talkHops(LINES, tagOf(GEM), { cps: CPS }), 13.5, 19.3]
const UNC_HOPS = [-0.15, 0.6, 12.75, 13.1, 13.45, 16.6, 19.4]

function soup(x, t, cx, base, col = '#e07a3a') {
  box(x, cx - 60, base - 60, 120, 60, '#f3ead8', { b: 6 }); R(x, col, cx - 52, base - 56, 104, 14)
  for (let i = 0; i < 3; i++) { const ph = ((t * 0.6 + i / 3) % 1); x.save(); x.globalAlpha = 0.6 * (1 - ph); R(x, '#ffffff', cx - 30 + i * 26 + Math.sin(t * 3 + i) * 8, base - 80 - ph * 120, 10, 26); x.restore() }
}
function deck(x, t, k, slide) {
  if (k <= 0.01) return
  x.save(); x.translate(560, 700); x.scale(k * 0.82, k * 0.82); x.rotate(-0.02)
  box(x, -330, -200, 660, 400, '#f7f4ee', { b: 8 }); R(x, '#3a6fd0', -330, -200, 660, 60)
  label(x, ['JOB TITLE', 'QUARTERLY GOALS', 'PROCESS FLOW'][slide], -300, -170, { size: 30, col: BONE, align: 'left', shadow: false })
  label(x, `${slide + 3}/14`, 300, -170, { size: 26, col: BONE, align: 'right', shadow: false })
  if (slide === 0) { label(x, 'SENIOR ASSOCIATE,', 0, -60, { size: 40, col: INK, shadow: false }); label(x, 'OPERATIONAL', 0, 0, { size: 40, col: INK, shadow: false }); label(x, 'EXCELLENCE (EXT.)', 0, 60, { size: 40, col: INK, shadow: false }) }
  else if (slide === 1) { const hs = [80, 130, 110, 190]; hs.forEach((h, i) => { R(x, INK, -220 + i * 120, 150 - h, 80, h); R(x, ['#e8344e', GOLD, '#3fae6a', '#3a6fd0'][i], -214 + i * 120, 156 - h, 68, h - 12) }); R(x, INK, -260, 150, 520, 6) }
  else { for (let i = 0; i < 4; i++) { box(x, -280 + i * 150, -40, 110, 80, '#dfe8ff', { b: 5 }); if (i < 3) R(x, INK, -170 + i * 150, -4, 40, 8) } label(x, '…and then it escalates', 0, 110, { size: 30, col: INK, shadow: false }) }
  x.restore()
}
function scene(x, t, S, phase) {
  room(x, t, { wall: '#3e4a6a', wains: '#2a3350', winX: 700, winY: 500, winW: 260, winH: 300, wreathX: 230, wreathY: 600 })
  const lean = phase === 0 ? 1 : phase === 1 ? 0.4 : 0
  const glaze = phase === 1 && t > 5.2
  const lit = phase >= 2
  rel(x, t, 'UNCLE', { x: lerp(300, 420, lean), y: lerp(1010, 960, lean), s: 320, mood: lit ? (t > 13.0 ? 'heart' : 'sparkle') : glaze ? 'sleepy' : 'wide', look: [1, 0], hops: UNC_HOPS, squash: lean * -0.05 })
  sign(x, t, VIR, { x: 760, y: 1000, s: 290, mood: phase === 0 ? 'wide' : phase === 1 ? 'neutral' : phase === 2 ? 'happy' : 'sparkle', look: [-1, 0], hops: VIR_HOPS })
  sign(x, t, GEM, { x: 960, y: 1060, s: 200, mood: phase === 1 && t > 6.5 ? 'squint' : phase >= 2 ? 'happy' : 'wide', look: [-1, -0.3], hops: GEM_HOPS })
  table(x, 540, 1130, 1060, { runner: '#3a7fd0' })
  if (phase < 2) pie(x, 460, 1110, 150)
  plate(x, 760, 1122)
  if (phase >= 2) { soup(x, t, 300, 1128, '#7fb04a'); soup(x, t, 760, 1128) }
  candle(x, t, 600, 1122, 70, GOLD)
  // Pisces at the far end, crying into the steam
  tissues(x, 150, 1250, 70); pisces(x, t, { x: 185, y: 1320, s: 140, look: [1, -1] }, phase >= 2 ? 3 : 1)
}
const shots = [
  { at: 0, cam: [1.12, 560, 1000], draw(x, t, S) { scene(x, t, S, 0); bubble(x, t, 450, 760, -1, 3.2, 'so… what do you do?', { size: 36, tail: -0.3 }) } },
  { at: 3.2, cam: [1.12, 560, 1000], draw(x, t, S) {
    scene(x, t, S, 1)
    const sl = t < 4.8 ? 0 : t < 6.3 ? 1 : 2
    deck(x, t, pop01(t, 3.35, 0.35, 2.2) * (1 + 0.04 * Math.sin(Math.PI * prog(t, sl === 1 ? 4.8 : 6.3, (sl === 1 ? 4.8 : 6.3) + 0.2))), sl)
  } },
  { at: 8.0, cam: [1.2, 700, 1020], draw(x, t, S) {
    scene(x, t, S, 1)
    bubble(x, t, 930, 840, 8.2, 12.6, 'psst', { size: 32, col: '#fff3a8', tail: 0.3 })
  } },
  { at: 12.6, cam: [1.12, 540, 1000], draw(x, t, S) {
    scene(x, t, S, 2)
    // Uncle's flask comes out of nowhere
    const fk = pop01(t, 12.75, 0.3, 2.4)
    if (fk > 0.01) { x.save(); x.translate(440, 840); x.scale(fk, fk); x.rotate(-0.15); box(x, -40, -90, 80, 180, '#3a7fd0', { b: 6, hi: '#6a9fe8' }); box(x, -46, -120, 92, 36, '#c9d6f0', { b: 6 }); label(x, 'SOUP', 0, 10, { size: 26, col: BONE, rot: -Math.PI / 2 }); x.restore() }
    sparkles(x, t, 420, 900, 12.8, 12, 200, 1)
    bubble(x, t, 380, 680, 13.2, 14.6, 'YOU MAKE SOUP?!', { size: 38, col: '#d9f5e8', tail: -0.2 })
    hearts(x, t, 13.6, 600, 900, { n: 6 })
    theStars(x, t, { x: 930, y: 560 + 6 * Math.sin(t * 2), s: 130, pop: pop01(t, 14.6, 0.34, 2.2), mood: 'happy', look: [-1, 0], hops: [14.7, 15.4, 16.2] })
  } },
  { at: 19.0, cam: [1.12, 540, 1020], draw(x, t, S) {
    scene(x, t, S, 3)
    talkCard(x, t, 540, 1290, pop01(t, 19.3, 0.4, 2), 'What are you into lately?', { w: 560, h: 260 })
  } },
]
const CUTS = [8.0, { t: 12.6, kind: 'flip' }, 19.0]
export const { DURATION, SCENES, CUES } = makeEp({
  duration: 30,
  hook: { text: '“So… what | do you *do?*”', out: [3.0, 3.2], color: '#a9e2c6', size: 92, accentSize: 140 },
  heads: [
    { at: 3.35, out: [7.8, 8.0], text: 'The *résumé* answer.', color: '#7fb4ff' },
    { at: 8.15, out: [12.4, 12.6], text: 'Gemini | *whispers.*', color: GC },
    { at: 12.75, out: [18.8, 19.0], text: 'Uncle | *lights up.*', color: '#a9e2c6' },
  ],
  shots, lines: LINES, boxes: BOXES,
  last: { at: 19.9, text: 'Answer with what you *love.*', color: VC, top: 180 },
  punch: [{ at: 5.4, dur: 1.4, z: 0.12, x: 400, y: 900 }],
  cuts: CUTS,
  pitch: { [tagOf(VIR)]: 659.25, [tagOf(GEM)]: 880 },
  cues: [
    ['pop', 3.4, 880, 0.04, 0], ['tick', 4.8, 0.05], ['whoosh', 4.8, 0.15, 0.02], ['tick', 6.3, 0.05], ['whoosh', 6.3, 0.15, 0.02],
    ['pluck', 5.3, 330, 0.03, 0.8, -0.3],
    ['pop', 12.8, 1318.51, 0.05, -0.2], ['glitter', 12.8, 13.3], ['pop', 13.25, 1174.66, 0.04, -0.2],
    ['pop', 14.65, 739.99, 0.03, 0.4], ['whoosh', 19.25, 0.35, 0.03], ['pluck', 19.65, 1318.51, 0.04, 0.6, 0],
  ],
})
