// classkit — the episode engine for Star Talk season 13 "Star Talk Explains", E08–E14 (promo/films/STARTALK16.md).
// Each of these films carries its own copy (like hotkit.js in season 12); every copy is identical. The season's look (the
// question card, the classroom, the chalkboard, chalk, the ✓ / ✦ / ♥ tags, the lightbulb, THE SHORT VERSION) comes from
// ../../stexplain.js; this file only lays out one episode from a plain config: the class, the lesson in the retro dialogue
// box with a tag on every claim, the student's lightbulb, the recap, the last line and the shared end card.
//
//   makeEpisode(cfg) → { DURATION, SCENES, CUES, T }
//   cfg = {
//     id, numeral, duration, key,
//     q, qAccent                          the frame-0 question (≤ 9 words, one *accent*) and its accent colour
//     teacher: CHAR, student: CHAR        CHAR = { tag, color, glyph?, accent?, pitch, size?, draw?(ctx, x, y, size, t, o) → r,
//                                           prop?(ctx, r, t, T, who), pointer?: true (draw the stexplain pointer stick) }
//     boardTitle                          chalk title written across the top of the board
//     lines: [[ 'teacher' | 'student', text, { hold?, tag?: 'sky' | 'astro' | 'tip', mark?, bulb?, tagAt?: [x, y, align] } ], …]
//                                         tag = the claim's tag, popping as the line starts; mark = a name for the line's
//                                         start time (T.M[name]) so the board can draw on cue; bulb = the student's lightbulb
//     board(ctx, t, B, M, T)              chalk on the board: B = { x0, y0, x1, y1, k }, M = line marks
//     chalk?(M, T) → [{ text, at, u, v, size?, color?, align?, cps? }]   chalk labels; (u, v) = 0…1 across the board's
//                                         drawable area. The engine writes them on and adds their chalk-scratch cues
//     items, last, lastWho                THE SHORT VERSION items (≤ 34 chars, one *accent* each) and the last line
//     moods(phase, t, T) → [teacherOpts, studentOpts]   phase: 'q' | line index 0… | 'recap' | 'last'
//     set?(ctx, t, T, k)                  scenery behind the stars; front?(ctx, t, T, rt, rs, k) in front of them
//     cues?(T)                            extra sound cues
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
import { loadExplainFonts, questionCard, drawClassroom, chalkboard, chalkText, factTag, lightbulb, drawPointer, gotIt, questionCues, chalkCues, tagCues, bulbCues, gotItCues } from '../../stexplain.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', CHALK = '#f4f1e8'
export const POS = { teacher: { x: 210, y: 1196 }, student: { x: 862, y: 1206 } }
export const SIZE = 236
export const BOARD = { x: 540, y: 744, w: 860, h: 540 }
const CPS = 27

export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, a, b) => 1 - ease.inQuad(prog(t, a, b))
export const R = (x, c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }

// the pixel "?" (frame 0) and "!" (the last line) over the student's head
const QM = ['.XXXX.', 'XX..XX', '....XX', '...XX.', '..XX..', '..XX..', '......', '..XX..']
const EX = ['..XX..', '..XX..', '..XX..', '..XX..', '..XX..', '......', '..XX..', '..XX..']
export function pixMark(x, rows, cx, cy, px, color, alpha = 1) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha
  const w = rows[0].length * px, h = rows.length * px
  rows.forEach((row, j) => [...row].forEach((c, i) => { if (c === 'X') R(x, INK, cx - w / 2 + i * px - 3, cy - h / 2 + j * px - 3, px + 6, px + 6) }))
  rows.forEach((row, j) => [...row].forEach((c, i) => { if (c === 'X') R(x, color, cx - w / 2 + i * px, cy - h / 2 + j * px, px, px) }))
  x.restore()
}

/** the schedule (pure; shared by picture and sound) */
export function schedule(cfg) {
  const D = cfg.duration, STORY_END = D - ENDCARD_LEN
  const T = { STORY_END, qOut: [2.75, 3.05], boardAt: 2.85 }
  T.last = r3(STORY_END - 1.9)
  T.recap = r3(STORY_END - (cfg.items.length >= 3 ? 4.8 : 4.3))
  const cast = { teacher: cfg.teacher, student: cfg.student }
  // natural timing first, then stretch the holds so the lesson fills the time up to the recap
  const first = 3.3
  const raw = cfg.lines.map(([who, text, o = {}]) => ({ who, text, o, dur: lineTimes([{ t: 0, speaker: 'x', text }], { cps: CPS })[0].done }))
  const holds = raw.map(L => L.o.hold ?? 1.55)
  const need = raw.reduce((s, L, i) => s + L.dur + holds[i], 0)
  const room = T.recap - 0.15 - first
  const extra = Math.max(0, room - need) / raw.length
  T.tight = room - need                 // < 0 means the lines do not fit (the build warns)
  let t = first
  const lines = []
  raw.forEach((L, i) => {
    const c = cast[L.who]
    lines.push({ t: r3(t), speaker: c.tag, text: L.text, color: c.accent || c.color, who: L.who, o: L.o })
    t += L.dur + holds[i] + extra
  })
  T.lines = lines
  T.times = lineTimes(lines, { cps: CPS })
  T.boxClose = r3(T.times[T.times.length - 1].done + Math.max(1.5, T.recap - 0.1 - T.times[T.times.length - 1].done))
  T.M = {}
  T.tags = []
  lines.forEach((L, i) => {
    if (L.o.mark) T.M[L.o.mark] = L.t
    if (L.o.bulb) T.bulb = L.t
    if (L.o.tag) T.tags.push({ kind: L.o.tag, at: L.t, i, pos: L.o.tagAt })
  })
  T.tags.forEach((g, k) => { const nx = T.tags[k + 1]; g.out = [r3((nx ? nx.at : T.boxClose) - 0.25), r3(nx ? nx.at : T.boxClose)] })
  T.out = [r3(STORY_END - 0.4), r3(STORY_END - 0.05)]
  return T
}

export function makeEpisode(cfg) {
  const T = schedule(cfg)
  if (T.tight < 0) console.warn(`[${cfg.id}] the lesson runs ${(-T.tight).toFixed(2)} s past the recap`)
  const { STORY_END } = T
  const LINES = T.lines
  const lastWho = cfg.lastWho || 'student'
  const HOPS = {
    teacher: [T.boardAt + 0.1, ...talkHops(LINES, cfg.teacher.tag, { cps: CPS }), ...(lastWho === 'teacher' ? [T.last + 0.05, T.last + 0.5] : [])],
    student: [0.02, ...talkHops(LINES, cfg.student.tag, { cps: CPS }), ...(lastWho === 'student' ? [T.last + 0.05, T.last + 0.5] : []), ...(T.bulb ? [T.bulb + 0.02] : [])],
  }
  const phaseAt = t => {
    if (t >= T.last) return 'last'
    if (t >= T.recap) return 'recap'
    let p = 'q'
    LINES.forEach((L, i) => { if (t >= L.t - 0.05) p = i })
    return p
  }
  const speaker = t => {
    if (t >= T.last) return lastWho
    if (t >= T.recap) return null
    let s = null
    LINES.forEach((L, i) => { if (t >= L.t && t < T.times[i].done + 0.6) s = L.who })
    return s
  }
  const CHALK_LABELS = cfg.chalk ? cfg.chalk(T.M, T) : []
  const teacherTaps = LINES.filter(L => L.who === 'teacher').map(L => L.t)

  async function build(stage) {
    await loadExplainFonts()
    try { await Promise.all(["700 48px 'Space Mono'", "italic 500 140px 'EB Garamond'", "800 92px Inter"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const q = questionCard(root, { q: cfg.q, at: 0, out: T.qOut, accentColor: cfg.qAccent })
    const box = dialogueBox(root, { lines: LINES, y: 1400, height: 270, open: LINES[0].t - 0.22, close: T.boxClose, cps: CPS, size: 46 })
    const recap = gotIt(root, { items: cfg.items, at: T.recap, out: [r3(STORY_END - 0.4), r3(STORY_END - 0.05)], top: cfg.recapTop ?? 520 })
    const who = cfg[lastWho]
    const tag = el('div', { position: 'absolute', left: '0', width: '1080px', top: '1430px', textAlign: 'center', font: "700 30px 'Space Mono', monospace", letterSpacing: '0.08em', color: who.accent || who.color, textShadow: '0 3px 0 rgba(6,4,18,0.9)', display: 'none' }, root, who.tag)
    const last = popText(root, cfg.last, { top: 1488, size: 88, accentSize: 132, at: T.last + 0.12, gap: 0.08, accentColor: who.accent || who.color, wobble: true, fit: true })
    const cv2 = layerCanvas(root, { pointerEvents: 'none' }), x2 = cv2.getContext('2d')
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

    function caret(r, color, t) {
      const y = r.top - 30 + Math.sin(t * 8) * 6
      x.fillStyle = INK; x.beginPath(); x.moveTo(r.x - 22, y - 16); x.lineTo(r.x + 22, y - 16); x.lineTo(r.x, y + 10); x.fill()
      x.fillStyle = color; x.beginPath(); x.moveTo(r.x - 15, y - 12); x.lineTo(r.x + 15, y - 12); x.lineTo(r.x, y + 4); x.fill()
    }
    const drawOf = c => c.draw || ((ctx, X, Y, s, t, o) => drawStarChar(ctx, X, Y, s, t, { color: c.color, glyph: c.glyph, ...o }))

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const ok = outK(t, ...T.out)
        const sp = speaker(t)
        const recapK = clamp(prog(t, T.recap, T.recap + 0.3))
        x.clearRect(0, 0, 1080, 1920)
        drawClassroom(x, t, { dim: 0.15 + 0.4 * recapK })
        x.save(); x.globalAlpha = ok
        if (cfg.set) cfg.set(x, t, T, ok)
        // the board and its chalk
        const bk = 1 - 0.55 * recapK
        x.save(); x.globalAlpha *= bk
        const B = chalkboard(x, t, { ...BOARD, at: T.boardAt, title: cfg.boardTitle })
        if (B && B.k > 0) {
          x.save(); x.globalAlpha *= clamp(B.k)
          cfg.board(x, t, B, T.M, T)
          for (const c of CHALK_LABELS) chalkText(x, t, { cps: 22, ...c, x: B.x0 + c.u * (B.x1 - B.x0), y: B.y0 + c.v * (B.y1 - B.y0) })
          x.restore()
        }
        x.restore()
        // the class
        const ph = phaseAt(t)
        const [mt, ms] = cfg.moods(ph, t, T)
        const tPop = pop01(t, T.boardAt - 0.25, 0.45, 2.2)
        const tX = POS.teacher.x - (1 - ease.outCubic(prog(t, T.boardAt - 0.25, T.boardAt + 0.2))) * 340
        const tSize = cfg.teacher.size || SIZE, sSize = cfg.student.size || SIZE
        const rt = tPop > 0 ? drawOf(cfg.teacher)(x, tX, POS.teacher.y, tSize, t, { seed: 3, hops: HOPS.teacher, pop: tPop, ...mt }) : null
        // the student: tilted, "huh?" at frame 0; upright through the lesson; the same tilt, now with a "!", at the last line
        const tilt = 0.16 * (1 - clamp(prog(t, 2.2, 2.7))) + 0.16 * clamp(prog(t, T.last, T.last + 0.3))
        // frame 0: the student is big and nearer the middle (the thumbnail), then steps over to its desk spot
        const mv = ease.inOutCubic(clamp(prog(t, 2.35, 3.0)))
        const sX = POS.student.x + (1 - mv) * -150, sY = POS.student.y + (1 - mv) * -40, sSz = sSize * (1 + 0.38 * (1 - mv))
        x.save(); x.translate(sX, sY + sSz * 0.3); x.rotate(-tilt); x.translate(-sX, -(sY + sSz * 0.3))
        const rs = drawOf(cfg.student)(x, sX, sY, sSz, t, { seed: 9, hops: HOPS.student, ...ms })
        x.restore()
        if (rt && cfg.teacher.pointer) {
          let tap = 0
          for (const v of teacherTaps) if (t >= v && t < v + 0.4) tap = Math.sin(Math.PI * (t - v) / 0.4)
          drawPointer(x, rt.x + tSize * 0.36, rt.y - tSize * 0.02, -0.75, { tap })
        }
        if (rt && cfg.teacher.prop) cfg.teacher.prop(x, rt, t, T, 'teacher')
        if (cfg.student.prop) cfg.student.prop(x, rs, t, T, 'student')
        if (cfg.front) cfg.front(x, t, T, rt, rs, ok)
        pixMark(x, QM, rs.x + sSz * 0.42, rs.top - 4 + Math.sin(t * 5) * 6, 12, GOLD, 1 - clamp(prog(t, 2.3, 2.6)))
        pixMark(x, EX, rs.x + sSize * 0.42, rs.top - 4 + Math.sin(t * 5) * 6, 9, GOLD, pop01(t, T.last, 0.3, 2.4) * ok)
        if (sp === 'teacher' && rt) caret(rt, cfg.teacher.accent || cfg.teacher.color, t)
        if (sp === 'student') caret(rs, cfg.student.accent || cfg.student.color, t)
        x.restore()
        // the season kit on top: the tags, the lightbulb
        x2.clearRect(0, 0, 1080, 1920)
        x2.save(); x2.globalAlpha = ok
        for (const g of T.tags) {
          const [gx0, gy0, al] = g.pos || [BOARD.x + BOARD.w / 2 - 26, BOARD.y - BOARD.h / 2 + 6, 'right']
          factTag(x2, t, { kind: g.kind, at: g.at, out: g.out, x: gx0, y: gy0, align: al })
        }
        if (T.bulb) lightbulb(x2, t, { at: T.bulb, x: POS.student.x + 30, y: POS.student.y - sSize * 0.5 - 52, scale: 0.85 })
        x2.restore()
        q.update(t)
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
  const pitch = { [cfg.teacher.tag]: cfg.teacher.pitch || 440, [cfg.student.tag]: cfg.student.pitch || 700 }
  const CUES = [
    ...questionCues(0, { key: cfg.key }),
    ['whoosh', r3(T.boardAt - 0.1), 0.4, 0.03],
    ...(cfg.boardTitle ? chalkCues(r3(T.boardAt + 0.3), cfg.boardTitle, { cps: 34 }) : []),
    ...talkCues(LINES, { cps: CPS, pitch }),
    ...T.tags.flatMap(g => tagCues(g.at, g.kind)),
    ...CHALK_LABELS.flatMap(c => chalkCues(c.at, c.text, { cps: c.cps || 22 })),
    ...(T.bulb ? bulbCues(T.bulb) : []),
    ...gotItCues(T.recap, { items: cfg.items, key: cfg.key }),
    ...Array.from({ length: 4 }, (_, i) => ['pop', r3(T.last + 0.12 + i * 0.08), NOTE[(i + 2) % NOTE.length], 0.03, i % 2 ? 0.15 : -0.15]),
    ['pluck', r3(T.last + 0.5), 1046.5, 0.04, 0.6, 0],
    ['whoosh', r3(T.out[0]), 0.35, 0.025],
    ...(cfg.cues ? cfg.cues(T) : []),
    ...endcardCues(STORY_END),
  ]
  return { DURATION: cfg.duration, SCENES, CUES, T }
}
