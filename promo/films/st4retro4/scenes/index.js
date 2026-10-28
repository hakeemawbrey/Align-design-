// st4retro4 (20 s vertical Align ad, Star Talk season 4, EP 080 · thread E4, Retro the gremlin) · story 0–15.6, then the end card.
//   0.00–5.55  "Retro hit the | *ballot box.*"  A pixel ballot box (VOTE YOUR CITY, no names, no counts). Retro, stretro's gold
//              ☿ orb, rolls in spinning BACKWARDS (rewind arrows) and rewinds the ballots up out of the slot, their text
//              mirrored. One unfolds big: "VOTE FOR YOUR EX ☐".
//   3.93       Drop: every star pops up around it, wide-eyed, "!" over every head, screaming. The box shakes.
//              Box (THE STARS): "nice try, Retro."
//   5.60–10.2  "Wrong *direction.*"  Box: "the only thing on this ballot is *forward.*"  "YOUR EX" gets struck out and the line
//              rewrites itself: "VOTE FORWARD ☑". Retro's spin slows, stops, and turns the right way round, sheepish.
//  10.30       card cut (flip).
//  10.40–15.5  "Vote | *forward.*"  The ballot folds and drops into the slot; the box glows; the chorus hops, happy; Retro
//              spins forward. Everything pops out by 15.5; the end card takes over at 15.6.
// Vote rules (VOTE.md): no counts, no leaderboard, no city named or shown winning. Generic ballot, no logos.
// Easter eggs (stlore.js): the constellation (EP 80) top-left, the EP 080 cartouche, the ghost leans out from the ballot box.
// One canvas (sky + box + ballots + orb + chorus), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SIGNS, SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 20
const EP = 80
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', RED = '#ff6b6b', INK = '#1b1236', MINT = '#7dffb0'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SYM = "'EB Garamond', 'DejaVu Sans', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid

// ── the timeline
const T = {
  h0: 0.15, h0Land: 0.8, h0Out: [5.35, 5.55],
  boxIn: 0.3, orbIn: [0.9, 1.6], rewind: [1.7, 3.2], unfold: [3.25, 3.7], orbMove: [3.1, 3.6],
  alarm: BEAT(6), shake: [3.93, 4.8],                                 // 3.93
  open: 4.15, l1: 4.3,
  h1: 5.6, h1Land: 6.0, l2: 6.4, calm: 6.0, strike: [8.7, 9.05], rewrite: 9.1, turn: [8.4, 9.4], close: 10.0, h1Out: [10.0, 10.2],
  cut: 10.3,
  h2: 10.4, h2Land: 10.8, fold: [10.9, 11.3], drop: [11.3, 11.75], glow: 11.75, h2Out: [15.3, 15.5], out: [15.1, 15.5],
}
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'nice try, *Retro.*', color: GOLD },
  { t: T.l2, speaker: SPEAK, text: 'the only thing on this ballot is *forward.*', color: MINT },
]
const CPS = 28

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

const BMP = s => s.trim().split(/\s+/)
const BANG = BMP(`XX XX XX XX .. XX`)
const ARROW = BMP(`..X.. .XX.. XXXXX .XX.. ..X..`)          // points left (−x); rotated onto the orbit tangent
function bits(x, bm, cx, cy, cell, col, { rot = 0, a = 1 } = {}) {
  if (a <= 0) return
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= a; x.translate(Math.round(cx), Math.round(cy)); x.rotate(rot)
  x.fillStyle = 'rgba(14,8,32,0.88)'
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.') x.fillRect((i - w / 2) * cell - cell * 0.5, (j - h / 2) * cell - cell * 0.5, cell * 2, cell * 2) }))
  x.fillStyle = col
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.') x.fillRect((i - w / 2) * cell, (j - h / 2) * cell, cell + 0.5, cell + 0.5) }))
  x.restore()
}

// ── layout
const BOX = { x: 540, y: 1190, w: 340, h: 250 }
const ORB_A = { x: 540, y: 720, r: 100 }, ORB_B = { x: 880, y: 600, r: 58 }, ORB_F = { x: 540, y: 690, r: 80 }
const BALLOT = { x: 530, y: 845, w: 740, h: 270 }
const CH = ['leo', 'gemini', 'virgo', 'scorpio', 'pisces', 'aries', 'libra', 'capricorn'].map(id => SIGNS.find(s => s.id === id))
const LAY = [[130, 1010, 130], [950, 1010, 130], [150, 1280, 126], [930, 1280, 126], [170, 1800, 108], [410, 1820, 100], [670, 1820, 100], [910, 1800, 108]]
const CHORUS = CH.map((s, i) => ({ col: s.color, glyph: s.glyph, seed: 61 + i * 5, t: T.alarm - 0.02 + [0, 0.05, 0.09, 0.13, 0.18, 0.21, 0.25, 0.28][i] }))
const GHOST = { at: 2.0, x: BOX.x - BOX.w / 2, y: 1230 }

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 44px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Retro hit the | *ballot box.*', { top: 196, size: 104, accentSize: 156, at: T.h0, late: 2, lateAt: T.h0Land, lateGap: 0.14, wobble: true, gap: 0.1, accentColor: GOLD })
  const H1 = popText(root, 'Wrong | *direction.*', { top: 196, size: 110, accentSize: 160, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, gap: 0.1, accentColor: RED, lineHeight: 0.98 })
  const H2 = popText(root, 'Vote | *forward.*', { top: 196, size: 130, accentSize: 200, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, gap: 0.1, accentColor: MINT, lineHeight: 0.95 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // the orb sprite (stretro's 16-cell gold ball)
  const ORB_G = 16
  const orbBuf = document.createElement('canvas'); orbBuf.width = orbBuf.height = ORB_G
  {
    const o = orbBuf.getContext('2d'), h = ORB_G / 2
    for (let j = 0; j < ORB_G; j++) for (let i = 0; i < ORB_G; i++) {
      const u = (i + 0.5 - h) / h, v = (j + 0.5 - h) / h, d = Math.hypot(u, v)
      if (d > 1) continue
      let c = d > 0.86 ? '#b8792a' : (u * 0.6 + v * 0.8 > 0.35 ? '#e0a743' : '#f7cf68')
      if (d <= 0.86 && Math.hypot(u + 0.38, v + 0.4) < 0.24) c = '#fff1c8'
      if (d > 0.86 && u + v < -0.6) c = '#ffd98a'
      o.fillStyle = c; o.fillRect(i, j, 1, 1)
    }
  }
  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, rgba(col, 0.5 * a)); g.addColorStop(0.45, rgba(col, 0.16 * a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore()
  }
  const sceneK = t => clamp(popOut(t, T.out))
  // spin angle (pure): backwards fast until the turn, then eases through zero to a slow forward spin
  function spinAt(t) {
    const t0 = T.turn[0], t1 = T.turn[1]
    if (t < t0) return -t * 2.6
    if (t < t1) { const u = t - t0, d = t1 - t0; return -t0 * 2.6 - 2.6 * u + (2.6 + 0.8) * u * u / (2 * d) }
    const d = t1 - t0; return -t0 * 2.6 - 2.6 * d + (3.4) * d / 2 + (t - t1) * 0.8
  }
  function orbState(t) {
    if (t >= T.cut) return { ...ORB_F, k: pop01(t, T.cut + 0.1, 0.42, 1.8) * sceneK(t) }
    const e = ease.outCubic(prog(t, ...T.orbIn)), m = ease.inOutCubic(prog(t, ...T.orbMove))
    const bx = lerp(-200, ORB_A.x, e), by = ORB_A.y - Math.abs(Math.sin(e * Math.PI * 2)) * 60 * (1 - e)
    return { x: lerp(bx, ORB_B.x, m), y: lerp(by, ORB_B.y, m) - Math.sin(Math.PI * m) * 50, r: lerp(ORB_A.r, ORB_B.r, m), k: t >= T.orbIn[0] ? 1 : 0 }
  }
  function drawOrb(t) {
    const S0 = orbState(t), { r, k } = S0
    if (k <= 0.01) return
    const cx = S0.x, cy = S0.y + Math.sin(t * 2.3) * 6
    glow(cx, cy, r * 3, GOLD, 0.85 * clamp(k))
    const spin = spinAt(t), retro = t < T.turn[0] + 0.5
    const R = r * 1.62, cell = Math.max(3, Math.round(r * 0.07)) * k
    for (let i = 0; i < 3; i++) {
      const a = spin + i * Math.PI * 2 / 3, dir = retro ? 1 : -1
      for (let s = 1; s <= 4; s++) {
        const b = a + dir * s * 0.16
        x.fillStyle = rgba(retro ? GOLD : MINT, 0.55 - s * 0.11); const q = cell * (1.6 - s * 0.25)
        x.fillRect(Math.round(cx + Math.cos(b) * R * k - q / 2), Math.round(cy + Math.sin(b) * R * k - q / 2), q, q)
      }
      bits(x, ARROW, cx + Math.cos(a) * R * k, cy + Math.sin(a) * R * k, cell, retro ? '#fff1c8' : '#d8ffe8', { rot: a + (retro ? Math.PI / 2 : -Math.PI / 2) })
    }
    const S = Math.round(r * 2 * k / ORB_G) * ORB_G || r * 2 * k
    x.save(); x.translate(Math.round(cx), Math.round(cy)); x.rotate(spin); x.imageSmoothingEnabled = false
    x.fillStyle = 'rgba(14,8,32,0.6)'; x.beginPath(); x.arc(0, 0, S / 2 + 5, 0, Math.PI * 2); x.fill()
    x.drawImage(orbBuf, -S / 2, -S / 2, S, S)
    x.rotate(-spin)
    x.font = `700 ${Math.round(r * 1.3 * k)}px ${SYM}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillStyle = INK; x.fillText('☿︎', 0, r * 0.08 * k)
    x.restore()
    // a sheepish sweat drop once it turns around
    if (t > T.turn[1] && t < T.cut) {
      const d = (t - T.turn[1]) % 1.4
      if (d < 0.8) bits(x, BMP(`..X.. .XXX. XXWXX XXXXX .XXX.`), cx + r * 0.9, cy - r * 0.6 + d * 30, 5, '#8fd8f6', { a: 1 - d / 0.8 })
    }
    // the ℞ tag while it's retrograde
    if (t < T.orbMove[0] + 0.1 && t >= T.orbIn[1] - 0.2) {
      const tk = pop01(t, T.orbIn[1] - 0.2, 0.3, 2.2), big = r > 80, fs = big ? 32 : 22, label = big ? '℞  RETROGRADE' : '℞'
      x.save(); x.translate(cx, cy + r * 1.62 + (big ? 80 : 44)); x.scale(tk, tk)
      x.font = `700 ${fs}px ${MONO}`; const tw = x.measureText(label).width + 0.14 * fs * label.length
      const pw = tw + 40, ph = fs + 26
      x.fillStyle = 'rgba(20,12,44,0.92)'; x.beginPath(); x.roundRect(-pw / 2, -ph / 2, pw, ph, ph / 2); x.fill()
      x.lineWidth = 3; x.strokeStyle = rgba(GOLD, 0.9); x.stroke()
      x.fillStyle = GOLD; x.textAlign = 'center'; x.textBaseline = 'middle'; x.letterSpacing = '0.14em'; x.fillText(label, 3, 2); x.letterSpacing = '0px'
      x.restore()
    }
  }

  // ── the ballot box
  function drawBox(t) {
    const k = pop01(t, T.boxIn, 0.4, 1.8) * sceneK(t)
    if (k <= 0.01) return
    const sk = t >= T.shake[0] && t < T.shake[1] ? 1 - prog(t, ...T.shake) : 0
    const jx = sk * 12 * Math.sin(t * 90), jr = sk * 0.05 * Math.sin(t * 70)
    const gl = t >= T.glow ? clamp(prog(t, T.glow, T.glow + 0.3)) * (0.75 + 0.25 * Math.sin(t * 4)) : 0
    if (gl > 0) glow(BOX.x, BOX.y, 420, MINT, gl * 0.9 * sceneK(t))
    const { w, h } = BOX
    x.save(); x.translate(BOX.x + jx, BOX.y + h / 2); x.rotate(jr); x.scale(k, k); x.translate(0, -h / 2)
    x.fillStyle = 'rgba(10,6,24,0.92)'; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
    x.fillStyle = '#2c2358'; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = '#3a2f70'; x.fillRect(-w / 2, -h / 2, w, 40)                                   // lid
    x.fillStyle = '#4c3f8a'; x.fillRect(-w / 2, -h / 2, w, 8)
    x.fillStyle = '#0a0618'; x.fillRect(-90, -h / 2 + 14, 180, 14)                              // the slot
    // front label: a star + VOTE YOUR CITY
    x.fillStyle = '#fbf6ea'; x.fillRect(-w / 2 + 30, -h / 2 + 70, w - 60, 112)
    drawPixelStar(x, -w / 2 + 74, -h / 2 + 126, 44, 1, GOLD)
    x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.font = `700 30px ${MONO}`
    x.fillText('VOTE', -w / 2 + 112, -h / 2 + 106); x.fillText('YOUR CITY', -w / 2 + 112, -h / 2 + 146)
    x.restore()
  }
  // little ballots rewinding up out of the slot, spinning backwards, text mirrored
  function drawRewind(t) {
    const [a, b] = T.rewind
    if (t < a || t > b + 0.6) return
    for (let i = 0; i < 7; i++) {
      const t0 = a + i * 0.18, u = prog(t, t0, t0 + 0.9)
      if (u <= 0 || u >= 1) continue
      const sx = BOX.x, sy = BOX.y - BOX.h / 2 + 20, O = orbState(t)
      const ang = -u * Math.PI * 2.2 + i
      const px = lerp(sx, O.x, ease.inCubic(u)) + Math.cos(ang) * 160 * Math.sin(Math.PI * u), py = lerp(sy, O.y, ease.inCubic(u)) + Math.sin(ang) * 90 * Math.sin(Math.PI * u)
      x.save(); x.translate(px, py); x.rotate(-u * 6 - i); x.scale(-1, 1); x.globalAlpha = Math.sin(Math.PI * u)
      x.fillStyle = 'rgba(10,6,24,0.9)'; x.fillRect(-58, -36, 116, 72)
      x.fillStyle = '#fbf6ea'; x.fillRect(-54, -32, 108, 64)
      x.fillStyle = INK; x.font = `700 15px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('VOTE YOUR', 0, -10); x.fillText('CITY ☐', 0, 12)
      x.restore()
    }
  }
  // the big ballot: VOTE FOR YOUR EX ☐ → struck → VOTE FORWARD ☑
  function drawBallot(t) {
    if (t < T.unfold[0]) return
    const k = easeOutBack(prog(t, ...T.unfold), 1.6)
    let cx = BALLOT.x, cy = BALLOT.y, sc = 1, rot = Math.sin(t * 1.8) * 0.02 - 0.03
    const sk = t >= T.shake[0] && t < T.shake[1] ? 1 - prog(t, ...T.shake) : 0
    cx += sk * 10 * Math.sin(t * 80)
    if (t >= T.cut) {
      // fold + drop into the slot
      const f = ease.inOutCubic(prog(t, ...T.fold)), d = ease.inCubic(prog(t, ...T.drop))
      if (d >= 1) return
      const pk = pop01(t, T.cut + 0.08, 0.3, 2)
      sc = lerp(1, 0.32, f) * pk; cx = lerp(BALLOT.x, BOX.x, f); cy = lerp(BALLOT.y, BOX.y - BOX.h / 2 - 70, f) + d * 120; rot = lerp(rot, 0, f)
      x.save(); x.beginPath(); x.rect(0, 0, W, BOX.y - BOX.h / 2 + 22); x.clip()
      paintBallot(cx, cy, sc, rot, t, 1)
      x.restore(); return
    }
    paintBallot(cx, cy, k, rot, t, 1)
  }
  function paintBallot(cx, cy, sc, rot, t) {
    const { w, h } = BALLOT
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(sc, sc)
    const alarmK = t >= T.alarm && t < T.strike[0] ? 0.5 + 0.5 * Math.sin((t - T.alarm) * 12) : 0
    x.save(); x.shadowColor = alarmK > 0 ? rgba(RED, 0.5 + 0.4 * alarmK) : rgba(LAV, 0.5); x.shadowBlur = 50
    x.fillStyle = 'rgba(10,6,24,0.94)'; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.restore()
    x.fillStyle = '#fbf6ea'; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = '#3a2f70'; x.fillRect(-w / 2, -h / 2, w, 54)
    x.font = `700 26px ${MONO}`; x.fillStyle = '#fbf6ea'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.letterSpacing = '0.2em'
    x.fillText('OFFICIAL BALLOT', 6, -h / 2 + 28); x.letterSpacing = '0px'
    // the line
    const fixed = t >= T.rewrite
    const y0 = 34
    x.textAlign = 'left'
    if (!fixed) {
      x.font = `800 54px ${INTER}`; x.fillStyle = INK
      const txt = 'VOTE FOR YOUR EX', tw = x.measureText(txt).width
      const lx = -w / 2 + 50
      x.fillText(txt, lx, y0)
      // the empty box
      x.strokeStyle = INK; x.lineWidth = 6; x.strokeRect(w / 2 - 92, y0 - 30, 56, 56)
      // the strike over "YOUR EX"
      if (t >= T.strike[0]) {
        const sp = prog(t, ...T.strike), s0 = lx + x.measureText('VOTE FOR ').width
        x.fillStyle = RED; x.fillRect(s0 - 6, y0 - 6, (tw - (s0 - lx) + 12) * sp, 12)
      }
    } else {
      const p = pop01(t, T.rewrite, 0.3, 2.4)
      x.font = `800 58px ${INTER}`; x.fillStyle = INK
      x.fillText('VOTE', -w / 2 + 50, y0)
      const vw = x.measureText('VOTE ').width
      x.save(); x.translate(-w / 2 + 50 + vw, y0); x.scale(p, p)
      x.font = `italic 500 76px 'EB Garamond', serif`; x.fillStyle = '#1f9a62'; x.fillText('forward', 0, 4)
      x.restore()
      x.strokeStyle = INK; x.lineWidth = 6; x.strokeRect(w / 2 - 92, y0 - 30, 56, 56)
      const cp = prog(t, T.rewrite + 0.25, T.rewrite + 0.5)
      if (cp > 0) {
        x.strokeStyle = '#1f9a62'; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath()
        const ax = w / 2 - 82, ay = y0 - 2
        x.moveTo(ax, ay); x.lineTo(ax + 16 * Math.min(1, cp * 2), ay + 16 * Math.min(1, cp * 2))
        if (cp > 0.5) x.lineTo(ax + 16 + 34 * (cp - 0.5) * 2, ay + 16 - 46 * (cp - 0.5) * 2)
        x.stroke()
      }
    }
    x.fillStyle = 'rgba(27,18,54,0.2)'; x.fillRect(-w / 2 + 50, h / 2 - 40, w - 100, 3)
    x.restore()
  }

  // ── the chorus: everyone screams on the drop
  function chorusState(t, i) {
    if (t >= T.cut) return { mood: 'happy' }
    if (t < T.l2) return { mood: 'wide', look: [i % 2 ? -1 : 1, -1], blink: false }
    if (t < T.rewrite) return { mood: 'squint', look: [i % 2 ? -1 : 1, -1] }
    return { mood: i % 3 ? 'happy' : 'sparkle' }
  }
  function drawChorus(t) {
    const ok = sceneK(t)
    CHORUS.forEach((S, i) => {
      const [cx, cy, sz] = LAY[i]
      const pk = pop01(t, S.t, 0.34, 2.4) * ok
      if (pk <= 0.02) return
      const scream = t > T.alarm && t < T.shake[1] ? 0.06 * Math.sin((t - S.t) * 40) : 0
      const hops = [T.rewrite + 0.1 + (i % 4) * 0.06, T.glow + (i % 4) * 0.08, 13.0 + (i % 3) * 0.15, 14.2 + (i % 3) * 0.12]
      const r = drawStarChar(x, cx, cy, sz * pk, t, { color: S.col, glyph: null, ...chorusState(t, i), squash: scream, hops, seed: S.seed, bob: 5 })
      const bk = t >= S.t + 0.08 && t < T.l2 ? pop01(t, S.t + 0.08, 0.25, 2.6) : 0
      if (bk > 0) bits(x, BANG, cx + (i % 2 ? -1 : 1) * sz * 0.18, r.top - 34 - Math.abs(Math.sin((t - S.t) * 9)) * 8, 7 * bk, RED)
    })
  }

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, MINT, LAV]) {
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

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, EP)
      if (t < T.out[1] + 0.02) {
        drawBox(t)
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.4, from: 'right' })
        drawRewind(t)
        drawOrb(t)
        drawChorus(t)
        drawBallot(t)
        sparkles(t, BALLOT.x, BALLOT.y, T.rewrite + 0.1, 12, 360, 1)
        sparkles(t, BOX.x, BOX.y - 100, T.glow, 14, 300, 2)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [hd, o] of HEADS) hd.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.57 (inert: H0 → "Wrong direction") and 10.3 (box shut → "Vote forward.", plays).
const CUTS = [5.57, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 3, 0.1, 0, 0.024), ['pop', T.h0Land, 1174.66, 0.05, 0], ['pop', T.h0Land + 0.14, 1318.51, 0.05, 0],
  ['pop', T.boxIn + 0.1, 440, 0.035, 0], ['tick', T.boxIn + 0.3, 0.04],
  ['bell', T.orbIn[0] + 0.1, 1567.98, 0.03, 1.6, 0], ['whoosh', T.orbIn[0], 0.6, 0.035],
  // the rewind: a falling sweep, one blip per ballot, pitched downward
  ...Array.from({ length: 7 }, (_, i) => ['pop', +(T.rewind[0] + i * 0.18 + 0.1).toFixed(3), NOTE[6 - i], 0.022, i % 2 ? 0.3 : -0.3]),
  ['whoosh', T.rewind[0], 1.4, 0.03],
  ['whoosh', T.unfold[0], 0.3, 0.035], ['pop', T.unfold[1], 392, 0.05, 0], ['pop', T.unfold[1] + 0.12, 330, 0.05, 0],
  // the scream
  ['boom', T.alarm, 0.2], ...CHORUS.map((S, i) => ['pop', +(S.t + 0.06).toFixed(3), [1318.51, 1174.66, 1318.51, 987.77][i % 4], 0.04, -0.4 + i * 0.11]),
  ['bell', T.alarm + 0.05, 2093, 0.03, 0.6, 0], ['bell', T.alarm + 0.25, 2093, 0.025, 0.6, 0],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ...wordPops(T.h1, 1, 0.1, 1, 0.024), ['pop', T.h1Land, 1046.5, 0.045, 0],
  ['riser', T.turn[0] - 0.2, T.turn[1], 0.03],
  ['whoosh', T.strike[0], 0.3, 0.03], ['tick', T.strike[1], 0.06],
  ['pop', T.rewrite, 1318.51, 0.05, 0], ['pluck', T.rewrite + 0.4, 1174.66, 0.045, 0.6, 0.2], ['glitter', T.rewrite + 0.1, T.rewrite + 0.7],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 1, 0.1, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0],
  ['whoosh', T.fold[0], 0.3, 0.03], ['tick', T.drop[1], 0.07], ['boom', T.drop[1], 0.08],
  ['bell', T.glow + 0.05, 1760, 0.03, 1.4, 0], ['glitter', T.glow, T.glow + 0.6],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
