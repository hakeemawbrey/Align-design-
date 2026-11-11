// v3a055: zodiac.advice444, ADVICE SOLO, "How to love | a Scorpio." (~49 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): warm, specific ways to love a Scorpio, one gag each.
//   0.0–3.6    "How to love | *a Scorpio.*"  One big Scorpio pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              "i mean it." and the truth meter swings to TRUE · a vault with a heart lock: SEALED · two dice,
//              crossed out: GAMES: BANNED · big headphones: MUTE: ON · sticky notes ("no olives", "dark choc"): NOTED
//              · a rain cloud, and Libra brings an umbrella · two half-hearts click together: BOTH HALVES
//              · a moon and "so what IS love?": STILL TALKING · "spinach. in your teeth." and Scorpio is grateful: TRUST +100
//  37.8        "Hard to reach. | *Worth it.*"  Scorpio comes back, big.
//  41.0        LESSON UNLOCKED: "Be real with them. | *They go all in.*"  BOND: DEEP
//  46.9        "Spinach gone. | *Love stayed.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, HEART,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PLUM = '#ff5f8f', RED = '#e23d4e', STEEL = '#9d9ab0'
const S = 'scorpio'

// ── props
const DIE = ['WWWWWWW', 'WKWWWKW', 'WWWWWWW', 'WWWKWWW', 'WWWWWWW', 'WKWWWKW', 'WWWWWWW']
const DIE_C = { W: '#fff4e2', K: INK }
const CLOUD = [
  '...CCCC.....',
  '..CCCCCC.CC.',
  '.CCCCCCCCCCC',
  'CCCCCCCCCCCC',
  '.CCCCCCCCCC.',
]
const CLOUD_C = { C: '#8d8aa3' }
const UMBRELLA = [
  '.....YY.....',
  '...YYYYYY...',
  '..YYYYYYYY..',
  '.YYYYYYYYYY.',
  'YYYYYYYYYYYY',
  'Y.Y..K..Y.Y.',
  '.....K......',
  '.....K......',
  '.....K......',
  '.....K.K....',
  '......K.....',
]
const UMB_C = { Y: GOLD, K: INK }

function meter(x, cx, cy, k, v) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 170, Math.PI, 0); x.lineTo(170, 30); x.lineTo(-170, 30); x.fill()
  x.fillStyle = '#fff4e2'; x.beginPath(); x.arc(0, 0, 158, Math.PI, 0); x.lineTo(158, 20); x.lineTo(-158, 20); x.fill()
  x.lineWidth = 26
  x.strokeStyle = RED; x.beginPath(); x.arc(0, 0, 120, Math.PI, Math.PI * 1.5); x.stroke()
  x.strokeStyle = '#2bb673'; x.beginPath(); x.arc(0, 0, 120, Math.PI * 1.5, Math.PI * 2); x.stroke()
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('FAKE', -96, -14); x.fillText('TRUE', 96, -14)
  const a = Math.PI + lerp(0.15, 0.85, v) * Math.PI
  x.strokeStyle = INK; x.lineWidth = 9; x.lineCap = 'round'; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a) * 130, Math.sin(a) * 130); x.stroke()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 16, 0, Math.PI * 2); x.fill()
  x.restore()
}
function vault(x, cx, cy, k, spin) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -170, 340, 340)
  x.fillStyle = STEEL; x.fillRect(-160, -160, 320, 320)
  x.fillStyle = '#7d7a95'; x.fillRect(-140, -140, 280, 280)
  x.fillStyle = INK; x.fillRect(-160, -120, 24, 60); x.fillRect(-160, 60, 24, 60)
  x.save(); x.rotate(spin)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 80, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#c9c9d8'; x.beginPath(); x.arc(0, 0, 70, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 4; i++) { x.save(); x.rotate(i * Math.PI / 2); x.fillRect(-6, -120, 12, 50); x.restore() }
  x.restore()
  drawBits(x, HEART, { H: PLUM, W: '#fff' }, 0, 0, 12)
  x.restore()
}
function headphones(x, F, k) {
  if (k <= 0.01) return
  x.save(); x.translate(F.x, F.cy - F.S * 0.05); x.scale(k, k)
  const r = F.S * 0.42
  x.strokeStyle = INK; x.lineWidth = 30; x.beginPath(); x.arc(0, 0, r, Math.PI * 1.08, Math.PI * 1.92); x.stroke()
  x.strokeStyle = '#3a3360'; x.lineWidth = 18; x.stroke()
  for (const d of [-1, 1]) {
    x.fillStyle = INK; x.beginPath(); x.roundRect(d * r - 40, -20, 80, 120, 24); x.fill()
    x.fillStyle = PLUM; x.beginPath(); x.roundRect(d * r - 30, -10, 60, 100, 18); x.fill()
  }
  x.restore()
}
function stickies(x, t, P, lt) {
  const notes = [['no olives', '#fff27a', 690, 700, -0.08], ['dark choc', '#a5e6c9', 870, 760, 0.07], ['hates', '#ffb3d1', 700, 900, 0.05], ['surprises', '#ffb3d1', 700, 960, 0.05], ['fav: rain', SKYB, 880, 940, -0.06]]
  notes.forEach(([txt, col, nx, ny, r], i) => {
    if (i === 3) return
    const k = pop01(t, P.t0 + 0.2 + i * 0.22, 0.3, 2.2)
    if (k <= 0.01) return
    x.save(); x.translate(nx, ny); x.rotate(r); x.scale(k, k)
    x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-84, -64, 176, 140)
    x.fillStyle = INK; x.fillRect(-92, -72, 184, 144)
    x.fillStyle = col; x.fillRect(-86, -66, 172, 132)
    x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    if (i === 2) { x.fillText('hates', 0, -18); x.fillText('surprises', 0, 20) } else x.fillText(txt, 0, 2)
    x.restore()
  })
}
function halves(x, cx, cy, k, join) {
  if (k <= 0.01) return
  const gap = lerp(110, 0, ease.outBack(clamp(join)))
  for (const d of [-1, 1]) {
    x.save(); x.beginPath(); x.rect(d < 0 ? cx - 400 : cx, cy - 300, 400, 600); x.translate(d * gap, 0); x.clip()
    drawBits(x, HEART, { H: d < 0 ? PLUM : PINK, W: '#fff' }, cx + d * gap, cy, 34 * k)
    x.restore()
  }
}
function moon(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 86, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#fff2b0'; x.beginPath(); x.arc(0, 0, 78, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(36, -20, 70, 0, Math.PI * 2); x.fill()
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Mean it | *when you say it.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -220 }, hops: [1.5],
    front(x, t, lt, P) {
      meter(x, 790, 980, pop01(t, P.t0 + 0.2, 0.35, 2), ease.outElastic ? ease.outElastic(prog(lt, 0.8, 1.6)) : ease.outBack(prog(lt, 0.8, 1.3)))
      bubble(x, 760, 680, 'i mean it.', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: S, cap: 'Keep their secrets. | *Like a vault.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -230 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      vault(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), ease.inOutCubic(prog(lt, 0.6, 1.3)) * Math.PI * 1.5)
      label(x, 790, 1110, 'SEALED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 44, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Don’t play games. | *They’ll know.*', mood: 'squint', look: [1, 0], star: { x: -220 }, hops: [],
    front(x, t, lt, P) {
      drawBits(x, DIE, DIE_C, 720, 900, 18 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.2 })
      drawBits(x, DIE, DIE_C, 870, 940, 18 * pop01(t, P.t0 + 0.35, 0.35, 2), { rot: 0.25 })
      const c = clamp((lt - 0.9) * 4)
      if (c > 0) { x.save(); x.strokeStyle = RED; x.lineWidth = 18; x.lineCap = 'round'; x.beginPath(); x.moveTo(640, 800); x.lineTo(lerp(640, 950, c), lerp(800, 1040, c)); x.stroke(); x.restore() }
      label(x, 790, 1130, 'GAMES: BANNED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: PLUM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Give them | *quiet time.*', mood: lt => lt > 0.9 ? 'sleepy' : 'happy', star: { x: -20, y: 20, s: 330 }, hops: [0.5],
    front(x, t, lt, P, F) {
      headphones(x, F, pop01(t, P.t0 + 0.5, 0.3, 2.2))
      label(x, 540, 640, 'MUTE: ON', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 44, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Remember | *the small things.*', mood: lt => lt > 1.6 ? 'heart' : 'wide', look: [1, 0], star: { x: -240, y: 30 }, hops: [1.7],
    front(x, t, lt, P) {
      stickies(x, t, P, lt)
      label(x, 790, 1130, 'NOTED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 44, bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'Show up | *on the hard days.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, -1], star: { x: -150, y: 40, s: 270 }, hops: [1.6],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.35, 2)
      drawBits(x, CLOUD, CLOUD_C, 390, 600, 24 * k)
      const cover = lt > 1.2
      x.save(); x.fillStyle = SKYB
      for (let i = 0; i < 10; i++) { const ph = ((t * 1.6 + i * 0.13) % 1), rx = 270 + (i * 37) % 240, ry = 650 + ph * 380; if (!cover || rx < 300 || rx > 500 || ry < 700) if (k > 0.5) x.fillRect(rx, ry, 6, 22) }
      x.restore()
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.6, 0.35, 2), walk = ease.inOutCubic(prog(lt, 0.6, 1.2))
      if (k > 0.01) signChar(x, t, 'libra', lerp(900, 680, walk), 1000, 180 * k, { mood: 'happy', look: [-1, 0], seed: 22, glyph: false })
      const u = pop01(t, P.t0 + 1.4, 0.3, 2.2)
      drawBits(x, UMBRELLA, UMB_C, lerp(900, 470, walk), 730, 24 * u)
    } },
  { sign: S, cap: 'Be loyal. | *They match it.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -230 }, hops: [1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      halves(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), prog(lt, 0.8, 1.3))
      sparkles(x, t, 790, 860, P.t0 + 1.4, 8, 200, 0.4)
      label(x, 790, 1120, 'BOTH HALVES', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Let them | *go deep.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, -1], star: { x: -230, y: 40 }, hops: [1.6],
    front(x, t, lt, P) {
      moon(x, 870, 640, pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 700, 820, 'so what IS | love, really?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 790, 1100, 'STILL TALKING', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Be honest. | *Even when it’s awkward.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: { x: -230 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 830, 1010, 170 * k, { mood: 'squint', look: [-1, 0], seed: 21, glyph: false })
      bubble(x, 760, 640, 'spinach. | in your teeth.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, tail: 'br' })
      label(x, 600, 1140, 'TRUST +100', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a055', key: 'C', accent: PLUM, solo: S, ending: 'lesson',
  title: 'How to love | *a Scorpio.*',
  cameos: CAMEOS,
  group: { cap: 'Hard to reach. | *Worth it.*', mood: 'heart' },
  lesson: { text: 'Be real with them. | *They go all in.*', chip: 'BOND: DEEP' },
  last: { text: 'Spinach gone. | *Love stayed.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
