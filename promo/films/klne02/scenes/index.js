// klne02: LONG DISTANCE NOTES, "Same Moon Tonight" (22 s vertical, star_advice post, lofi · Gm). Loops.
// Kit: ../../klne01/ldnkit.js. No end card, no card cut. Cape Town (SAST, UTC+2) ↔ Sydney (AEDT in summer, UTC+11):
// Sydney is 9 hours ahead in November–December. Real astronomy: the Moon shows the same phase to everyone on Earth.
//   0.0  frame 0: Cape Town 9 PM, ♒ Aquarius mid-jump pointing at the moon; Sydney 6 AM, ♌ Leo mid-yawn at sunrise.
//        "Nine hours apart. | *Same* moon."   0.55 whip, clocks · 1.0 "9 HOURS APART"
//   3.2  "wish you could see this." / Leo: "*yawn* morning already?"
//   8.3  THE STARS: "send them your *sky.* one photo, every night." → 10.4 the moon photo flies over · 12.6 a sunrise comes back
//  13.9  THE STARS: "the moon’s *phase* is the same for both of you."  Pisces (the friend) sobs at the photo.
//  18.7  "Nine hours apart, | *one* moon."  → loops to frame 0.
import { makeLDN, phone, card, fly, R, label, bubble, hearts, sparkles, GOLD, INK } from '../../klne01/ldnkit.js'

const T = { wish: 3.2, yawn: 4.6, line: 8.3, snap: 10.1, send: 10.5, got: 11.6, back: 12.6, home: 13.6, line2: 13.9, cry: 14.4, last: 18.7 }
const moonPhoto = (x, px, py) => { card(x, px, py, 190, 160, '#0e1430', { rot: -0.08 }); x.fillStyle = '#f7e7b0'; x.beginPath(); x.arc(px, py - 6, 40, 0, 7); x.fill(); x.fillStyle = '#0e1430'; x.beginPath(); x.arc(px + 16, py - 14, 34, 0, 7); x.fill() }
const sunPhoto = (x, px, py) => { card(x, px, py, 190, 160, '#ff9a6a', { rot: 0.08 }); x.fillStyle = '#ffe58a'; x.beginPath(); x.arc(px, py + 20, 40, 0, 7); x.fill(); R(x, '#5a4a9a', px - 89, py + 30, 178, 40) }
const EP = makeLDN({
  id: 'klne02', len: 22, ending: 'loop', music: { style: 'lofi', key: 'Gm', seed: 2322 },
  hook: 'Nine hours apart. | *Same* moon.',
  L: { sign: 'aquarius', city: 'Cape Town', min0: 21 * 60 },
  R: { sign: 'leo', city: 'Sydney', offset: 540 },
  sets: [[0, 'street', 'room', { bedR: true, bedColR: '#f2a03a' }]],
  badgeAt: 0.6, gap: '9 HOURS APART', gapAt: 1.0, gapOut: [3.0, 3.2],
  lines: [{ t: T.line, text: 'send them your *sky.* one photo, every night.' }, { t: T.line2, text: 'the moon’s *phase* is the same for both of you.' }],
  pose(t, side) {
    if (side === 'L') return { x: 250, y: 1130, s: 250, mood: t < 0.6 ? 'wide' : t < T.line ? 'sparkle' : t > T.back + 1 ? 'heart' : 'happy', look: t < T.back ? [0.6, -1] : [1, 0], hops: [0, T.wish, T.snap, T.home + 0.05], squash: t < 0.4 ? -0.14 : 0,
      prop: (x, F) => { if (t > T.snap - 0.4 && t < T.send + 0.2) phone(x, F.ox + 120, F.oy - F.base - 140, { s: 0.5, rot: 0.2, glow: 1 }) } }
    return { x: 820, y: 1135, s: 240, mood: t < 0.8 ? 'sleepy' : t < T.got ? 'neutral' : t < T.back ? 'heart' : 'happy', look: t < T.got ? [0, 0] : [-1, 0], hops: [T.yawn, T.got, T.back] }
  },
  pis: { side: 'L', x: 450, y: 1230, s: 120, look: [-1, -0.6], tears: t => (t > T.cry ? 3 : 2), mood: t => (t > T.cry ? 'happy' : 'sparkle'), hops: [T.cry] },
  draw(x, t) {
    // frame 0: Aquarius points straight up at the moon
    if (t < 1.2) label(x, '↑', 330, 820, { size: 90, col: GOLD, alpha: 1 - Math.max(0, t - 0.8) / 0.4 })
    bubble(x, t, 280, 790, T.wish, T.line - 0.2, 'wish you could see this.', { size: 32, tail: -0.2 })
    bubble(x, t, 800, 820, T.yawn, T.line - 0.2, '*yawn* morning already?', { size: 30, tail: 0.1 })
    if (t > T.snap && t < T.snap + 0.25) { x.save(); x.globalAlpha = 1 - (t - T.snap) / 0.25; R(x, '#ffffff', 0, 0, 540, 1920); x.restore() }
    fly(x, t, T.send, T.got, 330, 900, 800, 880, moonPhoto, 260)
    if (t > T.got && t < T.back) moonPhoto(x, 800, 880)
    fly(x, t, T.back, T.home, 800, 880, 280, 860, sunPhoto, 240)
    if (t > T.home) { moonPhoto(x, 800, 880); sunPhoto(x, 280, 860) }
    hearts(x, t, T.got, 820, 960, { n: 6 }); hearts(x, t, T.home, 260, 960, { n: 6 })
    sparkles(x, t, 800, 880, T.got, 10, 120, 1); sparkles(x, t, 280, 860, T.home, 10, 120, 2)
  },
  last: { t: T.last, text: 'Nine hours apart, | *one* moon.', size: 90 },
  sections: { drop: 0.6, breakdown: [T.line], lift: [T.send], outroAt: T.last + 0.5 },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = [...EP.CUES, ['tick', T.snap, 0.08], ['pop', T.snap + 0.02, 1760, 0.04, -0.3], ['whoosh', T.send, 0.5, 0.05], ['pop', T.got, 1318.51, 0.05, 0.3], ['whoosh', T.back, 0.5, 0.05], ['pop', T.home, 1174.66, 0.05, -0.3], ['pluck', T.cry, 659.25, 0.035, 0.5, -0.3], ['pluck', T.cry + 0.14, 587.33, 0.035, 0.5, -0.3]]
export const MUSIC = EP.music
void INK
