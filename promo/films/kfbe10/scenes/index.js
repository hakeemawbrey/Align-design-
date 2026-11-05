// kfbe10: FIRST DATE BINGO E10, "Capricorn runs the date like a meeting" (vertical, star_talk post, music: chiptune · G).
// No end card, no card transition; hard cut on the last line.
//   0.0   frame 0: ♑ Capricorn mid-click of a pen, a tiny agenda stood up on the table; the dauber mid-slam on BROUGHT
//         AN AGENDA. Hook: "Capricorn brought | *an agenda.*"  0.55 record scratch: "this is a *first date.*"
//   2.8   "so, Q3 was big for me" → TALKS ABOUT WORK · 4.2 the phone lights up: 8:14 → CHECKS THE TIME
//   5.4   a calculator: 23.47 / 23.47 → SPLITS THE BILL TO THE CENT
//   6.2   ♈ Aries: "hey. what do you do for fun?" · Capricorn stops, flips the phone face down → PHONE FACE DOWN (7.4)
//         → BINGO (7.65) · 8.5 the host: "PHONE DOWN!!" · 9.2 "Calendar off. | *You’re here now.*" · hard cut.
import { makeBingo, cafe, table, candle, star, label, shadow, hearts, drawBits, R, box, prog, lerp, ease, outK, pop01, inK, win01, r3, INK, BONE, GOLD, INTER, MONO } from '../../kfbe01/scenes/bingokit.js'

const D = 12.1
const T = { rec: 0.55, work: 2.8, s1: 3.4, time: 4.2, calc: 5.4, fun: 6.2, flip: [6.9, 7.3], s4: 7.4, bingo: 7.65, sob: 8.5, last: 9.2 }

function phone(x, t, cx, cy, flip) {
  x.save(); x.translate(cx, cy); x.scale(1, Math.cos(flip * Math.PI))
  const face = flip < 0.5
  box(x, -40, -22, 80, 44, face ? '#14102a' : '#2a2148', { b: 5 })
  if (face && t > T.time - 0.2) { x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#9fe6ff'; x.fillText('8:14', 0, 2) }
  x.restore()
}

const EP = makeBingo({
  id: 'kfbe10', D, n: 3, ink: '#5a9a70', cardTag: '♑ × ♈',
  squares: [
    { text: 'BROUGHT AN AGENDA', at: -0.04 }, { text: 'SAYS "CIRCLE BACK"' }, { text: 'SPLITS THE BILL TO THE CENT', at: T.calc },
    { text: 'TALKS ABOUT WORK', at: T.s1 }, { free: true }, { text: 'PHONE FACE DOWN', at: T.s4 },
    { text: 'ARRIVED EXACTLY ON TIME' }, { text: 'CHECKS THE TIME', at: T.time + 0.3 }, { text: 'TAKES MINUTES' },
  ],
  win: [3, 4, 5], bingoAt: T.bingo,
  hook: { text: 'Capricorn brought | *an agenda.*', out: [2.5, 2.7], accentColor: '#9fe6b0' },
  rec: { at: T.rec, len: 1.4, caption: 'this is a *first date.*', sub: 'agenda item 1 of 4', top: 1000 },
  heads: [{ text: 'Calendar off. | *You’re here now.*', at: T.last, accent: '#9fe6b0', late: 3, lateAt: T.last + 0.4, wobble: true }],
  scene(x, t) {
    cafe(x, t, { wall: '#232a3a', trim: '#2e3850' })
    let cm = 'neutral', cl = [1, 0]
    if (t < T.rec) { cm = 'squint'; cl = [0.3, 1] }
    if (t > T.time - 0.2 && t < T.time + 0.8) { cm = 'neutral'; cl = [0.4, 1] }
    if (t > T.calc && t < T.fun) { cm = 'squint'; cl = [0.3, 1] }
    if (t > T.fun) { cm = 'wide'; cl = [1, 0] }
    if (t > T.s4) { cm = 'happy'; cl = undefined }
    if (t > T.bingo + 0.5) cm = 'sparkle'
    shadow(x, 290, 1150, 220)
    star(x, t, 'capricorn', { x: 290, y: 880, s: 250, mood: cm, look: cl, hops: [0.05, T.work, T.calc, T.s4, T.bingo + 0.3], seed: 14 })
    let am = 'neutral', al = [-1, 0]
    if (t > T.work) am = 'sleepy'
    if (t > T.fun - 0.3) { am = 'happy'; al = undefined }
    if (t > T.bingo + 0.3) am = 'heart'
    shadow(x, 790, 1150, 210)
    star(x, t, 'aries', { x: 790, y: 890, s: 230, mood: am, zzz: false, look: al, hops: [T.fun, T.bingo + 0.4], seed: 3 })
    table(x, 540, 1010, 560)
    candle(x, t, 560, 1010)
    // the agenda tent card
    const ak = 1 - inK(t, T.fun + 0.2, 0.3)
    if (ak > 0.01) { x.save(); x.translate(440, 955); x.scale(ak, ak); box(x, -70, -50, 140, 100, '#ffffff', { b: 5 }); x.font = `800 20px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('AGENDA', -56, -30); x.font = `700 15px ${MONO}`; ['1. intros', '2. Q&A', '3. next steps'].forEach((l, i) => x.fillText(l, -56, -4 + i * 18)); x.restore() }
    // the pen click
    if (t < 1.0) { x.save(); x.translate(400, 800); x.rotate(-0.6); R(x, INK, -6, -60, 12, 120); R(x, '#3f6a9a', -3, -56, 6, 112); R(x, BONE, -4, -70 - (t < 0.12 ? 6 : 0), 8, 12); x.restore() }
    // the phone on the table
    phone(x, t, 620, 990, ease.inOutCubic(prog(t, ...T.flip)))
    // calculator
    const ck = pop01(t, T.calc - 0.2, 0.3, 2.2) * outK(t, [T.fun - 0.2, T.fun])
    if (ck > 0.01) { x.save(); x.translate(470, 650); x.scale(ck, ck); box(x, -140, -80, 280, 160, '#3a3a50', { b: 6 }); box(x, -120, -64, 240, 56, '#b8e8a0', { b: 4 }); x.font = `700 30px ${MONO}`; x.textAlign = 'right'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('23.47 / 23.47', 110, -36); for (let i = 0; i < 8; i++) box(x, -110 + (i % 4) * 58, 12 + Math.floor(i / 4) * 34, 40, 22, BONE, { b: 3 }); x.restore() }
    if (t > T.bingo + 0.3) hearts(x, t, T.bingo + 0.3, 790, 740, { n: 4 })
  },
  bubbles: [
    { t0: T.work, t1: T.time - 0.05, x: 350, y: 640, text: 'so. Q3 was big for me.', size: 38, tail: -0.2 },
    { t0: T.fun, t1: T.last - 0.1, x: 720, y: 700, text: 'hey. what do you do for fun?', size: 34, tail: 0.3 },
    { t0: T.bingo + 1.55, t1: D + 1, x: 330, y: 640, text: '…honestly? I paint.', size: 38, tail: -0.2 },
    { t0: T.sob, t1: D + 1, x: 790, y: 448, text: 'PHONE DOWN!!', size: 34, tail: 0.5, col: '#cfe8ff' },
  ],
  cues: [['tick', 0.05, 0.07], ['tick', 0.12, 0.05], ['pop', T.time, 1567.98, 0.035, 0.2], ['pop', T.time + 0.08, 1567.98, 0.03, 0.2], ...Array.from({ length: 6 }, (_, i) => ['tick', r3(T.calc + i * 0.09), 0.03]), ['pluck', T.fun, 1318.51, 0.04, 0.5, 0.3], ['whoosh', T.flip[0], 0.25, 0.03], ['tom', T.flip[1], 100, { gain: 0.22, decay: 0.2 }]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [label, drawBits, lerp, win01, GOLD]
