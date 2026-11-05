// kswe11 · SIGN SWAP · "Aquarius Woke Up Reading Into It" (16 s vertical, Month 2 boost m11 #11, synthwave · Am, loop)
//   0.0   frame 0: the bedroom at night, Aquarius mid-pin of a red-string board that's already covered, the swap
//         bolt mid-strike, half Scorpio-red. Hook "Aquarius woke up *a Scorpio.*"  0.5 the text drops: "lol"
//   2.6   the board: "lowercase??" · "no haha" · "2:14 AM" · "one word" · "vibe: ???" pinned one by one.
//   6.6   loading bar "decoding 'lol'…" stalls at 99%: "Error: too many theories"
//   9.4   the crush: "sorry, typing on the bus! you're really funny". Relief. ♓ Pisces cries with it: "i was SO worried"
//   13.4  last line "It was *just* lol."  15.55–16.0 eases back into frame 0 (loop).
import { makeSwap } from '../../kswe01/scenes/swapfilm.js'
import { star, swapper, swapBolt, swapTag, phone, bubble, sticker, shadow, hearts, sparkles, stringBoard, label, R, box, INK, GOLD, PINK, RED, BONE, SIGN, pop01, outK, prog, ease, clamp, lerp, r3 } from '../../kswe01/scenes/swapkit.js'

const FROM = 'aquarius', TO = 'scorpio'
const A = SIGN(FROM), B = SIGN(TO)
const NOTES = ['lol??', 'no haha', '2:14 AM', 'one word', 'lowercase', 'vibe: ???', 'TIMING']

function opening(x, t) {
  stringBoard(x, t, 540, 640, 7, { w: 760, h: 520, notes: NOTES })
  swapBolt(x, t, -0.25, { x1: 320, y1: 260, x2: 320, y2: 980, colA: A.color, colB: B.color, dur: 1.1 })
  const k = clamp(0.45 + t / 0.6 * 0.55)
  shadow(x, 320, 1195, 280)
  swapper(x, t, 320, 1000, 300, FROM, TO, k, { mood: t < 0.6 ? 'squint' : 'wide', look: [1, -1], hops: [1.9] })
  phone(x, t, { cx: 800, cy: 1120, w: 280, h: 380, rot: 0.14, title: 'crush', clock: '2:14 AM', lines: [{ from: 'them', text: 'lol', at: -1 }], size: 30, accent: B.color, glow: 0.8 })
  swapTag(x, t, 540, 1390, FROM, TO, 1.9, { out: 2.6 })
}
const PINS = [2.9, 3.4, 3.9, 4.4, 4.9, 5.4, 5.9]
function boardShot(x, t) {
  const n = PINS.filter(p => t >= p).length
  stringBoard(x, t, 540, 820, n, { w: 860, h: 600, notes: NOTES })
  if (n) sparkles(x, t, 540, 820, PINS[n - 1], 6, 80, n)
  shadow(x, 840, 1650, 230)
  swapper(x, t, 840, 1460, 250, FROM, TO, 1, { mood: 'squint', look: [-1, -1], hops: PINS })
}
function reliefShot(x, t) {
  const reply = t > 9.4
  stringBoard(x, t, 540, 600, 7, { w: 760, h: 480, notes: NOTES })
  if (reply) { x.save(); x.globalAlpha = ease.inOutCubic(prog(t, 10.0, 10.6)) * 0.85; R(x, '#2a2350', 150, 350, 780, 500); x.restore() }
  shadow(x, 330, 1195, 280)
  swapper(x, t, 330, 1000, 290, FROM, TO, 1, { mood: !reply ? 'wide' : 'happy', look: reply ? [1, 0.5] : [0, -1], blink: reply ? undefined : false, hops: [9.5, 10.1] })
  phone(x, t, { cx: 730, cy: 1100, w: 440, h: 560, rot: 0.06, title: 'crush', clock: '2:16 AM', lines: [{ from: 'them', text: 'lol', at: -1 }, { from: 'them', text: 'sorry, typing on the bus! you’re really funny', at: 9.4 }], size: 34, accent: B.color, typing: [8.6, 9.4] })
  if (reply) hearts(x, t, 9.6, 330, 820, { n: 6 })
  if (t > 10.6) {
    const pk = ease.outCubic(prog(t, 10.6, 11.2))
    star(x, t, 540, lerp(1900, 1520, pk), 280, 'pisces', { mood: 'sparkle', look: [0, -0.6], tears: 3, hops: [11.3, 11.9, 12.5, 13.1, 13.7] })
    bubble(x, t, 540, 1770, 11.2, 15.4, 'i was SO worried', { size: 46, col: '#d9d4ff', tail: null })
  }
}

const EP = makeSwap({
  duration: 16, ending: 'loop',
  hook: { text: 'Aquarius woke up *a Scorpio.*', out: [2.4, 2.6], top: 220 },
  caps: [
    { at: 2.7, out: [6.4, 6.6], text: 'They texted: *“lol.”*', top: 230 },
    { at: 9.5, out: [13.2, 13.4], text: 'Plot twist: *the bus.*', top: 230 },
  ],
  shots: [
    { at: 0, room: 'bed', roomOpts: { dark: 0.2 }, cam: [1.0, 540, 960], push: 0.05, draw: opening },
    { at: 2.6, room: 'bed', roomOpts: { dark: 0.35 }, cam: [1.0, 540, 960], push: 0.06, draw: boardShot },
    { at: 6.6, room: 'bed', roomOpts: { dark: 0.2 }, cam: [1.0, 540, 960], push: 0.04, draw: reliefShot },
  ],
  fx: [
    { kind: 'whip', at: -0.2, from: 1.45 },
    { kind: 'notify', at: 0.5, out: [2.3, 2.5], title: 'texts', body: 'crush: *lol*', glyph: '♡', color: '#8a8498', y: 1500 },
    { kind: 'shake', at: 0.52, len: 0.4, amp: 18 },
    { kind: 'load', at: 6.8, len: 2.4, label: 'decoding “lol”…', stallAt: 99, error: 'Error: too many theories', y: 1520 },
    { kind: 'shake', at: 9.45, len: 0.4, amp: 16 },
  ],
  flash: [{ at: 1.85, col: B.color, a: 0.4 }],
  punch: [{ at: 5.9, dur: 0.8, z: 0.08, x: 540, y: 900 }],
  last: { at: 13.4, text: 'It was *just* lol.', top: 300 },
  cues: [
    ['glitter', 0.0, 0.5], ['pop', 1.9, 1174.66, 0.05, 0],
    ...PINS.map((p, i) => ['pop', p, [523.25, 587.33, 659.25, 698.46, 783.99, 880, 987.77][i], 0.035, (i % 2 ? 0.3 : -0.3)]),
    ['glitter', 9.5, 10.1], ['pop', 9.42, 1046.5, 0.045, 0.3],
    ['pluck', 11.3, 659.25, 0.035, 0.5, 0.3], ['pluck', 11.45, 587.33, 0.035, 0.5, 0.3], ['pluck', 12.0, 523.25, 0.03, 0.5, -0.3],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
