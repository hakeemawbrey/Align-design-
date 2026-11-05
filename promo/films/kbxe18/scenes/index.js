// kbxe18: BEFORE YOU TEXT YOUR EX, Ep 18 (long), "Sunday alone, three traps" (70 s, star_advice post, lofi · C).
// Series look: ../../kbxe01/bxkit.js (read-only). No end card: hard cut on the last line.
//   0.0   COLD OPEN (trap 2): Taurus mid-fall off a half-built bookshelf, screws flying, thumb on SEND with "can u help me
//         build the shelf", STOP mid-drop. Hook "Sunday alone. Three traps. *Watch.*"  0.35 STOP + freeze ("trap two. *of
//         three.*")  THE STARS: "let's start at trap one." / "and trap three is the sneaky one."
//   CHAPTER 1 · TRAP 1 · THE BRUNCH (5–21): the calendar still says BRUNCH FOR 2 → draft "still on for brunch? lol" →
//         1 question "Do I want them, or the pancakes?" → Taurus goes solo; Pisces (the server) cries at the syrup.
//   CHAPTER 2 · TRAP 2 · THE BOOKSHELF (21–39): the shelf needs two hands → draft "can u help me build the shelf" → 1 question
//         "Do I need them, or two hands?" → knocks next door; Pisces helps; the shelf stands; Pisces cries at the shelf.
//   CHAPTER 3 · TRAP 3 · THE SHOW (39–57): HARBOR LIGHTS, new season (a made-up show) → draft "did u watch??" → STOP +
//         freeze ("the *sneaky* one.") → the full check: 1 Is this about the show? 2 Would a reply fix the missing?
//         3 Who else is watching?
//   CHAPTER 4 · INSTEAD (57–70): Taurus + Pisces watch the finale on the couch, Pisces sobbing; one plate, one shelf, one
//         happy Taurus.  68.0 "Set the table for one, and *mean* it."
import {
  makeBX, chapter, roomLiving, roomCafe, sign, pisces, R, box, bubble, sparkles, label, tag, glowAt, drawBits, hearts,
  pop01, outK, prog, ease, clamp, lerp, easeOutBack, INK, BONE, GOLD, INTER, MONO,
} from '../../kbxe01/bxkit.js'

const D = 70
const T = { s0: 0.35, c1: 5.0, s1: 9.5, q1: 11.7, i1: 16.0, c2: 21.0, s2: 25.5, q2: 27.7, i2: 32.0, c3: 39.0, s3: 43.5, q3: [46.4, 50.0, 53.6], c4: 57.2, fin: 63.0, last: 68.0, land: 69.05 }
const OLD = [{ stamp: 'MAY 30' }, { side: 'L', text: 'i’ll come get my things sunday' }, { side: 'R', text: 'sure.' }]
const C = { contact: 'Jules', sub: 'last seen in May', old: OLD }

// ── the bookshelf (k = how built, 0…1; wob = wobble)
function shelf(x, cx, by, k, wob = 0) {
  x.save(); x.translate(cx, by); x.rotate(wob)
  const h = 520 * clamp(k)
  R(x, INK, -150, -h - 8, 20, h + 8); R(x, '#a07850', -146, -h, 12, h)
  if (k > 0.5) { R(x, INK, 130, -h - 8, 20, h + 8); R(x, '#a07850', 134, -h, 12, h) }
  for (let i = 0; i < 4; i++) if (k > (i + 1) * 0.22) { R(x, INK, -150, -(i + 1) * 120 - 6, 300, 20); R(x, '#c49a6a', -146, -(i + 1) * 120 - 2, 292, 12) }
  x.restore()
}
function screws(x, t) { for (let i = 0; i < 6; i++) { const p = ((t + 0.4) * 0.8 + i / 6) % 1; R(x, '#c9c2e8', 160 + Math.cos(i * 1.9) * 300 * p, 900 - 400 * p + 700 * p * p, 10, 18) } }
const coldRoom = (x, t) => { roomLiving(x, t); shelf(x, 480, 1440, 0.45, 0.25 * Math.sin(t * 3)); screws(x, t) }

// ── chapter 1: brunch
function cal(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  R(x, INK, -210, -90, 420, 180); R(x, BONE, -204, -84, 408, 168); R(x, '#ff8f5a', -204, -84, 18, 168)
  x.font = `900 40px ${INTER}`; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('BRUNCH FOR 2', -170, -24)
  x.font = `700 24px ${MONO}`; x.fillStyle = '#6a6488'; x.fillText('SUN · 11:00 AM · (repeats)', -170, 30)
  x.restore()
}
function brunchCal(x, t) {
  roomLiving(x, t)
  const u = t - T.c1
  cal(x, 600, 820, easeOutBack(prog(t, T.c1 + 0.3, T.c1 + 0.7), 1.8))
  sign(x, t, 'taurus', { x: 300, y: 1180, s: 250, mood: u < 1.2 ? 'sleepy' : 'wide', look: [1, -0.6], hops: [T.c1 + 1.2] })
  if (u > 1.6) bubble(x, t, 300, 960, T.c1 + 1.6, T.s1 - 0.5, 'oh. it still repeats.', { size: 32 })
}
function pancakes(x, cx, cy, n, t) {
  R(x, INK, cx - 130, cy, 260, 20); R(x, BONE, cx - 124, cy + 2, 248, 14)
  for (let i = 0; i < n; i++) { R(x, INK, cx - 96, cy - 30 - i * 30, 192, 32); R(x, '#e8b060', cx - 90, cy - 26 - i * 30, 180, 24) }
  R(x, '#ffe27a', cx - 30, cy - 50 - n * 30, 60, 22)
}
function brunchSolo(x, t) {
  roomCafe(x, t)
  const u = t - T.i1
  box(x, 140, 1210, 800, 70, '#8a6442', { b: 6 })
  pancakes(x, 520, 1190, 2 + Math.min(4, Math.floor(u * 1.5)), t)
  sign(x, t, 'taurus', { x: 260, y: 1060, s: 240, mood: 'happy', look: [1, 0.3], hops: [T.i1 + 0.8, T.i1 + 1.6, T.i1 + 2.4] })
  pisces(x, t, { x: 800, y: 1040, s: 220, tears: u > 1.8 ? 3 : 2, mood: 'happy', look: [-1, 0.4], role: 'SERVER' })
  if (u > 1.6) { for (let i = 0; i < 6; i++) R(x, '#c47a2a', 640 - i * 4, 980 + i * 26, 10, 26) }
  tag(x, 'TABLE FOR ONE · BEST TABLE', 540, 760, { size: 26, bg: GOLD, k: pop01(t, T.i1 + 1.0, 0.3, 2) })
  bubble(x, t, 800, 820, T.i1 + 2.0, T.c2 - 0.1, 'the syrup pour… (sob)', { size: 28, col: '#c9f2ff' })
}
// ── chapter 2: the bookshelf
function shelfAlone(x, t) {
  roomLiving(x, t)
  const u = t - T.c2
  shelf(x, 560, 1440, 0.25 + 0.3 * prog(u, 0, 2.5), 0.2 * Math.sin(t * 4) * prog(u, 1.5, 2.5))
  sign(x, t, 'taurus', { x: 300, y: 1200, s: 240, mood: u < 2.5 ? 'squint' : 'wide', look: [1, -0.6], hops: [T.c2 + 0.6, T.c2 + 1.2, T.c2 + 1.8, T.c2 + 2.6] })
  tag(x, 'STEP 7: “two people recommended”', 540, 760, { size: 24, bg: BONE, k: pop01(t, T.c2 + 1.6, 0.3, 2) })
}
function shelfTogether(x, t) {
  roomLiving(x, t)
  const u = t - T.i2
  const built = prog(u, 1.4, 4.4)
  shelf(x, 560, 1440, 0.5 + 0.5 * built, built < 1 ? 0.03 * Math.sin(t * 6) : 0)
  sign(x, t, 'taurus', { x: 260, y: 1200, s: 230, mood: 'happy', look: [1, -0.4], hops: [T.i2 + 1.4, T.i2 + 2.2, T.i2 + 3.0, T.i2 + 4.5] })
  const pk = pop01(t, T.i2 + 0.6, 0.35, 2)
  if (u < 1.2) label(x, 'knock knock', 860, 760, { size: 36, col: GOLD, k: pop01(t, T.i2 + 0.1, 0.2, 2) })
  pisces(x, t, { x: 860, y: 1200, s: 230, pop: pk, tears: built >= 1 ? 3 : 1, mood: built >= 1 ? 'happy' : 'sparkle', look: [-1, -0.3], role: 'NEIGHBOUR', hops: [T.i2 + 1.8, T.i2 + 2.6, T.i2 + 3.4] })
  if (built >= 1) { sparkles(x, t, 560, 1100, T.i2 + 4.4, 12, 240, 1, [GOLD, BONE]); bubble(x, t, 860, 950, T.i2 + 4.6, T.c3 - 0.1, 'it STANDS (sob)', { size: 30, col: '#c9f2ff' }) }
}
// ── chapter 3: the show
function tv(x, t, glow = 1) {
  box(x, 300, 600, 480, 300, '#120d26', { b: 10 })
  const g = x.createLinearGradient(0, 610, 0, 890); g.addColorStop(0, '#1c3a6a'); g.addColorStop(1, '#5a3d88')
  x.fillStyle = g; x.fillRect(310, 610, 460, 280)
  for (let i = 0; i < 5; i++) R(x, '#ffd98a', 340 + i * 90, 820 - (i % 2) * 30, 14, 40)
  x.font = `900 40px ${INTER}`; x.fillStyle = '#fff'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('HARBOR LIGHTS', 540, 690)
  x.font = `700 20px ${MONO}`; x.fillStyle = GOLD; x.fillText('NEW SEASON · EP 1', 540, 734)
  glowAt(x, 540, 750, 420, '127,160,255', 0.15 * glow)
}
function showScene(x, t) {
  roomLiving(x, t); tv(x, t)
  const u = t - T.c3
  sign(x, t, 'taurus', { x: 360, y: 1180, s: 240, mood: u < 1.4 ? 'sparkle' : 'wide', look: [0.4, -1], hops: [T.c3 + 1.4] })
  R(x, INK, 560, 1260, 120, 70); R(x, '#ff8f5a', 566, 1266, 108, 58)
  if (u > 1.6) bubble(x, t, 360, 960, T.c3 + 1.6, T.s3 - 0.5, 'we used to watch this together', { size: 30 })
}
function finale(x, t) {
  const u = t - T.c4
  roomLiving(x, t)
  if (t < T.fin) {
    tv(x, t)
    label(x, 'FINALE', 540, 640, { size: 28, col: '#ff5a6a', k: 1 })
    sign(x, t, 'taurus', { x: 380, y: 1180, s: 230, mood: u > 2.4 ? 'sparkle' : 'happy', look: [0.5, -1], tears: u > 2.4 ? 1 : 0, hops: [T.c4 + 2.4] })
    pisces(x, t, { x: 700, y: 1180, s: 230, tears: 3, mood: 'sparkle', look: [-0.3, -1], role: 'NEXT DOOR', hops: [T.c4 + 1.2, T.c4 + 2.4, T.c4 + 3.6] })
    R(x, INK, 500, 1270, 100, 60); R(x, '#ff8f5a', 506, 1276, 88, 48)
    bubble(x, t, 700, 950, T.c4 + 1.2, T.c4 + 3.4, 'THEY KISSED?? (sobbing)', { size: 28, col: '#c9f2ff' })
    bubble(x, t, 380, 950, T.c4 + 3.6, T.fin - 0.1, 'more fun with a crier, honestly', { size: 28 })
  } else {
    // one plate, one shelf, one happy Taurus
    shelf(x, 840, 1440, 1, 0)
    box(x, 160, 1150, 420, 60, '#8a6442', { b: 6 }); pancakes(x, 370, 1130, 3, t)
    sign(x, t, 'taurus', { x: 370, y: 960, s: 240, mood: 'happy', hops: [T.fin + 0.3, T.fin + 2.5] })
    glowAt(x, 370, 1000, 400, '255,214,150', 0.18)
    ;['ONE PLATE', 'ONE SHELF', 'ONE HAPPY TAURUS'].forEach((s, i) => tag(x, s, 540, 640 + i * 70, { size: 26, bg: i === 2 ? GOLD : BONE, k: pop01(t, T.fin + 0.4 + i * 0.45, 0.3, 2) }))
    pisces(x, t, { x: 980, y: 760, s: 120, tears: 3, mood: 'happy', role: 'WAVING' })
  }
}

const CH = [
  { at: T.c1, out: [T.c2 - 0.3, T.c2 - 0.1], n: 1, title: 'TRAP 1 · THE BRUNCH' },
  { at: T.c2, out: [T.c3 - 0.3, T.c3 - 0.1], n: 2, title: 'TRAP 2 · THE SHELF' },
  { at: T.c3, out: [T.c4 - 0.3, T.c4 - 0.1], n: 3, title: 'TRAP 3 · THE SHOW' },
  { at: T.c4, out: [T.last - 0.3, T.last - 0.1], n: 4, title: 'INSTEAD' },
].map(c => ({ ...c, x: 60, y: 130 }))
const HERO = { x: 175, y: 1250, s: 220, mood0: 'wide', mood: 'wide', look: [1, -0.5] }
const HEADS = { size: 84, top: 270 }
const CHK = { x: 380, y: 1230, s: 250, bx: 540, by: 960 }

const EP = makeBX({
  id: 'kbxe18', sign: 'taurus', duration: D, T, ending: 'cut',
  hook: { text: 'Sunday alone. | Three traps. *Watch.*', out: [4.6, 4.8], accentColor: '#9fe6b0', size: 104 },
  shakes: [{ at: T.s0, len: 0.5, amp: 30 }, { at: T.s1, len: 0.45, amp: 24 }, { at: T.s2, len: 0.45, amp: 24 }, { at: T.s3, len: 0.6, amp: 34 }],
  recs: [{ at: T.s0 + 0.07, len: 1.25, sub: 'SUNDAY · 2:10 PM', caption: 'trap two. *of three.*' }, { at: T.s3 + 0.07, len: 1.3, sub: 'SUNDAY · 8:30 PM', caption: 'the *sneaky* one.' }],
  segments: [
    { kind: 'draft', t0: 0, t1: T.c1, stopAt: T.s0, room: coldRoom, ...C, clock: '2:10 PM', draft: 'can u help me build the shelf', hero: { ...HERO, x: 200, y: 1300 },
      extra: (x, t) => { if (t > 4.2) tag(x, '◀ EARLIER: 10 AM', 540, 960, { size: 44, bg: GOLD, k: pop01(t, 4.2, 0.25, 2) }) } },
    { kind: 'scene', t0: T.c1, t1: T.s1 - 0.5, draw: brunchCal },
    { kind: 'draft', t0: T.s1 - 0.5, t1: T.q1, stopAt: T.s1, flipAt: T.s1 + 1.3, back: ['1 QUESTION', 'FIRST'], backN: '1', room: (x, t) => roomLiving(x, t), ...C, clock: '10:20 AM', draft: 'still on for brunch? lol', hero: HERO },
    { kind: 'check', t0: T.q1, t1: T.i1, room: (x, t) => roomLiving(x, t, { a: 0.7 }), hero: CHK,
      qs: [{ q: 'Do I want them, or the pancakes?', a: 'the pancakes. obviously.', at: T.q1 + 0.2, mood: 'happy', tick: 2.6 }] },
    { kind: 'scene', t0: T.i1, t1: T.c2, draw: brunchSolo },
    { kind: 'scene', t0: T.c2, t1: T.s2 - 0.5, draw: shelfAlone },
    { kind: 'draft', t0: T.s2 - 0.5, t1: T.q2, stopAt: T.s2, flipAt: T.s2 + 1.3, back: ['1 QUESTION', 'FIRST'], backN: '1', room: (x, t) => { roomLiving(x, t); shelf(x, 480, 1440, 0.55, 0.1 * Math.sin(t * 4)) }, ...C, clock: '2:10 PM', draft: 'can u help me build the shelf', hero: HERO },
    { kind: 'check', t0: T.q2, t1: T.i2, room: (x, t) => roomLiving(x, t, { a: 0.7 }), hero: CHK,
      qs: [{ q: 'Do I need them, or two hands?', a: '…two hands. any two hands.', at: T.q2 + 0.2, mood: 'squint', tick: 2.6 }] },
    { kind: 'scene', t0: T.i2, t1: T.c3, draw: shelfTogether },
    { kind: 'scene', t0: T.c3, t1: T.s3 - 0.5, draw: showScene },
    { kind: 'draft', t0: T.s3 - 0.5, t1: T.q3[0] - 0.2, stopAt: T.s3, flipAt: T.s3 + 1.6, room: (x, t) => { roomLiving(x, t); tv(x, t, 0.6) }, ...C, clock: '8:30 PM', draft: 'did u watch?? episode 1!!', hero: HERO },
    { kind: 'check', t0: T.q3[0] - 0.2, t1: T.c4, room: (x, t) => roomLiving(x, t, { a: 0.6 }), hero: CHK,
      qs: [
        { q: 'Is this about the show?', a: '…about who I watched it with.', at: T.q3[0], mood: 'sparkle', tick: 2.5 },
        { q: 'Would a reply fix the missing?', a: 'no. it’d restart it.', at: T.q3[1], mood: 'neutral', look: [0, 1], tick: 2.5 },
        { q: 'Who else is watching tonight?', a: 'PISCES. next door. crying already.', at: T.q3[2], mood: 'happy', tick: 2.5 },
      ] },
    { kind: 'scene', t0: T.c4, t1: D + 0.1, draw: finale },
  ],
  pis: (x, t) => {
    if (t < T.c1) pisces(x, t, { x: 980, y: 760, s: 140, tears: 2, mood: 'wide', look: [-1, 0.3], role: 'NEXT DOOR' })
    else if (t < T.i1 && t > T.c1) pisces(x, t, { x: 980, y: 1440, s: 120, tears: 2, mood: 'sparkle', look: [-1, -0.6], role: 'NEXT DOOR' })
    else if ((t > T.c2 && t < T.i2) || (t > T.c3 && t < T.c4)) pisces(x, t, { x: 980, y: 1440, s: 120, tears: 3, mood: 'sparkle', look: [-1, -0.6], role: 'THROUGH THE WALL' })
  },
  heads: [
    { text: 'The calendar | didn’t *get the memo.*', at: T.c1 + 0.3, out: [T.s1 - 0.7, T.s1 - 0.5], ...HEADS },
    { text: 'Trap one: | *one* question.', at: T.q1 + 0.05, out: [T.i1 - 0.25, T.i1 - 0.05], ...HEADS },
    { text: 'Brunch for one. | *Excellent.*', at: T.i1 + 0.05, out: [T.c2 - 0.25, T.c2 - 0.05], ...HEADS },
    { text: 'The shelf needs | *two* hands.', at: T.c2 + 0.3, out: [T.s2 - 0.7, T.s2 - 0.5], ...HEADS },
    { text: 'Trap two: | *one* question.', at: T.q2 + 0.05, out: [T.i2 - 0.25, T.i2 - 0.05], ...HEADS },
    { text: 'Any two hands | *work.*', at: T.i2 + 0.05, out: [T.c3 - 0.25, T.c3 - 0.05], ...HEADS },
    { text: 'Trap three: | *their* show.', at: T.c3 + 0.3, out: [T.s3 - 0.7, T.s3 - 0.5], ...HEADS },
    { text: 'The sneaky one | gets *all three.*', at: T.q3[0] - 0.1, out: [T.c4 - 0.25, T.c4 - 0.05], ...HEADS },
    { text: 'New watch | *buddy.*', at: T.c4 + 0.1, out: [T.fin - 0.25, T.fin - 0.05], ...HEADS },
    { text: 'Three traps. | *Zero* sends.', at: T.fin + 0.1, out: [T.last - 0.25, T.last - 0.05], ...HEADS },
    { text: 'Set the table for one, | and *mean* it.', at: T.last, late: 2, lateAt: T.land, size: 96, top: 200, accent: GOLD },
  ],
  boxes: [
    { lines: [{ t: 1.8, speaker: 'THE STARS', text: 'trap two already? *start* at one.' }, { t: 3.2, speaker: 'THE STARS', text: 'trap three is the sneaky one.' }], open: 1.65, close: T.c1 - 0.1 },
    { lines: [{ t: T.s1 + 0.7, speaker: 'THE STARS', text: 'a repeat reminder. one question.' }], open: T.s1 + 0.55, close: T.q1 - 0.1 },
    { lines: [{ t: T.i1 + 2.8, speaker: 'THE STARS', text: 'your Sunday is still *yours.*' }], open: T.i1 + 2.65, close: T.c2 - 0.1 },
    { lines: [{ t: T.s2 + 0.7, speaker: 'THE STARS', text: 'a shelf. one question.' }], open: T.s2 + 0.55, close: T.q2 - 0.1 },
    { lines: [{ t: T.s3 + 1.5, speaker: 'THE STARS', text: 'the sneaky one feels *small.*' }], open: T.s3 + 1.35, close: T.q3[0] - 0.3 },
    { lines: [{ t: T.fin + 1.8, speaker: 'THE STARS', text: 'alone isn’t empty. it’s *roomy.*' }], open: T.fin + 1.65, close: T.last - 0.1 },
  ],
  kit: CH.map(c => [chapter, c]),
  cues: [
    ...Array.from({ length: 6 }, (_, i) => ['tick', +(0.2 + i * 0.25).toFixed(2), 0.03]), ['whoosh', 4.2, 0.4, 0.05], ['pop', 4.3, 1174.66, 0.045, 0],
    ['pop', T.c1 + 0.5, 880, 0.045, 0], ['bell', T.c1 + 0.55, 1318.51, 0.02, 0.8, 0], ['pluck', T.c1 + 1.3, 440, 0.03, 0.4, 0],
    ...[0.8, 1.4, 2.0, 2.6].map(d => ['pop', +(T.i1 + d).toFixed(2), 987.77, 0.03, -0.2]), ['pluck', T.i1 + 2.0, 659.25, 0.03, 0.5, 0.4], ['pluck', T.i1 + 2.14, 587.33, 0.03, 0.5, 0.4],
    ...Array.from({ length: 6 }, (_, i) => ['tick', +(T.c2 + 0.4 + i * 0.4).toFixed(2), 0.04]), ['whoosh', T.c2 + 2.4, 0.4, 0.04],
    ['tom', T.i2 + 0.1, 160, { gain: 0.2, decay: 0.12 }], ['tom', T.i2 + 0.25, 160, { gain: 0.2, decay: 0.12 }],
    ...Array.from({ length: 8 }, (_, i) => ['tick', +(T.i2 + 1.4 + i * 0.38).toFixed(2), 0.04]), ['bell', T.i2 + 4.4, 1760, 0.03, 1.2, 0], ['glitter', T.i2 + 4.4, T.i2 + 5.0],
    ['pluck', T.i2 + 4.6, 659.25, 0.035, 0.5, 0.4], ['pluck', T.i2 + 4.74, 587.33, 0.035, 0.5, 0.4],
    ['bell', T.c3 + 0.3, 1174.66, 0.02, 1.2, 0], ['bell', T.c3 + 0.6, 1479.98, 0.02, 1.2, 0],
    ['pluck', T.c4 + 1.2, 659.25, 0.035, 0.5, 0.3], ['pluck', T.c4 + 1.34, 587.33, 0.035, 0.5, 0.3], ['pop', T.c4 + 3.6, 987.77, 0.03, -0.3],
    ...[0.4, 0.85, 1.3].map((d, i) => ['pop', +(T.fin + d).toFixed(2), [987.77, 1174.66, 1567.98][i], 0.045, 0]), ['glitter', T.fin + 1.3, T.fin + 1.8],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [drawBits, hearts, outK, ease, lerp]
