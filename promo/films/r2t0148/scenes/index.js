// r2t0148: THE SIGNS AS… v3, SOLO film, "Leos running late | be like." (~43 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole way through: nine late arrivals, each the most extreme (and lovable) Leo version.
//   0.0–3.6    "Leos running late | *be like.*"
//   3.6–37.8   nine cards (3.8 s each):
//              ten minutes late, arrived in a cape · texted "on my way", still in the shower · late to brunch, made an
//              entrance anyway · blamed traffic, they walked · forty minutes late, brought gifts for everyone · late to their
//              own party, on purpose · missed the train, waved like a celebrity · late to the first date, the match said
//              "worth the wait" · group photo started, ran in, centre spot
//  37.8        group ending: "Never on time. | *Always a moment.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, clock, confetti, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN } from './props.js'

const S = 'leo'
const ST = { x: -180 }

const GIFT = ['..R...R..', '...RRR...', 'GGGGRGGGG', 'GGGGRGGGG', 'RRRRRRRRR', 'GGGGRGGGG', 'GGGGRGGGG', 'GGGGRGGGG']
const TRAIN = ['..KKKKKKKKKKKKKK', '.KBBBBBBBBBBBBBK', 'KBWWBWWBWWBWWBBK', 'KBWWBWWBWWBWWBBK', 'KBBBBBBBBBBBBBBK', 'KRRRRRRRRRRRRRRK', 'KKKKKKKKKKKKKKKK', '..KK....KK...KK.']
const TRAIN_C = { K: INK, B: '#3f6fd0', W: '#cfeeff', R: RED }
const SHOE = ['.....KK', '....KWK', 'KKKKWWK', 'KWWWWWK', 'KKKKKKK']

/** a cape flowing behind the star (drawn in back) */
function cape(x, t, F, k) {
  if (k <= 0.01) return
  x.save(); x.translate(F.x, F.cy - 50); x.scale(1.45 * k, 1.45 * k)
  const w = Math.sin(t * 5) * 18
  x.fillStyle = INK; x.beginPath(); x.moveTo(-70, -60); x.lineTo(70, -60); x.lineTo(150 + w, 170); x.lineTo(-150 + w, 170); x.closePath(); x.fill()
  x.fillStyle = RED; x.beginPath(); x.moveTo(-60, -50); x.lineTo(60, -50); x.lineTo(138 + w, 160); x.lineTo(-138 + w, 160); x.closePath(); x.fill()
  x.fillStyle = '#b02a3a'; x.fillRect(-10 + w * 0.5, -40, 20, 190)
  x.restore()
}
/** a doorway swinging open */
function door(x, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -220, 240, 440); x.fillStyle = '#fff1b0'; x.fillRect(-108, -208, 216, 428)
  x.fillStyle = INK; x.fillRect(-108, -208, 216 * (1 - open) + 8, 428); x.fillStyle = WOOD; x.fillRect(-104, -204, 216 * (1 - open), 420)
  if (open < 0.8) { x.fillStyle = GOLD; x.fillRect(-104 + 216 * (1 - open) - 34, 0, 16, 16) }
  x.restore()
}
/** a polaroid-style group photo: three friends, `gap` opens in the middle for the latecomer */
function photo(x, t, cx, cy, k, lt) {
  card(x, cx, cy, 420, 360, k, { bg: CREAM, rot: 0.03 }, () => {
    x.fillStyle = '#2a2350'; x.fillRect(-190, -160, 380, 270)
    ;[['capricorn', -130], ['virgo', 0], ['gemini', 130]].forEach(([id, px], i) => {
      const shift = i === 1 ? 0 : (i === 0 ? -1 : 1) * 22 * ease.outCubic(prog(lt, 1.0, 1.3))
      signChar(x, t, id, px + shift + (i === 1 ? -200 * ease.inCubic(prog(lt, 1.0, 1.3)) : 0), -10, 110, { mood: lt > 1.3 ? 'wide' : 'happy', seed: 30 + i, glyph: false, glow: 0.4, alpha: i === 1 ? 1 - prog(lt, 1.0, 1.3) : 1 })
    })
    if (lt > 1.2) signChar(x, t, S, 0, -20, 140 * ease.outBack(prog(lt, 1.2, 1.5)), { mood: 'sparkle', seed: 33, glyph: false, glow: 0.5 })
    txt(x, 'SQUAD!', 0, 140, { size: 34, font: MONO, weight: 700 })
  })
}

const CAMEOS = [
  { sign: S, cap: 'Ten minutes late. | Arrived *in a cape.*', mood: 'sparkle', star: { x: -150 }, hops: [0.4, 1.2],
    back(x, t, lt, P, F) { cape(x, t, F, ease.outBack(prog(lt, 0.3, 0.7))) },
    front(x, t, lt, P) {
      clock(x, 790, 760, 100, pop01(t, P.t0 + 0.2, 0.35, 2), 7, 10)
      label(x, 790, 960, 'WORTH IT', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 44, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Texted “on my way.” | Still *in the shower.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', star: ST,
    back(x, t, lt, P, F) {
      if (lt < 0.8) return
      x.fillStyle = SKYB
      for (let i = 0; i < 14; i++) { const ph = (t * 1.6 + i * 0.137) % 1; x.globalAlpha = 0.8 * (1 - ph); x.fillRect(F.x - 150 + (i * 47) % 300, 520 + ph * 560, 8, 22) }
      x.globalAlpha = 1
    },
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'BRUNCH CREW', headCol: ORANGE, lines: [['where r u?', BONE, pop01(t, P.t0 + 0.4, 0.25, 2)], ['on my way!!', GOLD, pop01(t, P.t0 + 0.8, 0.25, 2.4)], ['…', BONE, pop01(t, P.t0 + 1.6, 0.25, 2)]] })
      label(x, 800, 1130, 'LOCATION: SHOWER', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'An hour late to brunch. | *Grand entrance anyway.*', mood: 'sparkle', star: { x: -40, s: 260 }, hops: [1.0],
    back(x, t, lt, P) { door(x, 500, 880, pop01(t, P.t0 + 0.1, 0.3, 2), ease.outCubic(prog(lt, 0.4, 0.9))) },
    front(x, t, lt, P) {
      label(x, 800, 650, 'TA-DA!', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 56, bg: GOLD, rot: 0.06 })
      confetti(x, t, 540, 860, P.t0 + 1.0, { n: 20, spread: 320, h: 600 })
      bubble(x, 800, 1100, 'did you miss me?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Blamed traffic. | *They walked.*', mood: lt => lt > 1.4 ? 'wink' : 'happy', star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 640, 'ugh, traffic!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      const k = pop01(t, P.t0 + 0.8, 0.3, 2)
      drawBits(x, SHOE, { K: INK, W: '#fff4e2' }, 740, 880, 16 * k); drawBits(x, SHOE, { K: INK, W: '#fff4e2' }, 850, 900, 16 * k)
      label(x, 790, 1060, 'DISTANCE: 1 BLOCK', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Forty minutes late. | Brought *gifts for everyone.*', mood: lt => lt > 1.0 ? 'heart' : 'sparkle', star: ST, hops: [1.0],
    front(x, t, lt, P) {
      const COL = [[PINK, GOLD], [MINT, RED], [SKYB, PINK], [LAV, MINT], [GOLD, RED]]
      for (let i = 0; i < 5; i++) { const k = pop01(t, P.t0 + 0.3 + i * 0.18, 0.3, 2); drawBits(x, GIFT, { G: COL[i][0], R: COL[i][1] }, 680 + (i % 3) * 110, 1030 - Math.floor(i / 3) * 130 - (i % 3 === 1 ? 20 : 0), 13 * k) }
      label(x, 790, 680, 'SORRY! (NOT SORRY)', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Late to their own party. | *On purpose.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', star: ST,
    front(x, t, lt, P) {
      card(x, 790, 820, 320, 230, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: PINK, rot: -0.04 }, () => {
        txt(x, 'LEO’S PARTY', 0, -60, { size: 34 })
        txt(x, 'starts: 8:00', 0, 0, { size: 28, font: MONO, weight: 700 })
        txt(x, 'Leo: 9:30', 0, 50, { size: 28, font: MONO, weight: 700, color: lt > 1.0 ? RED : INK })
      })
      label(x, 790, 1060, 'FASHIONABLY.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.05 })
    } },
  { sign: S, cap: 'Missed the train. | Waved *like a celebrity.*', mood: 'sparkle', star: { x: -180, y: 30 }, hops: [0.9, 1.5],
    front(x, t, lt, P) {
      const p = ease.inQuad(prog(lt, 0.3, 2.0))
      drawBits(x, TRAIN, TRAIN_C, lerp(680, 820, p), 760, 15, { alpha: 1 - ease.inQuad(prog(lt, 2.0, 2.4)) })
      bubble(x, 520, 600, 'bye, fans!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 1080, 'NEXT TRAIN: 20 MIN', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 390, 880, P.t0 + 1.2, 6, 160, 0.4)
    } },
  { sign: S, cap: 'Late to a first date. | Match said *“worth it.”*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ YOUR MATCH', headCol: PINK, lines: [['so sorry!!', GOLD, pop01(t, P.t0 + 0.4, 0.25, 2)], ['worth the wait', MINT, pop01(t, P.t0 + 1.1, 0.25, 2.4)]] })
      if (lt > 1.2) hearts(x, t, 560, 980, P.t0 + 1.2 * 1.29, { n: 5, life: 1.7, spread: 120, cell: 7, seed: 6 })
    } },
  { sign: S, cap: 'Group photo started. | Ran in. *Centre spot.*', mood: 'sparkle', star: ST, hops: [0.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      photo(x, t, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1110, 'JUST IN TIME', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0148', key: 'G', accent: ORANGE, solo: S, ending: 'group',
  title: 'Leos running late | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Never on time. | *Always a moment.*', mood: 'sparkle' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
