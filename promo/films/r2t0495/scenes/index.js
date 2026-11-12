// r2t0495: star_talk, SOLO, "Leos giving | *a speech.*" (~51 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way: nine moments a Leo got to speak, each the most extreme (and lovable) version. Ending: lesson.
//   0.0–3.6    "Leos giving | *a speech.*"
//   3.6–37.8   wedding toast, brought slides · "a few words", hired a spotlight · group project, a victory speech
//              · ordering coffee, thanked their fans · their birthday speech had an intermission · won the office raffle,
//              cried at the podium · a match said hi, got an acceptance speech · applause stopped, bowed eleven more times
//              · your speech? Leo cheered loudest
//  37.8        "One more thing… | *Forever.*"
//  41.0        LESSON: "Big speeches. | *Bigger heart.*"  APPLAUSE: MUTUAL
//  46.9        "Speech over? | *Encore at nine.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', DEEP = '#2a2350', WOOD = '#8a5a3a'
const ACC = '#ffb34a'
const S = 'leo', ST = { x: -170 }
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const R = (t, P, a = 0.2) => pop01(t, P.t0 + a, 0.3, 2)
const pill = (t, P, a) => pop01(t, P.t0 + a, 0.2, 2)

/** a wooden podium in front of the star */
function podium(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -20, 260, 40); x.fillRect(-100, 10, 200, 170)
  x.fillStyle = '#c98f2a'; x.fillRect(-122, -12, 244, 24); x.fillStyle = WOOD; x.fillRect(-92, 16, 184, 156)
  x.fillStyle = GOLD; x.fillRect(-30, 60, 60, 60); x.fillStyle = INK; x.font = `700 44px serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♌︎', 0, 92)
  x.restore()
}
function note(x, cx, cy, k, lines, { w = 300, bg = '#ffe27a', size = 34, rot = -0.06, font = INTER, weight = 800 } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.5, h = lines.length * lh + 46
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 23 + lh * (i + 0.5)))
  x.restore()
}
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * 1.1, k * 1.1)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = DEEP; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 24px ${MONO}`; const w = x.measureText(txt).width + 22
    x.save(); x.translate(right ? 96 - w : -96, -62 + i * 60); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -21, w, 42); x.fillStyle = INK; x.fillText(txt, 11, 2)
    x.restore()
  })
  x.restore()
}
/** a projector screen with a slide title and a page counter */
function screen(x, cx, cy, k, title, page) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-190, -150, 380, 250); x.fillRect(-6, 100, 12, 90); x.fillRect(-60, 184, 120, 12)
  x.fillStyle = '#ffffff'; x.fillRect(-180, -140, 360, 230)
  x.fillStyle = ORANGE; x.fillRect(-180, -140, 360, 50)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -114)
  x.fillStyle = '#b9b0a0'; for (let i = 0; i < 3; i++) x.fillRect(-140, -60 + i * 40, 280 - i * 60, 16)
  x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.fillText(page, 0, 70)
  x.restore()
}
/** a soft spotlight cone from above onto (cx, cy) */
function spot(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = 0.32 * clamp(k)
  x.fillStyle = '#fff1b0'; x.beginPath(); x.moveTo(cx - 40, 480); x.lineTo(cx + 40, 480); x.lineTo(cx + 230, cy + 160); x.lineTo(cx - 230, cy + 160); x.closePath(); x.fill()
  x.restore()
  x.save(); x.globalAlpha = clamp(k); x.fillStyle = INK; x.fillRect(cx - 60, 470, 120, 50); x.fillStyle = '#5b5b70'; x.fillRect(cx - 52, 476, 104, 38); x.restore()
}
const CUP = ['.S.S..', '..S.S.', 'WWWWW.', 'WCCCWWW', 'WCCCW.W', 'WCCCWWW', 'WWWWW..']
const MUG = ['WWWWWW.', 'WRRRRWW', 'WRWWRW.W', 'WRRRRWW', 'WWWWWW.']

const CAMEOS = [
  // 1 · the wedding toast
  { sign: S, cap: 'A wedding toast? | Brought *slides.*', mood: lt => lt < 1.2 ? 'sparkle' : 'wink', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const pg = 1 + Math.floor(clamp((lt - 0.6) / 1.4) * 40)
      screen(x, 800, 820, R(t, P), 'MY JOURNEY', `slide ${pg} / 87`)
      L(x, 800, 1110, 'THE COUPLE: WAITING', pop01(t, P.t0 + 1.6, 0.3, 2.2), PINK, 0.04, 28)
    } },
  // 2 · a few words
  { sign: S, cap: 'Asked for “a few words.” | Hired *a spotlight.*', mood: 'sparkle', star: { x: -40 }, hops: [1.1],
    back(x, t, lt, P) { spot(x, 500, 880, R(t, P, 0.6)) },
    front(x, t, lt, P) {
      bubble(x, 780, 620, 'ahem.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 44, tail: 'bl' })
      sparkles(x, t, 500, 860, P.t0 + 0.9, 8, 200, 0.2)
    } },
  // 3 · group project
  { sign: S, cap: 'Group project? | Gave a *victory speech.*', mood: lt => lt < 1.2 ? 'sparkle' : 'heart', star: { x: -170, y: -40 },
    front(x, t, lt, P, F) {
      podium(x, F.x, 1060, R(t, P, 0.1))
      L(x, 800, 720, 'GRADE: B–', pop01(t, P.t0 + 0.6, 0.3, 2.2), BONE, -0.05, 44)
      bubble(x, 800, 930, 'we did it, | team.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  // 4 · coffee order
  { sign: S, cap: 'Ordering coffee. | *Thanked their fans.*', mood: lt => lt < 1.1 ? 'happy' : 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, CUP, { S: '#e6e1f2', W: CREAM, C: '#8a5a3a' }, 820, 960, 18 * R(t, P, 0.2))
      bubble(x, 800, 700, 'and to my | barista…', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 820, 1140, 'QUEUE: 14 PEOPLE', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  // 5 · the birthday speech
  { sign: S, cap: 'Their birthday speech | had an *intermission.*', mood: lt => lt < 1.3 ? 'sparkle' : 'wink', star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      note(x, 800, 820, R(t, P), ['ACT I', 'me as a baby', 'ACT II', 'me, now'], { w: 300, bg: CREAM, size: 32, rot: 0.04, font: MONO, weight: 700 })
      L(x, 800, 1090, 'INTERMISSION: 15 MIN', pop01(t, P.t0 + 1.4, 0.3, 2.2), RED, -0.04, 28, CREAM)
    } },
  // 6 · the raffle
  { sign: S, cap: 'Won the office raffle. | Cried *at the podium.*', mood: lt => lt < 1.0 ? 'wide' : 'sparkle', tears: lt => lt < 1.0 ? 0 : 2, star: { x: -170, y: -40 },
    front(x, t, lt, P, F) {
      podium(x, F.x, 1060, R(t, P, 0.1))
      drawBits(x, MUG, { W: '#ffffff', R: PINK }, 800, 860, 22 * R(t, P, 0.5))
      L(x, 800, 700, 'PRIZE: A MUG', pop01(t, P.t0 + 0.8, 0.3, 2.2), GOLD, 0.04, 34)
      bubble(x, 800, 1060, 'I’d like to | thank my mom', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  // 7 · the match
  { sign: S, cap: 'A match said “hi.” | Got an *acceptance speech.*', mood: lt => lt < 1.2 ? 'wide' : 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 800, 860, R(t, P), { head: 'NEW MATCH', headCol: PINK, lines: [['hi :)', LAV, pill(t, P, 0.4)], ['wow. first,', GOLD, pill(t, P, 0.9), true], ['I’d like to', GOLD, pill(t, P, 1.1), true], ['thank the', GOLD, pill(t, P, 1.3), true], ['stars…', GOLD, pill(t, P, 1.5), true]] })
    } },
  // 8 · the bows
  { sign: S, cap: 'Applause stopped. | Bowed *eleven more times.*', mood: 'sparkle', star: ST,
    squash: lt => 0.14 * Math.max(0, Math.sin(lt * 9)),
    front(x, t, lt, P) {
      const n = Math.min(12, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.16))
      L(x, 800, 820, `BOW #${n}`, R(t, P, 0.2), GOLD, 0.05, 56)
      bubble(x, 800, 1040, 'thank you, | thank you', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 800, 640, 'CROWD: GONE HOME', pop01(t, P.t0 + 1.7, 0.3, 2.2), LAV, -0.04, 28)
    } },
  // 9 · your speech
  { sign: S, cap: 'Your speech? | Leo *cheered loudest.*', mood: lt => lt < 1.1 ? 'sparkle' : 'heart', look: [1, 0], star: ST, hops: [0.9, 1.3, 1.7],
    front(x, t, lt, P, F) {
      const k = R(t, P, 0.2)
      if (k > 0.01) { podium(x, 820, 1080, k * 0.7); signChar(x, t, 'virgo', 820, 960, 150 * k, { mood: lt > 1.3 ? 'heart' : 'wide', look: [-1, 0], seed: 61, glyph: false }) }
      bubble(x, 420, 620, 'BRAVO!!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, col: GOLD, tail: 'bc' })
      hearts(x, t, 800, 860, P.t0 + 1.3, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 9 })
    } },
]

const F = makeFilm({
  id: 'r2t0495', key: 'F', accent: ACC, solo: S, ending: 'lesson',
  title: 'Leos giving | *a speech.*',
  cameos: CAMEOS,
  group: { cap: 'One more thing… | *Forever.*', mood: 'sparkle' },
  lesson: { text: 'Big speeches. | *Bigger heart.*', chip: 'APPLAUSE: MUTUAL' },
  last: {
    text: 'Speech over? | *Encore at nine.*',
    draw(x, t, lt) { sparkles(x, t, 540, 1150, t - lt + 0.6, 10, 260, 0.2); hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.2, spread: 600, cell: 8, seed: 2 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
