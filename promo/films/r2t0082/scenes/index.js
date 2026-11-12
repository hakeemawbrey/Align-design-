// r2t0082: star_talk, SOLO, "Your Cancer boss | be like." (~50 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole way through (makeFilm solo mode, 9 cards): Cancer as the most extreme caring boss.
//   0.0–3.6    "Your Cancer boss | *be like.*"
//   3.6–37.8   nine cards (3.8 s each):
//              team meeting → homemade soup · you sneezed → a week of sick leave · calls the team "my babies"
//              · performance review: a hug · your two-week notice → cried both weeks · remembers your dog's birthday
//              · the office wall: the team's birth charts · out of office → "did you eat??" · a rude client → full crab mode
//  37.8        "Not a boss. | *A whole mom.*"  Cancer comes back, big.
//  41.2        callback: "Next meeting? | *Bring a bowl.*"  The soup pot comes back, steaming.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'cancer', CREAM = '#fff4e2', RED = '#e23d4e', WOOD = '#8a4a2e'

const POT = [
  '.s..s..s..',
  '..s..s..s.',
  '.s..s..s..',
  'KKKKKKKKKK',
  'GOOOOOOOOG',
  'GOOOOOOOOG',
  '.OOOOOOOO.',
  '.OOOOOOOO.',
  '..OOOOOO..',
]
const POT_C = { s: 'rgba(239,230,214,0.75)', K: '#c9cfe0', O: '#ff6b5a', G: '#c9cfe0' }
const CAKE = [
  '....F....',
  '....C....',
  '.PPPPPPP.',
  'PWPWPWPWP',
  'PPPPPPPPP',
  'CCCCCCCCC',
  'PPPPPPPPP',
]
const CAKE_C = { F: GOLD, C: CREAM, P: '#c98f6a', W: '#fff' }
const PAW = ['.K.K.', 'K.K.K', '.KKK.', 'KKKKK', '.KKK.']
const CLAW = [
  'CCCC...CC',
  'CCCCC.CCC',
  '.CCCC.CC.',
  '..CCCCCC.',
  '...CCCC..',
  '....CC...',
  '....CC...',
]
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t, sp = 0.3) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * sp)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 6, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, i / 12 * Math.PI * 2, (i + 1) / 12 * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.6, 0, Math.PI * 2); x.fill()
  x.restore()
}
function phone(x, cx, cy, k, draw) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408); x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  x.fillStyle = SKYB; x.fillRect(-100, -156, 200, 46)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BOSS', 0, -132)
  draw(x); x.restore()
}
function msg(x, cx, cy, txt, col, k, size = 30) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `800 ${size}px ${INTER}`; const w = x.measureText(txt).width + 30
  x.fillStyle = col; x.fillRect(-w / 2, -size, w, size * 2); x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 2)
  x.restore()
}
// a small coworker star (the "baby") with a name
function worker(x, t, id, cx, cy, s, k, mood = 'happy', seed = 30) {
  if (k > 0.01) signChar(x, t, id, cx, cy, s * k, { mood, seed, glyph: false })
}

const CAMEOS = [
  { sign: S, cap: 'Team meeting? | Brought *homemade soup.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, POT, POT_C, 790, 930, 24 * pop01(t, P.t0 + 0.25, 0.35, 2))
      label(x, 790, 680, 'AGENDA: EAT', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 40, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You sneezed once. | *Sent home for a week.*', mood: lt => lt > 0.6 ? 'wide' : 'happy', star: { x: -180 }, hops: [0.6],
    front(x, t, lt, P) {
      bubble(x, 760, 650, 'achoo', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, tail: 'bc' })
      label(x, 790, 860, 'SICK LEAVE:', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 40, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 960, '7 DAYS + SOUP', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 40, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Calls the team | *“my babies.”*', mood: 'heart', star: { x: -180 },
    front(x, t, lt, P) {
      worker(x, t, 'capricorn', 720, 1000, 130, pop01(t, P.t0 + 0.3, 0.3, 2), 'eyeroll', 31)
      worker(x, t, 'leo', 880, 1000, 130, pop01(t, P.t0 + 0.45, 0.3, 2), 'sparkle', 32)
      bubble(x, 790, 700, 'how are my | babies today?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'bl' })
      hearts(x, t, 800, 920, P.t0 + 1.2, { n: 4, life: 1.6, spread: 200, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'Your performance review? | *A hug.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -180 }, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.rotate(0.05); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-130, -170, 260, 340); x.fillStyle = CREAM; x.fillRect(-122, -162, 244, 324)
        x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('REVIEW', 0, -125)
        x.fillStyle = '#b9c7e6'; for (let i = 0; i < 4; i++) x.fillRect(-100, -80 + i * 30, 200, 6)
        x.restore()
      }
      label(x, 790, 980, 'SCORE: ONE HUG', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 36, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
      hearts(x, t, 790, 880, P.t0 + 1.3, { n: 4, life: 1.5, spread: 160, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Two-week notice? | Cried *both weeks.*', mood: lt => lt > 0.8 ? 'wide' : 'neutral', tears: lt => lt > 0.8 ? 3 : 0, star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 830); x.rotate(0.06); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-120, -100, 240, 200); x.fillStyle = CREAM; x.fillRect(-112, -92, 224, 184)
        x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('I QUIT :)', 0, -40)
        x.fillStyle = '#b9c7e6'; x.fillRect(-80, 10, 160, 6); x.fillRect(-80, 40, 120, 6)
        x.restore()
      }
      label(x, 800, 1050, `DAY ${Math.max(1, Math.round(prog(lt, 0.8, 2.0) * 14))} OF 14`, pop01(t, P.t0 + 0.9, 0.3, 2), { size: 36, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Remembers your birthday. | And *your dog’s.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 960, 24 * pop01(t, P.t0 + 0.3, 0.35, 2))
      drawBits(x, PAW, { K: INK }, 790, 1000, 10 * pop01(t, P.t0 + 0.6, 0.3, 2))
      bubble(x, 790, 700, 'happy birthday, | Biscuit!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, tail: 'bl' })
      sparkles(x, t, 790, 880, P.t0 + 1.2, 8, 140, 0.2)
    } },
  { sign: S, cap: 'The office wall: | everyone’s *birth chart.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) {
        const k = pop01(t, P.t0 + 0.25 + i * 0.25, 0.3, 2), cx = 700 + (i % 2) * 180, cy = 720 + Math.floor(i / 2) * 230
        if (k <= 0.01) continue
        x.save(); x.translate(cx, cy); x.rotate((i % 2 ? 0.05 : -0.05)); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-82, -92, 164, 184); x.fillStyle = WOOD; x.fillRect(-76, -86, 152, 172); x.fillStyle = '#140c30'; x.fillRect(-66, -76, 132, 152)
        x.restore()
        chart(x, cx, cy - 10, 52, k, t + i, 0.2)
        label(x, cx, cy + 70, ['SAM', 'MIA', 'JO', 'ALEX'][i], k * 0.9, { size: 24, bg: GOLD, rot: 0, font: MONO, weight: 700 })
      }
    } },
  { sign: S, cap: 'You’re out of office. | *“Did you eat??”*', mood: lt => lt > 1.4 ? 'wide' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), x => {
        msg(x, -10, -70, 'did you eat??', PINK, pop01(t, P.t0 + 0.5, 0.25, 2.2))
        msg(x, 10, 0, 'lunch counts', PINK, pop01(t, P.t0 + 0.9, 0.25, 2.2))
        msg(x, -10, 70, 'reply pls', PINK, pop01(t, P.t0 + 1.3, 0.25, 2.2))
        msg(x, 10, 140, 'sending soup', GOLD, pop01(t, P.t0 + 1.7, 0.25, 2.2))
      })
    } },
  { sign: S, cap: 'A client was rude. | Full *crab mode.*', mood: lt => lt > 0.9 ? 'squint' : 'happy', look: [1, 0], star: { x: -150 }, hops: [0.9],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.9, 0.3, 2.4)
      const snap = Math.abs(Math.sin(t * 9)) * 0.25
      drawBits(x, CLAW, { C: '#ff6b5a' }, F.x - 170, F.cy - 60, 16 * k, { rot: -0.5 - snap })
      drawBits(x, CLAW, { C: '#ff6b5a' }, F.x + 170, F.cy - 60, 16 * k, { rot: 0.5 + snap, sx: -1 })
      bubble(x, 800, 620, 'not MY team.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 1130, 'PROTECTIVE MODE: ON', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: RED, color: '#fff', rot: -0.03, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0082', key: 'E', accent: '#8fe3ff', solo: S, ending: 'callback',
  title: 'Your Cancer boss | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Not a boss. | *A whole mom.*', mood: 'heart' },
  last: {
    text: 'Next meeting? | *Bring a bowl.*',
    draw(x, t, lt) {
      drawBits(x, POT, POT_C, 540, 1180, 34 * pop01(t, t - lt + 0.6, 0.4, 2))
      label(x, 540, 1400, 'SOUP: DAY 412', pop01(t, t - lt + 1.4, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
