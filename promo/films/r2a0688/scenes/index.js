// r2a0688: star_advice, ADVICE SOLO (gemini), "How to make friends | *with a Gemini.*" (signs3kit social cut, lofi · C).
// One sign the whole way: nine warm, slightly silly ways to befriend a Gemini, one light gag each.
//   bring one weird fact (they bring ten) · the 2 a.m. voice note · plan D is the best plan · fast talk, big heart
//   · both moods welcome · one meme in, twelve back · ask about the new hobby · a quiet day, just sit · ask their sign
//   (they'll ask your rising)
// Ending: callback. group "Curious. Chatty. | *So loyal.*" · then "Fact #11: | *You're their fave.*" (the fact sheet returns)
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, bits, chart, friend, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffd23a', S = 'gemini', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'Bring one weird fact. | *They’ll bring ten.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.0, 1.6],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.6) / 1.2) * 9)
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 300, head: 'FUN FACTS', headBg: GOLD, headInk: INK, lines: ['octopi: 3 hearts', 'snails nap 3 days', `+ ${Math.max(0, n - 2)} more…`], size: 28, align: 'left' })
      L(x, 800, 1100, `FACT #${n}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), PINK, -0.04, 38)
    } },
  { sign: S, cap: 'A 2 a.m. voice note? | *You’re their person.*', mood: lt => lt > 1.3 ? 'heart' : 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 810, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '2:04 AM', headCol: LAV, lines: [['▶ ∿∿∿∿ 38:12', GOLD, pop01(t, P.t0 + 0.5, 0.2, 2), false], ['part 2 of 3', STEEL, pop01(t, P.t0 + 1.0, 0.2, 2), false], ['listening ♡', MINT, pop01(t, P.t0 + 1.6, 0.2, 2), true]], size: 26 })
    } },
  { sign: S, cap: 'Plans changed again? | *Plan D is the fun one.*', mood: lt => lt > 1.5 ? 'sparkle' : 'wink', look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      const i = Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.4))
      L(x, 800, 820, `PLAN ${'ABCD'[i]}${i === 3 ? ' ✓' : '?'}`, pop01(t, P.t0 + 0.2, 0.3, 2), i === 3 ? MINT : STEEL, i % 2 ? 0.05 : -0.05, 60)
      if (i === 3) sparkles(x, t, 800, 820, P.t0 + 0.3 + 1.2 * 1.0, 7, 170, 0.4)
      L(x, 800, 1040, 'ROLLERBLADING. AT NIGHT.', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, 0.04, 28)
    } },
  { sign: S, cap: 'They talk fast. | *Listen for the heart.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'and then—also—wait—', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, tail: 'bl' })
      bits(x, 'HEARTB', 800, 920, 18 * pop01(t, P.t0 + 1.2, 0.35, 2.4))
      L(x, 800, 1100, 'WORDS PER MIN: MANY', pop01(t, P.t0 + 0.7, 0.3, 2.2), PINK, -0.04, 28)
    } },
  { sign: S, cap: 'Two moods in one hour? | *Welcome both.*', mood: lt => Math.floor(lt * 2) % 2 ? 'squint' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, S, 720, 900, 150, pop01(t, P.t0 + 0.3, 0.3, 2), { mood: 'sparkle', seed: 12 })
      friend(x, t, S, 890, 900, 150, pop01(t, P.t0 + 0.5, 0.3, 2), { mood: 'sleepy', seed: 14 })
      L(x, 720, 720, 'CHATTY', pop01(t, P.t0 + 0.6, 0.3, 2), GOLD, -0.06, 30)
      L(x, 890, 720, 'QUIET', pop01(t, P.t0 + 0.8, 0.3, 2), LAV, 0.06, 30)
      L(x, 800, 1100, 'BOTH: WELCOME', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Send one meme. | *Get twelve back.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.1, 1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = Math.min(12, Math.floor(clamp((lt - 0.7) / 1.0) * 12))
      phone(x, t, 810, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'BESTIE ♊', headCol: GOLD, lines: [['lol (1 meme)', MINT, pop01(t, P.t0 + 0.4, 0.2, 2), true], [`${n} memes`, PINK, n > 0 ? 1 : 0, false], ['LOL', PINK, n > 6 ? 1 : 0, false]], size: 26 })
      L(x, 810, 1110, 'FRIENDSHIP: SEALED', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'New hobby this month? | *Ask about it.*', mood: lt => lt > 1.3 ? 'heart' : 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      swapLabel(x, 800, 800, lt, 0.9, 'HOBBY: POTTERY', 'HOBBY: BEEKEEPING', { size: 34, fromBg: STEEL, toBg: GOLD })
      bubble(x, 800, 1010, 'tell me more!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'A quiet Gemini day? | *Just sit with them.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'COUCH', 800, 960, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      friend(x, t, 'cancer', 800, 860, 140, pop01(t, P.t0 + 0.5, 0.3, 2), { mood: 'happy', look: [-1, 0], seed: 9 })
      L(x, 800, 680, 'NO TALKING NEEDED', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, 0.04, 30)
    } },
  { sign: S, cap: 'Ask their sign. | *They’ll ask your rising.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      chart(x, 800, 880, 140, pop01(t, P.t0 + 0.3, 0.35, 2), t)
      bubble(x, 790, 650, 'and your moon??', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bl' })
      sparkles(x, t, 800, 880, P.t0 + 1.2, 6, 180, 0.3)
    } },
]

const F = makeFilm({
  id: 'r2a0688', key: 'C', accent: ACC, solo: S, ending: 'callback',
  title: 'How to make friends | *with a Gemini.*',
  cameos: CAMEOS,
  group: { cap: 'Curious. Chatty. | *So loyal.*', mood: 'sparkle' },
  last: {
    text: 'Fact #11: | *You’re their fave.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, S, 380, 1150, 280 * k, { mood: lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], seed: 7, hops: [t0 + 1.5] })
      sheet(x, 730, 1130, pop01(t, t0 + 0.5, 0.35, 2), { w: 320, h: 260, head: 'FUN FACTS', headBg: GOLD, headInk: INK, lines: ['#10: snails nap', ['#11: you ♡', '#c2185b']], size: 30, align: 'left', rot: 0.05 })
      hearts(x, t, 560, 1000, t0 + 1.4, { n: 6, life: 1.8, spread: 300, cell: 7, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
// the hook is long: widen the title box so each ' | ' line stays on one line, then scale it down to the safe width
async function build(stage) {
  const sc = await F.SCENES[0](stage)
  const tb = sc.root.children[1].children[1]
  Object.assign(tb.style, { left: '-20px', width: '1120px', transformOrigin: '50% 0', transform: 'scale(0.84)' })
  return sc
}
export const SCENES = [build]
export const CUES = F.CUES
export const T = F.T
