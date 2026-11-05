// kfbe03: FIRST DATE BINGO E3, "Gemini tells a story inside a story" (vertical, star_talk post, music: pop · G).
// No end card, no card transition; LOOP ending (the hook kit's loopBack eases the last 0.4 s into frame 0).
//   0.0   frame 0: ♊ Gemini mid-gesture, three speech bubbles stacked over each other; the dauber mid-slam on STORY
//         INSIDE A STORY. Hook: "Gemini started | *one* story."  0.3 whip zoom.
//   2.3   a loading bar "finding the point…" stalls at 99 %: Error: too many tangents → WAIT, WHAT WAS I SAYING (3.9)
//   4.6   three topics in one breath (cousin, a bakery, space) → THREE TOPICS ONE BREATH (6.0) → BINGO (6.25)
//   7.4   ♌ Leo laughs and adds a fourth topic; Gemini lights up · 8.9 "Lost the plot. | *Found* a person."
import { makeBingo, cafe, table, candle, star, label, shadow, hearts, drawBits, R, box, prog, lerp, ease, outK, pop01, inK, win01, r3, HK, INK, BONE, GOLD, INTER } from '../../kfbe01/scenes/bingokit.js'

const D = 12.4
const T = { load: 2.3, s1: 3.9, topics: [4.6, 6.0], s2: 6.0, bingo: 6.25, leo: 7.4, last: 8.9 }
const LOAD = { at: T.load, len: 1.6, label: 'finding the point…', stallAt: 99, error: 'Error: too many tangents', y: 860 }

const EP = makeBingo({
  id: 'kfbe03', D, n: 3, ink: '#f08a20', cardTag: '♊ × ♌', ending: 'loop',
  squares: [
    { text: '"WAIT, WHAT WAS I SAYING"', at: T.s1 }, { text: 'TALKS WITH BOTH HANDS' }, { text: 'TWO PHONES ON THE TABLE' },
    { text: 'STORY INSIDE A STORY', at: -0.04 }, { free: true }, { text: 'THREE TOPICS ONE BREATH', at: T.s2 },
    { text: 'DOES BOTH VOICES' }, { text: '"LONG STORY SHORT" (IT WASN’T)' }, { text: 'KNOWS A FACT ABOUT OTTERS' },
  ],
  win: [3, 4, 5], bingoAt: T.bingo,
  hook: { text: 'Gemini started | *one* story.', out: [2.15, 2.35], accentColor: '#ffe27a' },
  heads: [{ text: 'Lost the plot. | *Found* a person.', at: T.last, accent: '#ffe27a', late: 1, lateAt: T.last + 0.4, wobble: true }],
  effects: [[HK.loadingBar, HK.loadingBarCues, LOAD]],
  scene(x, t) {
    cafe(x, t, { wall: '#1f2a4a', trim: '#2d3a60' })
    let gm = 'happy', gl
    if (t > T.load && t < T.s1 + 0.4) { gm = 'wide'; gl = [0.5, -1] }
    if (t > T.topics[0] && t < T.topics[1]) gm = 'sparkle'
    if (t > T.leo + 0.4) gm = 'heart'
    shadow(x, 290, 1150, 220)
    const gest = Math.sin(t * 9) * (t < T.load || (t > T.topics[0] && t < T.topics[1]) ? 1 : 0.2)
    star(x, t, 'gemini', { x: 290, y: 880, s: 250, mood: gm, look: gl, hops: [0.2, 0.7, 1.3, T.topics[0], T.topics[0] + 0.5, T.topics[0] + 1, T.leo + 0.5, T.bingo], seed: 5, squash: 0.04 * gest })
    // hands (little pixel mitts waving)
    for (const d of [-1, 1]) drawBits(x, ['.BB.', 'BBBB', 'BBBB', '.BB.'], { B: '#ffe27a' }, 290 + d * 150, 860 - 40 * Math.max(0, gest * d), 9)
    shadow(x, 790, 1150, 210)
    const lm = t > T.leo ? 'happy' : t > T.topics[0] ? 'wide' : 'neutral'
    star(x, t, 'leo', { x: 790, y: 890, s: 230, mood: lm, look: t > T.leo ? undefined : [-1, 0], hops: [T.leo, T.leo + 0.3, T.leo + 0.6], seed: 7 })
    table(x, 540, 1010, 520)
    candle(x, t, 540, 1010)
    // the topics whizzing out
    const tk = win01(t, T.topics[0], T.topics[1] + 0.3)
    if (tk > 0.01) ['MY COUSIN', 'A BAKERY', 'SPACE??'].forEach((w, i) => { const k = pop01(t, T.topics[0] + i * 0.4, 0.25, 2.4) * tk; if (k > 0.01) label(x, w, 360 + i * 150, 650 + (i % 2) * 70, { size: 40 * k, col: ['#ffe27a', '#ff8fb1', '#7fd0ff'][i], font: INTER, weight: 900, rot: [-0.12, 0.08, -0.05][i] }) })
    if (t > T.leo + 0.4) hearts(x, t, T.leo + 0.5, 290, 720, { n: 4 })
  },
  bubbles: [
    { t0: -1.2, t1: 2.2, x: 430, y: 560, text: 'ok so my cousin’s roommate…', size: 38, tail: -0.4 },
    { t0: -1.0, t1: 2.2, x: 470, y: 645, text: 'which reminds me of a bakery,', size: 38, tail: -0.4 },
    { t0: -0.8, t1: 2.2, x: 380, y: 720, text: 'WAIT. ok. so.', size: 44, tail: -0.5 },
    { t0: T.leo, t1: T.last + 2.6, x: 720, y: 690, text: 'that reminds ME of SPACE.', size: 34, tail: 0.3 },
    { t0: T.bingo + 0.6, t1: D + 1, x: 800, y: 448, text: 'THEY BOTH DO TANGENTS', size: 30, tail: 0.5, col: '#cfe8ff' },
  ],
  cues: [...[0, 1, 2].map(i => ['pop', r3(T.topics[0] + i * 0.4), [880, 1174.66, 1567.98][i], 0.04, 0]), ['pluck', T.leo, 1318.51, 0.04, 0.5, 0.3]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [R, box, lerp, ease, outK, inK, INK, BONE, GOLD]
