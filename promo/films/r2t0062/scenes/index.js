// r2t0062: THE SIGNS AS… v3, BE LIKE, "Someone whistles. | Zodiacs be like." (~57 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, each one's most extreme reaction to a single whistle.
//   0.0–3.6    "Someone whistles. | Zodiacs *be like.*"
//   3.6–49.2   ♈ whistled back louder, won · ♉ did not move (too comfy) · ♊ whistled back, started a conversation
//              · ♋ ran home for dinner · ♌ assumed it was for them, took a bow · ♍ it was slightly flat
//              · ♎ couldn't pick a tune, whistled two · ♏ didn't turn around, already knew who
//              · ♐ thought it was a taxi, now abroad · ♑ heard a whistle, started the meeting
//              · ♒ recorded it, it's their ringtone now · ♓ it was a sad song, sobbed
//  49.2        "One whistle. | *Twelve problems.*"  group photo.
//  52.6        CALLBACK: "Taurus? | *Still on the couch.*"  Taurus and the couch come back, zzz.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, notes, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#8fe3ff', RED = '#e23d4e'

// ── props
const COUCH = [
  'RR..........RR',
  'RRRRRRRRRRRRRR',
  'RRCCCCCCCCCCRR',
  'RRCCCCCCCCCCRR',
  'RRRRRRRRRRRRRR',
  'RRRRRRRRRRRRRR',
  '.B..........B.',
]
const COUCH_C = { R: '#c95a7a', C: '#e88aa4', B: '#5b2e1a' }
const PLATE = ['..WWWWWWW..', '.WWMMMMMWW.', 'WWMMMMMMMWW', '.WWWWWWWWW.']
const PLATE_C = { W: '#fff4e2', M: '#e8a24a' }
const HOUSE = [
  '.....RR.....',
  '...RRRRRR...',
  '.RRRRRRRRRR.',
  'RRRRRRRRRRRR',
  '.WWWWWWWWWW.',
  '.WYYWWWWYYW.',
  '.WYYWWWWYYW.',
  '.WWWWDDWWWW.',
  '.WWWWDDWWWW.',
]
const HOUSE_C = { R: RED, W: '#fff4e2', Y: GOLD, D: '#8a4a2e' }
const TAXI = [
  '...YYYYYY....',
  '..YWWYYWWY...',
  'YYYYYYYYYYYYY',
  'YKYKYKYKYKYKY',
  'YYYYYYYYYYYYY',
  '.KK.......KK.',
]
const TAXI_C = { Y: GOLD, W: SKYB, K: INK }
const PLANE = ['......WW.....', '......WWW....', 'W.....WWWW...', 'WWWWWWWWWWWWW', 'WWWWWWWWWWWWS', 'W.....WWWW...', '......WWW....', '......WW.....']
const PLANE_C = { W: '#ffffff', S: SKYB }

function phone(x, cx, cy, k, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-104, -166, 220, 344)
  x.fillStyle = INK; x.fillRect(-116, -178, 232, 356)
  x.fillStyle = '#2a2350'; x.fillRect(-106, -168, 212, 336)
  x.fillStyle = '#140c30'; x.fillRect(-92, -140, 184, 280)
  fn(); x.restore()
}
// a music stand with a little stave; one note marked flat
function stave(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = '#6b62a8'; x.fillRect(-8, 110, 16, 170); x.fillRect(-70, 270, 140, 14)
  x.fillStyle = INK; x.fillRect(-160, -120, 320, 240)
  x.fillStyle = '#fff4e2'; x.fillRect(-152, -112, 304, 224)
  x.fillStyle = '#6b62a8'; for (let i = 0; i < 5; i++) x.fillRect(-130, -60 + i * 26, 260, 4)
  x.fillStyle = INK; for (const [nx, ny] of [[-90, -8], [-30, -34], [30, 18], [90, -21]]) { x.beginPath(); x.ellipse(nx, ny, 15, 11, -0.3, 0, Math.PI * 2); x.fill(); x.fillRect(nx + 11, ny - 60, 5, 60) }
  x.restore()
}
// a small easel with an agenda
function agenda(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = '#8a4a2e'; x.fillRect(-100, 120, 16, 180); x.fillRect(84, 120, 16, 180)
  x.fillStyle = INK; x.fillRect(-170, -150, 340, 290)
  x.fillStyle = '#fff4e2'; x.fillRect(-160, -140, 320, 270)
  x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('AGENDA', -130, -100)
  x.font = `700 30px ${INTER}`
  const L = ['1. the whistle', '2. who whistled', '3. next steps']
  L.forEach((l, i) => { if (lt > 0.5 + i * 0.3) x.fillText(l, -130, -40 + i * 52) })
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Whistled back. | *Louder. Won.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 }, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      notes(x, t, 560, 780, { n: 5, cell: 9, col: '#f0603a', seed: 1, alpha: clamp(lt - 0.3) })
      label(x, 790, 760, 'VOLUME: MAX', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 40, bg: RED, color: '#fff4e2', rot: 0.05 })
      label(x, 790, 960, 'WHISTLE-OFF: WON', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.05 })
      sparkles(x, t, 790, 960, P.t0 + 1.45, 7, 170, 0.2)
    } },
  { sign: 'taurus', cap: 'Heard a whistle. | *Did not move.*', mood: 'sleepy', look: [0, 0], star: { x: -150, y: -10, s: 270 },
    back(x, t, lt, P) { drawBits(x, COUCH, COUCH_C, 390, 1000, 30 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      bubble(x, 800, 680, '♪ fweet! ♪', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, col: SKYB, tail: 'br' })
      label(x, 800, 900, 'TOO COMFY', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 44, bg: PINK, rot: 0.04 })
    } },
  { sign: 'gemini', cap: 'Whistled back. | Now *they’re chatting.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const W = ['♪?', '♪♪!', '♪ ♪♪ ♪?', 'HA ♪♪']
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.45))
      bubble(x, 800, 700, W[n], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 50, tail: 'bl' })
      label(x, 790, 960, `MESSAGES: ${(n + 1) * 12}`, pop01(t, P.t0 + 0.8, 0.3, 2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Heard a whistle. | *Ran home for dinner.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 }, hops: [0.5, 0.8, 1.1],
    front(x, t, lt, P) {
      drawBits(x, HOUSE, HOUSE_C, 800, 850, 22 * pop01(t, P.t0 + 0.3, 0.35, 2))
      drawBits(x, PLATE, PLATE_C, 800, 1070, 18 * pop01(t, P.t0 + 1.2, 0.3, 2))
      bubble(x, 790, 640, 'coming, mom!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Assumed it was for them. | *Took a bow.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, squash: lt => lt > 1.0 && lt < 1.8 ? 0.12 : 0,
    front(x, t, lt, P) {
      label(x, 790, 760, 'THANK YOU,', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 42, bg: GOLD, rot: -0.04 })
      label(x, 790, 880, 'THANK YOU.', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 42, bg: '#ffb34a', rot: 0.04 })
      hearts(x, t, 370, 760, P.t0 + 1.2, { n: 6, life: 1.6, spread: 220, cell: 7, seed: 4 })
    } },
  { sign: 'virgo', cap: 'Lovely whistle. | *Slightly flat.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      stave(x, 790, 760, pop01(t, P.t0 + 0.25, 0.35, 2))
      label(x, 860, 680, '♭ FLAT', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 44, bg: RED, color: '#fff4e2', rot: 0.08 })
      label(x, 790, 1120, 'NOTES ATTACHED', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.04 })
    } },
  { sign: 'libra', cap: 'Couldn’t pick a tune. | *Whistled two.*', mood: lt => lt > 1.4 ? 'wink' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      notes(x, t, 690, 900, { n: 4, cell: 9, col: PINK, seed: 1, alpha: clamp(lt - 0.3) })
      notes(x, t, 900, 900, { n: 4, cell: 9, col: SKYB, seed: 4, alpha: clamp(lt - 0.6) })
      label(x, 690, 1080, 'TUNE A', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 36, bg: PINK, rot: -0.05 })
      label(x, 900, 1080, 'TUNE B', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 36, bg: SKYB, rot: 0.05 })
    } },
  { sign: 'scorpio', cap: 'Didn’t turn around. | *Already knew who.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [-1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 800, 680, '♪ fweet! ♪', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: SKYB, tail: 'br' })
      label(x, 790, 900, 'SUSPECT: CAPRICORN', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: '#e23d66', color: '#fff4e2', rot: -0.04 })
      label(x, 790, 1020, 'MOTIVE: LUNCH', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: BONE, rot: 0.04 })
    } },
  { sign: 'sagittarius', cap: 'Thought it was a taxi. | *Now abroad.*', mood: 'sparkle', look: [1, -1], star: { x: -170 }, hops: [0.6],
    back(x, t, lt, P) {
      const p = prog(lt, 1.0, 2.3)
      if (p > 0 && p < 1) drawBits(x, PLANE, PLANE_C, lerp(200, 980, p), 600 - 60 * p, 13, { rot: -0.08 })
    },
    front(x, t, lt, P) {
      drawBits(x, TAXI, TAXI_C, 800, 900, 20 * pop01(t, P.t0 + 0.3, 0.35, 2) * (1 - prog(lt, 1.0, 1.3)))
      label(x, 790, 1100, 'NEXT STOP: ANYWHERE', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'capricorn', cap: 'Heard a whistle. | *Started the meeting.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) { agenda(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), lt) } },
  { sign: 'aquarius', cap: 'Recorded it. | *New ringtone.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2), () => {
        x.fillStyle = RED; x.beginPath(); x.arc(0, -40, 30 + 4 * Math.sin(t * 6), 0, Math.PI * 2); x.fill()
        x.fillStyle = BONE; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(lt > 1.3 ? 'SAVED' : 'REC', 0, 40)
      })
      notes(x, t, 790, 760, { n: 4, cell: 8, col: SKYB, seed: 2, alpha: clamp(lt - 1.3) })
      label(x, 790, 1110, 'RINGTONE: SET', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: SKYB, rot: -0.04 })
    } },
  { sign: 'pisces', cap: 'It was a sad song. | *Sobbed.*', mood: lt => lt > 1.0 ? 'wide' : 'happy', tears: lt => lt > 1.0 ? 3 : 1, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      notes(x, t, 800, 900, { n: 5, cell: 9, col: LAV, seed: 3 })
      label(x, 800, 1080, 'TISSUES: ALL', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: SKYB, rot: -0.04 })
    } },
]

const F = makeFilm({
  id: 'r2t0062', key: 'E', accent: ACC, ending: 'callback',
  title: 'Someone whistles. | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'One whistle. | *Twelve problems.*' },
  last: {
    text: 'Taurus? | *Still on the couch.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const c = pop01(t, t0 + 0.3, 0.4, 2)
      drawBits(x, COUCH, COUCH_C, 540, 1110, 40 * c)
      const a = pop01(t, t0 + 0.5, 0.45, 1.8)
      if (a > 0.01) signChar(x, t, 'taurus', 540, 990, 300 * a, { mood: 'sleepy', seed: 31 })
      notes(x, t, 820, 900, { n: 3, cell: 8, col: SKYB, seed: 5, alpha: clamp(lt - 1.0) })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
