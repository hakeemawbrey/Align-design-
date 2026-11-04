// naske14 · Ask the Stars, Volume 2, ep 14 · "They're always late and it bugs me." (20 s, star_advice post)
// Story 0–15.6, then the shared end card. The look lives in ../../naske01/askkit.js.
//   0.00  frame 0: the DM; ♉ Taurus waiting under a big pixel clock, a cocoa in each tip, snow already piling on its head;
//         the clock's hands whizz round.
//   2.5   TAURUS: "say how it feels, not what they are."  chip ♉ THE BULL · RULED BY VENUS
//   ~5.4  "'i feel forgotten when i wait' is softer."  The snow pile grows taller. The cocoa steam stops.
//   ~8.2  "then pick a time that works for both."  The clock settles; the snow pile slides off, PLOMP. A smile.
//   card cut → "Name the *feeling*, | not the flaw."  Pisces (left) cries happily.
import { askFilm, drawBits, drawBurst, floatHeart, spritePt, lerp, prog, ease, clamp, MUG, MUG_C, INK, GOLD } from '../../naske01/askkit.js'

const CL = { x: 780, y: 690, r: 120 }
function clock(x, t, T, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= k
  const c = 10
  for (let j = -14; j <= 14; j++) for (let i = -14; i <= 14; i++) {
    const d = Math.hypot(i, j) * c
    if (d > CL.r + c) continue
    x.fillStyle = d > CL.r ? INK : d > CL.r - 18 ? GOLD : '#f5eedf'
    x.fillRect(CL.x + i * c - c / 2, CL.y + j * c - c / 2, c, c)
  }
  for (let h = 0; h < 12; h++) { const a = h * Math.PI / 6; x.fillStyle = INK; x.fillRect(Math.round(CL.x + Math.cos(a) * 82) - 5, Math.round(CL.y + Math.sin(a) * 82) - 5, 10, 10) }
  // hands: whizzing until the plan, then a calm, agreed time
  const settle = ease.outCubic(prog(t, T.plan, T.plan + 0.8))
  const spin = t * 9
  const am = lerp(spin, Math.ceil(T.plan * 9 / (2 * Math.PI)) * 2 * Math.PI, settle), ah = lerp(spin / 12, Math.PI * 0.5, settle)
  for (const [a, L, w] of [[am, 88, 10], [ah, 56, 14]]) { x.save(); x.translate(CL.x, CL.y); x.rotate(a); x.fillStyle = INK; x.fillRect(-w / 2, -L, w, L); x.restore() }
  x.fillStyle = '#c8283c'; x.fillRect(CL.x - 9, CL.y - 9, 18, 18)
  x.restore()
}

const F = askFilm({
  id: 'naske14', sign: 'taurus',
  question: "They're always *late* and it bugs me.",
  qSize: 92,
  lines: ['say how it feels, not what they are.', "'i feel forgotten when i wait' is softer.", 'then pick a time that works for both.'],
  chip: '♉ THE BULL · RULED BY VENUS',
  last: 'Name the *feeling*, | not the flaw.', late: 3, lastSize: 100, lastAccent: 136,
  hero: { x: 400, y: 1020, size: 340 },
  extraT: T => ({ cold: T.l[1] + 0.8, plan: T.l[2] + 0.4, slide: T.l[2] + 1.3 }),
  state(t, T) {
    if (t < T.slide) return { mood: t < T.l[1] ? 'squint' : 'neutral', look: t < T.l[1] ? [1, -1] : [0, 0], squash: 0.05 * Math.min(1, t / 8) }
    if (t < T.slide + 0.4) return { mood: 'wide', look: [0, -1] }
    return { mood: 'happy' }
  },
  back(x, t, T, H) { clock(x, t, T, H.ok) },
  front(x, t, T, H) {
    const ok = H.ok
    if (ok <= 0.01) return
    // two cocoas
    for (const [u, dx] of [[3, -24], [33, 24]]) {
      const m = spritePt(H.F, u, 16)
      drawBits(x, MUG, MUG_C, m.x + dx, m.y + 10, 10 * ok, { flipX: dx > 0 })
      const steam = 1 - prog(t, T.cold - 0.6, T.cold)
      x.save(); x.fillStyle = 'rgba(239,230,214,0.65)'
      for (let i = 0; i < 3; i++) { const ph = (t * 0.8 + i * 0.33 + u) % 1; x.globalAlpha = Math.sin(Math.PI * ph) * steam * ok; x.fillRect(Math.round(m.x + dx - 30 + i * 16 + Math.sin(ph * 6 + i) * 6), Math.round(m.y - 40 - ph * 70), 8, 8) }
      x.restore()
    }
    // the snow pile on its top tip, growing (then sliding off)
    const top = { x: H.F.ox, y: H.F.oy - H.F.base - H.F.S * 0.5 }
    const h = lerp(40, 150, clamp(t / T.slide))
    const s = ease.inCubic(prog(t, T.slide, T.slide + 0.45))
    const px = top.x + s * 190, py = top.y + 10 + s * 330
    if (s < 1) for (let j = 0; j < h; j += 12) { const w = lerp(150, 50, j / h); x.fillStyle = INK; x.fillRect(Math.round(px - w / 2 - 4), Math.round(py - j - 12), Math.round(w + 8), 16); x.fillStyle = j % 24 ? '#f4f8ff' : '#dfe9fb'; x.fillRect(Math.round(px - w / 2), Math.round(py - j - 10), Math.round(w), 12) }
    drawBurst(x, top.x + 220, 1180, 80, t, T.slide + 0.45, { word: 'PLOMP', size: 36, color: '#e9f1ff', life: 0.8 })
    floatHeart(x, t, T.plan + 0.6, CL.x + 140, CL.y - 80)
    floatHeart(x, t, T.h2Land, H.x + 100, H.y - 230)
  },
  cues: T => [
    ...Array.from({ length: 14 }, (_, i) => ['tick', 0.1 + i * 0.5, i % 2 ? 0.02 : 0.03]),
    ['pluck', T.cold, 392, 0.03, 0.6, 0], ['whoosh', T.plan, 0.6, 0.025], ['bell', T.plan + 0.8, 1318.51, 0.025, 1.0, 0.3],
    ['whoosh', T.slide, 0.4, 0.04], ['boom', T.slide + 0.45, 0.08], ['pop', T.slide + 0.46, 440, 0.035, 0.3],
  ],
})
export const { DURATION, SCENES, CUES, T, DROP } = F
export default F
