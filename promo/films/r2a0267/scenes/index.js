// r2a0267: star_advice, ADVICE SOLO, "How to encourage | a Libra." (~43 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (solo mode, 9 cards): Libra's people-pleasing, indecisive, taste-for-days life, warmly
// encouraged.
//   0.0–3.6    "How to encourage | *a Libra.*"
//   3.6–37.8   nine cards (3.8 s each):
//              stuck choosing, your gut already knows · said sorry for nothing, apologies refunded · keeping the peace,
//              your opinion weighs something too (the scales) · your taste is genuinely great · hosting everyone, sit
//              down and eat · disagree out loud, they'll still like you · over-reading the match, enjoy the date
//              · nine outfits, the first one was it · the mirror: that's a good friend
//  37.8        group ending: "Pick yourself. | *Every time.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, chart, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const S = 'libra'
const ST = { x: -190 }
const tag = (x, cx, cy, k, s, bg, rot = -0.04, size = 32) => label(x, cx, cy, s, k, { size, bg, rot, font: MONO, weight: 700 })

const PLATE = ['..WWWWWWWWW..', '.WWWWWWWWWWW.', 'WWWWOOWWGGWWW', '.WWWOOWWGGWW.', '..WWWWWWWWW..']
const PLATE_C = { W: '#fff4e2', O: '#e8a24a', G: '#5fd068' }
const CHAIR = ['KK.......', 'KK.......', 'KK.......', 'KK.......', 'KKKKKKKKK', 'KKKKKKKKK', 'KK.....KK', 'KK.....KK', 'KK.....KK']
const SHIRT = ['.CC..CC.', 'CCCCCCCC', 'CCCCCCCC', '..CCCC..', '..CCCC..', '..CCCC..']

/** balance scales: tilt -1 … 1, left/right labels */
function scales(x, cx, cy, k, tilt, a, b) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-12, -150, 24, 300); x.fillRect(-90, 140, 180, 24)
  x.fillStyle = GOLD; x.fillRect(-6, -144, 12, 290); x.fillRect(-84, 144, 168, 14)
  x.save(); x.translate(0, -140); x.rotate(tilt * 0.3)
  x.fillStyle = INK; x.fillRect(-190, -8, 380, 16); x.fillStyle = GOLD; x.fillRect(-186, -4, 372, 8)
  for (const [d, s] of [[-1, a], [1, b]]) {
    x.save(); x.translate(d * 170, 0); x.rotate(-tilt * 0.3)
    x.strokeStyle = BONE; x.lineWidth = 3; x.beginPath(); x.moveTo(0, 0); x.lineTo(-60, 110); x.moveTo(0, 0); x.lineTo(60, 110); x.stroke()
    x.fillStyle = INK; x.fillRect(-80, 106, 160, 26); x.fillStyle = GOLD; x.fillRect(-76, 110, 152, 18)
    txt(x, s, 0, 80, { size: 28, font: MONO, weight: 700, color: BONE })
    x.restore()
  }
  x.restore(); x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Stuck choosing? | *Your gut already knows.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: lt => lt > 1.3 ? [1, 0] : [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), pick = ease.outBack ? ease.outCubic(prog(lt, 1.0, 1.3)) : 0
      card(x, 700, 820, 160, 200, k * (1 + 0.12 * pick), { bg: CREAM, rot: -0.06 }, () => { txt(x, 'SOUP', 0, 0, { size: 36 }) })
      card(x, 880, 820, 160, 200, k * (1 - 0.15 * pick), { bg: CREAM, rot: 0.06 }, () => { txt(x, 'SALAD', 0, 0, { size: 32 }) })
      if (lt > 1.0) sparkles(x, t, 700, 820, P.t0 + 1.0 * 1.29, 6, 120, 0.2)
      tag(x, 790, 1060, pop01(t, P.t0 + 1.4, 0.3, 2.2), 'GUT: CALLED IT', MINT, 0.04, 34)
    } },
  { sign: S, cap: 'Said sorry for nothing? | *Apologies refunded.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const gone = ease.inCubic(prog(lt, 1.0, 1.3))
      ;[[760, 680], [860, 800], [740, 900]].forEach(([bx, by], i) => bubble(x, bx, by, 'sorry!', pop01(t, P.t0 + 0.2 + i * 0.25, 0.25, 2.2) * (1 - gone), { size: 40, col: PINK, tail: 'bl' }))
      card(x, 790, 980, 320, 150, pop01(t, P.t0 + 1.4, 0.3, 2.2), { bg: CREAM, rot: 0.04 }, () => { txt(x, 'RECEIPT', 0, -36, { size: 26, font: MONO, weight: 700 }); txt(x, '3 × sorry: REFUNDED', 0, 24, { size: 26, color: GREEN }) })
    } },
  { sign: S, cap: 'Keeping the peace? | *Your side counts too.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const tilt = lerp(-1, 0, ease.inOutCubic(prog(lt, 0.9, 1.6)))
      scales(x, 770, 960, 0.8 * pop01(t, P.t0 + 0.2, 0.35, 2), tilt, 'THEM', 'YOU')
      tag(x, 790, 1130, pop01(t, P.t0 + 1.7, 0.3, 2.2), 'BALANCED: AT LAST', GOLD, 0.03, 30)
    } },
  { sign: S, cap: 'Your taste is | *genuinely great.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 790, 830, 320, 280, k, { bg: GOLD, rot: 0.02, border: 8 }, () => {
        x.fillStyle = DEEP; x.fillRect(-136, -116, 272, 232)
        x.fillStyle = PINK; x.beginPath(); x.arc(-40, -10, 60, 0, Math.PI * 2); x.fill()
        x.fillStyle = SKYB; x.fillRect(10, -60, 100, 120)
        x.fillStyle = MINT; x.fillRect(-110, 60, 220, 30)
      })
      tag(x, 790, 1060, pop01(t, P.t0 + 1.0, 0.3, 2.2), 'CURATED BY: LIBRA', LAV, -0.04, 32)
      sparkles(x, t, 790, 830, P.t0 + 1.2, 7, 180, 0.4)
    } },
  { sign: S, cap: 'Hosting everyone? | *Sit down. Eat first.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, CHAIR, { K: WOOD }, 760, 980, 26 * k)
      drawBits(x, PLATE, PLATE_C, 820, 820, 18 * pop01(t, P.t0 + 0.6, 0.35, 2))
      tag(x, 790, 670, pop01(t, P.t0 + 1.0, 0.3, 2.2), 'RESERVED: THE HOST', MINT, -0.04, 30)
      if (lt > 1.4) hearts(x, t, 380, 1000, P.t0 + 1.4 * 1.29, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 8 })
    } },
  { sign: S, cap: 'Disagree out loud. | *They’ll still like you.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'actually… | I disagree.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: BONE, tail: 'bl' })
      const f = pop01(t, P.t0 + 1.0, 0.35, 2)
      if (f > 0.01) signChar(x, t, 'aries', 800, 960, 150 * f, { mood: lt > 1.4 ? 'heart' : 'wide', seed: 64, glyph: false })
      tag(x, 790, 1120, pop01(t, P.t0 + 1.6, 0.3, 2.2), 'FRIENDSHIP: INTACT', PINK, 0.04, 32)
    } },
  { sign: S, cap: 'Over-reading the match? | *Just enjoy the date.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const fold = ease.inOutCubic(prog(lt, 1.0, 1.4))
      chart(x, 790, 790, 120, pop01(t, P.t0 + 0.2, 0.35, 2) * (1 - fold), t, 0.8)
      tag(x, 790, 650, pop01(t, P.t0 + 0.5, 0.3, 2.2) * (1 - fold), 'ANALYSIS: PAGE 9', BONE, -0.04, 30)
      bubble(x, 790, 790, 'having fun!', pop01(t, P.t0 + 1.4 * 1.29, 0.25, 2.2), { size: 44, col: MINT, tail: 'bl' })
      if (lt > 1.4) hearts(x, t, 790, 1000, P.t0 + 1.4 * 1.29, { n: 5, life: 1.8, spread: 220, cell: 7, seed: 6 })
    } },
  { sign: S, cap: 'Nine outfits later? | *The first one was it.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.floor(clamp(prog(lt, 0.2, 1.2)) * 8)
      const COLS = [PINK, SKYB, MINT, GOLD, LAV, ORANGE, '#ff8a7a', '#9aa5c4']
      for (let i = 0; i < n; i++) drawBits(x, SHIRT, { C: COLS[i] }, 700 + (i % 4) * 60, 1090 - Math.floor(i / 4) * 40, 12, { rot: (i % 3 - 1) * 0.3 })
      drawBits(x, SHIRT, { C: '#e23d4e' }, 790, 790, 22 * pop01(t, P.t0 + 1.3, 0.35, 2.4))
      tag(x, 790, 650, pop01(t, P.t0 + 1.5, 0.3, 2.2), 'OUTFIT #1: WINNER', GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'The mirror? | *That’s a good friend.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: { x: -200 }, hops: [1.0, 1.6],
    back(x, t, lt, P) { hearts(x, t, 390, 1000, P.t0 + 1.1, { n: 6, life: 2.0, spread: 300, cell: 8, seed: 7 }) },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k <= 0.01) return
      x.save(); x.translate(790, 860); x.scale(k, k)
      x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 150, 210, 0, 0, Math.PI * 2); x.fill()
      x.fillStyle = GOLD; x.beginPath(); x.ellipse(0, 0, 140, 200, 0, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#cfeeff'; x.beginPath(); x.ellipse(0, 0, 122, 182, 0, 0, Math.PI * 2); x.fill()
      x.restore()
      const r = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (r > 0.01) signChar(x, t, S, 790, 880, 170 * r * k, { mood: 'wink', seed: 66, glyph: false })
      bubble(x, 790, 1130, 'proud of you', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, col: PINK, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'r2a0267', key: 'F', accent: PINK, solo: S, ending: 'group',
  title: 'How to encourage | *a Libra.*',
  cameos: CAMEOS,
  group: { cap: 'Pick yourself. | *Every time.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
