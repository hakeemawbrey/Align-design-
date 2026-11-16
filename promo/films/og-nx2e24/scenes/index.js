// og-nx2e24: social rework (static HOOK; no question card / series bug / end fade via ./x2kit.js copy;
// a self-applauding Leo and a deadpan Aquarius). Was:
// nx2e24 (43 s vertical, "Star Talk Explains, Volume 2", ep 24) · story 0–40.6, then the short end card.
//   ❓ "What does *Leo* season feel like?"  Teacher: LEO. Student: AQUARIUS. Pisces cries (at the back desk).
//   THE SEASON BOARD (x2kit): the Sun slides into the Leo slot (✓ about 23 jul – 22 aug; brightest star: regulus), then
//   ELEMENT · MODE · RULER (✦ fire, fixed, the sun), then the feel (✦ warmth, play, being seen), then the ♥ tip.
//   Last line: "Point the spotlight *out*."
// The engine is ../../nx2e16/scenes/x2kit.js (the series kit for episodes 16–30). Pure f(t).
import { seasonEpisode } from './x2kit.js'   // og: this film's own copy
import { drawCrown } from '../../nx2e16/scenes/props.js'

const EP = seasonEpisode({
  id: 'og-nx2e24', sign: 'leo', student: 'aquarius', key: 'D', duration: 43,
  dates: "ABOUT 23 JUL – 22 AUG", note: "BRIGHTEST STAR: REGULUS",
  element: "FIRE", mode: "FIXED", ruler: "THE SUN",
  feel: ["WARMTH", "PLAY", "BEING SEEN"],
  teacher: { pointer: true, prop: (x, r) => drawCrown(x, r.x, r.top + 4, Math.max(4, Math.round(r.size / 40))) },
  lines: [
    ["student", "leo season. let me guess: *it’s about you.*"],
    ["teacher", "about 23 July to 22 August. *applause, please.*", {"tag": "sky", "mark": "sky"}],
    ["teacher", "Regulus: brightest star in Leo. *like me.*", {"mark": "note"}],
    ["teacher", "in astrology: fire, fixed, ruled by *the Sun.*", {"tag": "astro", "mark": "astro"}],
    ["teacher", "astrologers say: warmth, play, *being seen.*", {"mark": "feel"}],
    ["student", "you brought *your own spotlight.* to class."],
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

// og (social): static TikTok-style hook, on screen from frame 1 over the classroom
export const HOOK = 'Leo\'s glow-up tip: | *it\'s not about you.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.2
