// nx2e21 (43 s vertical, "Star Talk Explains, Volume 2", ep 21) · story 0–40.6, then the short end card.
//   ❓ "What does *Taurus* season feel like?"  Teacher: TAURUS. Student: GEMINI. Pisces cries (at the back desk).
//   THE SEASON BOARD (x2kit): the Sun slides into the Taurus slot (✓ about 20 apr – 20 may), then
//   ELEMENT · MODE · RULER (✦ earth, fixed, venus), then the feel (✦ comfort, the senses, steadiness), then the ♥ tip.
//   Last line: "Slow is *a choice*."
// The engine is ../../nx2e16/scenes/x2kit.js (the series kit for episodes 16–30). Pure f(t).
import { seasonEpisode } from '../../nx2e16/scenes/x2kit.js'

const EP = seasonEpisode({
  id: 'nx2e21', sign: 'taurus', student: 'gemini', key: 'Eb', duration: 43,
  dates: "ABOUT 20 APR – 20 MAY", note: null,
  element: "EARTH", mode: "FIXED", ruler: "VENUS",
  feel: ["COMFORT", "THE SENSES", "STEADINESS"],
  lines: [
    ["student", "taurus season! quick, *what’s the plan?*"],
    ["teacher", "no rush. about 20 April to *20 May.*", {"tag": "sky", "mark": "sky"}],
    ["teacher", "in astrology: earth, fixed, ruled by *Venus.*", {"tag": "astro", "mark": "astro"}],
    ["teacher", "fixed signs land *mid-season.* steady."],
    ["teacher", "astrologers say: comfort, the senses, *calm.*", {"mark": "feel"}],
    ["student", "steady? i changed my mind *four times* today."],
    ["teacher", "slow is a fine pace. small rituals *add up.*", {"tag": "tip"}],
    ["student", "so love is… a really good *snack routine.*", {"bulb": true}],
  ],
  items: ["About 20 Apr – *20 May*", "Earth, fixed, *Venus*", "Slow, *on purpose*"],
  last: "Slow is *a choice*.", lastWho: 'teacher',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
