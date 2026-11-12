// r2t0204: star_talk, ROLL CALL, "The signs | *moving the couch.*" (~59 s vertical, signs3kit social cut, lofi · D)
// Twelve signs in zodiac order, each the most extreme version of themselves rearranging the living room. Ending: lesson.
//   0.0–3.6    "The signs | *moving the couch.*"
//   3.6–49.2   ♈ moved the couch at 3 a.m., alone · ♉ moved one lamp two inches, exhausted · ♊ layout v4, today
//              · ♋ a whole corner just for blankets · ♌ a Leo portrait on every wall · ♍ measured twice, with a laser
//              · ♎ the plant: left, right, left · ♏ painted it all black, cozy · ♐ a tent in the living room
//              · ♑ a floor plan, to scale · ♒ couch on the ceiling? hear them out · ♓ cried saying bye to the old spot
//  49.2        "New room. | *Same chaos.*"
//  52.4        LESSON: "Home is wherever | *your people* fit."  STATUS: COZY
//  58.3        "Final layout? | *The original.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#ff5a4f', WOOD = '#c98f5a', LEAF = '#3fae5a', BLUEPRINT = '#2f5fae'

const SOFA = ['KK..............KK', 'KAAKKKKKKKKKKKKAAK', 'KAABBBBBBBBBBBBAAK', 'KAABBBBBBBBBBBBAAK', 'KAAKKKKKKKKKKKKAAK', 'KAACCCCCCCCCCCCAAK', 'KKKKKKKKKKKKKKKKKK', '.KK............KK.']
const SOFA_C = { K: INK, A: '#4a8a7a', B: '#5aaa9a', C: '#7ac8b8' }
const LAMP = ['.YYYYY.', 'YYYYYYY', 'YYYYYYY', '...K...', '...K...', '...K...', '...K...', '..KKK..']
const PLANT = ['....L.L....', '...LLLLL...', '..LL.L.LL..', '.LL..L..LL.', '.....L.....', '..TTTTTTT..', '..TTTTTTT..', '...TTTTT...']
const TENT = ['......O......', '.....OOO.....', '....OOOOO....', '...OOOOOOO...', '..OOOODOOOO..', '.OOOODDDOOOO.', 'OOOODDDDDOOOO', 'OOODDDDDDDOOO']
const BUCKET = ['KKKKKKKKKK', 'KBBBBBBBBK', 'KGGGGGGGGK', 'KGGGGGGGGK', '.KGGGGGGK.', '.KGGGGGGK.', '..KKKKKK..']
const BLANKET = (c1, c2) => ({ K: INK, A: c1, B: c2 })
const FOLD = ['KKKKKKKKKKKK', 'KAAAAAAAAAAK', 'KBBBBBBBBBBK', 'KAAAAAAAAAAK', 'KKKKKKKKKKKK']

function card(x, cx, cy, k, lines, { w = 330, size = 30, rot = 0.04, head = null, headBg = GOLD, bg = BONE, ink = INK } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.45, h = lines.length * lh + 40 + (head ? 60 : 0)
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  let y0 = -h / 2 + 20
  if (head) { x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 60); x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 31); y0 += 60 }
  x.fillStyle = ink; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, -w / 2 + 24, y0 + lh * (i + 0.5)))
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Moved the couch | *at 3 a.m.* Alone.', mood: 'wide', star: { x: -170, y: -80 }, hops: [0.5, 1.0],
    back(x, t, lt, P) { drawBits(x, SOFA, SOFA_C, lerp(420, 660, ease.inOutCubic(prog(lt, 0.4, 1.6))), 1050, 20 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) { label(x, 800, 680, '3:00 AM', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 48, bg: BONE, rot: 0.05, font: MONO, weight: 700 }) } },
  { sign: 'taurus', cap: 'Moved one lamp | *two inches.* Exhausted.', mood: lt => lt > 1.2 ? 'sleepy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, LAMP, { Y: '#ffe08a', K: INK }, lerp(760, 790, ease.inOutCubic(prog(lt, 0.4, 1.2))), 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 1120, 'MOVED: 2 IN', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'New layout. | *Fourth one today.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const v = 1 + Math.min(3, Math.floor(lt / 0.5))
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -170, 340, 340); x.fillStyle = BONE; x.fillRect(-162, -162, 324, 324)
        const spots = [[[-90, -90], [80, 60]], [[60, -100], [-80, 80]], [[-100, 60], [90, -80]], [[0, -110], [0, 90]]][v - 1]
        x.fillStyle = SOFA_C.B; x.fillRect(spots[0][0] - 60, spots[0][1] - 26, 120, 52); x.fillStyle = WOOD; x.fillRect(spots[1][0] - 36, spots[1][1] - 36, 72, 72)
        x.restore()
      }
      label(x, 790, 1110, `LAYOUT v${v}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'A whole corner | *just for blankets.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const cs = [[PINK, '#ffb3cb'], [SKYB, '#c8f0ff'], [MINT, '#c8ffe0'], [LAV, '#e6d6ff'], [GOLD, '#ffeab0']]
      cs.forEach((c, i) => drawBits(x, FOLD, BLANKET(c[0], c[1]), 790 + (i % 2 ? 14 : -14), 1060 - i * 72, 22 * pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2)))
      label(x, 790, 650, 'COZY ZONE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Every wall now has | *a Leo portrait.*', mood: 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) {
        const k = pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2)
        if (k <= 0.01) continue
        const cx = 700 + (i % 2) * 180, cy = 740 + Math.floor(i / 2) * 230
        x.save(); x.translate(cx, cy); x.rotate((i % 2 ? 0.05 : -0.05)); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-82, -92, 164, 184); x.fillStyle = GOLD; x.fillRect(-74, -84, 148, 168); x.fillStyle = '#3a2a1a'; x.fillRect(-58, -68, 116, 136)
        x.restore()
        signChar(x, t, 'leo', cx, cy + 6, 100 * k, { mood: i % 2 ? 'wink' : 'sparkle', seed: 50 + i, glyph: false, glow: 0.5 })
      }
    } },
  { sign: 'virgo', cap: 'Measured twice. | *With a laser.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      const p = clamp((lt - 0.4) / 0.8)
      if (p > 0) { x.save(); x.globalAlpha = 0.9; x.fillStyle = RED; x.fillRect(F.x + 90, F.cy - 6, (930 - F.x - 90) * p, 8); x.fillStyle = '#ffd0d0'; x.fillRect(F.x + 90, F.cy - 2, (930 - F.x - 90) * p, 2); x.restore() }
      label(x, 790, 720, '84.25 IN', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 48, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1080, 'MEASURE #2: SAME', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 28, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'The plant: left. | Right. *Left.*', mood: lt => lt > 1.6 ? 'wide' : 'happy', look: lt => [Math.sign(Math.sin(lt * 4)) || 1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const px = 780 + Math.sign(Math.sin(lt * 4)) * 60
      drawBits(x, PLANT, { L: LEAF, T: '#c96a3a' }, px, 920, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 690, `ATTEMPT ${1 + Math.floor(lt * 4 / Math.PI)}`, pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 34, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Painted everything | *black.* Cozy.', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    back(x, t, lt, P) {
      const p = ease.inOutCubic(prog(lt, 0.5, 1.8))
      if (p > 0) { x.save(); x.globalAlpha = 0.7; x.fillStyle = '#07040f'; x.fillRect(130, 480, 820 * p, 740); x.restore() }
    },
    front(x, t, lt, P) {
      drawBits(x, BUCKET, { K: '#4a4060', B: '#07040f', G: '#9aa5c4' }, 800, 1050, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 690, 'COLOUR: VOID', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: '#ff6b8a', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Put a *tent* | in the living room.', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.6, 1.3],
    front(x, t, lt, P) {
      drawBits(x, TENT, { O: '#ff9a3a', D: '#5a2a1a' }, 780, 940, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 680, 'CAMPING (INDOORS)', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 28, bg: '#c58bff', rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Drew a *floor plan.* | To scale.', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-176, -156, 352, 312); x.fillStyle = BLUEPRINT; x.fillRect(-168, -148, 336, 296)
        x.strokeStyle = 'rgba(255,255,255,0.25)'; x.lineWidth = 1; for (let i = -168; i < 168; i += 24) { x.beginPath(); x.moveTo(i, -148); x.lineTo(i, 148); x.stroke(); x.beginPath(); x.moveTo(-168, i * 0.88); x.lineTo(168, i * 0.88); x.stroke() }
        x.strokeStyle = '#fff'; x.lineWidth = 4; x.strokeRect(-130, -110, 260, 220); x.strokeRect(-110, 30, 120, 50); x.strokeRect(40, -80, 60, 60)
        x.fillStyle = '#fff'; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.fillText('SCALE 1:50', 0, 136)
        x.restore()
      }
      label(x, 790, 1110, 'APPROVED BY: ME', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Couch on the ceiling? | *Hear them out.*', mood: 'sparkle', look: [1, -1], star: { x: -170, y: 60 },
    front(x, t, lt, P) {
      drawBits(x, SOFA, SOFA_C, 720, 580, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { sy: -1 })
      bubble(x, 790, 900, 'more floor | space!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Cried saying bye | to *the old spot.*', mood: 'neutral', tears: lt => lt < 0.8 ? 1 : 3, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.globalAlpha = k; x.strokeStyle = BONE; x.lineWidth = 6; x.setLineDash([18, 14]); x.strokeRect(680, 860, 240, 160); x.setLineDash([]); x.restore() }
      label(x, 800, 720, 'RIP, CORNER', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 36, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 800, 1110, 'it was home', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0204', key: 'D', accent: MINT, ending: 'lesson',
  title: 'The signs | *moving the couch.*',
  cameos: CAMEOS,
  group: { cap: 'New room. | *Same chaos.*' },
  lesson: { text: 'Home is wherever | *your people* fit.', chip: 'STATUS: COZY' },
  last: { text: 'Final layout? | *The original.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
