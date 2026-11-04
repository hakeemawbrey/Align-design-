// nhse19: HOLIDAY SURVIVAL GUIDE No. 19, "The gift you didn't see coming" (28 s vertical, star_advice post, music:
// chiptune · A). The show look lives in ../../nhse13/scenes/survkit.js. Story 0–25.6, then the shared 2.4 s short end card.
//   0.0–5.4    hook "They got you a gift. | *You* got them nothing." Frame 0: ♊ Gemini holding out a wrapped box with a
//              big bow; ♎ Libra frozen mid-reach, eyes wide, its other "hand" (an empty speech bubble "…") behind it.
//              ♓ Pisces on the armchair, crying at the bow. SITUATION: "a gift, and nothing to give back."
//   5.4–9.4    1 "Say thank you. *Full stop.*" A bubble starts "sorry, I didn't get you any—" and a giant pixel full stop
//              stamps on it. Libra: "thank you. truly." Gemini beams.
//   9.4–13.4   2 "Don't panic-buy a *candle.*" Libra mid-dash for the door, past a shelf of LAST-MINUTE
//              candles (unlit); a red X; Libra stops and sits back down.
//   13.4–17.4  3 "Give back later, from the *heart.*" JANUARY: Libra hands over a handwritten card: "pancakes
//              + a long walk? my treat." Gemini's heart eyes; Pisces fountains.
//   17.4–25.6  THE STARS: "you owe a *thank you,* not a gift." The couch again: Libra wearing the gift (a striped
//              scarf), relaxed, leaning on Gemini; Pisces happy-cries. endHead "No receipt. | *Just* a hug."
//              Last line: "Just | *receive* it."
import { makeSurvival, R, box, drawBits, label, bubble, star, pisces, sparkles, hearts, snow, room, sofa, windowPane, starFrame, inSprite, lerp, prog, ease, clamp, pop01, outK, INK, BONE, GOLD, RED, PINK, MINT, PAPER, INTER, MONO, SERIF, PANEL, HEART, drawPixelStar } from '../../nhse13/scenes/survkit.js'

const P = PANEL
const FLOOR = 1120
const LIB = 'libra', GEM = 'gemini'

function room19(x, t) {
  room(x, { wall: '#2a3a5a', floor: '#4a3a5a', floorY: FLOOR })
  windowPane(x, 820, 620, 190, 170, t)
}
function present(x, cx, cy, s = 1, rot = 0, open = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -80, -60, 160, 120, '#2f9a5a', { b: 6 }); R(x, GOLD, -12, -60, 24, 120); R(x, GOLD, -80, -12, 160, 24)
  if (open < 0.5) drawBits(x, ['GG...GG', 'GGG.GGG', '.GGGGG.', '..GGG..'], { G: GOLD }, 0, -76, 9)
  x.restore()
}
function armchair(x, cx, base) {
  box(x, cx - 90, base - 210, 180, 120, '#a04a5a', { hi: 'rgba(255,255,255,0.15)' })
  box(x, cx - 120, base - 130, 50, 120, '#a04a5a'); box(x, cx + 70, base - 130, 50, 120, '#a04a5a')
  box(x, cx - 80, base - 100, 160, 70, '#b85a6a')
}
function scarf(x, t, o, k = 1) {
  if (k <= 0.01) return
  const F = starFrame(o.x, o.y, o.s, t, { pop: o.pop ?? 1, hops: o.hops, seed: 10 })
  inSprite(x, F, () => {
    x.save(); x.globalAlpha *= k
    for (let i = 0; i < 16; i++) { x.fillStyle = INK; x.fillRect(10 + i - 0.3, 24.5 - 0.3, 1.6, 3.6); x.fillStyle = i % 4 < 2 ? RED : BONE; x.fillRect(10 + i, 24.5, 1, 3) }
    for (let j = 0; j < 7; j++) { x.fillStyle = INK; x.fillRect(22.7, 27 + j - 0.3, 3.6, 1.6); x.fillStyle = j % 4 < 2 ? RED : BONE; x.fillRect(23, 27 + j, 3, 1) }
    x.restore()
  })
}

function set(x, t, S) {
  if (!S.end) {
    room19(x, t)
    armchair(x, 860, FLOOR + 20)
    pisces(x, t, { x: 860, y: 920, s: 140, tears: 2, mood: 'sparkle', look: [-1, 0] })
    star(x, t, GEM, { x: 600, y: 990, s: 210, mood: 'sparkle', look: [-1, 0], hops: [0.4, 1.4, 2.4] })
    present(x, 470, 900 + 6 * Math.sin(t * 3), 1, -0.08)
    star(x, t, LIB, { x: 260, y: 990, s: 210, mood: 'wide', look: [1, 0], blink: false, squash: 0.015 * Math.sin(t * 40) })
    bubble(x, t, 600, 640, -1, 5.3, 'for you!!', { size: 34, tail: 0.0 })
    if (t > 2.0) bubble(x, t, 230, 720, 2.0, 5.3, '…', { size: 40, col: '#ffd6f4', tail: 0.1 })
    if (t > 3.0) label(x, 'internal screaming', 260, 1180, { size: 26, col: GOLD, font: INTER, weight: 700, alpha: pop01(t, 3.0, 0.3, 2) * outK(t, [5.0, 5.3]), rot: -0.03 })
    return
  }
  room19(x, t)
  armchair(x, 870, FLOOR + 20)
  pisces(x, t, { x: 870, y: 920, s: 140, tears: 3, mood: 'happy', look: [-1, 0] })
  sofa(x, 430, FLOOR + 10, 420, '#5a7aa8')
  const lo = { x: 350, y: 960, s: 200, mood: 'happy', look: [1, 0], hops: [17.9, 21.5] }
  star(x, t, LIB, lo); scarf(x, t, lo, 1)
  star(x, t, GEM, { x: 530, y: 965, s: 200, mood: t > 19 ? 'heart' : 'happy', look: [-1, 0], hops: [18.0, 21.55] })
  // the open box on the floor
  present(x, 640, 1110, 0.7, 0.1, 1)
  hearts(x, t, 18.6, 440, 840, { n: 5 })
}

// ── step 1: thank you. full stop.
function step1(x, t, S) {
  const u = S.u
  room19(x, t)
  present(x, 440, 900, 1, -0.05)
  star(x, t, LIB, { x: 260, y: 990, s: 220, mood: u > 1.8 ? 'happy' : 'wide', look: [1, -1], hops: [S.t0 + 1.8] })
  star(x, t, GEM, { x: 760, y: 990, s: 220, mood: u > 2.2 ? 'heart' : 'happy', look: [-1, 0], hops: [S.t0 + 2.2] })
  // the sorry-spiral bubble, and the full stop that stamps it
  if (u < 1.5) {
    const n = Math.floor(prog(u, 0.2, 1.1) * 30)
    bubble(x, t, 450, 650, S.t0 + 0.2, S.t0 + 1.5, 'sorry, I didn’t get you any—'.slice(0, Math.max(1, n)), { size: 32, col: '#ffd6f4', maxW: 560 })
  }
  const st = prog(u, 1.05, 1.25)
  if (st > 0 && u < 2.2) {
    const yy = lerp(300, 650, ease.inCubic(st))
    drawBits(x, ['.XXXX.', 'XXXXXX', 'XXXXXX', 'XXXXXX', 'XXXXXX', '.XXXX.'], { X: INK }, 640, yy, 20, { outline: GOLD, alpha: outK(u, [1.9, 2.2]) })
    if (u > 1.25 && u < 1.6) label(x, 'FULL STOP.', 640, 520, { size: 44, col: GOLD })
  }
  bubble(x, t, 300, 720, S.t0 + 1.8, S.t1, 'thank you. truly.', { size: 34, col: '#ffd6f4', tail: 0.1 })
  hearts(x, t, S.t0 + 2.2, 760, 860, { n: 5 })
}

// ── step 2: don't panic-buy a candle
function candle(x, cx, base, col) { box(x, cx - 22, base - 70, 44, 70, col, { b: 4, hi: 'rgba(255,255,255,0.3)' }); R(x, INK, cx - 2, base - 84, 4, 14) }
function step2(x, t, S) {
  const u = S.u
  room19(x, t)
  // the shelf of last-minute candles
  box(x, 520, 860, 380, 18, '#8a5a3a', { b: 5 })
  ;['#ff8fb1', '#9fe6b0', '#ffd27a', '#c9a6ff', '#7fd0ff'].forEach((c, i) => candle(x, 560 + i * 72, 858, c))
  label(x, 'LAST-MINUTE CANDLES', 710, 750, { size: 26, col: BONE, font: MONO, weight: 700 })
  const xk = pop01(u, 1.4, 0.25, 2.6)
  if (xk > 0.01) { x.save(); x.translate(710, 820); x.scale(xk, xk); x.strokeStyle = INK; x.lineWidth = 30; x.beginPath(); x.moveTo(-150, -90); x.lineTo(150, 90); x.moveTo(150, -90); x.lineTo(-150, 90); x.stroke(); x.strokeStyle = RED; x.lineWidth = 18; x.stroke(); x.restore() }
  // Libra dashes toward the door… and stops
  const dash = ease.outCubic(prog(u, 0.1, 1.1)), back = ease.inOutCubic(prog(u, 1.9, 2.8))
  const lx = lerp(lerp(240, 600, dash), 300, back)
  star(x, t, LIB, { x: lx, y: 1000, s: 210, mood: u < 1.4 ? 'wide' : u < 1.9 ? 'squint' : 'happy', look: [u < 1.9 ? 1 : -1, 0], squash: u < 1.1 ? -0.08 : 0, hops: [S.t0 + 1.45, S.t0 + 2.9] })
  // the coat, half on
  for (let i = 0; i < 4; i++) if (u > 0.1 && u < 1.2) R(x, 'rgba(239,230,214,0.5)', lx - 160 - i * 40, 940 + i * 16, 60 - i * 10, 8)
  if (u > 2.0) bubble(x, t, 330, 760, S.t0 + 2.0, S.t1, 'okay. breathe.', { size: 32, col: '#ffd6f4', tail: 0 })
}

// ── step 3: give back later, from the heart
function step3(x, t, S) {
  const u = S.u
  R(x, '#1a2440', P.x, P.y, P.w, P.h)
  snow(x, t, { X: P.x, Y: P.y, w: P.w, h: P.h, n: 30, speed: 40, seed: 19 })
  R(x, '#dfe8f6', P.x, FLOOR, P.w, P.y + P.h - FLOOR)
  label(x, 'JANUARY', 540, 500, { size: 36, col: MINT, font: MONO, weight: 700, alpha: pop01(u, 0.05, 0.25, 2) })
  star(x, t, LIB, { x: 280, y: 1010, s: 210, mood: 'happy', look: [1, 0], hops: [S.t0 + 0.4] })
  star(x, t, GEM, { x: 790, y: 1010, s: 210, mood: u > 1.5 ? 'heart' : 'sparkle', look: [-1, 0], hops: [S.t0 + 1.5, S.t0 + 1.8] })
  pisces(x, t, { x: 540, y: 1080, s: 120, tears: u > 1.5 ? 3 : 1, mood: 'wide', look: [0, -1] })
  // the handwritten card
  const k = pop01(u, 0.5, 0.4, 1.8)
  const cx = lerp(380, 540, ease.inOutCubic(prog(u, 0.5, 1.2)))
  x.save(); x.translate(cx, 720); x.rotate(-0.05); x.scale(k, k)
  box(x, -190, -120, 380, 240, PAPER, { b: 7 })
  drawBits(x, HEART, { H: RED }, 150, -86, 4, { outline: null })
  x.font = `italic 600 40px ${SERIF}`; x.fillStyle = '#2c2a7a'; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('pancakes +', 0, -50); x.fillText('a long walk?', 0, 0); x.fillText('my treat.', 0, 50)
  x.restore()
}

const EP = makeSurvival({
  no: 19,
  accent: '#e8a6ff',
  hook: 'They got you a gift. | *You* got them nothing.',
  hookSize: 84,
  situation: 'a gift, and nothing to give back.',
  guide: 'How to survive: | *the surprise gift.*',
  endHead: 'No receipt. | *Just* a hug.',
  line: 'you owe a *thank you,* not a gift.',
  last: 'Just | *receive* it.',
  set,
  steps: [
    { text: 'Say thank you. *Full stop.*', draw: step1, cues: [...Array.from({ length: 9 }, (_, i) => ['tick', +(0.2 + i * 0.1).toFixed(2), 0.012]), ['whoosh', 1.05, 0.2, 0.04], ['tom', 1.25, 110, { gain: 0.25, decay: 0.25 }], ['tick', 1.25, 0.08], ['pop', 1.8, 880, 0.035, -0.2], ['pluck', 2.2, 1174.66, 0.04, 0.5, 0.2]] },
    { text: 'Don’t panic-buy a *candle.*', draw: step2, cues: [['whoosh', 0.1, 0.9, 0.04], ['tick', 1.4, 0.07], ['pop', 1.42, 220, 0.05, 0], ['whoosh', 1.9, 0.8, 0.025], ['pop', 2.0, 659.25, 0.035, -0.2]] },
    { text: 'Give back later, from the *heart.*', draw: step3, cues: [['pop', 0.05, 783.99, 0.035, 0], ['whoosh', 0.5, 0.5, 0.03], ['pluck', 1.5, 1174.66, 0.04, 0.5, 0.3], ['pluck', 1.62, 1567.98, 0.035, 0.5, 0.3], ['glitter', 1.5, 2.0]] },
  ],
  cues: [['pop', 0.4, 987.77, 0.035, 0.2], ['pop', 2.0, 440, 0.035, -0.3], ['pluck', 3.0, 523.25, 0.03, 0.6, -0.3]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, clamp, drawPixelStar]
