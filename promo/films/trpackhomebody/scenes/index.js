// trpackhomebody: STARTER PACK, "Homebody in love" (20 s vertical, Star Talk Trends §5.5, music: funk · Bb)
// Story 0–15.6, then the shared end card. The format engine is ./packkit.js (identical in every trpack* film).
//   0.1        "Homebody in love | *starter pack*" over four empty slots (slot 4 is a pulsing "?").
//   1.71       1 · "the blanket (load-bearing)": ♉ Taurus as a plaid blanket burrito, dozing.
//   3.93       2 · "tea. always tea.": a giant mug, steam curls, one long contented sip.
//              THE STARS: "the couch has *never* been happier."
//   6.16       3 · "plans cancelled: party": the phone pings "plans cancelled?", Taurus jumps, party hat, confetti.
//   8.38       the "?" rattles. THE STARS: "and the *rare* item…"
//   9.49       4 · "…a date at home, together": one couch, one blanket, two mugs, ♋ Cancer snuggled in.
//   11.16      card cut → payoff: ♋ "best date ever. same time *next week?*" — Taurus goes heart-eyed.
//   13.3       last line: "In is *the new out*."  Pisces cries behind the box the whole way.
import { makePack, drawBits, bubble, label, star, heart, R, INK, BONE, GOLD, PINK, signStar, prog, ease, lerp, clamp, r3 } from './packkit.js'

const TAU = signStar('taurus'), CAN = signStar('cancer')
const MUG = ['MMMMMMM...', 'MTTTTTM...', 'MMMMMMMHH.', 'MMMMMMM..H', 'MMMMMMM..H', 'MMMMMMMHH.', 'MMMMMMM...', '.MMMMM....']
const HAT = ['...S...', '..PYP..', '..YPY..', '.PYPYP.', '.YPYPY.', 'PYPYPYP']
const CONF = ['#ff8fb1', '#f2c75c', '#8fd8f6', '#9fe6b0', '#c9a6ff']

function plaid(x, x0, y0, w, h) {
  R(x, INK, x0 - 4, y0 - 4, w + 8, h + 8); R(x, '#c8433f', x0, y0, w, h)
  for (let u = x0 + 10; u < x0 + w; u += 34) R(x, 'rgba(255,230,200,0.35)', u, y0, 8, h)
  for (let v = y0 + 10; v < y0 + h; v += 34) R(x, 'rgba(40,10,20,0.3)', x0, v, w, 8)
}
function mug(x, cx, cy, cell, col = '#f6efe2') { drawBits(x, MUG, { M: col, T: '#8a5a3c', H: col }, cx, cy, cell) }
function steam(x, t, cx, cy, n = 3, s = 1) {
  for (let i = 0; i < n; i++) {
    const ph = ((t * 0.6 + i / n) % 1)
    R(x, `rgba(239,230,214,${0.6 * Math.sin(Math.PI * ph)})`, cx + (i - 1) * 14 * s + Math.sin(ph * 7 + i) * 6 * s, cy - ph * 70 * s, 6 * s, 14 * s)
  }
}

// 1 · the blanket burrito
function blanket(x, t, lt) {
  star(x, 220, 150, 170, t, { color: TAU.color, mood: 'sleepy', seed: 3, glow: 0.8, bob: 2 })
  // the burrito wrap: everything below the eyes
  x.save(); x.translate(220, 236 + Math.sin(t * 2.2 + 6.3) * 4); x.rotate(0.02 * Math.sin(t * 1.4))
  plaid(x, -128, -48, 256, 150)
  R(x, INK, -132, -52, 264, 10); R(x, '#e86a5a', -128, -48, 256, 6)
  x.restore()
  label(x, 'DO NOT DISTURB', 220, 30, { size: 20, col: GOLD })
  void lt
}

// 2 · tea
function tea(x, t, lt) {
  const sip = clamp(prog(lt % 2.4, 0.4, 0.8)) * (1 - clamp(prog(lt % 2.4, 1.8, 2.2)))
  star(x, 130, 200, 160, t, { color: TAU.color, mood: sip > 0.5 ? 'happy' : 'sparkle', look: [1, 0], seed: 3, glow: 0.8 })
  mug(x, lerp(320, 268, sip), lerp(232, 214, sip), 11)
  steam(x, t, lerp(306, 254, sip), lerp(178, 160, sip), 3, 1.1)
  if (sip > 0.9) label(x, 'ahh.', 340, 300, { size: 30, col: '#ffd0e6', font: 'Inter, sans-serif', weight: 800 })
}

// 3 · plans cancelled: party
function party(x, t, lt) {
  const l = lt % 2.6
  // the phone
  const pk = clamp(prog(l, 0.1, 0.25))
  R(x, INK, 300, 150, 100, 170); R(x, '#2b2140', 306, 156, 88, 158); R(x, '#8fd8f6', 312, 170, 76, 120)
  if (pk > 0) { R(x, '#ffffff', 318, 200, 64, 24); R(x, INK, 324, 208, 40, 4); R(x, INK, 324, 214, 28, 4) }
  bubble(x, 300, 92, 'plans cancelled?', { k: pk, size: 26, tail: 1 })
  const jump = l > 0.75
  const hops = jump ? [r3(t - l + 0.8), r3(t - l + 1.3), r3(t - l + 1.8)] : []
  const r = star(x, 130, 222, 160, t, { color: TAU.color, mood: jump ? 'happy' : 'wide', look: jump ? undefined : [1, -1], seed: 3, glow: 0.9, hops })
  if (jump) {
    drawBits(x, HAT, { S: GOLD, P: '#ff8fb1', Y: '#8fd8f6' }, 130, r.top - 10, 6, { rot: -0.15 })
    for (let i = 0; i < 26; i++) {
      const d = l - 0.8, a = i * 2.39, v = 140 + (i % 5) * 40
      const cx = 130 + Math.cos(a) * v * d, cy = 170 + Math.sin(a) * v * d * 0.8 - 200 * d + 340 * d * d
      if (d > 0 && cy < 380) R(x, CONF[i % 5], cx, cy, 10, 6 + (i % 2) * 4)
    }
  }
}

// 4 · a date at home, together
function couch(x) {
  R(x, INK, 30, 170, 380, 150); R(x, '#6a43a6', 36, 176, 368, 60); R(x, '#946ad0', 36, 176, 368, 10)
  R(x, INK, 14, 220, 50, 120); R(x, '#7a4fb8', 20, 226, 38, 108); R(x, INK, 376, 220, 50, 120); R(x, '#7a4fb8', 382, 226, 38, 108)
  R(x, '#5f3b96', 60, 236, 320, 70)
}
function home(x, t, lt, P, warm = false, hops = []) {
  couch(x)
  star(x, 150, 186, 140, t, { color: TAU.color, glyph: P.big ? TAU.glyph : null, mood: warm ? 'heart' : 'happy', look: [1, 0], seed: 3, glow: 0.8, hops })
  star(x, 290, 186, 140, t, { color: CAN.color, glyph: P.big ? CAN.glyph : null, mood: 'happy', look: [-1, 0], seed: 8, glow: 0.8, hops })
  plaid(x, 74, 236, 292, 84)                                                     // one blanket, two stars
  mug(x, 112, 272, 6); mug(x, 330, 272, 6, '#ffd0e6')
  steam(x, t, 106, 236, 2, 0.6); steam(x, t, 324, 236, 2, 0.6)
  heart(x, 220, 112 - 6 * Math.sin(t * 3), warm ? 6 : 4)
  void lt
}
function payoff(x, t, pt, P) {
  const done = P.T.ptimes[0].done - P.T.cut, warm = pt > done
  home(x, t, pt, P, warm, warm ? [r3(t - pt + done), r3(t - pt + done + 0.45)] : [r3(t - pt + 0.45)])
  if (warm) { const k = clamp(prog(pt, done, done + 0.3)); for (let i = 0; i < 3; i++) { const ph = ((pt - done) * 0.5 + i / 3) % 1; heart(x, 170 + i * 50, 200 - ph * 160, 2.4, { alpha: Math.sin(Math.PI * ph) * k }) } }
}

const EP = makePack({
  caption: 'Homebody in love | *starter pack*', captionAccent: '#ffb38a',
  items: [
    { label: 'the blanket (load-bearing)', tint: '#3a2a54', draw: blanket },
    { label: 'tea. always tea.', tint: '#2a3a4a', draw: tea },
    { label: 'plans cancelled: party', tint: '#4a2a4a', draw: party },
  ],
  twist: { label: '…a date at home, together', tint: '#3a2448', draw: (x, t, lt, P) => home(x, t, lt, P), payoff },
  lines: [
    { text: 'the couch has *never* been happier.' },
    { text: 'and the *rare* item…' },
  ],
  payoffLine: { speaker: `${CAN.glyph}︎ THE DATE`, color: '#8fd8f6', text: 'best date ever. same time *next week?*' },
  last: 'In is *the new out*.', lastAccent: '#ffb38a',
  cues: T => [
    // snores
    ...[0.5, 1.5].map(d => ['pluck', r3(T.items[0] + d), 220, 0.02, 0.6, 0]),
    // sips
    ...[0.45, 2.85].map(d => ['whoosh', r3(T.items[1] + d), 0.3, 0.02]), ['pop', r3(T.items[1] + 1.0), 783.99, 0.025, 0.3],
    // the ping, the party
    ['pop', r3(T.items[2] + 0.12), 1567.98, 0.035, 0.3], ['pop', r3(T.items[2] + 0.2), 1318.51, 0.03, 0.3],
    ['boom', r3(T.items[2] + 0.8), 0.12], ['glitter', r3(T.items[2] + 0.8), r3(T.items[2] + 1.6)], ['pluck', r3(T.items[2] + 0.82), 1174.66, 0.04, 0.4, -0.3], ['pluck', r3(T.items[2] + 0.95), 1567.98, 0.04, 0.4, -0.3],
    // "next week?" → heart eyes
    ['bell', r3(T.ptimes[0].done), 1760, 0.025, 1.0, 0], ['pop', r3(T.ptimes[0].done + 0.05), 1567.98, 0.03, 0],
  ],
})
void BONE; void PINK; void ease

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const TIMES = EP.T
