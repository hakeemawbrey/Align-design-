// nmue10: THE MAKE-UP TALK, Ep 10 "Move it off the screen." (28 s vertical, promo/films/next30/b31.md, music: synthwave · Cm)
// The show's spine lives in ../../nmue01/scenes/mukit.js. Story 0–25.6, then the shared short end card.
//   0.0–3.0    "We're fighting *by text* | at 11 PM."  ♊ Gemini and ♎ Libra, each glowing behind a big phone, thumbs
//              going; the clock reads 11:04 PM.
//   3.0–9.6    "'ok.' | (*Spiraling.*)"  Gemini's "ok." lands on Libra's screen and, in Libra's head, grows big, red
//              and spiky. Libra sends "fine."; a "seen 11:09" stares back; the typing dots start… and stop.
//   9.6        hard cut into the move (no card transition).
//   9.7–17.2   "Tone doesn't | *type.*"  THE STARS: "tone doesn't travel well in *text.*" → "send: 'can we talk
//              tomorrow, *in person?*'"  The two phones slide together and fold into a park bench.
//   17.2–22.4  "Next day. | *Same bench.*"  LIBRA: "your 'ok.' *scared* me."  GEMINI: "it meant *OK!*"  Both crack up.
//              The heart mends (21.0).
//   22.4–25.5  "Hard talks | get a *face.*"
import { makeEpisode, T, R, box, bubble, label, note, shadow, room, sparkles, pop01, outK, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, RED, INTER, MONO, r3 } from '../../nmue01/scenes/mukit.js'

// a big phone held up in front of a star; msgs: [{ at, side, text, col }]
function phone(x, t, cx, cy, { k = 1, title = '', msgs = [], typing = null, seen = null } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(0, 0, 40, 0, 0, 300); g.addColorStop(0, 'rgba(127,208,255,0.18)'); g.addColorStop(1, 'rgba(127,208,255,0)'); x.fillStyle = g; x.fillRect(-300, -300, 600, 600); x.restore()
  box(x, -130, -210, 260, 420, '#2a2148', { b: 8 }); R(x, '#120c2a', -114, -190, 228, 380)
  R(x, '#1f1747', -114, -190, 228, 60)
  x.font = `700 24px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText(title, 0, -160)
  let y = 150
  const vis = msgs.filter(m => t >= m.at)
  for (let i = vis.length - 1; i >= 0; i--) {
    const m = vis[i], mk = pop01(t, m.at, 0.22, 2.4)
    x.font = `700 28px ${INTER}`
    const w = x.measureText(m.text).width + 30
    const bx = m.side === 'R' ? 100 - w : -100
    x.save(); x.translate(bx + w / 2, y); x.scale(mk, mk)
    R(x, m.side === 'R' ? '#4f8df0' : '#3b3466', -w / 2, -22, w, 44)
    x.fillStyle = m.col || BONE; x.textAlign = 'center'; x.fillText(m.text, 0, 2)
    x.restore()
    y -= 60
  }
  if (typing && t > typing[0] && t < typing[1]) {
    R(x, '#3b3466', -100, 150 - (vis.length ? 0 : 0) + 30, 90, 36)
    for (let i = 0; i < 3; i++) R(x, Math.floor((t - typing[0]) * 8) % 3 === i ? BONE : '#8a83b8', -88 + i * 26, 160 + 30 - 2, 12, 12)
  }
  if (seen && t > seen) { x.font = `700 18px ${MONO}`; x.fillStyle = '#8a83b8'; x.textAlign = 'right'; x.fillText('seen 11:09', 104, 178) }
  x.restore()
}
// the "ok." monster in Libra's head: grows, goes red, sprouts spikes
function okMonster(x, t, cx, cy, g) {
  if (g <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(0.6 + g * 0.9, 0.6 + g * 0.9); x.rotate(0.06 * Math.sin(t * 9) * g)
  const col = g > 0.5 ? '#e8344e' : '#9aa3c8'
  if (g > 0.4) for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2; x.save(); x.rotate(a); R(x, INK, -10, -92, 20, 30); R(x, col, -6, -88, 12, 24); x.restore() }
  box(x, -90, -60, 180, 120, col, { b: 7 })
  x.font = `800 72px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = g > 0.5 ? '#fff1c8' : INK; x.fillText('ok.', 0, 4)
  if (g > 0.7) { R(x, INK, -62, -50, 30, 10); R(x, INK, 32, -50, 30, 10) }
  x.restore()
}
function bench(x, cx, cy, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -260, -90, 520, 26, '#a0703c', { b: 6 }); box(x, -260, -50, 520, 26, '#a0703c', { b: 6 })
  box(x, -270, -4, 540, 30, '#b9844a', { b: 6, hi: '#d29a5a' })
  for (const dx of [-220, 220]) { R(x, INK, dx - 10, 26, 20, 70); R(x, '#3a3550', dx - 5, 26, 10, 66) }
  x.restore()
}

const EP = makeEpisode({
  id: 'nmue10', ep: 10, A: 'gemini', B: 'libra', accent: '#7fd0ff',
  heads: {
    hook: "We're fighting *by text* | at 11 PM.",
    trap: "'ok.' | (*Spiraling.*)",
    move: "Tone doesn't | *type.*",
    try: 'Next day. | *Same bench.*',
    last: 'Hard talks | get a *face.*',
  },
  heart: { hook: { x: 540, y: 470, cell: 12 } },
  lines: [
    { t: 10.25, who: 'S', text: "tone doesn't travel well in *text.*" },
    { t: 12.9, who: 'S', text: "send: 'can we talk tomorrow, *in person?*'" },
    { t: 17.6, who: 'B', text: "your 'ok.' *scared* me." },
    { t: 19.2, who: 'A', text: 'it meant *OK!*' },
  ],
  hook(x, t, S) {
    label(x, '11:04 PM', 540, 640, { size: 34, col: '#9fe6b0' })
    S.A(x, t, { x: 270, y: 1200, s: 200, mood: 'squint', look: [0, -1], hops: [-0.1, 0.6, 1.3, 2.0] })
    S.B(x, t, { x: 810, y: 1200, s: 200, mood: 'squint', look: [0, -1], hops: [-0.05, 0.9, 1.7] })
    phone(x, t, 270, 890, { k: 0.98, title: `${'♎︎'} Libra`, msgs: [{ at: -1, side: 'R', text: 'I just think…' }, { at: -1, side: 'L', text: 'well YOU…' }] })
    phone(x, t, 810, 890, { k: 0.98, title: `${'♊︎'} Gemini`, msgs: [{ at: -1, side: 'L', text: 'I just think…' }, { at: -1, side: 'R', text: 'well YOU…' }] })
  },
  trap(x, t, S) {
    const u = S.u
    const okAt = S.t0 + 0.5, fineAt = S.t0 + 3.6
    S.A(x, t, { x: 240, y: 1210, s: 190, mood: 'neutral', look: [0, -1], hops: [okAt - 0.3] })
    S.B(x, t, { x: 840, y: 1210, s: 190, mood: u > 1.2 ? 'wide' : 'neutral', look: [0, -1], hops: [fineAt - 0.3], squash: u > 1.5 && u < 3.5 ? 0.04 * Math.sin(t * 20) : 0 })
    phone(x, t, 240, 900, { k: 0.95, title: `${'♎︎'} Libra`, msgs: [{ at: okAt, side: 'R', text: 'ok.' }, { at: fineAt, side: 'L', text: 'fine.' }], typing: [S.t0 + 4.6, S.t0 + 5.6] })
    phone(x, t, 840, 900, { k: 0.95, title: `${'♊︎'} Gemini`, msgs: [{ at: okAt, side: 'L', text: 'ok.' }, { at: fineAt, side: 'R', text: 'fine.' }], seen: S.t0 + 4.2 })
    okMonster(x, t, 760, 560, ease.outBack(prog(u, 1.2, 3.2)) * outK(t, [fineAt, fineAt + 0.3]))
    if (u > 1.2 && u < 3.6) label(x, '?!', 900, 470, { size: 48, col: '#ffe27a', font: INTER, weight: 800 })
    if (u > 4.6 && u < 6.4) label(x, u > 5.6 ? '…stopped typing.' : 'typing…', 540, 600, { size: 30, col: BONE })
  },
  move(x, t, S) {
    const u = S.u, ok = outK(t, [S.t1 - 0.2, S.t1])
    const slide = ease.inOutCubic(prog(t, 13.4, 14.0)), fold = ease.inCubic(prog(t, 14.0, 14.3))
    const pk = (1 - fold) * pop01(t, S.t0 + 0.05, 0.3, 2) * ok
    phone(x, t, lerp(300, 470, slide), 820, { k: 0.7 * pk, title: '', msgs: [] })
    phone(x, t, lerp(780, 610, slide), 820, { k: 0.7 * pk, title: '', msgs: [] })
    const bk = easeOutBack(prog(t, 14.2, 14.6), 1.8) * ok
    bench(x, 540, 1000, bk)
    if (bk > 0.5) sparkles(x, t, 540, 960, 14.3, 12, 300, 1, [GOLD, BONE, '#7fd0ff'])
    const k = pop01(t, S.t0 + 0.05, 0.3, 2) * ok
    S.A(x, t, { x: 330, y: 1190, s: 150, pop: k, mood: u > 4.6 ? 'sparkle' : 'neutral', look: [1, -1], talk: false })
    S.B(x, t, { x: 760, y: 1190, s: 150, pop: k, mood: u > 4.6 ? 'happy' : 'neutral', look: [-1, -1], talk: false })
  },
  try(x, t, S) {
    const ok = S.ok
    // daylight: a soft warm wash and a little pixel tree
    x.save(); x.globalAlpha = 0.14 * ok; x.fillStyle = '#ffd9a0'; x.fillRect(0, 0, 1080, 1920); x.restore()
    box(x, 120, 700, 36, 380, '#7a5030', { b: 6 }); x.save(); x.globalAlpha = ok; for (const [dx, dy, r] of [[138, 640, 110], [70, 700, 80], [210, 700, 80]]) { x.fillStyle = INK; x.beginPath(); x.arc(dx, dy, r + 7, 0, Math.PI * 2); x.fill(); x.fillStyle = '#4f9a5a'; x.beginPath(); x.arc(dx, dy, r, 0, Math.PI * 2); x.fill() } x.restore()
    bench(x, 560, 1080, ok)
    const laugh = t > 19.7
    S.A(x, t, { x: 420, y: 980, s: 210, pop: ok, mood: laugh ? 'happy' : 'neutral', look: [1, 0], hops: laugh ? [19.7, 20.0, 20.3, T.mend + 0.05, T.h4Land + 0.05] : [], squash: laugh && t < 20.6 ? 0.05 * Math.sin(t * 24) : 0 })
    S.B(x, t, { x: 700, y: 980, s: 210, pop: ok, mood: laugh ? 'happy' : 'sparkle', look: [-1, 0], hops: laugh ? [19.8, 20.1, 20.4, T.mend + 0.12, T.h4Land + 0.15] : [], squash: laugh && t < 20.6 ? 0.05 * Math.sin(t * 24 + 1) : 0 })
    if (laugh && t < 21.2) label(x, 'HA!', 900, 860, { size: 46, col: '#ffe27a', font: INTER, weight: 800, rot: -0.1, alpha: outK(t, [20.9, 21.2]) })
  },
  pis: { hook: { x: 540, y: 1310, s: 150 }, trap: { x: 540, y: 1310, s: 150 }, try: { x: 940, y: 1290, s: 170 } },
  cues: [
    ...Array.from({ length: 10 }, (_, i) => ['tick', r3(0.1 + i * 0.22), 0.015]),
    ['pop', 3.5, 659.25, 0.045, 0.3], ['riser', 4.2, 6.2, 0.03], ['pluck', 5.0, 220, 0.03, 0.6, 0.3], ['pop', 6.6, 587.33, 0.045, -0.3], ['tick', 7.2, 0.03],
    ...Array.from({ length: 6 }, (_, i) => ['tick', r3(7.6 + i * 0.17), 0.015]),
    ['whoosh', 13.4, 0.6, 0.035], ['tick', 14.0, 0.05], ['pop', 14.3, 1174.66, 0.045, 0], ['tom', 14.35, 110, { gain: 0.15, decay: 0.2 }], ['glitter', 14.3, 14.7],
    ['pop', 19.7, 987.77, 0.035, -0.2], ['pop', 19.85, 1174.66, 0.035, 0.2], ['pop', 20.0, 987.77, 0.03, -0.2], ['pop', 20.15, 1318.51, 0.03, 0.2],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [RED, note, bubble, shadow, room, clamp]
