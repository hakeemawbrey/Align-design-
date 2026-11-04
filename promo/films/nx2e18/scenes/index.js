// nx2e18 (45 s vertical, "Star Talk Explains, Volume 2", ep 18) · story 0–40.6, then the default end card.
//   ❓ "What does *Aquarius* season feel like?"  Teacher: AQUARIUS. Student: CANCER. Pisces cries (at the back desk).
//   THE SEASON BOARD (x2kit): the Sun slides into the Aquarius slot (✓ about 20 jan – 18 feb), then
//   ELEMENT · MODE · RULER (✦ air (!), fixed, saturn + uranus), then the feel (✦ friendship, ideas, your own way), then the ♥ tip.
//   Last line: "Close, *and* free."
// The engine is ../../nx2e16/scenes/x2kit.js (the series kit for episodes 16–30). Pure f(t).
import { seasonEpisode } from '../../nx2e16/scenes/x2kit.js'

const EP = seasonEpisode({
  id: 'nx2e18', sign: 'aquarius', student: 'cancer', key: 'F#m', duration: 45,
  dates: "ABOUT 20 JAN – 18 FEB", note: null,
  element: "AIR (!)", mode: "FIXED", ruler: "SATURN|+ URANUS",
  feel: ["FRIENDSHIP", "IDEAS", "YOUR OWN WAY"],
  lines: [
    ["student", "aquarius season! so… do i *bring water?*"],
    ["teacher", "it runs from about 20 Jan to *18 Feb.*", {"tag": "sky", "mark": "sky"}],
    ["teacher", "in astrology it’s *air*, and fixed.", {"tag": "astro", "mark": "astro"}],
    ["student", "air?! you’re literally *the water bearer.*"],
    ["teacher", "i know. ruled by Saturn, or *Uranus* in modern."],
    ["teacher", "astrologers say: friends, ideas, *your own way.*", {"mark": "feel"}],
    ["student", "so you need space? *should i worry?*"],
    ["teacher", "space can be love too. just *say what you need.*", {"tag": "tip"}],
    ["student", "so we hold hands… on *separate benches?*", {"bulb": true}],
  ],
  items: ["About 20 Jan – *18 Feb*", "Air (*really*), fixed", "Space *and* closeness"],
  last: "Close, *and* free.", lastWho: 'teacher',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
