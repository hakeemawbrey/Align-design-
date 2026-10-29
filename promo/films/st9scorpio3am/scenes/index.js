// st9scorpio3am (32 s vertical, Star Talk season 9 "A Day in the Life", S9 E40) · story 0–27.6, then the shared end card.
//   3 AM. "A Scorpio at 3 AM: feeling *100%* of everything."  The same bedroom, dark (st9scorpiohome, ep '3am': a stub of
//   candle, still lit; the lava lamp; the curtains open wider). Scorpio sits up in bed; a FEELING meter is pinned at 100%.
//   3.0   the window: the meter lists them, each at 100% (MISSING SOMEONE · PROUD OF A FRIEND · THAT ONE SONG · THE MOON).
//         SCORPIO: "i don't feel things a little. i feel them *all.*"   7.2 punch: "usually i'd keep it *locked* in."
//   10.8  THE STARS: "deep water still needs a *shore.*"  Fact chip: Scorpio is a fixed water sign.
//   14.6  the phone: "you up? i'm okay. just wanted to say it." → TAURUS: "i'm up. glad you did. ♡"  The meter's label
//         changes: 100% · HELD.   19.6 SCORPIO: "…that felt *good.*"
//   22.0  frame 0's framing: Scorpio lies down, the phone dims, the candle glows.   23.6 last line: "Let someone *in*."
//   Rewatch bait: the pink sock from E36 sits on the windowsill next to the candle. The ghost leans out from behind the
//   nightstand at 25.0, under the last line.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawScorpioHome, SCORPIO } from '../../st9scorpiohome.js'
import { phoneScreen, phoneCues } from '../../st9day.js'
import { makeDay, star, tag, pop01 } from '../../st9lskit.js'

const DUR = 32
const T = { hookOut: 2.8, win: 3.0, list: 3.2, l1: 3.4, punch: 7.2, l2: 7.6, wide: 10.8, l3: 11.2, fact: 15.0, phone: 14.6, send: 15.2, reply: 17.0, held: 17.6, back: 19.4, l4: 19.6, bed: 22.0, lie: 22.3, last: 23.6, ghost: 25.0 }
const SCO = tag('scorpio'), NARR = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SCO, text: 'i don’t feel things a little. i feel them *all.*', color: SCORPIO.redHi },
  { t: T.l2, speaker: SCO, text: 'usually i’d keep it *locked* in.', color: SCORPIO.redHi },
  { t: T.l3, speaker: NARR, text: 'deep water still needs a *shore.*' },
  { t: T.l4, speaker: SCO, text: '…that felt *good.*', color: SCORPIO.pink },
]
const CHAT = [
  { from: 'me', text: 'you up? i’m okay. just wanted to say it.', at: T.send },
  { from: 'TAURUS', text: 'i’m up. glad you did. ♡', at: T.reply },
]
const INK = '#0c0710', BONE = '#efe6d6'
const rr = Math.round
const R = (x, c, X, Y, W, H) => { x.fillStyle = c; x.fillRect(rr(X), rr(Y), rr(W), rr(H)) }
const FEELS = ['MISSING SOMEONE', 'PROUD OF A FRIEND', 'THAT ONE SONG', 'THE MOON']

/** the FEELING meter (screen space): a pixel bar pinned at 100%, shaking until it's held */
function meter(x, t, sh) {
  if (t > T.last - 0.2 && t < T.bed) return
  const held = t > T.held
  const sx = held ? 0 : Math.round(Math.sin(t * 40) * 3), y = 1215
  x.save(); x.translate(sx, 0)
  R(x, 'rgba(12,7,16,0.85)', 160, y, 760, 64); R(x, held ? '#8fe3c8' : SCORPIO.red, 160, y, 760, 4)
  x.font = "700 24px 'Space Mono', monospace"; x.textBaseline = 'middle'; x.fillStyle = BONE; x.textAlign = 'left'
  x.fillText('FEELING', 180, y + 34)
  for (let i = 0; i < 10; i++) R(x, held ? (i < 10 ? '#8fe3c8' : '#333') : SCORPIO.red, 330 + i * 34, y + 18, 26, 30)
  x.textAlign = 'right'; x.fillStyle = held ? '#8fe3c8' : '#ff7d9a'; x.fillText(held ? '100% · HELD' : '100%', 900, y + 34)
  x.restore()
  // the list (window shots, before the phone)
  if (sh.room === 'window' && t > T.list && t < T.phone) {
    FEELS.forEach((f, i) => {
      const k = pop01(t, T.list + i * 0.5, 0.3, 2)
      if (k <= 0.02) return
      x.save(); x.translate(250, 380 + i * 58); x.scale(k, k)
      R(x, 'rgba(12,7,16,0.85)', -100, -22, 680, 46)
      x.font = "700 24px 'Space Mono', monospace"; x.textBaseline = 'middle'; x.fillStyle = BONE; x.textAlign = 'left'; x.fillText(f, -84, 2)
      x.textAlign = 'right'; x.fillStyle = '#ff7d9a'; x.fillText('100%', 566, 2); x.restore()
    })
  }
}
function scoState(t) {
  if (t < T.win) return { mood: 'wide', look: [1, -1], blink: false }
  if (t < T.punch) return { mood: 'sparkle', look: [0, -1] }
  if (t < T.wide) return { mood: 'squint', look: [0, 1] }
  if (t < T.phone) return { mood: 'neutral', look: [0, -1] }
  if (t < T.reply) return { mood: 'wide', look: [0, 1], blink: false }
  if (t < T.lie) return { mood: 'sparkle', look: [0, 1] }
  return { mood: 'sleepy' }
}

const EP = makeDay({
  numeral: 'S9 E40', sign: 'scorpio', ep: '3am', home: drawScorpioHome, duration: DUR, key: 'Fm',
  hook: { text: 'A Scorpio at 3 AM: feeling *100%* of everything.', out: [T.hookOut - 0.2, T.hookOut], accentColor: SCORPIO.redHi, size: 86, accentSize: 124 },
  shots: [
    { at: 0, room: 'bedroom', dark: 1, hour: 3, zoom: { x: 420, y: 1040, s: 1.2 } },
    { at: T.win, room: 'window', dark: 1, hour: 3.1, zoom: { x: 540, y: 980, s: 1.05 } },
    { at: T.punch, room: 'window', dark: 1, hour: 3.15, zoom: { x: 540, y: 1120, s: 1.45 } },
    { at: T.wide, room: 'window', dark: 1, hour: 3.2, zoom: { x: 540, y: 980, s: 1.05 } },
    { at: T.phone, room: 'window', dark: 1, hour: 3.3, zoom: { x: 540, y: 1150, s: 1.3 } },
    { at: T.back, room: 'window', dark: 1, hour: 3.4, zoom: { x: 540, y: 980, s: 1.05 } },
    { at: T.bed, room: 'bedroom', dark: 1, hour: 3.5, zoom: { x: 420, y: 1040, s: 1.2 } },
  ],
  homeOpts: (t, sh) => {
    const on = t < T.lie ? 1 : 1 - prog(t, T.lie + 0.5, T.lie + 1.5)
    const p = sh.room === 'bedroom' ? { x: 400, y: 1080 } : { x: 600, y: 1120 }
    return { glows: on > 0 && (sh.room === 'bedroom' || t > T.phone - 1) ? [{ ...p, r: 280, color: '#9fc4ff', a: 0.4 * on }] : [] }
  },
  clock: [{ at: 0, from: '3:03' }, { at: T.win, dur: 0.6, from: '3:03', to: '3:07' }, { at: T.phone, dur: 0.6, from: '3:07', to: '3:19' }, { at: T.bed, dur: 0.8, from: '3:19', to: '3:31' }],
  stamps: [
    { at: T.win + 0.2, out: T.punch - 0.1, time: '3:07 AM', text: 'feeling it *all*', top: 1300 },
    { at: T.phone + 0.2, out: T.back - 0.1, time: '3:19 AM', text: 'letting someone *in*', top: 1300 },
  ],
  lines: LINES, box: { close: 23.4 },
  fact: { at: T.fact, dur: 3.4, label: '★ ASTROLOGY SAYS', text: 'Scorpio is a fixed water sign.', color: '#7fb2ff' },
  ghost: { room: 'bedroom', at: T.ghost, x: 800, y: 1120, from: 'right' },
  battery: 0.1,
  pitch: { [SCO]: 523.25, [NARR]: 784 },
  cuts: [{ t: T.wide, kind: 'flip' }],
  draw(x, t, a, sh) {
    if (sh.room === 'bedroom') {
      const lie = ease.inOutQuad(prog(t, T.lie, T.lie + 0.8))
      const r = star(x, 'scorpio', 300, lerp(1050, 1120, lie), 230, t, { ...scoState(t), seed: 6, glow: 0.6, squash: 0.18 * lie })
      R(x, INK, 30, 1150, 450, 140); R(x, SCORPIO.velvet, 36, 1156, 438, 128); R(x, SCORPIO.velvetHi, 36, 1156, 438, 10)   // the blanket
      const on = t < T.lie ? 1 : 1 - prog(t, T.lie + 0.5, T.lie + 1.5)
      if (on > 0) { R(x, INK, r.x + 80, 1060, 58, 96); x.globalAlpha = on; R(x, '#9fc4ff', r.x + 86, 1066, 46, 78); x.globalAlpha = 1 }
    } else {
      star(x, 'scorpio', 540, 1180, 240, t, { ...scoState(t), seed: 6, glow: 0.7, hops: [T.l1, T.l2, T.send, T.reply + 0.3, T.l4] })
    }
  },
  over(x, t, sh) {
    meter(x, t, sh)
    if (t > T.phone && t < T.back) phoneScreen(x, t, { x: 540, y: 860, w: 420, h: 640, lines: CHAT, app: 'chat', title: 'TAURUS ♉', clock: '3:19', pop: pop01(t, T.phone, 0.35, 2), accent: SCORPIO.red, glow: 0.7 })
  },
  last: { at: T.last, text: 'Let someone *in.*', accentColor: SCORPIO.pink, size: 120, accentSize: 170 },
  cues: [
    ...FEELS.map((_, i) => ['pop', +(T.list + i * 0.5).toFixed(3), [659.25, 783.99, 880, 1046.5][i], 0.03, 0]),
    ['tom', T.punch + 0.05, 0.06],
    ['whoosh', T.phone, 0.3, 0.03],
    ...phoneCues(CHAT, { app: 'chat' }),
    ['pop', T.held, 1046.5, 0.045, 0], ['glitter', T.held, T.held + 0.8], ['bell', T.held + 0.1, 1567.98, 0.02, 1.6, 0],
    ['whoosh', T.lie, 0.5, 0.02],
  ],
})
export const { DURATION, SCENES, CUES } = EP
export { T }
