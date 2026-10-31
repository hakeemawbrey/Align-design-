// classkit — the episode engine for Star Talk season 13 "Star Talk Explains", E22–E28 (promo/films/STARTALK16.md).
// Each of these films carries its own copy (like hotkit.js in season 12); every copy is identical. The season's look (the
// question card, the classroom, the chalkboard, chalk, the ✓ / ✦ / ♥ tags, the lightbulb, THE SHORT VERSION) comes from
// ../../stexplain.js; this file only lays out one episode from a plain config: the question at frame 0, the board built
// in beats while teacher and student trade lines, the lightbulb, the recap, the last line and the shared end card.
//
//   makeEpisode(cfg) → { DURATION, SCENES, CUES, T }
//   cfg = {
//     id, numeral, duration, key,
//     q, qAccent                          the frame-0 question (≤ 9 words, one *accent*) and its accent colour
//     teacher: CHAR, student: CHAR        CHAR = { tag, color, glyph?, accent?, pitch, draw?(ctx, x, y, size, t, o) → r, prop?(ctx, r, t, T) }
//     lines: [[ 't' | 's', text, { hold?, pre?, bulb? } ], …]   the dialogue (≤ 46 chars a line); bulb marks the student's "oh!"
//     board: { title? }                   the chalkboard (BOARD below; writable 900 × 480)
//     chalk: [ITEM, …]                     what the board builds. ITEM.at = seconds, or [lineIndex, offset] (from that line's start)
//       { kind: 'text', text, x, y, at, size?, color?, accent?, cps?, align?, lineH? }      x, y relative to the board's top-left (x0, y0)
//       { kind: 'line', pts: [[x, y], …], at, dur?, color?, width?, dash?, arrow? }
//       { kind: 'circle', x, y, r, at, dur?, color?, width?, from?, sweep? }
//       { kind: 'tag', tag: 'sky' | 'astro' | 'tip', x, y, at, align? = 'right', scale? = 0.75 }   (the claim tag; sound included)
//       { kind: 'draw', at, fn(ctx, t, B, at, T) }                          anything else (pixel bricks, a dial…)
//     recap: [item, item, item?]          THE SHORT VERSION (≤ 34 chars, one *accent* each)
//     last, lastWho ('t' | 's')           the last line, kept exactly
//     moods(phase, t, T) → [teacherOpts, studentOpts]   phase: 'q' | line index 0… | 'recap' | 'last'
//     front?(ctx, t, T, rt, rs, k)        anything in front of the stars
//     cues?(T) → extra sound cues
//   }
// Pure f(t); nothing touches `document` at module top level.
import { clamp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { loadExplainFonts, questionCard, drawClassroom, chalkboard, chalkText, chalkLine, chalkCircle, factTag, lightbulb, gotIt, questionCues, chalkCues, tagCues, bulbCues, gotItCues } from '../../stexplain.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', CHALK = '#f4f1e8'
export const POS = { t: { x: 860, y: 1196 }, s: { x: 220, y: 1202 } }
export const SIZE = { t: 250, s: 230 }
const CPS = 28
// the board: 960 × 540 centred at y 806 → the writable rect is 900 × 480 (x0 = 90, y0 = 500)
export const BOARD = { w: 960, h: 540, y: 740 }

export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, a, b) => 1 - ease.inQuad(prog(t, a, b))
export const R = (x, c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }

/** the schedule (pure; shared by picture and sound) */
export function schedule(cfg) {
  const D = cfg.duration, STORY_END = r3(D - ENDCARD_LEN)
  const T = { STORY_END, qOut: [2.75, 3.05], board: 2.7, tIn: 2.45, first: 3.25 }
  // the end, counted back from the end card: the last line (≥ 1.8 s), the recap (items readable ≥ 2 s), the box closes
  T.last = r3(STORY_END - 1.95)
  T.recap = r3(STORY_END - (cfg.recap.length > 2 ? 5.6 : 5.0))
  T.boxClose = r3(T.recap - 0.25)
  T.out = [r3(STORY_END - 0.4), r3(STORY_END - 0.05)]
  const cast = { t: cfg.teacher, s: cfg.student }
  const mk = (who, text, t) => ({ t: r3(t), speaker: cast[who].tag, text, color: cast[who].accent || cast[who].color, who })
  // natural lengths, then spread the slack over the holds so the last line finishes ≥ 1.5 s before the box closes
  const base = 1.55
  let t = T.first, need = 0
  const typ = cfg.lines.map(([who, text, o = {}]) => { const L = mk(who, text, 0); const d = lineTimes([L], { cps: CPS })[0].done; return { d, o } })
  typ.forEach(({ d, o }, i) => { need += (o.pre || 0) + d + (i < typ.length - 1 ? (o.hold ?? base) : 1.5) })
  const slack = T.boxClose - T.first - need
  if (slack < -0.01) throw new Error(`${cfg.id}: dialogue overruns the recap by ${(-slack).toFixed(2)} s`)
  const extra = slack / Math.max(1, typ.length)
  const lines = []
  cfg.lines.forEach(([who, text, o = {}], i) => {
    t += o.pre || 0
    lines.push({ ...mk(who, text, t), bulb: !!o.bulb })
    t += typ[i].d + (o.hold ?? base) + extra
  })
  T.lines = lines
  T.times = lineTimes(lines, { cps: CPS })
  T.at = a => (Array.isArray(a) ? r3(lines[a[0]].t + (a[1] || 0)) : a)
  const bi = lines.findIndex(L => L.bulb)
  T.bulb = bi >= 0 ? r3(lines[bi].t - 0.1) : null
  T.boardOut = [r3(T.recap - 0.05), r3(T.recap + 0.3)]
  return T
}

export function makeEpisode(cfg) {
  const T = schedule(cfg)
  const { STORY_END } = T
  const LINES = T.lines
  const lastHops = who => (cfg.lastWho === who ? [T.last + 0.05, T.last + 0.5] : [])
  const HOPS = {
    t: [T.tIn + 0.3, ...talkHops(LINES, cfg.teacher.tag, { cps: CPS }), ...lastHops('t')],
    s: [0.06, 0.62, ...talkHops(LINES, cfg.student.tag, { cps: CPS }), ...(T.bulb ? [T.bulb + 0.05] : []), ...lastHops('s')],
  }
  const phaseAt = t => {
    if (t >= T.last) return 'last'
    if (t >= T.recap) return 'recap'
    let p = 'q'
    LINES.forEach((L, i) => { if (t >= L.t - 0.05) p = i })
    return p
  }
  const speaker = t => {                     // who is talking right now (for the ▼ caret)
    if (t >= T.last) return cfg.lastWho
    if (t >= T.recap) return null
    if (t < T.qOut[0]) return 's'
    let s = null
    LINES.forEach((L, i) => { if (t >= L.t && t < T.times[i].done + 0.6) s = L.who })
    return s
  }
  const items = (cfg.chalk || []).map(c => ({ ...c, at: T.at(c.at) }))

  async function build(stage) {
    await loadExplainFonts()
    try { await Promise.all(["700 48px 'Space Mono'", "italic 500 140px 'EB Garamond'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const card = questionCard(root, { q: cfg.q, at: 0, out: T.qOut, accentColor: cfg.qAccent })
    const box = dialogueBox(root, { lines: LINES, y: 1400, height: 270, open: T.first - 0.2, close: T.boxClose, cps: CPS, size: 46 })
    const recap = gotIt(root, { items: cfg.recap, at: T.recap, out: [T.out[0], T.out[1]] })
    const who = cfg.lastWho === 't' ? cfg.teacher : cfg.student
    const tag = el('div', { position: 'absolute', left: '0', width: '1080px', top: '1420px', textAlign: 'center', font: "700 30px 'Space Mono', monospace", letterSpacing: '0.08em', color: who.accent || who.color, textShadow: '0 3px 0 rgba(6,4,18,0.9)', display: 'none' }, root, who.tag)
    const last = popText(root, cfg.last, { top: 1478, size: 92, accentSize: 136, at: T.last + 0.12, gap: 0.08, accentColor: who.accent || who.color, wobble: true, fit: true })
    const cv2 = layerCanvas(root, { pointerEvents: 'none' }), x2 = cv2.getContext('2d')
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

    function caret(ctx, r, color, t) {
      const y = r.top - 30 + Math.sin(t * 8) * 6
      ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(r.x - 22, y - 16); ctx.lineTo(r.x + 22, y - 16); ctx.lineTo(r.x, y + 10); ctx.fill()
      ctx.fillStyle = color; ctx.beginPath(); ctx.moveTo(r.x - 15, y - 12); ctx.lineTo(r.x + 15, y - 12); ctx.lineTo(r.x, y + 4); ctx.fill()
    }
    // the student's "huh?": a little pixel ? puff that bobs over their head while the question is up
    function huh(ctx, r, t, k) {
      if (k <= 0) return
      const px = Math.round(r.size / 34), X = r.x + r.size * 0.4, Y = r.top - 40 + Math.sin(t * 5) * 6
      const Q = ['.###.', '#...#', '....#', '...#.', '..#..', '.....', '..#..']
      ctx.save(); ctx.globalAlpha *= k
      Q.forEach((row, j) => [...row].forEach((c, i) => { if (c === '#') R(ctx, INK, X + (i - 2.5) * px - 3, Y + (j - 3.5) * px - 3, px + 6, px + 6) }))
      Q.forEach((row, j) => [...row].forEach((c, i) => { if (c === '#') R(ctx, BONE, X + (i - 2.5) * px, Y + (j - 3.5) * px, px, px) }))
      ctx.restore()
    }
    const drawOf = c => c.draw || ((ctx, X, Y, s, t, o) => drawStarChar(ctx, X, Y, s, t, { color: c.color, glyph: c.glyph, ...o }))

    function boardItems(t, B) {
      for (const c of items) {
        if (t < c.at - 0.001) continue
        const X = v => B.x0 + v, Y = v => B.y0 + v
        if (c.kind === 'text') chalkText(x, t, { text: c.text, x: X(c.x), y: Y(c.y), at: c.at, size: c.size || 40, color: c.color || CHALK, cps: c.cps || 22, align: c.align || 'left', ...(c.accent ? { accent: c.accent } : {}), ...(c.lineH ? { lineH: c.lineH } : {}) })
        else if (c.kind === 'line') chalkLine(x, t, { pts: c.pts.map(([a, b]) => [X(a), Y(b)]), at: c.at, dur: c.dur || 0.6, color: c.color || CHALK, width: c.width || 6, dash: c.dash, arrow: !!c.arrow })
        else if (c.kind === 'circle') chalkCircle(x, t, { x: X(c.x), y: Y(c.y), r: c.r, at: c.at, dur: c.dur || 0.6, color: c.color || CHALK, width: c.width || 6, from: c.from ?? -Math.PI / 2, sweep: c.sweep ?? Math.PI * 2 })
        else if (c.kind === 'tag') factTag(x, t, { kind: c.tag, at: c.at, out: T.boardOut[0], x: X(c.x), y: Y(c.y), align: c.align || 'right', scale: c.scale || 0.75 })
        else if (c.kind === 'draw') c.fn(x, t, B, c.at, T)
      }
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const ok = outK(t, ...T.out)
        const sp = speaker(t)
        x.clearRect(0, 0, 1080, 1920)
        x.save(); x.globalAlpha = ok
        drawClassroom(x, t, { dim: 0.45 * clamp(prog(t, T.recap, T.recap + 0.3)) })
        // the board, built in beats; it steps aside for THE SHORT VERSION
        const bk = outK(t, ...T.boardOut)
        if (t >= T.board && bk > 0) {
          x.save(); x.globalAlpha *= bk
          const B = chalkboard(x, t, { at: T.board, out: T.boardOut, title: cfg.board?.title, w: BOARD.w, h: BOARD.h, y: BOARD.y })
          if (B && (B.k ?? 1) > 0.6) boardItems(t, B)
          x.restore()
        }
        const ph = phaseAt(t)
        const [mt, ms] = cfg.moods(ph, t, T)
        // the student: there from frame 0, tilted mid-"huh?"
        // frame 0 (the thumbnail): the student big and centred under the question, then they hop to their desk spot
        const mv = ease.inOutCubic(prog(t, T.qOut[0] - 0.25, T.qOut[1] + 0.2))
        const sx = 540 + (POS.s.x - 540) * mv, sy = 1010 + (POS.s.y - 1010) * mv - Math.sin(Math.PI * mv) * 90, ss = 480 + (SIZE.s - 480) * mv
        const tilt = -0.14 * (1 - mv)
        x.save(); x.translate(sx, sy + ss * 0.4); x.rotate(tilt); x.translate(-sx, -sy - ss * 0.4)
        const rs = drawOf(cfg.student)(x, sx, sy, ss, t, { seed: 3, hops: HOPS.s, ...ms })
        x.restore()
        huh(x, rs, t, outK(t, T.qOut[0], T.qOut[1]))
        // the teacher steps up to the board as the question clears
        const tp = pop01(t, T.tIn, 0.42, 2.2)
        const tx = POS.t.x + (1 - ease.outCubic(prog(t, T.tIn, T.tIn + 0.4))) * 340
        const rt = tp > 0 ? drawOf(cfg.teacher)(x, tx, POS.t.y, SIZE.t, t, { seed: 9, hops: HOPS.t, pop: tp, ...mt }) : null
        if (cfg.student.prop) cfg.student.prop(x, rs, t, T)
        if (rt && cfg.teacher.prop) cfg.teacher.prop(x, rt, t, T)
        if (cfg.front) cfg.front(x, t, T, rt, rs, ok)
        if (sp === 's') caret(x, rs, cfg.student.accent || cfg.student.color, t)
        if (sp === 't' && rt) caret(x, rt, cfg.teacher.accent || cfg.teacher.color, t)
        x.restore()
        // on top: the lightbulb over the student
        x2.clearRect(0, 0, 1080, 1920)
        if (T.bulb !== null) { x2.save(); x2.globalAlpha = ok; lightbulb(x2, t, { at: T.bulb, x: rs.x + 150, y: rs.top + 4, scale: 1.4 }); x2.restore() }
        card.update(t)
        box.update(t)
        recap.update(t)
        const on = t >= T.last && ok > 0
        tag.style.display = on ? 'block' : 'none'
        if (on) { const p = clamp(prog(t, T.last, T.last + 0.2)); tag.style.opacity = String(p * ok); tag.style.transform = `translateY(${(1 - p) * 14}px)` }
        last.update(t, ok)
        drawGrain(gx, t)
      },
    }
  }

  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: cfg.numeral })]

  const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
  const pitch = { [cfg.teacher.tag]: cfg.teacher.pitch || 440, [cfg.student.tag]: cfg.student.pitch || 660 }
  const CUES = [
    ...questionCues(0, { key: cfg.key }),
    ...talkCues(LINES, { cps: CPS, pitch }),
    ...items.flatMap(c => (c.kind === 'text' ? chalkCues(c.at, c.text, { cps: c.cps || 22 }) : c.kind === 'tag' ? tagCues(c.at, c.tag) : [])),
    ...(T.bulb !== null ? bulbCues(T.bulb) : []),
    ...gotItCues(T.recap, { items: cfg.recap, key: cfg.key }),
    ...Array.from({ length: 4 }, (_, i) => ['pop', r3(T.last + 0.12 + i * 0.08), NOTE[(i + 2) % NOTE.length], 0.03, i % 2 ? 0.15 : -0.15]),
    ['pluck', r3(T.last + 0.5), 1046.5, 0.04, 0.6, 0],
    ['whoosh', r3(T.out[0]), 0.35, 0.025],
    ...(cfg.cues ? cfg.cues(T) : []),
    ...endcardCues(STORY_END),
  ]
  return { DURATION: cfg.duration, SCENES, CUES, T }
}
