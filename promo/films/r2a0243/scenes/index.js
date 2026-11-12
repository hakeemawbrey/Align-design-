// r2a0243: star_advice, ADVICE SOLO, "No instant reply | owed, Aquarius." (~51 s vertical, signs3kit social cut,
// music: lofi · C). One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Aquarius truth + a warm
// reframe, one gag each. Ending: lesson.
//   0.0–3.6    "No instant reply | *owed, Aquarius.*"  One big Aquarius pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              47 unread (they can wait) · a day offline · an essay reply shrinks to "ha" · do not disturb is self-care
//              · thinking before replying · a personal-space bubble · typed, deleted, typed · the right people get the delay
//              (a snail delivers the reply) · seen at 9, replied at 5, still a great friend
//  37.8        "Unbothered. | *Still caring.*"  Aquarius comes back, big.
//  41.0        LESSON UNLOCKED: "Slow replies. | *Real friendships.*"  STATUS: OFFLINE
//  46.9        "Seen. | *Reply: Thursday.*"  The snail sets off with the reply.
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import { card, txt, phone, pill, CREAM, RED, ORANGE, SUN, GREY, WOOD, TEAL, clamp, prog, lerp, ease } from './props.js'

const S = 'aquarius', ACC = '#6fc3ff'

const SNAIL = [
  '.....SSSS......',
  '...SSssssSS....',
  '..SssSSSSssS...',
  '..SsSS..SSsS...',
  '..SsS.ss.SsS..E',
  '..SsSS..SSsS.EE',
  '...SssSSssS.BB.',
  'BBBBSSSSSSBBBB.',
  'BBBBBBBBBBBBBB.',
]
const SNAIL_C = { S: '#c97a52', s: '#ffb34a', B: '#9fe0a0', E: '#9fe0a0' }
const MOON = [
  '..MMM.',
  '.MMM..',
  'MMM...',
  'MMM...',
  'MMM...',
  '.MMM..',
  '..MMM.',
]

function snail(x, t, cx, cy, k, letter = true) {
  if (k <= 0.01) return
  drawBits(x, SNAIL, SNAIL_C, cx, cy, 11 * k)
  if (letter) card(x, cx - 10, cy - 70 * k, 90, 60, k, { bg: CREAM, rot: -0.08, border: 4 }, () => { x.strokeStyle = INK; x.lineWidth = 3; x.beginPath(); x.moveTo(-45, -30); x.lineTo(0, 4); x.lineTo(45, -30); x.stroke() })
}

const CAMEOS = [
  { sign: S, cap: '47 unread? | *They can wait.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', star: { x: -190 }, hops: [1.5],
    front(x, t, lt, P) {
      phone(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.05 }, () => {
        x.fillStyle = '#3d3470'; for (let i = 0; i < 4; i++) x.fillRect(-96, -120 + i * 70, 192, 50)
      })
      const n = Math.min(47, Math.floor(clamp((lt - 0.2) / 1.0) * 47))
      x.save(); const k = pop01(t, P.t0 + 0.3, 0.3, 2.4); x.translate(900, 660); x.scale(k, k)
      x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 58, 0, 7); x.fill(); x.fillStyle = RED; x.beginPath(); x.arc(0, 0, 50, 0, 7); x.fill()
      txt(x, String(n), 0, 2, { size: 46, color: CREAM }); x.restore()
      label(x, 790, 1100, 'PHONE: FACE DOWN', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: MINT })
    } },
  { sign: S, cap: 'Need a day offline? | *Take the day.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', star: { x: -190 },
    front(x, t, lt, P) {
      card(x, 790, 830, 300, 200, pop01(t, P.t0 + 0.3, 0.35, 2), { bg: ACC, rot: Math.sin(t * 2.5) * 0.06 }, () => {
        txt(x, 'OFFLINE', 0, -30, { size: 52 }); txt(x, 'back soon ✦', 0, 40, { size: 28, font: MONO, weight: 700 })
      })
      x.strokeStyle = INK; x.lineWidth = 5; x.beginPath(); x.moveTo(720, 720); x.lineTo(790, 650); x.lineTo(860, 720); x.stroke()
      x.fillStyle = GOLD; x.fillRect(782, 640, 16, 16)
    } },
  { sign: S, cap: 'Replying with an essay? | *“Ha” is enough.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', star: { x: -190 }, hops: [1.5],
    front(x, t, lt, P) {
      const shrink = prog(lt, 1.0, 1.4)
      if (shrink < 1) card(x, 790, 820, 300, lerp(380, 80, shrink), pop01(t, P.t0 + 0.2, 0.35, 2), { bg: BONE, rot: 0.03 }, () => {
        x.fillStyle = '#b9b0a0'; const h = lerp(380, 80, shrink); for (let i = 0; i < Math.floor((h - 40) / 30); i++) x.fillRect(-120, -h / 2 + 24 + i * 30, 240 - (i % 3) * 40, 12)
      })
      else bubble(x, 790, 820, 'ha', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 80, tail: 'bl' })
      label(x, 790, 1080, 'SENT ✓', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 34, bg: MINT, font: MONO, weight: 700 })
    } },
  { sign: S, cap: '“Do not disturb” | is *self-care.*', mood: 'sleepy', star: { x: -190, y: 20 },
    front(x, t, lt, P) {
      drawBits(x, MOON, { M: SUN }, 800, 760, 30 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.1 })
      label(x, 800, 1000, 'DO NOT DISTURB: ON', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 30, bg: LAV, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Thinking before replying? | *That’s thoughtful.*', mood: 'squint', look: [0, -1], star: { x: -190, y: 30 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      x.save(); x.globalAlpha = clamp(k); x.fillStyle = BONE
      for (const [px, py, r] of [[480, 700, 12], [540, 650, 18]]) { x.beginPath(); x.arc(px, py, r, 0, 7); x.fill() }
      x.restore()
      card(x, 760, 640, 360, 170, k, { bg: BONE, rot: 0.02 }, () => {
        for (let i = 0; i < 3; i++) { x.save(); x.translate(-110 + i * 110, 0); x.rotate(t * (i % 2 ? -2 : 2)); x.fillStyle = [GREY, ACC, GOLD][i]; for (let j = 0; j < 8; j++) { x.rotate(Math.PI / 4); x.fillRect(-10, -48, 20, 20) } x.beginPath(); x.arc(0, 0, 34, 0, 7); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 12, 0, 7); x.fill(); x.restore() }
      })
      label(x, 790, 960, 'DRAFT 3 OF 3', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: SUN, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Needing space | isn’t *a rejection.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', star: { x: 0, y: 0, s: 260 }, hops: [1.3],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.5, 0.4, 1.8)
      if (k > 0.01) {
        x.save(); x.globalAlpha = 0.9 * clamp(k); x.strokeStyle = '#c8f0ff'; x.lineWidth = 8
        x.beginPath(); x.arc(540, 880, 210 * k, 0, 7); x.stroke()
        x.fillStyle = 'rgba(143,227,255,0.12)'; x.fill()
        x.fillStyle = '#ffffff'; x.fillRect(420, 760, 26, 26); x.fillRect(450, 730, 18, 18); x.restore()
      }
      label(x, 540, 1140, 'PERSONAL SPACE', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: ACC })
      bubble(x, 800, 600, 'still love you', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Typed, deleted, typed? | *Send it tomorrow.*', mood: 'squint', star: { x: -190 },
    front(x, t, lt, P) {
      phone(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'DRAFT', headCol: ACC }, () => {
        const ph = Math.floor(lt * 2.5) % 3
        pill(x, ['hey so', 'hey so…', '…'][ph], 0, -30, 1, { col: BONE, size: 28 })
        for (let i = 0; i < 3; i++) { x.fillStyle = i === Math.floor(t * 4) % 3 ? BONE : '#6b62a8'; x.beginPath(); x.arc(-30 + i * 30, 60, 10, 0, 7); x.fill() }
      })
      label(x, 790, 1100, 'SAVE FOR TOMORROW', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: MINT })
    } },
  { sign: S, cap: 'The right people | *get the delay.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      snail(x, t, lerp(900, 790, prog(lt, 0.2, 2.2)), 980, 1.4 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 700, 'REPLY: ON ITS WAY', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 30, bg: SUN, font: MONO, weight: 700 })
      bubble(x, 380, 620, 'worth the wait', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: S, cap: 'Seen at 9, replied at 5? | *Still a great friend.*', mood: 'sparkle', star: { x: -190 }, hops: [1.4],
    front(x, t, lt, P) {
      card(x, 790, 820, 300, 240, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: -0.04 }, () => {
        txt(x, 'FRIEND REPORT', 0, -86, { size: 26, font: MONO, weight: 700 })
        const R = [['loyal', '✓'], ['funny', '✓'], ['fast', '✗'], ['great', '✓']]
        R.forEach(([a, b], i) => { txt(x, a, -90, -40 + i * 40, { size: 28, align: 'left' }); txt(x, b, 100, -40 + i * 40, { size: 30, color: b === '✓' ? '#2fa36b' : RED }) })
      })
      label(x, 790, 1060, 'KEEPER', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: GOLD })
    } },
]

const F = makeFilm({
  id: 'r2a0243', key: 'C', accent: ACC, solo: S, ending: 'lesson',
  title: 'No instant reply | *owed, Aquarius.*',
  cameos: CAMEOS,
  group: { cap: 'Unbothered. | *Still caring.*', mood: 'sparkle' },
  lesson: { text: 'Slow replies. | *Real friendships.*', chip: 'STATUS: OFFLINE' },
  last: {
    text: 'Seen. | *Reply: Thursday.*',
    draw(x, t, lt) { snail(x, t, lerp(1000, 760, clamp(lt / 3.5)), 1180, 1.6 * pop01(t, t - lt + 0.6, 0.35, 2)) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
