// nx2e16 (45 s vertical, "Star Talk Explains, Volume 2", ep 16) · story 0–40.6, then the default end card.
//   ❓ "What does *Sagittarius* season feel like?"  Teacher: ♐ SAGITTARIUS (pointer). Student: ♉ TAURUS. Pisces cries at
//   the back desk. THE SEASON BOARD: the Sun slides along the 12-slot strip into SAG (✓ about 22 Nov – 21 Dec, ending at
//   the December solstice), then ELEMENT · MODE · RULER (✦ fire, mutable, Jupiter), then the feel (✦ big questions,
//   adventure, honesty), then the tip (♥ honest lands best when it's gentle too).
//   Lightbulb (Taurus): "so: the truth, plus a blanket."  Last line: "Honest, *and* kind."
// The engine is ./x2kit.js (the series kit for episodes 16–30). Pure f(t).
import { seasonEpisode } from './x2kit.js'

const EP = seasonEpisode({
  id: 'nx2e16', sign: 'sagittarius', student: 'taurus', key: 'E', duration: 45,
  dates: 'ABOUT 22 NOV – 21 DEC', note: 'ENDS AT THE DECEMBER SOLSTICE',
  element: 'FIRE', mode: 'MUTABLE', ruler: 'JUPITER',
  feel: ['BIG QUESTIONS', 'ADVENTURE', 'HONESTY'],
  lines: [
    ['student', 'sag season? is that… *a vibe*, or a date?'],
    ['teacher', 'both! the Sun crosses my slot *every year.*', { tag: 'sky', mark: 'sky' }],
    ['teacher', 'and it ends at the *December solstice.*', { mark: 'note' }],
    ['teacher', 'in astrology: fire, mutable, ruled by *Jupiter.*', { tag: 'astro', mark: 'astro' }],
    ['teacher', 'astrologers say: big questions, *big trips.*', { mark: 'feel' }],
    ['teacher', 'and honesty. sometimes *very* blunt honesty.'],
    ['student', 'so you’ll tell me my scarf is *ugly?*'],
    ['teacher', 'honest lands best when it’s *gentle* too.', { tag: 'tip' }],
    ['student', 'so: the truth, plus *a blanket.*', { bulb: true }],
  ],
  items: ['About 22 Nov – *21 Dec*', 'Fire, mutable, *Jupiter*', 'Honest *and* gentle'],
  last: 'Honest, *and* kind.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
