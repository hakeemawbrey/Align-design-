// trickdogs: CUTE, NOT AN ICK · "They wave at every dog. The dogs wave back." (20 s vertical, Star Talk Trends §11.3,
// music: jazzy · D). Story 0–15.6, then the shared end card. The format look lives in ./ickkit.js (identical in all five).
// THEM: ♈ Aries (greets every dog like a long-lost friend). ME: ♏ Scorpio (should be cringing; is not).
//   0.0–2.3    hook: "Should be an *ick…* | but it’s *them.*"  Aries waves at the lens; Scorpio goes heart-eyed.
//   2.3–5.2    MOMENT 1 "waves at *every* dog."  An evening walk in the park. A little dog trots past; Aries waves with
//              the whole body: "hi BUDDY!!"  ICK? buzzer… flips to CUTE. Scorpio: cringe → heart eyes.
//   5.2–8.1    MOMENT 2 "…even dogs in *cars.*"  A car rolls by with a dog's head out the window; Aries waves both
//              mittens and chases two steps: "HELLO!!"  ICK? → CUTE.
//   8.1        card cut.
//   8.1–11.3   MOMENT 3 (the twist) "…and the dogs *wave back.*"  Three dogs sit in a row… and lift a paw, in unison.
//              Aries: "they WAVED!!"  Scorpio quietly waves at the smallest one. ICK? → CUTE.
//   11.35      stamp "NOT AN *ICK.*"  Both waving, a dog between them waving too. Pisces: SO CUTE.
//   11.95      ♏ Scorpio: "*Friend* of dogs."
import { makeIck, tint, R, box, bubble, label, shadow, sparkles, hearts, waveHand, glowPool, drawBits, pop01, outK, prog, lerp, clamp, ease, signStar, INK, BONE, GOLD, PINK, HOT, INTER, T } from './ickkit.js'

const ARI = signStar('aries'), SCO = signStar('scorpio')
const ARI_L = tint(ARI.color, 0.55), SCO_L = tint(SCO.color, 0.55)

// ── dogs (no breeds, just good dogs). Walking, side view, facing right; two leg frames.
const DOG_A = ['.........EE...', '........BBBBB.', '........BWBBBN', 'A.......BBBBB.', 'AB......BBBT..', '.BBBBBBBBBB...', '.BBBBBBBBBB...', '.BBBBBBBBB....', '.L.L....L.L...', '.L.L....L.L...']
const DOG_B = ['.........EE...', '........BBBBB.', '........BWBBBN', '.A......BBBBB.', '.AB.....BBBT..', '.BBBBBBBBBB...', '.BBBBBBBBBB...', '.BBBBBBBBB....', 'L...L..L...L..', 'L...L..L...L..']
const DOG_SIT = ['..E.....E..', '..EBBBBBE..', '..BBBBBBB..', '..BWBBBWB..', '..BBBNBBB..', '...BBTBB...', '...BBBBB...', '..BBBBBBB..', '..BBBBBBB.A', '..BBBBBBBA.', '..LL...LL..']
const PAW = ['.PP.', 'PPPP', 'PPPP', '.PP.']
const dogCols = (b, e) => ({ B: b, E: e, W: INK, N: INK, T: '#ff8fb1', L: e, A: b })
const DOGS = [dogCols('#e8b77a', '#a8743f'), dogCols('#f4efe6', '#8a8a9a'), dogCols('#6b4a3a', '#3a2620'), dogCols('#d9d2c2', '#5c5450')]
function walkingDog(x, t, cx, cy, cell, cols, dir = 1) {
  const f = Math.floor(t * 8) % 2
  drawBits(x, f ? DOG_A : DOG_B, cols, cx, cy - (f ? 3 : 0), cell, { sx: dir })
}
function sittingDog(x, t, cx, cy, cell, cols, pawUp = 0, seed = 0) {
  drawBits(x, DOG_SIT, cols, cx, cy, cell)
  if (pawUp > 0.01) {
    const a = Math.sin(t * 14 + seed) * 0.5 * pawUp
    drawBits(x, PAW, { P: cols.B }, cx + 5.5 * cell, cy + 2 * cell - pawUp * 4 * cell + a * cell, cell, { rot: a })
  }
}

// ── the park: grass, a sidewalk, lampposts, bushes
function park(x, t, { road = false } = {}) {
  if (road) {
    R(x, '#1a1430', 0, 820, 1080, 170); R(x, '#2c2448', 0, 820, 1080, 8)
    for (let i = 0; i < 7; i++) R(x, 'rgba(242,199,92,0.6)', i * 180 + 30, 900, 90, 8)
  } else {
    for (let i = 0; i < 5; i++) { const bx = 80 + i * 240; x.fillStyle = INK; x.beginPath(); x.arc(bx, 960, 92, 0, Math.PI * 2); x.fill(); x.fillStyle = i % 2 ? '#2f5c4a' : '#28503f'; x.beginPath(); x.arc(bx, 960, 86, 0, Math.PI * 2); x.fill() }
  }
  R(x, '#1f3a32', 0, 990, 1080, 60)
  R(x, INK, 0, 1044, 1080, 8); R(x, '#5f5a7c', 0, 1050, 1080, 250); R(x, '#4c4868', 0, 1050, 1080, 12)
  for (let i = 0; i < 7; i++) R(x, '#4c4868', i * 170, 1050, 6, 250)
  for (const lx of [110, 970]) {
    R(x, INK, lx - 9, 600, 18, 450); R(x, '#3b3355', lx - 4, 600, 8, 450)
    box(x, lx - 34, 560, 68, 50, '#ffd36b', { b: 6 })
    glowPool(x, lx, 640, 280, 0.9, '255,220,150')
  }
}

// ── MOMENT 1: the walk
function m1(x, t, S) {
  const { u, them, me, themF, meMood, t0 } = S
  park(x, t)
  const oT = { x: 330, y: 960, s: 220, mood: u < 0.5 ? 'neutral' : 'sparkle', look: u < 0.5 ? [1, 0.6] : [1, 1], hops: [t0 + 0.55, t0 + 0.85, t0 + 1.15, t0 + 1.45] }
  them(x, t, oT)
  if (u > 0.5) waveHand(x, t, themF(t, oT), 1, { col: ARI_L, speed: 18 })
  me(x, t, { x: 760, y: 970, s: 200, mood: meMood(t), look: [-1, 0.3] })
  hearts(x, t, S.flip + 0.05, 760, 850, { n: 4 })
  // the dog trots in from the left and on out to the right
  const dx = lerp(-120, 1200, prog(u, 0.1, 2.9))
  walkingDog(x, t, dx, 1195, 14, DOGS[0])
  if (u > 0.9 && u < 1.6) label(x, 'wag wag', dx - 120, 1110, { size: 32, col: BONE, font: INTER, weight: 800, rot: -0.1 })
  bubble(x, t, 330, 760, t0 + 0.5, S.t1, 'hi BUDDY!!', { size: 42, tail: 0 })
}

// ── MOMENT 2: a dog in a car
function car(x, cx, cy, col, w = 330) {
  const h = 80
  box(x, cx - w * 0.3, cy - h - 62, w * 0.6, 68, col, { b: 6 })
  R(x, '#bfe8ff', cx - w * 0.26, cy - h - 54, w * 0.23, 48); R(x, '#bfe8ff', cx + w * 0.03, cy - h - 54, w * 0.23, 48)
  box(x, cx - w / 2, cy - h, w, h, col, { b: 6, hi: 'rgba(255,255,255,0.25)' })
  R(x, '#fff1a8', cx - w / 2 + 6, cy - h + 14, 16, 14); R(x, '#e8344e', cx + w / 2 - 20, cy - h + 14, 14, 14)
  for (const d of [-0.3, 0.3]) { R(x, INK, cx + d * w - 30, cy - 14, 60, 46); R(x, '#5a5470', cx + d * w - 14, cy + 2, 28, 16) }
}
const DOG_HEAD = ['E....E', 'EBBBBE', 'BWBBWB', 'BBNNBB', '.BTTB.', '..TT..']
function m2(x, t, S) {
  const { u, them, me, themF, meMood, t0 } = S
  park(x, t, { road: true })
  // the car rolls right → left, slowing as it passes the middle
  const cx = lerp(1320, -320, ease.inOutQuad(prog(u, 0.0, 2.9)))
  const ear = Math.sin(t * 24) * 0.25
  drawBits(x, DOG_HEAD, { E: '#a8743f', B: '#e8b77a', W: INK, N: INK, T: '#ff8fb1' }, cx - 40, 790, 11, { rot: -0.15 + ear * 0.3 })
  car(x, cx, 960, '#4f7cd8')
  for (let i = 0; i < 3; i++) { const p = (u * 3 + i / 3) % 1; x.save(); x.globalAlpha = 0.5 * (1 - p); R(x, '#cfc8e8', cx + 180 + p * 80, 930 - p * 30, 16, 16); x.restore() }
  // Aries: both mittens, two little chasing hops
  const ax = 260 + 50 * ease.outCubic(prog(u, 0.7, 1.2))
  const oT = { x: ax, y: 1010, s: 210, mood: u < 0.5 ? 'wide' : 'sparkle', look: [1, -0.4], hops: [t0 + 0.6, t0 + 0.85, t0 + 1.1, t0 + 1.4] }
  them(x, t, oT)
  if (u > 0.5) { const F = themF(t, oT); waveHand(x, t, F, 1, { col: ARI_L, speed: 20 }); waveHand(x, t, F, -1, { col: ARI_L, speed: 20 }) }
  me(x, t, { x: 840, y: 1020, s: 190, mood: meMood(t), look: [-1, 0] })
  hearts(x, t, S.flip + 0.05, 840, 900, { n: 4 })
  bubble(x, t, 300, 700, t0 + 0.6, S.t1, 'HELLO!!', { size: 46, tail: -0.1 })
  if (u > 1.0 && u < 2.0) label(x, 'woof!', cx - 120, 700, { size: 34, col: GOLD, font: INTER, weight: 800, rot: -0.15 })
}

// ── MOMENT 3: the dogs wave back
function m3(x, t, S) {
  const { u, them, me, themF, meF, t0 } = S
  park(x, t)
  const oT = { x: 300, y: 900, s: 220, mood: u < 0.8 ? 'happy' : 'sparkle', look: [0.6, 1], hops: [t0 + 0.3, t0 + 0.95, t0 + 1.2, t0 + 1.45] }
  them(x, t, oT)
  waveHand(x, t, themF(t, oT), 1, { col: ARI_L, speed: 16 })
  if (u > 0.9) waveHand(x, t, themF(t, oT), -1, { col: ARI_L, speed: 16 })
  const oM = { x: 780, y: 910, s: 200, mood: t < S.buzz ? 'wide' : t < S.flip ? 'squint' : 'heart', look: [-0.5, 1] }
  me(x, t, oM)
  if (t > S.flip + 0.1) waveHand(x, t, meF(t, oM), 1, { col: SCO_L, speed: 9, amp: 0.3 })   // a small, dignified wave
  // three dogs sit in a row and lift a paw in unison
  const up = clamp(prog(u, 0.7, 0.95))
  ;[[220, DOGS[1], 14], [540, DOGS[0], 15], [860, DOGS[3], 11]].forEach(([dx, c, cell], i) => {
    const k = pop01(t, t0 + 0.15 + i * 0.1, 0.3, 2.2)
    if (k > 0.01) { x.save(); x.translate(dx, 1240); x.scale(k, k); sittingDog(x, t, 0, -cell * 5.5, cell, c, up, i); x.restore() }
  })
  sparkles(x, t, 540, 1100, t0 + 0.75, 10, 260, 0.4)
  bubble(x, t, 330, 690, t0 + 0.95, S.t1, 'they WAVED!!', { size: 42, tail: -0.3 })
}

const EP = makeIck({
  id: 'trickdogs', them: 'aries', me: 'scorpio', meName: 'SCORPIO', deep: '#c0391b', accent: PINK,
  hook(x, t, S) { if (S.tk > 0.5) waveHand(x, t, S.themF(t, { x: 700, y: 1000, s: 290, pop: S.tk, hops: [T.themIn + 0.35, T.swoon - 0.1, T.swoon + 0.35] }), 1, { col: ARI_L, k: S.tk }) },
  moments: [
    { caption: 'waves at *every* dog.', draw: m1,
      cues: [['pop', 0.5, 1318.51, 0.04, -0.3], ['pop', 0.58, 1567.98, 0.03, -0.3], ['tick', 0.9, 0.03], ['tick', 1.05, 0.03], ['tick', 1.2, 0.03], ['tick', 1.35, 0.03]] },
    { caption: '…even dogs in *cars.*', draw: m2,
      cues: [['whoosh', 0.2, 1.4, 0.035], ['pop', 0.6, 1174.66, 0.045, -0.3], ['pop', 0.66, 1567.98, 0.035, -0.3], ['pop', 1.0, 659.25, 0.04, 0], ['pop', 1.08, 587.33, 0.04, 0]] },
    { caption: '…and the dogs *wave back.*', draw: m3, badge: { x: 790, y: 520 },
      cues: [['pop', 0.15, 880, 0.03, -0.4], ['pop', 0.25, 987.77, 0.03, 0], ['pop', 0.35, 1174.66, 0.03, 0.4],
        ['riser', 0.35, 0.72, 0.01], ['pop', 0.72, 1318.51, 0.05, 0], ['pluck', 0.74, 1760, 0.04, 0.6, 0], ['glitter', 0.75, 1.1], ['pop', 0.95, 1567.98, 0.04, -0.3]] },
  ],
  finale(x, t, S) {
    const { them, me, themF, meF, ok, ME_FIN_HOPS, THEM_FIN_HOPS } = S
    shadow(x, 330, 1150, 220 * ok); shadow(x, 760, 1160, 200 * ok)
    const oT = { x: 330, y: 940, s: 250, pop: ok, mood: 'happy', look: [1, 0.4], hops: THEM_FIN_HOPS }
    const oM = { x: 760, y: 960, s: 220, pop: ok, mood: 'heart', look: [-1, 0.4], hops: ME_FIN_HOPS }
    them(x, t, oT); me(x, t, oM)
    waveHand(x, t, themF(t, oT), 1, { col: ARI_L, k: ok })
    waveHand(x, t, meF(t, oM), -1, { col: SCO_L, speed: 9, amp: 0.3, k: ok })
    x.save(); x.translate(545, 1150); x.scale(ok, ok); sittingDog(x, t, 0, -60, 12, DOGS[0], 1, 2); x.restore()
  },
  last: '*Friend* of dogs.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [box, HOT, outK, ease]
