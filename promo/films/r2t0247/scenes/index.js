// r2t0247: star_talk, ROLLCALL, "The signs on | face mask night." (~54 s vertical, signs3kit social cut, music: lofi · E)
//   0.0–3.6    "The signs on | *face mask night.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one face mask each (3.8 s per sign), each pushed to the extreme:
//              ♈ peeled it off after ten seconds · ♉ ate the cucumber slices · ♊ two masks, one per face
//              · ♋ did everyone's mask, even the dog's · ♌ gold mask, obviously · ♍ applied it with a ruler
//              · ♎ set the mood, forgot the mask · ♏ black mask, never took it off · ♐ mask on, went hiking anyway
//              · ♑ answered emails mid-mask · ♒ made their own from moon dust · ♓ felt so nice they cried it off
//  49.2        group ending: "Twelve masks. | *Zero relaxed.*"  Cucumber slices rain down on the group photo.
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, inSprite, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'
import { card, txt, laptop, CREAM, RED, ORANGE, BROWN, GREY, DEEP, SUN, GREEN, clamp, ease, lerp, prog } from './props.js'

const ACC = MINT
const ST = { x: -170 }
const lab = (x, cx, cy, s, k, o = {}) => label(x, cx, cy, s, k, { size: 32, font: MONO, weight: 700, ...o })
const MASK = '#9fe0a8'

/** a face mask painted on the star (sprite cells), with optional cucumber eyes */
function mask(x, F, k, { col = MASK, a = 0.82, cukes = false, split = null } = {}) {
  if (k <= 0.01) return
  inSprite(x, F, () => {
    x.save(); x.globalAlpha *= a * clamp(k)
    x.beginPath(); x.ellipse(18, 19.5, 9.5 * k, 6.5 * k, 0, 0, Math.PI * 2); x.clip()
    x.fillStyle = col; x.fillRect(8, 12, 20, 15)
    if (split) { x.fillStyle = split; x.fillRect(18, 12, 10, 15) }
    x.restore()
    if (cukes) for (const ex of [13.5, 22.5]) {
      x.fillStyle = INK; x.beginPath(); x.arc(ex, 18, 3.4, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#5fd068'; x.beginPath(); x.arc(ex, 18, 3.0, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#d8f5c0'; x.beginPath(); x.arc(ex, 18, 2.2, 0, Math.PI * 2); x.fill()
    }
  })
}
const CUKE = ['..KKKK..', '.KGGGGK.', 'KGLLLLGK', 'KGLWWLGK', 'KGLWWLGK', 'KGLLLLGK', '.KGGGGK.', '..KKKK..']
const CUKE_C = { K: INK, G: '#3fae4e', L: '#bfeeaa', W: '#e8fbd8' }
const JAR = ['.KKKKKK.', 'KLLLLLLK', 'KKKKKKKK', 'KWWWWWWK', 'KWSWWSWK', 'KWWSWWWK', 'KWSWWWSK', 'KWWWWWWK', '.KKKKKK.']
const RULER = ['YYYYYYYYYYYYYYYYYY', 'YKYKYKYKYKYKYKYKYY', 'YKYYYKYYYKYYYKYYYY', 'YYYYYYYYYYYYYYYYYY']
const DOG = ['KK......KK', 'KBK....KBK', 'KBBBBBBBBK', '.BBWBBWBB.', '.BBBBBBBB.', '..BBKKBB..', '...BBBB...', '..BBBBBB..', '.BBBBBBBB.', '.BB.BB.BB.']
const DOG_C = { K: BROWN, B: '#e8a24a', W: INK }
const CANDLE = ['..Y..', '.YOY.', '..Y..', '.WWW.', '.WWW.', '.WWW.', '.WWW.', 'KKKKK']
const CANDLE_C = { Y: SUN, O: ORANGE, W: CREAM, K: BROWN }
const MTN = ['.....WWW.....', '....WWWWW....', '...GWWWWWG...', '..GGGGGGGGG..', '.GGGGGGGGGGG.', 'GGGGGGGGGGGGG']
const MTN_C = { W: '#ffffff', G: '#6b62a8' }

const CAMEOS = [
  { sign: 'aries', cap: 'Peeled it off | after *ten seconds.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      mask(x, F, P.k * (1 - ease.inCubic(prog(lt, 0.9, 1.2))))
      const s = Math.min(10, Math.floor(lt * 9))
      card(x, 790, 780, 300, 150, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#1b1236', rot: 0.03 }, () => {
        txt(x, `0:${String(s).padStart(2, '0')}`, 0, -18, { size: 60, font: MONO, weight: 700, color: lt > 1.2 ? RED : BONE })
        txt(x, 'of 20:00', 0, 40, { size: 26, font: MONO, weight: 700, color: GREY })
      })
      lab(x, 790, 1060, 'PATIENCE: GONE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { bg: RED, color: BONE, rot: -0.05 })
    } },
  { sign: 'taurus', cap: 'Ate the | *cucumber slices.*', mood: lt => lt > 1.2 ? 'heart' : 'sleepy', star: ST,
    front(x, t, lt, P, F) {
      mask(x, F, P.k, { cukes: lt < 1.0 })
      for (let i = 0; i < 3; i++) drawBits(x, CUKE, CUKE_C, 720 + i * 90, 1000, 11 * pop01(t, P.t0 + 0.3, 0.3, 2) * (1 - prog(lt, 1.0 + i * 0.25, 1.15 + i * 0.25)))
      bubble(x, 790, 700, 'crunchy | skincare.', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 38, tail: 'bl' })
      lab(x, 790, 1120, 'SNACK: SPA', pop01(t, P.t0 + 1.3, 0.3, 2.2), { bg: MINT, rot: 0.05 })
    } },
  { sign: 'gemini', cap: 'Two masks. | *One per personality.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', star: ST,
    front(x, t, lt, P, F) {
      mask(x, F, P.k * pop01(t, P.t0 + 0.4, 0.3, 2), { col: MASK, split: PINK })
      lab(x, 720, 760, 'CALM', pop01(t, P.t0 + 0.8, 0.3, 2.2), { bg: MASK, rot: -0.06 })
      lab(x, 860, 900, 'CHAOS', pop01(t, P.t0 + 1.1, 0.3, 2.2), { bg: PINK, rot: 0.06 })
      bubble(x, 790, 1080, 'we agree to | disagree.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Did everyone’s mask. | *Even the dog’s.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      mask(x, F, P.k)
      const k = pop01(t, P.t0 + 0.4, 0.35, 2), dx = 800, dy = 930 + Math.abs(Math.sin(t * 5)) * -8
      drawBits(x, DOG, DOG_C, dx, dy, 22 * k)
      if (k > 0.5 && lt > 1.0) { x.save(); x.globalAlpha = 0.8; x.fillStyle = MASK; x.fillRect(dx - 66, dy - 60, 132, 70); x.restore(); for (const ex of [-32, 32]) drawBits(x, CUKE, CUKE_C, dx + ex, dy - 30, 5) }
      lab(x, 800, 1110, 'CLIENT: GOOD BOY', pop01(t, P.t0 + 1.4, 0.3, 2.2), { bg: PINK, rot: -0.04 })
      hearts(x, t, 800, 820, P.t0 + 1.5, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'A gold mask. | *Obviously.*', mood: 'sparkle', star: { x: -150 }, hops: [1.0],
    front(x, t, lt, P, F) {
      mask(x, F, P.k * pop01(t, P.t0 + 0.3, 0.3, 2), { col: SUN, a: 0.9 })
      sparkles(x, t, F.x, F.cy, P.t0 + 0.6, 8, 190, 0.2)
      sparkles(x, t, F.x, F.cy, P.t0 + 1.6, 6, 160, 0.9, [GOLD, '#fff1b0'])
      lab(x, 790, 760, '24 KARAT GLOW', pop01(t, P.t0 + 0.9, 0.3, 2.2), { bg: GOLD, rot: 0.05, size: 34 })
      bubble(x, 790, 1000, 'I am | the treasure.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Applied it | with a *ruler.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      mask(x, F, P.k * ease.outCubic(prog(lt, 0.3, 1.3)), { col: MASK })
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, RULER, { Y: SUN, K: INK }, 790, 800 + Math.sin(t * 3) * 10, 14 * k, { rot: -0.12 })
      lab(x, 790, 1040, 'EDGES: PERFECT', pop01(t, P.t0 + 1.4, 0.3, 2.2), { bg: MINT, rot: -0.04 })
    } },
  { sign: 'libra', cap: 'Set the mood. | Forgot *the mask.*', mood: lt => lt > 1.8 ? 'wide' : 'heart', star: ST,
    back(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, CANDLE, CANDLE_C, 700 + i * 90, 1060 - (i % 2) * 30, 12 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2))
      for (let i = 0; i < 9; i++) { x.fillStyle = [GOLD, PINK, SKYB][i % 3]; x.globalAlpha = 0.6 + 0.4 * Math.sin(t * 4 + i); x.fillRect(600 + i * 40, 620 + Math.sin(i * 0.8) * 18, 14, 14) }
      x.globalAlpha = 1
    },
    front(x, t, lt, P) {
      lab(x, 790, 760, 'AMBIENCE: 10/10', pop01(t, P.t0 + 0.7, 0.3, 2.2), { bg: PINK, rot: 0.04 })
      bubble(x, 790, 900, 'wait… | the mask?', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Black mask. | *Never took it off.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      mask(x, F, P.k, { col: '#1b1236', a: 0.85 })
      card(x, 790, 820, 260, 220, pop01(t, P.t0 + 0.3, 0.3, 2), { bg: CREAM, rot: 0.04 }, () => {
        x.fillStyle = RED; x.fillRect(-130, -110, 260, 60); txt(x, 'MASK DAY', 0, -80, { size: 28, font: MONO, weight: 700, color: BONE })
        txt(x, String(Math.min(3, 1 + Math.floor(lt * 1.4))), 0, 25, { size: 100, font: MONO, weight: 700 })
      })
      bubble(x, 790, 1080, 'it’s a | lifestyle.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Mask on. | Went *hiking* anyway.', mood: 'sparkle', look: [-1, 0], star: { x: 160 }, hops: [0.6, 1.2, 1.8],
    back(x, t, lt, P) { drawBits(x, MTN, MTN_C, 320, 950, 30 * pop01(t, P.t0 + 0.15, 0.35, 2)) },
    front(x, t, lt, P, F) {
      mask(x, F, P.k)
      lab(x, 320, 700, 'TRAIL: STEEP', pop01(t, P.t0 + 0.8, 0.3, 2.2), { bg: SUN, rot: -0.05 })
      bubble(x, 330, 1110, 'pores AND views!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Answered emails | *mid-mask.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      mask(x, F, P.k, { cukes: true })
      const n = Math.max(0, 9 - Math.floor(lt * 4))
      laptop(x, 790, 960, pop01(t, P.t0 + 0.2, 0.35, 2), () => {
        txt(x, 'INBOX', 0, -46, { size: 28, font: MONO, weight: 700, color: BONE })
        txt(x, String(n), 0, 20, { size: 70, font: MONO, weight: 700, color: n ? SUN : MINT })
      })
      lab(x, 790, 680, 'RELAXING: ALSO WORK', pop01(t, P.t0 + 1.4, 0.3, 2.2), { bg: GREY, rot: 0.04, size: 30 })
    } },
  { sign: 'aquarius', cap: 'Made their own. | From *moon dust.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, -1], star: ST,
    front(x, t, lt, P, F) {
      mask(x, F, P.k * ease.outCubic(prog(lt, 1.0, 1.5)), { col: '#d8dcf0', a: 0.9 })
      drawBits(x, JAR, { K: INK, L: LAV, W: '#2a2350', S: '#ffffff' }, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      lab(x, 790, 1090, 'MOON DUST', pop01(t, P.t0 + 0.6, 0.3, 2.2), { bg: LAV, rot: -0.04 })
      sparkles(x, t, 790, 860, P.t0 + 0.9, 6, 150, 0.3, [BONE, SKYB, LAV])
      bubble(x, 790, 650, 'it glows?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Felt so nice | they *cried it off.*', mood: lt => lt < 0.9 ? 'sleepy' : 'wide', tears: lt => lt < 0.9 ? 1 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      mask(x, F, P.k * (1 - ease.inCubic(prog(lt, 1.0, 1.9))), { a: 0.75 })
      bubble(x, 790, 720, 'it’s just | so soothing', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bl' })
      lab(x, 790, 1000, 'MASK: WASHED OFF', pop01(t, P.t0 + 1.8, 0.3, 2.4), { bg: SKYB, rot: 0.04 })
    } },
]

const F = makeFilm({
  id: 'r2t0247', key: 'E', accent: ACC, ending: 'group',
  title: 'The signs on | *face mask night.*',
  cameos: CAMEOS,
  group: {
    cap: 'Twelve masks. | *Zero relaxed.*',
    draw(x, t, lt) {
      for (let i = 0; i < 14; i++) {
        const ph = ((lt * 0.35 + i * 0.173) % 1)
        if (lt < 0.8 + i * 0.08) continue
        drawBits(x, CUKE, CUKE_C, 120 + ((i * 263) % 840), 700 + ph * 900, 9, { rot: t * 2 + i, alpha: Math.sin(Math.PI * ph) })
      }
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
