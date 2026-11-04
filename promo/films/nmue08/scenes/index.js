// nmue08: THE MAKE-UP TALK, Ep 8 "The sorry is a start." (28 s vertical, promo/films/next30/b31.md, music: house · A)
// The show's spine lives in ../../nmue01/scenes/mukit.js. Story 0–25.6, then the shared short end card.
//   0.0–3.0    "Sorry… | *again?*"  ♉ Taurus bursts in late, mid-hop; ♐ Sagittarius sits by a cold dinner, the
//              clock says 8:40.
//   3.0–9.6    "Same sorry. | *Every* week."  Sagittarius flips a board: sticky notes pop on one by one, all
//              "sorry!!" (MON · THU · SAT · TUE …). Taurus: "sorry!!" again; Sagittarius: deadpan.
//   9.6        hard cut into the move (no card transition).
//   9.7–17.2   "Sorry *plus* a plan."  THE STARS: "a sorry says *I see it.*" → "a change says *I mean it.*"  One
//              sticky note flips into a plan: "running late? → text by 6."
//   17.2–22.4  "Next *Thursday*…"  A phone buzzes at 5:58 PM: "running 15 late, sorry! still on?"  SAGITTARIUS:
//              "you *texted!* see you at 6:15."  The heart mends (21.0).
//   22.4–25.5  "Then prove it | on *Thursday.*"
import { makeEpisode, T, R, box, bubble, label, note, shadow, room, sparkles, pop01, outK, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, RED, INTER, MONO, r3 } from '../../nmue01/scenes/mukit.js'

function clock(x, cx, cy, r, h, m, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#fff1c8'; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; R(x, INK, Math.cos(a) * r * 0.82 - 3, Math.sin(a) * r * 0.82 - 3, 6, 6) }
  const hand = (a, L, w, c) => { x.save(); x.rotate(a); R(x, c, -w / 2, -L, w, L); x.restore() }
  hand((h % 12 + m / 60) / 12 * Math.PI * 2, r * 0.5, 8, INK); hand(m / 60 * Math.PI * 2, r * 0.75, 6, RED)
  x.restore()
}
// a plate with a cold dinner (a little noodle swirl, a frost sparkle)
function dinner(x, t, cx, cy) {
  x.fillStyle = INK; x.beginPath(); x.ellipse(cx, cy, 98, 34, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#f4f1ea'; x.beginPath(); x.ellipse(cx, cy - 4, 90, 28, 0, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 6; i++) R(x, '#e8c26a', cx - 40 + i * 14, cy - 16 + (i % 2) * 6, 12, 8)
  label(x, '*cold*', cx + 70, cy - 50, { size: 22, col: '#bfe8ff', alpha: 0.7 + 0.3 * Math.sin(t * 3) })
}
function sticky(x, cx, cy, lines, { k = 1, rot = 0, col = '#ffe27a', size = 26 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.35)'; x.fillRect(-62, -52, 130, 120)
  box(x, -66, -60, 132, 120, col, { b: 4 }); R(x, 'rgba(0,0,0,0.08)', -66, -60, 132, 18)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => { x.font = i ? `700 ${size - 6}px ${MONO}` : `800 ${size}px ${INTER}`; x.fillStyle = i ? '#7a5a1a' : INK; x.fillText(l, 0, -8 + i * 34) })
  x.restore()
}
const DAYS = ['MON', 'THU', 'SAT', 'TUE', 'FRI', 'WED', 'SUN', 'MON']

const EP = makeEpisode({
  id: 'nmue08', ep: 8, A: 'taurus', B: 'sagittarius', accent: '#ffcf6b',
  heads: {
    hook: 'Sorry… | *again?*',
    trap: 'Same sorry. | *Every* week.',
    move: 'Sorry *plus* | a plan.',
    try: 'Next *Thursday*…',
    last: 'Then prove it | on *Thursday.*',
  },
  heart: { hook: { x: 540, y: 520, cell: 14 } },
  lines: [
    { t: 10.25, who: 'S', text: 'a sorry says *I see it.*' },
    { t: 12.7, who: 'S', text: 'a change says *I mean it.*' },
    { t: 18.8, who: 'B', text: 'you *texted!* see you at 6:15.' },
  ],
  hook(x, t, S) {
    room(x, t)
    clock(x, 860, 720, 62, 8, 40)
    dinner(x, t, 640, 1120)
    shadow(x, 260, 1150, 220); shadow(x, 840, 1150, 220)
    S.A(x, t, { x: 260 - 20 * Math.max(0, 1 - t), y: 1010, s: 240, mood: 'wide', look: [1, 0], hops: [-0.15, 0.45, 1.05], squash: -0.05 })
    S.B(x, t, { x: 840, y: 1020, s: 240, mood: 'squint', look: [-1, 0], hops: [-0.02] })
    label(x, 'huff… huff…', 250, 830, { size: 26, col: BONE, alpha: 0.9 })
  },
  trap(x, t, S) {
    const u = S.u
    room(x, t)
    // the board
    const bk = pop01(t, S.t0 + 0.1, 0.35, 2)
    if (bk > 0.01) { x.save(); x.translate(560, 620); x.scale(bk, bk); box(x, -300, -170, 600, 340, '#b98a5a', { b: 8, hi: '#d4a878' }); x.restore() }
    DAYS.forEach((d, i) => {
      const at = S.t0 + 0.6 + i * 0.55
      const k = pop01(t, at, 0.22, 3)
      sticky(x, 330 + (i % 4) * 152, 545 + Math.floor(i / 4) * 150, ['sorry!!', d], { k: k * 0.95, rot: ((i * 7) % 5 - 2) * 0.05, col: i % 3 === 2 ? '#ffb3c8' : '#ffe27a' })
    })
    shadow(x, 220, 1150, 210); shadow(x, 860, 1150, 210)
    S.A(x, t, { x: 220, y: 1030, s: 220, mood: u > 5 ? 'wide' : 'happy', look: [1, -0.5], hops: [S.t0 + 4.9, S.t0 + 5.3] })
    S.B(x, t, { x: 860, y: 1030, s: 220, mood: 'squint', look: [-1, -0.5] })
    bubble(x, t, 250, 860, S.t0 + 4.9, S.t1 - 0.1, 'sorry!!', { size: 40, tail: -0.2 })
    if (u > 5.6) label(x, '…', 860, 860, { size: 56, col: BONE, font: INTER, weight: 800 })
  },
  move(x, t, S) {
    const u = S.u, ok = outK(t, [S.t1 - 0.2, S.t1])
    room(x, t, { a: ok })
    const k = pop01(t, S.t0 + 0.05, 0.3, 2) * ok
    S.A(x, t, { x: 330, y: 1170, s: 170, pop: k, mood: u > 4 ? 'sparkle' : 'neutral', look: [1, -1], talk: false })
    S.B(x, t, { x: 750, y: 1170, s: 170, pop: k, mood: u > 4 ? 'happy' : 'neutral', look: [-1, -1], talk: false })
    // one sticky note flips into the plan
    const f = prog(t, 13.6, 14.1), sx = Math.abs(Math.cos(Math.PI * f))
    const nk = pop01(t, 10.4, 0.3, 2.4) * ok
    x.save(); x.translate(540, 760); x.scale(Math.max(0.02, sx), 1)
    if (f < 0.5) sticky(x, 0, 0, ['sorry!!', 'AGAIN'], { k: nk * 2.2, rot: -0.03 })
    else note(x, 0, 0, 520, 260, ['running late?', '*→ text by 6.'], { k: nk, size: 50, accent: '#2f8f5a', col: '#e9fbe9' })
    x.restore()
    if (t > 14.1) sparkles(x, t, 540, 760, 14.1, 12, 270, 1, [GOLD, BONE, '#7dffb0'])
  },
  try(x, t, S) {
    const ok = S.ok
    room(x, t, { a: ok })
    const buzz = 17.9
    shadow(x, 300, 1140, 220 * ok); shadow(x, 790, 1140, 220 * ok)
    S.A(x, t, { x: 300, y: 1020, s: 230, pop: ok, mood: t > T.mend ? 'happy' : 'sparkle', look: [1, 0], hops: [T.mend + 0.05, T.h4Land + 0.05] })
    S.B(x, t, { x: 790, y: 1020, s: 230, pop: ok, mood: t > 18.7 ? 'happy' : 'neutral', look: [-1, -0.6], hops: [buzz + 0.1, 18.8, T.mend + 0.12, T.h4Land + 0.15] })
    // the phone + its text
    const pk = pop01(t, buzz, 0.3, 2.4) * outK(t, [T.try[1] - 0.3, T.try[1]])
    if (pk > 0.01) {
      const sh = t > buzz && t < buzz + 0.6 ? 6 * Math.sin((t - buzz) * 80) : 0
      x.save(); x.translate(870 + sh, 600); x.scale(pk * 0.82, pk * 0.82); x.rotate(0.06)
      box(x, -140, -170, 280, 340, '#2a2148', { b: 8 }); R(x, '#14102a', -122, -150, 244, 300)
      x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#9fe6b0'; x.fillText('5:58 PM', 0, -112)
      box(x, -110, -70, 220, 150, '#3b3466', { b: 0 })
      x.font = `700 26px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'left'
      x.fillText('running 15 late,', -96, -36); x.fillText('sorry! still on?', -96, 0); x.fillText(`— ${'♉︎'} Taurus`, -96, 44)
      x.restore()
      if (t > buzz && t < buzz + 0.8) label(x, 'bzzt', 640, 500, { size: 34, col: '#9fe6b0', font: INTER, weight: 800, rot: -0.15 })
    }
  },
  cues: [
    ['tom', 0.1, 120, { gain: 0.14, decay: 0.12 }], ['tom', 0.5, 120, { gain: 0.14, decay: 0.12 }], ['tom', 1.1, 120, { gain: 0.14, decay: 0.12 }],
    ['whoosh', 3.1, 0.3, 0.03], ...DAYS.map((d, i) => ['pop', r3(3.6 + i * 0.55), [880, 987.77, 1174.66, 1318.51][i % 4], 0.035, (i % 2 ? 0.3 : -0.3)]),
    ['pop', 7.9, 659.25, 0.04, -0.3], ['tick', 8.6, 0.03],
    ['whoosh', 13.6, 0.5, 0.035], ['tick', 13.85, 0.05], ['pop', 14.1, 1318.51, 0.05, 0], ['bell', 14.15, 1760, 0.03, 1.0, 0], ['glitter', 14.1, 14.5],
    ...Array.from({ length: 6 }, (_, i) => ['tick', r3(17.9 + i * 0.09), 0.03]), ['pop', 17.95, 1174.66, 0.04, 0.3], ['pluck', 18.8, 1318.51, 0.03, 0.5, 0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [lerp, clamp, ease, easeOutBack, GOLD]
