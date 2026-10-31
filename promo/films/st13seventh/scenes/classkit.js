// classkit — the episode engine for Star Talk season 13 "Star Talk Explains", E35–E40 (promo/films/STARTALK16.md).
// Each of these films carries its own copy; every copy is identical. The season's look (the question card, the
// classroom, the chalkboard, chalk, fact tags, the lightbulb, THE SHORT VERSION) comes from ../../stexplain.js; this
// file only lays out one episode from a plain config: frame 0 (the question + the student mid-"huh?"), the teacher at
// the board trading lines with the student in the retro dialogue box, the lightbulb, the recap, the last line and the
// shared end card.
//
//   makeEpisode(cfg) → { DURATION, SCENES, CUES, T }
//   cfg = {
//     id, numeral, duration, key,
//     q, qAccent,                         the frame-0 question (≤ 9 words, one *accent*) and its accent colour
//     teacher: CHAR, student: CHAR,       CHAR = { tag, color, glyph?, draw?(ctx, x, y, size, t, o) → r, pitch,
//                                                  size?, pointer? (default true), prop?(ctx, r, t, T) }
//     board: { title, h? },               the chalkboard (x 540, y 770, w 880, h 520)
//     script: [{ who: 't' | 's', text, mark?, hold?, tag?: { kind, x, y, align } }, …]
//             lines in the box (≤ 46 chars). mark names the line's start time for the board; tag x/y are board-relative.
//     bulb: mark of the student's lightbulb line,
//     chalk: [ item, … ]                  board items, coordinates relative to the board's inner top-left (x0, y0):
//             { text, x, y, at, size?, color?, align?, cps? } | { line: [[x, y], …], at, dur?, color?, width?, dash? }
//             | { circle: [x, y, r], at, dur?, color?, width?, from?, sweep? } | { draw(ctx, t, B, M) }
//             at = a number, 'mark' or 'mark+0.4'
//     recap: [≤ 3 items ≤ 34 chars], last, lastWho ('t' | 's'),
//     moods(t, who, phase, M) → drawStarChar opts for that character,
//     guests?: { key: CHAR }             extra speakers (script who: key); the episode draws them in front()
//     front?(ctx, t, T, M, rt, rs, speakerKey), back?(ctx, t, T, M), cues?(T, M) → extra cues
//   }
// Holds stretch evenly so the script fills the time between the question and the recap.
// Pure f(t); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { loadExplainFonts, questionCard, drawClassroom, chalkboard, chalkText, chalkLine, chalkCircle, factTag, lightbulb,
  drawPointer, gotIt, questionCues, chalkCues, tagCues, bulbCues, gotItCues } from '../../stexplain.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', CHALK = '#f4f1e8'
export const BOARD = { x: 540, y: 770, w: 880, h: 520 }
export const SEAT = { t: { x: 196, y: 1196 }, s: { x: 880, y: 1196 } }
const CPS = 27, MIN_HOLD = 1.55
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, a, b) => 1 - ease.inQuad(prog(t, a, b))
export const R = (x, c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }

/** resolve an `at` (number | 'mark' | 'mark+0.4' | 'mark-0.2') against the marks */
export function atOf(a, M) {
  if (typeof a === 'number') return a
  const m = /^([\w]+)\s*([+-]\s*[\d.]+)?$/.exec(String(a))
  if (!m || M[m[1]] === undefined) throw new Error(`classkit: unknown mark "${a}"`)
  return r3(M[m[1]] + (m[2] ? parseFloat(m[2].replace(/\s+/g, '')) : 0))
}

/** the schedule (pure; shared by picture and sound) */
export function schedule(cfg) {
  const D = cfg.duration, STORY_END = r3(D - ENDCARD_LEN)
  const T = { STORY_END, qOut: [2.75, 3.05], enter: 2.55, board: 2.85, first: 3.2 }
  // the end, counted back from the end card: the last line (≥ 1.9 s), the recap items (≥ 2 s each before the last line)
  T.last = r3(STORY_END - 2.15)
  const nItems = cfg.recap.length
  T.recap = r3(T.last - (0.95 + 0.55 * (nItems - 1) + 2.05))
  T.boxClose = r3(T.recap - 0.2)
  T.out = [r3(STORY_END - 0.4), r3(STORY_END - 0.05)]
  const who = { ...(cfg.guests || {}), t: cfg.teacher, s: cfg.student }
  // natural layout, then spread the slack evenly over the holds
  const mk = extra => {
    const lines = []
    let t = T.first
    for (const S of cfg.script) {
      const L = { t: r3(t), speaker: who[S.who].tag, text: S.text, color: who[S.who].accent || who[S.who].color, who: S.who, mark: S.mark, tag: S.tag }
      lines.push(L)
      const tm = lineTimes([L], { cps: CPS })[0]
      t = tm.done + (S.hold ?? MIN_HOLD) + extra
    }
    return lines
  }
  let lines = mk(0)
  const lastDone = () => { const tm = lineTimes(lines, { cps: CPS }); return tm[tm.length - 1].done }
  const slack = T.boxClose - 1.5 - lastDone()
  T.slack = r3(slack)
  if (slack < -0.01) throw new Error(`classkit ${cfg.id}: script is ${(-slack).toFixed(2)} s too long`)
  lines = mk(slack / Math.max(1, cfg.script.length - 1))
  // put any rounding remainder into the last hold (keeps the box close at T.boxClose)
  T.lines = lines
  T.times = lineTimes(lines, { cps: CPS })
  T.M = { q: 0, board: T.board, recap: T.recap, last: T.last }
  lines.forEach((L, i) => { if (L.mark) T.M[L.mark] = L.t; T.M['L' + i] = L.t })
  return T
}

export function makeEpisode(cfg) {
  const T = schedule(cfg)
  const { STORY_END, M, lines: LINES } = T
  const TAG = { t: cfg.teacher.tag, s: cfg.student.tag }
  const GUESTS = cfg.guests || {}
  const bulbAt = cfg.bulb ? atOf(cfg.bulb, M) : null
  const HOPS = {
    t: [T.enter + 0.3, ...talkHops(LINES, TAG.t, { cps: CPS }), ...(cfg.lastWho === 't' ? [T.last + 0.05, T.last + 0.5] : [])],
    s: [0.05, 0.6, ...talkHops(LINES, TAG.s, { cps: CPS }), ...(bulbAt ? [bulbAt - 0.05] : []), ...(cfg.lastWho === 's' ? [T.last + 0.05, T.last + 0.5] : [])],
  }
  const tags = LINES.map((L, i) => L.tag ? { ...L.tag, at: r3(L.t + (L.tag.delay ?? 0.15)), i } : null).filter(Boolean)
  const chalkItems = (cfg.chalk || []).map(c => ({ ...c, at: c.at === undefined ? undefined : atOf(c.at, M) }))
  const speaker = t => {
    if (t >= T.last) return cfg.lastWho
    if (t >= T.boxClose) return null
    if (t < T.first - 0.1) return 's'
    let s = null
    LINES.forEach((L, i) => { if (t >= L.t && t < T.times[i].done + 0.6) s = L.who })
    return s
  }
  const phaseAt = t => {
    if (t >= T.last) return 'last'
    if (t >= T.recap) return 'recap'
    if (bulbAt !== null && t >= bulbAt - 0.1) return 'bulb'
    if (t < T.first) return 'q'
    let p = 0
    LINES.forEach((L, i) => { if (t >= L.t - 0.05) p = i })
    return p
  }

  async function build(stage) {
    await loadExplainFonts()
    try { await Promise.all(["700 48px 'Space Mono'", "italic 500 140px 'EB Garamond'", '800 92px Inter'].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const qc = questionCard(root, { q: cfg.q, at: 0, out: T.qOut, accentColor: cfg.qAccent })
    const box = dialogueBox(root, { lines: LINES, y: 1404, height: 270, open: T.first - 0.2, close: T.boxClose, cps: CPS, size: 48 })
    const cv2 = layerCanvas(root, { pointerEvents: 'none' }), x2 = cv2.getContext('2d')
    const recap = gotIt(root, { items: cfg.recap, at: T.recap, out: T.out, top: cfg.recapTop ?? 560 })
    const lw = cfg[cfg.lastWho === 't' ? 'teacher' : 'student']
    const tag = el('div', { position: 'absolute', left: '0', width: '1080px', top: '1404px', textAlign: 'center', font: "700 30px 'Space Mono', monospace", letterSpacing: '0.08em', color: lw.accent || lw.color, textShadow: '0 3px 0 rgba(6,4,18,0.9)', display: 'none' }, root, lw.tag)
    const last = popText(root, cfg.last, { top: 1462, size: cfg.lastSize ?? 80, accentSize: Math.round((cfg.lastSize ?? 80) * 1.45), at: T.last + 0.12, gap: 0.08, accentColor: lw.accent || lw.color, wobble: true, fit: true })
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

    const drawOf = c => c.draw || ((ctx, X, Y, s, t, o) => drawStarChar(ctx, X, Y, s, t, { color: c.color, glyph: c.glyph, ...o }))
    function caret(r, color, t) {
      const y = r.top - 34 + Math.sin(t * 8) * 6
      x.fillStyle = INK; x.beginPath(); x.moveTo(r.x - 22, y - 16); x.lineTo(r.x + 22, y - 16); x.lineTo(r.x, y + 10); x.fill()
      x.fillStyle = color; x.beginPath(); x.moveTo(r.x - 15, y - 12); x.lineTo(r.x + 15, y - 12); x.lineTo(r.x, y + 4); x.fill()
    }
    // the student's "huh?": pixel question marks bobbing over their head
    const QM = ['.XXX.', 'X...X', '...X.', '..X..', '.....', '..X..']
    function huh(r, t, k) {
      if (k <= 0) return
      x.save(); x.globalAlpha *= k
      ;[[-0.5, 0, 9], [0.42, 0.7, 7], [0.05, 1.4, 6]].forEach(([dx, ph, px], n) => {
        const bx = r.x + dx * r.size - 2.5 * px, by = r.top - 70 - n * 22 + Math.sin(t * 5 + ph) * 8
        QM.forEach((row, j) => [...row].forEach((c, i) => { if (c === 'X') { R(x, INK, bx + i * px - 2, by + j * px - 2, px + 4, px + 4) } }))
        QM.forEach((row, j) => [...row].forEach((c, i) => { if (c === 'X') R(x, n === 1 ? (cfg.qAccent || GOLD) : BONE, bx + i * px, by + j * px, px, px) }))
      })
      x.restore()
    }
    // the raised hand: a little pixel mitten on the student's upper right point, waving
    function hand(r, t, k) {
      if (k <= 0) return
      const s = r.size / 36, wave = Math.sin(t * 9) * 0.25
      x.save(); x.globalAlpha *= k
      x.translate(r.x + r.size * 0.36, r.top + r.size * 0.3); x.rotate(-0.5 + wave)
      R(x, INK, -s * 1.5, -s * 9, s * 3, s * 9)
      R(x, cfg.student.color, -s * 0.8, -s * 9, s * 1.6, s * 9)
      R(x, INK, -s * 3, -s * 15, s * 6, s * 7); R(x, cfg.student.color, -s * 2.2, -s * 14.2, s * 4.4, s * 5.6)
      R(x, '#ffffff', -s * 1.6, -s * 13.6, s * 1.2, s * 1.2)
      x.restore()
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const ok = outK(t, ...T.out)
        const sp = speaker(t), ph = phaseAt(t)
        x.clearRect(0, 0, 1080, 1920)
        const rk = clamp(prog(t, T.recap - 0.2, T.recap + 0.3))
        drawClassroom(x, t, { dim: 0.25 + 0.4 * rk })
        x.save(); x.globalAlpha = ok
        if (cfg.back) cfg.back(x, t, T, M)
        // the board (dims under the recap)
        x.save(); x.globalAlpha *= 1 - 0.75 * rk
        const B = chalkboard(x, t, { x: BOARD.x, y: BOARD.y, w: BOARD.w, h: cfg.board.h ?? BOARD.h, at: T.board, title: cfg.board.title })
        if (B && (B.k ?? 1) > 0.02) {
          x.save(); x.globalAlpha *= clamp(B.k ?? 1)
          for (const c of chalkItems) {
            if (c.draw) { c.draw(x, t, B, M); continue }
            if (c.text !== undefined) chalkText(x, t, { text: c.text, x: B.x0 + c.x, y: B.y0 + c.y, at: c.at, size: c.size ?? 40, color: c.color, cps: c.cps ?? 22, align: c.align ?? 'left' })
            else if (c.line) chalkLine(x, t, { pts: c.line.map(([u, v]) => [B.x0 + u, B.y0 + v]), at: c.at, dur: c.dur ?? 0.6, color: c.color, width: c.width ?? 6, dash: c.dash })
            else if (c.circle) chalkCircle(x, t, { x: B.x0 + c.circle[0], y: B.y0 + c.circle[1], r: c.circle[2], at: c.at, dur: c.dur ?? 0.8, color: c.color, width: c.width ?? 6, from: c.from ?? -Math.PI / 2, sweep: c.sweep ?? Math.PI * 2 })
          }
          for (const g of tags) factTag(x, t, { kind: g.kind, at: g.at, out: [T.recap - 0.3, T.recap], x: B.x0 + g.x, y: B.y0 + g.y, align: g.align ?? 'left' })
          x.restore()
        }
        x.restore()
        // the cast: the student starts big in the middle (frame 0), then takes a seat as the teacher steps up
        const mv = ease.inOutCubic(prog(t, T.enter, T.enter + 0.6))
        const sSize = lerp(cfg.student.size0 ?? 380, cfg.student.size ?? 240, mv)
        const sx = lerp(cfg.student.x0 ?? 540, SEAT.s.x, mv), sy = lerp(cfg.student.y0 ?? 1020, SEAT.s.y, mv)
        const tIn = ease.outCubic(prog(t, T.enter, T.enter + 0.45))
        const tx = lerp(-200, SEAT.t.x, tIn)
        const mt = cfg.moods(t, 't', ph, M) || {}, ms = cfg.moods(t, 's', ph, M) || {}
        const rt = t >= T.enter ? drawOf(cfg.teacher)(x, tx, SEAT.t.y, cfg.teacher.size ?? 250, t, { seed: 3, hops: HOPS.t, ...mt }) : null
        const rs = drawOf(cfg.student)(x, sx, sy, sSize, t, { seed: 8, hops: HOPS.s, ...ms })
        const qk = 1 - prog(t, T.enter - 0.1, T.enter + 0.4)
        hand(rs, t, qk)
        huh(rs, t, qk)
        if (rt && cfg.teacher.prop) cfg.teacher.prop(x, rt, t, T)
        if (cfg.student.prop) cfg.student.prop(x, rs, t, T)
        // the pointer: from the teacher's raised point to the board, tapping at each teacher line
        if (rt && cfg.teacher.pointer !== false && t < T.recap) {
          let tap = 0
          for (const L of LINES) if (L.who === 't') { const d = t - L.t; if (d >= 0 && d < 0.3) tap = Math.sin(Math.PI * d / 0.3) }
          drawPointer(x, rt.x + rt.size * 0.32, rt.top + rt.size * 0.36, -0.75 + 0.05 * Math.sin(t * 1.3), { tap })
        }
        if (cfg.front) cfg.front(x, t, T, M, rt, rs, sp)
        if (sp === 't' && rt) caret(rt, cfg.teacher.color, t)
        if (sp === 's' && t >= T.first - 0.1) caret(rs, cfg.student.color, t)
        if (bulbAt !== null) lightbulb(x, t, { at: bulbAt, x: rs.x - 210, y: rs.y - 30, scale: 0.85 })
        x.restore()
        x2.clearRect(0, 0, 1080, 1920)
        qc.update(t)
        box.update(t)
        recap.update(t)
        const on = t >= T.last && ok > 0
        tag.style.display = on ? 'block' : 'none'
        if (on) { const p = clamp(prog(t, T.last, T.last + 0.2)); tag.style.opacity = String(p * ok); tag.style.transform = `translateY(${(1 - p) * 14}px)` }
        last.update(t, ok)
        drawGrain(gx, t)
        void x2
      },
    }
  }

  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: cfg.numeral })]

  const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
  const pitch = { [TAG.t]: cfg.teacher.pitch || 520, [TAG.s]: cfg.student.pitch || 700 }
  for (const g of Object.values(GUESTS)) pitch[g.tag] = g.pitch || 620
  const nLast = cfg.last.replace(/\*/g, '').split(/\s+/).length
  const CUES = [
    ...questionCues(0, { key: cfg.key }),
    ['whoosh', r3(T.enter), 0.3, 0.025],
    ...talkCues(LINES, { cps: CPS, pitch }),
    ...chalkItems.filter(c => c.text).flatMap(c => chalkCues(c.at, c.text, { cps: c.cps ?? 22 })),
    ...tags.flatMap(g => tagCues(g.at, g.kind)),
    ...(bulbAt !== null ? bulbCues(bulbAt) : []),
    ...gotItCues(T.recap, { items: cfg.recap, key: cfg.key }),
    ...Array.from({ length: nLast }, (_, i) => ['pop', r3(T.last + 0.12 + i * 0.08), NOTE[(i + 2) % NOTE.length], 0.03, i % 2 ? 0.15 : -0.15]),
    ['pluck', r3(T.last + 0.5), 1046.5, 0.04, 0.6, 0],
    ['whoosh', r3(T.out[0]), 0.35, 0.025],
    ...(cfg.cues ? cfg.cues(T, M) : []),
    ...endcardCues(STORY_END),
  ]
  return { DURATION: cfg.duration, SCENES, CUES, T }
}
