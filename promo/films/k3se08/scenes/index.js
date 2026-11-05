// k3se08: 3-SECOND ADVICE · "The 2 a.m. Scroll" (6.8 s vertical trial reel, music: screwed · Em). Format: k3se01/threekit.js.
//   0.00  frame 0: ♏ Scorpio in bed in the dark, lit blue by the phone, thumb a blur, old photos whizzing up the screen;
//         the clock reads 2:13.  Hook: "Scrolling *old photos* | at 2 a.m."  Pisces sniffles in the corner.
//   0.50  record scratch: the photo strip freezes on a heart.   0.95–2.45  3 · 2 · 1.
//   2.45  THE STARS: "Phone on the charger, far away. | *Sleep wins.*"  The phone flies across the room onto the
//         charger on the dresser (click, charging bolt), the lamp clicks off, Scorpio burrows in, sleepy.
//   5.85  the phone lights up across the room… Scorpio, eyes shut: "nope. sleeping." Hard cut at 6.8.
import { makeThree, R, box, bubble, label, shadow, phone, clockBadge, drawBits, HEART, streaks, lerp, prog, ease, clamp, INK, BONE, GOLD, PINK, SKYB, INTER } from '../../k3se01/threekit.js'

const PCOL = ['#ff8fb1', '#7fd0ff', '#f2c75c', '#9fe6b0', '#c9a6ff', '#ff9f6a']
function photos(c, w, h, off) {
  for (let i = -1; i < 6; i++) {
    const y = ((i * 170 - off) % 1020 + 1020) % 1020 - 170
    R(c, '#efe6d6', 18, y, w - 36, 150); R(c, PCOL[(i + 60) % 6], 28, y + 10, w - 56, 104)
    // two little stars in the photo
    drawBits(c, ['..X..', '.XXX.', 'XXXXX', '.X.X.'], { X: '#f2c75c' }, 90, y + 70, 8)
    drawBits(c, ['..X..', '.XXX.', 'XXXXX', '.X.X.'], { X: '#d55a8a' }, w - 90, y + 70, 8)
    if ((i + 60) % 3 === 0) drawBits(c, HEART, { H: '#e8344e' }, w / 2, y + 50, 6)
  }
}
function roomBase(x, dark) {
  R(x, '#1a1430', 0, 1150, 1080, 120); R(x, '#262040', 0, 1150, 1080, 10)
  // window + moon
  box(x, 60, 560, 240, 260, '#0d0b22', { b: 8 }); R(x, INK, 176, 560, 8, 260); R(x, INK, 60, 686, 240, 8)
  x.fillStyle = '#f7e9b8'; x.beginPath(); x.arc(120, 620, 28, 0, 7); x.fill(); x.fillStyle = '#0d0b22'; x.beginPath(); x.arc(134, 612, 24, 0, 7); x.fill()
  // dresser + charger (right)
  box(x, 860, 960, 190, 190, '#4a3550', { b: 7, hi: '#5c4466' }); R(x, INK, 900, 1040, 110, 6); R(x, INK, 900, 1100, 110, 6)
  R(x, '#f2f2f2', 1000, 940, 26, 20)
}
function bedBack(x) { box(x, 120, 980, 40, 170, '#5a3d2a', { b: 6 }) }
function blanket(x) { box(x, 120, 1030, 640, 120, '#6b3fa0', { b: 7, hi: '#7f52b8' }); box(x, 700, 1000, 40, 150, '#5a3d2a', { b: 6 }) }
function glow(x, cx, cy, a) { if (a <= 0) return; x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = a; const g = x.createRadialGradient(cx, cy, 20, cx, cy, 380); g.addColorStop(0, 'rgba(120,170,255,0.45)'); g.addColorStop(1, 'rgba(120,170,255,0)'); x.fillStyle = g; x.fillRect(cx - 380, cy - 380, 760, 760); x.restore() }

function scene(x, t, S) {
  const { phase, u, hero } = S
  roomBase(x)
  bedBack(x)
  if (phase === 'hook') {
    clockBadge(x, 955, 1060, '2:13')
    glow(x, 560, 900, 1)
    hero(x, t, { x: 360, y: 890, s: 310, mood: 'squint', look: [1, -0.2] })
    blanket(x)
    phone(x, 610, 830, { w: 300, h: 520, rot: -0.05, draw: (c, w, h) => photos(c, w, h, t * 1500) })
    // the thumb: a blur flicking up
    const ty = 980 - ((t * 9) % 1) * 160
    R(x, '#f39a3a', 650, ty, 56, 70); streaks(x, 678, ty, [0, -1], { n: 3, len: 90, gap: 22 })
    return
  }
  const fly = ease.inOutCubic(prog(u, 0.1, 0.65)), plugged = u > 0.65, lightsOut = u > 1.2
  clockBadge(x, 955, 1060, u > 2.5 ? '2:16' : '2:13')
  glow(x, lerp(560, 960, fly), lerp(900, 930, fly), lightsOut ? 0 : 1 - 0.6 * fly)
  const sl = ease.inOutCubic(prog(u, 1.4, 2.0))
  hero(x, t, { x: 360, y: lerp(890, 950, sl), s: 310, mood: u < 0.6 ? 'wide' : u < 1.4 ? 'neutral' : 'sleepy', look: [1, 0], hops: [2.45 + 0.1] })
  blanket(x)
  // the phone flies onto the charger
  if (!plugged) phone(x, lerp(610, 960, fly), lerp(830, 900, fly) - 160 * Math.sin(Math.PI * fly), { w: lerp(300, 70, fly), h: lerp(520, 120, fly), rot: -0.05 + 6.2 * fly, draw: (c, w, h) => photos(c, w, h, 2.45 * 1500) })
  else {
    const buzz = t > 5.85 ? 3 * Math.sin(t * 70) : 0
    box(x, 925 + buzz, 900, 70, 40, '#2a2148', { b: 5 })
    R(x, INK, 990, 920, 14, 4)
    if (t > 5.85) { x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.5 + 0.4 * Math.sin(t * 20); const g = x.createRadialGradient(960, 915, 5, 960, 915, 120); g.addColorStop(0, '#bcd2ff'); g.addColorStop(1, 'rgba(188,210,255,0)'); x.fillStyle = g; x.fillRect(840, 800, 240, 240); x.restore() }
    
  }
  if (plugged && u < 1.2) label(x, 'click. charging.', 880, 830, { size: 32, col: GOLD })
  // lights out
  if (lightsOut) { x.fillStyle = `rgba(4,2,14,${0.4 * clamp(prog(u, 1.2, 1.3))})`; x.fillRect(0, 0, 1080, 1920) }
  if (u > 1.2 && u < 1.9) label(x, 'lights out.', 540, 700, { size: 44, col: BONE, font: INTER, weight: 800, alpha: 1 - prog(u, 1.7, 1.9) })
  if (t > 5.95) bubble(x, t, 400, 700, 5.95, 99, 'nope. sleeping.', { size: 40, tail: -0.3 })
}

const EP = makeThree({
  id: 'k3se08', sign: 'scorpio', dur: 6.8, brk: 'freeze', ending: 'cut', focus: [560, 840],
  hook: 'Scrolling *old photos* | at 2 a.m.', accent: '#ff6f8a',
  advice: 'Phone on the charger, far away. | *Sleep wins.*', adviceSize: 56,
  scene,
  cues: [
    ['whoosh', 0.0, 0.3, 0.025],
    ['whoosh', 2.55, 0.5, 0.04], ['tick', 3.1, 0.1], ['pop', 3.12, 1318.51, 0.035, 0.6], ['tick', 3.65, 0.12], ['boom', 3.66, 0.1],
    ['tick', 5.85, 0.07], ['tick', 5.91, 0.07], ['tick', 5.97, 0.07], ['pop', 5.98, 659.25, 0.04, -0.3],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
