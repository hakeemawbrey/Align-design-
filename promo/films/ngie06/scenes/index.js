// ngie06: THE SIGNS AS WINTER GIFTS, "Virgo as a winter gift" (14 s vertical trial reel, music: jazzy · C).
// Story 0–11.6, then the shared end card. The format look lives in ../../npye01/scenes/kit.js.
//   0.0–2.4   hook "If *Virgo* were a | winter gift:" — Virgo mid-tug on the ribbon of a sage box, folding the
//             ribbon neatly as it goes: "save the ribbon!"
//   2.4–5.2   1 "a planner with your birthday *already in it.*" The planner rises; one date circled with a heart.
//   5.2       hard cut (white flash).
//   5.2–8.0   2 "comes with: a coupon for *one free errand.*" A tear-off coupon: ONE FREE ERRAND, "no expiry."
//   8.0–11.6  THE STARS: "Practical love is still *romantic.*"
import { makeEp, R, box, bubble, card, shadow, drawBits, HEART, giftHook, giftReveal, hookCuesGift, revealCues, prog, ease, INK, BONE, INTER, SERIF } from '../../npye01/scenes/kit.js'

function planner(x, t, cx, cy, k) {
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(-0.04)
  box(x, -160, -180, 320, 360, '#8fb08a', { b: 7, hi: '#a8c8a2' })
  box(x, -130, -120, 260, 250, '#fffaf0', { b: 4 })
  for (let j = 0; j < 5; j++) for (let i = 0; i < 7; i++) R(x, '#d8d0c4', -118 + i * 36, -100 + j * 46, 30, 38)
  x.strokeStyle = '#e8344e'; x.lineWidth = 6; x.beginPath(); x.arc(-118 + 4 * 36 + 15, -100 + 2 * 46 + 19, 28, 0, Math.PI * 2); x.stroke()
  drawBits(x, HEART, { H: '#ff5c8a' }, -118 + 4 * 36 + 15, -100 + 2 * 46 + 19, 4)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.fillText('PLANNER', 0, -144)
  x.restore()
}

const EP = makeEp({
  id: 'ngie06', series: 'gifts', sign: 'virgo', name: 'Virgo', boxCol: '#8fb08a', ribbon: BONE, finGift: planner,
  hook(x, t, S) { giftHook(x, t, S, { line: 'save the ribbon!' }) },
  hookCues: hookCuesGift,
  beats: [
    { caption: 'a planner with your birthday *already in it.*',
      draw(x, t, S) { giftReveal(x, t, S, planner, { line: 'colour-coded. you’re pink.', heroMood: 'happy' }) },
      cues: [...revealCues, ['pop', 1.2, 987.77, 0.035, 0]] },
    { caption: 'comes with: a coupon for *one free errand.*',
      draw(x, t, S) {
        const { u, hero } = S
        const k = ease.outCubic(prog(u, 0, 0.35))
        card(x, 640, 780, 520, 230, ['ONE FREE', 'ERRAND'], { size: 64, rot: 0.04, k, col: '#fff1a8' })
        if (k > 0.5) { x.save(); x.setLineDash([14, 12]); x.strokeStyle = INK; x.lineWidth = 4; x.strokeRect(400, 680, 480, 200); x.restore() }
        x.save(); x.globalAlpha = k; x.fillStyle = INK; x.font = `italic 500 34px ${SERIF}`; x.textAlign = 'center'; x.fillText('no expiry.', 640, 930); x.restore()
        shadow(x, 300, 1125, 220)
        hero(x, t, { x: 300, y: 1000, s: 220, mood: u > 0.8 ? 'sparkle' : 'happy', look: [1, -1], hops: [S.t0 + 0.8] })
        bubble(x, t, 640, 560, S.t0 + 1.1, S.t1, 'I’ll do the post office.', { size: 32 })
      },
      cues: [['whoosh', 0.0, 0.3, 0.02], ['pop', 0.35, 1318.51, 0.04, 0], ['pop', 1.1, 880, 0.035, 0]] },
  ],
  last: 'Practical love is still *romantic.*',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [BONE, R]
