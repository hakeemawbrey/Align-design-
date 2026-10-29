// st8airport (45 s vertical Align ad, Star Talk season 8 "EX RETROGRADE", S8 E23, the rom-com airport sprint) · story
// 0–40.6, then the shared end card.
//   "Mars is running through the *airport.*"  Every rom-com's last act, played in reverse: Mars (Venus's ex) sprints
//   through the terminal with flowers to win her back at the gate. Venus, glowing gold now (the Morning Star: after
//   inferior conjunction she rises before the Sun), hears him out kindly and chooses herself. They hug as friends; his two
//   real moons, Phobos and Deimos, cry. Her flight to the MORNING SKY takes off, and its light rises as the Morning Star.
//   0.00       frame 0: the hook card is up; Mars is mid-sprint, flowers out, the terminal streaking past, moons hyped.
//              The loop it opens: will he get her back?
//   2.35       the departures board slams in: ♀ VENUS · MORNING SKY · FINAL CALL (and the exes: the Comet DELAYED ~2061,
//              the Meteor CANCELLED, the Orbiter ON HOLD — the rewatch bait).  PA: "final call for Venus, to the
//              *morning sky.*"
//   5.60       "Airport *security.*"  BEEP. MARS: "it's the helmet. it's *always* the helmet."  The helmet goes in a tray.
//              (The ghost leans out from behind the x-ray machine at 7.3.)
//   9.05       "In *slow motion…*"  SLO-MO: he hurdles a luggage cart, letterboxed, moons tumbling. (The hidden Comet
//              crosses the dawn sky through the windows at 10.3.)  11.4: the crowd parts.
//   13.6       "The *gate.*"  MARS: "Venus, wait! i ran the *whole* terminal."  →  "come back? we could go back to
//              *before.*"  Venus, the Morning Star, smiles at him.
//   20.5       "The *Morning Star.*"  VENUS: "i loved you. i *mean* that."  →  "but this time, i'm choosing *me.*"  Gasp zoom
//              on Mars.  MARS: "…okay. you look *happy*, Ven."
//   28.5       "A *friendly* hug."  They hug as friends. Phobos and Deimos sob. Mars gives his flowers to the moons.
//   31.0       Venus boards; the board flips to DEPARTED; her plane rolls out and takes off into the dawn.
//   33.35      "I loved you. | I *choose* me."  Mars jogs along the windows (frame 0's sprint, rhymed) waving at the plane
//              as its light rises into the Morning Star. Everything out by 40.4.
// Real: after inferior conjunction Venus reappears in the morning sky (the Morning Star); Phobos and Deimos are Mars's
// two small moons; Halley's Comet is next due around 2061. Venus rules Taurus and Libra; Mars rules Aries.
// One canvas (sky + terminal + cast + board), DOM type, the dialogue boxes, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawBits, gaspZoom, drawGaspLines, gaspCues } from '../../st5cast.js'
import { VENUS, MARS, drawVenus, drawMars, drawComet, drawDayChip, hookCard, hookCues, genreBug, stingerCues } from '../../st8cast.js'

export const DURATION = 45
const KEY = 'Bb'
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const W = 1080
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', CYAN = '#7fdcff', MINT = '#7fe0b8', DAWN = '#ffb26b', RED = '#ff3d5a'
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"

// ── the timeline
const T = {
  hookOut: 2.3,
  board: 2.35, boardOut: [5.3, 5.55], open1: 2.5, pa: 2.65,
  sec: 5.6, hS: 5.7, hSLand: 6.05, hSOut: [8.75, 8.95], walkIn: [5.6, 6.05], beep: [6.1, 6.95], l2: 6.2, tray: 7.05, ghost: 7.3,
  walkThru: [7.55, 8.1], green: 8.1, helmetOn: 8.35, runOff: [8.6, 9.0], close1: 8.9,
  slo: 9.05, hM: 9.15, hMLand: 9.55, hMOut: [11.15, 11.35], leap: [9.4, 11.1], comet: 10.3, crowd: [11.4, 13.5],
  gate: 13.6, hG: 13.7, hGLand: 14.05, hGOut: [20.2, 20.4], arrive: [13.6, 14.2], open2: 14.6, l3: 14.8, l4: 17.6,
  hV: 20.5, hVLand: 20.95, hVOut: [28.2, 28.4], l5: 20.65, l6: 23.05, gasp: 24.6, l7: 25.95, close2: 28.3,
  hug: [28.5, 29.0], hugEnd: 30.6, hH: 28.55, hHLand: 28.95, hHOut: [32.9, 33.15], flowers: 29.6,
  board2: 31.0, boardIn: [30.7, 31.3], departed: 31.6, taxi: [31.4, 32.8], takeoff: [32.8, 36.2],
  last: 33.35, lastLand: 33.85, jog: 33.2, lastOut: [39.9, 40.3], out: [39.95, 40.4],
}
const PA = '✈ GATE ANNOUNCEMENT', MAR = MARS.tag, VEN = VENUS.tag
const LINES1 = [
  { t: T.pa, speaker: PA, text: 'final call for Venus, to the *morning sky.*', color: CYAN },
  { t: T.l2, speaker: MAR, text: 'it’s the helmet. it’s *always* the helmet.', color: MARS.tagColor },
]
const LINES2 = [
  { t: T.l3, speaker: MAR, text: 'Venus, wait! i ran the *whole* terminal.', color: MARS.tagColor },
  { t: T.l4, speaker: MAR, text: 'come back? we could go back to *before.*', color: MARS.tagColor },
  { t: T.l5, speaker: VEN, text: 'i loved you. i *mean* that.', color: VENUS.tagColor },
  { t: T.l6, speaker: VEN, text: 'but this time, i’m choosing *me.*', color: VENUS.tagColor },
  { t: T.l7, speaker: MAR, text: '…okay. you look *happy*, Ven.', color: MARS.tagColor },
]
const CPS = 28
const LT2 = lineTimes(LINES2, { cps: CPS })
const HOOK = 'Mars is running | through the *airport.*'

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

// ── layout
const WIN = { y0: 500, y1: 1120 }                 // the terminal's big windows
const FLOOR = 1430
const RUN = { x: 500, y: 1262, size: 300 }        // Mars mid-sprint
const ARCH = { x: 650, base: FLOOR, w: 300, h: 500 }
const XRAY = { x0: 40, x1: 360, y0: 1200, y1: 1340 }
const GATE = { mars: { x: 300, y: 1272 }, venus: { x: 770, y: 1262 }, desk: { x0: 900, x1: 1080 } }
export const GHOST = { at: T.ghost, x: XRAY.x1, y: 1270, where: 'leaning out from behind the x-ray machine at security' }
export const COMET = { at: T.comet }

const BOUQUET = ['.p.r.p.', 'pPprpPp', 'r.pPp.r', '.wgPgw.', '..ggg..', '...g...', '..kgk..', '..kkk..']
const BOUQUET_C = { p: '#ff8fb1', P: '#ff4f86', r: '#ff5a5a', w: '#fff3f8', g: '#5fc46a', k: '#c9a6ff' }
const CASE = ['..kkkk..', '.k....k.', 'PPPPPPPP', 'PppppppP', 'PppppppP', 'PPPPPPPP', 'PppppppP', 'PppppppP', 'PPPPPPPP', '.d....d.']
const CASE_C = { k: '#3a3352', P: '#ff86b8', p: '#ffb3d1', d: '#1b1236' }
const HELMET = ['..rrrr..', '.rRRRRr.', 'bbbbbbbb', 'bBBBBBBb', 'bB.BB.Bb', 'bB....Bb', '.b....b.']
const HELMET_C = { r: '#e0303a', R: '#ff5a5a', b: '#8a5a1f', B: '#c98a2f' }
const PLANE = [
  '......................ww.......',
  '.....................wwww......',
  '..wwwwwwwwwwwwwwwwwwwwwwwwwww..',
  '.wwbwbwbwbwbwbwbwbwbwbwbwwwwwp.',
  'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwp',
  '.ppppppppppppppppppppppppppppp.',
  '..........wwwwwwww.............',
  '...........wwwwww..............',
]
const PLANE_C = { w: '#eef2f8', b: '#5fa8d8', p: '#ff86b8' }

/** the camera's sideways scroll through the terminal (px), for the sprint shots */
function scrollAt(t) {
  // sprint 0–5.6 fast; slo-mo 9.05–11.4 slow; crowd 11.4–13.6 fast; the closing jog 33.2→ medium
  const seg = (a, b, v) => clamp(t - a, 0, b - a) * v
  return seg(0, T.sec, 1400) + seg(T.slo, T.crowd[0], 160) + seg(T.crowd[0], T.gate, 1500) + seg(T.jog, STORY_END, 520)
}
const isSprint = t => t < T.sec || (t >= T.slo && t < T.gate) || t >= T.jog
const runHops = (t0, t1, every) => { const out = []; for (let h = t0; h < t1; h += every) out.push(+h.toFixed(3)); return out }
const RUN_HOPS = [...runHops(0, T.sec, 0.28), ...runHops(T.crowd[0], T.gate, 0.26), ...runHops(T.jog, STORY_END, 0.36)]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 40px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const hook = hookCard(root, { text: HOOK, at: 0, out: T.hookOut, accentColor: DAWN })
  const HS = popText(root, 'Airport *security.*', { top: 236, size: 112, accentSize: 172, at: T.hS, gap: 0.09, accentColor: CYAN, wobble: true, late: 1, lateAt: T.hSLand, fit: true })
  const HM = popText(root, 'In *slow motion…*', { top: 236, size: 112, accentSize: 172, at: T.hM, gap: 0.09, accentColor: PINK, wobble: true, late: 2, lateAt: T.hMLand, fit: true })
  const HG = popText(root, 'The *gate.*', { top: 236, size: 124, accentSize: 190, at: T.hG, gap: 0.09, accentColor: DAWN, wobble: true, late: 1, lateAt: T.hGLand, fit: true })
  const HV = popText(root, 'The *Morning Star.*', { top: 236, size: 112, accentSize: 172, at: T.hV, gap: 0.09, accentColor: GOLD, wobble: true, late: 2, lateAt: T.hVLand, fit: true })
  const HH = popText(root, 'A *friendly* hug.', { top: 236, size: 112, accentSize: 172, at: T.hH, gap: 0.09, accentColor: PINK, wobble: true, late: 1, lateAt: T.hHLand, fit: true })
  const HL = popText(root, 'I loved you. | I *choose* me.', { top: 190, size: 116, accentSize: 184, at: T.last, gap: 0.09, accentColor: GOLD, wobble: true, late: 2, lateAt: T.lastLand, fit: true })
  const HEADS = [[HS, T.hSOut], [HM, T.hMOut], [HG, T.hGOut], [HV, T.hVOut], [HH, T.hHOut], [HL, T.lastOut]]
  const box1 = dialogueBox(root, { lines: LINES1, y: 1452, width: 960, height: 290, open: T.open1, close: T.close1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES2, y: 1452, width: 960, height: 290, open: T.open2, close: T.close2, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  const DSTARS = (() => { const r = rng(2308); return Array.from({ length: 30 }, () => [r() * W, WIN.y0 + 10 + r() * 300, r()]) })()
  const CROWD = ['aries', 'taurus', 'cancer', 'virgo', 'capricorn', 'pisces', 'sagittarius', 'gemini']
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

  // ── the terminal: dawn through tall windows, mullions, gate signs on pillars, a shiny floor. `sx` = scroll px.
  function terminal(t, sx, pillars = true) {
    const dawn = clamp(0.25 + t / 40)                              // the sky warms as the film goes on
    const g = x.createLinearGradient(0, WIN.y0, 0, WIN.y1)
    g.addColorStop(0, '#1a1240'); g.addColorStop(0.55, rgba('#6a3a8a', 0.6 + 0.4 * dawn)); g.addColorStop(1, rgba(DAWN, 0.35 + 0.6 * dawn))
    x.fillStyle = g; x.fillRect(0, WIN.y0, W, WIN.y1 - WIN.y0)
    for (const [sx0, sy, ph] of DSTARS) { const a = (1 - dawn) * (0.5 + 0.5 * Math.sin(t * 2 + ph * 9)); if (a > 0.15) drawPixelStar(x, sx0, sy, 8 + 8 * ph, 0, rgba(BONE, a)) }
    // the runway, the horizon glow
    x.fillStyle = '#2a1d44'; x.fillRect(0, WIN.y1 - 70, W, 70)
    x.fillStyle = rgba(DAWN, 0.5); x.fillRect(0, WIN.y1 - 72, W, 4)
    for (let k = 0; k < 14; k++) { const lx = ((k * 120 - sx * 0.35) % 1680 + 1680) % 1680 - 300; x.fillStyle = k % 2 ? '#ffd36e' : '#7fdcff'; x.fillRect(lx, WIN.y1 - 40, 10, 6) }
    // mullions (parallax with the camera)
    const off = ((-sx) % 180 + 180) % 180
    x.fillStyle = INK; for (let mx = off - 180; mx < W + 180; mx += 180) x.fillRect(mx, WIN.y0, 14, WIN.y1 - WIN.y0)
    x.fillRect(0, WIN.y0 - 10, W, 16); x.fillRect(0, WIN.y1 - 6, W, 16)
    // the wall above the windows and the floor
    x.fillStyle = '#2b2350'; x.fillRect(0, 430, W, WIN.y0 - 440)
    x.fillStyle = '#3a3166'; x.fillRect(0, WIN.y1 + 10, W, FLOOR - WIN.y1 - 10)
    const fg = x.createLinearGradient(0, FLOOR, 0, 1920); fg.addColorStop(0, '#4a3f7a'); fg.addColorStop(1, '#17102e')
    x.fillStyle = fg; x.fillRect(0, FLOOR, W, 1920 - FLOOR)
    x.fillStyle = INK; x.fillRect(0, FLOOR - 4, W, 8)
    // floor tiles + the dawn's reflection
    const toff = ((-sx * 1.2) % 160 + 160) % 160
    x.strokeStyle = 'rgba(255,255,255,0.07)'; x.lineWidth = 3
    for (let k = -2; k < 10; k++) { x.beginPath(); x.moveTo(toff + k * 160, FLOOR); x.lineTo(toff + k * 160 - 220, 1920); x.stroke() }
    for (let j = 0; j < 8; j++) { x.fillStyle = rgba(DAWN, 0.12 - j * 0.012); x.fillRect(0, FLOOR + 20 + j * 36, W, 10) }
    // a moving walkway along the bottom (its comb plates scroll with the camera, and it runs on its own)
    x.fillStyle = INK; x.fillRect(0, 1770, W, 110); x.fillStyle = '#2a2440'; x.fillRect(0, 1780, W, 90)
    const woff = ((-(sx * 1.6 + t * 90)) % 60 + 60) % 60
    for (let wx = woff - 60; wx < W; wx += 60) { x.fillStyle = '#3d3560'; x.fillRect(wx, 1786, 40, 78) }
    x.fillStyle = '#f7c948'; x.fillRect(0, 1772, W, 8); x.fillRect(0, 1864, W, 8)
    x.fillStyle = rgba(BONE, 0.55); x.fillRect(0, 1700, W, 10)
    // pillars with gate signs (scroll faster: closer to camera)
    const poff = ((-sx * 1.4) % 720 + 720) % 720
    for (let k = -1; k < 3 && pillars; k++) {
      const px = poff + k * 720 - 120, gnum = Math.floor((sx * 1.4 + 120 - k * 720) / 720) + 3
      x.fillStyle = INK; x.fillRect(px - 6, 430, 92, FLOOR - 430)
      x.fillStyle = '#4c4280'; x.fillRect(px, 430, 80, FLOOR - 430)
      x.fillStyle = '#5c5296'; x.fillRect(px, 430, 14, FLOOR - 430)
      x.fillStyle = INK; x.fillRect(px - 40, 620, 160, 70); x.fillStyle = '#f7c948'; x.fillRect(px - 34, 626, 148, 58)
      x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText(`GATE ${((gnum % 20) + 20) % 20 + 1}`, px + 40, 657)
    }
  }
  // the speed lines of a sprint
  function speedLines(t, k) {
    if (k <= 0) return
    const r = rng(Math.floor(t * 20))
    x.save(); x.globalAlpha = 0.5 * k
    for (let i = 0; i < 14; i++) { const yy = 520 + r() * 820, ll = 80 + r() * 260; x.fillStyle = r() > 0.5 ? BONE : rgba(DAWN, 1); x.fillRect(r() * W, yy, ll, 4) }
    x.restore()
  }
  function mars(t, mx, my, size, o = {}) {
    const r = drawMars(x, mx, my, size, t, { helmet: o.helmet ?? true, mood: o.mood ?? 'neutral', moons: true, moonMood: o.moonMood ?? 'hype', look: o.look ?? [1, 0], hops: o.hops ?? [], seed: 8, pop: o.pop ?? 1 })
    if (o.flowers) drawBits(x, BOUQUET, BOUQUET_C, Math.round(mx + size * 0.62), Math.round(my - size * 0.05 + Math.sin(t * 22) * (o.run ? 6 : 1)), Math.round(size / 26), { rot: o.run ? 0.35 + 0.1 * Math.sin(t * 22) : 0.1 })
    return r
  }
  // dust puffs at Mars's feet while running
  function dust(t, mx, my, every = 0.28, t0 = 0) {
    for (let i = 0; i < 4; i++) {
      const born = Math.floor((t - t0) / every - i) * every + t0, p = (t - born) / 0.6
      if (p < 0 || p > 1 || born < t0) continue
      x.fillStyle = rgba(BONE, 0.45 * (1 - p)); const s = 14 + p * 26
      x.fillRect(Math.round(mx - 90 - p * 140), Math.round(my + 100 - p * 20), s, s)
    }
  }

  // ── the departures board
  function board(t, at, out, departed = false) {
    const k = pop01(t, at, 0.34, 1.7) * outK(t, out)
    if (k <= 0.01 || t < at || t > out[1]) return
    const PW = 980, PH = 470, cx = 540, cy = 790
    x.save(); x.translate(cx, cy); x.scale(1, k); x.translate(-cx, -cy)
    x.fillStyle = INK; x.fillRect(cx - PW / 2 - 10, cy - PH / 2 - 10, PW + 20, PH + 20)
    x.fillStyle = '#100c1e'; x.fillRect(cx - PW / 2, cy - PH / 2, PW, PH)
    x.fillStyle = '#f7c948'; x.fillRect(cx - PW / 2, cy - PH / 2, PW, 62)
    x.font = `800 36px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('✈ DEPARTURES', cx - PW / 2 + 28, cy - PH / 2 + 32)
    const rows = [
      ['♀ VENUS', 'MORNING SKY', departed ? 'DEPARTED ✓' : 'FINAL CALL', departed ? MINT : RED, true],
      ['☄ COMET', '~2061', 'DELAYED', DAWN],
      ['✦ METEOR', '—', 'CANCELLED', '#8a84a8'],
      ['THE ORBITER', '—', 'ON HOLD', '#c9d6ff'],
    ]
    rows.forEach(([a, b, c, col, hot], i) => {
      const yy = cy - PH / 2 + 120 + i * 92
      x.fillStyle = i % 2 ? '#17122a' : '#1d1734'; x.fillRect(cx - PW / 2 + 16, yy - 38, PW - 32, 80)
      // split-flap letters settle in, row by row
      const settle = prog(t, at + 0.15 + i * 0.12, at + 0.5 + i * 0.12)
      const scramble = s => settle >= 1 ? s : s.split('').map((ch, j) => (ch === ' ' || j / s.length < settle) ? ch : 'ABCDEFGHJKMNPRSTVWXYZ0123456789'[(Math.floor(t * 30) + j * 7 + i) % 30]).join('')
      mono(scramble(a), cx - PW / 2 + 36, yy + 2, 32, BONE, { align: 'left', shadow: false })
      mono(scramble(b), cx - 60, yy + 2, 32, BONE, { align: 'left', shadow: false })
      const blink = hot && !departed ? (Math.floor(t * 3) % 2 ? 1 : 0.35) : 1
      x.globalAlpha = blink; mono(scramble(c), cx + PW / 2 - 36, yy + 2, 32, col, { align: 'right', shadow: false }); x.globalAlpha = 1
    })
    x.restore()
  }

  // ── security: the x-ray machine, the tray, the arch
  function security(t) {
    // x-ray machine + belt (left)
    const { x0, x1, y0, y1 } = XRAY
    x.fillStyle = INK; x.fillRect(x0 - 6, y0 - 6, x1 - x0 + 12, y1 - y0 + 12)
    x.fillStyle = '#8a84a8'; x.fillRect(x0, y0, x1 - x0, y1 - y0)
    x.fillStyle = '#1b1236'; x.fillRect(x0 + 60, y0 + 20, x1 - x0 - 120, y1 - y0 - 20)
    for (let k = 0; k < 8; k++) { x.fillStyle = k % 2 ? '#3a3352' : '#2a2440'; x.fillRect(x0 + 60 + k * 25, y0 + 20, 12, y1 - y0 - 20) }
    x.fillStyle = INK; x.fillRect(x0, y1, x1 - x0, 90); x.fillStyle = '#3a3352'; x.fillRect(x0 + 6, y1 + 6, x1 - x0 - 12, 20)
    // the arch
    const { x: ax, base, w, h } = ARCH
    x.fillStyle = INK; x.fillRect(ax - w / 2 - 8, base - h - 8, w + 16, 46); x.fillRect(ax - w / 2 - 8, base - h, 46, h); x.fillRect(ax + w / 2 - 38, base - h, 46, h)
    x.fillStyle = '#c9cfdb'; x.fillRect(ax - w / 2, base - h, w, 30); x.fillRect(ax - w / 2, base - h, 30, h); x.fillRect(ax + w / 2 - 30, base - h, 30, h)
    // its light: red while it beeps, green once he's through
    const beeping = t >= T.beep[0] && t < T.beep[1], green = t >= T.green
    const lc = beeping ? (Math.floor(t * 8) % 2 ? RED : '#7a1a28') : green ? MINT : '#4a4466'
    x.fillStyle = lc; x.fillRect(ax - 40, base - h - 50, 80, 30)
    if (beeping) { glow(ax, base - h - 35, 220, RED, 0.9); x.save(); x.translate(ax, base - h - 110); x.rotate(-0.06); x.scale(1 + 0.08 * Math.sin(t * 30), 1); mono('BEEP!', 0, 0, 72, RED); x.restore() }
    if (green && t < T.runOff[1]) glow(ax, base - h - 35, 180, MINT, 0.7)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, 100, { alpha: 0.4 })
      const ok = popOut(t, T.out)
      const sx = isSprint(t) ? scrollAt(t) : (t < T.gate ? 0 : 0)
      const zG = gaspZoom(t, { at: T.gasp, dur: 1.3, x: GATE.mars.x, y: GATE.mars.y, amount: 0.35, follow: 0.7, cy: 1080 })
      x.save(); zG.apply(x)
      terminal(t, sx, !(t >= T.gate && t < T.jog))
      // the hidden Comet: one tiny pass through the dawn windows during the slo-mo
      const cp = prog(t, T.comet, T.comet + 1.8)
      drawComet(x, lerp(1140, -60, cp), lerp(560, 640, cp), 30, t, { aura: false, exPin: false, tail: 90, mood: 'happy', sunDir: [-0.2, 1], alpha: cp > 0 && cp < 1 ? 0.85 : 0 })

      if (t < T.sec) {
        // ── the sprint (frame 0)
        speedLines(t, 1)
        dust(t, RUN.x, RUN.y)
        x.save(); x.translate(RUN.x, RUN.y); x.rotate(0.12); x.translate(-RUN.x, -RUN.y)
        mars(t, RUN.x, RUN.y + Math.abs(Math.sin(t * 11)) * -14, RUN.size, { mood: 'wide', flowers: true, run: true, look: [1, 0], hops: RUN_HOPS })
        x.restore()
      } else if (t < T.slo) {
        // ── security
        security(t)
        const walk = t < T.walkIn[1] ? lerp(120, ARCH.x - 190, ease.outCubic(prog(t, ...T.walkIn))) : t < T.walkThru[0] ? ARCH.x - 190 : t < T.runOff[0] ? lerp(ARCH.x - 190, ARCH.x + 250, ease.inOutCubic(prog(t, ...T.walkThru))) : lerp(ARCH.x + 250, 1300, ease.inCubic(prog(t, ...T.runOff)))
        const helmetOn = t < T.tray || t >= T.helmetOn
        const mood = t < T.beep[0] ? 'neutral' : t < T.beep[1] ? 'wide' : t < T.green ? 'sad' : 'happy'
        mars(t, walk, 1262, 280, { helmet: helmetOn, mood, flowers: true, moonMood: t < T.beep[1] && t > T.beep[0] ? 'cry' : 'hype', hops: [...talkHops(LINES1, MAR, { cps: CPS }), T.green] })
        // the helmet in its grey tray, riding the belt
        if (t >= T.tray && t < T.helmetOn) {
          const tx = lerp(ARCH.x - 230, XRAY.x0 + 200, ease.inOutCubic(prog(t, T.tray, T.tray + 0.7)))
          x.fillStyle = INK; x.fillRect(tx - 66, XRAY.y1 - 46, 132, 46); x.fillStyle = '#8a84a8'; x.fillRect(tx - 60, XRAY.y1 - 40, 120, 34)
          drawBits(x, HELMET, HELMET_C, tx, XRAY.y1 - 70, 9)
        }
        drawGhostCameo(x, t, { x: XRAY.x1 + 6, y: GHOST.y, at: GHOST.at, dur: 1.4, from: 'left', cell: 3 })
      } else if (t < T.gate) {
        // ── slo-mo hurdle over a luggage cart, then the crowd parts
        speedLines(t, t >= T.crowd[0] ? 1 : 0.2)
        if (t < T.crowd[0]) {
          const cartX = lerp(1040, 600, prog(t, T.slo, T.crowd[0]))
          x.fillStyle = INK; x.fillRect(cartX - 140, 1270, 280, 120); x.fillStyle = '#c9cfdb'; x.fillRect(cartX - 132, 1278, 264, 14)
          for (const [bx, bw, bh, col] of [[-110, 90, 70, '#ff86b8'], [-14, 110, 92, '#7fdcff'], [100, 60, 54, '#f7c948']]) { x.fillStyle = INK; x.fillRect(cartX + bx - 4, 1274 - bh - 4, bw + 8, bh + 8); x.fillStyle = col; x.fillRect(cartX + bx, 1274 - bh, bw, bh) }
          x.fillStyle = INK; for (const wx of [-100, 100]) { x.beginPath(); x.arc(cartX + wx, 1400, 22, 0, Math.PI * 2); x.fill() }
          const lp = prog(t, ...T.leap), arc = Math.sin(Math.PI * lp)
          const mx = lerp(240, 780, lp), my = 1262 - arc * 320
          x.save(); x.translate(mx, my); x.rotate(-0.25 + 0.5 * lp); x.translate(-mx, -my)
          mars(t, mx, my, 290, { mood: 'wide', flowers: true, run: true, moonMood: 'hype' })
          x.restore()
        } else {
          // the crowd: travellers part like a wave as Mars streaks through
          const p = prog(t, ...T.crowd)
          CROWD.forEach((id, i) => {
            const st = signStar(id), cx0 = 120 + i * 120 + 60 * Math.sin(i), side = i % 2 ? 1 : -1
            const part = ease.outBack(clamp(p * 3 - i * 0.18)) * 120 * side
            drawStarChar(x, cx0, 1300 + part * 0.6 - (i % 3) * 30, 130, t, { color: st.color, glyph: null, mood: 'wide', look: [-1, 0], seed: 30 + i, blink: false })
            if (i % 3 === 0) drawBits(x, CASE, CASE_C, cx0 + 64, 1350 + part * 0.6, 7)
          })
          dust(t, RUN.x, RUN.y, 0.26, T.crowd[0])
          x.save(); x.translate(RUN.x, RUN.y); x.rotate(0.14); x.translate(-RUN.x, -RUN.y)
          mars(t, RUN.x, RUN.y + Math.abs(Math.sin(t * 12)) * -14, RUN.size, { mood: 'wide', flowers: true, run: true, hops: RUN_HOPS })
          x.restore()
        }
      } else if (t < T.jog) {
        // ── the gate
        const { desk } = GATE
        x.fillStyle = INK; x.fillRect(desk.x0, 1150, desk.x1 - desk.x0, 290); x.fillStyle = '#4c4280'; x.fillRect(desk.x0 + 8, 1158, desk.x1 - desk.x0, 274)
        x.fillStyle = '#f7c948'; x.fillRect(desk.x0 + 8, 1158, desk.x1 - desk.x0, 16)
        x.fillStyle = INK; x.fillRect(820, 470, 260, 96); x.fillStyle = '#f7c948'; x.fillRect(826, 476, 254, 84)
        x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('GATE ♀', 952, 520)
        // the plane, parked outside; then it taxis and takes off into the dawn
        const tp = prog(t, ...T.taxi), op = prog(t, ...T.takeoff)
        const px = 560 + ease.inQuad(tp) * 260 + ease.inCubic(op) * 700, py = WIN.y1 - 130 - ease.inQuad(op) * 380, ps = 11 * (1 - 0.5 * op)
        drawBits(x, PLANE, PLANE_C, px, py, ps)
        const hugP = ease.inOutCubic(prog(t, ...T.hug)), unhug = ease.inOutCubic(prog(t, T.hugEnd, T.hugEnd + 0.5))
        const board2 = prog(t, T.board2, T.board2 + 1.0)
        // Venus: at the gate, then the hug, then she walks to the jet bridge
        const vx = lerp(lerp(GATE.venus.x, 630, hugP), 1300, ease.inCubic(board2)), vy = GATE.venus.y
        const mx = lerp(lerp(1300, GATE.mars.x, ease.outCubic(prog(t, ...T.arrive))), 440, hugP * (1 - unhug * 0.4))
        const vMood = t < T.l5 ? 'happy' : t < LT2[2].done + 0.4 ? 'sparkle' : t < T.l7 ? 'neutral' : t < T.hug[0] ? 'happy' : t < T.hugEnd ? 'heart' : 'happy'
        const mMood = t < T.l5 ? 'wide' : t < T.gasp ? 'neutral' : t < T.l7 ? 'sad' : t < T.hug[0] ? 'neutral' : t < T.hugEnd ? 'happy' : 'happy'
        const moonMood = t < T.gasp ? 'hype' : t < T.hug[0] ? 'neutral' : 'cry'
        const flowersOn = t < T.flowers
        mars(t, mx, GATE.mars.y, 290, { mood: mMood, flowers: flowersOn, moonMood, look: [1, 0], hops: [T.arrive[1], ...talkHops(LINES2, MAR, { cps: CPS }), T.hug[1]] })
        if (t < T.board2 + 1.0) {
          drawBits(x, CASE, CASE_C, vx + 150, vy + 90, 11)
          drawVenus(x, vx, vy, 300, t, { mood: vMood, look: [-1, 0], morning: 1, retro: 0, hops: [...talkHops(LINES2, VEN, { cps: CPS }), T.hug[1]], seed: 5 })
        }
        // he hands the flowers to his moons (who are sobbing)
        if (!flowersOn) drawBits(x, BOUQUET, BOUQUET_C, mx - 150, GATE.mars.y - 150 + Math.sin(t * 3) * 8, 7, { rot: -0.3 })
        // hearts of friendship during the hug (pink/gold, small)
        if (t > T.hug[1] && t < T.hugEnd) for (let i = 0; i < 6; i++) { const p = ((t - T.hug[1]) * 0.8 + i / 6) % 1; drawPixelStar(x, 535 + Math.sin(i * 2.1) * 140, 1080 - p * 260, 20 + 10 * (1 - p), 1, i % 2 ? GOLD : PINK) }
        // the gate's status strip: BOARDING → DEPARTED ✓
        const dep = t >= T.departed
        x.fillStyle = INK; x.fillRect(820, 566, 260, 50); x.fillStyle = dep ? '#123a2c' : '#3a1220'; x.fillRect(826, 566, 254, 44)
        mono(dep ? 'DEPARTED ✓' : 'BOARDING', 952, 588, 26, dep ? MINT : (Math.floor(t * 3) % 2 ? RED : '#ff9aa8'), { shadow: false })
      } else {
        // ── the closing jog along the windows, waving at the plane as its light becomes the Morning Star
        const op = prog(t, ...T.takeoff), star = prog(t, T.takeoff[1] - 0.4, T.takeoff[1] + 0.6)
        const px = lerp(700, 860, op), py = lerp(820, 560, op)
        if (star < 1) drawBits(x, PLANE, PLANE_C, px, py, 5 * (1 - 0.6 * op), { alpha: 1 - star })
        glow(860, 560, 220, GOLD, 0.4 + 0.6 * star)
        drawPixelStar(x, 860, 560, 40 + 40 * star, 2, '#ffe9a8')
        if (star > 0.5) mono('★ MORNING STAR', 860, 640, 24, GOLD)
        speedLines(t, 0.5)
        dust(t, RUN.x, RUN.y, 0.36, T.jog)
        mars(t, RUN.x, RUN.y + Math.abs(Math.sin(t * 8)) * -10, RUN.size, { mood: 'happy', flowers: false, moonMood: 'cry', look: [1, -1], hops: RUN_HOPS, pop: ok })
        // a waving hand-ish sparkle over his head
        drawPixelStar(x, RUN.x + 150 + Math.sin(t * 12) * 20, RUN.y - 210, 34, 1, GOLD)
      }
      x.restore()
      // the departures board (first call)
      board(t, T.board, T.boardOut)
      // the slo-mo letterbox + bug
      const lb = t >= T.slo && t < T.crowd[0] ? ease.outCubic(prog(t, T.slo, T.slo + 0.3)) * (1 - prog(t, T.crowd[0] - 0.2, T.crowd[0])) : 0
      if (lb > 0) { x.fillStyle = 'rgba(2,1,6,0.95)'; x.fillRect(0, 430, W, 70 * lb); x.fillRect(0, 1370 - 70 * lb, W, 70 * lb); genreBug(x, t, { text: 'SLO-MO', x: 70, y: 534, color: PINK }) }
      drawGaspLines(x, t, { at: T.gasp, dur: 1.3, x: GATE.mars.x, y: GATE.mars.y, follow: 0.7, cy: 1080, color: MARS.tagColor })
      drawDayChip(x, t, { day: 41, phase: 'morning' })
      box1.update(t); box2.update(t)
      hook.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidate: 13.55, the sprint → the gate (the only one, so it plays).
const CUTS = [{ t: 13.55, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S8 E23' }), cardCuts(CUTS)]

// ── sound (pop / pluck / bell are moved into the film's key by the engine)
const NOTE = [466.16, 523.25, 587.33, 698.46, 783.99, 932.33, 1046.5]
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...hookCues(0, { key: KEY }),
  ...RUN_HOPS.filter(h => h < STORY_END - 1).map(h => ['tick', h, 0.025]),
  ['whoosh', T.board - 0.1, 0.4, 0.04], ...Array.from({ length: 16 }, (_, i) => ['tick', r3(T.board + 0.15 + i * 0.04), 0.02]),
  ['bell', T.pa - 0.15, 783.99, 0.05, 1.2, 0], ['bell', T.pa, 622.25, 0.05, 1.4, 0],
  ['pop', T.open1, 698.46, 0.04, 0],
  ...talkCues(LINES1, { cps: CPS, pitch: { [PA]: 880, [MAR]: 330 } }),
  ...wordPops(T.hS, 1, 0.09, 0, 0.026), ['pop', T.hSLand, 932.33, 0.045, 0],
  ...Array.from({ length: 6 }, (_, i) => ['chip', r3(T.beep[0] + i * 0.14), 1760, 0.08, { wave: 'square', gain: 0.03 }]),
  ['whoosh', T.tray, 0.4, 0.03], ['tick', T.ghost + 0.05, 0.014],
  ['chip', T.green, 1318.51, 0.1, { wave: 'square', gain: 0.02 }], ['chip', T.green + 0.1, 1760, 0.12, { wave: 'square', gain: 0.02 }],
  ['whoosh', T.runOff[0], 0.4, 0.04],
  ['pop', T.close1, 880, 0.03, 0],
  ['boom', T.slo, 0.25], ['whoosh', T.slo, 1.6, 0.05],
  ...wordPops(T.hM, 1, 0.09, 1, 0.026), ['pop', T.hMLand, 1046.5, 0.045, 0],
  ['tick', T.comet + 0.9, 0.012],
  ['crash', T.leap[1] - 0.05, { gain: 0.05, len: 1.4 }], ['boom', T.leap[1], 0.2],
  ['whoosh', T.crowd[0], 0.5, 0.05], ...[0, 1, 2, 3].map(i => ['pop', r3(T.crowd[0] + 0.2 + i * 0.15), NOTE[i + 2], 0.025, i % 2 ? 0.4 : -0.4]),
  ...wordPops(T.hG, 1, 0.09, 2, 0.026), ['pop', T.hGLand, 1046.5, 0.05, 0], ['pluck', T.hGLand, 932.33, 0.045, 0.7, 0],
  ['pop', T.open2, 698.46, 0.04, 0],
  ...talkCues(LINES2, { cps: CPS, pitch: { [MAR]: 330, [VEN]: 1046.5 } }),
  ...wordPops(T.hV, 2, 0.09, 3, 0.026), ['pop', T.hVLand, 1174.66, 0.05, 0], ['bell', T.hVLand, 1396.91, 0.04, 2.2, 0],
  ...gaspCues(T.gasp, { key: KEY }),
  ['pop', T.close2, 880, 0.03, 0],
  ...wordPops(T.hH, 2, 0.09, 1, 0.026), ['pop', T.hHLand, 1046.5, 0.05, 0],
  ['glitter', T.hug[1], T.hugEnd], ['bell', T.hug[1], 1174.66, 0.04, 2, -0.2], ['bell', T.hug[1] + 0.2, 1396.91, 0.035, 2, 0.2],
  ['pop', T.flowers, 783.99, 0.04, -0.3],
  ...Array.from({ length: 12 }, (_, i) => ['tick', r3(T.boardIn[0] + 0.15 + i * 0.04), 0.018]), ['pluck', T.departed, 1174.66, 0.04, 0.5, 0],
  ['riser', T.takeoff[0] - 0.4, T.takeoff[0] + 1.2, 0.08], ['whoosh', T.takeoff[0], 1.4, 0.05],
  ...wordPops(T.last, 4, 0.09, 0, 0.026), ['pop', T.lastLand, 1174.66, 0.05, 0], ['pluck', T.lastLand, 932.33, 0.045, 0.8, 0],
  ['bell', T.takeoff[1] + 0.1, 1864.66, 0.05, 2.6, 0], ['glitter', T.takeoff[1], T.takeoff[1] + 0.8],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
