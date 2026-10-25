// htxmuseum (30 s vertical Align ad): "Classic Houston first date: the Museum District." → "…and you're still guessing
// who they are." → on Align you see who they are first (the mystery card hangs in a gallery frame; Sun/Moon/Rising and
// dealbreaker placards; a talk card) → "Skip the guessing." → shared end card ("come" + the Align logo).
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import * as F from './film.js'
export const DURATION = 30
const END = DURATION - ENDCARD_LEN          // 25.6
// card-motif cuts: each lands where one beat has cleared and the next is about to pop in
//   5.42  the dive through the door → the gallery frames (5.45) / "…and you're still" (5.5)
//   11.12 the gallery clears (10.75–11.1) → "You see who they are first." (11.2) as the middle frame grows
//   12.27 the velvet drape drops: a card back turns over onto the mystery card (the unveil, 12.27)
//   17.05 the placards / painting beat out (16.75–17.07) → "Skip the small talk." (17.15)
//   21.50 the talk card shrinks away → "Skip the guessing." (21.6)        · the end card does its own card flip at 25.6
const CUTS = [{ t: 5.42, kind: 'shuffle' }, { t: 11.12, kind: 'fan' }, { t: 12.27, kind: 'flip' }, { t: 17.05, kind: 'deal' }, { t: 21.5, kind: 'shuffle' }]
export const SCENES = [...F.SCENES, (stage) => buildEndcard(stage, { start: END }), cardFrame({ start: 0, end: END }), cardCuts(CUTS)]
export const CUES = [...F.CUES, ...cardCutCues(CUTS), ...endcardCues(END)]
