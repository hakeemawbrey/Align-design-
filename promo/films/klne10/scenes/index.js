// klne10: LONG DISTANCE NOTES, "A Day Apart: Tokyo to LA" (60 s vertical, star_advice post, dreamy · Ab). Long.
// Kit: ../../klne01/ldnkit.js. Tokyo (JST, UTC+9) ↔ Los Angeles (PST, UTC−8): Tokyo is 17 hours ahead, already in
// "tomorrow". ♓ Pisces is half of this couple and cries all film (happiest at the gate). No end card. Hard cut.
//   0.0  frame 0: Tokyo 7 AM, ♊ Gemini mid-run with toast; LA 2 PM, ♓ Pisces mid-sob at a calendar with a date circled.
//        "You're living in | their *tomorrow.*"  · 2.3 promise: "a day apart in 60 seconds. | wait for the *arrivals gate.*"
//   ch.1 MORNING  (5.0)  Pisces's note from "yesterday" is waiting on Gemini's phone · THE STARS: leave a note for their morning
//   ch.2 MIDDAY  (16.0)  a lunch photo one way, a dinner photo the other ("same food group!")
//   ch.3 EVENING (27.0)  Gemini's sunset "thinking of you" lands on a sleeping Pisces, who smiles in their sleep
//   ch.4 NIGHT   (38.0)  Gemini's goodnight is Pisces's good morning · THE STARS: small and steady beats big and rare
//   ch.5 ARRIVALS (48.6) the next evening: Pisces walks out with a suitcase, 3-2-1, the seam slides away, the hug.
//  57.4  "Seventeen hours apart. | *Zero* tonight."
import { makeLDN, phone, card, fly, R, box, label, bubble, hearts, sparkles, drawBits, GOLD, INK, INTER, pop01, prog, lerp, ease, clamp } from '../../klne01/ldnkit.js'
import { countdown, countdownCues } from '../../hookkit.js'

const C = { m: 5.0, d: 16.0, e: 27.0, n: 38.0, a: 48.6 }
const T = { note: 5.6, g1: 6.4, p1: 7.4, line1: 9.0, lunch: 16.8, dinner: 18.6, same: 20.4, sun: 27.9, sl: 29.2, g3: 30.6, gn: 38.8, wake: 40.0, line2: 41.6, walk: 49.2, merge: [53.0, 54.4], hug: 54.6, last: 57.4 }
const CD = { at: 50.6, from: 3, gap: 0.6, go: 'HI!!', y: 800 }
const ph = (txt, bg, art) => (x, px, py) => { card(x, px, py, 200, 170, bg, { rot: -0.05 }); art(x, px, py - 14); label(x, txt, px, py + 60, { size: 22, col: INK, font: INTER, weight: 800 }) }
const riceBall = (x, px, py) => drawBits(x, ['..WWW..', '.WWWWW.', 'WWWWWWW', 'WKKKKKW'], { W: '#ffffff', K: '#2a4a3a' }, px, py, 10)
const pasta = (x, px, py) => drawBits(x, ['.YYYYY.', 'YYRYYYY', 'YYYYRYY', '.BBBBB.'], { Y: '#f2c75c', R: '#e8344e', B: '#ffffff' }, px, py, 10)
const sunset = (x, px, py) => { R(x, '#ff9a6a', px - 80, py - 50, 160, 70); x.fillStyle = '#ffe58a'; x.beginPath(); x.arc(px, py + 10, 26, Math.PI, 0); x.fill() }
const calendar = (x, cx, cy, txt) => { box(x, cx - 90, cy - 80, 180, 170, '#ffffff', { b: 6 }); R(x, '#e8344e', cx - 90, cy - 80, 180, 40); for (let i = 0; i < 12; i++) R(x, '#c9c3e0', cx - 74 + (i % 4) * 40, cy - 26 + Math.floor(i / 4) * 34, 26, 22); x.strokeStyle = '#e8344e'; x.lineWidth = 6; x.beginPath(); x.arc(cx + 46, cy + 42, 22, 0, 7); x.stroke(); if (txt) label(x, txt, cx, cy - 60, { size: 20, col: '#ffffff', font: INTER, weight: 800 }) }

const EP = makeLDN({
  id: 'klne10', len: 60, ending: 'cut', music: { style: 'dreamy', key: 'Ab', seed: 2330 },
  hook: 'You’re living in | their *tomorrow.*',
  L: { sign: 'gemini', city: 'Tokyo', min0: 7 * 60 },
  R: { sign: 'pisces', city: 'Los Angeles', offset: -1020 },
  jumps: [[C.d - 0.4, 330], [C.e - 0.4, 360], [C.n - 0.4, 300], [C.a - 0.4, 1200]],
  sets: [[0, 'room', 'room', {}], [C.e - 0.2, 'room', 'room', { bedR: true, bedColR: '#7a62a8' }], [C.n - 0.2, 'room', 'room', { bedL: true, bedR: true, bedColL: '#f2a03a', bedColR: '#7a62a8' }], [C.a - 0.2, 'street', 'street', {}]],
  badgeAt: 0.6, gap: '17 HOURS APART', gapAt: 1.0, gapOut: [2.1, 2.3],
  hookOut: [2.0, 2.2],
  lines: [{ t: T.line1, text: 'leave a note for their *morning.* it’s there when they wake.' }, { t: T.line2, text: 'small and steady beats *big and rare.*' }],
  boxes: [{ from: 0, to: 1, close: 14.6 }, { from: 1, to: 2, close: 46.8 }],
  long: { promise: 'a day apart in 60 seconds. | wait for the *arrivals gate.*', promiseOut: 4.7, chapters: [{ t: C.m, text: 'MORNING' }, { t: C.d, text: 'MIDDAY' }, { t: C.e, text: 'EVENING' }, { t: C.n, text: 'NIGHT' }, { t: C.a, text: 'ARRIVALS' }], merge: T.merge },
  pose(t, side) {
    const hugK = ease.inOutCubic(prog(t, T.merge[0], T.hug))
    if (side === 'L') {
      let mood = 'happy', look = [1, 0], y = 1140
      if (t < 0.7) mood = 'wide'
      else if (t < C.d) mood = t > T.g1 ? 'sparkle' : 'neutral'
      else if (t < C.e) mood = 'happy'
      else if (t < C.n) mood = 'sparkle'
      else if (t < C.a) { mood = t < T.gn + 1 ? 'happy' : 'sleepy'; y = 1135 }
      else mood = t > T.hug ? 'heart' : t > CD.at ? 'wide' : 'sparkle'
      const x0 = t < 0.7 ? 180 + t * 120 : 250
      return { x: lerp(x0, 450, hugK), y, s: 250, mood, look, hops: [0, 0.25, 0.5, T.g1, T.lunch, T.same, T.sun, T.gn, CD.at, CD.at + 0.6, CD.at + 1.2, T.hug, T.hug + 0.4], squash: t < 0.7 ? 0.08 * Math.sin(t * 30) : 0, free: t > T.merge[0],
        prop: (x, F) => { if (t < 1.2) drawBits(x, ['TTTT', 'TBBT', 'TTTT'], { T: '#d9a46a', B: '#f2c75c' }, F.ox + 120, F.oy - F.base - 80, 12); else if (t > T.note - 0.3 && t < C.d) phone(x, F.ox + 140, F.oy - F.base - 30, { s: 0.55, rot: 0.15, glow: 1, lines: ['good morning!', '(from yesterday)'] }) } }
    }
    let mood = 'wide', look = [-1, 0], tears = 2, x0 = 820, y = 1140
    if (t < C.m) { mood = 'wide'; look = [1, -0.6]; tears = 3 }
    else if (t < C.d) { mood = t > T.p1 ? 'sparkle' : 'neutral'; tears = t > T.p1 ? 3 : 2 }
    else if (t < C.e) mood = 'happy'
    else if (t < C.n) { mood = t > T.sl ? 'happy' : 'sleepy'; y = 1135; tears = t > T.sl ? 1 : 0 }
    else if (t < C.a) { mood = t > T.wake ? 'heart' : 'sleepy'; tears = t > T.wake ? 2 : 0 }
    else { x0 = lerp(980, 820, ease.outCubic(prog(t, T.walk, T.walk + 2))); mood = t > T.hug ? 'happy' : 'sparkle'; tears = 3 }
    return { x: lerp(x0, 640, hugK), y, s: 240, mood, look, tears, hops: [T.p1, T.dinner, T.sl, T.wake, T.walk, T.walk + 0.5, T.walk + 1, T.walk + 1.5, T.hug, T.hug + 0.4], free: t > T.merge[0],
      prop: (x, F) => { if (t > C.a && t < T.merge[0]) box(x, F.ox + 70, F.oy - F.base + 20, 90, 110, '#e8344e', { b: 6 }) } }
  },
  draw(x, t, S) {
    // the calendar on LA's wall
    if (t < C.a) S.clip('R', () => calendar(x, 900, 640, t > C.n ? 'TOMORROW!' : 'VISIT'))
    bubble(x, t, 260, 800, T.g1, C.d - 0.4, 'a note from yesterday!!', { size: 30 })
    bubble(x, t, 820, 820, T.p1, C.d - 0.4, 'they got it!!', { size: 32 })
    fly(x, t, T.lunch, T.lunch + 1.1, 300, 900, 800, 880, ph('lunch!', '#bfe8ff', riceBall))
    if (t > T.lunch + 1.1 && t < C.e - 0.4) ph('lunch!', '#bfe8ff', riceBall)(x, 800, 880)
    fly(x, t, T.dinner, T.dinner + 1.1, 800, 880, 280, 880, ph('dinner!', '#ffe9a8', pasta))
    if (t > T.dinner + 1.1 && t < C.e - 0.4) ph('dinner!', '#ffe9a8', pasta)(x, 280, 880)
    bubble(x, t, 540, 700, T.same, C.e - 0.4, 'same food group!', { size: 34, col: '#ffe9a8' })
    fly(x, t, T.sun, T.sun + 1.2, 300, 900, 800, 900, ph('thinking of you', '#ffd6e0', sunset))
    if (t > T.sun + 1.2 && t < C.n - 0.4) ph('thinking of you', '#ffd6e0', sunset)(x, 800, 900)
    if (t > T.sl && t < C.n - 0.4) label(x, '*smiles in sleep*', 820, 1330, { size: 26, col: '#cfeeff' })
    bubble(x, t, 260, 800, T.g3, C.n - 0.4, ['they’ll see it', 'at breakfast.'], { size: 30 })
    fly(x, t, T.gn, T.gn + 1.1, 300, 900, 800, 900, (x2, px, py) => card(x2, px, py, 240, 90, '#ffffff', { text: '▶ goodnight ♡', size: 28 }))
    bubble(x, t, 820, 800, T.wake + 0.3, C.a - 0.4, ['goodnight = my', 'good morning'], { size: 30 })
    // arrivals: the sign over both halves, the hug
    if (t > C.a - 0.2) { const k = pop01(t, C.a, 0.35, 2); x.save(); x.translate(540, 700); x.scale(k, k); box(x, -300, -50, 600, 100, '#2a2148', { b: 8 }); label(x, 'ARRIVALS', 0, 0, { size: 56, col: GOLD, font: INTER, weight: 800 }); x.restore() }
    hearts(x, t, T.hug, 545, 1000, { n: 10, spread: 300 }); sparkles(x, t, 545, 1000, T.hug, 14, 260, 1)
  },
  scenes: [countdown(CD)],
  cues: countdownCues(CD),
  last: { t: T.last, text: 'Seventeen hours apart. | *Zero* tonight.', size: 86 },
  sections: { drop: 0.6, breakdown: [C.e], lift: [C.a], outroAt: T.last + 0.5 },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = [...EP.CUES,
  ['pop', T.note, 1174.66, 0.04, -0.3], ...[T.lunch, T.dinner, T.sun, T.gn].flatMap(a => [['whoosh', a, 0.5, 0.045], ['pop', a + 1.1, 1318.51, 0.045, 0]]),
  ['bell', T.wake, 1760, 0.035, 1, 0.3], ['pluck', T.p1, 659.25, 0.035, 0.5, 0.3], ['pluck', T.p1 + 0.14, 587.33, 0.035, 0.5, 0.3],
  ...[0, 0.5, 1, 1.5].map(d => ['tick', T.walk + d, 0.03]), ['pluck', T.hug, 783.99, 0.05, 0.8, 0], ['pluck', T.hug + 0.15, 987.77, 0.05, 0.8, 0]]
export const MUSIC = EP.music
void clamp
