// r2t0331: star_talk, SOLO, "Group chat Taurus | be like." (~51 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way: nine group-chat moments, each the most extreme (and lovable) Taurus version. Ending: lesson.
//   0.0–3.6    "Group chat Taurus | *be like.*"  One big Taurus pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              muted the chat, read every message · silent for a week, back for pizza · a nine-minute voice note
//              · left on read, replied next Tuesday · made a poll, stay in won (1–0) · group compatibility test: matched
//              with the couch · the only photos they send: their dinner · renamed the chat "snack committee"
//              · same profile pic since forever
//  37.8        "Slow replies. | *Loyal forever.*"  Taurus comes back, big.
//  41.0        LESSON UNLOCKED: "Their replies are slow. | Their *love* isn't."  STATUS: LOYAL
//  46.9        "Want a fast reply? | Say *“dessert.”*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const GREEN = '#5fd068', PAPER = '#fff4e2'

// ── props
const PIZZA = [
  'CCCCCCCCCCCCC',
  'CYYYYYYYYYYYC',
  '.YRYYYYYRYYY.',
  '.YYYYRYYYYY..',
  '..YYYYYYRY...',
  '..YRYYYYYY...',
  '...YYYRYY....',
  '...YYYYY.....',
  '....YRYY.....',
  '....YYY......',
  '.....Y.......',
]
const PIZZA_C = { C: '#c98f5a', Y: '#ffd23a', R: '#e23d4e' }
const COUCH = [
  '..PPPPPPPPPPPP..',
  '.PPPPPPPPPPPPPP.',
  '.PPPPPPPPPPPPPP.',
  'AAPPPPPPPPPPPPAA',
  'AAppppppPpppppAA',
  'AAppppppPpppppAA',
  'AAAAAAAAAAAAAAAA',
  'AAAAAAAAAAAAAAAA',
  '.W............W.',
]
const COUCH_C = { P: '#b78bff', p: '#d9c2ff', A: '#8a5ad8', W: '#5a3a2a' }
const COOKIE = [
  '..CCCC..',
  '.CCKCCC.',
  'CCCCCKCC',
  'CKCCCCCC',
  'CCCCKCCC',
  '.CKCCCC.',
  '..CCCC..',
]
const COOKIE_C = { C: '#e0a85a', K: '#5a3a2a' }

// a phone; body(x) draws inside it in local coords (screen ≈ −120…120 × −180…180)
function phone(x, cx, cy, k, body, { rot = 0.04, w = 280, h = 420 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 12, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 10, -h / 2 - 10, w + 20, h + 20)
  x.fillStyle = '#2a2350'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#140c30'; x.fillRect(-w / 2 + 14, -h / 2 + 30, w - 28, h - 60)
  x.fillStyle = '#6b62a8'; x.fillRect(-30, h / 2 - 20, 60, 8)
  x.save(); x.beginPath(); x.rect(-w / 2 + 14, -h / 2 + 30, w - 28, h - 60); x.clip(); body(x); x.restore()
  x.restore()
}
// grey chat lines (other people talking)
function chatLines(x, n, y0, off = 0) {
  for (let i = 0; i < n; i++) {
    const y = y0 + i * 44 - off, left = i % 2 === 0
    x.fillStyle = left ? '#3a3270' : '#4a3f8a'
    const w = 90 + ((i * 37) % 70)
    x.fillRect(left ? -110 : 110 - w, y, w, 28)
  }
}
// a voice-note bubble with a growing waveform
function voiceNote(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const w = 340, h = 110
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = MINT; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-140, -24); x.lineTo(-140, 24); x.lineTo(-104, 0); x.fill()
  const n = 20
  for (let i = 0; i < n; i++) {
    const a = 10 + 30 * Math.abs(Math.sin(i * 1.7 + lt * 6)) * (i / n < clamp(lt / 1.2) ? 1 : 0.25)
    x.fillRect(-86 + i * 12, -a / 2, 7, a)
  }
  x.restore()
}
// a poll card with two options
function poll(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.03); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -150, 324, 316)
  x.fillStyle = INK; x.fillRect(-166, -166, 332, 320)
  x.fillStyle = PAPER; x.fillRect(-158, -158, 316, 304)
  x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('POLL: TONIGHT?', 0, -116)
  const v = clamp((lt - 0.7) / 0.6)
  const rows = [['GO OUT', 0, '#ffb3c6'], ['STAY IN', v, GREEN]]
  rows.forEach(([name, f, col], i) => {
    const y = -40 + i * 100
    x.fillStyle = '#e4d9c4'; x.fillRect(-130, y, 260, 64)
    x.fillStyle = col; x.fillRect(-130, y, 260 * f, 64)
    x.fillStyle = INK; x.textAlign = 'left'; x.font = `800 30px ${INTER}`; x.fillText(name, -112, y + 34)
    x.textAlign = 'right'; x.font = `700 30px ${MONO}`; x.fillText(String(i === 1 && v > 0.5 ? 1 : 0), 114, y + 34)
  })
  x.restore()
}
// a chat header card whose name changes
function header(x, cx, cy, k, name) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.font = `800 36px ${INTER}`
  const w = Math.max(300, x.measureText(name).width + 70), h = 120
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = '#2a2350'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(name, 0, -12)
  x.fillStyle = '#9a90d0'; x.font = `700 22px ${MONO}`; x.fillText('6 MEMBERS', 0, 30)
  x.restore()
}
// a plate of pasta (photo thumbnail)
function plate(x, cx, cy, s) {
  x.fillStyle = '#ffe7a8'; x.fillRect(cx - s / 2, cy - s / 2, s, s)
  x.fillStyle = '#f4f0ff'; x.beginPath(); x.arc(cx, cy, s * 0.38, 0, Math.PI * 2); x.fill()
  x.strokeStyle = INK; x.lineWidth = 3; x.stroke()
  x.fillStyle = '#f2c75c'; x.beginPath(); x.arc(cx, cy, s * 0.24, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#e23d4e'; x.fillRect(cx - s * 0.08, cy - s * 0.1, s * 0.12, s * 0.12); x.fillRect(cx + s * 0.04, cy + s * 0.02, s * 0.1, s * 0.1)
}

const S = { star: { x: -170 } }
const CAMEOS = [
  { sign: 'taurus', cap: 'Muted the chat. | Read *every message.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], ...S,
    front(x, t, lt, P) {
      const off = (lt * 90) % 44
      phone(x, 790, 920, pop01(t, P.t0 + 0.2, 0.35, 2), x => chatLines(x, 10, -170, off))
      label(x, 790, 650, 'CHAT: MUTED', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      const n = Math.round(lerp(99, 0, clamp((lt - 0.8) / 1.2)))
      label(x, 790, 1160, n > 0 ? `UNREAD: ${n}` : 'UNREAD: 0', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 34, bg: n > 0 ? GOLD : MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Silent for a week. | Back for *pizza.*', mood: lt => lt > 1.3 ? 'heart' : 'sleepy', look: [1, 0], hops: [1.35], ...S,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'hello??', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 36, col: LAV, tail: 'br' })
      bubble(x, 790, 780, 'pizza tonight?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, col: LAV, tail: 'br' })
      drawBits(x, PIZZA, PIZZA_C, 790, 980, 16 * pop01(t, P.t0 + 1.1, 0.3, 2), { rot: 0.1 })
      bubble(x, 560, 640, 'i’m in.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Sent a voice note. | *Nine minutes* long.', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [1, 0], ...S,
    front(x, t, lt, P) {
      voiceNote(x, 770, 900, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      const s = Math.floor(clamp((lt - 0.3) / 1.6) * 540)
      label(x, 790, 720, `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`, pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 46, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1090, 'so anyway…', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Left you on read. | Replied *next Tuesday.*', mood: lt => lt > 1.7 ? 'happy' : 'sleepy', look: [1, 0], hops: [1.75], ...S,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'dinner friday?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, col: LAV, tail: 'br' })
      label(x, 860, 770, 'SEEN', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 24, bg: BONE, rot: 0, font: MONO, weight: 700 })
      const days = ['FRI', 'SAT', 'SUN', 'MON', 'TUE']
      const d = days[Math.min(4, Math.floor(clamp((lt - 0.6) / 1.1) * 5))]
      label(x, 790, 900, `TODAY: ${d}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 40, bg: d === 'TUE' ? MINT : GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1070, 'sure.', pop01(t, P.t0 + 1.75, 0.25, 2.2), { size: 46, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Made a poll. | *Stay in* won.', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], hops: [1.25], ...S,
    front(x, t, lt, P) {
      poll(x, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1150, 'VOTES: JUST TAURUS', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: PINK, rot: 0.04 })
      sparkles(x, t, 790, 960, P.t0 + 1.3, 6, 170, 0.4)
    } },
  { sign: 'taurus', cap: 'Group compatibility test? | Matched *the couch.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], ...S,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 660, 'BEST MATCH:', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      drawBits(x, COUCH, COUCH_C, 790, 900, 17 * pop01(t, P.t0 + 0.8, 0.35, 2))
      label(x, 790, 1100, 'COUCH · PERFECT', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04 })
      hearts(x, t, 790, 860, P.t0 + 1.4, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 6 })
    } },
  { sign: 'taurus', cap: 'Only photos they send? | *Their dinner.*', mood: 'sparkle', look: [1, 0], hops: [1.2], ...S,
    front(x, t, lt, P) {
      phone(x, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), x => {
        const n = Math.min(4, 1 + Math.floor(Math.max(0, lt - 0.4) / 0.35))
        for (let i = 0; i < n; i++) plate(x, i % 2 ? 50 : -50, -110 + Math.floor(i / 2) * 140 + 30, 110)
      })
      label(x, 790, 1160, 'DAILY UPDATE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'taurus', cap: 'Renamed the chat | *“snack committee.”*', mood: lt => lt > 1.1 ? 'wink' : 'happy', look: [1, 0], hops: [1.1], ...S,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      header(x, 790, 720, k, lt > 1.0 ? 'SNACK COMMITTEE' : 'THE GROUP')
      if (lt > 1.0) sparkles(x, t, 790, 720, P.t0 + 1.05, 6, 180, 0.2)
      label(x, 790, 860, 'TAURUS RENAMED IT', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 28, bg: BONE, rot: 0, font: MONO, weight: 700 })
      drawBits(x, COOKIE, COOKIE_C, 790, 1030, 18 * pop01(t, P.t0 + 1.3, 0.3, 2), { rot: -0.1 })
    } },
  { sign: 'taurus', cap: 'Same profile pic | *since forever.*', mood: lt => lt > 1.5 ? 'wink' : 'happy', look: [1, 0], ...S,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 830); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 128, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#d8c79a'; x.beginPath(); x.arc(0, 0, 118, 0, Math.PI * 2); x.fill()
        x.restore()
        x.save(); x.globalAlpha = 0.85; signChar(x, t, 'taurus', 790, 840, 170 * k, { mood: 'happy', seed: 31, glyph: false, glow: 0.3 }); x.restore()
      }
      bubble(x, 790, 620, 'new pic??', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, col: LAV, tail: 'br' })
      label(x, 790, 1040, 'NO.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 50, bg: GOLD, rot: -0.05 })
    } },
]

const F = makeFilm({
  id: 'r2t0331', key: 'C', accent: GREEN, solo: 'taurus', ending: 'lesson',
  title: 'Group chat Taurus | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Slow replies. | *Loyal forever.*', mood: 'heart' },
  lesson: { text: 'Their replies are slow. | Their *love* isn’t.', chip: 'STATUS: LOYAL' },
  last: {
    text: 'Want a fast reply? | Say *“dessert.”*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.4, { n: 8, life: 2.0, spread: 600, cell: 8, seed: 4 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
