// r2a0092: star_advice, ADVICE SOLO, "How to cheer up | a Gemini." (~51 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Gemini truth + a warm tip, one gag each.
//   0.0–3.6    "How to cheer up | *a Gemini.*"  One big Gemini pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              send a weird fact (octopus hearts) · follow every tangent · plan something new (mini golf)
//              · listen to the whole voice note (9:42) · don't make them pick: get both scoops · both moods showed up: hug both
//              · ask about their birth chart (clear your evening) · try a hobby together, no need to finish (half a scarf)
//              · just be there, they'll do the talking
//  37.8        "Curious mind. | *Big heart.*"  Gemini comes back, big.
//  41.0        LESSON UNLOCKED: "Gemini don’t need fixing. | Just *good company.*"  MOOD: LIFTED
//  46.9        "The voice note? | *Part two incoming.*"  The voice note comes back, longer.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const YEL = '#ffd23a', RED = '#e23d4e', CREAM = '#fff4e2', WOOD = '#c98f2a', BROWN = '#8a4a2e', GRASS = '#5fd068'
const S = 'gemini'

// ── props
const OCTO = [
  '...PPPPP...',
  '..PPPPPPP..',
  '.PPWKPWKPP.',
  '.PPPPPPPPP.',
  '..PPPPPPP..',
  '.P.P.P.P.P.',
  'P..P.P.P..P',
  '.P.P..P.P..',
]
const OCTO_C = { P: '#ff8fb1', W: '#ffffff', K: INK }
const FLAG = [
  'KRRRR',
  'KRRRR',
  'KRRR.',
  'K....',
  'K....',
  'K....',
  'K....',
  'K....',
  'K....',
]
const FLAG_C = { K: '#2a2350', R: RED }
const CONE = [
  '.AAAA.',
  'AAAAAA',
  'AAAAAA',
  'CCCCCC',
  '.CCCC.',
  '.CCCC.',
  '..CC..',
  '..CC..',
]
const SCARF = [
  'RRRRRRRRRRRR',
  'RWRRWRRWRRWR',
  'RRRRRRRRRRRR',
  'RWRRWRRWRRWR',
  'RRRRRR......',
]
const SCARF_C = { R: SKYB, W: CREAM }
const BENCH = [
  'WWWWWWWWWWWWWW',
  'WWWWWWWWWWWWWW',
  '..............',
  'WWWWWWWWWWWWWW',
  '.K..........K.',
  '.K..........K.',
]
const BENCH_C = { W: WOOD, K: '#2a2350' }

/** a voice-note pill: play button, waveform, a length */
function voiceNote(x, cx, cy, k, t, { len = '9:42', w = 360, played = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.03); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -36, w, 84)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -46, w + 12, 92); x.fillStyle = YEL; x.fillRect(-w / 2, -40, w, 80)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-w / 2 + 26, -18); x.lineTo(-w / 2 + 26, 18); x.lineTo(-w / 2 + 56, 0); x.closePath(); x.fill()
  const bars = Math.floor((w - 170) / 12)
  for (let i = 0; i < bars; i++) {
    const h = 10 + 22 * Math.abs(Math.sin(i * 1.7 + 0.3) * Math.cos(i * 0.6))
    x.fillStyle = i / bars < played ? RED : '#6b62a8'; x.fillRect(-w / 2 + 76 + i * 12, -h / 2, 7, h)
  }
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'right'; x.textBaseline = 'middle'; x.fillText(len, w / 2 - 16, 2)
  x.restore()
}
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.4, 2.6, 4.5, 1.2]) x.fillRect(Math.cos(a) * r * 0.45 - 7, Math.sin(a) * r * 0.45 - 7, 14, 14)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Send them a weird fact. | *Instant sunshine.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 790, 640, 'octopuses have | three hearts', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, col: PINK, tail: 'bl' })
      drawBits(x, OCTO, OCTO_C, 790, 900 + 12 * Math.sin(t * 3), 20 * pop01(t, P.t0 + 0.7, 0.35, 2))
      bubble(x, 800, 1110, 'TELL ME MORE', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, col: YEL, tail: 'bl' })
      sparkles(x, t, 800, 900, P.t0 + 1.2, 6, 160, 0.3)
    } },
  { sign: S, cap: 'Let them go on tangents. | *Follow every one.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const STOPS = [['SO, MY DAY—', 760, 620, GOLD], ['ANTS?', 900, 760, MINT], ['ROMAN ROADS', 690, 880, SKYB], ['…MY DAY!', 840, 1060, PINK]]
      const p = clamp((lt - 0.2) / 1.6)
      x.save(); x.strokeStyle = BONE; x.lineWidth = 6; x.setLineDash([14, 12]); x.beginPath()
      STOPS.forEach(([, sx, sy], i) => { if (i / 3 <= p + 0.01) (i ? x.lineTo(sx, sy) : x.moveTo(sx, sy)) }); x.stroke(); x.restore()
      STOPS.forEach(([s, sx, sy, c], i) => label(x, sx, sy, s, pop01(t, P.t0 + 0.25 + i * 0.5, 0.3, 2.4), { size: 30, bg: c, rot: i % 2 ? 0.05 : -0.05, font: MONO, weight: 700 }))
    } },
  { sign: S, cap: 'Plan something new. | *Anything. Mini golf.*', mood: lt => lt > 1.5 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -200, y: -30 }, hops: [1.6],
    back(x, t, lt, P) {
      x.fillStyle = INK; x.fillRect(110, 1110, 860, 110); x.fillStyle = GRASS; x.fillRect(110, 1116, 860, 104)
      x.fillStyle = INK; x.beginPath(); x.ellipse(860, 1140, 34, 12, 0, 0, Math.PI * 2); x.fill()
    },
    front(x, t, lt, P) {
      drawBits(x, FLAG, FLAG_C, 870, 1060, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 * Math.sin(t * 4) })
      const p = ease.outCubic(prog(lt, 0.5, 1.4)), bx = lerp(560, 860, p), by = 1150 - Math.sin(Math.PI * p) * 120 - 8 * p
      if (lt > 0.4 && p < 1) { x.fillStyle = INK; x.beginPath(); x.arc(bx, by, 17, 0, Math.PI * 2); x.fill(); x.fillStyle = '#fff'; x.beginPath(); x.arc(bx, by, 12, 0, Math.PI * 2); x.fill() }
      label(x, 790, 720, 'HOLE IN ONE!', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: YEL, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 860, 1110, P.t0 + 1.5, 8, 120, 0.2)
    } },
  { sign: S, cap: 'Listen to the voice note. | *All nine minutes.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      voiceNote(x, 750, 760, pop01(t, P.t0 + 0.2, 0.3, 2), t, { played: prog(lt, 0.5, 2.3) })
      label(x, 790, 920, 'LISTENED: ALL OF IT', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1080, 'you’re the best', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, col: YEL, tail: 'bl' })
    } },
  { sign: S, cap: 'Don’t make them pick one. | *Get both scoops.*', mood: lt => lt > 1.1 ? 'heart' : 'squint', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const both = lt > 1.1
      drawBits(x, CONE, { A: PINK, C: WOOD }, both ? 720 : 740, 860, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.08 })
      drawBits(x, CONE, { A: '#7dffb0', C: WOOD }, both ? 870 : 860, 860, 20 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: 0.08 })
      if (!both) bubble(x, 800, 640, 'mint or | strawberry?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 34, tail: 'bl' })
      else label(x, 800, 640, 'BOTH. OBVIOUSLY.', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 34, bg: YEL, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 795, 820, P.t0 + 1.5, 6, 150, 0.4)
    } },
  { sign: S, cap: 'Both moods showed up? | *Hug both.*', mood: 'happy', hideStar: true, star: { x: 0, y: 40, s: 230 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) {
        signChar(x, t, S, 260, 900, 170 * k, { mood: lt > 1.4 ? 'happy' : 'sleepy', look: [1, 0], seed: 21, glyph: false })
        signChar(x, t, S, 820, 900, 170 * k, { mood: lt > 1.4 ? 'heart' : 'sparkle', look: [-1, 0], seed: 22, glyph: false, hops: [P.t0 + 0.8, P.t0 + 1.2] })
      }
      label(x, 260, 720, 'COZY', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 32, bg: LAV, rot: -0.05, font: MONO, weight: 700 })
      label(x, 820, 720, 'CHAOS', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 32, bg: YEL, rot: 0.05, font: MONO, weight: 700 })
      hearts(x, t, 540, 820, P.t0 + 1.5, { n: 6, life: 1.6, spread: 500, cell: 7, seed: 6 })
    } },
  { sign: S, cap: 'Ask about their chart. | *Clear your evening.*', mood: lt => lt > 0.8 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      chart(x, 790, 790, 130, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      bubble(x, 790, 1000, 'ok so my moon—', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 34, col: YEL, tail: 'bl' })
      label(x, 790, 1140, 'TALK TIME: 3 HRS', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Try a hobby together. | *Finishing is optional.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, SCARF, SCARF_C, 790, 830, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.04 })
      x.fillStyle = INK; x.fillRect(902, 860, 10, 120); x.fillRect(930, 870, 10, 120)
      label(x, 790, 700, 'SCARF: 40% DONE', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1080, 'FUN: 100%', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Just be there. | *They’ll do the talking.*', mood: 'sparkle', star: { x: -150, y: 0, s: 250 }, hops: [0.8, 1.6],
    back(x, t, lt, P) {
      drawBits(x, BENCH, BENCH_C, 540, 1080, 40 * pop01(t, P.t0 + 0.1, 0.3, 2))
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 720, 920, 200 * k, { mood: lt > 1.4 ? 'happy' : 'neutral', look: [-1, 0], seed: 23, glyph: false })
      const T = ['and THEN—', 'wait, also—', 'ok last thing—']
      bubble(x, 420, 640, T[Math.min(2, Math.floor(Math.max(0, lt - 0.4) / 0.6))], pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, col: YEL, tail: 'bc' })
      label(x, 760, 700, 'NODS: 214', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0092', key: 'F', accent: YEL, solo: S, ending: 'lesson',
  title: 'How to cheer up | *a Gemini.*',
  cameos: CAMEOS,
  group: { cap: 'Curious mind. | *Big heart.*', mood: 'sparkle' },
  lesson: { text: 'Gemini don’t need fixing. | Just *good company.*', chip: 'MOOD: LIFTED' },
  last: {
    text: 'The voice note? | *Part two incoming.*',
    draw(x, t, lt) {
      const t0 = t - lt
      voiceNote(x, 540, 1300, pop01(t, t0 + 0.6, 0.35, 2), t, { len: '14:07', w: 460 })
      label(x, 540, 1440, 'PART 2', pop01(t, t0 + 1.3, 0.3, 2.4), { size: 40, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
