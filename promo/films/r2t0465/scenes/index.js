// r2t0465: star_talk, ROLLCALL, "The signs | *on picture day.*" (signs3kit social cut, music: lofi · F). Ending: callback.
//   ♈ jumped in before "say cheese" · ♉ brought a snack into the photo · ♊ two outfits, wore both · ♋ held up a photo of
//   their mom · ♌ brought their own ring light · ♍ fixed every collar, missed their own photo · ♎ good side or other side,
//   take 38 · ♏ refused to smile, best photo there · ♐ photobombed fourteen classes · ♑ wore a full suit, age nine
//   · ♒ profile pic: the laser background · ♓ cried at the flash, framed the photo
//   group "Everyone | blinked."   last "Scorpio smiled once. | Not pictured." (a smiling Scorpio, off camera)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ffb34a', CREAM = '#fff4e2', RED = '#e23d4e', GREY = '#9aa5c4', PURP = '#6b62a8', DEEP = '#2a2350'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const ST = { x: -170 }

/** a photo frame (cream border, dark backdrop) drawn behind/around (cx, cy); w×h inner */
function frame(x, cx, cy, k, { w = 230, h = 260, rot = 0, bg = '#3a3260', laser = false, t = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 - 6, -h / 2 + 2, w + 32, h + 50)
  x.fillStyle = INK; x.fillRect(-w / 2 - 22, -h / 2 - 22, w + 44, h + 70); x.fillStyle = CREAM; x.fillRect(-w / 2 - 14, -h / 2 - 14, w + 28, h + 54)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (laser) { x.save(); x.beginPath(); x.rect(-w / 2, -h / 2, w, h); x.clip(); for (let i = 0; i < 8; i++) { x.strokeStyle = [PINK, SKYB, MINT, '#c97bff'][i % 4]; x.lineWidth = 8; x.beginPath(); x.moveTo(-w / 2 + ((i * 60 + t * 80) % (w + 200)) - 100, -h / 2); x.lineTo(-w / 2 + ((i * 60 + t * 80) % (w + 200)) - 200, h / 2); x.stroke() } x.restore() }
  x.restore()
}
/** a camera flash burst */
function flash(x, t, cx, cy, t0) {
  const d = t - t0; if (d < 0 || d > 0.4) return
  x.save(); x.globalAlpha = 1 - d / 0.4; x.fillStyle = '#fffbe8'
  for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; x.save(); x.translate(cx, cy); x.rotate(a); x.fillRect(20, -8, 90 + d * 200, 16); x.restore() }
  x.beginPath(); x.arc(cx, cy, 50, 0, Math.PI * 2); x.fill(); x.restore()
}
const CAMERA = ['....KKK.....', 'KKKKKKKKKKKK', 'KGGGGGGGGGWK', 'KGGGKKKKGGGK', 'KGGKBBBBKGGK', 'KGGKBWBBKGGK', 'KGGKBBBBKGGK', 'KGGGKKKKGGGK', 'KGGGGGGGGGGK', 'KKKKKKKKKKKK']
const CAMERA_C = { K: INK, G: GREY, W: '#ffffff', B: SKYB }
const SANDWICH = ['..BBBBBBBB..', '.BBWBBBBBBB.', 'BBBBBBBBBBBB', 'GGGGGGGGGGGG', 'RRRRRRRRRRRR', 'BBBBBBBBBBBB', '.BBBBBBBBBB.']
const SANDWICH_C = { B: '#e0a458', W: CREAM, G: '#5fd068', R: RED }
const HAT = ['..KKKKK..', '..KKKKK..', '..KRRRK..', 'KKKKKKKKK']
const BOW = ['P...P', 'PP.PP', 'PPPPP', 'PP.PP', 'P...P']
const TIE = ['.RRR.', '..R..', '.RRR.', '.RRR.', 'RRRRR', '.RRR.', '..R..']
const COMB = ['KKKKKKKKKK', 'K.K.K.K.K.']

const CAMEOS = [
  { sign: 'aries', cap: 'Jumped in | *before “say cheese.”*', mood: 'sparkle', star: { x: -120 }, hops: [0.3, 0.6],
    front(x, t, lt, P) {
      drawBits(x, CAMERA, CAMERA_C, 820, 740, 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      bubble(x, 820, 960, '3… 2…', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 42, col: LAV, tail: 'bc' })
      L(x, 820, 1120, 'TAKE 1: BLUR', pop01(t, P.t0 + 1.2, 0.3, 2.2), RED, 0.04, 36, CREAM)
      flash(x, t, 820, 740, P.t0 + 0.6)
    } },
  { sign: 'taurus', cap: 'Brought a snack | *into the photo.*', mood: 'happy', star: ST,
    back(x, t, lt, P) { frame(x, 370, 860, pop01(t, P.t0 + 0.1, 0.3, 2), { w: 330, h: 330 }) },
    front(x, t, lt, P) {
      drawBits(x, SANDWICH, SANDWICH_C, 790, 900, 20 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: 0.1 })
      L(x, 790, 680, 'SAY CHEESE?', pop01(t, P.t0 + 0.8, 0.3, 2.2), BONE, -0.04, 34)
      L(x, 790, 1110, 'SAY SANDWICH', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 36)
    } },
  { sign: 'gemini', cap: 'Two outfits. | *Wore both.*', mood: lt => lt < 1.2 ? 'happy' : 'wink', star: ST, hops: [1.2],
    front(x, t, lt, P, F) {
      drawBits(x, HAT, { K: INK, R: RED }, F.x - 30, F.top - 30, 13 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: -0.2 })
      drawBits(x, BOW, { P: PINK }, F.x + 60, F.top - 4, 13 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: 0.3 })
      L(x, 790, 760, 'OUTFIT A', pop01(t, P.t0 + 0.5, 0.3, 2), BONE, -0.04, 36)
      L(x, 790, 860, '+ OUTFIT B', pop01(t, P.t0 + 0.9, 0.3, 2), PINK, 0.04, 36)
      L(x, 790, 1060, 'STYLE: YES', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, -0.04, 36)
    } },
  { sign: 'cancer', cap: 'Held up a photo | *of their mom.*', mood: lt => lt < 1.0 ? 'happy' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      frame(x, 790, 860, k, { w: 230, h: 240, rot: 0.06 })
      if (k > 0.5) { x.save(); x.translate(790, 860); x.rotate(0.06); x.translate(-790, -860); signChar(x, t, 'cancer', 790, 870, 160, { mood: 'heart', seed: 44, glyph: false, glow: 0.4 }); x.restore() }
      L(x, 790, 1120, 'MOM ♡', pop01(t, P.t0 + 1.0, 0.3, 2.2), PINK, -0.04, 40)
    } },
  { sign: 'leo', cap: 'Brought their own | *ring light.*', mood: 'sparkle', star: { x: -120 },
    back(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = clamp(k); x.strokeStyle = INK; x.lineWidth = 46; x.beginPath(); x.arc(F.x, F.cy - 10, 200, 0, Math.PI * 2); x.stroke()
      x.strokeStyle = '#fffbe8'; x.shadowColor = '#fffbe8'; x.shadowBlur = 40; x.lineWidth = 30; x.beginPath(); x.arc(F.x, F.cy - 10, 200, 0, Math.PI * 2); x.stroke(); x.restore()
    },
    front(x, t, lt, P) { L(x, 830, 1150, 'LIGHTING: MINE', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, 0.04, 34); sparkles(x, t, 420, 860, P.t0 + 1.2, 8, 260, 0.2) } },
  { sign: 'virgo', cap: 'Fixed everyone’s collar. | *Missed the photo.*', mood: lt => lt < 1.3 ? 'squint' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, COMB, { K: GREY }, 600, 760, 12 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.3 })
      L(x, 800, 720, 'COLLARS: 31', pop01(t, P.t0 + 0.5, 0.3, 2), MINT, -0.04, 36)
      L(x, 800, 900, 'PHOTO: TAKEN', pop01(t, P.t0 + 1.3, 0.3, 2.2), RED, 0.04, 36, CREAM)
      bubble(x, 800, 1080, 'wait, me?!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'Good side? Other side? | *Take 38.*', mood: lt => lt < 1.3 ? 'squint' : 'happy', look: lt => [Math.sin(lt * 5) > 0 ? 1 : -1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.2) / 1.6) * 37)
      drawBits(x, CAMERA, CAMERA_C, 820, 800, 24 * pop01(t, P.t0 + 0.15, 0.3, 2))
      L(x, 820, 1040, `TAKE ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), GOLD, 0.04, 44)
      flash(x, t, 820, 800, P.t0 + 0.7 + Math.floor(Math.max(0, lt - 0.4) / 0.5) * 0.65)
    } },
  { sign: 'scorpio', cap: 'Refused to smile. | *Best photo there.*', mood: 'squint', look: [0, 0], star: ST,
    back(x, t, lt, P) { frame(x, 370, 860, pop01(t, P.t0 + 0.1, 0.3, 2), { w: 330, h: 330 }) },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'smile!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: LAV, tail: 'br' })
      bubble(x, 790, 860, 'no.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 52, tail: 'bl' })
      L(x, 790, 1080, 'ICONIC', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 44)
    } },
  { sign: 'sagittarius', cap: 'Photobombed | *every single class.*', mood: lt => lt < 1.0 ? 'sparkle' : 'wink', star: { x: 180, y: -60, s: 220 }, hops: [0.5, 1.1, 1.7],
    back(x, t, lt, P) {
      const ids = ['taurus', 'cancer', 'capricorn']
      frame(x, 450, 900, pop01(t, P.t0 + 0.1, 0.3, 2), { w: 420, h: 300 })
      ids.forEach((id, i) => { const k = pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2); if (k > 0.01) signChar(x, t, id, 330 + i * 120, 940, 130 * k, { mood: 'happy', seed: 50 + i, glyph: false, glow: 0.4 }) })
    },
    front(x, t, lt, P) { L(x, 450, 640, 'IN 14 PHOTOS', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, -0.04, 36) } },
  { sign: 'capricorn', cap: 'Wore a full suit. | *Age nine.*', mood: 'neutral', look: [0, 0], star: ST,
    front(x, t, lt, P, F) {
      drawBits(x, TIE, { R: RED }, F.x, F.cy + 80, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 760, 'GRADE 4', pop01(t, P.t0 + 0.5, 0.3, 2), BONE, -0.04, 38)
      L(x, 800, 900, 'BRIEFCASE ✓', pop01(t, P.t0 + 1.0, 0.3, 2.2), MINT, 0.04, 36)
    } },
  { sign: 'aquarius', cap: 'Profile pic? | *The laser background.*', mood: 'sparkle', star: { x: 150 },
    back(x, t, lt, P) { frame(x, 690, 860, pop01(t, P.t0 + 0.1, 0.3, 2), { w: 380, h: 380, laser: true, t }) },
    front(x, t, lt, P) { L(x, 360, 640, 'MY PROFILE', pop01(t, P.t0 + 0.8, 0.3, 2.2), SKYB, -0.05, 34); L(x, 360, 1120, 'SET ✓', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.05, 36) } },
  { sign: 'pisces', cap: 'Cried at the flash. | *Framed the photo.*', mood: 'sparkle', tears: 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.4, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CAMERA, CAMERA_C, 820, 700, 17 * pop01(t, P.t0 + 0.15, 0.3, 2))
      flash(x, t, 820, 700, P.t0 + 0.4)
      const k = pop01(t, P.t0 + 1.2, 0.3, 2)
      frame(x, 820, 1000, k * 0.8, { w: 200, h: 200, rot: 0.05 })
      if (k > 0.5) signChar(x, t, 'pisces', 820, 1005, 120, { mood: 'sparkle', seed: 61, glyph: false, glow: 0.4, tears: 2 })
    } },
]

const F = makeFilm({
  id: 'r2t0465', key: 'F', accent: ACC, ending: 'callback',
  title: 'The signs | *on picture day.*',
  cameos: CAMEOS,
  group: { cap: 'Everyone | *blinked.*', moods: Array(12).fill('sleepy') },
  last: {
    text: 'Scorpio smiled once. | *Not pictured.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.6, 0.4, 2)
      if (k > 0.01) signChar(x, t, 'scorpio', 540, 1060, 340 * k, { mood: lt > 1.4 ? 'happy' : 'squint', seed: 8, hops: [t - lt + 1.4] })
      label(x, 540, 1330, 'CAMERA: OFF', pop01(t, t - lt + 1.5, 0.3, 2.4), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
