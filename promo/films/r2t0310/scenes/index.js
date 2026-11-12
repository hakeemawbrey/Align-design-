// r2t0310: star_talk, SOLO (aries), "Aries texting | be like." (signs3kit social cut, music: lofi · F). Ending: callback (the voice note comes back).
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

const ACC = '#ff6b5a'
/** a voice-note chip: a little waveform + a timer */
function voice(x, t, cx, cy, k, time, bg = BONE) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.03); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -50, 340, 100); x.fillStyle = bg; x.fillRect(-162, -42, 324, 84)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-140, -18); x.lineTo(-110, 0); x.lineTo(-140, 18); x.fill()
  for (let i = 0; i < 12; i++) { const h = 10 + 26 * Math.abs(Math.sin(i * 1.7 + t * 6)); x.fillRect(-92 + i * 12, -h / 2, 6, h) }
  x.font = `700 26px ${MONO}`; x.textAlign = 'right'; x.textBaseline = 'middle'; x.fillText(time, 150, 2)
  x.restore()
}

const S = 'aries'
const CAMEOS = [
  { sign: S, cap: 'Typed “hey.” | Sent *“HEY!!!!”*', mood: 'sparkle', star: ST, hops: [0.9],
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'NEW CHAT', headCol: ACC, lines: [
        [lt < 0.9 ? 'hey' : 'HEY!!!!', lt < 0.9 ? '#9aa5c4' : ACC, pop01(t, P.t0 + 0.4, 0.25, 2.2), true],
      ] })
      L(x, 800, 1110, 'CHILL: NOT FOUND', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'No reply in two minutes? | *Called.*', mood: lt => lt > 1.0 ? 'wide' : 'squint', star: ST, hops: [1.0, 1.3, 1.6],
    front(x, t, lt, P) {
      const n = Math.min(4, 1 + Math.floor(Math.max(0, lt - 0.4) / 0.4))
      L(x, 790, 700, '2 MIN. NO REPLY.', pop01(t, P.t0 + 0.2, 0.3, 2), '#9aa5c4', 0.04, 32)
      L(x, 790 + 6 * Math.sin(t * 40), 880, `CALLING… (${n})`, pop01(t, P.t0 + 0.6, 0.3, 2.2), MINT, -0.04, 38)
    } },
  { sign: S, cap: 'Left on read? | *Nine-minute voice note.*', mood: 'wide', star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 790, 680, 'READ 9:41', pop01(t, P.t0 + 0.2, 0.3, 2), '#9aa5c4', 0.04, 32)
      voice(x, t, 790, 880, pop01(t, P.t0 + 0.7, 0.3, 2), lt > 1.0 ? '9:04' : '0:0' + Math.floor(lt * 9))
      bubble(x, 790, 1070, 'so ANYWAY', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Group chat too quiet? | *Started a debate.*', mood: 'sparkle', star: ST, hops: [0.5],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'cereal is soup. | DISCUSS.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, col: ACC, tail: 'bl' })
      L(x, 790, 880, `UNREAD: ${Math.round(140 * ease.inQuad(prog(lt, 0.8, 2.0)))}`, pop01(t, P.t0 + 0.8, 0.3, 2), GOLD, 0.04, 34)
      L(x, 790, 1040, 'CHAT: ALIVE AGAIN', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'They started typing. | Aries *replied first.*', mood: lt => lt > 1.0 ? 'sparkle' : 'squint', star: ST,
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'THEM', headCol: LAV, lines: [
        ['• • •', '#9aa5c4', pop01(t, P.t0 + 0.4, 0.25, 2.2)],
        ['YES. agreed.', ACC, pop01(t, P.t0 + 0.9, 0.25, 2.2), true],
        ['i didn’t say', '#9aa5c4', pop01(t, P.t0 + 1.5, 0.25, 2.2)],
      ] })
    } },
  { sign: S, cap: 'Thumb speed: | *a safety hazard.*', mood: 'wide', star: ST, hops: [0.3, 0.5, 0.7, 0.9, 1.1],
    front(x, t, lt, P) {
      phone(x, 800 + 4 * Math.sin(t * 50), 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'TYPING', headCol: GOLD, lines: [['OMG', ACC, pop01(t, P.t0 + 0.4, 0.2, 2), true], ['WAIT', ACC, pop01(t, P.t0 + 0.6, 0.2, 2), true], ['ALSO', ACC, pop01(t, P.t0 + 0.8, 0.2, 2), true], ['AND', ACC, pop01(t, P.t0 + 1.0, 0.2, 2), true]] })
      sparkles(x, t, 800, 860, P.t0 + 0.6, 8, 180, 0.3, [GOLD, ACC, BONE]); sparkles(x, t, 800, 860, P.t0 + 1.2, 8, 200, 0.8, [GOLD, ACC, BONE])
      L(x, 800, 1110, 'SPEED: TOO MUCH', pop01(t, P.t0 + 1.3, 0.3, 2.4), ACC, -0.04, 32)
    } },
  { sign: S, cap: 'Planned a whole trip | *in one text.*', mood: 'sparkle', star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'beach. today. | leaving in 20. | PACK.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, col: ACC, tail: 'bl' })
      L(x, 790, 1040, 'PLANNING: 4 SEC', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Got a “k.” | *Took it personally.*', mood: lt => lt > 0.8 ? 'squint' : 'wide', star: ST,
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'THEM', headCol: LAV, lines: [
        ['k', '#9aa5c4', pop01(t, P.t0 + 0.4, 0.25, 2.2)],
        ['K???', ACC, pop01(t, P.t0 + 0.9, 0.25, 2.2), true],
        ['WHAT IS K', ACC, pop01(t, P.t0 + 1.2, 0.25, 2.2), true],
        ['k means ok', '#9aa5c4', pop01(t, P.t0 + 1.7, 0.25, 2.2)],
      ] })
    } },
  { sign: S, cap: 'New match? | *Texted first.* Obviously.', mood: lt => lt > 1.0 ? 'heart' : 'sparkle', star: ST, hops: [0.6],
    front(x, t, lt, P) {
      L(x, 790, 650, '✦ NEW MATCH', pop01(t, P.t0 + 0.2, 0.3, 2), GOLD, -0.05, 38)
      phone(x, 800, 900, pop01(t, P.t0 + 0.5, 0.3, 2), { head: 'LIBRA ♎︎', headCol: PINK, lines: [
        ['hi!! your sign?', ACC, pop01(t, P.t0 + 0.7, 0.25, 2.2), true],
        ['matched 1s ago', '#9aa5c4', pop01(t, P.t0 + 1.3, 0.25, 2.2)],
      ] })
      hearts(x, t, 560, 860, P.t0 + 1.4, { n: 4, life: 1.4, spread: 140, cell: 7, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'r2t0310', key: 'F', accent: ACC, solo: 'aries', ending: 'callback',
  title: 'Aries texting | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Fast thumbs. | *Faster heart.*', mood: 'sparkle' },
  last: {
    text: 'Voice note back: | *ten minutes.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'aries', 380, 1080, 280 * k, { mood: lt > 1.3 ? 'heart' : 'wide', look: [1, 0], seed: 7, hops: [t0 + 1.3, t0 + 1.7, t0 + 2.1] })
      voice(x, t, 740, 1060, 0.9 * pop01(t, t0 + 0.6, 0.4, 2), '10:02', MINT)
      if (lt > 1.3) L(x, 740, 1200, 'ARIES: THRILLED', pop01(t, t0 + 1.3, 0.3, 2.4), GOLD, 0.04, 30)
      if (lt > 1.5) hearts(x, t, 380, 960, t0 + 1.5, { n: 6, life: 1.6, spread: 220, cell: 8, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
