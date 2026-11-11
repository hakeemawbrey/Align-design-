// props.js: the pixel props this film's cards use (a per-film copy; drawn on the signs3kit canvas, 1080×1920 coords).
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import { drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'

export const ORANGE = '#ffb34a', RED = '#e23d4e', WOOD = '#c98f2a', BROWN = '#8a4a2e', TEAL = '#2fc79a', CREAM = '#fff4e2', GREY = '#9aa5c4', GREEN = '#3fcf6a', NAVY = '#2a2350'

const shadow = (x, l, t, w, h) => { x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(l + 10, t + 12, w, h) }

/** a paper card / note / sign: optional title bar, lines of text (Inter 800), centred on (cx, cy) */
export function note(x, cx, cy, k, { w = 320, h = 220, bg = CREAM, ink = INK, title, titleBg = PINK, titleInk = INK, lines = [], size = 36, rot = 0.04, font = INTER, weight = 800, lineGap = 1.25, titleSize = 26 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  shadow(x, -w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  let top = -h / 2
  if (title) {
    x.fillStyle = titleBg; x.fillRect(-w / 2, -h / 2, w, titleSize + 26)
    x.fillStyle = titleInk; x.font = `700 ${titleSize}px ${MONO}`; x.fillText(title, 0, -h / 2 + (titleSize + 26) / 2 + 1)
    top += titleSize + 26
  }
  x.fillStyle = ink; x.font = `${weight} ${size}px ${font}`
  const lh = size * lineGap, mid = (top + h / 2) / 2
  lines.forEach((l, i) => x.fillText(l, 0, mid + (i - (lines.length - 1) / 2) * lh))
  x.restore()
}

/** a rubber stamp (outlined word, tilted) */
export function stamp(x, cx, cy, k, text, { col = RED, bg = CREAM, size = 42, rot = -0.18 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.font = `800 ${size}px ${INTER}`
  const w = x.measureText(text).width + 40, h = size + 34
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.strokeStyle = col; x.lineWidth = 8; x.strokeRect(-w / 2, -h / 2, w, h)
  x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 3)
  x.restore()
}

/** a phone: clock on top, then a message card (head in mono, body in Inter) */
export function phone(x, cx, cy, k, { time = '9:41', head = '', body = [], bodyBg = LAV, size = 30, rot = 0.06, foot } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  shadow(x, -124, -194, 248, 388)
  x.fillStyle = INK; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = NAVY; x.fillRect(-114, -184, 228, 368)
  x.fillStyle = '#140c30'; x.fillRect(-102, -160, 204, 320)
  x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `700 40px ${MONO}`; x.fillText(time, 0, -116)
  const bh = 44 + body.length * size * 1.2
  x.fillStyle = bodyBg; x.fillRect(-94, -64, 188, bh)
  x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.fillText(head, 0, -40)
  x.font = `800 ${size}px ${INTER}`
  body.forEach((l, i) => x.fillText(l, 0, -6 + i * size * 1.2 + size * 0.4))
  if (foot) { x.fillStyle = BONE; x.font = `700 20px ${MONO}`; x.fillText(foot, 0, 128) }
  x.restore()
}

/** a dating-profile card for a sign, with an optional stamp across it */
export function profile(x, t, cx, cy, k, sign, { name, color = SKYB, mood = 'happy', st = 0, stampText = 'MATCH', stampCol = TEAL, rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  shadow(x, -125, -160, 250, 320)
  x.fillStyle = INK; x.fillRect(-131, -166, 262, 332)
  x.fillStyle = NAVY; x.fillRect(-125, -160, 250, 320)
  x.fillStyle = '#140c30'; x.fillRect(-111, -146, 222, 230)
  signChar(x, t, sign, 0, -30, 150, { mood, seed: 52, glyph: false, glow: 0.8 })
  x.fillStyle = color; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(name || sign.toUpperCase(), 0, 122)
  x.restore()
  if (st > 0.01) stamp(x, cx, cy + 50, st * k, stampText, { col: stampCol, size: 40 })
}

/** a whiteboard on legs with a few lines of marker text */
export function board(x, cx, cy, k, lines, { w = 360, h = 260, size = 34, col = INK, rot = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 + 30, h / 2 - 6, 14, 150); x.fillRect(w / 2 - 44, h / 2 - 6, 14, 150)
  x.fillStyle = GREY; x.fillRect(-w / 2 + 34, h / 2, 6, 140); x.fillRect(w / 2 - 40, h / 2, 6, 140)
  shadow(x, -w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
  x.fillStyle = '#f4f6ff'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => { x.fillStyle = Array.isArray(l) ? l[1] : col; x.font = `800 ${size}px ${INTER}`; x.fillText(Array.isArray(l) ? l[0] : l, 0, (i - (lines.length - 1) / 2) * size * 1.35) })
  x.restore()
}

/** a checklist that ticks off n items over time */
export function checklist(x, cx, cy, k, items, ticked, { title = 'TO DO', w = 340, size = 30, rot = 0.04, titleBg = MINT } = {}) {
  if (k <= 0.01) return
  const h = 70 + items.length * size * 1.6 + 20
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  shadow(x, -w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
  x.fillStyle = CREAM; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = titleBg; x.fillRect(-w / 2, -h / 2, w, 56)
  x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -h / 2 + 29)
  items.forEach((it, i) => {
    const y = -h / 2 + 90 + i * size * 1.6
    x.fillStyle = INK; x.fillRect(-w / 2 + 22, y - 18, 36, 36); x.fillStyle = CREAM; x.fillRect(-w / 2 + 27, y - 13, 26, 26)
    if (i < ticked) { x.fillStyle = TEAL; x.fillRect(-w / 2 + 31, y - 2, 8, 8); x.fillRect(-w / 2 + 37, y + 2, 8, 8); x.fillRect(-w / 2 + 43, y - 6, 8, 8); x.fillRect(-w / 2 + 49, y - 12, 8, 8) }
    x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'left'; x.fillText(it, -w / 2 + 76, y + 2)
  })
  x.restore()
}

/** a wall calendar page */
export function calendar(x, cx, cy, k, { month = 'SAT', big = '14', note: n = '', noteCol = PINK, rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  shadow(x, -130, -150, 260, 300)
  x.fillStyle = INK; x.fillRect(-138, -158, 276, 316)
  x.fillStyle = CREAM; x.fillRect(-130, -150, 260, 300)
  x.fillStyle = RED; x.fillRect(-130, -150, 260, 70)
  x.fillStyle = CREAM; x.font = `700 36px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(month, 0, -114)
  x.fillStyle = INK; x.font = `800 120px ${INTER}`; x.fillText(big, 0, 10)
  if (n) { x.fillStyle = noteCol; x.fillRect(-116, 84, 232, 52); x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.fillText(n, 0, 111) }
  x.restore()
}

/** a door (closed → open by p), with optional little locks */
export function door(x, cx, cy, k, p, { locks = 0, open = 0, col = '#6b4fd0', sign } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -220, 260, 440)
  x.fillStyle = '#fff1b0'; x.fillRect(-120, -210, 240, 430)         // the light behind the door
  const w = 240 * (1 - 0.8 * clamp(p))
  x.fillStyle = INK; x.fillRect(-124, -214, w + 8, 438)
  x.fillStyle = col; x.fillRect(-120, -210, w, 430)
  x.fillStyle = 'rgba(255,255,255,0.12)'; x.fillRect(-100, -186, w - 40, 160); x.fillRect(-100, 0, w - 40, 190)
  if (p < 0.5) { x.fillStyle = GOLD; x.fillRect(-120 + w - 40, 0, 20, 20) }
  for (let i = 0; i < locks; i++) {
    const ly = -170 + i * 52, isOpen = i < open
    x.fillStyle = INK; x.fillRect(-120 + w - 62, ly - 4, 44, 40)
    x.fillStyle = isOpen ? MINT : GREY; x.fillRect(-120 + w - 58, ly + 6, 36, 26)
    x.strokeStyle = INK; x.lineWidth = 6; x.beginPath(); x.arc(-120 + w - 40, ly + 4 - (isOpen ? 8 : 0), 11, Math.PI, 0); x.stroke()
  }
  x.restore()
  if (sign) note(x, cx, cy + 260 * k, k, { w: 300, h: 70, lines: [sign], size: 28, bg: GOLD, rot: -0.03 })
}

/** a twelve-house birth chart wheel with a word in the middle */
export function chart(x, t, cx, cy, k, word = '', { r = 170, wordSize = 44 } = {}) {
  if (k <= 0.01) return
  const COLS = ['#ff6b6b', '#7dffb0', '#ffd23a', '#8fe3ff', ORANGE, '#c9f27a', PINK, '#b07dff', '#ff9f5a', GREY, SKYB, LAV]
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.15)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 10, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = COLS[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, i * Math.PI / 6, (i + 1) * Math.PI / 6); x.closePath(); x.fill() }
  x.rotate(-t * 0.15)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r * 0.55, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, r * 0.5, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.font = `800 ${wordSize}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(word, 0, 3)
  x.restore()
}

/** a loading / progress bar */
export function bar(x, cx, cy, k, p, { w = 340, label: lab = '', col = MINT, rot = -0.03 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  shadow(x, -w / 2, -40, w, 80)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -48, w + 16, 96)
  x.fillStyle = '#140c30'; x.fillRect(-w / 2, -40, w, 80)
  x.fillStyle = col; x.fillRect(-w / 2 + 8, -32, (w - 16) * clamp(p), 64)
  x.fillStyle = BONE; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(`${lab}${Math.round(clamp(p) * 100)}%`, 0, 2)
  x.restore()
}

/** a thought cloud with text */
export function thought(x, cx, cy, k, text, { size = 34, col = BONE } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `800 ${size}px ${INTER}`
  const lines = String(text).split('|').map(s => s.trim())
  const w = Math.max(...lines.map(l => x.measureText(l).width)) + 70, h = lines.length * size * 1.2 + 50
  const blob = (bx, by, r, c) => { x.fillStyle = c; x.beginPath(); x.arc(bx, by, r, 0, Math.PI * 2); x.fill() }
  for (const [c, d] of [[INK, 6], [col, 0]]) {
    blob(-w / 2 + 40, 0, h / 2 + d, c); blob(w / 2 - 40, 0, h / 2 + d, c); blob(0, -h / 4, h / 2 + 10 + d, c)
    x.fillStyle = c; x.fillRect(-w / 2 + 40, -h / 2 - d, w - 80, h + 2 * d)
    blob(-w / 2 + 10, h / 2 + 30, 16 + d, c); blob(-w / 2 - 14, h / 2 + 64, 10 + d, c)
  }
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, (i - (lines.length - 1) / 2) * size * 1.2 + 2))
  x.restore()
}

/** a framed picture on the wall (contents drawn by fn(x) in a 220×170 box centred on 0,0) */
export function frame(x, cx, cy, k, fn, { rot = 0, caption, col = GOLD } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  shadow(x, -140, -115, 280, 230)
  x.fillStyle = INK; x.fillRect(-148, -123, 296, 246)
  x.fillStyle = col; x.fillRect(-140, -115, 280, 230)
  x.fillStyle = '#140c30'; x.fillRect(-116, -91, 232, 182)
  x.save(); x.beginPath(); x.rect(-116, -91, 232, 182); x.clip(); fn(x); x.restore()
  if (caption) { x.fillStyle = INK; x.fillRect(-90, 108, 180, 40); x.fillStyle = CREAM; x.fillRect(-86, 112, 172, 32); x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(caption, 0, 129) }
  x.restore()
}

/** a simple table top with a cloth, for food props */
export function tableTop(x, cx, cy, k, { w = 360, cloth = RED } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, 6, w, 40)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -16, w + 16, 52)
  x.fillStyle = CREAM; x.fillRect(-w / 2, -10, w, 40)
  x.fillStyle = cloth; for (let i = 0; i < w / 40; i++) x.fillRect(-w / 2 + i * 40, 22, 20, 8)
  x.fillStyle = INK; x.fillRect(-w / 2 + 40, 36, 18, 120); x.fillRect(w / 2 - 58, 36, 18, 120)
  x.fillStyle = WOOD; x.fillRect(-w / 2 + 44, 36, 10, 116); x.fillRect(w / 2 - 54, 36, 10, 116)
  x.restore()
}

/** confetti specks raining down from t0 */
export function confetti(x, t, t0, cx, cy, { n = 26, spread = 420, cols = [PINK, GOLD, MINT, SKYB, LAV], fall = 520 } = {}) {
  const dt = t - t0
  if (dt < 0 || dt > 2.6) return
  x.save(); x.globalAlpha = 1 - ease.inQuad(clamp((dt - 1.8) / 0.8))
  for (let i = 0; i < n; i++) {
    const sx = cx + (((i * 73) % 100) / 100 - 0.5) * spread, sy = cy - 120 + ((i * 37) % 60) + dt * fall * (0.6 + (i % 5) * 0.1)
    x.fillStyle = cols[i % cols.length]; x.save(); x.translate(sx + Math.sin(dt * 5 + i) * 18, sy); x.rotate(dt * 4 + i); x.fillRect(-7, -4, 14, 8); x.restore()
  }
  x.restore()
}

// ── bitmaps (drawBits: '.' = empty, letters keyed to the colour maps)
export const BM = {
  FLAG: { bm: ['K.........', 'KGGGGGGG..', 'KGGgGGGGG.', 'KGGGGGGGGG', 'KGGGGgGGG.', 'KGGGGGGG..', 'K.........', 'K.........', 'K.........', 'K.........', 'K.........', 'K.........'], c: { K: '#c9c9d8', G: GREEN, g: '#9dffb8' } },
  TROPHY: { bm: ['YYYYYYYYYY', 'YWYYYYYYYY', 'YWYYYYYYYY', '.YYYYYYYY.', '..YYYYYY..', '...YYYY...', '....YY....', '....YY....', '...YYYY...', '..BBBBBB..', '..BBBBBB..'], c: { Y: GOLD, W: '#fff7cf', B: BROWN } },
  MEDAL: { bm: ['RR....RR', '.RR..RR.', '..RRRR..', '...YY...', '..YYYY..', '.YYWYYY.', '.YYYYYY.', '.YYYYYY.', '..YYYY..'], c: { R: RED, Y: GOLD, W: '#fff7cf' } },
  SUITCASE: { bm: ['...KKKK...', '...K..K...', 'BBBBBBBBBB', 'BYBBBBBBYB', 'BBBBBBBBBB', 'BBBBBBBBBB', 'BYBBBBBBYB', 'BBBBBBBBBB', '.K......K.'], c: { K: INK, B: ORANGE, Y: GOLD } },
  PLANE: { bm: ['......WW.....', '......WWW....', 'W.....WWWW...', 'WWWWWWWWWWWWW', 'WWWWWWWWWWWWS', 'W.....WWWW...', '......WWW....', '......WW.....'], c: { W: '#ffffff', S: SKYB } },
  UMBRELLA: { bm: ['....PPPP....', '..PPPPPPPP..', '.PPWPPPPPPP.', 'PPPPPPPPPPPP', 'P..P..P..P.P', '.....K......', '.....K......', '.....K......', '.....K......', '.....K.K....', '......K.....'], c: { P: PINK, W: '#ffd0e0', K: INK } },
  MUG: { bm: ['.WWWWWW...', 'WRRRRRRW..', 'WRRRRRRWWW', 'WRRWRRRW.W', 'WRRRRRRWWW', 'WRRRRRRW..', '.WWWWWW...'], c: { W: CREAM, R: TEAL } },
  GLASS: { bm: ['..R.....', '...R....', 'WWWRWWWW', 'W..R...W', 'WBBRBBBW', 'WBBBBBBW', 'WBBBBBBW', 'WBBBBBBW', '.WWWWWW.'], c: { W: '#e8f6ff', B: SKYB, R: RED } },
  CAKE: { bm: ['....Y....', '....W....', '.PPPPPPP.', 'PWPWPWPWP', 'PPPPPPPPP', 'CCCCCCCCC', 'CCCCCCCCC', 'GGGGGGGGG'], c: { Y: GOLD, W: CREAM, P: PINK, C: '#c98f6a', G: '#c9c9d8' } },
  LAPTOP: { bm: ['.GGGGGGGGGGGG.', '.GSSSSSSSSSSG.', '.GSSSSSSSSSSG.', '.GSSSSSSSSSSG.', '.GSSSSSSSSSSG.', '.GGGGGGGGGGGG.', 'KKKKKKKKKKKKKK', '.KKKKKKKKKKKK.'], c: { G: GREY, S: '#2e5d8f', K: '#6b6f85' } },
  BUTTERFLY: { bm: ['PP...PP', 'PPP.PPP', 'PWPKPWP', '.PPKPP.', 'PPPKPPP', 'PP.K.PP'], c: { P: PINK, W: '#ffffff', K: INK } },
  SNAIL: { bm: ['.......K.K', '..OOO..K.K', '.OoooO.GGG', 'OoOOoOGGGG', 'OoOooOGGG.', '.OOOO.GGG.', 'GGGGGGGGG.'], c: { O: ORANGE, o: GOLD, G: '#9be08a', K: INK } },
  ENVELOPE: { bm: ['WWWWWWWWWWWW', 'WPWWWWWWWWPW', 'WWPWWWWWWPWW', 'WWWPWHHWPWWW', 'WWWWPHHPWWWW', 'WWWWWPPWWWWW', 'WWWWWWWWWWWW', 'WWWWWWWWWWWW'], c: { W: CREAM, P: GREY, H: RED } },
  KEY: { bm: ['.YYY........', 'YY.YY.......', 'Y...YYYYYYYY', 'YY.YY....Y.Y', '.YYY.....Y.Y'], c: { Y: GOLD } },
  BULB: { bm: ['..YYYY..', '.YYWYYY.', 'YYWYYYYY', 'YYYYYYYY', 'YYYYYYYY', '.YYYYYY.', '..YYYY..', '..GGGG..', '..GGGG..', '...GG...'], c: { Y: '#fff1b0', W: '#ffffff', G: GREY } },
  SPROUT: { bm: ['GG....GG', 'GGG..GGG', '.GGGGGG.', '...GG...', '...GG...'], c: { G: GREEN } },
  GLOBE: { bm: ['...BBBB...', '.BBGGBBBB.', 'BBGGGGBBBB', 'BGGGGBBBGB', 'BBGGBBBGGB', 'BBBBBBBGGB', 'BBBGBBBBBB', '.BBGGBBBB.', '...BBBB...', '....KK....', '..KKKKKK..'], c: { B: SKYB, G: GREEN, K: BROWN } },
  HOURGLASS: { bm: ['KKKKKKKK', '.W....W.', '.WSSSSW.', '..WSSW..', '...WW...', '..W..W..', '.W.SS.W.', '.WSSSSW.', 'KKKKKKKK'], c: { K: WOOD, W: '#e8f6ff', S: GOLD } },
  CONE: { bm: ['.PPPP.', 'PPWPPP', 'PPPPPP', '.CCCC.', '.CCCC.', '..CC..', '..CC..'], c: { P: PINK, W: '#ffffff', C: WOOD } },
  CONE2: { bm: ['.MMMM.', 'MMWMMM', 'MMMMMM', '.CCCC.', '.CCCC.', '..CC..', '..CC..'], c: { M: MINT, W: '#ffffff', C: WOOD } },
  SHOE: { bm: ['..RRR.......', '..RWR.......', '..RRRRRRR...', '.RRRRRRRRRR.', 'RRRRRRRRRRRR', 'WWWWWWWWWWWW'], c: { R: RED, W: CREAM } },
  CASSETTE: { bm: ['KKKKKKKKKKKK', 'KPPPPPPPPPPK', 'KPWWWWWWWWPK', 'KPPPPPPPPPPK', 'KPKKPPPPKKPK', 'KPKKPPPPKKPK', 'KPPPPPPPPPPK', 'KKKKKKKKKKKK'], c: { K: INK, P: PINK, W: CREAM } },
  BOOK: { bm: ['LLLLLLLLLL', 'LWWWWWWWWL', 'LWLLLLLLWL', 'LWWWWWWWWL', 'LWLLLLLWWL', 'LWWWWWWWWL', 'LWLLLLLLWL', 'LWWWWWWWWL', 'LLLLLLLLLL'], c: { L: LAV, W: CREAM } },
  THERMO: { bm: ['.WW.', 'WRRW', 'WRRW', 'WRRW', 'WRRW', 'WRRW', 'RRRR', 'RRRR', '.RR.'], c: { W: '#e8f6ff', R: RED } },
  KETTLE: { bm: ['....KK....', '...KKKK...', '.SSSSSSSS.', 'SSSWSSSSSS', 'SSWSSSSSSSS', 'SSSSSSSSSS.', 'SSSSSSSSSS', '.SSSSSSSS.'], c: { K: INK, S: '#c9c9d8', W: '#ffffff' } },
  SOFA: { bm: ['..PPPPPPPPPPPP..', '.PPPPPPPPPPPPPP.', 'PPPPPPPPPPPPPPPP', 'PPWWWWWWWWWWWWPP', 'PPWWWWWWWWWWWWPP', 'PPPPPPPPPPPPPPPP', '.B............B.'], c: { P: LAV, W: '#d9c8ff', B: BROWN } },
  BINOC: { bm: ['KKK..KKK', 'KSK..KSK', 'KKKKKKKK', 'KKK..KKK', 'KKK..KKK'], c: { K: INK, S: SKYB } },
  RAINBOW: { bm: ['....RRRRRR....', '..RROOOOOORR..', '.ROOYYYYYYOOR.', 'ROYYGGGGGGYYOR', 'ROYGG....GGYOR', 'OYG........GYO', 'YG..........GY'], c: { R: RED, O: ORANGE, Y: GOLD, G: GREEN } },
  FLOWER: { bm: ['.P.P.', 'PPYPP', '.PPP.', '..G..', '.GG..', '..G..'], c: { P: PINK, Y: GOLD, G: GREEN } },
  PLANT: { bm: ['G.GG.G', 'GGGGGG', '.GGGG.', '..GG..', 'OOOOOO', '.OOOO.', '.OOOO.'], c: { G: GREEN, O: ORANGE } },
  BOX: { bm: ['BBBBBBBBBBBB', 'BbbbbTTbbbbB', 'BBBBBTTBBBBB', 'BBBBBBBBBBBB', 'BBBBBBBBBBBB', 'BBBBBBBBBBBB', 'BBBBBBBBBBBB'], c: { B: '#d9a86a', b: '#c08a4e', T: '#e8d9b0' } },
  TICKET: { bm: ['YYYYYYYYYYYYYY', 'YKYYYYYYYYYKYY', 'Y.YKKKKKKKY.YY', 'YKYYYYYYYYYKYY', 'YYYYYYYYYYYYYY'], c: { Y: GOLD, K: BROWN } },
  CHAIR: { bm: ['BBBBBB', 'B....B', 'B....B', 'BBBBBB', 'BBBBBB', 'B....B', 'B....B'], c: { B: WOOD } },
  SHIRT: { bm: ['PP.....PP', 'PPPP.PPPP', 'PPYPPPPPP', '.PPPPPYP.', '.PPYPPPP.', '.PPPPYPP.', '.PYPPPPP.', '.PPPPPPP.'], c: { P: '#ff7aa8', Y: GOLD } },
  CLIPBOARD: { bm: ['...KKKK...', 'BBBKKKKBBB', 'BWWWWWWWWB', 'BWKKKKKWWB', 'BWWWWWWWWB', 'BWKKKKKKWB', 'BWWWWWWWWB', 'BWKKKKWWWB', 'BWWWWWWWWB', 'BBBBBBBBBB'], c: { K: INK, B: BROWN, W: CREAM } },
  SKATE: { bm: ['.WWWWWWWWWWWW.', 'WWWWWWWWWWWWWW', '..K........K..', '.KKK......KKK.'], c: { W: ORANGE, K: INK } },
  LAMP: { bm: ['..YYYYY..', '.YGYGYGY.', 'YGYGYGYGY', '....K....', '....K....', '...PPP...', '..PPPPP..', '.PPPPPPP.'], c: { Y: '#9be08a', G: ORANGE, K: INK, P: '#c06bd8' } },
  BUCKET: { bm: ['K........K', '.K......K.', '.GGGGGGGG.', '.GSSSSSSG.', '.GSSSSSSG.', '..GSSSSG..', '..GGGGGG..'], c: { K: INK, G: GREY, S: SKYB } },
  ICE: { bm: ['SSSSS', 'SWSSS', 'SSSSS', 'SSSSS'], c: { S: SKYB, W: '#ffffff' } },
  KART: { bm: ['....KW....', '....KWK...', '....K.....', '.RRRRRRRR.', 'RRRRRRRRRR', 'KK......KK', 'KK......KK'], c: { R: RED, K: INK, W: CREAM } },
  GLOVE: { bm: ['..YY.YY.', '.YYY.YYY', '.YYYYYYY', 'YYYYYYYY', 'YYYYYYYY', '.YYYYYY.', '..WWWW..'], c: { Y: '#ff6b5a', W: CREAM } },
  SOCK: { bm: ['.WWWW.', '.WRRW.', '.WWWW.', '.WRRW.', '.WWWWWWW', '.WWWWWWWW', '..WWWWWW'], c: { W: CREAM, R: RED } },
  CAMERA: { bm: ['..KKK.....', 'KKKKKKKKKK', 'KGGGGGGGGK', 'KGGKKKGGGK', 'KGKSSSKGGK', 'KGKSWSKGGK', 'KGKSSSKGGK', 'KGGKKKGGGK', 'KKKKKKKKKK'], c: { K: INK, G: GREY, S: SKYB, W: '#ffffff' } },
}
export function bits(x, name, cx, cy, cell, opts) { const b = BM[name]; drawBits(x, b.bm, b.c, cx, cy, cell, opts) }

/** a small flag pinned beside a card's gag (the green-flag motif) */
export function greenFlag(x, t, cx, cy, k) { if (k > 0.01) bits(x, 'FLAG', cx, cy, 12 * k, { rot: 0.06 * Math.sin(t * 3) }) }

export { clamp, prog, ease, lerp }

/** long hooks: wrap a film's build so its title (the popText box at top 150) shrinks to fit the 940 px measure, never grows */
export function fitTitleScenes(SCENES, maxW = 940) {
  const build0 = SCENES[0]
  return [async stage => {
    const r = await build0(stage)
    const box = [...r.root.querySelectorAll('div')].find(d => d.style.top === '150px')
    if (box) {
      let widest = 0, cur = 0
      for (const n of box.childNodes) {
        if (n.nodeName === 'BR') { widest = Math.max(widest, cur); cur = 0; continue }
        cur += n.offsetWidth + 0.24 * (parseFloat(n.style?.fontSize) || 92)
      }
      widest = Math.max(widest, cur)
      if (widest > maxW) {
        const k = (maxW - 8) / widest
        box.style.fontSize = (parseFloat(getComputedStyle(box).fontSize) * k) + 'px'
        for (const n of box.childNodes) if (n.style && n.style.fontSize) n.style.fontSize = (parseFloat(n.style.fontSize) * k) + 'px'
      }
    }
    return r
  }]
}
