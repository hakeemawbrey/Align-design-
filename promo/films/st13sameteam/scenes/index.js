// st13sameteam (45 s vertical Align ad, Star Talk season 13 "Star Talk Explains", S13 E31) · story 0–40.6, then the end card.
//   ❓ "How do you fight *fair*?" ♈ ARIES (student, boxing gloves on) fights to win; ♎ LIBRA (teacher, pointer) draws a
//   fighting-game VERSUS screen, YOU vs THEM, then flips it into a co-op screen: YOU + THEM vs THE PROBLEM (♥). House rules:
//   one topic at a time, no name-calling, breaks are allowed (♥). Lightbulb: "So we both win when the *problem* loses."
//   Last line (Libra): "You're on the *same* team."
// The engine is ./classkit.js (this folder's copy); the season look is ../../stexplain.js. Pure f(t).
import { clamp, prog, ease } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { chalkText, chalkLine } from '../../stexplain.js'
import { makeLesson, CHALK, R } from './classkit.js'
import { cast, confetti } from './props.js'

const ARI = signStar('aries'), LIB = signStar('libra')
const MONSTER = [
  '...XXXXX...',
  '..XXXXXXX..',
  '.XXWWXWWXX.',
  '.XXWKXWKXX.',
  'XXXXXXXXXXX',
  'XXX.....XXX',
  'XXXX.X.XXXX',
  '.XXXXXXXXX.',
  '.X.X.X.X.X.',
]

const EP = makeLesson({
  id: 'st13sameteam', numeral: 'S13 E31', duration: 45, key: 'D',
  q: 'How do you fight *fair*?', qAccent: '#ff9a6a',
  cast: {
    libra: { tag: '♎ LIBRA', color: LIB.color, glyph: LIB.glyph, x: 230, y: 1176, size: 250, enter: 2.3, pitch: 587.33, pointer: true },
    aries: {
      tag: '♈ ARIES', color: ARI.color, glyph: ARI.glyph, x: 850, y: 1176, size: 250, x0: 580, y0: 930, size0: 480, pitch: 392,
      draw: (ctx, X, Y, s, t, o) => cast(ctx, X, Y, s, t, { color: ARI.color, glyph: ARI.glyph, ...o }),
    },
  },
  student: 'aries',
  board: { title: 'FIGHT FAIR' },
  lines: [
    ['aries', 'Fair? I fight to *win*.'],
    ['libra', 'Then tell me: who\'s on your *team*?', { mark: 'vs' }],
    ['libra', 'Flip it: you two *against* the problem.', { mark: 'flip' }],
    ['aries', 'Wait. Player two is *on my side*?', { mark: 'p2' }],
    ['libra', 'House rules: *one* topic at a time.', { mark: 'rules' }],
    ['libra', 'No name-calling. If it\'s hot, take a *break*.', { mark: 'names' }],
    ['aries', 'So we both win when the *problem* loses.', { mark: 'bulb' }],
  ],
  chalk: [
    { text: '1. *One* topic at a time', at: ['rules', 0.5], x: 0, y: 372, size: 36 },
    { text: '2. No *name-calling*', at: ['names', 0.4], x: 0, y: 428, size: 36 },
    { text: '3. *Breaks* are allowed', at: ['names', 1.5], x: 0, y: 484, size: 36 },
  ],
  tags: [
    { kind: 'tip', at: ['flip', 1.9], x: 0, y: 284, align: 'left' },
    { kind: 'tip', at: ['names', 2.7], x: 800, y: 284, align: 'right' },
  ],
  bulb: ['bulb', 0.25],
  recap: ['You two vs the *problem*', 'One *topic* at a time', 'No names. Take *breaks*.'],
  last: 'You\'re on the *same* team.', lastWho: 'libra',
  moods(who, t, T) {
    if (who === 'aries') {
      const gl = t < T.bulb + 0.4 ? { col: '#e8303f', l: punch(t, 0.3), r: punch(t, 0.75), dy: 2 } : null
      if (t < T.walk[0]) return { mood: 'squint', look: [-1, 0], tilt: -0.08, gloves: gl }
      if (t < T.m.flip) return { mood: 'squint', look: [-1, 0], gloves: gl }
      if (t < T.m.rules) return { mood: 'wide', look: [-1, -1], gloves: gl }
      if (t < T.bulb) return { mood: 'neutral', look: [-1, -1], gloves: gl }
      return { mood: 'sparkle', look: [-1, 0] }
    }
    if (t < T.m.flip) return { mood: 'neutral', look: [1, 0] }
    if (t < T.bulb) return { mood: 'happy', look: [1, -1] }
    return { mood: 'heart', look: [1, 0] }
  },
  draw(x, t, T, B) {
    const a = T.m.vs + 0.4, f = T.m.flip + 0.3
    const vsK = t < f ? 1 : 1 - clamp(prog(t, f, f + 0.25))
    const coK = clamp(prog(t, f + 0.25, f + 0.5))
    const top = B.y0 + 70
    // the VERSUS screen
    if (vsK > 0 && t >= a) {
      x.save(); x.globalAlpha *= vsK
      chalkText(x, t, { text: 'YOU', x: B.x0 + 20, y: top, at: a, size: 40, color: CHALK.blue })
      chalkText(x, t, { text: 'THEM', x: B.x1 - 20, y: top, at: a + 0.3, size: 40, color: CHALK.pink, align: 'right' })
      bar(x, t, B.x0 + 20, top + 40, 280, a + 0.4, 1 - 0.4 * clamp(prog(t, a + 1.2, a + 1.6)), CHALK.blue)
      bar(x, t, B.x1 - 300, top + 40, 280, a + 0.5, 1 - 0.4 * clamp(prog(t, a + 1.6, a + 2.0)), CHALK.pink)
      vsMark(x, t, (B.x0 + B.x1) / 2, top + 110, a + 0.7, CHALK.red)
      x.restore()
    }
    // the CO-OP screen
    if (coK > 0) {
      x.save(); x.globalAlpha *= coK
      chalkText(x, t, { text: 'YOU + THEM', x: B.x0 + 20, y: top, at: f + 0.3, size: 40, color: CHALK.green })
      bar(x, t, B.x0 + 20, top + 40, 300, f + 0.6, 1, CHALK.green)
      chalkText(x, t, { text: 'THE PROBLEM', x: B.x1 - 20, y: top, at: f + 0.7, size: 34, color: CHALK.gold, align: 'right' })
      vsMark(x, t, (B.x0 + B.x1) / 2 - 20, top + 110, f + 0.6, CHALK.white)
      // the problem: a little chalk blob monster that shrinks as the house rules go up
      const hurt = clamp(prog(t, T.m.rules + 0.5, T.m.names + 2.2))
      const P = 13 * (1 - 0.45 * hurt), mx = B.x1 - 20 - 11 * 13, my = top + 40
      const shake = Math.floor(t * 12) % 2 ? 2 : -2
      const pk = clamp(prog(t, f + 0.9, f + 1.2))
      if (pk > 0) {
        x.save(); x.globalAlpha *= pk
        MONSTER.forEach((row, j) => [...row].forEach((c, i) => {
          if (c === '.') return
          R(x, c === 'X' ? CHALK.gold : c === 'W' ? '#ffffff' : '#1b1236', mx + (11 * 13 - 11 * P) + i * P + shake * hurt, my + (13 * 9 - 9 * P) + j * P, P, P)
        }))
        x.restore()
      }
      const pj = prog(t, T.m.p2, T.m.p2 + 0.25)
      if (pj > 0 && t < T.m.rules + 0.2) {
        x.save(); x.globalAlpha *= clamp(pj) * (Math.floor(t * 4) % 2 ? 1 : 0.7)
        chalkText(x, t, { text: 'P2 JOINED!', x: B.x0 + 20, y: top + 130, at: T.m.p2, size: 34, color: CHALK.gold, cps: 40 })
        x.restore()
      }
      x.restore()
    }
    chalkLine(x, t, { pts: [[B.x0, B.y0 + 326], [B.x1, B.y0 + 326]], at: T.m.rules + 0.2, dur: 0.5, dash: [14, 12], width: 4 })
  },
  front(x, t, T, Rr) {
    // when it clicks, Aries' gloves come off in a little burst of confetti
    if (Rr.aries) confetti(x, t, T.bulb + 0.35, { x0: Rr.aries.x, y0: Rr.aries.y, n: 30, spread: 0.5, up: 0.6, seed: 4, life: 2.2 })
  },
  cues: T => [['snare', +(T.m.vs + 1.1).toFixed(3), { gain: 0.08, tone: 200, decay: 0.12, snappy: 0.8, rev: 0.1 }], ['pluck', +(T.m.p2 + 0.05).toFixed(3), 1318.51, 0.05, 0.6, 0]],
})

function punch(t, ph) { const u = (t * 1.6 + ph) % 1; return u < 0.18 ? Math.sin(Math.PI * u / 0.18) : 0 }
function bar(x, t, x0, y0, w, at, v, col) {
  if (t < at) return
  const k = clamp(prog(t, at, at + 0.3))
  chalkLine(x, t, { pts: [[x0, y0], [x0 + w, y0], [x0 + w, y0 + 26], [x0, y0 + 26], [x0, y0]], at, dur: 0.3, color: col, width: 4 })
  x.save(); x.globalAlpha *= 0.8 * k
  R(x, col, x0 + 6, y0 + 6, (w - 12) * v * ease.outCubic(k), 14)
  x.restore()
}
function vsMark(x, t, cx, cy, at, col) {
  if (t < at) return
  const s = 1 + 0.4 * Math.exp(-(t - at) * 8)
  x.save(); x.translate(cx, cy); x.scale(s, s)
  chalkText(x, t, { text: 'VS', x: 0, y: 0, at, size: 92, color: col, align: 'center', cps: 30 })
  x.restore()
}

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
