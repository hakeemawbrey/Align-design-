// klne08: LONG DISTANCE NOTES, "Two Clocks" (22 s vertical, star_advice post, dreamy · G). Loops.
// Kit: ../../klne01/ldnkit.js. Atlanta (EST, UTC−5) ↔ Nairobi (EAT, UTC+3): Nairobi is 8 hours ahead.
//   0.0  frame 0: Atlanta 7 PM, ♌ Leo mid-send of a long text; Nairobi 3 AM, ♏ Scorpio jolted awake by the buzz.
//        "You texted at *3 a.m.* | their time."
//   3.2  Scorpio (squinting): "…it’s 3 a.m." · Leo: "oops. I forgot the hours."
//   8.3  THE STARS: "hang a second clock in *their* time. then you just know." → 10.0 Leo hangs a NAIROBI clock next
//        to its own · 12.0 the clocks jump 4 hours: Atlanta 11 PM, Nairobi 7 AM · 12.8 Leo checks the clock, sends
//        "good morning!" · 14.0 Scorpio wakes to it and smiles · Pisces (Leo's roommate) cries at the clock.
//  18.7  "One clock for you, | *one* for them." → loops.
import { makeLDN, phone, card, fly, R, label, bubble, hearts, wallClock, pop01 } from '../../klne01/ldnkit.js'

const T = { s1: 3.2, l1: 4.8, line: 8.3, hang: 10.0, jump: 12.0, check: 12.6, send: 13.0, got: 14.0, cry: 13.4, last: 18.7 }
const EP = makeLDN({
  id: 'klne08', len: 22, ending: 'loop', music: { style: 'dreamy', key: 'G', seed: 2328 },
  hook: 'You texted at *3 a.m.* | their time.',
  L: { sign: 'leo', city: 'Atlanta', min0: 19 * 60 },
  R: { sign: 'scorpio', city: 'Nairobi', offset: 480 },
  jumps: [[T.jump, 240]],
  sets: [[0, 'room', 'room', { bedR: true, bedColR: '#7a3a6a' }]],
  badgeAt: 0.6, gap: '8 HOURS APART', gapAt: 1.0, gapOut: [3.0, 3.2],
  lines: [{ t: T.line, text: 'hang a second clock in *their* time. then you just know.' }],
  boxes: [{ from: 0, to: 1, close: 11.6 }],
  pose(t, side, S) {
    if (side === 'L') return { x: 250, y: 1150, s: 250, mood: t < T.l1 ? 'happy' : t < T.line ? 'wide' : t < T.check ? 'sparkle' : 'happy', look: t > T.hang && t < T.send ? [-0.2, -1] : [1, 0], hops: [0, T.l1, T.hang, T.send],
      prop: (x, F) => { if (t < 1 || t > T.check) phone(x, F.ox + 140, F.oy - F.base - 30, { s: 0.55, rot: 0.15, glow: 1, lines: t < 1 ? ['ok so LONG story', 'ok', 'anyway'] : ['good morning!'] }) } }
    const awake = t < T.line || t > T.got
    return { x: 830, y: 1140, s: 240, mood: t < 0.8 ? 'wide' : t < T.line ? 'squint' : t < T.got ? 'sleepy' : t < T.got + 0.5 ? 'neutral' : 'happy', look: awake ? [-1, 0] : [0, 0], hops: [0, T.s1, T.got], squash: t < 0.5 ? -0.14 : 0,
      prop: (x, F) => { if (t < T.line || t > T.got) phone(x, F.ox - 140, F.oy - F.base - 30, { s: 0.5, rot: -0.15, glow: 1, lines: t < T.line ? ['3 new messages'] : ['good morning!'] }) } }
  },
  pis: { side: 'L', x: 460, y: 1240, s: 115, look: [-0.6, -1], tears: t => (t > T.cry ? 3 : 2), mood: t => (t > T.cry ? 'happy' : 'wide'), hops: [T.cry] },
  draw(x, t, S) {
    if (t < 0.9) label(x, 'BZZT!', 850, 860, { size: 54, col: '#ff6b81', font: 'Inter', weight: 800, rot: 0.1 })
    bubble(x, t, 830, 800, T.s1, T.line - 0.2, '…it’s 3 a.m.', { size: 32 })
    bubble(x, t, 260, 780, T.l1, T.line - 0.2, ['oops. I forgot', 'the hours.'], { size: 30, col: '#d9d4ea' })
    // the two wall clocks (Atlanta's, and Nairobi's from T.hang)
    x.save(); x.beginPath(); x.rect(0, 0, 540, 1920); x.clip()
    wallClock(x, 140, 600, S.minL, 'ATLANTA', 1)
    wallClock(x, 400, 600, S.minR, 'NAIROBI', pop01(t, T.hang, 0.4, 2.2))
    x.restore()
    fly(x, t, T.send, T.got, 330, 980, 760, 980, (x2, px, py) => card(x2, px, py, 240, 80, '#ffffff', { text: 'good morning!', size: 28 }), 200)
    hearts(x, t, T.got + 0.4, 830, 960, { n: 6 })
  },
  last: { t: T.last, text: 'One clock for you, | *one* for them.', size: 88 },
  sections: { drop: 0.6, breakdown: [T.line], lift: [T.jump], outroAt: T.last + 0.5 },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = [...EP.CUES, ['pop', 0.05, 220, 0.06, 0.3], ['pop', 0.15, 220, 0.05, 0.3], ['tick', T.hang, 0.07], ['tick', T.hang + 0.1, 0.05], ['pop', T.hang + 0.2, 1174.66, 0.05, -0.3], ['whoosh', T.send, 0.5, 0.05], ['pop', T.got, 1318.51, 0.05, 0.3], ['pluck', T.cry, 659.25, 0.035, 0.5, -0.3], ['pluck', T.cry + 0.14, 587.33, 0.035, 0.5, -0.3]]
export const MUSIC = EP.music
