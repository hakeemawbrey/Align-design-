// st9sagcrew (25 s vertical Align ad, Star Talk season 9 "A DAY IN THE LIFE", S9 E44) · story 0–20.6, then the end card.
//   THE CREW: Saturday brunch in Sag's kitchen with the other fire signs, Leo and Aries (../../st9saghome.js, ep 'crew':
//   six pins on the map, four postcards on the fridge).  "A Sag tells the truth. *Too much* truth."
//   0.00  Frame 0: Leo poses in a giant new hat; Sag's bubble is already out — "honestly? you look like a *lamp.*" — and
//         the BLUNT-O-METER on the floor is pinned in the red (TOO MUCH).
//   1.90  Gasp zoom on Leo.   3.20  VHS REWIND ◀◀ (the REC counter runs backwards): TAKE 2.
//   4.60  LEO: "be honest. the new *hat?*"  SAG: "it’s bold. very *you.* maybe… tilt it?"  The needle swings to the
//         green: HONEST + KIND. Leo tilts the hat, delighted. ARIES: "ok do me *next.*"
//  11.40  A pop-up card: the Teapot. ★ REAL SKY — some of Sagittarius’s brightest stars make a "Teapot" shape (the real
//         eight stars, steam rising off the spout). Sag pours the tea. (The ghost rises behind the kettle at 13.0.)
//  15.60  Rhymes with frame 0: the same pose, the hat tilted, the same bubble, the needle in the green —
//         "honestly? you look *great.*"   LAST: "Honest *and* kind."
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { drawStarChar, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { gaspZoom, drawGaspLines, drawBits } from '../../st5cast.js'
import { drawRecFrame, drawClock, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, daySky, factChip, factChipCues, DAY_FONTS } from '../../st9day.js'
import { SAG, drawSagHome, drawSag, R, blk, bubble, bubbleCues, popIn } from '../../st9saghome.js'

export const DURATION = 25
const KEY = 'C#m'
const STORY_END = DURATION - ENDCARD_LEN       // 20.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', ORANGE = '#ffb36a'
const MONO = "'Space Mono', ui-monospace, monospace"
const LEO = signStar('leo'), ARI = signStar('aries'), LEOT = '♌ LEO', ARIT = '♈ ARIES'

const T = {
  hookOut: 2.6, gasp: 1.9, rew: [3.2, 4.45], ask: 4.6, kind: 6.4, green: 7.6, tilt: 8.2, aries: 9.6,
  card: 11.4, fact: 11.7, cardOut: 14.9, pour: [13.6, 15.2], ghost: 13.0,
  rhyme: 15.6, last: 17.6, out: [20.15, 20.55],
}
const B = [
  { at: -3, out: 1.85, x: 330, y: 1000, text: 'honestly? you look like a *lamp.*', tag: SAG.tag, tagColor: SAG.color, w: 520, tailX: 0.25 },
  { at: T.ask, out: 6.25, x: 620, y: 960, text: 'be honest. the new *hat?*', tag: LEOT, tagColor: LEO.color, w: 480, tailX: 0.6 },
  { at: T.kind, out: 9.4, x: 330, y: 1000, text: 'it’s bold. very *you.* maybe… tilt it?', tag: SAG.tag, tagColor: SAG.color, w: 520, tailX: 0.25 },
  { at: T.aries, out: 11.2, x: 870, y: 1040, text: 'ok do me *next.*', tag: ARIT, tagColor: ARI.color, w: 380, tailX: 0.8 },
  { at: T.rhyme, out: 17.45, x: 330, y: 1000, text: 'honestly? you look *great.*', tag: SAG.tag, tagColor: SAG.color, w: 520, tailX: 0.25 },
]
const STAMPS = [{ at: 7.8, out: 9.5, time: '11:04 AM', text: 'take two: *kinder*' }]
const FACT = { at: T.fact, dur: 2.9, text: 'Some of Sagittarius’s brightest stars make a “Teapot” shape.', label: '★ REAL SKY', y: 1330 }
const LAST = 'Honest *and* kind.'
const CLOCK = [
  { t: 0, from: '11:04', to: '11:04', at: 0, dur: 0.01, ampm: 'AM' },
  { t: T.card, from: '11:04', to: '11:20', at: T.card, dur: 0.6, ampm: 'AM' },
]
export const GHOST = { at: T.ghost, x: 875, y: 1032, from: 'below', where: 'rising from behind the kettle on Sag’s kitchen counter' }

// the real Teapot (RA h, Dec °): γ Alnasl, δ Kaus Media, ε Kaus Australis, λ Kaus Borealis, φ, σ Nunki, τ, ζ Ascella
const TEA = [[18.097, -30.42], [18.350, -29.83], [18.403, -34.38], [18.466, -25.42], [18.761, -26.99], [18.921, -26.30], [19.116, -27.67], [19.044, -29.88]]
const TEA_LINKS = [[0, 1], [0, 2], [1, 2], [1, 3], [3, 4], [1, 4], [4, 7], [7, 2], [4, 5], [5, 6], [6, 7]]
const CARD = { x0: 250, y0: 630, x1: 930, y1: 980 }
const TEA_XY = (() => {
  const ra0 = 18.6 * 15, de0 = -29.5, cosd = Math.cos(de0 * Math.PI / 180), k = 42, cx = 600, cy = 815
  return TEA.map(([ra, de]) => ({ x: Math.round(cx - (ra * 15 - ra0) * cosd * k), y: Math.round(cy - (de - de0) * k) }))
})()

const HAT = [
  '...hhhhhhhh...',
  '..hHHHHHHHHh..',
  '..hHHHHHHHHh..',
  '.hHHHHHHHHHHh.',
  '.hHHHHHHHHHHh.',
  'hHHHHHHHHHHHHh',
  'fFfFfFfFfFfFfF',
  'f.f.f.f.f.f.f.',
]
const HAT_C = { h: '#c98a1f', H: '#ffe08a', f: '#ff7b54', F: '#ffb36a' }

const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
/** the meter: 0 = kind (green) … 1 = too much (red) */
const blunt = t => {
  if (t < T.rew[0]) return 0.93 + 0.03 * Math.sin(t * 30)
  if (t < T.rew[1]) return lerp(0.93, 0.5, prog(t, ...T.rew))
  if (t < T.green) return 0.5 + 0.05 * Math.sin(t * 9)
  const p = prog(t, T.green, T.green + 0.5)
  return lerp(0.5, 0.18, ease.outBack ? ease.outBack(p) : p) + 0.02 * Math.sin(t * 4)
}
function meter(x, t) {
  const cx = 540, cy = 1470, r = 120, v = clamp(blunt(t), 0, 1)
  blk(x, cx - r - 30, cy - r - 46, 2 * r + 60, r + 60, '#16122a', { o: 6 })
  const zones = [['#3fbf72', 0, 0.4], ['#f2c75c', 0.4, 0.7], ['#e0384f', 0.7, 1]]
  for (const [c, a, b] of zones) { x.strokeStyle = c; x.lineWidth = 26; x.beginPath(); x.arc(cx, cy, r - 20, Math.PI + a * Math.PI, Math.PI + b * Math.PI); x.stroke() }
  const ang = Math.PI + v * Math.PI
  x.strokeStyle = BONE; x.lineWidth = 7; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(ang) * (r - 8), cy + Math.sin(ang) * (r - 8)); x.stroke()
  R(x, INK, cx - 12, cy - 12, 24, 24); R(x, GOLD, cx - 7, cy - 7, 14, 14)
  x.font = `700 18px ${MONO}`; x.textAlign = 'center'; x.fillStyle = '#9a8fb5'; x.fillText('BLUNT-O-METER', cx, cy - r - 18)
  const red = v > 0.7, grn = v < 0.4
  if (red && Math.floor(t * 6) % 2 === 0) { x.font = `800 26px Inter`; x.fillStyle = '#ff5d73'; x.fillText('TOO MUCH', cx, cy + 36) }
  if (grn) { x.font = `800 26px Inter`; x.fillStyle = '#7fe0a8'; x.fillText('HONEST + KIND', cx, cy + 36) }
  x.textAlign = 'left'
}
function rewind(x, t) {
  const p = prog(t, ...T.rew)
  if (p <= 0 || p >= 1) return
  x.save()
  x.globalAlpha = 0.18; x.fillStyle = '#9fd3ff'; x.fillRect(0, 0, 1080, 1920)
  x.globalAlpha = 0.6
  for (let i = 0; i < 9; i++) { const y = ((t * 1700 + i * 263) % 2100) - 90; x.fillStyle = i % 2 ? 'rgba(255,255,255,0.5)' : 'rgba(30,20,60,0.7)'; x.fillRect(0, y, 1080, 10 + (i % 3) * 8) }
  x.globalAlpha = 1
  x.font = `700 64px ${MONO}`; x.fillStyle = BONE; x.shadowColor = 'rgba(0,0,0,0.8)'; x.shadowBlur = 8
  x.fillText('◀◀ REWIND', 120, 600)
  x.font = `700 34px ${MONO}`; x.fillText(Math.floor(t * 4) % 2 ? 'TAKE 2' : '', 120, 650)
  x.restore()
}
function teapotCard(x, t) {
  const k = popIn(t, T.card, 0.35, 1.9) * (1 - ease.inCubic(prog(t, T.cardOut, T.cardOut + 0.3)))
  if (k <= 0.02) return
  const { x0, y0, x1, y1 } = CARD
  x.save(); x.translate((x0 + x1) / 2, (y0 + y1) / 2); x.scale(k, k); x.rotate(0.02); x.translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
  blk(x, x0, y0, x1 - x0, y1 - y0, '#0f0b28', { o: 8 })
  R(x, '#2a2448', x0, y0, x1 - x0, 44)
  x.font = `700 24px ${MONO}`; x.fillStyle = GOLD; x.fillText('★ THE TEAPOT · IN SAGITTARIUS', x0 + 20, y0 + 30)
  const lp = prog(t, T.card + 0.3, T.card + 1.6)
  x.strokeStyle = 'rgba(242,199,92,0.75)'; x.lineWidth = 4
  TEA_LINKS.forEach(([a, b], i) => {
    const q = clamp(lp * TEA_LINKS.length - i); if (q <= 0) return
    const A = TEA_XY[a], Bq = TEA_XY[b]
    x.beginPath(); x.moveTo(A.x, A.y); x.lineTo(lerp(A.x, Bq.x, q), lerp(A.y, Bq.y, q)); x.stroke()
  })
  TEA_XY.forEach((s, i) => { R(x, '#fff1c8', s.x - 5, s.y - 5, 10, 10); drawPixelStar(x, s.x, s.y, i === 2 ? 64 : 48, 2, '#fff1c8') })
  // steam rising off the spout (γ, the westmost star)
  const sp = TEA_XY[0]
  for (let i = 0; i < 4; i++) { const p = ((t * 0.7) + i / 4) % 1; x.globalAlpha = Math.sin(Math.PI * p) * 0.7 * clamp(lp * 2); R(x, '#d9d2ef', sp.x + 20 + Math.sin(p * 6 + i) * 12, sp.y - 30 - p * 110, 10, 10) }
  x.globalAlpha = 1
  x.restore()
}
function teacup(x, cx, cy) { blk(x, cx - 26, cy, 52, 34, BONE, { o: 5 }); R(x, '#c98a5a', cx - 20, cy + 2, 40, 6); R(x, INK, cx + 26, cy + 6, 12, 16) }

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, "700 40px Inter", "800 26px Inter", "800 112px Inter", "italic 600 48px 'EB Garamond'", "italic 500 170px 'EB Garamond'", "700 64px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookPOV(root, { text: 'A Sag tells the truth. *Too much* truth.', at: 0, out: T.hookOut, accentColor: ORANGE, size: 84, accentSize: 124 })
  const stamps = STAMPS.map(s => stampCaption(root, { ...s, accentColor: ORANGE, top: 1630 }))
  const last = popText(root, LAST, { top: 290, size: 108, accentSize: 168, at: T.last, gap: 0.09, accentColor: ORANGE, wobble: true, late: 2, lateAt: T.last + 0.35, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ok = outK(t, T.out)
      drawSky(x, t); daySky(x, t, { hour: lerp(10.8, 11.6, t / STORY_END) })
      drawSeedConstellation(x, t, 100, { alpha: 0.5 })
      const z = gaspZoom(t, { at: T.gasp, dur: 1.25, x: 620, y: 1080, amount: 0.35, follow: 0.5 })
      const jit = t > T.rew[0] && t < T.rew[1] ? Math.round(Math.sin(t * 90) * 6) : 0
      x.save()
      if (ok < 1) { const s = lerp(0.9, 1, ok); x.globalAlpha = ok; x.translate(540, 1030); x.scale(s, s); x.translate(-540, -1030) }
      z.apply(x); x.translate(jit, 0)
      drawSagHome(x, t, { room: 'kitchen', ep: 'crew', noPack: true })
      drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: GHOST.from, cell: 3 })
      // Aries (back right), Leo + the hat (middle), Sag (left, pouring later)
      const ariesMood = t < T.rew[0] ? 'wide' : t < T.aries ? 'happy' : t < T.aries + 1.6 ? 'sparkle' : 'happy'
      drawStarChar(x, 870, 1185, 180, t, { color: ARI.color, glyph: ARI.glyph, mood: ariesMood, look: t < T.rew[0] ? [-1, 0] : [-1, 0], hops: [0.3, T.aries + 0.05, T.aries + 0.5], seed: 2 })
      const leoMood = t < T.gasp ? 'neutral' : t < T.rew[0] ? 'wide' : t < T.green ? 'sparkle' : 'happy'
      const lr = drawStarChar(x, 620, 1150, 240, t, { color: LEO.color, glyph: LEO.glyph, mood: leoMood, look: t < T.rew[0] ? [-1, 0] : [0, 0], blink: t > T.gasp && t < T.rew[0] ? false : undefined, hops: [T.ask + 0.1, T.ask + 0.6, T.tilt, T.rhyme - 0.3], seed: 5 })
      const tilt = t > T.tilt ? -0.32 * clamp(popIn(t, T.tilt, 0.4, 2.2)) : 0.04 * Math.sin(t * 2)
      drawBits(x, HAT, HAT_C, Math.round(lr.x + (tilt < -0.1 ? -14 : 0)), Math.round(lr.top + 6), 11, { rot: tilt })
      const sagMood = t < T.gasp ? 'happy' : t < T.rew[0] ? 'wide' : t < T.kind ? 'squint' : 'happy'
      const sr = drawSag(x, 330, 1150, 230, t, { pack: true, mood: sagMood, look: [1, 0], hops: [0.1, 0.7, T.kind + 0.1, T.kind + 0.8, T.rhyme + 0.1, T.rhyme + 0.6], seed: 8 })
      // pouring: a pixel teapot tilting over two cups on the counter
      const pp = prog(t, ...T.pour)
      if (pp > 0 && pp < 1) {
        teacup(x, 470, 1056); teacup(x, 760, 1056)
        x.save(); x.translate(sr.x + 110, sr.y - 70); x.rotate(-0.6 * Math.sin(Math.PI * pp)); blk(x, -44, -30, 88, 60, '#3a76aa', { o: 6, hi: '#5a96ca' }); R(x, INK, 44, -18, 30, 10); R(x, INK, -60, -14, 16, 34); x.restore()
      } else if (t >= T.pour[1]) { teacup(x, 470, 1056); teacup(x, 760, 1056) }
      for (const b of B) bubble(x, t, b)
      meter(x, t)
      x.restore()
      drawGaspLines(x, t, { at: T.gasp, dur: 1.25, x: 620, y: 1080, follow: 0.5, color: LEO.color })
      teapotCard(x, t)
      factChip(x, t, FACT)
      rewind(x, t)
      const c = [...CLOCK].reverse().find(s => t >= s.t)
      drawClock(x, t, { ...c, sign: 'sag' })
      drawRecFrame(x, t, { battery: 0.7, time: `00:${String(Math.floor(t < T.rew[1] && t > T.rew[0] ? lerp(3, 0, prog(t, ...T.rew)) : t)).padStart(2, '0')}` })
      hook.update(t); for (const s of stamps) s.update(t)
      last.update(t, ok)
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.rew[1], kind: 'flip' }, { t: T.card, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S9 E44' }), cardCuts(CUTS)]

// ── sound
const r3 = v => +v.toFixed(3)
const NOTE = [554.37, 659.25, 739.99, 830.61, 987.77, 1108.73, 1318.51]
const rewTicks = () => { const o = []; for (let t = T.rew[0]; t < T.rew[1]; t += 0.06) o.push(['tick', r3(t), 0.02]); return o }
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ['pop', 0.08, 220, 0.05, 0], ['tick', 0.1, 0.05],                     // the needle slamming red at frame 0
  ...bubbleCues(B.filter(b => b.at > 0), { pitch: { [SAG.tag]: 740, [LEOT]: 587.33, [ARIT]: 880 } }),
  ['whoosh', T.gasp, 0.3, 0.03], ['boom', T.gasp + 0.02, 0.14], ['pluck', T.gasp + 0.05, 277.18, 0.05, 0.6, 0],
  ['whoosh', T.rew[0] + 0.1, 1.0, 0.03], ...rewTicks(), ['pop', T.rew[1] - 0.05, 1318.51, 0.04, 0],
  ...clockCues(CLOCK[1].at, CLOCK[1].dur),
  ['whoosh', T.green + 0.1, 0.3, 0.02], ['bell', T.green + 0.4, 1318.51, 0.04, 1.4, 0], ['pluck', T.green + 0.4, 987.77, 0.04, 0.5, 0],
  ['pop', T.tilt + 0.05, 1108.73, 0.04, 0.2],
  ...STAMPS.flatMap(s => stampCues(s.at)),
  ['pop', T.card + 0.05, 830.61, 0.045, 0], ['glitter', T.card + 0.3, T.card + 1.6],
  ...factChipCues(FACT.at, { dur: FACT.dur }),
  ['tick', T.ghost + 0.05, 0.015],
  ['whoosh', T.pour[0] + 0.3, 0.8, 0.012], ['pluck', T.pour[0] + 0.6, 1318.51, 0.02, 0.4, -0.3], ['pluck', T.pour[0] + 1.0, 1567.98, 0.02, 0.4, 0.3],
  ['pop', T.rhyme - 0.2, 220, 0.03, 0],
  ...[0, 1].map(i => ['pop', r3(T.last + i * 0.09), NOTE[i + 1], 0.026, (i % 2 ? 0.15 : -0.15)]),
  ['pop', r3(T.last + 0.35), 1108.73, 0.05, 0], ['pluck', r3(T.last + 0.35), 830.61, 0.045, 0.6, 0], ['bell', r3(T.last + 0.45), 1661.22, 0.03, 1.4, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
