// st4sanantonio (EP 046 · 20 s vertical · Star Talk season 4, drop 5 "Road trip", thread F) · story 0–15.6, then the
// shared end card (cta JOIN THE TEXAS BETA).
//   0.00–5.70  "Dear | *San Antonio.*"  Night on the River Walk: a stone arch bridge, bald cypress on the banks, string
//              lights popping on bulb by bulb. A little river boat glides in with the lavender ♓ Pisces star and the pink ♍
//              Virgo star (its opposite sign; Virgo's clipboard rides along). Pisces gazes up, sparkle-eyed.
//              Drop (2.82): PISCES: "this is SO romantic." Then its daydream bubble fills: the ring, the two cats, the cottage.
//   5.70–11.7  "Two mutable signs. | One *boat.*"  VIRGO (squint, then an eye-roll): "you're doing the wedding thing."
//              PISCES (caught, wide eyes): "no. i'm just *happy* right now." The wedding things poof one by one, the bubble
//              pops, and the dream turns into the real thing: the two of them, here. Virgo blushes.
//   11.7 cut → "This moment | *is* the plan."  Under the lights; Virgo ticks its clipboard (one big ✓), both heart-eyed.
//              Everything pops out by 15.45; the end card takes over at 15.6.
// Easter eggs: the seed constellation (EP 46) top-left, "EP 046" in the frame, the ghost peeks over the bridge parapet.
// HELLO TEXAS: this last line is the T. One canvas (sky + river + boat + stars), DOM type + the box on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'
import { GOLD, BONE, PINK, INK, BEAT, pop01, outK, popOut, drawBits, sparkles, floatHearts, glow, mark, HEART, HEART_C, NOTE, wordPops } from './kit.js'

export const DURATION = 20
export const EP = 46
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const PIS = signStar('pisces'), VIR = signStar('virgo')
const LAV = PIS.color, ACC = '#b9b3ff', VPINK = '#ff8ab6'
const PIS_TAG = `${PIS.glyph} PISCES STAR`, VIR_TAG = `${VIR.glyph} VIRGO STAR`

// ── the timeline (108 bpm grid; the drop at 2.82)
const T = {
  h0: 0.12, h0Out: [5.45, 5.68],
  lights: 0.35, boatIn: [0.2, 1.9], look: 1.2,
  open: 2.66, l1: BEAT(4) + 0.02,
  bubble: 4.05, ring: 4.3, cats: 4.65, house: 5.0, virNotice: 4.9,
  h1: 5.86, h1Land: 6.3, l2: 5.9, roll: [7.15, 7.9],
  ghost: 7.25,
  caught: 7.95, l3: 8.72, poof: [9.05, 9.35, 9.65], burst: 9.95, real: 10.05, blush: 10.35,
  close: 11.62, h1Out: [11.42, 11.6],
  h2: 11.76, h2Land: 12.16, tick: 13.0, hearts: 13.35, h2Out: [15.15, 15.42], out: [15.05, 15.45],
}
const LINES = [
  { t: T.l1, speaker: PIS_TAG, color: ACC, text: 'this is SO romantic.' },
  { t: T.l2, speaker: VIR_TAG, color: VPINK, text: "you're doing the *wedding* thing." },
  { t: T.l3, speaker: PIS_TAG, color: ACC, text: "no. i'm just *happy* right now." },
]
const CPS = 30

// ── pixel bits
const RING = ['....DDD....', '...DWWWD...', '....DDD....', '...GGGGG...', '..GG...GG..', '.GG.....GG.', '.G.......G.', '.GG.....GG.', '..GG...GG..', '...GGGGG...']
const RING_C = { D: '#8fe3ff', W: '#ffffff', G: '#f2c75c' }
const CATS = ['O...O...K...K.', 'OO.OO...KK.KK.', 'OOOOO...KKKKK.', 'OeOeO...KeKeK.', 'OOpOO...KKpKK.', '.OOO.....KKK..', 'OOOOO...KKKKK.', 'OOOOOO..KKKKKK', 'OOOOO.O.KKKKK.']
const CATS_C = { O: '#f2a65a', K: '#5b5470', e: '#1b1236', p: '#ff8fb1' }
const HOUSE = ['......RR.....', '.....RRRR.c..', '....RRRRRRc..', '...RRRRRRRR..', '..RRRRRRRRRR.', '.RRRRRRRRRRRR', '..WWWWWWWWW..', '..WbbWWWbbW..', '..WbbWWWbbW..', '..WWWddWWWW..', '..WWWddWWWW..', 'gggggddgggggg']
const HOUSE_C = { R: '#e8445a', c: '#9a8a8a', W: '#fbf1dc', b: '#8fd3ff', d: '#8a5a34', g: '#4fbf6a' }
// the dream turns real: a tiny boat with the two of them under three bulbs
const MINI = [
  '..y.....p.....y..',
  '.................',
  '...LL.......VV...',
  '..LLLL.....VVVV..',
  '...LL.......VV...',
  'TTTTTTTTTTTTTTTTT',
  '.HHHHHHHHHHHHHHH.',
  '..HHHHHHHHHHHHH..',
]
const MINI_C = { y: '#ffd27a', p: '#ff8fb1', L: '#b9b3ff', V: '#ff8ab6', T: '#f2c75c', H: '#2a8a78' }
const CLIP = ['..KKK..', 'BBKKKBB', 'BPPPPPB', 'BPllPPB', 'BPPPPPB', 'BPllPPB', 'BPPPPPB', 'BPllPPB', 'BPPPPPB', 'BBBBBBB']
const CLIP_C = { K: '#9aa3b8', B: '#8a5a34', P: '#fbf6ea', l: '#b9b0c8' }
const CHECK = ['.......GG', '......GG.', '.....GG..', 'GG..GG...', '.GGGG....', '..GG.....']
const MORT = '#7d6a4c', STONE = ['#c9b48a', '#bfa97e', '#d3c095', '#b49f74']

// ── layout
const BRIDGE = { x0: 96, x1: 984, top: 800, deck: 850, water: 1046, ax: 540, arx: 318, ary: 168 }
const WATER_Y = 1040
const BOAT = { x: 540, y: 1300, w: 660 }
const LOW = 120
const lowK = t => ease.inOutCubic(prog(t, 11.63, 11.73))
const PIS0 = { dx: -165, y: -110, size: 286 }, VIR0 = { dx: 165, y: -106, size: 270 }
const BUB = { x: 470, y: 700, w: 600, h: 270 }
const STRANDS = [
  { a: [-30, 560], b: [1110, 590], sag: 120, n: 15, ph: 0 },
  { a: [-30, 690], b: [1110, 668], sag: 90, n: 14, ph: 0.4 },
]
const BULB_C = ['#ffd27a', '#ff8fb1', '#8fe3ff', '#ffe9a8', '#b6ff8f', '#ffb36b']
const GHOST = { x: 812, y: BRIDGE.top, at: T.ghost, dur: 1.45, from: 'below', cell: 3 }

function pisState(t) {
  if (t < T.l1) return { mood: 'sparkle', look: t < T.look ? [0, 0] : [0, -1] }
  if (t < T.bubble) return { mood: 'happy' }
  if (t < T.caught) return { mood: 'heart' }                                 // lost in the daydream
  if (t < T.l3) return { mood: 'wide', look: [1, 0], blink: false }          // caught
  if (t < T.burst) return { mood: 'happy' }
  if (t < T.h2) return { mood: 'sparkle', look: [1, 0] }
  if (t < T.hearts) return { mood: 'happy' }
  return { mood: 'heart' }
}
function virState(t) {
  if (t < T.l1) return { mood: 'neutral', look: t < T.look ? [0, 0] : [0, -1] }
  if (t < T.virNotice) return { mood: 'happy' }
  if (t < T.l2) return { mood: 'wide', look: [-1, -1], blink: false }        // …is that a wedding?
  if (t < T.roll[0]) return { mood: 'squint', look: [-1, 0] }
  if (t < T.roll[1]) return { mood: 'eyeroll' }
  if (t < T.l3) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.real) return { mood: 'wide', look: [-1, 0], blink: false }
  if (t < T.hearts + 0.3) return { mood: 'happy', blush: 1 }
  return { mood: 'heart' }
}
const PIS_HOPS = [T.l1, T.l1 + 0.36, T.ring + 0.05, T.house + 0.05, T.l3, T.l3 + 0.5, T.burst, T.h2Land, T.hearts]
const VIR_HOPS = [T.l2, T.l2 + 0.45, T.roll[1], T.real + 0.05, T.tick, T.hearts + 0.3]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 21px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Dear | *San Antonio.*', { top: 236, size: 128, accentSize: 170, at: T.h0, gap: 0.14, accentColor: ACC, wobble: true, late: 2, lateAt: T.h0 + 0.26, lateGap: 0.12, fit: true })
  const H1 = popText(root, 'Two mutable signs. | One *boat.*', { top: 210, size: 100, accentSize: 150, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: PINK, fit: true })
  const H2 = popText(root, 'This moment | *is* the plan.', { top: 214, size: 128, accentSize: 180, at: T.h2, gap: 0.1, late: 3, lateAt: T.h2Land, lateGap: 0.13, wobble: true, accentColor: GOLD, lineHeight: 1.0, fit: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── the static set (bridge, banks, cypress), drawn once
  const set = document.createElement('canvas'); set.width = W; set.height = 1920
  const sx = set.getContext('2d')
  drawSet(sx)

  function drawSet(s) {
    const c = 10
    const hash = (i, j) => { let h = (i * 374761393 + j * 668265263) >>> 0; h = (h ^ (h >>> 13)) * 1274126177 >>> 0; return (h >>> 8) / 16777216 }
    // far water seen through the arch + far bank glow
    s.fillStyle = '#0b2a36'; s.fillRect(BRIDGE.x0, BRIDGE.deck, BRIDGE.x1 - BRIDGE.x0, BRIDGE.water - BRIDGE.deck)
    const fg = s.createLinearGradient(0, BRIDGE.deck, 0, BRIDGE.water)
    fg.addColorStop(0, '#120c2c'); fg.addColorStop(0.6, '#1b2244'); fg.addColorStop(1, '#16404c')
    s.fillStyle = fg; s.fillRect(BRIDGE.x0, BRIDGE.deck, BRIDGE.x1 - BRIDGE.x0, BRIDGE.water - BRIDGE.deck)
    // tiny far lights through the arch
    for (let k = 0; k < 9; k++) { s.fillStyle = BULB_C[k % BULB_C.length]; s.fillRect(300 + k * 56, 948 + (k % 2) * 6, 6, 6) }
    // the bridge: limestone blocks, an arch opening, a parapet with balusters
    for (let y = BRIDGE.top; y < BRIDGE.water; y += c) for (let xx = BRIDGE.x0; xx < BRIDGE.x1; xx += c) {
      const cx = xx + c / 2, cy = y + c / 2
      const u = (cx - BRIDGE.ax) / BRIDGE.arx, v = (cy - BRIDGE.water) / BRIDGE.ary
      if (u * u + v * v < 1) continue
      const j = Math.round((y - BRIDGE.top) / c), i = Math.round((xx - BRIDGE.x0) / c)
      if (y < BRIDGE.top + 2 * c) { s.fillStyle = j === 0 ? '#e2d2ac' : STONE[0]; s.fillRect(xx, y, c, c); continue }   // rail
      if (y < BRIDGE.deck - c) { if (i % 5 === 2 || i % 5 === 3 || i < 2 || i > 85) { s.fillStyle = i % 5 === 2 ? '#d8c69c' : '#a8936a'; s.fillRect(xx, y, c, c) } continue }   // balusters
      if (y < BRIDGE.deck) { s.fillStyle = '#8f7a55'; s.fillRect(xx, y, c, c); continue }   // deck lip
      const row = j % 3, off = (Math.floor(j / 3) % 2) * 3
      const mort = row === 2 || (i + off) % 6 === 0
      s.fillStyle = mort ? MORT : STONE[Math.floor(hash(Math.floor((i + off) / 6), Math.floor(j / 3)) * 4)]
      s.fillRect(xx, y, c, c)
    }
    // voussoirs: a darker ring of stones round the arch
    for (let k = 0; k <= 28; k++) {
      const a = Math.PI + Math.PI * k / 28
      const px = BRIDGE.ax + Math.cos(a) * (BRIDGE.arx + 14), py = BRIDGE.water + Math.sin(a) * (BRIDGE.ary + 14)
      s.fillStyle = k % 2 ? '#a8936a' : '#d8c69c'; s.fillRect(Math.round(px / c) * c - c, Math.round(py / c) * c - c, 2 * c, 2 * c)
    }
    // shade on the bridge (night): a blue wash, warm light from below
    s.save(); s.globalCompositeOperation = 'multiply'
    const sh = s.createLinearGradient(0, BRIDGE.top, 0, BRIDGE.water); sh.addColorStop(0, '#6a6aa8'); sh.addColorStop(1, '#a88a7a')
    s.fillStyle = sh; s.fillRect(BRIDGE.x0, BRIDGE.top, BRIDGE.x1 - BRIDGE.x0, BRIDGE.water - BRIDGE.top)
    s.restore()
    // banks: stone walls running toward us on both sides
    for (const side of [-1, 1]) {
      for (let y = 900; y < 1920; y += c) {
        const k = (y - 900) / 1020, wdt = lerp(110, 250, k)
        for (let xx = 0; xx < wdt; xx += c) {
          const X = side < 0 ? xx : W - xx - c
          const edge = xx >= wdt - c
          s.fillStyle = edge ? '#e2d2ac' : ((Math.floor(y / 30) + Math.floor(xx / 60)) % 2 ? '#6e6250' : '#62574a')
          s.fillRect(X, y, c, c)
        }
      }
    }
    // bald cypress on both banks (trunks flare at the base, feathery drooping foliage)
    for (const [tx, top] of [[46, 470], [1034, 500]]) {
      for (let y = top + 120; y < 1000; y += c) {
        const k = (y - top) / (1000 - top), wdt = lerp(26, 70, k ** 3)
        s.fillStyle = '#4a3a2e'; s.fillRect(Math.round((tx - wdt / 2) / c) * c, y, Math.round(wdt / c) * c, c)
        s.fillStyle = '#5e4a3a'; s.fillRect(Math.round((tx - wdt / 2) / c) * c, y, c, c)
      }
      const blobs = [[0, 0, 120], [-70, 90, 100], [80, 110, 95], [-20, 200, 110], [60, 260, 80], [-90, 260, 70], [10, 330, 70]]
      for (let y = top - 140; y < top + 420; y += c) for (let xx = tx - 220; xx < tx + 220; xx += c) {
        let on = false
        for (const [bx, by, br] of blobs) if ((xx - tx - bx) ** 2 + ((y - top - by) * 1.15) ** 2 < br * br) { on = true; break }
        if (!on) continue
        const hgt = hash(Math.round(xx / c), Math.round(y / c))
        s.fillStyle = hgt < 0.12 ? '#3c7a52' : hgt < 0.55 ? '#1f4a36' : '#173a2c'
        s.fillRect(xx, y, c, c)
        if (hgt > 0.93) { s.fillStyle = '#173a2c'; s.fillRect(xx, y + c, c, 2 * c) }   // drooping strands
      }
    }
  }

  function strandPt(S, u) {
    const xx = lerp(S.a[0], S.b[0], u), yy = lerp(S.a[1], S.b[1], u) + S.sag * 4 * u * (1 - u)
    return [xx, yy]
  }
  function drawLights(t, boost) {
    for (const [si, S] of STRANDS.entries()) {
      // wire
      x.save(); x.strokeStyle = 'rgba(20,14,40,0.9)'; x.lineWidth = 3; x.beginPath()
      for (let k = 0; k <= 40; k++) { const [px, py] = strandPt(S, k / 40); k ? x.lineTo(px, py) : x.moveTo(px, py) }
      x.stroke(); x.restore()
      for (let k = 0; k < S.n; k++) {
        const u = (k + 0.5) / S.n, [px, py] = strandPt(S, u)
        const on = clamp((t - T.lights - (si * S.n + k) * 0.045) / 0.08)
        const col = BULB_C[(k + si * 2) % BULB_C.length]
        const tw = 0.75 + 0.25 * Math.sin(t * 2.4 + k * 1.7 + si)
        x.fillStyle = INK; x.fillRect(Math.round(px) - 6, Math.round(py) + 2, 12, 16)
        x.fillStyle = on > 0.5 ? col : '#3a3352'; x.fillRect(Math.round(px) - 4, Math.round(py) + 4, 8, 12)
        x.fillStyle = 'rgba(255,255,255,0.8)'; if (on > 0.5) x.fillRect(Math.round(px) - 2, Math.round(py) + 6, 2, 4)
        if (on > 0) {
          const [r, g, b] = [parseInt(col.slice(1, 3), 16), parseInt(col.slice(3, 5), 16), parseInt(col.slice(5, 7), 16)]
          glow(x, px, py + 10, 46 + 10 * boost, `${r},${g},${b}`, on * tw * (0.8 + 0.4 * boost))
          // its reflection on the water (a wavering streak)
          if (si === 0 || k % 2) {
            x.save(); x.globalAlpha = 0.28 * on * tw
            x.fillStyle = col
            for (let j = 0; j < 9; j++) {
              const ry = WATER_Y + 12 + j * 18 + (py - 560) * 0.3, wob = Math.sin(t * 3 + j * 1.3 + k) * 8
              x.fillRect(Math.round(px + wob - (10 - j)), Math.round(ry), (10 - j) * 2 + 4, 4)
            }
            x.restore()
          }
        }
      }
    }
  }
  function drawWater(t) {
    const g = x.createLinearGradient(0, WATER_Y, 0, 1920)
    g.addColorStop(0, '#103e4a'); g.addColorStop(0.35, '#0c2e3c'); g.addColorStop(1, '#06141e')
    x.fillStyle = g; x.fillRect(0, WATER_Y, W, 1920 - WATER_Y)
    // ripples drifting toward us
    x.save()
    for (let j = 0; j < 30; j++) {
      const yy = WATER_Y + 8 + j * 15 + (j * j * 0.4)
      if (yy > 1920) break
      const sp = 14 + j * 2, len = 18 + j * 2
      x.fillStyle = j % 3 ? 'rgba(143,227,255,0.13)' : 'rgba(255,233,168,0.12)'
      for (let k = 0; k < 7; k++) {
        const xx = ((k * 173 + j * 97 + t * sp) % 1240) - 80
        x.fillRect(Math.round(xx), Math.round(yy), len, 3)
      }
    }
    x.restore()
  }

  // the bubble (a pixel cloud) — the daydream, then the real thing
  function cloud(cx, cy, w, h, c, fillC, edge) {
    const blobs = [[0, 0.08, 0.5], [-0.28, 0.12, 0.42], [0.28, 0.12, 0.42], [-0.12, -0.18, 0.42], [0.16, -0.2, 0.4], [-0.4, 0.2, 0.3], [0.4, 0.2, 0.3]]
    const inside = (px, py) => blobs.some(([bx, by, br]) => { const dx = px - bx * w, dy = py - by * h, r = br * h; return dx * dx + dy * dy <= r * r })
    const nx = Math.ceil(w / c / 2) + 2, ny = Math.ceil(h / c / 2) + 3
    for (const pass of [0, 1]) for (let j = -ny; j <= ny; j++) for (let i = -nx; i <= nx; i++) {
      const px = i * c, py = j * c, on = inside(px, py)
      if (pass === 0) { if (!on && (inside(px + c, py) || inside(px - c, py) || inside(px, py + c) || inside(px, py - c))) { x.fillStyle = edge; x.fillRect(cx + px - c / 2, cy + py - c / 2, c + 0.5, c + 0.5) } }
      else if (on) { x.fillStyle = j < -ny * 0.35 ? '#ffffff' : fillC; x.fillRect(cx + px - c / 2, cy + py - c / 2, c + 0.5, c + 0.5) }
    }
  }
  function drawBubble(t, from) {
    const bin = pop01(t, T.bubble, 0.4, 2.0), pk = prog(t, T.burst, T.burst + 0.16)
    if (bin <= 0.01 || pk >= 1) return
    const s = bin * (1 + 0.22 * Math.sin(Math.PI * pk)) * (1 - pk)
    const bob = Math.sin(t * 2.1) * 8
    const dots = [[0.25, 14], [0.5, 20], [0.75, 26]]
    dots.forEach(([f, r], i) => {
      if (t < T.bubble - 0.2 + i * 0.1) return
      const dx = lerp(from.x, BUB.x - 40, f), dy = lerp(from.y - 10, BUB.y + BUB.h * 0.45, f) + bob * f
      x.save(); x.globalAlpha = 1 - pk
      x.fillStyle = 'rgba(185,179,255,0.9)'; x.fillRect(Math.round(dx - r / 2) - 4, Math.round(dy - r / 2) - 4, r + 8, r + 8)
      x.fillStyle = '#f4f2ff'; x.fillRect(Math.round(dx - r / 2), Math.round(dy - r / 2), r, r)
      x.restore()
    })
    x.save(); x.translate(BUB.x, BUB.y + bob); x.scale(s, s)
    cloud(0, 0, BUB.w, BUB.h, 12, '#f4f2ff', '#b9b3ff')
    const items = [[RING, RING_C, -190, T.ring, T.poof[0]], [CATS, CATS_C, 0, T.cats, T.poof[1]], [HOUSE, HOUSE_C, 190, T.house, T.poof[2]]]
    for (const [bm, cols, ox, t0, tp] of items) {
      const p = pop01(t, t0, 0.3, 2.6), q = prog(t, tp, tp + 0.14)
      if (p <= 0.01 || q >= 1) continue
      drawBits(x, bm, cols, ox, 18 + Math.sin(t * 3 + ox) * 4, 9 * p * (1 + 0.3 * Math.sin(Math.PI * q)) * (1 - q), { rot: Math.sin(t * 2 + ox) * 0.05 })
    }
    for (const [ox, tp] of [[-190, T.poof[0]], [0, T.poof[1]], [190, T.poof[2]]]) sparkles(x, t, ox, 18, tp, 6, 46, ox, [PINK, ACC, BONE])
    x.restore()
  }

  function drawBoat(t, ok) {
    const k = ease.outCubic(prog(t, ...T.boatIn))
    const bx = lerp(-460, BOAT.x, k) + Math.sin(t * 0.9) * 10, by = BOAT.y + Math.sin(t * 2.2) * 5 + LOW * lowK(t)
    const rock = Math.sin(t * 1.7) * 0.012 + (1 - k) * 0.03
    const w = BOAT.w, c = 10
    x.save(); x.translate(Math.round(bx), Math.round(by)); x.rotate(rock); x.globalAlpha = clamp(ok * 2)
    // reflection
    x.save(); x.globalAlpha *= 0.25; x.fillStyle = '#2a8a78'; x.fillRect(-w / 2 + 20, 56, w - 40, 30); x.restore()
    // hull: a flat river boat with a gold trim and a pointed bow on the right
    for (let j = 0; j < 7; j++) {
      const inset = j < 2 ? 0 : (j - 1) * c * 1.4
      x.fillStyle = j === 0 ? INK : j === 1 ? GOLD : j < 4 ? '#2a8a78' : '#1f6a5c'
      x.fillRect(-w / 2 + inset - c, j * c - 10, w - inset * 2 + 2 * c, c)
    }
    // bow tip
    x.fillStyle = INK; x.fillRect(w / 2 + c, -30, c, 20); x.fillStyle = GOLD; x.fillRect(w / 2, -20, c, 10)
    // portholes / light dots on the side
    for (let k2 = 0; k2 < 6; k2++) { x.fillStyle = '#ffd27a'; x.fillRect(-w / 2 + 60 + k2 * 92, 18, 8, 8) }
    x.restore()
    return { x: bx, y: by }
  }
  function drawBench(bt) {
    // a low bench behind the stars (drawn before them)
    x.fillStyle = INK; x.fillRect(Math.round(bt.x - 250), Math.round(bt.y - 44), 500, 30)
    x.fillStyle = '#8a5a34'; x.fillRect(Math.round(bt.x - 244), Math.round(bt.y - 40), 488, 22)
    x.fillStyle = '#a8703f'; x.fillRect(Math.round(bt.x - 244), Math.round(bt.y - 40), 488, 6)
  }
  function drawClip(t, bt, ok) {
    const cx = bt.x + 330, cy = bt.y - 96 + Math.sin(t * 2.2 + 1) * 3
    drawBits(x, CLIP, CLIP_C, Math.round(cx), Math.round(cy), 9, { rot: 0.12, alpha: clamp(ok * 2) })
    const p = pop01(t, T.tick, 0.3, 2.8)
    if (p > 0.02) drawBits(x, CHECK, { G: '#7dffb0' }, Math.round(cx + 4), Math.round(cy + 6), 11 * p, { rot: 0.12, alpha: clamp(ok * 2) })
    sparkles(x, t, cx, cy, T.tick, 8, 70, 1, ['#7dffb0', GOLD, BONE])
  }
  function drawReal(t) {
    // after the pop: the real moment, small and steady, where the dream was
    const p = pop01(t, T.real, 0.4, 2.2) * (1 - prog(t, T.h2 - 0.25, T.h2 - 0.05))
    if (p <= 0.01) return
    const cx = BUB.x + 30, cy = BUB.y + 30 + Math.sin(t * 2) * 6
    x.save(); x.globalAlpha = clamp(p)
    x.fillStyle = 'rgba(16,10,40,0.82)'; x.fillRect(cx - 150 * p, cy - 96 * p, 300 * p, 192 * p)
    x.strokeStyle = GOLD; x.lineWidth = 6; x.strokeRect(cx - 150 * p, cy - 96 * p, 300 * p, 192 * p)
    x.restore()
    drawBits(x, MINI, MINI_C, Math.round(cx), Math.round(cy + 6), 14 * p, { alpha: clamp(p) })
    x.save(); x.globalAlpha = clamp(p); x.font = `700 21px 'Space Mono', monospace`; x.letterSpacing = '4px'; x.textAlign = 'center'; x.fillStyle = BONE
    x.fillText('NOW', cx, cy - 58 * p); x.restore()
  }

  function drawStars(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const bt = drawBoat(t, ok)
    drawBench(bt)
    const pin = pop01(t, T.boatIn[0] + 0.5, 0.4, 2) * ok, vin = pop01(t, T.boatIn[0] + 0.62, 0.4, 2) * ok
    const ps = pisState(t), vs = virState(t)
    const lean = t > T.hearts ? 18 * ease.inOutCubic(prog(t, T.hearts, T.hearts + 0.4)) : 0
    const rP = drawStarChar(x, bt.x + PIS0.dx + lean, bt.y + PIS0.y, PIS0.size, t, { color: LAV, glyph: PIS.glyph, ...ps, hops: PIS_HOPS, pop: pin, seed: 4, glow: 1.1 })
    const rV = drawStarChar(x, bt.x + VIR0.dx - lean, bt.y + VIR0.y, VIR0.size, t, { color: VIR.color, glyph: VIR.glyph, ...vs, hops: VIR_HOPS, pop: vin, seed: 9, glow: 1.05 })
    drawClip(t, bt, ok)
    // boat lip in front of the stars' lower tips
    x.save(); x.globalAlpha = clamp(ok * 2)
    x.fillStyle = INK; x.fillRect(Math.round(bt.x - BOAT.w / 2 - 10), Math.round(bt.y - 20), BOAT.w + 20, 12)
    x.fillStyle = GOLD; x.fillRect(Math.round(bt.x - BOAT.w / 2 - 10), Math.round(bt.y - 18), BOAT.w + 20, 6)
    x.restore()
    // effects
    mark(x, t, '!!', rP.x + 40, rP.top - 30, T.caught, 0.75, 9)
    mark(x, t, '!', rV.x, rV.top - 30, T.virNotice, 0.7, 9)
    sparkles(x, t, BUB.x, BUB.y, T.burst, 12, 230, 2, [ACC, PINK, BONE, GOLD])
    if (t > T.real && t < T.h2) floatHearts(x, t, rV.x, rV.y - 20, T.blush, T.blush + 0.3, 3, 6, 120)
    if (t > T.hearts) floatHearts(x, t, (rP.x + rV.x) / 2, rP.y - 30, T.hearts, T.out[0] - 0.3, 5, 7, 300)
    return rP
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H
      drawSky(x, t, base)
      drawSeedConstellation(x, t, EP)
      x.drawImage(set, 0, 0)
      drawGhostCameo(x, t, GHOST)        // peeks over the parapet (behind nothing else)
      drawWater(t)
      const boost = t > T.h2 ? ease.outCubic(prog(t, T.h2, T.h2 + 0.6)) : 0
      drawLights(t, boost)
      if (t < T.out[1] + 0.02) {
        const rP = drawStars(t)
        if (rP) drawBubble(t, { x: rP.x - 40, y: rP.top })
        drawReal(t)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.78 (H0 out → H1) and 11.68 (box shut → the last line). cardfx keeps the 11.68 flip.
const CUTS = [5.78, { t: 11.68, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'JOIN THE TEXAS BETA' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

export const CUES = [
  // hook: headline, the boat glides in, the lights pop on bulb by bulb
  ...wordPops(T.h0, 1, 0.14, 0, 0.026), ['pop', T.h0 + 0.26, 1174.66, 0.045, 0], ['pop', T.h0 + 0.38, 1318.51, 0.04, 0],
  ['whoosh', T.boatIn[0], 1.2, 0.03],
  ...Array.from({ length: 10 }, (_, i) => ['pop', +(T.lights + i * 0.13).toFixed(3), NOTE[(i * 3) % 7] * 2, 0.012, ((i % 5) - 2) * 0.2]),
  ['glitter', T.lights + 0.2, T.lights + 1.3],
  ['bell', T.look, 1760, 0.02, 1.2, -0.2],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [PIS_TAG]: 880, [VIR_TAG]: 659.25 } }),
  // the daydream
  ['whoosh', T.bubble - 0.05, 0.4, 0.025], ['pop', T.bubble + 0.1, 1318.51, 0.03, -0.3],
  ['pluck', T.ring, 1567.98, 0.04, 0.6, -0.3], ['pop', T.cats, 1174.66, 0.035, 0], ['pop', T.house, 987.77, 0.035, 0.3], ['glitter', T.ring, T.house + 0.4],
  ['pop', T.virNotice, 440, 0.03, 0.3],
  ...wordPops(T.h1, 4, 0.07, 2, 0.022), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ['tick', T.roll[0] + 0.1, 0.02], ['tick', T.roll[0] + 0.4, 0.02],
  ['pop', T.ghost + 0.1, 1567.98, 0.012, 0.6],
  ['pop', T.caught, 523.25, 0.035, -0.2], ['pop', T.caught + 0.08, 440, 0.03, -0.2],
  // the dream poofs, the real thing
  ['pop', T.poof[0], 1318.51, 0.03, -0.3], ['pop', T.poof[1], 1174.66, 0.03, 0], ['pop', T.poof[2], 987.77, 0.03, 0.3],
  ['pop', T.burst, 1318.51, 0.045, 0], ['tick', T.burst + 0.03, 0.03], ['glitter', T.burst, T.burst + 0.5],
  ['bell', T.real + 0.05, 1174.66, 0.035, 1.6, 0], ['pluck', T.blush, 1567.98, 0.035, 0.5, 0.3],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // the last line
  ...wordPops(T.h2, 2, 0.1, 1, 0.026), ['pop', T.h2Land, 1318.51, 0.05, 0], ['pluck', T.h2Land, 1174.66, 0.045, 0.7, 0],
  ['pluck', T.tick, 1760, 0.04, 0.5, 0.3], ['glitter', T.tick, T.tick + 0.4],
  ['bell', T.hearts, 1760, 0.025, 1.2, 0], ['pluck', T.hearts + 0.05, 1174.66, 0.035, 0.6, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
