// r2a0440: star_advice, ADVICE ROLL CALL, "Each sign’s | *travel buddy.*" (signs3kit social cut, music: lofi · G). Ending: group.
//   twelve signs, each with the travel buddy who balances them (a small second star) and one light gag:
//   ♈ a Libra, reads the map · ♉ a Cancer, snacks for two · ♊ a Sagittarius, endless detours · ♋ a Taurus, cosy hotels only
//   · ♌ an Aries, first in every line · ♍ a Capricorn, laminated itinerary · ♎ a Gemini, talk the whole flight · ♏ a Pisces,
//   midnight beach walks · ♐ a Leo, bigger adventures · ♑ a Virgo, zero missed trains · ♒ a Libra, galleries all
//   day · ♓ a Scorpio, sunset tears, shared
//  49.2   GROUP ending: "Pack light. | *Bring your person.*"  (a suitcase lands over the group photo)
import {
  makeFilm, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import {
  L, at, sheet, clock, buddy, drawBits, clamp, prog, ease, lerp,
  MAP, MAP_C, SUITCASE, suitcaseCols, FRIES, FRIES_C, BED, BED_C, PLANE, PLANE_C, SUN, SUN_C, MOON, MOON_C, CAMERA, CAMERA_C,
  RED, CREAM, ORANGE, TEAL, WOOD, GREEN,
} from './props.js'

const SEA = '#6fd6ff'
const TICKET = (x, cx, cy, k, text, bg = GOLD) => {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -56, 300, 112); x.fillStyle = bg; x.fillRect(-144, -50, 288, 100)
  x.fillStyle = INK; for (let i = 0; i < 6; i++) x.fillRect(70, -44 + i * 16, 4, 8)
  x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, -36, 2)
  x.restore()
}
/** the main star on the left, the buddy on the right */
const B = (x, t, id, P, lt, o = {}) => buddy(x, t, id, o.x ?? 800, o.y ?? 960, o.s ?? 200, at(t, P, o.at ?? 0.35, 0.35, 2), { mood: o.mood ?? (lt > 1.2 ? 'heart' : 'happy'), look: [-1, 0], seed: 100 + P.i, hops: [P.t0 + 1.4] })

const CAMEOS = [
  { sign: 'aries', cap: 'A Libra. | They’ll *read the map.*', mood: 'wide', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      B(x, t, 'libra', P, lt)
      drawBits(x, MAP, MAP_C, 790, 690, 20 * at(t, P, 0.8), { rot: 0.06 })
      L(x, 800, 1150, 'THIS WAY, ARIES', at(t, P, 1.4), PINK, 0.04, 30)
    } },
  { sign: 'taurus', cap: 'A Cancer. | *Snacks for two.*', mood: 'heart', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      B(x, t, 'cancer', P, lt)
      drawBits(x, FRIES, FRIES_C, 560, 690, 12 * at(t, P, 0.8))
      drawBits(x, FRIES, FRIES_C, 820, 690, 12 * at(t, P, 1.0))
      L(x, 690, 1150, 'ROAD SNACKS: SORTED', at(t, P, 1.4), GOLD, 0.04, 30)
    } },
  { sign: 'gemini', cap: 'A Sagittarius. | *Endless detours.*', mood: 'sparkle', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      B(x, t, 'sagittarius', P, lt)
      L(x, 800, 680, '“WAIT, WHAT’S THAT?”', at(t, P, 0.9), '#ffe35a', -0.04, 28)
      L(x, 690, 1150, 'ETA: WHO KNOWS', at(t, P, 1.4), ORANGE, 0.04, 30)
    } },
  { sign: 'cancer', cap: 'A Taurus. | *Cosy hotels only.*', mood: 'sleepy', look: [1, 0], star: { x: -170, y: 20 },
    back(x, t, lt, P) { drawBits(x, BED, BED_C, 560, 1030, 30 * at(t, P, 0.1)) },
    front(x, t, lt, P) {
      B(x, t, 'taurus', P, lt, { mood: 'sleepy', y: 900, s: 190 })
      L(x, 690, 640, 'CHECK-OUT: NEVER', at(t, P, 1.3), LAV, -0.04, 30)
    } },
  { sign: 'leo', cap: 'An Aries. | *First in every line.*', mood: 'sparkle', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      B(x, t, 'aries', P, lt, { mood: 'wide' })
      TICKET(x, 690, 680, at(t, P, 0.8), 'QUEUE #1')
      L(x, 690, 1150, 'FRONT ROW. ALWAYS.', at(t, P, 1.4), RED, 0.04, 30, CREAM)
    } },
  { sign: 'virgo', cap: 'A Capricorn. | The itinerary’s *laminated.*', mood: 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      B(x, t, 'capricorn', P, lt, { mood: 'sparkle', x: 820, y: 1000, s: 170 })
      sheet(x, 690, 720, at(t, P, 0.8), { w: 300, h: 210, head: 'DAY 1', headCol: '#b6e08a', size: 24, rot: 0.04, rows: [['7:00 museum', INK], ['7:42 museum 2', INK]] })
    } },
  { sign: 'libra', cap: 'A Gemini. | Talk *the whole flight.*', mood: 'sparkle', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      B(x, t, 'gemini', P, lt)
      drawBits(x, PLANE, PLANE_C, lerp(980, 640, ease.inOutCubic(prog(lt, 0.2, 1.4))), 640, 10 * at(t, P, 0.2), { rot: -0.08 })
      bubble(x, 700, 1150, 'and another thing!', at(t, P, 1.3, 0.25), { size: 34, tail: 'bc' })
    } },
  { sign: 'scorpio', cap: 'A Pisces. | *Midnight beach walks.*', mood: 'heart', look: [1, 0], star: { x: -200 },
    back(x, t, lt, P) {
      x.save(); x.globalAlpha = at(t, P, 0.1); x.fillStyle = INK; x.fillRect(110, 1084, 860, 6); x.fillStyle = '#3a6fd8'; x.fillRect(110, 1090, 860, 140); x.restore()
      drawBits(x, MOON, MOON_C, 690, 640 + 6 * Math.sin(t * 2), 12 * at(t, P, 0.6))
    },
    front(x, t, lt, P) { B(x, t, 'pisces', P, lt) } },
  { sign: 'sagittarius', cap: 'A Leo. | *Bigger adventures.*', mood: 'sparkle', look: [1, 0], star: { x: -200 }, hops: [1.2],
    front(x, t, lt, P) {
      B(x, t, 'leo', P, lt, { mood: 'sparkle' })
      drawBits(x, SUITCASE, suitcaseCols(ORANGE), 690, 700, 16 * at(t, P, 0.8), { rot: 0.1 })
      L(x, 690, 1150, 'NEXT STOP: EVERYWHERE', at(t, P, 1.4), GOLD, 0.04, 28)
    } },
  { sign: 'capricorn', cap: 'A Virgo. | *Zero missed trains.*', mood: 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      B(x, t, 'virgo', P, lt, { mood: 'sparkle' })
      clock(x, 690, 680, at(t, P, 0.8), 6, 58, 80)
      L(x, 690, 1150, 'TWO MINUTES EARLY', at(t, P, 1.4), SKYB, 0.04, 30)
    } },
  { sign: 'aquarius', cap: 'A Libra. | *Galleries all day.*', mood: 'sparkle', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      B(x, t, 'libra', P, lt)
      x.save(); x.globalAlpha = at(t, P, 0.8)
      x.fillStyle = INK; x.fillRect(590, 590, 200, 170); x.fillStyle = GOLD; x.fillRect(598, 598, 184, 154)
      x.fillStyle = '#2a2350'; x.fillRect(614, 614, 152, 122); x.fillStyle = PINK; x.fillRect(630, 660, 40, 60); x.fillStyle = SKYB; x.beginPath(); x.arc(720, 660, 28, 0, Math.PI * 2); x.fill()
      x.restore()
      L(x, 690, 1150, '“IT’S ABOUT FEELINGS”', at(t, P, 1.4), MINT, 0.04, 28)
    } },
  { sign: 'pisces', cap: 'A Scorpio. | *Sunset tears,* shared.', mood: 'heart', tears: lt => lt < 0.8 ? 1 : 3, look: [1, 0], star: { x: -200 },
    back(x, t, lt, P) { x.save(); x.beginPath(); x.rect(110, 480, 860, 740); x.clip(); drawBits(x, SUN, SUN_C, 690, lerp(640, 760, clamp(lt / 2.4)), 16 * at(t, P, 0.1)); x.restore() },
    front(x, t, lt, P) {
      const F = B(x, t, 'scorpio', P, lt, { mood: 'wide' })
      L(x, 690, 1150, 'SCORPIO: “NOT CRYING”', at(t, P, 1.4), LAV, 0.04, 28)
    } },
]

const F = makeFilm({
  id: 'r2a0440', key: 'G', accent: SEA, ending: 'group',
  title: 'Each sign’s | *travel buddy.*',
  cameos: CAMEOS,
  group: {
    cap: 'Pack light. | *Bring your person.*',
    moods: ['sparkle', 'heart', 'sparkle', 'sleepy', 'sparkle', 'happy', 'sparkle', 'heart', 'wide', 'happy', 'sparkle', 'heart'],
    draw(x, t, lt) {
      drawBits(x, SUITCASE, suitcaseCols(ORANGE), 540, 720 + 10 * Math.sin(t * 3), 14 * pop01(t, t - lt + 1.3, 0.35, 2.2), { rot: -0.05 })
      drawBits(x, PLANE, PLANE_C, lerp(-100, 1180, clamp((lt - 0.4) / 3.5)), 600, 9)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
