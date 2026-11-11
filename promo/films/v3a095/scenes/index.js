// v3a095: star_advice, ADVICE SOLO, "Gemini, stop doing | this in love." (~45 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): gentle, kind love advice for Gemini, one gag each.
//   0.0–3.6    "Gemini, stop doing | *this in love.*"  One big Gemini pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              vanishing mid-chat (a little ghost; just say brb) · ten chats open (love just one) · changing the subject
//              when it gets deep ("anyway! birds?") · bored by week three (plan something new together)
//              · hiding the soft side (a secret love letter) · arguing with yourself about them (two bubbles, one star)
//              · reading their chart instead of asking · leaving them on read by accident (OOPS. REPLY NOW)
//              · running when it gets real (a packed suitcase: STAY.)
//  37.8        "Stay a while. | *It’s worth it.*"  Gemini comes back, big.
//  41.2        callback: "The little ghost? | *Retired.*"  the ghost returns in a tiny party hat.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const YEL = '#f2cf4a', RED = '#e23d4e', WOOD = '#c98f2a'
const S = 'gemini'

const GHOST = ['...WWWW...', '..WWWWWW..', '.WWWWWWWW.', '.WWkWWkWW.', '.WWWWWWWW.', '.WWWmmWWW.', '.WWWWWWWW.', '.WWWWWWWW.', '.WW.WW.WW.', '.W..W..W..']
const GHOST_C = { W: '#f4f1ff', k: INK, m: PINK }
const LETTER = ['EEEEEEEEEEEE', 'EeEEEEEEEEeE', 'EEeEEEEEEeEE', 'EEEeEEEEeEEE', 'EEEEeHHeEEEE', 'EEEEEHHEEEEE', 'EEEEEEEEEEEE']
const LETTER_C = { E: '#fff4e2', e: '#c9a6ff', H: RED }
const SUITCASE = ['...KKKK...', '...K..K...', 'BBBBBBBBBB', 'BbBBBBBBbB', 'BBBBBBBBBB', 'BBBGGGGBBB', 'BBBBBBBBBB', 'BbBBBBBBbB', 'BBBBBBBBBB']
const SUITCASE_C = { K: INK, B: '#f0603a', b: '#a8402a', G: GOLD }
const HAT = ['..Y..', '.PPP.', '.PYP.', 'PPPPP']
const HAT_C = { Y: GOLD, P: PINK }

function phone(x, cx, cy, k, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-118, -178, 252, 372)
  x.fillStyle = INK; x.fillRect(-130, -190, 260, 380); x.fillStyle = '#2a2350'; x.fillRect(-120, -180, 240, 360)
  x.fillStyle = '#140c30'; x.fillRect(-108, -158, 216, 316)
  fn(x)
  x.restore()
}
function chart(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(t * 0.3); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, 0, 7); x.fill(); x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, 140, 0, 7); x.fill()
  x.strokeStyle = GOLD; x.lineWidth = 4; x.beginPath(); x.arc(0, 0, 140, 0, 7); x.stroke(); x.beginPath(); x.arc(0, 0, 90, 0, 7); x.stroke()
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.beginPath(); x.moveTo(Math.cos(a) * 90, Math.sin(a) * 90); x.lineTo(Math.cos(a) * 140, Math.sin(a) * 140); x.stroke() }
  x.strokeStyle = PINK; x.lineWidth = 3; x.beginPath(); x.moveTo(-60, -40); x.lineTo(50, 50); x.lineTo(70, -30); x.closePath(); x.stroke()
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Vanishing mid-chat. | *Just say “brb.”*', mood: lt => lt > 1.4 ? 'happy' : 'wink', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const fade = lt < 1.2 ? 1 : 0.35
      drawBits(x, GHOST, GHOST_C, 800, 860 + 16 * Math.sin(t * 3), 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { alpha: fade })
      if (lt > 1.2) bubble(x, 760, 640, 'brb! 5 min', pop01(t, P.t0 + 1.25, 0.25, 2.4), { size: 38, tail: 'bl' })
      label(x, 800, 1100, lt > 1.2 ? 'SO EASY' : 'POOF', pop01(t, P.t0 + 0.5, 0.3, 2.4), { size: 36, bg: lt > 1.2 ? MINT : LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Ten chats open. | *Love just one.*', mood: lt => lt > 1.6 ? 'heart' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const one = lt > 1.5
      for (let i = 0; i < 6; i++) {
        const k = pop01(t, P.t0 + 0.15 + i * 0.12, 0.25, 2.2) * (one && i ? 1 - clamp((lt - 1.5) * 4) : 1)
        bubble(x, 760 + (i % 2 ? 50 : -30), 600 + i * 95, one && !i ? 'just you :)' : 'hey', k, { size: 30, col: one && !i ? PINK : BONE, tail: i % 2 ? 'br' : 'bl' })
      }
      label(x, 800, 1130, one ? '1 CHAT' : '10 CHATS', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 34, bg: one ? MINT : YEL, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Changing the subject | *when it’s deep.*', mood: lt => lt > 1.4 ? 'neutral' : 'wink', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 830, 990, 170 * k, { mood: lt > 1.6 ? 'heart' : 'neutral', look: [-1, 0], seed: 21, glyph: false })
      bubble(x, 800, 620, 'how do you | really feel?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 30, tail: 'br' })
      bubble(x, 380, 640, 'anyway! | BIRDS?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 32, tail: 'bl', col: '#fff2a8' })
      label(x, 600, 1140, 'STAY ON IT', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Bored by week three? | *Try something new.*', mood: lt => lt > 1.4 ? 'sparkle' : 'sleepy', look: [1, 0], star: { x: -220 }, hops: [1.5],
    front(x, t, lt, P) {
      label(x, 790, 680, 'WEEK 3', pop01(t, P.t0 + 0.2, 0.3, 2.4), { size: 44, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 860, 'NEW: SALSA CLASS', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 990, 'TOGETHER', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 38, bg: MINT, rot: -0.03 })
      sparkles(x, t, 790, 860, P.t0 + 1.3, 7, 170, 0.3)
    } },
  { sign: S, cap: 'Hiding your | *soft side.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: lt => lt > 1.3 ? [1, 0] : [-1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const out = ease.outCubic(prog(lt, 1.0, 1.5))
      drawBits(x, LETTER, LETTER_C, lerp(470, 790, out), lerp(990, 870, out), 20 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: lerp(0.4, -0.05, out) })
      label(x, 790, 680, 'SECRET ROMANTIC', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      if (lt > 1.4) hearts(x, t, 790, 850, P.t0 + 1.4 * 1.29, { n: 5, life: 1.4, spread: 160, cell: 6, seed: 5 })
    } },
  { sign: S, cap: 'Arguing with yourself | *about them.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'squint' : 'wide', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: { x: -60 },
    front(x, t, lt, P) {
      bubble(x, 280, 620, 'they like me!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 30, tail: 'br' })
      bubble(x, 780, 620, 'or do they?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 30, tail: 'bl' })
      bubble(x, 290, 770, 'they DO', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 30, tail: 'br' })
      bubble(x, 790, 770, 'hmm…', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 30, tail: 'bl' })
      label(x, 540, 1140, 'JUST ASK THEM', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Reading their chart | *instead of asking.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      chart(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 790, 640, 'just ask me!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, tail: 'bc', col: '#ffd2ef' })
      label(x, 790, 1090, 'MOON IN… HUH?', pop01(t, P.t0 + 0.7, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Left them on read. | *By accident.*', mood: lt => lt > 1.1 ? 'wide' : 'happy', look: [1, 0], star: { x: -220 }, hops: [1.1],
    front(x, t, lt, P) {
      phone(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), x => {
        x.fillStyle = PINK; x.fillRect(-92, -130, 170, 70); x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('miss you!', -7, -95)
        x.fillStyle = 'rgba(239,230,214,0.7)'; x.font = `700 20px ${MONO}`; x.fillText('READ · 3 DAYS', 0, -30)
      })
      label(x, 790, 1110, 'OOPS. REPLY NOW', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Running when | *it gets real.*', mood: lt => lt > 1.5 ? 'heart' : 'wide', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const unpack = ease.outCubic(prog(lt, 1.2, 1.7))
      drawBits(x, SUITCASE, SUITCASE_C, lerp(860, 790, unpack), 920, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lerp(0.12, 0, unpack) })
      label(x, 790, 680, lt > 1.4 ? 'STAY. IT’S SAFE.' : 'PACKED ALREADY', pop01(t, P.t0 + 0.5, 0.3, 2.4), { size: 32, bg: lt > 1.4 ? MINT : BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a095', key: 'C', accent: YEL, solo: S, ending: 'callback',
  title: 'Gemini, stop doing | *this in love.*',
  cameos: CAMEOS,
  group: { cap: 'Stay a while. | *It’s worth it.*', mood: 'heart' },
  last: {
    text: 'The little ghost? | *Retired.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.45, 1.8)
      drawBits(x, GHOST, GHOST_C, 540, 1000 + 14 * Math.sin(t * 2.5), 30 * k)
      drawBits(x, HAT, HAT_C, 560, 820 + 14 * Math.sin(t * 2.5), 22 * pop01(t, t - lt + 0.8, 0.3, 2.4), { rot: 0.2 })
      label(x, 540, 1250, 'GONE FISHING', pop01(t, t - lt + 1.2, 0.3, 2.4), { size: 40, bg: YEL, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
