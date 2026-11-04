// nhqe18: HOLIDAYS THEN VS NOW, "Holiday leftovers." (15 s vertical trial reel, promo/films/next30/b48.md,
// music: cinematic · Eb). Story 0–10.6, then the shared end card. The format lives in ../../nhqe01/scenes/hqkit.js.
//   THEN   Taurus guards a container of leftovers behind a little breadstick fence: "mine."  Aquarius peeks, hopeful.
//          Sticker "guarding the *leftovers.*"
//   NOW    Taurus slides over a box labelled "for you ♥"; Aquarius melts. Sticker "packing a box *for you.*"
//   7.9    THE STARS: "Love sometimes looks like leftovers."
import { makeHQ, box, R, ink, shadow, glow, bubble, hearts, sparkles, pop01, prog, lerp, ease, INK, BONE, GOLD, PINK, SERIF } from '../../nhqe01/scenes/hqkit.js'

function container(x, cx, cy, label) {
  box(x, cx - 90, cy - 80, 180, 80, '#e8f2f6', { b: 5 }); R(x, '#d9a05b', cx - 80, cy - 70, 160, 40); R(x, '#9fe6b0', cx - 40, cy - 64, 30, 20)
  box(x, cx - 100, cy - 100, 200, 24, '#7fbfe8', { b: 5 })
  if (label) { x.save(); x.translate(cx, cy - 40); x.rotate(-0.04); box(x, -80, -26, 160, 52, BONE, { b: 4 }); ink(x, 'for you ♥', 0, 2, { size: 30, font: SERIF, weight: 500, col: '#c0392b' }); x.restore() }
}
function fence(x, cx, cy) { for (let i = 0; i < 6; i++) { x.save(); x.translate(cx - 125 + i * 50, cy); x.rotate(0.05 * (i % 2 ? 1 : -1)); box(x, -9, -110, 18, 110, '#e8b46b', { b: 4 }); x.restore() } }
function table(x) { box(x, 60, 1180, 960, 50, '#6b4a2f', { b: 6, hi: '#8a6440' }) }

const EP = makeHQ({
  id: 'nhqe18', hook: 'Holiday *leftovers:* | then vs now', accent: '#ffb38a', deep: '#a8501a',
  thenCap: 'guarding the *leftovers.*', nowCap: 'packing a box *for you.*',
  then(x, t, S) {
    S.star(x, t, 'taurus', { x: 330, y: 1000, s: 240, mood: 'squint', look: [1, 0], hops: [3.2] })
    S.star(x, t, 'aquarius', { x: 900, y: 1040, s: 170, mood: 'sparkle', look: [-1, 0.4], seed: 7 })
    table(x)
    container(x, 560, 1180, false)
    fence(x, 560, 1180)
    bubble(x, t, 330, 760, S.split ? -1 : 2.6, 5.0, 'mine.', { size: 46, tail: 0 })
  },
  now(x, t, S) {
    glow(x, 540, 1000, 600, 0.6)
    const slide = S.split ? 1 : ease.inOutCubic(prog(t, 5.3, 5.9))
    const melt = S.split || t > 5.95
    S.star(x, t, 'taurus', { x: 280, y: 1000, s: 230, mood: 'happy', look: [1, 0], hops: [5.3, 6.4] })
    S.star(x, t, 'aquarius', { x: 820, y: 1000, s: 220, mood: melt ? 'heart' : 'wide', look: [-1, 0.4], seed: 7, hops: [6.0, 6.3] })
    table(x)
    container(x, lerp(420, 640, slide), 1180, true)
    if (!S.split) { hearts(x, t, 6.0, 820, 820, { n: 6 }); sparkles(x, t, 640, 1120, 5.95, 10, 160, 0.2, [GOLD, BONE, PINK]) }
    bubble(x, t, 300, 770, S.split ? -1 : 5.4, 10.6, 'take it home!', { size: 38, tail: 0 })
  },
  pisThen: { x: 960, y: 600, s: 100 }, pisNow: { x: 960, y: 560, s: 110 },
  last: 'Love sometimes looks like leftovers.',
  cues: [['pop', 2.62, 659.25, 0.045, -0.3], ['whoosh', 5.3, 0.6, 0.025], ['pop', 5.42, 1174.66, 0.04, -0.3], ['pop', 5.97, 1567.98, 0.045, 0.3], ['glitter', 5.95, 6.5]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [shadow, pop01]
