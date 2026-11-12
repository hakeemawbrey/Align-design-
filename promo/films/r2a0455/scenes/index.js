// r2a0455: star_advice, ADVICE ROLLCALL, "A tiny habit | for each sign." (~54 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order: one small, warm, doable habit per sign, each with a light gag. Ending: the group beat.
//   ♈ count to three before charging in · ♉ one new food a week (broccoli?) · ♊ one tab at a time · ♋ text yourself something kind
//   · ♌ a compliment before lunch · ♍ leave one dish, the world keeps spinning · ♎ pick dinner in ten seconds
//   · ♏ say one feeling out loud · ♐ finish one thing before the next adventure · ♑ a five-minute break (out of office)
//   · ♒ call one friend, not just the group chat · ♓ feet in the grass, a tiny reset
//  group (the ending): "Tiny steps. | *Big glow.*"  HABITS: STARTED
import { clamp, prog } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { phone, note, bits, ORANGE, RED, WOOD, PAPER, SLATE, GREEN } from '../props.js'

const L = { x: -190 }, LEAF = '#8be08f'
const BROC = ['.GG.GG.', 'GGGGGGG', 'GgGGGgG', '.GGGGG.', '...S...', '..SSS..', '..SSS..']
const BOX = ['KKKKKKKKK', 'K.......K', 'K.....M.K', 'K....M..K', 'K.M.M...K', 'K..M....K', 'KKKKKKKKK']

function tabs(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const n = Math.max(1, 6 - Math.floor(prog(lt, 0.5, 1.6) * 5.99))
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, -120, 360, 250); x.fillStyle = '#241a52'; x.fillRect(-172, -112, 344, 234)
  for (let i = 0; i < n; i++) { x.fillStyle = i === 0 ? LAV : SLATE; x.fillRect(-168 + i * 56, -108, 52, 34) }
  x.fillStyle = BONE; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`TABS: ${n}`, 0, 10)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Count to three | *before you charge in.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: L, hops: [1.5],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.1) * 2.99)
      label(x, 800, 880, `${n}…`, pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 90, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      label(x, 800, 1090, 'OK. NOW GO.', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Try one new food | *a week.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, BROC, { G: GREEN, g: '#3f9a4f', S: '#9be3b0' }, 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 680, '…not bad?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'One tab at a time. | *Your brain says thanks.*', mood: lt => lt > 1.5 ? 'sleepy' : 'wide', look: [1, 0], star: L,
    front(x, t, lt, P) { tabs(x, t, 780, 880, 0.85 * pop01(t, P.t0 + 0.2, 0.3, 2), lt) } },
  { sign: 'cancer', cap: 'Text yourself | *something kind.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: L, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { top: '8:02', head: 'FROM: ME', msg: 'you’re doing | great ♡', bg: SKYB, size: 30 })
      hearts(x, t, 560, 820, P.t0 + 1.3, { n: 4, life: 1.6, spread: 140, cell: 6, seed: 5 })
    } },
  { sign: 'leo', cap: 'Give one compliment | *before lunch.*', mood: 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 820, 990, 170 * k, { mood: lt > 1.2 ? 'heart' : 'neutral', look: [-1, 0], seed: 37, glyph: false })
      bubble(x, 800, 700, 'love your | shoes!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Leave one dish. | *The world keeps spinning.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bits(x, 'mug', 800, 920, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 1100, 'STILL SPINNING ✓', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Pick dinner | *in ten seconds.*', mood: lt => lt > 1.6 ? 'heart' : 'squint', look: [1, 0], star: L, hops: [1.7],
    front(x, t, lt, P) {
      const n = Math.max(0, 10 - Math.floor(prog(lt, 0.3, 1.6) * 10))
      label(x, 800, 760, n ? `${n}…` : 'SOUP!', pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 84, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      bits(x, 'bowl', 800, 1000, 16 * pop01(t, P.t0 + 1.5, 0.3, 2))
    } },
  { sign: 'scorpio', cap: 'Say one feeling | *out loud.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 760, 'I… liked that.', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 800, 1060, 'FEELING: SHARED', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: '#c2375a', color: PAPER, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Finish one thing | *before the next adventure.*', mood: 'sparkle', look: [1, 0], star: L, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, BOX, { K: INK, M: lt > 1.0 ? MINT : 'rgba(0,0,0,0)' }, 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { outline: BONE })
      label(x, 800, 1100, 'DONE. NOW GO.', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 880, P.t0 + 1.1, 7, 150, 0.4)
    } },
  { sign: 'capricorn', cap: 'A five-minute break. | *The empire can wait.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), 'back in | 5 min', { head: 'OUT OF OFFICE', headBg: '#5fd0c0', size: 38, w: 330, rot: -0.03 })
      sparkles(x, t, 800, 880, P.t0 + 1.3, 6, 160, 0.2)
    } },
  { sign: 'aquarius', cap: 'Call one friend. | *Not just the group chat.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: L, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { top: lt > 1.2 ? '0:42' : 'calling…', head: 'FAVOURITE', msg: lt > 1.2 ? 'HIII!' : '♡', bg: MINT, size: 40 })
      hearts(x, t, 560, 820, P.t0 + 1.3, { n: 4, life: 1.6, spread: 140, cell: 6, seed: 7 })
    } },
  { sign: 'pisces', cap: 'Feet in the grass. | *A tiny reset.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', tears: 1, look: [0, 0], star: { x: -150, y: -40 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      x.save(); x.globalAlpha = k; x.fillStyle = '#2f7a3f'; x.fillRect(180, 1040, 720, 110); x.fillStyle = LEAF
      for (let i = 0; i < 36; i++) { const gx = 186 + i * 20, sw = 4 * Math.sin(t * 2 + i); x.beginPath(); x.moveTo(gx, 1046); x.lineTo(gx + 8 + sw, 1000 - (i % 3) * 10); x.lineTo(gx + 14, 1046); x.fill() }
      x.restore()
    },
    front(x, t, lt, P) {
      bits(x, 'flower', 800, 960, 14 * pop01(t, P.t0 + 0.7, 0.3, 2))
      label(x, 800, 700, 'RESET: 1 MIN', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: LEAF, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0455', key: 'G', accent: LEAF, ending: 'group',
  title: 'A tiny habit | *for each sign.*',
  cameos: CAMEOS,
  group: {
    cap: 'Tiny steps. | *Big glow.*',
    draw(x, t, lt) { label(x, 540, 720, 'HABITS: STARTED ✦', pop01(t, t - lt + 1.6, 0.3, 2.4), { size: 44, bg: LEAF, rot: -0.04, font: MONO, weight: 700 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
