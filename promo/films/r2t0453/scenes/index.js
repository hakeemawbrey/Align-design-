// r2t0453: star_talk, SOLO, "Aquarians vs. | the dress code." (~43 s vertical, signs3kit social cut, music: lofi · G)
// One sign (solo, 9 cards): every dress code an Aquarius has ever been given, creatively ignored. Ending: the group beat.
//   black tie: a bow tie on a hoodie · smart casual: came as a robot · office: a cape, it's Tuesday · wedding "no white":
//   tinfoil (technically silver) · 80s party: dressed as 3080 · "dress to impress": impressed the aliens · matching outfits:
//   matched the curtains · first-date outfit: their birth chart · casual Friday: a full ball gown
//  group (the ending): "Dress code? | *Optional.*"
import { clamp, prog } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { note, bits, ORANGE, RED, WOOD, PAPER, SLATE, GREEN } from '../props.js'

const S = 'aquarius', L = { x: -170 }, CYAN = '#6fe0ff'
const BOW = ['B.....B', 'BB...BB', 'BBBkBBB', 'BB...BB', 'B.....B']
const ANT = ['.R.', 'RRR', '.R.', '.G.', '.G.', '.G.']
const CAPE = ['RRRRRRRRRRR', 'RRRRRRRRRRR', 'RRRRRRRRRRRR'.slice(0, 11), '.RRRRRRRRR.', '.RRRRRRRRR.', '..RRRRRRR..', '..RRRRRRR..', '...RRRRR...']
const VISOR = ['.CCCCCCCCC.', 'CCWCCCCCCCC', 'CCCCCCCCCCC', '.CCCCCCCCC.']
const UFO = ['....GGG....', '...GWWWG...', '.SSSSSSSSS.', 'SSYSSYSSYSS', '.SSSSSSSSS.', '...L...L...', '..L.....L..']
const CURTAIN = ['PPPPPP', 'PpPPpP', 'PpPPpP', 'PpPPpP', 'PpPPpP', 'PpPPpP', 'PpPPpP', 'PPPPPP']
const GOWN = ['....PP....', '...PPPP...', '...PWPP...', '..PPPPPP..', '..PPPPPP..', '.PPPPPPPP.', '.PPWPPPWP.', 'PPPPPPPPPP', 'PPPPPPPPPP']

function chart(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.3)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 140, 0, 7); x.fill()
  x.fillStyle = '#241a52'; x.beginPath(); x.arc(0, 0, 130, 0, 7); x.fill()
  x.strokeStyle = GOLD; x.lineWidth = 4; x.beginPath(); x.arc(0, 0, 100, 0, 7); x.stroke()
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.beginPath(); x.moveTo(Math.cos(a) * 40, Math.sin(a) * 40); x.lineTo(Math.cos(a) * 130, Math.sin(a) * 130); x.stroke() }
  x.strokeStyle = PINK; x.lineWidth = 3; x.beginPath(); x.moveTo(60, -40); x.lineTo(-50, 70); x.lineTo(-70, -30); x.closePath(); x.stroke()
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: '“Black tie.” | *A bow tie. On a hoodie.*', mood: 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P, F) {
      drawBits(x, BOW, { B: INK, k: '#3a3460' }, F.x, F.cy + 120, 12 * pop01(t, P.t0 + 0.3, 0.3, 2), { outline: BONE })
      label(x, 800, 820, 'FORMAL-ISH', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 40, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: '“Smart casual.” | *Came as a robot.*', mood: 'wide', look: [1, 0], star: L, hops: [1.0, 1.5],
    front(x, t, lt, P, F) {
      drawBits(x, ANT, { R: RED, G: '#c9c9d8' }, F.x, F.top - 50, 14 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 800, 700, 'BEEP. HELLO.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'bl', font: MONO, weight: 700 })
      label(x, 800, 1090, 'VERY SMART', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 36, bg: CYAN, rot: -0.04 })
    } },
  { sign: S, cap: 'Office dress code? | *A cape. It’s Tuesday.*', mood: 'sparkle', look: [1, 0], star: L,
    back(x, t, lt, P, F) { drawBits(x, CAPE, { R: RED }, F.x + 10 + 6 * Math.sin(t * 4), F.cy + 60, 30 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04 * Math.sin(t * 3) }) },
    front(x, t, lt, P) {
      label(x, 810, 760, 'CAPE TUESDAY', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 38, bg: GOLD, rot: 0.04 })
      label(x, 810, 1060, 'HR: CONFUSED', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Wedding: “no white.” | *Came in tinfoil.*', mood: 'sparkle', look: [1, 0], star: L, hops: [1.4],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (k > 0.01) { x.save(); x.globalAlpha = 0.55 * k; x.globalCompositeOperation = 'lighter'; for (let i = 0; i < 9; i++) { x.fillStyle = i % 2 ? '#d8dbe8' : '#ffffff'; x.fillRect(F.x - 120 + (i % 3) * 80, F.cy - 80 + Math.floor(i / 3) * 70, 60, 40) } x.restore() }
      sparkles(x, t, F.x, F.cy, P.t0 + 0.7, 8, 170, 0.3, ['#ffffff', '#d8dbe8', SKYB])
      label(x, 810, 760, 'TECHNICALLY: SILVER', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: '#d8dbe8', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Theme: the 80s. | *Dressed as 3080.*', mood: 'happy', look: [1, 0], star: L,
    front(x, t, lt, P, F) {
      drawBits(x, VISOR, { C: CYAN, W: '#ffffff' }, F.x, F.top + 10, 15 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 810, 800, 'YEAR: 3080', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 42, bg: CYAN, rot: 0.04, font: MONO, weight: 700 })
      label(x, 810, 1060, 'ARRIVED EARLY', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: '“Dress to impress.” | *Impressed the aliens.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, -1], star: L, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, UFO, { G: MINT, W: '#e6fff0', S: '#c9c9d8', Y: GOLD, L: MINT }, 800, 760 + 10 * Math.sin(t * 3), 26 * pop01(t, P.t0 + 0.3, 0.35, 2))
      bubble(x, 800, 1000, '10/10 :)', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 42, col: MINT, tail: 'bc' })
    } },
  { sign: S, cap: 'Matching outfits? | *Matched the curtains.*', mood: 'wink', look: [1, 0], star: { x: 0, y: 20, s: 260 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, CURTAIN, { P: PINK, p: '#ff6f9f' }, 300, 820, 34 * k); drawBits(x, CURTAIN, { P: PINK, p: '#ff6f9f' }, 780, 820, 34 * k)
    },
    front(x, t, lt, P, F) {
      x.save(); x.globalAlpha = 0.5 * clamp((lt - 0.6) * 3); x.fillStyle = PINK; for (let i = 0; i < 4; i++) x.fillRect(F.x - 100 + i * 56, F.cy - 40, 24, 140); x.restore()
      label(x, 540, 1130, 'NAILED IT', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 38, bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'First-date outfit? | *Their birth chart.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, t, 800, 870, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 800, 1090, 'RISING: FASHION', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Casual Friday? | *Full ball gown.*', mood: 'sparkle', look: [1, 0], star: { x: -170, y: -60 }, hops: [1.2],
    back(x, t, lt, P, F) { drawBits(x, GOWN, { P: LAV, W: '#ffffff' }, F.x, F.cy + 230, 30 * pop01(t, P.t0 + 0.3, 0.35, 2)) },
    front(x, t, lt, P) {
      label(x, 810, 760, 'JUST A FRIDAY', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: LAV, rot: 0.04 })
      sparkles(x, t, 370, 900, P.t0 + 1.0, 8, 200, 0.6)
    } },
]

const F = makeFilm({
  id: 'r2t0453', key: 'G', accent: CYAN, solo: S, ending: 'group',
  title: 'Aquarians vs. | *the dress code.*',
  cameos: CAMEOS,
  group: { cap: 'Dress code? | *Optional.*', mood: 'sparkle' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
