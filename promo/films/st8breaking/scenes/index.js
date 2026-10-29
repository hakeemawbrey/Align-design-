// st8breaking (30 s vertical, Star Talk season 8 "EX RETROGRADE", S8 E01: breaking news) · story 0–25.6, then the end card.
//   Hook (frame 0): "BREAKING: Venus is | going *backwards.*"  Venus behind the STAR NEWS anchor desk, papers mid-air, the
//   backwards-orbit arrow looping round her, LIVE bug, ♀ Rx · DAY 01 chip, ticker "EXES REPORTED IN 12 SIGNS".
//   0.0–6.3   the desk. VENUS: "good evening. i am, apparently, going *backwards.*"
//   6.3–13.6  LIVE FROM ORBIT: Saturn, the field reporter, with a mic. An explainer diagram (real geometry): Venus on the
//             inside lane overtakes Earth, and seen from Earth it drifts back against the far stars. SATURN: "it's not going
//             backwards. it only *looks* that way." → "Venus is passing between Earth and the *Sun.*"  Fact chip: about
//             every 1.5 years · about 6 weeks.
//   13.6–18.0 DEVELOPING: every star's phone lights up at once ("u up?"). VENUS (V.O.): "astrology says it's a time to
//             re-think love and *exes.*"
//   18.0–22.4 LIVE: Libra's hallway. KNOCK KNOCK. LIBRA: "…who's knocking at *2 AM?*"  CLIFF: a tail of light spills under
//             the door (gasp zoom).
//   22.4–25.6 back at the desk, same framing as frame 0, Venus calm and smiling: "Backwards isn't *broken.*"
//   Hidden comet: crosses behind Saturn's shot at 8.2. Ghost: rises over the desk's top edge (right) at 23.0.
//   Rewatch bait: the studio monitor behind Venus shows Mars waving (hype moons); in the last shot he's holding a "hi" sign.
// One canvas, DOM type (hook card, last line, the box), grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { drawSaturn, SATURN, gaspZoom, drawGaspLines, gaspCues, drawBits } from '../../st5cast.js'
import { VENUS, drawVenus, drawMars, drawComet, drawPhone, drawDayChip, hookCard, hookCues, genreBug, drawTicker, stingerCues, EX_RED } from '../../st8cast.js'

export const DURATION = 30
const KEY = 'Em'
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', CYAN = '#7fe0ff'
const MONO = "'Space Mono', ui-monospace, monospace"
const NEWS_RED = '#d8203a'

const T = {
  hookOut: [2.5, 2.78], l1: 2.9,
  cutB: 6.3, lower: 6.45, l2: 6.75, diag: 7.0, comet: 8.2, l3: 10.5, fact: 11.0,
  cutC: 13.6, phones: 13.7, l4: 14.3, punch: 16.2,
  cutD: 18.0, knock: [18.35, 18.62], l5: 19.0, light: 20.3, gasp: 20.55, close: 21.95,
  cutE: 22.4, last: 22.5, ghost: 23.0, lastOut: [25.25, 25.55],
}
const VN = VENUS.tag, SATN = SATURN.tag, LIBN = '♎ LIBRA'
const LIB = signStar('libra')
const LINES = [
  { t: T.l1, speaker: VN, text: 'good evening. i am, apparently, going *backwards.*', color: VENUS.tagColor },
  { t: T.l2, speaker: SATN, text: 'it’s not going backwards. it only *looks* that way.', color: SATURN.tagColor },
  { t: T.l3, speaker: SATN, text: 'Venus is passing between Earth and the *Sun.*', color: SATURN.tagColor },
  { t: T.l4, speaker: VN + ' · V.O.', text: 'astrology says it’s a time to re-think love and *exes.*', color: VENUS.tagColor },
  { t: T.l5, speaker: LIBN, text: '…who’s knocking at *2 AM?*', color: LIB.color },
]
const CPS = 28
const scene = t => t < T.cutB ? 'A' : t < T.cutC ? 'B' : t < T.cutD ? 'C' : t < T.cutE ? 'D' : 'E'
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)

// ── the anchor desk shot (A and E): Venus at (540, 1010), the desk in front
const VEN = { x: 540, y: 990, s: 330 }
const DESK = { y0: 1100, y1: 1390 }
const MON = { x0: 760, y0: 560, x1: 990, y1: 730 }
// ── Saturn's shot
const SAT = { x: 300, y: 1130, s: 250 }
const DIAG = { cx: 540, cy: 520, x0: 90, y0: 250, x1: 990, y1: 860 }
// ── the phones: the twelve sign stars in a 3×4 grid
const SIGN_IDS = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
const GRID = SIGN_IDS.map((id, i) => ({ id, x: 170 + (i % 3) * 370, y: 560 + Math.floor(i / 3) * 210, seed: 30 + i, at: T.phones + 0.05 * i }))
// ── Libra's hallway
const DOOR = { x0: 640, x1: 930, y0: 560, y1: 1320 }
export const GHOST = { at: T.ghost, x: 880, y: DESK.y0, where: 'rising over the anchor desk’s top edge, right of Venus, in the last shot' }
export const HIDDEN_COMET = { at: T.comet, where: 'tiny, crossing the sky right to left behind Saturn’s field report' }

/** the explainer geometry: Sun at the centre, Venus (inner, faster) overtakes Earth; returns positions + apparent angle */
function orbitState(t) {
  const u = prog(t, T.diag + 0.4, T.cutC - 0.3)
  const k = lerp(-1.7, 1.7, u)                    // Earth's motion around the conjunction (×0.5 rad)
  const R = { v: 190, e: 265 }                    // 0.72 : 1, the real ratio of the two orbits
  const ae = Math.PI / 2 + k * 0.5, av = Math.PI / 2 + k * 0.5 * 1.62   // Venus laps faster (≈1.6× Earth's angular speed)
  const E = { x: DIAG.cx + Math.cos(ae) * R.e, y: DIAG.cy + Math.sin(ae) * R.e * 0.55 }
  const V = { x: DIAG.cx + Math.cos(av) * R.v, y: DIAG.cy + Math.sin(av) * R.v * 0.55 }
  // apparent direction from Earth to Venus, measured against "the far stars" (relative to straight up, the Sun's side)
  const phi = Math.atan2(V.x - E.x, -(V.y - E.y) / 0.55)
  return { E, V, phi, u }
}

async function build(stage) {
  try {
    await Promise.all(["800 110px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookCard(root, { text: 'BREAKING: Venus is | going *backwards.*', at: 0, out: T.hookOut, size: 100, accentSize: 150, top: 178, accentColor: PINK })
  const last = hookCard(root, { text: 'Backwards isn’t | *broken.*', at: T.last, out: T.lastOut, size: 112, accentSize: 176, top: 178, accentColor: PINK })
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 260, open: T.l1 - 0.22, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  const px = (X, Y, w, h, c) => { x.fillStyle = c; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
  function monoText(s, X, Y, { size = 30, color = BONE, align = 'left', alpha = 1, shadow = true } = {}) {
    x.save(); x.globalAlpha *= alpha; x.font = `700 ${size}px ${MONO}`; x.textAlign = align; x.textBaseline = 'middle'
    if (shadow) { x.fillStyle = 'rgba(6,4,18,0.9)'; x.fillText(s, X, Y + size * 0.09) }
    x.fillStyle = color; x.fillText(s, X, Y); x.restore()
  }
  function studio(t) {
    // backdrop: a deep blue-violet set with a pixel world-grid and a pink "STAR NEWS" ribbon
    const g = x.createLinearGradient(0, 480, 0, 1400); g.addColorStop(0, '#1a1048'); g.addColorStop(1, '#0b0726')
    x.fillStyle = g; x.fillRect(0, 470, 1080, 940)
    x.fillStyle = 'rgba(127,224,255,0.07)'
    for (let i = 0; i < 1080; i += 60) x.fillRect(i, 470, 2, 940)
    for (let j = 470; j < 1410; j += 60) x.fillRect(0, j, 1080, 2)
    // spinning backdrop orbit rings (pink, dashed)
    x.save(); x.translate(300, 820)
    for (let i = 0; i < 46; i++) { if (i % 2) continue; const a = i / 46 * Math.PI * 2 - t * 0.4; px(Math.cos(a) * 230 - 3, Math.sin(a) * 90 - 3, 7, 7, 'rgba(255,143,177,0.35)') }
    x.restore()
    px(0, 470, 1080, 8, NEWS_RED)
    monoText('★ STAR NEWS · ♀ Rx WATCH', 540, 520, { size: 30, color: '#ffd6e4', align: 'center' })
    // the monitor (rewatch bait: Mars waving in it)
    const { x0, y0, x1, y1 } = MON
    px(x0 - 8, y0 - 8, x1 - x0 + 16, y1 - y0 + 16, INK); px(x0 - 4, y0 - 4, x1 - x0 + 8, y1 - y0 + 8, '#3a3358')
    x.save(); x.beginPath(); x.rect(x0, y0, x1 - x0, y1 - y0); x.clip()
    px(x0, y0, x1 - x0, y1 - y0, '#2a0e18')
    const end = scene(t) === 'E'
    drawMars(x, (x0 + x1) / 2, (y0 + y1) / 2 + 18, 110, t, { mood: end ? 'smug' : 'happy', moonMood: end ? 'neutral' : 'hype', seed: 3 })
    if (end) { px((x0 + x1) / 2 + 40, y0 + 28, 62, 40, INK); px((x0 + x1) / 2 + 43, y0 + 31, 56, 34, BONE); monoText('hi', (x0 + x1) / 2 + 71, y0 + 49, { size: 24, color: INK, align: 'center', shadow: false }) }
    for (let j = y0; j < y1; j += 6) px(x0, j, x1 - x0, 2, 'rgba(0,0,0,0.25)')
    x.restore()
    monoText('LIVE · MARS', (x0 + x1) / 2, y1 + 26, { size: 18, color: '#ffb3a0', align: 'center', alpha: 0.8 })
  }
  function desk(t) {
    const { y0, y1 } = DESK
    x.save()
    x.beginPath(); x.moveTo(60, y0); x.lineTo(1020, y0); x.lineTo(1060, y1); x.lineTo(20, y1); x.closePath()
    x.fillStyle = INK; x.fill()
    x.beginPath(); x.moveTo(68, y0 + 8); x.lineTo(1012, y0 + 8); x.lineTo(1048, y1 - 6); x.lineTo(32, y1 - 6); x.closePath()
    const g = x.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, '#3a2a6a'); g.addColorStop(1, '#1c1240'); x.fillStyle = g; x.fill()
    x.restore()
    px(60, y0, 960, 14, '#5c4a9a'); px(60, y0, 960, 4, '#8a78c8')
    px(80, y0 + 70, 920, 10, PINK)
    monoText('♀ VENUS · ANCHOR', 540, y0 + 140, { size: 34, color: BONE, align: 'center' })
    // a coffee mug, steaming
    px(170, y0 - 52, 54, 56, INK); px(174, y0 - 48, 46, 48, BONE); px(220, y0 - 36, 14, 24, INK); px(180, y0 - 40, 34, 6, PINK)
    for (let i = 0; i < 3; i++) { const p = (t * 0.6 + i / 3) % 1; x.globalAlpha = Math.sin(Math.PI * p) * 0.6; px(190 + Math.sin(p * 9 + i) * 8, y0 - 60 - p * 60, 6, 6, BONE); x.globalAlpha = 1 }
  }
  function papers(t) {
    // three sheets: mid-air at frame 0 (she's shuffling them), land on the desk by 1.3
    for (let i = 0; i < 3; i++) {
      const p = ease.outCubic(prog(t, 0, 1.1 + i * 0.12))
      const sx = lerp(420 + i * 90, 640 + i * 46, p), sy = lerp(860 - i * 50, DESK.y0 - 12 - i * 4, ease.inQuad(p)), rot = lerp(-0.5 + i * 0.5, 0.05 * (i - 1), p)
      x.save(); x.translate(sx, sy); x.rotate(rot); px(-46, -30, 92, 60, INK); px(-42, -26, 84, 52, '#fff8ea')
      for (let k = 0; k < 4; k++) px(-34, -16 + k * 11, 68 - (k % 2) * 18, 5, 'rgba(27,18,54,0.45)')
      x.restore()
    }
  }
  function lowerThird(t, at, out, name, sub, y = 1330) {
    const p = prog(t, at, at + 0.35), o = 1 - prog(t, out - 0.25, out)
    if (p <= 0 || o <= 0) return
    const w = lerp(0, 820, ease.outCubic(p))
    x.save(); x.globalAlpha = o
    px(70, y - 52, w, 64, NEWS_RED); px(70, y + 12, w * 0.9, 46, '#efe6d6')
    x.save(); x.beginPath(); x.rect(70, y - 60, w, 130); x.clip()
    monoText(name, 96, y - 20, { size: 34, color: '#ffffff' }); monoText(sub, 96, y + 35, { size: 24, color: INK, shadow: false })
    x.restore(); x.restore()
  }
  function diagram(t) {
    const a = ease.outCubic(prog(t, T.diag, T.diag + 0.4)) * (1 - prog(t, T.cutC - 0.2, T.cutC))
    if (a <= 0) return
    const { x0, y0, x1, y1, cx, cy } = DIAG
    x.save(); x.globalAlpha = a
    px(x0 - 6, y0 - 6, x1 - x0 + 12, y1 - y0 + 12, GOLD); px(x0, y0, x1 - x0, y1 - y0, 'rgba(10,6,30,0.94)')
    monoText('EXPLAINER', x0 + 24, y0 + 30, { size: 24, color: GOLD })
    // the far stars strip along the top, with Venus's apparent spot on it
    const S = orbitState(t)
    const stripY = y0 + 86
    for (let i = 0; i < 26; i++) drawPixelStar(x, x0 + 40 + i * 32 + (i % 3) * 5, stripY + ((i * 7) % 3) * 8 - 8, 12, i % 2 ? 1 : 2, i % 4 ? '#cfc8ff' : '#fffbea')
    monoText('THE FAR STARS', x1 - 24, y0 + 30, { size: 22, color: '#cfc8ff', align: 'right', alpha: 0.85 })
    // orbits
    for (const [r, col] of [[190, 'rgba(255,143,177,0.5)'], [265, 'rgba(127,224,255,0.45)']]) for (let i = 0; i < 60; i++) { if (i % 2) continue; const th = i / 60 * Math.PI * 2; px(cx + Math.cos(th) * r - 3, cy + Math.sin(th) * r * 0.55 - 3, 6, 6, col) }
    // the Sun
    x.save(); x.globalCompositeOperation = 'lighter'; const sg = x.createRadialGradient(cx, cy, 0, cx, cy, 90); sg.addColorStop(0, 'rgba(255,220,120,0.9)'); sg.addColorStop(1, 'rgba(255,180,60,0)'); x.fillStyle = sg; x.fillRect(cx - 90, cy - 90, 180, 180); x.restore()
    drawBits(x, ['.YYY.', 'YYYYY', 'YYWYY', 'YYYYY', '.YYY.'], { Y: '#ffd34a', W: '#fffbe0' }, cx, cy, 9)
    monoText('SUN', cx, cy + 50, { size: 20, color: '#ffe39a', align: 'center' })
    // sightline Earth → Venus → strip
    const dx = S.V.x - S.E.x, dy = S.V.y - S.E.y, k = (stripY - S.E.y) / dy
    const hx = S.E.x + dx * k
    x.save(); x.globalAlpha *= 0.8
    for (let i = 0; i < 40; i++) { const q = i / 40; if (i % 2) continue; px(lerp(S.E.x, hx, q) - 2, lerp(S.E.y, stripY, q) - 2, 5, 5, PINK) }
    x.restore()
    // the apparent-position marker + its trail on the strip (it backs up near the middle: retrograde)
    const trail = []
    for (let tt = T.diag + 0.4; tt <= t; tt += 0.08) { const s2 = orbitState(tt), k2 = (stripY - s2.E.y) / (s2.V.y - s2.E.y); trail.push(s2.E.x + (s2.V.x - s2.E.x) * k2) }
    trail.forEach((tx, i) => px(tx - 3, stripY + 26 + (i % 2) * 2, 6, 6, i === trail.length - 1 ? PINK : 'rgba(255,143,177,0.45)'))
    drawBits(x, ['.P.', 'PPP', '.P.'], { P: PINK }, hx, stripY, 6)
    // the planets
    drawStarChar(x, S.V.x, S.V.y, 64, t, { color: VENUS.color, mood: 'wide', look: [0, -1], bob: 0, glow: 0.6, seed: 5 })
    drawBits(x, ['.BBB.', 'BGBBB', 'BBBGB', 'BBGBB', '.BBB.'], { B: '#3f7cf0', G: '#5fd06a' }, S.E.x, S.E.y, 8)
    monoText('VENUS', S.V.x + 46, S.V.y + 4, { size: 20, color: PINK })
    monoText('EARTH (YOU)', S.E.x, S.E.y + 44, { size: 20, color: '#9fd8ff', align: 'center' })
    // the punchline caption on the panel
    const back = S.u > 0.22 && S.u < 0.78
    monoText(back ? '◀ looks like it’s going BACK' : 'apparent position ▶', 540, y1 - 34, { size: 26, color: back ? PINK : BONE, align: 'center' })
    x.restore()
    // the fact chip
    const fk = pop01(t, T.fact, 0.35, 2.2) * (1 - prog(t, T.cutC - 0.2, T.cutC))
    if (fk > 0.01) {
      x.save(); x.translate(720, 1010); x.scale(fk, fk); x.rotate(-0.04)
      px(-300, -56, 600, 112, INK); px(-294, -50, 588, 100, '#2a1640'); px(-294, -50, 588, 6, PINK)
      monoText('≈ every 1.5 years', 0, -14, { size: 30, color: BONE, align: 'center' }); monoText('lasts ≈ 6 weeks', 0, 26, { size: 30, color: PINK, align: 'center' })
      x.restore()
    }
  }
  function mic(r, t) {
    // a handheld news mic in front of Saturn, pointed at camera
    const mx = r.x + 92, my = r.y + 40 + Math.sin(t * 2) * 3
    x.save(); x.translate(mx, my); x.rotate(-0.35)
    px(-8, 0, 16, 90, INK); px(-5, 0, 10, 86, '#4a4566')
    px(-22, -40, 44, 44, INK); px(-18, -36, 36, 36, '#8a8296'); for (let i = -14; i < 16; i += 8) px(i, -36, 3, 36, '#5f5870')
    px(-16, 8, 32, 26, NEWS_RED); monoText('★', 0, 21, { size: 18, color: '#fff', align: 'center', shadow: false })
    x.restore()
  }
  function hallway(t) {
    const g = x.createLinearGradient(0, 470, 0, 1420); g.addColorStop(0, '#1f1440'); g.addColorStop(1, '#0d0820')
    x.fillStyle = g; x.fillRect(0, 470, 1080, 950)
    px(0, 1320, 1080, 100, '#2a1f4a'); px(0, 1320, 1080, 6, '#4a3a7a')
    for (let i = 0; i < 1080; i += 90) px(i, 1330, 4, 90, '#1c1238')
    // a framed pixel photo on the wall: Libra's scale
    px(150, 640, 170, 140, INK); px(158, 648, 154, 124, '#3a3358'); drawBits(x, ['.....Y.....', '..YYYYYYY..', '.Y...Y...Y.', 'YYY..Y..YYY', '.....Y.....', '...YYYYY...'], { Y: GOLD }, 235, 710, 9, { outline: null })
    // the door
    const { x0, x1, y0, y1 } = DOOR
    px(x0 - 18, y0 - 18, x1 - x0 + 36, y1 - y0 + 18, INK); px(x0 - 12, y0 - 12, x1 - x0 + 24, y1 - y0 + 12, '#5a4a32')
    const knock = T.knock.some(k => t >= k && t < k + 0.12)
    const kx = knock ? 4 : 0
    px(x0 + kx, y0, x1 - x0, y1 - y0, '#8a5a3a'); px(x0 + 20 + kx, y0 + 30, x1 - x0 - 40, 300, '#7a4e32'); px(x0 + 20 + kx, y0 + 380, x1 - x0 - 40, 330, '#7a4e32')
    px(x0 + (x1 - x0) / 2 - 10 + kx, y0 + 220, 20, 20, INK); px(x0 + (x1 - x0) / 2 - 6 + kx, y0 + 224, 12, 12, '#bfe6ff')   // peephole
    px(x0 + 30 + kx, y0 + 380, 26, 26, INK); px(x0 + 34 + kx, y0 + 384, 18, 18, GOLD)                                          // knob
    // the cliff: a tail of light under the door
    const lk = prog(t, T.light, T.light + 0.9)
    if (lk > 0) {
      const R = rng(Math.floor(t * 12))
      x.save(); x.globalCompositeOperation = 'lighter'
      const lg = x.createLinearGradient(0, y1 - 6, 0, y1 + 90); lg.addColorStop(0, `rgba(190,245,255,${0.9 * lk})`); lg.addColorStop(1, 'rgba(127,224,255,0)')
      x.fillStyle = lg; x.beginPath(); x.moveTo(x0, y1 - 4); x.lineTo(x1, y1 - 4); x.lineTo(x1 - 40 - 260 * lk, y1 + 92); x.lineTo(x0 - 60 - 380 * lk, y1 + 92); x.closePath(); x.fill()
      for (let i = 0; i < 26; i++) { const q = R(); px(lerp(x0 - 300 * lk, x1, q), y1 + 4 + R() * 70 * lk, 6, 6, i % 3 ? '#bff0ff' : '#fff1c8') }
      x.restore()
      px(x0, y1 - 6, x1 - x0, 6, `rgba(230,250,255,${lk})`)
    }
    // KNOCK KNOCK
    T.knock.forEach((k, i) => {
      const p = prog(t, k, k + 0.7)
      if (p <= 0 || p >= 1) return
      x.save(); x.translate(x0 - 80 - i * 40, y0 + 260 + i * 110); x.rotate(-0.12 + i * 0.2); const sc = 0.6 + 0.4 * easeOutBack(clamp(p * 4), 2.6); x.scale(sc, sc); x.globalAlpha = 1 - ease.inQuad(prog(p, 0.7, 1))
      x.font = `800 84px Inter`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = 'rgba(6,4,18,0.9)'; x.fillText('KNOCK', 4, 6); x.fillStyle = GOLD; x.fillText('KNOCK', 0, 0)
      x.restore()
    })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const sc = scene(t)
      drawSky(x, t, { ...SKY_H, dim: sc === 'B' ? SKY_H.dim * 1.1 : SKY_H.dim })
      drawSeedConstellation(x, t, 100, { alpha: 0.5 })
      if (sc === 'A' || sc === 'E') {
        const punch = sc === 'A' ? 1 + 0.05 * ease.inOutCubic(prog(t, 3.6, 6.2)) : 1 + 0.06 * (1 - ease.outCubic(prog(t, T.cutE, T.cutE + 0.5)))
        x.save(); x.translate(540, 1000); x.scale(punch, punch); x.translate(-540, -1000)
        studio(t)
        const st = sc === 'A' ? (t < 1.3 ? { mood: 'wide', look: [0, 1], blink: false } : t < T.l1 ? { mood: 'wide', look: [0, 0] } : t < 5.0 ? { mood: 'eyeroll' } : { mood: 'neutral', look: [0, 0] })
          : (t < T.last + 0.5 ? { mood: 'sparkle', look: [0, 0] } : t < 24.3 ? { mood: 'happy' } : { mood: 'wink', look: [0, 0] })
        drawVenus(x, VEN.x, VEN.y, VEN.s, t, { ...st, retro: sc === 'A' ? 0.55 : 0.3, hops: [...talkHops(LINES, VN, { cps: CPS }), T.cutE + 0.05, T.last + 0.3], seed: 5 })
        if (sc === 'A') papers(t)
        desk(t)
        if (sc === 'A') lowerThird(t, -0.4, T.l1 - 0.25, 'DAY 1 OF ABOUT SIX WEEKS', 'VENUS RETROGRADE · STAR NEWS', 1500)
        if (sc === 'E') lowerThird(t, T.cutE + 0.3, T.lastOut[1], 'UPDATE: VENUS IS FINE', 'IT ONLY LOOKS BACKWARDS FROM HERE', 1500)
        if (sc === 'E') drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.6, from: 'below', cell: 3 })
        x.restore()
      } else if (sc === 'B') {
        // hidden comet first (it's far away)
        const cp = prog(t, T.comet, T.comet + 2.0)
        if (cp > 0 && cp < 1) drawComet(x, lerp(1110, 560, cp), lerp(1000, 1150, cp), 30, t, { aura: false, exPin: false, tail: 90, mood: 'happy', sunDir: [-1, 0.27], bob: 0 })
        const r = drawSaturn(x, SAT.x, SAT.y, SAT.s, t, { mood: t < T.l3 ? 'neutral' : 'happy', look: [1, -1], pointer: false, pop: pop01(t, T.cutB, 0.4, 2), hops: talkHops(LINES, SATN, { cps: CPS }) })
        mic(r, t)
        diagram(t)
        lowerThird(t, T.lower, T.cutC, 'SATURN · FIELD REPORTER', 'LIVE FROM ORBIT · VERY CALM')
      } else if (sc === 'C') {
        const z = 1 + 0.07 * ease.inOutCubic(prog(t, T.punch, T.punch + 0.4))
        x.save(); x.translate(540, 900); x.scale(z, z); x.translate(-540, -900)
        for (const m of GRID) {
          const p = pop01(t, m.at, 0.3, 2.2), st = signStar(m.id)
          const r = drawStarChar(x, m.x, m.y, 120, t, { color: st.color, glyph: null, mood: t < T.punch ? 'wide' : (m.id === 'libra' ? 'wide' : ['eyeroll', 'squint', 'wide', 'heart'][m.seed % 4]), look: [0.6, 1], pop: p, seed: m.seed, glow: 0.7, hops: [m.at + 0.2, T.punch + (m.seed % 4) * 0.05] })
          const lit = clamp((t - T.phones - 0.3 - (m.seed % 5) * 0.03) * 6)
          drawPhone(x, r.x + 70, r.y + 44, 84, t, { lit, text: null, buzz: lit > 0 ? 1 - prog(t, T.phones + 1, T.phones + 3) * 0.7 : 0, rot: 0.15, pop: p })
          void r
        }
        x.restore()
        // the stamp: every phone, the same text
        const sp = prog(t, T.punch, T.punch + 0.35)
        if (sp > 0) {
          x.save(); x.translate(540, 900); x.rotate(-0.08); const k2 = lerp(1.8, 1, easeOutBack(sp, 1.6)); x.scale(k2, k2); x.globalAlpha = clamp(sp * 4)
          px(-300, -110, 600, 220, INK); px(-292, -102, 584, 204, BONE); px(-292, -102, 584, 10, PINK)
          x.font = `700 92px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('u up?', 0, -8)
          x.font = `700 30px ${MONO}`; x.fillStyle = EX_RED; x.fillText('× 12 PHONES · 2:00 AM', 0, 70)
          x.restore()
        }
        lowerThird(t, T.phones + 0.2, T.cutD, 'DEVELOPING', 'EVERY PHONE IN THE ZODIAC · 2:00 AM', 1330)
      } else if (sc === 'D') {
        const z = gaspZoom(t, { at: T.gasp, dur: 1.5, x: 640, y: 1250, amount: 0.22, follow: 0.25 })
        x.save(); z.apply(x)
        hallway(t)
        const lib = t < T.knock[0] ? { mood: 'neutral', look: [1, 0] } : t < T.light ? { mood: 'wide', look: [1, 0], blink: false } : { mood: 'wide', look: [1, 1], blink: false }
        drawStarChar(x, 330, 1150, 280, t, { color: LIB.color, glyph: LIB.glyph, ...lib, hops: [T.cutD + 0.05, T.knock[0] + 0.05, ...talkHops(LINES, LIBN, { cps: CPS })], squash: t > T.light ? -0.06 : 0, seed: 7 })
        x.restore()
        drawGaspLines(x, t, { at: T.gasp, dur: 1.5, x: 640, y: 1250, follow: 0.25, color: CYAN })
        lowerThird(t, T.cutD + 0.1, T.close + 0.3, 'LIVE · LIBRA’S HALLWAY', 'LIBRA IS RULED BY VENUS. OF COURSE.', 520)
      }
      // the network chrome (every shot)
      genreBug(x, t, { text: 'LIVE', x: 70, y: sc === 'B' ? 905 : 440, color: NEWS_RED })
      drawDayChip(x, t, { day: 1, phase: 'retro' })
      drawTicker(x, t, { text: t < T.cutC ? 'EXES REPORTED IN 12 SIGNS • EXPERTS URGE CALM • DO NOT REPLY “hey stranger”' : 'EVERY PHONE IN THE ZODIAC LIGHTS UP • LIBRA: “a knock?” • VENUS: STILL FINE', label: 'BREAKING', y: 1790, color: NEWS_RED })
      hook.update(t); last.update(t)
      box.update(t)
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.cutC, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S8 E01', fadeIn: 0 }), cardCuts(CUTS)]

// ── sound
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const r3 = v => +v.toFixed(3)
export const CUES = [
  ...hookCues(0, { key: KEY }),
  ...stingerCues(T.hookOut[0] + 0.1, { key: KEY, kind: 'news' }),
  ...[0, 1, 2].map(i => ['tick', r3(0.2 + i * 0.12), 0.03]),
  ...talkCues(LINES, { cps: CPS, pitch: { [VN]: 1046.5, [SATN]: 520, [VN + ' · V.O.']: 1046.5, [LIBN]: 784 } }),
  ['whoosh', T.cutB - 0.05, 0.4, 0.05], ['pop', T.lower, 880, 0.04, -0.3],
  ['pop', T.diag, 659.25, 0.04, 0], ['pluck', T.diag + 0.4, 987.77, 0.03, 0.5, 0],
  ['tick', T.comet + 0.3, 0.012],
  ['pop', T.fact, 1174.66, 0.045, 0.3], ['bell', T.fact + 0.05, 1760, 0.025, 1.2, 0.3],
  ...GRID.map((m, i) => ['pop', r3(m.at + 0.3 + (m.seed % 5) * 0.03), NOTE[i % 7] * 2, 0.022, (m.x - 540) / 600]),
  ...GRID.map((m, i) => ['tick', r3(m.at + 0.35 + i * 0.01), 0.03]),
  ['whoosh', T.punch, 0.35, 0.04], ['tom', T.punch, 90, { gain: 0.25 }],
  ...T.knock.map(k => ['tom', k, 120, { gain: 0.42, decay: 0.2 }]), ...T.knock.map(k => ['kick', k, { gain: 0.25, duck: false }]),
  ['swell', T.light - 0.3, T.light + 0.4, { gain: 0.05 }], ['glitter', T.light, T.light + 1.0],
  ...gaspCues(T.gasp, { key: KEY }),
  ...hookCues(T.last - 0.16, { key: KEY }),
  ['bell', T.last + 0.5, 1318.51, 0.03, 1.6, 0],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
