// Shared zodiac-wheel helpers for the vertical explainers (astro101, alignment). Lead-owned.
// Standard chart orientation: Aries begins at 9 o'clock (the Ascendant side) and the signs run
// counter-clockwise on screen (Aries → Taurus heads down toward 6 o'clock).
export const SIGNS = [
  { id: 'aries', name: 'Aries', glyph: '♈', el: 'fire', color: '#f0603a' },
  { id: 'taurus', name: 'Taurus', glyph: '♉', el: 'earth', color: '#e9b24a' },
  { id: 'gemini', name: 'Gemini', glyph: '♊', el: 'air', color: '#f2cf4a' },
  { id: 'cancer', name: 'Cancer', glyph: '♋', el: 'water', color: '#3fb6f0' },
  { id: 'leo', name: 'Leo', glyph: '♌', el: 'fire', color: '#f39a3a' },
  { id: 'virgo', name: 'Virgo', glyph: '♍', el: 'earth', color: '#ef5c94' },
  { id: 'libra', name: 'Libra', glyph: '♎', el: 'air', color: '#e163d6' },
  { id: 'scorpio', name: 'Scorpio', glyph: '♏', el: 'water', color: '#e23d66' },
  { id: 'sagittarius', name: 'Sagittarius', glyph: '♐', el: 'fire', color: '#a35cf0' },
  { id: 'capricorn', name: 'Capricorn', glyph: '♑', el: 'earth', color: '#2fc79a' },
  { id: 'aquarius', name: 'Aquarius', glyph: '♒', el: 'air', color: '#38c4ec' },
  { id: 'pisces', name: 'Pisces', glyph: '♓', el: 'water', color: '#7c74f0' },
]
export const ELEMENT_COLOR = { fire: '#f0603a', earth: '#e9b24a', air: '#7fd0f0', water: '#3f7cf0' }
export const READING = { pull: '#8fd8f6', push: '#f59cc4', align: '#f2c75c', relationship: '#dcaaf2' }
export const WHEEL = { cx: 540, cy: 1010, rOut: 460, rIn: 368, rGlyph: 414, alpha: 0.92 }  // v2: bigger, bolder
export const SKY_H = { zoom: 1.5, dx: 0, dy: 0, dim: 0.56, moon: { x: 930, y: 150, r: 44, phase: 0.12, alpha: 1 } }
export const GRAIN_H = 0.4

/** screen angle (radians, canvas convention) of ecliptic longitude `lon` (0° = start of Aries) */
export const angOf = lon => Math.PI - (lon * Math.PI) / 180
/** canvas point at ecliptic longitude `lon` and radius r around the wheel centre */
export const ptOf = (lon, r, W = WHEEL) => ({ x: W.cx + Math.cos(angOf(lon)) * r, y: W.cy + Math.sin(angOf(lon)) * r })
/** centre longitude of a sign (index 0–11, or id) */
export const signMid = s => (typeof s === 'number' ? s : SIGNS.findIndex(x => x.id === s)) * 30 + 15

/** draw the handoff wheel H (ring, 12 divisions, glyphs). k 0–1 scales its opacity; glyphK separately fades the glyphs. */
export function drawWheelH(ctx, { k = 1, glyphK = 1, W = WHEEL } = {}) {
  if (k <= 0) return
  ctx.save()
  // v2: each sign's band carries a faint wash of its colour
  SIGNS.forEach((s, i) => {
    const a0 = angOf(i * 30), a1 = angOf(i * 30 + 30)
    ctx.globalAlpha = 0.16 * k; ctx.fillStyle = s.color
    ctx.beginPath(); ctx.arc(W.cx, W.cy, W.rOut, a1, a0); ctx.arc(W.cx, W.cy, W.rIn, a0, a1, true); ctx.closePath(); ctx.fill()
  })
  ctx.globalAlpha = W.alpha * k
  ctx.strokeStyle = '#efe6d6'; ctx.lineWidth = 4
  ctx.beginPath(); ctx.arc(W.cx, W.cy, W.rOut, 0, Math.PI * 2); ctx.stroke()
  ctx.lineWidth = 3
  ctx.beginPath(); ctx.arc(W.cx, W.cy, W.rIn, 0, Math.PI * 2); ctx.stroke()
  for (let i = 0; i < 12; i++) {
    const a = ptOf(i * 30, W.rIn, W), b = ptOf(i * 30, W.rOut, W)
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
  }
  ctx.restore()
  if (glyphK <= 0) return
  ctx.save()
  ctx.font = "bold 58px 'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  SIGNS.forEach((s, i) => {
    const p = ptOf(i * 30 + 15, W.rGlyph, W)
    ctx.globalAlpha = k * glyphK; ctx.fillStyle = s.color
    ctx.fillText(s.glyph + '︎', p.x, p.y)
  })
  ctx.restore()
}

// v2 type tokens (bigger, bolder). Headlines: Inter 800. Accent word: EB Garamond italic in a colour.
export const TYPE = {
  head: "800 108px Inter, 'Helvetica Neue', Arial, sans-serif", headSize: 108, headLine: 1.02, headY: 230,
  accent: "italic 500 118px 'EB Garamond', serif",
  sub: "700 62px Inter, 'Helvetica Neue', Arial, sans-serif", subSize: 62, subY: 1560,
  eyebrow: "700 34px 'Space Mono', monospace", eyebrowY: 170,
}
/** springy overshoot ease (0→1, overshoots ~10%) */
export const easeOutBack = (x, s = 1.9) => { x = Math.min(1, Math.max(0, x)); const c = s + 1; return 1 + c * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2) }
