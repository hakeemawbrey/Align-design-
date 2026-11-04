// nsge26 · Remix: Snow Globe Cities · "Anchorage: the crier" (30 s vertical, music: dreamy · Db) · story 0–25.6, then the
// shared end card. Look: ../nsge15/globekit.js. Rows: promo/films/next30/b17.md.
// Pisces is the lead this time, crying INSIDE the globe (no second Pisces at the glass).
//   0.00–5.2   "Anchorage, in a | snow *globe.*"  Mountains over a low city; the sun is already setting (winter sunsets
//              there come early). ♓ Pisces, crying, waves at it: "the sun set so early and I cried."
//   5.4–13.0   "Then: | *a moose.*"  A moose strolls down the street (they really do wander through town). PISCES: "he's
//              so majestic." Then one big snowflake lands on Pisces' nose: sob. THE STARS: "the right one won't mind the
//              tears."
//  13.4        card cut.
//  13.55–20.8 "Enter: | *a tissue.*"  ♏ Scorpio walks up: "here. I brought a tissue." Then sees the moose: "…oh no. the
//              moose." Scorpio cries too. PISCES: "you cry too?"
//  21.0–25.5   "Find someone who | cries *with* you."  A talk card ("What's your comfort meal?"). Both fountain.
import { globeFilm, G, GOLD, BONE, INK, PINK, ICE, pop01, outK, popOut, inR, walk, drawBits, heart, sparkles, chip, drawCard } from '../../nsge15/globekit.js'
import { clamp, lerp, prog, ease } from '../../../src/lib.js'

const T = {
  h0Out: [5.0, 5.2], sunset: [-0.5, 4.6],
  h1: 5.4, h1Out: [12.85, 13.05], moose: [5.5, 8.0], flake: [8.6, 9.6], starsIn: 10.0, cut: 13.4,
  h2: 13.55, h2Out: [20.7, 20.9], scoIn: [13.9, 15.2], tissue: 15.6, scoCry: 17.9, together: 19.6,
  h3: 21.0, card: [21.6, 22.1], out: [25.1, 25.45],
}
const GY = G.ground - 62
const PIS_X = 400
const SCO_X = t => walk(t, [[T.scoIn[0], 1100, 0], [T.scoIn[1], 600, 0]])[0]
const MOOSE_X = t => walk(t, [[T.moose[0], 1100, 0], [T.moose[1], 800, 0]])[0]

function skyline(x, t) {
  // the setting sun + an orange horizon that fades to night
  const s = prog(t, ...T.sunset)
  const g = x.createLinearGradient(0, 800, 0, 1100); g.addColorStop(0, 'rgba(255,140,90,0)'); g.addColorStop(1, `rgba(255,150,90,${0.75 * (1 - s)})`)
  x.fillStyle = g; x.fillRect(140, 700, 800, 420)
  if (s < 1) { x.fillStyle = `rgba(255,${Math.round(lerp(200, 120, s))},90,${1 - s * 0.5})`; x.beginPath(); x.arc(620, lerp(845, 1000, ease.inQuad(s)), 46, 0, Math.PI * 2); x.fill() }
  // mountains
  x.fillStyle = '#3a3f70'; x.beginPath(); x.moveTo(140, 1060); x.lineTo(260, 900); x.lineTo(340, 960); x.lineTo(470, 850); x.lineTo(600, 960); x.lineTo(700, 890); x.lineTo(820, 980); x.lineTo(940, 920); x.lineTo(940, 1060); x.fill()
  x.fillStyle = '#e9f2ff'; for (const [mx, my] of [[260, 900], [470, 850], [700, 890], [940, 920]]) { x.beginPath(); x.moveTo(mx, my); x.lineTo(mx - 40, my + 40); x.lineTo(mx + 40, my + 40); x.fill() }
  // low city
  for (const [bx, h] of [[200, 70], [280, 100], [360, 60], [620, 90], [720, 120], [840, 70]]) { x.fillStyle = '#1e2448'; x.fillRect(bx - 34, 1110 - h, 68, h); x.fillStyle = 'rgba(255,224,138,0.6)'; for (let r = 0; r < h / 28; r++) for (let c = 0; c < 2; c++) if ((r + c + bx) % 3) x.fillRect(bx - 22 + c * 26, 1110 - h + 10 + r * 28, 10, 12) }
}
const MOOSE = [
  'A.A......A.A', 'AAA......AAA', '.AAA....AAA.', '..AAAAAAAA..', '....BBBB....', '...BBBBBB...', '...BEBBEB...',
  '...BBBBBB...', '....BBBB....', '....BBBB....', '....BB.BBBBBBBBBBB', '....BBBBBBBBBBBBBB', '.....BBBBBBBBBBBB.', '.....BB.BB..BB.BB.', '.....BB.BB..BB.BB.', '.....BB.BB..BB.BB.',
]
function moose(x, t) {
  if (t < T.moose[0]) return
  const mx = MOOSE_X(t), step = t < T.moose[1] ? Math.sin(t * 10) * 3 : 0
  const bm = MOOSE.map(r => r.padEnd(18, '.'))
  drawBits(x, bm, { A: '#e6d2a8', B: '#6b4430', E: INK }, mx + 40, G.ground - 108 + step, 13)
}

export const { DURATION, SCENES, CUES, MUSIC } = globeFilm({
  id: 'nsge26', plate: 'Anchorage', lead: 'pisces', partner: 'scorpio',
  sky: { top: '#0b1236', bot: '#2c2a60', glow: '#ff9a70' },
  shakes: [-0.25],
  skyline,
  back(x, t) { moose(x, t) },
  cast(t, K) {
    let pm = 'sparkle', pl = [1, -0.4], tears = t < 4.6 ? 3 : 2
    if (inR(t, T.moose[0] + 0.6, T.flake[0])) { pm = 'heart'; tears = 3 }
    if (inR(t, T.flake[0], T.flake[1] + 0.6)) { pm = 'wide'; pl = [0, -1]; tears = 3 }
    if (t > T.starsIn + 0.4) { pm = 'neutral'; pl = [1, -1]; tears = 1 }
    if (t > T.cut) { pm = 'neutral'; pl = [1, 0]; tears = 1 }
    if (t > T.tissue) { pm = 'happy'; tears = 0 }
    if (t > T.scoCry) { pm = 'wide'; tears = 0 }
    if (t > T.together) { pm = 'happy'; tears = 3 }
    let sm = 'neutral', st = 0
    if (t > T.tissue) sm = 'happy'
    if (t > T.scoCry - 0.4) { sm = 'wide' }
    if (t > T.scoCry) { sm = 'sparkle'; st = 2 }
    if (t > T.together) st = 3
    return [
      t > T.scoIn[0] ? { sign: 'scorpio', x: SCO_X(t), y: GY, s: 180, mood: sm, look: t > T.scoCry - 0.5 && t < T.together ? [1, 0] : [-1, 0], tears: st, hops: [T.scoIn[1], T.tissue, T.scoCry, T.together + 0.1, 22.6, ...K.HOPS.partner], seed: 10 } : null,
      { sign: 'pisces', x: PIS_X, y: GY, s: 190, mood: pm, look: pl, tears, hops: [0.0, 1.8, T.moose[1], T.flake[1], T.together, 22.4, ...K.HOPS.lead], seed: 6, hat: '#8fb8ff' },
    ]
  },
  front(x, t) {
    // the big snowflake that lands on Pisces' nose
    if (inR(t, T.flake[0] - 1.0, T.flake[1] + 0.8)) {
      const k = ease.inOutCubic(prog(t, T.flake[0] - 1.0, T.flake[0])), fy = lerp(700, GY - 10, k), fx = PIS_X + 40 * Math.sin(t * 3) * (1 - k)
      drawBits(x, ['...W...', '.W.W.W.', '..WWW..', 'WWWWWWW', '..WWW..', '.W.W.W.', '...W...'], { W: '#ffffff' }, fx, fy, 7, { alpha: 1 - prog(t, T.flake[1], T.flake[1] + 0.8) })
    }
    // the tissue
    if (t > T.scoIn[0]) { const give = ease.inOutCubic(prog(t, T.tissue, T.tissue + 0.4)); drawBits(x, ['.WW.', 'WWWW', 'WWWW'], { W: '#ffffff' }, lerp(SCO_X(t) - 100, PIS_X + 90, give), GY + 10 - 30 * Math.sin(Math.PI * give), 9) }
    if (t > T.together && t < T.out[1]) for (let i = 0; i < 3; i++) { const tt = t - T.together - i * 0.4; if (tt > 0 && tt < 2.4) heart(x, 500 + 26 * Math.sin(tt * 3 + i), GY - 160 - tt * 70, 6, i % 2 ? '#ff4f86' : '#ff8fb1', { alpha: 1 - tt / 2.4 }) }
  },
  stars(t) {
    const k = pop01(t, T.starsIn, 0.4, 2.1) * popOut(t, T.out)
    return { x: 925, y: 650, s: 125, mood: t < T.cut ? 'happy' : t > T.together ? 'sparkle' : 'happy', look: [-1, 0.7], pop: k }
  },
  pisces: () => null,
  over(x, t, K) {
    chip(x, 700, 900, 'bye, sun', pop01(t, 0.3, 0.3, 2.4) * outK(t, [4.6, 4.8]), { size: 24, col: '#ffb070', bar: '#ffb070' })
    chip(x, 860, 980, 'MOOSE', pop01(t, T.moose[1] - 0.2, 0.3, 2.4) * outK(t, T.h1Out), { size: 24, col: '#e6d2a8', bar: '#e6d2a8' })
    chip(x, PIS_X, 800, 'sob.', pop01(t, T.flake[0] + 0.05, 0.25, 2.8) * outK(t, [T.flake[1] + 0.3, T.flake[1] + 0.5]), { size: 30, col: '#8fe3ff', bar: '#8fe3ff' })
    if (t > T.card[0]) {
      const k = ease.outBack(prog(t, ...T.card)), o = popOut(t, T.out)
      drawCard(x, K.img.talk5, 500, lerp(1400, 860, k) + 6 * Math.sin(t * 2), 170 * o, lerp(0.5, 0.05, k))
    }
    sparkles(x, t, 500, 860, T.card[1], 12, 140, 2, [GOLD, PINK, BONE])
  },
  heads: [
    { text: 'Anchorage, in a | snow *globe.*', at: -1, lateAt: -0.6, out: T.h0Out, accentColor: '#ffb070' },
    { text: 'Then: | *a moose.*', at: T.h1, lateAt: T.moose[1] - 0.6, out: T.h1Out, late: 2, accentColor: '#e6d2a8' },
    { text: 'Enter: | *a tissue.*', at: T.h2, lateAt: T.tissue, out: T.h2Out, late: 2, accentColor: ICE },
    { text: 'Find someone who | cries *with* you.', at: T.h3, lateAt: T.h3 + 0.45, out: T.out, late: 2, accentColor: PINK },
  ],
  boxes: [
    { open: 0.8, close: 12.8, lines: [
      { t: 1.0, who: 'lead', text: 'the sun set *so early* and I cried.' },
      { t: 6.3, who: 'lead', text: "he's so *majestic.*" },
      { t: 10.3, who: 'stars', text: "the right one won't mind *the tears.*" },
    ] },
    { open: 15.3, close: 22.4, lines: [
      { t: 15.5, who: 'partner', text: 'here. I brought a *tissue.*' },
      { t: 17.6, who: 'partner', text: '…oh no. the *moose.*' },
      { t: 19.4, who: 'lead', text: 'you cry *too?*' },
    ] },
  ],
  cuts: [T.h1Out[1] - 0.6, { t: T.cut, kind: 'flip' }, T.h2Out[1]],
  music: { style: 'dreamy', key: 'Db', seed: 2626, drop: T.h1, breakdown: [T.cut], lift: [T.together], hits: [T.h3] },
  cues: [
    ['pluck', 0.5, 880, 0.03, 1, 0.3], ['pluck', 2.0, 783.99, 0.03, 1, 0.3],
    ...Array.from({ length: 6 }, (_, i) => ['tom', +(T.moose[0] + i * 0.42).toFixed(2), 110, { gain: 0.1, decay: 0.15 }]), ['bell', T.moose[1], 1318.51, 0.03, 1.2, 0.3],
    ['glitter', T.flake[0] - 1.0, T.flake[0]], ['pop', T.flake[0], 1567.98, 0.04, 0], ['pop', T.starsIn, 739.99, 0.035, 0.4],
    ['whoosh', T.scoIn[0], 0.5, 0.03], ['whoosh', T.tissue, 0.3, 0.03], ['pluck', T.scoCry, 659.25, 0.04, 0.8, 0.3],
    ['bell', T.together, 1760, 0.03, 1.2, 0], ['glitter', T.together, T.together + 0.6],
    ['whoosh', T.card[0], 0.4, 0.04], ['pluck', T.card[1], 1318.51, 0.04, 0.6, 0.2],
  ],
})
