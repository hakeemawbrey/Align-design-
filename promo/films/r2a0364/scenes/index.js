// r2a0364: star_advice, ADVICE ROLL CALL, "Each sign being | proud of you." (~56 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs, one warm, specific way each shows they're proud of you, with a light visual gag. Ending: callback.
//   ♈ yells your name from the crowd · ♉ shows up with your favourite cake · ♊ tells everyone, literally everyone
//   · ♋ saves every photo, frames a few · ♌ throws you a whole party · ♍ remembers every detail · ♎ makes you a cute card
//   · ♏ one quiet nod that means everything · ♐ plans a trip to celebrate · ♑ "told you so", lovingly
//   · ♒ calls you a genius and means it · ♓ cries happy tears for you
//  49.2  "Twelve ways to say | *you did it.*"
//  52.6  callback: "Taurus saved you | *the biggest slice.*" (the cake comes back)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, SERIF,
} from '../../signs3kit.js'

const ACC = '#ffb3d1', GREY = '#9aa5c4', RED = '#ff6b5a'
const M = { font: MONO, weight: 700 }
const ST = { x: -170 }
const txt = (x, s, X, Y, font, col, align = 'center') => { x.fillStyle = col; x.font = font; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, X, Y) }

const CAKE = [
  '.....F.F.F.....',
  '.....C.C.C.....',
  '..PPPPPPPPPPP..',
  '..WWPWWPWWPWW..',
  '..SSSSSSSSSSS..',
  '..SRSSSRSSSRS..',
  'PPPPPPPPPPPPPPP',
  'WWPWWWPWWWPWWWP',
  'SSSSSSSSSSSSSSS',
  'SSRSSSSRSSSSRSS',
  'SSSSSSSSSSSSSSS',
  'KKKKKKKKKKKKKKK',
]
const CAKE_C = { F: '#ffb34a', C: BONE, P: PINK, W: '#ffffff', S: '#f3d6a8', R: RED, K: GREY }
const SLICE = [
  'P.........',
  'PPP.......',
  'WPPPP.....',
  'SSSSSPP...',
  'SRSSSSSPP.',
  'SSSSRSSSSP',
  'SSSSSSSSSS',
]
const CONF = ['#ff6b5a', GOLD, MINT, SKYB, PINK, LAV]
function confetti(x, t, t0, cx, cy, n = 24) {
  const tt = t - t0; if (tt < 0) return
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2, sp = 160 + (i * 37) % 120
    const X = cx + Math.cos(a) * sp * Math.min(1, tt * 2), Y = cy + Math.sin(a) * sp * Math.min(1, tt * 2) + 120 * tt * tt
    x.save(); x.translate(X, Y); x.rotate(tt * 6 + i); x.globalAlpha = clamp(2.4 - tt)
    x.fillStyle = INK; x.fillRect(-10, -6, 20, 12); x.fillStyle = CONF[i % 6]; x.fillRect(-8, -4, 16, 8); x.restore()
  }
}
function frameProp(x, cx, cy, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -142, 260, 300)
  x.fillStyle = INK; x.fillRect(-130, -150, 260, 300)
  x.fillStyle = GOLD; x.fillRect(-124, -144, 248, 288)
  x.fillStyle = SKYB; x.fillRect(-100, -120, 200, 240)
  x.fillStyle = '#5fd068'; x.fillRect(-100, 60, 200, 60)
  // you, a tiny proud stick-star in the photo
  x.fillStyle = GOLD; x.beginPath(); for (let i = 0; i < 10; i++) { const r = i % 2 ? 22 : 50, a = -Math.PI / 2 + i * Math.PI / 5; x.lineTo(Math.cos(a) * r, -10 + Math.sin(a) * r) } x.closePath(); x.fill()
  txt(x, 'YOU!', 0, 90, `800 30px ${INTER}`, INK)
  x.restore()
}
function notebook(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-156, -186, 312, 372); x.fillStyle = BONE; x.fillRect(-150, -180, 300, 360)
  x.fillStyle = RED; x.fillRect(-110, -180, 4, 360)
  txt(x, 'YOUR WINS', 10, -140, `700 30px ${MONO}`, INK)
  ;['• aced it', '• said no!', '• new pasta!', '• p. 12 of 40…'].forEach((s, i) => txt(x, s, -94, -76 + i * 56, `800 30px ${INTER}`, '#3a3260', 'left'))
  x.restore()
}
function card(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.06); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -172, 300, 360)
  x.fillStyle = INK; x.fillRect(-150, -180, 300, 360); x.fillStyle = '#ffe3ef'; x.fillRect(-144, -174, 288, 348)
  x.fillStyle = PINK; x.beginPath(); x.moveTo(0, 40); x.bezierCurveTo(-120, -40, -60, -130, 0, -70); x.bezierCurveTo(60, -130, 120, -40, 0, 40); x.fill()
  txt(x, 'so proud', 0, 110, `italic 600 46px ${SERIF}`, INK)
  x.restore()
}
const TICKET = [
  'KKKKKKKKKKKKKKKK',
  'KGGGGGGGGKGGGGGK',
  'KGWWWWWGGKGGWGGK',
  'KGGGGGGGG.GGWGGK',
  'KGWWWGGGGKGGWGGK',
  'KGGGGGGGGKGGGGGK',
  'KKKKKKKKKKKKKKKK',
]

const CAMEOS = [
  { sign: 'aries', cap: 'Yells your name | *from the crowd.*', mood: 'wide', look: [1, 0], star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'THAT’S MY | FRIEND!!', pop01(t, P.t0 + 0.25, 0.25, 2.4), { size: 60, col: GOLD, tail: 'bl' })
      label(x, 790, 1060, 'VOLUME: 100', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: RED, color: BONE, rot: -0.05, ...M })
    } },
  { sign: 'taurus', cap: 'Shows up with | *your favourite cake.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 650, 'HOMEMADE ♥', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: MINT, rot: 0.05, ...M })
    } },
  { sign: 'gemini', cap: 'Tells everyone. | *Literally everyone.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(47, 1 + Math.floor(lt * 22))
      bubble(x, 790, 740, 'did you | HEAR?!', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 58, col: BONE, tail: 'bl' })
      label(x, 790, 1060, `PEOPLE TOLD: ${n}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, ...M })
    } },
  { sign: 'cancer', cap: 'Saves every photo. | *Frames a few.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      frameProp(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 0.05)
      hearts(x, t, 560, 1100, P.t0 + 1.0, { n: 4, life: 1.6, spread: 80, cell: 7, seed: 4 })
    } },
  { sign: 'leo', cap: 'Throws you | *a whole party.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      label(x, 790, 780, 'GUEST OF HONOUR:', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 30, bg: GOLD, rot: -0.04, ...M })
      label(x, 790, 940, 'YOU', pop01(t, P.t0 + 0.8, 0.3, 2.6), { size: 80, bg: PINK, rot: 0.04, ...M })
      confetti(x, t, P.t0 + 0.9, 790, 860)
    } },
  { sign: 'virgo', cap: 'Remembers | *every detail you said.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) { notebook(x, 770, 860, 0.9 * pop01(t, P.t0 + 0.2, 0.3, 2)) } },
  { sign: 'libra', cap: 'Makes you | *the cutest card.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2))
      sparkles(x, t, 790, 860, P.t0 + 0.8, 6, 190, 0.2)
    } },
  { sign: 'scorpio', cap: 'One quiet nod. | *Means everything.*', mood: lt => lt > 1.0 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    squash: lt => (lt > 0.8 && lt < 1.3) ? 0.12 * Math.sin(Math.PI * (lt - 0.8) / 0.5) : 0,
    front(x, t, lt, P) {
      label(x, 790, 760, '*nods*', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 60, bg: LAV, rot: -0.04, font: INTER, weight: 800 })
      label(x, 790, 1000, 'TRANSLATION: SO PROUD', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: '#c97bff', color: BONE, rot: 0.04, ...M })
    } },
  { sign: 'sagittarius', cap: 'Plans a trip | *to celebrate you.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, TICKET, { K: INK, G: '#ff9a4a', W: BONE }, 760, 840, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.08, outline: null })
      drawBits(x, TICKET, { K: INK, G: SKYB, W: BONE }, 830, 930, 18 * pop01(t, P.t0 + 0.45, 0.3, 2), { rot: 0.08, outline: null })
      label(x, 790, 1120, 'TICKETS: 2. BAGS: PACKED', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 26, bg: GOLD, rot: -0.04, ...M })
    } },
  { sign: 'capricorn', cap: 'Says “told you so.” | *Lovingly.*', mood: lt => lt > 1.1 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'i knew | you could.', pop01(t, P.t0 + 0.3, 0.25, 2.4), { size: 58, col: BONE, tail: 'bl' })
      label(x, 790, 1060, 'PROUD: SINCE DAY ONE', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 28, bg: '#7fd1c7', rot: 0.04, ...M })
    } },
  { sign: 'aquarius', cap: 'Calls you a genius. | *Means it.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'actual | GENIUS.', pop01(t, P.t0 + 0.3, 0.25, 2.4), { size: 64, col: SKYB, tail: 'bl' })
      label(x, 790, 1060, 'NOT A JOKE. A FACT.', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, ...M })
    } },
  { sign: 'pisces', cap: 'Cries happy tears. | *For you.*', mood: 'heart', look: [1, 0], star: ST, tears: 3,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'i’m just | so happy', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 52, col: BONE, tail: 'bl' })
      hearts(x, t, 790, 1080, P.t0 + 0.6, { n: 6, life: 2, spread: 240, cell: 8, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2a0364', key: 'E', accent: ACC, ending: 'callback',
  title: 'Each sign being | *proud of you.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve ways to say | *you did it.*' },
  last: {
    text: 'Taurus saved you | *the biggest slice.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.35, 2.2)
      drawBits(x, SLICE, { P: PINK, W: '#ffffff', S: '#f3d6a8', R: RED }, 540, 1140, 34 * k)
      if (k > 0.9) { sparkles(x, t, 540, 1140, t - lt + 0.9, 8, 220, 0.2); hearts(x, t, 540, 1000, t - lt + 1.0, { n: 5, life: 2, spread: 300, cell: 8, seed: 3 }) }
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
