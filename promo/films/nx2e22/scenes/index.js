// nx2e22 (43 s vertical, "Star Talk Explains, Volume 2", ep 22) · story 0–40.6, then the short end card.
//   ❓ "What does *Gemini* season feel like?"  Teacher: GEMINI. Student: CAPRICORN. Pisces cries (at the back desk).
//   THE SEASON BOARD (x2kit): the Sun slides into the Gemini slot (✓ about 21 may – 20 jun; brightest: castor + pollux), then
//   ELEMENT · MODE · RULER (✦ air, mutable, mercury), then the feel (✦ curiosity, conversation, new ideas), then the ♥ tip.
//   Last line: "Ask the *second* question."
// The engine is ../../nx2e16/scenes/x2kit.js (the series kit for episodes 16–30). Pure f(t).
import { seasonEpisode } from '../../nx2e16/scenes/x2kit.js'
import { drawWhistle } from '../../nx2e16/scenes/props.js'

const EP = seasonEpisode({
  id: 'nx2e22', sign: 'gemini', student: 'capricorn', key: 'C', duration: 43,
  dates: "ABOUT 21 MAY – 20 JUN", note: "BRIGHTEST: CASTOR + POLLUX",
  element: "AIR", mode: "MUTABLE", ruler: "MERCURY",
  feel: ["CURIOSITY", "CONVERSATION", "NEW IDEAS"],
  studentOpts: { prop: (x, r) => drawWhistle(x, r.x - r.size * 0.46, r.y + r.size * 0.12, Math.max(4, Math.round(r.size / 40))) },
  lines: [
    ["student", "gemini season. i have *an agenda.* item one?"],
    ["teacher", "about 21 May to 20 June! *and also*—", {"tag": "sky", "mark": "sky"}],
    ["teacher", "Gemini’s two brightest stars: *Castor, Pollux.*", {"mark": "note"}],
    ["teacher", "named for twins in *old myths!* fun, right?"],
    ["teacher", "in astrology: air, mutable, ruled by *Mercury.*", {"tag": "astro", "mark": "astro"}],
    ["teacher", "astrologers say: curiosity, *chat*, new ideas.", {"mark": "feel"}],
    ["student", "item two: how do i *flirt* with that?"],
    ["teacher", "curiosity is flirting: ask *a second question.*", {"tag": "tip"}],
    ["student", "a follow-up question. noted. *scheduled.*", {"bulb": true}],
  ],
  items: ["About 21 May – *20 Jun*", "Air, mutable, *Mercury*", "Ask *the follow-up*"],
  last: "Ask the *second* question.", lastWho: 'teacher',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
