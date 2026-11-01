// trpackmatchmaker: STARTER PACK, "The friend who's always matchmaking" (20 s vertical, Star Talk Trends §5.4, funk · A)
// Story 0–15.6, then the shared end card. The format engine is ./packkit.js (identical in every trpack* film).
//   0.1        "Matchmaker friend | *starter pack*" over four empty slots (slot 4 is a pulsing "?").
//   1.71       1 · "the clipboard": ♊ Gemini ticks a compatibility list, ✓ ✓ ✓, pen flying.
//   3.93       2 · "two names in a heart": a notebook heart draws itself round "♋ + ♍", doodle hearts pop.
//              THE STARS: "every friend group has *one* of these."
//   6.16       3 · "a fake \"bump into\"": Gemini hides in a bush and nudges ♋ and ♍ together: "oh WOW. small world!"
//   8.38       the "?" rattles. THE STARS: "and the *rare* item…"
//   9.49       4 · "…their own crush": ♐ Sagittarius strolls past; the clipboard drops; heart eyes.
//   11.16      card cut → payoff: the new couple hands the clipboard back. ♋: "our turn. *clipboard*, please."
//   13.3       last line: "Matchmaker, *match thyself*."  Pisces cries behind the box the whole way.
import { makePack, drawBits, bubble, label, star, heart, R, INK, BONE, GOLD, signStar, prog, ease, lerp, clamp, r3 } from './packkit.js'

const GEM = signStar('gemini'), CAN = signStar('cancer'), VIR = signStar('virgo'), SAG = signStar('sagittarius')
const CLIP_C = { K: '#9a8fb8', W: '#f6efe2', L: '#7a6aa8', B: '#a06c48' }
const BUSH = ['..GGGG....', '.GGLGGGG..', 'GGGGGGLGG.', 'GLGGGGGGGG', 'GGGGGLGGGG', '.GGGGGGGG.']
const GLYPHF = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', 'Noto Sans Symbols 2', serif"

function clipboard(x, cx, cy, s, rot, ticks = 3, heartOn = false) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  R(x, INK, -44, -58, 88, 116); R(x, '#a06c48', -40, -54, 80, 108); R(x, '#f6efe2', -32, -42, 64, 90)
  R(x, INK, -16, -64, 32, 16); R(x, '#9a8fb8', -12, -60, 24, 10)
  for (let i = 0; i < 4; i++) {
    R(x, '#7a6aa8', -10, -32 + i * 20, 34, 5)
    R(x, INK, -26, -35 + i * 20, 11, 11); R(x, '#f6efe2', -24, -33 + i * 20, 7, 7)
    if (i < ticks) { R(x, '#3fae6a', -25, -30 + i * 20, 4, 4); R(x, '#3fae6a', -22, -27 + i * 20, 4, 4); R(x, '#3fae6a', -19, -32 + i * 20, 4, 6) }
  }
  if (heartOn) heart(x, 0, 6, 5)
  x.restore()
}

// 1 · the clipboard
function board(x, t, lt) {
  const ticks = clamp(Math.floor(Math.max(0, lt) / 0.45), 0, 4)
  star(x, 120, 214, 160, t, { color: GEM.color, mood: 'wink', look: [1, 0], seed: 3, glow: 0.8, hops: Array.from({ length: ticks }, (_, i) => r3(t - lt + 0.45 * (i + 1))) })
  clipboard(x, 300, 196, 1.9, 0.08)
  // the pen
  const py = 136 + Math.min(3, ticks) * 38
  x.save(); x.translate(282 + 8 * Math.sin(t * 22), py); x.rotate(-0.7); R(x, INK, -4, -40, 12, 56); R(x, GOLD, -2, -38, 8, 46); R(x, BONE, -2, 6, 8, 6); x.restore()
  label(x, 'COMPATIBLE? ✓', 300, 340, { size: 20, col: GOLD })
}

// 2 · two names in a heart
function names(x, t, lt) {
  R(x, INK, 60, 26, 320, 312); R(x, '#f6efe2', 66, 32, 308, 300)
  for (let i = 0; i < 9; i++) R(x, 'rgba(122,106,168,0.35)', 66, 64 + i * 30, 308, 2)
  R(x, 'rgba(226,61,102,0.5)', 104, 32, 3, 300)
  // the heart draws itself round (a parametric pixel heart)
  const f = clamp(prog(lt, 0.15, 1.2)), N = 120
  for (let i = 0; i < N * f; i++) {
    const a = (i / N) * Math.PI * 2
    const hx = 16 * Math.pow(Math.sin(a), 3), hy = -(13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a))
    R(x, '#e23d66', 222 + hx * 8.2 - 4, 172 + hy * 8.2 - 4, 8, 8)
  }
  const k = clamp(prog(lt, 0.4, 0.7))
  x.save(); x.globalAlpha *= k; x.font = `700 64px ${GLYPHF}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = CAN.color; x.fillText(CAN.glyph + '︎', 172, 176); x.fillStyle = '#2c2a7a'; x.font = `800 44px Inter, sans-serif`; x.fillText('+', 222, 176)
  x.font = `700 64px ${GLYPHF}`; x.fillStyle = VIR.color; x.fillText(VIR.glyph + '︎', 272, 176); x.restore()
  for (let i = 0; i < 4; i++) { const tk = clamp(prog(lt, 1.2 + i * 0.25, 1.4 + i * 0.25)); heart(x, [110, 340, 130, 330][i], [70, 80, 290, 286][i], 3 * tk) }
  star(x, 384, 300, 96, t, { color: GEM.color, mood: 'happy', look: [-1, -1], seed: 4, glow: 0.6, tips: false })
}

// 3 · the fake "bump into"
function bump(x, t, lt) {
  const c = ease.inOutCubic(clamp(prog(lt % 2.2, 0.2, 1.0)))
  const hit = (lt % 2.2) > 1.0
  star(x, lerp(60, 172, c), 168, 120, t, { color: CAN.color, mood: hit ? 'wide' : 'neutral', look: hit ? [1, 0] : [-1, 0], seed: 5, glow: 0.7, squash: hit ? 0.06 : 0 })
  star(x, lerp(380, 268, c), 168, 120, t, { color: VIR.color, mood: hit ? 'wide' : 'neutral', look: hit ? [-1, 0] : [1, 0], seed: 6, glow: 0.7, squash: hit ? 0.06 : 0 })
  if (hit) heart(x, 220, 100 - 20 * prog(lt % 2.2, 1.0, 1.6), 3.5, { alpha: 1 - prog(lt % 2.2, 1.6, 2.1) })
  // the bush, with Gemini peeking out of it
  const peek = Math.sin(t * 3) * 6
  star(x, 220, 270 + peek, 104, t, { color: GEM.color, mood: 'wink', look: [0, -1], seed: 3, glow: 0.5, tips: false })
  drawBits(x, BUSH, { G: '#3f9a5a', L: '#7fd06a' }, 220, 336, 17)
  bubble(x, 220, 44, 'oh WOW. small world!', { k: hit ? 1 : 0, size: 26, tail: 0 })
}

// 4 · their own crush
function crush(x, t, lt) {
  const sag = lerp(470, 320, ease.outCubic(clamp(prog(lt, 0.2, 1.0))))
  const smit = lt > 0.9
  star(x, 110, 216, 150, t, { color: GEM.color, mood: smit ? 'heart' : 'wink', look: [1, 0], seed: 3, glow: 0.8, hops: [r3(t - lt + 0.95)] })
  const drop = clamp(prog(lt, 0.95, 1.3))
  clipboard(x, 190 + drop * 20, 216 + drop * 110, 1.0, 0.1 + drop * 1.4)
  star(x, sag, 216, 140, t, { color: SAG.color, mood: 'happy', look: [-1, 0], seed: 9, glow: 0.8 })
  if (smit) heart(x, 120, 92 - 12 * Math.sin(t * 6), 4)
}
function payoff(x, t, pt, P) {
  const T = P.T, done = T.ptimes[0].done - T.cut
  const blush = pt > done
  star(x, 104, 222, 150, t, { color: GEM.color, glyph: GEM.glyph, mood: blush ? 'heart' : 'wide', look: [1, 0], seed: 3, glow: 0.9, hops: blush ? [r3(t - pt + done), r3(t - pt + done + 0.45)] : [] })
  star(x, 346, 222, 150, t, { color: SAG.color, glyph: SAG.glyph, mood: blush ? 'sparkle' : 'happy', look: [-1, 0], seed: 9, glow: 0.9 })
  // the new couple hands the clipboard over (in the back, between them)
  const hand = ease.outBack(clamp(prog(pt, 0.3, 0.9)))
  star(x, 190, 108, 84, t, { color: CAN.color, mood: 'happy', seed: 5, glow: 0.5, tips: false })
  star(x, 262, 108, 84, t, { color: VIR.color, mood: 'happy', seed: 6, glow: 0.5, tips: false })
  heart(x, 226, 64, 2.6)
  clipboard(x, 226, lerp(40, 196, hand), 0.9, -0.05, 4, true)
  if (blush) { const k = clamp(prog(pt, done, done + 0.3)); for (let i = 0; i < 3; i++) { const ph = ((pt - done) * 0.5 + i / 3) % 1; heart(x, 170 + i * 50, 320 - ph * 120, 2.4, { alpha: Math.sin(Math.PI * ph) * k }) } }
}

const EP = makePack({
  caption: 'Matchmaker friend | *starter pack*', captionAccent: '#ffe27a',
  items: [
    { label: 'the clipboard', tint: '#2a3a5e', draw: board },
    { label: "two friends' names in a heart", tint: '#3a2448', draw: names },
    { label: 'a fake "bump into"', tint: '#1f3f3a', draw: bump },
  ],
  twist: { label: '…their own crush', tint: '#4a2448', draw: crush, payoff },
  lines: [
    { text: 'every friend group has *one* of these.' },
    { text: 'and the *rare* item…' },
  ],
  payoffLine: { speaker: `${CAN.glyph}︎ THE FRIENDS`, color: '#8fd8f6', text: 'our turn. *clipboard*, please.' },
  last: 'Matchmaker, *match thyself.*', lastAccent: '#ffe27a',
  cues: T => [
    // ticks on the clipboard
    ...Array.from({ length: 4 }, (_, i) => ['pop', r3(T.items[0] + 0.45 * (i + 1)), [880, 987.77, 1108.73, 1318.51][i], 0.03, 0.3]),
    // the heart draws, doodles pop
    ['riser', r3(T.items[1] + 0.15), r3(T.items[1] + 1.2), 0.02], ...Array.from({ length: 4 }, (_, i) => ['pop', r3(T.items[1] + 1.2 + i * 0.25), 1318.51, 0.025, (i % 2 ? 0.3 : -0.3)]),
    // the bump
    ['tom', r3(T.items[2] + 1.0), 150, { gain: 0.15, decay: 0.12 }], ['pop', r3(T.items[2] + 1.05), 1567.98, 0.035, 0],
    // the clipboard drops
    ['whoosh', r3(T.twist + 0.2), 0.5, 0.03], ['tick', r3(T.twist + 1.3), 0.06], ['pluck', r3(T.twist + 0.95), 1174.66, 0.04, 0.6, -0.2],
    // blush
    ['bell', r3(T.ptimes[0].done), 1760, 0.025, 1.0, 0], ['pop', r3(T.ptimes[0].done + 0.05), 1567.98, 0.03, 0],
  ],
})
void BONE; void drawBits

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const TIMES = EP.T
