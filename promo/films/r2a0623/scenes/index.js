// r2a0623: star_advice, ADVICE SOLO (sagittarius), "Sagittarius, it’s okay | *to start over.*" (signs3kit social cut, music: lofi · C).
// One sign the whole way: nine gentle truths about a Sagittarius starting again, each with a warm reframe and one light gag.
// Ending: callback (plan B, card 4, comes back: it turned out better).
//   a new city (the map pin) · changed majors twice · flaky → brave · plan A fell apart, plan B · the journal, page one
//   again · repainted the room, colour four · "I was wrong" · the profile, new chapter · day one, expert level
//   group "New start. | *Same big heart.*"   last "Plan B? | *Turned out better.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#c97bff', S = 'sagittarius', ST = { x: -190 }
const PIN = ['.RRR.', 'RRWRR', 'RRRRR', '.RRR.', '..R..', '..R..']

const CAMEOS = [
  { sign: S, cap: 'Moved cities again? | *New chapter, same you.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MAP', 800, 860, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const d = ease.outCubic(prog(lt, 0.7, 1.1))
      if (lt > 0.7) drawBits(x, PIN, { R: RED, W: '#fff' }, 860, lerp(600, 790, d), 14)
      L(x, 800, 1110, 'HOME: HERE NOW', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Changed majors twice? | *Curious isn’t lost.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      sheet(x, 800, 860, k, { w: 320, h: 300, head: 'MY MAJOR', headBg: ACC, headInk: INK, lines: ['ART', 'LAW', ['THE STARS', '#2f8a48']], size: 40, progress: clamp((lt - 0.3) / 1.2) })
      if (k > 0.9) { x.save(); x.translate(800, 860); x.rotate(-0.04); x.strokeStyle = RED; x.lineWidth = 7; for (let i = 0; i < 2; i++) if (lt > 0.7 + i * 0.4) { x.beginPath(); x.moveTo(-70, -30 + i * 54); x.lineTo(70, -30 + i * 54); x.stroke() } x.restore() }
    } },
  { sign: S, cap: 'Left what dimmed you? | *That’s brave, not flaky.*', mood: lt => lt > 1.1 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      swapLabel(x, 800, 860, lt, 1.0, 'FLAKY?', 'BRAVE.', { size: 68, fromBg: STEEL, toBg: GOLD })
      sparkles(x, t, 800, 860, P.t0 + 1.4, 7, 180, 0.2)
    } },
  { sign: S, cap: 'Plan A fell apart? | Plan B *can be better.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      swapLabel(x, 800, 780, lt, 0.9, 'PLAN A', 'PLAN B', { size: 60, fromBg: BONE, toBg: MINT })
      L(x, 800, 1020, 'EVEN BETTER', pop01(t, P.t0 + 1.7, 0.3, 2.2), PINK, 0.05, 34)
    } },
  { sign: S, cap: 'New journal, again? | *Page one is brave.*', mood: 'happy', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOOK', 800, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1100, 'PAGE 1 (AGAIN)', pop01(t, P.t0 + 1.0, 0.3, 2.2), LAV, -0.04, 34)
      sparkles(x, t, 800, 860, P.t0 + 1.4, 6, 150, 0.5)
    } },
  { sign: S, cap: 'Repainted the whole room? | *Fresh looks good on you.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const cols = [STEEL, '#ff9a4a', SKYB, MINT], n = Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.45))
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      x.save(); x.translate(800, 840); x.scale(k, k); x.fillStyle = INK; x.fillRect(-150, -150, 300, 300); x.fillStyle = cols[n]; x.fillRect(-140, -140, 280, 280); x.fillStyle = 'rgba(255,255,255,0.25)'; x.fillRect(-140, -140, 280, 36); x.restore()
      L(x, 800, 1090, `COLOUR #${n + 1}`, pop01(t, P.t0 + 0.4, 0.3, 2), BONE, 0.04, 34)
    } },
  { sign: S, cap: 'Said “I was wrong”? | *That’s growing.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'i was wrong.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 48, tail: 'bl' })
      L(x, 800, 960, 'GROWTH: UNLOCKED', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, -0.04, 34)
      hearts(x, t, 800, 900, P.t0 + 1.5, { n: 4, life: 1.6, spread: 180, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Updated your profile? | *The story’s still going.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      sheet(x, 800, 860, k, { w: 300, h: 340, head: '♐︎ SAGITTARIUS', headBg: ACC, headInk: INK, lines: [], rot: 0.04 })
      if (k > 0.9) friend(x, t, S, 800, 860, 150, 1, { mood: 'sparkle' })
      L(x, 800, 1070, 'NEW CHAPTER', pop01(t, P.t0 + 1.1, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Scared to begin again? | *You’ve done it before.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) L(x, 790 + (i % 2 ? 24 : -24), 1050 - i * 100, 'DAY 1', pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2.2), [BONE, SKYB, PINK, GOLD][i], (i % 2 ? 0.06 : -0.06), 38)
      L(x, 800, 1160, 'LEVEL: EXPERT', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.03, 30)
    } },
]

const F = makeFilm({
  id: 'r2a0623', key: 'C', accent: ACC, solo: S, ending: 'callback',
  title: 'Sagittarius, it’s okay | *to start over.*',
  cameos: CAMEOS,
  group: { cap: 'New start. | *Same big heart.*', mood: 'heart' },
  last: {
    text: 'Plan B? | *Turned out better.*',
    draw(x, t, lt) {
      L(x, 540, 1150, 'PLAN B', pop01(t, t - lt + 0.6, 0.35, 2.2), MINT, -0.04, 80)
      sparkles(x, t, 540, 1150, t - lt + 0.9, 8, 230, 0.3)
      hearts(x, t, 540, 1080, t - lt + 1.1, { n: 6, life: 2, spread: 300, cell: 7, seed: 2 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
