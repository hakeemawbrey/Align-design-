// nx2e25 (45 s vertical, "Star Talk Explains, Volume 2", ep 25) · story 0–40.6, then the default end card.
//   ❓ "What does *Virgo* season feel like?"  Teacher: VIRGO. Student: PISCES. Pisces cries (as the student).
//   THE SEASON BOARD (x2kit): the Sun slides into the Virgo slot (✓ about 23 aug – 22 sep; brightest star: spica), then
//   ELEMENT · MODE · RULER (✦ earth, mutable, mercury), then the feel (✦ details, helping, good routines), then the ♥ tip.
//   Last line: "Noticing is a *hug*."
// The engine is ../../nx2e16/scenes/x2kit.js (the series kit for episodes 16–30). Pure f(t).
import { seasonEpisode } from '../../nx2e16/scenes/x2kit.js'
import { drawClipboard } from '../../nx2e16/scenes/props.js'

const EP = seasonEpisode({
  id: 'nx2e25', sign: 'virgo', student: 'pisces', key: 'G', duration: 45,
  dates: "ABOUT 23 AUG – 22 SEP", note: "BRIGHTEST STAR: SPICA",
  element: "EARTH", mode: "MUTABLE", ruler: "MERCURY",
  feel: ["DETAILS", "HELPING", "GOOD ROUTINES"],
  teacher: { pointer: false, prop: (x, r, t, T) => drawClipboard(x, r.x + r.size * 0.46, r.y + r.size * 0.1, Math.max(4, Math.round(r.size / 44)), { page: t > T.M.feel ? 1 : 0 }) },
  lines: [
    ["student", "virgo season… do i need *a planner?*"],
    ["teacher", "about 23 August to *22 September.*", {"tag": "sky", "mark": "sky"}],
    ["teacher", "Spica is the brightest star in *Virgo.*", {"mark": "note"}],
    ["teacher", "in astrology: earth, mutable, ruled by *Mercury.*", {"tag": "astro", "mark": "astro"}],
    ["teacher", "astrologers say: details, helping, *routines.*", {"mark": "feel"}],
    ["student", "i’m not detailed. i’m *a puddle.*"],
    ["teacher", "love is in the details. nobody needs *perfect.*", {"tag": "tip"}],
    ["teacher", "you noticed i was nervous. *that’s* a detail."],
    ["student", "so noticing is *a kind of hug.*", {"bulb": true}],
  ],
  items: ["About 23 Aug – *22 Sep*", "Earth, mutable, *Mercury*", "Notice, *don’t perfect*"],
  last: "Noticing is a *hug*.", lastWho: 'student',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
