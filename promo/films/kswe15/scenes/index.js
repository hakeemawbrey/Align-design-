// kswe15 · SIGN SWAP · "Everyone Swapped" (22 s vertical, Month 2 boost m11 #15, house · C, loop)
//   0.0   frame 0: the night sky at midnight, all twelve sign stars mid-spin in a ring, a huge swap flash in the middle
//         (every star half-way into another sign). Hook "Midnight. *All twelve* swapped."  0.6 the news desk breaks it.
//   2.8   the group chat, six gags in a row (each with the swapped star):
//         ♍ as ♐ "why is my room a CAMPSITE" · ♌ as ♒ "nobody's looking at me and i'm… fine??" · ♏ as ♊ "i just said
//         'hehe' OUT LOUD" · ♉ as ♈ "i ran. on purpose." · ♎ as ♋ "i cried at a candle" · ♓ as ♑ "why am i STILL crying"
//   11.0  "emergency meetup. the diner. NOW."  "omw" × 12.
//   13.0  the diner: all twelve, every one in someone else's colours; Pisces (as Capricorn) sobbing in the middle.
//   19.5  last line "Twelve swaps. *Same* group chat."  21.55–22.0 eases back into frame 0 (loop).
import { makeSwap } from '../../kswe01/scenes/swapfilm.js'
import { star, swapper, swapBolt, phone, bubble, sticker, shadow, hearts, sparkles, table, label, R, box, INK, GOLD, PINK, RED, BONE, SIGN, SIGNS, pop01, outK, prog, ease, clamp, lerp, r3 } from '../../kswe01/scenes/swapkit.js'

// who woke up as whom (every sign once, both ways)
const INTO = { aries: 'libra', taurus: 'aries', gemini: 'scorpio', cancer: 'leo', leo: 'aquarius', virgo: 'sagittarius', libra: 'cancer', scorpio: 'gemini', sagittarius: 'virgo', capricorn: 'pisces', aquarius: 'taurus', pisces: 'capricorn' }
const IDS = SIGNS.map(s => s.id)

function ring(x, t) {
  const spin = t * 0.9, k = clamp(0.5 + t / 0.8 * 0.5)
  IDS.forEach((id, i) => {
    const a = i / 12 * Math.PI * 2 + spin, px = 540 + Math.cos(a) * 360, py = 980 + Math.sin(a) * 360
    swapper(x, t, px, py, 150, id, INTO[id], k, { mood: 'wide', look: [Math.cos(a + Math.PI) * 0.6, Math.sin(a + Math.PI) * 0.6], seed: i + 1, soul: false, tears: id === 'pisces' ? 2 : 0 })
  })
}
function opening(x, t) {
  // a starburst flash in the middle of the ring
  swapBolt(x, t, -0.25, { x1: 540, y1: 640, x2: 540, y2: 1320, colA: GOLD, colB: PINK, dur: 1.2 })
  ring(x, t)
  clockBig(x, t)
}
function clockBig(x, t) {
  x.save(); x.font = "700 120px 'Space Mono'"; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = INK; x.fillText('00:00', 546, 986); x.fillStyle = Math.floor(t * 4) % 2 ? '#ff4d5e' : '#ffd0d6'; x.fillText('00:00', 540, 980); x.restore()
}
const GAGS = [
  ['virgo', 'why is my room a CAMPSITE'],
  ['leo', 'nobody’s looking at me and i’m… fine??'],
  ['scorpio', 'i just said “hehe” OUT LOUD'],
  ['taurus', 'i ran. on purpose.'],
  ['libra', 'i cried at a candle'],
  ['pisces', 'why am i STILL crying'],
]
const G0 = 2.8, GD = 1.35
const tag = id => `${SIGN(id).glyph}︎ ${SIGN(id).name.toUpperCase()} as ${SIGN(INTO[id]).glyph}︎`
const CHAT = [
  ...GAGS.map(([id, txt], i) => ({ from: tag(id), text: txt, at: r3(G0 + i * GD), col: SIGN(id).color })),
  { from: '♈︎ ARIES as ♎︎', text: 'emergency meetup. the diner. NOW.', at: 11.0, col: SIGN('aries').color },
  { from: 'me', text: 'omw', at: 11.6 },
]
function chatShot(x, t) {
  phone(x, t, { cx: 540, cy: 960, w: 800, h: 880, title: 'the twelve ✦', clock: '12:01 AM', lines: CHAT, size: 34, accent: GOLD, unread: t < 11 ? String(Math.floor(12 + (t - 2.8) * 9)) : null })
  // the current gag's star, popping up bottom-right
  const i = clamp(Math.floor((t - G0) / GD), 0, GAGS.length - 1), id = GAGS[i][0]
  if (t < 11.0) {
    const at = G0 + i * GD
    swapper(x, t, 870, 1640, 260, id, INTO[id], 1, { pop: pop01(t, at, 0.3, 2.4), mood: id === 'pisces' ? 'sparkle' : 'wide', look: [-1, -1], tears: id === 'pisces' ? 3 : 0, seed: i + 2 })
  } else {
    for (let j = 0; j < 12; j++) { const at = 11.6 + j * 0.08; label(x, 'omw', 120 + (j % 6) * 168, 1560 + Math.floor(j / 6) * 90, { size: 40, col: SIGN(IDS[j]).color, font: 'Inter', weight: 800, scale: pop01(t, at, 0.2, 2.6) }) }
  }
}
function dinerShot(x, t) {
  table(x, 540, 1180, 900)
  const back = ['aries', 'gemini', 'cancer', 'sagittarius', 'aquarius', 'capricorn'], front = ['virgo', 'leo', 'scorpio', 'taurus', 'libra']
  back.forEach((id, i) => swapper(x, t, 140 + i * 160, 1000, 170, id, INTO[id], 1, { mood: i % 2 ? 'happy' : 'wide', look: [0, 0.3], seed: i + 3, hops: [13.2 + i * 0.1, 15.5 + i * 0.13], soul: true }))
  front.forEach((id, i) => { shadow(x, 140 + i * 200, 1610, 170); swapper(x, t, 140 + i * 200 + (i > 1 ? 120 : 0), 1450, 200, id, INTO[id], 1, { mood: 'happy', look: [0, -0.4], seed: i + 9, hops: [13.4 + i * 0.12, 16.0 + i * 0.1], soul: true }) })
  // Pisces (as Capricorn) in the middle, still sobbing
  swapper(x, t, 470, 1440, 230, 'pisces', 'capricorn', 1, { mood: 'sparkle', look: [0, -0.5], tears: 3, seed: 20, hops: [13.6, 14.2, 14.8, 15.4, 16.0, 16.6, 17.2] })
  bubble(x, t, 540, 820, 14.0, 19.3, 'some things\nDON’T swap', { size: 42, col: '#d9d4ff', tail: 0 })
  hearts(x, t, 15.6, 540, 1320, { n: 8, spread: 360, rise: 200 })
}

const EP = makeSwap({
  duration: 22, ending: 'loop',
  hook: { text: 'Midnight. *All twelve* swapped.', out: [2.6, 2.8], top: 220 },
  caps: [
    { at: 11.05, out: [12.8, 13.0], text: 'Emergency *meetup.*', top: 230 },
    { at: 13.1, out: [19.2, 19.4], text: 'Every sign. *Wrong body.*', top: 230 },
  ],
  shots: [
    { at: 0, cam: [1.0, 540, 960], push: 0.06, draw: opening },
    { at: 2.8, room: 'bed', roomOpts: { dark: 0.55 }, cam: [1.0, 540, 960], push: 0.03, draw: chatShot },
    { at: 13.0, room: 'cafe', roomOpts: { warm: 0.3 }, cam: [1.25, 540, 1150], push: 0.0, draw: dinerShot },
  ],
  fx: [
    { kind: 'whip', at: -0.2, from: 1.45 },
    { kind: 'shake', at: 0.0, len: 0.5, amp: 26 },
    { kind: 'news', at: 0.65, out: [2.6, 2.8], headline: 'All twelve signs *swapped.*', tag: 'BREAKING', channel: 'STAR NEWS', ticker: ['Virgo’s room: a campsite', 'Leo: “fine”', 'Pisces: still crying', 'more at 12:01'], clock: '00:00' },
    { kind: 'shake', at: 11.0, len: 0.4, amp: 16 },
  ],
  flash: [{ at: 13.0, col: GOLD, a: 0.3 }],
  punch: GAGS.map((g, i) => ({ at: r3(G0 + i * GD), dur: 0.7, z: 0.04, x: 540, y: 1000 })),
  last: { at: 19.5, text: 'Twelve swaps. *Same* group chat.', top: 300, size: 92 },
  cues: [
    ['glitter', 0.0, 0.6], ['tom', 0.02, 70, { gain: 0.25, decay: 0.25 }],
    ...GAGS.map((g, i) => ['pop', r3(G0 + i * GD), [523.25, 587.33, 659.25, 783.99, 880, 1046.5][i], 0.045, (i % 2 ? 0.3 : -0.3)]),
    ['pluck', r3(G0 + 5 * GD + 0.1), 659.25, 0.035, 0.5, 0.3], ['pluck', r3(G0 + 5 * GD + 0.25), 587.33, 0.035, 0.5, 0.3],
    ['pop', 11.0, 1318.51, 0.05, 0], ...Array.from({ length: 12 }, (_, j) => ['pop', r3(11.6 + j * 0.08), 1567.98, 0.015, (j % 2 ? 0.4 : -0.4)]),
    ['glitter', 13.0, 13.6], ['pluck', 14.0, 659.25, 0.035, 0.5, 0], ['pluck', 14.15, 587.33, 0.035, 0.5, 0], ['glitter', 15.6, 16.3],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
