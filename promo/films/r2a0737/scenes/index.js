// r2a0737: star_advice, ADVICE SOLO (scorpio), "Scorpio, celebrate | the small wins." (signs3kit social cut, lofi · F). Ending: lesson.
// Nine small wins a Scorpio would never mention out loud, each celebrated warmly with one light gag:
//   inbox 999 → 998 · drank the water (gold star) · a hard day and still showed up · trust: the door open a crack
//   · said how they feel · read the text once (not twelve times) · laughed out loud in public, shades fell off
//   · crossed one grudge off the list · tiny steps, a row of gold stars
//   group "Quietly | winning."  LESSON: "Small wins | are still wins."  WINS: CELEBRATED   last: "Scorpio smiled. | We all saw."
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, bits, swapLabel, confetti, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#c97bff', S = 'scorpio', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'Replied to one email? | *That\'s a win.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'LAPTOP', 800, 930, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      swapLabel(x, 800, 720, lt, 1.1, 'INBOX: 999', 'INBOX: 998', { size: 38, fromBg: STEEL, toBg: MINT })
      confetti(x, t, 800, 900, P.t0 + 1.5)
    } },
  { sign: S, cap: 'Drank your water? | *Gold star.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', star: ST,
    front(x, t, lt, P) {
      bits(x, 'GLASS', 790, 950, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'STAR5', 870, 780, 15 * pop01(t, P.t0 + 1.1, 0.35, 2.4), { rot: 0.2 })
      sparkles(x, t, 870, 780, P.t0 + 1.2, 6, 120, 0.3)
      L(x, 790, 1140, 'HYDRATED. PROUD.', pop01(t, P.t0 + 1.6, 0.3, 2.2), SKYB, -0.04, 30)
    } },
  { sign: S, cap: 'Hard day? Still showed up. | *Huge.*', mood: lt => lt > 1.3 ? 'sparkle' : 'sleepy', star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'PILLOW', 800, 1060, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'TROPHY', 800, 820, 20 * pop01(t, P.t0 + 1.0, 0.35, 2.2))
      sparkles(x, t, 800, 820, P.t0 + 1.1, 7, 150, 0.6)
      L(x, 800, 640, 'GOT UP ANYWAY', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Trusted someone a little? | *Big deal, actually.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), op = ease.outCubic(prog(lt, 0.9, 1.4))
      if (k > 0.01) { x.save(); x.fillStyle = '#fff1b0'; x.globalAlpha = 0.7 * op; x.fillRect(800 - 105, 870 - 150, 40 * op + 8, 300); x.restore() }
      bits(x, 'DOORX', 800 + 22 * op, 870, 30 * k, { sx: 1 - 0.18 * op })
      L(x, 800, 1110, 'DOOR: OPEN A CRACK', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Said how you feel? | *So brave.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 760, "i'm sad, kinda", pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
      L(x, 800, 960, 'FEELINGS: SAID ALOUD', pop01(t, P.t0 + 1.1, 0.3, 2.2), PINK, -0.04, 28)
      hearts(x, t, 600, 1100, P.t0 + 1.3, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Read the text once. | *Not twelve times.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 870, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'NEW TEXT', headCol: LAV, lines: [['see you at 6!', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2)]], size: 24 })
      swapLabel(x, 800, 1130, lt, 1.2, 'REREADS: 12', 'REREADS: 1', { size: 34, fromBg: STEEL, toBg: MINT })
    } },
  { sign: S, cap: 'Laughed out loud | in public? *Iconic.*', mood: 'sparkle', star: ST, hops: [0.8, 1.2],
    front(x, t, lt, P, F) {
      const fall = ease.inCubic(prog(lt, 0.6, 1.1))
      bits(x, 'SHADES', F.x + lerp(0, 120, fall), F.cy - 20 + lerp(0, 230, fall), 12 * pop01(t, P.t0 + 0.05, 0.2, 2), { rot: fall * 0.8 })
      bubble(x, 800, 700, 'HA HA HA', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 46, tail: 'bl' })
      L(x, 800, 960, 'MYSTERIOUS: PAUSED', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: S, cap: 'Dropped one grudge? | *Throw a party.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 360, head: 'GRUDGES', headBg: RED, lines: ['the 2009 thing', 'that one email', 'the cake incident', '…more'], size: 26 })
      const s = clamp((lt - 0.9) / 0.3)
      if (s > 0) { x.save(); x.translate(800, 860); x.rotate(-0.04); x.strokeStyle = RED; x.lineWidth = 8; x.lineCap = 'round'; x.beginPath(); x.moveTo(-120, -55 + 35 * 1.35); x.lineTo(-120 + 240 * s, -55 + 35 * 1.35); x.stroke(); x.restore() }
      confetti(x, t, 800, 820, P.t0 + 1.3)
      L(x, 800, 1110, 'GRUDGES: ONE FEWER', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 28)
    } },
  { sign: S, cap: 'Tiny steps | *still count.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) bits(x, 'STAR5', 600 + i * 72, 1060 - i * 66, 9 * pop01(t, P.t0 + 0.3 + i * 0.25, 0.3, 2.2))
      L(x, 800, 690, 'STEP BY STEP', pop01(t, P.t0 + 1.6, 0.3, 2.2), LAV, -0.04, 32)
      sparkles(x, t, 890, 800, P.t0 + 1.6, 6, 110, 0.5)
    } },
]

const F = makeFilm({
  id: 'r2a0737', key: 'F', accent: ACC, solo: S, ending: 'lesson',
  title: 'Scorpio, celebrate | *the small wins.*',
  cameos: CAMEOS,
  group: { cap: 'Quietly | *winning.*', mood: 'sparkle' },
  lesson: { text: 'Small wins | are *still wins.*', chip: 'WINS: CELEBRATED' },
  last: { text: 'Scorpio smiled. | *We all saw.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
