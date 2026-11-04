// nx2e20 (43 s vertical, "Star Talk Explains, Volume 2", ep 20) · story 0–40.6, then the short end card.
//   ❓ "What does *Aries* season feel like?"  Teacher: ARIES. Student: LIBRA. Pisces cries (at the back desk).
//   THE SEASON BOARD (x2kit): the Sun slides into the Aries slot (✓ about 20 mar – 19 apr; day and night nearly equal), then
//   ELEMENT · MODE · RULER (✦ fire, cardinal, mars), then the feel (✦ fresh starts, courage, going first), then the ♥ tip.
//   Last line: "Go first. *Then* listen."
// The engine is ../../nx2e16/scenes/x2kit.js (the series kit for episodes 16–30). Pure f(t).
import { seasonEpisode } from '../../nx2e16/scenes/x2kit.js'

const EP = seasonEpisode({
  id: 'nx2e20', sign: 'aries', student: 'libra', key: 'A', duration: 43,
  dates: "ABOUT 20 MAR – 19 APR", note: "DAY AND NIGHT NEARLY EQUAL",
  element: "FIRE", mode: "CARDINAL", ruler: "MARS",
  feel: ["FRESH STARTS", "COURAGE", "GOING FIRST"],
  lines: [
    ["student", "aries season? should i *brace* myself?"],
    ["teacher", "it starts at the March equinox, about *20 Mar.*", {"tag": "sky", "mark": "sky"}],
    ["teacher", "day and night are *close to equal* then.", {"mark": "note"}],
    ["teacher", "in astrology: the *first* sign. fire, cardinal.", {"tag": "astro", "mark": "astro"}],
    ["teacher", "ruled by *Mars*, until about 19 April."],
    ["teacher", "astrologers say: fresh starts, *going first.*", {"mark": "feel"}],
    ["student", "going first?! what if they *say no?*"],
    ["teacher", "go first, then *leave room* for their answer.", {"tag": "tip"}],
    ["student", "so be brave, then *actually wait.*", {"bulb": true}],
  ],
  items: ["About 20 Mar – *19 Apr*", "Fire, cardinal, *Mars*", "Brave, *then* listen"],
  last: "Go first. *Then* listen.", lastWho: 'teacher',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
