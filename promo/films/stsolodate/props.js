// stsolodate props: small pixel drawings on canvas (Star Talk season 3). Pure functions of their arguments; no `document`
// at module top level. Every prop is a bitmap of cells drawn with fillRect at a whole-pixel cell size, so it stays crisp.
//   drawBitmap(ctx, rows, x, y, cell, pal, { ax, ay, rot, flip, alpha })   rows: strings, '.' = empty, other chars → pal[ch]
//   drawTears(ctx, eyes, t, t0, { cell, strength })     cartoon fountain tears (as stwereup)
//   drawCandle(ctx, x, y, cell, t)                       (x, y) = the candle's foot; a flickering flame
//   drawGlass(ctx, x, y, cell, { rot, wine })            (x, y) = the glass's foot
//   drawBouquet(ctx, x, y, cell, { rot })                (x, y) = the stems' bottom
//   drawCake(ctx, x, y, cell, bites)                     (x, y) = the plate's centre; bites 0…3 eat the slice from the tip
//   drawFork(ctx, x, y, cell, rot)                       (x, y) = the tines' tip
//   drawGlasses(ctx, x, y, cell)                         tiny reading glasses centred between the eyes
//   drawCloud(ctx, x, y, cell, { alpha })                (x, y) = the cloud's top centre
//   drawChairBack(ctx, x, y, cell)                       bistro chair back; (x, y) = the top centre
//   drawBeret(ctx, x, y, cell, rot) · drawMic(ctx, x, y, cell, rot) · drawNote(ctx, x, y, cell, col)
//   drawPopcorn(ctx, x, y, cell) (x, y) = the bucket's bottom centre · drawSeat(ctx, x, y, cell) (x, y) = top centre
//   drawPencil(ctx, x, y, cell, rot) (x, y) = the tip · drawTent(ctx, x, y, cell, text) (x, y) = the foot centre
//   drawVase(ctx, x, y, cell) (x, y) = the foot
import { clamp } from '../../src/lib.js'

export function drawBitmap(ctx, rows, x, y, cell, pal, { ax = 0.5, ay = 0.5, rot = 0, flip = false, alpha = 1 } = {}) {
  if (alpha <= 0) return
  const w = rows[0].length, h = rows.length, c = Math.max(1, Math.round(cell))
  ctx.save()
  ctx.globalAlpha *= alpha
  ctx.translate(Math.round(x), Math.round(y))
  if (rot) ctx.rotate(rot)
  if (flip) ctx.scale(-1, 1)
  const ox = -Math.round(w * c * ax), oy = -Math.round(h * c * ay)
  rows.forEach((r, j) => { for (let i = 0; i < r.length; i++) { const col = pal[r[i]]; if (!col) continue; ctx.fillStyle = col; ctx.fillRect(ox + i * c, oy + j * c, c, c) } })
  ctx.restore()
}

// ── tears: arcs of blue pixel drops spurting sideways from each eye (from stwereup)
export function drawTears(ctx, eyes, t, t0, { cell = 6, strength = 1, alpha = 1 } = {}) {
  if (t < t0 || strength <= 0) return
  const c = Math.max(2, Math.round(cell))
  ctx.save(); ctx.globalAlpha *= alpha
  eyes.forEach(([ex, ey], side) => {
    const dir = side === 0 ? -1 : 1
    for (let k = 0; k < 9; k++) {
      const ph = ((t - t0) * 2.1 + k / 9) % 1
      const vx = dir * (60 + 40 * strength) * c / 6, vy = -40 * c / 6
      const px = ex + vx * ph * 1.6, py = ey + vy * ph * 1.6 + 260 * c / 6 * ph * ph
      const a = (1 - ph) * clamp(strength)
      if (a <= 0.03) continue
      ctx.globalAlpha = alpha * a
      const X = Math.round(px), Y = Math.round(py)
      ctx.fillStyle = '#16204a'; ctx.fillRect(X - 1, Y - 1, c + 2, 2 * c + 2)
      ctx.fillStyle = '#5cc6ff'; ctx.fillRect(X, Y, c, 2 * c)
      ctx.fillStyle = '#e6f8ff'; ctx.fillRect(X, Y, Math.ceil(c / 2), Math.ceil(c / 2))
    }
  })
  ctx.restore()
}

// ── candle: cream pillar on a brass dish, a two-frame flame
const CANDLE = [
  '..KWWWK..',
  '..KWWCK..',
  '..KWWCK..',
  '..KWWCK..',
  '..KWWCK..',
  '..KWWCK..',
  '..KWWCK..',
  '.KBBBBBK.',
  'KBBYYBBBK',
  '.KKKKKKK.',
]
const FLAME = [
  ['...O...', '..OYO..', '..OYO..', '.OYWYO.', '.OYWYO.', '..OYO..', '...K...'],
  ['..O....', '..OO...', '.OYYO..', '.OYWYO.', '.OYWYO.', '..OYO..', '...K...'],
]
export function drawCandle(ctx, x, y, cell, t) {
  const c = Math.round(cell)
  drawBitmap(ctx, CANDLE, x, y, c, { K: '#2a1838', W: '#fff4dc', C: '#e8d2b0', B: '#d29a3a', Y: '#ffe08a' }, { ay: 1 })
  const f = Math.floor(t * 7) % 2, sway = Math.sin(t * 9) * 0.06
  drawBitmap(ctx, FLAME[f], x, y - CANDLE.length * c + c, c, { O: '#ff9a3a', Y: '#ffd24a', W: '#fffbea', K: '#3a2440' }, { ay: 1, rot: sway })
}

// ── wine glass
const GLASS = [
  'GGGGGGG',
  'GHRRRRG',
  'GHRRRRG',
  '.GRRRG.',
  '..GGG..',
  '...G...',
  '...G...',
  '...G...',
  '.GGGGG.',
]
export function drawGlass(ctx, x, y, cell, { rot = 0, wine = true } = {}) {
  drawBitmap(ctx, GLASS, x, y, cell, { G: 'rgba(214,232,255,0.9)', H: '#ffffff', R: wine ? '#c23a5e' : 'rgba(214,232,255,0.25)' }, { ay: 1, rot })
}

// ── a bouquet: three blooms, leaves, a paper cone with a pink bow
const BOUQ = [
  '.PP..RR..YY.',
  'PwPPRRRRYwYY',
  'PPPRRwRRYYY.',
  '.PPLRRRLYY..',
  '..LLLGLLL...',
  '..CCCGCCC...',
  '...CCGCC....',
  '...CKKKC....',
  '....CKC.....',
  '....CCC.....',
  '.....C......',
]
export function drawBouquet(ctx, x, y, cell, { rot = 0 } = {}) {
  drawBitmap(ctx, BOUQ, x, y, cell, { P: '#ff8fb1', R: '#ff5c7a', Y: '#ffd24a', w: '#fff6e6', L: '#5fdc9a', G: '#2f9a5a', C: '#f3e6d0', K: '#ff8fb1' }, { ay: 1, rot })
}

// ── a slice of cake on a plate (layers + a strawberry); bites eat columns off the tip (the left end)
const CAKE = [
  '.........RR.',
  '........RRRR',
  '...CCCCCCCCC',
  '.CCCCCCCCCCC',
  'SSSSSSSSSSSS',
  'PPPPPPPPPPPP',
  'SSSSSSSSSSSS',
  'PPPPPPPPPPPP',
  'BBBBBBBBBBBB',
]
export function drawCake(ctx, x, y, cell, bites = 0) {
  const c = Math.round(cell)
  // plate
  ctx.fillStyle = '#2a1838'; ctx.fillRect(Math.round(x - 9.5 * c), Math.round(y - c), 19 * c, 2 * c + 2)
  ctx.fillStyle = '#f6f0ff'; ctx.fillRect(Math.round(x - 9 * c), Math.round(y - c), 18 * c, c)
  ctx.fillStyle = '#c9b8e8'; ctx.fillRect(Math.round(x - 8 * c), Math.round(y), 16 * c, c)
  const cut = Math.min(3, bites) * 3
  const rows = CAKE.map(r => '.'.repeat(cut) + r.slice(cut))
  drawBitmap(ctx, rows, x + c, y - c, c, { R: '#ff4f6e', C: '#fff6e6', S: '#ffd6e4', P: '#ff8fb1', B: '#c88a4a' }, { ay: 1 })
}

const FORK = ['K.K.K', 'K.K.K', 'KKKKK', '.KKK.', '..K..', '..K..', '..K..', '..K..', '..K..']
export function drawFork(ctx, x, y, cell, rot = 0) { drawBitmap(ctx, FORK, x, y, cell, { K: '#e6e0f4' }, { ay: 0, rot }) }

const SPECS = ['KKKKK.KKKKK', 'KLLLKKKLLLK', 'KLLLK.KLLLK', 'KKKKK.KKKKK']
export function drawGlasses(ctx, x, y, cell) { drawBitmap(ctx, SPECS, x, y, cell, { K: '#2a1838', L: 'rgba(200,236,255,0.45)' }) }

// ── cloud: a puffy pixel cloud, lit from above
const CLOUD = [
  '.......WWWW.........',
  '.....WWWWWWWW.......',
  '...WWWWWWWWWWW.WWW..',
  '..WWWWWWWWWWWWWWWWW.',
  '.WWWWWWWWWWWWWWWWWWW',
  'WWWWWWWWWWWWWWWWWWWW',
  'SSSSSSSSSSSSSSSSSSSS',
  '.SSSSSSSDDDSSSSSSSS.',
]
export function drawCloud(ctx, x, y, cell, { alpha = 1 } = {}) {
  drawBitmap(ctx, CLOUD, x, y, cell, { W: '#f1e9ff', S: '#c7b6ec', D: '#a993d8' }, { ay: 0, alpha })
}

const CHAIR = [
  '.KKKKKKKKKKKK.',
  'KBBBBBBBBBBBBK',
  'KBKKKKKKKKKKBK',
  'KBK........KBK',
  'KBK.KK..KK.KBK',
  'KBK.KB..KB.KBK',
  'KBK.KB..KB.KBK',
  'KBK.KB..KB.KBK',
  'KBK.KB..KB.KBK',
  'KBKKKBKKKBKKBK',
  'KBBBBBBBBBBBBK',
  'KBKKKKKKKKKKBK',
  'KBK........KBK',
  'KBK........KBK',
  'KBK........KBK',
  'KBK........KBK',
]
export function drawChairBack(ctx, x, y, cell) { drawBitmap(ctx, CHAIR, x, y, cell, { K: '#2a1430', B: '#a8643a' }, { ay: 0 }) }

const BERET = ['.....K.....', '...RRRRR...', '.RRRRRRRRR.', 'RRRRRRRRRRR', '.KKKKKKKKK.']
export function drawBeret(ctx, x, y, cell, rot = -0.25) { drawBitmap(ctx, BERET, x, y, cell, { R: '#e0405a', K: '#2a1838' }, { rot }) }

const MIC = ['.KKK.', 'KGWGK', 'KWGWK', 'KGWGK', '.KKK.', '..D..', '.KDK.', '.KDK.', '.KDK.', '.KDK.', '..K..']
export function drawMic(ctx, x, y, cell, rot = 0) { drawBitmap(ctx, MIC, x, y, cell, { K: '#1b1236', G: '#9aa0b8', W: '#e6e8f4', D: '#ff8fb1' }, { rot }) }

const NOTE = ['..KKK', '..KK.', '..K..', '..K..', 'KKK..', 'KKK..']
export function drawNote(ctx, x, y, cell, col = '#f2c75c') { drawBitmap(ctx, NOTE, x, y, cell, { K: col }) }

const POPCORN = [
  '..wWw.wW..wWw.',
  '.wWWwWWwWwWWw.',
  'wWWYWwWWYWwWWw',
  'WwWWwWYWwWWwWW',
  '.RRWWRRWWRRWW.',
  '.RRWWRRWWRRWW.',
  '.RRWWRRWWRRWW.',
  '..RWWRRWWRRW..',
  '..RWWRRWWRRW..',
  '..RWWRRWWRRW..',
  '..RWWRRWWRRW..',
  '...WWRRWWRR...',
  '...WWRRWWRR...',
  '...KKKKKKKK...',
]
export function drawPopcorn(ctx, x, y, cell) { drawBitmap(ctx, POPCORN, x, y, cell, { w: '#fff0c0', W: '#fffbea', Y: '#ffd24a', R: '#e0405a', K: '#7a1f30' }, { ay: 1 }) }

const SEAT = [
  '..KKKKKKKKKK..',
  '.KRRRRRRRRRRK.',
  'KRRrRRRRRRrRRK',
  'KRRrRRRRRRrRRK',
  'KRRrRRRRRRrRRK',
  'KRRrRRRRRRrRRK',
  'KRRrRRRRRRrRRK',
  'KRRRRRRRRRRRRK',
  'KRRRRRRRRRRRRK',
  'KKKKKKKKKKKKKK',
]
export function drawSeat(ctx, x, y, cell) { drawBitmap(ctx, SEAT, x, y, cell, { K: '#2a0f1e', R: '#a8233c', r: '#7a1830' }, { ay: 0 }) }

const PENCIL = ['..K..', '.KDK.', '.YYY.', '.YOY.', '.YYY.', '.YOY.', '.YYY.', '.YOY.', '.YYY.', '.PPP.', '.PPP.']
export function drawPencil(ctx, x, y, cell, rot = 0.5) { drawBitmap(ctx, PENCIL, x, y, cell, { K: '#1b1236', D: '#e8c890', Y: '#ffd24a', O: '#e0a020', P: '#ff8fb1' }, { ax: 0.5, ay: 0, rot }) }

export function drawTent(ctx, x, y, cell, text = 'RESERVED') {
  const c = Math.round(cell), w = 30 * c, h = 12 * c
  ctx.save(); ctx.translate(Math.round(x), Math.round(y))
  ctx.fillStyle = '#2a1838'; ctx.fillRect(-w / 2 - c, -h - c, w + 2 * c, h + 2 * c)
  ctx.fillStyle = '#fff6e6'; ctx.fillRect(-w / 2, -h, w, h)
  ctx.fillStyle = '#f2c75c'; ctx.fillRect(-w / 2, -h, w, c)
  ctx.fillStyle = '#1b1236'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.font = `700 ${Math.round(4.6 * c)}px 'Space Mono', monospace`; ctx.fillText(text, 0, -h / 2 + c * 0.5)
  ctx.restore()
}

const VASE = ['.KKKK.', 'KBBBBK', '.KBBK.', 'KBBBBK', 'KBWBBK', 'KBBBBK', '.KKKK.']
export function drawVase(ctx, x, y, cell) { drawBitmap(ctx, VASE, x, y, cell, { K: '#1b1236', B: '#7fd0f0', W: '#e6f8ff' }, { ay: 1 }) }
