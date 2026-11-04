// nc14e19: CUFFING SEASON, "The friend who's single and fine" (28 s vertical, promo/films/next30/b02.md, music: jazzy · D)
// Story 0–25.6, then the short end card (no Align card transition). The season look lives in ../../nc14e13/cuffkit.js.
//   0.0–5.4    "Everyone's cuffed. | *Virgo* is thriving."  Frame 0: ♍ Virgo mid-stir at a soup pot in its warm kitchen; a
//              book, a plant and a half-done puzzle on the table. Pisces presses its face to the frosty window, crying.
//   5.4–12.4   "The friends | *intervene.*"  ♌ LEO slides in a blind mystery card: "a blind mystery card, *for you!!*"
//              ♊ GEMINI: "i know *someone…*"  ♎ LIBRA: "you must be so *lonely.*"  (the ghost, 9.4)
//  12.5–18.6   "Not waiting. | *Living.*"  VIRGO: "i'm not waiting out winter. i'm *in* it."  THE STARS: "a full life isn't
//              a *gap* to fill."
//  18.6–25.1   Soup night: everyone sits down with a bowl; Virgo pockets the card: "maybe in spring." Pisces cries into the
//              steam. Last line: "Single isn't a season | to *survive.*"
import { makeEp, star, room, windowFrame, bubble, hearts, sparkles, shadow, R, box, glow, drawBits, cardImg, mug,
  pop01, outK, prog, lerp, clamp, ease, talkHops, SNOW, ICE, PINK, GOLD, RED, MINT, INK, BONE, INTER, r3 } from '../../nc14e13/cuffkit.js'

const SP = 'THE STARS', VIR = '♍︎ VIRGO', LEO = '♌︎ LEO', GEM = '♊︎ GEMINI', LIB = '♎︎ LIBRA'
const VC = '#ff9fc0', LC = '#ffc27a', GC = '#ffe27a', BC = '#f4a6ee'
const L2 = [
  { t: 5.9, speaker: LEO, color: LC, text: 'a blind mystery card, *for you!!*' },
  { t: 8.1, speaker: GEM, color: GC, text: 'i know *someone…*' },
  { t: 10.2, speaker: LIB, color: BC, text: 'you must be so *lonely.*' },
]
const L3 = [
  { t: 12.8, speaker: VIR, color: VC, text: "i'm not waiting out winter. i'm *in* it." },
  { t: 15.7, speaker: SP, text: "a full life isn't a *gap* to fill." },
]
const T = { b2: 5.4, leo: 5.5, gem: 7.8, lib: 9.9, cut: 12.4, b3: 12.5, fin: 18.6, sit: 18.8, pocket: 20.2 }
const VIR_HOPS = [0.4, 1.2, 2.0, 2.8, ...talkHops(L3, VIR, { cps: 30 }), T.sit, T.pocket, 22.6, 24.0]

function kitchen(x, t) {
  room(x, { wall: '#2d2148', wall2: '#352858', floorY: 1290, floor: '#3b2b34' })
  windowFrame(x, t, 560, 470, 420, 330)
  // shelves with jars + a hanging plant
  box(x, 80, 560, 380, 16, '#8a5a36', { b: 5 })
  for (let i = 0; i < 4; i++) box(x, 100 + i * 90, 490, 60, 66, ['#ef5c94', '#2fc79a', '#f2c75c', '#7fd0ff'][i], { b: 4, hi: 'rgba(255,255,255,0.3)' })
  glow(x, 540, 900, 600, 0.6)
}
function table(x, t, fin) {
  box(x, 100, 1180, 880, 30, '#a06a40', { b: 6, hi: 'rgba(255,255,255,0.18)' })
  for (const lx of [140, 920]) box(x, lx, 1216, 22, 74, '#6a4426', { b: 5 })
  // book, plant, puzzle (cleared a little for soup night)
  const k = 1 - fin
  if (k > 0.01) {
    x.save(); x.globalAlpha *= k
    box(x, 640, 1140, 120, 34, '#4f7cd8', { b: 5 }); R(x, BONE, 646, 1146, 108, 6)
    box(x, 800, 1120, 54, 54, '#c86a3a', { b: 5 }); drawBits(x, ['.G.G.', 'GGGGG', '.GGG.', '..G..'], { G: '#3fb08a' }, 827, 1092, 8)
    for (let i = 0; i < 6; i++) box(x, 880 + (i % 3) * 30, 1146 + Math.floor(i / 3) * 14, 24, 10, ['#ef5c94', '#f2c75c', '#7fd0ff'][i % 3], { b: 2 })
    x.restore()
  }
}
function pot(x, t, cx, cy) {
  box(x, cx - 90, cy - 110, 180, 110, '#5a5470', { b: 7, hi: 'rgba(255,255,255,0.25)' })
  R(x, INK, cx - 110, cy - 90, 22, 14); R(x, INK, cx + 88, cy - 90, 22, 14)
  R(x, '#f39a3a', cx - 84, cy - 112, 168, 12)
  for (let i = 0; i < 4; i++) { const p = (t * 0.6 + i / 4) % 1; x.save(); x.globalAlpha = 0.5 * Math.sin(Math.PI * p); R(x, BONE, cx - 60 + i * 36 + 8 * Math.sin(t * 2 + i), cy - 130 - p * 140, 14, 22); x.restore() }
}

function scene(x, t, K) {
  const ok = K.ok
  kitchen(x, t)
  // Pisces outside the window, nose to the glass, crying (then comes in for soup)
  const inK = pop01(t, T.sit + 0.3, 0.4, 2) * ok
  if (t < T.fin) { x.save(); x.beginPath(); x.rect(560, 470, 420, 330); x.clip(); star(x, t, 'pisces', { x: 860, y: 700, s: 200, mood: t > 12.8 ? 'sparkle' : 'wide', look: [-1, 0.4], tears: 2, hat: '#7c74f0', seed: 6 }); x.restore() }
  const fin = ease.inOutCubic(prog(t, T.sit - 0.2, T.sit + 0.5))
  // the soup pot (Virgo stirs)
  const potX = lerp(500, 540, fin)
  // friends: pop in, then sit at the table for soup night
  const fr = (id, t0, A, B, mood, hops, extra = {}) => {
    const k = pop01(t, t0, 0.38, 2.2) * ok
    if (k <= 0.01) return null
    return star(x, t, id, { x: lerp(A[0], B[0], fin), y: lerp(A[1], B[1], fin), s: lerp(A[2], B[2], fin), pop: k, mood, hops, ...extra })
  }
  fr('libra', T.lib, [960, 1050, 200], [880, 1080, 200], t < T.b3 ? 'squint' : t < T.fin ? 'wide' : 'happy', [T.lib + 0.2, 10.6, 11.2, T.sit + 0.1], { look: [-1, 0], scarf: PINK, seed: 8 })
  fr('gemini', T.gem, [620, 1070, 190], [720, 1090, 190], t < T.b3 ? 'wink' : t < T.fin ? 'wide' : 'happy', [T.gem + 0.2, 8.4, 8.9, T.sit + 0.15], { look: [-1, 0], hat: '#f2cf4a', seed: 4 })
  const LF = fr('leo', T.leo, [790, 1060, 220], [200, 1080, 200], t < T.b3 ? 'sparkle' : t < T.fin ? 'wide' : 'happy', [T.leo + 0.2, 6.3, 6.8, 7.3, T.sit + 0.2], { look: [-1, 0], scarf: GOLD, seed: 5 })
  // the mystery card Leo offers
  if (LF && t < T.pocket + 0.5) {
    const ck = pop01(t, 5.8, 0.3, 2.3) * (1 - ease.inCubic(prog(t, T.pocket, T.pocket + 0.5)))
    const cx = lerp(LF.ox - 60, 470, ease.inOutCubic(prog(t, T.pocket - 0.6, T.pocket))), cy = lerp(LF.cy - 190, 1080, ease.inOutCubic(prog(t, T.pocket - 0.6, T.pocket)))
    cardImg(x, K.img('mystery'), cx, cy, 130 * ck, -0.12 + 0.05 * Math.sin(t * 3))
  }
  // Virgo
  shadow(x, 300, 1290, 260 * ok)
  const stir = t < T.b2 || t > T.fin ? Math.sin(t * 5) : 0
  const vMood = t < T.b2 ? 'happy' : t < T.b3 ? (t > T.lib ? 'eyeroll' : 'neutral') : t < T.fin ? 'sparkle' : 'happy'
  star(x, t, 'virgo', { x: lerp(260, 400, fin), y: lerp(1050, 1040, fin), s: 260, mood: vMood, look: t < T.b2 ? [0.4, 0.8] : [1, 0], hops: VIR_HOPS, squash: 0.03 * stir, scarf: VC, pop: ok, seed: 7 })
  table(x, t, fin)
  pot(x, t, potX, 1180)
  // the spoon
  if (ok > 0.01) { x.save(); x.translate(potX - 40 + 30 * stir, 1060); x.rotate(-0.4 + 0.2 * stir); R(x, INK, -6, -90, 12, 110); R(x, '#c99a4a', -3, -86, 6, 104); x.restore() }
  // soup night: bowls + Pisces at the pot, crying into the steam
  if (fin > 0.5) {
    for (const bx of [200, 430, 720, 880]) mug(x, t, bx, 1160, 0.6 * ok, ['#f39a3a', '#ef5c94', '#f2cf4a', '#e163d6'][(bx / 10) % 4 | 0], { steam: 0.6 })
    star(x, t, 'pisces', { x: potX, y: 960, s: 170, pop: inK, mood: 'heart', look: [0, 1], tears: 3, hat: '#7c74f0', seed: 6, hops: [T.sit + 0.4, 22.0] })
  }
  bubble(x, t, 400, 840, T.pocket + 0.4, 23.4, 'maybe in spring.', { size: 34, tail: 0 })
  // THE STARS
  const stk = pop01(t, 15.4, 0.4, 2) * outK(t, [T.fin - 0.2, T.fin])
  if (stk > 0.01) star(x, t, 'stars', { x: 760, y: 640, s: 150, pop: stk, mood: 'happy', hops: [15.6, ...talkHops(L3, SP, { cps: 30 })], seed: 2 })
  hearts(x, t, T.sit + 0.6, 540, 960, { n: 6, cell: 7 })
  sparkles(x, t, 540, 1000, T.sit + 0.5, 12, 260, 1, [GOLD, VC, BONE])
}

const EP = makeEp({
  id: 'nc14e19', ep: 19, duration: 30, key: 'D',
  heads: [
    { text: "Everyone's cuffed. | *Virgo* is thriving.", at: -1.2, out: [5.2, 5.4], accentColor: VC, size: 96, accentSize: 134 },
    { text: 'The friends | *intervene.*', at: T.b2 + 0.1, out: [12.2, 12.4], accentColor: LC, size: 104, accentSize: 140 },
    { text: 'Not waiting. | *Living.*', at: T.b3 + 0.05, out: [18.4, 18.6], accentColor: GOLD, size: 108, accentSize: 150 },
    { text: "Single isn't a season | to *survive.*", at: T.fin + 0.15, late: 1, lateAt: 19.5, wobble: true, out: [25.0, 25.3], accentColor: VC, size: 90, accentSize: 150 },
  ],
  boxes: [
    { lines: L2, open: 5.7, close: 12.2 },
    { lines: L3, open: 12.6, close: 18.5 },
  ],
  images: ['mystery'],
  ghost: { at: 9.4, x: 460, y: 560, from: 'below', cell: 3 },
  snow: 0, ground: false,
  scene,
  cues: [
    ...[0.4, 1.2, 2.0, 2.8, 3.6, 4.4].map(a => ['tick', a, 0.025]),
    ['pop', T.leo + 0.05, 880, 0.04, 0.4], ['whoosh', 5.8, 0.3, 0.03], ['pop', T.gem + 0.05, 987.77, 0.04, 0.3], ['pop', T.lib + 0.05, 1174.66, 0.04, 0.4],
    ['pop', 15.5, 987.77, 0.04, 0.2], ['glitter', 15.4, 15.9],
    ['whoosh', T.sit - 0.2, 0.5, 0.04], ...[200, 430, 720, 880].map((_, i) => ['tick', r3(T.sit + 0.3 + i * 0.1), 0.04]),
    ['whoosh', T.pocket, 0.3, 0.03], ['pluck', T.pocket + 0.5, 1174.66, 0.04, 0.5, 0], ['glitter', T.sit + 0.5, T.sit + 1.1],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [SNOW, ICE, RED, MINT, INTER, clamp]
