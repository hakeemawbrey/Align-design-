// nx2e26 (43 s vertical, "Star Talk Explains, Volume 2", ep 26) · story 0–40.6, then the short end card.
//   ❓ "What does *Libra* season feel like?"  Teacher: LIBRA. Student: ARIES. Pisces cries (at the back desk).
//   THE SEASON BOARD (x2kit): the Sun slides into the Libra slot (✓ about 23 sep – 22 oct; day and night nearly equal), then
//   ELEMENT · MODE · RULER (✦ air, cardinal, venus), then the feel (✦ balance, fairness, partnership), then the ♥ tip.
//   Last line: "Fair is *turn by turn*."
// The engine is ../../nx2e16/scenes/x2kit.js (the series kit for episodes 16–30). Pure f(t).
import { seasonEpisode } from '../../nx2e16/scenes/x2kit.js'

const EP = seasonEpisode({
  id: 'nx2e26', sign: 'libra', student: 'aries', key: 'F', duration: 43,
  dates: "ABOUT 23 SEP – 22 OCT", note: "DAY AND NIGHT NEARLY EQUAL",
  element: "AIR", mode: "CARDINAL", ruler: "VENUS",
  feel: ["BALANCE", "FAIRNESS", "PARTNERSHIP"],
  lines: [
    ["student", "libra season. *fight me.* wait, no—"],
    ["teacher", "it starts at the September *equinox.*", {"tag": "sky", "mark": "sky"}],
    ["teacher", "day and night, *close to equal.* balanced.", {"mark": "note"}],
    ["teacher", "in astrology: air, cardinal, ruled by *Venus.*", {"tag": "astro", "mark": "astro"}],
    ["teacher", "scales: the only zodiac symbol that’s *a thing.*"],
    ["teacher", "astrologers say: balance, fairness, *partners.*", {"mark": "feel"}],
    ["student", "fair? so it’s 50/50, *every* single time?"],
    ["teacher", "fair isn’t 50/50 daily. it’s *taking turns.*", {"tag": "tip"}],
    ["student", "so we take turns. starting with… *me?*", {"bulb": true}],
  ],
  items: ["About 23 Sep – *22 Oct*", "Air, cardinal, *Venus*", "Fair = *taking turns*"],
  last: "Fair is *turn by turn*.", lastWho: 'teacher',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
