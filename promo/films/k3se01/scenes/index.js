// k3se01: 3-SECOND ADVICE · "Left on Read" (7.5 s vertical trial reel, music: pop · D). Format: ../threekit.js.
//   0.00  frame 0: ♈ Aries mid-yell ("AAAA!"), the phone mid-flight off the bed, a "Read 2:14 PM" tag riding it.
//         Hook: "Left on read. *Again.*"  Pisces sniffles in the corner.
//   0.50  record scratch: freeze frame, colour drains.   1.0–2.4  3 · 2 · 1.
//   2.40  THE STARS: "Silence isn't a verdict. Go *live your day.*"  Aries catches the phone, lays it face down on
//         the bed ("face down."), skips to the door ("bye, phone!") and out into the sunshine.
//   6.60  the punchline: the face-down phone buzzes on the empty bed (bzz). Pisces fountains. Hard cut at 7.5.
import { makeThree, R, box, bubble, label, shadow, streaks, phone, chat, sparkles, lerp, prog, ease, clamp, INK, BONE, GOLD, RED, INTER, MONO } from '../threekit.js'

const BUZZ = 6.6
// the bedroom: floor, a bed (left), a door (right)
function room(x, t, doorOpen) {
  R(x, '#211a3a', 0, 1150, 1080, 120); R(x, '#2e2650', 0, 1150, 1080, 10)
  // bed
  box(x, 70, 1020, 470, 120, '#6a4fb0', { b: 7, hi: '#8a6fd0' })
  box(x, 70, 960, 40, 190, '#5a3d2a', { b: 6 }); box(x, 500, 1000, 40, 150, '#5a3d2a', { b: 6 })
  box(x, 130, 985, 130, 46, BONE, { b: 6 })
  R(x, '#efe6d6', 300, 1000, 200, 20)
  // door
  const dx = 790, dy = 690, dw = 220, dh = 460
  R(x, INK, dx - 10, dy - 10, dw + 20, dh + 10)
  if (doorOpen > 0) {
    const g = x.createLinearGradient(dx, dy, dx, dy + dh); g.addColorStop(0, '#ffe7a3'); g.addColorStop(1, '#ffd36b')
    x.fillStyle = g; x.fillRect(dx, dy, dw, dh)
    // sunshine spilling in
    x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.25 * doorOpen; x.fillStyle = '#fff1c0'
    x.beginPath(); x.moveTo(dx, dy + dh); x.lineTo(dx + dw, dy + dh); x.lineTo(dx + dw - 40, dy + dh + 110); x.lineTo(dx - 300, dy + dh + 110); x.closePath(); x.fill(); x.restore()
  }
  const ow = dw * (1 - 0.82 * doorOpen)
  box(x, dx, dy, ow, dh, '#8a5a3a', { b: 0 }); R(x, '#a06c46', dx + 14, dy + 20, Math.max(0, ow - 28), 180); R(x, '#a06c46', dx + 14, dy + 230, Math.max(0, ow - 28), 200)
  R(x, GOLD, dx + ow - 30, dy + 250, 14, 14)
}
// the phone's flight (hook): off the bed corner, spinning, past Aries' head
const flight = u => { const p = (u + 0.55) / 1.1; return { x: lerp(860, 240, p), y: 1000 - 470 * Math.sin(Math.PI * Math.min(1, p * 0.9 + 0.05)), r: -2.4 + p * 6 } }
function readTag(x, px, py, k = 1) {
  x.save(); x.translate(px, py); x.scale(k, k)
  box(x, -125, -30, 250, 60, '#14102a', { b: 5 })
  x.font = `700 30px ${MONO}`; x.fillStyle = '#9aa6ff'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('Read 2:14 PM', 0, 2)
  x.restore()
}
const screen = (x, w) => { chat(x, w, 40, 'had fun!! again', { mine: true, size: 22 }); chat(x, w, 100, 'soon? :)', { mine: true, size: 22 }) }

function scene(x, t, S) {
  const { phase, u, hero } = S
  if (phase === 'hook') {
    room(x, t, 0)
    shadow(x, 610, 1150, 260)
    hero(x, t, { x: 610, y: 960, s: 290, mood: 'wide', look: [-1, -1], squash: -0.08 + 0.04 * Math.sin(t * 40) })
    label(x, 'AAAA!', 740, 700 + 6 * Math.sin(t * 50), { size: 70, col: RED, font: INTER, weight: 800, rot: 0.12 })
    const f = flight(u)
    streaks(x, f.x, f.y, [-0.8, -0.6], { n: 4, len: 110 })
    phone(x, f.x, f.y, { w: 190, h: 330, rot: f.r, draw: screen })
    readTag(x, f.x + 10, f.y + 210)
    return
  }
  // fix: catch → face down on the bed → out the door → the phone buzzes
  const door = ease.inOutCubic(prog(u, 2.0, 2.5))
  room(x, t, door)
  let hx = 610, hy = 960, alpha = 1, mood = 'neutral'
  if (u > 0.5) hx = lerp(610, 380, ease.inOutCubic(prog(u, 0.5, 1.3)))
  if (u > 1.7) { hx = lerp(380, 900, ease.inOutCubic(prog(u, 1.7, 2.7))); mood = 'happy' }
  if (u > 1.4) mood = 'happy'
  if (u > 2.9) { alpha = 1 - prog(u, 2.9, 3.3); hy -= 40 * prog(u, 2.9, 3.3) }
  const hops = [2.4 + 0.02, 2.4 + 0.9, 2.4 + 1.9, 2.4 + 2.3, 2.4 + 2.7, 2.4 + 2.95]
  const phoneDown = u > 1.35
  // phone: rest of the flight → caught → carried → face down on the bed
  if (!phoneDown) {
    let px, py, r
    if (u < 0.35) { const a = flight(0.05), p = ease.outCubic(u / 0.35); px = lerp(a.x, hx + 150, p); py = lerp(a.y, hy - 40, p); r = lerp(a.r, 0.2, p) }
    else { px = hx + 150; py = hy - 40 + (u > 0.9 ? lerp(0, 60, prog(u, 0.9, 1.35)) : 0); r = 0.2 }
    phone(x, px, py, { w: 150, h: 260, rot: r, draw: screen })
  }
  if (alpha > 0) {
    shadow(x, hx, 1150, 250 * alpha)
    hero(x, t, { x: hx, y: hy, s: 270, mood, look: u < 1.4 ? [-1, 0.6] : [1, -0.2], hops, alpha })
  }
  if (phoneDown) {
    // flat on the bed, screen down; it buzzes at the end
    const bz = t > BUZZ ? Math.sin(t * 70) * 6 * (Math.sin((t - BUZZ) * 9) > 0 ? 1 : 0.2) : 0
    const glow = t > BUZZ ? 0.6 + 0.4 * Math.sin(t * 20) : 0
    if (glow > 0) { x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.5 * glow; const g = x.createRadialGradient(410, 1000, 10, 410, 1000, 170); g.addColorStop(0, '#bcd2ff'); g.addColorStop(1, 'rgba(188,210,255,0)'); x.fillStyle = g; x.fillRect(240, 830, 340, 340); x.restore() }
    box(x, 330 + bz, 985, 160, 26, '#2a2148', { b: 6 })
    R(x, '#3e3466', 352 + bz, 991, 30, 8)
    label(x, 'face down.', 300, 900, { size: 34, col: BONE, alpha: clamp(prog(u, 1.9, 2.1)) * (1 - prog(u, 3.6, 3.8)) })
    if (t > BUZZ) {
      const k = Math.min(1, (t - BUZZ) / 0.12)
      label(x, 'bzz', 290 + bz, 930 - 10 * k, { size: 46 * k, col: '#bcd2ff', font: INTER, weight: 800, rot: -0.2 })
      label(x, 'bzz', 535 - bz, 920 - 14 * k, { size: 40 * k, col: '#bcd2ff', font: INTER, weight: 800, rot: 0.2 })
      sparkles(x, t, 410, 990, BUZZ, 8, 120, 1, ['#bcd2ff', BONE])
    }
  }
  bubble(x, t, 760, 760, 2.4 + 2.0, 2.4 + 3.1, 'bye, phone!', { size: 36, tail: 0.4 })
}

const EP = makeThree({
  id: 'k3se01', sign: 'aries', dur: 7.5, brk: 'freeze', ending: 'cut', focus: [520, 760],
  hook: 'Left on read. | *Again.*',
  advice: "Silence isn't a verdict. | Go *live your day.*",
  scene,
  cues: [
    ['whoosh', 0.0, 0.35, 0.03], ['pop', 2.42, 1318.51, 0.04, 0.2], ['pop', 3.75, 659.25, 0.035, -0.3], ['tick', 3.77, 0.06],
    ['pop', 4.4, 880, 0.03, 0.4], ['pop', 4.95, 1174.66, 0.035, 0.4], ['whoosh', 5.3, 0.35, 0.03], ['pluck', 5.5, 1567.98, 0.03, 0.4, 0.3],
    ['tick', 6.6, 0.08], ['tick', 6.66, 0.07], ['tick', 6.72, 0.08], ['tick', 6.9, 0.07], ['tick', 6.96, 0.08], ['pop', 6.62, 1760, 0.04, -0.3], ['glitter', 6.62, 7.1],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
