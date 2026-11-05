// xxkit — the episode engine for "Star Talk Explains: Extended" (Month 2 boost, batch m46: kxexe01–kxexe06, 118 s).
// Lives in the first episode's folder; the other episodes import it: import { makeEpisode } from '../../kxexe01/scenes/xxkit.js'
// It is nx2e01's x2kit (Star Talk Explains, Volume 2: classroom, chalkboard, ✓ / ✦ / ♥ tags, lightbulb, THE SHORT
// VERSION, the crying Pisces classmate) made long and re-cut for the Month 2 rules:
//   · NO end card, NO card frame, NO card transition, no logo, no CTA. DURATION = cfg.duration (the story length).
//   · HARD CUT: the last line lands and holds ~1 s; the last frame is a story frame (no fade to black).
//   · FRAME 0 (hookkit.js, read-only): the student mid-scream, mid whip zoom, the question card already up, the
//     episode's hook prop (cfg.hook) in the middle of the frame; a screen shake; at 0.7 s a record scratch + freeze frame
//     with cfg.premise as the caption and a "caught" circle on cfg.caught. The premise has landed by 3 s.
//   · A payoff promise sticker (cfg.promise, default "WAIT FOR CHAPTER 4") and chapter stickers: 1 at the walk-up,
//     the others on the beats that carry `ch: 'TITLE'`, 5 · THE SHORT VERSION at the recap.
//   · cfg.fx(T) → [[factory, opts, cuesFn], …]: any other hookkit effect (notification, loadingBar…) laid on top.
//   · Pisces cries in every episode (sniffles from chapter 4, then the x2kit levels).
//   makeEpisode(cfg) → { DURATION, SCENES, CUES, MUSIC, T }   (cfg as x2kit, plus premise, caught, hook, promise, fx, music)
// Pure f(t); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H, easeOutBack } from '../../wheel.js'
import { whipZoom, whipZoomCues, recordScratch, recordScratchCues, frozen, caught, caughtCues, screenShake, shakeCues, chapter, chapterCues } from '../../hookkit.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
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
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const PISCES = signStar('pisces')

// ── props seated on a drawStarChar sprite (mirrors startalk.js; same as sxmail1/scenes/mail.js) — Pisces' tears
const G = 36, HALF = 18
const FOOT_ROW = 19.6 + 17.6 * Math.cos(Math.PI / 5)
function hopState(t, hops) {
  if (!hops || !hops.length) return { lift: 0, sq: 0 }
  let h = -1e9
  for (const v of hops) if (v <= t && v > h) h = v
  const dt = t - h
  if (dt > 0.6) return { lift: 0, sq: 0 }
  const AIR = 0.26
  if (dt < 0.05) return { lift: 0, sq: 0.12 * Math.sin(Math.PI * dt / 0.05) }
  if (dt < 0.05 + AIR) { const p = (dt - 0.05) / AIR; return { lift: Math.sin(Math.PI * p), sq: -0.1 * Math.sin(Math.PI * Math.min(1, p * 1.6)) } }
  const d = dt - 0.05 - AIR
  return { lift: 0, sq: 0.16 * Math.exp(-d * 11) * Math.cos(d * 26) }
}
export function starFrame(x, y, size, t, { pop = 1, bob, squash = 0, hops = null, seed = 1 } = {}) {
  const s = size * pop
  const cell = s >= 100 ? Math.max(1, Math.round(s / G)) : s / G
  const S = cell * G
  const bobA = bob === undefined ? size * 0.035 : bob
  const hs = hopState(t, hops)
  const sq = squash + hs.sq + 0.018 * Math.sin(t * 3.1 + seed * 1.7)
  const cy = y + Math.sin(t * 2.2 + seed * 2.1) * bobA - hs.lift * size * 0.09
  const base = (FOOT_ROW - HALF) * cell
  return { cell, S, cy, base, ox: Math.round(x), oy: Math.round(cy + base), sx: 1 + sq, sy: 1 - sq * 0.9 }
}
export function inSprite(ctx, F, fn) {
  ctx.save(); ctx.translate(F.ox, F.oy); ctx.scale(F.sx, F.sy); ctx.translate(-F.S / 2, -F.S / 2 - F.base); ctx.scale(F.cell, F.cell)
  fn(); ctx.restore()
}
/** happy tears from both eyes (sprite cells), k: 1 sniffle · 2 streams · 3 fountains */
export function tearsCells(ctx, t, k) {
  if (k <= 0) return
  const drop = (i, j) => { ctx.fillStyle = INK; ctx.fillRect(i - 0.15, j - 0.15, 1.3, 1.7); ctx.fillStyle = '#8fe3ff'; ctx.fillRect(i, j, 1, 1.4); ctx.fillStyle = '#ffffff'; ctx.fillRect(i, j, 0.5, 0.5) }
  const n = k >= 3 ? 9 : k >= 2 ? 5 : 2, rate = k >= 3 ? 1.9 : k >= 2 ? 1.2 : 0.7
  for (const d of [-1, 1]) {
    const ex = d < 0 ? 10.2 : 25.2
    for (let q = 0; q < n; q++) {
      const ph = ((t * rate + q / n + (d > 0 ? 0.13 : 0)) % 1 + 1) % 1
      if (k === 1 && ph > 0.75) continue
      let px, py
      if (k >= 3) { px = ex + d * 15 * ph; py = 20 - 9 * ph + 24 * ph * ph }
      else if (k === 2) { px = ex + d * 3.5 * ph; py = 20.5 + 15 * ph * ph }
      else { px = ex + d * 0.6 * ph; py = 21 + 8 * ph * ph }
      drop(Math.round(px * 2) / 2, Math.round(py * 2) / 2)
    }
  }
}
/** draws a star (drawStarChar) and, if k > 0, its tears seated on the sprite */
export function cryingStar(x, X, Y, size, t, opts, k) {
  const r = drawStarChar(x, X, Y, size, t, opts)
  if (k > 0 && (opts.pop ?? 1) > 0.3) inSprite(x, starFrame(X, Y, size, t, opts), () => tearsCells(x, t, k))
  return r
}
const isPisces = c => /PISCES/.test(c.tag || '')
/** the tears level at t (1 at the lightbulb, 2 at the recap, 3 on the last line) */
export const tearsAt = (t, T) => (t >= T.last ? 3 : t >= T.recap ? 2 : t >= T.bulb ? 1 : (T.ch4 != null && t >= T.ch4 + 1.5) ? 1 : 0)

/** the series bug, top-left 56 px: a tiny chalk "?" badge + STAR TALK EXPLAINS */
function buildBug(root, { at, out }) {
  const box = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'none', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  const q = el('div', { width: '40px', height: '40px', borderRadius: '8px', background: '#17302a', boxShadow: '0 0 0 4px #a8693a, 0 3px 0 4px #1b1236', color: '#ffe27a', font: `800 30px ${INTER}`, lineHeight: '40px', textAlign: 'center' }, box, '?')
  void q
  el('div', { font: `800 30px ${INTER}`, fontVariant: 'small-caps', letterSpacing: '0.2em', color: GOLD, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap' }, box, 'STAR&nbsp;TALK&nbsp;EXPLAINS&nbsp;·&nbsp;EXTENDED')
  return {
    update(t) {
      const k = pop01(t, at, 0.36, 2.2) * outK(t, ...out)
      box.style.display = k <= 0.01 ? 'none' : 'flex'
      box.style.opacity = String(clamp(k * 2))
      box.style.transform = `scale(${(0.6 + 0.4 * k).toFixed(4)})`
    },
  }
}

/** the schedule (pure; shared by picture and sound) */
export function schedule(cfg) {
  const D = cfg.duration, STORY_END = D
  const T = { STORY_END, qOut: [2.7, 3.0], walk: [2.35, 3.0], board: 2.75, hookOut: [2.45, 2.85] }
  T.last = r3(STORY_END - 3.1)
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
  const extra = Math.min(1.5, room / flat.length)
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
  T.out = [D + 5, D + 6]   // never: hard cut
  if (T.slack > 2.5) throw new Error(`${cfg.id}: ${T.slack.toFixed(2)} s of dead air before the recap: add lines`)
  T.ch4 = null
  cfg.beats.forEach((b, i) => { if (b.ch && /LOVE/.test(b.ch)) T.ch4 = T.beats[i].at })
  return T
}

export function makeEpisode(cfg) {
  const T = schedule(cfg)
  const { STORY_END } = T
  const LINES = T.lines
  const CM = cfg.classmate === false || isPisces(cfg.teacher) || isPisces(cfg.student) ? null : { x: 540, y: 1250, size: 168, ...(cfg.classmate || {}) }
  T.cm = r3(LINES[0].t + 0.6)
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
    const recap = gotIt(root, { items: cfg.items, at: T.recap, out: null })
    const box = dialogueBox(root, { lines: LINES, y: 1400, height: 270, open: LINES[0].t - 0.22, close: T.boxClose, cps: CPS, size: 46 })
    const who = cfg[cfg.lastWho]
    const tag = el('div', { position: 'absolute', left: '0', width: '1080px', top: '1418px', textAlign: 'center', font: "700 30px 'Space Mono', monospace", letterSpacing: '0.08em', color: who.accent || who.color, textShadow: '0 3px 0 rgba(6,4,18,0.9)', display: 'none' }, root, who.tag)
    const last = popText(root, cfg.last, { top: 1470, size: 88, accentSize: 128, at: T.last + 0.12, gap: 0.08, accentColor: who.accent || who.color, wobble: true, fit: true })
    const cv2 = layerCanvas(root, { pointerEvents: 'none' }), x2 = cv2.getContext('2d')
    const bug = buildBug(root, { at: T.qOut[0] + 0.1, out: T.out })
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
    const drawOf = c => c.draw || ((ctx, X, Y, s, t, o) => cryingStar(ctx, X, Y, s, t, { color: c.color, glyph: c.glyph, ...o }, isPisces(c) ? tearsAt(t, T) : 0))
    function classmate(t) {                              // the crying Pisces classmate, peeking up between the two stars
      if (!CM) return
      const p = pop01(t, T.cm, 0.4, 2.2)
      if (p <= 0.01) return
      const k = tearsAt(t, T)
      const mood = k >= 2 ? 'wide' : k >= 1 ? 'sparkle' : 'neutral'
      const look = k >= 1 ? [1, -1] : [0, -1]
      cryingStar(x, CM.x, CM.y, CM.size, t, { color: PISCES.color, glyph: PISCES.glyph, mood, look, seed: 6, glow: 0.7, pop: p, hops: [T.cm + 0.2, T.bulb + 0.1, T.recap + 0.1, T.last + 0.1] }, k)
    }

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
        classmate(t)
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
        if (cfg.hook && t < T.hookOut[1]) { x.save(); x.globalAlpha *= outK(t, ...T.hookOut); cfg.hook(x, t, T, rs); x.restore() }
        { // frame 0: the student mid-scream (a comic burst), gone by the walk-up
          const k = outK(t, ...T.hookOut)
          if (k > 0) {
            const sc = 1 + 0.06 * Math.sin(t * 30)
            x.save(); x.globalAlpha *= k; x.translate(rs.x + 250, rs.top + 120); x.rotate(0.16); x.scale(sc, sc)
            x.fillStyle = '#ff5c8a'; x.strokeStyle = INK; x.lineWidth = 8; x.beginPath()
            for (let i = 0; i < 18; i++) { const a = i * Math.PI / 9, r = i % 2 ? 70 : 108; x.lineTo(Math.cos(a) * r * 1.35, Math.sin(a) * r * 0.8) }
            x.closePath(); x.fill(); x.stroke()
            x.font = "800 58px Inter, 'Helvetica Neue', Arial, sans-serif"; x.textAlign = 'center'; x.textBaseline = 'middle'
            x.lineWidth = 10; x.strokeText(cfg.scream || 'WAIT—', 0, 2); x.fillStyle = BONE; x.fillText(cfg.scream || 'WAIT—', 0, 2)
            x.restore()
          }
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
        bug.update(t)
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

  // ── the hook kit: frame 0 mid whip zoom + shake, then the record scratch / freeze frame on the premise
  const WHIP = { at: -0.24, len: 0.5, from: 1.7 }
  const SHAKE = { at: 0.02, len: 0.55, amp: 26 }
  const REC = { at: 0.72, len: 1.55, caption: cfg.premise, top: 1480 }
  const CAUGHT = { at: 0.86, ...cfg.caught, out: [REC.at + REC.len - 0.05, REC.at + REC.len + 0.08] }
  const STICK = [{ at: 3.05, out: [7.4, 7.6], n: 1, title: 'the question' }]
  cfg.beats.forEach((b, i) => { if (b.ch) STICK.push({ at: r3(T.beats[i].at + 0.05), out: [r3(T.beats[i].at + 3.6), r3(T.beats[i].at + 3.8)], n: STICK.length + 1, title: b.ch }) })
  STICK.push({ at: r3(T.recap + 0.05), out: [r3(T.last - 0.3), r3(T.last - 0.1)], n: STICK.length + 1, title: 'the short version' })
  const PROMISE = { at: 3.85, out: [7.4, 7.6], n: '★', title: cfg.promise || 'wait for chapter 4', y: 340, color: '#ff8fb1' }
  const FX = cfg.fx ? cfg.fx(T) : []
  const SCENES = [frozen(build, [REC]), whipZoom(WHIP), screenShake(SHAKE), recordScratch(REC), caught(CAUGHT), ...STICK.map(chapter), chapter(PROMISE), ...FX.map(([f, o]) => f(o))]

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
    ...(cfg.cues ? cfg.cues(T) : []),
    ...(CM ? [['pop', T.cm + 0.05, 1174.66, 0.025, 0.1], ['bell', r3(T.bulb + 0.2), 1567.98, 0.02, 1.2, 0]] : []),
    ...whipZoomCues(WHIP), ...shakeCues(SHAKE), ...recordScratchCues(REC), ...caughtCues(CAUGHT),
    ...STICK.flatMap(chapterCues), ...chapterCues(PROMISE), ...FX.flatMap(([, o, c]) => (c ? c(o) : [])),  ]
  const MUSIC = { style: cfg.music?.style || 'dreamy', key: cfg.key, seed: cfg.music?.seed || 4601, sections: { drop: 3.0, breakdown: T.ch4 != null ? [r3(T.ch4)] : [], lift: [r3(T.recap)], outroAt: r3(T.last) } }
  return { DURATION: r3(STORY_END), SCENES, CUES, MUSIC, T }
}

/** text length check (the brief's limits), for a dev guard: box lines ≤ 46, recap items ≤ 34 */
export function checkLengths(cfg) {
  const bad = []
  for (const b of cfg.beats) for (const [, s] of b.lines) if (plain(s).length > 46) bad.push(s)
  if (plain(cfg.bulb).length > 46) bad.push(cfg.bulb)
  for (const s of cfg.items) if (plain(s).length > 34) bad.push(s)
  return bad
}
