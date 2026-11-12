// r2a0185: star_advice, ADVICE ROLL CALL, "Each sign's | perfect walk." (~57 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, one warm, specific walk each with a light visual gag. Ending: callback.
//   0.0–3.6    "Each sign’s | *perfect walk.*"
//   3.6–49.2   ♈ race the sunrise · ♉ a slow stroll to the croissant · ♊ a new route, a good podcast
//              · ♋ past the house they grew up in · ♌ through the park in a great outfit · ♍ ten thousand steps, counted
//              · ♎ a walk with their match · ♏ a night walk, moon and thoughts · ♐ a walk that becomes a hike
//              · ♑ a walk that solves the to-do list · ♒ wherever the weird alley goes · ♓ a rainy walk, puddles included
//  49.2        "Every walk counts. | *Step outside.*"  The twelve fly up into a group photo.
//  52.6        CALLBACK: "Taurus got croissants. | *Saved you one.*"  the croissant comes back.
import { prog, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { phone, note, bits, ORANGE, RED, WOOD, PAPER, SLATE, GREEN } from '../props.js'

const L = { x: -170 }
const CROISSANT = ['....CCC....', '..CCcCCC...', '.CCCCcCCCC.', 'CCcCCCCcCCC', 'CCCCcCCCCcC', '.CC.....CC.']
const CROI_C = { C: '#e0a24a', c: '#a8692a' }
function croissant(x, cx, cy, cell, o) { if (cell > 0.2) drawBits(x, CROISSANT, CROI_C, cx, cy, cell, o) }
function mountain(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-200, 140); x.lineTo(0, -160); x.lineTo(200, 140); x.closePath(); x.fill()
  x.fillStyle = '#7a86b8'; x.beginPath(); x.moveTo(-186, 132); x.lineTo(0, -146); x.lineTo(186, 132); x.closePath(); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.moveTo(-50, -70); x.lineTo(0, -146); x.lineTo(50, -70); x.lineTo(20, -84); x.lineTo(0, -64); x.lineTo(-20, -84); x.closePath(); x.fill()
  x.restore()
}
function signpost(x, cx, cy, k, text) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-12, -40, 24, 240); x.fillStyle = WOOD; x.fillRect(-6, -34, 12, 228)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-150, -130); x.lineTo(110, -130); x.lineTo(160, -80); x.lineTo(110, -30); x.lineTo(-150, -30); x.closePath(); x.fill()
  x.fillStyle = SKYB; x.beginPath(); x.moveTo(-142, -122); x.lineTo(106, -122); x.lineTo(148, -80); x.lineTo(106, -38); x.lineTo(-142, -38); x.closePath(); x.fill()
  x.fillStyle = INK; x.font = `800 48px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, -10, -78)
  x.restore()
}
function rain(x, t) { x.save(); x.fillStyle = SKYB; for (let i = 0; i < 22; i++) { const ph = (t * 1.2 + i / 22) % 1; x.globalAlpha = 0.7; x.fillRect(150 + (i * 137) % 780, 520 + ph * 680, 5, 26) } x.restore() }

const CAMEOS = [
  { sign: 'aries', cap: 'A brisk loop. | *Race the sunrise.*', mood: 'sparkle', look: [1, 0], star: L, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      bits(x, 'sun', 820, 1040 - 300 * ease.outCubic(prog(lt, 0.2, 2.0)), 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1120, 'ARIES: WINNING', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'A slow stroll | *to the bakery.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      croissant(x, 790, 870, 26 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.05 * Math.sin(t * 2) })
      label(x, 790, 660, 'DESTINATION: CROISSANT', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1080, 'PACE: LEISURELY', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'A new route. | *A good podcast.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      notes(x, t, 790, 980, { n: 4, cell: 9, col: '#ffd23a', seed: 1 })
      label(x, 790, 680, '▶ EPISODE 3', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 40, bg: '#ffd23a', rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1110, 'ROUTE: NEVER SAME', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Past the house | *they grew up in.*', mood: 'heart', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bits(x, 'house', 790, 870, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      hearts(x, t, 560, 1000, P.t0 + 1.0, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 4 })
      label(x, 790, 1110, 'MEMORIES: ALL OF THEM', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Through the park | *in a great outfit.*', mood: 'sparkle', look: [1, 0], star: L, hops: [0.9],
    front(x, t, lt, P) {
      sparkles(x, t, 370, 860, P.t0 + 0.4, 9, 200, 0.2)
      label(x, 790, 760, 'OUTFIT: 10/10', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 42, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 950, 'PIGEONS: IMPRESSED', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Ten thousand steps. | *Exactly.*', mood: lt => lt > 1.6 ? 'sparkle' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const n = Math.round(10000 * ease.outCubic(prog(lt, 0.2, 1.6)))
      label(x, 790, 800, `STEPS: ${n.toLocaleString('en-US')}`, pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 46, bg: n >= 10000 ? MINT : BONE, rot: 0.03, font: MONO, weight: 700 })
      if (lt > 1.6) sparkles(x, t, 790, 800, P.t0 + 1.6 * 1.29, 8, 210, 0.4, [MINT, GOLD, BONE])
      bubble(x, 790, 1040, 'not one more.', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'A walk with | *their new match.*', mood: 'heart', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'sagittarius', 700, 900, 220 * k, { mood: 'happy', seed: 71, glyph: false })
      label(x, 790, 640, '✦ MATCH: SAGITTARIUS', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 1060, P.t0 + 1.2, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 3 })
      label(x, 790, 1120, 'SECOND DATE: YES', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'A night walk. | *Moon and thoughts.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, -1], star: L,
    front(x, t, lt, P) {
      bits(x, 'moon', 820, 720, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 1000, 'deep thought #47', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'A quick walk. | *Became a hike.*', mood: 'sparkle', look: [1, 0], star: L, hops: [0.8, 1.4],
    front(x, t, lt, P) {
      mountain(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2))
      const km = Math.round(1 + 13 * ease.outCubic(prog(lt, 0.4, 1.8)))
      label(x, 790, 1110, `KM ${km}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 42, bg: '#ff9a4a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'A walk that | *solves the to-do list.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const n = Math.min(3, Math.floor(prog(lt, 0.4, 1.6) * 3.99))
      note(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), ['budget', 'big plan', 'mom’s gift'].map((s, i) => i < n ? s + ' ✓' : s).join(' | '), { head: 'SOLVED ON FOOT', headBg: MINT, size: 38, w: 340 })
    } },
  { sign: 'aquarius', cap: 'Wherever the | *weird alley goes.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: L,
    front(x, t, lt, P) {
      signpost(x, 790, 940, pop01(t, P.t0 + 0.2, 0.3, 2), '???')
      label(x, 790, 640, 'CURIOSITY: ON', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'A rainy walk. | *Puddles included.*', mood: 'heart', tears: lt => lt < 0.9 ? 1 : 2, look: [1, -1], star: { x: -170, y: 20 }, hops: [1.2, 1.7],
    back(x, t, lt, P) { rain(x, t) },
    front(x, t, lt, P, F) {
      bits(x, 'umbrella', F.x, F.cy - 190, 18 * pop01(t, P.t0 + 0.3, 0.3, 2))
      x.fillStyle = INK; x.beginPath(); x.ellipse(780, 1150, 170, 38, 0, 0, 7); x.fill(); x.fillStyle = '#5ab0e8'; x.beginPath(); x.ellipse(780, 1150, 160, 30, 0, 0, 7); x.fill()
      label(x, 790, 760, 'SPLASH: JOYFUL', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0185', key: 'G', accent: MINT, ending: 'callback',
  title: 'Each sign’s | *perfect walk.*',
  cameos: CAMEOS,
  group: { cap: 'Every walk counts. | *Step outside.*' },
  last: {
    text: 'Taurus got croissants. | *Saved you one.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const s = pop01(t, t0 + 0.4, 0.45, 1.8)
      if (s > 0.01) signChar(x, t, 'taurus', 360, 1100, 330 * s, { mood: lt > 1.5 ? 'heart' : 'happy', seed: 44, hops: [t0 + 1.5] })
      croissant(x, 740, 1060, 28 * pop01(t, t0 + 0.8, 0.35, 2), { rot: -0.08 })
      label(x, 760, 1280, 'THIS ONE’S YOURS', pop01(t, t0 + 1.3, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 720, 960, t0 + 1.6, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 2 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
