// r2t0063: THE SIGNS AS… v3, ROLL CALL, "The signs | at a fun run." (~54 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, each one's most extreme fun-run self. Ending: the group beat is the punchline.
//   0.0–3.6    "The signs | *at a fun run.*"
//   3.6–49.2   ♈ it's not a race (it's a race) · ♉ only here for the snack table · ♊ ran the whole way, talking
//              · ♋ brought orange slices for everyone · ♌ ran in slow motion for the photos · ♍ measured it: 4.8 K
//              · ♎ couldn't pick a pace · ♏ nobody saw them run, just appeared at the finish
//              · ♐ kept running past the finish · ♑ trained eight months for it · ♒ ran it backwards, on purpose
//              · ♓ met a dog at mile one, stayed (sobbing)
//  49.2        GROUP ending: "It was a fun run. | *Nobody had fun.*"  a FINISH banner over the group photo.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#7dffb0', RED = '#e23d4e', ORANGE = '#ff9a3a'

// ── props
const MEDAL = ['R.....R', 'RR...RR', '.RR.RR.', '..RRR..', '.YYYYY.', 'YYYWYYY', 'YYWYYYY', 'YYYYYYY', '.YYYYY.']
const MEDAL_C = { R: RED, Y: GOLD, W: '#fff6c8' }
const BANANA = ['........BK', '.......YY.', '......YYY.', '....YYYY..', 'YYYYYYY...', '.YYYYY....']
const BANANA_C = { Y: '#ffd23a', B: '#8a6a2e', K: '#5b4a1e' }
const COOKIE = ['..CCCCC..', '.CCDCCCC.', 'CCCCCCDCC', 'CDCCCCCCC', 'CCCCDCCCC', '.CCCCCDC.', '..CCCCC..']
const COOKIE_C = { C: '#e0a85a', D: '#5b2e1a' }
const ORANGE_S = ['OOOOOOOOO', '.OWOWOWO.', '..OOOOO..', '...OOO...']
const ORANGE_C = { O: ORANGE, W: '#ffd9a8' }
const CAMERA = [
  '..KKK.......',
  'KKKKKKKKKKKK',
  'KGGGGGGGGGGK',
  'KGGG.SS.GGGK',
  'KGG.SWWS.GGK',
  'KGG.SWWS.GGK',
  'KGGG.SS.GGGK',
  'KGGGGGGGGGGK',
  'KKKKKKKKKKKK',
]
const CAMERA_C = { K: INK, G: '#6b62a8', S: SKYB, W: '#ffffff' }
const DOG = [
  'BB......BB.',
  'BBB....BBB.',
  '.BWWWWWWB..',
  '.WKWWWWKW..',
  '.WWWNNWWW..',
  '..WWWWWW...',
  '...WWWW....',
  '..WWWWWWWW.',
  '.WWWWWWWWWW',
  '.WW.WW.WW.W',
]
const DOG_C = { B: '#8a5a3a', W: '#f0d8b0', K: INK, N: INK }

// a pull-up banner: FINISH, with a chequered stripe
function finish(x, cx, cy, k, w = 380) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = BONE; x.fillRect(-w / 2 - 10, -50, 12, 320); x.fillRect(w / 2 - 2, -50, 12, 320)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -66, w + 12, 116)
  for (let i = 0; i < w / 20; i++) for (let j = 0; j < 2; j++) { x.fillStyle = (i + j) % 2 ? INK : '#fff4e2'; x.fillRect(-w / 2 + i * 20, 22 + j * 14, 20, 14) }
  x.fillStyle = GOLD; x.fillRect(-w / 2, -60, w, 82)
  x.fillStyle = INK; x.font = `800 54px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('FINISH', 0, -18)
  x.restore()
}
// speed lines behind a runner
function speed(x, cx, cy, a = 1, dir = -1) {
  x.save(); x.globalAlpha = 0.6 * a; x.fillStyle = BONE
  for (let i = 0; i < 5; i++) x.fillRect(cx + dir * (60 + (i % 2) * 30), cy - 80 + i * 40, dir * 110, 8)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'It’s not a race. | Aries: *it’s a race.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -150 }, hops: [0.4, 0.8, 1.2],
    back(x, t, lt, P, F) { speed(x, F.x - 100, F.cy, clamp(lt - 0.3)) },
    front(x, t, lt, P) {
      drawBits(x, MEDAL, MEDAL_C, 800, 840, 22 * pop01(t, P.t0 + 1.2, 0.35, 2))
      label(x, 800, 640, 'GOLD OR NOTHING', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 34, bg: RED, color: '#fff4e2', rot: 0.04 })
      sparkles(x, t, 800, 840, P.t0 + 1.3, 7, 150, 0.4)
    } },
  { sign: 'taurus', cap: 'Ran straight | *to the snack table.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      x.save(); x.fillStyle = INK; x.fillRect(620 - 6, 990 - 6, 352, 30); x.fillStyle = '#c98f2a'; x.fillRect(620, 990, 340, 18); x.restore()
      drawBits(x, BANANA, BANANA_C, 700, 950, 14 * k)
      drawBits(x, COOKIE, COOKIE_C, 800, 950, 12 * k)
      drawBits(x, COOKIE, COOKIE_C, 890, 950, 12 * k)
      label(x, 790, 700, 'MILE 0: SNACKS', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'gemini', cap: 'Ran the whole way. | *Talking.*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      const W = ['so anyway—', 'and THEN—', 'wait, did I—', 'ok so mile 2—']
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.45))
      bubble(x, 790, 760, W[n], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 790, 980, `WORDS: ${(n + 1) * 900}`, pop01(t, P.t0 + 0.8, 0.3, 2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Brought orange slices. | *For everyone.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      for (let i = 0; i < 6; i++) drawBits(x, ORANGE_S, ORANGE_C, 700 + (i % 3) * 90, 840 + Math.floor(i / 3) * 80, 14 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2))
      label(x, 790, 680, 'HYDRATE, BABY', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: ORANGE, rot: 0.04 })
      label(x, 790, 1080, 'SERVES: 400', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Ran in slow motion. | *For the photos.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.6],
    front(x, t, lt, P) {
      drawBits(x, CAMERA, CAMERA_C, 800, 860, 20 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: -0.08 })
      const fl = 1 - prog(lt, 0.9, 1.3)
      if (lt > 0.9 && fl > 0) { x.save(); x.globalAlpha = 0.25 * fl; x.fillStyle = '#fff'; x.fillRect(110, 480, 860, 740); x.restore() }
      label(x, 800, 1080, 'TAKE 14', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Measured the course. | *It’s 4.8K.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 720, '5K', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 90, bg: BONE, rot: -0.03 })
      if (lt > 1.0) { x.save(); x.strokeStyle = RED; x.lineWidth = 12; x.beginPath(); x.moveTo(700, 760); x.lineTo(880, 680); x.stroke(); x.restore() }
      label(x, 800, 920, '4.8K. RUDE.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 44, bg: RED, color: '#fff4e2', rot: 0.05 })
      label(x, 790, 1080, 'EMAIL SENT', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.04 })
    } },
  { sign: 'libra', cap: 'Couldn’t pick a pace. | *Tried all of them.*', mood: lt => lt > 1.6 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 }, hops: [0.3, 1.2],
    front(x, t, lt, P) {
      const W = ['JOG', 'WALK', 'SPRINT', 'SKIP']
      const n = Math.floor(Math.max(0, lt - 0.3) / 0.4) % 4
      label(x, 790, 800, `PACE: ${W[n]}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 46, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1000, 'hmm. or—', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Nobody saw them run. | *Just appeared at the finish.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    back(x, t, lt, P) { finish(x, 790, 760, pop01(t, P.t0 + 0.2, 0.35, 2), 300) },
    front(x, t, lt, P) {
      bubble(x, 790, 1060, 'wait… WHEN?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, col: SKYB, tail: 'br' })
    } },
  { sign: 'sagittarius', cap: 'Crossed the finish. | *Kept going.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.5, 1.0, 1.5, 2.0],
    back(x, t, lt, P, F) { speed(x, F.x - 100, F.cy, clamp(lt - 0.5)) },
    front(x, t, lt, P) {
      finish(x, lerp(800, 1000, ease.inCubic(prog(lt, 0.8, 2.0))), 760, pop01(t, P.t0 + 0.2, 0.35, 2) * (1 - prog(lt, 1.5, 2.0)), 260)
      label(x, 760, 1080, 'MILE 9 AND COUNTING', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'capricorn', cap: 'Trained eight months. | *For the fun run.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const d = Math.min(240, Math.floor(clamp((lt - 0.3) / 1.2) * 240))
      label(x, 790, 760, `TRAINING DAY ${d}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 38, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 920, 'PLAN B: ALSO RUN', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: BONE, rot: -0.04 })
    } },
  { sign: 'aquarius', cap: 'Ran it backwards. | *On purpose.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [-1, 0], star: { x: -170 }, hops: [0.4, 0.9, 1.4],
    back(x, t, lt, P, F) { speed(x, F.x + 100, F.cy, clamp(lt - 0.3), 1) },
    front(x, t, lt, P) {
      label(x, 800, 760, '← START', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 40, bg: SKYB, rot: -0.04 })
      label(x, 800, 920, 'TRENDSETTER', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: LAV, rot: 0.04 })
    } },
  { sign: 'pisces', cap: 'Met a dog at mile one. | *Stayed.*', mood: lt => lt > 0.9 ? 'heart' : 'wide', tears: 2, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, DOG, DOG_C, 790, 930, 20 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: Math.sin(t * 6) * 0.03 })
      label(x, 790, 700, 'BEST FRIEND FOUND', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: PINK, rot: -0.04 })
      hearts(x, t, 790, 880, P.t0 + 1.2, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 9 })
    } },
]

const F = makeFilm({
  id: 'r2t0063', key: 'G', accent: ACC, ending: 'group',
  title: 'The signs | *at a fun run.*',
  cameos: CAMEOS,
  group: {
    cap: 'It was a fun run. | *Nobody had fun.*',
    draw(x, t, lt) { finish(x, 540, 640, pop01(t, t - lt + 0.8, 0.4, 2), 520) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
