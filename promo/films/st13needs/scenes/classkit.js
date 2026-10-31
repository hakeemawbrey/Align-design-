// classkit — the episode engine for Star Talk season 13 "Star Talk Explains", E29–E34 (promo/films/STARTALK16.md).
// Each of these films carries its own copy (like hotkit.js in season 12); every copy is identical. The season's look
// (the question card, the classroom, the chalkboard, chalk, the ✓ / ✦ / ♥ tags, the lightbulb, THE SHORT VERSION) comes
// from ../../stexplain.js; this file only lays out one lesson from a plain config: the question, the teacher and the
// student, the talk in the retro dialogue box, the board, the tags, the lightbulb, the recap, the last line, the end card.
//
//   makeLesson(cfg) → { DURATION, SCENES, CUES, T }
//   cfg = {
//     id, numeral, duration, key,
//     q, qAccent                        the frame-0 question (≤ 9 words, one *accent*) and its accent colour
//     cast: { name: CHAR, … }            CHAR = { tag, color, glyph?, x, y, size, x0?, y0?, size0?, enter?, draw?, pitch? }
//                                         x0/y0/size0 = where it stands at t = 0 (it walks to x/y/size by the board);
//                                         enter = when it pops in (default 0 = already there). draw(ctx, x, y, size, t, o) → r
//     student: 'name'                   who gets the lightbulb and the "?" at frame 0
//     lines: [[ who, text, { hold?, mark?, pre? } ], …]   the talk; mark names this line's start time (T.m[mark])
//     board: { y?, h?, w?, title? }      the chalkboard (default y 740, h 560, w 860: inner rect 140…940 × 490…990)
//     chalk: [ITEM, …]                   ITEM = { text | line | circle, at, out?, … } drawn on the board; at = number |
//                                         'mark' | ['mark', dt]; text items take x, y relative to the board's top-left
//     tags: [{ kind, at, x, y, align }]  the ✓ / ✦ / ♥ pills (board-relative), out at the recap
//     bulb: at                          the lightbulb over the student
//     recap: [3 items], last, lastWho
//     moods(who, t, T) → drawStarChar opts
//     draw?(ctx, t, T, B, k)            the episode's own board art (B = the board rect, k = story fade)
//     front?(ctx, t, T, R, k)           anything in front of the cast (R = { name: drawn rect })
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
import {
  loadExplainFonts, questionCard, drawClassroom, chalkboard, chalkText, chalkLine, chalkCircle, factTag, lightbulb,
  gotIt, questionCues, chalkCues, tagCues, bulbCues, gotItCues, EX,
} from '../../stexplain.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236'
export const CHALK = { white: EX.chalk, pink: EX.chalkPink, blue: EX.chalkBlue, gold: EX.chalkYellow, green: EX.chalkGreen, red: '#ff7a7a' }
const CPS = 28

export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, a, b) => 1 - ease.inQuad(prog(t, a, b))
export const R = (x, c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }

/** the schedule (pure; shared by picture and sound). The talk is laid out forward from the board, then any slack before
 *  the recap is spread evenly over the holds so every line gets more reading time, never less. */
export function schedule(cfg) {
  const D = cfg.duration, STORY_END = r3(D - ENDCARD_LEN)
  const T = { STORY_END, D }
  T.qOut = [2.6, 2.9]
  T.walk = [2.35, 2.95]
  T.boardAt = 2.9
  T.recap = r3(STORY_END - (cfg.recapLen ?? 5.6))
  T.last = r3(STORY_END - 2.3)
  T.boxClose = r3(T.recap - 0.05)
  T.out = [r3(STORY_END - 0.4), r3(STORY_END - 0.05)]
  const cast = cfg.cast
  const lay = extra => {
    const lines = []
    let t = 3.15
    cfg.lines.forEach(([who, text, o = {}], i) => {
      t += (o.pre || 0)
      const L = { t: r3(t), speaker: cast[who].tag, text, color: cast[who].accent || cast[who].color, who, mark: o.mark }
      lines.push(L)
      const tm = lineTimes([L], { cps: CPS })[0]
      t = tm.done + (o.hold ?? 1.55) + (i < cfg.lines.length - 1 ? extra : 0)
    })
    return lines
  }
  let lines = lay(0)
  let times = lineTimes(lines, { cps: CPS })
  const need = times[times.length - 1].done + 1.5
  const slack = T.boxClose - need
  if (slack < -0.01) throw new Error(`${cfg.id}: the talk runs ${(-slack).toFixed(2)} s past the recap; cut a line`)
  const extra = Math.min(slack / Math.max(1, cfg.lines.length), cfg.maxExtra ?? 1.2)
  lines = lay(extra)
  times = lineTimes(lines, { cps: CPS })
  T.lines = lines; T.times = times
  T.m = {}
  lines.forEach((L, i) => { if (L.mark) { T.m[L.mark] = L.t; T.m[L.mark + ':done'] = times[i].done } })
  T.at = a => typeof a === 'number' ? a : Array.isArray(a) ? T.at(a[0]) + (a[1] || 0) : (() => { if (!(a in T.m)) throw new Error(`${cfg.id}: no mark ${a}`); return T.m[a] })()
  T.bulb = cfg.bulb != null ? r3(T.at(cfg.bulb)) : null
  return T
}

export function makeLesson(cfg) {
  const T = schedule(cfg)
  const { STORY_END } = T
  const LINES = T.lines
  const names = Object.keys(cfg.cast)
  const HOPS = {}
  for (const n of names) {
    const c = cfg.cast[n]
    HOPS[n] = [c.enter ? c.enter + 0.05 : 0.05, ...talkHops(LINES, c.tag, { cps: CPS }), ...(cfg.lastWho === n ? [T.last + 0.05, T.last + 0.5] : [])]
    if (cfg.student === n && T.bulb != null) HOPS[n].push(T.bulb)
  }
  const speaker = t => {
    if (t >= T.last) return cfg.lastWho
    if (t >= T.recap) return null
    let s = null
    LINES.forEach((L, i) => { if (t >= L.t && t < T.times[i].done + 0.6) s = L.who })
    return s
  }
  const BOARD = { x: 540, y: cfg.board?.y ?? 740, w: cfg.board?.w ?? 860, h: cfg.board?.h ?? 560 }
  const resolve = it => ({ at: r3(T.at(it.at)), out: it.out != null ? r3(T.at(it.out)) : null })

  async function build(stage) {
    await loadExplainFonts()
    try { await Promise.all(["700 48px 'Space Mono'", "italic 500 140px 'EB Garamond'", "800 92px Inter"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const qc = questionCard(root, { q: cfg.q, at: 0, out: T.qOut, accentColor: cfg.qAccent })
    const box = dialogueBox(root, { lines: LINES, y: 1400, height: 270, open: LINES[0].t - 0.2, close: T.boxClose, cps: CPS, size: 46 })
    const recap = gotIt(root, { items: cfg.recap, at: T.recap, out: T.out, top: cfg.recapTop ?? 560 })
    const who = cfg.cast[cfg.lastWho]
    const tag = el('div', { position: 'absolute', left: '0', width: '1080px', top: '1400px', textAlign: 'center', font: "700 30px 'Space Mono', monospace", letterSpacing: '0.08em', color: who.color, textShadow: '0 3px 0 rgba(6,4,18,0.9)', display: 'none' }, root, who.tag)
    const last = popText(root, cfg.last, { top: 1460, size: 92, accentSize: 140, at: T.last + 0.12, gap: 0.08, accentColor: who.accent || who.color, wobble: true, fit: true })
    const cv2 = layerCanvas(root, { pointerEvents: 'none' }), x2 = cv2.getContext('2d')
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

    function caret(r, color, t) {
      const y = r.top - 34 + Math.sin(t * 8) * 6
      x.fillStyle = INK; x.beginPath(); x.moveTo(r.x - 22, y - 16); x.lineTo(r.x + 22, y - 16); x.lineTo(r.x, y + 10); x.fill()
      x.fillStyle = color; x.beginPath(); x.moveTo(r.x - 15, y - 12); x.lineTo(r.x + 15, y - 12); x.lineTo(r.x, y + 4); x.fill()
    }
    // the frame-0 "huh?": a chalky pixel question mark bobbing over the student until the board arrives
    function huh(r, t) {
      const k = 1 - clamp(prog(t, T.walk[0], T.walk[0] + 0.3))
      if (k <= 0) return
      const P = Math.max(6, Math.round(r.size / 34)), bx = r.x + r.size * 0.4, by = r.top - 18 * P + Math.sin(t * 4) * P
      const rows = ['.XXXX.', 'XX..XX', '....XX', '...XX.', '..XX..', '..XX..', '......', '..XX..', '..XX..']
      x.save(); x.globalAlpha *= k
      rows.forEach((row, j) => [...row].forEach((c, i) => { if (c === 'X') { R(x, INK, bx + i * P - 3, by + j * P - 3, P + 6, P + 6) } }))
      rows.forEach((row, j) => [...row].forEach((c, i) => { if (c === 'X') R(x, GOLD, bx + i * P, by + j * P, P, P) }))
      x.restore()
    }
    const drawOf = c => c.draw || ((ctx, X, Y, s, t, o) => drawStarChar(ctx, X, Y, s, t, { color: c.color, glyph: c.glyph, ...o }))
    const posOf = (c, t) => {
      const w = c.x0 == null ? 1 : ease.inOutCubic(prog(t, T.walk[0], T.walk[1]))
      return { x: lerp(c.x0 ?? c.x, c.x, w), y: lerp(c.y0 ?? c.y, c.y, w), size: lerp(c.size0 ?? c.size, c.size, w) }
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const ok = outK(t, ...T.out)
        const sp = speaker(t)
        x.clearRect(0, 0, 1080, 1920)
        const dimRecap = clamp(prog(t, T.recap - 0.2, T.recap + 0.3))
        drawClassroom(x, t, { dim: 0.45 * dimRecap })
        x.save(); x.globalAlpha = ok
        // the board, its chalk, its art, its tags
        const B = chalkboard(x, t, { x: BOARD.x, y: BOARD.y, w: BOARD.w, h: BOARD.h, at: T.boardAt, out: [T.recap - 0.15, T.recap + 0.15], title: cfg.board?.title })
        const bk = B && B.k != null ? clamp(B.k) : 1
        if (B && bk > 0.02) {
          x.save(); x.globalAlpha *= bk
          if (cfg.draw) cfg.draw(x, t, T, B, ok)
          for (const it of cfg.chalk || []) {
            const { at, out } = resolve(it)
            if (t < at) continue
            const ik = out != null ? 1 - clamp(prog(t, out, out + 0.3)) : 1
            if (ik <= 0) continue
            x.save(); x.globalAlpha *= ik
            if (it.text != null) chalkText(x, t, { text: it.text, x: B.x0 + it.x, y: B.y0 + it.y, at, size: it.size ?? 40, color: it.color ?? CHALK.white, accent: it.accent ?? CHALK.gold, cps: it.cps ?? 22, align: it.align ?? 'left' })
            else if (it.line) chalkLine(x, t, { pts: it.line.map(([px, py]) => [B.x0 + px, B.y0 + py]), at, dur: it.dur ?? 0.6, color: it.color ?? CHALK.white, width: it.width ?? 6, dash: it.dash, arrow: !!it.arrow })
            else if (it.circle) chalkCircle(x, t, { x: B.x0 + it.circle[0], y: B.y0 + it.circle[1], r: it.circle[2], at, dur: it.dur ?? 0.6, color: it.color ?? CHALK.white, width: it.width ?? 6, from: it.from ?? -Math.PI / 2, sweep: it.sweep ?? Math.PI * 2 })
            x.restore()
          }
          for (const tg of cfg.tags || []) factTag(x, t, { kind: tg.kind, at: r3(T.at(tg.at)), out: [T.recap - 0.2, T.recap], x: B.x0 + tg.x, y: B.y0 + tg.y, align: tg.align ?? 'left' })
          x.restore()
        }
        // the cast
        const Rr = {}
        for (const n of names) {
          const c = cfg.cast[n]
          const pop = c.enter ? pop01(t, c.enter, 0.4, 2.2) : 1
          if (pop <= 0) continue
          const p = posOf(c, t)
          const o = cfg.moods ? cfg.moods(n, t, T) || {} : {}
          x.save()
          const tilt = o.tilt || 0
          if (tilt) { x.translate(p.x, p.y + p.size * 0.42); x.rotate(tilt); x.translate(-p.x, -(p.y + p.size * 0.42)) }
          Rr[n] = drawOf(c)(x, p.x, p.y, p.size, t, { seed: c.seed ?? names.indexOf(n) * 5 + 2, hops: HOPS[n], pop, ...o })
          x.restore()
          if (Rr[n] && c.prop) c.prop(x, Rr[n], t, T)
        }
        if (cfg.front) cfg.front(x, t, T, Rr, ok)
        const st = Rr[cfg.student]
        if (st) huh(st, t)
        if (sp && Rr[sp]) caret(Rr[sp], cfg.cast[sp].color, t)
        x.restore()
        x2.clearRect(0, 0, 1080, 1920)
        x2.save(); x2.globalAlpha = ok
        if (st && T.bulb != null) lightbulb(x2, t, { at: T.bulb, x: Math.min(st.x + st.size * 0.42, 990), y: st.top - 30 })
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

  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: cfg.numeral })]

  const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
  const pitch = {}
  for (const n of names) pitch[cfg.cast[n].tag] = cfg.cast[n].pitch || 660
  const CUES = [
    ...questionCues(0, { key: cfg.key }),
    ['whoosh', r3(T.qOut[0]), 0.3, 0.02],
    ...talkCues(LINES, { cps: CPS, pitch }),
    ...(cfg.chalk || []).filter(it => it.text != null).flatMap(it => chalkCues(r3(T.at(it.at)), it.text, { cps: it.cps ?? 22 })),
    ...(cfg.tags || []).flatMap(tg => tagCues(r3(T.at(tg.at)), tg.kind)),
    ...(T.bulb != null ? bulbCues(T.bulb) : []),
    ...gotItCues(T.recap, { items: cfg.recap, key: cfg.key }),
    ...Array.from({ length: 4 }, (_, i) => ['pop', r3(T.last + 0.12 + i * 0.08), NOTE[(i + 2) % NOTE.length], 0.03, i % 2 ? 0.15 : -0.15]),
    ['pluck', r3(T.last + 0.5), 1046.5, 0.04, 0.6, 0],
    ['whoosh', r3(T.out[0]), 0.35, 0.025],
    ...(cfg.cues ? cfg.cues(T) : []),
    ...endcardCues(STORY_END),
  ].sort((a, b) => a[1] - b[1])
  return { DURATION: cfg.duration, SCENES, CUES, T }
}
