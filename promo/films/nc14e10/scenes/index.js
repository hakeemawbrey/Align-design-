// nc14e10: CUFFING SEASON, "Sag says “I'm not looking”" (30 s vertical, Season 14 ep 10, music: synthwave · Bm).
// Story 0–25.6, then the shared end card. The show look lives in ../../nc14e01/scenes/cuffkit.js.
//   0.0–6.4    "“I’m *not* looking.” | (is looking)"  Frame 0: a snowy street, Sagittarius in a backpack mid-glance over
//              its shoulder at Aquarius in the café window. "free spirit. solo trip. no ties."  *glance* ×3; the third
//              time it gets caught, waves, and turns it into a stretch.
//   6.4–13.2   "Says *free.* | Packs for *two.*"  Things fly into the backpack: a map, a mug, another mug, a scarf, another
//              scarf. The bag bursts: TWO MUGS? Sag: "…for balance."  Pisces sobs.
//  13.2        card cut.
//  13.2–19.6   "Free *and* | wanting." THE STARS: "you can love *freedom*" → "and still *want someone*."  Sag: "ok. honestly?
//              I'd like company on this trip."  Aquarius steps out: "I was hoping you'd ask."
//  19.6–25.6   "Room in the bag | for *two.*"  The two set off down the street, one mug each.
//              THE STARS: "Wanting someone isn't a cage. *It's a door.*"
import {
  makeCuff, R, box, bubble, label, shadow, glow, sparkles, hearts, mug, snowGround, windowFrame, drawSnow,
  pop01, outK, popOut, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, ICE, PINK, RED, MINT, signStar,
} from '../../nc14e01/scenes/cuffkit.js'

const T = {
  h0Out: [6.2, 6.4], free: 0.9, glances: [2.2, 3.3, 4.4], wave: 4.9,
  b2: 6.4, h1: 6.55, h1Out: [13.0, 13.2], items: [7.0, 7.6, 8.3, 9.0, 9.7], burst: 10.7, balance: 11.5,
  cut: 13.2, h2: 13.35, h2Out: [19.4, 19.6], honest: 16.6, aqOut: [17.7, 18.2], hoping: 18.2,
  b4: 19.6, h3: 19.75, last: 20.4,
}
const SP = 'THE STARS'
const B2 = [
  { t: 13.6, speaker: SP, text: 'you can love *freedom*' },
  { t: 14.9, speaker: SP, text: 'and still *want someone*.' },
]
const B3 = [{ t: T.last, speaker: SP, text: "Wanting someone isn't a cage. *It's a door.*" }]
const SAG = signStar('sagittarius'), AQ = signStar('aquarius')
const ITEMS = ['map', 'mug', 'mug2', 'scarf', 'scarf2']

function street(x, t, aqIn) {
  for (let i = 0; i < 4; i++) R(x, i % 2 ? '#2b2050' : '#30245a', i * 280 - 30, 820, 270, 600)
  // the café window (Aquarius inside)
  windowFrame(x, 790, 1050, 380, 300)
  x.save(); x.beginPath(); x.rect(600, 900, 380, 300); x.clip()
  R(x, '#f7d27a', 600, 900, 380, 300); glow(x, 790, 1050, 260, 0.3)
  if (!aqIn) drawStarCafe(x, t)
  else if (_K) _K.pisces(x, t, { x: 790, y: 1110, s: 180, scarf: ICE }, 3, 'sparkle', [-1, -0.4])
  x.restore()
  R(x, '#6b4a2f', 784, 900, 12, 300); R(x, '#6b4a2f', 600, 1044, 380, 12)
  box(x, 620, 840, 340, 50, '#2a7a8c', { b: 6 }); label(x, 'CAFÉ', 790, 866, { size: 30, col: BONE, font: 'Inter, sans-serif', weight: 800 })
  snowGround(x, 1400)
}
let _K = null
function drawStarCafe(x, t) { if (_K) _K.star(x, t, 'aquarius', { x: 800, y: 1110, s: 190, mood: t > T.glances[2] && t < T.b2 ? 'wink' : 'happy', look: [-1, 0], scarf: GOLD, seed: 9, hops: [T.glances[2] + 0.1] }) }
function backpack(x, cx, cy, s, open = 0) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -70, -90, 140, 180, '#3f8a5a', { b: 6, hi: '#5aac76' })
  box(x, -60, -110 - open * 40, 120, 40, '#2f6a46', { b: 5 })
  box(x, -40, 10, 80, 50, '#2f6a46', { b: 4 })
  x.restore()
}
function item(x, t, kind, cx, cy, s = 1) {
  if (kind === 'map') { x.save(); x.translate(cx, cy); x.scale(s, s); box(x, -50, -34, 100, 68, '#f4e3b0', { b: 5 }); R(x, RED, -30, -6, 40, 6); R(x, '#5aac76', 0, -20, 30, 30); x.restore() }
  else if (kind.startsWith('mug')) mug(x, t, cx, cy, 0.7 * s, { col: kind === 'mug' ? SAG.color : AQ.color, steam: 0 })
  else { x.save(); x.translate(cx, cy); x.scale(s, s); R(x, INK, -60, -18, 120, 36); R(x, kind === 'scarf' ? GOLD : AQ.color, -54, -12, 108, 24); for (let i = 0; i < 4; i++) R(x, BONE, -40 + i * 26, -12, 6, 24); x.restore() }
}

function scene(x, t, K) {
  _K = K
  const ok = popOut(t, K.OUT)
  const aqIn = t > T.aqOut[0]
  street(x, t, aqIn)
  if (t < T.b2) {
    const ok1 = outK(t, [T.b2 - 0.15, T.b2])
    // glance: snap the look to the café; the third one gets caught → wave → "stretch"
    const g = T.glances.findIndex(c => t > c && t < c + (c === T.glances[2] ? 1.3 : 0.45))
    const look = g >= 0 || t < 0.6 ? [1, -0.2] : [-1, 0]
    const caught = t > T.glances[2] + 0.4 && t < T.wave + 1.0
    const stretch = t > T.wave + 0.4 ? Math.sin(Math.PI * clamp(prog(t, T.wave + 0.4, T.wave + 1.4))) * -0.15 : 0
    shadow(x, 300, 1400, 240)
    K.star(x, t, 'sagittarius', { x: 300, y: 1250, s: 260, pop: ok1, mood: caught ? 'wide' : t > T.wave + 0.4 ? 'happy' : 'neutral', look, squash: stretch, hops: [T.free, T.free + 0.5, ...T.glances, T.wave], seed: 13, scarf: GOLD })
    backpack(x, 150, 1230, 0.9)
    bubble(x, t, 330, 960, T.free, T.glances[2] + 0.2, 'free spirit. solo trip. no ties.', { size: 32, tail: -0.2 })
    T.glances.forEach((c, i) => label(x, '*glance*', [500, 530, 500][i], [1130, 1080, 1030][i], { size: 30, col: GOLD, alpha: clamp(prog(t, c, c + 0.1)) * outK(t, [c + 0.7, c + 0.9]) }))
    if (t > T.wave && t < T.b2) { bubble(x, t, 380, 980, T.wave, T.wave + 0.6, 'hi!', { size: 40 }); label(x, '(stretching)', 300, 1460, { size: 28, col: BONE, alpha: clamp(prog(t, T.wave + 0.6, T.wave + 0.8)) }) }
    K.pisces(x, t, { x: 140, y: 1640, s: 130, pop: pop01(t, 1.6, 0.3, 2) * ok1, scarf: ICE }, 1, 'wide', [1, -0.6])
    return
  }
  if (t < T.cut) {
    const ok2 = outK(t, [T.cut - 0.2, T.cut])
    const burst = t > T.burst
    backpack(x, 540, 1270, 1.5 * ok2, burst ? 1 : 0)
    K.star(x, t, 'sagittarius', { x: 260, y: 1250, s: 230, pop: ok2, mood: burst ? 'wide' : 'happy', look: [1, 0.5], scarf: GOLD, hops: [...T.items, T.burst, T.balance], seed: 13 })
    ITEMS.forEach((k, i) => {
      const a = T.items[i]
      if (t < a) return
      if (!burst) {
        const p = prog(t, a, a + 0.45)
        if (p < 1) item(x, t, k, lerp(260, 540, p), lerp(1050, 1180, p) - Math.sin(Math.PI * p) * 220, 1.2)
        label(x, ['map ✓', 'mug ✓', 'mug ✓?', 'scarf ✓', 'scarf ✓?'][i], 640, 520 + i * 56, { size: 30, col: i % 2 === 0 ? BONE : GOLD, align: 'left', alpha: clamp(prog(t, a + 0.4, a + 0.5)) })
      } else {
        const p = ease.outCubic(prog(t, T.burst, T.burst + 0.6))
        const tx = [380, 470, 640, 760, 860][i], ty = [1450, 1080, 1060, 1440, 1180][i]
        item(x, t, k, lerp(540, tx, p), lerp(1150, ty, p) - Math.sin(Math.PI * p) * 160, 1.2)
      }
    })
    if (burst) {
      sparkles(x, t, 540, 1150, T.burst, 12, 220, 1, [GOLD, BONE, AQ.color])
      const lk = easeOutBack(prog(t, T.burst + 0.3, T.burst + 0.6), 2.4) * ok2
      if (lk > 0.01) { x.save(); x.translate(560, 860); x.rotate(-0.06); x.scale(lk, lk); box(x, -170, -44, 340, 88, RED, { b: 7 }); label(x, 'TWO MUGS?', 0, 2, { size: 46, col: BONE, font: 'Inter, sans-serif', weight: 800 }); x.restore() }
      bubble(x, t, 260, 980, T.balance, T.cut - 0.1, '…for balance.', { size: 36 })
    }
    K.pisces(x, t, { x: 980, y: 1620, s: 140, pop: pop01(t, T.b2 + 0.5, 0.3, 2) * ok2, scarf: ICE }, burst ? 3 : 2, 'sparkle', [-1, -0.6])
    return
  }
  const fin = ease.inOutCubic(prog(t, T.b4, T.b4 + 0.6))
  if (t < T.b4 + 0.4) K.stars(x, t, { x: 540, y: 690, s: 190, pop: pop01(t, T.cut + 0.15, 0.4, 2) * outK(t, [T.b4, T.b4 + 0.4]), mood: t > T.hoping ? 'happy' : 'neutral', look: [0, 0.6], hops: K.hopsFor(SP) })
  const walk = t > T.b4 ? (t - T.b4) * 30 : 0
  const sx = lerp(300, 380, fin) + walk, ax = lerp(1200, 700, ease.outCubic(prog(t, ...T.aqOut))) + walk * (fin)
  shadow(x, sx, 1400, 230 * ok)
  K.star(x, t, 'sagittarius', { x: sx, y: 1250, s: 240, pop: ok, mood: t > T.hoping ? 'heart' : t > T.honest ? 'neutral' : 'happy', look: [1, 0], scarf: GOLD, hops: [T.honest, T.honest + 0.6, T.hoping + 0.1, ...(t > T.b4 ? [T.b4 + 0.3, T.b4 + 0.9, T.b4 + 1.5, T.b4 + 2.1, T.b4 + 2.7, T.b4 + 3.3, T.b4 + 3.9] : [])], seed: 13 })
  backpack(x, sx - 150, 1230, 0.9 * ok)
  if (aqIn) {
    shadow(x, ax, 1400, 220 * ok)
    K.star(x, t, 'aquarius', { x: ax, y: 1255, s: 220, pop: ok, mood: t > T.hoping ? 'happy' : 'sparkle', look: [-1, 0], scarf: GOLD, hops: [T.aqOut[0] + 0.2, T.hoping, ...(t > T.b4 ? [T.b4 + 0.6, T.b4 + 1.2, T.b4 + 1.8, T.b4 + 2.4, T.b4 + 3.0, T.b4 + 3.6] : [])], seed: 9 })
  }
  bubble(x, t, 380, 960, T.honest, T.b4 - 0.1, "ok. honestly? I'd like company on this trip.", { size: 28, tail: -0.3 })
  bubble(x, t, 720, 1060, T.hoping, T.b4 + 1.2, "I was hoping you'd ask.", { size: 32, col: '#d6f3ff' })
  hearts(x, t, T.hoping + 0.2, (sx + ax) / 2, 1080, { n: 6 })
  if (t > T.b4) { mug(x, t, sx + 110, 1300, 0.6, { col: SAG.color }); mug(x, t, ax - 110, 1300, 0.6, { col: AQ.color }) }
  if (!aqIn) K.pisces(x, t, { x: 980, y: 1330, s: 130, pop: ok, scarf: ICE }, 3, 'sparkle', [-1, -0.6])
}

const EP = makeCuff({
  id: 'nc14e10', duration: 30, ep: 10,
  heads: [
    { text: '“I’m *not* looking.” | (is looking)', at: -1.2, out: T.h0Out, size: 96, accent: '#c79bff' },
    { text: 'Says *free.* | Packs for two.', at: T.h1, out: T.h1Out, size: 100, accent: GOLD },
    { text: 'Free *and* | wanting.', at: T.h2, out: T.h2Out, size: 104, accent: GOLD },
    { text: 'Room in the bag | for *two.*', at: T.h3, out: [25.0, 25.3], size: 96, accent: PINK },
  ],
  boxes: [
    { lines: B2, open: 13.4, close: 16.5, y: 1540 },
    { lines: B3, open: T.last - 0.22, close: 25.15, y: 1540 },
  ],
  snow: 0.8,
  cuts: [T.b2, { t: T.cut, kind: 'flip' }, T.b4],
  flashes: [T.b2, T.b4],
  ghost: { x: 980, y: 900, at: 9.4, from: 'right', cell: 3 },
  draw(x, t, K) { scene(x, t, K) },
  cues: [
    ['pop', T.free, 880, 0.035, -0.3], ...T.glances.map((c, i) => ['pluck', c, [1318.51, 1318.51, 1567.98][i], 0.03, 0.3, 0.4]),
    ['pop', T.wave, 1174.66, 0.04, -0.3], ['whoosh', T.wave + 0.4, 0.5, 0.025],
    ...T.items.map((c, i) => ['whoosh', c, 0.3, 0.03]), ...T.items.map((c, i) => ['tick', +(c + 0.45).toFixed(3), 0.05]),
    ['boom', T.burst, 0.25], ['pop', T.burst, 1567.98, 0.05, 0], ['glitter', T.burst, T.burst + 0.5], ['pop', T.burst + 0.3, 1318.51, 0.045, 0],
    ['pop', T.balance, 739.99, 0.035, -0.3],
    ['pop', T.honest, 880, 0.035, -0.3], ['whoosh', T.aqOut[0], 0.4, 0.035],
    ['pluck', T.hoping, 1174.66, 0.045, 0.5, 0.3], ['pluck', T.hoping + 0.12, 1567.98, 0.04, 0.5, 0.3], ['glitter', T.hoping + 0.2, T.hoping + 0.6],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [drawSnow, MINT, ICE]
