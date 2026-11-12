// r2t0230: THE SIGNS AS… v3, "The signs | in autumn." (rollcall, star_talk, music: lofi · F). Ending: group.
//   ♈ jumped in the leaf pile before it was raked · ♉ bought every pumpkin snack, ate them all · ♊ four outfits by noon
//   · ♋ blanket, tea, never leaving · ♌ wore a scarf, called it a cape · ♍ sorted the leaves by colour
//   · ♎ photographed one leaf from every angle · ♏ spooky season started in June · ♐ apple picking, two states over
//   · ♑ raked the yard, then the neighbours' · ♒ shorts in October · ♓ watched one leaf fall, sobbed
//   group (the ending): "Cozy outside. | *Chaos inside.*"  leaves drift down over the photo
import { prog, ease, clamp } from '../../../src/lib.js'
import { makeFilm, sparkles, hearts, bubble, label, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { phone, note, calendar, bits, ORANGE, RED, PAPER, WOOD, GREEN } from '../props.js'

const L = { x: -150 }, R = { x: 150 }
const LEAFC = ['#e8742a', '#d9452b', '#f2c75c', '#b5532a']
const LEAF = c => [['....L....', '...LLL...', '.L.LLL.L.', 'LLLLDLLLL', '.LLLDLLL.', '..LLDLL..', '...LDL...', '....D....', '....D....'], { L: c, D: '#5a2e14' }]
const leaf = (x, cx, cy, cell, i, o) => { const [b, c] = LEAF(LEAFC[i % 4]); drawBits(x, b, c, cx, cy, cell, o) }
const PUMPKIN = [['....G....', '....G....', '.OOOOOOO.', 'OOoOOOoOO', 'OOoOOOoOO', 'OOoOOOoOO', '.OOOOOOO.'], { G: GREEN, O: ORANGE, o: '#c9561a' }]
const APPLE = [['....G.L..', '....GLL..', '.RRRGRRR.', 'RRWRRRRRR', 'RRRRRRRRR', 'RRRRRRRRR', '.RRRRRRR.', '..RR.RR..'], { G: '#5a2e14', L: GREEN, R: RED, W: '#ffb0a0' }]
function falling(x, t, cx, cy, t0, n = 6, w = 300) {
  if (t < t0) return
  for (let i = 0; i < n; i++) { const ph = ((t - t0) * 0.35 + i / n) % 1; leaf(x, cx + Math.sin(i * 2.3) * w * 0.5 + Math.sin(t * 2 + i) * 30, cy - 200 + ph * 400, 6, i, { rot: t * 1.5 + i, alpha: Math.sin(Math.PI * ph) }) }
}

const CAMEOS = [
  { sign: 'aries', cap: 'Jumped in the leaf pile. | *Before it was raked.*', mood: lt => lt > 0.9 ? 'sparkle' : 'wide', star: { x: -150, y: -40 }, hops: [0.4, 0.9],
    back(x, t, lt, P) { for (let i = 0; i < 14; i++) leaf(x, 250 + (i % 7) * 50, 1080 - Math.floor(i / 7) * 40, 9 * pop01(t, P.t0 + 0.1, 0.3, 2), i) },
    front(x, t, lt, P) {
      for (let i = 0; i < 8; i++) { const p = prog(lt, 0.5, 1.8); if (p > 0 && p < 1) leaf(x, 390 + Math.cos(i) * 260 * p, 1000 - Math.sin(Math.PI * p) * (200 + i * 20), 8, i, { rot: t * 3 + i }) }
      label(x, 790, 760, 'PILE: GONE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 40, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Bought every pumpkin snack. | *Ate them all.*', mood: lt => lt > 1.4 ? 'sleepy' : 'heart', star: L,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, PUMPKIN[0], PUMPKIN[1], 700 + i * 90, 900 - (i % 2) * 60, 14 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2), { alpha: 1 - prog(lt, 1.0 + i * 0.3, 1.2 + i * 0.3) })
      label(x, 790, 700, 'PUMPKIN: EVERYTHING', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 30, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1070, 'LEFT: 0', pop01(t, P.t0 + 1.9, 0.3, 2.2), { size: 36, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Changed outfits | *four times by noon.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const n = Math.min(4, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.4))
      const W = ['sweater', 'tank top', 'raincoat', 'all three']
      note(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), W[n - 1], { head: `OUTFIT #${n}`, headBg: GOLD, size: 46, w: 320 })
      label(x, 790, 980, 'IT’S 11:58', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Blanket. Tea. Candle. | *Never leaving.*', mood: 'sleepy', star: L,
    front(x, t, lt, P) {
      bits(x, 'mug', 790, 780, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 980, 'STATUS: BURRITO', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Wore a scarf. | Called it *a cape.*', mood: 'sparkle', star: L, hops: [0.9],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2); if (k <= 0.01) return
      x.save(); x.translate(390, 900); x.scale(k, k); x.fillStyle = RED
      x.beginPath(); x.moveTo(-60, -40); x.lineTo(60, -40); x.lineTo(110 + 20 * Math.sin(t * 5), 180); x.lineTo(-110 + 20 * Math.sin(t * 5 + 1), 180); x.closePath(); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      label(x, 790, 760, 'FALL ICON', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 44, bg: '#ffb34a', rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 390, 860, P.t0 + 1.2, 6, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Sorted the leaves. | *By colour.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) leaf(x, 700 + c * 90, 700 + r * 100, 8 * pop01(t, P.t0 + 0.2 + (r * 3 + c) * 0.07, 0.3, 2), r)
    } },
  { sign: 'libra', cap: 'Photographed one leaf. | *From every angle.*', mood: 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: L,
    front(x, t, lt, P) {
      leaf(x, 790, 820, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), 2, { rot: Math.floor(lt * 2.5) * 0.6 })
      label(x, 790, 1040, `PHOTO ${1 + Math.floor(Math.max(0, lt - 0.3) * 40)}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 36, bg: '#ff8fb1', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Spooky season? | *Started in June.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      calendar(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), 'JUNE 1', 'BOO')
      drawBits(x, PUMPKIN[0], PUMPKIN[1], 790, 1030, 16 * pop01(t, P.t0 + 1.0, 0.3, 2.2))
    } },
  { sign: 'sagittarius', cap: 'Went apple picking. | *Two states over.*', mood: 'sparkle', star: R, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      drawBits(x, APPLE[0], APPLE[1], 310, 760, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 310, 970, 'DRIVE: 6 HOURS', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Raked their yard. | *Then the neighbours’.*', mood: lt => lt < 1.2 ? 'neutral' : 'happy', look: [-1, 0], star: R,
    front(x, t, lt, P) {
      const n = Math.min(3, 1 + Math.floor(Math.max(0, lt - 0.4) / 0.5))
      label(x, 310, 760, `YARDS DONE: ${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      for (let i = 0; i < 5; i++) leaf(x, 220 + i * 45, 1000, 8 * pop01(t, P.t0 + 0.5, 0.3, 2), i)
    } },
  { sign: 'aquarius', cap: 'Wore shorts | *in October.*', mood: 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      label(x, 790, 720, '9°C', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 64, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 940, 'feels fine!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 44, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Watched one leaf fall. | *Sobbed.* Beautiful.', mood: lt => lt < 0.9 ? 'happy' : 'wide', tears: lt => lt < 0.9 ? 1 : 3, star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const p = ease.inOutCubic(prog(lt, 0.2, 2.0))
      leaf(x, 790 + Math.sin(p * 9) * 50, 600 + p * 360, 16, 1, { rot: Math.sin(p * 9) * 0.6 })
      bubble(x, 800, 1130, 'goodbye, leaf', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0230', key: 'F', accent: ORANGE, ending: 'group',
  title: 'The signs | *in autumn.*',
  cameos: CAMEOS,
  group: {
    cap: 'Cozy outside. | *Chaos inside.*',
    draw(x, t, lt) { if (lt > 1.4) falling(x, t, 540, 1150, t - lt + 1.4, 10, 900) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
