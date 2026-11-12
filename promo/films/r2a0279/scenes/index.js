// r2a0279: star_advice, ADVICE ROLLCALL, "Making peace | with the past." (~54 s vertical, signs3kit, lofi · E)
// Twelve signs, one warm and specific way each makes peace with the past, with a light visual gag.
//   0.0–3.6    "Making peace | *with the past.*"
//   3.6–49.2   ♈ runs it off, then lets it go · ♉ bakes the feelings into bread · ♊ talks it out with three friends
//              · ♋ keeps the photo, forgives the moment · ♌ turns it into a great story · ♍ lists the lesson, ticks it
//              · ♎ writes the letter, never sends it · ♏ closes the old chapter gently · ♐ a long trip, back lighter
//              · ♑ books time to feel, and shows up · ♒ looks at the stars, it all feels smaller · ♓ cries it out,
//              wakes up new
//  49.2        the group beat is the ending: "Not forgotten. | *Just lighter.*" a soft sun rises over the photo.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, sun, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = '#ffc98f'
const ST = { x: -170 }

const SHOE = ['......KKK.', '.....KRRK.', 'KKKKKRRRK.', 'KRRRRRRRRK', 'KRWRWRRRRK', 'KKKKKKKKKK', 'KWWWWWWWWK', 'KKKKKKKKKK']
const LOAF = ['...KKKKKK...', '.KKBBBBBBKK.', 'KBBLBBLBBLBK', 'KBBBBBBBBBBK', 'KBBBBBBBBBBK', '.KKKKKKKKKK.']
const LOAF_C = { K: INK, B: '#e8a24a', L: '#fff1b0' }
const ENV = ['KKKKKKKKKKKK', 'KWKWWWWWWKWK', 'KWWKWWWWKWWK', 'KWWWKPPKWWWK', 'KWWWWKKWWWWK', 'KWWWWWWWWWWK', 'KKKKKKKKKKKK']
const ENV_C = { K: INK, W: CREAM, P: PINK }
const PACK = ['..KKKKKK..', '.KGGGGGGK.', 'KGGGGGGGGK', 'KGKKKKKKGK', 'KGKYYYYKGK', 'KGKKKKKKGK', 'KGGGGGGGGK', 'KKKKKKKKKK']
const PACK_C = { K: INK, G: '#7a9a4a', Y: SUN }
const SCOPE = ['.........KK', '........KWWK', '......KKWWK.', '....KKBBKK..', '..KKBBBBK...', 'KKBBBBKK....', 'KBBBKK......', '.KKK.K......', '....K.K.....', '...K...K....']
const SCOPE_C = { K: INK, W: SKYB, B: '#3f6fd0' }

/** a book that closes over [a, b] of the card's local clock */
function book(x, cx, cy, k, p, col) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const w = 130, h = 180
  x.translate(w / 2 * p, 0)
  const rr = Math.max(0, w * lerp(1, -1, p))
  x.fillStyle = INK; x.fillRect(-w - 8, -h / 2 - 8, w + rr + 16, h + 16)
  x.fillStyle = col; x.fillRect(-w, -h / 2, w, h)
  const r = lerp(1, -1, p)                             // right page swings over
  x.fillStyle = p < 0.5 ? CREAM : col; x.fillRect(Math.min(0, w * r), -h / 2, Math.abs(w * r), h)
  if (p < 0.5) { x.fillStyle = '#b9b0a0'; for (let i = 0; i < 5; i++) x.fillRect(18 * r, -60 + i * 28, (w - 40) * r, 6) }
  x.fillStyle = GOLD; x.fillRect(-w + 20, -20, 40, 40)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Runs it off. | *Then lets it go.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: ST, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      drawBits(x, SHOE, { K: INK, R: RED, W: CREAM }, 790, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.1 + 0.08 * Math.sin(t * 10) })
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.2) * 4)
      label(x, 790, 680, `LAP ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 44, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1100, 'FEELING: LIGHTER', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04 })
    } },
  { sign: 'taurus', cap: 'Bakes the feelings | *into bread.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, LOAF, LOAF_C, 790, 900, 28 * pop01(t, P.t0 + 0.3, 0.35, 2))
      x.fillStyle = '#ffffff'; for (let i = 0; i < 4; i++) { const ph = (t * 0.6 + i * 0.25) % 1; x.globalAlpha = 0.6 * Math.sin(Math.PI * ph) * clamp(lt - 0.6); x.fillRect(730 + i * 40, 820 - ph * 140, 12, 22) } x.globalAlpha = 1
      label(x, 790, 1100, 'KNEADED IT', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Talks it out. | *With three friends.*', mood: lt => lt > 1.5 ? 'happy' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 760, 650, 'so here’s what happened', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 30, col: BONE, tail: 'bl' })
      bubble(x, 820, 820, 'that makes sense', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 32, col: MINT, tail: 'br' })
      bubble(x, 760, 980, 'you’re okay now', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 32, col: PINK, tail: 'br' })
      label(x, 790, 1130, 'FRIEND 3 OF 3', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Keeps the photo. | *Forgives the moment.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 280, 320, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: -0.04 }, () => {
        x.fillStyle = '#6b62a8'; x.fillRect(-120, -140, 240, 220)
        signChar(x, t, 'cancer', -40, -20, 110, { mood: 'happy', seed: 31, glyph: false, glow: 0.4 })
        signChar(x, t, 'leo', 50, -10, 100, { mood: 'happy', seed: 32, glyph: false, glow: 0.4 })
        txt(x, 'back then', 0, 116, { size: 28, color: '#6b62a8' })
      })
      hearts(x, t, 560, 860, P.t0 + 1.3, { n: 4, life: 1.5, spread: 100, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Turns it into | *a great story.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'and THAT’S when | I grew', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: GOLD, tail: 'bl' })
      label(x, 790, 930, 'PLOT TWIST: GROWTH', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 370, 860, P.t0 + 1.2, 7, 170, 0.3)
    } },
  { sign: 'virgo', cap: 'Lists the lesson. | *Ticks it off.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const ITEMS = ['what hurt', 'what I learned', 'let it go']
      card(x, 790, 860, 340, 300, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.03 }, () => {
        txt(x, 'LESSONS', 0, -110, { size: 32, font: MONO, weight: 700 })
        ITEMS.forEach((s, i) => {
          const y = -40 + i * 66, on = lt > 0.6 + i * 0.45
          x.fillStyle = INK; x.fillRect(-140, y - 18, 36, 36); x.fillStyle = CREAM; x.fillRect(-134, y - 12, 24, 24)
          if (on) { x.fillStyle = GREEN; x.fillRect(-130, y - 8, 16, 16) }
          txt(x, s, -86, y, { size: 28, align: 'left' })
        })
      })
    } },
  { sign: 'libra', cap: 'Writes the letter. | *Never sends it.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, ENV, ENV_C, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.05 })
      label(x, 790, 680, 'SENT: NO', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 38, bg: GREY, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1090, 'FELT BETTER: YES', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Closes the old chapter. | *Gently.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      book(x, 770, 890, 1.35 * pop01(t, P.t0 + 0.2, 0.35, 2), ease.inOutCubic(prog(lt, 0.8, 1.4)), '#8a2a4a')
      label(x, 790, 1130, 'CHAPTER 7: DONE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'A long trip. | *Back lighter.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.9],
    front(x, t, lt, P) {
      drawBits(x, PACK, PACK_C, 790, 870, 28 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const kg = Math.max(0, 20 - Math.floor(clamp((lt - 0.5) / 1.3) * 20))
      label(x, 790, 1090, `BAGGAGE: ${kg} KG`, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 36, bg: kg ? GREY : MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Books time to feel. | *Actually shows up.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 320, 260, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        x.fillStyle = GREEN; x.fillRect(-160, -130, 320, 56); txt(x, 'TUESDAY', 0, -102, { size: 30, font: MONO, weight: 700, color: CREAM })
        txt(x, '3:00 PM', 0, -20, { size: 34, font: MONO, weight: 700, color: '#6b62a8' })
        txt(x, 'feel things', 0, 40, { size: 38 })
        if (lt > 1.2) txt(x, 'ATTENDED ✓', 0, 96, { size: 28, font: MONO, weight: 700, color: GREEN })
      })
    } },
  { sign: 'aquarius', cap: 'Looks at the stars. | It all *feels smaller.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SCOPE, SCOPE_C, 790, 980, 28 * pop01(t, P.t0 + 0.2, 0.35, 2))
      sparkles(x, t, 840, 640, P.t0 + 0.8, 8, 120, 0.4, [GOLD, BONE, SKYB])
      label(x, 790, 760, 'PROBLEM SIZE: TINY', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cries it all out. | *Wakes up new.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', tears: lt => lt > 1.4 ? 2 : 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sun(x, t, 800, lerp(1060, 820, ease.outCubic(prog(lt, 1.2, 1.9))), 80, pop01(t, P.t0 + 1.3, 0.4, 2), { face: true })
      label(x, 790, 640, 'TISSUES: 1 BOX', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1100, 'GOOD MORNING', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04 })
    } },
]

const F = makeFilm({
  id: 'r2a0279', key: 'E', accent: ACC, ending: 'group',
  title: 'Making peace | *with the past.*',
  cameos: CAMEOS,
  group: {
    cap: 'Not forgotten. | *Just lighter.*',
    draw(x, t, lt) { sun(x, t, 540, lerp(900, 700, ease.outCubic(prog(lt, 0.6, 2.4))), 70, pop01(t, t - lt + 0.6, 0.5, 1.8) * 0.9) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
