// r2a0595: star_advice, ADVICE ROLLCALL, "Each sign’s | *morning mantra.*" (signs3kit social cut, music: lofi · G).
// Twelve signs in zodiac order, one warm morning mantra each (with one light gag):
//   ♈ "I don't have to win breakfast" · ♉ "snooze is self-care" · ♊ "one tab at a time" · ♋ "my feelings are welcome
//   here" · ♌ "I shine even unseen" · ♍ "done is better than perfect" · ♎ "my choice is enough" · ♏ "I can let people
//   in" · ♐ "today's adventure: my own street" · ♑ "I'm more than my inbox" · ♒ "weird is wonderful" · ♓ "I can feel it
//   all and be okay".
// Ending: lesson ("Start soft. | The day *will follow.*") then "Taurus is still | *on snooze.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, bits, zzz, steam, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffd23a', ST = { x: -170 }

const CAMEOS = [
  { sign: 'aries', cap: '“I don’t have to | win *breakfast.*”', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: ST, hops: [0.4, 0.8],
    front(x, t, lt, P) {
      bits(x, 'MUG', 800, 860, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 790, 790, { n: 3, h: 110 })
      swapLabel(x, 800, 1060, lt, 1.0, 'TOAST: 4 SEC', 'TOAST: SLOW ♡', { size: 32, fromBg: RED, toBg: MINT })
    } },
  { sign: 'taurus', cap: '“Snooze is | *self-care.*”', mood: 'sleepy', star: ST,
    front(x, t, lt, P, F) {
      bits(x, 'PILLOW', F.x, F.cy + 140, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      zzz(x, t, F.x + 40, F.cy - 150)
      bits(x, 'CLOCK', 800, 820, 16 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 800, 1010, 'SNOOZE #3 ♡', pop01(t, P.t0 + 1.3, 0.3, 2.4), LAV, -0.04, 36)
    } },
  { sign: 'gemini', cap: '“One tab | *at a time.*”', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.max(1, Math.round(lerp(37, 1, ease.inOutCubic(clamp((lt - 0.4) / 1.0)))))
      L(x, 800, 820, `TABS: ${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), n > 1 ? RED : MINT, 0.04, 56)
      L(x, 800, 1000, 'BRAIN: QUIET', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: 'cancer', cap: '“My feelings | are *welcome here.*”', mood: 'heart', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'HOUSE', 800, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 660, 'ALL FEELINGS ♡', pop01(t, P.t0 + 0.7, 0.3, 2.2), PINK, 0.04, 34)
      hearts(x, t, 800, 820, P.t0 + 1.2, { n: 5, life: 1.6, spread: 170, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: '“I shine | even *unseen.*”', mood: 'sparkle', star: ST, hops: [1.2],
    front(x, t, lt, P) {
      L(x, 800, 760, 'AUDIENCE: 0', pop01(t, P.t0 + 0.3, 0.3, 2.2), STEEL, 0.04, 38)
      L(x, 800, 900, 'GLOW: 100%', pop01(t, P.t0 + 1.0, 0.3, 2.3), GOLD, -0.04, 44)
      sparkles(x, t, 400, 880, P.t0 + 1.1, 9, 170, 0.6)
    } },
  { sign: 'virgo', cap: '“Done is better | than *perfect.*”', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 280, head: 'TO DO', headBg: STEEL, headInk: INK, lines: [lt > 1.0 ? '[x] bed: made' : '[ ] bed: made', ['(ish)', '#8a8aa0']], size: 32 })
      L(x, 800, 1070, 'GOOD ENOUGH ✦', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: 'libra', cap: '“My choice | is *enough.*”', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: lt => lt < 1.0 ? [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0] : [0, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'MUG', 800, 820, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      swapLabel(x, 800, 1010, lt, 1.0, 'TEA? COFFEE?', 'TEA. DONE. ♡', { size: 34, fromBg: STEEL, toBg: PINK })
    } },
  { sign: 'scorpio', cap: '“I can let | *people in.*”', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'HOUSE', 800, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      swapLabel(x, 800, 1060, lt, 1.0, 'DOOR: LOCKED', 'DOOR: OPEN ♡', { size: 34, fromBg: RED, toBg: MINT })
    } },
  { sign: 'sagittarius', cap: '“Today’s adventure: | *my own street.*”', mood: 'sparkle', star: { x: 170 }, hops: [0.6, 1.3],
    front(x, t, lt, P) {
      bits(x, 'MAP', 330, 840, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.05 })
      L(x, 330, 1040, 'DISTANCE: 200 M', pop01(t, P.t0 + 1.3, 0.3, 2.4), SKYB, -0.04, 32)
    } },
  { sign: 'capricorn', cap: '“I’m more | than *my inbox.*”', mood: lt => lt < 1.2 ? 'neutral' : 'happy', look: [-1, 0], star: { x: 170 },
    front(x, t, lt, P) {
      bits(x, 'LAPTOP', 330, 840, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      swapLabel(x, 330, 1040, lt, 1.0, 'INBOX: 212', 'INBOX: LATER ♡', { size: 32, fromBg: RED, toBg: MINT })
    } },
  { sign: 'aquarius', cap: '“Weird is | *wonderful.*”', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: ST, hops: [1.3],
    front(x, t, lt, P, F) {
      bits(x, 'GADGET', 800, 840, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1040, 'SOCKS: MISMATCHED ✓', pop01(t, P.t0 + 1.2, 0.3, 2.4), SKYB, -0.04, 30)
      sparkles(x, t, 800, 840, P.t0 + 1.2, 7, 160, 0.5)
    } },
  { sign: 'pisces', cap: '“I can feel it all | and *be okay.*”', mood: lt => lt < 1.2 ? 'wide' : 'heart', tears: lt => lt < 1.2 ? 3 : 1, star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'TISSUE', 800, 840, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1040, 'FEELINGS: FELT ♡', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 32)
      hearts(x, t, 800, 820, P.t0 + 1.4, { n: 4, life: 1.5, spread: 150, cell: 7, seed: 9 })
    } },
]

const F = makeFilm({
  id: 'r2a0595', key: 'G', accent: ACC, ending: 'lesson',
  title: 'Each sign’s | *morning mantra.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve mantras. | *One good morning.*' },
  lesson: { text: 'Start soft. | The day *will follow.*', chip: 'MOOD: ALIGNED' },
  last: { text: 'Taurus is still | *on snooze.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
