// r2t0440: star_talk, SOLO, "Mad Tauruses | *be like.*" (signs3kit social cut, music: lofi · F). Ending: lesson.
// One sign the whole film (makeFilm solo mode, 9 cards), each the most extreme (and lovable) mad Taurus:
//   3.6–37.8   furious, still finished dessert · silent for three business days · won't move, literally · a grudge from
//              kindergarten · angry-gardened, forty tomatoes · "not mad", ate your leftovers · snorted like an actual bull
//              · rechecked your compatibility · you said sorry, they want it in writing
//  37.8        "Slow to anger. | *Slower to forget.*"   41.0 LESSON: "A mad Taurus | *still loves you.*"  GRUDGE: RELEASED
//  46.9        "Peace offering? | *Bring snacks.*"
import {
  makeFilm, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import {
  L, at, sheet, buddy, steam, drawBits, clamp, prog, ease, lerp,
  CAKE, CAKE_C, COUCH, COUCH_C, TOMATO, TOMATO_C, PLANT, PLANT_C, LETTER, LETTER_C, BOWL, BOWL_C,
  RED, CREAM, ORANGE, TEAL, WOOD, GREEN,
} from './props.js'

const LEAF = '#7fd08a'
/** a three-day calendar strip with the days crossed off */
function days(x, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  const D = ['MON', 'TUE', 'WED']
  D.forEach((d, i) => {
    const px = -120 + i * 120
    x.fillStyle = INK; x.fillRect(px - 54, -74, 108, 148); x.fillStyle = CREAM; x.fillRect(px - 48, -68, 96, 136)
    x.fillStyle = RED; x.fillRect(px - 48, -68, 96, 34); x.fillStyle = CREAM; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(d, px, -50)
    x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.fillText('…', px, 14)
    if (i < n) { x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.moveTo(px - 36, -20); x.lineTo(px + 36, 50); x.moveTo(px + 36, -20); x.lineTo(px - 36, 50); x.stroke() }
  })
  x.restore()
}

const S = 'taurus'
const CAMEOS = [
  { sign: S, cap: 'Furious. | *Still finished dessert.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P, F) {
      steam(x, t, F.x, F.top - 20, { n: 4, alpha: lt < 1.3 ? 1 : 0.2 })
      const eat = clamp((lt - 0.4) / 1.0) * 0.8
      if (P.k > 0.3) { x.fillStyle = INK; x.beginPath(); x.ellipse(790, 1000, 176, 36, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = CREAM; x.beginPath(); x.ellipse(790, 996, 166, 28, 0, 0, Math.PI * 2); x.fill() }
      x.save(); x.beginPath(); x.rect(600, 760 + eat * 260, 400, 400); x.clip()
      drawBits(x, CAKE, CAKE_C, 790, 900, 18 * at(t, P, 0.15))
      x.restore()
      L(x, 790, 1120, 'PLATE: CLEAN', at(t, P, 1.4), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Went silent. | For *three business days.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      days(x, 790, 860, at(t, P, 0.15), Math.floor(clamp((lt - 0.4) / 1.2) * 3))
      L(x, 790, 640, 'OUT OF OFFICE', at(t, P, 0.4), SKYB, -0.04, 32)
    } },
  { sign: S, cap: 'Won’t move. | *Literally.*', mood: 'squint', look: [0, 0], star: { x: -60, y: -30 },
    back(x, t, lt, P) { drawBits(x, COUCH, COUCH_C, 480, 1000, 30 * at(t, P, 0.05)) },
    front(x, t, lt, P) {
      const tug = Math.max(0, Math.sin(t * 9)) * 10 * clamp(lt - 0.6)
      buddy(x, t, 'aries', 820 + tug, 920, 190, at(t, P, 0.4), { mood: 'wide', look: [-1, 0], seed: 95 })
      L(x, 540, 640, 'NOT. MOVING.', at(t, P, 1.2), RED, -0.04, 38, CREAM)
    } },
  { sign: S, cap: 'Holds a grudge | from *kindergarten.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 790, 860, at(t, P, 0.15), { w: 330, h: 360, head: 'GRUDGES', headCol: RED, size: 24, rows: [
        ['the crayon (’04)', INK, at(t, P, 0.4)], ['the nap mat', INK, at(t, P, 0.7)], ['juice box #2', INK, at(t, P, 1.0)], ['…ongoing', '#6b62a8', at(t, P, 1.3)],
      ] })
    } },
  { sign: S, cap: 'Angry-gardened. | Planted *forty tomatoes.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PLANT, PLANT_C, 790, 960, 18 * at(t, P, 0.15))
      const n = Math.floor(clamp((lt - 0.4) / 1.4) * 14)
      for (let i = 0; i < n; i++) drawBits(x, TOMATO, TOMATO_C, 640 + (i % 5) * 75, 640 + Math.floor(i / 5) * 70 + 6 * Math.sin(i), 6)
      L(x, 790, 1140, 'RAGE HARVEST', at(t, P, 1.5), LEAF, 0.04, 32)
    } },
  { sign: S, cap: '“I’m not mad.” | *Ate your leftovers.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'i’m not mad.', at(t, P, 0.2, 0.25), { size: 42, tail: 'bl' })
      const eat = clamp((lt - 0.6) / 0.9)
      drawBits(x, BOWL, { ...BOWL_C, P: eat > 0.5 ? BOWL_C.B : PINK, W: eat > 0.8 ? BOWL_C.B : CREAM }, 790, 940, 20 * at(t, P, 0.4))
      L(x, 790, 1120, 'YOURS. WAS.', at(t, P, 1.4), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Snorted. | *Like an actual bull.*', mood: 'squint', look: [1, 0], star: { x: -170 }, hops: [0.9],
    front(x, t, lt, P, F) {
      if (lt > 0.8) { steam(x, t * 1.6, F.x + 70, F.cy + 40, { n: 5, spread: 30 }); steam(x, t * 1.6 + 0.3, F.x - 70, F.cy + 40, { n: 5, spread: 30 }) }
      L(x, 790, 720, 'HMPH.', at(t, P, 0.9), RED, 0.05, 56, CREAM)
      bubble(x, 790, 1060, '(the neighbours heard)', at(t, P, 1.5, 0.25), { size: 32, tail: 'bl' })
    } },
  { sign: S, cap: 'Rechecked your | *compatibility.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 790, 860, at(t, P, 0.15), { w: 340, h: 300, head: '✦ COMPATIBILITY', headCol: LAV, size: 26, rows: [
        ['TAURUS + YOU', INK, at(t, P, 0.4)], [lt > 1.3 ? 'still a match.' : 'recalculating…', lt > 1.3 ? '#2a8a4a' : '#6b62a8', at(t, P, 0.7)],
      ] })
      L(x, 790, 1080, 'UGH. FINE.', at(t, P, 1.4), MINT, 0.04, 34)
    } },
  { sign: S, cap: 'You said sorry. | They want it *in writing.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.5],
    front(x, t, lt, P) {
      drawBits(x, LETTER, LETTER_C, 790, 860, 18 * at(t, P, 0.2), { rot: 0.05 })
      L(x, 790, 640, 'SIGNED. NOTARISED.', at(t, P, 0.9), GOLD, -0.04, 30)
      hearts(x, t, 790, 820, P.t0 + 1.5, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 9 })
    } },
]

const F = makeFilm({
  id: 'r2t0440', key: 'F', accent: LEAF, solo: S, ending: 'lesson',
  title: 'Mad Tauruses | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Slow to anger. | *Slower to forget.*', mood: 'squint' },
  lesson: { text: 'A mad Taurus | *still loves you.*', chip: 'GRUDGE: RELEASED' },
  last: { text: 'Peace offering? | *Bring snacks.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
