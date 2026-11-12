// r2t0719: THE SIGNS AS… v3, BE LIKE, "Zodiacs getting | feedback be like." (the batch hook "Zodiacs getting feedback at
// work | be like." re-cut so it fits two lines) (signs3kit social cut, lofi · D). Ending: lesson.
//   ♈ requested a rematch · ♉ change: declined · ♊ agreed, disagreed, agreed · ♋ only heard the "but" · ♌ asked for
//   feedback, wanted compliments · ♍ got one note, sent back forty · ♎ a five-layer compliment sandwich · ♏ nodded
//   calmly, filed it forever · ♐ "be more serious": laughed · ♑ turned it into a five-year plan · ♒ "too unusual":
//   thank you! · ♓ got praised, cried anyway
//   group "Same notes. | Twelve reactions."   LESSON "Feedback is a gift. | Even the scratchy kind."   last "Next review? | Virgo’s ready."
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, notes, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, bits, swapLabel, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffb34a', ST = { x: -170 }

const CAMEOS = [
  { sign: 'aries', cap: 'Got one note. | *Requested a rematch.*', mood: lt => lt > 1.0 ? 'squint' : 'wide', star: ST, hops: [1.0, 1.4],
    front(x, t, lt, P) {
      sheet(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 180, head: 'NOTE', headBg: STEEL, headInk: INK, lines: ['slow down?'], size: 36 })
      L(x, 790, 1040, 'REMATCH: 3PM', pop01(t, P.t0 + 1.1, 0.3, 2.4), '#ff6b5a', 0.05, 42)
    } },
  { sign: 'taurus', cap: '“Try a new approach?” | *No, thank you.*', mood: 'neutral', star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'no.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 64, tail: 'bl' })
      L(x, 790, 990, 'CHANGE: DECLINED', pop01(t, P.t0 + 1.4, 0.3, 2.2), RED, -0.04, 34)
    } },
  { sign: 'gemini', cap: 'Agreed. Disagreed. | *Agreed again.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'squint' : 'happy', star: ST,
    front(x, t, lt, P) {
      const ph = Math.floor(clamp(lt / 1.8) * 3) % 3
      L(x, 790, 860, ['AGREE', 'DISAGREE', 'AGREE?'][Math.min(2, Math.floor(clamp(lt / 1.8) * 2.99))], pop01(t, P.t0 + 0.2, 0.3, 2), [MINT, PINK, GOLD][ph], ph % 2 ? 0.06 : -0.06, 50)
      bubble(x, 790, 1060, 'both, honestly', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Heard “great, but…” | Only heard *“but.”*', mood: lt => lt > 1.2 ? 'wide' : 'happy', star: ST,
    front(x, t, lt, P) {
      const fade = clamp((lt - 0.9) / 0.5)
      x.save(); x.globalAlpha = 1 - fade * 0.55
      L(x, 760, 740, 'GREAT WORK,', pop01(t, P.t0 + 0.3, 0.3, 2), MINT, -0.04, 38)
      x.restore()
      L(x, 800, 900, 'BUT…', pop01(t, P.t0 + 0.6, 0.3, 2), PINK, 0.04, 38 + fade * 40)
    } },
  { sign: 'leo', cap: 'Asked for feedback. | *Meant compliments.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'go on…', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 46, tail: 'bl' })
      L(x, 790, 960, 'COMPLIMENTS ONLY', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, 0.04, 32)
      sparkles(x, t, 790, 820, P.t0 + 1.3, 7, 180, 0.4)
    } },
  { sign: 'virgo', cap: 'Got one note. | *Sent back forty.*', mood: 'squint', star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.4) * 39)
      sheet(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 340, head: 'MY NOTES', headBg: MINT, headInk: INK, lines: ['1. font', '2. comma', '3. vibes', '4. …'], size: 32, align: 'left' })
      L(x, 790, 1090, `NOTES: ${n}`, pop01(t, P.t0 + 0.6, 0.3, 2), GOLD, 0.04, 40)
    } },
  { sign: 'libra', cap: 'Gave a note. | *In a compliment sandwich.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'SANDWICH', 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1060, 'NOTE: HIDDEN INSIDE', pop01(t, P.t0 + 1.2, 0.3, 2.2), PINK, -0.04, 32)
    } },
  { sign: 'scorpio', cap: 'Nodded calmly. | *Remembered it forever.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 240, head: 'FILED', headBg: '#c97bff', headInk: INK, lines: ['tues, 2:14pm', '“be warmer”'], size: 32 })
      L(x, 790, 1060, 'KEPT: ALWAYS', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, 0.04, 36)
    } },
  { sign: 'sagittarius', cap: '“Be more serious.” | *Laughed. Loudly.*', mood: lt => lt > 0.9 ? 'happy' : 'wide', star: ST, hops: [0.9, 1.2, 1.5],
    front(x, t, lt, P) {
      L(x, 790, 700, 'BE SERIOUS', pop01(t, P.t0 + 0.2, 0.3, 2), STEEL, -0.04, 36)
      bubble(x, 790, 920, 'HA! HA!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 60, tail: 'bl', col: GOLD })
    } },
  { sign: 'capricorn', cap: 'Got a note. | *Made a five-year plan.*', mood: 'neutral', star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 340, head: 'PLAN', headBg: '#9aa5c4', headInk: INK, lines: ['yr 1: note', 'yr 2: fix', 'yr 3-5:', 'excel.'], size: 32, align: 'left', progress: clamp((lt - 0.4) / 1.2) })
    } },
  { sign: 'aquarius', cap: '“A bit unusual.” | *Thank you!*', mood: 'sparkle', star: ST, hops: [1.1],
    front(x, t, lt, P) {
      L(x, 790, 700, 'TOO UNUSUAL', pop01(t, P.t0 + 0.2, 0.3, 2), STEEL, 0.04, 36)
      bubble(x, 790, 920, 'best review | ever!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, tail: 'bl', col: SKYB })
      sparkles(x, t, 790, 920, P.t0 + 1.1, 8, 200, 0.3)
    } },
  { sign: 'pisces', cap: 'Got praised. | *Cried anyway.*', mood: 'heart', tears: 3, star: ST,
    front(x, t, lt, P) {
      L(x, 790, 760, '“GREAT WORK!”', pop01(t, P.t0 + 0.3, 0.3, 2), MINT, -0.04, 40)
      bits(x, 'TISSUE', 790, 960, 15 * pop01(t, P.t0 + 1.2, 0.3, 2.2))
      hearts(x, t, 690, 1100, P.t0 + 0.8, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'r2t0719', key: 'D', accent: ACC, ending: 'lesson',
  title: 'Zodiacs getting | feedback *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Same notes. | *Twelve reactions.*' },
  lesson: { text: 'Feedback is a gift. | Even *the scratchy kind.*', chip: 'GROWTH: UNLOCKED' },
  last: {
    text: 'Next review? | *Virgo’s ready.*',
    draw(x, t, lt) { sheet(x, 540, 1600, 1.4 * pop01(t, t - lt + 0.7, 0.35, 2), { w: 300, h: 150, head: 'NOTES: 41', headBg: MINT, headInk: INK, lines: ['(so far)'], size: 30 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
