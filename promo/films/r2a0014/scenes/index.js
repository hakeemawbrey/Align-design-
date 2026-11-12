// r2a0014: ADVICE SOLO, "Aries, before you | send that text." (~51 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Aries truth + a warm reframe, one gag each.
// Ending: card (lesson, then the last line over the Aries + Libra match card).
//   0.0–3.6    "Aries, before you | *send that text.*"
//   3.6–37.8   typed it in caps (breathe first) · three exclamation marks (one is plenty) · drafted in four seconds
//              (give it four minutes) · win the friendship, not the argument · 2 a.m.? sleep on it · your fire is a gift
//              (aim it kindly) · read it out loud (oof) · send the nice version · honest is good, gentle is better
//  37.8        "Big heart. | *Fast thumbs.*"
//  41.0        LESSON UNLOCKED: "Say it with heart. | Then *hit send.*"  SENT: KINDLY
//  46.9        "Libra replied | *with a heart.*" over the match card: Aries + Libra.
import { prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#ff6b5a', DEEP = '#e23d4e'

function phone(x, cx, cy, k, rot, draw) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 260, 400)
  x.fillStyle = INK; x.fillRect(-130, -200, 260, 400)
  x.fillStyle = '#2a2350'; x.fillRect(-120, -190, 240, 380)
  x.fillStyle = '#140c30'; x.fillRect(-108, -160, 216, 320)
  x.fillStyle = '#6b62a8'; x.fillRect(-30, 168, 60, 10)
  draw(x); x.restore()
}
const msg = (x, y, text, { col = RED, ink = INK, size = 28, w = 190 } = {}) => {
  x.fillStyle = col; x.fillRect(-w / 2, y - 26, w, 52)
  x.fillStyle = ink; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, y + 1)
}
const TROPHY = ['YYYYYYYYYYY', 'Y.YYYYYYY.Y', 'Y.YYYYYYY.Y', '.YYYYYYYYY.', '..YYYYYYY..', '....YYY....', '...YYYYY...', '..KKKKKKK..']
const HEART = ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
const MOON = ['..MMMM..', '.MMM....', 'MMM.....', 'MMM.....', 'MMM.....', '.MMM....', '..MMMM..']
const FIRE = ['....R....', '...RRR...', '..RRYRR..', '.RRYYYRR.', '.RYYWYYR.', 'RRYYWYYRR', '.RRYYYRR.', 'BBBBBBBBB', '.B.B.B.B.']
const FEATHER = ['......WW', '.....WWW', '....WWWW', '...WWWW.', '..WWWW..', '.WWWW...', '.WW.....', 'K.......']

const S = 'aries'
const CAMEOS = [
  { sign: S, cap: 'Typed it in caps? | *Breathe first.*', mood: lt => lt > 1.3 ? 'sleepy' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 790, 860, 1.2 * pop01(t, P.t0 + 0.15, 0.3, 2), 0.04, x => {
        msg(x, -90, 'WHY WOULD', { size: 26 }); msg(x, -30, 'YOU EVEN', { size: 26 })
        const p = pop01(t, P.t0 + 1.0, 0.25, 2.4)
        if (p > 0.01) { x.save(); x.translate(0, 80); x.scale(p, p); x.fillStyle = MINT; x.fillRect(-70, -40, 140, 80); x.fillStyle = INK; x.fillRect(-26, -24, 16, 48); x.fillRect(10, -24, 16, 48); x.restore() }
      })
      label(x, 790, 1150, 'IN… AND OUT.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: MINT, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Three exclamation marks? | *One is plenty.*', mood: lt => lt > 1.2 ? 'happy' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = lt > 1.1 ? 1 : 3
      bubble(x, 790, 860, 'ok' + '!'.repeat(n), pop01(t, P.t0 + 0.2, 0.3, 2), { size: 96, col: n === 1 ? MINT : RED, tail: 'bl' })
      if (lt > 1.1) sparkles(x, t, 790, 860, P.t0 + 1.1 * 1.29, 6, 150, 0.2)
    } },
  { sign: S, cap: 'Drafted in four seconds? | *Give it four minutes.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 800, '0:04', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 70, bg: RED, font: MONO, weight: 700 })
      label(x, 790, 960, '→ 4:00', pop01(t, P.t0 + 1.0, 0.3, 2.6), { size: 70, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Win the argument? | Win *the friendship.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const swap = ease.inOutCubic(prog(lt, 0.9, 1.3))
      drawBits(x, TROPHY, { Y: GOLD, K: '#8a4a2e' }, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2) * (1 - swap))
      drawBits(x, HEART, { H: PINK, W: '#fff' }, 790, 880, 34 * swap)
      if (swap > 0.9) hearts(x, t, 790, 860, P.t0 + 1.8, { n: 4, life: 1.4, spread: 200, cell: 6, seed: 4 })
    } },
  { sign: S, cap: 'Sending it at 2 a.m.? | *Sleep on it.*', mood: 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, MOON, { M: GOLD }, 800, 760, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1020, 'DRAFT SAVED', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 38, bg: LAV, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your fire is a gift. | *Aim it kindly.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, FIRE, { R: RED, Y: GOLD, W: '#fff4e2', B: '#8a4a2e' }, 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { sy: 1 + 0.06 * Math.sin(t * 14) })
      label(x, 790, 1130, 'COZY, NOT SCORCHING', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 28, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Read it out loud. | Still *sound like you?*', mood: lt => lt > 1.2 ? 'wide' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 760, '“per my last | message…”', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 38, col: BONE, tail: 'bl' })
      label(x, 790, 980, 'OOF.', pop01(t, P.t0 + 1.1, 0.3, 2.8), { size: 70, bg: RED, rot: -0.06 })
    } },
  { sign: S, cap: 'Still want to send it? | *Send the kind one.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const kind = lt > 1.0
      phone(x, 790, 860, 1.2 * pop01(t, P.t0 + 0.15, 0.3, 2), -0.04, x => {
        if (!kind) { msg(x, -40, 'FINE.', { size: 34 }) }
        else { msg(x, -60, 'miss you :)', { col: MINT, size: 28 }); msg(x, 10, 'talk later?', { col: MINT, size: 28 }) }
      })
      if (kind) hearts(x, t, 620, 1150, P.t0 + 1.4, { n: 4, life: 1.4, spread: 200, cell: 6, seed: 6 })
    } },
  { sign: S, cap: 'Honest is good. | *Gentle is better.*', mood: 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, FEATHER, { W: BONE, K: '#9aa5c4' }, 790 + Math.sin(t * 2) * 30, 840 + Math.sin(t * 3) * 14, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 2) * 0.2 })
      label(x, 790, 1100, 'HONEST + GENTLE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: PINK, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0014', key: 'E', accent: RED, solo: 'aries', ending: 'card',
  title: 'Aries, before you | *send that text.*',
  cameos: CAMEOS,
  card: { a: 'aries', b: 'libra', chip: 'IT’S A MATCH' },
  group: { cap: 'Big heart. | *Fast thumbs.*', mood: 'sparkle' },
  lesson: { text: 'Say it with heart. | Then *hit send.*', chip: 'SENT: KINDLY' },
  last: {
    text: 'Libra replied | *with a heart.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
