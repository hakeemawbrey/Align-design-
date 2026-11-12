// r2t0682: star_talk, ROLLCALL, "The signs learning | *a language.*" (signs3kit social cut, music: lofi · E).
// Ending: callback (Aquarius' invented language finds a second speaker).
//   ♈ learned "hello", booked the flight · ♉ only the food words · ♊ six languages at once · ♋ first phrase: "call your mum"
//   · ♌ "thank you, I know" · ♍ corrected the teacher · ♎ still picking which language · ♏ fluent, told nobody
//   · ♐ skipped the lessons, moved there · ♑ a 365-day streak · ♒ invented its own · ♓ learned "goodbye", sobbed
//   group "Twelve signs. | *Zero fluent.*"   last "Aquarius found | a *second speaker.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO, INTER } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, chart, confetti, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff', ST = { x: -170 }

const CAMEOS = [
  { sign: 'aries', cap: 'Learned “hello.” | *Booked the flight.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: ST, hops: [0.8, 1.4],
    front(x, t, lt, P) {
      bubble(x, 800, 660, '¡HOLA!', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 52, tail: 'bl' })
      const fx = lerp(700, 860, ease.inOutCubic(prog(lt, 0.9, 2.2)))
      bits(x, 'PLANE', fx, 920 - (fx - 700) * 0.5, 22 * pop01(t, P.t0 + 0.9, 0.3, 2), { rot: 0.5 })
      L(x, 800, 1110, 'FLUENT? CLOSE.', pop01(t, P.t0 + 1.6, 0.3, 2.2), RED, 0.04, 34)
    } },
  { sign: 'taurus', cap: 'Only learned | the *food words.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 400, head: 'MY VOCAB', headBg: '#5fd068', headInk: INK, lines: ['bread', 'cheese', 'more bread', 'dessert?', 'seconds'], size: 36, progress: prog(lt, 0.3, 1.6) })
    } },
  { sign: 'gemini', cap: 'Learning six languages. | *At once.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'happy', star: ST,
    front(x, t, lt, P) {
      const W = ['HOLA', 'CIAO', 'BONJOUR', 'HALLO', 'OLÁ', 'HEJ']
      const cols = [PINK, SKYB, GOLD, MINT, LAV, '#ff9a4a']
      W.forEach((w, i) => L(x, 680 + (i % 2) * 220, 650 + Math.floor(i / 2) * 170, w, pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2.2), cols[i], (i % 2 ? 0.06 : -0.06), 40))
    } },
  { sign: 'cancer', cap: 'First phrase learned: | *“call your mum.”*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'llama a | mamá!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 50, tail: 'bl' })
      L(x, 800, 1010, 'MUM: CALLED', pop01(t, P.t0 + 1.3, 0.3, 2.2), PINK, 0.04, 38)
      hearts(x, t, 800, 900, P.t0 + 1.4, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Mastered one phrase: | *“thank you, I know.”*', mood: 'sparkle', star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'gracias, | lo sé.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 46, tail: 'bl' })
      L(x, 800, 1020, 'USES: HOURLY', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, -0.04, 36)
      sparkles(x, t, 370, 840, P.t0 + 1.3, 7, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Day one. | Corrected *the teacher.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 300, head: 'TEACHER’S NOTES', headBg: STEEL, headInk: INK, lines: ['el gato es…', 'la gato es…'], size: 36, progress: prog(lt, 0.3, 0.8) })
      if (lt > 1.0) { x.save(); x.strokeStyle = RED; x.lineWidth = 8; x.lineCap = 'round'; const p = clamp((lt - 1.0) / 0.3); x.beginPath(); x.moveTo(690, 905); x.lineTo(690 + 140 * p, 905); x.stroke(); x.restore() }
      L(x, 800, 1090, 'GRADE: TEACHER B+', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: 'libra', cap: 'Week six. | Still *picking a language.*', mood: lt => Math.floor(lt * 2) % 2 ? 'neutral' : 'happy', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const opts = ['FRENCH?', 'ITALIAN?', 'JAPANESE?', 'GREEK?']
      const n = Math.floor(lt * 2.5) % opts.length
      L(x, 800, 760, opts[n], pop01(t, P.t0 + 0.2, 0.3, 2), PINK, 0.05, 50)
      L(x, 800, 1000, 'LESSONS TAKEN: 0', pop01(t, P.t0 + 1.3, 0.3, 2.2), BONE, -0.04, 32)
    } },
  { sign: 'scorpio', cap: 'Fluent in secret. | *Told no one.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 700, '…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 70, tail: 'bl' })
      bits(x, 'LOCK', 800, 940, 20 * pop01(t, P.t0 + 0.8, 0.3, 2))
      L(x, 800, 1130, 'FLUENCY: CLASSIFIED', pop01(t, P.t0 + 1.4, 0.3, 2.2), '#b04ad0', 0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'Skipped the lessons. | *Moved there.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [0.7, 1.1, 1.5],
    front(x, t, lt, P) {
      bits(x, 'SUITCASE', 800, 920, 28 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      swapLabel(x, 800, 660, lt, 1.2, 'LESSON 1', 'LESSON 1: AIRPORT', { size: 36, fromBg: BONE, toBg: '#ff9a4a' })
    } },
  { sign: 'capricorn', cap: 'Day 365 of practice. | *Never missed one.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'FIRE', 800, 820, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = Math.round(lerp(300, 365, ease.outCubic(prog(lt, 0.4, 1.5))))
      L(x, 800, 1080, `STREAK: ${n} DAYS`, pop01(t, P.t0 + 0.4, 0.3, 2), GOLD, 0.04, 38)
    } },
  { sign: 'aquarius', cap: 'Skipped them all. | *Invented its own.*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'zorp | blee-ka?', pop01(t, P.t0 + 0.35, 0.25, 2.2), { size: 48, tail: 'bl' })
      L(x, 800, 1020, 'SPEAKERS: 1', pop01(t, P.t0 + 1.3, 0.3, 2.2), SKYB, -0.04, 38)
    } },
  { sign: 'pisces', cap: 'Learned “goodbye.” | *Sobbed.*', mood: 'wide', tears: 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'adiós…', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 54, col: SKYB, tail: 'bl' })
      bits(x, 'TISSUE', 800, 1000, 16 * pop01(t, P.t0 + 1.1, 0.3, 2))
    } },
]

const F = makeFilm({
  id: 'r2t0682', key: 'E', accent: ACC, ending: 'callback',
  title: 'The signs learning | *a language.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *Zero fluent.*' },
  last: {
    text: 'Aquarius found | a *second speaker.*',
    draw(x, t, lt) {
      const t0 = t - lt
      friend(x, t, 'aquarius', 360, 1150, 300, pop01(t, t0 + 0.3, 0.4, 2), { mood: 'wink', look: [1, 0], hops: [t0 + 1.4] })
      friend(x, t, 'gemini', 720, 1150, 300, pop01(t, t0 + 0.5, 0.4, 2), { mood: 'sparkle', look: [-1, 0], hops: [t0 + 1.6] })
      bubble(x, 360, 880, 'zorp?', pop01(t, t0 + 0.9, 0.25, 2.2), { size: 48, tail: 'bl' })
      bubble(x, 720, 880, 'BLEE!', pop01(t, t0 + 1.5, 0.25, 2.2), { size: 48, tail: 'br' })
      sparkles(x, t, 540, 1050, t0 + 1.6, 8, 220, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
