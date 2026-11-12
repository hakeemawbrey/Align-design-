// props.js: this film's own pixel props (a private copy per film folder; the kit stays untouched)
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import { drawBits, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'

export const RED = '#e23d4e', CREAM = '#fff8ea', ORANGE = '#ffb34a', TEAL = '#2fc79a', WOOD = '#c98f5a', SLATE = '#9fb4c8', GREY = '#c9c9d8', BROWN = '#8a4a2e', GREEN = '#5fd068'

/** a sticker label in Space Mono */
export const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
/** a pop that starts lt seconds into the card */
export const at = (t, P, d, dur = 0.3, s = 2.2) => pop01(t, P.t0 + d, dur, s)

/** a pixel phone: lines = [[text, colour, k, right?], …] */
export function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05, size = 28, scale = 1.15 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * scale, k * scale)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-134, -200, 280, 420)
  x.fillStyle = INK; x.fillRect(-146, -212, 292, 424)
  x.fillStyle = '#2a2350'; x.fillRect(-136, -202, 272, 404)
  x.fillStyle = '#140c30'; x.fillRect(-122, -176, 244, 352)
  if (head) { x.fillStyle = headCol; x.fillRect(-112, -164, 224, 48); x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -139) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk = 1, right], i) => {
    if (kk <= 0.01) return
    x.font = `800 ${size}px ${INTER}`; const w = Math.min(224, x.measureText(txt).width + 26)
    x.save(); x.translate(right ? 110 - w : -110, -72 + i * 68); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -25, w, 50); x.fillStyle = INK; x.fillText(txt, 13, 2)
    x.restore()
  })
  x.fillStyle = '#6b62a8'; x.fillRect(-28, 184, 56, 8)
  x.restore()
}
/** a paper sheet with a header and rows [text, colour?, k?, strike?] */
export function sheet(x, cx, cy, k, { w = 330, h = 380, head = '', headCol = SLATE, rows = [], rot = 0.04, size = 28, paper = CREAM, ink = INK, font = MONO, gap = 16 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = paper; x.fillRect(-w / 2, -h / 2, w, h)
  if (head) { x.fillStyle = headCol; x.fillRect(-w / 2, -h / 2, w, 58); x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 30) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  const top = -h / 2 + (head ? 58 : 0) + 40
  rows.forEach(([txt, col, kk = 1, strike], i) => {
    if (kk <= 0.01) return
    x.save(); x.globalAlpha *= clamp(kk); x.fillStyle = col || ink; x.font = `700 ${size}px ${font}`
    const y = top + i * (size + gap)
    x.fillText(txt, -w / 2 + 20, y)
    if (strike) { const tw = x.measureText(txt).width; x.fillStyle = RED; x.fillRect(-w / 2 + 16, y - 3, tw * clamp(strike) + 8, 6) }
    x.restore()
  })
  x.restore()
}
/** a wall clock */
export function clock(x, cx, cy, k, hh, mm, r = 120) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k * r / 120, k * r / 120)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 132, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 120, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * 100 - 5, Math.sin(a) * 100 - 5, 10, 10) }
  const ha = ((hh % 12) + mm / 60) / 12 * Math.PI * 2 - Math.PI / 2, ma = mm / 60 * Math.PI * 2 - Math.PI / 2
  x.lineCap = 'square'; x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(ha) * 56, Math.sin(ha) * 56); x.stroke()
  x.lineWidth = 9; x.strokeStyle = RED; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(ma) * 88, Math.sin(ma) * 88); x.stroke()
  x.fillStyle = INK; x.fillRect(-10, -10, 20, 20)
  x.restore()
}
/** a mini birth-chart wheel */
export function chartWheel(x, t, cx, cy, k, r = 150) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k * r / 150, k * r / 150); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.fill()
  const C = [RED, '#7fd08a', '#f3d79a', SKYB, GOLD, '#b6e08a', PINK, '#b07bff', '#ff9a4a', SLATE, '#6fd6ff', LAV]
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillStyle = C[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 140, a, a + Math.PI / 6 - 0.04); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, 80, 0, Math.PI * 2); x.fill()
  x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.moveTo(-60, -20); x.lineTo(50, 40); x.lineTo(-10, -62); x.closePath(); x.stroke()
  x.restore()
}
/** a small sign star used as a second character */
export function buddy(x, t, id, cx, cy, size, k, o = {}) {
  if (k <= 0.01) return null
  return signChar(x, t, id, cx, cy, size * k, { glyph: false, seed: o.seed ?? 31, mood: o.mood ?? 'happy', look: o.look, tears: o.tears ?? (id === 'pisces' ? 2 : 0), hops: o.hops })
}
/** a speech of little puffs of steam rising */
export function steam(x, t, cx, cy, { n = 4, col = '#f4f0ff', alpha = 1, spread = 60 } = {}) {
  for (let i = 0; i < n; i++) {
    const ph = ((t * 0.9 + i / n) % 1 + 1) % 1
    x.save(); x.globalAlpha = alpha * Math.sin(Math.PI * ph) * 0.85; x.fillStyle = col
    const px = cx + Math.sin(i * 2.1) * spread + Math.sin(ph * 6 + i) * 10, py = cy - ph * 140, s = 16 + ph * 26
    x.fillRect(px - s / 2, py - s / 2, s, s); x.restore()
  }
}
/** rain drops falling inside a box */
export function rain(x, t, l, r, top, bottom, { n = 14, col = SKYB } = {}) {
  for (let i = 0; i < n; i++) {
    const ph = ((t * 1.3 + i * 0.173) % 1 + 1) % 1
    const px = l + ((i * 97) % 100) / 100 * (r - l), py = top + ph * (bottom - top)
    x.fillStyle = INK; x.fillRect(px - 2, py - 2, 10, 26); x.fillStyle = col; x.fillRect(px, py, 6, 22)
  }
}
/** a postcard */
export function postcard(x, cx, cy, k, { rot = -0.06, text = 'wish you were here', w = 330, h = 220 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = CREAM; x.fillRect(-w / 2, -h / 2, w, h)
  // a little sunset picture on the left half
  x.fillStyle = '#ff9a4a'; x.fillRect(-w / 2 + 16, -h / 2 + 16, w / 2 - 24, h - 32)
  x.fillStyle = GOLD; x.beginPath(); x.arc(-w / 4, 6, 34, Math.PI, 0); x.fill()
  x.fillStyle = '#3aa0d8'; x.fillRect(-w / 2 + 16, 6, w / 2 - 24, h / 2 - 22)
  x.fillStyle = RED; x.fillRect(w / 2 - 62, -h / 2 + 16, 44, 52)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  const words = text.split(' '), lines = []; let cur = ''
  for (const wd of words) { if ((cur + ' ' + wd).trim().length > 10) { lines.push(cur.trim()); cur = wd } else cur += ' ' + wd }
  lines.push(cur.trim())
  lines.forEach((l, i) => x.fillText(l, 14, -20 + i * 32))
  x.restore()
}

// ── bitmaps
export const CONE = ['..PPPP..', '.PPWPPP.', 'PPPPPPPP', 'PPPPPPPP', 'TTTTTTTT', '.TCTCTT.', '.TTCTCT.', '..TTTT..', '..TCTT..', '...TT...', '...TT...']
export const coneCols = (P = PINK, W = CREAM) => ({ P, W, T: '#e0a85a', C: '#a8702e' })
export const BUS = ['YYYYYYYYYYYYYYYYYY', 'YWWYWWYWWYWWYWWYYY', 'YWWYWWYWWYWWYWWYWY', 'YYYYYYYYYYYYYYYYWY', 'YYYYYYYYYYYYYYYYYY', 'KKYYYYYYYYYYYYYYKK', '.KKK.........KKK..', '..K...........K...']
export const BUS_C = { Y: GOLD, W: SKYB, K: INK }
export const LUNCHBOX = ['....KKKK....', '....K..K....', 'RRRRRRRRRRRR', 'RWWWWWWWWWWR', 'RRRRRRRRRRRR', 'RRRRRRRRRRRR', 'RRRRRRRRRRRR', 'RRRRRRRRRRRR']
export const LUNCHBOX_C = { K: INK, R: RED, W: CREAM }
export const BACKPACK = ['...BBBB...', '..B....B..', '.BBBBBBBB.', 'BBBBBBBBBB', 'BBSSSSSSBB', 'BBSBBBBSBB', 'BBSSSSSSBB', 'BBBBBBBBBB', 'BBBBBBBBBB', '.BBBBBBBB.']
export const BACKPACK_C = { B: '#4a7bff', S: '#2a4fb0' }
export const DINO = ['.........BBBB.', '........BBBBBB', '........BB.BBB', '........BBBB..', 'B......BBBB...', 'BB...BBBBBB...', '.BBBBBBBBBB...', '..BBBBBBBB....', '...BBBBBB.....', '...B.B..B.....', '...B.B..B.....']
export const DINO_C = { B: BONE }
export const FISH = ['...OO...', '.OOOOO.O', 'OOKOOOOO', 'OOOOOOOO', '.OOOOO.O', '...OO...']
export const FISH_C = { O: ORANGE, K: INK }
export const CAMERA = ['....KKK.......', 'KKKKKKKKKKKKKK', 'KGGGGGGGGGGGRK', 'KGGGKKKKKGGGGK', 'KGGKSSSSSKGGGK', 'KGGKSWSSSKGGGK', 'KGGKSSSSSKGGGK', 'KGGGKKKKKGGGGK', 'KGGGGGGGGGGGGK', 'KKKKKKKKKKKKKK']
export const CAMERA_C = { K: INK, G: '#5a5478', S: SKYB, W: '#fff', R: RED }
export const FAN = ['...BBBBB...', '..B..B..B..', '.B...B...B.', 'B.BB.B.BB.B', 'B...BKB...B', 'B.BB.B.BB.B', '.B...B...B.', '..B..B..B..', '...BBBBB...', '.....K.....', '.....K.....', '...KKKKK...']
export const FAN_C = { B: GREY, K: INK }
export const MAGNIFIER = ['..KKKK....', '.KSSSSK...', 'KSSWSSSK..', 'KSWSSSSK..', 'KSSSSSSK..', 'KSSSSSSK..', '.KSSSSK...', '..KKKKBB..', '......BBB.', '.......BBB', '........BB']
export const MAGNIFIER_C = { K: INK, S: SKYB, W: '#fff', B: BROWN }
export const UMBRELLA = ['....RRRRRRR....', '..RRWWRRRWWRR..', '.RRWWWRRRWWWRR.', 'RRRRRRRRRRRRRRR', '.......K.......', '.......K.......', '.......K.......', '.......K.......', '.......K.......', '.......K.......', '......KK.......']
export const UMBRELLA_C = { R: '#ff6b5a', W: CREAM, K: INK }
export const CLOUD = ['....GGGG.......', '..GGGGGGGG.GG..', '.GGGGGGGGGGGGG.', 'GGGGGGGGGGGGGGG', 'GGGGGGGGGGGGGGG', '.GGGGGGGGGGGGG.']
export const CLOUD_C = { G: '#9a98b8' }
export const BED = ['WW.............', 'WW.............', 'WWPPPBBBBBBBBBB', 'WWPPPBBBBBBBBBB', 'WWBBBBBBBBBBBBB', 'WWWWWWWWWWWWWWW', 'W.............W']
export const BED_C = { W: WOOD, P: CREAM, B: '#8fb8ff' }
export const CAKE = ['....F..F..F....', '....C..C..C....', '..PPPPPPPPPPP..', '..PWPWPWPWPWP..', '..BBBBBBBBBBB..', '.BBBBBBBBBBBBB.', '.PPPPPPPPPPPPP.', 'BBBBBBBBBBBBBBB', 'BBBBBBBBBBBBBBB', 'KKKKKKKKKKKKKKK']
export const CAKE_C = { F: GOLD, C: CREAM, P: PINK, W: CREAM, B: WOOD, K: BROWN }
export const MOON = ['...YYYY..', '.YYYY....', 'YYYY.....', 'YYY......', 'YYY......', 'YYYY.....', '.YYYY....', '...YYYY..']
export const MOON_C = { Y: '#fff1a8' }
export const SUITCASE = ['....KKKK....', '....K..K....', 'SSSSSSSSSSSS', 'SSWSSSSSSWSS', 'SSWSSSSSSWSS', 'SSWSSSSSSWSS', 'SSWSSSSSSWSS', 'SSWSSSSSSWSS', 'SSSSSSSSSSSS', '.K........K.']
export const suitcaseCols = (S = ORANGE) => ({ K: INK, S, W: CREAM })
export const LAPTOP = ['..KKKKKKKKKKKK..', '..KSSSSSSSSSSK..', '..KSWWWWWWWSSK..', '..KSSSSSSSSSSK..', '..KSWWWWWSSSSK..', '..KSSSSSSSSSSK..', '..KKKKKKKKKKKK..', 'GGGGGGGGGGGGGGGG', '.GGGGGGGGGGGGGG.']
export const LAPTOP_C = { K: INK, S: SKYB, W: CREAM, G: '#a9a9bf' }
export const PLANT = ['....L.L....', '...LL.LL...', '..LLL.LLL..', '...LLLLL...', '.....L.....', '.....L.....', '.TTTTTTTTT.', '.TTTTTTTTT.', '..TTTTTTT..', '..TTTTTTT..', '...TTTTT...']
export const PLANT_C = { L: GREEN, T: '#d9774a' }
export const TOMATO = ['...GG...', '.RRGGRR.', 'RRWRRRRR', 'RWRRRRRR', 'RRRRRRRR', 'RRRRRRRR', '.RRRRRR.', '..RRRR..']
export const TOMATO_C = { G: GREEN, R: RED, W: '#ff9a9a' }
export const COUCH = ['.CCCCCCCCCCCCCC.', 'CCCCCCCCCCCCCCCC', 'CCCCCCCCCCCCCCCC', 'AAPPPPPPPPPPPPAA', 'AAPPPPPPPPPPPPAA', 'AAAAAAAAAAAAAAAA', 'K..............K']
export const COUCH_C = { C: '#7a5ac8', A: '#5a3ea8', P: '#9a7ae8', K: INK }
export const CROWN = ['Y...Y...Y', 'YY.YYY.YY', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY']
export const CROWN_C = { Y: GOLD, R: RED, B: SKYB }
export const PIN = ['.RRRR.', 'RRWRRR', 'RWRRRR', 'RRRRRR', '.RRRR.', '..KK..', '..KK..', '...K..']
export const PIN_C = { R: RED, W: '#ff9a9a', K: INK }
export const SUN = ['...Y..Y..Y...', '.............', 'Y...OOOOO...Y', '...OOOOOOO...', '..OOOOOOOOO..', 'Y.OOOOOOOOO.Y', '..OOOOOOOOO..']
export const SUN_C = { Y: GOLD, O: ORANGE }
export const MAP = ['PPPPPPPPPPPP', 'PGGPPPBBPPPP', 'PGGGPPBBBPPP', 'PPGPPPPBPPRP', 'PPPPGGPPPRRR', 'PBPPGGGPPPRP', 'PBBPPGPPPPPP', 'PPPPPPPPPPPP']
export const MAP_C = { P: '#f3d79a', G: '#7fd08a', B: SKYB, R: RED }
export const LETTER = ['KKKKKKKKKKKKKK', 'KWKWWWWWWWWKWK', 'KWWKWWWWWWKWWK', 'KWWWKWWWWKWWWK', 'KWWWWKRRKWWWWK', 'KWWWWWRRWWWWWK', 'KWWWWWWWWWWWWK', 'KKKKKKKKKKKKKK']
export const LETTER_C = { K: INK, W: CREAM, R: RED }
export const PLANE = ['.........K....', '........KK....', 'K......KWK....', 'KK....KWWKKKKK', 'KWKKKKWWWWWWWK', 'KWWWWWWWWWWKK.', 'KKKKKWWWKKK...', '.....KWK......', '......KK......']
export const PLANE_C = { K: INK, W: CREAM }
export const FRIES = ['.Y.Y.Y.Y.', '.Y.YYY.Y.', 'YYYYYYYYY', 'RRRRRRRRR', 'RRWRRRWRR', '.RRRRRRR.', '.RRRRRRR.', '..RRRRR..']
export const FRIES_C = { Y: GOLD, R: RED, W: CREAM }
export const MIC = ['.GGGG.', 'GgGGgG', 'GGgGGG', 'GgGGgG', '.GGGG.', '..KK..', '..KK..', '..KK..', '..KK..']
export const MIC_C = { G: '#c9c9d8', g: '#8a8aa0', K: '#2a2350' }
export const BOWL = ['P.PPP.WW.P', 'PPPPWWWWPP', 'BBBBBBBBBB', '.BBBBBBBB.', '..BBBBBB..', '...BBBB...']
export const BOWL_C = { P: PINK, W: CREAM, B: SKYB }
export const FLAG = ['KRRRRRR', 'KRRWRRR', 'KRRRRRR', 'KRRRRR.', 'K......', 'K......', 'K......', 'K......', 'K......', 'K......', 'K......']
export const FLAG_C = { K: INK, R: RED, W: CREAM }

export { clamp, prog, ease, lerp, drawBits, signChar, pop01 }
