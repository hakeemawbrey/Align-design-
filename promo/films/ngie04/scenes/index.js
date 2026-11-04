// ngie04: THE SIGNS AS WINTER GIFTS, "Cancer as a winter gift" (16 s vertical trial reel, music: dreamy · Ab).
// Story 0–11.6, then the shared end card. The format look lives in ../../npye01/scenes/kit.js.
//   0.0–2.4   hook "If *Cancer* were a | winter gift:" — Cancer mid-tug on the ribbon of a silver box: "careful, it's
//             precious."
//   2.4–5.2   1 "a photo album of *your* whole year." The album rises, photo corners peeking out.
//   5.2       card cut.
//   5.2–8.0   2 "comes with: a *handwritten* note per page." The album opens: little photos, little notes
//             ("the day you laughed so hard", "first snow!").
//   8.0–11.6  THE STARS: "Remembering together is a *gift.*"
import { makeEp, R, box, bubble, shadow, drawBits, HEART, giftHook, giftReveal, hookCuesGift, revealCues, prog, ease, INK, BONE, GOLD, SERIF } from '../../npye01/scenes/kit.js'

function photo(x, X, Y, w, h, col, rot) { x.save(); x.translate(X, Y); x.rotate(rot); box(x, -w / 2, -h / 2, w, h, '#ffffff', { b: 4 }); R(x, col, -w / 2 + 10, -h / 2 + 10, w - 20, h - 34); drawBits(x, ['..Y..', '.YYY.', 'YYYYY', '.Y.Y.'], { Y: GOLD }, 0, -8, 5); x.restore() }
function album(x, t, cx, cy, k, open = false) {
  x.save(); x.translate(cx, cy); x.scale(k, k)
  if (!open) {
    box(x, -150, -120, 300, 240, '#8a3a5a', { b: 7, hi: '#a64a70' }); box(x, -90, -50, 180, 100, BONE, { b: 4 })
    x.fillStyle = INK; x.font = `italic 500 40px ${SERIF}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('our year', 0, 0)
  } else {
    box(x, -320, -170, 640, 340, '#fffaf0', { b: 7 }); R(x, INK, -4, -170, 8, 340)
    photo(x, -170, -60, 200, 170, '#7fd0ff', -0.06); photo(x, 170, -60, 200, 170, '#ffb0c8', 0.05)
    x.fillStyle = '#7a2a5a'; x.font = `italic 500 30px ${SERIF}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText('you laughed so hard', -160, 80); x.fillText('here!', -160, 116); x.fillText('first snow!', 170, 90)
    drawBits(x, HEART, { H: '#ff5c8a' }, 270, 130, 5)
  }
  x.restore()
}

const EP = makeEp({
  id: 'ngie04', series: 'gifts', sign: 'cancer', name: 'Cancer', boxCol: '#b9c3d6', ribbon: '#e8344e', finGift: (x2, t2, cx, cy, k) => album(x2, t2, cx, cy, k),
  hook(x, t, S) { giftHook(x, t, S, { line: 'careful, it’s precious.' }) },
  hookCues: hookCuesGift,
  beats: [
    { caption: 'a photo album of *your* whole year.',
      draw(x, t, S) { giftReveal(x, t, S, (x2, t2, cx, cy, k) => album(x2, t2, cx, cy, k), { line: 'I kept every photo.', heroMood: 'sparkle' }) },
      cues: [...revealCues, ['pop', 1.2, 880, 0.035, 0]] },
    { caption: 'comes with: a *handwritten* note per page.',
      draw(x, t, S) {
        const { u, hero } = S
        album(x, t, 600, 760, ease.outCubic(prog(u, 0, 0.4)), true)
        shadow(x, 280, 1125, 220)
        hero(x, t, { x: 280, y: 1010, s: 210, mood: u > 0.8 ? 'heart' : 'happy', look: [1, -1], hops: [S.t0 + 0.8] })
        bubble(x, t, 640, 1010, S.t0 + 1.2, S.t1, 'there are 52 pages.', { size: 32 })
      },
      cues: [['whoosh', 0.0, 0.3, 0.02], ['pop', 0.4, 1174.66, 0.04, 0], ['pop', 1.2, 880, 0.035, 0]] },
  ],
  last: 'Remembering together is a *gift.*',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
