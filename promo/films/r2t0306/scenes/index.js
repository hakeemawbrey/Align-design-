// r2t0306: star_talk, BELIKE, "Zodiacs on rest day | be like." (~62 s vertical, signs3kit social cut, music: lofi · C). Ending: lesson.
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

const ACC = '#7dd3c0'
const COUCH = ['KKKKKKKKKKKKKKKKKK', 'KBBBBBBBBBBBBBBBBK', 'KBBBBBBBBBBBBBBBBK', 'KBBBBBBBBBBBBBBBBK', 'KKKKKKKKKKKKKKKKKK', 'KBBKCCCCCCCCCCKBBK', 'KBBKCCCCCCCCCCKBBK', 'KBBKKKKKKKKKKKKBBK', 'KBBBBBBBBBBBBBBBBK', 'KKKKKKKKKKKKKKKKKK', '.KK............KK.']
const CROWN = ['Y...Y...Y', 'YY.YYY.YY', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY']
const COOKIE = ['.CCCC.', 'CDCCCC', 'CCCCDC', 'CDCCCC', '.CCCC.']
const MOUNT = ['......R.....', '.....RWW....', '....WWWWW...', '...GGWGGGG..', '..GGGGGGGGG.', '.GGGGGGGGGGG', 'GGGGGGGGGGGG']
const LAPTOP = ['KKKKKKKKKKKK', 'KSSSSSSSSSSK', 'KSWWWWWWWWSK', 'KSSSSSSSSSSK', 'KSWWWWWSSSSK', 'KSSSSSSSSSSK', 'KKKKKKKKKKKK', 'GGGGGGGGGGGGGG', 'GGGGGGGGGGGGGG']
const ROBOT = ['...KK...', '..KYYK..', 'KKKKKKKK', 'KGGGGGGK', 'KGSGGSGK', 'KGGGGGGK', 'KGGWWGGK', 'KKKKKKKK', '.KGGGGK.', '.KGKKGK.', '.KK..KK.']

const CAMEOS = [
  { sign: 'aries', cap: 'Rest day. | Did *500 push-ups.*', mood: lt => lt > 1.5 ? 'wide' : 'sparkle', star: { x: -170, y: 0 }, hops: [0.3, 0.55, 0.8, 1.05, 1.3, 1.55],
    front(x, t, lt, P) {
      swapLabel(x, 790, 700, lt, 0.5, 'REST DAY', 'PUSH-UP DAY', { size: 36, fromBg: LAV, toBg: P.color })
      const n = Math.min(500, Math.round(ease.inQuad(clamp((lt - 0.4) / 1.6)) * 500))
      L(x, 790, 900, `PUSH-UPS: ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), GOLD, 0.04, 36)
      bubble(x, 790, 1080, 'just warming up', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Didn’t leave the couch. | *Became* the couch.', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', star: { x: -150, y: 40 },
    back(x, t, lt, P) { drawBits(x, COUCH, { K: INK, B: '#c97b5a', C: '#e8a07a' }, 420, 1000, 28 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      L(x, 790, 760, 'HOURS ON COUCH: 11', pop01(t, P.t0 + 0.6, 0.3, 2), GOLD, 0.04, 30)
      L(x, 790, 900, 'STATUS: FURNITURE', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.05, 30)
    } },
  { sign: 'gemini', cap: 'Rested by starting | *four new hobbies.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const H = ['POTTERY', 'GUITAR', 'FRENCH', 'JUGGLING']
      for (let i = 0; i < 4; i++) L(x, 790 + (i % 2 ? 30 : -30), 640 + i * 130, `${i + 1}. ${H[i]}`, pop01(t, P.t0 + 0.3 + i * 0.4, 0.3, 2.2), [GOLD, PINK, SKYB, MINT][i], i % 2 ? 0.05 : -0.05, 34)
    } },
  { sign: 'cancer', cap: 'Rest day. | Baked for *the whole street.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 9; i++) drawBits(x, COOKIE, { C: '#e8a24a', D: '#6b3a22' }, 700 + (i % 3) * 95, 720 + Math.floor(i / 3) * 95, 13 * pop01(t, P.t0 + 0.2 + i * 0.1, 0.25, 2.2))
      L(x, 790, 1060, 'COOKIES: 144', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, 0.04, 34)
      hearts(x, t, 790, 760, P.t0 + 1.5, { n: 4, life: 1.6, spread: 200, cell: 7, seed: 4 })
    } },
  { sign: 'leo', cap: 'Took a nap. | In *full glam.*', mood: 'sleepy', star: { x: -150, y: 20 },
    front(x, t, lt, P, F) {
      drawBits(x, CROWN, { Y: GOLD, R: RED, B: SKYB }, F.x, F.top - 30, 14 * pop01(t, P.t0 + 0.3, 0.3, 2))
      sparkles(x, t, F.x, F.cy, P.t0 + 0.9, 8, 190, 0.3)
      L(x, 790, 800, 'NAP: 20 MIN', pop01(t, P.t0 + 0.8, 0.3, 2), '#ffb34a', 0.04, 32)
      L(x, 790, 930, 'HAIR & MAKEUP: 2 HRS', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, -0.04, 28)
    } },
  { sign: 'virgo', cap: 'Relaxed. | *Per the schedule.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      note(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), ['2:00 RELAX', '2:07 RELAX', '2:14 DONE.'], { bg: '#bff0c8', size: 36, rot: 0.04 })
      L(x, 790, 1080, 'CALM: ON TIME ✓', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'libra', cap: 'Self-care day. | Face mask *number seven.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', star: ST,
    front(x, t, lt, P, F) {
      const n = 1 + Math.min(6, Math.floor(Math.max(0, lt - 0.3) / 0.22))
      const MC = ['#9fd8a8', '#ffd1dc', '#c9a6ff', '#ffe76a', '#8fe3ff', '#ffb34a', '#7dffb0']
      x.save(); x.globalAlpha = 0.55 * pop01(t, P.t0 + 0.3, 0.3, 2); x.fillStyle = MC[n - 1]
      x.beginPath(); x.ellipse(F.x, F.cy + 10, 82, 58, 0, 0, Math.PI * 2); x.fill(); x.restore()
      L(x, 790, 760, `MASK ${n} OF 7`, pop01(t, P.t0 + 0.4, 0.3, 2), PINK, 0.04, 34)
      bubble(x, 790, 940, 'glowing yet?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Blinds shut. Phone off. | *Do not knock.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    back(x, t, lt, P) {
      const k = clamp(lt / 0.8)
      x.save(); x.fillStyle = `rgba(6,4,18,${(0.45 * k).toFixed(3)})`; x.fillRect(110, 480, 860, 740); x.restore()
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.5, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 840); x.rotate(0.05); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -110, 300, 220); x.fillStyle = '#c97bff'; x.fillRect(-140, -100, 280, 200)
        x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.fillText('DO NOT', 0, -48); x.fillText('DISTURB.', 0, 4); x.font = `700 28px ${MONO}`; x.fillText('EVER.', 0, 58)
        x.restore()
      }
      L(x, 790, 1080, 'SEEN BY: NO ONE', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'Rest day? | Hiked *three mountains.*', mood: 'sparkle', star: { x: 170 }, hops: [0.7, 1.3, 1.9],
    back(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, MOUNT, { G: '#5fa0d0', W: '#ffffff', R: RED }, 210 + i * 110, 1060 - i * 60, 16 * pop01(t, P.t0 + 0.2 + i * 0.4, 0.3, 2))
    },
    front(x, t, lt, P) {
      L(x, 320, 680, `PEAKS: ${Math.min(3, 1 + Math.floor(Math.max(0, lt - 0.2) / 0.4))}`, pop01(t, P.t0 + 0.2, 0.3, 2), GOLD, -0.05, 36)
      bubble(x, 760, 650, 'so relaxing!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Day off. | Answered *every email.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, LAPTOP, { K: INK, S: '#2a2350', W: SKYB, G: '#9aa5c4' }, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = Math.max(0, 212 - Math.round(ease.inOutQuad(clamp((lt - 0.4) / 1.3)) * 212))
      L(x, 790, 680, `INBOX: ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), n ? '#9aa5c4' : MINT, 0.04, 36)
      L(x, 790, 1090, 'REST: ALSO 0', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, -0.05, 30)
    } },
  { sign: 'aquarius', cap: 'Built a robot | to *rest for them.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      drawBits(x, ROBOT, { K: INK, Y: GOLD, G: '#9aa5c4', S: SKYB, W: BONE }, 800, 900, 22 * k, { rot: lt > 1.1 ? 0.2 : 0 })
      if (lt > 1.1) zzz(x, t, 830, 720)
      L(x, 790, 1110, 'ROBOT: RESTING ✓', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'pisces', cap: 'Took a nap. | *Cried* at the dream.', mood: lt => lt < 0.9 ? 'sleepy' : 'wide', tears: lt => lt < 0.9 ? 1 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'it was a duck | and it LOVED me', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
      L(x, 790, 1010, 'TISSUES: ALL', pop01(t, P.t0 + 1.6, 0.3, 2.4), SKYB, 0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0306', key: 'C', accent: ACC, ending: 'lesson',
  title: 'Zodiacs on rest day | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody rested. | *Except Taurus.*' },
  lesson: { text: 'Rest isn’t lazy. | *It counts.*', chip: 'STATUS: RECHARGED' },
  last: { text: 'Rest day two? | Aries: *“No.”*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
