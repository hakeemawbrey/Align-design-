// kmte08: MIRROR TALK No. 8, "Walls up, again." (24 s vertical, star_advice post, cinematic · Cm). Hard cut.
// Row: promo/films/month2/m21.md. No end card, no card cut.
//   0.00   frame 0: Scorpio mid-slam of a pixel vault door, its heart inside. Hook "Walls up. Heart locked. | *Again.*"
//   0.35   CLANG (flash + shake), the dial spins, LOCKED.
//   2.9    "After the *last* one…"  SCORPIO: "never again. nobody gets *in*."
//   6.0    the reflection taps on the glass: "you got hurt. that's *real*." → "would you tell a *friend* to lock out
//          everyone?"  SCORPIO: "…no. maybe one *window*." → the door opens a crack, warm light spills out.
//   13.8   REFLECTION: "start with one small *true* thing."  16.0 a talk card: "What's something you're proud of lately?"
//   18.8   the light warms the room, hearts drift out of the crack; Pisces sobs at the tiny window.
//   22.2   last line "Open one door. | *A crack* is enough."  Hard cut at 24.
import { makeMirror, drawTalkCard, hearts, sparkles, drawBits, HEART, pop01, outK, prog, lerp, clamp, ease, easeOutBack, R, box, INK, GOLD, r3, INTER, MONO } from '../../kmte01/mirrorkit.js'

const T = { slam: 0.35, dial: [0.55, 1.5], locked: 1.5, s1: 3.4, tap: 5.7, m1: 6.0, m2: 8.6, s2: 11.6, crack: [12.6, 13.3], m3: 13.8, card: 16.0, flip: 16.5, warm: 18.8, last: 22.2 }
const V = { cx: 575, cy: 1115, w: 230, h: 200 }

function vault(x, t) {
  const { cx, cy, w, h } = V
  // body
  R(x, 'rgba(6,4,18,0.45)', cx - w / 2 + 14, cy - h / 2 + 18, w, h)
  box(x, cx - w / 2, cy - h / 2, w, h, '#5d5878', { b: 7, hi: '#7a7598', lo: '#45405e' })
  R(x, '#1c1530', cx - w / 2 + 22, cy - h / 2 + 22, w - 44, h - 44)
  // the heart inside (glows when the light gets in)
  const glow = clamp(prog(t, T.crack[0], T.warm + 1))
  drawBits(x, HEART, { H: '#ff4f86' }, cx + 62, cy, 11 * (1 + 0.05 * Math.sin(t * 6)))
  if (glow > 0) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(cx, cy, 10, cx, cy, 200); g.addColorStop(0, `rgba(255,160,190,${0.4 * glow})`); g.addColorStop(1, 'rgba(255,160,190,0)'); x.fillStyle = g; x.fillRect(cx - 200, cy - 200, 400, 400); x.restore() }
  // the door: hinged on the left, swings toward us (width scales by cos)
  let ang
  if (t < T.slam) ang = lerp(1.25, 0, ease.inCubic(prog(t, -0.6, T.slam)))
  else if (t < T.crack[0]) ang = 0
  else ang = 0.75 * easeOutBack(prog(t, ...T.crack), 1.4)
  const dw = (w - 30) * Math.cos(ang), hx = cx - w / 2 + 15
  if (ang > 0.05) {
    // light through the crack
    const a = clamp(prog(t, T.crack[0], T.crack[1])) * (0.7 + 0.3 * Math.sin(t * 3))
    if (t > T.crack[0]) { x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = `rgba(255,214,150,${0.22 * a})`; x.beginPath(); x.moveTo(hx + dw, cy - h / 2 + 20); x.lineTo(cx + w / 2 - 20, cy - h / 2 + 20); x.lineTo(cx + w / 2 + 260, cy + h / 2 + 260); x.lineTo(hx + dw + 40, cy + h / 2 + 260); x.closePath(); x.fill(); x.restore() }
  }
  R(x, INK, hx - 6, cy - h / 2 + 9, dw + 12, h - 18)
  R(x, '#77729a', hx, cy - h / 2 + 15, dw, h - 30)
  R(x, '#8f8ab2', hx, cy - h / 2 + 15, dw, 10)
  // the dial
  const dk = Math.cos(ang), dx = hx + dw * 0.55, spin = t < T.dial[0] ? 0 : t < T.dial[1] ? ease.inOutCubic(prog(t, ...T.dial)) * 9 : 9
  x.save(); x.translate(dx, cy); x.scale(dk, 1); x.rotate(spin)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 54, 0, 7); x.fill(); x.fillStyle = '#c9c2e6'; x.beginPath(); x.arc(0, 0, 47, 0, 7); x.fill()
  for (let i = 0; i < 4; i++) { x.save(); x.rotate(i * Math.PI / 2); R(x, INK, -6, -72, 12, 30); R(x, '#c9c2e6', -3, -68, 6, 24); x.restore() }
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 12, 0, 7); x.fill()
  x.restore()
  // LOCKED stamp
  const lk = t > T.locked && t < T.crack[0] ? pop01(t, T.locked, 0.25, 2.6) * outK(t, [T.crack[0] - 0.2, T.crack[0]]) : 0
  if (lk > 0.01) { x.save(); x.translate(cx, cy + 10); x.rotate(-0.12); x.scale(lk, lk); R(x, INK, -110, -32, 220, 64); R(x, '#e8344e', -104, -26, 208, 52); x.font = `800 34px ${INTER}`; x.fillStyle = '#fff'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('LOCKED', 0, 2); x.restore() }
}

const F = makeMirror({
  id: 'kmte08', sign: 'scorpio', dur: 24,
  hook: { text: 'Walls up. Heart locked. | *Again.*', accentColor: '#ff6b7f', out: [2.65, 2.9] },
  glassTint: ['#1a2440', '#20123a'],
  bulbs: t => lerp(0.55, 1, ease.inOutCubic(prog(t, T.crack[0], T.warm + 1))),
  fx: [
    { k: 'screenShake', at: T.slam, amp: 34, len: 0.6 },
    { k: 'screenShake', at: T.tap, amp: 6, len: 0.2 }, { k: 'screenShake', at: T.tap + 0.25, amp: 6, len: 0.2 },
    { k: 'whipZoom', at: T.m2 - 0.08, from: 1.3 },
    { k: 'whipZoom', at: T.crack[0] - 0.06, from: 1.25 },
    { k: 'whipZoom', at: T.card - 0.06, from: 1.2 },
  ],
  flashes: [[T.slam, '#ffffff', 0.2]],
  caps: [
    { at: 2.95, out: [9.6, 9.8], text: 'After the *last* one…', accent: '#ff6b7f', size: 96, accentSize: 126 },
    { at: 9.85, out: [21.9, 22.1], text: 'One small | *true* thing.', accent: '#8fe9ff' },
    { at: T.last, out: [99, 100], text: 'Open one door. | *A crack* is enough.', accent: '#ffd36b', size: 88, accentSize: 114, gap: 0.09 },
  ],
  lines: [
    { t: T.s1, who: 'S', text: 'never again. nobody gets *in*.' },
    { t: T.m1, who: 'M', text: "you got hurt. that's *real*." },
    { t: T.m2, who: 'M', text: 'would you tell a *friend* to lock out everyone?' },
    { t: T.s2, who: 'S', text: '…no. maybe one *window*.' },
    { t: T.m3, who: 'M', text: 'start with one small *true* thing.' },
  ],
  boxes: [[3.2, 16.6]],
  cam(t) { const w = 1 - ease.outCubic(prog(t, 0, T.slam + 0.1)); return { zoom: 1 + 0.2 * w, dx: 40 * w, dy: 20 * w } },
  pose(t) {
    const b = ease.outCubic(prog(t, T.slam + 0.1, T.slam + 0.7))
    const p = { x: lerp(400, 300, b), y: lerp(1150, 1225, b), s: lerp(300, 280, b), mood: 'squint', look: [1, 0], blink: false, squash: t < T.slam ? -0.1 : 0.15 * (1 - b) * Math.cos(b * 8) }
    if (t > 1) { p.blink = undefined; p.look = [1, -0.3] }
    if (t > T.tap) { p.mood = 'wide'; p.look = [1, -1] }
    if (t > T.m1 + 1.2) { p.mood = 'neutral'; p.look = [0.4, 0.3] }
    if (t > T.s2) { p.mood = 'neutral'; p.look = [1, 0] }
    if (t > T.crack[0]) { p.mood = 'wide'; p.look = [1, 0.2] }
    if (t > T.m3) { p.mood = 'sparkle'; p.look = [1, -0.8] }
    if (t > T.flip) { p.mood = 'happy'; p.look = undefined }
    return p
  },
  refl(t) {
    const p = { y: 830, mood: 'squint', look: [-1, 0.6] }
    if (t > T.tap) { p.mood = 'neutral'; p.x = 600; p.squash = t < T.tap + 0.6 ? 0.08 * Math.sin((t - T.tap) * 40) : 0 }
    if (t > T.m1) p.mood = 'happy'
    if (t > T.crack[0]) p.mood = 'sparkle'
    return p
  },
  pis(t) {
    const p = { tears: 2, mood: 'wide' }
    if (t > T.crack[0]) { p.tears = 3; p.mood = 'sparkle' }
    if (t > T.warm) p.mood = 'happy'
    return p
  },
  tissuePulls: [T.crack[1], T.crack[1] + 0.4, T.warm + 0.3],
  glass(x, t) {
    // the reflection's knuckle-taps on the glass
    for (const t0 of [T.tap, T.tap + 0.25]) {
      const p = prog(t, t0, t0 + 0.5)
      if (p > 0 && p < 1) { x.save(); x.globalAlpha = 1 - p; x.strokeStyle = '#bff4ff'; x.lineWidth = 6; x.beginPath(); x.arc(480, 800, 20 + 90 * p, 0, 7); x.stroke(); x.restore() }
    }
  },
  front(x, t) {
    vault(x, t)
    if (t > T.card && t < T.last + 0.3) {
      const k = easeOutBack(prog(t, T.card, T.card + 0.35), 1.6) * outK(t, [T.last - 0.1, T.last + 0.25])
      drawTalkCard(x, t, { cx: 690, cy: 720, w: 280, rot: 0.06, k, flip: ease.inOutCubic(prog(t, T.flip, T.flip + 0.4)), text: "What's something you're proud of lately?" })
    }
    hearts(x, t, T.warm, V.cx + 60, V.cy - 60, { n: 7, cell: 7, spread: 200, life: 2 })
    hearts(x, t, T.warm + 1.2, V.cx + 60, V.cy - 60, { n: 6, cell: 7, spread: 200, life: 2 })
    sparkles(x, t, V.cx, V.cy, T.crack[1], 10, 200, 2, [GOLD, '#ffd0a0', '#fff'])
    sparkles(x, t, 690, 720, T.flip + 0.35, 10, 220, 3)
  },
  cues: [
    ['whoosh', 0.0, 0.4, 0.04], ['boom', T.slam, 0.3], ['tom', T.slam, 70, { gain: 0.3, decay: 0.4 }], ['bell', T.slam + 0.02, 440, 0.04, 1.4, 0],
    ...Array.from({ length: 10 }, (_, i) => ['tick', r3(T.dial[0] + i * 0.095), 0.04]), ['pop', T.locked, 330, 0.05, 0],
    ['tick', T.tap, 0.07], ['tick', T.tap + 0.25, 0.07],
    ['whoosh', T.crack[0], 0.5, 0.035], ['riser', T.crack[0], T.crack[1] + 0.3, 0.03], ['bell', T.crack[1], 1046.5, 0.03, 1.4, 0], ['glitter', T.crack[1], T.crack[1] + 0.6],
    ['whoosh', T.card, 0.4, 0.035], ['pluck', T.flip + 0.3, 1046.5, 0.04, 0.6, 0.2],
    ['swell', T.warm - 0.4, T.warm + 0.6, { gain: 0.04, f0: 600, f1: 5000 }], ['glitter', T.warm, T.warm + 1.0],
    ['bell', T.last + 0.6, 1046.5, 0.03, 1.2, 0],
  ],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
