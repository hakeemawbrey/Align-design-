// r2a0409: star_advice, ADVICE ROLLCALL, "How each sign | gives a *compliment.*" (~57 s vertical, signs3kit social cut,
// music: lofi · E). One warm, specific line per sign with a light gag. Ending: callback (Capricorn's reference letter).
//   ♈ loudly, in public · ♉ bakes you a cake · ♊ fifteen texts of hype · ♋ remembers what you said months ago
//   · ♌ a standing ovation · ♍ specific and sincere · ♎ your outfit is art · ♏ rare, quiet, means everything
//   · ♐ honest about your idea · ♑ writes you a reference letter · ♒ loves your weird brain · ♓ cries while saying it
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'
import { card, txt, phone, confetti, CREAM, RED, ORANGE, GREY, DEEP, GREEN, SUN, BROWN, clamp, ease, lerp, prog } from './props.js'

const ACC = '#ffc36b'
const ST = { x: -170 }
const lab = (x, cx, cy, s, k, o = {}) => label(x, cx, cy, s, k, { size: 32, font: MONO, weight: 700, ...o })

const MEGA = ['.......KK', '.....KKRK', '...KKRRRK', 'KKKRRRRRK', 'KWKRRRRRK', 'KKKRRRRRK', '...KKRRRK', '.....KKRK', '.......KK']
const CAKE = ['....R....', '....Y....', '.PPPPPPP.', 'PWPWPWPWP', 'BBBBBBBBB', 'BBBBBBBBB', 'PPPPPPPPP', 'BBBBBBBBB', 'BBBBBBBBB']
const HAND = ['.KK.KK.', 'KYYKYYK', 'KYYYYYK', 'KYYYYYK', '.KYYYK.', '..KKK..']

/** a short stack of letter pages (n pages fanned) */
function letter(x, cx, cy, k, n, lines) {
  for (let i = n - 1; i >= 0; i--) card(x, cx + i * 14, cy - i * 12, 300, 360, k, { bg: CREAM, rot: 0.03 + i * 0.02 }, i ? null : () => {
    lines.forEach((l, j) => txt(x, l, 0, -130 + j * 48, { size: j ? 28 : 24, font: j ? undefined : MONO, weight: j ? 800 : 700, color: j ? INK : GREY }))
  })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Loudly. In public. | *“YOU’RE AMAZING!”*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.5, 1.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      drawBits(x, MEGA, { K: INK, R: RED, W: BONE }, F.x + 210, F.cy - 10, 18 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 800, 680, 'YOU’RE AMAZING!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 42, tail: 'bl' })
      lab(x, 800, 1110, 'WHOLE CAFE: AGREES', pop01(t, P.t0 + 1.5, 0.3, 2.4), { bg: SUN, rot: -0.04, size: 30 })
    } },
  { sign: 'taurus', cap: 'Bakes you a cake. | *“You deserve this.”*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CAKE, { R: RED, Y: SUN, P: PINK, W: BONE, B: '#e6b26a' }, 790, 900, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      lab(x, 790, 1110, 'FROM SCRATCH', pop01(t, P.t0 + 1.3, 0.3, 2.4), { bg: GREEN, rot: -0.04 })
      sparkles(x, t, 790, 860, P.t0 + 0.9, 7, 170, 0.4)
    } },
  { sign: 'gemini', cap: 'Fifteen texts | of *pure hype.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'HYPE x15', headCol: SUN, lines: [
        ['UR SO FUNNY', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2)],
        ['and smart??', SUN, pop01(t, P.t0 + 0.8, 0.25, 2.2)],
        ['and kind??', BONE, pop01(t, P.t0 + 1.1, 0.25, 2.2)],
        ['ICON', MINT, pop01(t, P.t0 + 1.4, 0.25, 2.2)],
      ] })
    } },
  { sign: 'cancer', cap: 'Remembers what you said | *months ago.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'how’s the pottery | going?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl', col: SKYB })
      lab(x, 790, 900, 'YOU MENTIONED IT', pop01(t, P.t0 + 1.0, 0.3, 2.4), { bg: BONE, rot: 0.04 })
      lab(x, 790, 990, 'ONCE. IN MARCH.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { bg: PINK, rot: -0.04 })
    } },
  { sign: 'leo', cap: 'Compliments you | like a *standing ovation.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.3, 1.9],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), c = Math.abs(Math.sin(t * 9)) * 20
      drawBits(x, HAND, { K: INK, Y: '#ffd9a0' }, F.x + 170 - c, F.cy - 10, 14 * k, { rot: 0.5 })
      drawBits(x, HAND, { K: INK, Y: '#ffd9a0' }, F.x + 230 + c, F.cy - 10, 14 * k, { rot: -0.5 })
      bubble(x, 800, 680, 'BRAVO! ENCORE!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, tail: 'bl' })
      confetti(x, t, 760, 900, P.t0 + 1.0, { n: 16, spread: 200, h: 460 })
    } },
  { sign: 'virgo', cap: 'Specific. Detailed. | *Completely sincere.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 330, 340, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'THINGS I LIKE:', 0, -130, { size: 26, font: MONO, weight: 700, color: GREEN })
        ;['your laugh', 'your handwriting', 'how you park'].forEach((s, i) => { if (lt > 0.5 + i * 0.35) txt(x, `${i + 1}. ${s}`, 0, -60 + i * 60, { size: 30 }) })
      })
      lab(x, 790, 1110, 'NOTARISED', pop01(t, P.t0 + 1.7, 0.3, 2.4), { bg: MINT, rot: -0.04 })
    } },
  { sign: 'libra', cap: 'Your outfit? | *“A work of art.”*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 800, 850, 280, 340, k, { bg: GOLD, rot: -0.03, border: 10 }, () => {
        x.fillStyle = DEEP; x.fillRect(-116, -146, 232, 292)
        signChar(x, t, 'cancer', 0, 10, 160, { mood: 'sparkle', seed: 31, glyph: false })
      })
      lab(x, 800, 1110, 'GALLERY: OPEN', pop01(t, P.t0 + 1.3, 0.3, 2.4), { bg: PINK, rot: -0.04 })
    } },
  { sign: 'scorpio', cap: 'Rare. Quiet. | *Means everything.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'you’re… good.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, tail: 'bl', col: LAV })
      const k = pop01(t, P.t0 + 1.1, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 820, 980, 160 * k, { mood: 'heart', look: [-1, 0], seed: 15, glyph: false })
      lab(x, 790, 1150, 'FRIEND: FRAMED IT', pop01(t, P.t0 + 1.6, 0.3, 2.4), { bg: GOLD, rot: -0.04 })
    } },
  { sign: 'sagittarius', cap: 'Honest, always. | *“That idea? Genius.”*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.9],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'genius. | do it. today.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      lab(x, 790, 960, 'NO NOTES', pop01(t, P.t0 + 1.1, 0.3, 2.4), { bg: SUN, rot: 0.04, size: 40 })
      sparkles(x, t, 790, 760, P.t0 + 1.0, 7, 200, 0.6)
    } },
  { sign: 'capricorn', cap: 'Writes you | a *reference letter.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      letter(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), 1, ['TO WHOM IT MAY CONCERN:', 'this person', 'is excellent.', 'highly', 'recommend.'])
      lab(x, 790, 1110, 'SIGNED + STAMPED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { bg: GREEN, rot: -0.04 })
    } },
  { sign: 'aquarius', cap: 'Loves your brain. | *Your weird is great.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'tell me that theory | again', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl', col: SKYB })
      lab(x, 790, 960, 'BIG BRAIN ENERGY', pop01(t, P.t0 + 1.1, 0.3, 2.4), { bg: LAV, rot: 0.04 })
      lab(x, 790, 1060, 'WEIRD: CERTIFIED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { bg: MINT, rot: -0.04 })
    } },
  { sign: 'pisces', cap: 'Cries while saying it. | *Means every word.*', mood: 'heart', tears: 3, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'you’re just | so… sniff', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl', col: SKYB })
      lab(x, 790, 1080, 'TISSUES FOR TWO', pop01(t, P.t0 + 1.3, 0.3, 2.4), { bg: PINK, rot: -0.04 })
      hearts(x, t, 790, 960, P.t0 + 1.0, { n: 4, life: 1.6, spread: 180, cell: 7, seed: 7 })
    } },
]

const F = makeFilm({
  id: 'r2a0409', key: 'E', accent: ACC, ending: 'callback',
  title: 'How each sign | *compliments you.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve ways | to say *“you matter.”*' },
  last: {
    text: 'Capricorn’s letter? | *Now twelve pages.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const n = 1 + Math.floor(clamp((lt - 0.6) / 1.4) * 4)
      letter(x, 720, 1050, pop01(t, t0 + 0.3, 0.45, 2), n, ['PAGE 12 OF 12:', 'and another', 'thing they’re', 'great at…', ''])
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'capricorn', 330, 1120, 240 * k, { mood: lt > 1.4 ? 'heart' : 'happy', seed: 9, look: [1, 0], hops: [t0 + 1.4] })
      lab(x, 560, 1340, 'STILL WRITING', pop01(t, t0 + 1.7, 0.3, 2.4), { bg: GREEN, rot: -0.03, size: 40 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
