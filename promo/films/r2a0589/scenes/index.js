// r2a0589: star_advice, ADVICE ROLLCALL, "What to leave | *in the old year.*" (signs3kit social cut, music: lofi · E).
// Twelve signs in zodiac order: one warm, specific thing each sign can leave behind, with a light visual gag.
// Ending: callback (Taurus kept the snacks).
//   ♈ the rush · ♉ the grudge (keep the snacks) · ♊ the forty open tabs · ♋ the old texts · ♌ needing applause
//   · ♍ the perfect plan · ♎ people-pleasing · ♏ the locked door · ♐ the FOMO · ♑ work at home
//   · ♒ "nobody gets me" · ♓ 3 a.m. overthinking
//   group "New year. | *Lighter you.*"   callback: "Taurus did keep | *the snacks.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, zzz, RED, CREAM, STEEL, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#c9a6ff', ST = { x: -160 }
const snacks = (x, cx, cy, cell) => bits(x, 'BOWL', cx, cy, cell)

/** a browser window with N tabs along the top (tabs close as `closed` rises 0→1) */
function tabs(x, cx, cy, k, closed) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-176, -126, 352, 252); x.fillStyle = '#2a2350'; x.fillRect(-168, -118, 336, 236)
  const n = Math.max(1, Math.round(lerp(12, 1, closed)))
  const w = 320 / n
  for (let i = 0; i < n; i++) { x.fillStyle = i === 0 ? GOLD : STEEL; x.fillRect(-160 + i * w + 2, -110, w - 4, 34) }
  x.fillStyle = '#140c30'; x.fillRect(-160, -70, 320, 180)
  x.fillStyle = BONE; x.font = '800 40px Inter, Arial'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(n === 1 ? 'one dream.' : `${n} tabs`, 0, 20)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Leave the rush. | *Good things wait.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 820, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt < 1.2 ? 0.2 * Math.sin(t * 20) : 0 })
      swapLabel(x, 800, 1080, lt, 1.2, 'SPEED: MAX', 'SPEED: COMFY', { size: 34, fromBg: RED, toBg: MINT })
    } },
  { sign: 'taurus', cap: 'Leave the grudge. | *Keep the snacks.*', mood: lt => lt > 1.1 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const g = 1 - ease.inCubic(prog(lt, 0.8, 1.2))
      L(x, 800, 700, 'GRUDGE', pop01(t, P.t0 + 0.2, 0.3, 2) * g, STEEL, -0.06, 40)
      snacks(x, 800, 960, 18 * pop01(t, P.t0 + 1.2 * 1.29, 0.3, 2))
      if (lt > 1.4) hearts(x, t, 800, 900, P.t0 + 1.4 * 1.29, { n: 3, life: 1.4, spread: 160, cell: 6, seed: 1 })
    } },
  { sign: 'gemini', cap: 'Leave the forty tabs. | *Pick one dream.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      tabs(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), ease.inOutCubic(prog(lt, 0.5, 1.5)))
      sparkles(x, t, 800, 860, P.t0 + 2.0, 6, 180, 0.4)
    } },
  { sign: 'cancer', cap: 'Leave the old texts. | *Make new memories.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 810, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'ARCHIVE CHAT?', headCol: SKYB, lines: [['from 2019…', STEEL, pop01(t, P.t0 + 0.4, 0.2, 2), false], ['archive ✓', MINT, pop01(t, P.t0 + 1.2, 0.2, 2.4), true]], size: 30 })
      L(x, 770, 1120, 'ROOM FOR NEW ONES', pop01(t, P.t0 + 1.7, 0.3, 2.2), PINK, -0.04, 28)
    } },
  { sign: 'leo', cap: 'Leave needing applause. | *You shine anyway.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      swapLabel(x, 800, 760, lt, 1.0, 'CLAPS: NEEDED', 'CLAPS: OPTIONAL', { size: 34, fromBg: GOLD, toBg: LAV })
      sparkles(x, t, 640, 860, P.t0 + 1.5, 8, 160, 0.2)
      L(x, 800, 1060, 'STILL GLOWING', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  { sign: 'virgo', cap: 'Leave the perfect plan. | *Messy counts too.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      sheet(x, 800, 860, k, { w: 320, h: 300, head: 'PLAN v47', headBg: MINT, headInk: INK, lines: [], rot: -0.04 })
      if (lt > 0.7) { x.save(); x.strokeStyle = PINK; x.lineWidth = 8; x.lineCap = 'round'; x.beginPath(); const p = clamp((lt - 0.7) / 0.8); for (let j = 0; j <= 30 * p; j++) { const xx = 680 + j * 8, yy = 880 + Math.sin(j * 1.3) * 40; j ? x.lineTo(xx, yy) : x.moveTo(xx, yy) } x.stroke(); x.restore() }
      L(x, 790, 1100, 'ROUGH DRAFT: GREAT', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: 'libra', cap: 'Leave the people-pleasing. | *Please you too.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 720, lt < 1.1 ? 'yes! sure! ok!' : 'hmm, not today.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, col: lt < 1.1 ? BONE : PINK, tail: 'bl' })
      L(x, 800, 1030, 'BOUNDARY: CUTE', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 34)
    } },
  { sign: 'scorpio', cap: 'Leave the locked door. | *Let one person in.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const turn = ease.inOutCubic(prog(lt, 0.6, 1.1))
      bits(x, 'KEY', 800, 820, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: turn * Math.PI / 2 })
      friend(x, t, 'cancer', 860, 1010, 120, pop01(t, P.t0 + 1.4 * 1.29, 0.3, 2), { mood: 'heart', look: [-1, 0] })
      L(x, 760, 660, 'ACCESS: GRANTED (1)', pop01(t, P.t0 + 1.2, 0.3, 2.2), RED, -0.04, 28)
    } },
  { sign: 'sagittarius', cap: 'Leave the FOMO. | *Rest is an adventure.*', mood: lt => lt > 1.1 ? 'sleepy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'PILLOW', 800, 900, 24 * pop01(t, P.t0 + 0.3, 0.3, 2))
      if (lt > 1.1) zzz(x, t, 820, 800, { alpha: clamp((lt - 1.1) * 3), size: 44 })
      L(x, 770, 1100, 'TONIGHT’S TRIP: NAP', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: 'capricorn', cap: 'Leave work at work. | *You’re more than a job.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const go = ease.inOutCubic(prog(lt, 0.8, 1.5))
      bits(x, 'SUITCASE', lerp(740, 820, go), 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, lerp(740, 820, go), 980, 'WORK', pop01(t, P.t0 + 0.3, 0.3, 2), STEEL, 0.04, 26)
      L(x, 800, 720, 'WORK: CLOCKED OUT', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, -0.04, 30)
      hearts(x, t, 620, 960, P.t0 + 1.7, { n: 3, life: 1.4, spread: 120, cell: 6, seed: 4 })
    } },
  { sign: 'aquarius', cap: 'Leave “nobody gets me.” | *Your people exist.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      ;['gemini', 'libra', 'aquarius'].forEach((id, i) => friend(x, t, id, 680 + i * 120, 900 - (i % 2) * 50, 110, pop01(t, P.t0 + 0.5 + i * 0.25, 0.3, 2), { mood: 'happy', look: [-1, 0] }))
      bubble(x, 800, 700, 'same!!', pop01(t, P.t0 + 1.3, 0.25, 2.4), { size: 52, col: SKYB, tail: 'bl' })
      L(x, 770, 1090, 'WEIRD: SHARED', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: 'pisces', cap: 'Leave the 3 a.m. spirals. | *Sleep is allowed.*', mood: lt => lt < 1.0 ? 'wide' : 'sleepy', look: [1, -1], tears: lt => lt < 1.0 ? 2 : 1, star: ST,
    front(x, t, lt, P) {
      bits(x, 'MOON', 820, 760, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt < 1.0) bubble(x, 760, 980, 'what if…', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, col: LAV, tail: 'bl' })
      else zzz(x, t, 820, 1000, { alpha: clamp((lt - 1.0) * 3), size: 48 })
      L(x, 770, 1120, 'GOODNIGHT, BRAIN', pop01(t, P.t0 + 1.5, 0.3, 2.2), SKYB, -0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2a0589', key: 'E', accent: ACC, ending: 'callback',
  title: 'What to leave | *in the old year.*',
  cameos: CAMEOS,
  group: { cap: 'New year. | *Lighter you.*' },
  last: {
    text: 'Taurus did keep | *the snacks.*',
    draw(x, t, lt) {
      snacks(x, 540, 1100, 30 * pop01(lt, 0.4, 0.35, 2))
      hearts(x, t, 540, 1000, t - lt + 0.9, { n: 6, life: 2.0, spread: 420, cell: 7, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
