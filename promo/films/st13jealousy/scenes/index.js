// st13jealousy (45 s vertical Align ad, Star Talk season 13 "Star Talk Explains", S13 E23) · story 0–40.6, then the end card.
//   ❓ "Where does *jealousy* come from?"  ♊ GEMINI (student) spiralled over a liked pic; ♏ SCORPIO teaches at the board:
//   ♥ jealousy is a normal feeling · ♥ it often points to a fear or a need (an iceberg: the feeling above the waterline,
//   fear? / need? below) · ♥ talk about the need, don't police the person. Last line (SCORPIO): "Name it. Don't *aim* it."
// The engine is ./classkit.js (this folder's copy); the season kit is ../../stexplain.js. Pure f(t).
import { signStar } from '../../startalk.js'
import { makeEpisode } from './classkit.js'

const SCO = signStar('scorpio'), GEM = signStar('gemini')
const ICE = '#9fd8ff', WATER = '#5f8fe0', PINK = '#ff8fb1', MINT = '#8ff0c0'

const EP = makeEpisode({
  id: 'st13jealousy', numeral: 'S13 E23', duration: 45, key: 'Bb',
  q: 'Where does *jealousy* come from?', qAccent: '#8ff0a8',
  teacher: { tag: '♏ SCORPIO', color: SCO.color, glyph: SCO.glyph, pitch: 349 },
  student: { tag: '♊ GEMINI', color: GEM.color, glyph: GEM.glyph, pitch: 659 },
  board: { title: 'JEALOUSY' },
  lines: [
    ['s', 'my partner liked a pic and I *spiraled.*'],
    ['t', 'first: jealousy is a *normal* feeling.'],
    ['s', "wait, so I'm not a *monster?*"],
    ['t', "nope. but let's look *under* it."],
    ['t', 'it often points to a *fear*, or a *need*.'],
    ['s', 'so... should I check their *phone?*'],
    ['t', "no. don't *police* the person."],
    ['t', 'talk about the *need* instead.'],
    ['t', "like: 'I felt left out. *date night* soon?'"],
    ['s', "so it's a *flashlight*, not a weapon.", { bulb: true }],
  ],
  chalk: [
    // beat 1: a normal feeling
    { kind: 'text', text: 'jealousy = *normal*', x: 0, y: 64, at: [1, 0.3], size: 40 },
    { kind: 'tag', tag: 'tip', x: 900, y: 64, at: [1, 0.3] },
    // beat 2: the iceberg (the feeling on top, the fear or need underneath)
    { kind: 'line', at: [3, 0.2], dur: 0.5, color: WATER, width: 4, dash: [14, 10], pts: [[0, 190], [500, 190]] },
    { kind: 'line', at: [3, 0.5], dur: 0.5, color: ICE, pts: [[130, 190], [180, 130], [215, 150], [250, 118], [300, 190]] },
    { kind: 'text', text: 'the feeling', x: 320, y: 146, at: [3, 0.9], size: 28 },
    { kind: 'line', at: [4, 0.1], dur: 0.8, color: ICE, pts: [[130, 190], [60, 260], [110, 330], [330, 336], [400, 262], [300, 190]] },
    { kind: 'text', text: 'fear?', x: 150, y: 240, at: [4, 0.75], size: 38, color: PINK },
    { kind: 'text', text: 'need?', x: 200, y: 296, at: [4, 1.15], size: 38, color: MINT },
    { kind: 'tag', tag: 'tip', x: 900, y: 262, at: [4, 0.3] },
    // beat 3: don't police the person, talk about the need
    { kind: 'text', text: 'police the person', x: 0, y: 392, at: [6, 0.3], size: 34 },
    { kind: 'line', at: [6, 1.2], dur: 0.35, color: PINK, width: 7, pts: [[-6, 394], [358, 390]] },
    { kind: 'text', text: 'talk about the *need*', x: 0, y: 448, at: [7, 0.3], size: 34, color: MINT },
    { kind: 'tag', tag: 'tip', x: 900, y: 420, at: [7, 0.3] },
  ],
  recap: ['Jealousy is a *normal* feeling', 'It points to a *fear* or a need', "Talk the need, don't *police*"],
  last: "Name it. Don't *aim* it.", lastWho: 't',
  moods(ph, t, T) {
    if (ph === 'q') return [{ mood: 'neutral' }, { mood: 'wide', look: [1, -1] }]
    if (ph === 0) return [{ mood: 'wide', look: [-1, 0] }, { mood: 'squint', look: [1, 0] }]
    if (ph === 1) return [{ mood: 'happy', look: [-1, 0] }, { mood: 'neutral', look: [1, -1] }]
    if (ph === 2) return [{ mood: 'happy', look: [-1, 0] }, { mood: 'wide', look: [1, 0] }]
    if (ph === 3 || ph === 4) return [{ mood: 'neutral', look: [-1, -1] }, { mood: 'wide', look: [1, -1] }]
    if (ph === 5) return [{ mood: 'squint', look: [-1, 0] }, { mood: 'wink', look: [1, 0] }]
    if (ph === 6 || ph === 7 || ph === 8) return [{ mood: 'happy', look: [-1, -1] }, { mood: 'neutral', look: [1, -1] }]
    if (ph === 9) return [{ mood: 'heart', look: [-1, 0] }, { mood: 'sparkle', look: [1, 0] }]
    return [{ mood: 'happy', look: [0, 0] }, { mood: 'happy', look: [1, 0] }]
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
