// nx2e19 (43 s vertical, "Star Talk Explains, Volume 2", ep 19) · story 0–40.6, then the short end card.
//   ❓ "What does *Pisces* season feel like?"  Teacher: PISCES. Student: VIRGO. Pisces cries (as the teacher).
//   THE SEASON BOARD (x2kit): the Sun slides into the Pisces slot (✓ about 19 feb – 20 mar; ends at the march equinox), then
//   ELEMENT · MODE · RULER (✦ water, mutable, jupiter + neptune), then the feel (✦ empathy, imagination, dreams), then the ♥ tip.
//   Last line: "Feel it, *then* share it."
// The engine is ../../nx2e16/scenes/x2kit.js (the series kit for episodes 16–30). Pure f(t).
import { seasonEpisode } from '../../nx2e16/scenes/x2kit.js'
import { drawClipboard } from '../../nx2e16/scenes/props.js'

const EP = seasonEpisode({
  id: 'nx2e19', sign: 'pisces', student: 'virgo', key: 'Db', duration: 43,
  dates: "ABOUT 19 FEB – 20 MAR", note: "ENDS AT THE MARCH EQUINOX",
  element: "WATER", mode: "MUTABLE", ruler: "JUPITER|+ NEPTUNE",
  feel: ["EMPATHY", "IMAGINATION", "DREAMS"],
  studentOpts: { prop: (x, r) => drawClipboard(x, r.x - r.size * 0.44, r.y + r.size * 0.12, Math.max(4, Math.round(r.size / 44)), { rot: -0.15 }) },
  lines: [
    ["student", "pisces season. why are you crying *already?*"],
    ["teacher", "happy tears! it’s *my season.*"],
    ["teacher", "about 19 Feb to 20 Mar. it ends at the *equinox.*", {"tag": "sky", "mark": "sky"}],
    ["teacher", "in astrology: the *last* of the twelve signs.", {"tag": "astro", "mark": "astro"}],
    ["teacher", "water, mutable, ruled by Jupiter or *Neptune.*"],
    ["teacher", "astrologers say: empathy, *imagination*, dreams.", {"mark": "feel"}],
    ["student", "noted. *crying* is not on my checklist."],
    ["teacher", "big feelings are a strength. *check in* on yours.", {"tag": "tip"}],
    ["student", "so the crying is… *on brand.*", {"bulb": true}],
  ],
  items: ["About 19 Feb – *20 Mar*", "Water, mutable, *last sign*", "Big feelings, *checked in*"],
  last: "Feel it, *then* share it.", lastWho: 'teacher',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
