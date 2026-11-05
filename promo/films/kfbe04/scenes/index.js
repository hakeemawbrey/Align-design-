// kfbe04: FIRST DATE BINGO E4, "Cancer is already picturing the holidays" (vertical, star_talk post, music: dreamy · Ab).
// No end card, no card transition; hard cut on the last line.
//   0.0   frame 0: ♋ Cancer mid-daydream, a thought bubble of two stockings on a mantel (♋ and ♍ on them); the
//         dauber mid-slam on ALREADY PICTURING THE HOLIDAYS. Hook: "First date. Cancer’s | *picturing December.*"
//   0.7   record scratch + freeze: "it’s been *four minutes.*" · 2.3 the bubble pops
//   3.4   MENTIONS THEIR MUM (a tiny photo) · 4.8 ASKS "DO YOU LIKE SOUP?" · 6.0 KEEPS THE RECEIPT AS A KEEPSAKE → BINGO
//   7.4   the host sobs "THE STOCKINGS!!" · 8.2 Cancer: "sorry, I get excited. tell me about your week?" ♍ Virgo melts
//   10.5  "Feel it all. Just | *not by the starter.*" · hard cut.
import { makeBingo, cafe, table, candle, star, label, shadow, hearts, drawBits, dish, R, box, prog, lerp, ease, outK, pop01, inK, win01, r3, INK, BONE, GOLD, RED, GREEN, INTER } from '../../kfbe01/scenes/bingokit.js'

const D = 13.3
const T = { rec: 0.7, popB: 2.3, mum: 3.4, soup: 4.8, rcpt: 6.0, bingo: 6.25, sob: 7.4, sorry: 8.2, last: 10.5 }

function stocking(x, cx, cy, col, glyph, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  drawBits(x, ['WWWW.', 'CCCC.', 'CCCC.', 'CCCC.', 'CCCCC', 'CCCCCC', '.CCCCC'], { W: '#ffffff', C: col }, 0, 0, 14)
  x.font = `700 30px 'EB Garamond', serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#fff'; x.fillText(glyph, -4, 6)
  x.restore()
}

const EP = makeBingo({
  id: 'kfbe04', D, n: 3, ink: '#3f9fe0', cardTag: '♋ × ♍',
  squares: [
    { text: 'ALREADY PICTURING THE HOLIDAYS', at: -0.04 }, { text: 'BROUGHT A CARDIGAN FOR YOU' }, { text: 'ASKS "DO YOU LIKE SOUP?"', at: T.soup },
    { text: 'MENTIONS THEIR MUM', at: T.mum }, { free: true }, { text: 'CRIES AT THE MENU (A LITTLE)' },
    { text: 'KEEPS THE RECEIPT AS A KEEPSAKE', at: T.rcpt }, { text: 'NAMES THE DOG YOU DON’T HAVE' }, { text: 'SAYS "WE" BY DESSERT' },
  ],
  win: [0, 3, 6], bingoAt: T.bingo,
  hook: { text: 'First date. Cancer’s | *picturing December.*', out: [3.1, 3.3], accentColor: '#9fd0ff', size: 92 },
  rec: { at: T.rec, len: 1.5, caption: 'it’s been *four minutes.*', sub: 'the first date', top: 1000 },
  heads: [{ text: 'Feel it all. Just | *not by the starter.*', at: T.last, accent: '#9fd0ff', late: 3, lateAt: T.last + 0.4, wobble: true }],
  scene(x, t) {
    cafe(x, t, { wall: '#2a1f48' })
    let cm = 'sparkle', cl = [0.6, -1]
    if (t > T.popB) { cm = 'wide'; cl = [1, 0] }
    if (t > T.mum - 0.2) { cm = 'happy'; cl = undefined }
    if (t > T.sorry - 0.3 && t < T.sorry + 0.6) { cm = 'squint' }
    if (t > T.sorry + 0.6) cm = 'happy'
    shadow(x, 290, 1150, 220)
    star(x, t, 'cancer', { x: 290, y: 880, s: 250, mood: cm, look: cl, hops: [T.mum, T.soup, T.rcpt, T.sorry, T.sorry + 0.6], seed: 2 })
    let vm = 'neutral', vl = [-1, 0]
    if (t > T.mum) vm = 'wide'
    if (t > T.sorry + 1.0) { vm = 'heart'; vl = undefined }
    shadow(x, 790, 1150, 210)
    star(x, t, 'virgo', { x: 790, y: 890, s: 230, mood: vm, look: vl, hops: [T.soup + 0.2, T.sorry + 1.0], seed: 11 })
    table(x, 540, 1010, 520)
    candle(x, t, 540, 1010)
    dish(x, 650, 1000, 'bread', 0.7)
    // the daydream bubble (frame 0), popping at popB
    const bk = t < T.popB ? 1 : 1 - inK(t, T.popB, 0.15)
    if (bk > 0.01) {
      x.save(); x.translate(470, 590); x.scale(bk, bk)
      drawBits(x, ['..BBBBBBBBBB..', '.BBBBBBBBBBBB.', 'BBBBBBBBBBBBBB', 'BBBBBBBBBBBBBB', 'BBBBBBBBBBBBBB', 'BBBBBBBBBBBBBB', '.BBBBBBBBBBBB.', '..BBBBBBBBBB..'], { B: '#fff3e0' }, 0, 0, 32)
      R(x, INK, -170, -20, 340, 16); R(x, '#8a5a3c', -166, -17, 332, 10)       // mantel
      stocking(x, -70, 38, RED, '♋', 0.75); stocking(x, 70, 38, GREEN, '♍', 0.75)
      for (let i = 0; i < 5; i++) R(x, [GOLD, RED, GREEN][i % 3], -150 + i * 75, -70 + 8 * Math.sin(i + t * 3), 14, 14)
      R(x, INK, -170, 150, 30, 30); R(x, '#fff3e0', -166, 154, 22, 22); R(x, INK, -200, 196, 20, 20); R(x, '#fff3e0', -197, 199, 14, 14)
      x.restore()
    }
    if (t > T.popB && t < T.popB + 0.5) { const p = prog(t, T.popB, T.popB + 0.5); x.save(); x.globalAlpha = 1 - p; for (let i = 0; i < 10; i++) R(x, '#fff3e0', 420 + Math.cos(i) * 260 * p, 600 + Math.sin(i * 1.7) * 200 * p, 18, 18); x.restore() }
    // a tiny mum photo
    const mk = pop01(t, T.mum - 0.1, 0.3, 2.4) * outK(t, [T.soup - 0.2, T.soup])
    if (mk > 0.01) { x.save(); x.translate(420, 680); x.rotate(-0.1); x.scale(mk, mk); box(x, -60, -70, 120, 140, BONE, { b: 6 }); drawBits(x, ['..CC..', '.CCCC.', 'CCCCCC', '.C..C.'], { C: '#9fd0ff' }, 0, -10, 14); x.font = `800 24px ${INTER}`; x.textAlign = 'center'; x.fillStyle = INK; x.fillText('MUM ♥', 0, 50); x.restore() }
    // the receipt, kissed and kept
    const rk = pop01(t, T.rcpt - 0.2, 0.3, 2.4) * outK(t, [T.sob, T.sob + 0.3])
    if (rk > 0.01) { x.save(); x.translate(430, 700); x.rotate(0.12); x.scale(rk, rk); box(x, -50, -80, 100, 160, '#ffffff', { b: 5 }); for (let i = 0; i < 6; i++) R(x, '#c8c0d8', -34, -60 + i * 22, i % 2 ? 50 : 68, 6); drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff5c8a' }, 10, 50, 7); x.restore() }
    if (t > T.sorry + 1.0) hearts(x, t, T.sorry + 1.0, 790, 740, { n: 4 })
  },
  bubbles: [
    { t0: T.soup - 0.1, t1: T.rcpt - 0.15, x: 330, y: 640, text: 'do you like soup?', size: 40, tail: -0.2 },
    { t0: T.sob, t1: D + 1, x: 790, y: 448, text: 'THE STOCKINGS!!', size: 32, tail: 0.5, col: '#cfe8ff' },
    { t0: T.sorry, t1: D + 1, x: 400, y: 680, text: 'sorry, I get excited. | tell me about your week?'.replace(' | ', ' '), size: 34, tail: -0.3 },
  ],
  cues: [['pop', T.popB, 1318.51, 0.05, -0.2], ['glitter', T.popB, r3(T.popB + 0.3)], ['pluck', r3(T.sorry + 1.0), 1567.98, 0.035, 0.5, 0.3]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [lerp, ease, win01]
