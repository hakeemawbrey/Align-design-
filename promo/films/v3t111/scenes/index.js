// v3t111: THE SIGNS AS… v3, SOLO film, "Things only | Geminis get." (~51 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through: nine everyday situations, each pushed to the most extreme (and lovable) Gemini version.
//   0.0–3.6    "Things only | *Geminis* get."  One big Gemini pops in, then the cards start.
//   3.6–37.8   nine cards: three new hobbies since lunch · went in for milk, left with a best friend · argued both
//              sides, won both · updated their bio nine times today · started one book, then six more
//              · a fourteen-minute voice note · five outfit changes for one errand · matched with a Libra, talked till
//              sunrise · "I'm bored" (it has been four minutes)
//  37.8        "Two sides. | *Both fun.*"
//  41.0        LESSON UNLOCKED: "Love a Gemini. | Never be *bored* again."  STATUS: ENTERTAINED
//  46.9        "Gemini + Libra: | *still talking.*" over the match card: Gemini + Libra (the sunrise chat, paid off).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const YEL = '#ffd23a', RED = '#e23d4e', BROWN = '#8a4a2e'

const MILK = [
  '..WWWW..',
  '.WWWWWW.',
  'WWWWWWWW',
  'WBBBBBBW',
  'WBWWWWBW',
  'WBWWWWBW',
  'WBBBBBBW',
  'WWWWWWWW',
  'WWWWWWWW',
]
const MILK_C = { W: '#fff4e2', B: SKYB }
const BOOK = ['CCCCCCCCCCCCCC', 'CWWWWWWWWWWWWC', 'CCCCCCCCCCCCCC']
const SHIRT = [
  'SS....SS',
  'SSS..SSS',
  'SSSSSSSS',
  '.SSSSSS.',
  '.SSSSSS.',
  '.SSSSSS.',
]
const SUN = [
  '...Y.Y...',
  'Y..YYY..Y',
  '.YYYYYYY.',
  '.YYYYYYY.',
  'YYYYYYYYY',
]
const SUN_C = { Y: '#ffb34a' }
const PHONE = [
  'KKKKKKKKKK',
  'KSSSSSSSSK',
  'KSSSSSSSSK',
  'KSSSSSSSSK',
  'KSSSSSSSSK',
  'KSSSSSSSSK',
  'KSSSSSSSSK',
  'KSSSSSSSSK',
  'KSSSSSSSSK',
  'KSSSSSSSSK',
  'KSSSSSSSSK',
  'KKKKGGKKKK',
  'KKKKKKKKKK',
]
const PHONE_C = { K: '#2a2350', S: '#140c30', G: '#6b62a8' }

// a dating-profile card whose bio keeps rewriting itself
function bioCard(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  const w = 320, h = 420
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = '#2a2350'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#140c30'; x.fillRect(-w / 2 + 14, -h / 2 + 14, w - 28, 150)
  signChar(x, t, 'gemini', 0, -h / 2 + 96, 120, { mood: 'wink', seed: 71, glyph: false, glow: 0.8 })
  x.fillStyle = YEL; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('♊︎ GEMINI', 0, -h / 2 + 192)
  const BIOS = ['chill. loves hikes.', 'NOT chill. hates hikes', 'ask me tomorrow', 'chef? DJ? both.', 'new bio soon']
  const n = Math.min(BIOS.length - 1, Math.floor(Math.max(0, lt - 0.3) / 0.4))
  x.fillStyle = BONE; x.font = `700 24px ${MONO}`
  x.fillText('BIO:', 0, -h / 2 + 250)
  x.fillText(BIOS[n], 0, -h / 2 + 292)
  x.fillStyle = '#b9b0a0'; x.fillRect(-110, -h / 2 + 330, 220, 10); x.fillRect(-80, -h / 2 + 356, 160, 10)
  x.restore()
}

const CAMEOS = [
  { sign: 'gemini', cap: 'Three new hobbies. | Since *lunch.*', mood: 'sparkle', star: { x: -180 }, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      const H = ['POTTERY', 'DRUMS', 'FRENCH']
      for (let i = 0; i < 3; i++) label(x, 790, 640 + i * 130, `#${i + 1} ${H[i]}`, pop01(t, P.t0 + 0.3 + i * 0.5, 0.3, 2.2), { size: 36, bg: [GOLD, MINT, PINK][i], rot: i % 2 ? 0.05 : -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1080, 'ok, NEW hobby', pop01(t, P.t0 + 1.9, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Went in for milk. | Left with *a best friend.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, MILK, MILK_C, 470, 1110, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.08 })
      const k = pop01(t, P.t0 + 0.5, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'sagittarius', 790, 960, 210 * k, { mood: lt > 1.1 ? 'heart' : 'happy', look: [-1, 0], seed: 13, glyph: false, hops: [P.t0 + 1.3] })
      label(x, 760, 720, 'BFF FOR 2 MINUTES', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      hearts(x, t, 600, 880, P.t0 + 1.4, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 2 })
    } },
  { sign: 'gemini', cap: 'Argued both sides. | Won *both.*', mood: lt => lt > 1.6 ? 'sparkle' : 'squint', look: lt => lt > 1.6 ? [0, 0] : [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: 0, y: 40 },
    front(x, t, lt, P) {
      const side = Math.floor(lt * 2.5) % 2
      if (lt < 1.6) {
        bubble(x, side ? 790 : 290, 620, side ? 'NO, because…' : 'YES, because…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: side ? 'bl' : 'br' })
      } else {
        label(x, 290, 640, 'WINNER', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.08 })
        label(x, 790, 640, 'ALSO WINNER', pop01(t, P.t0 + 1.9, 0.3, 2.4), { size: 40, bg: MINT, rot: 0.08 })
        sparkles(x, t, 540, 760, P.t0 + 1.9, 7, 200, 0.4)
      }
    } },
  { sign: 'gemini', cap: 'Updated their bio. | *Nine times* today.', mood: 'wink', look: [1, 0], star: { x: -190 }, hops: [1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bioCard(x, t, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      const n = Math.min(9, 4 + Math.floor(Math.max(0, lt - 0.3) / 0.4))
      label(x, 790, 1110, `EDIT #${n}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Started one book. | Then *six more.*', mood: lt => lt > 1.5 ? 'sparkle' : 'happy', star: { x: -190 },
    front(x, t, lt, P) {
      const COLS = [RED, SKYB, MINT, PINK, LAV, '#ffb34a', YEL]
      const n = Math.min(7, Math.floor(Math.max(0, lt - 0.2) / 0.2) + 1)
      for (let i = 0; i < n; i++) {
        drawBits(x, BOOK, { C: COLS[i], W: '#fff4e2' }, 790 + Math.sin(i * 2.1) * 18, 1120 - i * 62, 18, { rot: Math.sin(i * 1.7) * 0.06 })
        x.fillStyle = GOLD; x.fillRect(790 + 70 + Math.sin(i * 2.1) * 18, 1120 - i * 62 - 4, 12, 40)
      }
      label(x, 790, 600, 'READING: 7 BOOKS', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Sent a voice note. | *Fourteen minutes.*', mood: lt => lt > 0.4 ? 'happy' : 'sparkle', star: { x: -190 }, hops: [0.6, 1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, PHONE, PHONE_C, 790, 860, 30 * k, { rot: 0.05 })
      if (k > 0.9) {
        x.save(); x.translate(790, 860); x.rotate(0.05)
        const bars = Math.min(16, Math.floor(lt * 9))
        for (let i = 0; i < bars; i++) {
          const h = 16 + 50 * Math.abs(Math.sin(i * 1.7 + t * 6))
          x.fillStyle = YEL; x.fillRect(-110 + (i % 8) * 28, (i < 8 ? -70 : 70) - h / 2, 16, h)
        }
        x.restore()
      }
      label(x, 790, 1110, '▶ 14:02', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 740, 590, '…and ANOTHER thing', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Five outfit changes. | For *one errand.*', mood: lt => lt > 1.7 ? 'wink' : 'sparkle', star: { x: -190 },
    front(x, t, lt, P) {
      const COLS = [PINK, SKYB, MINT, LAV, YEL]
      for (let i = 0; i < 5; i++) {
        const k = pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2.2)
        drawBits(x, SHIRT, { S: COLS[i] }, 670 + (i % 3) * 105, 700 + Math.floor(i / 3) * 170, 16 * k, { rot: (i % 2 ? 0.1 : -0.1) })
      }
      label(x, 790, 1080, 'ERRAND: STAMPS', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Matched with a Libra. | Talked *till sunrise.*', mood: lt => lt > 1.4 ? 'sleepy' : 'sparkle', star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      const r = ease.outCubic(prog(lt, 0.6, 2.0))
      x.save(); x.beginPath(); x.rect(110, 480, 860, 740); x.clip()
      drawBits(x, SUN, SUN_C, 540, lerp(1240, 1150, r), 26, { alpha: r })
      x.restore()
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 790, 900, 210 * k, { mood: lt > 1.4 ? 'sleepy' : 'heart', look: [-1, 0], seed: 15, glyph: false })
      label(x, 540, 620, '✦ NEW MATCH · LIBRA', pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
      label(x, 790, 1150, '6:12 A.M.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: '#ffb34a', rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: '“I’m bored.” | It’s been *four minutes.*', mood: lt => lt > 0.8 ? 'squint' : 'happy', star: { x: -190 }, hops: [1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 820); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 132, 0, Math.PI * 2); x.fill()
        x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 120, 0, Math.PI * 2); x.fill()
        x.fillStyle = YEL; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 112, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * (4 / 60) * clamp(lt / 1.2)); x.closePath(); x.fill()
        x.strokeStyle = INK; x.lineWidth = 8; x.beginPath(); x.moveTo(0, 0); x.lineTo(0, -90); x.stroke()
        x.restore()
      }
      label(x, 790, 1050, '4:00 OF FUN', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 400, 590, 'what now?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 42, col: LAV, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'v3t111', key: 'C', accent: YEL, solo: 'gemini', ending: 'card',
  title: 'Things only | *Geminis* get.',
  cameos: CAMEOS,
  card: { a: 'gemini', b: 'libra', chip: "IT'S A MATCH" },
  group: { cap: 'Two sides. | *Both fun.*', mood: 'sparkle' },
  lesson: { text: 'Love a Gemini. | Never be *bored* again.', chip: 'STATUS: ENTERTAINED' },
  last: {
    text: 'Gemini + Libra: | *still talking.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
