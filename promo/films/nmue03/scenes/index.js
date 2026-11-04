// nmue03: THE MAKE-UP TALK, Ep 3 "Retire 'always'." (30 s vertical, promo/films/next30/b31.md, music: funk · E)
// The show's spine lives in ../../nmue01/scenes/mukit.js. Story 0–25.6, then the shared end card.
//   0.0–3.0    "You *ALWAYS*… | You *NEVER*…"  ♌ Leo and ♍ Virgo slap big ALWAYS / NEVER stickers onto each other.
//   3.0–9.6    "One fight becomes | *every* fight."  The stickers keep coming (ALWAYS, NEVER, EVERY TIME, LITERALLY
//              ALWAYS) until both stars are papered over; only their eyes peek out.
//   9.6        card cut.
//   9.7–17.2   "Name | *the moment.*"  THE STARS: "'always' turns one night into a *trial.*" → "name the moment: 'at
//              dinner, I felt *ignored.*'"  The giant ALWAYS sticker peels off and folds into a small, specific note.
//   17.2–22.4  "Be *specific.*"  VIRGO: "last night, on your phone, I felt *small.*"  LEO: "oh. that's *fair.*"
//              Leo puts the phone face-down. The heart mends (21.0).
//   22.4–25.5  "One moment, | not *forever.*"
import { makeEpisode, T, R, box, bubble, label, note, shadow, room, sparkles, pop01, outK, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, RED, INTER, r3 } from '../../nmue01/scenes/mukit.js'

// a slap sticker: bone label with ink border and red text
function sticker(x, cx, cy, text, { k = 1, rot = 0, size = 34, col = '#fff1c8', ink = '#d23a4e' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.font = `800 ${size}px ${INTER}`
  const w = x.measureText(text).width + 34, h = size + 24
  x.fillStyle = 'rgba(6,4,18,0.4)'; x.fillRect(-w / 2 + 6, -h / 2 + 8, w, h)
  box(x, -w / 2, -h / 2, w, h, col, { b: 5 })
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}
const WORDS = ['ALWAYS', 'NEVER', 'EVERY TIME', 'ALWAYS!!', 'NEVER EVER', 'LITERALLY ALWAYS', 'ONCE AGAIN', 'AS USUAL']
// sticker i flies from one star to land on the other at time ti; pos jitter is fixed per i
function slaps(x, t, t0, n, gap, fromA, toA, fromB, toB) {
  for (let i = 0; i < n; i++) {
    const ti = t0 + i * gap, toLeft = i % 2 === 1
    if (t < ti - 0.25) continue
    const f = ease.outCubic(prog(t, ti - 0.25, ti))
    const from = toLeft ? fromB : fromA, to = toLeft ? toA : toB
    const jx = ((i * 37) % 7 - 3) * 22, jy = ((i * 53) % 5 - 2) * 28
    const cx = lerp(from[0], to[0] + jx, f), cy = lerp(from[1], to[1] + jy, f) - 90 * Math.sin(Math.PI * f)
    const sq = t > ti ? 1 + 0.25 * Math.exp(-(t - ti) * 12) : 1
    sticker(x, cx, cy, WORDS[i % WORDS.length], { k: sq * lerp(0.5, 1, f), rot: ((i * 29) % 9 - 4) * 0.07, size: 30 })
  }
}
// a phone (Leo's), small, glowing; down = face-down on the floor
function phone(x, cx, cy, { down = 0, glow = 1 } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(lerp(-0.2, Math.PI / 2, down))
  box(x, -26, -44, 52, 88, '#2a2148', { b: 5 })
  if (down < 0.5) { R(x, '#7fd0ff', -20, -38, 40, 70); x.globalAlpha = 0.25 * glow; x.fillStyle = '#7fd0ff'; x.fillRect(-60, -80, 120, 160) }
  x.restore()
}

const EP = makeEpisode({
  id: 'nmue03', ep: 3, A: 'leo', B: 'virgo', accent: '#ff8f7a',
  heads: {
    hook: 'You *ALWAYS*… | You *NEVER*…',
    trap: 'One fight becomes | *every* fight.',
    move: 'Name | *the moment.*',
    try: 'Be *specific.*',
    last: 'One moment, | not *forever.*',
  },
  lines: [
    { t: 10.25, who: 'S', text: "'always' turns one night into a *trial.*" },
    { t: 13.0, who: 'S', text: "name the moment: 'at dinner, I felt *ignored.*'" },
    { t: 17.6, who: 'B', text: 'last night, on your phone, I felt *small.*' },
    { t: 19.65, who: 'A', text: "oh. that's *fair.*" },
  ],
  hook(x, t, S) {
    room(x, t)
    S.couple(x, t, { a: { mood: 'squint', look: [1, 0], hops: [-0.15, 0.9, 1.9] }, b: { mood: 'squint', look: [-1, 0], hops: [-0.02, 1.4, 2.4] } })
    sticker(x, 760, 960, 'ALWAYS', { rot: -0.18, size: 34 })
    sticker(x, 320, 990, 'NEVER', { rot: 0.16, size: 34 })
    slaps(x, t, 0.9, 2, 0.6, [300, 900], [300, 1010], [780, 900], [780, 1010])
  },
  trap(x, t, S) {
    const u = S.u
    room(x, t)
    const buried = clamp(u / 5)
    S.couple(x, t, {
      a: { mood: u > 4.5 ? 'wide' : 'squint', look: [1, 0], hops: [S.t0 + 0.4, S.t0 + 1.6, S.t0 + 2.8, S.t0 + 4.0] },
      b: { mood: u > 4.5 ? 'wide' : 'squint', look: [-1, 0], hops: [S.t0 + 1.0, S.t0 + 2.2, S.t0 + 3.4, S.t0 + 4.6] },
    })
    // the pile: stickers that have already landed stay stuck (drawn by slaps)
    slaps(x, t, S.t0 + 0.25, 16, 0.34, [300, 880], [300, 1070], [780, 880], [780, 1070])
    if (buried > 0.95) {
      label(x, '…', 300, 860, { size: 60, col: BONE, font: INTER, weight: 800 })
      bubble(x, t, 540, 720, S.t0 + 5.3, S.t1 - 0.1, 'wait… what were we fighting about?', { size: 32 })
    }
  },
  move(x, t, S) {
    const u = S.u, ok = outK(t, [S.t1 - 0.2, S.t1])
    room(x, t, { a: ok })
    const k = pop01(t, S.t0 + 0.05, 0.3, 2) * ok
    S.A(x, t, { x: 360, y: 1140, s: 180, pop: k, mood: u > 4 ? 'sparkle' : 'neutral', look: [1, -1], talk: false })
    S.B(x, t, { x: 720, y: 1140, s: 180, pop: k, mood: u > 4 ? 'happy' : 'neutral', look: [-1, -1], talk: false })
    // the giant ALWAYS sticker: wobbling, then it peels at 13.2 and folds into a small note
    const peel = ease.inOutCubic(prog(t, 13.2, 14.0))
    if (peel < 1) {
      const big = pop01(t, S.t0 + 0.2, 0.35, 2.2) * ok
      x.save(); x.translate(540, 800); x.transform(1, 0, 0, 1 - peel, 0, 0)
      sticker(x, 0, 0, 'ALWAYS', { k: big, rot: -0.06 + peel * 0.4, size: 120 })
      x.restore()
    }
    const nk = easeOutBack(prog(t, 13.9, 14.3), 1.8) * ok
    note(x, 540, 800, 520, 230, ['at dinner. 8 PM.', '*I felt ignored.'], { k: nk, rot: 0.03, size: 46, accent: '#c4544a' })
    sparkles(x, t, 540, 800, 14.0, 10, 230, 2, [GOLD, BONE, '#ff8f7a'])
  },
  try(x, t, S) {
    const ok = S.ok
    room(x, t, { a: ok })
    const down = ease.inOutCubic(prog(t, 20.0, 20.4))
    shadow(x, 330, 1140, 220 * ok); shadow(x, 750, 1140, 220 * ok)
    S.A(x, t, { x: 330, y: 1020, s: 240, pop: ok, mood: t > T.mend ? 'happy' : t > 19.6 ? 'wide' : 'neutral', look: t < 19.4 ? [0, 1] : [1, 0], hops: [20.05, T.mend + 0.05, T.h4Land + 0.05] })
    S.B(x, t, { x: 750, y: 1020, s: 240, pop: ok, mood: t > T.mend ? 'happy' : 'sparkle', look: [-1, 0], hops: [T.mend + 0.12, T.h4Land + 0.15] })
    if (ok > 0.05) phone(x, lerp(200, 170, down), lerp(1010, 1150, down), { down, glow: 1 + 0.2 * Math.sin(t * 8) })
    if (t > 20.4) label(x, 'face-down.', 175, 1210, { size: 26, col: BONE, alpha: outK(t, [T.try[1] - 0.3, T.try[1]]) })
  },
  cues: [
    ['pop', 0.9, 880, 0.04, -0.3], ['tick', 0.9, 0.05], ['pop', 1.5, 987.77, 0.04, 0.3], ['tick', 1.5, 0.05],
    ...Array.from({ length: 16 }, (_, i) => ['tick', r3(3.25 + i * 0.34), 0.045 + (i % 2) * 0.01]),
    ...Array.from({ length: 16 }, (_, i) => ['pop', r3(3.25 + i * 0.34), [880, 987.77, 1174.66, 1318.51][i % 4], 0.022, i % 2 ? 0.3 : -0.3]),
    ['pluck', 8.35, 659.25, 0.03, 0.5, 0],
    ['whoosh', 13.2, 0.5, 0.04], ['tick', 13.6, 0.04], ['pop', 14.0, 1174.66, 0.045, 0], ['glitter', 14.0, 14.4],
    ['tick', 20.38, 0.05], ['pop', 20.4, 587.33, 0.03, -0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [RED, GOLD]
