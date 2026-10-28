// st4wherenext (20 s vertical Align ad, Star Talk season 4 · EP 070, the vote starts here) · story 0–15.6, then the end card
// with the CTA "SIGN UP TO VOTE YOUR CITY".
//   0.00–3.30  "Texas first. | Then *where?*"  A stylised US outline draws itself on (line art, not exact geography; the same
//              map as st4map). Houston lights first as a bright star, then Texas fills gold out from it. The eight
//              candidate cities pop in as dim stars, all the same (no numbers, no leader).
//   3.40–9.40  "The vote | starts *here.*"  THE STARS: "Houston started it. *Texas* is next."  (Houston flashes, Texas pulses)
//              → "after that, *you* pick. sign up to vote your city."  Dotted lines reach out from Texas toward every
//              city at once and every city gets the same cyan ring. (Ghost: rises up from behind the border into West Texas, 6.3–7.6.)
//   9.50 cut → "Light up | your *city.*"  A slow, even wave of light runs through all eight cities in turn, round and round,
//              then all eight flare together; THE STARS hops in below, beaming, and winks. Everything pops out by 15.45.
// One canvas (sky + constellation + map + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, lineTimes, STAR } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'
import { GOLD, BONE, PINK, LAV, MONO, pop01, outK, popOut, popText, sparkles, glow, hexA, wordT, checkLines, wordPops, NOTE } from './kit.js'

export const DURATION = 20
const EP = 70
const CTA = 'SIGN UP TO VOTE YOUR CITY'
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const CYAN = '#8fd8f6'
const NARR = 'THE STARS'

const T = {
  h0: 0.15, h0Land: 0.8, h0Out: [3.15, 3.33],
  draw: [0.2, 1.5], hou: 1.0, tex: [1.5, 2.2], cities: 2.15,
  open: 2.65, l1: 2.82,
  h1: 3.4, h1Land: 3.8, l2: 5.8, reach: [6.6, 7.6], h1Out: [9.2, 9.38],
  close: 9.4,
  cut: 9.5,
  h2: 9.58, h2Land: 9.95, wave: [10.2, 13.0], flare: 13.1, starIn: 10.4, wink: [14.0, 14.5],
  out: [15.05, 15.45], h2Out: [15.18, 15.44],
  ghost: 6.3,
}
const CPS = 28
const LINES = [
  { t: T.l1, speaker: NARR, text: 'Houston started it. *Texas* is next.' },
  { t: T.l2, speaker: NARR, text: 'after that, *you* pick. sign up to vote your city.' },
]
const LT = lineTimes(LINES, { cps: CPS })
checkLines(LT, LINES, T.close)
const T_HOU = wordT(LT, LINES, 0, 'Houston'), T_TEX = wordT(LT, LINES, 0, 'Texas'), T_YOU = wordT(LT, LINES, 1, 'you')

// ── the map: the same stylised lower-48 outline as st4map / votemap (lon/lat → px; not exact geography)
const MAP = { cx: 540, cy: 975, k: 15.6, ky: 25.5, lon0: -96, lat0: 38 }
const P = (lon, lat) => ({ x: MAP.cx + (lon - MAP.lon0) * MAP.k, y: MAP.cy + (MAP.lat0 - lat) * MAP.ky })
const OUTLINE = [
  [-124.7, 48.4], [-123, 49], [-95.2, 49], [-95, 49.4], [-89.6, 48], [-84.8, 46.6], [-84.2, 45.8], [-82.4, 43.2], [-82.7, 41.7], [-79, 42.9],
  [-79, 43.4], [-76.4, 44.2], [-74.7, 45], [-71.5, 45], [-70.2, 46.9], [-69.2, 47.4], [-67.8, 47], [-67, 44.8], [-70.2, 43.6], [-70.8, 42.6],
  [-70, 41.8], [-71.8, 41.3], [-74, 40.6], [-74, 39.4], [-75.4, 38.6], [-76, 37], [-75.5, 35.3], [-77.9, 34], [-79.2, 33.2], [-81, 32],
  [-81.4, 30.5], [-80.5, 28.5], [-80.1, 26.5], [-80.4, 25.2], [-81.2, 25.3], [-81.8, 26.7], [-82.7, 28], [-82.8, 29.2], [-84, 30.1], [-85.4, 29.7],
  [-86.5, 30.4], [-88, 30.5], [-89.5, 30.2], [-89.3, 29.1], [-90.5, 29.2], [-92, 29.6], [-93.8, 29.7], [-94.8, 29.3], [-96.5, 28.3], [-97.4, 27.3],
  [-97.2, 25.9], [-99.1, 26.5], [-99.6, 27.6], [-101.4, 29.8], [-103, 29], [-104.5, 29.7], [-106.5, 31.8], [-108.2, 31.8], [-108.2, 31.3], [-111, 31.3],
  [-114.8, 32.5], [-117.1, 32.5], [-118.5, 34], [-120.6, 34.6], [-121.9, 36.6], [-122.5, 37.8], [-123.7, 39], [-124.2, 40.4], [-124.2, 42], [-124, 46.3], [-124.7, 48.4],
].map(([lo, la]) => P(lo, la))
const SEG = (() => { const a = [0]; for (let i = 1; i < OUTLINE.length; i++) a.push(a[i - 1] + Math.hypot(OUTLINE[i].x - OUTLINE[i - 1].x, OUTLINE[i].y - OUTLINE[i - 1].y)); return a })()
const TEXAS = [
  [-106.6, 32.0], [-103.05, 32.0], [-103.05, 36.5], [-100, 36.5], [-100, 34.56], [-98.5, 34.1], [-97.1, 33.8], [-95.6, 33.9], [-94.05, 33.55],
  [-94.05, 31.0], [-93.8, 29.7], [-94.8, 29.3], [-96.5, 28.3], [-97.4, 27.3], [-97.2, 25.9], [-99.1, 26.5], [-99.6, 27.6], [-101.4, 29.8],
  [-103, 29], [-104.5, 29.7], [-106.6, 32.0],
].map(([lo, la]) => P(lo, la))
const HOU = P(-95.4, 29.8), HUB = P(-98.6, 31.2)
const BIGBEND = P(-104.0, 29.7)                               // the border the ghost rises from behind
// the eight candidates, same label offsets as st4map
const CITIES = [
  { n: 'SEATTLE', p: P(-122.3, 47.6), lx: 40, ly: 44 },
  { n: 'NEW YORK', p: P(-74, 40.7), lx: -30, ly: -44 },
  { n: 'LA', p: P(-118.2, 34.05), lx: 0, ly: 44 },
  { n: 'MIAMI', p: P(-80.2, 25.8), lx: -86, ly: 6 },
  { n: 'CHICAGO', p: P(-87.6, 41.9), lx: 0, ly: -42 },
  { n: 'NEW ORLEANS', p: P(-90.1, 30.0), lx: 0, ly: 44 },
  { n: 'NASHVILLE', p: P(-86.9, 36.3), lx: -10, ly: -40 },
  { n: 'ATLANTA', p: P(-84.4, 33.75), lx: 92, ly: 18 },
]
const NC = CITIES.length
// the final wave: an even chase around all eight (west → east order), equal time each, three laps
const ORDER = [0, 2, 4, 6, 7, 5, 3, 1]
function wavePulse(t, i) {
  const w = prog(t, ...T.wave)
  if (w <= 0 || w >= 1) return 0
  const lap = (T.wave[1] - T.wave[0]) / 2.5, pos = ((t - T.wave[0]) / lap) * NC, k = ORDER.indexOf(i)
  let d = (pos - k) % NC; if (d < 0) d += NC
  return d < 1.4 ? Math.sin(Math.PI * d / 1.4) : 0
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 180px 'EB Garamond'", "700 52px 'Space Mono'", "700 28px 'Space Mono'", "700 26px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Texas first. | Then *where?*', { top: 190, size: 112, accentSize: 170, at: T.h0, times: [T.h0, T.h0 + 0.12, T.h0 + 0.4, T.h0Land], wobble: true, accentColor: GOLD, lineHeight: 0.98 })
  const H1 = popText(root, 'The vote | starts *here.*', { top: 190, size: 112, accentSize: 170, at: T.h1, times: [T.h1, T.h1 + 0.1, T.h1 + 0.25, T.h1Land], wobble: true, accentColor: CYAN, lineHeight: 0.98 })
  const H2 = popText(root, 'Light up | your *city.*', { top: 190, size: 120, accentSize: 180, at: T.h2, times: [T.h2, T.h2 + 0.12, T.h2 + 0.3, T.h2Land], wobble: true, accentColor: GOLD, lineHeight: 0.98 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 270, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function poly(pts) { x.beginPath(); x.moveTo(pts[0].x, pts[0].y); for (let i = 1; i < pts.length; i++) x.lineTo(pts[i].x, pts[i].y); x.closePath() }
  function outlinePath(frac = 1) {
    const L = SEG[SEG.length - 1] * frac
    x.beginPath(); x.moveTo(OUTLINE[0].x, OUTLINE[0].y)
    for (let i = 1; i < OUTLINE.length; i++) {
      if (SEG[i] <= L) { x.lineTo(OUTLINE[i].x, OUTLINE[i].y); continue }
      const f = (L - SEG[i - 1]) / (SEG[i] - SEG[i - 1])
      const px = lerp(OUTLINE[i - 1].x, OUTLINE[i].x, f), py = lerp(OUTLINE[i - 1].y, OUTLINE[i].y, f)
      x.lineTo(px, py); return { x: px, y: py }
    }
    x.closePath(); return null
  }

  function drawMap(t, a) {
    const dp = ease.inOutCubic(prog(t, ...T.draw))
    if (dp <= 0 || a <= 0) return
    x.save(); x.globalAlpha = a
    const fk = ease.outCubic(prog(t, T.draw[1] - 0.3, T.draw[1] + 0.4))
    if (fk > 0) {
      x.save(); outlinePath(1); x.fillStyle = hexA('#3a2a7a', 0.45 * fk); x.fill(); x.clip()
      x.fillStyle = hexA(LAV, 0.16 * fk)
      for (let yy = 640; yy < 1340; yy += 24) for (let xx = 60 + ((yy / 24) % 2) * 12; xx < 1020; xx += 24) x.fillRect(xx - 2, yy - 2, 4, 4)
      x.restore()
    }
    const tip = outlinePath(dp)
    x.lineJoin = 'round'; x.lineCap = 'round'
    x.shadowColor = hexA(LAV, 0.8); x.shadowBlur = 16; x.lineWidth = 6; x.strokeStyle = LAV; x.stroke(); x.shadowBlur = 0
    if (tip) drawPixelStar(x, tip.x, tip.y, 30, 0, '#fff3e0')
    x.restore()
  }

  // Texas fills gold out from Houston (a growing circle clipped to Texas), pulsing on "Texas"
  function drawTexas(t, a) {
    const k = ease.outCubic(prog(t, ...T.tex))
    if (k <= 0 || a <= 0) return
    const hit = t > T_TEX && t < T_TEX + 0.7 ? Math.sin(Math.PI * (t - T_TEX) / 0.7) : 0
    const br = 0.85 + 0.15 * Math.sin(t * 2.4) + 0.35 * hit
    x.save(); x.globalAlpha = a
    glow(x, HUB.x, HUB.y, 260, GOLD, (0.7 + 0.4 * hit) * k)
    x.save(); poly(TEXAS); x.clip()
    x.beginPath(); x.arc(HOU.x, HOU.y, 360 * k, 0, Math.PI * 2); x.fillStyle = hexA(GOLD, 0.5 * br); x.fill()
    x.restore()
    poly(TEXAS); x.lineJoin = 'round'; x.lineWidth = 5; x.strokeStyle = hexA('#ffe7a8', k); x.stroke()
    x.restore()
  }

  // Houston: the first star, bright, with its tag (flashes on "Houston")
  function drawHouston(t, a) {
    const k = pop01(t, T.hou, 0.4, 2.4) * a
    if (k <= 0.01) return
    const hit = t > T_HOU && t < T_HOU + 0.7 ? Math.sin(Math.PI * (t - T_HOU) / 0.7) : 0
    glow(x, HOU.x, HOU.y, 90 + 60 * hit, '#fff3e0', 0.9 * k)
    drawPixelStar(x, HOU.x, HOU.y, (44 + 14 * hit) * k, Math.floor(t * 5) % 2, '#fff6e6', '#ffffff')
    sparkles(x, t, HOU.x, HOU.y, T.hou + 0.05, { n: 10, R: 110, size: 20, seed: 1, cols: [GOLD, BONE, PINK] })
    x.save(); x.globalAlpha = clamp(k)
    x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    const txt = 'HOUSTON ★', w = x.measureText(txt).width + 26, lx = HOU.x - 60, ly = HOU.y - 58
    x.fillStyle = 'rgba(30,18,6,0.88)'; x.beginPath(); x.roundRect(lx - w / 2, ly - 21, w, 42, 8); x.fill()
    x.lineWidth = 2.5; x.strokeStyle = GOLD; x.stroke()
    x.fillStyle = '#ffe7a8'; x.fillText(txt, lx, ly + 1)
    x.restore()
  }

  // after "you pick": dotted lines reach from Texas toward every city at once; a "?" tag pops on each
  function drawReach(t, a) {
    if (t >= T.cut) return
    const p = ease.inOutCubic(prog(t, ...T.reach))
    if (p <= 0 || a <= 0) return
    x.save(); x.globalAlpha = a; x.lineCap = 'round'
    CITIES.forEach(C => {
      const ex = lerp(HUB.x, C.p.x, p * 0.82), ey = lerp(HUB.y, C.p.y, p * 0.82)
      x.setLineDash([2, 14]); x.lineWidth = 5; x.strokeStyle = hexA(CYAN, 0.8)
      x.beginPath(); x.moveTo(HUB.x, HUB.y); x.lineTo(ex, ey); x.stroke()
    })
    x.setLineDash([])
    x.restore()
  }

  function drawCities(t, a) {
    if (a <= 0) return
    const flare = pop01(t, T.flare, 0.45, 2.2) * (t >= T.cut ? 1 : 0)
    const qk = t < T.cut ? pop01(t, T.reach[1] - 0.1, 0.3, 2.4) : 0
    CITIES.forEach((C, i) => {
      const k = pop01(t, T.cities + i * 0.07, 0.3, 2.4)
      if (k <= 0.01) return
      const pu = wavePulse(t, i), tw = 0.5 + 0.5 * Math.sin(t * 3 + i * 1.7)
      const br = 0.42 + 0.1 * tw + 0.6 * pu + 0.6 * flare
      x.save(); x.globalAlpha = a
      glow(x, C.p.x, C.p.y, 50 + 60 * pu + 90 * flare, GOLD, br)
      if (flare > 0.02) {
        x.strokeStyle = hexA('#fff3e0', 0.6 * clamp(flare)); x.lineWidth = 4
        for (let r = 0; r < 8; r++) { const th = r * Math.PI / 4 + t * 0.6, r0 = 26, r1 = 26 + 34 * clamp(flare) * (0.8 + 0.2 * Math.sin(t * 6 + r)); x.beginPath(); x.moveTo(C.p.x + Math.cos(th) * r0, C.p.y + Math.sin(th) * r0); x.lineTo(C.p.x + Math.cos(th) * r1, C.p.y + Math.sin(th) * r1); x.stroke() }
      }
      drawPixelStar(x, C.p.x, C.p.y, (26 + 14 * pu + 12 * clamp(flare)) * k, br > 0.9 ? 0 : 1, br > 0.8 ? '#fff3e0' : GOLD)
      x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      const lx = clamp(C.p.x + C.lx, 110, 970), ly = C.p.y + C.ly
      x.globalAlpha = a * clamp(k) * (0.75 + 0.25 * Math.max(pu, clamp(flare)))
      x.lineWidth = 6; x.strokeStyle = 'rgba(8,5,20,0.9)'; x.strokeText(C.n, lx, ly)
      x.fillStyle = BONE; x.fillText(C.n, lx, ly)
      // a cyan ring on every city (all the same) once the lines arrive: your pick
      if (qk > 0.01) {
        const ph = ((t - T.reach[1]) * 1.1 + i * 0.125) % 1
        x.globalAlpha = a * clamp(qk) * (1 - ph)
        x.lineWidth = 4; x.strokeStyle = CYAN; x.beginPath(); x.arc(C.p.x, C.p.y, 18 + ph * 34, 0, Math.PI * 2); x.stroke()
      }
      x.restore()
    })
  }

  function drawNarrator(t) {
    const pk = pop01(t, T.starIn, 0.45, 2.2) * popOut(t, T.out)
    if (pk <= 0.02 || t < T.cut) return
    const mood = t >= T.wink[0] && t < T.wink[1] ? 'wink' : t < T.flare ? 'sparkle' : t < T.flare + 0.6 ? 'wide' : 'happy'
    glow(x, 540, 1600, 300, GOLD, 0.6 * pk)
    drawStarChar(x, 540, 1600, 250, t, { color: STAR.sky, mood, look: t < T.flare ? [0, -1] : [0, 0], hops: [T.starIn + 0.45, T.flare + 0.05, T.flare + 0.5, T.wink[0]], pop: pk, seed: 4, glow: 1.1 })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
      drawSeedConstellation(x, t, EP)
      if (t < T.out[1] + 0.02) {
        const a = clamp(popOut(t, T.out))
        drawMap(t, a)
        drawTexas(t, a)
        // the ghost rises up from behind the Rio Grande border into West Texas (drawn after the map and Texas)
        drawGhostCameo(x, t, { x: BIGBEND.x, y: BIGBEND.y, at: T.ghost, dur: 1.3, from: 'below', cell: 3 })
        drawReach(t, a)
        drawCities(t, a)
        drawHouston(t, a)
        drawNarrator(t)
        sparkles(x, t, HUB.x, HUB.y, T_YOU + 0.1, { n: 12, R: 220, size: 22, seed: 3, cols: [CYAN, GOLD, BONE] })
        if (t >= T.cut) for (const C of CITIES) sparkles(x, t, C.p.x, C.p.y, T.flare, { n: 8, R: 70, size: 18, seed: 2, cols: [GOLD, BONE, PINK] })
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 3.35 (inert: hook → the vote line), 9.5 (box shut → "Light up your city.", plays).
const CUTS = [3.35, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: CTA }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

export const CUES = [
  ...wordPops(T.h0, 3, 0.12, 0, 0.024), ['pop', T.h0Land, 1174.66, 0.05, 0], ['pluck', T.h0Land, 1174.66, 0.04, 0.7, 0],
  ['riser', T.draw[0], T.draw[1], 0.025],
  ['bell', T.hou, 1567.98, 0.035, 1.4, 0.1], ['glitter', T.hou, T.hou + 0.5],
  ['whoosh', T.tex[0], 0.6, 0.025], ['pluck', T.tex[0] + 0.3, 880, 0.035, 0.8, 0.1],
  ...CITIES.map((C, i) => ['pop', +(T.cities + i * 0.07).toFixed(3), NOTE[i % NOTE.length] * 2, 0.016, (C.p.x - 540) / 600]),
  ['pop', T.open, 739.99, 0.035, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [NARR]: 880 } }),
  ['bell', T_HOU + 0.05, 1760, 0.025, 0.8, 0.1], ['pluck', T_TEX + 0.05, 987.77, 0.035, 0.6, 0],
  ['pop', T.h1, 880, 0.03, 0], ['pop', T.h1Land, 1174.66, 0.045, 0],
  ['glitter', T_YOU + 0.1, T_YOU + 0.6], ['riser', T.reach[0], T.reach[1], 0.02],
  ...CITIES.map((C, i) => ['pop', +(T.reach[1] - 0.05 + i * 0.03).toFixed(3), 1318.51, 0.012, (C.p.x - 540) / 600]),
  ['tick', T.ghost + 0.05, 0.02],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ['pop', T.h2, 880, 0.03, 0], ['pop', T.h2 + 0.12, 987.77, 0.03, 0], ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.8, 0],
  ['pop', T.starIn + 0.1, 739.99, 0.035, 0],
  ...Array.from({ length: 20 }, (_, n) => { const lap = (T.wave[1] - T.wave[0]) / 2.5, tt = T.wave[0] + n * lap / NC; return ['pop', +tt.toFixed(3), NOTE[n % NOTE.length] * 2, 0.012, (CITIES[ORDER[n % NC]].p.x - 540) / 700] }),
  ['bell', T.flare, 1567.98, 0.035, 1.6, 0], ['glitter', T.flare, T.flare + 0.8], ['boom', T.flare, 0.1],
  ['pluck', T.wink[0], 1318.51, 0.035, 0.5, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
