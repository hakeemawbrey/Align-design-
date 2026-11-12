// r2t0144: THE SIGNS AS… v3, SOLO film, "Your Aquarius | coworker be like." (~46 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through: nine workdays, each the most extreme (and lovable) Aquarius-at-the-office version.
// Ending: callback.
//   0.0–3.6    "Your Aquarius | *coworker* be like."
//   3.6–37.8   nine cards (3.8 s each):
//              "any questions?" had forty · desk decor: a tiny alien · replied all, with a theory · fixed the printer, it
//              now plays music · team lunch, ate on the roof · dress code business, wore a cape · brainstorm, pitched a
//              moon office · icebreaker: "what's your rising?" · out-of-office: "in another dimension"
//  37.8        "Weird? | *Weirdly the best.*"  Aquarius comes back, big.
//  41.2        CALLBACK: "Update: the printer | *takes requests.*"  the printer is back, playing music.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const AQ = '#6fc3ff', RED = '#e23d4e'
const S = 'aquarius'

// ── props
const ALIEN = [
  '.K.....K.',
  '..K...K..',
  '..GGGGG..',
  '.GGGGGGG.',
  'GKKGGGKKG',
  'GKWGGGKWG',
  'GGGGGGGGG',
  '.GGGKGGG.',
  '..GGGGG..',
  '...GGG...',
  '..GGGGG..',
  '.GG.G.GG.',
]
const ALIEN_C = { G: '#7dffb0', K: INK, W: '#fff' }
function printer(x, t, cx, cy, k, { paper = 0, screen = '' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-170, -70, 352, 200)
  if (paper > 0) { x.fillStyle = INK; x.fillRect(-96, -70 - 120 * paper, 192, 120 * paper + 10); x.fillStyle = '#fff'; x.fillRect(-88, -64 - 120 * paper, 176, 120 * paper) }
  x.fillStyle = INK; x.fillRect(-182, -82, 364, 210)
  x.fillStyle = '#d8dbe8'; x.fillRect(-174, -74, 348, 194)
  x.fillStyle = '#9aa5c4'; x.fillRect(-174, -74, 348, 40)
  x.fillStyle = INK; x.fillRect(-120, 60, 240, 16)
  x.fillStyle = '#140c30'; x.fillRect(40, -10, 110, 50)
  x.fillStyle = MINT; x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(screen, 95, 16)
  x.fillStyle = MINT; x.beginPath(); x.arc(-140, 10, 10, 0, 7); x.fill()
  x.restore()
}
function email(x, cx, cy, k, head, lines, { w = 380, bar = AQ, rot = 0.03 } = {}) {
  if (k <= 0.01) return
  const h = 70 + lines.length * 46 + 20
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 7, -h / 2 - 7, w + 14, h + 14)
  x.fillStyle = BONE; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = bar; x.fillRect(-w / 2, -h / 2, w, 56)
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(head, -w / 2 + 18, -h / 2 + 29)
  x.font = `800 32px ${INTER}`
  lines.forEach((l, i) => x.fillText(l, -w / 2 + 22, -h / 2 + 96 + i * 46))
  x.restore()
}
const CAPE = ['RRRRRRRRR', '.RRRRRRR.', '.RRRRRRR.', 'RRRRRRRRR', 'RRRRRRRRR', 'RRRRRRRRR', 'RR.RRR.RR']
const MOON = ['..WWWW..', '.WWWWWW.', 'WWGWWWWW', 'WWWWWGWW', 'WWWWWWWW', 'WGWWWWWW', '.WWWWGW.', '..WWWW..']
function sticky(x, cx, cy, k, text, col, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.4)'; x.fillRect(-100, -92, 210, 200)
  x.fillStyle = INK; x.fillRect(-108, -104, 216, 208); x.fillStyle = col; x.fillRect(-100, -96, 200, 192)
  x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  String(text).split('|').forEach((l, i, a) => x.fillText(l.trim(), 0, (i - (a.length - 1) / 2) * 42))
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: '“Any questions?” | They had *forty.*', mood: lt => lt > 0.8 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 }, hops: [0.8],
    front(x, t, lt, P) {
      const n = Math.min(40, 1 + Math.floor(clamp((lt - 0.5) / 1.4) * 40))
      label(x, 790, 760, `QUESTION ${n}/40`, pop01(t, P.t0 + 0.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'also, why | do we sit?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Desk decor: | *a tiny alien.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      x.fillStyle = INK; x.fillRect(600, 1060, 380, 26); x.fillStyle = '#c98f2a'; x.fillRect(606, 1064, 368, 18)
      drawBits(x, ALIEN, ALIEN_C, 790, 960 + Math.sin(t * 4) * 4, 15 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 800, 700, 'his name is Gary', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Replied all. | *With a theory.*', mood: 'sparkle', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      email(x, 790, 860, pop01(t, P.t0 + 0.3, 0.3, 2), 'RE: RE: lunch', ['what if lunch', 'is a construct', '(see 9 pages)'])
      label(x, 790, 1110, 'SENT TO: ALL 300', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: RED, color: '#fff4e2', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Fixed the printer. | It *now plays music.*', mood: lt => lt > 1.1 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.2],
    front(x, t, lt, P) {
      printer(x, t, 790, 920, pop01(t, P.t0 + 0.2, 0.3, 2), { screen: lt > 1.0 ? '♪ ON' : 'ERR' })
      if (lt > 1.0) notes(x, t, 790, 800, { n: 4, cell: 8, col: MINT, seed: 1 })
      label(x, 790, 650, 'UPGRADED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Team lunch? | Ate *on the roof.*', mood: 'happy', look: [1, -1], star: { x: -60, y: -130, s: 240 }, hops: [1.3],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      x.save(); x.globalAlpha = k
      x.fillStyle = INK; x.fillRect(200, 920, 680, 300); x.fillStyle = '#3d3470'; x.fillRect(210, 930, 660, 290)
      x.fillStyle = '#ffd23a'; for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) if ((r + c) % 3) x.fillRect(250 + c * 104, 970 + r * 80, 52, 44)
      x.fillStyle = INK; x.fillRect(190, 900, 700, 30)
      x.restore()
    },
    front(x, t, lt, P) {
      label(x, 790, 680, 'VIEW: ELITE', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 300, 640, 'hi pigeons', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
  { sign: S, cap: 'Dress code: business. | They wore *a cape.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.9, 1.7],
    back(x, t, lt, P, F) { drawBits(x, CAPE, { R: RED }, F.x + Math.sin(t * 5) * 10 - 20, F.cy + 60, 30 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.15 * Math.sin(t * 4) }) },
    front(x, t, lt, P) {
      label(x, 790, 760, 'DRESS CODE:', pop01(t, P.t0 + 0.5, 0.3, 2.4), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 900, 'BUSINESS CAPE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Brainstorm session? | Pitched *a moon office.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      sticky(x, 720, 760, pop01(t, P.t0 + 0.2, 0.3, 2), 'more | snacks?', '#ffe58a', -0.08)
      sticky(x, 870, 980, pop01(t, P.t0 + 0.9, 0.3, 2), 'MOON | OFFICE', '#8fe3ff', 0.07)
      drawBits(x, MOON, { W: '#efe6d6', G: '#b9b0a0' }, 900, 840, 9 * pop01(t, P.t0 + 1.3, 0.3, 2))
    } },
  { sign: S, cap: 'Icebreaker? | *“What’s your rising?”*', mood: 'wink', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'so… your rising?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      const k = pop01(t, P.t0 + 0.9, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 830, 990, 190 * k, { mood: 'wide', look: [-1, 0], seed: 13, glyph: false })
      label(x, 830, 1150, 'NEW FRIEND', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Out-of-office reply: | *“In another dimension.”*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      email(x, 790, 880, pop01(t, P.t0 + 0.3, 0.3, 2), 'OUT OF OFFICE', ['back: when the', 'portal closes'], { bar: LAV, rot: -0.04 })
      sparkles(x, t, 790, 880, P.t0 + 1.0, 7, 220, 0.3, [LAV, AQ, BONE])
    } },
]

const F = makeFilm({
  id: 'r2t0144', key: 'D', accent: AQ, solo: S, ending: 'callback',
  title: 'Your Aquarius | *coworker* be like.',
  cameos: CAMEOS,
  group: { cap: 'Weird? | *Weirdly the best.*', mood: 'sparkle' },
  last: {
    text: 'Update: the printer | *takes requests.*',
    draw(x, t, lt) {
      const t0 = t - lt
      printer(x, t, 560, 1120, 1.25 * pop01(t, t0 + 0.3, 0.45, 1.8), { screen: '♪ REQ', paper: clamp((lt - 1.0) / 0.8) })
      if (lt > 0.9) notes(x, t, 560, 980, { n: 5, cell: 9, col: MINT, seed: 4 })
      label(x, 560, 1360, 'NOW PLAYING: YOUR SONG', pop01(t, t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
