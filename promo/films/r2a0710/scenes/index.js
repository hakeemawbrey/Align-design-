// r2a0710: star_advice, ADVICE SOLO (gemini), "How to apologise | *to a Gemini.*" (signs3kit social cut, lofi · G).
// One sign the whole way: nine kind, very Gemini ways to make up, each a relatable truth + a warm reframe with one light
// gag. Ending: callback (card 2's rubber duck comes back to confirm you're forgiven).
//   keep it short, they're mid-thought · make them laugh first (one squeaky duck) · text and call, both twins should
//   hear · bring a fun fact · hear their whole side, all three versions · name one thing you'll do differently · plan a
//   tiny adventure together · let them talk it out, out loud · just mean it, they can tell
//   last "Forgiven? | *Ask the duck.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffe06a', S = 'gemini', ST = { x: -190 }
const squeak = (x, t, cx, cy, cell, t0) => {
  const sq = Math.max(0, Math.sin((t - t0) * 9)) * (t > t0 ? 1 : 0)
  bits(x, 'DUCK', cx, cy, cell, { sy: 1 - 0.12 * sq, sx: 1 + 0.08 * sq })
}

const CAMEOS = [
  { sign: S, cap: 'Keep it short. | *They’re mid-thought.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 760, 'sorry!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 60, tail: 'bl' })
      L(x, 800, 1000, 'ACCEPTED. NEXT TOPIC.', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, -0.04, 28)
    } },
  { sign: S, cap: 'Make them laugh first. | *Then say sorry.*', mood: lt => lt > 1.1 ? 'squint' : 'neutral', look: [1, 0], star: ST, hops: [1.1, 1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      squeak(x, t, 800, 940, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), P.t0 + 0.9)
      L(x, 800, 690, 'SQUEAK.', pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD, 0.05, 40)
      L(x, 800, 1110, 'GIGGLE: UNLOCKED', pop01(t, P.t0 + 1.6, 0.3, 2.2), PINK, -0.04, 30)
    } },
  { sign: S, cap: 'Text and call. | *Both twins should hear.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'GEMINI ♊', headCol: ACC, size: 24, lines: [
        ['i’m sorry :(', BONE, pop01(t, P.t0 + 0.5, 0.25, 2), true], ['(missed call)', STEEL, pop01(t, P.t0 + 0.9, 0.25, 2), true], ['ok ok we’re good', MINT, pop01(t, P.t0 + 1.5, 0.25, 2), false]] })
    } },
  { sign: S, cap: 'Bring a fun fact. | *Forgiven by the end.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOOK', 800, 1010, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      bubble(x, 800, 720, 'octopuses have | three hearts', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 800, 880, 'WAIT, TELL ME MORE', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 30, tail: 'br', col: ACC })
    } },
  { sign: S, cap: 'Hear their whole side. | *All three versions.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) sheet(x, 690 + i * 70, 840 + i * 50, pop01(t, P.t0 + 0.2 + i * 0.35, 0.3, 2), { w: 200, h: 200, rot: (i - 1) * 0.08, head: `VERSION ${i + 1}`, headBg: [PINK, SKYB, MINT][i], headInk: INK, lines: ['so basically…'], size: 26 })
      L(x, 800, 1110, 'YOU: LISTENING ✓', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Name one thing | *you’ll do differently.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 280, head: 'NEXT TIME', headBg: ACC, headInk: INK, lines: ['i’ll text back', 'before the', 'weekend'], size: 30, progress: clamp((lt - 0.3) / 1.0) })
      L(x, 800, 1090, 'NOTED. LOVED.', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Plan a tiny adventure. | *Fresh start, together.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.9, 1.6],
    front(x, t, lt, P) {
      bits(x, 'MAP', 800, 920, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.05 })
      L(x, 800, 690, 'NEW CAFÉ? NEW TRAIL?', pop01(t, P.t0 + 0.8, 0.3, 2.2), CREAM, 0.05, 30)
      L(x, 800, 1110, 'BOTH. OBVIOUSLY.', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Let them talk it out. | *Out loud. At length.*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 680, 'and ANOTHER thing', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 820, 820, 'also, side note', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 790, 960, 'ok i feel better', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl', col: MINT })
      L(x, 800, 1110, 'YOU: NODDING', pop01(t, P.t0 + 1.8, 0.3, 2.2), LAV, 0.04, 30)
    } },
  { sign: S, cap: 'Mostly? Just mean it. | *They can tell.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'HEARTB', 800, 900, lerp(20, 26, (Math.sin(t * 6) + 1) / 2) * pop01(t, P.t0 + 0.3, 0.35, 2))
      hearts(x, t, 800, 860, P.t0 + 1.1, { n: 6, life: 1.8, spread: 220, cell: 7, seed: 5 })
      L(x, 800, 1110, 'FRIENDSHIP: RESTORED', pop01(t, P.t0 + 1.5, 0.3, 2.2), PINK, -0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2a0710', key: 'G', accent: ACC, solo: S, ending: 'callback',
  title: 'How to apologise | *to a Gemini.*',
  cameos: CAMEOS,
  group: { cap: 'Talk it out. | *Laugh it off.*', mood: 'heart' },
  last: {
    text: 'Forgiven? | *Ask the duck.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.4, 1.8)
      if (k > 0.01) signChar(x, t, S, 330, 1150, 300 * k, { mood: lt > 1.4 ? 'squint' : 'happy', look: [1, 0], seed: 40, hops: [t - lt + 1.4, t - lt + 1.7] })
      squeak(x, t, 720, 1180, 22 * pop01(t, t - lt + 0.7, 0.4, 2), t - lt + 1.3)
      L(x, 720, 1360, 'SQUEAK = YES', pop01(t, t - lt + 1.5, 0.3, 2.4), GOLD, -0.04, 38)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
