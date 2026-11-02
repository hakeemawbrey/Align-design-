// props — hxnothingtodo's kit: the idea board (a cork board on the lab wall), sticky notes with pixel icons, a
// tumbleweed (the specimen), a dart, a blindfold, three face-down cards (tonight's deck, as a prop). Pure f(t).
import { clamp, lerp, ease, rng } from '../../../src/lib.js'
import { drawBits, INK, BONE, GOLD, MONO } from './lab.js'

export const BOARD = { x0: 90, y0: 520, x1: 990, y1: 1150 }

export function drawBoard(x, t, { alpha = 1, dy = 0 } = {}) {
  if (alpha <= 0) return
  const { x0, y0, x1, y1 } = BOARD
  x.save(); x.globalAlpha *= alpha; x.translate(0, dy)
  x.fillStyle = INK; x.fillRect(x0 - 26, y0 - 26, x1 - x0 + 52, y1 - y0 + 52)
  x.fillStyle = '#a8744a'; x.fillRect(x0 - 20, y0 - 20, x1 - x0 + 40, y1 - y0 + 40)
  x.fillStyle = '#8a5a34'; x.fillRect(x0 - 20, y1 + 8, x1 - x0 + 40, 12)
  x.fillStyle = INK; x.fillRect(x0 - 4, y0 - 4, x1 - x0 + 8, y1 - y0 + 8)
  x.fillStyle = '#c8955a'; x.fillRect(x0, y0, x1 - x0, y1 - y0)
  const r = rng(9)
  for (let i = 0; i < 420; i++) { x.fillStyle = r() < 0.5 ? '#b8854c' : '#d8a86a'; x.fillRect(x0 + Math.floor(r() * (x1 - x0 - 6)), y0 + Math.floor(r() * (y1 - y0 - 6)), 6, 6) }
  // the header strip
  x.fillStyle = INK; x.fillRect(340, y0 - 46, 400, 56); x.fillStyle = BONE; x.fillRect(346, y0 - 40, 388, 44)
  x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('FREE DATE IDEAS', 540, y0 - 17)
  x.restore()
  void t
}

// ── pixel icons for the notes
const IC = {
  tree: { bm: ['..GGGG..', '.GGgGGG.', 'GGGGGgGG', 'GgGGGGGG', '.GGGGGG.', '...BB...', '...BB...', '..BBBB..'], c: { G: '#3f9a52', g: '#5ee08a', B: '#7a4a2a' } },
  basket: { bm: ['.R..O.G.', 'RRROOOGG', '.RROOGG.', 'BBBBBBBB', 'BbBbBbBB', '.BbBbBB.', '..BBBB..'], c: { R: '#ff5a6e', O: '#ff9a2a', G: '#5ee08a', B: '#b07a3c', b: '#8a5a2a' } },
  mural: { bm: ['PPPYYYCC', 'PPYYYCCC', 'PYYPPCCM', 'YYPPPCMM', 'YPPPCCMM', 'KKKKKKKK'], c: { P: '#ff8fb1', Y: GOLD, C: '#7fe0ff', M: '#7dffb0', K: '#6a6f8a' } },
  sun: { bm: ['...Y....', '.Y.Y.Y..', '..YYY...', 'YYYYYYY.', '..YYY...', '.Y.Y.Y..', 'OOOOOOOO', 'oooooooo'], c: { Y: '#ffc65a', O: '#ff8a4a', o: '#c2506a' } },
  walk: { bm: ['...WWW..', '...WPW..', '..WWWWW.', '.WWWWWWW', 'GGGGGGGG'], c: { W: '#f4ecdc', P: '#ff8fb1', G: '#7fe0ff' } },
  picnic: { bm: ['RWRWRWRW', 'WRWRWRWR', 'RWRWRWRW', 'WRWRWRWR'], c: { R: '#ff5a6e', W: '#f4ecdc' } },
  stars: { bm: ['Y......Y', '...Y....', '.......Y', '.Y..Y...', '........', 'Y....Y..'], c: { Y: '#fff2b0' } },
  dog: { bm: ['.BB.....', 'BBBB...T', 'BKBBBBT.', 'NBBBBBB.', '.B.B.B.B'], c: { B: '#c98a4a', K: INK, T: '#c98a4a', N: INK } },
  porch: { bm: ['..RRRR..', '.RRRRRR.', 'RRRRRRRR', '.W.W.W..', '.W.W.W..', 'BBBBBBBB'], c: { R: '#c45576', W: BONE, B: '#7a4a2a' } },
  book: { bm: ['PPPPPPP.', 'PWWWWWP.', 'PWLLLWP.', 'PWWWWWP.', 'PWLLWWP.', 'PPPPPPP.'], c: { P: '#c96bff', W: '#f4ecdc', L: '#8a8fb8' } },
  bike: { bm: ['....KK..', '...K....', '.KKKKK..', 'K.K.K.K.', 'KK...KK.', 'K.....K.'], c: { K: '#5fb6ff' } },
  heart: { bm: ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], c: { H: '#ff4f86' } },
}
const NOTE_C = { y: '#ffe27a', p: '#ffb3c8', m: '#b8ffd0', b: '#bfe8ff', o: '#ffc89a' }
/** a sticky note: square, a darker fold strip, icon + word. k = pop scale, rot */
export function drawNote(x, cx, cy, { word, icon, col = 'y', k = 1, rot = 0, w = 230, glow = 0, alpha = 1 } = {}) {
  if (k <= 0.01 || alpha <= 0) return
  const h = w * 0.82
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  if (glow > 0) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(0, 0, 20, 0, 0, w); g.addColorStop(0, `rgba(255,220,140,${0.6 * glow})`); g.addColorStop(1, 'rgba(255,220,140,0)'); x.fillStyle = g; x.fillRect(-w, -w, 2 * w, 2 * w); x.restore() }
  x.fillStyle = 'rgba(6,4,18,0.35)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 4, -h / 2 - 4, w + 8, h + 8)
  x.fillStyle = NOTE_C[col] || col; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = 'rgba(0,0,0,0.08)'; x.fillRect(-w / 2, -h / 2, w, 22)
  // the pin
  x.fillStyle = INK; x.fillRect(-10, -h / 2 - 8, 20, 20); x.fillStyle = '#ff5a6e'; x.fillRect(-6, -h / 2 - 4, 12, 12)
  const ic = IC[icon]
  if (ic) drawBits(x, ic.bm, ic.c, 0, -h * 0.1, w / 30, { outline: null })
  x.font = `700 ${Math.round(w * 0.12)}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK
  let fs = Math.round(w * 0.12)
  while (x.measureText(word).width > w - 20 && fs > 12) { fs -= 1; x.font = `700 ${fs}px ${MONO}` }
  x.fillText(word, 0, h * 0.32)
  x.restore()
}

// ── the tumbleweed: a scribbly ball of tan pixels that rolls
export function drawTumbleweed(x, cx, cy, R, t, { rot = 0, alpha = 1 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  const r = rng(31)
  for (let i = 0; i < 70; i++) {
    const a = r() * Math.PI * 2, rr = R * Math.sqrt(r()), l = 10 + r() * 22
    x.save(); x.translate(Math.cos(a) * rr, Math.sin(a) * rr); x.rotate(r() * Math.PI)
    x.fillStyle = INK; x.fillRect(-l / 2 - 2, -4, l + 4, 8)
    x.fillStyle = i % 3 ? '#c9a46a' : '#a8844a'; x.fillRect(-l / 2, -2, l, 4)
    x.restore()
  }
  x.restore()
  void t
}

// ── a dart (flies along a path; p = 0…1)
export function drawDart(x, x0, y0, x1, y1, p, { alpha = 1 } = {}) {
  if (p <= 0 || alpha <= 0) return
  const q = ease.inQuad(clamp(p)), dx = lerp(x0, x1, q), dy = lerp(y0, y1, q) - Math.sin(Math.PI * clamp(p)) * 120
  const ang = Math.atan2(y1 - y0 - Math.cos(Math.PI * clamp(p)) * 120 * Math.PI, x1 - x0)
  x.save(); x.globalAlpha *= alpha; x.translate(dx, dy); x.rotate(ang)
  x.fillStyle = INK; x.fillRect(-60, -6, 72, 12); x.fillStyle = '#c9cde8'; x.fillRect(-56, -3, 64, 6)
  x.fillStyle = '#c9cde8'; x.fillRect(8, -2, 22, 4)
  x.fillStyle = '#ff4f86'; x.fillRect(-70, -16, 18, 12); x.fillRect(-70, 4, 18, 12)
  x.restore()
}

/** a face-down card (a prop: tonight's deck on the bench) */
export function drawCardProp(x, cx, cy, w, { rot = 0, k = 1, glow = 0 } = {}) {
  if (k <= 0.01) return
  const h = w * 1.45
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  if (glow > 0) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(0, 0, 10, 0, 0, w * 1.2); g.addColorStop(0, `rgba(242,199,92,${0.6 * glow})`); g.addColorStop(1, 'rgba(242,199,92,0)'); x.fillStyle = g; x.fillRect(-w * 1.3, -h, w * 2.6, h * 2); x.restore() }
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = '#3a2a8a'; x.fillRect(-w / 2, -h / 2, w, h)
  x.strokeStyle = GOLD; x.lineWidth = 4; x.strokeRect(-w / 2 + 9, -h / 2 + 9, w - 18, h - 18)
  x.font = `800 ${Math.round(w * 0.4)}px Inter`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = GOLD; x.fillText('✦', 0, 2)
  x.restore()
}

/** a blindfold across a star's eyes (g = starGeom) */
export function drawBlindfold(x, g, { alpha = 1 } = {}) {
  if (alpha <= 0) return
  const a = g.pt(6, 19.5), b = g.pt(30, 19.5)
  x.save(); x.globalAlpha *= alpha
  x.fillStyle = INK; x.fillRect(Math.round(a.x), Math.round(a.y - g.cell * 2.6), Math.round(b.x - a.x), Math.round(g.cell * 5.2))
  x.fillStyle = '#c45576'; x.fillRect(Math.round(a.x + 3), Math.round(a.y - g.cell * 2), Math.round(b.x - a.x - 6), Math.round(g.cell * 4))
  x.fillRect(Math.round(b.x - 4), Math.round(a.y), Math.round(g.cell * 4), Math.round(g.cell * 6))
  x.restore()
}
