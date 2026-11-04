// nh15e11: HOME FOR THE HOLIDAYS, "Aquarius warns about the traditions" (35 s vertical, Season 15 ep 11; rows in
// promo/films/next30/b03.md; music pop · E). Story 0–30.6, then the shared end card. Show look: ../../nh15e01/homekit.js.
//   0.0–4.2    "*Aquarius* brings someone home. | It's *weird* there."  Frame 0: Aquarius mid-warning, arms (points) wide on
//              the porch; the Leo date nods. AQUARIUS: "fair warning: we have *traditions*."
//   4.2        "Tradition 1: | *dessert first.*"  Dinner plates empty, pie for everyone. The Leo is shocked… then delighted.
//   9.0        "Tradition 2: | *star-map wrapping.*"  Every gift is wrapped in an old star map; the Leo unwraps a scarf.
//  13.6        card cut. "Tradition 3: | *good night, moon.*"  Everyone on the snowy roof with a telescope, waving at the moon.
//  17.8        "And a | *new one.*"  LEO: "new one: *silly portrait pose*!" Everyone strikes a pose for Grandpa's drawing.
//              The Pisces cousin weeps at the moon.
//  21.2        "Fit in vs. | *join in.*"  THE STARS: "the right person doesn't *fit in*." → "they *join in*."
//  26.6–30.5   last line "Weird, | *and welcome.*"
import { makeHome, drawHouse, drawYard, drawRoom, drawTable, pie, gift, bubble, label, hearts, sparkles, confetti, snow, shadow, drawBits, R, box, INK, BONE, GOLD, PINK, RED, SNOW, pop01, outK, prog, lerp, clamp, ease, win, stand, tagOf, r3, FLOOR, drawTree } from '../../nh15e01/homekit.js'

const AQU = tagOf('aquarius'), LEO = tagOf('leo'), STARS = 'THE STARS'
const T = { t1: 4.2, t2: 9.0, t3: 13.6, unwrap: 10.8, wave: 15.2, newOne: 17.8, pose: 19.4, stars: 21.2, cut: 13.6, last: 26.6 }
const LINES = [
  { t: 1.0, speaker: AQU, color: '#7fd0f0', text: 'fair warning: we have *traditions*.' },
  { t: 18.0, speaker: LEO, color: '#ffc06a', text: 'new one: *silly portrait pose*!' },
  { t: 21.5, speaker: STARS, text: "the right person doesn't *fit in*." },
  { t: 24.3, speaker: STARS, text: 'they *join in*.' },
]
const TOP = 1250, ROOF = 1180

function mapPaper(x, cx, cy, w, h, t) {
  R(x, INK, cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12); R(x, '#1e2a5a', cx - w / 2, cy - h / 2, w, h)
  const pts = [[0.2, 0.3], [0.45, 0.2], [0.7, 0.4], [0.35, 0.7], [0.8, 0.75], [0.55, 0.55]]
  x.save(); x.strokeStyle = 'rgba(200,220,255,0.6)'; x.lineWidth = 2; x.beginPath()
  pts.forEach(([u, v], i) => { const px = cx - w / 2 + u * w, py = cy - h / 2 + v * h; i ? x.lineTo(px, py) : x.moveTo(px, py) }); x.stroke(); x.restore()
  pts.forEach(([u, v], i) => R(x, i % 2 ? GOLD : BONE, cx - w / 2 + u * w - 4, cy - h / 2 + v * h - 4, 8, 8))
  R(x, RED, cx - 6, cy - h / 2, 12, h); R(x, RED, cx - w / 2, cy - 6, w, 12)
  void t
}
function telescope(x, cx, base) {
  for (const d of [-1, 0, 1]) { x.save(); x.translate(cx, base - 120); x.rotate(d * 0.35); R(x, INK, -5, 0, 10, 124); x.restore() }
  x.save(); x.translate(cx, base - 130); x.rotate(-0.7); box(x, -20, -110, 40, 160, '#c8c8d8', { b: 6, hi: '#ffffff' }); R(x, GOLD, -24, -110, 48, 14); x.restore()
}
function roof(x, t) {
  // a snowy roof deck under the night sky
  x.fillStyle = INK; x.beginPath(); x.moveTo(0, ROOF - 10); x.lineTo(1080, ROOF - 60); x.lineTo(1080, 1920); x.lineTo(0, 1920); x.fill()
  x.fillStyle = '#3a2547'; x.beginPath(); x.moveTo(0, ROOF); x.lineTo(1080, ROOF - 50); x.lineTo(1080, 1920); x.lineTo(0, 1920); x.fill()
  for (let i = 0; i < 12; i++) R(x, '#33203f', 0, ROOF + 60 + i * 60, 1080, 6)
  x.fillStyle = SNOW; x.beginPath(); x.moveTo(0, ROOF); x.lineTo(1080, ROOF - 50); x.lineTo(1080, ROOF - 20); x.lineTo(0, ROOF + 30); x.fill()
  box(x, 60, ROOF - 210, 100, 200, '#8a4a48', { b: 6 }); R(x, SNOW, 54, ROOF - 216, 112, 18)
  void t
}
const roofY = (cx, s) => ROOF + 15 - cx * 50 / 1080 - 0.46 * s

const EP = makeHome({
  id: 'nh15e11', duration: 35, hero: 'aquarius', date: 'leo',
  heads: [
    { text: '*Aquarius* brings someone home. | It’s *weird* there.', at: -1, out: [4.0, 4.2], size: 76, accentSize: 104 },
    { text: 'Tradition 1: | *dessert first.*', at: T.t1 + 0.1, out: [8.8, 9.0], accent: '#e09a4a' },
    { text: 'Tradition 2: | *star-map wrapping.*', at: T.t2 + 0.1, out: [13.4, 13.6], accent: '#9fd8f6' },
    { text: 'Tradition 3: | *good night, moon.*', at: T.t3 + 0.1, out: [17.6, 17.8], accent: GOLD },
    { text: 'And a | *new one.*', at: T.newOne, out: [21.0, 21.2], accent: '#ffc06a' },
    { text: 'Fit in vs. | *join in.*', at: T.stars, out: [26.35, 26.55], accent: '#7fd0f0' },
    { text: 'Weird, | *and welcome.*', at: T.last, out: [30.05, 30.45], size: 110, accentSize: 150, late: 2, lateAt: T.last + 0.6, wobble: true },
  ],
  lines: LINES,
  boxes: [{ from: 0, to: 0, close: 4.0 }, { from: 1, to: 1, close: 20.9 }, { from: 2, to: 3, close: 26.4 }],
  flashes: [T.t1, T.t2, T.t3], shakes: [],
  cuts: [T.t1, { t: T.cut, kind: 'flip' }, T.last],
  draw(x, t, K) {
    if (t < T.t1) {
      drawHouse(x, t, { wall: '#3a6a7a', trim: '#305a6a', door: '#e0a020' })
      drawYard(x, t)
      shadow(x, 330, 1350, 200); shadow(x, 780, 1350, 180)
      K.hero(x, t, { x: 330, y: stand(250), s: 250, mood: 'wide', look: [1, 0], squash: -0.08 + 0.05 * Math.sin(t * 6), hops: [-0.12, ...K.hops(AQU)], scarf: '#7fd0f0' })
      K.date(x, t, { x: 780, y: stand(230), s: 230, mood: 'happy', look: [-1, 0], hops: [0.8, 1.6, 2.4, 3.2], scarf: GOLD })
      snow(x, t, { n: 60 })
      return
    }
    if (t < T.t2) {
      // ── tradition 1: dessert first
      drawRoom(x, t, { fire: false, tree: false, windowX: 80, wall: '#3a5a6a', stripe: '#426276' })
      const y = TOP - 115
      const surprised = t < T.t1 + 1.6
      K.fam(x, t, 'aquarius', { x: 170, y, s: 200, mood: 'happy', look: [1, 0], hat: '#ff9aa8', hops: [T.t1 + 0.5, T.t1 + 2.5] })
      K.hero(x, t, { x: 370, y, s: 220, mood: 'sparkle', look: [1, 0], scarf: '#7fd0f0', hops: [T.t1 + 0.7] })
      K.date(x, t, { x: 710, y, s: 220, mood: surprised ? 'wide' : 'heart', look: surprised ? [0, 1] : [0, 0], hops: [T.t1 + 1.7, T.t1 + 2.1], scarf: GOLD })
      K.pisces(x, t, { x: 910, y: y + 10, s: 170, tears: 2, look: [-1, 0.5] })
      drawTable(x, t, { y: TOP, dishes: [{ kind: 'plate', x: 170 }, { kind: 'plate', x: 370 }, { kind: 'plate', x: 710 }, { kind: 'plate', x: 910 }] })
      pie(x, 540, TOP - 34, 1.05, 4)
      ; [170, 370, 710, 910].forEach((px, i) => { if (t > T.t1 + 0.8 + i * 0.2) drawBits(x, ['....P', '..PPP', 'PPPPP'], { P: '#e09a4a' }, px, TOP - 26, 9) })
      label(x, 'MAIN COURSE: LATER', 540, TOP + 100, { size: 30, col: BONE })
      bubble(x, t, 700, 880, T.t1 + 1.8, T.t2 - 0.1, 'I could get used to this.', { size: 32, tail: 0 })
      return
    }
    if (t < T.t3) {
      // ── tradition 2: star-map wrapping
      drawRoom(x, t, { fireX: 540, treeX: 900, windowX: 80, wall: '#3a5a6a', stripe: '#426276' })
      mapPaper(x, 860, 1290, 140, 100, t); mapPaper(x, 980, 1300, 110, 90, t)
      const un = ease.outCubic(prog(t, T.unwrap, T.unwrap + 0.5))
      shadow(x, 300, 1350, 190); shadow(x, 560, 1350, 190)
      K.hero(x, t, { x: 300, y: stand(230), s: 230, mood: 'sparkle', look: [1, 0], scarf: '#7fd0f0', hops: [T.t2 + 0.4] })
      K.date(x, t, { x: 560, y: stand(230), s: 230, mood: t < T.unwrap ? 'wide' : 'heart', look: [0, 1], scarf: t > T.unwrap + 0.4 ? '#1e2a5a' : GOLD, hops: [T.unwrap, T.unwrap + 0.5] })
      if (un < 1) { x.save(); x.translate(560, 1180 - un * 200); x.rotate(un * 1.5); x.globalAlpha *= 1 - un; mapPaper(x, 0, 0, 200, 150, t); x.restore() }
      K.pisces(x, t, { x: 760, y: stand(150), s: 150, tears: 2, look: [-1, 0] })
      sparkles(x, t, 560, 1100, T.unwrap + 0.3, 10, 160, 1)
      bubble(x, t, 560, 860, T.unwrap + 0.6, T.t3 - 0.1, 'is that… Orion on the paper?', { size: 30, tail: 0 })
      return
    }
    // ── the roof: good night, moon (and the new tradition)
    roof(x, t)
    telescope(x, 920, roofY(920, 0) + 10)
    const pose = ease.outBack(prog(t, T.pose, T.pose + 0.4))
    const cast = [['aquarius', 250, 200], ['taurus', 650, 190]]
    K.fam(x, t, 'aquarius', { x: 220, y: roofY(220, 190), s: 190, mood: 'happy', look: [1, -1], hat: '#ff9aa8', tag: 'MOM', hops: [T.wave, T.wave + 0.5, T.pose], squash: -0.1 * pose })
    K.pisces(x, t, { x: 800, y: roofY(800, 150), s: 150, tears: 3, look: [1, -1], tag: 'COUSIN' })
    K.hero(x, t, { x: 400, y: roofY(400, 230), s: 230, mood: t < T.pose ? 'happy' : 'wink', look: [1, -1], scarf: '#7fd0f0', hops: [T.wave + 0.2, T.wave + 0.7, T.pose, T.last + 0.3], squash: 0.12 * pose })
    const dm = t < T.wave + 0.8 ? 'wide' : t < T.newOne ? 'sparkle' : 'happy'
    K.date(x, t, { x: 620, y: roofY(620, 230), s: 230, mood: t > T.last ? 'heart' : dm, look: t < T.wave + 0.8 ? [-1, 0] : [1, -1], scarf: '#1e2a5a', hops: [T.wave + 1.0, ...K.hops(LEO), T.pose, T.last + 0.4], squash: -0.12 * pose })
    bubble(x, t, 400, 840, T.wave, T.newOne - 0.1, 'good night, moon!', { size: 38, tail: 0 })
    // "waving": little pixel hands
    if (win(t, T.wave, T.newOne)) for (const [cx, s] of [[220, 190], [400, 230]]) drawBits(x, ['.H.H.', 'HHHHH', '.HHH.'], { H: BONE }, cx + s * 0.45, roofY(cx, s) - s * 0.3 + 10 * Math.sin(t * 12), 6)
    // the portrait: a sketch frame drops in around everyone
    const fk = pop01(t, T.pose + 0.1, 0.35, 2) * outK(t, [T.stars - 0.2, T.stars])
    if (fk > 0.01) {
      x.save(); x.globalAlpha *= clamp(fk); x.strokeStyle = BONE; x.lineWidth = 8; x.setLineDash([22, 12]); x.strokeRect(110, 820, 860, 420); x.restore()
      label(x, '“family portrait, drawn by Grandpa”', 540, 1280, { size: 26, col: BONE, alpha: clamp(fk) })
      confetti(x, t, T.pose + 0.1, 540, 900)
    }
    if (win(t, T.stars, T.last)) K.stars(x, t, { x: 760, y: 650, s: 150, pop: pop01(t, T.stars + 0.1, 0.36, 2.1) * outK(t, [26.3, 26.55]), mood: 'happy', look: [-1, 0.6], hops: K.hops(STARS) })
    hearts(x, t, T.last + 0.4, 620, 900, { n: 7 })
    if (t > T.last) sparkles(x, t, 500, 1000, T.last + 0.6, 12, 260, 3)
    snow(x, t, { n: 40, speed: 0.5 })
    void [gift, drawTree, cast, RED, PINK, FLOOR]
  },
  cues: [
    ...[0.8, 1.6, 2.4, 3.2].map(s => ['tick', s, 0.03]),
    ...[0, 1, 2, 3].map(i => ['pop', r3(T.t1 + 0.8 + i * 0.2), [880, 987.77, 1174.66, 1318.51][i], 0.04, 0]),
    ['pluck', T.t1 + 1.7, 1567.98, 0.04, 0.5, 0.2],
    ['whoosh', T.unwrap, 0.4, 0.035], ['pop', T.unwrap + 0.3, 1318.51, 0.045, 0], ['glitter', T.unwrap + 0.3, T.unwrap + 0.8],
    ['bell', T.wave, 1760, 0.03, 1.2, 0], ['pluck', T.wave + 1.0, 1174.66, 0.035, 0.5, 0.2],
    ['pop', T.pose, 1567.98, 0.05, 0], ['tick', T.pose + 0.1, 0.06], ['glitter', T.pose + 0.1, T.pose + 0.6],
    ['pluck', 16.4, 2349.32, 0.015, 0.3, 0.5],
    ['pop', T.last + 0.6, 1174.66, 0.05, 0], ['bell', T.last + 0.65, 1760, 0.03, 1.1, 0], ['glitter', T.last + 0.6, T.last + 1.1],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
