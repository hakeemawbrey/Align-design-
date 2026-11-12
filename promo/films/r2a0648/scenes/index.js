// r2a0648: star_advice, ADVICE SOLO (gemini), "Gemini, it’s okay | to *start over.*" (signs3kit social cut, music: lofi · C).
// One sign the whole way: nine gentle permissions for a curious, ever-changing Gemini to begin again, one light gag each.
// Ending: group.
//   third new journal (page one is a gift) · changed your major again (ART → SCIENCE) · deleted the draft · lost the story
//   mid-sentence ("so anyway—") · new city, same heart (suitcase) · fifty open tabs (close them) · the plant didn't make it
//   (round two) · a friendship faded ("hey! it's been a while") · new chapter (the chart says go)
//   group (the ending): "Fresh starts | *suit you.*"  The big Gemini comes back, sparkling.
import { makeFilm, sparkles, hearts, bubble, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, bits, phone, chart, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffd23a', S = 'gemini', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'Third new journal this year? | *Page one is a gift.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wink', star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOOK', 790, 840, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      L(x, 790, 1050, 'JOURNAL #3', pop01(t, P.t0 + 0.8, 0.3, 2.2), GOLD, -0.05, 40)
    } },
  { sign: S, cap: 'Changed your major again? | You’re *learning you.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.3, 2)
      if (k < 1) L(x, 790, 860, 'MAJOR: ART', k, STEEL, -0.04, 38)
      else swapLabel(x, 790, 860, lt, 1.0, 'MAJOR: ART', 'MAJOR: SCIENCE', { size: 38 })
    } },
  { sign: S, cap: 'Deleted the draft? | *Write a fresh one.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'PAPERS', 790, 840, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.05 })
      L(x, 790, 1050, 'DRAFT 1 (NEW)', pop01(t, P.t0 + 1.1, 0.3, 2.2), MINT, 0.04, 36)
    } },
  { sign: S, cap: 'Lost the story mid-sentence? | *Just start again.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'happy', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 780, 'and then the—', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      bubble(x, 790, 1000, 'so anyway…', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: S, cap: 'New city, new you? | *Same great heart.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'SUITCASE', 790, 850, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      L(x, 790, 1060, 'HEART: PACKED', pop01(t, P.t0 + 1.0, 0.3, 2.2), PINK, -0.04, 36)
    } },
  { sign: S, cap: 'Fifty open tabs? | *Close them. Breathe.*', mood: lt => lt > 1.4 ? 'sleepy' : 'wide', star: ST,
    front(x, t, lt, P) {
      bits(x, 'LAPTOP', 790, 840, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = lt < 0.9 ? 50 : Math.max(1, 50 - Math.floor((lt - 0.9) / 0.6 * 49))
      L(x, 790, 1050, `TABS OPEN: ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), SKYB, 0.04, 36)
    } },
  { sign: S, cap: 'The plant didn’t make it? | *Round two.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      bits(x, 'SEED', 790, 880, 24 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 790, 720, 'PLANT #2', pop01(t, P.t0 + 0.9, 0.3, 2.2), MINT, -0.05, 40)
      sparkles(x, t, 790, 860, P.t0 + 1.2, 6, 140, 0.4, [MINT, GOLD, BONE])
    } },
  { sign: S, cap: 'A friendship faded? | *“Hey!”* still works.', mood: lt => lt > 1.6 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'MESSAGES', headCol: GOLD, size: 22,
        lines: [['hey! been', BONE, pop01(t, P.t0 + 0.7, 0.25, 2), true], ['a while :)', BONE, pop01(t, P.t0 + 0.9, 0.25, 2), true], ['HEY!! missed u', MINT, pop01(t, P.t0 + 1.6, 0.25, 2)]] })
    } },
  { sign: S, cap: 'New chapter? | Your *chart* says go.', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 790, 830, 140, pop01(t, P.t0 + 0.25, 0.35, 2), t)
      L(x, 790, 1060, 'CHAPTER 2: GO', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, 0.04, 36)
    } },
]

const F = makeFilm({
  id: 'r2a0648', key: 'C', accent: ACC, solo: S, ending: 'group',
  title: 'Gemini, it’s okay | to *start over.*',
  cameos: CAMEOS,
  group: { cap: 'Fresh starts | *suit you.*', mood: 'sparkle' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
