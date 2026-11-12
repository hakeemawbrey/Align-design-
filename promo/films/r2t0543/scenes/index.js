// r2t0543: star_talk, ROLLCALL, "The signs learning | to drive." (signs3kit social cut, music: lofi · G).
// Twelve signs in zodiac order, each the most extreme learner driver. Ending: callback (Libra, still at the junction).
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, confetti, friend, bits, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffb34a', ST = { x: -170 }

/** a little road strip under a prop: grey band with dashes scrolling */
function road(x, t, cx, cy, w, k, speed = 0) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= clamp(k)
  x.fillStyle = INK; x.fillRect(cx - w / 2, cy - 34, w, 68)
  x.fillStyle = '#3a3a5a'; x.fillRect(cx - w / 2, cy - 28, w, 56)
  x.fillStyle = GOLD; const off = (t * speed) % 80
  for (let d = -w / 2 - 80; d < w / 2; d += 80) { const dx = d - off; if (dx > -w / 2 && dx < w / 2 - 40) x.fillRect(cx + dx, cy - 4, 40, 8) }
  x.restore()
}
/** a junction sign pair: ← LEFT / RIGHT → */
function junction(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-10, -40, 20, 220); x.fillStyle = STEEL; x.fillRect(-5, -40, 10, 220)
  x.restore()
  L(x, cx - 70 * k, cy - 70 * k, '← LEFT', k, MINT, -0.08, 34)
  L(x, cx + 70 * k, cy, 'RIGHT →', k, PINK, 0.08, 34)
}

const CAMEOS = [
  { sign: 'aries', cap: 'Lesson one? | *Straight to the highway.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      road(x, t, 790, 980, 300, k, 900)
      bits(x, 'CAR', 790, 910, 22 * k)
      L(x, 790, 680, 'SPEED: EXCITED', pop01(t, P.t0 + 0.9, 0.3, 2.2), RED, -0.04, 32)
    } },
  { sign: 'taurus', cap: 'Every lesson ended | *at the bakery.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CAR', 760, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'COOKIE', 840, 740, 20 * pop01(t, P.t0 + 0.9, 0.3, 2))
      L(x, 790, 1120, 'ROUTE: CROISSANTS', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: 'gemini', cap: 'Talked all lesson. | *Never started the car.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const W = ['so anyway—', 'fun fact:', 'wait, listen', 'ok but—', 'right?!']
      const n = Math.min(4, Math.floor(Math.max(0, lt - 0.3) / 0.38))
      bubble(x, 790, 680, W[n], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      bits(x, 'CAR', 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1080, 'ENGINE: OFF', pop01(t, P.t0 + 1.3, 0.3, 2.2), STEEL, -0.04, 34)
    } },
  { sign: 'cancer', cap: 'Packed snacks | for a *ten-minute drive.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'BOX', 790, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'SANDWICH', 700, 700, 10 * pop01(t, P.t0 + 0.6, 0.3, 2))
      bits(x, 'APPLE', 880, 700, 10 * pop01(t, P.t0 + 0.8, 0.3, 2))
      L(x, 790, 1110, 'ALSO: A BLANKET', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, 0.04, 30)
    } },
  { sign: 'leo', cap: 'Practised the wave | *more than parking.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      bits(x, 'CAR', 790, 940, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 700, 'hello, fans!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 44, col: GOLD, tail: 'bl' })
      L(x, 790, 1110, 'PARKING: LATER', pop01(t, P.t0 + 1.4, 0.3, 2.2), STEEL, -0.04, 32)
      sparkles(x, t, 790, 700, P.t0 + 0.8, 6, 160, 0.4)
    } },
  { sign: 'virgo', cap: 'Mirror check. | *Forty-two times.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: lt => [Math.floor(lt * 4) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(42, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.035))
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 820); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 130, 80, 0, 0, Math.PI * 2); x.fill()
        x.fillStyle = SKYB; x.beginPath(); x.ellipse(0, 0, 116, 66, 0, 0, Math.PI * 2); x.fill()
        x.fillStyle = 'rgba(255,255,255,0.7)'; x.fillRect(-70, -36, 40, 12)
        x.fillStyle = INK; x.fillRect(-8, 76, 16, 70); x.restore()
      }
      L(x, 790, 1080, `CHECK #${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), MINT, -0.04, 38)
    } },
  { sign: 'libra', cap: 'Left or right? | *Still deciding.*', mood: lt => lt > 1.6 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      junction(x, 790, 860, pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 790, 1120, 'WAITING: 2 HOURS', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Parked in one move. | *Explained nothing.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const p = ease.outCubic(prog(lt, 0.3, 1.1))
      bits(x, 'CONE', 630, 960, 12 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'CONE', 950, 960, 12 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'CAR', lerp(1000, 790, p), 960, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 720, 'FLAWLESS. SILENT.', pop01(t, P.t0 + 1.3, 0.3, 2.2), LAV, -0.04, 32)
      sparkles(x, t, 790, 960, P.t0 + 1.2, 6, 150, 0.4)
    } },
  { sign: 'sagittarius', cap: 'Short practice drive. | *Ended at the coast.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      bits(x, 'MAP', 790, 800, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      L(x, 790, 1060, 'PLANNED: 10 MIN', pop01(t, P.t0 + 0.7, 0.3, 2.2), STEEL, -0.04, 28)
      L(x, 790, 1130, 'ACTUAL: 6 HOURS', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: 'capricorn', cap: 'Read the whole manual. | *Annotated it.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOOK', 790, 820, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 5; i++) { const k = pop01(t, P.t0 + 0.6 + i * 0.15, 0.25, 2); if (k > 0.01) { x.save(); x.fillStyle = [GOLD, PINK, MINT, SKYB, LAV][i]; x.fillRect(700 + i * 40, 700 - 20 * k, 26, 40 * k); x.restore() } }
      L(x, 790, 1080, 'STICKY NOTES: ALL', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Built a car | that *drives itself.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'CAR', 790, 940, 22 * k)
      bits(x, 'GADGET', 790, 800, 12 * k)
      bubble(x, 790, 670, 'beep. relax.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 42, col: MINT, tail: 'bc' })
      L(x, 790, 1110, 'LESSON: SKIPPED', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: 'pisces', cap: 'Instructor said “good job.” | *Happy tears.*', mood: lt => lt < 0.9 ? 'sparkle' : 'heart', tears: lt => lt < 0.9 ? 1 : 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'good job!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 48, col: GOLD, tail: 'bl' })
      bits(x, 'TISSUE', 790, 950, 18 * pop01(t, P.t0 + 1.0, 0.3, 2))
      L(x, 790, 1120, 'TISSUES USED: ALL', pop01(t, P.t0 + 1.4, 0.3, 2.2), LAV, -0.04, 28)
    } },
]

const F = makeFilm({
  id: 'r2t0543', key: 'G', accent: ACC, ending: 'callback',
  title: 'The signs learning | *to drive.*',
  cameos: CAMEOS,
  group: { cap: 'Everyone passed. | *Somehow.*' },
  last: {
    text: 'And Libra? | *Still deciding.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'libra', 380, 1100, 250 * k, { mood: 'squint', look: [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], seed: 9 })
      junction(x, 760, 1070, pop01(t, t0 + 0.5, 0.3, 2))
      L(x, 740, 1290, 'DAY 40', pop01(t, t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 36)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
