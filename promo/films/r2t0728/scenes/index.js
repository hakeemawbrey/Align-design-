// r2t0728: star_talk, BELIKE, "Zodiacs sneezing | in silence *be like.*" (the batch hook, tightened to fit two lines) (signs3kit social cut, lofi · G).
// Ending: callback (Libra is still apologizing).
//   ♈ sneezed so hard the lights flickered · ♉ held it in for forty minutes · ♊ sneezed mid-sentence, kept talking
//   · ♋ said "bless you" to themself · ♌ sneezed, got three new matches · ♍ sanitized the whole room
//   · ♎ apologized to every single person · ♏ sneezed silently, nobody knows · ♐ laughed for ten minutes
//   · ♑ scheduled the sneeze for lunch · ♒ sneezed in a new language · ♓ nobody said bless you, cried
//   group "Bless you. | *All twelve of you.*" · last "Libra is | *still apologizing.*"
import { makeFilm, signChar, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, swapLabel, B, C, RED, CREAM, STEEL, WOOD, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff'
const shake = (t, lt, at, d = 0.5, a = 14) => (lt > at && lt < at + d ? Math.sin(t * 70) * a * (1 - (lt - at) / d) : 0)
/** an "ACHOO!" burst */
function achoo(x, cx, cy, k, size = 64, col = BONE) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.06); x.scale(k, k)
  x.font = `900 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.lineWidth = 12; x.strokeStyle = INK; x.lineJoin = 'round'; x.strokeText('ACHOO!', 0, 0)
  x.fillStyle = col; x.fillText('ACHOO!', 0, 0)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Sneezed so hard | the *lights flickered.*', mood: lt => lt > 0.7 ? 'wide' : 'squint', star: { x: -170 }, squash: lt => lt > 0.7 && lt < 0.9 ? 0.18 : 0,
    back(x, t, lt, P) {
      const on = !(lt > 0.7 && lt < 1.6 && Math.floor(t * 12) % 2)
      bits(x, 'LAMP', 790, 700, 20 * pop01(t, P.t0 + 0.15, 0.3, 2), { alpha: on ? 1 : 0.25 })
      if (on && lt > 0.2) { x.save(); x.globalAlpha = 0.18; x.fillStyle = '#ffe76a'; x.beginPath(); x.moveTo(740, 740); x.lineTo(840, 740); x.lineTo(940, 1120); x.lineTo(640, 1120); x.closePath(); x.fill(); x.restore() }
    },
    front(x, t, lt, P) {
      achoo(x, 790 + shake(t, lt, 0.7), 940, pop01(t, P.t0 + 0.7 * 1.29, 0.25, 2.6), 72, '#ff6b5a')
      L(x, 790, 1110, 'VOLUME: MAXIMUM', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: 'taurus', cap: 'Held it in. | For *forty minutes.*', mood: 'squint', star: { x: -160 }, squash: lt => 0.04 * Math.sin(lt * 9),
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 790, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 690, 'HOLDING: 40 MIN', pop01(t, P.t0 + 0.6, 0.3, 2.2), CREAM, -0.04, 34)
      bubble(x, 790, 1090, 'mmmMMMM', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Sneezed mid-sentence. | *Kept talking.*', mood: lt => lt > 1.0 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'so anyway my—', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      achoo(x, 790, 860, pop01(t, P.t0 + 0.6 * 1.29, 0.25, 2.6), 60, '#ffd23a')
      bubble(x, 790, 1050, '—cousin said...', pop01(t, P.t0 + 1.2 * 1.29, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Said "bless you" | *to themself.*', mood: lt => lt > 1.1 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      achoo(x, 790, 720, pop01(t, P.t0 + 0.3 * 1.29, 0.25, 2.6), 58, SKYB)
      bubble(x, 790, 920, 'bless me ♡', pop01(t, P.t0 + 1.1 * 1.29, 0.25, 2.2), { size: 46, col: PINK, tail: 'bl' })
      bits(x, 'TISSUE', 820, 1100, 12 * pop01(t, P.t0 + 1.4, 0.3, 2))
    } },
  { sign: 'leo', cap: 'Sneezed once. | Got *three new matches.*', mood: lt => lt > 1.0 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      achoo(x, 790, 680, pop01(t, P.t0 + 0.3 * 1.29, 0.25, 2.6), 58, '#ffb34a')
      for (let i = 0; i < 3; i++) L(x, 790, 860 + i * 95, '✦ NEW MATCH', pop01(t, P.t0 + 0.9 + i * 0.35, 0.3, 2.4), GOLD, i % 2 ? 0.05 : -0.05, 38)
      hearts(x, t, 560, 760, P.t0 + 1.6, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 3 })
    } },
  { sign: 'virgo', cap: 'Sanitized the room. | *The whole room.*', mood: 'squint', look: [1, 0], star: { x: -170 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      bits(x, 'SPRAY', 760, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.15 })
      if (lt > 0.5) for (let i = 0; i < 14; i++) { const ph = ((t * 1.3 + i / 14) % 1); x.save(); x.globalAlpha = (1 - ph) * 0.8; x.fillStyle = '#e6f4ff'; x.fillRect(840 + ph * 140 + Math.sin(i * 3) * 20, 800 - ph * 60 + Math.cos(i * 5) * 50, 10, 10); x.restore() }
      L(x, 790, 1120, 'SURFACES WIPED: ALL', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: 'libra', cap: 'Apologized to | *every single person.*', mood: lt => lt > 0.8 ? 'wide' : 'squint', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const spots = [[760, 660, 'so sorry!'], [860, 820, 'excuse me!'], [740, 980, 'sorry!!'], [860, 1120, 'my bad!']]
      spots.forEach(([bx, by, w], i) => bubble(x, bx, by, w, pop01(t, P.t0 + 0.4 + i * 0.35, 0.25, 2.2), { size: 36, col: i % 2 ? PINK : BONE, tail: 'bl' }))
    } },
  { sign: 'scorpio', cap: 'Sneezed silently. | *Nobody knows.*', mood: lt => lt > 1.1 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'ch.', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 30, col: LAV, tail: 'bl' })
      L(x, 790, 900, 'WITNESSES: 0', pop01(t, P.t0 + 1.0, 0.3, 2.2), LAV, -0.04, 38)
      L(x, 790, 1050, 'CASE CLOSED', pop01(t, P.t0 + 1.6, 0.3, 2.4), CREAM, 0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Sneezed. | Laughed for *ten minutes.*', mood: lt => lt > 0.9 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 }, hops: [0.9, 1.3, 1.7, 2.1],
    front(x, t, lt, P) {
      achoo(x, 790, 700, pop01(t, P.t0 + 0.4 * 1.29, 0.25, 2.6), 58, '#c97bff')
      for (let i = 0; i < 3; i++) bubble(x, 720 + i * 80, 900 + i * 90, 'HA', pop01(t, P.t0 + 1.2 + i * 0.25, 0.25, 2.2), { size: 44 + i * 6, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Scheduled the sneeze. | *For lunch.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 330, head: 'TODAY', headBg: '#2fc79a', lines: ['9:00 meeting', '12:00 lunch', '12:05 sneeze', '12:06 lunch'], size: 28, progress: clamp((lt - 0.3) / 1.2), align: 'left' })
      L(x, 790, 1120, 'ON SCHEDULE', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Sneezed in | *a new language.*', mood: lt => lt > 1.0 ? 'sparkle' : 'squint', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'ACH-ZORP!', pop01(t, P.t0 + 0.5, 0.25, 2.4), { size: 56, col: MINT, tail: 'bl' })
      L(x, 790, 960, 'TRANSLATION: UNKNOWN', pop01(t, P.t0 + 1.3, 0.3, 2.2), LAV, -0.04, 30)
      sparkles(x, t, 790, 760, P.t0 + 0.6, 7, 170, 0.5)
    } },
  { sign: 'pisces', cap: 'Nobody said bless you. | *Devastated.*', mood: lt => lt > 1.0 ? 'wide' : 'squint', tears: lt => lt > 1.0 ? 3 : 1, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      achoo(x, 790, 700, pop01(t, P.t0 + 0.3 * 1.29, 0.25, 2.6), 54, SKYB)
      L(x, 790, 880, '"BLESS YOU"S: 0', pop01(t, P.t0 + 0.9, 0.3, 2.2), STEEL, 0.04, 34)
      bits(x, 'TISSUE', 790, 1060, 16 * pop01(t, P.t0 + 1.4, 0.3, 2))
    } },
]

const F = makeFilm({
  id: 'r2t0728', key: 'G', accent: ACC, ending: 'callback',
  title: 'Zodiacs sneezing | in silence *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Bless you. | *All twelve of you.*' },
  last: {
    text: 'Libra is | *still apologizing.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.4, 2)
      if (k > 0.01) signChar(x, t, 'libra', 540, 1480, 200 * k, { mood: 'wide', look: [Math.floor(lt * 3) % 2 ? 1 : -1, 0], seed: 14, glyph: false })
      const w = ['sorry!', 'so sorry!', 'excuse me!', 'my bad!', 'sorry again!']
      w.forEach((s, i) => bubble(x, [380, 700, 450, 720, 540][i], [860, 960, 1080, 1180, 1300][i], s, pop01(t, t - lt + 0.5 + i * 0.4, 0.25, 2.2), { size: 56, col: i % 2 ? PINK : BONE, tail: i % 2 ? 'br' : 'bl' }))
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
