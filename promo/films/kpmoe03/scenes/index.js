// kpmoe03 · Planet Talk: The Moon · to Gemini · "Gemini's Other Side" (22 s vertical, hard cut) · pop · G
//   0      frame 0: the Moon mid-spin, whipping in; Gemini mid-typing "lol I'm fine!!" into five chats at once;
//          "GEMINI. | I see your *other side.*" · 0.9 record scratch + freeze: "yep. *five* chats."
//   2.4    "Fine in *five* chats." · 5.3 flash → 2:00 AM, Gemini on the floor
//   5.8    the Moon: "fun fact. i only ever show earth *one face.*" · 9.2 "but the other side? still *there.*"
//  12.2    the Moon: "show one person the *other side.*" · 15.2 the phone: to bestie "actually… not fine"
//  17.0    "coming over." in one second · 18.4 the best friend pops in for a hug · Pisces sobs
//  20.4    "Two faces. | *One* honest text." · hard cut at 22.0
import { moonFilm } from '../../kpmoe01/moonkit.js'
import { prog, ease } from '../../../src/lib.js'

const TWO = 5.3, TXT = 15.2, BFF = 18.4
const CHATS = [
  { t: 'the besties', X: 170, Y: 1120, r: -0.2 }, { t: 'work', X: 360, Y: 930, r: -0.08 },
  { t: 'cousins', X: 720, Y: 930, r: 0.08 }, { t: 'gym crew', X: 910, Y: 1120, r: 0.2 }, { t: 'mum', X: 900, Y: 1560, r: 0.12 },
]

const F = moonFilm({
  id: 'kpmoe03', sign: 'gemini', dur: 22, ending: 'cut',
  hook: { text: 'GEMINI. | I see your *other side.*', out: [2.2, 2.4] },
  enter: { kind: 'spin', at: -0.55, x: 770, y: 560, size: 380 },
  whip: false,
  freeze: { at: 0.9, len: 1.1, caption: 'yep. *five* chats.' },
  flashes: [TWO],
  moon: [
    { at: 0, mood: 'wide' },
    { at: 2.0, mood: 'sly' },
    { at: TWO, x: 760, y: 560, mood: 'sad' },
    { at: 9.1, mood: 'neutral' },
    { at: 12.1, mood: 'happy' },
    { at: 17.0, mood: 'love' },
  ],
  me: [
    { at: 0, x: 540, y: 1330, s: 300, mood: 'happy', look: [0, 1], squash: 0.05 },
    { at: 2.0, mood: 'wink', squash: 0 },
    { at: TWO, x: 360, y: 1470, s: 280, mood: 'sleepy', look: [0, 1], tears: 1, d: 0.01 },
    { at: 5.9, mood: 'neutral', look: [1, -0.6] },
    { at: 9.1, mood: 'sparkle', tears: 1 },
    { at: TXT, mood: 'squint', look: [1, 0.2], tears: 0 },
    { at: 17.0, mood: 'sparkle', tears: 2, look: [1, 0] },
    { at: BFF, x: 300, mood: 'happy', tears: 2, look: [1, 0] },
  ],
  meHops: [0.2, 0.45, 17.1, BFF + 0.3],
  pis: { x: 200, y: 560, s: 150, keys: [{ at: 0, tears: 1, mood: 'wide' }, { at: TWO, tears: 2, mood: 'sparkle', look: [1, 0.4] }, { at: 17.2, tears: 3, mood: 'happy', s: 190 }], sobs: [9.4, 17.4], hops: [17.4, 17.8] },
  says: [
    { t0: 5.8, t1: 8.9, who: 'moon', text: 'fun fact. i only ever show earth *one face.*', x: 540, y: 950, tail: 200, tailUp: true },
    { t0: 9.2, t1: 11.9, who: 'moon', text: 'but the other side? still *there.*', x: 540, y: 950, tail: 200, tailUp: true },
    { t0: 12.2, t1: 15.0, who: 'moon', text: 'show one person the *other side.*', x: 540, y: 950, tail: 200, tailUp: true },
  ],
  heads: [
    { text: 'Fine in *five* chats.', at: 2.4, out: [5.0, 5.25], top: 240, size: 84 },
    { text: 'Two faces. | *One* honest text.', at: 20.4, top: 230, size: 96 },
  ],
  set(x, t, K) {
    const late = t >= TWO
    K.room(x, t, late ? { wall: '#1e1a40', wall2: '#0f0c28', floor: '#221d3a', warm: 0, lamp: false } : { wall: '#3a2a5e', wall2: '#22183e', floor: '#3a2c50', warm: 0.6 })
    if (late) { K.box(x, 90, 1020, 230, 90, K.INK, { o: 5 }); K.txt(x, '2:00 AM', 205, 1066, { size: 46, font: K.INTER, weight: 900, color: '#ff8fb1' }) }
  },
  front(x, t, K) {
    // the best friend (Sagittarius) pops in for a hug
    if (t >= BFF) {
      const k = K.pop01(t, BFF, 0.4)
      K.drawSign(x, 'sagittarius', 600, 1460, 260 * k, t, { mood: 'happy', look: [-1, 0], seed: 9, hops: [BFF + 0.8] })
    }
  },
  over(x, t, K) {
    // the five chats (frame 0 → 2 a.m.)
    const out = 1 - ease.inCubic(prog(t, TWO - 0.3, TWO))
    if (out > 0.01) CHATS.forEach((c, i) => K.phone(x, t, { X: c.X, Y: c.Y, w: 240, h: 330, rot: c.r, pop: out, title: c.t, time: '9:41', size: 20, bubbles: [{ side: 'R', text: 'lol I’m fine!!', at: i * 0.12 - 0.75 }] }))
    // the honest text
    const k = ease.outBack(prog(t, TXT - 0.2, TXT + 0.15)) * (1 - ease.inCubic(prog(t, BFF - 0.3, BFF)))
    if (k > 0.01) K.phone(x, t, { X: 760, Y: 1340, w: 420, h: 600, rot: 0.05, pop: k, title: 'bestie', time: '2:00', size: 28, bubbles: [{ side: 'L', text: 'u ok? you went quiet', at: null }, { side: 'R', text: 'actually… not fine', at: TXT + 0.6 }, { side: 'L', text: 'coming over.', at: 17.0 }] })
  },
  cues: [
    ['pop', 0.05, 1046.5, 0.03, -0.3], ['pop', 0.17, 1174.66, 0.03, 0.3], ['pop', 0.29, 1318.51, 0.03, -0.2],
    ['bell', TWO, 523.25, 0.04, 2.0, 0], ['pop', TXT + 0.6, 880, 0.04, 0.2], ['pop', 17.0, 1318.51, 0.05, -0.2], ['glitter', 17.0, 18.2],
    ['pop', BFF, 783.99, 0.05, 0.2], ['glitter', BFF, BFF + 1.2],
  ],
  music: { style: 'pop', key: 'G', seed: 20203, sections: { drop: 2.2, breakdown: [TWO], lift: [17.0] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
