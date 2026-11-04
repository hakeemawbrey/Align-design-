// x2kit — the episode engine for "Star Talk Explains, Volume 2", episodes 16–30 (promo/films/next30/b28.md).
// A copy of the Volume 1 classkit (promo/films/st13modes/scenes/classkit.js), changed for Next 30:
//   · the series bug "STAR TALK EXPLAINS" top-left (Inter 800 small caps, letter-spaced); the question badge reads
//     "TODAY'S QUESTION"; no season numbers anywhere (the card frame has no numeral and leaves the top-left corner free);
//   · exactly one card cut (cardfx), at the question → board change;
//   · Pisces cries in every film: as the teacher or the student (tears on the sprite), or else from a little desk at the
//     back of the class, between the two (cfg.pisces = false turns the extra desk off);
//   · the default end card CTA;
//   · chalk labels may fade out (`out: [a, b]`), and `seasonEpisode(spec)` builds the season board used by 16–27.
//
//   makeEpisode(cfg) → { DURATION, SCENES, CUES, T }      (cfg as in classkit, plus `teacherId` / `studentId` sign ids)
//   seasonEpisode(spec) → the same, for "What does <sign> season feel like?":
//     spec = { id, sign, student, key, duration = 45, dates, note, element, mode, ruler, feel, lines, items, last,
//              lastWho, teacher?: { prop?, pointer? }, studentProp?, moods? }
//     lines: classkit lines; mark the date line 'sky', the element/mode/ruler line 'astro', the "feel" line 'feel' and
//     (optional) 'note' for the second sky fact. The board draws on those marks.
// Pure f(t); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame, cardCuts, cardCutCues } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { loadExplainFonts, questionCard, drawClassroom, chalkboard, chalkText, chalkLine, chalkCircle, factTag, lightbulb, drawPointer, gotIt, questionCues, chalkCues, tagCues, bulbCues, gotItCues, EX } from '../../stexplain.js'
import { eyesOf } from './props.js'

export { EX, chalkLine, chalkCircle, chalkText, signStar }
export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', CHALK = '#f4f1e8'
export const POS = { teacher: { x: 210, y: 1196 }, student: { x: 862, y: 1206 }, pisces: { x: 540, y: 1262 } }
export const SIZE = 236
export const BOARD = { x: 540, y: 744, w: 860, h: 540 }
const CPS = 27
const PISCES = signStar('pisces')

export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, a, b) => 1 - ease.inQuad(prog(t, a, b))
export const R = (x, c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }

// the pixel "?" (frame 0) and "!" (the last line) over the student's head
const QM = ['.XXXX.', 'XX..XX', '....XX', '...XX.', '..XX..', '..XX..', '......', '..XX..']
const EXM = ['..XX..', '..XX..', '..XX..', '..XX..', '..XX..', '......', '..XX..', '..XX..']
export function pixMark(x, rows, cx, cy, px, color, alpha = 1) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha
  const w = rows[0].length * px, h = rows.length * px
  rows.forEach((row, j) => [...row].forEach((c, i) => { if (c === 'X') R(x, INK, cx - w / 2 + i * px - 3, cy - h / 2 + j * px - 3, px + 6, px + 6) }))
  rows.forEach((row, j) => [...row].forEach((c, i) => { if (c === 'X') R(x, color, cx - w / 2 + i * px, cy - h / 2 + j * px, px, px) }))
  x.restore()
}

/** the series bug, top-left 56 px */
function buildBug(root) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', font: "800 34px Inter, 'Helvetica Neue', Arial, sans-serif", fontVariantCaps: 'all-small-caps', letterSpacing: '0.22em', color: GOLD, textShadow: '0 2px 0 rgba(27,18,54,0.9), 0 2px 14px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', pointerEvents: 'none' }, root, 'Star Talk Explains')
  return { update(k) { b.style.opacity = String(clamp(k)); b.style.display = k <= 0.01 ? 'none' : 'block' } }
}

/** the schedule (pure; shared by picture and sound) */
export function schedule(cfg) {
  const D = cfg.duration, STORY_END = D - ENDCARD_LEN
  const T = { STORY_END, qOut: [2.75, 3.05], boardAt: 2.85 }
  T.last = r3(STORY_END - 1.9)
  T.recap = r3(STORY_END - (cfg.items.length >= 3 ? 4.8 : 4.3))
  const cast = { teacher: cfg.teacher, student: cfg.student }
  const first = 3.3
  const raw = cfg.lines.map(([who, text, o = {}]) => ({ who, text, o, dur: lineTimes([{ t: 0, speaker: 'x', text }], { cps: CPS })[0].done }))
  const holds = raw.map(L => L.o.hold ?? 1.55)
  const need = raw.reduce((s, L, i) => s + L.dur + holds[i], 0)
  const room = T.recap - 0.15 - first
  const extra = Math.max(0, room - need) / raw.length
  T.tight = room - need
  let t = first
  const lines = []
  raw.forEach((L, i) => {
    const c = cast[L.who]
    lines.push({ t: r3(t), speaker: L.o.as || c.tag, text: L.text, color: L.o.asColor || c.accent || c.color, who: L.who, o: L.o })
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
  T.cut = T.boardAt + 0.05
  return T
}

export function makeEpisode(cfg) {
  const T = schedule(cfg)
  if (T.tight < 0) console.warn(`[${cfg.id}] the lesson runs ${(-T.tight).toFixed(2)} s past the recap`)
  const { STORY_END } = T
  const LINES = T.lines
  const lastWho = cfg.lastWho || 'student'
  const piscesRole = cfg.teacherId === 'pisces' ? 'teacher' : cfg.studentId === 'pisces' ? 'student' : (cfg.pisces === false ? null : 'desk')
  const HOPS = {
    teacher: [T.boardAt + 0.1, ...talkHops(LINES, cfg.teacher.tag, { cps: CPS }), ...(lastWho === 'teacher' ? [T.last + 0.05, T.last + 0.5] : [])],
    student: [0.02, ...talkHops(LINES, cfg.student.tag, { cps: CPS }), ...(lastWho === 'student' ? [T.last + 0.05, T.last + 0.5] : []), ...(T.bulb ? [T.bulb + 0.02] : [])],
    pisces: [3.2, ...(T.bulb ? [T.bulb + 0.1, T.bulb + 0.7] : []), T.last + 0.2],
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
  /** how hard Pisces is crying (0…1): always a little, a lot at the lightbulb and the last line */
  const cry = t => {
    let k = 0.75
    if (T.bulb) k = Math.max(k, clamp(1 - Math.abs(t - T.bulb - 1.0) / 1.6) * 1.0)
    if (t >= T.last - 0.2) k = Math.max(k, 0.9)
    return k
  }
  const CHALK_LABELS = cfg.chalk ? cfg.chalk(T.M, T) : []
  const teacherTaps = LINES.filter(L => L.who === 'teacher').map(L => L.t)
  const CUTS = [{ t: r3(T.cut), kind: 'flip' }]

  async function build(stage) {
    await loadExplainFonts()
    try { await Promise.all(["700 48px 'Space Mono'", "italic 500 140px 'EB Garamond'", "800 92px Inter", "800 34px Inter"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const q = questionCard(root, { q: cfg.q, at: 0, out: T.qOut, accentColor: cfg.qAccent, label: 'TODAY’S QUESTION' })
    const box = dialogueBox(root, { lines: LINES, y: 1400, height: 270, open: LINES[0].t - 0.22, close: T.boxClose, cps: CPS, size: 46 })
    const recap = gotIt(root, { items: cfg.items, at: T.recap, out: [r3(STORY_END - 0.4), r3(STORY_END - 0.05)], top: cfg.recapTop ?? 520 })
    const who = cfg[lastWho]
    const tag = el('div', { position: 'absolute', left: '0', width: '1080px', top: '1430px', textAlign: 'center', font: "700 30px 'Space Mono', monospace", letterSpacing: '0.08em', color: who.accent || who.color, textShadow: '0 3px 0 rgba(6,4,18,0.9)', display: 'none' }, root, who.tag)
    const last = popText(root, cfg.last, { top: 1488, size: cfg.lastSize || 88, accentSize: Math.round((cfg.lastSize || 88) * 1.5), at: T.last + 0.12, gap: 0.08, accentColor: who.accent || who.color, wobble: true, fit: true })
    const cv2 = layerCanvas(root, { pointerEvents: 'none' }), x2 = cv2.getContext('2d')
    const bug = buildBug(root)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

    function caret(r, color, t) {
      const y = r.top - 30 + Math.sin(t * 8) * 6
      x.fillStyle = INK; x.beginPath(); x.moveTo(r.x - 22, y - 16); x.lineTo(r.x + 22, y - 16); x.lineTo(r.x, y + 10); x.fill()
      x.fillStyle = color; x.beginPath(); x.moveTo(r.x - 15, y - 12); x.lineTo(r.x + 15, y - 12); x.lineTo(r.x, y + 4); x.fill()
    }
    const drawOf = c => c.draw || ((ctx, X, Y, s, t, o) => drawStarChar(ctx, X, Y, s, t, { color: c.color, glyph: c.glyph, ...o }))
    // bold pixel tears from the outer eye corners: streams down the cheeks, arcing fountains when Pisces cries hardest
    const tears = (r, t, seed) => {
      const e = eyesOf(r), k = cry(t), s = r.size / 150, px = Math.max(5, Math.round(r.size / 24)), fountain = k > 0.85
      const n = fountain ? 6 : 4
      for (const side of [-1, 1]) for (let q = 0; q < n; q++) {
        const ph = ((t * (fountain ? 1.4 : 0.9) + q / n + (side > 0 ? 0.17 : 0) + seed * 0.07) % 1 + 1) % 1
        const gx = e.ex + side * (e.dx * 1.5 + (fountain ? 70 * ph : 8 * ph) * s)
        const gy = e.ey + px + (fountain ? -36 * ph + 170 * ph * ph : 80 * ph * ph) * s
        x.save(); x.globalAlpha *= clamp(k * (1 - ph * 0.6))
        R(x, INK, gx - px / 2 - 2, gy - px - 2, px + 4, px * 2 + 4)
        R(x, '#8fe3ff', gx - px / 2, gy - px, px, px * 2)
        R(x, '#ffffff', gx - px / 2, gy - px, Math.ceil(px / 2), Math.ceil(px / 2))
        x.restore()
      }
    }

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
          for (const c of CHALK_LABELS) {
            const a = c.out ? outK(t, ...c.out) : 1
            if (a > 0) chalkText(x, t, { cps: 22, ...c, alpha: (c.alpha ?? 1) * a, x: B.x0 + c.u * (B.x1 - B.x0), y: B.y0 + c.v * (B.y1 - B.y0) })
          }
          x.restore()
        }
        x.restore()
        // the class
        const ph = phaseAt(t)
        const [mt, ms] = cfg.moods(ph, t, T)
        // the back desk: Pisces, crying (happy tears), from 3.1 s
        if (piscesRole === 'desk') {
          const pp = pop01(t, 3.1, 0.4, 2.2)
          if (pp > 0.02) {
            const pm = t >= T.last - 0.2 || (T.bulb && t > T.bulb && t < T.bulb + 2.6) ? { mood: 'happy' } : { mood: 'wide', look: [0, -1], blink: false }
            const rp = drawStarChar(x, POS.pisces.x, POS.pisces.y, 150, t, { color: PISCES.color, glyph: null, pop: pp, seed: 21, hops: HOPS.pisces, ...pm })
            R(x, INK, POS.pisces.x - 92, POS.pisces.y + 34, 184, 46); R(x, EX.woodDark, POS.pisces.x - 88, POS.pisces.y + 38, 176, 38); R(x, EX.woodLite, POS.pisces.x - 88, POS.pisces.y + 38, 176, 6)
            x.save(); x.globalAlpha *= clamp(pp); tears(rp, t, 4); x.restore()
          }
        }
        const tPop = pop01(t, T.boardAt - 0.25, 0.45, 2.2)
        const tX = POS.teacher.x - (1 - ease.outCubic(prog(t, T.boardAt - 0.25, T.boardAt + 0.2))) * 340
        const tSize = cfg.teacher.size || SIZE, sSize = cfg.student.size || SIZE
        const rt = tPop > 0 ? drawOf(cfg.teacher)(x, tX, POS.teacher.y, tSize, t, { seed: 3, hops: HOPS.teacher, pop: tPop, ...mt }) : null
        if (rt && piscesRole === 'teacher') tears(rt, t, 2)
        const tilt = 0.16 * (1 - clamp(prog(t, 2.2, 2.7))) + 0.16 * clamp(prog(t, T.last, T.last + 0.3))
        const mv = ease.inOutCubic(clamp(prog(t, 2.35, 3.0)))
        const sX = POS.student.x + (1 - mv) * -150, sY = POS.student.y + (1 - mv) * -40, sSz = sSize * (1 + 0.38 * (1 - mv))
        x.save(); x.translate(sX, sY + sSz * 0.3); x.rotate(-tilt); x.translate(-sX, -(sY + sSz * 0.3))
        const rs = drawOf(cfg.student)(x, sX, sY, sSz, t, { seed: 9, hops: HOPS.student, ...ms })
        if (piscesRole === 'student') tears(rs, t, 6)
        if (cfg.student.prop) cfg.student.prop(x, rs, t, T, 'student')
        x.restore()
        if (rt && cfg.teacher.pointer) {
          let tap = 0
          for (const v of teacherTaps) if (t >= v && t < v + 0.4) tap = Math.sin(Math.PI * (t - v) / 0.4)
          drawPointer(x, rt.x + tSize * 0.36, rt.y - tSize * 0.02, -0.75, { tap })
        }
        if (rt && cfg.teacher.prop) cfg.teacher.prop(x, rt, t, T, 'teacher')
        if (cfg.front) cfg.front(x, t, T, rt, rs, ok)
        pixMark(x, QM, rs.x + sSz * 0.42, rs.top - 4 + Math.sin(t * 5) * 6, 12, GOLD, 1 - clamp(prog(t, 2.3, 2.6)))
        pixMark(x, EXM, rs.x + sSize * 0.42, rs.top - 4 + Math.sin(t * 5) * 6, 9, GOLD, pop01(t, T.last, 0.3, 2.4) * ok)
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
        bug.update(ok)
        drawGrain(gx, t)
      },
    }
  }

  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

  const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
  const pitch = { [cfg.teacher.tag]: cfg.teacher.pitch || 440, [cfg.student.tag]: cfg.student.pitch || 700, ...(cfg.pitches || {}) }
  const CUES = [
    ...questionCues(0, { key: cfg.key }),
    ['whoosh', r3(T.boardAt - 0.1), 0.4, 0.03],
    ...(cfg.boardTitle ? chalkCues(r3(T.boardAt + 0.3), cfg.boardTitle, { cps: 34 }) : []),
    ...talkCues(LINES, { cps: CPS, pitch }),
    ...T.tags.flatMap(g => tagCues(g.at, g.kind)),
    ...CHALK_LABELS.flatMap(c => chalkCues(c.at, c.text, { cps: c.cps || 22 })),
    ...(T.bulb ? bulbCues(T.bulb) : []),
    ...(piscesRole === 'desk' ? [['pop', 3.15, 659.25, 0.03, 0]] : []),
    ...gotItCues(T.recap, { items: cfg.items, key: cfg.key }),
    ...Array.from({ length: 4 }, (_, i) => ['pop', r3(T.last + 0.12 + i * 0.08), NOTE[(i + 2) % NOTE.length], 0.03, i % 2 ? 0.15 : -0.15]),
    ['pluck', r3(T.last + 0.5), 1046.5, 0.04, 0.6, 0],
    ['whoosh', r3(T.out[0]), 0.35, 0.025],
    ...cardCutCues(CUTS),
    ...(cfg.cues ? cfg.cues(T) : []),
    ...endcardCues(STORY_END),
  ].sort((a, b) => a[1] - b[1])
  return { DURATION: cfg.duration, SCENES, CUES, T }
}

// ═══════════════════════════════════════════ the season board (episodes 16–27)
export const SIGNS12 = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
const ABBR = ['ARI', 'TAU', 'GEM', 'CAN', 'LEO', 'VIR', 'LIB', 'SCO', 'SAG', 'CAP', 'AQU', 'PIS']
const NAME = id => id === 'sagittarius' ? 'SAGITTARIUS' : id.toUpperCase()
const TAGNAME = id => `${signStar(id).glyph} ${id === 'sagittarius' ? 'SAG' : id.toUpperCase()}`
const STRIP = { v0: 0.115, v1: 0.245 }

/** the default moods: student "huh?" at the question, wide while it learns, sparkle at the lightbulb, happy at the end */
export function defaultMoods(lines) {
  return (ph, t, T) => {
    if (ph === 'q') return [{ mood: 'neutral' }, { mood: 'wide', look: [-1, -1], blink: false }]
    if (ph === 'recap' || ph === 'last') return [{ mood: 'happy', look: [1, 0] }, { mood: 'happy', look: [-1, 0] }]
    const L = lines[ph] || []
    if (L[2] && L[2].bulb) return [{ mood: 'happy', look: [1, 0] }, { mood: 'sparkle', look: [-1, 0] }]
    if (L[0] === 'student') return [{ mood: 'neutral', look: [1, 0] }, { mood: 'squint', look: [-1, 0] }]
    return [{ mood: ph % 2 ? 'happy' : 'neutral', look: [1, -1] }, { mood: 'wide', look: [-1, -1] }]
  }
}

export function seasonEpisode(spec) {
  const id = spec.sign, sid = spec.student
  const S = signStar(id), ST = signStar(sid)
  const idx = SIGNS12.indexOf(id)
  const teacher = { tag: TAGNAME(id), color: S.color, glyph: S.glyph, pitch: spec.teacherPitch || 440, pointer: true, ...(spec.teacher || {}) }
  const student = { tag: TAGNAME(sid), color: ST.color, glyph: ST.glyph, pitch: spec.studentPitch || 760, ...(spec.studentOpts || {}) }
  const cell = u => (u + 0.5) / 12
  return makeEpisode({
    id: spec.id, duration: spec.duration || 45, key: spec.key,
    q: `What does *${spec.qName || (id[0].toUpperCase() + id.slice(1))}* | season feel like?`, qAccent: spec.qAccent || S.color,
    teacher, student, teacherId: id, studentId: sid,
    boardTitle: `${NAME(id)} SEASON`,
    lines: spec.lines, items: spec.items, last: spec.last, lastWho: spec.lastWho || 'student',
    moods: spec.moods || defaultMoods(spec.lines),
    chalk: (M, T) => {
      const feelAt = M.feel ?? (M.astro + 4)
      const colOut = [r3(feelAt - 0.35), r3(feelAt)]
      const cols = [['ELEMENT', spec.element], ['MODE', spec.mode], ['RULER', spec.ruler]]
      return [
        ...ABBR.map((a, i) => ({ text: i === idx ? `*${a}*` : a, at: r3(T.boardAt + 0.55 + i * 0.05), u: cell(i), v: (STRIP.v0 + STRIP.v1) / 2, size: 22, align: 'center', cps: 60, alpha: i === idx ? 1 : 0.7 })),
        { text: `*${spec.dates}*`, at: r3(M.sky + 1.0), u: 0.5, v: 0.40, size: 40, align: 'center', cps: 26 },
        ...(spec.note ? [{ text: spec.note, at: r3((M.note ?? M.sky) + (M.note ? 0.4 : 2.2)), u: 0.5, v: 0.505, size: 24, align: 'center', cps: 36, color: 'rgba(244,241,232,0.85)' }] : []),
        ...cols.flatMap(([k, v], i) => [
          { text: k, at: r3(M.astro + 0.3 + i * 0.7), u: (i + 0.5) / 3, v: 0.67, size: 24, align: 'center', cps: 30, color: 'rgba(244,241,232,0.7)', out: colOut },
          { text: `*${v}*`, at: r3(M.astro + 0.55 + i * 0.7), u: (i + 0.5) / 3, v: 0.78, size: v.includes('|') ? 28 : 34, align: 'center', cps: 26, lineH: 1.3, out: colOut },
        ]),
        ...spec.feel.map((w, i) => ({ text: i === 1 ? `*${w}*` : w, at: r3(feelAt + 0.3 + i * 0.75), u: 0.5, v: 0.66 + i * 0.105, size: 34, align: 'center', cps: 26 })),
      ]
    },
    board(x, t, B, M, T) {
      const W = B.x1 - B.x0, H = B.y1 - B.y0, U = u => B.x0 + u * W, V = v => B.y0 + v * H
      // the 12-slot strip
      const y0 = V(STRIP.v0), y1 = V(STRIP.v1), a0 = T.boardAt + 0.4
      chalkLine(x, t, { pts: [[U(0), y0], [U(1), y0], [U(1), y1], [U(0), y1], [U(0), y0]], at: a0, dur: 0.45, width: 4, color: 'rgba(244,241,232,0.75)' })
      for (let i = 1; i < 12; i++) chalkLine(x, t, { pts: [[U(i / 12), y0], [U(i / 12), y1]], at: a0 + 0.3 + i * 0.02, dur: 0.12, width: 3, color: 'rgba(244,241,232,0.45)' })
      // the Sun slides along the strip into this sign's slot, then the slot gets its yellow ring
      const sp = ease.inOutCubic(prog(t, M.sky, M.sky + 1.1))
      if (t >= M.sky - 0.2) {
        const from = Math.max(-0.6, idx - 3)
        const u = cell(lerp(from, idx, sp)), cy = y1 + 28
        const k = pop01(t, M.sky - 0.2, 0.3, 2.2)
        x.save(); x.globalAlpha *= clamp(k)
        x.globalCompositeOperation = 'lighter'
        const g = x.createRadialGradient(U(u), cy, 0, U(u), cy, 46); g.addColorStop(0, 'rgba(255,214,110,0.55)'); g.addColorStop(1, 'rgba(255,214,110,0)')
        x.fillStyle = g; x.fillRect(U(u) - 46, cy - 46, 92, 92)
        x.globalCompositeOperation = 'source-over'
        x.fillStyle = INK; x.beginPath(); x.arc(U(u), cy, 17 * k + 3, 0, Math.PI * 2); x.fill()
        x.fillStyle = GOLD; x.beginPath(); x.arc(U(u), cy, 15 * k, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#fff1c8'; x.fillRect(Math.round(U(u) - 7), Math.round(cy - 8), 5, 5)
        for (let r = 0; r < 8; r++) { const a = r * Math.PI / 4 + t * 0.8; x.fillStyle = GOLD; x.fillRect(Math.round(U(u) + Math.cos(a) * 24 - 2), Math.round(cy + Math.sin(a) * 24 - 2), 5, 5) }
        x.restore()
      }
      chalkCircle(x, t, { x: U(cell(idx)), y: (y0 + y1) / 2, r: W / 24 + 6, at: M.sky + 1.1, dur: 0.4, color: EX.chalkYellow, width: 5 })
      // the divider under the dates
      chalkLine(x, t, { pts: [[U(0.04), V(0.585)], [U(0.96), V(0.585)]], at: M.astro, dur: 0.4, width: 3, color: 'rgba(244,241,232,0.4)' })
      if (spec.extra) spec.extra(x, t, B, M, T, { U, V })
    },
    set: spec.set, front: spec.front,
    cues: T => [
      ['whoosh', r3(T.M.sky + 0.1), 0.6, 0.03], ['pop', r3(T.M.sky + 1.1), 1046.5, 0.04, 0], ['pluck', r3(T.M.sky + 1.15), 1318.51, 0.035, 0.6, 0],
      ...(spec.cues ? spec.cues(T) : []),
    ],
    recapTop: spec.recapTop, lastSize: spec.lastSize,
  })
}

// ═══════════════════════════════════════════ the house board (episodes 28–30)
//   houseEpisode(spec): a chart wheel on the left of the board (12 equal houses counted from the rising sign at 9 o'clock,
//   going down and round, as in a chart drawing), the horizon, the house numbers, this house shaded in yellow; chalk
//   words on the right. spec = { id, house, teacher, student (sign ids), key, duration, q, lines, items, last, lastWho,
//   words: [{ text, mark, i }] (right column, i = row 0…5), opposite?: n (a second, blue house at mark 'opp'),
//   ic?: true (the IC label at mark 'house'), teacherOpts?, studentOpts? }
//   marks: 'wheel' (the wheel draws on), 'rise' (the horizon + RISING label), 'house' (the shading), 'opp'.
export function houseEpisode(spec) {
  const S = signStar(spec.teacher), ST = signStar(spec.student)
  const teacher = { tag: TAGNAME(spec.teacher), color: S.color, glyph: S.glyph, pitch: 440, pointer: true, ...(spec.teacherOpts || {}) }
  const student = { tag: TAGNAME(spec.student), color: ST.color, glyph: ST.glyph, pitch: 760, ...(spec.studentOpts || {}) }
  const ord = n => n === 1 ? '1ST' : n === 2 ? '2ND' : n === 3 ? '3RD' : `${n}TH`
  return makeEpisode({
    id: spec.id, duration: spec.duration, key: spec.key,
    q: spec.q, qAccent: spec.qAccent || S.color,
    teacher, student, teacherId: spec.teacher, studentId: spec.student,
    boardTitle: `YOUR ${ord(spec.house)} HOUSE`,
    lines: spec.lines, items: spec.items, last: spec.last, lastWho: spec.lastWho || 'teacher',
    moods: spec.moods || defaultMoods(spec.lines),
    chalk: (M) => spec.words.map(w => ({ text: w.text, at: r3(M[w.mark] + 0.4 + (w.d || 0)), u: 0.76, v: 0.2 + w.i * 0.13, size: w.size || 30, align: 'center', cps: 24 })),
    board(x, t, B, M, T) {
      const W = B.x1 - B.x0, H = B.y1 - B.y0
      const cx = B.x0 + 0.26 * W, cy = B.y0 + 0.57 * H, r1 = 190, r0 = 66
      const P = (deg, r) => [cx + r * Math.cos(deg * Math.PI / 180), cy - r * Math.sin(deg * Math.PI / 180)]
      const aW = M.wheel ?? T.boardAt + 0.6
      // house shading (math angles: house n spans 180 + 30(n − 1) … 180 + 30n)
      const wedge = (n, col, at) => {
        const k = clamp(prog(t, at, at + 0.5)); if (k <= 0) return
        const a0 = 180 + 30 * (n - 1), a1 = a0 + 30 * k
        x.save(); x.globalAlpha *= 0.32 + 0.08 * Math.sin(t * 4)
        x.fillStyle = col; x.beginPath()
        for (let a = a0; a <= a1 + 0.01; a += 2) x.lineTo(...P(a, r1 - 4))
        for (let a = a1; a >= a0 - 0.01; a -= 2) x.lineTo(...P(a, r0 + 4))
        x.closePath(); x.fill(); x.restore()
      }
      if (M.house !== undefined) wedge(spec.house, EX.chalkYellow, M.house)
      if (spec.opposite && M.opp !== undefined) wedge(spec.opposite, EX.chalkBlue, M.opp)
      chalkCircle(x, t, { x: cx, y: cy, r: r1, at: aW, dur: 0.6, width: 5 })
      chalkCircle(x, t, { x: cx, y: cy, r: r0, at: aW + 0.3, dur: 0.4, width: 4, color: 'rgba(244,241,232,0.7)' })
      for (let i = 0; i < 12; i++) {
        const a = 180 + 30 * i
        if (i % 6 === 0) continue
        chalkLine(x, t, { pts: [P(a, r0), P(a, r1)], at: aW + 0.5 + i * 0.04, dur: 0.15, width: 3, color: 'rgba(244,241,232,0.5)' })
      }
      // the horizon (rising on the left) and the house numbers, counted from it
      const aR = M.rise ?? aW + 0.8
      chalkLine(x, t, { pts: [P(180, r1 + 34), P(0, r1 + 34)], at: aR, dur: 0.5, width: 6, color: EX.chalkPink })
      chalkText(x, t, { text: 'RISING', x: P(180, r1)[0] - 4, y: cy - 22, at: aR + 0.3, size: 20, color: EX.chalkPink, align: 'center', cps: 30 })
      for (let n = 1; n <= 12; n++) {
        const [hx, hy] = P(180 + 30 * (n - 1) + 15, (r0 + r1) / 2 + 4)
        const hot = n === spec.house && M.house !== undefined && t >= M.house
        chalkText(x, t, { text: hot ? `*${n}*` : String(n), x: hx, y: hy, at: aR + 0.5 + (n - 1) * 0.12, size: hot ? 34 : 24, align: 'center', cps: 30, alpha: hot ? 1 : 0.8 })
      }
      if (spec.ic && M.house !== undefined) chalkText(x, t, { text: '*IC*', x: cx, y: cy + r1 + 22, at: M.house + 0.3, size: 24, align: 'center', cps: 20 })
      if (spec.extra) spec.extra(x, t, B, M, T, { cx, cy, r1, r0, P })
    },
    cues: T => [
      ...(T.M.house !== undefined ? [['pop', r3(T.M.house + 0.1), 1046.5, 0.04, -0.3], ['pluck', r3(T.M.house + 0.15), 1318.51, 0.035, 0.6, -0.3]] : []),
      ...(T.M.opp !== undefined ? [['pop', r3(T.M.opp + 0.1), 880, 0.04, -0.3]] : []),
      ...(spec.cues ? spec.cues(T) : []),
    ],
  })
}
