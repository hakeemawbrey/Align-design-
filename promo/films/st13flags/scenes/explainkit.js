// explainkit — the episode engine for Star Talk season 13 "Star Talk Explains", E15–E21 (promo/films/STARTALK16.md).
// Each of these films carries its own copy (like hotkit.js in season 12); every copy is identical. The season's look (the
// question card, the classroom, the chalkboard and chalk, the ✓ / ✦ / ♥ tags, the lightbulb, THE SHORT VERSION card)
// comes from ../../stexplain.js; this file only lays one episode out from a plain config: the student's question at
// frame 0, the teacher at the board, the lines in the retro dialogue box, the lightbulb, the recap, the last line and
// the shared end card.
//
//   makeEpisode(cfg) → { DURATION, SCENES, CUES, T }
//   cfg = {
//     id, numeral, duration, key,
//     q, qAccent,                         the frame-0 question (≤ 9 words, one *accent*) and its accent colour
//     teacher: CHAR, student: CHAR,      CHAR = { tag, color, glyph?, accent?, pitch?, draw?(ctx, x, y, size, t, o) → r,
//                                                  prop?(ctx, r, t, T, who) }
//     boardTitle,                         the chalk title over the board
//     beats: [{ lines: [[who, text, { tag?: { kind, dx, dy, align }, hold?, pre?, point?: [dx, dy] }], …],
//               draw?(ctx, t, B, b, T), chalk?: [{ dt, line?, text, x, y, size?, color?, align?, cps? }] }]   who = 'teacher' | 'student'; tag/point offsets are from the board's x0, y0.
//                                         b = { at, out, lines: [{ t, done }] }: the beat's own clock. chalk entries
//                                         are written on at b.at + dt (or that beat's lines[line].t + dt), at board offsets (x, y), with their scratch cues
//     bulb,                               the student's lightbulb line
//     items,                              THE SHORT VERSION (2–3 strings, ≤ 34 chars, one *accent* each)
//     last, lastWho,                      the last line (kept exactly) and who says it
//     moods?(phase, t, T) → [teacherOpts, studentOpts]   phase: 'q' | beat index 0… | 'bulb' | 'recap' | 'last'
//     front?(ctx, t, T, rt, rs)           anything in front of the stars
//     cues?(T) → extra sound cues
//   }
// Pure f(t); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { loadExplainFonts, questionCard, drawClassroom, chalkboard, chalkText, factTag, lightbulb, drawPointer, gotIt, gotItTimes, questionCues, chalkCues, tagCues, bulbCues, gotItCues } from '../../stexplain.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', CHALK = '#f4f1e8'
export const SIZE = 250
export const POS = { teacher: { x: 196, y: 1196 }, student: { x: 884, y: 1196 }, hero: { x: 560, y: 1150 } }
export const BOARD = { x: 540, y: 760, w: 860, h: 500 }      // writable rect: x 140…940, y 540…980
const CPS = 28

export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, a, b) => 1 - ease.inQuad(prog(t, a, b))
export const R = (x, c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }
const plain = s => s.replace(/\*/g, '')

/** the schedule (pure; shared by picture and sound) */
export function schedule(cfg) {
  const D = cfg.duration, STORY_END = D - ENDCARD_LEN
  const T = { STORY_END, qOut: [2.7, 3.0], walk: [2.35, 3.0], board: 2.75 }
  T.last = r3(STORY_END - 2.3)
  const RECAP_NEED = gotItTimes(0, cfg.items).end + 1.0   // the card, its items ticking in, a beat before the last line
  const cast = { teacher: cfg.teacher, student: cfg.student }
  const flat = []
  cfg.beats.forEach((b, bi) => b.lines.forEach(([who, text, o = {}]) => flat.push({ who, text, o, bi })))
  flat.push({ who: 'student', text: cfg.bulb, o: { pre: 0.35 }, bi: 'bulb' })
  const lay = extra => {
    let t = 3.25
    const out = []
    for (const f of flat) {
      const L = { t: r3(t + (f.o.pre || 0)), speaker: cast[f.who].tag, text: f.text, color: cast[f.who].accent || cast[f.who].color, who: f.who, bi: f.bi, o: f.o }
      out.push(L)
      const tm = lineTimes([L], { cps: CPS })[0]
      t = tm.done + (f.o.hold ?? 1.55) + extra
    }
    return out
  }
  // spread any slack over the holds (≤ 1 s each); the rest goes to the recap
  const base = lay(0)
  const baseClose = lineTimes(base, { cps: CPS }).at(-1).done + 1.5
  const room = T.last - RECAP_NEED - baseClose
  if (room < -0.01) throw new Error(`${cfg.id}: ${(-room).toFixed(2)} s too long`)
  const extra = Math.min(1.0, room / flat.length)
  const LINES = lay(extra)
  T.lines = LINES
  T.times = lineTimes(LINES, { cps: CPS })
  const bi = LINES.length - 1
  T.bulbLine = LINES[bi].t
  T.bulb = r3(LINES[bi].t - 0.3)
  T.boxClose = r3(T.times[bi].done + 1.5)
  T.recap = r3(T.boxClose - 0.1)
  T.slack = r3(T.last - RECAP_NEED - T.boxClose)
  // beats: each starts just before its first line and ends where the next begins (the last runs into the recap)
  T.beats = cfg.beats.map((b, i) => {
    const idx = LINES.map((L, n) => (L.bi === i ? n : -1)).filter(n => n >= 0)
    return { at: r3(LINES[idx[0]].t - 0.25), lines: idx.map(n => ({ t: LINES[n].t, done: T.times[n].done, o: LINES[n].o, who: LINES[n].who })) }
  })
  T.beats.forEach((b, i) => { b.out = i + 1 < T.beats.length ? T.beats[i + 1].at : r3(T.recap) })
  T.boardOut = [r3(T.recap - 0.1), r3(T.recap + 0.35)]
  T.out = [r3(STORY_END - 0.4), r3(STORY_END - 0.05)]
  return T
}

export function makeEpisode(cfg) {
  const T = schedule(cfg)
  const { STORY_END } = T
  const LINES = T.lines
  const tagT = cfg.teacher.tag, tagS = cfg.student.tag
  const HOPS = {
    teacher: [T.walk[1] - 0.05, ...talkHops(LINES, tagT, { cps: CPS }), ...(cfg.lastWho === 'teacher' ? [T.last + 0.05, T.last + 0.5] : [])],
    student: [0.08, 0.5, ...talkHops(LINES, tagS, { cps: CPS }), T.bulb + 0.05, T.bulb + 0.4, ...(cfg.lastWho === 'student' ? [T.last + 0.05, T.last + 0.5] : [])],
  }
  const phaseAt = t => {
    if (t >= T.last) return 'last'
    if (t >= T.recap) return 'recap'
    if (t >= T.bulb) return 'bulb'
    let p = 'q'
    T.beats.forEach((b, i) => { if (t >= b.at) p = i })
    return p
  }
  const lineAt = t => {                                     // the line being typed or just finished (for the caret)
    let s = null
    LINES.forEach((L, i) => { if (t >= L.t && t < T.times[i].done + 0.6) s = i })
    return s
  }
  const speaker = t => {
    if (t >= T.last) return cfg.lastWho
    if (t < T.lines[0].t) return t < T.qOut[1] ? 'student' : null
    const i = lineAt(t)
    return i === null ? null : LINES[i].who
  }
  const defaultMoods = (ph, t) => {
    const talking = speaker(t)
    if (ph === 'q') return [{ mood: 'happy', look: [1, 0] }, { mood: 'wide', look: [-1, -1] }]
    if (ph === 'bulb') return [{ mood: 'happy', look: [1, 0] }, { mood: 'sparkle', look: [0, -1] }]
    if (ph === 'recap' || ph === 'last') return [{ mood: 'happy', look: [1, 0] }, { mood: 'happy', look: [-1, 0] }]
    return [
      talking === 'teacher' ? { mood: 'happy', look: [1, -1] } : { mood: 'neutral', look: [1, 0] },
      talking === 'student' ? { mood: 'wide', look: [-1, 0] } : { mood: 'squint', look: [-1, -1] },
    ]
  }

  async function build(stage) {
    await loadExplainFonts()
    try { await Promise.all(["700 48px 'Space Mono'", "italic 500 140px 'EB Garamond'", "800 92px Inter"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const card = questionCard(root, { q: cfg.q, at: 0, out: T.qOut, accentColor: cfg.qAccent })
    const recap = gotIt(root, { items: cfg.items, at: T.recap, out: [T.out[0], T.out[1]] })
    const box = dialogueBox(root, { lines: LINES, y: 1400, height: 270, open: LINES[0].t - 0.22, close: T.boxClose, cps: CPS, size: 46 })
    const who = cfg[cfg.lastWho]
    const tag = el('div', { position: 'absolute', left: '0', width: '1080px', top: '1418px', textAlign: 'center', font: "700 30px 'Space Mono', monospace", letterSpacing: '0.08em', color: who.accent || who.color, textShadow: '0 3px 0 rgba(6,4,18,0.9)', display: 'none' }, root, who.tag)
    const last = popText(root, cfg.last, { top: 1470, size: 88, accentSize: 128, at: T.last + 0.12, gap: 0.08, accentColor: who.accent || who.color, wobble: true, fit: true })
    const cv2 = layerCanvas(root, { pointerEvents: 'none' }), x2 = cv2.getContext('2d')
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

    function caret(r, color, t) {
      const y = r.top - 34 + Math.sin(t * 8) * 6
      x.fillStyle = INK; x.beginPath(); x.moveTo(r.x - 22, y - 16); x.lineTo(r.x + 22, y - 16); x.lineTo(r.x, y + 10); x.fill()
      x.fillStyle = color; x.beginPath(); x.moveTo(r.x - 15, y - 12); x.lineTo(r.x + 15, y - 12); x.lineTo(r.x, y + 4); x.fill()
    }
    function huh(r, t, k) {                                // the student's "?" over its head at frame 0
      if (k <= 0) return
      const y = r.top - 70 + Math.sin(t * 5) * 8, xx = r.x + 70
      x.save(); x.globalAlpha *= k; x.translate(xx, y); x.rotate(0.18 + Math.sin(t * 3) * 0.06)
      x.font = "800 96px Inter, 'Helvetica Neue', Arial, sans-serif"; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.lineWidth = 12; x.strokeStyle = INK; x.strokeText('?', 0, 0); x.fillStyle = cfg.qAccent || GOLD; x.fillText('?', 0, 0)
      x.restore()
    }
    const drawOf = c => c.draw || ((ctx, X, Y, s, t, o) => drawStarChar(ctx, X, Y, s, t, { color: c.color, glyph: c.glyph, ...o }))

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const ok = outK(t, ...T.out)
        const ph = phaseAt(t)
        const sp = speaker(t)
        x.clearRect(0, 0, 1080, 1920)
        drawClassroom(x, t, { dim: 0.25 * clamp(prog(t, T.recap, T.recap + 0.4)) })
        x.save(); x.globalAlpha = ok
        // the board, one page per beat (each page wipes out as the next arrives)
        const bk = outK(t, ...T.boardOut)
        let B = null
        if (bk > 0) {
          B = chalkboard(x, t, { ...BOARD, at: T.board, out: T.boardOut, title: cfg.boardTitle })
          T.beats.forEach((b, i) => {
            const k = i + 1 < T.beats.length ? outK(t, b.out - 0.25, b.out + 0.05) : 1
            if (t < b.at || k <= 0) return
            x.save(); x.globalAlpha *= k
            if (cfg.beats[i].draw) cfg.beats[i].draw(x, t, B, b, T)
            for (const c of cfg.beats[i].chalk || []) chalkText(x, t, { ...c, x: B.x0 + c.x, y: B.y0 + c.y, at: (c.line != null ? b.lines[c.line].t : b.at) + c.dt })
            for (const L of b.lines) if (L.o.tag) factTag(x, t, { kind: L.o.tag.kind, at: L.t + 0.05, out: null, x: B.x0 + L.o.tag.dx, y: B.y0 + L.o.tag.dy, align: L.o.tag.align || 'left' })
            x.restore()
          })
        }
        // the stars: the student starts as the frame-0 hero, then takes its seat as the teacher walks up
        const [mt, ms] = (cfg.moods && cfg.moods(ph, t, T)) || defaultMoods(ph, t)
        const wk = ease.inOutCubic(prog(t, ...T.walk))
        const sx = lerp(POS.hero.x, POS.student.x, wk), sy = lerp(POS.hero.y, POS.student.y, wk), ss = lerp(330, SIZE, wk)
        const tilt = (1 - wk) * (-0.14 + 0.03 * Math.sin(t * 2.4))
        const tx = lerp(-200, POS.teacher.x, ease.outCubic(prog(t, T.walk[0], T.walk[1] + 0.1)))
        const rt = t >= T.walk[0] ? drawOf(cfg.teacher)(x, tx, POS.teacher.y, SIZE, t, { seed: 4, hops: HOPS.teacher, ...mt }) : null
        x.save(); x.translate(sx, sy + ss * 0.4); x.rotate(tilt); x.translate(-sx, -(sy + ss * 0.4))
        const rs = drawOf(cfg.student)(x, sx, sy, ss, t, { seed: 9, hops: HOPS.student, ...ms })
        x.restore()
        huh(rs, t, 1 - clamp(prog(t, T.walk[0], T.walk[0] + 0.3)))
        if (rt && cfg.teacher.prop) cfg.teacher.prop(x, rt, t, T, 'teacher')
        if (cfg.student.prop) cfg.student.prop(x, rs, t, T, 'student')
        // the pointer: at the board while the teacher talks, resting otherwise
        if (rt && B && bk > 0) {
          let aim = null
          T.beats.forEach(b => b.lines.forEach(L => { if (L.who === 'teacher' && t >= L.t - 0.2 && t < L.done + 1.2) aim = L.o.point || [320, 220] }))
          const hx = rt.x + 92, hy = rt.y - 10
          const ang = aim ? Math.atan2(B.y0 + aim[1] - hy, B.x0 + aim[0] - hx) : -1.1
          const tap = aim ? Math.max(0, Math.sin(t * 9)) : 0
          drawPointer(x, hx, hy, ang, { tap })
        }
        if (cfg.front) cfg.front(x, t, T, rt, rs)
        if (sp === 'teacher' && rt) caret(rt, cfg.teacher.accent || cfg.teacher.color, t)
        if (sp === 'student' && t >= T.lines[0].t - 0.2) caret(rs, cfg.student.accent || cfg.student.color, t)
        x.restore()
        x2.clearRect(0, 0, 1080, 1920)
        x2.save(); x2.globalAlpha = ok
        lightbulb(x2, t, { at: T.bulb, x: rs.x, y: rs.top - 70, dur: 1.8 })
        x2.restore()
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
  const pitch = { [tagT]: cfg.teacher.pitch || 440, [tagS]: cfg.student.pitch || 700 }
  const CUES = [
    ...questionCues(0, { key: cfg.key }),
    ['whoosh', r3(T.walk[0]), 0.4, 0.03],
    ['pop', r3(T.board), 659.25, 0.04, 0],
    ...talkCues(LINES, { cps: CPS, pitch }),
    ...T.beats.flatMap(b => b.lines.filter(L => L.o.tag).flatMap(L => tagCues(r3(L.t + 0.05), L.o.tag.kind))),
    ...cfg.beats.flatMap((bt, i) => (bt.chalk || []).flatMap(c => chalkCues(r3((c.line != null ? T.beats[i].lines[c.line].t : T.beats[i].at) + c.dt), c.text, { cps: c.cps || 22 }))),
    ...bulbCues(T.bulb),
    ...gotItCues(T.recap, { items: cfg.items, key: cfg.key }),
    ...Array.from({ length: 4 }, (_, i) => ['pop', r3(T.last + 0.12 + i * 0.08), NOTE[(i + 2) % NOTE.length], 0.03, i % 2 ? 0.15 : -0.15]),
    ['pluck', r3(T.last + 0.5), 1046.5, 0.04, 0.6, 0],
    ['whoosh', r3(T.out[0]), 0.35, 0.025],
    ...(cfg.cues ? cfg.cues(T) : []),
    ...endcardCues(STORY_END),
  ]
  return { DURATION: cfg.duration, SCENES, CUES, T }
}

/** text length check (the brief's limits), for a dev guard: box lines ≤ 46, recap items ≤ 34 */
export function checkLengths(cfg) {
  const bad = []
  for (const b of cfg.beats) for (const [, s] of b.lines) if (plain(s).length > 46) bad.push(s)
  if (plain(cfg.bulb).length > 46) bad.push(cfg.bulb)
  for (const s of cfg.items) if (plain(s).length > 34) bad.push(s)
  return bad
}
