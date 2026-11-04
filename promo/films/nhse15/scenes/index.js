// nhse15: HOLIDAY SURVIVAL GUIDE No. 15, "The gift that missed" (28 s vertical, star_advice post, music: pop · E).
// The show look lives in ../../nhse13/scenes/survkit.js. Story 0–25.6, then the shared 2.4 s short end card.
//   0.0–5.4    hook "They got you a | *duck lamp.*" Frame 0: ♍ Virgo mid-lift, a giant yellow duck-shaped lamp rising
//              out of a gift box; ♐ Sag beaming ("I saw it and thought of YOU!"); Virgo's smile holds… a little too
//              long. ♓ Pisces by the tree, crying because the duck is beautiful. SITUATION: "a gift you don't love."
//   5.4–9.4    1 "Thank the thought *first.*" Virgo hugs Sag: "you thought of me. thank you." Hearts.
//   9.4–13.4   2 "Find the part you *do* love." Click: the duck lights up, the room goes warm gold; Virgo, under it with a
//              book: "…it IS cozy."
//   13.4–17.4  3 "Honest later. *Kind* always." A week on, on the couch. Sag: "be honest. the duck?" Virgo:
//              "love the light. the beak, still deciding." They both crack up.
//   17.4–25.6  THE STARS: "the gift was a guess. the *love* wasn't." The duck glows on the shelf; Virgo reads under it,
//              Sag dozes beside; Pisces happy-cries. endHead "The duck *stays.* | For now."  Last: "Thank the *thought.*"
import { makeSurvival, R, box, drawBits, label, bubble, star, pisces, sparkles, hearts, snow, room, sofa, windowPane, lerp, prog, ease, clamp, pop01, outK, INK, BONE, GOLD, RED, PINK, MINT, PAPER, INTER, PANEL, drawPixelStar } from '../../nhse13/scenes/survkit.js'

const P = PANEL
const FLOOR = 1120
const VIR = 'virgo', SAG = 'sagittarius'

// ── the duck lamp
const DUCK = [
  '.....YYYY.......',
  '....YYYYYY......',
  '....YYKYYYOO....',
  '....YYYYYYOOO...',
  '.....YYYYY......',
  '....YYYYYYY.....',
  '..YYYYYYYYYYY...',
  '.YYYYYYYYYYYYY..',
  'YYYYWWWWWYYYYYY.',
  'YYYYWWWWWYYYYY..',
  '.YYYYYYYYYYYY...',
  '..YYYYYYYYYY....',
  '...BBBBBBBBB....',
  '..BBBBBBBBBBB...',
]
function duck(x, t, cx, cy, cell, on = 0, rot = 0) {
  if (on > 0) {
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, cell * 2, cx, cy, cell * 28)
    g.addColorStop(0, `rgba(255,214,120,${0.45 * on})`); g.addColorStop(1, 'rgba(255,214,120,0)')
    x.fillStyle = g; x.fillRect(cx - cell * 30, cy - cell * 30, cell * 60, cell * 60); x.restore()
  }
  drawBits(x, DUCK, { Y: on > 0.5 ? '#ffe36a' : '#f2cf4a', K: INK, O: '#f39a3a', W: on > 0.5 ? '#fffbe0' : '#e8c24a', B: '#8a5a3a' }, cx, cy, cell, { rot })
}
function tree(x, t, cx, base, s = 1) {
  const tiers = [[0, 150, 120], [-90, 120, 110], [-170, 90, 100]]
  R(x, INK, cx - 20 * s, base - 60 * s, 40 * s, 64 * s); R(x, '#7a4a2a', cx - 14 * s, base - 60 * s, 28 * s, 60 * s)
  for (const [dy, hw, h] of tiers) {
    const y0 = base - 60 * s + dy * s
    x.fillStyle = INK; x.beginPath(); x.moveTo(cx - (hw + 8) * s, y0 + 4); x.lineTo(cx, y0 - (h + 12) * s); x.lineTo(cx + (hw + 8) * s, y0 + 4); x.fill()
    x.fillStyle = '#2f9a5a'; x.beginPath(); x.moveTo(cx - hw * s, y0); x.lineTo(cx, y0 - h * s); x.lineTo(cx + hw * s, y0); x.fill()
  }
  const cols = [GOLD, RED, '#7fd0ff', PINK]
  for (let i = 0; i < 14; i++) { const a = (i * 2.4) % 1, yy = base - 80 * s - (i % 7) * 40 * s, w = (130 - (i % 7) * 16) * s; if (Math.sin(t * 3 + i) > -0.3) R(x, cols[i % 4], cx - w * 0.8 + a * w * 1.6 - 6, yy, 12, 12) }
  drawPixelStar(x, cx, base - 60 * s - 290 * s, 40 * s, 2, GOLD)
}
function livingRoom(x, t, warm = 0) {
  room(x, { wall: '#2b2a58', floor: '#5a4070', floorY: FLOOR })
  windowPane(x, 300, 640, 220, 200, t)
  tree(x, t, 880, FLOOR, 1)
  if (warm > 0) { x.save(); x.globalAlpha = 0.22 * warm; R(x, '#ffb84a', P.x, P.y, P.w, P.h); x.restore() }
}
function giftBox(x, cx, base, lid = 0) {
  box(x, cx - 120, base - 130, 240, 130, '#c8283c', { b: 6 }); R(x, GOLD, cx - 14, base - 130, 28, 130)
  const ly = base - 150 - lid * 220, lr = lid * 0.6
  x.save(); x.translate(cx + lid * 170, ly); x.rotate(lr); box(x, -134, -24, 268, 40, '#e8344e', { b: 6 }); R(x, GOLD, -14, -24, 28, 40); x.restore()
}

function set(x, t, S) {
  if (!S.end) {
    livingRoom(x, t)
    pisces(x, t, { x: 880, y: 1050, s: 130, tears: 2, mood: 'sparkle', look: [-1, -1] })
    giftBox(x, 430, FLOOR + 20, 1)
    // the duck rises out of the box at frame 0 (already mid-lift)
    const lift = ease.outCubic(prog(t, -0.6, 1.2))
    duck(x, t, 430, lerp(900, 760, lift), 14, 0, 0.03 * Math.sin(t * 3))
    star(x, t, VIR, { x: 430, y: 960 - lift * 20, s: 200, mood: t < 2.4 ? 'happy' : 'wide', look: [0, -1], squash: t > 2.4 ? 0.02 * Math.sin(t * 40) : 0 })
    star(x, t, SAG, { x: 720, y: 1000, s: 210, mood: 'sparkle', look: [-1, 0], hops: [0.4, 1.0, 1.6, 3.4] })
    bubble(x, t, 700, 560, 0.3, 5.3, 'it made me think of YOU!', { size: 30, tail: 0.1, maxW: 400 })
    if (t > 2.4) label(x, 'smile… holding…', 300, 1180, { size: 28, col: GOLD, font: INTER, weight: 700, alpha: pop01(t, 2.4, 0.3, 2) * outK(t, [5.0, 5.3]), rot: -0.04 })
    return
  }
  // the ending: the duck glows on the shelf, Virgo reads under it
  livingRoom(x, t, 1)
  box(x, 150, 850, 300, 22, '#8a5a3a', { b: 5 })
  duck(x, t, 300, 770, 9, 1)
  sofa(x, 520, FLOOR + 10, 380, '#5a7aa8')
  star(x, t, VIR, { x: 450, y: 960, s: 190, mood: t > 21.4 ? 'happy' : 'neutral', look: [1, 1], hops: [21.5] })
  // Virgo's book
  box(x, 500, 960, 76, 56, '#2f8f86', { b: 4 }); R(x, PAPER, 536, 962, 4, 52)
  star(x, t, SAG, { x: 660, y: 970, s: 180, mood: 'sleepy', look: [0, 0] })
  pisces(x, t, { x: 880, y: 1050, s: 130, tears: 3, mood: 'happy', look: [-1, -1] })
  hearts(x, t, 18.3, 300, 720, { n: 4, col: GOLD })
}

// ── step 1: thank the thought first
function step1(x, t, S) {
  const u = S.u
  livingRoom(x, t)
  duck(x, t, 230, 1040, 7)
  const hug = ease.inOutCubic(prog(u, 0.5, 1.0))
  star(x, t, VIR, { x: lerp(390, 470, hug), y: 990, s: 220, mood: u > 1.0 ? 'happy' : 'neutral', look: [1, 0], hops: [S.t0 + 0.5] })
  star(x, t, SAG, { x: lerp(720, 630, hug), y: 990, s: 220, mood: u > 1.6 ? 'heart' : 'sparkle', look: [-1, 0], hops: [S.t0 + 0.55, S.t0 + 1.6] })
  bubble(x, t, 430, 620, S.t0 + 0.9, S.t1, 'you thought of me. thank you.', { size: 32, tail: 0.15, maxW: 440 })
  hearts(x, t, S.t0 + 1.6, 560, 820, { n: 6 })
}

// ── step 2: find the part you do love
function step2(x, t, S) {
  const u = S.u
  const on = clamp(prog(u, 0.6, 0.75))
  livingRoom(x, t, on)
  duck(x, t, 300, 770, 11, on)
  // the pull-chain click
  R(x, INK, 380, 700, 4, lerp(70, on ? 70 : 90, prog(u, 0.45, 0.6)))
  star(x, t, VIR, { x: 600, y: 990, s: 220, mood: u < 0.75 ? 'neutral' : u < 1.6 ? 'wide' : 'happy', look: [-1, -1], hops: [S.t0 + 0.8, S.t0 + 2.2] })
  box(x, 650, 980, 76, 56, '#2f8f86', { b: 4 }); R(x, PAPER, 686, 982, 4, 52)
  sparkles(x, t, 300, 770, S.t0 + 0.65, 10, 150, 1, [GOLD, '#fffbe0', BONE])
  label(x, 'CLICK', 430, 640, { size: 38 * pop01(u, 0.6, 0.2, 2.6), col: GOLD, alpha: outK(u, [1.4, 1.6]), rot: 0.1 })
  bubble(x, t, 640, 640, S.t0 + 1.6, S.t1, '…it IS cozy.', { size: 34, col: '#fff1c8', tail: -0.05 })
}

// ── step 3: honest later, kind always
function step3(x, t, S) {
  const u = S.u
  livingRoom(x, t, 0.6)
  duck(x, t, 200, 640, 8, 1)
  label(x, 'ONE WEEK LATER', 760, 520, { size: 28, col: MINT, alpha: pop01(u, 0.1, 0.25, 2) })
  sofa(x, 560, FLOOR + 10, 440, '#5a7aa8')
  const laugh = u > 2.7
  star(x, t, VIR, { x: 460, y: 960, s: 200, mood: laugh ? 'happy' : 'neutral', look: [1, 0], hops: laugh ? [S.t0 + 2.7, S.t0 + 2.95, S.t0 + 3.2] : [] })
  star(x, t, SAG, { x: 680, y: 960, s: 200, mood: laugh ? 'happy' : 'sparkle', look: [-1, 0], hops: laugh ? [S.t0 + 2.75, S.t0 + 3.0, S.t0 + 3.25] : [S.t0 + 0.5] })
  bubble(x, t, 720, 640, S.t0 + 0.4, S.t1, 'be honest. the duck?', { size: 32, tail: -0.1 })
  bubble(x, t, 450, 790, S.t0 + 1.4, S.t1, 'love the light. the beak, still deciding.', { size: 30, col: '#ffd6e4', tail: 0.1, maxW: 420 })
  if (laugh) label(x, 'HA!', 570, 820, { size: 44 * pop01(u, 2.7, 0.2, 2.6), col: GOLD, alpha: outK(u, [3.6, 3.9]) })
}

const EP = makeSurvival({
  no: 15,
  accent: '#ffd36a',
  hook: 'They got you a | *duck lamp.*',
  situation: "a gift you don't love.",
  guide: 'How to survive: | *the gift that missed.*',
  endHead: 'The duck *stays.* | For now.',
  line: "the gift was a guess. the *love* wasn't.",
  last: 'Thank the | *thought.*',
  set,
  steps: [
    { text: 'Thank the thought *first.*', draw: step1, cues: [['whoosh', 0.5, 0.3, 0.03], ['pop', 0.95, 880, 0.035, 0], ['pluck', 1.6, 1174.66, 0.04, 0.5, 0.2], ['glitter', 1.6, 2.0]] },
    { text: 'Find the part you *do* love.', draw: step2, cues: [['tick', 0.6, 0.08], ['pop', 0.62, 1567.98, 0.04, -0.2], ['glitter', 0.65, 1.1], ['bell', 0.7, 1318.51, 0.03, 1.2, 0], ['pop', 1.6, 659.25, 0.035, 0.2]] },
    { text: 'Honest later. *Kind* always.', draw: step3, cues: [['pop', 0.4, 783.99, 0.035, 0.3], ['pop', 1.4, 659.25, 0.035, -0.3], ['pop', 2.7, 1174.66, 0.04, 0], ['pop', 2.95, 1318.51, 0.035, 0], ['pop', 3.2, 1567.98, 0.03, 0]] },
  ],
  cues: [['whoosh', 0.02, 0.5, 0.03], ['pop', 0.35, 987.77, 0.035, 0.3], ['pluck', 2.45, 1318.51, 0.02, 0.3, -0.3], ['tick', 2.6, 0.02], ['tick', 2.8, 0.02], ['tick', 3.0, 0.02]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [snow, RED, PINK]
