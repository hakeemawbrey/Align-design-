// npce06: PISCES CRIES ABOUT… "the last cookie." (12 s vertical trial reel, promo/films/next30/b48.md, music: lofi · C).
// Story 0–9.6, then the shared end card. The format lives in ../../npce01/scenes/criekit.js.
//   0.0       hook: one cookie left on a plate between Pisces and Taurus; Pisces mid-gasp.
//   0.8–1.6   Taurus slides the plate over to Pisces; a little tent card pops up: "saved it for you" (1.7).
//   2.75      sticker "*Taurus* shared food."  4.3 fountains; Taurus beams.
//   5.6       flash cut. THE STARS: "Being thought of is the whole gift."
import { makeCry, box, R, ink, shadow, glow, sparkles, hearts, pop01, prog, lerp, ease, INK, BONE, GOLD, PINK, SERIF } from '../../npce01/scenes/criekit.js'

function cookie(x, cx, cy, r = 54) {
  const C = ['..CCCC..', '.CCDCCC.', 'CCCCCDCC', 'CDCCCCCC', 'CCCCDCCC', 'CCDCCCDC', '.CCCCCC.', '..CCCC..']
  const cell = r * 2 / 8
  for (const pass of [0, 1]) C.forEach((row, j) => [...row].forEach((ch, i) => {
    if (ch === '.') return
    if (pass === 0) { x.fillStyle = INK; x.fillRect(cx - r + i * cell - 4, cy - r + j * cell - 4, cell + 8, cell + 8) }
    else { x.fillStyle = ch === 'D' ? '#5a3418' : '#d9a05b'; x.fillRect(cx - r + i * cell, cy - r + j * cell, cell + 0.5, cell + 0.5) }
  }))
}
function plate(x, cx, cy) {
  x.save(); x.fillStyle = INK; x.beginPath(); x.ellipse(cx, cy, 136, 44, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#f4f1ff'; x.beginPath(); x.ellipse(cx, cy - 4, 128, 38, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#d8d2ec'; x.beginPath(); x.ellipse(cx, cy - 4, 90, 24, 0, 0, Math.PI * 2); x.fill(); x.restore()
  for (const [dx, dy] of [[-60, 6], [44, 10], [70, -6]]) R(x, '#d9a05b', cx + dx, cy + dy - 8, 8, 6)        // crumbs of the others
  cookie(x, cx, cy - 36, 52)
}
function tent(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(-0.05)
  box(x, -150, -66, 300, 90, '#fbf6e9', { b: 5 }); R(x, 'rgba(27,18,54,0.2)', -150, 20, 300, 6)
  ink(x, 'saved it for you', 0, -22, { size: 38, font: SERIF, weight: 500, col: '#2a1f5a' })
  x.restore()
}
function table(x) { box(x, -20, 1150, 1120, 70, '#6b4a2f', { b: 6, hi: '#8a6440' }); R(x, '#4a3220', 0, 1226, 1080, 120) }

const EP = makeCry({
  id: 'npce06', topic: 'the last cookie', accent: '#e8b06b', deep: '#5a7a2a',
  sticker: '*Taurus* shared food.', peak: 4.3,
  tissues: [1.7, 2.8, 3.4, 4.3, 4.55, 4.8],
  scene(x, t, S) {
    glow(x, 540, 980, 620, 0.55)
    const slide = ease.inOutCubic(prog(t, 0.8, 1.55))
    shadow(x, 260, 1150, 200); shadow(x, 830, 1150, 200)
    S.pis(x, t, { x: 250, y: 990, s: 250, mood: t < 1.7 ? 'wide' : 'sparkle', look: t < 1.7 ? [1, 1] : [1, 0.6], hops: [1.72, 2.8, 4.32, 4.7] })
    S.star(x, t, 'taurus', { x: 840, y: 990, s: 250, mood: t > 3.2 ? 'happy' : 'neutral', look: [-1, 0.4], hops: [0.8, 3.2], seed: 5 })
    table(x)
    // Taurus's hoof-tip on the plate while sliding
    const px = lerp(560, 330, slide)
    plate(x, px, 1160)
    tent(x, 600, 1060, pop01(t, 1.7, 0.3, 2.4))
    sparkles(x, t, 330, 1110, 1.6, 10, 160, 0.4, [GOLD, BONE, PINK])
    if (t > 3.2) hearts(x, t, 3.25, 840, 820, { n: 4 })
  },
  finale(x, t, { ok }) {
    const k = pop01(t, 5.75, 0.3, 2.2) * ok
    if (k > 0.01) { x.save(); x.translate(740, 1310); x.scale(k, k); cookie(x, 0, 0, 44); x.restore() }
    const tk = pop01(t, 5.9, 0.35, 2.2) * ok
    if (tk > 0.01) drawTaurusSmall(x, t, tk)
  },
  last: 'Being thought of is the whole gift.',
  cues: [['whoosh', 0.82, 0.6, 0.025], ['tick', 1.55, 0.05], ['pop', 1.72, 1318.51, 0.04, 0.1], ['pop', 3.22, 987.77, 0.03, 0.4]],
})
// Taurus waves from the corner in the finale
import { drawStarChar, signStar } from '../../npce01/scenes/criekit.js'
function drawTaurusSmall(x, t, k) { const T = signStar('taurus'); drawStarChar(x, 960, 830, 130, t, { color: T.color, mood: 'happy', pop: k, hops: [6.1, 7.4], seed: 5, look: [-1, 0] }) }

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
