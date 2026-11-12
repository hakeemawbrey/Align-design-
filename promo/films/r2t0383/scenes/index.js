// r2t0383: star_talk, SOLO (aries), "How to spot | an Aries." (signs3kit social cut, music: lofi · G). Ending: lesson.
//   first in line for a shop that opens Tuesday · microwave at 0:03, opens it anyway · board-game rematch number twelve
//   · door says pull, pushes harder · never walks, sprints in sandals · opens the gift before the party
//   · argued with the map and won · compatibility quiz done in four seconds · hottest sauce, "I'm fine."
//   group "Zero to a hundred. | Always."  lesson "Their fire | gets everyone going."  last "Spotted one? | They saw you first."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', SLATE = '#9aa5c4', ACC = '#ff6b5a'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

const DIE = ['WWWWWWW', 'WKWWWKW', 'WWWWWWW', 'WWWKWWW', 'WWWWWWW', 'WKWWWKW', 'WWWWWWW']
const SANDAL = ['..KK.....', '.K..K....', 'BBBBBBBBB', 'BBBBBBBBB']
const GIFT = ['...R.R...', '....R....', 'PPPPRPPPP', 'PPPPRPPPP', 'PPPPRPPPP', 'PPPPRPPPP', 'PPPPRPPPP']
const PIN = ['..RRRR..', '.RRRRRR.', 'RRRWWRRR', 'RRRWWRRR', '.RRRRRR.', '..RRRR..', '...RR...', '...RR...']
const CHILI = ['......G.', '.....GG.', '...RRR..', '..RRRR..', '.RRRRR..', 'RRRRR...', 'RRRR....', '.RR.....']
const FLAME = ['...Y...', '..YOY..', '.YOROY.', 'YORRROY', 'YORRROY', '.YOOOY.']
const FLAME_C = { Y: GOLD, O: ORANGE, R: RED }

/** speed lines trailing left of a point */
function speed(x, t, cx, cy) {
  x.save(); x.strokeStyle = 'rgba(239,230,214,0.75)'; x.lineWidth = 7; x.lineCap = 'round'
  for (let i = 0; i < 4; i++) { const ph = ((t * 2.2 + i * 0.27) % 1 + 1) % 1, y = cy - 60 + i * 40; x.globalAlpha = 1 - ph; x.beginPath(); x.moveTo(cx - 60 - ph * 120, y); x.lineTo(cx - 160 - ph * 120, y); x.stroke() }
  x.restore()
}
/** a shop front with a closed sign */
function shop(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -200, 340, 400)
  x.fillStyle = '#6b62a8'; x.fillRect(-162, -192, 324, 384)
  for (let i = 0; i < 6; i++) { x.fillStyle = i % 2 ? CREAM : RED; x.fillRect(-162 + i * 54, -192, 54, 60) }
  x.fillStyle = '#140c30'; x.fillRect(-110, -100, 220, 292)
  x.fillStyle = CREAM; x.fillRect(-80, -50, 160, 70); x.fillStyle = INK; x.font = `800 36px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('CLOSED', 0, -14)
  x.restore()
}
/** a microwave with a countdown */
function micro(x, cx, cy, k, txt, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, -120, 360, 240)
  x.fillStyle = '#d8dbe8'; x.fillRect(-172, -112, 344, 224)
  if (open) { x.fillStyle = '#ffe7a8'; x.fillRect(-156, -96, 230, 192); x.fillStyle = INK; x.fillRect(-170, -96, 10, 192); x.fillStyle = '#9aa5c4'; x.fillRect(-250, -100, 80, 200) }
  else { x.fillStyle = '#2a2350'; x.fillRect(-156, -96, 230, 192) }
  x.fillStyle = INK; x.fillRect(90, -90, 70, 44); x.fillStyle = MINT; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 125, -66)
  x.fillStyle = SLATE; for (let i = 0; i < 6; i++) x.fillRect(96 + (i % 2) * 34, -30 + Math.floor(i / 2) * 34, 24, 22)
  x.restore()
}
/** a door with a PULL sign that rattles */
function door(x, t, cx, cy, k, shake) {
  if (k <= 0.01) return
  x.save(); x.translate(cx + shake * Math.sin(t * 60) * 6, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -230, 240, 460)
  x.fillStyle = '#8a4a2e'; x.fillRect(-112, -222, 224, 444)
  x.fillStyle = '#6b3a22'; x.fillRect(-90, -200, 180, 170); x.fillRect(-90, 10, 180, 190)
  x.fillStyle = GOLD; x.fillRect(66, -10, 20, 40)
  x.fillStyle = INK; x.fillRect(-74, -150, 148, 66); x.fillStyle = CREAM; x.fillRect(-68, -144, 136, 54)
  x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('PULL', 0, -116)
  x.restore()
}

const S = 'aries', ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'First in line. | The shop *opens Tuesday.*', mood: lt => lt > 1.2 ? 'squint' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      shop(x, 780, 860, 0.9 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 1130, 'OPENS: TUESDAY', pop01(t, P.t0 + 0.9, 0.3, 2.4), GOLD, 0.04, 34)
      bubble(x, 420, 620, 'it’s Saturday', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, col: LAV, tail: 'bc' })
    } },
  { sign: S, cap: 'Microwave at 0:03? | *Opens it anyway.*', mood: lt => lt > 1.1 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const open = lt > 1.0
      micro(x, 790, 860, 0.88 * pop01(t, P.t0 + 0.2, 0.35, 2), open ? '0:03' : lt > 0.7 ? '0:04' : '0:05', open)
      bubble(x, 800, 640, 'close enough', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: S, cap: 'Lost at board games. | Rematch *number twelve.*', mood: lt => lt > 1.0 ? 'squint' : 'neutral', look: [1, 0], star: ST, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, DIE, { W: CREAM, K: INK }, 720, 940, 16 * k, { rot: t * 2 })
      drawBits(x, DIE, { W: CREAM, K: INK }, 870, 980, 16 * k, { rot: -t * 2.4 })
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.4) * 11)
      L(x, 800, 700, `REMATCH #${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), RED, -0.04, 42)
      bubble(x, 800, 1140, 'best of 25?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Door says pull. | Aries *pushes harder.*', mood: lt => lt > 0.6 ? 'squint' : 'happy', look: [1, 0], star: { x: -200 },
    hops: [0.6, 1.0, 1.4, 1.8],
    front(x, t, lt, P) {
      door(x, t, 820, 860, pop01(t, P.t0 + 0.15, 0.35, 2), lt > 0.6 ? 1 : 0)
      L(x, 820, 1150, 'STILL PUSHING', pop01(t, P.t0 + 1.4, 0.3, 2.4), ACC, 0.04, 34)
    } },
  { sign: S, cap: 'Never walks anywhere. | *Sprints.* In sandals.', mood: 'sparkle', look: [1, 0], star: { x: -60 }, hops: [0.3, 0.6, 0.9, 1.2, 1.5, 1.8],
    back(x, t, lt, P, F) { if (lt > 0.2) speed(x, t, F.x - 60, F.cy) },
    front(x, t, lt, P, F) {
      drawBits(x, SANDAL, { K: '#8a4a2e', B: ORANGE }, F.x - 40, F.cy + 150, 10 * pop01(t, P.t0 + 0.3, 0.3, 2))
      drawBits(x, SANDAL, { K: '#8a4a2e', B: ORANGE }, F.x + 50, F.cy + 140, 10 * pop01(t, P.t0 + 0.35, 0.3, 2))
      L(x, 540, 610, 'TO THE MAILBOX', pop01(t, P.t0 + 0.8, 0.3, 2.2), GOLD, -0.04, 34)
    } },
  { sign: S, cap: 'Opened the gift | *before the party.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), rip = prog(lt, 0.8, 1.1)
      drawBits(x, GIFT, { R: GOLD, P: PINK }, 790 - rip * 40, 900 - rip * 30, 22 * k, { rot: -rip * 0.4 })
      if (rip > 0) sparkles(x, t, 790, 860, P.t0 + 1.0, 8, 170, 0.2)
      L(x, 790, 640, 'PARTY: SATURDAY', pop01(t, P.t0 + 0.4, 0.3, 2), LAV, 0.04, 32)
      L(x, 790, 1130, 'IT’S WEDNESDAY', pop01(t, P.t0 + 1.4, 0.3, 2.4), RED, -0.04, 34)
    } },
  { sign: S, cap: 'Argued with the map. | *And won.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, PIN, { R: RED, W: CREAM }, 790, 780, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 790, 960, 'recalculating… | ok, your way', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 34, col: SKYB, tail: 'bl' })
      L(x, 790, 1150, 'MAP: DEFEATED', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 34)
    } },
  { sign: S, cap: 'Compatibility quiz? | Done in *four seconds.*', mood: lt => lt > 1.0 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 790, 640, '✦ COMPATIBILITY', pop01(t, P.t0 + 0.2, 0.3, 2), LAV, -0.04, 32)
      const s = Math.min(4, Math.floor(Math.max(0, lt - 0.3) * 3.2))
      L(x, 790, 820, `0:0${s}`, pop01(t, P.t0 + 0.4, 0.3, 2), BONE, 0.03, 56)
      L(x, 790, 1000, 'DONE ✓ NEXT?', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 38)
      hearts(x, t, 790, 900, P.t0 + 1.4, { n: 4, life: 1.4, spread: 150, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Picked the hottest sauce. | *“I’m fine.”*', mood: lt => lt > 0.9 ? 'wide' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      drawBits(x, CHILI, { R: RED, G: '#5fd068' }, 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.3 })
      if (lt > 0.9) drawBits(x, FLAME, FLAME_C, F.x, F.top - 50 + 4 * Math.sin(t * 20), 12 * pop01(lt, 0.9, 0.3, 2))
      bubble(x, 800, 640, 'mild.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 44, tail: 'bl' })
      L(x, 800, 1110, 'NOT FINE', pop01(t, P.t0 + 1.7, 0.3, 2.4), RED, 0.05, 40)
    } },
]

const F = makeFilm({
  id: 'r2t0383', key: 'G', accent: ACC, solo: S,
  title: 'How to spot | *an Aries.*',
  cameos: CAMEOS,
  ending: 'lesson',
  group: { cap: 'Zero to a hundred. | *Always.*', mood: 'sparkle' },
  lesson: { text: 'Their fire | gets *everyone* going.', chip: 'ENERGY: UNMATCHED' },
  last: {
    text: 'Spotted one? | *They saw you first.*',
    draw(x, t, lt) { sparkles(x, t, 540, 1050, t - lt + 0.7, 10, 260, 0.3) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
