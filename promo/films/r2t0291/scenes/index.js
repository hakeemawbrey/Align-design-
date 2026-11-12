// r2t0291: star_talk, ROLLCALL, "The signs | slow dancing." (~54 s vertical, signs3kit social cut, music: lofi · C)
//   0.0–3.6    "The signs | *slow dancing.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one slow dance each (3.8 s per sign), each pushed to the extreme:
//              ♈ turned it into a race · ♉ fell asleep mid-sway · ♊ asked their partner's sign, then their rising, then…
//              · ♋ asked for one more song, eleven times · ♌ brought their own spotlight · ♍ counted every step out loud
//              · ♎ couldn't pick a partner, danced with three · ♏ eye contact, zero blinks · ♐ dipped their partner way too low
//              · ♑ put the dance in their calendar · ♒ dancing to a different song · ♓ cried on their partner's shoulder
//  49.2        group ending: "Zero rhythm. | *Full hearts.*"  A disco ball drops over the group photo, hearts float up.
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'
import { card, txt, chart, beam, CREAM, RED, ORANGE, GREY, DEEP, clamp, ease, lerp, prog } from './props.js'

const ACC = PINK
const ST = { x: -170 }
const lab = (x, cx, cy, s, k, o = {}) => label(x, cx, cy, s, k, { size: 32, font: MONO, weight: 700, ...o })
const sway = (t, a = 14) => Math.sin(t * 2.2) * a

/** a dance partner: a second star at (cx, cy), swaying, sized by k */
function partner(x, t, id, cx, cy, s, k, o = {}) {
  if (k <= 0.01) return null
  return signChar(x, t, id, cx + sway(t, o.sway ?? 12), cy, s * k, { mood: 'happy', look: [-1, 0], seed: 30, glyph: false, ...o })
}
const BALL = ['...KKKK...', '..KWSWSK..', '.KSWSWSWK.', 'KWSWSWSWSK', 'KSWSWSWSWK', 'KWSWSWSWSK', '.KSWSWSWK.', '..KWSWSK..', '...KKKK...']
const BALL_C = { K: INK, W: '#e8e8f4', S: '#9aa5c4' }
const ZZ = ['KKKK', '..K.', '.K..', 'KKKK']
const FLAG = ['KWKWKW', 'WKWKWK', 'KWKWKW', 'WKWKWK']
const FOOT = ['.KK.', 'KKKK', 'KKKK', 'KKKK', '.KK.', '....', '.KK.', '.KK.']
const HEADPH = ['..KKKKKK..', '.K......K.', 'K........K', 'K........K', 'KRR....RRK', 'KRR....RRK', 'KRR....RRK']

const CAMEOS = [
  { sign: 'aries', cap: 'Slow dance? | Made it a *race.*', mood: lt => lt > 1.0 ? 'squint' : 'sparkle', star: ST, hops: [0.6, 1.0, 1.4, 1.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      if (lt > 0.4) { x.save(); x.globalAlpha = clamp((lt - 0.4) * 3) * 0.7; x.fillStyle = BONE; for (let i = 0; i < 5; i++) x.fillRect(130 + ((lt * 600 + i * 90) % 160), 760 + i * 50, 90 - i * 8, 8); x.restore() }
    },
    front(x, t, lt, P) {
      drawBits(x, FLAG, { K: INK, W: '#ffffff' }, 800, 700, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 })
      partner(x, t, 'libra', 800, 980, 170, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: lt > 1.0 ? 'wide' : 'happy', sway: 4 })
      lab(x, 800, 1140, 'LAP 3 OF 3', pop01(t, P.t0 + 1.1, 0.3, 2.4), { bg: RED, color: BONE, rot: -0.05 })
    } },
  { sign: 'taurus', cap: 'Fell asleep | *mid-sway.*', mood: lt => lt > 0.8 ? 'sleepy' : 'happy', star: ST, squash: lt => 0.06 * ease.inOutCubic(prog(lt, 0.8, 1.4)),
    front(x, t, lt, P, F) {
      partner(x, t, 'cancer', 790, 960, 200, pop01(t, P.t0 + 0.25, 0.35, 2), { mood: lt > 1.3 ? 'wide' : 'happy', sway: 6 })
      for (let i = 0; i < 3; i++) { const ph = ((lt * 0.6 + i / 3) % 1); if (lt > 0.9) drawBits(x, ZZ, { K: BONE }, F.x + 90 + ph * 90, F.cy - 160 - ph * 160, 8 + i * 3, { alpha: Math.sin(Math.PI * ph) }) }
      lab(x, 790, 700, 'SNORING: ON BEAT', pop01(t, P.t0 + 1.4, 0.3, 2.4), { bg: LAV, rot: 0.04 })
    } },
  { sign: 'gemini', cap: 'Asked their sign. | Then their *rising.*', mood: 'sparkle', star: ST, hops: [1.0],
    front(x, t, lt, P) {
      partner(x, t, 'capricorn', 810, 1000, 180, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: lt > 1.4 ? 'sleepy' : 'happy' })
      const qs = ["what's your sign?", 'and your rising?', 'and your MOON?']
      const n = lt < 0.5 ? 0 : lt < 1.0 ? 1 : lt < 1.5 ? 2 : 3
      if (n > 0) bubble(x, 700, 640, qs[n - 1], pop01(t, P.t0 + [0.5, 1.0, 1.5][n - 1], 0.25, 2.2), { size: 40, tail: 'bl' })
      chart(x, 860, 780, 70, pop01(t, P.t0 + 1.5, 0.35, 2), t)
    } },
  { sign: 'cancer', cap: '"One more song." | *Eleven times.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: ST,
    front(x, t, lt, P) {
      partner(x, t, 'aquarius', 800, 990, 180, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: lt > 1.6 ? 'sleepy' : 'happy' })
      notes(x, t, 600, 760, { n: 4, cell: 7, col: PINK, seed: 3 })
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.6) * 10)
      lab(x, 800, 690, `SONG ${n} OF "ONE"`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 34, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'leo', cap: 'Brought their | *own spotlight.*', mood: 'sparkle', star: { x: -40 }, hops: [1.1],
    back(x, t, lt, P) { beam(x, 500, 470, 500, 1150, 210, ease.outCubic(prog(lt, 0.2, 0.6)), { a: 0.36 }) },
    front(x, t, lt, P) {
      partner(x, t, 'virgo', 820, 1010, 150, pop01(t, P.t0 + 0.4, 0.35, 2), { mood: 'squint', sway: 3 })
      lab(x, 790, 1150, '(partner in the dark)', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 26, bg: GREY, rot: 0.04 })
      sparkles(x, t, 500, 760, P.t0 + 0.6, 7, 190, 0.3)
    } },
  { sign: 'virgo', cap: 'Counted every step. | *Out loud.*', mood: 'squint', look: [0, 1], star: ST,
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.2) / 1.8) * 6)
      for (let i = 0; i < n; i++) drawBits(x, FOOT, { K: i % 2 ? '#b7a6ff' : BONE }, 680 + (i % 2) * 90, 1150 - i * 70, 7, { rot: i % 2 ? 0.2 : -0.2 })
      const cnt = ['1, 2, 3…', '1, 2, 3…', '4, 5, 6…', '7, 8!!']
      bubble(x, 800, 650, cnt[Math.min(3, Math.floor(lt / 0.6))], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      lab(x, 820, 820, 'ROMANCE: 0 / 8', pop01(t, P.t0 + 1.4, 0.3, 2.4), { bg: MINT, rot: 0.05 })
    } },
  { sign: 'libra', cap: "Couldn't pick a partner. | *Danced with three.*", mood: 'heart', star: ST, hops: [0.9, 1.7],
    front(x, t, lt, P) {
      const ids = ['gemini', 'leo', 'aquarius']
      ids.forEach((id, i) => partner(x, t, id, 690 + i * 120, 1010 - (i % 2) * 70, 130, pop01(t, P.t0 + 0.2 + i * 0.25, 0.35, 2), { seed: 31 + i, mood: 'heart', sway: 8 }))
      lab(x, 810, 700, "IT'S A MATCH ×3", pop01(t, P.t0 + 1.2, 0.3, 2.4), { bg: PINK, rot: -0.04 })
      hearts(x, t, 810, 900, P.t0 + 1.2, { n: 5, life: 1.6, spread: 260, cell: 7, seed: 5 })
    } },
  { sign: 'scorpio', cap: 'Eye contact. | *Zero blinks.*', mood: 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      partner(x, t, 'pisces', 800, 980, 190, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: lt > 1.2 ? 'wide' : 'happy', tears: 1 })
      card(x, 800, 690, 290, 120, pop01(t, P.t0 + 0.4, 0.3, 2), { bg: DEEP, rot: 0.03 }, () => {
        txt(x, 'BLINKS: 0', 0, -12, { size: 46, font: MONO, weight: 700, color: BONE })
        txt(x, `${Math.floor(clamp(lt / 2.2) * 180)} sec`, 0, 34, { size: 24, font: MONO, weight: 700, color: GREY })
      })
    } },
  { sign: 'sagittarius', cap: 'Dipped their partner. | *Way too low.*', mood: lt => lt > 1.0 ? 'wide' : 'sparkle', star: ST, hops: [0.8],
    front(x, t, lt, P) {
      const d = ease.outCubic(prog(lt, 0.6, 1.1))
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(740, 990 + 70 * d); x.rotate(-1.35 * d); x.translate(-760, -1000)
        signChar(x, t, 'taurus', 760, 1000, 190 * k, { mood: d > 0.6 ? 'wide' : 'happy', look: [-1, 0], seed: 33, glyph: false })
        x.restore()
      }
      lab(x, 800, 690, 'FLOOR: TOUCHED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { bg: ORANGE, rot: 0.05 })
    } },
  { sign: 'capricorn', cap: 'Scheduled the dance. | *8:14 to 8:17.*', mood: 'neutral', star: ST,
    front(x, t, lt, P) {
      card(x, 790, 820, 300, 330, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: -0.04 }, () => {
        x.fillStyle = RED; x.fillRect(-150, -165, 300, 58); txt(x, 'TONIGHT', 0, -136, { size: 30, font: MONO, weight: 700, color: BONE })
        txt(x, '8:00  arrive', -130, -64, { size: 26, font: MONO, weight: 700, align: 'left' })
        x.fillStyle = '#ffe066'; x.fillRect(-140, -26, 280, 52); txt(x, '8:14  dance', -130, 0, { size: 26, font: MONO, weight: 700, align: 'left' })
        txt(x, '8:17  emails', -130, 64, { size: 26, font: MONO, weight: 700, align: 'left' })
      })
      lab(x, 790, 1100, 'ROMANCE: ON TIME', pop01(t, P.t0 + 1.4, 0.3, 2.4), { bg: GOLD, rot: 0.04 })
    } },
  { sign: 'aquarius', cap: 'Dancing to a | *different song.*', mood: 'sparkle', star: { x: -170 }, hops: [0.7, 1.2, 1.7],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, HEADPH, { K: INK, R: SKYB }, F.x, F.cy - 40, 30 * k, { outline: null })
      notes(x, t, F.x + 40, F.cy - 120, { n: 3, cell: 7, col: MINT, seed: 1 })
      partner(x, t, 'scorpio', 810, 990, 180, pop01(t, P.t0 + 0.4, 0.35, 2), { mood: 'squint', sway: 3 })
      bubble(x, 810, 690, 'this is | whale sounds', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Cried on their | *partner’s shoulder.*', mood: 'wide', tears: lt => lt > 0.8 ? 3 : 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      partner(x, t, 'cancer', 790, 980, 200, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: 'heart', sway: 6 })
      if (lt > 0.9) { x.save(); x.globalAlpha = clamp((lt - 0.9) * 2); x.fillStyle = SKYB; x.beginPath(); x.ellipse(790, 1110, 130 * clamp((lt - 0.9) * 1.2), 22, 0, 0, Math.PI * 2); x.fill(); x.restore() }
      lab(x, 790, 690, 'SHOULDER: SOAKED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { bg: SKYB, rot: -0.04 })
    } },
]

const F = makeFilm({
  id: 'r2t0291', key: 'C', accent: ACC, ending: 'group',
  title: 'The signs | *slow dancing.*',
  cameos: CAMEOS,
  group: {
    cap: 'Zero rhythm. | *Full hearts.*',
    draw(x, t, lt) {
      const d = ease.outBack ? ease.outBack(clamp((lt - 0.4) / 0.7)) : ease.outCubic(clamp((lt - 0.4) / 0.7))
      if (lt > 0.4) {
        x.fillStyle = BONE; x.fillRect(537, 300, 6, 300 * d - 90)
        drawBits(x, BALL, BALL_C, 540, 300 + 300 * d, 22, { rot: t * 0.6 })
        if (lt > 1.0) for (let i = 0; i < 10; i++) { const a = t * 0.8 + i * 0.63; x.fillStyle = `rgba(255,241,200,${(0.5 + 0.4 * Math.sin(t * 5 + i)).toFixed(2)})`; x.fillRect(540 + Math.cos(a) * 380, 860 + Math.sin(a) * 260, 10, 10) }
      }
      hearts(x, t, 540, 1300, t - lt + 1.4, { n: 10, life: 2.6, spread: 760, cell: 8, seed: 7 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
