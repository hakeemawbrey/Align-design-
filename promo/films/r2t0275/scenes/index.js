// r2t0275: star_talk, SOLO (cancer), "Cancers when mad | *be like.*" (~46 s vertical, signs3kit social cut, music: lofi · F)
// The batch topic "Cancers when they're mad | be like." tightened to two lines. Nine cards: the most extreme (and still
// soft) angry Cancer. Ending: callback (more soup).
//   "I'm fine," cleans the whole house · into the shell, literally · brings up something from years ago · mad at you,
//   still made you soup · wrote a paragraph, sent "k." · silent treatment lasts four minutes · told their mom, now she's
//   mad too · checked your compatibility again (still a match) · forgave you, will remember forever
//   group "Hard shell. | *Soft heart.*"   callback "Still mad? | *Here’s more soup.*" (the soup bowl returns)
import { prog, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { phone, note, meter, bits, ORANGE, RED, WOOD, PAPER, SLATE } from '../props.js'

const S = 'cancer', L = { x: -180 }
const BROOM = [['......K', '.....K.', '....K..', '...K...', 'YYYY...', 'YYYYY..', 'YYYYYY.'], { K: WOOD, Y: GOLD }]
const CLOCK = [['..WWWWWWW..', '.WWWWIWWWW.', 'WWWWWIWWWWW', 'WWWWWIWWWWW', 'WWWWWIIIIWW', 'WWWWWWWWWWW', 'WWWWWWWWWWW', '.WWWWWWWWW.', '..WWWWWWW..'], { W: PAPER, I: INK }]
const steam = (x, t, cx, cy, k) => { for (let i = 0; i < 3; i++) { const ph = ((t * 0.6 + i / 3) % 1); x.save(); x.globalAlpha = k * Math.sin(Math.PI * ph) * 0.8; x.fillStyle = BONE; x.fillRect(cx - 60 + i * 50 + Math.sin(ph * 8 + i) * 10, cy - ph * 130, 12, 30); x.restore() } }

const CAMEOS = [
  { sign: S, cap: '“I’m fine.” | *Cleans the whole house.*', mood: lt => lt > 0.8 ? 'squint' : 'neutral', look: [1, 0], star: L, hops: [0.8, 1.2, 1.6, 2.0],
    front(x, t, lt, P) {
      drawBits(x, BROOM[0], BROOM[1], 790, 830, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.35 * Math.sin(t * 9) })
      sparkles(x, t, 790, 900, P.t0 + 1.0, 8, 160, 0.3)
      label(x, 790, 650, 'FURIOUSLY TIDY', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Went into their shell. | *Literally.*', mood: 'neutral', look: [1, 0], star: L, hideStar: false,
    front(x, t, lt, P, F) {
      const d = ease.outBounce ? ease.outBounce(prog(lt, 0.4, 1.0)) : ease.outCubic(prog(lt, 0.4, 1.0))
      if (lt > 0.35) bits(x, 'shell', F.x, 600 + (F.cy + 20 - 600) * d, 26)
      label(x, 800, 1040, 'CLOSED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 50, bg: RED, color: BONE, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 800, 760, 'go away. | (don’t go.)', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl', col: LAV })
    } },
  { sign: S, cap: 'Brings up something | *from years ago.*', mood: 'squint', look: [1, 0], star: L, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      note(x, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), 'you said my | cake was “fine”', { head: 'EXHIBIT A', headBg: SKYB, size: 36, w: 340 })
      label(x, 790, 1050, 'FILED: 2019', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Mad at you. | *Still made you soup.*', mood: lt => lt > 1.2 ? 'eyeroll' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'bowl', 790, 860, 30 * k); steam(x, t, 790, 790, k)
      label(x, 790, 1060, 'EAT IT. ANGRILY.', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Wrote a paragraph. | *Sent “k.”*', mood: 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      phone(x, 790, 820, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), { top: '9:41', head: lt > 1.1 ? 'SENT' : 'TYPING…', msg: lt > 1.1 ? 'k.' : 'and another | thing, also | and ALSO', bg: LAV, size: lt > 1.1 ? 60 : 30 })
    } },
  { sign: S, cap: 'Silent treatment. | *Lasted four minutes.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, CLOCK[0], CLOCK[1], 790, 770, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 1010, 'ok I miss you.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: S, cap: 'Told their mom. | *Now she’s mad too.*', mood: 'squint', look: [1, 0], star: L, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 800, 860, 200 * k, { mood: 'squint', look: [-1, 0], seed: 63, glyph: false, hops: [P.t0 + 1.3] })
      label(x, 800, 650, 'MOM', pop01(t, P.t0 + 0.7, 0.3, 2.4), { size: 44, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
      label(x, 800, 1080, 'ALSO MAD', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 42, bg: RED, color: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Checked your | *compatibility. Again.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const p = lt < 0.9 ? 1 - 0.7 * ease.inOutCubic(prog(lt, 0.3, 0.9)) : 0.3 + 0.7 * ease.inOutCubic(prog(lt, 1.0, 1.5))
      meter(x, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), p, { w: 320, col: MINT, title: 'YOU + ME' })
      label(x, 790, 1000, 'STILL A MATCH', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Forgave you. | *Will remember forever.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: L, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 720, 'FORGIVEN ✓', pop01(t, P.t0 + 0.3, 0.3, 2.4), { size: 50, bg: MINT, rot: -0.05 })
      note(x, 800, 940, pop01(t, P.t0 + 1.1, 0.3, 2), 'filed under: | FOREVER', { head: 'MEMORY', headBg: LAV, size: 34, w: 320 })
    } },
]

const F = makeFilm({
  id: 'r2t0275', key: 'F', accent: SKYB, solo: S, ending: 'callback',
  title: 'Cancers when mad | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Hard shell. | *Soft heart.*', mood: 'heart' },
  last: {
    text: 'Still mad? | *Here’s more soup.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.35, 2)
      bits(x, 'bowl', 470, 1120, 34 * k); steam(x, t, 470, 1040, k)
      if (k > 0.5) signChar(x, t, 'cancer', 760, 1130, 220, { mood: lt > 1.4 ? 'heart' : 'squint', look: [-1, 0], seed: 77, pop: k, glyph: false })
      label(x, 480, 880, 'SECONDS', pop01(t, t - lt + 1.3, 0.3, 2.4), { size: 40, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
