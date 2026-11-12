// r2a0734: star_advice, ADVICE SOLO (gemini), "What Geminis won't | *say out loud.*" (signs3kit social cut, lofi · E).
// One sign the whole way: nine soft things a Gemini feels but rarely says, each with a warm reframe and one light gag.
// Ending: callback.
//   they miss you (six unsent drafts) · they overthink every reply · being "the fun one" is tiring (low battery)
//   · they remember what you said · plans change, feelings don't · they need quiet too · they want the deep talk
//   · they worry you'll get bored (you: still here) · "love you", in four spellings
//   (hook re-split so it fits two lines)
//   group "Says a lot. | *Means more.*"  →  callback: "Draft seven? | *Sent.*" (the unsent "miss you", finally sent)
import { makeFilm, sparkles, hearts, bubble, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, bits, swapLabel, zzz, friend, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffe066', S = 'gemini', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'They miss you. | *A lot.*', mood: lt => lt > 1.4 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const typed = lt < 1.3
      phone(x, t, 800, 880, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'DRAFTS', headCol: LAV, lines: [
        ['miss u', BONE, pop01(t, P.t0 + 0.4, 0.25, 2.2) * (typed ? 1 : 0)],
      ], typing: typed ? 0 : 1 })
      L(x, 800, 1130, `UNSENT: ${Math.min(6, 1 + Math.floor(lt / 0.4))}`, pop01(t, P.t0 + 0.7, 0.3, 2.2), PINK, 0.04, 32)
    } },
  { sign: S, cap: 'They overthink | *every reply.*', mood: lt => Math.floor(lt * 3) % 2 ? 'squint' : 'neutral', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const W = ['haha', 'haha!', 'hahaha', 'lol ok', 'haha :)']
      bubble(x, 800, 760, W[Math.min(4, Math.floor(lt / 0.45))], pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, tail: 'bl' })
      L(x, 800, 980, `REWRITE #${Math.min(9, 1 + Math.floor(lt * 3.6))}`, pop01(t, P.t0 + 0.5, 0.3, 2.2), STEEL, 0.04, 34)
    } },
  { sign: S, cap: '“The fun one” | gets *tired too.*', mood: lt => lt > 1.0 ? 'sleepy' : 'sparkle', star: ST,
    front(x, t, lt, P) {
      bits(x, 'BATT', 800, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = Math.max(1, 10 - Math.floor(lt * 4.5))
      x.fillStyle = n > 3 ? MINT : RED; for (let i = 0; i < n; i++) x.fillRect(703 + i * 18, 873, 14, 54)
      L(x, 800, 720, 'FUN MODE: LOW', pop01(t, P.t0 + 0.9, 0.3, 2.2), GOLD, -0.04, 34)
      L(x, 800, 1090, 'RECHARGE: ALLOWED', pop01(t, P.t0 + 1.7, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'They remember | *what you said.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 330, head: 'YOUR FAVES', headBg: '#ffb34a', headInk: INK, lines: ['mango (not peach)', 'that one song', 'rainy sundays'], size: 28, progress: clamp((lt - 0.3) / 1.2) })
      L(x, 800, 1110, 'SINCE: DAY ONE', pop01(t, P.t0 + 1.6, 0.3, 2.2), PINK, 0.04, 30)
    } },
  { sign: S, cap: 'Plans change. | *Feelings don’t.*', mood: lt => lt > 1.6 ? 'heart' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const PL = ['PLAN A: PICNIC', 'PLAN B: MOVIE', 'PLAN C: COUCH']
      L(x, 800, 760, PL[Math.min(2, Math.floor(lt / 0.6))], pop01(t, P.t0 + 0.2, 0.3, 2.2), CREAM, -0.04, 32)
      bits(x, 'HEARTB', 800, 960, 18 * pop01(t, P.t0 + 0.8, 0.3, 2.2))
      L(x, 800, 1120, 'YOU: STILL PLAN A', pop01(t, P.t0 + 1.7, 0.3, 2.2), PINK, 0.04, 30)
    } },
  { sign: S, cap: 'They need | *quiet too.*', mood: 'sleepy', star: ST,
    front(x, t, lt, P, F) {
      bits(x, 'MOON', 820, 780, 20 * pop01(t, P.t0 + 0.3, 0.3, 2))
      zzz(x, t, 700, 760, { alpha: clamp((lt - 0.6) / 0.4), size: 44 })
      L(x, 820, 1000, 'SOCIAL: PAUSED', pop01(t, P.t0 + 1.0, 0.3, 2.2), LAV, 0.04, 34)
    } },
  { sign: S, cap: 'Small talk is fun. | *Deep talk is better.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      swapLabel(x, 800, 760, lt, 0.9, 'NICE WEATHER, HUH', 'WHAT’S YOUR DREAM?', { size: 32, fromBg: STEEL, toBg: GOLD })
      L(x, 800, 1000, 'STAYED UP TILL 2', pop01(t, P.t0 + 1.7, 0.3, 2.2), LAV, 0.04, 32)
    } },
  { sign: S, cap: 'They worry | you’ll *get bored.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, 'aquarius', 820, 960, 200, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'happy', look: [-1, 0] })
      L(x, 820, 720, 'YOU: STILL HERE', pop01(t, P.t0 + 1.0, 0.3, 2.2), MINT, -0.04, 34)
      hearts(x, t, 820, 900, P.t0 + 1.5, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 6 })
    } },
  { sign: S, cap: 'They love you. | In *every spelling.*', mood: lt => lt > 1.0 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const W = ['love you', 'ily', 'luv u', 'LOVE YOU']
      bubble(x, 800, 800, W[Math.min(3, Math.floor(Math.max(0, lt - 0.2) / 0.5))], pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 50, col: PINK, tail: 'bl' })
      sparkles(x, t, 800, 800, P.t0 + 1.7, 7, 160, 0.4)
    } },
]

const F = makeFilm({
  id: 'r2a0734', key: 'E', accent: ACC, solo: S, ending: 'callback',
  title: 'What Geminis won’t | *say out loud.*',
  cameos: CAMEOS,
  group: { cap: 'Says a lot. | *Means more.*', mood: 'heart' },
  last: {
    text: 'Draft seven? | *Sent.*',
    draw(x, t, lt) {
      const t0 = t - lt
      hearts(x, t, 540, 1250, t0 + 1.8, { n: 7, life: 1.8, spread: 520, cell: 8, seed: 3 })
      phone(x, t, 540, 1100, 1.6 * pop01(t, t0 + 0.5, 0.35, 2), { head: 'SENT ✓', headCol: MINT, lines: [
        ['miss you', BONE, pop01(t, t0 + 0.9, 0.25, 2.2), true],
        ['miss you MORE', PINK, pop01(t, t0 + 1.6, 0.25, 2.2)],
      ] })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
