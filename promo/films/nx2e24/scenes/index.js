// nx2e24 (45 s vertical, "Star Talk Explains, Volume 2", ep 24) · story 0–40.6, then the default end card.
//   ❓ "What does *Leo* season feel like?"  Teacher: LEO. Student: AQUARIUS. Pisces cries (at the back desk).
//   THE SEASON BOARD (x2kit): the Sun slides into the Leo slot (✓ about 23 jul – 22 aug; brightest star: regulus), then
//   ELEMENT · MODE · RULER (✦ fire, fixed, the sun), then the feel (✦ warmth, play, being seen), then the ♥ tip.
//   Last line: "Point the spotlight *out*."
// The engine is ../../nx2e16/scenes/x2kit.js (the series kit for episodes 16–30). Pure f(t).
import { seasonEpisode } from '../../nx2e16/scenes/x2kit.js'
import { drawCrown } from '../../nx2e16/scenes/props.js'

const EP = seasonEpisode({
  id: 'nx2e24', sign: 'leo', student: 'aquarius', key: 'D', duration: 45,
  dates: "ABOUT 23 JUL – 22 AUG", note: "BRIGHTEST STAR: REGULUS",
  element: "FIRE", mode: "FIXED", ruler: "THE SUN",
  feel: ["WARMTH", "PLAY", "BEING SEEN"],
  teacher: { pointer: true, prop: (x, r) => drawCrown(x, r.x, r.top + 4, Math.max(4, Math.round(r.size / 40))) },
  lines: [
    ["student", "leo season. let me guess: *it’s about you.*"],
    ["teacher", "about 23 July to 22 August, *darling.*", {"tag": "sky", "mark": "sky"}],
    ["teacher", "and Regulus is the brightest star in *Leo!*", {"mark": "note"}],
    ["teacher", "in astrology: fire, fixed, ruled by *the Sun.*", {"tag": "astro", "mark": "astro"}],
    ["teacher", "astrologers say: warmth, play, *being seen.*", {"mark": "feel"}],
    ["student", "so… *the spotlight.* told you."],
    ["teacher", "best glow move: make *someone else* feel seen.", {"tag": "tip"}],
    ["teacher", "say something specific. *“nice laugh”* counts."],
    ["student", "so the spotlight works best… *pointed out.*", {"bulb": true}],
  ],
  items: ["About 23 Jul – *22 Aug*", "Fire, fixed, *the Sun*", "Make them *feel seen*"],
  last: "Point the spotlight *out*.", lastWho: 'student',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
