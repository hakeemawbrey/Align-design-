// r2t0169: THE SIGNS AS… v3, ROLLCALL, "The signs watching | a meteor shower." (~57 s vertical, signs3kit social cut,
// music: lofi · D)
//   0.0–3.6    "The signs watching | *a meteor shower.*"
//   3.6–49.2   ♈ a wish on every single one · ♉ brought a picnic, never looked up · ♊ live commentary for every meteor
//              · ♋ blankets for the whole hill · ♌ turned for a profile pic, missed all of them · ♍ logged every meteor,
//              alphabetically · ♎ saw one, still choosing the wish (a match? a puppy?) · ♏ pointed at the sky, a meteor
//              appeared · ♐ chased one · ♑ penciled it in, 11:02–11:04 · ♒ waved at a meteor, it waved back
//              · ♓ it was so pretty, sobbing on the grass
//  49.2        "Best night ever. | *Half missed it.*"
//  52.6        callback: "Sagittarius is still | *chasing it.*"  a tiny Sag runs after a meteor across the sky.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = '#8fe3ff'
const ST = { x: -170 }
const BASKET = ['..K.....K..', '...K...K...', 'RWRWRWRWRWR', 'WRWRWRWRWRW', 'RWRWRWRWRWR', '.WRWRWRWRW.']
const BLANKET = ['LLLLLLLLLL', 'LWLLWLLWLL', 'LLLLLLLLLL', 'LLWLLWLLWL', 'LLLLLLLLLL']

/** a meteor: a bright head with a fading tail, flying from (ax, ay) to (bx, by) over p ∈ 0…1 */
function meteor(x, ax, ay, bx, by, p, { size = 14, col = '#fff1b0', tail = 220 } = {}) {
  if (p <= 0 || p >= 1) return
  const hx = lerp(ax, bx, p), hy = lerp(ay, by, p), d = Math.hypot(bx - ax, by - ay), ux = (bx - ax) / d, uy = (by - ay) / d
  x.save(); x.globalAlpha = Math.sin(Math.PI * p)
  const g = x.createLinearGradient(hx, hy, hx - ux * tail, hy - uy * tail)
  g.addColorStop(0, col); g.addColorStop(1, 'rgba(255,241,176,0)')
  x.strokeStyle = g; x.lineWidth = size * 0.8; x.lineCap = 'round'; x.beginPath(); x.moveTo(hx, hy); x.lineTo(hx - ux * tail, hy - uy * tail); x.stroke()
  x.fillStyle = '#ffffff'; x.fillRect(hx - size / 2, hy - size / 2, size, size)
  x.restore()
}
/** a few meteors looping across the top of the panel */
function shower(x, lt, n = 3, seed = 0) {
  for (let i = 0; i < n; i++) {
    const p = ((lt * 0.7 + i / n + seed * 0.13) % 1)
    const ax = 300 + ((i * 197 + seed * 61) % 500), ay = 520 + (i * 37) % 60
    meteor(x, ax, ay, ax + 260, ay + 150, p, { size: 12 })
  }
}

const CAMEOS = [
  { sign: 'aries', cap: 'Made a wish | *on every single one.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [0, -1], star: ST, hops: [0.6, 1.1, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt) { shower(x, lt * 2.2, 4, 1) },
    front(x, t, lt, P) {
      const n = Math.floor(lerp(1, 212, ease.inCubic(prog(lt, 0.3, 2.2))))
      label(x, 790, 900, `WISHES: ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 44, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1090, 'AND THAT ONE!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Brought a picnic. | *Never looked up.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 1], star: ST,
    back(x, t, lt) { shower(x, lt, 3, 2) },
    front(x, t, lt, P) {
      drawBits(x, BASKET, { K: '#8a4a2e', R: RED, W: CREAM }, 790, 990, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 790, 'pass the cheese', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 1130, 'METEORS SEEN: 0', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Live commentary. | *For every meteor.*', mood: 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, -1], star: ST,
    back(x, t, lt) { shower(x, lt * 1.5, 3, 3) },
    front(x, t, lt, P) {
      const L = ['AND HE’S OFF!', 'WHAT A STREAK!', 'UNBELIEVABLE!']
      bubble(x, 790, 900, L[Math.min(2, Math.floor(prog(lt, 0.3, 2.0) * 3))], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 1100, 'ON AIR', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 38, bg: RED, color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Brought blankets | *for the whole hill.*', mood: 'heart', look: [1, 0], star: ST,
    back(x, t, lt) { shower(x, lt, 2, 4) },
    front(x, t, lt, P) {
      const n = Math.min(6, 1 + Math.floor(prog(lt, 0.2, 1.6) * 6))
      const COL = [LAV, PINK, MINT, SKYB, GOLD, '#ff9a4a']
      for (let i = 0; i < n; i++) drawBits(x, BLANKET, { L: COL[i], W: CREAM }, 790 + Math.sin(i * 2.3) * 14, 1080 - i * 44, 16, { alpha: pop01(t, P.t0 + 0.2 + i * 0.22, 0.2, 2) })
      bubble(x, 790, 700, 'cold? take two.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl', col: PINK })
    } },
  { sign: 'leo', cap: 'Turned for a profile pic. | *Missed all of them.*', mood: 'sparkle', look: [-1, 0], star: { x: -120 },
    back(x, t, lt) { shower(x, lt * 1.6, 4, 8) },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(F.x - 175, F.cy - 20); x.rotate(-0.1); x.scale(1.4 * k, 1.4 * k); x.fillStyle = INK; x.fillRect(-46, -80, 92, 160); x.fillStyle = '#2a2350'; x.fillRect(-38, -72, 76, 144); x.fillStyle = GOLD; x.fillRect(-26, -50, 52, 60); x.restore() }
      label(x, 760, 1110, 'BEHIND YOU!!', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Logged every meteor. | *Alphabetically.*', mood: 'squint', look: [1, 0], star: ST,
    back(x, t, lt) { shower(x, lt, 2, 5) },
    front(x, t, lt, P) {
      const n = Math.min(5, 1 + Math.floor(prog(lt, 0.3, 1.8) * 5))
      card(x, 790, 900, 300, 340, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'METEOR LOG', 0, -130, { size: 28, font: MONO, weight: 700, color: RED })
        ;['A: Arnold', 'B: Bethany', 'C: Clive', 'D: Doris', 'E: Ed'].slice(0, n).forEach((s, i) => txt(x, s, 0, -70 + i * 50, { size: 30, font: MONO, weight: 700 }))
      })
    } },
  { sign: 'libra', cap: 'Saw one. | *Still choosing the wish.*', mood: 'neutral', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, -1], star: ST,
    back(x, t, lt) { meteor(x, 420, 530, 760, 700, prog(lt, 0.1, 0.8), { size: 16 }) },
    front(x, t, lt, P) {
      bubble(x, 790, 900, lt < 1.2 ? 'a match? | a puppy?' : 'a match WITH | a puppy?', pop01(t, P.t0 + (lt < 1.2 ? 0.6 : 1.2), 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 1110, 'WISH: PENDING', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Pointed at the sky. | *A meteor appeared.*', mood: lt => lt > 1.1 ? 'wink' : 'squint', look: [1, -1], star: ST,
    back(x, t, lt) { meteor(x, 600, 520, 900, 700, prog(lt, 0.9, 1.5), { size: 20, tail: 300 }) },
    front(x, t, lt, P) {
      bubble(x, 790, 800, 'there.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 48, tail: 'bl', col: LAV })
      sparkles(x, t, 820, 640, P.t0 + 1.2, 7, 120, 0.3)
      label(x, 790, 1080, 'COINCIDENCE?', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Saw a meteor. | *Chased it.*', mood: 'sparkle', look: [1, -1], star: { x: -60, s: 260 },
    back(x, t, lt) { meteor(x, 620, 600, 960, 740, prog(lt, 0.2, 2.6), { size: 26, tail: 260 }) },
    front(x, t, lt, P, F) {
      x.fillStyle = 'rgba(239,230,214,0.5)'; for (let i = 0; i < 4; i++) x.fillRect(F.x - 240 - i * 16, F.cy - 60 + i * 40, 120 - i * 18, 10)
      label(x, 540, 1130, 'SPEED: YES', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Penciled it in. | *11:02 to 11:04.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    back(x, t, lt) { shower(x, lt, 2, 6) },
    front(x, t, lt, P) {
      card(x, 790, 880, 300, 300, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: CREAM, rot: -0.03 }, () => {
        x.fillStyle = '#5fd068'; x.fillRect(-150, -150, 300, 60); txt(x, 'TONIGHT', 0, -120, { size: 30, color: INK })
        txt(x, '11:00 snack', 0, -50, { size: 28, font: MONO, weight: 700, color: GREY })
        x.fillStyle = '#fff1b0'; x.fillRect(-140, -20, 280, 60); txt(x, '11:02 WONDER', 0, 10, { size: 30, font: MONO, weight: 700, color: RED })
        txt(x, '11:05 bed', 0, 80, { size: 28, font: MONO, weight: 700, color: GREY })
      })
    } },
  { sign: 'aquarius', cap: 'Waved at a meteor. | *It waved back.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [1, -1], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const p = prog(lt, 0.2, 2.4), hx = lerp(560, 860, p), hy = lerp(560, 700, p)
      meteor(x, 560, 560, 860, 700, Math.min(0.99, Math.max(0.01, p)), { size: 44, tail: 300 })
      if (lt > 1.0) { txt(x, '^ ^', hx, hy - 2, { size: 26, color: INK }); x.save(); x.translate(hx + 34, hy - 36); x.rotate(Math.sin(t * 12) * 0.5); x.fillStyle = '#ffffff'; x.fillRect(-5, -26, 10, 30); x.restore() }
      bubble(x, 790, 1000, 'hi!! bye!!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'It was so pretty. | *Sobbing on the grass.*', mood: 'heart', tears: 3, look: [0, -1], star: { x: -150, y: 30 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt) {
      x.fillStyle = '#3f8f52'; x.fillRect(200, 1060, 680, 70); x.fillStyle = '#5fd068'; for (let i = 0; i < 26; i++) x.fillRect(206 + i * 26, 1040 + (i % 3) * 6, 10, 26)
      shower(x, lt, 4, 7)
    },
    front(x, t, lt, P) {
      bubble(x, 790, 880, 'it’s just | SO BEAUTIFUL', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, tail: 'bl', col: SKYB })
    } },
]

const F = makeFilm({
  id: 'r2t0169', key: 'D', accent: ACC, ending: 'callback',
  title: 'The signs watching | *a meteor shower.*',
  cameos: CAMEOS,
  group: { cap: 'Best night ever. | *Half missed it.*' },
  last: {
    text: 'Sagittarius is still | *chasing it.*',
    draw(x, t, lt) {
      const p = prog(lt, 0.3, 3.6)
      meteor(x, 200, 860, 1100, 1060, Math.min(0.99, 0.05 + p * 0.9), { size: 24, tail: 340 })
      const sx = lerp(80, 760, ease.inOutQuad(p)), sy = lerp(1230, 1300, p)
      signChar(x, t, 'sagittarius', sx, sy, 260 * pop01(t, t - lt + 0.3, 0.45, 1.8), { mood: 'sparkle', look: [1, -1], seed: 61, hops: [t - lt + 0.8, t - lt + 1.4, t - lt + 2.0, t - lt + 2.6] })
      x.fillStyle = 'rgba(239,230,214,0.5)'; for (let i = 0; i < 3; i++) x.fillRect(sx - 200 - i * 14, sy - 40 + i * 36, 100 - i * 18, 10)
      label(x, 540, 1500, 'DISTANCE: FAR', pop01(t, t - lt + 1.6, 0.3, 2.4), { size: 38, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
