// nc14e03: CUFFING SEASON, "Taurus builds the blanket fort first" (35 s vertical, Season 14 ep 3, music: lofi · F).
// Story 0–30.6, then the shared end card. The show look lives in ../../nc14e01/scenes/cuffkit.js.
//   0.0–7.4    "Taurus built the fort. | *Now* who goes in it?"  Frame 0: a cosy room at night, Taurus mid-hop holding a
//              pillow up to a half-built blanket fort. It stacks up: the blanket roof, fairy lights, ALL the pillows, a
//              snack shelf, and a sign: TAURUS FORT ★★★★★.
//   7.4–15.4   "Five-star fort. | *Zero* guests."  Taurus sits inside alone with two mugs; a VACANCY sign blinks; the clock
//              jumps 8:00 → 9:30 → 11:00. TAURUS: "they'll just… show up. right?"  Pisces, outside the window, sobs.
//  15.4        card cut.
//  15.4–23.0   "Built the place. | Now build the *ask.*"  THE STARS: "you built the *place*." → "now build the *ask*."
//              Taurus texts Capricorn: "want to see my fort? it has a snack shelf."  …typing… "…it has a snack shelf?"
//  23.0–30.6   "Party of | *two.*"  Capricorn crawls in; the sign flips to NO VACANCY; Pisces fountains at the window.
//              THE STARS: "A fort fits two. *Ask* the second."
import {
  makeCuff, R, box, bubble, label, shadow, glow, sparkles, hearts, mug, phone, windowFrame, drawSnow,
  pop01, outK, popOut, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, ICE, PINK, RED, MINT, CREAM,
} from '../../nc14e01/scenes/cuffkit.js'

const T = {
  h0Out: [7.2, 7.4], roof: 0.55, lights: 1.7, pillows: 2.8, shelf: 4.0, star5: 5.2,
  b2: 7.4, h1: 7.55, h1Out: [15.2, 15.4], clock: [9.0, 11.4, 13.4],
  cut: 15.4, h2: 15.55, h2Out: [22.8, 23.0], phIn: 19.3, sent: 19.7, typing: [20.6, 21.6], reply: 21.6,
  b4: 23.0, h3: 23.15, crawl: [23.4, 24.4], noVac: 24.6, last: 25.0,
}
const SP = 'THE STARS', TA = '♉︎ TAURUS'
const B1 = [{ t: 9.6, speaker: TA, color: '#ffd88a', text: "they'll just… *show up.* right?" }]
const B2 = [
  { t: 15.8, speaker: SP, text: 'you built the *place*.' },
  { t: 17.6, speaker: SP, text: 'now build the *ask*.' },
]
const B3 = [{ t: T.last, speaker: SP, text: 'A fort fits two. *Ask* the second.' }]

function room(x, t, K, pisT) {
  R(x, '#2d1d3e', 0, 520, 1080, 900)
  for (let i = 0; i < 9; i++) R(x, '#33224a', i * 130, 520, 8, 900)
  // window with snow outside (Pisces peeks in through it)
  windowFrame(x, 230, 780, 300, 360)
  x.save(); x.beginPath(); x.rect(80, 600, 300, 360); x.clip()
  drawSnow(x, t, 0.9, 1)
  if (pisT) K.pisces(x, t, { x: 250, y: 880, s: 170, pop: pisT.k, scarf: ICE }, pisT.tears, 'sparkle', [1, 0.3])
  x.restore()
  R(x, '#6b4a2f', 224, 600, 12, 360); R(x, '#6b4a2f', 80, 774, 300, 12)
  R(x, '#4a2f2a', 0, 1400, 1080, 520); R(x, '#5a3a32', 0, 1400, 1080, 14)
  for (let i = 0; i < 6; i++) R(x, '#43292a', 0, 1460 + i * 80, 1080, 4)
  // a warm lamp
  box(x, 950, 1080, 30, 320, '#6b4a2f', { b: 5 }); box(x, 890, 1000, 150, 90, '#f7d27a', { b: 6 }); glow(x, 965, 1050, 300, 0.22)
}
function fort(x, t, k) {
  const roofK = easeOutBack(prog(t, T.roof, T.roof + 0.45), 1.4) * k
  // two chair backs
  box(x, 230, 1000, 60, 400, '#7b5634', { b: 6, hi: '#98704a' }); box(x, 790, 1000, 60, 400, '#7b5634', { b: 6, hi: '#98704a' })
  if (roofK > 0.01) {
    const sag = 40 * Math.sin(t * 1.3) * 0.15
    x.save(); x.translate(540, 1000); x.scale(1, roofK); x.translate(-540, -1000)
    x.fillStyle = INK; x.beginPath(); x.moveTo(200, 1400); x.lineTo(220, 980); x.quadraticCurveTo(540, 900 + sag, 860, 980); x.lineTo(880, 1400); x.closePath(); x.fill()
    x.fillStyle = '#c7576a'; x.beginPath(); x.moveTo(212, 1392); x.lineTo(230, 990); x.quadraticCurveTo(540, 914 + sag, 850, 990); x.lineTo(868, 1392); x.closePath(); x.fill()
    x.fillStyle = '#e48a98'; for (let i = 0; i < 6; i++) x.fillRect(260 + i * 100, 960, 14, 440)
    // the opening
    x.fillStyle = '#1a1028'; x.beginPath(); x.moveTo(360, 1400); x.lineTo(420, 1080); x.lineTo(660, 1080); x.lineTo(720, 1400); x.closePath(); x.fill()
    x.restore()
  }
  // fairy lights along the roof edge
  const lk = clamp(prog(t, T.lights, T.lights + 0.6)) * k
  for (let i = 0; i < 14; i++) {
    if (i / 14 > lk) continue
    const u = i / 13, px = lerp(225, 855, u), py = 985 - Math.sin(Math.PI * u) * 70
    const on = (Math.floor(t * 3 + i) % 3) !== 0
    const col = [GOLD, PINK, ICE, MINT][i % 4]
    R(x, INK, px - 9, py - 9, 18, 18); R(x, on ? col : '#5a5470', px - 6, py - 6, 12, 12)
    if (on) glow(x, px, py, 34, 0.25, '255,236,180')
  }
}
function pillows(x, t, k) {
  const P = [[300, 1360, '#9fd8ff'], [780, 1360, '#9fe6b0'], [330, 1300, '#ff8fb1'], [760, 1300, '#f7d27a'], [300, 1240, '#c9a6ff'], [790, 1240, '#ffb38a']]
  P.forEach(([px, py, c], i) => {
    const pk = easeOutBack(prog(t, T.pillows + i * 0.14, T.pillows + i * 0.14 + 0.3), 2) * k
    if (pk <= 0.01) return
    x.save(); x.translate(px, py); x.scale(pk, pk); box(x, -70, -26, 140, 52, c, { b: 5, hi: 'rgba(255,255,255,0.3)' }); x.restore()
  })
  const sk = easeOutBack(prog(t, T.shelf, T.shelf + 0.35), 2) * k
  if (sk > 0.01) {
    x.save(); x.translate(640, 1180); x.scale(sk, sk)
    box(x, -60, -8, 120, 14, '#a07850', { b: 4 })
    R(x, '#e8344e', -50, -40, 22, 32); R(x, '#f7d27a', -20, -36, 26, 28); R(x, '#7a4a2e', 14, -44, 18, 36); R(x, MINT, 36, -30, 18, 22)
    x.restore()
  }
}
function fortSign(x, t, text, k, { col = RED } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(540, 880); x.rotate(-0.04); x.scale(k, k)
  box(x, -230, -50, 460, 92, BONE, { b: 7 })
  x.font = "800 40px Inter, sans-serif"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(text, 0, -2)
  x.restore()
}

function scene(x, t, K) {
  const ok = popOut(t, K.OUT)
  const pisK = pop01(t, 1.6, 0.4, 2)
  room(x, t, K, pisK > 0.01 ? { k: pisK * ok, tears: t > T.noVac ? 3 : t > 11 ? 2 : 1 } : null)
  fort(x, t, 1)
  pillows(x, t, 1)
  // the sign: TAURUS FORT ★★★★★ → VACANCY (blinking) → NO VACANCY
  if (t < T.b2) fortSign(x, t, 'TAURUS FORT ★★★★★', pop01(t, T.star5, 0.3, 2.4), { col: '#c45a12' })
  else if (t < T.noVac) fortSign(x, t, Math.floor(t * 2.5) % 2 ? 'VACANCY' : '', 1, { col: RED })
  else fortSign(x, t, 'NO VACANCY', 1 + 0.12 * Math.exp(-(t - T.noVac) * 6) * Math.sin((t - T.noVac) * 30), { col: '#1f8f6e' })
  if (t > T.star5 && t < T.star5 + 0.7) sparkles(x, t, 540, 880, T.star5, 10, 250, 1)
  // Taurus: building (frame 0 mid-hop with a pillow), then inside alone, then with company
  if (t < T.b2) {
    const steps = [0, T.roof, T.lights, T.pillows, T.shelf, T.star5]
    const hx = [480, 560, 420, 330, 640, 540]
    let i = 0; for (let j = 0; j < steps.length; j++) if (t >= steps[j]) i = j
    const px = lerp(hx[Math.max(0, i - 1)], hx[i], ease.inOutCubic(prog(t, steps[i], steps[i] + 0.3)))
    shadow(x, px, 1400, 220)
    const r = K.star(x, t, 'taurus', { x: px, y: 1260, s: 240, mood: t > T.star5 ? 'sparkle' : 'happy', look: [0, -0.6], hops: [-0.1, ...steps.slice(1).map(s => s + 0.02), T.star5 + 0.4], seed: 5 })
    if (t < T.roof) { x.save(); x.translate(px, r.top - 30 - 18 * Math.sin(t * 8)); box(x, -70, -24, 140, 48, '#ff8fb1', { b: 5, hi: 'rgba(255,255,255,0.3)' }); x.restore() }
    if (t > T.pillows && t < T.shelf) label(x, 'PILLOWS: ALL OF THEM', 540, 1560, { size: 34, col: GOLD })
    if (t > T.shelf && t < T.b2) label(x, 'SNACK SHELF: STOCKED', 540, 1560, { size: 34, col: MINT })
    return
  }
  const crawl = ease.inOutCubic(prog(t, ...T.crawl))
  const tx = t > T.b4 ? lerp(540, 470, crawl) : 540
  const tm = t < 11.4 ? 'happy' : t < T.cut ? 'sleepy' : t < T.reply ? 'neutral' : t < T.b4 ? 'wide' : 'sparkle'
  K.star(x, t, 'taurus', { x: tx, y: 1290, s: 210, mood: tm, look: t > T.phIn && t < T.b4 ? [0.6, -0.8] : [0, 0], zzz: false, hops: [...K.hopsFor(TA), T.sent, T.reply + 0.05, T.noVac], seed: 5 })
  mug(x, t, 430, 1360, 0.6, { col: '#e86a5a' })
  mug(x, t, 650, 1360, 0.6, { col: '#4f8cff', steam: t > T.b4 ? 1 : 0.15 })
  // the clock jumps
  if (t > T.b2 && t < T.cut) {
    const cl = t < T.clock[0] ? '8:00 PM' : t < T.clock[1] ? '9:30 PM' : '11:00 PM'
    const jk = 1 + 0.2 * Math.max(...T.clock.map(c => (t > c && t < c + 0.2) ? 1 - (t - c) / 0.2 : 0))
    x.save(); x.translate(820, 640); x.scale(jk, jk); box(x, -120, -44, 240, 88, '#14102a', { b: 6 }); label(x, cl, 0, 2, { size: 42, col: RED }); x.restore()
  }
  // Capricorn crawls in
  if (t > T.b4) {
    const cx = lerp(1200, 620, crawl)
    K.star(x, t, 'capricorn', { x: cx, y: 1300, s: 200, mood: t > T.noVac ? 'happy' : 'sparkle', look: [-1, 0], scarf: '#5a5470', hops: [T.crawl[0] + 0.3, T.crawl[0] + 0.7, T.crawl[1]], seed: 11 })
    hearts(x, t, T.noVac + 0.1, 540, 1150, { n: 6 })
    if (t > T.crawl[1]) bubble(x, t, 760, 1110, T.crawl[1], 26.4, 'snack shelf. confirmed.', { size: 32, col: '#c9f2e2' })
  }
  // the phone
  if (t > T.phIn && t < T.b4) {
    const pk = easeOutBack(prog(t, T.phIn, T.phIn + 0.35), 1.3) * outK(t, [T.b4 - 0.25, T.b4])
    phone(x, t, 540, lerp(1900, 520, pk), 560, 560, { title: '♑︎ CAPRICORN', size: 34, typing: T.typing,
      msgs: [{ at: T.sent, side: 'R', text: 'want to see my fort? it has a snack shelf.', col: '#b07a1c' }, { at: T.reply, side: 'L', text: '…it has a snack shelf?' }] })
  }
}

const EP = makeCuff({
  id: 'nc14e03', duration: 35, ep: 3,
  heads: [
    { text: 'Taurus built the fort. | *Now* who goes in it?', at: -1.2, out: T.h0Out, size: 86, accent: '#ffd88a' },
    { text: 'Five-star fort. | *Zero* guests.', at: T.h1, out: T.h1Out, size: 96 },
    { text: 'Built the place. | Now build the *ask.*', at: T.h2, out: T.h2Out, size: 90, accent: GOLD },
    { text: 'Party of | *two.*', at: T.h3, out: [30.0, 30.3], size: 108, accent: PINK },
  ],
  boxes: [
    { lines: B1, open: 9.4, close: 13.2, y: 1540 },
    { lines: B2, open: 15.6, close: 19.2, y: 1540 },
    { lines: B3, open: T.last - 0.22, close: 29.9, y: 1540 },
  ],
  snow: 0.35,
  cuts: [T.b2, { t: T.cut, kind: 'flip' }, T.b4],
  flashes: [T.b2, T.b4],
  ghost: { x: 965, y: 1000, at: 12.2, from: 'below', cell: 3 },
  draw(x, t, K) { scene(x, t, K) },
  cues: [
    ['whoosh', T.roof, 0.4, 0.035], ['tick', T.roof + 0.4, 0.05],
    ...Array.from({ length: 7 }, (_, i) => ['pop', +(T.lights + i * 0.09).toFixed(3), [880, 987.77, 1174.66, 1318.51][i % 4], 0.02, (i / 3.5) - 1]),
    ...Array.from({ length: 6 }, (_, i) => ['tom', +(T.pillows + i * 0.14).toFixed(3), 120 + i * 8, { gain: 0.12, decay: 0.15 }]),
    ['pop', T.shelf, 1174.66, 0.04, 0.3], ['pop', T.star5, 1318.51, 0.05, 0], ['glitter', T.star5, T.star5 + 0.5], ['bell', T.star5 + 0.1, 1760, 0.025, 1, 0],
    ...T.clock.map(c => ['tick', c, 0.07]), ['pluck', 11.4, 440, 0.03, 0.6, 0.3],
    ['whoosh', T.phIn, 0.35, 0.035], ['pop', T.sent, 1174.66, 0.045, 0.2],
    ['tick', T.typing[0], 0.02], ['tick', T.typing[0] + 0.15, 0.02], ['tick', T.typing[0] + 0.3, 0.02], ['pop', T.reply, 880, 0.045, -0.2],
    ['whoosh', T.crawl[0], 0.4, 0.03], ['pop', T.noVac, 1318.51, 0.05, 0], ['pop', T.noVac + 0.08, 1760, 0.035, 0], ['glitter', T.noVac, T.noVac + 0.5],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [CREAM]
