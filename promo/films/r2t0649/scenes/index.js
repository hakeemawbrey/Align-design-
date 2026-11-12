// r2t0649: star_talk, ROLLCALL, "The signs as | *dog walkers.*" (~57 s vertical, signs3kit social cut, music: lofi · D).
// Ending: callback.
//   0.0–3.6    the hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   one dog walker per sign (3.8 s each), each pushed to the extreme:
//              ♈ the walk is a sprint now · ♉ walked to the café, stayed four hours · ♊ six dogs, a conversation with each
//              · ♋ packed the dog a lunchbox · ♌ matching sunglasses with the dog · ♍ brought a lint roller, for the dog
//              · ♎ let the dog pick the route, again · ♏ only walks at midnight · ♐ short walk, three towns over
//              · ♑ a dog-walking empire, twelve employees · ♒ walks a cat, on purpose · ♓ every dog waved, cried every time
//  49.2        "Good dogs. | *Chaotic walkers.*"  The twelve fly up into a group photo.
//  52.6        CALLBACK: "Aquarius’ cat? | *Walks them now.*"  The cat in front, holding the leash.
import { makeFilm, sparkles, hearts, bubble, label, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, bits, steam, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffb34a'
const R = { x: -170 }
const DOG = ['B.........', 'BB......BB', 'BBBBBBBBBK', 'BBBBBBBBBB', '.BBBBBBBB.', '.BB....BB.', '.BB....BB.']
const DOGC = { B: '#c98f5a', K: INK }
const CAT = ['K.......K.', 'KK.....KK.', 'KKKKKKKKK.', 'KGKKKKGKK.', 'KKKKKKKKK.', '.KKKKKKK..', '.KK...KK..', '.KK...KKKK']
const dog = (x, cx, cy, cell, o = {}) => drawBits(x, DOG, o.c || DOGC, cx, cy, cell * 1.25, o)

const CAMEOS = [
  { sign: 'aries', cap: 'The walk? | It’s a *sprint now.*', mood: 'wide', star: R, hops: [0.3, 0.6, 0.9, 1.2, 1.5, 1.8],
    front(x, t, lt, P) {
      dog(x, 780 + 20 * Math.sin(t * 12), 860, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.25 })
      L(x, 790, 1060, 'PACE: TOO FAST', pop01(t, P.t0 + 0.8, 0.3, 2.2), RED, -0.04, 38)
    } },
  { sign: 'taurus', cap: 'Walked to the café. | *Stayed four hours.*', mood: lt => lt > 1.3 ? 'sleepy' : 'happy', star: R,
    front(x, t, lt, P) {
      bits(x, 'MUG', 760, 850, 18 * pop01(t, P.t0 + 0.2, 0.3, 2)); steam(x, t, 750, 790, { n: 2, alpha: 0.7, h: 90 })
      dog(x, 870, 960, 12 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 790, 1080, 'WALK TIME: 4 HRS', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  { sign: 'gemini', cap: 'Six dogs. | A *conversation with each.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.6) % 2 ? 1 : -1, 0], star: R,
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) dog(x, 700 + (i % 3) * 95, 940 + Math.floor(i / 3) * 80, 8 * pop01(t, P.t0 + 0.2 + i * 0.08, 0.3, 2), { c: { B: ['#c98f5a', '#f2e0c0', '#6b4a3a'][i % 3], K: INK } })
      const W = ['and YOU—', 'oh, and you!', 'wait, you too']
      bubble(x, 790, 760, W[Math.min(2, Math.floor(Math.max(0, lt - 0.5) / 0.5))], pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Packed the dog | a *lunchbox.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: R,
    front(x, t, lt, P) {
      bits(x, 'BOX', 790, 830, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 830, 'FOR: BISCUIT', pop01(t, P.t0 + 0.7, 0.3, 2.2), PINK, -0.05, 30)
      dog(x, 790, 1000, 12 * pop01(t, P.t0 + 0.9, 0.3, 2))
      hearts(x, t, 790, 980, P.t0 + 1.3, { n: 4, life: 1.6, spread: 140, cell: 6, seed: 2 })
    } },
  { sign: 'leo', cap: 'Matching sunglasses. | With *the dog.*', mood: 'sparkle', star: R, hops: [1.2],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      dog(x, 790, 930, 18 * k)
      bits(x, 'SHADES', 840, 880, 8 * pop01(t, P.t0 + 0.7, 0.3, 2))
      bits(x, 'SHADES', F.x, F.cy - 10, 12 * pop01(t, P.t0 + 0.9, 0.3, 2))
      L(x, 790, 1080, 'ICONIC DUO', pop01(t, P.t0 + 1.3, 0.3, 2.2), '#ffb34a', 0.05, 36)
    } },
  { sign: 'virgo', cap: 'Brought a lint roller. | *For the dog.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: R,
    front(x, t, lt, P) {
      dog(x, 790, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1070, 'FUR: REMOVED', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, -0.04, 36)
      sparkles(x, t, 790, 880, P.t0 + 1.2, 6, 140, 0.1)
    } },
  { sign: 'libra', cap: 'Let the dog | *pick the route.* Again.', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: R,
    front(x, t, lt, P) {
      dog(x, 790, 950, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { sx: Math.floor(lt * 2.4) % 2 ? 1 : -1 })
      L(x, 790, 770, Math.floor(lt * 2.4) % 2 ? 'RIGHT?' : 'LEFT?', pop01(t, P.t0 + 0.4, 0.3, 2), PINK, 0.05, 44)
    } },
  { sign: 'scorpio', cap: 'Only walks | *at midnight.*', mood: 'squint', look: [1, 0], star: R,
    front(x, t, lt, P) {
      bits(x, 'MOON', 790, 780, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      dog(x, 790, 990, 14 * pop01(t, P.t0 + 0.5, 0.3, 2), { c: { B: '#7a6a9a', K: INK } })
      L(x, 790, 1100, '12:00 A.M.', pop01(t, P.t0 + 1.1, 0.3, 2.2), '#c97bff', -0.04, 36)
    } },
  { sign: 'sagittarius', cap: 'Short walk. | *Three towns over.*', mood: 'sparkle', star: R, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      bits(x, 'MAP', 790, 840, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      L(x, 790, 1050, 'TOWN 3. KEEP GOING?', pop01(t, P.t0 + 1.1, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: 'capricorn', cap: 'Dog walking empire. | *Twelve employees.*', mood: 'neutral', look: [1, 0], star: R,
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) dog(x, 700 + i * 60, 880, 7 * pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2))
      for (let i = 0; i < 4; i++) dog(x, 700 + i * 60, 950, 7 * pop01(t, P.t0 + 0.5 + i * 0.1, 0.3, 2))
      L(x, 790, 760, 'CEO', pop01(t, P.t0 + 1.0, 0.3, 2.2), '#2fc79a', -0.04, 48)
      L(x, 790, 1070, 'NOW HIRING', pop01(t, P.t0 + 1.5, 0.3, 2.2), BONE, 0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Walks a cat. | *On purpose.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: R, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CAT, { K: '#9aa5c4', G: MINT }, 790, 930, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 760, 'she loves it', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Every dog waved. | *Cried every time.*', mood: lt => lt < 0.9 ? 'happy' : 'wide', tears: lt => lt < 0.9 ? 1 : 3, star: R,
    front(x, t, lt, P) {
      dog(x, 790, 920, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = 1 + Math.min(8, Math.floor(Math.max(0, lt - 0.5) / 0.2))
      L(x, 790, 1070, `DOGS MET: ${n}`, pop01(t, P.t0 + 0.6, 0.3, 2), SKYB, -0.04, 36)
      hearts(x, t, 790, 880, P.t0 + 0.9, { n: 5, life: 1.6, spread: 160, cell: 6, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0649', key: 'D', accent: ACC, ending: 'callback',
  title: 'The signs as | *dog walkers.*',
  cameos: CAMEOS,
  group: { cap: 'Good dogs. | *Chaotic walkers.*' },
  last: {
    text: 'Aquarius’ cat? | *Walks them now.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const kc = pop01(t, t0 + 0.3, 0.35, 2), ks = pop01(t, t0 + 0.6, 0.4, 2)
      x.save(); x.globalAlpha = clamp(Math.min(kc, ks)); x.strokeStyle = '#ff6b5a'; x.lineWidth = 6; x.beginPath(); x.moveTo(700, 1170); x.quadraticCurveTo(560, 1230, 430, 1150); x.stroke(); x.restore()
      drawBits(x, CAT, { K: '#9aa5c4', G: MINT }, 730, 1180, 22 * kc)
      if (ks > 0.01) signChar(x, t, 'aquarius', 380, 1140, 280 * ks, { mood: lt > 1.4 ? 'wide' : 'happy', look: [1, 0], seed: 15, glyph: false, hops: [t0 + 1.0, t0 + 1.8] })
      L(x, 560, 1380, 'WHO’S WALKING WHO?', pop01(t, t0 + 1.2, 0.3, 2.2), MINT, -0.04, 34)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
