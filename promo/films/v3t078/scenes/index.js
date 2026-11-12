// v3t078: THE SIGNS AS… v3, "Zodiacs on Monday | be like." (~57 s vertical, signs3kit social cut, music: lofi · E)
// The format look lives in ../../signs3kit.js. Ending: callback.
//   0.0–3.6    "Zodiacs on Monday | *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   each sign's Monday morning (3.8 s each), pushed to the extreme:
//              ♈ sprinted to work, literally · ♉ snoozed fourteen times · ♊ two coffees, one per hand
//              · ♋ homesick, from their own bed · ♌ dressed for a gala, it's a video call · ♍ planned the week by 6:04
//              · ♎ forty minutes picking a mug · ♏ nobody speaks until coffee · ♐ called in sick from an airport
//              · ♑ genuinely loves Mondays · ♒ declared Monday cancelled · ♓ cried at the sunrise
//  49.2        "Monday | *won again.*"  The twelve fly up into a group photo.
//  52.6        "Taurus is | *still snoozing.*"  (Taurus' alarm clock comes back: SNOOZE #15)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', TEAL = '#2fc79a'

// ── props
const CLOCK = [
  'BB......BB',
  'BBRRRRRRBB',
  '.RWWWWWWR.',
  'RWWWKWWWWR',
  'RWWWKWWWWR',
  'RWWWKKKWWR',
  'RWWWWWWWWR',
  '.RWWWWWWR.',
  '..RRRRRR..',
  '.K......K.',
]
const CLOCK_C = { B: GOLD, R: RED, W: '#fff4e2', K: INK }
const CUP = [
  '.S.S..',
  'WWWWW.',
  'WBBBWWW',
  'WWWWW.W',
  'WWWWWWW',
  'WWWWW..',
  '.WWW...',
]
const BED = [
  'WW..........',
  'WWPPPPPPPPPP',
  'WWPPPPPPPPPP',
  'KKKKKKKKKKKK',
  'K..........K',
]
const BED_C = { W: '#fff4e2', P: SKYB, K: '#8a5a3a' }
const MUG = ['WWWW.', 'WWWWW', 'WWWW.W', 'WWWWW', 'WWWW.']
const SUN = [
  '...Y..Y...',
  '.Y.OOOO.Y.',
  '..OOOOOO..',
  'YOOOOOOOOY',
  '.OOOOOOOO.',
]
const BOW = ['TT.TT', 'TTTTT', 'TT.TT']

function card(x, cx, cy, k, { w = 300, h = 300, head = '', headBg = TEAL, body = [], rot = 0.05, size = 30, align = 'center' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = '#fff4e2'; x.fillRect(-w / 2, -h / 2, w, h)
  x.textBaseline = 'middle'
  if (head) { x.textAlign = 'center'; x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 58); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.fillText(head, 0, -h / 2 + 31) }
  x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`; x.textAlign = align
  const top = head ? -h / 2 + 58 : -h / 2, ax = align === 'left' ? -w / 2 + 22 : 0
  body.forEach((l, i) => x.fillText(l, ax, top + (h - (head ? 58 : 0)) * (i + 0.5) / body.length))
  x.restore()
}
const alarm = (x, t, cx, cy, k, ring) => drawBits(x, CLOCK, CLOCK_C, cx, cy, 20 * k, { rot: ring ? 0.12 * Math.sin(t * 40) : 0 })

const CAMEOS = [
  { sign: 'aries', cap: 'Ran to work. | *Literally.*', mood: 'sparkle', star: { x: -160 }, hops: [0.3, 0.7, 1.1, 1.5, 1.9],
    back(x, t, lt, P, F) {
      // speed lines behind the star
      x.save(); x.fillStyle = 'rgba(239,230,214,0.5)'
      for (let i = 0; i < 5; i++) { const ww = 80 + 50 * ((i * 7) % 3), o = ((t * 900 + i * 130) % 300); x.fillRect(F.x - 220 - o, F.cy - 80 + i * 40, ww, 8) }
      x.restore()
    },
    front(x, t, lt, P) {
      label(x, 790, 760, 'COMMUTE: 4 MIN', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 960, 'OFFICE OPENS: 9:00', pop01(t, P.t0 + 1.2, 0.3, 2), { size: 28, bg: BONE, rot: 0.04 })
      label(x, 790, 1100, 'NOW: 6:15', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: RED, color: '#fff4e2', rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Snoozed the alarm. | *Fourteen times.*', mood: 'sleepy', star: { x: -160, y: 30 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      alarm(x, t, 790, 840, pop01(t, P.t0 + 0.3, 0.35, 2), Math.floor(lt * 2) % 2 === 0)
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.6) * 13)
      label(x, 790, 1060, `SNOOZE #${n}`, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 440, 640, 'zzz…', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: LAV, tail: 'bc' })
    } },
  { sign: 'gemini', cap: 'Two coffees. | *One per hand.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', star: { x: -160 }, hops: [1.2],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      drawBits(x, CUP, { W: '#fff4e2', B: '#8a5a3a', S: BONE }, F.x - 170, F.cy + 40, 15 * k, { rot: -0.15 })
      drawBits(x, CUP, { W: '#fff4e2', B: '#8a5a3a', S: BONE }, F.x + 170, F.cy + 40, 15 * k, { rot: 0.15, sx: -1 })
      label(x, 790, 700, 'SIP · SIP · SIP', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 30, bg: GOLD, rot: 0.04 })
      bubble(x, 790, 1020, 'need a third', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Already homesick. | *From their own bed.*', mood: 'neutral', look: [1, 1], star: { x: -160 },
    front(x, t, lt, P) {
      drawBits(x, BED, BED_C, 790, 900, 22 * pop01(t, P.t0 + 0.3, 0.35, 2))
      bubble(x, 790, 680, 'miss you, bed', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      label(x, 790, 1090, 'DISTANCE: 2 m', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Dressed for a gala. | It’s *a video call.*', mood: 'sparkle', star: { x: -160 }, hops: [0.6],
    front(x, t, lt, P, F) {
      drawBits(x, BOW, { T: RED }, F.x, F.cy + 70, 16 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 790, 740, '✦ RED CARPET ✦', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 32, bg: GOLD, rot: -0.04 })
      label(x, 790, 960, 'CAMERA: OFF', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: '#2a2350', color: '#fff4e2', rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 380, 820, P.t0 + 0.6, 7, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Planned the whole week | *by 6:04.*', mood: lt => lt > 1.6 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(5, Math.floor(Math.max(0, lt - 0.3) / 0.25))
      const D = ['MON ✓ gym', 'TUE ✓ laundry', 'WED ✓ call mom', 'THU ✓ date night', 'FRI ✓ rest (1 h)']
      card(x, 790, 860, pop01(t, P.t0 + 0.25, 0.35, 2), { w: 340, h: 360, head: 'THIS WEEK', headBg: MINT, body: D.slice(0, n).concat(Array(5 - n).fill('')), size: 28, align: 'left' })
    } },
  { sign: 'libra', cap: 'Picked a mug. | *Forty minutes later.*', mood: lt => lt > 1.8 ? 'happy' : 'neutral', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const COLS = [PINK, GOLD, MINT, SKYB, LAV, ORANGE]
      const pick = Math.floor(lt * 2.4) % 6
      COLS.forEach((c, i) => drawBits(x, MUG, { W: c }, 690 + (i % 3) * 100, 820 + Math.floor(i / 3) * 120, 16 * pop01(t, P.t0 + 0.2 + i * 0.08, 0.3, 2) * (i === pick ? 1.25 : 1)))
      label(x, 790, 1080, 'TIME: 7:40', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 650, 'this one? hmm', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Nobody speaks. | *Until coffee.*', mood: 'squint', star: { x: -170 },
    front(x, t, lt, P) {
      card(x, 790, 820, pop01(t, P.t0 + 0.3, 0.35, 2), { w: 300, h: 220, head: 'NOTICE', headBg: RED, body: ['DO NOT', 'DISTURB'], size: 44, rot: -0.04 })
      bubble(x, 760, 990, 'morning!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: BONE, tail: 'br' })
      label(x, 820, 1110, 'NOPE.', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 46, bg: '#c97bff', color: '#fff4e2', rot: 0.06 })
    } },
  { sign: 'sagittarius', cap: 'Called in sick. | *From an airport.*', mood: 'sparkle', star: { x: 160 }, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      bubble(x, 320, 660, '*cough* | so sick…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'br' })
      label(x, 320, 880, 'NOW BOARDING: GATE 12', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 26, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 320, 1060, 'BOSS: HEARD THAT', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 28, bg: RED, color: '#fff4e2', rot: 0.05 })
    } },
  { sign: 'capricorn', cap: 'Genuinely | *loves Mondays.*', mood: 'heart', star: { x: 160 }, hops: [0.9],
    front(x, t, lt, P) {
      label(x, 320, 760, 'MONDAY', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 56, bg: TEAL, rot: -0.05, font: MONO, weight: 700 })
      hearts(x, t, 560, 880, P.t0 + 0.7, { n: 5, life: 1.6, spread: 80, cell: 8, seed: 2 })
      label(x, 320, 1040, 'EVERYONE: CONCERNED', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 26, bg: BONE, rot: 0.04 })
    } },
  { sign: 'aquarius', cap: 'Declared Monday | *cancelled.*', mood: 'sparkle', look: [1, -1], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      card(x, 790, 840, pop01(t, P.t0 + 0.3, 0.35, 2), { w: 300, h: 260, head: 'NEW WEEK v2', headBg: SKYB, body: ['TUE · WED · THU', 'FRI · SAT · SUN'], size: 28 })
      // a red stamp across it
      const s = pop01(t, P.t0 + 1.2, 0.3, 2.6)
      label(x, 790, 980, 'MON: GONE', s, { size: 40, bg: RED, color: '#fff4e2', rot: -0.12 })
    } },
  { sign: 'pisces', cap: 'Saw the sunrise. | *Sobbed.*', mood: 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: { x: -160 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      const p = ease.outCubic(prog(lt, 0.2, 1.6))
      x.save(); x.beginPath(); x.rect(600, 600, 400, 420); x.clip()
      drawBits(x, SUN, { Y: GOLD, O: ORANGE }, 800, lerp(1060, 860, p), 24)
      x.restore()
      x.fillStyle = INK; x.fillRect(620, 1010, 360, 12)
    },
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'so beautiful', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      label(x, 790, 1100, 'LATE FOR WORK', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 28, bg: SKYB, rot: 0.04 })
    } },
]

const F = makeFilm({
  id: 'v3t078', key: 'E', accent: TEAL, ending: 'callback',
  title: 'Zodiacs on Monday | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Monday | *won again.*' },
  last: {
    text: 'Taurus is | *still snoozing.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.4, 1.8)
      if (k > 0.01) signChar(x, t, 'taurus', 420, 1130, 260 * k, { mood: 'sleepy', seed: 5 })
      alarm(x, t, 700, 1110, pop01(t, t - lt + 0.9, 0.35, 2), Math.floor(lt * 2) % 2 === 0)
      label(x, 700, 1310, 'SNOOZE #15', pop01(t, t - lt + 1.3, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
