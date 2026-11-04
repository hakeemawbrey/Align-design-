// nh15e07: HOME FOR THE HOLIDAYS, "Libra has to pick a pie" (30 s vertical, Season 15 ep 7; rows in
// promo/films/next30/b03.md; music house · G). Story 0–25.6, then the shared end card. Show look: ../../nh15e01/homekit.js.
//   0.0–4.6    "*Libra* brings someone home. | *Two* grandmas. *Two* pies."  Frame 0: at the table, Libra mid-wobble
//              between two pies held up high by two grandmas (Taurus: pumpkin; Capricorn: cherry lattice); the Aries date
//              beside Libra. GRANDMAS: "so which one is *better*?"
//   4.6        "The | *pendulum.*"  Libra's head swings left, right, left, faster and faster; the wall clock ticks; then
//              the room freezes. tick… tick…
//   9.8        "Then | *Aries…*"  The Aries date holds out two plates. ARIES: "we're not judging." → "we're having
//              *seconds*."
//  15.2        card cut. "Both grandmas | *beam.*"  A slice of each lands on both plates; the grandmas glow; the Pisces cousin
//              cries happy tears. THE STARS: "not every choice needs *a winner*."
//  21.7–25.5   last line "Seconds. | *Of both.*"
import { makeHome, drawRoom, drawTable, pie, clockFace, label, hearts, sparkles, shadow, drawBits, R, INK, BONE, GOLD, PINK, RED, pop01, outK, prog, lerp, clamp, ease, win, tagOf, r3 } from '../../nh15e01/homekit.js'

const GMAS = '♉︎♑︎ GRANDMAS', ARI = tagOf('aries'), STARS = 'THE STARS'
const T = { swing: [4.6, 8.3], freeze: [8.3, 9.7], plates: 9.9, slices: [15.4, 16.0], beam: 16.1, cut: 15.2, last: 21.7 }
const LINES = [
  { t: 1.5, speaker: GMAS, color: '#ffe27a', text: 'so which one is *better*?' },
  { t: 10.2, speaker: ARI, color: '#ff9a7a', text: "we're not judging." },
  { t: 12.5, speaker: ARI, color: '#ff9a7a', text: "we're having *seconds*." },
  { t: 16.4, speaker: STARS, text: 'not every choice needs *a winner*.' },
]
const TOP = 1250

function cherryPie(x, cx, cy, s) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  R(x, INK, -84, 4, 168, 26); R(x, '#d9c6a8', -78, 8, 156, 16)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 8, 78, Math.PI, 0); x.fill()
  x.fillStyle = '#c0303e'; x.beginPath(); x.arc(0, 8, 72, Math.PI, 0); x.fill()
  x.fillStyle = '#e0a860'; for (let i = -3; i <= 3; i++) x.fillRect(i * 20 - 4, 8 - Math.sqrt(Math.max(0, 72 * 72 - (i * 20) ** 2)), 8, Math.sqrt(Math.max(0, 72 * 72 - (i * 20) ** 2)))
  for (let j = 1; j < 4; j++) x.fillRect(-Math.sqrt(72 * 72 - (j * 18) ** 2), 8 - j * 18 - 4, 2 * Math.sqrt(72 * 72 - (j * 18) ** 2), 8)
  x.restore()
}
function slice(x, cx, cy, col, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-40, 18); x.lineTo(40, 18); x.lineTo(0, -32); x.closePath(); x.fill()
  x.fillStyle = col; x.beginPath(); x.moveTo(-33, 12); x.lineTo(33, 12); x.lineTo(0, -24); x.closePath(); x.fill()
  x.fillStyle = '#e0a860'; x.fillRect(-33, 6, 66, 6)
  x.restore()
}
function plateAt(x, cx, cy, s = 1) { x.save(); x.translate(cx, cy); x.scale(s, s); R(x, INK, -62, -12, 124, 24); R(x, '#ffffff', -56, -8, 112, 16); x.restore() }

const EP = makeHome({
  id: 'nh15e07', duration: 30, hero: 'libra', date: 'aries',
  heads: [
    { text: '*Libra* brings someone home. | *Two* grandmas. *Two* pies.', at: -1, out: [4.4, 4.6], size: 74, accentSize: 100 },
    { text: 'The | *pendulum.*', at: 4.7, out: [9.6, 9.8], accent: '#ff9ad0' },
    { text: 'Then | *Aries…*', at: T.plates, out: [15.0, 15.2], accent: '#ff9a7a' },
    { text: 'Both grandmas | *beam.*', at: 15.3, out: [21.45, 21.65], accent: GOLD },
    { text: 'Seconds. | *Of both.*', at: T.last, out: [25.05, 25.45], size: 110, accentSize: 160, late: 2, lateAt: T.last + 0.6, wobble: true },
  ],
  lines: LINES,
  boxes: [{ from: 0, to: 0, close: 4.4 }, { from: 1, to: 2, close: 15.0 }, { from: 3, to: 3, close: 21.5 }],
  flashes: [T.plates], shakes: [T.beam],
  cuts: [4.6, { t: T.cut, kind: 'flip' }, T.last],
  draw(x, t, K) {
    drawRoom(x, t, { fire: false, tree: false, windowX: 80, wall: '#6a4a6a', stripe: '#73527a' })
    // the wall clock (ticks faster in the pendulum, loud in the silence)
    const mins = Math.floor(t * (t < T.freeze[0] ? 2 : 0.7)) % 60
    clockFace(x, 820, 640, 56, 8, mins)
    const y = TOP - 115
    // the swing: Libra's look and lean alternate, faster as it goes
    const sw = prog(t, ...T.swing)
    const ph = t < T.swing[0] ? 0.4 * Math.sin(t * 3) : t < T.swing[1] ? Math.sin((t - T.swing[0]) * (3 + 9 * sw)) : 0
    const lean = ph * 80
    const frozen = win(t, ...T.freeze)
    const lmood = t < T.swing[0] ? 'wide' : t < T.freeze[0] ? 'squint' : frozen ? 'wide' : t < T.beam ? 'happy' : 'sparkle'
    K.fam(x, t, 'taurus', { x: 190, y, s: 220, mood: t < T.beam ? (frozen ? 'neutral' : 'sparkle') : 'heart', look: [1, 0], hops: [T.beam + 0.05], hat: '#ff9aa8', squash: frozen ? 0 : undefined })
    K.fam(x, t, 'capricorn', { x: 860, y, s: 220, mood: t < T.beam ? (frozen ? 'neutral' : 'sparkle') : 'heart', look: [-1, 0], hops: [T.beam + 0.12], hat: '#9fd8f6' })
    K.hero(x, t, { x: 430 + lean, y, s: 230, mood: lmood, look: frozen ? [0, 0] : [ph > 0 ? 1 : -1, -0.6], squash: Math.abs(ph) * 0.08, hops: [-0.1, T.beam, T.last + 0.3], bob: frozen ? 0 : undefined })
    K.date(x, t, { x: 650, y, s: 220, mood: t < T.plates ? 'neutral' : 'happy', look: t < T.plates ? [-1, 0] : [0, 0], hops: [T.plates, ...K.hops(ARI)] })
    K.pisces(x, t, { x: 1000, y: y + 30, s: 130, tears: t > T.beam ? 3 : 2, look: [-1, 0] })
    drawTable(x, t, { y: TOP, dishes: [{ kind: 'candle', x: 540 }] })
    ;[['GRANDMA', 190], ['GRANDMA', 860]].forEach(([s, cx]) => { x.font = "700 21px 'Space Mono', monospace"; const w = x.measureText(s).width + 22; R(x, INK, cx - w / 2 - 4, TOP + 66, w + 8, 38); R(x, BONE, cx - w / 2, TOP + 70, w, 30); x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, cx, TOP + 86) })
    // the pies, held high (bobbing with each swing); they come down when the slices are cut
    const down = ease.inOutCubic(prog(t, T.slices[0] - 0.4, T.slices[0]))
    const bobL = ph < 0 ? 18 : 0, bobR = ph > 0 ? 18 : 0
    pie(x, 230, lerp(y - 210 - bobL, TOP - 30, down), lerp(1.6, 1.05, down), t > T.slices[0] ? 6 : 8)
    cherryPie(x, 830, lerp(y - 210 - bobR, TOP - 30, down), lerp(1.6, 1.05, down))
    // Aries' two plates: up and out, then a slice of each flies onto both
    const pk = pop01(t, T.plates + 0.2, 0.35, 2.4)
    if (pk > 0.01) {
      const p1 = { x: 540, y: y - 200 }, p2 = { x: 760, y: y - 200 }
      plateAt(x, p1.x, p1.y, 1.4 * pk); plateAt(x, p2.x, p2.y, 1.4 * pk)
      for (let i = 0; i < 4; i++) {
        const st = T.slices[0] + i * 0.15, f = ease.inOutCubic(prog(t, st, st + 0.45))
        if (f <= 0) continue
        const from = i % 2 ? { x: 800, y: TOP - 40 } : { x: 250, y: TOP - 40 }
        const to = i < 2 ? p1 : p2
        slice(x, lerp(from.x, to.x + (i % 2 ? 18 : -18), f), lerp(from.y, to.y - 22 - (i % 2) * 6, f) - Math.sin(Math.PI * f) * 120, i % 2 ? '#c0303e' : '#e09a4a', 1.3)
      }
    }
    // the freeze: tick… tick…
    if (frozen) ['tick…', 'tick…'].forEach((s, i) => { const k = pop01(t, T.freeze[0] + 0.2 + i * 0.6, 0.2, 2) * outK(t, [T.freeze[1] - 0.15, T.freeze[1]]); if (k > 0.01) label(x, s, 820 + (i ? 70 : -70), 760 + i * 30, { size: 34 * k, col: BONE }) })
    // swing whoosh lines
    if (t > T.swing[0] && t < T.swing[1]) for (let i = 0; i < 3; i++) { x.save(); x.globalAlpha *= 0.4; R(x, '#ff9ad0', 430 + lean - Math.sign(ph) * (120 + i * 30), y - 60 + i * 40, 60, 8); x.restore() }
    hearts(x, t, T.beam + 0.1, 190, y - 120, { n: 5 }); hearts(x, t, T.beam + 0.2, 860, y - 120, { n: 5 })
    if (win(t, 16.2, T.last)) K.stars(x, t, { x: 540, y: 620, s: 160, pop: pop01(t, 16.25, 0.36, 2.1) * outK(t, [21.4, 21.6]), mood: 'happy', look: [0, 0.6], hops: K.hops(STARS) })
    if (t > T.last) sparkles(x, t, 650, y - 180, T.last + 0.6, 12, 240, 3)
    void [shadow, drawBits, PINK, RED, clamp]
  },
  cues: [
    ...Array.from({ length: 14 }, (_, i) => ['whoosh', r3(4.7 + i * 0.27), 0.18, 0.025]),
    ...[8.5, 9.1].map(s => ['tick', s, 0.08]), ['tick', 9.45, 0.06],
    ['pop', T.plates + 0.25, 1318.51, 0.045, 0.3], ['pop', T.plates + 0.35, 1567.98, 0.04, 0.3],
    ...[0, 1, 2, 3].map(i => ['pop', r3(T.slices[0] + i * 0.15 + 0.45), [987.77, 1174.66, 1318.51, 1567.98][i], 0.04, i % 2 ? 0.3 : -0.3]),
    ['glitter', T.beam, T.beam + 0.6], ['pluck', T.beam + 0.1, 2349.32, 0.015, 0.3, 0.7],
    ['pop', T.last + 0.6, 1174.66, 0.05, 0], ['bell', T.last + 0.65, 1760, 0.03, 1.1, 0], ['glitter', T.last + 0.6, T.last + 1.1],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
