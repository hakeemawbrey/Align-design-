// ngie03: THE SIGNS AS WINTER GIFTS, "Gemini as a winter gift" (16 s vertical trial reel, music: chiptune · G).
// Story 0–11.6, then the shared end card. The format look lives in ../../npye01/scenes/kit.js.
//   0.0–2.4   hook "If *Gemini* were a | winter gift:" — Gemini mid-tug on the ribbon of a yellow box: "okay so,
//             funny story about this gift…"
//   2.4–5.2   1 "a puzzle book, *half* filled in." The book rises; half the grid is done in pencil.
//   5.2       card cut.
//   5.2–8.0   2 "comes with: notes in the margins *for you.*" The book opens: "you'd LOVE this one" with a heart;
//             "ask me about #7!"
//   8.0–11.6  THE STARS: "The best gifts start a *conversation.*"
import { makeEp, R, box, bubble, shadow, drawBits, HEART, giftHook, giftReveal, hookCuesGift, revealCues, prog, ease, INK, BONE, SERIF } from '../../npye01/scenes/kit.js'

function book(x, t, cx, cy, k, open = false) {
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(open ? 0 : -0.05)
  if (!open) {
    box(x, -130, -170, 260, 340, '#38c4ec', { b: 7 }); R(x, '#2a9dbf', -130, -170, 24, 340)
    for (let j = 0; j < 4; j++) for (let i = 0; i < 4; i++) { box(x, -70 + i * 40, -90 + j * 40, 32, 32, '#fffaf0', { b: 3 }); if ((i + j * 4) % 2 === 0) R(x, '#6a6488', -62 + i * 40, -82 + j * 40, 16, 16) }
  } else {
    box(x, -300, -170, 600, 340, '#fffaf0', { b: 7 }); R(x, INK, -4, -170, 8, 340)
    for (let j = 0; j < 5; j++) for (let i = 0; i < 5; i++) { box(x, -270 + i * 42, -130 + j * 42, 34, 34, '#ffffff', { b: 3 }); if ((i * 3 + j) % 3 === 0) R(x, '#6a6488', -262 + i * 42, -122 + j * 42, 18, 18) }
    x.fillStyle = '#c0344e'; x.font = `italic 500 34px ${SERIF}`; x.textAlign = 'left'; x.textBaseline = 'middle'
    x.fillText('you’d LOVE', 40, -110); x.fillText('this one', 40, -70); x.fillText('ask me', 40, 30); x.fillText('about #7!', 40, 70)
    drawBits(x, HEART, { H: '#ff5c8a' }, 230, -90, 6)
  }
  x.restore()
}

const EP = makeEp({
  id: 'ngie03', series: 'gifts', sign: 'gemini', name: 'Gemini', boxCol: '#f2cf4a', ribbon: '#38c4ec', finGift: (x2, t2, cx, cy, k) => book(x2, t2, cx, cy, k),
  hook(x, t, S) { giftHook(x, t, S, { line: 'okay so, funny story…' }) },
  hookCues: hookCuesGift,
  beats: [
    { caption: 'a puzzle book, *half* filled in.',
      draw(x, t, S) { giftReveal(x, t, S, (x2, t2, cx, cy, k) => book(x2, t2, cx, cy, k), { line: 'I got bored. sorry!', heroMood: 'happy' }) },
      cues: [...revealCues, ['pop', 1.2, 987.77, 0.035, 0]] },
    { caption: 'comes with: notes in the margins *for you.*',
      draw(x, t, S) {
        const { u, hero } = S
        book(x, t, 600, 760, ease.outCubic(prog(u, 0, 0.4)), true)
        shadow(x, 300, 1125, 220)
        hero(x, t, { x: 300, y: 1000, s: 220, mood: u > 0.8 ? 'sparkle' : 'happy', look: [1, -1], hops: [S.t0 + 0.8, S.t0 + 1.5] })
        bubble(x, t, 640, 1010, S.t0 + 1.2, S.t1, 'call me when you hit #7.', { size: 32 })
      },
      cues: [['whoosh', 0.0, 0.3, 0.02], ['pop', 0.4, 1318.51, 0.04, 0], ['pop', 1.2, 987.77, 0.035, 0]] },
  ],
  last: 'The best gifts start a *conversation.*',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void BONE
