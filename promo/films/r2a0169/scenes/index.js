// r2a0169: star_advice, ADVICE ROLLCALL, "How to be a good guest | at each sign's home." (~57 s vertical, signs3kit
// social cut, music: lofi · E). One warm, specific line per sign, each with a light visual gag.
//   0.0–3.6    "Be a good guest | *at each sign’s home.*"
//   3.6–49.2   ♈ say yes to the house tour (it's fast) · ♉ compliment the snacks, have seconds · ♊ ask about the
//              birth-chart poster · ♋ take the leftovers · ♌ notice the new decor, out loud · ♍ coasters, always
//              · ♎ praise the candles · ♏ knock first · ♐ ask about the souvenirs, clear an hour · ♑ arrive on time
//              · ♒ play the guess-my-sign game · ♓ stay for the late talk, bring tissues
//  49.2        "Twelve homes. | *One great guest.*"
//  52.4        LESSON: "Every home is a heart. | *Wipe your feet.*"  GUEST: FAVOURITE
//  58.3        "Same time | *next week?*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, chart, clock, plate, glass, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = '#ff8fb1'
const ST = { x: -170 }
const BOX = ['KKKKKKKKK', 'KLLLLLLLK', 'KLLLLLLLK', 'KLLLLLLLK', 'KKKKKKKKK']
const CANDLE = ['..F..', '.FYF.', '..K..', 'WWWWW', 'WWWWW', 'WWWWW', 'WWWWW', 'WWWWW']
const DOOR = ['KKKKKKK', 'KWWWWWK', 'KWWWWWK', 'KWWWWWK', 'KWWWWYK', 'KWWWWWK', 'KWWWWWK', 'KWWWWWK', 'KWWWWWK']
const SUITCASE = ['...KKK...', '..K...K..', 'BBBBBBBBB', 'BRBBBBGBB', 'BBBBYBBBB', 'BBGBBBBRB', 'BBBBBBBBB']
const TISSUE = ['...WW...', '..WWWW..', 'BBBBBBBB', 'BPBBPBBB', 'BBBBBBBB', 'BBBPBBPB']
const CHEESE = ['....YY', '..YYYY', 'YYYYYY', 'YKYYKY', 'YYYYYY']

const CAMEOS = [
  { sign: 'aries', cap: 'Say yes to the house tour. | *Keep up.*', mood: 'sparkle', star: ST, hops: [0.4, 0.8, 1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      const R = ['KITCHEN', 'GARDEN', 'ROOF?!']
      const n = Math.min(3, Math.floor(prog(lt, 0.3, 1.6) * 3) + 1)
      for (let i = 0; i < n; i++) label(x, 800, 700 + i * 120, `→ ${R[i]}`, pop01(t, P.t0 + 0.3 + i * 0.4, 0.25, 2.2), { size: 38, bg: [GOLD, MINT, PINK][i], rot: (i % 2 ? 1 : -1) * 0.05, font: MONO, weight: 700 })
      x.fillStyle = 'rgba(239,230,214,0.5)'; for (let i = 0; i < 3; i++) x.fillRect(F.x - 240 - i * 16, F.cy - 50 + i * 40, 120 - i * 18, 10)
      label(x, 800, 1100, 'TOUR: 40 SEC', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Compliment the snacks. | *Then have seconds.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      plate(x, 800, 980, pop01(t, P.t0 + 0.2, 0.3, 2), () => { drawBits(x, CHEESE, { Y: SUN, K: '#e0a800' }, -40, -30, 12); drawBits(x, CHEESE, { Y: SUN, K: '#e0a800' }, 40, -26, 12, { sx: -1 }) }, { r: 140 })
      bubble(x, 790, 720, 'this is SO good', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, tail: 'bl', col: MINT })
      label(x, 800, 1120, 'HOST: GLOWING', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Ask about the chart poster. | *Hear five stories.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 800, 830, 300, 300, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#1b1236', rot: 0.03 }, () => {})
      chart(x, 800, 830, 110, pop01(t, P.t0 + 0.3, 0.3, 2), t, 0.3)
      const n = Math.min(5, 1 + Math.floor(prog(lt, 0.8, 2.0) * 5))
      label(x, 800, 1100, `STORY ${n} OF 5`, pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Take the leftovers. | *It’s how they hug.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(5, 1 + Math.floor(prog(lt, 0.2, 1.6) * 5))
      const COL = [MINT, PINK, SKYB, GOLD, LAV]
      for (let i = 0; i < n; i++) drawBits(x, BOX, { K: INK, L: COL[i] }, 800 + Math.sin(i * 2) * 10, 1080 - i * 70, 18, { alpha: pop01(t, P.t0 + 0.2 + i * 0.25, 0.2, 2) })
      bubble(x, 800, 660, 'one for the road!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, tail: 'bl', col: PINK })
    } },
  { sign: 'leo', cap: 'Notice the new decor. | *Out loud.*', mood: lt => lt > 1.1 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      card(x, 800, 830, 260, 320, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: GOLD, rot: -0.03, border: 8 }, () => {
        x.fillStyle = '#c98f2a'; x.fillRect(-110, -140, 220, 280)
        signChar(x, t, 'leo', 0, 10, 160, { mood: 'wink', seed: 77, glyph: false, glow: 0.4 })
      })
      bubble(x, 800, 1090, 'wow. STUNNING.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bl' })
      sparkles(x, t, 800, 830, P.t0 + 1.2, 7, 180, 0.5)
    } },
  { sign: 'virgo', cap: 'Coasters. Always. | *They will notice.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), d = ease.outCubic(prog(lt, 0.6, 1.1))
      x.fillStyle = INK; x.fillRect(680, 1040, 240, 24); x.fillStyle = WOOD; x.fillRect(684, 1036, 232, 20)
      if (lt > 0.5) { x.fillStyle = INK; x.beginPath(); x.ellipse(800, 1030, 72, 18, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#d26b8a'; x.beginPath(); x.ellipse(800, 1028, 64, 14, 0, 0, Math.PI * 2); x.fill() }
      glass(x, t, 800, lerp(880, 960, d), k, { fillCol: '#ffd6a8' })
      label(x, 800, 720, 'RING-FREE TABLE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Praise the candles. | *Chosen for you.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) {
        const fl = Math.sin(t * 12 + i) > 0 ? 1 : 0.9
        drawBits(x, CANDLE, { F: ORANGE, Y: SUN, K: INK, W: ['#ffd6e6', '#e8d6ff', '#fff1d6'][i] }, 710 + i * 90, 960 - (i % 2) * 40, 14 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2), { sy: fl })
      }
      bubble(x, 800, 700, 'is that… | vanilla fig?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 800, 1110, 'AMBIENCE: NOTICED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Closed door? | *Knock. Wait. Smile.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, DOOR, { K: INK, W: '#8a4a2e', Y: GOLD }, 810, 880, 34 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 0.6 && lt < 1.3) { txt(x, 'knock', 760, 760 + Math.sin(t * 20) * 4, { size: 30, font: MONO, weight: 700, color: BONE }); txt(x, 'knock', 860, 820 + Math.cos(t * 20) * 4, { size: 30, font: MONO, weight: 700, color: BONE }) }
      bubble(x, 810, 1100, 'come in.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl', col: LAV })
    } },
  { sign: 'sagittarius', cap: 'Ask about the souvenirs. | *Clear an hour.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      drawBits(x, SUITCASE, { K: INK, B: '#8a4a2e', R: RED, G: GREEN, Y: GOLD }, 800, 960, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const h = Math.floor(lerp(0, 60, prog(lt, 0.8, 2.3)))
      label(x, 800, 720, `STORY TIME: ${h} MIN`, pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 32, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Arrive on time. | *That’s the gift.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      clock(x, 800, 860, 120, pop01(t, P.t0 + 0.2, 0.3, 2), 6, Math.min(60, 57 + lt * 2.5))
      label(x, 800, 1080, '7:00 SHARP ✓', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Join their sign-guessing game. | *Lose happily.*', mood: lt => lt > 1.3 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 800, 860, 260, 340, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#1b1236', rot: 0.04 }, () => {
        x.strokeStyle = SKYB; x.lineWidth = 5; x.strokeRect(-110, -150, 220, 300)
        txt(x, '?', 0, -10, { size: 140, color: SKYB })
      })
      bubble(x, 800, 1110, 'virgo? no. LEO?', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Stay for the late talk. | *Bring tissues.*', mood: 'heart', tears: lt => lt > 1.0 ? 3 : 2, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TISSUE, { W: '#ffffff', B: SKYB, P: '#c9a6ff' }, 800, 1000, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      clock(x, 800, 740, 80, pop01(t, P.t0 + 0.6, 0.3, 2), 2, 10)
      label(x, 800, 1130, 'SOUL: SHARED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0169', key: 'E', accent: ACC, ending: 'lesson',
  title: 'Being a good guest, | *sign by sign.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve homes. | *One great guest.*' },
  lesson: { text: 'Every home is a heart. | *Wipe your feet.*', chip: 'GUEST: FAVOURITE' },
  last: { text: 'Same time | *next week?*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
