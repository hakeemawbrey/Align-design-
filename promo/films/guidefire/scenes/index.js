// guidefire (30 s vertical Align ad, Star Talk "Your Star Guide", element pep talk: fire) · story 0–25.6, then the end card.
//   0.00–3.20  "*Fire* signs, gather round."  The gold guide, lantern lit; below, a little cloud with a campfire, and the
//              ♈ Aries, ♌ Leo and ♐ Sagittarius stars hop onto it, one, two, three.
//   3.20–7.80  The guide rises, the cloud floats up. YOUR STAR: "you love big and fast. we adore that."  The fire ROARS
//              tall; the three cheer; two little fireworks pop.
//   7.80–11.8  YOUR STAR: "but fire needs air and time to breathe."  The fire gasps down to a tiny flicker (cough, a smoke
//              puff); the three lean back and give it room; it breathes back up.
//              Chip: ★ ASTROLOGY SAYS · THE FIRE SIGNS: ARIES, LEO, SAGITTARIUS.
//   11.8–15.6  YOUR STAR: "let the other person catch up."  A lavender star jogs in from the right, puffing; Sag scoots over,
//              they make room; the fire settles into a warm glow.
//   15.6–25.6  card flip · "Burn *warm,* not out."  Marshmallows toast; the four sway; the embers rise into a heart.
// One canvas (sky + cloud + fire + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { popText } from '../../lesson.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR } from '../../startalk.js'
import { guideSign, drawGuide, noteChip, guideHook, factChip, guideCues, loadGuideFonts, GOLD, BONE, INK, MONO,
  pop01, outK, popOut, drawBits, drawBurst, sparkles, wordPops } from '../../stguide.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const GCOL = STAR.sky
const SPEAK = 'YOUR FIRE STAR'
const ARI = guideSign('aries'), LEO = guideSign('leo'), SAG = guideSign('sagittarius')
const THEM = '#b7a6f2'

const T = {
  hop: [0.55, 0.85, 1.15], wink: [1.6, 2.0], hookOut: [2.9, 3.2], rise: [2.95, 3.8],
  open: 3.6, l1: 3.8, roar: [5.5, 7.6], fw: [6.0, 6.6],
  l2: 8.0, gasp: [9.6, 11.2], cough: 10.1, chip: 9.7,
  l3: 12.0, run: [12.3, 14.2], scoot: [12.5, 13.0], sit: 14.4, warm: 14.6,
  close: 15.6, h2: 15.75, h2Land: 16.15, mallow: 17.2, sway: 18.4, heart: 20.6, glint: 22.8, out: [25.0, 25.45],
}
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'you love big and fast. we *adore* that.', color: '#ff9a5a' },
  { t: T.l2, speaker: SPEAK, text: 'but fire needs *air* and time to breathe.', color: '#ffd38a' },
  { t: T.l3, speaker: SPEAK, text: 'let the other person *catch up*.', color: '#ff9a5a' },
]
const CPS = 28
export const LINES_EXPORT = { lines: LINES, cps: CPS, get close() { return T.close } }

const LOG = ['.BBBBBBBBBBBB.', 'BbBBBBBBBBBBbB', 'BBBBBBBBBBBBBB', '.BBBBBBBBBBBB.']
const LOG_C = { B: '#7a4a2a', b: '#c08a52' }
const HEART = ['.PP.PP.', 'PPPPPPP', 'PPPPPPP', '.PPPPP.', '..PPP..', '...P...']
const HEART_C = { P: '#ff5c8e' }

const HERO = { x: 540, y: 760, size: 320 }
const UP = { x: 540, y: 560, size: 250 }
const CLOUD0 = 1380, CLOUD1 = 1190
const FIRE_X = 540, SM = 150
const SEATS = { ari: 190, leo: 360, sag: 860 }
const THEM_SEAT = 720
const HOPS = LINES.flatMap(l => talkHops([l], SPEAK, { cps: CPS }))

function guidePos(t) {
  const p = ease.inOutCubic(prog(t, ...T.rise))
  return { x: HERO.x, y: lerp(HERO.y, UP.y, p), size: lerp(HERO.size, UP.size, p) }
}
const cloudY = t => lerp(CLOUD0, CLOUD1, ease.inOutCubic(prog(t, ...T.rise))) + Math.sin(t * 1.3) * 6
/** fire scale: cozy 1 → roar 2.2 → gasp 0.3 → back 1 → warm 1.15 */
function fireState(t) {
  const roar = ease.outCubic(prog(t, T.roar[0], T.roar[0] + 0.3)) * (1 - ease.inOutCubic(prog(t, T.roar[1] - 0.5, T.roar[1])))
  const gasp = ease.inOutCubic(prog(t, T.gasp[0], T.gasp[0] + 0.5)) * (1 - ease.inOutCubic(prog(t, T.gasp[1] - 0.5, T.gasp[1])))
  const warm = clamp(prog(t, T.warm, T.warm + 0.8))
  return { size: 1 + roar * 1.2 - gasp * 0.55 + warm * 0.12, wild: roar, warm }
}

/** a procedural pixel flame */
function drawFire(x, cx, base, t, { size, wild, warm }, a) {
  const C = 10, cols = Math.max(3, Math.round(9 * Math.sqrt(size) + wild * 4)), H = 140 * size
  x.save(); x.globalAlpha = a
  const R = 260 + size * 120 + warm * 140
  const g = x.createRadialGradient(cx, base - 30, 10, cx, base - 30, R)
  g.addColorStop(0, `rgba(255,${Math.round(190 - wild * 70)},90,${0.3 + wild * 0.15 + warm * 0.15})`); g.addColorStop(1, 'rgba(255,150,60,0)')
  x.fillStyle = g; x.fillRect(cx - R, base - 30 - R, R * 2, R * 2)
  for (let i = 0; i < cols; i++) {
    const u = (i + 0.5) / cols - 0.5
    const prof = Math.max(0, 1 - Math.abs(u) * 2.05) ** (0.9 - wild * 0.3)
    const n = 0.72 + 0.18 * Math.sin(t * 9 + i * 1.7) + 0.1 * Math.sin(t * 15.3 + i * 3.1) + wild * 0.25 * Math.sin(t * 21 + i * 5.3)
    const h = Math.max(1, Math.round((H * prof * n) / C))
    for (let j = 0; j < h; j++) {
      const f = j / Math.max(1, h)
      const core = Math.abs(u) < 0.18 && f < 0.55
      x.fillStyle = core ? '#fffbea' : f < 0.35 ? '#ffb347' : f < 0.7 ? (wild > 0.5 ? '#ff5a2a' : '#ff7a3a') : (wild > 0.5 ? '#c2304f' : '#e8414f')
      x.fillRect(Math.round(cx + u * cols * C - C / 2), base - (j + 1) * C, C, C)
    }
  }
  for (let k = 0; k < 5 + wild * 10; k++) {
    const ph = (t * (0.6 + wild) + k * 0.173) % 1
    x.globalAlpha = a * (1 - ph)
    x.fillStyle = k % 2 ? '#ffd34d' : '#ff7a3a'
    x.fillRect(Math.round(cx + Math.sin(k * 2.3 + t * 2) * (30 + wild * 100)), Math.round(base - 50 - ph * (160 * size)), 8, 8)
  }
  x.restore()
  drawBits(x, LOG, LOG_C, cx - 26, base + 8, 7, { rot: 0.18, alpha: a })
  drawBits(x, LOG, LOG_C, cx + 26, base + 8, 7, { rot: -0.18, alpha: a })
}

async function build(stage) {
  await loadGuideFonts()
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const CHIP = noteChip(root, { label: 'STAR GUIDE · ♈ ♌ ♐ FIRE · PEP TALK', top: 96, out: T.out })
  const HOOK = guideHook(root, { text: '*Fire* signs, | gather round.', accentColor: '#ff7a3a', top: 210, size: 110, accentSize: 150, out: T.hookOut })
  const H2 = popText(root, 'Burn *warm,* | not out.', { top: 1420, size: 124, accentSize: 176, at: T.h2, gap: 0.08, late: 2, lateAt: T.h2Land, lateGap: 0.14, accentColor: '#ff7a3a', lineHeight: 1.0 })
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function drawCloud(cy, a) {
    x.save(); x.globalAlpha = a
    const blobs = [[-380, 30, 70], [-260, 0, 95], [-120, -20, 110], [40, -26, 120], [190, -14, 105], [320, 6, 90], [420, 34, 64]]
    x.fillStyle = INK
    for (const [dx, dy, r] of blobs) { x.beginPath(); x.arc(540 + dx, cy + 60 + dy, r + 7, 0, Math.PI * 2); x.fill() }
    x.fillRect(540 - 440, cy + 60, 880, 107)
    x.fillStyle = '#c9b8f0'
    for (const [dx, dy, r] of blobs) { x.beginPath(); x.arc(540 + dx, cy + 60 + dy, r, 0, Math.PI * 2); x.fill() }
    x.fillRect(540 - 434, cy + 60, 868, 100)
    x.fillStyle = '#efe6f8'
    for (const [dx, dy, r] of blobs) { x.beginPath(); x.arc(540 + dx - r * 0.2, cy + 60 + dy - r * 0.25, r * 0.6, 0, Math.PI * 2); x.fill() }
    // flat top where everyone sits
    x.fillStyle = '#d8ccf4'; x.fillRect(540 - 420, cy - 10, 840, 30)
    x.restore()
  }

  function drawScene(t) {
    const fade = 1 - prog(t, T.out[0], T.out[1])
    const cy = cloudY(t), seatY = cy - 70
    drawCloud(cy, fade)
    const fs = fireState(t)
    drawFire(x, FIRE_X, cy + 4, t, fs, fade)
    // the three fire signs (+ the runner)
    const cheer = t > T.roar[0] && t < T.roar[1]
    const leanBack = fireState(t).size < 0.7 ? 30 : 0
    const sagX = lerp(SEATS.sag, 960, ease.inOutCubic(prog(t, ...T.scoot)))
    const sway = t > T.sway ? Math.sin((t - T.sway) * 2.2) * 14 : 0
    const cheers = cheer ? [5.6, 5.95, 6.3, 6.65, 7.0] : []
    const crew = [
      { s: ARI, x: SEATS.ari, hop: T.hop[0], seed: 4 },
      { s: LEO, x: SEATS.leo, hop: T.hop[1], seed: 5 },
      { s: SAG, x: sagX, hop: T.hop[2], seed: 6 },
    ]
    crew.forEach((c, i) => {
      const k = popOut(t, T.out)
      if (k <= 0.01) return
      const drop = 0
      const mood = t > T.heart ? 'heart' : cheer ? 'wide' : leanBack ? 'squint' : t > T.warm ? 'happy' : t < 3.2 ? 'happy' : 'neutral'
      const dx = (c.x < FIRE_X ? -1 : 1) * leanBack
      const look = [c.x < FIRE_X ? 1 : -1, 0]
      drawStarChar(x, c.x + dx + sway, seatY + drop, SM, t, { color: c.s.color, glyph: c.s.glyph, mood: cheer ? 'happy' : mood, look, seed: c.seed, glow: 0.85, pop: k, hops: [c.hop, ...cheers.map(h => h + i * 0.08), T.sit] })
      // tiny name tag under each
      x.save(); x.globalAlpha = k * fade
      x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.fillStyle = INK
      x.fillText(c.s.name === 'SAGITTARIUS' ? 'SAG' : c.s.name, c.x + dx + sway, cy + 110)
      x.restore()
    })
    // the runner: jogs in from the right, puffing, then sits by the fire
    if (t > T.run[0]) {
      const p = ease.outCubic(prog(t, ...T.run))
      const rx = lerp(1250, THEM_SEAT, p)
      const jog = t < T.run[1] ? Math.abs(Math.sin(t * 12)) * 18 : 0
      const k = popOut(t, T.out)
      drawStarChar(x, rx + sway, seatY - jog, SM, t, { color: THEM, mood: t < T.sit ? 'squint' : t > T.heart ? 'heart' : 'happy', look: [-1, 0], seed: 9, glow: 0.7, pop: k })
      if (t < T.sit + 0.6) {
        for (let i = 0; i < 3; i++) {
          const ph = (t * 1.8 + i / 3) % 1
          x.save(); x.globalAlpha = 0.6 * (1 - ph) * fade; x.fillStyle = '#efe6d6'
          const s = 12 + ph * 20; x.fillRect(Math.round(rx + 60 + ph * 50), Math.round(seatY - 70 - ph * 60 - i * 6), s, s); x.restore()
        }
      }
      drawBurst(x, rx + 60, seatY - 150, 64, t, T.sit, { word: 'phew', color: '#ffd34d', size: 28, life: 0.7 })
    }
    // fireworks over the roar
    T.fw.forEach((tf, i) => {
      if (t < tf || t > tf + 1.0) return
      const tt = t - tf, fz = prog(tt, 0.5, 1.0)
      const fx = i ? 760 : 320, fy = cy - 380
      x.save()
      for (let k = 0; k < 14; k++) {
        const ang = (k / 14) * Math.PI * 2, R = (1 - Math.exp(-tt * 7)) * 110
        x.globalAlpha = (1 - fz) * fade; x.fillStyle = ['#ff7a3a', '#ffd34d', '#ff5c8e', '#fffbea'][k % 4]
        x.fillRect(Math.round(fx + Math.cos(ang) * R - 6), Math.round(fy + Math.sin(ang) * R - 6 + fz * 40), 12, 12)
      }
      x.restore()
    })
    drawBurst(x, FIRE_X + 170, cy - 300, 90, t, T.roar[0] + 0.05, { word: 'ROAR!', color: '#ff7a3a', size: 34, life: 0.8 })
    drawBurst(x, FIRE_X + 120, cy - 110, 60, t, T.cough, { word: 'kff', color: '#aab3c8', size: 26, life: 0.7 })
    // cough smoke
    if (t > T.cough && t < T.cough + 1.2) {
      for (let i = 0; i < 4; i++) {
        const p = prog(t, T.cough + i * 0.08, T.cough + 1 + i * 0.08)
        if (p <= 0 || p >= 1) continue
        x.save(); x.globalAlpha = 0.55 * (1 - p) * fade; x.fillStyle = '#aab3c8'
        const s = 14 + p * 28; x.fillRect(Math.round(FIRE_X - 20 + i * 10 - s / 2), Math.round(cy - 40 - p * 160 - i * 8), s, s); x.restore()
      }
    }
    sparkles(x, t, FIRE_X, cy - 80, T.gasp[1], 10, 140, 1, [GOLD, BONE, '#ff7a3a'])
    sparkles(x, t, FIRE_X, cy - 80, T.warm + 0.2, 12, 200, 2, [GOLD, BONE, '#ff7a3a'])
    // marshmallow sticks
    if (t > T.mallow) {
      const p = pop01(t, T.mallow, 0.4, 2)
      const toast = prog(t, T.mallow + 1, T.mallow + 3)
      x.save(); x.globalAlpha = fade; x.strokeStyle = '#c08a52'; x.lineWidth = 5
      for (const [sx, s] of [[SEATS.leo + 40, 1], [THEM_SEAT - 40, -1]]) {
        const ex = lerp(sx, FIRE_X - s * 50, p), ey = lerp(seatY + 10, cy - 110, p)
        x.beginPath(); x.moveTo(sx + sway, seatY + 10); x.lineTo(ex + sway, ey); x.stroke()
        x.fillStyle = toast > 0.5 ? '#e0a860' : '#fffbea'; x.fillRect(ex + sway - 11, ey - 12, 22, 20)
      }
      x.restore()
    }
    // the embers rise into a heart
    if (t > T.heart) {
      const p = pop01(t, T.heart, 0.5, 2.4), q = 1 - prog(t, T.out[0] - 0.4, T.out[0])
      drawBits(x, HEART, HEART_C, FIRE_X, cy - 260 - Math.min(1.5, t - T.heart) * 30 + Math.sin(t * 2) * 6, 11 * p, { alpha: q * fade })
      sparkles(x, t, FIRE_X, cy - 260, T.heart, 10, 120, 3, [GOLD, '#ff7a3a', '#ff5c8e'])
    }
  }

  function drawTheGuide(t) {
    const g = guidePos(t), k = popOut(t, T.out)
    if (k <= 0) return
    const fs = fireState(t)
    const mood = t > T.wink[0] && t < T.wink[1] ? 'wink' : t < T.rise[0] ? 'happy' : fs.wild > 0.3 ? 'sparkle' : fs.size < 0.6 ? 'wide' : t > T.warm ? 'happy' : 'neutral'
    const r = drawGuide(x, g.x, g.y, g.size, t, { color: GCOL, mood, look: t < T.rise[1] ? [0, 1] : [0, 1], hops: [...HOPS], seed: 2, glow: 1.1, pop: k }, { lantern: 1, glow: 1.3 })
    sparkles(x, t, r.lx, r.ly, T.wink[0], 8, 90, 1, [GOLD, BONE, '#ff7a3a'])
    sparkles(x, t, r.lx, r.ly, T.glint, 8, 80, 2, [GOLD, BONE, '#ff7a3a'])
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: (SKY_H.dim ?? 1) * 0.75 })
      drawTheGuide(t)
      drawScene(t)
      factChip(x, t, { text: 'THE FIRE SIGNS: ARIES,|LEO, SAGITTARIUS', at: T.chip, dur: 2.2, x: 540, y: 790, color: GOLD })
      CHIP.update(t); HOOK.update(t); box.update(t)
      H2.update(t, outK(t, T.out))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.close + 0.05, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

export const CUES = [
  ...guideCues(0.02, { gain: 0.03 }),
  ...T.hop.map((h, i) => ['pop', h, [880, 1108.73, 1318.51][i], 0.04, [-0.4, 0, 0.4][i]]), ['pluck', T.wink[0], 1318.51, 0.03, 0.5, 0.2],
  ['whoosh', T.rise[0], 0.5, 0.03],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['boom', T.roar[0], 0.18], ['whoosh', T.roar[0], 0.6, 0.05], ...T.fw.flatMap(f => [['boom', f, 0.08], ['glitter', f, f + 0.4]]),
  ['pop', 5.6, 1318.51, 0.03, -0.3], ['pop', 5.95, 1479.98, 0.03, 0.3],
  ['whoosh', T.gasp[0], 0.5, 0.025], ['pop', T.cough, 293.66, 0.045, 0.2], ['pop', T.cough + 0.12, 261.63, 0.04, 0.2], ['glitter', T.gasp[1], T.gasp[1] + 0.4],
  ...guideCues(T.chip, { gain: 0.02, notes: [1174.66, 1318.51, 1567.98] }),
  ...Array.from({ length: 7 }, (_, i) => ['tick', +(T.run[0] + 0.3 + i * 0.26).toFixed(3), 0.025]),
  ['whoosh', T.scoot[0], 0.35, 0.025], ['pop', T.sit, 659.25, 0.04, 0.3], ...guideCues(T.warm + 0.2, { gain: 0.022 }),
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 2, 0.08, 1, 0.026), ['pop', T.h2Land, 1318.51, 0.05, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0],
  ['pluck', T.mallow, 880, 0.03, 0.5, -0.2], ['pluck', T.sway, 659.25, 0.025, 0.6, 0], ['pluck', T.sway + 1.4, 739.99, 0.025, 0.6, 0],
  ['pop', T.heart, 1318.51, 0.04, 0], ...guideCues(T.heart + 0.1, { gain: 0.022 }), ...guideCues(T.glint, { gain: 0.016 }),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
