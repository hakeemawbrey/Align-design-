// kfbe06: FIRST DATE BINGO E6, "Virgo made a bingo card about the date" (vertical, star_talk post, music: house · C).
// No end card, no card transition; hard cut on the last line.
//   0.0   frame 0: ♍ Virgo mid-tick with a tiny red pen on its own clipboard; the host's dauber mid-slam on BROUGHT
//         ITS OWN CARD. Hook: "Virgo brought | *its own* card."  0.6 whip zoom into the clipboard.
//   3.3   Virgo wipes the table → WIPES THE TABLE · 4.9 spots the menu typo → SPOTS THE MENU TYPO
//   6.0   a thought bubble "7.5/10… 8/10" → RATES THE DATE IN ITS HEAD (6.6) → BINGO (6.85)
//   7.5   caught in 4K: "THE BINGO IS YOU" · 9.0 Virgo drops the clipboard, laughs, tastes the soup
//   10.5  "Stop grading. | *Start tasting.*" · hard cut.
import { makeBingo, cafe, table, candle, star, label, shadow, hearts, dish, drawBits, R, box, prog, lerp, ease, outK, pop01, inK, win01, r3, HK, INK, BONE, GOLD, RED, INTER, MONO } from '../../kfbe01/scenes/bingokit.js'

const D = 13.4
const T = { wipe: [2.8, 3.6], s1: 3.3, typo: 4.9, think: 6.0, s3: 6.6, bingo: 6.85, caught: 7.5, drop: 9.0, taste: 9.6, last: 10.5 }
const WHIP = { at: 0.6, from: 1.6, to: 1.0, len: 0.55, blur: 10, cx: 470, cy: 820 }
const CAUGHT = { at: T.caught, x: 300, y: 860, r: 170, out: [8.9, 9.1], label: 'THE BINGO IS YOU', arrow: 'tr' }

function clipboard(x, t, cx, cy, s, rot) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -90, -120, 180, 240, '#b07a4a', { b: 6 }); box(x, -76, -104, 152, 212, '#fffdf4', { b: 4 })
  box(x, -36, -132, 72, 26, '#c8c0d8', { b: 5 })
  const rows = ['wipes table', 'menu typo', 'rates date']
  rows.forEach((r, i) => {
    R(x, INK, -62, -70 + i * 60, 22, 22); R(x, '#fff', -59, -67 + i * 60, 16, 16)
    x.font = `700 20px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText(r, -32, -59 + i * 60)
    const at = [T.s1, T.typo, T.s3][i]
    if (t > at) drawBits(x, ['....R', '...R.', 'R.R..', '.R...'], { R: RED }, -51, -59 + i * 60, 5, { outline: null })
  })
  x.restore()
}

const EP = makeBingo({
  id: 'kfbe06', D, n: 3, ink: '#38b070', cardTag: '♍ × ♉',
  squares: [
    { text: 'WIPES THE TABLE', at: T.s1 }, { text: 'SPOTS THE MENU TYPO', at: T.typo }, { text: 'BROUGHT ITS OWN CARD', at: -0.04 },
    { text: 'ALIGNS THE CUTLERY' }, { free: true }, { text: 'READS THE REVIEWS FIRST' },
    { text: 'RATES THE DATE IN ITS HEAD', at: T.s3 }, { text: 'ASKS IF THE SOUP IS GLUTEN-FREE' }, { text: 'NAPKIN FOLDED INTO A SWAN' },
  ],
  win: [2, 4, 6], bingoAt: T.bingo,
  hook: { text: 'Virgo brought | *its own* card.', out: [2.6, 2.8], accentColor: '#7fe0a8' },
  whip: { at: -0.15, from: 1.3, blur: 7 },
  heads: [{ text: 'Stop grading. | *Start tasting.*', at: T.last, accent: '#7fe0a8', late: 2, lateAt: T.last + 0.4, wobble: true }],
  effects: [[HK.whipZoom, HK.whipZoomCues, WHIP], [HK.caught, HK.caughtCues, CAUGHT]],
  scene(x, t) {
    cafe(x, t, { wall: '#1f3038', trim: '#2a4048' })
    let vm = 'squint', vl = [0.4, 1]
    if (t > T.wipe[0] && t < T.wipe[1]) { vm = 'neutral'; vl = [0, 1] }
    if (t > T.typo - 0.3 && t < T.typo + 0.6) { vm = 'wide'; vl = [1, 1] }
    if (t > T.think && t < T.bingo + 0.3) { vm = 'squint'; vl = [1, 0] }
    if (t > T.caught) { vm = 'wide'; vl = [0, 0] }
    if (t > T.drop) { vm = 'happy'; vl = undefined }
    if (t > T.taste + 0.3) vm = 'sparkle'
    shadow(x, 290, 1150, 220)
    star(x, t, 'virgo', { x: 290, y: 880, s: 250, mood: vm, look: vl, hops: [T.s1, T.typo, T.caught, T.drop, T.drop + 0.4, T.taste + 0.3], seed: 6 })
    shadow(x, 790, 1150, 210)
    star(x, t, 'taurus', { x: 790, y: 890, s: 230, mood: t > T.drop ? 'happy' : t > T.typo ? 'wide' : 'neutral', look: t > T.drop ? undefined : [-1, 0], hops: [T.drop + 0.2], seed: 8 })
    table(x, 540, 1010, 520)
    candle(x, t, 560, 1010)
    // a menu with a typo
    if (t > T.typo - 0.5 && t < T.think) { const k = pop01(t, T.typo - 0.5, 0.3, 2) * outK(t, [T.think - 0.3, T.think]); x.save(); x.translate(540, 690); x.rotate(0.05); x.scale(k, k); box(x, -150, -60, 300, 120, '#fff8e8', { b: 6 }); x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('SOUP OF THE DYA', 0, 2); x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.ellipse(98, 2, 50, 30, 0, 0, Math.PI * 2); x.stroke(); x.restore() }
    // the soup (tasted at the end)
    dish(x, 400, 1000, 'soup', 0.8)
    // wiping cloth
    if (t > T.wipe[0] && t < T.wipe[1] + 0.2) { const p = prog(t, ...T.wipe); box(x, 380 + 140 * Math.sin(p * Math.PI * 4), 985, 80, 22, '#9fd8f6', { b: 4 }); for (let i = 0; i < 3; i++) label(x, '✦', 420 + i * 80, 960 - (p * 60) % 40, { size: 26, col: '#fff', alpha: 1 - p }) }
    // the rating thought bubble
    const rk = pop01(t, T.think, 0.3, 2.2) * outK(t, [T.caught, T.caught + 0.2])
    if (rk > 0.01) { x.save(); x.translate(300, 640); x.scale(rk, rk); drawBits(x, ['..BBBBBBBB..', '.BBBBBBBBBB.', 'BBBBBBBBBBBB', 'BBBBBBBBBBBB', '.BBBBBBBBBB.', '..BBBBBBBB..'], { B: BONE }, 0, 0, 20); x.font = `900 46px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText(t < T.s3 - 0.2 ? '7.5/10…' : '8/10?', 0, 4); x.restore() }
    // Virgo's clipboard (in hand, then dropped)
    const dk = ease.inCubic(prog(t, T.drop, T.drop + 0.4))
    if (dk < 1) clipboard(x, t, lerp(470, 470, dk), lerp(820, 1300, dk), t < 0.6 ? 1 : lerp(1.6, 1, inK(t, 0.6, 0.5)) * (t < 2.4 ? 1 : 1), lerp(-0.12, 0.8, dk))
    if (t > T.taste) { label(x, 'mmm!', 300, 690, { size: 48, col: '#7fe0a8', alpha: win01(t, T.taste, T.last), font: INTER, weight: 900, rot: -0.1 }); hearts(x, t, T.taste + 0.2, 290, 740, { n: 4 }) }
  },
  bubbles: [
    { t0: T.bingo + 0.8, t1: D + 1, x: 790, y: 448, text: 'IT GRADED ITSELF', size: 32, tail: 0.5, col: '#cfe8ff' },
  ],
  cues: [...Array.from({ length: 6 }, (_, i) => ['tick', r3(T.wipe[0] + i * 0.12), 0.03]), ['pluck', T.typo, 1174.66, 0.035, 0.4, 0], ['pop', T.think, 987.77, 0.035, -0.3], ['whoosh', T.drop, 0.3, 0.03], ['tom', r3(T.drop + 0.4), 100, { gain: 0.2, decay: 0.2 }], ['pluck', r3(T.taste + 0.2), 1567.98, 0.04, 0.5, -0.2]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [GOLD]
