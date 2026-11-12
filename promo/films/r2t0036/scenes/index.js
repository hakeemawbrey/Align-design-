// r2t0036: THE SIGNS AS… v3 ROLL CALL, "The signs at | the nail salon." (~57 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs in zodiac order, each the most extreme version of itself at the nail salon. Ending: callback.
//   0.0–3.6    "The signs at | the nail *salon.*"
//   3.6–49.2   Aries dries them with a leaf blower · Taurus moved into the massage chair · Gemini: ten nails, ten colours
//              · Cancer brought snacks for the whole salon · Leo had the salon rate the nails · Virgo found a smudge on
//              someone else · Libra couldn't pick a colour (CLOSED) · Scorpio: black, every time · Sagittarius booked a
//              flight with wet nails · Capricorn answered emails mid-manicure · Aquarius got their birth chart painted on
//              · Pisces cried at the hand massage
//  49.2        "Nobody | sat *still.*"
//  52.6        CALLBACK: "The leaf blower? | Now *salon policy.*"  The leaf blower comes back, everyone's nails dry at once.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', GREEN = '#7ee08a', TEAL = '#4fd1c5', PURPLE = '#b06cff', BLACK = '#2a2350', NAIL = '#ff5fa2'

// ── helpers
function box(x, l, tp, w, h, col, b = 6) { x.fillStyle = INK; x.fillRect(l - b, tp - b, w + 2 * b, h + 2 * b); x.fillStyle = col; x.fillRect(l, tp, w, h) }
function shadow(x, l, tp, w, h) { x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(l + 10, tp + 12, w, h) }
// a nail polish bottle
function polish(x, cx, cy, k, col, { s = 1, rot = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * s, k * s)
  shadow(x, -44, -30, 88, 110)
  box(x, -16, -96, 32, 62, BLACK)
  box(x, -44, -30, 88, 110, col)
  x.fillStyle = 'rgba(255,255,255,0.45)'; x.fillRect(-32, -18, 12, 64)
  x.restore()
}
// a pixel hand, palm up-right, five nails in the given colours
function hand(x, cx, cy, k, nails, { s = 1, rot = -0.08, skin = '#f6c89a', art = null } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * s * 1.4, k * s * 1.4)
  shadow(x, -100, -40, 200, 190)
  const fingers = [[-92, -6, 150], [-46, -64, 200], [0, -80, 216], [46, -64, 200], [92, -10, 150]]
  // palm
  box(x, -90, 30, 180, 130, skin)
  fingers.forEach(([fx, fy, h], i) => {
    const w = 38, l = fx - w / 2, tp = fy - (i === 0 ? -40 : 0)
    if (i === 0) { box(x, -130, 40, 60, 70, skin); x.fillStyle = nails[0]; x.fillRect(-126, 44, 30, 30) }
    else { box(x, l, tp, w, 120, skin); x.fillStyle = INK; x.fillRect(l + 2, tp - 2, w - 4, 4); x.fillStyle = nails[i]; x.fillRect(l + 4, tp + 4, w - 8, 36); x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(l + 8, tp + 8, 6, 14) }
    if (art && i > 0) art(x, fx, tp + 22, i)
  })
  x.fillStyle = skin; x.fillRect(-84, 30, 168, 30)
  x.restore()
}
// a leaf blower with gusts
function blower(x, t, cx, cy, k, { gust = 1, flip = false } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(flip ? -k : k, k)
  shadow(x, -110, -60, 220, 120)
  box(x, -110, -60, 130, 100, ORANGE)
  box(x, -90, -110, 80, 30, BLACK)
  x.fillStyle = INK; x.fillRect(-70, -84, 14, 30); x.fillRect(-30, -84, 14, 30)
  box(x, 20, -30, 160, 40, '#d8dbe8')
  x.fillStyle = BLACK; x.fillRect(-90, -40, 40, 50)
  if (gust > 0) {
    x.strokeStyle = BONE; x.lineWidth = 8; x.lineCap = 'round'
    for (let i = 0; i < 4; i++) {
      const ph = (t * 2.2 + i * 0.25) % 1, gx = 200 + ph * 180, gy = -10 + (i - 1.5) * 26
      x.globalAlpha = gust * Math.sin(Math.PI * ph); x.beginPath(); x.moveTo(gx, gy); x.lineTo(gx + 60, gy + Math.sin(t * 8 + i) * 8); x.stroke()
    }
  }
  x.restore()
}
function massageChair(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  shadow(x, -130, -170, 260, 330)
  box(x, -110, -170, 200, 220, PURPLE)
  box(x, -130, 40, 260, 70, PURPLE)
  box(x, -150, -40, 40, 120, BLACK); box(x, 110, -40, 40, 120, BLACK)
  x.fillStyle = '#d29bff'; for (let i = 0; i < 3; i++) x.fillRect(-80, -140 + i * 60, 140, 34)
  box(x, -40, 116, 80, 40, BLACK)
  x.restore()
}
function cookieTray(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  shadow(x, -170, -40, 340, 90)
  box(x, -170, -10, 340, 50, '#d8dbe8')
  for (let r = 0; r < 3; r++) for (let i = 0; i < 5 - r; i++) {
    const px = -120 + i * 60 + r * 30, py = -36 - r * 44
    x.fillStyle = INK; x.beginPath(); x.arc(px, py, 30, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#d99a4e'; x.beginPath(); x.arc(px, py, 24, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#5b2e1a'; x.fillRect(px - 10, py - 8, 7, 7); x.fillRect(px + 6, py + 2, 7, 7); x.fillRect(px - 4, py + 10, 6, 6)
  }
  x.restore()
}
function scoreCard(x, cx, cy, k, n, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  shadow(x, -50, -60, 100, 120); box(x, -50, -60, 100, 120, BONE)
  x.fillStyle = INK; x.font = `800 62px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(String(n), 0, 4)
  x.fillStyle = BLACK; x.fillRect(-6, 66, 12, 70)
  x.restore()
}
function magnifier(x, cx, cy, k, rot = -0.6) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-16, 70, 32, 130); x.fillStyle = '#8a4a2e'; x.fillRect(-10, 76, 20, 118)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 92, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 84, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(191,230,255,0.85)'; x.beginPath(); x.arc(0, 0, 70, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#fff'; x.fillRect(-40, -44, 16, 34)
  x.restore()
}
function ticket(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.07); x.scale(k, k)
  shadow(x, -150, -70, 300, 140); box(x, -150, -70, 300, 140, BONE)
  x.fillStyle = SKYB; x.fillRect(-150, -70, 300, 40)
  x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BOARDING PASS', 0, -50)
  x.font = `800 40px ${INTER}`; x.fillText('ANYWHERE →', 0, 14)
  x.font = `700 22px ${MONO}`; x.fillStyle = '#6b62a8'; x.fillText('DEPARTS: NOW', 0, 50)
  x.restore()
}
function laptop(x, cx, cy, k, sent) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  shadow(x, -160, -120, 320, 250)
  box(x, -140, -130, 280, 180, '#d8dbe8'); x.fillStyle = '#140c30'; x.fillRect(-126, -116, 252, 152)
  for (let i = 0; i < 4; i++) { x.fillStyle = i < sent ? MINT : '#6b62a8'; x.fillRect(-106, -96 + i * 34, 150, 18); if (i < sent) { x.fillStyle = MINT; x.font = `800 22px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('✓', 60, -86 + i * 34) } }
  box(x, -170, 56, 340, 26, BLACK)
  x.restore()
}
function tissues(x, t, cx, cy, k, pulled) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  shadow(x, -110, -40, 220, 120); box(x, -110, -40, 220, 120, SKYB)
  x.fillStyle = '#6fc3ff'; for (let i = 0; i < 4; i++) x.fillRect(-96 + i * 52, -26, 30, 92)
  box(x, -50, -52, 100, 16, INK, 0)
  // tissues flying up
  for (let i = 0; i < pulled; i++) {
    const ph = ((t * 1.3 + i * 0.29) % 1), px = Math.sin(i * 2.3) * 120, py = -70 - ph * 260
    x.save(); x.globalAlpha = Math.sin(Math.PI * ph); x.translate(px, py); x.rotate(Math.sin(t * 3 + i) * 0.4)
    box(x, -26, -22, 52, 44, '#ffffff', 4); x.restore()
  }
  x.restore()
}
// the chart-on-nails art: a tiny glyph on each nail
const GLYPHS = ['♈', '♓', '♒', '♌', '♎']
const chartArt = (x, fx, fy, i) => { x.fillStyle = INK; x.font = `700 22px 'Segoe UI Symbol', 'Noto Sans Symbols', serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(GLYPHS[i] + '︎', fx, fy) }

const RAINBOW = [RED, ORANGE, GOLD, GREEN, SKYB]
const CAMEOS = [
  { sign: 'aries', cap: 'Too impatient to dry. | Used a *leaf blower.*', mood: lt => lt > 1.0 ? 'squint' : 'sparkle', look: [1, 0], star: { x: -190 }, hops: [0.9],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      blower(x, t, F.x + 150, F.cy + 120, k * 0.9, { gust: lt > 0.8 ? 1 : 0 })
      hand(x, 820, 760, pop01(t, P.t0 + 0.15, 0.3, 2), [RED, RED, RED, RED, RED], { s: 0.7, rot: 0.2 })
      label(x, 780, 1110, 'DRY IN 0.4 SEC', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: RED, color: '#fff4e2', font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Came for nails. | *Moved into the chair.*', mood: 'sleepy', star: { x: -150, y: -10 },
    back(x, t, lt, P) { massageChair(x, 390, 900, pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 780, 760, 'DAY 3', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 56, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 780, 960, 'mail it here', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Ten nails. | *Ten different colours.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      hand(x, 700, 820, pop01(t, P.t0 + 0.2, 0.3, 2), RAINBOW, { s: 0.75, rot: -0.12 })
      hand(x, 860, 960, pop01(t, P.t0 + 0.6, 0.3, 2), [PINK, LAV, MINT, TEAL, PURPLE], { s: 0.75, rot: 0.14 })
      label(x, 780, 640, 'COULDN’T CHOOSE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Brought snacks | for *the whole salon.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      cookieTray(x, t, 780, 920, pop01(t, P.t0 + 0.25, 0.35, 2))
      bubble(x, 780, 1110, 'eat! you look tired', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 32, tail: 'bl' })
      hearts(x, t, 560, 760, P.t0 + 1.4, { n: 4, life: 1.6, spread: 200, cell: 6, seed: 2 })
    } },
  { sign: 'leo', cap: 'Made the whole salon | *rate their nails.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', star: { x: -180 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      hand(x, 520, 640, pop01(t, P.t0 + 0.2, 0.3, 2), [GOLD, GOLD, GOLD, GOLD, GOLD], { s: 0.55, rot: 0.1 })
      scoreCard(x, 690, 900, pop01(t, P.t0 + 0.7, 0.3, 2.2), 10, -0.12)
      scoreCard(x, 810, 880, pop01(t, P.t0 + 0.95, 0.3, 2.2), 10, 0.02)
      scoreCard(x, 930, 900, pop01(t, P.t0 + 1.2, 0.3, 2.2), 10, 0.14)
      sparkles(x, t, 810, 860, P.t0 + 1.4, 7, 170, 0.4)
    } },
  { sign: 'virgo', cap: 'Found a smudge. | On *someone else’s nails.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      hand(x, 820, 940, k, [MINT, MINT, MINT, MINT, MINT], { s: 0.7, rot: -0.2 })
      if (lt > 0.9) { x.fillStyle = MINT; x.fillRect(812, 830, 36, 10) }
      magnifier(x, 760, 780, pop01(t, P.t0 + 0.6, 0.3, 2), -0.6)
      label(x, 780, 600, '⚠ SMUDGE DETECTED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Couldn’t pick a colour. | Salon *closed.*', mood: lt => lt > 1.6 ? 'wide' : 'happy', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const COLS = [RED, PINK, ORANGE, GOLD, GREEN, TEAL, SKYB, LAV, PURPLE]
      COLS.forEach((c, i) => polish(x, 660 + (i % 3) * 120, 680 + Math.floor(i / 3) * 150, pop01(t, P.t0 + 0.15 + i * 0.06, 0.3, 2), c, { s: 0.7 }))
      label(x, 780, 1130, 'SORRY, WE’RE CLOSED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: RED, color: '#fff4e2', rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Black polish. | *Every single time.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      polish(x, 780, 860, pop01(t, P.t0 + 0.25, 0.3, 2), '#120a24', { s: 1.6 })
      label(x, 780, 900, 'NOIR', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 30, bg: BONE, rot: 0, font: MONO, weight: 700 })
      label(x, 780, 1110, '“FEELING BRIGHT”', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Nails still wet. | *Booked a flight.*', mood: 'sparkle', look: [-1, 0], star: { x: 170 }, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      ticket(x, 330, 740, pop01(t, P.t0 + 0.4, 0.3, 2))
      hand(x, 330, 990, pop01(t, P.t0 + 0.2, 0.3, 2), [ORANGE, ORANGE, ORANGE, ORANGE, ORANGE], { s: 0.6, rot: -0.15 })
      label(x, 330, 1130, 'STILL WET', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: ORANGE, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Mid-manicure. | Answered *forty emails.*', mood: 'neutral', look: [1, 1], star: { x: -180 },
    front(x, t, lt, P) {
      laptop(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), Math.min(4, Math.floor(prog(lt, 0.4, 1.6) * 4.99)))
      label(x, 790, 1100, 'INBOX: 0', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Got their birth chart | *painted on.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -180 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      hand(x, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2), [SKYB, SKYB, SKYB, SKYB, SKYB], { s: 0.8, rot: -0.06, art: lt > 0.8 ? chartArt : null })
      label(x, 790, 620, '✦ NAIL CHART', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 34, bg: LAV, font: MONO, weight: 700 })
      sparkles(x, t, 790, 820, P.t0 + 1.0, 7, 180, 0.8)
    } },
  { sign: 'pisces', cap: 'The hand massage | was *too kind.*', mood: lt => lt < 0.8 ? 'happy' : 'wide', tears: lt => lt < 0.8 ? 1 : 3, star: { x: -180 },
    front(x, t, lt, P) {
      tissues(x, t, 790, 1020, pop01(t, P.t0 + 0.3, 0.3, 2), lt > 0.8 ? 6 : 0)
      label(x, 790, 640, 'TISSUES: OUT', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
    } },
]

// the title is long-ish: shrink it to fit the safe box if a line would wrap
function fitTitleScenes(SCENES, maxW = 940) {
  const build0 = SCENES[0]
  return [async stage => {
    const r = await build0(stage)
    const tb = [...r.root.querySelectorAll('div')].find(d => d.style.top === '150px')
    if (tb) {
      let widest = 0, cur = 0
      for (const n of tb.childNodes) {
        if (n.nodeName === 'BR') { widest = Math.max(widest, cur); cur = 0; continue }
        cur += n.offsetWidth + 0.24 * (parseFloat(n.style?.fontSize) || 92)
      }
      widest = Math.max(widest, cur)
      if (widest > maxW) {
        const k = (maxW - 8) / widest
        tb.style.fontSize = (parseFloat(getComputedStyle(tb).fontSize) * k) + 'px'
        for (const n of tb.childNodes) if (n.style && n.style.fontSize) n.style.fontSize = (parseFloat(n.style.fontSize) * k) + 'px'
      }
    }
    return r
  }]
}

const F = makeFilm({
  id: 'r2t0036', key: 'C', accent: NAIL, ending: 'callback',
  title: 'The signs at | the nail *salon.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody | sat *still.*' },
  last: {
    text: 'The leaf blower? | Now *salon policy.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'aries', 320, 1080, 300 * k, { mood: lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], seed: 40, hops: [t - lt + 1.2] })
      blower(x, t, 560, 1160, pop01(t, t - lt + 0.7, 0.35, 2) * 1.2, { gust: lt > 1.0 ? 1 : 0 })
      label(x, 800, 920, 'NEW RULE', pop01(t, t - lt + 1.3, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 760, 1080, t - lt + 1.3, 7, 150, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
