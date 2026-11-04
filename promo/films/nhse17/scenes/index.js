// nhse17: HOLIDAY SURVIVAL GUIDE No. 17, "Their family's tradition" (30 s vertical, star_advice post, music: funk · G).
// The show look lives in ../../nhse13/scenes/survkit.js. Story 0–25.6, then the shared end card.
//   0.0–5.4    hook "Their family has a | *tradition.*" Frame 0: the front door swings open; ♌ Leo on the step, mid-wave; inside, ♎ Libra (the partner), ♋ Cancer, ♉ Taurus (the grandparent, little glasses)
//              and ♓ Pisces all wear matching red pompom hats. Pisces is already crying. SITUATION: "their family does it
//              differently."
//   5.4–9.4    1 "Be curious, not *judgy.*" Leo's thought bubble: a raised eyebrow → crossed out → a question mark.
//              Leo: "ooh. what's the story?"
//   9.4–13.4   2 "Ask how it *started.*" Taurus holds up an old photo: one tiny hat on one tiny star in the snow.
//              "I knitted one for a cold kid. then everyone wanted one." Pisces fountains.
//   13.4–17.4  3 "Join in at *your* level." (card cut) Leo puts on the hat… and its sunglasses. Everyone cheers.
//   17.4–25.6  THE STARS: "odd traditions usually hide *sweet* stories." The family photo: everyone in hats, Leo in
//              hat + shades in the middle, the flash pops; Pisces happy-cries. endHead "Hat on. | *Heart* in."
//              Last line: "Every tradition | has a *story.*"
import { makeSurvival, R, box, drawBits, label, bubble, star, pisces, sparkles, hearts, snow, room, door, windowPane, starFrame, inSprite, lerp, prog, ease, clamp, pop01, outK, INK, BONE, GOLD, RED, PINK, MINT, PAPER, INTER, MONO, SERIF, PANEL, drawPixelStar } from '../../nhse13/scenes/survkit.js'

const P = PANEL
const FLOOR = 1120
const SEEDS = { leo: 5, libra: 10, cancer: 7, taurus: 9, pisces: 6 }

// props seated on a sprite (cell coordinates on the 36-cell star sprite)
function onSprite(x, t, sign, o, fn) {
  const F = starFrame(o.x, o.y, o.s, t, { pop: o.pop ?? 1, hops: o.hops, seed: SEEDS[sign] ?? 1, squash: o.squash ?? 0 })
  inSprite(x, F, fn)
}
const HAT = ['....WW....', '...WWWW...', '...RRRR...', '..RRRRRR..', '.RRRRRRRR.', 'WWWWWWWWWW']
function hat(x, t, sign, o, k = 1) {
  if (k <= 0.01) return
  onSprite(x, t, sign, o, () => {
    x.save(); x.translate(18, 2.5 - (1 - k) * 14); x.scale(1.75, 1.75)
    HAT.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === '.') return; x.fillStyle = INK; x.fillRect(-5 + i - 0.3, -5 + j - 0.3, 1.6, 1.6) }))
    HAT.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === '.') return; x.fillStyle = ch === 'W' ? '#ffffff' : '#d8343e'; x.fillRect(-5 + i, -5 + j, 1, 1) }))
    x.restore()
  })
}
function shades(x, t, sign, o, k = 1, clear = false) {
  if (k <= 0.01) return
  onSprite(x, t, sign, o, () => {
    x.save(); x.translate(0, -(1 - k) * 10)
    x.fillStyle = INK; x.fillRect(8, 14.5, 20, 1.4)
    for (const lx of [8.5, 20]) { x.fillStyle = INK; x.fillRect(lx - 0.6, 14, 8.2, 6.2); x.fillStyle = clear ? 'rgba(200,230,255,0.35)' : '#2a2148'; x.fillRect(lx, 14.6, 7, 5); if (!clear) { x.fillStyle = '#7fd0ff'; x.fillRect(lx + 1, 15.2, 2, 1) } }
    x.restore()
  })
}
function collar(x, t, o) {
  onSprite(x, t, 'leo', o, () => { x.fillStyle = INK; x.fillRect(13.6, 26.6, 8.8, 3.8); x.fillStyle = '#2a2148'; x.fillRect(14, 27, 8, 3); x.fillStyle = GOLD; x.fillRect(17.4, 27.4, 1.2, 1.2) })
}
function leo(x, t, o, { hatK = 0, shadeK = 0 } = {}) { star(x, t, 'leo', o); hat(x, t, 'leo', o, hatK); shades(x, t, 'leo', o, shadeK) }
function fam(x, t, sign, o) { if (sign === 'pisces') pisces(x, t, o); else star(x, t, sign, o); hat(x, t, sign, o); if (sign === 'taurus') shades(x, t, sign, o, 1, true) }

function livingRoom(x, t) {
  room(x, { wall: '#4a2a3a', wall2: 'rgba(255,214,160,0.05)', floor: '#6a4a3a', floorY: FLOOR })
  windowPane(x, 520, 640, 200, 180, t)
  // a garland
  for (let i = 0; i < 18; i++) R(x, i % 2 ? '#2f9a5a' : '#3faa6a', P.x + 20 + i * 52, P.y + 24 + 18 * Math.sin(i * 0.7), 40, 22)
}

function set(x, t, S) {
  if (!S.end) {
    livingRoom(x, t)
    const famO = { cancer: { x: 545, y: 1000, s: 165 }, taurus: { x: 715, y: 1005, s: 165 }, pisces: { x: 880, y: 1035, s: 135, tears: 2, mood: 'wide', look: [-1, 0] }, libra: { x: 380, y: 990, s: 175 } }
    for (const k of ['cancer', 'taurus', 'pisces', 'libra']) fam(x, t, k, { ...famO[k], mood: famO[k].mood ?? 'happy', look: [-1, 0], hops: [0.3, 1.2, 2.1, 3.0, 3.9].map(h => h + (k.length % 3) * 0.1) })
    // the open door frame on the left, Leo on the step
    R(x, '#1a1430', P.x, P.y, 210, P.h)
    door(x, 160, FLOOR, { w: 180, h: 380, col: '#2f7a4a', open: 0.85, light: '#2a2148' })
    leo(x, t, { x: 165, y: 1000, s: 190, mood: t < 2.2 ? 'happy' : 'wide', look: [1, 0], hops: [0.2] })
    bubble(x, t, 600, 600, 0.2, 5.3, 'WELCOME!!', { size: 34, col: '#ffe0e0', tail: -0.1 })
    if (t > 2.2) label(x, '…hats?', 200, 760, { size: 34, col: GOLD, alpha: pop01(t, 2.2, 0.25, 2) * outK(t, [5.0, 5.3]), rot: -0.08 })
    return
  }
  // the ending: the family photo
  const u = S.u
  livingRoom(x, t)
  const row = [['libra', 250, 1000, 170], ['cancer', 400, 990, 170], ['taurus', 690, 990, 170], ['pisces', 840, 1020, 140]]
  for (const [k, X, Y, s] of row) fam(x, t, k, { x: X, y: Y, s, mood: 'happy', look: [0, 0], tears: k === 'pisces' ? 3 : 0, hops: [17.8 + (X % 7) * 0.02, 21.5] })
  leo(x, t, { x: 545, y: 960, s: 210, mood: 'happy', look: [0, 0], hops: [17.9, 21.5] }, { hatK: 1, shadeK: 1 })
  // the camera flash
  const fl = prog(u, 1.6, 1.9)
  if (fl > 0 && fl < 1) { x.save(); x.globalAlpha = 0.7 * (1 - fl); R(x, '#ffffff', P.x, P.y, P.w, P.h); x.restore() }
  if (u > 1.6) label(x, 'SAY "HATS"!', 540, 600, { size: 40, col: GOLD, alpha: pop01(u, 1.6, 0.25, 2) })
  sparkles(x, t, 540, 820, 19.0, 12, 200, 1)
}

// ── step 1: curious, not judgy
function step1(x, t, S) {
  const u = S.u
  livingRoom(x, t)
  leo(x, t, { x: 330, y: 990, s: 230, mood: u < 1.6 ? 'squint' : 'sparkle', look: [1, -1], hops: [S.t0 + 1.6] })
  fam(x, t, 'libra', { x: 760, y: 990, s: 200, mood: 'happy', look: [-1, 0] })
  // the thought bubble: raised eyebrow → crossed out → "?"
  const k = pop01(u, 0.2, 0.3, 2)
  x.save(); x.translate(560, 640); x.scale(k, k)
  for (const [dx, dy, r] of [[-170, 150, 10], [-140, 115, 16]]) { x.fillStyle = INK; x.beginPath(); x.arc(dx, dy, r + 5, 0, Math.PI * 2); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(dx, dy, r, 0, Math.PI * 2); x.fill() }
  box(x, -120, -90, 240, 170, BONE, { b: 6 })
  if (u < 1.3) { drawBits(x, ['....KKKK', '..KK....', 'KK......', '........', '.KKK..KKK', '.KWK..KWK', '.KKK..KKK'], { K: INK, W: '#ffffff' }, 0, -4, 12, { outline: null }) }
  else { const q = pop01(u, 1.3, 0.3, 2.4); drawBits(x, ['.QQQ.', 'Q...Q', '...Q.', '..Q..', '.....', '..Q..'], { Q: '#2f8f86' }, 0, -4, 18 * q, { outline: null }) }
  const xp = prog(u, 0.8, 1.1)
  if (xp > 0 && u < 1.3) { x.strokeStyle = RED; x.lineWidth = 12; x.beginPath(); x.moveTo(-90, -60); x.lineTo(-90 + 180 * xp, -60 + 120 * xp); x.stroke() }
  x.restore()
  bubble(x, t, 330, 780, S.t0 + 1.7, S.t1, "ooh. what's the story?", { size: 32, tail: 0.1 })
}

// ── step 2: ask how it started
function step2(x, t, S) {
  const u = S.u
  livingRoom(x, t)
  const tauO = { x: 300, y: 1000, s: 210, mood: 'happy', look: [1, -1], hops: [S.t0 + 0.4] }
  fam(x, t, 'taurus', tauO)
  leo(x, t, { x: 760, y: 1000, s: 200, mood: u > 2 ? 'heart' : 'wide', look: [-1, -1], hops: [S.t0 + 2] })
  pisces(x, t, { x: 900, y: 760, s: 110, tears: 3, mood: 'wide', look: [-1, 0] })
  hat(x, t, 'pisces', { x: 900, y: 760, s: 110 })
  // the old photo
  const k = pop01(u, 0.3, 0.35, 1.8)
  x.save(); x.translate(520, 640); x.rotate(-0.06); x.scale(k, k)
  box(x, -150, -120, 300, 240, '#f4ead0', { b: 6 })
  R(x, '#8a7a5a', -128, -100, 256, 170)
  R(x, '#c8b890', -128, 20, 256, 50)
  for (let i = 0; i < 10; i++) R(x, '#efe2c0', -120 + ((i * 53) % 240), -92 + ((i * 37) % 100), 6, 6)
  // the tiny star in the one hat (sepia)
  drawBits(x, ['....WW....', '...RRRR...', '..RRRRRR..', 'WWWWWWWWWW'], { W: '#efe2c0', R: '#8a4a3a' }, 0, -36, 6)
  drawBits(x, ['....S....', '...SSS...', 'SSSSSSSSS', '.SSSSSSS.', '..SSSSS..', '.SS...SS.'], { S: '#d8c08a' }, 0, 6, 10)
  x.font = `italic 600 26px ${SERIF}`; x.fillStyle = '#5a4a3a'; x.textAlign = 'center'; x.fillText('the first hat', 0, 100)
  x.restore()
  bubble(x, t, 470, 870, S.t0 + 1.0, S.t1, 'I knitted one for a cold kid. then everyone wanted one.', { size: 28, col: '#fff1c8', tail: -0.4, maxW: 440 })
}

// ── step 3: join in at your level
function step3(x, t, S) {
  const u = S.u
  livingRoom(x, t)
  const hk = ease.outCubic(prog(u, 0.4, 0.9)), sk = ease.outCubic(prog(u, 1.3, 1.7))
  fam(x, t, 'libra', { x: 230, y: 1010, s: 170, mood: u > 1.8 ? 'heart' : 'happy', look: [1, 0], hops: [S.t0 + 1.9, S.t0 + 2.2] })
  fam(x, t, 'cancer', { x: 850, y: 1010, s: 170, mood: 'happy', look: [-1, 0], hops: [S.t0 + 1.95, S.t0 + 2.25] })
  leo(x, t, { x: 540, y: 960, s: 250, mood: u > 1.7 ? 'happy' : 'neutral', look: [0, 0], hops: [S.t0 + 0.9, S.t0 + 1.75] }, { hatK: hk, shadeK: sk })
  if (u > 1.9) { label(x, 'YAY!', 230, 760, { size: 40 * pop01(u, 1.9, 0.2, 2.6), col: GOLD, rot: -0.1 }); label(x, 'ICONIC.', 850, 760, { size: 38 * pop01(u, 2.1, 0.2, 2.6), col: PINK, rot: 0.1 }) }
  sparkles(x, t, 540, 780, S.t0 + 1.75, 10, 160, 1)
}

const EP = makeSurvival({
  no: 17,
  accent: '#ff9a7a',
  hook: 'Their family has a | *tradition.*',
  situation: 'their family does it differently.',
  guide: 'How to survive: | *their traditions.*',
  endHead: 'Hat on. | *Heart* in.',
  line: 'odd traditions usually hide *sweet* stories.',
  last: 'Every tradition | has a *story.*',
  set,
  steps: [
    { text: 'Be curious, not *judgy.*', draw: step1, cues: [['pop', 0.2, 783.99, 0.035, 0.2], ['tick', 0.8, 0.06], ['whoosh', 0.85, 0.2, 0.03], ['pop', 1.3, 1174.66, 0.04, 0.2], ['pop', 1.7, 880, 0.035, -0.2]] },
    { text: 'Ask how it *started.*', draw: step2, cues: [['whoosh', 0.3, 0.3, 0.03], ['pluck', 0.6, 659.25, 0.035, 0.8, 0], ['pop', 1.0, 783.99, 0.035, -0.2], ['pluck', 2.0, 1174.66, 0.035, 0.6, 0.2]] },
    { text: 'Join in at *your* level.', draw: step3, cues: [['whoosh', 0.4, 0.3, 0.03], ['pop', 0.9, 987.77, 0.04, 0], ['tick', 1.7, 0.07], ['pop', 1.72, 1567.98, 0.04, 0], ['clap', 1.9, { gain: 0.14, pan: -0.3 }], ['clap', 2.1, { gain: 0.14, pan: 0.3 }], ['glitter', 1.75, 2.2]] },
  ],
  cues: [['whoosh', 0.02, 0.4, 0.03], ['pop', 0.25, 1174.66, 0.035, 0.2], ['pluck', 2.2, 523.25, 0.035, 0.5, -0.4], ['tick', 19.0, 0.08], ['pop', 19.02, 2093, 0.03, 0], ['glitter', 19.0, 19.5]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [snow, MONO, MINT, PAPER, hearts, clamp, drawPixelStar]
