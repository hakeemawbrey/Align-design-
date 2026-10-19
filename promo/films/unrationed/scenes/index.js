// UNRATIONED (series 2 · #7 · 15s · LOOK A "Film 1").
// Problem: generic paywall tiers flicker at you — "Paying to be seen?"
// Answer: founding member — "Stop rationing the stars." → the gold card stamps down — "The stars, unrationed."
// End: "Become a founding member." + lockup (PUT YOUR FAITH IN THE STARS, moon-phase row) → black.
//   0.00–4.55   hook.js       cold paywall tiles, hook line 0.04 → read by 0.70, turn 4.25 (tiles → stars)
//   4.45–10.95  founding.js   phone + caption 5.0–7.5, card lift 7.55, STAMP 8.22, "The stars, unrationed." 8.38–10.55
//   10.80–15.0  end.js        end line 10.95 → 11.87, lockup 12.3 → 13.3, fade 14.5–15.0
// Scene 0 is the one sky (mood cross-fades); the last scene is fx + the one grain layer (0.22) + the black plate.
import { backdrop as backdrop0, overlay } from './kit.js'
import hook, { drawHookFx, cues as hookCues } from './hook.js'
import founding, { drawFoundingFx, cues as foundCues } from './founding.js'
import end, { cues as endCues } from './end.js'


export const DURATION = 15
export const SCENES = [backdrop0, hook, founding, end, overlay([drawHookFx, drawFoundingFx])]
export const CUES = [...hookCues, ...foundCues, ...endCues]
