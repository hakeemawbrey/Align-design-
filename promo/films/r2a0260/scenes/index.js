// r2a0260: star_advice, ADVICE ROLLCALL, "How each sign | leads." (~54 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order: one warm, specific line about each sign's way of leading, one light gag each.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ goes first · ♉ with snacks · ♊ asks great questions · ♋ checks in · ♌ gold stars for all
//              · ♍ a clear plan · ♎ hears everyone · ♏ steady when it gets hard · ♐ with a compass
//              · ♑ by example, step by step · ♒ asks "what if?" · ♓ leads with kindness
//  49.2        group ending: "Twelve leaders. | *One group chat.*"  A "TEAM: ALIGNED" chip over the photo.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const TEAL = '#5fd0c8', RED = '#e23d4e', CREAM = '#fff4e2', GREEN = '#5fd068'

// ── props
const FLAG = ['PFFFFFF', 'PFFFFFF', 'PFFFFF.', 'PFFFF..', 'P......', 'P......', 'P......', 'P......', 'P......', 'P......']
const BASKET = ['..KKKKKK..', '.K......K.', 'RYRGRYRGRY', 'WWWWWWWWWW', 'WwWwWwWwWw', 'WWWWWWWWWW', 'WwWwWwWwWw', '.WWWWWWWW.']
const BASKET_C = { K: INK, W: '#c9a070', w: '#a8804a', R: RED, Y: '#ffd23a', G: GREEN }
const STAR5 = ['...Y...', '..YYY..', 'YYYYYYY', '.YYYYY.', '.YY.YY.']
const LANTERN = ['..KKK..', '.K...K.', 'KKKKKKK', 'KYYYYYK', 'KYWWYYK', 'KYWYYYK', 'KYYYYYK', 'KKKKKKK']
const LANTERN_C = { K: INK, Y: '#ffd23a', W: '#ffffff' }
const BULB = ['..YYY..', '.YYYYY.', 'YYWYYYY', 'YYYYYYY', 'YYYYYYY', '.YYYYY.', '..GGG..', '..GGG..', '...G...']
const BULB_C = { Y: '#ffe066', W: '#ffffff', G: '#a8a0c8' }

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
  lines.forEach(([txt, col, kk], i) => {
    if (kk <= 0.01) return
    x.save(); x.translate(i % 2 ? 14 : -14, -60 + i * 66); x.scale(kk, kk)
    x.font = `800 26px ${INTER}`; const w = x.measureText(txt).width + 30
    x.fillStyle = col; x.fillRect(-w / 2, -26, w, 52); x.fillStyle = INK; x.fillText(txt, 0, 2)
    x.restore()
  })
  x.restore()
}
// a checklist card, ticks landing one by one
function checklist(x, cx, cy, k, lt, title, items, hcol) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -160, 300, 336)
  x.fillStyle = INK; x.fillRect(-158, -176, 316, 352)
  x.fillStyle = CREAM; x.fillRect(-150, -168, 300, 336)
  x.fillStyle = hcol; x.fillRect(-150, -168, 300, 56)
  x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -138)
  items.forEach((s, i) => {
    const py = -70 + i * 60
    x.fillStyle = INK; x.fillRect(-124, py - 16, 32, 32); x.fillStyle = '#ffffff'; x.fillRect(-120, py - 12, 24, 24)
    if (lt > 0.5 + i * 0.3) { x.fillStyle = GREEN; x.fillRect(-116, py - 8, 16, 16) }
    x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'left'; x.fillText(s, -80, py + 2); x.textAlign = 'center'
  })
  x.restore()
}
// a balance scale with two bubbles on the pans, levelling out
function scales(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const tilt = lerp(0.3, 0, ease.outBack(clamp((lt - 0.6) / 0.8))) + 0.02 * Math.sin(t * 3)
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-8, -110, 16, 230); x.fillRect(-70, 110, 140, 16)
  x.save(); x.translate(0, -110); x.rotate(tilt)
  x.fillRect(-170, -6, 340, 12)
  ;[-1, 1].forEach(d => {
    x.save(); x.translate(d * 160, 0); x.rotate(-tilt)
    x.fillStyle = INK; x.fillRect(-2, 0, 4, 70); x.fillRect(-70, 66, 140, 10)
    x.fillStyle = d < 0 ? PINK : SKYB; x.fillRect(-56, 24, 112, 40); x.fillStyle = INK; x.font = `800 22px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText(d < 0 ? 'idea A' : 'idea B', 0, 45)
    x.restore()
  })
  x.restore(); x.restore()
}
// a compass rose with a wobbling needle
function compass(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 130, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#c98f2a'; x.beginPath(); x.arc(0, 0, 122, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 104, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('N', 0, -80); x.fillText('S', 0, 80); x.fillText('E', 80, 0); x.fillText('W', -80, 0)
  x.rotate(0.6 + 0.25 * Math.sin(t * 2.4))
  x.fillStyle = RED; x.beginPath(); x.moveTo(0, -70); x.lineTo(14, 0); x.lineTo(-14, 0); x.closePath(); x.fill()
  x.fillStyle = '#6b62a8'; x.beginPath(); x.moveTo(0, 70); x.lineTo(14, 0); x.lineTo(-14, 0); x.closePath(); x.fill()
  x.restore()
}
// a staircase, a flag at the top
function stairs(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const n = Math.min(5, 1 + Math.floor(clamp((lt - 0.3) / 1.0) * 5))
  for (let i = 0; i < n; i++) { x.fillStyle = INK; x.fillRect(-170 + i * 64, 120 - (i + 1) * 54, 64, (i + 1) * 54); x.fillStyle = i % 2 ? TEAL : '#7fd0a0'; x.fillRect(-164 + i * 64, 126 - (i + 1) * 54, 52, (i + 1) * 54 - 12) }
  if (n >= 5) drawBits(x, FLAG, { P: BONE, F: GOLD }, 150, 120 - 5 * 54 - 70, 10)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Aries leads | *by going first.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.6, 1.2],
    front(x, t, lt, P, F) {
      drawBits(x, FLAG, { P: BONE, F: RED }, F.x + 170, F.cy - 70, 16 * pop01(t, P.t0 + 0.5, 0.35, 2.2), { rot: 0.05 * Math.sin(t * 3) })
      label(x, 790, 1060, 'FIRST IN ✦', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 650, 'I’ll go! | follow me ♡', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Taurus leads | with *snacks.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, BASKET, BASKET_C, 800, 900, 20 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 800, 660, 'TEAM: FED', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1100, 'no rush ♡', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Gemini leads | with *great questions.*', mood: lt => Math.floor(lt * 3) % 2 ? 'happy' : 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'what do YOU | think?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 800, 880, 'ooh, and why?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 34, col: MINT, tail: 'bl' })
      label(x, 790, 1070, 'EVERYONE HEARD', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Cancer leads | by *checking in.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'THE TEAM', headCol: SKYB, lines: [
        ['how are you,', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2)], ['really? ♡', PINK, pop01(t, P.t0 + 0.8, 0.25, 2.2)], ['…better now', MINT, pop01(t, P.t0 + 1.4, 0.25, 2.2)],
      ] })
    } },
  { sign: 'leo', cap: 'Leo leads | with *gold stars for all.*', mood: 'sparkle', look: [1, 0], star: { x: -200 }, hops: [0.9, 1.6],
    front(x, t, lt, P) {
      ;['libra', 'capricorn', 'pisces'].forEach((id, i) => {
        const k = pop01(t, P.t0 + 0.3 + i * 0.15, 0.3, 2)
        if (k <= 0.01) return
        const F2 = signChar(x, t, id, 650 + i * 120, 1000 - (i % 2) * 40, 120 * k, { mood: lt > 0.9 + i * 0.2 ? 'heart' : 'happy', look: [-1, 0], seed: 80 + i, glyph: false, tears: id === 'pisces' ? 1 : 0 })
        if (lt > 0.9 + i * 0.2) drawBits(x, STAR5, { Y: GOLD }, F2.x + 34, F2.top - 6, 7)
      })
      label(x, 790, 680, 'YOU’RE ALL STARS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Virgo leads | with *a clear plan.*', mood: lt => lt > 1.5 ? 'sparkle' : 'happy', look: [1, 1], star: { x: -190 }, hops: [1.6],
    front(x, t, lt, P) {
      checklist(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt, 'THE PLAN', ['goals', 'roles', 'snack breaks', 'celebrate'], '#9be07a')
    } },
  { sign: 'libra', cap: 'Libra leads | by *hearing everyone.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -190 }, hops: [1.4],
    front(x, t, lt, P) {
      scales(x, t, 735, 900, 1.05 * pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1130, 'BOTH: VALID', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Scorpio leads | *when it gets hard.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.globalAlpha = 0.35 * k
        const g = x.createRadialGradient(800, 880, 10, 800, 880, 300); g.addColorStop(0, 'rgba(255,224,120,0.9)'); g.addColorStop(1, 'rgba(255,224,120,0)')
        x.fillStyle = g; x.fillRect(300, 500, 700, 700); x.restore()
      }
      drawBits(x, LANTERN, LANTERN_C, 800, 880, 20 * k)
      bubble(x, 800, 660, 'I’ve got you', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 800, 1090, 'STEADY', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Sag leads | *with a compass.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -190 }, hops: [0.8, 1.5],
    front(x, t, lt, P) {
      compass(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 800, 1080, 'THAT WAY! ✦', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Capricorn leads | *by example.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, -1], star: { x: -200 }, hops: [1.5],
    front(x, t, lt, P) {
      stairs(x, 790, 940, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 640, 'STEP BY STEP', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: TEAL, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Aquarius leads | by *asking “what if?”*', mood: lt => lt > 1.0 ? 'sparkle' : 'squint', look: [1, -1], star: { x: -180 }, hops: [1.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      const on = lt > 1.0
      drawBits(x, BULB, on ? BULB_C : { Y: '#6b62a8', W: '#8a80c8', G: '#a8a0c8' }, 800, 840, 22 * pop01(t, P.t0 + 0.3, 0.35, 2))
      if (on) sparkles(x, t, 800, 820, P.t0 + 1.0, 8, 190, 0.3)
      label(x, 800, 1090, 'NEW IDEA UNLOCKED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Pisces leads | *with kindness.*', mood: 'heart', tears: lt => lt > 0.8 ? 2 : 1, look: [1, 0], star: { x: -160 },
    front(x, t, lt, P, F) {
      hearts(x, t, F.x + 160, F.cy + 40, P.t0 + 0.4, { n: 7, life: 2.0, spread: 240, cell: 8, seed: 4 })
      label(x, 800, 1080, 'SOFT POWER', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0260', key: 'G', accent: TEAL, ending: 'group',
  title: 'How each sign | *leads.*',
  cameos: CAMEOS,
  group: {
    cap: 'Twelve leaders. | *One group chat.*',
    draw(x, t, lt) {
      label(x, 540, 660, '✦ TEAM: ALIGNED ✦', pop01(t, t - lt + 1.6, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
