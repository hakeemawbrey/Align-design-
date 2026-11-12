// v3t059: THE SIGNS AS… v3, "Crush’s new story? | Zodiacs be like." (~54 s vertical, signs3kit social cut, music: lofi · F)
//   0.0–3.6    "Crush posted a story. | *Zodiacs be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one reaction per sign (3.8 s each), each pushed to the extreme:
//              ♈ replied before it loaded · ♉ liked it three days later · ♊ watched it, started a podcast about it
//              · ♋ there was a dog in it: asked the dog's name · ♌ posted a story back: forty slides · ♍ zoomed in, spotted a typo
//              · ♎ liked it by accident, moved countries · ♏ will mention it in 2031 · ♐ a mountain in the back: already climbing
//              · ♑ replied with a calendar invite · ♒ replied "is the moon real?" · ♓ it was a sunset, Pisces wept
//  49.2        group ending: "One story. | *Twelve meltdowns.*"  The story bar fills above the photo and a heart pops.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', HOT = '#ff6fa0'

const DOG = [
  'BB....BB.',
  'BBBBBBBB.',
  '.BKBBKB..',
  '.BBBBBB..',
  '.BBKKBB..',
  '..BBBB...',
  '.BBBBBBBB',
  '.BBBBBBBB',
  '.B.B..B.B',
]
const MIC = [
  '.GGGG.',
  'GgGGgG',
  'GGgGGG',
  'GgGGgG',
  '.GGGG.',
  '..KK..',
  '..KK..',
  '.KKKK.',
]
const MOUNTAIN = [
  '.....W.....',
  '....WWW....',
  '...GGWGG...',
  '..GGGGGGG..',
  '.GGGGGGGGG.',
  'GGGGGGGGGGG',
]
const MOON = [
  '..YYYY..',
  '.YYY....',
  'YYY.....',
  'YYY.....',
  'YYY.....',
  '.YYY....',
  '..YYYY..',
]
const SUITCASE = [
  '...KKKK...',
  '...K..K...',
  'SSSSSSSSSS',
  'SsSSSSSSsS',
  'SSSSSSSSSS',
  'SsSSSSSSsS',
  'SSSSSSSSSS',
  '.K......K.',
]

// a phone showing a story (progress bars on top, a picture, optional overlay fn)
function story(x, t, cx, cy, k, { rot = 0.05, bg = ['#ff9ec7', '#ffd6a0'], prog: p = 0.5, bars = 1, fn } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-138, -214, 288, 440)
  x.fillStyle = INK; x.fillRect(-150, -226, 300, 452)
  x.fillStyle = '#2a2350'; x.fillRect(-140, -216, 280, 432)
  const g = x.createLinearGradient(0, -186, 0, 186); g.addColorStop(0, bg[0]); g.addColorStop(1, bg[1])
  x.fillStyle = g; x.fillRect(-126, -186, 252, 372)
  for (let i = 0; i < bars; i++) { const w = (236 - (bars - 1) * 6) / bars, bx = -118 + i * (w + 6); x.fillStyle = 'rgba(255,255,255,0.4)'; x.fillRect(bx, -176, w, 6); x.fillStyle = '#fff'; x.fillRect(bx, -176, w * clamp(i < Math.floor(p * bars) ? 1 : p * bars - i), 6) }
  if (fn) fn(x)
  x.restore()
}
function calInvite(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -130, 300, 260)
  x.fillStyle = '#fff4e2'; x.fillRect(-142, -122, 284, 244)
  x.fillStyle = RED; x.fillRect(-142, -122, 284, 56)
  x.fillStyle = '#fff4e2'; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('INVITE', 0, -94)
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.fillText('coffee?', 0, -30); x.fillText('tue 3:00–3:45', 0, 14)
  x.fillStyle = MINT; x.fillRect(-110, 56, 100, 40); x.fillStyle = '#ffd3d3'; x.fillRect(10, 56, 100, 40)
  x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.fillText('ACCEPT', -60, 77); x.fillText('DECLINE', 60, 77)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Replied before | *it even loaded.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', star: { x: -180 }, hops: [0.3, 0.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      story(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: ['#3a3466', '#2a2350'], prog: 0.02, fn: x => { x.fillStyle = BONE; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.fillText('loading…', 0, 0) } })
      bubble(x, 790, 1110, 'HI!!! YES!!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Liked it. | *Three days later.*', mood: 'sleepy', star: { x: -180 },
    front(x, t, lt, P) {
      const D = ['MON', 'TUE', 'WED', 'THU']
      label(x, 790, 660, D[Math.min(3, Math.floor(lt * 2))], pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 44, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      if (lt > 1.6) hearts(x, t, 790, 980, P.t0 + 1.6 * 1.29, { n: 3, life: 1.2, spread: 80, cell: 10, seed: 1 })
      label(x, 790, 1100, lt > 1.6 ? '♡ LIKED' : 'LIKE?', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 38, bg: lt > 1.6 ? PINK : BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Watched it once. | *Started a podcast.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, MIC, { G: '#c9c9d8', g: '#8a8aa0', K: '#2a2350' }, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 650, 'EP. 1: THE STORY', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1120, '● ON AIR', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: RED, color: '#fff4e2', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'A dog was in it. | *Asked the dog’s name.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -180 },
    front(x, t, lt, P) {
      story(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: ['#bfe8ff', '#d3f5e0'], prog: clamp(lt / 2.4), fn: x => drawBits(x, DOG, { B: '#c98a5a', K: INK }, 0, 30, 18) })
      bubble(x, 790, 640, 'his NAME??', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bl' })
      hearts(x, t, 790, 860, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Posted a story back. | *Forty slides.*', mood: 'sparkle', star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      const n = Math.min(40, 1 + Math.floor(lt * 18))
      story(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: ['#ffd23a', '#ffb34a'], bars: 20, prog: n / 40, fn: x => signChar(x, t, 'leo', 0, 20, 180, { mood: n % 2 ? 'wink' : 'sparkle', seed: 70, glyph: false, glow: 0.4 }) })
      label(x, 790, 1130, `SLIDE ${n}/40`, pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Zoomed in. | *Spotted a typo.*', mood: lt => lt > 1.3 ? 'squint' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      story(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: ['#e8eaf6', '#c9e6ff'], prog: 0.6, fn: x => { x.fillStyle = INK; x.font = `800 38px ${INTER}`; x.textAlign = 'center'; x.fillText('best day', 0, -20); x.fillText('everr', 0, 30); if (lt > 1.2) { x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.ellipse(40, 20, 50, 34, 0, 0, Math.PI * 2); x.stroke() } } })
      label(x, 790, 1130, 'ERRORS: 1', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Liked it by accident. | *Moved countries.*', mood: lt => lt > 0.9 ? 'wide' : 'happy', star: { x: -180 }, hops: [1.4, 1.7],
    front(x, t, lt, P) {
      label(x, 790, 660, '♡ LIKED (OOPS)', pop01(t, P.t0 + 0.4, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
      drawBits(x, SUITCASE, { S: PINK, s: '#c24a6a', K: INK }, 790, 930, 24 * pop01(t, P.t0 + 1.2, 0.3, 2))
      label(x, 790, 1130, 'BYE FOREVER', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: BONE, rot: 0.04 })
    } },
  { sign: 'scorpio', cap: 'Said nothing. | *Will mention it in 2031.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      label(x, 790, 700, 'SEEN', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 40, bg: '#9aa5c4', rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 960, 'NOTED: 2031', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: '#ff8a9a', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'A mountain in the back. | *Already climbing it.*', mood: 'sparkle', star: { x: -170, y: -40 }, hops: [0.5, 1.0, 1.5],
    back(x, t, lt, P) { drawBits(x, MOUNTAIN, { W: '#fff4e2', G: '#6b9a7a' }, 760, 990, 34 * pop01(t, P.t0 + 0.2, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 790, 650, 'SUMMIT: SOON', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Replied with | *a calendar invite.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) { calInvite(x, 780, 860, pop01(t, P.t0 + 0.3, 0.35, 2)) } },
  { sign: 'aquarius', cap: 'Replied: | *“is the moon real?”*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, MOON, { Y: GOLD }, 800, 840, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1110, 'SENT 3:12 A.M.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'It was a sunset. | *Pisces wept.*', mood: lt => lt < 0.9 ? 'happy' : 'wide', tears: lt => lt < 0.9 ? 1 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      story(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: ['#ff8a5a', '#8a4ac8'], prog: clamp(lt / 2.4), fn: x => { x.fillStyle = GOLD; x.beginPath(); x.arc(0, 40, 60, Math.PI, 0); x.fill(); x.fillStyle = '#2a2350'; x.fillRect(-126, 40, 252, 146) } })
      label(x, 790, 1130, 'TOO BEAUTIFUL', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 32, bg: LAV, rot: -0.04 })
    } },
]

const F = makeFilm({
  id: 'v3t059', key: 'F', accent: HOT, ending: 'group',
  title: 'Crush’s new story? | *Zodiacs be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'One story. | *Twelve meltdowns.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.9, 0.35, 2)
      if (k <= 0.01) return
      x.save(); x.translate(540, 660); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-306, -22, 612, 44); x.fillStyle = 'rgba(255,255,255,0.3)'; x.fillRect(-300, -16, 600, 32)
      x.fillStyle = HOT; x.fillRect(-300, -16, 600 * clamp((lt - 1.0) / 2.6), 32)
      x.restore()
      label(x, 540, 560, 'CRUSH’S STORY', k, { size: 40, bg: BONE, rot: -0.03, font: MONO, weight: 700 })
      hearts(x, t, 540, 960, t - lt + 2.2, { n: 8, life: 2.0, spread: 600, cell: 8, seed: 2 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
