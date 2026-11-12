// r2t0347: THE SIGNS AS… v3, BELIKE, "Zodiacs faking | the lyrics *be like.*" (topic: pretending to know the words;
// signs3kit social cut, music: lofi · E). Ending: group ("Nobody knew the words. | *Best night ever.*").
//   ♈ sang the chorus first, wrong song · ♉ hums every verse, belts one line · ♊ wrote new lyrics, better ones
//   · ♋ knows one word, sings it with feeling · ♌ didn't know a word, took a bow · ♍ faked it once, studied all night
//   · ♎ lip-synced so pretty nobody noticed · ♏ mouthed "watermelon", intensely · ♐ wrong words, loudest in the car
//   · ♑ a laminated cheat sheet · ♒ knows the words to a remix nobody's heard · ♓ misheard the words, cried anyway
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', STEEL = '#9aa5c4', ACC = '#ff9ad5'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 34, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, color, font: MONO, weight: 700 })
const MIC = ['.GGGG.', 'GgGGgG', 'GGgGGG', 'GgGGgG', '.GGGG.', '..KK..', '..KK..', '..KK..', '..KK..', '..KK..']
const MIC_C = { G: '#c9c9d8', g: '#8a8aa0', K: '#2a2350' }
const CAR = ['...KKKKKK....', '..KWWKWWWK...', '.KRRRRRRRRRK.', 'KRRRRRRRRRRRK', 'KRRRRRRRRRRRK', '.KKK.....KKK.', '.KTK.....KTK.']
/** a sheet of paper with lyric lines, a few highlighted */
function sheet(x, cx, cy, k, { rot = 0.05, hi = 0, laminated = false, title = 'LYRICS' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-130, -166, 276, 352)
  if (laminated) { x.fillStyle = 'rgba(200,240,255,0.55)'; x.fillRect(-158, -194, 316, 388) }
  x.fillStyle = INK; x.fillRect(-148, -184, 296, 368); x.fillStyle = BONE; x.fillRect(-140, -176, 280, 352)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -140)
  for (let i = 0; i < 7; i++) {
    const y = -90 + i * 40, w = i % 3 === 2 ? 150 : 220
    if (i < hi) { x.fillStyle = '#ffe76a'; x.fillRect(-114, y - 12, w + 8, 26) }
    x.fillStyle = STEEL; x.fillRect(-110, y - 6, w, 12)
  }
  if (laminated) { x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(-150, -186, 50, 380) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Sang the chorus first. | *Wrong song.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', star: { x: -170 }, hops: [0.4, 0.8],
    front(x, t, lt, P, F) {
      drawBits(x, MIC, MIC_C, F.x + 150, F.cy + 20, 12 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.35 })
      notes(x, t, F.x + 180, F.cy - 80, { n: 4, cell: 7, col: RED, seed: 1 })
      L(x, 790, 680, 'SONG: SLOW BALLAD', pop01(t, P.t0 + 0.9, 0.3, 2.2), BONE, 0.05, 30)
      L(x, 790, 1060, 'WRONG SONG', pop01(t, P.t0 + 1.4, 0.3, 2.4), RED, -0.05, 44, BONE)
    } },
  { sign: 'taurus', cap: 'Hums every verse. | *Belts one line.*', mood: lt => lt > 1.2 ? 'wide' : 'sleepy', star: { x: -170 },
    front(x, t, lt, P) {
      if (lt < 1.2) bubble(x, 780, 760, 'mmm hmm | mm mmm…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, col: STEEL, tail: 'bl' })
      else { bubble(x, 790, 760, 'BAAABY!', pop01(t, P.t0 + 1.55, 0.25, 2.6), { size: 64, col: GOLD, tail: 'bl' }); sparkles(x, t, 790, 760, P.t0 + 1.6, 8, 200, 0.2) }
      L(x, 790, 1080, 'WORDS KNOWN: 1', pop01(t, P.t0 + 1.8, 0.3, 2.2), BONE, 0.04, 32)
    } },
  { sign: 'gemini', cap: 'Made up new lyrics. | *Better ones.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'what’s your | sign, baby?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 790, 1060, 'NOT THE LYRICS', pop01(t, P.t0 + 1.4, 0.3, 2.4), '#ffd23a', -0.04, 34)
    } },
  { sign: 'cancer', cap: 'Knows one word. | *Sings it with feeling.*', mood: lt => lt > 0.8 ? 'heart' : 'happy', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 740, 'LOOOOVE…', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 56, col: '#c9e8ff', tail: 'bl' })
      hearts(x, t, 330, 760, P.t0 + 0.8, { n: 6, life: 1.8, spread: 160, cell: 7, seed: 2 })
      L(x, 790, 1040, 'FOR MY MATCH ♡', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, 0.04, 34)
    } },
  { sign: 'leo', cap: 'Didn’t know a word. | *Took a bow anyway.*', mood: lt => lt > 1.3 ? 'wink' : 'sparkle', star: { x: -150 }, squash: lt => lt > 1.2 && lt < 2.0 ? 0.14 : 0,
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) { x.save(); x.globalAlpha = 0.22 * clamp(k); x.fillStyle = '#fff1c8'; x.beginPath(); x.moveTo(330, 470); x.lineTo(460, 470); x.lineTo(560, 1160); x.lineTo(160, 1160); x.fill(); x.restore() }
    },
    front(x, t, lt, P) {
      L(x, 790, 700, 'BRAVO!!', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.05, 50)
      bubble(x, 790, 920, '(said by Leo)', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 32, tail: 'bl' })
      sparkles(x, t, 400, 800, P.t0 + 1.3, 8, 190, 0.6)
    } },
  { sign: 'virgo', cap: 'Faked it once. | *Studied the lyrics all night.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      sheet(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { hi: Math.floor(clamp((lt - 0.4) / 1.2) * 7) })
      L(x, 800, 640, '3:12 AM', pop01(t, P.t0 + 0.5, 0.3, 2), LAV, -0.05, 40)
      L(x, 800, 1120, 'NEVER AGAIN', pop01(t, P.t0 + 1.7, 0.3, 2.4), MINT, 0.04, 34)
    } },
  { sign: 'libra', cap: 'Lip-synced so pretty | *nobody noticed.*', mood: lt => Math.floor(lt * 3) % 2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      drawBits(x, MIC, MIC_C, F.x + 150, F.cy + 20, 11 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.3 })
      sparkles(x, t, F.x, F.cy, P.t0 + 0.6, 8, 170, 0.1, [PINK, BONE, LAV])
      L(x, 800, 720, 'AUDIO: 0%', pop01(t, P.t0 + 0.8, 0.3, 2.2), STEEL, 0.05, 36)
      L(x, 800, 1040, 'VIBES: 100%', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, -0.04, 40)
    } },
  { sign: 'scorpio', cap: 'Mouthed “watermelon.” | *Intensely.*', mood: lt => lt > 0.9 ? 'squint' : 'neutral', look: [-1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 800, 760, 'water… | melon…', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 46, col: LAV, tail: 'bl' })
      L(x, 800, 1020, 'EYE CONTACT: 100%', pop01(t, P.t0 + 1.3, 0.3, 2.4), RED, 0.04, 30, BONE)
    } },
  { sign: 'sagittarius', cap: 'Wrong words. | *Loudest in the car.*', mood: 'sparkle', star: { x: -40, y: -170, s: 230 }, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      drawBits(x, CAR, { K: INK, W: SKYB, R: '#b06cff', T: STEEL }, 540 + Math.sin(t * 9) * 4, 960, 34 * pop01(t, P.t0 + 0.1, 0.3, 2))
      notes(x, t, 760, 780, { n: 5, cell: 8, col: '#b06cff', seed: 4 })
      L(x, 800, 610, 'VOLUME: MAX', pop01(t, P.t0 + 0.9, 0.3, 2.4), GOLD, 0.05, 38)
    } },
  { sign: 'capricorn', cap: 'Made a lyric cheat sheet. | *Laminated.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      sheet(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { laminated: lt > 0.9, hi: 2, title: 'CHEAT SHEET', rot: -0.04 })
      if (lt > 0.9) sparkles(x, t, 800, 880, P.t0 + 0.9, 7, 200, 0.2, [SKYB, BONE, MINT])
      L(x, 800, 1110, 'WATERPROOF ✓', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 34)
    } },
  { sign: 'aquarius', cap: 'Knows the words | *to a remix nobody’s heard.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 800, 730, 'it’s the | B-side', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 800, 960, 'PLAYS: 4', pop01(t, P.t0 + 1.1, 0.3, 2.2), SKYB, 0.05, 40)
      L(x, 800, 1080, '(ALL AQUARIUS)', pop01(t, P.t0 + 1.6, 0.3, 2.2), BONE, -0.04, 28)
    } },
  { sign: 'pisces', cap: 'Misheard the words. | *Cried anyway.*', mood: lt => lt > 0.9 ? 'heart' : 'wide', tears: lt => lt > 0.9 ? 3 : 1, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 730, '“dancing with | a potato”?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 800, 1080, 'STILL BEAUTIFUL', pop01(t, P.t0 + 1.6, 0.3, 2.4), SKYB, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0347', key: 'E', accent: ACC, ending: 'group',
  title: 'Zodiacs faking | the lyrics *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Zero words known. | *Best night ever.*',
    moods: ['sparkle', 'wide', 'wink', 'heart', 'sparkle', 'squint', 'happy', 'squint', 'sparkle', 'neutral', 'wink', 'heart'],
    draw(x, t, lt) { notes(x, t, 540, 1050, { n: 6, cell: 8, col: ACC, alpha: clamp(lt / 0.6), seed: 7 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
