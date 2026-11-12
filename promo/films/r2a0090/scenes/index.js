// r2a0090: star_advice ADVICE ROLLCALL, "Each sign on | a long call." (~57 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order on a long phone call with you, one warm, specific line each with a light visual gag:
//   ♈ paces every room, still listening · ♉ got comfy, here for all of it · ♊ three side topics, all good
//   · ♋ remembers every detail · ♌ hypes you up the whole time · ♍ takes notes, makes you a plan · ♎ sees both sides, kindly
//   · ♏ quiet for an hour, then the perfect advice · ♐ calls from a hike (you hear birds) · ♑ schedules it, shows up on time
//   · ♒ starts with hello, ends in space · ♓ cries with you, then makes you laugh
//  49.2   "Twelve signs. | *One good call.*"
//  52.6   CALLBACK: "Hour four. | Taurus is *still here.*"  Taurus, still in the comfy chair.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PEACH = '#ffb38a', RED = '#e23d4e', GREEN = '#5fd068', BROWN = '#8a4a2e', YEL = '#ffd23a'

// ── props
const CHAIR = ['.RRRRRRRRR.', 'RRRRRRRRRRR', 'RRrRRRRRrRR', 'RRrRRRRRrRR', 'RRRRRRRRRRR', 'RRCCCCCCCRR', 'RRCCCCCCCRR', 'RRRRRRRRRRR', '.K.......K.']
const CHAIR_C = { R: '#c97bff', r: '#a35ee0', C: LAV, K: BROWN }
const PRINT = ['.KK.', 'KKKK', 'KKKK', '.KK.', '....', 'K.K.']
const PAD = ['KKKKKKKKK', 'WWWWWWWWW', 'WLLLLLLWW', 'WWWWWWWWW', 'WLLLLLWWW', 'WWWWWWWWW', 'WLLLLLLLW', 'WWWWWWWWW', 'WLLLWWWWW', 'WWWWWWWWW']
const SCALE = ['....K....', '...KKK...', 'KKKKKKKKK', 'K...K...K', 'K...K...K', 'YY..K..YY', 'YY..K..YY', '....K....', '..KKKKK..']
const MOUNT = ['......W......', '.....WWW.....', '....GGGGG....', '...GGGGGGG...', '..GGGGGGGGG..', '.GGGGGGGGGGG.', 'GGGGGGGGGGGGG']
const BIRD = ['K...K', '.K.K.', '..K..']
const PLANET = ['...PPPPP...', '..PPPPPPP..', 'RRRRRRRRRRR', '.PPPPPPPPP.', '..PPPPPPP..', '...PPPPP...']
function clock(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 100, 0, Math.PI * 2); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 90, 0, Math.PI * 2); x.fill()
  x.strokeStyle = INK; x.lineCap = 'round'; x.lineWidth = 9; x.beginPath(); x.moveTo(0, 0); x.lineTo(0, -56); x.stroke(); x.lineWidth = 7; x.beginPath(); x.moveTo(0, 0); x.lineTo(44, 0); x.stroke()
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Paces every room. | *Still listening.*', mood: 'happy', look: [1, 0], star: { x: -170 }, hops: [0.4, 0.9, 1.4, 1.9],
    front(x, t, lt, P) {
      const n = Math.min(8, Math.floor(lt * 4))
      for (let i = 0; i < n; i++) drawBits(x, PRINT, { K: '#ff8a6a' }, 660 + i * 40, 1100 - (i % 2) * 40 - i * 20, 9, { rot: -0.4 })
      bubble(x, 800, 680, 'mm-hm! go on!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Got comfy. | *Here for all of it.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: 0, y: -10, s: 260 },
    back(x, t, lt, P) { drawBits(x, CHAIR, CHAIR_C, 540, 940, 34 * pop01(t, P.t0 + 0.05, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 540, 650, 'SETTLED IN', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Three side topics. | *All of them good.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 760, 660, 'oh wait, also—', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, tail: 'bl' })
      bubble(x, 830, 830, 'ok but listen', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 34, col: MINT, tail: 'bl' })
      bubble(x, 770, 1000, 'back to you!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, col: PINK, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Remembers every detail. | *Asks next week.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PAD, { K: SKYB, W: '#fff4e2', L: '#9aa5c4' }, 800, 860, 26 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: 0.05 })
      label(x, 790, 1120, 'HOW DID IT GO?', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Hypes you up | *the whole time.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const L = ['YOU’RE AMAZING', 'ICONIC', 'GO YOU']
      for (let i = 0; i < 3; i++) label(x, 790 + (i - 1) * 30, 680 + i * 170, L[i], pop01(t, P.t0 + 0.3 + i * 0.45, 0.3, 2.4), { size: 34, bg: [GOLD, PINK, MINT][i], rot: (i % 2 ? 0.05 : -0.05) })
      sparkles(x, t, 790, 860, P.t0 + 1.4, 7, 200, 0.4)
    } },
  { sign: 'virgo', cap: 'Takes notes. | *Makes you a plan.*', mood: 'squint', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 880); x.rotate(-0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-140, -180, 280, 360); x.fillStyle = '#fff4e2'; x.fillRect(-132, -172, 264, 344)
        x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.fillText('YOUR PLAN', 0, -130)
        const n = Math.floor(clamp((lt - 0.4) / 1.2) * 4.99)
        for (let i = 0; i < 4; i++) { x.fillStyle = INK; x.fillRect(-110, -90 + i * 62, 30, 30); x.fillStyle = '#fff4e2'; x.fillRect(-105, -85 + i * 62, 20, 20); if (i < n) { x.fillStyle = GREEN; x.fillRect(-103, -83 + i * 62, 16, 16) } x.fillStyle = '#9aa5c4'; x.fillRect(-64, -82 + i * 62, 150 - i * 16, 14) }
        x.restore()
      }
    } },
  { sign: 'libra', cap: 'Sees both sides. | *Kindly.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: lt => [Math.sin(lt * 3) > 0 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SCALE, { K: '#d8dbe8', Y: GOLD }, 800, 860, 26 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: Math.sin(t * 2) * 0.06 * (1 - clamp((lt - 1) * 2)) })
      label(x, 790, 1110, 'BALANCED + GENTLE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Quiet for an hour. | Then *the perfect advice.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      if (lt < 1.3) bubble(x, 800, 820, '…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 60, col: LAV, tail: 'bl' })
      else bubble(x, 800, 820, 'you already | know. ♥', pop01(t, P.t0 + 1.3 * 1.29, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 790, 1100, 'WORTH THE WAIT', pop01(t, P.t0 + 1.9, 0.3, 2.4), { size: 32, bg: RED, color: '#fff4e2', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Calls from a hike. | *You hear birds.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    back(x, t, lt, P) { drawBits(x, MOUNT, { W: '#ffffff', G: '#4a8a6a' }, 800, 980, 26 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) { const ph = (t * 0.4 + i * 0.33) % 1; drawBits(x, BIRD, { K: BONE }, 660 + ph * 300, 660 + i * 60 + Math.sin(t * 5 + i) * 8, 13, { alpha: Math.sin(Math.PI * ph) }) }
      notes(x, t, 800, 760, { n: 3, cell: 6, col: MINT, seed: 4 })
      label(x, 790, 1130, 'SIGNAL: 1 BAR', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Schedules the call. | *Never misses it.*', mood: 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      clock(x, 800, 830, pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 790, 1060, 'SUNDAY · 3:00 ✓', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Starts with “hello.” | Ends *in space.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PLANET, { P: '#c97bff', R: GOLD }, 810, 820 + Math.sin(t * 2) * 8, 22 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: -0.2 })
      sparkles(x, t, 810, 820, P.t0 + 0.9, 8, 170, 0.6, [BONE, SKYB, GOLD])
      label(x, 790, 1090, 'TOPIC: THE UNIVERSE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cries with you. | *Then makes you laugh.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', tears: lt => lt > 1.3 ? 2 : 3, look: [1, 0], star: { x: -170 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 760, lt > 1.3 ? 'HA! ok same' : 'sniff…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: lt > 1.3 ? GOLD : LAV, tail: 'bl' })
      hearts(x, t, 800, 900, P.t0 + 1.7, { n: 4, life: 1.5, spread: 160, cell: 7, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'r2a0090', key: 'G', accent: PEACH, ending: 'callback',
  title: 'Each sign on | a *long call.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *One good call.*' },
  last: {
    text: 'Hour four. | Taurus is *still here.*',
    draw(x, t, lt) {
      drawBits(x, CHAIR, CHAIR_C, 540, 1080, 30 * pop01(t, t - lt + 0.4, 0.35, 2))
      const k = pop01(t, t - lt + 0.6, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'taurus', 540, 1030, 240 * k, { mood: lt > 1.5 ? 'heart' : 'happy', seed: 40, hops: [t - lt + 1.4] })
      hearts(x, t, 540, 900, t - lt + 1.5, { n: 6, life: 1.6, spread: 260, cell: 6, seed: 9 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
