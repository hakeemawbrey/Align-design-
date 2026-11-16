// og-nnye01: OG social cut of nnye01 (static outline HOOK 0–2.4 replaces the popped hook headline; no bug, flashes, shake or
// end-card fade; the sign pushed further in its tags and quip). Kit: ./yearkit.js (og copy of ../../nnye01/scenes/yearkit.js).
// Was: nnye01: NEW YEAR, SAME HEART · Aries: what I'm keeping (18 s vertical, star_advice, music: pop · C).
// The format lives in ./yearkit.js (shared by nnye01–nnye12). Story 0–15.6, then the shared end card.
//   0.0   hook: "*Aries*, | before you sprint | into next year…" ♈ mid-hop, leaning forward like a sprinter.
//   2.4   LEAVING: "rushing the yes" · "winning every argument" (♈: "fine. FINE.")
//   6.6   → KEEPING: "the courage to go first" (♈ hugs it), the gift box closes.
//   10.85 "New year. | Same *heart.*"  THE STARS: "Still first in line. *Softer* now."  Pisces fountains on the box.
import { makeYear } from './yearkit.js'

const EP = makeYear({
  sign: 'aries', name: 'Aries',
  hook: '*Aries,* | before you sprint | into next year…',
  hookPose: { dx: -60, dy: -20, rot: 0.22, mood: 'squint', look: [1, 0] },
  leave: ['yes before the question ends', 'out-arguing the toaster'],
  keep: 'the courage to go first',
  quips: [{ t: 5.2, text: 'FINE. I’ll leave them FIRST.', dx: 170, dy: 120 }],
  last: 'Still first in line. *Softer* now.',
})
export const HOOK = "Aries is already | *in next year.*"
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.4
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
