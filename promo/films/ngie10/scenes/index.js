// ngie10: THE SIGNS AS WINTER GIFTS, "Capricorn as a winter gift" (14 s vertical trial reel, music: jazzy · Eb).
// Story 0–11.6, then the shared end card. The format look lives in ../../npye01/scenes/kit.js.
//   0.0–2.4   hook "If *Capricorn* were a | winter gift:" — Capricorn mid-tug on the ribbon of a charcoal box: "it's
//             an investment."
//   2.4–5.2   1 "a wool coat that'll last *ten winters.*" A sturdy coat rises on a hanger, buttons gleaming.
//   5.2       hard cut (white flash).
//   5.2–8.0   2 "comes with: a ten-year plan. *you're in it.*" A scroll unrolls: YEAR 1: you · YEAR 5: still you ·
//             YEAR 10: you (in the coat).
//   8.0–11.6  THE STARS: "Steady love is the kind that *lasts.*"
import { makeEp, R, box, bubble, shadow, giftHook, giftReveal, hookCuesGift, revealCues, prog, ease, INK, BONE, GOLD, SERIF, INTER } from '../../npye01/scenes/kit.js'

function coat(x, t, cx, cy, k) {
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.strokeStyle = INK; x.lineWidth = 8; x.beginPath(); x.moveTo(0, -200); x.lineTo(0, -230); x.arc(0, -245, 14, Math.PI / 2, -Math.PI); x.stroke()
  R(x, INK, -110, -206, 220, 12)
  box(x, -120, -190, 240, 330, '#4a5a7a', { b: 7, hi: '#5e6e90' }); box(x, -170, -180, 50, 250, '#4a5a7a', { b: 6 }); box(x, 120, -180, 50, 250, '#4a5a7a', { b: 6 })
  R(x, INK, -4, -190, 8, 330); for (let i = 0; i < 4; i++) { R(x, INK, 18, -140 + i * 70, 22, 22); R(x, GOLD, 21, -137 + i * 70, 16, 16) }
  x.fillStyle = '#3a4a6a'; x.beginPath(); x.moveTo(-60, -190); x.lineTo(0, -110); x.lineTo(60, -190); x.closePath(); x.fill()
  x.restore()
}
function scroll(x, cx, cy, k) {
  if (k <= 0.01) return
  const h = 360 * k
  box(x, cx - 230, cy - 200, 460, h, '#fff3d6', { b: 6 })
  R(x, INK, cx - 250, cy - 214, 500, 22); R(x, '#c9a06a', cx - 246, cy - 210, 492, 14)
  R(x, INK, cx - 250, cy - 200 + h, 500, 22); R(x, '#c9a06a', cx - 246, cy - 196 + h, 492, 14)
  x.save(); x.beginPath(); x.rect(cx - 230, cy - 200, 460, h); x.clip()
  x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.font = `800 30px ${INTER}`; x.fillText('THE 10-YEAR PLAN', cx - 200, cy - 150)
  x.font = `italic 500 38px ${SERIF}`
  ;['year 1: you', 'year 5: still you', 'year 10: you, in the coat'].forEach((l, i) => x.fillText(l, cx - 200, cy - 80 + i * 66))
  x.restore()
}

const EP = makeEp({
  id: 'ngie10', series: 'gifts', sign: 'capricorn', name: 'Capricorn', boxCol: '#4a4a5e', ribbon: GOLD, finGift: coat,
  hook(x, t, S) { giftHook(x, t, S, { line: 'it’s an investment.' }) },
  hookCues: hookCuesGift,
  beats: [
    { caption: 'a wool coat that’ll last *ten winters.*',
      draw(x, t, S) { giftReveal(x, t, S, coat, { line: 'I checked the stitching.', heroMood: 'happy' }) },
      cues: [...revealCues, ['pop', 1.2, 880, 0.035, 0]] },
    { caption: 'comes with: a ten-year plan. *you’re in it.*',
      draw(x, t, S) {
        const { u, hero } = S
        scroll(x, 640, 760, ease.inOutCubic(prog(u, 0, 0.8)))
        shadow(x, 280, 1125, 210)
        hero(x, t, { x: 280, y: 1000, s: 220, mood: u > 1.0 ? 'happy' : 'neutral', look: [1, -0.5], blush: u > 1.0 ? 1 : 0, hops: [S.t0 + 1.0] })
        bubble(x, t, 640, 1090, S.t0 + 1.3, S.t1, 'it’s laminated.', { size: 34 })
      },
      cues: [['riser', 0.0, 0.8, 0.012], ['pop', 0.8, 1174.66, 0.04, 0], ['pop', 1.3, 880, 0.035, 0]] },
  ],
  last: 'Steady love is the kind that *lasts.*',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void BONE
