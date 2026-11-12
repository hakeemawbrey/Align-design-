// r2t0436: star_talk, ROLL CALL, "The signs | get *ice cream.*" (signs3kit social cut, music: lofi · C). Ending: lesson.
//   twelve signs at the ice cream counter, each at its most extreme:
//   ♈ ordered before the door closed · ♉ tasted every flavour, ordered vanilla · ♊ a cone in each hand · ♋ matching cones
//   with their match · ♌ the sundae wore a crown · ♍ twelve napkins, zero drips · ♎ still choosing, shop closed
//   · ♏ knows the secret menu · ♐ tried pickle ripple · ♑ the loyalty card, one stamp off · ♒ picked a flavour by birth chart
//   · ♓ the scoop melted, so did Pisces
//  49.2   "Brain freeze. | *Worth it.*"   52.4 LESSON: "Life is short. | Get the *extra scoop.*"  SPRINKLES: ADDED
//  58.3   "Libra’s order? | *Pending.*"
import {
  makeFilm, sparkles, hearts, bubble, label, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import {
  L, at, sheet, clock, chartWheel, buddy, drawBits, clamp, prog, ease, lerp,
  CONE, coneCols, CROWN, CROWN_C, BOWL, BOWL_C, RED, CREAM, ORANGE, TEAL, WOOD, GREEN, BROWN, GREY,
} from './props.js'

const VAN = '#fff1c8', CHOC = '#8a5a3a', MINTC = '#9ff0c8', BERRY = '#ff6f9f'
/** a tray of little tasting spoons appearing one by one */
function spoons(x, cx, cy, n, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-176, -20, 352, 40); x.fillStyle = WOOD; x.fillRect(-170, -14, 340, 28)
  const C = [BERRY, CHOC, MINTC, ORANGE, LAV, VAN, SKYB, GREEN]
  for (let i = 0; i < n; i++) {
    const px = -150 + (i % 8) * 43, py = -46 - Math.floor(i / 8) * 46
    x.fillStyle = INK; x.fillRect(px - 2, py - 2, 18, 40); x.fillStyle = C[i % 8]; x.fillRect(px, py, 14, 14); x.fillStyle = '#e8e0ff'; x.fillRect(px + 4, py + 14, 6, 22)
  }
  x.restore()
}
/** a pixel sundae glass */
function sundae(x, cx, cy, cell, k) {
  const BM = ['....RR....', '...WWWW...', '..PPPPPP..', '.CCCCCCCC.', 'GGGGGGGGGG', '.GVVVVVVG.', '..GVVVVG..', '...GGGG...', '....GG....', '....GG....', '..GGGGGG..']
  drawBits(x, BM, { R: RED, W: CREAM, P: BERRY, C: CHOC, G: '#cfe8ff', V: VAN }, cx, cy, cell * k)
}
/** a shop door sign */
function doorSign(x, cx, cy, k, text, bg = RED) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.06 * Math.sin(cx)); x.scale(k, k)
  x.strokeStyle = INK; x.lineWidth = 5; x.beginPath(); x.moveTo(-60, -70); x.lineTo(0, -120); x.lineTo(60, -70); x.stroke()
  x.fillStyle = INK; x.fillRect(-150, -76, 300, 132); x.fillStyle = bg; x.fillRect(-142, -68, 284, 116)
  x.fillStyle = CREAM; x.font = `800 58px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, -8)
  x.restore()
}
/** a loyalty card with stamps */
function loyalty(x, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-172, -102, 352, 220)
  x.fillStyle = INK; x.fillRect(-182, -112, 364, 224); x.fillStyle = CREAM; x.fillRect(-174, -104, 348, 208)
  x.fillStyle = PINK; x.fillRect(-174, -104, 348, 50); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SCOOP CLUB', 0, -78)
  for (let i = 0; i < 10; i++) {
    const px = -132 + (i % 5) * 66, py = -14 + Math.floor(i / 5) * 66
    x.fillStyle = INK; x.fillRect(px - 26, py - 26, 52, 52); x.fillStyle = '#efe6d6'; x.fillRect(px - 22, py - 22, 44, 44)
    if (i < n) drawBits(x, CONE, coneCols(BERRY), px, py, 3.6)
  }
  x.restore()
}
/** a puddle that grows under a melting cone */
function puddle(x, cx, cy, w, col) {
  if (w <= 1) return
  x.fillStyle = INK; x.beginPath(); x.ellipse(cx, cy, w + 6, w * 0.28 + 6, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = col; x.beginPath(); x.ellipse(cx, cy, w, w * 0.28, 0, 0, Math.PI * 2); x.fill()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Ordered before | the door *closed.*', mood: 'wide', look: [1, 0], star: { x: -170 }, hops: [0.4, 0.9],
    front(x, t, lt, P) {
      bubble(x, 780, 660, 'ONE SCOOP. | NOW.', at(t, P, 0.2, 0.25), { size: 46, col: '#ff8a7a', tail: 'bl' })
      drawBits(x, CONE, coneCols(BERRY), 790, 930, 26 * at(t, P, 0.9))
      L(x, 790, 1150, 'ORDER #1 (OF 1)', at(t, P, 1.5), GOLD, 0.04, 30)
    } },
  { sign: 'taurus', cap: 'Tasted every flavour. | Ordered *vanilla.*', mood: lt => lt > 1.5 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      spoons(x, 780, 760, Math.floor(clamp(lt / 1.3) * 16), at(t, P, 0.1))
      if (lt > 1.4) drawBits(x, CONE, coneCols(VAN), 780, 960, 22 * at(t, P, 1.8))
      L(x, 780, 1160, 'SAMPLES: ALL OF THEM', at(t, P, 1.2), MINT, -0.04, 30)
    } },
  { sign: 'gemini', cap: 'Two cones. | One for *each twin.*', mood: lt => lt > 1 ? 'wink' : 'sparkle', star: { x: 0, y: -10 }, hops: [1.0],
    front(x, t, lt, P, F) {
      drawBits(x, CONE, coneCols(MINTC), F.x - 230, F.cy + 30, 20 * at(t, P, 0.25), { rot: -0.2 })
      drawBits(x, CONE, coneCols(CHOC), F.x + 230, F.cy + 30, 20 * at(t, P, 0.55), { rot: 0.2 })
      L(x, 540, 610, 'MINT? CHOC? YES.', at(t, P, 1.2), GOLD, -0.03, 32)
    } },
  { sign: 'cancer', cap: 'Got their match | the *same flavour.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P, F) {
      drawBits(x, CONE, coneCols(BERRY), F.x + 140, F.cy + 40, 16 * at(t, P, 0.2), { rot: 0.15 })
      const B = buddy(x, t, 'scorpio', 790, 930, 220, at(t, P, 0.45), { mood: lt > 1.3 ? 'heart' : 'happy', look: [-1, 0], seed: 41 })
      if (B) drawBits(x, CONE, coneCols(BERRY), 790 - 100, 980, 13 * at(t, P, 0.9), { rot: -0.15 })
      L(x, 600, 640, 'MATCHING CONES ♡', at(t, P, 1.3), PINK, -0.04, 32)
      hearts(x, t, 600, 820, P.t0 + 1.4, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Their sundae | wore a *crown.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      sundae(x, 790, 940, 22, at(t, P, 0.2))
      const d = ease.outCubic(prog(lt, 0.7, 1.2))
      if (lt > 0.65) drawBits(x, CROWN, CROWN_C, 790, lerp(520, 760, d), 14)
      sparkles(x, t, 790, 760, P.t0 + 1.3, 7, 150, 0.4)
      L(x, 790, 1170, 'THE ROYAL SCOOP', at(t, P, 1.5), GOLD, 0.04, 30)
    } },
  { sign: 'virgo', cap: 'Twelve napkins. | *Zero drips.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.2) / 1.1) * 12)
      for (let i = 0; i < n; i++) { const px = 700 + (i % 3) * 90, py = 1060 - Math.floor(i / 3) * 26; x.fillStyle = INK; x.fillRect(px - 44, py - 14, 88, 26); x.fillStyle = CREAM; x.fillRect(px - 40, py - 10, 80, 18) }
      drawBits(x, CONE, coneCols(VAN), 790, 800, 20 * at(t, P, 0.2))
      L(x, 790, 610, 'DRIPS: 0', at(t, P, 1.4), MINT, -0.05, 40)
    } },
  { sign: 'libra', cap: 'Still choosing. | The shop *closed.*', mood: lt => lt > 1.5 ? 'wide' : 'squint', look: lt => [Math.sin(lt * 5) > 0 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'hmm… or…', at(t, P, 0.2, 0.25), { size: 42, tail: 'bl' })
      if (lt > 1.2) doorSign(x, 790, 980, at(t, P, 1.6, 0.35, 2.4), 'CLOSED')
      else drawBits(x, BOWL, BOWL_C, 790, 960, 18 * at(t, P, 0.4))
    } },
  { sign: 'scorpio', cap: 'Knows the | *secret menu.*', mood: lt => lt > 1 ? 'wink' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 660, '“the usual.”', at(t, P, 0.2, 0.25), { size: 42, col: '#d8b8ff', tail: 'bl' })
      sheet(x, 790, 940, at(t, P, 0.7), { w: 300, h: 260, head: 'OFF-MENU', headCol: '#b07bff', rows: [['MIDNIGHT', INK], ['DARK MATTER', INK], ['???', '#6b62a8']], size: 28, rot: 0.04 })
    } },
  { sign: 'sagittarius', cap: 'Tried the | *pickle flavour.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, CONE, coneCols('#9ad84a', '#d8f0a0'), 790, 900, 24 * at(t, P, 0.2), { rot: 0.08 })
      L(x, 790, 640, 'PICKLE RIPPLE', at(t, P, 0.6), '#9ad84a', -0.04, 34)
      bubble(x, 790, 1150, '10/10. again!', at(t, P, 1.3, 0.25), { size: 38, tail: 'bc' })
    } },
  { sign: 'capricorn', cap: 'Loyalty card. | *One stamp* from free.', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      loyalty(x, 790, 860, at(t, P, 0.2), Math.min(9, Math.floor(clamp((lt - 0.4) / 1) * 9)))
      L(x, 790, 1100, 'VISIT 9. TODAY.', at(t, P, 1.5), SKYB, 0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Picked a flavour | by *birth chart.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      chartWheel(x, t, 790, 820, at(t, P, 0.2), 130)
      L(x, 790, 1060, 'CHART SAYS: MINT', at(t, P, 1.2), MINTC, -0.04, 32)
      sparkles(x, t, 790, 820, P.t0 + 1.2, 6, 160, 0.9)
    } },
  { sign: 'pisces', cap: 'The scoop melted. | So did *Pisces.*', mood: 'wide', tears: lt => lt < 0.9 ? 1 : 3, look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      const m = clamp((lt - 0.3) / 1.6)
      drawBits(x, CONE, coneCols(LAV), 790, 880 + m * 40, 22 * at(t, P, 0.15), { sy: 1 - m * 0.35 })
      puddle(x, 790, 1050, 40 + m * 110, LAV)
      L(x, 790, 640, 'TOO BEAUTIFUL TO EAT', at(t, P, 1.4), LAV, 0.04, 28)
    } },
]

const F = makeFilm({
  id: 'r2t0436', key: 'C', accent: BERRY, ending: 'lesson',
  title: 'The signs | get *ice cream.*',
  cameos: CAMEOS,
  group: {
    cap: 'Brain freeze. | *Worth it.*',
    moods: ['wide', 'heart', 'wink', 'heart', 'sparkle', 'happy', 'squint', 'wink', 'sparkle', 'happy', 'sparkle', 'wide'],
    draw(x, t, lt) {
      for (let i = 0; i < 5; i++) drawBits(x, CONE, coneCols([BERRY, MINTC, CHOC, VAN, LAV][i]), 220 + i * 160, 700 + 14 * Math.sin(t * 3 + i), 14 * pop01(t, t - lt + 1.2 + i * 0.08, 0.3, 2.2), { rot: (i - 2) * 0.1 })
    },
  },
  lesson: { text: 'Life is short. | Get the *extra scoop.*', chip: 'SPRINKLES: ADDED' },
  last: { text: 'Libra’s order? | *Pending.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
