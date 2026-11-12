// r2t0605: star_talk, SOLO (virgo), "Virgos reading | *the instructions.*" (signs3kit social cut, music: lofi · F).
// Nine cards, each the most extreme Virgo version: read the shampoo bottle twice, took notes · found a typo in the shelf
// manual · read all the popcorn warnings · read the board-game rules aloud, all of them · laid out every screw in order
// · read the terms and conditions, had questions · measured "a pinch" · read your birth chart like a setup guide
// · lost the manual, wrote a better one.
// Ending: lesson ("Fine print? | Virgo's *got you.*") then "Hug a Virgo. | *As directed.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, friend, zzz, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dffb0', ST = { x: -180 }, SG = 'virgo'
const BOTTLE = ['..KK..', '..KK..', '.PPPP.', 'PPPPPP', 'PWWWWP', 'PWLLWP', 'PWWWWP', 'PWLLWP', 'PWWWWP', 'PPPPPP']
const SCREW = ['SSS', '.S.', '.S.', '.S.', '.S.']
const POP = ['.W.W.W.', 'WWWWWWW', 'RWRWRWR', 'RWRWRWR', 'RWRWRWR', 'RWRWRWR', '.RWRWR.']

const circle = (x, cx, cy, r, p) => { x.save(); x.strokeStyle = RED; x.lineWidth = 7; x.beginPath(); x.ellipse(cx, cy, r * 1.6, r, -0.1, 0, Math.PI * 2 * clamp(p)); x.stroke(); x.restore() }

const CAMEOS = [
  { sign: SG, cap: 'Read the shampoo bottle. | *Twice.* Took notes.', mood: 'squint', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      drawBits(x, BOTTLE, { K: INK, P: SKYB, W: BONE, L: STEEL }, 700, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      sheet(x, 870, 820, pop01(t, P.t0 + 0.6, 0.35, 2), { w: 220, h: 260, rot: 0.06, head: 'NOTES', headBg: ACC, headInk: INK, align: 'left', lines: ['lather', 'rinse', 'repeat?', 'how many?'], size: 26, progress: clamp((lt - 0.8) / 0.9) })
      L(x, 800, 1110, 'READ COUNT: 2', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: SG, cap: 'Found a typo | in *the manual.*', mood: lt => lt > 1.2 ? 'wide' : 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 340, h: 280, head: 'MANUAL · STEP 4', headBg: STEEL, headInk: INK, lines: ['insret', 'screw B'], size: 44 })
      if (lt > 1.0) circle(x, 790, 806, 46, (lt - 1.0) / 0.4)
      L(x, 800, 1080, 'EMAILED THE COMPANY', pop01(t, P.t0 + 1.6, 0.3, 2.4), RED, 0.04, 30)
    } },
  { sign: SG, cap: 'Microwave popcorn? | Read *every* warning.', mood: 'squint', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      drawBits(x, POP, { W: '#ffffff', R: RED }, 800, 830, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = Math.floor(clamp((lt - 0.3) / 1.3) * 14)
      L(x, 800, 1060, `WARNINGS READ: ${n} / 14`, pop01(t, P.t0 + 0.4, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: SG, cap: 'Game night? | Read the rules *aloud.*', mood: 'happy', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      bits(x, 'BOOK', 730, 960, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.08 })
      friend(x, t, 'gemini', 880, 900, 150, pop01(t, P.t0 + 0.4, 0.3, 2), { mood: 'sleepy', look: [-1, 0], seed: 41 })
      zzz(x, t, 930, 800)
      L(x, 800, 680, `PAGE ${Math.round(12 + clamp(lt / 2) * 19)} OF 40`, pop01(t, P.t0 + 0.6, 0.3, 2.2), LAV, -0.04, 34)
    } },
  { sign: SG, cap: 'Laid out every screw. | *Alphabetically.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.2) / 1.4) * 12)
      for (let i = 0; i < n; i++) { const c = i % 4, r = Math.floor(i / 4); drawBits(x, SCREW, { S: STEEL }, 700 + c * 66, 760 + r * 110, 9) ; x.fillStyle = BONE; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.fillText('ABCDEFGHIJKL'[i], 700 + c * 66, 760 + r * 110 + 46) }
      L(x, 800, 1110, 'A–L: ACCOUNTED FOR', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: SG, cap: 'Read the terms. | *Had questions.*', mood: lt => lt > 1.3 ? 'wide' : 'squint', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      sheet(x, 800, 860, k, { w: 300, h: 340, head: 'TERMS', headBg: STEEL, headInk: INK, lines: [] })
      if (k > 0.9) { x.save(); x.translate(800, 860); x.rotate(-0.04); x.fillStyle = STEEL; for (let i = 0; i < 9; i++) x.fillRect(-120, -60 + i * 24, i % 3 === 2 ? 160 : 240, 10); x.restore() }
      bubble(x, 800, 660, 'about §4.2…', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, col: GOLD, tail: 'bl' })
      L(x, 800, 1080, 'QUESTIONS: 17', pop01(t, P.t0 + 1.6, 0.3, 2.4), RED, 0.04, 34)
    } },
  { sign: SG, cap: 'Recipe says “a pinch.” | Virgo *measured it.*', mood: 'squint', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      bits(x, 'TWEEZ', 800, 780, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'BOWL', 800, 960, 14 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 800, 1110, 'ONE PINCH. EXACTLY.', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: SG, cap: 'Read your birth chart | like a *setup guide.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      sheet(x, 800, 840, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 360, h: 320, head: 'YOU: SETUP GUIDE', headBg: LAV, headInk: INK, align: 'left', lines: ['1. moon in cancer:', '   handle gently', '2. needs snacks', '3. charge nightly'], size: 26, progress: clamp((lt - 0.4) / 1.1) })
      L(x, 800, 1100, 'COMPATIBLE ✓', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, 0.04, 36)
    } },
  { sign: SG, cap: 'Lost the manual? | Virgo *wrote a better one.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 300, head: 'MANUAL v2', headBg: ACC, headInk: INK, align: 'left', lines: ['✓ diagrams', '✓ index', '✓ glossary', '✓ fewer typos'], size: 28, progress: clamp((lt - 0.4) / 1.0) })
      L(x, 800, 1070, 'WITH A FOREWORD', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 32)
      sparkles(x, t, 800, 830, P.t0 + 1.5, 7, 200, 0.6)
    } },
]

const F = makeFilm({
  id: 'r2t0605', key: 'F', accent: ACC, solo: SG, ending: 'lesson',
  title: 'Virgos reading | *the instructions.*',
  cameos: CAMEOS,
  group: { cap: 'Step one: | *read everything.*', mood: 'sparkle' },
  lesson: { text: 'Fine print? | Virgo’s *got you.*', chip: 'STATUS: SORTED' },
  last: { text: 'Hug a Virgo. | *As directed.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
