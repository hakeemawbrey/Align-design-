// r2t0696: star_talk, BELIKE, "“5 minutes away.” | Zodiacs be like." (signs3kit social cut, music: lofi · C)
// Twelve signs in zodiac order, each the most extreme version of itself around "five minutes away". Ending: lesson.
//   ♈ honking before you said it · ♉ "five minutes", still in bed · ♊ "omw" to three plans at once · ♋ you're five
//   minutes late, four missed calls · ♌ planning the entrance (take 7) · ♍ arrived in exactly five · ♎ first date in
//   five, still picking a shirt · ♏ five minutes late, noted forever · ♐ distracted by a dog · ♑ billed you for the
//   wait · ♒ time is a construct · ♓ your match came on time, happy tears
//   group "Five minutes. | *Forty, really.*"  LESSON "Running late happens. | Just *send the text.*"  last "See you | *in five.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, bits, zzz, confetti, RED, CREAM, STEEL, clamp, ease, prog } from './props.js'

const ST = { x: -200 }
const SHIRT = ['SS...SS', 'SSSSSSS', 'SSSSSSS', '.SSSSS.', '.SSSSS.', '.SSSSS.']
const DOG = ['.BB.....BB.', '.BBB...BBB.', '..BWWWWWB..', '..WKWWWKW..', '..WWWNWWW..', '...WWWWW...', '.WWWWWWWWW.', 'WWWWWWWWWWW', 'WWWWWWWWWWW', '.WW.WW.WW..']

const CAMEOS = [
  { sign: 'aries', cap: 'You said five minutes. | Aries is *honking.*', mood: lt => lt > 1.0 ? 'wide' : 'sparkle', star: ST, hops: [0.4, 0.8, 1.2, 1.6],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bubble(x, 760 + (i - 1) * 40, 660 + i * 150, 'HONK!', pop01(t, P.t0 + 0.3 + i * 0.4, 0.25, 2.2), { size: 46 - i * 2, tail: 'bl', col: i === 1 ? PINK : BONE })
      L(x, 770, 1140, 'ARRIVED: EARLY', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  { sign: 'taurus', cap: 'Says “five minutes.” | Still *in bed.*', mood: 'sleepy', star: { x: -180, y: 40 },
    back(x, t, lt, P) { bits(x, 'BLANKET', 400, 1010, 24 * pop01(t, P.t0 + 0.2, 0.3, 2)) },
    front(x, t, lt, P) {
      bubble(x, 780, 660, 'omw!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 50, tail: 'bl' })
      zzz(x, t, 470, 700, { alpha: clamp(lt - 0.4), size: 44 })
      L(x, 790, 1100, 'STATUS: HORIZONTAL', pop01(t, P.t0 + 1.4, 0.3, 2.2), LAV, 0.04, 30)
    } },
  { sign: 'gemini', cap: '“Five minutes away” | from *three plans.*', mood: lt => Math.floor(lt * 4) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 790, 870, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'SENT', headCol: '#ffd23a', size: 26, lines: [
        ['brunch: omw', BONE, pop01(t, P.t0 + 0.5, 0.25, 2), true], ['movie: omw', MINT, pop01(t, P.t0 + 0.9, 0.25, 2), true], ['party: omw', PINK, pop01(t, P.t0 + 1.3, 0.25, 2), true]] })
    } },
  { sign: 'cancer', cap: 'Five minutes late? | *Four missed calls.*', mood: lt => lt > 1.0 ? 'wide' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.1) * 3)
      phone(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: `MISSED: ${n}`, headCol: PINK, size: 26, lines: [['are you ok??', BONE, pop01(t, P.t0 + 0.8, 0.25, 2), false], ['eaten yet?', LAV, pop01(t, P.t0 + 1.3, 0.25, 2), false], ['call me ♡', MINT, pop01(t, P.t0 + 1.8, 0.25, 2), false]] })
    } },
  { sign: 'leo', cap: 'Five minutes away. | Rehearsing *the entrance.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', star: ST, hops: [1.3],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.4, 1.6)
      x.save(); x.globalAlpha = 0.28 * k; x.fillStyle = '#fff1b0'; x.beginPath(); x.moveTo(300, 470); x.lineTo(400, 470); x.lineTo(560, 1180); x.lineTo(160, 1180); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      const take = 1 + Math.floor(clamp((lt - 0.3) / 1.4) * 6)
      L(x, 780, 720, `ENTRANCE: TAKE ${take}`, pop01(t, P.t0 + 0.3, 0.3, 2), GOLD, 0.05, 34)
      bubble(x, 790, 1010, 'ta-da!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 52, tail: 'bl' })
      sparkles(x, t, 340, 820, P.t0 + 1.3, 7, 180, 0.4)
    } },
  { sign: 'virgo', cap: 'Said five minutes. | Arrived in *exactly five.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 790, 830, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const s = Math.min(300, Math.floor(clamp((lt - 0.2) / 1.2) * 300))
      L(x, 790, 1090, `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}.00`, pop01(t, P.t0 + 0.3, 0.3, 2), MINT, -0.03, 46)
      if (lt > 1.5) L(x, 790, 640, 'ON THE DOT', pop01(t, P.t0 + 1.5, 0.3, 2.4), BONE, 0.04, 32)
    } },
  { sign: 'libra', cap: 'First date in five. | Still *picking a shirt.*', mood: 'neutral', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), sw = Math.floor(lt * 3) % 2
      drawBits(x, SHIRT, { S: sw ? PINK : SKYB }, 720, 860, 26 * k, { rot: -0.08 })
      drawBits(x, SHIRT, { S: sw ? SKYB : PINK }, 870, 900, 20 * k, { rot: 0.1, alpha: 0.7 })
      const n = 1 + Math.floor(clamp(lt / 2.2) * 13)
      L(x, 790, 1120, `OUTFIT ${n}`, pop01(t, P.t0 + 0.5, 0.3, 2), LAV, 0.04, 36)
      bubble(x, 790, 640, 'this one? | or this?', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'You were five minutes late. | *In 2019.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 280, head: 'NOTED', headBg: '#5a2a6a', lines: ['MARCH 3:', '5 min late.', ['never forget.', RED]], size: 32, progress: clamp((lt - 0.3) / 1.0) })
      L(x, 790, 1110, 'FILE: PERMANENT', pop01(t, P.t0 + 1.5, 0.3, 2.2), PINK, 0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Five minutes away. | Then *saw a dog.*', mood: lt => lt > 0.9 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.0, 1.4],
    front(x, t, lt, P) {
      drawBits(x, DOG, { B: '#8a4a2e', W: '#e8c49a', K: INK, N: '#2a1a12' }, 790, 930, 20 * pop01(t, P.t0 + 0.6, 0.3, 2))
      bubble(x, 780, 660, 'PUPPY!!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 50, tail: 'bl' })
      L(x, 790, 1150, 'ETA: UNKNOWN', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, -0.04, 32)
      hearts(x, t, 790, 860, P.t0 + 1.2, { n: 4, life: 1.6, spread: 150, cell: 6, seed: 4 })
    } },
  { sign: 'capricorn', cap: 'You were late. | Capricorn *sent an invoice.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 300, head: 'INVOICE', headBg: '#3a6a5a', lines: ['waiting: 5 min', 'my time: precious', ['due: friday', RED]], size: 26, progress: clamp((lt - 0.3) / 1.0) })
      L(x, 790, 1120, 'PAYABLE NOW', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Five minutes? | Time is *a construct.*', mood: 'sparkle', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 790, 830, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: t * 1.5, sy: 1 + 0.25 * Math.sin(t * 3) })
      L(x, 790, 1100, 'TIME: OPTIONAL', pop01(t, P.t0 + 1.2, 0.3, 2.2), SKYB, -0.04, 34)
    } },
  { sign: 'pisces', cap: 'Your match came on time. | Pisces *cried.*', mood: lt => lt > 0.9 ? 'heart' : 'wide', look: [1, 0], tears: lt => lt > 0.9 ? 3 : 1, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 790, 700, 'ON TIME?!', pop01(t, P.t0 + 0.4, 0.3, 2.2), PINK, 0.05, 44)
      bubble(x, 790, 960, 'you came!!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 44, tail: 'bl' })
      hearts(x, t, 340, 760, P.t0 + 1.1, { n: 6, life: 1.8, spread: 180, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2t0696', key: 'C', accent: GOLD, ending: 'lesson',
  title: '“5 minutes away.” | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Five minutes. | *Forty, really.*' },
  lesson: { text: 'Running late happens. | Just *send the text.*', chip: 'ETA: SHARED' },
  last: {
    text: 'See you | *in five.*',
    draw(x, t, lt) { bits(x, 'CLOCK', 540, 1500, 24 * pop01(t, t - lt + 0.7, 0.35, 2), { rot: Math.sin(t * 2) * 0.1 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
