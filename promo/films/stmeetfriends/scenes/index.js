// stmeetfriends — "Live from Your 5th House, Ep. 2: Meeting the Friends." (60 s vertical Align ad, Star Talk season 3 #20,
// music: funk in D minor). A sequel to stlive5th: the same booth (♊ GEMINI + ♐ SAG in headsets, one shared mic), the same
// chunky CRT, the ● LIVE bug and ♓ Pisces crying on top of the TV. Story 0–55.6, then the shared end card.
//   0.00–2.75  "*Previously* on…"  VHS recap on the CRT: Ep. 1's two answer cards flip, "Pineapple belongs on pizza." ✓ ✓.
//              Pisces is still crying from last week.
//   2.82       the drop: static, then ● LIVE. "Ep. 2: | Meeting the *friends.*"  GEMINI: "WE'RE BACK. Tonight: meeting
//              the friends!"  On the CRT: a pixel bar booth, your three friends and you (chyron EP. 2 · THE FRIENDS).
//   6.7–10.5   "Three friends. | One *date.*"  Starting-lineup tags pop over heads (LOUD · NIAMH · YOU · QUIET).
//              SAG: "Three friends. One booth. No mercy."  The date walks in; all three friends turn their heads in sync.
//  10.75       card cut.
//  10.85–23.2  the booth calls, a rule of three, each with a green ✓ stamp slammed on the CRT (score bug counts them):
//              "Green flag *#1.*"  he slides his phone into his pocket. SAG: "Phone's… in the pocket."
//              "Green flag *#2.*"  "so what are you into?" → the quiet friend: "…bees." GEMINI: "He's asking the quiet friend
//              a question!"   "Green flag | *hat trick.*"  "great to meet you, Niamh!" ('NEEV'). SAG (deadpan): "He remembered
//              her name. First try."  …then a GIANT ✓ slams, the TV shakes, Pisces sobs.
//  23.4       card cut.
//  23.5–29.3  "Oh no. | The karaoke *story.*"  The loud friend stands on the bench with a pretend mic and points at you; you
//              hide behind your hands. GEMINI: "Oh no. Not the karaoke story."  SLO-MO: the music tape-stops into silence,
//              the booth holds its breath (puffed, eyes shut, slowly turning blue).
//  29.3–33.8  "He laughed | *with* you."  He laughs WITH you (exhale: PHEW), then: "ha! mine's worse: I fell off the
//              stage."  31.16 the booth erupts (confetti, jumps). GEMINI: "HE'S GOT A WORSE ONE!"
//  33.95      card cut.
//  34.05–40.4 "Instant *replay.*"  VHS rewind, slo-mo: he refills everyone's water; the telestrator circles glass 1, 2, 3,
//              4. SAG (deadpan): "Unreal. Refilled. The waters."  …and the deadpan one sheds a tear. Gemini double-takes.
//  40.6       card cut.
//  41.16–45.55 ★ LESSON UNLOCKED (shared lesson.js): "Watch how they treat | your *people.*"  +1 SQUAD APPROVAL
//  45.6–50.75 "Push. *Pull.* Align."  The booth pulls the reading up on the CRT: two charts, the Pull line draws.
//              GEMINI: "Pull: you both love your people."
//  50.85–55.5 "To be | *continued…*"  The CRT: NEXT WEEK · EP. 3 · THE SECOND DATE. THE BOOTH: "Next week: the second
//              date. Stay tuned."  Pisces blows its nose: HONK. Everything pops out by 55.5; the end card at 55.6.
// One canvas (sky + TV + booth), a low-res canvas for the CRT picture, DOM type + dialogue boxes + the lesson, grain. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, READING, drawWheelH, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { starFrame, inSprite, headsetCells, tearsCells, tissueCells, drawMic, drawTV, drawDesk, confetti } from './props.js'

export const DURATION = 60
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', INK = '#1b1236', RED = '#e8344e', MINT = '#46cf82', CYAN = '#7fe0ff'
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const BL = 60 / 108
const BEAT = n => 0.6 + n * BL                // 108 bpm grid
const GEM = signStar('gemini'), SAG = signStar('sagittarius'), PIS = signStar('pisces')
export const KEY = 'Dm'

// ── the timeline
const T = {
  black: [0, 0.25],
  tvIn: 0.06, deskIn: 0.14, gemIn: 0.22, sagIn: 0.3, micIn: 0.38, pisIn: 0.46,
  h0: 0.12, h0Out: [2.5, 2.7], flipA: 0.78, flipB: 0.9, chkA: 1.22, chkB: 1.38, stat: 2.55,
  on: BEAT(4),                                                                // 2.822 the drop: ● LIVE
  h1: 2.92, h1Land: 3.3, h1Out: [6.45, 6.65], l1: 3.05,
  h1b: 6.7, h1bLand: 7.05, h1bOut: [10.3, 10.5], tags: 6.85, tagsOut: [10.15, 10.4], l2: 6.95, enter: [8.5, 9.9], turn: 8.75, closeA: 10.45,
  cut1: 10.75,
  h2a: 10.85, h2aLand: 11.2, h2aOut: [14.55, 14.75], pocket: [11.1, 12.2], l4: 11.55, st1: 13.05,
  h2b: 14.85, h2bLand: 15.2, h2bOut: [18.6, 18.8], ask: [14.6, 16.05], bees: [15.95, 18.5], l5: 15.0, st2: 17.1,
  h2c: 18.9, hat: BEAT(38), h2cOut: [23.0, 23.2], niamh: [18.6, 21.6], neev: 19.05, l6: 19.0, st3: BEAT(38), closeB: 22.95,
  cut2: 23.4,
  h3: 23.5, h3Land: 23.85, h3Out: [29.1, 29.3], stand: [23.55, 24.0], story: [24.05, 29.15], hide: 24.45, l7: 24.6, closeC: 27.75,
  slo: [26.3, 29.15], hold: [26.5, 29.2],
  laugh: 29.3, peek: 29.65, worse: [29.95, 33.7], h3b: 29.45, h3bOut: [33.55, 33.75],
  erupt: BEAT(55), l8: 31.2, closeD: 33.78,                                   // 31.156 the booth erupts
  cut3: BEAT(60),                                                             // 33.933
  h4: 34.05, h4Land: 34.4, h4Out: [40.15, 40.35], rew: [33.93, 34.55], pour: [34.65, 0.72], pause: 37.6, l9: 37.05, tear: 39.05, dbl: 39.3, closeE: 40.4,
  cut4: BEAT(72),                                                             // 40.6
  lesson: BEAT(73), lessonOut: [45.35, 45.55],                                // 41.156
  read: BEAT(81), h5: 45.75, h5Out: [50.55, 50.75], pullT: 46.45, l10: 46.85, closeF: 50.5,   // 45.6
  next: 50.85, h6: 51.0, h6Land: 51.35, h6Out: [55.1, 55.35], l11: 51.4, closeG: 55.0, honk: 54.05, lookP: 54.25, out: [55.05, 55.5],
}
const POURS = [0, 1, 2, 3].map(i => T.pour[0] + i * T.pour[1])                 // 34.65, 35.37, 36.09, 36.81

const GT = `${GEM.glyph}︎ GEMINI`, ST = `${SAG.glyph}︎ SAG`, BT = `${GEM.glyph}︎${SAG.glyph}︎ THE BOOTH`
const GC = '#ffd95a', SCOL = LAV
const LINES_A = [
  { t: T.l1, speaker: GT, color: GC, text: "WE'RE BACK. Tonight: meeting *the friends!*" },
  { t: T.l2, speaker: ST, color: SCOL, text: 'Three friends. One booth. *No mercy.*' },
]
const LINES_B = [
  { t: T.l4, speaker: ST, color: SCOL, text: 'Phone’s… in the *pocket.*' },
  { t: T.l5, speaker: GT, color: GC, text: 'He’s asking *the quiet friend* a question!' },
  { t: T.l6, speaker: ST, color: SCOL, text: 'He remembered her name. *First try.*' },
]
const LINES_C = [{ t: T.l7, speaker: GT, color: GC, text: 'Oh no. Not *the karaoke story.*' }]
const LINES_D = [{ t: T.l8, speaker: GT, color: GC, text: 'HE’S GOT A *WORSE ONE!*' }]
const LINES_E = [{ t: T.l9, speaker: ST, color: SCOL, text: 'Unreal. Refilled. *The waters.*' }]
const LINES_F = [{ t: T.l10, speaker: GT, color: READING.pull, text: 'Pull: you both love *your people.*' }]
const LINES_G = [{ t: T.l11, speaker: BT, color: GOLD, text: 'Next week: the *second* date. Stay tuned.' }]
const ALL_LINES = [...LINES_A, ...LINES_B, ...LINES_C, ...LINES_D, ...LINES_E, ...LINES_F, ...LINES_G]
const CPS = 28
const ALL_LT = lineTimes(ALL_LINES, { cps: CPS })
const GEM_HOPS = talkHops(ALL_LINES, GT, { cps: CPS })
const SAG_HOPS = talkHops(ALL_LINES, ST, { cps: CPS })
const BOOTH_HOPS = talkHops(ALL_LINES, BT, { cps: CPS })
const ERUPT_HOPS = [T.erupt + BL * 2, T.erupt + BL * 4]
const CALL_HOPS = [T.st1 + 0.02, T.st2 + 0.02, T.chkA + 0.02, T.chkB + 0.1]

export const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Watch how they treat | your *people.*', chip: '+1 SQUAD APPROVAL' }

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const inR = (t, a, b) => t >= a && t < b
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const hex = h => { const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255] }
const mixHex = (a, b, k) => { const A_ = hex(a), B_ = hex(b); return '#' + A_.map((v, i) => Math.round(lerp(v, B_[i], k)).toString(16).padStart(2, '0')).join('') }

// ── geometry (the booth + CRT exactly as Ep. 1)
const TV = { x0: 120, y0: 500, w: 840, h: 660, sx0: 160, sy0: 530, sw: 760, sh: 520 }
const TVC = { x: 540, y: 830 }
const LW = 152, LH = 104, PS = 5                       // the CRT picture: 152×104 low-res pixels at 5 px
const DESK = { x0: 140, x1: 940, y: 1392, h: 74 }
const G_DESK = { x: 300, y: 1278, s: 250 }, S_DESK = { x: 780, y: 1278, s: 250 }
const PIS_AT = { x: 858, s: 148 }
const MIC = { x: 540, y: DESK.y }
const SX = lx => TV.sx0 + lx * PS, SY = ly => TV.sy0 + ly * PS

// the bar (low-res): seats left → right
const SEAT = { loud: 22, niamh: 49, you: 76, him: 103, quiet: 130 }
const HY = 50                                          // seated head centre (low-res y)
const GLASS_X = { quiet: SEAT.quiet + 6, you: SEAT.you + 6, niamh: SEAT.niamh + 6, loud: SEAT.loud + 6, him: SEAT.him - 6 }
const POUR_ORDER = ['quiet', 'you', 'niamh', 'loud']

// the booth grooves on every beat while the band plays
const GROOVE = [[T.on, T.slo[0]], [T.erupt, T.cut3 - 0.1], [T.read, T.closeG]]
function grooveAt(t) {
  if (!GROOVE.some(([a, b]) => inR(t, a, b))) return { dy: 0, sq: 0 }
  const ph = (((t - 0.6) / BL) % 1 + 1) % 1
  return { dy: -10 * Math.sin(Math.PI * ph) ** 2, sq: 0.05 * Math.exp(-ph * 12) }
}
function talkWeight(t, who) {
  let w = 0
  ALL_LINES.forEach((L, i) => {
    const s = L.speaker === who || (who === 'both' && L.speaker === BT)
    if (!s) return
    w = Math.max(w, prog(t, L.t - 0.25, L.t) * (1 - prog(t, ALL_LT[i].done + 0.4, ALL_LT[i].done + 0.8)))
  })
  return ease.inOutQuad(w)
}
// the breath-hold: 0 → 1 (puffed, turning blue) → released on the laugh
const holdK = t => ease.inOutQuad(prog(t, T.hold[0], T.hold[0] + 0.35)) * (1 - prog(t, T.laugh - 0.05, T.laugh + 0.15))
const blueK = t => prog(t, T.hold[0] + 0.3, T.hold[1]) * (1 - prog(t, T.laugh - 0.05, T.laugh + 0.3))

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 40px Inter", "italic 500 190px 'EB Garamond'", "italic 500 44px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const BACK = bake(await loadImg('card-back.png'), 300)
  const BACK_BODY = 1320 / 1528

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const low = document.createElement('canvas'); low.width = LW; low.height = LH
  const l = low.getContext('2d')
  const noiseImg = l.createImageData(LW, LH)

  // ── type
  const H0 = popText(root, '*Previously* on…', { top: 150, size: 112, accentSize: 164, at: T.h0, wobble: true, gap: 0.12, accentColor: CYAN })
  const H1 = popText(root, 'Ep. 2: | Meeting the *friends.*', { top: 118, size: 96, accentSize: 140, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: PINK, lineHeight: 1.0 })
  const H1b = popText(root, 'Three friends. | One *date.*', { top: 118, size: 100, accentSize: 150, at: T.h1b, late: 1, lateAt: T.h1bLand, wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const H2a = popText(root, 'Green flag *#1.*', { top: 168, size: 112, accentSize: 164, at: T.h2a, late: 1, lateAt: T.h2aLand, wobble: true, accentColor: MINT })
  const H2b = popText(root, 'Green flag *#2.*', { top: 168, size: 112, accentSize: 164, at: T.h2b, late: 1, lateAt: T.h2bLand, wobble: true, accentColor: MINT })
  const H2c = popText(root, 'Green flag | *hat trick.*', { top: 118, size: 100, accentSize: 150, at: T.h2c, late: 2, lateAt: T.hat, lateGap: 0.12, wobble: true, accentColor: MINT, lineHeight: 1.0 })
  const H3 = popText(root, 'Oh no. | The karaoke *story.*', { top: 118, size: 100, accentSize: 150, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: RED, lineHeight: 1.0 })
  const H3b = popText(root, 'He laughed | *with* you.', { top: 118, size: 104, accentSize: 156, at: T.h3b, gap: 0.1, wobble: true, accentColor: PINK, lineHeight: 1.0 })
  const H4 = popText(root, 'Instant *replay.*', { top: 168, size: 112, accentSize: 164, at: T.h4, late: 1, lateAt: T.h4Land, wobble: true, accentColor: CYAN })
  const H5 = popText(root, 'Push. *Pull.* Align.', { top: 172, size: 92, accentSize: 132, at: T.h5, gap: 0.16, wobble: true, accentColor: READING.pull })
  const H6 = popText(root, 'To be | *continued…*', { top: 118, size: 104, accentSize: 156, at: T.h6, late: 1, lateAt: T.h6Land, wobble: true, accentColor: LAV, lineHeight: 1.0 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H1b, T.h1bOut], [H2a, T.h2aOut], [H2b, T.h2bOut], [H2c, T.h2cOut], [H3, T.h3Out], [H3b, T.h3bOut], [H4, T.h4Out], [H5, T.h5Out], [H6, T.h6Out]]
  const BOX = { y: 1500, width: 960, height: 250, cps: CPS }
  const boxes = [
    dialogueBox(root, { ...BOX, lines: LINES_A, open: T.l1 - 0.25, close: T.closeA }),
    dialogueBox(root, { ...BOX, lines: LINES_B, open: T.l4 - 0.25, close: T.closeB }),
    dialogueBox(root, { ...BOX, lines: LINES_C, open: T.l7 - 0.25, close: T.closeC }),
    dialogueBox(root, { ...BOX, lines: LINES_D, open: T.l8 - 0.2, close: T.closeD }),
    dialogueBox(root, { ...BOX, lines: LINES_E, open: T.l9 - 0.25, close: T.closeE }),
    dialogueBox(root, { ...BOX, lines: LINES_F, open: T.l10 - 0.25, close: T.closeF }),
    dialogueBox(root, { ...BOX, lines: LINES_G, open: T.l11 - 0.22, close: T.closeG }),
  ]
  const lesson = buildLesson(root, { ...LESSON, accentColor: GOLD, dim: 0.62 })

  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ═══════════════════════ the low-res bar (1 unit = 1 CRT pixel) ═══════════════════════
  const R = (X, Y, w, h, c) => { l.fillStyle = c; l.fillRect(Math.round(X), Math.round(Y), w, h) }
  const disc = (cx, cy, r, c, keep) => { for (let j = Math.floor(cy - r); j <= Math.ceil(cy + r); j++) for (let i = Math.floor(cx - r); i <= Math.ceil(cx + r); i++) if ((i - cx) ** 2 + (j - cy) ** 2 <= r * r && (!keep || keep(i, j))) R(i, j, 1, 1, c) }
  const thick = (x0, y0, x1, y1, c, w = 3) => { const n = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0))); for (let k = 0; k <= n; k++) { const u = k / n; R(Math.round(lerp(x0, x1, u)) - (w >> 1), Math.round(lerp(y0, y1, u)) - (w >> 1), w, w, c) } }
  const CAST = {
    you: { skin: '#eab08a', hair: 'long', hairC: '#8a2f3e', hairHi: '#b0465a', top: '#33b3a0', topSh: '#24877a' },
    him: { skin: '#c4855e', hair: 'short', hairC: '#3a2418', hairHi: '#5a3a26', top: '#e3a83c', topSh: '#b07e22', glasses: true },
    loud: { skin: '#8d5a3b', hair: 'puff', hairC: '#2a1a14', hairHi: '#4a2e20', top: '#ff4f8b', topSh: '#c93a6c', hoops: true },
    quiet: { skin: '#f0c8a0', hair: 'beanie', hairC: '#3f8a5a', hairHi: '#5fb07a', top: '#6b7aa8', topSh: '#525f88' },
    niamh: { skin: '#f3d1b5', hair: 'bob', hairC: '#f0cf6a', hairHi: '#fff0a8', top: '#a98bff', topSh: '#8468d8' },
  }
  /** one person facing the camera, seated behind the table (or standing: s.hy smaller) */
  function person(P, s, t) {
    const cx = Math.round(s.x), hy = Math.round(s.hy)
    if (P.hair === 'puff') { disc(cx, hy - 3, 9.4, P.hairC); disc(cx - 3, hy - 8, 2.2, P.hairHi) }
    if (P.hair === 'long') R(cx - 7, hy - 3, 15, 16, P.hairC)
    if (P.hair === 'bob') R(cx - 7, hy - 3, 15, 9, P.hairC)
    // legs (only seen when standing)
    if (s.legs) { R(cx - 5, hy + 32, 4, 16, '#2b3060'); R(cx + 2, hy + 32, 4, 16, '#2b3060') }
    // torso
    R(cx - 7, hy + 8, 15, 26, P.top); R(cx - 6, hy + 7, 13, 1, P.top); R(cx - 7, hy + 24, 15, 10, P.topSh)
    if (P.hair === 'beanie') { R(cx - 3, hy + 8, 7, 3, P.topSh); R(cx - 1, hy + 11, 3, 6, P.topSh) }    // hoodie strings
    R(cx - 1, hy + 5, 3, 3, P.skin)
    disc(cx, hy, 5.6, P.skin)
    if (P.hair === 'long') { disc(cx, hy, 6, P.hairC, (i, j) => j < hy - 2); R(cx - 2, hy - 6, 4, 1, P.hairHi) }
    else if (P.hair === 'short') { disc(cx, hy, 6, P.hairC, (i, j) => j < hy - 2 || (j < hy && Math.abs(i - cx) > 4)); R(cx - 2, hy - 6, 3, 1, P.hairHi) }
    else if (P.hair === 'puff') disc(cx, hy, 6, P.hairC, (i, j) => j < hy - 3)
    else if (P.hair === 'bob') { disc(cx, hy, 6.2, P.hairC, (i, j) => j < hy - 2); R(cx - 6, hy - 2, 2, 7, P.hairC); R(cx + 5, hy - 2, 2, 7, P.hairC); R(cx - 3, hy - 6, 4, 1, P.hairHi) }
    else if (P.hair === 'beanie') { R(cx - 6, hy - 7, 13, 5, P.hairC); R(cx - 6, hy - 3, 13, 2, P.hairHi); R(cx - 1, hy - 9, 3, 2, P.hairHi) }
    if (P.hoops) { R(cx - 7, hy + 2, 1, 2, GOLD); R(cx + 7, hy + 2, 1, 2, GOLD) }
    // face
    const e = s.eye || 'fwd', lx = s.lx || 0, ly = s.ly || 0
    for (const X of [cx - 2, cx + 2]) {
      if (e === 'shut') R(X - (X < cx ? 1 : 0), hy, 2, 1, INK)
      else if (e === 'laugh') { R(X - 1, hy, 1, 1, INK); R(X, hy - 1, 1, 1, INK); R(X + 1, hy, 1, 1, INK) }
      else if (e === 'wide') { R(X - 1, hy - 2, 2, 3, '#ffffff'); R(X - (X < cx ? 0 : 1) + (lx > 0 ? 0 : 0), hy - 1, 1, 2, INK) }
      else if (e === 'down') R(X, hy + 1, 1, 1, INK)
      else R(X + lx, hy - 1 + ly, 1, 2, INK)
    }
    if (P.glasses) { for (const g0 of [cx - 4, cx + 1]) { R(g0, hy - 2, 4, 1, INK); R(g0, hy + 1, 4, 1, INK); R(g0, hy - 2, 1, 4, INK); R(g0 + 3, hy - 2, 1, 4, INK) } }
    const m = s.mouth || null
    if (m === 'open' || (m === 'talk' && Math.sin(t * 15) > -0.2)) R(cx - 1, hy + 3, 3, 2, '#5a1830')
    else if (m === 'big') { R(cx - 2, hy + 3, 5, 2, '#5a1830'); R(cx - 1, hy + 4, 3, 1, PINK) }
    else if (m === 'smile' || m === 'talk') R(cx - 1, hy + 3, 3, 1, '#7a2a3a')
    else if (m === 'o') R(cx, hy + 3, 1, 2, '#5a1830')
    if (s.blush) { R(cx - 5, hy + 2, 1, 1, '#ff7aa0'); R(cx + 4, hy + 2, 1, 1, '#ff7aa0') }
  }
  /** arms + hands after the table (so they rest over it); hands = [[x, y], [x, y]] or null → resting */
  function arms(P, s) {
    const cx = Math.round(s.x), hy = Math.round(s.hy)
    const hands = s.hands || [[cx - 6, 75], [cx + 6, 75]]
    ;[[cx - 6, hy + 10], [cx + 6, hy + 10]].forEach(([sx, sy], i) => {
      const h = hands[i]; if (!h) return
      thick(sx, sy, h[0], h[1], P.top, 3); R(h[0] - 1, h[1] - 1, 3, 3, P.skin)
    })
  }
  function glass(gx, lvl, hi) {
    R(gx - 2, 66, 5, 9, '#bcd8f0'); R(gx - 1, 67, 3, 7, '#e8f4ff')
    const h = Math.round(clamp(lvl) * 6)
    if (h > 0) { R(gx - 1, 74 - h, 3, h, '#4aa8f0'); R(gx - 1, 74 - h, 3, 1, '#9fe0ff') }
    R(gx - 2, 66, 1, 9, '#ffffff')
    if (hi) { R(gx - 3, 65, 7, 1, '#fff6c8') }
  }
  function pitcher(px, py, tilt) {
    // a little water jug (tilt 0…1 pours to the left)
    const o = Math.round(tilt * 2)
    R(px - 4, py - 6 + o, 9, 11, INK); R(px + 4, py - 4 + o, 3, 7, INK)
    R(px - 3, py - 5 + o, 7, 9, '#bcd8f0'); R(px - 2, py - 4 + o, 5, 7, '#e8f4ff'); R(px - 2, py - 1 + o, 5, 4, '#4aa8f0')
    R(px + 4, py - 3 + o, 2, 5, '#bcd8f0'); R(px - 4, py - 5 + o * 2, 2, 2, '#bcd8f0')
  }
  function bar(t, st) {
    // wall + shelves + neon + string lights
    R(0, 0, LW, LH, '#24152f'); R(0, 0, LW, 40, '#2e1b3c')
    for (let i = 0; i < LW; i += 8) { const on = ((i / 8 + Math.floor(t * 2)) % 3); R(i + 3, 3 + (i % 16 ? 1 : 0), 2, 2, ['#ffd95a', '#ff8fb1', '#7fe0ff'][on]) }
    R(0, 2, LW, 1, '#3d2a4e')
    // bottle shelves (generic, no labels)
    for (const sy of [14, 26]) {
      R(52, sy + 7, 48, 2, '#7d5438'); R(52, sy + 7, 48, 1, '#a07050')
      for (let k = 0; k < 8; k++) { const bx = 54 + k * 6, c = ['#3f8a5a', '#a0522d', '#c9a061', '#5a7ab8', '#8a2f3e', '#d8cfc2'][(k + sy) % 6], h = 5 + ((k * 7 + sy) % 3); R(bx, sy + 7 - h, 3, h, c); R(bx + 1, sy + 6 - h, 1, 1, c) }
    }
    // neon: a cocktail glass (left) and a heart (right), with soft glows
    const neon = (cx, cy, col, a) => { const g = l.createRadialGradient(cx, cy, 1, cx, cy, 16); g.addColorStop(0, `rgba(${hex(col).join(',')},${0.35 * a})`); g.addColorStop(1, 'rgba(0,0,0,0)'); l.fillStyle = g; l.fillRect(cx - 18, cy - 18, 36, 36) }
    const flick = 0.85 + 0.15 * Math.sin(t * 23) * Math.sin(t * 7)
    neon(19, 20, '#7fe0ff', flick)
    for (let i = 0; i < 11; i++) R(13 + i, 13 + Math.floor(Math.abs(i - 5) < 6 ? (5 - Math.abs(i - 5)) * 0 : 0), 1, 1, '#9ff0ff')
    thick(13, 13, 19, 20, '#9ff0ff', 1); thick(25, 13, 19, 20, '#9ff0ff', 1); R(13, 13, 13, 1, '#9ff0ff'); R(19, 20, 1, 6, '#9ff0ff'); R(16, 26, 7, 1, '#9ff0ff'); R(21, 15, 2, 2, '#ff8fb1')
    neon(133, 20, '#ff6fa0', flick)
    for (const [i, j] of [[129, 16], [130, 15], [131, 15], [132, 16], [133, 17], [134, 16], [135, 15], [136, 15], [137, 16], [137, 17], [137, 18], [136, 19], [135, 20], [134, 21], [133, 22], [132, 21], [131, 20], [130, 19], [129, 18], [129, 17]]) R(i, j, 1, 1, '#ff9ec0')
    // the booth bench
    R(4, 37, LW - 8, 40, '#6e2034'); R(4, 37, LW - 8, 2, '#9a3450'); R(4, 39, LW - 8, 1, '#b04a64')
    for (let j = 46; j < 72; j += 10) for (let i = 10; i < LW - 8; i += 11) R(i + ((j / 10) % 2 ? 5 : 0), j, 1, 1, '#4a1424')
    // the people
    const order = ['loud', 'niamh', 'you', 'quiet']
    for (const k of order) person(CAST[k], st[k], t)
    if (st.him) person(CAST.him, st.him, t)
    // table
    R(0, 74, LW, 4, '#8a5a3a'); R(0, 74, LW, 1, '#b47b4f'); R(0, 78, LW, 1, '#5a3626'); R(0, 79, LW, 25, '#3a2230')
    for (let i = 6; i < LW; i += 20) R(i, 80, 1, 24, '#2c1826')
    // glasses (the ones he refills) + his own
    for (const k of ['loud', 'niamh', 'you', 'quiet']) glass(GLASS_X[k], st.lvl[k], st.ring === k)
    if (st.him && st.him.hy >= HY - 1) glass(GLASS_X.him, 0.85, false)
    for (const k of order) arms(CAST[k], st[k])
    if (st.him) arms(CAST.him, st.him)
    // the pretend mic (the loud friend)
    if (st.mic) { const [mx, my] = st.mic; R(mx - 1, my - 4, 3, 3, '#d8d8e8'); R(mx - 1, my - 4, 3, 1, '#ffffff'); R(mx, my - 1, 1, 3, INK) }
    if (st.jug) pitcher(...st.jug)
    // his phone
    if (st.phone) { const [px, py, a] = st.phone; const g2 = l.createRadialGradient(px, py, 0, px, py, 8); g2.addColorStop(0, `rgba(140,230,255,${0.5 * a})`); g2.addColorStop(1, 'rgba(140,230,255,0)'); l.fillStyle = g2; l.fillRect(px - 9, py - 9, 18, 18); R(px - 1, py - 2, 3, 5, INK); R(px, py - 1, 1, 3, '#9be8ff') }
  }
  /** the per-time state of the picture */
  function barState(t) {
    const S = k => ({ x: SEAT[k], hy: HY, eye: 'fwd', lx: 0, ly: 0, mouth: 'smile' })
    const st = { loud: S('loud'), niamh: S('niamh'), you: S('you'), quiet: S('quiet'), him: null, lvl: { loud: 0.3, niamh: 0.25, you: 0.3, quiet: 0.2 }, ring: null }
    const blink = (o) => ((t + o) % 3.1) < 0.12
    st.quiet.eye = 'down'; st.quiet.mouth = null; st.quiet.hands = [[SEAT.quiet - 3, 72], [SEAT.quiet + 3, 72]]
    st.loud.mouth = 'talk'; st.loud.hands = [[SEAT.loud - 9, 66 + Math.round(Math.sin(t * 7) * 2)], [SEAT.loud + 6, 75]]
    st.niamh.hands = [[SEAT.niamh - 6, 75], [SEAT.niamh + 6, 70]]
    // the date walks in from the right, then sits next to you
    const ep = prog(t, ...T.enter)
    if (t >= T.enter[0]) {
      const walk = ep < 1, xh = lerp(170, SEAT.him, ease.outQuad(Math.min(1, ep * 1.08)))
      st.him = { x: xh, hy: walk ? 40 + Math.round(Math.abs(Math.sin(t * 9)) * 1) : HY, eye: 'fwd', lx: -1, mouth: 'smile', legs: false }
      if (walk) st.him.hands = [[xh - 6, 52], [xh + 8, 40 - Math.round(Math.abs(Math.sin(t * 10)) * 3)]]     // a little wave
      if (ep > 0.92 && ep < 1) st.him.hy = 44
    }
    // the friends turn their heads in sync to follow him in
    if (inR(t, T.turn, T.cut1)) { for (const k of ['loud', 'niamh', 'quiet']) { st[k].eye = 'wide'; st[k].lx = 1; st[k].mouth = 'o' } st.loud.hands = null; st.you.eye = 'fwd'; st.you.lx = 1; st.you.blush = true; st.you.mouth = 'smile' }
    if (inR(t, T.turn + 0.9, T.cut1)) { st.quiet.eye = 'down'; st.loud.eye = 'fwd'; st.loud.lx = 1; st.loud.mouth = 'talk' }
    if (t < T.turn) { if (blink(0)) st.you.eye = 'shut'; if (blink(1.3)) st.niamh.eye = 'shut' }
    if (t >= T.cut1 && t < T.cut2) {
      st.him.lx = -1
      // call 1: phone… into the pocket
      const pp = prog(t, ...T.pocket)
      if (t < T.pocket[1] + 0.1) {
        st.him.eye = pp < 0.5 ? 'down' : 'fwd'
        const hx = SEAT.him + 6, hy0 = 62, hy1 = 84
        const py = lerp(hy0, hy1, ease.inOutQuad(clamp((pp - 0.35) / 0.65)))
        st.him.hands = [[SEAT.him - 6, 75], [hx + 1, Math.min(py, 77)]]
        st.phone = py < 76 ? [hx + 1, py - 3, 1] : null
      }
      // call 2: he turns to the quiet friend
      if (inR(t, T.ask[0], T.niamh[0])) { st.him.lx = 1; st.him.mouth = t < T.ask[1] ? 'talk' : 'smile'; st.quiet.eye = t < T.bees[0] ? 'wide' : 'fwd'; st.quiet.lx = -1; st.quiet.mouth = t >= T.bees[0] ? 'talk' : 'o'; st.quiet.blush = t >= T.bees[0] }
      if (t >= T.bees[0]) { st.quiet.hands = [[SEAT.quiet - 9, 60 + Math.round(Math.sin(t * 9) * 2)], [SEAT.quiet + 9, 62 - Math.round(Math.sin(t * 9) * 2)]] }
      // call 3: "great to meet you, Niamh!"
      if (t >= T.niamh[0]) { st.him.lx = -1; st.him.mouth = t < T.niamh[0] + 1.3 ? 'talk' : 'smile'; st.niamh.eye = t < T.neev + 0.6 ? 'fwd' : 'wide'; st.niamh.lx = 1; st.niamh.mouth = t > T.neev + 0.6 ? 'o' : 'smile'; st.niamh.blush = t > T.neev + 0.6 }
      if (t >= T.st3) { for (const k of ['loud', 'niamh', 'quiet', 'you']) { st[k].eye = 'laugh'; st[k].mouth = 'big'; st[k].lx = 0 } st.him.mouth = 'smile'; st.him.blush = true; st.loud.hands = [[SEAT.loud - 9, 58], [SEAT.loud + 9, 58]] }
      if (blink(0.4) && !(t >= T.st3)) st.you.eye = 'shut'
      st.you.lx = 1; st.you.blush = true
    }
    // danger: the karaoke story
    if (t >= T.cut2 && t < T.cut3) {
      st.him.lx = -1; st.him.eye = 'fwd'
      const up = easeOutBack(prog(t, ...T.stand), 1.6)
      if (t < T.laugh + 1.8) {
        st.loud.hy = lerp(HY, 33, up); st.loud.legs = up > 0.5; st.loud.mouth = t >= T.story[0] ? 'talk' : 'big'; st.loud.eye = 'fwd'; st.loud.lx = 1
        st.loud.hands = [[SEAT.loud - 4, st.loud.hy + 8], [SEAT.loud + 14, st.loud.hy + 12]]    // mic up, pointing at you
        st.mic = [SEAT.loud - 4, st.loud.hy + 8]
      }
      const slow = inR(t, T.slo[0], T.laugh)
      if (slow) st.loud.mouth = Math.sin(t * 4) > 0 ? 'open' : 'smile'
      if (t >= T.hide && t < T.peek) { st.you.hy = HY + 3; st.you.eye = 'shut'; st.you.mouth = null; st.you.blush = true; st.you.hands = [[SEAT.you - 2, st.you.hy + 1], [SEAT.you + 3, st.you.hy + 1]] }
      for (const k of ['niamh', 'quiet']) { st[k].eye = t < T.laugh ? 'wide' : 'laugh'; st[k].lx = 1; st[k].mouth = t < T.laugh ? 'o' : 'big' }
      if (t < T.laugh) { st.him.mouth = null; st.him.eye = slow ? 'fwd' : 'fwd' }
      if (t >= T.laugh) {
        const b = Math.round(Math.abs(Math.sin(t * 12)) * 1.5)
        st.him.eye = 'laugh'; st.him.mouth = t > T.worse[0] && t < T.worse[0] + 1.4 ? 'talk' : 'big'; st.him.hy = HY - b
        st.you.hy = HY - Math.round(Math.abs(Math.sin(t * 12 + 1)) * 1.5)
        if (t >= T.peek) { st.you.eye = 'laugh'; st.you.mouth = 'big'; st.you.hands = null; st.you.blush = true }
      }
      if (t >= T.erupt) {
        for (const k of ['loud', 'niamh', 'quiet', 'you']) { st[k].eye = 'laugh'; st[k].mouth = 'big'; st[k].hy = (k === 'loud' ? st.loud.hy : HY) - Math.round(Math.abs(Math.sin(t * 12 + SEAT[k])) * 1.5) }
        st.niamh.hands = [[SEAT.niamh - 8, 58], [SEAT.niamh + 8, 58]]; st.quiet.hands = [[SEAT.quiet - 8, 60], [SEAT.quiet + 8, 60]]
      }
    }
    // the replay: he refills everyone's water
    if (t >= T.cut3 && t < T.cut4) {
      for (const k of ['loud', 'niamh', 'quiet', 'you']) { st[k].eye = 'fwd'; st[k].lx = 1; st[k].mouth = 'smile' }
      st.loud.hands = null; st.quiet.hands = [[SEAT.quiet - 3, 72], [SEAT.quiet + 3, 72]]
      let u = t < T.rew[1] ? 1 - prog(t, ...T.rew) : 0
      const tt = t < T.rew[1] ? lerp(T.pour[0], POURS[3] + 0.6, u) : Math.min(t, T.pause)
      st.him.hy = 46
      // pitcher route: over each glass, pour, move on
      let jx = SEAT.him + 8, jy = 64, tilt = 0
      POUR_ORDER.forEach((k, i) => {
        const t0 = POURS[i], f = prog(tt, t0 + 0.18, t0 + 0.6)
        st.lvl[k] = lerp(st.lvl[k], 1, ease.outQuad(f))
        if (tt >= t0 - 0.2) { const mv = ease.inOutQuad(prog(tt, t0 - 0.2, t0 + 0.12)); jx = lerp(jx, GLASS_X[k] + 4, mv); jy = 62; tilt = bump(tt, t0 + 0.1, 0.55) > 0 ? 1 : 0 }
      })
      if (tt > POURS[3] + 0.65) { const back = ease.inOutQuad(prog(tt, POURS[3] + 0.65, POURS[3] + 1.0)); jx = lerp(jx, SEAT.him + 8, back) }
      st.jug = [jx, jy, tilt]
      st.him.hands = [[SEAT.him - 6, 75], [jx + 4, jy - 1]]
      st.him.lx = jx < SEAT.him ? -1 : 0; st.him.eye = 'down'
      if (t >= T.pause) st.ring = null
      st.pouring = POUR_ORDER.find((k, i) => bump(tt, POURS[i] + 0.1, 0.55) > 0) || null
      if (st.pouring) { const gxp = GLASS_X[st.pouring]; st.stream = [gxp + 1, 63, 71 - Math.round(st.lvl[st.pouring] * 6)] }
    }
    if (t >= T.cut4) {
      for (const k of ['loud', 'niamh', 'quiet', 'you']) { st[k].eye = 'laugh'; st[k].mouth = 'big'; st.lvl[k] = 1 }
      st.loud.hands = null; st.him.eye = 'laugh'; st.him.mouth = 'big'; st.him.lx = 0; st.you.blush = true
    }
    return st
  }
  function drawBar(t) {
    const st = barState(t)
    bar(t, st)
    if (st.stream) { const [sx, y0, y1] = st.stream; R(sx, y0, 1, Math.max(1, y1 - y0), '#7fd0ff') }
    return st
  }

  // ═══════════════════════ the CRT picture + its overlays ═══════════════════════
  const rr = (X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
  function pill(X, Y, w, h, bg, txt, col, fs = 28) {
    const P = 4
    x.fillStyle = INK; x.fillRect(X + P, Y - P, w - 2 * P, h + 2 * P); x.fillRect(X - P, Y + P, w + 2 * P, h - 2 * P); x.fillRect(X, Y, w, h)
    x.fillStyle = bg; x.fillRect(X + P, Y, w - 2 * P, h); x.fillRect(X, Y + P, w, h - 2 * P)
    x.font = `700 ${fs}px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(txt, X + 16, Y + h / 2 + 1)
  }
  function chyron(t, txt, k = 1) {
    if (!txt || k <= 0) return
    const y = TV.sy0 + TV.sh - 60, h = 42
    x.save(); x.globalAlpha = k
    x.fillStyle = 'rgba(10,6,26,0.86)'; x.fillRect(TV.sx0, y, TV.sw, h)
    x.fillStyle = GOLD; x.fillRect(TV.sx0, y, 14, h); x.fillRect(TV.sx0, y, TV.sw, 3)
    x.font = `700 25px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = BONE
    x.fillText(txt.slice(0, Math.floor(clamp(k * 1.2) * txt.length + 0.5)), TV.sx0 + 34, y + h / 2 + 2)
    x.restore()
  }
  const CHY = [
    [T.on + 0.3, 'EP. 2 · THE FRIENDS'], [T.h1b, 'STARTING LINEUP'], [T.enter[0] + 0.2, 'THE DATE HAS ENTERED THE BAR'], [T.cut1, 'GREEN FLAG WATCH'],
    [T.cut2, 'BREAKING: THE KARAOKE STORY'], [T.laugh + 0.1, 'HE LAUGHED WITH HER'], [T.erupt, 'THE BAR GOES WILD'], [T.cut3, null], [T.cut4, 'SQUAD: APPROVED'], [T.read, null],
  ]
  function chyronAt(t) {
    let cur = null
    for (const c of CHY) if (t >= c[0]) cur = c
    if (!cur || !cur[1]) return
    chyron(t, cur[1], prog(t, cur[0], cur[0] + 0.45))
  }
  /** a speech bubble: centre (bx, by), tail pointing to (tx, ty) */
  function bubble(lines, bx, by, tx, ty, k, { fs = 32, col = INK, bg = '#fbf6ec' } = {}) {
    if (k <= 0.01) return
    x.save(); x.font = `700 ${fs}px ${MONO}`
    const w = Math.max(...lines.map(s => x.measureText(s).width)) + 44, h = lines.length * fs * 1.2 + 30
    x.translate(bx, by); x.scale(k, k)
    const ax = clamp(tx - bx, -w / 2 + 40, w / 2 - 40), dir = ty > by ? 1 : -1, ey = dir * h / 2
    x.fillStyle = INK; rr(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10, 18); x.fill()
    x.beginPath(); x.moveTo(ax - 18, ey); x.lineTo((tx - bx) * 0.55 + ax * 0.45, ey + dir * 46); x.lineTo(ax + 16, ey); x.fill()
    x.fillStyle = bg; rr(-w / 2, -h / 2, w, h, 14); x.fill()
    x.beginPath(); x.moveTo(ax - 12, ey - dir * 2); x.lineTo((tx - bx) * 0.5 + ax * 0.5, ey + dir * 34); x.lineTo(ax + 10, ey - dir * 2); x.fill()
    x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'
    lines.forEach((s, i) => x.fillText(s, 0, (i - (lines.length - 1) / 2) * fs * 1.2 + 2))
    x.restore()
  }
  const bubK = (t, [a, b]) => pop01(t, a, 0.3, 2.2) * (1 - ease.inQuad(prog(t, b - 0.18, b)))
  function tag(t, txt, cx, cy, t0, col, out) {
    const k = pop01(t, t0, 0.3, 2.6) * (1 - ease.inQuad(prog(t, ...out)))
    if (k <= 0.01) return
    x.save(); x.translate(cx, cy); x.scale(k, k)
    x.font = `700 24px ${MONO}`; const w = x.measureText(txt).width + 26, h = 38
    x.fillStyle = INK; x.fillRect(-w / 2 - 4, -h / 2 - 4, w + 8, h + 8)
    x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
    x.beginPath(); x.moveTo(-9, h / 2); x.lineTo(0, h / 2 + 12); x.lineTo(9, h / 2); x.fill()
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 2)
    x.restore()
  }
  /** the green ✓ stamp: slams down from big, squashes, settles */
  function stamp(t, t0, cx, cy, r, rot = -0.18, out = null) {
    const p = prog(t, t0, t0 + 0.16)
    if (p <= 0) return
    const o = out ? 1 - ease.inQuad(prog(t, ...out)) : 1
    if (o <= 0) return
    const land = t - t0 - 0.16
    const sc = p < 1 ? lerp(2.6, 1, ease.inCubic(p)) : 1 + 0.12 * Math.exp(-land * 9) * Math.cos(land * 30)
    x.save(); x.globalAlpha = clamp(p * 3) * o; x.translate(cx, cy); x.rotate(rot); x.scale(sc, sc)
    x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 6, 0, Math.PI * 2); x.fill()
    x.fillStyle = MINT; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
    x.strokeStyle = 'rgba(255,255,255,0.35)'; x.lineWidth = r * 0.08; x.beginPath(); x.arc(0, 0, r * 0.82, 0, Math.PI * 2); x.stroke()
    x.strokeStyle = '#ffffff'; x.lineWidth = r * 0.26; x.lineCap = 'round'; x.lineJoin = 'round'; x.beginPath(); x.moveTo(-r * 0.45, r * 0.04); x.lineTo(-r * 0.11, r * 0.38); x.lineTo(r * 0.5, -r * 0.36); x.stroke()
    x.restore()
    if (land > 0 && land < 0.6) sparkleRing(t, cx, cy, t0 + 0.16, 10, r * 1.5, 3, [MINT, BONE, GOLD])
  }
  function scoreBug(t) {
    if (!inR(t, T.cut1 + 0.2, T.cut2)) return
    const k = pop01(t, T.cut1 + 0.2, 0.3, 2.4) * (1 - prog(t, T.cut2 - 0.25, T.cut2 - 0.05))
    const n = (t >= T.st1 ? 1 : 0) + (t >= T.st2 ? 1 : 0) + (t >= T.st3 ? 1 : 0)
    const X = TV.sx0 + TV.sw - 300, Y = TV.sy0 + 22
    x.save(); x.translate(X + 135, Y + 23); x.scale(k, k); x.translate(-(X + 135), -(Y + 23))
    pill(X, Y, 270, 46, '#101828', 'FLAGS', BONE, 26)
    for (let i = 0; i < 3; i++) {
      const bx = X + 128 + i * 44, by = Y + 7, on = i < n
      const pk = on ? easeOutBack(prog(t, [T.st1, T.st2, T.st3][i], [T.st1, T.st2, T.st3][i] + 0.25), 3) : 1
      x.save(); x.translate(bx + 16, by + 16); x.scale(pk, pk)
      x.fillStyle = on ? MINT : '#2a3550'; x.fillRect(-16, -16, 32, 32)
      if (on) { x.strokeStyle = '#ffffff'; x.lineWidth = 5; x.lineCap = 'round'; x.beginPath(); x.moveTo(-8, 0); x.lineTo(-2, 7); x.lineTo(9, -7); x.stroke() }
      x.restore()
    }
    x.restore()
  }
  function crtLabel(t, txt, blinkOn = true, right = false) {
    x.font = `700 34px ${MONO}`; x.textAlign = right ? 'right' : 'left'; x.textBaseline = 'top'
    const X = right ? TV.sx0 + TV.sw - 30 : TV.sx0 + 30
    if (!blinkOn) return
    x.fillStyle = 'rgba(0,0,0,0.55)'; x.fillText(txt, X + 3, TV.sy0 + 25); x.fillStyle = '#ffffff'; x.fillText(txt, X, TV.sy0 + 22)
  }
  function vhs(t, rew) {
    x.fillStyle = 'rgba(70,110,220,0.14)'; x.fillRect(TV.sx0, TV.sy0, TV.sw, TV.sh)
    const r = rng(Math.floor(t * 24) + 7)
    const nb = rew ? 7 : 2
    for (let i = 0; i < nb; i++) {
      const yy = TV.sy0 + ((t * (rew ? 900 : 140) + i * 173 + r() * 30) % TV.sh)
      x.fillStyle = `rgba(255,255,255,${rew ? 0.28 : 0.14})`; x.fillRect(TV.sx0, yy, TV.sw, rew ? 6 : 3)
      for (let k = 0; k < 10; k++) { x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(TV.sx0 + r() * TV.sw, yy - 4 + r() * 8, 12 + r() * 40, 2) }
    }
  }
  function telestrator(t) {
    // a yellow circle round each glass as it fills (1, 2, 3, 4), then an arrow to him
    x.save(); x.lineCap = 'round'; x.lineJoin = 'round'
    POUR_ORDER.forEach((k, i) => {
      const t0 = POURS[i] + 0.35, p = prog(t, t0, t0 + 0.35)
      if (p <= 0) return
      const cx = SX(GLASS_X[k] + 0.5), cy = SY(70), r = 46
      const a0 = -2.2, a1 = a0 + p * Math.PI * 2.1
      for (const [lw, col] of [[14, INK], [8, '#ffe14a']]) {
        x.strokeStyle = col; x.lineWidth = lw; x.beginPath()
        for (let a = a0; a <= a1; a += 0.1) { const rr2 = r * (1 + 0.08 * Math.sin(a * 2.3 + i)); const px = cx + Math.cos(a) * rr2 * 0.9, py = cy + Math.sin(a) * rr2; a === a0 ? x.moveTo(px, py) : x.lineTo(px, py) }
        x.stroke()
      }
      const nk = easeOutBack(prog(t, t0 + 0.2, t0 + 0.45), 2.6)
      if (nk > 0) { x.save(); x.translate(cx + 30, cy - 58); x.scale(nk, nk); x.font = `700 36px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineWidth = 8; x.strokeStyle = INK; x.strokeText(String(i + 1), 0, 0); x.fillStyle = '#ffe14a'; x.fillText(String(i + 1), 0, 0); x.restore() }
    })
    x.restore()
  }
  function colourBars() {
    const cols = ['#c8c8c8', '#c8c800', '#00c8c8', '#00c800', '#c800c8', '#c80000', '#0000c8']
    const bw = LW / 7
    cols.forEach((c, i) => R(Math.round(i * bw), 0, Math.ceil(bw) + 1, 70, c))
    const cols2 = ['#0000c8', '#141414', '#c800c8', '#141414', '#00c8c8', '#141414', '#c8c8c8']
    cols2.forEach((c, i) => R(Math.round(i * bw), 70, Math.ceil(bw) + 1, 9, c))
    R(0, 79, LW, 25, '#101018'); R(0, 79, 26, 25, '#f0f0f0'); R(26, 79, 26, 25, '#2a1a6a')
  }
  function staticNoise(t) {
    const r = rng(Math.floor(t * 30) * 13 + 5), d = noiseImg.data
    for (let i = 0; i < d.length; i += 4) { const v = 40 + r() * 190; d[i] = v; d[i + 1] = v * 0.95; d[i + 2] = v * 1.05; d[i + 3] = 255 }
    l.putImageData(noiseImg, 0, 0)
  }
  // Ep. 1's answer cards (the "previously on" recap)
  function cardImg(img, body, cx, cy, wBody, rot = 0, sx = 1) {
    if (!img) return
    const w = wBody / body, h = w * img.height / img.width
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(sx, 1); x.drawImage(img, -w / 2, -h / 2, w, h); x.restore()
  }
  function answerFace(cx, cy, w, sx, stampK, rot = 0) {
    const h = w * 1.596
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(sx, 1)
    rr(-w / 2, -h / 2, w, h, 16); const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#2e1c62'); g.addColorStop(1, '#130a2e'); x.fillStyle = g; x.fill()
    x.lineWidth = 5; x.strokeStyle = GOLD; rr(-w / 2, -h / 2, w, h, 16); x.stroke()
    x.fillStyle = GOLD; x.font = `700 15px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('A N S W E R', 0, -h / 2 + 32)
    x.fillStyle = BONE; x.font = `italic 500 36px ${SERIF}`
    ;['Pineapple', 'belongs', 'on pizza.'].forEach((s, i) => x.fillText(s, 0, -h / 2 + 96 + i * 42))
    if (stampK > 0) {
      const k = easeOutBack(clamp(stampK), 2.6)
      x.save(); x.translate(0, h / 2 - 58); x.rotate(-0.18); x.scale(k, k)
      x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 38, 0, Math.PI * 2); x.fill()
      x.fillStyle = MINT; x.beginPath(); x.arc(0, 0, 33, 0, Math.PI * 2); x.fill()
      x.strokeStyle = '#ffffff'; x.lineWidth = 9; x.lineCap = 'round'; x.lineJoin = 'round'; x.beginPath(); x.moveTo(-15, 2); x.lineTo(-4, 14); x.lineTo(16, -12); x.stroke()
      x.restore()
    }
    x.restore()
  }
  function recap(t) {
    ;[[430, T.flipA, T.chkA, -0.05], [650, T.flipB, T.chkB, 0.05]].forEach(([cx, tf, tc, rot], i) => {
      const f = prog(t, tf, tf + 0.22), sx = Math.cos(f * Math.PI), cy = 780 + Math.sin(t * 2 + i) * 4, w = 180
      if (sx > 0) cardImg(BACK, BACK_BODY, cx, cy, w, rot, sx)
      else answerFace(cx, cy, w, -sx, prog(t, tc, tc + 0.25), rot)
      if (f > 0.5 && f < 1) sparkleRing(t, cx, cy, tf + 0.12, 8, 170, 1 + i)
    })
  }
  // the Push / Pull / Align reading, on the CRT
  const D2R = Math.PI / 180
  function reading(t) {
    const k = easeOutBack(prog(t, T.read + 0.1, T.read + 0.6), 1.6) * (1 - ease.inCubic(prog(t, T.next - 0.3, T.next - 0.05)))
    x.fillStyle = '#0d0820'; x.fillRect(TV.sx0, TV.sy0, TV.sw, TV.sh)
    const g = x.createRadialGradient(540, 780, 30, 540, 780, 420); g.addColorStop(0, 'rgba(143,216,246,0.16)'); g.addColorStop(1, 'rgba(143,216,246,0)'); x.fillStyle = g; x.fillRect(TV.sx0, TV.sy0, TV.sw, TV.sh)
    if (k <= 0) return
    const CHA = { x: 345, y: 740 }, CHB = { x: 735, y: 740 }, S = 0.27, RD = 330 * S
    for (const [side, P] of [[0, CHA], [1, CHB]]) {
      x.save(); x.translate(P.x, P.y); x.rotate((side ? -1 : 1) * t * 0.05); x.scale(S * k, S * k); drawWheelH(x, { W: { cx: 0, cy: 0, rOut: 460, rIn: 368, rGlyph: 414, alpha: 0.92 }, k: clamp(k) }); x.restore()
      x.save(); x.globalAlpha = clamp(k); x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE
      x.fillText(side ? 'THEM' : 'YOU', P.x, P.y + 2); x.restore()
    }
    const LN = [
      { a: -60, b: -120, apex: 600, col: READING.push, label: 'PUSH', t: T.read + 0.55, dim: true },
      { a: 50, b: 130, apex: 935, col: READING.pull, label: 'PULL', t: T.pullT, dim: false },
      { a: -14, b: -166, apex: 690, col: READING.align, label: 'ALIGN', t: T.read + 0.75, dim: true },
    ]
    for (const L of LN) {
      const A_ = { x: CHA.x + Math.cos(L.a * D2R) * RD * k, y: CHA.y + Math.sin(L.a * D2R) * RD * k }
      const B_ = { x: CHB.x + Math.cos(L.b * D2R) * RD * k, y: CHB.y + Math.sin(L.b * D2R) * RD * k }
      const cX = (A_.x + B_.x) / 2, cY = 2 * L.apex - (A_.y + B_.y) / 2
      const lk = ease.inOutCubic(prog(t, L.t, L.t + 0.5)) * clamp(k)
      if (lk <= 0) continue
      const pulse = L.dim ? 1 : 1 + 0.5 * Math.exp(-Math.max(0, t - L.t - 0.5) * 3) + 0.12 * Math.sin(t * 6)
      x.save(); x.globalAlpha = clamp(k) * (L.dim ? 0.35 : 1); x.strokeStyle = L.col; x.lineCap = 'round'; x.lineWidth = (L.dim ? 5 : 11) * pulse; x.shadowColor = L.col; x.shadowBlur = L.dim ? 0 : 26
      x.beginPath(); x.moveTo(A_.x, A_.y)
      const N = 40
      for (let s = 1; s <= Math.round(N * lk); s++) { const u = s / N, v = 1 - u; x.lineTo(v * v * A_.x + 2 * v * u * cX + u * u * B_.x, v * v * A_.y + 2 * v * u * cY + u * u * B_.y) }
      x.stroke(); x.restore()
      const ck = easeOutBack(prog(t, L.t + 0.35, L.t + 0.65), 2.4) * clamp(k)
      if (ck > 0) {
        const ax = cX * 0.5 + (A_.x + B_.x) * 0.25, ay = 0.5 * cY + 0.25 * (A_.y + B_.y)
        const big = !L.dim
        x.save(); x.globalAlpha = L.dim ? 0.55 : 1; x.translate(ax, ay); x.scale(ck * (big ? 1.25 : 0.8), ck * (big ? 1.25 : 0.8))
        x.font = `700 30px ${MONO}`; const tw = x.measureText(L.label).width + 40
        x.fillStyle = 'rgba(14,8,32,0.94)'; x.fillRect(-tw / 2, -24, tw, 48); x.fillStyle = L.col; x.fillRect(-tw / 2, -24, tw, 4); x.fillRect(-tw / 2, 20, tw, 4)
        x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(L.label, 0, 2); x.restore()
      }
      if (!L.dim) sparkleRing(t, B_.x, B_.y, L.t + 0.48, 8, 70, 5, [L.col, BONE])
    }
  }
  function nextWeek(t) {
    const k = pop01(t, T.next + 0.15, 0.32, 2)
    x.save(); x.translate(540, 760); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-300, -86, 600, 172); x.fillStyle = '#101018'; x.fillRect(-292, -78, 584, 156)
    x.fillStyle = GOLD; x.fillRect(-292, -78, 584, 5)
    x.font = `700 44px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#ffffff'; x.fillText('NEXT WEEK', 0, -28)
    x.font = `700 28px ${MONO}`; x.fillStyle = GOLD; x.fillText('EP. 3 · THE SECOND DATE', 0, 30)
    x.restore()
  }

  function drawScreen(t) {
    const { sx0, sy0, sw, sh } = TV
    let mode = 'bar'
    if (t < T.stat) mode = 'prev'
    else if (t < T.on) mode = 'static'
    else if (inR(t, T.cut3, T.cut4)) mode = 'replay'
    else if (inR(t, T.read, T.read + 0.14) || inR(t, T.next - 0.04, T.next + 0.1)) mode = 'static'
    else if (inR(t, T.read, T.next)) mode = 'read'
    else if (t >= T.next) mode = 'bars'
    l.setTransform(1, 0, 0, 1, 0, 0)
    let st = null
    if (mode === 'static') staticNoise(t)
    else if (mode === 'bars') colourBars()
    else if (mode === 'prev') { R(0, 0, LW, LH, '#3b2246'); R(0, 64, LW, 40, '#2d1838'); R(46, 66, 60, 3, '#8a5a3a') }
    else if (mode === 'bar' || mode === 'replay') st = drawBar(t)
    x.save()
    rr(sx0, sy0, sw, sh, 30); x.clip()
    if (mode !== 'read') { x.imageSmoothingEnabled = false; x.drawImage(low, sx0, sy0, sw, sh); x.imageSmoothingEnabled = true }
    // CRT switch-on: a bright line opening up
    const on = prog(t, T.on, T.on + 0.22)
    if (on > 0 && on < 1) {
      const hh = sh * ease.outCubic(on)
      x.fillStyle = '#05040c'; x.fillRect(sx0, sy0, sw, (sh - hh) / 2); x.fillRect(sx0, sy0 + (sh + hh) / 2, sw, (sh - hh) / 2)
      x.fillStyle = `rgba(255,255,255,${0.9 * (1 - on)})`; x.fillRect(sx0, sy0 + sh / 2 - hh / 2, sw, hh)
    }
    if (mode === 'prev') {
      vhs(t, false); x.fillStyle = 'rgba(8,5,20,0.45)'; x.fillRect(sx0, sy0, sw, sh)
      recap(t)
      crtLabel(t, '◀◀ PREVIOUSLY ON', Math.floor(t * 2.6) % 2 === 0 || t < 0.6)
      x.font = `700 24px ${MONO}`; x.textAlign = 'right'; x.textBaseline = 'bottom'; x.fillStyle = 'rgba(255,255,255,0.85)'; x.fillText('EP. 1', sx0 + sw - 30, sy0 + sh - 24)
    }
    if (mode === 'replay') {
      const rew = t < T.rew[1]
      vhs(t, rew)
      crtLabel(t, rew ? '◀◀ REWIND' : t >= T.pause ? '❚❚ REPLAY' : '▶ REPLAY')
      if (!rew && t < T.pause && Math.floor(t * 2.5) % 2 === 0) { x.font = `700 26px ${MONO}`; x.textAlign = 'right'; x.textBaseline = 'top'; x.fillStyle = '#ffffff'; x.fillText('SLO-MO', sx0 + sw - 30, sy0 + 30) }
      if (!rew) telestrator(t)
    }
    if (mode === 'bar') {
      // the slo-mo tint while the booth holds its breath
      const sk = clamp(prog(t, T.slo[0], T.slo[0] + 0.3)) * (1 - prog(t, T.laugh, T.laugh + 0.2))
      if (sk > 0) {
        x.fillStyle = `rgba(80,120,230,${0.16 * sk})`; x.fillRect(sx0, sy0, sw, sh)
        if (Math.floor(t * 2.2) % 2 === 0) { x.font = `700 30px ${MONO}`; x.textAlign = 'right'; x.textBaseline = 'top'; x.fillStyle = '#ffffff'; x.fillText('SLO-MO', sx0 + sw - 30, sy0 + 30) }
      }
      overlays(t, st)
    }
    if (mode === 'read') reading(t)
    if (mode === 'bars') nextWeek(t)
    // the LIVE bug (on the live bar picture)
    if (t >= T.on && mode === 'bar' && !(t >= T.cut4)) {
      const k = pop01(t, T.on + 0.1, 0.3, 2.4)
      x.save(); x.translate(sx0 + 26, sy0 + 22); x.scale(k, k)
      pill(0, 0, 150, 46, RED, '  LIVE', '#ffffff', 28)
      if (Math.floor(t * 1.6) % 2 === 0) { x.fillStyle = '#ffffff'; x.fillRect(16, 16, 14, 14); x.fillRect(14, 18, 18, 10); x.fillRect(18, 14, 10, 18) }
      x.restore()
    }
    if (mode === 'bar' || (mode === 'read' && false)) chyronAt(t)
    if (mode === 'bar' && t >= T.cut4) chyronAt(t)
    // glass: scanlines, vignette, glare
    x.fillStyle = 'rgba(0,0,0,0.13)'
    for (let yy = sy0; yy < sy0 + sh; yy += 5) x.fillRect(sx0, yy, sw, 2)
    const vg = x.createRadialGradient(TVC.x, sy0 + sh / 2, sh * 0.35, TVC.x, sy0 + sh / 2, sw * 0.68)
    vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,0.5)'); x.fillStyle = vg; x.fillRect(sx0, sy0, sw, sh)
    const gg = x.createLinearGradient(sx0, sy0, sx0 + sw * 0.6, sy0 + sh * 0.6)
    gg.addColorStop(0, 'rgba(255,255,255,0.13)'); gg.addColorStop(0.45, 'rgba(255,255,255,0.03)'); gg.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = gg; x.fillRect(sx0, sy0, sw, sh)
    x.restore()
  }
  /** full-res overlays on the live bar: lineup tags, bubbles, stamps, score bug, HA's */
  function overlays(t, st) {
    // the starting lineup
    const tagY = ly => SY(ly)
    ;[['LOUD', 'loud', 0, PINK, 27], ['NIAMH', 'niamh', 0.25, LAV, 37], ['YOU', 'you', 0.5, GOLD, 37], ['QUIET', 'quiet', 0.75, '#9cf08a', 35]].forEach(([txt, k, d, col, up]) => tag(t, txt, SX(SEAT[k] + 0.5), tagY(HY - up), T.tags + d, col, T.tagsOut))
    // call 1: the phone goes in the pocket → ✓
    stamp(t, T.st1, SX(SEAT.him + 6), SY(64), 44, -0.2, [T.cut2 - 0.3, T.cut2 - 0.1])
    // call 2
    bubble(['so what are', 'you into?'], 690, 655, SX(SEAT.him + 3), SY(HY - 6), bubK(t, T.ask))
    bubble(['…bees.'], 835, 668, SX(SEAT.quiet), SY(HY - 7), bubK(t, T.bees))
    stamp(t, T.st2, SX(SEAT.quiet), SY(66), 52, 0.16, [T.cut2 - 0.3, T.cut2 - 0.1])
    // call 3
    bubble(['great to meet', 'you, Niamh!'], 665, 655, SX(SEAT.him - 2), SY(HY - 6), bubK(t, T.niamh))
    tag(t, "it's 'NEEV'", SX(SEAT.niamh + 0.5), SY(HY - 13), T.neev, GOLD, [T.niamh[1] - 0.2, T.niamh[1]])
    stamp(t, T.st3, 540, 770, 150, -0.12, [T.cut2 - 0.45, T.cut2 - 0.15])
    scoreBug(t)
    // danger
    bubble(['ok so. THIS one.', 'karaoke night…'], 490, 650, SX(SEAT.loud + 2), SY(st && st.loud ? st.loud.hy - 7 : 30), bubK(t, T.story))
    bubble(["ha! mine's worse:", 'I fell off the stage.'], 650, 655, SX(SEAT.him), SY(HY - 7), bubK(t, T.worse))
    // HA HA HA
    if (inR(t, T.laugh, T.cut3 - 0.2)) {
      x.font = `700 36px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      for (let i = 0; i < 9; i++) {
        const t0 = T.laugh + i * 0.48, k = t - t0
        if (k < 0 || k > 1.1) continue
        const side = i % 2 ? 1 : -1, cx = SX(SEAT.him) + side * (70 + (i % 3) * 26) + (i > 3 ? -260 * (i % 2) : 0), cy = 760 - k * 110
        x.globalAlpha = Math.sin(Math.PI * k / 1.1)
        x.lineWidth = 7; x.strokeStyle = INK; x.strokeText('HA', cx, cy); x.fillStyle = i % 4 < 2 ? GOLD : PINK; x.fillText('HA', cx, cy)
      }
      x.globalAlpha = 1
    }
  }

  // ═══════════════════════ the cast ═══════════════════════
  function gemState(t) {
    let mood = 'neutral', look = [0, -1], squash = 0, blink, tears = 0
    if (t < T.on) { mood = 'sparkle'; look = [1, -1] }
    else if (t < T.l2) { mood = t < T.l1 ? 'happy' : 'sparkle'; look = [0, 0] }
    else if (t < T.turn) { look = [1, 0] }
    else if (t < T.cut1) { mood = 'wide'; look = [0, -1] }
    else if (t < T.st1) { mood = 'squint'; look = [0, -1] }
    else if (t < T.l5) { mood = 'happy' }
    else if (t < T.st2) { mood = 'sparkle'; look = [0, 0] }
    else if (t < T.l6) { mood = 'happy' }
    else if (t < T.st3) { mood = 'wide'; look = [1, 0] }
    else if (t < T.cut2) { mood = 'heart'; look = [0, 0] }
    else if (t < T.hold[0]) { mood = 'wide'; look = t < T.l7 ? [0, -1] : [0, 0] }
    else if (t < T.laugh) { mood = 'neutral'; blink = 1 }
    else if (t < T.erupt) { mood = 'wide'; look = [0, -1] }
    else if (t < T.cut3) { mood = 'heart'; look = [0, 0] }
    else if (t < T.dbl) { mood = 'squint'; look = [0, -1] }
    else if (t < T.cut4) { mood = 'wide'; look = [1, 0]; blink = false }
    else if (t < T.read) { mood = 'sparkle'; look = [0, -1]; tears = 1 }
    else if (t < T.next) { mood = 'sparkle'; look = t < T.l10 ? [0, -1] : [0, 0] }
    else if (t < T.lookP) { mood = 'happy' }
    else { mood = 'wide'; look = [1, -1] }
    return { mood, look, squash, blink, tears }
  }
  function sagState(t) {
    let mood = 'neutral', look = [0, -1], squash = 0, blink, tears = 0
    if (t < T.on) { mood = 'sparkle'; look = [-1, -1] }
    else if (t < T.l2) { mood = 'happy'; look = [-1, 0] }
    else if (t < T.turn) { mood = 'squint'; look = [0, 0] }
    else if (t < T.cut1) { mood = 'wide'; look = [0, -1] }
    else if (t < T.st1) { mood = 'neutral'; look = [0, 0] }
    else if (t < T.l5) { mood = 'happy' }
    else if (t < T.l6) { look = [-1, 0] }
    else if (t < T.st3) { mood = 'neutral'; look = [0, 0]; blink = false }
    else if (t < T.cut2) { mood = 'heart' }
    else if (t < T.hold[0]) { mood = 'wide'; look = [0, -1] }
    else if (t < T.laugh) { mood = 'neutral'; blink = 1 }
    else if (t < T.erupt) { mood = 'wide'; look = [0, -1] }
    else if (t < T.cut3) { mood = t % 1.1 < 0.55 ? 'happy' : 'heart' }
    else if (t < T.l9) { mood = 'squint'; look = [0, -1] }
    else if (t < T.tear) { mood = 'neutral'; look = [0, 0]; blink = false }
    else if (t < T.cut4) { mood = 'sparkle'; look = [0, 0]; tears = 1 }
    else if (t < T.read) { mood = 'sparkle'; look = [0, -1]; tears = 1 }
    else if (t < T.next) { mood = 'happy'; look = [-1, 0] }
    else if (t < T.lookP) { mood = 'happy' }
    else { mood = 'wide'; look = [1, -1] }
    return { mood, look, squash, blink, tears }
  }
  function pisState(t) {
    let mood = 'sparkle', look, tears = 0, squash = 0, tissue = 0
    if (t < T.on) { mood = 'sparkle'; look = [-1, 1]; tears = 2 }                        // still crying from last week
    else if (t < T.st3) { mood = 'sparkle'; look = [-1, 1]; tears = t > T.st1 ? 1 : 0 }
    else if (t < T.cut2) { mood = 'happy'; tears = 3; squash = 0.08 * Math.sin(t * 22) }
    else if (t < T.hold[0]) { mood = 'wide'; look = [-1, 1]; tears = 0 }
    else if (t < T.laugh) { mood = 'wide'; look = [-1, 1]; squash = 0.1 * holdK(t) }
    else if (t < T.erupt) { mood = 'sparkle'; look = [-1, 1]; tears = 2 }
    else if (t < T.cut3) { mood = 'happy'; tears = 3; squash = 0.08 * Math.sin(t * 22) }
    else if (t < T.cut4) { mood = 'sparkle'; look = [-1, 1]; tears = 1 }
    else if (t < T.read) { mood = 'happy'; tears = 2 }
    else if (t < T.next) { mood = 'heart' }
    else { mood = 'happy'; tears = t < T.honk - 0.4 ? 2 : 1; tissue = inR(t, T.honk - 0.35, T.honk + 0.75) ? 1 : 0; squash = 0.22 * bump(t, T.honk, 0.32) }
    return { mood, look, tears, squash, tissue }
  }

  function drawBoothStar(t, who, k) {
    const isG = who === 'g'
    const D = isG ? G_DESK : S_DESK, st = isG ? gemState(t) : sagState(t)
    const spk = isG ? talkWeight(t, GT) : talkWeight(t, ST)
    const both = talkWeight(t, BT)
    const gv = grooveAt(t)
    let sq = st.squash + gv.sq, dy = gv.dy
    // hold the breath: puffed up wide, then the big exhale (stretch)
    const hk = holdK(t)
    sq += hk * (0.16 + 0.025 * Math.sin(t * 9))
    sq -= 0.22 * bump(t, T.laugh, 0.35)
    // giant stamp: the whole booth jolts
    if (inR(t, T.st3, T.st3 + 0.5)) { const d = t - T.st3; sq += 0.2 * Math.exp(-d * 9) * Math.cos(d * 24) }
    // erupt: big jumps
    if (inR(t, T.erupt, T.erupt + 0.7)) { const p = prog(t, T.erupt, T.erupt + 0.7); dy -= Math.sin(Math.PI * p) * 230; sq -= 0.1 * Math.sin(Math.PI * p) }
    // the double-take: Gemini snaps round to the crying Sag
    let jx = 0
    if (isG && inR(t, T.dbl, T.dbl + 0.4)) jx = 10 * Math.sin((t - T.dbl) * 40) * Math.exp(-(t - T.dbl) * 8)
    const lean = (isG ? 1 : -1) * 16 * Math.max(spk, both)
    const hops = isG ? [...GEM_HOPS, ...BOOTH_HOPS, ...ERUPT_HOPS, ...CALL_HOPS, T.dbl] : [...SAG_HOPS, ...BOOTH_HOPS, ...ERUPT_HOPS.map(h => h + 0.12), ...CALL_HOPS.map(h => h + 0.08)]
    const base = isG ? GEM.color : SAG.color
    const bk = Math.round(blueK(t) * 8) / 8
    const color = bk > 0 ? mixHex(base, '#78a8ff', 0.75 * bk) : base
    const opts = { color, glyph: isG ? GEM.glyph : SAG.glyph, mood: st.mood, look: st.look, blink: st.blink, squash: sq, hops, seed: isG ? 3 : 8, pop: k, bob: 0, glow: 0.9, blush: hk > 0.5 ? 1 : undefined }
    x.save(); x.translate(D.x + lean + jx, D.y + dy)
    drawStarChar(x, 0, 0, D.s, t, opts)
    const F = starFrame(0, 0, D.s, t, opts)
    inSprite(x, F, () => headsetCells(x, isG ? GC : '#b07cff'))
    if (st.tears) inSprite(x, F, () => tearsCells(x, t, st.tears))
    x.restore()
    // the breath-hold: a tiny sweat bead; the exhale: PHEW
    if (hk > 0.6) { const ph = ((t * 0.9 + (isG ? 0 : 0.5)) % 1); x.save(); x.globalAlpha = Math.sin(Math.PI * ph); x.fillStyle = INK; x.fillRect(D.x + (isG ? 92 : -100) - 2, D.y - 120 + ph * 50 - 2, 16, 22); x.fillStyle = '#8fe3ff'; x.fillRect(D.x + (isG ? 92 : -100), D.y - 120 + ph * 50, 12, 18); x.restore() }
    const pk = t - T.laugh
    if (pk > 0 && pk < 1.3) {
      const p = easeOutBack(prog(pk, 0, 0.25), 3), a = 1 - prog(pk, 1.0, 1.3)
      x.save(); x.globalAlpha = a; x.translate(D.x + (isG ? 40 : -40), D.y - 190 - pk * 30); x.rotate(isG ? -0.12 : 0.12); x.scale(p, p)
      x.font = `700 46px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.lineWidth = 10; x.strokeStyle = INK; x.strokeText('PHEW', 0, 0); x.fillStyle = BONE; x.fillText('PHEW', 0, 0)
      x.restore()
    }
  }
  function drawPisces(t, k, tvDy) {
    const st = pisState(t)
    const y = TV.y0 + tvDy - 60
    const opts = { color: PIS.color, glyph: PIS.glyph, mood: st.mood, look: st.look, squash: st.squash, seed: 12, pop: k, bob: 0, glow: 0.8 }
    drawStarChar(x, PIS_AT.x, y, PIS_AT.s, t, opts)
    const F = starFrame(PIS_AT.x, y, PIS_AT.s, t, opts)
    if (st.tears) inSprite(x, F, () => tearsCells(x, t, st.tears))
    if (st.tissue) inSprite(x, F, () => tissueCells(x, 1))
    const hk = t - T.honk
    if (hk > 0 && hk < 1.2) {
      const p = easeOutBack(prog(hk, 0, 0.25), 3), a = 1 - prog(hk, 0.9, 1.2)
      x.save(); x.globalAlpha = a; x.translate(PIS_AT.x - 175, y + 18 - hk * 14); x.rotate(-0.1); x.scale(p, p)
      x.font = `700 58px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.lineWidth = 12; x.strokeStyle = INK; x.strokeText('HONK!', 0, 0); x.fillStyle = BONE; x.fillText('HONK!', 0, 0)
      x.restore()
    }
    // the giant stamp: SOB
    const sk = t - T.st3 - 0.25
    if (sk > 0 && sk < 1.5) {
      const p = easeOutBack(prog(sk, 0, 0.25), 3), a = 1 - prog(sk, 1.2, 1.5)
      x.save(); x.globalAlpha = a; x.translate(PIS_AT.x - 190, y + 70 - sk * 16); x.rotate(-0.12); x.scale(p, p)
      x.font = `700 54px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.lineWidth = 12; x.strokeStyle = INK; x.strokeText('SOB!', 0, 0); x.fillStyle = '#8fe3ff'; x.fillText('SOB!', 0, 0)
      x.restore()
    }
  }

  function sparkleRing(t, cx, cy, t0, n, R0, seed, cols = [GOLD, BONE, PINK, LAV]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R0 * (0.7 + 0.5 * p), cy + Math.sin(a) * R0 * (0.7 + 0.5 * p), 28 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      const outP = popOut(t, T.out)
      if (t < T.out[1] + 0.02) {
        const tvDy = Math.sin(t * 1.5) * 6
        // the TV (+ a jolt on the giant stamp, + a slow push during the breath-hold)
        const tvK = pop01(t, T.tvIn, 0.42, 1.7) * outP
        const shake = inR(t, T.st3, T.st3 + 0.45) ? 14 * Math.sin((t - T.st3) * 60) * Math.exp(-(t - T.st3) * 7) : 0
        const push = 1 + 0.06 * holdK(t)
        if (tvK > 0.01) {
          x.save(); x.translate(TVC.x + shake, TVC.y + tvDy); x.scale(tvK * push, tvK * push); x.translate(-TVC.x, -TVC.y)
          drawTV(x, TV, t, { led: 'CH 05', antennaWiggle: inR(t, T.erupt, T.erupt + 2) ? 1 - prog(t, T.erupt, T.erupt + 2) : Math.max(bump(t, T.st3, 0.5), bump(t, T.on, 0.4)) })
          drawScreen(t)
          x.restore()
        }
        if (t >= T.pisIn) { const pk = pop01(t, T.pisIn, 0.38, 2.2) * outP; if (pk > 0.02) drawPisces(t, pk, tvDy * tvK) }
        // the booth
        const micK = pop01(t, T.micIn, 0.34, 2) * outP
        const ang = -0.38 * talkWeight(t, GT) + 0.38 * talkWeight(t, ST)
        if (micK > 0.02) drawMic(x, MIC.x, MIC.y - (1 - micK) * 40, ang + (inR(t, T.erupt, T.erupt + 1) ? 0.5 * Math.sin((t - T.erupt) * 18) * (1 - prog(t, T.erupt, T.erupt + 1)) : 0), micK)
        const gk = pop01(t, T.gemIn, 0.36, 2.2) * outP, sk = pop01(t, T.sagIn, 0.36, 2.2) * outP
        if (gk > 0.02) drawBoothStar(t, 'g', gk)
        if (sk > 0.02) drawBoothStar(t, 's', sk)
        const dk = pop01(t, T.deskIn, 0.36, 1.8) * outP
        if (dk > 0.02) { x.save(); x.translate(540, DESK.y + DESK.h); x.scale(dk, dk); x.translate(-540, -(DESK.y + DESK.h)); drawDesk(x, DESK.x0, DESK.x1, DESK.y, DESK.h); x.restore() }
        confetti(x, t, T.erupt, { x0: 540, y0: 1330, n: 90, seed: 3, life: 2.7 })
        confetti(x, t, T.st3 + 0.05, { x0: 540, y0: 1330, n: 40, seed: 5, spread: 0.8, up: 0.8, life: 3 })
      }
      for (const b of boxes) b.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: every beat change. The default selection keeps 4 of these 9 (indices 1, 3, 5, 7):
// 10.75 (→ green flags), 23.4 (→ the karaoke story), 33.93 (→ instant replay), 40.6 (→ LESSON UNLOCKED). End card flips at 55.6.
export const CUTS = [6.68, T.cut1, 14.8, T.cut2, T.erupt, T.cut3, 37.0, T.cut4, T.read]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pop / pluck / bell are shifted into the film's key by the engine; chip notes are written in D minor)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.026) => [...wordPops(t0, n, 0.08, base, gain), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
const FXO = { rev: 0, dly: 0, bus: 'fx' }
const scratch = t0 => [['chip', t0, 1600, 0.08, { wave: 'noise', slide: 70, gain: 0.05, decay: 0.05, sustain: 0.8, ...FXO }], ['chip', t0 + 0.09, 5200, 0.14, { wave: 'noise', slide: -60, gain: 0.045, decay: 0.08, sustain: 0.7, ...FXO }]]
const stampSfx = (t0, big = false) => [['pop', t0 + 0.15, big ? 90 : 130, big ? 0.1 : 0.08, 0], ['tick', t0 + 0.15, 0.07], ['chip', t0 + 0.15, 900, 0.06, { wave: 'noise', gain: big ? 0.05 : 0.03, decay: 0.04, sustain: 0.3, ...FXO }], ['bell', t0 + 0.2, 1318.51, big ? 0.035 : 0.025, 1.0, 0], ...(big ? [['boom', t0 + 0.15, 0.22]] : [])]
const claps = (t0, t1, seed) => { const r = rng(seed), out = []; for (let t = t0; t < t1; t += 0.035 + r() * 0.05) { const p = (t - t0) / (t1 - t0); out.push(['clap', +t.toFixed(3), { gain: (0.11 + r() * 0.06) * (1 - p * 0.85), pan: r() * 1.4 - 0.7, rev: 0.25, bus: 'fx' }]) } return out }
const honk = t0 => [['brass', t0, [174.61, 185], 0.34, { gain: 0.06, bright: 1.5, rev: 0.12, bus: 'fx' }], ['lead', t0, 180, 0.32, { wave: 'saw', gain: 0.05, cutoff: 1500, env: 800, vib: 0.03, vibRate: 32, decay: 0.2, sustain: 0.9, release: 0.06, rev: 0.1, dly: 0, bus: 'fx' }]]
const sob = t0 => [0, 0.22, 0.44].map((d, i) => ['chip', +(t0 + d).toFixed(3), 880 - i * 60, 0.18, { duty: 0.25, slide: -6, vib: 0.05, gain: 0.016, decay: 0.15, sustain: 0.6, pan: 0.5, rev: 0.2, dly: 0, bus: 'fx' }])
const pour = t0 => [['chip', t0, 2400, 0.5, { wave: 'noise', slide: -4, gain: 0.012, decay: 0.4, sustain: 0.7, ...FXO }], ['pluck', t0 + 0.35, 1318.51, 0.02, 0.3, 0]]
export const CUES = [
  // 0 · previously on
  ...wordPops(T.h0, 2, 0.12, 0), ['pop', T.h0 + 0.12, 1174.66, 0.04, 0],
  ['chip', 0.1, 220, 0.45, { duty: 0.5, slide: 30, gain: 0.01, decay: 0.4, sustain: 0.8, ...FXO }],
  ['pop', T.tvIn + 0.05, 330, 0.04, 0], ['pop', T.gemIn + 0.12, 784, 0.03, -0.3], ['pop', T.sagIn + 0.12, 659.25, 0.03, 0.3], ['pop', T.pisIn + 0.12, 988, 0.025, 0.4],
  ...[T.flipA, T.flipB].map(tf => ['tick', tf + 0.1, 0.05]), ['bell', T.flipA + 0.15, 1318.51, 0.03, 1.2, 0], ['glitter', T.flipA + 0.1, T.flipA + 0.6],
  ['pluck', T.chkA + 0.05, 1174.66, 0.035, 0.4, -0.3], ['pluck', T.chkB + 0.05, 1318.51, 0.035, 0.4, 0.3],
  ['chip', T.stat, 7000, T.on - T.stat, { wave: 'noise', gain: 0.02, decay: 1, sustain: 1, ...FXO }],
  // 1 · we're back
  ['pop', T.on, 1174.66, 0.04, 0], ['bell', T.on + 0.02, 1760, 0.025, 0.8, 0], ['tick', T.on, 0.05],
  ...head(T.h1, 4, T.h1Land, 2),
  ...talkCues(ALL_LINES, { cps: CPS, pitch: { [GT]: 1100, [ST]: 760, [BT]: 900 } }),
  ...head(T.h1b, 3, T.h1bLand, 0),
  ...[0, 0.25, 0.5, 0.75].map((d, i) => ['pop', +(T.tags + d + 0.05).toFixed(3), NOTE[(i * 2) % 7], 0.03, -0.45 + i * 0.3]),
  ['whoosh', T.enter[0], 0.6, 0.025], ['pop', T.turn, 523.25, 0.035, 0.3], ['pop', T.turn + 0.05, 587.33, 0.03, 0], ['pop', T.turn + 0.1, 659.25, 0.03, -0.3],
  // 2 · green flags
  ...head(T.h2a, 2, T.h2aLand, 1), ['whoosh', T.pocket[0] + 0.3, 0.4, 0.02], ...stampSfx(T.st1),
  ...head(T.h2b, 2, T.h2bLand, 3), ['pop', T.ask[0] + 0.05, 659.25, 0.03, 0.3], ['pop', T.bees[0] + 0.05, 880, 0.03, 0.4], ...stampSfx(T.st2),
  ...wordPops(T.h2c, 2, 0.08, 1), ['pop', T.niamh[0] + 0.05, 659.25, 0.03, -0.2], ['pop', T.neev + 0.05, 987.77, 0.03, -0.3],
  ['pop', T.hat, 1174.66, 0.05, 0], ['pluck', T.hat, 1174.66, 0.04, 0.6, 0], ['pop', T.hat + 0.12, 1318.51, 0.045, 0],
  ...stampSfx(T.st3 - 0.15, true), ['glitter', T.st3 + 0.05, T.st3 + 0.7], ...sob(T.st3 + 0.3),
  // 3 · the karaoke story
  ...head(T.h3, 4, T.h3Land, 4), ['pop', T.stand[0] + 0.1, 392, 0.04, -0.4], ['pop', T.story[0] + 0.05, 784, 0.03, -0.3], ['whoosh', T.hide, 0.3, 0.02],
  ...scratch(T.slo[0] - 0.1), ['tapeStop', T.slo[0], T.slo[1] - T.slo[0]],
  ...Array.from({ length: 4 }, (_, i) => ['pop', +(T.hold[0] + 0.3 + i * 0.68).toFixed(3), 75, 0.06, 0]),          // heartbeat in the silence
  ...Array.from({ length: 4 }, (_, i) => ['pop', +(T.hold[0] + 0.45 + i * 0.68).toFixed(3), 70, 0.045, 0]),
  ['whoosh', T.laugh, 0.5, 0.04], ...Array.from({ length: 6 }, (_, i) => ['pop', +(T.laugh + 0.05 + i * 0.16).toFixed(3), NOTE[(i * 2 + 2) % 7], 0.03, i % 2 ? 0.3 : -0.1]),
  ...wordPops(T.h3b, 4, 0.1, 2), ['pop', T.worse[0] + 0.05, 659.25, 0.03, 0.3],
  // 4 · the booth erupts
  ['swell', T.erupt - 0.7, T.erupt, { gain: 0.05, f0: 600, f1: 4000 }], ['glitter', T.erupt, T.erupt + 0.8],
  ...Array.from({ length: 10 }, (_, i) => ['pop', +(T.erupt + 0.02 + i * 0.03).toFixed(3), NOTE[(i * 3) % 7], 0.03, +(((i % 5) / 4 - 0.5) * 1.2).toFixed(2)]),
  ...claps(T.erupt + 0.1, T.erupt + 2.6, 11),
  ['chip', T.erupt + 0.4, 1046.5 * 2 ** (5 / 12), 1.0, { duty: 0.25, slide: -5, vib: 0.035, gain: 0.012, decay: 0.8, sustain: 0.8, pan: 0.5, rev: 0.25, dly: 0.1, bus: 'fx' }],
  // 5 · instant replay
  ['chip', T.rew[0] + 0.05, 220, 0.55, { duty: 0.5, slide: 30, gain: 0.012, decay: 0.6, sustain: 0.8, ...FXO }],
  ...Array.from({ length: 7 }, (_, i) => ['tick', +(T.rew[0] + 0.05 + i * 0.08).toFixed(3), 0.025]),
  ...head(T.h4, 2, T.h4Land, 3),
  ...POURS.flatMap((p, i) => [...pour(p + 0.1), ['pop', +(p + 0.55).toFixed(3), NOTE[(i * 2 + 1) % 7], 0.035, -0.3 + i * 0.2]]),
  ['tick', T.pause, 0.05], ['pop', T.pause, 523.25, 0.03, 0],
  ['chip', T.tear, 1318.51, 0.3, { duty: 0.25, slide: -3, gain: 0.014, decay: 0.25, sustain: 0.4, pan: 0.4, rev: 0.3, dly: 0.1, bus: 'fx' }],
  ...scratch(T.dbl), ['pop', T.dbl + 0.05, 988, 0.035, -0.3],
  // 6 · LESSON UNLOCKED
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  // 7 · the reading
  ['chip', T.read, 5000, 0.14, { wave: 'noise', gain: 0.02, decay: 0.1, sustain: 0.8, ...FXO }],
  ...wordPops(T.h5, 3, 0.16, 0, 0.03), ['whoosh', T.pullT, 0.5, 0.035], ['bell', T.pullT + 0.5, 1318.51, 0.035, 1.4, 0.2], ['glitter', T.pullT + 0.45, T.pullT + 1.0],
  // 8 · to be continued
  ['chip', T.next - 0.04, 5000, 0.14, { wave: 'noise', gain: 0.02, decay: 0.1, sustain: 0.8, ...FXO }],
  ['chip', T.next + 0.15, 1000, 0.4, { wave: 'tri', gain: 0.012, decay: 1, sustain: 1, ...FXO }],
  ...head(T.h6, 2, T.h6Land, 2),
  ...honk(T.honk), ['pop', T.lookP, 880, 0.03, 0.4], ['pop', T.lookP + 0.06, 1046.5, 0.025, 0.4],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
