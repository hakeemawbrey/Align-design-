// trickclap: CUTE, NOT AN ICK · "They clap when the plane lands." (20 s vertical, Star Talk Trends §11.1, music: jazzy · Bb)
// Story 0–15.6, then the shared end card. The format look lives in ./ickkit.js (identical in all five films).
// THEM: ♐ Sagittarius (claps at everything). ME: ♑ Capricorn (should be cringing; is not).
//   0.0–2.3    hook: "Should be an *ick…* | but it’s *them.*"  Sag gives a little clap; Cap goes heart-eyed.
//   2.3–5.2    MOMENT 1 "claps when the plane *lands.*"  A pixel plane touches down (BUMP, tire smoke); in the cabin
//              cutaway Sag claps CLAP! CLAP! CLAP!  ICK? buzzer… flips to CUTE. Cap: cringe → heart eyes.
//   5.2–8.1    MOMENT 2 "…and when our *bag* comes out."  The baggage belt rolls; a pink suitcase with a heart tag
//              appears; Sag claps and cheers "OUR BAG!!"  ICK? → CUTE.
//   8.1        card cut.
//   8.1–11.3   MOMENT 3 (the twist) "…now the *whole plane* claps."  Back in the cabin: Sag claps alone… the row
//              behind joins, then the back row, then (reluctantly, then fully) Cap. ICK? → CUTE. Confetti.
//   11.35      stamp "NOT AN *ICK.*"  Both clapping. Pisces: SO CUTE.
//   11.95      ♑ Capricorn: "*Applause*, deserved."
import { makeIck, tint, R, box, bubble, label, shadow, sparkles, confetti, hearts, drawBits, clapHands, glowPool, pop01, outK, prog, lerp, clamp, ease, signStar, drawStarChar, INK, BONE, GOLD, PINK, HOT, RED, INTER, T, BUZZ } from './ickkit.js'

const SKY_PINK = '#ff7eb6'
const SAG_L = tint(signStar('sagittarius').color, 0.55), CAP_L = tint(signStar('capricorn').color, 0.55)

// ── the plane (faces left), tail in pink
const PLANE = [
  '.....................TT...',
  '....................TTT...',
  '...BBBBBBBBBBBBBBBBBTTTT..',
  '.BBKBwBwBwBwBwBwBwBwBBBBBB',
  'BKKBBBBBBBBBBBBBBBBBBBBBB.',
  '.BBBBBBBBWWWWWWWBBBBBBBB..',
  '...BBBBBBBBWWWWWBBBBBB....',
  '...........WWWW...........',
]
const PLANE_C = { B: BONE, K: '#7fd0ff', w: '#ffd36b', W: '#a9a2c8', T: SKY_PINK }
const GEAR = ['.....g......g.....']

function runway(x, t, y, speed) {
  R(x, '#1a1430', 0, y, 1080, 70); R(x, '#2c2448', 0, y, 1080, 8)
  const off = (t * speed) % 180
  for (let i = -1; i < 8; i++) R(x, 'rgba(239,230,214,0.55)', i * 180 + off, y + 32, 90, 8)
  for (let i = 0; i < 10; i++) { const lx = ((i * 120 + t * speed * 0.5) % 1200) - 60; R(x, i % 2 ? '#ffd36b' : '#7fd0ff', lx, y - 10, 8, 8) }
}
function plane(x, cx, cy, rot, gear = 1) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  if (gear > 0) { R(x, INK, -60, 40, 8, 26 * gear); R(x, INK, 50, 40, 8, 26 * gear); R(x, '#3b3355', -66, 36 + 26 * gear, 20, 20); R(x, '#3b3355', 44, 36 + 26 * gear, 20, 20) }
  drawBits(x, PLANE, PLANE_C, 0, 0, 11)
  x.restore()
  void GEAR
}
function puff(x, t, t0, cx, cy) {
  const tt = t - t0
  if (tt < 0 || tt > 0.9) return
  x.save(); x.globalAlpha = 1 - tt / 0.9
  for (let i = 0; i < 5; i++) { const s = 18 + tt * 70 + i * 4; R(x, '#cfc8e8', cx + 30 + i * 22 + tt * 120, cy - s / 2 - i * 3, s, s) }
  x.restore()
}

// ── the cabin: wall, windows, seat rows (front view)
function cabinWall(x, t, top, bot) {
  R(x, '#2e2552', 0, top, 1080, bot - top); R(x, '#3a2f66', 0, top, 1080, 16)
  for (let i = 0; i < 4; i++) {
    const wx = 70 + i * 270
    box(x, wx, top + 50, 120, 150, '#0e0b22', { b: 8 })
    R(x, '#1d1640', wx, top + 140, 120, 60)
    for (let k = 0; k < 3; k++) R(x, '#ffd36b', wx + ((k * 50 + t * 300) % 120), top + 150, 6, 6)
  }
}
function seat(x, cx, y, w, col = '#4a6fd0') {
  box(x, cx - w / 2, y, w, w * 0.9, col, { b: 6, hi: 'rgba(255,255,255,0.18)' })
  R(x, '#efe6d6', cx - w * 0.3, y, w * 0.6, w * 0.16)
}
function clapLabels(x, t, cx, cy, claps, s = 40) {
  claps.forEach((c, i) => {
    const k = pop01(t, c, 0.18, 3) * outK(t, [c + 0.45, c + 0.6])
    if (k > 0.01) label(x, 'CLAP!', cx + [-110, 110, -60, 80][i % 4], cy + [-40, -70, -110, -30][i % 4], { size: s * k, col: GOLD, font: INTER, weight: 800, rot: [-0.2, 0.18, -0.08, 0.12][i % 4] })
  })
}
const clapsFrom = (t0, n, gap = 0.24) => Array.from({ length: n }, (_, i) => +(t0 + i * gap).toFixed(3))

// ── MOMENT 1: the landing
function m1(x, t, S) {
  const { u, them, me, themF, meF, meMood, t0 } = S
  // exterior band
  R(x, 'rgba(10,8,26,0.55)', 0, 380, 1080, 420)
  const rwY = 740
  runway(x, t, rwY, u < 0.85 ? 0 : 900 * (1 - prog(u, 0.85, 2.2)))
  const a = ease.inOutQuad(prog(u, 0, 0.85)), d = ease.outCubic(prog(u, 0.85, 1.9))
  let px, py, rot
  if (u < 0.85) { px = lerp(1180, 640, a); py = lerp(420, rwY - 66, a); rot = lerp(-0.22, -0.04, a) }
  else { px = lerp(640, 330, d); py = rwY - 66 + (u < 1.0 ? -10 * Math.sin((u - 0.85) / 0.15 * Math.PI) : 0); rot = u < 1.0 ? -0.04 + 0.05 * Math.sin((u - 0.85) / 0.15 * Math.PI) : 0 }
  plane(x, px, py, rot)
  puff(x, t, t0 + 0.85, px + 60, rwY)
  const bk = pop01(t, t0 + 0.86, 0.2, 3) * outK(t, [t0 + 1.3, t0 + 1.45])
  if (bk > 0.01) label(x, 'BUMP!', px - 40, rwY - 160, { size: 46 * bk, col: BONE, font: INTER, weight: 800, rot: -0.12 })
  // the cabin cutaway
  const bump = u > 0.85 && u < 1.1 ? 10 * Math.sin((u - 0.85) * 40) * (1 - (u - 0.85) / 0.25) : 0
  x.save(); x.translate(0, bump)
  cabinWall(x, t, 810, 1300)
  const claps = clapsFrom(t0 + 0.95, 6, 0.22)
  const oT = { x: 360, y: 1060, s: 210, mood: u < 0.9 ? 'wide' : 'happy', look: [0, -1], hops: claps.filter((_, i) => i % 2 === 0) }
  them(x, t, oT)
  const oM = { x: 720, y: 1070, s: 190, mood: meMood(t), look: [-1, 0] }
  me(x, t, oM)
  hearts(x, t, S.flip + 0.05, 720, 950, { n: 4 })
  seat(x, 360, 1150, 250); seat(x, 720, 1150, 250)
  if (u > 0.9) clapHands(x, t, themF(t, oT), claps, { col: SAG_L })
  clapLabels(x, t, 360, 930, claps)
  x.restore()
  void meF
}

// ── MOMENT 2: the baggage belt
const BAG = ['..hhhh..', '..h..h..', 'BBBBBBBB', 'BBBBBBBB', 'BLBBBBLB', 'BBBBBBBB', 'BLBBBBLB', 'BBBBBBBB']
function bag(x, cx, cy, col, cell = 13, tag = false, rot = 0) {
  drawBits(x, BAG, { h: INK, B: col, L: 'rgba(0,0,0,0.25)' }, cx, cy, cell, { rot })
  if (tag) { R(x, INK, cx + 40, cy - 30, 4, 30); drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: HOT }, cx + 46, cy + 6, 5) }
}
function m2(x, t, S) {
  const { u, them, me, themF, meMood, t0 } = S
  R(x, 'rgba(10,8,26,0.45)', 0, 380, 1080, 920)
  // the carousel: a flap curtain on the left, the slatted belt
  box(x, 0, 520, 150, 260, '#3a2f66', { b: 6 })
  for (let i = 0; i < 6; i++) R(x, i % 2 ? '#2a2148' : '#241c3e', 8 + i * 23, 530, 20, 240)
  const BY = 780
  R(x, INK, 0, BY - 6, 1080, 90); R(x, '#4a4466', 0, BY, 1080, 70)
  const off = (u * 180) % 60
  for (let i = -1; i < 19; i++) R(x, '#5c5680', i * 60 + off, BY + 4, 52, 22)
  R(x, '#8c86a8', 0, BY + 54, 1080, 10)
  // bags riding left → right; ours (pink, heart tag) arrives at centre around u≈1.0, then stops there in a happy wobble
  const others = [['#4f7cd8', -0.2], ['#3fb08a', 0.45], ['#c9a6ff', 1.5], ['#f2c75c', 2.1]]
  others.forEach(([c, ph]) => { const bx = -100 + (u - ph) * 420; if (bx > -120 && bx < 1200) bag(x, bx, BY - 52, c) })
  const ours = Math.min(540, -100 + (u - (-0.55)) * 420 * (1 - 0.6 * prog(u, 0.9, 1.1)))
  bag(x, ours, BY - 52, HOT, 14, true, u > 1.0 ? 0.05 * Math.sin(u * 20) * Math.exp(-(u - 1) * 3) : 0)
  sparkles(x, t, 540, BY - 60, t0 + 1.0, 8, 110, 0.3, [GOLD, BONE, PINK])
  // the two of them in front of the belt
  const claps = clapsFrom(t0 + 1.0, 5, 0.22)
  shadow(x, 330, 1240, 200); shadow(x, 740, 1250, 180)
  const oT = { x: 330, y: 1080, s: 220, mood: u < 0.95 ? 'neutral' : 'sparkle', look: [0.6, -1], hops: [t0 + 1.0, t0 + 1.45, t0 + 1.9] }
  them(x, t, oT)
  if (u > 0.95) clapHands(x, t, themF(t, oT), claps, { col: SAG_L })
  me(x, t, { x: 740, y: 1090, s: 200, mood: meMood(t), look: [-1, -0.3] })
  hearts(x, t, S.flip + 0.05, 740, 960, { n: 4 })
  bubble(x, t, 330, 870, t0 + 1.05, S.t1, 'OUR BAG!!', { size: 40, tail: -0.1 })
}

// ── MOMENT 3: the whole plane claps
const ROW2 = ['aries', 'leo', 'gemini']
const ROW3 = ['taurus', 'libra', 'aquarius', 'cancer']
function m3(x, t, S) {
  const { u, them, me, themF, meF, t0 } = S
  const bump = u < 0.3 ? 8 * Math.sin(u * 50) * (1 - u / 0.3) : 0
  x.save(); x.translate(0, bump)
  cabinWall(x, t, 380, 1300)
  glowPool(x, 540, 900, 520, prog(u, 1.4, 2.2))
  // back row (small), middle row, front row (Sag + Cap)
  const join3 = 1.15, join2 = 0.8, joinMe = 1.45
  ROW3.forEach((id, i) => {
    const cx = 200 + i * 230, o = { x: cx, y: 650, s: 110, color: signStar(id).color, mood: u > join3 ? 'happy' : 'neutral', look: [0, 0], seed: 10 + i, glow: 0.6 }
    drawStarChar(x, cx, 650, 110, t, o)
    seat(x, cx, 690, 140, '#3d5cb0')
    if (u > join3) clapHands(x, t, themF(t, { ...o, seed: 10 + i }), clapsFrom(t0 + join3 + i * 0.05, 12, 0.2), { col: tint(o.color, 0.55) })
  })
  ROW2.forEach((id, i) => {
    const cx = 230 + i * 310, o = { x: cx, y: 830, s: 150, color: signStar(id).color, mood: u > join2 ? 'sparkle' : 'neutral', look: [0, 0], seed: 20 + i, glow: 0.7 }
    drawStarChar(x, cx, 830, 150, t, o)
    seat(x, cx, 885, 190, '#4566c0')
    if (u > join2) clapHands(x, t, themF(t, { ...o, seed: 20 + i }), clapsFrom(t0 + join2 + i * 0.07, 12, 0.21), { col: tint(o.color, 0.55) })
  })
  const clapsT = clapsFrom(t0 + 0.4, 14, 0.2), clapsM = clapsFrom(t0 + joinMe, 9, 0.2)
  const oT = { x: 340, y: 1060, s: 220, mood: 'happy', look: [0, -1], hops: clapsT.filter((_, i) => i % 3 === 0) }
  them(x, t, oT)
  const meMood = u < joinMe ? 'neutral' : t < S.flip ? 'squint' : 'heart'
  const oM = { x: 740, y: 1070, s: 200, mood: meMood, look: u < joinMe ? [-1, -0.2] : [0, -1] }
  me(x, t, oM)
  seat(x, 340, 1150, 260); seat(x, 740, 1150, 260)
  clapHands(x, t, themF(t, oT), clapsT, { col: SAG_L })
  if (u > joinMe) clapHands(x, t, meF(t, oM), clapsM, { col: CAP_L })
  clapLabels(x, t, 340, 940, clapsT.slice(0, 3))
  clapLabels(x, t, 540, 560, clapsFrom(t0 + 1.2, 4, 0.3), 48)
  hearts(x, t, S.flip + 0.05, 740, 950, { n: 5 })
  confetti(x, t, S.flip + 0.1, 540, 600, { n: 30 })
  x.restore()
}

const EP = makeIck({
  id: 'trickclap', them: 'sagittarius', me: 'capricorn', meName: 'CAPRICORN', deep: '#7a2fd0', accent: SKY_PINK,
  hook(x, t, S) { if (S.tk > 0.5) clapHands(x, t, S.themF(t, { x: 700, y: 1000, s: 290, pop: S.tk, hops: [T.themIn + 0.35, T.swoon - 0.1, T.swoon + 0.35] }), [1.15, 1.4, 1.65], { col: SAG_L }) },
  moments: [
    { caption: 'claps when the plane *lands.*', draw: m1, badge: { x: 790, y: 480 },
      cues: [['whoosh', 0.1, 0.8, 0.03], ['boom', 0.85, 0.16], ['tom', 0.85, 80, { gain: 0.2, decay: 0.25 }],
        ...clapsFrom(0.95, 6, 0.22).map((c, i) => ['clap', c, { gain: 0.12, pan: i % 2 ? 0.25 : -0.25 }])] },
    { caption: '…and when our *bag* comes out.', draw: m2, badge: { x: 800, y: 470 },
      cues: [['tick', 0.2, 0.03], ['tick', 0.5, 0.03], ['pop', 1.0, 1318.51, 0.045, 0], ['glitter', 1.0, 1.3],
        ...clapsFrom(1.0, 5, 0.22).map((c, i) => ['clap', c, { gain: 0.12, pan: i % 2 ? -0.3 : -0.1 }]), ['pop', 1.05, 880, 0.03, -0.3]] },
    { caption: '…now the *whole plane* claps.', draw: m3, badge: { x: 540, y: 470 },
      cues: [['boom', 0.05, 0.12],
        ...clapsFrom(0.4, 4, 0.2).map(c => ['clap', c, { gain: 0.11, pan: -0.3 }]),
        ...clapsFrom(0.8, 12, 0.1).map((c, i) => ['clap', c, { gain: 0.1 + 0.004 * i, pan: ((i % 5) - 2) * 0.2 }]),
        ['riser', 0.8, 1.6, 0.012], ['glitter', 2.35, 2.9]] },
  ],
  finale(x, t, S) {
    const { them, me, themF, meF, ok, ME_FIN_HOPS, THEM_FIN_HOPS } = S
    shadow(x, 360, 1150, 220 * ok); shadow(x, 700, 1160, 200 * ok)
    const oT = { x: 360, y: 940, s: 260, pop: ok, mood: 'happy', look: [1, 0], hops: THEM_FIN_HOPS }
    const oM = { x: 700, y: 960, s: 230, pop: ok, mood: 'heart', look: [-1, 0], hops: ME_FIN_HOPS }
    them(x, t, oT); me(x, t, oM)
    clapHands(x, t, themF(t, oT), clapsFrom(T.stamp + 0.1, 16, 0.22), { col: SAG_L })
    clapHands(x, t, meF(t, oM), clapsFrom(T.stamp + 0.2, 6, 0.26), { col: CAP_L })
  },
  last: '*Applause*, deserved.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = [...EP.CUES, ...clapsFrom(T.stamp + 0.1, 8, 0.22).map((c, i) => ['clap', c, { gain: 0.08, pan: i % 2 ? 0.2 : -0.2 }])]
void [box, RED, BUZZ, clamp, BONE, drawBits, glowPool]
