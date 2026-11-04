// nf16e22: MEET THE FAMILY, "The Drive Home" (40 s vertical, star_advice post, music: synthwave · F#m).
// Story 0–35.6, then the shared end card. Series look: ../../nf16e13/famkit.js.
//   0.0–5.0    HOOK "So… what did you | think of my *family?*"  Night road. ♑ Capricorn grips the wheel; ♌ Leo mid-turn in the
//              passenger seat; cousin ♓ Pisces dozing in the back. LEO: "so… what did you *think?*"
//   5.0–10.6   "Capricorn's brain: | *a whole list.*"  A clipboard list unrolls over the windshield… THE STARS: "wait. *start kind.*"
//   10.6       card cut → NOTES: start with three good things · then one honest thing, gently · their family, their call.
//   19.2–27.6  "Three good | *things…*"  CAPRICORN: "your dad's laugh. the card game." "and that *pie.*"
//              "the 9 pm dinner was *hard for me.*"
//   27.6–35.6  "…then | *the truth.*"  LEO: "noted. we eat *early* next time." Pisces sobs happily in the back.
//              THE STARS: "Kind first. *Honest always.*"
import { makeFamily, bubble, mark, hearts, sparkles, label, R, box, prog, clamp, ease, lerp, BONE, GOLD, PINK, INK, MONO } from '../../nf16e13/famkit.js'

function list(x, t, cx, top, k, u) {
  if (k <= 0.01) return
  const rows = ['1. dinner at 9 PM', '2. SO many questions', '3. the quiz on my job', '4. the loud game', '5. …']
  const n = Math.min(rows.length, Math.floor(u * 1.4) + 1), h = 70 + n * 52
  x.save(); x.translate(cx, top); x.scale(k, k)
  box(x, -230, 0, 460, h, '#fffaf0', { b: 6 })
  box(x, -60, -16, 120, 30, '#8c86a8', { b: 5 })
  x.font = `700 30px ${MONO}`; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'
  rows.slice(0, n).forEach((r, i) => x.fillText(r, -200, 50 + i * 52))
  x.restore()
}
const CAR = { snow: true, clock: '10:42' }
function seats(x, t, S, { you = {}, them = {}, pis = {} } = {}) {
  S.pisces(x, t, { x: 540, y: 1000, s: 130, mood: 'sleepy', tears: 1, look: [0, 0], ...pis })
  S.cast(x, t, 'you', { x: 320, y: 1030, s: 210, mood: 'neutral', look: [0, -1], ...you })
  S.cast(x, t, 'them', { x: 760, y: 1040, s: 220, mood: 'happy', look: [-1, 0], ...them })
}
const EP = makeFamily({
  id: 'nf16e22', key: 'F#m',
  cast: {
    you: { sign: 'capricorn', role: 'CAPRICORN', acc: { scarf: '#c9a6ff' }, text: '#e0d8ff' },
    them: { sign: 'leo', role: 'LEO', acc: { beanie: '#e8344e' }, text: '#ffe0b0' },
  },
  beats: [
    { len: 5.0, room: 'car', roomOpts: CAR, head: 'So… what did you | think of my *family?*', pis: false,
      lines: [{ u: 0.6, who: 'them', text: 'so… what did you *think?*' }],
      draw(x, t, S) {
        const u = S.u
        seats(x, t, S, { you: { mood: u > 2.0 ? 'wide' : 'neutral', squash: 0.04 }, them: { mood: 'sparkle', hops: [S.t0 - 0.1, S.t0 + 0.6], squash: -0.05 } })
        mark(x, t, 320, 830, S.t0 + 2.0, S.t0 + 4.9, '!', GOLD)
      } },
    { len: 5.6, room: 'car', roomOpts: CAR, head: 'Capricorn’s brain: | *a whole list.*', pis: false,
      lines: [{ u: 3.7, who: 'stars', text: 'wait. *start kind.*' }],
      draw(x, t, S) {
        const u = S.u
        seats(x, t, S, { you: { mood: u > 3.6 ? 'wide' : 'squint', look: [0, -1] }, them: { mood: 'happy', look: [-1, 0] } })
        const k = ease.outBack(prog(u, 0.3, 0.7)) * (1 - ease.inCubic(prog(u, 3.6, 4.0)))
        list(x, t, 540, 470, k, u)
        for (const [ox, oy, r] of [[-140, 860, 12], [-190, 920, 8]]) { if (k > 0.5) { R(x, INK, 540 + ox - r - 4, oy - r - 4, 2 * r + 8, 2 * r + 8); R(x, BONE, 540 + ox - r, oy - r, 2 * r, 2 * r) } }
      },
      cues: [['whoosh', 0.3, 0.3, 0.035], ['tick', 1.0, 0.04], ['tick', 1.7, 0.04], ['tick', 2.4, 0.04], ['tick', 3.1, 0.04], ['whoosh', 3.6, 0.3, 0.03]] },
    { len: 8.6, kind: 'notes', pis: { x: 950, y: 1785, s: 135, mood: 'sleepy' },
      tips: ['Start with *three good things.*', 'Then one honest thing, *gently.*', 'Their family, *their call.*'],
      draw(x, t, S) {
        S.cast(x, t, 'you', { x: 560, y: 1150, s: 170, mood: 'happy', look: [1, 0], hops: [S.t0 + 0.9] })
        S.cast(x, t, 'them', { x: 800, y: 1150, s: 170, mood: 'happy', look: [-1, 0], hops: [S.t0 + 3.2] })
      } },
    { len: 8.4, room: 'car', roomOpts: CAR, head: 'Three good | *things…*', pis: false,
      lines: [{ u: 0.3, who: 'you', text: 'your dad’s laugh. the card game.' }, { u: 2.4, who: 'you', text: 'and that *pie.*' }, { u: 4.4, who: 'you', text: 'the 9 pm dinner was *hard for me.*' }],
      draw(x, t, S) {
        const u = S.u
        seats(x, t, S, { you: { mood: u < 4.3 ? 'happy' : 'neutral', look: [1, 0] }, them: { mood: u < 4.3 ? 'heart' : 'neutral', look: [-1, 0], hops: [S.t0 + 0.6, S.t0 + 1.5, S.t0 + 2.6] }, pis: { mood: 'sleepy' } })
        const goods = [[0.3, '♥'], [1.5, '♥'], [2.6, '♥']]
        goods.forEach(([a], i) => { const k = ease.outBack(prog(u, a + 0.4, a + 0.7)); if (k > 0.01) { box(x, 420 + i * 90, 520, 70, 70, GOLD, { b: 5 }); label(x, String(i + 1), 455 + i * 90, 556, { size: 40, col: INK, font: "Inter, sans-serif", weight: 800 }) } })
        hearts(x, t, S.t0 + 2.6, 760, 930, { n: 4 })
      },
      cues: [['pop', 0.7, 987.77, 0.04, 0], ['pop', 1.9, 1174.66, 0.04, 0], ['pop', 3.0, 1318.51, 0.045, 0]] },
    { len: 8.0, room: 'car', roomOpts: CAR, head: '…then | *the truth.*', pis: false,
      lines: [{ u: 0.3, who: 'them', text: 'noted. we eat *early* next time.' }],
      lastU: 3.0, last: 'Kind first. *Honest always.*',
      draw(x, t, S) {
        const u = S.u, ok = S.out
        seats(x, t, S, { you: { mood: u > 1.2 ? 'heart' : 'happy', look: [1, 0], pop: ok, hops: [S.t0 + 1.2] }, them: { mood: 'happy', look: [-1, 0], pop: ok, hops: [S.t0 + 0.3] }, pis: { mood: 'happy', tears: 3, pop: ok, look: [0, 0] } })
        hearts(x, t, S.t0 + 1.2, 540, 900, { n: 6 })
        sparkles(x, t, 540, 880, S.t0 + 1.2, 10, 200, 2, [GOLD, PINK, BONE])
      },
      cues: [['pluck', 1.2, 1174.66, 0.04, 0.5, 0], ['glitter', 1.2, 1.7]] },
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [bubble, clamp, lerp]
