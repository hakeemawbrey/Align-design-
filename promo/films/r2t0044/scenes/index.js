// r2t0044: star_talk, ROLLCALL, "The signs at | the office party." (~62 s vertical, signs3kit social cut, music: lofi · D)
//   0.0–3.6    "The signs at | the *office party.*"  The twelve line up, then dive into the pips.
//   3.6–49.2   one office party per sign, pushed to the extreme:
//              ♈ won the limbo, against the boss · ♉ guarded the buffet, personally · ♊ talked to everyone, twice
//              · ♋ made a card for every desk · ♌ employee of the month: made the award · ♍ fixed the slideshow font
//              · ♎ played matchmaker for accounting · ♏ secret gift swap: knew every pair · ♐ started a conga line,
//              out the door · ♑ networked with the boss's boss · ♒ came in costume, wrong party
//              · ♓ cried at a goodbye card, wrong department
//  49.2        "Best party. | *Nobody left.*"
//  52.4        LESSON: "Work friends | are *real friends.*"  TEAM: BONDED
//  58.3        "Taurus is still | *on guard.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', WOOD = '#c98f2a'

const PLATE = ['..WWWWWWWWW..', 'WWWWWWWWWWWWW', '..WWWWWWWWW..']
const FOOD = [
  '..PP..YY..GG.',
  '.PPPPYYYYGGGG',
  '.PPPPYYYYGGGG',
]
const FOOD_C = { P: '#ff8fb1', Y: GOLD, G: '#5fd068' }
const CARDS = ['KKKKKKKKKK', 'KPPPPPPPPK', 'KPPHPPHPPK', 'KPPHHHHPPK', 'KPPPHHPPPK', 'KPPPPPPPPK', 'KKKKKKKKKK']
const CARDS_C = { K: INK, P: CREAM, H: '#ff4f86' }
const GIFT = ['...R.R...', '....R....', 'GGGGRGGGG', 'GGGGRGGGG', 'RRRRRRRRR', 'GGGGRGGGG', 'GGGGRGGGG', 'GGGGRGGGG']
const GIFT_C = { G: '#5fd068', R: RED }
const ANTENNA = ['G.....G', '.G...G.', '..G.G..', 'GG...GG', 'GG...GG']

function nameTag(x, cx, cy, k, line, rot = 0.05) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-136, -76, 272, 152)
  x.fillStyle = RED; x.fillRect(-128, -68, 256, 56); x.fillStyle = CREAM; x.fillRect(-128, -12, 256, 80)
  x.fillStyle = CREAM; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('HELLO, I’M', 0, -40)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.fillText(line, 0, 28)
  x.restore()
}
function plaque(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-140, -170, 280, 340); x.fillStyle = WOOD; x.fillRect(-132, -162, 264, 324)
  x.fillStyle = GOLD; x.fillRect(-110, -140, 220, 280)
  x.fillStyle = INK; x.font = `800 22px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('EMPLOYEE', 0, -110); x.fillText('OF THE MONTH', 0, -82)
  x.restore()
  signChar(x, t, 'leo', cx, cy + 30 * k, 150 * k, { mood: 'sparkle', seed: 31, glyph: false, pop: k })
}
function slide(x, cx, cy, k, fixed) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -120, 340, 240); x.fillStyle = '#fff'; x.fillRect(-160, -110, 320, 200)
  x.fillStyle = INK; x.fillRect(-8, 90, 16, 80)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (fixed) { x.fillStyle = '#2a2350'; x.font = `800 40px ${INTER}`; x.fillText('Q3 Party', 0, -30); x.fillStyle = '#6b62a8'; x.font = `600 24px ${INTER}`; x.fillText('snacks · games · fun', 0, 30) }
  else { x.fillStyle = '#ff00cc'; x.font = `italic 400 44px 'Comic Neue', cursive`; x.fillText('Q3 PaRtY!!', 0, -30); x.fillStyle = '#00cc44'; x.font = `italic 400 30px cursive`; x.fillText('~~fun~~', 0, 30) }
  x.restore()
}
function bizCards(x, cx, cy, k, lt) {
  for (let i = 0; i < 5; i++) {
    const kk = k * pop01(lt, 0.3 + i * 0.12, 0.25, 2)
    if (kk <= 0.01) continue
    x.save(); x.translate(cx - 80 + i * 40, cy + Math.abs(i - 2) * 14); x.rotate((i - 2) * 0.18); x.scale(kk, kk)
    x.fillStyle = INK; x.fillRect(-74, -46, 148, 92); x.fillStyle = CREAM; x.fillRect(-68, -40, 136, 80)
    x.fillStyle = '#2fc79a'; x.fillRect(-56, -26, 40, 40); x.fillStyle = '#b9b0a0'; x.fillRect(-6, -20, 60, 10); x.fillRect(-6, 0, 48, 8)
    x.restore()
  }
}

const CAMEOS = [
  { sign: 'aries', cap: 'Won the limbo. | *Against the boss.*', mood: 'sparkle', star: { x: -150, y: 50, s: 270 }, squash: lt => lt > 0.5 && lt < 1.5 ? 0.25 : 0, hops: [1.6],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.globalAlpha *= k
      x.fillStyle = INK; x.fillRect(196, 760, 22, 440); x.fillRect(582, 760, 22, 440)
      x.fillStyle = GOLD; x.fillRect(200, 764, 14, 432); x.fillRect(586, 764, 14, 432)
      x.fillStyle = INK; x.fillRect(196, 830, 408, 22); x.fillStyle = RED; x.fillRect(200, 834, 400, 14)
      x.restore()
    },
    front(x, t, lt, P) {
      label(x, 790, 760, 'BOSS: OUT', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 36, bg: GOLD, rot: 0.05 })
      label(x, 790, 900, 'ARIES: CHAMPION', pop01(t, P.t0 + 1.5, 0.3, 2), { size: 30, bg: '#ff6b5a', rot: -0.04 })
    } },
  { sign: 'taurus', cap: 'Guarded the buffet. | *Personally.*', mood: lt => lt > 1.2 ? 'squint' : 'happy', look: [1, 0], star: { x: -190 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, PLATE, { W: CREAM }, 790, 1060, 22 * k); drawBits(x, FOOD, FOOD_C, 790, 1020, 22 * k)
    },
    front(x, t, lt, P) {
      label(x, 790, 760, 'SECURITY', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 40, bg: INK, color: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 900, 'one each.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Talked to everyone. | *Twice.*', mood: 'wink', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      nameTag(x, 780, 760, pop01(t, P.t0 + 0.2, 0.3, 2), 'A GEMINI!', 0.05)
      nameTag(x, 800, 1000, pop01(t, P.t0 + 1.1, 0.3, 2), 'ALSO GEMINI', -0.05)
    } },
  { sign: 'cancer', cap: 'Made a card | *for every desk.*', mood: 'heart', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) drawBits(x, CARDS, CARDS_C, 720 + (i % 3) * 80, 1040 - Math.floor(i / 3) * 110 - i * 14, 13 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2), { rot: Math.sin(i * 2) * 0.2 })
      label(x, 790, 720, 'DESKS: 64', pop01(t, P.t0 + 1.2, 0.3, 2), { size: 36, bg: PINK, rot: 0.04 })
      hearts(x, t, 790, 900, P.t0 + 1.4, { n: 4, life: 1.4, spread: 160, cell: 6, seed: 2 })
    } },
  { sign: 'leo', cap: 'Employee of the month. | *Made the award.*', mood: 'sparkle', star: { x: -190 }, hops: [1.0],
    front(x, t, lt, P) {
      plaque(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      label(x, 790, 1110, 'HANDMADE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: '#ffb34a', rot: 0.04 })
    } },
  { sign: 'virgo', cap: 'Fixed the | *slideshow font.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      slide(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 1.1)
      label(x, 790, 1080, lt > 1.1 ? 'FONT: FIXED' : 'FONT: CRIME', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 34, bg: lt > 1.1 ? MINT : '#ff6b5a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Played matchmaker | *for accounting.*', mood: 'heart', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), j = ease.inOutCubic(prog(lt, 0.8, 1.4))
      if (k > 0.01) {
        signChar(x, t, 'virgo', lerp(660, 720, j), 980, 150 * k, { mood: j > 0.9 ? 'heart' : 'neutral', look: [1, 0], seed: 32, glyph: false })
        signChar(x, t, 'capricorn', lerp(920, 860, j), 980, 150 * k, { mood: j > 0.9 ? 'heart' : 'neutral', look: [-1, 0], seed: 33, glyph: false })
      }
      label(x, 790, 1120, 'ACCOUNTING', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 30, bg: CREAM, rot: 0.03, font: MONO, weight: 700 })
      label(x, 790, 720, '✦ IT’S A MATCH', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04 })
      hearts(x, t, 790, 900, P.t0 + 1.6, { n: 5, life: 1.5, spread: 140, cell: 6, seed: 3 })
    } },
  { sign: 'scorpio', cap: 'Secret gift swap? | Knew *every pair.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, GIFT, GIFT_C, 790, 1000, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 720, 'you got | Gemini.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      label(x, 790, 1150, 'SECRET: NOT', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: RED, color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Started a conga line. | *Out the door.*', mood: 'sparkle', star: { x: 60, s: 220 }, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P, F) {
      ;['leo', 'gemini', 'aries'].forEach((id, i) => {
        const k = pop01(t, P.t0 + 0.3 + i * 0.2, 0.35, 2)
        if (k > 0.01) signChar(x, t, id, 430 - i * 105, 990 + Math.sin(t * 8 + i) * 10, 130 * k, { mood: 'happy', look: [1, 0], seed: 34 + i, glyph: false })
      })
      label(x, 830, 680, 'EXIT →', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 40, bg: '#2fc79a', rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 840, 1080, 'to the | parking lot!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Networked | with *the boss’s boss.*', mood: 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      bizCards(x, 790, 960, 1, lt)
      bubble(x, 790, 720, 'let’s | circle back', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'aquarius', cap: 'Came in costume. | *Wrong party.*', mood: lt => lt > 1.4 ? 'wide' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      drawBits(x, ANTENNA, { G: '#7dffb0' }, F.x, F.top - 40, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 760, 'DRESS CODE: SMART', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 30, bg: CREAM, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 920, 'nailed it', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Cried at a goodbye card. | *Wrong department.*', mood: 'wide', tears: lt => lt < 0.9 ? 2 : 3, look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CARDS, CARDS_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      label(x, 790, 700, 'BYE, DAVE!', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 36, bg: GOLD, rot: -0.04 })
      bubble(x, 790, 1100, 'who’s Dave?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0044', key: 'D', accent: '#ffd23a', ending: 'lesson',
  title: 'The signs at | the *office party.*',
  cameos: CAMEOS,
  group: { cap: 'Best party. | *Nobody left.*' },
  lesson: { text: 'Work friends | are *real friends.*', chip: 'TEAM: BONDED' },
  last: {
    text: 'Taurus is still | *on guard.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.7, 0.35, 2)
      drawBits(x, PLATE, { W: CREAM }, 540, 1600, 20 * k); drawBits(x, FOOD, FOOD_C, 540, 1564, 20 * k)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
