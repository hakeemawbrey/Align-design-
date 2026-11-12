// r2a0269: star_advice, ADVICE ROLLCALL, "Each sign's | birthday wish." (~57 s vertical, signs3kit social cut,
// music: lofi · E). Twelve warm, specific wishes, each with one light visual gag.
//   0.0–3.6    "Each sign’s | *birthday wish.*"
//   3.6–49.2   ♈ a year that keeps up (blew the candles out mid-song) · ♉ a slower year and a bigger cake
//              · ♊ two wishes, maybe three · ♋ everyone home at one table · ♌ to be cheered by the right people
//              · ♍ a year with nothing to fix · ♎ a group chat at peace · ♏ one person to tell everything (a new match)
//              · ♐ a passport full of stamps · ♑ one day off, really off · ♒ to be understood, weird parts too
//              (two odd puzzle pieces click) · ♓ for everyone to be okay (happy tears)
//  49.2        "Twelve wishes. | *One cake.*"
//  52.6        callback: "Taurus got | *the big slice.*"  Taurus' giant cake comes back, one huge slice gone.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, confetti, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = '#ff8fb1'
const ST = { x: -170 }
const tag = (x, cx, cy, k, s, bg, rot = -0.04, size = 32) => label(x, cx, cy, s, k, { size, bg, rot, font: MONO, weight: 700 })

/** a pixel-ish layer cake: w wide, `tiers` tall, n candles (lit until `out`) */
function cake(x, cx, cy, k, t, { w = 260, tiers = 2, n = 3, lit = true, col = PINK, slice = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const th = 70
  x.fillStyle = INK; x.fillRect(-w / 2 - 30, 0, w + 60, 22); x.fillStyle = '#d8dbe8'; x.fillRect(-w / 2 - 24, 4, w + 48, 14)
  for (let i = 0; i < tiers; i++) {
    const tw = w - i * 60, y = -th * (i + 1)
    x.fillStyle = INK; x.fillRect(-tw / 2 - 6, y - 6, tw + 12, th + 6)
    x.fillStyle = i % 2 ? CREAM : col; x.fillRect(-tw / 2, y, tw, th)
    x.fillStyle = i % 2 ? col : CREAM; for (let j = 0; j < tw / 30; j++) x.fillRect(-tw / 2 + j * 30, y, 18, 14 + (j % 2) * 8)
  }
  if (slice > 0) { x.fillStyle = '#140c30'; x.beginPath(); x.moveTo(0, -th * tiers - 10); x.lineTo(w / 2 + 8, -th * tiers - 10); x.lineTo(w / 2 + 8, 0); x.lineTo(0, 0); x.closePath(); x.globalAlpha = slice; x.fill(); x.globalAlpha = 1 }
  const topW = w - (tiers - 1) * 60, topY = -th * tiers
  for (let i = 0; i < n; i++) {
    const px = -topW / 2 + (i + 1) * topW / (n + 1)
    x.fillStyle = INK; x.fillRect(px - 9, topY - 64, 18, 64); x.fillStyle = [SKYB, GOLD, MINT, LAV][i % 4]; x.fillRect(px - 5, topY - 60, 10, 60)
    if (lit) { const f = 1 + 0.15 * Math.sin(t * 14 + i); x.fillStyle = ORANGE; x.beginPath(); x.ellipse(px, topY - 80, 9 * f, 16 * f, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#fff1b0'; x.beginPath(); x.ellipse(px, topY - 76, 4, 8, 0, 0, Math.PI * 2); x.fill() }
    else { x.strokeStyle = 'rgba(239,230,214,0.6)'; x.lineWidth = 4; x.beginPath(); for (let j = 0; j < 8; j++) x.lineTo(px + Math.sin(j + t * 4) * 6, topY - 70 - j * 10); x.stroke() }
  }
  x.restore()
}
/** a puzzle piece (side: -1 tab right, 1 slot left) */
function piece(x, cx, cy, s, col, side) {
  x.save(); x.translate(cx, cy)
  x.fillStyle = INK; x.fillRect(-s / 2 - 6, -s / 2 - 6, s + 12, s + 12)
  x.fillStyle = col; x.fillRect(-s / 2, -s / 2, s, s)
  if (side < 0) { x.fillStyle = INK; x.beginPath(); x.arc(s / 2 + 10, 0, 34, 0, Math.PI * 2); x.fill(); x.fillStyle = col; x.beginPath(); x.arc(s / 2 + 10, 0, 28, 0, Math.PI * 2); x.fill(); x.fillRect(s / 2 - 10, -28, 20, 56) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'A year that | *keeps up with you.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', star: ST, hops: [0.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      cake(x, 790, 1010, pop01(t, P.t0 + 0.2, 0.35, 2), t, { n: 3, lit: lt < 0.8, col: '#ff8a7a' })
      bubble(x, 790, 650, 'happy bi—', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: BONE, tail: 'bl' })
      tag(x, 790, 1120, pop01(t, P.t0 + 1.2, 0.3, 2.2), 'CANDLES: ALREADY OUT', GOLD, 0.04, 28)
    } },
  { sign: 'taurus', cap: 'A slower year. | *And a bigger cake.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const g = ease.outBack ? ease.outCubic(prog(lt, 0.2, 1.4)) : 1
      cake(x, 790, 1080, pop01(t, P.t0 + 0.2, 0.35, 2), t, { w: 260, tiers: 1 + Math.round(g * 3), n: 2, col: '#5fd068' })
      tag(x, 790, 1130, pop01(t, P.t0 + 1.6, 0.3, 2.2), 'BIGGER. STILL GROWING.', MINT, 0.03, 26)
    } },
  { sign: 'gemini', cap: 'Two wishes. | *Maybe three.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      cake(x, 790, 1060, pop01(t, P.t0 + 0.2, 0.35, 2), t, { w: 200, tiers: 1, n: 1 + Math.min(2, Math.floor(prog(lt, 0.4, 1.6) * 3)), col: '#ffd23a' })
      bubble(x, 760, 700, 'wish #2…', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, col: BONE, tail: 'bl' })
      bubble(x, 840, 820, 'ok, #3!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, col: MINT, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Everyone home. | *Same table.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) { x.save(); x.translate(780, 1000); x.scale(k * 0.85, k); x.fillStyle = INK; x.fillRect(-200, -16, 400, 32); x.fillStyle = WOOD; x.fillRect(-194, -10, 388, 20); x.fillRect(-180, 10, 16, 120); x.fillRect(164, 10, 16, 120); x.restore() }
      ;['taurus', 'leo', 'pisces'].forEach((id, i) => { const kk = pop01(t, P.t0 + 0.5 + i * 0.25, 0.35, 2); if (kk > 0.01) signChar(x, t, id, 660 + i * 120, 900, 115 * kk, { mood: 'happy', seed: 80 + i, glyph: false, tears: id === 'pisces' ? 1 : 0 }) })
      hearts(x, t, 790, 760, P.t0 + 1.3, { n: 6, life: 1.8, spread: 300, cell: 7, seed: 3 })
      tag(x, 790, 680, pop01(t, P.t0 + 1.5, 0.3, 2.2), 'SEATS: ALL FULL', PINK, -0.04, 32)
    } },
  { sign: 'leo', cap: 'To be cheered | *by the right people.*', mood: lt => lt > 0.9 ? 'sparkle' : 'happy', star: ST, hops: [1.0, 1.5],
    front(x, t, lt, P) {
      ;['aries', 'libra', 'sagittarius'].forEach((id, i) => { const kk = pop01(t, P.t0 + 0.3 + i * 0.2, 0.35, 2); if (kk > 0.01) signChar(x, t, id, 660 + i * 120, 1000, 115 * kk, { mood: 'sparkle', seed: 90 + i, glyph: false, hops: [t - ((t * 2 + i * 0.3) % 1) / 2] }) })
      tag(x, 790, 780, pop01(t, P.t0 + 0.9, 0.3, 2.4), 'YAY, LEO!', ORANGE, -0.04, 52)
      confetti(x, t, 790, 880, P.t0 + 1.0, { n: 18, spread: 200, h: 420 })
    } },
  { sign: 'virgo', cap: 'A year with | *nothing to fix.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const shut = ease.inOutCubic(prog(lt, 0.6, 1.1))
      card(x, 790, 920, 300, 150, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: RED, rot: 0.02 }, () => { x.fillStyle = INK; x.fillRect(-60, -110 + 40 * shut, 120, 16); x.fillRect(-60, -110 + 40 * shut, 16, 40); x.fillRect(44, -110 + 40 * shut, 16, 40); txt(x, 'TOOLBOX', 0, 10, { size: 32, color: CREAM }) })
      tag(x, 790, 700, pop01(t, P.t0 + 1.1, 0.3, 2.2), 'ALL FIXED. REST.', MINT, -0.04, 34)
      tag(x, 790, 1100, pop01(t, P.t0 + 1.6, 0.3, 2.2), 'TOOLS: ON VACATION', BONE, 0.04, 30)
    } },
  { sign: 'libra', cap: 'A group chat | *at total peace.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'FRIENDS (6)', headCol: PINK, size: 24, lines: [['love u all', PINK, pop01(t, P.t0 + 0.5, 0.3, 2)], ['agreed!!', MINT, pop01(t, P.t0 + 0.9, 0.3, 2)], ['same', GOLD, pop01(t, P.t0 + 1.3, 0.3, 2)]] })
      tag(x, 790, 1110, pop01(t, P.t0 + 1.7, 0.3, 2.2), 'DRAMA: NONE', LAV, 0.04, 32)
    } },
  { sign: 'scorpio', cap: 'One person | *to tell everything.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 850, 320, 320, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        x.fillStyle = '#c97bff'; x.fillRect(-160, -160, 320, 70); txt(x, '✦ NEW MATCH', 0, -125, { size: 30, font: MONO, weight: 700 })
        txt(x, '“tell me', 0, -20, { size: 38, color: INK }); txt(x, 'everything”', 0, 40, { size: 38, color: INK })
        if (lt > 1.3) txt(x, '…okay. (2 hrs)', 0, 110, { size: 26, weight: 700, color: GREEN })
      })
      if (lt > 1.3) hearts(x, t, 380, 1000, P.t0 + 1.3 * 1.29, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 4 })
    } },
  { sign: 'sagittarius', cap: 'A passport | *full of stamps.*', mood: 'sparkle', star: { x: 150 }, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      card(x, 320, 850, 300, 380, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#2a6fb0', rot: -0.04 }, () => {
        txt(x, 'PASSPORT', 0, -150, { size: 30, color: GOLD, font: MONO, weight: 700 })
        const COLS = [RED, MINT, GOLD, PINK, LAV, ORANGE]
        for (let i = 0; i < 6; i++) { const kk = pop01(t, P.t0 + 0.6 + i * 0.22, 0.25, 2.6); if (kk < 0.01) continue; x.save(); x.translate(-80 + (i % 2) * 160, -60 + Math.floor(i / 2) * 95); x.rotate((i % 3 - 1) * 0.25); x.scale(kk, kk); x.strokeStyle = COLS[i]; x.lineWidth = 6; x.strokeRect(-56, -32, 112, 64); txt(x, '✈', 0, 2, { size: 32, color: COLS[i] }); x.restore() }
      })
      tag(x, 320, 1100, pop01(t, P.t0 + 1.8, 0.3, 2.2), 'PAGES LEFT: 0', GOLD, 0.04, 32)
    } },
  { sign: 'capricorn', cap: 'One day off. | *Really off.*', mood: lt => lt > 1.1 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 850, 320, 340, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.03 }, () => {
        x.fillStyle = '#2fc79a'; x.fillRect(-160, -170, 320, 70); txt(x, 'BIRTHDAY', 0, -135, { size: 32, font: MONO, weight: 700 })
        const st = pop01(t, P.t0 + 0.9, 0.3, 2.8)
        if (st > 0.01) { x.save(); x.rotate(-0.15); x.scale(st, st); x.strokeStyle = RED; x.lineWidth = 10; x.strokeRect(-120, -50, 240, 120); txt(x, 'OFF', 0, 12, { size: 84, color: RED }); x.restore() }
      })
      tag(x, 790, 1100, pop01(t, P.t0 + 1.5, 0.3, 2.2), 'EMAILS: NOT TODAY', LAV, 0.04, 30)
    } },
  { sign: 'aquarius', cap: 'To be understood. | *Weird parts too.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), j = ease.inOutCubic(prog(lt, 0.7, 1.3))
      if (k > 0.01) { x.save(); x.globalAlpha = k; piece(x, lerp(620, 700, j), 860, 140, '#6fc3ff', -1); piece(x, lerp(960, 880, j), 860, 140, PINK, 1); x.restore() }
      if (j > 0.95) sparkles(x, t, 790, 860, P.t0 + 1.3 * 1.29, 7, 170, 0.3)
      tag(x, 790, 1060, pop01(t, P.t0 + 1.5, 0.3, 2.4), 'IT’S A FIT', GOLD, -0.04, 40)
    } },
  { sign: 'pisces', cap: 'For everyone | *to be okay.*', mood: lt => lt < 0.9 ? 'happy' : 'heart', tears: lt => lt < 0.9 ? 2 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      cake(x, 790, 1040, pop01(t, P.t0 + 0.2, 0.35, 2), t, { w: 220, tiers: 2, n: 3, col: '#b7a6ff' })
      tag(x, 790, 680, pop01(t, P.t0 + 0.9, 0.3, 2.2), 'HAPPY TEARS ONLY', SKYB, -0.04, 32)
      hearts(x, t, 790, 900, P.t0 + 1.2, { n: 6, life: 1.8, spread: 220, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2a0269', key: 'E', accent: ACC, ending: 'callback',
  title: 'Each sign’s | *birthday wish.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve wishes. | *One cake.*' },
  last: {
    text: 'Taurus got | *the big slice.*',
    draw(x, t, lt) {
      cake(x, 540, 1300, pop01(t, t - lt + 0.5, 0.45, 1.8), t, { w: 420, tiers: 4, n: 4, col: '#5fd068', slice: ease.outCubic(prog(lt, 1.3, 1.7)) })
      const s = pop01(t, t - lt + 1.5, 0.4, 2)
      if (s > 0.01) signChar(x, t, 'taurus', 850, 1150, 200 * s, { mood: 'heart', seed: 55, hops: [t - lt + 2.0] })
      label(x, 540, 1420, 'SLICE: HALF THE CAKE', pop01(t, t - lt + 2.0, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
