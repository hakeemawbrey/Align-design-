// st8rose (45 s vertical Align ad, Star Talk season 8 "EX RETROGRADE", S8 E22, a space documentary) · story 0–40.6,
// then the shared end card.
//   "Venus has been drawing a *rose.*"  A slow, hushed science documentary, hosted by THE STARS: the title card, the lower
//   thirds, the orrery diagram, the archive insert, the year counter. The fact is real: seen from Earth, Venus's path over
//   about eight years makes five retrograde loops (one per inferior conjunction), and together they trace a five-petal
//   "rose" (the pentagram of Venus). The film draws it from real numbers: circular orbits of 0.723 AU / 224.7 days (Venus)
//   and 1 AU / 365.26 days (Earth), Earth held at the centre.
//   0.00       frame 0: the hook card is up; Venus (the Morning Star, gold rim) holds a giant pixel pencil, mid-stroke on a
//              faint, unfinished petal. The loop it opens: why is she drawing a rose?
//   2.40       letterbox bars slide in; the documentary title card: "THE *ROSE*" / A STAR TALK DOCUMENTARY.
//   4.30       HOST (THE STARS): "about every 18 months, Venus seems to go *backwards.*"  lower third: VENUS RETROGRADE.
//   7.70       the orrery: Venus laps Earth on the inside. "An *illusion.*"  HOST: "it's an illusion: she passes
//              *between* us and the Sun."  INFERIOR CONJUNCTION flashes as they line up. (Rewatch bait: a tiny Mars
//              crosses the diagram's edge carrying flowers, setting up E23.)
//   12.0       HOST: "now track her from Earth for *eight years.*"  Earth at the centre; the curve draws itself, YEAR 1…8,
//              and each loop stamps LOOP 1…5.  (The hidden Comet crosses the top of the frame at 16.9.)
//   22.6       the rose completes and blooms. "Five *petals.*"  VENUS: "wait. *i* drew that?"
//   24.9       the archive insert (sepia): a clay tablet. HOST: "the Babylonians tracked her risings on a *tablet.*"
//              lower third: VENUS TABLET OF AMMISADUQA · BABYLON. (The ghost peeks from behind the tablet at 26.4.)
//   29.1       "She *learned.*"  VENUS: "every loop, i went back… and *learned* a little."  →  "and look what it *made.*"
//   35.45      "Even your loops | can make a *rose.*"  The last shot rhymes with frame 0: Venus, the pencil, the same
//              petal, now finished and glowing. Everything is out by 40.4.
// One canvas (sky + documentary graphics + cast), DOM type, the dialogue box, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawBits } from '../../st5cast.js'
import { VENUS, drawVenus, drawMars, drawComet, drawDayChip, hookCard, hookCues, genreBug } from '../../st8cast.js'

export const DURATION = 45
const KEY = 'Db'
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const W = 1080
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', CYAN = '#7fdcff', ROSE = '#ff6f9f', LAV = '#c9a6ff', SEPIA = '#c8a16a'
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const SERIF = "'EB Garamond', Georgia, serif"

// ── the timeline
const T = {
  hookOut: 2.35,
  bars: [2.4, 2.8], title: 2.5, titleOut: [6.9, 7.3],
  open: 4.1, l1: 4.3, lt1: [4.5, 7.4],
  orrery: [7.6, 12.3], h2: 7.75, h2Land: 8.15, h2Out: [12.0, 12.25], l2: 7.9, conj: 10.2, mars: [8.8, 11.6],
  l3: 12.0, draw: [12.6, 22.4], h3: 12.55, h3Land: 13.0, h3Out: [22.2, 22.45], comet: 16.9,
  bloom: 22.45, h4: 22.6, h4Land: 23.0, h4Out: [24.6, 24.85], l4: 22.65, lt2: [22.8, 24.7],
  archive: [24.85, 29.0], l5: 24.95, lt3: [25.3, 28.7], ghost: 26.4,
  h5: 29.1, h5Land: 29.5, h5Out: [35.0, 35.25], l6: 29.25, l7: 32.6, close: 35.0,
  h6: 35.45, h6Land: 35.95, h6Out: [39.9, 40.3], out: [39.95, 40.4],
}
const NARR = 'THE STARS', VEN = VENUS.tag
const LINES = [
  { t: T.l1, speaker: NARR, text: 'about every 18 months, Venus seems to go *backwards.*' },
  { t: T.l2, speaker: NARR, text: 'it’s an illusion: she passes *between* us and the Sun.' },
  { t: T.l3, speaker: NARR, text: 'now track her from Earth for *eight years.*' },
  { t: T.l4, speaker: VEN, text: 'wait. *i* drew that?', color: PINK },
  { t: T.l5, speaker: NARR, text: 'the Babylonians tracked her risings on a *tablet.*' },
  { t: T.l6, speaker: VEN, text: 'every loop, i went back… and *learned* a little.', color: PINK },
  { t: T.l7, speaker: VEN, text: 'and look what it *made.*', color: PINK },
]
const CPS = 28
const LT = lineTimes(LINES, { cps: CPS })
const HOOK = 'Venus has been | drawing a *rose.*'

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

// ── the real geometry (circular, coplanar orbits: plenty for the picture)
const inOutSine = u => 0.5 - 0.5 * Math.cos(Math.PI * u)
const RV = 0.723, PV = 224.701, PE = 365.256, SYN = 1 / (1 / PV - 1 / PE)     // SYN ≈ 583.9 days
const D0 = -SYN / 2, D1 = D0 + 5 * SYN                                          // five loops, centred on conjunctions 0…4
const geo = d => { const av = 2 * Math.PI * d / PV, ae = 2 * Math.PI * d / PE; return [RV * Math.cos(av) - Math.cos(ae), RV * Math.sin(av) - Math.sin(ae)] }
const ROSE_C = { x: 540, y: 905 }, ROSE_S = 236                                 // px per AU (|P| ≤ 1.723 → ≤ 407 px)
const N_PTS = 1400
const PTS = Array.from({ length: N_PTS + 1 }, (_, i) => { const d = lerp(D0, D1, i / N_PTS); const [u, v] = geo(d); return [ROSE_C.x + u * ROSE_S, ROSE_C.y - v * ROSE_S, d] })
const CONJ = [0, 1, 2, 3, 4].map(k => k * SYN)
// drawing schedule: the film's clock → days, eased a little so it starts and settles gently
const dayAt = t => lerp(D0, D1, inOutSine(prog(t, ...T.draw)))
const loopAt = k => T.draw[0] + (T.draw[1] - T.draw[0]) * invSine((CONJ[k] - D0) / (D1 - D0))
function invSine(y) { let lo = 0, hi = 1; for (let i = 0; i < 30; i++) { const m = (lo + hi) / 2; if (inOutSine(m) < y) lo = m; else hi = m } return (lo + hi) / 2 }
const LOOPS = CONJ.map((_, k) => loopAt(k))

// ── layout
const VEN0 = { x: 850, y: 1262, size: 262 }            // Venus at frame 0 and the last shot, with the pencil
const PETAL0 = 0.43                                     // the fraction of the curve already drawn at frame 0 (two loops)
const ORR = { x: 540, y: 900, rE: 330 }                // the orrery
const TAB = { x: 540, y: 900, w: 560, h: 640 }        // the clay tablet
export const GHOST = { at: T.ghost, x: TAB.x + TAB.w / 2, y: 980, where: 'leaning out from behind the right edge of the Babylonian clay tablet' }
export const COMET = { at: T.comet }

const PENCIL = [
  '..PPP...........................',
  '.PPPPkYYYYYYYYYYYYYYYYYYYYYYwwT..',
  'PPPPPkYYYYYYYYYYYYYYYYYYYYYYwwTTI',
  '.PPPPkyyyyyyyyyyyyyyyyyyyyyywwT..',
  '..PPP...........................',
]
const PENCIL_C = { P: '#ff8fb1', k: '#c9cfdb', Y: '#f7c948', y: '#d9a530', w: '#f3d9b0', T: '#e8c49a', I: '#3a2a4e' }
const CUNEI = ['X.', 'XX', 'X.']                       // a pixel wedge mark for the tablet

function venusState(t) {
  if (t < T.bars[1]) return { mood: 'squint', look: [-1, -0.5] }        // concentrating on the petal
  if (t < T.orrery[0]) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.draw[0]) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.bloom) return { mood: 'wide', look: [-1, -0.4], blink: false }
  if (t < LT[3].done + 0.4) return { mood: 'wide', look: [-1, -0.6], blink: false }
  if (t < T.archive[1]) return { mood: 'sparkle', look: [-1, 0] }
  if (t < T.l7) return { mood: 'neutral', look: [0, 0] }
  if (t < T.h6) return { mood: 'happy' }
  return { mood: t < T.h6Land + 1.2 ? 'heart' : 'sparkle', look: [-1, -0.5] }
}
const VEN_HOPS = [...talkHops(LINES, VEN, { cps: CPS }), T.bloom + 0.1, T.h6Land]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 40px Inter", "italic 500 190px 'EB Garamond'", "italic 500 64px 'EB Garamond'", "700 52px 'Space Mono'", "700 28px 'Space Mono'", "700 22px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const hook = hookCard(root, { text: HOOK, at: 0, out: T.hookOut, accentColor: ROSE })
  const H2 = popText(root, 'An *illusion.*', { top: 236, size: 120, accentSize: 184, at: T.h2, gap: 0.09, accentColor: CYAN, wobble: true, late: 1, lateAt: T.h2Land, fit: true })
  const H3 = popText(root, 'Eight years | of *loops…*', { top: 196, size: 110, accentSize: 168, at: T.h3, gap: 0.09, accentColor: ROSE, wobble: true, late: 1, lateAt: T.h3Land, fit: true })
  const H4 = popText(root, 'Five *petals.*', { top: 236, size: 120, accentSize: 184, at: T.h4, gap: 0.09, accentColor: ROSE, wobble: true, late: 1, lateAt: T.h4Land, fit: true })
  const H5 = popText(root, 'She *learned.*', { top: 236, size: 120, accentSize: 184, at: T.h5, gap: 0.09, accentColor: GOLD, wobble: true, late: 1, lateAt: T.h5Land, fit: true })
  const H6 = popText(root, 'Even your loops | can make a *rose.*', { top: 190, size: 104, accentSize: 176, at: T.h6, gap: 0.08, accentColor: ROSE, wobble: true, late: 1, lateAt: T.h6Land, fit: true })
  const HEADS = [[H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [H6, T.h6Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1452, width: 960, height: 290, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  const BG = (() => { const r = rng(2208); return Array.from({ length: 60 }, () => [r() * W, 470 + r() * 900, r()]) })()
  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, rgba(col, 0.5 * a)); g.addColorStop(0.45, rgba(col, 0.16 * a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore()
  }
  function mono(text, cx, cy, size, col, { align = 'center', shadow = true, ls = 0 } = {}) {
    x.font = `700 ${size}px ${MONO}`; x.textAlign = align; x.textBaseline = 'middle'; x.letterSpacing = ls + 'px'
    if (shadow) { x.fillStyle = 'rgba(6,4,18,0.9)'; x.fillText(text, cx + 2, cy + 3) }
    x.fillStyle = col; x.fillText(text, cx, cy); x.letterSpacing = '0px'
  }
  function planet(cx, cy, r, col, hi) {
    const c = Math.max(3, Math.round(r / 5))
    for (let j = -Math.ceil(r / c); j <= Math.ceil(r / c); j++) for (let i = -Math.ceil(r / c); i <= Math.ceil(r / c); i++) {
      const d = Math.hypot(i * c, j * c); if (d > r) continue
      x.fillStyle = d > r - c ? INK : (i + j < -1 ? hi : col); x.fillRect(Math.round(cx + i * c - c / 2), Math.round(cy + j * c - c / 2), c, c)
    }
  }

  // ── the rose: the geocentric path, drawn as chunky pixels; `upto` = index reached; `bloom` = 0…1 fill + glow
  function drawRose(t, upto, { alpha = 1, bloom = 0, tip = true } = {}) {
    if (alpha <= 0.01 || upto < 1) return
    x.save(); x.globalAlpha = alpha
    if (bloom > 0) glow(ROSE_C.x, ROSE_C.y, 540, ROSE, 0.6 * bloom * (0.85 + 0.15 * Math.sin(t * 2.4)))
    const n = Math.floor(upto)
    const path = () => { x.beginPath(); for (let i = 0; i <= n; i++) { const [px, py] = PTS[i]; i ? x.lineTo(px, py) : x.moveTo(px, py) } }
    x.lineJoin = 'round'; x.lineCap = 'round'
    path(); x.strokeStyle = INK; x.lineWidth = 15; x.stroke()
    path(); x.strokeStyle = bloom > 0 ? '#ff9cc0' : ROSE; x.lineWidth = 8; x.stroke()
    if (bloom > 0) { path(); x.strokeStyle = rgba('#fff1f6', 0.75 * bloom); x.lineWidth = 3; x.stroke() }
    // a bright fresh stretch just behind the pen
    if (tip && n < N_PTS) { x.beginPath(); for (let i = Math.max(0, n - 30); i <= n; i++) { const [px, py] = PTS[i]; i > n - 30 ? x.lineTo(px, py) : x.moveTo(px, py) } x.strokeStyle = '#fff1f6'; x.lineWidth = 8; x.stroke() }
    if (tip && n < N_PTS) { const [px, py] = PTS[n]; glow(px, py, 70, '#ffd1e0', 0.9); planet(px, py, 13, '#ffc2d6', '#fff1f6') }
    x.restore()
  }
  // ── the documentary letterbox, the title card, the lower thirds
  function bars(t) {
    const k = ease.outCubic(prog(t, ...T.bars)) * (1 - ease.inCubic(prog(t, T.out[0] - 0.2, T.out[1])))
    if (k <= 0) return
    x.fillStyle = 'rgba(2,1,6,0.92)'; x.fillRect(0, 446, W, 46 * k); x.fillRect(0, 1394, W, 46 * k)
  }
  function lowerThird(t, [a, b], title, sub, col = ROSE) {
    if (t < a || t > b) return
    const k = ease.outCubic(prog(t, a, a + 0.45)) * (1 - ease.inCubic(prog(t, b - 0.3, b)))
    const y = 1330, w = 660 * k
    x.save(); x.globalAlpha = clamp(k * 1.4)
    x.fillStyle = 'rgba(10,6,24,0.88)'; x.fillRect(80, y - 56, w, 112)
    x.fillStyle = col; x.fillRect(80, y - 56, 10, 112)
    x.save(); x.beginPath(); x.rect(80, y - 60, w, 120); x.clip()
    x.font = `800 40px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText(title, 116, y - 18)
    x.font = `700 18px ${MONO}`; x.fillStyle = rgba(col, 0.95); x.letterSpacing = '2px'; x.fillText(sub, 116, y + 28); x.letterSpacing = '0px'
    x.restore(); x.restore()
  }
  function titleCard(t) {
    if (t < T.title || t > T.titleOut[1]) return
    const k = ease.outCubic(prog(t, T.title, T.title + 0.9)) * outK(t, T.titleOut)
    x.save(); x.globalAlpha = k
    x.font = `italic 500 220px ${SERIF}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.letterSpacing = `${lerp(40, 8, ease.outCubic(prog(t, T.title, T.title + 2.5)))}px`
    x.fillStyle = 'rgba(6,4,18,0.9)'; x.fillText('the rose', 544, 296)
    x.fillStyle = ROSE; x.fillText('the rose', 540, 290)
    x.letterSpacing = '0px'
    mono('A  STAR  TALK  DOCUMENTARY', 540, 410, 26, BONE, { ls: 4 })
    x.restore()
  }

  // ── the orrery: Sun at the centre, Venus laps Earth on the inside; the sight line shows the backward drift
  function orrery(t) {
    const [a, b] = T.orrery
    if (t < a || t > b) return
    const k = ease.outCubic(prog(t, a, a + 0.5)) * (1 - ease.inCubic(prog(t, b - 0.3, b)))
    // a slow clock around one conjunction (at T.conj)
    const d = (t - T.conj) * 40
    const ae = 2 * Math.PI * d / PE + Math.PI / 2, av = 2 * Math.PI * d / PV + Math.PI / 2
    const E = [ORR.x + Math.cos(ae) * ORR.rE, ORR.y + Math.sin(ae) * ORR.rE], V = [ORR.x + Math.cos(av) * ORR.rE * RV, ORR.y + Math.sin(av) * ORR.rE * RV]
    x.save(); x.globalAlpha = k
    x.strokeStyle = rgba(BONE, 0.35); x.lineWidth = 3; x.setLineDash([10, 12])
    x.beginPath(); x.arc(ORR.x, ORR.y, ORR.rE, 0, Math.PI * 2); x.stroke()
    x.strokeStyle = rgba(ROSE, 0.45); x.beginPath(); x.arc(ORR.x, ORR.y, ORR.rE * RV, 0, Math.PI * 2); x.stroke(); x.setLineDash([])
    // the Sun
    glow(ORR.x, ORR.y, 200, GOLD, 1); planet(ORR.x, ORR.y, 46, '#ffd24a', '#fff1c8')
    // the sight line, Earth → Venus → out to the background stars
    const dx = V[0] - E[0], dy = V[1] - E[1], L = Math.hypot(dx, dy)
    x.strokeStyle = rgba(CYAN, 0.7); x.lineWidth = 4; x.beginPath(); x.moveTo(E[0], E[1]); x.lineTo(E[0] + dx / L * 760, E[1] + dy / L * 760); x.stroke()
    planet(E[0], E[1], 26, '#4f8fe0', '#9fd0ff'); mono('EARTH', E[0], E[1] + 50, 22, CYAN)
    planet(V[0], V[1], 22, '#ff9fbf', '#fff1f6'); mono('VENUS', V[0], V[1] - 46, 22, PINK)
    // INFERIOR CONJUNCTION as they line up
    const cj = 1 - clamp(Math.abs(t - T.conj) / 0.7)
    if (cj > 0) {
      x.save(); x.globalAlpha = k * cj
      x.strokeStyle = GOLD; x.lineWidth = 4; x.setLineDash([6, 8]); x.beginPath(); x.moveTo(ORR.x, ORR.y); x.lineTo(E[0], E[1]); x.stroke(); x.setLineDash([])
      x.fillStyle = 'rgba(10,6,24,0.9)'; x.fillRect(250, 520, 580, 64); x.strokeStyle = GOLD; x.lineWidth = 3; x.strokeRect(250, 520, 580, 64)
      mono('INFERIOR CONJUNCTION', 540, 553, 32, GOLD, { shadow: false, ls: 2 })
      x.restore()
    }
    // rewatch bait: tiny Mars hurrying along the bottom edge with flowers (E23 is coming)
    const mp = prog(t, ...T.mars)
    if (mp > 0 && mp < 1) {
      const mx = lerp(1120, -60, mp), my = 1228 + Math.abs(Math.sin(t * 9)) * -10
      drawMars(x, mx, my, 70, t, { mood: 'heart', helmet: true, hops: [] })
      drawBits(x, ['.p.p.', 'pPpPp', '.ggg.', '..g..', '..g..'], { p: '#ff8fb1', P: '#ff4f86', g: '#5fc46a' }, mx - 44, my - 30, 5)
    }
    x.restore()
  }
  // ── the archive insert: a sepia clay tablet with pixel wedge marks
  function archive(t) {
    const [a, b] = T.archive
    if (t < a || t > b) return
    const k = ease.outCubic(prog(t, a, a + 0.4)) * (1 - ease.inCubic(prog(t, b - 0.3, b)))
    x.save(); x.globalAlpha = k
    x.fillStyle = 'rgba(40,26,14,0.82)'; x.fillRect(0, 430, W, 950)
    const { x: cx, y: cy, w, h } = TAB
    x.save(); x.translate(cx, cy + (1 - k) * 40); x.rotate(-0.04)
    x.fillStyle = '#2a1a0c'; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
    x.fillStyle = '#b08350'; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = '#c99a62'; x.fillRect(-w / 2, -h / 2, w, 14)
    x.fillStyle = '#8f6638'; x.fillRect(-w / 2, h / 2 - 18, w, 18)
    const r = rng(77)
    for (let row = 0; row < 11; row++) {
      const yy = -h / 2 + 60 + row * 52
      x.fillStyle = 'rgba(90,60,30,0.5)'; x.fillRect(-w / 2 + 30, yy + 34, w - 60, 3)
      for (let xx = -w / 2 + 44; xx < w / 2 - 50; xx += 26 + r() * 16) if (r() < 0.8) drawBits(x, CUNEI, { X: '#5a3c1e' }, xx, yy + 14, 4 + (r() < 0.3 ? 1 : 0), { outline: null })
    }
    x.restore()
    // the archive's own grain + vignette
    for (let i = 0; i < 40; i++) { const rr = rng(Math.floor(t * 12) * 97 + i); x.fillStyle = `rgba(255,236,200,${0.06 + rr() * 0.06})`; x.fillRect(rr() * W, 430 + rr() * 950, 2 + rr() * 3, 2 + rr() * 3) }
    mono('ARCHIVE', 120, 520, 26, SEPIA, { align: 'left', ls: 4 })
    x.restore()
    drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'right', cell: 3 })
  }
  // the year counter + loop stamps while the rose draws
  function hud(t) {
    if (t < T.draw[0] - 0.2 || t > T.bloom + 0.6) return
    const k = ease.outCubic(prog(t, T.draw[0] - 0.2, T.draw[0] + 0.2)) * (1 - ease.inCubic(prog(t, T.bloom, T.bloom + 0.6)))
    const yr = clamp(Math.floor((dayAt(t) - D0) / PE) + 1, 1, 8)
    x.save(); x.globalAlpha = k
    x.fillStyle = 'rgba(10,6,24,0.88)'; x.fillRect(90, 1250, 300, 96); x.strokeStyle = rgba(BONE, 0.6); x.lineWidth = 3; x.strokeRect(90, 1250, 300, 96)
    mono('YEAR', 150, 1298, 26, rgba(BONE, 0.8), { shadow: false, ls: 3 })
    mono(`${yr} / 8`, 290, 1298, 46, BONE, { shadow: false })
    // Earth sits at the centre of this view
    planet(ROSE_C.x, ROSE_C.y, 22, '#4f8fe0', '#9fd0ff'); mono('EARTH', ROSE_C.x, ROSE_C.y + 44, 20, CYAN)
    LOOPS.forEach((lt, i) => {
      const sp = prog(t, lt, lt + 0.25); if (sp <= 0 || t > lt + 1.3) return
      const [px, py] = PTS[Math.round(N_PTS * (CONJ[i] - D0) / (D1 - D0))]
      const sk = easeOutBack(sp, 3) * (1 - ease.inCubic(prog(t, lt + 1.0, lt + 1.3)))
      x.save(); x.translate(px + (px > 540 ? 110 : -110), py + (py > 905 ? 50 : -50)); x.rotate(-0.08); x.scale(sk, sk)
      x.fillStyle = 'rgba(10,6,24,0.9)'; x.fillRect(-100, -34, 200, 68); x.strokeStyle = ROSE; x.lineWidth = 4; x.strokeRect(-100, -34, 200, 68)
      mono(`LOOP ${i + 1}`, 0, 2, 34, ROSE, { shadow: false }); x.restore()
    })
    x.restore()
  }
  function pencil(px, py, rot, k = 1) {
    if (k <= 0.01) return
    drawBits(x, PENCIL, PENCIL_C, px, py, 6 * k, { rot })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, 100, { alpha: 0.4 })
      for (const [sx, sy, ph] of BG) { const tw = 0.5 + 0.5 * Math.sin(t * 1.6 + ph * 11); drawPixelStar(x, sx, sy, 8 + 10 * ph, tw > 0.75 ? 1 : 0, ph > 0.7 ? LAV : BONE) }
      // the hidden Comet: one tiny pass along the top of the picture during the eight years
      const cp = prog(t, T.comet, T.comet + 1.8)
      drawComet(x, lerp(-60, 1140, cp), lerp(520, 470, cp), 30, t, { aura: false, exPin: false, tail: 90, mood: 'happy', sunDir: [0.3, 1], alpha: cp > 0 && cp < 1 ? 0.8 : 0 })
      const ok = popOut(t, T.out)
      // the rose: unfinished at frame 0, hidden while the orrery explains, drawn for real, finished and blooming at the end
      const startUpto = N_PTS * PETAL0
      const drawP = t < T.draw[0] ? 0 : Math.floor(N_PTS * (dayAt(t) - D0) / (D1 - D0))
      const bloom = ease.outCubic(prog(t, T.bloom, T.bloom + 0.8))
      if (t < T.orrery[0]) drawRose(t, startUpto, { alpha: 1 * (1 - prog(t, T.orrery[0] - 0.5, T.orrery[0])), tip: false })
      else if (t >= T.draw[0] && t < T.archive[0]) drawRose(t, drawP, { bloom, tip: t < T.bloom })
      else if (t >= T.archive[1]) drawRose(t, N_PTS, { bloom: ok, tip: false, alpha: ok * ease.outCubic(prog(t, T.archive[1], T.archive[1] + 0.5)) })
      orrery(t)
      hud(t)
      archive(t)
      // Venus, the artist, with her pencil (frame 0 and the last shot: the pencil on the same petal)
      const vIn = t < T.orrery[0] || t >= T.draw[0]
      if (vIn) {
        const st = venusState(t)
        const drawing = t < T.bars[1] || t >= T.h6
        const vx = VEN0.x, vy = VEN0.y
        const k = (t < T.orrery[0] ? 1 - prog(t, T.orrery[0] - 0.3, T.orrery[0]) : pop01(t, T.draw[0], 0.4, 1.8)) * (t >= T.archive[0] && t < T.archive[1] ? 0 : 1) * ok
        const kk = t >= T.archive[1] ? pop01(t, T.archive[1], 0.4, 1.8) * ok : k
        if (kk > 0.01) {
          const r = drawVenus(x, vx, vy, VEN0.size, t, { ...st, morning: 1, retro: 0, pop: kk, hops: VEN_HOPS, seed: 5 })
          // the pencil: on the petal while drawing; tucked under her arm otherwise
          const [tx, ty] = PTS[Math.floor(N_PTS * PETAL0)]
          const wig = drawing ? Math.sin(t * 9) * 5 : 0
          if (drawing) pencil(lerp(r.x - 80, tx + 120, 0.5) + wig, lerp(r.y, ty, 0.5) + wig, 0.62, kk)
          else pencil(r.x - 110, r.y + 40, -0.4, kk)
        }
      }
      bars(t)
      titleCard(t)
      lowerThird(t, T.lt1, 'Venus retrograde', 'ABOUT EVERY 1½ YEARS · ABOUT 6 WEEKS')
      lowerThird(t, T.lt2, 'The pentagram of Venus', '5 LOOPS · ABOUT 8 YEARS · SEEN FROM EARTH')
      lowerThird(t, T.lt3, 'Venus tablet of Ammisaduqa', 'BABYLON · HER RISINGS AND SETTINGS', SEPIA)
      if (t > T.bars[1] && t < T.out[1]) genreBug(x, t, { text: 'DOCUMENTARY', x: 70, y: 534, color: ROSE, size: 24 })
      // the documentary's closing credits, under the finished rose
      const ck = ease.outCubic(prog(t, T.close + 0.3, T.close + 1.0)) * outK(t, T.out)
      if (ck > 0.01) {
        x.save(); x.globalAlpha = ck
        const rows = [['DRAWN BY', 'VENUS, OVER ABOUT 8 YEARS'], ['WATCHED BY', 'THE BABYLONIANS, AND YOU'], ['NARRATED BY', 'THE STARS']]
        rows.forEach(([a, b], i) => { mono(a, 520, 1560 + i * 64 + (1 - ck) * 20, 24, rgba(BONE, 0.6), { align: 'right', ls: 3 }); mono(b, 548, 1560 + i * 64 + (1 - ck) * 20, 24, i === 0 ? ROSE : BONE, { align: 'left', ls: 2 }) })
        x.restore()
      }
      drawDayChip(x, t, { day: 39, phase: 'morning' })
      box.update(t)
      hook.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidate: 29.0, the archive insert out → back to Venus and her finished rose (the only one, so it plays).
const CUTS = [{ t: T.archive[1], kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S8 E22' }), cardCuts(CUTS)]

// ── sound (pop / pluck / bell are moved into the film's key by the engine)
const NOTE = [554.37, 622.25, 698.46, 830.61, 932.33, 1108.73, 1244.51]
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...hookCues(0, { key: KEY }),
  ['whoosh', T.bars[0], 0.5, 0.035], ['bell', T.title + 0.1, 1108.73, 0.05, 2.6, 0], ['bell', T.title + 0.5, 1661.22, 0.03, 2.2, 0.2],
  ['pop', T.open, 698.46, 0.04, 0], ['pop', T.open + 0.06, 932.33, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [NARR]: 784, [VEN]: 1046.5 } }),
  ['whoosh', T.lt1[0], 0.35, 0.025],
  ...wordPops(T.h2, 1, 0.09, 0, 0.026), ['pop', T.h2Land, 1108.73, 0.045, 0],
  ['pluck', T.conj - 0.05, 1244.51, 0.045, 0.8, 0], ['bell', T.conj, 1661.22, 0.035, 1.8, 0],
  ['tick', T.mars[0] + 1.4, 0.012],
  ...wordPops(T.h3, 3, 0.09, 1, 0.026), ['pop', T.h3Land, 1244.51, 0.045, 0],
  ['riser', T.draw[0], T.draw[1], 0.05], ['glitter', T.draw[0], T.draw[0] + 0.6],
  ...LOOPS.map((lt, i) => ['pluck', r3(lt), NOTE[(i * 2) % NOTE.length], 0.05, 0.7, (i - 2) * 0.2]),
  ...LOOPS.map((lt, i) => ['tick', r3(lt + 0.02), 0.03]),
  ['tick', T.comet + 0.8, 0.012],
  ['bell', T.bloom, 1108.73, 0.06, 3, 0], ['bell', T.bloom + 0.12, 1396.91, 0.045, 3, -0.2], ['bell', T.bloom + 0.24, 1661.22, 0.04, 3, 0.2], ['glitter', T.bloom, T.bloom + 1.2],
  ...wordPops(T.h4, 1, 0.09, 2, 0.026), ['pop', T.h4Land, 1244.51, 0.045, 0],
  ['whoosh', T.archive[0], 0.5, 0.035], ['tick', T.ghost + 0.05, 0.014],
  ...wordPops(T.h5, 1, 0.09, 3, 0.026), ['pop', T.h5Land, 1108.73, 0.045, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 698.46, 0.03, 0],
  ...wordPops(T.h6, 5, 0.08, 0, 0.026), ['pop', T.h6Land, 1396.91, 0.05, 0], ['pluck', T.h6Land, 1108.73, 0.045, 0.8, 0], ['glitter', T.h6Land, T.h6Land + 0.6],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
