// r2a0290: star_advice, ADVICE ROLLCALL, "What each sign | *gets right.*" (~54 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order: one warm, specific strength per sign, each with a light visual gag. Ending: group.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ starts what others only talk about · ♉ shows up, every time · ♊ makes strangers feel like friends
//              · ♋ remembers how you take your tea · ♌ hypes you up the loudest · ♍ brings the umbrella before you ask
//              · ♎ finds the middle, kindly · ♏ keeps your secrets, forever · ♐ turns a Tuesday into an adventure
//              · ♑ keeps every promise · ♒ has the idea nobody else saw · ♓ feels it all, so you're less alone
//  49.2        group (the ending): "Every sign gets | *something right.*"  Over the photo: YOU INCLUDED ♡
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const WARM = '#ffcf7a', RED = '#e23d4e', BROWN = '#c98f5a', BLUE = '#3d8fd8'

// ── props
const FLAG = ['KKKKKKKKK', 'KRRRRRRRK', 'KRRRRRRRK', 'KRRRRRRRK', 'KKKKKKKKK', 'K........', 'K........', 'K........', 'K........', 'K........', 'K........']
const MUG = ['.KKKKK...', 'KWWWWWK..', 'KCCCCCKKK', 'KCCCCCK.K', 'KCCCCCK.K', 'KCCCCCKKK', 'KCCCCCK..', '.KKKKK...']
const UMBRELLA = ['....RRRRR....', '..RRRRRRRRR..', '.RRRWRRRWRRR.', 'RRRRRRRRRRRRR', 'K.K.K.K.K.K.K', '......K......', '......K......', '......K......', '......K......', '....K.K......', '....KKK......']
const LOCK = ['..KKKKK..', '.K.....K.', '.K.....K.', '.K.....K.', 'GGGGGGGGG', 'GGGGKGGGG', 'GGGGKGGGG', 'GGGGGGGGG', 'GGGGGGGGG']
const BULB = ['..YYYYY..', '.YYYYYYY.', 'YYYWYYYYY', 'YYWYYYYYY', 'YYYYYYYYY', '.YYYYYYY.', '..YYYYY..', '...GGG...', '...GGG...', '....G....']
/** a big balance scale, level */
function scale(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const tilt = 0.25 * Math.cos(lt * 4) * Math.exp(-lt * 1.6)
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-10, -120, 20, 260); x.fillRect(-80, 130, 160, 20)
  x.save(); x.translate(0, -120); x.rotate(tilt)
  x.fillStyle = INK; x.fillRect(-180, -8, 360, 16)
  for (const d of [-1, 1]) {
    x.save(); x.translate(d * 170, 0); x.rotate(-tilt)
    x.strokeStyle = BONE; x.lineWidth = 3; x.beginPath(); x.moveTo(0, 0); x.lineTo(-50, 90); x.moveTo(0, 0); x.lineTo(50, 90); x.stroke()
    x.fillStyle = INK; x.fillRect(-64, 86, 128, 20); x.fillStyle = GOLD; x.fillRect(-58, 90, 116, 12)
    x.fillStyle = d < 0 ? PINK : SKYB; x.beginPath(); x.arc(0, 72, 20, 0, Math.PI * 2); x.fill()
    x.restore()
  }
  x.restore()
  x.restore()
}
/** a compass with a wobbling needle */
function compass(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 140, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#fff8ea'; x.beginPath(); x.arc(0, 0, 118, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('N', 0, -90); x.fillText('S', 0, 90); x.fillText('E', 90, 0); x.fillText('W', -90, 0)
  x.rotate(lt * 5 + Math.sin(t * 3) * 0.4)
  x.fillStyle = RED; x.beginPath(); x.moveTo(0, -80); x.lineTo(16, 0); x.lineTo(-16, 0); x.fill()
  x.fillStyle = '#9aa5c4'; x.beginPath(); x.moveTo(0, 80); x.lineTo(16, 0); x.lineTo(-16, 0); x.fill()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 10, 0, Math.PI * 2); x.fill()
  x.restore()
}
/** a row of attendance ticks */
function ticks(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, -140, 360, 280); x.fillStyle = '#fff8ea'; x.fillRect(-172, -132, 344, 264)
  x.fillStyle = MINT; x.fillRect(-172, -132, 344, 52); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SHOWED UP', 0, -106)
  const n = Math.floor(clamp((lt - 0.3) / 1.2) * 15)
  for (let i = 0; i < 15; i++) {
    const bx = -140 + (i % 5) * 70, by = -40 + Math.floor(i / 5) * 60
    x.fillStyle = '#e8dcc6'; x.fillRect(bx - 4, by - 20, 48, 44)
    if (i < n) { x.fillStyle = '#2f9a5a'; x.font = `800 40px ${INTER}`; x.fillText('✓', bx + 20, by + 2) }
  }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Starts what others | *only talk about.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -170 }, hops: [0.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, FLAG, { K: INK, R: RED }, 820, 880, 24 * pop01(t, P.t0 + 0.6, 0.3, 2))
      bubble(x, 740, 640, 'someone should…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, tail: 'br' })
      label(x, 790, 1120, 'DAY 1: STARTED ✓', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Shows up. | *Every single time.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', star: { x: -170 },
    front(x, t, lt, P) {
      ticks(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1120, 'ATTENDANCE: 100%', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Makes strangers | *feel like friends.*', mood: 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 760, 650, 'hi! what’s | your sign?', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 820, 900, 'omg same!!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 44, col: PINK, tail: 'br' })
      label(x, 790, 1110, 'NEW FRIEND ✓', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Remembers how | *you take your tea.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, MUG, { W: '#fff8ea', K: '#e9dcc6', C: '#d9a066' }, 800, 900, 26 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 760, 650, 'oat milk, | one sugar?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bl' })
      hearts(x, t, 400, 760, P.t0 + 1.3, { n: 4, life: 1.4, spread: 120, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Hypes you up | *louder than anyone.*', mood: 'sparkle', star: { x: -170 }, hops: [0.6, 1.1, 1.6],
    front(x, t, lt, P) {
      const pulse = 1 + 0.06 * Math.sin(lt * 14)
      label(x, 790, 820, 'GO YOU!!!', pop01(t, P.t0 + 0.3, 0.3, 2.4) * pulse, { size: 72, bg: '#ffb34a', rot: -0.07, font: MONO, weight: 700 })
      label(x, 800, 1020, 'VOLUME: MAX', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 790, 820, P.t0 + 0.5, 8, 220, 0.3)
    } },
  { sign: 'virgo', cap: 'Brings the umbrella | *before you ask.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      x.save(); x.fillStyle = SKYB; for (let i = 0; i < 14; i++) { const ph = ((lt * 1.3 + i * 0.137) % 1), px = 620 + (i * 53) % 340; x.fillRect(px, 520 + ph * 620, 6, 22) } x.restore()
      drawBits(x, UMBRELLA, { R: '#7ed99a', W: '#c9f2d0', K: INK }, 800, 880, 24 * pop01(t, P.t0 + 0.5, 0.3, 2))
      label(x, 790, 1120, 'FORECAST: CHECKED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Finds the middle ground. | *Kindly.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      scale(x, t, 800, 900, pop01(t, P.t0 + 0.2, 0.3, 2) * 1.1, lt)
      label(x, 790, 640, 'BOTH SIDES: HEARD', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Keeps your secrets. | *Forever.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 760, 650, 'don’t tell | anyone…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, tail: 'br' })
      drawBits(x, LOCK, { K: '#9aa5c4', G: GOLD }, 800, 920, 22 * pop01(t, P.t0 + 0.9, 0.3, 2.2))
      label(x, 790, 1130, 'VAULT: LOCKED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: '#c97bff', color: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Turns a Tuesday | *into an adventure.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      compass(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2) * 0.9, lt)
      label(x, 790, 1120, 'PLANS: NONE · FUN: ALL', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Said they’d be there. | *Was there.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 760, 'PROMISE', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 52, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 920, 'KEPT ✓', pop01(t, P.t0 + 1.0, 0.3, 2.6), { size: 64, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 790, 920, P.t0 + 1.1, 7, 170, 0.4)
    } },
  { sign: 'aquarius', cap: 'Has the idea | *nobody else saw.*', mood: 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      const on = lt > 0.8
      if (on) { x.save(); x.globalAlpha = 0.25; x.fillStyle = '#fff1a8'; x.beginPath(); x.arc(800, 850, 200, 0, Math.PI * 2); x.fill(); x.restore() }
      drawBits(x, BULB, { Y: on ? '#ffe27a' : '#6b62a8', W: on ? '#fff' : '#8a80c4', G: '#9aa5c4' }, 800, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1120, 'GENIUS: AHEAD OF TIME', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      if (on) sparkles(x, t, 800, 860, P.t0 + 0.8, 8, 200, 0.2)
    } },
  { sign: 'pisces', cap: 'Feels it all, so | *you’re never alone.*', mood: 'heart', tears: lt => lt > 0.6 ? 2 : 1, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 760, 660, 'i’m here.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 52, col: LAV, tail: 'bl' })
      hearts(x, t, 800, 1000, P.t0 + 0.9, { n: 8, life: 2.0, spread: 280, cell: 8, seed: 9 })
      label(x, 790, 1120, 'EMPATHY: ENDLESS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0290', key: 'G', accent: WARM, ending: 'group',
  title: 'What each sign | *gets right.*',
  cameos: CAMEOS,
  group: {
    cap: 'Every sign gets | *something right.*',
    draw(x, t, lt) {
      label(x, 540, 700, 'YOU INCLUDED ♡', pop01(t, t - lt + 1.6, 0.3, 2.4), { size: 44, bg: WARM, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
