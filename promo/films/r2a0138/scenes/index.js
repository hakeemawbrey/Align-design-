// r2a0138: THE SIGNS AS… v3, SOLO advice film, "Capricorn, celebrate | the small wins." (~43 s vertical, lofi · C)
// One Capricorn, nine cards: a relatable Capricorn truth + a warm reframe, one visual gag each. Ending: 'group'.
//   0.0–3.6    "Celebrate the small | wins, *Capricorn.*"
//   3.6–37.8   inbox zero (a tiny trophy) · drank water, medal · left work on time, party hat · made the bed, gold star
//              · lunch away from the desk · said "good enough" (a B+) · rested on Sunday, permission granted
//              · profile now says "likes naps" · celebrated anyway (party popper, WIN #1,000)
//  37.8        "Every win counts. | *Even tiny ones.*"  (the group beat is the ending)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'capricorn', CAP = '#2fc79a', RED = '#e23d4e', WOOD = '#8a4a2e', ORANGE = '#ff9a4a'

function sheet(x, cx, cy, w, h, k, { rot = 0, bg = BONE, head = null, headBg = RED, headInk = '#fff4e2', headSize = 30 } = {}) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 7, -h / 2 - 7, w + 14, h + 14)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (head) {
    x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 60)
    x.fillStyle = headInk; x.font = `800 ${headSize}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 32)
  }
  return true
}
function confetti(x, t, cx, cy, t0, { n = 20, spread = 300, h = 480 } = {}) {
  const lt = t - t0
  if (lt <= 0) return
  const COLS = [GOLD, PINK, MINT, SKYB, ORANGE, LAV]
  for (let i = 0; i < n; i++) {
    const ph = (lt * 0.55 + i * 0.137) % 1
    x.save(); x.translate(cx + Math.sin(i * 2.71) * spread + Math.sin(t * 2 + i) * 18, cy - h / 2 + ph * h); x.rotate(t * 3 + i); x.globalAlpha = Math.sin(Math.PI * ph)
    x.fillStyle = COLS[i % COLS.length]; x.fillRect(-9, -5, 18, 10); x.restore()
  }
}
const TROPHY = ['YYYYYYY', 'YYYYYYY', '.YYYYY.', '..YYY..', '...Y...', '..YYY..', '.WWWWW.']
const GLASS = ['W.....W', 'WSSSSSW', 'WSSSSSW', 'WSSSSSW', 'WSSSSSW', '.WWWWW.']
const MEDAL = ['RR.RR', '.RRR.', '..R..', '.GGG.', 'GGWGG', 'GGGGG', '.GGG.']
const HAT = ['...Y...', '..PPP..', '..PYP..', '.PPPPP.', '.PYPYP.', 'PPPPPPP']
const BED = [
  'W..........',
  'WPP........',
  'WPPBBBBBBBB',
  'WBBBBBBBBBB',
  'WWWWWWWWWWW',
  'W.........W',
]
const STAR = ['...Y...', '..YYY..', 'YYYYYYY', '.YYYYY.', '.YY.YY.', 'Y.....Y']
const SANDWICH = ['.BBBBBBB.', 'BBWBBBWBB', 'GGGGGGGGG', 'RRRRRRRRR', 'MMMMMMMMM', '.BBBBBBB.']
const POPPER = ['....YY', '...YPY', '..YPY.', '.YPY..', 'YPY...', 'YY....']

const CAMEOS = [
  { sign: S, cap: 'Hit inbox zero? | That\'s a *win.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', star: { x: -170 }, hops: [1.5],
    front(x, t, lt, P) {
      const n = Math.max(0, Math.round(lerp(87, 0, ease.inOutCubic(prog(lt, 0.3, 1.3)))))
      if (sheet(x, 790, 820, 300, 220, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04, bg: '#fff4e2', head: 'INBOX', headBg: INK, headInk: CAP })) {
        x.fillStyle = n ? INK : CAP; x.font = `800 100px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(String(n), 0, 30)
        x.restore()
      }
      drawBits(x, TROPHY, { Y: GOLD, W: WOOD }, 790, 1040, 16 * pop01(t, P.t0 + 1.4, 0.3, 2.4))
      sparkles(x, t, 790, 1020, P.t0 + 1.4, 7, 120, 0.3)
    } },
  { sign: S, cap: 'Drank water today? | *Medal.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: { x: -170 },
    front(x, t, lt, P, F) {
      drawBits(x, GLASS, { W: '#d8dbe8', S: SKYB }, 790, 850, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const d = ease.outCubic(prog(lt, 0.9, 1.4))
      if (lt > 0.9) drawBits(x, MEDAL, { R: RED, G: GOLD, W: '#fff4e2' }, lerp(800, F.x + 4, d), lerp(560, F.cy + 90, d), 16)
      label(x, 790, 1070, 'HYDRATION: ELITE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: SKYB, rot: -0.04 })
    } },
  { sign: S, cap: 'Left work on time? | *Party hat.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', star: { x: -170 }, hops: [1.2, 1.7],
    front(x, t, lt, P, F) {
      label(x, 790, 760, '5:00 PM', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 64, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      const d = ease.outCubic(prog(lt, 0.8, 1.2))
      if (lt > 0.8) drawBits(x, HAT, { Y: GOLD, P: PINK }, F.x + 10, lerp(500, F.top - 50, d), 14, { rot: 0.12 })
      label(x, 790, 960, 'LAPTOP: CLOSED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.05 })
      confetti(x, t, 600, 860, P.t0 + 1.2)
    } },
  { sign: S, cap: 'Made the bed? | *Gold star.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BED, { W: WOOD, P: '#fff4e2', B: CAP }, 790, 940, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const k = pop01(t, P.t0 + 1.1, 0.3, 2.6)
      drawBits(x, STAR, { Y: GOLD }, 800, 720, 24 * k, { rot: 0.15 })
      sparkles(x, t, 800, 720, P.t0 + 1.1, 7, 130, 0.5)
    } },
  { sign: S, cap: 'Real lunch break? | *Huge.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SANDWICH, { B: '#e8a24a', W: '#fff4e2', G: '#5fd068', R: RED, M: '#8a4a2e' }, 790, 870, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 680, 'AWAY FROM DESK', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1060, 'A WHOLE 30 MIN', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: CAP, rot: 0.04 })
    } },
  { sign: S, cap: 'Said “good enough”? | That\'s *growth.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      if (sheet(x, 790, 850, 290, 360, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04, bg: '#fff4e2', head: 'THE REPORT', headBg: INK, headInk: CAP })) {
        x.fillStyle = '#d8d0bf'; for (let j = 0; j < 5; j++) x.fillRect(-120, -90 + j * 40, 240 - (j % 2) * 60, 18)
        x.restore()
      }
      const k = pop01(t, P.t0 + 1.1, 0.3, 2.8)
      if (k > 0.01) label(x, 840, 940, 'SENT AS IS', k, { size: 40, bg: PINK, rot: -0.12, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Rested on a Sunday? | *Allowed.*', mood: lt => lt > 1.0 ? 'sleepy' : 'neutral', star: { x: -170 },
    front(x, t, lt, P) {
      if (sheet(x, 790, 800, 260, 240, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.04, bg: '#fff4e2', head: 'SUNDAY', headBg: LAV, headInk: INK })) {
        x.fillStyle = INK; x.font = `800 46px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('nothing.', 0, 40)
        x.restore()
      }
      label(x, 790, 1040, 'PERMISSION GRANTED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04 })
    } },
  { sign: S, cap: 'Profile now says | *“likes naps.”* Growth.', mood: lt => lt > 1.3 ? 'wink' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      if (sheet(x, 790, 840, 290, 380, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04, bg: '#2a2350' })) {
        x.fillStyle = '#140c30'; x.fillRect(-125, -170, 250, 200)
        x.fillStyle = BONE; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♑︎ CAPRICORN', 0, 70)
        x.restore()
        signChar(x, t, S, 790, 760, 140, { mood: 'sleepy', seed: 52, glyph: false, glow: 0.7 })
      }
      label(x, 790, 990, lt > 1.1 ? 'HOBBIES: NAPS' : 'HOBBIES: WORK', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 30, bg: lt > 1.1 ? GOLD : '#9aa5c4', rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Celebrate anyway. | You *earned it.*', mood: lt => lt > 1.0 ? 'heart' : 'sparkle', star: { x: -170 }, hops: [1.0, 1.6],
    front(x, t, lt, P) {
      drawBits(x, POPPER, { Y: GOLD, P: PINK }, 700, 1000, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0 })
      confetti(x, t, 790, 760, P.t0 + 0.9, { n: 26, spread: 220, h: 460 })
      label(x, 800, 720, 'WIN #1,000', pop01(t, P.t0 + 1.1, 0.3, 2.6), { size: 44, bg: CAP, rot: 0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0138', key: 'C', accent: CAP, solo: S, ending: 'group',
  title: 'Celebrate the small | wins, *Capricorn.*',
  cameos: CAMEOS,
  group: { cap: 'Every win counts. | *Even tiny ones.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
