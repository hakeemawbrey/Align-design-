// r2a0442: star_advice, ADVICE SOLO, "What Virgos need | *to feel heard.*" (~51 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Virgo truth + a warm reframe, one light gag each.
// Ending: lesson (lesson beat + last line).
//   0.0–3.6    hook
//   3.6–37.8   they notice every detail, notice theirs (the 2 mm trim) · their care comes as a list, read the list
//              · "I'm fine" → ask once more · they help before you ask (folded everything), say thanks out loud
//              · don't rush their story (part 4 of 9) · plans calm them, share the plan early · ask about their chart
//              (annotated) · they show love with tea, drink the tea · they're hard on themselves, be soft (gold star)
//  37.8        "Quiet care. | *Big heart.*"
//  41.0        LESSON: "Listen to the details. | That’s how they *say love.*"  HEARD: FULLY
//  46.9        "Thank a Virgo today. | *Specifically.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SAGE = '#9fe0b0', CREAM = '#fff8ea', RED = '#e23d4e', SLATE = '#9aa5c4', TEA = '#c98f5a'

function sheet(x, cx, cy, k, { w = 340, h = 360, head = '', headCol = SAGE, rows = [], rot = 0.04, size = 30 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = CREAM; x.fillRect(-w / 2, -h / 2, w, h)
  if (head) { x.fillStyle = headCol; x.fillRect(-w / 2, -h / 2, w, 60); x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 31) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  rows.forEach(([txt, kk = 1, col = INK], i) => { if (kk <= 0.01) return; x.save(); x.globalAlpha *= clamp(kk); x.fillStyle = col; x.font = `700 ${size}px ${MONO}`; x.fillText(txt, -w / 2 + 22, -h / 2 + (head ? 60 : 0) + 44 + i * (size + 18)); x.restore() })
  x.restore()
}
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -212, 296, 440)
  x.fillStyle = INK; x.fillRect(-154, -224, 308, 448)
  x.fillStyle = '#2a2350'; x.fillRect(-144, -214, 288, 428)
  x.fillStyle = '#140c30'; x.fillRect(-130, -188, 260, 376)
  if (head) { x.fillStyle = headCol; x.fillRect(-118, -174, 236, 52); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -147) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `800 32px ${INTER}`; const w = x.measureText(txt).width + 30
    x.save(); x.translate(right ? 112 - w : -112, -70 + i * 76); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -27, w, 54); x.fillStyle = INK; x.fillText(txt, 15, 2)
    x.restore()
  })
  x.restore()
}
function chartWheel(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.2)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.fill()
  const C = [RED, '#7fd08a', '#f3d79a', SKYB, GOLD, SAGE, PINK, '#b07bff', '#ff9a4a', SLATE, '#6fd6ff', LAV]
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillStyle = C[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 140, a, a + Math.PI / 6 - 0.04); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, 80, 0, Math.PI * 2); x.fill()
  x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.moveTo(-60, -20); x.lineTo(50, 40); x.lineTo(-10, -62); x.closePath(); x.stroke()
  x.restore()
}
const SHIRT = ['KK....KK', 'KKKKKKKK', '.KKKKKK.', '.KKKKKK.', '.KKKKKK.']
const STICKY = (x, cx, cy, k, txt, col, rot) => { if (k <= 0.01) return; x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k); x.fillStyle = INK; x.fillRect(-74, -40, 148, 80); x.fillStyle = col; x.fillRect(-70, -36, 140, 72); x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 2); x.restore() }
const MUG = ['WWWWWWW..', 'WTTTTTW..', 'WTTTTTWWW', 'WWWWWWW.W', 'WWWWWWW.W', 'WWWWWWWWW', '.WWWWW...']
const STAR5 = ['....Y....', '...YYY...', 'YYYYYYYYY', '.YYYYYYY.', '..YYYYY..', '.YYY.YYY.', 'YY.....YY']

const S = 'virgo'
const CAMEOS = [
  { sign: S, cap: 'They notice every detail. | *Notice theirs.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'did you get | a trim?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 900, 'TWO MILLIMETRES', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 36, bg: SAGE, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1090, 'you noticed!! ♡', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, col: PINK, tail: 'bc' })
    } },
  { sign: S, cap: 'Their care comes as lists. | *Read the list.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 790, 870, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'FOR YOU ♡', size: 30, rows: [
        ['1. drink water', pop01(t, P.t0 + 0.5, 0.2, 2)], ['2. sleep by 11', pop01(t, P.t0 + 0.8, 0.2, 2)], ['3. text me back', pop01(t, P.t0 + 1.1, 0.2, 2)], ['4. you’re great', pop01(t, P.t0 + 1.5, 0.2, 2), '#2f9a5a'],
      ] })
    } },
  { sign: S, cap: 'They say “I’m fine.” | *Ask once more.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 440, 620, 'I’m fine.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bc' })
      bubble(x, 800, 800, 'you sure?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, col: SAGE, tail: 'br' })
      bubble(x, 760, 1060, 'ok, so actually… | (twenty minutes)', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, col: PINK, tail: 'bl' })
    } },
  { sign: S, cap: 'They help before you ask. | *Say thanks out loud.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.5],
    front(x, t, lt, P) {
      const n = Math.min(6, Math.floor(Math.max(0, lt - 0.2) / 0.16))
      const C = [SKYB, PINK, SAGE, GOLD, LAV, '#ff9a4a']
      for (let i = 0; i < n; i++) drawBits(x, SHIRT, { K: C[i] }, 790, 1110 - i * 52, 22, { sy: 0.7 })
      label(x, 790, 650, 'FOLDED: EVERYTHING', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: SAGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Don’t rush their story. | *Every detail matters.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 790, 880, pop01(t, P.t0 + 0.15, 0.3, 2), { head: `PART ${1 + Math.min(3, Math.floor(lt / 0.5))} OF 9`, headCol: SAGE, lines: [
        ['so at 9:42…', BONE, pop01(t, P.t0 + 0.4, 0.25, 2.2)], ['then at 9:43…', BONE, pop01(t, P.t0 + 0.8, 0.25, 2.2)], ['go on ♡', PINK, pop01(t, P.t0 + 1.4, 0.25, 2.2), true],
      ] })
    } },
  { sign: S, cap: 'Plans calm them. | *Share the plan early.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: { x: -170 }, squash: lt => lt > 1.2 ? 0.04 : 0,
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'SATURDAY', headCol: GOLD, size: 32, rows: [
        ['2:00 picnic', pop01(t, P.t0 + 0.5, 0.2, 2)], ['2:15 snacks', pop01(t, P.t0 + 0.7, 0.2, 2)], ['3:00 nap', pop01(t, P.t0 + 0.9, 0.2, 2)],
      ] })
      label(x, 790, 1110, 'ANXIETY: CANCELLED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Ask about their chart. | *They read all of it.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      chartWheel(x, t, 790, 880, pop01(t, P.t0 + 0.15, 0.35, 2) * 0.95)
      STICKY(x, 680, 700, pop01(t, P.t0 + 0.7, 0.25, 2), 'see p.12', GOLD, -0.12)
      STICKY(x, 900, 760, pop01(t, P.t0 + 1.0, 0.25, 2), 'footnote!', PINK, 0.1)
      STICKY(x, 870, 1060, pop01(t, P.t0 + 1.3, 0.25, 2), 'cross-ref', SAGE, -0.06)
    } },
  { sign: S, cap: 'They show love with tea. | *Drink the tea.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, MUG, { W: CREAM, T: TEA }, 780, 930, 26 * k)
      for (let i = 0; i < 3; i++) { const ph = (t * 0.6 + i / 3) % 1; x.save(); x.globalAlpha = 0.6 * Math.sin(Math.PI * ph) * k; x.fillStyle = BONE; x.fillRect(720 + i * 40 + Math.sin(ph * 8 + i) * 10, 800 - ph * 140, 12, 30); x.restore() }
      label(x, 790, 650, 'STEEPED: 4:00', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 36, bg: SAGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They’re hard on themselves. | *Be soft with them.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      sheet(x, 790, 880, k, { head: 'SELF-REVIEW', headCol: SLATE, size: 40, h: 320, rows: [['grade: B+', 1, RED], [lt > 1.2 ? 'actually: A+' : '', 1, '#2f9a5a']] })
      const d = ease.outCubic(prog(lt, 0.9, 1.3))
      if (lt > 0.85) drawBits(x, STAR5, { Y: GOLD }, lerp(960, 880, d), lerp(620, 1000, d), 12, { rot: 0.2 })
      sparkles(x, t, 880, 1000, P.t0 + 1.35 * 3.1 / 2.4, 7, 120, 0.3)
    } },
]

const F = makeFilm({
  id: 'r2a0442', key: 'F', accent: SAGE, solo: S, ending: 'lesson',
  title: 'What Virgos need | *to feel heard.*',
  cameos: CAMEOS,
  group: { cap: 'Quiet care. | *Big heart.*', mood: 'heart' },
  lesson: { text: 'Listen to the details. | That’s how they *say love.*', chip: 'HEARD: FULLY' },
  last: { text: 'Thank a Virgo today. | *Specifically.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
