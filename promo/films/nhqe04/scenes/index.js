// nhqe04: HOLIDAYS THEN VS NOW, "Cancer homesick." (15 s vertical trial reel, promo/films/next30/b48.md,
// music: dreamy · G). Story 0–10.6, then the shared end card. The format lives in ../../nhqe01/scenes/hqkit.js.
//   THEN   Cancer hides behind a giant sweater sleeve, lip wobbling: "I’m fine!!"  Sticker "*totally* fine."
//   NOW    Cancer: "I miss home."  Taurus and Leo squeeze in for a group hug. Sticker "said it *out loud.*"
//   7.9    THE STARS: "Saying it out loud lets people help."
import { makeHQ, box, R, shadow, glow, bubble, hearts, snow, pop01, prog, ease, lerp, INK } from '../../nhqe01/scenes/hqkit.js'

function windowBox(x, t) {
  box(x, 600, 470, 380, 420, '#1d2a52', { b: 10 })
  x.save(); x.beginPath(); x.rect(600, 470, 380, 420); x.clip(); snow(x, t, { n: 16, y0: 460, y1: 900, seed: 7 }); x.restore()
  R(x, INK, 783, 470, 14, 420); R(x, INK, 600, 673, 380, 14)
}

const EP = makeHQ({
  id: 'nhqe04', hook: '*Cancer* homesick: | then vs now', accent: '#8fd8ff', deep: '#2a7fb0',
  thenCap: '*totally* fine.', nowCap: 'said it *out loud.*',
  then(x, t, S) {
    windowBox(x, t)
    shadow(x, 420, 1280, 240)
    const wob = Math.sin(t * 30) * 3
    S.star(x, t, 'cancer', { x: 420 + wob, y: 1080, s: 260, mood: 'wide', look: [0, 0.6] })
    // the sweater sleeve over half the face
    x.save(); x.translate(470, 1040); x.rotate(-0.5); box(x, -50, -40, 260, 90, '#c96b8f', { b: 6 }); for (let i = 0; i < 4; i++) R(x, 'rgba(255,255,255,0.22)', -30 + i * 60, -36, 14, 82); x.restore()
    bubble(x, t, 400, 860, S.split ? -1 : 2.6, 5.0, 'I’m fine!!', { size: 40, tail: 0 })
  },
  now(x, t, S) {
    glow(x, 540, 1000, 600, 0.7)
    const sq = S.split ? 1 : ease.outBack ? ease.outCubic(prog(S.u, 1.0, 1.5)) : 1
    shadow(x, 540, 1290, 520)
    S.star(x, t, 'taurus', { x: lerp(150, 330, sq), y: 1100, s: 220, mood: 'happy', look: [1, 0], hops: [6.0, 7.0], seed: 4, pop: S.split ? 1 : pop01(S.u, 0.9, 0.3) })
    S.star(x, t, 'leo', { x: lerp(930, 750, sq), y: 1100, s: 220, mood: 'happy', look: [-1, 0], hops: [6.0, 7.2], seed: 8, pop: S.split ? 1 : pop01(S.u, 0.95, 0.3) })
    S.star(x, t, 'cancer', { x: 540, y: 1060, s: 260, mood: sq > 0.5 ? 'sparkle' : 'neutral', look: [0, 0], hops: [5.2, 6.05], squash: 0.08 * sq })
    bubble(x, t, 540, 820, S.split ? -1 : 5.2, 6.0, 'I miss home.', { size: 40, tail: 0 })
    if (!S.split) hearts(x, t, 6.1, 540, 860, { n: 7, spread: 500 })
  },
  pisThen: { x: 160, y: 700, s: 110 }, pisNow: { x: 960, y: 1250, s: 120 },
  last: 'Saying it out loud lets people help.',
  cues: [['pop', 5.22, 987.77, 0.035, 0], ['whoosh', 5.85, 0.3, 0.03], ['pop', 6.02, 1318.51, 0.045, -0.3], ['pop', 6.08, 1567.98, 0.045, 0.3], ['glitter', 6.05, 6.5]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
