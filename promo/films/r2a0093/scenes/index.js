// r2a0093: star_advice, ADVICE SOLO, "How to encourage | a Leo." (~51 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Leo truth + a warm tip, one gag each.
//   0.0–3.6    "How to encourage | *a Leo.*"  One big Leo pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              clap first, clap loudest (applause meter: 11) · name one specific thing (glow for a week) · it's okay not
//              to be "on" (spotlight off, blanket on) · show up to their thing, front row · hype the rough draft (gold sticker)
//              · big roar, soft heart: leave a kind note · celebrate small wins (bed made: legend) · hype them up before
//              the first date (outfit: approved) · let them give to you too (a gift, royally wrapped)
//  37.8        "Big heart. | *Bigger cheer.*"  Leo comes back, big.
//  41.0        LESSON UNLOCKED: "Cheer for a Leo. | They’ll *cheer you back.*"  HYPE: MUTUAL
//  46.9        "The applause meter? | *Still at eleven.*"  The meter comes back, maxed.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', CREAM = '#fff4e2', WOOD = '#c98f2a', BROWN = '#8a4a2e'
const S = 'leo'

// ── props
const STICKER = ['...Y...', '..YYY..', 'YYYYYYY', '.YYYYY.', '.YY.YY.', 'Y.....Y']
const GIFT = [
  '..R...R..',
  '...R.R...',
  'PPPPRPPPP',
  'PPPPRPPPP',
  'RRRRRRRRR',
  'PPPPRPPPP',
  'PPPPRPPPP',
  'PPPPRPPPP',
]
const GIFT_C = { P: LAV, R: GOLD }
const BED = [
  'W.............',
  'WPP...........',
  'WPPBBBBBBBBBBW',
  'WBBBBBBBBBBBBW',
  'WWWWWWWWWWWWWW',
  'W............W',
]
const BED_C = { W: WOOD, P: CREAM, B: '#6fc3ff' }
const MEDAL = ['R...R', '.R.R.', '..R..', '.YYY.', 'YYYYY', 'YYYYY', '.YYY.']
const MEDAL_C = { R: RED, Y: GOLD }
const SHIRT = [
  'OOO....OOO',
  'OOOO..OOOO',
  'OOOOOOOOOO',
  '..OOOOOO..',
  '..OOYYOO..',
  '..OOOOOO..',
  '..OOOOOO..',
]
const SHIRT_C = { O: ORANGE, Y: GOLD }

/** a vertical applause meter that fills to `v` of 11 */
function meter(x, cx, cy, k, v, { h = 360 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-60, -h / 2 + 10, 136, h + 60)
  x.fillStyle = INK; x.fillRect(-72, -h / 2 - 12, 144, h + 64)
  x.fillStyle = '#2a2350'; x.fillRect(-64, -h / 2 - 4, 128, h + 48)
  const seg = h / 11
  for (let i = 0; i < 11; i++) {
    const on = i < v, y = h / 2 - (i + 1) * seg
    x.fillStyle = on ? (i >= 10 ? RED : i >= 7 ? ORANGE : MINT) : '#140c30'; x.fillRect(-48, y + 3, 96, seg - 6)
  }
  x.fillStyle = BONE; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(String(Math.round(v)), 0, h / 2 + 24)
  x.restore()
}
/** a sticky note */
function note(x, cx, cy, k, lines, { bg = '#ffd23a', rot = 0.05, size = 30 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-112, -102, 236, 220)
  x.fillStyle = INK; x.fillRect(-122, -112, 244, 224); x.fillStyle = bg; x.fillRect(-114, -104, 228, 208)
  x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, (i - (lines.length - 1) / 2) * size * 1.2))
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Clap first. | *Clap loudest.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -200 }, hops: [1.5, 1.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const v = lerp(0, 11, ease.outCubic(prog(lt, 0.3, 1.6)))
      meter(x, 800, 820, pop01(t, P.t0 + 0.15, 0.3, 2), v)
      label(x, 800, 1130, 'APPLAUSE: 11/10', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 660, P.t0 + 1.6, 8, 130, 0.3)
    } },
  { sign: S, cap: 'Name one specific thing. | *They’ll glow all week.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 },
    back(x, t, lt, P, F) {
      const g = ease.outCubic(prog(lt, 0.9, 1.8))
      if (g > 0.01) { x.save(); x.globalAlpha = 0.45 * g; const gr = x.createRadialGradient(F.x, F.cy, 20, F.x, F.cy, 320); gr.addColorStop(0, '#fff1b0'); gr.addColorStop(1, 'rgba(255,241,176,0)'); x.fillStyle = gr; x.fillRect(F.x - 330, F.cy - 330, 660, 660); x.restore() }
    },
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'your laugh fixes | my whole day', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 32, tail: 'bl' })
      label(x, 790, 980, 'GLOW: 7 DAYS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Not “on” today? | *That’s allowed.*', mood: lt => lt > 1.3 ? 'sleepy' : 'neutral', star: { x: -200, y: 20 },
    back(x, t, lt, P, F) {
      const on = 1 - ease.inOutCubic(prog(lt, 0.5, 0.9))
      if (on > 0.01) { x.save(); x.globalAlpha = 0.3 * on; x.fillStyle = '#fff1b0'; x.beginPath(); x.moveTo(F.x - 40, 490); x.lineTo(F.x + 40, 490); x.lineTo(F.x + 200, 1180); x.lineTo(F.x - 200, 1180); x.closePath(); x.fill(); x.restore() }
    },
    front(x, t, lt, P, F) {
      const b = pop01(t, P.t0 + 0.9, 0.35, 2)
      if (b > 0.01) { x.save(); x.translate(F.x, F.cy + 90); x.scale(b, b); x.fillStyle = INK; x.fillRect(-170, -60, 340, 130); x.fillStyle = PINK; x.fillRect(-162, -52, 324, 114); x.fillStyle = '#ffd1e0'; for (let i = 0; i < 5; i++) x.fillRect(-150 + i * 66, -40, 30, 90); x.restore() }
      label(x, 790, 760, 'SPOTLIGHT: OFF', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 32, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 880, 'BLANKET: ON', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Show up to their thing. | *Front row.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -220, y: -40 }, hops: [1.3],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) {
        const cx = 640 + i * 130, k = pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2)
        if (k <= 0.01) continue
        x.fillStyle = INK; x.fillRect(cx - 50, 1040, 100, 22); x.fillRect(cx - 44, 1060, 12, 80); x.fillRect(cx + 32, 1060, 12, 80)
        x.fillStyle = RED; x.fillRect(cx - 44, 1044, 88, 14)
      }
      const k = pop01(t, P.t0 + 0.5, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 770, 980, 150 * k, { mood: 'sparkle', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 1.2, P.t0 + 1.8] })
      label(x, 790, 780, 'GO LEO!!', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 44, bg: GOLD, rot: -0.05 })
      hearts(x, t, 560, 800, P.t0 + 1.4, { n: 5, life: 1.6, spread: 160, cell: 6, seed: 4 })
    } },
  { sign: S, cap: 'Hype the rough draft. | *Not just the finale.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 850); x.rotate(0.05); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -170, 300, 340); x.fillStyle = CREAM; x.fillRect(-142, -162, 284, 324)
        x.strokeStyle = '#6b62a8'; x.lineWidth = 6; x.beginPath(); x.moveTo(-100, 40); x.lineTo(-40, -60); x.lineTo(10, 20); x.lineTo(60, -90); x.lineTo(110, 60); x.stroke()
        x.fillStyle = '#b9b0a0'; x.fillRect(-110, 90, 220, 10); x.fillRect(-110, 116, 150, 10)
        x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.fillText('DRAFT 1', 0, -130)
        x.restore()
      }
      drawBits(x, STICKER, { Y: GOLD }, 880, 700, 14 * pop01(t, P.t0 + 1.0, 0.35, 2.6), { rot: 0.2 })
      label(x, 790, 1110, 'ALREADY GREAT', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Big roar, soft heart. | *Leave a kind note.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      note(x, 790, 840, pop01(t, P.t0 + 0.4, 0.35, 2), ['you’re doing', 'SO well.', '♡'])
      hearts(x, t, 790, 820, P.t0 + 1.3, { n: 6, life: 1.6, spread: 200, cell: 7, seed: 5 })
      label(x, 790, 1090, 'READ: 40 TIMES', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Celebrate small wins. | *Like making the bed.*', mood: 'sparkle', look: [1, 0], star: { x: -200, y: -40 }, hops: [1.3, 1.8],
    front(x, t, lt, P, F) {
      drawBits(x, BED, BED_C, 790, 1060, 20 * pop01(t, P.t0 + 0.15, 0.3, 2))
      drawBits(x, MEDAL, MEDAL_C, F.x, F.cy + 120, 12 * pop01(t, P.t0 + 1.0, 0.35, 2.4))
      label(x, 790, 760, 'BED: MADE. LEGEND.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 1000, P.t0 + 1.2, 8, 180, 0.2)
    } },
  { sign: S, cap: 'First date nerves? | *Hype the outfit.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, SHIRT, SHIRT_C, 790, 830, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.04 })
      label(x, 790, 640, 'OUTFIT CHECK', pop01(t, P.t0 + 0.5, 0.3, 2.4), { size: 32, bg: LAV, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 1060, '10/10. GO GET ’EM.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 830, P.t0 + 1.4, 8, 170, 0.4)
    } },
  { sign: S, cap: 'Let them give to you, too. | *They love it.*', mood: 'heart', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 820, 960, 170 * k, { mood: lt > 1.3 ? 'heart' : 'wide', look: [-1, 0], seed: 22, glyph: false })
      const p = ease.inOutCubic(prog(lt, 0.5, 1.2))
      drawBits(x, GIFT, GIFT_C, lerp(520, 700, p), 900 - Math.sin(Math.PI * p) * 80, 14 * pop01(t, P.t0 + 0.4, 0.3, 2))
      label(x, 800, 700, 'WRAPPING: ROYAL', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0093', key: 'C', accent: ORANGE, solo: S, ending: 'lesson',
  title: 'How to encourage | *a Leo.*',
  cameos: CAMEOS,
  group: { cap: 'Big heart. | *Bigger cheer.*', mood: 'sparkle' },
  lesson: { text: 'Cheer for a Leo. | They’ll *cheer you back.*', chip: 'HYPE: MUTUAL' },
  last: {
    text: 'The applause meter? | *Still at eleven.*',
    draw(x, t, lt) {
      const t0 = t - lt
      meter(x, 790, 1240, 0.8 * pop01(t, t0 + 0.6, 0.35, 2), 11)
      sparkles(x, t, 790, 1100, t0 + 1.0, 8, 140, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
