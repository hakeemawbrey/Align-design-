// r2t0460: star_talk, BELIKE (twelve signs), "Shy zodiacs | *be like.*" (signs3kit social cut, music: lofi · F).
// Ending: callback (Gemini's twin comes back with the number: "The twin | got the number.").
//   ♈ shy for one second, then ran for mayor · ♉ too shy to ask, stared at the last roll · ♊ sent their twin instead
//   · ♋ hid in their shell · ♌ pretended to be shy, for attention · ♍ too shy to speak, sent a memo · ♎ waved for an hour
//   · ♏ not shy, mysterious · ♐ "so shy", told a stranger everything · ♑ too shy to flirt, sent a contract
//   · ♒ talked to the cat all night · ♓ said hi to their match, sobbed with relief
//   group "Shy? | Technically."   last "The twin | got the number."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#c9a6ff', CREAM = '#fff4e2', RED = '#e23d4e', SLATE = '#9aa5c4'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
const ST = { x: -190 }

const BREAD = ['....BBBBBB....', '..BBBWBBWBBB..', '.BBBBBBBBBBBB.', 'BBBBBBBBBBBBBB', 'KKKKKKKKKKKKKK', '.KKKKKKKKKKKK.']
const BREAD_C = { B: '#e0a56a', W: '#ffe7a8', K: '#8a4a2e' }
const SHELL = ['....SSSSSS....', '..SSDSSSSDSS..', '.SSSSDSSDSSSS.', 'SSDSSSDDSSSDSS', 'SSSDSSSSSSDSSS', 'SSSSDSSSSDSSSS', 'SSSSSSSSSSSSSS']
const SHELL_C = { S: '#ffb8a0', D: '#e0806a' }
const SHADES = ['KKKKK.KKKKK', 'KSSSKKKSSSK', 'KSSSK.KSSSK', '.KKK...KKK.']
const CAT = ['K.....K.', 'KK...KK.', 'KKKKKKK.', 'KGKKKGK.', 'KKKPKKK.', '.KKKKK..', '.KKKKKKK', '.KKKKKKK', '.K.K.K.K']
const CAT_C = { K: '#f2a65a', G: '#2a2350', P: PINK }

/** a sheet with a title and rows */
function sheet(x, cx, cy, k, { w = 330, h = 300, head = '', headCol = SLATE, rows = [], rot = 0.04, size = 30 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = CREAM; x.fillRect(-w / 2, -h / 2, w, h)
  if (head) { x.fillStyle = headCol; x.fillRect(-w / 2, -h / 2, w, 60); x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 31) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  rows.forEach(([txt, col, kk = 1], i) => {
    if (kk <= 0.01) return
    x.save(); x.globalAlpha *= clamp(kk); x.fillStyle = col || INK; x.font = `700 ${size}px ${MONO}`
    x.fillText(txt, -w / 2 + 22, -h / 2 + (head ? 60 : 0) + 44 + i * (size + 18)); x.restore()
  })
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Shy for one second. | Then *ran for mayor.*', mood: lt => lt > 0.9 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      L(x, 760, 860, 'VOTE ARIES!', pop01(t, P.t0 + 1.0, 0.3, 2.4), RED, -0.06, 46)
      sparkles(x, t, 790, 860, P.t0 + 1.1 * 1.29, 8, 220, 0.3)
    } },
  { sign: 'taurus', cap: 'Too shy to ask. | Stared at *the last roll.*', mood: 'wide', look: [1, 0.4], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BREAD, BREAD_C, 800, 940, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 680, 'STARING: MIN 40', pop01(t, P.t0 + 1.1, 0.3, 2.4), GOLD, 0.04, 34)
    } },
  { sign: 'gemini', cap: 'Too shy to talk. | Sent *their twin.*', mood: 'wink', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      signChar(x, t, 'gemini', 790, 880, 220, { pop: pop01(t, P.t0 + 0.6, 0.35, 2), seed: 61, mood: 'sparkle', glyph: false, hops: [P.t0 + 1.2] })
      bubble(x, 800, 640, 'hi, I’m the | brave one', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Shy? | Hid *in their shell.*', mood: 'wide', look: [1, 0], star: { x: -190, y: 30 },
    front(x, t, lt, P, F) {
      const d = ease.outCubic(prog(lt, 0.4, 0.9))
      drawBits(x, SHELL, SHELL_C, F.x, lerp(560, F.cy - 20, d), 24 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 790, 760, 'no one’s | home!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Pretended to be shy. | *For attention.*', mood: lt => lt > 1.1 ? 'wink' : 'squint', look: lt => lt > 1.1 ? [1, 0] : [-1, 1], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'don’t look | at me… ok look', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 790, 940, 'SPOTLIGHT: ON', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 38)
    } },
  { sign: 'virgo', cap: 'Too shy to speak. | Sent *a memo.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'MEMO', headCol: MINT, rows: [
        ['RE: hello', INK, pop01(t, P.t0 + 0.5, 0.2, 2)], ['1. hi', INK, pop01(t, P.t0 + 0.8, 0.2, 2)], ['2. see point 1', RED, pop01(t, P.t0 + 1.2, 0.2, 2)],
      ] })
    } },
  { sign: 'libra', cap: 'Too shy to talk. | *Waved for an hour.*', mood: 'happy', look: [1, 0], star: ST, hops: [0.5, 0.9, 1.3, 1.7, 2.1],
    front(x, t, lt, P) {
      const n = Math.min(212, Math.round(1 + 211 * ease.inCubic(prog(lt, 0.3, 2.0))))
      L(x, 790, 860, `WAVE #${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), PINK, -0.04, 50)
    } },
  { sign: 'scorpio', cap: 'Not shy. | *Mysterious.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      drawBits(x, SHADES, { K: INK, S: '#2a2350' }, F.x, F.cy - 6, 16 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 790, 860, 'BIG DIFFERENCE', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, 0.04, 38)
    } },
  { sign: 'sagittarius', cap: '“So shy.” | Told a stranger *everything.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'so it all | began in 2011…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bl' })
      L(x, 790, 920, 'CHAPTER 9 OF 30', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: 'capricorn', cap: 'Too shy to flirt. | Sent *a contract.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'TERMS OF DATE', headCol: SLATE, rows: [
        ['§1 dinner, 7pm', INK, pop01(t, P.t0 + 0.5, 0.2, 2)], ['§2 dessert: TBC', INK, pop01(t, P.t0 + 0.8, 0.2, 2)], ['sign here: ____', RED, pop01(t, P.t0 + 1.2, 0.2, 2)],
      ] })
    } },
  { sign: 'aquarius', cap: 'Shy at the party. | *Talked to the cat.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CAT, CAT_C, 800, 950, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 680, 'so, about | aliens…', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Said hi to their match. | *Sobbed with relief.*', mood: 'heart', tears: lt => lt > 0.9 ? 3 : 1, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      L(x, 790, 660, '✦ MATCH', pop01(t, P.t0 + 0.2, 0.3, 2), GOLD, -0.04, 38)
      bubble(x, 790, 860, 'hi.', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 56, col: LAV, tail: 'bl' })
      L(x, 790, 1060, 'HI: SENT. WE DID IT.', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, 0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2t0460', key: 'F', accent: ACC, ending: 'callback',
  title: 'Shy zodiacs | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Shy? | *Technically.*' },
  last: {
    text: 'The twin | *got the number.*',
    draw(x, t, lt) {
      const t0 = t - lt
      signChar(x, t, 'gemini', 540, 1060, 300, { pop: pop01(t, t0 + 0.6, 0.4, 2), seed: 61, mood: 'wink', glyph: false, hops: [t0 + 1.4] })
      label(x, 540, 1300, '✦ NUMBER: GOT', pop01(t, t0 + 1.4, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
