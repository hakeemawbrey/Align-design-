// yrfirstdate: THEN vs NOW, "The first date in 2016 / 2026" (20 s vertical, Star Talk Then vs Now §13, music: lofi · C)
// The format's look lives in ./thennow.js (identical in all five Block C films).
//   0–6.85    2016 (old phone video, "06·03·2016"): a fancy restaurant. ♎ Libra and ♐ Sagittarius hide behind giant
//             menus ("so… what do you do?"), the fancy dish arrives (one pea on a huge plate), a selfie stick comes out
//             ("one for the memories!" flash), then the goodbye: the awkward hug, both lean the same way twice, PAT. PAT.
//             "ok… bye!"  ♓ Pisces at the back table cries into a cloth napkin.
//   6.85      card cut; the year sticker flips to 2026.
//   6.85–12.3 2026: a walk under the street lamps, a talk card between them ("What's a hill you will die on?").
//             Sag: "pineapple on pizza. I'll die there." Libra: "SAME." Then a real goodbye at the lamp post:
//             "I had a really good time." "me too. again?" and a proper hug. Pisces on the bench, happy-sobbing.
//   12.3–15.6 THE STARS: "the card did the *small talk.*"  Last line: "Less *fancy*. More *real*."
import { A as ASSETS } from '../../../src/scenes/common.js'
import {
  makeThenNow, star, pisces, speech, sfxWord, hearts, sparkles, drawBits, R, r3, lerp, prog, ease, clamp, pop01,
  INK, BONE, GOLD, PINK, HEART, INTER,
} from './thennow.js'

const LIB = 'libra', SAG = 'sagittarius'

// ── A: 2016, the fancy restaurant
function restaurant(x, t) {
  R(x, '#3a1e2e', 0, 0, 1080, 1120)
  for (let i = 0; i < 9; i++) { R(x, '#46243a', i * 130 + 20, 380, 90, 600); R(x, INK, i * 130 + 20, 380, 90, 6) }   // wall panels
  // a chandelier
  R(x, INK, 538, 0, 4, 470)
  for (let i = 0; i < 5; i++) { R(x, INK, 430 + i * 50, 466, 26, 34); R(x, '#ffd88a', 434 + i * 50, 470, 18, 26) }
  R(x, INK, 420, 498, 240, 10)
  const g = x.createRadialGradient(540, 500, 10, 540, 560, 520); g.addColorStop(0, 'rgba(255,214,150,0.32)'); g.addColorStop(1, 'rgba(255,214,150,0)')
  x.fillStyle = g; x.fillRect(0, 300, 1080, 900)
  // the back table + Pisces
  R(x, INK, 760, 800, 300, 16); R(x, '#fffaf0', 764, 796, 292, 70); R(x, INK, 764, 866, 292, 6)
  pisces(x, t, 905, 720, 120, t > 2.0 ? 3 : 2, { mood: 'wide', look: [-1, 1] })
  R(x, '#2a1420', 0, 1120, 1080, 800)
}
function fancyTable(x, t) {
  R(x, INK, 70, 1090, 940, 400); R(x, '#fffaf0', 78, 1098, 924, 384); R(x, '#e8e0cc', 78, 1098, 924, 20)
  for (let i = 0; i < 7; i++) R(x, '#efe7d4', 110 + i * 132, 1150, 6, 330)
  // candle
  R(x, INK, 530, 1010, 24, 96); R(x, '#fff1d0', 534, 1014, 16, 88)
  const fl = 0.85 + 0.15 * Math.sin(t * 13)
  x.save(); x.globalAlpha = fl; R(x, '#ffb347', 534, 984, 16, 26); R(x, '#fff1a0', 538, 992, 8, 16); x.restore()
}
const FA = {
  menus: [0.35, 0.6], ask: 0.95, menusDown: [1.75, 2.05], pea: [2.05, 2.4], peaSay: 2.45,
  stick: [3.15, 3.45], memo: 3.3, flash: 3.9, stickOut: [4.15, 4.35],
  lean1: [4.45, 4.7], lean2: [4.85, 5.1], pat: 5.3, bye: 5.75,
}
function sceneA(x, t) {
  restaurant(x, t)
  // the hug attempts: both lean the same way, twice, then a stiff pat-pat
  const l1 = Math.sin(Math.PI * prog(t, FA.lean1[0], FA.lean1[1] + 0.2)), l2 = Math.sin(Math.PI * prog(t, FA.lean2[0], FA.lean2[1] + 0.2))
  const lean = ease.inOutCubic(prog(t, FA.pat - 0.2, FA.pat)) * (1 - ease.inOutCubic(prog(t, FA.bye - 0.1, FA.bye + 0.15)))
  const lx = 290 + 60 * l1 - 50 * l2 + 110 * lean, sx = 790 - 60 * l1 + 50 * l2 - 110 * lean
  const ly = 1000 - 40 * l1 + 30 * l2, sy = 1000 + 40 * l1 - 30 * l2
  let lm = 'happy', sm = 'happy'
  if (t > FA.peaSay - 0.4) { lm = 'wide'; sm = 'wide' }
  if (t > FA.memo) { lm = 'sparkle'; sm = 'neutral' }
  if (t > FA.flash) { lm = 'squint'; sm = 'squint' }
  if (t > FA.lean1[0]) { lm = 'wide'; sm = 'wide' }
  if (t > FA.pat) { lm = 'squint'; sm = 'squint' }
  if (t > FA.bye) { lm = 'happy'; sm = 'neutral' }
  const sq = t > FA.pat && t < FA.pat + 0.6 ? 0.08 * Math.sin((t - FA.pat) * 22) : 0
  star(x, t, lx, ly, 240, LIB, { mood: lm, look: [1, 0], seed: 4, squash: sq, hops: [FA.ask, FA.memo, FA.bye] })
  star(x, t, sx, sy, 240, SAG, { mood: sm, look: t > FA.pea[0] && t < FA.memo ? [-0.5, 1] : [-1, 0], seed: 7, squash: sq, hops: [FA.peaSay, FA.bye + 0.1] })
  fancyTable(x, t)
  // the giant menus
  const mu = ease.outBack(prog(t, ...FA.menus)), md = ease.inCubic(prog(t, ...FA.menusDown))
  if (mu > 0 && md < 1) for (const [cx, rot] of [[290, -0.04], [790, 0.05]]) {
    const cy = lerp(1300, 900, mu) + md * 500
    x.save(); x.translate(cx, cy); x.rotate(rot)
    R(x, INK, -150, -230, 300, 460); R(x, '#5a1e30', -142, -222, 284, 444); R(x, GOLD, -120, -200, 240, 6); R(x, GOLD, -120, 194, 240, 6)
    x.font = `italic 600 54px 'EB Garamond', serif`; x.fillStyle = GOLD; x.textAlign = 'center'; x.fillText('Menu', 0, -110)
    for (let i = 0; i < 5; i++) R(x, 'rgba(242,199,92,0.45)', -90, -40 + i * 44, 180, 8)
    x.restore()
  }
  // the fancy dish: one pea
  if (t > FA.pea[0]) {
    const k = ease.outBack(prog(t, ...FA.pea))
    x.save(); x.translate(540, lerp(1500, 1210, k))
    x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 196, 62, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#ffffff'; x.beginPath(); x.ellipse(0, 0, 188, 56, 0, 0, Math.PI * 2); x.fill()
    x.strokeStyle = '#e0d6c0'; x.lineWidth = 4; x.beginPath(); x.ellipse(0, 0, 120, 34, 0, 0, Math.PI * 2); x.stroke()
    R(x, INK, -11, -14, 22, 22); R(x, '#5fbf4a', -8, -11, 16, 16); R(x, '#a8f08a', -6, -9, 5, 5)
    x.restore()
    sfxWord(x, t, 540, 1330, FA.peaSay, '(one pea)', { size: 40, col: '#a8f08a', rot: 0.04, life: 1.4 })
  }
  // the selfie stick
  const se = ease.outBack(prog(t, ...FA.stick)) * (1 - ease.inCubic(prog(t, ...FA.stickOut)))
  if (se > 0.01) {
    const bx = lx + 70, by = ly - 20, ex = bx + 190 * se, ey = by - 290 * se
    x.save(); x.lineCap = 'round'; x.strokeStyle = INK; x.lineWidth = 16; x.beginPath(); x.moveTo(bx, by); x.lineTo(ex, ey); x.stroke()
    x.strokeStyle = '#b8b8c8'; x.lineWidth = 8; x.beginPath(); x.moveTo(bx, by); x.lineTo(ex, ey); x.stroke(); x.restore()
    R(x, INK, ex - 44, ey - 70, 88, 130); R(x, '#3a3a44', ex - 38, ey - 64, 76, 118); R(x, '#cfe6ff', ex - 30, ey - 50, 60, 84); R(x, INK, ex - 8, ey + 40, 16, 12)
  }
  if (t > FA.flash && t < FA.flash + 0.4) { x.save(); x.globalAlpha = 0.9 * (1 - (t - FA.flash) / 0.4); R(x, '#ffffff', 0, 0, 1080, 1920); x.restore() }
  // the pat-pat
  sfxWord(x, t, 470, 820, FA.pat, 'pat.', { size: 52, col: BONE, rot: -0.12, life: 0.9 })
  sfxWord(x, t, 620, 790, FA.pat + 0.25, 'pat.', { size: 52, col: BONE, rot: 0.1, life: 0.7 })
  speech(x, t, 420, 640, FA.ask, 'so… what do you do?', { size: 44, tail: -1, life: 0.95 })
  speech(x, t, 400, 760, FA.memo, 'one for the memories!', { size: 44, tail: -1, life: 1.0 })
  speech(x, t, 540, 760, FA.bye, 'ok… bye!', { size: 48, tail: 0, life: 1.0 })
}

// ── B: 2026, the walk
const FB = { walk: [6.85, 10.7], card: 7.4, read: 7.55, pizza: 8.45, same: 9.75, stop: 10.7, good: 10.4, again: 11.05, hug: [11.45, 11.75] }
function walkScene(x, t) {
  const v = 150, d = t < FB.walk[1] ? (t - FB.walk[0]) * v : (FB.walk[1] - FB.walk[0]) * v + v * 0.4 * (1 - Math.exp(-(t - FB.walk[1]) * 2.5)) / 1
  // far hills + trees (parallax)
  R(x, '#1e1a46', 0, 980, 1080, 120)
  for (let i = -1; i < 9; i++) {
    const tx = ((i * 170 - d * 0.35) % 1530 + 1530) % 1530 - 220
    R(x, INK, tx + 52, 940, 16, 90); R(x, '#3a2a40', tx + 56, 944, 8, 86)
    for (const [ox, oy, w, h] of [[30, 800, 60, 30], [10, 826, 100, 40], [0, 862, 120, 50], [12, 908, 96, 34]]) { R(x, INK, tx + ox - 5, oy - 5, w + 10, h + 10) }
    for (const [ox, oy, w, h] of [[30, 800, 60, 30], [10, 826, 100, 40], [0, 862, 120, 50], [12, 908, 96, 34]]) { R(x, '#24405a', tx + ox, oy, w, h) }
    R(x, '#2e5070', tx + 30, 812, 30, 14); R(x, '#2e5070', tx + 18, 840, 30, 14)
  }
  // grass + path
  R(x, '#1f3a34', 0, 1090, 1080, 830); R(x, INK, 0, 1086, 1080, 6)
  for (let i = 0; i < 26; i++) { const gx = ((i * 157 - d * 1.15) % 1300 + 1300) % 1300 - 110, gy = 1310 + (i * 71) % 520; R(x, '#2c5244', gx, gy, 10, 22); R(x, '#2c5244', gx + 14, gy - 8, 10, 30); R(x, '#2c5244', gx + 28, gy + 4, 10, 18) }
  for (let i = 0; i < 9; i++) { const fx = (i * 131 + 40) % 1040, fy = 1330 + (i * 97) % 420 + 14 * Math.sin(t * 1.3 + i), a = 0.5 + 0.5 * Math.sin(t * 2.4 + i * 1.9); x.save(); x.globalAlpha = a; R(x, '#f6ff9a', fx, fy, 8, 8); x.restore() }
  R(x, '#4a3f6a', 0, 1150, 1080, 130); R(x, '#5a4d7e', 0, 1150, 1080, 12)
  for (let i = -1; i < 14; i++) { const px = ((i * 90 - d) % 1260 + 1260) % 1260 - 90; R(x, '#3f3560', px, 1210, 40, 8) }
  // lamp posts (one ends up right beside the goodbye)
  for (let i = 0; i < 4; i++) {
    const lx = 1180 + i * 520 - d
    if (lx < -100 || lx > 1200) continue
    R(x, INK, lx - 10, 640, 20, 520); R(x, '#3a3550', lx - 5, 645, 10, 515)
    R(x, INK, lx - 40, 600, 80, 50); R(x, '#ffe2a0', lx - 32, 606, 64, 38)
    const g = x.createRadialGradient(lx, 640, 10, lx, 640, 420); g.addColorStop(0, 'rgba(255,220,150,0.3)'); g.addColorStop(1, 'rgba(255,220,150,0)')
    x.fillStyle = g; x.fillRect(lx - 420, 220, 840, 840)
  }
  // a bench with Pisces, scrolling past at the right moment
  const bx = 1550 - d
  if (bx > -300 && bx < 1300) {
    pisces(x, t, bx, 1010, 130, 3, { mood: t > FB.same ? 'happy' : 'sparkle', look: [-1, 0] })
    R(x, INK, bx - 120, 1060, 240, 24); R(x, '#8a5a3a', bx - 114, 1064, 228, 16); R(x, INK, bx - 100, 1084, 14, 70); R(x, INK, bx + 86, 1084, 14, 70)
  }
}
function sceneB(x, t, Tt, assets) {
  walkScene(x, t)
  const walking = t < FB.stop
  const step = walking ? Math.abs(Math.sin((t - 6.85) * 6)) : 0
  const hug = ease.inOutCubic(prog(t, ...FB.hug))
  const lx = 330 + 140 * hug, sx = 750 - 140 * hug
  let lm = 'happy', sm = 'happy'
  if (t > FB.pizza) { sm = 'sparkle' }
  if (t > FB.same) { lm = 'sparkle' }
  if (t > FB.good) { lm = 'happy'; sm = 'happy' }
  if (t > FB.hug[0]) { lm = 'happy'; sm = 'happy' }
  if (t > FB.hug[1] + 0.3) { lm = 'heart'; sm = 'heart' }
  star(x, t, lx, 1060 - step * 16, 230, LIB, { mood: lm, look: [1, 0], seed: 4, glow: 1.2, hops: [FB.read, FB.same, FB.good, FB.hug[1]], blush: t > FB.good ? 1 : undefined })
  star(x, t, sx, 1060 - Math.abs(Math.sin((t - 6.85) * 6 + 1.2)) * (walking ? 16 : 0), 230, SAG, { mood: sm, look: [-1, 0], seed: 7, glow: 1.2, hops: [FB.pizza, FB.same + 0.1, FB.again, FB.hug[1] + 0.05], blush: t > FB.good ? 1 : undefined })
  // the talk card, carried between them, then tucked away
  const ck = pop01(t, FB.card, 0.35, 2) * (1 - ease.inCubic(prog(t, FB.good - 0.4, FB.good)))
  if (ck > 0.01 && assets.card) {
    const w = 210 * ck, h = w * assets.card.height / assets.card.width
    x.save(); x.translate(540, 830 - step * 8); x.rotate(0.04 * Math.sin(t * 3))
    x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 12, -h / 2 + 14, w, h)
    x.drawImage(assets.card, -w / 2, -h / 2, w, h); x.restore()
  }
  if (t > FB.hug[1]) {
    sfxWord(x, t, 540, 800, FB.hug[1], 'hug.', { size: 60, col: PINK, rot: -0.08, life: 1.2 })
    hearts(x, t, 540, 900, FB.hug[1] + 0.05, { n: 8, life: 1.8, cell: 6, spread: 300 })
  }
  sparkles(x, t, 540, 1000, FB.hug[1], 10, 130, 1, [HEART, GOLD, BONE], 22)
  if (t > FB.same) hearts(x, t, 540, 920, FB.same, { n: 4, life: 1.2, cell: 5, spread: 200, seed: 4 })
  speech(x, t, 330, 640, FB.read, 'ok. card says…', { size: 44, tail: -1, life: 0.85 })
  speech(x, t, 600, 640, FB.pizza, 'pineapple on pizza. I’ll die there.', { size: 38, tail: 1, life: 1.25, col: '#fff1c8' })
  speech(x, t, 330, 640, FB.same, 'SAME.', { size: 58, tail: -1, life: 0.6, col: '#ffe1ec' })
  speech(x, t, 400, 690, FB.good, 'I had a really good time.', { size: 42, tail: -1, life: 1.15 })
  speech(x, t, 700, 560, FB.again, 'me too. again?', { size: 46, tail: 1, life: 1.25, col: '#fff1c8' })
}

const EP = makeThenNow({
  id: 'yrfirstdate', thing: 'The first date', then: 2016, date: '06·03·2016', accent: '#ffb3c8',
  load: async () => ({ card: await new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = ASSETS + 'card-talk-1.png' }) }),
  A: { draw: sceneA }, B: { draw: sceneB },
  line: 'the card did the *small talk.*',
  last: 'Less *fancy*. More *real*.',
  cues: () => [
    ['whoosh', FA.menus[0], 0.3, 0.03], ['tick', FA.menus[1], 0.04], ['pop', FA.ask, 784, 0.03, -0.3],
    ['whoosh', FA.menusDown[0], 0.25, 0.025], ['pluck', FA.pea[1], 1567.98, 0.035, 0.3, 0.2], ['pop', FA.peaSay, 2093, 0.02, 0],
    ['whoosh', FA.stick[0], 0.25, 0.03], ['pop', FA.memo, 880, 0.035, -0.3],
    ['tick', r3(FA.flash - 0.03), 0.07], ['pop', FA.flash, 1864.66, 0.03, 0],
    ['whoosh', FA.lean1[0], 0.2, 0.025], ['whoosh', FA.lean2[0], 0.2, 0.025],
    ['tom', FA.pat, 160, { gain: 0.14, decay: 0.12 }], ['tom', r3(FA.pat + 0.25), 150, { gain: 0.12, decay: 0.12 }], ['pop', FA.bye, 659.25, 0.03, 0],
    ['pop', FB.card, 1046.5, 0.035, 0], ['glitter', FB.card, r3(FB.card + 0.3)], ['pop', FB.read, 880, 0.03, -0.3],
    ['pop', FB.pizza, 987.77, 0.035, 0.3], ['pop', FB.same, 1318.51, 0.045, -0.3], ['pop', r3(FB.same + 0.06), 1567.98, 0.03, -0.3],
    ['pop', FB.good, 880, 0.035, -0.3], ['pop', FB.again, 1046.5, 0.035, 0.3],
    ['whoosh', FB.hug[0], 0.25, 0.025], ['pluck', FB.hug[1], 1318.51, 0.04, 0.5, 0], ['bell', r3(FB.hug[1] + 0.05), 2093, 0.02, 1.0, 0], ['glitter', FB.hug[1], r3(FB.hug[1] + 0.4)],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void clamp; void INTER
