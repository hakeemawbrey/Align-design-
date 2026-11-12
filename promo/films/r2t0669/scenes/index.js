// r2t0669: star_talk, BELIKE (twelve signs), "Waking up late? | Zodiacs *be like.*" (signs3kit social cut, music: lofi · D).
// Aries sprinted out in one sock · Taurus still made a full breakfast · Gemini sent fourteen different excuses (incl.
// Mercury retrograde) · Cancer apologised to the alarm clock · Leo: late, but the hair is perfect · Virgo rewrote the
// whole day · Libra: two outfits tied · Scorpio: nobody will ever know · Sagittarius turned it into a road trip ·
// Capricorn filed an incident report · Aquarius: time is a construct · Pisces dreamed they were on time (cried).
// Ending: lesson. "Late happens. | Be *gentle with you.*"  last "Tomorrow? | *Twelve alarms.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, zzz, steam, RED, CREAM, STEEL, PLUM, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = GOLD, ST = { x: -190 }
const SOCK = ['.PPP', '.PPP', '.PPP', '.PPP', 'PPPP', 'PPPW', 'WWW.']
const SHIRT = ['SS...SS', 'SSSSSSS', 'SSSSSSS', '.SSSSS.', '.SSSSS.', '.SSSSS.']
/** a clock whose hands spin */
function clockSpin(x, t, cx, cy, r, k, speed) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 10, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * r * 0.82 - 4, Math.sin(a) * r * 0.82 - 4, 8, 8) }
  const hand = (a, len, w) => { x.save(); x.rotate(a); x.fillStyle = INK; x.fillRect(-w / 2, -len, w, len); x.restore() }
  hand(t * speed * 0.08, r * 0.5, 12); hand(t * speed, r * 0.75, 7)
  x.fillStyle = RED; x.fillRect(-8, -8, 16, 16)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Sprinted out the door | in *one sock.*', mood: 'wide', look: [1, 0], star: ST, hops: [0.6, 1.0, 1.4, 1.8],
    front(x, t, lt, P, F) {
      drawBits(x, SOCK, { P: RED, W: BONE }, F.x + 20, F.cy + 175, 13 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 3; i++) { x.fillStyle = 'rgba(239,230,214,0.5)'; x.fillRect(F.x - 230 - i * 30, F.cy - 40 + i * 40, 90, 10) }
      L(x, 790, 760, 'LATE: 2 MIN', pop01(t, P.t0 + 0.4, 0.3, 2.2), RED, -0.04, 40)
      L(x, 790, 1050, 'SHOES: OPTIONAL', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  { sign: 'taurus', cap: 'Late? Still made | *a full breakfast.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'PLATE', 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'MUG', 900, 780, 12 * pop01(t, P.t0 + 0.4, 0.3, 2)); steam(x, t, 895, 730, { n: 2, alpha: 0.7, h: 90 })
      L(x, 790, 1080, 'PRIORITIES ✓', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, -0.04, 38)
    } },
  { sign: 'gemini', cap: 'Sent fourteen | *different excuses.*', mood: 'wink', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, t, 790, 840, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'BOSS', headCol: STEEL, lines: [['traffic!', BONE, pop01(t, P.t0 + 0.5, 0.25, 2), true], ['a goose??', LAV, pop01(t, P.t0 + 0.9, 0.25, 2), true], ['mercury retro', PINK, pop01(t, P.t0 + 1.3, 0.25, 2), true], ['…pick one', MINT, pop01(t, P.t0 + 1.8, 0.25, 2)]] })
    } },
  { sign: 'cancer', cap: 'Apologized | to *the alarm clock.*', mood: 'heart', tears: 1, look: [1, 0], star: ST, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 790, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 670, 'sorry, buddy.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 42, tail: 'bl', col: LAV })
      if (lt > 1.4) hearts(x, t, 790, 860, P.t0 + 1.4 * 3.1 / 2.4, { n: 4, life: 1.4, spread: 140, cell: 7, seed: 8 })
    } },
  { sign: 'leo', cap: 'Late, but | *the hair is perfect.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      sparkles(x, t, F.x, F.top, P.t0 + 0.4, 8, 150, 0.4); sparkles(x, t, F.x, F.top, P.t0 + 1.4, 8, 170, 1.1)
      L(x, 790, 780, 'HAIR: FLAWLESS', pop01(t, P.t0 + 0.6, 0.3, 2.2), GOLD, -0.04, 38)
      L(x, 790, 1000, 'ENTRANCE: MADE', pop01(t, P.t0 + 1.3, 0.3, 2.2), PINK, 0.04, 38)
    } },
  { sign: 'virgo', cap: 'Woke up late. | *Rewrote the whole day.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const re = lt > 1.1
      sheet(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 360, rot: 0.04, head: re ? 'PLAN v2' : 'PLAN', headBg: re ? MINT : STEEL, headInk: INK, lines: re ? ['8:47 panic', '8:48 coffee', '8:49 calm', '8:50 fine'] : ['7:00 run', '7:30 smoothie', '8:00 journal'], size: 32, align: 'left' })
    } },
  { sign: 'libra', cap: 'Late because | *two outfits tied.*', mood: lt => lt > 1.2 ? 'wide' : 'neutral', look: lt => [Math.sin(lt * 5) > 0 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SHIRT, { S: PINK }, 700, 860, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, SHIRT, { S: SKYB }, 880, 860, 20 * pop01(t, P.t0 + 0.35, 0.3, 2))
      L(x, 790, 1070, 'RESULT: TIE (AGAIN)', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  { sign: 'scorpio', cap: 'Slipped in late. | *Nobody will ever know.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      bits(x, 'SHADES', F.x, F.cy - 20, 11 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 790, 820, 'ALIBI: READY', pop01(t, P.t0 + 0.8, 0.3, 2.2), RED, 0.04, 40)
      bubble(x, 790, 1030, 'been here | since 8.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Late? Turned it into | *a road trip.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0, 1.6],
    front(x, t, lt, P) {
      bits(x, 'SUITCASE', 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      L(x, 790, 1080, 'NEW PLAN: BEACH', pop01(t, P.t0 + 1.1, 0.3, 2.2), SKYB, -0.04, 36)
    } },
  { sign: 'capricorn', cap: 'Late once. | Filed *an incident report.*', mood: 'neutral', look: [1, 0], star: ST, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 340, rot: -0.04, head: 'INCIDENT #1', headBg: RED, headInk: CREAM, lines: ['late: 4 min', 'cause: snooze', 'never again.'], size: 32, align: 'left', progress: clamp((lt - 0.3) / 1.3) })
    } },
  { sign: 'aquarius', cap: 'Late? | Time is *a construct.*', mood: 'sparkle', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      clockSpin(x, t, 790, 840, 130, pop01(t, P.t0 + 0.2, 0.3, 2), 6)
      L(x, 790, 1070, 'TIME: OPTIONAL', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, 0.04, 38)
    } },
  { sign: 'pisces', cap: 'Dreamed they were on time. | *Cried.*', mood: lt => lt > 1.0 ? 'wide' : 'sleepy', tears: lt => lt > 1.0 ? 3 : 1, look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      if (lt < 1.0) zzz(x, t, F.x + 90, F.top - 10, { alpha: 1, size: 44 })
      bubble(x, 800, 700, 'I was SO early…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl', col: LAV })
      L(x, 790, 1050, 'ACTUAL: 9:41', pop01(t, P.t0 + 1.3, 0.3, 2.2), RED, -0.04, 40)
    } },
]

const F = makeFilm({
  id: 'r2t0669', key: 'D', accent: ACC, ending: 'lesson',
  title: 'Waking up late? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *Zero alarms.*' },
  lesson: { text: 'Late happens. | Be *gentle with you.*', chip: 'SNOOZE: FORGIVEN' },
  last: { text: 'Tomorrow? | *Twelve alarms.*',
    draw(x, t, lt) { for (let i = 0; i < 3; i++) bits(x, 'CLOCK', 340 + i * 200, 780, 18 * pop01(t, t - lt + 0.8 + i * 0.2, 0.3, 2.2), { rot: 0.1 * Math.sin(t * 25 + i) }) } },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
