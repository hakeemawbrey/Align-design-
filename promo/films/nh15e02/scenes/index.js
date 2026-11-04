// nh15e02: HOME FOR THE HOLIDAYS, "Taurus gives the buffet tour" (30 s vertical, Season 15 ep 2; rows in
// promo/films/next30/b03.md; music lofi · F). Story 0–25.6, then the shared end card. Show look: ../../nh15e01/homekit.js.
//   0.0–10.4   "*Taurus* brings someone | home to the *buffet*." → "A guided | *tour.*"  Frame 0: Taurus mid-hop behind
//              the long holiday table, pointer up; the Sagittarius date holds an empty plate. Exhibit A: the rolls
//              ("warm. iconic."), B: the greens ("underrated."), C: the gravy ("has a reputation."), each with a gold
//              museum plaque; the date's plate piles higher at every stop.
//  10.6        jump cut. "One slice | *left.*"  Grandma (Virgo) brings out the famous pie: one slice left. A drumroll;
//              Taurus sweats… and slides the slice onto the date's plate. GASP. The Pisces aunt sobs into a napkin.
//  15.6        card cut. "For a Taurus? | *A love letter.*"  THE STARS: "for a Taurus? that's *a love letter*." The date:
//              "wait. is this a big deal?" Taurus nods; the whole table nods.
//  21.7–25.5   last line "The last slice | *means something.*"
import { makeHome, drawRoom, drawTable, pie, bubble, label, hearts, sparkles, shadow, drawBits, R, INK, BONE, GOLD, PINK, RED, pop01, outK, prog, lerp, clamp, ease, win, stand, tagOf, r3, FLOOR } from '../../nh15e01/homekit.js'

const TAU = tagOf('taurus'), STARS = 'THE STARS', GMA = '♍︎ GRANDMA', SAG = tagOf('sagittarius')
const T = { stops: [0.6, 4.0, 7.2], cutIn: 10.6, pie: 10.75, roll: [12.6, 13.6], slide: [13.7, 14.3], gasp: 14.45, cut: 15.6, nod: 20.6, last: 21.7 }
const LINES = [
  { t: 1.0, speaker: TAU, color: '#9fe6b0', text: 'exhibit A: the rolls. *warm. iconic.*' },
  { t: 4.4, speaker: TAU, color: '#9fe6b0', text: 'exhibit B: the greens. *underrated.*' },
  { t: 7.6, speaker: TAU, color: '#9fe6b0', text: 'and the gravy has *a reputation*.' },
  { t: 11.1, speaker: GMA, color: '#ffe27a', text: "pie's out! *one slice* left." },
  { t: 16.0, speaker: STARS, text: "for a Taurus? that's *a love letter*." },
  { t: 18.95, speaker: SAG, color: '#ffb36b', text: 'wait. is this a *big deal*?' },
]
const DISH = [{ kind: 'rolls', x: 220 }, { kind: 'greens', x: 430 }, { kind: 'gravy', x: 640 }, { kind: 'roast', x: 860 }]
const TOP = 1250       // table top

function plaque(x, t, cx, cy, t0, t1, text) {
  const k = pop01(t, t0, 0.3, 2.6) * outK(t, [t1 - 0.2, t1])
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `700 26px 'Space Mono', monospace`
  const w = x.measureText(text).width + 40
  R(x, INK, -w / 2 - 6, -30, w + 12, 60); R(x, GOLD, -w / 2, -24, w, 48); R(x, '#fff1c8', -w / 2, -24, w, 6)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}
function plate(x, cx, cy, n) {
  R(x, INK, cx - 66, cy - 10, 132, 24); R(x, '#ffffff', cx - 60, cy - 6, 120, 14)
  const food = ['#e0a860', '#3fae6a', '#8a5a32']
  for (let i = 0; i < n; i++) { R(x, INK, cx - 44 + i * 6, cy - 30 - i * 20, 88 - i * 12, 24); R(x, food[i], cx - 40 + i * 6, cy - 26 - i * 20, 80 - i * 12, 16) }
}
function wedge(x, cx, cy, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-50, 22); x.lineTo(50, 22); x.lineTo(0, -40); x.closePath(); x.fill()
  x.fillStyle = '#e09a4a'; x.beginPath(); x.moveTo(-42, 16); x.lineTo(42, 16); x.lineTo(0, -32); x.closePath(); x.fill()
  x.fillStyle = '#c0703a'; x.beginPath(); x.moveTo(-26, 16); x.lineTo(26, 16); x.lineTo(0, -12); x.closePath(); x.fill()
  x.restore()
}

const EP = makeHome({
  id: 'nh15e02', duration: 30, hero: 'taurus', date: 'sagittarius',
  heads: [
    { text: '*Taurus* brings someone | home to the *buffet.*', at: -1, out: [3.9, 4.1], size: 86, accentSize: 116 },
    { text: 'A guided | *tour.*', at: 4.1, out: [10.4, 10.6], accent: GOLD },
    { text: 'One slice | *left.*', at: T.pie, out: [15.4, 15.6], accent: '#e09a4a' },
    { text: 'For a Taurus? | *A love letter.*', at: 15.7, out: [21.45, 21.65], accent: PINK },
    { text: 'The last slice | *means something.*', at: T.last, out: [25.05, 25.45], size: 96, accentSize: 132, late: 2, lateAt: T.last + 0.6, wobble: true },
  ],
  lines: LINES,
  boxes: [{ from: 0, to: 2, close: 10.4 }, { from: 3, to: 3, close: 15.4 }, { from: 4, to: 5, close: 21.6 }],
  flashes: [T.cutIn], shakes: [T.gasp],
  cuts: [T.cutIn, { t: T.cut, kind: 'flip' }, 21.7],
  draw(x, t, K) {
    drawRoom(x, t, { fire: false, treeX: 900, windowX: 110 })
    const after = t >= T.cutIn
    // where Taurus stands: walks the table as a tour guide, then settles
    const stop = T.stops.reduce((a, s, i) => (t >= s ? i : a), 0)
    const walk = ease.inOutCubic(prog(t, T.stops[stop] - 0.45, T.stops[stop]))
    const gx = i => DISH[Math.max(0, i)].x + 40
    let tx = after ? 360 : lerp(gx(stop - 1), gx(stop), stop === 0 ? 1 : walk)
    let dx = after ? 600 : Math.min(830, tx + 230)
    const tauY = TOP - 120, datY = TOP - 110
    const tMood = !after ? 'happy' : t < T.roll[0] ? 'wide' : t < T.slide[0] ? 'squint' : t < T.gasp ? 'happy' : 'sparkle'
    const tHops = [-0.12, 0.6, 4.0, 7.2, ...K.hops(TAU), T.slide[1], T.nod, T.nod + 0.4]
    const h = K.hero(x, t, { x: tx, y: tauY, s: 250, mood: tMood, look: !after ? [-1, 0.6] : t < T.slide[1] ? [0.5, 0.4] : [1, 0], hops: tHops })
    // sweat drop while deciding
    if (win(t, T.roll[0], T.slide[0])) drawBits(x, ['.W.', 'WWW', 'WWW', '.W.'], { W: '#8fe3ff' }, tx + 90, tauY - 70 + 30 * prog(t, T.roll[0], T.slide[0]), 7)
    // pointer during the tour
    if (!after && h) { x.save(); x.strokeStyle = INK; x.lineWidth = 10; x.beginPath(); x.moveTo(tx - 60, tauY + 10); x.lineTo(tx - 150, TOP - 60); x.stroke(); x.strokeStyle = '#a07850'; x.lineWidth = 5; x.stroke(); x.restore(); R(x, RED, tx - 158, TOP - 68, 16, 16) }
    const dMood = !after ? 'happy' : t < T.slide[1] ? 'wide' : t < T.nod - 0.4 ? 'wide' : 'heart'
    K.date(x, t, { x: dx, y: datY, s: 230, mood: dMood, look: !after ? [-1, 0.4] : [-1, 0], hops: [...K.hops(SAG), T.gasp, T.nod + 0.5] })
    // Grandma with the pie, the Pisces aunt
    if (after) {
      const gk = pop01(t, T.pie, 0.35, 2.1)
      K.fam(x, t, 'virgo', { x: 830, y: TOP - 110, s: 230, pop: gk, mood: t < T.gasp ? 'happy' : 'sparkle', look: [-1, 0], tag: null, hops: [...K.hops(GMA), T.nod + 0.2] })
      K.pisces(x, t, { x: 985, y: TOP - 90, s: 160, pop: gk, tears: t > T.gasp ? 3 : 2, look: [-1, 0] })
      if (win(t, 15.6, 21.7)) K.stars(x, t, { x: 880, y: 640, s: 170, pop: pop01(t, 15.8, 0.36, 2.1) * outK(t, [21.4, 21.6]), mood: 'happy', look: [-1, 0.6], hops: K.hops(STARS) })
    } else {
      K.pisces(x, t, { x: 985, y: TOP - 90, s: 160, tears: 1, look: [-1, 0] })
    }
    // the table and its dishes
    const dishes = after ? [{ kind: 'rolls', x: 140 }, { kind: 'candle', x: 250 }] : DISH
    drawTable(x, t, { y: TOP, dishes })
    // name tags along the table edge
    x.save(); x.globalAlpha *= 0.95
    const tag = (s, cx) => { x.font = `700 21px 'Space Mono', monospace`; const w = x.measureText(s).width + 22; R(x, INK, cx - w / 2 - 4, TOP + 66, w + 8, 38); R(x, BONE, cx - w / 2, TOP + 70, w, 30); x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, cx, TOP + 86) }
    if (after) { tag('GRANDMA', 830); tag('AUNT', 1000) }
    x.restore()
    // the date's plate (piles up), the plaques
    const piled = after ? 3 : stop + (t > T.stops[stop] + 0.8 ? 1 : 0)
    plate(x, dx + (after ? -120 : 110), TOP - 6, Math.min(3, piled))
    if (!after) T.stops.forEach((s, i) => plaque(x, t, DISH[i].x + 10, TOP - 330, s + 0.3, (T.stops[i + 1] ?? T.cutIn) - 0.1, ['★ THE ROLLS ★', '★ THE GREENS ★', '★ THE GRAVY ★'][i]))
    // the pie: Grandma sets it down; the slice slides to the date's plate
    if (after) {
      const pk = pop01(t, T.pie + 0.2, 0.35, 2)
      if (pk > 0.01) pie(x, 760, TOP - 30, pk, 0)
      const sl = ease.inOutCubic(prog(t, ...T.slide))
      const hop = Math.sin(Math.PI * sl) * 120
      if (pk > 0.01) wedge(x, lerp(720, dx - 120, sl), lerp(TOP - 34, TOP - 100, sl) - hop, pk)
      // drumroll ticks over the slice
      if (win(t, ...T.roll)) label(x, 'drumroll…', 720, TOP - 330, { size: 34, col: GOLD, rot: 0.04 * Math.sin(t * 30) })
      // GASP ×3
      ;[[240, 900], [560, 820], [930, 880]].forEach(([gx2, gy], i) => { const k = pop01(t, T.gasp + i * 0.08, 0.2, 3) * outK(t, [T.gasp + 1.4, T.gasp + 1.6]); if (k > 0.01) label(x, 'GASP!', gx2, gy, { size: 46 * k, col: PINK, font: 'Inter, sans-serif', weight: 800, rot: [-0.15, 0.1, -0.05][i] }) })
      hearts(x, t, T.nod + 0.4, dx, datY - 140, { n: 7 })
      sparkles(x, t, dx - 120, TOP - 120, T.slide[1], 10, 120, 1)
      bubble(x, t, 930, TOP - 230, T.gasp + 0.3, 21.4, '*napkin sob*', { size: 26, tail: 0.3 })
    }
    if (t > T.last) sparkles(x, t, 540, 1000, T.last + 0.6, 12, 260, 3)
  },
  cues: [
    ...T.stops.flatMap(s => [['pop', r3(s + 0.3), 1318.51, 0.04, 0], ['bell', r3(s + 0.35), 1760, 0.02, 0.8, 0]]),
    ['pop', T.pie + 0.2, 880, 0.045, 0.3], ['tick', T.pie + 0.3, 0.05],
    ...Array.from({ length: 12 }, (_, i) => ['tick', r3(T.roll[0] + i * 0.08), 0.03]),
    ['whoosh', T.slide[0], 0.5, 0.035], ['pluck', T.slide[1], 1174.66, 0.045, 0.5, 0.2],
    ['pop', T.gasp, 1567.98, 0.04, -0.3], ['pop', T.gasp + 0.08, 1318.51, 0.04, 0.3], ['pop', T.gasp + 0.16, 1760, 0.035, 0],
    ['pluck', T.gasp + 0.3, 2349.32, 0.015, 0.3, 0.6],
    ['pluck', T.nod, 987.77, 0.035, 0.5, 0], ['pluck', T.nod + 0.4, 1318.51, 0.035, 0.5, 0], ['glitter', T.nod + 0.4, T.nod + 0.9],
    ['pop', T.last + 0.6, 1174.66, 0.05, 0], ['bell', T.last + 0.65, 1760, 0.03, 1.1, 0], ['glitter', T.last + 0.6, T.last + 1.1],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [shadow, clamp, FLOOR]
