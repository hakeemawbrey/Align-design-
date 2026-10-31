// st13feelings (30 s vertical Align ad, Star Talk season 13 "Star Talk Explains", S13 E24) · story 0–25.6, then the end card.
//   ❓ "How do you *say* how you feel?"  ♉ TAURUS (student) goes quiet and hopes they guess; ♊ GEMINI teaches the frame
//   ♥ "I feel ___ when ___. I need ___." and the board fills it in with a real example (lonely / plans change late /
//   a heads-up text). Last line (GEMINI): "Feel. When. *Need*."
// The engine is ./classkit.js (this folder's copy); the season kit is ../../stexplain.js. Pure f(t).
import { signStar } from '../../startalk.js'
import { makeEpisode } from './classkit.js'

const GEM = signStar('gemini'), TAU = signStar('taurus')
const PINK = '#ff8fb1', MINT = '#8ff0c0', YEL = '#ffe08a'

// a row of the frame: the stem, a chalk blank, then the example written over the blank
const row = (y, stem, fill, at, fillAt, color, w = 300) => {
  const sx = stem.length * 52 * 0.6 + 24
  return [
    { kind: 'text', text: stem, x: 0, y, at, size: 52, cps: 18 },
    { kind: 'line', at: [at[0], at[1] + 0.45], dur: 0.35, width: 5, pts: [[sx, y + 30], [sx + w, y + 30]] },
    { kind: 'text', text: fill, x: sx + 6, y: y + 2, at: fillAt, size: 42, color, cps: 18 },
  ]
}

const EP = makeEpisode({
  id: 'st13feelings', numeral: 'S13 E24', duration: 30, key: 'G',
  q: 'How do you *say* how you feel?', qAccent: YEL,
  teacher: { tag: '♊ GEMINI', color: GEM.color, glyph: GEM.glyph, pitch: 587 },
  student: { tag: '♉ TAURUS', color: TAU.color, glyph: TAU.glyph, pitch: 392 },
  board: { title: 'SAY IT IN 3 BLANKS' },
  lines: [
    ['s', 'I just go quiet and hope they *guess.*'],
    ['t', 'try three blanks: *feel*, when, need.'],
    ['t', "'I feel *lonely* when plans change late...'"],
    ['t', "'...I need a *heads-up* text.' that's it."],
    ['s', 'way better than my *silent treatment.*', { bulb: true }],
  ],
  chalk: [
    ...row(110, 'I feel', 'lonely', [1, 0.3], [2, 0.5], PINK, 260),
    ...row(240, 'when', 'plans change late', [1, 0.9], [2, 1.2], YEL, 470),
    ...row(370, 'I need', 'a heads-up text', [1, 1.5], [3, 0.6], MINT, 420),
    { kind: 'tag', tag: 'tip', x: 900, y: 110, at: [1, 0.3] },
    { kind: 'tag', tag: 'tip', x: 900, y: 440, at: [3, 0.4] },
  ],
  recap: ['*Feel*: name the feeling', '*When*: what happened', '*Need*: one clear ask'],
  last: 'Feel. When. *Need*.', lastWho: 't',
  moods(ph, t, T) {
    if (ph === 'q') return [{ mood: 'happy' }, { mood: 'wide', look: [1, -1] }]
    if (ph === 0) return [{ mood: 'wide', look: [-1, 0] }, { mood: 'sleepy', look: [1, 0] }]
    if (ph === 1) return [{ mood: 'wink', look: [-1, -1] }, { mood: 'neutral', look: [1, -1] }]
    if (ph === 2) return [{ mood: 'neutral', look: [-1, -1] }, { mood: 'wide', look: [1, -1] }]
    if (ph === 3) return [{ mood: 'happy', look: [-1, 0] }, { mood: 'wide', look: [1, -1] }]
    if (ph === 4) return [{ mood: 'happy', look: [-1, 0] }, { mood: 'sparkle', look: [1, 0] }]
    return [{ mood: 'happy', look: [0, 0] }, { mood: 'happy', look: [1, 0] }]
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
