// nole24: ONE-LINE ADVICE FOR YOUR SIGN, "Pisces, when your holiday card is three pages." (12 s vertical, star_advice
// trial, music: dreamy · Db). Story 0–9.6, then the shared end card. Format: ../../nole01/scenes/olkit.js.
//   0.0–4.6   "*Pisces*, when your | holiday card is | *three pages.*"  Pisces writes, crying, on a card whose paper
//             unrolls off the desk to the floor; page tags pop: P. 2 (1.3), P. 3 (2.4); a fourth sheet slides in (3.4).
//   4.6       white blink (no card cut).   4.6–9.6  THE STARS: "Big feelings? | *Send* them."  Pisces seals the envelope with a heart;
//             the date reads it and cries too.
import { makeOneLine, miniPhone, cloud, table, bubble, box, R, label, shadow, sparkles, hearts, snow, drawBits, HEART, starFrame, inSprite, tearsCells, shadesCells, scarfCells, tissues, prog, clamp, lerp, ease, pop01, outK, drawStarChar, INK, BONE, GOLD, RED, PINK, LAV, SKYB, MINT, INTER, MONO, SERIF, r3 } from '../../nole01/scenes/olkit.js'
function sit(x, t, S) {
  const { pisces } = S
  // the desk + the unrolling card
  box(x, 120, 1180, 560, 40, '#8a5a3c', { b: 6, hi: '#a8724e' }); R(x, INK, 150, 1226, 24, 300); R(x, INK, 626, 1226, 24, 300)
  const len = 120 + 520 * ease.outCubic(prog(t, 0, 3.6))
  R(x, INK, 664, 1150, 132, 30 + len); R(x, '#fbf4e6', 670, 1156, 120, 24 + len)
  for (let i = 0; i < Math.floor(len / 28); i++) R(x, '#b9b0d6', 684, 1180 + i * 28, 92 - (i * 13 % 30), 5)
  ;[[1.3, 'P. 2', 1300], [2.4, 'P. 3', 1500]].forEach(([a, s, y]) => { const k = pop01(t, a, 0.3, 2.4); if (k > 0.01) label(x, s, 880, y, { size: 30 * k, col: GOLD }) })
  const sk = ease.outCubic(prog(t, 3.4, 3.8))
  if (sk > 0) { x.save(); x.translate(lerp(1300, 900, sk), 1000); x.rotate(0.15); box(x, -70, -90, 140, 180, '#fbf4e6', { b: 5 }); for (let i = 0; i < 5; i++) R(x, '#b9b0d6', -50, -60 + i * 26, 100, 5); x.restore(); label(x, 'P. 4?!', 900, 870, { size: 30, col: PINK, alpha: sk }) }
  const F = pisces(x, t, { x: 400, y: 1030, s: 260, hops: [-0.1, 1.3, 2.4, 3.4] }, 2, 'sparkle', [1, 0.8])
  // a pen
  x.save(); x.translate(560 + 10 * Math.sin(t * 14), 1130); x.rotate(-0.6); R(x, INK, -8, -70, 16, 90); R(x, PINK, -4, -66, 8, 80); x.restore()
  void F
}
function after(x, t, S) {
  const { pisces, date, ok, T } = S
  const hk = pop01(t, T.heroIn, 0.38, 2.1) * ok
  shadow(x, 520, 1350, 210 * hk); shadow(x, 830, 1340, 190 * hk)
  pisces(x, t, { x: 520, y: 1190, s: 230, pop: hk, hops: [T.heroIn + 0.3, T.react, T.react + 0.6] }, 2, t > T.react ? 'happy' : 'sparkle', [1, 0])
  // the envelope travels to the date
  const p = ease.inOutCubic(prog(t, T.react, T.react + 0.6))
  if (hk > 0.3) { x.save(); x.translate(lerp(560, 760, p), lerp(1060, 1010, p)); x.rotate(-0.08); box(x, -80, -50, 160, 100, BONE, { b: 6 }); x.strokeStyle = INK; x.lineWidth = 5; x.beginPath(); x.moveTo(-80, -50); x.lineTo(0, 10); x.lineTo(80, -50); x.stroke(); drawBits(x, HEART, { H: RED }, 0, 8, 5); x.restore() }
  const o = { x: 840, y: 1170, s: 200, pop: hk, mood: t > T.react + 0.8 ? 'sparkle' : 'neutral', look: [-1, 0.3], hops: [T.react + 0.8] }
  date(x, t, o)
  if (t > T.react + 0.9) inSprite(x, starFrame(o.x, o.y, o.s, t, o), () => tearsCells(x, t, 2))
  hearts(x, t, T.react + 0.9, 690, 980, { n: 4, spread: 80 })
}
const EP = makeOneLine({
  id: 'nole24', sign: 'pisces', name: 'Pisces', len: 14, date: 'scorpio',
  hook: '*Pisces*, when your | holiday card is | *three pages.*',
  hookSize: 84, hookAccent: 118,
  line: 'Big feelings? | *Send* them.',
  sit, after, tagX: 520,
  cues: [...Array.from({ length: 22 }, (_, i) => ['tick', r3(0.1 + i * 0.16), 0.012]), ['pop', 1.3, 1174.66, 0.035, 0.3], ['pop', 2.4, 1318.51, 0.035, 0.3], ['whoosh', 3.4, 0.35, 0.03], ['pop', 3.6, 1567.98, 0.04, 0.3]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CUT = EP.T.cut
