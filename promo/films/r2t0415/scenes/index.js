// r2t0415: star_talk, ROLL CALL, "The signs at | a *pumpkin patch.*" (~62 s vertical, signs3kit social cut, music: lofi · F). Ending: lesson.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', CREAM = '#fff4e2', GREY = '#9aa5c4'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const K = (t, P, d, dur = 0.3, s = 2) => pop01(t, P.t0 + d, dur, s)
const ST = { x: -170 }

/** a sheet of paper / list with an optional coloured header */
function paper(x, cx, cy, k, lines, { w = 330, size = 30, rot = 0.04, head = null, headBg = GOLD } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.45, h = lines.length * lh + 40 + (head ? 60 : 0)
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = BONE; x.fillRect(-w / 2, -h / 2, w, h)
  let y0 = -h / 2 + 20
  if (head) { x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 60); x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 31); y0 += 60 }
  x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach((l, i) => { if (typeof l === 'function') l = l(); if (l) x.fillText(l, -w / 2 + 24, y0 + lh * (i + 0.5)) })
  x.restore()
}
/** a pixel phone with a header bar and chat chips: lines = [[text, colour, k, right?], …] */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 24px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 64); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
/** a square sticky note with a few lines of text */
function note(x, cx, cy, k, lines, { rot = -0.05, bg = '#ffe76a', size = 34 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -134, 296, 296)
  x.fillStyle = INK; x.fillRect(-152, -152, 304, 304); x.fillStyle = bg; x.fillRect(-144, -144, 288, 288)
  x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, (i - (lines.length - 1) / 2) * size * 1.25))
  x.restore()
}
/** a crossed-out sticker swapped for a new one at local time `at` */
function swapLabel(x, cx, cy, lt, at, from, to, { size = 34, fromBg = GREY, toBg = MINT } = {}) {
  if (lt < at) { L(x, cx, cy, from, 1, fromBg, -0.04, size); return }
  const p = clamp((lt - at) / 0.25)
  if (p < 1) {
    L(x, cx, cy, from, 1, fromBg, -0.04, size)
    x.save(); x.strokeStyle = RED; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); x.moveTo(cx - 150, cy + 10); x.lineTo(cx - 150 + 300 * p, cy - 10); x.stroke(); x.restore()
    return
  }
  L(x, cx, cy, to, pop01(lt, at + 0.3, 0.3, 2.4), toBg, 0.04, size)
}
/** little "z z z" drifting up */
function zzz(x, t, cx, cy, { alpha = 1, size = 40 } = {}) {
  x.save(); x.fillStyle = BONE; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'
  for (let i = 0; i < 3; i++) { const ph = ((t * 0.6 + i / 3) % 1 + 1) % 1; x.globalAlpha = alpha * Math.sin(Math.PI * ph); x.fillText('z', cx + i * 26 + Math.sin(ph * 6) * 8, cy - ph * 120) }
  x.restore()
}
const DROP = ['.B.', 'BBB', 'BBB', '.B.']
function rain(x, t, cx, cy, w, h, n, col = SKYB, rate = 1.2) {
  for (let i = 0; i < n; i++) {
    const ph = ((t * rate + i * 0.173) % 1 + 1) % 1
    drawBits(x, DROP, { B: col }, cx - w / 2 + ((i * 97) % w), cy + ph * h, 7, { alpha: Math.sin(Math.PI * ph) })
  }
}
/** paper confetti falling */
function confetti(x, t, cx, cy, t0, { n = 20, spread = 320, h = 480 } = {}) {
  const lt = t - t0
  if (lt <= 0) return
  const COLS = [GOLD, PINK, MINT, SKYB, ORANGE, LAV]
  for (let i = 0; i < n; i++) {
    const ph = (lt * 0.55 + i * 0.137) % 1
    const px = cx + Math.sin(i * 2.71) * spread + Math.sin(t * 2 + i) * 18, py = cy - h / 2 + ph * h
    x.save(); x.translate(px, py); x.rotate(t * 3 + i); x.globalAlpha = Math.sin(Math.PI * ph)
    x.fillStyle = COLS[i % COLS.length]; x.fillRect(-9, -5, 18, 10); x.restore()
  }
}
/** a plain rounded box with centred text lines (screens, signs, tickets) */
function card(x, cx, cy, k, w, h, lines, { bg = BONE, fg = INK, rot = 0.04, size = 32, font = INTER, weight = 800, head = null, headBg = GOLD } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  let top = -h / 2, hh = h
  if (head) { x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 56); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 29); top += 56; hh -= 56 }
  x.fillStyle = fg; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, top + hh / 2 + (i - (lines.length - 1) / 2) * size * 1.3))
  x.restore()
}

// ── shared pixel props
const CROWN = ['Y...Y...Y', 'YY.YYY.YY', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY']
const CROWN_C = { Y: GOLD, R: RED, B: SKYB }
const CLOUD = ['....CCCC......', '..CCCCCCCC....', '.CCCCCCCCCCCC.', 'CCCCCCCCCCCCCC', 'CCCCCCCCCCCCCC', '.CCCCCCCCCCCC.']
const SUN = ['...Y..Y..Y...', '.............', 'Y...OOOOO...Y', '...OOOOOOO...', '..OOOOOOOOO..', 'Y.OOOOOOOOO.Y', '..OOOOOOOOO..', '...OOOOOOO...', 'Y...OOOOO...Y', '.............', '...Y..Y..Y...']
const MUG = ['.S.S....', 'S.S.....', 'WWWWWW..', 'WCCCCWWW', 'WCCCCW.W', 'WCCCCW.W', 'WCCCCWWW', 'WCCCCW..', '.WWWW...']
const LAPTOP = ['.KKKKKKKKKK.', '.KSSSSSSSSK.', '.KSBBBBBBSK.', '.KSBBBBBBSK.', '.KSSSSSSSSK.', '.KKKKKKKKKK.', 'GGGGGGGGGGGG', 'GGGGGGGGGGGG']
const LAPTOP_C = { K: INK, S: '#6fc3ff', B: '#bfe8ff', G: '#9aa5c4' }
const PILLOW = ['.PPPPPPPPPP.', 'PPPPPPPPPPPP', 'PPWPPPPPPPPP', 'PPPPPPPPPPPP', 'PPPPPPPPPPPP', '.PPPPPPPPPP.']
const GIFT = ['...R...R...', '....R.R....', 'GGGGGRGGGGG', 'GGGGGRGGGGG', '.BBBBRBBBB.', '.BBBBRBBBB.', '.BBBBRBBBB.', '.BBBBRBBBB.']
const GIFT_C = { R: RED, G: GOLD, B: PINK }
const BAG = ['...KKKK...', '..K....K..', '.BBBBBBBB.', 'BBBBBBBBBB', 'BBBWWWWBBB', 'BBBWWWWBBB', 'BBBBBBBBBB', 'BBBBBBBBBB']
const HOUSE = ['.....R.....', '....RRR....', '...RRRRR...', '..RRRRRRR..', '.RRRRRRRRR.', '..WWWWWWW..', '..WBBWWDW..', '..WBBWWDW..', '..WWWWWDW..']
const HOUSE_C = { R: RED, W: CREAM, B: SKYB, D: '#8a4a2e' }
const BOOK = ['KKKKKKKKKK', 'KPPPPKPPPK', 'KPPPPKPPPK', 'KPPPPKPPPK', 'KPPPPKPPPK', 'KPPPPKPPPK', 'KKKKKKKKKK']
const PLANT = ['..G..G..', '.GGG.GG.', 'GG.GGG.G', '.GGGGGG.', '...GG...', '.TTTTTT.', '.TTTTTT.', '..TTTT..', '..TTTT..']
const PLANT_C = { G: '#5bd18b', T: '#c46a3a' }
const CLOCK = ['..KKKKK..', '.KWWWWWK.', 'KWWWKWWWK', 'KWWWKWWWK', 'KWWWKKKWK', 'KWWWWWWWK', 'KWWWWWWWK', '.KWWWWWK.', '..KKKKK..']
const CLOCK_C = { K: INK, W: CREAM }
const STOPSIGN = ['..RRRR..', '.RRRRRR.', 'RRRRRRRR', 'RWWWWWWR', 'RRRRRRRR', '.RRRRRR.', '..RRRR..', '...KK...', '...KK...', '...KK...', '...KK...']
const PUMPKIN = ['.....G.....', '....GG.....', '..OOOOOOO..', '.OOoOOOoOO.', 'OOOoOOOoOOO', 'OOOoOOOoOOO', 'OOOoOOOoOOO', '.OOoOOOoOO.', '..OOOOOOO..']
const PUMPKIN_C = { G: '#5bd18b', O: ORANGE, o: '#d9792a' }
const HEADPH = ['..KKKKKK..', '.K......K.', 'K........K', 'K........K', 'PP......PP', 'PP......PP', 'PP......PP']
const TISSUE = ['...WW...', '..WWWW..', 'BBBBBBBB', 'BWWBBWWB', 'BBBBBBBB', 'BBBBBBBB']
const TISSUE_C = { W: '#ffffff', B: SKYB }
const BLANKET = ['LLLLLLLLLLLL', 'LPLPLPLPLPLP', 'LLLLLLLLLLLL', 'PLPLPLPLPLPL', 'LLLLLLLLLLLL']
const SNACK = ['.KKKKKK.', 'KYYYYYYK', 'KYRRRRYK', 'KYRWWRYK', 'KYRRRRYK', 'KYYYYYYK', '.KKKKKK.']
const SNACK_C = { K: INK, Y: GOLD, R: RED, W: CREAM }
const TEA = ['..S.S..', '.S.S...', 'KKKKKKK', 'KWWWWWKK', 'KWWWWWK.K', 'KWWWWWKK', '.KWWWK..', '..KKK...']
const TEA_C = { K: INK, W: '#c9f0d8', S: CREAM }
//   ♈ picked one in four seconds · ♉ skipped pumpkins, went to the pie · ♊ carved two faces on one · ♋ tucked in the saddest one
//   ♌ awarded themself first prize · ♍ brought a pumpkin checklist · ♎ thirty finalists · ♏ wore all black to a pumpkin patch
//   ♐ lost in the corn maze on purpose · ♑ asked about profit margins · ♒ painted theirs glow-in-the-dark · ♓ cried leaving the others
const ACC = '#ffb34a'
const PIE = ['....CCCC....', '..CCYYYYCC..', '.CYYOYYOYYC.', 'CYYYYYYYYYYC', 'CCCCCCCCCCCC', '.KKKKKKKKKK.']
const PIE_C = { C: '#e8b86a', Y: ORANGE, O: '#d9792a', K: '#c46a3a' }
const RIBBON = ['.YYYYY.', 'YYYYYYY', 'YYRRRYY', 'YYRRRYY', 'YYYYYYY', '.YYYYY.', '.RR.RR.', '.RR.RR.', 'RR...RR']
const MAZE = ['GGGGGGGGGGG', 'G...G.....G', 'G.G.G.GGG.G', 'G.G...G...G', 'G.GGGGG.GGG', 'G.....G...G', 'GGG.G.GGG.G', 'G...G.....G', 'GGGGGGGGG.G']
/** a pumpkin with an optional carved face: face = null | 'happy' | 'two' */
function pumpkin(x, t, cx, cy, k, { cell = 20, face = null, col = null, glow = false } = {}) {
  if (k <= 0.01) return
  const C = col ? { G: '#5bd18b', O: col, o: col } : PUMPKIN_C
  if (glow) { x.save(); x.shadowColor = col || ORANGE; x.shadowBlur = 50; drawBits(x, PUMPKIN, C, cx, cy, cell * k); x.restore() }
  drawBits(x, PUMPKIN, C, cx, cy, cell * k)
  if (!face) return
  const c = cell * k
  x.save(); x.translate(cx, cy + c); x.fillStyle = face === 'two' ? '#ffe9a8' : '#ffe9a8'
  if (face === 'happy') { x.fillRect(-3 * c, -1.5 * c, c, c); x.fillRect(2 * c, -1.5 * c, c, c); x.fillRect(-2.5 * c, 0.8 * c, 5 * c, c * 0.8) }
  if (face === 'two') {
    x.fillRect(-4 * c, -1.5 * c, c, c); x.fillRect(-2.2 * c, -1.5 * c, c, c); x.fillRect(-4 * c, 0.6 * c, 2.8 * c, c * 0.7)
    x.fillStyle = '#ff6b6b'; x.fillRect(1.2 * c, -1.6 * c, 1.2 * c, 0.6 * c); x.fillRect(3 * c, -1.6 * c, 1.2 * c, 0.6 * c); x.fillRect(1.4 * c, 1.0 * c, 2.6 * c, c * 0.6)
    x.fillStyle = INK; x.fillRect(-0.2 * c, -3 * c, 0.4 * c, 6 * c)
  }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Picked a pumpkin | in *four seconds.*', mood: 'wide', look: [1, 0], star: ST, hops: [0.4, 0.8],
    front(x, t, lt, P) {
      pumpkin(x, t, 790, 860, K(t, P, 0.3))
      L(x, 790, 650, `TIME: 0:0${Math.min(4, Math.floor(lt * 4))}`, K(t, P, 0.2, 0.3, 2.2), '#ff6b6b', 0.04, 36, CREAM)
      L(x, 790, 1080, 'DONE. NEXT?', K(t, P, 1.2, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'taurus', cap: 'Skipped the pumpkins. | *Straight to the pie.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PIE, PIE_C, 790, 860, 24 * K(t, P, 0.2))
      L(x, 790, 660, `SLICE ${1 + Math.floor(clamp(lt / 1.6) * 3)}`, K(t, P, 0.6, 0.3, 2.2), BONE, 0.04, 38)
      L(x, 790, 1060, 'PUMPKINS: LATER', K(t, P, 1.4, 0.3, 2.4), '#7ee0a4', -0.04, 30)
    } },
  { sign: 'gemini', cap: 'Carved *two faces* | on one pumpkin.', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      pumpkin(x, t, 790, 850, K(t, P, 0.2), { cell: 24, face: 'two' })
      L(x, 790, 1080, 'MOOD: BOTH', K(t, P, 1.2, 0.3, 2.4), GOLD, 0.04, 34)
    } },
  { sign: 'cancer', cap: 'Adopted the saddest pumpkin. | *Tucked it in.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      pumpkin(x, t, 790, 850, K(t, P, 0.2), { cell: 16, col: '#c98f5a', face: 'happy' })
      if (lt > 0.8) drawBits(x, BLANKET, { L: PINK, P: CREAM }, 790, 925, 15 * pop01(lt, 0.8, 0.3, 2))
      L(x, 790, 1080, 'GOODNIGHT, LITTLE ONE', K(t, P, 1.4, 0.3, 2.4), SKYB, -0.04, 28)
    } },
  { sign: 'leo', cap: 'Judged the contest. | *Leo won.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, RIBBON, { Y: GOLD, R: RED }, 790, 840, 22 * K(t, P, 0.3))
      L(x, 790, 640, 'BEST PUMPKIN: ♌︎ ME', K(t, P, 0.8, 0.3, 2.2), GOLD, 0.04, 30)
      L(x, 790, 1080, 'JUDGE: ALSO ME', K(t, P, 1.4, 0.3, 2.4), BONE, -0.04, 30)
      sparkles(x, t, 790, 840, P.t0 + 1.2, 7, 160, 0.3)
    } },
  { sign: 'virgo', cap: 'Brought a checklist | *for the pumpkins.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      paper(x, 790, 840, K(t, P, 0.2), ['round ✓', 'no dents ✓', 'stem: 4 cm ✓', 'fits porch ✓'], { head: 'PUMPKIN QA', headBg: MINT, w: 300, size: 28, rot: -0.04 })
      L(x, 790, 1110, 'REJECTED: 41', K(t, P, 1.5, 0.3, 2.4), '#ff6b6b', 0.04, 30, CREAM)
    } },
  { sign: 'libra', cap: 'Narrowed it down | *to thirty.*', mood: lt => lt > 1.4 ? 'wide' : 'happy', look: lt => [Math.sin(lt * 4) > 0 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(9, 1 + Math.floor(lt * 5))
      for (let i = 0; i < n; i++) pumpkin(x, t, 650 + (i % 3) * 140, 690 + Math.floor(i / 3) * 130, 1, { cell: 8 })
      L(x, 790, 1090, 'FINALISTS: 30', K(t, P, 1.2, 0.3, 2.4), PINK, -0.04, 34)
    } },
  { sign: 'scorpio', cap: 'Wore all black | *to a pumpkin patch.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      drawBits(x, ['KKKKK..KKKKK', 'KKKKKKKKKKKK', 'KKKKK..KKKKK', '.KKK....KKK.'], { K: INK }, F.x, F.top + F.cell * 15, F.cell * 1.9 * K(t, P, 0.3))
      pumpkin(x, t, 800, 900, K(t, P, 0.5), { cell: 14 })
      L(x, 790, 680, 'DRESS CODE: MOOD', K(t, P, 1.0, 0.3, 2.2), BONE, 0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'Lost in the corn maze. | *On purpose.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      drawBits(x, MAZE, { G: '#e8c35a' }, 790, 830, 22 * K(t, P, 0.2), { outline: '#8a6a2a' })
      L(x, 790, 1070, 'HOUR 3. THRIVING.', K(t, P, 1.3, 0.3, 2.4), '#c58bff', -0.04, 30)
    } },
  { sign: 'capricorn', cap: 'Asked the farmer | about *profit margins.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'and your yield | per acre?', K(t, P, 0.2, 0.25, 2.2), { size: 34, tail: 'bl' })
      pumpkin(x, t, 790, 930, K(t, P, 0.7), { cell: 12 })
      L(x, 790, 1100, 'FARMER: CONFUSED', K(t, P, 1.4, 0.3, 2.4), BONE, -0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Painted theirs | *glow-in-the-dark blue.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      pumpkin(x, t, 790, 860, K(t, P, 0.2), { cell: 20, col: '#6fe3ff', glow: lt > 0.8 })
      L(x, 790, 1080, 'TRADITION: OPTIONAL', K(t, P, 1.3, 0.3, 2.4), SKYB, -0.04, 30)
    } },
  { sign: 'pisces', cap: 'Cried leaving | *the other pumpkins.*', tears: 3, mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) pumpkin(x, t, 650 + i * 140, 840, K(t, P, 0.2 + i * 0.15), { cell: 10, face: 'happy' })
      bubble(x, 790, 680, 'bye, friends…', K(t, P, 0.9, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
      L(x, 790, 1060, 'TOOK ALL THREE', K(t, P, 1.6, 0.3, 2.4), SKYB, -0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2t0415', key: 'F', accent: ACC, ending: 'lesson',
  title: 'The signs at | a *pumpkin patch.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *One hayride.*' },
  lesson: { text: 'Fall is better | *side by side.*', chip: 'SEASON: COZY' },
  last: {
    text: 'Taurus is | *still at the pie.*',
    draw(x, t, lt) { drawBits(x, PIE, PIE_C, 540, 1540, 18 * pop01(t, t - lt + 0.6, 0.35, 2)) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
