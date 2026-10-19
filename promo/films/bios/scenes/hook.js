// bios · HOOK (0–3.7): generic bios type over each other from frame 0, then all slide into the centre and blur into
// one smear that resolves into "Everyone sounds the same." (readable 1.42 → 3.30), framed by corner ticks over a faint
// wall of the same lines. Out: the line dims, the ticks converge to one point of light that blooms into colour (3.30–3.9).
import { clamp, lerp, prog, ease, el, C } from '../../../src/lib.js'
import { W, H, SANS, MONO, fill, makeTicks } from './kit.js'

// [text, centre x, centre y, font px, typing start]
const BIOS = [
  ["6'1 if that matters", 560, 300, 54, -0.55],
  ['fluent in sarcasm', 1350, 410, 50, -0.3],
  ['just here for a good time', 930, 650, 58, -0.08],
  ['love to travel', 1470, 770, 54, 0.1],
  ['looking for my partner in crime', 560, 840, 42, 0.22],
  ['work hard, play hard', 1230, 200, 44, 0.32],
  ['here for the vibes', 420, 560, 46, 0.42],
  ["pineapple on pizza? let's talk", 1500, 570, 40, 0.5],
  ['no drama please', 1000, 430, 48, 0.6],
]
const PER = 0.038
const CONV = [0.94, 1.3]            // bios slide into the centre and smear
const LINE = 'Everyone sounds the same.'
const L_IN = [1.1, 1.42], L_OUT = 3.3
const WALL = ["6'1 if that matters", 'fluent in sarcasm', 'love to travel', 'just here for a good time', 'work hard, play hard', 'here for the vibes', 'partner in crime', 'no drama please', 'dog person', 'love to laugh']
const WALL_Y = [148, 236, 324, 412, 668, 756, 844, 932]
export const T_BLOOM = 3.5

export default async function build(stage) {
  const root = fill(stage, { background: 'transparent' })
  // faint wall of sameness (behind everything)
  const wall = el('div', { position: 'absolute', inset: 0, opacity: 0 }, root)
  const rows = WALL_Y.map((y, i) => {
    const words = [...WALL.slice(i % WALL.length), ...WALL.slice(0, i % WALL.length)]
    const txt = [...words, ...words].join('   ·   ')
    return { e: el('div', { position: 'absolute', left: '0', top: (y - 20) + 'px', whiteSpace: 'nowrap', fontFamily: SANS, fontWeight: 300, fontSize: '34px', color: 'rgba(239,230,214,0.15)', letterSpacing: '-0.005em' }, wall, txt), dir: i % 2 ? 1 : -1, off: -((i * 397) % 900) }
  })
  // bio cards: generic "about me" blocks (no app branding)
  const cards = BIOS.map(([txt, x, y, fs, t0], i) => {
    const c = el('div', { position: 'absolute', left: '0', top: '0', padding: `${Math.round(fs * 0.36)}px ${Math.round(fs * 0.55)}px ${Math.round(fs * 0.42)}px`, borderRadius: Math.round(fs * 0.42) + 'px',
      background: 'rgba(28,20,48,0.78)', boxShadow: '0 0 0 1px rgba(239,230,214,0.13), 0 20px 50px rgba(4,2,14,0.35)', opacity: 0, whiteSpace: 'nowrap', willChange: 'transform, filter' }, root)
    el('div', { fontFamily: MONO, fontSize: Math.round(fs * 0.3) + 'px', letterSpacing: '0.3em', color: 'rgba(239,230,214,0.5)', marginBottom: Math.round(fs * 0.14) + 'px' }, c, 'ABOUT ME')
    const line = el('div', { fontFamily: SANS, fontWeight: 400, fontSize: fs + 'px', color: C.bone, letterSpacing: '-0.01em', lineHeight: 1.1, position: 'relative' }, c)
    const chars = [...txt].map(ch => el('span', { visibility: 'hidden' }, line, ch === ' ' ? ' ' : ch))
    const caret = el('span', { position: 'absolute', top: '0.08em', width: '3px', height: '0.95em', background: C.bone, opacity: 0 }, line)
    return { c, chars, caret, x, y, fs, t0, n: chars.length, w: 0, h: 0, i }
  })
  // the hook line
  const lineBox = el('div', { position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', fontFamily: SANS, fontWeight: 500, fontSize: '88px', color: C.bone, whiteSpace: 'nowrap', letterSpacing: '-0.02em', opacity: 0,
    textShadow: '0 2px 24px rgba(8,4,24,0.75), 0 0 3px rgba(8,4,24,0.5)' }, root, LINE)
  const scrim = el('div', { position: 'absolute', left: (W / 2 - 900) + 'px', top: (H / 2 - 230) + 'px', width: '1800px', height: '460px', borderRadius: '50%', opacity: 0,
    background: 'radial-gradient(closest-side, rgba(11,6,32,0.62), rgba(11,6,32,0.4) 50%, rgba(11,6,32,0) 100%)' }, root)
  root.insertBefore(scrim, lineBox)
  const ticks = makeTicks(root, C.bone, 18)
  let lw = 0
  const measure = () => {
    cards.forEach(k => { k.w = k.c.offsetWidth; k.h = k.c.offsetHeight })
    lw = lineBox.offsetWidth
  }
  return {
    start: 0, end: 3.95, root,
    update(t) {
      if (!lw) measure()
      // bios
      const cv = ease.inOutCubic(prog(t, CONV[0], CONV[1]))
      cards.forEach(k => {
        const lt = t - k.t0
        const n = Math.max(0, Math.min(k.n, Math.floor(lt / PER)))
        k.chars.forEach((s, j) => { s.style.visibility = j < n ? 'visible' : 'hidden' })
        const last = n > 0 ? k.chars[n - 1] : null
        k.caret.style.left = (last ? last.offsetLeft + last.offsetWidth + 3 : 0) + 'px'
        const blink = n < k.n ? 1 : (Math.floor(FIq(t) / 8) % 2 ? 0 : 1)
        k.caret.style.opacity = String(blink * (1 - cv))
        const appear = k.t0 < 0 ? 1 : ease.outQuad(prog(t, k.t0 - 0.08, k.t0 + 0.04))
        // converge: slide to the centre, blur, lose the card
        const delay = (k.i % 4) * 0.025
        const c2 = ease.inOutCubic(prog(t, CONV[0] + delay, CONV[1] + delay * 0.5))
        const cx = lerp(k.x, W / 2, c2), cy = lerp(k.y, H / 2, c2)
        const sc = lerp(lerp(0.97, 1, appear), 1.18, c2)
        k.c.style.transform = `translate(${(cx - k.w / 2).toFixed(1)}px, ${(cy - k.h / 2).toFixed(1)}px) scale(${sc.toFixed(4)})`
        k.c.style.filter = c2 > 0.001 ? `blur(${(c2 * 16).toFixed(2)}px)` : 'none'
        k.c.style.opacity = String(appear * lerp(1, 0.55, c2) * (1 - ease.inQuad(prog(t, 1.2, 1.46))))
      })
      // line resolves out of the smear
      const li = ease.outCubic(prog(t, L_IN[0], L_IN[1]))
      const lo = ease.inOutQuad(prog(t, L_OUT, L_OUT + 0.2))
      lineBox.style.opacity = String(Math.min(li, 1 - lo))
      lineBox.style.filter = `blur(${(lerp(16, 0, li) + 8 * lo).toFixed(2)}px)`
      lineBox.style.transform = `translate(-50%,-50%) scale(${(lerp(1.06, 1, li) * lerp(1, 0.96, lo) * (1 + 0.025 * ease.inOutQuad(prog(t, L_IN[1], L_OUT)))).toFixed(4)})`
      lineBox.style.letterSpacing = lerp(0.04, -0.02, li) + 'em'
      scrim.style.opacity = String(Math.min(ease.inOutQuad(prog(t, 1.0, 1.5)), 1 - lo))
      // wall of sameness
      wall.style.opacity = String(ease.inOutQuad(prog(t, 1.3, 1.9)) * (1 - ease.inOutQuad(prog(t, L_OUT - 0.05, L_OUT + 0.25))))
      rows.forEach(r => { r.e.style.transform = `translateX(${(r.off + r.dir * (t - 1.3) * 34).toFixed(1)}px)` })
      // ticks
      ticks.update(t, (q) => {
        const g = ease.spring(prog(q, 1.28, 1.9), 0.1)
        const conv = ease.inOutCubic(prog(q, L_OUT, L_OUT + 0.24))
        const bw = lw * lerp(1.02, 1.16, g) + 80, bh = lerp(120, 250, g)
        return { cx: W / 2, cy: H / 2, w: lerp(bw, 0, conv), h: lerp(bh, 0, conv), op: ease.outCubic(prog(q, 1.28, 1.5)) * (1 - prog(q, L_OUT + 0.2, L_OUT + 0.27)) }
      })
    },
    // point of light where the ticks met; it swells and blooms as the colour floods in
    fxStart: L_OUT + 0.15, fxEnd: 3.95,
    fx(ctx, t) {
      const a = ease.outCubic(prog(t, L_OUT + 0.18, T_BLOOM)) * (1 - ease.inQuad(prog(t, T_BLOOM + 0.08, 3.92)))
      if (a <= 0.003) return
      const r = lerp(4, 260, ease.outCubic(prog(t, T_BLOOM - 0.05, 3.92)))
      const g = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, r)
      g.addColorStop(0, `rgba(255,246,234,${0.95 * a})`); g.addColorStop(0.12, `rgba(255,190,214,${0.6 * a})`); g.addColorStop(0.5, `rgba(232,98,138,${0.18 * a})`); g.addColorStop(1, 'rgba(232,98,138,0)')
      ctx.fillStyle = g; ctx.fillRect(W / 2 - r, H / 2 - r, r * 2, r * 2)
    },
  }
}
const FIq = (t) => Math.round(t * 30)

export const cues = [
  ...BIOS.flatMap(([txt, , , , t0]) => [...txt].map((ch, j) => (ch === ' ' || t0 + j * PER < 0 || j % 2) ? null : ['tick', t0 + j * PER, 0.012]).filter(Boolean)),
  ['whoosh', CONV[0], 0.45, 0.07],                 // all bios collapse into one
  ['bell', L_IN[1] - 0.04, 220, 0.04, 2.0, 0],     // the line lands (cold A3)
  ['whoosh', L_OUT, 0.3, 0.05],                    // ticks converge
  ['glitter', T_BLOOM - 0.05, T_BLOOM + 0.6],      // the bloom
  ['bell', T_BLOOM, 880, 0.035, 2.2, 0],
]
