// kmte13: MIRROR TALK No. 13, '"So… are you seeing anyone?"' (22 s vertical, star_advice post, jazzy · Bb). Hard cut.
// Row: promo/films/month2/m21.md. No end card, no card cut.
//   0.00   frame 0: Taurus mid-chew at a December family dinner, an aunt's speech bubble slamming in, every head turned.
//          Hook '"So… are you | *seeing* anyone?"'  0.5: record scratch + freeze: "yep. *every* December."
//   2.4    whip to the hallway mirror. "Hallway mirror. *Emergency* meeting."  TAURUS: "they asked. they ALL *looked*."
//   5.2    REFLECTION: "you're allowed to be happy *single*." → "try: 'not yet, and honestly? I'm *good*.'"
//   10.2   Taurus rehearses it; REFLECTION: "now go eat your *pie*."
//   15.0   whip back to the table: "so… seeing anyone?" → "not yet, and I'm good." Taurus passes the gravy.
//          AUNT: "good for you!"  Pisces cries across the table.  20.4 last line '"Not yet, and | I'm *good.*"'  Hard cut at 22.
import { makeMirror, drawStarChar, starFrame, inSprite, tearsCells, bubble, hearts, sparkles, confetti, pop01, outK, prog, lerp, clamp, ease, easeOutBack, R, box, INK, BONE, GOLD, r3, INTER, signStar } from '../../kmte01/mirrorkit.js'

const T = { rec: 0.5, toMirror: 2.4, s1: 3.1, m1: 5.2, m2: 7.6, s2: 10.2, m3: 12.6, back: 15.0, ask: 15.25, ans: 16.0, gravy: [16.7, 17.3], good: 17.6, last: 20.4 }
const TAU = signStar('taurus'), PIS = signStar('pisces')

function dinner(x, t, phase) {
  // a warm dining room, a long table, the family
  const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#3a1f2e'); g.addColorStop(1, '#1d1020')
  x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  // window with snow + a garland
  box(x, 690, 500, 280, 300, '#16203d', { b: 8 }); R(x, '#5a3a2a', 826, 500, 8, 300); R(x, '#5a3a2a', 690, 646, 280, 8)
  for (let i = 0; i < 14; i++) { const sx = 700 + ((i * 53) % 260), sy = 505 + (((t * 60 + i * 97) % 285)); R(x, '#fff', sx, sy, 6, 6) }
  for (let i = 0; i < 18; i++) { const gx = 40 + i * 58, gy = 440 + Math.sin(i * 0.7) * 16; R(x, '#2f8a4a', gx, gy, 46, 22); if (i % 3 === 0) R(x, i % 2 ? '#e8344e' : GOLD, gx + 18, gy + 16, 12, 12) }
  // the family behind the table
  const fam = [{ x: 170, c: '#e6b07a', seed: 21 }, { x: 800, c: '#9fc8ff', seed: 22 }]
  fam.forEach((f, i) => drawStarChar(x, f.x, 1010, 230, t, { color: f.c, mood: phase === 'end' && t > T.good ? 'happy' : 'wide', look: [i ? -1 : 1, 0], seed: f.seed, glow: 0.7 }))
  // Taurus, centre, mid-chew
  const chew = phase === 'start' ? 0.08 * Math.sin(t * 18) : 0
  const tm = phase === 'start' ? 'wide' : t > T.ans ? 'happy' : 'neutral'
  drawStarChar(x, 520, 1030, 290, t, { color: TAU.color, glyph: TAU.glyph, mood: tm, look: phase === 'start' ? [0, 0] : [-1, -0.2], seed: 3, squash: chew, hops: [T.ans, T.gravy[0]], blink: phase === 'start' ? false : undefined })
  // the table
  R(x, INK, 0, 1160, 1080, 12); R(x, '#f4e6d0', 0, 1170, 1080, 260); R(x, '#e4d0b4', 0, 1170, 1080, 16); R(x, '#c94a4a', 0, 1250, 1080, 30)
  for (const px of [180, 520, 840]) { x.fillStyle = INK; x.beginPath(); x.ellipse(px, 1205, 104, 32, 0, 0, 7); x.fill(); x.fillStyle = '#fff'; x.beginPath(); x.ellipse(px, 1203, 96, 26, 0, 0, 7); x.fill(); R(x, '#d98a4a', px - 40, 1192, 80, 16); R(x, '#5fa04a', px + 10, 1186, 30, 12) }
  // Pisces across the table, crying
  const pk = { x: 985, y: 1110, s: 140 }
  drawStarChar(x, pk.x, pk.y, pk.s, t, { color: PIS.color, mood: phase === 'end' ? 'happy' : 'wide', look: [-1, -0.3], seed: 6, tips: false })
  inSprite(x, starFrame(pk.x, pk.y, pk.s, t, { seed: 6 }), () => tearsCells(x, t, phase === 'end' ? 3 : 2))
  // the gravy boat (slides to the aunt in the end)
  const gp = phase === 'end' ? ease.inOutCubic(prog(t, ...T.gravy)) : 0
  const gx = lerp(640, 260, gp), gy = 1300
  x.save(); x.translate(gx, gy); R(x, INK, -60, -26, 120, 44); R(x, '#fff8ee', -54, -20, 108, 32); R(x, '#8a5a2a', -50, -20, 100, 10); R(x, INK, 54, -18, 30, 10); x.restore()
  x.fillStyle = 'rgba(6,4,18,0.35)'; x.fillRect(0, 1430, 1080, 490)
}

const F = makeMirror({
  id: 'kmte13', sign: 'taurus', dur: 22,
  hook: { text: '“So… are you | *seeing* anyone?”', accentColor: '#ffd36b', out: [2.3, 2.5] },
  fx: [
    { k: 'recordScratch', at: T.rec, len: 1.3, caption: 'yep. *every* December.', top: 1560 },
    { k: 'whipZoom', at: T.toMirror, from: 1.5 },
    { k: 'whipZoom', at: T.m1 - 0.08, from: 1.25 },
    { k: 'screenShake', at: T.s2, amp: 8, len: 0.3 },
    { k: 'whipZoom', at: T.back, from: 1.5 },
    { k: 'screenShake', at: T.gravy[1], amp: 8, len: 0.3 },
  ],
  caps: [
    { at: 2.75, out: [9.2, 9.4], text: 'Hallway mirror. | *Emergency* meeting.', accent: '#ff8fa0', size: 90, accentSize: 116 },
    { at: 9.45, out: [14.8, 15.0], text: 'Rehearse | the *truth.*', accent: '#8fe9ff' },
    { at: T.last, out: [99, 100], text: '“Not yet, and | I’m *good.*”', accent: '#ffd36b', gap: 0.1 },
  ],
  lines: [
    { t: T.s1, who: 'S', text: 'they asked. they ALL *looked*.' },
    { t: T.m1, who: 'M', text: "you're allowed to be happy *single*." },
    { t: T.m2, who: 'M', text: "try: \"not yet, and honestly? I'm *good*.\"" },
    { t: T.s2, who: 'S', text: "not yet… and honestly? I'm *good*." },
    { t: T.m3, who: 'M', text: 'now go eat your *pie*.' },
  ],
  boxes: [[2.95, 14.6]],
  pose(t) {
    const p = { mood: 'wide', look: [1, -0.6] }
    if (t > T.s1 + 1) { p.mood = 'neutral'; p.look = [1, -0.4] }
    if (t > T.m1) { p.mood = 'sparkle'; p.look = [1, -0.8] }
    if (t > T.s2) { p.mood = 'happy'; p.look = undefined }
    return p
  },
  signHops: [T.s2 + 1.4],
  refl(t) {
    const p = { mood: 'neutral', look: [-1, 0.6] }
    if (t > T.m1) p.mood = 'happy'
    if (t > T.s2 + 1.2) p.mood = 'wink'
    return p
  },
  reflHops: [T.s2 + 1.3, T.s2 + 1.7],
  pis(t) { return { tears: t > T.s2 ? 3 : 2, mood: t > T.s2 ? 'sparkle' : 'wide' } },
  tissuePulls: [T.s2 + 1.2, T.m3],
  over(x, t) {
    if (t < T.toMirror) dinner(x, t < T.rec ? t : t < T.rec + 1.3 ? T.rec : t - 1.3, 'start')
    if (t >= T.back) {
      dinner(x, t, 'end')
      bubble(x, t, 330, 830, T.ask, T.ans + 0.4, 'so… seeing anyone?', { size: 34, col: '#ffe9c8', tail: -0.5 })
      bubble(x, t, 540, 790, T.ans, T.good + 0.1, "not yet, and I'm good.", { size: 38, col: '#c9f0c8', tail: -0.1 })
      bubble(x, t, 230, 830, T.good, T.last + 0.2, 'good for you!', { size: 36, col: '#ffe9c8', tail: -0.5 })
      hearts(x, t, T.good, 520, 950, { n: 6, cell: 7, spread: 200 })
      sparkles(x, t, 260, 1300, T.gravy[1], 10, 120, 2)
    }
    // frame 0: the aunt's question slams in
    if (t < T.toMirror) {
      const tt = t < T.rec ? t : T.rec
      bubble(x, tt, 420, 800, -1, 9, 'so… are you seeing anyone?', { size: 40, col: '#ffe9c8', tail: -0.6, rot: -0.04 })
    }
  },
  cues: [
    ['boom', 0.0, 0.14], ['pop', 0.02, 659.25, 0.045, 0], ['tick', 0.1, 0.04], ['tick', 0.3, 0.04],
    ['whoosh', T.s2 + 1.3, 0.3, 0.02],
    ['pop', T.ask, 880, 0.045, -0.3], ['pop', T.ans, 1174.66, 0.05, 0], ['whoosh', T.gravy[0], 0.6, 0.035], ['tick', T.gravy[1], 0.05],
    ['pop', T.good, 1396.91, 0.05, -0.3], ['bell', T.good + 0.05, 1864.66, 0.025, 1.0, 0], ['glitter', T.good, T.good + 0.5],
    ['bell', T.last + 0.5, 1864.66, 0.03, 1.0, 0],
  ],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
