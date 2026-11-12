// r2t0722: THE SIGNS AS… v3 SOLO (pisces), "Pisces on a day off | be like." (signs3kit social cut, lofi · E).
// One sign the whole way: nine extreme Pisces day-off moments, tears in every card. Ending: callback.
//   slept till 2 p.m., cried (so rested) · cried at a bird · the painting is already sad · the bath, now a mermaid
//   · cancelled own plans, relieved · one daydream became a trilogy · sobbed for the cartoon villain
//   · read their horoscope, felt seen · Sunday 6 p.m., grieving the weekend
//   group "Did nothing. | *Felt everything.*"
//   last "The bird came back. | *Pisces: in pieces.*" (the bird from card 2 lands again; the tears return)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, friend, bits, swapLabel, zzz, steam, soap, chart, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#b7a6ff', S = 'pisces', ST = { x: -190 }
const THINK = (x, cx, cy, k, text) => {
  if (k <= 0.01) return
  bits(x, 'CLOUD', cx, cy, 30 * k)
  x.save(); x.fillStyle = INK; x.font = "800 46px Inter, Arial, sans-serif"; x.textAlign = "center"; x.textBaseline = "middle"; x.globalAlpha = clamp(k); x.fillText(text, cx, cy + 8); x.restore()
  x.save(); x.fillStyle = STEEL; x.fillRect(cx - 150, cy + 100, 22, 22); x.fillRect(cx - 190, cy + 140, 14, 14); x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Slept till 2 p.m. | Cried. *So rested.*', mood: lt => lt > 1.0 ? 'wide' : 'sleepy', tears: lt => lt > 1.0 ? 2 : 0, star: ST,
    front(x, t, lt, P, F) {
      bits(x, 'CLOCK', 800, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt < 1.0) zzz(x, t, F.x + 70, F.top - 10, { size: 46 })
      L(x, 800, 650, '2:00 P.M.', pop01(t, P.t0 + 0.4, 0.3, 2.2), LAV, -0.05, 40)
      bubble(x, 800, 1090, 'i feel so… | rested', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Opened the window. | Cried *at a bird.*', mood: lt => lt > 0.9 ? 'wide' : 'happy', tears: lt => lt > 0.9 ? 3 : 1, look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const hop = Math.abs(Math.sin(t * 6)) * 10
      bits(x, 'BIRD', 800, 820 - hop, 16 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 840, 650, 'tweet', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, tail: 'bc' })
      L(x, 800, 1060, 'IT LOOKED SO FREE', pop01(t, P.t0 + 1.2, 0.3, 2.2), SKYB, 0.04, 32)
    } },
  { sign: S, cap: 'Started a painting. | It’s *already sad.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', tears: 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CANVAS', 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04 })
      L(x, 800, 650, 'MY HAPPY PAINTING', pop01(t, P.t0 + 0.4, 0.3, 2.2), GOLD, -0.04, 30)
      swapLabel(x, 800, 1130, lt, 1.3, 'TITLE: “JOY”', 'TITLE: “WHY”', { size: 34, fromBg: MINT, toBg: STEEL })
    } },
  { sign: S, cap: 'Got in the bath. | *Became the ocean.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', tears: 1, star: { x: -150, y: -40 },
    back(x, t, lt, P) {
      bits(x, 'TUB', 400, 1040, 30 * pop01(t, P.t0 + 0.1, 0.3, 2))
      soap(x, t, 420, 960, { n: 7, spread: 380, r: 24, h: 300, seed: 3 })
    },
    front(x, t, lt, P) {
      swapLabel(x, 790, 660, lt, 1.2, 'HOUR 1', 'HOUR 4', { size: 38, fromBg: SKYB, toBg: LAV })
      bubble(x, 800, 860, 'i live here | now', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Cancelled their own plans. | *Relief tears.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', tears: lt => lt > 1.2 ? 2 : 0, star: ST,
    front(x, t, lt, P) {
      bits(x, 'DOORX', 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      swapLabel(x, 800, 650, lt, 0.9, 'PLANS: 7 P.M.', 'CANCELLED (BY ME)', { size: 32, fromBg: GOLD, toBg: MINT })
      hearts(x, t, 560, 800, P.t0 + 1.4, { n: 4, life: 1.6, spread: 120, cell: 7, seed: 6 })
    } },
  { sign: S, cap: 'Daydreamed once. | Now it’s *a trilogy.*', mood: 'sparkle', tears: 1, look: [1, -1], star: { x: -190, y: 60 },
    front(x, t, lt, P) {
      const n = Math.min(3, 1 + Math.floor(Math.max(0, lt - 0.4) / 0.55))
      THINK(x, 780, 700, pop01(t, P.t0 + 0.3, 0.35, 2), `PART ${n}`)
      L(x, 800, 1080, 'THE MAKING-OF: NEXT', pop01(t, P.t0 + 1.7, 0.3, 2.2), PINK, -0.04, 28)
    } },
  { sign: S, cap: 'Watched one cartoon. | *Sobbed* for the villain.', mood: lt => lt > 1.0 ? 'wide' : 'neutral', tears: lt => lt > 1.0 ? 3 : 1, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'TV', 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 650, 'THE BAD GUY', pop01(t, P.t0 + 0.4, 0.3, 2.2), STEEL, -0.04, 34)
      bubble(x, 800, 1090, 'he just wanted | a friend!!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Read their horoscope. | *Felt seen.* Cried.', mood: lt => lt > 1.3 ? 'heart' : 'wide', tears: 2, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 800, 860, 140, pop01(t, P.t0 + 0.2, 0.35, 2), t * 0.3)
      L(x, 800, 650, 'TODAY: REST', pop01(t, P.t0 + 0.5, 0.3, 2.2), LAV, -0.04, 34)
      L(x, 800, 1090, 'HOW DID IT KNOW', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 32)
      sparkles(x, t, 800, 860, P.t0 + 1.3, 7, 140, 0.5)
    } },
  { sign: S, cap: 'Sunday, 6 p.m. | *Grieving the weekend.*', mood: lt => lt > 1.0 ? 'wide' : 'neutral', tears: lt => lt > 1.0 ? 3 : 1, star: ST,
    front(x, t, lt, P) {
      bits(x, 'CAL', 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 650, 'TOMORROW: MONDAY', pop01(t, P.t0 + 0.4, 0.3, 2.2), STEEL, -0.04, 32)
      bubble(x, 800, 1100, 'it was so | beautiful', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0722', key: 'E', accent: ACC, solo: S, ending: 'callback',
  title: 'Pisces on a day off | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Did nothing. | *Felt everything.*', mood: 'heart' },
  last: {
    text: 'The bird came back. | *Pisces: in pieces.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.4, 0.4, 2)
      if (k > 0.01) signChar(x, t, S, 420, 1060, 300 * k, { mood: lt > 1.4 ? 'wide' : 'sparkle', look: [1, -1], seed: 88, glyph: false, tears: lt > 1.4 ? 3 : 1 })
      const fly = ease.outCubic(clamp((lt - 0.6) / 0.8))
      bits(x, 'BIRD', lerp(1100, 740, fly), lerp(700, 900, fly) - (fly < 1 ? 0 : Math.abs(Math.sin(t * 6)) * 10), 18)
      bubble(x, 760, 760, 'tweet', pop01(t, t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bc' })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
