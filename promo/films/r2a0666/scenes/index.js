// r2a0666: star_advice, ADVICE SOLO (virgo), "What a Virgo | *won't say.*" (signs3kit social cut, music: lofi · D).
// One sign (solo, 9 cards): the quiet things a Virgo means but never says, each with one gentle visual gag. Ending: callback.
//   straightened your crooked frame so you wouldn't stress · noticed the new earrings (magnifying glass) · tired too,
//   battery at 3% · your mess, loved anyway · packed a list for your feelings · compliments make them short-circuit
//   · the worry list is a care list · not judging, proofreading · a match who notices back
//   group "Quiet care. | *Loud heart.*"
//   last "Their battery? | *Charged by you.*" (card 3, paid off: the 3% battery fills back up)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, RED, CREAM, STEEL, PLUM, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dffb0', S = 'virgo', ST = { x: -190 }

/** a chunky pixel battery, p = 0…1 charge */
function battery(x, cx, cy, k, p, { w = 300, h = 140 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 10, -h / 2 - 10, w + 20, h + 20); x.fillRect(w / 2 + 6, -h / 4 - 6, 34, h / 2 + 12)
  x.fillStyle = BONE; x.fillRect(-w / 2, -h / 2, w, h); x.fillRect(w / 2 + 10, -h / 4, 22, h / 2)
  x.fillStyle = NIGHT; x.fillRect(-w / 2 + 12, -h / 2 + 12, w - 24, h - 24)
  x.fillStyle = p < 0.2 ? RED : p < 0.6 ? GOLD : MINT; x.fillRect(-w / 2 + 12, -h / 2 + 12, (w - 24) * clamp(p), h - 24)
  x.fillStyle = BONE; x.font = `700 44px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`${Math.round(p * 100)}%`, 0, 3)
  x.restore()
}
/** a picture frame that starts crooked and is nudged straight */
function frameStraight(x, cx, cy, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy - 150); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-3, -40, 6, 40)
  x.translate(0, 150)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -100, 300, 230)
  x.fillStyle = INK; x.fillRect(-160, -120, 320, 240); x.fillStyle = '#c98f2a'; x.fillRect(-150, -110, 300, 220)
  x.fillStyle = SKYB; x.fillRect(-122, -82, 244, 164)
  x.fillStyle = '#5fd068'; x.fillRect(-122, 30, 244, 52)
  x.fillStyle = GOLD; x.fillRect(50, -60, 40, 40)
  x.restore()
}
const MAG = ['..KKKK...', '.KssssK..', 'KsWsssK.'.padEnd(9, '.'), 'KssssssK.', 'KssssssK.', '.KssssK..', '..KKKKHH.', '.......HH', '........H']
const MAG_C = { K: BONE, s: '#bfe9ff', W: '#ffffff', H: '#ffb34a' }
const SOCK = ['.PPP', '.PPP', '.PPP', '.PPP', 'PPPP', 'PPPW', 'WWW.']

const CAMEOS = [
  { sign: S, cap: 'I fixed it | *so you wouldn’t stress.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const rot = lerp(0.32, 0, ease.inOutCubic(prog(lt, 0.7, 1.3)))
      frameStraight(x, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2), rot)
      if (lt > 1.3) sparkles(x, t, 790, 830, P.t0 + 1.3 * 3.1 / 2.4, 6, 190, 0.4)
      L(x, 790, 1090, 'QUIETLY FIXED ✓', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, -0.04, 36)
    } },
  { sign: S, cap: 'I noticed. | *I always notice.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const fr = { x: 810, y: 900 }
      drawBits(x, MAG, MAG_C, lerp(700, fr.x + 40, ease.outCubic(prog(lt, 0.4, 1.0))), fr.y - 10, 26 * k)
      if (k > 0.01) { drawBits(x, ['.GG.', 'G..G', 'G..G', '.GG.'], { G: GOLD }, fr.x + 20, fr.y - 40, 12 * k) }
      bubble(x, 790, 660, 'new earrings?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, tail: 'bl', col: LAV })
      L(x, 790, 1100, 'DETAIL: SEEN', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 36)
    } },
  { sign: S, cap: 'I’m tired too. | *Ask me sometimes.*', mood: 'sleepy', look: [1, 0], star: ST, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      battery(x, 780, 800, pop01(t, P.t0 + 0.2, 0.3, 2), lerp(0.4, 0.03, ease.inOutCubic(prog(lt, 0.4, 1.2))))
      bubble(x, 790, 1040, 'you okay? ♡', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: S, cap: 'Your mess stresses me. | I love you *anyway.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, SOCK, { P: [PINK, SKYB, GOLD][i], W: BONE }, 690 + i * 110, 1000 + (i % 2) * 30, 14 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2), { rot: (i - 1) * 0.5 })
      hearts(x, t, 790, 900, P.t0 + 1.4 * 3.1 / 2.4, { n: 5, life: 1.6, spread: 200, cell: 8, seed: 2 })
      L(x, 790, 700, 'LOVE > MESS', pop01(t, P.t0 + 1.2, 0.3, 2.2), PINK, -0.04, 42)
    } },
  { sign: S, cap: 'I packed a list | *for your feelings too.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, h: 380, rot: 0.04, head: 'FOR YOU', headBg: MINT, headInk: INK, lines: ['✓ snacks', '✓ charger', '✓ tissues', '✓ a hug'], size: 38, align: 'left', progress: clamp((lt - 0.4) / 1.2) })
    } },
  { sign: S, cap: 'Compliments make me | *short-circuit.*', mood: lt => lt > 1.1 ? 'wide' : 'happy', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P, F) {
      bubble(x, 790, 680, 'you’re amazing!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl', col: LAV })
      L(x, 770, 940, 'CAN’T ACCEPT', pop01(t, P.t0 + 1.1, 0.3, 2.2), RED, 0.04, 36)
      if (lt > 1.1) for (let i = 0; i < 3; i++) { const a = t * 6 + i * 2.1; drawBits(x, ['Y.', 'YY', '.Y'], { Y: GOLD }, F.x + Math.cos(a) * 140, F.cy - 150 + Math.sin(a) * 20, 9) }
    } },
  { sign: S, cap: 'My worry list | is a *care list.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const sw = lt > 1.2
      sheet(x, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, h: 340, rot: -0.04, head: sw ? 'CARE LIST ♡' : 'WORRY LIST', headBg: sw ? PINK : STEEL, headInk: INK, lines: ['did you eat?', 'got home ok?', 'wear a coat'], size: 34 })
    } },
  { sign: S, cap: 'Not judging. | Just *proofreading.*', mood: 'squint', look: [1, 0], star: ST, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      sheet(x, 790, 820, k, { w: 340, h: 300, rot: 0.04, head: 'YOUR TEXT', headBg: LAV, headInk: INK, lines: ['your the best', 'freind ever'], size: 38 })
      if (lt > 0.9) { x.save(); x.translate(790, 820); x.rotate(0.04); x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.ellipse(-98, -50, 50, 28, 0, 0, Math.PI * 2); x.stroke(); if (lt > 1.2) { x.beginPath(); x.ellipse(-62, 2, 64, 28, 0, 0, Math.PI * 2); x.stroke() } x.restore() }
      L(x, 790, 1070, 'STILL LOVE IT ♡', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, -0.04, 36)
    } },
  { sign: S, cap: 'I want someone | who *notices me back.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 790, 830, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'NEW MATCH ✦', headCol: MINT, lines: [['you fixed my', BONE, pop01(t, P.t0 + 0.7, 0.25, 2)], ['typo. marry me', BONE, pop01(t, P.t0 + 0.9, 0.25, 2)], ['…okay ♡', PINK, pop01(t, P.t0 + 1.5, 0.25, 2), true]] })
    } },
]

const F = makeFilm({
  id: 'r2a0666', key: 'D', accent: ACC, solo: S, ending: 'callback',
  title: 'What a Virgo | *won’t say.*',
  cameos: CAMEOS,
  group: { cap: 'Quiet care. | *Loud heart.*', mood: 'heart' },
  last: {
    text: 'Their battery? | *Charged by you.*',
    draw(x, t, lt) {
      battery(x, 520, 1100, pop01(t, t - lt + 0.4, 0.35, 2), lerp(0.03, 1, ease.inOutCubic(prog(lt, 0.9, 2.4))), { w: 460, h: 200 })
      if (lt > 2.4) hearts(x, t, 540, 960, t - lt + 2.4, { n: 6, life: 1.4, spread: 360, cell: 8, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
