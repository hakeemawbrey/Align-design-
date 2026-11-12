// r2t0326: star_talk, ROLL CALL, "The signs | at art class." (signs3kit social cut, music: lofi · C). Ending: callback.
//   0.0–3.6    "The signs | *at art class.*"  The twelve line up, then dive into the pips.
//   3.6–49.2   twelve cards (3.8 s each), each sign's most extreme art-class self:
//              ♈ finished before "begin" · ♉ painted the fruit bowl, ate the model · ♊ two easels at once
//              · ♋ assignment: anything, painted mom again · ♌ life-size self-portrait (new profile pic)
//              · ♍ measured every brushstroke · ♎ forty minutes picking a colour · ♏ painted the vibe: all black
//              · ♐ paint on the ceiling, somehow · ♑ sold it before class ended · ♒ their birth chart as abstract art
//              · ♓ cried at the blank canvas
//  49.2        "Twelve masterpieces. | *Allegedly.*"  Group photo.
//  52.6        callback: "Same fruit | *next week?*" Taurus and the apple core.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', BROWN = '#8a4a2e', ORANGE = '#ffb34a', TEAL = '#2fc79a'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

/** an easel with a canvas; paint(x, w, h) draws inside the canvas (origin at its centre) */
function easel(x, cx, cy, k, { w = 300, h = 340, rot = 0.03, legs = true, paint } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  if (legs) { x.fillStyle = INK; x.fillRect(-w * 0.32 - 4, h / 2 - 20, 26, 190); x.fillRect(w * 0.32 - 22, h / 2 - 20, 26, 190); x.fillStyle = BROWN; x.fillRect(-w * 0.32, h / 2 - 20, 18, 186); x.fillRect(w * 0.32 - 18, h / 2 - 20, 18, 186) }
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
  x.fillStyle = CREAM; x.fillRect(-w / 2, -h / 2, w, h)
  if (paint) { x.save(); x.beginPath(); x.rect(-w / 2, -h / 2, w, h); x.clip(); paint(x, w, h); x.restore() }
  x.restore()
}
/** a round paint blob */
const blob = (x, cx, cy, r, col) => { x.fillStyle = col; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill() }

const APPLE = ['....G...', '...GG...', '.RRRRRR.', 'RRWRRRRR', 'RRRRRRRR', 'RRRRRRRR', '.RRRRRR.', '..RRRR..']
const PEAR = ['...G..', '..YY..', '.YYYY.', '.YYYY.', 'YYYYYY', 'YYYYYY', '.YYYY.']
const CORE = ['...G...', '...B...', '.RRRRR.', '..CCC..', '...C...', '..CCC..', '.RRRRR.']
const BOWL = ['WWWWWWWWWWWW', '.WWWWWWWWWW.', '..WWWWWWWW..', '...WWWWWW...']
const RULER = ['YYYYYYYYYYYYYYYYYYYY', 'YKYKYKYKYKYKYKYKYKYK', 'YKY.YKY.YKY.YKY.YKY.', 'YYYYYYYYYYYYYYYYYYYY']
const BRUSH = ['......PP', '.....PPP', '....PPP.', '...SSS..', '..BBS...', '.BBB....', 'BBB.....', 'BB......']
const TAG = ['..KK......', '.K..K.....', 'GGGGGGGGGG', 'GGGGGGGGGG', 'GGGGGGGGGG', 'GGGGGGGGGG']

const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']

const CAMEOS = [
  { sign: 'aries', cap: 'Finished the painting | before *“begin.”*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', star: { x: -170 }, hops: [0.3, 0.6, 1.3],
    front(x, t, lt, P) {
      easel(x, 790, 820, pop01(t, P.t0 + 0.15, 0.3, 2), { paint(x, w, h) {
        const p = clamp(lt / 0.9)
        const S = [[-70, -60, 70, RED], [60, -20, 60, ORANGE], [-20, 70, 80, GOLD], [80, 100, 40, PINK]]
        S.forEach(([a, b, r, c], i) => { if (p > i / 4) blob(x, a, b, r * clamp((p - i / 4) * 4), c) })
      } })
      bubble(x, 800, 600, 'done!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 50, tail: 'bl' })
      L(x, 790, 1110, 'CLASS TIME: 0:04', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'taurus', cap: 'Painted the fruit bowl. | *Ate the model.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, BOWL, { W: CREAM }, 800, 1020, 28 * k)
      if (lt < 1.0) { drawBits(x, APPLE, { G: '#5fd068', R: RED, W: '#ffffff' }, 730, 910, 20 * k); drawBits(x, PEAR, { G: '#5fd068', Y: '#d8e04a' }, 870, 905, 20 * k) }
      else drawBits(x, CORE, { G: '#5fd068', B: BROWN, R: RED, C: CREAM }, 800, 900, 22 * pop01(t, P.t0 + 1.0, 0.3, 2.4))
      L(x, 800, 700, 'STILL LIFE: GONE', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'gemini', cap: 'Two easels. | *Two styles.* Same time.', mood: 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: { x: 0, y: 40, s: 260 }, hops: [0.6, 1.2, 1.8],
    back(x, t, lt, P) {
      easel(x, 270, 780, pop01(t, P.t0 + 0.15, 0.3, 2), { w: 240, h: 280, rot: -0.05, paint(x) { x.fillStyle = SKYB; x.fillRect(-120, -140, 240, 160); x.fillStyle = '#5fd068'; x.fillRect(-120, 20, 240, 120); blob(x, 60, -70, 34, GOLD) } })
      easel(x, 810, 780, pop01(t, P.t0 + 0.35, 0.3, 2), { w: 240, h: 280, rot: 0.05, paint(x) { for (let i = 0; i < 6; i++) { x.fillStyle = [PINK, LAV, ORANGE, TEAL, RED, GOLD][i]; x.fillRect(-120 + i * 40, -140 + (i % 3) * 60, 60, 160) } } })
    },
    front(x, t, lt, P) {
      L(x, 270, 1040, 'CALM', pop01(t, P.t0 + 1.0, 0.3, 2.4), MINT, -0.05, 34)
      L(x, 810, 1040, 'CHAOS', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, 0.05, 34)
    } },
  { sign: 'cancer', cap: 'Assignment: anything. | Painted *mom. Again.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      easel(x, 790, 820, pop01(t, P.t0 + 0.15, 0.3, 2), { paint(x) {
        x.fillStyle = '#ffd9c2'; x.beginPath(); x.arc(0, -20, 90, 0, Math.PI * 2); x.fill()
        x.fillStyle = BROWN; x.beginPath(); x.arc(0, -60, 96, Math.PI, Math.PI * 2); x.fill()
        x.fillStyle = INK; x.fillRect(-40, -30, 14, 14); x.fillRect(26, -30, 14, 14)
        x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.arc(0, 10, 30, 0.2, Math.PI - 0.2); x.stroke()
        x.fillStyle = PINK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.fillText('♡ MOM ♡', 0, 130)
      } })
      L(x, 900, 610, 'MOM #14', pop01(t, P.t0 + 1.0, 0.3, 2.4), PINK, 0.06, 36)
      hearts(x, t, 790, 760, P.t0 + 1.4, { n: 4, life: 1.4, spread: 160, cell: 7, seed: 4 })
    } },
  { sign: 'leo', cap: 'Self-portrait. | *Life-size.* Gold frame.', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: { x: 0, y: 10, s: 330 }, hops: [1.2],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k <= 0.01) return
      x.save(); x.translate(540, 860); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-250, -260, 500, 520)
      x.fillStyle = GOLD; x.fillRect(-240, -250, 480, 500)
      x.fillStyle = '#c98f2a'; for (let i = 0; i < 12; i++) { x.fillRect(-240 + i * 40, -250, 20, 20); x.fillRect(-240 + i * 40, 230, 20, 20) }
      x.fillStyle = '#2a1c50'; x.fillRect(-200, -210, 400, 420)
      x.restore()
    },
    front(x, t, lt, P) {
      sparkles(x, t, 540, 860, P.t0 + 0.6, 8, 240, 0.3)
      L(x, 540, 1160, 'NEW PROFILE PIC', pop01(t, P.t0 + 1.4, 0.3, 2.4), ORANGE, -0.03, 34)
    } },
  { sign: 'virgo', cap: 'Measured every | *brushstroke.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      easel(x, 790, 800, pop01(t, P.t0 + 0.15, 0.3, 2), { paint(x) { x.fillStyle = TEAL; for (let i = 0; i < 5; i++) x.fillRect(-110, -120 + i * 56, 220, 20) } })
      drawBits(x, RULER, { Y: GOLD, K: INK }, 790, 690 + 56 * Math.min(4, Math.floor(lt * 2)) * 1, 11 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: 0 })
      L(x, 790, 1110, '2.0 CM. EXACTLY.', pop01(t, P.t0 + 1.5, 0.3, 2.4), '#a8d86a', 0.04, 32)
    } },
  { sign: 'libra', cap: 'Forty minutes | picking *a colour.*', mood: lt => lt > 1.8 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 900); x.rotate(-0.08); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 190, 130, 0, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#e6c28a'; x.beginPath(); x.ellipse(0, 0, 180, 120, 0, 0, Math.PI * 2); x.fill()
        x.fillStyle = INK; x.beginPath(); x.arc(90, 50, 26, 0, Math.PI * 2); x.fill()
        const C = [RED, ORANGE, GOLD, TEAL, SKYB, LAV, PINK], on = Math.floor(lt * 3) % C.length
        C.forEach((c, i) => { const a = -2.6 + i * 0.62; blob(x, Math.cos(a) * 110, Math.sin(a) * 66, i === on ? 34 : 24, c) })
        x.restore()
      }
      const W = ['this one?', 'no, that?', 'or this?']
      bubble(x, 790, 640, W[Math.floor(lt * 1.5) % 3], pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, tail: 'bl' })
      L(x, 790, 1110, 'CANVAS: STILL BLANK', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, 0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Painted the vibe. | It’s *all black.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      easel(x, 790, 820, pop01(t, P.t0 + 0.15, 0.3, 2), { paint(x, w, h) { x.fillStyle = '#0b0718'; x.fillRect(-w / 2, -h / 2, w * clamp(lt / 1.0), h) } })
      L(x, 790, 1110, 'TITLE: “FEELINGS”', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, -0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Paint on the ceiling. | *Somehow.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [0, -1], star: { x: 0, y: 60, s: 280 }, hops: [0.4, 0.9, 1.4],
    front(x, t, lt, P) {
      const SP = [[200, 520, RED], [380, 500, GOLD], [600, 530, TEAL], [800, 505, PINK], [930, 560, SKYB], [290, 640, ORANGE], [860, 680, LAV]]
      SP.forEach(([a, b, c], i) => {
        const k = pop01(t, P.t0 + 0.25 + i * 0.16, 0.22, 2.4)
        if (k <= 0.01) return
        x.save(); x.translate(a, b); x.scale(k, k); blob(x, 0, 0, 34, c); blob(x, 30, 16, 14, c); blob(x, -26, 20, 12, c); x.fillStyle = c; x.fillRect(-6, 0, 12, 50 + 30 * clamp(lt - 1)); x.restore()
      })
      drawBits(x, BRUSH, { P: PINK, S: '#c9c9d8', B: BROWN }, 760, 1060, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.3 })
      L(x, 330, 1110, 'TEACHER: ??', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.05, 32)
    } },
  { sign: 'capricorn', cap: 'Sold the painting | *before class ended.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [-1, 0], star: { x: 170 },
    front(x, t, lt, P) {
      easel(x, 290, 820, pop01(t, P.t0 + 0.15, 0.3, 2), { rot: -0.03, paint(x) { x.fillStyle = SKYB; x.fillRect(-150, -170, 300, 200); x.fillStyle = '#6b62a8'; x.beginPath(); x.moveTo(-150, 40); x.lineTo(-40, -80); x.lineTo(50, 10); x.lineTo(120, -50); x.lineTo(150, 40); x.closePath(); x.fill(); x.fillStyle = '#5fd068'; x.fillRect(-150, 40, 300, 140) } })
      drawBits(x, TAG, { K: INK, G: TEAL }, 470, 600, 14 * pop01(t, P.t0 + 0.7, 0.3, 2.2), { rot: 0.15 })
      L(x, 290, 1110, '✦ SOLD ✦', pop01(t, P.t0 + 1.3, 0.3, 2.4), TEAL, -0.04, 40)
      sparkles(x, t, 290, 1110, P.t0 + 1.4, 6, 140, 0.2)
    } },
  { sign: 'aquarius', cap: 'Drew their birth chart. | As *abstract art.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      easel(x, 790, 820, pop01(t, P.t0 + 0.15, 0.3, 2), { paint(x) {
        x.save(); x.rotate(t * 0.4)
        for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 120, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
        x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 60, 0, Math.PI * 2); x.fill()
        x.restore()
        x.fillStyle = INK; x.fillRect(-150, 60, 300, 10); x.fillRect(40, -170, 10, 340)
      } })
      L(x, 790, 1110, 'MEANING: CLASSIFIED', pop01(t, P.t0 + 1.4, 0.3, 2.4), SKYB, 0.04, 30)
    } },
  { sign: 'pisces', cap: 'Cried at the | *blank canvas.*', mood: 'wide', tears: lt => lt < 0.9 ? 1 : 3, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      easel(x, 790, 820, pop01(t, P.t0 + 0.15, 0.3, 2))
      bubble(x, 790, 620, 'it’s so | full of hope', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
      sparkles(x, t, 790, 820, P.t0 + 0.5, 6, 170, 0.6, [BONE, SKYB, LAV])
    } },
]

const F = makeFilm({
  id: 'r2t0326', key: 'C', accent: '#ffb34a', ending: 'callback',
  title: 'The signs | *at art class.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve masterpieces. | *Allegedly.*' },
  last: {
    text: 'Same fruit | *next week?*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'taurus', 400, 1080, 280 * k, { mood: lt > 1.2 ? 'heart' : 'happy', seed: 8, look: [1, 0], hops: [t0 + 1.3] })
      drawBits(x, BOWL, { W: CREAM }, 740, 1200, 20 * pop01(t, t0 + 0.5, 0.35, 2))
      drawBits(x, CORE, { G: '#5fd068', B: BROWN, R: RED, C: CREAM }, 740, 1120, 15 * pop01(t, t0 + 0.7, 0.35, 2.2), { rot: 0.05 * Math.sin(t * 3) })
      if (lt > 1.2) bubble(x, 760, 920, 'for art.', pop01(t, t0 + 1.2, 0.25, 2.4), { size: 44, tail: 'bc' })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
