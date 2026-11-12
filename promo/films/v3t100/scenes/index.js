// v3t100: THE SIGNS AS… v3, SOLO film, "Libras in love | be like." (~51 s vertical, signs3kit social cut, lofi · G)
// One sign the whole way: nine love situations, each the most extreme (and lovable) Libra version. Ending: 'callback'.
//   0.0–3.6    "Libras in love | *be like.*"
//   3.6–37.8   a mood board for the first date · matching outfits by date three · had a fight, mediated it
//              · a love letter in calligraphy · rearranged your flat (it's gorgeous now) · charmed the waiter by accident
//              · split dessert perfectly in half · read your chart, romantic placements only · every sunset is "our sunset"
//  37.8        "Charming. Romantic. | *Extra.*"
//  41.2        callback: "The waiter sent | *a thank-you card.*"  The card arrives, with a heart.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, SERIF,
} from '../../signs3kit.js'

const ROSE = '#ff8fb1'
const S = 'libra'

/** a cork mood board, pins appearing one by one */
function moodBoard(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -150, 340, 300)
  x.fillStyle = '#c98f4a'; x.fillRect(-160, -140, 320, 280)
  const C = [ROSE, GOLD, SKYB, MINT, LAV, '#ffb34a', '#fff4e2', ROSE, GOLD]
  const n = Math.min(9, Math.floor(Math.max(0, lt - 0.3) / 0.15) + 1)
  for (let i = 0; i < n; i++) {
    const px = -110 + (i % 3) * 110, py = -90 + Math.floor(i / 3) * 90
    x.save(); x.translate(px, py); x.rotate(((i * 37) % 7 - 3) * 0.04)
    x.fillStyle = INK; x.fillRect(-44, -34, 88, 68); x.fillStyle = C[i]; x.fillRect(-40, -30, 80, 60)
    x.fillStyle = '#e23d4e'; x.fillRect(-5, -38, 10, 10)
    x.restore()
  }
  x.restore()
}
/** a letter in looping script */
function letter(x, cx, cy, k, lt, { lines = ['My dearest,', 'you are', 'luminous.'], sign = '— L' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -170, 300, 340)
  x.fillStyle = '#fff4e2'; x.fillRect(-142, -162, 284, 324)
  x.fillStyle = '#6b2e5a'; x.textAlign = 'left'; x.textBaseline = 'middle'; x.font = `italic 500 40px ${SERIF}`
  const n = Math.min(lines.length, Math.floor(Math.max(0, lt - 0.3) / 0.35) + 1)
  for (let i = 0; i < n; i++) x.fillText(lines[i], -120, -100 + i * 60)
  if (lt > 1.4) { x.textAlign = 'right'; x.fillText(sign, 120, 110) }
  x.restore()
}
/** a cake split in exactly two */
function halves(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  const g = 30 * ease.outCubic(prog(lt, 0.6, 1.0))
  const CAKE = ['..WWWW..', '.PPPPPP.', 'PWPPWPPW', 'CCCCCCCC', 'WWWWWWWW', 'CCCCCCCC']
  const C = { W: '#fff4e2', P: ROSE, C: '#8a4a2e' }
  const L = CAKE.map(r => r.slice(0, 4)), R = CAKE.map(r => r.slice(4))
  drawBits(x, L, C, cx - 50 - g, cy, 24 * k)
  drawBits(x, R, C, cx + 50 + g, cy, 24 * k)
}
/** a sunset over a little horizon */
function sunset(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -120, 340, 240)
  const g = x.createLinearGradient(0, -110, 0, 110); g.addColorStop(0, '#ff8fb1'); g.addColorStop(0.6, '#ffb34a'); g.addColorStop(1, '#6b62a8')
  x.fillStyle = g; x.fillRect(-160, -110, 320, 220)
  x.fillStyle = '#ffe7a8'; x.beginPath(); x.arc(0, 30, 56, Math.PI, 0); x.fill()
  x.fillStyle = '#2a2350'; x.fillRect(-160, 30, 320, 80)
  x.restore()
}
/** the thank-you card for the callback */
function thanks(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-200, -120, 420, 270)
  x.fillStyle = INK; x.fillRect(-216, -136, 432, 272)
  x.fillStyle = '#fff4e2'; x.fillRect(-208, -128, 416, 256)
  x.fillStyle = '#6b2e5a'; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `italic 500 64px ${SERIF}`; x.fillText('Thank you!', 0, -30)
  x.font = `700 26px ${MONO}`; x.fillText('— your waiter', 0, 50)
  x.restore()
  drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86', W: '#fff' }, cx + 170, cy - 110, 10 * k)
}

const CAMEOS = [
  { sign: S, cap: 'First date? | Made *a mood board.*', mood: 'sparkle', star: { x: -170 },
    front(x, t, lt, P) { moodBoard(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), lt); label(x, 790, 1060, 'THEME: SOFT GLOW', pop01(t, P.t0 + 1.5, 0.3, 2), { size: 28, bg: ROSE, rot: -0.04 }) } },
  { sign: S, cap: 'Matching outfits | by *date three.*', mood: 'heart', star: { x: -160 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aquarius', 790, 900, 240 * k, { mood: lt > 1.2 ? 'happy' : 'wide', look: [-1, 0], seed: 14, glyph: false })
      x.save(); x.globalAlpha = k; x.fillStyle = ROSE; x.fillRect(250, 980, 260, 30); x.fillRect(680, 980, 220, 30); x.restore()
      label(x, 790, 660, 'SCARVES: MATCHING', pop01(t, P.t0 + 1.1, 0.3, 2), { size: 28, bg: ROSE, rot: 0.04 })
    } },
  { sign: S, cap: 'Had a fight. | Libra *mediated it.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      bubble(x, 780, 660, 'let’s hear | both sides', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 900, 'RULING: BOTH VALID', pop01(t, P.t0 + 1.2, 0.3, 2), { size: 28, bg: GOLD, rot: 0.05 })
    } },
  { sign: S, cap: 'A love letter. | In *calligraphy.*', mood: 'heart', star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) { letter(x, 790, 860, pop01(t, P.t0 + 0.25, 0.35, 2), lt); sparkles(x, t, 790, 860, P.t0 + 1.4, 6, 160, 0.4) } },
  { sign: S, cap: 'Rearranged your flat. | *It’s gorgeous now.*', mood: 'sparkle', star: { x: -160 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      const COLS = [ROSE, MINT, GOLD, SKYB]
      for (let i = 0; i < 4; i++) {
        const k = pop01(t, P.t0 + 0.3 + i * 0.2, 0.3, 2)
        const tx = 690 + (i % 2) * 180, ty = 760 + Math.floor(i / 2) * 180
        x.save(); x.translate(tx, ty); x.scale(k, k); x.fillStyle = INK; x.fillRect(-64, -54, 128, 108); x.fillStyle = COLS[i]; x.fillRect(-58, -48, 116, 96); x.restore()
      }
      label(x, 790, 1080, 'FENG SHUI: PERFECT', pop01(t, P.t0 + 1.4, 0.3, 2), { size: 28, bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'Charmed the waiter. | *By accident.*', mood: lt => lt > 1.0 ? 'wink' : 'happy', star: { x: -160 },
    front(x, t, lt, P) {
      bubble(x, 780, 660, 'love your | apron!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 880, 'FREE DESSERT', pop01(t, P.t0 + 1.1, 0.3, 2), { size: 34, bg: ROSE, rot: 0.05 })
      hearts(x, t, 790, 1040, P.t0 + 1.2, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Split dessert | *perfectly in half.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', star: { x: -160 },
    front(x, t, lt, P) {
      halves(x, 790, 880, pop01(t, P.t0 + 0.25, 0.35, 2), lt)
      label(x, 790, 680, '50 / 50', pop01(t, P.t0 + 1.1, 0.3, 2), { size: 44, bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'Read your chart. | *Romantic parts only.*', mood: 'heart', star: { x: -160 },
    front(x, t, lt, P) {
      bubble(x, 780, 660, 'Venus in… | oh, wow', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, col: ROSE, tail: 'bl' })
      label(x, 790, 900, 'SKIPPED: THE REST', pop01(t, P.t0 + 1.2, 0.3, 2), { size: 28, bg: LAV, rot: 0.05 })
    } },
  { sign: S, cap: 'Every sunset is | *“our sunset.”*', mood: 'heart', star: { x: -160 },
    front(x, t, lt, P) {
      sunset(x, 790, 820, pop01(t, P.t0 + 0.25, 0.35, 2))
      label(x, 790, 1020, 'OURS: #212', pop01(t, P.t0 + 1.2, 0.3, 2), { size: 32, bg: ROSE, rot: -0.04 })
    } },
]

const F = makeFilm({
  id: 'v3t100', key: 'G', accent: ROSE, solo: S, ending: 'callback',
  title: 'Libras in love | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Charming. Romantic. | *Extra.*', mood: 'heart' },
  last: {
    text: 'The waiter sent | *a thank-you card.*',
    draw(x, t, lt) { thanks(x, t, 540, 1080, 1.4 * pop01(t, t - lt + 0.6, 0.4, 2)); sparkles(x, t, 540, 1080, t - lt + 1.0, 8, 300, 0.3) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
