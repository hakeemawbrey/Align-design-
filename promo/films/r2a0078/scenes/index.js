// r2a0078: star_advice ADVICE SOLO, "Scorpio, you don't owe | an instant reply." (~46 s vertical, signs3kit social cut,
// music: lofi · C). One sign the whole film (makeFilm solo mode, 9 cards): a relatable Scorpio truth + a warm reframe,
// one visual gag each. Ending: the group beat (no lesson, no last line).
//   0.0–3.6    "Scorpio, you owe | *no instant reply.*"
//   3.6–37.8   read it in a blink (reply when ready) · drafted a novel (sleep on it) · your mystery is allowed
//              · not every text needs your whole soul · phone face-down is a boundary · a quiet night is recharging
//              · new match's chart? study it later · you don't owe a read receipt · trust takes time, so can replies
//  37.8        GROUP ENDING: "Deep heart. | *Slow replies.*"  a phone pops up: "seen: when I'm ready"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PLUM = '#ff5c8a', RED = '#e23d4e', DEEP = '#6b2f6f'
const S = 'scorpio'

function card(x, cx, cy, w, h, bg, k, rot = 0) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}
function text(x, s, px, py, size, col = INK, font = INTER, weight = 800) {
  x.fillStyle = col; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, px, py)
}
function phone(x, cx, cy, k, draw, rot = 0.05) {
  if (!card(x, cx, cy, 250, 400, '#2a2350', k, rot)) return
  x.fillStyle = '#140c30'; x.fillRect(-110, -170, 220, 340)
  draw(); x.restore()
}
const EYE = ['...KKKKK...', '.KKWWWWWKK.', 'KWWWPPPWWWK', 'KWWPPKPPWWK', 'KWWWPPPWWWK', '.KKWWWWWKK.', '...KKKKK...']
const SHADES = ['KKKKKK.KKKKKK', 'KKKKKKKKKKKKK', '.KKKKK.KKKKK.', '..KKK...KKK..']
const MOON = ['..YYYY..', '.YYY....', 'YYY.....', 'YYY.....', 'YYY.....', 'YYY.....', '.YYY....', '..YYYY..']
const HOURGLASS = ['KKKKKKKKK', '.KSSSSSK.', '..KSSSK..', '...KSK...', '....K....', '...K.K...', '..K.S.K..', '.KSSSSSK.', 'KKKKKKKKK']
const HEARTB = ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
function chart(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.15)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 130, 0, Math.PI * 2); x.fill()
  const cols = [PLUM, BONE, LAV, '#2a2350']
  for (let i = 0; i < 12; i++) { x.fillStyle = cols[i % 4]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 120, i / 12 * Math.PI * 2, (i + 1) / 12 * Math.PI * 2); x.fill() }
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 44, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 34, 0, Math.PI * 2); x.fill()
  x.restore()
}
// a long scroll of a drafted reply
function scroll(x, cx, top, k, unroll) {
  if (k <= 0.01) return
  const h = lerp(80, 560, unroll)
  if (!card(x, cx, top + h / 2, 240, h, BONE, k)) return
  x.restore()
  x.save(); x.beginPath(); x.rect(cx - 120, top, 240, h); x.clip()
  for (let i = 0; i < 16; i++) { x.fillStyle = '#9aa5c4'; x.fillRect(cx - 100, top + 24 + i * 34, 200 - (i * 37) % 70, 10) }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Read it in a blink? | *Reply when ready.*', mood: lt => lt > 1.3 ? 'wink' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, EYE, { K: INK, W: BONE, P: PLUM }, 790, 820, 22 * pop01(t, P.t0 + 0.15, 0.3, 2), { sy: Math.abs(Math.sin(t * 1.4)) > 0.1 ? 1 : 0.2 })
      label(x, 790, 1060, 'READ: 0.2 SEC', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 640, 'REPLY: LATER', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Drafted a novel? | *Sleep on it.*', mood: lt => lt > 1.5 ? 'sleepy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      scroll(x, 790, 580, pop01(t, P.t0 + 0.15, 0.3, 2), ease.outCubic(prog(lt, 0.3, 1.3)))
      label(x, 790, 1170, 'CHAPTER 3', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your mystery | *is allowed.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      const drop = ease.outBounce ? ease.outBounce(prog(lt, 0.3, 0.9)) : ease.outCubic(prog(lt, 0.3, 0.9))
      if (lt > 0.25) drawBits(x, SHADES, { K: INK }, F.x, lerp(560, F.cy - 10, drop), F.cell * 2.2)
      label(x, 790, 860, 'PRIVATE', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 52, bg: PLUM, color: BONE, rot: 0.05 })
    } },
  { sign: S, cap: 'Not every text needs | *your whole soul.*', mood: lt => lt > 1.3 ? 'happy' : 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const shrink = lerp(1, 0.55, ease.inOutCubic(prog(lt, 0.9, 1.4)))
      drawBits(x, HEARTB, { H: PLUM, W: '#fff' }, 790, 860, 36 * shrink * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 790, 1090, 'LIGHT REPLY: OK', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Phone face-down? | *That’s a boundary.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      const flip = ease.inOutCubic(prog(lt, 0.5, 1.0))
      x.save(); x.translate(790, 900); x.scale(1, lerp(1, 0.18, flip)); x.translate(-790, -900)
      phone(x, 790, 900, pop01(t, P.t0 + 0.15, 0.3, 2), () => { for (let i = 0; i < 3; i++) { x.fillStyle = PLUM; x.fillRect(-90, -120 + i * 60, 180, 40) } }, 0)
      x.restore()
      label(x, 790, 680, 'BOUNDARY: SET', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A quiet night | is *recharging.*', mood: 'sleepy', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, MOON, { Y: GOLD }, 790, 800, 26 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: 0.2 })
      sparkles(x, t, 790, 800, P.t0 + 0.6, 6, 160, 0.4, [GOLD, BONE, LAV])
      label(x, 790, 1060, 'BATTERY: FILLING', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'New match’s chart? | *Study it later.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, t, 790, 820, pop01(t, P.t0 + 0.15, 0.35, 2))
      label(x, 790, 1080, 'HOMEWORK: PAUSED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You don’t owe | *a read receipt.*', mood: 'wink', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (card(x, 790, 860, 220, 320, '#fff4e2', k, -0.05)) {
        text(x, 'RECEIPT', 0, -120, 30, INK, MONO, 700)
        for (let i = 0; i < 4; i++) { x.fillStyle = '#9aa5c4'; x.fillRect(-80, -70 + i * 40, 160 - (i % 2) * 40, 10) }
        const stamp = lt > 1.1
        if (stamp) { x.save(); x.rotate(-0.25); x.strokeStyle = PLUM; x.lineWidth = 6; x.strokeRect(-90, 60, 180, 64); text(x, 'HIDDEN', 0, 93, 34, PLUM, MONO, 700); x.restore() }
        x.restore()
      }
    } },
  { sign: S, cap: 'Trust takes time. | *So can replies.*', mood: 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const flip = ease.inOutCubic(prog(lt, 0.8, 1.2))
      drawBits(x, HOURGLASS, { K: DEEP, S: PLUM }, 790, 860, 24 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: flip * Math.PI })
      hearts(x, t, 790, 760, P.t0 + 1.5, { n: 4, life: 1.6, spread: 160, cell: 6, seed: 2 })
      label(x, 790, 1100, 'WORTH THE WAIT', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0078', key: 'C', accent: PLUM, solo: S, ending: 'group',
  title: 'Scorpio, you owe | *no instant reply.*',
  cameos: CAMEOS,
  group: { cap: 'Deep heart. | *Slow replies.*', mood: 'wink' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
