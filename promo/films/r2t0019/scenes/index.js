// r2t0019: star_talk, ROLLCALL, "The signs | as tourists." (~54 s vertical, signs3kit social cut, music: lofi · D)
// Twelve signs in zodiac order, each one’s most extreme version of themselves on holiday. Ending: group (the punchline).
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ every landmark before breakfast · ♉ came for the culture, stayed for the bakery · ♊ best friends with the whole tour bus
//              · ♋ sent their match forty postcards · ♌ 300 photos, all of themself · ♍ itinerary laminated, colour-coded, hourly
//              · ♎ asked the waiter’s sign before ordering · ♏ skipped the guidebook, found the hidden café · ♐ missed the flight home on purpose
//              · ♑ on vacation, answered work emails · ♒ skipped the famous tower, toured a parking lot · ♓ saw the sunset, wept for an hour
//  49.2        "One trip. | *Twelve vacations.*"  A WISH YOU WERE HERE sticker over the group photo.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const TEAL = '#4fd1c5', RED = '#e23d4e', ORANGE = '#ff9a4a', GREEN = '#7ee08a'

// ── props
const CROISSANT = ['....CCCC....', '..CCDCCDCC..', '.CCDCCCCDCC.', 'CCDCCCCCCDCC', 'CC........CC']
const CAMERA = ['....KKK.....', 'KKKKKKKKKKKK', 'KGGGGGGGGGGK', 'KGGGKKKKGGGK', 'KGGKWWWWKGGK', 'KGGKWSSWKGGK', 'KGGKWWWWKGGK', 'KGGGKKKKGGGK', 'KKKKKKKKKKKK']
const POSTCARD = ['KKKKKKKKKK', 'KYYYYYYSSK', 'KYBBYYYSSK', 'KYYYYYYYYK', 'KYYLLLLYYK', 'KYYYYYYYYK', 'KKKKKKKKKK']
const PLANE = ['....W.......', '....WW......', 'WWWWWWWWWWW.', '.WWWWWWWWWWW', '....WW......', '....W.......']
const LAPTOP = ['.KKKKKKKKKK.', '.KSSSSSSSSK.', '.KSSSSSSSSK.', '.KSSSSSSSSK.', '.KKKKKKKKKK.', 'GGGGGGGGGGGG']
function clipboard(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-140, -170, 280, 340); x.fillStyle = BONE; x.fillRect(-130, -160, 260, 320)
  x.fillStyle = '#9aa5c4'; x.fillRect(-50, -184, 100, 34)
  const cols = [RED, GOLD, GREEN, SKYB, LAV]
  cols.forEach((c, i) => { x.fillStyle = c; x.fillRect(-110, -120 + i * 56, 40, 36); x.fillStyle = '#c9b8a8'; x.fillRect(-58, -110 + i * 56, 150, 16) })
  x.strokeStyle = 'rgba(143,227,255,0.8)'; x.lineWidth = 6; x.strokeRect(-134, -164, 268, 328)
  x.restore()
}
function treasure(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-160, -120, 320, 240); x.fillStyle = '#f5e0a8'; x.fillRect(-150, -110, 300, 220)
  x.strokeStyle = '#8a5a3a'; x.lineWidth = 6; x.setLineDash([14, 12]); x.beginPath(); x.moveTo(-120, 80); x.quadraticCurveTo(-20, -90, 90, -20); x.stroke(); x.setLineDash([])
  x.strokeStyle = RED; x.lineWidth = 12; x.beginPath(); x.moveTo(70, -45); x.lineTo(115, 0); x.moveTo(115, -45); x.lineTo(70, 0); x.stroke()
  x.restore()
}
function sunset(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.beginPath(); x.rect(-160, -150, 320, 200); x.clip()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 50, 128, Math.PI, 0); x.fill()
  x.fillStyle = ORANGE; x.beginPath(); x.arc(0, 50, 118, Math.PI, 0); x.fill()
  x.fillStyle = '#ffd23a'; x.beginPath(); x.arc(0, 50, 80, Math.PI, 0); x.fill()
  x.restore()
  x.save(); x.translate(cx, cy); x.scale(k, k); x.fillStyle = '#6fc3ff'; for (let i = 0; i < 3; i++) x.fillRect(-150 + i * 20, 60 + i * 24, 300 - i * 40, 12); x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Every landmark | *before breakfast.*', mood: 'sparkle', look: [1, 0], star: { x: -190 }, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      const n = Math.min(14, Math.floor(prog(lt, 0.2, 1.4) * 14.99))
      label(x, 790, 780, `LANDMARKS: ${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 960, 'TIME: 7:02 AM', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Came for the culture. | *Stayed in the bakery.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, CROISSANT, { C: '#e0a56a', D: '#b87a3a' }, 790, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1080, 'CROISSANT #6', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: GREEN, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Best friends with | *the whole tour bus.*', mood: 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) [['virgo', 690, 1010], ['leo', 880, 1010], ['capricorn', 785, 830]].forEach(([id, px, py], i) => signChar(x, t, id, px, py, 130 * k, { mood: 'happy', seed: 30 + i, glyph: false, hops: [P.t0 + 0.8 + i * 0.25] }))
      bubble(x, 790, 650, 'BESTIES!!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 44, col: GOLD, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Sent their match | *forty postcards.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) drawBits(x, POSTCARD, { K: INK, Y: BONE, B: SKYB, S: PINK, L: '#c9b8a8' }, 790 + (i - 2) * 26, 900 - i * 34, 18 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.25, 2.2), { rot: (i - 2) * 0.12 })
      label(x, 790, 1100, '✦ TO: MY MATCH ×40', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: '300 photos. | *All of themself.*', mood: 'wink', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, CAMERA, { K: INK, G: '#9aa5c4', W: BONE, S: SKYB }, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.08 })
      const fl = (lt * 3) % 1; if (lt > 0.6 && fl < 0.15) { x.save(); x.globalAlpha = 0.5; x.fillStyle = '#fffbe8'; x.fillRect(120, 470, 840, 760); x.restore() }
      label(x, 790, 1090, `PHOTOS: ${Math.min(300, Math.round(prog(lt, 0.5, 1.8) * 300))}`, pop01(t, P.t0 + 0.5, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Itinerary laminated. | *Colour-coded. Hourly.*', mood: 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      clipboard(x, 790, 870, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1110, '6:15 · FUN (15 MIN)', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Asked the waiter’s sign | *before ordering.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'what’s your | sign?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, col: PINK, tail: 'bl' })
      label(x, 790, 920, '✦ COMPATIBLE', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1080, 'ORDER: SAME AS YOU', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Skipped the guidebook. | Found *the hidden café.*', mood: 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      treasure(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1080, 'LOCALS ONLY', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: '#c97bff', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Missed the flight home. | *On purpose.*', mood: lt => lt > 1.3 ? 'wink' : 'happy', look: [1, -1], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const fly = ease.inCubic(prog(lt, 0.4, 1.8))
      drawBits(x, PLANE, { W: BONE }, lerp(700, 870, fly), lerp(920, 660, fly), 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.3 * fly })
      label(x, 790, 1080, 'HOME: LATER', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'On vacation. | *Answered work emails.*', mood: 'neutral', look: [1, 1], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, LAPTOP, { K: INK, S: '#6fc3ff', G: '#9aa5c4' }, 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 660, 'OUT OF OFFICE*', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 34, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1100, 'SENT: 3', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: GREEN, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Skipped the famous tower. | *Toured a parking lot.*', mood: 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      label(x, 790, 820, 'P', k, { size: 140, bg: '#6fc3ff', color: BONE, rot: 0 })
      label(x, 790, 1060, 'HIDDEN GEM', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Saw one sunset. | *Wept for an hour.*', mood: 'wide', tears: lt => lt > 0.9 ? 3 : 1, look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      sunset(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1100, 'SO BEAUTIFUL', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0019', key: 'D', accent: TEAL, ending: 'group',
  title: 'The signs | *as tourists.*',
  cameos: CAMEOS,
  group: {
    cap: 'One trip. | *Twelve vacations.*',
    draw(x, t, lt) { label(x, 540, 700, '✦ WISH YOU WERE HERE ✦', pop01(t, t - lt + 1.5, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
