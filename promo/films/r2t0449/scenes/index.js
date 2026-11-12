// r2t0449: star_talk, SOLO, "Your Scorpio | coworker *be like.*" (~51 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole film (solo mode, 9 cards): the most extreme Scorpio-at-work moments. Ending: lesson.
//   3.6–37.8   desk: completely empty · knows the gossip before it happens · camera off, two eyes in the dark
//              · one-word emails, terrifying · stares through your slides · remembers your coffee from one mention
//              · quietly fixed your mistake · no small talk, deep talk · someone was rude to you? bodyguard mode
//  37.8        "Mysterious. Loyal. | *Secretly sweet.*"
//  41.0        LESSON: "Give them space. | Get *a loyal ally.*"  ALLY: ACQUIRED
//  46.9        "Still don’t know | their *first name.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { sheet, phone, BM, RED, CREAM, ORANGE, WOOD, GREEN, PURPLE, SLATE } from './props.js'

const S = 'scorpio', SC = '#e0457b'

/** a laptop: screen w×h with `inner` drawn on it */
function laptop(x, cx, cy, k, inner) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -130, 340, 230)
  x.fillStyle = '#2a2350'; x.fillRect(-160, -120, 320, 210)
  x.fillStyle = '#05040c'; x.fillRect(-146, -106, 292, 182)
  x.save(); x.beginPath(); x.rect(-146, -106, 292, 182); x.clip(); if (inner) inner(x); x.restore()
  x.fillStyle = INK; x.fillRect(-200, 100, 400, 30); x.fillStyle = '#a9a9bf'; x.fillRect(-192, 104, 384, 18)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Their desk? | *Completely empty.*', mood: 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(790, 1000); x.scale(k, k); x.fillStyle = INK; x.fillRect(-180, -16, 360, 32); x.fillRect(-160, 10, 20, 120); x.fillRect(140, 10, 20, 120); x.fillStyle = WOOD; x.fillRect(-172, -10, 344, 20); x.restore() }
      label(x, 790, 720, 'PERSONAL ITEMS: 0', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 850, 'HIRED: 6 YEARS AGO', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: SC, color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Knows the office gossip. | *Before it happens.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 780, 700, 'they’ll announce | it friday.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      label(x, 790, 900, 'TODAY: MONDAY', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1020, 'CORRECT. AGAIN.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Camera off. | *Every meeting.*', mood: 'neutral', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      laptop(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), x => {
        if (lt > 0.9) { const bl = Math.floor(lt * 4) % 5 === 0 ? 0.2 : 1; x.fillStyle = SC; x.fillRect(-50, -24, 34, 34 * bl); x.fillRect(16, -24, 34, 34 * bl) }
        x.fillStyle = BONE; x.font = `700 22px ${MONO}`; x.textAlign = 'left'; x.fillText('SCORPIO (VIDEO OFF)', -134, 62)
      })
      label(x, 790, 1110, 'WATCHING. ALWAYS.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: SC, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'One-word emails. | *Somehow terrifying.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 780, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, h: 320, head: 'RE: YOUR IDEA', headCol: SLATE, size: 64, align: 'center', font: INTER, rows: [['', INK], ['ok.', INK, pop01(t, P.t0 + 0.8, 0.25, 2.4)]] })
      label(x, 790, 1080, 'TEAM: PANICKING', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Glances at your slides. | *Sees every typo.*', mood: 'squint', look: [1, 0], star: { x: -190 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.6, 0.3, 2)
      if (k > 0.01) { x.save(); x.globalAlpha = 0.35 * k; x.fillStyle = SC; x.beginPath(); x.moveTo(400, 840); x.lineTo(660, 740); x.lineTo(660, 960); x.closePath(); x.fill(); x.restore() }
    },
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 260, head: 'SLIDE 3', headCol: GOLD, size: 28, rows: [
        ['revenu', INK], ['teh plan', INK], ['2 typos ✗', RED, pop01(t, P.t0 + 1.2, 0.2, 2)],
      ] })
      label(x, 800, 1060, 'X-RAY: ON', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 36, bg: SC, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Mentioned your coffee once. | *They remembered.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, BM.MUG, BM.MUG_C, 790, 900, 22 * pop01(t, P.t0 + 0.4, 0.3, 2))
      label(x, 790, 700, 'OAT. NO FOAM. ✓', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1070, '(that was march)', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Quietly fixed your mistake. | *Never said a word.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const fixed = lt > 1.0
      sheet(x, 780, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 280, head: 'YOUR REPORT', headCol: SLATE, size: 34, rows: [
        [fixed ? 'total: ✓' : 'total: ✗', fixed ? GREEN : RED], [fixed ? 'dates: ✓' : 'dates: ✗', fixed ? GREEN : RED],
      ] })
      bubble(x, 790, 1080, 'shh.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 50, col: LAV, tail: 'bl' })
    } },
  { sign: S, cap: 'No small talk. | *Only deep talk.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'nice weather, | huh?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, col: BONE, tail: 'br' })
      bubble(x, 760, 920, 'what is your | biggest fear?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: SC, ink: INK, tail: 'bl' })
      label(x, 790, 1110, 'IT’S 9 A.M.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Someone was rude to you? | *Bodyguard mode.*', mood: lt => lt > 1.0 ? 'squint' : 'neutral', look: [1, 0], star: { x: -150 }, squash: lt => lt > 1.0 ? -0.04 : 0,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'pisces', 790, 960, 170 * k, { mood: 'wide', look: [-1, 0], seed: 44, glyph: false, tears: 1 })
      bubble(x, 760, 680, 'who said that?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 42, col: SC, tail: 'bl' })
      label(x, 790, 1130, 'PROTECTED ✓', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0449', key: 'D', accent: SC, solo: S, ending: 'lesson',
  title: 'Your Scorpio | coworker *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Mysterious. Loyal. | *Secretly sweet.*', mood: 'wink' },
  lesson: { text: 'Give them space. | Get *a loyal ally.*', chip: 'ALLY: ACQUIRED' },
  last: { text: 'Still don’t know | their *first name.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
