// classkit — the episode engine for Star Talk season 13 "Star Talk Explains", E01–E07 (promo/films/STARTALK16.md).
// Each of these films carries its own copy (like hotkit.js in season 12); every copy is identical. The season's look (the
// question card, the classroom, the chalkboard, chalk lettering, the ✓ / ✦ / ♥ tags, the lightbulb, THE SHORT VERSION)
// comes from ../../stexplain.js; this file only lays out one episode from a plain config: the question at frame 0, the
// teacher stepping up to the board, the lesson traded in the retro dialogue box with a tag on every claim, the student's
// lightbulb, the recap card, the last line and the shared end card.
//
//   makeEpisode(cfg) → { DURATION, SCENES, CUES, T }
//   cfg = {
//     id, numeral, duration, key,
//     q, qAccent                          the frame-0 question (≤ 9 words, one *accent*) and its accent colour
//     teacher: CHAR, student: CHAR         CHAR = { tag, color, accent?, pitch, draw(ctx, x, y, size, t, o) → { x, y, top },
//                                          size?, prop?(ctx, r, t, T, who) }
//     board: { title, w?, h?, y? }        the chalkboard
//     lines: [[ 't' | 's', text, { tag?: 'sky' | 'astro' | 'tip', hold?, pre?, bulb? } ], …]
//                                          a line with `tag` carries that claim's tag pill the moment it starts typing;
//                                          `bulb: true` pops the student's lightbulb on that line.
//     draw(ctx, t, B, T)                  the episode's board drawing (B = the chalkboard rect; T.L[i] = line i's start)
//     recap: [3 items ≤ 34 chars, one *accent* each], last, lastWho ('t' | 's')
//     moods(t, T, i) → [teacherOpts, studentOpts]   i = the current line index (−1 before the first line)
//     front?(ctx, t, T, rt, rs)            anything in front of the stars
//     cues?(T) → extra sound cues
//   }
// Pure f(t); nothing touches `document` at module top level.
import { clamp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops, lineTimes } from '../../startalk.js'
import { popText } from '../../lesson.js'
import {
  loadExplainFonts, questionCard, drawClassroom, chalkboard, factTag, lightbulb, gotIt,
  questionCues, tagCues, bulbCues, gotItCues,
} from '../../stexplain.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', CHALK = '#f4f1e8'
export const POS = { t: { x: 236, y: 1166 }, s: { x: 846, y: 1166 } }
export const SIZE = 250
const CPS = 30

export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, a, b) => 1 - ease.inQuad(prog(t, a, b))
export const R = (x, c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }

/** the schedule (pure; shared by picture and sound) */
export function schedule(cfg) {
  const D = cfg.duration, STORY_END = r3(D - ENDCARD_LEN)
  const T = { STORY_END }
  T.qOut = [2.75, 3.05]                   // the question holds ≥ 2.5 s, fully on from frame 0
  T.board = 2.55                          // the chalkboard pops in as the question leaves
  T.enter = 2.35                          // the teacher steps up
  const cast = { t: cfg.teacher, s: cfg.student }
  // the recap lands 4.25 s before the end card (its items stay readable ≥ 2.5 s); spare time is shared out as longer holds
  T.recap = r3(STORY_END - 4.25)
  const lay = (extra) => {
    const out = []
    let t = cfg.firstAt ?? 3.25
    for (const [who, text, o = {}] of cfg.lines) {
      const L = { t: r3(t + (o.pre || 0)), speaker: cast[who].tag, text, color: cast[who].accent || cast[who].color, who, tag: o.tag || null, bulb: !!o.bulb }
      out.push(L)
      const tm = lineTimes([L], { cps: CPS })[0]
      t = tm.done + (o.hold ?? 1.55) + extra
    }
    return { out, close: r3(t - extra) }
  }
  let { out: lines, close } = lay(0)
  const slack = T.recap - 0.05 - close
  if (slack < 0) throw new Error(`${cfg.id}: lines overrun the recap by ${(-slack).toFixed(2)} s`)
  if (slack > 0.05) ({ out: lines, close } = lay(Math.min(1.2, slack / cfg.lines.length)))
  T.slack = r3(slack)
  T.lines = lines
  T.L = lines.map(L => L.t)
  T.times = lineTimes(lines, { cps: CPS })
  T.done = T.times.map(m => m.done)
  const lastDone = T.done[T.done.length - 1]
  T.boxClose = r3(Math.max(lastDone + 1.55, close))
  T.bulb = lines.findIndex(L => L.bulb)
  T.bulbAt = T.bulb >= 0 ? r3(lines[T.bulb].t - 0.15) : null
  // the end: THE SHORT VERSION card, then the last line under it, counted back from the end card
  T.last = r3(STORY_END - 2.0)
  T.out = [r3(STORY_END - 0.4), r3(STORY_END - 0.05)]
  // the tags: each one lives from its line's start until the next tagged line (or the box closes)
  const tagged = lines.map((L, i) => (L.tag ? i : -1)).filter(i => i >= 0)
  T.tags = tagged.map((i, k) => ({ kind: lines[i].tag, at: r3(lines[i].t + 0.05), out: r3(k + 1 < tagged.length ? lines[tagged[k + 1]].t - 0.12 : T.boxClose) }))
  return T
}

export function makeEpisode(cfg) {
  const T = schedule(cfg)
  const { STORY_END } = T
  const LINES = T.lines
  const tTag = cfg.teacher.tag, sTag = cfg.student.tag
  const HOPS = {
    t: [T.enter + 0.45, ...talkHops(LINES, tTag, { cps: CPS }), ...(cfg.lastWho === 't' ? [T.last + 0.05, T.last + 0.5] : [])],
    s: [0.05, ...talkHops(LINES, sTag, { cps: CPS }), ...(T.bulbAt ? [T.bulbAt + 0.05, T.bulbAt + 0.4] : []), ...(cfg.lastWho === 's' ? [T.last + 0.05, T.last + 0.5] : [])],
  }
  const lineAt = t => { let i = -1; LINES.forEach((L, n) => { if (t >= L.t - 0.05) i = n }); return i }
  const speaker = t => {
    if (t >= T.last) return cfg.lastWho
    if (t < LINES[0].t) return null
    if (t >= T.boxClose) return null
    const i = lineAt(t)
    return i >= 0 && t < T.done[i] + 0.6 ? LINES[i].who : null
  }

  async function build(stage) {
    await loadExplainFonts()
    try { await Promise.all(["700 48px 'Space Mono'", "italic 500 140px 'EB Garamond'", "800 92px Inter"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const qc = questionCard(root, { q: cfg.q, at: 0, out: T.qOut, accentColor: cfg.qAccent, size: cfg.qSize ?? 118 })
    const box = dialogueBox(root, { lines: LINES, y: 1420, height: 262, open: LINES[0].t - 0.2, close: T.boxClose, cps: CPS, size: 46 })
    const cv2 = layerCanvas(root, { pointerEvents: 'none' }), x2 = cv2.getContext('2d')
    const recap = gotIt(root, { items: cfg.recap, at: T.recap, out: T.out, top: cfg.recapTop ?? 560 })
    const who = cfg.lastWho === 't' ? cfg.teacher : cfg.student
    const tag = el('div', { position: 'absolute', left: '0', width: '1080px', top: '1428px', textAlign: 'center', font: "700 30px 'Space Mono', monospace", letterSpacing: '0.08em', color: who.accent || who.color, textShadow: '0 3px 0 rgba(6,4,18,0.9)', display: 'none' }, root, who.tag)
    const last = popText(root, cfg.last, { top: 1488, size: 88, accentSize: 132, at: T.last + 0.12, gap: 0.08, accentColor: who.accent || who.color, wobble: true, fit: true })
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

    function caret(r, color, t) {
      const y = r.top - 30 + Math.sin(t * 8) * 6
      x.fillStyle = INK; x.beginPath(); x.moveTo(r.x - 22, y - 16); x.lineTo(r.x + 22, y - 16); x.lineTo(r.x, y + 10); x.fill()
      x.fillStyle = color; x.beginPath(); x.moveTo(r.x - 15, y - 12); x.lineTo(r.x + 15, y - 12); x.lineTo(r.x, y + 4); x.fill()
    }
    // the student's "huh?": a bouncing pixel ? over the head until the lesson starts
    const QM = ['.XXX.', 'X...X', '...X.', '..X..', '.....', '..X..']
    function huh(r, t, k) {
      if (k <= 0) return
      const px = 9, y0 = r.top - 92 + Math.sin(t * 5) * 6, x0 = r.x + 40
      x.save(); x.globalAlpha *= k
      QM.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === 'X') { R(x, INK, x0 + i * px - 3, y0 + j * px - 3, px + 6, px + 6) } }))
      QM.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === 'X') R(x, CHALK, x0 + i * px, y0 + j * px, px, px) }))
      x.restore()
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const ok = outK(t, ...T.out)
        const sp = speaker(t)
        const i = lineAt(t)
        const rk = clamp(prog(t, T.recap, T.recap + 0.35))            // the recap dims the room
        x.clearRect(0, 0, 1080, 1920)
        x.save(); x.globalAlpha = ok
        drawClassroom(x, t, { dim: 0.15 + 0.45 * rk })
        const B = chalkboard(x, t, { x: 540, y: cfg.board.y ?? 740, w: cfg.board.w ?? 860, h: cfg.board.h ?? 500, at: T.board, out: [T.recap, T.recap + 0.3], title: cfg.board.title })
        if (B && B.k > 0 && cfg.draw) { x.save(); x.globalAlpha *= B.k; cfg.draw(x, t, B, T); x.restore() }
        // the tags ride on the board's top-right corner
        if (B) for (const g of T.tags) factTag(x, t, { kind: g.kind, at: g.at, out: [g.out, g.out + 0.2], x: B.x1 - 18, y: B.y0 - 6, align: 'right' })
        const [mt, ms] = cfg.moods(t, T, i)
        const dim = 1 - 0.5 * rk
        x.save(); x.globalAlpha *= dim
        // the teacher steps up from the left
        const ein = ease.outCubic(prog(t, T.enter, T.enter + 0.5))
        const tx = POS.t.x - (1 - ein) * 420
        const rt = ein > 0 ? cfg.teacher.draw(x, tx, POS.t.y, cfg.teacher.size || SIZE, t, { seed: 4, hops: HOPS.t, ...mt }) : null
        const rs = cfg.student.draw(x, POS.s.x, POS.s.y, cfg.student.size || SIZE, t, { seed: 9, hops: HOPS.s, ...ms })
        if (rt && cfg.teacher.prop) cfg.teacher.prop(x, rt, t, T, 't')
        if (cfg.student.prop) cfg.student.prop(x, rs, t, T, 's')
        huh(rs, t, 1 - prog(t, LINES[0].t - 0.3, LINES[0].t))
        if (cfg.front) cfg.front(x, t, T, rt, rs)
        if (sp === 't' && rt) caret(rt, cfg.teacher.color, t)
        if (sp === 's') caret(rs, cfg.student.color, t)
        x.restore(); x.restore()
        x2.clearRect(0, 0, 1080, 1920)
        x2.save(); x2.globalAlpha = ok
        if (T.bulbAt) lightbulb(x2, t, { at: T.bulbAt, x: rs.x + (cfg.bulbDx ?? 125), y: rs.top + (cfg.bulbDy ?? -10) })
        x2.restore()
        qc.update(t)
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

  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: cfg.numeral, label: 'STAR TALK · EXPLAINS' })]

  const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
  const pitch = { [tTag]: cfg.teacher.pitch || 440, [sTag]: cfg.student.pitch || 700 }
  const CUES = [
    ...questionCues(0, { key: cfg.key }),
    ['whoosh', r3(T.enter), 0.3, 0.02],
    ...talkCues(LINES, { cps: CPS, pitch }),
    ...T.tags.flatMap(g => tagCues(g.at, g.kind)),
    ...(T.bulbAt ? bulbCues(T.bulbAt) : []),
    ...gotItCues(T.recap, { items: cfg.recap, key: cfg.key }),
    ...Array.from({ length: 4 }, (_, k) => ['pop', r3(T.last + 0.12 + k * 0.08), NOTE[(k + 2) % NOTE.length], 0.03, k % 2 ? 0.15 : -0.15]),
    ['pluck', r3(T.last + 0.5), 1046.5, 0.04, 0.6, 0],
    ['whoosh', r3(T.out[0]), 0.35, 0.025],
    ...(cfg.cues ? cfg.cues(T) : []),
    ...endcardCues(STORY_END),
  ]
  return { DURATION: cfg.duration, SCENES, CUES, T }
}
