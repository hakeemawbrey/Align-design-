// nnye01: NEW YEAR, SAME HEART · Aries: what I'm keeping (18 s vertical, star_advice, music: pop · C).
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
  leave: ['rushing the yes', 'winning every argument'],
  keep: 'the courage to go first',
  quips: [{ t: 5.2, text: 'fine. FINE.', dx: 250, dy: 120 }],
  last: 'Still first in line. *Softer* now.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
