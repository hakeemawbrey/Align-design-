// r2a0091: star_advice, ADVICE SOLO, "Aries, this is your sign | to slow down." (~43 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Aries truth + a warm reframe, one gag each.
//   0.0–3.6    "Aries, this is your sign | *to slow down.*"  One big Aries pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              replied in 0.2 s (take a breath first) · rushing everywhere (two hours early) · microwave stopped at 0:01
//              · five new hobbies today (pick one to love) · won the argument (hear them out) · skipped the instructions
//              (twelve spare screws) · match hasn't replied, it's been four minutes · lunch eaten standing up · rest is refuelling
//  37.8        ending 'group': "Same fire. | *Slower burn.*"  Aries comes back, big and calm.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CORAL = '#ff6b5a', RED = '#e23d4e', CREAM = '#fff4e2', WOOD = '#c98f2a', BROWN = '#8a4a2e'
const S = 'aries'

// ── props
const TROPHY = [
  'Y.YYYYY.Y',
  'YYYYYYYYY',
  'Y.YYYYY.Y',
  '..YYYYY..',
  '...YYY...',
  '....Y....',
  '...YYY...',
  '..BBBBB..',
]
const TROPHY_C = { Y: GOLD, B: BROWN }
const SANDWICH = [
  '..BBBBBBB..',
  '.BBBBBBBBB.',
  'GGGGGGGGGGG',
  'RRRRRRRRRRR',
  'CCCCCCCCCCC',
  '.BBBBBBBBB.',
]
const SANDWICH_C = { B: '#e8a24a', G: '#5fd068', R: RED, C: '#ffd23a' }
const CHAIR = [
  'W.......',
  'W.......',
  'W.......',
  'W.......',
  'WWWWWWWW',
  'W......W',
  'W......W',
  'W......W',
]

function screen(x, cx, cy, k, { head = '', headCol = LAV, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132)
  lines.forEach(([txt, col, kk, side = 0, size = 24], i) => {
    if (kk <= 0.01) return
    x.save(); x.translate(side * 14, -70 + i * 62); x.scale(kk, kk)
    x.font = `800 ${size}px ${INTER}`; const w = x.measureText(txt).width + 30
    if (col) { x.fillStyle = col; x.fillRect(-w / 2, -24, w, 48) }
    x.fillStyle = col ? INK : '#b9b0a0'; x.fillText(txt, 0, 2)
    x.restore()
  })
  x.restore()
}
function clock(x, cx, cy, r, k, t, speed = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 10, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * r * 0.82 - 4, Math.sin(a) * r * 0.82 - 4, 8, 8) }
  x.strokeStyle = INK; x.lineCap = 'square'
  x.lineWidth = 10; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(t * speed * 0.1 - 1.6) * r * 0.45, Math.sin(t * speed * 0.1 - 1.6) * r * 0.45); x.stroke()
  x.lineWidth = 6; x.strokeStyle = RED; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(t * speed - 1.6) * r * 0.7, Math.sin(t * speed - 1.6) * r * 0.7); x.stroke()
  x.restore()
}
function microwave(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  const open = lt > 1.0
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-160, -100, 336, 216)
  x.fillStyle = INK; x.fillRect(-172, -112, 344, 224)
  x.fillStyle = '#c9c9d8'; x.fillRect(-164, -104, 328, 208)
  x.fillStyle = '#140c30'; x.fillRect(-148, -88, 210, 176)
  if (!open) { x.fillStyle = 'rgba(255,214,120,0.35)'; x.fillRect(-140, -80, 194, 160) }
  else { x.fillStyle = '#5b5480'; x.fillRect(-148, -88, 30, 176) }
  x.fillStyle = '#2a2350'; x.fillRect(80, -88, 72, 44)
  x.fillStyle = open ? RED : MINT; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  const secs = open ? 1 : Math.max(1, Math.round(lerp(9, 1, prog(lt, 0.1, 1.0))))
  x.fillText(`0:0${secs}`, 116, -64)
  x.fillStyle = '#9aa5c4'; for (let i = 0; i < 6; i++) x.fillRect(90 + (i % 2) * 32, -20 + Math.floor(i / 2) * 32, 22, 20)
  x.restore()
}
function shelf(x, cx, cy, k, t, lt) {
  if (k <= 0.01) return
  const wob = lt > 0.9 ? 0.08 * Math.sin(t * 9) : 0
  x.save(); x.translate(cx, cy + 120); x.rotate(wob); x.translate(0, -120); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-110, -170, 220, 300)
  x.fillStyle = WOOD; x.fillRect(-102, -162, 16, 284); x.fillRect(86, -162, 16, 284)
  for (const y of [-162, -62, 38, 108]) { x.fillStyle = WOOD; x.fillRect(-102, y, 204, 14) }
  x.fillStyle = BROWN; x.fillRect(-86, -50, 172, 4)
  x.restore()
}

const HOBBIES = ['GUITAR', 'POTTERY', 'KARATE', 'BAKING', 'CHESS']
const HCOL = [GOLD, PINK, MINT, SKYB, LAV]

const CAMEOS = [
  { sign: S, cap: 'Replied in 0.2 seconds? | *Breathe first.*', mood: lt => lt > 1.5 ? 'happy' : 'wide', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      screen(x, 790, 850, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'NEW MESSAGE', lines: [
        ['hey, quick q', LAV, pop01(t, P.t0 + 0.3, 0.25, 2.2), -1],
        ['YES. DONE. WHAT', CORAL, pop01(t, P.t0 + 0.5, 0.25, 2.2), 1],
        ['…I hadn’t asked yet', LAV, pop01(t, P.t0 + 1.0, 0.25, 2.2), -1, 22],
      ] })
      label(x, 790, 1120, 'REPLY TIME: 0.2s', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Rushing everywhere? | *You’ll still arrive.*', mood: lt => lt > 1.4 ? 'sleepy' : 'sparkle', star: { x: -200 }, hops: [0.3, 0.6, 0.9],
    back(x, t, lt, P, F) {
      if (lt < 1.2) { x.save(); x.globalAlpha = 0.6; x.fillStyle = BONE; for (let i = 0; i < 5; i++) x.fillRect(F.x - 260 - ((t * 900 + i * 70) % 160), F.cy - 80 + i * 40, 90, 8); x.restore() }
    },
    front(x, t, lt, P) {
      clock(x, 790, 760, 120, pop01(t, P.t0 + 0.2, 0.3, 2), t, 6)
      label(x, 790, 990, 'EARLY BY: 2 HOURS', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1130, 'oh. nobody’s here.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 30, tail: 'bl' })
    } },
  { sign: S, cap: 'Microwave at 0:01? | *Let it finish.*', mood: lt => lt > 1.0 ? 'squint' : 'wide', look: [1, 0], star: { x: -210 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      microwave(x, 790, 820, pop01(t, P.t0 + 0.1, 0.3, 2), lt)
      label(x, 790, 1040, 'SOUP: STILL COLD', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Five new hobbies today? | *Pick one to love.*', mood: lt => lt > 1.6 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      HOBBIES.forEach((h, i) => {
        const keep = i === 1
        x.save(); x.globalAlpha = keep ? 1 : 1 - 0.65 * prog(lt, 1.5, 1.8)
        label(x, 790 + (i % 2 ? 50 : -40), 640 + i * 105, h, pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2.4) * (keep ? 1 + 0.25 * prog(lt, 1.5, 1.8) : 1), { size: 36, bg: HCOL[i], rot: (i % 2 ? 0.05 : -0.05), font: MONO, weight: 700 })
        x.restore()
      })
      hearts(x, t, 840, 760, P.t0 + 1.7, { n: 4, life: 1.4, spread: 140, cell: 6, seed: 4 })
    } },
  { sign: S, cap: 'Won the argument? | *Hear them out.*', mood: lt => lt > 1.4 ? 'happy' : 'sparkle', look: [1, 0], star: { x: -220 }, hops: [0.5],
    front(x, t, lt, P, F) {
      drawBits(x, TROPHY, TROPHY_C, F.x, F.top - 70, 12 * pop01(t, P.t0 + 0.2, 0.3, 2) * (1 - prog(lt, 1.2, 1.4)))
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 800, 950, 190 * k, { mood: lt > 1.6 ? 'heart' : 'neutral', look: [-1, 0], seed: 21, glyph: false })
      bubble(x, 790, 700, 'your turn. | I’m listening.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Skipped the instructions? | *Page one helps.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      shelf(x, 790, 860, pop01(t, P.t0 + 0.1, 0.3, 2), t, lt)
      label(x, 790, 1130, 'SPARE SCREWS: 12', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      for (let i = 0; i < 6; i++) { const k = pop01(t, P.t0 + 1.0 + i * 0.06, 0.2, 2); if (k > 0.01) { x.fillStyle = INK; x.fillRect(640 + i * 52, 1060, 16 * k, 30 * k); x.fillStyle = '#c9c9d8'; x.fillRect(643 + i * 52, 1063, 10 * k, 24 * k) } }
    } },
  { sign: S, cap: 'Your match hasn’t replied? | *It’s been four minutes.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -210 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      screen(x, 790, 850, pop01(t, P.t0 + 0.15, 0.3, 2), { head: '✦ YOUR MATCH', headCol: MINT, lines: [
        ['hiii', CORAL, pop01(t, P.t0 + 0.3, 0.25, 2.2), 1],
        ['hello??', CORAL, pop01(t, P.t0 + 0.5, 0.25, 2.2), 1],
        ['sent 4 min ago', null, pop01(t, P.t0 + 0.8, 0.25, 2.2), 0, 22],
        ['typing…', MINT, pop01(t, P.t0 + 1.5, 0.25, 2.2), -1],
      ] })
      hearts(x, t, 600, 900, P.t0 + 1.6, { n: 4, life: 1.4, spread: 120, cell: 6, seed: 7 })
    } },
  { sign: S, cap: 'Ate lunch standing up? | *Sit. Taste it.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, CHAIR, { W: WOOD }, 790, 1050, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const k = pop01(t, P.t0 + 0.4, 0.3, 2)
      drawBits(x, SANDWICH, SANDWICH_C, 800, 760 + Math.sin(t * 3) * 6, 18 * k)
      label(x, 790, 640, 'FLAVOUR: UNLOCKED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 760, P.t0 + 1.5, 6, 120, 0.4)
    } },
  { sign: S, cap: 'Rest isn’t losing. | *It’s refuelling.*', mood: 'sleepy', star: { x: -200, y: 30 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 840); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -80, 300, 160); x.fillRect(150, -30, 24, 60)
        x.fillStyle = '#140c30'; x.fillRect(-140, -70, 280, 140)
        const lvl = ease.inOutCubic(prog(lt, 0.3, 2.0)), cols = [RED, '#ffb34a', GOLD, MINT, MINT]
        const n = 1 + Math.floor(lvl * 4)
        for (let i = 0; i < n; i++) { x.fillStyle = cols[n - 1]; x.fillRect(-128 + i * 54, -58, 44, 116) }
        x.restore()
      }
      label(x, 790, 1020, lt > 1.9 ? 'FULLY CHARGED' : 'CHARGING…', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0091', key: 'D', accent: CORAL, solo: S, ending: 'group',
  title: 'Aries, this is your | sign *to slow down.*',
  cameos: CAMEOS,
  group: { cap: 'Same fire. | *Slower burn.*', mood: 'happy' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
