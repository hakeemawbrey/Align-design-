// r2a0202: star_advice, ADVICE SOLO, "Taurus, you can | *reply later.*" (~48 s, signs3kit social cut, lofi · F)
// One sign the whole way: nine moments a Taurus feels pressure to reply right now, each with a warm reframe. Ending: callback.
//   0.0–3.6    "Taurus, you can | *reply later.*"
//   3.6–37.8   nine cards: mid-pasta, the text can wait · left it on read: allowed · 87 new messages: mute it
//              · watering the plants comes first · draft six: send it when ready · a work text at 10 pm: morning you
//              · phone on silent is self-care · a new match will wait for the real you · reply when it feels good
//  37.8        "Your time | is *yours.*"
//  41.2        CALLBACK: "Three days later: | *"haha, yes!"*"  The group chat finally gets its reply.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const GREEN = '#7ad35a', LEAF = '#3fae5a', RED = '#ff5a4f'

// a phone: dark body, a screen, and whatever fn draws on it (screen-local coords, 220 × 360 centred)
function phone(x, cx, cy, k, fn, { rot = 0.05, buzz = 0, t = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx + (buzz ? Math.sin(t * 60) * 5 * buzz : 0), cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-124, -200, 260, 412)
  x.fillStyle = INK; x.fillRect(-136, -212, 272, 424)
  x.fillStyle = '#2a2350'; x.fillRect(-128, -204, 256, 408)
  x.fillStyle = '#140c30'; x.fillRect(-112, -180, 224, 360)
  x.fillStyle = '#6b62a8'; x.fillRect(-24, 188, 48, 8)
  if (fn) fn()
  x.restore()
}
const txt = (x, s, yy, { size = 30, col = BONE, font = INTER, w = 800 } = {}) => { x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, 0, yy) }
const BOWL = ['..YYYYYYYY..', '.YRYYYYRYYY.', 'YYYYRYYYYRYY', 'WWWWWWWWWWWW', '.WWWWWWWWWW.', '..WWWWWWWW..', '....WWWW....']
const PLANT = ['....L.L....', '...LLLLL...', '..LL.L.LL..', '.LL..L..LL.', '.....L.....', '.....L.....', '..TTTTTTT..', '..TTTTTTT..', '...TTTTT...', '...TTTTT...']
const CAN = ['.......B', 'BBBBBBB.', 'BSSSSSB.', 'BSSSSSB.', 'BSSSSSB.', 'BBBBBBB.']
const MOON = ['..YYY.', '.YY...', 'YY....', 'YY....', 'YY....', '.YY...', '..YYY.']

const CAMEOS = [
  { sign: 'taurus', cap: 'Mid-pasta? The text | *can wait.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BOWL, { Y: '#ffe08a', R: '#ff6b5a', W: '#fff4e2' }, 760, 1040, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      phone(x, 820, 740, 0.62 * pop01(t, P.t0 + 0.5, 0.3, 2), () => { txt(x, 'new text', -40, { size: 34 }); txt(x, 'later.', 30, { size: 40, col: GOLD }) }, { buzz: lt < 1.2 ? 1 : 0, t })
    } },
  { sign: 'taurus', cap: 'Left it on read? | That\'s *allowed.*', mood: 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), () => {
        x.fillStyle = LAV; x.fillRect(-96, -140, 180, 70); txt(x, 'you there?', -105, { size: 30, col: INK })
        txt(x, 'Read 2:14', -30, { size: 24, col: '#9aa5c4', font: MONO, w: 700 })
      })
      label(x, 790, 1130, 'GUILT: NONE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: '87 new messages? | *Mute it.* Nap.', mood: lt => lt > 1.2 ? 'sleepy' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(87, Math.floor(clamp((lt - 0.2) / 0.9) * 87))
      label(x, 790, 720, `GROUP CHAT: ${n}`, pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 36, bg: RED, color: BONE, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 960, lt > 1.2 ? 'MUTED ✓' : 'MUTE?', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 52, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Watering the plants? | They *come first.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PLANT, { L: LEAF, T: '#c96a3a' }, 800, 930, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, CAN, { B: SKYB, S: '#5ab8e8' }, 640, 760, 20 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: 0.4 })
      bubble(x, 860, 660, 'buzz buzz', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 30, col: LAV, tail: 'bl' })
      label(x, 800, 1150, 'BUSY: GROWING', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: GREEN, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Draft number six? | Send it *when ready.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.0) * 5)
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), () => { txt(x, `DRAFT ${n}`, -110, { size: 30, col: GOLD, font: MONO, w: 700 }); txt(x, 'hey! so...', -20, { size: 32 }); txt(x, 'no rush', 50, { size: 32, col: MINT }) })
    } },
  { sign: 'taurus', cap: 'Work text at 10 pm? | *Morning you* replies.', mood: 'sleepy', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, MOON, { Y: '#ffe7a8' }, 640, 640, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      phone(x, 800, 880, 0.8 * pop01(t, P.t0 + 0.4, 0.3, 2), () => { txt(x, '10:02 PM', -110, { size: 34, col: '#9aa5c4', font: MONO, w: 700 }); txt(x, '"quick q"', -20, { size: 34 }) })
      label(x, 800, 1140, 'REPLY: 9 AM', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Phone on silent? | That\'s *self-care.*', mood: 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 860, 0.85 * pop01(t, P.t0 + 0.2, 0.3, 2), () => { txt(x, 'DO NOT', -40, { size: 40, col: LAV, font: MONO, w: 700 }); txt(x, 'DISTURB', 14, { size: 40, col: LAV, font: MONO, w: 700 }) }, { rot: -0.05 })
      hearts(x, t, 790, 760, P.t0 + 1.4, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 6 })
    } },
  { sign: 'taurus', cap: 'A new match | can wait for *the real you.*', mood: lt => lt > 1.4 ? 'wink' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), () => {
        x.fillStyle = PINK; x.fillRect(-96, -150, 192, 60); txt(x, "IT'S A MATCH", -120, { size: 24, col: INK, font: MONO, w: 700 })
        signChar(x, t, 'virgo', 0, 0, 120, { mood: 'happy', seed: 71, glyph: false, glow: 0.6 })
        txt(x, 'Virgo ♍︎', 100, { size: 28 })
      })
      label(x, 800, 1140, 'TAKE YOUR TIME', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Reply when it | *feels good.*', mood: 'heart', star: { x: -170 }, hops: [1.0],
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), () => { x.fillStyle = MINT; x.fillRect(-96, -60, 192, 80); txt(x, 'hi :)', -20, { size: 40, col: INK }); txt(x, 'sent, calmly', 70, { size: 24, col: '#9aa5c4', font: MONO, w: 700 }) })
      sparkles(x, t, 790, 860, P.t0 + 1.0 * 1.29, 7, 220, 0.3)
    } },
]

const F = makeFilm({
  id: 'r2a0202', key: 'F', accent: GREEN, solo: 'taurus', ending: 'callback',
  title: 'Taurus, you can | *reply later.*',
  cameos: CAMEOS,
  group: { cap: 'Your time | is *yours.*', mood: 'heart' },
  last: {
    text: 'Three days later: | *"haha, yes!"*',
    draw(x, t, lt) {
      const t0 = t - lt
      phone(x, 660, 1120, 1.15 * pop01(t, t0 + 0.3, 0.4, 1.8), () => {
        label(x, 0, -120, 'GROUP CHAT', 1, { size: 26, bg: LAV, rot: 0, font: MONO, weight: 700 })
        if (lt > 1.2) { x.fillStyle = MINT; x.fillRect(-100, -30, 200, 80); txt(x, 'haha, yes!', 10, { size: 34, col: INK }) }
      }, { rot: 0.04 })
      const s = pop01(t, t0 + 0.8, 0.45, 1.8)
      if (s > 0.01) signChar(x, t, 'taurus', 360, 1200, 260 * s, { mood: lt > 1.4 ? 'heart' : 'happy', seed: 21, hops: [t0 + 1.4] })
      if (lt > 1.2) sparkles(x, t, 640, 1120, t0 + 1.25, 7, 200, 0.5)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
