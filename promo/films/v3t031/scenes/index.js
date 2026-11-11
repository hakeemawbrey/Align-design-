// v3t031: THE SIGNS AS… v3, "Sick zodiacs | be like." (~59 s vertical, signs3kit social cut, music: lofi · C)
//   0.0–3.6    the hook, the twelve line up, then dive into the pip row.
//   3.6–49.2   one sick day per sign (3.8 s each), each pushed to the extreme:
//              ♈ fever, ran a marathon · ♉ ordered the whole menu · ♊ lost their voice, kept talking
//              · ♋ sick, made soup for everyone · ♍ labelled every tissue · ♌ sneezed, held a press conference
//              · ♎ week two, still picking a soup · ♏ denies it under oath · ♐ told to rest, booked a hike
//              · ♑ three meetings from bed · ♒ built a soup machine · ♓ slight cold, goodbye letters
//  49.2        group: "Nobody *rested.*"
//  52.4        LESSON UNLOCKED: "Rest isn’t lazy. | *Get well soon.*"  STATUS: RESTING
//  58.3        last line: "Cancer’s soup | *fixed everyone.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e', CREAM = '#fff4e2'

const THERMO = [
  '..WWW..',
  '.WRRRW.',
  '.WRRRW.',
  '.WRRRW.',
  '.WRRRW.',
  '.WRRRW.',
  '.WRRRW.',
  'WRRRRRW',
  'WRRRRRW',
  '.WRRRW.',
]
const POT = [
  '...s.....s...',
  '..s.....s....',
  '...s.....s...',
  'KKKKKKKKKKKKK',
  '.PPPPPPPPPPP.',
  'PPpPPPPPPPpPP',
  '.PPPPPPPPPPP.',
  '.PPPPPPPPPPP.',
  '..PPPPPPPPP..',
]
const POT_C = { s: 'rgba(239,230,214,0.7)', K: '#5a5a7a', P: '#c4c8e0', p: '#8a8fb0' }
const TISSUE = [
  '....WWW.....',
  '...WWWWW....',
  'BBBBBBBBBBBB',
  'BbbbbbbbbbbB',
  'BbbbbbbbbbbB',
  'BbbbbbbbbbbB',
  'BBBBBBBBBBBB',
]
const BOWL = [
  'YYYYYYYYYYY',
  'WWWWWWWWWWW',
  '.WWWWWWWWW.',
  '..WWWWWWW..',
  '...WWWWW...',
]
const LAPTOP = [
  '.SSSSSSSSSSSSSS.',
  '.SBBBBBBBBBBBBS.',
  '.SBGGBBGGBBGGBS.',
  '.SBGGBBGGBBGGBS.',
  '.SBBBBBBBBBBBBS.',
  '.SBGGBBGGBBGGBS.',
  '.SBGGBBGGBBGGBS.',
  '.SSSSSSSSSSSSSS.',
  'KKKKKKKKKKKKKKKK',
]
const LAPTOP_C = { S: '#9aa5c4', B: '#2a2350', G: MINT, K: '#5a5a7a' }
const PACK = [
  '...BBBB...',
  '..B....B..',
  '.GGGGGGGG.',
  'GGGGGGGGGG',
  'GGYYYYYYGG',
  'GGYGGGGYGG',
  'GGYYYYYYGG',
  'GGGGGGGGGG',
  'GGGGGGGGGG',
  '.GGGGGGGG.',
]
const PACK_C = { B: BROWN, G: '#5fa060', Y: GOLD }
const LETTER = [
  'WWWWWWWWW',
  'WWWWHWWWW',
  'WWWHHHWWW',
  'WWHHHHHWW',
  'WWWWWWWWW',
]

// Aquarius' soup machine: a box with a dial, a pipe and a bowl rolling out
function machine(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-126, -146, 252, 252)
  x.fillStyle = '#6fc3ff'; x.fillRect(-118, -138, 236, 236)
  x.fillStyle = INK; x.fillRect(-90, -110, 80, 80); x.fillStyle = GOLD; x.fillRect(-82, -102, 64, 64)
  const a = t * 6; x.fillStyle = INK; x.fillRect(-50 + Math.cos(a) * 22 - 6, -70 + Math.sin(a) * 22 - 6, 12, 12)
  for (let i = 0; i < 3; i++) { x.fillStyle = INK; x.fillRect(20, -104 + i * 30, 76, 18); x.fillStyle = [RED, MINT, PINK][i]; x.fillRect(24, -100 + i * 30, Math.floor(10 + 60 * (0.5 + 0.5 * Math.sin(t * 5 + i))), 10) }
  x.fillStyle = INK; x.fillRect(-60, 0, 120, 70); x.fillStyle = '#2a2350'; x.fillRect(-52, 8, 104, 54)
  x.fillStyle = INK; x.fillRect(-14, -186, 28, 44); x.fillStyle = '#9aa5c4'; x.fillRect(-8, -180, 16, 38)
  x.restore()
  const roll = clamp((lt - 0.9) / 0.6)
  if (roll > 0) drawBits(x, BOWL, { Y: ORANGE, W: CREAM }, cx + lerp(0, 0, roll), cy + 30 * k + roll * 150, 12 * k)
}

const CAMEOS = [
  { sign: 'aries', cap: 'Has a fever. | Ran *a marathon.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', star: { x: -170 }, hops: [0.3, 0.6, 0.9, 1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, THERMO, { W: CREAM, R: RED }, 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.15 })
      label(x, 800, 640, 'FINISH LINE ✦', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 38, bg: GOLD, rot: -0.05 })
      label(x, 800, 1090, 'TEMP: HIGH', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: RED, color: CREAM, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Lost their appetite. | Ordered *the menu.*', mood: lt => lt > 1.3 ? 'heart' : 'sleepy', star: { x: -170 },
    front(x, t, lt, P) {
      const L = ['soup', '+ fries', '+ pasta', '+ cake', '+ more cake']
      const n = Math.min(5, 1 + Math.floor(lt / 0.4))
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.scale(k, k); x.rotate(0.04)
        x.fillStyle = INK; x.fillRect(-150, -230, 300, 440); x.fillStyle = CREAM; x.fillRect(-142, -222, 284, 424)
        x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('ORDER', 0, -180)
        x.font = `800 36px ${INTER}`
        for (let i = 0; i < n; i++) { x.fillStyle = i === 0 ? '#5a5a7a' : RED; x.fillText(L[i], 0, -110 + i * 66) }
        x.restore()
      }
    } },
  { sign: 'gemini', cap: 'Lost their voice. | *Kept talking.*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.8) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const W = ['*squeak*', 'and so—', '*wheeze*', 'ANYWAY—', '*croak*']
      bubble(x, 790, 680, W[Math.min(4, Math.floor(lt / 0.45))], pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 1040, 'VOICE: 0%', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'They’re the sick one. | Made *everyone* soup.', mood: lt => lt > 1.2 ? 'heart' : 'sleepy', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, POT, POT_C, 800, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 1100, 'SOUP FOR 12', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      hearts(x, t, 800, 760, P.t0 + 1.4, { n: 4, life: 1.4, spread: 160, cell: 6, seed: 2 })
    } },
  { sign: 'leo', cap: 'Sneezed once. | Held *a press conference.*', mood: lt => lt > 0.8 ? 'sparkle' : 'wide', star: { x: -170 }, hops: [0.8],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      for (let i = 0; i < 3; i++) {
        const mx = 690 + i * 110, my = 860 - (i === 1 ? 40 : 0)
        x.save(); x.globalAlpha = clamp(k); x.fillStyle = INK; x.fillRect(mx - 34, my - 70, 68, 96); x.fillStyle = ['#ff6b5a', '#6fc3ff', GOLD][i]; x.fillRect(mx - 26, my - 62, 52, 80)
        x.fillStyle = INK; x.fillRect(mx - 7, my + 26, 14, 200); x.restore()
      }
      label(x, 780, 640, 'LIVE ● BREAKING', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 40, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 380, 600, 'no questions', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 42, tail: 'bc' })
    } },
  { sign: 'virgo', cap: 'Bedridden. | Labelled *every tissue.*', mood: lt => lt > 1.4 ? 'squint' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, TISSUE, { W: CREAM, B: INK, b: MINT }, 800, 1020, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const D = ['MON', 'TUE', 'WED']
      for (let i = 0; i < 3; i++) label(x, 670 + i * 130, 760 - (i % 2) * 50, D[i], pop01(t, P.t0 + 0.7 + i * 0.3, 0.3, 2.4), { size: 44, bg: CREAM, rot: (i - 1) * 0.08, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Sick for a week. | Still *picking a soup.*', mood: lt => Math.floor(lt * 2) % 2 ? 'squint' : 'neutral', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: { y: -60 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, BOWL, { Y: ORANGE, W: CREAM }, 300, 1060, 18 * k)
      drawBits(x, BOWL, { Y: MINT, W: CREAM }, 780, 1060, 18 * k)
      label(x, 300, 1160, 'TOMATO?', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 32, bg: ORANGE, rot: -0.05, font: MONO, weight: 700 })
      label(x, 780, 1160, 'PEA?', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
      label(x, 540, 560, 'DAY 7', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Clearly sick. | Denies it *under oath.*', mood: lt => lt > 1.0 ? 'squint' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      if (lt > 0.4 && lt < 0.9) sparkles(x, t, 470, 820, P.t0 + 0.4 * 1.29, 5, 90, 0.4, [BONE, SKYB])
      bubble(x, 800, 690, '*achoo*', pop01(t, P.t0 + 0.5, 0.25, 2.2) * (lt < 1.1 ? 1 : 0), { size: 40, col: SKYB, tail: 'bl' })
      label(x, 790, 900, 'I’M FINE.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 52, bg: RED, color: CREAM, rot: -0.05 })
    } },
  { sign: 'sagittarius', cap: 'Doctor said rest. | Booked *a hike.*', mood: 'sparkle', star: { x: 150 }, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      drawBits(x, PACK, PACK_C, 330, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.08 })
      bubble(x, 330, 630, '“rest”, sure', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 36, tail: 'br' })
      label(x, 330, 1130, 'TRAIL →', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: GOLD, rot: 0.05 })
    } },
  { sign: 'capricorn', cap: 'Took a sick day. | *Three meetings.*', mood: lt => lt < 1.2 ? 'neutral' : 'sleepy', look: [1, 0], star: { x: -180, y: 30 },
    front(x, t, lt, P) {
      drawBits(x, LAPTOP, LAPTOP_C, 790, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 650, 'MEETING ' + Math.min(3, 1 + Math.floor(lt / 0.6)) + '/3', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1080, 'OUT SICK', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: CREAM, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Invented a machine | that *brings soup.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -190, s: 270 },
    front(x, t, lt, P) {
      machine(x, t, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1150, 'SOUP-O-TRON', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'A slight cold. | Wrote *goodbye letters.*', mood: lt => lt < 0.6 ? 'happy' : 'wide', tears: lt => lt < 0.6 ? 1 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, LETTER, { W: CREAM, H: PINK }, 690 + i * 110, 1080 - (i % 2) * 30, 14 * pop01(t, P.t0 + 0.4 + i * 0.2, 0.3, 2), { rot: (i - 1) * 0.12 })
      bubble(x, 790, 700, 'tell my match | i loved them', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'v3t031', key: 'C', accent: '#6fc3ff', ending: 'lesson',
  title: 'Sick zodiacs | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody *rested.*' },
  lesson: { text: 'Rest isn’t lazy. | *Get well soon.*', chip: 'STATUS: RESTING' },
  last: {
    text: 'Cancer’s soup | *fixed everyone.*',
    draw(x, t, lt) {
      hearts(x, t, 540, 1000, t - lt + 0.6, { n: 8, life: 2.0, spread: 500, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
