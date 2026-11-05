// kcie13: CAUGHT IN 4K, "Sagittarius swore off dating (on Saturday)" (short, hard cut, music: pop · D). Rows: m02.md #13
// World time w:
//   0.0  Saturday brunch. Sag stands, glass up: "I'M DONE WITH DATING. FREE ERA!" A banner drops; a FREE ERA sash.
//   1.8  the table cheers.  2.4 BZZT: "hey :) free sunday?"  2.8 Sag, still mid-toast, thumbs a reply: "see you sunday :)"
//   3.4  = the freeze (frame 0).  4.0 the planner: SAT free era ✓ · SAT 9 PM just one reply · SUN date.
//   5.9  score cards from the friends: "19 HRS", "NEW RECORD". Pisces sobs: "the era was so short".
//   7.4  Sunday: Sag on the date, still wearing the FREE ERA sash. Last line 8.0. Hard cut 9.6.
import {
  makeCaught, room, furn, phone, star, pisces, bubble, sticker, label, box, R, sparkles, confetti,
  pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, MINT, INTER,
} from '../../kcie01/caughtkit.js'

const C = 3.4, END = 9.6
const SAG = { x: 540, y: 1080, s: 340 }, PIS = { x: 900, y: 1590, s: 170 }
const PLAN = [[4.0, 'SAT · free era ✓'], [4.5, 'SAT 9 PM · “just one reply”'], [5.0, 'SUN · date']]

function sash(x, cx, cy, s) {
  x.save(); x.translate(cx, cy); x.rotate(-0.5)
  box(x, -s * 0.62, -22, s * 1.24, 44, '#ff8fb1', { b: 4 })
  label(x, 'FREE ERA', 0, 2, { size: 26, col: INK, shadow: false, font: INTER, weight: 800 })
  x.restore()
}
function glass(x, cx, cy) { box(x, cx - 22, cy - 50, 44, 80, '#ffd27a', { b: 4, hi: '#fff3c4' }); R(x, INK, cx - 4, cy + 34, 8, 30); R(x, INK, cx - 20, cy + 62, 40, 8) }

function brunch(x, w) {
  room(x, 'brunch', { fy: 1400 })
  box(x, 60, 330, 360, 280, BONE, { b: 6 }); const g = x.createLinearGradient(0, 344, 0, 596); g.addColorStop(0, '#8fd0f6'); g.addColorStop(1, '#ffe2b8'); x.fillStyle = g; x.fillRect(74, 344, 332, 252)
  furn.plant(x, 960, 1390, 1.2)
  // the banner
  const bk = pop01(w, 0.6, 0.3, 2.2)
  if (bk > 0.01) { x.save(); x.translate(560, 680); x.scale(bk, bk); x.rotate(-0.02); box(x, -360, -55, 720, 110, '#fff8ea', { b: 6 }); label(x, 'I’M DONE WITH DATING', 0, 2, { size: 50, col: RED, shadow: false, font: INTER, weight: 800 }); x.restore() }
  // friends
  star(x, w, 'taurus', { x: 190, y: 1230, s: 220, mood: w > 5.9 ? 'squint' : 'happy', look: [1, -0.4], hops: [1.85, 2.1, 5.95], seed: 9 })
  star(x, w, 'libra', { x: 890, y: 1230, s: 220, mood: w > 5.9 ? 'wide' : 'happy', look: [-1, -0.4], hops: [1.9, 2.2, 6.05], seed: 1 })
  // Sag mid-toast
  let mood = 'sparkle', look = [0, -0.5]
  if (w > 2.4 && w < 3.4) { mood = 'squint'; look = [1, 0.4] }
  if (w > 3.4 && w < 4.0) { mood = 'happy'; look = [0, 0] }
  if (w > 4.0) { mood = 'wink'; look = undefined }
  star(x, w, 'sagittarius', { ...SAG, mood, look, hops: [0.2, 0.6, 1.0, 1.85, 3.45, 5.95], seed: 11 })
  if (w > 0.6) sash(x, SAG.x, SAG.y + 110, SAG.s * 0.85)
  glass(x, SAG.x - 200, SAG.y - 140 + (w < 1.8 ? -20 * Math.abs(Math.sin(w * 4)) : 0))
  bubble(x, w, SAG.x, SAG.y - 330, 0.2, 1.75, 'FREE ERA!', { size: 52, col: GOLD })
  if (w > 1.8 && w < 2.5) confetti(x, w, 1.8, 540, 900)
  // the table
  box(x, 60, 1300, 960, 60, '#fff8ea', { b: 6 }); R(x, INK, 120, 1366, 20, 120); R(x, INK, 940, 1366, 20, 120)
  for (const [px, col] of [[250, '#f2c75c'], [470, '#e8634a'], [700, '#9fe6b0']]) box(x, px, 1270, 120, 34, col, { b: 4 })
  // the phone
  if (w > 2.4) {
    const k = pop01(w, 2.4, 0.3, 2) * (w > 3.9 ? outK(w, [3.9, 4.1]) : 1)
    const draft = w > 2.8 && w < 3.3 ? { text: 'see you sunday :)'.slice(0, Math.floor((w - 2.8) * 36)) } : null
    phone(x, w, { cx: 850, cy: 980, w: 340, h: 420, rot: 0.08, title: '♡ hmm', alpha: clamp(k), draft, msgs: [{ w: 2.4, side: 'L', text: 'hey :) free sunday?' }, { w: 3.3, side: 'R', text: 'see you sunday :)' }], fs: 28 })
  }
  // the planner
  if (w > 4.0) {
    const k = pop01(w, 4.0, 0.3, 2) * outK(w, [5.8, 6.0])
    x.save(); x.translate(560, 900); x.scale(k, k)
    box(x, -330, -170, 660, 340, '#fff8ea', { b: 6 }); R(x, '#d0566e', -330, -170, 660, 50); label(x, 'THIS WEEKEND', 0, -145, { size: 28, col: '#fff', shadow: false })
    PLAN.forEach(([t0, txt], i) => { if (w > t0) label(x, txt, -300, -70 + i * 80, { size: 34, col: i === 2 ? RED : INK, align: 'left', shadow: false, font: INTER, weight: 800, alpha: pop01(w, t0, 0.2, 2) }) })
    x.restore()
  }
  // score cards
  if (w > 5.9) for (const [cx, txt, d] of [[190, '19 HRS', 0], [890, 'NEW RECORD', 0.12]]) { const k = pop01(w, 5.9 + d, 0.3, 2.6); x.save(); x.translate(cx, 960); x.rotate(d ? 0.08 : -0.08); x.scale(k, k); box(x, -120, -50, 240, 100, BONE, { b: 6 }); R(x, INK, -6, 50, 12, 70); label(x, txt, 0, 2, { size: txt.length > 7 ? 30 : 46, col: RED, font: INTER, weight: 800, shadow: false }); x.restore() }
  pisces(x, w, { ...PIS, mood: 'sparkle', look: [-1, -0.8], tears: w > 5.9 ? 3 : 1, hops: [1.9, 6.1, 6.4] })
  bubble(x, w, PIS.x - 120, PIS.y - 180, 6.1, 7.35, 'the era was|so short', { size: 32, col: '#bfe9ff', tail: 0.5 })
}

function sunday(x, w) {
  room(x, 'cafe', { fy: 1420 })
  box(x, 60, 360, 600, 500, '#2a1714', { b: 8 }); x.fillStyle = '#120c2e'; x.fillRect(76, 376, 568, 468)
  for (let i = 0; i < 9; i++) R(x, i % 2 ? GOLD : '#ffb86b', 100 + i * 60, 800 - (i % 3) * 30, 14, 14)
  sticker(x, w, 540, 520, 7.45, 8.0, '*SUNDAY*', { size: 56, col: GOLD })
  pisces(x, w, { x: 930, y: 940, s: 140, mood: 'sparkle', tears: 3, look: [-1, 0.5], hops: [7.6] })
  furn.table(x, 540, 1260, 520, '#6b4a2f')
  star(x, w, 'sagittarius', { x: 310, y: 1240, s: 280, mood: 'happy', look: [1, 0], hops: [7.5, 8.1, 8.6], seed: 11 })
  sash(x, 310, 1330, 240)
  star(x, w, 'leo', { x: 780, y: 1240, s: 280, mood: 'happy', look: [-1, 0], hops: [7.6, 8.2], seed: 3, blush: true })
  bubble(x, w, 780, 950, 7.7, END + 1, 'nice sash.', { size: 40, tail: 0.1 })
  sparkles(x, w, 310, 1240, 7.5, 10, 200, 1)
}

const world = (x, w) => (w < 7.4 ? brunch(x, w) : sunday(x, w))

const EP = makeCaught({
  id: 'kcie13', sign: 'sagittarius', name: 'Sagittarius',
  hook: 'Swore off dating. | Date on *Sunday.*', hookColor: '#ff8fb1',
  earlier: 'SATURDAY, 11 AM', clock0: '11:00', clockScale: 2,
  clockAt: w => (w < 7.4 ? `SAT 11:0${Math.min(9, Math.floor(w))}` : 'SUN 19:30'),
  catches: [{ s: 0, c: C, circle: () => ({ x: SAG.x, y: SAG.y - 20, rx: 200, ry: 200, lx: 300, ly: 1440, labelSide: 1 }) }],
  frame: { z: 1.06, fx: 540, fy: 1000 },
  ending: 'cut', wEnd: END, lastAt: 8.0,
  last: 'The era lasted | *nineteen hours.*', lastColor: '#ff8fb1',
  world,
  cues: [
    ['pop', 0.2, 880, 0.05, 0], ['pop', 0.35, 1174.66, 0.04, 0], ['whoosh', 0.6, 0.3, 0.04], ['tom', 0.65, 120, { gain: 0.25, decay: 0.2 }],
    ['clap', 1.85, { gain: 0.14, pan: -0.3 }], ['clap', 2.05, { gain: 0.14, pan: 0.3 }], ['clap', 2.25, { gain: 0.12 }], ['glitter', 1.8, 2.3],
    ['tick', 2.4, 0.06], ['tick', 2.47, 0.06], ['pop', 2.4, 987.77, 0.05, 0.4], ...Array.from({ length: 8 }, (_, i) => ['tick', +(2.8 + i * 0.06).toFixed(2), 0.02]), ['pop', 3.3, 1174.66, 0.05, 0.4],
    ['whoosh', 4.0, 0.3, 0.04], ...PLAN.map(([t0], i) => ['pop', t0, [659.25, 783.99, 987.77][i], 0.04, 0]),
    ['pop', 5.9, 1318.51, 0.045, -0.3], ['pop', 6.02, 1567.98, 0.04, 0.3], ['pluck', 6.15, 1174.66, 0.035, 0.6, 0.5],
    ['whoosh', 7.35, 0.3, 0.05], ['tick', 7.4, 0.08], ['bell', 7.5, 1760, 0.03, 1.0, 0], ['pop', 7.7, 880, 0.04, 0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [MINT, lerp, ease]
