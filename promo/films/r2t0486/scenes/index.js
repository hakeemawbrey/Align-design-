// r2t0486: star_talk, BE LIKE (twelve signs), "Zodiacs when someone holds the door | *be like.*" (signs3kit social cut,
// music: lofi · C). Ending: group (the door holder is still holding it).
//   ♈ sprinted through, thanked at full speed · ♉ saw you holding it, walked even slower · ♊ stopped in the doorway, told
//   their life story · ♋ you held the door? adopted you · ♌ assumed it was their grand entrance · ♍ said thanks, wiped the
//   handle · ♎ "no, after you", forty minutes later · ♏ checked your sign before walking through · ♐ walked through, kept
//   going, abroad · ♑ said thanks, handed a business card · ♒ ignored the door, used the window · ♓ wept with joy
//   group "And the door holder? | Still holding it."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ffb34a', CREAM = '#fff4e2', RED = '#e23d4e', WOOD = '#b0703e', DARKW = '#7a4a26'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 34) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

// ── props
// a wooden door in its frame, swung open by `open` (0 closed … 1 wide)
function door(x, cx, cy, k, open = 0.7, { w = 210, h = 380 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 22, -h / 2 - 22, w + 44, h + 30)
  x.fillStyle = '#c3cbe0'; x.fillRect(-w / 2 - 14, -h / 2 - 14, w + 28, h + 22)
  x.fillStyle = '#1b1236'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = 'rgba(255,241,200,0.35)'; x.fillRect(-w / 2, -h / 2, w, h)
  const dw = w * (1 - 0.72 * open)
  x.fillStyle = INK; x.fillRect(-w / 2 - 4, -h / 2 - 4, dw + 8, h + 8)
  x.fillStyle = WOOD; x.fillRect(-w / 2, -h / 2, dw, h)
  x.fillStyle = DARKW; x.fillRect(-w / 2 + dw * 0.15, -h / 2 + 30, dw * 0.7, h * 0.32); x.fillRect(-w / 2 + dw * 0.15, -h / 2 + h * 0.5, dw * 0.7, h * 0.38)
  x.fillStyle = GOLD; x.fillRect(-w / 2 + dw - 26, -6, 16, 16)
  x.restore()
}
const CARPET = (x, cx, cy, k) => {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, 1)
  x.fillStyle = INK; x.fillRect(-300, -24, 600, 48); x.fillStyle = RED; x.fillRect(-296, -20, 592, 40)
  x.fillStyle = GOLD; x.fillRect(-296, -20, 592, 6); x.fillRect(-296, 14, 592, 6)
  x.restore()
}
const SPRAY = [
  '..KKK...',
  '..KWK...',
  '.KKKKKK.',
  '..BB....',
  '.BBBB...',
  '.BSSB...',
  '.BSSB...',
  '.BSSB...',
  '.BBBB...',
]
const SPRAY_C = { K: '#6b62a8', W: CREAM, B: SKYB, S: '#ffffff' }
const PLANE = [
  '......WW......',
  '......WWW.....',
  'W.....WWWW....',
  'WWWWWWWWWWWWWS',
  'WWWWWWWWWWWWWW',
  'W.....WWWW....',
  '......WWW.....',
  '......WW......',
]
const PLANE_C = { W: CREAM, S: SKYB }
// a business card
function bizCard(x, cx, cy, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -80, 310, 175)
  x.fillStyle = INK; x.fillRect(-160, -92, 320, 184); x.fillStyle = CREAM; x.fillRect(-154, -86, 308, 172)
  x.fillStyle = '#9aa5c4'; x.fillRect(-154, -86, 308, 30)
  x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('CAPRICORN', -130, -16)
  x.font = `700 22px ${MONO}`; x.fillText('Chief Executive', -130, 26); x.fillText('Of Everything', -130, 56)
  x.restore()
}
// a window with a little sky
function windowPane(x, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -120, 260, 240); x.fillStyle = '#c3cbe0'; x.fillRect(-122, -112, 244, 224)
  x.fillStyle = SKYB; x.fillRect(-108, -98, 216, 196)
  x.fillStyle = '#fff'; x.fillRect(-80, -60, 70, 18); x.fillRect(20, 10, 60, 16)
  x.fillStyle = '#c3cbe0'; x.fillRect(-6, -98, 12, 196)
  x.fillStyle = INK; x.fillRect(-108, -98 - 196 * open * 0.6, 216, 14); x.fillStyle = '#e8eefc'; x.fillRect(-104, -94 - 196 * open * 0.6, 208, 6)
  x.restore()
}
// a sign profile card (Scorpio checks yours)
function profile(x, cx, cy, k, revealed) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -170, 300, 340); x.fillStyle = CREAM; x.fillRect(-142, -162, 284, 324)
  x.fillStyle = '#c97bff'; x.fillRect(-142, -162, 284, 120)
  x.fillStyle = INK; x.fillRect(-36, -136, 72, 72); x.fillStyle = '#e8b07a'; x.fillRect(-30, -130, 60, 60)
  x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('DOOR HOLDER', 0, -10)
  x.fillText(revealed ? 'SIGN: LIBRA' : 'SIGN: ???', 0, 40)
  x.fillStyle = revealed ? '#2fc79a' : '#9aa5c4'; x.fillRect(-110, 80, 220, 50)
  x.fillStyle = INK; x.fillText(revealed ? 'SAFE. GO.' : 'CHECKING…', 0, 106)
  x.restore()
}

const ST = { x: -170 }
const CAMEOS = [
  // ♈ sprinted through
  { sign: 'aries', cap: 'Sprinted through. | Thanked you *at full speed.*', mood: 'sparkle', look: [1, 0], star: { x: -150 }, hops: [0.4, 0.8],
    front(x, t, lt, P) {
      door(x, 800, 880, pop01(t, P.t0 + 0.15, 0.3, 2), 0.8)
      x.save(); x.fillStyle = BONE; x.globalAlpha = 0.7 * clamp(lt - 0.3)
      for (let i = 0; i < 4; i++) x.fillRect(150 + (i % 2) * 40, 760 + i * 60, 120 - i * 10, 10)
      x.restore()
      bubble(x, 760, 600, 'THANKSBYE', pop01(t, P.t0 + 0.6, 0.22, 2.4), { size: 46, tail: 'bl' })
      L(x, 790, 1130, 'DOOR: STILL SWINGING', pop01(t, P.t0 + 1.3, 0.3, 2.4), RED, -0.04, 30)
    } },
  // ♉ walked even slower
  { sign: 'taurus', cap: 'Saw you holding it. | Walked *even slower.*', mood: lt => lt > 1.0 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      door(x, 820, 880, pop01(t, P.t0 + 0.15, 0.3, 2), 0.75)
      L(x, 790, 620, 'ETA: 6 MINUTES', pop01(t, P.t0 + 0.6, 0.3, 2.2), MINT, -0.04, 36)
      bubble(x, 560, 1120, 'no rush', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  // ♊ life story in the doorway
  { sign: 'gemini', cap: 'Stopped in the doorway. | Told *their life story.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      door(x, 820, 900, pop01(t, P.t0 + 0.15, 0.3, 2), 0.75)
      const lines = ['so anyway…', 'and THEN…', 'chapter 9…']
      const n = Math.min(2, Math.floor(Math.max(0, lt - 0.4) / 0.55))
      bubble(x, 740, 610, lines[n], pop01(t, P.t0 + 0.4 + n * 0.55, 0.22, 2.2), { size: 44, col: GOLD, tail: 'bl' })
      L(x, 800, 1140, 'LINE BEHIND: 14', pop01(t, P.t0 + 1.4, 0.3, 2.4), SKYB, 0.04, 32)
    } },
  // ♋ adopted you
  { sign: 'cancer', cap: 'You held the door? | *They adopted you.*', mood: lt => lt > 0.9 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      door(x, 820, 880, pop01(t, P.t0 + 0.15, 0.3, 2), 0.75)
      hearts(x, t, 560, 780, P.t0 + 0.9, { n: 6, life: 1.8, spread: 200, cell: 8, seed: 2 })
      L(x, 790, 610, 'FAMILY NOW', pop01(t, P.t0 + 1.0, 0.3, 2.4), PINK, -0.05, 40)
      bubble(x, 820, 1140, 'come for dinner', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  // ♌ grand entrance
  { sign: 'leo', cap: 'Assumed the door was | for *their entrance.*', mood: 'sparkle', look: [1, 0], star: { x: -150, y: -20 }, hops: [0.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { CARPET(x, 540, 1060, ease.outCubic(prog(lt, 0.1, 0.6))) },
    front(x, t, lt, P) {
      door(x, 830, 860, pop01(t, P.t0 + 0.15, 0.3, 2), 0.85)
      sparkles(x, t, 400, 820, P.t0 + 0.9, 8, 190, 0.3)
      bubble(x, 760, 600, 'you may clap', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 42, col: GOLD, tail: 'bl' })
    } },
  // ♍ wiped the handle
  { sign: 'virgo', cap: 'Said thanks. | Then *wiped the handle.*', mood: lt => lt > 1.0 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      door(x, 830, 880, pop01(t, P.t0 + 0.15, 0.3, 2), 0.3)
      const sp = pop01(t, P.t0 + 0.7, 0.3, 2)
      drawBits(x, SPRAY, SPRAY_C, 640, 900 + Math.sin(t * 12) * 6 * clamp(lt - 0.9), 16 * sp, { rot: -0.2 })
      sparkles(x, t, 780, 880, P.t0 + 1.1, 6, 120, 0.5, [SKYB, BONE])
      L(x, 790, 1140, 'GERMS: HANDLED', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 34)
    } },
  // ♎ after you
  { sign: 'libra', cap: '“No, after you.” | *Forty minutes later…*', mood: lt => lt > 1.2 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      door(x, 830, 900, pop01(t, P.t0 + 0.15, 0.3, 2), 0.75)
      const n = Math.max(1, Math.round(lerp(1, 41, ease.inCubic(prog(lt, 0.4, 2.0)))))
      bubble(x, 740, 600, 'after you!', pop01(t, P.t0 + 0.4, 0.22, 2.2), { size: 44, col: PINK, tail: 'bl' })
      L(x, 800, 1140, `AFTER YOUS: ${n}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), GOLD, 0.04, 36)
    } },
  // ♏ checked your sign first
  { sign: 'scorpio', cap: 'Checked your sign | before *walking through.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      profile(x, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt > 1.4)
      if (lt > 1.4) sparkles(x, t, 800, 860, P.t0 + 1.4 * (3.1 / 2.4), 6, 180, 0.2, [MINT, BONE])
    } },
  // ♐ kept going abroad
  { sign: 'sagittarius', cap: 'Walked right through. | *Kept going. Abroad.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [0.7],
    front(x, t, lt, P) {
      door(x, 830, 920, pop01(t, P.t0 + 0.15, 0.3, 2), 0.85)
      const k = pop01(t, P.t0 + 0.8, 0.3, 2)
      drawBits(x, PLANE, PLANE_C, 700 + lt * 60, 650 - lt * 30, 14 * k, { rot: -0.15 })
      L(x, 800, 1160, 'BACK IN: ??? MONTHS', pop01(t, P.t0 + 1.4, 0.3, 2.4), '#ff9a4a', -0.04, 30)
    } },
  // ♑ business card
  { sign: 'capricorn', cap: 'Said thanks. | Handed *a business card.*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      door(x, 860, 900, pop01(t, P.t0 + 0.15, 0.3, 2), 0.75)
      bizCard(x, 730, 860, pop01(t, P.t0 + 0.8, 0.3, 2.2), -0.06 + 0.02 * Math.sin(t * 3))
      L(x, 760, 620, 'LET’S CONNECT', pop01(t, P.t0 + 1.4, 0.3, 2.4), '#9aa5c4', 0.04, 34)
    } },
  // ♒ used the window
  { sign: 'aquarius', cap: 'Ignored the door. | *Used the window.*', mood: 'wink', look: [1, -1], star: { x: -170, y: -10 }, hops: [1.2],
    front(x, t, lt, P) {
      windowPane(x, 800, 800, pop01(t, P.t0 + 0.2, 0.3, 2), ease.inOutCubic(prog(lt, 0.6, 1.2)))
      L(x, 800, 1070, 'DOORS: TOO MAINSTREAM', pop01(t, P.t0 + 1.3, 0.3, 2.4), '#6fc3ff', -0.04, 28)
    } },
  // ♓ wept with joy
  { sign: 'pisces', cap: 'Someone held the door. | Pisces *wept.*', mood: lt => lt > 0.8 ? 'heart' : 'wide', tears: lt => lt > 0.8 ? 3 : 1, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      door(x, 830, 880, pop01(t, P.t0 + 0.15, 0.3, 2), 0.75)
      hearts(x, t, 830, 760, P.t0 + 0.9, { n: 6, life: 1.8, spread: 200, cell: 8, seed: 5 })
      bubble(x, 760, 600, 'humanity is good', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0486', key: 'C', accent: ACC, ending: 'group',
  title: 'Holding the door? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'And the door holder? | *Still holding it.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 1.4, 0.35, 2)
      door(x, 330, 690, k * 0.8, 0.8)
      L(x, 720, 690, 'HELD FOR: 2 HOURS', pop01(t, t0 + 2.0, 0.3, 2.4), GOLD, -0.04, 40)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
