// r2a0682: star_advice, ADVICE SOLO (pisces), "Pisces, dreams need | *a little plan.*" (signs3kit social cut, music: lofi · F).
// One sign the whole way: nine gentle nudges from dreaming to doing, each with a warm reframe and one light gag.
// Pisces cries in every card (happy, moved, overwhelmed: always a little).
// Ending: lesson.
//   write it down · one tiny step · daydream timer · a vision board (glitter allowed) · dip one toe in
//   · tell one friend (Capricorn brings a clipboard) · give the dream a day · drifted? recalculating · look how far
//   group "Big dreams. | *Soft steps.*"   lesson "Dream it. Then | *plan one piece.*"   last "The dream is real. | *So is the plan.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#b7a6ff', S = 'pisces', ST = { x: -190 }

/** a thought cloud with a little picture inside */
function dreamCloud(x, t, cx, cy, k, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; for (const [dx, dy, r] of [[-70, 10, 70], [0, -30, 86], [76, 8, 68], [0, 40, 70]]) { x.beginPath(); x.arc(dx, dy, r + 7, 0, Math.PI * 2); x.fill() }
  x.fillStyle = BONE; for (const [dx, dy, r] of [[-70, 10, 70], [0, -30, 86], [76, 8, 68], [0, 40, 70]]) { x.beginPath(); x.arc(dx, dy, r, 0, Math.PI * 2); x.fill() }
  x.fillStyle = BONE; x.beginPath(); x.arc(-130, 130, 18, 0, Math.PI * 2); x.fill(); x.beginPath(); x.arc(-165, 175, 10, 0, Math.PI * 2); x.fill()
  if (fn) fn()
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Big dream? | *Write it down first.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], tears: 2, star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 340, head: 'MY DREAM', headBg: ACC, headInk: INK, lines: ['open a little', 'bakery by', 'the sea'], size: 36, progress: prog(lt, 0.4, 1.4) })
      bits(x, 'PEN', 900, 1060, 14 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: -0.6 })
    } },
  { sign: S, cap: 'One tiny step today. | *Tiny counts.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], tears: 2, star: ST, hops: [1.4],
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) { x.fillStyle = INK; x.fillRect(620 + i * 90 - 4, 1100 - i * 70 - 4, 98, 78 + i * 70); x.fillStyle = [MINT, SKYB, LAV, PINK][i]; x.fillRect(620 + i * 90, 1100 - i * 70, 90, 70 + i * 70) }
      bits(x, 'SHOE', 665, 1060 - clamp((lt - 0.6) * 3) * 20, 9 * pop01(t, P.t0 + 0.5, 0.3, 2))
      L(x, 800, 700, 'STEP 1: DONE', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, -0.04, 38)
    } },
  { sign: S, cap: 'Lost in a daydream? | *Set a timer. Then fly.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', look: [1, -1], tears: 2, star: ST,
    front(x, t, lt, P) {
      dreamCloud(x, t, 800, 760, pop01(t, P.t0 + 0.2, 0.35, 2), () => { bits(x, 'BOAT', 0, 0, 10) })
      bits(x, 'CLOCK', 820, 1060, 12 * pop01(t, P.t0 + 1.0, 0.3, 2))
      L(x, 700, 1100, '10 MIN', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, -0.06, 32)
    } },
  { sign: S, cap: 'Make a vision board. | *Glitter allowed.*', mood: 'sparkle', look: [1, 0], tears: 2, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 860); x.rotate(-0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -190, 340, 380); x.fillStyle = WOODC; x.fillRect(-160, -180, 320, 360)
        x.restore()
      }
      bits(x, 'PHOTO', 740, 780, 12 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: -0.1 })
      bits(x, 'HOUSE', 870, 790, 14 * pop01(t, P.t0 + 0.7, 0.3, 2), { rot: 0.08 })
      bits(x, 'WAVE', 800, 960, 8 * pop01(t, P.t0 + 0.9, 0.3, 2))
      sparkles(x, t, 800, 860, P.t0 + 1.3, 9, 210, 0.2, [GOLD, PINK, SKYB])
      sparkles(x, t, 800, 860, P.t0 + 1.8, 9, 170, 1.0, [GOLD, LAV, BONE])
    } },
  { sign: S, cap: 'Scared to start? | *Dip one toe in.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 1], tears: 2, star: { x: -190, y: -40 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      x.save(); x.globalAlpha = k; x.fillStyle = '#3a6fd0'; x.fillRect(110, 1060, 860, 160); x.restore()
      bits(x, 'WAVE', 540, 1060, 12 * k)
      if (lt > 1.1) { x.save(); x.strokeStyle = '#d9f4ff'; x.lineWidth = 5; const r = 30 + (lt - 1.1) * 60; x.globalAlpha = clamp(1.4 - (lt - 1.1)); x.beginPath(); x.ellipse(350, 1080, r * 1.6, r * 0.4, 0, 0, Math.PI * 2); x.stroke(); x.restore() }
      L(x, 800, 760, 'WATER: OKAY ACTUALLY', pop01(t, P.t0 + 1.4, 0.3, 2.2), SKYB, 0.04, 30)
    } },
  { sign: S, cap: 'Tell one friend. | *Dreams love company.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], tears: 2, star: ST,
    front(x, t, lt, P) {
      friend(x, t, 'capricorn', 800, 950, 220, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'happy', look: [-1, 0], hops: [P.t0 + 1.3] })
      bits(x, 'CLIP', 900, 1000, 14 * pop01(t, P.t0 + 0.9, 0.3, 2), { rot: 0.2 })
      bubble(x, 800, 690, 'i’ll help!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 46, tail: 'bl' })
    } },
  { sign: S, cap: 'Give the dream | *a day of its own.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], tears: 2, star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 330, head: 'THIS WEEK', headBg: RED, lines: ['mon: work', 'wed: work', ['sat: DREAM', '#7a5cff']], size: 38, align: 'left', progress: prog(lt, 0.3, 1.1) })
      sparkles(x, t, 800, 960, P.t0 + 1.3, 7, 150, 0.4)
    } },
  { sign: S, cap: 'Drifted off course? | *Dreamers do.* Steer back.', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], tears: 2, star: ST,
    front(x, t, lt, P) {
      bits(x, 'MAP', 800, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04 })
      const b = lerp(-1, 0, ease.outCubic(prog(lt, 0.6, 1.4)))
      bits(x, 'BOAT', 800 + b * 110, 860 - b * 60, 9 * pop01(t, P.t0 + 0.5, 0.3, 2))
      swapLabel(x, 800, 1110, lt, 1.2, 'OFF COURSE', 'RECALCULATING…', { size: 32, fromBg: STEEL, toBg: MINT })
    } },
  { sign: S, cap: 'Look back. | *Look how far you came.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], tears: 2, star: ST, hops: [1.4],
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 380, head: 'DREAM PLAN', headBg: ACC, headInk: INK, lines: ['☑ wrote it', '☑ told a friend', '☑ day one', '☐ next bit'], size: 36, align: 'left', progress: prog(lt, 0.3, 1.5) })
      hearts(x, t, 800, 640, P.t0 + 1.6, { n: 5, life: 1.6, spread: 220, cell: 7, seed: 4 })
    } },
]
const WOODC = '#c98f5a'

const F = makeFilm({
  id: 'r2a0682', key: 'F', accent: ACC, solo: S, ending: 'lesson',
  title: 'Pisces, dreams | need *a little plan.*',
  cameos: CAMEOS,
  group: { cap: 'Big dreams. | *Soft steps.*', mood: 'heart' },
  lesson: { text: 'Dream it. Then | *plan one piece.*', chip: 'DREAM: IN PROGRESS' },
  last: {
    text: 'The dream is real. | *So is the plan.*',
    draw(x, t, lt) { sparkles(x, t, 540, 860, t - lt + 0.6, 10, 260, 0.3, [LAV, SKYB, GOLD]) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
