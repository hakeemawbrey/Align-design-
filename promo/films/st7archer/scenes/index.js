// st7archer (45 s vertical Align ad, Star Talk season 7 "SIGN TO SIGN", EP 08) · story 0–40.6, then the shared end card.
//   Sagittarius × Scorpio: a desert standoff at dusk that turns into a heart-to-heart. The real hook: in the sky the
//   Archer's arrow (the Teapot's spout, tipped by Alnasl, "the point") points west toward Antares, the red heart of the
//   Scorpion, whose name means "rival of Mars". Myths vary; one story says the Archer is there to guard Orion from the
//   Scorpion (they sit on opposite sides of the sky).
//   0.00–2.60  opener: ★ SIGN TO SIGN ★ · ♐ × ♏ · "a standoff at sundown"
//   2.7        "A *standoff.*"  SAG (left) with a drawn pixel bow, SCORPIO (right) with its tail up, a cactus between.
//   ~12        "Look *up.*"  The dusk sky draws the real Sagittarius (the Teapot) and Scorpius, then the arrow line from
//              Alnasl to Antares. SKY NOTEs (the arrow; the Orion story, attributed).
//   ~25        "Guards | *down.*"  Why the tail is always up and the bow always drawn. The bow lowers, the tail drops,
//              they sit closer. Ghost behind the cactus.
//   ~37        SCORPIO: "Lower the bow. | *Talk.*"  Plain sky at 40.6, end card.
// One canvas (sky + seed constellation + desert + cast), DOM type, grain on top. Pure f(t). Dialogue kit: ../s7talk.js.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawBits } from '../../st5cast.js'
import { seq, chatThread, skyNote, opener, lastLine, drawStarMap, drawTalkMarks, speaking, threadCues, noteCues, openerCues, lastLineCues, OPENER_LEN, lite } from '../s7talk.js'

export const DURATION = 45
const KEY = 'F'
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', RED = '#ff5a5a'
const SAG = signStar('sagittarius'), SCO = signStar('scorpio')
const CAST = {
  SAG: { tag: '♐ SAGITTARIUS', color: SAG.color, side: 'L', pitch: 659.25 },
  SCORPIO: { tag: '♏ SCORPIO', color: SCO.color, side: 'R', pitch: 440 },
}
const CPS = 28
const A = (x, o = {}) => ({ s: 'SAG', x, ...o }), Z = (x, o = {}) => ({ s: 'SCORPIO', x, ...o })
const SCRIPT = seq(3.05, [
  A('don’t move. i was told to aim at your *heart.*'),
  Z('people usually *do.*', { hold: 1.6 }),
  { mark: 'map' },
  A('told by the sky. my arrow points at *Antares.*', { pre: 0.5, hold: 2.6 }),
  Z('my heart. the red one. “rival of *Mars.*”', { hold: 1.8 }),
  A('one story says i keep you off *Orion.*', { hold: 2.2 }),
  Z('i stung *one* hunter. one.', { hold: 1.4 }),
  { mark: 'real' },
  A('so why is your tail always *up?*', { pre: 0.5 }),
  Z('why is your bow always *drawn?*', { hold: 1.4 }),
  A('…in case someone gets too *close.*', { hold: 1.4 }),
  { mark: 'lower' },
  Z('yeah. *same.* it’s exhausting.', { hold: 1.4 }),
  A('i aim first so nobody aims at *me.*', { hold: 1.5 }),
], { cast: CAST, cps: CPS, hold: 1.6 })
const LINES = SCRIPT.lines, M = SCRIPT.marks
const T = {
  open: 0, h1: 2.7, h1Land: 2.95,
  map: M.map, h2: M.map - 0.05, h2Land: M.map + 0.2, chart: M.map + 0.2,
  arrow: LINES[2].t + 0.9,
  real: M.real, h3: M.real - 0.05, h3Land: M.real + 0.25,
  lower: M.lower, close: SCRIPT.end - 0.1,
}
T.h1Out = [T.map - 0.4, T.map - 0.2]
T.h2Out = [T.map + 1.0, T.map + 1.2]
T.note1 = T.map + 1.3; T.note1Out = [LINES[4].t - 0.3, LINES[4].t - 0.05]
T.note2 = LINES[4].t + 0.2; T.note2Out = [T.real - 0.3, T.real - 0.05]
T.h3Out = [T.real + 4.6, T.real + 4.8]
T.last = SCRIPT.end + 0.2; T.out = [STORY_END - 0.45, STORY_END - 0.05]
T.ghost = LINES[9].t + 0.4
export const BEATS = T
const LAST = { text: 'Lower the bow. | *Talk.*' }
const NOTE1 = 'In the sky, the Archer’s arrow points | toward *Antares,* the Scorpion’s heart.'
const NOTE2 = 'Myths vary. One story says the Archer | is there *to guard Orion* from the Scorpion.'

// ── the desert at dusk
const GROUND = 1330
const POS = { SAG: { x: 280, y: 1200 }, SCORPIO: { x: 800, y: 1200 } }
const CACTUS = { x: 540, y: GROUND }
export const GHOST = { at: T.ghost, x: CACTUS.x + 30, y: 1170, where: 'leaning out from behind the cactus between Sagittarius and Scorpio' }
// Sagittarius (the Teapot) and Scorpius, real positions (RA h, Dec °, mag), east to the left
const RAW = [
  // Sagittarius 0–7: Alnasl γ, Kaus Media δ, Kaus Australis ε, Kaus Borealis λ, φ, Nunki σ, τ, Ascella ζ
  [18.097, -30.42, 3.0], [18.350, -29.83, 2.7], [18.403, -34.38, 1.85], [18.466, -25.42, 2.8], [18.761, -26.99, 3.2], [18.921, -26.30, 2.05], [19.116, -27.67, 3.3], [19.043, -29.88, 2.6],
  // Scorpius 8–22: Antares, σ, τ, Dschubba δ, Acrab β, π, ε, μ, ζ, η, Sargas θ, ι, κ, Shaula λ, Lesath υ
  [16.490, -26.43, 1.0], [16.353, -25.59, 2.9], [16.598, -28.22, 2.8], [16.006, -22.62, 2.3], [16.091, -19.81, 2.6], [15.981, -26.11, 2.9],
  [16.836, -34.29, 2.3], [16.864, -38.05, 3.0], [16.909, -42.36, 3.6], [17.203, -43.24, 3.3], [17.622, -43.00, 1.9], [17.793, -40.13, 3.0], [17.708, -39.03, 2.4], [17.560, -37.10, 1.6], [17.513, -37.30, 2.7],
]
const proj = (() => { const ra0 = 17.56 * 15, de0 = -31.2, c = Math.cos(31.2 * Math.PI / 180), k = 23, cx = 540, cy = 690; return ([ra, de]) => ({ x: Math.round(cx - (ra * 15 - ra0) * c * k), y: Math.round(cy - (de - de0) * k) }) })()
const MAP = RAW.map(r => ({ ...proj(r), mag: r[2] }))
const SAG_LINKS = [[0, 1], [0, 2], [1, 2], [1, 3], [3, 4], [1, 4], [4, 7], [7, 2], [4, 5], [5, 6], [6, 7]]
const SCO_LINKS = [[12, 11], [11, 13], [11, 9], [9, 8], [8, 10], [10, 14], [14, 15], [15, 16], [16, 17], [17, 18], [18, 19], [19, 20], [20, 21], [21, 22]]

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const HOPS = { SAG: [OPENER_LEN + 0.3, ...talkHops(LINES, CAST.SAG.tag, { cps: CPS })], SCORPIO: [OPENER_LEN + 0.45, ...talkHops(LINES, CAST.SCORPIO.tag, { cps: CPS }), T.last + 0.1, T.last + 0.6, T.last + 1.1] }
const lineAt = t => { let c = null; for (const l of LINES) if (t >= l.t) c = l; return c }
function moods(t) {
  const li = LINES.indexOf(lineAt(t))
  const up = [0, -1]
  const tb = [   // [sag, scorpio]
    [{ mood: 'squint', look: [1, 0] }, { mood: 'squint', look: [-1, 0] }],
    [{ mood: 'squint', look: [1, 0] }, { mood: 'neutral', look: [-1, 0] }],
    [{ mood: 'sparkle', look: up }, { mood: 'wide', look: up, blink: false }],
    [{ mood: 'wide', look: up }, { mood: 'neutral', look: up }],
    [{ mood: 'happy', look: [1, 0] }, { mood: 'squint', look: [-1, 0] }],
    [{ mood: 'neutral', look: [1, 0] }, { mood: 'eyeroll' }],
    [{ mood: 'neutral', look: [1, 0] }, { mood: 'wide', look: [-1, 0] }],
    [{ mood: 'wide', look: [1, 0] }, { mood: 'squint', look: [-1, 0] }],
    [{ mood: 'neutral', look: [0, 1] }, { mood: 'neutral', look: [-1, 0] }],
    [{ mood: 'neutral', look: [1, 0] }, { mood: 'happy', look: [-1, 0] }],
    [{ mood: 'happy', look: [1, 0] }, { mood: 'heart' }],
  ]
  if (t < LINES[0].t) return [{ mood: 'squint', look: [1, 0] }, { mood: 'squint', look: [-1, 0] }]
  if (t >= T.last) return [{ mood: 'sparkle', look: [1, 0] }, { mood: 'happy', look: [-1, 0] }]
  return tb[li] || tb[tb.length - 1]
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "600 36px Inter", "italic 500 160px 'EB Garamond'", "700 42px 'Space Mono'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const H1 = popText(root, 'A | *standoff.*', { top: 196, size: 112, accentSize: 180, at: T.h1, gap: 0.08, accentColor: lite(SAG.color, 0.2), wobble: true, late: 1, lateAt: T.h1Land, fit: true })
  const H2 = popText(root, 'Look *up.*', { top: 196, size: 112, accentSize: 176, at: T.h2, gap: 0.08, accentColor: GOLD, wobble: true, fit: true })
  const H3 = popText(root, 'Guards | *down.*', { top: 196, size: 112, accentSize: 180, at: T.h3, gap: 0.08, accentColor: lite(SCO.color, 0.25), wobble: true, late: 1, lateAt: T.h3Land, fit: true })
  const HEADS = [[H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const open = opener(root, { at: T.open, cast: [{ glyph: '♐', name: 'Sagittarius', color: SAG.color }, { glyph: '♏', name: 'Scorpio', color: SCO.color }], place: 'a standoff at sundown' })
  const thread = chatThread(root, { lines: LINES, cast: CAST, close: T.close, cps: CPS })
  const notes = [[NOTE1, T.note1, T.note1Out], [NOTE2, T.note2, T.note2Out]].map(([text, at, out]) => skyNote(root, { at, out, text, top: 176, width: 920 }))
  const last = lastLine(root, { at: T.last, out: T.out, text: LAST.text, tag: CAST.SCORPIO.tag, color: SCO.color, top: 1450, size: 108, accentSize: 190 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)
  const R = (c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }

  function skyMap(t) {
    const k = prog(t, T.chart - 0.2, T.chart + 0.4) * (1 - 0.55 * prog(t, T.real, T.real + 1.0))
    if (k <= 0) return
    const sc = lite(SAG.color, 0.25), zc = lite(SCO.color, 0.25)
    drawStarMap(x, t, { stars: MAP.map((s, i) => ({ ...s, color: i === 8 ? RED : i < 8 ? sc : zc })), links: [...SAG_LINKS.map(l => [...l, sc]), ...SCO_LINKS.map(l => [...l, zc])], at: T.chart, dur: 2.0, k,
      labels: [{ i: 8, text: 'ANTARES', sub: 'the Scorpion’s heart', dx: 0, dy: -44, align: 'center', at: T.arrow + 0.8, color: '#ffb0a0' }, { i: 0, text: 'ALNASL', sub: '“the point”', dx: 14, dy: 40, align: 'left', at: T.arrow + 0.2, color: sc, size: 22 },
        { i: 2, text: 'SAGITTARIUS', dx: 0, dy: 100, align: 'center', at: T.chart + 1.6, color: sc, size: 26 }, { i: 18, text: 'SCORPIUS', dx: 0, dy: 54, align: 'center', at: T.chart + 1.6, color: zc, size: 26 }] })
    // the arrow line: from Alnasl west to Antares
    const p = ease.inOutCubic(prog(t, T.arrow, T.arrow + 0.8))
    if (p > 0) {
      const a = MAP[0], b = MAP[8]
      x.save(); x.globalAlpha *= k
      x.fillStyle = RED
      const n = 30
      for (let i = 2; i <= n * p - 2; i++) { if (i % 2) continue; const u = i / n; x.fillRect(Math.round(lerp(a.x, b.x, u) - 4), Math.round(lerp(a.y, b.y, u) - 4), 8, 8) }
      if (p > 0.95) { const ux = (b.x - a.x), uy = (b.y - a.y), L = Math.hypot(ux, uy), hx = b.x - ux / L * 40, hy = b.y - uy / L * 40; x.save(); x.translate(hx, hy); x.rotate(Math.atan2(uy, ux)); [[0, 0], [-8, -8], [-8, 8], [-16, -16], [-16, 16]].forEach(([dx, dy]) => x.fillRect(dx - 4, dy - 4, 8, 8)); x.restore() }
      x.restore()
    }
  }
  function desert(t) {
    // dusk glow on the horizon, mesas, the ground
    const g = x.createLinearGradient(0, 980, 0, GROUND); g.addColorStop(0, 'rgba(255,120,90,0)'); g.addColorStop(1, 'rgba(255,120,90,0.32)')
    x.fillStyle = g; x.fillRect(0, 980, 1080, GROUND - 980)
    x.fillStyle = '#2a1a3c'
    x.beginPath(); x.moveTo(0, GROUND); x.lineTo(0, 1180); x.lineTo(90, 1180); x.lineTo(110, 1150); x.lineTo(250, 1150); x.lineTo(270, 1190); x.lineTo(700, 1190); x.lineTo(720, 1130); x.lineTo(900, 1130); x.lineTo(920, 1170); x.lineTo(1080, 1170); x.lineTo(1080, GROUND); x.closePath(); x.fill()
    R(INK, 0, GROUND - 6, 1080, 6); R('#6b3a3a', 0, GROUND, 1080, 160); R('#844848', 0, GROUND, 1080, 18)
    for (let i = 0; i < 14; i++) R('#5a3030', (i * 173) % 1060, GROUND + 40 + (i * 37) % 100, 18 + (i % 3) * 8, 6)
  }
  function cactus() { drawBits(x, CACT, CACT_C, CACTUS.x, CACTUS.y - 88, 11) }
  function bow(t, r) {
    // drawn → lowered (pointing at the ground) as the guard comes down
    const d = ease.inOutCubic(prog(t, T.lower, T.lower + 0.8))
    const rot = lerp(0, 1.25, d), bx = r.x + 112 - d * 30, by = r.y + 10 + d * 50
    drawBits(x, BOW, BOW_C, bx, by, 8, { rot })
  }
  function tail(t, r) {
    const d = ease.inOutCubic(prog(t, T.lower + 0.3, T.lower + 1.1))
    drawBits(x, TAIL, TAIL_C, r.x + 120 + d * 10, r.y - 40 + d * 90, 10, { rot: lerp(0, 1.1, d) + Math.sin(t * 3) * 0.05 * (1 - d) })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, 100, { alpha: 0.5 })
      const ok = outK(t, T.out), setK = ease.outCubic(prog(t, OPENER_LEN - 0.2, OPENER_LEN + 0.3))
      if (setK > 0) {
        x.save(); x.globalAlpha = setK * (0.25 + 0.75 * ok)
        skyMap(t)
        desert(t)
        cactus()
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'right', cell: 3 })
        const close = ease.inOutCubic(prog(t, T.lower + 0.6, T.lower + 1.8))
        const [ms, mz] = moods(t)
        const rz = drawStarChar(x, lerp(POS.SCORPIO.x, 712, close), POS.SCORPIO.y, 230, t, { ...SCO, ...mz, pop: pop01(t, OPENER_LEN + 0.12, 0.4, 2.2), seed: 9, hops: HOPS.SCORPIO, glow: 0.9 })
        tail(t, rz)
        const rs = drawStarChar(x, lerp(POS.SAG.x, 372, close), POS.SAG.y, 230, t, { ...SAG, ...ms, pop: pop01(t, OPENER_LEN, 0.4, 2.2), seed: 4, hops: HOPS.SAG, glow: 0.9 })
        bow(t, rs)
        drawTalkMarks(x, rs.x, rs.top, t, speaking(LINES, 'SAG', t, { cps: CPS }), SAG.color)
        drawTalkMarks(x, rz.x, rz.top, t, Math.max(speaking(LINES, 'SCORPIO', t, { cps: CPS }), prog(t, T.last, T.last + 0.2) * (1 - prog(t, T.last + 1.6, T.last + 1.9))), SCO.color)
        x.restore()
      }
      open.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      thread.update(t)
      for (const n of notes) n.update(t)
      last.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      drawGrain(gx, t)
    },
  }
}

// ── pixel art
const BOW = ['.WW.......', '..WW......', '...W......', '...WW.....', 'AAAAAAAAAH', '...WW.....', '...W......', '..WW......', '.WW.......']
const BOW_C = { W: '#c98a52', A: '#efe6d6', H: '#ff5a5a' }
const TAIL = ['....SS', '.....S', '....SS', '...TT.', '..TT..', '.TT...', 'TT....', 'T.....']
const TAIL_C = { T: '#b0408a', S: '#ff8fb1' }
const CACT = ['...GG...', '...GG...', 'G..GG...', 'G..GG..G', 'GGGGG..G', '...GGGGG', '...GG...', '...GG...', '...GG...', '...GG...', '...GG...', '...GG...', '...GG...', '...GG...', '...GG...', '...GG...']
const CACT_C = { G: '#3f8a5a' }

// card-motif candidates: the sky beat, the real talk, the hand-off to the last line
const CUTS = [{ t: T.map - 0.08, kind: 'flip' }, { t: T.real - 0.08, kind: 'deal' }, { t: T.last - 0.08, kind: 'shuffle' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S7 E08' }), cardCuts(CUTS)]

// ── sound
const r3 = v => +v.toFixed(3)
const NOTE_HZ = [523.25, 587.33, 698.46, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE_HZ[(base + i) % NOTE_HZ.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...openerCues(T.open, 2),
  ['pop', r3(OPENER_LEN + 0.05), 698.46, 0.04, -0.4], ['pop', r3(OPENER_LEN + 0.17), 440, 0.04, 0.4],
  ...wordPops(T.h1, 1, 0.08, 0), ['pop', T.h1Land, 1046.5, 0.045, 0],
  ...threadCues(LINES, CAST, { cps: CPS }),
  ...wordPops(T.h2, 2, 0.08, 2),
  ['glitter', r3(T.chart), r3(T.chart + 1.8)],
  ['whoosh', r3(T.arrow), 0.6, 0.03], ['bell', r3(T.arrow + 0.85), 1396.91, 0.03, 1.4, 0.2],
  ...noteCues(T.note1, T.note1Out),
  ...noteCues(T.note2, T.note2Out),
  ...wordPops(T.h3, 2, 0.08, 4),
  ['whoosh', r3(T.lower + 0.1), 0.5, 0.025], ['pluck', r3(T.lower + 0.8), 587.33, 0.04, 0.6, -0.3],
  ['tick', r3(T.ghost + 0.05), 0.015],
  ...lastLineCues(T.last, LAST.text),
  ['whoosh', T.out[0], 0.35, 0.025],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
