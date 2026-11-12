// r2t0139: THE SIGNS AS… v3, "Fave shirt shrinks. | Zodiacs be like." (~57 s vertical, signs3kit social cut, lofi · D)
// Twelve signs, one tragedy: the favourite shirt came out of the wash tiny. Ending: 'callback'.
//   0.0–3.6    "Fave shirt shrinks. | Zodiacs *be like.*"
//   3.6–49.2   ♈ wore it anyway, ripped a sleeve · ♉ turned it into a pillowcase · ♊ told everyone, twice
//              · ♋ swaddled it, sang a lullaby · ♌ called it a crop top, iconic · ♍ read the label, wrote a complaint
//              · ♎ compatibility check: it's complicated · ♏ knows who did the laundry · ♐ hiking: "ventilation"
//              · ♑ bought five more, pre-shrunk · ♒ framed it as art · ♓ held it, cried for a week
//  49.2        "Nobody let it | *go quietly.*"
//  52.6        callback: "The shirt is | *in good hands.*"  (Cancer, still rocking the tiny shirt to sleep)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', WOOD = '#8a4a2e', ORANGE = '#ff9a4a', TEE = '#ff6b7a'

function sheet(x, cx, cy, w, h, k, { rot = 0, bg = BONE, head = null, headBg = RED, headInk = '#fff4e2', headSize = 30 } = {}) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 7, -h / 2 - 7, w + 14, h + 14)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (head) {
    x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 60)
    x.fillStyle = headInk; x.font = `800 ${headSize}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 32)
  }
  return true
}
const SHIRT = [
  'TTT.....TTT',
  'TTTTT.TTTTT',
  'TTTTTTTTTTT',
  '..TTTTTTT..',
  '..TTSTSTT..',
  '..TTTTTTT..',
  '..TTTTTTT..',
  '..TTTTTTT..',
]
const RIPPED = [
  '........TTT',
  '..TTT.TTTTT',
  '.TTTTTTTTTT',
  '..TTTTTTT..',
  '..TTSTSTT..',
  '..TTTTTTT..',
  '..TTTTTTT..',
  '..TTTTTTT..',
]
const SHIRT_C = { T: TEE, S: GOLD }
const shirt = (x, cx, cy, cell, o = {}) => drawBits(x, SHIRT, SHIRT_C, cx, cy, cell, o)
const PILLOW = ['.TTTTTTTTTT.', 'TTTTTTTTTTTT', 'TTTTTSTSTTTT', 'TTTTTTTTTTTT', '.TTTTTTTTTT.']
const BOX = ['KKKKKKKKKK', 'KWWWWWWWWK', 'KWWWWWWWWK', 'KWWWWWWWWK', 'KKKKKKKKKK']

const CAMEOS = [
  { sign: 'aries', cap: 'Wore it anyway. | Ripped *a sleeve.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, lt > 1.1 ? RIPPED : SHIRT, SHIRT_C, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      if (lt > 1.1) drawBits(x, ['TTT', 'TTT'], SHIRT_C, 880 + Math.min(0.6, lt - 1.1) * 80, 720 - Math.min(0.6, lt - 1.1) * 80, 22, { rot: (lt - 1.1) * 4 })
      label(x, 790, 1070, 'ARMS: FREE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Turned it into | a *pillowcase.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      const m = ease.inOutCubic(prog(lt, 0.6, 1.1))
      if (m < 1) shirt(x, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2) * (1 - m))
      if (m > 0) drawBits(x, PILLOW, SHIRT_C, 790, 880, 24 * m)
      label(x, 790, 1060, 'NAP QUALITY: 10/10', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Told everyone. | *Twice.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wide' : 'sparkle', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const Q = ['so my shirt…', 'it SHRANK.', 'wait, so my shirt…', 'it SHRANK!!']
      bubble(x, 770, 680, Q[Math.min(3, Math.floor(lt / 0.5))], pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 38, tail: 'bl' })
      shirt(x, 790, 900, 12 * pop01(t, P.t0 + 0.4, 0.3, 2))
      label(x, 790, 1060, `RETOLD: ${1 + Math.min(1, Math.floor(lt / 1.0))}x`, pop01(t, P.t0 + 0.8, 0.3, 2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Swaddled it. | Sang *a lullaby.*', mood: lt => lt > 1.0 ? 'sleepy' : 'heart', star: { x: -120 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      const r = Math.sin(t * 3) * 0.15
      x.save(); x.translate(F.x + 250, F.cy + 30); x.rotate(r)
      if (k > 0.01) { x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 92 * k, 58 * k, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#c9e8ff'; x.beginPath(); x.ellipse(0, 0, 84 * k, 50 * k, 0, 0, Math.PI * 2); x.fill() }
      shirt(x, -10, -6, 6 * k)
      x.restore()
      notes(x, t, F.x + 260, F.cy - 80, { n: 4, cell: 7, col: SKYB, seed: 3, alpha: clamp(lt - 0.7) })
      label(x, 780, 1100, 'SHHH. IT\'S SLEEPING.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: LAV, rot: -0.04 })
    } },
  { sign: 'leo', cap: 'Called it a crop top. | *Iconic.*', mood: 'sparkle', star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      shirt(x, 790, 820, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { sy: 0.7 })
      label(x, 790, 650, 'NEW TREND', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 38, bg: '#ffb34a', rot: 0.05 })
      bubble(x, 790, 1050, 'on purpose.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, tail: 'bl' })
      sparkles(x, t, 790, 820, P.t0 + 1.3, 7, 170, 0.3)
    } },
  { sign: 'virgo', cap: 'Read the care label. | Wrote *a complaint.*', mood: lt => lt > 1.3 ? 'squint' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      if (sheet(x, 790, 850, 300, 380, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04, bg: '#fff4e2', head: 'DEAR LAUNDRY,', headBg: '#ef5c94', headSize: 26 })) {
        x.fillStyle = '#b9b0a0'
        const n = Math.floor(clamp((lt - 0.4) / 1.2) * 7)
        for (let j = 0; j < n; j++) x.fillRect(-120, -90 + j * 36, 240 - (j % 3) * 50, 16)
        x.restore()
      }
      label(x, 790, 1100, 'PAGE 1 OF 4', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Compatibility check? | *It\'s complicated.*', mood: lt => lt > 1.4 ? 'squint' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 620, '✦ COMPATIBILITY', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      shirt(x, 790, 850, 12 * pop01(t, P.t0 + 0.5, 0.3, 2))
      label(x, 790, 1040, 'YOU + SHIRT: ???', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.04 })
    } },
  { sign: 'scorpio', cap: 'Knows who did it. | *Never forgets.*', mood: lt => lt > 1.3 ? 'squint' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      if (sheet(x, 790, 830, 260, 300, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.04, bg: '#fff4e2', head: 'SUSPECT', headBg: '#e23d66' })) {
        x.fillStyle = '#9aa5c4'; x.fillRect(-90, -70, 180, 180); x.fillStyle = INK; x.beginPath(); x.arc(0, 20, 64, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#c9e8ff'; x.beginPath(); x.arc(0, 20, 50, 0, Math.PI * 2); x.fill()
        x.restore()
      }
      label(x, 790, 1050, 'THE DRYER', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Wore it hiking. | Called it *ventilation.*', mood: 'sparkle', star: { x: -170 }, hops: [0.6, 1.2, 1.8],
    back(x, t, lt, P) {
      x.fillStyle = INK; x.beginPath(); x.moveTo(560, 1180); x.lineTo(760, 760); x.lineTo(960, 1180); x.fill()
      x.fillStyle = '#6b5ab0'; x.beginPath(); x.moveTo(580, 1170); x.lineTo(760, 790); x.lineTo(940, 1170); x.fill()
      x.fillStyle = BONE; x.beginPath(); x.moveTo(720, 870); x.lineTo(760, 790); x.lineTo(800, 870); x.fill()
    },
    front(x, t, lt, P, F) {
      shirt(x, F.x, F.cy + 30, 10 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 760, 660, 'BREEZY!', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: SKYB, rot: 0.05 })
    } },
  { sign: 'capricorn', cap: 'Bought five more. | *Pre-shrunk.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) {
        const k = pop01(t, P.t0 + 0.3 + i * 0.2, 0.25, 2.2)
        drawBits(x, BOX, { K: INK, W: '#e8d9b8' }, 790 + (i % 2 ? 12 : -12), 1060 - i * 72, 18 * k)
        shirt(x, 790 + (i % 2 ? 12 : -12), 1060 - i * 72, 4 * k)
      }
      label(x, 790, 640, 'PLANNED AHEAD', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: '#2fc79a', rot: 0.05 })
    } },
  { sign: 'aquarius', cap: 'Framed it. | Called it *art.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      if (sheet(x, 790, 830, 300, 300, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.03, bg: GOLD })) {
        x.fillStyle = '#140c30'; x.fillRect(-124, -124, 248, 248)
        x.restore()
        shirt(x, 790, 830, 12)
      }
      label(x, 790, 1060, 'UNTITLED (SMALL)', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Held it close. | Cried *for a week.*', mood: 'wide', tears: lt => lt > 0.8 ? 3 : 2, star: { x: -170 },
    front(x, t, lt, P, F) {
      shirt(x, F.x + 120, F.cy + 60, 9 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: -0.2 })
      const d = 1 + Math.min(6, Math.floor(clamp((lt - 0.5) / 1.3) * 7))
      label(x, 790, 700, `DAY ${d}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 44, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0139', key: 'D', accent: TEE, ending: 'callback',
  title: 'Fave shirt shrinks. | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody let it | *go quietly.*' },
  last: {
    text: 'The shirt is | *in good hands.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k <= 0.01) return
      const F = signChar(x, t, 'cancer', 470, 1060, 280 * k, { mood: lt > 1.4 ? 'sleepy' : 'heart', seed: 40, hops: [t - lt + 1.4] })
      x.save(); x.translate(720, 1090); x.rotate(Math.sin(t * 3) * 0.15)
      x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 100 * k, 62 * k, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#c9e8ff'; x.beginPath(); x.ellipse(0, 0, 92 * k, 54 * k, 0, 0, Math.PI * 2); x.fill()
      shirt(x, -10, -6, 7 * k)
      x.restore()
      notes(x, t, 720, 940, { n: 4, cell: 7, col: SKYB, seed: 3, alpha: clamp(lt - 0.8) })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
