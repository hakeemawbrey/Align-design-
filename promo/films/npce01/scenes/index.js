// npce01: PISCES CRIES ABOUT… "a note in their coat." (14 s vertical trial reel, promo/films/next30/b48.md,
// music: dreamy · F). Story 0–9.6, then the shared end card. The format lives in ./criekit.js (npce01–npce12).
//   0.0–1.6   hook: "Pisces cries about… *a note in their coat.*"  A winter coat hangs on a hook; a folded note is
//             half out of its pocket and Pisces stares at it, sniffling. The note floats up and unfolds.
//   1.6–3.9   the note: "thought of you today." in pen. Sticker (2.75): "and it’s *in pen.*"
//   3.9–5.6   the note flips: a tiny doodle of Pisces on the back. Fountains (4.5).
//   5.6       card cut.  THE STARS: "Small words on paper carry big love."
import { makeCry, box, R, ink, shadow, glow, drawBits, sparkles, pop01, prog, lerp, ease, clamp, INK, BONE, GOLD, PINK, SERIF, PIS_COL } from './criekit.js'

const COAT = '#b5523b'
function coat(x, cx, cy) {
  R(x, INK, cx - 10, cy - 250, 20, 50); box(x, cx - 70, cy - 210, 140, 22, '#6b4a2f', { b: 5 })
  x.save(); x.fillStyle = INK; x.beginPath(); x.moveTo(cx - 120, cy - 186); x.lineTo(cx + 120, cy - 186); x.lineTo(cx + 170, cy + 250); x.lineTo(cx - 170, cy + 250); x.closePath(); x.fill()
  x.fillStyle = COAT; x.beginPath(); x.moveTo(cx - 112, cy - 178); x.lineTo(cx + 112, cy - 178); x.lineTo(cx + 160, cy + 242); x.lineTo(cx - 160, cy + 242); x.closePath(); x.fill(); x.restore()
  R(x, '#8f3a28', cx - 6, cy - 178, 12, 420)
  for (let i = 0; i < 4; i++) box(x, cx - 34, cy - 120 + i * 90, 14, 14, GOLD, { b: 3 })
  box(x, cx + 30, cy + 90, 110, 80, '#9a4430', { b: 5 })      // the pocket
}
// the note: w×h paper; side 0 front ("thought of you today."), side 1 back (a doodle)
function note(x, t, cx, cy, sc, rot, flip) {
  const sx = Math.cos(Math.PI * flip), back = flip > 0.5
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(sc * Math.max(0.02, Math.abs(sx)), sc)
  box(x, -230, -150, 460, 300, '#fbf6e9', { b: 7 })
  for (let i = 0; i < 5; i++) R(x, 'rgba(120,150,210,0.25)', -210, -90 + i * 48, 420, 3)
  R(x, 'rgba(200,80,90,0.35)', -170, -150, 3, 300)
  if (!back) {
    ink(x, 'thought of you', 10, -52, { size: 58, font: SERIF, weight: 500, col: '#1f2a6b', rot: -0.03 })
    ink(x, 'today.', -40, 26, { size: 58, font: SERIF, weight: 500, col: '#1f2a6b', rot: -0.03 })
    drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#e8344e' }, 140, 30, 6, { outline: null })
  } else {
    // a wobbly pen doodle of a little star with tears, and "you ->"
    x.save()
    x.strokeStyle = '#1f2a6b'; x.lineWidth = 6; x.lineJoin = 'round'
    x.beginPath()
    for (let i = 0; i <= 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 42 : 100; const px = 60 + Math.cos(a) * r + Math.sin(i * 3) * 3, py = 10 + Math.sin(a) * r; i ? x.lineTo(px, py) : x.moveTo(px, py) }
    x.stroke()
    R(x, '#1f2a6b', 40, -6, 9, 12); R(x, '#1f2a6b', 72, -6, 9, 12)
    x.beginPath(); x.arc(60, 20, 14, 0.2, Math.PI - 0.2); x.stroke()
    R(x, '#3aa0e0', 36, 10, 7, 16); R(x, '#3aa0e0', 82, 10, 7, 16)
    ink(x, 'you', -130, -10, { size: 54, font: SERIF, weight: 500, col: '#1f2a6b' })
    x.beginPath(); x.moveTo(-90, 26); x.lineTo(-30, 26); x.moveTo(-46, 12); x.lineTo(-30, 26); x.lineTo(-46, 40); x.stroke()
    x.restore()
  }
  x.restore()
}

const EP = makeCry({
  id: 'npce01', topic: 'a note in their coat', accent: '#ffd9a0', deep: '#b5523b',
  sticker: 'and it’s *in pen.*', peak: 4.5,
  tissues: [1.3, 2.9, 3.7, 4.5, 4.75, 5.0],
  scene(x, t, S) {
    glow(x, 540, 880, 620, 0.6)
    // the coat slides away as the note takes over
    const away = ease.inCubic(prog(t, 1.1, 1.6))
    if (away < 1) coat(x, lerp(300, -260, away), 880)
    // the note: rises from the pocket, then unfolds big
    const rise = ease.outCubic(prog(t, 0, 1.0)), big = ease.inOutCubic(prog(t, 1.0, 1.6))
    const flip = ease.inOutCubic(prog(t, 3.85, 4.25))
    const nx = lerp(lerp(350, 420, rise), 540, big), ny = lerp(lerp(990, 880, rise), 720, big)
    const sc = lerp(lerp(0.32, 0.42, rise), 1.0, big), rot = lerp(lerp(-0.5, -0.3, rise), -0.04, big) + 0.02 * Math.sin(t * 2)
    note(x, t, nx, ny + 6 * Math.sin(t * 2.4), sc, rot, flip)
    if (t > 1.0) sparkles(x, t, 540, 720, 1.55, 10, 300, 0.3, [GOLD, BONE, PINK])
    // Pisces: right, then below the note
    const px = lerp(720, 560, big), py = lerp(1010, 1150, big), ps = lerp(330, 270, big)
    shadow(x, px, py + ps * 0.62, ps * 0.8)
    const mood = t < 1.6 ? 'wide' : t < 4.25 ? 'sparkle' : 'happy'
    S.pis(x, t, { x: px, y: py, s: ps, mood, look: t < 1.6 ? [-1, 0] : [0, -1], hops: [1.62, 2.8, 4.28, 4.6, 4.95] })
  },
  finale(x, t, { ok }) {
    const k = pop01(t, 5.75, 0.3, 2.2) * ok
    if (k > 0.01) note(x, t, 760, 640 + 8 * Math.sin(t * 2), 0.5 * k, 0.12, 0)
  },
  last: 'Small words on paper carry big love.',
  cues: [['whoosh', 1.0, 0.4, 0.03], ['pluck', 1.6, 1567.98, 0.035, 0.4, 0.3], ['whoosh', 3.85, 0.35, 0.03], ['pluck', 4.27, 2093, 0.035, 0.4, 0.4]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [clamp, PIS_COL]
