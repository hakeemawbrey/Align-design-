// st13listen (30 s vertical Align ad, Star Talk season 13 "Star Talk Explains", S13 E25) · story 0–25.6, then the end card.
//   ❓ "How do you *actually* listen?"  ♈ ARIES (student) fixed everything the moment a friend vented; ♓ PISCES teaches
//   three steps on the board: ♥ 1 reflect back what you heard · 2 ask one question · ♥ 3 wait before fixing.
//   Last line (PISCES): "Hear it *before* you fix it."
// The engine is ./classkit.js (this folder's copy); the season kit is ../../stexplain.js. Pure f(t).
import { signStar } from '../../startalk.js'
import { makeEpisode } from './classkit.js'

const PIS = signStar('pisces'), ARI = signStar('aries')
const AQUA = '#9fe8ff', YEL = '#ffe08a'

const step = (y, n, word, note, at) => [
  { kind: 'circle', x: 30, y, r: 30, at, dur: 0.45, color: AQUA, width: 5 },
  { kind: 'text', text: n, x: 30, y: y + 2, at: [at[0], at[1] + 0.3], size: 40, color: AQUA, align: 'center' },
  { kind: 'text', text: word, x: 84, y: y - 14, at: [at[0], at[1] + 0.35], size: 50, cps: 16 },
  { kind: 'text', text: note, x: 86, y: y + 38, at: [at[0], at[1] + 0.9], size: 26, color: YEL, cps: 30 },
]

const EP = makeEpisode({
  id: 'st13listen', numeral: 'S13 E25', duration: 30, key: 'D',
  q: 'How do you *actually* listen?', qAccent: AQUA,
  teacher: { tag: '♓ PISCES', color: PIS.color, glyph: PIS.glyph, pitch: 494 },
  student: { tag: '♈ ARIES', color: ARI.color, glyph: ARI.glyph, pitch: 659 },
  board: { title: 'LISTENING, 3 STEPS' },
  lines: [
    ['s', 'my friend vented, so I fixed *everything.*'],
    ['t', "1. reflect: 'sounds like a *lot*.'"],
    ['t', "2. ask *one* question: 'what was worst?'"],
    ['t', '3. *wait* before you jump to fixing.'],
    ['s', 'so my fix list can wait in *drafts.*', { bulb: true }],
  ],
  chalk: [
    ...step(90, '1', 'REFLECT', "'sounds like a lot'", [1, 0.2]),
    { kind: 'tag', tag: 'tip', x: 900, y: 90, at: [1, 0.3] },
    ...step(240, '2', 'ASK ONE', "'what was the worst part?'", [2, 0.2]),
    ...step(390, '3', 'WAIT', 'then fix, if they want it', [3, 0.2]),
    { kind: 'tag', tag: 'tip', x: 900, y: 390, at: [3, 0.3] },
  ],
  recap: ['*Reflect* what you heard', 'Ask *one* question', '*Wait* before you fix'],
  last: 'Hear it *before* you fix it.', lastWho: 't',
  moods(ph, t, T) {
    if (ph === 'q') return [{ mood: 'happy' }, { mood: 'wide', look: [1, -1] }]
    if (ph === 0) return [{ mood: 'wide', look: [-1, 0] }, { mood: 'happy', look: [1, 0] }]
    if (ph === 1 || ph === 2) return [{ mood: 'sparkle', look: [-1, -1] }, { mood: 'neutral', look: [1, -1] }]
    if (ph === 3) return [{ mood: 'happy', look: [-1, 0] }, { mood: 'squint', look: [1, -1] }]
    if (ph === 4) return [{ mood: 'heart', look: [-1, 0] }, { mood: 'sparkle', look: [1, 0] }]
    return [{ mood: 'happy', look: [0, 0] }, { mood: 'happy', look: [1, 0] }]
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
