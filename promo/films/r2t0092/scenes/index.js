// r2t0092: star_talk, BE LIKE, "Autocorrect strikes. | Zodiacs be like." (~58 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order vs. their phone's autocorrect. The format look lives in ../../signs3kit.js.
//   0.0–3.6    "Autocorrect strikes. | Zodiacs *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one autocorrect moment per sign (3.8 s each):
//              ♈ "on my way" became "on my whale", so Aries got a whale · ♉ "hungry" became "angry": both accurate
//              · ♊ started a debate with the keyboard · ♋ "hug" became "bug", still felt loved · ♌ the phone now corrects
//              every word to "Leo" · ♍ fired autocorrect for making errors · ♎ typed "maybe", autocorrect also unsure
//              · ♏ "sign" became "sin": "you'll never know." · ♐ never fixes a typo ("hlep im lsot") · ♑ autocorrect
//              suggested "lol", Cap typed "Regards." · ♒ ignored the suggestion, invented a word · ♓ got "good knight", cried
//  49.2        "Autocorrect *won.*"  The twelve fly up into a group photo.
//  52.6        callback: "Aries arrived. | *By whale.*"  The whale swims back in.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', OCEAN = '#4f8fe0'

// ── props
const WHALE = [
  '..............S.S.',
  '...............S..',
  '....BBBBBBB....S..',
  '..BBBBBBBBBBB.....',
  '.BBBBBBBBBBBBB...T',
  'BBKBBBBBBBBBBBB.TT',
  'BBBBBBBBBBBBBBBBTT',
  'WWWWWWWWBBBBBBB..T',
  '.WWWWWWWWWBBB.....',
  '...WWWWWW.........',
]
const WHALE_C = { B: OCEAN, K: INK, W: '#cfe6ff', S: SKYB, T: OCEAN }
const LADYBUG = [
  '...KK...',
  '..KKKK..',
  '.RRKRRR.',
  'RKRKRRKR',
  'RRRKRRRR',
  'RKRKRKRR',
  '.RRKRRR.',
]
const LADYBUG_C = { K: INK, R: RED }
const HELMET = [
  '...PPP....',
  '..PPP.....',
  '.GGGGGGG..',
  'GGGGGGGGG.',
  'GGKKKKKGG.',
  'GGGGGGGGG.',
  'GGKKKKKGG.',
  'GGGGGGGGG.',
  '.GGGGGGG..',
]
const HELMET_C = { P: PINK, G: '#c9c9d8', K: INK }

/** a phone with chat bubbles: lines = [text, bg, k, side(-1 them / 1 me / 0 centre), size] */
function phone(x, cx, cy, k, { head = 'MESSAGES', headCol = LAV, lines = [], rot = 0.05, keys = null } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -212, 296, 440)
  x.fillStyle = INK; x.fillRect(-154, -224, 308, 448)
  x.fillStyle = '#2a2350'; x.fillRect(-144, -214, 288, 428)
  x.fillStyle = '#140c30'; x.fillRect(-132, -190, 264, 380)
  x.fillStyle = headCol; x.fillRect(-120, -176, 240, 46)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -152)
  lines.forEach(([txt, col, kk, side = 1, size = 26], i) => {
    if (kk <= 0.01) return
    x.save(); x.font = `800 ${size}px ${INTER}`; const w = Math.min(240, x.measureText(txt).width + 28)
    x.translate(side * (120 - w / 2), -88 + i * 64); x.scale(kk, kk)
    if (col) { x.fillStyle = col; x.fillRect(-w / 2, -24, w, 48) }
    x.fillStyle = col ? INK : '#b9b0a0'; x.fillText(txt, 0, 2)
    x.restore()
  })
  if (keys) {   // a suggestion bar over a hint of keyboard
    x.fillStyle = '#3a3366'; x.fillRect(-132, 96, 264, 94)
    x.fillStyle = '#5b5480'; for (let r = 0; r < 2; r++) for (let c = 0; c < 8; c++) x.fillRect(-124 + c * 32, 140 + r * 24, 26, 18)
    x.fillStyle = '#d9d2f0'; x.fillRect(-132, 96, 264, 40)
    x.fillStyle = INK; x.font = `800 20px ${INTER}`
    keys.forEach((kk, i) => { x.fillText(kk, -88 + i * 88, 117); if (i) { x.fillStyle = '#9aa5c4'; x.fillRect(-132 + i * 88, 102, 2, 28); x.fillStyle = INK } })
  }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Autocorrect said “whale.” | Aries *got a whale.*', mood: 'sparkle', star: { x: -170, y: -40 }, hops: [1.2, 1.7],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      const k = ease.outCubic(prog(lt, 0.9, 1.5))
      if (k > 0.01) { x.save(); x.globalAlpha = k; x.fillStyle = OCEAN; x.fillRect(110, 1110, 860, 120); x.fillStyle = SKYB; for (let i = 0; i < 12; i++) x.fillRect(120 + i * 72 + 10 * Math.sin(t * 3 + i), 1100, 40, 12); x.restore() }
      drawBits(x, WHALE, WHALE_C, lerp(1100, 560, ease.outCubic(prog(lt, 0.9, 1.6))), 1080, 16 * k)
    },
    front(x, t, lt, P) {
      bubble(x, 790, 640, 'on my whale', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: SKYB, tail: 'bl' })
      label(x, 800, 790, 'ETA: SPLASH', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: '“Hungry” became “angry.” | *Both accurate.*', mood: lt => lt > 1.3 ? 'eyeroll' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const sw = lt > 0.9
      phone(x, 790, 850, pop01(t, P.t0 + 0.15, 0.3, 2), { lines: [
        ['dinner?', LAV, pop01(t, P.t0 + 0.3, 0.25, 2.2), -1],
        [sw ? 'I’m angry' : 'I’m hungry', sw ? RED : PINK, pop01(t, P.t0 + 0.5, 0.25, 2.2), 1],
        ['oh no, why?', LAV, pop01(t, P.t0 + 1.1, 0.25, 2.2), -1],
        ['no dinner yet', PINK, pop01(t, P.t0 + 1.6, 0.25, 2.2), 1],
      ] })
      label(x, 790, 1130, 'BOTH. CORRECT.', pop01(t, P.t0 + 1.9, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Started a debate | *with the keyboard.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'squint' : 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const L = ['did you mean…', 'no, I meant—', 'did you mean…', 'LET ME FINISH', 'did you mean…']
      const n = Math.min(4, Math.floor(Math.max(0, lt - 0.2) / 0.42))
      phone(x, 790, 870, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'ROUND ' + (n + 1), headCol: GOLD,
        lines: L.slice(Math.max(0, n - 3), n + 1).map((s, i, a) => [s, s.startsWith('did') ? '#d9d2f0' : '#ffd23a', 1, s.startsWith('did') ? -1 : 1, 22]) })
    } },
  { sign: 'cancer', cap: '“Hug” became “bug.” | *Still felt loved.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      bubble(x, 790, 640, 'sending a bug', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, col: PINK, tail: 'bl' })
      drawBits(x, LADYBUG, LADYBUG_C, 790 + 30 * Math.sin(t * 2), 880, 22 * pop01(t, P.t0 + 0.8, 0.35, 2), { rot: 0.2 * Math.sin(t * 3) })
      label(x, 790, 1090, 'HUG LEVEL: SAME', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 880, P.t0 + 1.4, { n: 5, life: 1.6, spread: 170, cell: 6, seed: 3 })
    } },
  { sign: 'leo', cap: 'Their phone corrects | everything *to “Leo.”*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', star: { x: -190 },
    front(x, t, lt, P) {
      const W = [['see you soon', 'Leo Leo Leo'], ['happy birthday!', 'Leo Leo!'], ['what’s new?', 'LEO.']]
      phone(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'MESSAGES', headCol: '#ffb34a', lines: W.map(([a, b], i) => [lt > 0.7 + i * 0.35 ? b : a, lt > 0.7 + i * 0.35 ? GOLD : '#d9d2f0', pop01(t, P.t0 + 0.3 + i * 0.15, 0.25, 2.2), 1]) })
      sparkles(x, t, 790, 860, P.t0 + 1.6, 8, 220, 0.3)
    } },
  { sign: 'virgo', cap: 'Fired autocorrect. | It was *making errors.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 830); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -180, 316, 380)
        x.fillStyle = INK; x.fillRect(-162, -192, 324, 384); x.fillStyle = CREAM; x.fillRect(-154, -184, 308, 368)
        x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('REVIEW:', 0, -140)
        x.font = `700 22px ${MONO}`; x.textAlign = 'left'
        const R = ['errors: 41', 'attitude: poor', 'commas: missing', 'verdict: gone']
        R.forEach((r, i) => { if (lt > 0.5 + i * 0.25) { x.fillStyle = i === 3 ? RED : INK; x.fillText(r, -128, -80 + i * 60) } })
        x.restore()
      }
      label(x, 790, 1110, 'AUTOCORRECT: OFF', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Typed “maybe.” | Autocorrect *also unsure.*', mood: lt => lt > 1.4 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const S = [['maybe', 'perhaps', 'possibly'], ['kinda?', 'unclear', 'hmm'], ['who knows', 'idk', 'shrug']]
      const n = Math.min(2, Math.floor(Math.max(0, lt - 0.5) / 0.55))
      phone(x, 790, 850, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'DINNER FRI?', headCol: PINK, lines: [['so, are you in?', LAV, pop01(t, P.t0 + 0.3, 0.25, 2.2), -1], ['maybe', PINK, pop01(t, P.t0 + 0.6, 0.25, 2.2), 1]], keys: S[n] })
    } },
  { sign: 'scorpio', cap: '“Sign” became “sin.” | *“You’ll never know.”*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      phone(x, 790, 850, pop01(t, P.t0 + 0.15, 0.3, 2), { head: '✦ NEW MATCH', headCol: MINT, lines: [
        ['what’s your sin?', LAV, pop01(t, P.t0 + 0.3, 0.25, 2.2), -1, 24],
        ['*sign, sorry!!', LAV, pop01(t, P.t0 + 0.7, 0.25, 2.2), -1, 24],
        ['you’ll never know.', '#c97bff', pop01(t, P.t0 + 1.3, 0.25, 2.2), 1, 24],
      ] })
      label(x, 790, 1120, 'MYSTERY: +100', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Never fixes a typo. | *“hlep im lsot lol”*', mood: 'sparkle', star: { x: 170 }, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      bubble(x, 320, 660, 'hlep im lsot lol', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'br' })
      bubble(x, 320, 820, 'hvaing fnu tho', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'br' })
      label(x, 310, 1000, 'LOCATION: ???', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Autocorrect suggested “lol.” | Cap typed *“Regards.”*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [-1, 0], star: { x: 170 },
    front(x, t, lt, P) {
      phone(x, 300, 850, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'BESTIE', headCol: '#2fc79a', rot: -0.05, lines: [
        ['I fell in a pond', LAV, pop01(t, P.t0 + 0.3, 0.25, 2.2), -1, 22],
        [lt > 1.2 ? 'Noted. Regards.' : '', lt > 1.2 ? '#2fc79a' : null, pop01(t, P.t0 + 1.2, 0.25, 2.2), 1, 22],
      ], keys: ['lol', 'haha', 'omg'] })
      label(x, 300, 1130, 'TONE: BOARDROOM', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Ignored every suggestion. | *Invented a word.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -190 },
    front(x, t, lt, P) {
      bubble(x, 790, 650, 'feeling very | flumbleish', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, col: MINT, tail: 'bl' })
      const k = pop01(t, P.t0 + 1.0, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 920); x.rotate(-0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -90, 340, 180); x.fillStyle = CREAM; x.fillRect(-162, -82, 324, 164)
        x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.font = `800 36px ${INTER}`; x.fillText('flumbleish', 0, -36)
        x.font = `700 20px ${MONO}`; x.fillStyle = '#6b62a8'; x.fillText('(adj.) you know.', 0, 14); x.fillText('see: Aquarius', 0, 46)
        x.restore()
      }
      label(x, 790, 1110, 'NOW IN THE DICTIONARY', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Got “good knight.” | *Cried.* So beautiful.', mood: lt => lt < 1.0 ? 'sparkle' : 'wide', tears: lt => lt < 1.0 ? 2 : 3, star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 640, 'good knight ♡', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      drawBits(x, HELMET, HELMET_C, 800, 900, 20 * pop01(t, P.t0 + 0.8, 0.35, 2), { rot: 0.06 * Math.sin(t * 2) })
      label(x, 790, 1110, 'A KNIGHT. FOR ME.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0092', key: 'E', accent: SKYB, ending: 'callback',
  title: 'Autocorrect strikes. | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Autocorrect *won.*' },
  last: {
    text: 'Aries arrived. | *By whale.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = ease.outCubic(prog(lt, 0.4, 1.0))
      x.save(); x.globalAlpha = k; x.fillStyle = OCEAN; x.fillRect(0, 1250, 1080, 300); x.fillStyle = SKYB; for (let i = 0; i < 16; i++) x.fillRect(i * 72 + 10 * Math.sin(t * 3 + i), 1240, 40, 12); x.restore()
      const wx = lerp(1300, 600, ease.outCubic(prog(lt, 0.5, 1.6)))
      drawBits(x, WHALE, WHALE_C, wx, 1180, 24 * k)
      if (k > 0.01) signChar(x, t, 'aries', wx - 30, 1020, 170, { mood: 'sparkle', seed: 31, hops: [t0 + 1.6, t0 + 2.4], glyph: false })
      sparkles(x, t, 600, 1100, t0 + 1.6, 8, 260, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
