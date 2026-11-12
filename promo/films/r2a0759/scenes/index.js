// r2a0759: star_advice, ADVICE SOLO (sagittarius), "How to surprise | *a Sagittarius.*" (signs3kit social cut, lofi · E).
// One sign the whole way: nine kind, doable surprises for the sign that loves the unknown, each with one light gag.
// Ending: lesson.
//   pack a bag, don't say where · a random Tuesday picnic · tickets to something weird (the moth museum)
//   · teach them a new skill (juggling counts) · a map with an X, snacks at the X · plan nothing, just drive
//   · find their sign in the actual sky · an honest compliment · say yes to their wild idea (llama farm: approved)
//   group "Curious heart. | *Always packed.*"  lesson "Give them something new. | They’ll *tell it forever.*"
//   last "Next surprise? | *Already planned.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, friend, bits, swapLabel, B, C, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#c97bff', S = 'sagittarius', ST = { x: -190 }
// the archer: dots of the Sagittarius teapot, joined one by one
const SAG = [[-120, 40], [-60, 0], [0, 20], [40, -40], [100, -20], [120, 50], [40, 80], [-40, 90]]

const CAMEOS = [
  { sign: S, cap: 'Pack them a bag. | *Don’t say where.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'BACKPACK', 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 660, 'DESTINATION: ???', pop01(t, P.t0 + 0.6, 0.3, 2.2), GOLD, -0.04, 32)
      L(x, 800, 1110, 'SAG: ALREADY IN', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'A random Tuesday picnic. | *Best kind.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BLANKET', 800, 1010, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'SANDWICH', 760, 900, 12 * pop01(t, P.t0 + 0.6, 0.3, 2))
      bits(x, 'APPLE', 880, 910, 10 * pop01(t, P.t0 + 0.8, 0.3, 2))
      L(x, 800, 680, 'TUESDAY, 1 PM', pop01(t, P.t0 + 1.2, 0.3, 2.2), PINK, -0.04, 30)
    } },
  { sign: S, cap: 'Tickets to something weird. | *They’ll love it.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 850); x.rotate(-0.05); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-176, -86, 352, 172); x.fillStyle = PINK; x.fillRect(-168, -78, 336, 156)
        x.fillStyle = CREAM; x.fillRect(-150, -60, 300, 120); x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.font = `700 22px ${MONO}`; x.fillText('ADMIT TWO', 0, -32); x.font = `800 34px Inter, sans-serif`; x.fillText('MOTH MUSEUM', 0, 14); x.restore()
      }
      L(x, 800, 1080, 'SAG: “FINALLY.”', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Teach them something new. | *Juggling counts.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [0, -1], star: ST,
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      for (let i = 0; i < 3; i++) { const ph = t * 3 + i * 2.094; bits(x, 'BALL', F.x + Math.cos(ph) * 110, F.top - 50 - Math.abs(Math.sin(ph)) * 110, 13 * k) }
      L(x, 800, 760, 'SKILL #213', pop01(t, P.t0 + 0.8, 0.3, 2.2), MINT, -0.04, 34)
      L(x, 800, 1000, 'DROPPED: 40 TIMES', pop01(t, P.t0 + 1.5, 0.3, 2.2), STEEL, 0.04, 28)
    } },
  { sign: S, cap: 'A map with an X. | *Snacks at the X.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MAP', 800, 850, 28 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04 })
      if (lt > 0.8) { x.save(); x.strokeStyle = RED; x.lineWidth = 12; x.lineCap = 'round'; const s = 30 * pop01(t, P.t0 + 0.8, 0.3, 2.4); x.beginPath(); x.moveTo(860 - s, 840 - s); x.lineTo(860 + s, 840 + s); x.moveTo(860 + s, 840 - s); x.lineTo(860 - s, 840 + s); x.stroke(); x.restore() }
      L(x, 800, 1090, 'TREASURE: COOKIES', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Plan nothing. | Just *drive somewhere.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8],
    front(x, t, lt, P) {
      bits(x, 'CAR', 800 + Math.sin(t * 6) * 4, 930, 17 * pop01(t, P.t0 + 0.2, 0.3, 2))
      x.save(); x.fillStyle = 'rgba(239,230,214,0.5)'; for (let i = 0; i < 5; i++) { const ph = ((t * 1.5 + i / 5) % 1); x.fillRect(960 - ph * 340, 1020, 40, 8) } x.restore()
      L(x, 800, 680, 'ROUTE: VIBES', pop01(t, P.t0 + 0.8, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Find their sign | *in the actual sky.*', mood: lt => lt > 1.5 ? 'heart' : 'wide', look: [1, -1], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.3) / 1.2) * SAG.length)
      x.save(); x.strokeStyle = 'rgba(239,230,214,0.7)'; x.lineWidth = 4; x.beginPath()
      for (let i = 0; i < n; i++) { const [a, b] = SAG[i]; i ? x.lineTo(800 + a, 760 + b) : x.moveTo(800 + a, 760 + b) } x.stroke(); x.restore()
      SAG.forEach(([a, b], i) => bits(x, 'STAR5', 800 + a, 760 + b, 4 * pop01(t, P.t0 + 0.2 + i * 0.08, 0.3, 2.2)))
      bits(x, 'SCOPE', 820, 1010, 12 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 800, 1130, '“THAT’S ME!!”', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Say the honest compliment. | *Blunt is their language.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, 'taurus', 840, 980, 180, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: 'happy', look: [-1, 0] })
      bubble(x, 790, 700, 'your laugh is loud. | i love it.', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 34, tail: 'br' })
      hearts(x, t, 560, 760, P.t0 + 1.2, { n: 5, life: 1.6, spread: 140, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Say yes | to *their wild idea.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.2, 1.6],
    front(x, t, lt, P) {
      L(x, 800, 700, 'IDEA: LLAMA FARM', pop01(t, P.t0 + 0.2, 0.3, 2), CREAM, -0.04, 32)
      swapLabel(x, 800, 900, lt, 1.0, 'PENDING…', 'APPROVED ✓', { size: 40, fromBg: STEEL, toBg: MINT })
      sparkles(x, t, 800, 900, P.t0 + 1.35, 8, 190, 0.2)
    } },
]

const F = makeFilm({
  id: 'r2a0759', key: 'E', accent: ACC, solo: S, ending: 'lesson',
  title: 'How to surprise | *a Sagittarius.*',
  cameos: CAMEOS,
  group: { cap: 'Curious heart. | *Always packed.*', mood: 'sparkle' },
  lesson: { text: 'Give them something new. | They’ll *tell it forever.*', chip: 'SURPRISE: LANDED' },
  last: { text: 'Next surprise? | *Already planned.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
