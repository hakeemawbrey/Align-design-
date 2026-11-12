// r2a0371: star_advice, ADVICE SOLO (capricorn), "Capricorn, play | *is productive.*" (signs3kit social cut, music: lofi · D). Ending: lesson.
//   nine Capricorn truths, each with a warm reframe and one gag: scheduled fun still counts · a nap is not falling behind
//   · a hobby needs no business plan · the inbox will wait, the sunset won't · the dog walk is a meeting too
//   · goals can take a weekend off · silly is allowed, even for you · rest isn't earned, it's yours
//   · your match wants you, not a résumé
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', ACC = '#2fc79a', ORANGE = '#ffb34a'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })

/** a calendar event card: lines = [[text, size, colour?], …] */
function event(x, cx, cy, k, lines, { bg = MINT, rot = -0.04, w = 320, h = 220 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 14, w - 4, h - 8)
  x.fillStyle = INK; x.fillRect(-w / 2, -h / 2, w, h); x.fillStyle = CREAM; x.fillRect(-w / 2 + 8, -h / 2 + 8, w - 16, h - 16)
  x.fillStyle = bg; x.fillRect(-w / 2 + 8, -h / 2 + 8, 14, h - 16)
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([s, sz, col], i) => { x.font = `${sz > 30 ? 800 : 700} ${sz}px ${sz > 30 ? INTER : MONO}`; x.fillStyle = col || INK; x.fillText(s, -w / 2 + 40, -h / 2 + 50 + i * 56) })
  x.restore()
}
/** a crossed-out sticker swapped for a new one */
function swapLabel(x, cx, cy, lt, at, from, to, { size = 34, fromBg = '#9aa5c4', toBg = MINT } = {}) {
  if (lt < at) { L(x, cx, cy, from, 1, fromBg, -0.04, size); return }
  const p = clamp((lt - at) / 0.25)
  if (p < 1) {
    L(x, cx, cy, from, 1, fromBg, -0.04, size)
    x.save(); x.strokeStyle = RED; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); x.moveTo(cx - 150, cy + 10); x.lineTo(cx - 150 + 300 * p, cy - 10); x.stroke(); x.restore()
    return
  }
  L(x, cx, cy, to, pop01(lt, at + 0.3, 0.3, 2.4), toBg, 0.04, size)
}
/** a pixel battery filling up */
function battery(x, cx, cy, k, f) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -64, 260, 128); x.fillRect(130, -26, 24, 52)
  x.fillStyle = '#2a2350'; x.fillRect(-120, -54, 240, 108)
  const n = Math.round(clamp(f) * 5)
  for (let i = 0; i < 5; i++) { x.fillStyle = i < n ? (n >= 5 ? MINT : n >= 3 ? GOLD : RED) : '#3a3168'; x.fillRect(-110 + i * 44, -44, 38, 88) }
  x.restore()
}
/** a little canvas on an easel with a wobbly pixel painting */
function easel(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = '#8a4a2e'; x.fillRect(-90, 100, 14, 170); x.fillRect(76, 100, 14, 170); x.fillRect(-7, 100, 14, 190)
  x.fillStyle = INK; x.fillRect(-140, -130, 280, 240); x.fillStyle = CREAM; x.fillRect(-130, -120, 260, 220)
  x.fillStyle = SKYB; x.fillRect(-130, -120, 260, 110)
  x.fillStyle = '#5fd068'; x.fillRect(-130, -10, 260, 110)
  x.fillStyle = '#ffd23a'; x.fillRect(50, -96, 44, 44)
  x.fillStyle = PINK; for (let i = 0; i < 4; i++) x.fillRect(-110 + i * 50, 20 + (i % 2) * 18, 22, 22)
  x.restore()
}
/** a laptop, lid closing with lt */
function laptop(x, cx, cy, k, shut) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, 60, 300, 30); x.fillStyle = '#9aa5c4'; x.fillRect(-142, 64, 284, 20)
  const h = 190 * (1 - clamp(shut))
  if (h > 4) { x.fillStyle = INK; x.fillRect(-140, 60 - h, 280, h); x.fillStyle = '#6fc3ff'; x.fillRect(-128, 72 - h, 256, Math.max(0, h - 24)) ; if (h > 120) { x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('INBOX (99+)', 0, 60 - h / 2) } }
  x.restore()
}
/** a pixel sun low on the horizon */
function sunset(x, t, cx, cy, r, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const g = x.createRadialGradient(0, 0, r * 0.3, 0, 0, r * 2.2); g.addColorStop(0, 'rgba(255,150,90,0.6)'); g.addColorStop(1, 'rgba(255,120,120,0)')
  x.fillStyle = g; x.fillRect(-r * 2.2, -r * 2.2, r * 4.4, r * 4.4)
  const c = r / 6
  for (let j = -6; j <= 0; j++) { const w = Math.round(Math.sqrt(Math.max(0, 40 - j * j))); x.fillStyle = INK; x.fillRect(-(w + 1) * c, j * c, (2 * w + 2) * c, c + 0.5) }
  for (let j = -5; j <= 0; j++) { const w = Math.round(Math.sqrt(Math.max(0, 30 - j * j))); x.fillStyle = j < -3 ? '#ffd23a' : ORANGE; x.fillRect(-w * c, j * c, 2 * w * c, c + 0.5) }
  x.fillStyle = '#ff6b8a'; x.fillRect(-r * 2, 0, r * 4, 10); x.fillStyle = '#c97bff'; x.fillRect(-r * 1.6, 18, r * 3.2, 8)
  x.restore()
}
const DOG = ['K...........K..', 'KK.........KK..', 'KBBBBB....BBBK.', '.BBBBBB..BWBWB.', '.BBBBBBBBBBBBBP', '.BBBBBBBBBBBBB.', '.BBBBBBBBBB....', '.BB.BB..BB.BB..', '.BB.BB..BB.BB..']
const DOG_C = { K: '#5b2e1a', B: '#c98f5a', W: INK, P: PINK }
const HAT = ['....Y....', '...PPP...', '..PYPYP..', '..PPPPP..', '.PYPYPYP.', '.PPPPPPP.', 'YYYYYYYYY']
const CHAIR = ['.KKKKKKKKK.', 'KRRRRRRRRRK', 'KRRRRRRRRRK', 'KRRRRRRRRRK', 'KRRRRRRRRRK', 'KKRRRRRRRKK', 'KRKKKKKKKRK', 'KRRRRRRRRRK', 'KKKKKKKKKKK', '.K.......K.', '.K.......K.']
/** a sign-profile card: header, a little star, then rows */
function profile(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -180, 300, 380)
  x.fillStyle = INK; x.fillRect(-152, -196, 304, 384); x.fillStyle = '#2a2350'; x.fillRect(-144, -188, 288, 368)
  x.fillStyle = ACC; x.fillRect(-144, -188, 288, 52); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♑︎ PROFILE', 0, -162)
  x.restore()
  signChar(x, t, 'capricorn', cx, cy - 50, 130 * k, { mood: 'happy', seed: 31, glyph: false, glow: 0.7 })
}

const S = 'capricorn', ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Scheduled the fun? | That *still counts.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      event(x, 790, 800, pop01(t, P.t0 + 0.25, 0.3, 2), [['3:00 PM', 44], ['FUN', 34], ['(15 min)', 24, '#6b62a8']], { bg: PINK })
      L(x, 790, 1040, 'COUNTS ✓', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, 0.04, 40)
      sparkles(x, t, 790, 800, P.t0 + 1.35, 7, 190, 0.2)
    } },
  { sign: S, cap: 'A nap isn’t | *falling behind.*', mood: lt => lt < 1.5 ? 'sleepy' : 'sparkle', star: ST, hops: [1.6],
    front(x, t, lt, P) {
      battery(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), prog(lt, 0.3, 1.5))
      L(x, 790, 980, lt > 1.5 ? 'RECHARGED' : 'RECHARGING…', pop01(t, P.t0 + 0.4, 0.3, 2), lt > 1.5 ? MINT : BONE, 0.04, 32)
      bubble(x, 500, 610, 'zzz… still | on track', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 32, col: LAV, tail: 'bl' })
    } },
  { sign: S, cap: 'Your hobby doesn’t need | a *business plan.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      easel(x, t, 790, 800, pop01(t, P.t0 + 0.2, 0.35, 2))
      if (pop01(t, P.t0 + 0.5, 0.3, 2) > 0.5) swapLabel(x, 790, 1120, lt, 1.0, 'PROFIT: NONE', 'JOY: PLENTY', { size: 32, toBg: GOLD })
    } },
  { sign: S, cap: 'The inbox will wait. | *The sunset won’t.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    back(x, t, lt, P) { sunset(x, t, 790, 740, 70, pop01(t, P.t0 + 0.9, 0.4, 1.8)) },
    front(x, t, lt, P) {
      laptop(x, 790, 960, pop01(t, P.t0 + 0.2, 0.3, 2), prog(lt, 0.6, 1.2))
      L(x, 790, 1140, 'OUT FOR SUNSET', pop01(t, P.t0 + 1.5, 0.3, 2.4), ORANGE, -0.04, 30)
    } },
  { sign: S, cap: 'Walking the dog | is *a meeting too.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      drawBits(x, DOG, DOG_C, 800, 960 - Math.abs(Math.sin(lt * 5)) * 20, 16 * k)
      event(x, 790, 700, pop01(t, P.t0 + 0.7, 0.3, 2), [['MEETING:', 26], ['GOOD BOY', 40]], { bg: GOLD, w: 330, h: 160 })
      hearts(x, t, 800, 900, P.t0 + 1.4, { n: 4, life: 1.5, spread: 160, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Your goals can | *take a weekend off.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      event(x, 790, 790, pop01(t, P.t0 + 0.2, 0.3, 2), [['GOALS', 40], ['1. everything', 24], ['2. more', 24]], { bg: RED, rot: 0.03 })
      L(x, 790, 1030, 'OUT OF OFFICE', pop01(t, P.t0 + 1.2, 0.3, 2.6), SKYB, -0.08, 40)
      L(x, 790, 1120, 'BACK MONDAY', pop01(t, P.t0 + 1.6, 0.3, 2.2), BONE, 0.04, 26)
    } },
  { sign: S, cap: 'Silly is allowed. | *Even for you.*', mood: lt => lt > 1.1 ? 'wink' : 'wide', star: { x: -120, s: 320 }, hops: [1.1, 1.7],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      const d = ease.outCubic(prog(lt, 0.4, 0.9))
      if (lt > 0.35) drawBits(x, HAT, { Y: GOLD, P: PINK }, F.x + 6, lerp(480, F.top - 40, d), 14, { rot: 0.12 })
      L(x, 790, 900, 'CEO OF SILLY', pop01(t, P.t0 + 1.1, 0.3, 2.4), GOLD, 0.05, 40)
      sparkles(x, t, F.x, F.top, P.t0 + 1.0, 7, 160, 0.4, [GOLD, PINK, MINT])
    } },
  { sign: S, cap: 'Rest isn’t earned. | *It’s just yours.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: { x: -150, y: 10 },
    back(x, t, lt, P, F) { drawBits(x, CHAIR, { K: INK, R: '#6b62a8' }, F.x, 980, 26 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      L(x, 790, 760, 'RECEIPT NEEDED?', pop01(t, P.t0 + 0.5, 0.3, 2), BONE, -0.04, 30)
      L(x, 790, 860, 'NOPE.', pop01(t, P.t0 + 1.2, 0.3, 2.6), MINT, 0.05, 56)
    } },
  { sign: S, cap: 'Your match wants *you.* | Not a résumé.', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      profile(x, t, 790, 830, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      if (pop01(t, P.t0 + 0.4, 0.3, 2) > 0.5) swapLabel(x, 790, 950, lt, 1.0, 'HOBBIES: WORK', 'HOBBIES: KITES', { size: 30, toBg: PINK })
      hearts(x, t, 790, 760, P.t0 + 1.5, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2a0371', key: 'D', accent: ACC, solo: 'capricorn', ending: 'lesson',
  title: 'Capricorn, play | *is productive.*',
  cameos: CAMEOS,
  group: { cap: 'Ambitious. | And *allowed to play.*', mood: 'sparkle' },
  lesson: { text: 'Play is part | of *the plan.*', chip: 'STATUS: OFF THE CLOCK' },
  last: {
    text: 'Go play. | It’s *on the schedule.*',
    draw(x, t, lt) {
      const t0 = t - lt
      event(x, 540, 1200, pop01(t, t0 + 0.6, 0.35, 2), [['NOW', 44], ['PLAY ✓', 34]], { bg: PINK, w: 300, h: 180 })
      hearts(x, t, 540, 1250, t0 + 0.9, { n: 8, life: 2.0, spread: 600, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
