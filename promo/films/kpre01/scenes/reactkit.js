// reactkit: the PISCES REACTS look (Month 2 boost, star_advice trial reels, kpre01–06). Read-only for kpre02–06.
//
// The format: ♓ Pisces watches something tiny and wholesome and completely loses it.
//   t = 0         frame 0 = the END state: Pisces mid-sob (tears jetting both ways), the moment's last pose behind it,
//                 the hook line already on screen (thumbnail).
//   0.38          record scratch → FREEZE (desaturated, red scribble frame, "WAIT." stamp)
//   0.72–1.12     REWIND: the clock runs backwards ("◀◀ 8 SECONDS EARLIER" tape label, scan lines)
//   1.12 → brk    the moment plays forward; Pisces watches (neutral → sniffle → wide → streams)
//   brk           Pisces breaks: its own line in a bubble, fountain tears + jets, screen shake
//   brk + 0.5     the last line (lower-third panel) lands and holds
//   loop endings: the last LOOP s crossfade into the frame-0 world (drawn at t − D, which is continuous with frame 0),
//                 the last line + bubble fade out, so a replay is seamless. Hard cuts hold the last line ≥ 0.8 s.
//
// makeReact(cfg) → { DURATION, SCENES, CUES }
//   cfg: { id, D, loop, hook, accent, label = '8 SECONDS EARLIER', END (moment length, s),
//          set(x, c, u)      background (c = film clock for idle motion, u = moment time 0…END),
//          moment(x, c, u)   the actors in front of the set,
//          front(x, c, u)    optional foreground drawn over Pisces,
//          pis: { x, y, s, look, flip }   Pisces placement,  react: [[u, k, mood], …] tears level + mood by moment time,
//          line: { text, x, y }  Pisces's line at the break,  last: 'the *last* line',
//          cues(T) → extra sound cues (times in film seconds; T.u(u) converts moment time → film time) }
// Pure f(t). Imports only shared, read-only modules.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H, easeOutBack } from '../../wheel.js'
import { drawStarChar, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { whipZoom, whipZoomCues, slamTitle, slamTitleCues, recordScratch, recordScratchCues, loopCues } from '../../hookkit.js'
import { pop01, outK, drawBits, sparkles, starFrame, inSprite, tearsCells, INTER, MONO } from '../../sxmail1/scenes/mail.js'

export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, pop01, outK, drawBits, sparkles, starFrame, inSprite, tearsCells, INTER, MONO }
export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', PINK = '#ff8fb1', RED = '#ff4a5a', TEAR = '#8fe3ff'
export const PIS = signStar('pisces')

// ─────────────────────────────────────────────── drawing helpers
export const R = (x, col, X, Y, w, h) => { x.fillStyle = col; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
/** a chunky pixel box: ink border b, fill, optional top highlight */
export function box(x, X, Y, w, h, col, { b = 6, hi = null } = {}) {
  R(x, INK, X - b, Y, w + 2 * b, h); R(x, INK, X, Y - b, w, h + 2 * b)
  R(x, col, X, Y, w, h)
  if (hi) R(x, hi, X + b, Y + b * 0.6, w - 2 * b, Math.max(3, b * 0.7))
}
export function shadow(x, cx, cy, w, a = 0.35) { x.save(); x.fillStyle = `rgba(6,4,18,${a})`; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }

/** a pixel speech bubble on the canvas, popping at t0, gone at t1 */
export function bubble(x, t, cx, cy, t0, t1, text, { size = 38, col = BONE, ink = INK, tail = 0, k: kk = 1, font = INTER, weight = 800 } = {}) {
  const k = pop01(t, t0, 0.26, 2.4) * outK(t, [t1, t1 + 0.18]) * kk
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const w = x.measureText(text).width + 44, h = size + 34
  R(x, ink, -w / 2 - 5, -h / 2, w + 10, h); R(x, ink, -w / 2, -h / 2 - 5, w, h + 10)
  R(x, col, -w / 2, -h / 2, w, h)
  const tx = tail * w * 0.35
  R(x, ink, tx - 14, h / 2 + 3, 16, 14); R(x, col, tx - 9, h / 2, 8, 9); R(x, ink, tx - 22, h / 2 + 12, 10, 10)
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 3)
  x.restore()
}

/** big sideways tear jets (on top of tearsCells' fountains) from Pisces's eyes; k 0…1 strength */
export function tearJets(x, t, F, k, seed = 0) {
  if (k <= 0.01) return
  const eyeY = F.oy - F.base - F.S / 2 + 20.5 * F.cell * F.sy
  const eyes = [F.ox + (10.2 - 18) * F.cell, F.ox + (25.2 - 18) * F.cell]
  const n = 16
  for (let d = 0; d < 2; d++) for (let q = 0; q < n; q++) {
    const ph = (((t * 1.55 + q / n + d * 0.37 + seed * 0.11) % 1) + 1) % 1
    const dir = d ? 1 : -1, sp = (0.8 + 0.4 * ((q * 7) % 5) / 5) * k
    const px = eyes[d] + dir * F.S * 1.05 * ph * sp, py = eyeY - F.S * 0.35 * ph * sp + F.S * 1.15 * ph * ph
    const c = Math.max(4, F.cell * (1.6 - 0.8 * ph))
    x.globalAlpha = clamp((1 - ph) * 1.6) * Math.min(1, k * 1.5)
    R(x, INK, px - c / 2 - 2, py - c / 2 - 2, c + 4, c * 1.3 + 4); R(x, TEAR, px - c / 2, py - c / 2, c, c * 1.3); R(x, '#ffffff', px - c / 2, py - c / 2, c / 2, c / 2)
  }
  x.globalAlpha = 1
  // a puddle under it, growing
  void seed
}

/** Pisces with tears: k 0 none · 1 sniffle · 2 streams · 3 fountain · 4 fountain + jets */
export function drawPisces(x, t, P, k = 0, mood = 'wide') {
  const opts = { color: PIS.color, glyph: P.s >= 150 ? PIS.glyph : null, mood, look: P.look, seed: 6, glow: 0.9, pop: P.pop ?? 1, alpha: P.alpha ?? 1, hops: P.hops, squash: P.squash ?? 0, blink: k >= 3 ? false : undefined }
  drawStarChar(x, P.x, P.y, P.s, t, opts)
  const F = starFrame(P.x, P.y, P.s, t, opts)
  if (k > 0) inSprite(x, F, () => tearsCells(x, t, Math.min(3, Math.ceil(k))))
  if (k > 3) tearJets(x, t, F, clamp(k - 3))
  return F
}

/** pixel snow / sparkle dust etc */
export function snow(x, t, n = 60, { col = '#ffffff', seed = 3, top = 0, bottom = 1920, speed = 70 } = {}) {
  for (let i = 0; i < n; i++) {
    const r = ((i * 9301 + seed * 49297) % 233280) / 233280
    const xx = (r * 1180 + Math.sin(t * 0.8 + i) * 26) % 1120 - 20
    const yy = top + ((((t * speed * (0.6 + r)) + i * 137) % (bottom - top)) + (bottom - top)) % (bottom - top)
    const c = 4 + (i % 3) * 2
    x.globalAlpha = 0.55 + 0.4 * r; R(x, col, xx, yy, c, c)
  }
  x.globalAlpha = 1
}

// ─────────────────────────────────────────────── DOM chrome
export function buildBug(root, { at = -1, label = 'PISCES REACTS' } = {}) {
  const b = el('div', { position: 'absolute', left: '54px', top: '58px', font: `800 30px ${INTER}`, letterSpacing: '0.22em', fontVariant: 'small-caps', color: GOLD,
    textShadow: '0 2px 12px rgba(6,4,18,0.95)', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '14px' }, root,
  `<span style="font:700 34px 'EB Garamond',serif;color:#9fd8ff;letter-spacing:0">${PIS.glyph}&#xFE0E;</span>${label}`)
  return { update(t) { b.style.opacity = String(clamp(prog(t, at, at + 0.2))) } }
}
/** the lower-third last line: a pixel panel with the line, popping at t0 */
export function buildLast(root, text, { top = 1540, accent = GOLD } = {}) {
  const wrap = el('div', { position: 'absolute', left: '60px', width: '960px', top: top + 'px', display: 'none', justifyContent: 'center' }, root)
  const card = el('div', { background: 'rgba(16,9,38,0.94)', border: `6px solid ${GOLD}`, boxShadow: `0 0 0 6px ${INK}, 0 18px 40px rgba(0,0,0,0.5)`, padding: '26px 38px 30px',
    font: `800 64px ${INTER}`, color: BONE, textAlign: 'center', lineHeight: '1.08', maxWidth: '900px' }, wrap,
  text.replace(/\*([^*]+)\*/g, `<span style="font:italic 500 82px 'EB Garamond',serif;color:${accent}">$1</span>`))
  return {
    update(t, t0, out = 1) {
      const k = pop01(t, t0, 0.34, 2.2) * out
      wrap.style.display = k > 0.01 ? 'flex' : 'none'
      wrap.style.opacity = String(clamp(k * 2) * out)
      card.style.transform = `scale(${k.toFixed(4)}) rotate(${(-2 * (1 - clamp(k))).toFixed(2)}deg)`
    },
  }
}

// ─────────────────────────────────────────────── the film
export function makeReact(cfg) {
  const D = cfg.D, LOOP = cfg.loop ? 0.45 : 0
  const T = { scratch: 0.38, freeze: [0.38, 0.72], rew: [0.72, 1.12], play: 1.12 }
  const END = cfg.END
  T.brk = T.play + END            // Pisces breaks the moment the moment ends
  T.last = T.brk + 0.5
  T.u = u => +(T.play + u).toFixed(3)
  if (T.last + (cfg.loop ? 1.6 : 0.9) > D + 0.001) throw new Error(`${cfg.id}: last line lands too late (${T.last.toFixed(2)} s, D ${D})`)

  /** the clock: c = idle/animation time, u = moment time, live = 0 freeze → 1 */
  function clock(t) {
    if (t < T.freeze[0]) return { c: t, u: END, mode: 'sob' }
    if (t < T.freeze[1]) return { c: T.freeze[0], u: END, mode: 'freeze' }
    if (t < T.rew[1]) { const r = ease.inOutQuad(prog(t, ...T.rew)); return { c: lerp(T.freeze[0], T.freeze[0] - 2.4, r), u: lerp(END, 0, r), mode: 'rew' } }
    return { c: t, u: clamp(t - T.play, 0, END), mode: 'play' }
  }
  /** Pisces's tears + mood by moment time; in the sob state it's the full break */
  function react(u, mode, t) {
    if (mode !== 'play' || t >= T.brk) return { k: 4, mood: 'happy' }
    let k = 0, mood = 'neutral'
    for (const [uu, kk, mm] of cfg.react) if (u >= uu) { k = kk; mood = mm }
    return { k, mood }
  }

  function world(x, t, cl) {
    const { c, u, mode } = cl
    cfg.set(x, c, u)
    cfg.moment(x, c, u)
    const r = react(u, mode, t)
    const P = cfg.pis
    const brkK = mode === 'play' ? prog(t, T.brk, T.brk + 0.25) : 1
    const sq = mode === 'play' && t > T.brk && t < T.brk + 0.5 ? 0.14 * Math.exp(-(t - T.brk) * 8) * Math.cos((t - T.brk) * 30) : 0
    shadow(x, P.x, P.y + P.s * 0.48, P.s * 0.9)
    drawPisces(x, c, { ...P, look: r.k >= 4 ? [0, -0.4] : P.look, squash: sq + (r.k >= 4 ? 0.04 * Math.sin(c * 20) : 0) }, r.k >= 4 ? 3 + brkK : r.k, r.mood)
    if (cfg.front) cfg.front(x, c, u)
  }

  async function build(stage) {
    try { await Promise.all(["800 96px Inter", "800 64px Inter", "800 38px Inter", "800 30px Inter", "italic 500 120px 'EB Garamond'", "italic 500 82px 'EB Garamond'", "700 34px 'EB Garamond'", "700 40px 'Space Mono'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const off = document.createElement('canvas'); off.width = 1080; off.height = 1920; const ox = off.getContext('2d')
    const last = buildLast(root, cfg.last, { accent: cfg.accent || GOLD })
    const bug = buildBug(root)
    // tape label + freeze stamp (DOM, crisp)
    const tape = el('div', { position: 'absolute', left: '50%', top: '620px', transform: 'translateX(-50%)', font: `700 40px ${MONO}`, letterSpacing: '0.08em', color: '#fff',
      background: 'rgba(10,8,22,0.82)', padding: '14px 26px', border: '4px solid #fff', display: 'none', whiteSpace: 'nowrap' }, root, `◀◀ ${cfg.label || '8 SECONDS EARLIER'}`)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

    return {
      start: 0, end: D + 0.01, root,
      update(t) {
        const cl = clock(t)
        // camera: tiny zoom punch on the scratch, shake on the break
        const dB = t - T.brk, shake = dB > 0 && dB < 0.5 ? 16 * Math.exp(-dB * 9) * Math.sin(dB * 60) : 0
        const zoom = cl.mode === 'freeze' ? 1 + 0.06 * ease.outBack(prog(t, T.freeze[0], T.freeze[0] + 0.12)) : cl.mode === 'rew' ? lerp(1.06, 1, prog(t, ...T.rew)) : 1
        x.save(); x.fillStyle = '#05040c'; x.fillRect(0, 0, 1080, 1920)
        x.translate(540, 960); x.scale(zoom, zoom); x.translate(-540 + shake, -960)
        world(x, t, cl)
        // loop-back: crossfade into the frame-0 world (continuous with t = 0)
        if (LOOP && t > D - LOOP) {
          const a = ease.inOutQuad(prog(t, D - LOOP, D))
          ox.clearRect(0, 0, 1080, 1920); world(ox, t, { c: t - D, u: END, mode: 'sob' })
          x.setTransform(1, 0, 0, 1, 0, 0); x.globalAlpha = a; x.drawImage(off, 0, 0); x.globalAlpha = 1
        }
        x.restore()
        // freeze: desaturate + red scribble frame; rewind: scan lines + blue tint
        if (cl.mode === 'freeze') {
          x.save(); x.strokeStyle = RED; x.lineWidth = 14; x.globalAlpha = 0.95
          const P = cfg.pis; x.beginPath()
          for (let i = 0; i <= 40; i++) { const a = (i / 40) * Math.PI * 2.15 - 0.6, rr = P.s * 0.78 + 10 * Math.sin(i * 1.7); const px = P.x + Math.cos(a) * rr * 1.05, py = P.y - P.s * 0.05 + Math.sin(a) * rr; i ? x.lineTo(px, py) : x.moveTo(px, py) }
          x.stroke(); x.restore()
        }
        if (cl.mode === 'rew') {
          x.save(); x.fillStyle = 'rgba(40,80,200,0.16)'; x.fillRect(0, 0, 1080, 1920)
          for (let yy = (t * 2400) % 60; yy < 1920; yy += 60) { x.fillStyle = 'rgba(255,255,255,0.08)'; x.fillRect(0, yy, 1080, 6) }
          const yb = (t * 3100) % 1920; x.fillStyle = 'rgba(255,255,255,0.18)'; x.fillRect(0, yb, 1080, 40); x.restore()
        }
        tape.style.display = cl.mode === 'rew' || (cl.mode === 'play' && t < T.play + 0.6) ? 'block' : 'none'
        tape.style.opacity = String(cl.mode === 'play' ? 1 - prog(t, T.play + 0.35, T.play + 0.6) : 1)
        // Pisces's line at the break
        if (cfg.line) {
          const L = cfg.line, out = LOOP ? outK(t, [D - LOOP - 0.05, D - 0.1]) : 1
          if (out > 0.01) bubble(x, t, L.x, L.y, T.brk + 0.05, D + 1, L.text, { size: L.size || 50, col: L.col || BONE, tail: L.tail ?? 0.3, k: out })
        }
        last.update(t, T.last, LOOP ? outK(t, [D - LOOP - 0.05, D - 0.08]) : 1)
        bug.update(t)
        drawGrain(gx, t)
      },
    }
  }

  const CUES = [
    // frame 0: the sob is already loud
    ['pluck', 0.02, 1174.66, 0.04, 0.5, 0.2], ['pluck', 0.14, 1567.98, 0.035, 0.5, -0.2], ['glitter', 0.0, 0.35],
    // record scratch → freeze (silence) → rewind
    ['tom', T.scratch, 70, { gain: 0.22, decay: 0.2 }],
    ['riser', T.rew[0], T.rew[1], 0.035], ['whoosh', T.rew[0] + 0.05, 0.35, 0.04],
    ['tick', T.play, 0.06], ['pop', T.play + 0.02, 880, 0.03, 0],
    // the break
    ['boom', T.brk, 0.22], ['pluck', T.brk + 0.02, 1318.51, 0.05, 0.6, 0], ['pluck', T.brk + 0.14, 1760, 0.04, 0.6, 0.2], ['glitter', T.brk, T.brk + 0.5],
    ['pop', T.last, 1174.66, 0.045, 0], ['bell', T.last + 0.05, 1760, 0.03, 1.0, 0],
    ...(cfg.cues ? cfg.cues(T) : []),
  ]
  const HOOK = { at: -1, text: cfg.hook, top: 250, size: 116, accentColor: cfg.accent || '#9fd8ff' }
  const WHIP = { at: -0.15, from: 1.5 }
  const REC = { at: T.freeze[0], len: T.freeze[1] - T.freeze[0], caption: 'wait. *what happened?*', top: 1560 }
  CUES.push(...whipZoomCues(WHIP), ...slamTitleCues(HOOK), ...recordScratchCues(REC), ...(cfg.loop ? loopCues({ duration: D, len: LOOP }) : []))
  return { DURATION: D, SCENES: [build, whipZoom(WHIP), slamTitle(HOOK), recordScratch(REC)], CUES, T }
}
