// trlittlebite: LITTLE THINGS, "Saving the last bite." (20 s vertical, Star Talk Trends §18.2, music: dreamy · D)
// The format's look lives in ./little.js (identical in all five tr-little films).
//   0–2.9     a café table, one slice of cake, two stars: ♌ Leo and ♒ Aquarius trade bites (nom · nom · nom) until ONE
//             bite is left. Aquarius's phone buzzes: "brb!" and it hops off. The chip starts counting: BRB 0:01.
//   2.9–7.2   Leo alone with the last bite. Rule of three: the bite glows like treasure ("aaah"), Leo leans in,
//             drools… "no." · a waiter's hand reaches for the plate: "it's RESERVED." · Leo plants a tiny toothpick
//             flag in it: YOURS. THE STARS: "the hardest *five minutes* of leo's life."  ♓ Pisces at the next table,
//             crying into a napkin.
//   7.2       card cut (BACK!).
//   7.2–12.2  Aquarius hops back, sees the flag: "for me?" Nom. Heart eyes. Leo's tummy: grrr. Aquarius slides the
//             plate back: one crumb. Leo: "a crumb!!" THE STARS: "love is watching them eat *your* bite."
//   12.2–15.6 the patch shrinks up. Last line: "*Yours*."
import {
  makeLittle, drawStarChar, signStar, R, S, speech, sfx, hearts, sparkles, drawBits, pisces, pop01, outK, r3,
  clamp, lerp, prog, ease, INK, BONE, GOLD, PINK, HEART, CREAM,
} from './little.js'

const LEO = signStar('leo'), AQU = signStar('aquarius')

const A = { bites: [1.0, 1.45, 1.9], buzz: 2.15, brb: 2.25, exit: [2.45, 2.9] }
const B = { glow: [3.2, 4.3], no: 4.2, hand: [4.6, 4.95], res: 4.85, handOut: [5.35, 5.7], flag: 6.0, guard: 6.4 }
const C = { back: [7.25, 7.6], see: 7.85, forme: 8.05, nod: 8.5, eat: 8.95, grr: 10.25, slide: [10.75, 11.1], crumb: 11.2 }

// ── the café
function cafe(x, t) {
  R(x, '#6a3f5e', 0, 0, S, 520)
  for (let i = 0; i < 10; i++) R(x, '#754869', i * 84 + 20, 0, 30, 520)
  R(x, '#4a2a44', 0, 300, S, 14)                                   // dado rail
  // pendant lamp
  R(x, INK, 396, 0, 8, 90); R(x, INK, 330, 86, 140, 50); R(x, '#ffcf7a', 338, 92, 124, 38)
  const g = x.createRadialGradient(400, 160, 10, 400, 260, 420); g.addColorStop(0, 'rgba(255,214,150,0.4)'); g.addColorStop(1, 'rgba(255,214,150,0)')
  x.fillStyle = g; x.fillRect(0, 0, S, S)
  // the next table (background, right) where Pisces sits
  R(x, INK, 610, 330, 180, 16); R(x, '#a2694a', 614, 332, 172, 10); R(x, INK, 692, 344, 16, 120)
  // floor
  R(x, '#3a2340', 0, 520, S, 280)
  for (let i = 0; i < 8; i++) R(x, i % 2 ? '#43294a' : '#3a2340', 0, 540 + i * 34, S, 34)
}
function table(x) {
  R(x, INK, 90, 520, 620, 40); R(x, '#b47a52', 96, 524, 608, 30); R(x, '#c98e63', 96, 524, 608, 8)
  R(x, INK, 120, 556, 560, 250); R(x, '#8a5638', 126, 556, 548, 250)
  for (let i = 0; i < 5; i++) R(x, '#7a4a30', 150 + i * 110, 560, 6, 240)
}
// one bite of cake (sponge + frosting + a strawberry on the last one)
const BITE = ['.FFFFF.', 'FFFFFFF', 'SSSSSSS', 'CCCCCCC', 'SSSSSSS', 'CCCCCCC']
const BITE_TOP = ['..RR...', '.RRRR..', '.RRRR..', '..GG...']
function plate(x, t, n, { glow = 0, flag = 0, crumbAt = -1, px = 400, py = 515 } = {}) {
  R(x, INK, px - 150, py - 8, 300, 24); R(x, CREAM, px - 144, py - 4, 288, 14); R(x, '#d9cdb8', px - 144, py + 8, 288, 4)
  if (glow > 0) {
    const g = x.createRadialGradient(px, py - 40, 4, px, py - 40, 170); g.addColorStop(0, `rgba(255,236,170,${0.75 * glow})`); g.addColorStop(1, 'rgba(255,236,170,0)')
    x.fillStyle = g; x.fillRect(px - 200, py - 240, 400, 300)
    x.fillStyle = `rgba(255,240,200,${0.22 * glow})`; x.fillRect(px - 50, 0, 100, py - 20)
  }
  const cols = { F: '#fff3e4', S: '#f6b6c8', C: '#f7e0a8', R: '#e8364f', G: '#4aa676' }
  for (let i = 0; i < n; i++) {
    const bx = n === 1 ? px : px - 105 + i * 70
    drawBits(x, BITE, cols, bx, py - 42, 9)
    if (i === n - 1) drawBits(x, BITE_TOP, cols, bx + 5, py - 92, 8)
  }
  if (flag > 0.01) {
    // the toothpick flag: YOURS
    x.save(); x.translate(px + 16, py - 90); x.scale(flag, flag); x.rotate(0.08 * Math.sin(t * 3))
    R(x, INK, -3, -110, 7, 112); R(x, '#e6c48c', -1, -108, 3, 108)
    R(x, INK, 2, -112, 118, 52); R(x, '#fffaf0', 6, -108, 110, 44)
    x.font = "800 26px Inter, sans-serif"; x.fillStyle = '#c2185b'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('YOURS', 61, -85)
    x.restore()
  }
  if (crumbAt >= 0 && n === 0) { const k = pop01(t, crumbAt, 0.2, 3); if (k > 0.01) drawBits(x, ['.C.', 'CCC'], cols, px + 30, py - 14, 5 * k) }
}
// the waiter's hand (white glove) reaching down from the top right
const HAND = ['..WW.WW.', '.WWWWWWW', 'WWWWWWWW', 'WWWWWWWW', '.WWWWWW.', '..WWWW..', '..CCCC..', '..CCCC..', '..CCCC..', '..CCCC..', '..CCCC..', '..CCCC..']
function hand(x, k, px, py) {
  if (k <= 0.01) return
  drawBits(x, HAND, { W: '#fffaf0', C: '#2b2a44' }, lerp(px + 170, px + 70, k), lerp(-140, py - 150, k), 13, { rot: Math.PI + 0.35, sx: 1 })
}

function draw(x, t) {
  cafe(x, t)
  const after = t >= 7.2
  // ♓ Pisces at the next table, crying into a napkin
  pisces(x, t, 700, 270, 120, after ? (t > C.eat ? 3 : 2) : t > B.flag ? 3 : 1, { mood: after && t > C.eat ? 'happy' : 'wide', look: [-1, 1], seed: 6 })
  drawBits(x, ['WWWW', 'WWWW', 'WWW.'], { W: '#fffaf0' }, 662, 300, 8, { rot: 0.3 })
  // how many bites are left
  let n = 4
  for (const b of A.bites) if (t > b) n--
  if (t > C.eat) n = 0
  // Leo (left) and Aquarius (right) behind the table
  const lean = !after ? ease.inOutQuad(prog(t, B.glow[0] + 0.2, B.glow[0] + 0.8)) * (1 - ease.outCubic(prog(t, B.no, B.no + 0.2))) : 0
  let lm = 'happy', ll = [1, 1]
  if (t > A.brb) { lm = 'neutral'; ll = [1, 0] }
  if (t > B.glow[0] + 0.2 && t < B.no) { lm = 'sparkle'; ll = [1, 1] }
  if (t > B.no && t < B.hand[0]) { lm = 'squint'; ll = [-1, 0] }
  if (t > B.hand[0] + 0.1 && t < B.handOut[1]) { lm = 'wide'; ll = [1, -1] }
  if (t > B.guard && !after) { lm = 'happy' }
  if (after) { lm = 'happy'; ll = [1, 0] }
  if (after && t > C.eat) lm = 'sparkle'
  if (after && t > C.grr && t < C.crumb) { lm = 'wide'; ll = [0, 1] }
  if (after && t > C.crumb) lm = 'heart'
  const lHops = [...A.bites.filter((_, i) => i !== 1), B.no, B.res, B.res + 0.35, B.flag, B.guard, C.nod, C.crumb, C.crumb + 0.35]
  const lx = lerp(200, 300, lean), ly = lerp(440, 420, lean)
  drawStarChar(x, lx, ly, 250, t, { color: LEO.color, glyph: LEO.glyph, mood: lm, look: ll, hops: lHops, seed: 3, glow: 1.15, blink: lm === 'wide' ? false : undefined })
  // drool
  if (lean > 0.6 && t < B.no) { const d = (t * 1.5) % 1; R(x, '#9fe6ff', lx + 30, ly + 20 + d * 30, 6, 10 + d * 10) }
  // Aquarius: away between exit and back
  const ex = ease.inQuad(prog(t, ...A.exit)), bk = ease.outCubic(prog(t, ...C.back))
  const ax = after ? lerp(920, 610, bk) : lerp(610, 920, ex)
  if (ax < 900) {
    let am = 'happy', al = [-1, 1]
    if (t > A.buzz && t < A.exit[0]) { am = 'wide'; al = [0, 1] }
    if (after) { am = 'neutral'; al = [-1, 1] }
    if (after && t > C.see) { am = 'wide'; al = [-1, 1] }
    if (after && t > C.forme + 0.4) am = 'sparkle'
    if (after && t > C.eat) am = 'heart'
    if (after && t > C.grr) { am = 'wide'; al = [-1, 0] }
    if (after && t > C.slide[0]) { am = 'happy'; al = [-1, 0] }
    const aHops = [A.bites[1], A.buzz, A.exit[0], A.exit[0] + 0.3, C.back[0] + 0.1, C.forme, C.eat, C.eat + 0.4, C.slide[0]]
    drawStarChar(x, ax, 440, 250, t, { color: AQU.color, glyph: AQU.glyph, mood: am, look: al, hops: aHops, seed: 8, glow: 1.15, blink: am === 'wide' ? false : undefined })
  }
  table(x)
  // the plate (slides to Leo with one crumb at the end)
  const sl = ease.inOutCubic(prog(t, ...C.slide))
  const glow = !after ? Math.sin(Math.PI * prog(t, ...B.glow)) : 0
  const fl = !after ? pop01(t, B.flag, 0.3, 2.6) : outK(t, [C.eat - 0.1, C.eat + 0.05])
  plate(x, t, n, { glow, flag: fl, crumbAt: C.slide[0] + 0.1, px: lerp(400, 300, sl) })
  if (glow > 0.3) sfx(x, t, 400, 210, B.glow[0] + 0.3, '✧ aaah ✧', { size: 40, life: 0.8, col: '#fff1c8', rot: 0 })
  // the waiter's hand
  const hk = ease.outCubic(prog(t, ...B.hand)) * (1 - ease.inCubic(prog(t, ...B.handOut)))
  if (!after) hand(x, hk, 400, 515)
  // bites, words
  A.bites.forEach((b, i) => sfx(x, t, i === 1 ? 560 : 260, 300, b, 'nom', { size: 40, life: 0.45, col: BONE, rot: i === 1 ? 0.12 : -0.12 }))
  speech(x, t, 600, 270, A.brb, 'brb!', { size: 36, tail: 0, life: 0.85, col: '#d8f3ff' })
  sfx(x, t, 210, 260, B.no, 'no.', { size: 48, life: 0.6, col: BONE })
  speech(x, t, 260, 270, B.res, "it's RESERVED.", { size: 32, tail: -1, life: 0.95, col: '#ffe7b0' })
  sparkles(x, t, 414, 400, B.flag + 0.1, 8, 90, 1, [GOLD, PINK, BONE], 20)
  speech(x, t, 580, 270, C.forme, 'for me?', { size: 36, tail: 0, life: 1.0, col: '#d8f3ff' })
  sfx(x, t, 520, 330, C.eat, 'nom', { size: 46, life: 0.55, col: BONE, rot: 0.1 })
  if (t > C.eat) hearts(x, t, 590, 300, C.eat + 0.1, { n: 5, life: 1.5, cell: 6, spread: 120 })
  sparkles(x, t, 400, 460, C.eat, 10, 120, 2, [HEART, GOLD, BONE], 22)
  sfx(x, t, 230, 600, C.grr, 'grrr', { size: 44, life: 0.6, col: '#ffcf7a', rot: -0.15 })
  speech(x, t, 250, 260, C.crumb, 'a crumb!!', { size: 36, tail: -1, life: 1.0, col: '#ffe7b0' })
  if (t > C.crumb) hearts(x, t, 120, 360, C.crumb + 0.1, { n: 4, life: 1.3, cell: 6, spread: 100, seed: 4 })
}

const EP = makeLittle({
  id: 'trlittlebite', accent: '#ffcf7a',
  tag: 'Saving *the last bite.*',
  draw,
  clock: [{ at: A.exit[0] + 0.1, text: 'BRB 0:01' }, { at: 3.9, text: 'BRB 1:40' }, { at: 5.2, text: 'BRB 3:12' }, { at: 6.4, text: 'BRB 4:55' }, { at: 7.25, text: 'BACK!' }],
  lines: [{ t: 3.35, text: "the hardest *five minutes* of leo's life." }, { t: 9.35, text: 'love is watching them eat *your* bite.' }],
  last: '*Yours*.',
  cues: () => [
    ...A.bites.map((b, i) => ['pop', b, [880, 1046.5, 987.77][i], 0.04, i === 1 ? 0.3 : -0.3]),
    ...[0, 0.07, 0.14].map(d => ['tom', r3(A.buzz + d), 70, { gain: 0.1, decay: 0.05 }]),
    ['pop', A.brb, 1174.66, 0.035, 0.3], ['whoosh', A.exit[0], 0.3, 0.03],
    ['riser', B.glow[0], B.glow[0] + 0.6, 0.025], ['bell', B.glow[0] + 0.3, 1760, 0.03, 1.2, 0], ['glitter', B.glow[0] + 0.3, B.glow[0] + 0.8],
    ['tick', B.no, 0.06], ['pop', B.no + 0.02, 523.25, 0.04, -0.3],
    ['whoosh', B.hand[0], 0.3, 0.03], ['pop', B.res, 1318.51, 0.04, -0.3], ['whoosh', B.handOut[0], 0.25, 0.025],
    ['pluck', B.flag, 1567.98, 0.04, 0.5, 0], ['pluck', B.flag + 0.1, 2093, 0.03, 0.5, 0], ['glitter', B.flag, B.flag + 0.4],
    ['whoosh', C.back[0], 0.3, 0.03], ['pop', C.see, 1174.66, 0.03, 0.3], ['pop', C.forme, 1318.51, 0.035, 0.3],
    ['pop', C.eat, 880, 0.045, 0.2], ['pluck', C.eat + 0.15, 1567.98, 0.035, 0.5, 0.2], ['glitter', C.eat, C.eat + 0.4],
    ['tom', C.grr, 90, { gain: 0.18, decay: 0.25 }], ['tom', C.grr + 0.12, 80, { gain: 0.14, decay: 0.25 }],
    ['whoosh', C.slide[0], 0.25, 0.025], ['pop', C.crumb, 1567.98, 0.04, -0.3], ['pop', C.crumb + 0.08, 2093, 0.03, -0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
