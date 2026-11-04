// nmue05: THE MAKE-UP TALK, Ep 5 "One fight at a time." (30 s vertical, promo/films/next30/b31.md, music: chiptune · G)
// The show's spine lives in ../../nmue01/scenes/mukit.js. Story 0–25.6, then the shared end card.
//   0.0–3.0    "We were fighting | about *the lights*…"  ♑ Capricorn and ♓ Pisces tug at a hopelessly tangled string
//              of holiday lights.
//   3.0–9.6    "…then came | *the archive.*"  Capricorn wheels in a filing cabinet, OLD FIGHTS: "while we're here… the
//              2019 folder." The drawers fly open (2019 · 2021 · THAT TRIP), old pages flutter. PISCES: "that's
//              still OPEN?!"
//   9.6        card cut.
//   9.7–17.2   "One fight. | *Tonight's.*"  THE STARS: "bringing the archive makes it *unfixable.*" → "stick to
//              *tonight's* thing."  The drawers slam shut; one folder stays out: LIGHTS.
//   17.2–22.4  "Untangle | *one thing.*"  CAPRICORN: "ok. just the lights. *together?*"  PISCES: "together. *happy*
//              tears, btw."  The string straightens and switches on. The heart mends (21.0).
//   22.4–25.5  "Leave the | *archive* closed."
import { makeEpisode, T, R, box, bubble, label, note, shadow, room, sparkles, pop01, outK, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, RED, INTER, r3 } from '../../nmue01/scenes/mukit.js'

const BULBS = ['#ff5c6a', '#ffd23a', '#5fd38a', '#7fd0ff', '#ff8fd0']
// a light string from (x0,y0) to (x1,y1): tangle 0…1 (loops), on 0…1 (lit)
function lights(x, t, x0, y0, x1, y1, { tangle = 1, on = 0, k = 1 } = {}) {
  if (k <= 0.01) return
  const N = 60, pts = []
  for (let i = 0; i <= N; i++) {
    const u = i / N
    let px = lerp(x0, x1, u), py = lerp(y0, y1, u) + 60 * Math.sin(Math.PI * u) * (1 - tangle * 0.3)
    // the knot: loops around the middle
    const knot = tangle * Math.exp(-Math.pow((u - 0.5) / 0.22, 2))
    px += knot * 70 * Math.cos(u * 40 + t * 0.5); py += knot * 60 * Math.sin(u * 40 + t * 0.5)
    pts.push([px, py])
  }
  x.save(); x.globalAlpha *= k
  x.strokeStyle = INK; x.lineWidth = 12; x.lineJoin = 'round'; x.beginPath(); pts.forEach(([a, b], i) => i ? x.lineTo(a, b) : x.moveTo(a, b)); x.stroke()
  x.strokeStyle = '#2f6b3c'; x.lineWidth = 6; x.stroke()
  pts.forEach(([a, b], i) => {
    if (i % 4) return
    const c = BULBS[(i / 4) % BULBS.length]
    if (on > 0) { x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.35 * on * (0.8 + 0.2 * Math.sin(t * 6 + i)); x.fillStyle = c; x.beginPath(); x.arc(a, b + 10, 26, 0, Math.PI * 2); x.fill(); x.restore() }
    R(x, INK, a - 9, b - 2, 18, 26); R(x, on > 0.5 ? c : '#5a5470', a - 6, b + 2, 12, 18); R(x, '#8a86a0', a - 6, b - 2, 12, 5)
    if (on > 0.5) R(x, '#ffffff', a - 4, b + 4, 4, 4)
  })
  x.restore()
}
// the OLD FIGHTS filing cabinet; open 0…1 per drawer
function cabinet(x, t, cx, cy, opens, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -110, -260, 220, 300, '#7d8aa8', { b: 7, hi: '#a6b2cc' })
  label(x, 'OLD FIGHTS', 0, -290, { size: 28, col: '#ffe27a', font: INTER, weight: 800 })
  const names = ['2019', '2021', 'THAT TRIP']
  names.forEach((nm, i) => {
    const o = (opens[i] || 0) * 80, y = -240 + i * 92
    if (o > 2) { box(x, -96 + o * 0.15, y + 4, 192, 70, '#5f6b88', { b: 5 }); R(x, '#fbf3e0', -80 + o * 0.15, y - 6, 160, 18) }
    box(x, -96, y + o * 0.4, 192, 74, '#94a0bc', { b: 6 })
    box(x, -36, y + 12 + o * 0.4, 72, 22, BONE, { b: 3 })
    x.font = `800 ${nm.length > 5 ? 16 : 20}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText(nm, 0, y + 24 + o * 0.4)
    R(x, INK, -20, y + 46 + o * 0.4, 40, 8)
  })
  // little wheels
  for (const dx of [-80, 80]) { R(x, INK, dx - 14, 40, 28, 24); R(x, '#3a3550', dx - 8, 44, 16, 14) }
  x.restore()
  void t
}
function flutter(x, t, t0, cx, cy, n = 9) {
  for (let i = 0; i < n; i++) {
    const b = t0 + i * 0.22, p = (t - b) / 1.8
    if (p < 0 || p > 1) continue
    const dir = i % 2 ? 1 : -1
    const px = cx + dir * (80 + i * 22) * p * 1.6 + Math.sin(p * 9 + i) * 20, py = cy - 260 * Math.sin(Math.PI * p * 0.8) + 300 * p * p
    x.save(); x.globalAlpha = 1 - ease.inQuad(p); x.translate(px, py); x.rotate(Math.sin(p * 8 + i) * 0.9)
    box(x, -22, -28, 44, 56, '#fbf3e0', { b: 3 }); R(x, '#9aa3c8', -14, -16, 28, 4); R(x, '#d23a4e', -14, -4, 20, 4); R(x, '#9aa3c8', -14, 8, 26, 4)
    x.restore()
  }
}

const EP = makeEpisode({
  id: 'nmue05', ep: 5, A: 'capricorn', B: 'pisces', accent: '#ffd27a',
  heads: {
    hook: 'We were fighting | about *the lights*…',
    trap: '…then came | *the archive.*',
    move: 'One fight. | *Tonight’s.*',
    try: 'Untangle | *one thing.*',
    last: 'Leave the | *archive* closed.',
  },
  heart: { hook: { x: 540, y: 560, cell: 14 } },
  lines: [
    { t: 10.25, who: 'S', text: 'bringing the archive makes it *unfixable.*' },
    { t: 13.0, who: 'S', text: "stick to *tonight's* thing." },
    { t: 17.6, who: 'A', text: 'ok. just the lights. *together?*' },
    { t: 19.35, who: 'B', text: 'together. *happy* tears, btw.' },
  ],
  hook(x, t, S) {
    room(x, t)
    const tug = 10 * Math.sin(t * 5)
    S.couple(x, t, { a: { x: 250 - tug, mood: 'squint', look: [1, 0], hops: [-0.1, 1.3] }, b: { x: 830 + tug, mood: 'wide', look: [-1, 0], tears: 1, hops: [-0.02, 1.8] } })
    lights(x, t, 340 - tug, 1050, 740 + tug, 1050, { tangle: 1 })
  },
  trap(x, t, S) {
    const u = S.u
    room(x, t)
    const roll = ease.outCubic(prog(u, 0.2, 1.2))
    const opens = [ease.outBack(prog(u, 2.4, 2.7)), ease.outBack(prog(u, 2.7, 3.0)), ease.outBack(prog(u, 3.0, 3.3))]
    shadow(x, 220, 1150, 210); shadow(x, 860, 1150, 210)
    S.A(x, t, { x: 220, y: 1030, s: 220, mood: u > 2.4 ? 'happy' : 'neutral', look: [1, 0], hops: [S.t0 + 0.4, S.t0 + 2.4] })
    cabinet(x, t, lerp(-200, 470, roll), 1120 + (roll < 1 ? 4 * Math.sin(t * 30) : 0), opens, 0.95)
    flutter(x, t, S.t0 + 2.6, 470, 900, 10)
    S.B(x, t, { x: 860, y: 1030, s: 220, mood: 'wide', look: [-1, 0], tears: u > 3.4 ? 3 : 2, hops: [S.t0 + 3.5, S.t0 + 3.8] })
    bubble(x, t, 330, 640, S.t0 + 1.2, S.t1 - 0.1, "while we're here… the 2019 folder.", { size: 32, tail: -0.5 })
    bubble(x, t, 790, 770, S.t0 + 3.5, S.t1 - 0.1, "that's still OPEN?!", { size: 36, tail: 0.3, col: '#e2d6ff' })
    lights(x, t, 330, 1120, 700, 1130, { tangle: 1, k: 0.8 })
  },
  move(x, t, S) {
    const u = S.u, ok = outK(t, [S.t1 - 0.2, S.t1])
    room(x, t, { a: ok })
    const k = pop01(t, S.t0 + 0.05, 0.3, 2) * ok
    const shut = ease.inCubic(prog(t, 13.0, 13.3))
    cabinet(x, t, 540, 1000, [1 - shut, 1 - shut, 1 - shut], 0.9 * k)
    if (t > 13.3 && t < 13.6) label(x, 'SLAM!', 680, 700, { size: 44, col: '#ffe27a', font: INTER, weight: 800, rot: 0.15 })
    const fk = easeOutBack(prog(t, 13.6, 14.0), 1.8) * ok
    if (fk > 0.01) {
      x.save(); x.translate(540, 560); x.scale(fk, fk); x.rotate(-0.05)
      box(x, -150, -95, 300, 190, '#e9b949', { b: 7, hi: '#f7d77a' }); box(x, -136, -112, 100, 20, '#e9b949', { b: 5 })
      x.font = `800 54px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('LIGHTS', 0, 8)
      x.restore()
      sparkles(x, t, 540, 560, 13.8, 10, 220, 1, [GOLD, BONE, '#ffd27a'])
    }
    S.A(x, t, { x: 270, y: 1190, s: 160, pop: k, mood: u > 4 ? 'happy' : 'neutral', look: [1, -1], talk: false })
    S.B(x, t, { x: 810, y: 1190, s: 160, pop: k, mood: u > 4 ? 'sparkle' : 'wide', look: [-1, -1], tears: 2, talk: false })
  },
  try(x, t, S) {
    const ok = S.ok
    room(x, t, { a: ok })
    const unt = ease.inOutCubic(prog(t, 18.0, 20.4)), on = clamp(prog(t, 20.5, 20.7))
    shadow(x, 300, 1140, 220 * ok); shadow(x, 780, 1140, 220 * ok)
    S.A(x, t, { x: 300, y: 1020, s: 230, pop: ok, mood: t > T.mend ? 'happy' : 'neutral', look: [1, 0.4], hops: [20.55, T.mend + 0.05, T.h4Land + 0.05] })
    S.B(x, t, { x: 780, y: 1020, s: 230, pop: ok, mood: t > 20.5 ? 'happy' : 'sparkle', look: [-1, 0.4], tears: t > 20.5 ? 3 : 2, hops: [20.6, T.mend + 0.12, T.h4Land + 0.15] })
    lights(x, t, 380, 1060, 700, 1060, { tangle: 1 - unt, on, k: ok })
    sparkles(x, t, 540, 1080, 20.55, 12, 220, 2, ['#ff5c6a', '#ffd23a', '#5fd38a', '#7fd0ff'])
  },
  cues: [
    ['whoosh', 3.2, 0.5, 0.03], ...Array.from({ length: 6 }, (_, i) => ['tick', r3(3.25 + i * 0.16), 0.02]), ['tick', 4.2, 0.06],
    ['pop', 4.2, 880, 0.04, -0.3], ['tom', 5.4, 120, { gain: 0.16, decay: 0.15 }], ['tom', 5.7, 110, { gain: 0.16, decay: 0.15 }], ['tom', 6.0, 100, { gain: 0.18, decay: 0.15 }],
    ['whoosh', 5.6, 0.6, 0.03], ['pop', 6.5, 1318.51, 0.05, 0.3], ['pop', 6.56, 1567.98, 0.035, 0.3],
    ['tom', 13.25, 90, { gain: 0.25, decay: 0.25 }], ['tick', 13.28, 0.07], ['pop', 13.8, 1174.66, 0.045, 0], ['glitter', 13.8, 14.2],
    ...Array.from({ length: 6 }, (_, i) => ['tick', r3(18.1 + i * 0.4), 0.02]),
    ['bell', 20.52, 1567.98, 0.035, 1.0, -0.2], ['glitter', 20.5, 20.9], ['pop', 20.55, 1318.51, 0.04, 0.2],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [RED, note, BONE]
