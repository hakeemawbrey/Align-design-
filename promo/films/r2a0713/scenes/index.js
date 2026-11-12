// r2a0713: star_advice, ADVICE SOLO, "Signs a Pisces | likes you." (signs3kit social cut, music: lofi · C, ending: card)
// One sign the whole way (solo mode, 9 cards; Pisces cries in every one): a relatable sign they like you + a warm reframe.
//   0.0–3.6    "Signs a Pisces | *likes you.*"
//   3.6–37.8   nine cards: a playlist for you (a love letter) · cried at your story (felt it with you) · remembers your
//              dream from weeks ago · a little doodle of you · checked your compatibility, twice · saved you the window
//              seat · daydreams mid-sentence · "this cloud reminded me of you" · asked your sign on day one
//  37.8        "Soft heart. | *Big feelings.*"
//  41.0        LESSON: "Soft heart, big love. | Let it *in.*"  STATUS: SMITTEN
//  46.9        "Second date? | *Already planned.*" over the match card: Pisces + Cancer (the story they cried at together).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { phone, note, board, chartWheel, friend, CLOUD, CLOUD_C, HEARTCLOUD, RED, CREAM, ORANGE, VIOLET, NIGHT } from './props.js'

const S = 'pisces', SEA = '#a99bff'
// a thought bubble with a tiny scene inside
function thought(x, t, cx, cy, k, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 176, 126, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#f4f2ff'; x.beginPath(); x.ellipse(0, 0, 168, 118, 0, 0, Math.PI * 2); x.fill()
  for (const [a, b, r] of [[-170, 130, 22], [-210, 180, 13]]) { x.fillStyle = INK; x.beginPath(); x.arc(a, b, r + 6, 0, Math.PI * 2); x.fill(); x.fillStyle = '#f4f2ff'; x.beginPath(); x.arc(a, b, r, 0, Math.PI * 2); x.fill() }
  fn && fn(x)
  x.restore()
}
// a window with the moon and a seat
function windowSeat(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -170, 300, 260); x.fillStyle = '#2a3a7a'; x.fillRect(-138, -158, 276, 236)
  x.fillStyle = '#fff1c8'; x.beginPath(); x.arc(50, -80, 40, 0, Math.PI * 2); x.fill()
  x.fillStyle = BONE; for (let i = 0; i < 6; i++) x.fillRect(-120 + i * 44, -140 + (i * 37) % 120, 6, 6)
  x.fillStyle = INK; x.fillRect(-6, -158, 12, 236); x.fillRect(-138, -46, 276, 12)
  x.fillStyle = INK; x.fillRect(-170, 100, 340, 80); x.fillStyle = PINK; x.fillRect(-162, 108, 324, 64)
  x.restore()
}

const T3 = lt => lt > 1.1 ? 2 : 1
const CAMEOS = [
  { sign: S, cap: 'Made you a playlist? | *That’s a love letter.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', tears: 1, look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P, F) {
      phone(x, 790, 850, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'FOR YOU ♡', headCol: PINK, lines: [['song 1: you', BONE, pop01(t, P.t0 + 0.6, 0.25, 2.2)], ['song 2: also you', BONE, pop01(t, P.t0 + 0.9, 0.25, 2.2)], ['47 more', LAV, pop01(t, P.t0 + 1.3, 0.25, 2.2)]] })
      notes(x, t, F.x, F.cy - 90, { n: 4, cell: 7, col: PINK, seed: 1 })
    } },
  { sign: S, cap: 'Cried at your story? | *They felt it with you.*', mood: 'wide', tears: 3, look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 800, 960, 200, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: lt > 1.4 ? 'heart' : 'happy', look: [-1, 0] })
      bubble(x, 800, 690, '…and then the | dog came home', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 32, tail: 'br' })
      label(x, 560, 1140, 'TISSUES: OUT', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: SKYB, font: MONO, weight: 700, rot: -0.05 })
    } },
  { sign: S, cap: 'Remembers your dream | *from three weeks ago.*', mood: 'sparkle', tears: 1, look: [1, -1], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      thought(x, t, 790, 760, pop01(t, P.t0 + 0.3, 0.35, 2), x => { x.font = `800 30px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('the one with', 0, -26); x.fillText('the flying bus?', 0, 20) })
      label(x, 790, 1060, 'SAVED FOREVER', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: SEA, font: MONO, weight: 700, rot: 0.04 })
    } },
  { sign: S, cap: 'Drew you a doodle? | *Keep it forever.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', tears: T3, look: [1, 0], star: { x: -200 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      board(x, 790, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 300, frame: CREAM, bg: '#ffffff', rot: 0.06 }, x => {
        const p = clamp((lt - 0.4) / 1.0)
        x.strokeStyle = '#ff4f86'; x.lineWidth = 7; x.beginPath()
        for (let i = 0; i <= 60 * p; i++) { const a = i / 60 * Math.PI * 2; const hx = 16 * Math.pow(Math.sin(a), 3), hy = -(13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a)); i ? x.lineTo(hx * 6, hy * 6 - 10) : x.moveTo(hx * 6, hy * 6 - 10) }
        x.stroke()
        if (lt > 1.4) { x.font = `800 30px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText('u + me', 0, 118) }
      })
    } },
  { sign: S, cap: 'Checked your compatibility. | *Twice.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', tears: T3, look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      chartWheel(x, t, 790, 800, 140, pop01(t, P.t0 + 0.2, 0.35, 2), { center: '♓︎ ♡' })
      label(x, 760, 1030, lt > 1.3 ? '✦ COMPATIBLE (AGAIN)' : '✦ CHECKING…', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 30, bg: PINK, font: MONO, weight: 700, rot: -0.04 })
      hearts(x, t, 790, 760, P.t0 + 1.4, { n: 5, life: 1.6, spread: 220, cell: 7, seed: 6 })
    } },
  { sign: S, cap: 'Saved you the window seat? | *That’s devotion.*', mood: 'happy', tears: 1, look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      windowSeat(x, t, 790, 830, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1100, 'RESERVED: YOU', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: GOLD, font: MONO, weight: 700, rot: 0.05 })
    } },
  { sign: S, cap: 'Daydreams mid-sentence? | *Probably about you.*', mood: lt => lt > 0.9 ? 'heart' : 'happy', tears: 1, look: [0, -1], star: { x: -200 },
    front(x, t, lt, P) {
      bubble(x, 560, 620, 'so anyway, the—', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 32, tail: 'bl' })
      thought(x, t, 800, 820, pop01(t, P.t0 + 0.9, 0.35, 2), x => { for (let i = 0; i < 3; i++) { const s = 8; x.save(); x.translate(-70 + i * 70, 0 + Math.sin(t * 3 + i) * 10); drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86' }, 0, 0, s); x.restore() } })
      label(x, 800, 1090, 'BUFFERING ♡', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: SEA, font: MONO, weight: 700, rot: -0.04 })
    } },
  { sign: S, cap: '“This cloud | *reminded me of you.*”', mood: 'sparkle', tears: T3, look: [1, -1], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.4, 2)
      drawBits(x, HEARTCLOUD, CLOUD_C, 800, 780 + Math.sin(t * 1.5) * 10, 24 * k)
      label(x, 800, 1060, 'PHOTO SENT ♡', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: SKYB, font: MONO, weight: 700, rot: -0.04 })
    } },
  { sign: S, cap: 'Asked your sign first? | *You’re their person.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', tears: T3, look: [1, 0], star: { x: -200 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 850, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ NEW MATCH', headCol: PINK, lines: [['hi!! what’s', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2)], ['your sign?', BONE, pop01(t, P.t0 + 0.7, 0.25, 2.2)], ['♋︎ cancer', SKYB, pop01(t, P.t0 + 1.3, 0.25, 2.2)]] })
      sparkles(x, t, 790, 850, P.t0 + 1.4, 8, 220, 0.3, [PINK, GOLD, SKYB])
    } },
]

const F = makeFilm({
  id: 'r2a0713', key: 'C', accent: PINK, solo: S, ending: 'card',
  title: 'Signs a Pisces | *likes you.*',
  cameos: CAMEOS,
  card: { a: 'pisces', b: 'cancer', chip: 'IT’S A MATCH' },
  group: { cap: 'Soft heart. | *Big feelings.*', mood: 'heart' },
  lesson: { text: 'Soft heart, big love. | Let it *in.*', chip: 'STATUS: SMITTEN' },
  last: {
    text: 'Second date? | *Already planned.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
