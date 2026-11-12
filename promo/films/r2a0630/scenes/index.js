// r2a0630: star_advice, ADVICE SOLO (leo), "Leo, you don’t have | *to be perfect.*" (signs3kit social cut, music: lofi · G).
// Nine cards: a relatable Leo truth + a warm reframe, one gag each: bad hair day, still radiant · one friend clapping
// counts · forgot a line? nobody noticed · the crown slipped, it's still yours · rest day, even the sun sets ·
// messed up? say sorry, still a legend · selfie forty isn't perfect? post selfie three · let someone else shine
// (the spotlight swings to a friend) · loved for your heart, not your highlights.
// Ending: group ("Not perfect. | *Still the sun.*").
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, bits, swapLabel, friend, zzz, RED, CREAM, STEEL, WOOD, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffb34a', ST = { x: -180 }, SG = 'leo'
const CROWN = ['Y...Y...Y', 'YY.YYY.YY', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY']
const CROWN_C = { Y: GOLD, R: RED, B: SKYB }

/** a warm spotlight cone from the top of the panel down to (bx, by) */
function spot(x, bx, by, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = 0.3 * k; x.fillStyle = '#fff1b0'
  x.beginPath(); x.moveTo(bx - 40, 490); x.lineTo(bx + 40, 490); x.lineTo(bx + 190, by); x.lineTo(bx - 190, by); x.closePath(); x.fill()
  x.globalAlpha = 0.45 * k; x.beginPath(); x.ellipse(bx, by - 20, 190, 34, 0, 0, Math.PI * 2); x.fill()
  x.restore()
}

const CAMEOS = [
  { sign: SG, cap: 'Bad hair day? | *Still radiant.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P, F) {
      x.save(); x.strokeStyle = '#ff9a3a'; x.lineWidth = 12; x.lineCap = 'round'
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      for (let i = 0; i < 6; i++) { const a = -Math.PI / 2 + (i - 2.5) * 0.35; x.beginPath(); x.moveTo(F.x + Math.cos(a) * 80, F.top + 40); x.quadraticCurveTo(F.x + Math.cos(a) * 140 * k, F.top - 30 * k, F.x + Math.cos(a + 0.6) * 150 * k, F.top - 70 * k + Math.sin(t * 6 + i) * 6); x.stroke() }
      x.restore()
      swapLabel(x, 800, 860, lt, 1.2, 'HAIR: CHAOS', 'GLOW: MAX', { size: 40, fromBg: STEEL, toBg: GOLD })
      sparkles(x, t, F.x, F.cy, P.t0 + 1.4, 7, 170, 0.3)
    } },
  { sign: SG, cap: 'Only one friend clapped? | *That counts.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 800, 940, 190, pop01(t, P.t0 + 0.4, 0.3, 2), { mood: 'heart', look: [-1, 0], hops: [P.t0 + 0.9, P.t0 + 1.3, P.t0 + 1.7] })
      L(x, 800, 690, 'CLAP CLAP CLAP!!', pop01(t, P.t0 + 0.8, 0.3, 2), PINK, -0.05, 36)
      L(x, 800, 1120, 'BEST FAN EVER', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: SG, cap: 'Forgot a line? | *Nobody noticed.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 300, head: 'MY SPEECH', headBg: '#ffb34a', headInk: INK, lines: ['thank you all', ['um… (line 2)', RED], 'and that’s', 'what matters!'], size: 30, progress: clamp((lt - 0.3) / 1.2) })
      L(x, 800, 1110, 'STANDING OVATION', pop01(t, P.t0 + 1.7, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: SG, cap: 'Crown slipped? | *Still yours.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      const tilt = lt < 1.2 ? lerp(0, 0.5, ease.outBack(clamp((lt - 0.4) / 0.4))) : lerp(0.5, 0.12, ease.inOutCubic(clamp((lt - 1.2) / 0.4)))
      drawBits(x, CROWN, CROWN_C, F.x + 40 * tilt, F.top - 10 + 30 * tilt, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: tilt })
      L(x, 800, 860, lt < 1.2 ? 'OOPS' : 'STILL ROYAL', 1, lt < 1.2 ? STEEL : GOLD, 0.04, 44)
    } },
  { sign: SG, cap: 'Need a rest day? | Even *the sun sets.*', mood: 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const set = ease.inOutCubic(prog(lt, 0.3, 1.6))
      x.save(); x.beginPath(); x.rect(600, 560, 400, 440); x.clip()
      bits(x, 'SUN', 800, lerp(720, 1000, set), 14 * pop01(t, P.t0 + 0.2, 0.3, 2)); x.restore()
      x.fillStyle = INK; x.fillRect(620, 996, 360, 10)
      zzz(x, t, 470, 700)
      L(x, 800, 1100, 'BACK TOMORROW ☼', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  { sign: SG, cap: 'Messed up? Say sorry. | *Still a legend.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'my bad! sorry.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      L(x, 800, 920, 'LEGEND STATUS: KEPT', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, 0.04, 32)
      hearts(x, t, 800, 1130, P.t0 + 1.4, { n: 4, life: 1.4, spread: 160, cell: 7, seed: 5 })
    } },
  { sign: SG, cap: 'Selfie forty not perfect? | Post *selfie three.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'LENS', 800, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = lt < 1.2 ? 1 + Math.floor(clamp((lt - 0.2) / 0.9) * 39) : 3
      L(x, 800, 660, `SELFIE #${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), lt < 1.2 ? STEEL : GOLD, -0.04, 44)
      L(x, 800, 1110, 'POSTED. GORGEOUS.', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: SG, cap: 'Let someone else | *shine* for a minute.', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.6, 1.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      const sw = ease.inOutCubic(prog(lt, 0.7, 1.3))
      spot(x, lerp(360, 800, sw), 1180, ease.outCubic(prog(lt, 0.1, 0.4)))
    },
    front(x, t, lt, P) {
      friend(x, t, 'virgo', 800, 940, 200, pop01(t, P.t0 + 0.3, 0.3, 2), { mood: lt > 1.3 ? 'sparkle' : 'wide', look: [-1, 0] })
      L(x, 800, 670, 'YOUR TURN!', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, -0.04, 40)
      sparkles(x, t, 800, 940, P.t0 + 1.4, 6, 160, 0.3)
    } },
  { sign: SG, cap: 'Loved for your heart. | *Not your highlights.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      bits(x, 'HEARTB', 800, 860, 26 * pop01(t, P.t0 + 0.2, 0.35, 2) * (1 + 0.04 * Math.sin(t * 7)))
      L(x, 800, 1090, 'NO FILTER NEEDED', pop01(t, P.t0 + 1.2, 0.3, 2.2), PINK, -0.04, 32)
      hearts(x, t, 800, 760, P.t0 + 1.4, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2a0630', key: 'G', accent: ACC, solo: SG, ending: 'group',
  title: 'Leo, you don’t have | *to be perfect.*',
  cameos: CAMEOS,
  group: { cap: 'Not perfect. | *Still the sun.*', mood: 'sparkle' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
