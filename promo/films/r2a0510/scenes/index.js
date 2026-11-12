// r2a0510: star_advice ADVICE ROLLCALL, "How to be patient | *with each sign.*" (signs3kit social cut, music: lofi · G). Ending: lesson.
//   ♈ let them go first, they'll wait for you after · ♉ give them time, and a snack · ♊ let them talk, the point is coming
//   · ♋ let them check in again, it's love · ♌ clap a little, they'll clap back louder · ♍ let them redo it, it matters
//   · ♎ let them decide, slowly is fine · ♏ let them open up at their pace · ♐ let them wander, they bring stories back
//   · ♑ let them finish work, then they're all yours · ♒ let them explain, it makes sense eventually · ♓ let them feel it,
//   then hug.   group: "Worth the wait. | Every sign."   lesson: "Patience is | how *love waits.*" LOVE: LOADING
//   last: "Take your time. | *They will.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e', GREEN = '#5fd068'
const ST = { x: -170 }
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
function card(x, cx, cy, w, h, k, { rot = 0.04, bg = CREAM } = {}, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (fn) fn()
  x.restore()
}
/** text lines centred inside a card (call from card's fn) */
function lines(x, arr, { size = 26, color = INK, lh = 1.35, font = MONO, weight = 700, dy = 0 } = {}) {
  x.fillStyle = color; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  arr.forEach((s, i) => x.fillText(s, 0, dy + (i - (arr.length - 1) / 2) * size * lh))
}
/** a phone with a screen; fn draws on the screen in phone-local coords (screen 200×340 centred) */
function phone(x, cx, cy, k, fn, { rot = 0.04, scale = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * scale, k * scale)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-112, -192, 240, 400)
  x.fillStyle = INK; x.fillRect(-126, -206, 252, 412)
  x.fillStyle = '#3a3360'; x.fillRect(-120, -200, 240, 400)
  x.fillStyle = '#1b1236'; x.fillRect(-104, -176, 208, 352)
  if (fn) fn()
  x.restore()
}
const ACC = '#c9a6ff'
const COOKIE = ['..KKKKK..', '.KTTCTTK.', 'KTCTTTTCK', 'KTTTTCTTK', 'KTCTTTTTK', '.KTTTCTK.', '..KKKKK..']
const HAND = ['.YY.YY.', 'YYYYYYY', 'YYYYYYY', '.YYYYY.', '..YYY..']
const DOOR = ['KKKKKKKKK', 'KBBBBBBBK', 'KBBBBBBBK', 'KBBBBBBBK', 'KBBBBBYBK', 'KBBBBBBBK', 'KBBBBBBBK', 'KBBBBBBBK', 'KKKKKKKKK']
const SUIT = ['...KKK...', '..K...K..', 'KKKKKKKKK', 'KOOOOOOOK', 'KOYOOOYOK', 'KOOOOOOOK', 'KKKKKKKKK']
const LAPTOP = ['.KKKKKKKKKK.', '.KSSSSSSSSK.', '.KSSSSSSSSK.', '.KSSSSSSSSK.', '.KKKKKKKKKK.', 'KKKKKKKKKKKK']
const BOARD = ['KKKKKKKKKKKKK', 'KWWWWWWWWWWWK', 'KWRWWBWWGWWWK', 'KWWRBWWGGWWWK', 'KWWWWBRWWGWWK', 'KWWWWWWWWWWWK', 'KKKKKKKKKKKKK']

const CAMEOS = [
  { sign: 'aries', cap: 'Let them go first. | *They’ll wait for you.*', mood: lt => lt > 1.3 ? 'happy' : 'sparkle', look: [1, 0], star: ST, hops: [0.5],
    front(x, t, lt, P) {
      L(x, 790, 700, 'FINISH LINE', pop01(t, P.t0 + 0.2, 0.3, 2), BONE, -0.03, 36)
      if (lt > 1.0) bubble(x, 790, 920, 'come on, I’ll | wait here!', pop01(t, t - lt + 1.0, 0.25, 2.2), { size: 34, col: '#ff8f6b', tail: 'bl' })
      L(x, 790, 1120, 'WAITED: 4 SECONDS', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 28)
    } },
  { sign: 'taurus', cap: 'Give them time. | *And a snack.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, COOKIE, { K: INK, T: '#e0a060', C: '#6b3a1e' }, 790, 880, 26 * pop01(t, P.t0 + 0.5, 0.3, 2.2))
      L(x, 790, 680, 'PATIENCE: FED', pop01(t, P.t0 + 1.1, 0.3, 2.2), MINT, -0.04, 34)
    } },
  { sign: 'gemini', cap: 'Let them talk. | *The point is coming.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 780, 700, 'so anyway, the | duck, then my aunt—', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 30, col: '#ffe36a', tail: 'bl' })
      L(x, 790, 940, 'POINT: ARRIVING', pop01(t, P.t0 + 1.0, 0.3, 2.4), BONE, -0.04, 32)
      L(x, 790, 1110, 'ETA: 6 STORIES', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, 0.04, 30)
    } },
  { sign: 'cancer', cap: 'Let them check in. | *Again. It’s love.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 870, pop01(t, P.t0 + 0.2, 0.3, 2), () => {
        ;['home safe?', 'ate yet?', 'drink water'].forEach((s, i) => bubble(x, 0, -110 + i * 100, s, lt > 0.4 + i * 0.4 ? 1 : 0, { size: 26, col: i % 2 ? PINK : BONE, tail: 'bl' }))
      })
      L(x, 790, 1150, 'CHECK-INS: 9 TODAY', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 28)
    } },
  { sign: 'leo', cap: 'Clap a little. | *They’ll clap louder.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0, 1.6],
    front(x, t, lt, P) {
      const c = Math.abs(Math.sin(t * 9))
      drawBits(x, HAND, { Y: GOLD }, 740 - 14 * c, 880, 18 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.4 })
      drawBits(x, HAND, { Y: GOLD }, 840 + 14 * c, 880, 18 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: -0.4 })
      L(x, 790, 680, 'APPLAUSE: MUTUAL', pop01(t, P.t0 + 1.0, 0.3, 2.2), PINK, -0.04, 32)
      sparkles(x, t, 790, 880, P.t0 + 1.0, 8, 170, 0.3)
    } },
  { sign: 'virgo', cap: 'Let them redo it. | *It matters to them.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const v = 1 + Math.floor(clamp(prog(lt, 0.3, 1.8)) * 6)
      card(x, 790, 860, 300, 200, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.03 }, () => lines(x, ['BIRTHDAY CARD', `DRAFT ${v}`], { size: 32 }))
      L(x, 790, 1100, 'WORTH IT: YES', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'libra', cap: 'Let them decide. | *Slowly is fine.*', mood: lt => Math.floor(lt * 2) % 2 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const pick = Math.floor(lt * 2) % 2
      L(x, 690, 780, 'TACOS', pop01(t, P.t0 + 0.2, 0.3, 2) * (pick ? 0.9 : 1.2), BONE, -0.05, 44)
      L(x, 890, 920, 'NOODLES', pop01(t, P.t0 + 0.4, 0.3, 2) * (pick ? 1.2 : 0.9), BONE, 0.05, 44)
      L(x, 790, 1120, 'WE’LL WAIT. HAPPILY.', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.03, 28)
    } },
  { sign: 'scorpio', cap: 'Let them open up | *at their pace.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const o = ease.outCubic(prog(lt, 0.6, 1.8))
      drawBits(x, DOOR, { K: INK, B: '#6b3fa0', Y: GOLD }, 790, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { sx: 1 - 0.7 * o })
      L(x, 790, 1120, 'OPEN: SLOWLY. SURELY.', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 28)
    } },
  { sign: 'sagittarius', cap: 'Let them wander. | *Stories come back.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SUIT, { K: INK, O: '#ffb34a', Y: GOLD }, 790, 910, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 690, 'okay so in peru—', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
      L(x, 790, 1110, 'SOUVENIR: FOR YOU', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: 'capricorn', cap: 'Let them finish work. | *Then: all yours.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, LAPTOP, { K: INK, S: lt > 1.3 ? '#2a2350' : SKYB }, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 1.3) L(x, 790, 690, 'LAPTOP: CLOSED', pop01(t, t - lt + 1.3, 0.3, 2.4), MINT, -0.04, 34)
      L(x, 790, 1100, '5:00:00 PM', pop01(t, P.t0 + 0.5, 0.3, 2.2), BONE, 0.04, 34)
    } },
  { sign: 'aquarius', cap: 'Let them explain. | *It’ll make sense.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BOARD, { K: INK, W: '#e8f0ff', R: RED, B: '#4aa8ff', G: '#5fd068' }, 790, 860, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 680, 'MY THEORY, PART 9', pop01(t, P.t0 + 0.7, 0.3, 2.2), SKYB, -0.04, 30)
      L(x, 790, 1100, 'GENIUS? …YES?', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'pisces', cap: 'Let them feel it. | *Then hug.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', tears: lt => lt < 1.4 ? 3 : 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 1.0, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 760, 900, 220 * k, { mood: 'heart', seed: 13, look: [-1, 0], glyph: false })
      L(x, 790, 680, 'TISSUES: READY', pop01(t, P.t0 + 0.3, 0.3, 2.2), BONE, -0.04, 32)
      hearts(x, t, 600, 860, P.t0 + 1.4, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'r2a0510', key: 'G', accent: ACC, ending: 'lesson',
  title: 'How to be patient | *with each sign.*',
  cameos: CAMEOS,
  group: { cap: 'Worth the wait. | *Every sign.*' },
  lesson: { text: 'Patience is | how *love waits.*', chip: 'LOVE: LOADING' },
  last: { text: 'Take your time. | *They will.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
