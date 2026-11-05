// k3se10: 3-SECOND ADVICE · "Too Busy for Love" (8.0 s vertical trial reel, loops, music: cinematic · Dm).
// Format: k3se01/threekit.js.
//   0.00  frame 0: ♑ Capricorn at a desk mid-avalanche of paper (sheets flying everywhere); under the pile a pink
//         heart notification keeps buzzing: "dinner this week?"  Hook: "Too busy for love. | *Again.*"  Pisces sniffles.
//   0.50  whip zoom onto the heart; the frame holds.   0.95–2.45  3 · 2 · 1.
//   2.45  THE STARS: "Put them in the calendar | *like it matters.*"  The paper settles into one neat stack; Capricorn
//         writes on the wall calendar: FRI 7 PM + a heart, and taps the notification: "friday works!"
//   7.55–8.0  loop: eases back into frame 0.
import { makeThree, R, box, bubble, label, shadow, drawBits, HEART, sparkles, lerp, prog, ease, clamp, INK, BONE, GOLD, PINK, RED, INTER, MONO } from '../../k3se01/threekit.js'

const N = 16
function sheetAt(i, t, settled) {
  const ph = i * 0.73
  const fx = 150 + ((i * 137) % 760), fy = 520 + ((i * 89) % 560)
  const ax = fx + 60 * Math.sin(t * 3 + ph), ay = fy + 40 * Math.cos(t * 2.4 + ph), ar = t * (2 + (i % 3)) + ph
  const sx = 220 + (i % 2) * 4, sy = 1040 - i * 6, sr = (i % 3 - 1) * 0.02
  return { x: lerp(ax, sx, settled), y: lerp(ay, sy, settled), r: lerp(ar, sr, settled) }
}
function paper(x, p) { x.save(); x.translate(p.x, p.y); x.rotate(p.r); R(x, INK, -48, -34, 96, 68); R(x, BONE, -44, -30, 88, 60); for (let k = 0; k < 3; k++) R(x, '#b9ae9c', -34, -18 + k * 14, 60, 5); x.restore() }
function office(x) {
  R(x, '#211a3a', 0, 1150, 1080, 120); R(x, '#2e2650', 0, 1150, 1080, 10)
  box(x, 100, 1060, 680, 36, '#6e4b33', { b: 7, hi: '#8a6040' }); R(x, INK, 130, 1096, 24, 54); R(x, INK, 730, 1096, 24, 54)
}
function calendar(x, t, ink) {
  box(x, 720, 500, 320, 380, BONE, { b: 7 }); R(x, RED, 720, 500, 320, 60)
  x.font = `800 30px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THIS WEEK', 880, 531)
  const days = ['M', 'T', 'W', 'T', 'F']
  days.forEach((d, i) => { const y = 595 + i * 58; R(x, '#d9cfbe', 740, y - 22, 280, 46); x.font = `700 30px ${MONO}`; x.fillStyle = INK; x.textAlign = 'left'; x.fillText(d, 752, y + 2); if (i < 4) { x.fillStyle = '#7a7060'; x.fillText('work', 800, y + 2) } })
  if (ink > 0) {
    x.save(); x.beginPath(); x.rect(790, 805, 200 * ink, 50); x.clip()
    x.font = `800 32px ${INTER}`; x.fillStyle = RED; x.textAlign = 'left'; x.fillText('DATE 7PM', 796, 829)
    x.restore()
    if (ink >= 1) drawBits(x, HEART, { H: RED }, 1000, 829, 5)
  }
}
function notif(x, t, cx, cy, k, buzz) {
  if (k <= 0.01) return
  const b = buzz ? 5 * Math.sin(t * 60) : 0
  x.save(); x.translate(cx + b, cy); x.scale(k, k)
  box(x, -170, -40, 340, 80, PINK, { b: 6 })
  drawBits(x, HEART, { H: RED }, -135, 0, 6)
  x.font = `800 28px ${INTER}`; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('dinner this week?', -105, 2)
  x.restore()
}

function scene(x, t, S) {
  const { phase, u, hero } = S
  office(x)
  if (phase === 'hook') {
    calendar(x, t, 0)
    shadow(x, 460, 1060, 260)
    hero(x, t, { x: 440, y: 930, s: 300, mood: 'wide', look: [Math.sin(t * 13), -0.6], squash: 0.05 * Math.sin(t * 30) })
    notif(x, t, 440, 1010, 1, true)
    for (let i = 0; i < N; i++) paper(x, sheetAt(i, t, 0))
    return
  }
  const settle = ease.inOutCubic(clamp(u / 0.6))
  calendar(x, t, clamp(prog(u, 1.3, 1.9)))
  shadow(x, 460, 1060, 260)
  const walk = ease.inOutCubic(prog(u, 0.8, 1.3))
  hero(x, t, { x: lerp(440, 560, walk), y: lerp(930, 900, walk), s: 300, mood: u < 0.6 ? 'wide' : u > 2.3 ? 'happy' : 'neutral', look: walk > 0.5 ? [1, -0.3] : [0, 0], hops: [2.45 + 0.65, 2.45 + 1.3, 2.45 + 2.3] })
  for (let i = 0; i < N; i++) paper(x, sheetAt(i, 2.45, settle))
  // the pen stroke on the calendar
  if (u > 1.3 && u < 1.95) { const px = 796 + 190 * prog(u, 1.3, 1.9); R(x, INK, px, 770, 10, 60); R(x, GOLD, px + 2, 772, 6, 46) }
  if (u > 1.95) sparkles(x, t, 900, 829, 2.45 + 1.95, 8, 150, 1)
  notif(x, t, 440, 1120, u < 2.2 ? 1 : 0, false)
  if (u > 2.3) bubble(x, t, 480, 640, 2.45 + 2.3, 99, 'friday works!', { size: 42, tail: 0.1 })
}

const EP = makeThree({
  id: 'k3se10', sign: 'capricorn', dur: 8.0, brk: 'whip', ending: 'loop', focus: [440, 1000],
  hook: 'Too busy for love. | *Again.*', accent: '#ff8fb1',
  advice: 'Put them in the calendar | *like it matters.*',
  scene,
  cues: [
    ['whoosh', 0.0, 0.5, 0.035], ['tick', 0.12, 0.05], ['tick', 0.3, 0.05],
    ['whoosh', 2.5, 0.5, 0.04], ['tick', 3.05, 0.06], ['tick', 3.1, 0.05], ['tick', 3.15, 0.05],
    ['riser', 3.75, 4.35, 0.02], ['pop', 4.4, 1318.51, 0.04, 0.4], ['glitter', 4.4, 4.8], ['pop', 4.75, 987.77, 0.04, 0], ['pluck', 4.85, 1567.98, 0.035, 0.2, 0.4],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
