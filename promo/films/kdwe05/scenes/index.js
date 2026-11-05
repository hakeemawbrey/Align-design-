// kdwe05 · Don't Watch This If You're a ___ · "Gemini's Three Group Chats" (16 s vertical, hard cut) · pop · G
//   0      Gemini smacking a phone on the lens; "GEMINI. | Scroll *before* you see." · scratch + freeze · whip out
//   1.5    three phones fan in: "the besties", "work friends", "cousins" · "Same crush. | *Three* stories."
//   2.0    "it's nothing" · 2.8 "we're basically dating" · 3.6 "who?"
//   5.8    notification drop: CRUSH ♡ "hey :)" → 6.4 all three chats explode, shake
//   8.3    ♊ "okay. *one* story. i like them." · 10.6 Pisces sobbing: "they said *HEY!!*"
//   14.2   "Three chats. *One* crush. | Zero chill." · hard cut at 16
import { dwFilm, tag, HK } from '../../kdwe01/dwkit.js'
import { prog, ease, lerp } from '../../../src/lib.js'

const GE = tag('gemini'), PI = tag('pisces')
const NOTE = 5.8, BOOM = 6.4
const CHATS = [
  { title: 'the besties', X: 190, rot: -0.07, mine: { at: 2.0, text: "it's nothing" }, them: [['WHAT', 6.5], ['hey?? HEY??', 6.9], ['screenshot it', 7.4]] },
  { title: 'work friends', X: 540, rot: 0, mine: { at: 2.8, text: "we're basically dating" }, them: [['wait who', 6.6], ['since WHEN', 7.0], ['details pls', 7.5]] },
  { title: 'cousins', X: 890, rot: 0.07, mine: { at: 3.6, text: 'who?' }, them: [['you said WHO', 6.7], ['lol', 7.1], ['tell auntie', 7.6]] },
]
const F = dwFilm({
  id: 'kdwe05', sign: 'gemini', dur: 16, ending: 'cut',
  hook: 'GEMINI.|Scroll *before* you see.', hookOut: 1.3, scratch: 'too late. *three chats.*',
  lens: { mood: 'wide', look: [1, 0] }, pull: { x: 540, y: 1270, s: 300 },
  shots: [{ at: 0, cam: [1, 540, 960] }, { at: 8.2, cam: [1.15, 540, 1150] }, { at: 10.5, cam: [1, 540, 1000] }],
  shakes: [BOOM],
  heads: [
    { text: 'Same crush.|*Three* stories.', at: 1.45, out: [5.5, 5.75], top: 1450, size: 80 },
    { text: 'Three chats. *One* crush.|Zero chill.', at: 14.2, top: 250, size: 84 },
  ],
  boxes: [
    { open: 8.2, close: 10.4, lines: [{ t: 8.35, speaker: GE, text: 'okay. *one* story. i like them.', color: '#ffe27a' }] },
    { open: 10.75, close: 13.6, lines: [{ t: 10.9, speaker: PI, text: 'they said *HEY!!*', color: '#9fd7ff' }] },
  ],
  pitch: { [GE]: 783.99, [PI]: 1046.5 },
  fx: [{ f: HK.notification, c: HK.notificationCues, o: { at: NOTE, out: [7.9, 8.15], title: 'messages', body: 'CRUSH ♡: *hey* :)', glyph: '♡', y: 140 } }],
  paint(x, t, K) {
    K.room(x, t, { wall: '#3a3050', wall2: '#1e1834', floor: '#2e2840', window: true, frame: '#ffe27a' })
    K.box(x, 120, 1340, 840, 40, '#7a6a9a')
    if (t > 10.5) K.pisces(x, t, { x: 860, y: 1230, s: 250, pop: K.pop01(t, 10.55, 0.4), look: [-1, -0.3], tears: 3 })
    if (!K.hide) {
      const panic = t > BOOM && t < 8.2
      K.star(x, t, 'gemini', { x: 540 + (panic ? Math.sin(t * 40) * 10 : 0), y: 1270, s: 300, mood: t < NOTE ? 'wink' : t < 8.2 ? 'wide' : t < 10.5 ? 'heart' : 'happy', look: t < 5 ? [0, -1] : [0, 0], seed: 7 })
    }
  },
  over(x, t, K) {
    const out = K.outK(t, [7.95, 8.2])
    if (out <= 0.01) return
    CHATS.forEach((c, i) => {
      const k = K.pop01(t, 1.5 + i * 0.12, 0.35) * out
      const bubbles = [{ side: 'R', text: c.mine.text, at: c.mine.at }, ...c.them.map(([s, at]) => ({ side: 'L', text: s, at }))]
      // once the chat explodes, older bubbles scroll up
      const shift = ease.outCubic(prog(t, BOOM, BOOM + 0.8))
      K.phone(x, t, { X: c.X, Y: 760 - shift * 0, w: 350, h: 620, rot: c.rot + (t > BOOM && t < 8 ? Math.sin(t * 30 + i) * 0.03 : 0), pop: k, title: c.title, time: '11:58', bubbles, size: 26 })
    })
  },
  cues: [
    ['whoosh', 1.45, 0.3, 0.04], ...[0, 1, 2].map(i => ['pop', 1.55 + i * 0.12, 659.25 + i * 120, 0.035, i - 1]),
    ['pop', 2.0, 987.77, 0.04, -0.4], ['pop', 2.8, 987.77, 0.04, 0], ['pop', 3.6, 987.77, 0.04, 0.4],
    ...CHATS.flatMap(c => c.them.map(([_, at]) => ['pop', at, 1174.66, 0.035, c.X / 540 - 1])),
    ['pop', 10.6, 783.99, 0.05, 0.3], ['glitter', 10.6, 12],
  ],
  music: { style: 'pop', key: 'G', seed: 4105, sections: { drop: 1.42, lift: [BOOM] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
