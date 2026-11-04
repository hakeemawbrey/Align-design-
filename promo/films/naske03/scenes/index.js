// naske03 · Ask the Stars, Volume 2, ep 3 · "I lose interest after the first few dates." (18 s, star_advice post)
// Story 0–15.6, then the short end card (2.4 s). The look lives in ../../naske01/askkit.js.
//   0.00  frame 0: the DM; ♊ Gemini juggling three snowballs over its head, tongue-out focus (squint).
//   2.5   GEMINI: "the first spark always changes shape."  chip ♊ MUTABLE AIR · RULED BY MERCURY
//   ~5.5  "on date four, ask a deeper question."  Two snowballs thud into the snow; it catches the last one.
//   ~8.4  "bored can just mean not curious yet."  It peers at the one it kept: the snowball starts to sparkle.
//   box closes → "Stay *curious* | past date three."  + TONIGHT'S DECK tie-in. Pisces (left) cries happily.
import { askFilm, drawSnowball, drawBurst, sparkles, drawPixelStar, lerp, prog, ease, clamp, GOLD } from '../../naske01/askkit.js'

const R = 56
const F = askFilm({
  id: 'naske03', sign: 'gemini',
  question: 'I lose interest after the *first* few dates.',
  lines: ['the first spark always changes shape.', 'on date four, ask a deeper question.', 'bored can just mean not curious yet.'],
  chip: '♊ MUTABLE AIR · RULED BY MERCURY',
  last: 'Stay *curious* | past date three.', late: 3,
  tie: "TONIGHT'S DECK · A NEW QUESTION<br>DEALT EVERY NIGHT",
  hero: { x: 560, y: 1010, size: 360 },
  extraT: T => ({ drop: T.l[1] + 0.25, catch: T.l[1] + 0.9, glow: T.l[2] + 0.4 }),
  state(t, T) {
    if (t < T.drop) return { mood: 'squint', look: [0, -1], hops: false }
    if (t < T.catch + 0.3) return { mood: 'wide', look: [0, -1], hops: false }
    if (t < T.glow) return { mood: 'neutral', look: [1, -1] }
    return { mood: 'sparkle', look: [1, -1] }
  },
  front(x, t, T, H) {
    const ok = H.ok
    for (let i = 0; i < 3; i++) {
      const a = t * 4.2 + i * (Math.PI * 2 / 3)
      let bx = H.x + Math.cos(a) * 190, by = H.y - 290 + Math.sin(a) * 110
      if (i < 2 && t > T.drop) {
        // falls: from where it was at drop time to the snow, with a little bounce
        const a0 = T.drop * 4.2 + i * (Math.PI * 2 / 3)
        const x0 = H.x + Math.cos(a0) * 190, y0 = H.y - 290 + Math.sin(a0) * 110
        const p = clamp((t - T.drop) / 0.55)
        bx = x0 + (i ? 120 : -140) * p; by = lerp(y0, 1215, p * p)
        if (p >= 1) drawBurst(x, bx, 1180, 70, t, T.drop + 0.55, { word: 'PLOP', size: 34, color: '#e9f1ff', life: 0.6 })
      }
      if (i === 2 && t > T.drop) {
        // the keeper: settles into its right tip
        const tx = H.x + 210, ty = H.y - 40
        const a0 = T.drop * 4.2 + i * (Math.PI * 2 / 3)
        const p = ease.outBack(prog(t, T.drop, T.catch))
        bx = lerp(H.x + Math.cos(a0) * 190, tx, p); by = lerp(H.y - 290 + Math.sin(a0) * 110, ty, p) + Math.sin(t * 2) * 4
      }
      drawSnowball(x, bx, by, R * ok)
      if (i === 2 && t > T.glow) {
        const g = clamp((t - T.glow) / 0.5)
        x.save(); x.globalAlpha = 0.5 * g * ok; const rg = x.createRadialGradient(bx, by, 10, bx, by, 150); rg.addColorStop(0, 'rgba(242,199,92,0.9)'); rg.addColorStop(1, 'rgba(242,199,92,0)'); x.fillStyle = rg; x.fillRect(bx - 150, by - 150, 300, 300); x.restore()
        for (let k = 0; k < 5; k++) { const ph = (t * 0.7 + k / 5) % 1; drawPixelStar(x, bx + Math.cos(k * 1.3 + t) * (60 + ph * 40), by + Math.sin(k * 1.9) * 50 - ph * 60, 22 * (1 - ph) * g * ok, 1, k % 2 ? GOLD : '#ffffff') }
      }
    }
    sparkles(x, t, H.x + 210, H.y - 40, T.glow, 10, 120, 1)
  },
  cues: T => [
    ['whoosh', 0.05, 0.4, 0.02], ['tick', 0.45, 0.025], ['tick', 0.95, 0.025], ['tick', 1.45, 0.025], ['tick', 1.95, 0.025],
    ['whoosh', T.drop, 0.5, 0.035], ['boom', T.drop + 0.55, 0.08], ['pop', T.drop + 0.56, 440, 0.03, -0.3], ['pop', T.drop + 0.6, 392, 0.03, 0.3],
    ['pop', T.catch, 987.77, 0.035, 0.3], ['glitter', T.glow, T.glow + 0.8], ['bell', T.glow + 0.1, 1760, 0.02, 1.0, 0.3],
  ],
})
export const { DURATION, SCENES, CUES, T, DROP } = F
export default F
