// UNRATIONED · 1 · HOOK (0–4.6): generic paywall tiers flicker at you over a cold, desaturated sky.
//   0.00        tiles already on screen; "Paying to be seen?" (Inter 500, 112px) types 0.04 → fully read ≈0.70
//   0.10–0.30   corner ticks frame the line (film-1 device)
//   0–4.25      tiles flicker in and out, 9 phone-readable tiles (≥30px type), each easing 1 → 1.03; the centre stays clear
//   4.25        the turn: every live tile dissolves into pixel stars that drift up and out (fx), line out 4.28–4.55
// All UI is generic: no app names, no real prices (only "$" signs), silver buttons, padlocks.
import { clamp, lerp, prog, ease, tw, rng, el, mix, C } from '../../../src/lib.js'
import { W, H, SANS, MONO, PEOPLE, fill, img } from '../../../src/scenes/common.js'
import { FI, pixStar, STAR_COLS, typed } from './kit.js'

export const T_TURN = 4.25
const T_TYPE = -0.2, PER = 0.026, FADE = 0.17
const LINE = 'Paying to be seen?'
const T_LOUT = 4.28

const UI = { bg: 'rgba(20,22,36,0.88)', bd: 'rgba(205,212,240,0.22)', fg: '#e8eaf2', fg2: '#9ba1b8', btn: 'linear-gradient(180deg,#f3f4f8,#c3c7d4)', btnFg: '#14162a' }
const LOCK = (s = 22, c = 'currentColor') => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" style="display:block"><rect x="4.5" y="10.5" width="15" height="10.5" rx="2.4" fill="${c}"/><path d="M8 10.5V7.4a4 4 0 0 1 8 0v3.1" fill="none" stroke="${c}" stroke-width="2.2"/></svg>`

// [kind, cx, cy, t0, t1, scale, extra] — 9 tiles at phone-readable size (≥30px type); centre box x 320–1600, y 405–675 stays clear
const SPEC = [
  ['likes', 330, 200, -0.6, 2.4, 1.0],
  ['pill', 1480, 142, -0.4, 2.0, 1.0, { label: 'SUPER LIKE ×0 LEFT', chip: '$' }],
  ['tiers', 1600, 870, 0.3, 1.9, 1.0],
  ['pill', 260, 900, 0.7, 2.6, 1.0, { label: 'BOOST', chip: '$', up: true }],
  ['pill', 940, 960, 2.05, T_TURN, 1.0, { label: 'UNLOCK EVERYONE', chip: '$$$' }],
  ['timer', 1560, 255, 2.15, T_TURN, 1.0],
  ['pill', 700, 110, 2.6, T_TURN, 1.0, { label: 'SEE WHO VIEWED YOU', chip: '$' }],
  ['pill', 290, 900, 2.8, T_TURN, 1.0, { label: 'REWIND', chip: '$' }],
  ['pill', 1540, 790, 3.05, T_TURN, 1.0, { label: 'PRIORITY LIKES', chip: '$' }],
]
const SIZE = { likes: [600, 330], tiers: [570, 360], timer: [560, 264], pill: [0, 104] }
const pillW = (x) => Math.round(31.6 * x.label.length + 230 + (x.chip.length - 1) * 22)

function card(parent, w, h) {
  return el('div', { position: 'absolute', left: 0, top: 0, width: w + 'px', height: h + 'px', boxSizing: 'border-box', borderRadius: '34px', background: UI.bg, border: `1.5px solid ${UI.bd}`,
    boxShadow: '0 40px 80px rgba(2,2,10,0.55), 0 0 0 1px rgba(0,0,0,0.3)', color: UI.fg, fontFamily: SANS, overflow: 'hidden', willChange: 'transform, opacity' }, parent)
}
const btn = (parent, txt, extra = {}) => el('div', { position: 'absolute', left: '28px', right: '28px', bottom: '26px', height: '72px', borderRadius: '36px', background: UI.btn, color: UI.btnFg,
  fontFamily: SANS, fontWeight: 600, fontSize: '30px', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', ...extra }, parent, txt)
const HEAD = (c, txt, col = UI.fg) => el('div', { position: 'absolute', left: '32px', top: '26px', fontFamily: MONO, fontSize: '30px', lineHeight: 1, letterSpacing: '0.1em', color: col }, c, txt)

function buildTile(parent, [kind, , , , , , x = {}], k) {
  if (kind === 'likes') {
    const [w, h] = SIZE.likes, c = card(parent, w, h)
    HEAD(c, 'SEE WHO LIKED YOU')
    for (let i = 0; i < 4; i++) {
      const d = el('div', { position: 'absolute', left: (40 + i * 136) + 'px', top: '82px', width: '112px', height: '112px', borderRadius: '50%', overflow: 'hidden', background: '#333' }, c)
      img(d, PEOPLE[(k * 5 + i * 3) % 12], { left: '-14px', top: '-14px', width: '140px', height: '140px', objectFit: 'cover', filter: 'blur(12px) saturate(0.5) brightness(0.85)' })
    }
    el('div', { position: 'absolute', left: (w / 2 - 40) + 'px', top: '98px', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(20,22,36,0.85)', color: UI.fg, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 1.5px rgba(205,212,240,0.35)' }, c, LOCK(38))
    btn(c, `${LOCK(28, UI.btnFg)}<span>UNLOCK · $</span>`)
    return { e: c, w, h }
  }
  if (kind === 'tiers') {
    const [w, h] = SIZE.tiers, c = card(parent, w, h)
    HEAD(c, 'UPGRADE TO BE SEEN')
    const rows = [['STANDARD', '$'], ['PLUS', '$$'], ['PREMIUM', '$$$']]
    rows.forEach(([n, p], i) => {
      const hot = i === 1
      const r = el('div', { position: 'absolute', left: '28px', right: '28px', top: (78 + i * 58) + 'px', height: '50px', borderRadius: '14px', boxSizing: 'border-box',
        border: `1.5px solid ${hot ? 'rgba(235,238,250,0.75)' : 'rgba(205,212,240,0.2)'}`, background: hot ? 'rgba(235,238,250,0.1)' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', fontSize: '32px', fontWeight: 600, letterSpacing: '0.04em', color: hot ? UI.fg : UI.fg2 }, c)
      el('span', {}, r, n); el('span', { fontFamily: MONO, fontWeight: 400 }, r, p)
    })
    btn(c, 'CONTINUE')
    return { e: c, w, h }
  }
  if (kind === 'timer') {
    const [w, h] = SIZE.timer, c = card(parent, w, h)
    HEAD(c, 'OUT OF LIKES', UI.fg2)
    const clock = el('div', { position: 'absolute', left: '30px', top: '64px', fontFamily: SANS, fontWeight: 500, fontSize: '80px', lineHeight: 1.05, letterSpacing: '0.01em', color: UI.fg, fontVariantNumeric: 'tabular-nums' }, c, '11:59:59')
    btn(c, `<span>GET MORE NOW · $</span>`)
    return { e: c, w, h, clock }
  }
  // pill
  const p = el('div', { position: 'absolute', left: 0, top: 0, height: SIZE.pill[1] + 'px', boxSizing: 'border-box', borderRadius: '52px', background: UI.bg, border: `1.5px solid ${UI.bd}`,
    boxShadow: '0 30px 60px rgba(2,2,10,0.5)', color: x.dim ? UI.fg2 : UI.fg, fontFamily: SANS, fontWeight: 600, fontSize: '36px', letterSpacing: '0.06em', whiteSpace: 'nowrap',
    display: 'flex', alignItems: 'center', gap: '18px', padding: '0 12px 0 34px', willChange: 'transform, opacity' }, parent)
  el('div', {}, p, x.up ? `<svg width="36" height="36" viewBox="0 0 24 24" style="display:block"><path d="M12 4l7 8h-4.5v8h-5v-8H5z" fill="currentColor"/></svg>` : LOCK(36))
  el('span', {}, p, x.label)
  el('span', { marginLeft: '6px', minWidth: '80px', height: '80px', borderRadius: '40px', padding: '0 20px', boxSizing: 'border-box', background: UI.btn, color: UI.btnFg, fontFamily: MONO, fontWeight: 400, fontSize: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }, p, x.chip)
  return { e: p, w: pillW(x), h: SIZE.pill[1], pill: true }
}

// flicker on entry: frame pattern of opacities (5 frames) then solid
const FLICK_IN = [0.85, 0.15, 1, 0.45, 1]
const FLICK_OUT = [0.6, 1, 0.25, 0.5, 0]

let TILE_STATE = []   // read by the fx drawer (rects of the live tiles at the turn)

export default async function build(stage) {
  const root = fill(stage, { background: 'transparent' })
  const world = fill(root, { background: 'transparent', transformOrigin: '50% 50%' })
  const tiles = SPEC.map((s, k) => ({ s, ...buildTile(world, s, k) }))
  // measure pill widths once the DOM is laid out (fonts loaded by then in seek) — use a fixed estimate per label

  // centre pocket + line + ticks
  const pocket = el('div', { position: 'absolute', left: (W / 2 - 860) + 'px', top: (H / 2 - 280) + 'px', width: '1720px', height: '560px', borderRadius: '50%',
    background: 'radial-gradient(closest-side, rgba(8,8,20,0.78), rgba(8,8,20,0.5) 50%, rgba(8,8,20,0) 100%)' }, root)
  const L = typed(root, LINE, { fontFamily: SANS, fontWeight: 500, fontSize: '112px', lineHeight: '1', letterSpacing: '-0.01em', textShadow: '0 0 30px rgba(6,6,18,0.9), 0 2px 8px rgba(6,6,18,0.7)' })
  L.box.style.top = (H / 2 - 60) + 'px'
  const BOXW = 1220, BOXH = 250, TK = 14
  const ticks = [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sy]) => el('div', { position: 'absolute', width: TK + 'px', height: TK + 'px', background: C.bone, opacity: 0,
    left: (W / 2 + sx * BOXW / 2 - TK / 2) + 'px', top: (H / 2 + sy * BOXH / 2 - TK / 2) + 'px', boxShadow: '0 0 10px rgba(239,230,214,0.35)' }, root))
  const ACC = ['#c9cde0', '#9ba1b8', '#e8eaf2']

  return {
    start: 0, end: 4.62, root,
    update(t) {
      const fi = FI(t)
      world.style.transform = `scale(${1})`
      TILE_STATE = []
      tiles.forEach((T, k) => {
        const [kind, cx, cy, t0, t1, sc] = T.s
        const f0 = FI(t0), f1 = FI(t1)
        let op = 0
        if (fi >= f0 && fi < f0 + FLICK_IN.length) op = FLICK_IN[fi - f0]
        else if (fi >= f0 + FLICK_IN.length && fi < f1) op = 1
        if (t1 < T_TURN - 0.01) { if (fi >= f1 && fi < f1 + FLICK_OUT.length) op = FLICK_OUT[fi - f1] }
        else if (t >= T_TURN) op = 1 - ease.outQuad(prog(t, T_TURN, T_TURN + 0.22))
        if (fi < f0) op = 0
        T.e.style.display = op > 0.003 ? 'block' : 'none'
        if (T.pill) T.e.style.display = op > 0.003 ? 'flex' : 'none'
        if (op <= 0.003) return
        if (T.pill && !T.measured && T.e.offsetWidth > 0) { T.w = T.e.offsetWidth; T.measured = true }
        const life = prog(t, t0, t1)
        const pop = ease.outCubic(prog(t, t0, t0 + 0.16))
        const s = sc * lerp(0.9, 1, pop) * lerp(1, 1.03, life) * (t >= T_TURN ? lerp(1, 1.08, prog(t, T_TURN, T_TURN + 0.22)) : 1)
        const jx = fi - f0 < 3 ? (k % 2 ? 6 : -6) : 0
        T.e.style.opacity = String(op)
        T.e.style.transform = `translate(${cx - T.w / 2 + jx}px, ${cy - T.h / 2}px) scale(${s})`
        T.e.style.filter = t >= T_TURN ? `blur(${6 * prog(t, T_TURN, T_TURN + 0.22)}px) brightness(${1 + 0.8 * prog(t, T_TURN, T_TURN + 0.1)})` : 'none'
        if (T.clock) { const left = 43199 - Math.floor((t - t0) * 1) - (k * 37) % 50; const h = Math.floor(left / 3600), m = Math.floor(left / 60) % 60, sxx = left % 60; T.clock.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sxx).padStart(2, '0')}` }
      })
      // line
      const out = ease.inOutQuad(prog(t, T_LOUT, T_LOUT + 0.27))
      L.chars.forEach((s, i) => {
        const p = prog(t, T_TYPE + i * PER, T_TYPE + i * PER + FADE)
        s.style.opacity = String(ease.outQuad(p) * (1 - out))
        s.style.color = p >= 1 ? C.bone : mix(ACC[i % 3], C.bone, ease.inQuad(p))
      })
      L.line.style.filter = out > 0 ? `blur(${8 * out}px)` : 'none'
      L.box.style.transform = `translateY(${-10 * out}px)`
      pocket.style.opacity = String(1 - out)
      const tk = ease.outCubic(prog(t, 0.1, 0.3)) * (1 - out)
      ticks.forEach((d, i) => { d.style.opacity = String(tk); d.style.transform = `translate(${[-1, 1, -1, 1][i] * 18 * (1 - ease.outCubic(prog(t, 0.1, 0.4)))}px, 0)` })
    },
  }
}

// ── the turn: each tile live at T_TURN breaks into pixel stars that drift up and out
const LIVE = SPEC.map((s, k) => ({ s, k })).filter(({ s }) => s[3] < T_TURN && s[4] >= T_TURN - 0.01)
const PARTS = (() => {
  const r = rng(717), out = []
  for (const { s, k } of LIVE) {
    const [kind, cx, cy, , , sc] = s
    const w = (kind === 'pill' ? pillW(s[6]) : SIZE[kind][0]) * sc * 1.03, h = SIZE[kind][1] * sc * 1.03
    const X = W / 2 + (cx - W / 2) * 1.0, Y = H / 2 + (cy - H / 2) * 1.0
    const n = Math.round(w * h / 2600)
    for (let i = 0; i < n; i++) {
      const x = X + (r() - 0.5) * w, y = Y + (r() - 0.5) * h
      const dx = x - W / 2, dy = y - H / 2, d = Math.hypot(dx, dy) || 1
      const sp = 40 + r() * 170
      out.push({ x, y, vx: dx / d * sp + (r() - 0.5) * 60, vy: dy / d * sp * 0.6 - 60 - r() * 120, life: 0.55 + r() * 0.75, d0: r() * 0.12,
        u: r() < 0.25 ? 4 : r() < 0.6 ? 3 : 2, col: STAR_COLS[Math.floor(r() * STAR_COLS.length)], arms: r() < 0.3, tw: r() * 6.28 })
    }
  }
  return out
})()
export function drawHookFx(ctx, t) {
  if (t < T_TURN || t > T_TURN + 1.5) return
  for (const p of PARTS) {
    const lt = t - T_TURN - p.d0
    if (lt < 0 || lt > p.life) continue
    const k = lt / p.life
    const drag = (1 - Math.exp(-2.2 * lt)) / 2.2
    const a = (k < 0.15 ? k / 0.15 : 1 - ease.inQuad((k - 0.15) / 0.85)) * (0.75 + 0.25 * Math.sin(lt * 18 + p.tw))
    pixStar(ctx, p.x + p.vx * drag, p.y + p.vy * drag, p.u, p.col, a, p.arms)
  }
}

export const cues = (() => {
  const out = []
  for (const s of SPEC) if (s[3] > 0.05) out.push(['tick', s[3], 0.07 + 0.03 * clamp((s[3] - 2) / 2)])
  ;[...LINE].forEach((ch, i) => ch !== ' ' && T_TYPE + i * PER >= 0 && out.push(['tick', T_TYPE + i * PER, 0.02]))
  out.push(['boom', 0.0, 0.22], ['riser', 2.9, T_TURN, 0.07], ['whoosh', T_TURN - 0.05, 0.6, 0.16], ['glitter', T_TURN, T_TURN + 0.9], ['bell', T_TURN + 0.02, 880, 0.04, 2.2, 0])
  return out
})()
