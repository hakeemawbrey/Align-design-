// st7twins (20 s vertical Align ad, Star Talk season 7 "SIGN TO SIGN", EP 07) · story 0–15.6, then the shared end card.
//   Gemini × the twin (season 5's mustached prankster, drawTwin from st5cast.js) in bunk beds, the night after the fake
//   "we should see other people" text to Sagittarius. The real hook: in Greek myth, when the mortal twin Castor died,
//   Pollux shared his immortality so the two could stay together. In the sky they are Gemini's two bright stars, Castor
//   and Pollux (Pollux is the brighter).
//   0.00–2.60  opener: ★ SIGN TO SIGN ★ · ♊ × ♊ · "bunk beds, lights out"
//   2.7        "Bunk-bed | *truce.*"  THE TWIN on the top bunk (phone in hand), GEMINI below, arms crossed (squinting).
//   ~5.9       GEMINI: "you'd give me half your *forever.* i know." The glow-in-the-dark stickers on the wall link up into
//              the real Gemini, CASTOR and POLLUX labelled. SKY NOTE (the myth, attributed).
//   ~11.3      GEMINI: "Half of forever | is still *forever.*"  Plain sky at 15.6, end card.
// One canvas (sky + seed constellation + the bedroom + cast), DOM type, grain on top. Pure f(t). Dialogue kit: ../s7talk.js.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawBits, drawTwin, TWIN } from '../../st5cast.js'
import { seq, chatThread, skyNote, opener, lastLine, drawStarMap, drawTalkMarks, speaking, threadCues, noteCues, openerCues, lastLineCues, OPENER_LEN, lite } from '../s7talk.js'

export const DURATION = 20
const KEY = 'C#'
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', GLOW = '#b8ffd2', AMBER = '#ff9a3c'
const GEM = signStar('gemini')
const CAST = {
  TWIN: { tag: TWIN.tag, color: AMBER, side: 'R', pitch: 659.25 },   // amber, so the two Geminis' boxes differ
  GEMINI: { tag: '♊ GEMINI', color: GEM.color, side: 'L', pitch: 880 },
}
const CPS = 30
const W_ = (x, o = {}) => ({ s: 'TWIN', x, ...o }), G_ = (x, o = {}) => ({ s: 'GEMINI', x, ...o })
const SCRIPT = seq(3.0, [
  W_('sorry for the fake text to Sag. not *cool.*', { hold: 1.6 }),
  { mark: 'myth' },
  G_('you’d give me half your *forever.* i know.', { hold: 2.0 }),
  W_('…so we’re *good?*', { hold: 1.3 }),
], { cast: CAST, cps: CPS, hold: 1.6 })
const LINES = SCRIPT.lines, M = SCRIPT.marks
const T = {
  open: 0, h1: 2.7, h1Land: 2.95,
  myth: M.myth, map: M.myth + 0.15,
  close: SCRIPT.end - 0.1,
}
T.h1Out = [T.myth - 0.35, T.myth - 0.1]
T.note = T.myth + 0.35; T.noteOut = [T.close - 0.3, T.close - 0.05]
T.last = SCRIPT.end + 0.15; T.out = [STORY_END - 0.45, STORY_END - 0.05]
T.ghost = LINES[2].t + 0.2
const LAST = { text: 'Half of forever | is still *forever.*' }
const NOTE = 'In Greek myth, when Castor died, Pollux | *shared his immortality* to stay with him.'

// ── the bedroom: a bunk bed, the wall above it covered in glow-in-the-dark stars
const POST = { L: 168, R: 932 }, TOP_Y = 1060, BOT_Y = 1392, LADDER = 252
const POS = { TWIN: { x: 690, y: 905 }, GEMINI: { x: 450, y: 1286 } }
export const GHOST = { at: T.ghost, x: LADDER, y: TOP_Y - 70, where: 'rising over the top of the bunk-bed ladder, left of the top bunk' }
// Gemini, real positions (RA h, Dec °, mag), east to the left
const RAW = [
  [7.577, 31.89, 1.58], [7.755, 28.03, 1.14],                                          // 0 Castor · 1 Pollux
  [7.186, 30.24, 4.4], [6.732, 25.13, 3.0], [6.383, 22.51, 2.9], [6.248, 22.51, 3.3],  // Castor's line: τ, Mebsuta ε, Tejat μ, Propus η
  [7.599, 26.90, 4.1], [7.335, 21.98, 3.5], [7.068, 20.57, 3.9], [6.629, 16.40, 1.93], // Pollux's line: υ, Wasat δ, Mekbuda ζ, Alhena γ
  [6.755, 12.90, 3.4],                                                                  // ξ
]
const proj = (() => { const ra0 = 7.0 * 15, de0 = 22.4, c = Math.cos(de0 * Math.PI / 180), k = 23, cx = 470, cy = 676; return ([ra, de]) => ({ x: Math.round(cx - (ra * 15 - ra0) * c * k), y: Math.round(cy - (de - de0) * k) }) })()
const MAP = RAW.map(r => ({ ...proj(r), mag: r[2] }))
const LINKS = [[0, 1], [0, 2], [2, 3], [3, 4], [4, 5], [1, 6], [6, 7], [7, 8], [8, 9], [7, 10]]
// the other glow stickers (decor only), scattered on the wall
const DECOR = [[150, 440], [930, 500], [330, 800], [860, 820], [150, 760], [960, 690], [760, 450], [880, 620]]

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const HOPS = { TWIN: [OPENER_LEN + 0.3, ...talkHops(LINES, CAST.TWIN.tag, { cps: CPS })], GEMINI: [OPENER_LEN + 0.45, ...talkHops(LINES, CAST.GEMINI.tag, { cps: CPS }), T.last + 0.1, T.last + 0.6, T.last + 1.1] }
const lineAt = t => { let c = null; for (const l of LINES) if (t >= l.t) c = l; return c }
function moods(t) {
  const li = LINES.indexOf(lineAt(t))
  const tb = [   // [twin, gemini]
    [{ mood: 'neutral', look: [-1, 1] }, { mood: 'squint', look: [1, -1] }],
    [{ mood: 'wide', look: [-1, 1], blink: false }, { mood: t > T.map + 1.2 ? 'sparkle' : 'happy', look: [1, -1] }],
    [{ mood: 'heart' }, { mood: 'wink', look: [1, -1] }],
  ]
  if (t < LINES[0].t) return [{ mood: 'sleepy', zzz: false, look: [-1, 1] }, { mood: 'squint', look: [-1, 0] }]
  if (t >= T.last) return [{ mood: 'heart' }, { mood: 'sparkle', look: [1, -1] }]
  return tb[li] || tb[tb.length - 1]
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "600 36px Inter", "italic 500 160px 'EB Garamond'", "700 42px 'Space Mono'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const H1 = popText(root, 'Bunk-bed | *truce.*', { top: 196, size: 116, accentSize: 180, at: T.h1, gap: 0.08, accentColor: lite(GEM.color, 0.2), wobble: true, fit: true })
  const open = opener(root, { at: T.open, cast: [{ glyph: '♊', name: 'Gemini', color: GEM.color }, { glyph: '♊', name: 'the twin', color: AMBER }], place: 'bunk beds, lights out' })
  const thread = chatThread(root, { lines: LINES, cast: CAST, close: T.close, cps: CPS })
  const note = skyNote(root, { at: T.note, out: T.noteOut, text: NOTE, top: 176, width: 920 })
  const last = lastLine(root, { at: T.last, out: T.out, text: LAST.text, tag: CAST.GEMINI.tag, color: GEM.color, top: 1450, size: 100, accentSize: 170 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)
  const R = (c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }

  function wall(t) {
    // the bedroom wall: a deep night-blue panel with a skirting board
    R(INK, 60, 400, 960, 1070)
    const g = x.createLinearGradient(0, 400, 0, 1470); g.addColorStop(0, '#16153a'); g.addColorStop(1, '#0d0c26')
    x.fillStyle = g; x.fillRect(68, 408, 944, 1054)
    // glow stickers: the Gemini ones sit faint until the myth line, then link up
    const mk = prog(t, T.map, T.map + 0.4)
    x.save(); x.globalAlpha *= 0.55 * (1 - mk) + 0.1
    MAP.forEach((s, i) => drawPixelStar(x, s.x, s.y, 16 + (s.mag < 2 ? 6 : 0), 1, GLOW))
    x.restore()
    DECOR.forEach(([dx, dy], i) => { x.save(); x.globalAlpha *= 0.35 + 0.2 * Math.sin(t * 1.7 + i); drawPixelStar(x, dx, dy, 14, 1, GLOW); x.restore() })
    if (mk > 0) {
      const g2 = x.createRadialGradient(470, 676, 20, 470, 676, 380); g2.addColorStop(0, `rgba(120,255,200,${0.12 * mk})`); g2.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g2; x.fillRect(120, 420, 840, 460)
      const ok = 1 - prog(t, T.last + 0.6, T.last + 1.2) * 0.5
      drawStarMap(x, t, { stars: MAP.map((s, i) => ({ ...s, color: i === 0 || i === 1 ? GOLD : GLOW })), links: LINKS, color: GLOW, at: T.map, dur: 1.6, k: mk * ok,
        labels: [{ i: 0, text: 'CASTOR', dx: 0, dy: -36, align: 'center', at: T.map + 1.4 }, { i: 1, text: 'POLLUX', sub: 'the brighter twin', dx: 0, dy: 42, align: 'center', at: T.map + 1.7 }] })
    }
  }
  function frameBack() {
    // posts (behind the cast), the top bunk's underside
    for (const px of [POST.L, POST.R]) { R(INK, px - 20, 880, 40, 590); R('#9c6a3c', px - 14, 886, 28, 578) }
    R(INK, POST.L, TOP_Y + 30, POST.R - POST.L, 40); R('#7a4f2c', POST.L, TOP_Y + 36, POST.R - POST.L, 28)
  }
  function topBunkFront() {
    // the twin's yellow blanket + the guard rail in front of it
    R(INK, POST.L + 10, TOP_Y - 22, POST.R - POST.L - 20, 60); R('#e0a92c', POST.L + 14, TOP_Y - 18, POST.R - POST.L - 28, 52)
    for (let i = 0; i < 9; i++) R('#f2cf4a', POST.L + 40 + i * 80, TOP_Y - 18, 24, 52)
    R(INK, POST.L + 300, TOP_Y - 70, POST.R - POST.L - 300, 26); R('#b07a46', POST.L + 304, TOP_Y - 66, POST.R - POST.L - 308, 18)
  }
  function ladder() {
    for (const lx of [LADDER - 52, LADDER + 52]) { R(INK, lx - 10, TOP_Y - 80, 20, 560); R('#b07a46', lx - 6, TOP_Y - 76, 12, 552) }
    for (let i = 0; i < 4; i++) { R(INK, LADDER - 52, TOP_Y + 110 + i * 86, 104, 18); R('#c98a52', LADDER - 48, TOP_Y + 114 + i * 86, 96, 10) }
  }
  function bottomBunkFront() {
    R(INK, POST.L + 10, BOT_Y - 22, POST.R - POST.L - 20, 80); R('#4f6fd6', POST.L + 14, BOT_Y - 18, POST.R - POST.L - 28, 72)
    for (let i = 0; i < 6; i++) drawPixelStar(x, POST.L + 120 + i * 120, BOT_Y + 18, 18, 1, '#f2cf4a')
  }
  function phone(t, r) {
    // the guilty phone: on until Gemini forgives, then tucked away
    const k = 1 - prog(t, LINES[1].t + 0.6, LINES[1].t + 1.0)
    if (k <= 0) return
    x.save(); x.globalAlpha *= k
    drawBits(x, PHONE, PHONE_C, r.x - 112, r.y + 22 + (1 - k) * 30, 6, { rot: -0.3 })
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, 100, { alpha: 0.5 })
      const ok = outK(t, T.out), setK = ease.outCubic(prog(t, OPENER_LEN - 0.2, OPENER_LEN + 0.3))
      if (setK > 0) {
        x.save(); x.globalAlpha = setK * (0.25 + 0.75 * ok)
        wall(t)
        frameBack()
        const [mt, mg] = moods(t)
        const rt = drawTwin(x, POS.TWIN.x, POS.TWIN.y, 200, t, { ...mt, pop: pop01(t, OPENER_LEN, 0.4, 2.2), seed: 22, hops: HOPS.TWIN, glow: 0.85, twitch: [LINES[0].t + 0.4, LINES[2].t + 0.3] })
        phone(t, rt)
        topBunkFront()
        ladder()
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'below', cell: 3 })
        R(INK, LADDER - 52, GHOST.y - 4, 104, 14); R('#c98a52', LADDER - 48, GHOST.y, 96, 8)        // the top rung it hides behind
        const rg = drawStarChar(x, POS.GEMINI.x, POS.GEMINI.y, 200, t, { ...GEM, ...mg, pop: pop01(t, OPENER_LEN + 0.12, 0.4, 2.2), seed: 5, hops: HOPS.GEMINI, glow: 0.85 })
        bottomBunkFront()
        drawTalkMarks(x, rt.x, rt.top, t, speaking(LINES, 'TWIN', t, { cps: CPS }), AMBER)
        drawTalkMarks(x, rg.x, rg.top, t, Math.max(speaking(LINES, 'GEMINI', t, { cps: CPS }), prog(t, T.last, T.last + 0.2) * (1 - prog(t, T.last + 1.6, T.last + 1.9))), GEM.color)
        x.restore()
      }
      open.update(t)
      H1.update(t, outK(t, T.h1Out))
      thread.update(t)
      note.update(t)
      last.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      drawGrain(gx, t)
    },
  }
}

// ── pixel art
const PHONE = ['KKKKK', 'KSSSK', 'KRSRK', 'KSRSK', 'KRSRK', 'KSSSK', 'KKKKK']
const PHONE_C = { K: '#1d1830', S: '#9fe8ff', R: '#ff5a7a' }

// card-motif candidates: the myth line, the hand-off to the last line
const CUTS = [{ t: T.myth - 0.08, kind: 'flip' }, { t: T.last - 0.08, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S7 E07' }), cardCuts(CUTS)]

// ── sound
const r3 = v => +v.toFixed(3)
const NOTE_HZ = [554.37, 622.25, 698.46, 830.61, 932.33, 1108.73, 1244.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE_HZ[(base + i) % NOTE_HZ.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...openerCues(T.open, 2),
  ['pop', r3(OPENER_LEN + 0.05), 830.61, 0.04, 0.4], ['pop', r3(OPENER_LEN + 0.17), 554.37, 0.04, -0.4],
  ...wordPops(T.h1, 2, 0.08, 0),
  ...threadCues(LINES, CAST, { cps: CPS }),
  ['glitter', r3(T.map), r3(T.map + 1.4)], ['bell', r3(T.map + 1.45), 1108.73, 0.03, 1.4, 0.3], ['bell', r3(T.map + 1.75), 1396.91, 0.03, 1.4, 0.3],
  ...noteCues(T.note, T.noteOut),
  ['tick', r3(T.ghost + 0.05), 0.015],
  ...lastLineCues(T.last, LAST.text),
  ['whoosh', T.out[0], 0.35, 0.025],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
