// r2t0629: star_talk, ROLLCALL, "The signs | *at the post office.*" (signs3kit social cut, music: lofi · D).
// Ending: callback.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   one post-office trip per sign (3.8 s each):
//              ♈ waited forty seconds, delivered it themself · ♉ wrapped the gift, kept it · ♊ one letter, forty-page
//              P.S. · ♋ one care package, for everyone · ♌ bought stamps of their own face · ♍ redid the address
//              eleven times · ♎ charmed the clerk, it's a match · ♏ tracks the package every four minutes
//              · ♐ asked how much to ship themself · ♑ insured a postcard · ♒ mailed a letter to the year 2050
//              · ♓ got a postcard that says "hi", sobbed
//  49.2        "Twelve signs. | *One tired clerk.*"
//  52.6        callback: "Every letter in town | has *Leo's face* now."
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER } from '../../signs3kit.js'
import { L, sheet, phone, bits, swapLabel, confetti, RED, CREAM, STEEL, WOOD, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff9a4a', ST = { x: -170 }

/** a perforated postage stamp with a tiny Leo star on it */
function stamp(x, t, cx, cy, s, k, rot = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * s / 100, k * s / 100)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-56, -66, 124, 148)
  x.fillStyle = CREAM; x.fillRect(-62, -74, 124, 148)
  x.fillStyle = NIGHT; for (let i = 0; i < 6; i++) { x.beginPath(); x.arc(-52 + i * 21, -74, 6, 0, Math.PI * 2); x.arc(-52 + i * 21, 74, 6, 0, Math.PI * 2); x.fill() }
  x.fillStyle = '#ffb34a'; x.fillRect(-48, -58, 96, 96)
  // a tiny pixel star face
  x.fillStyle = GOLD; x.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 16 : 36; x.lineTo(Math.cos(a) * r, -10 + Math.sin(a) * r) } x.closePath(); x.fill()
  x.fillStyle = INK; x.fillRect(-12, -16, 7, 9); x.fillRect(5, -16, 7, 9)
  x.font = `800 20px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('LEO', 0, 56)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Waited forty seconds. | *Delivered it themself.*', mood: lt => lt > 1.0 ? 'wide' : 'squint', star: ST, hops: [1.0, 1.3, 1.6],
    front(x, t, lt, P) {
      const go = ease.inCubic(prog(lt, 1.1, 2.0))
      bits(x, 'BOX', lerp(800, 1100, go), 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: go * 0.4 })
      L(x, 800, 680, 'LINE: 3 PEOPLE', pop01(t, P.t0 + 0.3, 0.3, 2), STEEL, -0.04, 34)
      bubble(x, 800, 1090, 'i’ll RUN it there', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Wrapped the gift. | *Kept it.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: ST,
    front(x, t, lt, P) {
      const pull = ease.inOutCubic(prog(lt, 1.0, 1.5))
      bits(x, 'GIFT', lerp(800, 560, pull), lerp(900, 980, pull), 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 690, 'too nice to send.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 800, 1110, 'RETURN TO: ME', pop01(t, P.t0 + 1.8, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  { sign: 'gemini', cap: 'Sent one letter. | *Forty-page* P.S.', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.2) / 1.6) * 7)
      for (let i = 0; i < n; i++) bits(x, 'PAPERS', 800 + (i % 2 ? 12 : -12), 1120 - i * 52, 15, { rot: i % 2 ? 0.05 : -0.05 })
      L(x, 800, 640, `P.S. PAGE ${Math.min(40, n * 6)}`, pop01(t, P.t0 + 0.3, 0.3, 2), PINK, 0.05, 40)
    } },
  { sign: 'cancer', cap: 'One care package. | *For everyone.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const n = Math.min(9, 1 + Math.floor(Math.max(0, lt - 0.2) / 0.16))
      for (let i = 0; i < n; i++) bits(x, 'BOX', 690 + (i % 3) * 110, 1100 - Math.floor(i / 3) * 76, 9)
      L(x, 800, 680, 'BOXES: 52', pop01(t, P.t0 + 1.3, 0.3, 2.2), PINK, -0.04, 42)
      hearts(x, t, 800, 900, P.t0 + 1.5, { n: 4, life: 1.4, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Bought stamps | of *their own face.*', mood: 'sparkle', star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      stamp(x, t, 800, 850, 150, pop01(t, P.t0 + 0.3, 0.35, 2), 0.06)
      L(x, 800, 1090, 'LIMITED EDITION: ME', pop01(t, P.t0 + 1.2, 0.3, 2.2), '#ffb34a', -0.04, 28)
      sparkles(x, t, 800, 850, P.t0 + 0.9, 7, 180, 0.3)
    } },
  { sign: 'virgo', cap: 'Redid the address | *eleven times.*', mood: lt => lt > 1.8 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.2) / 1.6) * 10)
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, h: 220, head: `DRAFT ${n}`, headBg: '#5fd068', headInk: INK, lines: ['12 Star Lane', n < 11 ? 'hmm, crooked.' : ['PERFECT.', '#2f8a48']], size: 32 })
      bits(x, 'PEN', 820, 1060, 12 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: -0.3 })
    } },
  { sign: 'libra', cap: 'Charmed the clerk. | *It’s a match.*', mood: lt => lt > 1.2 ? 'heart' : 'wink', star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'STUB', 800, 960, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      L(x, 800, 690, '✦ NEW MATCH', pop01(t, P.t0 + 0.9, 0.3, 2), GOLD, -0.05, 40)
      hearts(x, t, 800, 900, P.t0 + 1.1, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 4 })
      L(x, 800, 1100, 'FREE STICKERS', pop01(t, P.t0 + 1.6, 0.3, 2.2), PINK, 0.04, 32)
    } },
  { sign: 'scorpio', cap: 'Tracks the package | *every four minutes.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.6) * 30)
      phone(x, t, 800, 880, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'TRACKING', headCol: '#b04ad0', lines: [['in transit', BONE, 1], ['still in transit', BONE, pop01(t, P.t0 + 0.9, 0.25, 2.2)], [`REFRESH #${n}`, GOLD, pop01(t, P.t0 + 0.5, 0.25, 2.2), true]], size: 20 })
    } },
  { sign: 'sagittarius', cap: 'Asked how much | to *ship themself.*', mood: 'sparkle', look: [-1, 0], star: { x: 150, y: 30 }, hops: [0.8, 1.4],
    back(x, t, lt, P) {},
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(690, 1040); x.scale(k, k); x.fillStyle = INK; x.fillRect(-170, -60, 340, 170); x.fillStyle = '#c98f5a'; x.fillRect(-160, -50, 320, 150); x.fillStyle = '#8a5a32'; x.fillRect(-160, -50, 320, 20); x.restore() }
      L(x, 330, 680, 'TO: ANYWHERE', pop01(t, P.t0 + 0.7, 0.3, 2), '#ff9a4a', -0.05, 36)
      L(x, 690, 1060, 'FRAGILE (KINDA)', pop01(t, P.t0 + 1.4, 0.3, 2.2), BONE, 0.04, 28)
    } },
  { sign: 'capricorn', cap: 'Insured a postcard. | *Twice.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 300, head: 'POSTCARD', headBg: STEEL, headInk: INK, lines: ['insured ✓', 'tracked ✓', 'signed for ✓', ['insured again ✓', RED]], size: 30, progress: clamp((lt - 0.4) / 1.3) })
      L(x, 800, 1110, 'MSG: “HI.”', pop01(t, P.t0 + 1.8, 0.3, 2.2), GOLD, -0.04, 34)
    } },
  { sign: 'aquarius', cap: 'Mailed a letter | to *the year 2050.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, -1], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 230, head: 'DEAR FUTURE', headBg: '#3a8ad0', lines: ['are we cool', 'yet? :)'], size: 32, rot: 0.05 })
      L(x, 800, 1080, 'DELIVER: 2050', pop01(t, P.t0 + 1.1, 0.3, 2.2), SKYB, -0.04, 38)
    } },
  { sign: 'pisces', cap: 'Got a postcard. | It said “hi.” *Sobbed.*', mood: 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 200, head: 'POSTCARD', headBg: SKYB, headInk: INK, lines: ['hi! :)'], size: 44, rot: 0.06 })
      L(x, 800, 1090, 'TISSUES: ALL', pop01(t, P.t0 + 1.4, 0.3, 2.2), LAV, -0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2t0629', key: 'D', accent: ACC, ending: 'callback',
  title: 'The signs | *at the post office.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *One tired clerk.*' },
  last: {
    text: 'Every letter in town | has *Leo’s face* now.',
    draw(x, t, lt) {
      for (let i = 0; i < 5; i++) stamp(x, t, 240 + i * 150, 1330 + (i % 2 ? -30 : 30), 120, pop01(t, t - lt + 0.5 + i * 0.12, 0.35, 2), (i - 2) * 0.08)
      sparkles(x, t, 540, 1330, t - lt + 1.2, 8, 300, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
