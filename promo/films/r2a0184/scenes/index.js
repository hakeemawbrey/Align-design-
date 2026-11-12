// r2a0184: star_advice, ADVICE ROLL CALL, "How each sign | can unplug." (topic: how each sign can unplug from their phone)
// (~57 s vertical, signs3kit social cut, music: lofi · E). Twelve signs in zodiac order, one warm, specific line each with a
// light visual gag. Ending: callback.
//   0.0–3.6    "How each sign | *can unplug.*"
//   3.6–49.2   ♈ race a friend to the park · ♉ cook something slow · ♊ a book you can't put down · ♋ bake for someone
//              · ♌ dance in the kitchen, no one filming · ♍ repot a plant · ♎ paint something just for you
//              · ♏ journal it out · ♐ walk somewhere new, leave the map · ♑ a puzzle, edges first
//              · ♒ stargaze: the original feed · ♓ sit by the water, happy tears
//  49.2        "Phone down. | *Life up.*"  The twelve fly up into a group photo.
//  52.6        CALLBACK: "Aquarius saved | *you a seat.*"  the blanket under the stars, a spot left free.
import { prog, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { phone, note, bits, frame, ORANGE, RED, WOOD, PAPER, SLATE, GREEN } from '../props.js'
import { drawPixelStar } from '../../sky.js'

const L = { x: -170 }
const steam = (x, t, cx, cy) => { x.save(); x.fillStyle = 'rgba(239,230,214,0.6)'; for (let i = 0; i < 3; i++) { const ph = (t * 0.8 + i / 3) % 1; x.globalAlpha = Math.sin(Math.PI * ph) * 0.8; x.fillRect(cx - 50 + i * 50 + Math.sin(ph * 8 + i) * 10, cy - ph * 120, 12, 34) } x.restore() }
function pot(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-140, -70, 280, 150); x.fillRect(-170, -50, 340, 26); x.fillStyle = '#9aa5c4'; x.fillRect(-132, -62, 264, 134)
  x.fillStyle = '#c4cbe0'; x.fillRect(-132, -62, 264, 20); x.fillStyle = INK; x.fillRect(-150, -90, 300, 26); x.fillStyle = '#7a86b8'; x.fillRect(-144, -86, 288, 18)
  x.restore()
}
function puzzle(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const C = [SKYB, MINT, GOLD, PINK]
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
    const edge = r !== 1 || c !== 1, on = edge ? lt > 0.3 + (r * 3 + c) * 0.1 : lt > 1.6
    if (!on) continue
    x.fillStyle = INK; x.fillRect(-150 + c * 100, -150 + r * 100, 100, 100); x.fillStyle = C[(r + c) % 4]; x.fillRect(-144 + c * 100, -144 + r * 100, 88, 88)
    x.fillStyle = C[(r + c) % 4]; if (c < 2) x.fillRect(-60 + c * 100, -116 + r * 100, 24, 28)
  }
  x.restore()
}
function waves(x, t) { x.fillStyle = INK; x.fillRect(110, 1060, 860, 170); x.fillStyle = '#3d8fd8'; x.fillRect(118, 1068, 844, 154); x.fillStyle = 'rgba(255,255,255,0.5)'; for (let i = 0; i < 7; i++) x.fillRect(140 + ((i * 130 + t * 30) % 800), 1090 + (i % 3) * 40, 60, 6) }
function skyStars(x, t, cx, cy, w, h, n = 10, seed = 1) { for (let i = 0; i < n; i++) { const a = Math.sin(i * 12.9898 + seed) * 43758.5453, px = cx - w / 2 + ((a - Math.floor(a)) * w), b = Math.sin(i * 78.233 + seed) * 12345.678, py = cy - h / 2 + (b - Math.floor(b)) * h; drawPixelStar(x, px, py, 36 + 10 * Math.sin(t * 3 + i), i % 2 ? 1 : 2, i % 3 ? BONE : GOLD) } }

const CAMEOS = [
  { sign: 'aries', cap: 'Race a friend | *to the park.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: L, hops: [0.5, 0.9, 1.3],
    front(x, t, lt, P) {
      bits(x, 'flower', 720, 1080, 11 * pop01(t, P.t0 + 0.2, 0.3, 2)); bits(x, 'flower', 880, 1090, 10 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 790, 700, 'PHONE: LEFT AT HOME', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 880, 'WINNER: BOTH', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Cook something slow. | *Taste everything.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2); pot(x, 790, 960, k); if (k > 0.5) steam(x, t, 790, 840)
      label(x, 790, 660, 'SIMMER: 3 HRS', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'A book you | *can’t put down.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [1, 1], star: L,
    front(x, t, lt, P) {
      bits(x, 'book', 790, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.06 })
      const c = Math.min(9, 1 + Math.floor(prog(lt, 0.4, 1.8) * 8.99))
      label(x, 790, 1090, `CHAPTER ${c}!`, pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 40, bg: '#ffd23a', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Bake for | *someone you love.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) bits(x, 'cookie', 700 + (i % 3) * 90 + (i > 2 ? 45 : 0), 960 - (i > 2 ? 90 : 0), 13 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.25, 2))
      hearts(x, t, 790, 820, P.t0 + 1.0, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 4 })
      label(x, 790, 1120, 'STILL WARM', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Dance in the kitchen. | *Nobody filming.*', mood: 'sparkle', look: [1, 0], star: L, hops: [0.4, 0.8, 1.2], squash: lt => 0.06 * Math.sin(lt * 9),
    front(x, t, lt, P) {
      notes(x, t, 760, 960, { n: 5, cell: 9, col: GOLD, seed: 2 })
      label(x, 790, 700, 'AUDIENCE: NONE', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 36, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1100, 'STILL ICONIC', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Repot a plant. | *Hands in the dirt.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bits(x, 'plant', 790, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { sy: 0.9 + 0.1 * clamp(lt / 1.6) })
      label(x, 790, 1120, 'ROOTS: HAPPY', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Paint something | *just for you.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      frame(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), 260, 200, x => {
        const p = clamp((lt - 0.4) / 1.2)
        x.fillStyle = '#ffb3c8'; x.fillRect(-130, -100, 260, 200)
        x.fillStyle = GOLD; x.beginPath(); x.arc(60, -30, 40 * p, 0, 7); x.fill()
        x.fillStyle = '#7dd0a0'; x.fillRect(-130, 40, 260 * p, 60)
      }, { col: PINK })
      label(x, 790, 1100, 'NOT FOR POSTING', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Journal it out. | *Honest pages.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 1], star: L,
    front(x, t, lt, P) {
      note(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), 'today I felt… | a lot. | and that’s ok.', { head: 'DEAR DIARY', headBg: '#c97bff', size: 36, w: 340, font: "Georgia, serif", weight: 700 })
      label(x, 790, 1110, 'LOCK: OPTIONAL', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Walk somewhere new. | *Leave the map.*', mood: 'sparkle', look: [1, 0], star: L, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      bits(x, 'sun', 820, 700, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: t * 0.3 })
      label(x, 790, 920, 'LOST: A LITTLE', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 36, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1070, 'FOUND: A BAKERY', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Start a puzzle. | *Edges first.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 1], star: L,
    front(x, t, lt, P) {
      puzzle(x, t, 790, 860, pop01(t, P.t0 + 0.1, 0.3, 2), lt)
      label(x, 790, 1110, 'PIECE 9 OF 1000', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Stargaze. | *The original feed.*', mood: 'sparkle', look: [1, -1], star: { x: -170, y: 60 },
    back(x, t, lt, P) { x.save(); x.globalAlpha = clamp(lt / 0.6); skyStars(x, t, 700, 720, 460, 260, 9, 3); x.restore() },
    front(x, t, lt, P) {
      bits(x, 'moon', 860, 650, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 900, 'SCROLLING: THE SKY', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1060, 'SPOTTED: MY SIGN', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Sit by the water. | *Let it be quiet.*', mood: 'heart', tears: lt => lt < 1.0 ? 1 : 2, look: [1, 0], star: { x: -170, y: -40 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { waves(x, t) },
    front(x, t, lt, P) {
      bits(x, 'shell', 800, 980, 14 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 790, 720, 'PEACE: FOUND', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0184', key: 'E', accent: SKYB, ending: 'callback',
  title: 'How each sign | *can unplug.*',
  cameos: CAMEOS,
  group: { cap: 'Phone down. | *Life up.*' },
  last: {
    text: 'Aquarius saved | *you a seat.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.3, 0.4, 1.8)
      x.save(); x.globalAlpha = clamp(lt / 0.8); skyStars(x, t, 540, 820, 860, 300, 14, 7); x.restore()
      bits(x, 'moon', 860, 760, 22 * k)
      if (k > 0.01) { x.save(); x.translate(540, 1330); x.scale(k, k); x.fillStyle = INK; x.fillRect(-360, -50, 720, 110); x.fillStyle = PINK; x.fillRect(-352, -42, 704, 94); x.fillStyle = BONE; for (let i = 0; i < 8; i++) x.fillRect(-352 + i * 88, -42, 44, 94); x.restore() }
      const s = pop01(t, t0 + 0.6, 0.45, 1.8)
      if (s > 0.01) signChar(x, t, 'aquarius', 340, 1140, 330 * s, { mood: 'sparkle', look: [1, -1], seed: 44, hops: [t0 + 1.6] })
      label(x, 730, 1200, 'SAVED FOR YOU ✦', pop01(t, t0 + 1.3, 0.3, 2.2), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
