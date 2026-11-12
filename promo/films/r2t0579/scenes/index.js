// r2t0579: star_talk, ROLL CALL (twelve signs), "The signs | *on a bike ride.*" (signs3kit social cut, music: lofi · D).
// Each sign's most extreme self on a bike ride:
//   ♈ raced the bus and won · ♉ stopped at a bakery, ride over · ♊ rang the bell just to say hi · ♋ brought a first-aid
//   kit for one scrape · ♌ wore a cape, "for aerodynamics" · ♍ checked tyre pressure every 200 m · ♎ matched the outfit to
//   the bike · ♏ took the secret trail, won't say where · ♐ a five-minute ride became a tour · ♑ commuted with a briefcase
//   · ♒ built their own bike (five wheels) · ♓ saw a sunset, stopped to cry.
// Ending: callback ("The bus wants | a rematch." — the bus from Aries' card is back).
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO, INTER } from '../../signs3kit.js'
import { L, sheet, phone, steam, confetti, zzz, bits, swapLabel, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#4fbf6a', ST = { x: -170 }
const BUS = [
  'YYYYYYYYYYYYYYYYYY',
  'YSSSYSSSYSSSYSSSYY',
  'YSSSYSSSYSSSYSSSYY',
  'YYYYYYYYYYYYYYYYYY',
  'YYYYYYYYYYYYYYYYYW',
  'YYYYYYYYYYYYYYYYYY',
  '..KK..........KK..',
  '..KK..........KK..',
]
const BUS_C = { Y: '#ffd23a', S: SKYB, W: '#ffffff', K: INK }
const BELL = ['...K...', '..YYY..', '.YYYYY.', '.YWYYY.', 'YYYYYYY', 'KKKKKKK']
const BELL_C = { K: INK, Y: GOLD, W: '#fff4c0' }
const KIT = ['..KKKK..', 'WWWWWWWW', 'WWWRRWWW', 'WWRRRRWW', 'WWRRRRWW', 'WWWRRWWW', 'WWWWWWWW']
const KIT_C = { K: INK, W: '#ffffff', R: RED }
const CAPE = ['RRRRRRRR', 'RRRRRRRRR', 'RRRRRRRRRR', 'RRRRRRRRRRR', 'RRRRRRRRRRRR', 'RRRRRRRRRRR.', 'RRRRRRRRRR..']
const BREAD = ['..CCCCCCC..', '.CCWCCWCCC.', 'CCCCCCCCCCC', 'CCCCCCCCCCC', '.CCCCCCCCC.']
const BREAD_C = { C: '#e0a56a', W: '#fff4e2' }
const CASE = ['...KKKK...', '...K..K...', 'BBBBBBBBBB', 'BBBBYYBBBB', 'BBBBBBBBBB', 'BBBBBBBBBB', 'BBBBBBBBBB']
const CASE_C = { K: INK, B: '#8a5a32', Y: GOLD }
const SUN = ['...YYYY...', '.YYYYYYYY.', 'YYYYYYYYYY', 'OOOOOOOOOO', 'PPPPPPPPPP']
const SUN_C = { Y: '#ffd23a', O: '#ff9a4a', P: PINK }
const GAUGE = ['.KKKKK.', 'KWWWWWK', 'KWWRWWK', 'KWWRWWK', 'KWWWWWK', '.KKKKK.', '...S...', '...S...']
const GAUGE_C = { K: INK, W: '#ffffff', R: RED, S: STEEL }
const b = (x, bm, c, cx, cy, cell, o) => drawBits(x, bm, c, cx, cy, cell, o)
// a drawn bicycle: two wheels, a frame, a seat and bars, in colour col
function bike(x, t, cx, cy, k, col) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.lineCap = 'round'; x.lineJoin = 'round'
  const W = [[-100, 50], [100, 50]]
  for (const [lw, c] of [[22, INK], [12, BONE]]) { x.lineWidth = lw; x.strokeStyle = c; for (const [wx, wy] of W) { x.beginPath(); x.arc(wx, wy, 62, 0, Math.PI * 2); x.stroke() } }
  for (const [lw, c] of [[22, INK], [12, col]]) { x.lineWidth = lw; x.strokeStyle = c; x.beginPath(); x.moveTo(-100, 50); x.lineTo(-20, 50); x.lineTo(50, -40); x.lineTo(-50, -40); x.lineTo(-100, 50); x.moveTo(-20, 50); x.lineTo(-50, -40); x.lineTo(-58, -64); x.moveTo(100, 50); x.lineTo(50, -40); x.lineTo(40, -80); x.lineTo(70, -84); x.stroke() }
  x.fillStyle = INK; x.fillRect(-86, -78, 60, 24); x.fillStyle = col; x.fillRect(-82, -74, 52, 16)
  x.restore()
}
// a sunset: half a sun sinking behind a horizon, with a couple of rays
function sunset(x, t, cx, cy, k, p) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= k
  x.beginPath(); x.rect(140, 480, 800, cy - 480); x.clip()
  const sy = cy - 40 + 60 * p
  x.fillStyle = INK; x.beginPath(); x.arc(cx, sy, 138, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#ffb34a'; x.beginPath(); x.arc(cx, sy, 128, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#ffd23a'; x.beginPath(); x.arc(cx, sy, 92, 0, Math.PI * 2); x.fill()
  x.restore()
  x.save(); x.globalAlpha *= k; x.fillStyle = INK; x.fillRect(cx - 230, cy - 4, 460, 14); x.fillStyle = PINK; x.fillRect(cx - 224, cy, 448, 6); x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Raced the bus. | *And won.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.5, 1.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      const q = ease.inOutCubic(prog(lt, 0.4, 1.6))
      b(x, BUS, BUS_C, lerp(780, 840, q), lerp(900, 860, q), lerp(16, 9, q), { alpha: pop01(t, P.t0 + 0.15, 0.3, 2) })
      for (let i = 0; i < 4; i++) { x.fillStyle = 'rgba(239,230,214,0.4)'; x.fillRect(150, 830 + i * 40, 120 + (i % 2) * 60, 8) }
    },
    front(x, t, lt, P) { L(x, 760, 660, 'BUS: HUMBLED', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 36) } },
  { sign: 'taurus', cap: 'Passed a bakery. | *Ride over.*', mood: lt => lt > 0.9 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      b(x, BREAD, BREAD_C, 790, 860, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      steam(x, t, 790, 790, { alpha: lt > 0.5 ? 0.6 : 0 })
      L(x, 790, 1060, 'DISTANCE: 400 M', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: 'gemini', cap: 'Rang the bell. | *Just to say hi.*', mood: 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      const ring = Math.sin(t * 30) * 0.15 * (lt > 0.5 ? 1 : 0)
      b(x, BELL, BELL_C, 760, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: ring })
      bubble(x, 790, 680, 'HIIII!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 50, tail: 'bl' })
      L(x, 790, 1100, 'RINGS: 61', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 34)
    } },
  { sign: 'cancer', cap: 'Brought a first-aid kit. | *For one scrape.*', mood: lt => lt > 1.0 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      b(x, KIT, KIT_C, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1080, 'BANDAGES: 40', pop01(t, P.t0 + 1.0, 0.3, 2.4), PINK, -0.04, 34)
      bubble(x, 790, 640, 'it’s tiny, | but still!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Wore a cape. | “For *aerodynamics.*”', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    back(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      b(x, CAPE, { R: RED }, F.x - 150, F.cy + 10, 26 * k, { rot: 0.15 + 0.12 * Math.sin(t * 9), sx: -1 })
    },
    front(x, t, lt, P) {
      L(x, 790, 760, 'SPEED: +0', pop01(t, P.t0 + 1.0, 0.3, 2.4), '#ffb34a', 0.05, 40)
      L(x, 790, 920, 'DRAMA: +100', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.05, 40)
      sparkles(x, t, 370, 880, P.t0 + 1.0, 6, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Checked the tyres. | *Every 200 metres.*', mood: 'squint', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      b(x, GAUGE, GAUGE_C, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      L(x, 790, 1100, `CHECK #${1 + Math.floor(lt * 5)}`, pop01(t, P.t0 + 0.6, 0.3, 2.4), MINT, -0.04, 36)
      L(x, 790, 640, 'STILL PERFECT', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'libra', cap: 'Matched the outfit | to *the bike.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bike(x, t, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2), PINK)
      L(x, 790, 660, 'PALETTE: PERFECT', pop01(t, P.t0 + 1.1, 0.3, 2.4), PINK, -0.04, 32)
      sparkles(x, t, 790, 900, P.t0 + 1.2, 6, 170, 0.2, [PINK, BONE, LAV])
    } },
  { sign: 'scorpio', cap: 'Took the secret trail. | *Won’t say where.*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'MAP', 790, 860, 24 * k, { rot: 0.05 })
      if (lt > 0.9) { x.save(); x.fillStyle = INK; x.fillRect(650, 800, 280 * clamp((lt - 0.9) / 0.3), 60); x.restore() }
      L(x, 790, 1080, 'CLASSIFIED', pop01(t, P.t0 + 1.3, 0.3, 2.4), LAV, -0.04, 40)
    } },
  { sign: 'sagittarius', cap: 'Five-minute ride? | It’s *a tour now.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      bits(x, 'BACKPACK', 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'FLAG', 900, 760, 18 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: 0.05 * Math.sin(t * 6) })
      L(x, 790, 1080, 'DAY 4 OF THE TOUR', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Bike commute. | Brought *a briefcase.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      b(x, CASE, CASE_C, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04 * Math.sin(t * 5) })
      L(x, 790, 1080, 'MEETING AT 9:00', pop01(t, P.t0 + 1.2, 0.3, 2.4), '#2fc79a', -0.04, 32)
      L(x, 790, 650, 'ARRIVED 8:12', pop01(t, P.t0 + 1.7, 0.3, 2.4), STEEL, 0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Built their own bike. | It has *five wheels.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 900); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -14, 340, 28); x.fillStyle = MINT; x.fillRect(-164, -8, 328, 16)
        for (let i = 0; i < 5; i++) { const wx = -150 + i * 75, wy = 50 + (i % 2) * -110; x.strokeStyle = INK; x.lineWidth = 16; x.beginPath(); x.arc(wx, wy, 34, 0, Math.PI * 2); x.stroke(); x.strokeStyle = SKYB; x.lineWidth = 8; x.beginPath(); x.arc(wx, wy, 34, t * 4, t * 4 + Math.PI * 1.6); x.stroke() }
        x.restore()
      }
      L(x, 790, 1100, 'PROTOTYPE 9', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: 'pisces', cap: 'Saw the sunset. | *Stopped to cry.*', mood: lt => lt < 0.9 ? 'sparkle' : 'wide', tears: lt => lt < 0.9 ? 1 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { sunset(x, t, 790, 960, pop01(t, P.t0 + 0.2, 0.3, 2), prog(lt, 0, 2.4)) },
    front(x, t, lt, P) { L(x, 790, 660, 'SO BEAUTIFUL', pop01(t, P.t0 + 1.0, 0.3, 2.4), PINK, -0.04, 36) } },
]

const F = makeFilm({
  id: 'r2t0579', key: 'D', accent: ACC, ending: 'callback',
  title: 'The signs | *on a bike ride.*',
  cameos: CAMEOS,
  card: { a: 'aries', b: 'taurus', chip: 'ALIGNED' },
  group: { cap: 'Same ride. | *Twelve adventures.*' },
  last: {
    text: 'The bus wants | *a rematch.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'aries', 360, 1100, 260 * k, { mood: lt > 1.2 ? 'sparkle' : 'squint', seed: 7, look: [1, 0], hops: [t0 + 1.3] })
      b(x, BUS, BUS_C, lerp(1200, 760, ease.outCubic(prog(lt, 0.4, 1.1))), 1100, 15, {})
      L(x, 700, 1300, 'ROUND 2', pop01(t, t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 44)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
