// Pattern · half b (15.0–30.0): the answer. The alignment reading: "See the pattern before you fall." → the card's
// Push / Pull / Align rows ("Push. Pull. Align.") → screen-alignment "Venus rules you both." → the chakra lock →
// "Break the pattern." + lockup (BLIND BY DESIGN). Starts on handoff H (Juniper's veiled card, body h 600 at 960,540,
// over the sky with the one moon) and ends on black.
import read, { cues as readCues } from './read.js'
import end, { cues as endCues } from './end.js'
export const SCENES = [read, end]
export const CUES = [...readCues, ...endCues]
