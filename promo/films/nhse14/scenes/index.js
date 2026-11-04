// nhse14: HOLIDAY SURVIVAL GUIDE No. 14, "Two families, one day" (30 s vertical, star_advice post, music: jazzy · Bb).
// The show look lives in ../../nhse13/scenes/survkit.js. Story 0–25.6, then the shared end card.
//   0.0–5.4    hook "Two families. | *One* holiday." Frame 0: two front doors side by side in the snow. ♉ Taurus is being
//              waved toward the left door, ♋ Cancer toward the right; both phones buzz (MUM / MUM); the doors call
//              "dinner at 2!" and "dinner at 2!!". ♓ Pisces on the step between them, crying.
//              SITUATION: "two invites. same day."
//   5.4–9.4    1 "Decide as a team *before* you tell anyone." The two at a little table, phones face down, a notepad
//              titled OUR PLAN; they nod at the same time.
//   9.4–13.4   2 "Leave a buffer. No one gets the *rushed* half." A timeline: LUNCH ♉ 12–3 · BUFFER (a walk) · DINNER ♋
//              5–8; the pair strolls along it with a cocoa.
//   13.4–17.4  3 "Trade years: here now, there *next time.*" (card cut) Two cards: THIS YEAR / NEXT YEAR; they swap
//              places with a hop and a high five.
//   17.4–25.6  THE STARS: "you're a *team* first. then a guest." The doors again: the pair walks up to the left door
//              together, dish in hand; the right door has a note "SEE YOU AT 5 ♡". Pisces happy-cries on the step.
//              endHead "Two dinners. | *Zero* sprinting."  Last line: "Decide it *together* first."
import { makeSurvival, R, box, drawBits, label, bubble, star, pisces, sparkles, hearts, snow, door, table, mug, lerp, prog, ease, clamp, pop01, outK, INK, BONE, GOLD, RED, MINT, PAPER, INTER, MONO, SERIF, PANEL, drawPixelStar, richText } from '../../nhse13/scenes/survkit.js'

const P = PANEL
const FLOOR = 1120

function street(x, t) {
  // night sky over the two houses
  R(x, '#121034', P.x, P.y, P.w, FLOOR - P.y)
  for (let i = 0; i < 10; i++) drawPixelStar(x, P.x + 50 + ((i * 113) % (P.w - 100)), P.y + 26 + ((i * 47) % 90), 12, 1, BONE)
  // two facades
  for (const [x0, col, roof] of [[P.x + 10, '#7a4a3a', '#4a2a2a'], [P.x + 490, '#3a5a7a', '#24304a']]) {
    box(x, x0, 600, 450, FLOOR - 600, col, { b: 6 })
    for (let j = 0; j < 9; j++) R(x, 'rgba(0,0,0,0.12)', x0, 620 + j * 56, 450, 4)
    x.fillStyle = INK; x.beginPath(); x.moveTo(x0 - 20, 606); x.lineTo(x0 + 225, 470); x.lineTo(x0 + 470, 606); x.fill()
    x.fillStyle = roof; x.beginPath(); x.moveTo(x0 - 6, 600); x.lineTo(x0 + 225, 482); x.lineTo(x0 + 456, 600); x.fill()
    R(x, '#f4f8ff', x0 + 10, 590, 430, 12)
    // windows, warm
    for (const wx of [x0 + 40, x0 + 330]) { box(x, wx, 660, 80, 90, '#ffd27a', { b: 6 }); R(x, INK, wx + 37, 660, 6, 90); R(x, INK, wx, 702, 80, 6) }
  }
  // snow on the ground
  R(x, '#dfe8f6', P.x, FLOOR, P.w, P.y + P.h - FLOOR); R(x, '#ffffff', P.x, FLOOR, P.w, 10)
  snow(x, t, { X: P.x, Y: P.y, w: P.w, h: P.h, n: 30, speed: 50, seed: 14 })
}
function doors(x, t, { openL = 0, openR = 0, note = 0 } = {}) {
  door(x, 285, FLOOR, { w: 170, h: 300, col: '#2f7a4a', open: openL })
  door(x, 795, FLOOR, { w: 170, h: 300, col: '#b8423a', open: openR })
  // doormats
  box(x, 205, FLOOR + 10, 160, 26, '#a07850', { b: 4 }); box(x, 715, FLOOR + 10, 160, 26, '#a07850', { b: 4 })
  if (note > 0.01) {
    x.save(); x.translate(800, 905); x.rotate(0.06); x.scale(note, note)
    box(x, -78, -50, 156, 100, '#fff6a8', { b: 5 })
    x.font = `800 26px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SEE YOU', 0, -18); x.fillText('AT 5', -12, 18)
    drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: RED }, 46, 18, 4)
    x.restore()
  }
}
function miniPhone(x, t, cx, cy, txt, ring) {
  const sh = ring ? 6 * Math.sin(t * 60) : 0
  x.save(); x.translate(cx + sh, cy); x.rotate(ring ? 0.08 * Math.sin(t * 30) : 0)
  box(x, -40, -66, 80, 132, '#2a2148', { b: 5 }); R(x, '#14102a', -32, -54, 64, 104)
  x.font = `700 20px ${MONO}`; x.fillStyle = '#9fe6b0'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, -20)
  drawBits(x, ['.GGG.', 'G...G', 'G...G'], { G: '#9fe6b0' }, 0, 16, 6, { outline: null })
  x.restore()
  if (ring) for (const d of [-1, 1]) { x.save(); x.globalAlpha = 0.5 + 0.5 * Math.sin(t * 20); R(x, GOLD, cx + d * 60 - 3, cy - 30, 6, 20); R(x, GOLD, cx + d * 74 - 3, cy - 40, 6, 40); x.restore() }
}

const TAU = 'taurus', CAN = 'cancer'
function set(x, t, S) {
  street(x, t)
  if (!S.end) {
    doors(x, t, { openL: 0.35, openR: 0.35 })
    pisces(x, t, { x: 540, y: 1060, s: 120, tears: 2, mood: 'wide', look: [0, -1] })
    star(x, t, TAU, { x: 400, y: 1010, s: 210, mood: 'wide', look: [-1, 0], squash: 0.06 + 0.04 * Math.sin(t * 9) })
    star(x, t, CAN, { x: 680, y: 1010, s: 210, mood: 'wide', look: [1, 0], squash: 0.06 + 0.04 * Math.sin(t * 9 + 1) })
    miniPhone(x, t, 300, 770, 'MUM', true)
    miniPhone(x, t, 780, 770, 'MUM', true)
    bubble(x, t, 260, 560, -1, 5.3, 'dinner at 2!', { size: 32, tail: 0.1 })
    bubble(x, t, 820, 560, 0.8, 5.3, 'dinner at 2!!', { size: 32, col: '#ffd0d0', tail: -0.1 })
    // the pull: little arrows tugging each one toward a door
    for (const [cx, d] of [[330, -1], [750, 1]]) for (let i = 0; i < 3; i++) { const p = ((t * 1.5 + i / 3) % 1); x.save(); x.globalAlpha = Math.sin(Math.PI * p); drawBits(x, d < 0 ? ['..A', '.AA', 'AAA', '.AA', '..A'] : ['A..', 'AA.', 'AAA', 'AA.', 'A..'], { A: GOLD }, cx + d * p * 50, 1010, 6); x.restore() }
    return
  }
  const u = S.u
  doors(x, t, { openL: ease.inOutCubic(prog(u, 2.0, 2.8)) * 0.6, openR: 0, note: pop01(u, 0.6, 0.35, 2) })
  const walk = ease.inOutQuad(prog(u, 0.2, 2.2))
  star(x, t, TAU, { x: lerp(520, 250, walk), y: 1015, s: 190, mood: 'happy', look: [-1, 0], hops: [17.7, 18.1, 18.5, 18.9, 19.3, 21.5] })
  star(x, t, CAN, { x: lerp(660, 390, walk), y: 1015, s: 190, mood: 'happy', look: [-1, 0], hops: [17.8, 18.2, 18.6, 19.0, 19.4, 21.55] })
  // the dish Cancer carries
  const dx = lerp(700, 430, walk)
  box(x, dx - 46, 940, 92, 34, '#e8dcc4', { b: 5 }); R(x, '#c98a4a', dx - 38, 932, 76, 12)
  pisces(x, t, { x: 560, y: 1070, s: 120, tears: 3, mood: 'happy', look: [-1, -1] })
  hearts(x, t, 18.6, 330, 900, { n: 5 })
}

// ── step 1: a team meeting at the kitchen table
function step1(x, t, S) {
  const u = S.u
  R(x, '#2b2350', P.x, P.y, P.w, P.h)
  for (let i = 0; i < 12; i++) R(x, 'rgba(255,255,255,0.04)', P.x + i * 84, P.y, 38, P.h)
  R(x, '#4a3b66', P.x, 1090, P.w, 200)
  const top = table(x, 540, 1170, 620, { cloth: '#2f7a4a' })
  star(x, t, TAU, { x: 330, y: top - 90, s: 210, mood: u > 2.3 ? 'happy' : 'neutral', look: [1, 1], hops: [S.t0 + 2.3, S.t0 + 2.6] })
  star(x, t, CAN, { x: 750, y: top - 90, s: 210, mood: u > 2.3 ? 'happy' : 'neutral', look: [-1, 1], hops: [S.t0 + 2.3, S.t0 + 2.6] })
  // phones face down (still buzzing quietly)
  for (const cx of [380, 700]) { box(x, cx - 40, top - 24, 80, 18, '#2a2148', { b: 4 }); if (Math.sin(t * 20) > 0.6) { R(x, GOLD, cx - 58, top - 30, 6, 12); R(x, GOLD, cx + 52, top - 30, 6, 12) } }
  // the notepad
  const k = pop01(u, 0.3, 0.35, 2)
  x.save(); x.translate(540, 660); x.scale(k, k); x.rotate(-0.04)
  box(x, -170, -150, 340, 300, PAPER, { b: 6 })
  R(x, '#2f8f86', -170, -150, 340, 50)
  x.font = `800 28px ${INTER}`; x.fillStyle = '#ffffff'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('OUR PLAN', 0, -124)
  const lines = ['1. talk to each other', '2. agree', '3. then tell family']
  lines.forEach((l, i) => { const lp = prog(u, 0.8 + i * 0.5, 1.2 + i * 0.5); if (lp <= 0) return; x.save(); x.beginPath(); x.rect(-150, -80 + i * 64, 300 * lp, 60); x.clip(); x.font = `italic 600 30px ${SERIF}`; x.fillStyle = '#2c2a7a'; x.textAlign = 'left'; x.fillText(l, -150, -48 + i * 64); x.restore() })
  x.restore()
  label(x, 'NOD', 330, 860, { size: 30, col: GOLD, alpha: pop01(u, 2.3, 0.2, 2) * outK(u, [3.3, 3.6]), rot: -0.1 })
  label(x, 'NOD', 750, 860, { size: 30, col: GOLD, alpha: pop01(u, 2.3, 0.2, 2) * outK(u, [3.3, 3.6]), rot: 0.1 })
}

// ── step 2: the buffer
function step2(x, t, S) {
  const u = S.u
  R(x, '#1a1840', P.x, P.y, P.w, P.h)
  snow(x, t, { X: P.x, Y: P.y, w: P.w, h: P.h, n: 26, speed: 40, seed: 3 })
  // the timeline
  const y = 700, x0 = 120, x1 = 960
  const segs = [{ a: 0, b: 0.36, col: '#7a4a3a', txt: 'LUNCH ♉︎', sub: '12–3' }, { a: 0.36, b: 0.6, col: '#2f8f86', txt: 'BUFFER', sub: 'a walk' }, { a: 0.6, b: 1, col: '#3a5a7a', txt: 'DINNER ♋︎', sub: '5–8' }]
  segs.forEach((s, i) => {
    const k = pop01(u, 0.2 + i * 0.35, 0.3, 2)
    if (k <= 0.01) return
    const xa = lerp(x0, x1, s.a), xb = lerp(x0, x1, s.b)
    x.save(); x.translate((xa + xb) / 2, y); x.scale(k, k)
    box(x, -(xb - xa) / 2 + 4, -50, xb - xa - 8, 100, s.col, { b: 6, hi: 'rgba(255,255,255,0.2)' })
    x.font = `800 28px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s.txt, 0, -14)
    x.font = `700 22px ${MONO}`; x.fillText(s.sub, 0, 22)
    x.restore()
  })
  // the pair strolls along under the timeline, cocoa in hand
  const p = ease.inOutQuad(prog(u, 1.2, 3.6))
  const cx = lerp(220, 860, p)
  R(x, '#dfe8f6', P.x, 1100, P.w, 200)
  star(x, t, TAU, { x: cx - 90, y: 1000, s: 210, mood: 'happy', look: [1, 0], hops: [S.t0 + 1.3, S.t0 + 1.9, S.t0 + 2.5, S.t0 + 3.1] })
  star(x, t, CAN, { x: cx + 90, y: 1000, s: 210, mood: 'happy', look: [-1, 0], hops: [S.t0 + 1.4, S.t0 + 2.0, S.t0 + 2.6, S.t0 + 3.2] })
  mug(x, cx + 170, 1030, '#e8344e', 1, t)
  // the "you are here" pin moves along the timeline
  drawBits(x, ['.RRR.', 'RRWRR', 'RRRRR', '.RRR.', '..R..'], { R: RED, W: '#ffffff' }, lerp(x0, x1, lerp(0.05, 0.95, p)), y - 90, 9)
}

// ── step 3: trade years
function yearCard(x, cx, cy, title, who, col, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  box(x, -170, -120, 340, 240, PAPER, { b: 7 })
  R(x, col, -170, -120, 340, 60)
  x.font = `800 30px ${INTER}`; x.fillStyle = '#ffffff'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -88)
  x.font = `800 44px ${INTER}`; x.fillStyle = INK; x.fillText(who, 0, 10)
  x.font = `italic 600 30px ${SERIF}`; x.fillStyle = '#2c2a7a'; x.fillText('holiday dinner', 0, 66)
  x.restore()
}
function step3(x, t, S) {
  const u = S.u
  R(x, '#2b2350', P.x, P.y, P.w, P.h)
  for (let i = 0; i < 12; i++) R(x, 'rgba(255,255,255,0.04)', P.x + i * 84, P.y, 38, P.h)
  R(x, '#4a3b66', P.x, 1090, P.w, 200)
  const sw = ease.inOutCubic(prog(u, 1.6, 2.2))
  yearCard(x, lerp(310, 770, sw), 640, 'THIS YEAR', '♉︎ TAURUS’S', '#7a4a3a', pop01(u, 0.2, 0.35, 2), lerp(-0.06, 0.06, sw))
  yearCard(x, lerp(770, 310, sw), 640, 'NEXT YEAR', '♋︎ CANCER’S', '#3a5a7a', pop01(u, 0.5, 0.35, 2), lerp(0.06, -0.06, sw))
  const hi = u > 2.4
  star(x, t, TAU, { x: hi ? 470 : 330, y: 1000, s: 200, mood: hi ? 'happy' : 'neutral', look: [1, 0], hops: [S.t0 + 1.6, S.t0 + 2.4] })
  star(x, t, CAN, { x: hi ? 610 : 750, y: 1000, s: 200, mood: hi ? 'happy' : 'neutral', look: [-1, 0], hops: [S.t0 + 1.65, S.t0 + 2.4] })
  if (hi) { label(x, 'HIGH FIVE!', 540, 850, { size: 40 * pop01(u, 2.45, 0.2, 2.6), col: GOLD, alpha: outK(u, [3.5, 3.8]) }); sparkles(x, t, 540, 900, S.t0 + 2.45, 10, 110, 1) }
}

const EP = makeSurvival({
  no: 14,
  accent: '#ffcf6a',
  hook: 'Two families. | *One* holiday.',
  situation: 'two invites. same day.',
  guide: 'How to survive: | *the double invite.*',
  endHead: 'Two dinners. | *Zero* sprinting.',
  line: "you're a *team* first. then a guest.",
  last: 'Decide it | *together* first.',
  set,
  steps: [
    { text: 'Decide as a team *before* you tell anyone.', draw: step1, cues: [['pop', 0.3, 880, 0.035, 0], ...[0.8, 1.3, 1.8].map(c => ['tick', c, 0.03]), ['pop', 2.3, 659.25, 0.04, -0.3], ['pop', 2.32, 659.25, 0.04, 0.3]] },
    { text: 'Leave a buffer. No one gets the *rushed* half.', draw: step2, cues: [['pop', 0.2, 659.25, 0.035, -0.3], ['pop', 0.55, 783.99, 0.035, 0], ['pop', 0.9, 987.77, 0.035, 0.3], ['riser', 1.2, 3.6, 0.012]] },
    { text: 'Trade years: here now, there *next time.*', draw: step3, cues: [['pop', 0.2, 880, 0.035, -0.3], ['pop', 0.5, 987.77, 0.035, 0.3], ['whoosh', 1.6, 0.6, 0.035], ['clap', 2.45, { gain: 0.16 }], ['glitter', 2.45, 2.9]] },
  ],
  cues: [...[0.4, 1.1, 1.8, 2.5, 3.2, 3.9, 4.6].map(c => ['tick', c, 0.025]), ['pop', 0.8, 523.25, 0.03, 0.4], ['pop', 18.0, 1174.66, 0.035, 0.2], ['whoosh', 19.4, 0.35, 0.025]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [MINT, clamp, richText]
