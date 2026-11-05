// sakit — the shared look of PLANET TALK: SATURN (batch p07, kpsae01–kpsae12). Imported read-only by every film in the
// series. Built on promo/films/planetkit.js (the Saturn character, the signs, speech bubbles, entrances) and
// promo/films/hookkit.js (whip zoom, record scratch, chapter stickers, loop helper). No end card, no card cut, no logo:
// DURATION is the story.
//
//   import { saFilm } from '../../kpsae01/sakit.js'
//   const F = saFilm({ ...cfg });  export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
//
// The format (every film):
//   t = 0     Saturn mid-arrival in a crazy way (cfg.arrive: a planetkit entrance, frame 0 mid-flight, speed lines), its
//             rings often detached and used as a tool (hurdle, gate, lasso, belt, wall: K.ring), the hook line on screen.
//   land      the landing is the pattern break: a white flash, a shockwave, a screen shake and a hookkit whip zoom.
//   story     cfg.paint(x, t, K) draws the world (camera shots via cfg.shots), cfg.over(x, t, K) screen-space overlays,
//             cfg.says the speech bubbles (planetkit speech; mouths flap / stars hop automatically), cfg.heads pop captions.
//   Pisces    Saturn's intern (K.intern: clipboard + INTERN badge); it cries on screen in every film.
//   ending    'loop': the last LOOP s cross-blend into exactly the frame-0 composition (seamless replay), the hook comes back;
//             'cut':  hard cut on the punchline (keep the last bubble/head ≥ 0.6 s on screen; nothing fades).
//
// cfg: { id, sign, dur, ending, hook, hookY?, hookSize?, hookOut?, arrive: { kind, at, x, y, size }, shots?, punch?,
//        shakes?, flashes?, freezes?, paint, over?, over0?, overTop?, says?, heads?, fx?: [{ f, c, o }], cues?, music,
//        loopLen? }
// Pure f(t). Nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../sky.js'
import { GRAIN_H, easeOutBack } from '../wheel.js'
import { popText } from '../lesson.js'
import { drawPlanet, drawSign, drawSpace, speech, speechCues, entrance, drawEntranceFx, entranceCues, entranceLand, PLANETS, aboveHorizon } from '../planetkit.js'
import { whipZoom, whipZoomCues, loopK, loopCues, freezeTime } from '../hookkit.js'
import { box, rect, rrect, txt, rich, phone, room, label, caught, loading } from '../kdwe01/dwkit.js'
export * as HK from '../hookkit.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#140c28', RED = '#ff3b4e', PINK = '#ff8fb1', CY = '#7fe3ff'
export const SAT = PLANETS.saturn.color, SAT_RIM = PLANETS.saturn.rim
export const INTER = "'Inter', system-ui, sans-serif", MONO = "'Space Mono', ui-monospace, monospace", SERIF = "'EB Garamond', Georgia, serif"
export const CPS = 30
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const inOut = (t, a, b, d = 0.3) => pop01(t, a, d) * outK(t, [b - 0.25, b])
const TAU = Math.PI * 2

// ═══════════════════════════════════════ Saturn's props
/** a detached Saturn ring (the running gag: Saturn uses its rings as tools). Centre (X, Y), radii rx / ry, rot radians.
 *  half: 'both' | 'back' | 'front' (to sandwich something inside the ring). */
export function ring(x, X, Y, rx, ry, { rot = 0, w = 0.2, alpha = 1, half = 'both', spin = 0, t = 0 } = {}) {
  if (alpha <= 0.01 || rx <= 1) return
  x.save(); x.globalAlpha *= alpha; x.translate(X, Y); x.rotate(rot)
  const a0 = half === 'front' ? 0 : Math.PI, a1 = half === 'back' ? TAU : half === 'front' ? Math.PI : Math.PI + TAU
  const W = rx * w
  x.lineCap = 'butt'
  x.strokeStyle = INK; x.lineWidth = W + 12
  x.beginPath(); x.ellipse(0, 0, rx, ry, 0, a0, a1); x.stroke()
  const bands = ['#c9a663', '#f6e2b0', '#e2c27e']
  bands.forEach((c, k) => {
    const s = 1 + (k - 1) * (W / 3) / rx
    x.strokeStyle = c; x.lineWidth = W / 3 + 1
    x.beginPath(); x.ellipse(0, 0, rx * s, ry * s, 0, a0, a1); x.stroke()
  })
  // a glint that travels round the ring (spin = speed)
  const g = (t * (spin || 0.6)) % 1 * TAU
  x.strokeStyle = 'rgba(255,255,255,0.75)'; x.lineWidth = W / 4
  x.beginPath(); x.ellipse(0, 0, rx, ry, 0, g, g + 0.35); x.stroke()
  x.restore()
}
/** Saturn's pocket watch (screen or world) */
export function watch(x, t, X, Y, s = 1, { pop = 1, time = null } = {}) {
  if (pop <= 0.01) return
  x.save(); x.translate(X, Y); x.scale(s * pop, s * pop)
  x.strokeStyle = INK; x.lineWidth = 10; x.beginPath(); x.moveTo(0, -70); x.quadraticCurveTo(30, -130, 80, -150); x.stroke()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 76, 0, TAU); x.fill()
  x.fillStyle = '#e2c27e'; x.beginPath(); x.arc(0, 0, 68, 0, TAU); x.fill()
  x.fillStyle = '#fffaf0'; x.beginPath(); x.arc(0, 0, 56, 0, TAU); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; x.fillRect(Math.cos(a) * 46 - 3, Math.sin(a) * 46 - 3, 6, 6) }
  const tt = time ?? t
  x.strokeStyle = INK; x.lineCap = 'round'
  x.lineWidth = 7; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(tt * 0.2 - 1.57) * 28, Math.sin(tt * 0.2 - 1.57) * 28); x.stroke()
  x.lineWidth = 4; x.strokeStyle = RED; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(tt * TAU / 4 - 1.57) * 44, Math.sin(tt * TAU / 4 - 1.57) * 44); x.stroke()
  x.restore()
}
/** a clipboard (Pisces the intern holds one; Saturn reads from one) */
export function clipboard(x, X, Y, s = 1, { rot = 0, lines = 4, ticks = 0, title = null, pop = 1 } = {}) {
  if (pop <= 0.01) return
  x.save(); x.translate(X, Y); x.rotate(rot); x.scale(s * pop, s * pop)
  box(x, -70, -90, 140, 180, '#b07a45', { o: 5 })
  rect(x, -58, -74, 116, 156, '#fffaf0')
  box(x, -30, -102, 60, 26, '#8a8a9a', { o: 4 })
  if (title) txt(x, title, 0, -54, { size: 16, color: INK })
  for (let i = 0; i < lines; i++) {
    const yy = -34 + i * 28
    rect(x, -24, yy - 3, 70, 6, '#c9bfd8')
    x.strokeStyle = i < ticks ? '#2aa86a' : INK; x.lineWidth = 4
    x.strokeRect(-48, yy - 9, 16, 16)
    if (i < ticks) { x.beginPath(); x.moveTo(-46, yy); x.lineTo(-41, yy + 5); x.lineTo(-33, yy - 8); x.stroke() }
  }
  x.restore()
}
/** a tissue (Saturn hands them out) */
export function tissue(x, X, Y, s = 1, { rot = 0, pop = 1 } = {}) {
  if (pop <= 0.01) return
  x.save(); x.translate(X, Y); x.rotate(rot); x.scale(s * pop, s * pop)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-44, 34); x.quadraticCurveTo(-60, -20, -20, -50); x.quadraticCurveTo(0, -30, 20, -54); x.quadraticCurveTo(62, -16, 44, 34); x.closePath(); x.fill()
  x.fillStyle = '#ffffff'; x.beginPath(); x.moveTo(-36, 28); x.quadraticCurveTo(-50, -16, -18, -40); x.quadraticCurveTo(0, -22, 18, -44); x.quadraticCurveTo(52, -12, 36, 28); x.closePath(); x.fill()
  x.restore()
}

// ═══════════════════════════════════════ the film
export function saFilm(cfg) {
  const D = cfg.dur, SIGN = cfg.sign, LOOP = cfg.ending === 'loop' ? (cfg.loopLen ?? 0.45) : 0
  const shots = cfg.shots || [{ at: 0, cam: [1, 540, 960] }]
  const FRZ = cfg.freezes || []   // record-scratch freeze windows [{ at, len }] (story time holds; hookkit freezeTime)
  const says = (cfg.says || []).map(s => ({ size: 44, maxW: 700, cps: CPS, ...s }))
  const ARR = { kind: 'drop', at: -0.3, x: 540, y: 700, size: 560, ...(cfg.arrive || {}) }
  const LAND = entranceLand(ARR.kind, ARR)
  const WHIP = { at: r3(Math.max(0.12, LAND + 0.02)), len: 0.42, from: 1.4, blur: 18, flash: 0.45 }
  const linesOf = who => says.filter(s => s.who === who).map(s => ({ t: s.t0, who, text: s.text }))
  // star hops while a sign talks (line start + roughly every 0.42 s of typing)
  const hopsOf = who => says.filter(s => s.who === who).flatMap(s => {
    const len = s.text.replace(/\*/g, '').length / (s.cps || CPS), out = []
    for (let h = s.t0 + 0.05; h < s.t0 + len; h += 0.42) out.push(r3(h))
    return out
  })
  const HOPS = {}, LINES = {}
  const hops = who => (HOPS[who] ??= hopsOf(who))
  const lines = who => (LINES[who] ??= linesOf(who))

  // ── characters with the series defaults
  /** Saturn. o: { x, y, size, mood, look, rings, rot, squash, tears, alpha, pop, hops } */
  const saturn = (x, t, o = {}) => drawPlanet(x, 'saturn', o.x ?? 540, o.y ?? 700, o.size ?? 520, t, { lines: lines('saturn'), cps: CPS, seed: 7, ...o })
  /** the arriving Saturn: entrance pose until it lands (pass the same o as saturn) */
  const arriving = (x, t, o = {}) => {
    const P = entrance(ARR.kind, t, ARR)
    const A = { ...ARR, ...(o.fx || {}) }
    if (t < LAND + 0.9) drawEntranceFx(x, 'saturn', ARR.kind, t, A)
    return saturn(x, t, { ...o, x: P.x, y: P.y, size: P.size, rot: (o.rot || 0) + P.rot, squash: (o.squash || 0) + P.squash, alpha: P.alpha })
  }
  const pose = t => entrance(ARR.kind, t, ARR)
  /** a sign's star. o: { x, y, s, mood, look, tears, squash, pop, alpha, rot, hops, sweat, shadow } */
  const sign = (x, t, id, o = {}) => {
    const { x: X = 540, y: Y = 1330, s = 300, rot = 0, ...rest } = o
    if (rot) { x.save(); x.translate(X, Y); x.rotate(rot); x.translate(-X, -Y) }
    const r = drawSign(x, id, X, Y, s, t, { hops: hops(id), seed: id.length * 3 + 1, ...rest })
    if (rot) x.restore()
    return r
  }
  /** ♓ Pisces, Saturn's intern: clipboard in its fin, a little INTERN badge, usually crying (tears 2–3). */
  const intern = (x, t, o = {}) => {
    const { x: X = 880, y: Y = 1420, s = 230, tears = 2, clip = true, badge = true, pop = 1, alpha = 1, ...rest } = o
    if (pop <= 0.01 || alpha <= 0.01) return
    x.save(); x.globalAlpha *= alpha
    const r = drawSign(x, 'pisces', X, Y, s, t, { mood: 'sparkle', look: [-1, -0.4], hops: hops('pisces'), seed: 6, glow: 0.85, tears, pop, glyph: false, ...rest })
    const k = pop
    if (clip) clipboard(x, X - s * 0.42 * k, Y + s * 0.14 * k, (s / 260) * k, { rot: -0.25 + 0.05 * Math.sin(t * 3), ticks: 2, lines: 3 })
    if (badge && k > 0.6) {
      x.save(); x.translate(X + s * 0.2, Y + s * 0.3); x.rotate(0.12); x.scale(s / 260, s / 260)
      box(x, -54, -17, 108, 34, '#fffaf0', { o: 4 }); txt(x, 'INTERN', 0, 1, { size: 20, color: INK })
      x.restore()
    }
    x.restore()
    return r
  }
  const K = {
    D, SIGN, LAND, ARR, saturn, arriving, pose, sign, intern, ring, watch, clipboard, tissue,
    room, box, rect, rrect, txt, rich, phone, label, caught, loading, drawSpace, aboveHorizon, drawPlanet, drawSign,
    pop01, outK, inOut, GOLD, BONE, INK, RED, PINK, CY, SAT, SAT_RIM, MONO, INTER, SERIF,
  }

  // ── camera
  const shotAt = t => { let s = shots[0]; for (const sh of shots) if (t >= sh.at) s = sh; return s }
  function camOf(t) {
    const i = shots.indexOf(shotAt(t)), sh = shots[i]
    let [z, cx, cy] = typeof sh.cam === 'function' ? sh.cam(t) : sh.cam
    const nxt = shots[i + 1]
    z *= 1 + (sh.push ?? 0.03) * prog(t, sh.at, nxt ? nxt.at : D)
    let blur = 0
    if (i > 0 && sh.whip !== false) {
      const p = prog(t, sh.at, sh.at + 0.22)
      if (p < 1) {
        const pv = shots[i - 1]; const [pz, px, py] = typeof pv.cam === 'function' ? pv.cam(sh.at) : pv.cam
        const e = ease.outCubic(p); z = lerp(pz, z, e); cx = lerp(px, cx, e); cy = lerp(py, cy, e); blur = 12 * (1 - p)
      }
    }
    for (const p of cfg.punch || []) {
      const k = ease.outCubic(prog(t, p.at, p.at + 0.14)) * (1 - ease.inOutQuad(prog(t, p.at + p.dur - 0.25, p.at + p.dur)))
      if (k <= 0) continue
      z *= 1 + p.z * k; cx = lerp(cx, p.x, k); cy = lerp(cy, p.y, k)
      blur = Math.max(blur, 7 * (1 - prog(t, p.at, p.at + 0.12)))
    }
    return { z, cx, cy, blur }
  }
  const SHAKES = [LAND, ...(cfg.shakes || [])]
  const shakeAt = t => Math.max(0, ...SHAKES.map(s => { const d = t - s; return d > 0 && d < 0.5 ? 22 * Math.exp(-d * 8) : 0 }))

  // ── the hook line (canvas): fully landed at frame 0, slams again into the loop seam
  const hookOut = cfg.hookOut ?? 2.3
  function hookAlpha(T) {
    const a = T < hookOut ? 1 - ease.inQuad(prog(T, hookOut - 0.25, hookOut)) : 0
    return Math.max(a, LOOP ? ease.outCubic(prog(T, D - LOOP, D - LOOP * 0.35)) : 0)
  }
  function drawHook(x, T, k) {
    if (k <= 0.01) return
    const land = Math.abs(T - LAND) < 0.3 ? 1 + 0.07 * Math.sin((T - LAND) * 60) * (1 - Math.abs(T - LAND) / 0.3) : 1
    x.save(); x.translate(540, cfg.hookY ?? 300); x.scale(land, land); x.rotate(-0.03)
    rich(x, cfg.hook, 0, 0, { size: cfg.hookSize ?? 100, accent: GOLD, alpha: k, lw: 18 })
    x.restore()
  }

  async function build(stage) {
    try { await Promise.all(['900 96px Inter', '800 44px Inter', '800 28px Inter', "italic 600 120px 'EB Garamond'", "italic 600 50px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "700 22px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const off = document.createElement('canvas'); off.width = 1080; off.height = 1920; const ox = off.getContext('2d')
    const top = layerCanvas(root), tx = top.getContext('2d')
    const heads = (cfg.heads || []).map(h => ({ h, P: popText(root, h.text.replace(/\s*\|\s*/g, ' | '), { top: h.top ?? 250, size: h.size ?? 88, accentSize: h.accentSize ?? Math.round((h.size ?? 88) * 1.3), at: h.at, gap: h.gap ?? 0.07, wobble: h.wobble ?? true, accentColor: h.accent || GOLD, fit: true }) }))
    const hk = layerCanvas(root), hx = hk.getContext('2d')
    const bug = buildBug(root)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff', opacity: 0, pointerEvents: 'none' }, root)
    const scene = (c, t) => {
      const { z, cx, cy } = camOf(t)
      c.save(); c.translate(540, 960); c.scale(z, z); c.translate(-cx, -cy)
      cfg.paint(c, t, K)
      c.restore()
    }
    const screen = (c, t) => {
      if (cfg.over) cfg.over(c, t, K)
      for (const s of says) speech(c, t, s)
      if (cfg.overTop) cfg.overTop(c, t, K)
    }
    return {
      start: 0, end: D + 0.01, root,
      update(T) {
        const t = FRZ.length ? freezeTime(T, FRZ) : T, lk = LOOP ? loopK(T, D, LOOP) : 0
        const sh = shakeAt(t), sx = Math.sin(t * 71) * sh, sy = Math.cos(t * 59) * sh * 0.7
        ox.setTransform(1, 0, 0, 1, 0, 0); ox.clearRect(0, 0, 1080, 1920)
        scene(ox, t)
        if (lk > 0) { ox.save(); ox.globalAlpha = lk; scene(ox, 0); ox.restore() }
        const { blur } = camOf(t)
        x.save(); x.fillStyle = '#05040c'; x.fillRect(0, 0, 1080, 1920)
        x.translate(sx, sy)
        x.filter = blur > 0.5 && lk < 0.5 ? `blur(${blur.toFixed(1)}px)` : 'none'
        x.drawImage(off, 0, 0); x.filter = 'none'
        x.restore()
        tx.clearRect(0, 0, 1080, 1920)
        tx.save(); tx.globalAlpha = 1 - lk; tx.translate(sx, sy); screen(tx, t); tx.restore()
        if (lk > 0 && cfg.over0) { tx.save(); tx.globalAlpha = lk; cfg.over0(tx, 0, K); tx.restore() }
        hx.clearRect(0, 0, 1080, 1920)
        drawHook(hx, T, hookAlpha(T))
        for (const { h, P } of heads) P.update(t, h.out ? outK(t, h.out) : 1)
        bug.update(1)
        const fls = [LAND, ...(cfg.flashes || [])]
        const f = Math.max(0, ...fls.map(c => (t >= c && t < c + 0.12) ? 1 - (t - c) / 0.12 : 0))
        flash.style.opacity = String(0.65 * f)
        drawGrain(gx, T)
      },
    }
  }

  // ── sound
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const wordPops = (t0, n, gap, b0 = 0, gain = 0.022) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(b0 + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const CUES = [
    ['tick', 0, 0.08], ['whoosh', 0.0, 0.25, 0.05],
    ...entranceCues(ARR.kind, ARR), ['boom', r3(LAND), 0.08], ['pop', r3(LAND + 0.02), 196, 0.06, 0],
    ...whipZoomCues(WHIP),
    ...(cfg.fx || []).flatMap(e => e.c ? e.c(e.o) : []),
    ...shots.filter(s => s.at > 1).flatMap(s => [['whoosh', r3(s.at - 0.04), 0.22, 0.035], ['tick', r3(s.at), 0.03]]),
    ...(cfg.punch || []).flatMap(p => [['whoosh', r3(p.at - 0.03), 0.16, 0.028], ['pop', r3(p.at + 0.04), 1318.51, 0.03, 0]]),
    ...(cfg.heads || []).filter(h => h.at > 0).flatMap((h, i) => wordPops(h.at, Math.max(1, h.text.replace(/\|/g, ' ').split(/\s+/).filter(Boolean).length), h.gap ?? 0.07, i)),
    ...speechCues(says, { cps: CPS }),
    ...(cfg.shakes || []).map(s => ['boom', r3(s), 0.06]),
    ...(LOOP ? loopCues({ duration: D, len: LOOP }) : []),
    ...(cfg.cues || []),
  ].filter(c => c[1] >= 0 && c[1] < D)
  const MUSIC = { ...cfg.music, sections: { drop: r3(LAND), ...(cfg.music.sections || {}), outroAt: cfg.music.sections?.outroAt ?? Math.max(1.5, D - 1.6) } }
  return { DURATION: D, SCENES: [build, whipZoom(WHIP), ...(cfg.fx || []).map(e => e.f(e.o))], CUES, MUSIC, K, LAND }
}

// ═══════════════════════════════════════ the series bug
function buildBug(root) {
  const b = el('div', { position: 'absolute', left: '56px', top: '64px', display: 'flex', alignItems: 'center', gap: '14px', pointerEvents: 'none' }, root)
  el('div', { font: `800 30px ${SERIF}`, color: SAT, textShadow: '0 2px 12px rgba(6,4,18,0.95)' }, b, '♄︎')
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: '#f6e2b0', textShadow: '0 2px 12px rgba(6,4,18,0.95)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, 'PLANET&nbsp;TALK&nbsp;·&nbsp;SATURN')
  return { update(o = 1) { b.style.opacity = String(o) } }
}
