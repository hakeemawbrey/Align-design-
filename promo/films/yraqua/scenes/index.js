// yraqua: THEN vs NOW, "Aquarius dating in 2016 / 2026" (20 s vertical, Star Talk Then vs Now §11, music: lofi · Ab)
// The format's look lives in ./thennow.js (identical in all five Block C films).
//   0–6.85    2016 (old phone video, "03·12·2016"): a café booth at night. ♒ Aquarius (side-swept bangs) explains a
//             galaxy theory on date one: "ok so hear me out—" → napkin one, a spiral: "galaxies are cosmic cinnamon
//             rolls" (♌ Leo: "…ha?") → napkin two, arrows everywhere: "and WE are the frosting" → the check arrives,
//             Aquarius flips it over and keeps drawing: "ok THIS is where it gets wild". Leo nods off (zzz).
//             ♓ Pisces at the back table is moved to tears by the theory.
//   6.85      card cut; the year sticker flips to 2026.
//   6.85–12.3 2026: same booth, string lights. Aquarius starts the same spiral, stops, slides the napkin and pen
//             across: "…what's yours?" Leo lights up and draws a sun in a crown: "the sun? also a Leo." Aquarius
//             draws a heart between the two napkins: "peer reviewed." Pisces sobs happily.
//   12.3–15.6 THE STARS: "same theory. now it's a *duet.*"  Last line: "Weird, *together*."
import {
  makeThenNow, star, pisces, speech, sfxWord, hearts, sparkles, drawBits, R, r3, lerp, prog, ease, clamp, pop01, outK,
  INK, BONE, GOLD, PINK, HEART, MONO, INTER,
} from './thennow.js'

const AQU = 'aquarius', LEO = 'leo'

// ── the place: a café booth at night
function cafe(x, t, now) {
  // back wall + wainscot
  R(x, now ? '#3d2c5e' : '#4a3350', 0, 0, 1080, 1120)
  for (let i = 0; i < 12; i++) R(x, now ? '#45336a' : '#523a58', i * 96 + 30, 0, 8, 1120)
  R(x, now ? '#2b1f47' : '#38263f', 0, 900, 1080, 220); R(x, INK, 0, 896, 1080, 6)
  // the window (left): night sky + moon
  const wx = 80, wy = 470, ww = 400, wh = 330
  R(x, INK, wx - 10, wy - 10, ww + 20, wh + 20); R(x, '#1a1440', wx, wy, ww, wh)
  for (let i = 0; i < 14; i++) { const sx = wx + 20 + ((i * 97) % (ww - 40)), sy = wy + 18 + ((i * 53) % (wh - 60)); R(x, i % 3 ? '#cfc6ff' : '#fff6d8', sx, sy, 6, 6) }
  x.fillStyle = '#fff1c0'; x.beginPath(); x.arc(wx + ww - 90, wy + 80, 34, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#1a1440'; x.beginPath(); x.arc(wx + ww - 74, wy + 70, 30, 0, Math.PI * 2); x.fill()
  R(x, INK, wx + ww / 2 - 4, wy, 8, wh); R(x, INK, wx, wy + wh / 2 - 4, ww, 8)
  // the back table (Pisces sits here)
  R(x, INK, 760, 780, 300, 18); R(x, now ? '#8a5a8a' : '#7a4a52', 764, 776, 292, 12); R(x, INK, 900, 796, 16, 110)
  // a little lamp
  R(x, INK, 640, 0, 6, 330); R(x, INK, 590, 326, 106, 54); R(x, now ? '#ffd88a' : '#ffbf6a', 596, 332, 94, 42)
  const lg = x.createRadialGradient(643, 390, 10, 643, 420, 360); lg.addColorStop(0, `rgba(255,210,140,${now ? 0.22 : 0.3})`); lg.addColorStop(1, 'rgba(255,210,140,0)')
  x.fillStyle = lg; x.fillRect(280, 360, 740, 520)
  if (now) {
    // string lights + a plant
    for (let i = 0; i < 15; i++) {
      const lx = 30 + i * 72, ly = 438 + 22 * Math.sin((i / 14) * Math.PI)
      const on = 0.7 + 0.3 * Math.sin(t * 3 + i * 1.7)
      x.save(); x.globalAlpha = on; R(x, [GOLD, PINK, '#9fe6ff'][i % 3], lx - 7, ly - 2, 14, 16); x.restore()
    }
    x.strokeStyle = INK; x.lineWidth = 3; x.beginPath(); for (let i = 0; i <= 30; i++) { const lx = i * 36, ly = 432 + 22 * Math.sin((i / 30) * Math.PI); i ? x.lineTo(lx, ly) : x.moveTo(lx, ly) } x.stroke()
    R(x, INK, 46, 812, 76, 90); R(x, '#c46a4a', 52, 818, 64, 78)
    for (const [a, b, c] of [[60, 760, 22], [84, 730, 24], [100, 770, 20], [70, 795, 18]]) { R(x, INK, a - 3, b - 3, c + 6, 60); R(x, '#5fbf7a', a, b, c, 54) }
  }
  // floor
  for (let j = 0; j < 8; j++) for (let i = 0; i < 12; i++) R(x, (i + j) % 2 ? (now ? '#2a1e44' : '#3a2436') : (now ? '#352858' : '#4a2e42'), i * 96 - (j % 2) * 0, 1290 + j * 90, 96, 90)
}
function table(x, now) {
  R(x, INK, 70, 1094, 940, 196); R(x, now ? '#b78a62' : '#a8744e', 78, 1102, 924, 150)
  R(x, now ? '#c99c72' : '#ba8660', 78, 1102, 924, 18)
  R(x, now ? '#7a5238' : '#6b4429', 78, 1252, 924, 30)
  R(x, INK, 150, 1282, 26, 220); R(x, INK, 904, 1282, 26, 220)
}
function mug(x, cx, cy, col, t, steam = true) {
  R(x, INK, cx - 34, cy - 54, 68, 64); R(x, col, cx - 28, cy - 48, 56, 52); R(x, INK, cx + 30, cy - 38, 18, 30); R(x, col, cx + 34, cy - 32, 8, 18)
  R(x, '#5a3420', cx - 22, cy - 44, 44, 8)
  if (steam) for (let i = 0; i < 3; i++) { const ph = (t * 0.7 + i / 3) % 1; x.save(); x.globalAlpha = 0.5 * Math.sin(Math.PI * ph); R(x, BONE, cx - 14 + i * 12 + Math.sin(ph * 6 + i) * 6, cy - 70 - ph * 60, 6, 12); x.restore() }
}

// ── a napkin (or the check) lying on the table, with a drawing that writes on (p: 0–1)
function napkin(x, t, cx, cy, p, kind, { rot = 0, k = 1, col = '#fffaf0' } = {}) {
  if (k <= 0.01) return
  const w = kind === 'check' ? 150 : 190, h = kind === 'check' ? 200 : 170
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  R(x, 'rgba(6,4,18,0.35)', -w / 2 + 8, -h / 2 + 10, w, h)
  R(x, INK, -w / 2 - 4, -h / 2 - 4, w + 8, h + 8); R(x, col, -w / 2, -h / 2, w, h)
  if (kind !== 'check') { x.strokeStyle = 'rgba(27,18,54,0.12)'; x.lineWidth = 2; x.strokeRect(-w / 2 + 10, -h / 2 + 10, w - 20, h - 20) }
  x.lineCap = 'round'; x.lineJoin = 'round'
  if (kind === 'spiral' || kind === 'spiral2' || kind === 'check') {
    // the cosmic cinnamon roll
    const N = 90, n = Math.floor(N * p)
    x.strokeStyle = '#3b49c8'; x.lineWidth = 5; x.beginPath()
    for (let i = 0; i <= n; i++) { const a = i * 0.28, rr = 4 + i * 0.72 * (kind === 'check' ? 0.8 : 1); const px = Math.cos(a) * rr, py = Math.sin(a) * rr * 0.9 - (kind === 'check' ? 30 : 0); i ? x.lineTo(px, py) : x.moveTo(px, py) }
    x.stroke()
    if (kind === 'spiral2' && p > 0.6) {
      // arrows everywhere + "WE"
      const q = (p - 0.6) / 0.4
      x.strokeStyle = '#d6336c'; x.lineWidth = 4
      for (let i = 0; i < 4; i++) { if (q < i / 4) continue; const a = i * 1.6 + 0.4; x.beginPath(); x.moveTo(Math.cos(a) * 80, Math.sin(a) * 70); x.lineTo(Math.cos(a) * 40, Math.sin(a) * 35); x.stroke() }
      x.font = `800 30px ${INTER}`; x.fillStyle = '#d6336c'; x.textAlign = 'center'; x.fillText('WE', 50, -52)
    }
    if (kind === 'check') {
      x.font = `700 20px ${MONO}`; x.fillStyle = 'rgba(27,18,54,0.35)'; x.textAlign = 'center'; x.fillText('(the check)', 0, 76)
      if (p > 0.5) { x.strokeStyle = '#d6336c'; x.lineWidth = 4; x.beginPath(); x.arc(0, -30, 70 * (p - 0.5) * 2, 0, Math.PI * 2 * (p - 0.5) * 2); x.stroke(); x.font = `800 30px ${INTER}`; x.fillStyle = '#d6336c'; if (p > 0.85) x.fillText('?!', 58, 40) }
    }
  }
  if (kind === 'sun') {
    // Leo's theory: the sun, wearing a crown
    const q = p
    x.strokeStyle = '#e08a1e'; x.lineWidth = 5
    x.beginPath(); x.arc(0, 10, 34, 0, Math.PI * 2 * Math.min(1, q * 2)); x.stroke()
    if (q > 0.45) for (let i = 0; i < 8; i++) { if (q < 0.45 + i * 0.04) continue; const a = i * Math.PI / 4; x.beginPath(); x.moveTo(Math.cos(a) * 44, 10 + Math.sin(a) * 44); x.lineTo(Math.cos(a) * 60, 10 + Math.sin(a) * 60); x.stroke() }
    if (q > 0.8) { x.fillStyle = GOLD; x.strokeStyle = INK; x.lineWidth = 3; x.beginPath(); x.moveTo(-26, -30); x.lineTo(-26, -56); x.lineTo(-13, -42); x.lineTo(0, -62); x.lineTo(13, -42); x.lineTo(26, -56); x.lineTo(26, -30); x.closePath(); x.fill(); x.stroke() }
    if (q > 0.9) { x.fillStyle = INK; x.fillRect(-12, 2, 6, 6); x.fillRect(6, 2, 6, 6); x.fillRect(-10, 20, 20, 4) }
  }
  x.restore()
}
const scribbleTicks = (t0, d, gain = 0.012) => Array.from({ length: Math.floor(d / 0.09) }, (_, i) => ['tick', r3(t0 + i * 0.09 + (i % 3) * 0.012), gain])

// ── A: 2016
const A = {
  hear: 0.55, nap1: [1.45, 2.5], roll: 1.6, ha: 2.6, nap2: [2.95, 3.8], frost: 3.05,
  check: [4.0, 4.3], flip: [4.4, 4.6], wild: 4.6, draw3: [4.7, 6.0], doze: 5.15,
}
function sceneA(x, t) {
  cafe(x, t, false)
  pisces(x, t, 900, 700, 120, t > A.wild ? 3 : t > A.frost ? 2 : 1, { mood: t > A.frost ? 'sparkle' : 'wide', look: [-1, 1] })
  // Aquarius (bangs!) and Leo
  const aH = [A.hear, A.roll, A.frost, A.wild, A.wild + 0.45], lH = [0.9, A.ha]
  const am = t > A.wild ? 'wide' : t > A.hear ? 'sparkle' : 'happy'
  star(x, t, 300, 1000, 240, AQU, { mood: am, look: t > A.nap1[0] ? [0.6, 1] : [1, 0], hops: aH, seed: 3, bangs: '#4a2c1e', glow: 1.1 })
  let lm = 'happy', ll = [-1, 0]
  if (t > A.roll) lm = 'wide'
  if (t > A.frost + 0.3) { lm = 'squint'; ll = [-1, 1] }
  if (t > A.doze) { lm = 'sleepy'; ll = undefined }
  const nod = t > A.doze ? 14 * Math.sin(Math.min(1, (t - A.doze) * 2) * Math.PI / 2) : 0
  star(x, t, 780, 1000 + nod, 240, LEO, { mood: lm, look: ll, hops: lH, seed: 8, glow: 1 })
  table(x, false)
  mug(x, 165, 1170, '#e9e2d0', t); mug(x, 925, 1170, '#e9e2d0', t)
  // the napkins
  napkin(x, t, 400, 1180, ease.outCubic(prog(t, ...A.nap1)), 'spiral', { rot: -0.08, k: pop01(t, A.nap1[0] - 0.2, 0.25, 2) })
  napkin(x, t, 560, 1170, prog(t, ...A.nap2), 'spiral2', { rot: 0.06, k: pop01(t, A.nap2[0] - 0.2, 0.25, 2) })
  if (t > A.check[0]) {
    const sl = ease.outCubic(prog(t, ...A.check)), fl = prog(t, ...A.flip)
    const sx = Math.abs(Math.cos(fl * Math.PI))
    x.save(); x.translate(lerp(1150, 730, sl), 1180); x.scale(Math.max(0.04, sx), 1); x.translate(-lerp(1150, 730, sl), -1180)
    if (fl < 0.5) {
      // the check, face up
      R(x, INK, lerp(1150, 730, sl) - 79, 1076, 158, 208); R(x, '#fffaf0', lerp(1150, 730, sl) - 75, 1080, 150, 200)
      x.font = `800 30px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText('CHECK', lerp(1150, 730, sl), 1124)
      for (let i = 0; i < 4; i++) R(x, 'rgba(27,18,54,0.3)', lerp(1150, 730, sl) - 55, 1150 + i * 26, 110, 8)
    } else napkin(x, t, 730, 1180, prog(t, ...A.draw3), 'check', { rot: 0 })
    x.restore()
  }
  // the talk
  speech(x, t, 400, 780, A.hear, 'ok so hear me out—', { size: 46, tail: -1, life: 0.95 })
  speech(x, t, 520, 780, A.roll, 'galaxies are cosmic cinnamon rolls', { size: 38, tail: -1, life: 1.3 })
  speech(x, t, 790, 640, A.ha, '…ha?', { size: 46, tail: 0, life: 0.6 })
  speech(x, t, 420, 780, A.frost, 'and WE are the frosting', { size: 44, tail: -1, life: 1.45 })
  speech(x, t, 500, 780, A.wild, 'ok THIS is where it gets wild', { size: 40, tail: -1, life: 1.9 })
  sfxWord(x, t, 760, 1010, A.flip[0] + 0.1, 'flip!', { size: 44, col: PINK, rot: 0.12, life: 0.7 })
}

// ── B: 2026
const B = {
  so: 7.3, nap1: [7.45, 8.15], stop: 8.3, slide: [8.5, 8.85], yours: 8.6, light: 9.25,
  sun: 9.75, nap2: [9.75, 10.6], link: [10.7, 11.05], love: 11.05, peer: 11.25,
}
function sceneB(x, t) {
  cafe(x, t, true)
  pisces(x, t, 900, 700, 120, t > B.love ? 3 : 2, { mood: t > B.love ? 'happy' : 'sparkle', look: [-1, 1], hops: [B.love + 0.05] })
  const aH = [B.so, B.yours, B.love, B.peer], lH = [B.light, B.sun, B.love + 0.08]
  let am = 'sparkle', al = [0.6, 1]
  if (t > B.stop) { am = 'happy'; al = [1, 0] }
  if (t > B.light) { am = 'sparkle'; al = [0.8, 0.6] }
  if (t > B.love) { am = 'heart'; al = undefined }
  star(x, t, 300, 1000, 240, AQU, { mood: am, look: al, hops: aH, seed: 3, glow: 1.2 })
  let lm = 'happy', ll = [-1, 0]
  if (t > B.yours + 0.2) lm = 'wide'
  if (t > B.light) { lm = 'sparkle'; ll = [-0.6, 1] }
  if (t > B.love) { lm = 'heart'; ll = undefined }
  star(x, t, 780, 1000, 240, LEO, { mood: lm, look: ll, hops: lH, seed: 8, glow: 1.2 })
  table(x, true)
  mug(x, 165, 1170, '#9fe6ff', t); mug(x, 925, 1170, '#ffb3c8', t)
  // napkin one: the same spiral; then a blank napkin + the pen slide across to Leo, who draws the crowned sun
  const sl = ease.inOutCubic(prog(t, ...B.slide))
  napkin(x, t, 390, 1180, ease.outCubic(prog(t, ...B.nap1)), 'spiral', { rot: -0.08, k: pop01(t, B.nap1[0] - 0.2, 0.25, 2) })
  napkin(x, t, lerp(470, 690, sl), 1185, ease.outCubic(prog(t, ...B.nap2)), 'sun', { rot: lerp(-0.2, 0.07, sl), k: pop01(t, B.slide[0] - 0.15, 0.2, 2) })
  // the pen
  const penX = lerp(470, 760, sl) + (t > B.nap2[0] && t < B.nap2[1] ? 22 * Math.sin(t * 30) : 0), penY = 1130 + (t > B.nap2[0] && t < B.nap2[1] ? 10 * Math.cos(t * 26) : 0)
  x.save(); x.translate(penX, penY); x.rotate(0.7); R(x, INK, -8, -54, 16, 92); R(x, '#3b49c8', -4, -50, 8, 70); R(x, BONE, -4, 20, 8, 12); x.restore()
  // the link: a heart drawn between the two napkins
  if (t > B.link[0]) {
    const q = ease.outCubic(prog(t, ...B.link))
    x.save(); x.strokeStyle = HEART; x.lineWidth = 6; x.lineCap = 'round'; x.setLineDash([14, 12]); x.beginPath(); x.moveTo(470, 1200); x.lineTo(lerp(470, 600, q), 1200); x.stroke(); x.restore()
    drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: HEART }, 535, 1200, 7 * pop01(t, B.link[1] - 0.1, 0.3, 3))
  }
  if (t > B.love) hearts(x, t, 540, 960, B.love, { n: 8, life: 1.8, cell: 6, spread: 520, seed: 2 })
  sparkles(x, t, 535, 1200, B.link[1], 10, 120, 1, [HEART, GOLD, BONE], 22)
  // the talk
  speech(x, t, 480, 780, B.so, 'ok so. cosmic cinnamon rolls—', { size: 40, tail: -1, life: 1.15 })
  speech(x, t, 400, 780, B.yours, '…what’s yours?', { size: 50, tail: -1, life: 1.1, col: '#ffe1ec' })
  speech(x, t, 700, 780, B.sun, 'the sun? also a Leo.', { size: 46, tail: 1, life: 1.6, col: '#fff1c8' })
  speech(x, t, 380, 780, B.peer, 'peer reviewed.', { size: 48, tail: -1, life: 1.2 })
}

const EP = makeThenNow({
  id: 'yraqua', thing: 'Aquarius dating', then: 2016, date: '03·12·2016', accent: '#7fd0ff',
  A: { draw: sceneA }, B: { draw: sceneB },
  line: 'same theory. now it’s a *duet.*',
  last: 'Weird, *together*.',
  cues: () => [
    ['pop', A.hear, 880, 0.035, -0.3], ['pop', A.roll, 784, 0.035, -0.3], ['pop', A.ha, 659.25, 0.025, 0.3],
    ['pop', A.frost, 880, 0.035, -0.3], ['pop', A.wild, 1046.5, 0.04, -0.3],
    ['whoosh', A.nap1[0] - 0.2, 0.25, 0.02], ...scribbleTicks(A.nap1[0], A.nap1[1] - A.nap1[0]),
    ['whoosh', A.nap2[0] - 0.2, 0.25, 0.02], ...scribbleTicks(A.nap2[0], A.nap2[1] - A.nap2[0]),
    ['whoosh', A.check[0], 0.3, 0.03], ['tick', A.check[1], 0.04], ['whoosh', A.flip[0], 0.18, 0.03], ['pop', r3(A.flip[0] + 0.1), 1318.51, 0.03, 0.2],
    ...scribbleTicks(A.draw3[0], A.draw3[1] - A.draw3[0]),
    ['pluck', A.doze, 392, 0.025, 0.6, 0.3], ['pluck', r3(A.doze + 0.35), 329.63, 0.022, 0.6, 0.3],
    ['pop', B.so, 880, 0.035, -0.3], ...scribbleTicks(B.nap1[0], B.nap1[1] - B.nap1[0]),
    ['tick', B.stop, 0.04], ['whoosh', B.slide[0], 0.3, 0.03], ['pop', B.yours, 1046.5, 0.04, -0.3],
    ['pluck', B.light, 1318.51, 0.035, 0.5, 0.3], ['pop', B.sun, 987.77, 0.04, 0.3], ...scribbleTicks(B.nap2[0], B.nap2[1] - B.nap2[0]),
    ['whoosh', B.link[0], 0.25, 0.02], ['pluck', B.link[1], 1567.98, 0.04, 0.5, 0], ['glitter', B.link[1], r3(B.link[1] + 0.4)],
    ['pop', B.love, 1174.66, 0.035, 0], ['pop', B.peer, 880, 0.035, -0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void clamp; void outK; void MONO; void GOLD
