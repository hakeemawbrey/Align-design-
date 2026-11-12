// r2t0096: star_talk, SOLO film, "Your Leo coworker | be like." (~46 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole film (makeFilm solo mode, 9 cards): the Leo at work, every trait pushed to the extreme. Ending: callback.
//   0.0–3.6    "Your Leo coworker | *be like.*"
//   3.6–37.8   replied-all to "thanks" with a speech · camera on, ring light on · bedazzled name tag · signed the group card
//              (took the whole card) · office chair is a throne now · employee of the month, self-nominated · two-minute
//              stand-up took twenty · their mug has their sign in gold · someone doubted you, Leo objected
//  37.8        "Main character | *of the office.*"
//  41.2        CALLBACK: "Meeting’s over. | Leo *took a bow.*"  the stand-up timer, still running, and a bow.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', CREAM = '#fff4e2'

function card(x, cx, cy, w, h, col, { rot = 0, k = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  x.restore()
}
function text(x, s, cx, cy, size, col = INK, font = INTER, weight = 800, rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.fillStyle = col; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, 0, 0); x.restore()
}
// an email window: "thanks!" and then Leo's reply-all, a wall of text that keeps scrolling
function email(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  card(x, cx, cy, 340, 420, CREAM, { k, rot: 0.03 })
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.fillStyle = '#6b62a8'; x.fillRect(-170, -210, 340, 50); text(x, 'RE: thanks!', 0, -185, 26, CREAM, MONO, 700)
  x.save(); x.beginPath(); x.rect(-150, -150, 300, 340); x.clip()
  const n = Math.floor(clamp((lt - 0.4) / 1.6) * 22), sc = Math.max(0, n - 9) * 30
  for (let i = 0; i < n; i++) { x.fillStyle = i % 5 === 0 ? ORANGE : '#9aa5c4'; x.fillRect(-140, -140 + i * 30 - sc, 280 - ((i * 53) % 110), 14) }
  x.restore(); x.restore()
}
// a ring light: a glowing white halo
function ringLight(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-8, 150, 16, 220)
  x.shadowColor = '#fffbe8'; x.shadowBlur = 50
  x.lineWidth = 46; x.strokeStyle = INK; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.stroke()
  x.lineWidth = 32; x.strokeStyle = '#fffbe8'; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.stroke()
  x.restore()
}
// the bedazzled name tag
function nameTag(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  card(x, cx, cy, 330, 220, '#fff', { k, rot: -0.05 })
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = RED; x.fillRect(-165, -110, 330, 66); text(x, 'HELLO, I AM', 0, -77, 30, '#fff')
  text(x, 'LEO', 0, 30, 96, ORANGE)
  const n = Math.floor(clamp((lt - 0.6) / 1.0) * 18)
  for (let i = 0; i < n; i++) { const a = i / 18 * Math.PI * 2; x.fillStyle = [GOLD, PINK, SKYB][i % 3]; x.fillRect(Math.cos(a) * 150 - 7, 10 + Math.sin(a) * 92 - 7, 14, 14) }
  x.restore()
}
// the group birthday card: tiny signatures, one enormous one
function groupCard(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  card(x, cx, cy, 340, 400, '#ffe1ec', { k, rot: 0.04 })
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  text(x, 'HAPPY B-DAY, SAM', 0, -165, 24, '#6b62a8', MONO, 700)
  const small = ['– jo', '– ana', '– mo']
  small.forEach((s, i) => text(x, s, -100 + i * 100, -120, 22, '#6b62a8', INTER, 700))
  const g = ease.outBack ? ease.outBack(clamp((lt - 0.8) / 0.5)) : clamp((lt - 0.8) / 0.5)
  if (lt > 0.8) {
    x.save(); x.translate(0, 40); x.rotate(-0.12); x.scale(g, g)
    text(x, 'LOVE,', 0, -70, 44, ORANGE); text(x, 'LEO', 0, 30, 140, ORANGE); text(x, '♡ ♡ ♡', 0, 120, 40, PINK)
    x.restore()
  }
  x.restore()
}
const THRONE = [
  '.Y.......Y.',
  'YYY.....YYY',
  'YRY.....YRY',
  'YRYYYYYYYRY',
  'YRRRRRRRRRY',
  'YRRRRRRRRRY',
  'YRRRRRRRRRY',
  'YYYYYYYYYYY',
  'YRRRRRRRRRY',
  'YYYYYYYYYYY',
  '.K.K...K.K.',
  '.K.K...K.K.',
]
const THRONE_C = { Y: GOLD, R: '#b5283a', K: INK }
// a ballot slip: NOMINEE: ME
function ballot(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  card(x, cx, cy, 320, 300, CREAM, { k, rot: -0.04 })
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  text(x, 'EMPLOYEE OF', 0, -105, 30, INK); text(x, 'THE MONTH', 0, -68, 30, INK)
  x.fillStyle = '#9aa5c4'; x.fillRect(-130, -30, 260, 4)
  text(x, 'NOMINEE:', -40, 20, 30, '#6b62a8', MONO, 700)
  if (lt > 0.9) text(x, 'ME', 100, 20, 42, RED)
  text(x, 'SECONDED BY:', -20, 90, 26, '#6b62a8', MONO, 700)
  if (lt > 1.4) text(x, 'ME', 120, 90, 34, RED)
  x.restore()
}
const MUG = ['WWWWWWWW...', 'WWWWWWWWWWW', 'WWWWWWWW..W', 'WWWWWWWW..W', 'WWWWWWWW..W', 'WWWWWWWWWWW', 'WWWWWWWW...', '.WWWWWW....']
// a timer chip that keeps counting
function timer(x, cx, cy, k, mins, bg = GOLD) { label(x, cx, cy, `STAND-UP: ${mins} MIN`, k, { size: 34, bg, rot: -0.04, font: MONO, weight: 700 }) }

const S = 'leo'
const CAMEOS = [
  { sign: S, cap: 'Replied-all to “thanks” | with *a speech.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.2],
    front(x, t, lt, P) {
      email(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), lt)
      label(x, 790, 1110, 'REPLY ALL ×1', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Camera on. | *Ring light on.*', mood: 'sparkle', star: { x: -190 }, hops: [0.9],
    back(x, t, lt, P) { ringLight(x, t, 820, 820, pop01(t, P.t0 + 0.2, 0.35, 2)) },
    front(x, t, lt, P) {
      label(x, 820, 1110, '9AM CALL', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 36, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 400, 630, 'can you | see me?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'bc' })
      sparkles(x, t, 400, 880, P.t0 + 0.9, 7, 170, 0.2)
    } },
  { sign: S, cap: 'Name tag? | *Bedazzled.*', mood: lt => lt > 1.4 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      nameTag(x, t, 800, 860, pop01(t, P.t0 + 0.15, 0.35, 2), lt)
      sparkles(x, t, 800, 860, P.t0 + 1.5, 8, 200, 0.5)
      bubble(x, 800, 1110, 'it’s branding', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Signed the group card. | Took *the whole card.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) { groupCard(x, 800, 860, pop01(t, P.t0 + 0.15, 0.35, 2), lt) } },
  { sign: S, cap: 'Office chair? | *A throne now.*', mood: 'sparkle', star: { x: -160, y: -30 }, hops: [1.0],
    back(x, t, lt, P) { drawBits(x, THRONE, THRONE_C, 380, 900, 34 * pop01(t, P.t0 + 0.15, 0.35, 2)) },
    front(x, t, lt, P) {
      label(x, 800, 760, 'DESK 4B', pop01(t, P.t0 + 0.7, 0.3, 2.4), { size: 40, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 800, 1020, 'HR said | it’s fine', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Employee of the month? | *Self-nominated.*', mood: lt => lt > 1.4 ? 'wink' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      ballot(x, 800, 860, pop01(t, P.t0 + 0.15, 0.35, 2), lt)
      label(x, 800, 1100, 'VOTES: 1 (MINE)', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Two-minute stand-up. | Took *twenty.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: { x: -170 }, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      const m = 2 + Math.floor(clamp((lt - 0.4) / 1.6) * 18)
      timer(x, 740, 680, pop01(t, P.t0 + 0.3, 0.3, 2), m, m >= 20 ? RED : GOLD)
      bubble(x, 800, 900, 'and ANOTHER | thing…', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, tail: 'bl' })
      if (lt > 1.3) signChar(x, t, 'capricorn', 820, 1110, 130, { mood: 'sleepy', seed: 31, glyph: false })
    } },
  { sign: S, cap: 'Their mug has | their sign *in gold.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.35, 2)
      drawBits(x, MUG, { W: CREAM }, 800, 880, 30 * k)
      if (k > 0.6) { x.save(); x.globalAlpha = clamp((k - 0.6) * 2.5); text(x, '♌︎', 770, 880, 170, '#e0a21c', "'Segoe UI Symbol', 'Noto Sans Symbols', serif", 700); x.restore() }
      sparkles(x, t, 780, 880, P.t0 + 1.0, 7, 170, 0.3)
      label(x, 800, 650, 'DO NOT TOUCH', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: RED, color: CREAM, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Someone doubted you? | Leo *objected.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: { x: -190 }, hops: [0.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 820, 1000, 200 * k, { mood: lt > 1.4 ? 'heart' : 'neutral', look: [-1, 0], seed: 17, glyph: false, hops: [P.t0 + 1.9] })
      bubble(x, 560, 640, 'OBJECTION! | they’re great', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, tail: 'bl' })
      hearts(x, t, 820, 880, P.t0 + 1.8, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'r2t0096', key: 'C', accent: ORANGE, solo: S, ending: 'callback',
  title: 'Your Leo coworker | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Main character | *of the office.*', mood: 'sparkle' },
  last: {
    text: 'Meeting’s over. | Leo *took a bow.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      const bow = lt > 1.4 && lt < 2.4 ? Math.sin(Math.PI * (lt - 1.4)) : 0
      if (k > 0.01) {
        x.save(); x.translate(540, 1180); x.rotate(-0.0); x.translate(-540, -1180)
        signChar(x, t, 'leo', 540, 1060 + bow * 40, 300 * k, { mood: bow > 0.2 ? 'squint' : 'sparkle', seed: 40, squash: bow * 0.18 })
        x.restore()
      }
      timer(x, 540, 1340, pop01(t, t - lt + 0.8, 0.3, 2.2), 47, RED)
      sparkles(x, t, 540, 1000, t - lt + 1.5, 8, 220, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
