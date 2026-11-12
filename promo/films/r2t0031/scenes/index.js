// r2t0031: star_talk ROLLCALL, "The signs | at a puppet show." (~57 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs in zodiac order at a puppet show, each the most extreme version of itself:
//   ♈ argued with a sock, lost · ♉ comfiest seat in the house: napped · ♊ did both voices, better · ♋ the puppet looked sad: adopted it
//   · ♌ signed autographs at intermission · ♍ saw the strings, can't unsee it · ♎ matched with the puppet
//   · ♏ checked the puppet's birth chart · ♐ joined the show uninvited · ♑ asked the puppet about its pension
//   · ♒ rooted for the villain · ♓ the puppet waved goodbye, still not over it
//  49.2   "Nobody watched | *the actual show.*"  group photo
//  52.6   CALLBACK: "Aries vs. the sock: | *the rematch.*"  Aries squares up to the sock puppet again
import { prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'

const RED = '#d8344f', CRIMSON = '#a3203a', WOOD = '#8a4a2e'
// ── props
const SOCK = [
  '..SSSSSS..',
  '.SSSSSSSS.',
  'SSWKSSWKSS',
  'SSWWSSWWSS',
  'SSSSSSSSSS',
  'RRRRRRRRRR',
  'SRRRRRRRRS',
  'SSSSSSSSSS',
  '.SSSSSSSS.',
  '.SSSSSSSS.',
  '.SSSSSSSS.',
  '.TTTTTTTT.',
  '.SSSSSSSS.',
  '.TTTTTTTT.',
]
const SOCK_C = { S: '#7fb7ff', W: '#ffffff', K: INK, R: '#c0304a', T: BONE }
const VILLAIN_C = { S: '#8a5bd6', W: '#ffffff', K: INK, R: '#2a1450', T: '#3b2a70' }
const STACHE = ['MM....MM', 'MMMMMMMM', '.MM..MM.']
const POPCORN = [
  '.Y.YY.Y.YY.',
  'YYYYYYYYYYY',
  '.YYYYYYYYY.',
  'RWRWRWRWRWR',
  '.RWRWRWRWR.',
  '.RWRWRWRWR.',
  '..RWRWRWR..',
  '..RWRWRWR..',
]
const POPCORN_C = { Y: '#fff1b0', R: RED, W: '#fff4e2' }
const CUSHION = ['.CCCCCCCCCCCC.', 'CCCCCCCCCCCCCC', 'CCWCCCCCCCCWCC', 'CCCCCCCCCCCCCC', '.CCCCCCCCCCCC.']
const CUSHION_C = { C: CRIMSON, W: GOLD }
const BLANKET = ['PPPPPPPPPP', 'PWPPWPPWPP', 'PPPPPPPPPP', 'PPWPPWPPWP', 'PPPPPPPPPP']

/** a little puppet theatre: wooden frame, red curtains open by `open` (0…1) */
function theatre(x, cx, cy, k, open = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -190, 340, 380)
  x.fillStyle = WOOD; x.fillRect(-162, -182, 324, 364)
  x.fillStyle = '#1d1440'; x.fillRect(-130, -140, 260, 210)
  const cw = lerp(130, 40, open)
  x.fillStyle = CRIMSON; x.fillRect(-130, -140, cw, 210); x.fillRect(130 - cw, -140, cw, 210)
  x.fillStyle = RED; for (let i = 0; i < 3; i++) { x.fillRect(-130 + i * cw / 3, -140, 8, 210); x.fillRect(130 - cw + i * cw / 3, -140, 8, 210) }
  x.fillStyle = GOLD; x.fillRect(-150, -170, 300, 22)
  x.restore()
}
function chartWheel(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  const cols = ['#ff6b5a', '#9fd8a8', GOLD, SKYB, '#ffb34a', MINT, PINK, LAV, '#ff9a4a', '#9aa5c4', '#8fe3ff', '#b7a6ff']
  for (let i = 0; i < 12; i++) { x.fillStyle = cols[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, i / 12 * Math.PI * 2, (i + 1) / 12 * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.55, 0, Math.PI * 2); x.fill()
  x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.moveTo(-r * 0.4, -r * 0.2); x.lineTo(r * 0.35, r * 0.3); x.moveTo(-r * 0.2, r * 0.38); x.lineTo(r * 0.3, -r * 0.35); x.stroke()
  x.restore()
}
/** a marionette: a cross bar with strings down to a little sock body */
function marionette(x, t, cx, cy, k, glow) {
  if (k <= 0.01) return
  const sw = Math.sin(t * 2.4) * 10
  x.save(); x.globalAlpha *= Math.min(1, k)
  x.fillStyle = INK; x.fillRect(cx - 104 + sw, cy - 260, 208, 22); x.fillStyle = WOOD; x.fillRect(cx - 98 + sw, cy - 255, 196, 12)
  x.strokeStyle = glow ? GOLD : 'rgba(239,230,214,0.85)'; x.lineWidth = glow ? 6 : 3
  x.beginPath(); for (const d of [-80, 0, 80]) { x.moveTo(cx + d + sw, cy - 242); x.lineTo(cx + d * 0.5, cy - 60) } x.stroke()
  x.restore()
  drawBits(x, SOCK, SOCK_C, cx, cy + 20, 14 * k, { rot: sw * 0.004 })
}

const ST = { x: -170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Argued with a sock. | *Lost.*', mood: lt => lt > 1.4 ? 'wide' : 'squint', look: [1, 0], star: ST, hops: [0.5, 0.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, SOCK, SOCK_C, 800, 820, 24 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: Math.sin(t * 4) * 0.06 })
      bubble(x, 420, 610, 'FIGHT ME', pop01(t, P.t0 + 0.4, 0.25, 2.4), { size: 46, col: '#ff6b5a', tail: 'bc' })
      bubble(x, 800, 570, 'no u.', pop01(t, P.t0 + 1.3, 0.25, 2.4), { size: 52, tail: 'bc' })
    } },
  { sign: 'taurus', cap: 'Comfiest seat in the house. | *Napped.*', mood: 'sleepy', look: [1, 0], star: { x: -150, y: 40 },
    back(x, t, lt, P) { drawBits(x, CUSHION, CUSHION_C, 390, 1010, 30 * pop01(t, P.t0 + 0.05, 0.3, 1.8)) },
    front(x, t, lt, P) {
      theatre(x, 790, 780, 0.75 * pop01(t, P.t0 + 0.15, 0.3, 2), 1)
      bubble(x, 560, 600, 'zzz', pop01(t, P.t0 + 0.9, 0.25, 2.4), { size: 50, col: LAV, tail: 'bl' })
      label(x, 790, 1130, '5 STARS: THE SEAT', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Did both voices. | *Better than the puppets.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: 0, y: 40 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, SOCK, SOCK_C, 260, 860, 16 * k, { rot: -0.15 + Math.sin(t * 5) * 0.05 })
      drawBits(x, SOCK, { ...SOCK_C, S: PINK }, 820, 860, 16 * k, { rot: 0.15 + Math.sin(t * 5 + 2) * 0.05 })
      const n = Math.floor(lt * 2.5) % 2
      bubble(x, n ? 780 : 300, 620, n ? 'hi!' : 'hello!', pop01(t, P.t0 + 0.4, 0.25, 2.4), { size: 46, tail: 'bc' })
      label(x, 540, 1160, 'ENCORE?', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 40, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'The puppet looked sad. | *Adopted it.*', mood: lt => lt > 1.1 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const wrap = ease.outCubic(prog(lt, 0.8, 1.2))
      drawBits(x, SOCK, SOCK_C, 790, 800, 20 * pop01(t, P.t0 + 0.15, 0.3, 2))
      if (wrap > 0.01) drawBits(x, BLANKET, { P: LAV, W: BONE }, 790, 930, 24 * wrap)
      hearts(x, t, 790, 700, P.t0 + 1.2, { n: 5, life: 1.8, spread: 180, cell: 7, seed: 3 })
      label(x, 790, 1130, 'MINE NOW', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: PINK, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Signed autographs | *at intermission.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) {
        const k = pop01(t, P.t0 + 0.3 + i * 0.35, 0.3, 2.2)
        if (k <= 0.01) continue
        x.save(); x.translate(790 + (i - 1) * 40, 700 + i * 150); x.rotate(-0.08 + i * 0.08); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-125, -55, 250, 110); x.fillStyle = BONE; x.fillRect(-118, -48, 236, 96)
        x.strokeStyle = '#ff9a4a'; x.lineWidth = 6; x.beginPath(); x.moveTo(-90, 10)
        for (let j = 0; j < 8; j++) x.quadraticCurveTo(-80 + j * 22, -30 + (j % 2) * 50, -70 + j * 22, 8)
        x.stroke(); x.restore()
      }
      sparkles(x, t, 790, 860, P.t0 + 1.5, 8, 190, 0.2)
      label(x, 450, 600, 'NO PHOTOS. OK, ONE.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: GOLD, font: MONO, weight: 700, rot: -0.06 })
    } },
  { sign: 'virgo', cap: 'Saw the strings. | *Can’t unsee it.*', mood: lt => lt > 1.0 ? 'squint' : 'happy', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      marionette(x, t, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), lt > 1.0)
      label(x, 790, 1130, 'STRINGS: VISIBLE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: MINT, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Matched with | *the puppet.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SOCK, SOCK_C, 800, 880, 18 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: 0.05 })
      label(x, 790, 610, '✦ IT’S A MATCH ✦', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 38, bg: PINK, font: MONO, weight: 700 })
      hearts(x, t, 620, 820, P.t0 + 1.2, { n: 6, life: 1.8, spread: 260, cell: 7, seed: 6 })
    } },
  { sign: 'scorpio', cap: 'Checked the puppet’s | *birth chart.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chartWheel(x, 790, 790, 140, pop01(t, P.t0 + 0.15, 0.3, 2), t)
      bubble(x, 790, 1070, 'Gemini rising. | knew it.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Joined the show. | *Wasn’t invited.*', mood: 'sparkle', star: { x: 0, y: -40, s: 230 }, hops: [0.5, 1.1, 1.7],
    back(x, t, lt, P) { theatre(x, 540, 900, 1.3 * pop01(t, P.t0 + 0.05, 0.3, 1.8), 1) },
    front(x, t, lt, P) {
      drawBits(x, SOCK, SOCK_C, 330, 900, 11 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 })
      bubble(x, 300, 680, '???', pop01(t, P.t0 + 1.0, 0.25, 2.4), { size: 44, tail: 'bc' })
      label(x, 540, 1180, 'UNSCRIPTED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: '#ff9a4a', font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Asked the puppet | about *its pension.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SOCK, SOCK_C, 800, 880, 18 * pop01(t, P.t0 + 0.15, 0.3, 2))
      bubble(x, 430, 600, 'retirement plan?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 820, 650, '…', pop01(t, P.t0 + 1.4, 0.25, 2.4), { size: 52, tail: 'bc' })
    } },
  { sign: 'aquarius', cap: 'Rooted for | *the villain.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, SOCK, VILLAIN_C, 800, 870, 20 * k)
      drawBits(x, STACHE, { M: INK }, 800, 880, 12 * k)
      bubble(x, 800, 600, 'misunderstood.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bc' })
    } },
  { sign: 'pisces', cap: 'The puppet waved bye. | *Still not over it.*', mood: 'wide', tears: lt => lt < 1.0 ? 2 : 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, SOCK, SOCK_C, 800, 860, 18 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: Math.sin(t * 6) * 0.15 })
      bubble(x, 820, 620, 'bye bye!', pop01(t, P.t0 + 0.4, 0.25, 2.4), { size: 44, tail: 'bc' })
      label(x, 790, 1130, 'TISSUES: ALL', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: SKYB, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0031', key: 'C', accent: PINK, ending: 'callback',
  title: 'The signs | *at a puppet show.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody watched | *the actual show.*' },
  last: {
    text: 'Aries vs. the sock: | *the rematch.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'aries', 360, 1060, 260 * k, { mood: lt > 1.6 ? 'wide' : 'squint', look: [1, 0], seed: 40, hops: [t - lt + 1.0, t - lt + 1.4] })
      drawBits(x, SOCK, SOCK_C, 740, 1050, 20 * pop01(t, t - lt + 0.7, 0.35, 2), { rot: Math.sin(t * 4) * 0.06 })
      label(x, 540, 1300, 'ROUND 2', pop01(t, t - lt + 1.1, 0.3, 2.4), { size: 44, bg: GOLD, font: MONO, weight: 700 })
      bubble(x, 760, 840, 'no u.', pop01(t, t - lt + 2.0, 0.25, 2.4), { size: 48, tail: 'bc' })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
