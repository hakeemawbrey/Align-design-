// r2t0080: star_talk ROLLCALL, "The signs’ | passport photos." (~54 s vertical, signs3kit social cut, music: lofi · F)
// Twelve signs in zodiac order at the passport photo booth, each the most extreme version of itself:
//   ♈ moved mid-flash, a blur · ♉ fell asleep mid-photo · ♊ took it twice, two different people · ♋ handed in their
//   baby photo · ♌ brought a stylist · ♍ measured it to the millimetre · ♎ asked the clerk "is this my angle?"
//   · ♏ stared so hard the camera blinked · ♐ hair still windblown from the last trip · ♑ ten years later, looks younger
//   · ♒ wore the alien headband · ♓ cried in the booth, photo approved
//  49.2   GROUP ENDING: "Ten years | *of this face.*"  An APPROVED stamp thumps onto the group photo.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const NAVY = '#7aa2ff', RED = '#e23d4e', ORANGE = '#ffb34a', GREEN = '#6fcf7a'
const ST = { x: -170 }

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
// an ID photo: white border, pale blue backdrop, a sign star inside; extra(x) draws over it (photo-local coords)
function idPhoto(x, t, cx, cy, k, sign, o = {}, extra) {
  if (!card(x, cx, cy, 250, 310, BONE, k, o.rot ?? 0.04)) return
  x.fillStyle = '#cfe6ff'; x.fillRect(-105, -135, 210, 230)
  x.restore()
  if (k > 0.5 && sign) {
    x.save(); x.translate(cx, cy); x.rotate(o.rot ?? 0.04); x.translate(-cx, -cy)
    x.beginPath(); x.rect(cx - 105, cy - 135, 210, 230); x.clip()
    if (o.blur) { x.globalAlpha = 0.35; for (let i = -2; i <= 2; i++) signChar(x, t, sign, cx + i * 22, cy - 15, 170, { mood: 'wide', seed: 11, glyph: false }) }
    else signChar(x, t, sign, cx, cy - 15, 170, { mood: o.mood || 'neutral', look: o.look, seed: 11, glyph: false, tears: o.tears || 0, zzz: false })
    if (extra) extra(x)
    x.restore()
  }
  x.save(); x.translate(cx, cy); x.rotate(o.rot ?? 0.04); x.scale(k, k)
  if (o.caption) text(x, o.caption, 0, 122, 24, INK, MONO, 700)
  x.restore()
}
const COMB = ['PPPPPPPPPPPP', 'PPPPPPPPPPPP', 'P.P.P.P.P.P.', 'P.P.P.P.P.P.', 'P.P.P.P.P.P.']
const EYE = ['...KKKKK...', '.KKWWWWWKK.', 'KWWWPPPWWWK', 'KWWPPKPPWWK', 'KWWWPPPWWWK', '.KKWWWWWKK.', '...KKKKK...']
const CAMERA = ['..KKK.....', 'KKKKKKKKKK', 'KWWWWWWWWK', 'KWWKKKWWWK', 'KWKSSSKWWK', 'KWKSSSKWWK', 'KWWKKKWWWK', 'KKKKKKKKKK']
// an APPROVED stamp
function stamp(x, cx, cy, k, word = 'APPROVED', col = GREEN) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.18); x.scale(k, k)
  x.strokeStyle = INK; x.lineWidth = 16; x.strokeRect(-170, -52, 340, 104)
  x.strokeStyle = col; x.lineWidth = 9; x.strokeRect(-170, -52, 340, 104)
  x.fillStyle = 'rgba(20,12,48,0.55)'; x.fillRect(-164, -46, 328, 92)
  text(x, word, 0, 4, 54, col, MONO, 700)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Moved mid-flash. | *Photo: a blur.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.3, 0.6, 0.9],
    front(x, t, lt, P) {
      idPhoto(x, t, 790, 860, pop01(t, P.t0 + 0.6, 0.3, 2), 'aries', { blur: true })
      label(x, 790, 640, 'RETAKE?', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.05 })
    } },
  { sign: 'taurus', cap: 'Fell asleep | *mid-photo.*', mood: 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      idPhoto(x, t, 790, 860, pop01(t, P.t0 + 0.4, 0.3, 2), 'taurus', { mood: 'sleepy' })
      label(x, 790, 1090, 'VALID 10 YRS', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Took it twice. | *Two different people.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      idPhoto(x, t, 690, 860, 0.8 * pop01(t, P.t0 + 0.3, 0.3, 2), 'gemini', { mood: 'happy', rot: -0.06 })
      idPhoto(x, t, 880, 880, 0.8 * pop01(t, P.t0 + 0.9, 0.3, 2), 'gemini', { mood: 'eyeroll', rot: 0.08 })
      label(x, 790, 1100, 'WHICH ONE?', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'cancer', cap: 'Handed in | *their baby photo.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      idPhoto(x, t, 790, 860, pop01(t, P.t0 + 0.3, 0.3, 2), null, { caption: 'AGE 2' }, null)
      const k = pop01(t, P.t0 + 0.5, 0.3, 2)
      if (k > 0.5) signChar(x, t, 'cancer', 793, 850, 110, { mood: 'heart', seed: 13, glyph: false })
      bubble(x, 790, 620, 'so cute, right?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Brought a stylist. | *For a passport.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, COMB, { P: PINK }, F.x + 30 + Math.sin(t * 7) * 30, F.top - 10, 10 * k, { rot: 0.2 })
      const k2 = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k2 > 0.01) signChar(x, t, 'libra', 820, 990, 180 * k2, { mood: 'happy', look: [-1, 0], seed: 15, glyph: false })
      label(x, 820, 720, 'STYLIST', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 40, bg: ORANGE, rot: 0.05 })
    } },
  { sign: 'virgo', cap: 'Measured it | *to the millimetre.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      idPhoto(x, t, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), 'virgo', { mood: 'squint', rot: 0 })
      const r = ease.outCubic(prog(lt, 0.6, 1.2))
      if (r > 0) { x.fillStyle = INK; x.fillRect(660, 1030, 260 * r, 30); x.fillStyle = GOLD; x.fillRect(664, 1034, 252 * r, 22); x.fillStyle = INK; for (let i = 0; i < 13 * r; i++) x.fillRect(668 + i * 20, 1034, 3, i % 2 ? 10 : 18) }
      label(x, 790, 1130, '35 x 45 MM', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Asked the clerk: | *“Is this my angle?”*', mood: 'sparkle', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CAMERA, { K: '#2a2350', W: '#c9c9d8', S: SKYB }, 800, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 650, 'my good side?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 800, 1090, 'NEXT, PLEASE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Stared so hard | *the camera blinked.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const blink = lt > 1.1 && lt < 1.5
      drawBits(x, CAMERA, { K: '#2a2350', W: '#c9c9d8', S: blink ? '#2a2350' : SKYB }, 800, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 650, 'uh… done?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Hair still windblown | *from the last trip.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      idPhoto(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 'sagittarius', { mood: 'happy' }, (x) => {
        x.strokeStyle = '#8a4a2e'; x.lineWidth = 9
        for (let i = 0; i < 6; i++) { x.beginPath(); x.moveTo(740 + i * 20, 760); x.quadraticCurveTo(720 + i * 26 + Math.sin(t * 5 + i) * 18, 720, 700 + i * 34, 735 + Math.sin(i) * 20); x.stroke() }
      })
      label(x, 790, 640, 'WIND: 100% SAG', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Ten years later. | *Looks younger.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      idPhoto(x, t, 690, 860, 0.8 * pop01(t, P.t0 + 0.2, 0.3, 2), 'capricorn', { mood: 'neutral', rot: -0.06, caption: '2016' })
      idPhoto(x, t, 880, 880, 0.8 * pop01(t, P.t0 + 0.8, 0.3, 2), 'capricorn', { mood: 'sparkle', rot: 0.08, caption: '2026' })
      label(x, 790, 1100, 'HOW??', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 44, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'aquarius', cap: 'Accessory: | *one alien headband.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (k > 0.01) {
        x.strokeStyle = INK; x.lineWidth = 12; x.beginPath(); x.moveTo(F.x - 30, F.top + 10); x.lineTo(F.x - 60, F.top - 70 * k); x.moveTo(F.x + 30, F.top + 10); x.lineTo(F.x + 60, F.top - 70 * k); x.stroke()
        x.strokeStyle = '#7dffb0'; x.lineWidth = 6; x.stroke()
        for (const d of [-1, 1]) { x.fillStyle = INK; x.beginPath(); x.arc(F.x + d * 60, F.top - 70 * k, 20, 0, Math.PI * 2); x.fill(); x.fillStyle = MINT; x.beginPath(); x.arc(F.x + d * 60, F.top - 70 * k, 14, 0, Math.PI * 2); x.fill() }
      }
      label(x, 800, 900, 'FOR SECURITY', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cried in the booth. | *Photo: approved.*', mood: 'sparkle', tears: lt => lt < 0.9 ? 2 : 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      idPhoto(x, t, 790, 840, pop01(t, P.t0 + 0.3, 0.3, 2), 'pisces', { mood: 'sparkle', tears: 2 })
      stamp(x, 790, 1050, 0.7 * pop01(t, P.t0 + 1.3, 0.25, 2.6))
    } },
]

const F = makeFilm({
  id: 'r2t0080', key: 'F', accent: NAVY, ending: 'group',
  title: 'The signs’ | *passport photos.*',
  cameos: CAMEOS,
  group: {
    cap: 'Ten years | *of this face.*',
    draw(x, t, lt) { stamp(x, 540, 700, 1.3 * pop01(t, t - lt + 1.6, 0.25, 2.6)) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
