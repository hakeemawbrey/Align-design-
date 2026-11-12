// r2a0061: ADVICE SOLO, "Leo, you’re loved | off stage too." (~45 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Leo truth + a warm reframe, one gag each.
//   0.0–3.6    "Leo, you’re loved | *off stage too.*"
//   3.6–37.8   nobody clapped (the APPLAUSE sign stays dark) · pajama day, still a star · three likes, three fans
//              · quiet night in, your friend still calls · supporting role, still award-winning · forgot the line,
//              nobody loved you less · spotlight off, glow on · need a hug? just ask · nobody asked? we're asking now
//  37.8        "Loved on stage. | *Loved off it.*"
//  41.2        CALLBACK: "The applause sign? | *Just lit up.*"  The dark sign from card one, lit, hearts.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'leo', ORANGE = '#f39a3a', RED = '#e23d4e'

// ── props
// the APPLAUSE light box: dark (unlit) or lit and glowing
function applause(x, cx, cy, k, lit, t, sc = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k * sc, k * sc)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-160, -46, 336, 112)
  x.fillStyle = INK; x.fillRect(-172, -58, 344, 116)
  x.fillStyle = '#2a2350'; x.fillRect(-164, -50, 328, 100)
  if (lit) { x.shadowColor = RED; x.shadowBlur = 30 + 8 * Math.sin(t * 8) }
  x.fillStyle = lit ? '#ff5a5a' : '#4a4070'; x.font = `800 52px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('APPLAUSE', 0, 4)
  x.restore()
}
const PILLOW = [
  '.WWWWWWWWWWWW.',
  'WWLWWWWWWWWLWW',
  'WWWWWWWWWWWWWW',
  'WWWWWWWWWWWWWW',
  'WWLWWWWWWWWLWW',
  '.WWWWWWWWWWWW.',
]
const PILLOW_C = { W: '#c9b8ff', L: '#9a86e8' }
const TROPHY = [
  'Y.YYYYYYY.Y',
  'YYYYYYYYYYY',
  'Y.YYYWYYY.Y',
  '..YYYYYYY..',
  '...YYYYY...',
  '....YYY....',
  '....YYY....',
  '...BBBBB...',
  '..BBBBBBB..',
]
const TROPHY_C = { Y: GOLD, W: '#fff6c8', B: '#8a4a2e' }
const CROWN = ['Y...Y...Y', 'YY.YYY.YY', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY']
const CROWN_C = { Y: GOLD, R: RED, B: SKYB }

function phoneFrame(x, cx, cy, k, rot = 0.05) {
  x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-112, -176, 236, 364)
  x.fillStyle = INK; x.fillRect(-124, -188, 248, 376)
  x.fillStyle = '#2a2350'; x.fillRect(-114, -178, 228, 356)
  x.fillStyle = '#140c30'; x.fillRect(-100, -150, 200, 300)
}
// a post with a like counter that stops at 3
function post(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); phoneFrame(x, cx, cy, k)
  x.fillStyle = '#ffd9a8'; x.fillRect(-84, -134, 168, 168)
  x.restore()
  x.save(); x.translate(cx, cy); x.rotate(0.05)
  if (k > 0.5) signChar(x, t, S, 0, -54, 120 * k, { mood: 'sparkle', seed: 44, glyph: false, glow: 0.4 })
  x.scale(k, k)
  const n = Math.min(3, Math.floor(Math.max(0, lt - 0.5) / 0.3))
  x.fillStyle = '#ff4f86'; x.font = `800 46px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(`♥ ${n}`, 0, 100)
  x.restore()
}
// a ringing phone with a caller name
function ringing(x, t, cx, cy, k, name) {
  if (k <= 0.01) return
  x.save(); phoneFrame(x, cx + Math.sin(t * 50) * 4, cy, k, 0.08)
  x.fillStyle = MINT; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(name, 0, -70)
  x.fillStyle = BONE; x.font = `700 22px ${MONO}`; x.fillText('calling…', 0, -20)
  x.fillStyle = '#2fc79a'; x.beginPath(); x.arc(0, 80, 38, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.fillText('✆', 0, 82)
  x.restore()
}
// a script page with a line crossed out and scribbled over
function script(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-120, -150, 252, 316)
  x.fillStyle = INK; x.fillRect(-132, -162, 264, 324)
  x.fillStyle = '#fff4e2'; x.fillRect(-124, -154, 248, 308)
  x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('LEO:', -100, -118)
  x.fillStyle = '#b9b0a0'; for (let i = 0; i < 6; i++) x.fillRect(-100, -76 + i * 36, i === 2 ? 200 : 170 - (i % 3) * 30, 12)
  const p = prog(lt, 0.7, 1.1)
  x.fillStyle = RED; x.fillRect(-106, -10, 212 * p, 8)
  x.restore()
}
// three little friends, each asking
function askers(x, t, lt, t0) {
  const F = [['cancer', 640, 1010], ['taurus', 790, 1040], ['pisces', 920, 1000]]
  F.forEach(([id, fx, fy], i) => {
    const k = pop01(t, t0 + 0.2 + i * 0.15, 0.35, 2)
    if (k > 0.01) signChar(x, t, id, fx, fy, 165 * k, { mood: 'happy', look: [-1, -1], seed: 50 + i, glyph: false, tears: id === 'pisces' ? 1 : 0, hops: [t0 + 1.0 + i * 0.1] })
  })
  bubble(x, 790, 720, 'how was | YOUR day?', pop01(t, t0 + 0.8, 0.25, 2.2), { size: 42, tail: 'bc' })
}

const CAMEOS = [
  { sign: S, cap: 'Nobody clapped today? | *You still showed up.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      applause(x, 790, 680, pop01(t, P.t0 + 0.25, 0.35, 2), false, t)
      label(x, 790, 960, 'SHOWED UP: ✓', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 40, bg: MINT, rot: -0.04 })
    } },
  { sign: S, cap: 'Pajama day? | *Still a star.*', mood: lt => lt > 1.3 ? 'sparkle' : 'sleepy', look: [1, 0], star: { x: -170 },
    back(x, t, lt, P) { drawBits(x, PILLOW, PILLOW_C, 370, 1060, 22 * pop01(t, P.t0 + 0.15, 0.3, 2)) },
    front(x, t, lt, P, F) {
      const d = ease.outCubic(prog(lt, 0.9, 1.3))
      if (lt > 0.85) drawBits(x, CROWN, CROWN_C, F.x, lerp(520, F.top - 30, d), 14, { rot: 0.08 })
      label(x, 790, 840, 'PAJAMAS: ON', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 38, bg: LAV, rot: 0.04 })
      label(x, 790, 960, 'STAR: STILL', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 38, bg: GOLD, rot: -0.04 })
      sparkles(x, t, F.x, F.top, P.t0 + 1.35, 7, 140, 0.4)
    } },
  { sign: S, cap: 'Only three likes? | *Three people adore you.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      post(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      hearts(x, t, 790, 900, P.t0 + 1.3, { n: 3, life: 1.4, spread: 160, cell: 9, seed: 2 })
    } },
  { sign: S, cap: 'Quiet night in? | Your friend *still calls.*', mood: lt => lt > 1.2 ? 'heart' : 'sleepy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      ringing(x, t, 790, 910, pop01(t, P.t0 + 0.6, 0.35, 2), 'BESTIE')
      bubble(x, 790, 650, 'just checking in!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, col: MINT, tail: 'bc' })
    } },
  { sign: S, cap: 'Supporting role today? | *Still award-winning.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, TROPHY, TROPHY_C, 790, 870, 24 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 790, 1100, 'BEST SUPPORTING STAR', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04 })
      sparkles(x, t, 790, 860, P.t0 + 1.35, 8, 180, 0.2)
    } },
  { sign: S, cap: 'Forgot your line? | Nobody *loved you less.*', mood: lt => lt > 1.5 ? 'happy' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      script(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1100, 'LOVE: UNCHANGED', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: PINK, rot: 0.04 })
    } },
  { sign: S, cap: 'Spotlight’s off? | *Your glow isn’t.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [0, -1], star: { x: -170 }, hops: [1.3],
    back(x, t, lt, P) {
      const k = 1 - ease.inCubic(prog(lt, 0.6, 1.0))
      if (k <= 0.01) return
      x.save(); x.globalAlpha = 0.34 * k; x.fillStyle = '#fff1b0'
      x.beginPath(); x.moveTo(330, 490); x.lineTo(410, 490); x.lineTo(570, 1180); x.lineTo(170, 1180); x.closePath(); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      label(x, 790, 760, 'LIGHTS: OFF', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 38, bg: '#4a4070', color: BONE, rot: 0.04 })
      label(x, 790, 900, 'GLOW: ON', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 46, bg: GOLD, rot: -0.04 })
      sparkles(x, t, 370, 880, P.t0 + 1.2, 9, 200, 0.5)
    } },
  { sign: S, cap: 'Need a hug, not a stage? | *Just ask.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -150 }, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2), near = ease.inOutCubic(prog(lt, 0.8, 1.3))
      if (k > 0.01) signChar(x, t, 'cancer', lerp(820, 640, near), 920, 230 * k, { mood: lt > 1.2 ? 'heart' : 'happy', look: [-1, 0], seed: 19, glyph: false })
      bubble(x, 800, 640, 'come here.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 42, col: SKYB, tail: 'br' })
      hearts(x, t, 520, 820, P.t0 + 1.3, { n: 6, life: 1.6, spread: 220, cell: 8, seed: 7 })
    } },
  { sign: S, cap: 'Nobody asked about your day? | *We’re asking now.*', mood: lt => lt > 1.1 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) { askers(x, t, lt, P.t0) } },
]

const F = makeFilm({
  id: 'r2a0061', key: 'D', accent: ORANGE, solo: S, ending: 'callback',
  title: 'Leo, you’re loved | *off stage too.*',
  cameos: CAMEOS,
  group: { cap: 'Loved on stage. | *Loved off it.*', mood: 'heart' },
  last: {
    text: 'The applause sign? | *Just lit up.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const a = pop01(t, t0 + 0.4, 0.45, 1.8)
      if (a > 0.01) signChar(x, t, S, 540, 1080, 320 * a, { mood: lt > 1.2 ? 'heart' : 'sparkle', seed: 31, hops: [t0 + 1.2] })
      applause(x, 540, 790, pop01(t, t0 + 0.5, 0.4, 2), lt > 1.0, t, 1.4)
      sparkles(x, t, 540, 790, t0 + 1.05, 10, 300, 0.3)
      hearts(x, t, 540, 1150, t0 + 1.2, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
