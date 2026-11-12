// r2t0029: star_talk, SOLO, "Group chat Cancers | be like." (~48 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole film (makeFilm solo mode, 9 cards): the most extreme Cancer in the group chat. Ending: callback.
//   0.0–3.6    "Group chat Cancers | *be like.*"
//   3.6–37.8   someone went quiet, sent a search party · saves every nice text (folder: 4,000) · remembers every birthday,
//              and the pets' · a throwback photo at 2 a.m. · you sneezed on a call, vitamins arrived · pinned "drink water."
//              · typing… stopped, Cancer started grieving · someone has news, already planning the party
//              · says goodnight to everyone, individually
//  37.8        "Chat mom. | *No days off.*"
//  41.2        CALLBACK: "Sam was napping. | *Too late.*"  The search party (three little Cancers with torches) arrives.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SEA = '#7fd3ff', CREAM = '#fff4e2', RED = '#e23d4e'

// ── props
const BOTTLE = ['..KKKK..', '..WWWW..', '.OOOOOO.', 'OOOOOOOO', 'OOWWWWOO', 'OOWOOWOO', 'OOWWWWOO', 'OOOOOOOO', '.OOOOOO.']
const TORCH = ['.YY.', 'YOOY', '.YY.', '.KK.', '.KK.', '.KK.', '.KK.']
const PAW = ['.P.P.', 'P...P', '..P..', '.PPP.', '.PPP.']

function phone(x, cx, cy, k, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 260, 404)
  x.fillStyle = INK; x.fillRect(-138, -210, 276, 420); x.fillStyle = '#2a2350'; x.fillRect(-130, -202, 260, 404)
  x.fillStyle = '#140c30'; x.fillRect(-116, -176, 232, 348)
  x.fillStyle = '#6b62a8'; x.fillRect(-30, 182, 60, 10)
  fn(); x.restore()
}
const msg = (x, s, y, { mine = false, col, size = 28 } = {}) => {
  x.font = `800 ${size}px ${INTER}`; const w = x.measureText(s).width + 28
  const l = mine ? 104 - w : -104
  x.fillStyle = col || (mine ? SEA : BONE); x.fillRect(l, y - size * 0.8, w, size * 1.6)
  x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(s, l + 14, y + 1)
}

const S = 'cancer'
const CAMEOS = [
  { sign: S, cap: 'Someone went quiet. | *Sent a search party.*', mood: lt => lt > 1.0 ? 'wide' : 'neutral', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.15, 0.35, 2), () => {
        msg(x, 'Sam?', -120, { mine: true })
        if (lt > 0.5) msg(x, 'SAM??', -50, { mine: true })
        if (lt > 0.9) msg(x, 'u alive??', 20, { mine: true })
        if (lt > 1.3) msg(x, 'calling ur mom', 90, { mine: true, col: PINK, size: 24 })
      })
      label(x, 790, 1140, 'SILENT: 9 MIN', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Saves every nice text. | *Folder: 4,000.*', mood: 'heart', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 870); x.rotate(-0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -130, 340, 260); x.fillRect(-170, -160, 140, 40)
        x.fillStyle = GOLD; x.fillRect(-162, -122, 324, 244); x.fillRect(-162, -152, 124, 36)
        x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('nice things', 0, -40)
        x.font = `700 40px ${MONO}`; x.fillText(`${Math.floor(3980 + clamp((lt - 0.3) / 1.6) * 32)}`, 0, 40)
        x.restore()
      }
      hearts(x, t, 790, 760, P.t0 + 1.0, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Remembers every birthday. | *And the pets’.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [1.2],
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.15, 0.35, 2), () => {
        msg(x, 'happy bday,', -110, { mine: true })
        msg(x, 'BISCUIT!!', -40, { mine: true, col: GOLD, size: 34 })
        if (lt > 1.0) msg(x, 'who’s biscuit', 50, { size: 24 })
        if (lt > 1.4) msg(x, 'my dog. wow.', 120, { size: 24 })
      })
      drawBits(x, PAW, { P: '#ffb3a0' }, 640, 700, 14 * pop01(t, P.t0 + 0.8, 0.3, 2), { rot: -0.3 })
    } },
  { sign: S, cap: 'A throwback photo. | *At 2 a.m.*', mood: lt => lt > 1.2 ? 'heart' : 'sleepy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 850); x.rotate(0.06); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -160, 300, 320); x.fillStyle = CREAM; x.fillRect(-140, -150, 280, 300)
        x.fillStyle = '#d9c7a0'; x.fillRect(-120, -130, 240, 200)
        x.restore()
        for (let i = 0; i < 3; i++) signChar(x, t, ['cancer', 'gemini', 'leo'][i], 720 + i * 70, 830, 90 * k, { mood: 'happy', seed: 80 + i, glyph: false, glow: 0.3 })
        x.save(); x.translate(790, 850); x.rotate(0.06); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.fillText('“we were babies”', 0, 120); x.restore()
      }
      label(x, 790, 1110, 'SENT: 2:04 AM', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You sneezed on a call. | *Vitamins arrived.*', mood: 'heart', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 790, 690, 'achoo.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, col: LAV, tail: 'br' })
      drawBits(x, BOTTLE, { K: INK, W: CREAM, O: '#ff9a4a' }, 790, 920, 20 * pop01(t, P.t0 + 0.8, 0.3, 2))
      label(x, 790, 1120, 'DELIVERED: 20 MIN', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Pinned a message: | *“drink water.”*', mood: 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.15, 0.35, 2), () => {
        x.fillStyle = SEA; x.fillRect(-116, -176, 232, 80)
        x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('PINNED', -100, -156)
        x.font = `800 30px ${INTER}`; x.fillText('drink water.', -100, -120)
        if (lt > 0.8) msg(x, 'ok mom', -10, { size: 28 })
        if (lt > 1.2) msg(x, 'ok mom', 60, { size: 28 })
        if (lt > 1.6) msg(x, 'ok mom', 130, { size: 28 })
      })
    } },
  { sign: S, cap: 'Typing… stopped. | *Cancer started grieving.*', mood: lt => lt > 1.0 ? 'wide' : 'neutral', look: [1, 0], star: { x: -180 }, tears: lt => lt > 1.2 ? 1 : 0,
    front(x, t, lt, P) {
      const typing = lt < 1.0
      bubble(x, 790, 760, typing ? '• • •' : '. . .', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 56, col: typing ? BONE : '#9aa5c4', tail: 'bl' })
      label(x, 790, 1000, 'FRIENDSHIP: OVER?', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1130, 'sorry, was | in the shower', pop01(t, P.t0 + 1.9, 0.25, 2.2), { size: 28, tail: 'br' })
    } },
  { sign: S, cap: 'Someone has news. | *Already planning the party.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [0.8, 1.4],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'i got the job!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: BONE, tail: 'br' })
      bubble(x, 790, 860, 'CAKE IS | IN THE OVEN', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, col: SEA, tail: 'bl' })
      label(x, 790, 1070, 'SENT: 4 SEC LATER', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Says goodnight | to everyone. *Individually.*', mood: lt => lt > 1.6 ? 'sleepy' : 'heart', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const N = ['Sam', 'Jo', 'Bea', 'Ari', 'Max', 'Kim', 'Lee']
      const n = Math.min(7, Math.floor(Math.max(0, lt - 0.2) / 0.25) + 1)
      phone(x, 790, 860, pop01(t, P.t0 + 0.15, 0.35, 2), () => {
        for (let i = Math.max(0, n - 5); i < n; i++) msg(x, `night ${N[i]}`, -130 + (i - Math.max(0, n - 5)) * 66, { mine: true, size: 26 })
      })
    } },
]

const F = makeFilm({
  id: 'r2t0029', key: 'D', accent: SEA, solo: 'cancer', ending: 'callback',
  title: 'Group chat Cancers | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Chat mom. | *No days off.*', mood: 'heart' },
  last: {
    text: 'Sam was napping. | *Too late.*',
    draw(x, t, lt) {
      for (let i = 0; i < 3; i++) {
        const k = pop01(t, t - lt + 0.5 + i * 0.25, 0.4, 1.8)
        const cx = lerp(1150, 340 + i * 200, ease.outCubic(prog(lt, 0.5 + i * 0.25, 1.6 + i * 0.25)))
        if (k > 0.01) {
          const F2 = signChar(x, t, ['cancer', 'cancer', 'cancer'][i], cx, 1120, 220 * k, { mood: 'wide', look: [-1, 0], seed: 90 + i, glyph: false, hops: [t - lt + 1.7, t - lt + 2.3, t - lt + 2.9].map(h => h + i * 0.12) })
          drawBits(x, TORCH, { Y: GOLD, O: '#ff7a3a', K: '#8a4a2e' }, F2.x + 80, F2.cy - 20, 10 * k)
        }
      }
      label(x, 540, 1360, 'SEARCH PARTY', pop01(t, t - lt + 1.6, 0.3, 2.4), { size: 44, bg: SEA, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
