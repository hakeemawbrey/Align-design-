// ngie08: THE SIGNS AS WINTER GIFTS, "Scorpio as a winter gift" (14 s vertical trial reel, music: cinematic · Cm).
// Story 0–11.6, then the shared end card. The format look lives in ../../npye01/scenes/kit.js.
//   0.0–2.4   hook "If *Scorpio* were a | winter gift:" — Scorpio mid-tug on the ribbon of a deep red box, eyes
//             narrowed: "open it. slowly."
//   2.4–5.2   1 "a journal with a tiny *lock.*" A dark red journal rises, a gold lock on the strap.
//   5.2       hard cut (white flash).
//   5.2–8.0   2 "comes with: the key. and *one secret.*" The key on a ribbon, and a folded note: "I really, really
//             like you."
//   8.0–11.6  THE STARS: "Trust is the gift. Open it *slowly.*"
import { makeEp, R, box, bubble, shadow, note, giftHook, giftReveal, hookCuesGift, revealCues, prog, ease, INK, BONE, GOLD } from '../../npye01/scenes/kit.js'

function journal(x, t, cx, cy, k) {
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(0.04)
  box(x, -140, -180, 280, 360, '#7a1a34', { b: 7, hi: '#9e2a4a' }); R(x, '#5a1026', -140, -180, 26, 360)
  R(x, INK, 100, -30, 60, 60); R(x, '#5a3a22', 104, -26, 52, 52)
  box(x, 118, -24, 44, 48, GOLD, { b: 5 }); R(x, INK, 136, -8, 8, 18)
  x.restore()
}
function key(x, t, cx, cy, k) {
  x.save(); x.translate(cx, cy + Math.sin(t * 3) * 8); x.scale(k, k); x.rotate(-0.4)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 36, 0, Math.PI * 2); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 28, 0, Math.PI * 2); x.fill(); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 12, 0, Math.PI * 2); x.fill()
  box(x, 30, -8, 110, 16, GOLD, { b: 5 }); box(x, 110, 8, 14, 20, GOLD, { b: 4 }); box(x, 130, 8, 10, 14, GOLD, { b: 4 })
  x.restore()
}

const EP = makeEp({
  id: 'ngie08', series: 'gifts', sign: 'scorpio', name: 'Scorpio', boxCol: '#9e1f3c', ribbon: BONE, finGift: journal,
  hook(x, t, S) { giftHook(x, t, S, { line: 'open it. slowly.' }) },
  hookCues: hookCuesGift,
  beats: [
    { caption: 'a journal with a tiny *lock.*',
      draw(x, t, S) { giftReveal(x, t, S, journal, { line: 'for the deep stuff.', heroMood: 'squint' }) },
      cues: [...revealCues, ['tick', 1.0, 0.06], ['pop', 1.2, 739.99, 0.035, 0]] },
    { caption: 'comes with: the key. and *one secret.*',
      draw(x, t, S) {
        const { u, hero } = S
        key(x, t, 520, 640, ease.outCubic(prog(u, 0, 0.35)))
        note(x, 720, 900, ['secret:', 'I really, really', 'like you.'], { k: ease.outCubic(prog(u, 0.5, 0.9)), rot: 0.05, size: 42, w: 420 })
        shadow(x, 280, 1125, 210)
        hero(x, t, { x: 280, y: 990, s: 220, mood: u > 1.0 ? 'happy' : 'neutral', look: [1, 0], blush: u > 1.0 ? 1 : 0, hops: [S.t0 + 1.0] })
        bubble(x, t, 300, 760, S.t0 + 1.3, S.t1, 'don’t make it weird.', { size: 30 })
      },
      cues: [['bell', 0.2, 1760, 0.025, 1.2, 0], ['whoosh', 0.5, 0.3, 0.02], ['pop', 0.9, 1174.66, 0.04, 0], ['pop', 1.3, 739.99, 0.035, 0]] },
  ],
  last: 'Trust is the gift. Open it *slowly.*',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
