// guide.js — the "Your Star Guide" film kit (Star Talk season 1 extra, promo/films/STARTALK13.md). A copy lives in each
// guide<sign><n> folder this session builds so every film stands alone; it builds on the shared modules (stguide, startalk,
// cardfx, endcard, sky) and never edits them.
//
//   guideFilm(S) → { DURATION, SCENES, CUES, STORY_END }
//   S = {
//     duration, sign ('capricorn'), n (1…3, the note number), speaker (default '♑ YOUR STAR'), accent (hex),
//     hook 'Capricorn, your star has a note.'   the frame-0 headline (stguide guideHook): on screen at t = 0
//     hookOut [a, b]                             the hook leaves
//     chipOut [a, b]                             the "STAR GUIDE · ♑ CAPRICORN · NOTE 1 / 3" header chip leaves
//     lines [{ t, text }], open, close, cps      the RPG box
//     fact { text, at, dur, x, y }               the ★ ASTROLOGY SAYS chip (stguide factChip)
//     heads [{ text, at, out: [a, b], top, size, accentSize, accentColor, late, lateAt }]   big Inter headlines
//     drawBack(x, t, K), drawFront(x, t, K)      the film's canvas layers (behind / in front of the fact chip)
//     cuts, cues
//   }
//   K = { drawBits, sparkles, pop01, popOut, outK, tipOf, hopState, guide(t, opts), W, root }
//   K.guide(t, { x, y, size, …drawStarChar opts, lantern, lanternGlow, side }) draws the star with its lantern (stguide).
// Pure f(t); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack, SIGNS } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues } from '../../startalk.js'
import { drawGuide, noteChip, guideHook, factChip, guideCues, loadGuideFonts } from '../../stguide.js'

export const W = 1080
export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
export const BEAT = n => 0.6 + n * 0.5556            // the 108 bpm grid every style is arranged on
export const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]

export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
/** springy word-by-word type: `*word*` = accent (Garamond italic, colour), `|` = line break; the last `late` words pop at lateAt */
export function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0, late = 0, lateAt = null, lateGap = 0.1, wobble = false, lineHeight = 1.02, left = 70, width = W - 140, color = BONE, settled = false }) {
  const box = el('div', { position: 'absolute', left: left + 'px', width: width + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  const toks = text.split(' '), nW = toks.filter(w => w !== '|').length
  const ws = []
  let n = 0
  toks.forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.includes('*')
    const style = { display: 'inline-block', margin: '0 0.11em', opacity: 0, transformOrigin: '50% 85%' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.12) + 'px', color: accentColor, letterSpacing: '0' })
    const big = late > 0 && n >= nW - late
    ws.push({ t: big ? lateAt + (n - (nW - late)) * lateGap : t0 + n * gap, big, e: el('span', style, box, w.replace(/\*/g, '')) })
    n++
  })
  return {
    el: box,
    update(t, out = 1) {
      box.style.display = out <= 0 || (!settled && t < t0) ? 'none' : 'block'
      if (box.style.display === 'none') return
      for (const w of ws) {
        const p = settled ? 1 : prog(t, w.t, w.t + (w.big ? 0.4 : 0.28))
        const sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        const rot = w.big && wobble && t > w.t ? 9 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) : 0
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}

/** draw a bitmap of cells (strings, '.' = empty) with a 1-cell ink outline, centred on (cx, cy) */
export function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1, sx = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, 1)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const ch = bm[j][i]; if (ch === '.') continue
    x.fillStyle = cols[ch] || '#f0f'; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}

/** a one-shot ring of pixel sparkles, 0.7 s from t0 */
export function sparkles(x, t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK]) {
  const tt = t - t0
  if (tt < 0 || tt > 0.7) return
  const p = ease.outCubic(tt / 0.7)
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + seed
    drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  x.restore()
}

// the star's own squash (mirrors startalk's hop maths) so a hat or prop stays seated on the tip
export function hopState(t, hops) {
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
/** where the upper tip of a drawStarChar really is this frame (r = its return value) */
export function tipOf(t, r, size, pop, { squash = 0, hops, seed = 1 }) {
  const s = size * pop, cell = s >= 56 ? Math.max(1, Math.round(s / 28)) : s / 28, S = cell * 28
  const sq = squash + hopState(t, hops).sq + 0.018 * Math.sin(t * 3.1 + seed * 1.7)
  const sy = 1 - sq * 0.9, base = S * 0.32
  return { x: r.x, y: r.y + base - (S / 2 + base - cell * 1.2) * sy, cell }
}

/** the guide: the sign's star with its little gold lantern (stguide.drawGuide). o = { x, y, size, …drawStarChar opts,
 *  lantern (0…1 scale), lanternGlow, side (1 right tip, −1 left), flame } */
export function drawGuideAt(x, t, o) {
  const { x: gx, y: gy, size, lantern = 1, lanternGlow = 1, side = 1, flame = 1, lanternSize, ...opts } = o
  return drawGuide(x, gx, gy, size, t, opts, { lantern, glow: lanternGlow, side, flame, lanternSize })
}

export function guideFilm(S) {
  const DURATION = S.duration, STORY_END = DURATION - ENDCARD_LEN
  const CPS = S.cps || 30
  const SG = SIGNS.find(s => s.id === S.sign)
  const speaker = S.speaker || `${SG ? SG.glyph : '★'} YOUR STAR`
  const LINES = S.lines.map(l => ({ speaker, color: S.lineColor, ...l }))

  async function build(stage) {
    await loadGuideFonts()
    try {
      await Promise.all(["800 124px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 36px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const K = { drawBits, sparkles: (...a) => sparkles(x, ...a), pop01, popOut, outK, tipOf, hopState, W, root, guide: (...a) => drawGuideAt(x, ...a) }

    const hook = guideHook(root, { text: S.hook, at: 0, out: S.hookOut, accentColor: S.accent, ...(S.hookOpts || {}) })
    const chip = noteChip(root, { sign: SG ? SG.name : S.sign, glyph: SG ? SG.glyph : '★', n: S.n, of: 3, at: 0, out: S.chipOut, ...(S.chipOpts || {}) })
    const heads = (S.heads || []).map(H => [popText(root, H.text, { wobble: true, gap: 0.08, ...H }), H.out])
    const box = dialogueBox(root, { lines: LINES, y: S.boxY || 1460, width: 960, height: S.boxH || 280, open: S.open, close: S.close, cps: CPS })
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        drawSky(x, t, { ...SKY_H, ...(S.sky ? S.sky(t) : {}) })
        if (S.drawBack) S.drawBack(x, t, K)
        if (S.fact) factChip(x, t, S.fact)
        if (S.drawFront) S.drawFront(x, t, K)
        hook.update(t); chip.update(t)
        box.update(t)
        for (const [h, o] of heads) h.update(t, outK(t, o))
        drawGrain(gx, t)
      },
    }
  }

  const CUTS = S.cuts || []
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]
  const headCues = (S.heads || []).flatMap(H => {
    const n = H.text.split(' ').filter(w => w !== '|').length - (H.late || 0)
    return [...wordPops(H.at, n, H.gap || 0.08, 2, 0.026), ...(H.late ? [['pop', H.lateAt, 1318.51, 0.05, 0], ['pluck', H.lateAt, 1174.66, 0.045, 0.6, 0]] : [])]
  })
  const open = S.open ?? LINES[0].t - 0.22
  const CUES = [
    ...guideCues(0.05),
    ...(S.fact ? [['pop', S.fact.at, 987.77, 0.04, 0], ['bell', S.fact.at + 0.05, 1760, 0.02, 1.0, 0.2]] : []),
    ['pop', open, 739.99, 0.04, 0], ['pop', open + 0.06, 987.77, 0.03, 0],
    ...talkCues(LINES, { cps: CPS }),
    ...(S.close ? [['pop', S.close, 880, 0.03, 0], ['pop', S.close + 0.07, 587.33, 0.03, 0]] : []),
    ...headCues,
    ...(S.cues || []),
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  return { DURATION, SCENES, CUES, STORY_END, LINES, CPS }
}
