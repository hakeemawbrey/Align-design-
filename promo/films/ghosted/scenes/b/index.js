// Ghosted · half b (15.0–30.0): the answer. Tonight's deck → dealbreakers first → mutual → "Be chosen." + lockup.
// Starts on handoff H (Align card back at 960,540, PNG height 560, over the sky with the one moon) and ends on black.
import deck, { cues as deckCues } from './deck.js'
import end, { cues as endCues } from './end.js'
export const SCENES = [deck, end]
export const CUES = [...deckCues, ...endCues]
