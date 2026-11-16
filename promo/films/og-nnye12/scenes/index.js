// og-nnye12: social rework of nnye12 (static HOOK box 0–2.4, kit copy ./yearkit.js: no bug/flash/shake/end card, crazier lines).
// Was: nnye12: NEW YEAR, SAME HEART · Pisces: what I'm keeping (18 s vertical, star_advice, music: dreamy · Ab).
// The format lives in ../../nnye01/scenes/yearkit.js (shared by nnye01–nnye12). Story 0–15.6, then the shared end card.
//   0.0   hook: "*Pisces,* / it’s ok, / you can cry."
//   2.4   LEAVING: "loving someone’s potential" · "saying sorry for my feelings" (Pisces: "*sniff* goodbye!")
//   6.6   → KEEPING: "the soft heart", the gift box closes.
//   10.85 "New year. | Same *heart.*"  THE STARS: "Same heart. *Braver* now."
import { makeYear } from './yearkit.js'

const EP = makeYear({
  "sign": "pisces",
  "name": "Pisces",
  "hook": "*Pisces,* | it’s ok, | you can cry.",
  "hookPose": {
    "dx": 0,
    "dy": 0,
    "rot": -0.06,
    "mood": "sparkle",
    "look": [
      0,
      0
    ]
  },
  "leave": [
    "loving their 5-year potential",
    "sorry for crying (mid-cry)"
  ],
  "keep": "the soft, soggy heart",
  "quips": [
    {
      "t": 5.2,
      "text": "*sob* bye, little box!",
      "dx": 250,
      "dy": 120
    }
  ],
  "last": "Same heart. *Braver* now.",
  "heroIsPisces": true
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES

export const HOOK = 'Pisces is crying | *about the boxes.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.4
