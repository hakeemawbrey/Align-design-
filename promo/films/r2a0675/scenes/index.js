// r2a0675: star_advice, ADVICE SOLO (leo), "Leo, protect | *your peace.*" (signs3kit social cut, music: lofi · G).
// One sign the whole way: nine gentle truths for a Leo who's always on, each with a warm reframe and one light gag.
// Ending: lesson.
//   spotlight off tonight · skipped the party (it survived) · stop reading the comments · let someone else host
//   · social battery low: sunbathe · someone dims your light: step away (the cloud drifts off) · one bad review
//   · a quiet night in · your real ones don't need a show (Aquarius)
//   group "Shine. Then *rest.*"  lesson "Your light lasts longer | *when you rest it.*"  GLOW: PROTECTED
//   last "Now go nap | *like royalty.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, confetti, zzz, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffb34a', S = 'leo', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'Spotlight off tonight? | *Stars rest too.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', look: [1, -1], star: ST,
    back(x, t, lt, P) {
      const on = lt < 1.0
      if (on) { x.save(); x.globalAlpha = 0.25; x.fillStyle = '#fff1b0'; x.beginPath(); x.moveTo(780, 680); x.lineTo(240, 1140); x.lineTo(520, 1140); x.closePath(); x.fill(); x.restore() }
    },
    front(x, t, lt, P) {
      drawBits(x, ['..YYYY..', '.YYYYYY.', 'YYYYYYYY', '...KK...', '...KK...', '...KK...', '..KKKK..'], { Y: lt < 1.0 ? '#ffe76a' : STEEL, K: INK }, 800, 760, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.4 })
      L(x, 800, 1060, 'LIGHTS: OFF DUTY', pop01(t, P.t0 + 1.2, 0.3, 2.2), LAV, 0.04, 32)
    } },
  { sign: S, cap: 'Skipped the party? | *It survived.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'PARTY UPDATE', headCol: PINK, lines: [['we miss u!', BONE, pop01(t, P.t0 + 0.7, 0.25, 2), false], ['still fun tho', BONE, pop01(t, P.t0 + 1.1, 0.25, 2), false], ['rest up!!', MINT, pop01(t, P.t0 + 1.5, 0.25, 2), false]] })
    } },
  { sign: S, cap: 'Stop reading the comments. | *You’re glowing.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 300, head: 'COMMENTS', headBg: STEEL, headInk: INK, lines: ['meh', 'ok i guess', '…'], size: 30, progress: lt < 1.2 ? clamp((lt - 0.3) / 0.6) : 1 })
      if (lt > 1.2) { x.save(); x.fillStyle = INK; x.fillRect(640, 700, 320, 320); x.restore(); L(x, 800, 860, 'CLOSED ✓', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, -0.04, 40) }
      sparkles(x, t, 380, 860, P.t0 + 1.4, 7, 170, 0.3)
    } },
  { sign: S, cap: 'Let someone else | *host this time.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, 'aries', 820, 930, 200, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'sparkle', look: [-1, 0], hops: [P.t0 + 0.9] })
      bubble(x, 800, 660, 'I got this!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, tail: 'bc' })
      L(x, 800, 1130, 'LEO: SEATED. SNACKING.', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: S, cap: 'Social battery low? | *Sunbathe.*', mood: lt => lt > 1.2 ? 'sparkle' : 'sleepy', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      bits(x, 'SUN', 800, 690, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: t * 0.3 })
      bits(x, 'BATT', 800, 940, 18 * pop01(t, P.t0 + 0.4, 0.3, 2))
      const f = clamp((lt - 0.6) / 1.2)
      x.save(); x.globalAlpha = pop01(t, P.t0 + 0.4, 0.3, 2); x.fillStyle = MINT; x.fillRect(700, 922, 180 * f, 36); x.restore()
      L(x, 800, 1110, 'CHARGING…', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, -0.04, 34)
    } },
  { sign: S, cap: 'Someone dims your light? | *Step away.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, -1], star: ST,
    front(x, t, lt, P, F) {
      const off = ease.inOutCubic(clamp((lt - 0.9) / 0.9))
      bits(x, 'CLOUD', lerp(F.x + 40, 860, off), lerp(F.cy - 150, 700, off), 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { alpha: 1 - off * 0.5 })
      L(x, 800, 1080, 'FORECAST: SUNNY', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 32)
      sparkles(x, t, F.x, F.cy, P.t0 + 1.6, 7, 160, 0.4)
    } },
  { sign: S, cap: 'One bad review? | *One opinion.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'too much sparkle', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, col: STEEL, tail: 'bl' })
      L(x, 800, 920, 'NOTED. IGNORED.', pop01(t, P.t0 + 1.1, 0.3, 2.2), MINT, -0.04, 34)
      L(x, 800, 1090, 'SPARKLE: KEPT', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  { sign: S, cap: 'Quiet night in? | *Still a big night.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -190, y: -20 },
    front(x, t, lt, P, F) {
      bits(x, 'PILLOW', F.x, F.cy + 120, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'CANDLE', 800, 900, 22 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 800, 660, 'GUESTS: JUST ME', pop01(t, P.t0 + 1.0, 0.3, 2.2), LAV, -0.04, 32)
      L(x, 800, 1120, 'VIBE: ROYAL', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  { sign: S, cap: 'Your real ones | *don’t need a show.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friend(x, t, 'aquarius', 810, 920, 210, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'happy', look: [-1, 0] })
      bubble(x, 810, 660, 'pajamas? perfect', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 34, tail: 'bc' })
      L(x, 810, 1130, '✦ BEST MATCH: CALM', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 28)
      hearts(x, t, 650, 880, P.t0 + 1.4, { n: 5, life: 1.6, spread: 220, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2a0675', key: 'G', accent: ACC, solo: S, ending: 'lesson',
  title: 'Leo, protect | *your peace.*',
  cameos: CAMEOS,
  group: { cap: 'Shine. | Then *rest.*', mood: 'sleepy' },
  lesson: { text: 'Your light lasts longer | *when you rest it.*', chip: 'GLOW: PROTECTED' },
  last: {
    text: 'Now go nap | *like royalty.*',
    draw(x, t, lt) {
      bits(x, 'PILLOW', 540, 1070, 24 * pop01(t, t - lt + 0.6, 0.35, 2))
      zzz(x, t, 720, 720, { alpha: clamp(lt - 0.9), size: 54 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
