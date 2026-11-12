// r2a0509: star_advice ADVICE ROLLCALL, "Each sign’s | *note to self.*" (signs3kit social cut, music: lofi · E). Ending: callback.
// Every card: a sticky note the sign wrote itself (the gag lives on the note), the caption is the warm version.
//   ♈ slow down, the finish line waits · ♉ change is okay, the snacks come too · ♊ finish one thing first · ♋ you can be
//   cared for too · ♌ still a star on quiet days · ♍ done beats perfect · ♎ your choice is a good one · ♏ let one person
//   all the way in · ♐ home is an adventure too · ♑ rest is part of the plan (NAP: 3PM in the planner) · ♒ your weird is
//   your gift · ♓ your soft heart is strength (the note is a little tear-smudged).
//   group: "Read it. | Mean it."   callback: Capricorn actually takes the 3pm nap.
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
const ACC = '#ffe36a', NOTEY = '#ffe36a'
/** a sticky note with a few handwritten-ish lines, a fold in the corner */
function sticky(x, cx, cy, k, arr, { bg = NOTEY, rot = 0.05, size = 40, smudge = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  const W = 360, Hh = 300
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-W / 2 + 8, -Hh / 2 + 10, W, Hh)
  x.fillStyle = INK; x.fillRect(-W / 2 - 5, -Hh / 2 - 5, W + 10, Hh + 10)
  x.fillStyle = bg; x.fillRect(-W / 2, -Hh / 2, W, Hh)
  x.fillStyle = 'rgba(0,0,0,0.12)'; x.fillRect(-W / 2, -Hh / 2, W, 30)
  x.fillStyle = 'rgba(27,18,54,0.25)'; x.beginPath(); x.moveTo(W / 2, Hh / 2 - 44); x.lineTo(W / 2 - 44, Hh / 2); x.lineTo(W / 2, Hh / 2); x.fill()
  if (smudge) { x.fillStyle = 'rgba(143,227,255,0.55)'; for (let i = 0; i < 4; i++) { x.beginPath(); x.arc(-70 + i * 50, 10 + (i % 2) * 40, 18 + 4 * (i % 2), 0, Math.PI * 2); x.fill() } }
  x.fillStyle = INK; x.font = `700 ${size}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  arr.forEach((s, i) => x.fillText(s, 0, 15 + (i - (arr.length - 1) / 2) * size * 1.35))
  x.restore()
}
const SHOE = ['.......KKKK..', '......KRRRRK.', 'KKKKKKRRRRRK.', 'KWWWWRRRRRRRK', 'KRRRRRRRRRRRK', 'KKKKKKKKKKKKK']
const UFO = ['....KKKKK....', '...KSSSSSK...', '..KSSSSSSSK..', 'KKKKKKKKKKKKK', 'KGGYGGYGGYGGK', '.KKKKKKKKKKK.']
const SUIT = ['...KKK...', '..K...K..', 'KKKKKKKKK', 'KOOOOOOOK', 'KOYOOOYOK', 'KOOOOOOOK', 'KKKKKKKKK']

const CAMEOS = [
  { sign: 'aries', cap: 'Slow down. | *The finish line waits.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST, hops: [0.5],
    front(x, t, lt, P) {
      sticky(x, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), ['WALK.', '(fine: jog)'], { rot: 0.06 })
      drawBits(x, SHOE, { K: INK, R: RED, W: BONE }, 790, 1080, 20 * pop01(t, P.t0 + 0.8, 0.3, 2), { rot: lt > 1.2 ? 0 : 0.05 * Math.sin(t * 30) })
    } },
  { sign: 'taurus', cap: 'Change is okay. | *The snacks come too.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sticky(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), ['NEW PLACE?', 'BRING CHIPS.'], { rot: -0.04, bg: MINT })
      L(x, 790, 1100, 'COMFORT: PORTABLE', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'gemini', cap: 'You can finish | *one thing first.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) sticky(x, 740 + i * 50, 760 + i * 70, pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2) * 0.75, [['TODO: 1', 'TODO: 2', 'TODO: 47'][i]], { rot: -0.1 + i * 0.1, bg: [NOTEY, PINK, SKYB][i], size: 44 })
      L(x, 790, 1130, 'TABS OPEN: 31', pop01(t, P.t0 + 1.4, 0.3, 2.4), BONE, -0.04, 32)
    } },
  { sign: 'cancer', cap: 'You’re allowed | *to be cared for too.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sticky(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), ['LET THEM', 'MAKE YOU', 'SOUP.'], { rot: 0.05, bg: PINK })
      hearts(x, t, 470, 760, P.t0 + 1.0, { n: 5, life: 1.6, spread: 150, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Still a star | *on the quiet days.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sticky(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), ['SPOTLIGHT:', 'OPTIONAL.', 'SHINE: ON'], { rot: -0.05, bg: '#ffb34a' })
      sparkles(x, t, 790, 820, P.t0 + 1.0, 8, 190, 0.2)
    } },
  { sign: 'virgo', cap: 'Done | *beats perfect.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sticky(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), ['GOOD', 'ENOUGH', 'IS GOOD.'], { rot: lt > 1.0 ? 0.09 : 0, bg: MINT })
      if (lt > 1.0) L(x, 790, 1100, 'NOTE: SLIGHTLY CROOKED', pop01(t, t - lt + 1.0, 0.3, 2.4), GOLD, 0.04, 26)
    } },
  { sign: 'libra', cap: 'Your choice | *is a good one.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sticky(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), ['PICK ONE.', 'NO TAKE-', 'BACKS. :)'], { rot: 0.04, bg: LAV })
      L(x, 790, 1100, 'DECIDED IN: 4 SECONDS', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 26)
    } },
  { sign: 'scorpio', cap: 'Let one person | *all the way in.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sticky(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), ['TRUST', 'SOMEONE.', '(ONE.)'], { rot: -0.04, bg: '#c97bff' })
      L(x, 790, 1100, 'GUEST LIST: 1', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Home is | *an adventure too.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sticky(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2) * 0.85, ['UNPACK.', 'STAY A', 'WEEKEND.'], { rot: 0.05 })
      drawBits(x, SUIT, { K: INK, O: '#ffb34a', Y: GOLD }, 790, 1090, 20 * pop01(t, P.t0 + 0.8, 0.3, 2))
    } },
  { sign: 'capricorn', cap: 'Rest is | *part of the plan.*', mood: lt => lt > 1.4 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 320, 330, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.03 }, () => {
        lines(x, ['PLANNER', '9:00 WORK', '12:00 WORK', '3:00 NAP'], { size: 34 })
        if (lt > 1.0) { x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.ellipse(0, 69, 120, 32, 0, 0, Math.PI * 2 * clamp(prog(lt, 1.0, 1.4))); x.stroke() }
      })
    } },
  { sign: 'aquarius', cap: 'Your weird | *is your gift.*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sticky(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2) * 0.85, ['STAY', 'ODD. :)'], { rot: -0.05, bg: SKYB, size: 50 })
      drawBits(x, UFO, { K: INK, S: '#c4f0ff', G: '#9aa5c4', Y: GOLD }, 790, 1080 + 10 * Math.sin(t * 3), 18 * pop01(t, P.t0 + 0.9, 0.3, 2))
    } },
  { sign: 'pisces', cap: 'Your soft heart | *is strength.*', mood: 'heart', tears: lt => lt < 1.2 ? 2 : 1, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sticky(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), ['FEEL IT.', 'ALL OF IT.', 'YOU’RE OK.'], { rot: 0.05, bg: LAV, smudge: 1 })
      L(x, 790, 1100, 'NOTE: SLIGHTLY DAMP', pop01(t, P.t0 + 1.3, 0.3, 2.4), SKYB, -0.04, 28)
    } },
]

const F = makeFilm({
  id: 'r2a0509', key: 'E', accent: ACC, ending: 'callback',
  title: 'Each sign’s | *note to self.*',
  cameos: CAMEOS,
  group: { cap: 'Read it. | *Mean it.*' },
  last: {
    text: 'Capricorn took | *the 3pm nap.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'capricorn', 360, 1080, 280 * k, { mood: lt > 1.0 ? 'sleepy' : 'neutral', seed: 7, look: [1, 0] })
      card(x, 740, 1080, 260, 130, pop01(t, t0 + 0.5, 0.4, 2), { rot: 0.04, bg: INK }, () => lines(x, ['3:00'], { size: 70, color: MINT }))
      if (lt > 1.2) L(x, 740, 1260, 'NAP: TAKEN', pop01(t, t0 + 1.2, 0.3, 2.4), GOLD, -0.05, 40)
      if (lt > 1.4) sparkles(x, t, 360, 1000, t0 + 1.4, 7, 170, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
