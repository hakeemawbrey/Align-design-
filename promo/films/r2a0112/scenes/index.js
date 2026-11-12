// r2a0112: star_advice, ADVICE SOLO, "Capricorn, laugh | more often." (~51 s vertical, signs3kit social cut, lofi · F)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Capricorn truth + a warm reframe, one gag each.
//   0.0–3.6    "Capricorn, laugh | *more often.*"
//   3.6–37.8   serious mode: switch it off · fun booked for five minutes (let it run late) · laughed at your own joke
//              (it was funny) · snorted on a call (iconic) · party hat on? keep it on · your match sent a pun (groan,
//              then laugh) · dance badly in the kitchen · popping bubble wrap counts · your laugh is the best sound
//  37.8        "Still the boss. | *Just giggling.*"
//  41.0        LESSON UNLOCKED: "Joy isn’t a reward. | It’s *the point.*"  MOOD: LIGHTER
//  46.9        "Go on. | *Snort a little.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import { card, txt, phone, chat, RED, CREAM, ORANGE, SAGE, GREY } from './props.js'

const SLATE = '#9fb4d8'
const HAT = ['....Y....', '...PPP...', '...PSP...', '..PPPPP..', '..PSPPS..', '.PPPPPPP.', '.PSPPPSPP', 'PPPPPPPPP']
const HAT_C = { Y: GOLD, P: PINK, S: SKYB }
const PAN = ['..KKKKKK.......', '.KGGGGGGK......', 'KGGGGGGGGK.....', 'KGGGGGGGGKBBBBB', 'KGGGGGGGGK.....', '.KGGGGGGK......', '..KKKKKK.......']

// a big wall switch: SERIOUS on top, flips down to FUN
function toggle(x, cx, cy, k, flip) {
  card(x, cx, cy, 200, 300, BONE, { k, rot: 0.03 }, x => {
    txt(x, 'SERIOUS', 0, -118, 26, INK, { font: 'monospace', weight: 700 })
    txt(x, 'FUN', 0, 120, 30, '#2f9a4a', { font: 'monospace', weight: 700 })
    x.fillStyle = INK; x.fillRect(-46, -86, 92, 172); x.fillStyle = '#5b5480'; x.fillRect(-38, -78, 76, 156)
    const y = lerp(-40, 40, flip)
    x.fillStyle = INK; x.fillRect(-42, y - 42, 84, 84); x.fillStyle = flip > 0.5 ? MINT : '#d8dbe8'; x.fillRect(-34, y - 34, 68, 68)
  })
}
function bubbleWrap(x, cx, cy, k, lt) {
  card(x, cx, cy, 330, 300, 'rgba(200,236,255,0.92)', { k, rot: -0.04 }, x => {
    const popped = Math.floor(prog(lt, 0.3, 2.0) * 20)
    for (let j = 0; j < 4; j++) for (let i = 0; i < 5; i++) {
      const n = j * 5 + i, px = -128 + i * 64, py = -96 + j * 64, p = n < popped
      x.fillStyle = INK; x.beginPath(); x.arc(px, py, 27, 0, Math.PI * 2); x.fill()
      x.fillStyle = p ? '#a9cfe6' : '#ffffff'; x.beginPath(); x.arc(px, py, p ? 20 : 23, 0, Math.PI * 2); x.fill()
      if (!p) { x.fillStyle = SKYB; x.fillRect(px - 10, py - 12, 8, 8) }
    }
  })
}
function soundBars(x, t, cx, cy, k) {
  if (k <= 0.01) return
  for (let i = 0; i < 7; i++) {
    const h = (60 + 110 * Math.abs(Math.sin(t * 6 + i * 1.3))) * k
    x.fillStyle = INK; x.fillRect(cx - 170 + i * 50 - 4, cy - h - 4, 40, h + 8)
    x.fillStyle = [MINT, GOLD, PINK, SKYB, MINT, GOLD, PINK][i]; x.fillRect(cx - 170 + i * 50, cy - h, 32, h)
  }
}

const S = 'capricorn'
const CAMEOS = [
  { sign: S, cap: 'Serious mode on? | *Flip it off.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      toggle(x, 790, 850, pop01(t, P.t0 + 0.15, 0.3, 2), ease.inOutCubic(prog(lt, 0.9, 1.2)))
      sparkles(x, t, 790, 900, P.t0 + 1.2, 6, 150, 0.2)
    } },
  { sign: S, cap: 'Booked five minutes of fun? | *Let it run late.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const g = ease.outCubic(prog(lt, 0.8, 1.6))
      card(x, 790, 850, 320, 360, CREAM, { k: pop01(t, P.t0 + 0.15, 0.3, 2), rot: 0.03 }, x => {
        txt(x, 'SCHEDULE', 0, -150, 26, RED, { font: MONO, weight: 700 })
        txt(x, '3:15', -120, -90, 22, INK, { font: MONO, weight: 700, align: 'left' })
        const h = lerp(40, 230, g)
        x.fillStyle = INK; x.fillRect(-46, -112, 186, h + 8); x.fillStyle = MINT; x.fillRect(-42, -108, 178, h)
        txt(x, 'FUN', 47, -88 + h / 2 - 18, 34, INK)
      })
      if (lt > 1.5) label(x, 790, 1110, 'RUNNING LATE ✓', pop01(t, P.t0 + 2.0, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Laughed at your own joke? | *It was funny.*', mood: lt => lt > 0.8 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [0.9, 1.2, 1.5],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'why did the | goat… ok wait', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, tail: 'bl' })
      bubble(x, 800, 900, 'HA!', pop01(t, P.t0 + 1.0, 0.25, 2.4), { size: 70, col: GOLD, tail: 'bl' })
      label(x, 790, 1100, 'JOKE: 10/10', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Snorted on a work call? | *Iconic, honestly.*', mood: lt => lt > 1.0 ? 'wide' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      card(x, 790, 820, 340, 260, '#2a2350', { k: pop01(t, P.t0 + 0.15, 0.3, 2), rot: 0.03 }, x => {
        const cols = ['#ff6b5a', '#7fd67a', '#ffd84a', '#c58cff']
        cols.forEach((c, i) => { const px = -80 + (i % 2) * 160, py = -60 + Math.floor(i / 2) * 120; x.fillStyle = '#140c30'; x.fillRect(px - 72, py - 52, 144, 104); signChar(x, t, ['aries', 'taurus', 'gemini', 'sagittarius'][i], px, py + 8, 80, { mood: lt > 1.1 ? 'happy' : 'neutral', seed: 30 + i, glyph: false, glow: 0.5 }) })
      })
      bubble(x, 790, 1060, '*snort*', pop01(t, P.t0 + 0.9, 0.25, 2.4), { size: 46, tail: 'bl' })
      label(x, 790, 640, 'EVERYONE LAUGHED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Party hat on? | *Keep it on.*', mood: 'sparkle', star: { x: -100, s: 330 }, hops: [1.1],
    front(x, t, lt, P, F) {
      const d = ease.outCubic(prog(lt, 0.2, 0.7))
      drawBits(x, HAT, HAT_C, F.x + 10, lerp(500, F.top - 50, d), 13, { rot: 0.12 })
      label(x, 790, 760, 'DRESS CODE:', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 840, 'SILLY', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 56, bg: PINK, rot: -0.04 })
    } },
  { sign: S, cap: 'Your match sent a pun? | *Groan. Then laugh.*', mood: lt => lt > 1.4 ? 'happy' : 'eyeroll', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 790, 850, pop01(t, P.t0 + 0.15, 0.3, 2), (x, w, h) => {
        txt(x, '✦ YOUR MATCH', 0, -h / 2 + 34, 20, LAV, { font: MONO, weight: 700 })
        chat(x, 'lettuce', -w / 2 + 14, -h / 2 + 100, { col: MINT, size: 24 })
        chat(x, 'meet up?', -w / 2 + 14, -h / 2 + 156, { col: MINT, size: 24 })
        if (lt > 0.9) chat(x, 'ugh.', w / 2 - 14, -h / 2 + 230, { right: true, col: LAV, size: 24 })
        if (lt > 1.4) chat(x, 'HAHA yes', w / 2 - 14, -h / 2 + 286, { right: true, col: GOLD, size: 24 })
      })
    } },
  { sign: S, cap: 'Dance badly | in *the kitchen.*', mood: 'happy', star: { x: -170 }, hops: [0.4, 0.8, 1.2, 1.6, 2.0],
    front(x, t, lt, P, F) {
      drawBits(x, PAN, { K: INK, G: '#5b5480', B: '#3a3355' }, F.x + 170, F.cy - 20, 9 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 7) * 0.3 })
      notes(x, t, 760, 820, { n: 4, cell: 7, col: GOLD, seed: 3 })
      label(x, 790, 1100, 'SKILL: 0  JOY: 100', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Popping bubble wrap? | *Time well spent.*', mood: lt => lt > 1 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubbleWrap(x, 790, 850, pop01(t, P.t0 + 0.15, 0.3, 2), lt)
      label(x, 790, 1090, 'PRODUCTIVE? NO. FUN? YES.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 24, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your laugh? | *Best sound in the room.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      soundBars(x, t, 800, 960, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 680, 'VOLUME: UP', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 38, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 900, P.t0 + 1.2, { n: 5, life: 1.7, spread: 220, cell: 7, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2a0112', key: 'F', accent: GOLD, solo: 'capricorn', ending: 'lesson',
  title: 'Capricorn, laugh | *more often.*',
  cameos: CAMEOS,
  group: { cap: 'Still the boss. | *Just giggling.*', mood: 'happy' },
  lesson: { text: 'Joy isn’t a reward. | It’s *the point.*', chip: 'MOOD: LIGHTER' },
  last: { text: 'Go on. | *Snort a little.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
