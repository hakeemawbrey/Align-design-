// r2t0004: star_talk, ROLLCALL, "The signs | taking a selfie." (~61 s vertical, signs3kit social cut, music: lofi · D)
// Twelve signs in zodiac order, each one's most extreme selfie.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ took it mid-sprint, blurry, posted · ♉ only selfies with food · ♊ a selfie with their other personality
//              · ♋ every selfie includes their mom · ♌ brought a ring light to the dentist · ♍ take 80, still no
//              · ♎ asked their match to pick the best one (it's a tie) · ♏ only selfies in the dark · ♐ selfie with a stranger's goat
//              · ♑ profile pic = their ID photo · ♒ upside down, on purpose · ♓ cried at the puppy-ears filter
//  49.2        "Everybody | say *cheese!*"
//  52.4        LESSON UNLOCKED: "Take the photo. | *You look like you.*"  SELFIE: SAVED
//  58.3        "Group selfie? | *Pisces still crying.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CORAL = '#ff8a7a', RED = '#e23d4e', CREAM = '#fff4e2', WOOD = '#c98f2a', GREEN = '#5fd068'

// ── props
const CAKE = ['..R...', '.WWWW.', 'PPPPPP', 'WWWWWW', 'PPPPPP', 'WWWWWW']
const CAKE_C = { R: RED, W: CREAM, P: '#ff9ccf' }
const GOAT = [
  'H........HH.',
  '.H......WWW.',
  '.WWWWWWWWWKW',
  'WWWWWWWWWWW.',
  'WWWWWWWWWW..',
  '.WW.WW.WW...',
  '.WW.WW.WW...',
  '.KK.KK.KK...',
]
const GOAT_C = { H: '#b9b0a0', W: '#efe6d6', K: INK }
const EARS = ['BB.......BB', 'BBB.....BBB', 'BPBB...BBPB', 'BPPB...BPPB', '.BB.....BB.']
const EARS_C = { B: '#c98f6a', P: PINK }

// a phone camera frame: a white bordered photo with something inside
function photo(x, cx, cy, w, h, k, { rot = 0.04, bg = '#2a2350', inner } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12); x.fillStyle = CREAM; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = bg; x.fillRect(-w / 2 + 16, -h / 2 + 16, w - 32, h - 32)
  x.save(); x.beginPath(); x.rect(-w / 2 + 16, -h / 2 + 16, w - 32, h - 32); x.clip()
  if (inner) inner()
  x.restore()
  x.restore()
}
// a ring light on a stand
function ringLight(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-8, 0, 16, 300)
  x.shadowColor = '#fff1b0'; x.shadowBlur = 40
  x.strokeStyle = INK; x.lineWidth = 34; x.beginPath(); x.arc(0, 0, 120, 0, Math.PI * 2); x.stroke()
  x.strokeStyle = '#fff8dc'; x.lineWidth = 22; x.beginPath(); x.arc(0, 0, 120, 0, Math.PI * 2); x.stroke()
  x.restore()
}
// a dentist chair hint: a little tooth sign
function tooth(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-56, -50, 112, 104); x.fillStyle = '#ffffff'; x.fillRect(-48, -42, 96, 60); x.fillRect(-48, 18, 34, 28); x.fillRect(14, 18, 34, 28)
  x.restore()
}
// an ID card
function idCard(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-176, -116, 352, 232); x.fillStyle = '#dfe6f2'; x.fillRect(-168, -108, 336, 216)
  x.fillStyle = '#6fa3cf'; x.fillRect(-168, -108, 336, 40); x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('PROFILE PIC', 0, -88)
  x.fillStyle = '#9aa5c4'; x.fillRect(-150, -56, 130, 150)
  signChar(x, t, 'capricorn', -85, 18, 110, { mood: 'neutral', seed: 51, glyph: false, glow: 0.4 })
  x.fillStyle = '#9aa5c4'; for (let i = 0; i < 4; i++) x.fillRect(0, -40 + i * 34, 140 - i * 18, 14)
  x.restore()
}
// poll bars under two photos
function poll(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  const p = ease.outCubic(prog(lt, 0.9, 1.5))
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (const [i, col] of [[-1, PINK], [1, MINT]]) { x.fillStyle = INK; x.fillRect(i * 95 - 75, 0, 150, 34); x.fillStyle = col; x.fillRect(i * 95 - 70, 5, 140 * p, 24) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Took it mid-sprint. | *Posted it blurry.*', mood: 'sparkle', star: { x: -170 }, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      photo(x, 790, 860, 280, 340, pop01(t, P.t0 + 0.5, 0.3, 2), { rot: 0.06, inner() {
        for (let i = 0; i < 4; i++) { x.globalAlpha = 0.3 + i * 0.2; signChar(x, t, 'aries', -60 + i * 30, 0, 170, { mood: 'sparkle', seed: 11, glyph: false, glow: 0.3 }) }
        x.globalAlpha = 1
      } })
      label(x, 790, 1080, 'POSTED. NO REGRETS.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Every selfie | *is with dessert.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      photo(x, 790, 860, 300, 340, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#5b2e4a', inner() {
        signChar(x, t, 'taurus', -50, 10, 150, { mood: 'heart', seed: 12, glyph: false, glow: 0.5 })
        drawBits(x, CAKE, CAKE_C, 70, 60, 14)
      } })
      label(x, 790, 650, 'THE CAKE IS THE STAR', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Selfie with | *their other personality.*', mood: 'wink', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      photo(x, 790, 860, 320, 340, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#3a3a1a', inner() {
        signChar(x, t, 'gemini', -70, 10, 140, { mood: 'wink', seed: 13, glyph: false, glow: 0.5 })
        signChar(x, t, 'gemini', 70, 10, 140, { mood: 'eyeroll', seed: 14, glyph: false, glow: 0.5 })
      } })
      bubble(x, 790, 640, 'we’re both | me', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Every selfie | *includes their mom.*', mood: 'heart', look: [1, 0], star: { x: -190 }, hops: [1.2],
    front(x, t, lt, P) {
      photo(x, 790, 860, 320, 340, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#1a3a5a', inner() {
        signChar(x, t, 'cancer', -50, 30, 120, { mood: 'happy', seed: 15, glyph: false, glow: 0.5 })
        signChar(x, t, 'cancer', 60, -10, 170, { mood: 'heart', seed: 16, glyph: false, glow: 0.5 })
      } })
      label(x, 790, 1080, 'MOM: TAGGED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Brought a ring light | *to the dentist.*', mood: 'sparkle', star: { x: -200 }, hops: [1.3],
    back(x, t, lt, P, F) { ringLight(x, t, F.x, F.cy - 10, pop01(t, P.t0 + 0.4, 0.35, 2)) },
    front(x, t, lt, P) {
      tooth(x, 800, 760, 1.4 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 980, 'open wide—', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 34, col: LAV, tail: 'bc' })
      label(x, 790, 1130, 'GLOWING. NUMB.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Take eighty. | *Still no.*', mood: lt => lt > 1.6 ? 'eyeroll' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const n = Math.min(80, 1 + Math.floor(Math.max(0, lt - 0.2) * 52))
      label(x, 790, 650, `TAKE ${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 48, bg: CREAM, rot: 0.03, font: MONO, weight: 700 })
      photo(x, 790, 900, 250, 280, pop01(t, P.t0 + 0.3, 0.3, 2), { inner() { signChar(x, t, 'virgo', 0, 10, 150, { mood: 'happy', seed: 17, glyph: false, glow: 0.5 }) } })
      if (lt > 1.6) { x.save(); x.strokeStyle = RED; x.lineWidth = 16; x.beginPath(); x.moveTo(680, 790); x.lineTo(900, 1010); x.moveTo(900, 790); x.lineTo(680, 1010); x.stroke(); x.restore() }
    } },
  { sign: 'libra', cap: 'Asked their match | to *pick the best one.*', mood: lt => lt > 1.5 ? 'wide' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      photo(x, 700, 840, 170, 220, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.05, inner() { signChar(x, t, 'libra', 0, 0, 110, { mood: 'wink', seed: 18, glyph: false, glow: 0.4 }) } })
      photo(x, 890, 840, 170, 220, pop01(t, P.t0 + 0.35, 0.3, 2), { rot: 0.05, inner() { signChar(x, t, 'libra', 0, 0, 110, { mood: 'wink', seed: 19, glyph: false, glow: 0.4 }) } })
      poll(x, 795, 980, pop01(t, P.t0 + 0.8, 0.3, 2), lt)
      label(x, 795, 650, '✦ MATCH SAYS: BOTH', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Only takes selfies | *in the dark.*', mood: 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      photo(x, 790, 860, 280, 340, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#05040c', inner() {
        x.fillStyle = '#ffffff'; x.fillRect(-40, -10, 22, 10); x.fillRect(18, -10, 22, 10)
      } })
      label(x, 790, 1080, 'MYSTERIOUS. ALSO DARK.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 26, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Selfie with | *a stranger’s goat.*', mood: 'sparkle', look: [1, 0], star: { x: -190 }, hops: [0.8, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, GOAT, GOAT_C, 800, 960, 26 * pop01(t, P.t0 + 0.3, 0.35, 2), { sx: -1 })
      bubble(x, 860, 700, 'meh.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bc' })
      label(x, 540, 1170, 'NEW BEST FRIEND', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: LAV, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Their profile pic? | *Their ID photo.*', mood: 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      idCard(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 650, 'VERY PROFESSIONAL', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Upside down. | *On purpose.*', mood: 'wink', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      photo(x, 790, 860, 280, 340, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.PI + 0.05, bg: '#1a3a5a', inner() {
        signChar(x, t, 'aquarius', 0, 10, 160, { mood: 'wink', seed: 20, glyph: false, glow: 0.5 })
      } })
      label(x, 790, 1080, 'IT’S ART.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: SKYB, rot: -0.04 })
    } },
  { sign: 'pisces', cap: 'The puppy ears filter? | *Too cute. Sobbing.*', mood: 'wide', tears: lt => lt > 0.9 ? 3 : 2, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (k > 0.01) drawBits(x, EARS, EARS_C, F.x, F.top - 20, 22 * k)
      bubble(x, 800, 700, 'look at | my EARS', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 800, 1080, 'FILTER: PUPPY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0004', key: 'D', accent: CORAL, ending: 'lesson',
  title: 'The signs | *taking a selfie.*',
  cameos: CAMEOS,
  group: { cap: 'Everybody | say *cheese!*' },
  lesson: { text: 'Take the photo. | *You look like you.*', chip: 'SELFIE: SAVED' },
  last: { text: 'Group selfie? | *Pisces still crying.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
