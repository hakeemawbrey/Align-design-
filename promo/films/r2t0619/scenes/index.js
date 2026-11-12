// r2t0619: star_talk, BE LIKE (twelve signs), "“The usual?” | Zodiacs *be like.*" (topic: when someone remembers their order; lofi · D).
// Aries: left a huge tip, sprinted out cheering · Taurus: became a regular, for life · Gemini: ordered something new to
// test them · Cancer: sent a thank-you card, and soup · Leo: assumed it's because they're famous · Virgo: checked every
// detail, impressed · Libra: finally someone decided for them · Scorpio: respected it, then changed their order
// · Sagittarius: moved away, still flies back for it · Capricorn: wrote the barista a reference letter · Aquarius:
// invented a drink, now it's on the menu · Pisces: "the usual?", sobbed into the latte.
// Ending: callback. "Day 400: | *their own mug.*" (the regular pays off).
import { makeFilm, sparkles, hearts, bubble, notes, signChar, pop01, drawBits, label, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, bits, friend, swapLabel, steam, confetti, RED, CREAM, STEEL, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffc07a', ST = { x: -180 }

const CAMEOS = [
  { sign: 'aries', cap: 'Left a huge tip. | *Sprinted out cheering.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [0.6, 1.0, 1.4, 1.8],
    front(x, t, lt, P) {
      bits(x, 'MUG', 800, 880, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 680, 'TIP: $40', pop01(t, P.t0 + 0.5, 0.3, 2), MINT, 0.05, 44)
      bubble(x, 800, 1070, 'YOU REMEMBERED!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, col: GOLD, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Became a regular. | *For life.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MUG', 800, 860, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 790, 780, { n: 2, alpha: 0.6, h: 90 })
      L(x, 800, 1060, `VISIT #${Math.min(999, 10 + Math.floor(lt * 400))}`, pop01(t, P.t0 + 0.5, 0.3, 2), GOLD, -0.04, 38)
    } },
  { sign: 'gemini', cap: 'Ordered something new. | *To test them.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'actually… | surprise me', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 800, 920, 'PLOT TWIST', pop01(t, P.t0 + 1.2 * 1.29, 0.3, 2.2), PINK, -0.05, 42)
    } },
  { sign: 'cancer', cap: 'Sent a thank-you card. | *And soup.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 780, 780, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 200, head: 'THANK YOU', headBg: PINK, headInk: INK, lines: ['you’re family now'], size: 30 })
      bits(x, 'BOWL', 840, 1040, 16 * pop01(t, P.t0 + 1.3 * 1.29, 0.3, 2.2))
      hearts(x, t, 800, 760, P.t0 + 1.0, { n: 4, life: 1.6, spread: 200, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Assumed it’s because | they’re *famous.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', star: ST, hops: [1.0],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'it’s ok, | i get it a lot', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, col: GOLD, tail: 'bl' })
      L(x, 800, 920, 'FAME: CONFIRMED', pop01(t, P.t0 + 1.2 * 1.29, 0.3, 2.2), PINK, -0.05, 36)
      sparkles(x, t, 800, 920, P.t0 + 1.7, 7, 180, 0.2)
    } },
  { sign: 'virgo', cap: 'Checked every detail. | *Correct. Impressed.*', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 360, head: 'THE ORDER', headBg: SKYB, headInk: INK, lines: ['☑ oat milk', '☑ two pumps', '☑ extra hot', '☑ no lid'], size: 34, align: 'left', progress: prog(lt, 0.3, 1.4) })
      L(x, 800, 1100, 'GRADE: A+', pop01(t, P.t0 + 1.7 * 1.29, 0.3, 2.2), MINT, -0.04, 36)
    } },
  { sign: 'libra', cap: 'Finally, someone | *decided for them.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'the usual?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 48, tail: 'bl' })
      L(x, 800, 900, 'DECISION: MADE', pop01(t, P.t0 + 1.0 * 1.29, 0.3, 2.2), LAV, -0.04, 38)
      hearts(x, t, 800, 1180, P.t0 + 1.4, { n: 4, life: 1.2, spread: 260, cell: 7, seed: 5 })
    } },
  { sign: 'scorpio', cap: 'Respected it. | Then *changed their order.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'hm. impressive.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: STEEL, tail: 'bl' })
      swapLabel(x, 800, 920, lt, 1.3, 'THE USUAL', 'SOMETHING NEW', { size: 38, fromBg: GOLD, toBg: RED })
    } },
  { sign: 'sagittarius', cap: 'Moved away. | *Still flies back for it.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.9, 1.7],
    back(x, t, lt, P) {
      const p = prog(lt, 0.2, 1.6)
      if (p > 0 && p < 1) bits(x, 'PLANE', lerp(1000, 640, p), 660 + 40 * p, 14, { rot: -1.4 })
    },
    front(x, t, lt, P) {
      bits(x, 'MUG', 800, 880, 16 * pop01(t, P.t0 + 1.2 * 1.29, 0.3, 2))
      L(x, 800, 1070, 'FLIGHT: FOR COFFEE', pop01(t, P.t0 + 1.5 * 1.29, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Wrote the barista | *a reference letter.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 380, head: 'REFERENCE', headBg: '#2fc79a', headInk: INK, lines: ['To whom it', 'may concern:', 'they REMEMBER.', '10/10, hire.'], size: 32, align: 'left', progress: prog(lt, 0.3, 1.4) })
    } },
  { sign: 'aquarius', cap: 'Invented a drink. | *It’s on the menu now.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, -1], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 300, head: 'MENU', headBg: LAV, headInk: INK, lines: ['latte', 'tea', ['NEW: “THE', '#7a3fd0'], ['AQUARIUS”', '#7a3fd0']], size: 34, progress: prog(lt, 0.3, 1.3) })
      sparkles(x, t, 800, 900, P.t0 + 1.6, 8, 170, 0.6, [LAV, MINT, BONE])
    } },
  { sign: 'pisces', cap: '“The usual?” | *Sobbed into the latte.*', mood: lt => lt < 1.0 ? 'sparkle' : 'wide', tears: lt => lt < 1.0 ? 2 : 3, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MUG', 800, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 690, 'they KNOW me', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, col: '#b7a6ff', tail: 'bl' })
      hearts(x, t, 800, 980, P.t0 + 1.2, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0619', key: 'D', accent: ACC, ending: 'callback',
  title: '“The usual?” | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Being remembered | *hits different.*', moods: ['sparkle', 'heart', 'wink', 'heart', 'sparkle', 'sparkle', 'heart', 'wink', 'sparkle', 'happy', 'sparkle', 'wide'] },
  last: {
    text: 'Day 400: | *their own mug.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.4, 0.4, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 360, 1110, 300 * k, { mood: lt > 1.4 ? 'heart' : 'happy', look: [1, 0], seed: 88, glyph: false, hops: [t0 + 1.5] })
      bits(x, 'MUG', 750, 1100, 30 * pop01(t, t0 + 0.7, 0.3, 2))
      label(x, 720, 1100, 'TAURUS', pop01(t, t0 + 1.1, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04 })
      steam(x, t, 720, 950, { n: 2, alpha: 0.6, h: 90 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
