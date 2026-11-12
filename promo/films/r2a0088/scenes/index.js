// r2a0088: ADVICE SOLO, "Gemini, replies | can wait." (~45 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Gemini truth + a warm reframe, one gag each.
//   0.0–3.6    "Gemini, replies | *can wait.*"
//   3.6–37.8   read it at midnight? reply at noon · typing for an hour? send it tomorrow · forty tabs? close some
//              · group chat buzzing? mute is self-care · two opinions? both can wait · phone at 1%? charge you too
//              · do not disturb is a love language · airplane mode is a tiny vacation · your thoughts first
//  37.8        "Your pace. | *Your phone.*"
//  41.2        CALLBACK: "Replied at noon. | *Nobody fainted.*"  the midnight phone, now in sunshine.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const YEL = '#ffd23a', RED = '#e23d4e'

// a phone with a message on screen; sky shows night or day
function phone(x, t, cx, cy, k, { day = 0, msg = 'hey!', reply = null, rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -206, 260, 424)
  x.fillStyle = INK; x.fillRect(-132, -218, 264, 436)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -210, 248, 420)
  const sky = day > 0.5 ? '#8fd3ff' : '#1b1650'
  x.fillStyle = sky; x.fillRect(-110, -180, 220, 360)
  if (day > 0.5) { x.fillStyle = YEL; x.beginPath(); x.arc(64, -136, 26, 0, Math.PI * 2); x.fill() }
  else { x.fillStyle = BONE; x.beginPath(); x.arc(64, -136, 22, 0, Math.PI * 2); x.fill(); x.fillStyle = sky; x.beginPath(); x.arc(74, -144, 20, 0, Math.PI * 2); x.fill() }
  x.font = `800 28px ${INTER}`; x.textBaseline = 'middle'; x.textAlign = 'left'
  const w1 = x.measureText(msg).width + 30
  x.fillStyle = '#ffffff'; x.fillRect(-96, -70, w1, 52); x.fillStyle = INK; x.fillText(msg, -81, -43)
  if (reply) { const w2 = x.measureText(reply).width + 30; x.fillStyle = YEL; x.fillRect(96 - w2, 10, w2, 52); x.fillStyle = INK; x.fillText(reply, 96 - w2 + 15, 37) }
  x.fillStyle = '#6b62a8'; x.fillRect(-30, 190, 60, 10)
  x.restore()
}
const DOTS = (x, t, cx, cy, k) => {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-110, -56, 220, 112); x.fillRect(-100, -66, 200, 132)
  x.fillStyle = BONE; x.fillRect(-100, -56, 200, 112)
  x.fillStyle = INK; x.fillRect(-80, 56, 24, 22); x.fillStyle = BONE; x.fillRect(-76, 52, 16, 18)
  for (let i = 0; i < 3; i++) { const b = Math.max(0, Math.sin(t * 6 - i * 0.9)) * 12; x.fillStyle = '#6b62a8'; x.fillRect(-58 + i * 44, -14 - b, 28, 28) }
  x.restore()
}
const BATT = ['KKKKKKKKKKKK.', 'KWWWWWWWWWWKK', 'KWRWWWWWWWWKK', 'KWRWWWWWWWWKK', 'KWWWWWWWWWWKK', 'KKKKKKKKKKKK.']
const BELL = ['....KK....', '...YYYY...', '..YYYYYY..', '..YYYYYY..', '..YYYYYY..', '.YYYYYYYY.', 'YYYYYYYYYY', '....KK....']
const PLANE = ['......WW.....', '......WWW....', 'W.....WWWW...', 'WWWWWWWWWWWWW', 'WWWWWWWWWWWWS', 'W.....WWWW...', '......WWW....', '......WW.....']
const CLOUD = ['...WWWW.....', '..WWWWWW.WW.', '.WWWWWWWWWWW', 'WWWWWWWWWWWW', 'WWWWWWWWWWWW', '.WWWWWWWWWW.', '............', '..WW........', '...W........']

const S = 'gemini'
const CAMEOS = [
  { sign: S, cap: 'Read it at midnight? | *Reply at noon.*', mood: lt => lt > 1.3 ? 'sleepy' : 'wide', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { day: 0, msg: 'hey! u up?' })
      label(x, 790, 1120, 'REPLY: TOMORROW', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Typing for an hour? | *Send it tomorrow.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      DOTS(x, t, 790, 820, pop01(t, P.t0 + 0.15, 0.3, 2))
      const m = Math.min(59, Math.floor(Math.max(0, lt - 0.4) * 40))
      label(x, 790, 1060, `TYPING… ${m} MIN`, pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Forty tabs open? | *Close a few.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const shut = ease.inOutCubic(prog(lt, 1.1, 1.7))
      const n = Math.round(lerp(10, 3, shut))
      for (let i = 0; i < n; i++) {
        const k = pop01(t, P.t0 + 0.15 + i * 0.05, 0.25, 2)
        x.save(); x.translate(680 + (i % 5) * 50, 700 + Math.floor(i / 5) * 140 + (i % 5) * 26); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-64, -46, 150, 104); x.fillStyle = ['#fff4e2', SKYB, PINK, MINT, YEL][i % 5]; x.fillRect(-58, -40, 138, 92)
        x.fillStyle = INK; x.fillRect(-58, -40, 138, 14); x.restore()
      }
      label(x, 790, 1130, `TABS: ${shut > 0.5 ? 3 : 40}`, pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Group chat buzzing? | *Mute is self-care.*', mood: lt => lt > 1.2 ? 'sleepy' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const muted = lt > 1.1
      const sh = muted ? 0 : Math.sin(t * 40) * 0.12
      drawBits(x, BELL, { K: INK, Y: YEL }, 790, 860, 22 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: sh })
      if (muted) { x.save(); x.strokeStyle = RED; x.lineWidth = 18; x.lineCap = 'round'; x.globalAlpha = clamp((lt - 1.1) * 4); x.beginPath(); x.moveTo(680, 760); x.lineTo(900, 960); x.stroke(); x.restore() }
      label(x, 790, 1110, 'MUTED: 8 HOURS', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Two opinions at once? | *Both can wait.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'squint', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 760, 700, 'yes!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, tail: 'bl' })
      bubble(x, 840, 880, 'no!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 44, col: LAV, tail: 'bl' })
      label(x, 790, 1090, 'DECIDING LATER', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Phone at 1%? | *Charge you too.*', mood: lt => lt > 1.3 ? 'sleepy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BATT, { K: INK, W: '#2a2350', R: Math.floor(t * 3) % 2 ? RED : '#2a2350' }, 790, 820, 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 790, 1040, 'YOU: 1% TOO', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Do not disturb | is *a love language.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        const on = ease.inOutCubic(prog(lt, 0.8, 1.1))
        x.save(); x.translate(790, 860); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.roundRect(-130, -64, 260, 128, 64); x.fill()
        x.fillStyle = lerp(0, 1, on) > 0.5 ? '#6b62a8' : '#9aa5c4'; x.beginPath(); x.roundRect(-120, -54, 240, 108, 54); x.fill()
        const kx = lerp(-66, 66, on)
        x.fillStyle = BONE; x.beginPath(); x.arc(kx, 0, 46, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#6b62a8'; x.beginPath(); x.arc(kx - 4, 0, 24, 0, Math.PI * 2); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(kx + 6, -8, 22, 0, Math.PI * 2); x.fill()
        x.restore()
      }
      label(x, 790, 1060, 'DND: ON', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 760, P.t0 + 1.2, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Airplane mode | is *a tiny vacation.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -170 }, hops: [1.0],
    front(x, t, lt, P) {
      const p = ease.inOutCubic(prog(lt, 0.2, 1.6))
      drawBits(x, PLANE, { W: '#ffffff', S: SKYB }, lerp(640, 860, p), lerp(1020, 780, p), 16 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: -0.5 })
      label(x, 790, 1120, 'OUT OF OFFICE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your thoughts first. | *Replies second.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CLOUD, { W: '#fff4e2' }, 800, 780, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const k = pop01(t, P.t0 + 0.8, 0.3, 2.2)
      if (k > 0.01) signChar(x, t, 'gemini', 810, 760, 120 * k, { mood: 'heart', seed: 55, glyph: false, glow: 0.4 })
      label(x, 790, 1080, 'PRIORITY: ME', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0088', key: 'C', accent: YEL, solo: 'gemini', ending: 'callback',
  title: 'Gemini, replies | *can wait.*',
  cameos: CAMEOS,
  group: { cap: 'Your pace. | *Your phone.*', mood: 'happy' },
  last: {
    text: 'Replied at noon. | *Nobody fainted.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'gemini', 380, 1060, 260 * k, { mood: lt > 1.4 ? 'wink' : 'happy', look: [1, 0], seed: 40, hops: [t - lt + 1.3] })
      phone(x, t, 720, 1040, 0.85 * pop01(t, t - lt + 0.7, 0.35, 2), { day: 1, msg: 'hey! u up?', reply: lt > 1.2 ? 'yes! hi!' : null, rot: 0.06 })
      hearts(x, t, 720, 900, t - lt + 1.4, { n: 6, life: 1.6, spread: 220, cell: 6, seed: 9 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
