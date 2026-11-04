// ngie02: THE SIGNS AS WINTER GIFTS, "Taurus as a winter gift" (16 s vertical trial reel, music: lofi · F).
// Story 0–11.6, then the shared end card. The format look lives in ../../npye01/scenes/kit.js.
//   0.0–2.4   hook "If *Taurus* were a | winter gift:" — Taurus mid-tug on the ribbon of a green box: "gently. it's soft."
//   2.4–5.2   1 "the *softest* blanket you've ever touched." A folded quilt rises; Taurus nuzzles it.
//   5.2       card cut.
//   5.2–8.0   2 "comes with: bread, *still warm.*" A loaf, steaming, on a little board.
//   8.0–11.6  THE STARS: "Comfort counts. So does *staying* a while."
import { makeEp, R, box, bubble, shadow, sparkles, giftHook, giftReveal, hookCuesGift, revealCues, prog, ease, INK, BONE, GOLD, PINK } from '../../npye01/scenes/kit.js'

function blanket(x, t, cx, cy, k) {
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < 3; i++) { box(x, -170, -40 + i * 60 - 90, 340, 56, ['#e8a0b8', '#f4d1a6', '#b8d8c0'][i], { b: 6 }); for (let j = 0; j < 8; j++) R(x, 'rgba(255,255,255,0.35)', -160 + j * 42, -24 + i * 60 - 90, 18, 18) }
  x.restore()
}
function loaf(x, t, cx, cy, k) {
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -200, 40, 400, 30, '#a07850', { b: 6 })
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 176, 86, 0, Math.PI, 0); x.lineTo(176, 40); x.lineTo(-176, 40); x.fill()
  x.fillStyle = '#d99a4a'; x.beginPath(); x.ellipse(0, 4, 168, 78, 0, Math.PI, 0); x.lineTo(168, 36); x.lineTo(-168, 36); x.fill()
  for (const d of [-90, -30, 30, 90]) R(x, '#f2c27a', d - 8, -50, 16, 40)
  x.restore()
  for (let i = 0; i < 4; i++) { const p = (t * 0.8 + i / 4) % 1; x.save(); x.globalAlpha = 0.7 * (1 - p) * k; R(x, BONE, cx - 90 + i * 60 + Math.sin(t * 4 + i) * 10, cy - 110 - p * 120, 12, 24); x.restore() }
}

const EP = makeEp({
  id: 'ngie02', series: 'gifts', sign: 'taurus', name: 'Taurus', boxCol: '#3f9a5a', ribbon: '#f4d1a6', finGift: blanket,
  hook(x, t, S) { giftHook(x, t, S, { line: 'gently. it’s soft.' }) },
  hookCues: hookCuesGift,
  beats: [
    { caption: 'the *softest* blanket you’ve ever touched.',
      draw(x, t, S) { giftReveal(x, t, S, blanket, { line: 'I tested it. for hours.', heroMood: 'happy' }) },
      cues: [...revealCues, ['pop', 1.2, 880, 0.035, 0]] },
    { caption: 'comes with: bread, *still warm.*',
      draw(x, t, S) {
        const { u, hero } = S
        loaf(x, t, 640, 900, ease.outCubic(prog(u, 0, 0.4)))
        sparkles(x, t, 640, 860, S.t0 + 0.4, 8, 200, 2, [GOLD, BONE, PINK])
        shadow(x, 300, 1125, 220)
        hero(x, t, { x: 300, y: 970, s: 230, mood: u > 0.6 ? 'heart' : 'happy', look: [1, 0], hops: [S.t0 + 0.6] })
        bubble(x, t, 640, 640, S.t0 + 1.0, S.t1, 'butter’s in the side pocket.', { size: 32 })
      },
      cues: [['whoosh', 0.0, 0.3, 0.02], ['pop', 0.4, 1174.66, 0.04, 0], ['pop', 1.0, 880, 0.03, 0]] },
  ],
  last: 'Comfort counts. So does *staying* a while.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
