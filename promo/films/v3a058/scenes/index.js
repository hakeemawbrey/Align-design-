// v3a058: zodiac.advice444, ADVICE ROLL CALL, "How each sign | recharges." (~63 s vertical, signs3kit social cut, music: lofi · F)
// Twelve signs in zodiac order, one warm, specific way each one refills, one light gag per card.
//   0.0–3.6    "How each sign | *recharges.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   twelve cards (3.8 s each):
//              ♈ a dumbbell, then a nap: REPS DONE · ♉ a six-course dinner: COURSE 4 OF 6 · ♊ Gemini and Libra, "and THEN—": HOUR 3
//              · ♋ a blanket fort: POP. 1 · ♌ a deck chair in the sun: SOLAR CHARGING · ♍ one tidy drawer: SO SATISFYING
//              · ♎ a painting on an easel: ART: ABSORBED · ♏ a dark room, a mystery show: EPISODE 9
//              · ♐ a signpost with no answers: LOST (HAPPILY) · ♑ a homemade birdhouse: BUILT IT
//              · ♒ a deep dive on octopuses: TAB 63 · ♓ rain sounds and a good cry: FULLY CHARGED
//  49.2        "Different plugs. | *Same battery.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "Know what fills you up. | *Go get more.*"  BATTERY: 100%
//  58.3        "Aquarius? | *Still on tab 63.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const VOLT = '#9dffb0', RED = '#e23d4e', WOOD = '#c98f2a', SUN = '#ffcf7a'

// ── props
const DUMBBELL = ['KK......KK', 'KK......KK', 'KKBBBBBBKK', 'KK......KK', 'KK......KK']
const DUMB_C = { K: '#3a3360', B: '#c9c9d8' }
const PASTA = [
  '..YYYYYY..',
  '.YYRYYYRY.',
  'YYYYYRYYYY',
  'WWWWWWWWWW',
  '.WWWWWWWW.',
  '..WWWWWW..',
]
const PASTA_C = { Y: GOLD, R: RED, W: '#f4f0ff' }
const OCTO = [
  '...PPPP...',
  '..PPPPPP..',
  '.PPWPPWPP.',
  '.PPKPPKPP.',
  '.PPPPPPPP.',
  'P.P.PP.P.P',
  'P.P.PP.P.P',
  '.P..P.P..P',
]
const OCTO_C = { P: '#ff8fb1', W: '#fff', K: INK }
const SIGNPOST = [
  '....W.....',
  'GGGGWGGGG.',
  'GGGGWGGGGG',
  'GGGGWGGGG.',
  '....W.....',
  '.GGGWGGGG.',
  'GGGGWGGGG.',
  '.GGGWGGGG.',
  '....W.....',
  '....W.....',
  '....W.....',
  '...WWW....',
]
const SIGNPOST_C = { W: WOOD, G: '#7bd36a' }

function fort(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-260, 150); x.lineTo(0, -190); x.lineTo(260, 150); x.closePath(); x.fill()
  x.fillStyle = '#7fb7ff'; x.beginPath(); x.moveTo(-244, 142); x.lineTo(0, -176); x.lineTo(244, 142); x.closePath(); x.fill()
  x.fillStyle = '#a9cfff'; for (let i = 0; i < 4; i++) { x.beginPath(); x.moveTo(-200 + i * 110, 142); x.lineTo(-150 + i * 110, 142); x.lineTo(-20 + i * 10, -120); x.fill() }
  x.fillStyle = '#2a2350'; x.beginPath(); x.moveTo(-90, 142); x.lineTo(0, 0); x.lineTo(90, 142); x.closePath(); x.fill()
  x.restore()
}
function deckChair(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-160, 40, 20, 110); x.fillRect(120, 40, 20, 110); x.fillRect(-170, 30, 330, 22)
  x.save(); x.rotate(-0.5); x.fillStyle = INK; x.fillRect(-110, -110, 200, 140)
  for (let i = 0; i < 5; i++) { x.fillStyle = i % 2 ? '#fff4e2' : '#ff8a6a'; x.fillRect(-102 + i * 37, -102, 37, 124) }
  x.restore()
  x.restore()
}
function sunDisc(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(t * 0.4); x.scale(k, k)
  x.fillStyle = SUN; for (let i = 0; i < 8; i++) { x.save(); x.rotate(i * Math.PI / 4); x.fillRect(-10, -120, 20, 40); x.restore() }
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 72, 0, Math.PI * 2); x.fill()
  x.fillStyle = SUN; x.beginPath(); x.arc(0, 0, 64, 0, Math.PI * 2); x.fill()
  x.restore()
}
function drawer(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-200, -100, 400, 200)
  x.fillStyle = WOOD; x.fillRect(-192, -92, 384, 184)
  x.fillStyle = '#e8c58a'; x.fillRect(-176, -76, 352, 152)
  const items = [[-120, -30, SKYB], [-40, -30, PINK], [40, -30, MINT], [120, -30, GOLD], [-120, 36, LAV], [-40, 36, '#ffb38a'], [40, 36, SKYB], [120, 36, PINK]]
  items.forEach(([px, py, c]) => { x.fillStyle = '#c99a5a'; x.fillRect(px - 36, py - 30, 72, 60); x.fillStyle = INK; x.fillRect(px - 18, py - 12, 36, 24); x.fillStyle = c; x.fillRect(px - 14, py - 8, 28, 16) })
  x.restore()
}
function easel(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.strokeStyle = INK; x.lineWidth = 20; x.beginPath(); x.moveTo(-110, 230); x.lineTo(0, -180); x.lineTo(110, 230); x.stroke()
  x.strokeStyle = WOOD; x.lineWidth = 10; x.stroke()
  x.fillStyle = INK; x.fillRect(-150, -150, 300, 230)
  x.fillStyle = GOLD; x.fillRect(-140, -140, 280, 210)
  x.fillStyle = '#8fd0ff'; x.fillRect(-120, -120, 240, 170)
  x.fillStyle = '#5fd068'; x.fillRect(-120, 0, 240, 50)
  x.fillStyle = '#fff2b0'; x.beginPath(); x.arc(60, -60, 30, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#ff9ccf'; x.fillRect(-80, -20, 20, 20); x.fillRect(-40, -10, 20, 20)
  x.restore()
}
function tv(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-190, -130, 380, 260)
  x.fillStyle = '#1e1450'; x.fillRect(-176, -116, 352, 232)
  x.fillStyle = 'rgba(143,227,255,' + (0.35 + 0.15 * Math.sin(t * 7)).toFixed(3) + ')'; x.fillRect(-176, -116, 352, 232)
  x.fillStyle = BONE; x.font = `800 120px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('?', 0, 4)
  x.fillStyle = INK; x.fillRect(-60, 130, 120, 20); x.fillRect(-110, 150, 220, 16)
  x.restore()
}
function birdhouse(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-16, 120, 32, 140)
  x.fillStyle = INK; x.fillRect(-130, -60, 260, 190)
  x.fillStyle = WOOD; x.fillRect(-120, -50, 240, 170)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-170, -50); x.lineTo(0, -190); x.lineTo(170, -50); x.closePath(); x.fill()
  x.fillStyle = RED; x.beginPath(); x.moveTo(-148, -58); x.lineTo(0, -176); x.lineTo(148, -58); x.closePath(); x.fill()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 30, 40, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.fillRect(-8, 80, 16, 40)
  x.restore()
}
function browser(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-200, -160, 400, 320)
  x.fillStyle = '#fff4e2'; x.fillRect(-190, -110, 380, 260)
  x.fillStyle = '#3a3360'; x.fillRect(-190, -150, 380, 40)
  x.fillStyle = '#6a5fa8'; for (let i = 0; i < 18; i++) x.fillRect(-186 + i * 21, -144, 17, 28)
  x.restore()
  drawBits(x, OCTO, OCTO_C, cx, cy + 20 * k, 18 * k)
}
function rain(x, t, cx, cy, k) {
  if (k <= 0.01) return
  drawBits(x, ['...CCCC.....', '..CCCCCC.CC.', '.CCCCCCCCCCC', 'CCCCCCCCCCCC', '.CCCCCCCCCC.'], { C: '#8d8aa3' }, cx, cy, 22 * k)
  x.save(); x.fillStyle = SKYB
  for (let i = 0; i < 10; i++) { const ph = (t * 1.5 + i * 0.137) % 1; x.fillRect(cx - 120 + i * 26, cy + 60 + ph * 300, 6, 22) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'A hard workout. | *Then a big nap.*', mood: lt => lt > 1.3 ? 'sleepy' : 'squint', look: [1, -1], star: { x: -200 }, hops: [0.4, 0.8],
    front(x, t, lt, P) {
      const lift = lt < 1.2 ? Math.abs(Math.sin(lt * 7)) * 60 : 0
      drawBits(x, DUMBBELL, DUMB_C, 780, 960 - lift, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 780, 720, 'REPS: DONE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: VOLT, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1130, 'NAP: NEXT', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'A long dinner. | *Very long.*', mood: 'heart', look: [1, 0], star: { x: -210 }, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, PASTA, PASTA_C, 790, 960, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 720, 'COURSE 4 OF 6', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'A long chat | *with their person.*', mood: 'sparkle', look: [1, 0], star: { x: -230 }, hops: [0.9, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 800, 990, 200 * k, { mood: lt > 1.2 ? 'wide' : 'happy', look: [-1, 0], seed: 21, glyph: false })
      bubble(x, 500, 640, 'and THEN—', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 800, 720, 'HOUR 3', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'A blanket fort. | *Population: one.*', mood: 'heart', star: { x: 0, y: 70, s: 230 }, hops: [1.4],
    back(x, t, lt, P) { fort(x, 540, 960, pop01(t, P.t0 + 0.1, 0.35, 2)) },
    front(x, t, lt, P) { label(x, 540, 640, 'POP. 1', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: BONE, rot: -0.05, font: MONO, weight: 700 }) } },
  { sign: 'leo', cap: 'Sun on the face. | *Recharged.*', mood: 'sleepy', look: [0, -1], star: { x: -170, y: 40 },
    back(x, t, lt, P) { deckChair(x, 380, 1000, pop01(t, P.t0 + 0.1, 0.35, 2)) },
    front(x, t, lt, P) {
      sunDisc(x, t, 820, 680, pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 780, 1120, 'SOLAR CHARGING', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: SUN, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Organizing | *one tiny drawer.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 1], star: { x: -220, y: -20 }, hops: [1.5],
    front(x, t, lt, P) {
      drawer(x, 760, 1000, pop01(t, P.t0 + 0.2, 0.35, 2))
      sparkles(x, t, 760, 1000, P.t0 + 1.3, 8, 230, 0.4)
      label(x, 790, 720, 'SO SATISFYING', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: VOLT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'A museum day. | *Alone. Lovely.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -230 }, hops: [1.6],
    front(x, t, lt, P) {
      easel(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1140, 'ART: ABSORBED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Lights off. | *A mystery show.*', mood: 'squint', look: [1, 0], star: { x: -220 }, hops: [],
    front(x, t, lt, P) {
      tv(x, t, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1120, 'EPISODE 9', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'A walk. | *No destination.*', mood: 'happy', look: [1, 0], star: { x: -220 }, hops: [0.6, 1.2, 1.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, SIGNPOST, SIGNPOST_C, 800, 900, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1140, 'LOST (HAPPILY)', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Building something. | *By hand.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -230 }, hops: [1.5],
    front(x, t, lt, P) {
      birdhouse(x, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2))
      if (lt > 1.4) { const k = pop01(t, P.t0 + 1.4, 0.3, 2); drawBits(x, ['.BB.', 'BBBB', 'BBWB', '.BB.'], { B: SKYB, W: '#fff' }, 800, 700, 12 * k) }
      label(x, 790, 1150, 'BUILT IT', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: VOLT, rot: -0.04 })
    } },
  { sign: 'aquarius', cap: 'A deep dive | *on octopuses.*', mood: 'sparkle', look: [1, 0], star: { x: -230 }, hops: [1.5],
    front(x, t, lt, P) {
      browser(x, 760, 860, 0.85 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 760, 1110, 'TAB 63', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Rain sounds. | *A good cry.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', tears: 2, look: [1, -1], star: { x: -220, y: 40 }, hops: [1.6],
    front(x, t, lt, P) {
      rain(x, t, 790, 640, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1130, 'FULLY CHARGED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: VOLT, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a058', key: 'F', accent: VOLT, ending: 'lesson',
  title: 'How each sign | *recharges.*',
  cameos: CAMEOS,
  group: { cap: 'Different plugs. | *Same battery.*' },
  lesson: { text: 'Know what fills you up. | *Go get more.*', chip: 'BATTERY: 100%' },
  last: { text: 'Aquarius? | *Still on tab 63.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
