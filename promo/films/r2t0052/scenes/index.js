// r2t0052: star_talk, SOLO, "Virgos keeping | a secret be like." (~51 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole way through (makeFilm solo mode, 9 cards): a Virgo holding in a secret, pushed to the extreme.
//   0.0–3.6    "Virgos keeping | a secret *be like.*"  One big Virgo pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              got told a secret, filed it: CLASSIFIED · asked “what’s new?”, ten minutes on the weather · holding it in,
//              pressure gauge in the red · changed the subject to your posture · stress-organised the fridge, twice
//              · updated their profile bio: “no comment.” · almost slipped, issued a correction · planning the surprise
//              party in an earpiece · secret finally out? twelve-hour nap
//  37.8        "Vault-level trust. | *Twitchy eye.*"  Virgo comes back, big.
//  41.0        LESSON: "Tell a Virgo anything. | It’s *safe with them.*"  STATUS: SEALED
//  46.9        "Your secret? | *Filed. Forever.*"  The CLASSIFIED folder comes back.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ROSE = '#ef5c94', CREAM = '#fff4e2', RED = '#e23d4e', KRAFT = '#e0b25a', GREEN = '#5fd068'
const S = 'virgo'

// ── props
const CLOUD = [
  '....WWW.....',
  '..WWWWWWW...',
  '.WWWWWWWWWW.',
  'WWWWWWWWWWWW',
  '.WWWWWWWWWW.',
  '..D..D..D...',
  '.D..D..D....',
]
const CLOUD_C = { W: '#e8ecff', D: SKYB }
const RULER = ['YY', 'KY', 'YY', 'KY', 'YY', 'KY', 'YY', 'KY', 'YY', 'KY', 'YY', 'KY', 'YY', 'KY']
const RULER_C = { Y: GOLD, K: INK }

function card(x, cx, cy, w, h, k, { rot = 0, bg = CREAM, edge = INK } = {}) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = edge; x.fillRect(-w / 2 - 7, -h / 2 - 7, w + 14, h + 14)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}
// a manila folder; the CLASSIFIED stamp thumps on at `st`
function folder(x, cx, cy, k, lt, { st = 1.0, s = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k * s, k * s)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -96, 320, 240)
  x.fillStyle = INK; x.fillRect(-166, -136, 120, 50); x.fillRect(-166, -110, 332, 250)
  x.fillStyle = KRAFT; x.fillRect(-158, -128, 104, 42); x.fillRect(-158, -102, 316, 234)
  x.fillStyle = '#c99a40'; x.fillRect(-158, -102, 316, 10)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('FILE 001', -140, -60)
  const p = prog(lt, st, st + 0.18)
  if (p > 0) {
    const sc = lerp(1.8, 1, ease.outCubic(p))
    x.save(); x.translate(0, 30); x.rotate(-0.16); x.scale(sc, sc); x.globalAlpha = clamp(p * 2)
    x.strokeStyle = RED; x.lineWidth = 6; x.strokeRect(-130, -34, 260, 68)
    x.fillStyle = RED; x.font = `700 36px ${MONO}`; x.textAlign = 'center'; x.fillText('CLASSIFIED', 0, 2)
    x.restore()
  }
  x.restore()
}
// a pressure gauge whose needle creeps into the red
function gauge(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 160, Math.PI, 0); x.lineTo(160, 40); x.lineTo(-160, 40); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 146, Math.PI, 0); x.lineTo(146, 28); x.lineTo(-146, 28); x.fill()
  const zone = (a, b, c) => { x.strokeStyle = c; x.lineWidth = 26; x.beginPath(); x.arc(0, 0, 118, Math.PI + a * Math.PI, Math.PI + b * Math.PI); x.stroke() }
  zone(0, 0.45, GREEN); zone(0.45, 0.72, GOLD); zone(0.72, 1, RED)
  const v = clamp(ease.inOutCubic(prog(lt, 0.3, 1.6)) * 0.93 + (lt > 1.6 ? 0.03 * Math.sin(t * 40) : 0))
  x.save(); x.rotate(-Math.PI / 2 + v * Math.PI); x.fillStyle = INK; x.fillRect(-6, -128, 12, 128); x.restore()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 18, 0, Math.PI * 2); x.fill()
  x.restore()
}
// an open fridge with very neat rows
function fridge(x, t, cx, cy, k, lt) {
  if (!card(x, cx, cy, 280, 420, k, { rot: 0.03, bg: '#e8ecff' })) return
  x.fillStyle = '#c8d0f0'; for (let r = 0; r < 3; r++) x.fillRect(-130, -110 + r * 120, 260, 8)
  const COLS = [ROSE, MINT, GOLD, SKYB, LAV]
  const n = Math.floor(clamp((lt - 0.3) / 1.2) * 15)
  for (let i = 0; i < 15; i++) {
    const r = Math.floor(i / 5), c = i % 5, px = -104 + c * 52, py = -146 + r * 120
    const neat = i < n
    x.save(); x.translate(px + (neat ? 0 : Math.sin(i * 3.1) * 8), py); x.rotate(neat ? 0 : Math.sin(i * 1.7) * 0.4)
    x.fillStyle = INK; x.fillRect(-20, -30, 40, 64); x.fillStyle = COLS[c]; x.fillRect(-15, -25, 30, 54)
    x.fillStyle = CREAM; x.fillRect(-15, -6, 30, 14)
    x.restore()
  }
  x.restore()
}
// a dating-style profile card with a very short bio
function profile(x, t, cx, cy, k, lt) {
  if (!card(x, cx, cy, 290, 400, k, { rot: 0.04, bg: '#2a2350' })) return
  x.fillStyle = '#140c30'; x.fillRect(-129, -184, 258, 220)
  signChar(x, t, S, 0, -70, 170, { mood: 'squint', seed: 71, glyph: false, glow: 0.8 })
  x.fillStyle = ROSE; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♍︎ VIRGO', 0, 72)
  x.fillStyle = INK; x.fillRect(-120, 104, 240, 66); x.fillStyle = CREAM; x.fillRect(-114, 110, 228, 54)
  x.fillStyle = INK; x.font = `800 26px ${INTER}`
  const full = 'bio: no comment.', n = Math.floor(clamp((lt - 0.6) / 0.9) * full.length)
  x.fillText(full.slice(0, n), 0, 138)
  x.restore()
}
// a memo with a correction stamp
function memo(x, cx, cy, k, lt) {
  if (!card(x, cx, cy, 320, 330, k, { rot: -0.04 })) return
  x.fillStyle = ROSE; x.fillRect(-160, -165, 320, 56)
  x.fillStyle = CREAM; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MEMO', 0, -137)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.fillText('Re: earlier', 0, -64)
  x.font = `800 28px ${INTER}`; x.fillText('I said nothing.', 0, -6); x.fillText('Nothing was said.', 0, 38)
  if (lt > 1.4) { x.save(); x.translate(60, 110); x.rotate(-0.15); x.strokeStyle = RED; x.lineWidth = 5; x.strokeRect(-100, -28, 200, 56); x.fillStyle = RED; x.font = `700 28px ${MONO}`; x.fillText('OFFICIAL', 0, 2); x.restore() }
  x.restore()
}
// a party clipboard
function clipboard(x, cx, cy, k, lt) {
  if (!card(x, cx, cy, 290, 380, k, { rot: 0.04, bg: '#8a4a2e' })) return
  x.fillStyle = CREAM; x.fillRect(-122, -150, 244, 310)
  x.fillStyle = '#c9c9d8'; x.fillRect(-50, -196, 100, 50); x.fillStyle = INK; x.fillRect(-50, -196, 100, 6)
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('OP: SURPRISE', 0, -116)
  const L = ['cake', 'balloons', 'lights off', 'act natural']
  x.font = `800 26px ${INTER}`; x.textAlign = 'left'
  L.forEach((s, i) => {
    const y = -52 + i * 54; x.fillStyle = INK; x.fillRect(-104, y - 14, 28, 28); x.fillStyle = CREAM; x.fillRect(-100, y - 10, 20, 20)
    if (lt > 0.5 + i * 0.3) { x.fillStyle = GREEN; x.fillRect(-98, y - 8, 16, 16) }
    x.fillStyle = INK; x.fillText(s, -62, y + 2)
  })
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Got told a secret. | *Filed it. Classified.*', mood: lt => lt > 1.0 ? 'squint' : 'wide', look: [1, 0], star: { x: -200 }, hops: [1.05],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      folder(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1090, 'ACCESS: NOBODY', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Asked “what’s new?” | *Ten minutes on weather.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, CLOUD, CLOUD_C, 790, 900, 22 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: Math.sin(t * 2) * 0.03 })
      bubble(x, 790, 660, 'so… the HUMIDITY', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 790, 1110, 'MINUTE 9 OF 10', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Holding it in. | *Pressure: red.*', mood: lt => lt > 1.4 ? 'squint' : 'neutral', squash: lt => lt > 1.4 ? 0.06 * Math.sin(lt * 50) : 0, look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      gauge(x, t, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      bubble(x, 790, 650, 'I’m FINE.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 1080, 'SECRET PRESSURE', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 30, bg: LAV, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Changed the subject. | *To your posture.*', mood: 'squint', look: [1, 0], star: { x: -200 }, hops: [1.0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.35, 2)
      const up = ease.outBack ? ease.outBack(prog(lt, 1.0, 1.4)) : prog(lt, 1.0, 1.4)
      if (k > 0.01) signChar(x, t, 'cancer', 760, 920, 210 * k, { mood: up > 0.5 ? 'wide' : 'sleepy', look: [-1, 0], seed: 15, glyph: false, squash: lerp(0.16, -0.06, clamp(up)) })
      drawBits(x, RULER, RULER_C, 900, 900, 18 * pop01(t, P.t0 + 0.8, 0.3, 2))
      bubble(x, 760, 640, 'SHOULDERS. BACK.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: S, cap: 'Stress-organised the fridge. | *Twice.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.5],
    front(x, t, lt, P) {
      fridge(x, t, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1110, 'ROUND 2: DONE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Updated their bio. | *“No comment.”*', mood: 'squint', look: [1, 0], star: { x: -200 }, hops: [1.6],
    front(x, t, lt, P) {
      profile(x, t, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
    } },
  { sign: S, cap: 'Almost let it slip. | *Issued a correction.*', mood: lt => lt < 0.8 ? 'wide' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [0.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      memo(x, 790, 860, pop01(t, P.t0 + 0.6, 0.3, 2), lt)
      if (lt < 0.8) bubble(x, 790, 640, 'so, about Sam—', pop01(t, P.t0 + 0.1, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: S, cap: 'Planning a surprise party? | *Wore an earpiece.*', mood: 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.2],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.4, 0.3, 2)
      if (k > 0.01) { x.save(); x.strokeStyle = INK; x.lineWidth = 10; x.beginPath(); x.arc(F.x + 70, F.cy - 40, 40 * k, -1.2, 0.9); x.stroke(); x.fillStyle = '#2a2350'; x.fillRect(F.x + 60, F.cy - 2, 26 * k, 26 * k); x.restore() }
      clipboard(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 540, 1150, 'TARGET APPROACHING', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: RED, color: CREAM, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Secret finally out? | *Twelve-hour nap.*', mood: lt => lt > 0.8 ? 'sleepy' : 'happy', star: { x: -160, y: 20 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) { x.save(); x.globalAlpha = clamp(k); x.fillStyle = INK; x.fillRect(200, 980, 400, 70); x.fillStyle = LAV; x.fillRect(206, 986, 388, 58); x.fillStyle = '#9a7ce0'; for (let i = 0; i < 6; i++) x.fillRect(220 + i * 64, 990, 30, 50); x.restore() }
      label(x, 790, 660, 'DO NOT DISTURB', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1120, 'BACK IN 12 HRS', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0052', key: 'E', accent: ROSE, solo: S, ending: 'lesson',
  title: 'Virgos keeping | a secret *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Vault-level trust. | *Twitchy eye.*', mood: 'squint' },
  lesson: { text: 'Tell a Virgo anything. | It’s *safe with them.*', chip: 'STATUS: SEALED' },
  last: {
    text: 'Your secret? | *Filed. Forever.*',
    draw(x, t, lt) { folder(x, 540, 1250, pop01(t, t - lt + 0.5, 0.35, 2), lt, { st: 1.2, s: 1.15 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
