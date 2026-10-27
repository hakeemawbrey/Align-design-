// stlive5th — "Live from Your 5th House" (60 s vertical Align ad, Star Talk season 2 #2, music: funk).
// Story 0–55.6, then the shared end card ("come" + the Align logo).
//   0.00–4.2   "The stars are | watching | your *date.*"  A chunky CRT floats in the nebula (static), a red ● LIVE bug.
//              The booth: ♊ GEMINI and ♐ SAG in pixel headsets behind a desk, one shared mic (it swivels to whoever
//              talks). ♓ PISCES sits on top of the TV. Gemini taps the mic… on the drop (1.71) the TV clicks on:
//              GEMINI: "AND WE'RE LIVE from your 5th house!"  (chyron: 5TH HOUSE · ROMANCE & FUN)
//   4.2–10.6   "Table for *two.*"  On the CRT: two pixel people at a café window table, she stirs her tea. The booth
//              bobs to the groove. GEMINI: "First date, folks! Window table!" → SAG: "She's been stirring that tea a while."
//  10.75       card cut.
//  10.85–16.2  "Round one: | the *résumé.*"  A speech bubble: "so… what do you do?" Record scratch: the booth FREEZES
//              mid-bob (in the air)… then drops. SAG: "Oh no. Small talk." → GEMINI: "We're losing them, folks."
//  16.2–21.0   "Dead *air.*"  The box shuts. Silence-ish (the groove thins), crickets, a tumbleweed rolls across the café
//              table. The booth slowly turns to look at each other; one synced blink. Pisces starts crying early, just in case.
//  21.15       card cut.
//  21.25–27.2  "Instant *replay.*"  VHS: ◀◀ REWIND, ▶ REPLAY in slo-mo, zoomed on her: the phone check under the table.
//              ❚❚ freeze-frame, Sag's telestrator circles the phone. SAG (deadpan): "Phone check. Under the table. Brutal." womp.
//  27.27–33.8  "“What’s a hill | you’ll *die on?”*"  A talk card slides onto the table (insert: the real card, big).
//              GEMINI: "A TALK CARD!" → "Answers stay hidden till you both play!"  Each person plays one face-down.
//  33.94       card cut.
//  34.05–40.5  "The big *reveal.*"  The booth is pressed to the glass. Two face-down answer cards fill the screen, drumroll,
//              flip on the hit (37.27): both say "Pineapple belongs on pizza." ✓ ✓  SAG (flat): "…they said the same thing."
//  40.6–46.0   "That’s *chemistry.*"  The booth erupts: confetti, the headsets fly off; on screen the two are laughing.
//              GEMINI: "THEY'RE LAUGHING. ACTUALLY LAUGHING."  Pisces wails happily (fountain tears).
//  46.16       card cut.
//  46.3–51.0   ★ LESSON UNLOCKED (gold pixel banner, chiptune level-up, sparkle burst):
//              "Skip the résumé. | Ask what they’d | *defend.*"
//  51.1–55.5   "Stay *tuned.*"  The CRT shows colour bars (PLEASE STAND BY). Gemini dabs its eyes with a hankie.
//              THE BOOTH: "We'll be right back. We need a minute."  Pisces blows its nose: HONK. Everyone looks.
//              Everything pops out by 55.5; the end card takes over at 55.6.
// One canvas (sky + TV + booth), a low-res canvas for the CRT picture, DOM type + dialogue boxes + LESSON banner, grain.
// Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { starFrame, inSprite, cellToWorld, headsetCells, headsetWorld, tearsCells, tissueCells, hankieCells, drawMic, drawTV, drawDesk, pixelPanel, tumbleweedLow, confetti } from './props.js'

export const DURATION = 60
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', INK = '#1b1236', RED = '#e8344e'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const BL = 60 / 108
const BEAT = n => 0.6 + n * BL                // 108 bpm grid
const GEM = signStar('gemini'), SAG = signStar('sagittarius'), PIS = signStar('pisces')

// ── the timeline
const T = {
  black: [0, 0.3],
  tvIn: 0.18, deskIn: 0.32, gemIn: 0.45, sagIn: 0.58, micIn: 0.7, pisIn: 0.85, bug: 0.5,
  tap: [0.95, 1.13], on: BEAT(2),                                             // 1.711 the drop: the TV clicks on
  h0: 0.15, h0Land: 0.8, h0Out: [4.0, 4.2],
  l1: 1.25,
  h1: 4.3, h1Land: 4.6, h1Out: [10.3, 10.5], l2: 4.25, l3: 7.47, closeA: 10.5,
  cut1: 10.75,
  h2: 10.85, h2Land: 11.2, bubble: 11.05, freeze: 11.4, thud: 12.15, l4: 12.3, l5: 14.9, h2Out: [15.95, 16.15], closeB: 20.6, dots: 18.4,
  h3: 16.25, h3Land: 16.55, weed: [16.6, 20.5], crick: 16.45, turn: [18.25, 18.95], sync: 19.35, back: 20.0, pisCry: 18.95, h3Out: [20.75, 20.95],
  cut2: 21.15,
  h4: 21.25, h4Land: 21.6, rew: [21.15, 21.85], slo: [21.85, 23.5], pause: 23.55, tele: [23.7, 24.25], l7: 22.5, womp: 24.6, h4Out: [26.95, 27.15],
  lift1: BEAT(48),                                                             // 27.27
  card: [27.28, 27.62], h5: 27.35, h5Land: 27.9, l8: 27.6, ins: [27.75, 28.1], insOut: [29.5, 29.85], l9: 29.8, playA: 30.6, playB: 31.35, closeC: 33.45, h5Out: [33.55, 33.75],
  cut3: BEAT(60),                                                              // 33.94
  h6: 34.05, h6Land: 34.4, big: [34.0, 34.4], roll: [34.55, 37.2], flip: BEAT(66), l10: 38.0, home: [39.85, 40.5], h6Out: [40.25, 40.45],
  lift2: BEAT(72),                                                             // 40.6 the erupt
  h7: 40.65, h7Land: 41.0, hats: 40.62, l11: 41.0, wail: 43.0, closeD: 44.9, h7Out: [45.75, 45.95],
  cut4: BEAT(82),                                                              // 46.16
  banner: 46.3, lesson: 46.75, lessonLate: 47.35, lessonOut: [50.8, 51.0],
  bars: 51.1, h9: 51.25, h9Land: 51.55, l12: 51.6, dab: [51.9, 53.85], honk: 53.75, lookP: 53.95, closeE: 55.0, h9Out: [55.1, 55.35], out: [55.05, 55.5],
}
const GT = `${GEM.glyph}︎ GEMINI`, ST = `${SAG.glyph}︎ SAG`, BT = `${GEM.glyph}︎${SAG.glyph}︎ THE BOOTH`
const GC = '#ffd95a', SCOL = LAV
const LINES_A = [
  { t: T.l1, speaker: GT, color: GC, text: "AND WE'RE *LIVE* from your 5th house!" },
  { t: T.l2, speaker: GT, color: GC, text: 'First date, folks! *Window table!*' },
  { t: T.l3, speaker: ST, color: SCOL, text: "She's been stirring that tea *a while.*" },
]
const LINES_B = [
  { t: T.l4, speaker: ST, color: SCOL, text: 'Oh no. *Small talk.*' },
  { t: T.l5, speaker: GT, color: GC, text: "We're *losing them,* folks." },
  { t: T.dots, speaker: BT, color: GOLD, text: '.\u00a0\u00a0.\u00a0\u00a0.', silent: true },
]
const LINES_C = [
  { t: T.l7, speaker: ST, color: SCOL, text: 'Phone check. Under the table. *Brutal.*' },
  { t: T.l8, speaker: GT, color: GC, text: 'A *TALK CARD!*' },
  { t: T.l9, speaker: GT, color: GC, text: 'Answers stay *hidden* till you both play!' },
]
const LINES_D = [
  { t: T.l10, speaker: ST, color: SCOL, text: '…they said the *same thing.*' },
  { t: T.l11, speaker: GT, color: GC, text: "THEY'RE *LAUGHING.* ACTUALLY LAUGHING." },
]
const LINES_E = [
  { t: T.l12, speaker: BT, color: GOLD, text: "We'll be right back. We need a *minute.*" },
]
const ALL_LINES = [...LINES_A, ...LINES_B, ...LINES_C, ...LINES_D, ...LINES_E]
const CPS = 28
const ALL_LT = lineTimes(ALL_LINES, { cps: CPS })
const GEM_HOPS = talkHops(ALL_LINES, GT, { cps: CPS })
const SAG_HOPS = talkHops(ALL_LINES, ST, { cps: CPS })
const BOOTH_HOPS = talkHops(ALL_LINES.filter(L => !L.silent), BT, { cps: CPS })
const ERUPT_HOPS = [T.lift2 + 0.02, T.lift2 + BL * 2, T.lift2 + BL * 4, T.lift2 + BL * 6, T.lift2 + BL * 8]
const lineDone = L => ALL_LT[ALL_LINES.indexOf(L)].done

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const inR = (t, a, b) => t >= a && t < b
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }

/** springy word-by-word type: `*word*` = accent (Garamond italic, colour), `|` = line break; the last `late` words pop at lateAt */
function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0, late = 0, lateAt = null, lateGap = 0.1, wobble = false, lineHeight = 1.02 }) {
  const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color: BONE, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  const toks = text.split(' '), nW = toks.filter(w => w !== '|').length
  const ws = []
  let n = 0
  toks.forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.12em', opacity: 0, transformOrigin: '50% 85%' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
    const big = late > 0 && n >= nW - late
    ws.push({ t: big ? lateAt + (n - (nW - late)) * lateGap : t0 + n * gap, big, e: el('span', style, box, w.replace(/\*/g, '')) })
    n++
  })
  return {
    update(t, out = 1) {
      box.style.display = out <= 0 || t < t0 ? 'none' : 'block'
      if (box.style.display === 'none') return
      for (const w of ws) {
        const p = prog(t, w.t, w.t + (w.big ? 0.4 : 0.28))
        const sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        const rot = w.big && wobble && t > w.t ? 9 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) : 0
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}

// ── geometry
const TV = { x0: 120, y0: 500, w: 840, h: 660, sx0: 160, sy0: 530, sw: 760, sh: 520 }
const TVC = { x: 540, y: 830 }
const LW = 152, LH = 104, PS = 5                       // the CRT picture: 152×104 low-res pixels at 5 px
const DESK = { x0: 140, x1: 940, y: 1392, h: 74 }
const G_DESK = { x: 300, y: 1278, s: 250 }, S_DESK = { x: 780, y: 1278, s: 250 }
const G_GLASS = { x: 205, y: 1092, s: 300, r: 0.16 }, S_GLASS = { x: 875, y: 1092, s: 300, r: -0.16 }
const PIS_AT = { x: 858, s: 148 }
const MIC = { x: 540, y: DESK.y }
const SCRX = lx => TV.sx0 + lx * PS, SCRY = ly => TV.sy0 + ly * PS

// grooving: the booth nods on every beat while the band plays
const GROOVE = [[T.on, T.freeze], [T.lift1, T.cut3 - 0.1], [T.lift2 + 0.6, T.cut4 - 0.05]]
function grooveAt(t) {
  let tt = t, on = GROOVE.some(([a, b]) => inR(t, a, b))
  if (inR(t, T.freeze, T.thud)) { tt = T.freeze; on = true }                  // frozen mid-bob, in the air
  if (!on) return { dy: 0, sq: 0 }
  const ph = (((tt - 0.6) / BL) % 1 + 1) % 1
  return { dy: -11 * Math.sin(Math.PI * ph) ** 2, sq: inR(t, T.freeze, T.thud) ? 0 : 0.05 * Math.exp(-ph * 12) }
}

// mic swivel + lean toward whoever talks
function talkWeight(t, who) {
  let w = 0
  ALL_LINES.forEach((L, i) => {
    const s = L.speaker === who || (who === 'both' && L.speaker === BT)
    if (!s || L.silent) return
    w = Math.max(w, prog(t, L.t - 0.25, L.t) * (1 - prog(t, ALL_LT[i].done + 0.4, ALL_LT[i].done + 0.8)))
  })
  return ease.inOutQuad(w)
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 40px Inter", "italic 500 190px 'EB Garamond'", "italic 500 44px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const [backIm, talkIm] = await Promise.all([loadImg('card-back.png'), loadImg('card-talk-1.png')])
  const BACK = bake(backIm, 420), TALK = bake(talkIm, 640)
  const BACK_BODY = 1320 / 1528, TALK_BODY = 610 / 732          // opaque card body / png width

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const low = document.createElement('canvas'); low.width = LW; low.height = LH
  const l = low.getContext('2d')
  const noiseImg = l.createImageData(LW, LH)

  // ── type
  const H0 = popText(root, 'The stars are | watching | your *date.*', { top: 118, size: 88, accentSize: 140, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, gap: 0.09, accentColor: PINK, lineHeight: 1.0 })
  const H1 = popText(root, 'Table for *two.*', { top: 168, size: 112, accentSize: 164, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: PINK })
  const H2 = popText(root, 'Round one: | the *résumé.*', { top: 128, size: 100, accentSize: 140, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const H3 = popText(root, 'Dead *air.*', { top: 160, size: 124, accentSize: 180, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: LAV })
  const H4 = popText(root, 'Instant *replay.*', { top: 168, size: 112, accentSize: 164, at: T.h4, late: 1, lateAt: T.h4Land, wobble: true, accentColor: '#7fe0ff' })
  const H5 = popText(root, '“What’s a hill | you’ll *die on?”*', { top: 128, size: 96, accentSize: 130, at: T.h5, late: 2, lateAt: T.h5Land, lateGap: 0.14, wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const H6 = popText(root, 'The big *reveal.*', { top: 168, size: 112, accentSize: 164, at: T.h6, late: 1, lateAt: T.h6Land, wobble: true, accentColor: PINK })
  const H7 = popText(root, 'That’s *chemistry.*', { top: 168, size: 104, accentSize: 156, at: T.h7, late: 1, lateAt: T.h7Land, wobble: true, accentColor: GOLD })
  const H9 = popText(root, 'Stay *tuned.*', { top: 168, size: 120, accentSize: 172, at: T.h9, late: 1, lateAt: T.h9Land, wobble: true, accentColor: LAV })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [H6, T.h6Out], [H7, T.h7Out], [H9, T.h9Out]]
  const BOX = { y: 1500, width: 960, height: 250, cps: CPS }
  const boxes = [
    dialogueBox(root, { ...BOX, lines: LINES_A, open: T.l1 - 0.25, close: T.closeA }),
    dialogueBox(root, { ...BOX, lines: LINES_B, open: T.l4 - 0.25, close: T.closeB }),
    dialogueBox(root, { ...BOX, lines: LINES_C, open: T.l7 - 0.25, close: T.closeC }),
    dialogueBox(root, { ...BOX, lines: LINES_D, open: T.l10 - 0.22, close: T.closeD }),
    dialogueBox(root, { ...BOX, lines: LINES_E, open: T.l12 - 0.22, close: T.closeE }),
  ]

  // ── LESSON UNLOCKED: banner + the lesson
  const BAN = { w: 800, h: 136, top: 492 }
  const banner = el('div', { position: 'absolute', left: ((W - BAN.w) / 2) + 'px', top: BAN.top + 'px', width: BAN.w + 'px', height: BAN.h + 'px', display: 'none', transformOrigin: '50% 50%' }, root)
  const banCv = el('canvas', { position: 'absolute', left: '-28px', top: '-28px', width: (BAN.w + 56) + 'px', height: (BAN.h + 56) + 'px', imageRendering: 'pixelated' }, banner)
  pixelPanel(banCv, BAN.w, BAN.h, { m: 28 })
  const shineWrap = el('div', { position: 'absolute', left: '16px', top: '16px', right: '16px', bottom: '16px', overflow: 'hidden' }, banner)
  const shine = el('div', { position: 'absolute', top: '-20px', bottom: '-20px', width: '90px', left: '0px', background: 'linear-gradient(90deg, rgba(255,241,200,0), rgba(255,241,200,0.55), rgba(255,241,200,0))', transform: 'skewX(-20deg)' }, shineWrap)
  el('div', { position: 'absolute', left: 0, top: 0, width: BAN.w + 'px', height: BAN.h + 'px', display: 'grid', placeItems: 'center', font: `700 54px ${MONO}`, letterSpacing: '0.06em', color: GOLD,
    textShadow: '0 4px 0 rgba(6,4,18,0.9), 0 0 18px rgba(242,199,92,0.55)', whiteSpace: 'nowrap' }, banner, '★ LESSON UNLOCKED')
  const LESSON = popText(root, 'Skip the résumé. | Ask what they’d | *defend.*', { top: 690, size: 88, accentSize: 172, at: T.lesson, late: 1, lateAt: T.lessonLate, wobble: true, gap: 0.08, accentColor: GOLD, lineHeight: 1.04 })

  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ═══════════════════════ the low-res café (1 unit = 1 CRT pixel) ═══════════════════════
  const R = (X, Y, w, h, c) => { l.fillStyle = c; l.fillRect(Math.round(X), Math.round(Y), w, h) }
  const disc = (cx, cy, r, c, keep) => { for (let j = Math.floor(cy - r); j <= Math.ceil(cy + r); j++) for (let i = Math.floor(cx - r); i <= Math.ceil(cx + r); i++) if ((i - cx) ** 2 + (j - cy) ** 2 <= r * r && (!keep || keep(i, j))) R(i, j, 1, 1, c) }
  const thick = (x0, y0, x1, y1, c, w = 3) => { const n = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0))); for (let k = 0; k <= n; k++) { const u = k / n; R(Math.round(lerp(x0, x1, u)) - (w >> 1), Math.round(lerp(y0, y1, u)) - (w >> 1), w, w, c) } }
  const HER = { skin: '#eab08a', hair: '#8a2f3e', hairHi: '#b0465a', top: '#33b3a0', topSh: '#24877a', pants: '#2b3060', long: true }
  const HIM = { skin: '#c4855e', hair: '#3a2418', hairHi: '#5a3a26', top: '#e3a83c', topSh: '#b07e22', pants: '#3b3048', long: false, glasses: true }
  /** one seated person facing right (mirror the canvas for the other) */
  function person(P, s) {
    const b = s.bounce || 0, hd = (s.hd || 0) + b
    // chair
    R(17, 50, 2, 47, '#5b3a2e'); R(17, 50, 1, 47, '#7a5040'); R(17, 77, 20, 3, '#6b4434'); R(34, 80, 2, 17, '#5b3a2e')
    // legs
    R(26, 75 + b, 19, 5, P.pants); R(41, 79, 4, 17, P.pants); R(41, 95, 7, 2, INK)
    // torso
    R(23, 56 + b, 12, 22, P.top); R(24, 55 + b, 10, 1, P.top); R(23, 70 + b, 12, 8, P.topSh)
    // neck + head
    R(28, 51 + hd, 3, 5, P.skin)
    const hx = 30, hy = 45 + hd
    disc(hx, hy, 6.6, P.skin)
    if (P.long) { disc(hx, hy, 6.8, P.hair, (i, j) => j < hy - 2 || i < hx - 1); R(22, hy, 6, 15, P.hair); R(23, hy + 1, 1, 12, P.hairHi) }
    else { disc(hx, hy, 6.8, P.hair, (i, j) => j < hy - 3 || (i < hx - 3 && j < hy + 2)); R(hx - 2, hy - 7, 4, 1, P.hairHi) }
    R(hx - 1, hy + 1, 2, 2, P.long ? P.hair : P.skin)
    // face
    const e = s.eye || 'fwd'
    if (e === 'laugh') { R(hx + 3, hy, 1, 1, INK); R(hx + 4, hy - 1, 1, 1, INK); R(hx + 5, hy, 1, 1, INK); R(hx + 4, hy + 3, 2, 2, '#5a1830'); R(hx + 3, hy + 2, 1, 1, PINK) }
    else if (e === 'shut') R(hx + 3, hy + 1, 3, 1, INK)
    else if (e === 'down') { R(hx + 4, hy + 2, 1, 1, INK); R(hx + 3, hy + 1, 3, 1, P.skin) }
    else if (e === 'away') { R(hx + 2, hy - 1, 1, 2, INK) }
    else R(hx + 4, hy, 1, 2, INK)
    if (P.glasses) { R(hx + 2, hy - 1, 4, 1, INK); R(hx + 2, hy - 1, 1, 3, INK); R(hx + 5, hy - 1, 1, 3, INK) }
    if (e !== 'laugh' && s.smile) R(hx + 4, hy + 3, 2, 1, '#8a3040')
    // arm (drawn last, over the table edge)
    s.arm && thick(31, 59 + b, s.arm[0], s.arm[1], P.top), s.arm && R(s.arm[0] - 1, s.arm[1] - 1, 3, 3, P.skin)
  }
  function cafe(t, st) {
    // wall, wainscot, floor
    R(0, 0, LW, LH, '#3b2246'); R(0, 64, LW, 34, '#2d1838'); R(0, 64, LW, 1, '#5a3a60')
    for (let i = 4; i < LW; i += 12) R(i, 66, 1, 31, '#25132e')
    R(0, 98, LW, 6, '#1f1228'); R(0, 98, LW, 1, '#3a2444')
    // window with the night sky (and two tiny stars peeking in)
    R(50, 6, 52, 40, '#6b4630'); R(52, 8, 48, 36, '#151a48'); R(52, 8, 48, 12, '#1d2260')
    for (const [i, j, c] of [[56, 12, '#fff3c8'], [64, 30, '#c9a6ff'], [71, 15, '#fff3c8'], [84, 34, '#fff3c8'], [95, 24, '#c9a6ff'], [60, 38, '#fff3c8'], [80, 11, '#ffd95a']]) R(i, j, 1, 1, c)
    disc(91, 15, 3.5, '#ffe9a8'); disc(92.5, 13.8, 3, '#1d2260')
    R(75, 8, 2, 36, '#6b4630'); R(52, 25, 48, 2, '#6b4630'); R(48, 44, 56, 3, '#7d5438'); R(48, 44, 56, 1, '#a07050')
    // lamp + glow
    R(76, 0, 1, 5, INK); R(73, 5, 7, 1, '#e8b04a'); R(72, 6, 9, 2, '#e8b04a'); R(71, 8, 11, 2, '#c98a2a'); R(75, 10, 3, 1, '#fff3c8')
    const gl = l.createRadialGradient(76, 14, 2, 76, 40, 60); gl.addColorStop(0, 'rgba(255,214,140,0.30)'); gl.addColorStop(1, 'rgba(255,214,140,0)'); l.fillStyle = gl; l.fillRect(0, 0, LW, LH)
    // people (him mirrored)
    person(HER, st.her)
    l.save(); l.translate(LW, 0); l.scale(-1, 1); person(HIM, st.him); l.restore()
    // table
    R(46, 68, 60, 3, '#8a5a3a'); R(46, 68, 60, 1, '#b47b4f'); R(46, 71, 60, 1, '#5a3626'); R(74, 72, 4, 24, '#5a3626'); R(75, 72, 1, 24, '#7a4c30'); R(66, 96, 20, 2, '#5a3626')
    // tea (her side): saucer, cup, spoon, steam
    R(52, 67, 10, 1, '#d8cfc2'); R(54, 62, 6, 5, '#f1e9dc'); R(54, 62, 6, 1, '#c98a5a'); R(60, 63, 2, 2, '#f1e9dc')
    if (st.stir) { const a = t * 8; const tx = 57 + Math.cos(a) * 1.4; thick(tx, 62, tx + 2 + Math.cos(a) * 1.5, 57, '#b8b8c8', 1) }
    else thick(58, 62, 60, 57, '#b8b8c8', 1)
    for (let k = 0; k < 2; k++) { const ph = ((t * 0.6 + k * 0.5) % 1); l.globalAlpha = Math.sin(Math.PI * ph) * 0.6; R(55 + k * 3 + Math.round(Math.sin(t * 3 + k) * 1), 60 - ph * 7, 1, 2, '#efe6d6'); l.globalAlpha = 1 }
    // coffee (his side)
    R(91, 61, 6, 6, '#d0503a'); R(91, 61, 6, 1, '#f07a5a'); R(97, 62, 2, 1, '#d0503a'); R(98, 62, 1, 3, '#d0503a'); R(97, 64, 2, 1, '#d0503a')
    // arms over the table
    if (st.her.arm2) { thick(31, 59 + (st.her.bounce || 0), st.her.arm2[0], st.her.arm2[1], HER.top); R(st.her.arm2[0] - 1, st.her.arm2[1] - 1, 3, 3, HER.skin) }
    // the phone (under the table, glowing)
    if (st.phone > 0) {
      const [px, py] = st.phoneAt
      const g2 = l.createRadialGradient(px, py, 0, px, py, 9); g2.addColorStop(0, `rgba(140,230,255,${0.55 * st.phone})`); g2.addColorStop(1, 'rgba(140,230,255,0)'); l.fillStyle = g2; l.fillRect(px - 10, py - 10, 20, 20)
      R(px - 1, py - 2, 3, 4, INK); l.globalAlpha = st.phone; R(px, py - 1, 1, 2, '#9be8ff'); l.globalAlpha = 1
    }
    if (st.weed) tumbleweedLow(l, st.weed[0], st.weed[1], 7, st.weed[2])
  }
  /** the per-time state of the picture */
  function cafeState(t) {
    const her = { eye: 'fwd', arm: [56, 58], hd: 0 }, him = { eye: 'fwd', arm: null, hd: 0 }
    const st = { her, him, stir: true, phone: 0 }
    // blinks
    const blink = (t0, s) => ((t + s) % 3.3) < 0.12
    if (t < T.cut1) {
      her.eye = t > T.l3 ? 'down' : 'fwd'
      if (blink(t, 0)) her.eye = 'shut'
      if (blink(t, 1.4)) him.eye = 'shut'
      him.arm = [55, 63]                         // around his mug (mirrored coords)
      him.smile = true
    } else if (t < T.weed[0] - 0.4) {                    // "so… what do you do?"
      him.arm = [55, 63]
      her.eye = t > T.freeze + 0.4 ? 'away' : 'fwd'
      st.stir = t < T.freeze
      if (t > T.freeze + 0.4) her.arm = [40, 70]
    } else if (t < T.cut2) {                             // dead air
      st.stir = false
      her.arm = [40, 70]; her.eye = t % 2.4 < 1.2 ? 'away' : 'down'
      him.arm = [40, 70]; him.eye = (t + 0.7) % 2.6 < 1.3 ? 'away' : 'down'
      const p = prog(t, ...T.weed)
      if (p > 0 && p < 1) { const xw = lerp(-10, LW + 10, p); st.weed = [xw, 60 - Math.abs(Math.sin(p * Math.PI * 5)) * 5, xw / 7] }
    } else if (t < T.lift1) {                            // the replay (her arm: rewind → slo-mo down → freeze)
      st.stir = false
      let u
      if (t < T.rew[1]) u = 1 - prog(t, ...T.rew)
      else u = ease.inOutQuad(prog(t, ...T.slo))
      const cup = [56, 58], dn = [45, 76]
      her.arm = [lerp(cup[0], dn[0], u), lerp(cup[1], dn[1], u)]
      her.hd = Math.round(u * 2); her.eye = u > 0.6 ? 'down' : 'fwd'
      st.phone = clamp((u - 0.55) * 3); st.phoneAt = [46, 75]
      him.arm = [55, 63]; him.eye = 'fwd'; him.smile = true
    } else if (t < T.lift2) {                            // talk card: they look at it, then play
      st.stir = false
      her.eye = 'down'; him.eye = 'down'
      her.arm = bump(t, T.playA - 0.15, 0.6) > 0 ? [60, 66] : [40, 70]
      him.arm = bump(t, T.playB - 0.15, 0.6) > 0 ? [60, 66] : [55, 63]
      if (t > T.flip + 0.3) { her.eye = 'fwd'; him.eye = 'fwd'; her.smile = him.smile = true }
    } else {                                             // laughing
      st.stir = false
      const b1 = Math.round(Math.abs(Math.sin(t * 13)) * 1.6), b2 = Math.round(Math.abs(Math.sin(t * 13 + 1.1)) * 1.6)
      her.eye = 'laugh'; him.eye = 'laugh'; her.hd = -1; him.hd = -1; her.bounce = -b1; him.bounce = -b2
      her.arm = Math.sin(t * 9) > 0 ? [50, 66] : [44, 64]
      him.arm = [36, 68]
    }
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
    const typed = txt.slice(0, Math.floor(clamp(k * 1.2) * txt.length + 0.5))
    x.fillText(typed, TV.sx0 + 34, y + h / 2 + 2)
    x.restore()
  }
  const CHY = [
    [T.on + 0.3, '5TH HOUSE · ROMANCE & FUN'], [T.h1, 'FIRST DATE · WINDOW TABLE'], [T.cut1, 'BREAKING: SMALL TALK'], [T.h3, 'DEAD AIR · PLEASE HOLD'],
    [T.cut2, null], [T.lift1, 'TALK CARD IN PLAY'], [T.lift2, "THEY'RE LAUGHING (ACTUALLY)"], [T.cut4, null],
  ]
  function chyronAt(t) {
    let cur = null
    for (const c of CHY) if (t >= c[0]) cur = c
    if (!cur || !cur[1]) return
    chyron(t, cur[1], prog(t, cur[0], cur[0] + 0.45))
  }
  function speechBubble(t) {
    const k = pop01(t, T.bubble, 0.3, 2.2) * (1 - prog(t, T.weed[0] - 0.6, T.weed[0] - 0.4))
    if (k <= 0.01) return
    const bx = 690, by = 640, w = 400, h = 84
    x.save(); x.translate(bx, by); x.scale(k, k)
    x.fillStyle = INK; rr(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10, 18); x.fill()
    x.beginPath(); x.moveTo(40, h / 2); x.lineTo(70, h / 2 + 46); x.lineTo(84, h / 2); x.fill()
    x.fillStyle = '#fbf6ec'; rr(-w / 2, -h / 2, w, h, 14); x.fill()
    x.beginPath(); x.moveTo(46, h / 2 - 2); x.lineTo(68, h / 2 + 34); x.lineTo(78, h / 2 - 2); x.fill()
    x.fillStyle = INK; x.font = `700 31px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText('so… what do you do?', 0, 3)
    x.restore()
  }
  function crickets(t) {
    if (!inR(t, T.crick, T.cut2 - 0.15)) return
    const spots = [[790, 610], [260, 930], [820, 920], [300, 640]]
    x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    for (let i = 0; i < 6; i++) {
      const t0 = T.crick + i * 0.8, k = t - t0
      if (k < 0 || k > 0.7) continue
      const [cx, cy] = spots[i % 4]
      x.globalAlpha = Math.sin(Math.PI * k / 0.7) * 0.9; x.fillStyle = '#9cf08a'
      x.fillText('chirp.', cx, cy - k * 16)
    }
    x.globalAlpha = 1
  }
  function laughs(t) {
    if (t < T.lift2 + 0.2 || t > T.cut4) return
    x.font = `700 36px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    for (let i = 0; i < 10; i++) {
      const t0 = T.lift2 + 0.2 + i * 0.5, k = t - t0
      if (k < 0 || k > 1.1) continue
      const side = i % 2 ? 1 : -1, cx = 540 + side * (210 + (i % 3) * 30), cy = 730 - k * 120
      x.globalAlpha = Math.sin(Math.PI * k / 1.1)
      x.lineWidth = 7; x.strokeStyle = INK; x.strokeText('HA', cx, cy); x.fillStyle = i % 4 < 2 ? GOLD : PINK; x.fillText('HA', cx, cy)
    }
    x.globalAlpha = 1
  }
  function vhs(t) {
    const rew = inR(t, ...T.rew)
    x.fillStyle = 'rgba(70,110,220,0.14)'; x.fillRect(TV.sx0, TV.sy0, TV.sw, TV.sh)
    const r = rng(Math.floor(t * 24) + 7)
    const nb = rew ? 7 : 2
    for (let i = 0; i < nb; i++) {
      const yy = TV.sy0 + ((t * (rew ? 900 : 140) + i * 173 + r() * 30) % TV.sh)
      x.fillStyle = `rgba(255,255,255,${rew ? 0.28 : 0.14})`; x.fillRect(TV.sx0, yy, TV.sw, rew ? 6 : 3)
      for (let k = 0; k < 10; k++) { x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(TV.sx0 + r() * TV.sw, yy - 4 + r() * 8, 12 + r() * 40, 2) }
    }
    // bug
    const paused = t >= T.pause
    const label = rew ? '◀◀ REWIND' : paused ? '❚❚ REPLAY' : '▶ REPLAY'
    x.font = `700 36px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'top'
    x.fillStyle = 'rgba(0,0,0,0.55)'; x.fillText(label, TV.sx0 + 33, TV.sy0 + 25)
    x.fillStyle = '#ffffff'; x.fillText(label, TV.sx0 + 30, TV.sy0 + 22)
    if (!rew && !paused && Math.floor(t * 2.5) % 2 === 0) { x.font = `700 26px ${MONO}`; x.textAlign = 'right'; x.fillStyle = '#ffffff'; x.fillText('SLO-MO', TV.sx0 + TV.sw - 30, TV.sy0 + 30) }
    x.font = `700 24px ${MONO}`; x.textAlign = 'right'; x.textBaseline = 'bottom'; x.fillStyle = 'rgba(255,255,255,0.85)'; x.fillText('PM 8:42', TV.sx0 + TV.sw - 30, TV.sy0 + TV.sh - 24)
  }
  function telestrator(t) {
    const p = prog(t, ...T.tele)
    if (p <= 0 || t >= T.lift1 - 0.05) return
    const cx = 560, cy = 890, r = 78
    x.save(); x.lineCap = 'round'; x.lineJoin = 'round'
    const a0 = -2.2, a1 = a0 + p * Math.PI * 2.15
    for (const [lw, col] of [[16, INK], [9, '#ffe14a']]) {
      x.strokeStyle = col; x.lineWidth = lw; x.beginPath()
      for (let a = a0; a <= a1; a += 0.08) { const rr2 = r * (1 + 0.07 * Math.sin(a * 2.3)); const px = cx + Math.cos(a) * rr2 * 1.25, py = cy + Math.sin(a) * rr2; a === a0 ? x.moveTo(px, py) : x.lineTo(px, py) }
      x.stroke()
    }
    const q = prog(t, T.tele[1] - 0.1, T.tele[1] + 0.25)
    if (q > 0) {
      for (const [lw, col] of [[16, INK], [9, '#ffe14a']]) {
        x.strokeStyle = col; x.lineWidth = lw; x.beginPath()
        const sx = 820, sy = 690, ex = lerp(sx, 680, q), ey = lerp(sy, 815, q)
        x.moveTo(sx, sy); x.lineTo(ex, ey)
        if (q >= 1) { x.moveTo(ex, ey); x.lineTo(ex + 38, ey - 6); x.moveTo(ex, ey); x.lineTo(ex + 4, ey - 40) }
        x.stroke()
      }
      x.globalAlpha = clamp(q * 2); x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.lineWidth = 8; x.strokeStyle = INK; x.strokeText('PHONE.', 815, 655); x.fillStyle = '#ffe14a'; x.fillText('PHONE.', 815, 655)
    }
    x.restore()
  }
  function colourBars(t) {
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
  function drawScreen(t) {
    const { sx0, sy0, sw, sh } = TV
    let mode = 'cafe'
    if (t < T.on) mode = 'static'
    else if (inR(t, T.cut2, T.lift1)) mode = 'replay'
    else if (t >= T.cut4) mode = 'bars'
    l.setTransform(1, 0, 0, 1, 0, 0)
    if (mode === 'static') staticNoise(t)
    else if (mode === 'bars') colourBars(t)
    else if (mode === 'replay') { R(0, 0, LW, LH, '#3b2246'); l.setTransform(2, 0, 0, 2, -12, -80); cafe(t, cafeState(t)); l.setTransform(1, 0, 0, 1, 0, 0) }
    else cafe(t, cafeState(t))
    x.save()
    rr(sx0, sy0, sw, sh, 30); x.clip()
    x.imageSmoothingEnabled = false
    x.drawImage(low, sx0, sy0, sw, sh)
    x.imageSmoothingEnabled = true
    // CRT switch-on: a bright line opening up
    const on = prog(t, T.on, T.on + 0.22)
    if (on > 0 && on < 1) {
      const hh = sh * ease.outCubic(on)
      x.fillStyle = '#05040c'; x.fillRect(sx0, sy0, sw, (sh - hh) / 2); x.fillRect(sx0, sy0 + (sh + hh) / 2, sw, (sh - hh) / 2)
      x.fillStyle = `rgba(255,255,255,${0.9 * (1 - on)})`; x.fillRect(sx0, sy0 + sh / 2 - hh / 2, sw, hh)
    }
    if (mode === 'replay') vhs(t)
    if (mode === 'cafe' || mode === 'replay') {
      // dim behind the big answer cards
      const dimK = clamp(prog(t, ...T.big)) * (1 - prog(t, T.lift2 - 0.05, T.lift2 + 0.25))
      if (dimK > 0) { x.fillStyle = `rgba(8,5,20,${0.55 * dimK})`; x.fillRect(sx0, sy0, sw, sh) }
    }
    if (mode === 'cafe') { speechBubble(t); crickets(t); laughs(t) }
    if (mode === 'replay') telestrator(t)
    if (mode === 'bars') {
      const k = pop01(t, T.bars + 0.15, 0.3, 2)
      x.save(); x.translate(540, 752); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-250, -46, 500, 92); x.fillStyle = '#101018'; x.fillRect(-244, -40, 488, 80)
      x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#ffffff'; x.fillText('PLEASE STAND BY', 0, 3)
      x.restore()
    }
    // the LIVE bug
    const reveal = inR(t, T.cut3, T.lift2 + 0.1)
    if (t >= T.bug && mode !== 'replay' && mode !== 'bars' && !reveal) {
      const k = pop01(t, T.bug, 0.3, 2.4)
      x.save(); x.translate(sx0 + 26, sy0 + 22); x.scale(k, k)
      pill(0, 0, 150, 46, RED, '  LIVE', '#ffffff', 28)
      if (Math.floor(t * 1.6) % 2 === 0 || t < T.on) { x.fillStyle = '#ffffff'; x.fillRect(16, 16, 14, 14); x.fillRect(14, 18, 18, 10); x.fillRect(18, 14, 10, 18) }
      x.restore()
    }
    if (mode !== 'static' && !reveal) chyronAt(t)
    // glass: scanlines, vignette, glare
    x.fillStyle = 'rgba(0,0,0,0.13)'
    for (let yy = sy0; yy < sy0 + sh; yy += 5) x.fillRect(sx0, yy, sw, 2)
    const vg = x.createRadialGradient(TVC.x, sy0 + sh / 2, sh * 0.35, TVC.x, sy0 + sh / 2, sw * 0.68)
    vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,0.5)'); x.fillStyle = vg; x.fillRect(sx0, sy0, sw, sh)
    const gg = x.createLinearGradient(sx0, sy0, sx0 + sw * 0.6, sy0 + sh * 0.6)
    gg.addColorStop(0, 'rgba(255,255,255,0.13)'); gg.addColorStop(0.45, 'rgba(255,255,255,0.03)'); gg.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = gg; x.fillRect(sx0, sy0, sw, sh)
    x.restore()
  }

  // ── cards (full-res, over the picture)
  function cardImg(img, body, cx, cy, wBody, rot = 0, sx = 1, alpha = 1) {
    if (!img) return
    const w = wBody / body, h = w * img.height / img.width
    x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, 1); x.drawImage(img, -w / 2, -h / 2, w, h); x.restore()
  }
  function answerFace(cx, cy, w, sx, stampK, rot = 0) {
    const h = w * 1.596
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(sx, 1)
    x.save(); x.shadowColor = 'rgba(242,199,92,0.5)'; x.shadowBlur = 30
    rr(-w / 2, -h / 2, w, h, 22); const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#2e1c62'); g.addColorStop(1, '#130a2e'); x.fillStyle = g; x.fill(); x.restore()
    x.lineWidth = 6; x.strokeStyle = GOLD; rr(-w / 2, -h / 2, w, h, 22); x.stroke()
    x.lineWidth = 2; x.strokeStyle = 'rgba(242,199,92,0.55)'; rr(-w / 2 + 14, -h / 2 + 14, w - 28, h - 28, 12); x.stroke()
    x.fillStyle = GOLD; x.font = `700 19px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('A N S W E R', 0, -h / 2 + 46)
    x.fillStyle = BONE; x.font = `italic 500 48px ${SERIF}`
    ;['Pineapple', 'belongs', 'on pizza.'].forEach((s, i) => x.fillText(s, 0, -h / 2 + 140 + i * 56))
    if (stampK > 0) {
      const k = easeOutBack(clamp(stampK), 2.6)
      x.save(); x.translate(0, h / 2 - 82); x.rotate(-0.18); x.scale(k * 1.0, k * 1.0)
      x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 50, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#46cf82'; x.beginPath(); x.arc(0, 0, 44, 0, Math.PI * 2); x.fill()
      x.strokeStyle = '#ffffff'; x.lineWidth = 12; x.lineCap = 'round'; x.lineJoin = 'round'; x.beginPath(); x.moveTo(-20, 2); x.lineTo(-5, 18); x.lineTo(22, -16); x.stroke()
      x.restore()
    }
    x.restore()
  }
  const TBL = { x: 540, y: 838 }, PLAY_A = { x: 450, y: 846 }, PLAY_B = { x: 630, y: 846 }
  const BIG_A = { x: 405, y: 768 }, BIG_B = { x: 675, y: 768 }, BIG_W = 244
  function drawCards(t) {
    // the talk card: slides on, the insert (big, real card), back to the table
    if (t >= T.card[0] && t < T.cut3) {
      const p = prog(t, ...T.card), e = easeOutBack(p, 1.4)
      let cx = lerp(980, TBL.x, e), cy = lerp(560, TBL.y, e) - Math.sin(p * Math.PI) * 60, w = 74, rot = lerp(1.6, -0.06, ease.outCubic(p))
      const ins = ease.inOutCubic(prog(t, ...T.ins)) * (1 - ease.inOutCubic(prog(t, ...T.insOut)))
      if (ins > 0) {
        cx = lerp(cx, 540, ins); cy = lerp(cy, 800, ins); w = lerp(w, 410, ins); rot = lerp(rot, 0.0, ins)
        x.fillStyle = `rgba(6,4,16,${0.55 * ins})`; x.fillRect(0, 0, W, 1920)
        const g = x.createRadialGradient(cx, cy, 0, cx, cy, 520); g.addColorStop(0, rgba(GOLD, 0.25 * ins)); g.addColorStop(1, rgba(GOLD, 0)); x.fillStyle = g; x.fillRect(cx - 520, cy - 520, 1040, 1040)
      }
      cardImg(TALK, TALK_BODY, cx, cy, w, rot)
      if (ins > 0.3 && ins < 1) sparkleRing(t, cx, cy, T.ins[0] + 0.2, 10, 300, 2)
    }
    // the two answers, face-down on the table
    for (const [P, tp, d] of [[PLAY_A, T.playA, -1], [PLAY_B, T.playB, 1]]) {
      if (t < tp || t >= T.cut3) continue
      const p = prog(t, tp, tp + 0.3), e = ease.outCubic(p)
      cardImg(BACK, BACK_BODY, lerp(P.x + d * 120, P.x, e), lerp(P.y + 40, P.y, e), 60, d * 0.12 * (1 - e) + d * 0.05, 1, clamp(p * 3))
    }
    // the reveal: big face-down cards, drumroll tremble, the flip
    if (t >= T.cut3 && t < T.lift2 + 0.35) {
      const g = ease.outBack ? easeOutBack(prog(t, ...T.big), 1.6) : prog(t, ...T.big)
      const out = ease.inCubic(prog(t, T.lift2 - 0.05, T.lift2 + 0.3))
      const roll = prog(t, ...T.roll)
      ;[[PLAY_A, BIG_A, 0], [PLAY_B, BIG_B, 0.08]].forEach(([P, B, off], i) => {
        const cx = lerp(P.x, B.x, g), cy = lerp(P.y, B.y, g) + out * 700, w = lerp(60, BIG_W, g) * (1 - out * 0.4)
        const jit = roll > 0 && roll < 1 ? (2 + roll * 7) : 0
        const jx = jit * Math.sin(t * 61 + i * 2), jr = jit * 0.004 * Math.sin(t * 47 + i)
        const f = prog(t, T.flip + off, T.flip + off + 0.2)
        const sx = Math.cos(f * Math.PI)
        if (sx > 0) cardImg(BACK, BACK_BODY, cx + jx, cy, w, jr + (i ? 0.03 : -0.03), sx)
        else answerFace(cx, cy, w, -sx, prog(t, T.flip + 0.3 + i * 0.13, T.flip + 0.55 + i * 0.13), i ? 0.03 : -0.03)
        if (f > 0.5 && f < 1) sparkleRing(t, cx, cy, T.flip + off + 0.1, 10, 210, 1 + i)
      })
    }
  }

  // ═══════════════════════ the cast ═══════════════════════
  function boothPose(t, who) {
    const D = who === 'g' ? G_DESK : S_DESK, Gl = who === 'g' ? G_GLASS : S_GLASS
    if (t < T.cut3 || t >= T.home[1]) return { ...D, r: 0 }
    if (t < T.home[0]) return { ...Gl }
    const p = prog(t, ...T.home), e = ease.inOutCubic(p)
    return { x: lerp(Gl.x, D.x, e), y: lerp(Gl.y, D.y, e) - Math.sin(p * Math.PI) * 160, s: lerp(Gl.s, D.s, e), r: lerp(Gl.r, 0, e) }
  }
  function gemState(t) {
    let mood = 'neutral', look = [0, -1], squash = 0, blink, tears = 0, hank = 0
    const speaking = talkWeight(t, GT) > 0.5
    if (t < T.l1 - 0.1) { look = [1, 0]; mood = 'neutral' }
    else if (t < 2.9) { mood = 'sparkle'; look = [0, 0] }
    else if (t < T.l2) { mood = 'happy' }
    else if (t < 6.1) { mood = 'sparkle'; look = [0, 0] }
    else if (t < T.l3) { look = [0, -1] }
    else if (t < 9.2) { look = [1, 0] }
    else if (t < T.freeze) { look = [0, -1] }
    else if (t < T.l4) { mood = 'wide'; look = [0, -1]; blink = false }
    else if (t < T.l5) { mood = 'wide'; look = t < 12.9 ? [0, -1] : [1, 0] }
    else if (t < T.weed[0]) { mood = 'neutral'; look = [0, 0] }
    else if (t < T.turn[0]) { look = [0, -1] }
    else if (t < T.back) { look = t < T.turn[0] + 0.35 ? [0, -1] : [1, 0]; blink = inR(t, T.sync, T.sync + 0.16) ? 1 : false }
    else if (t < T.cut2) { mood = 'squint'; look = [0, -1] }
    else if (t < 24.25) { mood = 'squint'; look = [0, -1] }
    else if (t < T.lift1) { mood = 'squint'; look = [0, 1]; squash = 0.08 * clamp((t - 24.25) * 4) }
    else if (t < 28.4) { mood = 'wide'; look = [0, -1] }
    else if (t < T.l9) { mood = 'sparkle'; look = [0, -1] }
    else if (t < 31.6) { mood = 'sparkle'; look = [0, 0] }
    else if (t < T.cut3) { mood = 'wide'; look = [0, -1] }
    else if (t < T.flip) { mood = 'wide'; look = [1, -1]; blink = false }
    else if (t < T.l10 + 0.4) { mood = 'wide'; look = [1, -1]; blink = false }
    else if (t < T.lift2) { mood = 'wide'; look = [1, 0] }
    else if (t < T.l11) { mood = 'heart'; look = [0, 0] }
    else if (t < 42.9) { mood = 'sparkle'; look = [0, 0] }
    else if (t < T.cut4) { mood = 'heart'; look = [0, 0] }
    else if (t < T.bars) { mood = 'sparkle'; look = [0, -1]; tears = 1 }
    else if (t < T.lookP) { mood = 'happy'; tears = 2; hank = inR(t, ...T.dab) ? (Math.floor((t - T.dab[0]) / 0.42) % 2 ? 1 : -1) : 0 }
    else { mood = 'wide'; look = [1, -1]; tears = 1 }
    if (speaking && mood === 'neutral') mood = 'sparkle'
    return { mood, look, squash, blink, tears, hank }
  }
  function sagState(t) {
    let mood = 'neutral', look = [0, -1], squash = 0, blink
    if (t < T.l1) { look = [0, -1] }
    else if (t < 2.9) { look = [-1, 0] }
    else if (t < T.l2) { mood = 'happy' }
    else if (t < 6.1) { look = [-1, 0] }
    else if (t < T.l3) { look = [0, -1] }
    else if (t < 9.2) { mood = 'squint'; look = [0, 0] }
    else if (t < T.freeze) { look = [0, -1] }
    else if (t < T.l4) { mood = 'wide'; look = [0, -1]; blink = false }
    else if (t < T.l5) { mood = 'wide'; look = [0, 0] }
    else if (t < T.weed[0]) { mood = 'wide'; look = [-1, 0] }
    else if (t < T.turn[0]) { look = [0, -1] }
    else if (t < T.back) { look = t < T.turn[0] + 0.5 ? [0, -1] : [-1, 0]; blink = inR(t, T.sync, T.sync + 0.16) ? 1 : false }
    else if (t < T.cut2) { look = [0, -1] }
    else if (t < T.tele[0]) { mood = 'squint'; look = [-1, -1] }
    else if (t < T.lift1) { mood = 'squint'; look = [0, 0]; blink = t > 25.2 ? undefined : false }
    else if (t < T.l9) { mood = 'wide'; look = [0, -1] }
    else if (t < 31.6) { look = [-1, 0] }
    else if (t < T.cut3) { mood = 'wide'; look = [0, -1] }
    else if (t < T.l10 - 0.2) { mood = 'wide'; look = [-1, -1]; blink = false }
    else if (t < 39.6) { mood = 'neutral'; look = [0, 0]; blink = false }
    else if (t < T.lift2) { mood = 'wide'; look = [-1, 0] }
    else if (t < T.cut4) { mood = t % 1.1 < 0.55 ? 'happy' : 'heart'; look = [0, 0] }
    else if (t < T.bars) { mood = 'sparkle'; look = [0, -1] }
    else if (t < T.lookP) { mood = 'happy'; look = [-1, 0] }
    else { mood = 'wide'; look = [1, -1] }
    return { mood, look, squash, blink }
  }
  function pisState(t) {
    let mood = 'sparkle', look, tears = 0, squash = 0, tissue = 0, blink
    if (t < T.freeze) { mood = t < T.on ? 'neutral' : 'sparkle' }
    else if (t < T.weed[0]) { mood = 'wide'; look = [-1, 1] }
    else if (t < T.pisCry) { mood = 'neutral'; look = [-1, 1] }
    else if (t < T.cut2) { mood = 'sparkle'; look = [-1, 1]; tears = t < T.pisCry + 0.6 ? 1 : 2 }
    else if (t < T.lift1) { mood = 'sparkle'; look = [-1, 1]; tears = 2 }
    else if (t < T.flip) { mood = 'wide'; look = [-1, 1]; tears = 1 }
    else if (t < T.lift2) { mood = 'sparkle'; look = [-1, 1]; tears = 2 }
    else if (t < T.cut4) { mood = 'happy'; tears = t > T.wail ? 3 : 2; squash = t > T.wail ? 0.08 * Math.sin(t * 22) : 0 }
    else if (t < T.bars) { mood = 'happy'; tears = 2 }
    else { mood = 'happy'; tears = t < T.honk - 0.4 ? 2 : 1; tissue = inR(t, T.honk - 0.35, T.honk + 0.75) ? 1 : 0; squash = 0.22 * bump(t, T.honk, 0.32) }
    return { mood, look, tears, squash, tissue, blink }
  }

  function drawBoothStar(t, who, k) {
    const isG = who === 'g'
    const P = boothPose(t, who), st = isG ? gemState(t) : sagState(t)
    const spk = isG ? talkWeight(t, GT) : talkWeight(t, ST)
    const both = talkWeight(t, BT)
    const gv = (P.r === 0 && t < T.cut3) || t >= T.home[1] ? grooveAt(t) : { dy: 0, sq: 0 }
    let sq = st.squash + gv.sq, dy = gv.dy
    // the freeze → the thud
    if (inR(t, T.thud, T.thud + 0.5)) { const d = t - T.thud; sq += 0.2 * Math.exp(-d * 9) * Math.cos(d * 24) }
    // pressed to the glass: wide squash + drumroll shiver
    let jx = 0
    if (inR(t, T.cut3, T.home[0])) { sq += 0.13 + 0.05 * bump(t, T.h6, 0.25); const r = prog(t, ...T.roll); if (r > 0 && r < 1) jx = (2 + r * 5) * Math.sin(t * 55 + (isG ? 0 : 1.7)) }
    // erupt: big jumps
    if (inR(t, T.lift2, T.lift2 + 0.7)) { const p = prog(t, T.lift2, T.lift2 + 0.7); dy -= Math.sin(Math.PI * p) * 230; sq -= 0.1 * Math.sin(Math.PI * p) }
    const lean = (isG ? 1 : -1) * 16 * Math.max(spk, both)
    // the mic tap (Gemini leans in twice)
    const tap = isG ? Math.max(bump(t, T.tap[0], 0.16), bump(t, T.tap[1], 0.16)) * 24 : 0
    const hops = isG ? [...GEM_HOPS, ...BOOTH_HOPS, ...ERUPT_HOPS.slice(1), T.l8 - 0.05] : [...SAG_HOPS, ...BOOTH_HOPS, ...ERUPT_HOPS.slice(1).map(h => h + 0.12)]
    const opts = { color: isG ? GEM.color : SAG.color, glyph: isG ? GEM.glyph : SAG.glyph, mood: st.mood, look: st.look, blink: st.blink, squash: sq, hops, seed: isG ? 3 : 8, pop: k, bob: 0, glow: 0.9 }
    x.save(); x.translate(P.x + lean + tap + jx, P.y + dy); x.rotate(P.r || 0)
    drawStarChar(x, 0, 0, P.s, t, opts)
    const F = starFrame(0, 0, P.s, t, opts)
    if (t < T.hats) inSprite(x, F, () => headsetCells(x, isG ? GC : '#b07cff'))
    if (isG && st.tears) inSprite(x, F, () => tearsCells(x, t, st.tears))
    if (isG && st.hank) inSprite(x, F, () => hankieCells(x, st.hank))
    x.restore()
  }
  // where a headset sat at the moment it flew (computed with the same args, pure)
  function flyingHeadsets(t) {
    const dt = t - T.hats
    if (dt < 0 || dt > 1.6) return
    for (const who of ['g', 's']) {
      const isG = who === 'g', P = boothPose(T.hats, who)
      const F = starFrame(P.x, P.y + grooveAt(T.hats).dy, P.s, T.hats, { bob: 0, hops: isG ? GEM_HOPS : SAG_HOPS, seed: isG ? 3 : 8 })
      const [hx, hy] = cellToWorld(F, 18, 9)
      const vx = isG ? -620 : 660, vy = -1900, g = 3400
      headsetWorld(x, hx + vx * dt, hy + vy * dt + 0.5 * g * dt * dt, (isG ? -1 : 1) * dt * 9, F.cell, isG ? GC : '#b07cff')
    }
  }
  function drawPisces(t, k, tvDy) {
    const st = pisState(t)
    const y = TV.y0 + tvDy - 60
    const opts = { color: PIS.color, glyph: PIS.glyph, mood: st.mood, look: st.look, blink: st.blink, squash: st.squash, seed: 12, pop: k, bob: 0, glow: 0.8 }
    drawStarChar(x, PIS_AT.x, y, PIS_AT.s, t, opts)
    const F = starFrame(PIS_AT.x, y, PIS_AT.s, t, opts)
    if (st.tears) inSprite(x, F, () => tearsCells(x, t, st.tears))
    if (st.tissue) inSprite(x, F, () => tissueCells(x, 1))
    // HONK
    const hk = t - T.honk
    if (hk > 0 && hk < 1.2) {
      const p = easeOutBack(prog(hk, 0, 0.25), 3), a = 1 - prog(hk, 0.9, 1.2)
      x.save(); x.globalAlpha = a; x.translate(PIS_AT.x - 175, y + 18 - hk * 14); x.rotate(-0.1); x.scale(p, p)
      x.font = `700 58px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.lineWidth = 12; x.strokeStyle = INK; x.strokeText('HONK!', 0, 0); x.fillStyle = BONE; x.fillText('HONK!', 0, 0)
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
  function bannerBurst(t) {
    const tt = t - (T.banner + 0.12)
    if (tt < 0 || tt > 1.0) return
    const p = ease.outCubic(tt / 1.0), r = rng(77)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 1.0)
    for (let i = 0; i < 22; i++) {
      const a = r() * Math.PI * 2, d = 160 + r() * 380, cx = 540 + Math.cos(a) * d * p * 1.2, cy = BAN.top + BAN.h / 2 + Math.sin(a) * d * p * 0.7
      drawPixelStar(x, cx, cy, (20 + r() * 26) * (1 - 0.3 * p), i % 2 ? 1 : 2, [GOLD, BONE, PINK, LAV, '#7fe0ff'][i % 5])
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
        // ── the TV (+ a push during the reveal)
        const tvK = pop01(t, T.tvIn, 0.42, 1.7) * outP
        const push = 1 + 0.07 * ease.inOutQuad(prog(t, T.roll[0], T.roll[1])) * (1 - ease.inOutQuad(prog(t, T.home[0], T.home[1])))
        if (tvK > 0.01) {
          x.save(); x.translate(TVC.x, TVC.y + tvDy); x.scale(tvK * push, tvK * push); x.translate(-TVC.x, -TVC.y)
          drawTV(x, TV, t, { antennaWiggle: inR(t, T.lift2, T.lift2 + 2) ? 1 - prog(t, T.lift2, T.lift2 + 2) : bump(t, T.freeze, 0.4) })
          drawScreen(t)
          // fog where the booth is pressed to the glass
          if (inR(t, T.cut3, T.home[0] + 0.2)) {
            const fk = clamp(prog(t, T.cut3, T.cut3 + 0.3)) * (1 - prog(t, T.home[0], T.home[0] + 0.3))
            for (const [fx, fy] of [[300, 960], [780, 960]]) { const g = x.createRadialGradient(fx, fy, 0, fx, fy, 140); g.addColorStop(0, `rgba(235,240,255,${0.22 * fk})`); g.addColorStop(1, 'rgba(235,240,255,0)'); x.fillStyle = g; x.fillRect(fx - 160, fy - 160, 320, 320) }
          }
          x.restore()
        }
        // ── scrim for the lesson
        const lk = clamp(prog(t, T.cut4 - 0.02, T.cut4 + 0.1)) * (1 - prog(t, T.lessonOut[0], T.lessonOut[1] + 0.1))
        if (lk > 0) { x.fillStyle = `rgba(6,4,16,${0.74 * lk})`; x.fillRect(0, 0, W, 1920) }
        // ── Pisces on top of the TV
        if (t >= T.pisIn) {
          const pk = pop01(t, T.pisIn, 0.38, 2.2) * outP
          if (pk > 0.02) drawPisces(t, pk, tvDy * tvK)
        }
        // ── the booth
        const onDesk = t < T.cut3 || t >= T.home[1] - 0.15
        const micK = pop01(t, T.micIn, 0.34, 2) * outP
        const ang = -0.38 * talkWeight(t, GT) + 0.38 * talkWeight(t, ST) + (t < T.l1 ? -0.25 * clamp(prog(t, T.tap[0] - 0.2, T.tap[0])) : 0)
        if (micK > 0.02) drawMic(x, MIC.x, MIC.y - (1 - micK) * 40, ang + (inR(t, T.lift2, T.lift2 + 1) ? 0.5 * Math.sin((t - T.lift2) * 18) * (1 - prog(t, T.lift2, T.lift2 + 1)) : 0), micK)
        const gk = pop01(t, T.gemIn, 0.36, 2.2) * outP, sk = pop01(t, T.sagIn, 0.36, 2.2) * outP
        if (!onDesk) {           // they're up at the glass: desk first, then them in front
          drawDesk(x, DESK.x0, DESK.x1, DESK.y, DESK.h)
          if (gk > 0.02) drawBoothStar(t, 'g', gk)
          if (sk > 0.02) drawBoothStar(t, 's', sk)
        } else {
          if (gk > 0.02) drawBoothStar(t, 'g', gk)
          if (sk > 0.02) drawBoothStar(t, 's', sk)
          const dk = pop01(t, T.deskIn, 0.36, 1.8) * outP
          if (dk > 0.02) { x.save(); x.translate(540, DESK.y + DESK.h); x.scale(dk, dk); x.translate(-540, -(DESK.y + DESK.h)); drawDesk(x, DESK.x0, DESK.x1, DESK.y, DESK.h); x.restore() }
        }
        flyingHeadsets(t)
        // ── cards over everything on the TV
        x.save(); x.translate(TVC.x, TVC.y + tvDy); x.scale(push, push); x.translate(-TVC.x, -TVC.y); drawCards(t); x.restore()
        // ── confetti
        confetti(x, t, T.lift2, { x0: 540, y0: 1330, n: 90, seed: 3 })
        confetti(x, t, T.wail, { x0: 540, y0: 1330, n: 60, seed: 9, spread: 1.2 })
        bannerBurst(t)
      }
      for (const b of boxes) b.update(t)
      // banner
      const bOn = t >= T.banner && t < T.lessonOut[1]
      banner.style.display = bOn ? 'block' : 'none'
      if (bOn) {
        const p = prog(t, T.banner, T.banner + 0.45), o = outK(t, T.lessonOut)
        const sc = (0.2 + 0.8 * easeOutBack(p, 2.8)) * lerp(0.85, 1, o)
        banner.style.opacity = String(clamp(p * 4) * o)
        banner.style.transform = `translateY(${((1 - ease.outCubic(p)) * -80).toFixed(1)}px) scale(${sc.toFixed(4)}) rotate(${((1 - ease.outCubic(p)) * -4).toFixed(2)}deg)`
        const sh = prog(t, T.banner + 0.4, T.banner + 1.1)
        shine.style.left = (lerp(-140, BAN.w + 60, sh)).toFixed(1) + 'px'
      }
      LESSON.update(t, outK(t, T.lessonOut))
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: every beat change. The default selection keeps 4 of these 9 (indices 1, 3, 5, 7):
// 10.75 (→ small talk), 21.15 (→ instant replay), 33.94 (→ the reveal), 46.16 (→ LESSON UNLOCKED). End card flips at 55.6.
export const CUTS = [4.22, T.cut1, 16.2, T.cut2, T.lift1, T.cut3, T.lift2, T.cut4, 51.1]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pop / pluck / bell are shifted into the film's key by the engine; chip / lead notes are written in A dorian)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.026) => [...wordPops(t0, n, 0.08, base, gain), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
const FXO = { rev: 0, dly: 0, bus: 'fx' }
const scratch = t0 => [['tapeStop', t0, 0.42], ['chip', t0, 1600, 0.08, { wave: 'noise', slide: 70, gain: 0.05, decay: 0.05, sustain: 0.8, ...FXO }], ['chip', t0 + 0.09, 5200, 0.14, { wave: 'noise', slide: -60, gain: 0.045, decay: 0.08, sustain: 0.7, ...FXO }]]
const chirp = (t0, pan) => [0, 0.05, 0.1].map(d => ['chip', +(t0 + d).toFixed(3), 4400, 0.03, { duty: 0.25, gain: 0.024, decay: 0.02, sustain: 0.7, pan, rev: 0.1, dly: 0, bus: 'fx' }])
const womp = t0 => [[329.63, 0, 0.3], [311.13, 0.34, 0.3], [293.66, 0.68, 0.3], [277.18, 1.02, 1.0]].map(([f, d, len]) => ['lead', +(t0 + d).toFixed(3), f, len, { wave: 'saw', gain: 0.05, cutoff: 1300, env: 500, envDecay: 4, vib: d > 1 ? 0.018 : 0.006, vibRate: 5.5, decay: 0.3, sustain: 0.85, release: 0.12, rev: 0.18, dly: 0, bus: 'fx' }])
const roll = (t0, t1) => { const out = []; for (let t = t0, i = 0; t < t1; t += 1 / 22, i++) { const p = (t - t0) / (t1 - t0); out.push(['snare', +t.toFixed(3), { gain: 0.05 + 0.13 * p * p, decay: 0.07, snappy: 0.9, tone: 200, pan: (i % 2 ? 0.12 : -0.12), rev: 0.15, bus: 'fx' }]) } return out }
const claps = (t0, t1, seed) => { const r = rng(seed), out = []; for (let t = t0; t < t1; t += 0.035 + r() * 0.05) { const p = (t - t0) / (t1 - t0); out.push(['clap', +t.toFixed(3), { gain: (0.11 + r() * 0.06) * (1 - p * 0.85), pan: r() * 1.4 - 0.7, rev: 0.25, bus: 'fx' }]) } return out }
const levelUp = t0 => [
  ...[440, 523.25, 659.25, 880, 1046.5].map((f, i) => ['chip', +(t0 + i * 0.075).toFixed(3), f, 0.09, { duty: 0.25, gain: 0.028, decay: 0.08, sustain: 0.6, rev: 0.12, dly: 0.1, bus: 'fx' }]),
  ['chip', +(t0 + 0.38).toFixed(3), 1046.5, 0.62, { duty: 0.25, arp: [0, 4, 7, 12], gain: 0.026, decay: 0.4, sustain: 0.55, vib: 0.004, rev: 0.2, dly: 0.15, bus: 'fx' }],
  ['chip', +(t0 + 0.38).toFixed(3), 523.25, 0.62, { wave: 'tri', gain: 0.03, decay: 0.4, sustain: 0.6, rev: 0.1, dly: 0, bus: 'fx' }],
]
const honk = t0 => [['brass', t0, [174.61, 185], 0.34, { gain: 0.06, bright: 1.5, rev: 0.12, bus: 'fx' }], ['lead', t0, 180, 0.32, { wave: 'saw', gain: 0.05, cutoff: 1500, env: 800, vib: 0.03, vibRate: 32, decay: 0.2, sustain: 0.9, release: 0.06, rev: 0.1, dly: 0, bus: 'fx' }]]
const dLT = lineTimes(LINES_D, { cps: CPS })
export const CUES = [
  // 0 · we're live
  ...head(T.h0, 6, T.h0Land, 0),
  ['pop', T.tvIn + 0.05, 330, 0.04, 0], ['tick', T.tvIn + 0.1, 0.04],
  ['chip', 0.25, 7000, 1.45, { wave: 'noise', gain: 0.007, decay: 2, sustain: 1, ...FXO }],
  ['pop', T.deskIn + 0.1, 392, 0.03, 0], ['pop', T.gemIn + 0.12, 784, 0.03, -0.3], ['pop', T.sagIn + 0.12, 659.25, 0.03, 0.3], ['pop', T.pisIn + 0.12, 988, 0.025, 0.4], ['pop', T.micIn + 0.1, 523.25, 0.025, 0],
  ['pop', T.bug + 0.08, 880, 0.03, -0.3],
  ...T.tap.flatMap(tt => [['pop', tt + 0.06, 140, 0.07, 0], ['tick', tt + 0.06, 0.05]]),
  ['pop', T.on, 1174.66, 0.04, 0], ['bell', T.on + 0.02, 1760, 0.025, 0.8, 0], ['tick', T.on, 0.05],
  // 1 · table for two
  ...head(T.h1, 3, T.h1Land, 2),
  ...talkCues(ALL_LINES, { cps: CPS, pitch: { [GT]: 1100, [ST]: 760, [BT]: 900 } }),
  // 2 · small talk → freeze
  ...head(T.h2, 4, T.h2Land, 1),
  ['pop', T.bubble + 0.05, 659.25, 0.035, 0.3], ['pop', T.bubble + 0.12, 880, 0.025, 0.3],
  ...scratch(T.freeze),
  ['pop', T.thud + 0.02, 120, 0.08, 0], ['tick', T.thud + 0.02, 0.06],
  // 3 · dead air
  ...head(T.h3, 2, T.h3Land, 4),
  ...[0, 1, 2, 3, 4, 5].flatMap(i => chirp(T.crick + i * 0.8 + 0.05, i % 2 ? 0.5 : -0.5)),
  ['whoosh', 18.8, 3.4, 0.03],
  ['pluck', T.sync + 0.02, 1760, 0.022, 0.25, 0],
  ['chip', T.pisCry, 3000, 0.07, { wave: 'noise', slide: 30, gain: 0.02, decay: 0.05, sustain: 0.5, ...FXO }], ['chip', T.pisCry + 0.16, 3600, 0.08, { wave: 'noise', slide: 30, gain: 0.02, decay: 0.05, sustain: 0.5, ...FXO }],
  // 4 · instant replay
  ['chip', T.rew[0] + 0.05, 220, 0.65, { duty: 0.5, slide: 30, gain: 0.012, decay: 0.6, sustain: 0.8, ...FXO }],
  ...Array.from({ length: 8 }, (_, i) => ['tick', +(T.rew[0] + 0.05 + i * 0.08).toFixed(3), 0.025]),
  ...head(T.h4, 2, T.h4Land, 3),
  ['tick', T.pause, 0.05], ['pop', T.pause, 523.25, 0.03, 0],
  ['chip', T.tele[0], 1500, 0.55, { wave: 'tri', slide: 6, gain: 0.014, vib: 0.03, decay: 0.5, sustain: 0.8, ...FXO }],
  ...womp(T.womp),
  // 5 · the talk card
  ['whoosh', T.card[0] + 0.2, 0.4, 0.05], ['pop', T.card[1], 784, 0.04, 0], ['tick', T.card[1], 0.05],
  ...head(T.h5, 6, T.h5Land, 0),
  ['whoosh', T.ins[0] + 0.15, 0.35, 0.03], ['bell', T.ins[1], 1318.51, 0.03, 1.2, 0], ['glitter', T.ins[0] + 0.2, T.ins[1] + 0.5],
  ['whoosh', T.insOut[0] + 0.15, 0.3, 0.025],
  ...[T.playA, T.playB].flatMap((tp, i) => [['whoosh', tp + 0.12, 0.25, 0.03], ['tick', tp + 0.28, 0.05], ['pop', tp + 0.28, i ? 659.25 : 587.33, 0.03, i ? 0.3 : -0.3]]),
  // 6 · the reveal
  ['pop', T.h6 - 0.02, 160, 0.07, -0.4], ['pop', T.h6 + 0.05, 150, 0.07, 0.4],
  ...head(T.h6, 3, T.h6Land, 2),
  ...roll(T.roll[0], T.roll[1]),
  ['tick', T.flip + 0.02, 0.05], ['tick', T.flip + 0.1, 0.05], ['bell', T.flip + 0.05, 1318.51, 0.04, 1.6, 0], ['glitter', T.flip + 0.05, T.flip + 0.6],
  ['pluck', T.flip + 0.3, 1174.66, 0.04, 0.4, -0.3], ['pluck', T.flip + 0.43, 1318.51, 0.04, 0.4, 0.3],
  ['whoosh', T.home[0] + 0.2, 0.35, 0.03],
  // 7 · they're laughing
  ['swell', T.lift2 - 0.7, T.lift2, { gain: 0.05, f0: 600, f1: 4000 }],
  ...Array.from({ length: 10 }, (_, i) => ['pop', +(T.lift2 + 0.02 + i * 0.03).toFixed(3), NOTE[(i * 3) % 7], 0.03, +(((i % 5) / 4 - 0.5) * 1.2).toFixed(2)]),
  ['whoosh', T.hats + 0.15, 0.35, 0.04], ['whoosh', T.hats + 0.25, 0.35, 0.035],
  ['glitter', T.lift2, T.lift2 + 0.8],
  ...claps(T.lift2 + 0.1, T.lift2 + 3.2, 11),
  ...head(T.h7, 2, T.h7Land, 4),
  ...Array.from({ length: 10 }, (_, i) => ['pop', +(T.lift2 + 0.2 + i * 0.5).toFixed(3), i % 2 ? 1318.51 : 1174.66, 0.014, i % 2 ? 0.4 : -0.4]),
  ['chip', T.wail, 1046.5, 1.0, { duty: 0.25, slide: -5, vib: 0.035, gain: 0.014, decay: 0.8, sustain: 0.8, pan: 0.5, rev: 0.25, dly: 0.1, bus: 'fx' }],
  ...Array.from({ length: 6 }, (_, i) => ['pop', +(T.wail + 0.02 + i * 0.04).toFixed(3), NOTE[(i * 2 + 1) % 7], 0.025, 0]),
  // 8 · LESSON UNLOCKED
  ...levelUp(T.banner),
  ['glitter', T.banner + 0.1, T.banner + 0.9], ['bell', T.banner + 0.4, 1760, 0.03, 1.6, 0],
  ...wordPops(T.lesson, 6, 0.08, 1, 0.024), ['pop', T.lessonLate, 1174.66, 0.05, 0], ['pluck', T.lessonLate, 1174.66, 0.045, 0.8, 0],
  // 9 · stay tuned
  ['chip', T.bars + 0.05, 1000, 0.4, { wave: 'tri', gain: 0.012, decay: 1, sustain: 1, ...FXO }],
  ...head(T.h9, 2, T.h9Land, 2),
  ...[0, 1, 2, 3].map(i => ['tick', +(T.dab[0] + i * 0.42 + 0.05).toFixed(3), 0.02]),
  ...honk(T.honk),
  ['pop', T.lookP, 880, 0.03, 0.4], ['pop', T.lookP + 0.06, 1046.5, 0.025, 0.4],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void dLT
