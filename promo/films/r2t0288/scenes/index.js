// r2t0288: star_talk, SOLO, "Scorpio bosses | *be like.*" (topic: Scorpios as your boss) (~51 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole film (makeFilm solo mode, 9 cards). Ending: lesson.
//   0.0–3.6    "Scorpio bosses | *be like.*" (topic: Scorpios as your boss)
//   3.6–37.8   nine work moments, each pushed to the extreme:
//              interviewed you, already knew your answers · meeting agenda: one word, "why." · "we need to talk" (it's a raise)
//              · read your email AND your tone · trust exercise, level 1 of 99 · one comment on your report: "interesting."
//              · knows who ate the office cake, says nothing · the org chart is sorted by sign · defends you upstairs, fiercely
//  37.8        "Intense. | *Never wrong.*"
//  41.0        LESSON: "Tough on the work. | *Loyal* to you."  TEAM: PROTECTED
//  46.9        "And yes, it's | *still a raise.*" (card 3, paid off)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PURPLE = '#c97bff', RED = '#e23d4e', WINE = '#8a2a5a'

// ── props
function sheet(x, cx, cy, k, lt, { w = 330, h = 400, head = '', headCol = MINT, rows = [], at = 0.4, gap = 0.18, rot = 0.04, size = 26, rowY = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 4, -h / 2 - 4, w + 8, h + 8)
  x.fillStyle = '#fff8ea'; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'left'; x.textBaseline = 'middle'
  if (head) { x.fillStyle = headCol; x.fillRect(-w / 2 + 16, -h / 2 + 18, w - 32, 46); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.fillText(head, 0, -h / 2 + 42); x.textAlign = 'left' }
  rows.forEach((r, i) => {
    const a = clamp((lt - at - i * gap) / 0.15)
    if (a <= 0) return
    x.globalAlpha = a
    const [txt, col, fs] = Array.isArray(r) ? r : [r, INK]
    x.fillStyle = col; x.font = `700 ${fs || size}px ${MONO}`; x.fillText(txt, -w / 2 + 22, -h / 2 + 100 + rowY + i * (size + 14))
    x.globalAlpha = 1
  })
  x.restore()
}
/** grey "text" lines on a document */
function lines(x, l, top, n, w, gap = 30) { x.fillStyle = '#c9bfae'; for (let i = 0; i < n; i++) x.fillRect(l, top + i * gap, i % 3 === 2 ? w * 0.6 : w, 10) }

/** an email with one phrase highlighted */
function email(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  const W = 340, H = 330
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-W / 2 + 8, -H / 2 + 10, W, H)
  x.fillStyle = INK; x.fillRect(-W / 2 - 4, -H / 2 - 4, W + 8, H + 8)
  x.fillStyle = '#fff8ea'; x.fillRect(-W / 2, -H / 2, W, H)
  x.fillStyle = SKYB; x.fillRect(-W / 2, -H / 2, W, 50)
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('RE: RE: RE: hi', -W / 2 + 16, -H / 2 + 26)
  lines(x, -W / 2 + 20, -H / 2 + 76, 2, 290)
  const hl = clamp((lt - 0.9) / 0.35)
  x.fillStyle = 'rgba(255,214,90,0.9)'; x.fillRect(-W / 2 + 16, -H / 2 + 128, 300 * hl, 40)
  x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.fillText('per my last email,', -W / 2 + 22, -H / 2 + 148)
  lines(x, -W / 2 + 20, -H / 2 + 196, 3, 290)
  x.restore()
}

/** a report with one tiny margin comment */
function report(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.03); x.scale(k, k)
  const W = 300, H = 400
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-W / 2 + 8, -H / 2 + 10, W, H)
  x.fillStyle = INK; x.fillRect(-W / 2 - 4, -H / 2 - 4, W + 8, H + 8)
  x.fillStyle = '#fff8ea'; x.fillRect(-W / 2, -H / 2, W, H)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('Q3 REPORT', 0, -H / 2 + 40)
  lines(x, -W / 2 + 24, -H / 2 + 84, 9, 250, 32)
  x.restore()
}

const CAKE = ['......CC......', '.....CCCC.....', 'PPPPPP..PPPPPP', 'WWWWWW..WWWWWW', 'SSSSSS..SSSSSS', 'WWWWWW..WWWWWW', 'SSSSSS..SSSSSS', 'BBBBBBBBBBBBBB']
const CAKE_C = { C: RED, P: PINK, W: '#fff4e2', S: '#c98f5a', B: '#9aa5c4' }

/** an org chart: boxes joined by lines, each with a sign glyph, grouped by element */
const GL = ['♈︎', '♌︎', '♐︎', '♉︎', '♍︎', '♑︎']
function orgChart(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const box = (bx, by, g, col, a) => {
    if (a <= 0.01) return
    x.save(); x.globalAlpha = a
    x.fillStyle = INK; x.fillRect(bx - 50, by - 38, 100, 76); x.fillStyle = col; x.fillRect(bx - 44, by - 32, 88, 64)
    x.fillStyle = INK; x.font = `700 44px 'Segoe UI Symbol', 'Noto Sans Symbols', 'Noto Sans Symbols 2', serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(g, bx, by + 2)
    x.restore()
  }
  x.strokeStyle = BONE; x.lineWidth = 5
  x.beginPath(); x.moveTo(0, -150); x.lineTo(0, -90); x.moveTo(-120, -90); x.lineTo(120, -90); x.moveTo(-120, -90); x.lineTo(-120, -40); x.moveTo(120, -90); x.lineTo(120, -40); x.stroke()
  box(0, -190, '♏︎', PURPLE, 1)
  const FIRE = '#ff8a5a', EARTH = '#7ed99a'
  for (let i = 0; i < 3; i++) box(-120, 10 + i * 0 + i * 90, GL[i], FIRE, clamp((lt - 0.4 - i * 0.18) / 0.15))
  for (let i = 0; i < 3; i++) box(120, 10 + i * 90, GL[i + 3], EARTH, clamp((lt - 0.5 - i * 0.18) / 0.15))
  x.restore()
}

const S = 'scorpio'
const CAMEOS = [
  { sign: S, cap: 'Interviewed you. | Already *knew your answers.*', mood: lt => lt > 1.5 ? 'wink' : 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 790, 870, pop01(t, P.t0 + 0.2, 0.3, 2), lt, { head: 'CANDIDATE: YOU', headCol: PURPLE, rows: ['Q1 ✓ knew it', 'Q2 ✓ knew it', 'Q3 ✓ knew it', ['Q4 ✓ ALSO', WINE]], at: 0.4, gap: 0.22, size: 32 })
    } },
  { sign: S, cap: 'Meeting agenda: | one word. *“Why.”*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt, { head: 'AGENDA', headCol: GOLD, rows: [['1.', INK, 40], ['   why.', '#8a2a5a', 64]], at: 0.6, gap: 0.5, size: 56, rowY: 20 })
      label(x, 790, 1120, 'DURATION: 4 HOURS', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: '“We need to talk.” | It was *a raise.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 760, 650, 'we need | to talk.', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 56, col: LAV, tail: 'bl' })
      label(x, 800, 960, '+ RAISE ✓', pop01(t, P.t0 + 1.4, 0.3, 2.6), { size: 64, bg: MINT, rot: -0.06, font: MONO, weight: 700 })
      sparkles(x, t, 800, 960, P.t0 + 1.5, 8, 190, 0.3, [GOLD, MINT, BONE])
    } },
  { sign: S, cap: 'Read your email. | *And your tone.*', mood: lt => lt > 1.1 ? 'squint' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      email(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1100, 'TONE: NOTED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Team trust exercise. | Level *1 of 99.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      x.save(); x.translate(790, 860); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-170, -40, 340, 80); x.fillStyle = '#2a2350'; x.fillRect(-160, -30, 320, 60)
      x.fillStyle = PURPLE; x.fillRect(-160, -30, 320 * (1 / 99) * Math.min(1, lt / 1), 60)
      x.fillStyle = BONE; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TRUST: 1%', 0, 2)
      x.restore()
      bubble(x, 760, 660, 'it’s a start.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, col: LAV, tail: 'bl' })
      label(x, 790, 1060, 'EST. COMPLETION: 2031', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'One comment on your report: | *“Interesting.”*', mood: lt => lt > 1.3 ? 'squint' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      report(x, 760, 900, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      bubble(x, 860, 1010, 'interesting.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 44, col: PURPLE, tail: 'bl' })
      label(x, 760, 650, 'MEANING: UNKNOWN', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Knows who ate the office cake. | *Says nothing.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 760, 660, '…', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 70, col: LAV, tail: 'bl' })
      label(x, 790, 1110, 'CASE CLOSED (QUIETLY)', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'The org chart? | *Sorted by sign.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      orgChart(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1150, 'FIRE · EARTH', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Someone blamed you upstairs. | Scorpio *handled it.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 760, 650, 'my team? | no.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 56, col: LAV, tail: 'bl' })
      label(x, 790, 940, 'HANDS OFF MY TEAM', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 38, bg: PURPLE, color: BONE, rot: -0.05, font: MONO, weight: 700 })
      hearts(x, t, 470, 880, P.t0 + 1.5, { n: 5, life: 1.6, spread: 120, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0288', key: 'G', accent: PURPLE, solo: 'scorpio', ending: 'lesson',
  title: 'Scorpio bosses | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Intense. | *Never wrong.*', mood: 'wink' },
  lesson: { text: 'Tough on the work. | *Loyal* to you.', chip: 'TEAM: PROTECTED' },
  last: {
    text: 'And yes, it’s | *still a raise.*',
    draw(x, t, lt) { sparkles(x, t, 540, 1150, t - lt + 0.6, 8, 260, 0.2, [GOLD, MINT, BONE]); hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
