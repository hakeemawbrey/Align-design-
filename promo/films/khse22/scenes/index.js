// khse22: ZODIAC HOT SEAT, New Year round: Capricorn (trial reel, December flavour). Kit: ../../khse01/scenes/hotkit.js.
//   0.00  frame 0: Capricorn mid-unroll of a resolution scroll so long it rolls off the stage; the hook "Capricorn
//         wrote *47 resolutions.*" landed. 0.2 whip zoom.
//   Q1 "Which one's fun?" → "…'optimise fun.'"  Q2 "Which one's about love?" → "…none."
//   the last question (silence): "Add one?" → Capricorn writes it on the scroll: "let someone in."
//   THE STARS: "Resolution one: *let someone in.*"  Hard cut.
import { makeHotSeat, box, R, label, prog, ease, lerp, INK, BONE, RED, INTER, MONO } from '../../khse01/scenes/hotkit.js'

const LINES = ['wake 5:00', 'inbox zero', 'read 52 books', 'learn a language', 'optimise fun', 'gym 6×/week', 'save more', 'drink water']
function scroll(x, t, k, extra) {
  const u = ease.outCubic(prog(t, -0.8, 1.0))
  x.save(); x.globalAlpha = k
  // the paper: from the hands down over the seat and off the stage
  const len = lerp(300, 820, u)
  box(x, 600, 900, 220, len, '#f6ecd6', { b: 6 })
  LINES.forEach((l, i) => { if (40 + i * 52 < len - 20) label(x, `${i + 1}. ${l}`, 620, 940 + i * 52, { size: 22, col: INK, font: MONO, align: 'left' }) })
  box(x, 590, 880, 240, 30, '#c8a46a', { b: 5 })
  x.restore()
  if (extra > 0) { x.save(); x.translate(560, 1150); x.rotate(-0.04); x.scale(extra, extra); box(x, -230, -46, 460, 92, '#fff3d6', { b: 7 }); label(x, '1. let someone in', 0, 2, { size: 44, col: RED, font: INTER, weight: 800 }); x.restore() }
}

const EP = makeHotSeat({
  id: 'khse22', sign: 'capricorn', name: 'Capricorn', accent: '#8fb0d8',
  hook: 'Capricorn wrote | *47 resolutions.*',
  breakFx: 'whip', breakAt: 0.2,
  hero0: { x: 470, y: 1036, s: 290, mood: 'squint', look: [1, 0.5] },
  props(x, t, S) {
    const k = 1 - ease.inOutCubic(prog(t, ...S.T.settle))
    const extra = ease.outCubic(prog(t, S.T.fa + 0.2, S.T.fa + 1.0))
    if (k > 0.01 || extra > 0) scroll(x, t, k, extra)
  },
  qs: [
    { q: 'Which one’s *fun?*', a: '…“optimise fun.”', mood: 'squint' },
    { q: 'Which one’s about *love?*', a: '…none.', mood: 'neutral', size: 60 },
  ],
  final: { q: 'Add *one?*', a: '…okay. writing it down.', mood: 'neutral', endMood: 'happy' },
  last: 'Resolution one: *let someone in.*',
  ending: 'cut',
  music: { style: 'pop', key: 'A', seed: 3522 },
})
export const { DURATION, SCENES, CUES, T, META } = EP
void [R, BONE]
