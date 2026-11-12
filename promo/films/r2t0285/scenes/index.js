// r2t0285: star_talk, BELIKE (twelve signs), "Zodiacs when the food's too spicy | be like." (~57 s vertical, lofi · F)
// Twelve signs in zodiac order, each the most extreme version of itself when the food is way too spicy.
//   0.0–3.6    "Zodiacs when it’s | too spicy *be like.*"
//   3.6–49.2   ♈ "not spicy", head on fire · ♉ kept eating on principle · ♊ love it, hate it · ♋ called mom for milk · ♌ extra
//              hot, for the audience · ♍ read every ingredient · ♎ "it's lovely!" (sweating) · ♏ asked for hotter · ♐ ate the
//              pepper on a dare · ♑ ate exactly half · ♒ hot sauce on ice cream · ♓ cried, it was just black pepper
//  49.2        "Twelve signs. | *Zero taste buds.*"
//  52.6        callback: "Aries, still: | *"Not spicy."*" Aries comes back, head still on fire.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, CREAM, RED, GREY, DEEP, GREEN, WOOD, ORANGE } from './props.js'

const ACC = '#ff7a4a'
const ST = { x: -170 }
const FLAME = ['...R.....R..', '..RR....RR..', '..RRR..RRR.R', '.RROR.RROR.R', '.ROOORROOORR', 'RROYOOROYOOR', 'ROOYYOOOYYOR', '.ROYYYYYYYO.']
const FLAME_C = { R: RED, O: ORANGE, Y: GOLD }
const BOWL = ['.R.R.R.R.R.', 'RRRRRRRRRRR', 'KKKKKKKKKKK', 'WWWWWWWWWWW', '.WWWWWWWWW.', '..WWWWWWW..']
const BOWL_C = { R: RED, K: INK, W: '#e8e4f4' }
const PEPPER = ['......G.', '.....GG.', '...RRR..', '..RRRRR.', '.RRRRRR.', '.RRRRR..', 'RRRRR...', 'RRRR....', '.RR.....']
const PEPPER_C = { G: GREEN, R: RED }
const CONE = ['..PPPP..', '.PPWPPP.', 'PPPPPPPP', 'RPPRPPRP', 'CCCCCCCC', '.CBCBCC.', '.CCCCCC.', '..CBCC..', '..CCCC..', '...CC...']
const CONE_C = { P: '#ffd0dc', W: '#fff', R: RED, C: '#e0a060', B: '#b06a30' }
const SHAKER = ['..KKKK..', '.K.K.K..', 'GGGGGGGG', 'GWGGGGGG', 'GGGGGGGG', 'GGGKKGGG', 'GGGGGGGG', 'GGGGGGGG']
const SHAKER_C = { K: INK, G: GREY, W: '#fff' }
const DROP = ['.B.', 'BBB', 'BWB', '.B.']

const headFire = (x, t, F, k = 1) => { if (k > 0.01) drawBits(x, FLAME, FLAME_C, F.x, F.top - 30 + Math.sin(t * 18) * 3, 12 * k, { sy: 1 + 0.08 * Math.sin(t * 22) }) }
const sweat = (x, t, F, n = 3) => { for (let i = 0; i < n; i++) { const ph = ((t * 0.9 + i / n) % 1); drawBits(x, DROP, { B: SKYB, W: '#fff' }, F.x + 110 + i * 24, F.top + 30 + ph * 90, 7, { alpha: 1 - ph }) } }

const CAMEOS = [
  { sign: 'aries', cap: 'Said "not spicy." | *Head on fire.*', mood: lt => lt > 1.0 ? 'wide' : 'happy', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P, F) {
      bubble(x, 790, 700, 'not even spicy.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      headFire(x, t, F, ease.outBack(prog(lt, 1.0, 1.3)))
      drawBits(x, BOWL, BOWL_C, 790, 1000, 18 * pop01(t, P.t0 + 0.2, 0.35, 2))
    } },
  { sign: 'taurus', cap: 'Kept eating. | *Out of principle.*', mood: 'squint', look: [1, 1], star: ST, squash: lt => 0.02 * Math.sin(lt * 18),
    front(x, t, lt, P, F) {
      drawBits(x, BOWL, BOWL_C, 790, 980, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      sweat(x, t, F, 2)
      label(x, 790, 720, `BITE ${30 + Math.floor(clamp((lt - 0.4) / 1.6) * 12)}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 44, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Loves it. Hates it. | *Loves it again.*', mood: lt => Math.floor(lt * 2.2) % 2 ? 'wide' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const love = Math.floor(lt * 2.2) % 2 === 0
      label(x, 790, 850, love ? 'LOVE IT' : 'HATE IT', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 56, bg: love ? PINK : RED, color: love ? INK : '#fff4e2', rot: love ? -0.05 : 0.05 })
    } },
  { sign: 'cancer', cap: 'Called their mom. | *For the milk advice.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      phone(x, 790, 870, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'MOM', headCol: PINK, lines: [['MOM. it\'s hot.', RED, pop01(t, P.t0 + 0.5, 0.25, 2)], ['drink milk, baby', MINT, pop01(t, P.t0 + 1.0, 0.25, 2)], ['love you <3', LAV, pop01(t, P.t0 + 1.4, 0.25, 2)]] })
      sweat(x, t, F, 2)
    } },
  { sign: 'leo', cap: 'Ordered extra hot. | *For the audience.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P, F) {
      label(x, 790, 700, 'EXTRA HOT', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 44, bg: RED, color: '#fff4e2', rot: 0.05 })
      bubble(x, 790, 920, 'everyone watch.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, col: GOLD, tail: 'bl' })
      if (lt > 1.6) sweat(x, t, F, 3)
    } },
  { sign: 'virgo', cap: 'Read every ingredient. | *Out loud.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 880, 320, 340, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.03 }, () => {
        txt(x, 'INGREDIENTS', 0, -130, { size: 30, font: MONO, weight: 700 })
        ;['chili', 'more chili', 'chili (again)', 'regret'].forEach((s, i) => { if (lt > 0.5 + i * 0.3) txt(x, `• ${s}`, -130, -60 + i * 56, { size: 30, align: 'left', weight: 700 }) })
      })
    } },
  { sign: 'libra', cap: 'Said "it\'s lovely!" | *Sweating politely.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      bubble(x, 790, 740, 'it\'s lovely, thank you!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 32, col: PINK, tail: 'bl' })
      if (lt > 0.8) sweat(x, t, F, 4)
      label(x, 790, 980, 'TOTALLY FINE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Asked for hotter. | *Didn\'t blink.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BOWL, BOWL_C, 790, 1000, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      drawBits(x, FLAME, FLAME_C, 790, 880, 13 * ease.outBack(prog(lt, 0.4, 0.7)), { sy: 1 + 0.08 * Math.sin(t * 22) })
      label(x, 790, 680, 'HOTTER, PLEASE.', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: '#ff7ab6', rot: 0.04 })
    } },
  { sign: 'sagittarius', cap: 'Ate the pepper | *on a dare.*', mood: lt => lt > 1.0 ? 'wide' : 'sparkle', look: [1, 0], star: ST, hops: [0.4],
    front(x, t, lt, P, F) {
      if (lt < 1.0) drawBits(x, PEPPER, PEPPER_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.2 })
      else {
        x.fillStyle = BONE; for (let i = 0; i < 6; i++) { const ph = ((t * 1.2 + i / 6) % 1); x.globalAlpha = 1 - ph; x.beginPath(); x.arc(F.x + (i % 2 ? 150 : -150) + (i % 2 ? 1 : -1) * ph * 60, F.cy - 40 - ph * 140, 22 + ph * 20, 0, Math.PI * 2); x.fill() }
        x.globalAlpha = 1
        label(x, 790, 880, 'WORTH IT?', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      }
    } },
  { sign: 'capricorn', cap: 'Calculated the heat. | *Ate exactly half.*', mood: 'neutral', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.beginPath(); x.rect(600, 800, 190 + 190 * (1 - clamp((lt - 0.8) / 0.4) * 0.5) * 1, 400); x.clip()
        drawBits(x, BOWL, BOWL_C, 790, 980, 24 * k)
        x.restore()
        x.fillStyle = INK; x.fillRect(786, 900, 8, 150 * clamp((lt - 0.6) / 0.3))
      }
      label(x, 790, 720, 'HALF. EXACTLY.', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Put hot sauce | *on ice cream.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CONE, CONE_C, 790, 920, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1150, 'NEW FAVOURITE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cried. | *It was just pepper.*', mood: 'wide', tears: lt => lt > 0.9 ? 3 : 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SHAKER, SHAKER_C, 790, 920, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 700, 'BLACK PEPPER', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 36, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1120, 'ONE SPRINKLE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0285', key: 'F', accent: ACC, ending: 'callback',
  title: 'Zodiacs when it’s | too spicy *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *Zero taste buds.*' },
  last: {
    text: 'Aries, still: | *"Not spicy."*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.4, 0.4, 2)
      if (k > 0.01) {
        const F = signChar(x, t, 'aries', 440, 1150, 400 * k, { mood: 'squint', seed: 5, hops: [t0 + 1.0] })
        headFire(x, t, F, k * 1.1)
        sweat(x, t, F, 3)
      }
      bubble(x, 760, 880, 'mild, honestly.', pop01(t, t0 + 1.0, 0.3, 2.4), { size: 54, col: GOLD, tail: 'bl' })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
