// kine16: IS THIS NORMAL? (long), "A year later and I'm not over it" (69.6 s vertical, star_advice post, music: cinematic · Cm).
// The format lives in ../../kine01/normalkit.js. No end card, no card cut. Hard cut ending.
//   0.00       frame 0: "A whole year. | Still not *over it.*" landed; ♏ Scorpio mid-fall into a pile of tissues while a
//              tear-off calendar sheds pages. Whip zoom.  2.4: the promise sticker "wait for the *verdict.*"
//   CH 1 · THE QUESTION (2.6)
//     2.6   "Everyone says | *move on* already."  Friends' bubbles pile on ("it's been a YEAR", "just get back out
//           there", "still??"); Scorpio shrinks.
//     7.0   the year in months: the ambushes get circled (the anniversary, their birthday, the café). ♓ Pisces sobs.
//    10.6   "So… is something | *wrong* with me?"  12.0 glitch: "HEART.EXE is still *updating*". 14.0 Pisces hugs.
//   CH 2 · WHY IT HAPPENS (16.0)
//    16.6   "grief isn't a race. there's no *finish line.*"  A race track: others sprint past, the finish line
//           dissolves.  20.6 "memories live in places, songs, *dates.*"  The café, the bench, a song note pop.
//    25.0   "some love just takes *longer* to set down."  Scorpio lowers a heavy box marked LOVE, slowly.
//   CH 3 · WHAT HELPS (29.5)
//    30.2   1 · Talk it out: a bench, ♋ Cancer listens; Pisces cries on the other end.
//    37.7   2 · Change one routine: a map, the old route crossed out, a new walk to a new café.
//    45.2   3 · Let good days count: gold stars fill a month, one by one.
//   CH 4 · THE VERDICT (52.5)
//    53.5   NORMAL-O-METER: SO NORMAL.  59.0 a healing graph draws itself: wobbly, dips, but trending up.
//    63.5   "missing them this long means you *loved.* that's not broken."  Sunrise; Pisces fountains.
//    68.0   last line: "Grief has no deadline. | *Keep going.*"  Hard cut at 69.6.
import {
  makeNormal, hook, GOLD, BONE, PINK, INK, RED, MINT, CYAN, LAV, INTER, MONO, R, box, drawBits, HEART, sparkles, hearts, confetti, bubble, label, shadow, glowAt,
  room, tissues, pop01, outK, prog, lerp, clamp, ease, r3, signStar, drawStarChar,
} from '../../kine01/normalkit.js'

const D = 69.6, FLOOR = 1480
const CAN = signStar('cancer')
const CH = [2.6, 16.0, 29.5, 52.5]
const T = {
  h0Out: [2.4, 2.6], promise: 2.4,
  h1: 2.6, h1Out: [10.3, 10.5], friends: [3.6, 4.4, 5.2], months: 7.0, ambush: [8.0, 8.8, 9.6], pisIn: 4.0,
  h2: 10.6, h2Out: [15.6, 15.8], glitch: 12.0, hug: 14.0,
  race: 16.0, raceOut: 20.4, places: 20.4, placesPop: [21.2, 22.0, 22.8], heavy: 24.8, heavyOut: 29.3,
  help: [29.9, 37.4, 44.9], helpOut: [37.2, 44.7, 52.2],
  meter: 53.5, mOut: [58.4, 58.7],
  graph: [59.0, 63.0], sunrise: 63.2, last: 68.0,
}
const HELPS = ['1 · Talk it *out.*', '2 · Change *one* routine.', '3 · Let good days *count.*']
const GLITCH = { at: T.glitch, len: 1.4, text: 'HEART.EXE is still *updating*', buttons: ['WAIT', 'WAIT'], amp: 0.7 }

function den(x, t, warm = 0) {
  room(x, { y: FLOOR, wall: warm > 0 ? '#3a2848' : '#1e1636', floor: '#2a2046' })
  if (warm > 0) glowAt(x, 540, 900, 700, '255,170,120', 0.25 * warm)
}
function tissuePile(x, cx, cy, n = 9) {
  for (let i = 0; i < n; i++) { const px = cx - 180 + (i * 47) % 360, py = cy - (i % 3) * 30; box(x, px, py, 70, 50, '#f4f4ff', { b: 4 }); R(x, '#d8dcf0', px + 10, py + 10, 50, 6) }
}
function calendar(x, t, cx, cy, s, day) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -110, -130, 220, 260, BONE, { b: 7 }); R(x, RED, -110, -130, 220, 60)
  x.font = `800 26px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('DAY', 0, -100)
  x.font = `800 90px ${INTER}`; x.fillStyle = INK; x.fillText(String(day), 0, 20)
  x.restore()
}
function flyingPages(x, t) {
  for (let i = 0; i < 8; i++) {
    const p = ((t * 0.9 + i / 8) % 1)
    x.save(); x.translate(820 + Math.sin(i * 2 + t) * 120 + p * 160, 760 - p * 420 + i * 10); x.rotate(p * 6 + i)
    x.globalAlpha = 1 - p; box(x, -40, -48, 80, 96, BONE, { b: 4 }); x.restore()
  }
}
const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
const AMBUSH = [[2, 'the anniversary'], [6, 'their birthday'], [9, 'THE café']]
function yearStrip(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= k
  const y0 = 760
  MONTHS.forEach((m, i) => {
    const cx = 110 + (i % 6) * 172, cy = y0 + Math.floor(i / 6) * 200
    const pk = pop01(t, T.months + i * 0.08, 0.25, 2.2)
    x.save(); x.translate(cx, cy); x.scale(pk, pk)
    box(x, -66, -76, 132, 152, BONE, { b: 6 }); R(x, '#5a4a8a', -66, -76, 132, 34)
    x.font = `800 24px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(m, 0, -58)
    x.restore()
  })
  AMBUSH.forEach(([mi, cap], j) => {
    const at = T.ambush[j]
    if (t < at) return
    const cx = 110 + (mi % 6) * 172, cy = y0 + Math.floor(mi / 6) * 200
    const c = ease.outCubic(prog(t, at, at + 0.3))
    x.save(); x.strokeStyle = RED; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); x.ellipse(cx, cy, 90, 100, -0.1, -Math.PI / 2, -Math.PI / 2 + c * Math.PI * 2.1); x.stroke(); x.restore()
    label(x, cap, cx, cy + 128, { size: 24, col: '#ff8b9b', font: INTER, weight: 800, alpha: c })
  })
  x.restore()
}
function raceTrack(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= k
  R(x, '#8a3a2a', 0, 1120, 1080, 260)
  for (let i = 0; i < 4; i++) R(x, 'rgba(255,255,255,0.4)', 0, 1120 + i * 65, 1080, 4)
  // the finish line: dissolves at 18.5
  const fl = 1 - prog(t, 18.4, 19.2)
  if (fl > 0) { x.save(); x.globalAlpha *= fl; for (let j = 0; j < 8; j++) for (let i = 0; i < 2; i++) R(x, (i + j) % 2 ? INK : BONE, 900 + i * 22, 1120 + j * 33, 22, 33); label(x, 'MOVING ON', 930, 1080, { size: 26, col: BONE }); x.restore() }
  else label(x, 'no finish line.', 920, 1080, { size: 28, col: GOLD, alpha: prog(t, 19.2, 19.6) })
  x.restore()
}
const PLACES = [
  { cx: 220, cy: 780, cap: 'the café', bm: ['..C..', '.MMM.', 'MMMMM', 'MMMMM', '.MMM.'], col: { C: BONE, M: '#d99a52' } },
  { cx: 540, cy: 700, cap: 'the bench', bm: ['BBBBBBB', '.......', 'BBBBBBB', 'L.....L', 'L.....L'], col: { B: '#a87a50', L: INK } },
  { cx: 860, cy: 780, cap: 'that song', bm: ['...NN', '...NN', '...N.', '.NNN.', 'NNNN.', '.NN..'], col: { N: CYAN } },
]
function bench(x, cx, cy) { box(x, cx - 260, cy, 520, 34, '#a87a50', { b: 7 }); box(x, cx - 260, cy - 110, 520, 30, '#a87a50', { b: 7 }); R(x, INK, cx - 230, cy + 34, 18, FLOOR - cy - 34); R(x, INK, cx + 212, cy + 34, 18, FLOOR - cy - 34) }
function routeMap(x, t, k, a) {
  if (k <= 0.01) return
  x.save(); x.translate(540, 860); x.scale(k, k)
  box(x, -380, -260, 760, 520, '#e9e0c8', { b: 8 })
  for (let i = 0; i < 6; i++) { R(x, '#d0c4a4', -380, -260 + i * 90, 760, 10); R(x, '#d0c4a4', -380 + i * 140, -260, 10, 520) }
  // home, old café, new café
  drawBits(x, ['.H.', 'HHH', 'HDH'], { H: '#c86b4a', D: INK }, -300, 180, 16)
  drawBits(x, ['MMM', 'MMM', '.M.'], { M: '#8a6440' }, 260, -180, 16)
  drawBits(x, ['GGG', 'GGG', '.G.'], { G: MINT }, -220, -190, 16)
  // old route (crossed out), new route (draws on)
  x.strokeStyle = '#8a7f9a'; x.lineWidth = 12; x.setLineDash([24, 16]); x.beginPath(); x.moveTo(-300, 150); x.lineTo(240, 150); x.lineTo(260, -150); x.stroke(); x.setLineDash([])
  const c = ease.outCubic(prog(t, a + 1.2, a + 1.8))
  if (c > 0) { x.strokeStyle = RED; x.lineWidth = 14; x.beginPath(); x.moveTo(-40, 40); x.lineTo(-40 + 160 * c, 40 + 160 * c); x.moveTo(120, 40); x.lineTo(120 - 160 * c, 40 + 160 * c); x.stroke() }
  const n = ease.inOutCubic(prog(t, a + 2.4, a + 4.2))
  if (n > 0) {
    x.strokeStyle = MINT; x.lineWidth = 14; x.lineCap = 'round'; x.beginPath()
    const pts = [[-300, 150], [-300, -40], [-120, -40], [-120, -150], [-220, -150]]
    let L = 0; const seg = []; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d }
    let rem = L * n; x.moveTo(...pts[0])
    for (let i = 1; i < pts.length && rem > 0; i++) { const f = Math.min(1, rem / seg[i - 1]); x.lineTo(lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)); rem -= seg[i - 1] }
    x.stroke()
  }
  x.font = `700 22px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText('home', -300, 236); x.fillText('the old café', 260, -236); x.fillText('a new café', -220, -246)
  x.restore()
}
function starMonth(x, t, k, a) {
  if (k <= 0.01) return
  x.save(); x.translate(540, 860); x.scale(k, k)
  box(x, -380, -250, 760, 500, BONE, { b: 8 }); R(x, '#5a4a8a', -380, -250, 760, 60)
  x.font = `800 30px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THIS MONTH', 0, -220)
  const good = [1, 3, 4, 8, 9, 12, 15, 16, 17, 20, 22, 23, 24, 26, 27]
  for (let w = 0; w < 4; w++) for (let i = 0; i < 7; i++) {
    const d = w * 7 + i, X = -350 + i * 100, Y = -170 + w * 100
    x.strokeStyle = 'rgba(27,18,54,0.25)'; x.lineWidth = 3; x.strokeRect(X, Y, 96, 96)
    const gi = good.indexOf(d)
    if (gi >= 0) { const sk = pop01(t, a + 0.6 + gi * 0.32, 0.22, 2.8); if (sk > 0.01) { x.save(); x.translate(X + 48, Y + 48); x.scale(sk, sk); drawBits(x, ['..G..', '.GGG.', 'GGGGG', '.G.G.'], { G: GOLD }, 0, 0, 12); x.restore() } }
  }
  x.restore()
}
function graph(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.translate(540, 900); x.scale(k, k)
  box(x, -420, -260, 840, 520, '#14102a', { b: 8 })
  R(x, 'rgba(239,230,214,0.3)', -380, 200, 760, 4); R(x, 'rgba(239,230,214,0.3)', -380, -220, 4, 420)
  const f = v => 170 - v * 340 + 70 * Math.sin(v * 17) * (1 - v * 0.6) + 40 * Math.sin(v * 41)
  const n = ease.inOutCubic(prog(t, ...T.graph))
  x.strokeStyle = MINT; x.lineWidth = 10; x.lineJoin = 'round'; x.beginPath()
  for (let i = 0; i <= 120 * n; i++) { const v = i / 120; const X = -370 + v * 740, Y = f(v); i ? x.lineTo(X, Y) : x.moveTo(X, Y) }
  x.stroke()
  x.font = `800 30px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'left'; x.fillText('HEALING', -370, -228)
  if (n > 0.35) label(x, 'bad day', -60, f(0.42) + 50, { size: 22, col: '#ff8b9b', alpha: prog(n, 0.35, 0.45) })
  if (n > 0.85) label(x, 'good week', 270, f(0.9) - 50, { size: 22, col: MINT, alpha: prog(n, 0.85, 0.95) })
  x.restore()
}

const EP = makeNormal({
  id: 'kine16', D, ending: 'cut', hero: 'scorpio',
  hook: { text: 'A whole year. | Still not *over it.*', out: T.h0Out, accentColor: '#ff8b9b' },
  promise: { text: 'wait for the *verdict.*', at: T.promise, out: [6.2, 6.5], top: 1640 },
  chapters: [
    { at: CH[0], out: [CH[0] + 3.0, CH[0] + 3.3], n: 1, title: 'the question', y: 450 },
    { at: CH[1], out: [CH[1] + 3.0, CH[1] + 3.3], n: 2, title: 'why it happens', y: 450, color: CYAN },
    { at: CH[2], out: [CH[2] + 3.0, CH[2] + 3.3], n: 3, title: 'what helps', y: 450, color: MINT },
    { at: CH[3], out: [CH[3] + 3.0, CH[3] + 3.3], n: 4, title: 'the verdict', y: 450, color: PINK },
  ],
  fx: [[hook.glitch, hook.glitchCues, GLITCH]],
  heads: [
    { text: 'Everyone says | *move on* already.', at: T.h1, out: T.h1Out, size: 94, accent: '#ff8b9b', late: 2, lateAt: T.h1 + 0.5 },
    { text: 'So… is something | *wrong* with me?', at: T.h2, out: T.h2Out, size: 94, accent: '#ff8b9b', late: 1, lateAt: T.h2 + 0.5 },
    ...HELPS.map((h, i) => ({ text: h, at: T.help[i] + 0.2, out: [T.helpOut[i] - 0.2, T.helpOut[i]], size: 90, accent: MINT, late: 1, lateAt: T.help[i] + 0.6 })),
  ],
  meter: { at: T.meter, land: 'so', out: T.mOut, cy: 1000 },
  boxes: [
    { lines: [{ t: 16.6, text: "grief isn't a race. there's no *finish line.*" }, { t: 20.6, text: 'memories live in places, songs, *dates.*' }, { t: 25.0, text: 'some love just takes *longer* to set down.' }], close: 29.2 },
    { lines: [{ t: 30.8, text: 'talk to someone who *gets* you. out loud.' }], close: 36.9 },
    { lines: [{ t: 38.3, text: 'new café. new walk. give your days a *new* map.' }], close: 44.4 },
    { lines: [{ t: 45.8, text: 'count the good days. even the *small* ones.' }], close: 51.9 },
    { lines: [{ t: 63.5, text: "missing them this long means you *loved.* that's not broken." }], close: 67.8 },
  ],
  stars: { in: 16.2 },
  last: { text: 'Grief has no deadline. | *Keep going.*', at: T.last, lateAt: T.last + 0.6, accent: GOLD, size: 94 },
  punches: [CH[0], ...T.friends, T.months, ...T.ambush, T.h2, CH[1], 19.2, ...T.placesPop, CH[2], ...T.help, CH[3], T.meter + 1.75, T.sunrise],
  shakes: [{ t: 0, a: 16 }],
  scene(x, t, S) {
    const pis = (o) => S.pis(x, t, o)
    // ── HOOK + CH1
    if (t < CH[1]) {
      den(x, t)
      if (t < T.months - 0.3 || t >= T.h2) {
        // the tissue pile and Scorpio (mid-fall at frame 0)
        tissuePile(x, 540, 1380)
        const fall = ease.inQuad(clamp((t + 0.35) / 0.7))
        const shrink = t > T.friends[0] && t < T.months ? 1 - 0.12 * T.friends.filter(f => t > f).length : 1
        x.save(); x.translate(540, 1150); x.rotate(t < 0.4 ? lerp(-0.5, -0.1, fall) : -0.05 * Math.sin(t)); x.translate(-540, -1150)
        S.hero(x, t, { x: 540, y: lerp(980, 1180, fall), s: 380 * shrink, mood: t < 0.4 ? 'wide' : t > T.hug ? 'happy' : 'squint', look: [0, 0.4], squash: t > 0.35 && t < 0.7 ? 0.12 : 0, hops: [0.35, T.glitch + 1.5, T.hug] })
        x.restore()
        if (t < T.months) { calendar(x, t, 860, 900, 1, t < 0.3 ? 364 : 365); flyingPages(x, t) }
        // friends' bubbles
        const FR = ["it's been a YEAR", 'just get back out there', 'still??']
        FR.forEach((f, i) => bubble(x, t, [270, 760, 330][i], [720, 820, 920][i], T.friends[i], T.months - 0.3, f, { size: 32, col: '#ffd8c8', tail: [0.3, -0.4, 0.2][i] }))
        // the hug
        if (t > T.hug) pis({ x: lerp(1200, 760, ease.outCubic(prog(t, T.hug, T.hug + 0.5))), y: 1180, s: 280, tears: 3, mood: 'happy', look: [-1, 0], hops: [T.hug + 0.5] })
        else if (t > T.h2) pis({ x: 900, y: 1660, s: 180, tears: 3, mood: 'wide', look: [-1, -0.6], tissues: 'left' })
        else if (t > T.pisIn) pis({ x: 900, y: 1660, s: 180, pop: pop01(t, T.pisIn, 0.35, 2.2), tears: 2, mood: 'wide', look: [-1, -0.6], tissues: 'left' })
      } else {
        // the year strip
        yearStrip(x, t, pop01(t, T.months - 0.3, 0.35, 2) * outK(t, [T.h2 - 0.3, T.h2]))
        S.hero(x, t, { x: 260, y: 1350, s: 220, mood: 'squint', look: [1, -1], hops: T.ambush })
        pis({ x: 820, y: 1360, s: 220, tears: 3, mood: 'wide', look: [-1, -1], tissues: 'left', hops: T.ambush })
      }
      return
    }
    // ── CH2: why it happens
    if (t < CH[2]) {
      den(x, t)
      if (t < T.raceOut) {
        raceTrack(x, t, pop01(t, CH[1], 0.4, 2))
        // runners zoom past
        for (let i = 0; i < 3; i++) { const p = prog(t, 16.8 + i * 0.6, 18.0 + i * 0.6); if (p > 0 && p < 1) drawStarChar(x, lerp(-150, 1250, p), 1150 + i * 60, 150, t, { color: ['#f0603a', '#9fe6b0', '#ffe27a'][i], mood: 'happy', look: [1, 0], seed: 30 + i, glow: 0.5, squash: -0.08 }) }
        S.hero(x, t, { x: lerp(200, 520, prog(t, CH[1], T.raceOut)), y: 1180, s: 260, mood: t > 19.2 ? 'neutral' : 'squint', look: [1, 0], hops: [16.5, 17.3, 18.1, 18.9, 19.7] })
        pis({ x: 900, y: 920, s: 160, tears: 2, mood: 'wide', look: [-1, 0.5] })
      } else if (t < T.heavy) {
        PLACES.forEach((p, i) => {
          const k = pop01(t, T.placesPop[i], 0.3, 2.4)
          if (k <= 0.01) return
          x.save(); x.translate(p.cx, p.cy); x.scale(k, k)
          x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 130, 0, Math.PI * 2); x.fill(); x.fillStyle = '#2a2050'; x.beginPath(); x.arc(0, 0, 120, 0, Math.PI * 2); x.fill()
          drawBits(x, p.bm, p.col, 0, -10, 18); x.restore()
          label(x, p.cap, p.cx, p.cy + 160, { size: 26, col: BONE, alpha: k })
        })
        S.hero(x, t, { x: 540, y: 1180, s: 300, mood: 'squint', look: [0, -1], hops: T.placesPop })
        pis({ x: 880, y: 1240, s: 180, tears: 3, mood: 'wide', look: [-1, -0.5], tissues: 'left' })
      } else {
        // the heavy box marked LOVE, lowered slowly
        const low = ease.inOutCubic(prog(t, T.heavy + 0.8, T.heavyOut - 0.6))
        S.hero(x, t, { x: 540, y: 1180, s: 300, mood: low > 0.9 ? 'happy' : 'squint', look: [0, -1], squash: 0.06 * (1 - low), hops: [T.heavyOut - 0.6] })
        x.save(); x.translate(540, lerp(870, 1290, low)); box(x, -160, -100, 320, 200, '#c86b4a', { b: 8, hi: '#e08a64' }); x.font = `800 54px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('LOVE', 0, 4); x.restore()
        label(x, 'slowly.', 800, 1000, { size: 34, col: GOLD, alpha: prog(t, T.heavy + 1.5, T.heavy + 2) })
        pis({ x: 180, y: 1240, s: 180, tears: 3, mood: 'sparkle', look: [1, -0.5], tissues: 'right' })
      }
      S.stars(x, t, { x: 140, y: 640, s: 120, pop: pop01(t, 16.2, 0.35, 2.1), mood: 'neutral', look: [1, 0.4] })
      return
    }
    // ── CH3: what helps
    if (t < CH[3]) {
      den(x, t, 0.3)
      const hi = t < T.help[1] ? 0 : t < T.help[2] ? 1 : 2
      if (hi === 0) {
        bench(x, 540, 1230)
        const can = { x: 700, y: 1130, s: 260 }
        S.hero(x, t, { x: 380, y: 1130, s: 280, mood: t > 33.5 ? 'happy' : 'neutral', look: [1, 0], hops: [30.5, 32.0, 33.5, 35.0] })
        drawStarChar(x, can.x, can.y, can.s, t, { color: CAN.color, glyph: CAN.glyph, mood: 'sparkle', look: [-1, 0], seed: 8, hops: [31.2, 33.8] })
        bubble(x, t, 380, 880, 31.0, 33.4, 'can I talk about them?', { size: 30, tail: 0 })
        bubble(x, t, 700, 880, 33.4, 37.0, 'always. tell me.', { size: 30, col: '#c9ecfb', tail: 0 })
        if (t > 33.6) hearts(x, t, 33.6, 540, 1000, { n: 5 })
        pis({ x: 950, y: 1130, s: 160, tears: 3, mood: 'sparkle', look: [-1, 0] })
      } else if (hi === 1) {
        routeMap(x, t, pop01(t, T.help[1] + 0.3, 0.35, 2.2), T.help[1])
        S.hero(x, t, { x: 220, y: 1290, s: 190, mood: t > T.help[1] + 4.2 ? 'happy' : 'neutral', look: [1, -1], hops: [T.help[1] + 2.4, T.help[1] + 4.2] })
        pis({ x: 870, y: 1290, s: 190, tears: t > T.help[1] + 4.2 ? 3 : 2, mood: 'sparkle', look: [-1, -1], hops: [T.help[1] + 4.3] })
      } else {
        starMonth(x, t, pop01(t, T.help[2] + 0.3, 0.35, 2.2), T.help[2])
        S.hero(x, t, { x: 220, y: 1290, s: 190, mood: 'happy', look: [1, -1], hops: [46.5, 48.5, 50.5] })
        pis({ x: 870, y: 1290, s: 190, tears: 3, mood: 'happy', look: [-1, -1], hops: [47.0, 49.5] })
      }
      S.stars(x, t, { x: 960, y: 640, s: 110, mood: 'happy', look: [-1, 0.4] })
      return
    }
    // ── CH4: the verdict
    if (t < T.mOut[1]) {
      const k = outK(t, T.mOut), land = T.meter + 1.75
      S.hero(x, t, { x: 230, y: 1560, s: 180, mood: t > land ? 'happy' : 'wide', look: [1, -1], pop: k * pop01(t, CH[3] + 0.2, 0.3, 2), hops: [land] })
      pis({ x: 850, y: 1560, s: 180, mood: t > land ? 'happy' : 'wide', look: [-1, -1], pop: k * pop01(t, CH[3] + 0.3, 0.3, 2), tears: 3, hops: [land, land + 0.4] })
    }
    if (t >= T.mOut[0]) {
      const sr = ease.inOutCubic(prog(t, T.sunrise, T.sunrise + 2))
      den(x, t, sr)
      if (sr > 0) { glowAt(x, 540, 1480, 600, '255,190,120', 0.5 * sr); x.save(); x.fillStyle = GOLD; x.beginPath(); x.arc(540, 1480 + 140 * (1 - sr), 150, Math.PI, 0); x.fill(); x.restore() }
      graph(x, t, pop01(t, T.mOut[0] + 0.2, 0.35, 2.1) * outK(t, [T.sunrise + 0.2, T.sunrise + 0.6]))
      const k = pop01(t, T.mOut[0] + 0.1, 0.35, 2.1)
      S.hero(x, t, { x: 380, y: t > T.sunrise ? 1180 : 1330, s: t > T.sunrise ? 320 : 200, pop: k, mood: t > T.sunrise ? 'happy' : 'neutral', look: [0.5, -0.5], hops: [T.graph[1], T.sunrise + 0.5, T.last + 0.3] })
      pis({ x: t > T.sunrise ? 760 : 880, y: t > T.sunrise ? 1200 : 1330, s: t > T.sunrise ? 260 : 180, pop: k, tears: 3, mood: t > T.sunrise ? 'sparkle' : 'wide', look: [-1, -0.4], hops: [T.sunrise + 0.6, T.last + 0.5] })
      if (t > T.sunrise + 1) hearts(x, t, T.sunrise + 1, 570, 1000, { n: 6 })
      S.stars(x, t, { x: 940, y: 620, s: 120, mood: 'happy', look: [-1, 0.4] })
    }
  },
  cues: [
    ['whoosh', 0.0, 0.3, 0.05], ['tom', 0.35, 80, { gain: 0.24, decay: 0.3 }], ...Array.from({ length: 8 }, (_, i) => ['tick', r3(0.1 + i * 0.3), 0.02]),
    ...T.friends.map((f, i) => ['pop', f, [880, 987.77, 1174.66][i], 0.04, [-0.3, 0.3, 0][i]]),
    ...MONTHS.map((m, i) => ['tick', r3(T.months + i * 0.08), 0.03]), ...T.ambush.map((a, i) => ['pop', a, [523.25, 493.88, 440][i], 0.045, 0]),
    ['pop', T.pisIn + 0.05, 987.77, 0.035, 0.4], ['whoosh', T.hug, 0.4, 0.04], ['pluck', T.hug + 0.5, 1174.66, 0.04, 0.6, 0.3],
    ['whoosh', 16.8, 0.4, 0.04], ['whoosh', 17.4, 0.4, 0.04], ['whoosh', 18.0, 0.4, 0.04], ['glitter', 18.4, 19.2], ['bell', 19.2, 1760, 0.03, 1.2, 0.3],
    ...T.placesPop.map((p, i) => ['pop', p, [880, 987.77, 1174.66][i], 0.04, [-0.4, 0, 0.4][i]]),
    ['riser', T.heavy + 0.8, T.heavyOut - 0.6, 0.02], ['tom', T.heavyOut - 0.6, 70, { gain: 0.22, decay: 0.3 }],
    ['pop', 31.0, 880, 0.035, -0.3], ['pop', 33.4, 1174.66, 0.04, 0.3], ['glitter', 33.6, 34.0],
    ['tick', T.help[1] + 1.2, 0.07], ['riser', T.help[1] + 2.4, T.help[1] + 4.2, 0.02], ['bell', T.help[1] + 4.2, 1760, 0.03, 1, 0],
    ...Array.from({ length: 15 }, (_, i) => ['pop', r3(T.help[2] + 0.6 + i * 0.32), [880, 987.77, 1174.66, 1318.51][i % 4], 0.03, (i % 2 ? 0.3 : -0.3)]),
    ['riser', T.graph[0], T.graph[1], 0.02], ['bell', T.sunrise, 1760, 0.03, 1.5, 0], ['glitter', T.sunrise, T.sunrise + 0.8],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [LAV, confetti, shadow, tissues]
