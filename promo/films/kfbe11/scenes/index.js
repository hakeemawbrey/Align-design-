// kfbe11: FIRST DATE BINGO E11, "Aquarius asks the weird question" (vertical, star_talk post, music: synthwave · Ebm).
// No end card, no card transition; LOOP ending (the date asks one back, the "?" spins up again: frame 0).
//   0.0   frame 0: ♒ Aquarius mid-question, a giant pixel "?" spinning over the table; the dauber mid-slam on ASKS THE
//         WEIRD QUESTION. Hook: "Aquarius asked | *the weird question.*"  0.3 whip.
//   0.9   record scratch: "one giant duck *or ten tiny dogs?*" (as pets)
//   3.2   EXPLAINS A NICHE HOBBY (a tiny pixel moth diagram) · 4.6 "I'M NOT LIKE MOST PEOPLE"
//   5.8   ♊ Gemini: "ten dogs. they'd have tiny jobs." → THEY LOVED IT (6.8) → BINGO (7.05) · 8.0 the host sobs
//   8.4   "Your weird | *found its person.*" · 10.2 Gemini: "ok. would you rather…" → loop.
import { makeBingo, cafe, table, candle, star, label, shadow, hearts, drawBits, R, box, prog, lerp, ease, outK, pop01, inK, win01, r3, INK, BONE, GOLD, INTER, MONO } from '../../kfbe01/scenes/bingokit.js'

const D = 11.8
const T = { rec: 0.9, hobby: 3.2, s1: 3.6, notlike: 4.6, s2: 5.0, answer: 5.8, s3: 6.8, bingo: 7.05, sob: 8.0, last: 8.4, back: 10.2 }

function question(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy + 10 * Math.sin(t * 3)); x.scale(k * Math.cos(t * 3.2), k)
  drawBits(x, ['.QQQQ.', 'QQ..QQ', '....QQ', '...QQ.', '..QQ..', '..QQ..', '......', '..QQ..'], { Q: '#7fd0ff' }, 0, 0, 22)
  x.restore()
}

const EP = makeBingo({
  id: 'kfbe11', D, n: 3, ink: '#3a8af0', cardTag: '♒ × ♊', ending: 'loop',
  squares: [
    { text: 'WEARS ONE GLOVE ON PURPOSE' }, { text: 'ASKS THE WEIRD QUESTION', at: -0.04 }, { text: 'HAS A THEORY ABOUT PIGEONS' },
    { text: 'EXPLAINS A NICHE HOBBY', at: T.s1 }, { free: true }, { text: 'BROUGHT A HOMEMADE GADGET' },
    { text: 'TALKS TO THE CANDLE' }, { text: 'THEY LOVED IT', at: T.s3 }, { text: '"I’M NOT LIKE MOST PEOPLE"', at: T.s2 },
  ],
  win: [1, 4, 7], bingoAt: T.bingo,
  hook: { text: 'Aquarius asked | *the weird question.*', out: [2.9, 3.1], accentColor: '#7fd0ff' },
  rec: { at: T.rec, len: 1.4, caption: 'one giant duck *or ten tiny dogs?*', sub: 'as pets. it matters.', top: 1000 },
  heads: [{ text: 'Your weird | *found its person.*', at: T.last, out: [10.9, 11.3], accent: '#7fd0ff', late: 3, lateAt: T.last + 0.4, wobble: true }],
  scene(x, t) {
    cafe(x, t, { wall: '#1a2440', trim: '#24305a' })
    let am = 'sparkle', al = [1, 0]
    if (t > T.hobby && t < T.answer) { am = 'happy'; al = undefined }
    if (t > T.notlike && t < T.answer) { am = 'squint'; al = [1, 0] }
    if (t > T.answer) { am = 'wide'; al = [1, 0] }
    if (t > T.s3) { am = 'heart'; al = undefined }
    if (t > T.back) { am = 'sparkle'; al = [1, 0] }
    shadow(x, 290, 1150, 220)
    star(x, t, 'aquarius', { x: 290, y: 880, s: 250, mood: am, look: al, hops: [T.hobby, T.notlike, T.s3, T.bingo + 0.3], seed: 12 })
    let gm = 'wide', gl = [-1, 0]
    if (t > T.answer - 0.2) { gm = 'happy'; gl = undefined }
    if (t > T.back) { gm = 'sparkle'; gl = [-1, 0] }
    shadow(x, 790, 1150, 210)
    star(x, t, 'gemini', { x: 790, y: 890, s: 230, mood: gm, look: gl, hops: [T.answer, T.answer + 0.4, T.answer + 0.8, T.back], seed: 5 })
    table(x, 540, 1010, 520)
    candle(x, t, 540, 1010)
    // the spinning "?" (frame 0, and spinning up again for the loop)
    const qk = Math.max(1 - inK(t, 2.8, 0.3), inK(t, T.back + 0.4, 0.8))
    question(x, t, 540, 700, qk)
    // the moth diagram (niche hobby)
    const mk = pop01(t, T.hobby, 0.3, 2.2) * outK(t, [T.notlike - 0.2, T.notlike])
    if (mk > 0.01) { x.save(); x.translate(470, 650); x.scale(mk, mk); box(x, -150, -90, 300, 180, '#f4f0e0', { b: 6 }); drawBits(x, ['MM...MM', 'MMM.MMM', '.MMBMM.', '..MBM..', '.MMBMM.', 'MM...MM'], { M: '#c8a070', B: INK }, 0, -10, 18); x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.fillStyle = INK; x.fillText('MOTHS: A LOVE STORY', 0, 74); x.restore() }
    // tiny dogs with tiny jobs
    if (t > T.answer && t < T.back) { for (let i = 0; i < 5; i++) { const k = pop01(t, T.answer + 0.3 + i * 0.12, 0.25, 2.4) * outK(t, [T.bingo - 0.1, T.bingo + 0.2]); if (k > 0.01) drawBits(x, ['D..D..', 'DDDDD.', '.DDDDD', '.D..D.'], { D: ['#c8a070', '#f4f0e0', '#8a5a3c'][i % 3] }, 560 + i * 70, 640 - (i % 2) * 40, 8 * k) } }
    if (t > T.s3 && t < T.back) hearts(x, t, T.s3, 290, 720, { n: 4 })
  },
  bubbles: [
    { t0: -1.2, t1: 2.8, x: 330, y: 590, text: 'ok. would you rather…', size: 40, tail: -0.2 },
    { t0: T.notlike, t1: T.answer - 0.1, x: 340, y: 620, text: 'I’m not like most people.', size: 36, tail: -0.2 },
    { t0: T.answer, t1: T.last - 0.1, x: 740, y: 720, text: 'ten dogs. they’d have tiny jobs.', size: 32, tail: 0.3 },
    { t0: T.sob, t1: T.back, x: 790, y: 448, text: 'WEIRD + WEIRD!!', size: 34, tail: 0.5, col: '#cfe8ff' },
    { t0: T.back, t1: D + 1, x: 720, y: 680, text: 'ok. would you rather…', size: 40, tail: 0.3 },
  ],
  cues: [['pluck', T.hobby, 1174.66, 0.035, 0.4, -0.3], ['pop', T.notlike, 880, 0.035, -0.3], ...Array.from({ length: 5 }, (_, i) => ['pop', r3(T.answer + 0.3 + i * 0.12), [1318.51, 1567.98, 1760][i % 3], 0.025, 0.3]), ['riser', T.back + 0.4, D - 0.1, 0.02]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [label, lerp, ease, win01, GOLD, BONE, INTER]
