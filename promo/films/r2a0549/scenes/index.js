// r2a0549: star_advice, ADVICE ROLLCALL, "What each sign | *overthinks.*" (signs3kit social cut, music: lofi · E).
// Twelve signs in zodiac order: the thing each one overthinks + a warm one-line reframe, with one light gag each.
// Ending: group.
//   ♈ was I too loud · ♉ plans changing · ♊ that "ok" text · ♋ did everyone eat · ♌ did the date go well · ♍ did I help
//   enough · ♎ are we compatible · ♏ what they really meant · ♐ missing out · ♑ taking a day off · ♒ fitting in
//   · ♓ everyone's feelings (yours count too)
//   group "Breathe. | *It’s probably fine.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, zzz, chart, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#c9a6ff', ST = { x: -160 }
const BOXES = (x, t, cx, cy, k) => {
  if (k <= 0.01) return
  for (let i = 0; i < 4; i++) { x.save(); x.translate(cx - 150 + i * 100, cy); x.scale(k, k); x.fillStyle = INK; x.fillRect(-36, -36, 72, 72); x.fillStyle = STEEL; x.fillRect(-30, -30, 60, 60); x.restore() }
}

const CAMEOS = [
  { sign: 'aries', cap: 'Was I too loud? | *You were fun.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'MEGA', 800, 850, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 0.3) swapLabel(x, 800, 1070, lt, 1.2, 'VOLUME: TOO MUCH?', 'VOLUME: JUST RIGHT', { size: 28 })
    } },
  { sign: 'taurus', cap: 'Plans changed? | *New can be cozy too.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 240, head: 'SATURDAY', headBg: GOLD, headInk: INK, lines: [lt > 1.0 ? ['plan B', '#2f9a4a'] : 'plan A'], size: 44 })
      L(x, 800, 1080, 'PLAN B: ALSO NICE', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: 'gemini', cap: 'They texted “ok.” | *It just means ok.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ MATCH', headCol: GOLD, lines: [['ok', BONE, pop01(t, P.t0 + 0.4, 0.25, 2.4)]], size: 40 })
      L(x, 800, 1100, 'TONE: FRIENDLY', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: 'cancer', cap: 'Did everyone eat? | *Yes. Now you eat.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'PLATE', 800, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1070, 'SAVED YOU A PLATE', pop01(t, P.t0 + 1.0, 0.3, 2.2), PINK, 0.04, 30)
      hearts(x, t, 800, 800, P.t0 + 1.3, { n: 4, life: 1.6, spread: 160, cell: 6, seed: 4 })
    } },
  { sign: 'leo', cap: 'Did the date go well? | *They texted already.*', mood: lt => lt > 1.1 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ MATCH', headCol: PINK, lines: [['had SO much', BONE, pop01(t, P.t0 + 0.9, 0.25, 2.4)], ['fun!! again?', BONE, pop01(t, P.t0 + 1.1, 0.25, 2.4)]], size: 26 })
      sparkles(x, t, 800, 820, P.t0 + 1.1, 8, 200, 0.2)
    } },
  { sign: 'virgo', cap: 'Did I help enough? | *You helped plenty.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 300, head: 'HELPED', headBg: MINT, headInk: INK, lines: ['☑ moved couch', '☑ made soup', '☑ listened'], size: 30, align: 'left', progress: clamp(lt / 1.2) })
      L(x, 800, 1100, 'ENOUGH ✓', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  { sign: 'libra', cap: 'Are we compatible? | *Kindness always is.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 800, 830, 130, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 800, 1060, 'MATCH: KIND HEARTS', pop01(t, P.t0 + 1.1, 0.3, 2.2), PINK, -0.04, 28)
      hearts(x, t, 800, 760, P.t0 + 1.2, { n: 4, life: 1.6, spread: 160, cell: 6, seed: 6 })
    } },
  { sign: 'scorpio', cap: 'What they really meant? | *They meant it kindly.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 820, 700, 'nice shoes!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      bits(x, 'LENS', 690, 920, 17 * pop01(t, P.t0 + 0.5, 0.3, 2))
      L(x, 820, 1080, 'HIDDEN MEANING: NONE', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, 0.04, 26)
    } },
  { sign: 'sagittarius', cap: 'Missing out? | *You’re right on time.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 850, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1070, 'YOUR TIMING: GOOD', pop01(t, P.t0 + 1.1, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: 'capricorn', cap: 'Taking a day off? | *Work will wait.*', mood: lt => lt > 1.1 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'LAPTOP', 800, 880, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { sy: lt > 0.9 ? 0.4 : 1 })
      if (lt > 1.1) zzz(x, t, 470, 720, { alpha: clamp((lt - 1.1) * 3), size: 44 })
      L(x, 800, 1080, 'OUT OF OFFICE', pop01(t, P.t0 + 1.0, 0.3, 2.2), MINT, 0.04, 34)
    } },
  { sign: 'aquarius', cap: 'Fitting in? | *Stand out instead.*', mood: lt => lt > 1.1 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      BOXES(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2))
      const k = pop01(t, P.t0 + 0.9, 0.35, 2)
      if (k > 0.01) { x.save(); x.translate(850, 860); x.scale(k, k); x.fillStyle = GOLD; x.fillRect(-34, -34, 68, 68); x.restore(); sparkles(x, t, 850, 860, P.t0 + 0.95, 7, 110, 0.3) }
      L(x, 800, 1060, 'ONE OF A KIND', pop01(t, P.t0 + 1.3, 0.3, 2.2), SKYB, -0.04, 32)
    } },
  { sign: 'pisces', cap: 'Everyone’s feelings? | *Yours count too.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], tears: lt => lt > 1.2 ? 2 : 3, star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) bits(x, 'HEARTB', 680 + (i % 3) * 110, 760 + Math.floor(i / 3) * 110, 10 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.25, 2.2))
      L(x, 840, 1060, 'YOURS ♥ COUNTS', pop01(t, P.t0 + 1.2, 0.3, 2.2), LAV, 0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0549', key: 'E', accent: ACC, ending: 'group',
  title: 'What each sign | *overthinks.*',
  cameos: CAMEOS,
  group: { cap: 'Breathe. | *It’s probably fine.*', moods: ['happy', 'happy', 'wink', 'heart', 'sparkle', 'happy', 'heart', 'happy', 'sparkle', 'sleepy', 'sparkle', 'heart'] },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
