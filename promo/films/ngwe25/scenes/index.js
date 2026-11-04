// ngwe25 · Your Star Guide: Winter · ♎ Libra, winter note 1 / 4: how you love in winter (25 s; story 0–20.6, then the end card)
//   0.00  "Libra in love, winter edition."  Libra is mid-hop by a frosty-clear window, holding the loose end of a string
//         of fairy lights; two matching pink mugs on the sill. Pisces sniffles in the corner.
//   2.8   The light string hooks on; ♎ YOUR STAR: "you love in winter by making it lovely."
//   7.4   "matching mugs. matching lights. matching snow."  Ding, ding, ding: the lights all turn Libra pink, and a
//         paint swatch held up to the snow says "SNOW (MATCHES)".
//  11.8   "but they came for *you*, not the décor."  The hook pops, the lights slip down crooked. Libra gasps. The date
//         (♋) pops in and doesn't look at the lights at all, only at Libra. Hearts.
//  15.45  card flip · "*You* are the | cozy part."  The two of them on the sill, mugs up, lights crooked. Pisces: fountains.
import { winterGuide, frostWindow, stringLights, mug, drawStarChar, signStar, prog, ease, lerp, clamp, PINK, BONE, GOLD, INK, MONO, R, box, heartsUp, shadow } from './gwkit.js'

const LIB = signStar('libra'), DATE = signStar('cancer'), PINKS = ['#e163d6', '#f59be9', '#ff7eb6', '#ffd0f6']
const T0 = { hookEnd: 2.8, ding: [8.9, 9.5, 10.1], swatch: 10.4, slip: 12.9, dateIn: 13.5, look: 14.2 }

const WIN = { x: 540, y: 640, w: 420, h: 300 }
const HOOK_L = { x: 236, y: 470 }, HOOK_R = { x: 844, y: 470 }

function libraPose(t) {
  // frame 0: hovering up left with the string end; settles by the window, then the last-line tableau
  if (t < T0.hookEnd) { const p = ease.inOutCubic(prog(t, 2.0, 2.8)); return { x: lerp(300, 400, p), y: lerp(560, 1130, p), size: lerp(250, 290, p), mood: 'happy', look: [-1, -1], squash: 0.06 * Math.sin(t * 9) * (1 - p) } }
  if (t < T0.slip) return { x: 400, y: 1130, size: 290, mood: t < 7.4 ? 'happy' : 'sparkle', look: t > 10.2 && t < 11.4 ? [1, -1] : [0.6, -0.6] }
  if (t < T0.dateIn + 0.6) return { x: 400, y: 1130, size: 290, mood: 'wide', look: [-0.6, -1], squash: t < T0.slip + 0.3 ? 0.12 : 0 }
  if (t < 15.45) return { x: 400, y: 1130, size: 290, mood: 'heart', look: [1, 0] }
  return { x: 400, y: 1130, size: 290, mood: 'happy', look: [1, 0] }
}

const F = winterGuide({
  sign: 'libra', note: 1, duration: 25,
  hook: '*Libra* in love, | winter edition.',
  lines: [
    { t: 3.0, text: 'you love in winter by making it *lovely.*' },
    { t: 7.4, text: 'matching mugs. matching lights. *matching snow.*' },
    { t: 11.8, text: "but they came for *you,* not the décor." },
  ],
  fact: 'LIBRA: CARDINAL AIR,|RULED BY VENUS', factAt: 4.6, factDur: 2.6,
  last: '*You* are the | cozy part.',
  guide: t => ({ ...libraPose(t), side: 1, lanternSize: 80 }),
  drawBack(x, t, K) {
    const o = K.outAll(t)
    x.save(); x.globalAlpha *= o
    frostWindow(x, K, t, WIN.x, WIN.y, WIN.w, WIN.h, { wipe: 1 })
    x.restore()
  },
  drawMid(x, t, K) {
    const o = K.outAll(t)
    x.save(); x.globalAlpha *= o
    // the mugs on the sill
    mug(x, 470, 812, 70, t, { color: LIB.color })
    mug(x, 610, 812, 70, t, { color: LIB.color })
    // the string of lights: frame 0 the left end is in Libra's tip; then hooked; then it slips (left end drops)
    const g = libraPose(t), cell = g.size / 36
    const tip = { x: g.x - 18.2 * cell, y: g.y - 4.4 * cell + Math.sin(t * 2.2 + 3 * 2.1) * g.size * 0.035 }
    let L
    if (t < T0.hookEnd - 0.8) L = tip
    else if (t < T0.hookEnd) { const p = ease.outBack(prog(t, T0.hookEnd - 0.8, T0.hookEnd)); L = { x: lerp(tip.x, HOOK_L.x, p), y: lerp(tip.y, HOOK_L.y, p) } }
    else if (t < T0.slip) L = HOOK_L
    else { const p = ease.outBounce ? ease.outBounce(prog(t, T0.slip, T0.slip + 0.6)) : ease.outCubic(prog(t, T0.slip, T0.slip + 0.6)); L = { x: lerp(HOOK_L.x, 300, p), y: lerp(HOOK_L.y, 820, p) } }
    // hooks
    for (const h of [HOOK_L, HOOK_R]) { R(x, INK, h.x - 9, h.y - 22, 18, 26); R(x, GOLD, h.x - 5, h.y - 18, 10, 18) }
    const pink = t >= T0.ding[0]
    const cols = pink ? PINKS : undefined
    stringLights(x, t, L.x, L.y, HOOK_R.x, HOOK_R.y, { sag: t < T0.slip ? 60 : 30, n: 9, cols })
    // ding ding ding: three rings of sparkle as the colours "match"
    T0.ding.forEach((d, i) => K.sparkles(t, 300 + i * 240, 520, d, 6, 70, i, PINKS))
    x.restore()
  },
  drawFront(x, t, K, r) {
    const o = K.outAll(t)
    // the paint swatch: "SNOW (MATCHES)"
    if (t > T0.swatch && t < T0.slip + 0.2) {
      const k = K.pop01(t, T0.swatch, 0.34, 2.4) * (1 - ease.inCubic(prog(t, T0.slip - 0.2, T0.slip + 0.2)))
      x.save(); x.translate(590, 960); x.rotate(-0.1); x.scale(k, k)
      box(x, -140, -100, 280, 200, '#ffffff', { b: 6 })
      R(x, '#eef4ff', -126, -86, 252, 104); R(x, LIB.color, -126, -86, 252, 14)
      x.fillStyle = INK; x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillText('SNOW', 0, 44); x.fillStyle = LIB.color; x.font = `700 26px ${MONO}`; x.fillText('MATCHES ✓', 0, -26)
      x.restore()
    }
    // the date pops in from the right and only looks at Libra
    if (t > T0.dateIn) {
      const k = K.pop01(t, T0.dateIn, 0.4, 2.2)
      x.save(); x.globalAlpha *= o
      shadow(x, 700, 1262, 170, 0.35)
      drawStarChar(x, 700, 1150, 220, t, { color: DATE.color, glyph: DATE.glyph, seed: 9, pop: k, mood: t > T0.look ? 'heart' : 'happy', look: [-1, 0], hops: [T0.dateIn + 0.3, 15.6, 16.2] })
      x.restore()
      heartsUp(x, t, 550, 900, T0.look, { n: 3, c: 7 })
    }
    if (t > 15.45) heartsUp(x, t, 550, 950, 16.4, { n: 3, c: 6 })
  },
  cues: [
    ['pop', 0.3, 1174.66, 0.03, 0], ['tick', 0.9, 0.025], ['tick', 1.6, 0.025],
    ['pluck', 2.75, 1318.51, 0.035, 0.6, 0], ['tick', 2.8, 0.05],
    ...T0.ding.map((d, i) => ['bell', d, [1318.51, 1567.98, 1975.53][i], 0.03, 1.2, (i - 1) * 0.3]),
    ['pop', T0.swatch, 987.77, 0.04, 0],
    ['whoosh', T0.slip - 0.05, 0.4, 0.04], ['boom', T0.slip + 0.5, 0.08], ['tick', T0.slip + 0.5, 0.06],
    ['pop', T0.dateIn, 880, 0.045, 0], ['pluck', T0.look, 1567.98, 0.035, 0.8, 0], ['glitter', T0.look, T0.look + 0.5],
    ['pop', 15.7, 1174.66, 0.035, 0],
  ],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
