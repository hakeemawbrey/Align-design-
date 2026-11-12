// r2t0438: star_talk, ROLL CALL, "The signs at | a *photo shoot.*" (signs3kit social cut, music: lofi · G). Ending: lesson.
//   twelve signs in front of the camera, each at its most extreme:
//   ♈ burst mode, 400 shots in a second · ♉ asked where the snacks are · ♊ two poses, two different people · ♋ brought the
//   whole family · ♌ a fan on, hair flying, indoors · ♍ one stray hair, an hour · ♎ left side or right? still deciding
//   · ♏ refused to smile, iconic anyway · ♐ jumped for the shot, into the fountain · ♑ made it a profile picture
//   · ♒ the weird angle (camera upside down) · ♓ cried, the photo's gorgeous though
//  49.2   "Nobody blinked. | *Except Libra.*"   52.4 LESSON: "Your best angle? | *The happy one.*"  SMILE: GENUINE
//  58.3   "Say “cheese!” | Taurus: *“where?”*"
import {
  makeFilm, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import {
  L, at, buddy, drawBits, clamp, prog, ease, lerp,
  CAMERA, CAMERA_C, FAN, FAN_C, MAGNIFIER, MAGNIFIER_C, FRIES, FRIES_C,
  RED, CREAM, ORANGE, TEAL, WOOD, GREEN, GREY,
} from './props.js'

const FLASHC = '#fff6d8'
/** a camera flash burst over the panel */
function flash(x, t, t0, a = 0.5) {
  const d = t - t0
  if (d < 0 || d > 0.3) return
  x.save(); x.globalAlpha = a * (1 - d / 0.3); x.fillStyle = FLASHC; x.fillRect(110, 480, 860, 740); x.restore()
}
/** a polaroid with a star inside */
function polaroid(x, t, cx, cy, k, id, { rot = 0.05, mood = 'happy', w = 230, cap = '', tilt = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -w / 2 + 10, w, w * 1.2)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -w / 2 - 5, w + 10, w * 1.2 + 10)
  x.fillStyle = CREAM; x.fillRect(-w / 2, -w / 2, w, w * 1.2)
  x.fillStyle = '#2a2350'; x.fillRect(-w / 2 + 14, -w / 2 + 14, w - 28, w - 28)
  x.save(); x.beginPath(); x.rect(-w / 2 + 14, -w / 2 + 14, w - 28, w - 28); x.clip()
  x.rotate(tilt); signChar_(x, t, id, 0, 6, w * 0.62, mood)
  x.restore()
  if (cap) { x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(cap, 0, w / 2 + 24) }
  x.restore()
}
const signChar_ = (x, t, id, cx, cy, s, mood) => buddy(x, t, id, cx, cy, s, 1, { mood, seed: 71 })
/** a little fountain with a splash */
function fountain(x, t, cx, cy, k, splash) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-200, 0, 400, 90); x.fillStyle = GREY; x.fillRect(-192, 8, 384, 74)
  x.fillStyle = '#3aa0d8'; x.fillRect(-180, 8, 360, 26)
  x.fillStyle = INK; x.fillRect(-20, -110, 40, 120); x.fillStyle = GREY; x.fillRect(-14, -104, 28, 110)
  for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i - 4.5) * 0.25, r = 60 + 90 * splash * ((i * 37) % 10) / 10; x.fillStyle = SKYB; x.fillRect(Math.cos(a) * r - 7, -110 + Math.sin(a) * r * 1.2 - 7, 14, 14) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Burst mode. | *400 photos.* One second.', mood: 'wide', look: [1, 0], star: { x: -170 }, hops: [0.4, 0.6, 0.8],
    back(x, t, lt, P) { for (let i = 0; i < 4; i++) flash(x, t, P.t0 + 0.6 + i * 0.22, 0.25) },
    front(x, t, lt, P) {
      drawBits(x, CAMERA, CAMERA_C, 800, 860, 22 * at(t, P, 0.15), { rot: 0.06 })
      L(x, 800, 1080, `SHOTS: ${Math.floor(clamp((lt - 0.4) / 1.2) * 400)}`, at(t, P, 0.4), RED, 0.04, 36, CREAM)
    } },
  { sign: 'taurus', cap: 'Asked when | the *snacks* arrive.', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 780, 660, 'snacks?', at(t, P, 0.2, 0.25), { size: 50, tail: 'bl' })
      drawBits(x, FRIES, FRIES_C, 790, 920, 20 * at(t, P, 1.0))
      L(x, 790, 1140, 'POSE AFTER LUNCH', at(t, P, 1.4), GOLD, 0.04, 30)
    } },
  { sign: 'gemini', cap: 'Two poses. | Two *different people.*', mood: 'sparkle', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      polaroid(x, t, 680, 860, at(t, P, 0.3), 'gemini', { rot: -0.1, mood: 'wink', cap: 'CUTE' })
      polaroid(x, t, 880, 880, at(t, P, 0.7), 'gemini', { rot: 0.1, mood: 'squint', cap: 'MOODY' })
    } },
  { sign: 'cancer', cap: 'Brought the family. | *All of them.*', mood: 'heart', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const ids = ['taurus', 'virgo', 'pisces', 'libra', 'capricorn', 'leo']
      ids.forEach((id, i) => buddy(x, t, id, 620 + (i % 3) * 120, 820 + Math.floor(i / 3) * 160, 120, at(t, P, 0.3 + i * 0.15), { mood: 'happy', look: [-1, 0], seed: 72 + i }))
      L(x, 740, 640, 'GRANDMA’S HERE TOO', at(t, P, 1.5), PINK, -0.04, 30)
    } },
  { sign: 'leo', cap: 'Fan on. Hair flying. | *Indoors.*', mood: 'sparkle', look: [1, 0], star: { x: -150 },
    front(x, t, lt, P, F) {
      drawBits(x, FAN, FAN_C, 820, 940, 18 * at(t, P, 0.15), { rot: 0 })
      if (lt > 0.4) for (let i = 0; i < 6; i++) { const ph = ((t * 2 + i / 6) % 1); x.fillStyle = 'rgba(239,230,214,0.6)'; x.fillRect(lerp(740, 520, ph), 820 + i * 34, 60, 6) }
      L(x, 800, 650, 'WIND: DRAMATIC', at(t, P, 1.2), GOLD, -0.04, 32)
    } },
  { sign: 'virgo', cap: 'One stray hair. | *An hour.*', mood: 'squint', look: [-1, -1], star: { x: 100 },
    front(x, t, lt, P, F) {
      drawBits(x, MAGNIFIER, MAGNIFIER_C, F.x - 230, F.cy - 40, 20 * at(t, P, 0.15), { rot: 0.1 * Math.sin(t * 2) })
      x.fillStyle = INK; x.fillRect(F.x - 6, F.top - 40, 6, 44)
      L(x, 380, 1120, 'HAIR 1 OF 1: FIXED', at(t, P, 1.4), MINT, -0.04, 30)
    } },
  { sign: 'libra', cap: 'Left side or right? | *Still deciding.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      L(x, 790, 700, 'LEFT?', at(t, P, 0.2), PINK, -0.06, 40)
      L(x, 790, 860, 'RIGHT?', at(t, P, 0.6), SKYB, 0.06, 40)
      L(x, 790, 1030, 'BOTH? NEITHER?', at(t, P, 1.2), GOLD, -0.03, 32)
    } },
  { sign: 'scorpio', cap: 'Refused to smile. | *Iconic anyway.*', mood: 'neutral', look: [0, 0], star: { x: -170 },
    back(x, t, lt, P) { flash(x, t, P.t0 + 1.0, 0.45) },
    front(x, t, lt, P) {
      polaroid(x, t, 790, 860, at(t, P, 1.1, 0.35, 2), 'scorpio', { rot: 0.06, mood: 'neutral', cap: 'COVER SHOT' })
      L(x, 790, 640, 'SAY CHEESE!', at(t, P, 0.2), GOLD, -0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Jumped for the shot. | *Into the fountain.*', mood: lt => lt > 1.1 ? 'wide' : 'sparkle', look: [1, 0], star: { x: -170, y: -60 }, hops: [0.6, 1.0],
    front(x, t, lt, P) {
      fountain(x, t, 800, 1040, at(t, P, 0.15), clamp((lt - 1.0) / 0.6))
      L(x, 800, 650, 'WORTH IT', at(t, P, 1.5), ORANGE, 0.04, 36)
    } },
  { sign: 'capricorn', cap: 'Made it their | *profile picture.* Instantly.', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      polaroid(x, t, 790, 860, at(t, P, 0.2), 'capricorn', { rot: 0.04, mood: 'happy', cap: '♑︎ PROFILE' })
      L(x, 790, 640, 'PROFESSIONAL. VERY.', at(t, P, 1.3), SKYB, -0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Insisted on | the *weird angle.*', mood: 'sparkle', look: [1, 1], star: { x: -170, y: 20 },
    front(x, t, lt, P) {
      drawBits(x, CAMERA, CAMERA_C, 800, 700, 18 * at(t, P, 0.15), { rot: Math.PI * ease.inOutCubic(prog(lt, 0.4, 1.0)) })
      polaroid(x, t, 800, 990, at(t, P, 1.2), 'aquarius', { rot: 0.1, mood: 'sparkle', cap: 'ART.', tilt: Math.PI, w: 180 })
    } },
  { sign: 'pisces', cap: 'Cried. The photo’s | *gorgeous* though.', mood: 'heart', tears: lt => lt < 0.8 ? 1 : 3, look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      polaroid(x, t, 800, 860, at(t, P, 0.2), 'pisces', { rot: 0.06, mood: 'heart', cap: 'FRAMED' })
      sparkles(x, t, 800, 820, P.t0 + 1.0, 7, 170, 0.5)
    } },
]

const F = makeFilm({
  id: 'r2t0438', key: 'G', accent: '#ff9a4a', ending: 'lesson',
  title: 'The signs at | a *photo shoot.*',
  cameos: CAMEOS,
  group: {
    cap: 'Nobody blinked. | *Except Libra.*',
    moods: ['wide', 'neutral', 'wink', 'heart', 'sparkle', 'happy', 'sleepy', 'neutral', 'sparkle', 'happy', 'wink', 'heart'],
    draw(x, t, lt) { drawBits(x, CAMERA, CAMERA_C, 540, 740, 14 * pop01(t, t - lt + 0.5, 0.35, 2)) },
  },
  lesson: { text: 'Your best angle? | *The happy one.*', chip: 'SMILE: GENUINE' },
  last: { text: 'Say “cheese!” | Taurus: *“where?”*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
