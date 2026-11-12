// r2a0150: star_advice, ADVICE ROLLCALL, "What each sign | needs more of." (~57 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs, one warm and specific "more of this" each, with a light visual gag.
//   0.0–3.6    "What each sign | *needs more of.*"
//   3.6–49.2   ♈ patience, the finish line will wait · ♉ new things, one new dish counts · ♊ quiet, your thoughts deserve
//              a break · ♋ being cared for, let someone cook for you · ♌ rest, you're loved offstage too · ♍ grace, done
//              is beautiful · ♎ saying what they want, your vote counts · ♏ trust, some people are safe · ♐ roots, home can
//              be an adventure · ♑ play, fun is productive too · ♒ being understood, your people exist · ♓ boundaries,
//              not every sad thing is yours
//  49.2        "A little more | *of the good stuff.*"
//  52.6        callback: "Aries waited. | *Ten whole seconds.*"  the finish line comes back, still waiting; Aries too.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, chart, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN } from './props.js'

const ACC = '#7dffb0'
const ST = { x: -170 }

const PLATE = ['..WWWWWWWWW..', '.WWWGGWWWWWW.', 'WWWGGGGWPPWWW', '.WWWGGWWPPWW.', '..WWWWWWWWW..']
const PLATE_C = { W: CREAM, G: '#5fd068', P: '#c97bff' }
const POT = ['....G....', '...GGG...', '..G.G.G..', '....G....', 'KKKKKKKKK', '.KOOOOOK.', '.KOOOOOK.', '..KOOOK..', '..KKKKK..']
const POT_C = { G: GREEN, K: INK, O: '#c96a3a' }
const KITE = ['....K....', '...KPK...', '..KPPPK..', '.KPPYPPK.', 'KPPYYYPPK', '.KPPYPPK.', '..KPPPK..', '...KPK...', '....K....']
const KITE_C = { K: INK, P: PINK, Y: GOLD }
const BOX = ['KKKKKKKKKKKK', 'KBBBBBBBBBBK', 'KBBBBBBBBBBK', 'KBBBBBBBBBBK', 'KBBBBBBBBBBK', 'KBBBBBBBBBBK', 'KKKKKKKKKKKK']
const BOX_C = { K: INK, B: WOOD }

/** a finish-line banner on two poles, ribbon across */
function finish(x, t, cx, cy, k, { ribbon = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -200, 18, 360); x.fillRect(152, -200, 18, 360)
  for (let i = 0; i < 8; i++) for (let j = 0; j < 2; j++) { x.fillStyle = (i + j) % 2 ? INK : CREAM; x.fillRect(-152 + i * 38, -200 + j * 30, 38, 30) }
  if (ribbon > 0.01) { x.fillStyle = RED; x.fillRect(-152, 40 + 6 * Math.sin(t * 3), 304 * ribbon, 12) }
  x.restore()
}
/** a checklist; the last box has a little smudge and still gets a tick */
function checklist(x, cx, cy, k, lt) {
  card(x, cx, cy, 300, 300, k, { bg: CREAM, rot: 0.04 }, () => {
    const L = ['laundry', 'emails', 'dishes']
    L.forEach((s, i) => {
      const y = -90 + i * 80
      x.fillStyle = INK; x.fillRect(-120, y - 20, 40, 40); x.fillStyle = CREAM; x.fillRect(-114, y - 14, 28, 28)
      if (lt > 0.5 + i * 0.4) { x.strokeStyle = '#2fa36b'; x.lineWidth = 8; x.beginPath(); x.moveTo(-112, y); x.lineTo(-102, y + 10); x.lineTo(-86, y - 14); x.stroke() }
      txt(x, s, 10, y, { size: 32, align: 'left' })
    })
    x.fillStyle = 'rgba(120,90,60,0.35)'; x.beginPath(); x.arc(70, 70, 18, 0, Math.PI * 2); x.fill()
  })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Patience. | *The finish line will wait.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: { x: -180 }, hops: [0.4, 0.7],
    front(x, t, lt, P) {
      finish(x, t, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 790, 1120, 'take your time', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: MINT, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'New things. | *One new dish counts.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PLATE, PLATE_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 700, 'NEW: PURPLE THING', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1080, 'VERDICT: YUM', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Quiet. | Your thoughts *deserve a break.*', mood: lt => lt > 1.4 ? 'sleepy' : 'wide', star: ST,
    front(x, t, lt, P) {
      const W = ['what if—', 'wait, also—', 'oh! and—']
      W.forEach((s, i) => bubble(x, 760 + (i % 2) * 60, 650 + i * 150, s, pop01(t, P.t0 + 0.2 + i * 0.2, 0.25, 2.2) * (1 - ease.inCubic(prog(lt, 1.1 + i * 0.1, 1.3 + i * 0.1))), { size: 36, tail: 'bl' }))
      label(x, 790, 860, 'SHHH. PEACE.', pop01(t, P.t0 + 1.9, 0.3, 2.4), { size: 40, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Being cared for. | *Let someone cook for you.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 820, 1000, 200 * k, { mood: 'happy', look: [-1, 0], seed: 21, glyph: false })
      bubble(x, 800, 760, 'soup’s on. sit.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, col: GOLD, tail: 'bc' })
      label(x, 400, 620, 'YOUR TURN', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Rest. | *You’re loved offstage too.*', mood: lt => lt > 1.3 ? 'sleepy' : 'happy', star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      const c = ease.inOutCubic(prog(lt, 0.6, 1.3))
      x.fillStyle = '#b02a3a'; x.fillRect(110, 480, 380 * c, 740); x.fillRect(970 - 380 * c, 480, 380 * c, 740)
      x.fillStyle = '#8a1f2e'; for (let i = 0; i < 4; i++) { x.fillRect(110 + i * 95 * c, 480, 12, 740 * (c > 0 ? 1 : 0)); x.fillRect(958 - i * 95 * c, 480, 12, 740 * (c > 0 ? 1 : 0)) }
    },
    front(x, t, lt, P) {
      label(x, 790, 640, 'OFFSTAGE', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1080, 'still adored.', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 38, col: PINK, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Grace. | *Done is beautiful.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      checklist(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1100, 'SMUDGE: ALLOWED', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Saying what they want. | *Your vote counts.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 300, 240, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: -0.03 }, () => {
        txt(x, 'DINNER?', 0, -80, { size: 32, font: MONO, weight: 700 })
        txt(x, '“whatever you…”', 0, -10, { size: 28, color: lt > 0.9 ? '#b9b0a0' : INK })
        if (lt > 0.9) { x.fillStyle = RED; x.fillRect(-110, -12, 220, 5) }
        if (lt > 1.1) txt(x, '“TACOS.”', 0, 60, { size: 44, color: '#c0397a' })
      })
      sparkles(x, t, 790, 900, P.t0 + 1.2 * 1.29, 7, 180, 0.3)
    } },
  { sign: 'scorpio', cap: 'Trust. | *Some people are safe.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -130 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', lerp(860, 720, ease.inOutCubic(prog(lt, 0.8, 1.2))), 980, 200 * k, { mood: 'heart', look: [-1, 0], seed: 22, glyph: false })
      label(x, 790, 680, 'SAFE PERSON', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 38, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      if (lt > 1.2) hearts(x, t, 560, 900, P.t0 + 1.2 * 1.29, { n: 5, life: 1.7, spread: 160, cell: 7, seed: 5 })
    } },
  { sign: 'sagittarius', cap: 'Roots. | *Home can be an adventure.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [-1, 0], star: { x: 160 },
    front(x, t, lt, P) {
      const g = ease.outBack(prog(lt, 0.5, 1.4))
      drawBits(x, POT, POT_C, 330, 980, 20 * pop01(t, P.t0 + 0.2, 0.35, 2), { sy: 1 })
      if (g > 0.01) { x.fillStyle = INK; x.fillRect(321, 920 - 220 * g, 18, 220 * g); x.fillStyle = GREEN; x.fillRect(325, 920 - 220 * g, 10, 220 * g); for (let i = 0; i < 3; i++) drawBits(x, ['.GG', 'GGG', 'GG.'], { G: GREEN }, 330 + (i % 2 ? 40 : -40), 900 - i * 70 * g, 10 * g) }
      label(x, 330, 650, 'GROWING!', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Play. | *Fun is productive too.*', mood: lt => lt > 1.0 ? 'sparkle' : 'neutral', look: [1, -1], star: ST, hops: [1.2, 1.8],
    front(x, t, lt, P) {
      const kx = 800 + 30 * Math.sin(t * 1.5), ky = 680 + 20 * Math.sin(t * 2.1)
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) { x.strokeStyle = BONE; x.lineWidth = 3; x.beginPath(); x.moveTo(kx, ky + 60); x.quadraticCurveTo(600, 900, 470, 900); x.stroke() }
      drawBits(x, KITE, KITE_C, kx, ky, 16 * k, { rot: 0.2 })
      label(x, 790, 1060, 'TO-DO: NOTHING', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: GREEN, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Being understood. | *Your people exist.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 790, 800, 110, pop01(t, P.t0 + 0.2, 0.35, 2), t, 0.4)
      label(x, 790, 990, '✦ COMPATIBLE', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1110, 'me too!!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Boundaries. | *Not every sad thing is yours.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', tears: lt => lt < 1.4 ? 2 : 1, star: ST,
    front(x, t, lt, P) {
      const away = ease.inOutCubic(prog(lt, 1.0, 1.6))
      drawBits(x, BOX, BOX_C, lerp(780, 900, away), 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { alpha: 1 - 0.6 * away })
      label(x, lerp(780, 900, away), 820, 'EVERYONE’S FEELINGS', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 24, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 760, 1100, 'SET DOWN. GENTLY.', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0150', key: 'G', accent: ACC, ending: 'callback',
  title: 'What each sign | *needs more of.*',
  cameos: CAMEOS,
  group: { cap: 'A little more | *of the good stuff.*' },
  last: {
    text: 'Aries waited. | *Ten whole seconds.*',
    draw(x, t, lt) {
      finish(x, t, 720, 1060, 1.0 * pop01(t, t - lt + 0.4, 0.4, 2))
      const k = pop01(t, t - lt + 0.7, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'aries', 330, 1080, 260 * k, { mood: lt > 1.8 ? 'sparkle' : 'squint', look: [1, 0], seed: 47, hops: [t - lt + 1.9] })
      label(x, 720, 760, `WAITING: ${Math.min(10, Math.floor(Math.max(0, lt - 0.8) * 10))} SEC`, pop01(t, t - lt + 0.8, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 330, 1060, t - lt + 1.9, 8, 200, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
