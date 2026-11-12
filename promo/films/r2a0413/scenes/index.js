// r2a0413: star_advice, ADVICE SOLO (pisces), "Signs a Pisces | *needs a break.*" (signs3kit social cut, music: lofi · C). Ending: callback (the blanket fort).
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
const ACC = '#a99bff'
const S = 'pisces'
/** a pixel battery, level 0…1 */
function battery(x, cx, cy, k, lvl, col) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -70, 250, 140); x.fillRect(120, -30, 26, 60)
  x.fillStyle = '#2a2350'; x.fillRect(-118, -58, 226, 116)
  x.fillStyle = col; x.fillRect(-108, -48, 206 * clamp(lvl), 96)
  x.restore()
}
/** a cloud thought bubble */
function thought(x, cx, cy, k, w = 280, h = 200) {
  if (k <= 0.01) return
  const B = [[0, 0, 1], [-w * 0.3, -h * 0.12, 0.7], [w * 0.3, -h * 0.1, 0.72], [-w * 0.18, h * 0.18, 0.7], [w * 0.2, h * 0.18, 0.7]]
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; for (const [a, b, r] of B) { x.beginPath(); x.ellipse(a, b, w * 0.32 * r + 6, h * 0.36 * r + 6, 0, 0, Math.PI * 2); x.fill() }
  x.fillStyle = BONE; for (const [a, b, r] of B) { x.beginPath(); x.ellipse(a, b, w * 0.32 * r, h * 0.36 * r, 0, 0, Math.PI * 2); x.fill() }
  for (const [a, b, r] of [[-w * 0.5, h * 0.55, 18], [-w * 0.68, h * 0.8, 11]]) { x.fillStyle = INK; x.beginPath(); x.arc(a, b, r + 5, 0, Math.PI * 2); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(a, b, r, 0, Math.PI * 2); x.fill() }
  x.restore()
}
/** a little beach: sun, sea, waves rolling */
function beach(x, t, cx, cy, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  x.fillStyle = '#ffd36b'; x.beginPath(); x.arc(40, -40, 26, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#6fc3ff'; x.fillRect(-90, 0, 180, 34)
  x.strokeStyle = '#ffffff'; x.lineWidth = 5; x.beginPath()
  for (let i = 0; i <= 18; i++) { const px = -90 + i * 10, py = 2 + 5 * Math.sin(i * 0.9 + t * 4); i ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke()
  x.fillStyle = '#f2d08a'; x.fillRect(-90, 34, 180, 22)
  x.restore()
}
/** a stack of labelled boxes (other people's feelings) */
function boxes(x, cx, cy, k, names, keep) {
  if (k <= 0.01) return
  names.forEach((n, i) => {
    const off = i >= keep ? 1 : 0
    x.save(); x.translate(cx + off * 0, cy - i * 80 + off * 0); x.scale(k, k); x.rotate((i % 2 ? 0.04 : -0.04))
    x.globalAlpha = i >= keep ? 0 : 1
    x.fillStyle = INK; x.fillRect(-126, -40, 252, 80); x.fillStyle = '#c98f5a'; x.fillRect(-118, -32, 236, 64)
    x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(n, 0, 2)
    x.restore()
  })
}
/** the blanket fort: a draped blanket tent */
function fort(x, cx, cy, k, w = 420, h = 300) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-w / 2 - 12, h / 2 + 8); x.lineTo(0, -h / 2 - 14); x.lineTo(w / 2 + 12, h / 2 + 8); x.fill()
  x.fillStyle = '#ff9ab0'; x.beginPath(); x.moveTo(-w / 2, h / 2); x.lineTo(0, -h / 2); x.lineTo(w / 2, h / 2); x.fill()
  x.fillStyle = '#ffd1e0'; for (let i = 0; i < 5; i++) { const yy = -h / 2 + 60 + i * 50, half = (yy + h / 2) / h * w / 2; x.fillRect(-half + 10, yy, half * 2 - 20, 12) }
  x.fillStyle = '#2a2350'; x.beginPath(); x.moveTo(-80, h / 2); x.lineTo(0, -10); x.lineTo(80, h / 2); x.fill()
  x.fillStyle = GOLD; for (let i = 0; i < 5; i++) { x.beginPath(); x.arc(-w / 2 + 40 + i * (w - 80) / 4, -h / 2 + 30 + Math.abs(i - 2) * 60, 8, 0, Math.PI * 2); x.fill() }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Cried at a dog video? | *Your heart is full.*', tears: 2, mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 850, K(t, P, 0.2), { head: 'PUPPY.MP4', headCol: MINT, lines: [
        ['he found', BONE, K(t, P, 0.5, 0.25, 2.2), true],
        ['his ball!!', BONE, K(t, P, 0.8, 0.25, 2.2), true],
        ['replay: 9', PINK, K(t, P, 1.5, 0.25, 2.2)],
      ] })
    } },
  { sign: S, cap: 'Said yes to everyone? | *“Later” is allowed.*', tears: 2, mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      if (K(t, P, 0.2) > 0.5) swapLabel(x, 790, 800, lt, 0.9, 'YES! SURE! OK!', 'LATER ♥', { size: 36, fromBg: GOLD, toBg: MINT })
      L(x, 790, 1050, 'BOUNDARY: CUTE', K(t, P, 1.6, 0.3, 2.4), PINK, -0.04, 30)
    } },
  { sign: S, cap: 'Daydreaming at work? | *Your mind needs a beach.*', tears: 2, mood: 'sleepy', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      thought(x, 790, 740, K(t, P, 0.2))
      if (K(t, P, 0.2) > 0.9) beach(x, t, 790, 730, 1.05)
      L(x, 790, 1060, 'BRAIN: ON VACATION', K(t, P, 1.3, 0.3, 2.4), SKYB, -0.04, 30)
    } },
  { sign: S, cap: 'Carrying everyone’s feelings? | *Put some down.*', tears: 2, mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const keep = lt > 1.5 ? 1 : lt > 1.1 ? 2 : 4
      boxes(x, 790, 1000, K(t, P, 0.2), ['MINE', 'MOM’S', 'BESTIE’S', 'A STRANGER’S'], keep)
      if (lt > 1.1) L(x, 790, 640, 'SET DOWN ✓', pop01(lt, 1.1, 0.3, 2.4), MINT, 0.05, 36)
    } },
  { sign: S, cap: 'Social battery blinking? | *Recharge. No guilt.*', tears: 2, mood: lt => lt > 1.4 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const low = lt < 1.0, blink = Math.floor(t * 4) % 2
      battery(x, 790, 840, K(t, P, 0.2), low ? 0.1 : clamp((lt - 1.0) / 1.0), low ? (blink ? RED : '#5a2030') : MINT)
      L(x, 790, 1050, low ? 'LOW BATTERY' : 'CHARGING ☾', K(t, P, 0.3, 0.3, 2.2), low ? RED : MINT, -0.04, 34, low ? CREAM : INK)
    } },
  { sign: S, cap: 'Texts piling up? | *They can wait an hour.*', tears: 2, mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(47, Math.floor(clamp(lt / 1.0) * 47))
      phone(x, 790, 850, K(t, P, 0.2), { head: lt > 1.1 ? 'DO NOT DISTURB ☾' : `${n} NEW`, headCol: lt > 1.1 ? LAV : RED, lines: [
        ['tea first', MINT, pop01(lt, 1.3, 0.25, 2.2), true],
        ['then texts', MINT, pop01(lt, 1.6, 0.25, 2.2), true],
      ] })
    } },
  { sign: S, cap: 'Need a cry *and* a nap? | Both are valid.', tears: 3, mood: 'sleepy', star: ST,
    front(x, t, lt, P, F) {
      drawBits(x, PILLOW, { P: '#c9d3ea', W: '#ffffff' }, 790, 900, 22 * K(t, P, 0.2))
      zzz(x, t, 820, 760, { alpha: clamp(lt * 2) })
      L(x, 790, 1070, 'NAP: APPROVED ✓', K(t, P, 1.2, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Ocean sounds on loop? | *Your soul knows.*', tears: 2, mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      beach(x, t, 790, 820, 1.6 * K(t, P, 0.2))
      notes(x, t, 790, 700, { n: 4, cell: 7, col: SKYB, seed: 3 })
      L(x, 790, 1060, 'TRACK 1 OF ∞', K(t, P, 1.2, 0.3, 2.4), SKYB, 0.04, 32)
    } },
  { sign: S, cap: 'Blanket fort tonight? | *Excellent plan.*', tears: 2, mood: 'heart', look: [1, 0], star: { x: -200 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      fort(x, 790, 900, 0.8 * K(t, P, 0.3, 0.35))
      L(x, 790, 640, 'FORT: OPEN ☾', K(t, P, 1.1, 0.3, 2.4), LAV, 0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2a0413', key: 'C', accent: ACC, solo: S, ending: 'callback',
  title: 'Signs a Pisces | *needs a break.*',
  cameos: CAMEOS,
  group: { cap: 'Rest isn’t lazy. | *It’s refilling.*', mood: 'heart' },
  last: {
    text: 'The blanket fort | *has room for two.*',
    draw(x, t, lt) {
      const t0 = t - lt
      fort(x, 540, 1150, 1.5 * pop01(t, t0 + 0.2, 0.45, 1.8))
      const k = pop01(t, t0 + 0.7, 0.4, 2)
      if (k > 0.01) {
        signChar(x, t, 'pisces', 450, 1290, 200 * k, { mood: 'heart', seed: 7, tears: 1, hops: [t0 + 1.4] })
        signChar(x, t, 'cancer', 630, 1290, 200 * k, { mood: 'happy', seed: 8, look: [-1, 0], hops: [t0 + 1.7] })
      }
      if (lt > 1.6) hearts(x, t, 540, 900, t0 + 1.6, { n: 5, life: 1.6, spread: 260, cell: 8, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
