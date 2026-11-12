// r2t0081: star_talk, BELIKE, "Homework? | Zodiacs be like." (~57 s vertical, signs3kit social cut, music: lofi · C)
//   0.0–3.6    "Homework? | Zodiacs *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one homework session per sign (3.8 s each):
//              ♈ done in four minutes, all wrong · ♉ "studied" in bed, woke up Thursday · ♊ five subjects, none finished
//              · ♋ did everyone's homework but theirs · ♌ book report → a musical · ♍ handed in three weeks early
//              · ♎ still picking a pen, due at nine · ♏ one-page essay, forty pages · ♐ left for "research", back in June
//              · ♑ did next year's too · ♒ showed their work: a birth chart · ♓ read the class poem, wept on the worksheet
//  49.2        "Nobody read | *the question.*"  The twelve fly up into a group photo.
//  52.6        callback: "Libra picked a pen. | *It's summer now.*"  The pen rack comes back, one pen chosen.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', WOOD = '#8a4a2e'

// a sheet of paper with ruled lines and an optional big mark
function paper(x, cx, cy, k, { rot = 0.05, w = 230, h = 300, mark = null, markCol = RED, title = null, lines = 6 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = CREAM; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#b9c7e6'
  for (let i = 0; i < lines; i++) x.fillRect(-w / 2 + 20, -h / 2 + 70 + i * ((h - 100) / lines), w - 40, 4)
  if (title) { x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -h / 2 + 36) }
  if (mark) { x.fillStyle = markCol; x.font = `800 ${mark.length > 4 ? 52 : 96}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(mark, 0, 30) }
  x.restore()
}
const BOOK = [
  'CCCCCCCCCC',
  'CWWWWWWWWC',
  'CWKKKKKKWC',
  'CWWWWWWWWC',
  'CWKKKKKWWC',
  'CWWWWWWWWC',
  'CCCCCCCCCC',
]
const PEN = ['C', 'C', 'C', 'C', 'C', 'C', 'C', 'K', 'W']
const BED = [
  'B............',
  'B............',
  'BPPPWWWWWWWWB',
  'BPPPWWWWWWWWB',
  'BBBBBBBBBBBBB',
  'B...........B',
]
const BED_C = { B: WOOD, P: '#fff', W: '#7aa0ff' }
const BAG = [
  '...KKKK...',
  '..K....K..',
  'OOOOOOOOOO',
  'OOOOOOOOOO',
  'OOYYYYYYOO',
  'OOYOOOOYOO',
  'OOOOOOOOOO',
  'OOOOOOOOOO',
]
const BAG_C = { K: INK, O: '#ff9a4a', Y: GOLD }
const MAP = [
  'SSSSSSSSSSSS',
  'SSGGGSSSSSSS',
  'SGGGGGSSSGGS',
  'SSGGGSSSGGGS',
  'SSSSSSSSGGGS',
  'SSSGGSSSSSSS',
  'SSGGGGSSSRSS',
  'SSSSSSSSSSSS',
]
const MAP_C = { S: SKYB, G: '#5fd068', R: RED }
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.3)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 7, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, i / 12 * Math.PI * 2, (i + 1) / 12 * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#1d4a3a'; x.beginPath(); x.arc(0, 0, r * 0.6, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.4, 2.6, 4.5]) x.fillRect(Math.cos(a) * r * 0.45 - 6, Math.sin(a) * r * 0.45 - 6, 12, 12)
  x.restore()
}
const PEN_COLS = ['#ff6b5a', '#ffd23a', '#5fd068', '#6fc3ff', '#c97bff', '#ff8fb1', '#ffb34a']
// a rack of seven pens; one hovers up as "the one" (sel: index, up: 0..1)
function penRack(x, t, cx, cy, k, sel, up = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-190, 70, 380, 34); x.fillStyle = WOOD; x.fillRect(-184, 76, 368, 22)
  PEN_COLS.forEach((c, i) => {
    const lift = i === sel ? 40 + up * 60 : 0
    drawBits(x, PEN, { C: c, K: INK, W: '#fff' }, -150 + i * 50, 30 - lift, 11, { rot: i === sel ? 0.15 * Math.sin(t * 6) : 0 })
  })
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Done in four minutes. | *All wrong.*', mood: lt => lt > 1.4 ? 'wide' : 'sparkle', star: { x: -160 }, hops: [0.4, 0.8],
    front(x, t, lt, P) {
      label(x, 790, 640, 'DONE! 4:00', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 40, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      paper(x, 790, 900, pop01(t, P.t0 + 0.6, 0.3, 2), { mark: lt > 1.3 ? '0/20' : null, title: 'MATHS' })
    } },
  { sign: 'taurus', cap: 'Studied in bed. | Woke up *Thursday.*', mood: lt => lt > 0.7 ? 'sleepy' : 'happy', star: { x: -150, y: 20 },
    back(x, t, lt, P) { drawBits(x, BED, BED_C, 400, 1010, 30 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 820); x.rotate(0.05); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-120, -130, 240, 260); x.fillStyle = CREAM; x.fillRect(-112, -122, 224, 244)
        x.fillStyle = RED; x.fillRect(-112, -122, 224, 64)
        x.fillStyle = '#fff'; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('WAS: MON', 0, -90)
        x.fillStyle = INK; x.font = `800 ${lt > 1.4 ? 54 : 64}px ${INTER}`; x.fillText(lt > 1.4 ? 'THURS' : 'MON', 0, 30)
        x.restore()
      }
      sparkles(x, t, 800, 820, P.t0 + 1.4, 6, 150, 0.2)
    } },
  { sign: 'gemini', cap: 'Started five subjects. | Finished *none.*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.8) % 2 ? 1 : -1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      const SUBJ = ['MATHS', 'FRENCH', 'HISTORY', 'BIRTH CHARTS', 'ART']
      const COLS = ['#6fc3ff', '#ff8fb1', GOLD, LAV, MINT]
      SUBJ.forEach((s, i) => {
        const k = pop01(t, P.t0 + 0.25 + i * 0.22, 0.25, 2.2)
        label(x, 770 + (i % 2 ? 30 : -20), 610 + i * 118, s + ' 10%', k, { size: 30, bg: COLS[i], rot: i % 2 ? 0.05 : -0.05, font: MONO, weight: 700 })
      })
    } },
  { sign: 'cancer', cap: 'Did everyone’s homework. | *Except theirs.*', mood: lt => lt > 1.6 ? 'wide' : 'heart', star: { x: -170 },
    front(x, t, lt, P) {
      const NAMES = ['MIA', 'SAM', 'JO', 'ME']
      NAMES.forEach((n, i) => {
        const k = pop01(t, P.t0 + 0.25 + i * 0.3, 0.3, 2)
        const y = 630 + i * 135
        label(x, 790, y, `${n} ${i < 3 ? '✓' : '✗'}`, k, { size: 44, bg: i < 3 ? MINT : PINK, rot: (i % 2 ? 0.04 : -0.04), font: MONO, weight: 700 })
      })
      sparkles(x, t, 790, 1035, P.t0 + 1.25, 6, 110, 0.3, [RED, BONE, PINK])
    } },
  { sign: 'leo', cap: 'Book report? | Leo did *a musical.*', mood: 'sparkle', star: { x: -150 }, hops: [0.8, 1.6],
    back(x, t, lt, P) {
      const k = ease.outCubic(prog(lt, 0.2, 0.5))
      if (k <= 0.01) return
      x.save(); x.globalAlpha = 0.3 * k; x.fillStyle = '#fff1b0'
      x.beginPath(); x.moveTo(350, 490); x.lineTo(430, 490); x.lineTo(590, 1180); x.lineTo(190, 1180); x.closePath(); x.fill()
      x.restore()
    },
    front(x, t, lt, P) {
      label(x, 790, 680, 'ACT ONE', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 44, bg: '#ffb34a', rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 900, 'chapter TWOOO!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, tail: 'bl' })
      if (lt > 0.6) notes(x, t, 400, 640, { n: 5, cell: 7, col: GOLD, seed: 2 })
    } },
  { sign: 'virgo', cap: 'Handed it in early. | *Three weeks* early.', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      paper(x, 790, 880, pop01(t, P.t0 + 0.25, 0.3, 2), { title: 'ESSAY (TABBED)', mark: lt > 1.0 ? 'A+' : null, markCol: '#2fc79a' })
      label(x, 790, 650, 'DUE: 3 WEEKS', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 34, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 1090, 'HANDED IN: NOW', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Still picking a pen. | It’s *due at nine.*', mood: lt => lt > 1.8 ? 'wide' : 'squint', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      penRack(x, t, 790, 900, 1.35 * pop01(t, P.t0 + 0.15, 0.3, 2), Math.floor(lt * 2.5) % 7, 0)
      bubble(x, 790, 680, Math.floor(lt * 2.5) % 2 ? 'that one?' : 'this one?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 1120, 'TIME: 8:59', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'A one-page essay. | Went *forty pages* deep.', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(8, Math.floor(prog(lt, 0.2, 1.6) * 8))
      for (let i = 0; i < n; i++) paper(x, 760 + i * 8, 1000 - i * 26, 0.5, { rot: Math.sin(i * 1.9) * 0.08, lines: 5 })
      label(x, 800, 640, `PAGE ${Math.max(1, Math.round(prog(lt, 0.2, 1.6) * 40))}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 44, bg: '#c97bff', rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Left for “research.” | Back *in June.*', mood: 'sparkle', star: { x: 150 }, hops: [0.4, 1.1],
    front(x, t, lt, P, F) {
      drawBits(x, BAG, BAG_C, F.x - 130, F.cy + 40, 12 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.1 })
      drawBits(x, MAP, MAP_C, 320, 720, 20 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: -0.06 })
      label(x, 320, 920, 'FIELD TRIP: SOLO', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 30, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 320, 1080, 'for SCIENCE!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Did next year’s | homework *too.*', mood: lt => lt < 1.2 ? 'neutral' : 'happy', look: [-1, 0], star: { x: 150 },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) paper(x, 330 + i * 14, 900 - i * 30, pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2) * 0.8, { title: ['THIS YEAR', 'NEXT YEAR', 'YEAR AFTER'][i], mark: '✓', markCol: '#2fc79a', rot: -0.05 + i * 0.03 })
      label(x, 330, 640, 'AHEAD: 2 YEARS', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: '#9aa5c4', rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Showed their work. | It’s *a birth chart.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -170 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.translate(790, 840); x.scale(k, k)
      x.fillStyle = WOOD; x.fillRect(-170, -190, 340, 380); x.fillStyle = '#1d4a3a'; x.fillRect(-156, -176, 312, 352)
      x.fillStyle = BONE; x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('2 + 2 =', 0, -130)
      x.restore()
    },
    front(x, t, lt, P) {
      chart(x, 790, 890, 110, pop01(t, P.t0 + 0.7, 0.35, 2), t)
      bubble(x, 790, 610, 'it’s obvious', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Read the class poem. | *Wept* on the worksheet.', mood: lt => lt < 1.0 ? 'sparkle' : 'wide', tears: lt => lt < 1.0 ? 2 : 3, star: { x: -160 },
    front(x, t, lt, P) {
      paper(x, 800, 900, pop01(t, P.t0 + 0.25, 0.3, 2), { title: 'POEM: Q1', rot: 0.06 })
      if (lt > 1.0) {
        x.save(); x.fillStyle = 'rgba(143,227,255,0.55)'
        for (const [dx, dy, r] of [[-40, 30, 26], [30, 80, 34], [-10, -20, 20], [50, -10, 18]]) { x.beginPath(); x.arc(800 + dx, 900 + dy, r * clamp((lt - 1) * 2), 0, Math.PI * 2); x.fill() }
        x.restore()
      }
      label(x, 800, 650, 'SO TRUE', pop01(t, P.t0 + 1.1, 0.3, 2), { size: 40, bg: SKYB, rot: -0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0081', key: 'C', accent: '#6fc3ff', ending: 'callback',
  title: 'Homework? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody read | *the question.*' },
  last: {
    text: 'Libra picked a pen. | *It’s summer now.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.6, 0.35, 2)
      penRack(x, t, 540, 1120, 1.8 * k, 3, ease.outCubic(prog(lt, 1.2, 1.7)))
      sparkles(x, t, 540, 960, t - lt + 1.6, 8, 160, 0.3)
      label(x, 540, 1330, 'FINAL ANSWER: BLUE', pop01(t, t - lt + 1.8, 0.3, 2.4), { size: 40, bg: SKYB, rot: -0.03, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
