// naske16 · Ask the Stars, Volume 2, ep 16 · "They're away for the holidays. I miss them." (20 s, star_advice post)
// Story 0–15.6, then the shared end card. The look lives in ../../naske01/askkit.js.
//   0.00  frame 0: the DM; ♋ Cancer at a frosty window, its tip mid-stroke drawing a heart in the frost.
//   2.5   CANCER: "missing someone means it matters."  chip ♋ THE CRAB · RULED BY THE MOON
//   ~5.5  "plan one call you both look forward to."  A little phone lights up in its tip: CALL AT 8 ♥ (ring ring).
//   ~8.4  "and lean on the people who are here."  Two friend stars pop in beside it with a steaming mug.
//   card cut → "Miss them. | *Live* anyway."  Pisces (left) cries happily.
import { askFilm, crier, drawBits, drawBurst, floatHeart, spritePt, lerp, prog, ease, clamp, pop01, INK, MONO, MUG, MUG_C, HEART, HEART_C, signStar } from '../../naske01/askkit.js'

const WN = { x: 760, y: 800, w: 380, h: 400 }
// the heart drawn in the frost: a list of cells (in a 9×8 grid) revealed in stroke order
const HC = []
;['.XX...XX.', 'XXXX.XXXX', 'XXXXXXXXX', 'XXXXXXXXX', '.XXXXXXX.', '..XXXXX..', '...XXX...', '....X....'].forEach((r, j) => [...r].forEach((c, i) => { if (c === 'X') HC.push([i, j]) }))
HC.sort((a, b) => Math.atan2(a[1] - 3, a[0] - 4) - Math.atan2(b[1] - 3, b[0] - 4))

function windowFrost(x, t, T, ok) {
  if (ok <= 0.01) return
  const { x: cx, y: cy, w, h } = WN
  x.save(); x.globalAlpha *= ok
  x.fillStyle = INK; x.fillRect(cx - w / 2 - 22, cy - h / 2 - 22, w + 44, h + 44)
  x.fillStyle = '#7a3b2e'; x.fillRect(cx - w / 2 - 16, cy - h / 2 - 16, w + 32, h + 32)
  // warm room glow behind the glass
  const g = x.createLinearGradient(0, cy - h / 2, 0, cy + h / 2); g.addColorStop(0, '#3a2a6a'); g.addColorStop(1, '#6a3a5a'); x.fillStyle = g; x.fillRect(cx - w / 2, cy - h / 2, w, h)
  // frost (pixel speckle, deterministic)
  const c = 20
  for (let j = 0; j < h / c; j++) for (let i = 0; i < w / c; i++) {
    const r = ((i * 7349 + j * 9157) % 100) / 100
    x.fillStyle = `rgba(226,240,255,${0.55 + r * 0.3})`; x.fillRect(cx - w / 2 + i * c, cy - h / 2 + j * c, c, c)
  }
  // the heart wiped clear in the frost
  const n = Math.floor(HC.length * clamp((t + 0.6) / 2.1))
  const hx = cx - 4.5 * c - 0 + 0, hy = cy - 4 * c - 30
  for (let k = 0; k < n; k++) { const [i, j] = HC[k]; x.fillStyle = j > 4 ? '#7a3a6a' : '#5a3a7a'; x.fillRect(hx + i * c, hy + j * c, c, c) }
  // the cross bars
  x.fillStyle = '#7a3b2e'; x.fillRect(cx - 7, cy - h / 2, 14, h); x.fillRect(cx - w / 2, cy + 70, w, 14)
  // a little snow on the sill
  x.fillStyle = '#f4f8ff'; x.fillRect(cx - w / 2 - 24, cy + h / 2 + 14, w + 48, 16)
  x.restore()
  return { hx, hy, c, n }
}

const F = askFilm({
  id: 'naske16', sign: 'cancer',
  question: "They're away for the holidays. I *miss* them.",
  qSize: 86,
  lines: ['missing someone means it matters.', 'plan one call you both look forward to.', 'and lean on the people who are here.'],
  chip: '♋ THE CRAB · RULED BY THE MOON',
  last: 'Miss them. | *Live* anyway.', late: 2,
  hero: { x: 400, y: 1020, size: 330 },
  extraT: T => ({ phone: T.l[1] + 0.4, ring: T.l[1] + 0.9, pals: T.l[2] + 0.5 }),
  state(t, T) {
    if (t < 1.6) return { mood: 'neutral', look: [1, -1], hops: false }
    if (t < T.phone) return { mood: 'sparkle', look: [1, -1] }
    if (t < T.pals) return { mood: 'happy' }
    return { mood: 'heart', look: [1, 0] }
  },
  back(x, t, T, H) {
    const W = windowFrost(x, t, T, H.ok)
    // the drawing tip reaches toward the heart while it's being drawn
    if (W && t < 1.6) {
      const [i, j] = HC[Math.max(0, W.n - 1)]
      const tx = W.hx + i * W.c + 10, ty = W.hy + j * W.c + 10
      x.strokeStyle = INK; x.lineWidth = 22; x.beginPath(); x.moveTo(H.x + 140, H.y - 40); x.lineTo(tx, ty); x.stroke()
      x.strokeStyle = H.opts.color; x.lineWidth = 12; x.beginPath(); x.moveTo(H.x + 140, H.y - 40); x.lineTo(tx, ty); x.stroke()
    }
  },
  front(x, t, T, H) {
    const ok = H.ok
    if (ok <= 0.01) return
    // the phone
    const pk = pop01(t, T.phone, 0.35, 2.4) * (1 - prog(t, T.pals - 0.2, T.pals + 0.2))
    if (pk > 0.01) {
      const p = spritePt(H.F, 30, 12)
      const shake = t > T.ring && t < T.ring + 1.4 ? 5 * Math.sin(t * 60) : 0
      x.save(); x.translate(p.x + 60 + shake, p.y - 110); x.scale(pk, pk); x.rotate(0.08)
      x.fillStyle = INK; x.fillRect(-66, -112, 132, 224); x.fillStyle = '#2a2a3a'; x.fillRect(-58, -104, 116, 208)
      x.fillStyle = t > T.ring ? '#3fb6f0' : '#1c2a40'; x.fillRect(-48, -86, 96, 160)
      x.fillStyle = '#ffffff'; x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.fillText('CALL', 0, -40); x.fillText('AT 8', 0, -14)
      x.restore()
      drawBits(x, HEART, HEART_C, p.x + 60 + shake, p.y - 80, 6 * pk)
      if (t > T.ring) drawBurst(x, p.x + 170, p.y - 230, 70, t, T.ring, { word: 'RING', size: 32, life: 1.0, color: '#bfe6ff' })
    }
    // the two friends + a mug
    const fk = ease.outBack(prog(t, T.pals, T.pals + 0.5))
    if (fk > 0) {
      crier(x, t, { x: lerp(1250, 930, fk), y: 1110, size: 180 }, { color: signStar('virgo').color, mood: 'happy', look: [-1, 0], seed: 3, glow: 0.6, pop: ok, hops: [T.pals + 0.5, T.h2Land] })
      crier(x, t, { x: lerp(1300, 640, fk), y: 1120, size: 170 }, { color: signStar('aries').color, mood: 'happy', look: [-1, 0], seed: 7, glow: 0.6, pop: ok, hops: [T.pals + 0.6, T.h2Land + 0.1] })
      drawBits(x, MUG, MUG_C, lerp(1300, 560, fk), 1105, 10 * ok)
    }
    floatHeart(x, t, T.pals + 0.6, H.x + 60, H.y - 220)
    floatHeart(x, t, T.h2Land, 820, 960)
  },
  cues: T => [
    ...Array.from({ length: 8 }, (_, i) => ['tick', 0.05 + i * 0.2, 0.012]),
    ['pop', T.phone, 987.77, 0.035, 0.3],
    ['pop', T.ring, 1318.51, 0.035, 0.4], ['pop', T.ring + 0.12, 1567.98, 0.035, 0.4], ['pop', T.ring + 0.5, 1318.51, 0.035, 0.4], ['pop', T.ring + 0.62, 1567.98, 0.035, 0.4],
    ['whoosh', T.pals, 0.45, 0.035], ['pop', T.pals + 0.5, 880, 0.03, 0.2], ['pop', T.pals + 0.6, 1046.5, 0.03, -0.2], ['glitter', T.pals + 0.5, T.pals + 0.9],
  ],
})
export const { DURATION, SCENES, CUES, T, DROP } = F
export default F
