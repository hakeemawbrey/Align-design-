// r2a0293: star_advice, ADVICE SOLO, "How to apologise | to a Libra." (~51 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (solo mode, 9 cards): a gentle guide to making peace with a Libra, each card a truth
// about Libra plus a warm reframe, with one light gag.
//   0.0–3.6    "How to apologise | *to a Libra.*"
//   3.6–37.8   don't wait (they've replayed it 37 times) · hear their side, all six pages · tone matters
//              · bring something pretty · don't make them pick sides (the scales balance) · meet halfway, literally
//              · bring the harmony back (soft music) · let them talk it through, twice · then hug it out
//  37.8        "Kind words. | *Soft landing.*"   41.0  LESSON: "Peace means the world | to a *Libra.*"
//  46.9        "Say it softly. | *They’ll meet you.*"
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'
import { card, txt, CREAM, RED, ORANGE, GREY, DEEP, GREEN, WOOD, BROWN, SUN, clamp, ease, lerp, prog } from './props.js'

const S = 'libra', ST = { x: -180 }, ACC = PINK
const lab = (x, cx, cy, s, k, o = {}) => label(x, cx, cy, s, k, { size: 32, font: MONO, weight: 700, ...o })

const FLOWERS = ['.P...Y...P.', 'PWP.YWY.PWP', '.P...Y...P.', '..G..G..G..', '...G.G.G...', '....GGG....', '...KKKKK...', '...KRRRK...', '...KRRRK...', '....KKK....']
const FLOWERS_C = { P: PINK, Y: SUN, W: '#ffffff', G: GREEN, K: INK, R: '#c1546a' }

/** a pair of golden scales, tilted by tilt (radians) */
function scales(x, cx, cy, s, k, tilt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k * s, k * s)
  x.fillStyle = INK; x.fillRect(-14, -120, 28, 230); x.fillRect(-70, 100, 140, 28)
  x.fillStyle = GOLD; x.fillRect(-8, -114, 16, 218); x.fillRect(-64, 104, 128, 18)
  x.save(); x.translate(0, -110); x.rotate(tilt)
  x.fillStyle = INK; x.fillRect(-150, -10, 300, 20); x.fillStyle = GOLD; x.fillRect(-146, -6, 292, 12)
  for (const d of [-1, 1]) {
    x.save(); x.translate(d * 140, 0); x.rotate(-tilt)
    x.fillStyle = BONE; x.fillRect(-2, 0, 4, 80)
    x.fillStyle = INK; x.beginPath(); x.ellipse(0, 86, 62, 22, 0, 0, Math.PI); x.fill()
    x.fillStyle = GOLD; x.beginPath(); x.ellipse(0, 84, 56, 17, 0, 0, Math.PI); x.fill()
    x.restore()
  }
  x.restore(); x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Don’t wait too long. | *They’re replaying it.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [0, -1], star: ST,
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.6) * 36)
      card(x, 790, 820, 290, 180, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: DEEP, rot: 0.03 }, () => {
        txt(x, '▶ THAT CONVO', 0, -40, { size: 28, font: MONO, weight: 700, color: GREY })
        txt(x, `REPLAY ${n}`, 0, 24, { size: 46, font: MONO, weight: 700, color: BONE })
      })
      lab(x, 790, 1060, 'SLEEP: PAUSED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { bg: LAV, rot: -0.04 })
    } },
  { sign: S, cap: 'Hear their side. | *All of it.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'and ANOTHER | thing…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      const pg = 1 + Math.floor(clamp((lt - 0.5) / 1.5) * 5)
      lab(x, 790, 1000, `PAGE ${pg} OF 6`, pop01(t, P.t0 + 0.6, 0.3, 2), { bg: BONE, rot: 0.04, size: 36 })
      lab(x, 790, 1110, 'YOU: STILL LISTENING', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: MINT, rot: -0.04 })
    } },
  { sign: S, cap: 'Tone matters. | *Say it kindly.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'sorry i guess', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, tail: 'br', col: GREY })
      const s = ease.outCubic(prog(lt, 0.7, 0.9)); if (s > 0) { x.fillStyle = RED; x.fillRect(660, 694, 260 * s, 10) }
      bubble(x, 790, 920, "i'm sorry. | i care about you.", pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, tail: 'br', col: PINK })
      hearts(x, t, 790, 1040, P.t0 + 1.3, { n: 4, life: 1.5, spread: 180, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Bring something pretty. | *They’ll notice.*', mood: lt => lt > 1.0 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      drawBits(x, FLOWERS, FLOWERS_C, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.05 })
      lab(x, 790, 1110, 'COLOURS: APPROVED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { bg: PINK, rot: -0.04 })
      sparkles(x, t, 790, 830, P.t0 + 1.0, 7, 200, 0.4)
    } },
  { sign: S, cap: 'Don’t make them | *pick sides.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', star: ST,
    front(x, t, lt, P) {
      const tilt = lt < 1.3 ? 0.35 * Math.sin(t * 3) : 0.35 * Math.sin(t * 3) * Math.exp(-(lt - 1.3) * 5)
      scales(x, 770, 900, 0.8, pop01(t, P.t0 + 0.2, 0.35, 2), tilt)
      lab(x, 790, 1110, 'BALANCE: RESTORED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { bg: GOLD, rot: 0.04 })
    } },
  { sign: S, cap: 'Meet halfway. | *Literally.*', mood: 'happy', look: [1, 0], star: { x: -220 }, hops: [0.5, 0.9, 1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      x.save(); x.globalAlpha = clamp(k); x.fillStyle = GOLD; for (let i = 0; i < 9; i++) x.fillRect(596, 620 + i * 60, 8, 34); x.restore()
      const w = ease.inOutCubic(prog(lt, 0.4, 1.4))
      if (k > 0.01) signChar(x, t, 'aries', lerp(900, 700, w), 990, 180 * k, { mood: lt > 1.4 ? 'heart' : 'happy', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 0.6, P.t0 + 1.0] })
      lab(x, 600, 1150, 'HALFWAY: MET', pop01(t, P.t0 + 1.5, 0.3, 2.4), { bg: MINT, rot: -0.03 })
    } },
  { sign: S, cap: 'Bring the harmony back. | *Soft music helps.*', mood: lt => lt > 0.8 ? 'sleepy' : 'happy', star: ST, squash: 0.03,
    front(x, t, lt, P) {
      notes(x, t, 790, 980, { n: 5, cell: 9, col: PINK, seed: 2, alpha: clamp(lt * 2) })
      lab(x, 790, 680, 'VIBE: HEALING', pop01(t, P.t0 + 0.5, 0.3, 2), { bg: LAV, rot: 0.04, size: 36 })
      lab(x, 790, 1120, 'SHOULDERS: DOWN', pop01(t, P.t0 + 1.4, 0.3, 2.4), { bg: SKYB, rot: -0.04 })
    } },
  { sign: S, cap: 'Let them talk it through. | *Twice.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'ok, just one | more thing…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      lab(x, 790, 960, lt > 1.2 ? 'CLOSURE: 2 OF 2' : 'CLOSURE: 1 OF 2', pop01(t, P.t0 + 0.7, 0.3, 2), { bg: lt > 1.2 ? MINT : BONE, rot: 0.04, size: 36 })
      sparkles(x, t, 790, 960, P.t0 + 1.25, 6, 160, 0.3)
    } },
  { sign: S, cap: 'Then hug it out. | *Peace restored.*', mood: 'heart', look: [1, 0], star: { x: -110 }, hops: [1.2, 1.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), w = ease.inOutCubic(prog(lt, 0.4, 1.0))
      if (k > 0.01) signChar(x, t, 'aries', lerp(860, 660, w), 920, 230 * k, { mood: lt > 1.0 ? 'heart' : 'happy', look: [-1, 0], seed: 22, glyph: false })
      hearts(x, t, 540, 820, P.t0 + 1.0, { n: 8, life: 2.0, spread: 300, cell: 8, seed: 7 })
      lab(x, 760, 1150, 'STATUS: AT PEACE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { bg: PINK, rot: 0.04 })
    } },
]

const F = makeFilm({
  id: 'r2a0293', key: 'C', accent: ACC, solo: S, ending: 'lesson',
  title: 'How to apologise | *to a Libra.*',
  cameos: CAMEOS,
  group: { cap: 'Kind words. | *Soft landing.*', mood: 'heart' },
  lesson: { text: 'Peace means the world | to a *Libra.*', chip: 'STATUS: HARMONY' },
  last: {
    text: 'Say it softly. | *They’ll meet you.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.5, { n: 8, life: 2.2, spread: 600, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
