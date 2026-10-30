// srhouses (30 s vertical, Star Talk Remix of "The 12 houses, explained") · story 0–25.6, then the shared end card.
//   0.00–5.00  "The 12 houses, | *explained.*"  An apartment building pops up floor by floor; THE STARS (the gold narrator
//              star, your landlord) drops onto the roof. Box: "your chart is a building. 12 rooms." → "tour time. keep up, babe."
//   5.04–15.0  The tour: the twelve rooms light one per dotted beat (1st YOU … 12th REST & SECRETS), each with its icon gag
//              (the room art is the original film's, imported read-only from houses/scenes/icons.js) and a big label up top.
//              The landlord hops from room to room: heart-eyes in the 5th (romance), a wink in the 7th (partners), a squint
//              in the 8th (deep), and it dozes off in the 12th (rest).
//   15.1–21.9  "Who lives | *where?*"  Tenants move in: a sign star pops into every room, starting from ♏ in room 1
//              (Scorpio rising for the demo; ♓ Pisces lands in the 5th and cries happy tears). Box: "your birth time
//              decides who lives where." → "know your birth time? that's your key." The landlord holds up a pixel key.
//   21.96–25.5 "Welcome | *home.*"  The key flies to you and glints, the windows ripple gold, every tenant hops in a wave.
//   25.6→      the end card.
// One canvas (sky + building + stars), DOM type and the dialogue boxes above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, rng, hexToRgb } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SIGNS, SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { ICONS, ink } from '../../houses/scenes/icons.js'

export const DURATION = 30
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN          // 25.6
const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', INK = '#1b1236', TEAR = '#8fd8ff'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', monospace"
const BEAT = n => 0.6 + n * 0.5556
const CPS = 30
const SPEAK = 'THE STARS'

// ── building geometry (local: x centred on 540, y = 0 at the ground GY, up is negative)
const GY = 1326, BW = 780, RW = BW / 3, FH = 172, FLOORS = 4, ROOF_H = 84
const ROOF_TOP = GY - FLOORS * FH - ROOF_H
const roomBox = i => { const f = Math.floor(i / 3), c = i % 3; return { x: -BW / 2 + c * RW, y: -(f + 1) * FH, w: RW, h: FH, cx: -BW / 2 + (c + 0.5) * RW, cy: -(f + 0.5) * FH } }
const ROOMS = ['YOU', 'MONEY', 'TALK', 'HOME', 'FUN & ROMANCE', 'ROUTINE & HEALTH', 'PARTNERS', 'SHARED & DEEP', 'TRAVEL & BIG IDEAS', 'CAREER', 'FRIENDS', 'REST & SECRETS']
  .map((label, i) => ({ label, col: SIGNS[i].color }))
const ORD = ['1ST', '2ND', '3RD', '4TH', '5TH', '6TH', '7TH', '8TH', '9TH', '10TH', '11TH', '12TH']
const RISING = 7                                   // Scorpio rising: house n is ruled by sign (RISING + n − 1)
const TENANT = i => SIGNS[(RISING + i) % 12]

// ── beats
const STEP = 0.5556 * 1.5
const R = i => +(BEAT(8) + i * STEP).toFixed(3)    // room i lights (5.04 … 14.21)
const TOUR_END = R(12)                              // 15.04
const T = {
  h0: 0.12, h0Acc: BEAT(1), h0Out: [4.85, 5.0],
  floors: [0.3, 0.42, 0.54, 0.66], roof: 0.78, guideIn: 1.0,
  labOut: [14.92, 15.06], guideHome: [15.1, 15.5],
  h1: 15.2, h1Acc: BEAT(26), h1Out: [21.75, 21.92], movein: 16.0, rising: 16.15,
  keyUp: 18.85, h2: 21.96, h2Acc: BEAT(39), keyFly: [22.0, 22.65], ripple: BEAT(39), wave: BEAT(40),
  out: [25.1, 25.5],
}
const LINES1 = [
  { t: 1.65, speaker: SPEAK, text: 'your chart is a *building*. 12 rooms.' },
  { t: 4.8, speaker: SPEAK, text: 'tour time. keep up, babe.' },
]
const LINES2 = [
  { t: 15.65, speaker: SPEAK, text: 'your *birth time* decides who lives where.' },
  { t: 18.85, speaker: SPEAK, text: 'know your birth time? that’s your *key*.' },
]
const ALL = [...LINES1, ...LINES2]
const BOX = [{ lines: LINES1, open: 1.5, close: 7.75 }, { lines: LINES2, open: 15.5, close: 22.0 }]
const GUIDE_HOPS = [T.guideIn + 0.3, ...talkHops(ALL, SPEAK, { cps: CPS }).filter(h => h < 5.0 || h > 15.5), T.keyFly[0], T.wave + 0.3]

const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${a})` }
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const bump = (t, t0, d = 0.35) => { const p = prog(t, t0, t0 + d); return p > 0 && p < 1 ? Math.sin(Math.PI * p) : 0 }

function makeBurst(seed, n = 8, dist = 90) {
  const r = rng(seed)
  return Array.from({ length: n }, (_, i) => ({ a: (i / n) * Math.PI * 2 + r() * 0.6, d: dist * (0.6 + r() * 0.6), size: 10 + Math.round(r() * 2) * 4, kind: Math.floor(r() * 4) }))
}
function drawBurst(x, parts, px, py, t, t0, color, dur = 0.7) {
  const p = prog(t, t0, t0 + dur)
  if (p <= 0 || p >= 1) return
  const e = ease.outCubic(p)
  x.save()
  for (const q of parts) {
    x.globalAlpha = (1 - p) * (p < 0.15 ? p / 0.15 : 1)
    drawPixelStar(x, Math.round(px + Math.cos(q.a) * q.d * e), Math.round(py + Math.sin(q.a) * q.d * e), q.size, q.kind, color)
  }
  x.restore()
}

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
const KEY = [
  '.YYYY.........',
  'YWddY.........',
  'Yd..YYYYYYYYYY',
  'Yd..YddddddddY',
  'YYYYY...YY.YY.',
  '.YYY....Y..Y..',
]
const KEY_C = { Y: '#f7c948', W: '#fff1c8', d: '#c98a1f' }

/** pixel tear drops falling from both eyes */
function tears(x, cx, cy, size, t, amt = 1, seed = 0) {
  if (amt <= 0) return
  const c = Math.max(3, Math.round(size / 36))
  x.save()
  for (const side of [-1, 1]) for (let k = 0; k < 3; k++) {
    const ph = ((t * 1.6 + k / 3 + seed * 0.21 + (side > 0 ? 0.5 : 0)) % 1)
    x.globalAlpha = amt * (1 - ph * 0.8); x.fillStyle = TEAR
    x.fillRect(Math.round(cx + side * size * (0.13 + 0.12 * ph) - c / 2), Math.round(cy + size * 0.02 + ph * size * 0.4), c, c * 2)
  }
  x.restore()
}

/** a bold canvas label with a dark halo, shrunk to fit maxW */
function label(x, txt, px, py, size, color, a = 1, k = 1, font = INTER, weight = 800, maxW = 920) {
  if (a <= 0 || k <= 0) return
  x.save(); x.font = `${weight} ${size}px ${font}`
  const w = x.measureText(txt).width, f = Math.min(1, maxW / w)
  x.translate(px, py); x.scale(k * f, k * f); x.globalAlpha = clamp(a)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  x.shadowColor = 'rgba(6,4,18,0.95)'; x.shadowBlur = 16; x.fillStyle = color; x.fillText(txt, 0, 0)
  x.restore()
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 44px 'Space Mono'", "700 32px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'The 12 houses, | *explained.*', { top: 170, size: 106, accentSize: 150, at: T.h0, late: 1, lateAt: T.h0Acc, wobble: true })
  const H1 = popText(root, 'Who lives | *where?*', { top: 160, size: 120, accentSize: 168, at: T.h1, late: 1, lateAt: T.h1Acc, wobble: true, accentColor: PINK })
  const H2 = popText(root, 'Welcome | *home.*', { top: 150, size: 136, accentSize: 190, at: T.h2, late: 1, lateAt: T.h2Acc, wobble: true })
  const boxes = BOX.map(b => dialogueBox(root, { lines: b.lines, y: 1450, width: 960, height: 290, open: b.open, close: b.close, cps: CPS }))
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const B_ROOM = ROOMS.map((_, i) => makeBurst(700 + i, 8, 90))
  const B_KEY = makeBurst(760, 12, 220), B_ROOF = makeBurst(761, 10, 140)
  const outA = t => 1 - ease.inQuad(prog(t, ...T.out))

  // ── the building
  const floorK = f => easeOutBack(prog(t0g, T.floors[f], T.floors[f] + 0.32), 2.2)
  let t0g = 0
  function roomLight(i, t) {
    const lit = t >= R(i) ? 1 : 0
    let L = lit ? 0.5 + 0.5 * Math.max(bump(t, R(i), 0.5), t < R(i) + STEP ? 1 : 0) : 0
    if (t >= T.movein) L = Math.max(L, 0.55)
    if (t >= T.ripple) L = Math.max(L, 0.55 + 0.45 * bump(t, T.ripple + Math.floor(i / 3) * 0.12 + (i % 3) * 0.04, 0.55))
    if (t >= T.ripple + 1) L = Math.max(L, 0.7)
    return L
  }
  function drawBuilding(t) {
    t0g = t
    const a = outA(t)
    if (a <= 0) return
    x.save(); x.translate(540, GY); x.globalAlpha = a
    // ground + bushes
    x.save(); x.globalAlpha *= clamp(floorK(0) * 2)
    x.beginPath(); x.moveTo(-BW / 2 - 110, 0); x.lineTo(BW / 2 + 110, 0); ink(x, BONE, { fa: 0, w: 7, glow: 14 })
    for (const bx of [-BW / 2 - 58, BW / 2 + 58]) { x.beginPath(); x.arc(bx - 16, -20, 22, Math.PI, 0); x.arc(bx + 14, -24, 27, Math.PI, 0); x.lineTo(bx + 41, 0); x.lineTo(bx - 38, 0); x.closePath(); ink(x, '#5fdc7a', { fa: 0.3, w: 5 }) }
    x.restore()
    for (let f = 0; f < FLOORS; f++) {
      const fk = t < 1.5 ? floorK(f) : 1
      if (fk <= 0) continue
      x.save(); x.translate(0, -f * FH); x.scale(1, Math.max(0.01, fk)); x.translate(0, f * FH); x.globalAlpha *= clamp(fk * 2)
      for (let c = 0; c < 3; c++) {
        const i = f * 3 + c, r = roomBox(i), col = ROOMS[i].col, L = roomLight(i, t)
        x.beginPath(); x.rect(r.x, r.y, r.w, r.h); x.fillStyle = 'rgba(12,9,30,0.85)'; x.fill()
        if (L > 0) {
          const g = x.createRadialGradient(r.cx, r.cy - 20, 10, r.cx, r.cy, r.w * 0.75)
          g.addColorStop(0, rgba(t >= T.ripple && L > 0.72 ? GOLD : col, 0.55 * L)); g.addColorStop(1, rgba(col, 0.18 * L))
          x.fillStyle = g; x.fill()
          x.save(); x.globalAlpha *= L
          x.beginPath(); x.moveTo(r.cx, r.y + 4); x.lineTo(r.cx, r.y + 14); ink(x, BONE, { fa: 0, w: 3, glow: 0 })
          x.beginPath(); x.arc(r.cx, r.y + 20, 7, Math.PI, 0); x.closePath(); ink(x, GOLD, { fa: 0.9, w: 3, glow: 18 })
          x.restore()
        }
        if (t >= R(i)) {
          const ik = pop01(t, R(i), 0.42) * (t >= T.movein ? lerp(1, 0.32, prog(t, T.movein + i * 0.12, T.movein + i * 0.12 + 0.3)) : 1)
          x.save(); x.beginPath(); x.rect(r.x + 4, r.y + 4, r.w - 8, r.h - 8); x.clip()
          x.globalAlpha *= clamp(ik * 1.5)
          const sc = pop01(t, R(i), 0.42) * (1 + 0.1 * bump(t, R(i), 0.4)) * 0.84
          x.translate(r.cx, r.cy + 8); x.scale(sc, sc)
          ICONS[i](x, t, R(i), col, r.w / 0.84)
          x.restore()
          x.save(); x.globalAlpha *= clamp(pop01(t, R(i), 0.3) * 2)
          x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'top'; x.font = `700 28px ${MONO}`
          x.shadowColor = 'rgba(6,4,18,0.95)'; x.shadowBlur = 8; x.fillText(String(i + 1), r.x + 12, r.y + 8)
          x.restore()
        }
        x.beginPath(); x.rect(r.x, r.y, r.w, r.h); ink(x, t >= R(i) ? rgba(col, 0.9) : 'rgba(239,230,214,0.55)', { fa: 0, w: 5, glow: t >= R(i) ? 12 : 0 })
      }
      x.restore()
    }
    // the roof: a flat parapet with a little sign
    const rk = easeOutBack(prog(t, T.roof, T.roof + 0.32), 2.2)
    if (rk > 0) {
      x.save(); x.translate(0, -FLOORS * FH); x.scale(rk, rk)
      x.beginPath(); x.rect(-BW / 2 - 20, -22, BW + 40, 22); ink(x, BONE, { fa: 0.2, w: 6 })
      x.beginPath(); x.rect(-180, -ROOF_H, 360, ROOF_H - 34); ink(x, GOLD, { fa: 0.18, w: 5 })
      x.fillStyle = GOLD; x.font = `700 32px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.shadowColor = rgba(GOLD, 0.6); x.shadowBlur = 12; x.fillText('YOUR CHART', 0, -ROOF_H + 26)
      x.restore()
    }
    x.restore()
    drawBurst(x, B_ROOF, 540, ROOF_TOP + 40, t, T.roof, GOLD, 0.6)
  }

  // ── the big room label during the tour
  function drawRoomLabel(t) {
    if (t < R(0) || t > T.labOut[1]) return
    let cur = 0; for (let i = 0; i < 12; i++) if (t >= R(i)) cur = i
    const k = pop01(t, R(cur), 0.28, 2.4) * outK(t, T.labOut)
    label(x, ORD[cur] + ' HOUSE', 540, 236, 52, GOLD, k, k, MONO, 700)
    label(x, ROOMS[cur].label, 540, 340, 112, ROOMS[cur].col, k, k)
    // twelve progress pips
    for (let i = 0; i < 12; i++) {
      x.save(); x.globalAlpha = outK(t, T.labOut); x.beginPath(); x.arc(540 + (i - 5.5) * 40, 430, i === cur ? 10 : 7, 0, Math.PI * 2)
      x.fillStyle = i <= cur ? ROOMS[i].col : 'rgba(239,230,214,0.2)'; x.fill(); x.restore()
    }
  }

  // ── tenants (sign stars) move in, Scorpio rising in room 1
  function drawTenants(t) {
    if (t < T.movein) return
    const a = outA(t)
    for (let i = 0; i < 12; i++) {
      const tin = T.movein + i * 0.12
      const k = pop01(t, tin, 0.36, 2.3) * a
      if (k <= 0.01) continue
      const r = roomBox(i), s = TENANT(i)
      const px = 540 + r.cx + 38, py = GY + r.cy + 22
      const isPis = s.id === 'pisces'
      const hops = [tin + 0.3, T.wave + Math.floor(i / 3) * 0.1 + (i % 3) * 0.05]
      const mood = isPis ? 'sparkle' : t > T.wave ? 'happy' : i === 0 && t > T.rising ? 'wink' : (i % 4 === 1 ? 'happy' : 'neutral')
      drawStarChar(x, px, py, 118, t, { color: s.color, glyph: s.glyph, mood, look: [0, 0], hops, pop: k, seed: 60 + i, glow: 0.8 })
      if (isPis) tears(x, px, py, 118, t, clamp((t - tin - 0.4) / 0.3) * a, 2)
    }
    // "♏ RISING → ROOM 1" chip under the building
    const ck = pop01(t, T.rising + 0.5, 0.3, 2.4) * (1 - ease.inQuad(prog(t, 21.7, 21.9)))
    if (ck > 0.01) {
        x.save(); x.translate(540, GY + 56); x.scale(ck, ck)
      x.font = `700 36px ${MONO}`; const txt = 'SCORPIO RISING = ROOM 1', w = x.measureText(txt).width + 44
      x.fillStyle = 'rgba(16,10,36,0.95)'; x.fillRect(-w / 2, -30, w, 60)
      x.strokeStyle = SIGNS[RISING].color; x.lineWidth = 5; x.strokeRect(-w / 2, -30, w, 60)
      x.fillStyle = SIGNS[RISING].color; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 2)
      x.restore()
    }
  }

  // ── THE STARS, the landlord
  const roofSpot = { x: 820, y: ROOF_TOP - 4 }
  const roomSpot = i => { const r = roomBox(i); return { x: 540 + r.cx + 72, y: GY + r.cy + 30 } }
  function guidePos(t) {
    if (t < R(0) - 0.32) {
      const fp = prog(t, T.guideIn - 0.25, T.guideIn)
      return { ...roofSpot, y: lerp(-200, roofSpot.y, fp * fp), size: 170 }
    }
    if (t < TOUR_END + 0.05) {
      let i = 0; for (let k = 0; k < 12; k++) if (t >= R(k) - 0.32) i = k
      const from = i === 0 ? roofSpot : roomSpot(i - 1), to = roomSpot(i)
      const p = ease.inOutCubic(prog(t, R(i) - 0.32, R(i) - 0.04))
      return { x: lerp(from.x, to.x, p), y: lerp(from.y, to.y, p) - Math.sin(Math.PI * p) * 110, size: lerp(i === 0 ? 170 : 124, 124, p) }
    }
    const p = ease.inOutCubic(prog(t, ...T.guideHome)), from = roomSpot(11)
    return { x: lerp(from.x, roofSpot.x, p), y: lerp(from.y, roofSpot.y, p) - Math.sin(Math.PI * p) * 160, size: lerp(124, 170, p) }
  }
  function guideMood(t) {
    if (t < T.guideIn + 0.25) return { mood: 'wide', look: [0, 1] }
    if (t < R(0) - 0.32) return { mood: 'happy', look: [0, 0] }
    if (t < TOUR_END) {
      let i = 0; for (let k = 0; k < 12; k++) if (t >= R(k) - 0.04) i = k
      if (t < R(0)) return { mood: 'happy', look: [1, 0] }
      const m = { 4: 'heart', 6: 'wink', 7: 'squint', 11: 'sleepy' }[i] || 'happy'
      return { mood: m, look: [-1, 0] }
    }
    if (t < T.keyFly[0]) return { mood: t > T.keyUp ? 'sparkle' : 'happy', look: t < 18 ? [0, 1] : [0, 0] }
    return { mood: t > T.wave ? 'heart' : 'happy', look: [0, 0] }
  }
  function drawGuide(t) {
    if (t < T.guideIn - 0.25) return
    const g = guidePos(t), m = guideMood(t), a = outA(t)
    const land = t > T.guideIn && t < T.guideIn + 0.3 ? 0.25 * Math.sin(Math.PI * (t - T.guideIn) / 0.3) : 0
    const hops = [...GUIDE_HOPS]
    drawStarChar(x, g.x, g.y, g.size, t, { color: STAR.sky, ...m, blink: m.mood === 'happy' ? undefined : false, hops, squash: land, seed: 5, alpha: a, zzz: true })
    // the key: held up on "that's your key", then it flies to you
    const kk = pop01(t, T.keyUp + 0.9, 0.35, 2.4)
    if (kk > 0.01) {
      const fp = ease.inOutCubic(prog(t, ...T.keyFly))
      const kx = lerp(g.x + 10, 540, fp), ky = lerp(g.y - 150, 1610, fp) - Math.sin(Math.PI * fp) * 240
      const cell = lerp(9, 22, fp) * kk, rot = lerp(-0.35, 0, fp) + fp * Math.PI * 2 + 0.06 * Math.sin(t * 2.4)
      drawBits(x, KEY, KEY_C, kx, ky + (fp >= 1 ? 8 * Math.sin(t * 2.6) : 0), cell, { rot, alpha: a })
      const gt = t - T.keyFly[1]
      if (gt > 0 && gt < 0.6) { x.save(); x.globalAlpha = Math.sin(Math.PI * gt / 0.6) * a; drawPixelStar(x, kx - cell * 4, ky - cell * 3, 40 + 30 * Math.sin(Math.PI * gt / 0.6), 2, '#fffbe8'); x.restore() }
      drawBurst(x, B_KEY, 540, 1610, t, T.keyFly[1], GOLD, 0.8)
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H)
      drawBuilding(t)
      for (let i = 0; i < 12; i++) { const r = roomBox(i); drawBurst(x, B_ROOM[i], 540 + r.cx, GY + r.cy, t, R(i), ROOMS[i].col, 0.55) }
      drawTenants(t)
      drawGuide(t)
      drawRoomLabel(t)
      H0.update(t, outK(t, T.h0Out))
      H1.update(t, outK(t, T.h1Out))
      H2.update(t, outK(t, T.out))
      for (const b of boxes) b.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 4.98 (hook headline out → the tour), 15.12 (tour label out → "Who lives where?"),
// 21.94 (box + headline out → "Welcome home."). cardfx keeps one or two of them.
const CUTS = [{ t: 4.98, kind: 'flip' }, { t: 15.12, kind: 'shuffle' }, { t: 21.94, kind: 'flip', dir: -1 }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const ROOM_NOTES = [587.33, 659.25, 739.99, 880, 987.77, 1174.66]
export const CUES = [
  ...wordPops(T.h0, 3, 0.07, 0), ['pop', T.h0Acc, 1174.66, 0.05, 0], ['pluck', T.h0Acc, 587.33, 0.05, 0.6, 0],
  ...T.floors.map((f, i) => ['pop', f, [440, 523.25, 587.33, 659.25][i], 0.04, 0]), ['pop', T.roof, 880, 0.045, 0], ['glitter', T.roof, T.roof + 0.4],
  ['whoosh', T.guideIn - 0.25, 0.25, 0.03], ['boom', T.guideIn, 0.08], ['pop', T.guideIn + 0.05, 987.77, 0.04, 0],
  ...talkCues(ALL, { cps: CPS }),
  ...Array.from({ length: 12 }, (_, i) => [
    ['pop', R(i), ROOM_NOTES[i % 6] * (i >= 6 ? 2 : 1), 0.045, ((i % 3) - 1) * 0.4],
    ['pluck', R(i), ROOM_NOTES[(i * 2) % 6] / 2, 0.035, 0.4, 0],
    ['whoosh', r3(R(i) - 0.32), 0.26, 0.015],
  ]).flat(),
  ['bell', R(4) + 0.1, 1567.98, 0.025, 1.0, 0], ['pluck', R(6) + 0.15, 1318.51, 0.03, 0.4, 0.3], ['pop', R(11) + 0.2, 392, 0.03, 0],
  ['whoosh', T.guideHome[0], 0.4, 0.03], ...wordPops(T.h1, 1, 0.07, 1, 0.025), ['pop', T.h1Acc, 1318.51, 0.05, 0],
  ...Array.from({ length: 12 }, (_, i) => ['pop', r3(T.movein + i * 0.12 + 0.05), NOTE[i % 7], 0.03, ((i % 3) - 1) * 0.4]),
  ['bell', T.rising + 0.5, 1174.66, 0.03, 1.2, 0],
  ['pluck', T.keyUp + 0.9, 1567.98, 0.04, 0.5, 0.2], ['glitter', T.keyUp + 0.9, T.keyUp + 1.3],
  ...wordPops(T.h2, 1, 0.07, 3, 0.025), ['whoosh', T.keyFly[0], 0.65, 0.04],
  ['pop', T.h2Acc, 1174.66, 0.055, 0], ['bell', T.keyFly[1], 1760, 0.04, 1.6, 0], ['glitter', T.keyFly[1], T.keyFly[1] + 0.8],
  ...Array.from({ length: 4 }, (_, f) => ['pop', r3(T.wave + f * 0.1 + 0.05), NOTE[f + 1], 0.03, 0]),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
