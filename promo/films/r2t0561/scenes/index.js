// r2t0561: star_talk, SOLO (leo), "Leo birthdays | *be like.*" (signs3kit social cut, music: lofi · C).
// One sign the whole way: nine birthday situations, each the most extreme Leo version. Ending: callback (the statue arrives).
//   countdown started in January · sent a dress code (theme: me) · a banner, twelve feet, at work · the cake has their face
//   · reads every birthday text out loud · blew the candles out again for the photo · the chart said "iconic"
//   · asked for one gift: a statue · birthday over? half-birthday's next.
//   group "Main character. | *Extended cut.*"   last "And the statue? | *It arrived.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { drawStarChar } from '../../startalk.js'
import { note, phone, calendar, bits, ORANGE, RED, WOOD, PAPER, SLATE } from '../props.js'

const ACC = ORANGE, S = 'leo', ST = { x: -180 }
const STONE = '#c9c9d8'

// a long party banner strung across the panel
function banner(x, t, k, text) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k)
  const COLS = [GOLD, PINK, MINT, SKYB, ORANGE, LAV]
  const n = text.length, w = 84, x0 = 540 - (n * w) / 2 + w / 2
  x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath()
  for (let i = 0; i <= 30; i++) { const fx = 110 + i * 29, fy = 560 + 34 * Math.sin(Math.PI * i / 30); i ? x.lineTo(fx, fy) : x.moveTo(fx, fy) } x.stroke()
  for (let i = 0; i < n; i++) {
    const fx = x0 + i * w, fy = 560 + 34 * Math.sin(Math.PI * (fx - 110) / 870) + 4 * Math.sin(t * 3 + i)
    x.fillStyle = INK; x.beginPath(); x.moveTo(fx - 38, fy - 3); x.lineTo(fx + 38, fy - 3); x.lineTo(fx, fy + 84); x.fill()
    x.fillStyle = COLS[i % COLS.length]; x.beginPath(); x.moveTo(fx - 33, fy); x.lineTo(fx + 33, fy); x.lineTo(fx, fy + 76); x.fill()
    x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text[i], fx, fy + 26)
  }
  x.restore()
}
// a stone statue of a Leo on a plinth
function statue(x, t, cx, cy, k, size = 230, plate = 'LEO') {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-110, size * 0.42 + 8, 236, 170)
  x.fillStyle = INK; x.fillRect(-118, size * 0.42 - 8, 236, 176)
  x.fillStyle = '#a9a9bc'; x.fillRect(-110, size * 0.42, 220, 160)
  x.fillStyle = '#8b8ba0'; x.fillRect(-110, size * 0.42, 220, 18)
  x.fillStyle = GOLD; x.fillRect(-70, size * 0.42 + 64, 140, 50)
  x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(plate, 0, size * 0.42 + 90)
  drawStarChar(x, 0, 0, size, t, { color: STONE, mood: 'sparkle', glow: 0, bob: 0, seed: 5 })
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Birthday countdown? | Started in *January.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const d = Math.round(lerp(214, 199, clamp((lt - 0.4) / 1.2)))
      calendar(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), 'JANUARY 2', `${d}`, { topBg: RED })
      label(x, 790, 1060, 'DAYS TO GO', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 620, 'almost!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: S, cap: 'Sent a dress code. | Theme: *me.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      note(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), 'wear gold. | only gold. | no outshining | the host.', { head: 'DRESS CODE', headBg: GOLD, size: 34, w: 330, rot: 0.04 })
      sparkles(x, t, 790, 850, P.t0 + 1.3, 7, 200, 0.4)
    } },
  { sign: S, cap: 'Hung a banner at work. | *Twelve feet.*', mood: 'sparkle', star: { x: -150, y: 40 }, hops: [0.9, 1.7],
    back(x, t, lt, P) {
      banner(x, t, ease.outCubic(prog(lt, 0.2, 0.8)), 'HBD ME!!')
    },
    front(x, t, lt, P) {
      note(x, 800, 900, pop01(t, P.t0 + 0.4, 0.3, 2), 'Q3 report', { head: 'MEETING', headBg: SKYB, size: 32, w: 240, rot: -0.05 })
      label(x, 800, 1080, 'IT’S A WORKDAY', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'The cake? | Has *their face* on it.', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      bits(x, 'cake', 790, 960, 30 * k)
      if (k > 0.5) signChar(x, t, S, 790, 760, 190 * k, { mood: 'sparkle', seed: 31, glyph: false, glow: 0.4 })
      label(x, 790, 1120, 'EXTRA FROSTING ON ME', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 28, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Reads every birthday text. | *Out loud.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.8) * 46)
      phone(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { top: '9:41', head: `TEXT ${n} OF 47`, msg: 'happy bday | legend!', bg: GOLD, size: 34 })
      bubble(x, 800, 620, '“LEGEND!” | did you hear?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Blew out the candles. | *Again,* for the photo.', mood: lt => lt > 1.0 ? 'wink' : 'happy', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'cake', 800, 980, 24 * k)
      const take = 1 + Math.min(5, Math.floor(clamp((lt - 0.4) / 1.6) * 6))
      label(x, 800, 720, `TAKE ${take}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 48, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
      if (k > 0.5) for (let i = 0; i < 3; i++) { const ph = ((t * 0.8 + i / 3) % 1); x.save(); x.globalAlpha = 0.6 * Math.sin(Math.PI * ph); x.fillStyle = BONE; x.fillRect(750 + i * 48 + Math.sin(ph * 6 + i) * 8, 880 - ph * 90, 10, 20); x.restore() }
      bubble(x, 800, 1140, 'one more!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, col: LAV, tail: 'bc' })
    } },
  { sign: S, cap: 'Checked their chart. | It said *“iconic.”*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      note(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 'sun: LEO | moon: LEO | today: | ICONIC', { head: '♌︎ MY CHART', headBg: ORANGE, size: 34, w: 320, rot: -0.04 })
      label(x, 790, 1120, 'SCREENSHOTTED. FRAMED.', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 26, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Asked for one gift. | A *statue.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      note(x, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), '1. a statue | of me | (life size)', { head: 'WISH LIST', headBg: PINK, size: 36, w: 320, rot: 0.04 })
      label(x, 790, 1060, 'NOTHING ELSE. THANKS.', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Birthday’s over? | *Half-birthday’s* next.', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.3, 1.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const half = lt > 1.0
      calendar(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), half ? 'HALF-BIRTHDAY' : 'AUGUST 9', half ? '182' : 'over', { topBg: half ? GOLD : SLATE })
      if (half) label(x, 790, 1060, 'DAYS. PLANNING NOW.', pop01(t, P.t0 + 1.0 * 1.29, 0.3, 2.2), { size: 28, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 850, P.t0 + 1.3, 7, 190, 0.6)
    } },
]

const F = makeFilm({
  id: 'r2t0561', key: 'C', accent: ACC, solo: S, ending: 'callback',
  title: 'Leo birthdays | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Main character. | *Extended cut.*', mood: 'sparkle' },
  last: {
    text: 'And the statue? | *It arrived.*',
    draw(x, t, lt) {
      statue(x, t, 730, 960, pop01(t, t - lt + 0.5, 0.45, 1.8) * 1.35, 220, 'ME')
      const k = pop01(t, t - lt + 0.3, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, S, 330, 1120, 300 * k, { mood: lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], seed: 12, hops: [t - lt + 1.4] })
      sparkles(x, t, 730, 950, t - lt + 1.2, 8, 230, 0.2)
      hearts(x, t, 330, 1000, t - lt + 1.5, { n: 5, life: 2.0, spread: 200, cell: 7, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
