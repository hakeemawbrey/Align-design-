// r2a0029: star_advice, ADVICE ROLLCALL, "Learning to receive, | by sign." (~57 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order: one warm, specific line per sign about letting good things in, each with a light gag.
// Ending: callback.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ let someone else carry the bags · ♉ let them cook, no notes · ♊ a compliment? just say thanks
//              · ♋ let someone make you the tea · ♌ quiet praise counts, let it land · ♍ wrapped badly? say thank you
//              · ♎ gifts aren't a debt (IOU torn up) · ♏ someone sees the real you, let them stay
//              · ♐ someone wants to come along, save a seat · ♑ help isn't weakness · ♒ a hug is coming, allow it
//              · ♓ you give your whole heart, take some back
//  49.2        "Take it. | *You deserve it.*"
//  52.6        CALLBACK: "Aquarius? | *Now asks for hugs.*"  Aquarius with a little HUGS? sign, hearts.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PEACH = '#ffb38a', CREAM = '#fff4e2', RED = '#e23d4e'

// ── props
const BAG = ['..KKKK..', '.K....K.', 'BBBBBBBB', 'BBBBBBBB', 'BBBWWBBB', 'BBBBBBBB', 'BBBBBBBB']
const POT = ['.S..S..S.', '..S..S...', 'KKKKKKKKK', 'PPPPPPPPP', 'PPPPPPPPP', 'PPPPPPPPP', '.PPPPPPP.']
const MUG = ['MMMMMMM...', 'MWWWWWMMMM', 'MWMMMMM..M', 'MMMMMMM..M', 'MMMMMMMMMM', 'MMMMMMM...', '.MMMMM....']
const STEAM = ['.S...S.', 'S...S..', '.S...S.', '..S...S']
const GIFT = ['...RR.RR...', '....RRR....', 'GGGGGRGGGGG', 'GGGGGRGGGGG', '.GGGGRGGGG.', 'GGGGGRGG.GG', 'GGGGGRGGGGG', '.GGGGRGGGG.']
const BOX = ['KKKKKKKKKKKK', 'KBBBBBBBBBBK', 'KBBBBTTBBBBK', 'KBBBBBBBBBBK', 'KBBBBBBBBBBK', 'KKKKKKKKKKKK']
const TICKET = ['TTTTTTTTT', 'T.T.TTTTT', 'TTTTTTTTT', 'T.T.TTTTT', 'TTTTTTTTT']

const CAMEOS = [
  { sign: 'aries', cap: 'Let someone else | *carry the bags.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 }, hops: [0.6, 1.0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) {
        const F2 = signChar(x, t, 'libra', 800, 960, 200 * k, { mood: 'sparkle', look: [-1, 0], seed: 21, glyph: false })
        drawBits(x, BAG, { K: INK, B: PEACH, W: CREAM }, F2.x - 110, F2.cy + 40, 12 * k)
        drawBits(x, BAG, { K: INK, B: SKYB, W: CREAM }, F2.x + 110, F2.cy + 40, 12 * k)
      }
      label(x, 790, 690, 'HANDS: FREE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Let them cook. | *No notes.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, POT, { S: '#e6e0f0', K: INK, P: '#9aa5c4' }, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 690, 'maybe more salt— | no. it’s perfect.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 30, tail: 'bl' })
      label(x, 790, 1110, 'NOTES: ZERO', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'A compliment? | *Just say thanks.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'you’re so funny!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, col: BONE, tail: 'br' })
      bubble(x, 780, 880, lt < 1.2 ? 'oh, this old—' : 'thank you!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 42, col: GOLD, tail: 'bl' })
      label(x, 790, 1080, 'RECEIVED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 40, bg: PEACH, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Let someone | *make you the tea.*', mood: 'heart', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const km = pop01(t, P.t0 + 0.3, 0.3, 2)
      drawBits(x, MUG, { M: PEACH, W: CREAM }, 800, 920, 24 * km)
      drawBits(x, STEAM, { S: '#e6e0f0' }, 770, 790 - Math.sin(t * 3) * 6, 14 * km, { outline: null, alpha: 0.8 })
      label(x, 790, 1110, 'YOUR TURN', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 44, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 760, P.t0 + 1.2, { n: 4, life: 1.4, spread: 120, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Quiet praise counts. | *Let it land.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      bubble(x, 800, 800, 'proud of you.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 28, col: BONE, tail: 'br' })
      sparkles(x, t, 360, 860, P.t0 + 1.2, 8, 200, 0.4)
      label(x, 790, 1050, 'LANDED.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 44, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Wrapped badly? | *Say thank you.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, GIFT, { R: RED, G: MINT }, 790, 900, 22 * k, { rot: 0.12 })
      if (k > 0.5) { x.fillStyle = 'rgba(239,230,214,0.85)'; x.fillRect(700, 850, 70, 18); x.fillRect(830, 930, 60, 18); x.fillRect(760, 960, 18, 50) }
      label(x, 790, 1110, 'IT’S PERFECT', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Gifts aren’t a debt. | *Just enjoy it.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), tear = ease.outCubic(prog(lt, 1.0, 1.4))
      for (const s of [-1, 1]) {
        if (k <= 0.01) continue
        x.save(); x.translate(790 + s * 70 * tear, 870 + 60 * tear); x.rotate(s * 0.25 * tear); x.scale(k, k)
        x.beginPath(); x.rect(s < 0 ? -140 : 0, -90, 140, 180); x.clip()
        x.fillStyle = INK; x.fillRect(-140, -90, 280, 180); x.fillStyle = CREAM; x.fillRect(-132, -82, 264, 164)
        x.fillStyle = INK; x.font = `800 80px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('IOU', 0, 4)
        x.restore()
      }
      label(x, 790, 1110, 'NOTHING OWED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Someone sees the real you. | *Let them stay.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 800, 960, 200 * k, { mood: 'heart', look: [-1, 0], seed: 23, glyph: false })
      bubble(x, 790, 700, 'i like the | real you.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, tail: 'br' })
      label(x, 790, 1130, 'STAYING', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 40, bg: '#c97bff', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Someone wants to come. | *Save them a seat.*', mood: 'sparkle', look: [1, 0], star: { x: -190 }, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, TICKET, { T: GOLD }, 740, 880, 20 * k, { rot: -0.12 })
      drawBits(x, TICKET, { T: PEACH }, 850, 900, 20 * pop01(t, P.t0 + 0.8, 0.3, 2), { rot: 0.12 })
      bubble(x, 790, 690, 'can i come?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 40, col: BONE, tail: 'br' })
      label(x, 790, 1100, 'TABLE FOR TWO', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Help isn’t weakness. | *It’s teamwork.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const lift = ease.outCubic(prog(lt, 0.9, 1.5)) * 60
      drawBits(x, BOX, { K: INK, B: '#c98f2a', T: CREAM }, 790, 960 - lift, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 880, 1060 - lift, 150 * k, { mood: 'sparkle', look: [-1, -1], seed: 24, glyph: false })
      label(x, 790, 690, 'LIGHTER ALREADY', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'A hug is coming. | *Allow it.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: { x: -150 }, squash: lt => lt < 1.2 ? 0.06 : 0,
    front(x, t, lt, P) {
      const come = ease.outCubic(prog(lt, 0.3, 1.2))
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'pisces', lerp(860, 600, come), 900, 220 * k, { mood: 'heart', look: [-1, 0], seed: 25, glyph: false, tears: 1 })
      hearts(x, t, 500, 760, P.t0 + 1.3, { n: 6, life: 1.6, spread: 180, cell: 8, seed: 6 })
      label(x, 790, 1120, 'HUG: ACCEPTED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'You give your whole heart. | *Keep some too.*', mood: 'heart', tears: lt => lt > 1.0 ? 2 : 1, look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) {
        const ph = clamp((lt - 0.3 - i * 0.2) / 1.0)
        if (ph <= 0) continue
        drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: i % 2 ? PINK : '#ff4f86' }, lerp(880, 420, ease.inOutCubic(ph)), 760 + i * 50 - Math.sin(Math.PI * ph) * 80, 12, { alpha: 1 - clamp((ph - 0.85) / 0.15) })
      }
      label(x, 790, 1110, 'REFILLED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 40, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0029', key: 'E', accent: PEACH, ending: 'callback',
  title: 'Learning to receive, | *by sign.*',
  cameos: CAMEOS,
  group: { cap: 'Take it. | *You deserve it.*' },
  last: {
    text: 'Aquarius? | *Now asks for hugs.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'aquarius', 540, 1060, 300 * k, { mood: lt > 1.2 ? 'heart' : 'sparkle', seed: 40, hops: [t - lt + 1.2, t - lt + 2.0] })
      label(x, 540, 1300, 'HUGS?', pop01(t, t - lt + 1.0, 0.3, 2.4), { size: 52, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 540, 940, t - lt + 1.3, { n: 8, life: 2.0, spread: 380, cell: 8, seed: 7 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
