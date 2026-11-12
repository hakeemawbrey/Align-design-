// r2a0729: star_advice, ADVICE SOLO (gemini), "Gemini, both of you | *are welcome here.*" (signs3kit social cut, lofi · E).
// One sign the whole way: nine warm truths about Gemini's two sides, each with a kind reframe and one light gag.
// Ending: callback (the two saved seats come back, both filled).
//   three hours of talking, still listening · a quiet day after, totally fair · changed your mind again, allowed
//   · two new hobbies, both cool · silly and serious, same great person · big group or one friend, both count
//   · gone quiet for a week, welcome back · the chart has two sides, both shine · a seat saved for you, two actually
//   group "Every version | *is welcome.*" · last "Two seats. | *Always saved.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, phone, bits, swapLabel, zzz, chart, B, C, RED, CREAM, STEEL, WOOD, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffd23a', S = 'gemini', ST = { x: -190 }
Object.assign(B, {
  CHAIR: ['.WWWWWW.', '.WPPPPW.', '.WPPPPW.', '.WPPPPW.', 'WWWWWWWW', 'WPPPPPPW', 'W......W', 'W......W', 'W......W'],
  YARN: ['..PPPP..', '.PPWPPP.', 'PPWPPPPP', 'PWPPPWPP', 'PPPPWPPP', '.PPWPPP.', '..PPPP.S', '.......S'],
})
Object.assign(C, { CHAIR: { W: WOOD, P: PINK }, YARN: { P: LAV, W: '#e6dcff', S: STEEL } })
const tiny = (x, t, id, cx, cy, s, k, o = {}) => { if (k > 0.01) signChar(x, t, id, cx, cy, s * k, { glyph: false, seed: 60, ...o }) }

const CAMEOS = [
  { sign: S, cap: 'Talked for three hours? | *We\'re still listening.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const w = ['and then...', 'oh! also—', 'wait, one more'] 
      w.forEach((s, i) => bubble(x, 790 + (i % 2) * 30, 680 + i * 140, s, pop01(t, P.t0 + 0.3 + i * 0.4, 0.25, 2.2), { size: 38, tail: 'bl' }))
      L(x, 800, 1120, 'HOUR 3: STILL FUN', pop01(t, P.t0 + 1.7, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Need a quiet day after? | *Totally fair.*', mood: 'sleepy', star: { x: -190, y: 20 },
    front(x, t, lt, P) {
      bits(x, 'BLANKET', 800, 1000, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 720, 'SOCIAL BATTERY: 2%', pop01(t, P.t0 + 0.6, 0.3, 2.2), STEEL, -0.04, 30)
      L(x, 800, 840, 'RECHARGING ♡', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 34)
      if (lt > 1.0) zzz(x, t, 480, 700, { alpha: clamp((lt - 1.0) / 0.3), size: 44 })
    } },
  { sign: S, cap: 'Changed your mind again? | *Allowed.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'pasta tonight!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, tail: 'bl' })
      swapLabel(x, 800, 900, lt, 1.0, 'ORDER: PASTA', 'ORDER: TACOS', { size: 36, fromBg: STEEL, toBg: GOLD })
      L(x, 800, 1090, '✓ CHEF SAYS: SURE', pop01(t, P.t0 + 1.8, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Two new hobbies this week? | *Both cool.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'YARN', 700, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'SKATEX', 890, 930, 16 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: -0.1 })
      L(x, 700, 1060, 'KNITTING', pop01(t, P.t0 + 0.8, 0.3, 2.2), LAV, -0.05, 30)
      L(x, 900, 1080, 'SKATING', pop01(t, P.t0 + 1.1, 0.3, 2.2), PINK, 0.05, 30)
      L(x, 800, 700, 'BOTH: VALID', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.03, 36)
    } },
  { sign: S, cap: 'Silly and serious? | *Same great person.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      tiny(x, t, S, 700, 900, 160, pop01(t, P.t0 + 0.3, 0.3, 2), { mood: 'wink', hops: [P.t0 + 1.0, P.t0 + 1.6] })
      tiny(x, t, S, 900, 900, 160, pop01(t, P.t0 + 0.5, 0.3, 2), { mood: 'neutral' })
      bits(x, 'SHADES', 900, 880, 9 * pop01(t, P.t0 + 0.8, 0.3, 2))
      bubble(x, 700, 700, 'boop!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 900, 700, 'indeed.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, col: LAV, tail: 'br' })
      L(x, 800, 1110, 'ONE GEMINI', pop01(t, P.t0 + 1.8, 0.3, 2.4), GOLD, 0.04, 34)
    } },
  { sign: S, cap: 'Big group or one friend? | *Both count.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const grp = ['aries', 'leo', 'sagittarius', 'aquarius']
      grp.forEach((id, i) => tiny(x, t, id, 650 + (i % 2) * 120, 780 + Math.floor(i / 2) * 120, 110, pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2), { mood: 'happy' }))
      tiny(x, t, 'cancer', 910, 820, 130, pop01(t, P.t0 + 0.9, 0.3, 2), { mood: 'heart' })
      L(x, 800, 1080, 'FRIENDSHIP: ANY SIZE', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Gone quiet for a week? | *Welcome back.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 790, 880, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'BESTIE', lines: [['back! sorry', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2), true], ['missed u!!', MINT, pop01(t, P.t0 + 1.2, 0.25, 2.2)], ['♡ no stress', PINK, pop01(t, P.t0 + 1.6, 0.25, 2.2)]], size: 24 })
    } },
  { sign: S, cap: 'Your chart has two sides. | *Both shine.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 800, 860, 150, pop01(t, P.t0 + 0.2, 0.35, 2), t * 0.3)
      L(x, 800, 1090, 'SIDE A ✦ SIDE B ✦', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 32)
      sparkles(x, t, 700, 860, P.t0 + 1.3, 6, 110, 0.1); sparkles(x, t, 900, 860, P.t0 + 1.5, 6, 110, 0.6)
    } },
  { sign: S, cap: 'There\'s a seat for you. | *Two, actually.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CHAIR', 690, 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'CHAIR', 870, 960, 20 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 800, 720, 'RESERVED: GEMINI ×2', pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD, -0.04, 30)
      hearts(x, t, 800, 900, P.t0 + 1.4, { n: 4, life: 1.6, spread: 200, cell: 6, seed: 2 })
    } },
]
Object.assign(B, { SKATEX: ['..WW......', '..WW......', '..WWWWWW..', '..WWWWWWW.', 'WWWWWWWWWW', '.K......K.', 'KKK....KKK', '.K......K.'] })
Object.assign(C, { SKATEX: { W: PINK, K: INK } })

const F = makeFilm({
  id: 'r2a0729', key: 'E', accent: ACC, solo: S, ending: 'callback',
  title: 'Gemini, both of you | *are welcome here.*',
  cameos: CAMEOS,
  group: { cap: 'Every version | *is welcome.*', mood: 'heart' },
  last: {
    text: 'Two seats. | *Always saved.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.4, 2)
      bits(x, 'CHAIR', 400, 1120, 26 * k); bits(x, 'CHAIR', 680, 1120, 26 * k)
      tiny(x, t, S, 400, 940, 200, pop01(t, t - lt + 1.0, 0.35, 2), { mood: 'wink', hops: [t - lt + 1.2] })
      tiny(x, t, S, 680, 940, 200, pop01(t, t - lt + 1.3, 0.35, 2), { mood: 'heart', hops: [t - lt + 1.5] })
      hearts(x, t, 540, 860, t - lt + 1.6, { n: 6, life: 1.8, spread: 360, cell: 8, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
