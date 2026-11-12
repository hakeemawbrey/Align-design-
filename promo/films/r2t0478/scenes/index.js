// r2t0478: star_talk, BE LIKE, "Zodiacs when you | save a seat *be like.*" (~57 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs, each the most extreme version of themselves when someone saves them a seat. Ending: callback.
//   0.0–3.6    "Zodiacs when you | save a seat *be like.*"
//   3.6–49.2   ♈ sprinted to it · ♉ moved in (blanket, plant, snacks) · ♊ brought four friends · ♋ you're family now
//              · ♌ only if it's front row · ♍ thanked you, then wiped it · ♎ two saved seats (match, bestie), sat between
//              · ♏ asked for the one facing the door · ♐ never sat down · ♑ booked it for next year
//              · ♒ brought their own beanbag · ♓ wrote a poem about it, sobbing
//  49.2        "Save one seat. | *Lose a whole row.*"
//  52.6        callback: "Taurus? | *Still lives there.*"  (card two's move-in, paid off)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', GREY = '#9aa5c4', PURP = '#6b62a8', DEEP = '#2a2350', GREEN = '#5fd068', BROWN = '#8a4a2e'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const ST = { x: -170 }

/** a phone with a header strip and chat pills: lines = [[text, colour, k, right?], …] */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = DEEP; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 24px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 64); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
/** soft pixel puffs rising from (cx, cy) after t0 */
function puffs(x, t, cx, cy, t0, { n = 5, col = '#e6e1f2', cell = 14, rise = 200, spread = 90, seed = 0 } = {}) {
  if (t < t0) return
  for (let i = 0; i < n; i++) {
    const ph = (((t - t0) * 0.9 + i / n) % 1 + 1) % 1
    const px = cx + Math.sin(i * 2.1 + seed) * spread * 0.5 + Math.sin(ph * 5 + i) * 12, py = cy - ph * rise, r = cell * (0.8 + ph * 1.4)
    x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * 0.9
    x.fillStyle = INK; x.fillRect(px - r - 4, py - r * 0.7 - 4, 2 * r + 8, 1.4 * r + 8)
    x.fillStyle = col; x.fillRect(px - r, py - r * 0.7, 2 * r, 1.4 * r)
    x.restore()
  }
}
/** a paper card with lines of text */
function note(x, cx, cy, k, lines, { w = 300, bg = '#ffe27a', size = 34, rot = -0.06, font = INTER, weight = 800, color = INK } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.55, h = lines.length * lh + 50
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = color; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 25 + lh * (i + 0.5)))
  x.restore()
}
/** paper confetti falling */
function confetti(x, t, cx, cy, t0, { n = 22, spread = 320, h = 520 } = {}) {
  const lt = t - t0
  if (lt <= 0) return
  const COLS = [GOLD, PINK, MINT, SKYB, ORANGE, LAV]
  for (let i = 0; i < n; i++) {
    const ph = (lt * 0.55 + i * 0.137) % 1
    const px = cx + Math.sin(i * 2.71) * spread + Math.sin(t * 2 + i) * 18, py = cy - h / 2 + ph * h
    x.save(); x.translate(px, py); x.rotate(t * 3 + i); x.globalAlpha = Math.sin(Math.PI * ph)
    x.fillStyle = COLS[i % COLS.length]; x.fillRect(-9, -5, 18, 10); x.restore()
  }
}
/** a profile card with a sign star inside */
function profile(x, t, cx, cy, k, id, title, { w = 250, h = 320, mood = 'sparkle', rot = 0.05, bg = DEEP, col = GOLD } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#140c30'; x.fillRect(-w / 2 + 14, -h / 2 + 14, w - 28, h - 90)
  signChar(x, t, id, 0, -26, 150, { mood, seed: 71, glyph: false, glow: 0.9, tears: id === 'pisces' ? 1 : 0 })
  x.fillStyle = col; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(title, 0, h / 2 - 38)
  x.restore()
}
/** a birth-chart wheel */
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.3)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.4, 2.6, 4.5]) x.fillRect(Math.cos(a) * r * 0.4 - 8, Math.sin(a) * r * 0.4 - 8, 16, 16)
  x.restore()
}
/** a box with a lid (gift): open = 0…1 lifts the lid */
function giftBox(x, cx, cy, k, open = 0, { body = PINK, ribbon = GOLD, w = 200, h = 160, bow = true } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = body; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = ribbon; x.fillRect(-14, -h / 2, 28, h)
  const ly = -h / 2 - 30 - open * 120, lr = open * -0.5
  x.save(); x.translate(0, ly); x.rotate(lr)
  x.fillStyle = INK; x.fillRect(-w / 2 - 22, -6, w + 44, 48)
  x.fillStyle = body; x.fillRect(-w / 2 - 16, 0, w + 32, 36)
  x.fillStyle = ribbon; x.fillRect(-14, 0, 28, 36)
  if (bow) { x.fillStyle = INK; x.fillRect(-62, -40, 124, 46); x.fillStyle = ribbon; x.fillRect(-56, -34, 46, 34); x.fillRect(10, -34, 46, 34); x.fillStyle = '#c98f2a'; x.fillRect(-12, -30, 24, 30) }
  x.restore()
  x.restore()
}

const ACC = '#7dffb0'
const CHAIR = ['CC.......', 'CC.......', 'CC.......', 'CC.......', 'CC.......', 'CSSSSSSSS', 'CCCCCCCCC', 'CK.....KC', 'C.......C', 'C.......C', 'C.......C']
const chairC = c => ({ C: c, S: CREAM, K: c })
const PLANT = ['.G.G.', 'GGGGG', '.GGG.', '..G..', 'PPPPP', '.PPP.']
const PLANT_C = { G: GREEN, P: ORANGE }
const SNACK = ['RRRR', 'RYYR', 'RRRR']
const SNACK_C = { R: RED, Y: GOLD }
const SPRAY = ['..KK..', '..KKKK', '..WW..', '.SSSS.', '.SSSS.', '.SSSS.', '.SSSS.', '.SSSS.']
const SPRAY_C = { K: INK, W: CREAM, S: SKYB }
const BEAN = ['...PPPP...', '.PPPPPPPP.', 'PPPPPPPPPP', 'PPPPPPPPPP', 'PPPPPPPPPP', '.PPPPPPPP.']
const BEAN_C = { P: '#c97bff' }
/** Taurus' move-in: chair + blanket + plant + snacks; k each */
function movedIn(x, t, cx, cy, k, { star = false, s = 1 } = {}) {
  drawBits(x, CHAIR, chairC(GREEN), cx, cy, 22 * s * k)
  if (star && k > 0.3) signChar(x, t, 'taurus', cx, cy - 70 * s, 190 * s * k, { mood: 'sleepy', seed: 23, glyph: false })
  if (k > 0.01) { x.save(); x.fillStyle = INK; x.fillRect(cx - 96 * s, cy - 6 * s, 192 * s * k, 46 * s); x.fillStyle = PINK; x.fillRect(cx - 90 * s, cy, 180 * s * k, 34 * s); x.restore() }
  drawBits(x, PLANT, PLANT_C, cx + 150 * s, cy + 40 * s, 14 * s * k)
  drawBits(x, SNACK, SNACK_C, cx - 140 * s, cy + 80 * s, 14 * s * k, { rot: -0.1 })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Saw the saved seat. | *Sprinted.*', mood: 'wide', star: { x: -60 }, hops: [0.3, 0.6, 0.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      x.save(); x.globalAlpha = clamp(lt / 0.3) * 0.8; x.fillStyle = BONE
      for (let i = 0; i < 5; i++) x.fillRect(180 + ((lt * 600 + i * 90) % 220), 820 + i * 26, 90, 8)
      x.restore()
      drawBits(x, CHAIR, chairC(RED), 800, 1060, 20 * pop01(t, P.t0 + 0.1, 0.3, 2))
    },
    front(x, t, lt, P) {
      L(x, 800, 640, 'ARRIVED: 0.4 SEC', pop01(t, P.t0 + 1.0, 0.3, 2.2), RED, -0.04, 32, CREAM)
      bubble(x, 300, 640, 'MINE!!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 46, tail: 'br' })
    } },
  { sign: 'taurus', cap: 'You saved them a seat. | They *moved in.*', mood: lt => lt > 1.4 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, CHAIR, chairC(GREEN), 800, 1020, 22 * k)
      const b = pop01(t, P.t0 + 0.7, 0.3, 2)
      if (b > 0.01) { x.save(); x.fillStyle = INK; x.fillRect(704, 1014, 192 * b, 46); x.fillStyle = PINK; x.fillRect(710, 1020, 180 * b, 34); x.restore() }
      drawBits(x, PLANT, PLANT_C, 950, 1060, 14 * pop01(t, P.t0 + 1.0, 0.3, 2))
      drawBits(x, SNACK, SNACK_C, 660, 1100, 14 * pop01(t, P.t0 + 1.3, 0.3, 2), { rot: -0.1 })
      L(x, 800, 680, 'ADDRESS: THIS SEAT', pop01(t, P.t0 + 1.6, 0.3, 2.2), GREEN, -0.04, 30)
    } },
  { sign: 'gemini', cap: 'You saved one seat. | They *brought four friends.*', mood: 'sparkle', star: ST, hops: [1.0],
    front(x, t, lt, P) {
      const IDS = ['leo', 'libra', 'aries', 'sagittarius']
      IDS.forEach((id, i) => {
        const k = pop01(t, P.t0 + 0.4 + i * 0.25, 0.3, 2)
        if (k > 0.01) signChar(x, t, id, 640 + (i % 2) * 180, 820 + Math.floor(i / 2) * 200, 150 * k, { mood: 'happy', look: [-1, 0], seed: 40 + i, glyph: false })
      })
      bubble(x, 560, 620, 'squeeze in!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'You saved them a seat. | You’re *family now.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.rotate(0.05); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -130, 300, 260); x.fillStyle = CREAM; x.fillRect(-140, -120, 280, 240)
        x.fillStyle = '#140c30'; x.fillRect(-124, -104, 248, 160)
        x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.fillText('day 1 ♡', 0, 96)
        x.restore()
        signChar(x, t, 'cancer', 740, 830, 110 * k, { mood: 'heart', seed: 51, glyph: false, glow: 0.4 })
        signChar(x, t, 'virgo', 850, 830, 110 * k, { mood: 'happy', seed: 52, glyph: false, glow: 0.4 })
      }
      L(x, 790, 640, 'FRAMED IT', pop01(t, P.t0 + 1.2, 0.3, 2.2), PINK, -0.04, 34)
      hearts(x, t, 790, 1000, P.t0 + 1.4, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Saved them a seat? | *Front row only.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', star: { x: -150, y: -40 },
    front(x, t, lt, P) {
      for (let r = 0; r < 2; r++) for (let i = 0; i < 3; i++) drawBits(x, CHAIR, chairC(r === 0 ? GOLD : GREY), 640 + i * 115 - r * 30, 960 + r * 150, 13 * pop01(t, P.t0 + 0.2 + (r * 3 + i) * 0.06, 0.3, 2))
      L(x, 780, 820, 'VIP', pop01(t, P.t0 + 0.9, 0.3, 2.2), GOLD, 0.05, 40)
      bubble(x, 760, 640, 'row two? | darling, no.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Said thank you. | Then *wiped the seat.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CHAIR, chairC(MINT), 800, 1020, 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      const sp = pop01(t, P.t0 + 0.6, 0.3, 2)
      drawBits(x, SPRAY, SPRAY_C, 640 + Math.sin(t * 10) * 6, 840, 14 * sp, { rot: -0.3 })
      if (lt > 1.0) puffs(x, t, 760, 880, P.t0 + 1.0 * (3.1 / 2.4), { n: 4, cell: 8, rise: 80, spread: 80, col: SKYB })
      sparkles(x, t, 800, 940, P.t0 + 1.7, 6, 130, 0.5)
      bubble(x, 800, 640, 'thank you! (wipe)', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'Two saved seats. | *Sat between them.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: { x: 0, y: 40 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, CHAIR, chairC(PINK), 270, 1040, 20 * k)
      drawBits(x, CHAIR, chairC(SKYB), 810, 1040, 20 * k)
    },
    front(x, t, lt, P) {
      L(x, 270, 820, '✦ MATCH', pop01(t, P.t0 + 0.4, 0.3, 2), PINK, -0.05, 32)
      L(x, 810, 820, 'BESTIE', pop01(t, P.t0 + 0.6, 0.3, 2), SKYB, 0.05, 32)
      L(x, 540, 620, 'PERFECTLY FAIR', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, -0.03, 32)
    } },
  { sign: 'scorpio', cap: 'Saved them a seat? | *Facing the door.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(860, 900); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-70, -140, 140, 280); x.fillStyle = BROWN; x.fillRect(-60, -130, 120, 260); x.fillStyle = GOLD; x.fillRect(30, -6, 16, 16)
        x.restore()
      }
      drawBits(x, CHAIR, chairC(RED), 660, 1060, 16 * k, { sx: -1 })
      L(x, 760, 680, 'FULL VIEW ✓', pop01(t, P.t0 + 1.0, 0.3, 2.2), MINT, -0.04, 32)
      bubble(x, 760, 1150, 'just in case.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Saved them a seat. | They *never sat down.*', mood: 'sparkle', star: { x: 150 }, hops: [0.3, 0.7, 1.1, 1.5, 1.9],
    back(x, t, lt, P) { drawBits(x, CHAIR, chairC(LAV), 320, 1060, 20 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      L(x, 320, 850, 'SEAT: UNUSED', pop01(t, P.t0 + 0.8, 0.3, 2.2), LAV, -0.04, 32)
      bubble(x, 760, 640, 'who wants | to dance?!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Saved them a seat? | *Booked it through 2030.*', mood: 'neutral', look: [-1, 0], star: { x: 150 },
    front(x, t, lt, P) {
      drawBits(x, CHAIR, chairC(GREY), 320, 1040, 20 * pop01(t, P.t0 + 0.15, 0.3, 2))
      note(x, 320, 800, pop01(t, P.t0 + 0.5, 0.3, 2), ['RESERVED', 'Capricorn', '2026–2030'], { w: 300, bg: CREAM, size: 32, rot: -0.05, font: MONO, weight: 700 })
      L(x, 320, 1180, 'LONG-TERM PLAN', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Saved them a seat. | *Brought a beanbag.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CHAIR, chairC(GREY), 680, 1040, 16 * pop01(t, P.t0 + 0.15, 0.3, 2), { alpha: 0.6 })
      drawBits(x, BEAN, BEAN_C, 860, 1080, 20 * pop01(t, P.t0 + 0.7, 0.35, 2))
      bubble(x, 790, 660, 'chairs are | so last year', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Someone saved a seat. | *Wrote a poem about it.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      note(x, 790, 880, pop01(t, P.t0 + 0.3, 0.3, 2), ['ode to', 'a chair', 'by Pisces', '(verse 9)'], { w: 280, bg: '#dff4ff', size: 36, rot: 0.05, font: "'EB Garamond', Georgia, serif", weight: 700 })
      hearts(x, t, 790, 1160, P.t0 + 1.0, { n: 4, life: 1.6, spread: 160, cell: 6, seed: 5 })
      L(x, 790, 640, 'TOO KIND', pop01(t, P.t0 + 1.4, 0.3, 2.2), SKYB, -0.04, 36)
    } },
]

const F = makeFilm({
  id: 'r2t0478', key: 'G', accent: ACC, ending: 'callback',
  title: 'Zodiacs when you | save a seat *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Save one seat. | *Lose a whole row.*' },
  last: {
    text: 'Taurus? | *Still lives there.*',
    draw(x, t, lt) {
      const t0 = t - lt
      movedIn(x, t, 540, 1080, pop01(t, t0 + 0.5, 0.4, 2), { star: true, s: 1.3 })
      L(x, 540, 800, 'NOW WITH A RUG', pop01(t, t0 + 1.4, 0.3, 2.2), GREEN, -0.04, 34)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
