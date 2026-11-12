// r2t0723: THE SIGNS AS… v3 BE LIKE, "Zodiacs when cozy | be like." (the batch hook "Zodiacs when they're cozy", trimmed to fit two lines) (~57 s vertical, signs3kit social cut, lofi · G)
// Twelve signs getting cozy, each pushed to the extreme. Ending: callback.
//   ♈ cozy for six minutes, now jogging · ♉ under three blankets, unreachable till spring · ♊ cozy night in, on three calls
//   · ♋ made soup for the whole street · ♌ cozy robe, still wearing the crown · ♍ colour-coded the blanket pile
//   · ♎ one candle, moved nine times · ♏ fully burritoed, only eyes left · ♐ cozy night in, camping abroad
//   · ♑ cozy time scheduled 7:00–7:15 · ♒ the cozy corner has a control panel · ♓ rain on the window, happy-cried
//   group "Peak cozy. | *Zero plans.*"
//   last "Taurus? | *See you in spring.*" (the blanket heap comes back, now snowed on)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, zzz, steam, rain, B, C, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff9a8a', ST = { x: -170 }, SR = { x: 160 }
const BLK = (x, cx, cy, cell, col, o = {}) => drawBits(x, B.BLANKET, { L: col, P: BONE }, cx, cy, cell, o)
function snow(x, t, cx, cy, { w = 700, h = 500, n = 16, alpha = 1 } = {}) {
  for (let i = 0; i < n; i++) {
    const ph = ((t * 0.25 + i / n + i * 0.13) % 1 + 1) % 1
    drawBits(x, B.SNOW, C.SNOW, cx - w / 2 + ((i * 97) % w) + Math.sin(ph * 6 + i) * 20, cy - h / 2 + ph * h, 5, { alpha: alpha * Math.sin(Math.PI * ph) })
  }
}

const CAMEOS = [
  { sign: 'aries', cap: 'Cozy for six minutes. | *Now jogging.*', mood: lt => lt > 1.0 ? 'sparkle' : 'sleepy', star: ST, hops: [1.1, 1.5, 1.9],
    front(x, t, lt, P) {
      BLK(x, 800, 1060, 22 * pop01(t, P.t0 + 0.15, 0.3, 2) * (1 - clamp((lt - 1.0) / 0.3) * 0.0), PINK, { rot: lt > 1.0 ? 0.3 : 0 })
      swapLabel(x, 800, 700, lt, 0.9, 'COZY: ON', 'COZY: DONE', { size: 38, fromBg: PINK, toBg: GOLD })
      bits(x, 'SHOE', 800, 880, 14 * pop01(t, P.t0 + 1.2, 0.3, 2.2))
    } },
  { sign: 'taurus', cap: 'Under three blankets. | *Unreachable till spring.*', mood: 'sleepy', star: { x: -170, y: 40 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      for (let i = 0; i < 3; i++) BLK(x, F.x, F.cy + 250 - i * 30 * clamp((lt - 0.2 - i * 0.3) / 0.3), 24 * k * (i ? clamp((lt - 0.2 - i * 0.3) / 0.25) : 1), [LAV, MINT, GOLD][i])
      zzz(x, t, F.x + 60, F.top - 20, { size: 44 })
      L(x, 790, 720, 'DO NOT DISTURB', pop01(t, P.t0 + 0.8, 0.3, 2.2), CREAM, 0.04, 32)
      L(x, 790, 1020, 'UNTIL: APRIL', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: 'gemini', cap: 'Cozy night in. | *On three calls.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.6) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      phone(x, t, 800, 880, 1.2 * k, { head: 'CALLS: 3', headCol: GOLD, size: 26, lines: [['libra', PINK, pop01(t, P.t0 + 0.5, 0.25, 2.2)], ['leo', '#ffb34a', pop01(t, P.t0 + 0.8, 0.25, 2.2)], ['mom', SKYB, pop01(t, P.t0 + 1.1, 0.25, 2.2)]] })
      bubble(x, 560, 640, 'and THEN…', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Made soup. | For *the whole street.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) bits(x, 'BOWL', 800 + (i % 2 ? 70 : -70), 1060 - Math.floor(i / 2) * 110 - (i % 2) * 10, 13 * pop01(t, P.t0 + 0.3 + i * 0.25, 0.3, 2))
      steam(x, t, 800, 820, { n: 3, alpha: 0.7, h: 110 })
      L(x, 800, 660, 'SERVES: 40', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 36)
    } },
  { sign: 'leo', cap: 'Cozy robe on. | *Crown stays on.*', mood: 'sparkle', star: ST,
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.5, 0.3, 2.2)
      bits(x, 'CROWN', F.x, F.top - 30, 14 * k, { rot: -0.08 })
      sparkles(x, t, F.x, F.top - 30, P.t0 + 0.6, 6, 110, 0.3)
      L(x, 790, 760, 'LOUNGEWEAR: ROYAL', pop01(t, P.t0 + 0.9, 0.3, 2.2), '#ffb34a', 0.04, 30)
      bubble(x, 790, 960, 'relaxing… | regally', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Colour-coded | *the blanket pile.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const COLS = ['#ff6b5a', '#ffb34a', GOLD, MINT, SKYB, LAV]
      for (let i = 0; i < 6; i++) BLK(x, 800, 1080 - i * 70, 15 * pop01(t, P.t0 + 0.2 + i * 0.14, 0.3, 2), COLS[i])
      L(x, 800, 620, 'SOFT → SOFTEST', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: 'libra', cap: 'Lit one candle. | *Moved it nine times.*', mood: lt => lt > 1.8 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(9, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.22))
      const pos = [[700, 980], [880, 980], [790, 900], [700, 900], [880, 1040], [760, 1040], [840, 920], [720, 1000], [800, 980]][n - 1]
      bits(x, 'CANDLE', pos[0], pos[1], 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 680, `SPOT #${n}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), PINK, -0.04, 38)
    } },
  { sign: 'scorpio', cap: 'Fully burritoed. | *Only eyes left.*', mood: 'neutral', look: [1, 0], star: { x: -150 },
    front(x, t, lt, P, F) {
      const k = clamp((lt - 0.3) / 0.4)
      if (k > 0.01) {
        x.save(); x.globalAlpha = k
        BLK(x, F.x, F.cy + 125, 27, '#7a3fb0')
        BLK(x, F.x, F.cy - 165, 27, '#7a3fb0', { sy: -1 })
        x.restore()
      }
      L(x, 800, 1040, 'DO NOT ASK', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, -0.04, 36)
      bubble(x, 800, 720, '…', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 56, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Cozy night in? | *Camping. Abroad.*', mood: 'sparkle', star: SR, hops: [0.6],
    front(x, t, lt, P) {
      bits(x, 'TENT', 320, 1010, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 320, 760, 'IN: THE MOUNTAINS', pop01(t, P.t0 + 0.6, 0.3, 2.2), GOLD, -0.05, 30)
      bubble(x, 330, 620, 'cozy is a | mindset', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Scheduled cozy time. | *7:00 to 7:15.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [-1, 0], star: SR,
    front(x, t, lt, P) {
      sheet(x, 320, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 330, head: 'TONIGHT', headBg: '#2fc79a', headInk: INK, lines: ['6:45 work', '7:00 COZY', '7:15 work', '7:30 work'], size: 30, align: 'left' })
      L(x, 320, 1110, 'COZY: ON TIME', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, -0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Their cozy corner | *has a control panel.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'GADGET', 800, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      swapLabel(x, 800, 680, lt, 1.1, 'WARMTH: 1', 'WARMTH: MAX', { size: 36, fromBg: SKYB, toBg: '#ff6b5a' })
      bubble(x, 800, 1110, 'built it myself', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, col: MINT, tail: 'bc' })
    } },
  { sign: 'pisces', cap: 'Rain on the window. | *Happy-cried* an hour.', mood: lt => lt < 0.9 ? 'sparkle' : 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'CLOUD', 800, 700, 22 * k)
      if (k > 0.9) rain(x, t, 800, 760, { w: 240, h: 260, n: 9 })
      L(x, 800, 1100, 'SO… PRETTY', pop01(t, P.t0 + 1.2, 0.3, 2.2), LAV, 0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2t0723', key: 'G', accent: ACC, ending: 'callback',
  title: 'Zodiacs when cozy | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Peak cozy. | *Zero plans.*' },
  last: {
    text: 'Taurus? | *See you in spring.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.4, 2)
      if (k <= 0.01) return
      signChar(x, t, 'taurus', 540, 1040, 300 * k, { mood: 'sleepy', seed: 88, glyph: false })
      for (let i = 0; i < 3; i++) BLK(x, 540, 1290 - i * 32, 30 * k, [LAV, MINT, GOLD][i])
      zzz(x, t, 610, 870, { size: 50 })
      snow(x, t, 540, 1000, { alpha: clamp((lt - 0.8) / 0.5) })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
