// r2t0184: star_talk, BE LIKE, "Unknown caller? | Zodiacs be like." (~58 s vertical, signs3kit social cut, music: lofi · D)
// Twelve signs in zodiac order, each one's most extreme reaction to an unknown number calling. Ending: lesson.
//   0.0–3.6    "Unknown caller? | Zodiacs *be like.*"
//   3.6–49.2   ♈ answered before the first ring · ♉ let it ring, kept eating · ♊ wrong number, new best friend
//              · ♋ didn't answer, worried for three days · ♌ answered like a talk-show host · ♍ a six-page caller report
//              · ♎ answer or decline? (what if it's my match) · ♏ answered in silence · ♐ "it's 3am here"
//              · ♑ sent a calendar invite to call back · ♒ answered as a robot · ♓ it was a delivery, cried anyway
//  49.2        "Twelve signs. | *One missed call.*"  The twelve fly up into a group photo.
//  52.4        LESSON: "Not every call | needs an *answer.*"  VOICEMAIL: FULL
//  58.3        last "It was the dentist. | *Again.*"
import { prog, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { phone, note, bits, calendar, ORANGE, RED, WOOD, PAPER, SLATE, GREEN } from '../props.js'

const L = { x: -170 }
// a ringing phone: wobbles, with ring arcs
function ringing(x, t, cx, cy, k, { msg = 'UNKNOWN', ring = true, bg = LAV } = {}) {
  const w = ring ? 0.08 * Math.sin(t * 40) : 0.05
  phone(x, cx, cy, k, { top: '☎', head: 'INCOMING', msg, bg, rot: w })
  if (ring && k > 0.5) { x.save(); x.strokeStyle = GOLD; x.lineWidth = 7; for (let i = 0; i < 2; i++) { x.globalAlpha = 0.6 + 0.4 * Math.sin(t * 12 + i); x.beginPath(); x.arc(cx, cy - 100, 130 + i * 30, -2.3, -0.8); x.stroke() } x.restore() }
}

const CAMEOS = [
  { sign: 'aries', cap: 'Answered before | *the first ring.*', mood: 'wide', look: [1, 0], star: L, hops: [0.3],
    front(x, t, lt, P) {
      ringing(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { ring: false, msg: 'CONNECTED', bg: ORANGE })
      bubble(x, 790, 610, 'WHO IS THIS', pop01(t, P.t0 + 0.6, 0.25, 2.4), { size: 46, tail: 'bl' })
      label(x, 790, 1120, 'RINGS: 0', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Let it ring. | *Kept eating.*', mood: 'heart', look: [-1, 0], star: L,
    front(x, t, lt, P) {
      ringing(x, t, 820, 820, pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'bowl', 520, 1080, 16 * pop01(t, P.t0 + 0.5, 0.3, 2))
      label(x, 800, 1120, 'SNACK: PRIORITY', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Wrong number. | *New best friend.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'oh, wrong number? | anyway SO—', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, tail: 'bl' })
      const m = Math.round(1 + 58 * ease.outCubic(prog(lt, 0.4, 1.8)))
      label(x, 790, 880, `CALL: ${m} MIN`, pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 44, bg: '#ffd23a', rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1060, 'BFF: ADDED', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Didn’t answer. | *Worried for three days.*', mood: lt => lt > 1.2 ? 'wide' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const d = Math.min(3, 1 + Math.floor(prog(lt, 0.3, 1.5) * 2.99))
      calendar(x, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), 'WORRYING', `DAY ${d}`, { topBg: SKYB })
      bubble(x, 790, 1080, 'was it important?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Answered like | *a talk show host.*', mood: 'sparkle', look: [1, 0], star: L, hops: [0.8],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'you’re LIVE | with LEO!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 48, col: ORANGE, tail: 'bl' })
      label(x, 790, 960, '● ON AIR', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 44, bg: RED, color: BONE, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 800, P.t0 + 0.8, 8, 220, 0.2)
    } },
  { sign: 'virgo', cap: 'Looked up the number. | *Wrote a report.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), 'area code: ✓ | caller: dentist? | sun sign: ???', { head: 'REPORT p.1/6', headBg: MINT, size: 32, w: 360 })
      label(x, 790, 1100, 'CALL BACK: NO', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Answer or decline? | *Still deciding.*', mood: 'squint', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: L,
    front(x, t, lt, P) {
      ringing(x, t, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 1100, 'what if it’s | my match?', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Answered. | *Said nothing.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'hello? …hello?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'br' })
      bubble(x, 760, 920, '…', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 70, col: '#c97bff', tail: 'bl' })
      label(x, 790, 1110, 'THEY TALK FIRST', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Answered from | *another time zone.*', mood: 'sleepy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bits(x, 'suitcase', 790, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      bubble(x, 790, 680, 'it’s 3am | here, hi!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, tail: 'bl' })
      bits(x, 'moon', 940, 580, 12 * pop01(t, P.t0 + 0.5, 0.3, 2))
    } },
  { sign: 'capricorn', cap: 'Sent a calendar invite | *to call back.*', mood: 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      calendar(x, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), 'CALL BACK', 'TUE 9:15', { topBg: '#9aa5c4' })
      label(x, 790, 1080, 'AGENDA: ATTACHED', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Picked up | *as a robot.*', mood: 'neutral', look: [1, 0], star: L, squash: lt => 0.03 * Math.sign(Math.sin(lt * 18)),
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'BEEP. NOBODY | IS HOME. BOOP.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, col: SKYB, font: MONO, weight: 700, tail: 'bl' })
      label(x, 790, 980, 'COMMITMENT: TOTAL', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'It was a delivery. | Pisces *cried anyway.*', mood: lt => lt < 0.9 ? 'wide' : 'heart', tears: lt => lt < 0.9 ? 1 : 3, look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'gift', 790, 930, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 650, 'you’re so | kind to call', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 1130, 'PACKAGE: OUTSIDE', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0184', key: 'D', accent: LAV, ending: 'lesson',
  title: 'Unknown caller? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *One missed call.*' },
  lesson: { text: 'Not every call | needs an *answer.*', chip: 'VOICEMAIL: FULL' },
  last: { text: 'It was the dentist. | *Again.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
