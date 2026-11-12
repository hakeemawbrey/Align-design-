// r2t0257: star_talk, SOLO, "Libras when mad | be like." (~45 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole way through (makeFilm solo mode, 9 cards): an angry Libra, which is to say, an extremely polite one.
//   0.0–3.6    "Libras when mad | *be like.*"  One big Libra pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              furious, texted "no worries!" · angry text drafted, deleted fourteen times · slammed the door, gently
//              · silent treatment lasted four minutes · made a pro/con list about being mad · rage-cleaned, now it's aesthetic
//              · asked the group chat to vote, it's a tie · mad at their match, sent a heart anyway
//              · the big confrontation: a strongly worded compliment
//  37.8        "Peace at | *any cost.*"  Libra comes back, big.
//  41.2        callback: "Draft fifteen? | *“haha all good!”*"  The drafts phone comes back, and this one sends.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ROSE = '#ff9ad0', RED = '#e23d4e', CREAM = '#fff4e2', GREEN = '#5fd068'
const S = 'libra'

// ── props
const DOOR = [
  'KKKKKKKKKK',
  'KWWWWWWWWK',
  'KWwwwwwwWK',
  'KWwWWWWwWK',
  'KWwWWWWwWK',
  'KWwwwwwwWK',
  'KWWWWWWWWK',
  'KWWWWWWGWK',
  'KWWWWWWWWK',
  'KWwwwwwwWK',
  'KWwWWWWwWK',
  'KWwWWWWwWK',
  'KWwwwwwwWK',
  'KWWWWWWWWK',
]
const DOOR_C = { K: INK, W: '#c98f6a', w: '#a8704a', G: GOLD }
const VASE = ['..F.F..', '.FFFFF.', '..FGF..', '...G...', '..GGG..', '.VVVVV.', 'VVvVVVV', 'VVVVvVV', '.VVVVV.', '..VVV..']
const VASE_C = { F: ROSE, G: GREEN, V: SKYB, v: '#5fb0d8' }
const PUFF = ['.RR.', 'RRRR', 'RRRR', '.RR.']

// little red angry puffs over the star's head
function steam(x, t, F, k) {
  if (k <= 0.01) return
  for (let i = 0; i < 3; i++) {
    const ph = ((t * 1.4 + i / 3) % 1 + 1) % 1
    drawBits(x, PUFF, { R: i % 2 ? '#ff6b6b' : RED }, F.x + (i - 1) * 60 + Math.sin(ph * 6 + i) * 8, F.top - 10 - ph * 90, 13 * k, { alpha: Math.sin(Math.PI * ph), outline: null })
  }
}
// a phone, face up: a header and up to three chips
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, strike], i) => {
    if (kk <= 0.01) return
    x.save(); x.translate(i % 2 ? 14 : -14, -60 + i * 66); x.scale(kk, kk)
    x.font = `800 26px ${INTER}`; const w = x.measureText(txt).width + 30
    x.fillStyle = col; x.fillRect(-w / 2, -26, w, 52); x.fillStyle = INK; x.fillText(txt, 0, 2)
    if (strike > 0) { x.fillStyle = RED; x.fillRect(-w / 2 + 6, -3, (w - 12) * strike, 7) }
    x.restore()
  })
  x.restore()
}
// a lined notepad with two columns
function proCon(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -170, 316, 356)
  x.fillStyle = INK; x.fillRect(-162, -182, 324, 364)
  x.fillStyle = CREAM; x.fillRect(-154, -174, 308, 348)
  x.fillStyle = '#b8c8e8'; for (let i = 0; i < 6; i++) x.fillRect(-154, -80 + i * 46, 308, 3)
  x.fillStyle = RED; x.fillRect(-2, -140, 4, 300)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('BEING MAD', 0, -146)
  x.font = `800 26px ${INTER}`; x.fillText('PRO', -76, -104); x.fillText('CON', 76, -104)
  const P = ['justified', 'valid'], C = ['awkward', 'rude?', 'tense', 'eek']
  x.font = `700 22px ${MONO}`
  P.forEach((s, i) => { if (lt > 0.5 + i * 0.25) x.fillText(s, -76, -58 + i * 46) })
  C.forEach((s, i) => { if (lt > 0.7 + i * 0.22) x.fillText(s, 76, -58 + i * 46) })
  x.restore()
}
// a group-chat poll that ends in a perfect tie
function poll(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-160, -130, 336, 280)
  x.fillStyle = INK; x.fillRect(-172, -142, 344, 284)
  x.fillStyle = '#2a2350'; x.fillRect(-164, -134, 328, 268)
  x.fillStyle = CREAM; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('Am I mad?', 0, -92)
  const g = ease.outCubic(prog(lt, 0.5, 1.4))
  ;[['YES', PINK, -20], ['NO', MINT, 60]].forEach(([s, col, y]) => {
    x.fillStyle = '#140c30'; x.fillRect(-140, y - 26, 280, 52)
    x.fillStyle = col; x.fillRect(-140, y - 26, 280 * 0.5 * g, 52)
    x.fillStyle = CREAM; x.font = `800 26px ${INTER}`; x.textAlign = 'left'; x.fillText(s, -126, y + 2)
    x.textAlign = 'center'
  })
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Absolutely furious. | Texted *“no worries!”*', mood: 'happy', star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P, F) {
      steam(x, t, F, ease.outCubic(prog(lt, 0.2, 0.6)))
      phone(x, 800, 860, pop01(t, P.t0 + 0.3, 0.3, 2), { head: 'SENT', headCol: MINT, lines: [['no worries!! ♡', MINT, pop01(t, P.t0 + 0.7, 0.25, 2.2)]] })
      label(x, 800, 1110, '(WORRIES: MANY)', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: RED, color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Angry text drafted. | Deleted *fourteen times.*', mood: lt => lt > 1.6 ? 'squint' : 'neutral', look: [1, 1], star: { x: -180 },
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.4) * 13)
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: `DRAFT ${n}`, headCol: GOLD, lines: [['we need to talk', BONE, pop01(t, P.t0 + 0.4, 0.25, 2.2), ((lt * 1.4) % 1)]] })
      label(x, 800, 1110, 'NEVER SENT', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Slammed the door. | *Gently.*', mood: lt => lt > 1.1 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      if (lt < 1.1) steam(x, t, F, 1)
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const close = ease.inOutCubic(prog(lt, 0.5, 1.1))
      drawBits(x, DOOR, DOOR_C, 800, 870, 26 * k, { sx: lerp(0.35, 1, close) })
      label(x, 800, 590, 'click.', pop01(t, P.t0 + 1.15, 0.3, 2.4), { size: 40, bg: BONE, rot: 0.05 })
      bubble(x, 800, 1130, 'sorry, door ♡', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'The silent treatment? | Lasted *four minutes.*', mood: lt => lt > 1.6 ? 'sparkle' : 'squint', look: [-1, 0], star: { x: -180 }, hops: [1.7],
    front(x, t, lt, P) {
      const s = Math.floor(clamp((lt - 0.3) / 1.3) * 240)
      label(x, 800, 820, `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 80, bg: BONE, rot: 0.03, font: MONO, weight: 700 })
      label(x, 800, 690, 'SILENCE', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1060, 'anyway, HI!!', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: S, cap: 'Made a pro/con list | about *being mad.*', mood: 'squint', look: [1, 0], star: { x: -190 }, hops: [1.6],
    front(x, t, lt, P) {
      proCon(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1100, 'RESULT: UNDECIDED', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Rage-cleaned the house. | Now it’s *aesthetic.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P, F) {
      if (lt < 1.1) steam(x, t, F, 1)
      drawBits(x, VASE, VASE_C, 790, 870, 30 * pop01(t, P.t0 + 0.5, 0.35, 2))
      sparkles(x, t, 790, 860, P.t0 + 1.1, 8, 200, 0.3)
      label(x, 790, 620, 'FURIOUS DECOR', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: ROSE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Asked the group chat | to *vote on it.*', mood: lt => lt > 1.4 ? 'wide' : 'neutral', look: [1, 0], star: { x: -190 }, hops: [1.5],
    front(x, t, lt, P) {
      poll(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1060, 'TIE. AGAIN.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Mad at their match. | Sent *a heart anyway.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -180 }, hops: [1.5],
    front(x, t, lt, P, F) {
      if (lt < 1.3) steam(x, t, F, 1)
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ YOUR MATCH', headCol: ROSE, lines: [
        ['you were late', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2)], ['…', BONE, pop01(t, P.t0 + 0.9, 0.25, 2.2)], ['♡', PINK, pop01(t, P.t0 + 1.4, 0.25, 2.6)],
      ] })
      hearts(x, t, 380, 800, P.t0 + 1.5, { n: 4, life: 1.5, spread: 150, cell: 7, seed: 8 })
    } },
  { sign: S, cap: 'The big confrontation? | A *stern compliment.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aries', 820, 990, 190 * k, { mood: lt > 1.6 ? 'heart' : 'wide', look: [-1, 0], seed: 19, glyph: false })
      bubble(x, 560, 640, 'your shoes | are… NICE.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, tail: 'bc' })
      label(x, 800, 720, 'DEVASTATING', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: RED, color: CREAM, rot: 0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0257', key: 'E', accent: ROSE, solo: S, ending: 'callback',
  title: 'Libras when mad | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Peace at | *any cost.*', mood: 'sparkle' },
  last: {
    text: 'Draft fifteen? | *“haha all good!”*',
    draw(x, t, lt) {
      const t0 = t - lt
      phone(x, 520, 1000, 1.3 * pop01(t, t0 + 0.5, 0.35, 2), { head: 'DRAFT 15', headCol: GOLD, rot: -0.03, lines: [
        ['haha all good!', MINT, pop01(t, t0 + 0.9, 0.25, 2.2)], ['SENT ✓', BONE, pop01(t, t0 + 1.5, 0.25, 2.4)],
      ] })
      signChar(x, t, S, 790, 1230, 200 * pop01(t, t0 + 0.7, 0.35, 2), { mood: lt > 1.6 ? 'happy' : 'squint', look: [-1, -1], seed: 33, glyph: false, hops: [t0 + 1.7] })
      sparkles(x, t, 540, 980, t0 + 1.6, 7, 200, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
