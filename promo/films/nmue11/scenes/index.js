// nmue11: THE MAKE-UP TALK, Ep 11 "Laugh with, not at." (30 s vertical, promo/films/next30/b31.md, music: screwed · Ebm)
// The show's spine lives in ../../nmue01/scenes/mukit.js. Story 0–25.6, then the shared end card.
//   0.0–3.0    "Can we laugh | *yet?*"  ♐ Sagittarius, in a red clown nose, mid-hop; ♋ Cancer is still hurt.
//   3.0–9.6    "Too *soon.*"  SAGITTARIUS: "knock knock!" … crickets. The "HA HA" letters tumble off the top and clatter
//              on the floor. "ok ok, another one!"  Cancer turns away.
//   9.6        card cut.
//   9.7–17.2   "Heard *first.* | Then funny."  THE STARS: "humor helps *after* you're heard." → "talk first. then the
//              *inside joke.*"  Two steps pop up: TALK, then LAUGH; a tiny star hops up them in order.
//   17.2–22.4  "Talk. | Then *laugh.*"  SAGITTARIUS (nose off): "I joked because I felt *awkward.* sorry."  CANCER:
//              "remember the *burnt pie?*"  A burnt pixel pie pops up; both crack up. The heart mends (21.0).
//   22.4–25.5  "First talk. | *Then* the giggles."
import { makeEpisode, T, R, box, bubble, label, note, shadow, room, sparkles, starFrame, inSprite, pop01, outK, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, RED, INTER, r3 } from '../../nmue01/scenes/mukit.js'

// a red clown nose on the sprite (between the eyes, a little low)
function nose(x, t, o) {
  const F = starFrame(o.x, o.y, o.s, t, o)
  inSprite(x, F, () => { x.fillStyle = INK; x.fillRect(16.2, 19.6, 3.6, 3.4); x.fillStyle = '#ff3b4e'; x.fillRect(16.6, 20, 2.8, 2.6); x.fillStyle = '#ffd0d4'; x.fillRect(16.8, 20.2, 0.8, 0.8) })
}
// falling pixel letters (HA HA) from (cx, cy) that bounce on the floor at fy
function tumble(x, t, t0, cx, cy, fy, text = 'HA HA') {
  if (t < t0) return
  ;[...text].forEach((ch, i) => {
    if (ch === ' ') return
    const d = t - t0 - i * 0.06
    if (d < 0) return
    const g = 1800, v0 = -200
    let y = cy + v0 * d + 0.5 * g * d * d, rot = d * (i % 2 ? 3 : -3)
    if (y > fy) { const over = y - fy; y = fy - Math.max(0, 40 - over * 0.2) * Math.abs(Math.sin(d * 8)) * Math.exp(-d * 2); rot = (i % 2 ? 1 : -1) * 1.2 }
    label(x, ch, cx - 90 + i * 45, y, { size: 64, col: '#ffe27a', font: INTER, weight: 800, rot })
  })
}
function steps(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -260, 0, 260, 110, '#6fa8ff', { b: 7, hi: '#9fc4ff' }); box(x, 0, -110, 260, 220, '#ff8fb1', { b: 7, hi: '#ffb3c8' })
  label(x, 'TALK', -130, 55, { size: 50, col: INK, font: INTER, weight: 800 })
  label(x, 'LAUGH', 130, -50, { size: 50, col: INK, font: INTER, weight: 800 })
  label(x, '1', -230, 22, { size: 26, col: '#fff1c8', font: INTER, weight: 800 }); label(x, '2', 30, -86, { size: 26, col: '#fff1c8', font: INTER, weight: 800 })
  x.restore()
}
function pie(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 96, 40, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#5a3a26'; x.beginPath(); x.ellipse(0, -4, 88, 32, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#2a1a14'; for (let i = 0; i < 7; i++) R(x, '#2a1a14', -60 + i * 18, -14 + (i % 2) * 10, 14, 6)
  x.restore()
  for (let i = 0; i < 3; i++) { x.save(); x.globalAlpha = 0.5; R(x, '#8a8698', cx - 30 + i * 30, cy - 70 - i * 18, 14, 14); x.restore() }
}

const EP = makeEpisode({
  id: 'nmue11', ep: 11, A: 'sagittarius', B: 'cancer', accent: '#ffb37a',
  heads: {
    hook: 'Can we laugh | *yet?*',
    trap: 'Too *soon.*',
    move: 'Heard *first.* | Then funny.',
    try: 'Talk. | Then *laugh.*',
    last: 'First talk. | *Then* the giggles.',
  },
  heart: { hook: { x: 540, y: 560, cell: 14 } },
  lines: [
    { t: 10.25, who: 'S', text: "humor helps *after* you're heard." },
    { t: 12.9, who: 'S', text: 'talk first. then the *inside joke.*' },
    { t: 17.6, who: 'A', text: 'I joked because I felt *awkward.* sorry.' },
    { t: 19.4, who: 'B', text: 'remember the *burnt pie?*' },
  ],
  hook(x, t, S) {
    room(x, t)
    const a = { x: 300, y: 1020, s: 250, mood: 'happy', look: [1, 0], hops: [-0.15, 0.5, 1.2, 1.9] }
    S.couple(x, t, { a, b: { mood: 'squint', look: [1, 0.4], tears: 1, hops: [-0.02] } })
    nose(x, t, a)
    label(x, 'ta-da!', 300, 800, { size: 34, col: '#ffe27a', font: INTER, weight: 800, rot: -0.1 })
  },
  trap(x, t, S) {
    const u = S.u
    room(x, t)
    const a = { x: 300, y: 1020, s: 250, mood: u > 2.4 && u < 3.6 ? 'wide' : 'happy', look: [1, 0], hops: [S.t0 + 0.3, S.t0 + 3.6, S.t0 + 3.9] }
    shadow(x, 300, 1140, 230); shadow(x, 780, 1140, 230)
    S.A(x, t, a); nose(x, t, a)
    const away = u > 4.2
    S.B(x, t, { x: 780, y: 1020, s: 250, mood: 'squint', look: away ? [1, 0] : [-1, 0], tears: 1, hops: away ? [S.t0 + 4.2] : [] })
    bubble(x, t, 330, 790, S.t0 + 0.3, S.t0 + 2.6, 'knock knock!', { size: 40, tail: -0.2 })
    if (u > 1.1 && u < 2.5) label(x, '* chirp *', 780, 820, { size: 30, col: '#9fe6b0', alpha: Math.sin(Math.PI * prog(u, 1.1, 2.5)) })
    // the HA HA sign drops its letters
    const sk = pop01(t, S.t0 + 0.6, 0.3, 2.4) * outK(t, [S.t0 + 2.3, S.t0 + 2.5])
    if (sk > 0.01) label(x, 'HA HA', 300, 640, { size: 64, col: '#ffe27a', font: INTER, weight: 800, alpha: sk })
    tumble(x, t, S.t0 + 2.4, 300, 640, 1150)
    bubble(x, t, 360, 760, S.t0 + 3.6, S.t1 - 0.1, 'ok ok, another one!', { size: 36, tail: -0.2 })
  },
  move(x, t, S) {
    const u = S.u, ok = outK(t, [S.t1 - 0.2, S.t1])
    room(x, t, { a: ok })
    const k = pop01(t, S.t0 + 0.05, 0.3, 2) * ok
    const sk = easeOutBack(prog(t, 13.1, 13.5), 1.6) * ok
    steps(x, t, 540, 880, sk)
    // a tiny star hops up: floor → TALK → LAUGH
    if (sk > 0.5) {
      const h1 = ease.inOutCubic(prog(t, 13.8, 14.2)), h2 = ease.inOutCubic(prog(t, 14.7, 15.1))
      const px = lerp(lerp(180, 410, h1), 670, h2), py = lerp(lerp(990, 820, h1), 710, h2) - 90 * (Math.sin(Math.PI * h1) + Math.sin(Math.PI * h2))
      S.stars(x, t, { x: px, y: py, s: 90, mood: h2 > 0.9 ? 'happy' : 'neutral', look: [1, 0], tips: false })
      if (h2 > 0.95) sparkles(x, t, 670, 700, 15.1, 10, 140, 1, [GOLD, BONE, '#ff8fb1'])
    }
    S.A(x, t, { x: 360, y: 1210, s: 150, pop: k, mood: u > 5 ? 'sparkle' : 'neutral', look: [1, -1], talk: false })
    S.B(x, t, { x: 800, y: 1210, s: 150, pop: k, mood: u > 5 ? 'happy' : 'neutral', look: [-1, -1], talk: false })
  },
  starsAt: { x: 120, y: 1300, s: 150 },
  try(x, t, S) {
    const ok = S.ok
    room(x, t, { a: ok })
    const crack = t > 20.4
    shadow(x, 320, 1140, 220 * ok); shadow(x, 760, 1140, 220 * ok)
    S.A(x, t, { x: 320, y: 1020, s: 230, pop: ok, mood: crack ? 'happy' : 'neutral', look: [1, 0.3], hops: crack ? [20.4, 20.7, 21.0, T.h4Land + 0.05] : [], squash: crack && t < 21.2 ? 0.05 * Math.sin(t * 22) : 0 })
    S.B(x, t, { x: 760, y: 1020, s: 230, pop: ok, mood: crack ? 'happy' : t > 19.4 ? 'sparkle' : 'neutral', look: [-1, 0.3], hops: crack ? [20.5, 20.8, 21.1, T.h4Land + 0.15] : [], squash: crack && t < 21.2 ? 0.05 * Math.sin(t * 22 + 1) : 0 })
    // the clown nose sits on the floor now
    x.save(); x.globalAlpha = ok; R(x, INK, 150, 1120, 30, 26); R(x, '#ff3b4e', 154, 1124, 22, 18); x.restore()
    pie(x, 540, 1100, pop01(t, 19.7, 0.35, 2.4) * ok)
    if (crack && t < 21.4) label(x, 'HA HA!', 870, 850, { size: 44, col: '#ffe27a', font: INTER, weight: 800, rot: 0.1, alpha: outK(t, [21.1, 21.4]) })
  },
  cues: [
    ['pop', 3.3, 987.77, 0.04, -0.3], ['tick', 3.35, 0.05], ['tick', 3.55, 0.05],
    ['pluck', 4.1, 2637, 0.012, 0.1, 0.3], ['pluck', 4.19, 2637, 0.012, 0.1, 0.3], ['pluck', 4.5, 2637, 0.012, 0.1, 0.3], ['pluck', 4.59, 2637, 0.012, 0.1, 0.3],
    ...[0, 1, 2, 3].map(i => ['tick', r3(5.75 + i * 0.12), 0.06]), ['tom', 5.9, 130, { gain: 0.12, decay: 0.1 }], ['tom', 6.05, 120, { gain: 0.12, decay: 0.1 }],
    ['pop', 6.6, 1174.66, 0.04, -0.3], ['whoosh', 7.2, 0.3, 0.025],
    ['pop', 13.3, 880, 0.045, 0], ['pop', 13.85, 987.77, 0.035, 0], ['pop', 14.75, 1318.51, 0.04, 0], ['glitter', 15.1, 15.5],
    ['pop', 19.75, 739.99, 0.04, 0], ['pop', 20.4, 987.77, 0.035, -0.2], ['pop', 20.55, 1174.66, 0.035, 0.2], ['pop', 20.7, 1318.51, 0.03, -0.2],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [RED, note, clamp]
