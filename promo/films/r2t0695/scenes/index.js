// r2t0695: star_talk, BELIKE (twelve signs), "New word? | Zodiacs *be like.*" (signs3kit, lofi · F).
// Aries said "ubiquitous" nine times by lunch · Taurus learned "charcuterie", built one · Gemini learned it at 9, taught
// a class at 10 · Cancer named a houseplant after it · Leo put it in their bio · Virgo corrected your pronunciation
// · Libra wrote it in calligraphy · Scorpio won't tell you what it means · Sagittarius learned it abroad, won't stop
// saying so · Capricorn put it on the résumé · Aquarius invented three more · Pisces learned "petrichor", cried at rain.
// Ending: callback. "Aries, day two: | *still saying it.*" (Aries' counter comes back, way higher).
import { makeFilm, sparkles, hearts, bubble, notes, label, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, SERIF } from '../../signs3kit.js'
import { L, sheet, phone, bits, friend, rain, RED, CREAM, STEEL, WOOD, NIGHT, PLUM, clamp, lerp, ease, prog } from './props.js'

const ACC = '#b98cff', ST = { x: -180 }
const BOARD = ['WWWWWWWWWWWWWW', 'WRRYYWCCCWGGRW', 'WRRYYWCCCWGGRW', 'WWWWWWWWWWWWWW', '..W........W..']
const POT = ['..G.GG.G..', '.GGLGGLGG.', 'GGLGGGGLGG', '.GGGLGGGG.', '..TTTTTT..', '..TTTTTT..', '...TTTT...']

function profile(x, t, cx, cy, k, bio) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -172, 300, 360)
  x.fillStyle = INK; x.fillRect(-156, -186, 312, 372)
  x.fillStyle = PLUM; x.fillRect(-148, -178, 296, 356)
  x.fillStyle = NIGHT; x.fillRect(-132, -162, 264, 200)
  x.restore()
  signChar(x, t, 'leo', cx, cy - 72 * k, 150 * k, { mood: 'sparkle', seed: 71, glyph: false, glow: 0.8 })
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = '#ffb34a'; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♌︎ LEO · BIO', 0, 70)
  x.fillStyle = BONE; x.font = `italic 500 34px ${SERIF}`; x.fillText(bio, 0, 124)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Said “ubiquitous” | *nine times by lunch.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'ubiquitous!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'bl' })
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.4) * 8)
      L(x, 800, 950, `COUNT: ${n}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), RED, 0.04, 44)
    } },
  { sign: 'taurus', cap: 'Learned “charcuterie.” | *Built one immediately.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BOARD, { W: '#c98f5a', R: '#d9506a', Y: '#ffd23a', C: CREAM, G: '#4fbf6a' }, 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 660, 'SAID IT: ONCE', pop01(t, P.t0 + 0.8, 0.3, 2.2), STEEL, -0.04, 30)
      L(x, 800, 1070, 'ATE IT: ALL', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  { sign: 'gemini', cap: 'Learned it at 9. | *Taught a class* at 10.', mood: lt => lt > 1.2 ? 'sparkle' : 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 280, head: 'WORDS 101', headBg: '#ffe76a', headInk: INK, lines: ['professor:', 'me (since 9am)'], size: 32 })
      L(x, 800, 1070, 'SEATS: FULL', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: 'cancer', cap: 'Named a houseplant | *after it.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, POT, { G: '#4fbf6a', L: '#8fdc6a', T: '#c0603a' }, 800, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1070, 'MEET: SERENDIPITY', pop01(t, P.t0 + 1.0, 0.3, 2.2), PINK, -0.04, 30)
      hearts(x, t, 800, 760, P.t0 + 1.4, { n: 4, life: 1.4, spread: 140, cell: 6, seed: 2 })
    } },
  { sign: 'leo', cap: 'Put it | *in their bio.*', mood: 'sparkle', star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      profile(x, t, 800, 840, pop01(t, P.t0 + 0.2, 0.35, 2), '“ethereal.”')
      L(x, 800, 1090, 'NEW MATCHES: MANY', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: 'virgo', cap: 'Corrected *your* | pronunciation.', mood: lt => lt > 1.3 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'it’s “pa-TEEN-uh”', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 800, 900, 'NOT “PAT-in-uh”', pop01(t, P.t0 + 1.0, 0.3, 2.2), RED, -0.04, 32)
      L(x, 800, 1060, 'YOU’RE WELCOME', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: 'libra', cap: 'Wrote it out | in *calligraphy.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      sheet(x, 800, 840, k, { w: 340, h: 240, lines: [], bg: CREAM })
      if (k > 0.5) { x.save(); x.translate(800, 840); x.rotate(-0.04); x.fillStyle = INK; x.font = `italic 500 64px ${SERIF}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        const w = 'Luminous', n = Math.ceil(w.length * clamp((lt - 0.4) / 1.0)); x.fillText(w.slice(0, n), 0, 0); x.restore() }
      L(x, 800, 1070, 'FRAMED. OBVIOUSLY.', pop01(t, P.t0 + 1.6, 0.3, 2.2), PINK, 0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Knows the word. | *Won’t explain it.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'that’s very… liminal.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 800, 900, 'what’s that mean?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, col: LAV, tail: 'br' })
      L(x, 800, 1070, 'NO COMMENT', pop01(t, P.t0 + 1.6, 0.3, 2.4), '#ff5a7a', -0.04, 34)
    } },
  { sign: 'sagittarius', cap: 'Learned it abroad. | *Won’t stop saying so.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'PLANE', 800, 680, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 })
      bubble(x, 800, 880, 'well, in Lisbon…', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 800, 1070, 'TIMES MENTIONED: ALL', pop01(t, P.t0 + 1.5, 0.3, 2.2), '#ffb34a', 0.04, 28)
    } },
  { sign: 'capricorn', cap: 'Put it | *on the résumé.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 330, head: 'RÉSUMÉ', headBg: STEEL, headInk: INK, lines: ['skills:', '· punctual', '· “synergy”'], size: 32, align: 'left', progress: clamp((lt - 0.3) / 1.0) })
      L(x, 800, 1090, 'HIRED (PROBABLY)', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Learned one word. | *Invented three more.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 660, 'flumbix', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
      bubble(x, 800, 820, 'zorpish', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
      bubble(x, 800, 980, 'blimtastic', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Learned “petrichor.” | *Cried about rain.*', tears: lt => lt > 0.8 ? 3 : 2, mood: 'wide', look: [0, -1], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CLOUD', 800, 700, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      rain(x, t, 800, 740, { w: 240, h: 240, n: 9, alpha: pop01(t, P.t0 + 0.5, 0.3, 2) })
      L(x, 800, 1070, 'IT SMELLS LIKE RAIN', pop01(t, P.t0 + 1.2, 0.3, 2.2), SKYB, 0.04, 28)
    } },
]

const F = makeFilm({
  id: 'r2t0695', key: 'F', accent: ACC, ending: 'callback',
  title: 'New word? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'New word. | *Whole personality.*', moods: ['sparkle', 'heart', 'wink', 'heart', 'sparkle', 'squint', 'heart', 'squint', 'sparkle', 'neutral', 'sparkle', 'wide'] },
  last: {
    text: 'Aries, day two: | *still saying it.*',
    draw(x, t, lt) {
      const kk = pop01(t, t - lt + 0.6, 0.4, 2)
      if (kk > 0.01) signChar(x, t, 'aries', 360, 1150, 300 * kk, { mood: 'sparkle', seed: 52, glyph: false, hops: [t - lt + 1.0, t - lt + 1.8] })
      bubble(x, 720, 940, 'ubiquitous!', pop01(t, t - lt + 1.0, 0.25, 2.2), { size: 54, tail: 'bl' })
      const n = 9 + Math.floor(clamp((lt - 1.2) / 1.8) * 75)
      label(x, 720, 1180, `COUNT: ${n}`, pop01(t, t - lt + 1.2, 0.3, 2.2), { size: 56, bg: RED, color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
