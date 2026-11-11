// v3t052: THE SIGNS AS… v3, "The signs | at a theme park." (~62 s vertical, signs3kit social cut, music: lofi · D)
//   0.0–3.6    "The signs at | a *theme park.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one day at the park per sign (3.8 s each), each pushed to the extreme:
//              ♈ front row, seventeen times · ♉ zero rides, every churro · ♊ lost the group, made a new one
//              · ♋ won a plushie, it's family now · ♌ bought every ride photo · ♍ a map, and a backup map
//              · ♎ posed mid-drop · ♏ the haunted house: the ghost got scared · ♐ hands up, shoe gone
//              · ♑ queue plan to the minute · ♒ skipped the ride, studied the bolts · ♓ the carousel horse had kind eyes
//  49.2        "Twelve tickets. | *Zero chill.*"
//  52.4        LESSON UNLOCKED: "Go with people who | *scream with you.*"  FUN: MAXED
//  58.3        "Taurus is still | in *the churro line.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', BROWN = '#8a4a2e', GREEN = '#5fd068', TEAL = '#4fd6c8'

const CHURRO = [
  '..SS',
  '.SBS',
  '.BS.',
  'SBS.',
  'BS..',
  'SB..',
  'B...',
]
const CHURRO_C = { S: '#e0a050', B: '#b8742e' }
const BEAR = [
  'BB.....BB',
  'BbBBBBBbB',
  '.BBBBBBB.',
  '.BKBBBKB.',
  '.BBBpBBB.',
  '.BBpppBB.',
  '..BBBBB..',
  '.BBBBBBB.',
  'BBBbbbBBB',
  'BBBbbbBBB',
  '.BB...BB.',
]
const BEAR_C = { B: '#c98a5a', b: '#f0c8a0', K: INK, p: '#f0c8a0' }
const MAP = [
  'WWWWWWWWWWWW',
  'WGGWWBBWWGGW',
  'WGGWBBBBWGGW',
  'WWRRRRRRRRWW',
  'WWRWWWWWWRWW',
  'WGGWWYYWWWWW',
  'WGGWYYYYWBBW',
  'WWWWWYYWWBBW',
]
const MAP_C = { W: '#fff4e2', G: GREEN, B: SKYB, R: RED, Y: GOLD }
const GHOST = [
  '..WWWWW..',
  '.WWWWWWW.',
  'WWKWWWKWW',
  'WWKWWWKWW',
  'WWWWWWWWW',
  'WWWWOWWWW',
  'WWWWWWWWW',
  'WWWWWWWWW',
  'W.WW.WW.W',
]
const GHOST_C = { W: '#e8eaf6', K: INK, O: INK }
const SHOE = [
  '.......RR',
  '......RRR',
  '.....RRRR',
  'RRRRRRRRR',
  'RWRWRWRRR',
  'WWWWWWWWW',
]
const SHOE_C = { R: RED, W: '#fff4e2' }
const HORSE = [
  '......P.',
  '..WWWWPP',
  '.WWWWWWP',
  'WWKWWWW.',
  'WWWWWWW.',
  '...WWWWW',
  '...WWWWW',
  '...WWWWW',
  '...W..W.',
  '...W..W.',
]
const HORSE_C = { W: '#fff4e2', K: INK, P: PINK }
const COASTER = [
  'R........RR',
  'RR......RRRR',
  '.RR....RR..RR',
  '..RR..RR....RR',
  '...RRRR......R',
]

// a ride photo in a gold frame (a screaming star) with a price tag
function ridePhoto(x, t, cx, cy, k, { rot = 0, mood = 'wide', id = 'leo', s = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * s, k * s)
  x.fillStyle = INK; x.fillRect(-96, -76, 192, 152)
  x.fillStyle = GOLD; x.fillRect(-90, -70, 180, 140)
  x.fillStyle = '#2a6b9a'; x.fillRect(-76, -56, 152, 112)
  signChar(x, t, id, 0, 6, 110, { mood, seed: 50, glyph: false, glow: 0.4 })
  x.restore()
}
// a queue board with ride times
function queueBoard(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, -170, 360, 340)
  x.fillStyle = '#fff4e2'; x.fillRect(-172, -162, 344, 324)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THE PLAN', 0, -128)
  const rows = ['10:02 coaster', '10:41 teacups', '11:17 churro', '11:18 wipe hands', '11:19 coaster']
  const n = Math.floor(clamp((lt - 0.3) / 1.3) * 5 + 0.001)
  x.font = `700 26px ${MONO}`; x.textAlign = 'left'
  for (let i = 0; i < Math.min(n + 1, 5); i++) { x.fillStyle = i === 3 ? RED : '#2a2350'; x.fillText(rows[i], -150, -76 + i * 52) }
  x.restore()
}
// a blueprint of a coaster bolt
function blueprint(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -130, 340, 260)
  x.fillStyle = '#2a5fb0'; x.fillRect(-162, -122, 324, 244)
  x.strokeStyle = 'rgba(255,255,255,0.25)'; x.lineWidth = 2
  for (let i = -140; i <= 140; i += 40) { x.beginPath(); x.moveTo(i, -122); x.lineTo(i, 122); x.stroke() }
  for (let j = -100; j <= 100; j += 40) { x.beginPath(); x.moveTo(-162, j); x.lineTo(162, j); x.stroke() }
  x.strokeStyle = '#fff'; x.lineWidth = 5
  x.beginPath(); x.arc(-30, 0, 56, 0, Math.PI * 2); x.stroke()
  x.beginPath(); for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; x[i ? 'lineTo' : 'moveTo'](-30 + Math.cos(a) * 30, Math.sin(a) * 30) } x.closePath(); x.stroke()
  x.fillStyle = '#fff'; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.fillText('BOLT #4,212', 70, 90)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Front row. | *Seventeen times.*', mood: lt => lt > 1.0 ? 'wide' : 'sparkle', star: { x: -170 }, hops: [0.4, 0.8, 1.2, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, COASTER, { R: RED }, 780, 900, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = Math.min(17, 1 + Math.floor(lt * 8))
      label(x, 790, 680, `RIDE #${n}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 46, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1100, 'AGAIN!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Rode zero rides. | Ate *every churro.*', mood: lt => lt > 1.4 ? 'sleepy' : 'heart', star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(6, 1 + Math.floor(lt * 3))
      for (let i = 0; i < n; i++) drawBits(x, CHURRO, CHURRO_C, 660 + (i % 3) * 120, 780 + Math.floor(i / 3) * 210, 18, { rot: 0.2 * (i % 2 ? 1 : -1) })
      label(x, 790, 1130, 'RIDES: 0', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Lost the group. | *Made a new one.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', look: lt => lt > 1.0 ? [1, 0] : [-1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const ids = ['taurus', 'leo', 'aquarius']
      ids.forEach((id, i) => { const k = pop01(t, P.t0 + 0.9 + i * 0.2, 0.3, 2); if (k > 0.01) signChar(x, t, id, 690 + i * 110, 900 + (i % 2) * 60, 130 * k, { mood: 'happy', look: [-1, 0], seed: 30 + i, glyph: false }) })
      bubble(x, 760, 640, 'hi, besties!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Won a plushie. | It’s *family now.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, BEAR, BEAR_C, 780, 900, 22 * pop01(t, P.t0 + 0.25, 0.3, 2))
      label(x, 780, 1120, 'MEET BARNABY', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.05 })
      hearts(x, t, 780, 820, P.t0 + 1.3, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 5 })
    } },
  { sign: 'leo', cap: 'Bought the ride photo. | *All twelve.*', mood: 'sparkle', star: { x: -180 }, hops: [1.4],
    front(x, t, lt, P) {
      const n = Math.min(6, Math.floor(lt * 3.2) + 1)
      for (let i = 0; i < n; i++) ridePhoto(x, t, 680 + (i % 2) * 210, 650 + Math.floor(i / 2) * 175, pop01(t, P.t0 + 0.2 + i * 0.22, 0.3, 2), { rot: (i % 2 ? 0.06 : -0.05), mood: i % 2 ? 'wink' : 'sparkle', s: 0.95 })
      label(x, 780, 1180, '×12', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Brought a map. | And *a backup map.*', mood: lt => lt > 1.4 ? 'squint' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, MAP, MAP_C, 790, 760, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.05 })
      drawBits(x, MAP, MAP_C, 800, 1010, 22 * pop01(t, P.t0 + 1.0, 0.3, 2), { rot: 0.06 })
      label(x, 800, 1150, 'BACKUP', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Ride photo? | Posed *mid-drop.*', mood: lt => lt > 1.1 ? 'wink' : 'sparkle', star: { x: -180 }, hops: [1.1],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 830); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-160, -140, 320, 280); x.fillStyle = GOLD; x.fillRect(-152, -132, 304, 264); x.fillStyle = '#2a6b9a'; x.fillRect(-136, -116, 272, 232)
        signChar(x, t, 'aries', -70, 20, 110, { mood: 'wide', seed: 40, glyph: false, glow: 0.3 })
        signChar(x, t, 'libra', 60, 10, 130, { mood: 'wink', seed: 41, glyph: false, glow: 0.3 })
        x.restore()
      }
      label(x, 790, 1080, 'SERVED.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: PINK, rot: -0.05 })
      sparkles(x, t, 850, 820, P.t0 + 1.3, 6, 140, 0.4)
    } },
  { sign: 'scorpio', cap: 'Haunted house. | The ghost *got scared.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const run = ease.inCubic(prog(lt, 1.2, 1.9))
      drawBits(x, GHOST, GHOST_C, 790 + run * 110, 860 - run * 140, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { alpha: 1 - run * 0.8, rot: run * 0.4 })
      bubble(x, 790, 620, lt < 1.1 ? 'boo!' : 'eek!!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 1120, 'GHOST: ON BREAK', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Hands up. | *Shoe gone.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', star: { x: -170 }, hops: [0.4, 0.9],
    front(x, t, lt, P) {
      const fly = ease.outCubic(prog(lt, 0.5, 1.6))
      drawBits(x, SHOE, SHOE_C, lerp(470, 860, fly), 960 - Math.sin(Math.PI * fly) * 380, 16, { rot: fly * 8 })
      bubble(x, 760, 620, 'WHEEE!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 800, 1120, 'SHOES: 1', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Planned every queue. | *To the minute.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [1, 0], star: { x: -200, s: 260 },
    front(x, t, lt, P) {
      queueBoard(x, 770, 820, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 770, 1110, 'ON SCHEDULE', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Skipped the ride. | *Studied the bolts.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      blueprint(x, 790, 820, pop01(t, P.t0 + 0.25, 0.35, 2), t)
      bubble(x, 790, 1090, 'fascinating.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'The carousel horse | had *kind eyes.*', mood: lt => lt < 0.9 ? 'happy' : 'wide', tears: lt => lt < 0.9 ? 1 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      x.fillStyle = GOLD; if (k > 0.5) x.fillRect(796, 600, 10, 560)
      drawBits(x, HORSE, HORSE_C, 790, 880 + Math.sin(t * 3) * 30, 26 * k)
      label(x, 640, 1130, 'SO GENTLE', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 800, P.t0 + 1.2, { n: 4, life: 1.6, spread: 150, cell: 7, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'v3t052', key: 'D', accent: TEAL, ending: 'lesson',
  title: 'The signs at | a *theme park.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve tickets. | *Zero chill.*' },
  lesson: { text: 'Go with people who | *scream with you.*', chip: 'FUN: MAXED' },
  last: {
    text: 'Taurus is still | in *the churro line.*',
    draw(x, t, lt) { drawBits(x, CHURRO, CHURRO_C, 900, 1520, 22 * pop01(t, t - lt + 0.7, 0.3, 2), { rot: 0.2 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
