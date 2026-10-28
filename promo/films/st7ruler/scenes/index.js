// st7ruler (30 s vertical Align ad, Star Talk season 7 "SIGN TO SIGN", EP 09) · story 0–25.6, then the shared end card.
//   Gemini × Virgo in a group chat, co-writing one text for Cancer after a rough day: ten drafts, then one kind sentence.
//   The real hook: both signs are ruled by Mercury, the messenger (Gemini is air, Virgo is earth). A callback to
//   starmercury (the ☿ orb drops between them again).
//   0.00–2.60  opener: ★ SIGN TO SIGN ★ · ♊ × ♍ · "a group chat, two editors"
//   2.7        "One text. | Ten *drafts.*"  GEMINI (left) and VIRGO (right) either side of a giant phone; the draft on its
//              screen rewrites itself line by line, DRAFT n/10 counting up, rejected drafts struck through.
//   ~13        The ☿ orb drops above the phone. SKY NOTE (both ruled by Mercury).
//   ~19        Draft 10 sends: "i'm here. no advice. want soup?" ✓ and Cancer hearts it.
//   ~21        VIRGO: "Same ruler. | *Your* voice."  Plain sky at 25.6, end card.
// One canvas (sky + seed constellation + the phone + cast), DOM type, grain on top. Pure f(t). Dialogue kit: ../s7talk.js.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawBits } from '../../st5cast.js'
import { seq, chatThread, skyNote, opener, lastLine, drawTalkMarks, speaking, threadCues, noteCues, openerCues, lastLineCues, OPENER_LEN, lite } from '../s7talk.js'

export const DURATION = 30
const KEY = 'A'
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236'
const GEM = signStar('gemini'), VIR = signStar('virgo'), CAN = signStar('cancer')
const CAST = {
  GEMINI: { tag: '♊ GEMINI', color: GEM.color, side: 'L', pitch: 987.77 },
  VIRGO: { tag: '♍ VIRGO', color: VIR.color, side: 'R', pitch: 587.33 },
}
const CPS = 30
const G_ = (x, o = {}) => ({ s: 'GEMINI', x, ...o }), V_ = (x, o = {}) => ({ s: 'VIRGO', x, ...o })
const SCRIPT = seq(3.0, [
  G_('Cancer had a rough day. what do we *text?*', { hold: 1.5 }),
  V_('something kind. and *proofread.*', { hold: 1.4 }),
  G_('draft 4: “omg NOOO call me?? or don’t!! or DO”', { hold: 1.5 }),
  V_('draft 7: “Per my last message…” *delete.*', { hold: 1.5 }),
  { mark: 'mercury' },
  G_('same ruler, and we write *this* differently?', { pre: 0.3, hold: 1.7 }),
  V_('Mercury. you talk it out. i *edit* it down.', { hold: 1.4 }),
], { cast: CAST, cps: CPS, hold: 1.5 })
const LINES = SCRIPT.lines, M = SCRIPT.marks
const T = {
  open: 0, h1: 2.7, h1Land: 3.0,
  mercury: M.mercury, orb: M.mercury + 0.1,
  close: SCRIPT.end - 0.1,
}
T.h1Out = [T.mercury - 0.4, T.mercury - 0.15]
T.note = T.mercury + 0.25; T.noteOut = [T.note + 4.6, T.note + 4.85]
T.sent = LINES[5].t + 1.8; T.heart = T.sent + 0.9
T.last = SCRIPT.end + 0.15; T.out = [STORY_END - 0.45, STORY_END - 0.05]
T.ghost = LINES[2].t + 0.6
export const BEATS = T
const LAST = { text: 'Same ruler. | *Your* voice.' }
const NOTE = 'Gemini (air) and Virgo (earth) are both | ruled by *Mercury,* the messenger planet.'

// ── the giant phone and its drafts (time → [draft number, text, struck?])
const PH = { x0: 320, x1: 760, y0: 540, y1: 1330 }
const POS = { GEMINI: { x: 172, y: 1200 }, VIRGO: { x: 908, y: 1200 } }
const MUG = { x: 440, y: 1394 }
export const GHOST = { at: T.ghost, x: MUG.x, y: MUG.y - 40, where: 'rising out of the tea mug at the foot of the giant phone' }
const DRAFTS = [
  [LINES[0].t + 0.6, 1, 'hey'], [LINES[0].t + 1.4, 2, 'hey :( that sucks'], [LINES[1].t + 0.9, 3, 'so sorry. that is so so so so sad'],
  [LINES[2].t, 4, 'omg NOOO call me?? or don’t!! or DO', true], [LINES[2].t + 2.6, 5, 'thinking of u'], [LINES[3].t - 0.6, 6, 'Dear Cancer, I was sorry to hear'],
  [LINES[3].t, 7, 'Per my last message…', true], [LINES[4].t + 0.4, 8, 'u ok? also did u eat'], [LINES[5].t, 9, 'here if you need. or not. whichever'],
  [LINES[5].t + 1.1, 10, 'i’m here. no advice. want soup?'],
]

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const HOPS = { GEMINI: [OPENER_LEN + 0.3, ...talkHops(LINES, CAST.GEMINI.tag, { cps: CPS }), T.sent + 0.05], VIRGO: [OPENER_LEN + 0.45, ...talkHops(LINES, CAST.VIRGO.tag, { cps: CPS }), T.sent + 0.12, T.last + 0.1, T.last + 0.6, T.last + 1.1] }
const lineAt = t => { let c = null; for (const l of LINES) if (t >= l.t) c = l; return c }
function moods(t) {
  const li = LINES.indexOf(lineAt(t))
  const tb = [   // [gemini, virgo]
    [{ mood: 'wide', look: [1, 0] }, { mood: 'neutral', look: [-1, 0] }],
    [{ mood: 'happy', look: [1, 0] }, { mood: 'squint', look: [-1, -1] }],
    [{ mood: 'sparkle', look: [1, -1] }, { mood: 'wide', look: [-1, -1], blink: false }],
    [{ mood: 'eyeroll' }, { mood: 'squint', look: [-1, 0] }],
    [{ mood: 'wide', look: [0, -1] }, { mood: 'neutral', look: [0, -1] }],
    [{ mood: 'happy', look: [1, 0] }, { mood: 'happy', look: [-1, 0] }],
  ]
  if (t < LINES[0].t) return [{ mood: 'neutral', look: [1, 0] }, { mood: 'neutral', look: [-1, 0] }]
  if (t >= T.sent) return [{ mood: t >= T.heart ? 'heart' : 'sparkle', look: [1, -1] }, { mood: t >= T.last ? 'sparkle' : 'heart', look: [-1, -1] }]
  return tb[li] || tb[tb.length - 1]
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "600 36px Inter", "italic 500 160px 'EB Garamond'", "700 42px 'Space Mono'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const H1 = popText(root, 'One text. | Ten *drafts.*', { top: 196, size: 104, accentSize: 164, at: T.h1, gap: 0.08, accentColor: lite(VIR.color, 0.25), wobble: true, late: 1, lateAt: T.h1Land + 0.2, fit: true })
  const open = opener(root, { at: T.open, cast: [{ glyph: '♊', name: 'Gemini', color: GEM.color }, { glyph: '♍', name: 'Virgo', color: VIR.color }], place: 'a group chat, two editors' })
  const thread = chatThread(root, { lines: LINES, cast: CAST, close: T.close, cps: CPS })
  const note = skyNote(root, { at: T.note, out: T.noteOut, text: NOTE, top: 176, width: 920 })
  const last = lastLine(root, { at: T.last, out: T.out, text: LAST.text, tag: CAST.VIRGO.tag, color: VIR.color, top: 1450, size: 108, accentSize: 180 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)
  const R = (c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }
  const font = (s, w = 700, f = "'Space Mono', monospace") => { x.font = `${w} ${s}px ${f}` }
  function wrap(s, maxW) {
    const out = []; let cur = ''
    for (const w of s.split(' ')) { const tr = cur ? cur + ' ' + w : w; if (x.measureText(tr).width > maxW && cur) { out.push(cur); cur = w } else cur = tr }
    if (cur) out.push(cur)
    return out
  }

  function phone(t) {
    const { x0, x1, y0, y1 } = PH, cx = (x0 + x1) / 2
    // body + screen
    R(INK, x0 - 6, y0 - 6, x1 - x0 + 12, y1 - y0 + 12); R('#2b2550', x0, y0, x1 - x0, y1 - y0)
    R('#0c0a22', x0 + 18, y0 + 50, x1 - x0 - 36, y1 - y0 - 96); R('#3b3466', cx - 40, y0 + 20, 80, 10); R('#3b3466', cx - 30, y1 - 32, 60, 14)
    // chat header
    R('#181540', x0 + 18, y0 + 50, x1 - x0 - 36, 74)
    x.fillStyle = CAN.color; x.beginPath(); x.arc(x0 + 62, y0 + 87, 22, 0, Math.PI * 2); x.fill()
    font(26, 700, "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"); x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#fffaf0'; x.fillText(CAN.glyph + '︎', x0 + 62, y0 + 89)
    font(26); x.textAlign = 'left'; x.fillStyle = BONE; x.fillText('Cancer', x0 + 96, y0 + 80); font(18, 400); x.fillStyle = '#9a93c4'; x.fillText('the group chat', x0 + 96, y0 + 106)
    // Cancer's sad message at the top of the chat
    R('#2c2860', x0 + 34, y0 + 146, 280, 64); font(22, 400); x.fillStyle = BONE; x.fillText('rough day :(', x0 + 50, y0 + 178)
    // the draft
    let d = null; for (const D of DRAFTS) if (t >= D[0]) d = D
    const sent = t >= T.sent
    const dy = y0 + 330
    if (d && !sent) {
      const age = t - d[0], typed = Math.min(d[2].length, Math.floor(age * 34))
      font(20); x.fillStyle = d[1] === 10 ? GOLD : '#9a93c4'; x.textAlign = 'center'; x.fillText(`DRAFT ${d[1]}/10`, cx, dy - 26)
      R(d[1] === 10 ? '#3d3070' : '#1d1a44', x0 + 34, dy - 6, x1 - x0 - 68, 170)
      font(30, 400); x.textAlign = 'left'; x.fillStyle = BONE
      const lines = wrap(d[2].slice(0, typed), x1 - x0 - 100)
      lines.forEach((l, i) => x.fillText(l, x0 + 50, dy + 30 + i * 38))
      if (d[3] && age > 1.0) { x.fillStyle = '#ff5a7a'; lines.forEach((l, i) => x.fillRect(x0 + 48, dy + 28 + i * 38, Math.min(x.measureText(l).width + 4, (age - 1.0) * 600), 4)) }
      if (Math.sin(t * 10) > 0 && typed < d[2].length + 1) { const lw = lines.length ? x.measureText(lines[lines.length - 1]).width : 0; R(GOLD, x0 + 52 + lw, dy + 12 + Math.max(0, lines.length - 1) * 38, 3, 34) }
    }
    // send button / the sent bubble
    if (!sent) { R(t > T.sent - 0.6 ? GOLD : '#3b3466', x1 - 92, y1 - 86, 56, 40); font(22); x.textAlign = 'center'; x.fillStyle = INK; x.fillText('➤', x1 - 64, y1 - 64) }
    if (sent) {
      const p = easeOutBack(prog(t, T.sent, T.sent + 0.35), 2.2), by = lerp(y0 + 400, y0 + 330, ease.outCubic(prog(t, T.sent, T.sent + 0.4)))
      x.save(); x.translate(x1 - 40, by); x.scale(p, p)
      R(lite(VIR.color, 0.1), -384, -60, 364, 120); font(28, 700); x.textAlign = 'left'; x.fillStyle = INK
      x.fillText('i’m here. no advice.', -366, -22); x.fillText('want soup?', -366, 16)
      font(18); x.fillStyle = '#5a1840'; x.textAlign = 'right'; x.fillText('sent ✓', -32, 42)
      x.restore()
      const h = easeOutBack(prog(t, T.heart, T.heart + 0.35), 2.6)
      if (h > 0) { drawBits(x, HEART, HEART_C, x0 + 62, by + 94, 6 * h); font(22, 400); x.textAlign = 'left'; x.fillStyle = '#c9c2ee'; x.fillText('Cancer loved this', x0 + 94, by + 96) }
    }
  }
  function orb(t) {
    const p = prog(t, T.orb, T.orb + 0.6)
    if (p <= 0) return
    const y = lerp(-80, 432, ease.outCubic(p)) + Math.sin(t * 2.4) * 6, k = 1 - prog(t, T.last, T.last + 0.5)
    if (k <= 0) return
    x.save(); x.globalAlpha *= k
    const g = x.createRadialGradient(540, y, 4, 540, y, 110); g.addColorStop(0, 'rgba(255,220,140,0.5)'); g.addColorStop(1, 'rgba(255,220,140,0)'); x.fillStyle = g; x.fillRect(420, y - 120, 240, 240)
    x.fillStyle = INK; x.beginPath(); x.arc(540, y, 52, 0, Math.PI * 2); x.fill()
    x.fillStyle = GOLD; x.beginPath(); x.arc(540, y, 46, 0, Math.PI * 2); x.fill()
    font(62, 700, "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"); x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('☿︎', 540, y + 4)
    // two beams: one to each of them
    x.fillStyle = 'rgba(242,199,92,0.55)'
    for (const tx of [POS.GEMINI.x, POS.VIRGO.x]) for (let u = 0.25; u < 0.9; u += 0.07) x.fillRect(Math.round(lerp(540, tx, u) - 3), Math.round(lerp(y, POS.GEMINI.y - 120, u) - 3), 6, 6)
    x.restore()
  }
  function mug(t) {
    drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'below', cell: 3 })
    drawBits(x, MUGB, MUG_C, MUG.x, MUG.y, 8)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, 100, { alpha: 0.5 })
      const ok = outK(t, T.out), setK = ease.outCubic(prog(t, OPENER_LEN - 0.2, OPENER_LEN + 0.3))
      if (setK > 0) {
        x.save(); x.globalAlpha = setK * (0.25 + 0.75 * ok)
        phone(t)
        orb(t)
        mug(t)
        const [mg, mv] = moods(t)
        const rg = drawStarChar(x, POS.GEMINI.x, POS.GEMINI.y, 240, t, { ...GEM, ...mg, pop: pop01(t, OPENER_LEN, 0.4, 2.2), seed: 6, hops: HOPS.GEMINI, glow: 0.9, bob: 12 })
        const rv = drawStarChar(x, POS.VIRGO.x, POS.VIRGO.y, 240, t, { ...VIR, ...mv, pop: pop01(t, OPENER_LEN + 0.12, 0.4, 2.2), seed: 11, hops: HOPS.VIRGO, glow: 0.9, bob: 3 })
        drawBits(x, PEN, PEN_C, rv.x - 110, rv.y + 20, 6, { rot: -0.5 + Math.sin(t * 6) * 0.06 * speaking(LINES, 'VIRGO', t, { cps: CPS }) })
        drawTalkMarks(x, rg.x, rg.top, t, speaking(LINES, 'GEMINI', t, { cps: CPS }), GEM.color)
        drawTalkMarks(x, rv.x, rv.top, t, Math.max(speaking(LINES, 'VIRGO', t, { cps: CPS }), prog(t, T.last, T.last + 0.2) * (1 - prog(t, T.last + 1.6, T.last + 1.9))), VIR.color)
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
const HEART = ['.RR.RR.', 'RRRRRRR', 'RRRRRRR', '.RRRRR.', '..RRR..', '...R...']
const HEART_C = { R: '#ff5a7a' }
const MUGB = ['WWWWWW..', 'WTTTTWWW', 'WTTTTW.W', 'WTTTTWWW', 'WTTTTW..', '.WWWW...']
const MUG_C = { W: '#efe6d6', T: '#b5763a' }
const PEN = ['......K', '.....RK', '....RR.', '...RR..', '..RR...', '.RR....', 'GR.....']
const PEN_C = { K: '#1d1830', R: '#e85a4a', G: '#f2c75c' }

// card-motif candidates: the Mercury beat, the hand-off to the last line
const CUTS = [{ t: T.mercury - 0.08, kind: 'flip' }, { t: T.last - 0.08, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S7 E09' }), cardCuts(CUTS)]

// ── sound
const r3 = v => +v.toFixed(3)
const NOTE_HZ = [587.33, 659.25, 739.99, 880, 987.77, 1108.73, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE_HZ[(base + i) % NOTE_HZ.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...openerCues(T.open, 2),
  ['pop', r3(OPENER_LEN + 0.05), 987.77, 0.04, -0.4], ['pop', r3(OPENER_LEN + 0.17), 587.33, 0.04, 0.4],
  ...wordPops(T.h1, 3, 0.08, 0), ['pop', r3(T.h1Land + 0.2), 1318.51, 0.045, 0],
  ...threadCues(LINES, CAST, { cps: CPS }),
  ...DRAFTS.map(([t, n]) => ['tick', r3(t), 0.02]),
  ['whoosh', r3(T.orb), 0.5, 0.03], ['bell', r3(T.orb + 0.6), 1760, 0.03, 1.6, 0], ['glitter', r3(T.orb + 0.5), r3(T.orb + 1.2)],
  ...noteCues(T.note, T.noteOut),
  ['whoosh', r3(T.sent), 0.3, 0.03], ['pop', r3(T.sent + 0.05), 1318.51, 0.05, 0.2], ['pop', r3(T.heart), 1760, 0.04, 0.2], ['glitter', r3(T.heart), r3(T.heart + 0.5)],
  ['tick', r3(T.ghost + 0.05), 0.015],
  ...lastLineCues(T.last, LAST.text),
  ['whoosh', T.out[0], 0.35, 0.025],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
