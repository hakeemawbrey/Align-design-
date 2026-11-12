// r2t0182: star_talk, BE LIKE, "Your turn to pick? | Zodiacs be like." (~54 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, each one's most extreme "your turn to pick" (dinner, a movie, the plan). Ending: group.
//   0.0–3.6    "Your turn to pick? | Zodiacs *be like.*"
//   3.6–49.2   ♈ picked before you finished asking · ♉ same restaurant, visit 412 · ♊ five places, went to none
//              · ♋ picked YOUR favourite · ♌ a place that knows their name · ♍ checked everyone's chart first
//              · ♎ still deciding, day 7 · ♏ a secret spot, "just trust me" · ♐ a restaurant in another country
//              · ♑ the cheapest, coupons stacked · ♒ a three-hour moss documentary · ♓ the sad movie, again
//  49.2        GROUP (the ending): "Next time? | *You pick.*"  a big YOUR TURN sticker slaps on the photo.
import { prog, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { phone, note, bits, calendar, ORANGE, RED, WOOD, PAPER, GREEN } from '../props.js'

const L = { x: -170 }
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, 7); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, i / 12 * Math.PI * 2, (i + 1) / 12 * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.6, 0, 7); x.fill()
  x.fillStyle = BONE; for (const a of [0.6, 1.9, 3.3, 4.8]) x.fillRect(Math.cos(a) * r * 0.4 - 8, Math.sin(a) * r * 0.4 - 8, 16, 16)
  x.restore()
}
// a TV with a picture drawn by draw(x) inside
function tv(x, cx, cy, k, draw) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-160, -110, 330, 240)
  x.fillStyle = INK; x.fillRect(-170, -120, 340, 240); x.fillStyle = '#4a3f7a'; x.fillRect(-162, -112, 324, 224)
  x.fillStyle = '#0e1a2a'; x.fillRect(-146, -96, 292, 192)
  x.save(); x.beginPath(); x.rect(-146, -96, 292, 192); x.clip(); draw(x); x.restore()
  x.fillStyle = INK; x.fillRect(-60, 120, 120, 22); x.fillRect(-12, 112, 24, 14)
  x.restore()
}
const MOSS = (x) => { x.fillStyle = '#6a7a8a'; x.fillRect(-146, 20, 292, 76); x.fillStyle = GREEN; for (let i = 0; i < 9; i++) x.fillRect(-140 + i * 32, 10 - (i % 3) * 8, 26, 22) }
const SAD = (x) => { x.fillStyle = '#3d5a8a'; x.fillRect(-146, -96, 292, 192); x.fillStyle = SKYB; for (let i = 0; i < 18; i++) x.fillRect(-140 + (i * 53) % 280, -90 + (i * 37) % 180, 4, 18); x.fillStyle = BONE; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.fillText('THE END', 0, 70) }
const TISSUE = ['.WWWW.', 'WWWWWW', 'BBBBBB', 'BLLLLB', 'BBBBBB']

const CAMEOS = [
  { sign: 'aries', cap: 'Picked before | *you finished asking.*', mood: lt => lt < 0.6 ? 'wide' : 'sparkle', look: [1, 0], star: L, hops: [0.35],
    front(x, t, lt, P) {
      bubble(x, 790, 650, 'where do you w—', pop01(t, P.t0 + 0.15, 0.25, 2.2), { size: 36, tail: 'br' })
      bubble(x, 760, 860, 'TACOS. GO.', pop01(t, P.t0 + 0.45, 0.25, 2.4), { size: 52, col: ORANGE, tail: 'bl' })
      label(x, 790, 1080, 'DECIDED IN: 0.2 SEC', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Same restaurant. | *Ninth year running.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), 'the usual | the usual | the usual', { head: 'ORDER', headBg: MINT, size: 40, w: 320 })
      label(x, 790, 1080, 'VISIT #412', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 42, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Picked five places. | *Went to none.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'wide', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const n = Math.min(5, 1 + Math.floor(Math.max(0, lt - 1.0) / 0.2))
      note(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 'sushi | pizza | ramen | curry | pho', { head: 'TONIGHT', headBg: GOLD, size: 38, w: 300, strike: lt > 1.0 ? [0, 1, 2, 3, 4].slice(0, n) : [] })
      label(x, 790, 600, 'ATE: CEREAL', pop01(t, P.t0 + 2.0, 0.3, 2.2), { size: 34, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Picked *your* favourite. | Every time.', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'you love | this one!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 46, tail: 'bl' })
      label(x, 790, 960, 'THEIR PICK: ???', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 440, 760, P.t0 + 0.8, { n: 5, life: 2.0, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Picked the place | that *knows their name.*', mood: 'sparkle', look: [1, 0], star: L, hops: [1.0],
    front(x, t, lt, P) {
      note(x, 790, 780, pop01(t, P.t0 + 0.2, 0.3, 2), 'RESERVED | ♌︎ LEO ♌︎', { head: 'TABLE 1', headBg: ORANGE, size: 44, w: 330 })
      bubble(x, 790, 1050, 'welcome back, | superstar!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Checked everyone’s chart. | *Then picked.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      chart(x, 790, 800, 150, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      label(x, 790, 1050, 'SOUP: ALIGNED ✓', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Still deciding. | *It’s been a week.*', mood: lt => lt > 1.4 ? 'sleepy' : 'squint', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: L,
    front(x, t, lt, P) {
      const d = Math.min(7, 1 + Math.floor(prog(lt, 0.3, 1.6) * 6))
      calendar(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), 'DECIDING', `DAY ${d}`, { topBg: PINK })
      bubble(x, 790, 1090, 'pasta? or…', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'A secret spot. | *“Just trust me.”*', mood: lt => lt > 1.1 ? 'wink' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      label(x, 790, 720, 'ADDRESS: ???', pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 44, bg: '#a0357a', color: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 900, 'BEST FOOD EVER', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bits(x, 'key', 790, 1060, 14 * pop01(t, P.t0 + 0.7, 0.3, 2), { rot: -0.2 })
    } },
  { sign: 'sagittarius', cap: 'Picked a restaurant | *in another country.*', mood: 'sparkle', look: [1, 0], star: L, hops: [0.6, 1.3],
    front(x, t, lt, P) {
      bits(x, 'suitcase', 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 * Math.sin(t * 4) })
      label(x, 790, 650, 'FLIGHT: 9 HRS', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 38, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1110, 'worth it!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Picked the cheapest. | *Brought coupons.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) note(x, 760 + i * 22, 760 + i * 70, pop01(t, P.t0 + 0.2 + i * 0.2, 0.25, 2), '2 FOR 1', { head: 'COUPON', headBg: GOLD, size: 34, w: 240, rot: (i - 1.5) * 0.08 })
      label(x, 790, 1130, 'DESSERT: FREE', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'A three-hour film | *about moss.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      tv(x, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2), MOSS)
      label(x, 790, 620, 'PART 1 OF 4', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1080, 'riveting.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Picked the sad movie. | *Again.*', mood: lt => lt < 0.8 ? 'happy' : 'wide', tears: lt => lt < 0.8 ? 1 : 3, look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      tv(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), SAD)
      const n = Math.min(4, Math.floor(Math.max(0, lt - 0.8) / 0.3))
      for (let i = 0; i < n; i++) drawTissue(x, 690 + i * 70, 1090 - (i % 2) * 20, pop01(t, P.t0 + 1.0 + i * 0.35, 0.2, 2))
      label(x, 790, 570, 'WATCHED: 14 TIMES', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
]
function drawTissue(x, cx, cy, k) { if (k > 0.01) drawBits(x, TISSUE, { W: BONE, B: SKYB, L: '#c9ecff' }, cx, cy, 12 * k) }

const F = makeFilm({
  id: 'r2t0182', key: 'E', accent: ORANGE, ending: 'group',
  title: 'Your turn to pick? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Next time? | *You pick.*',
    draw(x, t, lt) { label(x, 540, 700, 'YOUR TURN →', pop01(t, t - lt + 1.5, 0.35, 2.4), { size: 64, bg: GOLD, rot: -0.06, font: MONO, weight: 700 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
