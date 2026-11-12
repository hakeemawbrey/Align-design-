// r2t0112: star_talk, BELIKE, "“Pick a number.” | Zodiacs be like." (~57 s vertical, signs3kit social cut, lofi · E)
// Twelve signs in zodiac order, each one's most extreme answer to "pick a number between one and ten".
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ answered before you finished · ♉ picked 8, like the pizza slices · ♊ 3, no 9, can it be both?
//              · ♋ picked your birthday · ♌ picked 1, always 1 · ♍ asked for the range and the rules
//              · ♎ asked every match to vote · ♏ guessed your number first · ♐ picked a million, why not
//              · ♑ wanted to know what it's for · ♒ picked pi, kept going · ♓ picked 7, it looked lonely
//  49.2        "Twelve signs. | *Zero tens.*"
//  52.4        LESSON UNLOCKED: "No wrong answers. | Just *yours.*"  NUMBER: PICKED
//  58.3        "The number was 7. | *Pisces won.*"  A big 7 pops over the group photo (Pisces still crying in it).
import { prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import { card, txt, phone, chat, RED, CREAM, ORANGE, SAGE, WOOD, PIZZA, PIZZA_C, CROWN, CROWN_C, HEARTBM, TISSUE, TISSUE_C } from './props.js'

const TEAL = '#5fd0ff'
// a big number on a tilted tile
function num(x, cx, cy, s, k, { bg = BONE, col = INK, size = 150, rot = 0.05, w } = {}) {
  card(x, cx, cy, w || Math.max(180, s.length * size * 0.62 + 50), size + 50, bg, { k, rot }, x => txt(x, s, 0, 6, size, col))
}

const CAMEOS = [
  { sign: 'aries', cap: 'Answered before | you *finished asking.*', mood: 'sparkle', star: { x: -170 }, hops: [0.3, 0.6],
    front(x, t, lt, P) {
      bubble(x, 800, 650, 'pick a num—', pop01(t, P.t0 + 0.15, 0.25, 2), { size: 36, col: LAV, tail: 'br' })
      num(x, 790, 900, '7!', pop01(t, P.t0 + 0.45, 0.3, 2.4), { bg: '#ff6b5a', col: CREAM, size: 170 })
      label(x, 790, 1110, 'TIME: 0.2 SEC', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Picked 8. | Like the *pizza slices.*', mood: lt => lt > 1.1 ? 'heart' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      card(x, 790, 920, 300, 300, WOOD, { k: pop01(t, P.t0 + 0.15, 0.3, 2), rot: 0.03 }, x => {
        for (let i = 0; i < 8; i++) { x.save(); x.rotate(i / 8 * Math.PI * 2); drawBits(x, PIZZA, PIZZA_C, 0, -62, 9, { rot: Math.PI }); x.restore() }
      })
      num(x, 790, 660, '8', pop01(t, P.t0 + 1.0, 0.3, 2.4), { bg: GOLD, size: 110, rot: -0.06 })
    } },
  { sign: 'gemini', cap: 'Picked 3. No, 9. | *Can it be both?*', mood: lt => lt > 1.5 ? 'wide' : 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const seq = ['3', '9', '3?', '12?']
      const i = Math.min(3, Math.floor(prog(lt, 0.3, 1.8) * 4))
      num(x, 790, 850, seq[i], pop01(t, P.t0 + 0.2 + i * 0.37, 0.25, 2.4), { bg: [GOLD, SKYB, PINK, MINT][i], size: 160, rot: i % 2 ? -0.06 : 0.06 })
      if (lt > 1.6) label(x, 790, 1110, 'FINAL ANSWER: YES', pop01(t, P.t0 + 2.0, 0.3, 2.4), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Picked your birthday. | *Obviously.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      card(x, 790, 860, 300, 300, CREAM, { k: pop01(t, P.t0 + 0.15, 0.3, 2), rot: 0.04 }, x => {
        x.fillStyle = RED; x.fillRect(-150, -150, 300, 70)
        txt(x, 'JUNE', 0, -114, 34, CREAM, { font: MONO, weight: 700 })
        txt(x, '14', 0, 20, 130, INK)
        drawBits(x, HEARTBM, { H: PINK, W: '#fff' }, 100, 90, 7)
      })
      hearts(x, t, 790, 760, P.t0 + 1.2, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 3 })
      label(x, 790, 1110, 'NOT 1 TO 10', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Picked 1. | *Always 1.*', mood: 'sparkle', star: { x: -180 }, hops: [1.1],
    front(x, t, lt, P) {
      num(x, 790, 880, '1', pop01(t, P.t0 + 0.2, 0.3, 2.4), { bg: GOLD, size: 200, rot: 0 })
      const d = ease.outCubic(prog(lt, 0.7, 1.1))
      if (lt > 0.65) drawBits(x, CROWN, CROWN_C, 790, lerp(560, 700, d), 14)
      sparkles(x, t, 790, 860, P.t0 + 1.0, 8, 180, 0.4)
      label(x, 790, 1110, 'NUMBER ONE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: ORANGE, rot: 0.04 })
    } },
  { sign: 'virgo', cap: 'Asked for the range. | *And the rules.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const n = Math.floor(prog(lt, 0.3, 1.6) * 5)
      card(x, 790, 850, 340, 380, CREAM, { k: pop01(t, P.t0 + 0.15, 0.3, 2), rot: 0.03 }, x => {
        txt(x, 'QUESTIONS', 0, -150, 28, RED, { font: MONO, weight: 700 })
        ;['1. whole?', '2. range?', '3. inclusive?', '4. decimals?', '5. why?'].slice(0, n).forEach((s, i) => txt(x, s, -140, -90 + i * 56, 28, INK, { font: MONO, weight: 700, align: 'left' }))
      })
    } },
  { sign: 'libra', cap: 'Asked every match | *to vote.*', mood: lt => lt > 1.4 ? 'wide' : 'happy', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 850, pop01(t, P.t0 + 0.15, 0.3, 2), (x, w, h) => {
        txt(x, 'POLL: MY NUMBER', 0, -h / 2 + 34, 20, LAV, { font: MONO, weight: 700 })
        const g = prog(lt, 0.4, 1.6)
        ;[[4, 0.7], [7, 0.75], [2, 0.72]].forEach(([n, v], i) => {
          const y = -h / 2 + 100 + i * 80
          txt(x, String(n), -w / 2 + 26, y, 30, BONE)
          x.fillStyle = [PINK, MINT, GOLD][i]; x.fillRect(-w / 2 + 50, y - 16, (w - 80) * v * g, 32)
        })
        if (lt > 1.6) txt(x, 'IT’S A TIE', 0, h / 2 - 50, 26, PINK, { font: MONO, weight: 700 })
      })
    } },
  { sign: 'scorpio', cap: 'Guessed *your* number | before you did.', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'you were | thinking 4.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      num(x, 790, 950, '4', pop01(t, P.t0 + 1.2, 0.3, 2.4), { bg: '#b0386b', col: CREAM, size: 150, rot: -0.05 })
      label(x, 790, 1130, '…how?', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: BONE, rot: 0.04 })
    } },
  { sign: 'sagittarius', cap: 'Picked a million. | *Why not?*', mood: 'sparkle', star: { x: -180 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      num(x, 790, 860, '1,000,000', pop01(t, P.t0 + 0.3, 0.3, 2.2), { bg: LAV, size: 64, rot: 0.06, w: 380 })
      label(x, 790, 1060, 'RULES: SUGGESTIONS', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 0.6, 8, 200, 0.2)
    } },
  { sign: 'capricorn', cap: 'Wanted to know | what *it’s for.*', mood: 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'is this | for the budget?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 790, 960, 'NUMBER: PENDING', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: SAGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Picked *pi.* | Kept going.', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const D = '3.14159265358979323846'
      const n = Math.min(D.length, 4 + Math.floor(prog(lt, 0.4, 2.2) * (D.length - 4)))
      card(x, 790, 850, 360, 340, '#1c4a5c', { k: pop01(t, P.t0 + 0.15, 0.3, 2), rot: -0.03 }, x => {
        txt(x, 'π', 0, -80, 150, TEAL)
        const s = D.slice(0, n)
        txt(x, s.slice(0, 11), 0, 70, 34, CREAM, { font: MONO, weight: 700 })
        if (s.length > 11) txt(x, s.slice(11), 0, 116, 34, CREAM, { font: MONO, weight: 700 })
      })
      label(x, 790, 1100, 'STILL GOING', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: TEAL, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Picked 7. | It looked *lonely.*', mood: 'heart', tears: lt => lt > 0.9 ? 3 : 2, star: { x: -170 },
    front(x, t, lt, P) {
      num(x, 790, 860, '7', pop01(t, P.t0 + 0.2, 0.3, 2.4), { bg: SKYB, size: 170, rot: -0.04 })
      hearts(x, t, 790, 760, P.t0 + 1.0, { n: 5, life: 1.7, spread: 180, cell: 7, seed: 6 })
      drawBits(x, TISSUE, TISSUE_C, 790, 1090, 12 * pop01(t, P.t0 + 1.3, 0.3, 2.2))
    } },
]

const F = makeFilm({
  id: 'r2t0112', key: 'E', accent: PINK, ending: 'lesson',
  title: '“Pick a number.” | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *Zero tens.*', moods: ['sparkle', 'heart', 'wide', 'heart', 'sparkle', 'squint', 'happy', 'squint', 'sparkle', 'neutral', 'wink', 'heart'] },
  lesson: { text: 'No wrong answers. | Just *yours.*', chip: 'NUMBER: PICKED' },
  last: {
    text: 'The number was 7. | *Pisces won.*',
    draw(x, t, lt) {
      num(x, 540, 735, '7', pop01(t, t - lt + 0.9, 0.35, 2.2), { bg: SKYB, size: 110, rot: 0.06 })
      sparkles(x, t, 540, 735, t - lt + 1.2, 8, 160, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
