// r2a0055: star_advice, ADVICE ROLLCALL, "Each sign’s | signature dish." (~53 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, each with its signature dish: one warm, specific line and one light food gag per sign.
//   0.0–3.6    "Each sign’s | *signature dish.*"  the twelve line up.
//   3.6–49.2   twelve cards (3.8 s each):
//              Aries spicy noodles (bold, fast, unforgettable) · Taurus slow-cooked stew (love takes time) · Gemini tapas
//              (a little of everything) · Cancer grandma’s soup (tastes like a hug) · Leo golden paella (served with
//              applause) · Virgo sushi (every piece identical) · Libra a grazing board (pretty and balanced) · Scorpio
//              secret-recipe chili (never telling) · Sagittarius street tacos (recipe from a trip) · Capricorn a classic
//              roast (never fails) · Aquarius pineapple pizza (ahead of its time) · Pisces dumplings (folded with feelings)
//  49.2        group: "Twelve signs. | *One potluck.*"
//  52.6        callback: "Secret ingredient? | *Scorpio: “no.”*"  Scorpio’s locked jar comes back.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SAFFRON = '#ffb02e', CREAM = '#fff4e2', RED = '#e23d4e', GREEN = '#5fd068', BROWN = '#8a4a2e'

function bowl(x, cx, cy, k, { col = CREAM, soup = '#e0a45a', w = 240 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, -10, w / 2 + 8, 34, 0, 0, Math.PI * 2); x.fill()
  x.beginPath(); x.moveTo(-w / 2 - 8, -10); x.quadraticCurveTo(0, 170, w / 2 + 8, -10); x.fill()
  x.fillStyle = col; x.beginPath(); x.moveTo(-w / 2, -10); x.quadraticCurveTo(0, 156, w / 2, -10); x.fill()
  x.fillStyle = soup; x.beginPath(); x.ellipse(0, -10, w / 2, 26, 0, 0, Math.PI * 2); x.fill()
  x.restore()
}
function steam(x, t, cx, cy, k, { n = 3, col = 'rgba(239,230,214,0.6)', heart = false } = {}) {
  if (k <= 0.01) return
  for (let i = 0; i < n; i++) {
    const ph = (t * 0.6 + i / n) % 1, px = cx + (i - (n - 1) / 2) * 60 + Math.sin(ph * 6 + i) * 14, py = cy - ph * 170
    if (heart) drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: PINK }, px, py, 6 * k, { alpha: Math.sin(Math.PI * ph) })
    else { x.save(); x.globalAlpha = k * Math.sin(Math.PI * ph); x.fillStyle = col; x.fillRect(px - 6, py - 22, 12, 44); x.restore() }
  }
}
function plate(x, cx, cy, k, w = 300) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, w / 2 + 8, w * 0.22 + 8, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#ffffff'; x.beginPath(); x.ellipse(0, 0, w / 2, w * 0.22, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#e6e2f2'; x.beginPath(); x.ellipse(0, 0, w / 2 - 34, w * 0.22 - 16, 0, 0, Math.PI * 2); x.fill()
  x.restore()
}
// Scorpio’s jar, padlocked (card 8 and the callback)
function jar(x, t, cx, cy, k, s = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k * s, k * s)
  x.fillStyle = INK; x.fillRect(-96, -130, 192, 250); x.fillStyle = 'rgba(200,220,255,0.85)'; x.fillRect(-88, -100, 176, 212)
  x.fillStyle = '#c0303a'; x.fillRect(-80, -30, 160, 134)
  x.fillStyle = INK; x.fillRect(-104, -150, 208, 40); x.fillStyle = '#9a9ab0'; x.fillRect(-98, -146, 196, 32)
  x.fillStyle = CREAM; x.fillRect(-64, 0, 128, 60); x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('???', 0, 32)
  // padlock
  x.strokeStyle = INK; x.lineWidth = 12; x.beginPath(); x.arc(0, -150, 30, Math.PI, 0); x.stroke()
  x.strokeStyle = GOLD; x.lineWidth = 6; x.beginPath(); x.arc(0, -150, 30, Math.PI, 0); x.stroke()
  x.fillStyle = INK; x.fillRect(-42, -156, 84, 64); x.fillStyle = GOLD; x.fillRect(-36, -150, 72, 52); x.fillStyle = INK; x.fillRect(-5, -134, 10, 20)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Spicy noodles. | *Bold, fast, unforgettable.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', look: [1, 0], star: { x: -200 }, hops: [0.4, 0.8],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bowl(x, 790, 900, k, { soup: '#ff6f4a' })
      if (k > 0.5) { x.strokeStyle = GOLD; x.lineWidth = 6; for (let i = 0; i < 4; i++) { x.beginPath(); x.moveTo(720 + i * 40, 890); x.quadraticCurveTo(740 + i * 40, 840, 730 + i * 40, 800); x.stroke() } }
      steam(x, t, 790, 820, k, { col: 'rgba(255,111,74,0.7)' })
      label(x, 790, 1100, 'HEAT: YES', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Slow-cooked stew. | *Love takes time.*', mood: lt => lt > 1.3 ? 'heart' : 'sleepy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(790, 920); x.scale(k, k); x.fillStyle = INK; x.fillRect(-150, -90, 300, 190); x.fillStyle = '#3a3a50'; x.fillRect(-142, -82, 284, 174); x.fillStyle = INK; x.fillRect(-180, -60, 40, 20); x.fillRect(140, -60, 40, 20); x.fillStyle = '#a0603a'; x.fillRect(-142, -82, 284, 22); x.restore() }
      steam(x, t, 790, 800, k)
      label(x, 790, 650, '4 HOURS. WORTH IT.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Tapas. | *A little of everything.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -200 }, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      const FOODS = [['#e0a45a', '#ff6f6f'], [GREEN, '#ffffff'], [GOLD, BROWN], ['#ff6f6f', GREEN]]
      FOODS.forEach(([a, b], i) => {
        const k = pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2), px = 690 + (i % 2) * 200, py = 800 + Math.floor(i / 2) * 170
        plate(x, px, py, k, 170)
        if (k > 0.3) { x.fillStyle = INK; x.fillRect(px - 34, py - 26, 68, 40); x.fillStyle = a; x.fillRect(px - 30, py - 22, 60, 32); x.fillStyle = b; x.fillRect(px - 12, py - 30, 24, 14) }
      })
      label(x, 790, 1110, 'PAIRS WITH: ALL ✦', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Grandma’s soup. | *Tastes like a hug.*', mood: 'heart', look: [1, 0], star: { x: -200 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bowl(x, 790, 900, k, { col: '#c8e8ff', soup: '#ffd27a' })
      steam(x, t, 790, 820, k, { heart: true })
      label(x, 790, 1100, 'RECIPE: SECRET-ISH', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Golden paella. | *Served with applause.*', mood: 'sparkle', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(750, 900); x.scale(k, k); x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 170, 70, 0, 0, Math.PI * 2); x.fill(); x.fillRect(160, -12, 50, 24); x.fillStyle = SAFFRON; x.beginPath(); x.ellipse(0, -4, 156, 58, 0, 0, Math.PI * 2); x.fill()
        for (let i = 0; i < 9; i++) { x.fillStyle = [RED, GREEN, '#ff9a7a'][i % 3]; x.fillRect(-110 + (i * 37) % 220, -30 + (i * 23) % 50, 22, 14) } x.restore() }
      sparkles(x, t, 750, 880, P.t0 + 1.2, 8, 200, 0.3)
      label(x, 790, 650, 'APPLAUSE ✦', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Sushi. | *Every piece identical.*', mood: 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(790, 900); x.scale(k, k); x.fillStyle = INK; x.fillRect(-180, 30, 360, 30); x.fillStyle = '#c98f2a'; x.fillRect(-176, 34, 352, 22)
        for (let i = 0; i < 5; i++) { const n = clamp((lt - 0.4 - i * 0.15) * 4); if (n <= 0) continue; const px = -140 + i * 70; x.fillStyle = INK; x.fillRect(px - 30, -30, 60, 62); x.fillStyle = '#ffffff'; x.fillRect(px - 26, -26, 52, 54); x.fillStyle = '#ff8a6a'; x.fillRect(px - 26, -26, 52, 22); x.fillStyle = '#2a2350'; x.fillRect(px - 26, -2, 52, 8) }
        x.restore() }
      label(x, 790, 1080, 'MEASURED ✓', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'A grazing board. | *Pretty and balanced.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -200 }, hops: [1.25],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(790, 890); x.rotate(0.04); x.scale(k, k); x.fillStyle = INK; x.fillRect(-170, -110, 340, 220); x.fillStyle = '#c98f2a'; x.fillRect(-162, -102, 324, 204)
        const IT = [[GOLD, -110, -60], [PINK, -30, -60], ['#9a4ae0', 50, -60], [CREAM, 120, -60], [GREEN, -110, 30], ['#ff6f6f', -30, 30], [GOLD, 50, 30], [PINK, 120, 30]]
        IT.forEach(([c, a, b], i) => { if (lt < 0.3 + i * 0.1) return; x.fillStyle = INK; x.fillRect(a - 26, b - 26, 52, 52); x.fillStyle = c; x.fillRect(a - 22, b - 22, 44, 44) })
        x.restore() }
      label(x, 790, 650, 'PAIRS WITH: EVERYONE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 26, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Secret-recipe chili. | *Never telling.*', mood: 'squint', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      jar(x, t, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 640, 'nice try.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Street tacos. | *Recipe from a trip.*', mood: 'sparkle', look: [1, 0], star: { x: -200 }, hops: [0.6, 1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) for (let i = 0; i < 3; i++) { x.save(); x.translate(630 + i * 115, 930); x.scale(1.35 * k, 1.35 * k); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 66, Math.PI, 0); x.fill(); x.fillStyle = '#f0c870'; x.beginPath(); x.arc(0, 0, 58, Math.PI, 0); x.fill(); x.fillStyle = GREEN; x.fillRect(-40, -46, 80, 14); x.fillStyle = RED; x.fillRect(-26, -54, 18, 10); x.fillRect(10, -54, 18, 10); x.restore() }
      if (lt > 1.2) { const s = pop01(t, t - lt + 1.2, 0.25, 2.6); x.save(); x.translate(800, 690); x.rotate(-0.2); x.scale(s, s); x.strokeStyle = '#b98cff'; x.lineWidth = 6; x.beginPath(); x.arc(0, 0, 70, 0, Math.PI * 2); x.stroke(); x.fillStyle = '#b98cff'; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('LEARNED', 0, -10); x.fillText('ABROAD', 0, 18); x.restore() }
    } },
  { sign: 'capricorn', cap: 'A classic roast. | *Never fails.*', mood: 'happy', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      plate(x, 790, 940, k, 320)
      if (k > 0.01) { x.save(); x.translate(790, 900); x.scale(k, k); x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 110, 66, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#b0602a'; x.beginPath(); x.ellipse(0, 0, 100, 56, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#d0803a'; x.fillRect(-70, -30, 60, 14); x.fillRect(10, -20, 60, 14); x.fillStyle = GREEN; x.fillRect(-20, -62, 40, 14); x.restore() }
      label(x, 790, 650, 'SINCE FOREVER', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Pineapple pizza. | *Ahead of its time.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.25],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(790, 890); x.rotate(lt * 0.3); x.scale(k, k); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 160, 0, Math.PI * 2); x.fill(); x.fillStyle = '#e0a45a'; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.fill(); x.fillStyle = '#ff6f4a'; x.beginPath(); x.arc(0, 0, 124, 0, Math.PI * 2); x.fill(); x.fillStyle = '#ffe07a'; x.beginPath(); x.arc(0, 0, 112, 0, Math.PI * 2); x.fill()
        for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; x.fillStyle = INK; x.fillRect(Math.cos(a) * 70 - 16, Math.sin(a) * 70 - 16, 32, 32); x.fillStyle = GOLD; x.fillRect(Math.cos(a) * 70 - 12, Math.sin(a) * 70 - 12, 24, 24) } x.restore() }
      label(x, 790, 1100, 'CONTROVERSIAL ✦', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Homemade dumplings. | *Folded with feelings.*', mood: 'heart', tears: lt => lt > 1.0 ? 3 : 2, look: [1, 0], star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      plate(x, 790, 940, k, 320)
      for (let i = 0; i < 5; i++) {
        const d = pop01(t, P.t0 + 0.4 + i * 0.15, 0.3, 2.2); if (d <= 0.01) continue
        const px = 700 + (i % 3) * 90 + (i > 2 ? 45 : 0), py = 920 - (i > 2 ? 40 : 0)
        x.save(); x.translate(px, py); x.scale(d, d); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 44, Math.PI, 0); x.fill(); x.fillStyle = '#fff8ea'; x.beginPath(); x.arc(0, 0, 38, Math.PI, 0); x.fill(); x.fillStyle = '#e6dcc8'; for (let j = 0; j < 4; j++) x.fillRect(-22 + j * 14, -32, 6, 10); x.restore()
      }
      label(x, 790, 650, 'EACH ONE: LOVED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0055', key: 'G', accent: SAFFRON, ending: 'callback',
  title: 'Each sign’s | *signature dish.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *One potluck.*', moods: ['sparkle', 'heart', 'wink', 'heart', 'sparkle', 'happy', 'heart', 'squint', 'sparkle', 'happy', 'sparkle', 'heart'] },
  last: {
    text: 'Secret ingredient? | *Scorpio: “no.”*',
    draw(x, t, lt) {
      const t0 = t - lt
      jar(x, t, 540, 1080, pop01(t, t0 + 0.5, 0.4, 2), 1.3)
      const sk = pop01(t, t0 + 1.0, 0.4, 2)
      if (sk > 0.01) signChar(x, t, 'scorpio', 820, 1180, 200 * sk, { mood: 'squint', look: [-1, 0], seed: 77, glyph: false, hops: [t0 + 1.6] })
      label(x, 540, 1330, 'STILL LOCKED', pop01(t, t0 + 1.7, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
