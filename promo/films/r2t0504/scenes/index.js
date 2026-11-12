// r2t0504: star_talk, ROLLCALL (twelve signs), "The signs | making pancakes." (signs3kit social cut, music: lofi · D).
// Aries flipped it onto the ceiling · Taurus stacked forty, for one · Gemini ran two pans, both burnt · Cancer made
// hearts for everyone, even the dog · Leo's pancake is their own face · Virgo weighed the batter to the gram · Libra ran
// a compatibility check on syrup and honey · Scorpio's recipe is redacted · Sagittarius flew to try them abroad ·
// Capricorn prepped pancakes for the whole week · Aquarius poured a constellation · Pisces: too beautiful to eat.
// Ending: group ("Breakfast is | a group project." and Aries' ceiling pancake finally lands on the stack).
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, friend, steam, bits, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffc46a', ST = { x: -180 }
const PAN = ['..KKKKKKKKKK........', '.KSSSSSSSSSSK.......', 'KSSSSSSSSSSSSKKKKKKK', 'KSSSSSSSSSSSSKKKKKKK', '.KSSSSSSSSSSK.......', '..KKKKKKKKKK........']
const PAN_C = { K: '#2a2350', S: '#4a4470' }
const SYRUP = ['.KK.', '.KK.', 'AAAA', 'AAAA', 'AWAA', 'AAAA', 'AAAA']

// one pixel pancake (a golden disc seen from the side), w wide
function cake(x, cx, cy, w, k = 1, { col = '#f2b25c', top = '#ffd58a', rot = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  const h = Math.max(18, w * 0.16)
  x.fillStyle = INK; x.fillRect(-w / 2 - 4, -h / 2 - 4, w + 8, h + 8)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = top; x.fillRect(-w / 2 + 6, -h / 2, w - 12, h * 0.35)
  x.restore()
}
function stack(x, cx, base, n, w, k = 1) { for (let i = 0; i < n; i++) cake(x, cx + Math.sin(i * 1.7) * 6, base - i * Math.max(18, w * 0.16) * 0.9 * k, w, k) }
// a flat pancake seen from above (a round golden disc) with an optional face / heart / dots
function disc(x, cx, cy, r, k, deco) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 6, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#f2b25c'; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#ffd58a'; x.beginPath(); x.arc(-r * 0.15, -r * 0.15, r * 0.7, 0, Math.PI * 2); x.fill()
  if (deco) deco(x, r)
  x.restore()
}
function smoke(x, t, cx, cy) { x.save(); for (let i = 0; i < 8; i++) { const ph = ((t * 0.7 + i / 8) % 1 + 1) % 1; x.globalAlpha = 0.6 * Math.sin(Math.PI * ph); x.fillStyle = '#6a6478'; x.fillRect(cx + Math.sin(i * 2.3 + ph * 4) * 30 - 12, cy - ph * 160, 24, 24) } x.restore() }

const CAMEOS = [
  { sign: 'aries', cap: 'Flipped it once. | It’s *on the ceiling.*', mood: lt => lt > 1.0 ? 'wide' : 'sparkle', look: [1, -1], star: ST, hops: [0.8],
    front(x, t, lt, P) {
      drawBits(x, PAN, PAN_C, 820, 1000, 12 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const up = ease.outCubic(prog(lt, 0.8, 1.2))
      cake(x, 790, lerp(975, 520, up), 150, pop01(t, P.t0 + 0.3, 0.3, 2), { rot: up * 6.5 })
      L(x, 800, 760, 'CEILING: 1', pop01(t, P.t0 + 1.4, 0.3, 2.4), RED, 0.04, 36)
    } },
  { sign: 'taurus', cap: 'Made a stack | of *forty.* For one.', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      bits(x, 'PLATE', 800, 1060, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      stack(x, 800, 1020, 1 + Math.floor(clamp((lt - 0.3) / 1.2) * 11), 180)
      L(x, 800, 600, 'SERVES: ME', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: 'gemini', cap: 'Two pans at once. | *Both* burnt.', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), burnt = lt > 1.1
      for (const [px, py] of [[760, 820], [800, 1020]]) { drawBits(x, PAN, PAN_C, px + 40, py, 9 * k); cake(x, px - 5, py - 18, 110, k, burnt ? { col: '#4a2a1a', top: '#6a3a22' } : {}); if (burnt) smoke(x, t, px, py - 40) }
      L(x, 800, 1140, 'MULTITASKING', pop01(t, P.t0 + 1.5, 0.3, 2.4), STEEL, -0.04, 32)
    } },
  { sign: 'cancer', cap: 'Heart pancakes for everyone. | *Even the dog.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) disc(x, 690 + i * 115, 840, 50, pop01(t, P.t0 + 0.3 + i * 0.3, 0.3, 2), (x2, r) => drawBits(x2, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86' }, 0, 0, r / 6, { outline: null }))
      L(x, 920, 960, 'DOG’S', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, 0.08, 26)
      hearts(x, t, 800, 760, P.t0 + 1.4, { n: 5, life: 1.5, spread: 220, cell: 7, seed: 4 })
    } },
  { sign: 'leo', cap: 'Made a pancake of | *their own face.*', mood: 'sparkle', star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      disc(x, 800, 860, 130, k)
      if (k > 0.3) signChar(x, t, 'leo', 800, 860, 150 * k, { mood: 'wink', seed: 71, glyph: false, glow: 0.2, alpha: 0.85 })
      L(x, 800, 1070, 'A MASTERPIECE', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 34)
      sparkles(x, t, 800, 860, P.t0 + 1.2, 7, 170, 0.4)
    } },
  { sign: 'virgo', cap: 'Weighed the batter. | *To the gram.*', mood: 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(800, 940); x.scale(k, k); x.fillStyle = INK; x.fillRect(-150, -24, 300, 110); x.fillStyle = STEEL; x.fillRect(-142, -16, 284, 94); x.fillStyle = '#0d2a20'; x.fillRect(-90, 10, 180, 50); x.fillStyle = MINT; x.font = `700 36px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(lt > 1.2 ? '125.0g' : (100 + Math.floor(lt * 20)) + '.' + Math.floor(t * 30) % 10 + 'g', 0, 36); x.restore() }
      bits(x, 'BOWL', 800, 870, 14 * k)
      L(x, 800, 680, 'NOT 124.9', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, 0.04, 34)
    } },
  { sign: 'libra', cap: 'Syrup or honey? | Ran a *compatibility check.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, SYRUP, { K: INK, A: '#c9702a', W: '#ffd58a' }, 700, 860, 18 * k)
      drawBits(x, SYRUP, { K: INK, A: GOLD, W: '#fff4c0' }, 900, 860, 18 * k)
      L(x, 800, 660, '✦ COMPATIBILITY', pop01(t, P.t0 + 0.6, 0.3, 2.2), LAV, -0.04, 30)
      L(x, 800, 1070, 'IT’S A MATCH. BOTH.', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, 0.04, 30)
      hearts(x, t, 800, 860, P.t0 + 1.5, { n: 4, life: 1.3, spread: 120, cell: 7, seed: 5 })
    } },
  { sign: 'scorpio', cap: 'The recipe? | You’ll *never know.*', mood: 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      sheet(x, 800, 840, k, { w: 330, h: 320, head: 'RECIPE', headBg: RED, headInk: CREAM, lines: ['2 eggs', 'flour', 'milk'], size: 32, align: 'left' })
      if (k > 0.9) { x.save(); x.translate(800, 840); x.rotate(-0.04); x.fillStyle = INK; for (let i = 0; i < 3; i++) { const p = clamp((lt - 0.8 - i * 0.2) / 0.3); x.fillRect(-145, 22 + i * 43, 260 * p, 34) } x.restore() }
      L(x, 800, 1080, 'CLASSIFIED', pop01(t, P.t0 + 1.6, 0.3, 2.4), LAV, 0.04, 34)
    } },
  { sign: 'sagittarius', cap: 'Pancakes? | Flew abroad *to try them.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      bits(x, 'SUITCASE', 820, 960, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const fl = ease.inOutCubic(prog(lt, 0.7, 1.8))
      bits(x, 'PLANE', lerp(620, 880, fl), lerp(800, 680, fl), 12 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: 0.9 })
      L(x, 800, 1120, 'BACK FOR LUNCH', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Made pancakes | for *the whole week.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const D = ['MON', 'TUE', 'WED', 'THU', 'FRI']
      D.forEach((d, i) => { const k = pop01(t, P.t0 + 0.3 + i * 0.22, 0.3, 2); const px = 660 + (i % 3) * 140, py = 790 + Math.floor(i / 3) * 190; bits(x, 'BOX', px, py, 9 * k); cake(x, px, py - 30, 90, k); L(x, px, py + 50, d, k, [SKYB, MINT, GOLD, PINK, LAV][i], 0.04, 24) })
      L(x, 800, 1130, 'MEAL PREP: DONE', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Poured the batter | as *a constellation.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      const S = [[690, 720], [760, 800], [840, 790], [900, 880], [800, 940], [720, 1010], [880, 1020]]
      const n = Math.floor(clamp((lt - 0.3) / 1.0) * S.length)
      x.save(); x.strokeStyle = 'rgba(239,230,214,0.6)'; x.lineWidth = 4; x.beginPath(); for (let i = 0; i < n; i++) i ? x.lineTo(...S[i]) : x.moveTo(...S[i]); x.stroke(); x.restore()
      S.slice(0, n).forEach(([px, py], i) => disc(x, px, py, 28, 1))
      L(x, 800, 1130, 'IT’S ORION. OBVIOUSLY.', pop01(t, P.t0 + 1.5, 0.3, 2.4), SKYB, -0.04, 28)
    } },
  { sign: 'pisces', cap: 'Too beautiful | *to eat.*', mood: 'sparkle', tears: 3, look: [1, 0], star: ST, hops: [1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'PLATE', 810, 960, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      stack(x, 810, 920, 3, 170, pop01(t, P.t0 + 0.4, 0.3, 2))
      drawBits(x, ['..W..', '.WRW.', '..G..'], { W: '#ffffff', R: RED, G: '#4fbf6a' }, 810, 840, 12 * pop01(t, P.t0 + 0.7, 0.3, 2))
      bubble(x, 810, 680, 'i can’t. it’s perfect.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 30, col: SKYB, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0504', key: 'D', accent: ACC, ending: 'group',
  title: 'The signs | *making pancakes.*',
  cameos: CAMEOS,
  group: {
    cap: 'Breakfast is | *a group project.*',
    moods: ['wide', 'heart', 'sparkle', 'heart', 'sparkle', 'squint', 'heart', 'squint', 'sparkle', 'happy', 'sparkle', 'sparkle'],
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.6, 0.4, 2)
      stack(x, 540, 780, 6, 220, k)
      // Aries' ceiling pancake finally comes down and lands on top
      const d = ease.outCubic(prog(lt, 2.0, 2.5))
      if (lt > 2.0) cake(x, 540, lerp(300, 780 - 6 * 35 * 0.9, d), 220, 1, { rot: (1 - d) * 4 })
      L(x, 760, 600, 'FROM THE CEILING', pop01(t, t0 + 2.6, 0.3, 2.4), RED, 0.05, 28)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
