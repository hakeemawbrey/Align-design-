// r2t0614: star_talk, SOLO (pisces), "Pisces vs. | *a sad movie.*" (~51 s vertical, signs3kit social cut, music: lofi · D).
// One sign the whole film (makeFilm solo mode, 9 cards; Pisces cries in every one). Ending: lesson.
//   cried at the trailers for a different movie · brought one tissue, needed the box · the dog was fine, cried anyway
//   · the villain got a backstory, Pisces adopted him · paused it to text the main character · cried at the catering credit
//   · friend said "it's fake", Pisces gasped · five stars, never again · happy ending, cried harder
//   group "Zero dry eyes. | *Zero regrets.*"   lesson "Feeling it all | *is the point.*" TEARS: WORTH IT
//   last "Next up: a cartoon. | *Same result.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, phone, friend, bits, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff', S = 'pisces', ST = { x: -190 }
const POPCORN = ['.W.W.W.W.', 'WWWWWWWWW', 'WWYWWWYWW', 'RWRWRWRWR', 'RWRWRWRWR', '.RWRWRWR.', '.RWRWRWR.', '..RWRWR..']
const POP_C = { W: CREAM, Y: '#ffe27a', R: RED }
const DOG = ['..BBBBB....', '.KBWBWBK...', 'KKBBBBBKK..', 'KK.BKB.KK..', '..BBBBB...T', '.BBBBBBBB.T', '.BBBBBBBBBT', '.BBBBBBBBB.', '.B.B...B.B.']

/** a cinema screen with a tiny scene and a progress bar */
function screen(x, cx, cy, k, lt, txt, col = '#3a5a9a') {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-160, -100, 340, 220)
  x.fillStyle = INK; x.fillRect(-176, -116, 352, 224); x.fillStyle = col; x.fillRect(-166, -106, 332, 204)
  x.fillStyle = BONE; x.font = `700 30px 'Space Mono', monospace`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, -10)
  x.fillStyle = STEEL; x.fillRect(-140, 70, 280, 8); x.fillStyle = PINK; x.fillRect(-140, 70, 280 * clamp(lt / 2.4), 8)
  x.restore()
}

const tears = lt => lt < 1.0 ? 2 : 3
const CAMEOS = [
  { sign: S, cap: 'Cried at the trailers. | *For a different movie.*', mood: 'wide', tears, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      screen(x, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), lt, 'COMING SOON')
      L(x, 800, 1080, 'MAIN FILM: NOT STARTED', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: S, cap: 'Brought one tissue. | *Needed the whole box.*', mood: 'wide', tears, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'TISSUE', 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1080, `TISSUES USED: ${Math.min(84, 1 + Math.floor(lt * lt * 16))}`, pop01(t, P.t0 + 0.5, 0.3, 2), SKYB, -0.04, 34)
    } },
  { sign: S, cap: 'The dog was fine. | *Cried anyway.*', mood: lt => lt > 1.1 ? 'heart' : 'wide', tears, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, DOG, { K: '#6b4a3a', B: '#e8b36a', W: '#ffffff', T: '#e8b36a' }, 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1080, 'DOG: FINE (CONFIRMED)', pop01(t, P.t0 + 0.8, 0.3, 2.2), MINT, 0.04, 30)
      hearts(x, t, 800, 760, P.t0 + 1.2, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'The villain got a backstory. | *Pisces adopted him.*', mood: 'heart', tears, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      screen(x, 800, 800, pop01(t, P.t0 + 0.2, 0.3, 2), lt, 'VILLAIN, AGE 6', '#5a3a7a')
      bubble(x, 800, 1060, 'he just needed | a hug', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, col: ACC, tail: 'bl' })
    } },
  { sign: S, cap: 'Paused it to text | *the main character.*', mood: 'wide', tears, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'TO: THE HERO', headCol: ACC, lines: [['are u ok', BONE, pop01(t, P.t0 + 0.6, 0.25, 2), true], ['i’m here 4 u', PINK, pop01(t, P.t0 + 1.1, 0.25, 2), true]], typing: lt > 1.5 ? 1 : 0 })
      L(x, 800, 640, 'PAUSED', pop01(t, P.t0 + 0.4, 0.3, 2), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'The credits rolled. | *Cried at the caterers.*', mood: 'wide', tears, look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 860); x.scale(k, k); x.fillStyle = INK; x.fillRect(-170, -200, 340, 400); x.beginPath(); x.rect(-160, -190, 320, 380); x.clip()
        x.fillStyle = BONE; x.font = `700 26px 'Space Mono', monospace`; x.textAlign = 'center'
        const rows = ['DIRECTOR', 'A. PERSON', '', 'GRIP', 'B. PERSON', '', 'CATERING', 'C. PERSON', '', 'THANKS', 'EVERYONE']
        rows.forEach((r, i) => { const y = 200 + i * 44 - lt * 170; if (r) { x.fillStyle = r === 'CATERING' ? GOLD : BONE; x.fillText(r, 0, y) } })
        x.restore()
      }
      L(x, 800, 1110, 'SO TALENTED', pop01(t, P.t0 + 1.5, 0.3, 2.2), PINK, 0.04, 34)
    } },
  { sign: S, cap: 'Friend said “it’s fake.” | *Pisces gasped.*', mood: lt => lt > 1.0 ? 'wide' : 'neutral', tears, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      friend(x, t, 'capricorn', 800, 980, 200, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: 'neutral', look: [-1, 0] })
      bubble(x, 820, 760, 'it’s just | a movie', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 34, tail: 'br' })
      bubble(x, 420, 640, 'HOW DARE YOU', pop01(t, P.t0 + 1.1, 0.25, 2.6), { size: 40, col: ACC, tail: 'bl' })
    } },
  { sign: S, cap: 'Five stars. | *Never watching it again.*', mood: 'heart', tears, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      L(x, 800, 800, '★ ★ ★ ★ ★', pop01(t, P.t0 + 0.2, 0.3, 2), GOLD, -0.04, 48)
      L(x, 800, 960, 'REWATCH: NEVER', pop01(t, P.t0 + 1.0, 0.3, 2.4), RED, 0.04, 40)
      drawBits(x, POPCORN, POP_C, 800, 1100, 10 * pop01(t, P.t0 + 0.4, 0.3, 2))
    } },
  { sign: S, cap: 'Happy ending? | *Cried harder.*', mood: 'sparkle', tears: 3, look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      screen(x, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), lt, 'THE END ♥', '#c0558a')
      sparkles(x, t, 800, 820, P.t0 + 1.0, 8, 220, 0.3)
      hearts(x, t, 800, 1020, P.t0 + 1.2, { n: 6, life: 1.8, spread: 260, cell: 8, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2t0614', key: 'D', accent: ACC, solo: S, ending: 'lesson',
  title: 'Pisces vs. | *a sad movie.*',
  cameos: CAMEOS,
  group: { cap: 'Zero dry eyes. | *Zero regrets.*', mood: 'heart' },
  lesson: { text: 'Feeling it all | *is the point.*', chip: 'TEARS: WORTH IT' },
  last: { text: 'Next up: a cartoon. | *Same result.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
