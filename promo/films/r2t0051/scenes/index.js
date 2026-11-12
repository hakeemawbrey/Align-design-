// r2t0051: star_talk, SOLO, "Your Libra coworker | be like." (~49 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): the office Libra, every situation pushed to the extreme.
//   0.0–3.6    "Your Libra coworker | *be like.*"  One big Libra pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              picking a lunch spot? booked a three-hour meeting · one email, a font crisis (draft 14) · their desk is
//              gallery-ready · thermostat war, Libra brokered peace (71.5°) · agreed with both sides in one sentence
//              · the seating chart, done by sign · feedback sandwich, seven compliments deep · coffee run for the whole
//              team, forgot their own · two coworkers fighting? Libra booked brunch
//  37.8        "Keeps the peace. | *Every meeting.*"  Libra comes back, big.
//  41.2        callback: "Today, someone got | *Libra’s coffee.*"  The coffee tray comes back, the empty slot filled.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, SERIF,
} from '../../signs3kit.js'
import { signStar } from '../../startalk.js'

const ROSE = '#e163d6', CREAM = '#fff4e2', RED = '#e23d4e', KRAFT = '#c98f2a', GREEN = '#5fd068'
const S = 'libra'

// ── props
const CUP = [
  '.WWWWWW.',
  'WWWWWWWW',
  '.CCCCCC.',
  '.CCCCCC.',
  '.BBBBBB.',
  '.BBBBBB.',
  '.CCCCCC.',
  '..CCCC..',
]
const CUP_C = { W: '#ffffff', C: '#e0b27a', B: '#8a4a2e' }
const PLANT = [
  '..G..G..',
  '.GGgGGG.',
  'GGGGgGGG',
  '.GgGGGG.',
  '..GGGG..',
  '.PPPPPP.',
  '.PPPPPP.',
  '..PPPP..',
]
const PLANT_C = { G: GREEN, g: '#a6f08a', P: '#e07a4a' }

// an ink-bordered card with a soft shadow, drawn in local coords (−w/2…w/2)
function card(x, cx, cy, w, h, k, { rot = 0, bg = CREAM, edge = INK } = {}) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = edge; x.fillRect(-w / 2 - 7, -h / 2 - 7, w + 14, h + 14)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  return true                                   // caller draws inside, then x.restore()
}
// a day planner page with one huge block
function planner(x, cx, cy, k, lt) {
  if (!card(x, cx, cy, 300, 400, k, { rot: 0.04 })) return
  x.fillStyle = ROSE; x.fillRect(-150, -200, 300, 60)
  x.fillStyle = CREAM; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TODAY', 0, -170)
  x.font = `700 20px ${MONO}`; x.textAlign = 'left'
  for (let i = 0; i < 6; i++) { x.fillStyle = '#b9b0a0'; x.fillText(`${12 + i > 12 ? i : 12}:00`, -136, -112 + i * 52); x.fillRect(-60, -112 + i * 52 + 18, 196, 2) }
  const g = ease.outCubic(prog(lt, 0.4, 1.3))
  if (g > 0) {
    x.fillStyle = LAV; x.fillRect(-56, -130, 188, 4 + 166 * g)
    x.fillStyle = INK; x.font = `800 22px ${INTER}`; x.textAlign = 'center'
    if (g > 0.5) { x.fillText('WHERE TO', 38, -86); x.fillText('EAT? (pt 1)', 38, -58) }
  }
  x.restore()
}
// an email draft whose font keeps changing
function emailDraft(x, t, cx, cy, k, lt) {
  if (!card(x, cx, cy, 330, 260, k, { rot: -0.04 })) return
  x.fillStyle = '#2a2350'; x.fillRect(-165, -130, 330, 48)
  x.fillStyle = CREAM; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('NEW MESSAGE', 0, -106)
  const FONTS = [`800 46px ${INTER}`, `italic 500 50px ${SERIF}`, `700 40px ${MONO}`, `italic 800 46px ${INTER}`, `500 50px ${SERIF}`]
  const i = lt < 0.3 ? 0 : Math.floor((lt - 0.3) / 0.22) % FONTS.length
  x.fillStyle = INK; x.font = FONTS[i]; x.fillText('Hi team,', 0, -10)
  x.fillStyle = '#b9b0a0'; x.fillRect(-130, 50, 260, 10); x.fillRect(-130, 76, 180, 10)
  x.restore()
}
// a tidy desk: lamp, plant, a tiny framed print, a candle
function desk(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-200, 40, 400, 30); x.fillRect(-180, 66, 22, 150); x.fillRect(158, 66, 22, 150)
  x.fillStyle = KRAFT; x.fillRect(-194, 46, 388, 18)
  drawBits(x, PLANT, PLANT_C, -130, -4, 11)
  // framed print
  x.fillStyle = INK; x.fillRect(-46, -110, 104, 126); x.fillStyle = GOLD; x.fillRect(-40, -104, 92, 114); x.fillStyle = LAV; x.fillRect(-28, -92, 68, 90)
  x.fillStyle = PINK; x.beginPath(); x.arc(6, -46, 22, 0, Math.PI * 2); x.fill()
  // candle
  x.fillStyle = INK; x.fillRect(104, -24, 44, 66); x.fillStyle = CREAM; x.fillRect(108, -20, 36, 58)
  const fl = 1 + 0.15 * Math.sin(t * 13)
  x.fillStyle = GOLD; x.fillRect(120, -48 * fl, 12, 22 * fl); x.fillStyle = '#ffffff'; x.fillRect(124, -40, 4, 10)
  x.restore()
}
// a wall thermostat; the number settles on 71.5
function thermostat(x, cx, cy, k, lt) {
  if (!card(x, cx, cy, 250, 300, k, { rot: 0.03, bg: '#d8dbe8' })) return
  x.fillStyle = '#140c30'; x.fillRect(-100, -110, 200, 120)
  const shake = lt < 1.1 ? Math.floor(lt * 9) % 2 : 2
  const v = shake === 2 ? '71.5°' : shake ? '64°' : '79°'
  x.fillStyle = shake === 2 ? MINT : RED; x.font = `700 58px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(v, 0, -48)
  x.fillStyle = INK; x.font = `800 44px ${INTER}`; x.fillText('▲', -50, 80); x.fillText('▼', 50, 80)
  x.restore()
}
// the office seating chart, every desk labelled with a sign
function seating(x, t, cx, cy, k, lt) {
  if (!card(x, cx, cy, 360, 400, k, { rot: 0.04 })) return
  x.fillStyle = ROSE; x.fillRect(-180, -200, 360, 58)
  x.fillStyle = CREAM; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SEATING CHART', 0, -171)
  const IDS = ['aries', 'libra', 'taurus', 'scorpio', 'leo', 'aquarius', 'cancer', 'capricorn', 'pisces']
  IDS.forEach((id, i) => {
    const a = pop01(t, t - lt + 0.4 + i * 0.1, 0.25, 2.2)
    if (a <= 0.01) return
    const c = i % 3, r = Math.floor(i / 3), px = -110 + c * 110, py = -82 + r * 100
    const st = signStar(id)
    x.save(); x.translate(px, py); x.scale(a, a)
    x.fillStyle = INK; x.fillRect(-46, -38, 92, 76); x.fillStyle = st.color; x.fillRect(-40, -32, 80, 64)
    x.fillStyle = INK; x.font = `700 44px 'Segoe UI Symbol', 'Noto Sans Symbols', serif`; x.fillText(st.glyph + '︎', 0, 4)
    x.restore()
  })
  x.restore()
}
// a feedback sandwich: compliment layers keep stacking
function sandwich(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const LAY = [MINT, '#ff6f6f', GOLD, PINK, MINT, '#ff6f6f', GOLD]
  const n = Math.min(LAY.length, Math.floor(clamp((lt - 0.3) / 1.3) * (LAY.length + 1)))
  const bun = (y, top) => { x.fillStyle = INK; x.fillRect(-126, y - 6, 252, top ? 52 : 40); x.fillStyle = '#e0a45a'; x.fillRect(-120, y, 240, top ? 40 : 28); if (top) { x.fillStyle = '#fff1d0'; for (let i = 0; i < 5; i++) x.fillRect(-90 + i * 44, y + 10, 10, 6) } }
  bun(150, false)
  for (let i = 0; i < n; i++) { const y = 126 - i * 30; x.fillStyle = INK; x.fillRect(-132, y - 4, 264, 32); x.fillStyle = LAY[i]; x.fillRect(-128, y, 256, 24) }
  if (lt > 1.7) bun(126 - n * 30 - 46 - 140 * (1 - ease.outCubic(clamp((lt - 1.7) / 0.35))), true)
  x.restore()
}
// a carry tray of coffees with one empty slot (or, in the callback, a cup for Libra)
function tray(x, t, cx, cy, k, { filled = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-196, 40, 392, 46); x.fillStyle = KRAFT; x.fillRect(-190, 46, 380, 34)
  for (let i = 0; i < 4; i++) {
    const px = -144 + i * 96
    if (i === 3 && filled <= 0.01) {
      x.save(); x.strokeStyle = BONE; x.lineWidth = 4; x.setLineDash([8, 8]); x.strokeRect(px - 36, -40, 72, 84); x.restore()
      x.fillStyle = BONE; x.font = `800 50px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('?', px, 4)
    } else drawBits(x, CUP, CUP_C, px, 0 - (i === 3 ? (1 - filled) * 120 : 0), 12, { alpha: i === 3 ? clamp(filled * 2) : 1 })
  }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Picking a lunch spot? | *Booked a meeting.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      planner(x, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1110, '12:00 – 3:00 PM', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Sent one email. | Had a *font crisis.*', mood: lt => lt > 1.3 ? 'wide' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      emailDraft(x, t, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 640, 'DRAFT 14', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: RED, color: CREAM, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1060, 'SEND? NOT YET.', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Their desk? | *Gallery-ready.*', mood: 'sparkle', look: [1, 0], star: { x: -200 }, hops: [1.2],
    front(x, t, lt, P) {
      desk(x, t, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 640, 'CURATED ✦', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 38, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 1.2, 7, 200, 0.4)
    } },
  { sign: S, cap: 'Thermostat war? | Libra *brokered peace.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -190 }, hops: [1.25],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      thermostat(x, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1080, 'TREATY SIGNED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 800, P.t0 + 1.3, 6, 170, 0.2)
    } },
  { sign: S, cap: 'Agreed with both sides. | *In one sentence.*', mood: lt => lt > 1.0 ? 'wink' : 'happy', star: { x: 0, y: 40, s: 270 },
    front(x, t, lt, P) {
      label(x, 290, 640, 'TEAM A ✓', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 36, bg: SKYB, rot: -0.06, font: MONO, weight: 700 })
      label(x, 790, 640, 'TEAM B ✓', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.06, font: MONO, weight: 700 })
      bubble(x, 540, 1120, 'you’re BOTH | so right!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: S, cap: 'The seating chart? | Done *by sign.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.5],
    front(x, t, lt, P) {
      seating(x, t, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1100, 'ZERO CONFLICTS', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Gave feedback. | *Seven compliments* deep.', mood: lt => lt > 1.6 ? 'wink' : 'heart', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      sandwich(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      bubble(x, 790, 620, 'one tiny note…', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Coffee run for the team. | *Forgot their own.*', mood: lt => lt > 1.4 ? 'wide' : 'happy', look: [1, 0], star: { x: -190 }, hops: [0.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      tray(x, t, 750, 880, 1.05 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 760, 660, 'ORDERS: 4/4', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      label(x, 760, 1080, 'LIBRA’S: OOPS', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Two coworkers fighting? | Libra *booked brunch.*', mood: 'sparkle', star: { x: -210 }, hops: [1.4],
    front(x, t, lt, P) {
      const made = lt > 1.4
      ;['aries', 'capricorn'].forEach((id, i) => {
        const k = pop01(t, P.t0 + 0.25 + i * 0.15, 0.35, 2)
        if (k > 0.01) signChar(x, t, id, 650 + i * 200, 900, 170 * k, { mood: made ? 'heart' : 'squint', look: [i ? -1 : 1, 0], seed: 40 + i, glyph: false, hops: made ? [P.t0 + 1.9 + i * 0.1] : null })
      })
      label(x, 780, 1080, 'TABLE FOR 3 ✦', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
      if (made) hearts(x, t, 780, 860, P.t0 + 1.5, { n: 5, life: 1.6, spread: 220, cell: 7, seed: 5 })
      else bubble(x, 780, 660, 'hmph.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, col: LAV, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'r2t0051', key: 'C', accent: PINK, solo: S, ending: 'callback',
  title: 'Your Libra coworker | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Keeps the peace. | *Every meeting.*', mood: 'sparkle' },
  last: {
    text: 'Today, someone got | *Libra’s coffee.*',
    draw(x, t, lt) {
      const t0 = t - lt
      tray(x, t, 540, 1020, 1.5 * pop01(t, t0 + 0.5, 0.4, 2), { filled: ease.outCubic(prog(lt, 1.2, 1.7)) })
      label(x, 540 + 144 * 1.5, 1210, 'FOR LIBRA ♡', pop01(t, t0 + 1.8, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 540 + 144 * 1.5, 920, t0 + 1.8, { n: 6, life: 1.8, spread: 220, cell: 7, seed: 6 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
