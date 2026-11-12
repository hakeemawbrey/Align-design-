// r2t0548: star_talk, ROLLCALL, "The signs | *in finals week.*" (signs3kit social cut, music: lofi · G).
// Twelve signs in zodiac order, each the most extreme version of itself during finals. Ending: group.
//   ♈ finished the exam in four minutes · ♉ ten-minute break, three hours long · ♊ studied for the wrong class
//   · ♋ made flashcards for the whole class · ♌ dressed to pass · ♍ seven highlighters · ♎ studied with their match,
//   learned nothing · ♏ locked in, hasn't blinked · ♐ exam tomorrow, booked a road trip · ♑ studying since September
//   · ♒ wrote the essay on their birth chart · ♓ question one was "your name", sobbed
//   group "Everyone passed. | *Somehow.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, zzz, chart, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffb34a', ST = { x: -160 }
const HI = ['#ffe27a', '#ff8fb1', '#7dffb0', '#8fe3ff', '#c9a6ff', '#ffb34a', '#ff6b5a']
const CARD = (x, cx, cy, k, txt, rot, bg = CREAM) => sheet(x, cx, cy, k, { w: 220, h: 140, rot, bg, lines: [txt], size: 28 })

const CAMEOS = [
  { sign: 'aries', cap: 'Finished the exam | *in four minutes.*', mood: lt => lt > 1.0 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.0, 1.4],
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 840, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1070, 'TIME: 0:04', pop01(t, P.t0 + 0.6, 0.3, 2.2), GOLD, -0.04, 38)
      bubble(x, 600, 620, 'DONE!', pop01(t, P.t0 + 1.1, 0.25, 2.4), { size: 52, col: '#ff6b5a', tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Ten-minute break. | *Three hours long.*', mood: 'sleepy', star: ST,
    front(x, t, lt, P) {
      bits(x, 'PILLOW', 380, 1010, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'CLOCK', 820, 820, 18 * pop01(t, P.t0 + 0.3, 0.3, 2))
      zzz(x, t, 470, 740, { alpha: clamp(lt * 2), size: 46 })
      L(x, 820, 1060, 'BREAK: ONGOING', pop01(t, P.t0 + 1.0, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: 'gemini', cap: 'Studied all night. | *Wrong class.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 820, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 220, head: 'STUDIED', headBg: GOLD, headInk: INK, lines: ['history'], size: 40 })
      L(x, 800, 1060, 'EXAM: BIOLOGY', pop01(t, P.t0 + 1.2, 0.3, 2.4), RED, 0.05, 36)
    } },
  { sign: 'cancer', cap: 'Made flashcards | *for the whole class.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) CARD(x, 800 + (i % 2 ? 16 : -16), 1000 - i * 70, pop01(t, P.t0 + 0.2 + i * 0.18, 0.25, 2.2), ['ch. 1', 'ch. 2', 'ch. 3', 'you got this ♥'][i], (i % 2 ? 0.05 : -0.05))
      L(x, 800, 620, 'COPIES: 30', pop01(t, P.t0 + 1.3, 0.3, 2.2), PINK, 0.04, 34)
    } },
  { sign: 'leo', cap: 'Outfit for the exam? | *Runway.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'SHADES', 380, 870, 12 * pop01(t, P.t0 + 0.4, 0.3, 2))
      sparkles(x, t, 380, 880, P.t0 + 0.6, 8, 200, 0.2)
      sparkles(x, t, 380, 880, P.t0 + 1.5, 8, 220, 0.9)
      L(x, 800, 860, 'DRESSED TO PASS', pop01(t, P.t0 + 0.9, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  { sign: 'virgo', cap: 'Colour-coded notes. | *Seven highlighters.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 7; i++) drawBits(x, ['K.........', 'KYYYYYYYYR', 'KYYYYYYYYR'], { K: INK, Y: HI[i], R: HI[i] }, 800, 680 + i * 56, 13 * pop01(t, P.t0 + 0.15 + i * 0.12, 0.25, 2), { rot: -0.08 + (i % 2) * 0.12 })
      L(x, 800, 1130, 'NOTES: A WORK OF ART', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 28)
    } },
  { sign: 'libra', cap: 'Studied with their match. | *Learned nothing.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friend(x, t, 'aquarius', 780, 920, 200, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: 'heart', look: [-1, 0], seed: 33 })
      hearts(x, t, 600, 820, P.t0 + 0.8, { n: 6, life: 1.8, spread: 200, cell: 6, seed: 2 })
      L(x, 800, 660, '✦ STUDY DATE', pop01(t, P.t0 + 0.5, 0.3, 2.2), PINK, -0.04, 30)
      L(x, 800, 1110, 'PAGE: STILL 1', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: 'scorpio', cap: 'Hasn’t blinked | *since Tuesday.*', mood: 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 240, head: 'NOTES', headBg: RED, lines: ['ch. 1–40', 'memorised'], size: 36 })
      L(x, 800, 1080, 'FOCUS: INTENSE', pop01(t, P.t0 + 1.0, 0.3, 2.2), RED, -0.04, 34)
    } },
  { sign: 'sagittarius', cap: 'Exam tomorrow? | *Booked a road trip.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      bits(x, 'SUITCASE', 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 * Math.sin(t * 5) })
      L(x, 800, 1080, 'STUDYING: IN THE CAR', pop01(t, P.t0 + 1.1, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: 'capricorn', cap: 'Studying for finals | *since September.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 300, head: 'STUDY PLAN', headBg: STEEL, headInk: INK, lines: ['sept ✓', 'oct ✓', 'nov ✓', 'dec: relax'], size: 30, progress: clamp(lt / 1.4) })
      L(x, 800, 1100, 'READY SINCE DAY 1', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, -0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Wrote the essay | *on their birth chart.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      chart(x, 800, 820, 130, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 800, 1050, 'TOPIC: “ME”', pop01(t, P.t0 + 0.9, 0.3, 2.2), SKYB, 0.04, 34)
      L(x, 800, 1130, 'GRADE: ???', pop01(t, P.t0 + 1.5, 0.3, 2.2), LAV, -0.04, 30)
    } },
  { sign: 'pisces', cap: 'Q1: “your name.” | Pisces *sobbed.*', mood: lt => lt < 0.9 ? 'neutral' : 'wide', look: [1, 0], tears: lt => lt < 0.9 ? 1 : 3, star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 240, head: 'FINAL EXAM', headBg: RED, lines: ['Q1. your', 'name?'], size: 36 })
      L(x, 800, 1080, 'TOO MUCH PRESSURE', pop01(t, P.t0 + 1.2, 0.3, 2.2), LAV, -0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2t0548', key: 'G', accent: ACC, ending: 'group',
  title: 'The signs | *in finals week.*',
  cameos: CAMEOS,
  group: { cap: 'Everyone passed. | *Somehow.*', moods: ['sparkle', 'sleepy', 'wide', 'heart', 'sparkle', 'happy', 'heart', 'wide', 'sparkle', 'happy', 'wink', 'happy'] },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
