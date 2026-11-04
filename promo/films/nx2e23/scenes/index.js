// nx2e23 (45 s vertical, "Star Talk Explains, Volume 2", ep 23) · story 0–40.6, then the default end card.
//   ❓ "What does *Cancer* season feel like?"  Teacher: CANCER. Student: SAGITTARIUS. Pisces cries (at the back desk).
//   THE SEASON BOARD (x2kit): the Sun slides into the Cancer slot (✓ about 21 jun – 22 jul; starts at the june solstice), then
//   ELEMENT · MODE · RULER (✦ water, cardinal, the moon), then the feel (✦ home, care, feelings), then the ♥ tip.
//   Last line: "Care is the *little* stuff."
// The engine is ../../nx2e16/scenes/x2kit.js (the series kit for episodes 16–30). Pure f(t).
import { seasonEpisode } from '../../nx2e16/scenes/x2kit.js'

const EP = seasonEpisode({
  id: 'nx2e23', sign: 'cancer', student: 'sagittarius', key: 'Bb', duration: 45,
  dates: "ABOUT 21 JUN – 22 JUL", note: "STARTS AT THE JUNE SOLSTICE",
  element: "WATER", mode: "CARDINAL", ruler: "THE MOON",
  feel: ["HOME", "CARE", "FEELINGS"],
  qName: "Cancer",
  lines: [
    ["student", "cancer season! road trip? *road trip?*"],
    ["teacher", "it starts at the June *solstice*, about 21 June.", {"tag": "sky", "mark": "sky"}],
    ["teacher", "the longest day in the *Northern Hemisphere.*", {"mark": "note"}],
    ["teacher", "in astrology: water, cardinal, *Moon-ruled.*", {"tag": "astro", "mark": "astro"}],
    ["teacher", "astrologers say: home, care, *feelings.*", {"mark": "feel"}],
    ["student", "home? i’m *never* home."],
    ["teacher", "care is small: ask how their day *really* was.", {"tag": "tip"}],
    ["student", "so home isn’t a place. it’s *whoever asks.*", {"bulb": true}],
  ],
  items: ["About 21 Jun – *22 Jul*", "Water, cardinal, *the Moon*", "Ask how it *really* went"],
  last: "Care is the *little* stuff.", lastWho: 'teacher',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
