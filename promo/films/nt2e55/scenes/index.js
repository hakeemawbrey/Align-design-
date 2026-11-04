// nt2e55: RATE THE EXCUSE, "Not saying it yet." (25 s vertical, Trends Vol. 2 ep 55, music: funk · Dm)
// Format kit: ../../nt2e51/scenes/excusekit.js. Story 0–20.6, then the shared end card.
//   0.0–2.3    hook "Rate the *excuse:* | hasn’t said ‘I like you’ yet." ♏ Scorpio half-hidden behind a cushion.
//              The couch: ♋ Cancer, ♎ Libra, ♓ Pisces.
//   2.3        #1 "I was waiting for *a sign.*" (all twelve glyphs drift past, none of them helpful) → 6 · 5 · 6
//   7.0        #2 "the moon wasn’t in *the right spot.*" (a moon, shrugging) → 2 · 3 · 1
//   11.7       (card cut) #3 the truth: "I was scared you *didn’t feel the same.*" → 10 · 10 · 10
//   16.0       ♉ Taurus walks in: "I do."  Scorpio melts. THE STARS: "Scared, said it *anyway*."
import { makeExcuse, HX, HY, B } from '../../nt2e51/scenes/excusekit.js'
const { R, box, bubble, hearts, shadow, label, lerp, prog, ease, clamp, INK, BONE, GOLD, INTER } = B

const GLYPHS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓']
function cushion(x, cx, cy, up = 1) { box(x, cx - 110, cy - 90 * up, 220, 170, '#e8344e', { b: 7, hi: '#ff6b7f' }); R(x, INK, cx - 6, cy - 90 * up + 70, 12, 12) }
function glyphs(x, t, u) {
  x.save(); x.font = `700 54px 'Noto Sans Symbols 2', 'Segoe UI Symbol', sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'
  GLYPHS.forEach((g, i) => { const p = ((u * 0.35 + i / 12) % 1); const gx = lerp(1100, -40, p), gy = HY - 160 + Math.sin(p * 9 + i) * 60; x.fillStyle = 'rgba(6,4,18,0.8)'; x.fillText(g + '︎', gx + 3, gy + 4); x.fillStyle = GOLD; x.fillText(g + '︎', gx, gy) })
  x.restore(); void t
}
function moon(x, t, cx, cy) {
  x.save(); x.translate(cx, cy + Math.sin(t * 3) * 8)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 76, 0, Math.PI * 2); x.fill(); x.fillStyle = '#f4ecd0'; x.beginPath(); x.arc(0, 0, 70, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#d8ceb0'; x.beginPath(); x.arc(-20, -18, 14, 0, Math.PI * 2); x.arc(24, 20, 10, 0, Math.PI * 2); x.fill()
  x.restore()
  label(x, '¯\\_(ツ)_/¯', cx, cy + 110, { size: 28, col: BONE })
}
const EP = makeExcuse({
  id: 'nt2e55', hero: 'scorpio', situation: 'hasn’t said *‘I like you’* yet.', accent: '#e05a7a', deep: '#a8264a', judges: ['cancer', 'libra'],
  hook(x, t, S) {
    shadow(x, HX, HY + 140, 220)
    S.hero(x, t, { mood: 'wide', look: [1, 0], hops: [0.9] })
    cushion(x, HX, HY + 120, 0.55 + 0.05 * Math.sin(t * 3))
  },
  excuses: [
    { text: 'I was waiting for *a sign.*', scores: [6, 5, 6], mood: 'sparkle', draw(x, t, S) { glyphs(x, t, S.u) } },
    { text: 'the moon wasn’t in *the right spot.*', scores: [2, 3, 1], mood: 'happy', draw(x, t) { moon(x, t, HX + 270, HY - 60) } },
    { text: 'I was scared you *didn’t feel the same.*', scores: [10, 10, 10], mood: 'wide', draw(x, t) { cushion(x, HX - 250, HY + 120, 0.4) } },
  ],
  finale(x, t, S) {
    const u = S.u
    const dx = lerp(1200, 780, ease.outCubic(prog(u, 0, 0.7)))
    shadow(x, 380, HY + 140, 200); shadow(x, dx, HY + 140, 200)
    S.hero(x, t, { x: 380, s: 230, mood: u > 0.9 ? 'heart' : 'wide', blush: u > 0.9 ? 1 : 0, look: [1, 0], hops: [17.0, 17.3, 18.4] })
    B.sign(x, t, 'taurus', { x: dx, y: HY, s: 220, mood: 'happy', look: [-1, 0], seed: 7, hops: [16.6, 18.5] })
    bubble(x, t, 780, HY - 220, 16.5, 19.9, 'I do.', { size: 44, tail: 0.1 })
    hearts(x, t, 17.0, 580, HY - 80, { n: 7 })
  },
  last: 'Scared, said it *anyway*.',
  hookCues: [['pop', 0.9, 587.33, 0.03, 0]],
  finCues: [['whoosh', 0.05, 0.5, 0.03], ['bell', 0.5, 1318.51, 0.04, 1.4, 0.2], ['glitter', 1.0, 1.6]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void R; void INTER; void clamp
