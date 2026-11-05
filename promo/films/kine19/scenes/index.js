// kine19: IS THIS NORMAL? (long), "Growing apart from my best friend" (60.4 s vertical, star_advice post, music: dreamy · A).
// The format lives in ../../kine01/normalkit.js. No end card, no card cut. Loop ending (back into frame 0).
//   0.00       frame 0: "Is it normal to | *outgrow* a friend?" landed; ♎ Libra mid-type on a wall-of-text message while two
//              friendship bracelets stretch apart between them and ♉ Taurus. Whip zoom.  2.4: "wait for the *check-in.*"
//   CH 1 · THE DRIFT (2.6)
//     2.6   "We used to talk | *every* day."  A photo album: each year's page has fewer photos.
//     8.4   the call log: 3h 12m → 1h 05m → 12m → missed.
//    12.6   "Now it's | *birthday texts.*"  ♓ Pisces cries over the album.
//   CH 2 · WHY IT HAPPENS (16.5)
//    17.0   "friendships change shape when *lives* move."  Two little orbits drift apart.
//    21.0   "new jobs, new cities, new *routines.*"  Icons pop on each side.
//    25.0   "drifting isn't always a *fight.* sometimes it's just time."
//   CH 3 · THE CHECK-IN (30.0)  A bench. A talk card: "What do you miss about us?" "the dumb voice notes." "same. I
//           miss YOU." "monthly walk?" "first Sunday. every month."
//   CH 4 · THE VERDICT (46.5)
//    47.0   NORMAL-O-METER: NORMAL.  52.0 the bracelets get re-knotted, looser. Pisces sobs.
//    52.4   "some friendships end. some just need more *room.*"
//    58.0   last line: "Friendships change shape. | Some just *change.*"  Then the loop back into frame 0.
import {
  makeNormal, GOLD, BONE, PINK, INK, RED, MINT, CYAN, LAV, INTER, MONO, R, box, drawBits, sparkles, hearts, bubble, label, shadow, glowAt,
  room, pop01, outK, prog, lerp, clamp, ease, r3, signStar, drawStarChar,
} from '../../kine01/normalkit.js'

const D = 60.4, FLOOR = 1480
const TAU = signStar('taurus')
const CH = [2.6, 16.5, 30.0, 46.5]
const T = {
  h0Out: [2.4, 2.6], promise: 2.4,
  h1: 2.6, h1Out: [12.4, 12.6], album: 3.2, calls: [8.6, 9.4, 10.2, 11.0], h2: 12.6, h2Out: [16.2, 16.4], pisAlbum: 13.4,
  orbit: 16.8, icons: [21.4, 22.1, 22.8, 23.5], time: 25.2,
  card: 30.8, b: [32.2, 34.4, 36.6, 38.8, 41.0], cal: 42.6,
  meter: 47.0, mOut: [51.6, 51.9], knot: 52.0, last: 58.0,
}
const LIBC = '#7fd0f0'

function lounge(x, t) { room(x, { y: FLOOR, wall: '#1c1d44', floor: '#2a2a52' }) }
// two bracelets stretched between two points, with tension (k 0 slack … 1 taut)
function bracelets(x, t, ax, ay, bx, by, taut, loose = 0) {
  for (let j = 0; j < 2; j++) {
    const sag = lerp(120, 6, taut) + loose * 80
    x.strokeStyle = INK; x.lineWidth = 16; x.beginPath(); x.moveTo(ax, ay + j * 26); x.quadraticCurveTo((ax + bx) / 2, (ay + by) / 2 + sag + j * 26, bx, by + j * 26); x.stroke()
    const n = 14
    for (let i = 0; i <= n; i++) {
      const u = i / n, px = (1 - u) * (1 - u) * ax + 2 * u * (1 - u) * (ax + bx) / 2 + u * u * bx
      const py = (1 - u) * (1 - u) * (ay + j * 26) + 2 * u * (1 - u) * ((ay + by) / 2 + sag + j * 26) + u * u * (by + j * 26)
      R(x, [PINK, GOLD, MINT, LIBC][(i + j) % 4], px - 7, py - 7, 14, 14)
    }
  }
  if (taut > 0.9 && Math.floor(t * 10) % 2) label(x, '*strain*', (ax + bx) / 2, (ay + by) / 2 - 40, { size: 26, col: '#ff8b9b' })
}
function wallOfText(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  box(x, -170, -230, 340, 460, '#120c2a', { b: 8 })
  for (let i = 0; i < 12; i++) R(x, 'rgba(239,230,214,0.75)', -140, -190 + i * 32, 280 - ((i * 53) % 90), 12)
  x.font = `700 20px ${MONO}`; x.fillStyle = GOLD; x.textAlign = 'center'; x.fillText('to: bestie (draft)', 0, 210)
  x.restore()
}
function album(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.translate(540, 860); x.scale(k, k)
  box(x, -400, -260, 800, 520, '#7a4a8a', { b: 8 }); R(x, '#f4e8cc', -380, -240, 380, 480); R(x, '#f4e8cc', 0, -240, 380, 480)
  const yrs = [['2019', 8], ['2021', 5], ['2023', 2], ['2025', 1]]
  const pi = Math.min(3, Math.floor((t - T.album) / 1.3))
  yrs.forEach(([y, n], i) => {
    if (i !== Math.max(0, pi)) return
    x.font = `800 40px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText(y, -190, -190)
    for (let q = 0; q < n; q++) { const X = -350 + (q % 4) * 170 + (q >= 4 ? 0 : 0), Y = -140 + Math.floor(q / 4) * 190; box(x, X, Y, 140, 150, ['#ff8fb1', '#7fd0ff', '#9fe6b0', '#ffd27a'][q % 4], { b: 5 }); drawBits(x, ['.S.S.', 'SSSSS'], { S: BONE }, X + 70, Y + 70, 8) }
    if (n <= 2) label(x, n === 1 ? 'one photo.' : 'two photos.', 190, 0, { size: 34, col: '#8a2b4e', font: INTER, weight: 800 })
  })
  x.restore()
}
function callLog(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.translate(540, 860); x.scale(k, k)
  box(x, -330, -280, 660, 560, '#120c2a', { b: 8 }); R(x, '#1f1747', -330, -280, 660, 70)
  x.font = `800 30px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('calls with ♉︎ bestie', 0, -244)
  const rows = [['3h 12m', MINT], ['1h 05m', GOLD], ['12m', '#ffb38a'], ['missed', RED]]
  rows.forEach(([s, c], i) => {
    const kk = pop01(t, T.calls[i], 0.25, 2.4)
    if (kk <= 0.01) return
    x.save(); x.translate(0, -140 + i * 110); x.scale(kk, kk)
    x.font = `700 40px ${MONO}`; x.fillStyle = c; x.fillText(s, 120, 0)
    x.font = `700 26px ${MONO}`; x.fillStyle = 'rgba(239,230,214,0.6)'; x.fillText(['2019', '2021', '2023', '2025'][i], -180, 0)
    x.restore()
  })
  x.restore()
}
function orbits(x, t, k) {
  if (k <= 0.01) return
  const apart = ease.inOutCubic(prog(t, T.orbit + 0.5, T.time + 2))
  const c1 = 540 - 40 - 220 * apart, c2 = 540 + 40 + 220 * apart
  x.save(); x.globalAlpha *= k
  x.strokeStyle = 'rgba(239,230,214,0.3)'; x.lineWidth = 4
  x.beginPath(); x.arc(c1, 900, 190, 0, Math.PI * 2); x.stroke(); x.beginPath(); x.arc(c2, 900, 190, 0, Math.PI * 2); x.stroke()
  drawStarChar(x, c1 + Math.cos(t * 1.2) * 190, 900 + Math.sin(t * 1.2) * 190, 130, t, { color: signStar('libra').color, mood: 'happy', seed: 3, look: [1, 0] })
  drawStarChar(x, c2 + Math.cos(t * 1.2 + Math.PI) * 190, 900 + Math.sin(t * 1.2 + Math.PI) * 190, 130, t, { color: TAU.color, mood: 'happy', seed: 8, look: [-1, 0] })
  const ICON = [[c1 - 120, 640, ['BBBB', 'B..B', 'BBBB'], { B: '#8a6440' }, 'new job'], [c2 + 120, 640, ['.H.', 'HHH', 'HHH'], { H: '#7fd0ff' }, 'new city'], [c1 - 120, 1180, ['G.G', 'GGG', '.G.'], { G: MINT }, 'new hobby'], [c2 + 120, 1180, ['D..', 'DDD', 'D.D'], { D: '#d99a52' }, 'a dog!']]
  ICON.forEach(([ix, iy, bm, col, cap], i) => { const kk = pop01(t, T.icons[i], 0.3, 2.4); if (kk > 0.01) { drawBits(x, bm, col, ix, iy, 18 * kk); label(x, cap, ix, iy + 60, { size: 22, col: BONE, alpha: kk }) } })
  x.restore()
}
function bench(x) { box(x, 160, 1210, 760, 34, '#a87a50', { b: 7 }); box(x, 160, 1090, 760, 30, '#a87a50', { b: 7 }); R(x, INK, 190, 1244, 18, FLOOR - 1244); R(x, INK, 872, 1244, 18, FLOOR - 1244) }

const EP = makeNormal({
  id: 'kine19', D, ending: 'loop', hero: 'libra',
  hook: { text: 'Is it normal to | *outgrow* a friend?', out: T.h0Out, accentColor: LIBC },
  promise: { text: 'wait for the *check-in.*', at: T.promise, out: [5.8, 6.1], top: 1640 },
  chapters: [
    { at: CH[0], out: [CH[0] + 3.0, CH[0] + 3.3], n: 1, title: 'the drift', y: 450 },
    { at: CH[1], out: [CH[1] + 3.0, CH[1] + 3.3], n: 2, title: 'why it happens', y: 450, color: CYAN },
    { at: CH[2], out: [CH[2] + 3.0, CH[2] + 3.3], n: 3, title: 'the check-in', y: 450, color: MINT },
    { at: CH[3], out: [CH[3] + 3.0, CH[3] + 3.3], n: 4, title: 'the verdict', y: 450, color: PINK },
  ],
  heads: [
    { text: 'We used to talk | *every* day.', at: T.h1, out: T.h1Out, size: 96, accent: LIBC, late: 1, lateAt: T.h1 + 0.5 },
    { text: 'Now it’s | *birthday texts.*', at: T.h2, out: T.h2Out, size: 100, accent: LIBC, late: 2, lateAt: T.h2 + 0.4 },
  ],
  meter: { at: T.meter, land: 'normal', out: T.mOut, cy: 1000 },
  boxes: [
    { lines: [{ t: 17.0, text: 'friendships change shape when *lives* move.' }, { t: 21.0, text: 'new jobs, new cities, new *routines.*' }, { t: 25.0, text: "drifting isn't always a *fight.* sometimes it's time." }], close: 29.7, y: 1460 },
    { lines: [{ t: 52.4, text: 'some friendships end. some just need more *room.*' }], close: 57.7, y: 1460 },
  ],
  stars: { in: 16.7 },
  last: { text: 'Friendships change shape. | Some just *change.*', at: T.last, lateAt: T.last + 0.6, accent: GOLD, size: 90 },
  punches: [CH[0], T.album + 1.3, T.album + 2.6, T.album + 3.9, ...T.calls, T.h2, CH[1], ...T.icons, CH[2], T.card, ...T.b, T.cal, CH[3], T.meter + 1.75, T.knot],
  scene(x, t, S) {
    const pis = o => S.pis(x, t, o)
    const tau = (o) => drawStarChar(x, o.x, o.y, o.s, t, { color: TAU.color, glyph: o.s >= 150 ? TAU.glyph : null, seed: 8, ...o })
    if (t < CH[0]) {
      lounge(x, t)
      // frame 0: Libra mid-type, the bracelets taut between them
      S.hero(x, t, { x: 240, y: 1250, s: 320, mood: 'squint', look: [1, -1], squash: 0.03 * Math.sin(t * 22), hops: [0.4, 1.2, 2.0] })
      tau({ x: 860, y: 1260, s: 280, mood: 'neutral', look: [-1, 0] })
      bracelets(x, t, 330, 1140, 770, 1150, 1)
      wallOfText(x, t, 540, 780, 1)
      pis({ x: 540, y: 1640, s: 170, tears: 2, mood: 'wide', look: [0, -1], tissues: 'left' })
      return
    }
    if (t < CH[1]) {
      lounge(x, t)
      if (t < T.calls[0] - 0.3) album(x, t, pop01(t, T.album - 0.3, 0.35, 2.2) * outK(t, [T.calls[0] - 0.6, T.calls[0] - 0.3]))
      else if (t < T.h2) callLog(x, t, pop01(t, T.calls[0] - 0.3, 0.35, 2.2) * outK(t, [T.h2 - 0.3, T.h2]))
      else album(x, t + 10, pop01(t, T.h2, 0.35, 2.2))
      S.hero(x, t, { x: 230, y: 1330, s: 240, mood: t > T.calls[3] ? 'wide' : 'neutral', look: [1, -1], hops: [T.album + 1.3, T.album + 2.6, T.album + 3.9, T.calls[3]] })
      pis({ x: 860, y: 1330, s: 220, tears: t > T.pisAlbum ? 3 : 2, mood: 'wide', look: [-1, -1], tissues: 'left', hops: [T.pisAlbum] })
      return
    }
    if (t < CH[2]) {
      lounge(x, t)
      orbits(x, t, pop01(t, T.orbit, 0.35, 2.2) * outK(t, [CH[2] - 0.4, CH[2] - 0.1]))
      if (t > T.time) label(x, 'no fight. just time.', 540, 900, { size: 34, col: GOLD, font: INTER, weight: 800, alpha: prog(t, T.time, T.time + 0.4) * outK(t, [CH[2] - 0.4, CH[2] - 0.1]) })
      pis({ x: 900, y: 1330, s: 190, tears: 3, mood: 'sparkle', look: [-1, -1] })
      S.stars(x, t, { x: 140, y: 620, s: 120, pop: pop01(t, T.orbit, 0.35, 2.1), mood: 'neutral', look: [1, 0.4] })
      return
    }
    if (t < CH[3]) {
      lounge(x, t)
      bench(x)
      // the talk card
      const ck = pop01(t, T.card, 0.35, 2.4)
      if (ck > 0.01) { x.save(); x.translate(540, 1240); x.rotate(-0.04); x.scale(ck, ck); box(x, -170, -80, 340, 160, '#2a1f55', { b: 7 }); x.font = `700 20px ${MONO}`; x.fillStyle = GOLD; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TALK CARD', 0, -46); x.font = `800 28px ${INTER}`; x.fillStyle = BONE; x.fillText('What do you miss', 0, 0); x.fillText('about us?', 0, 36); x.restore() }
      const said = ['honestly? the dumb voice notes.', 'same. I miss YOU.', "I've been so busy. I'm sorry.", 'me too. monthly walk?', 'first Sunday. every month.']
      said.forEach((s2, i) => bubble(x, t, i % 2 ? 680 : 400, 760 + (i % 2) * 90, T.b[i], i < 4 ? T.b[i + 1] + 0.6 : CH[3] - 0.2, s2, { size: 32, col: i % 2 ? '#ffe2b8' : '#c9ecfb', tail: i % 2 ? 0.4 : -0.4 }))
      S.hero(x, t, { x: 330, y: 1100, s: 280, mood: t > T.b[1] ? 'happy' : 'neutral', look: [1, 0], hops: [T.b[0], T.b[2] + 0.4, T.b[3], T.cal], blush: t > T.b[1] })
      tau({ x: 760, y: 1100, s: 280, mood: t > T.b[1] - 0.1 ? 'happy' : 'neutral', look: [-1, 0], hops: [T.b[1], T.b[2], T.b[4]] })
      if (t > T.b[1]) hearts(x, t, T.b[1] + 0.2, 540, 980, { n: 5 })
      if (t > T.cal) { const k = pop01(t, T.cal, 0.3, 2.4); x.save(); x.translate(540, 600); x.scale(k, k); box(x, -150, -70, 300, 140, BONE, { b: 6 }); R(x, RED, -150, -70, 300, 36); x.font = `800 22px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.fillText('EVERY MONTH', 0, -50); x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.fillText('1st Sunday: walk', 0, 20); x.restore() }
      pis({ x: 960, y: 1330, s: 160, tears: 3, mood: t > T.b[1] ? 'happy' : 'sparkle', look: [-1, -0.5], hops: [T.b[1] + 0.2, T.cal + 0.2] })
      return
    }
    lounge(x, t)
    if (t < T.mOut[1]) {
      const k = outK(t, T.mOut) * pop01(t, CH[3] + 0.2, 0.3, 2), land = T.meter + 1.75
      S.hero(x, t, { x: 230, y: 1560, s: 180, mood: t > land ? 'happy' : 'wide', look: [1, -1], pop: k, hops: [land] })
      pis({ x: 850, y: 1560, s: 180, mood: t > land ? 'happy' : 'wide', look: [-1, -1], pop: k, tears: 3, hops: [land, land + 0.4] })
    }
    if (t >= T.mOut[0]) {
      const k = pop01(t, T.knot, 0.35, 2.1)
      S.hero(x, t, { x: 240, y: 1180, s: 300, pop: k, mood: 'happy', look: [1, 0], hops: [T.knot + 0.6, 55] })
      tau({ x: 860, y: 1180, s: 280, pop: k, mood: 'happy', look: [-1, 0], hops: [T.knot + 0.7, 55.3] })
      const lz = ease.inOutCubic(prog(t, T.knot + 0.4, T.knot + 1.6))
      if (k > 0.5) bracelets(x, t, 330, 1080, 770, 1090, 0.3, lz)
      if (t > T.knot + 1.6) { sparkles(x, t, 540, 1180, T.knot + 1.6, 10, 140, 1, [PINK, GOLD, MINT]); label(x, 'looser. still tied.', 540, 860, { size: 30, col: GOLD, font: INTER, weight: 800, alpha: prog(t, T.knot + 1.6, T.knot + 2) }) }
      pis({ x: 540, y: 680, s: 170, pop: k, tears: 3, mood: 'sparkle', look: [0, 1], hops: [T.knot + 1.7, T.last + 0.5] })
    }
  },
  cues: [
    ...Array.from({ length: 12 }, (_, i) => ['tick', r3(0.02 + i * 0.2), 0.02]),
    ['whoosh', T.album - 0.3, 0.35, 0.04], ...[1.3, 2.6, 3.9].map(d => ['whoosh', r3(T.album + d), 0.25, 0.03]),
    ...T.calls.map((c, i) => ['pop', c, [1318.51, 1174.66, 987.77, 587.33][i], 0.045, 0]),
    ['pop', T.pisAlbum, 987.77, 0.035, 0.4], ['pluck', T.pisAlbum + 0.3, 880, 0.03, 0.5, 0.4],
    ['riser', T.orbit + 0.5, T.time + 2, 0.015], ...T.icons.map((c, i) => ['pop', c, [880, 987.77, 1174.66, 1318.51][i], 0.04, (i % 2 ? 0.4 : -0.4)]),
    ['whoosh', T.card - 0.05, 0.3, 0.04], ['pluck', T.card + 0.3, 1318.51, 0.035, 0.6, 0],
    ...T.b.map((b, i) => ['pop', b, i % 2 ? 1174.66 : 987.77, 0.04, i % 2 ? 0.3 : -0.3]), ['glitter', T.b[1] + 0.2, T.b[1] + 0.6],
    ['pop', T.cal, 1567.98, 0.045, 0], ['bell', T.cal + 0.1, 1760, 0.03, 1.2, 0],
    ['whoosh', T.knot, 0.35, 0.04], ['tick', T.knot + 1.6, 0.06], ['glitter', T.knot + 1.6, T.knot + 2.1], ['bell', T.knot + 1.7, 2349.32, 0.025, 1.2, 0],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [LAV, CYAN, shadow, glowAt, clamp, lerp]
