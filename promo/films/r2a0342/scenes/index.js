// r2a0342: star_advice, ADVICE SOLO, "Aries, it's okay | to start over." (~50 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Aries truth + a warm reframe, one light gag each.
//   0.0–3.6    "Aries, it’s okay | *to start over.*"  One big Aries pops in, then dives away.
//   3.6–37.8   nine cards (3.8 s each):
//              quit the guitar on day seven · the first pancake came out charcoal · a hot-headed moment, a tiny white flag
//              · the gym plan fell off, Monday is circled again · a wrong turn at full speed, "recalculating…"
//              · forty tabs of new ideas, one lights up · draft one in a crumpled pile, draft two on a fresh page
//              · lost the game, the rematch is at noon · a moving box marked NEW START
//  37.8        "Fresh starts? | *Your specialty.*"  The big Aries comes back.
//  41.2        callback: "The second pancake? | *Perfect.*" (the charcoal pancake, paid off).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#ff6b5a', WOOD = '#8a4a2e', PAPER = '#fff4e2'

// ── props
const GUITAR = [
  '..........KK',
  '.........KK.',
  '........WW..',
  '.......WW...',
  '......WW....',
  '..OOOWW.....',
  '.OOOOOOO....',
  'OOOOKKOOO...',
  'OOOKKKKOO...',
  'OOOOKKOOO...',
  '.OOOOOOO....',
  '..OOOOO.....',
]
const GUITAR_C = { K: INK, W: WOOD, O: '#ffb34a' }
const PAN = [
  '.KKKKKKKKK.......',
  'KKKKKKKKKKK......',
  'KKKKKKKKKKKHHHHHH',
  '.KKKKKKKKK.......',
]
const PAN_C = { K: '#4a4470', H: WOOD }
const FLAG = [
  'P.........',
  'PWWWWWWW..',
  'PWWWWWWWW.',
  'PWWWWWWW..',
  'P.........',
  'P.........',
  'P.........',
  'P.........',
]
const FLAG_C = { P: WOOD, W: '#ffffff' }
const CHECKER = [
  'P.........',
  'PKWKWKWK..',
  'PWKWKWKW..',
  'PKWKWKWK..',
  'PWKWKWKW..',
  'P.........',
  'P.........',
  'P.........',
]
const CHECKER_C = { P: '#c9c2e6', K: INK, W: '#ffffff' }
const BOX = [
  'TTTTT.TTTTT',
  'BBBBBBBBBBB',
  'BBBBBBBBBBB',
  'BBBBBBBBBBB',
  'BBBBBBBBBBB',
  'BBBBBBBBBBB',
  'BBBBBBBBBBB',
  'BBBBBBBBBBB',
]
const BOX_C = { T: '#c9744a', B: '#e8a24a' }
const BALL = ['.WWW.', 'WWLWW', 'WLWWW', 'WWWLW', '.WWW.']
const BALL_C = { W: PAPER, L: '#c9c2e6' }

/** a card with ink border and drop shadow; fn draws inside (origin at the card's centre) */
function card(x, cx, cy, w, h, k, rot, bg, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  fn(); x.restore()
}
const txt = (x, s, X, Y, size, col = INK, font = INTER, w = 800, align = 'center') => { x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, X, Y) }
/** a pan with a pancake: burnt (0) or golden (1) */
function pancake(x, cx, cy, k, gold) {
  if (k <= 0.01) return
  drawBits(x, PAN, PAN_C, cx + 60 * k, cy, 20 * k)
  x.save(); x.translate(cx - 50 * k, cy - 24 * k); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 92, 30, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = gold ? '#f2b65c' : '#3a2a2a'; x.beginPath(); x.ellipse(0, 0, 86, 24, 0, 0, Math.PI * 2); x.fill()
  if (gold) { x.fillStyle = '#ffe7a8'; x.beginPath(); x.ellipse(-20, -6, 30, 8, 0, 0, Math.PI * 2); x.fill() }
  x.restore()
}

const S = 'aries'
const CAMEOS = [
  { sign: S, cap: 'Quit on day seven? | *Three chords count.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, GUITAR, GUITAR_C, 760, 950, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.2 })
      label(x, 800, 680, 'DAY 7', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 44, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 1150, 'CHORDS: 3 ✓', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'First pancake burnt? | *Flip the next one.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      pancake(x, 650, 1000, 1.3 * pop01(t, P.t0 + 0.2, 0.3, 2), 0)
      if (lt > 0.4) { x.save(); x.globalAlpha = 0.45; x.fillStyle = '#9aa5c4'; for (let i = 0; i < 3; i++) { const yy = 900 - ((lt * 60 + i * 40) % 120); x.fillRect(620 + i * 50, yy - 20, 26, 26) } x.restore() }
      bubble(x, 780, 680, 'it’s… crispy.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: S, cap: 'Lost your temper? | *Sorry is a fresh start.*', mood: lt => lt < 0.9 ? 'squint' : lt > 1.5 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      if (lt < 1.0) { x.save(); x.globalAlpha = 0.6 * (1 - lt); x.fillStyle = BONE; for (const d of [-1, 1]) { x.beginPath(); x.arc(F.x + d * 70, F.top - 30 - lt * 60, 26 + lt * 20, 0, Math.PI * 2); x.fill() } x.restore() }
      drawBits(x, FLAG, FLAG_C, 790, 980, 20 * pop01(t, P.t0 + 1.0, 0.3, 2.2), { rot: 0.1 * Math.sin(t * 6) })
      bubble(x, 800, 700, 'sorry. | my bad.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 44, col: PINK, tail: 'bl' })
    } },
  { sign: S, cap: 'Fell off the gym plan? | *Monday’s still there.*', mood: lt => lt > 1.3 ? 'sparkle' : 'sleepy', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      const c = ease.outCubic(prog(lt, 0.9, 1.4))
      card(x, 790, 880, 330, 300, pop01(t, P.t0 + 0.2, 0.3, 2), 0.04, PAPER, () => {
        x.fillStyle = RED; x.fillRect(-165, -150, 330, 60); txt(x, 'THIS WEEK', 0, -120, 30, INK, MONO, 700)
        const D = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
        D.forEach((d, i) => txt(x, d, -130 + (i % 4) * 86, -40 + Math.floor(i / 4) * 100, 44, i === 0 ? RED : '#6b62a8'))
        if (c > 0) { x.save(); x.strokeStyle = RED; x.lineWidth = 7; x.beginPath(); x.arc(-130, -40, 40, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * c); x.stroke(); x.restore() }
      })
      label(x, 790, 1110, 'TRY AGAIN: BOOKED', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.04 })
    } },
  { sign: S, cap: 'Wrong turn, full speed? | *Recalculating is fine.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      card(x, 790, 860, 330, 330, pop01(t, P.t0 + 0.2, 0.3, 2), -0.04, '#2a2350', () => {
        x.strokeStyle = '#6b62a8'; x.lineWidth = 16
        x.beginPath(); x.moveTo(-120, 130); x.lineTo(-120, -20); x.lineTo(120, -20); x.stroke()
        x.beginPath(); x.moveTo(-120, -20); x.lineTo(-120, -130); x.stroke()
        x.strokeStyle = MINT; x.lineWidth = 8; x.setLineDash([16, 12])
        x.beginPath(); x.moveTo(-120, 130); x.lineTo(-120, -20); x.lineTo(lerp(-120, 120, clamp(lt / 1.2)), -20); x.stroke(); x.setLineDash([])
        x.fillStyle = RED; x.beginPath(); x.arc(-120, -130, 20, 0, Math.PI * 2); x.fill()
      })
      label(x, 790, 640, 'RECALCULATING…', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Forty tabs of new ideas? | *Pick one. Go.*', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(740, 860); x.scale(1.05 * k, 1.05 * k)
        for (let i = 0; i < 8; i++) {
          const on = lt > 1.3 && i === 5
          x.fillStyle = INK; x.fillRect(-170 + i * 8 - 4, -150 + i * 34 - 4, 300 + 8, 64)
          x.fillStyle = on ? GOLD : ['#9aa5c4', '#c9c2e6'][i % 2]; x.fillRect(-170 + i * 8, -150 + i * 34, 300, 56)
          txt(x, on ? '★ THIS ONE' : `idea #${i + 1}`, -150 + i * 8, -122 + i * 34, 24, INK, MONO, 700, 'left')
        }
        x.restore()
      }
      sparkles(x, t, 790, 920, P.t0 + 1.7, 6, 170, 0.4)
    } },
  { sign: S, cap: 'Scrapped draft one? | *Draft two is braver.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) drawBits(x, BALL, BALL_C, 640 + (i % 3) * 70, 1120 - Math.floor(i / 3) * 56, 18 * pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2))
      card(x, 850, 850, 230, 300, pop01(t, P.t0 + 1.0, 0.3, 2.2), 0.06, PAPER, () => {
        txt(x, 'DRAFT 2', 0, -110, 30, RED, MONO, 700)
        x.fillStyle = '#c9c2e6'; for (let i = 0; i < 5; i++) x.fillRect(-90, -60 + i * 36, i === 4 ? 100 : 180, 10)
      })
    } },
  { sign: S, cap: 'Lost the game? | *Rematch at noon.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, CHECKER, CHECKER_C, 820, 960, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 * Math.sin(t * 5) })
      label(x, 790, 660, 'REMATCH: 12:00', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 38, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'New city, new job? | *Brave suits you.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, BOX, BOX_C, 790, 1010, 26 * k)
      if (k > 0.8) txt(x, 'NEW START', 790, 1020, 40, INK)
      hearts(x, t, 790, 860, P.t0 + 1.2, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2a0342', key: 'F', accent: RED, solo: 'aries', ending: 'callback',
  title: 'Aries, it’s okay | *to start over.*',
  cameos: CAMEOS,
  group: { cap: 'Fresh starts? | *Your specialty.*', mood: 'sparkle' },
  last: {
    text: 'The second pancake? | *Perfect.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'aries', 380, 1120, 300 * k, { mood: lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], seed: 12, hops: [t - lt + 1.3] })
      pancake(x, 680, 1180, 1.5 * pop01(t, t - lt + 0.7, 0.35, 2), 1)
      sparkles(x, t, 680, 1150, t - lt + 1.1, 6, 150, 0.4)
      label(x, 660, 1010, '10/10', pop01(t, t - lt + 1.3, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.06, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
