// r2a0496: star_advice, ADVICE SOLO (scorpio), "Your intensity | *is love, Scorpio.*" (signs3kit social cut, music: lofi · D).
// Nine cards: a relatable Scorpio truth + a warm reframe, one light gag each. Ending: callback.
//   remembers everything (the coffee order, noted) · stares a little long (paying attention) · trust loads slowly
//   · all in (heart battery) · small talk drains you · studied their whole chart · quiet isn't cold · your
//   people's bodyguard · forgives slowly (hourglass)
//   group "Deep is not | *too much.*"   last "They noticed | *your order too.*" (the coffee notebook, paid off)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, GLYPH_FONT,
} from '../../signs3kit.js'

const ACC = '#ff5a7a', CREAM = '#fff4e2', RED = '#e23d4e', BROWN = '#8a4a2e', SLATE = '#9aa5c4'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

function paper(x, cx, cy, w, h, k, rot, fn, bg = CREAM) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  fn && fn(); x.restore()
}
const CUP = ['.W.W.W....', '..W.W.....', 'KKKKKKKK..', 'KBBBBBBKKK', 'KBBBBBBK.K', 'KBBBBBBK.K', 'KBBBBBBKKK', '.KBBBBK...', '..KKKK....']
const CUP_C = { W: '#ffffff', K: INK, B: CREAM }
const GLASS = ['..KKKKK.....', '.KWWWWWK....', 'KWWSSWWWK...', 'KWSWWWWWK...', 'KWWWWWWWK...', 'KWWWWWWWK...', '.KWWWWWK....', '..KKKKKBB...', '.......BBB..', '........BBB.', '.........BB.']
const GLASS_C = { K: INK, W: '#cfefff', S: '#ffffff', B: BROWN }
const SHADES = ['KKKKK.KKKKK', 'KKKKKKKKKKK', '.KKK...KKK.']
const HOUR = ['KKKKKKKKK', '.KYYYYYK.', '..KYYYK..', '...KYK...', '....K....', '...K.K...', '..K..YK..', '.K.YYYYK.', 'KKKKKKKKK']
const HOUR_C = { K: INK, Y: GOLD }
const DOOR = ['KKKKKKKKKK', 'KPPPPPPPPK', 'KPKKPPKKPK', 'KPKKPPKKPK', 'KPPPPPPPPK', 'KPPPPPPGPK', 'KPKKPPKKPK', 'KPKKPPKKPK', 'KPPPPPPPPK', 'KPPPPPPPPK']

function wheel(x, cx, cy, R, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, R + 10, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#2a2350'; x.beginPath(); x.arc(0, 0, R, 0, Math.PI * 2); x.fill()
  x.strokeStyle = 'rgba(239,230,214,0.5)'; x.lineWidth = 3; x.beginPath(); x.arc(0, 0, R * 0.62, 0, Math.PI * 2); x.stroke()
  const G = '♈♉♊♋♌♍♎♏♐♑♒♓'
  x.fillStyle = BONE; x.font = `700 ${Math.round(R * 0.22)}px ${GLYPH_FONT}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + t * 0.15; x.fillText(G[i] + '︎', Math.cos(a) * R * 0.81, Math.sin(a) * R * 0.81); x.strokeStyle = 'rgba(239,230,214,0.25)'; x.beginPath(); x.moveTo(Math.cos(a + 0.26) * R * 0.62, Math.sin(a + 0.26) * R * 0.62); x.lineTo(Math.cos(a + 0.26) * R, Math.sin(a + 0.26) * R); x.stroke() }
  x.strokeStyle = ACC; x.lineWidth = 4; x.beginPath(); x.moveTo(-R * 0.4, -R * 0.2); x.lineTo(R * 0.3, R * 0.35); x.lineTo(R * 0.1, -R * 0.45); x.closePath(); x.stroke()
  x.restore()
}

const S = 'scorpio'
const CAMEOS = [
  { sign: S, cap: 'You remember everything. | *That’s devotion.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      paper(x, 790, 840, 280, 330, pop01(t, P.t0 + 0.15, 0.3, 2), 0.05, () => {
        x.fillStyle = '#c9b8e8'; for (let i = 0; i < 6; i++) x.fillRect(-120, -110 + i * 46, 240, 3)
        x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.fillText('THEIR ORDER:', 0, -130)
        x.font = `700 24px ${MONO}`; const L2 = ['oat milk', 'extra hot', 'one sugar', 'no lid', '(Tuesdays: two)']
        L2.forEach((s, i) => { if (lt > 0.4 + i * 0.25) x.fillText(s, 0, -80 + i * 46) })
      })
      L(x, 790, 1110, 'NOTED. FOREVER.', pop01(t, P.t0 + 1.7, 0.3, 2.4), LAV, -0.04, 32)
    } },
  { sign: S, cap: 'You stare a little long. | *You’re listening.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, GLASS, GLASS_C, 560, 820, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 })
      bubble(x, 800, 700, 'go on…', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 42, col: LAV, tail: 'bl' })
      bubble(x, 800, 900, 'tell me more.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 790, 1100, 'FOCUS: TOTAL', pop01(t, P.t0 + 1.8, 0.3, 2.4), ACC, 0.04, 32)
    } },
  { sign: S, cap: 'You trust slowly. | *Worth the wait.*', mood: lt => lt > 1.6 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      paper(x, 790, 840, 330, 170, k, 0.03, () => {
        x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.fillText('TRUST: LOADING', 0, -42)
        const p = clamp((lt - 0.3) / 1.4)
        x.fillStyle = INK; x.fillRect(-140, 0, 280, 44); x.fillStyle = '#2a2350'; x.fillRect(-134, 6, 268, 32)
        x.fillStyle = MINT; x.fillRect(-134, 6, 268 * p, 32)
      })
      L(x, 790, 1060, lt > 1.6 ? 'UNLOCKED: FOR LIFE' : '…', pop01(t, P.t0 + 0.5, 0.3, 2.2), lt > 1.6 ? MINT : BONE, -0.04, 32)
    } },
  { sign: S, cap: 'You go all in. | *Save some for you.*', mood: lt => lt > 1.3 ? 'happy' : 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      paper(x, 790, 860, 300, 150, k, 0.04, () => {
        x.fillStyle = INK; x.fillRect(-130, -50, 240, 100); x.fillRect(110, -22, 20, 44)
        const after = lt >= 1.3
        x.fillStyle = ACC; x.fillRect(-122, -42, 224 * (after ? 0.75 : 1), 84)
        if (after) { x.fillStyle = MINT; x.fillRect(-122 + 224 * 0.75, -42, 224 * 0.25, 84) }
        x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.fillText(after ? 'THEM' : 'ALL OF IT', after ? -38 : -10, 2)
        if (after) { x.font = `800 24px ${INTER}`; x.fillText('YOU', 74, 2) }
      }, '#2a2350')
      L(x, 790, 650, 'HEART BATTERY', pop01(t, P.t0 + 0.4, 0.3, 2), PINK, 0.04, 32)
      L(x, 790, 1060, 'KEEP SOME FOR YOU', pop01(t, P.t0 + 1.35 * 3.1 / 2.4, 0.3, 2.4), MINT, -0.04, 30)
      if (lt > 1.3) hearts(x, t, 790, 1000, P.t0 + 1.35 * 3.1 / 2.4, { n: 4, life: 1.4, spread: 200, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Small talk drains you. | *Go deep.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      bubble(x, 800, 660, 'nice weather, huh?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, col: SLATE, tail: 'bl' })
      if (lt > 0.7 && lt < 1.3) L(x, 800, 660, 'SKIP', 1, RED, 0.1, 44)
      bubble(x, 800, 900, 'what are you | afraid of?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
      L(x, 790, 1110, 'FRIENDS IN 4 MINUTES', pop01(t, P.t0 + 1.8, 0.3, 2.4), MINT, -0.04, 28)
    } },
  { sign: S, cap: 'You read their whole chart. | *That’s care.*', mood: lt => lt > 1.4 ? 'heart' : 'wink', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      wheel(x, 790, 820, 150, pop01(t, P.t0 + 0.15, 0.35, 2), t)
      L(x, 790, 1080, 'MOON IN CANCER. NOTED.', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 26)
      sparkles(x, t, 790, 820, P.t0 + 1.2, 7, 170, 0.4)
    } },
  { sign: S, cap: 'Quiet isn’t cold. | *You’re recharging.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, DOOR, { K: INK, P: '#5a3a7a', G: GOLD }, 800, 880, 30 * pop01(t, P.t0 + 0.15, 0.3, 2))
      L(x, 800, 800, 'RECHARGING', pop01(t, P.t0 + 0.6, 0.3, 2.2), LAV, 0.05, 34)
      L(x, 800, 1130, 'BACK SOON ♡', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, -0.04, 30)
    } },
  { sign: S, cap: 'You’d guard your people. | *Tell them.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: { x: -150 }, hops: [1.3],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, SHADES, { K: INK }, F.x, F.top + F.S * 0.32, 10 * k)
      if (k > 0.01) signChar(x, t, 'pisces', 790, 960, 200 * k, { mood: 'happy', look: [-1, 0], seed: 19, glyph: false, tears: 2 })
      L(x, 790, 680, 'SECURITY: SCORPIO', pop01(t, P.t0 + 0.7, 0.3, 2.2), GOLD, 0.04, 30)
      bubble(x, 790, 1150, 'you’re safe w/ me', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, tail: 'bc' })
    } },
  { sign: S, cap: 'You forgive slowly. | *That’s okay too.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, HOUR, HOUR_C, 790, 860, 26 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: lt > 1.2 ? Math.min(Math.PI, (lt - 1.2) * 6) : 0 })
      L(x, 790, 1110, 'TAKE YOUR TIME', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0496', key: 'D', accent: ACC, solo: S,
  title: 'Your intensity | *is love, Scorpio.*',
  cameos: CAMEOS,
  ending: 'callback',
  group: { cap: 'Deep is not | *too much.*', mood: 'heart' },
  last: {
    text: 'They noticed | *your order too.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.6, 0.4, 2)
      drawBits(x, CUP, CUP_C, 400, 1060, 28 * k)
      drawBits(x, CUP, CUP_C, 680, 1060, 28 * k)
      label(x, 540, 1300, 'OAT MILK · EXTRA HOT', pop01(t, t - lt + 1.3, 0.3, 2.4), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 540, 960, t - lt + 1.4, { n: 7, life: 2.0, spread: 400, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
