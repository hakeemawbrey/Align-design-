// ngwe43 · Your Star Guide: Winter · ♒ Aquarius, winter note 3 / 4: the small gift (20 s; story 0–15.6, then the end card)
//   0.00  "Aquarius, they made you this."  A wobbly, clearly homemade snow globe (tape on the base, "FOR AQ ♡" in marker).
//   3.0   ♒ YOUR STAR: "you love things nobody else would think of."  Aquarius shakes it: the snow swirls, and inside
//         stands a tiny hand-painted Aquarius. It waves back.
//   6.6   "so the best gift is one made just for you."  Aquarius melts.
//  10.68  card flip · "Make it weird. | Make it mine."  Aquarius cradling the globe, the tiny one still waving. Pisces: fountains.
import { winterGuide, drawStarChar, signStar, prog, ease, lerp, clamp, INK, MONO, R, box, SNOW, heartsUp } from '../../ngwe25/scenes/gwkit.js'

const AQ = signStar('aquarius')
const T0 = { shake: [4.2, 5.2], wave: 5.6, melt: 8.2 }
const G = { x: 540, y: 760, r: 170 }

function globe(x, t, cx, cy, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  // inside: night + snow ground + the tiny Aquarius
  x.save(); x.beginPath(); x.arc(0, 0, G.r, 0, Math.PI * 2); x.clip()
  x.fillStyle = '#1a2a6a'; x.fillRect(-G.r, -G.r, G.r * 2, G.r * 2)
  R(x, SNOW, -G.r, 90, G.r * 2, 90); R(x, '#ffffff', -G.r, 90, G.r * 2, 8)
  drawStarChar(x, 0, 40, 120, t, { color: AQ.color, glyph: null, seed: 12, mood: 'happy', look: [0, 0], hops: [T0.wave, T0.wave + 0.5, T0.wave + 1.0, 11.0, 11.5, 12.0, 12.5, 13.0], tips: false })
  // swirling snow (wild while shaken, settling after)
  const sw = clamp(1 - prog(t, T0.shake[1], T0.shake[1] + 3)) * (t > T0.shake[0] ? 1 : 0.15)
  for (let i = 0; i < 26; i++) {
    const a = i * 2.39 + t * (0.6 + sw * 3), rr = 30 + (i * 37) % 130
    const fall = ((t * 30 + i * 47) % 300) - 150
    const sx = Math.cos(a) * rr * sw + (1 - sw) * (((i * 53) % 300) - 150), sy = Math.sin(a) * rr * sw + (1 - sw) * fall
    R(x, '#ffffff', sx - 4, sy - 4, 8, 8)
  }
  x.restore()
  // glass
  x.fillStyle = 'rgba(191,232,255,0.12)'; x.beginPath(); x.arc(0, 0, G.r, 0, Math.PI * 2); x.fill()
  x.lineWidth = 10; x.strokeStyle = INK; x.stroke(); x.lineWidth = 4; x.strokeStyle = 'rgba(255,255,255,0.7)'; x.beginPath(); x.arc(0, 0, G.r - 14, -2.6, -1.9); x.stroke()
  // the lopsided base, with tape
  x.save(); x.rotate(0.04)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-G.r * 0.95, G.r * 0.78); x.lineTo(G.r * 0.95, G.r * 0.72); x.lineTo(G.r * 1.1, G.r * 1.35); x.lineTo(-G.r * 1.1, G.r * 1.4); x.closePath(); x.fill()
  x.fillStyle = '#a35c3a'; x.beginPath(); x.moveTo(-G.r * 0.9, G.r * 0.83); x.lineTo(G.r * 0.9, G.r * 0.77); x.lineTo(G.r * 1.03, G.r * 1.3); x.lineTo(-G.r * 1.03, G.r * 1.34); x.closePath(); x.fill()
  R(x, 'rgba(255,240,200,0.75)', -G.r * 0.75, G.r * 0.8, 50, 26)
  x.fillStyle = '#fff6e0'; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('FOR AQ ♡', 10, G.r * 1.1)
  x.restore()
  x.restore()
}

const F = winterGuide({
  sign: 'aquarius', note: 3, duration: 20,
  hook: '*Aquarius,* they | made you this.',
  lines: [
    { t: 3.0, text: 'you love things nobody else would *think* of.' },
    { t: 6.6, text: 'so the best gift is one made *just* for you.' },
  ],
  fact: 'AQUARIUS IS AN AIR SIGN,|NOT A WATER SIGN', factAt: 8.4, factDur: 2.0,
  last: 'Make it *weird.* | Make it mine.',
  guide(t) {
    const melt = t > T0.melt && t < T0.melt + 0.8 ? 0.2 * Math.sin(Math.PI * prog(t, T0.melt, T0.melt + 0.8)) : 0
    const shake = t > T0.shake[0] && t < T0.shake[1] ? 0.06 * Math.sin(t * 30) : 0
    const mood = t < T0.wave ? 'wide' : t < T0.melt ? 'sparkle' : t < 10.68 ? 'heart' : 'happy'
    return { x: 540, y: 1160, size: 270, mood, look: [0, -1], squash: melt + shake, lanternSize: 70 }
  },
  drawFront(x, t, K) {
    const o = K.outAll(t)
    const sh = t > T0.shake[0] && t < T0.shake[1] ? Math.sin(t * 34) : 0
    globe(x, t, G.x + sh * 24, G.y + Math.abs(sh) * -12, K.pop01(t, -0.3, 0.3) * o, -0.05 + sh * 0.12 + 0.02 * Math.sin(t * 2))
    if (t > T0.wave && t < T0.wave + 1.6) K.bubble(G.x + 150, G.y - 190, '(it waves!)', { size: 34, k: K.pop01(t, T0.wave, 0.3, 2.4) * (1 - prog(t, T0.wave + 1.3, T0.wave + 1.6)) })
    heartsUp(x, t, 540, 980, T0.melt, { n: 3, c: 7 })
    heartsUp(x, t, 540, 980, 11.6, { n: 3, c: 6 })
  },
  cues: [
    ['glitter', 0.1, 0.8], ['tick', 1.5, 0.03],
    ...[0, 1, 2, 3, 4, 5, 6, 7].map(i => ['tick', T0.shake[0] + i * 0.12, 0.03]), ['glitter', T0.shake[0], T0.shake[1] + 0.8],
    ['pop', T0.wave, 1567.98, 0.04, 0.2], ['pop', T0.wave + 0.5, 1760, 0.035, 0.2], ['pop', T0.wave + 1.0, 1975.53, 0.03, 0.2],
    ['whoosh', T0.melt, 0.5, 0.03], ['pluck', T0.melt + 0.2, 1174.66, 0.04, 0.8, 0],
  ],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
