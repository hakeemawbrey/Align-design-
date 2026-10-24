// Shared kit for the Align teaser series (vertical 1080×1920). Every teaser builds from these so the
// series reads as one brand: deep-space backdrops with grain, pixel stars, the moon, bone serif type,
// the chakra column, and one shared end tag.
export * from '../src/lib.js'
export { W, H, IMG, A, PEOPLE, SANS, SERIF, MONO, fill, img, makeStars, spaceBackdrop, SPACE_MOODS } from '../src/scenes/common.js'
export { drawMoon, drawMoonGlyph, moonCanvas, litOf, phaseName } from '../src/scenes/fx-moon.js'
import { clamp, lerp, prog, ease, rng, el, C } from '../src/lib.js'
import { W, H, SANS, SERIF, MONO, fill, makeStars } from '../src/scenes/common.js'
import { drawMoonGlyph } from '../src/scenes/fx-moon.js'

export const BONE = '#efe6d6', GOLD = '#f2c75c', VIOLET = '#c9a6ff', ROSE = '#ff8fb1', HOT = '#fff3e0'
export const CHAKRAS = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff']
/** safe area for vertical platforms (TikTok/Reels overlays): keep text/UI inside */
export const SAFE = { x0: 60, x1: 1020, y0: 220, y1: 1640, rightBottom: 940 }

// ── pixel-art stars (same sprites as the main film) ───────────────────────
const SPRITES = [
  ['...X...', '...X...', '..XXX..', 'XXXCXXX', '..XXX..', '...X...', '...X...'],
  ['.......', '...X...', '..XXX..', '.XXCXX.', '..XXX..', '...X...', '.......'],
  ['.......', '.......', '...X...', '..XCX..', '...X...', '.......', '.......'],
  ['.......', '.X...X.', '...X...', '..XCX..', '...X...', '.X...X.', '.......'],
].map(rows => rows.flatMap((row, y) => [...row].map((ch, x) => ch === '.' ? null : [x - 3, y - 3, ch === 'C'])).filter(Boolean))
/** crisp pixel star centred on (cx, cy); kind 0 sparkle · 1 plus · 2 twinkle · 3 glint */
export function pixelStar(ctx, cx, cy, px, kind, color = BONE, centre = HOT) {
  const x0 = Math.round(cx) - Math.floor(px / 2), y0 = Math.round(cy) - Math.floor(px / 2)
  for (const [x, y, c] of SPRITES[kind]) { ctx.fillStyle = c ? centre : color; ctx.fillRect(x0 + x * px, y0 + y * px, px, px) }
}

/** a twinkling field of pixel stars + dot stars on a canvas context; keepOut = [[x,y,w,h],...] */
export function starField(ctx, t, { seed = 1, sprites = 22, dots = 70, alpha = 1, drift = [-6, -10], keepOut = [], pal = [BONE, BONE, GOLD, VIOLET, ROSE] } = {}) {
  const r = rng(seed * 7919)
  const f = Math.round(t * 30)
  const inKeep = (x, y) => keepOut.some(([kx, ky, kw, kh]) => x > kx - 40 && x < kx + kw + 40 && y > ky - 40 && y < ky + kh + 40)
  for (let i = 0; i < dots; i++) {
    const x = (r() * W + drift[0] * t * (0.5 + r())) % W, y = ((r() * H + drift[1] * t) % H + H) % H, s = 0.6 + r() * 1.8, ph = r() * 6.28
    if (inKeep(x, y)) continue
    ctx.globalAlpha = alpha * (0.35 + 0.55 * (0.5 + 0.5 * Math.sin(t * 2.2 + ph)))
    ctx.fillStyle = '#fff7ec'; ctx.beginPath(); ctx.arc((x + W) % W, y, s, 0, 6.283); ctx.fill()
  }
  for (let i = 0; i < sprites; i++) {
    const x = ((r() * W + drift[0] * t * (0.6 + r())) % W + W) % W, y = ((r() * H + drift[1] * t * (0.6 + r())) % H + H) % H
    const px = 3 + Math.floor(r() * 2), col = pal[Math.floor(r() * pal.length)], ph = r() * 6.28, sp = 1.2 + r() * 2
    if (inKeep(x, y)) continue
    const tw = 0.5 + 0.5 * Math.sin(t * sp + ph)
    const kind = tw > 0.92 && (f >> 1) % 2 ? 0 : tw > 0.6 ? 1 : tw > 0.25 ? 2 : -1
    if (kind < 0) continue
    ctx.globalAlpha = alpha * (0.5 + 0.5 * tw)
    pixelStar(ctx, x, y, px, kind, col)
  }
  ctx.globalAlpha = 1
}

/** typed line with per-character fade (bone serif italic by default); returns { root, update(lt) } */
export function typeLine(parent, text, { x = W / 2, y = H / 2, size = 84, font = SERIF, italic = true, color = BONE, align = 'center', perChar = 0.03, fade = 0.3, lh = 1.12, weight = 400, shadow = '0 2px 24px rgba(11,6,32,0.6)', maxW = 940 } = {}) {
  const root = el('div', { position: 'absolute', left: (align === 'center' ? x - maxW / 2 : x) + 'px', top: y + 'px', width: maxW + 'px', textAlign: align, fontFamily: font, fontStyle: italic ? 'italic' : 'normal', fontWeight: weight, fontSize: size + 'px', lineHeight: lh, color, textShadow: shadow, whiteSpace: 'pre-wrap' }, parent)
  const spans = [...text].map(ch => ch === '\n' ? (el('br', {}, root), null) : el('span', { opacity: 0 }, root, ch === ' ' ? ' ' : ch.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c])))).filter(Boolean)
  return {
    root,
    update(lt, out = Infinity) {
      spans.forEach((s, i) => {
        const p = ease.outQuad(prog(lt, i * perChar, i * perChar + fade))
        const o = out === Infinity ? 1 : 1 - prog(lt, out, out + 0.3)
        s.style.opacity = String(Math.min(p, o))
      })
    },
  }
}

/** small Space Mono eyebrow */
export function eyebrow(parent, text, { x = W / 2, y = 400, size = 28, color = BONE, spacing = '0.26em', align = 'center', maxW = 960 } = {}) {
  return el('div', { position: 'absolute', left: (align === 'center' ? x - maxW / 2 : x) + 'px', top: y + 'px', width: maxW + 'px', textAlign: align, fontFamily: MONO, fontSize: size + 'px', letterSpacing: spacing, color, opacity: 0, textTransform: 'uppercase' }, parent, text)
}

// ── shared end tag: Align mark draws in, chakras light, wordmark, line, moon row → fade ───
const CH = CHAKRAS
const R0 = 20
const PET = [[0, 0], ...Array.from({ length: 6 }, (_, k) => { const a = (-90 + k * 60) * Math.PI / 180; return [Math.cos(a) * R0, Math.sin(a) * R0] })]
const CIRC = [...PET.map(([x, y]) => ({ x, y, r: R0 })), { x: 0, y: 0, r: 40 }]
/**
 * endTag(stage, { start, end, line, z }) — 2.2–2.8s brand sign-off used by every teaser.
 * Timing (relative to start): rings 0–0.55 · chakras 0.35 + i*0.06 · wordmark 0.75–1.25 · line 1.0–1.35 ·
 * moon row lights 1.1 + i*0.06 (full at ~1.6) · fade to black over the last 0.35s before `end`.
 */
export function endTag(stage, { start, end, line = 'PUT YOUR FAITH\nIN THE STARS', z = 900 } = {}) {
  const root = fill(stage, { background: '#0b0620', zIndex: String(z), display: 'none' })
  const stars = makeStars(root, 160, 501)
  const glow = fill(root, { background: 'radial-gradient(70% 34% at 50% 38%, rgba(154,123,224,0.32), rgba(11,6,32,0) 70%)' })
  const defs = CH.map((c, i) => `<radialGradient id="tg${i}"><stop offset="0%" stop-color="${c}" stop-opacity="0.9"/><stop offset="45%" stop-color="${c}" stop-opacity="0.35"/><stop offset="100%" stop-color="${c}" stop-opacity="0"/></radialGradient><radialGradient id="tc${i}" cx="42%" cy="38%"><stop offset="0%" stop-color="#fff"/><stop offset="35%" stop-color="${c}"/><stop offset="100%" stop-color="${c}"/></radialGradient>`).join('')
  const M = 440
  const mark = el('div', { position: 'absolute', left: (W / 2 - M / 2) + 'px', top: '470px', width: M + 'px', height: M + 'px' }, root,
    `<svg width="${M}" height="${M}" viewBox="-44 -44 88 88" style="overflow:visible"><defs>${defs}</defs>
    <g fill="none" stroke="#d9cdf0" stroke-opacity="0.85" stroke-width="0.9" stroke-linecap="round">${CIRC.map((c, i) => `<circle class="ring" cx="${c.x}" cy="${c.y}" r="${c.r}" transform="rotate(${-90 + i * 51} ${c.x} ${c.y})" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/>`).join('')}</g>
    ${CH.map((_, i) => `<circle class="halo" cx="0" cy="${3 * 10.6 - i * 10.6}" r="0" fill="url(#tg${i})"/><circle class="core" cx="0" cy="${3 * 10.6 - i * 10.6}" r="0" fill="url(#tc${i})"/>`).join('')}</svg>`)
  const rings = [...mark.querySelectorAll('.ring')], halos = [...mark.querySelectorAll('.halo')], cores = [...mark.querySelectorAll('.core')]
  const word = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '950px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: '170px', color: BONE, textShadow: '0 0 40px rgba(239,230,214,0.25)', opacity: 0 }, root, 'Align')
  const sub = el('div', { position: 'absolute', left: '90px', width: (W - 180) + 'px', top: '1200px', textAlign: 'center', fontFamily: MONO, fontSize: '40px', lineHeight: 1.5, letterSpacing: '0.24em', color: BONE, opacity: 0, whiteSpace: 'pre-line' }, root, line)
  const mc = el('canvas', { position: 'absolute', left: 0, top: '1390px', width: W + 'px', height: '80px' }, root)
  mc.width = W; mc.height = 80
  const mctx = mc.getContext('2d')
  const black = fill(root, { background: '#000', opacity: 0 })
  return {
    root,
    update(t) {
      const on = t >= start && t < end + 0.01
      root.style.display = on ? 'block' : 'none'
      if (!on) return
      const lt = t - start
      root.style.opacity = String(ease.outQuad(prog(lt, 0, 0.2)))
      rings.forEach((c, i) => c.setAttribute('stroke-dashoffset', String(1 - ease.outCubic(prog(lt, i * 0.035, 0.42 + i * 0.035)))))
      halos.forEach((c, i) => { const p = ease.outCubic(prog(lt, 0.35 + i * 0.06, 0.8 + i * 0.06)); c.setAttribute('r', String(11 * p)); c.setAttribute('opacity', String(p)) })
      cores.forEach((c, i) => { const p = prog(lt, 0.35 + i * 0.06, 0.65 + i * 0.06); c.setAttribute('r', String(p < 0.6 ? 5.5 * p / 0.6 : lerp(5.5, 3.7, (p - 0.6) / 0.4))) })
      const wp = ease.outCubic(prog(lt, 0.75, 1.25))
      word.style.opacity = String(wp); word.style.letterSpacing = lerp(0.12, 0.01, wp) + 'em'; word.style.filter = `blur(${lerp(8, 0, wp)}px)`
      sub.style.opacity = String(ease.outQuad(prog(lt, 1.0, 1.35)))
      mctx.clearRect(0, 0, W, 80)
      const n = 9, gap = 84, x0 = W / 2 - (n - 1) * gap / 2
      for (let i = 0; i < n; i++) {
        const a = prog(lt, 0.95 + i * 0.02, 1.15 + i * 0.02), lit = prog(lt, 1.1 + i * 0.06, 1.2 + i * 0.06)
        drawMoonGlyph(mctx, x0 + i * gap, 40, 16, i / (n - 1) * 0.5, { alpha: a, fillAlpha: lit, glow: i === n - 1 ? lit : 0 })
      }
      const push = 1 + 0.035 * prog(lt, 0.4, end - start)
      for (const e of [mark, word, sub, mc]) { e.style.transformOrigin = `${W / 2}px 900px`; e.style.transform = `scale(${push})` }
      stars.style.opacity = String(prog(lt, 0, 0.5)); glow.style.opacity = String(prog(lt, 0.3, 1.2))
      black.style.opacity = String(ease.inQuad(prog(t, end - 0.35, end)))
    },
  }
}
