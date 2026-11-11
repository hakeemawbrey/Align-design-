// v3t005: THE SIGNS AS… v3, "Zodiacs checking compatibility | be like." (~63 s vertical, signs3kit social cut, music: lofi · G)
//   0.0–3.6    "Zodiacs checking | *compatibility.*"
//   3.6–49.2   one compatibility check per sign (3.8 s each), each pushed to the extreme:
//              ♈ low match? challenge accepted · ♉ low match, stayed out of spite · ♊ got two results, agrees with both
//              · ♋ checked it with your mom · ♌ read the result to the whole café · ♍ fact-checked the stars
//              · ♎ perfect match, asked for a second opinion · ♏ result said "intense", Scorpio: finally
//              · ♐ checked it with a whole country · ♑ asked for a quarterly report · ♒ low match, rewrote the maths
//              · ♓ result: "soulmates", Pisces needs a minute
//  49.2        "Everyone *checked.*"
//  52.6        callback: "Second opinion? | *Still perfect.*" Libra's result card comes back, check #2.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', BROWN = '#8a4a2e', GREEN = '#5fd068'

const GLOBE = [
  '...BBBB...',
  '.BBGGBBBB.',
  'BBGGGBBGBB',
  'BGGGBBBGGB',
  'BBGBBBGGGB',
  'BBBBBBGGBB',
  'BBGGBBBBBB',
  '.BGGGBBBB.',
  '...BBBB...',
]
const GLOBE_C = { B: '#4a8ae8', G: GREEN }
const CUP = [
  '.S.S....',
  '..S.S...',
  'WWWWWW..',
  'WBBBBWWW',
  'WBBBBW.W',
  'WBBBBWWW',
  '.WWWW...',
]
const CUP_C = { S: '#d8dbe8', W: '#fff4e2', B: BROWN }
const MAGNIFY = [
  '..KKKK....',
  '.KSSSSK...',
  'KSWSSSSK..',
  'KSSSSSSK..',
  'KSSSSSSK..',
  '.KSSSSK...',
  '..KKKKBB..',
  '......BBB.',
  '.......BBB',
  '........BB',
]
const MAG_C = { K: '#6b62a8', S: SKYB, W: '#ffffff', B: BROWN }

// the app-style result card: two glyphs and a meter that fills to a word
function result(x, t, cx, cy, k, lt, { a = '♈︎', b = '♑︎', word = 'LOW', col = RED, fill = 0.25, w = 300 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  const h = 260
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = '#2a2350'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = BONE; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('COMPATIBILITY', 0, -h / 2 + 34)
  x.font = `700 64px 'Segoe UI Symbol', 'Noto Sans Symbols', 'Noto Sans Symbols 2', serif`; x.fillStyle = GOLD; x.fillText(`${a} + ${b}`, 0, -18)
  const f = fill * ease.outCubic(prog(lt, 0.4, 1.1))
  x.fillStyle = INK; x.fillRect(-w / 2 + 24, 44, w - 48, 30); x.fillStyle = '#140c30'; x.fillRect(-w / 2 + 28, 48, w - 56, 22)
  x.fillStyle = col; x.fillRect(-w / 2 + 28, 48, (w - 56) * f, 22)
  if (lt > 1.1) { x.fillStyle = col; x.font = `800 40px ${INTER}`; x.fillText(word, 0, 104) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Low match? | *Challenge accepted.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.4, 1.8],
    front(x, t, lt, P) {
      result(x, t, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), lt, { a: '♈︎', b: '♋︎', word: 'LOW', col: RED, fill: 0.2 })
      bubble(x, 380, 600, 'oh, it’s ON', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bc' })
    } },
  { sign: 'taurus', cap: 'Low match. | Stayed out of *spite.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      result(x, t, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), lt, { a: '♉︎', b: '♈︎', word: 'LOW', col: RED, fill: 0.18 })
      label(x, 800, 1080, 'NOT LEAVING.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.05 })
    } },
  { sign: 'gemini', cap: 'Got two results. | Agrees *with both.*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.8) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 800, 720, 'RESULT A: YES', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 34, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      label(x, 800, 860, 'RESULT B: NO', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 34, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 800, 1060, 'both valid!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Checked it | *with your mom.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 800, 960, 200 * k, { mood: lt > 1.3 ? 'heart' : 'happy', look: [-1, 0], seed: 12, glyph: false, hops: [P.t0 + 1.4] })
      label(x, 800, 790, 'YOUR MOM', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 34, bg: PINK, rot: 0.05 })
      bubble(x, 800, 620, 'she says | yes!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, tail: 'br' })
      hearts(x, t, 560, 860, P.t0 + 1.5, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Read the result aloud. | To *the whole café.*', mood: 'sparkle', star: { x: -170 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      drawBits(x, CUP, CUP_C, 820, 1060, 14 * pop01(t, P.t0 + 0.15, 0.3, 2))
      bubble(x, 800, 650, 'LEO + YOU: | ICONIC', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 800, 880, 'APPLAUSE ✦', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.05 })
      sparkles(x, t, 380, 820, P.t0 + 1.4, 6, 160, 0.2)
    } },
  { sign: 'virgo', cap: 'Fact-checked | *the stars.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      for (let i = 0; i < 4; i++) drawBits(x, ['..Y..', '.YYY.', 'YYYYY', '.YYY.', '..Y..'], { Y: i === 2 ? GOLD : BONE }, 680 + i * 90, 660 + (i % 2) * 50, 9 * k)
      drawBits(x, MAGNIFY, MAG_C, 800, 880, 18 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: -0.1 })
      label(x, 800, 1100, 'STAR 3: OFF BY 1°', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Perfect match. | Wants *a second opinion.*', mood: lt => lt > 1.3 ? 'squint' : 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      result(x, t, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), lt, { a: '♎︎', b: '♊︎', word: 'PERFECT', col: MINT, fill: 1 })
      bubble(x, 380, 600, 'are we sure?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, col: LAV, tail: 'bc' })
    } },
  { sign: 'scorpio', cap: 'Result said “intense.” | Scorpio: *“finally.”*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      result(x, t, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), lt, { a: '♏︎', b: '♏︎', word: 'INTENSE', col: '#ff4f86', fill: 1 })
      label(x, 800, 1090, 'PERFECT.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: '#ff4f86', color: '#fff4e2', rot: 0.05 })
    } },
  { sign: 'sagittarius', cap: 'Checked compatibility | with *a whole country.*', mood: 'sparkle', star: { x: 150 }, hops: [0.6, 1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      x.save(); x.translate(330, 850); x.rotate(Math.sin(t * 1.5) * 0.08); x.translate(-330, -850)
      drawBits(x, GLOBE, GLOBE_C, 330, 850, 26 * k); x.restore()
      label(x, 330, 620, '✦ IT’S A MATCH', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 330, 850, P.t0 + 1.3, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 8 })
    } },
  { sign: 'capricorn', cap: 'Asked for | a *quarterly report.*', mood: lt => lt < 1.2 ? 'neutral' : 'happy', look: [-1, 0], star: { x: 160 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.translate(320, 820); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-160, -170, 320, 340); x.fillStyle = '#fff4e2'; x.fillRect(-152, -162, 304, 324)
      x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('US · Q3', 0, -126)
      const BARS = [PINK, LAV, SKYB, MINT]
      for (let i = 0; i < 4; i++) { const h = 50 + i * 34, g = ease.outCubic(prog(lt, 0.5 + i * 0.2, 0.8 + i * 0.2)); x.fillStyle = BARS[i]; x.fillRect(-116 + i * 62, 130 - h * g, 44, h * g) }
      x.restore()
    },
    front(x, t, lt, P) {
      label(x, 320, 1090, 'ROMANCE: UP', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Low match? | Rewrote *the maths.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 830); x.rotate(-0.03); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -150, 340, 300); x.fillStyle = '#1f4a3a'; x.fillRect(-162, -142, 324, 284)
        x.fillStyle = BONE; x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        const L = ['♒︎ + ♉︎ = low', 'x² + ✦ = ?', '= PERFECT']
        const n = Math.floor(clamp((lt - 0.3) / 1.2) * 3 + 0.001)
        for (let i = 0; i < Math.min(n + 1, 3); i++) { x.fillStyle = i === 2 ? MINT : BONE; if (i === 0 && n > 0) { x.globalAlpha = 0.5 } x.fillText(L[i], 0, -80 + i * 80); x.globalAlpha = 1 }
        if (n > 0) { x.fillStyle = RED; x.fillRect(-120, -82, 240, 6) }
        x.restore()
      }
      sparkles(x, t, 800, 900, P.t0 + 1.5, 6, 170, 0.4, [MINT, BONE, SKYB])
    } },
  { sign: 'pisces', cap: 'Result: “soulmates.” | Pisces *needs a minute.*', mood: lt => lt < 1.0 ? 'heart' : 'wide', tears: lt => lt < 1.0 ? 2 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      result(x, t, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), lt, { a: '♓︎', b: '♋︎', word: 'SOULMATES', col: PINK, fill: 1, w: 320 })
      label(x, 800, 1090, 'TISSUES: OUT', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3t005', key: 'G', accent: GOLD,
  title: 'Zodiacs checking | *compatibility.*',
  cameos: CAMEOS,
  ending: 'callback',
  group: { cap: 'Everyone *checked.*' },
  last: {
    text: 'Second opinion? | *Still perfect.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'libra', 330, 1080, 260 * k, { mood: lt > 1.4 ? 'heart' : 'squint', look: [1, 0], seed: 5, hops: [t - lt + 1.5] })
      result(x, t, 720, 1040, 1.25 * pop01(t, t - lt + 0.5, 0.35, 2), lt, { a: '♎︎', b: '♊︎', word: 'PERFECT', col: MINT, fill: 1 })
      label(x, 720, 1260, 'CHECK #2', pop01(t, t - lt + 1.6, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
