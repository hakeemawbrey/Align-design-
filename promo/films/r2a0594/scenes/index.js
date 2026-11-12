// r2a0594: star_advice, ADVICE ROLLCALL, "How each sign | *stands up.*" (topic: how each sign stands up for themselves) (signs3kit social cut, music:
// lofi · E). Twelve signs in zodiac order, one warm, specific way each one stands up for themselves (one light gag each):
//   ♈ says it to your face, kindly this time · ♉ plants their feet, won't be moved · ♊ writes the perfect reply and
//   actually sends it · ♋ guards their peace like family · ♌ asks for the raise · ♍ a calm email, with receipts
//   · ♎ picks a side: their own · ♏ sets a boundary, it's final · ♐ tells the truth, softly (new skill) · ♑ "that's not
//   my job", and means it · ♒ disagrees with the group, out loud · ♓ says how they feel, cries, still says it.
// Ending: lesson ("Kind and firm | can be *friends.*") then "Pisces said no. | *Proud tears.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, bits, friend, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dffb0', ST = { x: -170 }

const CAMEOS = [
  { sign: 'aries', cap: 'Says it to your face. | *Kindly*, this time.', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'that wasn’t fair.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 800, 900, 'VOLUME: INDOOR', pop01(t, P.t0 + 1.0, 0.3, 2.3), MINT, 0.04, 34)
      L(x, 800, 1040, 'GROWTH ✦', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 38)
    } },
  { sign: 'taurus', cap: 'Plants their feet. | *Won’t* be moved.', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      const push = Math.max(0, Math.sin(Math.PI * clamp((lt - 0.5) / 1.0)))
      friend(x, t, 'gemini', 820 - 30 * push, 930, 190, pop01(t, P.t0 + 0.2, 0.3, 2), { mood: 'squint', look: [-1, 0], seed: 24 })
      bubble(x, 820, 690, 'just this once?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
      L(x, 800, 1110, 'NOT MOVING ♡', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 36)
    } },
  { sign: 'gemini', cap: 'Writes the perfect reply. | *Actually sends it.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'MATCH', headCol: GOLD, lines: [
        ['you cancelled 3x', BONE, pop01(t, P.t0 + 0.5, 0.25, 2)],
        ['that hurt. ♡', MINT, pop01(t, P.t0 + 1.0, 0.25, 2), true],
      ], size: 22 })
      L(x, 800, 1110, 'SENT ✓', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 40)
    } },
  { sign: 'cancer', cap: 'Guards their peace | like *family.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'SHIELD', 800, 860, 24 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 800, 660, 'DRAMA: DECLINED', pop01(t, P.t0 + 0.8, 0.3, 2.2), RED, 0.04, 32)
      L(x, 800, 1070, 'PEACE: PROTECTED', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'leo', cap: 'Knows their worth. | Asks *for the raise.*', mood: 'sparkle', star: ST, hops: [1.3],
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 260, head: 'MY CASE', headBg: GOLD, headInk: INK, lines: ['did great', 'did more', 'still great'], size: 32, progress: clamp((lt - 0.3) / 1.0) })
      L(x, 800, 1060, 'RAISE: APPROVED', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: 'virgo', cap: 'A calm email. | With *receipts.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 310, h: 260, head: 'RE: RE: RE:', headBg: STEEL, headInk: INK, lines: ['per my notes,', 'see attached'], size: 30 })
      bits(x, 'PAPERS', 880, 1010, 12 * pop01(t, P.t0 + 1.0, 0.3, 2))
      L(x, 720, 1060, 'ATTACHED: 14', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'libra', cap: 'Picks a side. | *Their own.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: lt => lt < 1.2 ? [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0] : [0, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      L(x, 800, 720, 'SIDE A?', pop01(t, P.t0 + 0.2, 0.3, 2), STEEL, 0.04, 34)
      L(x, 800, 840, 'SIDE B?', pop01(t, P.t0 + 0.4, 0.3, 2), STEEL, -0.04, 34)
      L(x, 800, 990, 'SIDE: ME ♡', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, 0.04, 44)
      sparkles(x, t, 800, 990, P.t0 + 1.35, 7, 160, 0.2)
    } },
  { sign: 'scorpio', cap: 'Sets a boundary. | It’s *final.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'ROPE', 800, 900, 18 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 800, 700, 'THIS FAR. ♡', pop01(t, P.t0 + 0.8, 0.3, 2.2), RED, 0.04, 40)
      L(x, 800, 1070, 'NO EXCEPTIONS', pop01(t, P.t0 + 1.4, 0.3, 2.4), BONE, -0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Tells the truth. | *Softly.* New skill.', mood: lt => lt > 1.3 ? 'happy' : 'squint', star: { x: 170 }, hops: [1.4],
    front(x, t, lt, P) {
      bubble(x, 330, 720, 'honestly? I’m hurt.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'br' })
      swapLabel(x, 330, 900, lt, 1.0, 'BLUNTNESS: MAX', 'GENTLE ✓', { size: 32, fromBg: RED, toBg: MINT })
      hearts(x, t, 470, 1060, P.t0 + 1.5, { n: 4, life: 1.4, spread: 140, cell: 7, seed: 7 })
    } },
  { sign: 'capricorn', cap: '“That’s not my job.” | *And means it.*', mood: lt => lt < 1.2 ? 'neutral' : 'happy', look: [-1, 0], star: { x: 170 },
    front(x, t, lt, P) {
      bits(x, 'PAPERS', 330, 820, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 330, 660, 'EXTRA TASK #9', pop01(t, P.t0 + 0.4, 0.3, 2.2), STEEL, 0.04, 32)
      L(x, 330, 1020, 'RETURNED ♡', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 38)
    } },
  { sign: 'aquarius', cap: 'Disagrees with the group. | *Out loud.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) friend(x, t, ['taurus', 'leo', 'virgo'][i], 680 + i * 120, 1000, 130, pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2), { mood: lt > 1.2 ? 'wide' : 'happy', look: [-1, 0], seed: 30 + i })
      bubble(x, 790, 720, 'actually… no.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
      L(x, 800, 1140, 'STILL FRIENDS ♡', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'pisces', cap: 'Says how they feel. | Cries. *Still says it.*', mood: lt => lt < 1.0 ? 'wide' : 'sparkle', tears: lt => lt < 1.0 ? 3 : 2, star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'I felt… left out.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bl' })
      bits(x, 'TISSUE', 800, 900, 14 * pop01(t, P.t0 + 0.8, 0.3, 2))
      L(x, 800, 1060, 'SAID IT ANYWAY ✦', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0594', key: 'E', accent: ACC, ending: 'lesson',
  title: 'How each sign | *stands up.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *Zero doormats.*' },
  lesson: { text: 'Kind and firm | can be *friends.*', chip: 'BOUNDARY: SET' },
  last: { text: 'Pisces said no. | *Proud tears.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
