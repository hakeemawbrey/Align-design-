// kfbe08: FIRST DATE BINGO E8, "Scorpio asks the deep question first" (vertical, star_talk post, music: screwed · Fm).
// No end card, no card transition; hard cut on the last line.
//   0.0   frame 0: ♏ Scorpio mid-lean across the table, eyes lit, the candle flickering hard; "what’s your biggest
//         fear?" already in the air; the dauber mid-slam on ASKS THE DEEP QUESTION FIRST. Hook: "Scorpio skipped
//         | *small talk.*"  0.55 record scratch: "the menus *aren’t even open.*"
//   2.9   an EYE CONTACT meter climbs to 11/10 → INTENSE EYE CONTACT (3.6)
//   4.6   ♋ Cancer mentions a dog; Scorpio: "Biscuit. age four. likes socks." → REMEMBERS EVERY DETAIL (5.4)
//   6.2   Cancer answers for real ("losing people") and asks one back → THEY ASKED ONE BACK (7.4) → BINGO (7.65)
//   8.6   the host: "THEY’RE SO HONEST" · 9.3 "Deep end? | *They brought a float.*" · hard cut.
import { makeBingo, cafe, table, candle, star, label, shadow, hearts, glow, drawBits, R, box, prog, lerp, ease, outK, pop01, inK, win01, r3, INK, BONE, GOLD, INTER, MONO } from '../../kfbe01/scenes/bingokit.js'

const D = 12.2
const T = { rec: 0.55, meter: [2.9, 3.6], s1: 3.6, dog: 4.6, s2: 5.4, answer: 6.2, ask: 6.9, s3: 7.4, bingo: 7.65, sob: 8.6, last: 9.3 }

const EP = makeBingo({
  id: 'kfbe08', D, n: 3, ink: '#9a40e0', cardTag: '♏ × ♋',
  squares: [
    { text: 'ASKS THE DEEP QUESTION FIRST', at: -0.04 }, { text: 'INTENSE EYE CONTACT', at: T.s1 }, { text: 'THEY ASKED ONE BACK', at: T.s3 },
    { text: 'SITS FACING THE DOOR' }, { free: true }, { text: 'REMEMBERS EVERY DETAIL', at: T.s2 },
    { text: 'WEARS ALL BLACK (IT’S A LOOK)' }, { text: '"TELL ME SOMETHING REAL"' }, { text: 'SMILES ONCE. IT COUNTS.' },
  ],
  win: [0, 1, 2], bingoAt: T.bingo,
  hook: { text: 'Scorpio skipped | *small talk.*', out: [2.6, 2.8], accentColor: '#c88aff' },
  rec: { at: T.rec, len: 1.4, caption: 'the menus *aren’t even open.*', sub: 'two minutes in', top: 1000 },
  heads: [{ text: 'Deep end? | *They brought a float.*', at: T.last, accent: '#c88aff', late: 3, lateAt: T.last + 0.4, wobble: true }],
  scene(x, t) {
    cafe(x, t, { wall: '#20162e', trim: '#2c1e40', lights: t > T.answer })
    glow(x, 540, 900, 380, 0.18 + 0.06 * Math.sin(t * 17))
    let sm = 'wide', sl = [1, 0]
    if (t > T.dog && t < T.answer) { sm = 'squint'; sl = [1, 0] }
    if (t > T.answer) { sm = 'neutral'; sl = [1, 0] }
    if (t > T.ask + 0.3) { sm = 'happy'; sl = undefined }
    if (t > T.bingo + 0.6) sm = 'heart'
    const lean = t < T.answer ? 1 : 1 - inK(t, T.answer, 0.5)
    shadow(x, 320 + 40 * lean, 1150, 220)
    star(x, t, 'scorpio', { x: 300 + 60 * lean, y: 880 - 20 * lean, s: 250, mood: sm, look: sl, blink: t < T.answer ? false : undefined, hops: [T.s1, T.s2 - 0.6, T.ask + 0.3, T.bingo + 0.3], seed: 10 })
    let cm = 'wide', cl = [-1, 0]
    if (t > T.dog - 0.3 && t < T.s2) { cm = 'happy'; cl = undefined }
    if (t > T.s2) { cm = 'wide' }
    if (t > T.answer) { cm = 'neutral'; cl = [-1, 0.3] }
    if (t > T.ask) { cm = 'happy'; cl = undefined }
    shadow(x, 790, 1150, 210)
    star(x, t, 'cancer', { x: 790, y: 890, s: 230, mood: cm, look: cl, hops: [T.dog, T.ask, T.bingo + 0.4], seed: 2, tears: t > T.answer && t < T.ask + 0.6 ? 1 : 0 })
    table(x, 540, 1010, 520)
    candle(x, t, 540, 1010)
    // the eye-contact meter
    const mk = pop01(t, T.meter[0], 0.3, 2) * outK(t, [T.dog - 0.2, T.dog])
    if (mk > 0.01) {
      x.save(); x.translate(540, 650); x.scale(mk, mk)
      box(x, -220, -50, 440, 100, 'rgba(16,9,38,0.92)', { b: 6 })
      x.font = `700 24px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText('EYE CONTACT', -200, -24)
      const f = ease.outCubic(prog(t, ...T.meter)) * 1.1
      R(x, '#2a1f55', -200, 0, 400, 28); R(x, '#c88aff', -200, 0, Math.min(1, f) * 400, 28)
      if (f > 1) { R(x, '#ff3b55', 200, 0, (f - 1) * 400 + 6 * Math.sin(t * 30), 28) }
      x.textAlign = 'right'; x.fillStyle = f > 1 ? '#ff6177' : BONE; x.fillText(f > 1 ? '11/10' : `${Math.round(f * 10)}/10`, 200, -24)
      x.restore()
    }
    if (t > T.bingo + 0.6) hearts(x, t, T.bingo + 0.6, 340, 720, { n: 4 })
  },
  bubbles: [
    { t0: -1.2, t1: 2.75, x: 520, y: 660, text: 'what’s your biggest fear?', size: 42, tail: -0.3 },
    { t0: T.dog, t1: T.s2 - 0.1, x: 740, y: 700, text: 'my dog Biscuit says hi', size: 34, tail: 0.3 },
    { t0: T.s2 - 0.5, t1: T.answer - 0.1, x: 380, y: 600, text: 'Biscuit. age four. likes socks.', size: 34, tail: -0.2 },
    { t0: T.answer, t1: T.ask - 0.05, x: 720, y: 690, text: 'honestly? losing people.', size: 36, tail: 0.3 },
    { t0: T.ask, t1: T.last - 0.1, x: 700, y: 690, text: 'what’s yours?', size: 40, tail: 0.3 },
    { t0: T.sob, t1: D + 1, x: 790, y: 448, text: 'THEY’RE SO HONEST', size: 32, tail: 0.5, col: '#cfe8ff' },
  ],
  cues: [['riser', T.meter[0], T.meter[1], 0.025], ['pluck', T.meter[1], 2349.32, 0.03, 0.4, 0], ['pop', T.dog, 1174.66, 0.035, 0.3], ['pluck', T.answer, 587.33, 0.035, 0.8, 0.3], ['pluck', T.ask, 1318.51, 0.04, 0.5, 0.3]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [label, drawBits, lerp, win01, GOLD, INTER, INK]
