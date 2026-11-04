// nmue07: THE MAKE-UP TALK, Ep 7 "Let the sorry land." (28 s vertical, promo/films/next30/b31.md, music: cinematic · Fm)
// The show's spine lives in ../../nmue01/scenes/mukit.js. Story 0–25.6, then the shared short end card.
// Pisces is half of the couple this week, so it cries in the scene itself.
//   0.0–3.0    "They said sorry. | Now *your* move."  ♒ Aquarius holds out a folded apology letter; ♓ Pisces, already
//              teary, stares at it.
//   3.0–9.6    "'It's fine.' | (It was *not* fine.)"  PISCES: "it's fine!" while a little sign pops up over its head:
//              NOT FINE. Then: "…say it again?" Aquarius re-apologises; the letters stack up in its arms (SORRY ·
//              SORRY 2 · SORRY (FINAL) · SORRY (FINAL FINAL)).
//   9.6        hard cut into the move (no card transition).
//   9.7–17.2   "Let it *land.*"  THE STARS: "'it's fine' when it isn't keeps the *crack.*" → "try: 'thank you. I
//              *needed* that.'"  One letter floats down, slow and gentle, into a little tray: RECEIVED.
//   17.2–22.4  "Receive it | *kindly.*"  PISCES: "thank you. I *needed* that."  AQUARIUS: "*phew.* I meant every
//              word."  The heart mends (21.0); Pisces fountains, happy.
//   22.4–25.5  "Let the | sorry *land.*"
import { makeEpisode, T, R, box, bubble, label, note, shadow, room, sparkles, pop01, outK, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, RED, INTER, MONO, r3 } from '../../nmue01/scenes/mukit.js'

// a folded letter with a little heart seal
function letter(x, cx, cy, { k = 1, rot = 0, text = '' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  box(x, -70, -46, 140, 92, '#f4e8cc', { b: 5 })
  x.fillStyle = '#d9c7a0'; x.beginPath(); x.moveTo(-70, -46); x.lineTo(0, 6); x.lineTo(70, -46); x.lineTo(70, -38); x.lineTo(0, 14); x.lineTo(-70, -38); x.fill()
  R(x, '#e8344e', -10, -2, 20, 16); R(x, '#e8344e', -14, -6, 10, 10); R(x, '#e8344e', 4, -6, 10, 10)
  if (text) { x.font = `800 18px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText(text, 0, 32) }
  x.restore()
}
// the little sign that pops up above a star's head
function headSign(x, t, cx, cy, text, k) {
  if (k <= 0.01) return
  const bob = 6 * Math.sin(t * 6)
  x.save(); x.translate(cx, cy + bob); x.scale(k, k); x.rotate(0.05 * Math.sin(t * 4))
  R(x, INK, -5, 20, 10, 70); R(x, '#a07850', -2, 20, 4, 68)
  box(x, -110, -34, 220, 60, BONE, { b: 6 })
  x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#d23a4e'; x.fillText(text, 0, -2)
  x.restore()
}

const EP = makeEpisode({
  id: 'nmue07', ep: 7, A: 'aquarius', B: 'pisces', accent: '#8fd6ff',
  heads: {
    hook: 'They said sorry. | Now *your* move.',
    trap: "'It's fine.' | (It was *not* fine.)",
    move: 'Let it *land.*',
    try: 'Receive it | *kindly.*',
    last: 'Let the | sorry *land.*',
  },
  heart: { hook: { x: 540, y: 560, cell: 14 } },
  lines: [
    { t: 10.25, who: 'S', text: "'it's fine' when it isn't keeps the *crack.*" },
    { t: 13.0, who: 'S', text: "try: 'thank you. I *needed* that.'" },
    { t: 17.6, who: 'B', text: 'thank you. I *needed* that.' },
    { t: 19.3, who: 'A', text: '*phew.* I meant every word.' },
  ],
  hook(x, t, S) {
    room(x, t)
    const reach = 6 * Math.sin(t * 3)
    S.couple(x, t, { a: { mood: 'neutral', look: [1, 0], hops: [-0.1, 1.5] }, b: { mood: 'wide', look: [-1, 0.6], tears: 2, hops: [-0.03] } })
    letter(x, 470 + reach, 1000, { rot: -0.08 })
  },
  trap(x, t, S) {
    const u = S.u
    room(x, t)
    const again = S.t0 + 3.2
    S.couple(x, t, {
      a: { mood: u > 3.4 ? 'neutral' : 'happy', look: [1, 0], hops: [S.t0 + 3.6, S.t0 + 4.2, S.t0 + 4.8, S.t0 + 5.4] },
      b: { mood: u < 3.2 ? 'happy' : 'squint', look: [-1, 0], tears: u < 3.2 ? 2 : 1, hops: [S.t0 + 0.3, again] },
    })
    bubble(x, t, 760, 780, S.t0 + 0.3, again, "it's fine!", { size: 40, tail: 0.2 })
    headSign(x, t, 800, 620, 'NOT FINE', pop01(t, S.t0 + 1.2, 0.3, 2.6) * outK(t, [again - 0.15, again]))
    bubble(x, t, 760, 760, again, S.t1 - 0.1, '…say it again?', { size: 36, tail: 0.2 })
    // the letters stack up in Aquarius' arms
    const names = ['SORRY', 'SORRY 2', 'SORRY v3', 'FINAL SORRY']
    letter(x, 470, 1060, { rot: -0.06 })
    names.forEach((nm, i) => {
      const at = S.t0 + 3.6 + i * 0.6
      const k = pop01(t, at, 0.25, 2.4)
      if (k > 0.01) letter(x, 470 + ((i * 13) % 5 - 2) * 8, 990 - i * 72, { k, rot: ((i * 7) % 5 - 2) * 0.06, text: nm })
    })
  },
  move(x, t, S) {
    const u = S.u, ok = outK(t, [S.t1 - 0.2, S.t1])
    room(x, t, { a: ok })
    const k = pop01(t, S.t0 + 0.05, 0.3, 2) * ok
    S.A(x, t, { x: 330, y: 1170, s: 170, pop: k, mood: u > 3.6 ? 'happy' : 'neutral', look: [1, -1], talk: false })
    S.B(x, t, { x: 750, y: 1170, s: 170, pop: k, mood: u > 3.6 ? 'sparkle' : 'wide', look: [-1, -1], tears: 2, talk: false })
    // the tray
    const tk = pop01(t, 12.6, 0.3, 2) * ok
    if (tk > 0.01) {
      x.save(); x.translate(540, 960); x.scale(tk, tk)
      box(x, -150, -20, 300, 70, '#c98a5a', { b: 7, hi: '#e2a878' })
      label(x, 'RECEIVED', 0, 18, { size: 28, col: '#fff1c8', font: INTER, weight: 800 })
      x.restore()
    }
    // the letter floats down, slow, swaying
    const f = ease.inOutSine ? ease.inOutSine(prog(t, 13.0, 15.0)) : ease.inOutCubic(prog(t, 13.0, 15.0))
    const lk = pop01(t, 11.0, 0.35, 2) * ok
    if (lk > 0.01) letter(x, 540 + 70 * Math.sin(f * Math.PI * 2) * (1 - f), lerp(560, 925, f), { k: lk * 1.3, rot: 0.25 * Math.sin(f * Math.PI * 2) * (1 - f) })
    if (t > 15.0) { sparkles(x, t, 540, 940, 15.0, 10, 180, 1, [GOLD, BONE, '#8fd6ff']); label(x, '✓', 690, 900, { size: 54, col: '#7dffb0', font: INTER, weight: 800, alpha: clamp(prog(t, 15.0, 15.2)) * ok }) }
  },
  try(x, t, S) {
    const ok = S.ok
    room(x, t, { a: ok })
    shadow(x, 320, 1140, 220 * ok); shadow(x, 760, 1140, 220 * ok)
    const exhale = t > 19.3 && t < 19.9 ? 0.12 : 0
    S.A(x, t, { x: 320, y: 1020, s: 230, pop: ok, mood: t > 19.3 ? 'happy' : 'neutral', look: [1, 0], squash: exhale, hops: [T.mend + 0.05, T.h4Land + 0.05] })
    S.B(x, t, { x: 760, y: 1020, s: 230, pop: ok, mood: t > T.mend ? 'happy' : 'sparkle', look: [-1, 0], tears: t > T.mend ? 3 : 2, hops: [17.65, T.mend + 0.12, T.h4Land + 0.15] })
    letter(x, 900, 1110, { k: 0.8 * ok, rot: 0.1 })
  },
  cues: [
    ['pop', 3.3, 1174.66, 0.04, 0.3], ['pop', 4.2, 1318.51, 0.045, 0.3], ['tick', 4.25, 0.04], ['pluck', 6.2, 523.25, 0.03, 0.5, 0.3],
    ...[0, 1, 2, 3].map(i => ['pop', r3(6.6 + i * 0.6), [880, 987.77, 1174.66, 1318.51][i], 0.04, -0.3]),
    ['pop', 11.0, 987.77, 0.035, 0], ['pop', 12.6, 739.99, 0.035, 0], ['whoosh', 13.0, 1.8, 0.02], ['bell', 15.0, 1760, 0.035, 1.2, 0], ['glitter', 15.0, 15.4],
    ['pluck', 19.35, 587.33, 0.03, 0.6, -0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [RED, note, MONO, easeOutBack]
