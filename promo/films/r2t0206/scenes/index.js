// r2t0206: THE SIGNS AS… v3, ROLLCALL, "The signs | at yoga class." (~62 s vertical, signs3kit social cut, music: lofi · C)
//   0.0–3.6    "The signs | *at yoga class.*"
//   3.6–49.2   ♈ fastest downward dog, set a record · ♉ savasana from minute one, snoring · ♊ asked everyone's sign in the
//              silent part · ♋ brought a mat for everyone · ♌ front row, facing the class · ♍ lined the mat up with a ruler
//              · ♎ still choosing a mat colour · ♏ read the teacher's birth chart mid-pose · ♐ tried a headstand, landed in
//              the hallway · ♑ scheduled zen for 6:00–6:05 · ♒ invented a pose nobody can do · ♓ child's pose, cried
//  49.2        "Twelve signs. | Zero *inner peace.*"
//  52.4        LESSON UNLOCKED: "Peace looks different | on *everyone.*"  STATUS: STRETCHED
//  58.3        "Same time | *next week?*"  twelve little mats roll out in a row.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, chart, clock, beam, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = MINT
const ST = { x: -170 }

/** a yoga mat seen from the side, unrolling to width w·p */
function mat(x, cx, cy, w, col, k, p = 1) {
  if (k <= 0.01) return
  const ww = w * clamp(p)
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -16, ww + 12, 32)
  x.fillStyle = col; x.fillRect(-w / 2, -10, ww, 20)
  x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(-w / 2, -10, ww, 5)
  if (p < 1) { x.fillStyle = INK; x.beginPath(); x.arc(-w / 2 + ww, -12, 30, 0, Math.PI * 2); x.fill(); x.fillStyle = col; x.beginPath(); x.arc(-w / 2 + ww, -12, 24, 0, Math.PI * 2); x.fill() }
  x.restore()
}
const RULER = ['YYYYYYYYYYYYYYYYYYYY', 'YKYKYKYKYKYKYKYKYKYK', 'YKYYYKYYYKYYYKYYYKYY', 'YYYYYYYYYYYYYYYYYYYY']
const DOOR = ['KKKKKKKKK', 'KBBBBBBBK', 'KBWWBWWBK', 'KBWWBWWBK', 'KBBBBBBBK', 'KBBBBBGBK', 'KBBBBBBBK', 'KBBBBBBBK', 'KBBBBBBBK', 'KBBBBBBBK', 'KKKKKKKKK']
const DOOR_C = { K: INK, B: '#8a4a2e', W: SKYB, G: GOLD }
const TROPHY = ['YYYYYYYYY', 'YYYYYYYYY', '.YYYYYYY.', '..YYYYY..', '...YYY...', '....Y....', '...YYY...', '..BBBBB..']
const TROPHY_C = { Y: GOLD, B: '#8a4a2e' }

const CAMEOS = [
  { sign: 'aries', cap: 'Fastest downward dog. | *New record.*', mood: lt => lt > 1.1 ? 'sparkle' : 'wide', star: { x: -170, y: -10 }, hops: [0.4, 0.8, 1.2], squash: lt => lt < 1.0 ? 0.08 * Math.sin(lt * 18) : 0,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { mat(x, 370, 1040, 360, '#ff6b5a', pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      clock(x, 790, 760, 100, pop01(t, P.t0 + 0.25, 0.35, 2), 0, Math.min(59, lt * 40))
      label(x, 790, 940, 'TIME: 0.4 SEC', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      drawBits(x, TROPHY, TROPHY_C, 790, 1100, 14 * pop01(t, P.t0 + 1.3, 0.3, 2.2))
      sparkles(x, t, 790, 1090, P.t0 + 1.4, 6, 110, 0.3)
    } },
  { sign: 'taurus', cap: 'Savasana from minute one. | *Snoring.*', mood: 'sleepy', star: { x: -170, y: 30 },
    back(x, t, lt, P) { mat(x, 370, 1060, 380, '#5fd068', pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 790, 760, 'CLASS: 60 MIN', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 900, 'TAURUS: ASLEEP 60', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1080, 'zzz… namaste', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Silent meditation? | Asked *everyone’s sign.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST,
    back(x, t, lt, P) { mat(x, 370, 1040, 360, '#ffd23a', pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 790, 640, 'SILENCE, PLEASE', pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 760, 820, 'psst. your sign?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 38, tail: 'bl' })
      bubble(x, 800, 1000, 'and yours?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bl' })
      bubble(x, 760, 1150, 'and YOURS?', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 38, col: GOLD, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Brought a mat | *for everyone.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: ST,
    front(x, t, lt, P) {
      const COLS = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ff8fb1', '#c97bff', '#ffb34a', '#7dffb0']
      const n = Math.floor(clamp((lt - 0.2) / 1.2) * COLS.length)
      for (let i = 0; i < n; i++) mat(x, 790, 1100 - i * 44, 300, COLS[i], 1)
      label(x, 790, 660, `MATS: ${Math.max(1, n * 2)}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 40, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      if (lt > 1.5) hearts(x, t, 790, 700, P.t0 + 1.5 * 1.29, { n: 4, life: 1.4, spread: 160, cell: 7, seed: 4 })
    } },
  { sign: 'leo', cap: 'Front row. | *Facing the class.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', star: { x: 0, y: 0 }, hops: [1.0],
    back(x, t, lt, P) {
      beam(x, 540, 470, 540, 1040, 200, pop01(t, P.t0 + 0.15, 0.4, 1.6))
      mat(x, 540, 1060, 380, '#ffb34a', pop01(t, P.t0 + 0.1, 0.3, 2))
    },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) { const k = pop01(t, P.t0 + 0.6 + i * 0.12, 0.3, 2); if (k > 0.01) signChar(x, t, ['taurus', 'virgo', 'libra'][i], 230 + i * 310, 1160, 120 * k, { mood: 'eyeroll', look: [0, -1], seed: 30 + i, glyph: false }) }
      bubble(x, 760, 600, 'you’re welcome.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Lined up the mat | *with a ruler.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      const rot = lerp(0.18, 0, ease.inOutCubic(prog(lt, 0.6, 1.3)))
      x.save(); x.translate(760, 1020); x.rotate(rot); x.translate(-760, -1020); mat(x, 760, 1020, 360, '#7dffb0', pop01(t, P.t0 + 0.15, 0.3, 2)); x.restore()
      drawBits(x, RULER, { Y: SUN, K: INK }, 760, 960, 18 * pop01(t, P.t0 + 0.4, 0.3, 2))
      label(x, 790, 720, rot > 0.01 ? `ANGLE: ${(rot * 57).toFixed(1)}°` : 'ANGLE: 0.0°', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 38, bg: rot > 0.01 ? BONE : MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Class ended. | *Still picking a mat.*', mood: lt => lt > 1.6 ? 'wide' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const COLS = ['#ff8fb1', '#8fe3ff', '#7dffb0', '#ffd23a', '#c97bff']
      const i = Math.floor(lt * 4) % COLS.length
      mat(x, 790, 1020, 330, COLS[i], pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 790, 760, `OPTION ${7 + Math.floor(lt * 4)} OF 40`, pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1140, 'CLASS: OVER', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Read the teacher’s | *birth chart.* Mid-pose.', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170, y: -10 }, squash: 0.05,
    back(x, t, lt, P) { mat(x, 370, 1040, 360, '#c97bff', pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      chart(x, 790, 830, 130, pop01(t, P.t0 + 0.3, 0.4, 2), t)
      label(x, 790, 1060, 'TEACHER: VIRGO RISING', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 28, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 610, 'interesting…', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Tried a headstand. | *Landed in the hallway.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', star: { x: 170, y: 0 },
    back(x, t, lt, P) { drawBits(x, DOOR, DOOR_C, 700, 870, 34 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 340, 700, 'HEADSTAND: 1/10', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 340, 960, 'new pose!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, col: GOLD, tail: 'br' })
      label(x, 340, 1130, 'HALLWAY', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 710, 870, P.t0 + 0.6, 7, 160, 0.5)
    } },
  { sign: 'capricorn', cap: 'Scheduled zen | from *6:00 to 6:05.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    back(x, t, lt, P) { mat(x, 370, 1040, 360, '#9aa5c4', pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      card(x, 790, 860, 320, 360, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'TODAY', 0, -140, { size: 30, font: MONO, weight: 700 })
        const L = [['5:55', 'stretch'], ['6:00', 'ZEN'], ['6:05', 'emails']]
        L.forEach(([h, s], i) => { if (i === 1) { x.fillStyle = MINT; x.fillRect(-140, -66 + i * 80, 280, 60) } txt(x, `${h} ${s}`, 0, -36 + i * 80, { size: 34 }) })
      })
      label(x, 790, 1110, 'ZEN: ON TIME', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Invented a new pose. | *Nobody can do it.*', mood: 'sparkle', star: { x: -170, y: -20 }, hops: [0.8],
    back(x, t, lt, P) { mat(x, 370, 1040, 360, '#6fc3ff', pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      card(x, 790, 850, 300, 330, k, { bg: CREAM, rot: -0.04 }, () => {
        txt(x, 'POSE #1', 0, -130, { size: 28, font: MONO, weight: 700 })
        x.save(); x.rotate(t * 1.8); signChar(x, t, 'aquarius', 0, 0, 150, { mood: 'wide', seed: 61, glyph: false, glow: 0.3 }); x.restore()
      })
      label(x, 790, 1100, 'DIFFICULTY: ???', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Child’s pose. | *Cried* the whole time.', mood: lt => lt < 0.8 ? 'happy' : 'wide', tears: lt => lt < 0.8 ? 1 : 3, star: { x: -170, y: 30 }, squash: 0.06,
    back(x, t, lt, P) { mat(x, 370, 1060, 380, '#b7a6ff', pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'it’s so peaceful…', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
      label(x, 790, 960, 'MAT: SOAKED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0206', key: 'C', accent: ACC, ending: 'lesson',
  title: 'The signs | *at yoga class.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | Zero *inner peace.*' },
  lesson: { text: 'Peace looks different | on *everyone.*', chip: 'STATUS: STRETCHED' },
  last: {
    text: 'Same time | *next week?*',
    draw(x, t, lt) {
      const COLS = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
      for (let i = 0; i < 3; i++) mat(x, 540, 1470 + i * 56, 640, COLS[i * 4 + 1], 1, ease.outCubic(prog(lt, 0.4 + i * 0.15, 1.0 + i * 0.15)))
      label(x, 540, 1700, 'MATS: SAVED', pop01(t, t - lt + 1.6, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
