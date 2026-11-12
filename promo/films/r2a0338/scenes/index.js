// r2a0338: star_advice, ADVICE SOLO (aquarius), "How to encourage | *an Aquarius.*" (signs3kit social cut,
// music: lofi · C). Ending: callback (the little UFO from the documentary card comes back, proud).
//   weird idea: say "tell me more" · cheer the wobbly prototype · give them space, then a snack · make a tiny sign for
//   their cause · don't say "normal", say "iconic" · send the alien documentary · feeling far away: check in anyway
//   · an odd birth chart is the best part · remind them the future needs them
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, card, lines, phone, chart, BULB, BULB_C, RED, CREAM, ORANGE, GREY, PURP } from './props.js'

const ACC = '#6fc3ff'
const ROBOT = ['....A....', '..MMMMM..', '..MEMEM..', '..MMMMM..', 'MMMMMMMMM', 'M.MMRMM.M', '..MMMMM..', '..M...M..']
const ROBOT_C = { A: GOLD, M: '#9aa5c4', E: MINT, R: PINK }
const PLATE = ['..CCCCC..', '.CYCYCYC.', 'WWWWWWWWW', '.WWWWWWW.']
const PLATE_C = { C: '#c98f5a', Y: '#7a4a2e', W: CREAM }
const UFO = ['....GGG....', '...GWWWG...', '..GGGGGGG..', 'MMMMMMMMMMM', 'MYMMYMMYMMM', '.MMMMMMMMM.']
const UFO_C = { G: MINT, W: '#fff', M: '#9aa5c4', Y: GOLD }
const ROCKET = ['...R...', '..RWR..', '..WWW..', '..WBW..', '..WWW..', '.RWWWR.', 'RRWWWRR', '..OYO..', '...O...']
const ROCKET_C = { R: RED, W: CREAM, B: SKYB, O: ORANGE, Y: GOLD }
const beam = (x, cx, cy, h, a = 0.3) => { x.save(); x.globalAlpha = a; x.fillStyle = MINT; x.beginPath(); x.moveTo(cx - 40, cy); x.lineTo(cx + 40, cy); x.lineTo(cx + 110, cy + h); x.lineTo(cx - 110, cy + h); x.closePath(); x.fill(); x.restore() }

const S = 'aquarius', ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Wild new idea? | Say *“tell me more.”*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, -1], star: ST, hops: [1.3],
    front(x, t, lt, P, F) {
      drawBits(x, BULB, BULB_C, F.x + 10, F.top - 70, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 760, 'tell me more!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 44, tail: 'bc', col: MINT })
      if (lt > 1.4) L(x, 790, 1040, 'IDEA: SUPPORTED', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Cheer the prototype, | *wobbles and all.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, ROBOT, ROBOT_C, 800, 900, 26 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: Math.sin(t * 7) * 0.14 })
      L(x, 800, 640, 'V1: WOBBLY', pop01(t, P.t0 + 0.5, 0.3, 2), GREY, -0.04, 34)
      if (lt > 1.3) L(x, 800, 1120, 'SO PROUD', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, 0.05, 38)
    } },
  { sign: S, cap: 'Give them space. | *Then a snack.*', mood: lt => lt > 1.5 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 820, 760, 260, 150, pop01(t, P.t0 + 0.2, 0.35, 2), 0.04, x => lines(x, ['SPACE:', 'GIVEN'], { size: 36 }), SKYB)
      const d = ease.outCubic(prog(lt, 1.0, 1.6))
      drawBits(x, PLATE, PLATE_C, lerp(980, 640, d), 1060, 20 * pop01(t, P.t0 + 1.0, 0.25, 2))
      if (lt > 1.7) bubble(x, 820, 960, 'cookies?', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'They care about a cause? | *Make a tiny sign.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) { x.save(); x.fillStyle = INK; x.fillRect(796, 900, 16, 220 * k); x.fillStyle = '#7a4a2e'; x.fillRect(800, 900, 8, 220 * k); x.restore() }
      card(x, 804, 820, 300, 170, k, -0.05 + Math.sin(t * 4) * 0.04, x => lines(x, ['GO, YOU!', 'WE’RE WITH YOU'], { size: 32 }), '#ffe76a')
      if (lt > 1.3) hearts(x, t, 800, 740, P.t0 + 1.3, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Don’t say “normal.” | Say *“iconic.”*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const at = 0.9
      if (lt < at + 0.3) {
        L(x, 790, 860, 'NORMAL', pop01(t, P.t0 + 0.3, 0.3, 2), GREY, -0.04, 52)
        if (lt > at) { const p = clamp((lt - at) / 0.25); x.save(); x.strokeStyle = RED; x.lineWidth = 12; x.lineCap = 'round'; x.beginPath(); x.moveTo(660, 875); x.lineTo(660 + 260 * p, 845); x.stroke(); x.restore() }
      } else { L(x, 790, 860, 'ICONIC', pop01(t, P.t0 + at + 0.3, 0.3, 2.4), GOLD, 0.04, 60); sparkles(x, t, 790, 860, P.t0 + at + 0.35, 8, 200, 0.4) }
    } },
  { sign: S, cap: 'Send them alien videos. | *They’ll feel seen.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      card(x, 800, 860, 340, 260, pop01(t, P.t0 + 0.2, 0.35, 2), 0.03, x => {
        x.fillStyle = '#140c30'; x.fillRect(-150, -110, 300, 200)
        drawBits(x, UFO, UFO_C, 0, -40, 14)
        beam(x, 0, -10, 90, 0.35)
        lines(x, ['▶ PART 1 OF 9'], { size: 22, y: 112, font: MONO, weight: 700 })
      }, '#2a2350')
      if (lt > 1.4) bubble(x, 800, 640, 'how did you KNOW', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: S, cap: 'Seem far away? | *Check in anyway.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 800, 860, 1.2 * pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'FRIEND', headCol: LAV, rows: [['thinking of u', PINK, pop01(t, P.t0 + 0.6, 0.25, 2)], ['no reply needed', MINT, pop01(t, P.t0 + 1.0, 0.25, 2)], ['…thank you', SKYB, pop01(t, P.t0 + 1.7, 0.25, 2), true]] })
    } },
  { sign: S, cap: 'Their chart is unusual? | *Best part.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      chart(x, 800, 850, 150, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      if (lt > 1.2) L(x, 800, 1080, 'ONE OF A KIND', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 34)
      sparkles(x, t, 800, 850, P.t0 + 1.2, 8, 190, 0.2)
    } },
  { sign: S, cap: 'Remind them: | the *future needs them.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, -1], star: ST, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const up = ease.inCubic(prog(lt, 1.2, 2.4))
      drawBits(x, ROCKET, ROCKET_C, 800, lerp(940, 660, up), 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      if (lt > 1.2) { x.save(); x.fillStyle = ORANGE; for (let i = 0; i < 4; i++) { const ph = ((t * 3 + i / 4) % 1); x.globalAlpha = 1 - ph; x.fillRect(790 + Math.sin(i * 3) * 14, lerp(940, 660, up) + 110 + ph * 80, 16, 16) } x.restore() }
      if (lt > 1.5) L(x, 800, 1110, 'FUTURE: BRIGHTER', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0338', key: 'C', accent: ACC, solo: 'aquarius', ending: 'callback',
  title: 'How to encourage | *an Aquarius.*',
  cameos: CAMEOS,
  group: { cap: 'Different is | *the point.*', mood: 'heart' },
  last: {
    text: 'The aliens | *are proud too.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      const ux = 740 + Math.sin(t * 1.5) * 20
      if (lt > 0.8) beam(x, ux, 960, 260, 0.14 * clamp((lt - 0.8) * 3))
      if (k > 0.01) signChar(x, t, 'aquarius', 420, 1120, 270 * k, { mood: lt > 1.3 ? 'heart' : 'sparkle', seed: 7, look: [1, -1], hops: [t0 + 1.3, t0 + 2.0] })
      drawBits(x, UFO, UFO_C, ux, 930, 20 * pop01(t, t0 + 0.6, 0.4, 2))
      if (lt > 1.3) { label(x, ux, 800, 'PROUD OF YOU', pop01(t, t0 + 1.3, 0.3, 2.4)); hearts(x, t, ux, 1250, t0 + 1.4, { n: 5, life: 1.6, spread: 200, cell: 8, seed: 5 }) }
    },
  },
})
function label(x, cx, cy, text, k) { L(x, cx, cy, text, k, MINT, -0.04, 34) }
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
