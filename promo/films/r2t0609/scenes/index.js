// r2t0609: star_talk, BELIKE, "“You look tired.” | Signs *be like.*" (signs3kit social cut, music: lofi · D). Ending: lesson.
//   ♈ challenged them to a race · ♉ agreed, went back to bed · ♊ gave twelve reasons, all different
//   · ♋ hurt, then made them soup · ♌ gasped, pulled out a ring light · ♍ pulled up their sleep spreadsheet
//   · ♎ asked their match for a second opinion · ♏ said nothing, added it to the list · ♐ laughed so hard they
//   woke up · ♑ tired? that's called success · ♒ not tired, just thinking about space · ♓ sobbed: "you noticed me?"
//   group "Twelve signs. | *Zero chill.*"  lesson "Maybe just ask | *“how are you?”*"  KINDNESS: ON
//   last "Taurus? | *Still in bed.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, bits, chart, zzz, steam, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#c9a6ff', ST = { x: -170 }
const SHOE = ['....KKKK....', '...KRRRRK...', '..KRRWRRRKK.', 'KKRRRRRRRRRK', 'KWWWWWWWWWWK', '.KKKKKKKKKK.']
const PLANET = ['....OOOO....', '..OOOOOOOO..', 'RROOOOOOOORR', '.RRRROOORRRR', '..OOOOOOOO..', '....OOOO....']

const CAMEOS = [
  { sign: 'aries', cap: 'Challenged them | *to a race.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.0, 1.4],
    front(x, t, lt, P) {
      drawBits(x, SHOE, { K: INK, R: RED, W: BONE }, 800, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.08 })
      bubble(x, 790, 680, 'race you. NOW.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 44, col: '#ff6b5a', tail: 'bl' })
      L(x, 800, 1080, 'TIRED? WATCH THIS', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: 'taurus', cap: 'Agreed. | *Went back to bed.*', mood: 'sleepy', star: ST,
    front(x, t, lt, P) {
      bits(x, 'PILLOW', 800, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 680, 'fair point.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 44, tail: 'bl' })
      zzz(x, t, 470, 760, { alpha: clamp((lt - 0.9) * 2) })
      L(x, 800, 1070, 'NAP: STARTED', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: 'gemini', cap: 'Gave twelve reasons why. | *All different.*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const R = ['a podcast', 'new moon', 'my cat', 'a dream', 'tax stuff', 'a vibe']
      const n = Math.min(5, Math.floor(Math.max(0, lt - 0.3) / 0.35))
      bubble(x, 790, 720, `well, ${R[n]}…`, pop01(t, P.t0 + 0.3 + n * 0.35, 0.2, 2.2), { size: 44, col: '#ffd23a', tail: 'bl' })
      L(x, 800, 960, `REASON #${n + 1}`, pop01(t, P.t0 + 0.4, 0.3, 2), CREAM, 0.04, 36)
    } },
  { sign: 'cancer', cap: 'Hurt. | Then *made them soup.*', mood: lt => lt < 0.9 ? 'wide' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOWL', 800, 900, 20 * pop01(t, P.t0 + 0.8, 0.3, 2))
      steam(x, t, 800, 830, { alpha: clamp((lt - 1.0) * 2) })
      L(x, 800, 1070, 'EAT. YOU’RE TIRED.', pop01(t, P.t0 + 1.4, 0.3, 2.2), SKYB, -0.04, 30)
    } },
  { sign: 'leo', cap: 'Gasped. | Pulled out *a ring light.*', mood: lt => lt < 0.8 ? 'wide' : 'sparkle', look: [-1, 0], star: ST,
    front(x, t, lt, P) {
      const on = lt > 0.9
      if (on) { x.save(); x.globalAlpha = 0.25; x.fillStyle = '#fff4c0'; x.beginPath(); x.moveTo(800, 820); x.lineTo(470, 720); x.lineTo(470, 1020); x.fill(); x.restore() }
      x.save(); x.lineWidth = 22; x.strokeStyle = INK; x.beginPath(); x.arc(800, 820, 110 * pop01(t, P.t0 + 0.6, 0.3, 2), 0, Math.PI * 2); x.stroke()
      x.lineWidth = 14; x.strokeStyle = on ? '#fff4c0' : STEEL; x.stroke(); x.restore()
      L(x, 800, 1070, 'LIGHTING: FIXED', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: 'virgo', cap: 'Pulled up their | *sleep spreadsheet.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 330, head: 'SLEEP LOG', headBg: '#7dffb0', headInk: INK, lines: ['mon 7h 52m', 'tue 7h 49m', 'wed 7h 51m', 'avg: FINE'], size: 30, align: 'left', font: "'Space Mono', monospace", weight: 700, progress: clamp((lt - 0.3) / 1.1) })
    } },
  { sign: 'libra', cap: 'Asked their match | for *a second opinion.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 810, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ MATCH: LEO', headCol: GOLD, lines: [['tired??', PINK, pop01(t, P.t0 + 0.5, 0.25, 2), true], ['you look cute', BONE, pop01(t, P.t0 + 1.3, 0.25, 2), false]], typing: lt > 0.8 && lt < 1.3 ? 1 : 0, size: 26 })
    } },
  { sign: 'scorpio', cap: 'Said nothing. | *Remembered forever.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 300, head: 'THE LIST', headBg: '#c97bff', lines: ['1. ...', '2. ...', '3. “tired”'], size: 34, align: 'left', progress: clamp((lt - 0.3) / 1.0) })
      L(x, 800, 1080, 'NOTED.', pop01(t, P.t0 + 1.5, 0.3, 2.4), RED, -0.05, 40)
    } },
  { sign: 'sagittarius', cap: 'Laughed so hard | they *woke up.*', mood: lt => lt > 0.8 ? 'happy' : 'sleepy', look: [1, 0], star: ST, hops: [0.9, 1.2],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'HAHA true!', pop01(t, P.t0 + 0.6, 0.25, 2.4), { size: 56, col: '#ff9a4a', tail: 'bl' })
      L(x, 800, 960, 'ENERGY: RESTORED', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, 0.04, 30)
      sparkles(x, t, 520, 820, P.t0 + 0.9, 7, 150, 0.3)
    } },
  { sign: 'capricorn', cap: 'Tired? | *That’s called success.*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) bits(x, 'PAPERS', 800 + (i % 2 ? 10 : -10), 1000 - i * 58, 14 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.25, 2))
      L(x, 800, 660, 'HOURS: ALL OF THEM', pop01(t, P.t0 + 1.1, 0.3, 2.2), STEEL, -0.04, 28)
    } },
  { sign: 'aquarius', cap: 'Not tired. | Just *thinking about space.*', mood: 'neutral', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PLANET, { O: '#ffb34a', R: SKYB }, 800, 780 + 10 * Math.sin(t * 1.5), 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.15 })
      L(x, 800, 1020, 'BRAIN: IN ORBIT', pop01(t, P.t0 + 1.0, 0.3, 2.2), SKYB, -0.04, 32)
      sparkles(x, t, 800, 780, P.t0 + 0.5, 7, 180, 0.2, [BONE, SKYB, GOLD])
    } },
  { sign: 'pisces', cap: 'Sobbed. | “You *noticed* me?”', mood: lt => lt < 0.9 ? 'wide' : 'heart', tears: lt => lt < 0.9 ? 2 : 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'TISSUE', 800, 900, 18 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 800, 1070, 'SOMEONE CARES!!', pop01(t, P.t0 + 1.0, 0.3, 2.2), PINK, 0.04, 32)
      hearts(x, t, 800, 800, P.t0 + 1.2, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 3 })
    } },
]

const F = makeFilm({
  id: 'r2t0609', key: 'D', accent: ACC, ending: 'lesson',
  title: '“You look tired.” | Signs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *Zero chill.*' },
  lesson: { text: 'Maybe just ask | *“how are you?”*', chip: 'KINDNESS: ON' },
  last: {
    text: 'Taurus? | *Still in bed.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.4, 2)
      bits(x, 'PILLOW', 540, 1590, 22 * k)
      zzz(x, t, 640, 1500, { alpha: clamp(lt - 0.8) })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
