// r2t0037: THE SIGNS AS… v3 SOLO, "Being a Leo | be like." (~43 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole film (makeFilm solo mode, 9 cards). Ending: group (the group beat is the punchline).
//   0.0–3.6    "Being a Leo | *be like.*"
//   3.6–37.8   walked in, waited for applause · group photo: centre, always · got a compliment, asked for another
//              · sunglasses indoors at night · lost a board game, demanded a recount · "I'm here" = red carpet
//              · rewrote their horoscope nicer · hosted dinner, gave a speech about themself · one like: thanked the fans
//  37.8        "Not dramatic. | Just *the main event.*"  The big Leo is back.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, inSprite,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'leo', ORANGE = '#ffb34a', RED = '#e23d4e', NAVY = '#2a2350', WOOD = '#b77a45'
function box(x, l, tp, w, h, col, b = 6) { x.fillStyle = INK; x.fillRect(l - b, tp - b, w + 2 * b, h + 2 * b); x.fillStyle = col; x.fillRect(l, tp, w, h) }
function shadow(x, l, tp, w, h) { x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(l + 10, tp + 12, w, h) }
function txt(x, s, px, py, size, col = INK, { font = INTER, weight = 800, align = 'center' } = {}) { x.fillStyle = col; x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py) }

// a lit APPLAUSE sign, blinking
function applause(x, t, cx, cy, k, on) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  shadow(x, -170, -60, 340, 120); box(x, -170, -60, 340, 120, NAVY)
  const lit = on && Math.floor(t * 3) % 3 !== 0
  if (lit) { x.shadowColor = RED; x.shadowBlur = 30 }
  txt(x, 'APPLAUSE', 0, 4, 52, lit ? '#ff6b6b' : '#5a4a7a', { font: MONO, weight: 700 })
  x.restore()
}
// a group photo: four little stars, Leo huge in the middle
function groupPhoto(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  shadow(x, -190, -150, 380, 300); box(x, -190, -150, 380, 300, BONE); x.fillStyle = '#3a2a6a'; x.fillRect(-170, -130, 340, 230)
  ;[['virgo', -120, 50], ['libra', -70, 60], ['aries', 70, 60], ['pisces', 120, 50]].forEach(([id, px, py], i) => signChar(x, t, id, px, py, 70, { mood: 'happy', seed: 30 + i, glyph: false, glow: 0.4, tears: id === 'pisces' ? 1 : 0 }))
  signChar(x, t, 'leo', 0, -10, 190, { mood: 'sparkle', seed: 35, glyph: false, glow: 0.6 })
  txt(x, 'THE GANG ♡', 0, 128, 24, INK, { font: MONO, weight: 700 })
  x.restore()
}
const SHADES = ['KKKKKKK.KKKKKKK', 'KGGGGGKKKGGGGGK', 'KGGGGGK.KGGGGGK', '.KGGGK...KGGGK.', '..KKK.....KKK..']
function dice(x, cx, cy, k, n, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  box(x, -50, -50, 100, 100, BONE); x.fillStyle = INK
  const P = { 1: [[0, 0]], 2: [[-1, -1], [1, 1]], 3: [[-1, -1], [0, 0], [1, 1]] }[n]
  for (const [a, b] of P) x.fillRect(a * 26 - 9, b * 26 - 9, 18, 18)
  x.restore()
}
function carpet(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-90, -200); x.lineTo(90, -200); x.lineTo(190, 160); x.lineTo(-190, 160); x.fill()
  x.fillStyle = RED; x.beginPath(); x.moveTo(-82, -194); x.lineTo(82, -194); x.lineTo(180, 154); x.lineTo(-180, 154); x.fill()
  for (const s of [-1, 1]) {
    for (let j = 0; j < 2; j++) { const px = s * (130 + j * 60) , py = -80 + j * 160; box(x, px - 8, py - 60, 16, 90, GOLD, 4); x.fillStyle = GOLD; x.beginPath(); x.arc(px, py - 66, 14, 0, Math.PI * 2); x.fill() }
  }
  x.restore()
}
function horoscope(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  shadow(x, -160, -190, 320, 380); box(x, -160, -190, 320, 380, '#fff4e2')
  x.fillStyle = ORANGE; x.fillRect(-160, -190, 320, 54); txt(x, '♌︎ HOROSCOPE', 0, -162, 28, INK, { font: MONO, weight: 700 })
  for (let i = 0; i < 4; i++) { x.fillStyle = '#b9b0a0'; x.fillRect(-130, -100 + i * 36, 260 - (i % 2) * 60, 14) }
  if (lt > 0.8) { x.strokeStyle = RED; x.lineWidth = 10; const p = ease.outCubic(prog(lt, 0.8, 1.1)); x.beginPath(); x.moveTo(-140, -110); x.lineTo(-140 + 280 * p, 20 * p); x.stroke() }
  if (lt > 1.2) { txt(x, '“You are', 0, 80, 34, RED, { font: INTER, weight: 800 }); txt(x, 'perfect.”', 0, 124, 34, RED, { font: INTER, weight: 800 }) }
  x.restore()
}
function podium(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  shadow(x, -110, -40, 220, 220); box(x, -110, -40, 220, 220, WOOD); box(x, -130, -60, 260, 30, '#8a4a2e')
  x.fillStyle = GOLD; x.beginPath(); x.arc(0, 60, 34, 0, Math.PI * 2); x.fill(); txt(x, '♌︎', 0, 62, 36, INK, { font: "'Segoe UI Symbol', 'Noto Sans Symbols', serif", weight: 700 })
  x.restore()
}
function likePhone(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  shadow(x, -130, -210, 260, 420); box(x, -130, -210, 260, 420, NAVY); x.fillStyle = '#140c30'; x.fillRect(-114, -180, 228, 360)
  x.fillStyle = '#3a2a6a'; x.fillRect(-96, -160, 192, 192); signChar(x, t, 'leo', 0, -60, 150, { mood: 'wink', seed: 81, glyph: false, glow: 0.5 })
  const p = pop01(lt, 0.7, 0.3, 2.4)
  x.save(); x.translate(-50, 90); x.scale(p, p); x.fillStyle = RED; x.font = `800 64px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♥', 0, 0); x.restore()
  txt(x, '1 like', 40, 92, 34, BONE)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Walked into the room. | *Waited for applause.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -170 }, hops: [0.8],
    front(x, t, lt, P) {
      applause(x, t, 780, 700, pop01(t, P.t0 + 0.3, 0.3, 2), lt > 0.6)
      bubble(x, 780, 1000, '…any second now', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: S, cap: 'Group photo? | *Centre. Always.*', mood: 'sparkle', star: { x: -200, y: 40, s: 240 },
    front(x, t, lt, P) {
      groupPhoto(x, t, 720, 820, pop01(t, P.t0 + 0.2, 0.35, 2))
      sparkles(x, t, 720, 790, P.t0 + 0.8, 7, 190, 0.2)
      label(x, 720, 1060, 'FLASH ON', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Got one compliment. | *Asked for a sequel.*', mood: lt => lt > 1.3 ? 'wink' : 'heart', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'nice outfit!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: MINT, tail: 'br' })
      bubble(x, 760, 920, 'and…?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 60, tail: 'bl' })
      label(x, 790, 1100, 'PART 2, PLEASE', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: ORANGE, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Sunglasses indoors. | *At night.*', mood: 'happy', star: { x: -60, s: 340 }, hops: [1.3],
    front(x, t, lt, P, F) {
      const d = ease.outBack ? ease.outBack(prog(lt, 0.3, 0.8)) : ease.outCubic(prog(lt, 0.3, 0.8))
      if (lt > 0.3) inSprite(x, F, () => drawBits(x, SHADES, { K: INK, G: '#3a2a6a' }, 18, lerp(-6, 19.5, d), 1.6))
      label(x, 820, 700, '11:48 PM', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 540, 860, P.t0 + 0.9, 7, 220, 0.3)
    } },
  { sign: S, cap: 'Lost at a board game. | *Demanded a recount.*', mood: lt => lt > 1.1 ? 'squint' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      dice(x, 720, 900, pop01(t, P.t0 + 0.2, 0.3, 2), 1, -0.2)
      dice(x, 860, 940, pop01(t, P.t0 + 0.35, 0.3, 2), 2, 0.25)
      label(x, 790, 720, 'RECOUNT!', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 52, bg: RED, color: '#fff4e2', rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1110, 'it was a 6', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Texted “I’m here.” | Expected a *red carpet.*', mood: 'sparkle', star: { x: 0, y: -40, s: 260 }, hops: [1.0, 1.6],
    back(x, t, lt, P) { carpet(x, t, 540, 960, pop01(t, P.t0 + 0.2, 0.35, 2)) },
    front(x, t, lt, P) {
      label(x, 540, 640, 'ARRIVED ✦', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: GOLD, font: MONO, weight: 700 })
      sparkles(x, t, 540, 860, P.t0 + 1.0, 8, 220, 0.6)
    } },
  { sign: S, cap: 'Read their horoscope. | *Rewrote it nicer.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) { horoscope(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt) } },
  { sign: S, cap: 'Hosted dinner. | The speech? *About them.*', mood: 'sparkle', look: [-1, 0], star: { x: 170, y: -60, s: 250 },
    back(x, t, lt, P) {
      x.save(); x.globalAlpha = 0.22 * pop01(t, P.t0 + 0.1, 0.3, 2); x.fillStyle = '#fff1c8'; x.beginPath(); x.moveTo(660, 520); x.lineTo(760, 520); x.lineTo(900, 1150); x.lineTo(520, 1150); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      podium(x, t, 710, 1030, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 340, 740, 'SPEECH: PART 4', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 32, bg: ORANGE, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 340, 960, 'and then I…', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
  { sign: S, cap: 'Got one like. | *Thanked the fans.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      likePhone(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      bubble(x, 390, 640, 'thank you all!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'r2t0037', key: 'E', accent: ORANGE, solo: S, ending: 'group',
  title: 'Being a Leo | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Not dramatic. | Just *the main event.*', mood: 'sparkle' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
