// st4elpaso (EP 050 · 25 s vertical · Star Talk season 4, drop 5 "Road trip", thread A) · story 0–20.6, then the shared
// end card (cta JOIN THE TEXAS BETA).
//   0.00–5.70  "Dear | *El Paso.*"  The desert at night: a dark mountain range, a road running in, yucca and creosote. On the
//              mountain face a giant star outline of lights burns, steady (El Paso's Star on the Mountain, drawn generic). The
//              road-trip van rolls in, headlights on, and stops. Drop (2.82): Virgo and Gemini pop up on the roof, Sagittarius
//              and Taurus hop out beside it. They see it: wide eyes. ALL STARS: "a cousin!" (heart eyes, hops)
//   5.70–15.5  "It doesn't blink. | It just *stays lit.*"  They wave, wink and bounce at it. Nothing: it doesn't blink, it
//              doesn't move. Gemini squints. THE STARS: "it doesn't do anything fancy." Then a time-lapse: the moon sweeps
//              over again and again (NIGHT 2, NIGHT 3, NIGHT 4), the road-trip stars nod off, and the mountain star never
//              flickers. THE STARS: "it just *shows up*. every night." They wake up, sparkle-eyed.
//   15.5 cut → "Show up like | the *mountain* star."  The four of them glow steady too, looking up, happy, then heart-eyed.
// Easter eggs: seed constellation (EP 50) top-left, "EP 050" in the frame, the ghost peeks over a desert boulder.
// HELLO TEXAS: this last line is the S. One canvas, DOM type + the box on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'
import { GOLD, BONE, PINK, INK, BEAT, pop01, outK, popOut, drawBits, sparkles, floatHearts, glow, mark, NOTE, wordPops } from './kit.js'

export const DURATION = 25
export const EP = 50
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 20.6
const SAG = signStar('sagittarius'), VIR = signStar('virgo'), GEM = signStar('gemini'), TAU_ = signStar('taurus')
const ALL_TAG = 'ALL STARS', SKY_TAG = 'THE STARS'
const BULB = '#fff1c8', WARM = '255,236,190'

const T = {
  h0: 0.12, h0Out: [5.4, 5.65],
  van: [0.3, 2.4], brake: 2.4, pop: BEAT(4), see: 3.25,
  l1: 3.62, wave: [4.6, 8.6], wink: 5.4, bounce: 6.3, squint: 7.6,
  h1: 5.86, h1Land: 6.3,
  ghost: 6.9,
  l2: 8.8, lapse: [10.4, 14.2], sleep: 11.0, l3: 12.2, wake: 13.0,
  close: 15.4, h1Out: [15.3, 15.48],
  h2: 15.66, h2Land: 16.2, steady: 16.6, hearts: 18.2, h2Out: [20.15, 20.42], out: [20.05, 20.45],
}
const LINES = [
  { t: T.l1, speaker: ALL_TAG, text: 'a *cousin!*' },
  { t: T.l2, speaker: SKY_TAG, text: "it doesn't do anything *fancy*." },
  { t: T.l3, speaker: SKY_TAG, text: 'it just *shows up*. every night.' },
]
const CPS = 30
const NIGHTS = [[11.2, 'NIGHT 2'], [12.4, 'NIGHT 3'], [13.6, 'NIGHT 4']]

// ── the van (side-on, facing right)
const VAN = [
  '....RRRRRRRRRRRRRRRRRRRR......',
  '...RWWWWWWWWWWWWWWWWWWWWR.....',
  '..RWbbbWbbbWbbbWbbbWWbbbWR....',
  '..RWbbbWbbbWbbbWbbbWWbbbbWR...',
  '..RWWWWWWWWWWWWWWWWWWWWWWWWR..',
  '..TTTTTTTTTTTTTTTTTTTTTTTTTTT.',
  '..TTTTTTTTTTTTTTTTTTTTTTTTTTTy',
  '..TTTTTTTTTTTTTTTTTTTTTTTTTTTy',
  '.TTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
  '.ggggggggggggggggggggggggggggg',
  '....kkk..............kkk......',
  '...kkkkk............kkkkk.....',
  '....kkk..............kkk......',
]
const VAN_C = { R: '#d8cfc0', W: '#f1ebdf', b: '#2a3a6e', T: '#2fb6a8', y: '#ffe9a8', g: '#1f7a70', k: '#141024' }
const YUCCA = ['X...X...X', '.X..X..X.', '..X.X.X..', 'X..XXX..X', '.XXXXXXX.', '...XXX...', '....X....', '....X....', '....X....']
const SHRUB = ['..XX.XX..', '.XXXXXXX.', 'XXXXXXXXX', '.XXXXXXX.']

// ── layout
const HORIZON = 1060
const MSTAR = { x: 605, y: 918, R: 150 }
const VANP = { x: 330, y: 1210, cell: 12 }
const CAST = [
  { id: 'virgo', s: VIR, dx: -78, y: 1062, size: 148, seed: 9, roof: true },
  { id: 'gemini', s: GEM, dx: 78, y: 1062, size: 148, seed: 2, roof: true },
  { id: 'sag', s: SAG, x: 630, y: 1268, size: 192, seed: 6 },
  { id: 'taurus', s: TAU_, x: 840, y: 1274, size: 188, seed: 5 },
]
const ROCK = { x: 985, top: 1150 }
const LOW = 120, lowK = t => ease.inOutCubic(prog(t, 15.47, 15.57))
const GHOST = { x: ROCK.x, y: ROCK.top, at: T.ghost, dur: 1.45, from: 'below', cell: 3 }

function castState(t, k) {
  if (t < T.see) return { mood: 'happy' }
  if (t < T.l1) return { mood: 'wide', look: [k < 2 ? 1 : -0.4, -1], blink: false }
  if (t < T.wave[0]) return { mood: 'heart' }
  if (t < T.wave[1]) {
    if (k === 1 && t > T.squint) return { mood: 'squint', look: [1, -1] }   // Gemini: …it's ignoring us
    if (t > T.wink && t < T.wink + 0.7 && k % 2 === 0) return { mood: 'wink' }
    return { mood: 'happy' }
  }
  if (t < T.sleep) return { mood: 'neutral', look: [k < 2 ? 1 : -0.4, -1] }
  if (t < T.wake) return { mood: 'sleepy' }
  if (t < T.h2) return { mood: 'sparkle', look: [k < 2 ? 1 : -0.4, -1] }
  if (t < T.hearts + k * 0.15) return { mood: 'happy' }
  return { mood: 'heart' }
}
const HOPS = k => [T.pop + 0.3 + k * 0.08, T.l1 + k * 0.06, T.l1 + 0.3 + k * 0.06, T.wave[0] + k * 0.2, T.bounce + k * 0.12, T.bounce + 0.35 + k * 0.12, T.wake + k * 0.08, T.h2Land + k * 0.1]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const H0 = popText(root, 'Dear | *El Paso.*', { top: 222, size: 132, accentSize: 200, at: T.h0, gap: 0.14, accentColor: GOLD, wobble: true, late: 2, lateAt: T.h0 + 0.26, lateGap: 0.12, fit: true })
  const H1 = popText(root, "It doesn't blink. | It just *stays lit.*", { top: 214, size: 104, accentSize: 150, at: T.h1, late: 2, lateAt: T.h1Land, lateGap: 0.12, wobble: true, accentColor: GOLD, fit: true })
  const H2 = popText(root, 'Show up like | the *mountain* star.', { top: 214, size: 112, accentSize: 168, at: T.h2, gap: 0.1, late: 2, lateAt: T.h2Land, lateGap: 0.14, wobble: true, accentColor: GOLD, lineHeight: 1.0, fit: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 300, open: T.l1 - 0.2, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── the static set: the mountains, the desert, the road, the plants, the boulder
  const set = document.createElement('canvas'); set.width = W; set.height = 1920
  const BULBS = []
  {
    const s = set.getContext('2d'), c = 10
    const hash = (i, j) => { let h = (i * 374761393 + j * 668265263) >>> 0; h = (h ^ (h >>> 13)) * 1274126177 >>> 0; return (h >>> 8) / 16777216 }
    // far range, then the near mountain with the star on it
    const ridge = (xx, far) => far
      ? 820 - 70 * Math.sin(xx * 0.006 + 1) - 40 * Math.sin(xx * 0.017)
      : HORIZON - Math.max(0, 300 - Math.abs(xx - 600) * 0.62) - 30 * Math.sin(xx * 0.021) - 26 - 60 * Math.max(0, Math.sin(xx * 0.004 - 0.6))
    for (const far of [true, false]) for (let xx = 0; xx < W; xx += c) {
      const top = Math.round(ridge(xx, far) / c) * c
      for (let y = top; y < HORIZON; y += c) {
        const ed = y < top + c
        s.fillStyle = far ? (ed ? '#3a2e66' : '#2a2150') : (ed ? '#4a3a6a' : (hash(xx / c, y / c) > 0.92 ? '#2a2042' : '#1c1534'))
        s.fillRect(xx, y, c, c)
      }
    }
    // the desert floor
    for (let y = HORIZON; y < 1920; y += c) {
      const k = (y - HORIZON) / 860
      for (let xx = 0; xx < W; xx += c) {
        s.fillStyle = hash(xx / c, y / c) > 0.93 ? '#5a4a52' : k < 0.15 ? '#3e3042' : '#33283a'
        s.fillRect(xx, y, c, c)
      }
    }
    // the road: from a vanishing point on the horizon, widening toward us
    for (let y = HORIZON; y < 1920; y += c) {
      const k = (y - HORIZON) / 860, hw = lerp(16, 520, k), cx = lerp(560, 640, k)
      s.fillStyle = '#221a2c'; s.fillRect(Math.round(cx - hw), y, Math.round(2 * hw), c)
      if (Math.floor((y - HORIZON) / lerp(20, 90, k)) % 2 === 0) { s.fillStyle = '#e8c86a'; s.fillRect(Math.round(cx - lerp(2, 10, k)), y, Math.round(lerp(4, 20, k)), c) }
    }
    // yucca + creosote (Chihuahuan desert)
    for (const [px, py, sc, kind] of [[90, 1150, 9, 'y'], [190, 1300, 7, 's'], [930, 1110, 6, 'y'], [1010, 1330, 8, 's'], [470, 1120, 4, 's'], [760, 1100, 5, 's']]) {
      const bm = kind === 'y' ? YUCCA : SHRUB
      bm.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === 'X') { s.fillStyle = kind === 'y' ? (j < 5 ? '#3f7a5a' : '#6a5a3a') : '#3a5a3e'; s.fillRect(px + (i - bm[0].length / 2) * sc, py + (j - bm.length) * sc, sc, sc) } }))
    }
    // the boulder (the ghost hides behind it)
    for (let y = ROCK.top; y < ROCK.top + 100; y += c) for (let xx = ROCK.x - 80; xx < ROCK.x + 80; xx += c) {
      const u = (xx + c / 2 - ROCK.x) / 80, v = (y + c / 2 - ROCK.top - 100) / 100
      if (u * u + v * v > 1) continue
      s.fillStyle = u + v < -0.9 ? '#8a7a8a' : u > 0.4 ? '#4a3e52' : '#6a5a6e'; s.fillRect(xx, y, c, c)
    }
    // the star outline's bulbs (generic five-point star, lights along its edges)
    const V = Array.from({ length: 10 }, (_, k) => { const a = -Math.PI / 2 + k * Math.PI / 5, r = k % 2 ? MSTAR.R * 0.42 : MSTAR.R; return [MSTAR.x + Math.cos(a) * r, MSTAR.y + Math.sin(a) * r] })
    for (let k = 0; k < 10; k++) {
      const [ax, ay] = V[k], [bx, by] = V[(k + 1) % 10], n = Math.round(Math.hypot(bx - ax, by - ay) / 15)
      for (let i = 0; i < n; i++) BULBS.push([Math.round(lerp(ax, bx, i / n)), Math.round(lerp(ay, by, i / n))])
    }
  }

  function drawMountainStar(t) {
    // steady. It never blinks.
    glow(x, MSTAR.x, MSTAR.y, MSTAR.R * 2.2, WARM, 0.55)
    glow(x, MSTAR.x, MSTAR.y, MSTAR.R * 1.1, WARM, 0.35)
    for (const [bx, by] of BULBS) { x.fillStyle = '#ffd98a'; x.fillRect(bx - 4, by - 4, 8, 8); x.fillStyle = BULB; x.fillRect(bx - 2, by - 2, 4, 4) }
    void t
  }
  function drawVan(t) {
    const k = ease.outCubic(prog(t, ...T.van))
    const vx = lerp(-320, VANP.x, k), bounce = (k < 1 ? Math.abs(Math.sin(t * 16)) * 3 : 0) + (t > T.brake && t < T.brake + 0.4 ? -6 * Math.sin(Math.PI * (t - T.brake) / 0.4) : 0)
    const c = VANP.cell, vy = VANP.y + bounce + LOW * lowK(t)
    // headlight cone
    x.save(); x.globalCompositeOperation = 'lighter'
    const hx = vx + 15 * c, hy = vy + 0.5 * c
    const g = x.createLinearGradient(hx, 0, hx + 420, 0); g.addColorStop(0, 'rgba(255,233,168,0.35)'); g.addColorStop(1, 'rgba(255,233,168,0)')
    x.fillStyle = g; x.beginPath(); x.moveTo(hx, hy - 10); x.lineTo(hx + 420, hy - 70); x.lineTo(hx + 420, hy + 90); x.lineTo(hx, hy + 14); x.closePath(); x.fill()
    x.restore()
    drawBits(x, VAN, VAN_C, Math.round(vx), Math.round(vy), c)
    // a wheel spin hint
    if (k < 1) { x.fillStyle = '#5a5470'; for (const wx of [-10.5, 7.5]) x.fillRect(Math.round(vx + wx * c + Math.sin(t * 30) * c), Math.round(vy + 5 * c), c, c) }
    return { x: vx, top: vy - 6.5 * c }
  }
  function nightLabel(t) {
    for (const [at, txt] of NIGHTS) {
      const p = prog(t, at, at + 0.9)
      if (p <= 0 || p >= 1) continue
      const a = Math.sin(Math.PI * p)
      x.save(); x.globalAlpha = a
      x.font = "700 30px 'Space Mono', monospace"; x.letterSpacing = '6px'; x.textAlign = 'center'
      const w = x.measureText(txt).width + 40
      x.fillStyle = 'rgba(16,10,40,0.85)'; x.fillRect(MSTAR.x - w / 2, 610, w, 52)
      x.strokeStyle = GOLD; x.lineWidth = 3; x.strokeRect(MSTAR.x - w / 2, 610, w, 52)
      x.fillStyle = BONE; x.fillText(txt, MSTAR.x + 3, 647)
      x.restore()
    }
  }

  function drawCast(t, van) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const rs = []
    CAST.forEach((m, k) => {
      const p = pop01(t, T.pop + k * 0.1, 0.38, 2.2) * ok
      if (p <= 0.01) return
      const cx = m.roof ? van.x + m.dx : m.x
      const cy = m.roof ? van.top - m.size * 0.36 : m.y + LOW * lowK(t)
      const wave = t > T.wave[0] && t < T.wave[1] ? Math.sin((t - T.wave[0]) * 7 + k) * 0.06 : 0
      const sway = t > T.sleep && t < T.wake ? Math.sin(t * 1.4 + k) * 6 : 0
      const glw = t > T.steady ? 1.0 + 0.35 * ease.outCubic(prog(t, T.steady, T.steady + 0.8)) : 0.95
      const r = drawStarChar(x, cx + sway, cy, m.size, t, { color: m.s.color, glyph: m.s.glyph, ...castState(t, k), hops: HOPS(k), pop: p, seed: m.seed, squash: wave, glow: glw })
      rs.push(r)
      if (t > T.wave[0] && t < T.wave[1] && (k === 1 || k === 3)) {
        // a little waving pixel hand-sparkle above
        const ph = (t * 3 + k) % 1
        x.save(); x.globalAlpha = Math.sin(Math.PI * ph); drawPixelStar(x, r.x + Math.sin(t * 8 + k) * 30, r.top - 26, 22, 2, BONE); x.restore()
      }
    })
    if (rs.length === 4) {
      mark(x, t, '!!', rs[3].x, rs[3].top - 30, T.see, 0.8, 8)
      mark(x, t, '!!', rs[0].x, rs[0].top - 30, T.see + 0.05, 0.8, 7)
      mark(x, t, '?', rs[1].x + 30, rs[1].top - 30, T.squint, 1.0, 8)
      if (t > T.l1 && t < T.wave[0]) floatHearts(x, t, 560, 1100, T.l1 + 0.1, T.l1 + 0.6, 2, 7, 520)
      sparkles(x, t, 560, 1150, T.wake, 14, 340, 2, [GOLD, BONE, PINK])
      if (t > T.hearts) floatHearts(x, t, 560, 1220, T.hearts, T.out[0] - 0.3, 5, 6, 560)
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3.4))
      // the time-lapse: the moon sweeps over three more nights; the sky dips between them
      let moon = { ...SKY_H.moon }, dim = SKY_H.dim
      const lp = prog(t, ...T.lapse)
      if (lp > 0 && lp < 1) {
        const n = lp * 3, f = n - Math.floor(n)
        moon = { ...moon, x: lerp(1180, -100, f), y: 260 - Math.sin(Math.PI * f) * 170, alpha: Math.sin(Math.PI * f) > 0.12 ? 1 : 0 }
        dim = SKY_H.dim * (0.75 + 0.25 * Math.sin(Math.PI * f))
      } else if (lp >= 1) {
        const k = ease.outCubic(prog(t, T.lapse[1], T.lapse[1] + 0.8))
        moon = { ...moon, x: lerp(1180, SKY_H.moon.x, k), y: lerp(260, SKY_H.moon.y, k) }
      }
      const base = t < 3.4 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H
      drawSky(x, t, { ...base, dim, moon })
      drawSeedConstellation(x, t, EP)
      x.drawImage(set, 0, 0)
      drawMountainStar(t)
      drawGhostCameo(x, t, GHOST)        // peeks over the boulder
      nightLabel(t)
      if (t < T.out[1] + 0.02) { const van = drawVan(t); drawCast(t, van) } else drawVan(t)
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.76 (H0 → H1) and 15.52 (box shut → the last line). cardfx keeps the 15.52 flip.
const CUTS = [5.76, { t: 15.52, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'JOIN THE TEXAS BETA' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

export const CUES = [
  ...wordPops(T.h0, 1, 0.14, 0, 0.026), ['pop', T.h0 + 0.26, 1174.66, 0.045, 0], ['pop', T.h0 + 0.38, 1318.51, 0.04, 0],
  ['whoosh', T.van[0], 1.6, 0.05], ['riser', T.van[0] + 0.4, T.brake], ['tick', T.brake, 0.05], ['whoosh', T.brake, 0.3, 0.03],
  ['bell', 1.2, 1174.66, 0.025, 2.5, 0.2],
  ...[0, 1, 2, 3].map(k => ['pop', +(T.pop + k * 0.1 + 0.05).toFixed(3), NOTE[2 + k], 0.04, (k - 1.5) * 0.3]),
  ['pop', T.see, 523.25, 0.035, 0], ['pop', T.see + 0.06, 659.25, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [ALL_TAG]: 987.77 } }),
  ['glitter', T.l1, T.l1 + 0.7], ['pluck', T.l1 + 0.1, 1567.98, 0.04, 0.6, 0],
  ...wordPops(T.h1, 3, 0.07, 2, 0.022), ['pop', T.h1Land, 1174.66, 0.045, 0], ['pop', T.h1Land + 0.12, 1318.51, 0.04, 0],
  ['pop', T.wink, 1318.51, 0.025, -0.3], ...[0, 1, 2, 3].map(k => ['pop', +(T.bounce + k * 0.12).toFixed(3), 880, 0.025, 0.2]),
  ['tick', T.squint, 0.025], ['pop', T.ghost + 0.1, 1567.98, 0.012, 0.6],
  ...NIGHTS.map(([at]) => ['bell', at + 0.1, 1174.66, 0.022, 1.4, 0]),
  ['whoosh', T.lapse[0], 0.8, 0.03], ['glitter', T.wake, T.wake + 0.5], ['pop', T.wake, 1318.51, 0.035, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 3, 0.1, 1, 0.026), ['pop', T.h2Land, 1318.51, 0.05, 0], ['pluck', T.h2Land, 1174.66, 0.045, 0.7, 0], ['pop', T.h2Land + 0.14, 1567.98, 0.04, 0],
  ['bell', T.steady, 1760, 0.025, 2.0, 0], ['bell', T.hearts, 1318.51, 0.025, 1.6, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
