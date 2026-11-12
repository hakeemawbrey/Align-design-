// r2t0417: star_talk, ROLLCALL, "Sightseeing with | every sign." (~59 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, each one's most extreme version of itself on a sightseeing day. Ending: lesson.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ raced to the top, forgot to look · ♉ came for the views, stayed for the pretzel · ♊ joined four tour groups
//              · ♋ souvenirs for everyone they've ever met · ♌ became the landmark · ♍ corrected the tour guide
//              · ♎ 300 photos of one fountain · ♏ found the secret viewpoint · ♐ missed the bus home, moved there
//              · ♑ pop quiz at five · ♒ rated the pigeons · ♓ one sunset, happy tears
//  49.2        "Same city. | *Twelve trips.*"
//  52.4        LESSON UNLOCKED: "See it your way. | *That’s the trip.*"  MEMORIES: SAVED
//  58.3        "Wish you were | *here.*"  A postcard drifts in.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', WOOD = '#c98f2a', ACC = '#ffb36b'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
const ST = { x: -170 }

// ── props
const TOWER = ['....K....', '....K....', '...KKK...', '...K.K...', '..KK.KK..', '..K...K..', '..KKKKK..', '.KK...KK.', '.K.....K.', 'KKKKKKKKK', 'K.......K']
const PRETZEL = ['.PPP.PPP.', 'P...P...P', 'P..P.P..P', '.PP...PP.', '..P...P..', '.P.PPP.P.', '..PP.PP..']
const FLAG = ['KFFFF', 'KFFFF', 'KFFF.', 'K....', 'K....', 'K....']
const BAG = ['..K..K..', '.K....K.', 'BBBBBBBB', 'BBBBBBBB', 'BBBBBBBB', 'BBBBBBBB', 'BBBBBBBB']
const FOUNTAIN = ['....W....', '..W.W.W..', '.W..W..W.', 'W...W...W', '....S....', 'SSSSSSSSS', '.SSSSSSS.']
const BUS = ['YYYYYYYYYYYY', 'YWWYWWYWWYYY', 'YWWYWWYWWYWY', 'YYYYYYYYYYYY', 'YYYYYYYYYYYY', '.KK......KK.']
const PIGEON = ['..GG....', '.GWKG...', 'GGGGGGG.', '.GGGGGGG', '..GGGGG.', '...O.O..']
const SUN = ['..YYYYY..', '.YYYYYYY.', 'YYYYYYYYY', 'YYYYYYYYY', 'OOOOOOOOO', 'RRRRRRRRR']

/** a statue plinth under the star, a little brass plaque on the front */
function plinth(x, cx, cy, k, text) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, 0, 300, 170); x.fillStyle = '#b9b0a0'; x.fillRect(-142, 8, 284, 154)
  x.fillStyle = '#9a9184'; x.fillRect(-142, 8, 284, 24)
  x.fillStyle = INK; x.fillRect(-100, 66, 200, 60); x.fillStyle = GOLD; x.fillRect(-94, 72, 188, 48)
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 97)
  x.restore()
}
/** a folded map with a dashed route ending at an X */
function map(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-182, -152, 364, 304); x.fillStyle = '#ead7a8'; x.fillRect(-174, -144, 348, 288)
  x.fillStyle = '#d9c28e'; x.fillRect(-60, -144, 6, 288); x.fillRect(56, -144, 6, 288)
  x.strokeStyle = '#8a4a2e'; x.lineWidth = 6; x.setLineDash([14, 12]); x.beginPath(); x.moveTo(-140, 110)
  const p = clamp((lt - 0.4) / 1.0); x.bezierCurveTo(-60, -40, 40, 120 * p, -140 + 270 * p, 110 - 200 * p); x.stroke(); x.setLineDash([])
  if (lt > 1.4) { x.strokeStyle = RED; x.lineWidth = 10; x.beginPath(); x.moveTo(110, -110); x.lineTo(150, -70); x.moveTo(150, -110); x.lineTo(110, -70); x.stroke() }
  x.restore()
}
/** a postcard with a little tower and "wish you were here" lines */
function postcard(x, cx, cy, k, rot = -0.06) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-196, -116, 404, 248)
  x.fillStyle = INK; x.fillRect(-208, -128, 416, 256); x.fillStyle = CREAM; x.fillRect(-200, -120, 400, 240)
  x.fillStyle = '#8fd4ff'; x.fillRect(-184, -104, 180, 208); x.fillStyle = '#ffb36b'; x.fillRect(-184, 40, 180, 64)
  drawBits(x, TOWER, { K: INK }, -94, -20, 12)
  x.fillStyle = '#b9b0a0'; for (let i = 0; i < 4; i++) x.fillRect(20, -60 + i * 40, 150, 8)
  x.fillStyle = PINK; x.fillRect(130, -104, 50, 60)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Raced to the top. | *Forgot to look.*', mood: 'sparkle', star: { x: -170, y: -60, s: 260 }, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      drawBits(x, TOWER, { K: '#9aa5c4' }, 790, 900, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 640, 'TOP: REACHED', pop01(t, P.t0 + 0.8, 0.3, 2.4), GOLD, -0.04, 32)
      L(x, 790, 1120, 'VIEW: SKIPPED', pop01(t, P.t0 + 1.5, 0.3, 2.4), RED, 0.04, 34)
    } },
  { sign: 'taurus', cap: 'Came for the views. | Stayed for *the pretzel.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PRETZEL, { P: '#c98f2a' }, 790, 870, 24 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: 0.06 })
      sparkles(x, t, 790, 870, P.t0 + 0.6, 7, 170, 0.3)
      L(x, 790, 1100, 'BEST SIGHT HERE', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'gemini', cap: 'Joined *four tour groups.* | At once.', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const COLS = [RED, MINT, SKYB, GOLD]
      COLS.forEach((c, i) => drawBits(x, FLAG, { K: INK, F: c }, 660 + i * 90, 820 + (i % 2) * 70 + Math.sin(t * 5 + i) * 10, 18 * pop01(t, P.t0 + 0.3 + i * 0.25, 0.3, 2)))
      bubble(x, 790, 640, 'wait for me!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 790, 1110, 'GROUPS: A B C D', pop01(t, P.t0 + 1.6, 0.3, 2.4), LAV, 0.04, 30)
    } },
  { sign: 'cancer', cap: 'Souvenirs for | *everyone they’ve met.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const COLS = [PINK, MINT, GOLD, SKYB, LAV, ORANGE]
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.3) * 6)
      for (let i = 0; i < n; i++) drawBits(x, BAG, { K: INK, B: COLS[i] }, 680 + (i % 3) * 110, 1040 - Math.floor(i / 3) * 120, 12)
      L(x, 790, 660, 'BAGS: 31', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, -0.05, 40)
    } },
  { sign: 'leo', cap: 'Didn’t visit the landmark. | *Became one.*', mood: 'sparkle', star: { x: -170, y: -90, s: 260 }, hops: [1.3],
    back(x, t, lt, P) { plinth(x, 370, 930, pop01(t, P.t0 + 0.3, 0.35, 2), 'LEO, 2026') },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'photo? | one each.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 790, 960, 'NEW LANDMARK', pop01(t, P.t0 + 1.5, 0.3, 2.4), ORANGE, 0.04, 34)
      sparkles(x, t, 370, 800, P.t0 + 1.3, 8, 170, 0.5)
    } },
  { sign: 'virgo', cap: 'Corrected the | *tour guide.* Twice.', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 830, 960, 170 * k, { mood: lt > 1.4 ? 'wide' : 'happy', look: [-1, 0], seed: 14, glyph: false })
      bubble(x, 760, 650, 'actually, | it was 1842', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 36, col: MINT, tail: 'bl' })
      L(x, 790, 1120, 'SOURCES: CITED', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'libra', cap: '300 photos | of *one fountain.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, FOUNTAIN, { W: SKYB, S: '#b9b0a0' }, 790, 920, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = Math.min(300, Math.floor(clamp((lt - 0.4) / 1.6) * 300))
      L(x, 790, 650, `PHOTO ${n}/300`, pop01(t, P.t0 + 0.4, 0.3, 2), PINK, -0.04, 34)
      if (Math.floor(t * 4) % 2 === 0 && lt > 0.5 && lt < 2.1) { x.save(); x.fillStyle = 'rgba(255,255,255,0.18)'; x.fillRect(110, 470, 860, 760); x.restore() }
    } },
  { sign: 'scorpio', cap: 'Skipped the queue. | Found the *secret view.*', mood: lt => lt > 1.3 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      map(x, 790, 870, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      L(x, 790, 1110, 'TELL NO ONE', pop01(t, P.t0 + 1.6, 0.3, 2.4), RED, 0.04, 34)
    } },
  { sign: 'sagittarius', cap: 'Missed the bus home. | *Moved there.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const go = ease.inCubic(prog(lt, 0.5, 1.2))
      drawBits(x, BUS, { Y: '#ffe76a', W: SKYB, K: INK }, lerp(790, 900, go), 980, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { alpha: 1 - go })
      L(x, 790, 700, 'NEW ADDRESS!', pop01(t, P.t0 + 1.3, 0.3, 2.6), MINT, -0.05, 40)
      sparkles(x, t, 790, 700, P.t0 + 1.35, 7, 170, 0.2)
    } },
  { sign: 'capricorn', cap: 'Made it *educational.* | Pop quiz at five.', mood: lt => lt > 1.3 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'write this down', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 790, 880, 'QUIZ: 5 PM', pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD, 0.04, 46)
      L(x, 790, 1060, 'NO PHONES', pop01(t, P.t0 + 1.6, 0.3, 2.4), RED, -0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Ignored the sights. | Rated *the pigeons.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PIGEON, { G: '#9aa5c4', W: '#fff', K: INK, O: ORANGE }, 790, 940, 20 * pop01(t, P.t0 + 0.3, 0.3, 2), { sx: Math.floor(t * 2) % 2 ? 1 : -1 })
      L(x, 790, 700, 'PIGEON #7: 10/10', pop01(t, P.t0 + 1.0, 0.3, 2.4), SKYB, -0.04, 32)
      L(x, 790, 1120, 'BEST PART OF TRIP', pop01(t, P.t0 + 1.7, 0.3, 2.4), MINT, 0.04, 28)
    } },
  { sign: 'pisces', cap: 'Saw one sunset. | Cried *for an hour.*', mood: 'heart', tears: lt => lt > 0.9 ? 3 : 2, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { drawBits(x, SUN, { Y: '#ffe76a', O: ORANGE, R: '#ff7a6b' }, 790, lerp(880, 960, clamp(lt / 2.4)), 26 * pop01(t, P.t0 + 0.2, 0.4, 1.8)) },
    front(x, t, lt, P) {
      L(x, 790, 1110, 'SO BEAUTIFUL', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, -0.04, 36)
      hearts(x, t, 790, 760, P.t0 + 1.3, { n: 5, life: 1.6, spread: 220, cell: 7, seed: 9 })
    } },
]

const F = makeFilm({
  id: 'r2t0417', key: 'E', accent: ACC, ending: 'lesson',
  title: 'Sightseeing with | *every sign.*',
  cameos: CAMEOS,
  group: { cap: 'Same city. | *Twelve trips.*' },
  lesson: { text: 'See it your way. | *That’s the trip.*', chip: 'MEMORIES: SAVED' },
  last: {
    text: 'Wish you were | *here.*',
    draw(x, t, lt) {
      const t0 = t - lt
      postcard(x, 540, lerp(740, 700, ease.outCubic(clamp(lt / 1.2))), pop01(t, t0 + 0.8, 0.4, 2) * 0.62)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
