// nrde10: RATE MY DATE IDEA, "Capricorn plans a sunrise hike" (18 s vertical trial reel, music: screwed · Cm).
// Story 0–13.6, then the shared end card. The format lives in ../../nrde01/scenes/datekit.js.
//   0.0–2.6   hook: “Sunrise hike. *5 AM.* Snacks by the hour.”  ♑ Capricorn in a headlamp, checking a big wristwatch.
//   2.6–5.8   THE PLAN "on schedule. *every* step."  A dark trail; Capricorn marches with a clipboard ticking off times;
//             the ♊ Gemini date yawns behind.
//   5.8       card cut.
//   5.8–9.3   BUT… "the sun comes up. *the watch goes away.*"  The sky glows orange, the sun lifts over the hills;
//             Capricorn tucks the watch away and sits; the date leans on its shoulder.
//   9.32      THE STARS RATE IT 9/10 *worth the alarm*.  Pisces: 10/10.   9.8 THE STARS: "Stop timing it. *Watch* it."
import { makeDate, R, box, bubble, shadow, hearts, card, starFrame, pop01, prog, lerp, ease, clamp, INK, BONE, GOLD, PINK, MONO } from '../../nrde01/scenes/datekit.js'

function hills(x, y, col = '#1f1840', top = INK) {
  for (const [c, dy, amp, ph] of [[top, 0, 70, 0.3], [col, 30, 50, 1.6]]) {
    x.fillStyle = c; x.beginPath(); x.moveTo(0, 1320)
    for (let i = 0; i <= 20; i++) { const px = i * 54; x.lineTo(px, y + dy - amp * Math.abs(Math.sin(i * 0.45 + ph))) }
    x.lineTo(1080, 1320); x.closePath(); x.fill()
  }
}
function headlamp(x, t, o, on = 1) {
  const F = starFrame(o.x, o.y, o.s, t, o)
  const hy = F.cy - o.s * 0.12
  R(x, INK, o.x - o.s * 0.3, hy - 8, o.s * 0.6, 16); R(x, '#4f7cd8', o.x - o.s * 0.28, hy - 4, o.s * 0.56, 8)
  box(x, o.x - 16, hy - 20, 32, 30, '#ffe58a', { b: 4 })
  if (on > 0) { x.save(); x.globalCompositeOperation = 'lighter'; const d = o.look && o.look[0] < 0 ? -1 : 1; x.fillStyle = `rgba(255,240,170,${0.18 * on})`; x.beginPath(); x.moveTo(o.x, hy); x.lineTo(o.x + d * 420, hy - 120); x.lineTo(o.x + d * 420, hy + 160); x.closePath(); x.fill(); x.restore() }
}
function watch(x, cx, cy, k = 1, time = '5:00') {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  R(x, INK, -26, -80, 52, 160); R(x, '#5a5470', -20, -76, 40, 152)
  box(x, -62, -50, 124, 100, '#d9dce8', { b: 6 }); R(x, '#14102a', -50, -38, 100, 76)
  x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#9fe6b0'; x.fillText(time, 0, 2)
  x.restore()
}
function sunrise(x, k) {
  if (k <= 0) return
  x.save(); x.globalAlpha = k
  const g = x.createLinearGradient(0, 520, 0, 1200); g.addColorStop(0, 'rgba(255,140,90,0)'); g.addColorStop(0.6, 'rgba(255,150,90,0.55)'); g.addColorStop(1, 'rgba(255,214,140,0.85)')
  x.fillStyle = g; x.fillRect(0, 520, 1080, 700)
  x.restore()
  const sy = lerp(1160, 900, k)
  x.save(); x.globalCompositeOperation = 'lighter'; const h = x.createRadialGradient(540, sy, 20, 540, sy, 330); h.addColorStop(0, `rgba(255,220,140,${0.6 * k})`); h.addColorStop(1, 'rgba(255,220,140,0)'); x.fillStyle = h; x.fillRect(200, sy - 330, 680, 660); x.restore()
  x.beginPath(); x.arc(540, sy, 110, 0, Math.PI * 2); x.fillStyle = INK; x.fill()
  x.beginPath(); x.arc(540, sy, 102, 0, Math.PI * 2); x.fillStyle = '#ffcf6b'; x.fill()
}

const EP = makeDate({
  id: 'nrde10', sign: 'capricorn', date: 'gemini', accent: '#b9a6ff', deep: '#4a3a8a',
  idea: 'Sunrise hike. *5 AM.* Snacks by the hour.',
  sky: { dim: 0.85 },
  hook(x, t, S) {
    hills(x, 1290)
    const o = { x: 420, y: 1090, s: 300, mood: 'squint', look: [1, 0.3], hops: S.HOOK_HOPS }
    shadow(x, 420, 1320, 220)
    S.hero(x, t, o); headlamp(x, t, o, 1)
    watch(x, 760, 1040 + Math.sin(t * 4) * 8, 1.1, t < 1.3 ? '4:59' : '5:00')
  },
  beats: [
    { caption: 'on schedule. *Every* step.', draw(x, t, S) {
      const { u, hero, date } = S
      hills(x, 1160)
      const step = Math.floor(u * 3)
      const o = { x: 680 + Math.sin(u * 9) * 8, y: 1000, s: 200, mood: 'squint', look: [-1, 0.3], hops: Array.from({ length: 9 }, (_, i) => S.t0 + i * 0.33) }
      shadow(x, o.x, 1170, 160)
      hero(x, t, o); headlamp(x, t, o, 1)
      card(x, 760, 720, 330, 120, `5:${String(12 + step * 3).padStart(2, '0')} step ✓\nsnack #1 at 6:00`, { size: 30, rot: 0.04, k: pop01(t, S.t0 + 0.2, 0.3, 2.4) })
      shadow(x, 260, 1180, 160)
      date(x, t, { x: 260, y: 1020, s: 180, mood: u % 1.2 < 0.6 ? 'sleepy' : 'neutral', look: [1, 0], hops: [S.t0 + 1.4] })
      bubble(x, t, 280, 800, S.t0 + 1.5, S.t1, 'yawwwn.', { size: 34 })
    }, cues: Array.from({ length: 9 }, (_, i) => ['tick', +(i * 0.33).toFixed(2), 0.04]).concat([['pop', 1.52, 659.25, 0.03, -0.3]]) },
    { caption: 'sunrise. *The watch goes away.*', draw(x, t, S) {
      const { u, hero, date } = S
      const k = ease.inOutCubic(prog(u, 0.0, 1.6))
      sunrise(x, k)
      hills(x, 1170, '#3a2a52', '#22183e')
      shadow(x, 430, 1190, 170); shadow(x, 640, 1190, 170)
      const lean = ease.inOutCubic(prog(u, 1.9, 2.4))
      const o = { x: 430, y: 1050, s: 190, mood: u < 1.2 ? 'neutral' : 'sparkle', look: [0.6, -0.6], hops: [S.t0 + 1.3], squash: 0.06 }
      hero(x, t, o); headlamp(x, t, o, clamp(1 - k * 1.5))
      date(x, t, { x: lerp(680, 600, lean), y: lerp(1050, 1062, lean), s: 180, mood: u < 1.2 ? 'wide' : 'happy', look: [-0.6, -0.6], squash: 0.06 })
      // the watch drops into a pocket (falls out of frame)
      const wk = 1 - prog(u, 1.3, 1.6)
      watch(x, 300, lerp(880, 1100, prog(u, 1.3, 1.6)), wk, '6:47')
      hearts(x, t, S.t0 + 2.4, 520, 1000, { n: 5, cols: ['#ff5c8a', '#e8344e', '#ff8fb1'] })
    }, cues: [['riser', 0.0, 1.6, 0.014], ['bell', 1.6, 1318.51, 0.03, 1.6, 0], ['whoosh', 1.3, 0.3, 0.02], ['pluck', 2.4, 1567.98, 0.035, 0, 0.3]] },
  ],
  score: '9/10', word: 'worth the alarm',
  last: 'Stop timing it. *Watch* it.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [BONE, GOLD, PINK]
