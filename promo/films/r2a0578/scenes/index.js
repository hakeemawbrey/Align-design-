// r2a0578: star_advice, ADVICE SOLO (pisces), "Pisces, your sign | *to slow down.*" (signs3kit social cut, music: lofi · C).
// Nine warm nudges for a Pisces to slow down; Pisces cries in every card; one visual gag each:
//   absorbing every mood (set some down) · tears all day (drink some water) · replying at 3 a.m. (reply tomorrow)
//   · fixing everyone's problems (you're not a lifeguard) · lost in a daydream (come back gently) · doing it all today
//   (tomorrow exists) · named the kids after one match (let it unfold) · swimming upstream (float a bit) · big heart, rest.
// Ending: lesson ("Slow is still | moving forward." REST: EARNED), then "Tissues down. | Feet up."
import { makeFilm, drawBits as bitsRaw, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO, INTER } from '../../signs3kit.js'
import { L, sheet, phone, steam, confetti, zzz, bits, swapLabel, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const S = 'pisces', ACC = '#6fc3ff', ST = { x: -170 }
const GLASS = ['W......W', 'WBBBBBBW', 'WBSBBBBW', 'WBBBBBBW', 'WBBBBBBW', '.WBBBBW.', '.WWWWWW.']
const GLASS_C = { W: '#ffffff', B: SKYB, S: '#ffffff' }
const SPONGE = ['YYYYYYYYYY', 'YOYYYOYYOY', 'YYYOYYYYYY', 'YOYYYYOYYY', 'YYYYOYYYOY', 'GGGGGGGGGG', 'GGGGGGGGGG']
const SPONGE_C = { Y: '#ffe76a', O: '#d9b23a', G: '#4fbf6a' }
// a ring buoy (Pisces is not a lifeguard)
function buoy(x, cx, cy, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.lineWidth = 58; x.strokeStyle = INK; x.beginPath(); x.arc(0, 0, 90, 0, Math.PI * 2); x.stroke()
  x.lineWidth = 46
  for (let i = 0; i < 8; i++) { x.strokeStyle = i % 2 ? '#ffffff' : RED; x.beginPath(); x.arc(0, 0, 90, i * Math.PI / 4, (i + 1) * Math.PI / 4); x.stroke() }
  x.restore()
}
const T1 = lt => (lt < 1.0 ? 1 : 2)

const CAMEOS = [
  // 1 · absorbing every mood
  { sign: S, cap: 'Absorbing every mood? | *Set some down.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', tears: T1, star: ST,
    front(x, t, lt, P) {
      const sq = lt > 1.2 ? 0.75 + 0.25 * Math.cos(prog(lt, 1.2, 1.6) * Math.PI) : 1
      x.save(); const k = pop01(t, P.t0 + 0.2, 0.3, 2); x.translate(790, 880); x.scale(1, sq); x.translate(-790, -880)
      drawSponge(x, 790, 880, 28 * k); x.restore()
      if (lt > 1.25) for (let i = 0; i < 6; i++) { const ph = ((lt - 1.25) * 1.4 + i / 6) % 1; x.fillStyle = INK; x.fillRect(700 + i * 32 - 2, 970 + ph * 160 - 2, 16, 20); x.fillStyle = SKYB; x.fillRect(700 + i * 32, 970 + ph * 160, 12, 16) }
      L(x, 790, 660, 'NOT ALL YOURS', pop01(t, P.t0 + 1.4, 0.3, 2.4), SKYB, -0.04, 34)
    } },
  // 2 · drink some water
  { sign: S, cap: 'Crying all day? | *Drink some water.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', tears: lt => lt > 1.2 ? 1 : 3, star: ST,
    front(x, t, lt, P) {
      drawGlass(x, 790, 880, 22 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 790, 1090, 'HYDRATION: HEROIC', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, 0.04, 32)
      sparkles(x, t, 790, 880, P.t0 + 0.7, 6, 150, 0.4, [SKYB, BONE])
    } },
  // 3 · replying at 3 a.m.
  { sign: S, cap: 'Replying at 3 a.m.? | *Tomorrow’s fine.*', mood: lt => lt > 1.3 ? 'sleepy' : 'wide', tears: T1, star: ST,
    front(x, t, lt, P) {
      bits(x, 'MOON', 900, 600, 14 * pop01(t, P.t0 + 0.15, 0.3, 2))
      phone(x, t, 780, 880, pop01(t, P.t0 + 0.3, 0.3, 2), { head: '3:07 AM', headCol: LAV, lines: [['you up?', PINK, pop01(t, P.t0 + 0.5, 0.2, 2), false]], typing: lt < 1.3 ? 1 : 0 })
      L(x, 780, 1120, 'REPLY: TOMORROW', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, -0.04, 30)
      if (lt > 1.4) zzz(x, t, 440, 700)
    } },
  // 4 · not a lifeguard
  { sign: S, cap: 'Rescuing everyone? | *You’re not a lifeguard.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', tears: T1, star: ST, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      buoy(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), Math.sin(t * 2) * 0.1)
      L(x, 790, 1080, 'OFF DUTY. FINALLY.', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  // 5 · lost in a daydream
  { sign: S, cap: 'Floated off in a daydream? | *Come back gently.*', mood: lt => lt > 1.4 ? 'happy' : 'sleepy', look: [1, -1], tears: T1, star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'CLOUD', 800, 760 + 10 * Math.sin(t * 2), 27 * k)
      bits(x, 'FISH', 760, 740 + 10 * Math.sin(t * 2), 9 * k)
      bits(x, 'MOON', 860, 720 + 10 * Math.sin(t * 2), 7 * k)
      L(x, 790, 1000, 'BACK IN 5 MIN', pop01(t, P.t0 + 1.3, 0.3, 2.4), LAV, -0.04, 34)
    } },
  // 6 · doing it all today
  { sign: S, cap: 'Doing it all today? | *Tomorrow exists too.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', tears: T1, star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 340, head: 'TODAY', headBg: PINK, headInk: INK, font: MONO, weight: 700, size: 26,
        lines: ['help a friend', 'help 4 friends', 'save the bees', 'call everyone'], progress: prog(lt, 0.3, 1.0) })
      L(x, 790, 1100, 'MOVED 3 TO TOMORROW', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 28)
    } },
  // 7 · Align: named the kids after one match
  { sign: S, cap: 'Named the kids already? | Let it *unfold.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', tears: lt => lt > 1.3 ? 2 : 1, star: ST,
    front(x, t, lt, P) {
      phone(x, t, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ NEW MATCH', headCol: GOLD, lines: [['hi :)', MINT, pop01(t, P.t0 + 0.5, 0.2, 2), false]] })
      L(x, 790, 1100, 'MATCHED: 1 MIN AGO', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, -0.04, 28)
      hearts(x, t, 440, 760, P.t0 + 0.9, { n: 6, life: 1.8, spread: 200, cell: 7, seed: 2 })
    } },
  // 8 · swimming upstream
  { sign: S, cap: 'Swimming upstream? | *Float a bit.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', tears: T1, star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'WAVE', 790, 1040 + 6 * Math.sin(t * 3), 9 * k)
      bits(x, 'FISH', 790 + (lt > 1.3 ? 0 : 10 * Math.sin(t * 12)), 940 + 8 * Math.sin(t * 3), 16 * k, { rot: lt > 1.3 ? 0.1 * Math.sin(t * 2) : -0.3 })
      swapLabel(x, 790, 720, lt, 1.3, 'MODE: STRUGGLE', 'MODE: FLOAT', { size: 32, fromBg: STEEL, toBg: SKYB })
    } },
  // 9 · big heart, rest
  { sign: S, cap: 'A heart that big | *needs rest too.*', mood: 'heart', tears: T1, star: ST, hops: [1.2],
    back(x, t, lt, P) { bits(x, 'BLANKET', 380, 1080, 20 * pop01(t, P.t0 + 0.3, 0.3, 2)) },
    front(x, t, lt, P) {
      bits(x, 'HEARTB', 790, 840, 28 * pop01(t, P.t0 + 0.2, 0.35, 2) * (1 + 0.05 * Math.sin(t * 6)))
      bits(x, 'PILLOW', 790, 1060, 15 * pop01(t, P.t0 + 0.8, 0.3, 2))
      if (lt > 1.2) zzz(x, t, 830, 700)
    } },
]
function drawSponge(x, cx, cy, cell) { bitsRaw(x, SPONGE, SPONGE_C, cx, cy, cell) }
function drawGlass(x, cx, cy, cell) { bitsRaw(x, GLASS, GLASS_C, cx, cy, cell) }

const F = makeFilm({
  id: 'r2a0578', key: 'C', accent: ACC, solo: S, ending: 'lesson',
  title: 'Pisces, your sign | *to slow down.*',
  cameos: CAMEOS,
  card: { a: 'pisces', b: 'taurus', chip: 'ALIGNED' },
  group: { cap: 'Feel it all. | *Then rest.*', mood: 'heart' },
  lesson: { text: 'Slow is still | *moving forward.*', chip: 'REST: EARNED' },
  last: { text: 'Tissues down. | *Feet up.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
