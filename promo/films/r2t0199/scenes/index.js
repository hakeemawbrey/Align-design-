// r2t0199: star_talk, BE LIKE (twelve signs), "Storage full? | Zodiacs be like." (~57 s vertical, signs3kit social cut, lofi · D)
// The camera roll is full: each sign's most extreme reaction, in zodiac order. Ending: callback.
//   0.0–3.6    "Storage full? | *Zodiacs be like.*"
//   3.6–49.2   ♈ deleted everything, didn't check · ♉ can't delete a single photo of lunch · ♊ screenshots of screenshots
//              · ♋ fourteen albums called "family" · ♌ calls it a digital museum · ♍ albums sorted by colour and mood
//              · ♎ two identical pics, can't choose · ♏ the hidden folder is also full · ♐ every photo a blurry mountain
//              · ♑ plenty of space, smugly · ♒ deleted the camera app instead · ♓ can't delete the blurry dog pic, and tears
//  49.2        "Storage full. | *Hearts fuller.*"
//  52.6        CALLBACK: "Taurus’s fix? | *A second phone.*"  Taurus is back, holding two phones of lunch.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', BLUE = '#5aa8d8'

// a phone with a screen; fn(sx, sy, sw, sh) draws the screen in local coords
function phone(x, cx, cy, k, fn, { rot = 0.05, w = 250, h = 410 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = '#2a2350'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#140c30'; x.fillRect(-w / 2 + 14, -h / 2 + 30, w - 28, h - 60)
  x.save(); x.beginPath(); x.rect(-w / 2 + 14, -h / 2 + 30, w - 28, h - 60); x.clip()
  fn(x, -w / 2 + 14, -h / 2 + 30, w - 28, h - 60)
  x.restore(); x.restore()
}
function grid(x, sx, sy, sw, n, cols, fill) {
  const c = 3, s = (sw - 8 * (c + 1)) / c
  for (let i = 0; i < n; i++) { const px = sx + 8 + (i % c) * (s + 8), py = sy + 8 + Math.floor(i / c) * (s + 8); fill(px, py, s, i) }
}
function lunch(x, px, py, s, i) {
  x.fillStyle = '#fbf7ee'; x.fillRect(px, py, s, s)
  x.fillStyle = BONE; x.beginPath(); x.arc(px + s / 2, py + s / 2, s * 0.38, 0, 7); x.fill()
  x.fillStyle = [ORANGE, MINT, RED, GOLD][i % 4]; x.beginPath(); x.arc(px + s / 2, py + s / 2, s * 0.22, 0, 7); x.fill()
}
function msg(text, size = 28) {
  return (x, sx, sy, sw, sh) => { x.fillStyle = BONE; x.font = `700 ${size}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, sx + sw / 2, sy + sh / 2) }
}

const CAMEOS = [
  { sign: 'aries', cap: 'Deleted everything. | *Didn’t check.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 790, 870, pop01(t, P.t0 + 0.2, 0.35, 2), (x, sx, sy, sw, sh) => {
        if (lt < 0.9) grid(x, sx, sy, sw, 12, 3, (px, py, s, i) => { x.fillStyle = [PINK, SKYB, GOLD, MINT][i % 4]; x.fillRect(px, py, s, s) })
        else msg('0 PHOTOS', 32)(x, sx, sy, sw, sh)
      })
      label(x, 790, 1120, 'ALSO: THE WEDDING', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Can’t delete one | *photo of lunch.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 870, pop01(t, P.t0 + 0.2, 0.35, 2), (x, sx, sy, sw) => grid(x, sx, sy, sw, Math.min(12, 1 + Math.floor(lt * 7)), 3, (px, py, s, i) => lunch(x, px, py, s, i)))
      label(x, 790, 1120, 'LUNCH, TUESDAY ×40', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Screenshots | *of screenshots.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.2) / 1.4) * 5)
      for (let i = 0; i < n; i++) phone(x, 790, 870, 1 - i * 0.14, (x, sx, sy, sw, sh) => { x.fillStyle = i % 2 ? '#2a2350' : '#140c30'; x.fillRect(sx, sy, sw, sh) }, { rot: 0.05 - i * 0.03 })
      label(x, 790, 1120, 'SCREENSHOT SAVED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: '#ffd23a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Fourteen albums | called *“family.”*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) {
        const k = pop01(t, P.t0 + 0.2 + i * 0.14, 0.3, 2)
        if (k <= 0.01) continue
        const px = 690 + (i % 2) * 200, py = 700 + Math.floor(i / 2) * 150
        x.save(); x.translate(px, py); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-86, -56, 172, 112); x.fillStyle = ['#cfe0ff', PINK, MINT][i % 3]; x.fillRect(-80, -50, 160, 100)
        x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`FAMILY ${i + 1}`, 0, 0)
        x.restore()
      }
    } },
  { sign: 'leo', cap: 'Calls it | a *digital museum.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      phone(x, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), (x, sx, sy, sw, sh) => { x.fillStyle = GOLD; x.fillRect(sx + 20, sy + 40, sw - 40, sh - 80); x.fillStyle = '#ffb34a'; x.fillRect(sx + 40, sy + 60, sw - 80, sh - 120) }, { rot: 0 })
      label(x, 790, 640, 'THE LEO MUSEUM', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04 })
      label(x, 790, 1140, 'FREE ENTRY', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Albums sorted by | *colour. And mood.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 790, 870, pop01(t, P.t0 + 0.2, 0.35, 2), (x, sx, sy, sw) => {
        const cols = [RED, ORANGE, GOLD, MINT, SKYB, LAV]
        for (let r = 0; r < 6; r++) for (let c = 0; c < 3; c++) { x.fillStyle = cols[r]; x.fillRect(sx + 10 + c * 72, sy + 10 + r * 56, 64, 48) }
      })
      label(x, 790, 1120, 'MOOD: TEAL', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Two identical pics. | *Can’t choose.*', mood: lt => lt > 1.0 ? 'wide' : 'squint', look: lt => [Math.sin(lt * 5) > 0 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 2; i++) {
        const k = pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2)
        if (k <= 0.01) continue
        const px = 700 + i * 180
        x.save(); x.translate(px, 860); x.rotate((i ? 0.06 : -0.06)); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-80, -100, 160, 200); x.fillStyle = '#fbf7ee'; x.fillRect(-72, -92, 144, 184)
        x.restore()
        signChar(x, t, 'libra', px, 850, 110 * k, { mood: 'sparkle', seed: 70, glyph: false, glow: 0.4, bob: 0 })
      }
      label(x, 790, 640, 'A or B?', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 40, bg: PINK, rot: 0.04 })
      label(x, 790, 1100, 'KEEPING BOTH', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 28, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'The hidden folder? | *Also full.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 880); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -110, 300, 230); x.fillRect(-150, -140, 130, 40)
        x.fillStyle = '#b8243a'; x.fillRect(-142, -102, 284, 214); x.fillRect(-142, -132, 114, 36)
        x.fillStyle = INK; x.fillRect(-36, -20, 72, 60); x.strokeStyle = INK; x.lineWidth = 12; x.beginPath(); x.arc(0, -24, 26, Math.PI, 0); x.stroke()
        x.fillStyle = GOLD; x.fillRect(-28, -12, 56, 44)
        x.restore()
      }
      label(x, 790, 1110, 'FULL', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 44, bg: '#ff6b8a', rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Every photo: | *a blurry mountain.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      phone(x, 790, 870, pop01(t, P.t0 + 0.2, 0.35, 2), (x, sx, sy, sw) => grid(x, sx, sy, sw, 12, 3, (px, py, s, i) => {
        x.fillStyle = SKYB; x.fillRect(px, py, s, s)
        x.fillStyle = '#6b62a8'; x.beginPath(); x.moveTo(px + 4 + (i % 2) * 6, py + s); x.lineTo(px + s / 2 + (i % 3) * 4, py + s * 0.3); x.lineTo(px + s - 2, py + s); x.fill()
      }))
      label(x, 790, 1120, 'ALL SLIGHTLY TILTED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 26, bg: LAV, rot: 0.06, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Storage? | *Plenty.* Smugly.', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 790, 870, pop01(t, P.t0 + 0.2, 0.35, 2), (x, sx, sy, sw, sh) => {
        x.fillStyle = BONE; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('STORAGE', sx + sw / 2, sy + 80)
        x.fillStyle = INK; x.fillRect(sx + 20, sy + 120, sw - 40, 40); x.fillStyle = MINT; x.fillRect(sx + 24, sy + 124, (sw - 48) * 0.1, 32)
        x.fillStyle = MINT; x.fillText('LOTS FREE', sx + sw / 2, sy + 210)
      })
      label(x, 790, 1120, 'DELETES WEEKLY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Deleted the camera app | *instead.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 790, 870, pop01(t, P.t0 + 0.2, 0.35, 2), (x, sx, sy, sw) => {
        for (let i = 0; i < 9; i++) { if (i === 4 && lt > 1.0) continue; x.fillStyle = [PINK, SKYB, GOLD, MINT, '#9aa5c4', LAV][i % 6]; x.fillRect(sx + 18 + (i % 3) * 70, sy + 40 + Math.floor(i / 3) * 90, 54, 54) }
        if (lt > 0.4 && lt <= 1.0) { x.fillStyle = INK; x.fillRect(sx + 88, sy + 130, 54, 54); x.fillStyle = BONE; x.beginPath(); x.arc(sx + 115, sy + 157, 14, 0, 7); x.fill() }
      })
      bubble(x, 790, 640, 'problem solved', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Can’t delete | *the blurry dog pic.*', mood: 'heart', tears: lt => lt < 0.9 ? 2 : 3, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 790, 870, pop01(t, P.t0 + 0.2, 0.35, 2), (x, sx, sy, sw, sh) => {
        x.fillStyle = '#7fb8d8'; x.fillRect(sx, sy, sw, sh)
        x.save(); x.filter = 'blur(6px)'; x.fillStyle = '#c98f5a'; x.beginPath(); x.ellipse(sx + sw / 2, sy + sh / 2 + 20, 70, 50, 0, 0, 7); x.fill(); x.beginPath(); x.arc(sx + sw / 2 + 50, sy + sh / 2 - 30, 36, 0, 7); x.fill(); x.restore()
      })
      label(x, 790, 1120, 'BEST PHOTO EVER', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0199', key: 'D', accent: SKYB, ending: 'callback',
  title: 'Storage full? | *Zodiacs be like.*',
  cameos: CAMEOS,
  group: { cap: 'Storage full. | *Hearts fuller.*' },
  last: {
    text: 'Taurus’s fix? | *A second phone.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const s = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (s > 0.01) signChar(x, t, 'taurus', 540, 1080, 260 * s, { mood: lt > 1.6 ? 'heart' : 'sparkle', seed: 44, hops: [t0 + 1.6] })
      phone(x, 300, 1040, pop01(t, t0 + 0.8, 0.35, 2), (x, sx, sy, sw) => grid(x, sx, sy, sw, 12, 3, (px, py, s, i) => lunch(x, px, py, s, i)), { rot: -0.12, w: 200, h: 330 })
      phone(x, 780, 1040, pop01(t, t0 + 1.1, 0.35, 2), (x, sx, sy, sw) => grid(x, sx, sy, sw, 6, 3, (px, py, s, i) => lunch(x, px, py, s, i)), { rot: 0.12, w: 200, h: 330 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
