// nc14e23: CUFFING SEASON, "The one who was never seasonal" (33 s vertical, promo/films/next30/b02.md, music: lofi · Dm)
// Story 0–30.6, then the short end card (no Align card transition). The season look lives in ../../nc14e13/cuffkit.js.
//   0.0–6.0    "Everyone cuffed for winter. | *Scorpio* was here in spring."  Frame 0: ♏ Scorpio in the snow holding out a
//              pressed pink flower to ♉ Taurus. TAURUS: "a flower? in *this* weather?"  SCORPIO: "i pressed it. in *april.*"
//   6.0–14.0   "Every | *season.*"  Three flashback snapshots pop up: SPRING (Scorpio gives Taurus the flower), SUMMER (they
//              share the shade), AUTUMN (they rake the same leaf pile). TAURUS: "wait. you liked me in *april?*"  (ghost, 10.2)
//  14.1–21.0   "Not a winter | *thing.*"  SCORPIO: "i like you in *every weather.*"  THE STARS: "the real ones don't need the
//              cold to *show up.*"
//  21.0–30.1   A flower, a sun, a leaf and a snowflake circle the two; Taurus tucks the flower into its hat. Pisces cries
//              over its own pressed flower. Last line: "Some people are your | *every* season."
import { makeEp, star, bubble, hearts, sparkles, shadow, R, box, drawBits, FLAKE, label,
  pop01, outK, prog, lerp, clamp, ease, talkHops, SNOW, ICE, PINK, GOLD, RED, MINT, INK, BONE, INTER, r3 } from '../../nc14e13/cuffkit.js'

const SP = 'THE STARS', SCO = '♏︎ SCORPIO', TAU = '♉︎ TAURUS', SC = '#ff8fa8', TC = '#ffd27a'
const L1 = [
  { t: 1.2, speaker: TAU, color: TC, text: 'a flower? in *this* weather?' },
  { t: 3.7, speaker: SCO, color: SC, text: 'i pressed it. in *april.*' },
]
const L2 = [{ t: 11.4, speaker: TAU, color: TC, text: 'wait. you liked me in *april?*' }]
const L3 = [
  { t: 14.4, speaker: SCO, color: SC, text: 'i like you in *every weather.*' },
  { t: 16.9, speaker: SP, text: "the real ones don't need the cold to *show up.*" },
]
const T = { b2: 6.0, snaps: [6.2, 8.2, 10.2], cut: 14.0, b3: 14.1, fin: 21.0, tuck: 21.8 }
const FLOWER = ['.P.P.', 'PPPPP', '.PYP.', '..G..', '.GG..', '..G..', '..G..']
const SUN = ['..Y..', 'Y.Y.Y', '.YYY.', 'YYYYY', '.YYY.', 'Y.Y.Y', '..Y..']
const LEAF = ['...O.', '..OOO', '.OOOO', 'OOOO.', '.OO..', 'B....']
const SCO_HOPS = [0.5, ...talkHops(L1, SCO, { cps: 30 }), ...talkHops(L3, SCO, { cps: 30 }), T.tuck + 0.2, 24.6, 27.2]
const TAU_HOPS = [...talkHops(L1, TAU, { cps: 30 }), ...talkHops(L2, TAU, { cps: 30 }), 15.6, T.tuck, 24.8, 27.4]

// a flashback snapshot: a tilted photo with a mini season scene
function snapshot(x, t, i, k, slot) {
  if (k <= 0.01) return
  const W = 300, H = 330, cx = [215, 540, 865][slot], cy = 760 + [10, -20, 10][slot], rot = [-0.08, 0.04, 0.09][slot]
  const bg = ['#ffc2d8', '#ffe28a', '#f3a35a'][i], gr = ['#7fd08a', '#5fb86a', '#b0683a'][i]
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  box(x, -W / 2, -H / 2, W, H, BONE, { b: 6 })
  x.save(); x.beginPath(); x.rect(-W / 2 + 16, -H / 2 + 16, W - 32, H - 90); x.clip()
  R(x, bg, -W / 2, -H / 2, W, H)
  R(x, gr, -W / 2, H / 2 - 150, W, 80)
  if (i === 0) drawBits(x, FLOWER, { P: PINK, Y: GOLD, G: '#3fb08a' }, 0, -30, 7)
  if (i === 1) { drawBits(x, SUN, { Y: '#fff1a8' }, 90, -110, 7); R(x, INK, -100, -120, 16, 120); x.fillStyle = '#3fb08a'; x.beginPath(); x.arc(-92, -130, 70, 0, 7); x.fill() }
  if (i === 2) for (let j = 0; j < 9; j++) drawBits(x, LEAF, { O: ['#e8344e', '#f39a3a', '#f2c75c'][j % 3], B: '#6a4426' }, -60 + (j % 5) * 30, 0 + Math.floor(j / 5) * 18, 4)
  star(x, t, 'scorpio', { x: -60, y: -10, s: 110, mood: 'happy', look: [1, 0], seed: 12 + i })
  star(x, t, 'taurus', { x: 60, y: -10, s: 110, mood: i === 0 ? 'sparkle' : 'happy', look: [-1, 0], seed: 9 + i })
  x.restore()
  x.font = `800 30px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(['SPRING', 'SUMMER', 'AUTUMN'][i], 0, H / 2 - 38)
  x.restore()
}

function scene(x, t, K) {
  const ok = K.ok
  // the flashbacks
  for (let i = 0; i < 3; i++) snapshot(x, t, i, pop01(t, T.snaps[i], 0.4, 2) * outK(t, [T.b3 - 0.3, T.b3]), i)
  // Pisces with its own pressed flower
  const PF = star(x, t, 'pisces', { x: 960, y: 1170, s: 160, mood: t > T.fin ? 'heart' : t > 11.4 ? 'wide' : 'sparkle', look: [-1, 0], tears: t > 14.4 ? 3 : 2, hat: '#7c74f0', seed: 6, pop: ok, hops: [14.5, T.tuck + 0.3] })
  if (PF) drawBits(x, FLOWER, { P: PINK, Y: GOLD, G: '#3fb08a' }, 880, PF.cy + 10, 5)
  // the pair
  const fin = ease.inOutCubic(prog(t, T.fin - 0.2, T.fin + 0.6))
  const sx = lerp(380, 430, fin), tx = lerp(720, 660, fin)
  shadow(x, sx, 1300, 260 * ok); shadow(x, tx, 1300, 260 * ok)
  const scoMood = t < T.b2 ? 'sparkle' : t < T.b3 ? 'happy' : t < 16.9 ? 'neutral' : 'heart'
  const tauMood = t < 3.7 ? 'neutral' : t < T.b2 ? 'wide' : t < 11.4 ? 'sparkle' : t < T.b3 ? 'wide' : t < T.fin ? 'happy' : 'heart'
  const SF = star(x, t, 'scorpio', { x: sx, y: 1150, s: 270, mood: scoMood, look: [1, 0], hops: SCO_HOPS, hat: '#e23d66', scarf: BONE, blush: t > 14.4 ? 1 : 0, pop: ok, seed: 12 })
  const TF = star(x, t, 'taurus', { x: tx, y: 1150, s: 270, mood: tauMood, look: [-1, 0], hops: TAU_HOPS, hat: '#e9b24a', scarf: MINT, blush: t > T.fin ? 1 : 0, pop: ok, seed: 9 })
  // the pressed flower: held out, then tucked into Taurus's hat
  if (SF && TF) {
    const tk = ease.inOutCubic(prog(t, T.tuck - 0.6, T.tuck))
    const fx = lerp(SF.ox + 160, TF.ox + 34, tk), fy = lerp(SF.cy - 10, TF.cy - 140, tk)
    drawBits(x, FLOWER, { P: PINK, Y: GOLD, G: '#3fb08a' }, fx, fy, lerp(12, 6, tk), { rot: lerp(0.2, -0.3, tk), alpha: ok })
  }
  // the four seasons circling them
  const ck = pop01(t, T.fin + 0.4, 0.4, 2) * ok
  if (ck > 0.01) [[FLOWER, { P: PINK, Y: GOLD, G: '#3fb08a' }], [SUN, { Y: '#fff1a8' }], [LEAF, { O: '#f39a3a', B: '#6a4426' }], [FLAKE, { W: SNOW }]].forEach(([bm, cols], i) => {
    const a = t * 0.9 + i * Math.PI / 2
    drawBits(x, bm, cols, 545 + Math.cos(a) * 330, 1020 + Math.sin(a) * 150, 8 * ck)
  })
  // THE STARS
  const stk = pop01(t, 16.6, 0.4, 2) * outK(t, [T.fin - 0.2, T.fin])
  if (stk > 0.01) star(x, t, 'stars', { x: 540, y: 700, s: 150, pop: stk, mood: 'happy', hops: [16.8, ...talkHops(L3, SP, { cps: 30 })], seed: 2 })
  hearts(x, t, T.tuck + 0.1, 545, 920, { n: 7, cell: 7 })
  sparkles(x, t, 545, 960, T.tuck, 12, 220, 1, [PINK, GOLD, ICE])
}

const EP = makeEp({
  id: 'nc14e23', ep: 23, duration: 35, key: 'Dm',
  heads: [
    { text: 'Everyone cuffed for winter. | *Scorpio* was here in spring.', at: -1.4, out: [5.8, 6.0], accentColor: SC, size: 80, accentSize: 116 },
    { text: 'Every | *season.*', at: T.b2 + 0.1, out: [13.8, 14.0], accentColor: TC, size: 108, accentSize: 150 },
    { text: 'Not a winter | *thing.*', at: T.b3 + 0.05, out: [20.8, 21.0], accentColor: GOLD, size: 108, accentSize: 150 },
    { text: 'Some people are your | *every* season.', at: T.fin + 0.2, late: 2, lateAt: 22.4, wobble: true, out: [30.0, 30.3], accentColor: SC, size: 90, accentSize: 132 },
  ],
  boxes: [
    { lines: L1, open: 1.0, close: 5.8 },
    { lines: L2, open: 11.2, close: 13.9 },
    { lines: L3, open: 14.2, close: 20.9 },
  ],
  ghost: { at: 10.2, x: 865, y: 1290, from: 'below', cell: 3 },
  snow: 0.85, ground: 1290,
  scene,
  cues: [
    ['pluck', 0.6, 1174.66, 0.03, 0.6, -0.2],
    ...T.snaps.flatMap((a, i) => [['whoosh', a, 0.35, 0.035], ['tick', r3(a + 0.35), 0.05], ['pop', r3(a + 0.38), [880, 987.77, 1174.66][i], 0.04, (i - 1) * 0.4]]),
    ['pop', 11.5, 1318.51, 0.045, 0.3], ['pop', 16.7, 987.77, 0.04, 0], ['glitter', 16.6, 17.1],
    ['whoosh', T.fin + 0.4, 0.5, 0.035], ['glitter', T.fin + 0.4, T.fin + 1.0], ['pluck', T.tuck, 1174.66, 0.045, 0.6, 0], ['pluck', T.tuck + 0.12, 1567.98, 0.04, 0.6, 0],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [bubble, label, RED, clamp]
