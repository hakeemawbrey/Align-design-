// r2a0249: star_advice, ADVICE ROLLCALL, "What each sign | needs at work." (~57 s vertical, signs3kit social cut, music: lofi · E)
//   0.0–3.6    "What each sign | *needs at work.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one warm, specific work need per sign (3.8 s each), each with a light visual gag:
//              ♈ a goal to chase (and a finish flag) · ♉ a comfy chair, snacks on time · ♊ variety, ten tabs thriving
//              · ♋ a team that feels like family · ♌ credit out loud (an APPLAUSE sign) · ♍ a clear process and a
//              label maker · ♎ balance, work and life · ♏ trust and a door that closes · ♐ freedom, a hammock office
//              · ♑ a ladder worth climbing · ♒ room for weird ideas · ♓ kindness and a quiet corner
//  49.2        "Different needs. | *Same team.*"
//  52.6        callback: "The applause sign? | *For everyone now.*" (Leo's sign from card 5)  The sign lights up over the whole team.
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, SIGN_IDS,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'
import { card, txt, laptop, CREAM, RED, ORANGE, BROWN, GREY, DEEP, SUN, GREEN, clamp, ease, lerp, prog } from './props.js'

const ACC = SKYB
const ST = { x: -170 }
const lab = (x, cx, cy, s, k, o = {}) => label(x, cx, cy, s, k, { size: 32, font: MONO, weight: 700, ...o })

const FLAG = ['KWKWKWKW', 'WKWKWKWK', 'KWKWKWKW', 'WKWKWKWK', 'P.......', 'P.......', 'P.......', 'P.......', 'P.......']
const CHAIR = ['.PPPPPP.', 'PPPPPPPP', 'PPWPPPPP', 'PPPPPPPP', 'PPPPPPPP', 'PPPPPPPPPP', 'PPPPPPPPPP', '.K......K.', '.K......K.']
const DONUT = ['..PPPP..', '.PPSPPP.', 'PPP..PPP', 'PP....PP', 'PPP..PPP', '.BBBBBB.', '..BBBB..']
const DONUT_C = { P: PINK, S: '#ffffff', B: '#c98f2a' }
const MUG = ['WWWWWWW...', 'WHHHHHWWW.', 'WHHHHHW.W.', 'WHHHHHWWW.', 'WHHHHHW...', '.WWWWW....']
const DOOR = ['KKKKKKKK', 'KDDDDDDK', 'KDLLLLDK', 'KDLLLLDK', 'KDDDDDDK', 'KDLLLLDK', 'KDLLLLDY', 'KDLLLLDK', 'KDDDDDDK', 'KKKKKKKK']
const DOOR_C = { K: INK, D: BROWN, L: '#a8643a', Y: GOLD }
const PALM = ['..GG.GG..', '.GGGGGGG.', 'GG..T..GG', '....T....', '....T....', '....T....', '...TT....', '...T.....']
const LADDER = ['W....W', 'WWWWWW', 'W....W', 'W....W', 'WWWWWW', 'W....W', 'W....W', 'WWWWWW', 'W....W', 'W....W', 'WWWWWW', 'W....W']
const BULB = ['.A...A.', '..A.A..', '..YYY..', '.YYYYY.', 'YYWYYYY', 'YYYYYYY', '.YYYYY.', '..GGG..', '..GGG..']
const BULB_C = { A: MINT, Y: SUN, W: '#ffffff', G: GREY }
const PLANT = ['..G.G..', '.GGGGG.', 'GG.G.GG', '...G...', '.TTTTT.', '.TTTTT.', '..TTT..']
const PHONES = ['..KKKKKKKKKK..', '.KK........KK.', 'KK..........KK', 'K............K', 'PPP........PPP', 'PPP........PPP', '.P..........P.']

/** a lit APPLAUSE sign (blinking bulbs around the edge) */
function applause(x, t, cx, cy, k, { w = 340, h = 110, size = 46 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 10, -h / 2 - 10, w + 20, h + 20); x.fillStyle = RED; x.fillRect(-w / 2, -h / 2, w, h)
  const n = 10
  for (let i = 0; i < n; i++) for (const yy of [-h / 2 - 2, h / 2 - 8]) { x.fillStyle = (i + Math.floor(t * 6)) % 2 ? SUN : '#fff1b0'; x.fillRect(-w / 2 + 10 + i * (w - 30) / (n - 1), yy, 10, 10) }
  txt(x, 'APPLAUSE', 0, 3, { size, font: MONO, weight: 700, color: '#fff1b0' })
  x.restore()
}
/** a balance scale: two pans, tilt -1…1 */
function scale(x, cx, cy, k, tilt, a, b) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-10, -120, 20, 240); x.fillRect(-80, 110, 160, 20)
  x.save(); x.translate(0, -120); x.rotate(tilt * 0.3)
  x.fillStyle = GOLD; x.fillRect(-170, -8, 340, 16)
  for (const [d, s] of [[-1, a], [1, b]]) {
    x.save(); x.translate(d * 160, 0); x.rotate(-tilt * 0.3)
    x.fillStyle = INK; x.fillRect(-3, 0, 6, 70); x.fillStyle = GOLD; x.fillRect(-70, 70, 140, 18)
    label(x, 0, 40, s, 1, { size: 26, font: MONO, weight: 700, bg: d < 0 ? SKYB : PINK, rot: 0 })
    x.restore()
  }
  x.restore(); x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'A goal to chase. | *And a high five.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', star: ST, hops: [0.5, 1.0, 1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, FLAG, { K: INK, W: '#ffffff', P: GREY }, 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.06 * Math.sin(t * 4) })
      lab(x, 790, 1090, 'GOAL: CRUSHED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { bg: MINT, rot: -0.04 })
      sparkles(x, t, 800, 820, P.t0 + 1.3, 6, 140, 0.4)
    } },
  { sign: 'taurus', cap: 'A comfy chair. | *Snacks on time.*', mood: lt => lt > 1.2 ? 'heart' : 'sleepy', star: { x: -170, y: -70, s: 260 },
    back(x, t, lt, P, F) { drawBits(x, CHAIR, { P: '#6b62a8', W: LAV, K: INK }, 370, 950, 30 * P.k) },
    front(x, t, lt, P) {
      drawBits(x, DONUT, DONUT_C, 790, 900, 20 * pop01(t, P.t0 + 0.8, 0.35, 2.2))
      lab(x, 790, 700, 'SNACK O’CLOCK: 3:00', pop01(t, P.t0 + 1.3, 0.3, 2.2), { bg: PINK, rot: 0.04, size: 30 })
    } },
  { sign: 'gemini', cap: 'Variety. | *Ten tabs, all thriving.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.6) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(10, 1 + Math.floor(lt * 6))
      laptop(x, 790, 960, 1.05 * pop01(t, P.t0 + 0.2, 0.35, 2), () => {
        for (let i = 0; i < n; i++) { x.fillStyle = [PINK, SKYB, MINT, SUN, LAV][i % 5]; x.fillRect(-120 + i * 24, -70, 22, 18) }
        txt(x, 'ALL GOING', 0, 10, { size: 28, font: MONO, weight: 700, color: BONE })
      })
      lab(x, 790, 700, 'BORED: NEVER', pop01(t, P.t0 + 1.4, 0.3, 2.2), { bg: SUN, rot: -0.04 })
    } },
  { sign: 'cancer', cap: 'A team that feels | like *family.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, MUG, { W: CREAM, H: PINK }, 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      lab(x, 770, 900, 'WORK FAM', pop01(t, P.t0 + 0.6, 0.3, 2), { bg: BONE, rot: 0, size: 28 })
      hearts(x, t, 780, 800, P.t0 + 1.0, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 2 })
      bubble(x, 790, 1100, 'lunch together?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Credit. | *Out loud.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: { x: -150 }, hops: [1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      applause(x, t, 790, 700, pop01(t, P.t0 + 0.6, 0.35, 2.2), { w: 300, h: 100, size: 40 })
      bubble(x, 790, 900, 'great work, Leo!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 34, col: SUN, tail: 'bl' })
      lab(x, 790, 1100, 'GLOW: MAXIMUM', pop01(t, P.t0 + 1.7, 0.3, 2.2), { bg: ORANGE, rot: -0.04 })
      sparkles(x, t, 390, 840, P.t0 + 1.2, 6, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'A clear process. | And a *label maker.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 760, 900, 200, 120, k, { bg: GREY, rot: 0 }, () => { x.fillStyle = INK; x.fillRect(-70, -36, 140, 40); x.fillStyle = MINT; x.fillRect(-60, -28, 120, 24) })
      const out = ease.outCubic(prog(lt, 0.6, 1.4))
      if (out > 0) lab(x, 760 + 180 * out, 960, 'STAPLER', 1, { bg: CREAM, rot: 0.02, size: 28 })
      lab(x, 790, 700, 'EVERYTHING: LABELLED', pop01(t, P.t0 + 1.7, 0.3, 2.2), { bg: MINT, rot: 0.04, size: 28 })
    } },
  { sign: 'libra', cap: 'Balance. | Work *and* life.', mood: lt => lt > 1.4 ? 'heart' : 'squint', star: ST,
    front(x, t, lt, P) {
      const tilt = lt < 1.4 ? Math.sin(t * 3) * (1 - prog(lt, 0.8, 1.4)) : 0
      scale(x, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), tilt, 'WORK', 'LIFE')
      lab(x, 790, 1130, 'EVEN. FINALLY.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { bg: PINK, rot: -0.04 })
    } },
  { sign: 'scorpio', cap: 'Trust. | And a door *that closes.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, DOOR, DOOR_C, 800, 880, 30 * pop01(t, P.t0 + 0.2, 0.35, 2))
      card(x, 800, 760, 200, 56, pop01(t, P.t0 + 0.7, 0.3, 2.2), { bg: CREAM, rot: 0.04 }, () => txt(x, 'FOCUS ZONE', 0, 2, { size: 26, font: MONO, weight: 700 }))
      bubble(x, 420, 620, 'ahh. quiet.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, col: LAV, tail: 'bc' })
    } },
  { sign: 'sagittarius', cap: 'Freedom. | An *office anywhere.*', mood: 'sparkle', look: [-1, 0], star: { x: 160 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, PALM, { G: '#5fd068', T: BROWN }, 300, 780, 26 * pop01(t, P.t0 + 0.15, 0.35, 2))
      laptop(x, 320, 1060, 0.7 * pop01(t, P.t0 + 0.6, 0.35, 2), () => txt(x, 'ONLINE ✓', 0, 0, { size: 34, font: MONO, weight: 700, color: MINT }))
      lab(x, 320, 620, 'DESK: A BEACH', pop01(t, P.t0 + 1.4, 0.3, 2.2), { bg: SUN, rot: -0.04 })
    } },
  { sign: 'capricorn', cap: 'A ladder | *worth climbing.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.35, 2)
      drawBits(x, LADDER, { W: '#c98f2a' }, 800, 880, 30 * k)
      const up = ease.inOutCubic(prog(lt, 0.5, 1.6))
      if (k > 0.5) signChar(x, t, 'capricorn', 800, lerp(1040, 660, up), 120, { mood: 'happy', seed: 19, glyph: false })
      lab(x, 800, 1120, 'NEXT RUNG: YOURS', pop01(t, P.t0 + 1.7, 0.3, 2.2), { bg: MINT, rot: 0.04 })
    } },
  { sign: 'aquarius', cap: 'Room for | *weird ideas.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const on = lt > 0.8
      drawBits(x, BULB, on ? BULB_C : { ...BULB_C, Y: GREY, W: GREY }, 790, 830, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      if (on) sparkles(x, t, 790, 800, P.t0 + 0.8 * 1.29, 8, 170, 0.3, [SUN, MINT, BONE])
      bubble(x, 790, 1090, 'what if… | moon office?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Kindness. | And a *quiet corner.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', tears: 2, star: ST,
    front(x, t, lt, P, F) {
      drawBits(x, PLANT, { G: '#5fd068', T: ORANGE }, 820, 960, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      drawBits(x, PHONES, { K: INK, P: LAV }, F.x, F.top + 20, 20 * pop01(t, P.t0 + 0.5, 0.3, 2))
      bubble(x, 800, 700, 'you’re doing | great!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 36, col: PINK, tail: 'bl' })
      lab(x, 800, 1130, 'HAPPY TEARS ONLY', pop01(t, P.t0 + 1.7, 0.3, 2.2), { bg: SKYB, rot: -0.04 })
    } },
]

const F = makeFilm({
  id: 'r2a0249', key: 'E', accent: ACC, ending: 'callback',
  title: 'What each sign | *needs at work.*',
  cameos: CAMEOS,
  group: { cap: 'Different needs. | *Same team.*' },
  last: {
    text: 'The applause sign? | *For everyone now.*',
    draw(x, t, lt) {
      const t0 = t - lt
      applause(x, t, 540, 860, pop01(t, t0 + 0.4, 0.45, 1.8), { w: 460, h: 140, size: 62 })
      for (let i = 0; i < 12; i++) {
        const s = pop01(t, t0 + 1.0 + i * 0.06, 0.35, 2)
        if (s > 0.01) signChar(x, t, SIGN_IDS[i], 540 + ((i % 6) - 2.5) * 150, 1120 + Math.floor(i / 6) * 180, 140 * s, { mood: 'sparkle', seed: 60 + i, tears: i === 11 ? 2 : 0, glyph: false, hops: [t0 + 1.6 + i * 0.05] })
      }
      sparkles(x, t, 540, 860, t0 + 0.7, 10, 280, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
