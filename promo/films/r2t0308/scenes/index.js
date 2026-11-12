// r2t0308: star_talk, BELIKE, "Headphones die. | Zodiacs be like." (topic: Zodiacs when their headphones die be like; signs3kit social cut, music: lofi · G). Ending: lesson.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
/** a square sticky note with a few lines of text */
function note(x, cx, cy, k, lines, { rot = -0.05, bg = '#ffe76a', size = 34 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -134, 296, 296)
  x.fillStyle = INK; x.fillRect(-152, -152, 304, 304); x.fillStyle = bg; x.fillRect(-144, -144, 288, 288)
  x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, (i - (lines.length - 1) / 2) * size * 1.25))
  x.restore()
}
/** a pixel phone with a header bar and chat chips: lines = [[text, colour, k, right?], …] */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 24px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 64); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
/** a crossed-out sticker swapped for a new one */
function swapLabel(x, cx, cy, lt, at, from, to, { size = 40, fromBg = '#9aa5c4', toBg = MINT } = {}) {
  if (lt < at) { L(x, cx, cy, from, 1, fromBg, -0.04, size); return }
  const p = clamp((lt - at) / 0.25)
  if (p < 1) {
    L(x, cx, cy, from, 1, fromBg, -0.04, size)
    x.save(); x.strokeStyle = RED; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); x.moveTo(cx - 150, cy + 10); x.lineTo(cx - 150 + 300 * p, cy - 10); x.stroke(); x.restore()
    return
  }
  L(x, cx, cy, to, pop01(lt, at + 0.3, 0.3, 2.4), toBg, 0.04, size)
}
/** little "z z z" drifting up */
function zzz(x, t, cx, cy, { alpha = 1, size = 40 } = {}) {
  x.save(); x.fillStyle = BONE; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'
  for (let i = 0; i < 3; i++) { const ph = ((t * 0.6 + i / 3) % 1 + 1) % 1; x.globalAlpha = alpha * Math.sin(Math.PI * ph); x.fillText('z', cx + i * 26 + Math.sin(ph * 6) * 8, cy - ph * 120) }
  x.restore()
}
const ST = { x: -170 }

const ACC = '#ff9ad5'
const HEAD = ['...KKKKKK...', '..KHHHHHHK..', '.KHK....KHK.', 'KHK......KHK', 'KHK......KHK', 'KCCK....KCCK', 'KCCK....KCCK', 'KCCK....KCCK', '.KK......KK.']
const HCOL = c => ({ K: INK, H: '#9aa5c4', C: c })
const BATT = ['KKKKKKKKKK.', 'KRWWWWWWWKK', 'KRWWWWWWWKK', 'KKKKKKKKKK.']
const SPEAKER = ['KKKKKKKK', 'KGGGGGGK', 'KGKKKKGK', 'KGKSSKGK', 'KGKKKKGK', 'KGGGGGGK', 'KGKKKKGK', 'KGKSSKGK', 'KGKKKKGK', 'KGGGGGGK', 'KKKKKKKK']
const SPOON = ['.SSS.', 'SSSSS', 'SSWSS', 'SSSSS', '.SSS.', '..S..', '..S..', '..S..', '..S..', '..S..']
const FLOWER = ['.P.P.', 'PPYPP', '.PPP.', '..G..', '.GG..', '..G..']
/** a dead-battery icon, blinking */
const dead = (x, t, cx, cy, k) => { if (k > 0.01 && Math.floor(t * 3) % 2) drawBits(x, BATT, { K: INK, R: RED, W: '#2a2350' }, cx, cy, 12 * k) }

const CAMEOS = [
  { sign: 'aries', cap: 'Battery died. | *Sprinted* to the charger.', mood: 'wide', star: { x: -150 }, hops: [0.3, 0.6, 0.9],
    back(x, t, lt, P) { x.save(); x.fillStyle = 'rgba(239,230,214,0.5)'; for (let i = 0; i < 4; i++) x.fillRect(130, 790 + i * 50, 120 + 40 * Math.sin(t * 20 + i), 10); x.restore() },
    front(x, t, lt, P, F) {
      drawBits(x, HEAD, HCOL(RED), F.x, F.top + 40, 16 * pop01(t, P.t0 + 0.1, 0.3, 2))
      dead(x, t, 790, 680, pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 790, 880, 'CHARGER: 0.4 SEC', pop01(t, P.t0 + 1.1, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'taurus', cap: 'Kept singing anyway. | *The whole album.*', mood: 'sleepy', star: ST,
    front(x, t, lt, P, F) {
      drawBits(x, HEAD, HCOL('#5fd068'), F.x, F.top + 40, 16 * pop01(t, P.t0 + 0.1, 0.3, 2))
      notes(x, t, 560, 720, { n: 5, cell: 7, col: GOLD, seed: 2 })
      L(x, 790, 760, `TRACK ${Math.min(14, 1 + Math.floor(lt * 5.5))} OF 14`, pop01(t, P.t0 + 0.4, 0.3, 2), GOLD, 0.04, 34)
      bubble(x, 790, 940, 'laaa la LAAA', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'One second of silence. | *Called three people.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', star: ST,
    front(x, t, lt, P) {
      const N = ['CALLING MOM…', 'CALLING JO…', 'CALLING ANYONE…']
      for (let i = 0; i < 3; i++) L(x, 790 + (i % 2 ? 24 : -24), 680 + i * 150, N[i], pop01(t, P.t0 + 0.4 + i * 0.45, 0.3, 2.2), [MINT, GOLD, PINK][i], i % 2 ? 0.05 : -0.05, 30)
    } },
  { sign: 'cancer', cap: 'Headphones died. | *Held a little funeral.*', mood: lt => lt > 0.8 ? 'neutral' : 'happy', star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(790, 1010); x.scale(k, k); x.fillStyle = INK; x.fillRect(-150, -60, 300, 120); x.fillStyle = '#8a4a2e'; x.fillRect(-142, -52, 284, 104); x.restore() }
      drawBits(x, HEAD, HCOL(SKYB), 790, 900, 13 * k)
      drawBits(x, FLOWER, { P: PINK, Y: GOLD, G: '#5fd068' }, 900, 940, 12 * pop01(t, P.t0 + 0.9, 0.3, 2))
      L(x, 790, 680, 'GONE TOO SOON', pop01(t, P.t0 + 1.3, 0.3, 2.4), LAV, 0.04, 32)
    } },
  { sign: 'leo', cap: 'Now *everyone* | gets to hear the music.', mood: 'sparkle', star: { x: -150 }, hops: [0.5, 0.9, 1.3, 1.7],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), b = 1 + 0.06 * Math.sin(t * 18)
      drawBits(x, SPEAKER, { K: INK, G: '#ffb34a', S: '#2a2350' }, 800, 940, 22 * k, { sx: b, sy: b })
      notes(x, t, 800, 760, { n: 6, cell: 8, col: GOLD, seed: 1 })
      L(x, 800, 640, 'VOLUME: MAX', pop01(t, P.t0 + 0.8, 0.3, 2.4), '#ffb34a', 0.04, 34)
    } },
  { sign: 'virgo', cap: 'Had a backup. | And a *backup backup.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, HEAD, HCOL([MINT, SKYB, GOLD][i]), 670 + i * 120, 740 + i * 100, 13 * pop01(t, P.t0 + 0.3 + i * 0.4, 0.3, 2.2))
      L(x, 790, 1100, 'LABELED: A · B · C', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'libra', cap: 'Bought new ones. | *Matched the outfit.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: ST,
    front(x, t, lt, P, F) {
      drawBits(x, HEAD, HCOL(P.color), F.x, F.top + 40, 16 * pop01(t, P.t0 + 0.5, 0.3, 2))
      sparkles(x, t, F.x, F.top + 40, P.t0 + 0.7, 7, 140, 0.3)
      L(x, 790, 760, 'COLOUR: MATCHED ✓', pop01(t, P.t0 + 0.9, 0.3, 2), PINK, 0.04, 30)
      L(x, 790, 900, 'SHOES: ALSO ✓', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Now hears everything. | *Knows everything.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 650, '…so I said—', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, col: '#9aa5c4', tail: 'br' })
      bubble(x, 760, 820, '…don’t tell—', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 34, col: '#9aa5c4', tail: 'br' })
      L(x, 790, 1020, 'NOTED.', pop01(t, P.t0 + 1.5, 0.3, 2.4), '#c97bff', -0.04, 40)
    } },
  { sign: 'sagittarius', cap: 'Headphones died. | Made *a new best friend.*', mood: 'sparkle', star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 820, 940, 170 * k, { mood: lt > 1.4 ? 'happy' : 'wide', look: [-1, 0], seed: 14, glyph: false })
      bubble(x, 600, 640, 'HI! where are | you from?!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 820, 1110, 'BFF SINCE: 10 SEC', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  { sign: 'capricorn', cap: 'Didn’t notice. | *Kept working.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      drawBits(x, HEAD, HCOL('#9aa5c4'), F.x, F.top + 40, 16 * pop01(t, P.t0 + 0.1, 0.3, 2))
      dead(x, t, 790, 680, pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 790, 860, 'DEAD SINCE: TUESDAY', pop01(t, P.t0 + 0.9, 0.3, 2.4), '#9aa5c4', 0.04, 28)
      L(x, 790, 1000, 'FOCUS: UNBOTHERED', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 28)
    } },
  { sign: 'aquarius', cap: 'Built new ones | *out of a spoon.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SPOON, { S: '#c9d2e8', W: '#ffffff' }, 760, 880, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.3 })
      if (lt > 0.7) { x.save(); x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.moveTo(800, 960); x.bezierCurveTo(880, 1040, 900, 900, 940, 1000); x.stroke(); x.strokeStyle = MINT; x.beginPath(); x.moveTo(790, 970); x.bezierCurveTo(700, 1080, 640, 980, 620, 1060); x.stroke(); x.restore() }
      if (lt > 1.1) sparkles(x, t, 780, 860, P.t0 + 1.1, 6, 120, 0.4)
      L(x, 790, 1120, 'SOUND: SOMEHOW ✓', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'pisces', cap: 'Headphones died. | *Cried* with no soundtrack.', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      drawBits(x, HEAD, HCOL(LAV), F.x, F.top + 40, 16 * pop01(t, P.t0 + 0.1, 0.3, 2))
      dead(x, t, 790, 700, pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 790, 900, 'SAD SONG: NOT PLAYING', pop01(t, P.t0 + 0.9, 0.3, 2.4), SKYB, 0.04, 26)
      L(x, 790, 1020, 'CRYING: STILL ON', pop01(t, P.t0 + 1.5, 0.3, 2.4), LAV, -0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2t0308', key: 'G', accent: ACC, ending: 'lesson',
  title: 'Headphones die. | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Battery: dead. | *Drama: alive.*' },
  lesson: { text: 'Sometimes the quiet | *is the song.*', chip: 'STATUS: UNPLUGGED' },
  last: { text: 'Taurus: | *still singing.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
