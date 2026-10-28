// st7cardinals (60 s vertical Align ad, Star Talk season 7 "SIGN TO SIGN", EP 11) · story 0–55.6, then the shared end card.
//   Aries · Cancer · Libra · Capricorn, the four cardinal signs, hold a "season starters" meeting to plan one group trip.
//   The real hook: in the tropical zodiac each cardinal sign begins at an equinox or a solstice (Aries the March equinox,
//   Cancer the June solstice, Libra the September equinox, Capricorn the December solstice), so they "start" the seasons
//   (named as north of the equator). Natural starters, bad at middles: they confess the burnout, then finish ONE thing.
//   0.00–2.60  opener: ★ SIGN TO SIGN ★ · ♈ ♋ ♌ ♑ · "a season starters meeting"
//   2.7        "Season | *starters.*"  Four chairs, a whiteboard: the trip checklist ticks (chat ✓ list ✓ mood boards ✓
//              spreadsheet ✓ … dates ✗). SKY NOTE (cardinal signs).
//   ~19        The whiteboard flips to the year wheel: the four turning points draw in as each claims its season. SKY NOTE.
//   ~32        "The *middle.*"  Burnout confessions, one each.
//   ~44        The board flips to ONE TRIP: dates, snacks, rest stops, "FINISH IT". ALL FOUR: "deal."
//   ~52        CAPRICORN: "Starting is easy. | *Stay* for the middle."  Plain sky at 55.6, end card.
// One canvas (sky + seed constellation + meeting room + cast), DOM type, grain on top. Pure f(t). Dialogue kit: ../s7talk.js.
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
import { seq, chatThread, skyNote, opener, lastLine, drawTalkMarks, speaking, threadCues, noteCues, openerCues, lastLineCues, OPENER_LEN, lite } from '../s7talk.js'

export const DURATION = 60
const KEY = 'B'
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', MARK = '#2a3a8a', RED = '#c8323f', GREEN = '#2f8a4a'
const ARI = signStar('aries'), CAN = signStar('cancer'), LIB = signStar('libra'), CAP = signStar('capricorn')
const ORDER = ['ARIES', 'CANCER', 'LIBRA', 'CAPRICORN']
const SIGN = { ARIES: ARI, CANCER: CAN, LIBRA: LIB, CAPRICORN: CAP }
const SEATS = { ARIES: 150, CANCER: 400, LIBRA: 680, CAPRICORN: 930 }
const CAST = {
  ARIES: { tag: '♈ ARIES', color: ARI.color, side: 'L', pitch: 880, tagX: 0 },
  CANCER: { tag: '♋ CANCER', color: CAN.color, side: 'L', pitch: 659.25, tagX: 0.36 },
  LIBRA: { tag: '♎ LIBRA', color: LIB.color, side: 'R', pitch: 739.99, tagX: 0.64 },
  CAPRICORN: { tag: '♑ CAPRICORN', color: CAP.color, side: 'R', pitch: 493.88, tagX: 1 },
  ALL: { tag: '★ ALL FOUR', color: GOLD, side: 'C', pitch: 659.25 },
}
const CPS = 30
const S = (s, x, o = {}) => ({ s, x, ...o })
const SCRIPT = seq(3.05, [
  S('CAPRICORN', 'season starters meeting. item one: the *trip.*'),
  S('ARIES', 'i already started the group *chat.*', { hold: 1.3 }),
  S('CANCER', 'i started a *packing* list.', { hold: 1.3 }),
  S('LIBRA', 'i started a mood board. *three,* actually.', { hold: 1.3 }),
  S('CAPRICORN', 'i started a spreadsheet. …nobody has *dates.*', { hold: 2.6 }),
  { mark: 'seasons' },
  S('ARIES', 'makes sense. i start *spring.* the March equinox.', { pre: 0.5 }),
  S('CANCER', 'i start *summer.* the longest day.'),
  S('LIBRA', 'i start *autumn.* day and night, equal.'),
  S('CAPRICORN', 'i start *winter.* the longest night.', { hold: 2.4 }),
  { mark: 'middle' },
  S('ARIES', 'honestly? the middle is where i get *bored.*', { pre: 0.5 }),
  S('CANCER', 'i start caring for everyone. then i’m *empty.*'),
  S('LIBRA', 'i start ten plans so nobody’s *let down.*'),
  S('CAPRICORN', 'i start the next goal before i *rest.*', { hold: 1.4 }),
  { mark: 'plan' },
  S('ARIES', 'so. *one* trip. first weekend of spring.', { pre: 0.4, hold: 1.3 }),
  S('CANCER', 'i’ll book it. snacks *and* rest stops.', { hold: 1.3 }),
  S('ALL', '*deal.*', { hold: 1.2 }),
], { cast: CAST, cps: CPS, hold: 1.5 })
const LINES = SCRIPT.lines, M = SCRIPT.marks
const T = {
  open: 0, h1: 2.7, h1Land: 3.0,
  seasons: M.seasons, flip2: M.seasons - 0.1,
  middle: M.middle, h3: M.middle - 0.05, h3Land: M.middle + 0.25,
  plan: M.plan, flip3: M.plan - 0.1,
  close: SCRIPT.end - 0.1,
}
T.note1 = LINES[4].t + 0.4; T.h1Out = [T.note1 - 0.35, T.note1 - 0.1]; T.note1Out = [T.seasons - 0.3, T.seasons - 0.05]
T.note2 = LINES[8].t + 1.2; T.note2Out = [T.middle - 0.3, T.middle - 0.05]
T.h3Out = [T.middle + 4.4, T.middle + 4.6]
T.last = SCRIPT.end + 0.2; T.out = [STORY_END - 0.45, STORY_END - 0.05]
T.ghost = LINES[11].t + 0.6
export const BEATS = T
const LAST = { text: 'Starting is easy. | *Stay* for the middle.' }
const NOTE1 = 'Aries, Cancer, Libra and Capricorn are the | *cardinal* signs: each one starts a season.'
const NOTE2 = 'Each begins at an *equinox or solstice* | (the seasons as named north of the equator).'

// ── the room
const BOARD = { x0: 150, x1: 930, y0: 470, y1: 890 }
const TABLE_Y = 1170
const POT = { x: 540, y: TABLE_Y - 8 }
export const GHOST = { at: T.ghost, x: POT.x, y: POT.y - 64, where: 'rising out of the coffee pot in the middle of the meeting table' }
const ALLT = LINES[LINES.length - 1].t

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const HOPS = Object.fromEntries(ORDER.map((k, i) => [k, [OPENER_LEN + 0.3 + i * 0.1, ...talkHops(LINES, CAST[k].tag, { cps: CPS }), ALLT + 0.05 + i * 0.04, ...(k === 'CAPRICORN' ? [T.last + 0.1, T.last + 0.6, T.last + 1.1] : [])]]))
const lineAt = t => { let c = null; for (const l of LINES) if (t >= l.t) c = l; return c }
function mood(k, t) {
  const L = lineAt(t)
  if (t >= T.last) return k === 'CAPRICORN' ? { mood: 'sparkle', look: [0, 0] } : { mood: 'happy', look: [0, 0] }
  if (!L) return { mood: 'neutral', look: [0, 0] }
  if (L.who === 'ALL') return { mood: 'happy', look: [0, 0] }
  const i = ORDER.indexOf(k), j = ORDER.indexOf(L.who), toward = [clamp(j - i, -1, 1), 0]
  const sec = t < T.seasons ? 'trip' : t < T.middle ? 'seasons' : t < T.plan ? 'middle' : 'plan'
  if (L.who === k) return { mood: sec === 'trip' ? (k === 'CAPRICORN' ? 'squint' : 'happy') : sec === 'seasons' ? 'sparkle' : sec === 'middle' ? (k === 'ARIES' ? 'eyeroll' : 'sleepy') : 'happy', look: [0, 0], zzz: false }
  if (sec === 'trip') return { mood: L === LINES[4] ? 'wide' : 'neutral', look: toward }
  if (sec === 'seasons') return { mood: 'neutral', look: [0, -1] }
  if (sec === 'middle') return { mood: 'neutral', look: toward, blink: undefined }
  return { mood: 'happy', look: toward }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "600 36px Inter", "italic 500 160px 'EB Garamond'", "700 42px 'Space Mono'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const H1 = popText(root, 'Season | *starters.*', { top: 196, size: 112, accentSize: 176, at: T.h1, gap: 0.08, accentColor: lite(ARI.color, 0.25), wobble: true, late: 1, lateAt: T.h1Land, fit: true })
  const H3 = popText(root, 'The *middle.*', { top: 196, size: 112, accentSize: 176, at: T.h3, gap: 0.08, accentColor: lite(CAN.color, 0.25), wobble: true, fit: true })
  const HEADS = [[H1, T.h1Out], [H3, T.h3Out]]
  const open = opener(root, { at: T.open, cast: ORDER.map(k => ({ glyph: SIGN[k].glyph, name: k[0] + k.slice(1).toLowerCase(), color: SIGN[k].color })), place: 'a season starters meeting' })
  const thread = chatThread(root, { lines: LINES, cast: CAST, close: T.close, cps: CPS })
  const notes = [[NOTE1, T.note1, T.note1Out], [NOTE2, T.note2, T.note2Out]].map(([text, at, out]) => skyNote(root, { at, out, text, top: 176, width: 940 }))
  const last = lastLine(root, { at: T.last, out: T.out, text: LAST.text, tag: CAST.CAPRICORN.tag, color: CAP.color, top: 1450, size: 96, accentSize: 160 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)
  const R = (c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }
  const txt = (s, cx, cy, size, col, align = 'left', f = `700 ${size}px 'Space Mono', monospace`) => { x.font = f; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(s, cx, cy) }
  const GL = `700 40px 'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif`

  function tick(cx, cy, ok, k) {
    if (k <= 0) return
    x.save(); x.globalAlpha *= k
    if (ok) { x.strokeStyle = GREEN; x.lineWidth = 7; x.beginPath(); x.moveTo(cx - 12, cy); x.lineTo(cx - 2, cy + 11); x.lineTo(cx + 16, cy - 14); x.stroke() }
    else { x.strokeStyle = RED; x.lineWidth = 7; x.beginPath(); x.moveTo(cx - 12, cy - 12); x.lineTo(cx + 12, cy + 12); x.moveTo(cx + 12, cy - 12); x.lineTo(cx - 12, cy + 12); x.stroke() }
    x.restore()
  }
  const pageAt = t => t < T.flip2 ? 0 : t < T.flip3 ? 1 : 2
  function page(i, t) {
    const { x0, x1, y0, y1 } = BOARD, cx = (x0 + x1) / 2
    R('#f4f6fb', x0, y0, x1 - x0, y1 - y0)
    if (i === 0) {
      txt('SEASON STARTERS', cx, y0 + 54, 40, MARK, 'center'); txt('agenda: one group trip', cx, y0 + 104, 36, MARK, 'center', `italic 500 38px 'EB Garamond', serif`)
      const items = [['group chat', 1], ['packing list', 2], ['mood boards (3)', 3], ['spreadsheet', 4]]
      items.forEach(([s, li], n) => { const k = prog(t, LINES[li].t + 0.3, LINES[li].t + 0.5); const y = y0 + 170 + n * 52; R('#c9cfe0', x0 + 60, y - 16, 32, 32); R('#f4f6fb', x0 + 64, y - 12, 24, 24); txt(s, x0 + 116, y, 32, MARK); tick(x0 + 76, y, true, k) })
      const yd = y0 + 170 + 4 * 52 + 10, kd = prog(t, LINES[4].t + 1.0, LINES[4].t + 1.2)
      R('#c9cfe0', x0 + 60, yd - 16, 32, 32); R('#f4f6fb', x0 + 64, yd - 12, 24, 24); txt('DATES?', x0 + 116, yd, 36, RED); tick(x0 + 76, yd, false, kd)
      return
    }
    if (i === 1) {
      // the year wheel: the Sun's yearly path with its four turning points
      const cy = (y0 + y1) / 2, r = 130
      txt('THE YEAR', cx, cy, 30, 'rgba(42,58,138,0.6)', 'center')
      x.strokeStyle = 'rgba(42,58,138,0.35)'; x.lineWidth = 6; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.stroke()
      const pts = [['ARIES', Math.PI, 'MARCH EQUINOX', 'right'], ['CANCER', -Math.PI / 2, 'JUNE SOLSTICE', 'center'], ['LIBRA', 0, 'SEPT. EQUINOX', 'left'], ['CAPRICORN', Math.PI / 2, 'DEC. SOLSTICE', 'center']]
      pts.forEach(([k, a, label, al], n) => {
        const L = LINES[5 + n], p = easeOutBack(prog(t, L.t + 0.1, L.t + 0.45), 2.4)
        if (p <= 0) return
        const px = cx + Math.cos(a) * r, py = cy + Math.sin(a) * r, s = SIGN[k]
        // the quarter of the wheel this sign starts lights up
        x.strokeStyle = s.color; x.lineWidth = 10; x.beginPath(); x.arc(cx, cy, r, a, a + (Math.PI / 2) * clamp(prog(t, L.t + 0.3, L.t + 1.2))); x.stroke()
        x.fillStyle = INK; x.beginPath(); x.arc(px, py, 36 * p, 0, Math.PI * 2); x.fill()
        x.fillStyle = s.color; x.beginPath(); x.arc(px, py, 31 * p, 0, Math.PI * 2); x.fill()
        txt(s.glyph + '︎', px, py + 3, 40, '#fffaf0', 'center', GL)
        const lx = al === 'right' ? px - 52 : al === 'left' ? px + 52 : px, ly = al === 'center' ? py + (a < 0 ? -54 : 54) : py
        txt(label, lx, ly, 22, MARK, al)
      })
      return
    }
    txt('ONE TRIP.', cx, y0 + 64, 56, MARK, 'center')
    const rows = [['first weekend of spring', 13], ['booked tonight', 14], ['snacks + rest stops', 14]]
    rows.forEach(([s, li], n) => { const k = prog(t, LINES[li].t + 0.4, LINES[li].t + 0.6); const y = y0 + 150 + n * 60; R('#c9cfe0', x0 + 60, y - 16, 32, 32); R('#f4f6fb', x0 + 64, y - 12, 24, 24); txt(s, x0 + 116, y, 34, MARK); tick(x0 + 76, y, true, k) })
    const sp = easeOutBack(prog(t, ALLT + 0.2, ALLT + 0.5), 2.6)
    if (sp > 0) { x.save(); x.translate(cx, y1 - 70); x.rotate(-0.08); x.scale(sp, sp); x.strokeStyle = RED; x.lineWidth = 6; x.strokeRect(-190, -40, 380, 80); txt('FINISH IT ✓', 0, 2, 44, RED, 'center'); x.restore() }
  }
  function board(t) {
    const { x0, x1, y0, y1 } = BOARD
    R(INK, x0 - 18, y0 - 18, x1 - x0 + 36, y1 - y0 + 36); R('#aab0c4', x0 - 12, y0 - 12, x1 - x0 + 24, y1 - y0 + 24)
    // the flip between pages: squash vertically through 0, swap
    const flips = [T.flip2, T.flip3]
    let sy = 1
    for (const f of flips) { const p = prog(t, f - 0.25, f + 0.25); if (p > 0 && p < 1) sy = Math.abs(Math.cos(p * Math.PI)) }
    const cy = (y0 + y1) / 2
    x.save(); x.translate(0, cy); x.scale(1, Math.max(0.02, sy)); x.translate(0, -cy)
    page(pageAt(t), t)
    x.restore()
    R(INK, x0 + 80, y1 + 10, x1 - x0 - 160, 16); R('#7a7f96', x0 + 84, y1 + 12, x1 - x0 - 168, 10)                   // marker tray
    R('#2a3a8a', x0 + 140, y1 + 2, 50, 12); R(RED, x0 + 210, y1 + 2, 50, 12)
  }
  function room(t) {
    board(t)
    // chairs (sign-coloured backs)
    ORDER.forEach(k => { const sx = SEATS[k]; R(INK, sx - 100, 960, 200, 230); R('#3b3466', sx - 94, 966, 188, 224); R(SIGN[k].color, sx - 94, 966, 188, 14) })
  }
  function table(t) {
    R(INK, 20, TABLE_Y - 8, 1040, 150); R('#c9a27a', 26, TABLE_Y - 2, 1028, 26); R('#8a6448', 26, TABLE_Y + 24, 1028, 112)
    ORDER.forEach(k => { const sx = SEATS[k]; R(INK, sx - 50, TABLE_Y - 14, 100, 14); R('#f4f6fb', sx - 46, TABLE_Y - 12, 92, 10) })      // notepads
    drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'below', cell: 3 })
    drawBits(x, POTB, POT_C, POT.x, POT.y - 30, 7)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, 100, { alpha: 0.5 })
      const ok = outK(t, T.out), setK = ease.outCubic(prog(t, OPENER_LEN - 0.2, OPENER_LEN + 0.3))
      if (setK > 0) {
        x.save(); x.globalAlpha = setK * (0.25 + 0.75 * ok)
        room(t)
        const rs = {}
        ORDER.forEach((k, i) => { rs[k] = drawStarChar(x, SEATS[k], 1070, 210, t, { ...SIGN[k], ...mood(k, t), pop: pop01(t, OPENER_LEN + i * 0.1, 0.4, 2.2), seed: 30 + i * 3, hops: HOPS[k], glow: 0.85 }) })
        table(t)
        ORDER.forEach(k => drawTalkMarks(x, rs[k].x, rs[k].top - 10, t, Math.max(speaking(LINES, k, t, { cps: CPS }), speaking(LINES, 'ALL', t, { cps: CPS }), k === 'CAPRICORN' ? prog(t, T.last, T.last + 0.2) * (1 - prog(t, T.last + 1.6, T.last + 1.9)) : 0), SIGN[k].color))
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
const POTB = ['..KKKK...', '.KSSSSK..', 'KSSSSSSKK', 'KSCCCCSK.K', 'KSCCCCSK.K', 'KSSSSSSKK', '.KKKKKK..']
const POT_C = { K: '#1d1830', S: '#cfd6e6', C: '#6b3f22' }

// card-motif candidates: the seasons beat, the middle, the plan, the hand-off to the last line
const CUTS = [{ t: T.seasons - 0.08, kind: 'flip' }, { t: T.middle - 0.08, kind: 'deal' }, { t: T.plan - 0.08, kind: 'flip' }, { t: T.last - 0.08, kind: 'shuffle' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S7 E11' }), cardCuts(CUTS)]

// ── sound
const r3 = v => +v.toFixed(3)
const NOTE_HZ = [493.88, 554.37, 622.25, 739.99, 830.61, 987.77, 1108.73]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE_HZ[(base + i) % NOTE_HZ.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...openerCues(T.open, 4),
  ...wordPops(T.h1, 1, 0.08, 0), ['pop', T.h1Land, 987.77, 0.045, 0],
  ...threadCues(LINES, CAST, { cps: CPS }),
  ...[1, 2, 3, 4].map(li => ['tick', r3(LINES[li].t + 0.3), 0.025]), ['pop', r3(LINES[4].t + 1.0), 246.94, 0.05, 0],
  ...noteCues(T.note1, T.note1Out),
  ['whoosh', r3(T.flip2 - 0.2), 0.4, 0.03],
  ...[5, 6, 7, 8].map((li, i) => ['bell', r3(LINES[li].t + 0.2), [987.77, 1244.51, 1108.73, 739.99][i], 0.028, 1.4, (i - 1.5) * 0.3]),
  ...noteCues(T.note2, T.note2Out),
  ...wordPops(T.h3, 2, 0.08, 3),
  ['whoosh', r3(T.flip3 - 0.2), 0.4, 0.03],
  ...[13, 14].map(li => ['tick', r3(LINES[li].t + 0.4), 0.025]),
  ['pop', r3(ALLT + 0.3), 987.77, 0.05, 0], ['pluck', r3(ALLT + 0.35), 739.99, 0.04, 0.7, 0], ['glitter', r3(ALLT + 0.2), r3(ALLT + 0.8)],
  ['tick', r3(T.ghost + 0.05), 0.015],
  ...lastLineCues(T.last, LAST.text),
  ['whoosh', T.out[0], 0.35, 0.025],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
