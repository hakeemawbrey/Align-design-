// nmue09: THE MAKE-UP TALK, Ep 9 "What's under it." (28 s vertical, promo/films/next30/b31.md, music: lofi · F#m)
// The show's spine lives in ../../nmue01/scenes/mukit.js. Story 0–25.6, then the shared short end card.
// Pisces is half of the couple this week, so it cries in the scene itself.
//   0.0–3.0    "This is about | *the dishes*… right?"  ♍ Virgo and ♓ Pisces either side of a sink with a wobbling
//              tower of plates.
//   3.0–9.6    "Round and round | *the plate.*"  "you left a FORK." "it was SOAKING." "for three days?" "soaking takes
//              time!"  The top plate spins; circle arrows go round and round.
//   9.6        hard cut into the move (no card transition).
//   9.7–17.2   "Look *under* it."  THE STARS: "small fights often sit on a *bigger* feeling." → "ask: 'what's this
//              *really* about?'"  The plate tower lifts: underneath, a note: "I feel like I do it all alone."
//   17.2–22.4  "Say the | *real* thing."  VIRGO: "I feel like I do it all *alone.*"  PISCES: "I didn't see that.
//              *let's split it.*"  Virgo washes, Pisces dries; soap bubbles. The heart mends (21.0).
//   22.4–25.5  "Ask what's | *under* the plate."
import { makeEpisode, T, R, box, bubble, label, note, shadow, room, sparkles, pop01, outK, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, RED, INTER, r3 } from '../../nmue01/scenes/mukit.js'

function sink(x, cx, cy, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -150, -10, 300, 150, '#c9d2e6', { b: 7, hi: '#e8eef8' })
  R(x, '#8f9ab6', -120, 0, 240, 30)
  box(x, -10, -110, 20, 100, '#9aa6c2', { b: 5 }); box(x, -10, -118, 70, 18, '#9aa6c2', { b: 5 })
  x.restore()
}
function plate(x, cx, cy, { rot = 0, w = 180, col = '#f4f1ea' } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, w / 2 + 6, 22, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = col; x.beginPath(); x.ellipse(0, -2, w / 2, 16, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#d8d2c4'; x.beginPath(); x.ellipse(0, -2, w / 3, 9, 0, 0, Math.PI * 2); x.fill()
  x.restore()
}
// a tower of n plates resting on (cx, base), wobbling; lift raises it all
function tower(x, t, cx, base, n, { wob = 1, lift = 0, spinTop = 0 } = {}) {
  for (let i = 0; i < n; i++) {
    const sway = wob * Math.sin(t * 3 + i * 0.4) * i * 1.6
    const top = i === n - 1
    if (top && spinTop > 0) {
      const sc = Math.cos(t * 14)
      x.save(); x.translate(cx + sway, base - i * 26 - lift - 60 * spinTop); x.scale(Math.abs(sc) * 0.9 + 0.1, 1)
      plate(x, 0, 0, { col: sc > 0 ? '#f4f1ea' : '#e2dccd' })
      x.restore()
    } else plate(x, cx + sway, base - i * 26 - lift, { rot: wob * 0.03 * Math.sin(t * 3 + i) })
  }
}
function circleArrows(x, t, cx, cy, r, a) {
  if (a <= 0.01) return
  x.save(); x.globalAlpha *= a; x.translate(cx, cy); x.rotate(t * 3)
  for (let k = 0; k < 2; k++) {
    x.rotate(Math.PI)
    for (let i = 0; i < 10; i++) { const an = i / 14 * Math.PI; R(x, '#ffe27a', Math.cos(an) * r - 6, Math.sin(an) * r - 6, 12, 12) }
    const an = 10 / 14 * Math.PI; x.save(); x.translate(Math.cos(an) * r, Math.sin(an) * r); x.rotate(an + Math.PI / 2); R(x, '#ffe27a', -16, -4, 32, 10); R(x, '#ffe27a', -8, -14, 16, 10); x.restore()
  }
  x.restore()
}
function foam(x, t, cx, cy, a = 1) {
  if (a <= 0.01) return
  x.save(); x.globalAlpha *= a
  for (let i = 0; i < 9; i++) {
    const p = (t * 0.6 + i / 9) % 1, bx = cx + Math.sin(i * 2.7) * 90 + Math.sin(t * 2 + i) * 10, by = cy - p * 160, r = 8 + (i % 3) * 5
    x.globalAlpha = a * (1 - p)
    x.strokeStyle = '#e9f6ff'; x.lineWidth = 4; x.beginPath(); x.arc(bx, by, r, 0, Math.PI * 2); x.stroke()
    x.fillStyle = 'rgba(255,255,255,0.8)'; x.fillRect(bx - r * 0.5, by - r * 0.5, 4, 4)
  }
  x.restore()
}

const EP = makeEpisode({
  id: 'nmue09', ep: 9, A: 'virgo', B: 'pisces', accent: '#9fe0ff',
  heads: {
    hook: 'This is about | *the dishes*… right?',
    trap: 'Round and round | *the plate.*',
    move: 'Look *under* it.',
    try: 'Say the | *real* thing.',
    last: "Ask what's | *under* the plate.",
  },
  heart: { hook: { x: 540, y: 520, cell: 13 } },
  lines: [
    { t: 10.25, who: 'S', text: 'small fights often sit on a *bigger* feeling.' },
    { t: 13.2, who: 'S', text: "ask: 'what's this *really* about?'" },
    { t: 17.6, who: 'A', text: 'I feel like I do it all *alone.*' },
    { t: 19.25, who: 'B', text: "I didn't see that. *let's split it.*" },
  ],
  hook(x, t, S) {
    room(x, t)
    sink(x, 540, 1000)
    tower(x, t, 540, 980, 9, { wob: 1.4 })
    S.couple(x, t, { a: { x: 230, mood: 'squint', look: [1, 0], hops: [-0.12, 1.5] }, b: { x: 850, mood: 'wide', look: [-1, 0], tears: 1, hops: [-0.03, 2.0] } })
  },
  trap(x, t, S) {
    const u = S.u
    room(x, t)
    sink(x, 540, 1000)
    tower(x, t, 540, 980, 9, { wob: 1.4 + u * 0.15, spinTop: clamp(prog(u, 2.6, 3.0)) })
    circleArrows(x, t, 540, 660, 150, clamp(prog(u, 3.0, 3.4)) * 0.85)
    S.couple(x, t, {
      a: { x: 220, mood: 'squint', look: [1, 0], hops: [S.t0 + 0.2, S.t0 + 1.8, S.t0 + 3.4, S.t0 + 5.0] },
      b: { x: 860, mood: u > 2.4 ? 'wide' : 'squint', look: [-1, 0], tears: u > 2.4 ? 2 : 1, hops: [S.t0 + 1.0, S.t0 + 2.6, S.t0 + 4.2, S.t0 + 5.6] },
    })
    bubble(x, t, 250, 820, S.t0 + 0.2, S.t0 + 1.95, 'you left a FORK.', { size: 34, tail: -0.2 })
    bubble(x, t, 830, 820, S.t0 + 1.0, S.t0 + 2.75, 'it was SOAKING.', { size: 34, tail: 0.2, col: '#e2d6ff' })
    bubble(x, t, 250, 820, S.t0 + 1.8, S.t0 + 3.55, 'for three days?', { size: 34, tail: -0.2 })
    bubble(x, t, 830, 820, S.t0 + 2.6, S.t0 + 4.35, 'soaking takes time!', { size: 34, tail: 0.2, col: '#e2d6ff' })
    bubble(x, t, 250, 820, S.t0 + 3.4, S.t0 + 5.15, 'a FORK!', { size: 34, tail: -0.2 })
    bubble(x, t, 830, 820, S.t0 + 4.2, S.t1 - 0.1, 'it was SOAKING!', { size: 34, tail: 0.2, col: '#e2d6ff' })
  },
  move(x, t, S) {
    const u = S.u, ok = outK(t, [S.t1 - 0.2, S.t1])
    room(x, t, { a: ok })
    const k = pop01(t, S.t0 + 0.05, 0.3, 2) * ok
    const lift = ease.inOutCubic(prog(t, 13.6, 14.4))
    // the note under the tower
    const nk = clamp(prog(t, 13.9, 14.2)) * ok
    note(x, 540, 920, 600, 170, ['I feel like I do it', '*all alone.'], { k: nk, size: 42, accent: '#3a6fb0', alpha: nk })
    x.save(); x.globalAlpha *= ok
    tower(x, t, 540, 960 - lift * 260, 9, { wob: 0.5 })
    x.restore()
    if (lift > 0.5) sparkles(x, t, 540, 920, 14.2, 10, 260, 1, [GOLD, BONE, '#9fe0ff'])
    S.A(x, t, { x: 330, y: 1190, s: 160, pop: k, mood: u > 4.5 ? 'sparkle' : 'neutral', look: [1, -1], talk: false })
    S.B(x, t, { x: 760, y: 1190, s: 160, pop: k, mood: u > 4.5 ? 'wide' : 'neutral', look: [-1, -1], tears: 2, talk: false })
  },
  try(x, t, S) {
    const ok = S.ok
    room(x, t, { a: ok })
    sink(x, 540, 1030, ok * 0.9)
    foam(x, t, 540, 1020, clamp(prog(t, 19.8, 20.2)) * ok)
    shadow(x, 330, 1140, 210 * ok); shadow(x, 760, 1140, 210 * ok)
    const toward = ease.inOutCubic(prog(t, 19.6, 20.2))
    S.A(x, t, { x: lerp(250, 320, toward), y: 1020, s: 220, pop: ok, mood: t > T.mend ? 'happy' : 'neutral', look: [1, 0], hops: [T.mend + 0.05, T.h4Land + 0.05] })
    S.B(x, t, { x: lerp(830, 765, toward), y: 1020, s: 220, pop: ok, mood: t > 19.25 ? 'sparkle' : 'wide', look: [-1, 0], tears: t > T.mend ? 3 : 2, hops: [19.3, T.mend + 0.12, T.h4Land + 0.15] })
    // Pisces' dish towel
    if (toward > 0.5) box(x, lerp(830, 765, toward) + 70, 1040, 46, 70, '#ffb3c8', { b: 4 })
  },
  cues: [
    ...Array.from({ length: 6 }, (_, i) => ['pop', r3(3.2 + i * 0.8), i % 2 ? 739.99 : 880, 0.035, i % 2 ? 0.3 : -0.3]),
    ['whoosh', 5.6, 0.6, 0.03], ['riser', 6.0, 7.5, 0.02], ...Array.from({ length: 8 }, (_, i) => ['tick', r3(5.7 + i * 0.25), 0.025]),
    ['whoosh', 13.6, 0.8, 0.035], ['pop', 14.2, 1174.66, 0.045, 0], ['bell', 14.25, 1567.98, 0.03, 1.0, 0], ['glitter', 14.2, 14.6],
    ['pluck', 19.3, 659.25, 0.03, 0.5, 0.3], ['glitter', 19.9, 20.4],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [RED, label, easeOutBack, INTER]
