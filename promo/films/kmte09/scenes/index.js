// kmte09: MIRROR TALK No. 9, 'Running from "what are we?"' (20 s vertical, star_advice post, synthwave · F#m). Hard cut.
// Row: promo/films/month2/m21.md. No end card, no card cut.
//   0.00   frame 0: Sagittarius mid-sprint past the mirror, a talk card ("What are we?") chasing it, speed lines.
//          Hook "Running from | *“what are we?”*"  0.0–1.1: both whip off the left edge.
//   1.3    Sagittarius skids back in (dust); the card sails into the glass and the reflection catches it.
//   2.8    "Three months of *“hanging out.”*"  SAG: "what if it ruins *everything*?"
//   5.4    REFLECTION: "you like them. you're scared of a *cage*."  SAG: "…I like my *freedom*."
//   10.4   REFLECTION: "choosing someone can be the *adventure*."  13.0: the reflection hands the card back; Sagittarius
//          breathes, holds it. SAG: "okay. I'll *ask*."  Pisces: "they're growing!!"
//   18.2   last line "Choosing is | *freedom,* too."  Hard cut at 20.
import { makeMirror, drawTalkCard, bubble, hearts, sparkles, drawBits, pop01, outK, prog, lerp, clamp, ease, easeOutBack, R, INK, BONE, r3 } from '../../kmte01/mirrorkit.js'

const T = { exit: 1.1, skid: [1.3, 1.85], catch: 2.25, s1: 3.2, m1: 5.4, s2: 8.4, m2: 10.4, hand: [12.9, 13.5], s3: 13.9, pis: 15.6, last: 18.2 }
const Q = 'What are we?'

function speed(x, t, cx, cy, k, dir = 1) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = k
  for (let i = 0; i < 9; i++) {
    const yy = cy - 160 + i * 40, len = 120 + ((i * 73) % 5) * 40, off = ((t * 1400 + i * 97) % 300)
    R(x, i % 2 ? '#bff4ff' : BONE, cx + dir * (120 + off), yy, len * dir, 6)
  }
  x.restore()
}
function dust(x, t, t0, cx, cy) {
  const p = prog(t, t0, t0 + 0.7)
  if (p <= 0 || p >= 1) return
  for (let i = 0; i < 7; i++) drawBits(x, ['.WW.', 'WWWW', '.WW.'], { W: '#cfc6e6' }, cx - 40 - i * 34 - p * 60, cy - p * 40 * (i % 3), 8 * (1 - p * 0.5), { alpha: 1 - p })
}

const F = makeMirror({
  id: 'kmte09', sign: 'sagittarius', dur: 20,
  hook: { text: 'Running from | *“what are we?”*', accentColor: '#c9a6ff', out: [2.6, 2.85] },
  fx: [
    { k: 'whipZoom', at: T.skid[0] - 0.05, from: 1.35 },
    { k: 'screenShake', at: T.skid[1], amp: 16, len: 0.4 },
    { k: 'whipZoom', at: T.m1 - 0.08, from: 1.25 },
    { k: 'screenShake', at: T.s2 + 0.05, amp: 9, len: 0.3 },
    { k: 'whipZoom', at: T.m2 - 0.08, from: 1.3 },
    { k: 'whipZoom', at: T.hand[0] - 0.05, from: 1.2 },
  ],
  caps: [
    { at: 2.9, out: [10.1, 10.3], text: 'Three months of | *“hanging out.”*', accent: '#c9a6ff' },
    { at: 10.35, out: [17.9, 18.1], text: 'Choose your | *adventure.*', accent: '#8fe9ff' },
    { at: T.last, out: [99, 100], text: 'Choosing is | *freedom,* too.', accent: '#ffd36b', gap: 0.1 },
  ],
  lines: [
    { t: T.s1, who: 'S', text: 'what if it ruins *everything*?' },
    { t: T.m1, who: 'M', text: "you like them. you're scared of a *cage*." },
    { t: T.s2, who: 'S', text: '…I like my *freedom*.' },
    { t: T.m2, who: 'M', text: 'choosing someone can be the *adventure*.' },
    { t: T.s3, who: 'S', text: "okay. I'll *ask*." },
  ],
  boxes: [[3.0, 15.6]],
  pose(t) {
    if (t < T.skid[0]) {
      const r = ease.inCubic(prog(t, 0, T.exit))
      return { x: lerp(560, -260, r), y: 1150, s: 300, rot: -0.28, mood: 'wide', look: [-1, 0], blink: false, squash: -0.08 + 0.05 * Math.sin(t * 40) }
    }
    const k = ease.outCubic(prog(t, ...T.skid))
    const p = { x: lerp(-200, 300, k), y: 1225, s: 280, rot: lerp(0.35, 0, ease.outBack(prog(t, T.skid[1] - 0.1, T.skid[1] + 0.4))), mood: 'wide', look: [1, -0.6] }
    if (t > T.s1) { p.mood = 'neutral'; p.look = [1, -0.4] }
    if (t > T.m1) { p.mood = 'wide'; p.look = [1, -1] }
    if (t > T.s2) { p.mood = 'eyeroll'; p.look = undefined }
    if (t > T.s2 + 1.2) { p.mood = 'neutral'; p.look = [0.5, 0.4] }
    if (t > T.m2) { p.mood = 'sparkle'; p.look = [1, -0.8] }
    if (t > T.hand[1]) { p.mood = 'neutral'; p.look = [1, -0.2]; p.squash = 0.06 * Math.sin((t - T.hand[1]) * 3) }
    if (t > T.s3) { p.mood = 'happy'; p.look = undefined }
    return p
  },
  refl(t) {
    if (t < T.skid[0]) { const r = ease.inCubic(prog(t, 0, T.exit)); return { x: lerp(640, 200, r), y: 880, s: 260, rot: 0.28, mood: 'wide', look: [1, 0] } }
    const k = ease.outCubic(prog(t, T.skid[0], T.skid[1] + 0.2))
    const p = { x: lerp(1000, 650, k), y: 905, mood: 'neutral', look: [-1, 0.2] }
    if (t > T.catch) { p.mood = 'happy'; p.look = [-1, 0.6] }
    if (t > T.hand[0]) p.mood = 'sparkle'
    if (t > T.s3) p.mood = 'wink'
    return p
  },
  pis(t) {
    const p = { tears: 1, mood: 'wide', look: t < 1.2 ? [-1, 0] : [-1, -0.4] }
    if (t > T.m2) { p.tears = 2; p.mood = 'sparkle' }
    if (t > T.s3) { p.tears = 3; p.mood = 'happy' }
    return p
  },
  pisHops: [T.pis, T.pis + 0.4],
  tissuePulls: [T.s3 + 0.5, T.pis + 0.2],
  glass(x, t) {
    // the reflection holds the card (inside the glass) until it hands it back
    if (t > T.catch && t < T.hand[0] + 0.05) drawTalkCard(x, t, { cx: 520, cy: 790, w: 200, rot: -0.1 + 0.03 * Math.sin(t * 2), flip: 1, text: Q })
  },
  front(x, t, K) {
    // frame 0: the sprint and the chasing card
    const r = ease.inCubic(prog(t, 0, T.exit))
    if (t < T.skid[0]) {
      speed(x, t, lerp(560, -260, r), 1150, 1, 1)
      drawTalkCard(x, t, { cx: lerp(880, -40, ease.inCubic(prog(t, 0.15, T.exit + 0.1))), cy: 900 + 30 * Math.sin(t * 14), w: 230, rot: -0.25 + 0.1 * Math.sin(t * 10), flip: 1, text: Q })
    }
    // the card sails back in, into the glass
    if (t > T.skid[0] && t < T.catch) {
      const p = ease.inOutCubic(prog(t, T.skid[0] + 0.1, T.catch))
      drawTalkCard(x, t, { cx: lerp(-120, 520, p), cy: lerp(980, 790, p) - Math.sin(Math.PI * p) * 220, w: lerp(230, 200, p), rot: p * 6.2 - 0.1, flip: 1, text: Q })
    }
    dust(x, t, T.skid[1] - 0.1, 300, 1330)
    // handed back: Sagittarius holds it
    if (t > T.hand[0]) {
      const p = ease.inOutCubic(prog(t, ...T.hand)), out = outK(t, [T.last - 0.1, T.last + 0.25])
      if (out > 0.01) drawTalkCard(x, t, { cx: lerp(520, 470, p), cy: lerp(790, 1080, p), w: lerp(200, 190, p) * out, rot: lerp(-0.1, 0.12, p), flip: 1, text: Q })
    }
    bubble(x, t, K.PIS_AT.x - 40, K.PIS_AT.y - 120, T.pis, T.last - 0.1, "they're growing!!", { size: 30, col: '#d9ccff', tail: 0.4 })
    sparkles(x, t, 470, 1080, T.hand[1], 10, 160, 2)
    hearts(x, t, T.s3 + 0.3, 300, 1080, { n: 6, cell: 7, spread: 160 })
  },
  cues: [
    ['whoosh', 0.0, 0.5, 0.05], ['whoosh', 0.35, 0.5, 0.04],
    ...Array.from({ length: 6 }, (_, i) => ['tick', r3(0.05 + i * 0.13), 0.03]),
    ['whoosh', T.skid[0], 0.45, 0.045], ['tick', T.skid[1], 0.06], ['pluck', T.skid[1], 2093, 0.02, 0.2, -0.3],
    ['whoosh', T.skid[0] + 0.15, 0.7, 0.03], ['pop', T.catch, 1318.51, 0.045, 0.2],
    ['whoosh', T.hand[0], 0.5, 0.035], ['pop', T.hand[1], 1108.73, 0.045, -0.2], ['glitter', T.hand[1], T.hand[1] + 0.4],
    ['pop', T.pis, 1479.98, 0.04, 0.4],
    ['bell', T.last + 0.5, 1479.98, 0.03, 1.0, 0],
  ],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
