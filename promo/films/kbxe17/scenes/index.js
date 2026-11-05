// kbxe17: BEFORE YOU TEXT YOUR EX, Ep 17 (long), "The holiday party test" (65 s, star_advice post, pop · D).
// Series look: ../../kbxe01/bxkit.js (read-only). No end card: the last 0.45 s loop back into frame 0.
//   0.0   frame 0: Gemini mid-spin at a holiday party, tinsel flying, thumb on SEND with "saw your friend lol", STOP
//         mid-drop. Hook "Holiday party. Your ex's *best friend.*"  0.35 STOP + freeze ("they're *by the snacks.*")
//         THE STARS: "three almost-texts tonight. the third one's the real test."
//   CHAPTER 1 · THE SIGHTING (0–17): 1 question "What do I want them to report back?" → Gemini says hi to the friend, kindly.
//   CHAPTER 2 · THE DANCE (17–33): Gemini dances; draft "look at me now" + the video → 1 question "Who is this video for?"
//         → posts it for the friends instead (ICON. / the SPIN).
//   CHAPTER 3 · THE RIDE HOME (33–51): the back seat, city lights; draft "happy holidays. i miss us" → STOP + freeze
//         ("the *real* test.") → the full check: 1 Is this the night talking? 2 Would I be proud of this at noon?
//         3 Who asked me for a "home safe"?
//   CHAPTER 4 · INSTEAD (51–65): "home safe ♡" to the group chat; three hearts back; Pisces cries; Gemini in bed, glowing.
//   62.0  "Home safe. *Heart* safe."
// Pisces cries in every chapter: at the snack table, on the dance floor, in the back seat, in the chat.
import {
  makeBX, chapter, roomParty, roomBedroom, sign, pisces, drawPhone, R, box, bubble, sparkles, label, tag, glowAt, drawBits, HEART, hearts, confetti,
  pop01, outK, prog, ease, clamp, lerp, easeOutBack, INK, BONE, GOLD, INTER, MONO,
} from '../../kbxe01/bxkit.js'

const D = 65
const T = { s1: 0.35, q1: 4.9, i1: 9.6, c2: 17.0, s2: 21.5, q2: 23.8, i2: 28.4, c3: 33.0, s3: 37.0, q3: [40.0, 43.6, 47.2], c4: 51.0, home: 56.5, last: 62.0, land: 63.05 }
const OLD = [{ stamp: 'JUL 4' }, { side: 'L', text: 'i need to focus on me for a while' }, { side: 'R', text: 'i get it. take care' }]
const C = { contact: 'Remy', sub: 'last seen in July', old: OLD }

function tinsel(x, t) { for (let i = 0; i < 10; i++) { const p = ((t + 0.5) * 0.5 + i / 10) % 1; x.save(); x.translate(80 + ((i * 113) % 920), 420 + p * 1300); x.rotate(p * 8 + i); R(x, i % 2 ? GOLD : '#c9c2e8', -30, -4, 60, 8); x.restore() } }
function snacks(x, t) { box(x, 620, 1230, 420, 70, '#8a6442', { b: 6 }); for (let i = 0; i < 4; i++) { box(x, 650 + i * 95, 1190, 70, 40, BONE, { b: 4 }); R(x, ['#ff8f5a', '#9fe6b0', '#ffe27a', '#ff8fb1'][i], 660 + i * 95, 1186, 50, 12) } }
const friendOfEx = (x, t, o) => sign(x, t, 'taurus', { seed: 11, ...o })

// ── chapter 1
function hiScene(x, t) {
  roomParty(x, t); snacks(x, t)
  const u = t - T.i1
  const walk = ease.inOutCubic(prog(u, 0.3, 1.6))
  sign(x, t, 'gemini', { x: lerp(200, 520, walk), y: 1130, s: 240, mood: u < 1.6 ? 'neutral' : 'happy', look: [1, 0], hops: [T.i1 + 0.5, T.i1 + 0.9, T.i1 + 1.3, T.i1 + 2.0, T.i1 + 4.2] })
  friendOfEx(x, t, { x: 820, y: 1100, s: 220, mood: u < 2.4 ? 'neutral' : 'happy', look: [-1, 0], hops: [T.i1 + 2.6, T.i1 + 4.4] })
  tag(x, 'THE EX’S BEST FRIEND', 820, 1270, { size: 20, bg: BONE })
  bubble(x, t, 470, 900, T.i1 + 1.9, T.c2 - 0.1, 'hi! happy holidays. love the sweater!', { size: 28 })
  bubble(x, t, 820, 820, T.i1 + 3.0, T.c2 - 0.1, 'aw, you too! it’s good to see you.', { size: 28, col: '#fff1a8' })
  pisces(x, t, { x: 140, y: 1420, s: 150, tears: 3, mood: 'happy', role: 'AT THE SNACKS' })
}
// ── chapter 2
function dance(x, t) {
  roomParty(x, t)
  const u = t - T.c2
  const beat = Array.from({ length: 12 }, (_, i) => T.c2 + i * 0.4)
  sign(x, t, 'gemini', { x: 540, y: 1150, s: 270, mood: 'happy', hops: beat, squash: 0.05 * Math.sin(t * 15) })
  pisces(x, t, { x: 220, y: 1250, s: 180, tears: 3, mood: 'happy', hops: beat.map(b => b + 0.2) })
  sign(x, t, 'leo', { x: 860, y: 1250, s: 180, mood: 'happy', hops: beat.map(b => b + 0.1), seed: 8 })
  for (let i = 0; i < 8; i++) { const a = t * 2 + i * 0.8; R(x, [PINKC, GOLD, '#7fd0ff'][i % 3], 540 + Math.cos(a) * 420, 760 + Math.sin(a) * 120, 22, 22) }
  if (u > 2.0) { x.save(); x.translate(820, 820); x.rotate(0.15); R(x, INK, -60, -100, 120, 200); R(x, '#2b2350', -52, -92, 104, 184); label(x, '● REC', 0, -60, { size: 20, col: '#ff5a6a' }); x.restore() }
  tag(x, 'THE SPIN', 540, 860, { size: 30, bg: GOLD, k: pop01(t, T.c2 + 1.2, 0.3, 2) * outK(t, [T.c2 + 3.4, T.c2 + 3.7]) })
}
const PINKC = '#ff8fb1'
function postScene(x, t) {
  roomParty(x, t, { a: 0.8 })
  const u = t - T.i2
  const msgs = [{ stamp: 'THE GOOD ONES · 5' }, { side: 'R', text: '[ video: the spin ]' }]
  if (u > 1.0) msgs.push({ side: 'L', text: '♌︎ LEO: ICON.' })
  if (u > 1.5) msgs.push({ side: 'L', text: '♐︎ SAG: the SPIN??' })
  if (u > 2.0) msgs.push({ side: 'L', text: '♓︎ PISCES: i’m crying it’s so good' })
  const k = pop01(t, T.i2 + 0.1, 0.3, 1.6)
  x.save(); x.translate(600, 950); x.scale(0.9 * k, 0.9 * k); x.translate(-600, -950)
  drawPhone(x, t, { cx: 600, cy: 950, contact: 'the good ones', sub: '5 members', clock: '10:52 PM', old: msgs, draft: '' })
  x.restore()
  sign(x, t, 'gemini', { x: 190, y: 1270, s: 220, mood: 'sparkle', look: [1, -0.4], hops: [T.i2 + 1.0, T.i2 + 1.5, T.i2 + 2.0] })
  ;[1.0, 1.5, 2.0].forEach((d, i) => { if (u > d) drawBits(x, HEART, { H: ['#ff5c8a', GOLD, '#7fd0ff'][i] }, 880, 1180 - i * 60 - (u - d) * 30, 7, { alpha: clamp(1 - (u - d) / 3) }) })
}
// ── chapter 3
function car(x, t, a = 1) {
  x.save(); x.globalAlpha *= a
  R(x, '#0b0820', 0, 430, 1080, 1490)
  // city lights streaming past the window
  for (let i = 0; i < 18; i++) { const px = 1180 - ((t * 420 + i * 160) % 1400), py = 640 + ((i * 71) % 300); x.save(); x.globalAlpha = 0.6; R(x, ['#ffd98a', '#ff8fb1', '#7fd0ff'][i % 3], px, py, 60 + (i % 3) * 30, 10); x.restore() }
  box(x, 60, 540, 960, 520, 'rgba(0,0,0,0)', { b: 16 }); R(x, '#1d1640', 0, 1060, 1080, 860); R(x, '#2a2148', 0, 1060, 1080, 30)
  box(x, 40, 1180, 1000, 300, '#3a2d58', { b: 8 })
  x.restore()
}
function rideScene(x, t) {
  car(x, t)
  const u = t - T.c3
  sign(x, t, 'gemini', { x: 320, y: 1090, s: 240, mood: u < 2 ? 'sleepy' : 'neutral', look: [0.6, -0.6], hops: [T.c3 + 2.0] })
  pisces(x, t, { x: 760, y: 1110, s: 200, tears: 3, mood: 'sparkle', look: [-0.5, -0.8], role: 'SHARING THE RIDE' })
  if (u > 1.0) bubble(x, t, 760, 880, T.c3 + 1.0, T.c3 + 3.6, 'the lights are SO pretty (sob)', { size: 28, col: '#c9f2ff' })
  if (u > 2.0) { x.save(); x.translate(450, 1000); x.rotate(-0.2); R(x, INK, -50, -84, 100, 168); R(x, '#2b2350', -42, -76, 84, 152); x.restore() }
}
// ── chapter 4
function homeScene(x, t) {
  const u = t - T.c4
  if (t < T.home) {
    car(x, t, 0.9)
    const msgs = [{ stamp: 'THE GOOD ONES · 5' }, { side: 'R', text: 'home safe ♡' }]
    if (u > 1.4) msgs.push({ side: 'L', text: '♌︎ LEO: ♡' })
    if (u > 1.9) msgs.push({ side: 'L', text: '♐︎ SAG: ♡♡' })
    if (u > 2.4) msgs.push({ side: 'L', text: '♓︎ PISCES: i was SO worried (sob) ♡' })
    const k = pop01(t, T.c4 + 0.1, 0.3, 1.6)
    x.save(); x.translate(600, 950); x.scale(0.9 * k, 0.9 * k); x.translate(-600, -950)
    drawPhone(x, t, { cx: 600, cy: 950, contact: 'the good ones', sub: '5 members', clock: '12:47 AM', old: msgs, draft: u < 0.9 ? 'home safe ♡' : '', typedK: prog(u, 0.2, 0.8), caret: u < 0.9 })
    x.restore()
    if (u > 0.9) sparkles(x, t, 760, 860, T.c4 + 0.9, 10, 120, 1, [GOLD, BONE])
    ;[1.4, 1.9, 2.4].forEach(d => { if (u > d) hearts(x, t, T.c4 + d, 860, 1150, { n: 3 }) })
    sign(x, t, 'gemini', { x: 190, y: 1270, s: 220, mood: u > 1.4 ? 'happy' : 'neutral', look: [1, -0.4], hops: [T.c4 + 1.4, T.c4 + 1.9, T.c4 + 2.4] })
  } else {
    roomBedroom(x, t)
    box(x, 80, 1190, 760, 240, '#4b3d8a', { b: 8 }); box(x, 110, 1130, 200, 90, BONE, { b: 6 })
    sign(x, t, 'gemini', { x: 250, y: 1080, s: 230, mood: 'happy', hops: [T.home + 0.2] })
    box(x, 150, 1150, 640, 110, '#6a58b8', { b: 6 })
    glowAt(x, 250, 1060, 300, '255,214,150', 0.2)
    label(x, 'home. safe. ♡', 640, 900, { size: 44, col: GOLD, font: INTER, weight: 900, k: pop01(t, T.home + 0.4, 0.3, 2) })
    pisces(x, t, { x: 960, y: 1450, s: 150, tears: 3, mood: 'happy', role: 'STILL CRYING (HAPPY)' })
  }
}

const CH = [
  { at: 4.75, out: [T.c2 - 0.3, T.c2 - 0.1], n: 1, title: 'THE SIGHTING' },
  { at: T.c2, out: [T.c3 - 0.3, T.c3 - 0.1], n: 2, title: 'THE DANCE' },
  { at: T.c3, out: [T.c4 - 0.3, T.c4 - 0.1], n: 3, title: 'THE RIDE HOME' },
  { at: T.c4, out: [T.last - 0.3, T.last - 0.1], n: 4, title: 'INSTEAD' },
].map(c => ({ ...c, x: 60, y: 130 }))
const HERO = { x: 175, y: 1250, s: 220, mood0: 'happy', mood: 'wide', look: [1, -0.5] }
const HEADS = { size: 84, top: 270 }
const party = (x, t) => { roomParty(x, t); tinsel(x, t) }

const EP = makeBX({
  id: 'kbxe17', sign: 'gemini', duration: D, T, ending: 'loop',
  hook: { text: 'Holiday party. | Your ex’s *best friend.*', out: [4.6, 4.8], accentColor: GOLD, size: 100 },
  shakes: [{ at: T.s1, len: 0.5, amp: 30 }, { at: T.s2, len: 0.45, amp: 24 }, { at: T.s3, len: 0.6, amp: 34 }],
  recs: [{ at: T.s1 + 0.07, len: 1.25, sub: '10:14 PM · ALMOST-TEXT #1', caption: 'they’re *by the snacks.*' }, { at: T.s3 + 0.07, len: 1.3, sub: '12:40 AM · ALMOST-TEXT #3', caption: 'the *real* test.' }],
  segments: [
    { kind: 'draft', t0: 0, t1: T.q1, stopAt: T.s1, flipAt: 3.5, back: ['1 QUESTION', 'FIRST'], backN: '1', room: (x, t) => { party(x, t); friendOfEx(x, t, { x: 980, y: 1280, s: 130, mood: 'happy', look: [-1, 0] }) }, ...C, clock: '10:14 PM', draft: 'saw your friend lol', hero: HERO },
    { kind: 'check', t0: T.q1, t1: T.i1, room: (x, t) => roomParty(x, t, { a: 0.7 }), hero: { x: 380, y: 1230, s: 250, bx: 540, by: 960 },
      qs: [{ q: 'What do I want them to report back?', a: '…that I look great. oof.', at: T.q1 + 0.2, mood: 'squint', tick: 2.6 }] },
    { kind: 'scene', t0: T.i1, t1: T.c2, draw: hiScene },
    { kind: 'scene', t0: T.c2, t1: T.s2 - 0.5, draw: dance },
    { kind: 'draft', t0: T.s2 - 0.5, t1: T.q2, stopAt: T.s2, flipAt: T.s2 + 1.2, back: ['1 QUESTION', 'FIRST'], backN: '1', room: party, ...C, clock: '10:48 PM', draft: 'look at me now [video]', hero: HERO },
    { kind: 'check', t0: T.q2, t1: T.i2, room: (x, t) => roomParty(x, t, { a: 0.7 }), hero: { x: 380, y: 1230, s: 250, bx: 540, by: 960 },
      qs: [{ q: 'Who is this video for?', a: '…them. and that’s the problem.', at: T.q2 + 0.2, mood: 'neutral', look: [0, 1], tick: 2.6 }] },
    { kind: 'scene', t0: T.i2, t1: T.c3, draw: postScene },
    { kind: 'scene', t0: T.c3, t1: T.s3 - 0.5, draw: rideScene },
    { kind: 'draft', t0: T.s3 - 0.5, t1: T.q3[0] - 0.2, stopAt: T.s3, flipAt: T.s3 + 1.5, room: car, ...C, clock: '12:40 AM', draft: 'happy holidays. i miss us', hero: { ...HERO, mood0: 'sleepy' } },
    { kind: 'check', t0: T.q3[0] - 0.2, t1: T.c4, room: (x, t) => car(x, t, 0.6), hero: { x: 380, y: 1230, s: 250, bx: 540, by: 960 },
      qs: [
        { q: 'Is this the night talking?', a: 'the night. and the tinsel.', at: T.q3[0], mood: 'squint', tick: 2.5 },
        { q: 'Would I be proud of this at noon?', a: 'no. I’d hide under the duvet.', at: T.q3[1], mood: 'wide', look: [0, 1], tick: 2.5 },
        { q: 'Who asked me for a “home safe”?', a: 'my friends! all of them.', at: T.q3[2], mood: 'happy', tick: 2.5 },
      ] },
    { kind: 'scene', t0: T.c4, t1: D + 0.1, draw: homeScene },
  ],
  pis: (x, t) => {
    if (t < T.q1) pisces(x, t, { x: 980, y: 760, s: 140, tears: 2, mood: 'wide', look: [-1, 0.3], role: 'GUEST' })
    else if ((t > T.q1 && t < T.i1) || (t > T.q2 && t < T.i2) || (t > T.q3[0] && t < T.c4)) pisces(x, t, { x: 960, y: 1440, s: 130, tears: 3, mood: 'sparkle', look: [-1, -0.6] })
  },
  heads: [
    { text: 'One question. | Just *one.*', at: T.q1 + 0.05, out: [T.i1 - 0.25, T.i1 - 0.05], ...HEADS },
    { text: 'Gemini said | *hi.* Kindly.', at: T.i1 + 0.05, out: [T.c2 - 0.25, T.c2 - 0.05], ...HEADS },
    { text: 'Then: | *the dance.*', at: T.c2 + 0.3, out: [T.s2 - 0.7, T.s2 - 0.5], ...HEADS },
    { text: 'Who’s the | *audience?*', at: T.q2 + 0.05, out: [T.i2 - 0.25, T.i2 - 0.05], ...HEADS },
    { text: 'Posted for | the *friends.*', at: T.i2 + 0.05, out: [T.c3 - 0.25, T.c3 - 0.05], ...HEADS },
    { text: 'The ride home. | *Uh oh.*', at: T.c3 + 0.3, out: [T.s3 - 0.7, T.s3 - 0.5], ...HEADS },
    { text: 'The real test: | *all three.*', at: T.q3[0] - 0.1, out: [T.c4 - 0.25, T.c4 - 0.05], ...HEADS },
    { text: 'Gemini texted | the *right* chat.', at: T.c4 + 0.1, out: [T.last - 0.25, T.last - 0.05], ...HEADS },
    { text: 'Home safe. | *Heart* safe.', at: T.last, late: 1, lateAt: T.land, size: 100, top: 200, accent: GOLD, wobble: true },
  ],
  boxes: [
    { lines: [{ t: 1.8, speaker: 'THE STARS', text: 'three almost-texts tonight.' }, { t: 3.3, speaker: 'THE STARS', text: 'the third one’s the *real* test.' }], open: 1.65, close: T.q1 - 0.1 },
    { lines: [{ t: T.i1 + 0.3, speaker: 'THE STARS', text: 'be warm *in person.* no report needed.' }], open: T.i1 + 0.15, close: T.c2 - 0.1 },
    { lines: [{ t: T.s2 + 0.7, speaker: 'THE STARS', text: 'great spin. one question.' }], open: T.s2 + 0.55, close: T.q2 - 0.1 },
    { lines: [{ t: T.i2 + 2.6, speaker: 'THE STARS', text: 'share joy with people *in* it.' }], open: T.i2 + 2.45, close: T.c3 - 0.1 },
    { lines: [{ t: T.s3 + 1.5, speaker: 'THE STARS', text: 'midnight + tinsel = *careful.*' }], open: T.s3 + 1.35, close: T.q3[0] - 0.3 },
    { lines: [{ t: T.home + 0.8, speaker: 'THE STARS', text: 'you passed. *all three.*' }], open: T.home + 0.65, close: T.last - 0.1 },
  ],
  kit: CH.map(c => [chapter, c]),
  cues: [
    ['pluck', 0.6, 659.25, 0.03, 0.5, 0.4], ['pluck', 0.74, 587.33, 0.03, 0.5, 0.4],
    ['whoosh', T.i1 + 0.3, 1.2, 0.02], ['pop', T.i1 + 1.9, 987.77, 0.04, -0.2], ['pop', T.i1 + 3.0, 1174.66, 0.04, 0.3],
    ...Array.from({ length: 10 }, (_, i) => ['clap', +(T.c2 + i * 0.4).toFixed(2), { gain: 0.08, pan: (i % 2 ? 0.3 : -0.3) }]),
    ['pop', T.c2 + 1.2, 1318.51, 0.05, 0], ['bell', T.c2 + 2.0, 1760, 0.02, 0.5, 0.4],
    ...[1.0, 1.5, 2.0].map((d, i) => ['pop', +(T.i2 + d).toFixed(2), [987.77, 1174.66, 1318.51][i], 0.045, 0.3]),
    ['pluck', T.i2 + 2.0, 659.25, 0.03, 0.5, 0.4], ['pluck', T.i2 + 2.14, 587.33, 0.03, 0.5, 0.4],
    ['whoosh', T.c3, 1.5, 0.02], ['pluck', T.c3 + 1.0, 659.25, 0.03, 0.5, 0.4], ['pluck', T.c3 + 1.14, 587.33, 0.03, 0.5, 0.4],
    ...Array.from({ length: 7 }, (_, i) => ['tick', +(T.c4 + 0.2 + i * 0.09).toFixed(3), 0.025]),
    ['pop', T.c4 + 0.9, 1318.51, 0.05, 0.2], ...[1.4, 1.9, 2.4].map((d, i) => ['pop', +(T.c4 + d).toFixed(2), [1174.66, 1318.51, 1567.98][i], 0.045, 0.3]),
    ['glitter', T.c4 + 2.4, T.c4 + 3.0], ['bell', T.home + 0.4, 1318.51, 0.025, 1.2, 0],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [confetti, easeOutBack, MONO]
