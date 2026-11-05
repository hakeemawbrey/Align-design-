// ksge24 · SPOT THE GREEN FLAG: "First Date, Five Rounds" (trial reel, LONG ≈ 60 s, house · Db). Format: ../../ksge23/scenes/longkit.js.
//   0–4.6   frame 0: your date mid-trip through the café door, menus flying; slam title
//           "ONE DATE. FIVE ROUNDS. | *WAIT FOR THE GOODBYE.*"; promise sticker "The goodbye decides it."
//   ROUND 1 · THE HELLO          Capricorn: eyes on the phone, "mm. hi."  vs  "hey! you found it!"            → B
//   ROUND 2 · THE QUESTIONS      Gemini: "wait, what about you?"  vs  "…and THEN I… and ALSO I…"              → A
//   ROUND 3 · THE SILENCE        Virgo: panics, "SO. the weather."  vs  smiles, "this is nice."               → B
//   ROUND 4 · PLAN B             Libra, the place is FULL: "food truck picnic?"  vs  "ugh. ruined."           → A
//   ROUND 5 · THE GOODBYE        Aquarius at the door: "see ya."  vs  "I had fun. can I see you again?"       → B
//   THE STARS: "Said it at the door: *“Again?”*"  Loops back to frame 0.
import { makeGreenLong } from '../../ksge23/scenes/longkit.js'
import { R, box, pbubble, hearts, sweat, phone, table, streaks, drawBits, prog, clamp, lerp, ease, INK, BONE, GOLD, GREEN, RED, INTER } from '../../ksge01/scenes/greenkit.js'
import { cafe, street, cup, plate, balloonText } from '../../ksge02/scenes/sets.js'

const fA = 0.7, fB = 3.5
// a date take: the café table, you on the left, the sign on the right, one line
function dateTake({ f, line, col, mood, youMood, set = 'cafe', prop = null, hops = [] }) {
  return (x, tk, S) => {
    const { hero, you } = S
    if (set === 'street') street(x, tk); else cafe(x)
    if (set === 'cafe') { table(x, 250, 470, 300); cup(x, 190, 440); cup(x, 320, 440, { col: '#c9a6ff' }) }
    you(x, tk, { x: 100, y: 410, s: 165, mood: youMood(tk), look: [1, 0] })
    hero(x, tk, { x: 400, y: 410, s: 190, mood: mood(tk), look: [-1, 0], hops })
    if (prop) prop(x, tk, S)
    pbubble(x, tk, 270, 200, f + 0.3, 99, line, { size: 28, tail: 0.6, col: col || BONE })
    if (col) hearts(x, tk, f + 0.8, 120, 300, { n: 4, cell: 4 })
  }
}
const phoneProp = (on) => (x, tk) => { if (on(tk)) phone(x, 440, 330, { w: 70, h: 110, rot: 0.2, glow: 1 }) }
const fullSign = (x) => { box(x, 300, 110, 170, 70, RED, { b: 6 }); x.font = `800 40px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('FULL', 385, 147) }
const ROUNDS = [
  { sign: 'capricorn', title: 'THE HELLO', win: 'B', premise: 'You walk in. *They look up…*', why: 'A real hello beats *a busy hello.*',
    takes: {
      A: { draw: dateTake({ f: fA, line: 'mm. hi.', mood: tk => tk > fA ? 'neutral' : 'neutral', youMood: tk => tk > fA + 0.6 ? 'wide' : 'happy', prop: phoneProp(() => true) }) },
      B: { draw: dateTake({ f: fB, line: 'hey! you found it!', col: '#c9f2d4', mood: tk => tk > fB ? 'sparkle' : 'happy', youMood: tk => tk > fB + 0.5 ? 'happy' : 'neutral', hops: [fB + 0.3] }) },
    }, cues: [['pop', fA + 0.3, 523.25, 0.035, -0.4], ['pop', fB + 0.3, 1318.51, 0.04, 0.4]] },
  { sign: 'gemini', title: 'THE QUESTIONS', win: 'A', premise: 'You ask them *about their job.*', why: 'Good talk is *a two-way street.*',
    takes: {
      A: { draw: dateTake({ f: fA, line: 'love it! wait,\nwhat about you?', col: '#c9f2d4', mood: () => 'happy', youMood: tk => tk > fA + 0.6 ? 'sparkle' : 'neutral' }) },
      B: { draw: dateTake({ f: fB, line: '…and THEN I… and\nALSO I… and THEN…', mood: () => 'sparkle', youMood: tk => tk > fB + 1.0 ? 'sleepy' : 'neutral', hops: [fB + 0.5, fB + 0.9, fB + 1.3, fB + 1.7] }) },
    }, cues: [['pop', fA + 0.3, 1174.66, 0.04, -0.4], ['pop', fB + 0.3, 659.25, 0.035, 0.4], ['pop', fB + 0.6, 698.46, 0.035, 0.4], ['pop', fB + 0.9, 739.99, 0.035, 0.4]] },
  { sign: 'virgo', title: 'THE SILENCE', win: 'B', premise: 'The conversation *goes quiet.*', why: 'Quiet can be *comfortable.* Let it be.',
    takes: {
      A: { draw: dateTake({ f: fA, line: 'SO. the weather.\nwild. right?', mood: () => 'wide', youMood: () => 'wide', prop: (x, tk) => { if (tk > fA + 0.4) sweat(x, tk, 460, 340) } }) },
      B: { draw: dateTake({ f: fB, line: 'this is nice.', col: '#c9f2d4', mood: tk => tk > fB + 0.2 ? 'happy' : 'neutral', youMood: tk => tk > fB + 0.5 ? 'happy' : 'neutral' }) },
    }, cues: [['pop', fA + 0.3, 880, 0.035, -0.4], ['pop', fB + 0.3, 1318.51, 0.04, 0.4]] },
  { sign: 'libra', title: 'PLAN B', win: 'A', premise: 'The restaurant is *full.*', why: 'Plans break. *Good company* doesn’t.',
    takes: {
      A: { draw: dateTake({ f: fA, set: 'street', line: 'food truck picnic?', col: '#c9f2d4', mood: tk => tk > fA ? 'sparkle' : 'wide', youMood: tk => tk > fA + 0.5 ? 'happy' : 'wide', prop: fullSign, hops: [fA + 0.35] }) },
      B: { draw: dateTake({ f: fB, set: 'street', line: 'ugh. ruined.', mood: tk => tk > fB ? 'eyeroll' : 'wide', youMood: () => 'wide', prop: fullSign }) },
    }, cues: [['pop', fA + 0.3, 1567.98, 0.04, -0.4], ['pop', fB + 0.3, 440, 0.035, 0.4]] },
  { sign: 'aquarius', title: 'THE GOODBYE', win: 'B', premise: 'The end of the night. *At the door.*', ask: 'The goodbye. *Which take?*', why: 'x',
    takes: {
      A: { draw: dateTake({ f: fA, set: 'street', line: 'see ya.', mood: () => 'neutral', youMood: tk => tk > fA + 0.6 ? 'wide' : 'happy' }) },
      B: { draw: dateTake({ f: fB, set: 'street', line: 'I had fun.\ncan I see you again?', col: '#c9f2d4', mood: tk => tk > fB ? 'happy' : 'neutral', youMood: tk => tk > fB + 0.6 ? 'heart' : 'happy', hops: [fB + 0.7] }) },
    }, cues: [['pop', fA + 0.3, 523.25, 0.035, -0.4], ['pop', fB + 0.3, 1174.66, 0.04, 0.4], ['pop', fB + 0.45, 1567.98, 0.035, 0.4]] },
]

// the intro: the date trips through the café door, menus flying
function intro(x, t, C) {
  // a big café front across the middle
  R(x, '#3b2a55', 60, 420, 960, 820); for (let i = 60; i < 1020; i += 64) R(x, '#352650', i, 420, 32, 820)
  R(x, INK, 60, 1234, 960, 10); R(x, '#4a3524', 60, 1244, 960, 60)
  box(x, 410, 640, 260, 594, '#a0603a', { b: 8, hi: '#c07a4a' }); R(x, '#1c1640', 430, 660, 220, 574)
  box(x, 330, 470, 420, 90, BONE, { b: 8 }); x.font = `800 54px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('CAFÉ', 540, 517)
  // the trip: mid-air at frame 0, lands at 0.6, gets up
  const p = clamp(prog(t, -0.3, 0.6))
  const sx = lerp(540, 620, p), sy = lerp(980, 1110, ease.inQuad(p))
  const rot = lerp(0.9, 0, ease.outCubic(clamp(prog(t, 0.6, 1.3))))
  if (p < 1) streaks(x, t, sx - 60, sy, { dir: -1, n: 5, len: 100 })
  x.save(); x.translate(sx, sy); x.rotate(rot); x.translate(-sx, -sy)
  C.hero(x, t, { x: sx, y: sy, s: 260, mood: t < 1.3 ? 'wide' : 'happy', look: [0, 0] })
  x.restore()
  for (let i = 0; i < 3; i++) { const m = clamp(prog(t, -0.4 + i * 0.1, 1.2)); x.save(); x.translate(lerp(540, 300 + i * 240, m), lerp(950, 700 - i * 40, m) + 400 * m * m); x.rotate(m * (4 + i)); box(x, -40, -55, 80, 110, '#2a6e4a', { b: 5 }); R(x, BONE, -24, -36, 48, 6); x.restore() }
  if (t > 1.4) balloonText(x, 'ta-da!', 620, 860, { size: 44, col: GOLD, rot: -0.08 })
  void GREEN; void plate; void drawBits
}

const EP = makeGreenLong({
  id: 'ksge24', ending: 'loop',
  hook: 'ONE DATE. FIVE ROUNDS. | *WAIT FOR THE GOODBYE.*',
  promise: 'The *goodbye* decides it.',
  intro,
  rounds: ROUNDS,
  last: 'Said it at the door: *“Again?”*',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const SECTIONS = EP.SECTIONS
