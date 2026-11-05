// klne05: LONG DISTANCE NOTES, "Tell Me the Boring Stuff" (22 s vertical, star_advice post, funk · D). Hard cut.
// Kit: ../../klne01/ldnkit.js. Mexico City (CST, UTC−6, no daylight time) ↔ Madrid (CET, UTC+1): 7 hours.
//   0.0  frame 0: Mexico City 2 PM, ♊ Gemini mid-wave at a bus stop; Madrid 9 PM, ♐ Sagittarius on the sofa.
//        "You miss their *boring* | Tuesday."
//   3.2  Sag: "how was your day?" · Gemini: "fine! (I only send big news)" · 5.8 Sag: "I miss the little stuff."
//   8.3  THE STARS: "send the *boring* stuff. that’s where closeness lives." → a flurry of tiny updates flies over:
//        "the bus was late" · "I ate a whole orange" · "a pigeon judged me" · "new socks!!" · Sag laughs; Pisces (Sag's
//        roommate) cries at the pigeon · 14.4 one comes back: "the neighbour’s cat stared at me".
//  20.3  "The boring stuff | *is* the closeness."
import { makeLDN, card, fly, R, box, label, bubble, hearts, GOLD, INK, INTER } from '../../klne01/ldnkit.js'

const T = { q: 3.2, a: 4.4, miss: 5.8, line: 8.3, cry: 12.6, back: 14.4, laugh: 15.4, last: 20.3 }
const UP = [[10.0, 'the bus was late'], [10.9, 'I ate a whole orange'], [11.8, 'a pigeon judged me'], [12.7, 'new socks!!']]
const note = (txt, rot) => (x, px, py) => card(x, px, py, 300, 80, '#ffffff', { text: txt, size: 26, rot })
const EP = makeLDN({
  id: 'klne05', len: 22, ending: 'cut', music: { style: 'funk', key: 'D', seed: 2325 },
  hook: 'You miss their *boring* | Tuesday.',
  L: { sign: 'gemini', city: 'Mexico City', min0: 14 * 60 },
  R: { sign: 'sagittarius', city: 'Madrid', offset: 420 },
  sets: [[0, 'street', 'room', {}]],
  badgeAt: 0.6, gap: '7 HOURS APART', gapAt: 1.0, gapOut: [3.0, 3.2],
  lines: [{ t: T.line, text: 'send the *boring* stuff. that’s where closeness lives.' }],
  boxes: [{ from: 0, to: 1, close: 12.0 }],
  pose(t, side) {
    if (side === 'L') return { x: 260, y: 1130, s: 250, mood: t < T.line ? 'happy' : t < T.back ? 'sparkle' : 'happy', look: [1, 0], hops: [0, T.a, ...UP.map(u => u[0]), T.laugh], squash: t < 0.4 ? -0.12 : 0 }
    return { x: 820, y: 1150, s: 240, mood: t < T.miss ? 'neutral' : t < UP[0][0] + 1 ? 'neutral' : t < T.back ? 'happy' : 'sparkle', look: [-1, 0], hops: [T.q, ...UP.map(u => u[0] + 1), T.back] }
  },
  pis: { side: 'R', x: 980, y: 1260, s: 115, look: [-1, -0.5], tears: t => (t > T.cry ? 3 : 2), mood: t => (t > T.cry ? 'happy' : 'wide'), hops: [T.cry] },
  draw(x, t) {
    // the bus stop (Mexico City) and a sofa (Madrid)
    x.save(); x.beginPath(); x.rect(0, 0, 540, 1920); x.clip(); R(x, INK, 420, 860, 12, 400); box(x, 380, 820, 100, 60, '#5fb87a', { b: 6 }); label(x, 'BUS', 430, 850, { size: 24, col: INK, font: INTER, weight: 800 }); x.restore()
    x.save(); x.beginPath(); x.rect(540, 0, 540, 1920); x.clip(); box(x, 600, 1180, 420, 90, '#c64a6a', { b: 7 }); box(x, 600, 1100, 420, 90, '#a83c5a', { b: 7 }); x.restore()
    if (t < 0.9) label(x, 'hi!!', 360, 900, { size: 52, col: GOLD, font: INTER, weight: 800, rot: -0.1 })
    bubble(x, t, 820, 820, T.q, T.miss - 0.1, 'how was your day?', { size: 32 })
    bubble(x, t, 270, 790, T.a, T.line - 0.2, ['fine!', '(only big news)'], { size: 30 })
    bubble(x, t, 820, 820, T.miss, T.line - 0.2, 'I miss the little stuff.', { size: 30, col: '#d9d4ea' })
    UP.forEach(([at, txt], i) => { fly(x, t, at, at + 0.9, 300, 900, 810, 700 + i * 95, note(txt, (i % 2 ? 0.05 : -0.05)), 200); if (t > at + 0.9 && t < T.last) note(txt, (i % 2 ? 0.05 : -0.05))(x, 810, 700 + i * 95) })
    fly(x, t, T.back, T.back + 0.9, 800, 1060, 270, 760, note('a cat stared at me', -0.04), 200)
    if (t > T.back + 0.9 && t < T.last) note('a cat stared at me', -0.04)(x, 270, 760)
    if (t > T.laugh && t < T.last) { label(x, 'HA!', 380, 960, { size: 46, col: GOLD, font: INTER, weight: 800, rot: -0.1 }); label(x, 'HAHA', 700, 1000, { size: 40, col: GOLD, font: INTER, weight: 800, rot: 0.1 }) }
    hearts(x, t, T.laugh, 540, 1000, { n: 6, spread: 300 })
  },
  last: { t: T.last, text: 'The boring stuff | *is* the closeness.', size: 88 },
  sections: { drop: 0.6, breakdown: [T.line], lift: [UP[0][0]], outroAt: T.last + 0.5 },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = [...EP.CUES, ...UP.flatMap(([a], i) => [['whoosh', a, 0.4, 0.035], ['pop', a + 0.9, [880, 987.77, 1174.66, 1318.51][i], 0.05, 0.3]]), ['whoosh', T.back, 0.4, 0.04], ['pop', T.back + 0.9, 1567.98, 0.05, -0.3], ['pluck', T.cry, 659.25, 0.035, 0.5, 0.3], ['pluck', T.cry + 0.14, 587.33, 0.035, 0.5, 0.3]]
export const MUSIC = EP.music
