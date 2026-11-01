// yr2010first: THEN vs NOW, "First kiss nerves in 2010 → 2026" (20 s vertical, STARTALK-THENNOW.md Block F #26,
// music: dreamy · Db). The format's look lives in ./thennow.js (identical in all five Block F films).
//   0–7.0     THEN (2010, old phone video): a ♎ Libra star with side-swept bangs sits on the bed hugging a pillow with
//             a marker face. "ok. be cool." → "so… u come here often?" (the pillow says nothing). Practice hugs tick up:
//             #45, #46, #47 (heart eyes). The door opens: ♓ Pisces, sobbing. The pillow flies. "…it's for my neck."
//             THE STARS: "47 practice hugs. *zero* plans to ask."  Sub: "practising. on *a pillow.*"
//   7.0       card cut; the year sticker flips to 2026.
//   7.0–12.5  NOW (a porch at night, string lights): the same Libra (no bangs) walks a ♑ Capricorn home. "I had fun
//             tonight." The nerves: sweat, a thought bubble of the old pillow, "poof". Then: "can I kiss you?" …silence…
//             "…I was hoping you'd ask." They lean in, a big heart covers the moment (PG). Pisces, in the window,
//             hugging the old pillow, fountains.  Sub: "asking. *out loud.*"
//   12.5–15.6 payoff: THE STARS "same nerves. *braver* move."  Last line: "*Asking* is romantic."
import {
  makeThenNow, drawStarChar, signStar, starFrame, R, speech, hearts, sparkles, drawBits, pisces, pop01, outK, r3, tag,
  bangs, hash, INK, BONE, GOLD, PINK, HEART, MONO, clamp, lerp, prog, ease, easeOutBack,
} from './thennow.js'

const LIB = signStar('libra'), CAP = signStar('capricorn')

// ── props
const PILLOW = [
  '.PPPPPPPPPPPPPPPP.',
  'PPPPPPPPPPPPPPPPPP',
  'PPPPPPPPPPPPPPPPPP',
  'PPPPPKPPPPPPKPPPPP',
  'PPPPPKPPPPPPKPPPPP',
  'PPPPPPPPPPPPPPPPPP',
  'PPPBPKPPPPPPKPBPPP',
  'PPPPPPKKKKKKPPPPPP',
  'PPPPPPPPPPPPPPPPPS',
  'SPPPPPPPPPPPPPPPSS',
  'SSPPPPPPPPPPPPPSSS',
  '.SSSSSSSSSSSSSSSS.',
]
const PILLOW_C = { P: '#f6f1ff', S: '#cdc3ec', K: INK, B: '#ff9db8' }
const pillow = (x, cx, cy, cell, opts) => drawBits(x, PILLOW, PILLOW_C, cx, cy, cell, opts)
const FLIP = ['.KKKKK.', 'KGGGGGK', 'KGLLLGK', 'KGLLLGK', 'KGGGGGK', '.KKKKK.', 'KMMMMMK', 'KMWMWMK', 'KMMMMMK', 'KMWMWMK', '.KKKKK.']

// ── A: 2010, the bedroom
const A = {
  be: 0.95, line: 2.25, sq: [3.65, 4.2, 4.75], door: [5.15, 5.45], pis: 5.3, take: 5.45, toss: [5.5, 6.3], neck: 5.75,
}
function bedroom(x, t) {
  R(x, '#6a4a8c', 0, 0, 880, 650)
  for (let i = 0; i < 12; i++) R(x, '#73529a', i * 80 + 20, 0, 30, 650)                    // striped wallpaper
  R(x, '#3c2a52', 0, 650, 880, 230); for (let i = 0; i < 5; i++) R(x, '#463160', 0, 680 + i * 40, 880, 6)
  R(x, INK, 0, 644, 880, 8)
  // window (night, moon)
  R(x, INK, 640, 70, 210, 230); R(x, '#1d2a5c', 650, 80, 190, 210); R(x, '#f4e6b0', 770, 110, 34, 34); R(x, '#1d2a5c', 784, 104, 26, 26)
  for (let i = 0; i < 5; i++) R(x, '#fff3c8', 668 + hash(i) * 150, 130 + hash(i + 9) * 140, 4, 4)
  R(x, INK, 741, 80, 8, 210); R(x, INK, 650, 181, 190, 8)
  // poster: a big heart and stars (no words)
  R(x, INK, 330, 80, 230, 270); R(x, '#ffcf6b', 338, 88, 214, 254)
  drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#e8457a' }, 445, 200, 22)
  for (const [px, py] of [[370, 120], [520, 300], [512, 116], [372, 304]]) drawBits(x, ['.S.', 'SSS', '.S.'], { S: '#fff' }, px, py, 7)
  // the bed
  R(x, INK, 288, 470, 584, 230); R(x, '#8a5a3a', 296, 478, 568, 214)                        // frame
  R(x, '#d0c4f0', 300, 540, 560, 100); R(x, '#a99ad8', 300, 610, 560, 30)                    // blanket
  for (let i = 0; i < 7; i++) R(x, '#e3d9ff', 320 + i * 80, 560, 36, 36)                     // pattern
  R(x, INK, 288, 380, 26, 320); R(x, '#8a5a3a', 294, 386, 14, 306)                           // headboard post
}
function door(x, t, k) {
  // the door on the left: closed, then swings open (k 0→1) onto a lit hallway
  const w = lerp(180, 34, ease.outCubic(k))
  R(x, INK, 46, 206, w + 8, 448); R(x, '#a4785a', 50, 210, w, 440)
  if (w > 80) { R(x, '#93684b', 70, 240, w - 40, 160); R(x, '#93684b', 70, 440, w - 40, 160); R(x, GOLD, 50 + w - 34, 420, 16, 16) }
}
function sceneA(x, t) {
  bedroom(x, t)
  // ♓ Pisces in the hallway (behind the door), then sobbing at the sweetness
  const dk = prog(t, ...A.door)
  R(x, INK, 40, 200, 200, 452); R(x, '#ffe2a8', 50, 210, 180, 442)
  if (t > A.pis) {
    const pk = pop01(t, A.pis, 0.3, 2)
    pisces(x, t, 140, 470, 180, t > A.neck ? 3 : 2, { mood: t > A.neck ? 'happy' : 'wide', look: [1, 0], pop: pk, hops: [A.neck + 0.1] })
  }
  door(x, t, dk)
  // the flip phone on the bed (era prop)
  drawBits(x, FLIP, { K: INK, G: '#9a9cb0', L: '#9fe6ff', M: '#c7c9d8', W: '#f4f4ff' }, 790, 575, 7, { rot: 0.3, outline: null })
  // the Libra on the bed, hugging the pillow
  const P0 = { x: 560, y: 420, s: 280 }
  const sqk = A.sq.reduce((a, s) => a + (t > s && t < s + 0.35 ? Math.sin(Math.PI * (t - s) / 0.35) : 0), 0)
  let mood = 'neutral', look = [0, 1]
  if (t > A.be - 0.1) mood = 'squint'
  if (t > A.line) { mood = 'happy'; look = [0, 1] }
  if (t > A.sq[0]) mood = 'happy'
  if (t > A.sq[2]) mood = 'heart'
  if (t > A.take) { mood = 'wide'; look = [-1, 0] }
  const hops = [A.be, A.line, A.take]
  const opts = { color: LIB.color, glyph: LIB.glyph, mood, look, hops, seed: 3, squash: -0.12 * sqk, blush: t > A.sq[0] && t < A.take ? 1 : undefined }
  drawStarChar(x, P0.x, P0.y, P0.s, t, opts)
  bangs(x, t, starFrame(P0.x, P0.y, P0.s, t, opts))
  // the pillow: hugged in front, squeezed, then tossed in the air
  const tk = prog(t, ...A.toss)
  if (t < A.toss[0]) pillow(x, P0.x, 610, 13, { sx: 1 - 0.1 * sqk, sy: 1 + 0.06 * sqk, rot: 0.04 * Math.sin(t * 2) })
  else pillow(x, lerp(P0.x, 760, tk), 610 - 420 * Math.sin(Math.PI * Math.min(1, tk * 0.85)) + 120 * tk * tk, 13, { rot: 6 * ease.outCubic(tk) })
  // practice hug counter + hearts on the 47th
  A.sq.forEach((s, i) => tag(x, t, 560, 150 + 0 * i, s, `PRACTICE HUG #${45 + i}`, { size: 34, life: i < 2 ? A.sq[i + 1] - s : A.take - s, col: i === 2 ? '#ff8fb1' : GOLD, rot: -0.03 }))
  if (t > A.sq[2]) hearts(x, t, P0.x, 370, A.sq[2], { n: 5, life: 1.4, cell: 6, spread: 200 })
  sparkles(x, t, P0.x, 470, A.sq[2], 8, 150, 1, [HEART, GOLD, BONE], 22)
  // the lines
  speech(x, t, 600, 222, A.be, 'ok. be cool.', { size: 40, tail: 0, life: 1.15 })
  speech(x, t, 590, 222, A.line, 'so… u come here often?', { size: 36, tail: 0, life: 1.3 })
  speech(x, t, 600, 222, A.neck, '…it’s for my neck.', { size: 38, tail: 0, life: 2 })
}

// ── B: 2026, the porch
const B = {
  enter: [7.2, 7.9], fun: 8.0, nerves: [8.7, 9.55], poof: 9.4, ask: 9.6, yes: 10.75, lean: [11.55, 11.8], kiss: 11.8, after: 12.1,
}
function porch(x, t) {
  R(x, '#121a44', 0, 0, 880, 880)
  for (let i = 0; i < 14; i++) R(x, '#fff3c8', hash(i + 3) * 860, hash(i + 31) * 120, 4, 4)
  R(x, '#3a5480', 0, 130, 880, 520)
  for (let i = 0; i < 13; i++) R(x, '#33496f', 0, 140 + i * 40, 880, 6)                        // siding
  R(x, '#6b4a3a', 0, 650, 880, 230); for (let i = 0; i < 6; i++) R(x, '#5a3d30', 0, 665 + i * 38, 880, 5)   // porch boards
  R(x, INK, 0, 644, 880, 8)
  // door (left), porch light
  R(x, INK, 40, 260, 190, 392); R(x, '#2b6a68', 50, 270, 170, 382); R(x, '#245a58', 70, 300, 130, 150); R(x, GOLD, 194, 470, 14, 14)
  const g = x.createRadialGradient(258, 250, 0, 258, 250, 260); g.addColorStop(0, 'rgba(255,214,140,0.45)'); g.addColorStop(1, 'rgba(255,214,140,0)')
  x.fillStyle = g; x.fillRect(0, 0, 880, 880)
  R(x, INK, 246, 226, 26, 40); R(x, '#ffe7a8', 250, 230, 18, 30)
  // window (right), warm room
  R(x, INK, 610, 220, 230, 250); R(x, '#ffcf8a', 620, 230, 210, 230); R(x, '#ffe2b0', 620, 230, 210, 60)
  // string lights
  x.strokeStyle = INK; x.lineWidth = 3; x.beginPath(); for (let i = 0; i <= 22; i++) { const lx = i * 40, ly = 150 + 22 * Math.sin((i / 22) * Math.PI); i ? x.lineTo(lx, ly) : x.moveTo(lx, ly) } x.stroke()
  for (let i = 0; i < 11; i++) {
    const lx = 20 + i * 80, ly = 160 + 22 * Math.sin(((lx / 40) / 22) * Math.PI)
    x.save(); x.globalAlpha = 0.7 + 0.3 * Math.sin(t * 3 + i * 1.7); R(x, [GOLD, PINK, '#9fe6ff'][i % 3], lx - 7, ly, 14, 16); x.restore()
  }
}
function sceneB(x, t) {
  porch(x, t)
  // ♓ Pisces in the window, hugging the OLD pillow (callback), sobbing harder at every beat
  x.save(); x.beginPath(); x.rect(620, 230, 210, 230); x.clip()
  const tears = t > B.kiss ? 3 : t > B.ask ? 2 : 1
  pisces(x, t, 725, 380, 170, tears, { mood: t > B.kiss ? 'happy' : t > B.ask ? 'wide' : 'sparkle', look: [-1, 1], hops: [B.yes + 0.1, B.kiss + 0.05], squash: t > B.ask && t < B.yes ? 0.1 : 0 })
  pillow(x, 725, 440, 7, { rot: -0.08 })
  x.restore()
  R(x, INK, 721, 230, 8, 230)
  // the two walk in
  const en = ease.outCubic(prog(t, ...B.enter)), ln = ease.inOutCubic(prog(t, ...B.lean))
  const lx = lerp(-150, 330, en) + 34 * ln, cx = lerp(1030, 560, en) - 34 * ln, y = 545
  let lm = 'happy', ll = [1, 0], cm = 'happy', cl = [-1, 0]
  if (t > B.nerves[0]) { lm = 'wide'; ll = [0, 1] }
  if (t > B.ask - 0.05) { lm = 'neutral'; ll = [1, 0] }
  if (t > B.ask + 0.3) { cm = 'wide' }
  if (t > B.yes) { cm = 'happy'; lm = 'sparkle' }
  if (t > B.lean[0]) { lm = 'squint'; cm = 'squint' }
  if (t > B.after) { lm = 'heart'; cm = 'heart' }
  const sq = t > B.kiss && t < B.kiss + 0.3 ? 0.14 * Math.sin(Math.PI * (t - B.kiss) / 0.3) : 0
  const blushL = t > B.nerves[0] ? 1 : undefined
  drawStarChar(x, lx, y, 240, t, { color: LIB.color, glyph: LIB.glyph, mood: lm, look: ll, hops: [B.enter[1], B.ask, B.after + 0.1], seed: 3, squash: sq, blush: blushL, glow: 1.2 })
  drawStarChar(x, cx, y, 240, t, { color: CAP.color, glyph: CAP.glyph, mood: cm, look: cl, hops: [B.enter[1] + 0.1, B.fun, B.yes, B.after + 0.15], seed: 8, squash: sq, blush: t > B.yes ? 1 : undefined, glow: 1.2 })
  // the nerves: sweat drops + a thought bubble with the old pillow → poof
  if (t > B.nerves[0] && t < B.ask) for (let i = 0; i < 3; i++) {
    const ph = ((t - B.nerves[0]) * 1.4 + i / 3) % 1
    drawBits(x, ['.W.', 'WWW', 'WWW', '.W.'], { W: '#9fe6ff' }, lx - 100 + i * 18, 400 + ph * 70, 6, { alpha: 1 - ph })
  }
  const th = pop01(t, B.nerves[0] + 0.15, 0.3, 2.2) * (t < B.poof ? 1 : 0)
  if (th > 0.01) {
    x.save(); x.translate(lx - 40, 255); x.scale(th, th)
    for (const [bx, by, br] of [[60, 130, 10], [36, 104, 15]]) { x.fillStyle = INK; x.beginPath(); x.arc(bx, by, br + 4, 0, 7); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(bx, by, br, 0, 7); x.fill() }
    x.fillStyle = INK; x.beginPath(); x.ellipse(-40, 10, 128, 82, 0, 0, 7); x.fill(); x.fillStyle = BONE; x.beginPath(); x.ellipse(-40, 10, 120, 74, 0, 0, 7); x.fill()
    pillow(x, -40, 10, 7.5, { rot: 0.05 * Math.sin(t * 6) })
    x.restore()
  }
  if (t > B.poof && t < B.poof + 0.5) {
    const p = prog(t, B.poof, B.poof + 0.5)
    for (let i = 0; i < 7; i++) { const a = i * 0.9; drawBits(x, ['.CC.', 'CCCC', '.CC.'], { C: BONE }, lx - 80 + Math.cos(a) * 90 * p, 265 + Math.sin(a) * 60 * p, 9 * (1 - p), { alpha: 1 - p }) }
  }
  // the lines
  speech(x, t, cx + 10, 300, B.fun, 'I had fun tonight.', { size: 36, tail: 1, life: 1.3 })
  speech(x, t, lx + 70, 290, B.ask, 'can I kiss you?', { size: 44, tail: -1, life: 1.05, col: '#fffaf0' })
  speech(x, t, cx - 30, 300, B.yes, '…I was hoping you’d ask.', { size: 34, tail: 1, life: 0.98, col: '#fffaf0' })
  // the moment: a big heart covers it (PG), hearts float
  const hk = pop01(t, B.kiss - 0.04, 0.3, 2.6) * outK(t, [B.after + 0.35, B.after + 0.55])
  if (hk > 0.01) drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: HEART, W: '#ffd1e0' }, (lx + cx) / 2, 470, 34 * hk, { rot: 0.06 * Math.sin(t * 8) })
  if (t > B.kiss) hearts(x, t, (lx + cx) / 2, 380, B.kiss + 0.1, { n: 8, life: 1.7, cell: 7, spread: 300 })
  sparkles(x, t, (lx + cx) / 2, 470, B.kiss, 10, 200, 1, [HEART, GOLD, BONE], 24)
}

const EP = makeThenNow({
  id: 'yr2010first', accent: PINK, thing: 'First kiss nerves', year: '2010',
  A: { draw: sceneA, date: '02·14·2010', sub: 'practising. on *a pillow.*' },
  B: { draw: sceneB, sub: 'asking. *out loud.*' },
  lines: [{ t: 3.0, text: '47 practice hugs. *zero* plans to ask.' }, { t: 8.75, text: 'the nerves? *still here.*' }, { t: 12.5, text: 'same nerves. *braver* move.' }],
  last: '*Asking* is romantic.', late: 2,
  cues: () => [
    ['pop', A.be, 880, 0.035, 0.2], ['pop', A.line, 740, 0.035, 0.2],
    ...A.sq.flatMap((s, i) => [['tom', s, 180 + 30 * i, { gain: 0.12, decay: 0.12 }], ['pop', r3(s + 0.05), [1046.5, 1174.66, 1396.91][i], 0.03, 0]]),
    ['glitter', A.sq[2], A.sq[2] + 0.4], ['whoosh', A.door[0], 0.35, 0.03], ['pop', A.pis + 0.05, 659.25, 0.03, -0.4],
    ['pluck', A.take, 1318.51, 0.035, 0.3, 0], ['whoosh', A.toss[0], 0.4, 0.035], ['pop', A.neck, 587.33, 0.03, 0.2],
    ['whoosh', B.enter[0], 0.45, 0.03], ['pop', B.fun, 880, 0.03, 0.3],
    ['tick', B.nerves[0], 0.03], ['tick', B.nerves[0] + 0.3, 0.03], ['tick', B.nerves[0] + 0.6, 0.03],
    ['pop', B.nerves[0] + 0.2, 1174.66, 0.025, -0.3], ['pop', B.poof, 659.25, 0.03, -0.3], ['whoosh', B.poof, 0.2, 0.02],
    ['pop', B.ask, 987.77, 0.04, -0.2], ['pop', B.yes, 1174.66, 0.04, 0.2],
    ['whoosh', B.lean[0], 0.25, 0.025], ['pluck', B.kiss, 1567.98, 0.045, 0.6, 0], ['bell', B.kiss + 0.05, 2093, 0.03, 1.0, 0], ['glitter', B.kiss, B.kiss + 0.5],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
