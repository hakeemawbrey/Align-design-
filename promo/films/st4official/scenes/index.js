// st4official (25 s vertical Align ad, Star Talk season 4, EP 099, thread B8) · story 0–20.6, then the shared end card.
//   Leo × Aquarius, the end of their arc: two fixed opposites (fixed fire, fixed air) make it official. Callbacks to
//   batch 3: Leo shares the spotlight (starleo), Aquarius takes its headphones off (staraqua).
//   0.00–6.10  "Leo and Aquarius | make it *official.*"  A Houston rooftop at night (generic skyline, string lights).
//              Leo, crowned, stands in its own spotlight; Aquarius is off in the dark with its pink headphones on, music
//              notes drifting. Drop (2.82): LEO: "you're my favorite *person.*" The spotlight slides over and widens
//              to fit them both.
//   6.20–14.0  "Headphones | *off.*"  Aquarius lifts the headphones off and lets them rest round its neck.
//              AQUARIUS: "you're my favorite *spotlight.*" (Leo: heart eyes.) → THE STARS: "fixed fire, fixed air.
//              fixed means *committed.*"  (The ghost hangs upside down from the string lights.)
//   14.0 cut → "Fixed means | *committed.*"  Every star comes out: the other ten sign stars pop up across the sky,
//              cheering, and a big pixel heart pops between the two. Everything pops out by 20.45; the end card at 20.6.
// One canvas (sky + skyline + roof + spotlight + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'
import { popText } from '../../lesson.js'

export const DURATION = 25
const EP = 99
const STORY_END = DURATION - ENDCARD_LEN       // 20.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', CYAN = '#7fdcff', HOT = '#ff5fd2'
const LEO = signStar('leo'), AQU = signStar('aquarius')

// ── the timeline
const T = {
  h0: 0.12, h0Land: 0.66, h0Out: [5.9, 6.1],
  roof: 0.25, spot: 0.35, leoIn: 0.5, aquIn: 0.75,
  open: 2.66, l1: 2.82, glance: 4.1, widen: [4.3, 5.1], aquWide: 4.5,
  h1: 6.2, h1Land: 6.6, l2: 6.35, phones: [6.45, 7.15], leoHeart: 7.7,
  l3: 9.7, ghost: 10.5, close: 13.8, h1Out: [13.65, 13.85],
  cut: 14.0,
  h2: 14.08, h2Land: 14.5, crowd: 14.7, bigHeart: 16.2, cheer: 17.4, h2Out: [20.1, 20.35], out: [20.0, 20.45],
}
const LEON = '♌ LEO', AQUN = '♒ AQUARIUS', NARR = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: LEON, text: 'you’re my favorite *person.*', color: LEO.color },
  { t: T.l2, speaker: AQUN, text: 'you’re my favorite *spotlight.*', color: CYAN },
  { t: T.l3, speaker: NARR, text: 'fixed fire, fixed air. fixed means *committed.*' },
]
const CPS = 28

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

/** draw a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const ch = bm[j][i]; if (ch === '.') continue
    x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}

const CROWN = ['g...g...g', 'gg.YgY.gg', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY', 'ddddddddd']
const CROWN_C = { g: '#fff1c8', Y: '#f7c948', R: '#ff3d6e', B: '#5fd0ff', d: '#c98a1f' }
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const HEART_C = { H: '#ff4f86', W: '#ffd1de' }
const BIGHEART = ['.HH...HH.', 'HWWH.HHHH', 'HWHHHHHHH', 'HHHHHHHHH', '.HHHHHHH.', '..HHHHH..', '...HHH...', '....H....']
const NOTE_BM = ['..XX', '..XX', '..X.', '..X.', 'XXX.', 'XXX.']

// ── layout
const ROOF = 1300
const LEO0 = { x: 345, y: 1150, size: 290 }, AQU0 = { x: 740, y: 1150, size: 280 }
const AC = { x0: 905, x1: 1040, top: 1195 }
export const GHOST = { at: T.ghost, x: 165, y: 922, where: 'hanging upside down from the rooftop string lights' }
const CROWD = ['aries', 'taurus', 'gemini', 'cancer', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'pisces'].map((id, i) => {
  const a = Math.PI * (0.06 + 0.88 * i / 9)
  return { id, x: 540 - Math.cos(a) * 420, y: 930 - Math.sin(a) * 270 + (i % 2) * 24, size: 104 + (i % 3) * 10, seed: 20 + i }
})
const TOWERS = [[60, 120, 330], [170, 90, 250], [270, 110, 410], [380, 80, 300], [470, 130, 470], [600, 90, 350], [700, 120, 430], [820, 90, 290], [920, 120, 380], [1030, 100, 270]]

function leoState(t) {
  if (t < T.l1) return { mood: 'happy', look: [0, 0] }
  if (t < T.glance) return { mood: 'sparkle', look: [1, 0] }
  if (t < T.phones[1]) return { mood: 'happy', look: [1, 0] }
  if (t < T.leoHeart) return { mood: 'wide', look: [1, 0], blink: false }
  if (t < T.cut) return { mood: 'heart' }
  if (t < T.crowd + 0.6) return { mood: 'wide', look: [0, -1], blink: false }
  return { mood: 'heart' }
}
function aquState(t) {
  if (t < T.aquWide) return { mood: 'sleepy', zzz: false }               // eyes shut, vibing to its music
  if (t < T.phones[0]) return { mood: 'wide', look: [-1, 0], blink: false }
  if (t < T.l2 + 1.2) return { mood: 'sparkle', look: [-1, 0] }
  if (t < T.cut) return { mood: 'happy', blush: 1 }
  if (t < T.crowd + 0.6) return { mood: 'wide', look: [0, -1], blink: false }
  return { mood: 'heart' }
}
const LEO_HOPS = [T.leoIn + 0.3, ...talkHops(LINES, LEON, { cps: CPS }), T.leoHeart, T.h2Land, T.bigHeart, T.cheer]
const AQU_HOPS = [T.aquIn + 0.3, T.aquWide, ...talkHops(LINES, AQUN, { cps: CPS }), T.h2Land + 0.1, T.bigHeart + 0.1, T.cheer + 0.12]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Leo and Aquarius | make it *official.*', { top: 200, size: 100, accentSize: 168, at: T.h0, gap: 0.08, accentColor: GOLD, wobble: true, late: 1, lateAt: T.h0Land, fit: true })
  const H1 = popText(root, 'Headphones | *off.*', { top: 200, size: 124, accentSize: 200, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: HOT })
  const H2 = popText(root, 'Fixed means | *committed.*', { top: 200, size: 120, accentSize: 184, at: T.h2, gap: 0.1, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GOLD, lineHeight: 0.98 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, CYAN]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }
  function floatHearts(t, cx, cy, t0, t1, seed, cell = 6, spread = 200) {
    for (let i = 0; i < 9; i++) {
      const born = t0 + i * 0.2, life = 1.2
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37 + seed) % 7) / 6 - 0.5
      drawBits(x, HEART, HEART_C, Math.round(cx + side * spread + Math.sin(p * 7 + i) * 14), Math.round(cy - 30 - p * 200), cell * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, p * 1.6))), { alpha: Math.sin(Math.PI * p) })
    }
  }
  function notes(t, cx, cy, t0, t1) {
    for (let i = 0; i < 8; i++) {
      const born = t0 + i * 0.3, life = 1.6
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = (((i * 53) % 9) / 8 - 0.5) * 2
      drawBits(x, NOTE_BM, { X: i % 2 ? HOT : CYAN }, Math.round(cx + side * 140 + Math.sin(p * 6 + i) * 16), Math.round(cy - p * 220), 6, { alpha: Math.sin(Math.PI * p) * 0.95 })
    }
  }
  // generic Houston skyline: towers, no landmarks, no logos
  function drawSkyline(t, k) {
    if (k <= 0) return
    x.save(); x.globalAlpha = clamp(k)
    TOWERS.forEach(([cx, w, h], n) => {
      const x0 = Math.round(cx - w / 2), y0 = ROOF - h
      x.fillStyle = n % 2 ? '#1d1840' : '#231d4c'; x.fillRect(x0, y0, w, h)
      x.fillStyle = '#2c2560'; x.fillRect(x0, y0, 6, h)
      if (n === 4) { x.fillStyle = '#1d1840'; x.fillRect(cx - 24, y0 - 40, 48, 40); x.fillRect(cx - 4, y0 - 80, 8, 40); x.fillStyle = Math.sin(t * 4) > 0 ? '#ff5d73' : '#6a2a3a'; x.fillRect(cx - 6, y0 - 88, 12, 12) }
      for (let wy = y0 + 18; wy < ROOF - 70; wy += 26) for (let wx = x0 + 14; wx < x0 + w - 12; wx += 20) {
        const lit = ((wx * 7 + wy * 3 + n * 11) % 7) < 2
        if (lit) { x.fillStyle = '#ffd98a'; x.globalAlpha = clamp(k) * 0.55; x.fillRect(wx, wy, 8, 10); x.globalAlpha = clamp(k) }
      }
    })
    x.restore()
  }
  function drawRoof(t, k) {
    if (k <= 0) return
    x.save(); x.globalAlpha = clamp(k)
    // deck + ledge
    x.fillStyle = INK; x.fillRect(0, ROOF - 8, 1080, 8)
    x.fillStyle = '#4a4266'; x.fillRect(0, ROOF, 1080, 26); x.fillStyle = '#5c5480'; x.fillRect(0, ROOF, 1080, 6)
    x.fillStyle = '#2f2948'; x.fillRect(0, ROOF + 26, 1080, 100)
    for (let i = 0; i < 1080; i += 72) { x.fillStyle = '#3a3358'; x.fillRect(i, ROOF + 40, 60, 6) }
    // the AC unit (the ghost's hiding spot)
    const { x0, x1, top } = AC
    x.fillStyle = INK; x.fillRect(x0 - 6, top - 6, x1 - x0 + 12, ROOF - top + 6)
    x.fillStyle = '#8a86a8'; x.fillRect(x0, top, x1 - x0, ROOF - top - 2); x.fillStyle = '#a9a5c4'; x.fillRect(x0, top, x1 - x0, 8)
    x.fillStyle = '#5c5878'; for (let j = top + 22; j < ROOF - 14; j += 14) x.fillRect(x0 + 14, j, x1 - x0 - 28, 6)
    // string lights between two poles, sagging
    x.fillStyle = INK; x.fillRect(64, 880, 10, ROOF - 880); x.fillRect(1006, 880, 10, AC.top - 880)
    for (let i = 0; i <= 40; i++) {
      const u = i / 40, px = lerp(69, 1011, u), py = 890 + Math.sin(Math.PI * u) * 90
      x.fillStyle = INK; x.fillRect(px - 2, py - 2, 5, 5)
      if (i % 3 === 1) {
        const on = 0.6 + 0.4 * Math.sin(t * 3 + i)
        x.fillStyle = [GOLD, PINK, CYAN][i % 3 === 1 ? (i / 3 | 0) % 3 : 0]; x.globalAlpha = clamp(k) * on; x.fillRect(px - 6, py + 4, 12, 14); x.globalAlpha = clamp(k)
      }
    }
    x.restore()
  }
  // the spotlight: on Leo, then slides over and widens to fit both
  function spotState(t) {
    const k = t - T.spot
    let on = k < 0 ? 0 : k < 0.05 ? 1 : k < 0.1 ? 0.25 : 1
    on *= 1 - ease.inQuad(prog(t, T.out[0] + 0.1, T.out[1] + 0.1))
    const wd = easeOutBack(prog(t, ...T.widen), 1.4)
    return { on, R: lerp(220, 500, wd), cx: lerp(LEO0.x, 540, clamp(wd)), wd }
  }
  function drawSpot(t) {
    const { on, R, cx } = spotState(t)
    if (on <= 0) return
    const top = -140, tw = lerp(60, 110, R / 500), PY = ROOF
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createLinearGradient(0, top, 0, PY + 40)
    g.addColorStop(0, `rgba(255,236,190,${0.18 * on})`); g.addColorStop(0.55, `rgba(255,214,150,${0.09 * on})`); g.addColorStop(0.9, `rgba(255,190,120,${0.12 * on})`); g.addColorStop(1, 'rgba(255,190,120,0)')
    x.fillStyle = g
    x.beginPath(); x.moveTo(540 - tw, top); x.lineTo(540 + tw, top); x.lineTo(cx + R * 1.03, PY + 30); x.lineTo(cx - R * 1.03, PY + 30); x.closePath(); x.fill()
    x.translate(cx, PY + 8); x.scale(1, 0.18)
    const p = x.createRadialGradient(0, 0, 0, 0, 0, R * 1.05)
    p.addColorStop(0, `rgba(255,214,150,${0.45 * on})`); p.addColorStop(0.7, `rgba(255,190,120,${0.2 * on})`); p.addColorStop(1, 'rgba(255,190,120,0)')
    x.fillStyle = p; x.beginPath(); x.arc(0, 0, R * 1.05, 0, Math.PI * 2); x.fill()
    x.restore()
  }
  /** staraqua's headphones on a star rect: k = 0 on the head, 1 resting round the neck */
  function headphones(r, size, pop, k) {
    const s = size * pop, c = Math.max(4, Math.round(s / 30))
    const lift = Math.sin(Math.PI * Math.min(1, k * 1.3)) * 0.45        // up and off, then down to the neck
    const neck = ease.inOutCubic(clamp((k - 0.45) / 0.55))
    const cupY = r.y - s * 0.06 - lift * s * 0.6 + neck * s * 0.2, cupX = s * 0.4 * (1 + 0.15 * lift)
    const ry = -s * 0.44 * (1 - neck) + s * 0.1 * neck                   // the band flips under, round the neck
    for (const [col, w] of [[INK, 1.5], ['#3a2a6e', 1]]) for (let i = 0; i <= 26; i++) {
      const a = Math.PI * i / 26
      const bx = r.x - Math.cos(a) * cupX, by = cupY + Math.sin(a) * ry
      x.fillStyle = col; x.fillRect(Math.round(bx - c * w), Math.round(by - c * w), c * 2 * w, c * 2 * w)
    }
    for (const sd of [-1, 1]) {
      const cx = r.x + sd * cupX, w = c * 5, h = c * 8
      x.fillStyle = INK; x.fillRect(Math.round(cx - w / 2 - c), Math.round(cupY - h / 2 - c), w + 2 * c, h + 2 * c)
      x.fillStyle = HOT; x.fillRect(Math.round(cx - w / 2), Math.round(cupY - h / 2), w, h)
      x.fillStyle = '#ffb3f0'; x.fillRect(Math.round(cx - w / 2), Math.round(cupY - h / 2), c, h)
      x.fillStyle = '#b02a98'; x.fillRect(Math.round(cx + w / 2 - c), Math.round(cupY - h / 2), c, h)
    }
  }
  function drawCrowd(t, ok) {
    CROWD.forEach((m, i) => {
      const p = pop01(t, T.crowd + i * 0.08, 0.35, 2.2) * ok
      if (p <= 0.02) return
      const st = signStar(m.id)
      const cheer = t > T.cheer && ((t - T.cheer - i * 0.05) % 0.9) < 0.3
      drawStarChar(x, m.x, m.y, m.size, t, { color: st.color, glyph: null, mood: t > T.bigHeart + 0.2 ? (i % 3 ? 'heart' : 'happy') : 'wide', look: [m.x < 540 ? 1 : -1, 1], pop: p, seed: m.seed, glow: 0.8, tips: false, hops: [T.crowd + 0.3 + i * 0.08, T.bigHeart + 0.1 + i * 0.03, T.cheer + i * 0.05, T.cheer + 0.9 + i * 0.05, T.cheer + 1.8 + i * 0.05] })
      if (cheer) sparkles(t, m.x, m.y - 40, T.cheer + i * 0.05, 5, 60, i, [st.color, GOLD, BONE])
    })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const sp = spotState(t)
      const crowdK = prog(t, T.crowd, T.crowd + 0.8)
      drawSky(x, t, { ...SKY_H, dim: SKY_H.dim * lerp(lerp(1, 0.7, sp.on), 1.25, crowdK), stars: 1 + 0.6 * crowdK })
      drawSeedConstellation(x, t, EP)
      const ok = popOut(t, T.out)
      const rk = ease.outCubic(prog(t, T.roof, T.roof + 0.45)) * ok
      drawSkyline(t, rk)
      if (t > T.cut) drawCrowd(t, ok)
      drawRoof(t, rk)
      drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.4, from: 'above', cell: 3 })
      drawSpot(t)
      if (ok > 0) {
        const lp = pop01(t, T.leoIn, 0.38, 2.2) * ok, ap = pop01(t, T.aquIn, 0.38, 2.2) * ok
        const lean = ease.inOutCubic(prog(t, T.cut, T.cut + 0.4)) * 40
        let rL = null, rA = null
        if (lp > 0.02) rL = drawStarChar(x, LEO0.x + lean, LEO0.y, LEO0.size, t, { color: LEO.color, glyph: LEO.glyph, ...leoState(t), hops: LEO_HOPS, pop: lp, seed: 3, glow: 1.15 + (t > T.leoHeart ? 0.2 : 0) })
        const aGlow = lerp(0.55, 1.15, clamp(sp.wd))                     // Aquarius is in the dark until the light finds it
        if (ap > 0.02) rA = drawStarChar(x, AQU0.x - lean, AQU0.y, AQU0.size, t, { color: AQU.color, glyph: AQU.glyph, ...aquState(t), hops: AQU_HOPS, pop: ap, seed: 8, glow: aGlow })
        if (rL) drawBits(x, CROWN, CROWN_C, Math.round(rL.x), Math.round(rL.top + 4), 9 * lp, { rot: -0.18 + 0.04 * Math.sin(t * 3) })
        if (rA) headphones(rA, AQU0.size, ap, prog(t, ...T.phones))
        if (rA && t < T.phones[0]) notes(t, rA.x, rA.top, T.aquIn + 0.3, T.phones[0] - 0.6)
        if (rL && rA) {
          sparkles(t, (rL.x + rA.x) / 2, rL.y - 40, T.widen[1] - 0.2, 12, 300, 4, [GOLD, CYAN, BONE, LEO.color])
          if (t > T.leoHeart && t < T.cut) floatHearts(t, rL.x, rL.y - 80, T.leoHeart, T.l3, 1, 6, 160)
          const bh = pop01(t, T.bigHeart, 0.45, 2.6) * ok
          if (bh > 0.01) {
            const beat = 1 + 0.08 * Math.max(0, Math.sin((t - T.bigHeart) * 7))
            drawBits(x, BIGHEART, HEART_C, Math.round((rL.x + rA.x) / 2), Math.round(rL.y - 250), 14 * bh * beat)
          }
          sparkles(t, (rL.x + rA.x) / 2, rL.y - 250, T.bigHeart, 14, 200, 2, [PINK, GOLD, CYAN, BONE])
          if (t > T.bigHeart) floatHearts(t, (rL.x + rA.x) / 2, rL.y - 80, T.bigHeart + 0.3, T.out[0] - 0.6, 5, 6, 360)
        }
        sparkles(t, AQU0.x, AQU0.y - 160, T.phones[0] + 0.3, 8, 120, 3, [HOT, CYAN, BONE])
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 6.15 (H0 out → "Headphones off.") and 14.0 (box shut → "Fixed means committed."). cardfx keeps 14.0.
const CUTS = [6.15, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 5, 0.08, 0, 0.025), ['pop', T.h0Land, 1174.66, 0.045, 0],
  ['boom', T.spot, 0.16], ['tick', T.spot, 0.06], ['tick', T.spot + 0.11, 0.035],
  ['pop', T.leoIn + 0.05, 739.99, 0.045, -0.3], ['pop', T.aquIn + 0.05, 659.25, 0.04, 0.3],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [LEON]: 700, [AQUN]: 820 } }),
  ['whoosh', T.widen[0], 0.7, 0.04], ['bell', T.widen[1], 1318.51, 0.03, 1.2, 0], ['glitter', T.widen[1] - 0.2, T.widen[1] + 0.3],
  ...wordPops(T.h1, 1, 0.07, 2, 0.025), ['pop', T.h1Land, 1174.66, 0.05, 0],
  ['whoosh', T.phones[0], 0.4, 0.03], ['pluck', T.phones[0] + 0.3, 1567.98, 0.04, 0.5, 0.3], ['tick', T.phones[1], 0.035],
  ['pluck', T.leoHeart, 1174.66, 0.04, 0.5, -0.2], ['bell', T.leoHeart + 0.05, 1760, 0.022, 1.0, -0.2],
  ['tick', T.ghost + 0.05, 0.015],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 2, 0.1, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0],
  ...CROWD.map((m, i) => ['pop', +(T.crowd + 0.05 + i * 0.08).toFixed(3), NOTE[i % NOTE.length], 0.03, (m.x - 540) / 600]),
  ['pop', T.bigHeart, 1318.51, 0.06, 0], ['glitter', T.bigHeart, T.bigHeart + 0.5], ['bell', T.bigHeart + 0.08, 1760, 0.03, 1.2, 0],
  ['glitter', T.cheer, T.cheer + 0.6], ['pop', T.cheer, 987.77, 0.03, -0.3], ['pop', T.cheer + 0.9, 1174.66, 0.03, 0.3], ['pop', T.cheer + 1.8, 1318.51, 0.03, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
