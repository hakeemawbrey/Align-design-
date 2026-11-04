// nhse20: HOLIDAY SURVIVAL GUIDE No. 20, "When the day goes sideways" (30 s vertical, star_advice post, music: jazzy · Eb).
// The show look lives in ../../nhse13/scenes/survkit.js. Story 0–25.6, then the shared end card.
//   0.0–5.4    hook "The pie | *collapsed.*" Frame 0: the kitchen; ♋ Cancer frozen mid-presentation, holding a pie dish
//              whose pie has slumped flat; DING-DONG at the door (guests!). ♓ Pisces by the counter, crying at the pie.
//              SITUATION: "the big day isn't going to plan."
//   5.4–9.4    1 "Laugh first. It's a *story* now." ♉ Taurus and ♌ Leo arrive, look, and everyone cracks up; the pie gets
//              a little gold frame: "THE GREAT PIE, THIS YEAR".
//   9.4–13.4   2 "Lower the bar to *together.*" A flag pops into the pie: PIE CRUMBLE. Five spoons dive in.
//   13.4–17.4  3 "Name one thing that went *right.*" (card cut) Taurus: "the company." Leo: "my outfit." Cancer: "you all
//              came." Pisces fountains.
//   17.4–25.6  THE STARS: "perfect was a plan. *together* is the point." Everyone round the table sharing the crumble,
//              spoons up; Pisces happy-cries. endHead "Pie crumble. | *Instant* classic."
//              Last line: "Perfect was | never the *point.*"
import { makeSurvival, R, box, drawBits, label, bubble, star, pisces, sparkles, hearts, snow, room, table, door, windowPane, lerp, prog, ease, clamp, pop01, outK, INK, BONE, GOLD, RED, PINK, MINT, PAPER, INTER, MONO, SERIF, PANEL, drawPixelStar } from '../../nhse13/scenes/survkit.js'

const P = PANEL
const FLOOR = 1120
const CAN = 'cancer', TAU = 'taurus', LEO = 'leo'

function kitchen(x, t) {
  room(x, { wall: '#3a4a5a', wall2: 'rgba(255,255,255,0.03)', floor: '#5a4a4a', floorY: FLOOR })
  // tiles
  for (let j = 0; j < 4; j++) for (let i = 0; i < 12; i++) R(x, (i + j) % 2 ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', P.x + i * 80, 820 + j * 50, 80, 50)
  // the counter on the left
  box(x, P.x + 10, 960, 330, 160, '#8a6a4a', { b: 6 }); R(x, '#c8b090', P.x + 4, 950, 342, 18)
  windowPane(x, 300, 620, 180, 160, t)
}
/** the pie: slump 0 = proud dome, 1 = flat puddle */
function pie(x, cx, cy, s = 1, slump = 1, { flag = 0, spoons = 0, eaten = 0 } = {}) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  // dish
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 10, 132, 40, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#e8dcc4'; x.beginPath(); x.ellipse(0, 6, 124, 34, 0, 0, Math.PI * 2); x.fill()
  // filling + crust
  const h = lerp(70, 8, slump), w = lerp(100, 140, slump)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, w + 6, h + 26, 0, Math.PI, 0); x.fill()
  x.fillStyle = '#d8903a'; x.beginPath(); x.ellipse(0, 0, w, h + 20, 0, Math.PI, 0); x.fill()
  for (let i = 0; i < 6; i++) R(x, '#f2c27a', -w * 0.8 + i * w * 0.3, -h - 8 + Math.abs(i - 2.5) * h * 0.15, 20, 8)
  if (slump > 0.5) {
    // the cave-in: a sunken jagged crater of filling, cracks, crumbs
    x.fillStyle = INK; x.beginPath(); x.moveTo(-96, -6); for (let i = 0; i <= 12; i++) x.lineTo(-96 + i * 16, -14 - (i % 2 ? 12 : 0) + Math.sin(i) * 3); x.lineTo(96, 4); x.lineTo(-96, 4); x.fill()
    x.fillStyle = '#a0283a'; x.beginPath(); x.moveTo(-86, -4); for (let i = 0; i <= 11; i++) x.lineTo(-86 + i * 15.6, -10 - (i % 2 ? 9 : 0)); x.lineTo(86, 2); x.lineTo(-86, 2); x.fill()
    for (let i = 0; i < 7; i++) R(x, '#f2c27a', -120 + i * 40 + (i % 2) * 9, 14 + (i % 3) * 6, 12, 10)
  }
  if (eaten > 0) { x.fillStyle = '#e8dcc4'; x.beginPath(); x.ellipse(-30, -4, 50 * eaten, 14 * eaten, 0, 0, Math.PI * 2); x.fill() }
  x.restore()
  if (flag > 0.01) {
    x.save(); x.translate(cx - 60 * s, cy - 20 * s); x.scale(flag, flag)
    R(x, INK, -3, -150, 6, 150)
    box(x, -214, -154, 210, 64, BONE, { b: 5 })
    x.font = `800 28px ${INTER}`; x.fillStyle = RED; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('PIE CRUMBLE', -109, -122)
    x.restore()
  }
  for (let i = 0; i < spoons; i++) {
    const a = -0.1 + i * 0.32, sx = cx + Math.sin(a) * 120 * s, sy = cy - 40 * s - Math.cos(a) * 30 * s
    x.save(); x.translate(sx, sy); x.rotate(a); R(x, INK, -6, -110, 12, 100); R(x, '#c8d0e0', -3, -108, 6, 96); x.fillStyle = INK; x.beginPath(); x.ellipse(0, -4, 16, 22, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#e8eef8'; x.beginPath(); x.ellipse(0, -4, 12, 18, 0, 0, Math.PI * 2); x.fill(); x.restore()
  }
}

function set(x, t, S) {
  if (!S.end) {
    kitchen(x, t)
    door(x, 880, FLOOR, { w: 170, h: 300, col: '#b8423a' })
    pisces(x, t, { x: 170, y: 880, s: 130, tears: 2, mood: 'wide', look: [1, 0] })
    star(x, t, CAN, { x: 520, y: 930, s: 220, mood: 'wide', look: [0, 1], blink: false })
    // the pie, already slumped, held out in front
    pie(x, 520, 1070 + 4 * Math.sin(t * 8), 1.3, 1)
    label(x, 'pfff…', 720, 990, { size: 34, col: BONE, rot: 0.1, alpha: outK(t, [5.0, 5.3]) })
    for (let i = 0; i < 3; i++) { const p = ((t * 0.5 + i / 3) % 1); x.save(); x.globalAlpha = 0.6 * Math.sin(Math.PI * p); R(x, BONE, 470 + i * 40 + Math.sin(p * 5 + i) * 10, 990 - p * 70, 14, 14); x.restore() }
    const dd = [1.8, 2.4]
    for (const [i, c] of dd.entries()) label(x, i ? 'DONG!' : 'DING!', 860 + i * 50, 660 + i * 50, { size: 40 * pop01(t, c, 0.2, 2.6), col: GOLD, rot: i ? 0.12 : -0.12, alpha: outK(t, [5.0, 5.3]) })
    if (t > 3.0) bubble(x, t, 520, 640, 3.0, 5.3, 'it was a dome. it was a DOME.', { size: 30, col: '#c8ecff', maxW: 460 })
    return
  }
  // the ending: everyone round the table with the crumble
  kitchen(x, t)
  const top = table(x, 600, FLOOR + 20, 560, { cloth: '#c8283c' })
  pie(x, 600, top - 10, 0.85, 1, { spoons: 0, eaten: 0.8 })
  const hop = [17.8, 18.6, 19.4, 21.5]
  star(x, t, TAU, { x: 380, y: top - 110, s: 180, mood: 'happy', look: [1, 0], hops: hop })
  star(x, t, CAN, { x: 600, y: top - 140, s: 190, mood: 'happy', look: [0, 1], hops: hop.map(h => h + 0.1) })
  star(x, t, LEO, { x: 820, y: top - 110, s: 180, mood: 'happy', look: [-1, 0], hops: hop.map(h => h + 0.05) })
  pisces(x, t, { x: 170, y: 880, s: 130, tears: 3, mood: 'happy', look: [1, 0] })
  // spoons up
  for (const [sx, sy, r] of [[470, top - 130, -0.4], [700, top - 150, 0.3], [920, top - 120, 0.5]]) { x.save(); x.translate(sx, sy); x.rotate(r); R(x, INK, -6, -60, 12, 80); R(x, '#c8d0e0', -3, -58, 6, 76); x.fillStyle = INK; x.beginPath(); x.ellipse(0, -64, 16, 22, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#d8903a'; x.beginPath(); x.ellipse(0, -64, 12, 18, 0, 0, Math.PI * 2); x.fill(); x.restore() }
  hearts(x, t, 19.0, 600, 760, { n: 5 })
}

// ── step 1: laugh first
function step1(x, t, S) {
  const u = S.u
  kitchen(x, t)
  const laugh = u > 1.2
  const fk = pop01(u, 2.0, 0.35, 2)
  pie(x, 540, 980, 1.05, 1)
  if (fk > 0.01) {
    x.save(); x.translate(540, 940); x.scale(fk, fk)
    x.strokeStyle = INK; x.lineWidth = 20; x.strokeRect(-190, -150, 380, 250); x.strokeStyle = GOLD; x.lineWidth = 12; x.strokeRect(-190, -150, 380, 250)
    x.restore()
    label(x, 'THE GREAT PIE, THIS YEAR', 540, 1140, { size: 28, col: GOLD, font: MONO, weight: 700, alpha: fk })
  }
  const hops = laugh ? [S.t0 + 1.2, S.t0 + 1.45, S.t0 + 1.7, S.t0 + 1.95] : []
  star(x, t, TAU, { x: 210, y: 780, s: 180, mood: laugh ? 'happy' : 'wide', look: [1, 1], hops })
  star(x, t, CAN, { x: 540, y: 700, s: 190, mood: laugh ? 'happy' : 'neutral', look: [0, 1], hops: hops.map(h => h + 0.05) })
  star(x, t, LEO, { x: 870, y: 780, s: 180, mood: laugh ? 'happy' : 'wide', look: [-1, 1], hops: hops.map(h => h + 0.1) })
  if (laugh) for (const [i, [lx, ly]] of [[210, 600], [540, 520], [870, 600]].entries()) label(x, 'HA!', lx, ly, { size: 40 * pop01(u, 1.2 + i * 0.1, 0.2, 2.6), col: GOLD, rot: (i - 1) * 0.12, alpha: outK(u, [3.6, 3.9]) })
}

// ── step 2: lower the bar to together
function step2(x, t, S) {
  const u = S.u
  kitchen(x, t)
  const n = Math.floor(clamp(prog(u, 1.2, 2.4)) * 5 + (u > 1.2 ? 1 : 0))
  pie(x, 540, 1000, 1.15, 1, { flag: pop01(u, 0.3, 0.35, 2.4), spoons: Math.min(5, n) })
  star(x, t, TAU, { x: 190, y: 1000, s: 170, mood: u > 1.2 ? 'happy' : 'neutral', look: [1, 0], hops: [S.t0 + 1.3] })
  star(x, t, LEO, { x: 890, y: 1000, s: 170, mood: u > 1.2 ? 'sparkle' : 'neutral', look: [-1, 0], hops: [S.t0 + 1.5] })
  pisces(x, t, { x: 890, y: 760, s: 120, tears: 2, mood: 'happy', look: [-1, 1] })
  if (u > 2.5) label(x, 'SPOONS FOR EVERYONE', 540, 600, { size: 32, col: MINT, font: MONO, weight: 700, alpha: pop01(u, 2.5, 0.25, 2) })
}

// ── step 3: name one thing that went right
function step3(x, t, S) {
  const u = S.u
  kitchen(x, t)
  const top = table(x, 540, FLOOR + 20, 640, { cloth: '#c8283c' })
  pie(x, 540, top - 10, 0.8, 1, { spoons: 3, eaten: 0.5 })
  star(x, t, TAU, { x: 220, y: top - 120, s: 180, mood: 'happy', look: [1, 0], hops: [S.t0 + 0.3] })
  star(x, t, LEO, { x: 540, y: top - 150, s: 180, mood: 'sparkle', look: [0, 1], hops: [S.t0 + 1.1] })
  star(x, t, CAN, { x: 860, y: top - 120, s: 180, mood: u > 1.9 ? 'happy' : 'neutral', look: [-1, 0], hops: [S.t0 + 1.9] })
  bubble(x, t, 230, 720, S.t0 + 0.3, S.t1, 'the company.', { size: 30, col: '#ffe9b8', tail: 0 })
  bubble(x, t, 540, 600, S.t0 + 1.1, S.t1, 'my outfit.', { size: 30, col: '#ffd8b0', tail: 0 })
  bubble(x, t, 840, 720, S.t0 + 1.9, S.t1, 'you all came.', { size: 30, col: '#c8ecff', tail: 0 })
  pisces(x, t, { x: 880, y: 520, s: 110, tears: u > 1.9 ? 3 : 2, mood: u > 1.9 ? 'happy' : 'wide', look: [-1, 1] })
}

const EP = makeSurvival({
  no: 20,
  accent: '#ffb86a',
  hook: 'The pie | *collapsed.*',
  situation: "the big day isn't going to plan.",
  guide: 'How to survive: | *a sideways day.*',
  endHead: 'Pie crumble. | *Instant* classic.',
  line: 'perfect was a plan. *together* is the point.',
  last: 'Perfect was | never the *point.*',
  set,
  steps: [
    { text: "Laugh first. It's a *story* now.", draw: step1, cues: [['pop', 1.2, 987.77, 0.04, -0.3], ['pop', 1.3, 1174.66, 0.04, 0], ['pop', 1.4, 1318.51, 0.04, 0.3], ['whoosh', 2.0, 0.3, 0.03], ['bell', 2.2, 1567.98, 0.025, 1.0, 0]] },
    { text: 'Lower the bar to *together.*', draw: step2, cues: [['pop', 0.3, 880, 0.04, 0.2], ['tick', 0.4, 0.06], ...[1.2, 1.44, 1.68, 1.92, 2.16].map((c, i) => ['tick', c, 0.05 + i * 0.004]), ['pop', 2.5, 1174.66, 0.035, 0]] },
    { text: 'Name one thing that went *right.*', draw: step3, cues: [['pop', 0.3, 783.99, 0.035, -0.3], ['pop', 1.1, 987.77, 0.035, 0], ['pop', 1.9, 1174.66, 0.04, 0.3], ['glitter', 1.9, 2.4]] },
  ],
  cues: [['tom', 0.05, 90, { gain: 0.2, decay: 0.3 }], ['bell', 1.8, 1318.51, 0.04, 0.8, 0.5], ['bell', 2.4, 1046.5, 0.04, 1.0, 0.5], ['pop', 3.0, 659.25, 0.03, 0]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [snow, PINK, PAPER, SERIF, sparkles, drawPixelStar]
