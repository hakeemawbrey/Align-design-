// st13goodbye (30 s vertical Align ad, Star Talk season 13 "Star Talk Explains", S13 E27) · story 0–25.6, then the end card.
//   ❓ "How do you *end* things kindly?"  ♋ CANCER (student) has been "busy this week" for a month; ☽ THE MOON teaches:
//   ♥ be clear, be brief, be kind, and don't leave the door half open (the board shows a short, kind message) ·
//   ♥ kind isn't the same as vague ("maybe sometime?" crossed out). Last line (THE MOON): "Close the door *kindly*."
// The engine is ./classkit.js (this folder's copy); the season kit is ../../stexplain.js. Pure f(t).
import { signStar } from '../../startalk.js'
import { makeEpisode } from './classkit.js'

const CAN = signStar('cancer')
const MOONC = '#e9e4ff', MOONLIGHT = '#bcd2ff', PINK = '#ff8fb1', YEL = '#ffe08a'

const EP = makeEpisode({
  id: 'st13goodbye', numeral: 'S13 E27', duration: 30, key: 'Eb',
  q: 'How do you *end* things kindly?', qAccent: MOONLIGHT,
  teacher: { tag: '☽ THE MOON', color: MOONC, glyph: '☽', accent: MOONLIGHT, pitch: 330 },
  student: { tag: '♋ CANCER', color: CAN.color, glyph: CAN.glyph, pitch: 523 },
  board: { title: 'ENDING IT KINDLY' },
  lines: [
    ['s', "I've been 'busy this week' for a *month.*"],
    ['t', 'be *clear*, be brief, be kind.'],
    ['t', 'a short message like this is *enough*.'],
    ['t', "kind isn't the same as *vague*."],
    ['s', "so 'busy' was a door left half *open.*", { bulb: true }],
  ],
  chalk: [
    // beat 1: the rule
    { kind: 'text', text: '*CLEAR* · BRIEF · KIND', x: 0, y: 66, at: [1, 0.2], size: 34, cps: 20 },
    { kind: 'tag', tag: 'tip', x: 900, y: 66, at: [1, 0.3] },
    // beat 2: the message, in a chalk note
    { kind: 'line', at: [2, 0.1], dur: 0.6, width: 5, color: MOONLIGHT, pts: [[0, 120], [640, 120], [640, 330], [0, 330], [0, 120]] },
    { kind: 'text', text: "hey, I've enjoyed our dates,|but I don't feel we're a match.|I wish you the *best*.", x: 26, y: 166, at: [2, 0.5], size: 32, cps: 40, lineH: 1.45 },
    // beat 3: vague isn't kind
    { kind: 'text', text: "'maybe sometime?'", x: 0, y: 408, at: [3, 0.25], size: 38 },
    { kind: 'line', at: [3, 1.1], dur: 0.35, color: PINK, width: 7, pts: [[-6, 410], [400, 404]] },
    { kind: 'text', text: '= vague', x: 420, y: 408, at: [3, 1.3], size: 30, color: YEL },
    { kind: 'tag', tag: 'tip', x: 900, y: 446, at: [3, 0.3] },
  ],
  recap: ['*Clear*, brief and kind', 'No door left *half* open', "Kind isn't *vague*"],
  last: 'Close the door *kindly*.', lastWho: 't',
  moods(ph, t, T) {
    if (ph === 'q') return [{ mood: 'sleepy' }, { mood: 'wide', look: [1, -1] }]
    if (ph === 0) return [{ mood: 'wide', look: [-1, 0] }, { mood: 'squint', look: [1, 0] }]
    if (ph === 1 || ph === 2) return [{ mood: 'happy', look: [-1, -1] }, { mood: 'neutral', look: [1, -1] }]
    if (ph === 3) return [{ mood: 'neutral', look: [-1, -1] }, { mood: 'wide', look: [1, -1] }]
    if (ph === 4) return [{ mood: 'happy', look: [-1, 0] }, { mood: 'sparkle', look: [1, 0] }]
    return [{ mood: 'happy', look: [0, 0] }, { mood: 'happy', look: [1, 0] }]
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
