import { clamp, lerp, prog, ease, tw, rng, noise1, el, mix, C, PIXEL_PALETTE, TypeLine } from '../lib.js'
import { W, H, IMG, PEOPLE, SANS, SERIF, MONO, fill, img, Ticks, makeCard, makeStars } from "./common.js"

// ─────────────────────────────────────────────────────── S2 · { in your stars }
export function sceneIntro(stage) {
  const root = fill(stage, { background: C.paper })
  const mid = el('div', { position: 'absolute', left: '0', top: '0', width: W + 'px', height: H + 'px' }, root)
  const row = el('div', {
    position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', display: 'flex', alignItems: 'center',
    fontFamily: SANS, fontWeight: 400, fontSize: '50px', color: C.ink, whiteSpace: 'nowrap', letterSpacing: '-0.01em',
  }, mid)
  const mk = (txt, extra = {}) => el('span', { display: 'inline-block', overflow: 'hidden', verticalAlign: 'middle', ...extra }, row, txt)
  const lb = mk('{', { padding: '0 14px 6px 0' })
  const wIn = mk('in')
  const wYour = mk('&nbsp;your')
  const wStars = mk('&nbsp;stars')
  const wIntro = mk('intro', { color: C.rub })
  const chip = el('span', { display: 'inline-block', position: 'relative', height: '64px', overflow: 'hidden', borderRadius: '8px', margin: '0 6px', verticalAlign: 'middle' }, row)
  const chipImgs = PEOPLE.slice(0, 8).map((src, i) => img(chip, src, { left: (i * 52) + 'px', top: 0, width: '50px', height: '64px', objectFit: 'cover', borderRadius: '6px' }))
  const dot = mk('•', { color: C.rub, fontSize: '22px' })
  const wDucing = mk('ducing')
  const rb = mk('}', { padding: '0 0 6px 14px' })
  const arrL = el('div', { position: 'absolute', top: '50%', fontFamily: SANS, fontWeight: 200, fontSize: '44px', color: 'rgba(26,16,51,0.22)' }, mid, '⟵')
  const arrR = el('div', { position: 'absolute', top: '50%', fontFamily: SANS, fontWeight: 200, fontSize: '44px', color: 'rgba(26,16,51,0.22)' }, mid, '⟶')
  const ticks = new Ticks(mid, C.ink, 10)

  let natural = null
  const measure = () => {
    natural = {}
    for (const [k, e] of Object.entries({ wIn, wYour, wStars, wIntro, wDucing, dot })) {
      e.style.width = 'auto'; natural[k] = e.getBoundingClientRect().width / (window.__stageScale || 1)
    }
  }
  const setW = (e, k, f) => {
    e.style.width = (natural[k] * clamp(f, 0, 1.2)) + 'px'
    e.style.opacity = String(clamp(f * 1.6))
  }

  return {
    start: 3.55, end: 6.86, root,
    update(t) {
      if (!natural) measure()
      const sp = (a, d = 0.45) => ease.spring(prog(t, a, a + d), 0.08)
      const phaseB = t >= 4.95
      // phase A: { in } → { in your } → { in your stars }
      setW(wIn, 'wIn', phaseB ? 0 : sp(3.62))
      setW(wYour, 'wYour', phaseB ? 0 : sp(4.0))
      setW(wStars, 'wStars', phaseB ? 0 : sp(4.38))
      // phase B: { intro ▣ ducing }
      const b = sp(4.95, 0.5)
      setW(wIntro, 'wIntro', phaseB ? b : 0)
      setW(wDucing, 'wDucing', phaseB ? b : 0)
      const open = phaseB ? ease.spring(prog(t, 5.25, 5.75), 0.1) * (1 - ease.inOutCubic(prog(t, 6.0, 6.25))) : 0
      chip.style.width = (open * 420) + 'px'
      chip.style.opacity = String(clamp(open * 3))
      const shift = Math.floor(t * 14) % 8
      chipImgs.forEach((im, i) => { im.style.left = (((i + shift) % 8) * 52 - 52) + 'px' })
      setW(dot, 'dot', phaseB ? (1 - open) * b : 0)
      const outF = 1 - ease.inCubic(prog(t, 6.25, 6.45))
      row.style.opacity = String(Math.min(ease.outQuad(prog(t, 3.55, 3.66)), outF))
      // ticks hug the row with a lag
      const rw = row.getBoundingClientRect().width / (window.__stageScale || 1)
      const lag = ease.outCubic(prog(t, 3.9, 4.3))
      const tw2 = rw + 220 * lag, th = 70 + 120 * lag
      const conv = ease.inOutCubic(prog(t, 6.3, 6.6))
      ticks.update(W / 2, H / 2, lerp(tw2, 0, conv), lerp(th, 0, conv), lag * (1 - prog(t, 6.55, 6.62)))
      const ap = phaseB ? ease.outCubic(prog(t, 4.95, 5.6)) : 0
      arrL.style.left = (W / 2 - rw / 2 - lerp(260, 130, ap) - 40) + 'px'
      arrR.style.left = (W / 2 + rw / 2 + lerp(260, 130, ap) - 4) + 'px'
      arrL.style.transform = arrR.style.transform = 'translateY(-55%)'
      arrL.style.opacity = arrR.style.opacity = String(ap * outF)
    },
  }
}

/** a pixel mound rising from the bottom in thermal colours, ending fully covered (S2 → S3) */
export function fxMound(ctx, t, { start, dur, seed = 5, size = 40 }) {
  const p = prog(t, start, start + dur)
  if (p <= 0) return
  const cols = Math.ceil(W / size), rows = Math.ceil(H / size)
  const r = rng(seed)
  const jit = Array.from({ length: cols }, () => r())
  const thermal = ['#3a1c7a', '#7a2fb0', '#c43c9a', '#ee5a6e', '#f79a46', '#ffd34f']
  const width = lerp(3, 60, ease.inCubic(p))
  const height = lerp(1, rows * 1.9, ease.inCubic(p))
  for (let cx = 0; cx < cols; cx++) {
    const dx = (cx - cols / 2) / width
    const h = Math.floor(height * Math.exp(-dx * dx) + jit[cx] * 1.5 * (1 - p))
    for (let k = 0; k < Math.min(h, rows); k++) {
      const cy = rows - 1 - k
      const depth = h - k
      const idx = clamp(Math.floor(depth / 2.2), 0, thermal.length - 1)
      const rr = rng(cx * 37 + k * 101 + seed)
      const pick = depth < 2 ? PIXEL_PALETTE[Math.floor(rr() * PIXEL_PALETTE.length)] : thermal[thermal.length - 1 - idx]
      ctx.fillStyle = pick
      ctx.fillRect(cx * size, cy * size, size + 0.5, size + 0.5)
    }
  }
}
