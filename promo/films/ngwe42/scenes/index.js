// ngwe42 · Your Star Guide: Winter · ♒ Aquarius, winter note 2 / 4: the holiday blind spot (25 s; story 0–20.6, then the end card)
//   0.00  "Aquarius, where's your date?"  The party: Aquarius mid-wave at a crowd of stars, hopping from guest to guest.
//   3.0   ♒ YOUR STAR: "you said hi to the whole party."  "hi!" "HI!" "hiii!"
//   7.4   "and your date is by the snacks. alone."  The room dims to one warm spot: the date (♎) by the snack table,
//         holding two cocoas.
//  11.8   "check back in with the one you came with."  Aquarius crosses the room and takes a cocoa. The date lights up.
//  15.45  card flip · "Find your | person first."  The two of them, cocoas up. Pisces (in the crowd): happy fountains.
import { winterGuide, drawStarChar, signStar, mug, stringLights, prog, ease, lerp, clamp, INK, R, box, WOOD, WOOD_D, heartsUp, shadow } from '../../ngwe25/scenes/gwkit.js'

const DATE = signStar('libra')
const CROWD = [['taurus', 250, 1110, 150, 2], ['leo', 380, 1150, 140, 5], ['capricorn', 520, 1100, 130, 8], ['aries', 300, 980, 110, 11]]
const T0 = { hi: [3.9, 4.8, 5.7], dim: [8.4, 9.0], cross: [12.9, 13.9], take: 14.0 }

function aquaPos(t) {
  if (t < T0.hi[0]) return { x: 520, y: 1160 }
  if (t < T0.cross[0]) {
    const stops = [[520, 1160], [330, 1190], [450, 1200], [600, 1160]]
    let i = 0; for (let k = 0; k < 3; k++) if (t > T0.hi[k]) i = k + 1
    const pv = stops[i - 1], nx = stops[i], p = ease.inOutCubic(prog(t, T0.hi[i - 1] - 0.3, T0.hi[i - 1]))
    return { x: lerp(pv[0], nx[0], p), y: lerp(pv[1], nx[1], p) }
  }
  const p = ease.inOutCubic(prog(t, ...T0.cross))
  return { x: lerp(600, 700, p), y: 1160 }
}

const F = winterGuide({
  sign: 'aquarius', note: 2, duration: 25,
  hook: "*Aquarius,* where's | your date?",
  lines: [
    { t: 3.0, text: 'you said hi to the *whole* party.' },
    { t: 7.4, text: 'and your date is by the snacks. *alone.*' },
    { t: 11.8, text: 'check back in with the one you *came* with.' },
  ],
  fact: 'AQUARIUS: RULED BY SATURN (TRADITIONAL)|AND URANUS (MODERN)', factAt: 4.4, factDur: 2.4,
  last: 'Find *your* | person first.',
  tissues: false,
  pisces: (t, d) => ({ ...d, x: 130, y: 1170, s: 130, look: [1, -0.6], alpha: 1 - 0.6 * dimK(t) }),
  sky: t => ({ dim: 0.45 * (1 - 0.4 * dimK(t)) }),
  guide(t) {
    const P = aquaPos(t)
    const mood = t < T0.dim[0] ? 'happy' : t < T0.cross[0] ? 'wide' : t < T0.take ? 'sparkle' : t < 15.45 ? 'heart' : 'happy'
    return { ...P, size: 230, mood, look: t < T0.dim[0] ? [-1, -0.3] : [1, 0], alpha: 1 - 0.5 * (t > T0.dim[0] && t < T0.cross[0] ? dimK(t) : 0), lanternSize: 62,
      hops: [0.3, 1.1, 1.9, ...T0.hi, T0.cross[0] + 0.3, T0.cross[0] + 0.7, T0.take] }
  },
  drawBack(x, t, K) {
    const o = K.outAll(t), dk = dimK(t)
    x.save(); x.globalAlpha *= o
    stringLights(x, t, 40, 600, 1040, 600, { sag: 70, n: 11, on: 1 - 0.7 * dk })
    x.globalAlpha *= 1 - 0.65 * dk
    CROWD.forEach(([id, cx, cy, s, seed], i) => { const S = signStar(id); drawStarChar(x, cx, cy, s, t, { color: S.color, glyph: null, seed, mood: 'happy', look: [i % 2 ? 1 : -1, -0.4], hops: [0.5 + i * 0.4, T0.hi[i % 3] + 0.1] }) })
    x.restore()
    // the warm spot on the date + snack table
    if (dk > 0) {
      x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha *= 0.4 * dk * o
      const g = x.createRadialGradient(860, 1120, 0, 860, 1120, 280); g.addColorStop(0, 'rgba(255,214,140,0.9)'); g.addColorStop(1, 'rgba(255,214,140,0)')
      x.fillStyle = g; x.fillRect(560, 820, 600, 600); x.restore()
    }
  },
  drawMid(x, t, K) {
    const o = K.outAll(t)
    x.save(); x.globalAlpha *= o
    // the snack table
    box(x, 760, 1200, 280, 26, WOOD, { b: 6, hi: '#b07a52' }); R(x, WOOD_D, 780, 1232, 18, 60); R(x, WOOD_D, 1000, 1232, 18, 60)
    for (const [bx, c] of [[800, '#ffd34d'], [900, '#ff8fb1'], [990, '#9dff8f']]) { box(x, bx - 26, 1176, 52, 22, '#f3e6d2', { b: 4 }); R(x, c, bx - 18, 1170, 36, 8) }
    shadow(x, 860, 1262, 160, 0.35)
    const took = t > T0.take
    drawStarChar(x, 860, 1130, 190, t, { color: DATE.color, glyph: DATE.glyph, seed: 9, mood: took ? 'heart' : dimK(t) > 0.5 ? 'neutral' : 'happy', look: [-1, took ? 0 : 0.6], hops: [T0.take + 0.1, 15.7] })
    mug(x, 760, 1160, 40, t, { color: '#38c4ec' })
    if (!took) mug(x, 960, 1160, 40, t, { color: '#e163d6' })
    x.restore()
  },
  drawFront(x, t, K, r) {
    T0.hi.forEach((h, i) => { if (t > h && t < h + 0.9) K.bubble([330, 450, 600][i] - 40, 990, ['hi!', 'HI!', 'hiii!'][i], { size: 40, k: K.pop01(t, h, 0.25, 2.6) * (1 - prog(t, h + 0.7, h + 0.9)) }) })
    if (t < 2.7) K.bubble(520, 990, 'hey everyone!!', { size: 40, k: 1 - prog(t, 2.4, 2.7) })
    if (t > T0.take && r) { x.save(); x.globalAlpha *= K.outAll(t); mug(x, r.x + 90, r.y - 20, 40, t, { color: '#e163d6' }); x.restore() }
    heartsUp(x, t, 790, 960, T0.take + 0.3, { n: 3, c: 6 })
    heartsUp(x, t, 790, 960, 16.3, { n: 3, c: 6 })
  },
  cues: [
    ['pop', 0.3, 987.77, 0.03, 0], ['tick', 1.1, 0.03], ['tick', 1.9, 0.03],
    ...T0.hi.map((h, i) => ['pop', h, [1174.66, 1318.51, 1567.98][i], 0.04, (i - 1) * 0.3]),
    ['whoosh', T0.dim[0], 0.8, 0.03], ['pluck', T0.dim[1], 587.33, 0.04, 1.0, 0.3],
    ['whoosh', T0.cross[0], 0.8, 0.03], ['pop', T0.take, 1174.66, 0.045, 0.3], ['glitter', T0.take, T0.take + 0.5],
  ],
})
function dimK(t) { return clamp(prog(t, ...T0.dim)) * (1 - clamp(prog(t, T0.cross[0] + 0.5, T0.cross[1] + 0.3))) }

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
