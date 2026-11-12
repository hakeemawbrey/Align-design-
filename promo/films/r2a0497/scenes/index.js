// r2a0497: star_advice, ADVICE SOLO (aries), "Aries, patience | *looks good on you.*" (signs3kit social cut, music: lofi · F).
// Nine cards: a relatable Aries truth + a warm reframe, one light gag each. Ending: lesson.
//   reply in seconds (pauses are okay) · glare at the microwave · lead every group · the snail is winning
//   · want the plant grown now · skip the instructions · traffic roar (turn up the music) · love fast · loading bar
//   group "Fire, but | *make it cosy.*"   lesson "Your spark lasts. | No *rush* needed."   last "Still first. | *Just calmer.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ff6b5a', CREAM = '#fff4e2', RED = '#e23d4e', BROWN = '#8a4a2e', SLATE = '#9aa5c4', GREEN = '#2fc79a'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

function box(x, cx, cy, w, h, k, rot, fn, bg = '#2a2350') {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  fn && fn(); x.restore()
}
const FLAG = ['KRRRRRR.', 'KRRRRRRR', 'KRRRRRR.', 'K.......', 'K.......', 'K.......', 'K.......', 'K.......', 'K.......']
const SNAIL = ['....SSSS....', '...SsssSS...', '..SsSSssS...', '..SsSsSsS...', '..SssssSS..E', 'BBBBBBBBBBBE', 'BBBBBBBBBBB.']
const SNAIL_C = { S: '#ffb34a', s: '#c97a2a', B: '#c9a6ff', E: '#c9a6ff' }
const POT = ['.RRRRRRRR.', '.RRRRRRRR.', '..RRRRRR..', '..RRRRRR..', '...RRRR...']
const BOXF = ['KKKKKKKKKKKK', 'KBBBBBBBBBBK', 'KBBBBBBBBBBK', 'KBBWWWWWWBBK', 'KBBBBBBBBBBK', 'KBBBBBBBBBBK', 'KKKKKKKKKKKK']
const WHEEL = ['...KKKKK...', '..K.....K..', '.K..KKK..K.', 'K..K...K..K', 'KKKK.K.KKKK', 'K..K...K..K', '.K..KKK..K.', '..K.....K..', '...KKKKK...']

const S = 'aries'
const CAMEOS = [
  { sign: S, cap: 'You reply in seconds. | *Pauses are okay.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      box(x, 790, 860, 280, 400, pop01(t, P.t0 + 0.15, 0.3, 2), 0.04, () => {
        x.fillStyle = '#140c30'; x.fillRect(-124, -180, 248, 360)
        x.font = `800 30px ${INTER}`
        x.fillStyle = BONE; x.fillRect(-110, -150, 170, 54); x.fillStyle = INK; x.fillText('hey', -25, -122)
        const n = Math.min(4, Math.floor(clamp((lt - 0.3) / 1.0) * 4))
        for (let i = 0; i < n; i++) { x.fillStyle = ACC; x.fillRect(-40, -70 + i * 64, 150, 52); x.fillStyle = INK; x.fillText(['HEY!!', 'hi!', 'what’s up', '??'][i], 35, -44 + i * 64) }
      })
      L(x, 790, 610, 'REPLIED IN: 0.2s', pop01(t, P.t0 + 0.5, 0.3, 2.2), GOLD, 0.05, 30)
      L(x, 790, 1120, 'BREATHE. IT’S FINE.', pop01(t, P.t0 + 1.7, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'You glare at the microwave. | *Almost there.*', mood: lt => lt > 1.6 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      box(x, 790, 860, 330, 230, pop01(t, P.t0 + 0.15, 0.3, 2), 0.03, () => {
        x.fillStyle = '#140c30'; x.fillRect(-145, -95, 200, 190)
        x.fillStyle = 'rgba(255,227,107,0.25)'; x.fillRect(-135, -85, 180, 170)
        x.fillStyle = INK; x.fillRect(70, -95, 76, 50)
        const s = Math.max(0, 3 - Math.floor(lt * 1.4))
        x.fillStyle = MINT; x.font = `700 30px ${MONO}`; x.fillText(`0:0${s}`, 108, -70)
        x.fillStyle = SLATE; for (let i = 0; i < 3; i++) x.fillRect(84, -20 + i * 34, 48, 22)
      }, SLATE)
      L(x, 790, 1120, lt > 1.6 ? 'DING! ♡' : 'COME ON…', pop01(t, P.t0 + 0.6, 0.3, 2.2), lt > 1.6 ? GOLD : BONE, -0.04, 34)
    } },
  { sign: S, cap: 'You lead every group. | *Let someone try.*', mood: lt => lt > 1.4 ? 'happy' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.5],
    front(x, t, lt, P, F) {
      const pass = lt > 1.3
      drawBits(x, FLAG, { K: BROWN, R: ACC }, pass ? 800 : F.x + 130, pass ? 800 : F.cy - 60, 16 * pop01(t, P.t0 + 0.15, 0.3, 2))
      const k = pop01(t, P.t0 + 0.6, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 820, 990, 180 * k, { mood: pass ? 'sparkle' : 'neutral', look: [-1, 0], seed: 21, glyph: false, hops: pass ? [P.t0 + 1.4 * 1.29] : null })
      L(x, 790, 620, pass ? 'NEW LEADER: THEM' : 'LEADER (AGAIN)', pop01(t, P.t0 + 0.4, 0.3, 2.2), pass ? MINT : GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Slow walkers? | *The snail’s winning.*', mood: lt => lt > 1.4 ? 'happy' : 'eyeroll', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SNAIL, SNAIL_C, lerp(760, 820, clamp(lt / 2.4)), 940, 16 * pop01(t, P.t0 + 0.15, 0.3, 2))
      L(x, 790, 700, 'PACE: SNAIL', pop01(t, P.t0 + 0.5, 0.3, 2.2), LAV, 0.05, 36)
      bubble(x, 790, 1120, 'enjoy the stroll', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'You want it now. | *Good things grow.*', mood: lt => lt > 1.6 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, POT, { R: '#c9653a' }, 790, 1050, 18 * k)
      const g = clamp((lt - 0.5) / 1.4)
      if (k > 0.5) {
        x.fillStyle = INK; x.fillRect(782, 1000 - 220 * g - 4, 20, 220 * g + 4); x.fillStyle = GREEN; x.fillRect(786, 1000 - 220 * g, 12, 220 * g)
        if (g > 0.5) { x.fillStyle = GREEN; x.fillRect(800, 1000 - 160 * g, 50, 22); x.fillRect(734, 1000 - 110 * g, 50, 22) }
        if (g >= 1) drawBits(x, ['.P.P.', 'PPYPP', '.PPP.', '..P..'], { P: PINK, Y: GOLD }, 792, 770, 16)
      }
      bubble(x, 560, 640, 'grow FASTER', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 32, col: ACC, tail: 'br' })
    } },
  { sign: S, cap: 'You skip the instructions. | *Asking is brave too.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BOXF, { K: INK, B: '#c98f5a', W: CREAM }, 790, 900, 20 * pop01(t, P.t0 + 0.15, 0.3, 2))
      L(x, 790, 680, 'SPARE SCREWS: 9', pop01(t, P.t0 + 0.6, 0.3, 2.2), GOLD, 0.04, 34)
      bubble(x, 790, 1110, 'um… help?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Traffic makes you roar. | *Turn up the music.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, WHEEL, { K: '#c9c9d8' }, 790, 900, 22 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: Math.sin(t * 3) * 0.2 })
      if (lt < 1.3) L(x, 790, 680, 'BEEP BEEP', pop01(t, P.t0 + 0.4, 0.3, 2.2), RED, 0.05, 40)
      else { notes(x, t, 790, 820, { n: 5, cell: 7, col: GOLD, seed: 3 }); L(x, 790, 680, 'VIBES: RESTORED', 1, MINT, 0.05, 34) }
    } },
  { sign: S, cap: 'You love fast. | *Let them catch up.*', mood: 'heart', look: [1, 0], star: { x: -170 }, hops: [0.6, 1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 820, 980, 170 * k, { mood: lt > 1.5 ? 'heart' : 'happy', look: [-1, 0], seed: 23, glyph: false })
      L(x, 790, 650, 'YOU: IN LOVE', pop01(t, P.t0 + 0.3, 0.3, 2.2), PINK, 0.05, 32)
      L(x, 820, 790, lt > 1.5 ? 'THEM: GETTING THERE' : 'THEM: HI?', pop01(t, P.t0 + 0.8, 0.3, 2.2), BONE, -0.04, 28)
      if (lt > 1.5) hearts(x, t, 820, 900, P.t0 + 1.5 * 1.29, { n: 4, life: 1.4, spread: 140, cell: 7, seed: 6 })
    } },
  { sign: S, cap: 'Loading bars test you. | *It’s almost done.*', mood: lt => lt > 1.7 ? 'sparkle' : 'eyeroll', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      box(x, 790, 860, 330, 170, pop01(t, P.t0 + 0.15, 0.3, 2), 0.03, () => {
        const p = lt > 1.7 ? 100 : 99
        x.fillStyle = BONE; x.font = `700 28px ${MONO}`; x.fillText(`LOADING ${p}%`, 0, -42)
        x.fillStyle = INK; x.fillRect(-140, 0, 280, 44); x.fillStyle = '#140c30'; x.fillRect(-134, 6, 268, 32)
        x.fillStyle = MINT; x.fillRect(-134, 6, 268 * p / 100, 32)
      })
      L(x, 790, 1060, lt > 1.7 ? 'DONE! SEE?' : 'STILL 99%…', pop01(t, P.t0 + 0.5, 0.3, 2.2), lt > 1.7 ? GOLD : SLATE, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0497', key: 'F', accent: ACC, solo: S,
  title: 'Aries, patience | looks *good on you.*',
  cameos: CAMEOS,
  ending: 'lesson',
  group: { cap: 'Fire, but | *make it cosy.*', mood: 'sparkle' },
  lesson: { text: 'Your spark lasts. | No *rush* needed.', chip: 'PATIENCE: UNLOCKED' },
  last: { text: 'Still first. | *Just calmer.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
