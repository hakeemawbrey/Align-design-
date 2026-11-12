// r2t0293: star_talk, BE LIKE, "Early zodiacs | be like." (first to arrive) (~54 s vertical, signs3kit social cut, music: lofi · G)
//   0.0–3.6    "Early zodiacs | *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   first one there, each pushed to the extreme:
//              ♈ an hour early, called it a win · ♉ claimed the comfiest chair, not moving · ♊ best friends with the staff
//              · ♋ texted everyone "drive safe" · ♌ left and came back in for an entrance · ♍ rearranged the chairs
//              · ♎ hid outside so they weren't first · ♏ read everyone's birth chart while waiting · ♐ wrong party, stayed
//              · ♑ answered emails in the parking lot · ♒ started a side party · ♓ "they forgot me" (they're two minutes late)
//  49.2        "Early is | *a vibe.*"   52.4  LESSON: "Showing up early | is a *love language.*"   58.3  "Everyone else? | *'5 min away.'*"
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'
import { card, txt, phone, chart, laptop, beam, confetti, CREAM, RED, ORANGE, GREY, DEEP, GREEN, WOOD, BROWN, SUN, clamp, ease, lerp, prog } from './props.js'

const ACC = SKYB
const ST = { x: -170 }
const lab = (x, cx, cy, s, k, o = {}) => label(x, cx, cy, s, k, { size: 32, font: MONO, weight: 700, ...o })

const CHAIR = ['.KKKKKKKK.', 'KRRRRRRRRK', 'KRRRRRRRRK', 'KRRRRRRRRK', 'KRRRRRRRRK', 'KKKKKKKKKK', 'KRKKKKKKRK', 'KRRRRRRRRK', 'KRRRRRRRRK', 'KKKKKKKKKK', 'K........K', 'K........K']
const SEAT = ['KKKKKK', 'KWWWWK', 'KKKKKK', 'K....K', 'K....K']
const BUSH = ['...GGGG....', '..GGGGGGG..', '.GGGLGGGGG.', 'GGGGGGGLGGG', 'GGLGGGGGGGG', 'GGGGGGGGGLG', '.GGGGGLGGG.']
const RIBBON = ['.YYYYY.', 'YYKYYYY', 'YKYKYYY', 'YYKYYYY', '.YYYYY.', '.RR.RR.', 'RR...RR']

const CAMEOS = [
  { sign: 'aries', cap: 'An hour early. | *Called it a win.*', mood: 'sparkle', star: ST, hops: [0.7, 1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      drawBits(x, RIBBON, { Y: GOLD, K: '#c98f2a', R: RED }, 800, 860, 26 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: 0.08 })
      lab(x, 800, 1080, 'PARTY STARTS: 8PM', pop01(t, P.t0 + 0.9, 0.3, 2), { bg: BONE, rot: -0.04 })
      lab(x, 800, 650, 'ARRIVED: 7:00', pop01(t, P.t0 + 1.4, 0.3, 2.4), { bg: RED, color: BONE, rot: 0.04, size: 36 })
    } },
  { sign: 'taurus', cap: 'Claimed the comfy chair. | *Not moving.*', mood: lt => lt > 1.0 ? 'sleepy' : 'heart', star: { x: -60, y: -20 }, squash: 0.05,
    back(x, t, lt, P) { drawBits(x, CHAIR, { K: INK, R: '#c1546a' }, 480, 930, 34 * pop01(t, P.t0 + 0.1, 0.35, 2)) },
    front(x, t, lt, P) {
      lab(x, 820, 690, 'RESERVED (FOREVER)', pop01(t, P.t0 + 1.0, 0.3, 2.4), { bg: SUN, rot: 0.05, size: 30 })
    } },
  { sign: 'gemini', cap: 'Best friends | with the *staff.*', mood: 'sparkle', star: ST, hops: [1.0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 800, 990, 190 * k, { mood: lt > 1.3 ? 'heart' : 'happy', look: [-1, 0], seed: 31, glyph: false })
      bubble(x, 760, 660, "what's your sign? | i KNEW it.", pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, tail: 'br' })
      lab(x, 800, 1150, 'BESTIES: 4 MIN', pop01(t, P.t0 + 1.5, 0.3, 2.4), { bg: SUN, rot: -0.04 })
    } },
  { sign: 'cancer', cap: 'Texted everyone | *"drive safe!"*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const msgs = ['drive safe!', 'drive safe!!', 'text me when', 'u get here ♥']
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'GROUP CHAT', headCol: SKYB, size: 28, w: 290, lines: msgs.map((m, i) => [m, i % 2 ? PINK : BONE, pop01(t, P.t0 + 0.4 + i * 0.35, 0.25, 2)]) })
    } },
  { sign: 'leo', cap: 'Left. Came back in. | *For the entrance.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', star: { x: -40 }, hops: [1.0],
    back(x, t, lt, P) {
      x.save(); x.globalAlpha = clamp(P.k); x.fillStyle = INK; x.fillRect(780, 620, 190, 470); x.fillStyle = BROWN; x.fillRect(790, 630, 170, 460); x.fillStyle = GOLD; x.fillRect(930, 860, 16, 16); x.restore()
      beam(x, 500, 470, 500, 1150, 200, ease.outCubic(prog(lt, 0.9, 1.2)), { a: 0.34 })
    },
    front(x, t, lt, P) {
      lab(x, 500, 650, 'TAKE 2', pop01(t, P.t0 + 0.4, 0.3, 2), { bg: BONE, rot: -0.05, size: 38 })
      sparkles(x, t, 500, 850, P.t0 + 1.0, 8, 200, 0.2)
    } },
  { sign: 'virgo', cap: 'Rearranged | *the chairs.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const sorted = ease.inOutCubic(prog(lt, 0.6, 1.3))
      for (let i = 0; i < 6; i++) {
        const gx = 690 + (i % 3) * 100, gy = 840 + Math.floor(i / 3) * 140
        const mx = 640 + ((i * 137) % 300), my = 800 + ((i * 89) % 260)
        drawBits(x, SEAT, { K: INK, W: CREAM }, lerp(mx, gx, sorted), lerp(my, gy, sorted), 12 * pop01(t, P.t0 + 0.1 + i * 0.05, 0.3, 2), { rot: (1 - sorted) * (i % 2 ? 0.4 : -0.3) })
      }
      lab(x, 790, 660, 'SEATING PLAN v4', pop01(t, P.t0 + 1.3, 0.3, 2.4), { bg: MINT, rot: 0.04 })
    } },
  { sign: 'libra', cap: 'Hid outside | so they *weren’t first.*', mood: 'wide', look: [1, 0], star: { x: -40, y: 40 },
    front(x, t, lt, P) {
      drawBits(x, BUSH, { G: '#3fae4e', L: '#7ddc7a' }, 520, 1120, 30 * pop01(t, P.t0 + 0.15, 0.35, 2))
      bubble(x, 800, 680, 'is anyone | here yet??', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, tail: 'bl' })
      lab(x, 800, 1120, 'WAITED: 40 MIN', pop01(t, P.t0 + 1.5, 0.3, 2.4), { bg: PINK, rot: 0.04 })
    } },
  { sign: 'scorpio', cap: 'Read everyone’s chart | *while waiting.*', mood: 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) chart(x, 700 + i * 110, 820 + (i % 2) * 120, 62, pop01(t, P.t0 + 0.2 + i * 0.35, 0.35, 2), t + i, 0.3 * (i % 2 ? -1 : 1))
      lab(x, 800, 1100, 'GUESTS: DECODED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { bg: LAV, rot: -0.04 })
    } },
  { sign: 'sagittarius', cap: 'Wrong party. | *Stayed anyway.*', mood: 'sparkle', star: ST, hops: [0.7, 1.3, 1.9],
    front(x, t, lt, P) {
      card(x, 790, 760, 320, 150, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: PINK, rot: 0.04 }, () => {
        txt(x, 'HAPPY 70TH,', 0, -28, { size: 34 }); txt(x, 'GRANDPA JOE!', 0, 24, { size: 34 })
      })
      confetti(x, t, 790, 900, P.t0 + 0.8, { n: 16, spread: 180, h: 420 })
      lab(x, 790, 1100, 'NEW BEST FRIEND: JOE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: SUN, rot: -0.04 })
    } },
  { sign: 'capricorn', cap: 'Answered emails | in the *parking lot.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      laptop(x, 790, 960, pop01(t, P.t0 + 0.2, 0.35, 2), () => {
        const n = Math.floor(clamp((lt - 0.3) / 1.7) * 31)
        txt(x, 'INBOX', 0, -34, { size: 24, font: MONO, weight: 700, color: GREY })
        txt(x, String(31 - n), 0, 18, { size: 58, font: MONO, weight: 700, color: n > 28 ? MINT : BONE })
      })
      lab(x, 790, 650, 'PARTY: OPTIONAL', pop01(t, P.t0 + 1.4, 0.3, 2.4), { bg: GREY, rot: 0.04 })
    } },
  { sign: 'aquarius', cap: 'Started a | *side party.*', mood: 'sparkle', star: ST, hops: [0.9, 1.6],
    front(x, t, lt, P) {
      card(x, 790, 800, 300, 210, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: -0.04 }, () => {
        txt(x, 'PARTY B', 0, -50, { size: 44, color: '#3a8fd8' })
        txt(x, 'theme: moths', 0, 10, { size: 28, font: MONO, weight: 700 })
        txt(x, 'guests: 1', 0, 58, { size: 28, font: MONO, weight: 700, color: RED })
      })
      lab(x, 790, 1080, 'ALREADY BETTER', pop01(t, P.t0 + 1.4, 0.3, 2.4), { bg: SKYB, rot: 0.04 })
    } },
  { sign: 'pisces', cap: '"They forgot me." | *It’s been 2 minutes.*', mood: 'wide', tears: lt => lt > 0.8 ? 3 : 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 800, 790, 280, 150, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: INK, rot: 0.03 }, () => {
        txt(x, '8:02', 0, -10, { size: 64, font: MONO, weight: 700, color: BONE }); txt(x, 'pm', 0, 46, { size: 24, font: MONO, weight: 700, color: GREY })
      })
      lab(x, 800, 1060, 'TISSUES: 9', pop01(t, P.t0 + 1.1, 0.3, 2.4), { bg: SKYB, rot: -0.04, size: 36 })
    } },
]

const F = makeFilm({
  id: 'r2t0293', key: 'G', accent: ACC, ending: 'lesson',
  title: 'Early zodiacs | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Early is | *a vibe.*' },
  lesson: { text: 'Showing up early | is a *love language.*', chip: 'STATUS: FIRST' },
  last: {
    text: 'Everyone else? | *"5 min away."*',
    draw(x, t, lt) {
      phone(x, 540, 745, pop01(t, t - lt + 0.6, 0.4, 2), { head: 'GROUP CHAT', headCol: SKYB, size: 30, w: 320, h: 280, rot: -0.03,
        lines: [['5 min away', BONE, pop01(t, t - lt + 0.9, 0.25, 2)], ['5 min away!', PINK, pop01(t, t - lt + 1.2, 0.25, 2)], ['leaving now', BONE, pop01(t, t - lt + 1.5, 0.25, 2)]] })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
