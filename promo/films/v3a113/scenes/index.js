// v3a113: star_advice, ADVICE ROLLCALL, "Each sign’s | love era." (~57 s vertical, signs3kit social cut, music: lofi · F)
// Twelve signs in zodiac order, one warm, specific "love era" each with one light gag:
//   ♈ patience (waited three whole minutes) · ♉ ordering something new · ♊ one conversation: TABS OPEN: 1 · ♋ being the one
//   who gets soup · ♌ asking about them · ♍ loving the mess (not fixing it) · ♎ picking the restaurant in four seconds
//   · ♏ saying it first · ♐ staying for dessert · ♑ a date with no agenda · ♒ sharing a feeling (one) · ♓ happy tears only
//  49.2   "Love looks good | *on everyone.*"  group photo
//  52.6   callback: "Aries waited. | *Worth it.*"  the hourglass comes back, full of hearts.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', WOOD = '#c98f2a', ROSE = '#ff9ccf'

const card = (x, cx, cy, w, h, k, rot = 0, bg = BONE) => {
  x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
}
const HOURGLASS = [
  'BBBBBBBBB',
  '.WWWWWWW.',
  '.WSSSSSW.',
  '..WSSSW..',
  '...WSW...',
  '....W....',
  '...W.W...',
  '..W.S.W..',
  '.W.SSS.W.',
  '.WSSSSSW.',
  'BBBBBBBBB',
]
const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
function menu(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); card(x, cx, cy, 320, 400, k, 0.04, '#fff4e2')
  x.fillStyle = INK; x.font = `800 36px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MENU', 0, -150)
  const rows = ['the usual', 'the usual', 'the usual', 'something new']
  rows.forEach((r, i) => { x.fillStyle = i === 3 ? RED : '#9a8fb0'; x.font = `${i === 3 ? 800 : 700} 30px ${INTER}`; x.fillText(r, 0, -80 + i * 64) })
  if (lt > 1.0) { x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.ellipse(0, 112, 140, 34, 0, 0, Math.PI * 2 * clamp((lt - 1.0) * 3)); x.stroke() }
  x.restore()
}
function bowl(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < 3; i++) { const ph = (t * 0.6 + i / 3) % 1; x.globalAlpha = Math.sin(Math.PI * ph) * 0.8; x.fillStyle = BONE; x.fillRect(-50 + i * 40 + 8 * Math.sin(ph * 8), -80 - ph * 120, 12, 30) }
  x.globalAlpha = 1
  x.fillStyle = INK; x.beginPath(); x.arc(0, -10, 128, 0, Math.PI); x.closePath(); x.fill()
  x.fillStyle = '#ffb34a'; x.beginPath(); x.arc(0, -10, 120, 0, Math.PI); x.closePath(); x.fill()
  x.fillStyle = INK; x.fillRect(-130, -22, 260, 16); x.fillStyle = '#ffd97a'; x.fillRect(-122, -18, 244, 8)
  x.restore()
}
function mess(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const items = [[-120, 40, 110, 30, SKYB, 0.2], [-40, 10, 140, 34, PINK, -0.3], [60, 50, 120, 28, MINT, 0.15], [-80, -30, 90, 90, GOLD, 0.4], [80, -20, 100, 60, LAV, -0.2], [0, 80, 220, 26, '#ffb34a', 0.05]]
  for (const [a, b, w, h, c, r] of items) { x.save(); x.translate(a, b); x.rotate(r); x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10); x.fillStyle = c; x.fillRect(-w / 2, -h / 2, w, h); x.restore() }
  x.restore()
}
const CAKE = ['.......WW', '.....WWPP', '...WWPPPP', '.WWPPPPPP', 'WWWWWWWWW', 'PPPPPPPPP', 'YYYYYYYYY', 'PPPPPPPPP']
function agenda(x, cx, cy, k, cross) {
  if (k <= 0.01) return
  x.save(); card(x, cx, cy, 330, 300, k, -0.04, '#fff4e2')
  x.fillStyle = '#2fc79a'; x.fillRect(-165, -150, 330, 64)
  x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('DATE AGENDA', 0, -117)
  x.font = `700 28px ${MONO}`; ['7:00 arrive', '7:05 small talk', '7:20 assess'].forEach((r, i) => x.fillText(r, 0, -40 + i * 56))
  if (cross > 0) { x.strokeStyle = RED; x.lineWidth = 10; x.beginPath(); x.moveTo(-140, -70); x.lineTo(-140 + 280 * cross, -70 + 200 * cross); x.stroke() }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Your era: | *patience.* (Trying.)', mood: lt => lt > 1.4 ? 'squint' : 'wide', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, HOURGLASS, { B: WOOD, W: '#d9e8ff', S: GOLD }, 790, 840, 26 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: Math.PI * ease.inOutCubic(prog(lt, 0.9, 1.3)) })
      label(x, 790, 1130, 'WAITED: 3 MINUTES', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Your era: | ordering *something new.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      menu(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1110, 'BRAVE.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 46, bg: MINT, rot: 0.05 })
    } },
  { sign: 'gemini', cap: 'Your era: | *one conversation* at a time.', mood: 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = lt < 0.9 ? 6 : 1
      for (let i = n - 1; i >= 0; i--) { const k = pop01(t, P.t0 + 0.2 + i * 0.06, 0.25, 2); x.save(); card(x, 790 + i * 22 - (n - 1) * 11, 820 + i * 16 - (n - 1) * 8, 200, 300, k, 0.05 * (i - 2), i ? '#2a2350' : BONE); x.restore() }
      if (lt > 0.9) bubble(x, 790, 800, 'tell me | more?', pop01(lt, 0.95, 0.25, 2.2), { size: 38, col: LAV, tail: 'bc' })
      label(x, 790, 1100, 'TABS OPEN: 1', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Your era: | *you get the soup.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 830, 960, 200 * k, { mood: 'happy', look: [-1, 0], seed: 51, glyph: false })
      bowl(x, t, lerp(760, 600, ease.inOutCubic(prog(lt, 0.7, 1.2))), 1090, 0.75 * pop01(t, P.t0 + 0.4, 0.3, 2))
      label(x, 700, 640, 'BEING CARED FOR', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Your era: | *asking about them.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 760, 680, 'enough about me. | how are YOU?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 790, 960, 'LISTENING FACE: ON', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: '#ffb34a', rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Your era: | *loving the mess.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      mess(x, t, 790, 980, pop01(t, P.t0 + 0.2, 0.35, 2))
      if (lt > 1.2) drawBits(x, HEART, { H: PINK }, 790, 800, 12 * pop01(lt, 1.2, 0.3, 2.4))
      label(x, 790, 650, 'NOT FIXING IT', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Your era: | *you pick the place.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'this one. | final answer.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      const s = Math.min(4, Math.max(0, (lt - 0.3) * 3)).toFixed(0)
      label(x, 790, 960, `DECIDED IN ${s} SEC`, pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 38, bg: ROSE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Your era: | *saying it first.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 770, 680, 'I like you. | there. said it.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      label(x, 790, 960, 'GUARD: DOWN', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 42, bg: '#c97bff', rot: -0.04, font: MONO, weight: 700 })
      if (lt > 1.4) hearts(x, t, 420, 900, P.t0 + 1.4 * (3.1 / 2.4), { n: 5, life: 1.6, spread: 120, cell: 6, seed: 2 })
    } },
  { sign: 'sagittarius', cap: 'Your era: | *staying for dessert.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CAKE, { W: '#fff4e2', P: ROSE, Y: GOLD }, 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1120, 'PASSPORT: PUT AWAY', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: '#ff9a4a', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Your era: | a date with *no agenda.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      agenda(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), ease.inOutCubic(prog(lt, 0.9, 1.3)))
      label(x, 790, 1080, 'JUST VIBES', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 44, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'aquarius', cap: 'Your era: | *sharing a feeling.* One.', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'I… have | a feeling.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
      label(x, 790, 960, 'FEELINGS SHARED: 1', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 400, 860, P.t0 + 1.5, 7, 170, 0.3)
    } },
  { sign: 'pisces', cap: 'Your era: | *happy tears only.*', mood: 'heart', tears: 2, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 760, 'HAPPY CRYING', pop01(t, P.t0 + 0.4, 0.3, 2.4), { size: 44, bg: SKYB, rot: -0.04 })
      label(x, 790, 900, '(STILL CRYING)', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
      hearts(x, t, 600, 1080, P.t0 + 0.8, { n: 6, life: 2.2, spread: 120, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'v3a113', key: 'F', accent: ROSE, ending: 'callback',
  title: 'Each sign’s | *love era.*',
  cameos: CAMEOS,
  group: { cap: 'Love looks good | *on everyone.*' },
  last: {
    text: 'Aries waited. | *Worth it.*',
    draw(x, t, lt) {
      const k = pop01(lt, 0.3, 0.4, 2)
      drawBits(x, HOURGLASS, { B: WOOD, W: '#d9e8ff', S: PINK }, 680, 1080, 24 * k)
      if (k > 0.01) signChar(x, t, 'aries', 400, 1100, 240 * k, { mood: lt > 1.2 ? 'heart' : 'happy', look: [1, 0], seed: 55, glyph: false, hops: [t - lt + 1.2] })
      hearts(x, t, 680, 900, t - lt + 0.9, { n: 8, life: 2.2, spread: 380, cell: 8, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
