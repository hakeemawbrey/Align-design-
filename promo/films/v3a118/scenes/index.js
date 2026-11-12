// v3a118: star_advice, ADVICE ROLLCALL, "How each sign | falls in love." (~54 s vertical, signs3kit social cut, music: lofi · F)
// Twelve signs in zodiac order, one warm, specific "how they fall" each, with one light gag:
//   ♈ all at once (DAY 1: SMITTEN) · ♉ slowly, then forever (a sprout becomes a flower) · ♊ mid-conversation, "wait, it’s
//   3 a.m.?" · ♋ when you ask for seconds · ♌ when you laugh at their joke · ♍ when you remember "no onions" · ♎ over a
//   perfect sunset · ♏ quietly, then completely (TRUST bar fills) · ♐ on an adventure that went wrong (LOST TOGETHER)
//   · ♑ when you believe in their plan · ♒ over a shared weird hobby (ROCK CLUB: 2 MEMBERS) · ♓ at first sight, and second
//  49.2   group ending: "Every sign | *falls eventually.*"  hearts drift over the group photo.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', WOOD = '#c98f2a', CORAL = '#ff7a8a'

const card = (x, cx, cy, w, h, k, rot = 0, bg = BONE) => {
  x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
}
const PIE = ['...SSSS...', '.SSSSSSSS.', 'SSsSSsSSsS', 'CCCCCCCCCC', '.CFFFFFFC.', '..CCCCCC..']
const ROCK = ['..GGG..', '.GGgGG.', 'GGGGGgG', 'GgGGGGG', '.GGGGG.']
const POT = ['TTTTTTT', '.TTTTT.', '.TTTTT.', '..TTT..']
function flower(x, cx, cy, k, grow) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  drawBits(x, POT, { T: WOOD }, 0, 80, 20)
  const h = 30 + 160 * grow
  x.fillStyle = INK; x.fillRect(-9, 30 - h, 18, h + 4); x.fillStyle = '#5fd068'; x.fillRect(-5, 32 - h, 10, h)
  if (grow > 0.2) { x.fillStyle = '#5fd068'; x.beginPath(); x.ellipse(-30, 10 - h * 0.4, 28, 12, -0.5, 0, Math.PI * 2); x.fill() }
  if (grow > 0.7) {
    const b = clamp((grow - 0.7) / 0.3)
    x.fillStyle = PINK; for (let a = 0; a < 6; a++) { x.beginPath(); x.arc(Math.cos(a) * 34 * b, 30 - h + Math.sin(a) * 34 * b, 24 * b, 0, Math.PI * 2); x.fill() }
    x.fillStyle = GOLD; x.beginPath(); x.arc(0, 30 - h, 18 * b, 0, Math.PI * 2); x.fill()
  }
  x.restore()
}
function sunset(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); card(x, cx, cy, 340, 280, k, 0.04, '#ff9a7a')
  x.fillStyle = '#ffb38a'; x.fillRect(-170, -140, 340, 90)
  x.fillStyle = GOLD; x.beginPath(); x.arc(0, 40, 70, Math.PI, 0); x.fill()
  x.fillStyle = '#6a4fb0'; x.fillRect(-170, 40, 340, 100)
  x.fillStyle = '#8b6fd6'; for (let i = 0; i < 5; i++) x.fillRect(-130 + i * 60 + 6 * Math.sin(t * 2 + i), 70 + (i % 2) * 30, 40, 6)
  x.restore()
}
function trustBar(x, cx, cy, k, fill) {
  if (k <= 0.01) return
  x.save(); card(x, cx, cy, 340, 140, k, -0.04, '#140c30')
  x.fillStyle = BONE; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TRUST', 0, -38)
  for (let i = 0; i < 6; i++) { x.fillStyle = INK; x.fillRect(-150 + i * 50, -6, 44, 48); x.fillStyle = i < Math.round(fill * 6) ? '#c97bff' : '#2a2350'; x.fillRect(-146 + i * 50, -2, 36, 40) }
  x.restore()
}
function map(x, t, cx, cy, k, draw) {
  if (k <= 0.01) return
  x.save(); card(x, cx, cy, 340, 280, k, -0.04, '#f3d9a0')
  x.fillStyle = '#7fd0f2'; x.fillRect(60, -140, 110, 120)
  x.fillStyle = '#5fd068'; x.beginPath(); x.arc(-80, 60, 50, 0, Math.PI * 2); x.fill()
  x.strokeStyle = RED; x.lineWidth = 6; x.setLineDash([14, 10]); x.beginPath()
  const N = 60, n = Math.floor(N * clamp(draw))
  for (let i = 0; i <= n; i++) { const u = i / N, px = -130 + 260 * u + 70 * Math.sin(u * 13), py = 80 - 160 * u + 60 * Math.cos(u * 11); i ? x.lineTo(px, py) : x.moveTo(px, py) }
  x.stroke(); x.setLineDash([])
  x.fillStyle = INK; x.font = `800 44px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; if (draw > 0.95) x.fillText('?', 110, -90)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'All at once. | *Day one.*', mood: lt => lt > 0.8 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 }, hops: [0.8, 1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 760, 'MATCHED: 9:02', pop01(t, P.t0 + 0.3, 0.3, 2.4), { size: 38, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 900, 'SMITTEN: 9:03', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 42, bg: '#ff6b5a', rot: 0.05, font: MONO, weight: 700 })
      if (lt > 0.8) hearts(x, t, 600, 1080, P.t0 + 0.8 * (3.1 / 2.4), { n: 6, life: 1.8, spread: 100, cell: 7, seed: 1 })
    } },
  { sign: 'taurus', cap: 'Slowly. | *Then forever.*', mood: lt => lt > 1.6 ? 'heart' : 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      flower(x, 790, 960, 1.2 * pop01(t, P.t0 + 0.2, 0.35, 2), ease.inOutCubic(prog(lt, 0.4, 1.8)))
      label(x, 790, 660, 'WATERED DAILY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Mid-conversation. | *Didn’t even notice.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'and THEN— | wait.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      bubble(x, 800, 900, 'it’s 3 a.m.?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 46, col: GOLD, tail: 'br' })
    } },
  { sign: 'cancer', cap: 'When you ask | *for seconds.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PIE, { S: '#f3c77a', s: '#c98f2a', C: '#d9a35a', F: RED }, 790, 900, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 780, 680, 'more, please?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, col: LAV, tail: 'br' })
      label(x, 790, 1110, 'IT’S OVER. IN LOVE.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'When you laugh | *at their joke.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -200, s: 270 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 830, 960, 200 * k, { mood: lt > 0.9 ? 'happy' : 'neutral', look: [-1, 0], seed: 101, glyph: false, hops: [P.t0 + 1.2, P.t0 + 1.5, P.t0 + 1.8] })
      label(x, 830, 700, 'HA! HA! HA!', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.05 })
      label(x, 420, 640, 'SOLD.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 46, bg: '#ffb34a', rot: -0.05 })
    } },
  { sign: 'virgo', cap: 'When you remember | *the details.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) { x.save(); card(x, 790, 820, 280, 240, k, 0.06, '#ffe97a'); x.fillStyle = INK; x.font = `800 44px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('no onions.', 0, -30); x.font = `700 28px ${MONO}`; x.fillText('(you said once)', 0, 40); x.restore() }
      label(x, 790, 1070, 'NOTICED.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 46, bg: MINT, rot: -0.04 })
    } },
  { sign: 'libra', cap: 'Over a | *perfect sunset.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sunset(x, t, 790, 830, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1080, 'SCENE: PERFECT', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: '#ff9ccf', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Quietly. | *Then completely.*', mood: lt => lt > 1.5 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      trustBar(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), ease.inCubic(prog(lt, 0.4, 1.6)))
      label(x, 790, 1020, lt > 1.6 ? 'ALL IN.' : 'loading…', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 44, bg: lt > 1.6 ? '#c97bff' : BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'On a trip | *that went wrong.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      map(x, t, 790, 830, pop01(t, P.t0 + 0.2, 0.35, 2), prog(lt, 0.3, 1.3))
      label(x, 790, 1080, 'LOST TOGETHER', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 42, bg: '#ff9a4a', rot: 0.04 })
    } },
  { sign: 'capricorn', cap: 'When you believe | *in their plan.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'you’ll do it. | I know it.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: MINT, tail: 'br' })
      label(x, 790, 920, 'FELL. CAREFULLY.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: '#2fc79a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Over a shared | *weird hobby.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, ROCK, { G: ['#9aa5c4', '#c9c4d8', '#7a86b8'][i], g: '#5a6496' }, 680 + i * 110, 960, 22 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2))
      label(x, 790, 760, 'ROCK CLUB: 2 MEMBERS', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'At first sight. | *And second. And third.*', mood: 'heart', tears: 2, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 700, 'FELL', pop01(t, P.t0 + 0.3, 0.3, 2.4), { size: 44, bg: SKYB, rot: -0.04 })
      label(x, 790, 840, 'AGAIN', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 44, bg: LAV, rot: 0.04 })
      label(x, 790, 980, 'AND AGAIN', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 44, bg: PINK, rot: -0.03 })
    } },
]

const F = makeFilm({
  id: 'v3a118', key: 'F', accent: CORAL, ending: 'group',
  title: 'How each sign | *falls in love.*',
  cameos: CAMEOS,
  group: {
    cap: 'Every sign | *falls eventually.*',
    moods: ['heart', 'heart', 'sparkle', 'heart', 'heart', 'happy', 'heart', 'wink', 'sparkle', 'happy', 'sparkle', 'heart'],
    draw(x, t, lt) { hearts(x, t, 540, 1050, t - lt + 1.4, { n: 12, life: 3.0, spread: 900, cell: 8, seed: 7 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
