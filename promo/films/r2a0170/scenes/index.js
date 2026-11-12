// r2a0170: star_advice, ADVICE ROLLCALL, "Each sign's | new year intention." (~59 s vertical, signs3kit social
// cut, music: lofi · G). Topic: "Each sign's new year intention." One warm, specific line per sign, a light gag each.
//   0.0–3.6    "Each sign’s | new year *intention.*"
//   3.6–49.2   ♈ start one thing, then finish it · ♉ try one new food, just one · ♊ finish one book · ♋ let people
//              care for you too · ♌ clap for others as loud as yourself · ♍ rest without earning it · ♎ plan the date,
//              pick on the first try · ♏ let one person all the way in · ♐ unpack the suitcase, stay a while · ♑ a real
//              day off, phone in a drawer · ♒ share the weird idea out loud · ♓ cry less alone, call a friend
//  49.2        "New year. | *Same lovable you.*"
//  52.4        LESSON: "Go gently. | Grow *anyway.*"  YEAR: LOADING
//  58.3        "Starting | *Monday. Probably.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, plate, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = '#f2c75c'
const ST = { x: -170 }
const CUP = ['.S.S.', 'S.S..', 'WWWWWW', 'WWWWWK', 'WWWWWK', 'WWWWW.', '.WWW..']
const HANDS = ['.YY..YY.', 'YYYYYYYY', 'YYYYYYYY', '.YYYYYY.', '..YYYY..']
const HAMMOCK = ['K..........K', '.K........K.', '..LLLLLLLL..', '...LLLLLL...']
const PIN = ['.RRR.', 'RRWRR', 'RRRRR', '.RRR.', '..R..']
const DOOR = ['KKKKKKK', 'KWWWWWK', 'KWWWWWK', 'KWWWWWK', 'KWWWWYK', 'KWWWWWK', 'KWWWWWK', 'KWWWWWK', 'KWWWWWK']
const SUITCASE = ['...KKK...', '..K...K..', 'BBBBBBBBB', 'BRBBBBGBB', 'BBBBYBBBB', 'BBGBBBBRB', 'BBBBBBBBB']
const BULB = ['.YYY.', 'YYWYY', 'YYYYY', 'YYYYY', '.YYY.', '.GGG.', '.GGG.']

const CAMEOS = [
  { sign: 'aries', cap: 'Start one thing. | *Then finish it.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 800, 860, 320, 260, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: CREAM, rot: 0.04 }, () => {
        ;['started: 14', 'finished: 1'].forEach((s, i) => txt(x, s, 30, -50 + i * 90, { size: 32, font: MONO, weight: 700 }))
        x.strokeStyle = INK; x.lineWidth = 5; x.strokeRect(-140, 20, 40, 40)
        if (lt > 1.2) { x.strokeStyle = GREEN; x.lineWidth = 9; x.beginPath(); x.moveTo(-134, 40); x.lineTo(-120, 56); x.lineTo(-96, 14); x.stroke() }
      })
      label(x, 800, 1100, 'DONE ✓', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Try one new food. | *Just one.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      plate(x, 800, 980, pop01(t, P.t0 + 0.2, 0.3, 2), () => { x.fillStyle = '#7dd0a8'; x.beginPath(); x.ellipse(0, -16, 54, 22, 0, 0, Math.PI * 2); x.fill(); txt(x, '?', 0, -20, { size: 40 }) }, { r: 140 })
      bubble(x, 800, 720, lt < 1.4 ? 'hmm…' : 'oh. OH.', pop01(t, P.t0 + (lt < 1.4 ? 0.5 : 1.4), 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Finish one book. | *Every chapter.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(4, 1 + Math.floor(prog(lt, 0.2, 1.2) * 4))
      for (let i = 0; i < n; i++) card(x, 800 + Math.sin(i * 2) * 14, 1060 - i * 50, 240, 40, 1, { bg: [PINK, MINT, SKYB, LAV][i], rot: Math.sin(i * 1.7) * 0.05, border: 5 })
      label(x, 800, 760, 'BOOKMARK: PAGE 3', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 800, 620, 'this year. really.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Let people care | *for you, too.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 830, 960, 180 * k, { mood: 'heart', look: [-1, 0], seed: 14, glyph: false })
      drawBits(x, CUP, { S: '#ffffff', W: CREAM, K: INK }, 690, 980, 12 * pop01(t, P.t0 + 0.8, 0.3, 2.2))
      bubble(x, 800, 700, 'your turn to sit.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 36, tail: 'br', col: PINK })
    } },
  { sign: 'leo', cap: 'Clap for others | *as loud as yourself.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 830, 990, 170 * k, { mood: lt > 1.2 ? 'heart' : 'wide', look: [-1, 0], seed: 15, glyph: false })
      const clap = Math.sin(t * 16) > 0 ? 1 : 0.8
      drawBits(x, HANDS, { Y: '#ffd23a' }, 620, 800, 14 * pop01(t, P.t0 + 0.6, 0.3, 2) * clap)
      label(x, 830, 740, 'BRAVO!!', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.04 })
      sparkles(x, t, 830, 900, P.t0 + 1.2, 7, 160, 0.4)
    } },
  { sign: 'virgo', cap: 'Rest without | *earning it first.*', mood: 'sleepy', star: { x: 30, y: 30, s: 220 },
    back(x, t, lt, P) { drawBits(x, HAMMOCK, { K: INK, L: '#7dd0a8' }, 570, 1000, 40 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      txt(x, 'z', 700, 720 - (lt % 1) * 30, { size: 44, color: BONE }); txt(x, 'Z', 750, 670 - ((lt + 0.5) % 1) * 30, { size: 56, color: BONE })
      label(x, 540, 1140, 'REST: ALLOWED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Plan the date. | *Pick on the first try.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 800, 880, 320, 300, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#cfe8b8', rot: 0.03 }, () => {
        x.strokeStyle = '#ffffff'; x.lineWidth = 12; x.beginPath(); x.moveTo(-160, 40); x.lineTo(160, -20); x.moveTo(-40, -150); x.lineTo(20, 150); x.stroke()
      })
      const d = ease.outBounce ? ease.outBounce(prog(lt, 0.8, 1.3)) : ease.outCubic(prog(lt, 0.8, 1.3))
      if (lt > 0.8) drawBits(x, PIN, { R: RED, W: '#ffffff' }, 820, lerp(640, 840, d), 16)
      label(x, 800, 1110, '✦ DATE: BOOKED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Let one person | *all the way in.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const open = ease.inOutCubic(prog(lt, 0.6, 1.2))
      drawBits(x, DOOR, { K: INK, W: '#8a4a2e', Y: GOLD }, 810 + open * 60, 880, 34 * pop01(t, P.t0 + 0.2, 0.3, 2), { sx: 1 - open * 0.7 })
      if (lt > 1.1) hearts(x, t, 760, 960, P.t0 + 1.1, { n: 5, life: 1.4, spread: 100, cell: 7, seed: 3 })
      label(x, 800, 1120, 'GUEST LIST: 1', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Unpack the suitcase. | *Stay a while.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SUITCASE, { K: INK, B: '#8a4a2e', R: RED, G: GREEN, Y: GOLD }, 800, 960, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 720, 'UNPACKED: 1 SOCK', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 32, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1130, 'baby steps.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'A real day off. | *Phone in a drawer.*', mood: lt => lt > 1.3 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), shut = ease.outCubic(prog(lt, 0.9, 1.3))
      if (k > 0.01) {
        x.save(); x.translate(800, 960); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -70, 340, 150); x.fillStyle = WOOD; x.fillRect(-160, -60, 320, 130)
        x.fillStyle = INK; x.fillRect(-60, lerp(-160, -40, shut), 120, 90); x.fillStyle = '#2a2350'; x.fillRect(-52, lerp(-152, -32, shut), 104, 74)
        x.fillStyle = '#a8702a'; x.fillRect(-160, -60 + 30 * shut, 320, 130 - 30 * shut); x.fillStyle = GOLD; x.fillRect(-24, 0, 48, 14)
        x.restore()
      }
      label(x, 800, 720, 'OUT OF OFFICE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Share the weird idea. | *Out loud.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      x.save(); x.shadowColor = GOLD; x.shadowBlur = 30 * clamp(lt - 0.6)
      drawBits(x, BULB, { Y: lt > 0.8 ? SUN : '#8a8070', W: '#ffffff', G: GREY }, 800, 800, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      x.restore()
      bubble(x, 800, 1060, 'what if… | soup, but cold?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Cry less alone. | *Call a friend.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', tears: lt => lt > 1.4 ? 1 : 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'CALLING…', headCol: MINT, size: 30, w: 300, h: 440, lines: [['BESTIE', GOLD, 1], [lt > 1.3 ? 'picked up!' : '…', MINT, pop01(t, P.t0 + 0.6, 0.25, 2.2)]] })
      if (lt > 1.4) hearts(x, t, 800, 900, P.t0 + 1.4, { n: 5, life: 1.4, spread: 160, cell: 7, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'r2a0170', key: 'G', accent: ACC, ending: 'lesson',
  title: 'Each sign’s | new year *intention.*',
  cameos: CAMEOS,
  group: { cap: 'New year. | *Same lovable you.*' },
  lesson: { text: 'Go gently. | Grow *anyway.*', chip: 'YEAR: LOADING' },
  last: { text: 'Starting | *Monday. Probably.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
