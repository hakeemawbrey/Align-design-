// ngwe33 · Your Star Guide: Winter · ♐ Sagittarius, winter note 1 / 4: how you love in winter (25 s; story 0–20.6, then the end card)
//   0.00  "Sagittarius, winter is your stage."  Sag mid-pat on a goofy snowman with a star-shaped head and a little orange scarf.
//   3.0   ♐ YOUR STAR: "you love in winter by making them laugh."  The date (♌) arrives; the carrot nose drops: plop. "HA!"
//   7.4   "the snowman. the voices. the bit."  Sag does the snowman's voice: "hi, i'm you." "HA HA HA!"
//  11.8   "then let it get real for a second."  The snow slows. Sag sits next to the date: "...i really like you."
//  15.45  "Jokes first, | then the real talk."  The two of them close, the snowman watching. Pisces: happy fountains.
import { winterGuide, drawStarChar, signStar, prog, ease, lerp, clamp, INK, R, box, SNOW, SNOW_SH, heartsUp, shadow } from '../../ngwe25/scenes/gwkit.js'

const DATE = signStar('leo')
const T0 = { dateIn: 4.6, plop: 5.8, ha: 6.1, voice: 9.0, haha: 9.9, sit: 12.9, real: 14.0 }

function snowball(x, cx, cy, r) {
  const c = 10
  for (let j = -r; j <= r; j += c) for (let i = -r; i <= r; i += c) {
    const d = Math.hypot(i, j)
    if (d > r) continue
    x.fillStyle = d > r - c ? INK : (i + j < -r * 0.6 ? '#ffffff' : j > r * 0.4 ? SNOW_SH : SNOW)
    x.fillRect(cx + i, cy + j, c, c)
  }
}
function snowman(x, t, cx, by, { nose = 1, talk = 0 } = {}) {
  shadow(x, cx, by + 6, 260, 0.35)
  snowball(x, cx, by - 90, 100)
  snowball(x, cx, by - 240, 75)
  // the star-shaped head (a nod to the date)
  const hy = by - 360
  x.save(); x.translate(cx, hy)
  const pts = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 34 : 78; pts.push([Math.cos(a) * r, Math.sin(a) * r]) }
  x.beginPath(); pts.forEach(([a, b], i) => i ? x.lineTo(a, b) : x.moveTo(a, b)); x.closePath()
  x.lineWidth = 12; x.strokeStyle = INK; x.stroke(); x.fillStyle = SNOW; x.fill()
  R(x, INK, -26, -6, 12, 12); R(x, INK, 14, -6, 12, 12)
  // mouth (moves when Sag does the voice)
  const m = talk > 0 ? 6 + 8 * Math.abs(Math.sin(t * 16)) : 6
  R(x, INK, -16, 26, 32, m)
  // carrot nose
  if (nose > 0) { x.fillStyle = INK; x.fillRect(-4, 8, 40, 14); x.fillStyle = '#ff9a3a'; x.fillRect(0, 11, 34, 8) }
  x.restore()
  // the scarf in the date's colour
  box(x, cx - 70, by - 178, 140, 22, DATE.color, { b: 5 }); box(x, cx + 30, by - 160, 26, 70, DATE.color, { b: 5 })
  // stick arms
  R(x, INK, cx - 150, by - 260, 80, 10); R(x, '#6b4a2a', cx - 146, by - 258, 72, 6)
  R(x, INK, cx + 70, by - 270, 80, 10); R(x, '#6b4a2a', cx + 74, by - 268, 72, 6)
}

const F = winterGuide({
  sign: 'sagittarius', note: 1, duration: 25,
  hook: '*Sagittarius,* winter | is your stage.', hookSize: 94,
  lines: [
    { t: 3.0, text: 'you love in winter by making them *laugh.*' },
    { t: 7.4, text: 'the snowman. the voices. the *bit.*' },
    { t: 11.8, text: 'then let it get *real* for a second.' },
  ],
  fact: 'SAGITTARIUS: MUTABLE FIRE,|RULED BY JUPITER', factAt: 3.6, factDur: 2.0,
  last: 'Jokes first, | then the *real* talk.', lastSize: 92, lastAccent: 126,
  snow: { n: 70, speed: 1 },
  tissues: false,
  pisces: (t, d) => ({ ...d, x: 990, s: 116 }),
  guide(t) {
    if (t < T0.sit) {
      const pat = t < 2.8 ? 0.08 * Math.abs(Math.sin(t * 7)) : 0
      return { x: 560, y: 1140, size: 270, mood: t < T0.plop ? 'happy' : t < T0.voice ? 'sparkle' : 'wink', look: [-1, -0.4], squash: pat + (t > T0.voice && t < T0.voice + 1.2 ? 0.05 * Math.sin(t * 16) : 0), side: 1, lanternSize: 70 }
    }
    const p = ease.inOutCubic(prog(t, T0.sit, T0.sit + 0.8))
    return { x: lerp(560, 600, p), y: 1150, size: lerp(270, 250, p), mood: t < 15.45 ? 'neutral' : 'happy', look: [1, -0.3], blush: t > T0.real ? 0.9 : undefined, lanternSize: 66 }
  },
  sky: t => ({ dim: 0.45 * (1 - 0.2 * clamp(prog(t, T0.sit, T0.sit + 1))) }),
  drawBack(x, t, K) {
    x.save(); x.globalAlpha *= K.outAll(t)
    snowman(x, t, 270, 1290, { nose: t < T0.plop ? 1 : 0, talk: t > T0.voice && t < T0.voice + 1.2 ? 1 : 0 })
    // the nose falls into the snow
    if (t > T0.plop) { const p = ease.inCubic(prog(t, T0.plop, T0.plop + 0.4)); x.save(); x.translate(290, lerp(944, 1280, p)); x.rotate(p * 2.4); x.fillStyle = INK; x.fillRect(-4, -3, 40, 14); x.fillStyle = '#ff9a3a'; x.fillRect(0, 0, 34, 8); x.restore() }
    x.restore()
  },
  drawFront(x, t, K) {
    const o = K.outAll(t)
    if (t > T0.dateIn) {
      const k = K.pop01(t, T0.dateIn, 0.4, 2.2)
      const laugh = (t > T0.ha && t < T0.ha + 1) || (t > T0.haha && t < T0.haha + 1.4)
      x.save(); x.globalAlpha *= o
      shadow(x, 810, 1262, 160, 0.35)
      drawStarChar(x, 810, 1155, 210, t, { color: DATE.color, glyph: DATE.glyph, seed: 9, pop: k, mood: laugh ? 'happy' : t > T0.real ? 'heart' : 'neutral', look: [-1, -0.4],
        squash: laugh ? 0.08 * Math.sin(t * 22) : 0, hops: [T0.dateIn + 0.3, T0.ha, T0.haha, T0.haha + 0.4, T0.real + 0.5] })
      x.restore()
    }
    if (t > T0.ha && t < T0.ha + 1.1) K.bubble(810, 960, 'HA!', { size: 48, k: K.pop01(t, T0.ha, 0.25, 2.6) })
    if (t > T0.voice && t < T0.voice + 1.4) K.bubble(300, 820, "hi, i'm you.", { size: 42, k: K.pop01(t, T0.voice, 0.25, 2.6) })
    if (t > T0.haha && t < T0.haha + 1.5) K.bubble(810, 960, 'HA HA HA!', { size: 46, k: K.pop01(t, T0.haha, 0.25, 2.6) })
    K.burst(300, 1230, 60, t, T0.plop + 0.4, { word: 'plop', size: 28, color: '#ffe9a8' })
    if (t > T0.real && t < 15.4) K.bubble(640, 960, '...i really like you.', { size: 38, k: K.pop01(t, T0.real, 0.3, 2.2) * (1 - prog(t, 15.1, 15.4)) })
    heartsUp(x, t, 700, 960, T0.real + 0.6, { n: 2, c: 6 })
    heartsUp(x, t, 700, 960, 16.3, { n: 3, c: 6 })
  },
  cues: [
    ['tick', 0.3, 0.03], ['tick', 0.75, 0.03], ['tick', 1.2, 0.03], ['tick', 1.65, 0.03],
    ['pop', T0.dateIn, 880, 0.045, 0.3], ['whoosh', T0.plop, 0.3, 0.03], ['boom', T0.plop + 0.4, 0.06], ['pop', T0.ha, 1318.51, 0.045, 0.3],
    ['pop', T0.voice, 659.25, 0.04, -0.3], ['pop', T0.voice + 0.2, 587.33, 0.04, -0.3], ['pop', T0.haha, 1318.51, 0.045, 0.3], ['pop', T0.haha + 0.3, 1567.98, 0.04, 0.3],
    ['whoosh', T0.sit, 0.6, 0.02], ['pluck', T0.real, 987.77, 0.035, 0.9, 0], ['bell', T0.real + 0.6, 1318.51, 0.02, 1.2, 0],
  ],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
