// r2t0621: star_talk, ROLLCALL, "The signs when | *spring starts.*" (signs3kit social cut, music: lofi · C).
// Ending: lesson.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   one first-day-of-spring moment per sign (3.8 s each):
//              ♈ one sunbeam, shorts on (it's 4°) · ♉ a picnic for one, six sandwiches · ♊ outfit nine by 9 a.m.
//              · ♋ adopted the first bud · ♌ thinks the sun came out for them · ♍ mowed the lawn with scissors
//              · ♎ picnic spot forty-seven? · ♏ already predicted every spring fling · ♐ "quick walk", back in June
//              · ♑ gave the tulips a deadline · ♒ planted a garden on the ceiling · ♓ saw a duckling, sobbed
//  49.2        "Twelve signs. | *One sunbeam.*"
//  52.4        LESSON: "Everyone blooms | *on their own time.*"  STATUS: BLOOMING
//  58.3        "Pisces is still | *crying at the duck.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO, INTER } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, chart, confetti, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dffb0', ST = { x: -170 }

const CAMEOS = [
  { sign: 'aries', cap: 'Saw one sunbeam. | Wore *shorts.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', star: ST, hops: [0.9, 1.5],
    front(x, t, lt, P) {
      bits(x, 'SUN', 800, 700, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 5; i++) { const ph = ((t * 0.5 + i / 5) % 1); bits(x, 'SNOW', 640 + i * 70, 640 + ph * 520, 7, { alpha: 0.8 * Math.sin(Math.PI * ph) }) }
      L(x, 800, 920, 'IT’S 4°', pop01(t, P.t0 + 0.8, 0.3, 2.2), SKYB, 0.05, 44)
      bubble(x, 800, 1100, 'SUMMER!!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Picnic for one. | *Six sandwiches.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', star: ST,
    front(x, t, lt, P) {
      const n = Math.min(6, Math.floor(Math.max(0, lt - 0.3) / 0.2) + 1)
      for (let i = 0; i < n; i++) bits(x, 'SANDWICH', 800 + (i % 2 ? 14 : -14), 1100 - i * 74, 13, { rot: (i % 2 ? 0.05 : -0.05) })
      L(x, 800, 600, 'SERVES: 1', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, -0.04, 34)
    } },
  { sign: 'gemini', cap: 'Spring weather? | *Outfit nine* by 9 a.m.', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'happy', star: ST,
    front(x, t, lt, P, F) {
      const n = 1 + Math.floor(clamp((lt - 0.2) / 1.6) * 8)
      const cols = [PINK, SKYB, GOLD, MINT, LAV, '#ff9a4a', RED, '#5fd068', BONE]
      for (let i = 0; i < n; i++) { x.save(); x.translate(640 + (i % 3) * 100, 1120 - Math.floor(i / 3) * 40); x.rotate(-0.3 + i * 0.12); x.fillStyle = INK; x.fillRect(-46, -16, 92, 32); x.fillStyle = cols[i]; x.fillRect(-42, -12, 84, 24); x.restore() }
      L(x, 800, 680, `OUTFIT ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), PINK, 0.05, 48)
      L(x, 800, 860, '8:59 AM', pop01(t, P.t0 + 1.2, 0.3, 2.2), BONE, -0.04, 32)
    } },
  { sign: 'cancer', cap: 'Saw the first bud. | *Adopted it.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'FLOWER', 800, 900, 18 * pop01(t, P.t0 + 0.25, 0.3, 2))
      L(x, 800, 640, 'MEET: BUDDY', pop01(t, P.t0 + 1.0, 0.3, 2.2), PINK, -0.05, 36)
      hearts(x, t, 800, 820, P.t0 + 1.2, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 2 })
      L(x, 800, 1140, 'FAMILY NOW', pop01(t, P.t0 + 1.7, 0.3, 2.4), CREAM, 0.04, 30)
    } },
  { sign: 'leo', cap: 'Sun came out. | Leo said *“thank you.”*', mood: 'sparkle', star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.4, 2)
      x.save(); x.globalAlpha = 0.25 * k; x.fillStyle = '#fff1b0'; x.beginPath(); x.moveTo(760, 560); x.lineTo(880, 560); x.lineTo(520, 1180); x.lineTo(260, 1180); x.closePath(); x.fill(); x.restore()
      bits(x, 'SUN', 820, 620, 13 * k)
      bubble(x, 800, 920, 'for me? stop.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      sparkles(x, t, 370, 860, P.t0 + 1.3, 7, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Spring tidy-up: | the *lawn.* With scissors.', mood: 'squint', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 14; i++) { const cut = i < Math.floor(clamp((lt - 0.3) / 1.5) * 14); x.fillStyle = '#4fbf6a'; x.fillRect(620 + i * 26, 1150 - (cut ? 18 : 60), 12, cut ? 18 : 60) }
      x.fillStyle = '#2f8a48'; x.fillRect(600, 1150, 380, 20)
      L(x, 800, 700, 'BLADES CUT: ALL', pop01(t, P.t0 + 0.5, 0.3, 2), MINT, -0.04, 32)
      L(x, 800, 860, 'EVEN: 1MM', pop01(t, P.t0 + 1.6, 0.3, 2.2), BONE, 0.05, 32)
    } },
  { sign: 'libra', cap: 'Picnic spot 47? | Or *spot 48?*', mood: lt => Math.floor(lt * 2) % 2 ? 'neutral' : 'happy', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const sp = 40 + Math.floor(clamp((lt - 0.2) / 1.8) * 7)
      for (let i = 0; i < 3; i++) drawBits(x, ['RRRR', 'RWRW', 'WRWR', 'RRRR'], { R: RED, W: CREAM }, 650 + i * 140, 1060 - (i % 2) * 80, 26 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2))
      L(x, 800, 700, `SPOT ${sp}?`, pop01(t, P.t0 + 0.3, 0.3, 2), PINK, 0.04, 48)
      L(x, 800, 860, 'SUNSET IN 5', pop01(t, P.t0 + 1.7, 0.3, 2.2), '#ff9a4a', -0.05, 30)
    } },
  { sign: 'scorpio', cap: 'Predicted every | *spring fling.* Already.', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 800, 740, 110, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      sheet(x, 800, 1040, pop01(t, P.t0 + 0.7, 0.3, 2), { w: 330, h: 190, head: 'FLINGS: PREDICTED', headBg: '#b04ad0', lines: ['Gemini + ???', 'Leo + mirror'], size: 30, progress: clamp((lt - 0.9) / 0.8) })
    } },
  { sign: 'sagittarius', cap: '“Quick spring walk.” | Back *in June.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [0.7, 1.1, 1.5],
    front(x, t, lt, P) {
      bits(x, 'BACKPACK', 790, 820, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.08 })
      swapLabel(x, 800, 1080, lt, 1.2, 'BACK: 20 MIN', 'BACK: JUNE', { size: 36, fromBg: BONE, toBg: '#ff9a4a' })
    } },
  { sign: 'capricorn', cap: 'Gave the tulips | a *deadline.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 780, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 250, head: 'Q2 BLOOM PLAN', headBg: STEEL, headInk: INK, lines: ['open: FRI', 'late: noted'], size: 34, progress: clamp((lt - 0.5) / 0.8) })
      bits(x, 'FLOWER', 800, 1080, 9 * pop01(t, P.t0 + 1.0, 0.3, 2))
      bubble(x, 640, 1040, 'eep', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
  { sign: 'aquarius', cap: 'Planted a garden. | On the *ceiling.*', mood: 'wink', look: [0, -1], star: { x: -170, y: 60 },
    front(x, t, lt, P) {
      x.fillStyle = WOOD; x.fillRect(120, 540, 840, 22)
      for (let i = 0; i < 5; i++) bits(x, 'FLOWER', 230 + i * 160, 650, 9 * pop01(t, P.t0 + 0.3 + i * 0.15, 0.3, 2), { rot: Math.PI })
      L(x, 800, 960, 'GRAVITY: OPTIONAL', pop01(t, P.t0 + 1.4, 0.3, 2.2), SKYB, 0.04, 30)
    } },
  { sign: 'pisces', cap: 'Saw a baby duck. | *Sobbed* for an hour.', mood: 'wide', tears: 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'DUCK', 800 + Math.sin(t * 3) * 10, 1000, 16 * pop01(t, P.t0 + 0.25, 0.3, 2))
      bubble(x, 800, 720, 'so TINY', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, col: SKYB, tail: 'bl' })
      L(x, 800, 1160, 'MINUTE 59', pop01(t, P.t0 + 1.7, 0.3, 2.2), LAV, 0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2t0621', key: 'C', accent: ACC, ending: 'lesson',
  title: 'The signs when | *spring starts.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *One sunbeam.*' },
  lesson: { text: 'Everyone blooms | *on their own time.*', chip: 'STATUS: BLOOMING' },
  last: {
    text: 'Pisces is still | *crying at the duck.*',
    draw(x, t, lt) {
      bits(x, 'DUCK', 540 + Math.sin(t * 3) * 12, 1530, 18 * pop01(t, t - lt + 0.6, 0.35, 2))
      hearts(x, t, 540, 1440, t - lt + 0.9, { n: 6, life: 2, spread: 260, cell: 7, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
