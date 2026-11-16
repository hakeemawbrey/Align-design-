// og-nnye11: social rework of nnye11 (static HOOK outline 0–2.4, kit copy ./yearkit.js: no bug/flash/shake/end card, crazier lines).
// Was: nnye11: NEW YEAR, SAME HEART · Aquarius: what I'm keeping (18 s vertical, star_advice, music: synthwave · F#m).
// The format lives in ../../nnye01/scenes/yearkit.js (shared by nnye01–nnye12). Story 0–15.6, then the shared end card.
//   0.0   hook: "*Aquarius,* / sorting the year, / upside down."
//   2.4   LEAVING: "going quiet when it’s close" · "“it’s not a big deal”" (Aquarius: "noted. deleting.")
//   6.6   → KEEPING: "the wonderful weird ideas", the gift box closes.
//   10.85 "New year. | Same *heart.*"  THE STARS: "Let them *closer*. Stay you."
import { makeYear } from './yearkit.js'

const EP = makeYear({
  "sign": "aquarius",
  "name": "Aquarius",
  "hook": "*Aquarius,* | sorting the year, | upside down.",
  "hookPose": {
    "dx": 0,
    "dy": -40,
    "rot": 3.1416,
    "mood": "neutral",
    "look": [
      0,
      -1
    ]
  },
  "leave": [
    "vanishing when it gets close",
    "“not a big deal” (it is)"
  ],
  "keep": "the gloriously weird ideas",
  "quips": [
    {
      "t": 5.2,
      "text": "noted. teleporting out.",
      "dx": 250,
      "dy": 120
    }
  ],
  "last": "Let them *closer*. Stay you."
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES

export const HOOK = 'Aquarius is sorting | *upside down.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.4
