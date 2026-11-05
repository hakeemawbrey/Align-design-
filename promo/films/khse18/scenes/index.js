// khse18: ZODIAC HOT SEAT, crush round: Virgo (trial reel). Kit: ../../khse01/scenes/hotkit.js.
//   0.00  frame 0: Virgo mid-hide behind a clipboard, cheeks pink, a name scribbled out on the page; the hook
//         "Virgo has *a crush.* Denies it." landed. 0.2 whip zoom.
//   Q1 "Crush?" → "no." (caught in 4K: the clipboard is covered in hearts)  Q2 "Pros and cons list?" → "…two pages."
//   the last question (silence): "Will you tell them?" → "…the pros won."
//   THE STARS: "Some lists just say *“say hello.”*"  Hard cut.
import { makeHotSeat, HK, box, R, drawBits, HEART, prog, ease, lerp, INK, BONE, RED, PINK } from '../../khse01/scenes/hotkit.js'

function clipboard(x, t, cx, cy, rot, hearts) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  box(x, -110, -140, 220, 280, '#c8a46a', { b: 7 }); box(x, -92, -118, 184, 240, BONE, { b: 0 })
  box(x, -40, -156, 80, 30, '#8c86a8', { b: 5 })
  for (let i = 0; i < 6; i++) R(x, 'rgba(27,18,54,0.4)', -76, -92 + i * 34, 140 - (i % 3) * 20, 8)
  // the scribbled-out name
  x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); for (let i = 0; i < 7; i++) { x.lineTo(-70 + i * 22, -96 + (i % 2) * 18) } x.stroke()
  if (hearts > 0) for (let i = 0; i < 8; i++) drawBits(x, HEART, { H: i % 2 ? PINK : RED }, -60 + (i % 3) * 60, -40 + Math.floor(i / 3) * 56, 5 * hearts)
  x.restore()
}
const CAUGHT = { at: 2.3, x: 700, y: 1000, r: 175, out: [2.95, 3.0], label: 'ALL HEARTS', arrow: 'tl' }

const EP = makeHotSeat({
  id: 'khse18', sign: 'virgo', name: 'Virgo', accent: '#b9a6ff',
  hook: 'Virgo has *a crush.* | Denies it.',
  breakFx: 'whip', breakAt: 0.2,
  fx: [[HK.caught, HK.caughtCues, CAUGHT]],
  hero0: { x: 540, y: 1036, s: 290, mood: 'wide', look: [1, 0.5] },
  blush: t => 1,
  props(x, t, S) {
    const k = 1 - ease.inOutCubic(prog(t, ...S.T.settle))
    const h = ease.outCubic(prog(t, S.T.qs[0] + 0.7, S.T.qs[0] + 1.0))
    clipboard(x, t, lerp(700, 660, k), lerp(1060, 1050, k), lerp(0.25, 0.04, k), h)
  },
  qs: [
    { q: '*Crush?*', a: 'no.', mood: 'neutral', size: 62 },
    { q: 'Pros and cons *list?*', a: '…two pages.', mood: 'squint' },
  ],
  final: { q: 'Will you *tell them?*', a: '…the pros won.', mood: 'happy', endMood: 'heart' },
  last: 'Some lists just say *“say hello.”*',
  ending: 'cut',
  music: { style: 'dreamy', key: 'Db', seed: 3518 },
})
export const { DURATION, SCENES, CUES, T, META } = EP
void INK
