// kcie07: CAUGHT IN 4K, "The Libra committee answers 'hey'" (short, hard cut, music: jazzy · G). Rows: m02.md #7
// World time w:
//   0.0  "hey" arrives. Libra: EMERGENCY MEETING. 0.5 four friends pop in round the phone (Gemini, Aquarius, Virgo, Pisces).
//   1.5  the whiteboard: drafts "hey!", "hey :)", "heyyy", "hello." 3.6 the VOTE: tally marks… TIE. 4.6 RECOUNT!
//   5.2  = the freeze (frame 0): Libra mid-shout "RECOUNT!", the committee crowded round one phone.
//   6.0  Pisces breaks the tie for "hey :)" in tears ("it's so beautiful"). 6.9 TWO HOURS LATER. 7.3 Libra sends… "hey!"
//   8.0  the reply: "lol wrong chat sorry". Everyone: wide eyes. Last line 8.6. Hard cut 10.2.
import {
  makeCaught, room, furn, phone, star, pisces, bubble, sticker, label, box, R, sparkles, confetti,
  pop01, outK, prog, clamp, INK, BONE, GOLD, PINK, RED, MINT, INTER,
} from '../../kcie01/caughtkit.js'

const C = 5.2, END = 10.2
const LIB = { x: 540, y: 1380, s: 300 }
const FR = [['gemini', 170, 1300, 200, 0.5], ['aquarius', 910, 1300, 200, 0.62], ['virgo', 150, 1560, 180, 0.74]]
const PIS = { x: 930, y: 1560, s: 180 }
const DRAFTS = [['hey!', 1.8, 2], ['hey :)', 2.25, 2], ['heyyy', 2.7, 1], ['hello.', 3.15, 0]]
const MSGS = [{ w: 0.05, side: 'L', text: 'hey' }, { w: 7.3, side: 'R', text: 'hey!' }, { w: 8.0, side: 'L', text: 'lol wrong chat sorry' }]

function world(x, w) {
  room(x, 'living', { fy: 1440 })
  // the whiteboard of drafts + votes
  const wk = pop01(w, 1.5, 0.3, 2)
  if (wk > 0.01) {
    x.save(); x.translate(540, 640); x.scale(wk, wk)
    furn.whiteboard(x, 0, 0, 700, 380)
    label(x, 'REPLY TO "hey"', 0, -150, { size: 30, col: RED, shadow: false })
    DRAFTS.forEach(([d, t0, votes], i) => {
      if (w < t0) return
      const y = -90 + i * 66
      label(x, d.slice(0, Math.ceil(d.length * clamp((w - t0) / 0.3))), -280, y, { size: 40, col: INK, font: INTER, weight: 800, align: 'left', shadow: false })
      // tally marks during the vote (and again for the recount)
      const vt = w > 4.6 && w < 5.0 ? 0 : Math.min(votes, Math.floor(clamp((w - (w > 4.6 ? 4.7 : 3.6)) / 0.6) * votes + 0.001))
      for (let v = 0; v < vt; v++) R(x, '#3d7cf0', 80 + v * 26, y - 22, 10, 44)
      if (i === 1 && w > 6.0) R(x, PINK, 80 + 2 * 26, y - 22, 10, 44)
    })
    if (w > 4.2) { const k = pop01(w, 4.2, 0.2, 3) * outK(w, [4.5, 4.6]); if (k > 0.01) label(x, 'TIE.', 230, 120, { size: 70, col: RED, font: INTER, weight: 800, rot: -0.15, alpha: k }) }
    if (w > 5.6 && w < 6.0) label(x, 'TIE. AGAIN.', 180, 120, { size: 56, col: RED, font: INTER, weight: 800, rot: -0.12, alpha: pop01(w, 5.6, 0.2, 3) })
    x.restore()
  }
  // Libra in the middle, holding the meeting
  let mood = 'wide', look = [0, -0.3]
  if (w > 1.5 && w < 3.6) { mood = 'squint'; look = [0, -1] }
  if (w > 3.6 && w < 4.6) { mood = 'neutral'; look = [0, -1] }
  if (w > 4.6 && w < 6.0) { mood = 'wide'; look = [0, 0] }
  if (w > 6.0 && w < 8.0) { mood = 'happy'; look = [0, 0.4] }
  if (w > 8.0) { mood = 'wide'; look = [0, 0.5] }
  star(x, w, 'libra', { ...LIB, mood, look, hops: [0.1, 0.35, 1.55, 3.65, 4.65, 4.85, 5.05, 7.35], seed: 1 })
  // the friends crowd in
  FR.forEach(([sg, fx, fy, fs, t0], i) => {
    const k = pop01(w, t0, 0.3, 2.2)
    const m = w > 8.0 ? 'wide' : w > 4.6 && w < 6 ? ['eyeroll', 'squint', 'neutral'][i] : ['happy', 'sparkle', 'squint'][i]
    star(x, w, sg, { x: fx, y: fy, s: fs, pop: k, mood: m, look: [fx < 540 ? 1 : -1, -0.6], seed: 10 + i, hops: [t0 + 0.1, 3.7 + i * 0.12, 8.05] })
  })
  const pk = pop01(w, 0.86, 0.3, 2.2)
  pisces(x, w, { ...PIS, pop: pk, mood: w > 8.0 ? 'wide' : w > 5.9 ? 'sparkle' : 'happy', look: [-1, -0.6], tears: w > 8 ? 3 : w > 5.9 ? 3 : 1, hops: [0.96, 6.0, 6.3, 8.05] })
  bubble(x, w, PIS.x - 120, PIS.y - 190, 6.0, 7.2, 'hey :) is SO|beautiful', { size: 32, col: '#bfe9ff', tail: 0.5 })
  // the phone everyone's staring at
  phone(x, w, { cx: 540, cy: 1010, w: 330, h: 420, rot: 0.02, title: '', msgs: MSGS, fs: 30 })
  // shouts + stickers
  bubble(x, w, 540, 680, 0.1, 1.45, 'EMERGENCY MEETING!', { size: 50, col: GOLD, tail: 0 })
  sticker(x, w, 540, 1680, 3.6, 4.5, 'the *vote*', { size: 44, col: GOLD })
  bubble(x, w, 540, 470, 4.65, C + 0.5, 'RECOUNT!', { size: 60, col: GOLD, tail: 0 })
  if (w > 6.9) { const k = pop01(w, 6.9, 0.3, 2.4); x.save(); x.translate(820, 1050); x.scale(k, k); furn.clock(x, 0, 0, 70, 10, 5); x.restore(); label(x, '+2 HOURS', 820, 1160, { size: 34, col: GOLD, alpha: clamp(k) }) }
  if (w > 7.3 && w < 8.0) sparkles(x, w, 540, 1000, 7.3, 10, 140, 2)
  if (w > 8.0) label(x, '…', 540, 820, { size: 90, col: BONE, alpha: pop01(w, 8.1, 0.2, 2) })
  void confetti
}

const EP = makeCaught({
  id: 'kcie07', sign: 'libra', name: 'Libra',
  hook: 'Four friends. One *‘hey.’* | Two hours.', hookColor: '#ffb3d1',
  earlier: '40 MINUTES EARLIER', clock0: '19:05', clockScale: 460,
  catches: [{ s: 0, c: C, circle: () => ({ x: LIB.x, y: LIB.y - 10, rx: 195, ry: 200, lx: 290, ly: 1625, labelSide: 1 }) }],
  ending: 'cut', wEnd: END, lastAt: 8.6,
  last: 'Two hours. It was | the *wrong chat.*', lastColor: '#ffb3d1',
  world,
  cues: [
    ['pop', 0.05, 987.77, 0.05, 0], ['pop', 0.15, 440, 0.06, 0], ['boom', 0.15, 0.15], ['tom', 0.15, 110, { gain: 0.25, decay: 0.2 }],
    ...FR.map(([, , , , t0], i) => ['pop', t0, [659.25, 783.99, 880][i], 0.04, i % 2 ? 0.4 : -0.4]), ['pop', 0.86, 987.77, 0.04, 0.4],
    ['whoosh', 1.5, 0.3, 0.04], ...DRAFTS.flatMap(([, t0]) => Array.from({ length: 4 }, (_, i) => ['tick', +(t0 + i * 0.07).toFixed(3), 0.03])),
    ...Array.from({ length: 5 }, (_, i) => ['tick', +(3.6 + i * 0.12).toFixed(3), 0.05]), ['pop', 4.2, 330, 0.05, 0], ['tom', 4.22, 90, { gain: 0.2, decay: 0.2 }],
    ['pop', 4.65, 440, 0.06, 0], ['boom', 4.65, 0.12],
    ['pop', 5.6, 311.13, 0.05, 0], ['pluck', 6.0, 1318.51, 0.04, 0.6, 0.4], ['glitter', 6.0, 6.4],
    ['whoosh', 6.9, 0.3, 0.04], ['bell', 7.0, 1760, 0.03, 1.2, 0.3], ['pop', 7.3, 1174.66, 0.05, 0], ['pop', 8.0, 987.77, 0.05, 0], ['pop', 8.1, 311.13, 0.04, 0], ['tom', 8.15, 80, { gain: 0.2, decay: 0.3 }],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [MINT]
