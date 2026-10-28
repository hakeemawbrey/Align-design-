// st7claws (45 s vertical Align ad, Star Talk season 7 "SIGN TO SIGN", EP 01) · story 0–40.6, then the shared end card.
//   Libra × Scorpio in a diner booth at 1 a.m.: the ex-best-friends talk. The real hook: in Greek sky lore Libra's stars
//   were the Scorpion's claws, and the two brightest still carry Arabic names meaning "southern claw" (Zubenelgenubi) and
//   "northern claw" (Zubeneschamali). Libra is the only zodiac sign that is an object, not a creature.
//   0.00–2.60  the season opener: ★ SIGN TO SIGN ★ · ♏ × ♎ · "a diner booth, 1:12 a.m."
//   2.7        "Ex-best | *friends.*"  SCORPIO (left) and LIBRA (right) in a red vinyl booth, fries between them.
//   ~13        "Once, one | *shape.*"  The window behind them draws the real Scorpius, its claws reaching into Libra's
//              stars; SKY NOTE 1. Then the claw links fade, Libra's own scales draw in; SKY NOTE 2 (the claw names).
//   ~23        "The *real* talk."  Not knowing why · who Libra is without Scorpio · the fry steal. Ghost behind the
//              napkin dispenser.
//   ~36        LIBRA: "We can be *close* | without being one."  Plain sky at 40.6, end card.
// One canvas (sky + seed constellation + diner + cast), DOM type (headlines, chat thread, SKY NOTEs, last line),
// grain on top. Pure f(t). The season's dialogue look lives in ../s7talk.js (this folder's copy).
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
const KEY = 'Ab'
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', PINK = '#ff8fb1'
const SCO = signStar('scorpio'), LIB = signStar('libra')
const CAST = {
  SCORPIO: { tag: '♏ SCORPIO', color: SCO.color, side: 'L', pitch: 523.25 },
  LIBRA: { tag: '♎ LIBRA', color: LIB.color, side: 'R', pitch: 880 },
}
const CPS = 28

// ── the script
const S = (x, o = {}) => ({ s: 'SCORPIO', x, ...o }), L = (x, o = {}) => ({ s: 'LIBRA', x, ...o })
const SCRIPT = seq(3.05, [
  S('so. you finally *called.*'),
  L('i ordered your fries. a *peace offering.*'),
  S('you were literally *part of me.*'),
  L('and i chose to be my *own thing.*', { hold: 1.5 }),
  { mark: 'map' },
  S('my claws. you were my actual *claws.*', { pre: 0.5, hold: 2.2 }),
  { mark: 'own' },
  L('my stars still have “claw” in their *names.*', { hold: 2.6 }),
  { mark: 'talk' },
  S('i didn’t mind you leaving. i minded *not knowing why.*', { pre: 0.45 }),
  L('i needed to see who i was *without you.*', { hold: 1.5 }),
  L('turns out? the scales. the only sign that’s not a *creature.*'),
  { mark: 'fry' },
  S('fair. i’m still stealing a *fry.*', { hold: 1.6 }),
], { cast: CAST, cps: CPS, hold: 1.6 })
const LINES = SCRIPT.lines, M = SCRIPT.marks
const T = {
  open: 0, h1: 2.7, h1Land: 3.0,
  map: M.map, h2: M.map - 0.1, h2Land: M.map + 0.3,
  note1: M.map + 2.6, note1Out: [M.own + 1.4, M.own + 1.65],
  own: M.own, note2: M.own + 1.75, note2Out: [M.talk + 1.75, M.talk + 2.0],
  talk: M.talk, h3: M.talk + 2.05, h3Land: M.talk + 2.35,
  fry: M.fry, close: SCRIPT.end - 0.1,
  last: SCRIPT.end + 0.25, out: [STORY_END - 0.45, STORY_END - 0.05],
}
T.h1Out = [T.map - 0.6, T.map - 0.4]
T.h2Out = [T.note1 - 0.3, T.note1 - 0.1]
T.h3Out = [T.talk + 6.4, T.talk + 6.6]
T.ghost = T.talk + 6.2
const LAST = { text: 'We can be *close* | without being one.', who: 'LIBRA' }
const NOTE1 = 'In Greek sky lore, Libra’s stars | were the *Scorpion’s claws.*'
const NOTE2 = '*Zubenelgenubi* and *Zubeneschamali:* | “southern claw” and “northern claw.”'

// ── the set: a diner booth, Scorpio on the left bench, Libra on the right, the night window behind
const WIN = { x0: 132, x1: 948, y0: 540, y1: 1050 }
const SEAT = { L: { x: 290, y: 1110 }, R: { x: 790, y: 1110 } }
const TABLE = { x0: 350, x1: 730, y: 1212 }
const NAPKIN = { x: 452, y: 1168 }
export const GHOST = { at: T.ghost, x: NAPKIN.x, y: NAPKIN.y - 30, where: 'rising from behind the napkin dispenser on the diner table, between the two of them' }

// ── the sky in the window: the real Scorpius + Libra (RA h, Dec °, mag), east to the left
const RAW = [
  // Libra 0–3
  [14.848, -16.04, 2.75], [15.283, -9.38, 2.61], [15.592, -14.79, 3.9], [14.079, -25.28, 3.3],
  // Scorpius 4–17: Acrab, Dschubba, π, σ, Antares, τ, ε, μ, ζ, η, Sargas, ι, κ, Shaula
  [16.091, -19.81, 2.6], [16.006, -22.62, 2.3], [15.981, -26.11, 2.9], [16.353, -25.59, 2.9], [16.490, -26.43, 1.06],
  [16.598, -28.22, 2.8], [16.836, -34.29, 2.3], [16.864, -38.05, 3.0], [16.910, -42.36, 3.6], [17.203, -43.24, 3.3],
  [17.622, -43.00, 1.9], [17.793, -40.13, 3.0], [17.708, -39.03, 2.4], [17.560, -37.10, 1.6],
]
const MAP = (() => {
  const ra0 = 15.95 * 15, de0 = -26.3, cosd = Math.cos(de0 * Math.PI / 180), k = 11, cx = 540, cy = 768
  return RAW.map(([ra, de, mag]) => ({ x: Math.round(cx - (ra * 15 - ra0) * cosd * k), y: Math.round(cy - (de - de0) * k), mag }))
})()
const SCO_LINKS = [[4, 5], [5, 6], [5, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14], [14, 15], [15, 16], [16, 17]]
const CLAW_LINKS = [[4, 1], [6, 0]]                  // the head reaching out to the claws (β Lib north, α Lib south)
const LIB_LINKS = [[3, 0], [0, 1], [1, 2], [2, 0]]

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const HOPS = { SCORPIO: [T.h1 + 0.2, ...talkHops(LINES, CAST.SCORPIO.tag, { cps: CPS })], LIBRA: [T.h1 + 0.35, ...talkHops(LINES, CAST.LIBRA.tag, { cps: CPS }), T.last + 0.1, T.last + 0.6, T.last + 1.1] }
const lineAt = t => { let c = null; for (const l of LINES) if (t >= l.t) c = l; return c }

function moods(t) {
  const li = LINES.indexOf(lineAt(t))
  // [scorpio, libra] per line index
  const table = [
    [{ mood: 'squint', look: [1, 0] }, { mood: 'neutral', look: [-1, 1] }],          // so. you finally called.
    [{ mood: 'squint', look: [1, 0] }, { mood: 'happy', look: [-1, 0] }],            // fries
    [{ mood: 'wide', look: [1, 0] }, { mood: 'neutral', look: [-1, 1] }],            // part of me
    [{ mood: 'neutral', look: [1, 0] }, { mood: 'sparkle', look: [-1, 0] }],         // own thing
    [{ mood: 'eyeroll' }, { mood: 'neutral', look: [-1, -1] }],                      // my claws
    [{ mood: 'neutral', look: [1, -1] }, { mood: 'happy', look: [-1, -1] }],         // names
    [{ mood: 'neutral', look: [1, 1] }, { mood: 'wide', look: [-1, 0] }],            // not knowing why
    [{ mood: 'neutral', look: [1, 0] }, { mood: 'neutral', look: [-1, 1] }],         // without you
    [{ mood: 'happy', look: [1, 0] }, { mood: 'sparkle', look: [-1, 0] }],           // the scales
    [{ mood: 'wink', look: [1, 0] }, { mood: 'eyeroll' }],                           // fry
  ]
  if (t < LINES[0].t) return [{ mood: 'squint', look: [1, 0] }, { mood: 'neutral', look: [-1, 1] }]
  if (t >= T.last) return [{ mood: 'happy', look: [1, 0] }, { mood: 'happy', look: [-1, 0] }]
  return table[li] || table[table.length - 1]
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "600 36px Inter", "italic 500 160px 'EB Garamond'", "700 42px 'Space Mono'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const H1 = popText(root, 'Ex-best | *friends.*', { top: 196, size: 112, accentSize: 176, at: T.h1, gap: 0.08, accentColor: lite(SCO.color, 0.25), wobble: true, late: 1, lateAt: T.h1Land, fit: true })
  const H2 = popText(root, 'Once, one | *shape.*', { top: 196, size: 112, accentSize: 176, at: T.h2, gap: 0.08, accentColor: GOLD, wobble: true, late: 1, lateAt: T.h2Land, fit: true })
  const H3 = popText(root, 'The *real* talk.', { top: 250, size: 116, accentSize: 176, at: T.h3, gap: 0.08, accentColor: lite(LIB.color, 0.25), wobble: true, late: 2, lateAt: T.h3Land, fit: true })
  const HEADS = [[H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const open = opener(root, { at: T.open, cast: [{ glyph: '♏', name: 'Scorpio', color: SCO.color }, { glyph: '♎', name: 'Libra', color: LIB.color }], place: 'a diner booth, 1:12 a.m.' })
  const thread = chatThread(root, { lines: LINES, cast: CAST, close: T.close, cps: CPS })
  const n1 = skyNote(root, { at: T.note1, out: T.note1Out, text: NOTE1, top: 176 })
  const n2 = skyNote(root, { at: T.note2, out: T.note2Out, text: NOTE2, top: 176 })
  const last = lastLine(root, { at: T.last, out: T.out, text: LAST.text, tag: CAST.LIBRA.tag, color: LIB.color, top: 1460, size: 104, accentSize: 164 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const R = (c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }
  function windowSky(t, k) {
    const { x0, x1, y0, y1 } = WIN
    // frame + glass
    R(INK, x0 - 14, y0 - 14, x1 - x0 + 28, y1 - y0 + 28)
    R('#8a2b3c', x0 - 8, y0 - 8, x1 - x0 + 16, y1 - y0 + 16)
    R('#b84257', x0 - 8, y0 - 8, x1 - x0 + 16, 6)
    x.save(); x.beginPath(); x.rect(x0, y0, x1 - x0, y1 - y0); x.clip()
    const g = x.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, 'rgba(8,6,30,0.9)'); g.addColorStop(1, 'rgba(40,20,60,0.85)')
    x.fillStyle = g; x.fillRect(x0, y0, x1 - x0, y1 - y0)
    // the map: Scorpius with its claws, then Libra on its own
    const ma = prog(t, T.map, T.map + 0.4) * k
    if (ma > 0) {
      const own = ease.inOutQuad(prog(t, T.own, T.own + 0.8))
      const sc = lite(SCO.color, 0.2), lc = lite(LIB.color, 0.2)
      drawStarMap(x, t, { stars: MAP.map((s, i) => ({ ...s, color: i < 4 ? (own > 0.5 ? lc : sc) : sc })), links: SCO_LINKS.map(l => [...l, sc]), at: T.map + 0.1, dur: 1.6, k: ma,
        labels: [{ i: 8, text: 'ANTARES', dx: -30, dy: 2, align: 'right', at: T.map + 1.4, color: sc }] })
      drawStarMap(x, t, { stars: MAP, links: CLAW_LINKS.map(l => [...l, sc]), at: T.map + 1.4, dur: 0.6, k: ma * (1 - own) })
      drawStarMap(x, t, { stars: MAP.map((s, i) => ({ ...s, color: lc })), links: LIB_LINKS.map(l => [...l, lc]), at: T.own + 0.3, dur: 1.0, k: ma * own,
        labels: [{ i: 1, text: 'ZUBENESCHAMALI', sub: 'northern claw', dx: -26, dy: -14, align: 'right', at: T.own + 1.0, color: lc, size: 22 },
          { i: 0, text: 'ZUBENELGENUBI', sub: 'southern claw', dx: 26, dy: 44, align: 'left', at: T.own + 1.3, color: lc, size: 22 }] })
    } else {
      // plain night through the glass
      for (let i = 0; i < 26; i++) { const sx = x0 + ((i * 197) % (x1 - x0)), sy = y0 + ((i * 113) % (y1 - y0 - 40)); x.globalAlpha = 0.4 + 0.4 * Math.sin(t * 2 + i); R(BONE, sx, sy, 4, 4) }
      x.globalAlpha = 1
    }
    x.restore()
    // the mullion + a neon OPEN sign in the top-left pane
    if (ma <= 0) R('#8a2b3c', (x0 + x1) / 2 - 5, y0, 10, y1 - y0)
    const flick = (Math.sin(t * 9) > -0.95 ? 1 : 0.4)
    x.save(); x.font = `700 34px 'Space Mono', monospace`; x.textAlign = 'left'; x.textBaseline = 'top'
    x.shadowColor = PINK; x.shadowBlur = 18 * flick; x.fillStyle = flick > 0.5 ? '#ffc2d4' : '#a05a70'
    x.globalAlpha = 1 - 0.6 * (ma > 0 ? 1 : 0)
    x.fillText('OPEN', x0 + 22, y0 + 18); x.restore()
  }
  function booth(t) {
    // backrests (tufted red vinyl)
    for (const [bx, dir] of [[40, 1], [912, -1]]) {
      R(INK, bx - 6, 890, 134, 400)
      R('#b8324a', bx, 896, 122, 388)
      R('#d9485f', dir > 0 ? bx : bx + 104, 896, 18, 388)
      R('#8f2236', dir > 0 ? bx + 104 : bx, 896, 18, 388)
      for (let j = 0; j < 4; j++) R('#6e1828', bx + 56, 940 + j * 84, 10, 10)
      R('#e8e1d4', bx - 6, 884, 134, 10)                                   // chrome trim
    }
    // seats
    R(INK, 34, 1250, 300, 34); R('#c43a52', 40, 1252, 288, 24)
    R(INK, 746, 1250, 300, 34); R('#c43a52', 752, 1252, 288, 24)
    void t
  }
  function table(t, ok) {
    const { x0, x1, y } = TABLE
    R(INK, 520, y + 20, 40, 96); R('#9aa0b0', 526, y + 20, 28, 96)          // pedestal
    R(INK, 470, y + 110, 140, 20); R('#9aa0b0', 476, y + 112, 128, 14)
    R(INK, x0 - 6, y - 6, x1 - x0 + 12, 36); R('#efe3c8', x0, y, x1 - x0, 18); R('#e8e1d4', x0, y + 18, x1 - x0, 8)
    R('#c9b892', x0, y, x1 - x0, 4)
    // mugs + steam
    for (const [mx, s] of [[400, 0], [680, 1]]) {
      drawBits(x, MUG, MUG_C, mx, y - 30, 6, { flip: !!s })
      for (let k = 0; k < 3; k++) { const ph = (t * 0.6 + k / 3 + s * 0.5) % 1; x.globalAlpha = Math.sin(Math.PI * ph) * 0.5; R(BONE, mx - 6 + Math.sin(ph * 7 + k) * 8, y - 70 - ph * 70, 6, 6) }
      x.globalAlpha = 1
    }
    // the ghost hides behind the napkin dispenser
    drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'below', cell: 3 })
    drawBits(x, NAPK, NAPK_C, NAPKIN.x, NAPKIN.y, 6)
    // the fries (one leaves for Scorpio at the steal)
    drawBits(x, FRIES, FRIES_C, 560, y - 40, 6)
    const fp = prog(t, T.fry + 1.0, T.fry + 1.7)
    if (fp > 0 && ok > 0) {
      const fx = lerp(566, SEAT.L.x + 60, ease.inOutQuad(fp)), fy = lerp(y - 80, SEAT.L.y + 20, fp) - Math.sin(Math.PI * fp) * 120
      x.save(); x.translate(fx, fy); x.rotate(fp * 6); R(INK, -10, -40, 20, 80); R('#ffd34d', -6, -36, 12, 72); x.restore()
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, 100, { alpha: 0.5 })
      const ok = outK(t, T.out), setK = ease.outCubic(prog(t, OPENER_LEN - 0.2, OPENER_LEN + 0.3))
      if (setK > 0) {
        x.save(); x.globalAlpha = setK * (0.25 + 0.75 * ok)
        windowSky(t, ok); booth(t)
        // the two of them
        const [ms, ml] = moods(t)
        const rs = drawStarChar(x, SEAT.L.x, SEAT.L.y, 290, t, { ...SCO, ...ms, pop: pop01(t, OPENER_LEN, 0.4, 2.2), seed: 7, hops: HOPS.SCORPIO, glow: 0.9 })
        const rl = drawStarChar(x, SEAT.R.x, SEAT.R.y, 290, t, { ...LIB, ...ml, pop: pop01(t, OPENER_LEN + 0.12, 0.4, 2.2), seed: 11, hops: HOPS.LIBRA, glow: 0.9 })
        drawTalkMarks(x, rs.x, rs.top, t, speaking(LINES, 'SCORPIO', t, { cps: CPS }), SCO.color)
        drawTalkMarks(x, rl.x, rl.top, t, Math.max(speaking(LINES, 'LIBRA', t, { cps: CPS }), prog(t, T.last, T.last + 0.2) * (1 - prog(t, T.last + 1.6, T.last + 1.9))), LIB.color)
        table(t, ok)
        x.restore()
      }
      open.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      thread.update(t)
      n1.update(t); n2.update(t)
      last.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      drawGrain(gx, t)
    },
  }
}

const MUG = ['.WWWW..', 'WCCCCWW', 'WCCCC.W', 'WCCCCWW', 'WCCCC..', '.WWWW..']
const MUG_C = { W: '#efe6d6', C: '#6b3b2a' }
const NAPK = ['SSSSSSSS', 'SNNNNNNS', 'SNNNNNNS', 'SSSSSSSS', 'SSSSSSSS', 'SSSSSSSS']
const NAPK_C = { S: '#b9bfcc', N: '#ffffff' }
const FRIES = ['.Y.Y.Y.Y.', 'YY.YYY.YY', 'YYYYYYYYY', 'RRRRRRRRR', 'RWRRWRRWR', '.RRRRRRR.', '.RRRRRRR.']
const FRIES_C = { Y: '#ffd34d', R: '#e2334c', W: '#fff1c8' }

// card-motif candidates (beat changes): map → real talk, the fry → the last line
const CUTS = [{ t: T.h2 - 0.02, kind: 'flip' }, { t: T.talk - 0.05, kind: 'flip' }, { t: T.last - 0.08, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S7 E01' }), cardCuts(CUTS)]

// ── sound
const r3 = v => +v.toFixed(3)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...openerCues(T.open, 2),
  ['pop', r3(OPENER_LEN + 0.05), 587.33, 0.04, -0.4], ['pop', r3(OPENER_LEN + 0.17), 880, 0.04, 0.4],
  ...wordPops(T.h1, 2, 0.08, 0), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ...threadCues(LINES, CAST, { cps: CPS }),
  ...wordPops(T.h2, 2, 0.08, 2), ['pop', T.h2Land, 1318.51, 0.045, 0],
  ['glitter', T.map + 0.1, T.map + 1.8], ['bell', T.map + 1.4, 1760, 0.025, 1.6, -0.2],
  ...noteCues(T.note1, T.note1Out),
  ['riser', T.own, T.own + 0.8, 0.04], ['bell', T.own + 0.9, 2093, 0.025, 1.4, 0.2], ['pluck', T.own + 1.0, 1174.66, 0.035, 0.6, 0.3],
  ...noteCues(T.note2, T.note2Out),
  ...wordPops(T.h3, 1, 0.08, 4), ['pop', T.h3Land, 987.77, 0.045, 0], ['pluck', T.h3Land, 739.99, 0.035, 0.6, 0],
  ['tick', r3(T.ghost + 0.05), 0.015],
  ['whoosh', r3(T.fry + 1.0), 0.5, 0.03], ['pop', r3(T.fry + 1.7), 1318.51, 0.045, -0.4],
  ...lastLineCues(T.last, LAST.text),
  ['whoosh', T.out[0], 0.35, 0.025],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
