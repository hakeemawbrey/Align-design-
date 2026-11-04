// nx2e27 (43 s vertical, "Star Talk Explains, Volume 2", ep 27) · story 0–40.6, then the short end card.
//   ❓ "What does *Scorpio* season feel like?"  Teacher: SCORPIO. Student: TAURUS. Pisces cries (at the back desk).
//   THE SEASON BOARD (x2kit): the Sun slides into the Scorpio slot (✓ about 23 oct – 21 nov; brightest star: antares), then
//   ELEMENT · MODE · RULER (✦ water, fixed, mars + pluto), then the feel (✦ depth, loyalty, starting over), then the ♥ tip.
//   Last line: "Deep takes *time*."
// The engine is ../../nx2e16/scenes/x2kit.js (the series kit for episodes 16–30). Pure f(t).
import { seasonEpisode } from '../../nx2e16/scenes/x2kit.js'

const EP = seasonEpisode({
  id: 'nx2e27', sign: 'scorpio', student: 'taurus', key: 'C#m', duration: 43,
  dates: "ABOUT 23 OCT – 21 NOV", note: "BRIGHTEST STAR: ANTARES",
  element: "WATER", mode: "FIXED", ruler: "MARS|+ PLUTO",
  feel: ["DEPTH", "LOYALTY", "STARTING OVER"],
  lines: [
    ["student", "scorpio season. why is the lighting *so moody?*"],
    ["teacher", "about 23 October to *21 November.*", {"tag": "sky", "mark": "sky"}],
    ["teacher", "its brightest star: Antares, a *red supergiant.*", {"mark": "note"}],
    ["teacher", "in astrology: water, fixed, *Mars* or Pluto.", {"tag": "astro", "mark": "astro"}],
    ["teacher", "astrologers say: depth, loyalty, *new starts.*", {"mark": "feel"}],
    ["student", "deep? i like things *slow and cozy.*"],
    ["teacher", "same. trust is earned *slowly.*", {"tag": "tip"}],
    ["teacher", "and private isn’t the same as *secret.*"],
    ["student", "deep and slow. my two *favourite speeds.*", {"bulb": true}],
  ],
  items: ["About 23 Oct – *21 Nov*", "Water, fixed, *Mars/Pluto*", "Trust takes *time*"],
  last: "Deep takes *time*.", lastWho: 'teacher',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
