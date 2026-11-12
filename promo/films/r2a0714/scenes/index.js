// r2a0714: star_advice, ADVICE SOLO, "Scorpio, your sign | to slow down." (signs3kit social cut, music: lofi · E, ending: callback)
// One sign the whole way (solo mode, 9 cards): a relatable Scorpio truth + a warm reframe, one visual gag each.
//   0.0–3.6    "Scorpio, your sign | *to slow down.*"
//   3.6–37.8   nine cards: reading the room nonstop? read a book · replaying that convo? pause it · not everything needs
//              investigating (case closed) · long bath, phone in another room · new match? let it unfold (no rush)
//              · a slow walk with a snail for a pace-setter · a nap is a power move · your chart says rest is allowed
//              · you don't have to win the staring contest with the moon
//  37.8        "Intense heart. | *Gentle pace.*"
//  41.2        callback: "The snail? | *Got there first.*"  The snail crosses a little finish line.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { phone, note, board, bed, pauseBtn, planet, chartWheel, zzz, BOOK, BOOK_C, MAGNIFIER, MAGNIFIER_C, SNAIL, SNAIL_C, RED, CREAM, GREEN, ORANGE, VIOLET, NIGHT } from './props.js'

const S = 'scorpio', ROSE = '#ff5e8a'
// a bathtub full of bubbles
function tub(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.roundRect(-290, -40, 580, 170, 40); x.fill()
  x.fillStyle = '#f4f2ff'; x.beginPath(); x.roundRect(-280, -30, 560, 150, 34); x.fill()
  for (let i = 0; i < 11; i++) { const bx = -250 + i * 50, by = -40 - 20 * Math.abs(Math.sin(i * 1.7)) + 6 * Math.sin(t * 2 + i); x.fillStyle = INK; x.beginPath(); x.arc(bx, by, 34, 0, Math.PI * 2); x.fill(); x.fillStyle = '#e8f4ff'; x.beginPath(); x.arc(bx, by, 28, 0, Math.PI * 2); x.fill(); x.fillStyle = '#ffffff'; x.fillRect(bx - 12, by - 14, 8, 8) }
  x.fillStyle = INK; x.fillRect(-240, 120, 30, 40); x.fillRect(210, 120, 30, 40)
  x.restore()
}
// a finish line with a flag
function finish(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-6, -200, 12, 220)
  for (let j = 0; j < 4; j++) for (let i = 0; i < 6; i++) { x.fillStyle = (i + j) % 2 ? INK : BONE; x.fillRect(6 + i * 22, -200 + j * 22, 22, 22) }
  x.fillStyle = BONE; for (let j = 0; j < 10; j++) x.fillRect(-90 + (j % 2) * 14, -10 + j * 0, 0, 0)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Reading the room nonstop? | *Read a book.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, BOOK, BOOK_C, 790, 860, 24 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: -0.08 })
      label(x, 790, 1070, 'ROOM: UNREAD', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: LAV, font: MONO, weight: 700, rot: 0.04 })
    } },
  { sign: S, cap: 'Replaying that convo? | *Hit pause.*', mood: lt => lt > 1.2 ? 'sleepy' : 'wide', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.2) / 0.9) * 14) + 1
      label(x, 790, 650, lt > 1.1 ? 'REPLAY: PAUSED' : `REPLAY #${n}`, pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 34, bg: lt > 1.1 ? MINT : ROSE, font: MONO, weight: 700, rot: 0.04 })
      pauseBtn(x, 790, 880, pop01(t, P.t0 + 1.0, 0.35, 2.2))
    } },
  { sign: S, cap: 'Not everything needs | *investigating.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 1], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      const down = ease.inOutCubic(prog(lt, 0.8, 1.4))
      drawBits(x, MAGNIFIER, MAGNIFIER_C, lerp(760, 800, down), lerp(780, 980, down), 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lerp(-0.4, 1.4, down) })
      label(x, 790, 650, 'CASE CLOSED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: GOLD, font: MONO, weight: 700, rot: -0.05 })
    } },
  { sign: S, cap: 'Long bath. | *Phone in another room.*', mood: 'sleepy', star: { x: -40, y: -60, s: 240 },
    back(x, t, lt, P) { tub(x, t, 540, 1020, pop01(t, P.t0 + 0.1, 0.35, 2)) },
    front(x, t, lt, P, F) {
      zzz(x, t, F.x + 100, F.cy - 110)
      label(x, 770, 620, 'PHONE: ELSEWHERE', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 30, bg: SKYB, font: MONO, weight: 700, rot: 0.05 })
    } },
  { sign: S, cap: 'New match? | *Let it unfold slowly.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 840, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ NEW MATCH', headCol: ROSE, lines: [['hey :)', BONE, pop01(t, P.t0 + 0.6, 0.25, 2.2)], ['hi! no rush ♡', MINT, pop01(t, P.t0 + 1.5, 0.25, 2.2)]] })
      label(x, 790, 1110, 'NO RUSH ✓', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 34, bg: GOLD, font: MONO, weight: 700, rot: -0.04 })
    } },
  { sign: S, cap: 'A slow walk. | *Let the snail lead.*', mood: 'happy', look: [1, 1], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, SNAIL, SNAIL_C, lerp(700, 800, prog(lt, 0.3, 2.4)), 1060, 18 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 790, 700, 'SPEED: SNAIL', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 36, bg: MINT, font: MONO, weight: 700, rot: 0.04 })
      bubble(x, 830, 900, 'nice day ♡', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: S, cap: 'A nap is | *a power move.*', mood: 'sleepy', star: { x: -120, y: -40, s: 260 },
    back(x, t, lt, P) { bed(x, 540, 1020, 0.9 * pop01(t, P.t0 + 0.1, 0.35, 2), { blanket: ROSE }) },
    front(x, t, lt, P, F) {
      zzz(x, t, F.x + 110, F.cy - 100)
      label(x, 790, 640, 'POWER: RESTORED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: GOLD, font: MONO, weight: 700, rot: 0.05 })
    } },
  { sign: S, cap: 'Your chart says | *rest is allowed.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      chartWheel(x, t, 790, 820, 150, pop01(t, P.t0 + 0.2, 0.35, 2), { center: '♏︎', spin: 0.05 })
      label(x, 790, 1060, 'PERMISSION: GRANTED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 28, bg: ROSE, font: MONO, weight: 700, rot: -0.04 })
    } },
  { sign: S, cap: 'Staring down the moon? | *Let it win.*', mood: lt => lt > 1.4 ? 'sleepy' : 'wide', look: [1, -1], star: { x: -200 },
    front(x, t, lt, P) {
      planet(x, 800, 760, 100, pop01(t, P.t0 + 0.2, 0.35, 2), { body: '#fff1c8', crater: '#e8d8a0', face: lt > 1.4 ? 'shy' : 'sad' })
      label(x, 760, 1020, lt > 1.4 ? 'MOON WINS. NIGHT ♡' : 'NOT BLINKING…', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 28, bg: LAV, font: MONO, weight: 700, rot: 0.04 })
    } },
]

const F = makeFilm({
  id: 'r2a0714', key: 'E', accent: ROSE, solo: S, ending: 'callback',
  title: 'Scorpio, your sign | *to slow down.*',
  cameos: CAMEOS,
  group: { cap: 'Intense heart. | *Gentle pace.*', mood: 'happy' },
  last: {
    text: 'The snail? | *Got there first.*',
    draw(x, t, lt) {
      const t0 = t - lt
      finish(x, 780, 1300, 1.6 * pop01(t, t0 + 0.3, 0.35, 2))
      drawBits(x, SNAIL, SNAIL_C, lerp(300, 860, ease.inOutCubic(prog(lt, 0.5, 2.4))), 1240, 30 * pop01(t, t0 + 0.4, 0.35, 2))
      if (lt > 2.4) { sparkles(x, t, 860, 1150, t0 + 2.4, 8, 160, 0.3); label(x, 520, 1060, 'WINNER ♡', pop01(t, t0 + 2.4, 0.3, 2.4), { size: 40, bg: GOLD, font: MONO, weight: 700, rot: -0.05 }) }
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
