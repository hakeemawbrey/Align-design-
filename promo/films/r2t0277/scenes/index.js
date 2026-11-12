// r2t0277: star_talk, SOLO (libra), "Libra red flags | we love." (~48 s vertical, signs3kit social cut, music: lofi · E)
// One Libra the whole way through: nine lovable red flags, each pushed to the most extreme Libra version.
//   0.0–3.6    "Libra red flags | *we love.*"
//   3.6–37.8   nine cards: an hour to pick a font · says "I don't mind," minds a lot · moved your furniture for
//              balance · matched with everyone, can't pick one · flirts by accident, with everyone · avoids the fight,
//              sends a cute sticker · three-hour outfit for a grocery run · ordered last, after polling the table
//              · "you're my favourite," to all of us
//  37.8        "Indecisive. | *Irresistible.*"
//  41.0        LESSON UNLOCKED: "Their charm is real. | They *mean it.*"  STATUS: SMITTEN
//  46.9        "Their perfect match? | *Still deciding.*" over the match card: Libra + Gemini, chip MATCH: PENDING
//              (the can't-pick-one card, paid off).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, SERIF } from '../../signs3kit.js'
import { card, txt, phone, bar, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const S = 'libra', ACC = '#ff9de6'
const ST = { x: -170 }

const SOFA = ['..KKKKKKKKKKKK..', '.KPPPPPPPPPPPPK.', 'KKPPPPPPPPPPPPKK', 'KPKKKKKKKKKKKKPK', 'KPPPPPPPPPPPPPPK', 'KKKKKKKKKKKKKKKK', '.K............K.']
const SOFA_C = { K: INK, P: '#c97bff' }
const PLANT = ['..GG.GG..', '.GGGGGGG.', '..GGGGG..', '...GGG...', '..OOOOO..', '..OOOOO..', '...OOO...']
const PLANT_C = { G: GREEN, O: ORANGE }
const BASKET = ['.K......K.', '..K....K..', 'KKKKKKKKKK', 'KRRRRRRRRK', 'KRKRKRKRRK', '.KRRRRRRK.', '..KKKKKK..']
const BASKET_C = { K: INK, R: RED }
const STICKER = ['..YYYYYY..', '.YYYYYYYY.', 'YYKYYYYKYY', 'YYKYYYYKYY', 'YPYYYYYYPY', 'YYYKYYKYYY', '.YYYKKYYY.', '..YYYYYY..']
const STICKER_C = { Y: SUN, K: INK, P: PINK }

/** a scale (balance) icon, tipped by `tilt` */
function scale(x, cx, cy, k, tilt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-10, -70, 20, 140); x.fillRect(-60, 66, 120, 16)
  x.save(); x.translate(0, -70); x.rotate(tilt)
  x.fillStyle = INK; x.fillRect(-120, -8, 240, 16)
  for (const d of [-1, 1]) { x.fillStyle = INK; x.fillRect(d * 110 - 4, 0, 8, 50); x.fillStyle = GOLD; x.beginPath(); x.ellipse(d * 110, 56, 50, 14, 0, 0, Math.PI * 2); x.fill() }
  x.restore(); x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'An hour | to pick *a font.*', mood: lt => lt > 1.8 ? 'squint' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const FONTS = [`800 110px ${INTER}`, `italic 500 120px ${SERIF}`, `700 100px ${MONO}`, `400 110px ${INTER}`]
      const n = Math.floor(lt * 3) % FONTS.length
      card(x, 790, 820, 300, 240, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.03 }, () => {
        x.font = FONTS[n]; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('Aa', 0, 6)
      })
      const m = Math.floor(clamp((lt - 0.3) / 1.8) * 59)
      label(x, 790, 1050, `TIME: 0:${String(m).padStart(2, '0')}:00`, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Says “I don’t mind.” | *Minds a lot.*', mood: lt => lt > 1.2 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'i don’t mind :)', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, col: BONE, tail: 'bl' })
      label(x, 790, 920, 'INSIDE:', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 28, bg: GREY, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1040, 'I MIND.', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 64, bg: RED, color: CREAM, rot: 0.04 })
    } },
  { sign: S, cap: 'Moved your furniture. | *For balance.*', mood: lt => lt > 1.5 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), g = ease.inOutCubic(prog(lt, 0.6, 1.4))
      drawBits(x, SOFA, SOFA_C, 790, 1060, 14 * k)
      drawBits(x, PLANT, PLANT_C, lerp(660, 650, g), lerp(1050, 1040, g), 11 * k)
      drawBits(x, PLANT, PLANT_C, lerp(700, 930, g), lerp(1060, 1040, g), 11 * k * (g > 0 ? 1 : 0))
      scale(x, 790, 760, pop01(t, P.t0 + 0.4, 0.35, 2), lerp(-0.3, 0, g))
      label(x, 790, 600, 'BALANCED ✓', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Matched with everyone. | *Can’t pick one.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'heart' : 'sparkle', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const IDS = ['aries', 'gemini', 'leo', 'scorpio', 'pisces', 'taurus']
      const n = Math.min(6, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.22))
      for (let i = 0; i < n; i++) {
        const cx = 690 + (i % 3) * 100, cy = 780 + Math.floor(i / 3) * 140
        signChar(x, t, IDS[i], cx, cy, 110 * pop01(t, P.t0 + 0.3 + i * 0.22, 0.3, 2), { mood: 'heart', seed: 30 + i, glyph: false, tears: IDS[i] === 'pisces' ? 1 : 0 })
      }
      label(x, 790, 620, '✦ IT’S A MATCH ×6', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1100, 'CHOSEN: ???', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Flirts by accident. | *With everyone.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'love your vibe!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
      const f = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (f > 0.01) signChar(x, t, 'virgo', 840, 940, 170 * f, { mood: lt > 1.1 ? 'heart' : 'wide', look: [-1, 0], seed: 24, glyph: false })
      label(x, 790, 1130, 'THE MAIL CARRIER', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 840, 860, P.t0 + 1.2, { n: 4, life: 1.5, spread: 120, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Avoids the fight. | Sends *a cute sticker.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'we need to talk', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, col: LAV, tail: 'br' })
      drawBits(x, STICKER, STICKER_C, 790, 880, 22 * pop01(t, P.t0 + 0.9, 0.35, 2.4), { rot: 0.1 * Math.sin(t * 4) })
      label(x, 790, 1100, 'FIGHT: CANCELLED', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Three-hour outfit. | For *a grocery run.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8],
    back(x, t, lt, P) { sparkles(x, t, 370, 880, P.t0 + 0.4, 8, 200, 0.3) },
    front(x, t, lt, P) {
      label(x, 790, 650, 'GETTING READY: 3 HRS', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 28, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      drawBits(x, BASKET, BASKET_C, 790, 880, 26 * pop01(t, P.t0 + 0.6, 0.35, 2))
      label(x, 790, 1090, 'BOUGHT: MILK', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Ordered last. | After *polling the table.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const OPTS = [['PASTA', 0.5], ['SOUP', 0.5]]
      card(x, 780, 830, 340, 320, 1.15 * pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.03 }, () => {
        txt(x, 'TABLE POLL', 0, -120, { size: 30, font: MONO, weight: 700 })
        OPTS.forEach(([s, v], i) => {
          const g = clamp((lt - 0.5) / 1.0) * v, y = -40 + i * 100
          txt(x, s, -140, y - 26, { size: 26, align: 'left', font: MONO, weight: 700 })
          x.fillStyle = INK; x.fillRect(-140, y - 6, 280, 36); x.fillStyle = i ? MINT : PINK; x.fillRect(-136, y - 2, 272 * g, 28)
          txt(x, `${Math.round(g * 100)}%`, 100, y - 26, { size: 24, font: MONO, weight: 700, color: '#6b62a8' })
        })
      })
      label(x, 790, 1100, 'TIE. AGAIN.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 38, bg: RED, color: CREAM, rot: -0.04 })
    } },
  { sign: S, cap: '“You’re my favourite.” | *To all of us.*', mood: lt => lt > 0.8 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const IDS = ['cancer', 'sagittarius', 'aquarius']
      IDS.forEach((id, i) => {
        const cx = 680 + i * 115, cy = 1000 - (i % 2) * 40
        const k = pop01(t, P.t0 + 0.3 + i * 0.4, 0.3, 2)
        if (k > 0.01) signChar(x, t, id, cx, cy, 140 * k, { mood: 'heart', look: [-1, 0], seed: 40 + i, glyph: false })
        bubble(x, cx, cy - 120, 'fave!', pop01(t, P.t0 + 0.45 + i * 0.4, 0.25, 2.2), { size: 28, col: PINK, tail: 'bc' })
      })
      label(x, 790, 660, 'FAVOURITES: 3', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0277', key: 'E', accent: ACC, solo: S, ending: 'card',
  title: 'Libra red flags | *we love.*',
  cameos: CAMEOS,
  card: { a: 'libra', b: 'gemini', chip: 'MATCH: PENDING' },
  group: { cap: 'Indecisive. | *Irresistible.*', mood: 'heart' },
  lesson: { text: 'Their charm is real. | They *mean it.*', chip: 'STATUS: SMITTEN' },
  last: {
    text: 'Their perfect match? | *Still deciding.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
