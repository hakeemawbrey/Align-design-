// r2t0369: THE SIGNS AS… v3, ROLLCALL, "The signs on | *a stargazing date.*" (~63 s vertical, signs3kit social cut, music: lofi · D)
// The format look lives in ../../signs3kit.js. Ending: card (lesson + last line over the match card).
//   0.0–3.6    "The signs on | *a stargazing date.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one stargazing date per sign (3.8 s each), pushed to the extreme:
//              ♈ named a star after you in minute one · ♉ brought a blanket and a four-course picnic
//              · ♊ turned every constellation into gossip · ♋ brought you a jacket, and a spare, and a spare
//              · ♌ ignored the stars, is the star · ♍ corrected your constellation (that's not Orion)
//              · ♎ spent the date finding your best angle · ♏ didn't look up once, only at you
//              · ♐ hiked you up a mountain at 3 a.m. · ♑ brought a planet itinerary (Saturn: 9:42 p.m.)
//              · ♒ explained black holes, hour three · ♓ saw a shooting star, sobbed with joy
//  49.2        "Nobody looked | *at the sky.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "The best view | *is the company.*"  DATE: STELLAR
//  58.3        "Scorpio found | *their star.*" over the match card: Scorpio + Leo (only looked at you, is the star).
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', WOOD = '#a65a37'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })

// ── props
const STAR5 = ['...Y...', '..YYY..', 'YYYWYYY', '.YYYYY.', '..YYY..', '.YY.YY.', 'Y.....Y']
const BASKET = ['..KKKKKKKK..', '.K........K.', 'K..........K', 'WWWWWWWWWWWW', 'WRWRWRWRWRWW', 'BBBBBBBBBBBB', 'BWBBWBBWBBWB', 'BBBBBBBBBBBB', '.BBBBBBBBBB.']
const JACKET = ['.JJ...JJ.', 'JJJJ.JJJJ', 'JJJJJJJJJ', 'JJJYJJJJJ', '.JJJJJJJ.', '.JJJYJJJ.', '.JJJJJJJ.', '.JJJJJJJ.']
const TELESCOPE = ['..........GG', '........GGGG', '......GGGGG.', '....GGGGG...', '..GGGGG.....', '.GGGG.......', 'GGG.........', '....K.......', '...K.K......', '..K...K.....', '.K.....K....']
const MOUNTAIN = ['......W......', '.....WWW.....', '....GGGGG....', '...GGGGGGG...', '..GGGGGGGGG..', '.GGGGGGGGGGG.', 'GGGGGGGGGGGGG']
/** a little constellation: points + lines drawn up to p */
function constellation(x, pts, p, { col = 'rgba(239,230,214,0.8)', dot = GOLD } = {}) {
  const n = p * pts.length
  x.save(); x.strokeStyle = col; x.lineWidth = 4; x.beginPath(); pts.forEach(([px, py], i) => { if (i < n) i ? x.lineTo(px, py) : x.moveTo(px, py) }); x.stroke(); x.restore()
  pts.forEach(([px, py], i) => { if (i < n + 1) { x.fillStyle = dot; x.fillRect(px - 9, py - 9, 18, 18); x.fillStyle = '#fff'; x.fillRect(px - 3, py - 3, 6, 6) } })
}
/** a phone-camera frame (corner brackets) */
function camFrame(x, t, cx, cy, w, h, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.strokeStyle = BONE; x.lineWidth = 8
  for (const [sx, sy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { x.beginPath(); x.moveTo(sx * w / 2, sy * (h / 2 - 50)); x.lineTo(sx * w / 2, sy * h / 2); x.lineTo(sx * (w / 2 - 50), sy * h / 2); x.stroke() }
  x.fillStyle = RED; x.beginPath(); x.arc(-w / 2 + 40, -h / 2 + 40, 12 * (0.7 + 0.3 * Math.sin(t * 6)), 0, 7); x.fill()
  x.restore()
}
/** a swirling black hole */
function blackHole(x, t, cx, cy, r, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 1.4)
  const C = [LAV, '#c97bff', PINK, GOLD]
  for (let i = 0; i < 4; i++) { x.strokeStyle = C[i]; x.lineWidth = 14; x.beginPath(); for (let a = 0; a < 5; a += 0.1) { const rr = r * (1 - a / 6) , px = Math.cos(a + i * 1.57) * rr, py = Math.sin(a + i * 1.57) * rr * 0.6; a ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke() }
  x.fillStyle = '#05040c'; x.beginPath(); x.arc(0, 0, r * 0.3, 0, 7); x.fill()
  x.restore()
}
/** a shooting star streak */
function shooting(x, t, p, from, to) {
  if (p <= 0 || p >= 1) return
  const px = lerp(from[0], to[0], p), py = lerp(from[1], to[1], p)
  x.save(); x.strokeStyle = 'rgba(255,241,200,0.7)'; x.lineWidth = 8; x.beginPath(); x.moveTo(px, py); x.lineTo(px - (to[0] - from[0]) * 0.25, py - (to[1] - from[1]) * 0.25); x.stroke(); x.restore()
  drawBits(x, STAR5, { Y: GOLD, W: '#fff' }, px, py, 8)
}

const CAMEOS = [
  { sign: 'aries', cap: 'Named a star after you. | *In minute one.*', mood: lt => lt > 1.0 ? 'heart' : 'sparkle', star: { x: -200 }, hops: [0.5, 0.9],
    front(x, t, lt, P) {
      drawBits(x, STAR5, { Y: GOLD, W: '#fff' }, 790, 760, 24 * pop01(t, P.t0 + 0.3, 0.35, 2.2))
      sparkles(x, t, 790, 760, P.t0 + 0.5, 6, 140, 0.4)
      L(x, 790, 1000, 'STAR: YOURS NOW', pop01(t, P.t0 + 0.9, 0.3, 2.4), GOLD, -0.04, 34)
      bubble(x, 760, 590, 'too fast?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, col: PINK, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Brought a blanket. | *And four courses.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, BASKET, { K: WOOD, W: CREAM, R: RED, B: '#c98f2a' }, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const c = 1 + Math.min(3, Math.floor(clamp((lt - 0.4) / 1.2) * 4))
      L(x, 790, 660, `COURSE ${c} OF 4`, pop01(t, P.t0 + 0.6, 0.3, 2.4), MINT, 0.04, 36)
      L(x, 790, 1120, 'STARS: LATER', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD)
    } },
  { sign: 'gemini', cap: 'Turned every constellation | *into gossip.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, -1], star: { x: -210 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      constellation(x, [[640, 620], [740, 700], [860, 640], [900, 760], [800, 840]], clamp((lt - 0.2) / 1.0))
      bubble(x, 790, 1000, 'so THEN | the bear said…', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 36, col: GOLD, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Brought you a jacket. | *And three spares.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      const n = Math.min(4, 1 + Math.floor(clamp((lt - 0.3) / 1.2) * 4))
      const C = [SKYB, PINK, MINT, GOLD]
      for (let i = 0; i < n; i++) drawBits(x, JACKET, { J: C[i], Y: CREAM }, 700 + (i % 2) * 170, 760 + Math.floor(i / 2) * 230, 18, { rot: (i - 1.5) * 0.08 })
      bubble(x, 500, 590, 'it’s chilly!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Ignored the stars. | *Is the star.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wink', star: { x: -40, s: 340 }, hops: [1.1, 1.6],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.4, 1.6)
      if (k > 0.01) { x.save(); x.globalAlpha = 0.28 * k; x.fillStyle = '#fff1c8'; x.beginPath(); x.moveTo(460, 470); x.lineTo(540, 470); x.lineTo(760, 1180); x.lineTo(240, 1180); x.closePath(); x.fill(); x.restore() }
    },
    front(x, t, lt, P) {
      sparkles(x, t, 500, 860, P.t0 + 0.8, 8, 220, 0.2)
      L(x, 800, 640, 'BRIGHTEST THING HERE', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.05, 28)
    } },
  { sign: 'virgo', cap: 'Fixed your constellation. | *Politely. Twice.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, -1], star: { x: -210 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const pts = [[640, 640], [720, 720], [820, 660], [900, 740], [860, 860]]
      constellation(x, pts, clamp((lt - 0.1) / 0.6), { col: lt > 1.0 ? 'rgba(226,61,78,0.8)' : 'rgba(239,230,214,0.8)' })
      if (lt > 1.0) { x.strokeStyle = RED; x.lineWidth = 10; x.beginPath(); x.moveTo(620, 620); x.lineTo(920, 880); x.moveTo(920, 620); x.lineTo(620, 880); x.stroke() }
      L(x, 780, 1030, 'THAT’S NOT ORION', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: 'libra', cap: 'Spent the whole date | *finding your angle.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 790 + 30 * Math.sin(lt * 2), 900, 200 * k, { mood: 'happy', look: [-1, 0], seed: 17, glyph: false })
      camFrame(x, t, 790, 880, 300, 340, pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 790, 1130, 'TAKE 84', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, -0.04, 40)
    } },
  { sign: 'scorpio', cap: 'Didn’t look up once. | *Only at you.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      constellation(x, [[650, 600], [760, 640], [880, 590]], 1, { col: 'rgba(239,230,214,0.4)' })
      bubble(x, 790, 820, 'the stars? | sure. lovely.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
      hearts(x, t, 760, 1060, P.t0 + 1.4, { n: 5, life: 1.4, spread: 140, cell: 7, seed: 3 })
    } },
  { sign: 'sagittarius', cap: 'Hiked you up a mountain. | *At 3 a.m.*', mood: 'sparkle', star: { x: -160, y: -40, s: 260 }, hops: [0.6, 1.2, 1.8],
    back(x, t, lt, P) { drawBits(x, MOUNTAIN, { W: '#ffffff', G: '#5a8f6a' }, 640, 1020, 40 * pop01(t, P.t0 + 0.1, 0.35, 2)) },
    front(x, t, lt, P) {
      L(x, 820, 640, 'VIEW: WORTH IT?', pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD, 0.05, 34)
      bubble(x, 840, 880, 'almost there!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Brought a telescope. | *And an itinerary.*', mood: lt => lt > 1.3 ? 'squint' : 'neutral', look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      drawBits(x, TELESCOPE, { G: GOLD, K: '#9aa0b4' }, 690, 960, 18 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 830, 660, 'SATURN: 9:42 PM', pop01(t, P.t0 + 0.7, 0.3, 2.4), MINT, 0.04, 30)
      L(x, 830, 740, 'MOON: 9:50 PM', pop01(t, P.t0 + 1.1, 0.3, 2.4), SKYB, -0.03, 30)
      L(x, 830, 820, 'KISS: 9:55 PM', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, 0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Explained black holes. | *Hour three.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -210 },
    front(x, t, lt, P) {
      blackHole(x, t, 790, 820, 150, pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 790, 1080, 'FUN FACT #212', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, -0.04, 36)
    } },
  { sign: 'pisces', cap: 'Saw a shooting star. | *Sobbed with joy.*', mood: lt => lt > 1.0 ? 'wide' : 'sparkle', look: [1, -1], tears: lt => lt > 1.0 ? 3 : 1, star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      shooting(x, t, prog(lt, 0.3, 1.1), [960, 560], [620, 820])
      if (lt > 1.1) sparkles(x, t, 620, 820, P.t0 + 1.1 * (3.1 / 2.4), 7, 120, 0.3)
      L(x, 790, 1080, 'WISH: MADE (CRYING)', pop01(t, P.t0 + 1.5, 0.3, 2.4), LAV, -0.04, 30)
    } },
]
for (const c of CAMEOS) if (!c.keyCue) delete c.keyCue

const F = makeFilm({
  id: 'r2t0369', key: 'D', accent: GOLD, ending: 'card',
  title: 'The signs on | *a stargazing date.*',
  cameos: CAMEOS,
  card: { a: 'scorpio', b: 'leo', chip: 'ALIGNED' },
  group: { cap: 'Nobody looked | *at the sky.*' },
  lesson: { text: 'The best view | *is the company.*', chip: 'DATE: STELLAR' },
  last: { text: 'Scorpio found | *their star.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
