// trnobodygemini: NOBODY: · "Gemini at 2 AM:" (15 s vertical, Star Talk Trends §2.1, music: chiptune · A)
// Story 0–10.6, then the shared end card. The format's look lives in ./nobody.js (identical in all five NOBODY: films).
//   0.00–2.72  "Nobody:"  the blank meme card, a blinking caret, crickets, a tumbleweed. Silence.
//   2.72       card cut → "Gemini at *2 AM:*" (drop 2.82). ♊ Gemini is wide awake under the moon; their date (♎ Libra)
//              is asleep under a quilt, z's rising. A timestamp sticker reads 2:00 AM.
//   3.5–5.3    ♊: "babe. new hobbies. *for us.*" Three hobbies pop in with stickers (rule of three, third twisted):
//              HOBBY #1 UKULELE · HOBBY #2 SOURDOUGH · HOBBY #3 A BIKE FOR TWO. The clock jumps 2:13 → 2:41.
//   5.5–7.5    the escalation: Gemini zips between all three at once: strums the ukulele (Pisces, in the corner,
//              tears up at the song), kneads (the dough puffs over the jar), pedals the tandem (bell!). 3:12 AM.
//              Libra opens one eye…
//   7.75       …sits up, fully in: "Which one are we *doing*?"  Gemini: heart eyes. Pisces: fountains.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import {
  makeNobody, T, GOLD, BONE, INK, MONO, INTER, R, r3, pop01, outK, drawBits, pixelRing, sparkles, hearts, sticker, star, pisces,
} from './nobody.js'

const GEM = signStar('gemini'), LIB = signStar('libra')
const GSP = `${GEM.glyph}︎ GEMINI`
const LINES = [{ t: 3.55, speaker: GSP, color: '#ffe27a', text: 'babe. new hobbies. *for us.*' }]

// the three hobbies
const E = { uke: 3.75, jar: 4.3, bike: 4.85, zip: [5.5, 6.1, 6.7], peek: 7.0 }
const PROP = { uke: { x: 205, y: 690 }, jar: { x: 520, y: 680 }, bike: { x: 835, y: 705 } }
const UKE = ['...hh...', '...hh...', '...nn...', '...nn...', '...nn...', '...nn...', '..bbbb..', '.bbbbbb.', '.bbbbbb.', '..bbbb..', '.bbbbbb.', 'bbbkkbbb', 'bbkkkkbb', 'bbbkkbbb', 'bbbbbbbb', '.bbssbb.', '..bbbb..']
const JAR = ['.llllllll.', '.gggggggg.', '.gwddddwg.', '.gwddddwg.', '.gdddbddg.', '.gddddddg.', '.gdbddddg.', '.gddddddg.', '.gddddbdg.', '.gddddddg.', '..gggggg..']
const NOTE_BM = ['..XXX', '..X.X', '..X..', 'XXX..', 'XXX..']
const CLOCK = [[0, '2:00 AM'], [4.0, '2:13 AM'], [5.5, '2:41 AM'], [6.7, '3:12 AM']]

// Gemini: wide awake, then zipping between hobbies
const GEM_A = { x: 430, y: 1075, s: 270 }
const ZIP = [{ x: 250, y: 1045 }, { x: 540, y: 1035 }, { x: 680, y: 1020 }]
function gemPos(t) {
  let p = { ...GEM_A, s: GEM_A.s }
  E.zip.forEach((z, i) => { const m = ease.outCubic(prog(t, z - 0.15, z)); if (m > 0) p = { x: lerp(p.x, ZIP[i].x, m), y: lerp(p.y, ZIP[i].y, m), s: lerp(p.s, 235, m) } })
  const back = ease.inOutCubic(prog(t, T.P - 0.3, T.P))
  if (back > 0) p = { x: lerp(p.x, 470, back), y: lerp(p.y, 1060, back), s: lerp(p.s, 260, back) }
  return p
}
const GEM_HOPS = [T.drop + 0.1, 3.6, 4.0, 4.6, E.uke + 0.05, E.jar + 0.05, E.bike + 0.05, ...E.zip, 5.8, 6.4, 7.0, T.PLate + 0.05, T.PLate + 0.45]
const LIB_HOPS = [T.P - 0.02, T.PLate + 0.1]

function drawUke(x, t, k) {
  const pk = pop01(t, E.uke, 0.34, 2.4) * k
  if (pk <= 0.01) return
  const strum = t > E.zip[0] && t < E.zip[1] + 0.1
  const rot = -0.35 + (strum ? 0.08 * Math.sin(t * 40) : 0.04 * Math.sin(t * 2))
  drawBits(x, UKE, { h: '#6b3f1f', n: '#8a5a2b', b: '#e09a4a', k: '#3a2210', s: '#6b3f1f' }, PROP.uke.x, PROP.uke.y, 9 * pk, { rot })
  // music notes after the first strum
  if (t > E.zip[0]) for (let i = 0; i < 6; i++) {
    const b = E.zip[0] + i * 0.28, ph = (t - b) / 1.4
    if (ph < 0 || ph > 1) continue
    drawBits(x, NOTE_BM, { X: i % 2 ? GOLD : BONE }, PROP.uke.x + 60 + Math.sin(i * 1.7 + ph * 5) * 30, PROP.uke.y - 40 - ph * 170, 6, { alpha: (1 - ph) * k })
  }
}
function drawJar(x, t, k) {
  const pk = pop01(t, E.jar, 0.34, 2.4) * k
  if (pk <= 0.01) return
  // the dough rises over the rim once Gemini kneads it
  const rise = ease.outCubic(prog(t, E.zip[1] + 0.1, E.zip[1] + 1.4))
  if (rise > 0) {
    const w = (8 + rise * 4) * 9 * pk, h = (1 + rise * 6) * 9 * pk, cx = PROP.jar.x, by = PROP.jar.y - 5.5 * 9 * pk
    const c = 9 * pk
    for (let j = 0; j < h / c; j++) for (let i = 0; i < w / c; i++) {
      const u = (i + 0.5) / (w / c) * 2 - 1, v = 1 - (j + 0.5) / (h / c)
      if (u * u + (1 - v) * (1 - v) > 1.05 && j > 0) continue
      R(x, (i + j) % 7 === 0 ? '#d9c08a' : '#f3e2b8', cx - w / 2 + i * c, by - (j + 1) * c + 2, c + 0.5, c + 0.5)
    }
  }
  drawBits(x, JAR, { l: '#c98b4a', g: '#9fd6e8', w: '#ffffff', d: '#f3e2b8', b: '#d9c08a' }, PROP.jar.x, PROP.jar.y, 9 * pk, { rot: 0.03 * Math.sin(t * 2.4) })
}
function drawBike(x, t, k) {
  const pk = pop01(t, E.bike, 0.34, 2.4) * k
  if (pk <= 0.01) return
  const ride = t > E.zip[2]
  const bob = ride ? 4 * Math.abs(Math.sin(t * 12)) : 0
  x.save(); x.translate(PROP.bike.x, PROP.bike.y - bob); x.scale(pk, pk)
  const c = 6, wr = 48, spin = ride ? (t - E.zip[2]) * 14 : 0
  for (const wx of [-95, 95]) {
    pixelRing(x, wx, 40, wr + 3, c, INK, 1.6)
    pixelRing(x, wx, 40, wr, c, '#cfd6ea', 1)
    x.fillStyle = '#8f97b5'
    for (let s = 0; s < 4; s++) { const a = spin + s * Math.PI / 4; for (let r = 0; r < wr - 6; r += c) x.fillRect(Math.round(wx + Math.cos(a) * r - 2), Math.round(40 + Math.sin(a) * r - 2), 4, 4) }
    R(x, INK, wx - 6, 34, 12, 12)
  }
  // the long frame, two seats, two handlebars
  const bar = (x0, y0, x1, y1) => { const n = Math.ceil(Math.hypot(x1 - x0, y1 - y0) / c); for (let i = 0; i <= n; i++) { R(x, INK, lerp(x0, x1, i / n) - 6, lerp(y0, y1, i / n) - 6, 12, 12) } for (let i = 0; i <= n; i++) R(x, '#ff6b8a', lerp(x0, x1, i / n) - 3, lerp(y0, y1, i / n) - 3, 6, 6) }
  bar(-95, 40, -40, -20); bar(-40, -20, 60, -20); bar(-40, 40, 60, 40); bar(-40, -20, -40, 40); bar(60, -20, 60, 40); bar(60, -20, 95, 40); bar(-95, 40, -40, 40)
  bar(-55, -20, -62, -48); bar(45, -20, 38, -48); bar(80, -10, 88, -55)
  for (const sx of [-62, 38]) { R(x, INK, sx - 24, -60, 48, 16); R(x, '#5a3a2a', sx - 20, -57, 40, 10) }
  R(x, INK, 70, -64, 36, 14); R(x, '#cfd6ea', 74, -61, 28, 8)
  x.restore()
}

function clockSticker(x, t, k) {
  let label = CLOCK[0][1], last = 0
  for (const [c, s] of CLOCK) if (t >= c) { label = s; last = c }
  const bump = last > 0 ? 1 + 0.18 * Math.sin(Math.PI * prog(t, last, last + 0.2)) : 1
  const pk = pop01(t, T.cap + 0.3, 0.3, 2.4) * k * bump
  if (pk <= 0.01) return
  x.save(); x.translate(910, 545); x.rotate(0.06); x.scale(pk, pk)
  x.font = `700 34px ${MONO}`
  const w = x.measureText(label).width + 36
  R(x, INK, -w / 2 - 5, -29, w + 10, 58); R(x, '#241a4d', -w / 2, -24, w, 48)
  x.fillStyle = '#9fe6ff'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(label, 0, 2)
  x.restore()
}

function scene(x, t, Tm, k) {
  if (k <= 0) return
  // a soft moon-glow pool on the bed
  clockSticker(x, t, k)
  drawUke(x, t, k); drawJar(x, t, k); drawBike(x, t, k)
  const so = outK(t, [Tm.P - 0.35, Tm.P - 0.1])
  sticker(x, t, E.uke + 0.12, PROP.uke.x + 5, 850, '#1 UKULELE', { size: 28, rot: -0.06, out: so * k, accent: '#e09a4a' })
  sticker(x, t, E.jar + 0.12, PROP.jar.x, 820, '#2 SOURDOUGH', { size: 28, rot: 0.04, out: so * k, accent: '#f3e2b8' })
  sticker(x, t, E.bike + 0.12, PROP.bike.x, 862, '#3 BIKE FOR TWO', { size: 28, rot: -0.04, out: so * k, accent: '#ff6b8a' })

  // ♎ Libra, asleep under a quilt → one eye → sits up, fully in
  const lp = pop01(t, Tm.drop + 0.12, 0.36, 2) * k
  const up = ease.outBack(prog(t, Tm.P - 0.1, Tm.P + 0.25))
  const LP = { x: 860, y: lerp(1200, 1150, up), s: 190, pop: lp }
  let lm = 'sleepy', ll
  if (t > E.peek) { lm = 'wide'; ll = [-1, -0.5] }
  if (t > Tm.P) { lm = 'sparkle'; ll = [-1, 0] }
  if (t > Tm.PLate + 0.5) lm = 'happy'
  star(x, t, LP, { color: LIB.color, glyph: LIB.glyph, mood: lm, look: ll, hops: LIB_HOPS, seed: 9, blink: lm === 'wide' ? false : undefined })
  // quilt + pillow
  if (lp > 0.01) {
    x.save(); x.globalAlpha = clamp(lp)
    const qy = lerp(1262, 1282, up)
    R(x, INK, 692, qy - 6, 376, 108)
    for (let j = 0; j < 3; j++) for (let i = 0; i < 9; i++) R(x, (i + j) % 2 ? '#c46ad0' : '#f2b8e8', 698 + i * 40.4, qy + j * 32, 40.4, 32)
    R(x, 'rgba(255,255,255,0.25)', 698, qy, 364, 6)
    R(x, INK, 692, qy + 96, 376, 18); R(x, '#6b3f1f', 698, qy + 98, 364, 10)
    for (const lx of [700, 1040]) { R(x, INK, lx - 4, qy + 110, 28, 26); R(x, '#6b3f1f', lx, qy + 110, 20, 20) }
    x.restore()
  }

  // ♊ Gemini
  const P = gemPos(t)
  const gp = pop01(t, Tm.drop, 0.36, 2.1) * k
  let gm = 'sparkle', gl = [0, 0]
  if (t > Tm.P - 0.3) { gm = 'wide'; gl = [1, 0.3] }
  if (t > Tm.PLate) { gm = 'heart'; gl = undefined }
  star(x, t, { ...P, pop: gp }, { color: GEM.color, glyph: GEM.glyph, mood: gm, look: gl, hops: GEM_HOPS, seed: 4, glow: 1.15 })
  // speed lines while zipping
  E.zip.forEach((z, i) => {
    const a = 1 - prog(t, z - 0.15, z + 0.2)
    if (t < z - 0.15 || a <= 0) return
    const from = i ? ZIP[i - 1] : GEM_A, dir = Math.sign(ZIP[i].x - from.x)
    x.save(); x.globalAlpha = a * 0.8
    for (let q = 0; q < 4; q++) R(x, BONE, P.x - dir * (150 + q * 26), P.y - 60 + q * 36, 80 - q * 10, 6)
    x.restore()
  })
  sparkles(x, t, P.x, P.y - 40, Tm.PLate, 10, 170, 2, ['#ff4f86', BONE, GOLD])
  if (t > Tm.PLate) hearts(x, t, P.x, P.y - 120, Tm.PLate + 0.05, 5, 2)

  // ♓ Pisces in the corner, moved by the ukulele
  const pp = pop01(t, Tm.drop + 0.4, 0.3, 2) * k
  const tears = t > Tm.PLate ? 3 : t > E.zip[0] + 0.3 ? 2 : 1
  pisces(x, t, { x: 130, y: 1275, s: 150, pop: pp }, tears, t > E.zip[0] ? 'sparkle' : 'neutral', [1, -1])
  void INTER
}

const EP = makeNobody({
  caption: 'Gemini at *2 AM:*', capAccent: '#6a45c8',
  last: 'Which one are we *doing*?', lastAccent: '#ff8fd8',
  lines: LINES,
  scene,
  cues: Tm => [
    ['pop', r3(Tm.drop + 0.02), 880, 0.04, -0.2], ['pop', r3(Tm.drop + 0.14), 659.25, 0.03, 0.4],
    ...CLOCK.slice(1).map(([c]) => ['tick', c, 0.04]),
    ['pop', E.uke, 739.99, 0.04, -0.4], ['pop', E.jar, 880, 0.04, 0], ['pop', E.bike, 987.77, 0.045, 0.4],
    ['bell', r3(E.bike + 0.12), 2349.32, 0.022, 0.6, 0.4],
    // the escalation: zip whooshes, a strum, dough puffs, the bike bell
    ...E.zip.map((z, i) => ['whoosh', r3(z - 0.15), 0.22, 0.03]),
    ...[0, 0.07, 0.14, 0.21, 0.42, 0.49, 0.56].map((d, i) => ['pluck', r3(E.zip[0] + 0.05 + d), [659.25, 739.99, 880, 987.77, 880, 987.77, 1174.66][i], 0.035, 0.4, -0.4]),
    ['pop', r3(E.zip[1] + 0.3), 440, 0.04, 0], ['pop', r3(E.zip[1] + 0.7), 523.25, 0.035, 0], ['pop', r3(E.zip[1] + 1.1), 587.33, 0.035, 0],
    ['bell', r3(E.zip[2] + 0.1), 2349.32, 0.035, 0.7, 0.4], ['bell', r3(E.zip[2] + 0.32), 2349.32, 0.03, 0.7, 0.4],
    ['pop', E.peek, 1318.51, 0.035, 0.4],
    ['whoosh', r3(Tm.P - 0.1), 0.3, 0.03], ['pluck', r3(Tm.PLate + 0.1), 1174.66, 0.04, 0.5, 0], ['pluck', r3(Tm.PLate + 0.22), 1567.98, 0.035, 0.5, 0],
  ],
})
void INK

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
