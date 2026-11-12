// r2t0601: star_talk, BELIKE (twelve signs), "Flirted with? | Zodiacs *be like.*" (signs3kit social cut, music: lofi · C).
// Aries got a match and booked the venue · Taurus: hold that thought, chewing · Gemini replied in four languages
// · Cancer checked compatibility, named the kids · Leo expected it (admirer tally) · Virgo graded the pickup line: B minus
// · Libra couldn't pick a reply, sent all four · Scorpio's eye contact: forty minutes · Sagittarius flirted back, then
// left the country · Capricorn pencilled it in for Q3 · Aquarius missed it, explaining black holes · Pisces happy-cried.
// Ending: card. Lesson, then "Gemini + Libra? | *Still replying.*" over the Gemini + Libra match card.
import { makeFilm, sparkles, hearts, bubble, notes, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, friend, RED, CREAM, STEEL, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8fb1', ST = { x: -180 }

// a ringed planet (Aquarius' lecture)
const PLANET = ['....PPPP....', '..PPPPPPPP..', 'RRPPPPPPPPRR', 'RRRRRRRRRRRR', '.PPPPPPPPPP.', '..PPPPPPPP..', '....PPPP....']
const PLANET_C = { P: '#b98cff', R: GOLD }
// a big eye
const EYE = ['...KKKKKK...', '.KKWWWWWWKK.', 'KWWWBBBBWWWK', 'KWWBBKKBBWWK', 'KWWWBBBBWWWK', '.KKWWWWWWKK.', '...KKKKKK...']
const EYE_C = { K: INK, W: '#ffffff', B: '#ff6b8a' }

const CAMEOS = [
  { sign: 'aries', cap: 'Got one wink. | Booked the *venue.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bubble(x, 800, 650, '✦ NEW MATCH', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
      sheet(x, 800, 900, pop01(t, P.t0 + 0.7, 0.35, 2), { w: 330, h: 240, head: 'SAVE THE DATE', headBg: RED, lines: ['tomorrow', '10 am sharp'], size: 36, progress: clamp((lt - 0.9) / 0.4) })
      L(x, 800, 1100, 'VENUE: BOOKED', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 36)
    } },
  { sign: 'taurus', cap: 'Flirted mid-meal? | Hold that *thought.*', mood: lt => lt > 1.2 ? 'squint' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'PLATE', 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 660, 'hey cutie', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 38, col: LAV, tail: 'br' })
      L(x, 800, 1090, 'CHEWING. ONE SEC.', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, 0.04, 34)
    } },
  { sign: 'gemini', cap: 'Flirted back | in *four languages.*', mood: 'wink', look: [1, 0], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const W = ['hey ;)', 'hola ;)', 'salut ;)', 'ciao ;)']
      W.forEach((w, i) => bubble(x, 700 + (i % 2) * 190, 640 + i * 130, w, pop01(t, P.t0 + 0.3 + i * 0.35, 0.25, 2.2), { size: 40, col: [BONE, MINT, SKYB, GOLD][i], tail: i % 2 ? 'br' : 'bl' }))
    } },
  { sign: 'cancer', cap: 'Checked compatibility. | Already *named the kids.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 800, 620, '✦ 98% COMPATIBLE', pop01(t, P.t0 + 0.2, 0.3, 2), LAV, -0.04, 32)
      sheet(x, 800, 880, pop01(t, P.t0 + 0.6, 0.35, 2), { w: 330, h: 320, head: 'BABY NAMES', headBg: PINK, headInk: INK, lines: ['Luna', 'Leo (jr)', 'Pickle'], size: 38, progress: clamp((lt - 0.8) / 0.8) })
      hearts(x, t, 560, 820, P.t0 + 1.5, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 4 })
    } },
  { sign: 'leo', cap: 'Someone flirted? | Leo *expected* it.', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const n = 37 + Math.floor(clamp((lt - 0.4) / 1.4) * 12)
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 330, h: 260, head: 'ADMIRERS TODAY', headBg: GOLD, headInk: INK, lines: [String(n)], size: 110 })
      L(x, 800, 1060, 'AS USUAL.', pop01(t, P.t0 + 1.6, 0.3, 2.4), '#ffb34a', 0.04, 38)
      sparkles(x, t, 800, 830, P.t0 + 1.0, 7, 200, 0.4)
    } },
  { sign: 'virgo', cap: 'Graded your pickup line. | *B minus.*', mood: 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 360, h: 300, head: 'YOUR LINE', headBg: STEEL, headInk: INK, lines: ['“are u a map?', 'cuz i’m lost', 'in ur eyes”'], size: 30, progress: clamp((lt - 0.4) / 0.6) })
      if (lt > 1.2) { const k = pop01(t, P.t0 + 1.2, 0.3, 2.4); x.save(); x.translate(910, 960); x.rotate(-0.2); x.scale(k, k); x.fillStyle = RED; x.font = `800 96px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('B-', 0, 0); x.restore() }
      L(x, 800, 1090, 'SEE ME AFTER', pop01(t, P.t0 + 1.7, 0.3, 2.4), RED, 0.04, 32)
    } },
  { sign: 'libra', cap: 'Couldn’t pick a reply. | Sent *all four.*', mood: lt => lt > 1.4 ? 'wide' : 'happy', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      const R = ['haha', 'omg stop', 'u too!', 'who, me?']
      phone(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'TO: YOUR MATCH', headCol: PINK, size: 26, lines: R.map((r, i) => [r, [MINT, PINK, GOLD, SKYB, LAV][i], pop01(t, P.t0 + 0.6 + i * 0.22, 0.2, 2), true]) })
      L(x, 800, 1110, 'SENT ×4', pop01(t, P.t0 + 1.8, 0.3, 2.4), LAV, -0.04, 34)
    } },
  { sign: 'scorpio', cap: 'Flirted back with | *eye contact.* Only.', mood: 'squint', look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      drawBits(x, EYE, EYE_C, 800, 820, 28 * pop01(t, P.t0 + 0.25, 0.35, 2))
      const m = Math.floor(clamp((lt - 0.5) / 1.5) * 40)
      L(x, 800, 1050, `NO BLINKING: ${m} MIN`, pop01(t, P.t0 + 0.6, 0.3, 2.2), '#ff6b8a', -0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Flirted back. | Then *left the country.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: ST, hops: [0.9, 1.5],
    front(x, t, lt, P) {
      bits(x, 'SUITCASE', 780, 920, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const fly = ease.inOutCubic(prog(lt, 0.8, 2.0))
      bits(x, 'PLANE', lerp(640, 960, fly), lerp(760, 620, fly), 16 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: 0.4 })
      L(x, 790, 1120, 'BRB · SIX MONTHS', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Will flirt back. | Pencilled in for *Q3.*', mood: 'neutral', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 340, h: 320, head: 'AGENDA', headBg: '#9aa5c4', headInk: INK, align: 'left', lines: ['Q1: budget', 'Q2: promotion', ['Q3: flirt back', RED]], size: 32, progress: clamp((lt - 0.4) / 1.0) })
      L(x, 800, 1100, 'TENTATIVE', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: 'aquarius', cap: 'Missed the flirt. | Was explaining *black holes.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      drawBits(x, PLANET, PLANET_C, 810, 830, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: Math.sin(t * 1.2) * 0.08 })
      bubble(x, 800, 640, 'so basically…', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
      L(x, 800, 1070, 'MINUTE 52 OF 90', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, 0.04, 32)
    } },
  { sign: 'pisces', cap: 'Got one compliment. | *Happy-cried* all night.', mood: 'wide', tears: lt => lt > 0.7 ? 3 : 2, look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 800, 650, 'nice shoes', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: BONE, tail: 'bl' })
      bits(x, 'TISSUE', 820, 900, 18 * pop01(t, P.t0 + 0.7, 0.3, 2))
      L(x, 800, 1100, 'TISSUES LEFT: 0', pop01(t, P.t0 + 1.4, 0.3, 2.4), SKYB, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0601', key: 'C', accent: ACC, ending: 'card',
  title: 'Flirted with? | Zodiacs *be like.*',
  cameos: CAMEOS,
  card: { a: 'gemini', b: 'libra', chip: 'IT’S A MATCH' },
  group: { cap: 'One wink. | Twelve *meltdowns.*' },
  lesson: { text: 'Everyone flirts | in their *own language.*', chip: 'STATUS: FLATTERED' },
  last: { text: 'Gemini + Libra? | *Still replying.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
