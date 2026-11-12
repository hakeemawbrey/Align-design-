// r2t0458: star_talk, SOLO (leo), "Leos at a party | *be like.*" (signs3kit social cut, music: lofi · G).
// Ending: lesson (LESSON UNLOCKED, then the last line). No match card.
//   arrived late with an entrance theme · brought a red carpet to a house party · a speech at someone else's party
//   · taught the room their dance · group photo: front and centre, twice · made the name tags (their face) · went to
//   the bathroom, the party paused · asked everyone's sign, ranked them · party ended, Leo took a bow.
//   group "Whose party? | Leo's now."  lesson "Love a Leo's big entrance. | They light up the room."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ffc23d', CREAM = '#fff4e2', RED = '#e23d4e', SLATE = '#9aa5c4'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

const CAMERA = ['..KKK.........', 'KKKKKKKKKKKKKK', 'KSSSSSKKKKSSSK', 'KSSSSKWWWKSSSK', 'KSSSKWBBWKSSSK', 'KSSSKWBBWKSSSK', 'KSSSSKWWWKSSSK', 'KSSSSSKKKSSSSK', 'KKKKKKKKKKKKKK']
const CAMERA_C = { K: INK, S: SLATE, W: CREAM, B: SKYB }

/** a red carpet rolling out under the star */
function carpet(x, k, lt) {
  if (k <= 0.01) return
  const r = ease.outCubic(prog(lt, 0.2, 0.9))
  x.save(); x.globalAlpha *= k
  x.fillStyle = INK; x.fillRect(250, 1050, 620 * r + 10, 70)
  x.fillStyle = RED; x.fillRect(255, 1055, 620 * r, 60)
  x.fillStyle = GOLD; x.fillRect(255, 1058, 620 * r, 6); x.fillRect(255, 1106, 620 * r, 6)
  if (r < 1) { x.fillStyle = '#a82a38'; x.beginPath(); x.arc(255 + 620 * r, 1085, 34, 0, Math.PI * 2); x.fill() }
  x.restore()
}
/** a HELLO name tag with a little Leo star on it */
function nameTag(x, t, cx, cy, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-126, -86, 252, 172)
  x.fillStyle = RED; x.fillRect(-120, -80, 240, 160)
  x.fillStyle = CREAM; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('HELLO', 0, -56)
  x.fillStyle = CREAM; x.fillRect(-106, -32, 212, 100)
  x.restore()
  signChar(x, t, 'leo', cx, cy + 22 * k, 92 * k, { pop: 1, seed: 50 + cx, glyph: false, mood: 'wink' })
}

const S = 'leo', ST = { x: -170 }
const CAMEOS = [
  // 1 · fashionably late, with a theme
  { sign: S, cap: 'Arrived an hour late. | *With a theme song.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.5, 1.0],
    front(x, t, lt, P) {
      L(x, 790, 660, 'NOW ENTERING: LEO', pop01(t, P.t0 + 0.2, 0.3, 2.2), GOLD, -0.04, 34)
      notes(x, t, 790, 1060, { n: 5, cell: 13, col: ACC, alpha: clamp((lt - 0.3) * 2) })
      sparkles(x, t, 370, 860, P.t0 + 0.5, 8, 200, 0.3)
    } },
  // 2 · a red carpet, house party
  { sign: S, cap: 'Brought a red carpet. | To *a house party.*', mood: 'sparkle', look: [1, 0], star: { x: -170, y: -30 },
    back(x, t, lt, P) { carpet(x, pop01(t, P.t0 + 0.1, 0.3, 2), lt) },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'no photos… | ok, some photos', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  // 3 · a speech at someone else's party
  { sign: S, cap: 'Gave a speech. | At *someone else’s* party.', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'thank you all | for coming', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 790, 960, 'NOT THEIR PARTY', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, 0.04, 36)
    } },
  // 4 · taught the room their dance
  { sign: S, cap: 'Taught the whole room | *their signature dance.*', mood: 'sparkle', look: lt => [Math.sin(lt * 6), 0], star: ST, hops: [0.5, 0.9, 1.3, 1.7],
    front(x, t, lt, P) {
      L(x, 790, 700, 'STEP 1: ADMIRE LEO', pop01(t, P.t0 + 0.3, 0.3, 2), GOLD, -0.04, 32)
      L(x, 790, 820, 'STEP 2: CLAP', pop01(t, P.t0 + 0.8, 0.3, 2), MINT, 0.04, 32)
      L(x, 790, 940, 'STEP 3: SEE STEP 1', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, -0.04, 32)
    } },
  // 5 · group photo
  { sign: S, cap: 'Group photo? | Front, centre, *twice.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CAMERA, CAMERA_C, 800, 860, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.06 })
      for (const fl of [0.9, 1.5]) { const d = lt - fl; if (d > 0 && d < 0.25) { x.save(); x.globalAlpha = 0.6 * (1 - d / 0.25); x.fillStyle = '#fff'; x.fillRect(110, 480, 860, 740); x.restore() } }
      L(x, 790, 1100, 'SHOTS OF LEO: 212', pop01(t, P.t0 + 1.6, 0.3, 2.4), ACC, 0.04, 32)
    } },
  // 6 · the name tags
  { sign: S, cap: 'Made the name tags. | All *their face.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      nameTag(x, t, 700, 760, pop01(t, P.t0 + 0.2, 0.3, 2), -0.08)
      nameTag(x, t, 880, 860, pop01(t, P.t0 + 0.5, 0.3, 2), 0.07)
      nameTag(x, t, 740, 1010, pop01(t, P.t0 + 0.8, 0.3, 2), 0.03)
    } },
  // 7 · went to the bathroom
  { sign: S, cap: 'Stepped out for a minute. | The party *paused.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      L(x, 790, 780, '❚❚ PAUSED', pop01(t, P.t0 + 0.4, 0.3, 2.2), BONE, -0.04, 56)
      bubble(x, 790, 1010, 'we’ll wait!!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
    } },
  // 8 · Align: asked everyone's sign
  { sign: S, cap: 'Asked everyone’s sign. | *Ranked them.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const ROWS = [['#1  LEO', GOLD], ['#2  leo again', MINT], ['#3  everyone', SKYB]]
      ROWS.forEach(([s, c], i) => L(x, 790, 700 + i * 120, s, pop01(t, P.t0 + 0.3 + i * 0.45, 0.3, 2.2), c, i % 2 ? 0.04 : -0.04, 36))
    } },
  // 9 · took a bow
  { sign: S, cap: 'The party ended. | Leo *took a bow.*', mood: 'sparkle', look: [1, 0], star: ST, squash: lt => lt > 0.9 && lt < 1.6 ? 0.12 : 0,
    front(x, t, lt, P) {
      L(x, 790, 760, 'ENCORE?', pop01(t, P.t0 + 1.0, 0.3, 2.4), PINK, -0.06, 52)
      sparkles(x, t, 370, 860, P.t0 + 1.2, 9, 220, 0.2)
      hearts(x, t, 790, 1000, P.t0 + 1.4, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2t0458', key: 'G', accent: ACC, solo: S,
  title: 'Leos at a party | *be like.*',
  cameos: CAMEOS,
  ending: 'lesson',
  group: { cap: 'Whose party? | *Leo’s now.*', mood: 'sparkle' },
  lesson: { text: 'Love a Leo’s big entrance. | They *light up the room.*', chip: 'PARTY: STARTED' },
  last: { text: 'The party starts | *when Leo arrives.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
