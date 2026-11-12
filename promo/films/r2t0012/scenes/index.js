// r2t0012: THE SIGNS AS… v3 SOLO, "Pisces when a stranger | is nice." (~46 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole film (makeFilm solo mode, 9 cards); Pisces cries in every card. Ending: callback.
//   0.0–3.6    "Pisces vs. | *a nice stranger.*"
//   3.6–37.8   a stranger held the door (an ode to the door) · cashier said "take care" (soulmates: friendship bracelet)
//              · stranger liked their shoes (never taking them off) · someone let them merge (waved for a mile)
//              · barista drew a heart (the cup goes in a museum) · a stranger smiled (named a star after them)
//              · someone said "bless you" (a whole box of tissues) · picked up their pen (checked compatibility)
//              · shared an umbrella (kept the raindrop in a jar)
//  37.8        "One kind word. | *Twelve feelings.*"
//  41.2        CALLBACK: "The door holder? | Got *a sequel.*"  Pisces with ODE II.
import { prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, SERIF,
} from '../../signs3kit.js'

const SEA = '#7fd4ff', RED = '#e23d4e'

// ── props
function scroll(x, cx, cy, k, title, rot = 0.05) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  const W = 280, H = 360
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-W / 2 + 8, -H / 2 + 10, W, H)
  x.fillStyle = INK; x.fillRect(-W / 2 - 5, -H / 2 - 5, W + 10, H + 10)
  x.fillStyle = '#f3e2b8'; x.fillRect(-W / 2, -H / 2, W, H)
  x.fillStyle = '#d9c28e'; x.fillRect(-W / 2 - 14, -H / 2 - 14, W + 28, 26); x.fillRect(-W / 2 - 14, H / 2 - 12, W + 28, 26)
  x.fillStyle = INK; x.font = `italic 600 44px ${SERIF}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -H / 2 + 62)
  x.fillStyle = '#b39b6a'
  for (let i = 0; i < 6; i++) x.fillRect(-W / 2 + 34, -H / 2 + 116 + i * 34, i % 2 ? 170 : 212, 10)
  x.restore()
}
const BRACELET_C = [PINK, GOLD, SEA, MINT, LAV, '#ffb34a']
function bracelet(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < 14; i++) {
    const a = i / 14 * Math.PI * 2 + t * 0.6
    x.fillStyle = INK; x.beginPath(); x.arc(Math.cos(a) * 110, Math.sin(a) * 70, 24, 0, Math.PI * 2); x.fill()
    x.fillStyle = BRACELET_C[i % 6]; x.beginPath(); x.arc(Math.cos(a) * 110, Math.sin(a) * 70, 18, 0, Math.PI * 2); x.fill()
  }
  x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BFF', 0, 2)
  x.restore()
}
const SHOE = ['.......RRR..', '......RRWR..', 'RR...RRRRR..', 'RRRRRRRRRRR.', 'RRRRRRRRRRRR', 'WWWWWWWWWWWW']
const CAR = ['...BBBBBB.....', '..BSSBSSSB....', '.BBSSBSSSBB...', 'BBBBBBBBBBBBBB', 'BBBBBBBBBBBBBB', '.KKK.....KKK..', '.KKK.....KKK..']
const CUP = ['WWWWWWWWW', 'WCCCCCCCW', 'WCCHCHCCW', 'WCCHHHCCW', '.WCCHCCW.', '.WWWWWWW.', '..WWWWW..']
function dome(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-140, 110, 280, 40); x.fillStyle = GOLD; x.fillRect(-132, 116, 264, 28)
  x.strokeStyle = 'rgba(239,230,214,0.85)'; x.lineWidth = 8
  x.beginPath(); x.moveTo(-120, 110); x.lineTo(-120, -60); x.arc(0, -60, 120, Math.PI, 0); x.lineTo(120, 110); x.stroke()
  x.fillStyle = 'rgba(143,227,255,0.12)'; x.fill()
  x.fillStyle = 'rgba(255,255,255,0.6)'; x.fillRect(-90, -100, 14, 80)
  x.restore()
}
function bigStar(x, cx, cy, s, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(Math.sin(t * 2) * 0.1); x.scale(k, k)
  x.fillStyle = 'rgba(242,199,92,0.25)'; x.beginPath(); x.arc(0, 0, s * 1.4, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.beginPath(); for (let i = 0; i < 10; i++) { const r = i % 2 ? s * 0.48 : s * 1.12, a = i / 10 * Math.PI * 2 - Math.PI / 2; x.lineTo(Math.cos(a) * r, Math.sin(a) * r) } x.closePath(); x.fill()
  x.fillStyle = GOLD; x.beginPath(); for (let i = 0; i < 10; i++) { const r = i % 2 ? s * 0.4 : s, a = i / 10 * Math.PI * 2 - Math.PI / 2; x.lineTo(Math.cos(a) * r, Math.sin(a) * r) } x.closePath(); x.fill()
  x.restore()
}
function tissues(x, cx, cy, k, lt, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -50, 260, 130); x.fillStyle = SEA; x.fillRect(-122, -42, 244, 114)
  x.fillStyle = INK; x.fillRect(-60, -50, 120, 16)
  x.restore()
  const n = Math.min(7, Math.floor(Math.max(0, lt - 0.3) * 5))
  for (let i = 0; i < n; i++) {
    const ph = ((t * 0.8 + i / 7) % 1)
    x.save(); x.globalAlpha = k * (1 - ph); x.translate(cx + Math.sin(i * 2.3) * 120 * ph, cy - 60 - ph * 300); x.rotate(Math.sin(t * 3 + i) * 0.5)
    x.fillStyle = INK; x.fillRect(-34, -30, 68, 60); x.fillStyle = '#fff4e2'; x.fillRect(-28, -24, 56, 48); x.restore()
  }
}
function phone(x, cx, cy, k, rot, draw) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 260, 400)
  x.fillStyle = INK; x.fillRect(-130, -200, 260, 400)
  x.fillStyle = '#2a2350'; x.fillRect(-120, -190, 240, 380)
  x.fillStyle = '#140c30'; x.fillRect(-108, -160, 216, 320)
  draw(x); x.restore()
}
function jar(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-100, -170, 200, 34); x.fillStyle = '#b7a6ff'; x.fillRect(-94, -166, 188, 26)
  x.strokeStyle = 'rgba(239,230,214,0.85)'; x.lineWidth = 8; x.strokeRect(-110, -134, 220, 260)
  x.fillStyle = 'rgba(143,227,255,0.12)'; x.fillRect(-106, -130, 212, 252)
  // the one raindrop, glowing
  const s = 1 + 0.08 * Math.sin(t * 4)
  x.save(); x.scale(s, s)
  x.fillStyle = 'rgba(143,227,255,0.35)'; x.beginPath(); x.arc(0, 10, 60, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.beginPath(); x.moveTo(0, -46); x.quadraticCurveTo(40, 10, 30, 30); x.arc(0, 30, 30, 0, Math.PI); x.quadraticCurveTo(-40, 10, 0, -46); x.fill()
  x.fillStyle = SKYB; x.beginPath(); x.moveTo(0, -34); x.quadraticCurveTo(30, 12, 22, 30); x.arc(0, 30, 22, 0, Math.PI); x.quadraticCurveTo(-30, 12, 0, -34); x.fill()
  x.fillStyle = '#fff'; x.fillRect(-12, 16, 8, 10)
  x.restore()
  x.restore()
}

const S = 'pisces'
const CAMEOS = [
  { sign: S, cap: 'Stranger held the door. | Pisces *wrote a poem.*', mood: 'heart', tears: 2, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) { scroll(x, 790, 860, pop01(t, P.t0 + 0.3, 0.3, 2), 'Ode to a Door') } },
  { sign: S, cap: 'Cashier said “take care.” | *Soulmates now.*', mood: 'heart', tears: 2, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 760, 640, 'take care!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'br' })
      bracelet(x, 790, 940, pop01(t, P.t0 + 1.0, 0.35, 2.2), t)
    } },
  { sign: S, cap: 'Stranger liked their shoes. | *Never taking them off.*', mood: 'sparkle', tears: 1, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SHOE, { R: SEA, W: BONE }, 790, 930, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1130, 'WORN TO BED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: GOLD, font: MONO, weight: 700 })
      hearts(x, t, 790, 860, P.t0 + 0.8, { n: 4, life: 1.6, spread: 200, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'Someone let them merge. | *Waved for a mile.*', mood: 'heart', tears: 2, look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const drive = ease.inOutCubic(prog(lt, 0.3, 2.2))
      drawBits(x, CAR, { B: '#ffb34a', S: SKYB, K: INK }, lerp(820, 700, drive), 1040, 18 * pop01(t, P.t0 + 0.15, 0.3, 2))
      bubble(x, 760, 650, 'THANK YOUUU', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 44, col: SEA, tail: 'bl' })
      label(x, 800, 830, 'MILE 1 OF WAVING', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: BONE, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Barista drew a heart. | The cup’s *in a museum.*', mood: 'heart', tears: 2, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CUP, { W: BONE, C: '#b07a4a', H: PINK }, 790, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      dome(x, 790, 880, pop01(t, P.t0 + 0.9, 0.35, 2))
      label(x, 790, 1120, 'DO NOT TOUCH', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: RED, color: BONE, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A stranger smiled. | *A star got named.*', mood: 'sparkle', tears: 2, look: [1, -1], star: { x: -180, y: 60 },
    front(x, t, lt, P) {
      bigStar(x, 800, 720, 90, pop01(t, P.t0 + 0.5, 0.4, 2.2), t)
      sparkles(x, t, 800, 720, P.t0 + 0.8, 8, 150, 0.1)
      label(x, 790, 960, 'STAR: “NICE SMILE”', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Someone said “bless you.” | *A whole box.*', mood: 'wide', tears: 3, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      tissues(x, 790, 1040, pop01(t, P.t0 + 0.2, 0.3, 2), lt, t)
      bubble(x, 780, 640, 'bless you!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'br' })
    } },
  { sign: S, cap: 'They picked up the pen. | *Compatible?*', mood: 'heart', tears: 2, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 790, 860, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), 0.05, x => {
        x.fillStyle = BONE; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('COMPATIBILITY', 0, -120)
        x.fillStyle = SEA; x.font = `800 64px ${INTER}`; x.fillText('♓︎ ? ♥', 0, -30)
        x.fillStyle = MINT; x.font = `800 30px ${INTER}`; x.fillText('MEANT', 0, 50); x.fillText('TO BE', 0, 90)
      })
    } },
  { sign: S, cap: 'Shared their umbrella. | Pisces *kept the raindrop.*', mood: 'heart', tears: 2, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      jar(x, 790, 880, pop01(t, P.t0 + 0.3, 0.35, 2), t)
      label(x, 790, 1110, 'FOREVER', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: LAV, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0012', key: 'E', accent: SEA, solo: 'pisces', ending: 'callback',
  title: 'Pisces vs. | *a nice stranger.*',
  cameos: CAMEOS,
  group: { cap: 'One kind word. | *Twelve feelings.*', mood: 'heart' },
  last: {
    text: 'The door holder? | Got *a sequel.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'pisces', 380, 1080, 260 * k, { mood: 'heart', look: [1, 0], seed: 40, tears: 2, hops: [t - lt + 1.2] })
      scroll(x, 720, 1060, 0.85 * pop01(t, t - lt + 0.8, 0.35, 2), 'Ode II', -0.06)
      hearts(x, t, 540, 960, t - lt + 1.5, { n: 6, life: 1.6, spread: 260, cell: 6, seed: 9 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
