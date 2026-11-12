// r2a0475: star_advice, ADVICE ROLLCALL, "Make each sign | *feel welcome.*" (topic: how to make each sign feel welcome)
// (signs3kit social cut, music: lofi · G). Twelve signs in zodiac order: one warm, specific way to make each feel at
// home, with one light visual gag. Ending: lesson.
//   ♈ let them carry something · ♉ snacks out before they arrive · ♊ ask about their day, then listen a while
//   · ♋ remember their favourite mug · ♌ notice the outfit, out loud · ♍ tell them where everything goes · ♎ ask their
//   sign, then compliment it · ♏ skip the small talk · ♐ just say "come on!" · ♑ a start time, kept · ♒ ask about
//   their newest obsession · ♓ a soft hello, maybe a hug.
//   group "Twelve guests. | *All at home.*"   lesson "Welcome isn’t | *one size.*"   last "Door's open. | *Snacks are out.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { phone, note, bits, ORANGE, RED, WOOD, PAPER, SLATE, GREEN } from '../props.js'

const L = { x: -190 }, ACC = '#ffc36b'
const BOX = ['TTTTTTTTTT', 'BBBBTTBBBB', 'BBBBBBBBBB', 'BBBBBBBBBB', 'BBBBBBBBBB', 'BBBBBBBBBB']
const GRAPES = ['....G....', '...GG....', '..PPPPP..', '.PPPPPPP.', '..PPPPP..', '...PPP...', '....P....']
const MUG = ['.WWWWWW...', 'WMMMMMMW..', 'WMMHMMMWWW', 'WMHHHMMW.W', 'WMMHMMMWWW', 'WMMMMMMW..', '.WWWWWW...']

const CAMEOS = [
  { sign: 'aries', cap: 'Aries: let them | *carry something heavy.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', look: [1, 0], star: L, hops: [0.6, 1.2],
    front(x, t, lt, P, F) {
      drawBits(x, BOX, { B: WOOD, T: '#e8c48a' }, 800, 940 - Math.abs(Math.sin(t * 5)) * 10 * (lt > 0.8 ? 1 : 0), 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 700, 'HELPER: THRILLED', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 34, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Taurus: snacks out | *before they arrive.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: L, hops: [1.1],
    front(x, t, lt, P) {
      drawBits(x, GRAPES, { G: GREEN, P: '#a37bff' }, 800, 940, 32 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 700, 'READY AT 6:59', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Gemini: ask about their day. | *Then get comfy.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: L, hops: [0.9],
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'so ANYWAY…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 800, 980, `PART ${1 + Math.min(4, Math.floor(clamp((lt - 0.6) / 1.4) * 4.99))} OF 5`, pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 40, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Cancer: remember | *their favourite mug.*', mood: lt => lt > 1.1 ? 'heart' : 'wide', look: [1, 0], star: L, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, MUG, { W: PAPER, M: SKYB, H: '#ff4f86' }, 800, 940, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 700, 'SAVED FOR YOU', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 820, P.t0 + 1.3, { n: 5, life: 1.6, spread: 140, cell: 6, seed: 3 })
    } },
  { sign: 'leo', cap: 'Leo: notice the outfit. | *Out loud.*', mood: 'sparkle', look: [1, -1], star: L, hops: [0.6, 1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 740, 'WOW. | the jacket?!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, col: GOLD, tail: 'bl' })
      sparkles(x, t, 560, 860, P.t0 + 0.9, 9, 190, 0.4)
      label(x, 800, 1010, 'LEO: GLOWING', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Virgo: show them | *where everything goes.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), 'coats: hook 1 | shoes: mat | towels: shelf 2', { head: 'HOUSE GUIDE', headBg: MINT, size: 30, w: 360, rot: -0.03 })
      label(x, 800, 1090, 'VIRGO: AT PEACE', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Libra: ask their sign. | *Then compliment it.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'what’s your | sign?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 800, 960, 'ICONIC CHOICE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Scorpio: skip the small talk. | *Ask the real thing.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: L, hops: [1.4],
    front(x, t, lt, P) {
      bubble(x, 800, 730, 'nice weather, h—', pop01(t, P.t0 + 0.2, 0.25, 2.2) * (lt < 0.9 ? 1 : 0), { size: 36, tail: 'br' })
      bubble(x, 800, 820, 'what’s your | big dream?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 44, col: '#ff8fae', tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Sag: skip the itinerary. | *Just say “come on!”*', mood: 'sparkle', look: [1, 0], star: L, hops: [0.7, 1.5],
    front(x, t, lt, P) {
      note(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), '7:00 dinner | 8:15 walk | 9:30 ???', { head: 'PLAN', headBg: LAV, size: 32, w: 320, rot: 0.04, strike: lt > 0.9 ? [0, 1, 2] : [] })
      label(x, 800, 1090, 'COME ON!', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 44, bg: MINT, rot: -0.05 })
    } },
  { sign: 'capricorn', cap: 'Capricorn: a start time. | *Then keep it.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(800, 890); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 130, 0, Math.PI * 2); x.fill(); x.fillStyle = PAPER; x.beginPath(); x.arc(0, 0, 116, 0, Math.PI * 2); x.fill()
        x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * 96 - 5, Math.sin(a) * 96 - 5, 10, 10) }
        x.lineCap = 'round'; x.strokeStyle = INK; x.lineWidth = 12; x.beginPath(); x.moveTo(0, 0); x.lineTo(0, -80); x.stroke()
        x.lineWidth = 14; x.beginPath(); x.moveTo(0, 0); x.lineTo(0, 55); x.stroke(); x.restore() }
      label(x, 800, 1110, 'ON TIME = LOVE', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Aquarius: ask about | *their newest obsession.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', look: [1, -1], star: L, hops: [1.2],
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'tell me | about the moss!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
      label(x, 800, 980, 'HOUR TWO OF MOSS', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Pisces: a soft hello. | *Maybe a hug.*', mood: lt => lt > 1.1 ? 'heart' : 'wide', tears: lt => lt > 1.1 ? 2 : 1, look: [1, 0], star: L, hops: [1.2],
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'hi. | so glad you came.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      label(x, 800, 990, 'HAPPY TEARS', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 36, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 820, P.t0 + 1.4, { n: 5, life: 1.6, spread: 140, cell: 6, seed: 7 })
    } },
]

const F = makeFilm({
  id: 'r2a0475', key: 'G', accent: ACC, ending: 'lesson',
  title: 'Make each sign | *feel welcome.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve guests. | *All at home.*' },
  lesson: { text: 'Welcome isn’t | *one size.*', chip: 'DOOR: OPEN' },
  last: { text: 'Door’s open. | *Snacks are out.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
