// nhqe16: HOLIDAYS THEN VS NOW, "Ice skating." (15 s vertical trial reel, promo/films/next30/b48.md, music: jazzy · F).
// Story 0–10.6, then the shared end card. The format lives in ../../nhqe01/scenes/hqkit.js.
//   THEN   Virgo wobbles wildly on the ice: "I’m a natural."  Pisces watches, sniffling with worry. Sticker "“I’m a *natural.*”"
//   NOW    Virgo: "teach me?"  Pisces takes its hand and they glide in a slow circle, Pisces happy-crying. Sticker "“*teach me?*”"
//   7.9    THE STARS: "Saying “teach me” is flirting."
import { makeHQ, box, R, shadow, glow, bubble, hearts, snow, INK, BONE } from '../../nhqe01/scenes/hqkit.js'

function rink(x, t) {
  R(x, '#cfe9f6', 0, 1120, 1080, 210); R(x, '#a9d4ea', 0, 1120, 1080, 12)
  for (let i = 0; i < 6; i++) R(x, 'rgba(255,255,255,0.5)', 60 + i * 180, 1180 + (i % 2) * 50, 90, 5)
  box(x, -10, 1060, 1100, 60, '#e9e6f6', { b: 6 })
  snow(x, t, { n: 24, y0: 380, y1: 1100, seed: 2 })
}
function skates(x, cx, cy, rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  for (const d of [-36, 36]) { box(x, d - 26, -18, 52, 26, '#f4f1ff', { b: 4 }); R(x, INK, d - 30, 10, 60, 6) }
  x.restore()
}

const EP = makeHQ({
  id: 'nhqe16', hook: 'Ice *skating:* | then vs now', accent: '#9ad8ff', deep: '#2a7fb0',
  thenCap: '“I’m a *natural.*”', nowCap: '“*teach me?*”',
  noPis: true,
  then(x, t, S) {
    rink(x, t)
    const wob = Math.sin(t * 7) * 0.35 + Math.sin(t * 13) * 0.12
    x.save(); x.translate(560, 1210); x.rotate(wob); x.translate(-560, -1210)
    S.star(x, t, 'virgo', { x: 560, y: 1060, s: 230, mood: 'wide', look: [Math.sign(wob), -0.6], bob: 0 })
    skates(x, 560, 1180)
    x.restore()
    shadow(x, 220, 1240, 160)
    S.pis(x, t, { x: 220, y: 1100, s: 170, mood: 'wide', look: [1, 0], tears: 1 })
    bubble(x, t, 600, 830, S.split ? -1 : 2.6, 5.0, 'I’m a natural.', { size: 38, tail: 0 })
  },
  now(x, t, S) {
    rink(x, t)
    glow(x, 540, 1000, 600, 0.5)
    const a = S.split ? 0.6 : (t - 5.6) * 0.9
    const cx = 540 + Math.sin(Math.max(0, a)) * 160
    const hand = (vx, vy) => { R(x, INK, cx - 40, vy - 10, 80, 20); R(x, '#f2c75c', cx - 34, vy - 5, 68, 10) }
    S.star(x, t, 'virgo', { x: cx - 130, y: 1060, s: 210, mood: 'happy', look: [1, 0], hops: [5.3] })
    S.pis(x, t, { x: cx + 130, y: 1060, s: 210, mood: 'happy', look: [-1, 0], tears: 3, hops: [5.9, 6.8] })
    hand(cx, 1090)
    skates(x, cx - 130, 1170, -0.05); skates(x, cx + 130, 1170, 0.05)
    bubble(x, t, 400, 820, S.split ? -1 : 5.25, 6.4, 'teach me?', { size: 40, tail: -0.2 })
    if (!S.split) hearts(x, t, 6.3, cx, 860, { n: 6 })
  },
  last: 'Saying “teach me” is flirting.',
  cues: [['whoosh', 2.6, 0.4, 0.025], ['pop', 2.62, 987.77, 0.04, 0], ['whoosh', 3.6, 0.4, 0.025], ['pop', 5.27, 1318.51, 0.045, -0.3], ['whoosh', 5.7, 1.2, 0.02], ['glitter', 6.3, 6.8]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void BONE
