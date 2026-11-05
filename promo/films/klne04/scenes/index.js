// klne04: LONG DISTANCE NOTES, "Page Forty-One" (22 s vertical, star_advice post, dreamy · E). Loops.
// Kit: ../../klne01/ldnkit.js. Berlin (CET, UTC+1) ↔ Seoul (KST, UTC+9): Seoul is 8 hours ahead.
// ♓ Pisces is half of this couple, so Pisces cries on its own side the whole film (harder at the payoff).
//   0.0  frame 0: Berlin 1 PM, ♓ Pisces mid-sob over an open book; Seoul 9 PM, ♍ Virgo reading in bed.
//        "Different time zones. | *Same* page."
//   3.2  Virgo: "this chapter!! I need to talk about it." · Pisces: "what is Virgo reading right now?"
//   8.3  THE STARS: "read the same *chapter.* send each other one line." → both on PAGE 41 · 11.8 Virgo's line flies
//        over: "stay a little longer." · 13.8 Pisces sends back "SAME LINE!!" · Virgo melts, Pisces fountains.
//  18.7  "Page forty-one, | *together.*" → loops.
import { makeLDN, card, fly, R, box, label, bubble, hearts, sparkles, GOLD, INK, INTER, pop01 } from '../../klne01/ldnkit.js'

const T = { v1: 3.2, p1: 5.0, line: 8.3, open: 10.1, ul: 11.2, send: 11.8, got: 12.8, send2: 13.8, got2: 14.8, last: 18.7 }
function book(x, cx, cy, k, t, ul) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -170, -110, 170, 220, '#f4ecd8', { b: 6 }); box(x, 0, -110, 170, 220, '#f4ecd8', { b: 6 })
  for (let i = 0; i < 6; i++) { R(x, '#b8a888', -150, -80 + i * 28, 130, 6); R(x, '#b8a888', 20, -80 + i * 28, 130, 6) }
  if (ul > 0) R(x, '#e8344e', 20, -80 + 3 * 28 + 8, 130 * ul, 5)
  label(x, '41', 120, 96, { size: 24, col: INK, font: INTER, weight: 800 })
  x.restore()
}
const lineCard = txt => (x, px, py) => card(x, px, py, 280, 110, '#fff8e0', { text: txt, size: 26, rot: -0.05 })
const EP = makeLDN({
  id: 'klne04', len: 22, ending: 'loop', music: { style: 'dreamy', key: 'E', seed: 2324 },
  hook: 'Different time zones. | *Same* page.',
  L: { sign: 'pisces', city: 'Berlin', min0: 13 * 60 },
  R: { sign: 'virgo', city: 'Seoul', offset: 480 },
  sets: [[0, 'room', 'room', { bedR: true, bedColR: '#7a9ad8' }]],
  badgeAt: 0.6, gap: '8 HOURS APART', gapAt: 1.0, gapOut: [3.0, 3.2],
  lines: [{ t: T.line, text: 'read the same *chapter.* send each other one line.' }],
  boxes: [{ from: 0, to: 1, close: 11.6 }],
  pose(t, side) {
    if (side === 'L') return { x: 250, y: 1150, s: 250, mood: t < T.got ? 'wide' : t < T.got2 ? 'sparkle' : 'happy', look: t < T.open ? [0, 1] : [1, 0.3], tears: t < 1 || t > T.got ? 3 : 2, hops: [T.p1, T.got, T.send2, T.got2 + 0.3] }
    return { x: 820, y: 1135, s: 240, mood: t < T.v1 ? 'neutral' : t < T.line ? 'sparkle' : t < T.got2 ? 'happy' : 'heart', look: t < T.v1 ? [0, 1] : [-1, 0.3], hops: [T.v1, T.ul, T.got2] }
  },
  draw(x, t) {
    book(x, 250, 1300, t < 0.01 ? 1 : 1, t, t > T.send2 - 0.6 ? Math.min(1, (t - T.send2 + 0.6) / 0.4) : 0)
    book(x, 820, 1300, 1, t, t > T.ul ? Math.min(1, (t - T.ul) / 0.4) : 0)
    bubble(x, t, 800, 820, T.v1, T.line - 0.2, ['this chapter!!', 'I need to talk about it.'], { size: 30, tail: 0 })
    bubble(x, t, 270, 820, T.p1, T.line - 0.2, ['what are they', 'reading right now?'], { size: 30, tail: 0 })
    if (t > T.open && t < T.last) { const k = pop01(t, T.open, 0.3, 2.4); label(x, 'PAGE 41', 270, 1460, { size: 40 * k, col: GOLD, font: INTER, weight: 800 }); label(x, 'PAGE 41', 810, 1460, { size: 40 * k, col: GOLD, font: INTER, weight: 800 }) }
    fly(x, t, T.send, T.got, 800, 900, 270, 880, lineCard('“stay a little longer.”'), 240)
    if (t > T.got && t < T.send2) lineCard('“stay a little longer.”')(x, 270, 880)
    fly(x, t, T.send2, T.got2, 270, 880, 810, 880, lineCard('SAME LINE!!'), 220)
    if (t > T.got2) lineCard('SAME LINE!!')(x, 810, 880)
    hearts(x, t, T.got2, 820, 980, { n: 7 }); sparkles(x, t, 810, 880, T.got2, 10, 140, 2)
  },
  last: { t: T.last, text: 'Page forty-one, | *together.*', size: 92 },
  sections: { drop: 0.6, breakdown: [T.line], lift: [T.send], outroAt: T.last + 0.5 },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = [...EP.CUES, ['tick', T.open, 0.05], ['tick', T.open + 0.1, 0.04], ['pluck', T.ul, 1318.51, 0.04, 0.4, 0.3], ['whoosh', T.send, 0.5, 0.05], ['pop', T.got, 1174.66, 0.05, -0.3], ['whoosh', T.send2, 0.5, 0.05], ['pop', T.got2, 1567.98, 0.05, 0.3], ['glitter', T.got2, T.got2 + 0.5]]
export const MUSIC = EP.music
