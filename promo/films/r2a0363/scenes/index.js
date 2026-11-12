// r2a0363: star_advice, ADVICE SOLO, "Libra, you don't owe | anyone an instant reply." (~43 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole film (makeFilm solo mode, 9 cards), ending: group.
//   0.0–3.6    "Libra, you don't owe | *instant replies.*"
//   3.6–37.8   read it at 9pm? reply tomorrow · twelve group chats? mute a few · not every question needs a yes
//              · the scales: phone vs nap (nap wins) · "seen" isn't a crime · a new match can wait for a cute reply
//              · "busy" is a full answer · choosing you isn't picking sides · phone face down, face up to the sun
//  37.8        group (the ending): "Reply when it's | *right for you.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, SERIF,
} from '../../signs3kit.js'

const ROSE = '#ff9ec7', GREY = '#9aa5c4', RED = '#ff6b5a'
const M = { font: MONO, weight: 700 }
const ST = { x: -170 }
const txt = (x, s, X, Y, font, col, align = 'center') => { x.fillStyle = col; x.font = font; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, X, Y) }
function phone(x, cx, cy, k, rot, inner) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-112, -172, 240, 360)
  x.fillStyle = INK; x.fillRect(-120, -180, 240, 360)
  x.fillStyle = '#2a2350'; x.fillRect(-110, -170, 220, 340)
  inner(x)
  x.restore()
}
const BELL = [
  '....YY....',
  '...YYYY...',
  '..YYYYYY..',
  '..YYYYYY..',
  '.YYYYYYYY.',
  '.YYYYYYYY.',
  'YYYYYYYYYY',
  '....YY....',
]
const SUN = [
  '...Y..Y..Y...',
  '.Y.........Y.',
  '....OOOOO....',
  'Y..OOOOOOO..Y',
  '..OOOOOOOOO..',
  '..OOOOOOOOO..',
  'Y.OOOOOOOOO.Y',
  '..OOOOOOOOO..',
  '...OOOOOOO...',
  'Y...OOOOO...Y',
  '.Y.........Y.',
  '...Y..Y..Y...',
]

/** Libra's scales: left pan "PHONE", right pan "NAP"; tips toward the nap */
function scales(x, cx, cy, k, tip) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-12, -170, 24, 330); x.fillRect(-90, 150, 180, 26)
  x.fillStyle = GOLD; x.fillRect(-6, -164, 12, 318); x.fillRect(-84, 154, 168, 16)
  const a = tip * 0.22
  x.save(); x.translate(0, -150); x.rotate(a)
  x.fillStyle = INK; x.fillRect(-140, -8, 280, 16); x.fillStyle = GOLD; x.fillRect(-136, -4, 272, 8)
  x.restore()
  const pan = (side, word, col) => {
    const px = side * 135 * Math.cos(a), py = -150 + side * 135 * Math.sin(a)
    x.strokeStyle = BONE; x.lineWidth = 3; x.beginPath(); x.moveTo(px, py); x.lineTo(px - 60, py + 100); x.moveTo(px, py); x.lineTo(px + 60, py + 100); x.stroke()
    x.fillStyle = INK; x.fillRect(px - 74, py + 96, 148, 22); x.fillStyle = GOLD; x.fillRect(px - 70, py + 100, 140, 14)
    x.save(); x.translate(px, py + 70); x.fillStyle = INK; x.font = `700 28px ${MONO}`
    const w = x.measureText(word).width + 20
    x.fillRect(-w / 2 - 3, -22, w + 6, 44); x.fillStyle = col; x.fillRect(-w / 2, -19, w, 38)
    txt(x, word, 0, 1, `700 28px ${MONO}`, INK)
    x.restore()
  }
  pan(-1, 'PHONE', GREY); pan(1, 'NAP', MINT)
  x.restore()
}

const S = 'libra'
const CAMEOS = [
  { sign: S, cap: 'Saw it at 9pm? | *Reply tomorrow.*', mood: lt => lt > 1.2 ? 'sleepy' : 'wide', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 0.05, x => {
        txt(x, '9:04 PM', 0, -120, `800 44px ${INTER}`, BONE)
        x.fillStyle = BONE; x.fillRect(-90, -60, 180, 70); txt(x, 'u up? quick q', 0, -25, `800 22px ${INTER}`, INK)
        x.fillStyle = '#f2e6b0'; x.beginPath(); x.arc(0, 90, 42, 0, Math.PI * 2); x.fill(); x.fillStyle = '#2a2350'; x.beginPath(); x.arc(18, 78, 38, 0, Math.PI * 2); x.fill()
      })
      label(x, 790, 1120, 'DO NOT DISTURB: ON', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: LAV, rot: -0.04, ...M })
    } },
  { sign: S, cap: 'Twelve group chats? | *Mute a few.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const muted = lt > 1.0, shake = muted ? 0 : Math.sin(t * 60) * 0.12
      drawBits(x, BELL, { Y: GOLD }, 790, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: shake })
      if (muted) { x.save(); x.strokeStyle = RED; x.lineWidth = 18; x.lineCap = 'round'; x.beginPath(); x.moveTo(680, 750); x.lineTo(900, 970); x.stroke(); x.restore() }
      label(x, 790, 640, muted ? 'MUTED: 9 OF 12' : 'NEW: 214', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 34, bg: muted ? MINT : RED, color: INK, rot: 0.04, ...M })
    } },
  { sign: S, cap: 'Not every ask | *needs a yes.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'can you | do one more | tiny thing?', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 36, col: BONE, tail: 'br' })
      label(x, 790, 980, 'MAYBE LATER ♥', pop01(t, P.t0 + 1.1, 0.3, 2.6), { size: 44, bg: ROSE, rot: -0.08, ...M })
    } },
  { sign: S, cap: 'Weigh it out. | *Peace wins.*', mood: lt => lt > 1.4 ? 'sleepy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const tip = ease.inOutCubic(prog(lt, 0.6, 1.4))
      scales(x, 790, 900, 1.05 * pop01(t, P.t0 + 0.2, 0.3, 2), tip)
    } },
  { sign: S, cap: '“Seen” isn’t a crime. | *It’s a breather.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'hey!!', pop01(t, P.t0 + 0.2, 0.25, 2), { size: 72, col: BONE, tail: 'bl' })
      txt(x, 'seen 2:14', 860, 830, `700 28px ${MONO}`, GREY)
      label(x, 790, 1040, 'BREATHING: ALLOWED', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, ...M })
    } },
  { sign: S, cap: 'A new match can wait | *for a cute reply.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      label(x, 790, 660, '♥ NEW MATCH', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 44, bg: PINK, rot: -0.04, ...M })
      bubble(x, 790, 900, 'worth | the wait', pop01(t, P.t0 + 1.0, 0.25, 2.4), { size: 56, col: BONE, tail: 'bl' })
      hearts(x, t, 790, 1100, P.t0 + 1.2, { n: 5, life: 1.8, spread: 220, cell: 7, seed: 3 })
    } },
  { sign: S, cap: '“Busy” is | *a full answer.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'busy! | ♥', pop01(t, P.t0 + 0.3, 0.25, 2.4), { size: 90, col: LAV, tail: 'bl' })
      label(x, 790, 1080, 'NO ESSAY NEEDED', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, ...M })
    } },
  { sign: S, cap: 'Choosing you | *isn’t picking sides.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const me = lt > 1.1
      label(x, 680, 700, 'THEM', pop01(t, P.t0 + 0.2, 0.3, 2) * (me ? 0.75 : 1), { size: 40, bg: GREY, rot: -0.08, ...M })
      label(x, 900, 760, 'THEM TOO', pop01(t, P.t0 + 0.35, 0.3, 2) * (me ? 0.75 : 1), { size: 40, bg: GREY, rot: 0.07, ...M })
      label(x, 790, 980, 'ME ♥', pop01(t, P.t0 + 1.1, 0.3, 2.6), { size: 64, bg: ROSE, rot: -0.04, ...M })
      if (me) sparkles(x, t, 790, 980, P.t0 + 1.2, 6, 170, 0.4)
    } },
  { sign: S, cap: 'Phone face down. | *Face up to the sun.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', look: [0, -1], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, SUN, { Y: GOLD, O: '#ffb34a' }, 800, 760, 22 * pop01(t, P.t0 + 0.6, 0.35, 2), { rot: t * 0.3 })
      // a phone, lying face down
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(790, 1100); x.scale(k, k); x.fillStyle = INK; x.fillRect(-150, -24, 300, 48); x.fillStyle = '#3a3260'; x.fillRect(-144, -18, 288, 36); x.restore() }
    } },
]

const F = makeFilm({
  id: 'r2a0363', key: 'C', accent: ROSE, solo: 'libra', ending: 'group',
  title: 'Libra, you don’t owe | *instant replies.*',
  cameos: CAMEOS,
  group: {
    cap: 'Reply when it’s | *right for you.*', mood: 'heart',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
