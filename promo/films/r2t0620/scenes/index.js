// r2t0620: star_talk, SOLO (libra), "Libras on a first date | *be like.*" (signs3kit social cut, music: lofi · F).
// One sign the whole way: nine first-date moments, each pushed to the most extreme (and lovable) Libra version.
//   picked the restaurant after three hours · outfit poll to twelve friends · ordered what you ordered · complimented
//   the waiter, the chairs, the lighting · checked your sign's compatibility · agreed with every opinion · split the bill
//   to the cent · moved tables twice for the lighting · second date? "maybe… yes!"
// Ending: card. Lesson "Date a Libra. | *Life gets lovely.*" DATE: CHARMING, then "Perfect match: | *someone decisive.*" over the match card Libra + Aries (Aries decides in a second: the three-hour restaurant choice, paid off).
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, label, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, bits, friend, swapLabel, chart, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8fb1', S = 'libra', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'Picked the restaurant. | *After three hours.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MAP', 800, 820, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 650, `OPTIONS: ${Math.min(41, 2 + Math.floor(lt * 30))}`, pop01(t, P.t0 + 0.3, 0.3, 2), STEEL, 0.04, 34)
      L(x, 800, 1040, 'CHOSEN: THE FIRST ONE', pop01(t, P.t0 + 1.5 * 1.29, 0.3, 2.2), MINT, -0.04, 28)
    } },
  { sign: S, cap: 'Outfit check? | *Polled twelve friends.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'OUTFIT POLL', headCol: PINK, lines: [['pink: 6', PINK, pop01(t, P.t0 + 0.6, 0.25, 2)], ['lilac: 6', LAV, pop01(t, P.t0 + 0.9, 0.25, 2)], ['…a tie??', BONE, pop01(t, P.t0 + 1.4, 0.25, 2), true]], size: 26 })
    } },
  { sign: S, cap: 'Ordered what you ordered. | *Just to be fair.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'PLATE', 710, 900, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'PLATE', 870, 900, 16 * pop01(t, P.t0 + 0.6, 0.3, 2))
      bubble(x, 800, 700, 'same, please!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 42, tail: 'bl' })
      L(x, 800, 1060, 'BALANCE: RESTORED', pop01(t, P.t0 + 1.5 * 1.29, 0.3, 2.2), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Complimented the waiter. | *And the chairs.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      ;[['love your shirt!', 0.2, 680], ['great chairs!', 0.8, 840], ['the LIGHTING!', 1.4, 1000]].forEach(([w, a, y], i) => bubble(x, 800 + (i % 2 ? 30 : -10), y, w, pop01(t, P.t0 + a, 0.25, 2.2), { size: 36, col: [BONE, PINK, GOLD][i], tail: 'bl' }))
    } },
  { sign: S, cap: 'Asked your sign. | *Checked compatibility.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 800, 830, 130, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      bubble(x, 800, 640, 'what’s your sign?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 800, 1060, 'COMPATIBLE: VERY', pop01(t, P.t0 + 1.5 * 1.29, 0.3, 2.2), PINK, -0.04, 34)
    } },
  { sign: S, cap: 'Agreed with every opinion. | *Even socks with sandals.*', mood: lt => lt > 1.3 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 820, 690, 'socks with | sandals?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: STEEL, tail: 'br' })
      bubble(x, 760, 900, 'TOTALLY!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 50, col: PINK, tail: 'bl' })
      L(x, 800, 1080, 'OPINION: YOURS', pop01(t, P.t0 + 1.5 * 1.29, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Split the bill. | *To the exact cent.*', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 340, head: 'THE BILL', headBg: ACC, headInk: INK, lines: ['total: $42.18', '÷ 2', 'you: $21.09', 'me: $21.09'], size: 32, align: 'left', progress: prog(lt, 0.3, 1.4) })
      L(x, 800, 1090, 'PERFECTLY EVEN', pop01(t, P.t0 + 1.7 * 1.29, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Moved tables twice. | *Better lighting.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [0.7, 1.4],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2), g = clamp((lt - 1.3) / 0.4)
      if (g > 0) { x.save(); x.globalAlpha = 0.25 * g; x.fillStyle = '#ffe7a8'; x.beginPath(); x.moveTo(760, 700); x.lineTo(840, 700); x.lineTo(960, 1100); x.lineTo(640, 1100); x.closePath(); x.fill(); x.restore() }
      bits(x, 'LAMP', 800, 690, 18 * k)
    },
    front(x, t, lt, P) {
      L(x, 800, 1060, `TABLE #${lt < 0.9 ? 4 : lt < 1.5 ? 9 : 12}`, pop01(t, P.t0 + 0.4, 0.3, 2), STEEL, -0.04, 38)
    } },
  { sign: S, cap: 'Second date? | *“Maybe… yes!”*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: lt => lt > 1.4 ? [1, 0] : [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST, hops: [1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      swapLabel(x, 800, 820, lt, 1.3, 'MAYBE? HMM…', 'YES!', { size: 64, fromBg: STEEL, toBg: PINK })
      hearts(x, t, 800, 1000, P.t0 + 1.8 * 1.29, { n: 6, life: 1.8, spread: 260, cell: 8, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'r2t0620', key: 'F', accent: ACC, solo: S, ending: 'card',
  title: 'Libras on a first date | *be like.*',
  cameos: CAMEOS,
  card: { a: 'libra', b: 'aries', chip: 'IT’S A MATCH' },
  group: { cap: 'Charming. Fair. | *Still deciding.*', mood: 'heart' },
  lesson: { text: 'Date a Libra. | *Life gets lovely.*', chip: 'DATE: CHARMING' },
  last: { text: 'Perfect match: | *someone decisive.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
