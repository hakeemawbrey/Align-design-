// ask.js — the "Ask the Stars" kit (Star Talk season 1 extra, promo/films/STARTALK12.md). A copy lives in each ask<sign>
// folder so every film stands alone; it only builds on the shared modules (startalk, cardfx, endcard, sky), never edits them.
//
//   askFilm(S) → { DURATION, SCENES, CUES }
//   S = {
//     duration, sign ('libra'), speaker ('♎ LIBRA STAR'), accent (hex, the question's Garamond word + the chip glyph),
//     question 'We can never pick *where* to eat.'       the DM headline: on screen, settled, at t = 0 (frame 0 = thumbnail)
//     qSize                                              Inter size of the question (default 92)
//     dmOut [a, b]                                       the DM bubble slides up and away
//     lines [{ t, text }], open, close, cps              the RPG box (speaker = S.speaker)
//     note { t, out, rows: ['LIBRA · CARDINAL AIR', 'RULED BY VENUS'] }   the real-astrology chip
//     heads [{ text, at, out: [a, b], top, size, accentSize, accentColor, late, lateAt }]   big Inter headlines
//     tie { img, back?, at, flip?: [a, b], out: [a, b], x, y, h, rot, chip?: { t, text } }   the Align tie-in card
//     load ['card-…png']                                 extra images for the film's own draw
//     drawBack(x, t, K), drawFront(x, t, K)              the film's canvas layers (behind / in front of the tie card)
//     cuts, cues, music: { style, key, seed, drop }
//   }
//   K = { img(name), drawBits, sparkles, pop01, popOut, outK, tipOf, hopState, W }
// Pure f(t); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { A, fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues } from '../../startalk.js'

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

// ── a stepped-corner pixel panel on a canvas (the DM bubble and the chip)
function pixelPanel(cv, w, h, { px = 6, fill = 'rgba(22,14,48,0.92)', rim = BONE, rim2 = 'rgba(239,230,214,0.35)', tail = false, m = 30 }) {
  cv.width = w + 2 * m; cv.height = h + 2 * m + (tail ? 8 * px : 0)
  const c = cv.getContext('2d')
  const rect = (a, b, ww, hh, col) => { c.fillStyle = col; c.fillRect(m + a, m + b, ww, hh) }
  const slab = (inset, col) => {
    const p = px, i = inset
    rect(i + 2 * p, i, w - 2 * i - 4 * p, h - 2 * i, col)
    rect(i + p, i + p, w - 2 * i - 2 * p, h - 2 * i - 2 * p, col)
    rect(i, i + 2 * p, w - 2 * i, h - 2 * i - 4 * p, col)
  }
  // drop shadow
  c.save(); c.translate(0, px * 2); c.globalAlpha = 0.55; slab(0, '#05030c'); c.restore()
  slab(0, rim); slab(px, INK); slab(px * 2, fill)
  // a bone hairline inside
  c.fillStyle = rim2; c.fillRect(m + 4 * px, m + 3 * px, w - 8 * px, 2)
  if (tail) {                                                  // a stepped speech tail, lower left
    const y0 = h - 3 * px
    for (let k = 0; k < 7; k++) rect(70, y0 + k * px, (7 - k) * px, px, rim)
    for (let k = 0; k < 5; k++) rect(70 + px, y0 + k * px, (5 - k) * px, px, INK)
    for (let k = 0; k < 3; k++) rect(70 + 2 * px, y0 + k * px, (3 - k) * px, px, fill)
  }
  return m
}

const ENV = ['RRRRRRRRRR', 'RWRRRRRRWR', 'RRWWRRWWRR', 'RRRRWWRRRR', 'RRRRRRRRRR', 'RRRRRRRRRR']

/** the DM notification: header row (envelope · NEW MESSAGE · asked anonymously) + the question, settled at t = 0 */
function makeDM(root, S) {
  const w = 960, h = S.dmH || 360, top = S.dmTop || 128
  const wrap = el('div', { position: 'absolute', left: ((W - w) / 2) + 'px', top: top + 'px', width: w + 'px', height: h + 'px', transformOrigin: '12% 100%' }, root)
  const cv = el('canvas', { position: 'absolute', imageRendering: 'pixelated' }, wrap)
  const m = pixelPanel(cv, w, h, { tail: true })
  Object.assign(cv.style, { left: -m + 'px', top: -m + 'px', width: cv.width + 'px', height: cv.height + 'px' })
  // envelope icon
  const ic = el('canvas', { position: 'absolute', left: '44px', top: '34px', width: '60px', height: '36px', imageRendering: 'pixelated' }, wrap)
  ic.width = 10; ic.height = 6
  const icx = ic.getContext('2d')
  ENV.forEach((r, j) => [...r].forEach((ch, i) => { icx.fillStyle = ch === 'W' ? '#ffffff' : S.accent; icx.fillRect(i, j, 1, 1) }))
  el('div', { position: 'absolute', left: '122px', top: '30px', font: `700 30px ${MONO}`, letterSpacing: '0.1em', color: GOLD, whiteSpace: 'nowrap' }, wrap, 'NEW MESSAGE')
  el('div', { position: 'absolute', right: '44px', top: '32px', font: `700 26px ${MONO}`, letterSpacing: '0.04em', color: 'rgba(239,230,214,0.62)', whiteSpace: 'nowrap' }, wrap, 'asked anonymously')
  // the question (settled from frame 0)
  const Q = popText(wrap, S.question, { top: S.qTop || 96, size: S.qSize || 92, accentSize: (S.qSize || 92) * 1.18, accentColor: S.accent, at: 0, settled: true, left: 30, width: w - 60, lineHeight: 1.04 })
  // unread dot that pulses
  const dot = el('div', { position: 'absolute', right: '26px', top: '-14px', width: '36px', height: '36px', background: PINK, boxShadow: `0 0 0 6px ${INK}, 0 0 24px ${PINK}` }, wrap)
  return {
    update(t) {
      const [a, b] = S.dmOut
      const o = ease.inCubic(prog(t, a, b))
      if (o >= 1) { wrap.style.display = 'none'; return }
      wrap.style.display = 'block'
      const land = ease.outCubic(prog(t, 0, 0.35))
      const buzz = t < 0.7 ? Math.sin(t * 95) * 7 * (1 - t / 0.7) : 0
      wrap.style.transform = `translate(${buzz.toFixed(2)}px, ${((1 - land) * -18 - o * 260).toFixed(2)}px) scale(${(1 - 0.08 * o).toFixed(4)}) rotate(${(buzz * 0.05).toFixed(3)}deg)`
      wrap.style.opacity = String(1 - o)
      Q.update(t)
      dot.style.opacity = t > (S.seenAt ?? 1e9) ? '0' : String(0.75 + 0.25 * Math.sin(t * 7))
    },
  }
}

/** the real-astrology note: a small pixel chip (glyph + one or two rows) */
function makeChip(root, S) {
  const N = S.note, rows = N.rows
  const w = N.w || 760, h = 40 + rows.length * 42, top = N.top || 1268
  const wrap = el('div', { position: 'absolute', left: ((W - w) / 2) + 'px', top: top + 'px', width: w + 'px', height: h + 'px', transformOrigin: '50% 50%', display: 'none' }, root)
  const cv = el('canvas', { position: 'absolute', imageRendering: 'pixelated' }, wrap)
  const m = pixelPanel(cv, w, h, { px: 5, fill: 'rgba(30,18,62,0.95)', rim: S.accent, rim2: 'rgba(239,230,214,0)', m: 20 })
  Object.assign(cv.style, { left: -m + 'px', top: -m + 'px', width: cv.width + 'px', height: cv.height + 'px' })
  const txt = el('div', { position: 'absolute', left: 0, top: '20px', width: w + 'px', textAlign: 'center', font: `700 30px ${MONO}`, lineHeight: '42px', letterSpacing: '0.06em', color: BONE, whiteSpace: 'nowrap' }, wrap)
  rows.forEach((r, i) => el('div', { color: i === 0 ? S.accent : BONE }, txt, r))
  const tag = el('div', { position: 'absolute', left: '28px', top: '-22px', padding: '2px 12px', background: INK, font: `700 22px ${MONO}`, letterSpacing: '0.16em', color: GOLD, boxShadow: `0 0 0 4px ${S.accent}` }, wrap, '★ REAL ASTROLOGY')
  void tag
  return {
    update(t) {
      const k = pop01(t, N.t, 0.34, 2.2) * popOut(t, N.out)
      if (t < N.t || k <= 0.01) { wrap.style.display = 'none'; return }
      wrap.style.display = 'block'
      wrap.style.transform = `scale(${k.toFixed(4)})`
    },
  }
}

export function askFilm(S) {
  const DURATION = S.duration, STORY_END = DURATION - ENDCARD_LEN
  const CPS = S.cps || 30
  const LINES = S.lines.map(l => ({ speaker: S.speaker, color: S.lineColor, ...l }))

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const load = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
    const names = [...new Set([...(S.load || []), ...(S.tie ? [S.tie.img, S.tie.back].filter(Boolean) : [])])]
    const ims = Object.fromEntries(await Promise.all(names.map(async n => [n, await load(n)])))

    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const K = { img: n => ims[n], drawBits, sparkles: (...a) => sparkles(x, ...a), pop01, popOut, outK, tipOf, hopState, W, root }

    const heads = (S.heads || []).map(H => [popText(root, H.text, { wobble: true, gap: 0.08, ...H }), H.out])
    const box = dialogueBox(root, { lines: LINES, y: S.boxY || 1460, width: 960, height: S.boxH || 280, open: S.open, close: S.close, cps: CPS })
    const dm = makeDM(root, S)
    const chip = S.note ? makeChip(root, S) : null
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

    function drawTie(t) {
      const Tc = S.tie
      if (!Tc || t < Tc.at) return
      const pin = pop01(t, Tc.at, 0.42, 1.8), o = ease.inCubic(prog(t, ...Tc.out))
      if (o >= 1) return
      const face = ims[Tc.img], back = Tc.back ? ims[Tc.back] : null
      const fp = Tc.flip ? prog(t, ...Tc.flip) : 1
      const showBack = Tc.flip && fp < 0.5
      const im = showBack ? back : face
      if (!im) return
      const h = Tc.h || 760, ww = h * im.width / im.height
      const sxk = Tc.flip ? Math.abs(Math.cos(Math.PI * fp)) : 1
      const cx = (Tc.x ?? 540) + o * 120, cy = (Tc.y ?? 900) + (1 - pin) * 520 + o * 900 + Math.sin(t * 1.7) * 6
      x.save(); x.globalAlpha = clamp(pin * 1.6) * (1 - o)
      // glow behind
      const gr = x.createRadialGradient(cx, cy, 40, cx, cy, h * 0.7); gr.addColorStop(0, 'rgba(242,199,92,0.28)'); gr.addColorStop(1, 'rgba(242,199,92,0)')
      x.fillStyle = gr; x.fillRect(cx - h, cy - h, 2 * h, 2 * h)
      x.translate(cx, cy); x.rotate((Tc.rot ?? -0.04) + (1 - pin) * 0.3 + o * 0.4); x.scale(Math.max(0.02, sxk) * lerp(0.7, 1, pin), lerp(0.7, 1, pin))
      x.imageSmoothingEnabled = true
      x.drawImage(im, -ww / 2, -h / 2, ww, h)
      x.restore()
      if (Tc.flip) sparkles(x, t, cx, cy, Tc.flip[1], 10, h * 0.42, 0.4, [GOLD, BONE, S.accent])
    }
    const tieChip = S.tie && S.tie.chip ? (() => {
      const C = S.tie.chip
      const e = el('div', { position: 'absolute', left: '90px', width: (W - 180) + 'px', top: (C.top || 1330) + 'px', textAlign: 'center', font: `700 32px ${MONO}`, lineHeight: '1.3', letterSpacing: '0.04em', color: BONE, textShadow: '0 3px 0 rgba(6,4,18,0.9), 0 0 18px rgba(6,4,18,0.9)', display: 'none' }, root, C.text)
      return { update(t) { const k = pop01(t, C.t, 0.3, 2) * outK(t, S.tie.out); e.style.display = t < C.t || k <= 0.01 ? 'none' : 'block'; e.style.opacity = String(clamp(k)); e.style.transform = `translateY(${((1 - k) * 24).toFixed(1)}px)` } }
    })() : null

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        drawSky(x, t, { ...SKY_H, ...(S.sky ? S.sky(t) : {}) })
        if (S.drawBack) S.drawBack(x, t, K)
        drawTie(t)
        if (S.drawFront) S.drawFront(x, t, K)
        dm.update(t)
        if (chip) chip.update(t)
        if (tieChip) tieChip.update(t)
        box.update(t)
        for (const [h, o] of heads) h.update(t, outK(t, o))
        drawGrain(gx, t)
      },
    }
  }

  const CUTS = S.cuts || []
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]
  const tieCues = S.tie ? [['whoosh', S.tie.at - 0.05, 0.4, 0.035], ['pop', S.tie.at + 0.3, 880, 0.035, 0],
    ...(S.tie.flip ? [['whoosh', S.tie.flip[0], 0.3, 0.03], ['pluck', S.tie.flip[1], 1318.51, 0.045, 0.6, 0], ['glitter', S.tie.flip[1], S.tie.flip[1] + 0.4]] : []),
    ...(S.tie.chip ? [['tick', S.tie.chip.t, 0.03]] : []), ['whoosh', S.tie.out[0], 0.35, 0.03]] : []
  const headCues = (S.heads || []).flatMap(H => {
    const n = H.text.split(' ').filter(w => w !== '|').length - (H.late || 0)
    return [...wordPops(H.at, n, H.gap || 0.08, 2, 0.026), ...(H.late ? [['pop', H.lateAt, 1318.51, 0.05, 0], ['pluck', H.lateAt, 1174.66, 0.045, 0.6, 0]] : [])]
  })
  const lastBox = LINES[LINES.length - 1]
  void lastBox
  const CUES = [
    // the DM lands: buzz-buzz, a notification blip
    ['pop', 0.02, 1318.51, 0.05, 0], ['pop', 0.12, 1760, 0.035, 0], ...Array.from({ length: 6 }, (_, i) => ['tick', +(0.05 + i * 0.07).toFixed(3), 0.035 * (i % 2 ? 0.6 : 1)]),
    ['whoosh', S.dmOut[0], 0.35, 0.03],
    ...(S.note ? [['pop', S.note.t, 987.77, 0.04, 0], ['bell', S.note.t + 0.05, 1760, 0.02, 1.0, 0.2]] : []),
    ['pop', (S.open ?? LINES[0].t - 0.22), 739.99, 0.04, 0], ['pop', (S.open ?? LINES[0].t - 0.22) + 0.06, 987.77, 0.03, 0],
    ...talkCues(LINES, { cps: CPS }),
    ...(S.close ? [['pop', S.close, 880, 0.03, 0], ['pop', S.close + 0.07, 587.33, 0.03, 0]] : []),
    ...tieCues, ...headCues,
    ...(S.cues || []),
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  return { DURATION, SCENES, CUES, STORY_END, LINES, CPS }
}
