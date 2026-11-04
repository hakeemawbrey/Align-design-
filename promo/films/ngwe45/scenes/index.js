// ngwe45 · Your Star Guide: Winter · ♓ Pisces, winter note 1 / 4: how you love in winter (25 s; story 0–20.6, then the end card)
//   0.00  "Pisces, you planned the whole winter."  A snowy bus stop: Pisces, misty-eyed, under a giant daydream cloud;
//         the stranger beside it (♉) is reading.
//   3.0   ♓ YOUR STAR: "you love in winter in full daydream."  Inside the cloud: cocoa for two… ice skating… a snowman for two.
//   7.4   "cocoa, skating, a future. from one glance."  Pisces' happy tears stream.
//  11.8   "the real one is even better. go say hi."  POP: the cloud bursts. Pisces turns: "hi :)"  The stranger looks up: "hi!"
//  15.45  card flip · "Say hi to | the real one."  The two of them on the bench, smiling. Pisces: happy fountains.
import { winterGuide, drawStarChar, signStar, mug, prog, ease, lerp, clamp, INK, MONO, R, box, BONE, SNOW, ICE, heart, heartsUp, shadow } from '../../ngwe25/scenes/gwkit.js'

const PIS = signStar('pisces'), TAU = signStar('taurus')
const T0 = { scene: [-1, 4.6, 6.4, 8.2], pop: 13.0, hi: 13.4, hi2: 14.1 }
const C = { x: 470, y: 690 }

function cloud(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.translate(C.x, C.y); x.scale(k, k)
  const blobs = [[-170, 0, 130], [-60, -70, 140], [80, -60, 140], [190, 10, 120], [70, 80, 130], [-80, 80, 130]]
  x.fillStyle = INK; for (const [a, b, r] of blobs) { x.beginPath(); x.arc(a, b, r + 8, 0, Math.PI * 2); x.fill() }
  x.fillStyle = '#f5eedf'; for (const [a, b, r] of blobs) { x.beginPath(); x.arc(a, b, r, 0, Math.PI * 2); x.fill() }
  x.restore()
  // the little trail of puffs down to Pisces
  for (const [a, b, r] of [[-120, 300, 26], [-170, 370, 16]]) { x.fillStyle = INK; x.beginPath(); x.arc(C.x + a, C.y + b, (r + 6) * k, 0, Math.PI * 2); x.fill(); x.fillStyle = '#f5eedf'; x.beginPath(); x.arc(C.x + a, C.y + b, r * k, 0, Math.PI * 2); x.fill() }
}
function dream(x, t) {
  // which mini scene is up (each pops in)
  let i = 0; for (let k = 0; k < 4; k++) if (t >= T0.scene[k]) i = k
  i = Math.min(i, 2)
  const k = ease.outBack(prog(t, T0.scene[i], T0.scene[i] + 0.35))
  x.save(); x.translate(C.x, C.y + 10); x.scale(k, k)
  const pis = (px, py, o = {}) => drawStarChar(x, px, py, 110, t, { color: PIS.color, glyph: null, seed: 6, mood: 'heart', look: [1, 0], tips: false, ...o })
  const tau = (px, py, o = {}) => drawStarChar(x, px, py, 110, t, { color: TAU.color, glyph: null, seed: 7, mood: 'happy', look: [-1, 0], tips: false, ...o })
  if (i === 0) { pis(-80, 10); tau(80, 10); mug(x, -20, 60, 34, t, { color: PIS.color }); mug(x, 40, 60, 34, t, { color: TAU.color }) }
  if (i === 1) { R(x, ICE, -220, 70, 440, 30); R(x, '#ffffff', -200, 72, 120, 6); const g = Math.sin(t * 2) * 60; pis(-60 + g, 10); tau(70 + g, 10); heart(x, g, -70, 5) }
  if (i === 2) {
    // a snowman for two
    x.fillStyle = INK; x.beginPath(); x.arc(0, 50, 54, 0, Math.PI * 2); x.arc(0, -20, 40, 0, Math.PI * 2); x.fill()
    x.fillStyle = SNOW; x.beginPath(); x.arc(0, 50, 48, 0, Math.PI * 2); x.arc(0, -20, 34, 0, Math.PI * 2); x.fill()
    R(x, INK, -14, -28, 8, 8); R(x, INK, 8, -28, 8, 8); R(x, '#ff9a3a', -2, -18, 16, 6)
    pis(-140, 20); tau(140, 20); heart(x, 0, -90, 5)
  }
  x.fillStyle = '#7a6aa8'; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(['COCOA FOR TWO', 'SKATING', 'A SNOWMAN FOR TWO'][i], 0, 140)
  x.restore()
}

const F = winterGuide({
  sign: 'pisces', note: 1, duration: 25,
  hook: '*Pisces,* you planned | the whole winter.', hookSize: 94,
  lines: [
    { t: 3.0, text: 'you love in winter in full *daydream.*' },
    { t: 7.4, text: 'cocoa, skating, a *future.* from one glance.' },
    { t: 11.8, text: 'the real one is even better. go say *hi.*' },
  ],
  fact: 'PISCES: MUTABLE WATER', factAt: 4.6, factDur: 2.2,
  last: 'Say *hi* to | the real one.',
  pisces: null,
  guide(t) {
    const tears = t < 7.4 ? 1 : t < T0.pop ? 2 : t < 15.45 ? 1 : 3
    const mood = t < T0.pop ? 'heart' : t < T0.hi ? 'wide' : t < 15.45 ? 'happy' : 'sparkle'
    return { x: 330, y: 1150, size: 260, mood, look: t < T0.pop ? [0.6, -1] : [1, 0], tears, lanternSize: 66, side: -1,
      hops: [T0.pop + 0.05, T0.hi, 15.7, 16.3] }
  },
  drawBack(x, t, K) {
    const o = K.outAll(t)
    x.save(); x.globalAlpha *= o
    // the bus stop: post + sign + bench
    R(x, INK, 900, 820, 16, 470); R(x, '#9aa0bf', 904, 824, 8, 462)
    box(x, 850, 780, 116, 80, '#2f7ad0', { b: 6 }); x.fillStyle = '#ffffff'; x.font = `800 30px 'Inter'`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('STOP', 908, 820)
    box(x, 470, 1196, 420, 22, '#8a5a3a', { b: 5 }); R(x, '#5e3a24', 500, 1222, 16, 60); R(x, '#5e3a24', 840, 1222, 16, 60)
    x.restore()
  },
  drawFront(x, t, K) {
    const o = K.outAll(t)
    // the stranger on the bench, reading
    x.save(); x.globalAlpha *= o
    shadow(x, 700, 1262, 160, 0.3)
    const look = t > T0.hi ? 'up' : 'down'
    drawStarChar(x, 700, 1140, 210, t, { color: TAU.color, glyph: TAU.glyph, seed: 7, mood: t > T0.hi2 ? 'happy' : 'neutral', look: look === 'up' ? [-1, -0.3] : [-0.3, 1], hops: [T0.hi + 0.1, 15.7] })
    if (t < T0.hi) { box(x, 650, 1150, 100, 70, '#e8344e', { b: 5 }); R(x, '#f8f0dc', 698, 1154, 4, 62) }
    x.restore()
    // the daydream
    const ck = (1 - ease.inCubic(prog(t, T0.pop - 0.1, T0.pop + 0.1))) * o
    if (ck > 0.01) { cloud(x, t, ck); if (ck > 0.9) dream(x, t) }
    K.burst(C.x, C.y, 140, t, T0.pop, { word: 'POP!', size: 56 })
    if (t > T0.hi && t < 15.4) K.bubble(380, 930, 'hi :)', { size: 44, k: K.pop01(t, T0.hi, 0.3, 2.4) * (1 - prog(t, 15.1, 15.4)) })
    if (t > T0.hi2 && t < 15.4) K.bubble(720, 930, 'hi!', { size: 44, k: K.pop01(t, T0.hi2, 0.3, 2.4) * (1 - prog(t, 15.1, 15.4)) })
    heartsUp(x, t, 520, 960, T0.hi2 + 0.3, { n: 3, c: 6 })
    heartsUp(x, t, 520, 960, 16.3, { n: 3, c: 6 })
  },
  cues: [
    ['glitter', 0.1, 0.8], ['pluck', 1.2, 1318.51, 0.025, 0.8, -0.2],
    ...T0.scene.slice(1, 3).map((s, i) => ['pop', s, [1174.66, 1318.51][i], 0.04, -0.2]), ['pop', T0.scene[3], 1567.98, 0.04, -0.2],
    ['boom', T0.pop, 0.15], ['pop', T0.pop, 1318.51, 0.05, 0], ['glitter', T0.pop, T0.pop + 0.5],
    ['pop', T0.hi, 987.77, 0.045, -0.3], ['pop', T0.hi2, 1174.66, 0.045, 0.3], ['pluck', T0.hi2 + 0.3, 1567.98, 0.035, 0.8, 0],
  ],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
