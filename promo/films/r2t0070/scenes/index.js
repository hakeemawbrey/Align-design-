// r2t0070: star_talk, SOLO, "Capricorns when they're mad | be like." (~45 s vertical, signs3kit social cut, music: lofi · F)
// The whole film is one sign (makeFilm solo mode, 9 cards). Ending: callback.
//   0.0–3.6    "Mad Capricorns | *be like.*" (the batch topic, trimmed to fit two lines)  One big Capricorn pops in, then the cards start.
//   3.6–37.8   nine mad-Capricorn moments (3.8 s each):
//              mad, so they started a business (LLC: FILED) · replies "Noted." (ROOM TEMP: ARCTIC) · a spreadsheet
//              of your mistakes (TAB 3 OF 7) · booked a meeting to discuss it · went to the gym, lifted the whole gym
//              · "I'm fine." (answering emails at 3 a.m.) · read your chart, found the problem (YOUR MERCURY.)
//              · cleaned the kitchen aggressively · forgave you, filed it under "pending"
//  37.8        "Silent. | *Scary productive.*"  The big Capricorn is back.
//  41.2        CALLBACK: "That business? | *Turning a profit.*"  The shop sign comes back, a chart going up.
import { clamp, prog, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', SAGE = '#7fe0c0', ICE = '#cfe8ff', S = 'capricorn'

// ── props
const BARBELL = [
  'WW..............WW',
  'WWW............WWW',
  'WWWBBBBBBBBBBBBWWW',
  'WWW............WWW',
  'WW..............WW',
]
const BARBELL_C = { W: '#2a2350', B: '#9aa5c4' }
const SPONGE = ['GGGGGGGG', 'GGGGGGGG', 'YYYYYYYY', 'YYYYYYYY', 'YYYYYYYY']
const SPONGE_C = { G: '#5fd068', Y: GOLD }
const ICICLES = ['IIIIIIIIIIIIIIIIIIII', '.I.I.II.I.I.II.I.I.I', '.I...I..I.I..I...I..', '.....I....I.........']

function shopSign(x, t, cx, cy, k, txt = 'CAP & CO.') {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.03 + 0.03 * Math.sin(t * 2)); x.scale(k, k)
  x.strokeStyle = INK; x.lineWidth = 6; x.beginPath(); x.moveTo(-110, -150); x.lineTo(-110, -70); x.moveTo(110, -150); x.lineTo(110, -70); x.stroke()
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-170, -62, 352, 140)
  x.fillStyle = INK; x.fillRect(-180, -74, 360, 148); x.fillStyle = '#2a3d6a'; x.fillRect(-172, -66, 344, 132)
  x.fillStyle = GOLD; x.font = `800 46px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, -10)
  x.fillStyle = CREAM; x.font = `700 20px ${MONO}`; x.fillText('EST. TODAY, 4:12 PM', 0, 38)
  x.restore()
}
function sheet(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-160, -160, 336, 336)
  x.fillStyle = INK; x.fillRect(-170, -170, 340, 340); x.fillStyle = CREAM; x.fillRect(-162, -162, 324, 324)
  x.fillStyle = '#5fd068'; x.fillRect(-162, -162, 324, 44)
  x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('MISTAKES.xls', -146, -140)
  x.strokeStyle = '#b9b0a0'; x.lineWidth = 2
  for (let r = 0; r < 6; r++) { x.beginPath(); x.moveTo(-162, -110 + r * 44); x.lineTo(162, -110 + r * 44); x.stroke() }
  x.beginPath(); x.moveTo(-60, -118); x.lineTo(-60, 162); x.moveTo(60, -118); x.lineTo(60, 162); x.stroke()
  const rows = [['Tue', 'late', '-2'], ['Wed', 'said “k”', '-5'], ['Thu', 'my fries', '-9'], ['Fri', 'the dog?', '-3'], ['Sat', 'tone', '-4']]
  x.font = `700 20px ${INTER}`
  rows.forEach((r, i) => { if (lt < 0.3 + i * 0.22) return; const y = -88 + i * 44; x.fillStyle = INK; x.fillText(r[0], -150, y); x.fillText(r[1], -50, y); x.fillStyle = RED; x.fillText(r[2], 80, y) })
  x.restore()
}
function invite(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -130, 316, 276)
  x.fillStyle = INK; x.fillRect(-160, -140, 320, 280); x.fillStyle = CREAM; x.fillRect(-152, -132, 304, 264)
  x.fillStyle = RED; x.fillRect(-152, -132, 304, 50)
  x.fillStyle = CREAM; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MEETING INVITE', 0, -106)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.fillText('RE: the thing', 0, -40)
  x.font = `700 24px ${INTER}`; x.fillText('Mon 8:00 AM', 0, 6); x.fillText('slides: 14', 0, 46)
  x.fillStyle = '#5fd068'; x.fillRect(-120, 78, 110, 36); x.fillStyle = '#9aa5c4'; x.fillRect(10, 78, 110, 36)
  x.fillStyle = INK; x.font = `800 20px ${INTER}`; x.fillText('accept', -65, 97); x.fillText('accept', 65, 97)
  x.restore()
}
function laptop(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -130, 340, 230); x.fillStyle = '#9aa5c4'; x.fillRect(-162, -122, 324, 214)
  x.fillStyle = '#140c30'; x.fillRect(-150, -110, 300, 190)
  x.fillStyle = INK; x.fillRect(-200, 100, 400, 30); x.fillStyle = '#9aa5c4'; x.fillRect(-194, 104, 388, 20)
  x.fillStyle = SAGE; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('INBOX', 0, -70); x.font = `800 72px ${INTER}`; x.fillStyle = CREAM
  x.fillText(String(Math.max(0, 212 - Math.floor(lt * 150))), 0, 0)
  x.restore()
}
function chart(x, t, cx, cy, r, k, ring) {
  if (k <= 0.01) return
  const W = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 6, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = W[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.6, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.fillRect(40, -50, 18, 18); x.fillRect(-60, 20, 18, 18); x.fillRect(-10, 50, 18, 18)
  if (ring > 0.01) { x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.arc(49, -41, 40 * ring, 0, Math.PI * 2 * ring); x.stroke() }
  x.restore()
}
function cabinet(x, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -180, 240, 360); x.fillStyle = '#9aa5c4'; x.fillRect(-112, -172, 224, 344)
  for (let i = 0; i < 3; i++) {
    const y = -160 + i * 112, o = i === 1 ? 40 * open : 0
    x.fillStyle = INK; x.fillRect(-104 - o * 0.2, y - 4 + o * 0.1, 208 + o * 0.4, 100); x.fillStyle = '#c7cfe4'; x.fillRect(-98 - o * 0.2, y + o * 0.1, 196 + o * 0.4, 92)
    x.fillStyle = INK; x.fillRect(-30, y + 30 + o * 0.1, 60, 14)
    x.fillStyle = CREAM; x.fillRect(-60, y + 56 + o * 0.1, 120, 26)
    x.fillStyle = INK; x.font = `700 18px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(['TAXES', 'PENDING', 'GOALS'][i], 0, y + 70 + o * 0.1)
  }
  x.restore()
}
function growth(x, t, cx, cy, k, p) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -110, 300, 220); x.fillStyle = CREAM; x.fillRect(-142, -102, 284, 204)
  x.strokeStyle = '#5fd068'; x.lineWidth = 10; x.lineJoin = 'miter'; x.beginPath()
  const pts = [[-120, 70], [-60, 40], [-10, 50], [40, -10], [110, -80]]
  const n = Math.max(1, Math.floor(p * (pts.length - 1)) + 1)
  pts.slice(0, n).forEach(([a, b], i) => i ? x.lineTo(a, b) : x.moveTo(a, b)); x.stroke()
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Mad? | *Started a business.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: { x: -200, y: 40 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      shopSign(x, t, 790, 820, pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 790, 1060, 'LLC: FILED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Replies with | *“Noted.”*', mood: 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, ICICLES, { I: ICE }, 790, 530, 15 * pop01(t, P.t0 + 1.0, 0.3, 2))
      bubble(x, 790, 820, 'Noted.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 70, col: ICE, tail: 'bl' })
      label(x, 790, 1080, 'ROOM TEMP: ARCTIC', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Made a spreadsheet | *of your mistakes.*', mood: 'squint', look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), lt)
      label(x, 790, 1110, 'TAB 3 OF 7', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Booked a meeting | *to discuss it.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      invite(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1100, 'DECLINE: NOT AN OPTION', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 26, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Went to the gym. | *Lifted the whole gym.*', mood: lt => lt > 0.9 ? 'wide' : 'squint', star: { x: 0, y: 40, s: 260 }, squash: lt => lt > 0.6 && lt < 1.0 ? 0.08 : 0, hops: [1.0],
    front(x, t, lt, P, F) {
      const up = ease.outBack(prog(lt, 0.6, 1.0))
      drawBits(x, BARBELL, BARBELL_C, F.x, F.top - 30 - 60 * up, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 540, 1180, 'PERSONAL RECORD: SPITE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
      sparkles(x, t, F.x, F.top - 90, P.t0 + 1.0, 8, 200, 0.2)
    } },
  { sign: S, cap: 'Says “I’m fine.” | *Answers emails at 3 a.m.*', mood: 'squint', look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      laptop(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 650, '3:07 AM', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 36, bg: '#2a3d6a', color: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1100, 'TOTALLY FINE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Read your chart. | *Found the problem.*', mood: lt => lt > 1.2 ? 'eyeroll' : 'squint', look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      chart(x, t, 790, 860, 140, pop01(t, P.t0 + 0.2, 0.3, 2), ease.outCubic(prog(lt, 0.9, 1.3)))
      label(x, 790, 1110, 'YOUR MERCURY.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Cleaned the kitchen. | *Aggressively.*', mood: 'squint', look: [1, 1], star: { x: -200 }, hops: [0.6, 0.9, 1.2],
    front(x, t, lt, P) {
      const sx = Math.sin(t * 18) * 60
      drawBits(x, SPONGE, SPONGE_C, 790 + sx, 920, 28 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 * Math.sin(t * 18) })
      sparkles(x, t, 790, 920, P.t0 + 0.6, 8, 170, 0.3, [CREAM, SKYB, MINT])
      sparkles(x, t, 790, 920, P.t0 + 1.2, 8, 190, 1.1, [CREAM, SKYB, MINT])
      label(x, 790, 680, 'GROUT: TERRIFIED', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 32, bg: SAGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Forgave you. | *Filed it under “pending.”*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      cabinet(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), ease.outCubic(prog(lt, 0.7, 1.1)))
      label(x, 600, 640, 'REVIEW: Q3', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0070', key: 'F', accent: SAGE, solo: S, ending: 'callback',
  title: 'Mad Capricorns | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Silent. | *Scary productive.*', mood: 'squint' },
  last: {
    text: 'That business? | *Turning a profit.*',
    draw(x, t, lt) {
      const t0 = t - lt
      shopSign(x, t, 540, 1000, 1.15 * pop01(t, t0 + 0.4, 0.35, 2), 'CAP & CO.')
      growth(x, t, 440, 1300, 1.2 * pop01(t, t0 + 0.8, 0.35, 2), clamp((lt - 1.0) / 1.2))
      const k = pop01(t, t0 + 1.0, 0.4, 1.8)
      if (k > 0.01) signChar(x, t, S, 780, 1280, 230 * k, { mood: 'sparkle', look: [-1, 0], seed: 40, hops: [t0 + 2.2], glyph: false })
      sparkles(x, t, 470, 1240, t0 + 2.2, 8, 150, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
