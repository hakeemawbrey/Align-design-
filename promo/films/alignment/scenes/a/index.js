// alignment · part A (0–20.2): How do two charts align? → Here are two charts. → Lay one over the other. → H.
// PLACEMENTS / TRACK / TINT / drawPlacements (placements.js) are the shared chart positions for parts B and C.
import a1, { cues as c1 } from './a1-charts.js'
export { PLACEMENTS, TRACK, TINT, TINT_RGB, PLACE, drawOrb, drawOrbLabel, drawSignWash, drawTrack, drawPlacements } from './placements.js'
export const SCENES = [a1]
export const CUES = [...c1]
