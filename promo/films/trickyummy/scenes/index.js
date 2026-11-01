// trickyummy: CUTE, NOT AN ICK · "They say 'yummy' at every bite." (20 s vertical, Star Talk Trends §11.4, music: jazzy · Eb)
// Story 0–15.6, then the shared end card. The format look lives in ./ickkit.js (identical in all five films).
// THEM: ♉ Taurus (reviews every bite, out loud). ME: ♍ Virgo (should be cringing; is not).
//   0.0–2.3    hook: "Should be an *ick…* | but it’s *them.*"  Taurus holds a fork like a microphone; Virgo heart-eyed.
//   2.3–5.2    MOMENT 1 "says “yummy” at *every bite.*"  Pasta night. Bite: "yummy." Bite: "yummy!" Bite: "YUMMY."
//              ICK? buzzer… flips to CUTE. Virgo: cringe → heart eyes.
//   5.2–8.1    MOMENT 2 "…even at *plain toast.*"  One sad, plain slice. Taurus bites, eyes sparkle: "yummy!!"
//              ICK? → CUTE.
//   8.1        card cut.
//   8.1–11.3   MOMENT 3 (the twist) "…even at *my* cooking."  Virgo slides over a slightly smoking pancake stack.
//              Taurus bites. Silence. Virgo braces… "YUMMY." (and means it). ICK? → CUTE.
//   11.35      stamp "NOT AN *ICK.*"  Virgo finally takes a bite too. Pisces: SO CUTE.
//   11.95      ♍ Virgo: "Yummy. *Officially.*"
import { makeIck, tint, R, box, bubble, label, shadow, sparkles, hearts, glowPool, drawBits, pop01, outK, prog, lerp, clamp, ease, signStar, INK, BONE, GOLD, PINK, HOT, INTER, T } from './ickkit.js'

const TAU = signStar('taurus'), VIR = signStar('virgo')
const TAU_L = tint(TAU.color, 0.55), VIR_L = tint(VIR.color, 0.55)

// ── the kitchen table
function kitchen(x, t) {
  R(x, '#2b1f3e', 0, 380, 1080, 920)
  for (let j = 0; j < 6; j++) for (let i = 0; i < 9; i++) if ((i + j) % 2 === 0) R(x, 'rgba(255,220,180,0.035)', i * 120, 380 + j * 120, 120, 120)
  box(x, 360, 450, 360, 250, '#0e0b22', { b: 10 }); R(x, '#5a3f5a', 535, 450, 10, 250)
  x.fillStyle = '#fff1c8'; x.beginPath(); x.arc(640, 510, 24, 0, Math.PI * 2); x.fill()
  R(x, INK, 537, 380, 6, 40); box(x, 490, 410, 100, 34, GOLD, { b: 6 }); glowPool(x, 540, 560, 420, 1, '255,210,150')
}
function table(x, y = 1130) {
  box(x, 40, y, 1000, 30, '#b07a4a', { b: 6, hi: '#c99260' })
  R(x, '#8a5a34', 60, y + 36, 960, 140)
  R(x, INK, 100, y + 36, 14, 140); R(x, INK, 966, y + 36, 14, 140)
}
function plate(x, cx, cy, w = 300) {
  x.save(); x.fillStyle = INK; x.beginPath(); x.ellipse(cx, cy, w / 2 + 6, w * 0.16 + 6, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#f4efe6'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.16, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#dcd4c6'; x.beginPath(); x.ellipse(cx, cy, w * 0.34, w * 0.1, 0, 0, Math.PI * 2); x.fill(); x.restore()
}
const PASTA = ['...yyyy...', '.yyryyyyy.', 'yyyyyryyyy', 'yyrryyyryy', '.yyyyyyyy.']
const TOAST = ['.tttttt.', 'tccccccx', 'tccccccx', 'tccccccx', 'tccccccx', 'txxxxxxx']
const CAKES = ['....bb....', '.bbbbbbbb.', 'pppppppppp', 'ccCccccccc', 'pppppppppp', 'cccccCcccc', 'pppppppppp']
function food(x, kind, cx, cy, k = 1) {
  if (k <= 0.01) return
  if (kind === 'pasta') drawBits(x, PASTA, { y: '#f2cf6a', r: '#e8344e' }, cx, cy, 22 * k)
  else if (kind === 'toast') drawBits(x, TOAST, { t: '#c98a4a', c: '#f1d7a0', x: '#a86d34' }, cx, cy, 20 * k)
  else drawBits(x, CAKES, { b: '#fff1a8', p: '#d99a52', c: '#b8763a', C: '#3a2620' }, cx, cy, 19 * k)
}
// a fork in a mitten, travelling plate → mouth on each bite
function forkAt(x, t, F, bites, plateY, side = 1, col = TAU_L) {
  let up = 0
  for (const b of bites) { if (t > b - 0.25 && t < b + 0.3) up = Math.max(up, t < b ? ease.outCubic(prog(t, b - 0.25, b)) : 1 - ease.inCubic(prog(t, b + 0.05, b + 0.3))) }
  const mx = F.ox + side * 8 * F.cell, my = lerp(plateY - 30, F.cy + 4 * F.cell, up)
  x.save(); x.translate(lerp(F.ox + side * 15 * F.cell, mx, up), my); x.rotate(side * lerp(0.5, 1.2, up))
  R(x, INK, -6, -70, 12, 80); R(x, '#cfc8e8', -3, -68, 6, 76)
  for (let i = 0; i < 3; i++) { R(x, INK, -14 + i * 10, -100, 8, 34); R(x, '#cfc8e8', -12 + i * 10, -98, 4, 30) }
  drawBits(x, ['.MM.', 'MMMM', 'MMMM', '.MM.'], { M: col }, 0, 6, F.cell * 1.8)
  x.restore()
}
function crumbs(x, t, t0, cx, cy) {
  const tt = t - t0
  if (tt < 0 || tt > 0.6) return
  x.save(); x.globalAlpha = 1 - tt / 0.6
  for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * 0.45; R(x, i % 2 ? '#f1d7a0' : '#c98a4a', cx + Math.cos(a) * 140 * tt, cy + Math.sin(a) * 120 * tt + 300 * tt * tt, 8, 8) }
  x.restore()
}
const YUM = ['yummy.', 'yummy!', 'YUMMY.']

// ── MOMENT 1: pasta night
function m1(x, t, S) {
  const { u, them, me, themF, meMood, t0 } = S
  kitchen(x, t); table(x)
  const bites = [0.35, 0.8, 1.2].map(b => t0 + b)
  const nB = bites.filter(b => t > b).length
  const oT = { x: 330, y: 935, s: 230, mood: nB ? 'happy' : 'sparkle', look: [0, 0.6], hops: bites.map(b => b + 0.05) }
  them(x, t, oT)
  me(x, t, { x: 760, y: 945, s: 210, mood: meMood(t), look: [-1, 0.2] })
  hearts(x, t, S.flip + 0.05, 760, 830, { n: 4 })
  plate(x, 330, 1135); food(x, 'pasta', 330, 1100, 1 - 0.18 * nB)
  plate(x, 760, 1135); food(x, 'pasta', 760, 1100)
  forkAt(x, t, themF(t, oT), bites, 1110)
  bites.forEach((b, i) => { crumbs(x, t, b, 330, 1060); bubble(x, t, [250, 430, 330][i], [820, 730, 630][i], b + 0.05, S.t1, YUM[i], { size: [30, 36, 46][i], tail: [0.4, -0.4, 0][i] }) })
}

// ── MOMENT 2: plain toast
function m2(x, t, S) {
  const { u, them, me, themF, meMood, t0 } = S
  kitchen(x, t); table(x)
  const bite = t0 + 0.75
  const oT = { x: 330, y: 935, s: 230, mood: u < 0.8 ? 'neutral' : 'sparkle', look: [0, 0.6], hops: [bite + 0.05, bite + 0.4] }
  them(x, t, oT)
  me(x, t, { x: 760, y: 945, s: 210, mood: meMood(t), look: [-1, 0.2] })
  hearts(x, t, S.flip + 0.05, 760, 830, { n: 4 })
  plate(x, 330, 1135); food(x, 'toast', 330, 1085, t > bite ? 0.85 : 1)
  if (u < 0.75) label(x, '(plain.)', 330, 1010 + 20, { size: 26, col: 'rgba(239,230,214,0.85)', font: INTER, weight: 800 })
  forkAt(x, t, themF(t, oT), [bite], 1100)
  crumbs(x, t, bite, 330, 1060)
  sparkles(x, t, 330, 960, bite + 0.1, 8, 150, 0.5)
  bubble(x, t, 340, 700, bite + 0.12, S.t1, 'yummy!!', { size: 50, tail: 0 })
}

// ── MOMENT 3: my cooking
function m3(x, t, S) {
  const { u, them, me, themF, t0 } = S
  kitchen(x, t); table(x)
  const bite = t0 + 0.75, verdict = t0 + 1.3
  // Virgo slides the plate over
  const px = lerp(760, 330, ease.inOutCubic(prog(u, 0.05, 0.45)))
  const oT = { x: 330, y: 935, s: 230, mood: u < 1.25 ? 'neutral' : 'sparkle', look: u < 0.5 ? [1, 0.4] : [0, 0.6], hops: [bite + 0.05, verdict, verdict + 0.35] }
  them(x, t, oT)
  const mMood = u < 0.5 ? 'happy' : t < verdict ? 'wide' : t < S.buzz ? 'happy' : t < S.flip ? 'squint' : 'heart'
  me(x, t, { x: 760, y: 945, s: 210, mood: mMood, look: [-1, 0.2], hops: [t0 + 0.05, verdict + 0.05] })
  plate(x, px, 1135); food(x, 'cakes', px, 1075, t > bite ? 0.9 : 1)
  // a little smoke
  for (let i = 0; i < 3; i++) { const p = (u * 0.8 + i / 3) % 1; x.save(); x.globalAlpha = 0.45 * (1 - p); R(x, '#a9a2c8', px - 30 + i * 26 + Math.sin(p * 6 + i) * 10, 1030 - p * 130, 18, 18); x.restore() }
  forkAt(x, t, themF(t, oT), [bite], 1090)
  crumbs(x, t, bite, 330, 1060)
  // the silence, then the verdict
  if (t > bite + 0.15 && t < verdict) label(x, '. . .', 330, 760, { size: 56, col: BONE, font: INTER, weight: 800 })
  bubble(x, t, 350, 690, verdict, S.t1, 'YUMMY.', { size: 62, tail: 0 })
  sparkles(x, t, 330, 960, verdict + 0.02, 12, 190, 0.2)
  hearts(x, t, S.flip + 0.05, 760, 830, { n: 6 })
  const sk = pop01(t, t0 + 0.35, 0.25, 2.4) * outK(t, [verdict - 0.1, verdict + 0.05])
  if (sk > 0.01) label(x, '(slightly crispy)', 540, 1225, { size: 34 * sk, col: '#ffd1a8', font: INTER, weight: 800, rot: -0.06 })
}

const EP = makeIck({
  id: 'trickyummy', them: 'taurus', me: 'virgo', meName: 'VIRGO', deep: '#a8642a', accent: PINK,
  hook(x, t, S) { if (S.tk > 0.3) { const F = S.themF(t, { x: 700, y: 1000, s: 290, pop: S.tk, hops: [T.themIn + 0.35, T.swoon - 0.1, T.swoon + 0.35] }); forkAt(x, t, F, [1.3], 1150) } },
  moments: [
    { caption: 'says “yummy” at *every bite.*', draw: m1,
      cues: [0.35, 0.8, 1.2].flatMap((b, i) => [['tick', b, 0.04], ['pop', b + 0.05, [880, 987.77, 1174.66][i], 0.04 + 0.006 * i, [-0.3, 0.2, 0][i]]]) },
    { caption: '…even at *plain toast.*', draw: m2,
      cues: [['tick', 0.75, 0.05], ['tick', 0.82, 0.03], ['pop', 0.87, 1318.51, 0.05, -0.2], ['glitter', 0.85, 1.2]] },
    { caption: '…even at *my* cooking.', draw: m3, badge: { x: 790, y: 500 },
      cues: [['whoosh', 0.05, 0.4, 0.025], ['tick', 0.75, 0.05], ['tick', 0.95, 0.02], ['tick', 1.1, 0.02], ['pop', 1.3, 1567.98, 0.06, -0.2], ['pop', 1.38, 2093, 0.04, -0.2], ['glitter', 1.3, 1.6]] },
  ],
  finale(x, t, S) {
    const { them, me, themF, meF, ok, ME_FIN_HOPS, THEM_FIN_HOPS } = S
    shadow(x, 360, 1150, 220 * ok); shadow(x, 720, 1160, 200 * ok)
    const oT = { x: 360, y: 940, s: 250, pop: ok, mood: 'happy', look: [1, 0], hops: THEM_FIN_HOPS }
    const oM = { x: 720, y: 960, s: 230, pop: ok, mood: t < 11.9 ? 'happy' : 'heart', look: [-1, 0.3], hops: ME_FIN_HOPS }
    them(x, t, oT); me(x, t, oM)
    x.save(); x.translate(540, 1150); x.scale(ok, ok); plate(x, 0, 0, 240); food(x, 'cakes', 0, -50, t > 11.75 ? 0.8 : 0.9); x.restore()
    forkAt(x, t, meF(t, oM), [11.75], 1110, -1, VIR_L)
    void themF
  },
  last: 'Yummy. *Officially.*',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = [...EP.CUES, ['tick', 11.75, 0.04]]
void [box, HOT, clamp, BONE, GOLD]
