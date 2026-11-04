// nx2e17 (45 s vertical, "Star Talk Explains, Volume 2", ep 17) · story 0–40.6, then the default end card.
//   ❓ "What does *Capricorn* season feel like?"  Teacher: CAPRICORN. Student: LEO. Pisces cries (at the back desk).
//   THE SEASON BOARD (x2kit): the Sun slides into the Capricorn slot (✓ about 21 dec – 19 jan; starts at the december solstice), then
//   ELEMENT · MODE · RULER (✦ earth, cardinal, saturn), then the feel (✦ plans, patience, the climb), then the ♥ tip.
//   Last line: "Climb it *together*."
// The engine is ../../nx2e16/scenes/x2kit.js (the series kit for episodes 16–30). Pure f(t).
import { seasonEpisode } from '../../nx2e16/scenes/x2kit.js'
import { drawWhistle, whistleCue, drawCrown } from '../../nx2e16/scenes/props.js'
import { clamp } from '../../../src/lib.js'

const EP = seasonEpisode({
  id: 'nx2e17', sign: 'capricorn', student: 'leo', key: 'Gm', duration: 45,
  dates: "ABOUT 21 DEC – 19 JAN", note: "STARTS AT THE DECEMBER SOLSTICE",
  element: "EARTH", mode: "CARDINAL", ruler: "SATURN",
  feel: ["PLANS", "PATIENCE", "THE CLIMB"],
  teacher: { pointer: false, prop: (x, r, t, T) => { let b = 0; for (const v of [T.M.sky, T.M.astro, T.M.feel]) b = Math.max(b, clamp(1 - Math.abs(t - v - 0.15) / 0.3)); drawWhistle(x, r.x + r.size * 0.44, r.y + r.size * 0.12, 6, { blow: b }) } },
  studentOpts: { prop: (x, r) => drawCrown(x, r.x, r.top + 4, Math.max(4, Math.round(r.size / 40))) },
  cues: T => [T.M.sky, T.M.astro, T.M.feel].flatMap(v => whistleCue(+v.toFixed(3), 0.22)),
  lines: [
    ["student", "capricorn season? sounds like *homework.*"],
    ["teacher", "it starts at the December *solstice.*", {"tag": "sky", "mark": "sky"}],
    ["teacher", "the longest night in the *Northern Hemisphere.*", {"mark": "note"}],
    ["teacher", "in astrology: earth, cardinal, ruled by *Saturn.*", {"tag": "astro", "mark": "astro"}],
    ["teacher", "astrologers say: plans, patience, *the climb.*", {"mark": "feel"}],
    ["student", "slow? i’m a *main character.* i glow fast."],
    ["teacher", "in love, glow means *showing up.* every time.", {"tag": "tip"}],
    ["student", "so the glow-up is… *a calendar?*", {"bulb": true}],
  ],
  items: ["About 21 Dec – *19 Jan*", "Earth, cardinal, *Saturn*", "Love *shows up*"],
  last: "Climb it *together*.", lastWho: 'teacher',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
