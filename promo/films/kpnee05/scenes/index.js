// kpnee05: PLANET TALK: NEPTUNE, "Neptune to Leo: Not the Premiere" (24 s vertical, star_talk, funk · F). Hard cut.
//   0.00  frame 0: a red carpet under a spotlight, confetti mid-air, Neptune mid-zoom down the beam, Leo mid-pose.
//         "Leo. This isn't | the *premiere.*" · 1.0 record scratch: "*second* date." / leo expected a premiere.
//   2.6   Leo's daydream: a string quartet, a hot-air balloon, a spotlight. "I expected *strings.* a balloon. at least a
//         *spotlight.*" · Neptune: "honestly? same. I've seen *ninety* of those films."
//   9.0   the date arrives with a picnic blanket and two sandwiches: "I made us *sandwiches.*" · Leo: "…where's the *orchestra?*"
//  15.5   Neptune: "the best romance scenes are the *small* ones." · Leo bites: "okay. this is *really* good." · Pisces sobs
//  21.6   "Cut. Print. *Picnic.*" Hard cut.
import { episode, P, drawSpace, drawSign, pop01, outK, prog, ease, lerp, clamp, rng, INK, BONE, GOLD, ROSE } from '../../kpnee01/scenes/nepkit.js'

const D = 24
const T = { dream: 2.6, nep1: 6.3, date: 9.0, orch: 11.7, small: 15.5, bite: 18.7, end: 21.6 }
const DATE = '#8fd9a8'

function carpet(x, t, { spot = 1 } = {}) {
  drawSpace(x, t, { planet: 'neptune', seed: 51 })
  x.fillStyle = '#b3203f'; x.beginPath(); x.moveTo(420, 1100); x.lineTo(660, 1100); x.lineTo(1000, 1920); x.lineTo(80, 1920); x.closePath(); x.fill()
  x.fillStyle = '#8a1430'; x.fillRect(0, 1060, 1080, 50)
  for (const px of [200, 880]) { x.fillStyle = GOLD; x.fillRect(px - 8, 1180, 16, 320); x.beginPath(); x.arc(px, 1180, 22, 0, Math.PI * 2); x.fill() }
  x.strokeStyle = '#7a1430'; x.lineWidth = 14; x.beginPath(); x.moveTo(200, 1220); x.quadraticCurveTo(540, 1330, 880, 1220); x.stroke()
  if (spot > 0) P.beam(x, 540, -100, 540, 1500, 700, 0.18 * spot, '#fff3c8')
}
function confetti(x, t, t0 = -0.5) {
  const R = rng(55)
  for (let i = 0; i < 50; i++) {
    const sx = R() * 1080, sp = 140 + R() * 200, ph = R() * 6
    const y = ((t - t0) * sp + R() * 1900) % 1920
    x.save(); x.translate(sx + Math.sin(t * 2 + ph) * 30, y); x.rotate(t * 3 + ph)
    x.fillStyle = [GOLD, ROSE, '#7fe0ff', BONE][i % 4]; x.fillRect(-10, -5, 20, 10); x.restore()
  }
}
function dream(x, w, h, t) {
  x.fillStyle = '#ffe9c0'; x.fillRect(-w / 2, -h / 2, w, h)
  P.beam(x, 0, -h / 2 - 50, 0, h / 2, 400, 0.4, '#ffffff')
  // the balloon
  x.save(); x.translate(230, -110 + Math.sin(t * 2) * 12)
  x.fillStyle = '#e04a5f'; x.beginPath(); x.ellipse(0, 0, 90, 110, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = GOLD; x.fillRect(-12, -110, 24, 210)
  x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(-50, 90); x.lineTo(-30, 160); x.moveTo(50, 90); x.lineTo(30, 160); x.stroke()
  x.fillStyle = '#8a5a3a'; x.fillRect(-35, 160, 70, 50); x.restore()
  // the quartet: four little stars with violins
  for (let i = 0; i < 4; i++) {
    const qx = -300 + i * 110, qy = 120
    drawSign(x, 'virgo', qx, qy, 100, t + i * 0.3, { color: ['#c9a6ff', '#9fc0ff', '#ffd98a', '#9fe6b0'][i], glyph: false, mood: 'happy', blink: false })
    x.save(); x.translate(qx + 30, qy - 10); x.rotate(-0.6 + Math.sin(t * 8 + i) * 0.1); x.fillStyle = '#8a4a2a'; x.beginPath(); x.ellipse(0, 0, 14, 26, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = INK; x.fillRect(-2, -60, 4, 40); x.restore()
  }
}
function picnic(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.translate(540, 1560); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 440, 120, 0, 0, Math.PI * 2); x.fill()
  x.save(); x.beginPath(); x.ellipse(0, 0, 430, 112, 0, 0, Math.PI * 2); x.clip()
  for (let i = -10; i < 10; i++) for (let j = -3; j < 3; j++) { x.fillStyle = (i + j) % 2 ? '#e04a5f' : BONE; x.fillRect(i * 48, j * 48, 48, 48) }
  x.restore()
  x.restore()
}
function sandwich(x, cx, cy, s = 1, bite = 0) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-70, 40); x.lineTo(70, 40); x.lineTo(0, -60); x.closePath(); x.fill()
  x.fillStyle = '#f2d39a'; x.beginPath(); x.moveTo(-60, 34); x.lineTo(60, 34); x.lineTo(0, -50); x.closePath(); x.fill()
  x.fillStyle = '#7fc27f'; x.fillRect(-56, 18, 112, 10); x.fillStyle = '#e04a5f'; x.fillRect(-50, 8, 100, 8)
  if (bite > 0) { x.globalCompositeOperation = 'destination-out'; x.beginPath(); x.arc(0, -52, 34 * bite, 0, Math.PI * 2); x.fill(); x.globalCompositeOperation = 'source-over' }
  x.restore()
}

const E = episode({
  sign: 'leo', duration: D, ending: 'cut',
  entrance: { kind: 'zoom', at: -0.5, x: 540, y: 720, size: 420 },
  hook: { text: 'Leo. This isn’t | the *premiere.*', out: [2.35, 2.55], size: 112 },
  fx: [{ kind: 'rec', at: 1.0, len: 1.35, caption: '*second* date.', sub: 'leo expected a premiere.' }],
  caps: [{ at: T.end, text: 'Cut. Print. | *Picnic.*', top: 250, size: 116 }],
  cry: [[0, 2], [4.2, 3], [7.0, 2], [12.5, 2], [19.0, 3]],
  shots: [
    { a: -1, b: T.dream, bg: (x, t) => { carpet(x, t); confetti(x, t) },
      nep: { x: 540, y: 720, size: 420, mood: 'wide' }, sign: { x: 540, y: 1400, size: 310, mood: 'wink', look: [0, 0], shadow: true } },
    { a: T.dream, b: T.date, bg: (x, t) => carpet(x, t, { spot: 0.5 }),
      front: (x, t) => P.thought(x, 540, 760, 880, 620, (c, w, h) => dream(c, w, h, t), { k: pop01(t, T.dream, 0.4, 1.6), from: [560, 1250] }),
      nep: { x: 150, y: 1260, size: 220, mood: [[0, 'love'], [T.nep1, 'happy']] }, sign: { x: 620, y: 1400, size: 300, mood: 'sparkle', look: [0, -1] } },
    { a: T.date, b: T.small, bg: (x, t) => carpet(x, t, { spot: 0.3 }), back: (x, t) => { picnic(x, t, pop01(t, T.date, 0.4)); drawSign(x, 'libra', 300, 1380, 260, t, { color: DATE, glyph: false, mood: 'happy', look: [1, 0], seed: 8, hops: [T.date + 0.5, T.date + 0.9] }); if (t > T.date + 0.4) { sandwich(x, 230, 1560, 0.9); sandwich(x, 380, 1580, 0.9) } },
      nep: { x: 200, y: 800, size: 250, mood: [[0, 'happy']] }, sign: { x: 780, y: 1380, size: 300, mood: [[0, 'neutral'], [T.orch, 'squint']], look: [-1, 0] } },
    { a: T.small, b: T.end, bg: (x, t) => carpet(x, t, { spot: 0.6 }), back: (x, t) => { picnic(x, t, 1); drawSign(x, 'libra', 300, 1380, 260, t, { color: DATE, glyph: false, mood: t > T.bite + 0.5 ? 'heart' : 'happy', look: [1, 0], seed: 8 }); sandwich(x, 380, 1580, 0.9) },
      front: (x, t) => { if (t > T.bite - 0.6) sandwich(x, 700, 1440, 0.8, prog(t, T.bite, T.bite + 0.1)); P.hearts(x, t, T.bite + 0.4, 540, 1200, { n: 10, spread: 600 }) },
      nep: { x: 540, y: 760, size: 360, mood: [[0, 'love']] }, sign: { x: 780, y: 1380, size: 300, mood: [[0, 'neutral'], [T.bite, 'happy']], look: [-1, 0] } },
    { a: T.end, b: D + 1, bg: (x, t) => { carpet(x, t); confetti(x, t, T.end) }, back: (x, t) => { picnic(x, t, 1); drawSign(x, 'libra', 300, 1380, 260, t, { color: DATE, glyph: false, mood: 'heart', look: [1, 0], seed: 8 }) },
      nep: { x: 540, y: 800, size: 330, mood: 'proud' }, sign: { x: 780, y: 1380, size: 300, mood: 'heart', look: [-1, 0] } },
  ],
  lines: [
    { t0: T.dream + 0.3, t1: T.nep1 - 0.25, who: 'leo', text: 'I expected *strings.* a balloon. at least a *spotlight.*', x: 560, y: 1710, tailUp: true, tail: 0 },
    { t0: T.nep1, t1: T.date - 0.2, who: 'neptune', text: "honestly? same. I've seen *ninety* of those films.", x: 540, y: 1710, tailUp: true, tail: -280 },
    { t0: T.date + 0.6, t1: T.orch - 0.2, who: 'the date', color: DATE, text: 'I made us *sandwiches.*', x: 420, y: 1100, tail: -60 },
    { t0: T.orch, t1: T.small - 0.2, who: 'leo', text: "…where's the *orchestra?*", x: 640, y: 1100, tail: 120 },
    { t0: T.small + 0.2, t1: T.bite - 0.1, who: 'neptune', text: 'the best romance scenes are the *small* ones.', x: 540, y: 1110, tailUp: true, tail: 0 },
    { t0: T.bite + 0.4, t1: T.end - 0.2, who: 'leo', text: 'okay. this is *really* good.', x: 600, y: 1740, tailUp: true, tail: 160 },
  ],
  cues: [['whoosh', T.dream, 0.4, 0.04], ['glitter', T.dream + 0.3, T.dream + 1.0], ['pop', T.date + 0.4, 880, 0.05, 0], ['tick', T.bite, 0.1], ['pop', T.bite + 0.05, 523.25, 0.05, 0.2], ['glitter', T.end, T.end + 0.6]],
})
export const DURATION = E.DURATION, SCENES = E.SCENES, CUES = E.CUES
