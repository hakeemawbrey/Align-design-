// r2t0493: star_talk, ROLLCALL, "The signs on the | *first cold day.*" (~54 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, each the most extreme version of itself when the cold finally arrives. Ending: group.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ still in shorts, "I run hot" · ♉ made soup, enough for the winter · ♊ wore four seasons at once
//              · ♋ knitted blankets for the whole street · ♌ new profile pic, coat edition · ♍ coat, gloves and a backup coat
//              · ♎ picked a scarf to match the match · ♏ hibernating, do not knock · ♐ one breeze, booked a beach flight
//              · ♑ snow day, walked to work anyway · ♒ ice cream outside, in the snow · ♓ first snowflake, cried (so pretty)
//  49.2        group (the ending): "One cold day. | *Twelve meltdowns.*"  Snow over the photo, COLD: ARRIVED.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', DEEP = '#2a2350', WOOD = '#8a5a3a', ICE = '#d6f1ff'
const ACC = '#a8dcff'
const ST = { x: -170 }
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const R = (t, P, a = 0.2) => pop01(t, P.t0 + a, 0.3, 2)

const FLAKE = ['..W..', 'W.W.W', '.WWW.', 'W.W.W', '..W..']
/** snow falling inside a box */
function snow(x, t, { l = 110, r = 970, top = 480, bot = 1220, n = 18, cell = 5, seed = 0, alpha = 1 } = {}) {
  for (let i = 0; i < n; i++) {
    const ph = ((t * 0.18 + i * 0.137 + seed) % 1 + 1) % 1
    const px = l + ((i * 97 + seed * 31) % 100) / 100 * (r - l) + Math.sin(t * 1.5 + i) * 14
    drawBits(x, FLAKE, { W: '#ffffff' }, px, top + ph * (bot - top), cell, { alpha: alpha * Math.sin(Math.PI * ph), outline: null })
  }
}
function note(x, cx, cy, k, lines, { w = 300, bg = '#ffe27a', size = 34, rot = -0.06, font = INTER, weight = 800 } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.5, h = lines.length * lh + 46
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 23 + lh * (i + 0.5)))
  x.restore()
}
const SHORTS = ['RRRRRRRR', 'RRRWWRRR', 'RRRRRRRR', 'RRR..RRR', 'RRR..RRR']
const POT = ['..KKKKKKKK..', '.KSSSSSSSSK.', 'KK........KK', 'K.GGGGGGGG.K', 'K.GGGGGGGG.K', 'K.GGGGGGGG.K', '.K........K.', '..KKKKKKKK..']
const POT_C = { K: INK, S: '#c9c9d8', G: '#9aa5c4' }
const SHADES = ['KKKK..KKKK', 'KBBKKKKBBK', 'KBBK..KBBK', '.KK....KK.']
const SCARF = ['RRRRRRRRRRRR', 'RWRWRWRWRWRW', 'RRRRRRRRRRRR', '........RR..', '........RW..', '........RR..', '........RW..']
const BLANKET = ['PPPPPPPPPP', 'PWPWPWPWPW', 'PPPPPPPPPP']
const COAT = ['..CCCCCC..', '.CCCWWCCC.', 'CCCCWWCCCC', 'CCCCGGCCCC', 'CCCCWWCCCC', 'CCCCGGCCCC', 'CCCCWWCCCC', 'CCCC..CCCC']
const MITT = ['.MMM.', 'MMMMM', 'MMMMM', 'MMMMM', '.MMM.']
const DOOR = ['WWWWWWWW', 'WddddddW', 'WddddddW', 'WddddddW', 'WddddGdW', 'WddddddW', 'WddddddW', 'WddddddW', 'WddddddW']
const DOOR_C = { W: '#5b2e1a', d: WOOD, G: GOLD }
const PLANE = ['....WW....', '....WWW...', 'WWWWWWWWWW', '.WWWWWWWWB', '....WWW...', '....WW....']
const CONE = ['.PPP.', 'PPPPP', 'PPPPP', '.YYY.', '.YYY.', '..Y..']

const CAMEOS = [
  { sign: 'aries', cap: 'Still in shorts. | “I *run hot.*”', mood: lt => lt < 1.3 ? 'squint' : 'wide', star: ST, hops: [1.4],
    back(x, t, lt, P) { snow(x, t, { seed: 1 }) },
    front(x, t, lt, P, F) {
      drawBits(x, SHORTS, { R: RED, W: CREAM }, F.x, F.cy + 120, 12 * R(t, P))
      L(x, 790, 760, '-2°', pop01(t, P.t0 + 0.6, 0.3, 2.2), ICE, 0.05, 60)
      bubble(x, 790, 980, 'I’m FINE.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Made soup. | Enough *for the winter.*', mood: lt => lt < 1.2 ? 'happy' : 'heart', star: ST,
    front(x, t, lt, P) {
      const k = R(t, P)
      drawBits(x, POT, POT_C, 790, 900, 30 * k)
      if (k > 0.5) for (let i = 0; i < 4; i++) { const ph = ((t * 0.7 + i / 4) % 1); x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * 0.8; x.fillStyle = '#e6e1f2'; x.fillRect(700 + i * 50, 760 - ph * 160, 26, 30); x.restore() }
      L(x, 790, 1110, 'SERVES: 400', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, 0.04, 36)
    } },
  { sign: 'gemini', cap: 'Wore four seasons | *at once.*', mood: 'sparkle', look: lt => [Math.floor(lt * 1.6) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P, F) {
      inFace(x, F, () => drawBits(x, SHADES, { K: INK, B: '#3a2e7a' }, 0, -10, 9 * R(t, P, 0.3)))
      drawBits(x, SCARF, { R: GOLD, W: PINK }, F.x + 10, F.cy + 110, 12 * R(t, P, 0.5))
      L(x, 790, 700, 'SUNNIES ✓', pop01(t, P.t0 + 0.8, 0.3, 2.2), GOLD, -0.04, 32)
      L(x, 790, 820, 'SCARF ✓', pop01(t, P.t0 + 1.1, 0.3, 2.2), PINK, 0.04, 32)
      L(x, 790, 940, 'FLIP-FLOPS ✓', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: 'cancer', cap: 'Knitted blankets. | For *the whole street.*', mood: 'heart', star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.3) / 1.3) * 7)
      for (let i = 0; i < n; i++) drawBits(x, BLANKET, { P: [PINK, LAV, MINT, GOLD][i % 4], W: CREAM }, 790 + (i % 2 ? 10 : -10), 1100 - i * 62, 26)
      L(x, 790, 600, 'ONE PER HOUSE', pop01(t, P.t0 + 1.6, 0.3, 2.2), PINK, -0.04, 32)
    } },
  { sign: 'leo', cap: 'New profile pic. | *Coat edition.*', mood: lt => lt < 1.2 ? 'sparkle' : 'wink', star: ST, hops: [1.2],
    front(x, t, lt, P, F) {
      drawBits(x, COAT, { C: '#c98f2a', W: CREAM, G: GOLD }, F.x, F.cy + 90, 16 * R(t, P, 0.25))
      L(x, 790, 760, 'NEW PROFILE PIC', pop01(t, P.t0 + 0.9, 0.3, 2.2), GOLD, -0.04, 32)
      L(x, 790, 900, 'LIKES: ALL', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, 0.04, 34)
      sparkles(x, t, 400, 860, P.t0 + 1.2, 7, 200, 0.5)
    } },
  { sign: 'virgo', cap: 'Coat, gloves, | and a *backup coat.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, COAT, { C: '#5fd068', W: CREAM, G: GOLD }, 680, 880, 22 * R(t, P, 0.2))
      drawBits(x, COAT, { C: '#9aa5c4', W: CREAM, G: GOLD }, 880, 880, 22 * R(t, P, 0.8))
      drawBits(x, MITT, { M: RED }, 720, 1090, 16 * R(t, P, 1.0)); drawBits(x, MITT, { M: RED }, 840, 1090, 16 * R(t, P, 1.05))
      L(x, 880, 700, 'BACKUP', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, 0.05, 34)
    } },
  { sign: 'libra', cap: 'Picked a scarf | to *match the match.*', mood: lt => lt < 1.3 ? 'squint' : 'heart', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      const cols = [RED, MINT, GOLD, LAV], pick = Math.min(3, Math.floor(lt / 0.4))
      drawBits(x, SCARF, { R: cols[pick], W: CREAM }, F.x + 10, F.cy + 70, 9 * R(t, P, 0.2))
      x.save(); x.translate(790, 860); x.rotate(0.05)
      const k = R(t, P, 0.3)
      if (k > 0.01) { x.scale(k, k); x.fillStyle = INK; x.fillRect(-120, -150, 240, 300); x.fillStyle = DEEP; x.fillRect(-110, -140, 220, 280); x.fillStyle = LAV; x.fillRect(-90, 60, 180, 50); x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MATCH ♡', 0, 86) }
      x.restore()
      if (k > 0.5) signChar(x, t, 'aquarius', 790, 820, 140, { mood: 'happy', seed: 33, glyph: false })
      L(x, 790, 1110, 'COLOURS: SYNCED', pop01(t, P.t0 + 1.6, 0.3, 2.2), LAV, -0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Hibernating. | Do *not* knock.', mood: 'sleepy', star: ST,
    back(x, t, lt, P) { drawBits(x, DOOR, DOOR_C, 800, 860, 34 * R(t, P, 0.1)) },
    front(x, t, lt, P) { note(x, 800, 780, R(t, P, 0.6), ['BACK IN', 'MARCH'], { w: 220, bg: RED, size: 38, rot: 0.06 }) } },
  { sign: 'sagittarius', cap: 'Felt one breeze. | Booked *a beach flight.*', mood: lt => lt < 1.0 ? 'wide' : 'sparkle', star: ST, hops: [1.1],
    back(x, t, lt, P) { if (lt < 1.0) snow(x, t, { seed: 4, n: 8 }) },
    front(x, t, lt, P) {
      const p = ease.inOutCubic(prog(lt, 0.9, 2.2))
      drawBits(x, PLANE, { W: '#ffffff', B: SKYB }, lerp(620, 960, p), lerp(1000, 640, p), 26 * R(t, P, 0.6), { rot: -0.4 })
      L(x, 790, 1110, 'GATE: NOW', pop01(t, P.t0 + 0.7, 0.3, 2.2), GOLD, 0.04, 36)
    } },
  { sign: 'capricorn', cap: 'Snow day? | Walked *to work anyway.*', mood: 'neutral', look: [1, 0], star: { x: -170, y: 20 },
    back(x, t, lt, P) { snow(x, t, { seed: 2, n: 34, cell: 7 }) },
    front(x, t, lt, P) {
      const k = R(t, P, 0.1)
      if (k > 0.01) { x.save(); x.globalAlpha = clamp(k); x.fillStyle = '#ffffff'; x.fillRect(120, 1100, 840, 110); x.fillStyle = ICE; x.fillRect(120, 1100, 840, 18); x.restore() }
      L(x, 790, 760, 'OFFICE: CLOSED', pop01(t, P.t0 + 0.9, 0.3, 2.2), RED, -0.04, 32, CREAM)
      bubble(x, 790, 920, 'still going.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'aquarius', cap: 'Ice cream outside. | *In the snow.*', mood: 'sparkle', look: [1, 0], star: ST,
    back(x, t, lt, P) { snow(x, t, { seed: 3, n: 22 }) },
    front(x, t, lt, P, F) {
      drawBits(x, CONE, { P: PINK, Y: '#e6b25a' }, F.x + 150, F.cy + 30, 18 * R(t, P, 0.3), { rot: 0.2 })
      bubble(x, 790, 760, 'refreshing.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'First snowflake. | Cried. *So pretty.*', mood: lt => lt < 1.0 ? 'wide' : 'sparkle', tears: lt => lt < 1.0 ? 1 : 3, look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const y = lerp(560, 860, ease.outCubic(prog(lt, 0.1, 1.2)))
      drawBits(x, FLAKE, { W: '#ffffff' }, 760 + Math.sin(t * 2) * 18, y, 20 * R(t, P, 0.1), { outline: SKYB })
      sparkles(x, t, 760, 860, P.t0 + 1.2, 7, 140, 0.4)
      L(x, 790, 1080, 'A MASTERPIECE', pop01(t, P.t0 + 1.5, 0.3, 2.2), LAV, 0.04, 32)
    } },
]
/** draw in the star's face space (centre of the sprite) */
function inFace(x, F, fn) { x.save(); x.translate(F.x, F.cy - F.S * 0.02); fn(); x.restore() }

const F = makeFilm({
  id: 'r2t0493', key: 'G', accent: ACC, ending: 'group',
  title: 'The signs on the | *first cold day.*',
  cameos: CAMEOS,
  group: {
    cap: 'One cold day. | *Twelve meltdowns.*',
    draw(x, t, lt) {
      snow(x, t, { l: 40, r: 1040, top: 560, bot: 1500, n: 30, cell: 6, seed: 5, alpha: clamp(lt / 0.6) })
      label(x, 540, 700, 'COLD: ARRIVED', pop01(t, t - lt + 1.6, 0.3, 2.4), { size: 46, bg: ACC, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
