// nh15e18: HOME FOR THE HOLIDAYS, "The game that got too competitive." (38 s vertical, Star Talk Season 15 ep 18,
// music: house · A). Story 0–35.6, then the shared end card. The season's look lives in ../../nh15e13/scenes/holikit.js.
//   0.0–3.2    hook "It was *just* a board game."  Capricorn stands on its chair, a game tile held high over the board.
//   3.2–7.6    "Round 1: | *friendly.*"  Dice roll, "nice move!", everyone smiles. Pisces cries happy tears.
//   7.6–12.2   "Round 2: | *the binder.*"  Capricorn opens a strategy binder with colour tabs. Gemini (its date) blinks.
//   12.2–17.0  "Round 3: | *three notepads.*"  Gemini keeps score on three pads at once; the cousins hide under the table.
//   17.0       card cut. "Meanwhile, | *Grandma wins.*"  One quiet tile. Confetti. Capricorn's jaw drops.
//   21.6       the turn: CAPRICORN: "wait. are we having *fun?*"  GEMINI: "not since round *one.*"
//   26.4       ★ LESSON UNLOCKED "Win the night, | not the *game.*"  +1 GOOD SPORT
//   30.9       the rematch: Capricorn and Gemini on one side of the board, high five. "Play on the *same side.*"
import { makeEp, room, table, candle, mug, tissues, rel, sign, pisces, theStars, sparkles, hearts, confetti, bubble, label, box, R, glow,
  tagOf, pop01, outK, prog, lerp, clamp, ease, talkHops, INK, BONE, GOLD, PINK, RED, CPS } from '../../nh15e13/scenes/holikit.js'

const CAP = 'capricorn', GEM = 'gemini'
const CPC = '#c8b4ff', GC = '#ffe27a'
const LINES = [
  { t: 21.9, speaker: tagOf(CAP), color: CPC, text: 'wait. are we having *fun?*' },
  { t: 23.6, speaker: tagOf(GEM), color: GC, text: 'not since round *one.*' },
]
const BOXES = [{ open: 21.7, close: 26.3, from: 0, to: 2 }]
const LESSON = { at: 26.4, out: [30.6, 30.9], text: 'Win the night, | not the *game.*', chip: '+1 GOOD SPORT' }
const CAP_HOPS = [-0.12, 0.7, 3.5, 8.0, 8.6, 12.5, 13.3, 14.1, 17.3, ...talkHops(LINES, tagOf(CAP), { cps: CPS }), 31.0, 31.6]
const GEM_HOPS = [0.3, 3.7, 5.2, 12.4, 12.7, 13.0, 13.3, 13.6, 14.0, 14.4, ...talkHops(LINES, tagOf(GEM), { cps: CPS }), 31.0, 31.6]
const WIN = 18.6

function board(x, t, o = {}) {
  // the board tilted up toward us over the table
  x.save(); x.translate(540, 1130)
  box(x, -280, -64, 560, 66, '#2f6a4a', { b: 8, hi: '#3f8a5e' })
  for (let i = 0; i < 9; i++) R(x, i % 2 ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)', -270 + i * 60, -60, 58, 58)
  const tiles = o.tiles ?? 6
  for (let i = 0; i < tiles; i++) { const tx = -262 + (i * 131) % 520, ty = -54; box(x, tx, ty, 44, 34, BONE, { b: 4 }); label(x, 'ABCDEFGHJK'[i % 10], tx + 22, ty + 18, { size: 22, col: INK, shadow: false }) }
  x.restore()
}
function scoreboard(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.translate(800, 640); x.scale(k, k)
  box(x, -170, -90, 340, 180, '#1b1236', { b: 6 }); R(x, GOLD, -160, -80, 320, 6)
  const spin = n => String(Math.floor(t * n) % 100).padStart(2, '0')
  label(x, 'CAP', -90, -36, { size: 28, col: CPC }); label(x, 'GEM', 90, -36, { size: 28, col: GC })
  label(x, spin(23), -90, 30, { size: 64, col: BONE }); label(x, spin(31), 90, 30, { size: 64, col: BONE })
  x.restore()
}
function binder(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.translate(360, 760); x.rotate(-0.08); x.scale(k, k)
  box(x, -150, -110, 300, 220, '#3a3a8a', { b: 7 }); box(x, -136, -96, 272, 192, '#f7f4ee', { b: 4 })
  label(x, 'STRATEGY', 0, -60, { size: 34, col: INK, shadow: false }); label(x, 'VOL. 3', 0, -20, { size: 24, col: '#5a5470', shadow: false })
  for (let i = 0; i < 5; i++) R(x, [RED, GOLD, '#3fae6a', '#3a7fd0', PINK][i], 150, -90 + i * 38, 26, 30)
  for (let i = 0; i < 3; i++) R(x, '#bdb6d0', -110, 20 + i * 24, 220 - i * 40, 8)
  x.restore()
}
function pads(x, t, k) {
  if (k <= 0.01) return
  for (let i = 0; i < 3; i++) {
    x.save(); x.translate(640 + i * 130, 780 - (i % 2) * 40); x.rotate((i - 1) * 0.15 + 0.05 * Math.sin(t * 9 + i)); x.scale(k, k)
    box(x, -54, -70, 108, 140, '#fff3a8', { b: 5 }); R(x, RED, -54, -70, 108, 16)
    for (let j = 0; j < 4; j++) R(x, INK, -38, -34 + j * 24, 20 + ((Math.floor(t * 6) + j + i) % 4) * 14, 6)
    x.restore()
  }
}
function scene(x, t, o = {}) {
  room(x, t, { wall: '#4a2a56', wains: '#321c3c', winX: 120, winY: 560, winW: 240, winH: 260, wreathX: 900, wreathY: 640 })
  const up = o.capUp ?? 0
  // Capricorn's chair (visible above the table when it stands on it)
  if (up > 0.01) { box(x, 210, lerp(1130, 1000, up), 180, 20, '#6b4a2f', { b: 6 }); box(x, 210, lerp(1130, 1000, up) - 160, 20, 160, '#6b4a2f', { b: 6 }); box(x, 370, lerp(1130, 1000, up) - 160, 20, 160, '#6b4a2f', { b: 6 }) }
  rel(x, t, 'GRANDMA', { x: o.gmx ?? 540, y: 900, s: 220, mood: o.gm ?? 'happy', look: [0, 0], hops: [1.0, WIN, WIN + 0.5, 31.4] })
  sign(x, t, CAP, { x: 300, y: lerp(950, 800, up), s: 280, mood: o.cm ?? 'happy', look: o.clook ?? [1, 0], hops: CAP_HOPS, squash: up * -0.05 })
  sign(x, t, GEM, { x: o.gx ?? 800, y: 950, s: 270, mood: o.gem ?? 'happy', look: o.glook ?? [-1, 0], hops: GEM_HOPS })
  table(x, 540, 1130, 1040, { runner: '#3fae6a' })
  board(x, t, { tiles: o.tiles })
  if (o.kids) {
    // the cousins peek out from under the tablecloth
    for (const [kx, who, d] of [[420, 'KID', 0], [660, 'COUSIN', 0.4]]) { const pk = 0.5 + 0.5 * Math.sin(t * 3 + d * 5); x.save(); x.beginPath(); x.rect(0, 1300, 1080, 200); x.clip(); rel(x, t, who, { x: kx, y: 1400 - 50 * pk, s: 150, mood: 'wide', look: [0, -1] }); x.restore() }
  }
  candle(x, t, 160, 1122, 70, GOLD); mug(x, 940, 1110, '#3a7fd0')
  tissues(x, 930, 1240, 60); pisces(x, t, { x: 960, y: 1300, s: 120, look: [-1, -1] }, o.pt ?? 2)
}
const shots = [
  { at: 0, cam: [1.16, 560, 1000], draw(x, t) {
    scene(x, t, { capUp: 1, cm: 'sparkle', clook: [1, -1], gem: 'wide' })
    // the tile held high
    x.save(); x.translate(360, 560 + 8 * Math.sin(t * 6)); x.rotate(0.15); box(x, -40, -32, 80, 64, BONE, { b: 6 }); label(x, 'Z', 0, 2, { size: 44, col: INK, shadow: false }); x.restore()
    sparkles(x, t, 360, 560, -0.1, 10, 90, 1)
  } },
  { at: 3.2, cam: [1.16, 560, 1000], draw(x, t) {
    scene(x, t, { cm: 'happy', gem: 'happy', pt: 2, tiles: 3 })
    // the dice
    for (let i = 0; i < 2; i++) { const p = prog(t, 3.6, 4.4), dx = lerp(380, 520 + i * 70, ease.outCubic(p)), dy = 960 - Math.abs(Math.sin(p * 9)) * 120 * (1 - p); x.save(); x.translate(dx, dy); x.rotate((1 - p) * 8 + i); box(x, -24, -24, 48, 48, BONE, { b: 5 }); R(x, INK, -6, -6, 12, 12); x.restore() }
    bubble(x, t, 800, 760, 5.0, 7.5, 'nice move!', { size: 34, tail: 0 })
  } },
  { at: 7.6, cam: [1.16, 560, 1000], draw(x, t) { scene(x, t, { cm: 'squint', gem: t > 9.4 ? 'wide' : 'neutral', tiles: 5, pt: 1 }); binder(x, t, pop01(t, 8.0, 0.4, 2.2)); bubble(x, t, 800, 760, 9.6, 12.1, 'is that… tabbed?', { size: 32, tail: 0 }) } },
  { at: 12.2, cam: [1.16, 560, 1000], draw(x, t) { scene(x, t, { capUp: ease.outCubic(prog(t, 12.4, 12.8)), cm: 'squint', gem: 'squint', kids: true, tiles: 7, pt: 1 }); pads(x, t, pop01(t, 12.5, 0.3, 2.2)); scoreboard(x, t, 0) } },
  { at: 17.0, cam: [1.16, 560, 1000], draw(x, t) {
    const wk = t > WIN
    scene(x, t, { capUp: 1 - ease.inOutCubic(prog(t, WIN + 0.3, WIN + 0.9)), cm: wk ? 'wide' : 'squint', gem: wk ? 'wide' : 'squint', gm: wk ? 'sparkle' : 'happy', tiles: 8, kids: !wk, pt: wk ? 3 : 1 })
    // Grandma's quiet tile
    const tp = ease.inOutCubic(prog(t, 17.8, WIN))
    x.save(); x.translate(540, lerp(880, 1100, tp)); box(x, -26, -20, 52, 40, GOLD, { b: 5 }); label(x, 'W', 0, 2, { size: 28, col: INK, shadow: false }); x.restore()
    bubble(x, t, 540, 740, WIN + 0.2, 21.5, 'i win, dears.', { size: 36, col: '#ece0ff' })
    confetti(x, t, WIN + 0.05, 540, 900)
  } },
  { at: 21.6, cam: [1.24, 560, 980], draw(x, t) { scene(x, t, { cm: t > 23.2 ? 'neutral' : 'wide', gem: t < 23.5 ? 'neutral' : 'happy', clook: [1, 0], tiles: 0, pt: 2 }) } },
  { at: 26.3, flash: false, cam: [1.24, 560, 980], draw(x, t) { scene(x, t, { cm: 'happy', gem: 'happy', tiles: 0, pt: 2 }) } },
  { at: 30.9, cam: [1.16, 560, 1000], draw(x, t) {
    scene(x, t, { cm: 'sparkle', gem: 'sparkle', gx: 470, gmx: 800, clook: [1, 0], glook: [-1, 0], gm: 'happy', tiles: 4, pt: 3 })
    // the high five spark between them
    sparkles(x, t, 385, 820, 31.3, 12, 120, 1); hearts(x, t, 31.4, 380, 900, { n: 5 })
    bubble(x, t, 540, 740, 31.6, 35.4, 'rematch? together.', { size: 32, col: '#ece0ff' })
  } },
]
const CUTS = [12.2, { t: 17.0, kind: 'flip' }, 30.9]
export const { DURATION, SCENES, CUES } = makeEp({
  duration: 40,
  hook: { text: 'It was *just* | a board game.', out: [3.0, 3.2], color: CPC, size: 92, accentSize: 140 },
  heads: [
    { at: 3.35, out: [7.4, 7.6], text: 'Round 1: | *friendly.*', color: '#9fe6b0' },
    { at: 7.75, out: [12.0, 12.2], text: 'Round 2: | *the binder.*', color: CPC },
    { at: 12.35, out: [16.8, 17.0], text: 'Round 3: | *three notepads.*', color: GC },
    { at: 17.15, out: [21.4, 21.6], text: 'Meanwhile, | *Grandma wins.*', color: '#d8c6f2' },
  ],
  shots, lines: LINES, boxes: BOXES, lesson: LESSON,
  last: { at: 31.2, text: 'Play on the *same side.*', color: GC },
  punch: [{ at: 14.0, dur: 1.4, z: 0.12, x: 700, y: 820 }, { at: 19.0, dur: 1.4, z: 0.14, x: 300, y: 1000 }],
  cuts: CUTS,
  pitch: { [tagOf(CAP)]: 587.33, [tagOf(GEM)]: 880 },
  cues: [
    ['whoosh', 3.6, 0.4, 0.03], ...[3.8, 4.0, 4.15, 4.3].map(t => ['tick', t, 0.05]),
    ['boom', 8.05, 0.15], ['pop', 8.1, 659.25, 0.04, -0.3], ...Array.from({ length: 5 }, (_, i) => ['tick', 8.4 + i * 0.1, 0.03]),
    ...Array.from({ length: 16 }, (_, i) => ['tick', 12.6 + i * 0.22, 0.025]),
    ['tick', WIN, 0.06], ['pop', WIN + 0.05, 1318.51, 0.05, 0], ['glitter', WIN, WIN + 0.8], ['bell', WIN + 0.1, 1760, 0.03, 1.2, 0],
    ['pop', 31.3, 1567.98, 0.05, 0], ['glitter', 31.3, 31.8],
  ],
})
