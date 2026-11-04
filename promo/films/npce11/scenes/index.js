// npce11: PISCES CRIES ABOUT… "a talk card." (14 s vertical trial reel, promo/films/next30/b48.md, music: funk · A).
// Story 0–9.6, then the shared end card. The format lives in ../../npce01/scenes/criekit.js.
//   0.0       hook: a talk card on the café table, "What small thing makes you feel loved?"; Pisces already sniffling.
//   1.1       Pisces: "when people remember… little things."  2.3 Virgo: "you take oat milk."
//   2.75      sticker "it was *one question.*"  4.2 fountains.
//   5.6       card cut. THE STARS: "Answer softly. Listen longer."
import { makeCry, box, R, ink, shadow, glow, bubble, mug, sparkles, hearts, pop01, prog, ease, INK, BONE, GOLD, PINK, SERIF, MONO } from '../../npce01/scenes/criekit.js'

function talkCard(x, cx, cy, sc, rot) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(sc, sc)
  box(x, -300, -170, 600, 340, '#fbf6e9', { b: 8 })
  R(x, '#e86a5a', -300, -170, 600, 70)
  ink(x, 'TALK CARD', 0, -134, { size: 34, col: BONE, font: MONO })
  ink(x, 'What small thing makes', 0, -30, { size: 50, font: SERIF, weight: 500, col: '#2a1f5a' })
  ink(x, 'you feel loved?', 0, 40, { size: 50, font: SERIF, weight: 500, col: '#2a1f5a' })
  ink(x, '♥', 240, 120, { size: 40, col: '#e86a5a', font: 'serif' })
  x.restore()
}

const EP = makeCry({
  id: 'npce11', topic: 'a talk card', accent: '#ff9a8a', deep: '#c0392b',
  sticker: 'it was *one question.*', peak: 4.2,
  tissues: [1.2, 2.4, 2.9, 3.5, 4.2, 4.45, 4.7],
  scene(x, t, S) {
    glow(x, 540, 900, 620, 0.5)
    talkCard(x, 540, 560 + 5 * Math.sin(t * 2), 0.95, -0.03)
    shadow(x, 260, 1140, 200); shadow(x, 830, 1140, 200)
    S.pis(x, t, { x: 250, y: 990, s: 240, mood: t < 2.3 ? 'neutral' : t < 3.0 ? 'wide' : 'sparkle', look: t < 2.3 ? [0, -1] : [1, 0], hops: [1.15, 1.6, 2.4, 4.22, 4.6] })
    S.star(x, t, 'virgo', { x: 840, y: 990, s: 240, mood: t > 2.3 ? 'happy' : 'neutral', look: [-1, 0], hops: [2.32, 2.7], seed: 7 })
    box(x, -20, 1150, 1120, 60, '#6b4a2f', { b: 6, hi: '#8a6440' })
    mug(x, t, 420, 1145, 64, '#7fbfe8'); mug(x, t, 680, 1145, 64, '#e8c07f')
    bubble(x, t, 330, 780, 1.1, 2.3, 'when people remember…', { size: 32, tail: -0.4 })
    bubble(x, t, 330, 780, 1.65, 2.3, 'little things.', { size: 34, tail: -0.4 })
    bubble(x, t, 760, 800, 2.3, 5.4, 'you take oat milk.', { size: 36, tail: 0.5, col: '#d9f2c4' })
    sparkles(x, t, 760, 800, 2.35, 10, 220, 0.2, [GOLD, BONE, PINK])
    if (t > 3.2) hearts(x, t, 3.25, 840, 860, { n: 4 })
  },
  finale(x, t, { ok }) { const k = pop01(t, 5.75, 0.3, 2.2) * ok; if (k > 0.01) talkCard(x, 520, 660, 0.45 * k, -0.1) },
  last: 'Answer softly. Listen longer.',
  cues: [['pop', 1.12, 987.77, 0.035, -0.3], ['pop', 1.67, 1174.66, 0.035, -0.3], ['pop', 2.32, 1318.51, 0.045, 0.3], ['pluck', 2.4, 1760, 0.03, 0.3, 0.4]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
