// st4texasdeck (15 s vertical Align ad, Star Talk season 4, EP 065, "tonight's deck") · story 0–10.6, then the end card.
//   NOTE (STARTALK5.md): post this one only once the Texas beta is real.
//   0.00–4.90  "Tonight's deck, | now in *Texas.*"  A generic pixel map of Texas wipes in on the night sky; city dots pop on
//              with small labels (Amarillo, Lubbock, El Paso, Fort Worth, Dallas, Austin, San Antonio, Houston, Corpus
//              Christi). From a deck at the bottom, card backs deal out across the state, one per city.
//              Drop (2.82): THE STARS: "same deal, bigger table."  (Ghost: peeks up from behind the deck.)
//   5.00–8.40  "One hand. | Every *night.*"  The cards sweep up and away and a fresh hand deals in.  THE STARS: "a new hand
//              every night, all over *Texas*."  Box shuts.
//   8.50       card cut (flip).
//   8.60–10.4  "Texas, | *deal* me in."  The map glows; every card twinkles. Out by 10.45.
// No logos, no real brand marks: a plain outline and plain city names. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 15
const EP = 65
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#9a7be0'
const MONO = "'Space Mono', ui-monospace, monospace"

const T = {
  h0: 0.12, h0Out: [4.78, 4.96], map: [0.2, 1.0], dots: 0.9, deal: 1.45, starIn: 0.5,
  open: 2.66, l1: 2.85,
  h1: 5.02, h1Land: 5.42, l2: 5.4, sweep: [5.55, 6.0], deal2: 6.05, h1Out: [8.22, 8.4], close: 8.4,
  cut: 8.5, h2: 8.6, h2Land: 9.0, glow: 9.1, h2Out: [10.18, 10.42], out: [10.05, 10.45],
  ghost: 3.95,
}
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'same deal, bigger table.' },
  { t: T.l2, speaker: SPEAK, text: 'a new hand every night, all over *Texas*.' },
]
const CPS = 30
const DEAL_GAP = 0.13, DEAL_FLY = 0.34

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

// ── a generic Texas outline (lon, lat), projected to the frame
const K = 79.9 * 0.857, LATK = 79.9, LON0 = -99.85, LAT0 = 31.15, OX = 556, OY = 945
const P = (lo, la) => [OX + (lo - LON0) * K, OY - (la - LAT0) * LATK]
const OUTLINE = [[-103.04, 36.5], [-100.0, 36.5], [-100.0, 34.56], [-99.2, 34.4], [-98.0, 34.1], [-96.9, 33.85], [-95.5, 33.9], [-94.5, 33.6], [-94.04, 33.55],
  [-94.04, 31.99], [-93.6, 31.2], [-93.7, 30.3], [-93.84, 29.7], [-94.7, 29.35], [-95.1, 29.1], [-96.2, 28.5], [-97.0, 27.9], [-97.4, 27.3], [-97.3, 26.6], [-97.15, 25.95],
  [-97.6, 26.0], [-98.3, 26.2], [-99.1, 26.5], [-99.5, 27.5], [-100.3, 28.3], [-100.7, 29.1], [-101.4, 29.77], [-102.4, 29.8], [-102.7, 29.6], [-103.1, 29.0],
  [-103.5, 29.15], [-104.0, 29.4], [-104.6, 29.9], [-104.9, 30.6], [-105.6, 31.1], [-106.2, 31.5], [-106.63, 31.98], [-103.06, 32.0]].map(([a, b]) => P(a, b))
// cities: card offset dx (to untangle Dallas / Fort Worth), label side
const CITIES = [
  { n: 'AMARILLO', ll: [-101.83, 35.22], side: -1 },
  { n: 'LUBBOCK', ll: [-101.85, 33.58], side: 1 },
  { n: 'EL PASO', ll: [-106.44, 31.76], side: 1, dy: 34 },
  { n: 'FORT WORTH', ll: [-97.33, 32.75], side: -1, dx: -22 },
  { n: 'DALLAS', ll: [-96.8, 32.78], side: 1, dx: 22 },
  { n: 'AUSTIN', ll: [-97.74, 30.27], side: 1 },
  { n: 'SAN ANTONIO', ll: [-98.49, 29.42], side: -1 },
  { n: 'HOUSTON', ll: [-95.37, 29.76], side: 1 },
  { n: 'CORPUS CHRISTI', ll: [-97.4, 27.8], side: -1 },
].map(c => { const [x, y] = P(...c.ll); return { ...c, x, y } })
const DEAL_ORDER = [7, 5, 6, 4, 3, 8, 1, 0, 2]          // Houston first
const DECK = { x: 400, y: 1330 }
const CW = 62, CH = 95

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 22px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const BACK = bake(await loadImg('card-back.png'), 160)

  // the pixel map, rasterised once
  const inside = (px, py) => { let c = false; for (let i = 0, j = OUTLINE.length - 1; i < OUTLINE.length; j = i++) { const [xi, yi] = OUTLINE[i], [xj, yj] = OUTLINE[j]; if ((yi > py) !== (yj > py) && px < (xj - xi) * (py - yi) / (yj - yi) + xi) c = !c } return c }
  const MAP = document.createElement('canvas'); MAP.width = 1080; MAP.height = 1920
  {
    const m = MAP.getContext('2d'), c = 12
    for (let y = 480; y < 1420; y += c) for (let x0 = 40; x0 < 1040; x0 += c) {
      const on = inside(x0 + c / 2, y + c / 2)
      const edge = on && [[-c, 0], [c, 0], [0, -c], [0, c]].some(([dx, dy]) => !inside(x0 + c / 2 + dx, y + c / 2 + dy))
      const halo = !on && [[-c, 0], [c, 0], [0, -c], [0, c]].some(([dx, dy]) => inside(x0 + c / 2 + dx, y + c / 2 + dy))
      if (halo) { m.fillStyle = 'rgba(242,199,92,0.22)'; m.fillRect(x0, y, c, c) }
      if (!on) continue
      const shade = ((x0 / c + y / c) % 7 === 0) ? '#2c2058' : '#251a4a'
      m.fillStyle = edge ? GOLD : shade; m.fillRect(x0, y, c, c)
      if (!edge && (x0 / c) % 2 === 0 && (y / c) % 2 === 0) { m.fillStyle = 'rgba(255,255,255,0.05)'; m.fillRect(x0, y, c / 2, c / 2) }
    }
  }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, "Tonight's deck, | now in *Texas.*", { top: 196, size: 104, accentSize: 170, at: T.h0, gap: 0.09, accentColor: GOLD, wobble: true, late: 1, lateAt: T.h0 + 0.45 })
  const H1 = popText(root, 'One hand. | Every *night.*', { top: 196, size: 108, accentSize: 176, at: T.h1, gap: 0.12, late: 1, lateAt: T.h1Land, wobble: true, accentColor: '#c9a6ff' })
  const H2 = popText(root, 'Texas, | *deal* me in.', { top: 196, size: 120, accentSize: 190, at: T.h2, gap: 0.1, late: 3, lateAt: T.h2Land, lateGap: 0.12, wobble: true, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function card(cx, cy, w, h, rot, alpha = 1, glow = 0) {
    if (alpha <= 0) return
    x.save(); x.globalAlpha = alpha; x.translate(cx, cy); x.rotate(rot)
    if (glow > 0) { x.shadowColor = `rgba(242,199,92,${0.9 * glow})`; x.shadowBlur = 26 * glow }
    x.fillStyle = INK; x.fillRect(-w / 2 - 3, -h / 2 - 3, w + 6, h + 6)
    x.shadowBlur = 0
    if (BACK) x.drawImage(BACK, -w / 2, -h / 2, w, h)
    else { x.fillStyle = '#2a1858'; x.fillRect(-w / 2, -h / 2, w, h) }
    x.strokeStyle = GOLD; x.lineWidth = 3; x.strokeRect(-w / 2 - 1.5, -h / 2 - 1.5, w + 3, h + 3)
    x.restore()
  }
  const target = c => ({ x: c.x + (c.dx || 0), y: c.y - 56 })
  // one hand: deal from the deck at t0 (each card flies in an arc, spinning, and lands with a little bounce)
  function hand(t, t0, sweepT, ok, wave) {
    DEAL_ORDER.forEach((ci, k) => {
      const c = CITIES[ci], tg = target(c), ts = t0 + k * DEAL_GAP
      const p = prog(t, ts, ts + DEAL_FLY)
      if (p <= 0) return
      const e = ease.outCubic(p)
      let cx = lerp(DECK.x, tg.x, e), cy = lerp(DECK.y, tg.y, e) - Math.sin(Math.PI * p) * 120
      let rot = (1 - e) * (wave ? -5 : 5) + ((ci * 37) % 9 - 4) * 0.03
      let a = clamp(p * 4) * ok, s = 1 + 0.08 * Math.sin(Math.PI * clamp((t - ts - DEAL_FLY) / 0.2))
      if (sweepT) {                                         // swept up and away for the new hand
        const q = prog(t, sweepT[0] + k * 0.03, sweepT[1] + k * 0.03)
        if (q >= 1) return
        cy -= ease.inCubic(q) * 900; cx += ease.inCubic(q) * ((ci % 2) ? 220 : -220); rot += q * 3; a *= 1 - q
      }
      const glow = t > T.glow ? 0.75 + 0.25 * Math.sin(t * 5 + ci) : 0.5
      card(cx, cy, CW * s, CH * s, rot, a, glow)
    })
  }
  function cityDots(t, ok) {
    CITIES.forEach((c, i) => {
      const p = pop01(t, T.dots + i * 0.06, 0.3, 2.4) * ok
      if (p <= 0.02) return
      x.save()
      x.fillStyle = INK; x.fillRect(c.x - 9 * p, c.y - 9 * p, 18 * p, 18 * p)
      x.fillStyle = t > T.glow ? GOLD : BONE; x.fillRect(c.x - 6 * p, c.y - 6 * p, 12 * p, 12 * p)
      x.font = `700 25px ${MONO}`; x.textBaseline = 'middle'; x.textAlign = c.side > 0 ? 'left' : 'right'
      x.globalAlpha = clamp(p); x.letterSpacing = '0.06em'
      const lx = c.x + c.side * 16, ly = c.y + 2 + (c.dy || 0)
      x.lineWidth = 6; x.strokeStyle = 'rgba(12,7,30,0.95)'; x.strokeText(c.n, lx, ly)
      x.fillStyle = BONE; x.fillText(c.n, lx, ly)
      x.restore()
    })
  }
  function deck(t, ok) {
    const p = pop01(t, T.deal - 0.3, 0.3, 2) * ok
    if (p <= 0.02) return
    for (let i = 4; i >= 0; i--) card(DECK.x + i * 2, DECK.y - i * 3, CW * 1.2 * p, CH * 1.2 * p, 0, 1, 0.3)
  }
  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, LAV]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 24 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: (SKY_H.dim ?? 1) * 0.85 })
      drawSeedConstellation(x, t, EP)
      if (t < T.out[1] + 0.02) {
        const ok = clamp(popOut(t, T.out))
        x.save(); if (t >= T.cut) x.translate(0, 70)        // box shut: the map settles lower (under the cut)
        // the map wipes in left → right, in cell columns
        const w = Math.round(ease.inOutCubic(prog(t, ...T.map)) * 90) * 12
        if (w > 0) {
          x.save(); x.globalAlpha = ok
          if (t > T.glow) { x.shadowColor = 'rgba(242,199,92,0.5)'; x.shadowBlur = 40 * clamp((t - T.glow) / 0.4) }
          x.beginPath(); x.rect(0, 0, 40 + w, 1920); x.clip(); x.drawImage(MAP, 0, 0); x.restore()
        }
        cityDots(t, ok)
        deck(t, t < T.cut ? ok * (1 - prog(t, 7.6, 8.0)) : 0)
        hand(t, T.deal, T.sweep, ok, 0)
        hand(t, T.deal2, null, ok, 1)
        // the ghost rises from behind the deck at the bottom (drawn after the deck)
        drawGhostCameo(x, t, { x: DECK.x + 4, y: DECK.y - 12 - CH * 0.6, at: T.ghost, dur: 1.3, from: 'below', cell: 3 })
        if (t > T.glow) CITIES.forEach((c, i) => sparkles(t, target(c).x, target(c).y, T.glow + i * 0.07, 6, 46, i))
        x.restore()
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [4.98, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'JOIN THE TEXAS BETA' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const dealCues = t0 => DEAL_ORDER.flatMap((ci, k) => [['whoosh', +(t0 + k * DEAL_GAP).toFixed(3), 0.18, 0.016], ['tick', +(t0 + k * DEAL_GAP + DEAL_FLY).toFixed(3), 0.03]])
export const CUES = [
  ...wordPops(T.h0, 4, 0.09, 0, 0.024), ['pop', T.h0 + 0.45, 1046.5, 0.042, 0],
  ['whoosh', T.map[0], 0.8, 0.03],
  ...CITIES.map((c, i) => ['pop', +(T.dots + i * 0.06).toFixed(3), NOTE[i % 7] * 2, 0.012, (c.x - 540) / 540]),
  ['pop', T.deal - 0.3, 659.25, 0.03, 0],
  ...dealCues(T.deal),
  ['pop', T.open, 659.25, 0.035, 0], ['pop', T.open + 0.06, 880, 0.028, 0],
  ...talkCues(LINES, { cps: CPS }),
  ...wordPops(T.h1, 3, 0.12, 2, 0.024), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ['whoosh', T.sweep[0], 0.5, 0.04],
  ...dealCues(T.deal2),
  ['pop', T.ghost + 0.1, 1174.66, 0.014, -0.3],
  ['pop', T.close, 783.99, 0.03, 0], ['pop', T.close + 0.07, 523.25, 0.03, 0],
  ...wordPops(T.h2, 1, 0.1, 1, 0.026), ['pop', T.h2Land, 1174.66, 0.05, 0], ['pop', T.h2Land + 0.12, 1046.5, 0.03, 0], ['pop', T.h2Land + 0.24, 1318.51, 0.04, 0],
  ['glitter', T.glow, T.glow + 0.8], ['bell', T.glow + 0.05, 1568, 0.024, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
