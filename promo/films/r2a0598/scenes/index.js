// r2a0598: star_advice, ADVICE SOLO (cancer), "How to check in | *on a Cancer.*" (signs3kit social cut, music: lofi · C).
// Nine cards, a relatable Cancer truth + a gentle way to check in: text first (they always do) · bring soup · they host
// everyone, host them · moody days are the moon · ask about their family · send old photos · sit together in quiet
// · know their moon sign · say "I'm proud of you".
// Ending: lesson ("They hold everyone. | *Hold them* back.") then "Soup’s on the way. | *Text them.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, steam, zzz, swapLabel, friend, bits, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff', ST = { x: -180 }, SG = 'cancer'

const CAMEOS = [
  { sign: SG, cap: 'Text first. | They *always* do.', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'NEW MESSAGE', headCol: PINK, size: 22, lines: [['miss you ♡', PINK, pop01(t, P.t0 + 0.6, 0.2, 2.2)], ['omg ♡♡♡', SKYB, pop01(t, P.t0 + 1.2, 0.2, 2.2), true]] })
      hearts(x, t, 470, 760, P.t0 + 1.2, { n: 5, life: 1.5, spread: 140, cell: 7, seed: 2 })
    } },
  { sign: SG, cap: 'Bring soup. | It’s their *language.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'BOWL', 820, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 0.5) steam(x, t, 820, 840)
      L(x, 800, 1090, 'LOVE LANGUAGE: SOUP', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: SG, cap: 'They host everyone. | *Host them* for once.', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P, F) {
      bits(x, 'COUCH', F.x, F.cy + 110, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      friend(x, t, 'leo', 860, 900, 180, pop01(t, P.t0 + 0.5, 0.3, 2), { mood: 'happy', look: [-1, 0], seed: 44 })
      bubble(x, 840, 680, 'sit. I’ll cook.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, tail: 'br' })
      L(x, 820, 1110, 'GUEST OF HONOUR', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: SG, cap: 'Moody days happen. | Blame *the moon.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, -1], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'MOON', 820, 800, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      sparkles(x, t, 820, 800, P.t0 + 0.6, 6, 140, 0.4)
      L(x, 800, 1060, 'FORECAST: FEELINGS', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, -0.04, 32)
    } },
  { sign: SG, cap: 'Ask about their family. | *Get comfy.*', mood: lt => lt > 1.0 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      bits(x, 'HOUSE', 820, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const m = Math.floor(clamp((lt - 0.4) / 1.4) * 120)
      L(x, 800, 1090, `STORY TIME: ${m} MIN`, pop01(t, P.t0 + 0.5, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  { sign: SG, cap: 'Send an old photo. | *Instant* happy tears.', mood: 'heart', look: [1, 0], tears: lt => lt > 1.1 ? 1 : 0, star: ST, hops: [1.2],
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 300, head: 'REMEMBER THIS?', headBg: PINK, headInk: INK, lines: [] })
      if (pop01(t, P.t0 + 0.2, 0.35, 2) > 0.9) { friend(x, t, 'cancer', 740, 880, 110, 1, { mood: 'happy', seed: 45 }); friend(x, t, 'pisces', 860, 880, 110, 1, { mood: 'happy', seed: 46, tears: 1 }) }
      L(x, 800, 1090, 'SUMMER, YEARS AGO ♡', pop01(t, P.t0 + 1.2, 0.3, 2.4), SKYB, -0.04, 30)
    } },
  { sign: SG, cap: 'Just sit together. | *Quiet* counts.', mood: 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      friend(x, t, 'capricorn', 840, 920, 190, pop01(t, P.t0 + 0.3, 0.3, 2), { mood: 'sleepy', look: [-1, 0], seed: 47 })
      bits(x, 'BLANKET', 660, 1010, 20 * pop01(t, P.t0 + 0.6, 0.3, 2))
      L(x, 800, 720, 'NO TALKING NEEDED', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, 0.04, 32)
    } },
  { sign: SG, cap: 'Know their moon sign. | It *matters.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 330, h: 290, head: 'BIRTH CHART ♋︎', headBg: ACC, headInk: INK, size: 32, lines: ['sun: cancer', 'moon: ?', ''], progress: 1 })
      swapLabel(x, 800, 1060, lt, 1.0, 'MOON: ??', 'MOON: ALSO CANCER', { size: 34, fromBg: STEEL, toBg: GOLD })
    } },
  { sign: SG, cap: 'Say “I’m proud of you.” | Watch them *glow.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.1, 1.6],
    front(x, t, lt, P, F) {
      friend(x, t, 'libra', 860, 920, 190, pop01(t, P.t0 + 0.2, 0.3, 2), { mood: 'heart', look: [-1, 0], seed: 48 })
      bubble(x, 820, 680, 'so proud of you.', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, col: PINK, tail: 'br' })
      sparkles(x, t, F.x, F.cy, P.t0 + 1.0, 8, 170, 0.5)
      L(x, 800, 1110, 'GLOW: MAXIMUM', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2a0598', key: 'C', accent: ACC, solo: SG, ending: 'lesson',
  title: 'How to check in | *on a Cancer.*',
  cameos: CAMEOS,
  group: { cap: 'Soft shell. | *Biggest* heart.', mood: 'heart' },
  lesson: { text: 'They hold everyone. | *Hold them* back.', chip: 'STATUS: CHECKED ON' },
  last: { text: 'Soup’s on the way. | *Text them.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
