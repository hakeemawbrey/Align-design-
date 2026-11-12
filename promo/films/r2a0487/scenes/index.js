// r2a0487: star_advice, ADVICE SOLO (aquarius), "Aquarius, celebrate | *the small wins.*" (signs3kit social cut,
// music: lofi · F). Ending: group (the group beat is the ending).
//   answered one email (party) · drank water (genius) · the weird idea worked (of course) · replied a week late (still a
//   win) · left the house (huge) · fixed the gadget (trophy) · said one feeling out loud (revolutionary) · made a friend
//   laugh (the whole point) · woke up and tried (robot dance earned).
//   group "Small wins. | Still wins."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'aquarius', ACC = '#6fc3ff', CREAM = '#fff4e2', RED = '#e23d4e', SLATE = '#9aa5c4'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
const CONF = [GOLD, PINK, MINT, SKYB, LAV, '#ff9a4a']
// confetti falling inside a box from t0
function confetti(x, t, t0, l, tp, w, h, n = 26) {
  const dt = t - t0; if (dt < 0) return
  x.save(); x.beginPath(); x.rect(l, tp, w, h); x.clip()
  for (let i = 0; i < n; i++) {
    const cx = l + ((i * 137) % w) + Math.sin(dt * 3 + i) * 20, cy = tp - 30 + ((dt * (180 + (i % 5) * 40) + i * 41) % (h + 60))
    x.save(); x.translate(cx, cy); x.rotate(dt * 4 + i); x.fillStyle = CONF[i % CONF.length]; x.fillRect(-8, -5, 16, 10); x.restore()
  }
  x.restore()
}
const GLASS = [
  'K......K',
  'KWWWWWWK',
  'KBBBBBBK',
  'KBWBBBBK',
  'KBBBBBBK',
  'KBBBBBBK',
  '.KBBBBK.',
  '.KKKKKK.',
]
const GLASS_C = { K: '#c3cbe0', W: '#ffffff', B: SKYB }
const BULB = [
  '..YYYY..',
  '.YYWYYY.',
  'YYWYYYYY',
  'YYYYYYYY',
  'YYYYYYYY',
  '.YYYYYY.',
  '..YYYY..',
  '..SSSS..',
  '..SSSS..',
  '...SS...',
]
const BULB_C = { Y: GOLD, W: '#fff', S: SLATE }
const SUN = [
  '...Y..Y...',
  'Y..YYYY..Y',
  '..YYYYYY..',
  '.YYYYYYYY.',
  'YYYYYYYYYY',
  'YYYYYYYYYY',
  '.YYYYYYYY.',
  '..YYYYYY..',
  'Y..YYYY..Y',
  '...Y..Y...',
]
const TROPHY = [
  'YYYYYYYYYY',
  'YYWYYYYYYY',
  '.YYYYYYYY.',
  '..YYYYYY..',
  '...YYYY...',
  '....YY....',
  '....YY....',
  '..BBBBBB..',
  '..BBBBBB..',
]
const TROPHY_C = { Y: GOLD, W: '#fff', B: '#8a5a2e' }
const WRENCH = ['.SS..', 'SS...', 'SSS..', '.SSS.', '..SSS', '...SS']
const ROBOT = [
  '....R....',
  '....K....',
  '.SSSSSSS.',
  '.SKSSSKS.',
  '.SSSSSSS.',
  '.SSPPPSS.',
  '..SSSSS..',
  'SSSSSSSSS',
  'S.SSSSS.S',
  '..SS.SS..',
]
const ROBOT_C = { R: RED, K: INK, S: '#c3cbe0', P: PINK }
// a phone with one bubble
function phone(x, cx, cy, k, text, sent) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.roundRect(-140, -220, 280, 440, 34); x.fill()
  x.fillStyle = '#140c30'; x.fillRect(-116, -186, 232, 372)
  x.font = `700 26px ${INTER}`; x.textBaseline = 'middle'; x.textAlign = 'left'
  x.fillStyle = LAV; x.beginPath(); x.roundRect(-104, -160, 170, 54, 16); x.fill(); x.fillStyle = INK; x.fillText('hey u ok?', -90, -132)
  x.fillStyle = SLATE; x.font = `700 20px ${MONO}`; x.fillText('6 days ago', -100, -78)
  if (sent > 0.01) { x.globalAlpha = sent; x.font = `700 26px ${INTER}`; const w = x.measureText(text).width + 30; x.fillStyle = ACC; x.beginPath(); x.roundRect(104 - w, -40, w, 54, 16); x.fill(); x.fillStyle = INK; x.fillText(text, 119 - w, -12) }
  x.restore()
}

const ST = { x: -170 }
const PB = [120, 490, 840, 720]   // the panel's inside (confetti box)
const CAMEOS = [
  // 1 · one email
  { sign: S, cap: 'Answered one email? | *That counts.*', mood: lt => lt > 1.0 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { confetti(x, t, P.t0 + 1.0 * 1.29, ...PB) },
    front(x, t, lt, P) {
      L(x, 790, 760, 'INBOX: 212', pop01(t, P.t0 + 0.2, 0.3, 2.4), SLATE, -0.04, 38)
      L(x, 790, 900, 'INBOX: 211', pop01(t, P.t0 + 1.0, 0.3, 2.4), MINT, 0.04, 38)
      L(x, 790, 1070, 'PARTY TIME', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.03, 34)
    } },
  // 2 · drank water
  { sign: S, cap: 'Drank some water. | *Genius behaviour.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, GLASS, GLASS_C, 790, 870, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      sparkles(x, t, 790, 870, P.t0 + 0.7, 8, 180, 0.4, [SKYB, BONE])
      L(x, 790, 1100, 'HYDRATED: YES', pop01(t, P.t0 + 1.2, 0.3, 2.4), SKYB, -0.04, 34)
    } },
  // 3 · the weird idea worked
  { sign: S, cap: 'The weird idea worked? | *Of course it did.*', mood: 'wink', look: [1, -1], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const on = lt > 0.9
      drawBits(x, BULB, on ? BULB_C : { Y: '#6b7590', W: '#9aa5c4', S: SLATE }, 790, 820, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (on) sparkles(x, t, 790, 800, P.t0 + 0.9 * 1.29, 8, 180, 0.2)
      L(x, 790, 1080, 'IDEA #4,012: WORKED', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  // 4 · replied late
  { sign: S, cap: 'Replied a week late? | *Still a reply.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 830, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), 'back! hi', clamp((lt - 0.8) * 3))
      L(x, 790, 1130, 'REPLIED!', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.05, 38)
    } },
  // 5 · left the house
  { sign: S, cap: 'Left the house today? | *Honestly huge.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [0.8],
    front(x, t, lt, P) {
      drawBits(x, SUN, { Y: GOLD }, 800, 750, 18 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: t * 0.3 })
      L(x, 790, 980, 'OUTSIDE: VISITED', pop01(t, P.t0 + 0.9, 0.3, 2.4), ACC, -0.04, 32)
      bubble(x, 790, 1120, 'grass. nice.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  // 6 · fixed the gadget
  { sign: S, cap: 'Fixed the gadget yourself? | *Trophy. Now.*', mood: lt => lt > 1.1 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, WRENCH, { S: SLATE }, 560, 920, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 9) * 0.3 * (1 - clamp(lt - 1)) })
      drawBits(x, TROPHY, TROPHY_C, 800, 850, 24 * pop01(t, P.t0 + 1.0, 0.35, 2))
      sparkles(x, t, 800, 850, P.t0 + 1.1 * 1.29, 8, 190, 0.5)
      L(x, 800, 1090, 'BEST FIXER (LOCAL)', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  // 7 · said a feeling out loud
  { sign: S, cap: 'Said a feeling out loud? | *Revolutionary.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 780, 720, 'i… missed you?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, col: LAV, tail: 'bl' })
      hearts(x, t, 380, 760, P.t0 + 1.0, { n: 5, life: 1.6, spread: 200, cell: 8, seed: 3 })
      L(x, 790, 1080, 'FEELINGS: SHARED', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, -0.04, 32)
    } },
  // 8 · made a friend laugh
  { sign: S, cap: 'Made a friend laugh? | *That’s the point.*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 790, 900, 210 * k, { mood: lt > 0.9 ? 'squint' : 'happy', look: [-1, 0], seed: 31, glyph: false, hops: [P.t0 + 1.0 * 1.29, P.t0 + 1.4 * 1.29] })
      bubble(x, 800, 660, 'HA! HAHA!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, col: GOLD, tail: 'bc' })
      L(x, 790, 1110, 'DAY: MADE', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 34)
    } },
  // 9 · woke up and tried
  { sign: S, cap: 'Woke up and tried? | *Robot dance earned.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.2, 1.8],
    back(x, t, lt, P) { confetti(x, t, P.t0 + 0.8 * 1.29, ...PB) },
    front(x, t, lt, P) {
      drawBits(x, ROBOT, ROBOT_C, 790, 900 - Math.abs(Math.sin(t * 7)) * 20, 22 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: Math.sin(t * 7) * 0.12 })
      L(x, 790, 640, 'BEEP BOOP: YAY', pop01(t, P.t0 + 1.1, 0.3, 2.4), LAV, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0487', key: 'F', accent: ACC, solo: S,
  title: 'Aquarius, celebrate | *the small wins.*',
  cameos: CAMEOS,
  ending: 'group',
  group: { cap: 'Small wins. | *Still wins.*', mood: 'sparkle' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
