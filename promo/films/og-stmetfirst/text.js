// stmetfirst type helpers (DOM, created inside build only).
//   popText(parent, text, opts)   springy word-by-word headline: '*word*' = accent (EB Garamond italic, colour), '|' = line break
//   lessonBanner(parent, opts)    the season-2 "★ LESSON UNLOCKED" achievement banner + the lesson line under it
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { easeOutBack } from '../wheel.js'

const W = 1080
const GOLD = '#f2c75c', BONE = '#efe6d6'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'

export function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0, late = 0, lateAt = null, lateGap = 0.1, wobble = false, lineHeight = 1.02, color = BONE, side = 70 }) {
  const box = el('div', { position: 'absolute', left: side + 'px', width: (W - 2 * side) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color, textShadow: SHADOW, letterSpacing: '-0.01em', display: 'none' }, parent)
  const toks = text.split(' '), nW = toks.filter(w => w !== '|').length
  const ws = []
  let n = 0
  toks.forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.12em', opacity: 0, transformOrigin: '50% 85%' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
    const big = late > 0 && n >= nW - late
    ws.push({ t: big ? lateAt + (n - (nW - late)) * lateGap : t0 + n * gap, big, e: el('span', style, box, w.replace(/\*/g, '')) })
    n++
  })
  return {
    words: ws.map(w => w.t),
    update(t, out = 1) {
      box.style.display = out <= 0 || t < t0 ? 'none' : 'block'
      if (box.style.display === 'none') return
      for (const w of ws) {
        const p = prog(t, w.t, w.t + (w.big ? 0.4 : 0.28))
        const sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        const rot = w.big && wobble && t > w.t ? 9 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) : 0
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}

const PX = 6
function pixelPanel(cv, w, h, m, { fill = 'rgba(16,9,38,0.94)', border = GOLD } = {}) {
  cv.width = w + 2 * m; cv.height = h + 2 * m
  const x = cv.getContext('2d'); x.translate(m, m)
  const P = PX
  const stepRect = (o, col) => {
    x.fillStyle = col
    x.fillRect(o + 2 * P, o, w - 2 * o - 4 * P, h - 2 * o)
    x.fillRect(o, o + 2 * P, w - 2 * o, h - 2 * o - 4 * P)
    x.fillRect(o + P, o + P, w - 2 * o - 2 * P, h - 2 * o - 2 * P)
  }
  x.save(); x.shadowColor = 'rgba(242,199,92,0.7)'; x.shadowBlur = 34; stepRect(0, border); x.restore()
  stepRect(0, border)
  stepRect(P, '#7a4a10')
  stepRect(2 * P, fill)
  // inner gold hairline + highlight pixels
  x.fillStyle = 'rgba(242,199,92,0.55)'
  x.fillRect(4 * P, 3 * P, w - 8 * P, P / 2); x.fillRect(4 * P, h - 3 * P - P / 2, w - 8 * P, P / 2)
  x.fillStyle = '#fff1c8'; x.fillRect(2 * P, 0, P * 4, P); x.fillRect(0, 2 * P, P, P * 3)
  // corner rivets
  x.fillStyle = GOLD
  for (const [a, b] of [[4, 5], [w / P - 5, 5], [4, h / P - 6], [w / P - 5, h / P - 6]]) x.fillRect(a * P, b * P, P, P)
}

/** the achievement banner. at = pop time, out = [a, b] fade-out window. Returns { update(t), burstAt } */
export function lessonBanner(parent, { at, out, top = 600, width = 840, height = 138, label = '★ LESSON UNLOCKED' }) {
  const M = 40
  const root = el('div', { position: 'absolute', left: ((W - width) / 2) + 'px', top: top + 'px', width: width + 'px', height: height + 'px', transformOrigin: '50% 50%', display: 'none' }, parent)
  const cv = el('canvas', { position: 'absolute', left: -M + 'px', top: -M + 'px', width: (width + 2 * M) + 'px', height: (height + 2 * M) + 'px', imageRendering: 'pixelated' }, root)
  pixelPanel(cv, width, height, M)
  const clip = el('div', { position: 'absolute', left: 3 * PX + 'px', top: 3 * PX + 'px', right: 3 * PX + 'px', bottom: 3 * PX + 'px', overflow: 'hidden' }, root)
  const shine = el('div', { position: 'absolute', top: '-20%', height: '140%', width: '120px', left: '-200px', background: 'linear-gradient(100deg, rgba(255,241,200,0) 0%, rgba(255,241,200,0.55) 50%, rgba(255,241,200,0) 100%)', transform: 'skewX(-18deg)' }, clip)
  const txt = el('div', { position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', font: `700 54px ${MONO}`, letterSpacing: '0.06em', color: GOLD, whiteSpace: 'nowrap',
    textShadow: '0 4px 0 #3a1c08, 0 0 18px rgba(242,199,92,0.55)' }, root, label)
  return {
    update(t) {
      const o = out ? 1 - ease.inCubic(prog(t, out[0], out[1])) : 1
      const show = t >= at && o > 0
      root.style.display = show ? 'block' : 'none'
      if (!show) return
      const p = prog(t, at, at + 0.42)
      const sc = lerp(0.2, 1, easeOutBack(p, 2.8)) * lerp(0.85, 1, o)
      const wob = t > at ? 4 * Math.sin((t - at) * 16) * Math.exp(-(t - at) * 4) : 0
      const breathe = 1 + 0.012 * Math.sin((t - at) * 4.2) * clamp((t - at - 0.6) * 2)
      root.style.opacity = String(clamp(p * 4) * o)
      root.style.transform = `scale(${(sc * breathe).toFixed(4)}) rotate(${wob.toFixed(2)}deg)`
      const s = prog(t, at + 0.35, at + 0.95)
      shine.style.left = lerp(-200, width + 80, ease.inOutCubic(s)) + 'px'
      shine.style.display = s > 0 && s < 1 ? 'block' : 'none'
      txt.style.color = Math.floor((t - at) * 8) % 2 === 0 && t - at < 0.5 ? '#fff1c8' : GOLD
    },
  }
}
