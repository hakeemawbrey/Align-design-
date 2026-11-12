// r2t0084: star_talk, ROLLCALL, "The signs | on a deadline." (~57 s vertical, signs3kit social cut, music: lofi · D)
//   0.0–3.6    "The signs | *on a deadline.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one deadline per sign (3.8 s each):
//              ♈ finished early, wrong project · ♉ due in an hour, snack break first · ♊ three different excuses
//              · ♋ stress-baked a whole bakery · ♌ submitted it, asked for applause · ♍ done a week ago, still proofreading
//              · ♎ asked everyone's opinion, deadline passed · ♏ silent three days, delivered a masterpiece
//              · ♐ deadline? they were on a boat · ♑ finished a month ago, waiting politely
//              · ♒ submitted it as a horoscope · ♓ checked their horoscope: "tomorrow"
//  49.2        "Sent at 11:59. | *All twelve.*"  The twelve fly up into a group photo.
//  52.6        callback: "Taurus? | *Still on break.*"  The snack pile comes back.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', WOOD = '#8a4a2e'

function paper(x, cx, cy, k, { rot = 0.05, w = 230, h = 300, mark = null, markCol = RED, title = null, lines = 6 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = CREAM; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#b9c7e6'
  for (let i = 0; i < lines; i++) x.fillRect(-w / 2 + 20, -h / 2 + 70 + i * ((h - 100) / lines), w - 40, 4)
  if (title) { x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -h / 2 + 36) }
  if (mark) { x.fillStyle = markCol; x.font = `800 ${mark.length > 3 ? 56 : 90}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(mark, 0, 30) }
  x.restore()
}
// a big round wall clock reading hh:mm-ish (ang: minute hand angle in turns)
function clock(x, cx, cy, r, k, ang, txt = null) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * r * 0.82 - 4, Math.sin(a) * r * 0.82 - 4, 8, 8) }
  x.strokeStyle = INK; x.lineWidth = 8; x.lineCap = 'square'
  x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.sin(ang * Math.PI * 2) * r * 0.72, -Math.cos(ang * Math.PI * 2) * r * 0.72); x.stroke()
  x.strokeStyle = RED; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.sin(-0.03 * Math.PI * 2) * r * 0.48, -Math.cos(-0.03 * Math.PI * 2) * r * 0.48); x.stroke()
  x.restore()
  if (txt) label(x, cx, cy + r * k + 40, txt, k, { size: 32, bg: RED, color: '#fff', rot: -0.04, font: MONO, weight: 700 })
}
const CHIPS = [
  '.YYYYYY.',
  'RRRRRRRR',
  'RWWWWWWR',
  'RWYYYYWR',
  'RWYYYYWR',
  'RWWWWWWR',
  'RRRRRRRR',
]
const DONUT = ['..PPPP..', '.PPPPPP.', 'PPP..PPP', 'PP....PP', 'PPP..PPP', '.BBBBBB.', '..BBBB..']
const PIE = ['....CC....', '..CCCCCC..', '.CKCKCKCC.', 'CCCCCCCCCC', 'BBBBBBBBBB', '.BBBBBBBB.']
const PIE_C = { C: '#e8a24a', K: '#8a4a2e', B: '#c9cfe0' }
const GLASS = ['.KKKK....', 'K.SS.K...', 'K.S..K...', 'K....K...', '.KKKK....', '.....K...', '......K..', '.......K.', '........K']
const BOAT = [
  '.....M......',
  '.....MSS....',
  '.....MSSS...',
  '.....MSSSS..',
  '.....M......',
  'HHHHHHHHHHHH',
  '.HHHHHHHHHH.',
  '..HHHHHHHH..',
]
const BOAT_C = { M: WOOD, S: CREAM, H: '#ff9a4a' }
function snacks(x, t, cx, cy, k) {
  if (k <= 0.01) return
  drawBits(x, CHIPS, { Y: GOLD, R: RED, W: CREAM }, cx - 90, cy, 14 * k, { rot: -0.15 })
  drawBits(x, DONUT, { P: PINK, B: '#d9a05b' }, cx + 80, cy + 30, 14 * k, { rot: 0.1 })
  drawBits(x, PIE, PIE_C, cx, cy + 90, 12 * k)
}

const CAMEOS = [
  { sign: 'aries', cap: 'Finished in an hour. | *Wrong project.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', star: { x: -160 }, hops: [0.4],
    front(x, t, lt, P) {
      paper(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { title: 'PROJECT B', mark: lt > 1.0 ? 'DONE' : null, markCol: '#2fc79a' })
      label(x, 790, 640, 'DUE: PROJECT A', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: RED, color: '#fff', rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Due in an hour. | *Snack break first.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -160 },
    front(x, t, lt, P) {
      clock(x, 790, 680, 90, pop01(t, P.t0 + 0.15, 0.3, 2), -0.05 + lt * 0.02)
      snacks(x, t, 790, 930, 1.4 * pop01(t, P.t0 + 0.8, 0.35, 2))
    } },
  { sign: 'gemini', cap: 'Running late? | *Three different excuses.*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.8) % 2 ? 1 : -1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      bubble(x, 790, 640, 'my wifi died', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 790, 850, 'my cat sat on it', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, col: GOLD, tail: 'bl' })
      bubble(x, 790, 1060, 'what deadline?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, col: MINT, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Stress-baked | *a whole bakery.*', mood: lt => lt > 1.3 ? 'wide' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) drawBits(x, PIE, PIE_C, 720 + (i % 2) * 140, 1060 - Math.floor(i / 2) * 120, 13 * pop01(t, P.t0 + 0.2 + i * 0.2, 0.25, 2.2))
      label(x, 790, 640, 'WORDS WRITTEN: 0', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Submitted it. | Waited *for applause.*', mood: 'sparkle', star: { x: -150 }, hops: [0.8],
    front(x, t, lt, P) {
      label(x, 790, 700, 'SENT ✓', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 44, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 900, 'well? | clap?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 790, 1100, 'APPLAUSE: PENDING', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: '#ffb34a', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Done a week ago. | *Still proofreading.*', mood: 'squint', look: lt => [Math.sin(lt * 6) > 0 ? 1 : -1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      paper(x, 800, 880, pop01(t, P.t0 + 0.15, 0.3, 2), { title: 'FINAL_v31' })
      drawBits(x, GLASS, { K: INK, S: '#fff' }, 760 + 40 * Math.sin(t * 3), 860 + 30 * Math.cos(t * 2.4), 13 * pop01(t, P.t0 + 0.5, 0.3, 2))
      label(x, 800, 1110, 'TYPOS FOUND: 0', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Asked everyone’s opinion. | *Deadline passed.*', mood: lt => lt > 1.6 ? 'wide' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const Q = ['font?', 'colour?', 'title?', 'vibe?']
      Q.forEach((q, i) => bubble(x, 720 + (i % 2) * 150, 640 + i * 95, q, pop01(t, P.t0 + 0.2 + i * 0.22, 0.25, 2.2), { size: 32, tail: i % 2 ? 'br' : 'bl', col: [BONE, GOLD, MINT, PINK][i] }))
      label(x, 790, 1110, 'DEADLINE: YESTERDAY', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: RED, color: '#fff', rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Silent for three days. | Sent *a masterpiece.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 660, '…', pop01(t, P.t0 + 0.2, 0.25, 2.2) * (1 - prog(lt, 1.0, 1.15)), { size: 50, col: LAV, tail: 'bl' })
      paper(x, 790, 900, pop01(t, P.t0 + 1.1, 0.35, 2.2), { title: 'FLAWLESS', mark: '★', markCol: GOLD })
      sparkles(x, t, 790, 880, P.t0 + 1.3, 8, 170, 0.2)
    } },
  { sign: 'sagittarius', cap: 'Deadline? | They were *on a boat.*', mood: 'sparkle', star: { x: 140, y: -40 }, hops: [0.6, 1.4],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = k; x.fillStyle = '#3d6fd6'; x.beginPath(); x.moveTo(110, 1240)
      for (let i = 0; i <= 40; i++) x.lineTo(110 + i * 21.5, 1080 + Math.sin(t * 2.4 + i * 0.6) * 10)
      x.lineTo(970, 1240); x.closePath(); x.fill(); x.restore()
    },
    front(x, t, lt, P, F) {
      drawBits(x, BOAT, BOAT_C, F.x, 1050 + 6 * Math.sin(t * 2.4), 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 * Math.sin(t * 2) })
      label(x, 330, 680, 'NO SIGNAL', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 38, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Finished last month. | *Waiting politely.*', mood: lt => lt < 1.3 ? 'neutral' : 'sleepy', look: [-1, 0], star: { x: 150 },
    front(x, t, lt, P) {
      paper(x, 330, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { title: 'EARLY. AGAIN.', mark: '✓', markCol: '#2fc79a', rot: -0.05 })
      label(x, 330, 1100, 'WAITING: 31 DAYS', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: '#9aa5c4', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Turned it in | *as a horoscope.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      paper(x, 790, 860, k, { title: 'REPORT', lines: 0 })
      if (k > 0.5) {
        x.save(); x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'
        ;['Your sales are', 'entering a', 'bold new era.', '✦ ✦ ✦'].forEach((l, i) => { if (lt > 0.5 + i * 0.25) x.fillText(l, 790, 830 + i * 40) })
        x.restore()
      }
      label(x, 790, 1100, 'BOSS: CONFUSED', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Checked their horoscope. | It said *“tomorrow.”*', mood: lt => lt < 1.0 ? 'sparkle' : 'wide', tears: lt => lt < 1.0 ? 2 : 3, star: { x: -160 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 860); x.rotate(0.05); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-134, -180, 268, 360); x.fillStyle = '#2a2350'; x.fillRect(-124, -170, 248, 340)
        x.fillStyle = LAV; x.fillRect(-104, -150, 208, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♓ TODAY', 0, -127)
        x.fillStyle = BONE; x.font = `800 36px ${INTER}`
        ;['Rest. Dream.', 'Start it', 'tomorrow.'].forEach((l, i) => { if (lt > 0.5 + i * 0.25) x.fillText(l, 0, -40 + i * 50) })
        x.restore()
      }
      label(x, 800, 1110, 'DEADLINE: TODAY', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: RED, color: '#fff', rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0084', key: 'D', accent: '#ff6b5a', ending: 'callback',
  title: 'The signs | *on a deadline.*',
  cameos: CAMEOS,
  group: { cap: 'Sent at 11:59. | *All twelve.*' },
  last: {
    text: 'Taurus? | *Still on break.*',
    draw(x, t, lt) {
      snacks(x, t, 540, 1140, 1.6 * pop01(t, t - lt + 0.6, 0.4, 2))
      const k = pop01(t, t - lt + 0.9, 0.4, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 540, 1460, 200 * k, { mood: 'heart', seed: 9, glyph: false, hops: [t - lt + 1.6] })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
