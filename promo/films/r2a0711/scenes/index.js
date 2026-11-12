// r2a0711: star_advice, ADVICE SOLO, "How to give a Virgo | space." (signs3kit social cut, music: lofi · D, ending: callback)
// One sign the whole way (solo mode, 9 cards): a relatable Virgo truth + a warm reframe, one visual gag each.
//   0.0–3.6    "How to give a Virgo | *space.*"
//   3.6–37.8   nine cards: cleaning is thinking (the spray bottle) · let them tick their own list · leave tea, not
//              questions · slow reply = choosing kind words (draft 6) · sorting the bookshelf at midnight · the solo walk
//              isn't about you · plans changed? RECALCULATING · their chart says alone time · back from space? hug gently
//  37.8        "Space given. | *Love returned.*"
//  41.2        callback: "Last thing on the list? | *Call you.*"  The list comes back, and the last box ticks.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { phone, note, board, clock, zzz, chartWheel, friend, MUG, MUG_C, BOOK_C, CLOUD, CLOUD_C, RED, CREAM, GREEN, ORANGE, VIOLET, NIGHT } from './props.js'

const S = 'virgo', LIME = '#c7e07a'
const SPRAY = [
  '..KKK.....',
  '.KWWK.....',
  'KWWWKKKK..',
  '..KWWWWK..',
  '..KWWK....',
  '.BBBBBB...',
  'BBBBBBBB..',
  'BBbBBBBB..',
  'BBbBBBBB..',
  'BBbBBBBB..',
  'BBBBBBBB..',
  '.BBBBBB...',
]
const SPRAY_C = { K: INK, W: '#c9c9d8', B: SKYB, b: '#ffffff' }
// a row of book spines that shuffle into order
function shelf(x, t, cx, cy, k, sorted) {
  if (k <= 0.01) return
  const COLS = ['#ff6b5e', '#ffd23a', '#7dd87a', '#9ad7ff', '#b06bff', '#ff9ac0', '#ffb34a']
  const H = [150, 110, 170, 130, 160, 120, 140]
  const order = [3, 0, 5, 1, 6, 2, 4]
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-220, 90, 440, 26); x.fillStyle = '#c98f2a'; x.fillRect(-214, 94, 428, 16)
  for (let i = 0; i < 7; i++) {
    const from = order.indexOf(i), p = ease.inOutCubic(sorted)
    const px = -180 + lerp(from, i, p) * 60, h = lerp(H[from], 100 + i * 10, p)
    x.fillStyle = INK; x.fillRect(px - 26, 90 - h - 4, 52, h + 4); x.fillStyle = COLS[i]; x.fillRect(px - 22, 90 - h, 44, h)
    x.fillStyle = 'rgba(255,255,255,0.4)'; x.fillRect(px - 14, 90 - h + 14, 28, 6)
  }
  x.restore()
}
// a little path with footprints going off-panel
function path(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = '#5a4a8a'; x.beginPath(); x.moveTo(-60, 200); x.lineTo(60, 200); x.lineTo(20, -160); x.lineTo(-10, -160); x.fill()
  const n = Math.floor(clamp((lt - 0.4) / 1.4) * 6)
  for (let i = 0; i < n; i++) { x.fillStyle = BONE; x.fillRect((i % 2 ? 10 : -22), 160 - i * 55, 14, 22) }
  x.restore()
}
const LIST = (ticks, w = 330) => ({ title: 'TODAY', lines: ['clean desk', 'reply to mum', 'quiet walk', 'call you ♡'], ticks, w, head: LIME, strike: true })

const CAMEOS = [
  { sign: S, cap: 'Cleaning again? | *That’s how they think.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), squirt = Math.floor(lt * 3) % 2 === 0 && lt > 0.6 && lt < 1.6
      drawBits(x, SPRAY, SPRAY_C, 800, 860, 20 * k, { rot: -0.15 })
      if (squirt) { x.fillStyle = 'rgba(200,240,255,0.7)'; for (let i = 0; i < 8; i++) x.fillRect(700 - i * 18, 720 + Math.sin(i * 2) * 14, 10, 10) }
      sparkles(x, t, 620, 760, P.t0 + 1.1, 6, 110, 0.3)
      label(x, 800, 1100, 'THINKING… ✓', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: LIME, font: MONO, weight: 700, rot: -0.04 })
    } },
  { sign: S, cap: 'Don’t tick their list. | *Let them.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.0, 1.6, 2.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      note(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), { ...LIST(clamp((lt - 0.8) / 1.2) * 3.01) })
      label(x, 790, 1120, 'PURE JOY', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 34, bg: PINK, font: MONO, weight: 700, rot: 0.04 })
    } },
  { sign: S, cap: 'Quiet morning? | *Leave tea, not questions.*', mood: lt => lt > 1.2 ? 'sparkle' : 'sleepy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) { x.save(); x.translate(800, 900 + (1 - k) * -200); drawBits(x, MUG.slice(3), MUG_C, 0, 0, 22); x.fillStyle = 'rgba(255,255,255,0.5)'; for (let i = 0; i < 3; i++) x.fillRect(-60 + i * 36 + Math.sin(t * 3 + i) * 6, -110 - ((t * 40 + i * 20) % 40), 10, 30); x.restore() }
      label(x, 800, 1070, 'for you ♡', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: CREAM, rot: -0.06 })
      bubble(x, 800, 660, '(no small talk)', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 32, tail: 'bl', col: LAV })
    } },
  { sign: S, cap: 'Slow reply? | *They’re choosing kind words.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const d = 1 + Math.floor(clamp((lt - 0.3) / 1.2) * 5)
      phone(x, 790, 850, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: `DRAFT ${d}`, headCol: LIME, lines: [['hey! so…', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2)], ['typing…', LAV, lt < 1.5 ? 1 : 0], ['sent ♡', MINT, pop01(t, P.t0 + 1.6, 0.25, 2.2)]] })
    } },
  { sign: S, cap: 'Sorting books at midnight? | *Let them.*', mood: lt => lt > 1.5 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.6],
    front(x, t, lt, P) {
      shelf(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), prog(lt, 0.5, 1.5))
      clock(x, 790, 620, 0.6 * pop01(t, P.t0 + 0.4, 0.3, 2), 12, 0)
      label(x, 790, 1060, 'A TO Z. PEACE.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: LIME, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Solo walk? | *It’s not about you.*', mood: 'happy', look: [1, -1], star: { x: -200 }, hops: [0.7],
    back(x, t, lt, P) { path(x, t, 790, 900, pop01(t, P.t0 + 0.1, 0.3, 2), lt) },
    front(x, t, lt, P) {
      bubble(x, 790, 640, 'back by six ✓', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 790, 1130, 'ALSO: LOVES YOU', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: PINK, font: MONO, weight: 700, rot: -0.04 })
    } },
  { sign: S, cap: 'Plans changed? | *Give them a minute.*', mood: lt => lt > 1.5 ? 'happy' : 'wide', star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      board(x, 790, 800, k, { w: 300, h: 220, bg: CREAM, frame: LIME }, x => {
        x.font = `800 36px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.fillText('SAT 2 PM', 0, -40); x.fillStyle = RED; x.fillRect(-90, -42, 180 * clamp((lt - 0.4) / 0.4), 6)
        x.fillStyle = INK; if (lt > 1.4) x.fillText('SAT 4 PM', 0, 40)
      })
      label(x, 790, 1040, lt > 1.4 ? 'UPDATED ✓' : 'RECALCULATING…', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 32, bg: lt > 1.4 ? MINT : GOLD, font: MONO, weight: 700, rot: 0.04 })
    } },
  { sign: S, cap: 'Their chart says alone time. | *Believe it.*', mood: lt => lt > 1.3 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      chartWheel(x, t, 790, 820, 150, pop01(t, P.t0 + 0.2, 0.35, 2), { center: '♍︎' })
      label(x, 790, 1060, 'NEEDS: ME TIME', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: LIME, font: MONO, weight: 700, rot: -0.05 })
    } },
  { sign: S, cap: 'Back from their space? | *Hug them gently.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.2],
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 780, 930, 220, pop01(t, P.t0 + 0.4, 0.35, 2), { mood: lt > 1.2 ? 'heart' : 'happy', look: [-1, 0], hops: [P.t0 + 1.2] })
      hearts(x, t, 600, 820, P.t0 + 1.2, { n: 6, life: 1.8, spread: 260, cell: 7, seed: 5 })
      label(x, 600, 650, 'RECHARGED ✓', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, font: MONO, weight: 700, rot: 0.04 })
    } },
]

const F = makeFilm({
  id: 'r2a0711', key: 'D', accent: LIME, solo: S, ending: 'callback',
  title: 'How to give a Virgo | *space.*',
  cameos: CAMEOS,
  group: { cap: 'Space given. | *Love returned.*', mood: 'heart' },
  last: {
    text: 'Last thing on the list? | *Call you.*',
    draw(x, t, lt) {
      const t0 = t - lt
      note(x, 560, 1080, 1.25 * pop01(t, t0 + 0.4, 0.4, 2), { ...LIST(3 + clamp((lt - 1.4) / 0.4)), w: 340, rot: -0.03 })
      hearts(x, t, 560, 860, t0 + 1.8, { n: 8, life: 1.8, spread: 420, cell: 8, seed: 7 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
