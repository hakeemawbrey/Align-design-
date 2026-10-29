// st9scorpiowork (25 s vertical, Star Talk season 9 "A Day in the Life", S9 E37) · story 0–20.6, then the shared end card.
//   9 TO 5. "A Scorpio already knows who ate your *yogurt*."  The office at 11:40: Pisces stares into the fridge at an
//   empty shelf; behind it, Scorpio sits in its cubicle under a corkboard of red string (its season-4 detective board).
//   2.8   PISCES: "someone ate my *yogurt.*"   4.6 punch on Scorpio: "i know. i've known since *9:14.*"
//   7.6   the board close-up: the strings draw on, clue to clue: LID IN BIN 3 · SPOON STILL WARM · 9:14 AM · SUSPECT: ████
//   10.2  PISCES: "who?? *tell* me." · SCORPIO, softening: "…some secrets are *safe* with me."
//         Fact chip: Scorpio is the natural ruler of the 8th house (transformation, shared resources).
//   15.2  Scorpio is back with a new yogurt, a pink bow on top. "here. *strawberry.* your favorite."
//   17.4  frame 0's framing: Pisces hugging its yogurt, the board's string re-pinned into a heart.
//   17.8  last line: "Use your powers for *good*."
//   Rewatch bait: the suspect card stays redacted in every shot; the wall clock is stuck at 9:14. The ghost leans out from
//   behind the fridge at 11.4.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawBits } from '../../st5cast.js'
import { drawCorkboard, pinCard, redString, SCORPIO } from '../../st9scorpiohome.js'
import { makeDay, star, tag, pop01 } from '../../st9lskit.js'

const DUR = 25
const T = { hookOut: 2.8, l1: 2.8, punch: 4.6, l2: 4.8, board: 7.6, strings: 7.9, wide: 10.2, l3: 10.4, ghost: 11.4, l4: 12.4, fact: 12.6, leave: 13.6, pis: 15.2, give: 15.4, l5: 15.6, rhyme: 17.4, heart: 17.6, last: 17.8 }
const SCO = tag('scorpio'), PIS = tag('pisces')
const LINES = [
  { t: T.l1, speaker: PIS, text: 'someone ate my *yogurt.*', color: '#b5aefc' },
  { t: T.l2, speaker: SCO, text: 'i know. i’ve known since *9:14.*', color: SCORPIO.redHi },
  { t: T.l3, speaker: PIS, text: 'who?? *tell* me.', color: '#b5aefc' },
  { t: T.l4, speaker: SCO, text: '…some secrets are *safe* with me.', color: SCORPIO.redHi },
  { t: T.l5, speaker: SCO, text: 'here. *strawberry.* your favorite.', color: SCORPIO.pink },
]
const INK = '#0c0710', BONE = '#efe6d6'
const rr = Math.round
const R = (x, c, X, Y, W, H) => { x.fillStyle = c; x.fillRect(rr(X), rr(Y), rr(W), rr(H)) }
const block = (x, X, Y, W, H, c, hi, lo, o = 6) => { R(x, INK, X - o, Y - o, W + 2 * o, H + 2 * o); R(x, c, X, Y, W, H); if (hi) R(x, hi, X, Y, W, 6); if (lo) R(x, lo, X, Y + H - 6, W, 6) }
function label(x, text, cx, cy, size, col, font = "700 SIZEpx 'Space Mono', monospace") {
  x.save(); x.font = font.replace('SIZE', size); x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(text, cx, cy); x.restore()
}
const YOG = ['.ppppp.', 'wwwwwww', '.wwwww.', '.wSwSw.', '.wwwww.', '..www..']
const YOG_C = { p: '#ff9ac8', w: '#f4efe6', S: '#ff6a8a' }
const BOARD = { x0: 90, y0: 600, w: 400, h: 320 }
const FR = { x0: 780, x1: 1030, y0: 640, y1: 1240 }

function boardContents(x, r, t) {
  const w = r.x1 - r.x0, h = r.y1 - r.y0, P = (u, v) => [r.x0 + u * w, r.y0 + v * h]
  const yog = P(0.5, 0.48), clues = [P(0.15, 0.16), P(0.85, 0.16), P(0.15, 0.84), P(0.85, 0.84)]
  const heart = t > T.heart
  const k = heart ? 1 : prog(t, T.strings, T.strings + 1.6)
  if (heart) {
    x.save(); x.strokeStyle = SCORPIO.red; x.lineWidth = 5; const [cx, cy] = yog
    x.beginPath(); x.moveTo(cx, cy + 70); x.lineTo(cx - 90, cy - 10); x.lineTo(cx - 50, cy - 60); x.lineTo(cx, cy - 20); x.lineTo(cx + 50, cy - 60); x.lineTo(cx + 90, cy - 10); x.closePath(); x.stroke(); x.restore()
  } else clues.forEach((c, i) => redString(x, [c, yog], { k: clamp(k * 4 - i) }))
  const notes = [['LID IN', 'BIN 3'], ['SPOON:', 'STILL WARM'], ['9:14', 'AM'], ['SUSPECT:', '']]
  clues.forEach(([cx, cy], i) => {
    pinCard(x, cx, cy, 100, 62, { color: i === 3 ? BONE : '#fff3a8', rot: [-0.06, 0.05, 0.04, -0.05][i] })
    label(x, notes[i][0], cx, cy - 10, 14, '#5a3a1e'); if (notes[i][1]) label(x, notes[i][1], cx, cy + 10, 14, '#5a3a1e')
    if (i === 3) R(x, INK, cx - 38, cy + 2, 76, 16)                                   // redacted, always
  })
  pinCard(x, yog[0], yog[1], 80, 92, { color: BONE, photo: '#ffd1e8' })
  drawBits(x, YOG, YOG_C, rr(yog[0]), rr(yog[1] - 10), 6)
}
function office(x, t, sh) {
  const FL = 1240
  const g = x.createLinearGradient(0, 0, 0, FL); g.addColorStop(0, '#16141e'); g.addColorStop(1, '#2e2a3a')
  x.fillStyle = g; x.fillRect(0, 0, 1080, FL)
  for (let yy = 0; yy < 500; yy += 125) R(x, '#24202e', 0, yy, 1080, 4)
  // a window, the season's sky
  const win = { x0: 560, y0: 580, x1: 740, y1: 820 }
  R(x, INK, win.x0 - 12, win.y0 - 12, win.x1 - win.x0 + 24, win.y1 - win.y0 + 24)
  x.save(); x.beginPath(); x.rect(win.x0, win.y0, win.x1 - win.x0, win.y1 - win.y0); x.clip(); sh.sky(x); x.restore()
  R(x, '#5a5468', (win.x0 + win.x1) / 2 - 4, win.y0, 8, win.y1 - win.y0)
  // the wall clock, stuck at 9:14
  block(x, 600, 870, 110, 60, BONE, null, null, 5); label(x, '9:14', 655, 901, 30, SCORPIO.trim)
  // the floor
  R(x, '#24202c', 0, FL, 1080, 680); R(x, INK, 0, FL - 6, 1080, 6)
  for (let yy = FL + 40, k = 0; yy < 1920; yy += 60 + k * 10, k++) R(x, '#2e2a38', 0, yy, 1080, 4)
  // the board on the cubicle wall
  block(x, 60, 560, 460, 680, '#3a4a52', '#4a5a62', null, 6)
  drawCorkboard(x, t, BOARD.x0, BOARD.y0, BOARD.w, BOARD.h, boardContents)
  // the fridge (right), door open until Scorpio's yogurt goes in
  block(x, FR.x0, FR.y0, FR.x1 - FR.x0, FR.y1 - FR.y0, '#d8dcea', '#f2f4fa', '#a8aec2')
  R(x, '#f6f8ff', FR.x0 + 16, FR.y0 + 20, FR.x1 - FR.x0 - 32, 380)
  for (let k = 0; k < 3; k++) R(x, '#b8c0d4', FR.x0 + 16, FR.y0 + 140 + k * 120, FR.x1 - FR.x0 - 32, 6)
  drawBits(x, ['.gg.', 'gggg', 'gggg', '.gg.'], { g: '#6fbf6a' }, FR.x0 + 70, FR.y0 + 120, 8)         // someone's salad
  drawBits(x, ['bbbb', 'bccb', 'bbbb'], { b: '#c98a52', c: '#fff1c8' }, FR.x0 + 170, FR.y0 + 240, 8)  // a sandwich
  R(x, INK, FR.x0 + 110, FR.y0 + 310, 84, 18); label(x, 'PISCES ♡', FR.x0 + 152, FR.y0 + 319, 14, '#b5aefc')
  R(x, INK, FR.x0, 1060, FR.x1 - FR.x0, 6)
  return { win, floor: FL }
}

function scoState(t) {
  if (t < T.punch) return { mood: 'squint', look: [1, 0] }
  if (t < T.board) return { mood: 'squint', look: [1, 0], blink: false }
  if (t < T.wide) return { mood: 'squint', look: [-1, -1] }
  if (t < T.l4) return { mood: 'wide', look: [1, 0], blink: false }
  if (t < T.pis) return { mood: 'neutral', look: [1, 0] }
  return { mood: 'happy', look: [1, 0] }
}
function pisState(t) {
  if (t < T.l3) return { mood: 'sleepy', zzz: false, look: [1, 1] }
  if (t < T.give + 0.4) return { mood: 'wide', look: [-1, 0], blink: false }
  return { mood: 'heart' }
}
function scoX(t) {
  if (t < T.leave) return 290
  if (t < T.pis) return lerp(290, 1250, ease.inQuad(prog(t, T.leave, T.leave + 0.9)))
  if (t < T.rhyme) return lerp(1250, 560, ease.outCubic(prog(t, T.pis, T.pis + 0.5)))
  return 290
}
function tear(x, t, r) {
  for (let i = 0; i < 2; i++) { const p = ((t * 0.9 + i * 0.5) % 1); R(x, '#7fdcff', r.x - 40 + i * 80, r.y + 10 + p * 80, 10, 14) }
}

const EP = makeDay({
  numeral: 'S9 E37', sign: 'scorpio', ep: 'work', duration: DUR, key: 'Ebm',
  hook: { text: 'A Scorpio already knows who ate your *yogurt.*', out: [T.hookOut - 0.2, T.hookOut], accentColor: SCORPIO.pink, size: 90, accentSize: 132 },
  shots: [
    { at: 0, room: 'office', set: office, hour: 11.6, zoom: { x: 540, y: 1000, s: 1.12 } },
    { at: T.punch, room: 'office', set: office, hour: 11.7, zoom: { x: 300, y: 980, s: 1.4 } },
    { at: T.board, room: 'office', set: office, hour: 11.75, zoom: { x: 290, y: 780, s: 2.1 } },
    { at: T.wide, room: 'office', set: office, hour: 11.8, zoom: { x: 540, y: 1000, s: 1.12 } },
    { at: T.pis, room: 'office', set: office, hour: 12.1, zoom: { x: 700, y: 1040, s: 1.35 } },
    { at: T.rhyme, room: 'office', set: office, hour: 12.2, zoom: { x: 540, y: 1000, s: 1.12 } },
  ],
  clock: [{ at: 0, from: '11:40' }, { at: T.board, dur: 0.6, from: '11:40', to: '11:46' }, { at: T.pis, dur: 0.8, from: '11:46', to: '12:05', ampm: 'PM' }],
  stamps: [
    { at: 0.4, out: T.punch - 0.1, time: '11:40 AM', text: 'a *crime*', top: 1240 },
    { at: T.board + 0.2, out: T.wide - 0.1, time: '11:46 AM', text: 'case *closed*' },
    { at: T.pis + 0.1, out: T.rhyme - 0.1, time: '12:05 PM', text: 'after a quick *errand*' },
  ],
  lines: LINES, box: { close: 19.0 },
  fact: { at: T.fact, dur: 4.2, label: '★ ASTROLOGY SAYS', text: 'Scorpio is the natural ruler of the 8th house (transformation, shared resources).', color: SCORPIO.red },
  ghost: { room: 'office', at: T.ghost, x: FR.x0 - 6, y: 820, from: 'right' },
  battery: 0.66,
  pitch: { [SCO]: 523.25, [PIS]: 987.77 },
  cuts: [{ t: T.wide, kind: 'flip' }],
  draw(x, t, a, sh) {
    const rP = star(x, 'pisces', 760, 1130, 230, t, { ...pisState(t), seed: 8, hops: [T.l1, T.l3, T.give + 0.4] })
    if (t < T.l3) tear(x, t, rP)
    if (t > T.give) { const k = pop01(t, T.give, 0.35, 2.2); drawBits(x, YOG, YOG_C, rr(rP.x - 60), rr(rP.y + 40), 8 * k); drawBits(x, ['b.b', '.b.', 'b.b'], { b: '#ff6a8a' }, rr(rP.x - 60), rr(rP.y + 4), 6 * k) }
    const sx = scoX(t)
    const rS = star(x, 'scorpio', sx, 1110, 250, t, { ...scoState(t), seed: 6, hops: [T.l2, T.l4, T.give, T.l5] })
    if (t > T.pis && t < T.give) drawBits(x, YOG, YOG_C, rr(rS.x + 90), rr(rS.y + 30), 8)
    // the cubicle partition in front of Scorpio when it's at its desk
    if (sx < 400) { block(x, 60, 1150, 460, 90, '#3a4a52', '#4a5a62', null, 6); R(x, '#5a4a6a', 120, 1160, 120, 30) }
    void a; void sh
  },
  last: { at: T.last, text: 'Use your powers for *good.*', accentColor: SCORPIO.pink },
  cues: [
    ['pluck', 0.4, 392, 0.04, 0.5, 0.4],
    ...Array.from({ length: 4 }, (_, i) => ['tick', +(T.strings + i * 0.4).toFixed(3), 0.05]),
    ['tom', T.strings + 1.65, 0.07], ['pop', T.strings + 1.7, 523.25, 0.05, 0],
    ['whoosh', T.leave, 0.4, 0.03], ['whoosh', T.pis, 0.35, 0.03],
    ['pop', T.give, 1318.51, 0.05, 0.3], ['glitter', T.give, T.give + 0.7], ['bell', T.give + 0.4, 1760, 0.02, 1.2, 0.3],
    ['pluck', T.heart, 1046.5, 0.04, 0.6, -0.3],
  ],
})
export const { DURATION, SCENES, CUES } = EP
export { T }
