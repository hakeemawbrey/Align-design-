// r2t0087: star_talk BE LIKE, "Your vacation pics? | Zodiacs be like." (~61 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order reacting to a friend's holiday photos, each the most extreme version of itself:
//   ♈ booked the same trip mid-scroll · ♉ zoomed in on the food · ♊ already showing you theirs · ♋ "did you wear sunscreen?"
//   · ♌ "why am I not in these?" · ♍ the horizon is crooked · ♎ can't pick a favourite · ♏ zoomed in on the background
//   · ♐ been there, twice · ♑ "what did that cost?" · ♒ only likes the blurry one · ♓ photo 300, still sobbing
//  49.2   "Nobody asked | for *photo 301.*"  group photo
//  52.4   LESSON: "Show them anyway. | *Your people look.*"  SEEN: ALL 300
//  58.3   "Next trip? | *Bring them.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SEA = '#3a7bd5', SAND = '#f2d49a', SUNC = '#ffb34a', RED = '#e23d4e'

// a polaroid holiday photo: sky, sun, sea, sand (optionally tilted horizon, blurred, a stranger in the back, food)
function polaroid(x, t, cx, cy, k, { rot = 0.05, w = 260, tilt = 0, blur = 0, stranger = false, food = false, me = false } = {}) {
  if (k <= 0.01) return
  const h = w * 1.18, iw = w - 32, ih = w - 40
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = '#fff4e2'; x.fillRect(-w / 2, -h / 2, w, h)
  x.save(); x.beginPath(); x.rect(-iw / 2, -h / 2 + 16, iw, ih); x.clip()
  if (blur) x.filter = `blur(${blur}px)`
  x.translate(0, -h / 2 + 16 + ih / 2); x.rotate(tilt)
  x.fillStyle = '#8fd3ff'; x.fillRect(-iw, -ih, iw * 2, ih)
  x.fillStyle = SUNC; x.beginPath(); x.arc(iw * 0.22, -ih * 0.2, iw * 0.11, 0, Math.PI * 2); x.fill()
  x.fillStyle = SEA; x.fillRect(-iw, 0, iw * 2, ih * 0.22)
  x.fillStyle = SAND; x.fillRect(-iw, ih * 0.22, iw * 2, ih)
  // palm tree
  x.fillStyle = '#8a4a2e'; x.fillRect(-iw * 0.32, -ih * 0.18, 10, ih * 0.5)
  x.fillStyle = '#2fc79a'; x.fillRect(-iw * 0.32 - 34, -ih * 0.24, 78, 14); x.fillRect(-iw * 0.32 - 14, -ih * 0.3, 38, 12)
  if (stranger) { x.fillStyle = INK; x.fillRect(iw * 0.3, -ih * 0.02, 10, 20); x.fillRect(iw * 0.3 - 3, -ih * 0.06, 16, 12) }
  if (food) { x.fillStyle = '#fff4e2'; x.beginPath(); x.ellipse(0, ih * 0.36, 52, 16, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#e8a24a'; x.fillRect(-26, ih * 0.3, 52, 16); x.fillStyle = '#5fd068'; x.fillRect(-20, ih * 0.27, 14, 8) }
  x.restore()
  if (me) { x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.fillText('wish u were here', 0, h / 2 - 22) }
  x.restore()
}
// a round magnifying glass
function magnifier(x, cx, cy, r, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.strokeStyle = INK; x.lineWidth = 30; x.beginPath(); x.moveTo(r * 0.7, r * 0.7); x.lineTo(r * 1.5, r * 1.5); x.stroke()
  x.strokeStyle = '#8a4a2e'; x.lineWidth = 18; x.beginPath(); x.moveTo(r * 0.75, r * 0.75); x.lineTo(r * 1.45, r * 1.45); x.stroke()
  x.strokeStyle = INK; x.lineWidth = 22; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.stroke()
  x.strokeStyle = '#c9c9d8'; x.lineWidth = 12; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.stroke()
  x.fillStyle = 'rgba(143,227,255,0.22)'; x.beginPath(); x.arc(0, 0, r - 6, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.6)'; x.fillRect(-r * 0.5, -r * 0.55, r * 0.3, 10)
  x.restore()
}
const TICKET = ['RRRRRRRRRRRRRR', 'RWWWWWWWWWWWWR', 'RWKKKWWWWKKKWR', 'RWWWWWKKWWWWWR', 'RWKKKWWWWKKKWR', 'RWWWWWWWWWWWWR', 'RRRRRRRRRRRRRR']
const BOTTLE = ['..KK..', '..KK..', '.OOOO.', 'OOOOOO', 'OWWWWO', 'OWOOWO', 'OWWWWO', 'OOOOOO', 'OOOOOO', '.OOOO.']
const CALC = ['KKKKKKKKK', 'KGGGGGGGK', 'KGGGGGGGK', 'KKKKKKKKK', 'KWKWKWKOK', 'KKKKKKKKK', 'KWKWKWKOK', 'KKKKKKKKK', 'KWKWKWKOK', 'KKKKKKKKK']
const PHONE = ['KKKKKKKK', 'KSSSSSSK', 'KSYYSSSK', 'KSYYSSSK', 'KBBBBBBK', 'KBBBBBBK', 'KDDDDDDK', 'KDDDDDDK', 'KSSSSSSK', 'KKKGGKKK', 'KKKKKKKK']
const PHONE_C = { K: '#2a2350', S: '#8fd3ff', Y: SUNC, B: SEA, D: SAND, G: '#6b62a8' }

const CAMEOS = [
  { sign: 'aries', cap: 'Swiped twice. | *Booked the trip.*', mood: lt => lt > 1.1 ? 'sparkle' : 'wide', star: { x: -170 }, hops: [1.1, 1.5],
    front(x, t, lt, P) {
      polaroid(x, t, 760, 820, pop01(t, P.t0 + 0.15, 0.3, 2), { rot: -0.06 })
      drawBits(x, TICKET, { R: RED, W: '#fff4e2', K: INK }, 840, 1040, 15 * pop01(t, P.t0 + 1.0, 0.3, 2.2), { rot: 0.12 })
      label(x, 770, 1150, 'BOOKED. LEAVING NOW.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'taurus', cap: 'Skipped the views. | *Zoomed on the food.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      polaroid(x, t, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { rot: 0.04, food: true })
      magnifier(x, lerp(880, 795, ease.outCubic(prog(lt, 0.5, 1.1))), lerp(800, 955, ease.outCubic(prog(lt, 0.5, 1.1))), 70, pop01(t, P.t0 + 0.5, 0.3, 2))
      bubble(x, 790, 620, 'what IS that?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: 'gemini', cap: 'Already showing you | *theirs.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      polaroid(x, t, 740, 900, pop01(t, P.t0 + 0.15, 0.3, 2), { rot: -0.1, w: 220 })
      drawBits(x, PHONE, PHONE_C, lerp(1100, 860, ease.outCubic(prog(lt, 0.5, 0.9))), 860, 22 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: 0.08 })
      bubble(x, 800, 610, 'ok but MINE', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'br' })
    } },
  { sign: 'cancer', cap: '“Did you wear | *sunscreen?*”', mood: lt => lt > 1.1 ? 'wide' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      polaroid(x, t, 740, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { rot: -0.05, w: 230 })
      drawBits(x, BOTTLE, { K: INK, O: SUNC, W: '#fff4e2' }, 890, 990, 17 * pop01(t, P.t0 + 0.9, 0.3, 2.2), { rot: 0.15 })
      label(x, 800, 1150, 'SPF 100. PACKED.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Why am I | *not in these?*', mood: lt => lt > 1.2 ? 'squint' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      polaroid(x, t, 780, 880, pop01(t, P.t0 + 0.15, 0.3, 2), { rot: 0.05 })
      // Leo's own face stuck onto the photo
      const k = pop01(t, P.t0 + 1.2, 0.3, 2.4)
      if (k > 0.01) signChar(x, t, 'leo', 760, 850, 140 * k, { mood: 'sparkle', seed: 33, glyph: false })
      label(x, 790, 640, 'FIXED IT', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.05 })
    } },
  { sign: 'virgo', cap: 'The horizon | is *crooked.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      polaroid(x, t, 790, 870, pop01(t, P.t0 + 0.15, 0.3, 2), { rot: 0, tilt: 0.14 })
      x.save(); x.globalAlpha = clamp((lt - 0.7) * 3); x.strokeStyle = RED; x.lineWidth = 6; x.setLineDash([14, 10])
      x.beginPath(); x.moveTo(650, 875); x.lineTo(930, 875); x.stroke(); x.restore()
      label(x, 790, 1130, 'OFF BY 8°', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Can’t pick | a *favourite.*', mood: lt => lt > 1.6 ? 'wide' : 'neutral', look: lt => [Math.sin(lt * 4) > 0 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const sel = Math.floor(lt * 2.5) % 3
      for (let i = 0; i < 3; i++) polaroid(x, t, 680 + i * 110, 860 - (sel === i ? 40 : 0), pop01(t, P.t0 + 0.15 + i * 0.1, 0.3, 2) * 0.7, { rot: (i - 1) * 0.12 })
      label(x, 790, 1130, `FAVOURITE #${1 + Math.floor(lt * 2.5)}`, pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Zoomed in on | *the stranger.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      polaroid(x, t, 790, 870, pop01(t, P.t0 + 0.15, 0.3, 2), { rot: -0.03, stranger: true })
      magnifier(x, 850, 860, 62, pop01(t, P.t0 + 0.7, 0.3, 2))
      bubble(x, 790, 620, 'who’s THAT?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, col: LAV, tail: 'bc' })
    } },
  { sign: 'sagittarius', cap: 'Been there. | *Twice.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.1],
    front(x, t, lt, P) {
      polaroid(x, t, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { rot: 0.06 })
      label(x, 790, 1120, 'BEEN THERE · 2×', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 34, bg: '#c97bff', rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 620, 'try the cave!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: 'capricorn', cap: 'Cute. | What *did it cost?*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      polaroid(x, t, 720, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { rot: -0.08, w: 220 })
      drawBits(x, CALC, { K: INK, G: '#2fc79a', W: '#fff4e2', O: SUNC }, 880, 960, 18 * pop01(t, P.t0 + 0.8, 0.3, 2.2), { rot: 0.1 })
      label(x, 860, 650, 'PER DAY?', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Only liked | the *blurry one.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      polaroid(x, t, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { rot: 0.05, blur: 7 })
      label(x, 790, 1120, 'ART.', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 48, bg: MINT, rot: -0.05 })
      hearts(x, t, 790, 800, P.t0 + 1.2, { n: 4, life: 1.6, spread: 140, cell: 7, seed: 8 })
    } },
  { sign: 'pisces', cap: 'Photo 300. | *Still sobbing.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      polaroid(x, t, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { rot: -0.05, me: true })
      const n = Math.min(300, 280 + Math.floor(Math.max(0, lt - 0.3) * 14))
      label(x, 790, 620, `${n} / 300`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 40, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0087', key: 'E', accent: SUNC, ending: 'lesson',
  title: 'Your vacation pics? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody asked | for *photo 301.*' },
  lesson: { text: 'Show them anyway. | *Your people look.*', chip: 'SEEN: ALL 300' },
  last: {
    text: 'Next trip? | *Bring them.*',
    draw(x, t, lt) { polaroid(x, t, 540, 770, pop01(t, t - lt + 0.6, 0.4, 2), { rot: -0.05, w: 250, me: true }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
