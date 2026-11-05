// kbxe16: BEFORE YOU TEXT YOUR EX, Ep 16 (long), "One night, three almost-texts" (75 s, star_advice post, dreamy · Ab).
// Series look: ../../kbxe01/bxkit.js (read-only). No end card: hard cut on the last line. Pisces is the texter.
//   0.0   COLD OPEN at 1:30 AM: Pisces mid-sob, phones flying at the lens, thumb on SEND with "i miss you", STOP mid-drop.
//         Hook "Three almost-texts. *Wait* for number three."  0.35 STOP + freeze ("*how* did we get here?")
//         THE STARS: "rewind. 9 p.m."  → ◀◀ REWIND at 4.4
//   5.0   CHAPTER 1 · 9 PM · THE SONG: a song from that summer in the café → draft "this came on and i thought of you" →
//         STOP → 1 question: "Do I want them, or the song?" ("…the song.") → Pisces hums it instead (SAVED TO: MY SONGS)
//   19.0  CHAPTER 2 · 11 PM · THE PHOTO: the picnic photo pops up → draft "remember this?" → STOP → 1 question: "Will this
//         text change the ending?" ("…no.") → into the folder IT WAS GOOD → lights out… eyes snap open: can't sleep
//   37.0  CHAPTER 3 · 1:30 AM · THE BIG ONE: back to the cold open → STOP + freeze ("here we are.") → the full check:
//         1 What do I want from them? 2 Can a text do that? 3 Who can sit with me instead?
//   55.0  CHAPTER 4 · WHAT THEY DID INSTEAD: Pisces calls Cancer; both cry; a list "things I like about my life" (Pisces
//         writes three, Cancer adds three).  72.0 "Cry it out. Don't *send* it out." lands 74.05, hard cut at 75.
import {
  makeBX, chapter, roomBedroom, roomCafe, sign, drawPhone, R, box, bubble, sparkles, label, tag, glowAt, drawBits, drawPixelStar, hearts,
  pop01, outK, prog, ease, clamp, lerp, easeOutBack, INK, BONE, GOLD, INTER, MONO, SERIF,
} from '../../kbxe01/bxkit.js'

const D = 75
const T = { s3a: 0.35, rew: 4.4, c1: 5.0, s1: 9.0, q1: 11.2, i1: 15.4, c2: 19.0, s2: 23.0, q2: 25.2, i2: 29.4, sleep: 33.6, wake: 35.6, c3: 37.0, s3: 40.5, q3: [43.4, 47.3, 51.2], c4: 55.0, list: 62.0, last: 72.0, land: 74.05 }
const OLD = [{ stamp: 'AUG 19' }, { side: 'R', text: 'i think we want different things' }, { side: 'L', text: 'yeah. i think so too.' }]
const PISC = t => t

// ── props
function notes(x, t, cx, cy, t0) { for (let i = 0; i < 5; i++) { const p = ((t - t0) * 0.5 + i / 5) % 1; if (t < t0) return; drawBits(x, ['.NN', '.N.', 'NN.', 'NN.'], { N: [GOLD, '#ff8fb1', '#9fe6b0'][i % 3] }, cx + Math.sin(p * 6 + i) * 80, cy - p * 360, 8, { alpha: 1 - p }) } }
function photo(x, cx, cy, s, rot, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * s, k * s)
  R(x, INK, -166, -186, 332, 372); R(x, '#fbf6ea', -160, -180, 320, 360)
  R(x, '#9fd8ff', -140, -160, 280, 150); R(x, '#5fd38a', -140, -10, 280, 110)
  for (let i = 0; i < 5; i++) for (let j = 0; j < 2; j++) R(x, (i + j) % 2 ? '#ff6a6a' : '#fff', -90 + i * 36, 30 + j * 30, 36, 30)
  drawPixelStar(x, -50, 0, 52, 2, '#9a7be0'); drawPixelStar(x, 50, 0, 52, 2, '#e8628a')
  x.font = `italic 500 32px ${SERIF}`; x.fillStyle = '#3a2d66'; x.textAlign = 'center'; x.fillText('picnic day ♡', 0, 150)
  x.restore()
}
function folder(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  R(x, INK, -250, -150, 220, 60); R(x, GOLD, -244, -144, 208, 54); R(x, INK, -256, -100, 512, 330); R(x, GOLD, -250, -94, 500, 318); R(x, '#ffe08a', -250, -94, 500, 30)
  x.font = `900 46px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('IT WAS GOOD', 0, 120)
  x.restore()
}
function flyingPhones(x, t) {
  for (let i = 0; i < 2; i++) {
    const p = ((t + 0.6) * 0.6 + i * 0.5) % 1, sc = 0.4 + p * 1.2
    x.save(); x.translate(i ? 880 + p * 200 : 200 - p * 200, 700 + (i ? -1 : 1) * p * 180); x.rotate((i ? 1 : -1) * (0.3 + p)); x.scale(sc, sc); x.globalAlpha = 1 - p * 0.6
    R(x, INK, -60, -100, 120, 200); R(x, '#2b2350', -52, -92, 104, 184); R(x, '#ff4f86', -20, 50, 40, 20); x.restore()
  }
}
const pis = (x, t, o) => sign(x, t, 'pisces', { seed: 6, ...o })

// ── chapter scenes
function song(x, t) {        // 5.0 → 9.0: the café, the song
  roomCafe(x, t)
  const u = t - T.c1
  box(x, 140, 1210, 800, 70, '#8a6442', { b: 6 })
  pis(x, t, { x: 400, y: 1070, s: 250, mood: u < 1.4 ? 'neutral' : 'sparkle', look: [1, -0.6], tears: u > 1.4 ? 2 : 0, hops: [T.c1 + 1.4] })
  // the café speaker
  box(x, 760, 760, 120, 150, '#3a2d66', { b: 6 }); x.fillStyle = INK; x.beginPath(); x.arc(820, 835, 40, 0, Math.PI * 2); x.fill()
  notes(x, t, 820, 760, T.c1 + 0.6)
  tag(x, '♪ a song from that summer', 700, 1000, { size: 24, bg: BONE, k: pop01(t, T.c1 + 1.0, 0.3, 2) })
  if (u > 1.4) bubble(x, t, 400, 840, T.c1 + 1.5, T.c1 + 3.9, 'no. not THIS one.', { size: 34, col: '#c9f2ff' })
}
function hum(x, t) {         // 15.4 → 19.0: Pisces hums it instead
  roomCafe(x, t)
  const u = t - T.i1
  box(x, 140, 1210, 800, 70, '#8a6442', { b: 6 })
  pis(x, t, { x: 540, y: 1060, s: 270, mood: 'happy', tears: 2, hops: [T.i1 + 0.6, T.i1 + 1.2, T.i1 + 1.8, T.i1 + 2.4] })
  notes(x, t, 540, 860, T.i1 + 0.2)
  tag(x, '♪ SAVED TO: MY SONGS', 540, 700, { size: 28, bg: GOLD, k: pop01(t, T.i1 + 0.9, 0.3, 2) })
  if (u > 1.4) bubble(x, t, 540, 1340, T.i1 + 1.4, T.c2 - 0.1, 'hmm hmm hmmm (it IS a good song)', { size: 28 })
}
function photoScene(x, t) {  // 19.0 → 23.0: scrolling, the photo pops
  roomBedroom(x, t)
  const u = t - T.c2
  box(x, 80, 1250, 760, 200, '#4b3d8a', { b: 8 })
  pis(x, t, { x: 300, y: 1130, s: 240, mood: u < 1.2 ? 'sleepy' : 'wide', look: [1, -0.5], tears: u > 1.2 ? 2 : 0, hops: [T.c2 + 1.2] })
  photo(x, 720, 800, 0.95, 0.08, easeOutBack(prog(t, T.c2 + 1.1, T.c2 + 1.5), 1.8))
  if (u < 1.2) { R(x, INK, 450, 900, 120, 200); R(x, '#2b2350', 456, 906, 108, 188); for (let i = 0; i < 4; i++) R(x, '#5b4aa8', 470, 920 + ((i * 50 + u * 300) % 170), 80, 30) }
}
function saveScene(x, t) {   // 29.4 → 37.0: IT WAS GOOD, lights out, can't sleep
  roomBedroom(x, t, { lamp: t < T.sleep })
  const u = t - T.i2
  box(x, 80, 1250, 760, 200, '#4b3d8a', { b: 8 })
  const fk = pop01(t, T.i2 + 0.1, 0.35, 1.8) * outK(t, [T.sleep - 0.6, T.sleep - 0.3])
  folder(x, 540, 820, fk)
  const slide = ease.inOutCubic(prog(t, T.i2 + 0.7, T.i2 + 1.5))
  if (slide < 1 && fk > 0.01) photo(x, lerp(820, 540, slide), lerp(560, 780, slide), lerp(0.9, 0.42, slide), lerp(0.2, 0, slide))
  if (u > 1.5 && u < 2.3) sparkles(x, t, 540, 800, T.i2 + 1.5, 10, 140, 2, [GOLD, BONE])
  const lie = ease.inOutCubic(prog(t, T.sleep - 0.3, T.sleep + 0.3))
  const woke = t > T.wake
  pis(x, t, { x: lerp(300, 260, lie), y: lerp(1130, 1180, lie), s: 240, mood: t < T.sleep ? 'happy' : woke ? 'wide' : 'sleepy', look: woke ? [0.6, -1] : undefined, tears: woke ? 1 : 0, squash: lie * 0.15, hops: [T.i2 + 1.5, T.wake] })
  if (lie > 0) { x.save(); x.globalAlpha = lie; box(x, 150, 1210, 640, 110, '#6a58b8', { b: 6 }); x.restore() }
  if (t > T.sleep) { x.save(); x.fillStyle = `rgba(5,4,16,${0.45 * clamp(prog(t, T.sleep, T.sleep + 0.5))})`; x.fillRect(0, 430, 1080, 1490); x.restore() }
  if (woke) { label(x, '1:30 AM', 860, 760, { size: 56, col: '#ff5a6a', k: pop01(t, T.wake + 0.1, 0.3, 2) }); label(x, 'can’t sleep.', 860, 840, { size: 30, col: BONE, k: pop01(t, T.wake + 0.4, 0.3, 2) }) }
}
function backTo3(x, t) {     // 37.0 → 40.5: the cold-open room again, the big draft typing
  roomBedroom(x, t, { lamp: false })
  const u = t - T.c3
  x.save(); x.fillStyle = 'rgba(5,4,16,0.35)'; x.fillRect(0, 430, 1080, 1490); x.restore()
  pis(x, t, { x: 300, y: 1150, s: 250, mood: 'sparkle', look: [1, 0.4], tears: 3, hops: [T.c3 + 0.6, T.c3 + 2.0] })
  const k = pop01(t, T.c3 + 0.3, 0.3, 1.6)
  x.save(); x.translate(720, 930); x.scale(0.62 * k, 0.62 * k); x.translate(-720, -930)
  drawPhone(x, t, { cx: 720, cy: 930, contact: 'Avery', sub: 'last seen in August', clock: '1:31 AM', old: OLD, draft: 'i miss you. i miss us. i know we said', typedK: prog(u, 0.6, 3.2), caret: true })
  x.restore()
}
function call(x, t) {        // 55.0 → 62.0: Pisces calls Cancer; both cry
  roomBedroom(x, t, { lamp: true })
  const u = t - T.c4
  const k = pop01(t, T.c4 + 0.2, 0.35, 1.6)
  x.save(); x.translate(540, 900); x.scale(k, k)
  R(x, INK, -440, -320, 880, 640); R(x, '#120d26', -430, -310, 860, 620); R(x, '#2a3a58', -10, -300, 430, 600); R(x, '#3a2558', -420, -300, 410, 600)
  x.restore()
  if (k > 0.01) {
    label(x, u < 1.4 ? 'calling ♋︎ Cancer…' : '● ON CALL · ♋︎ CANCER · 1:34 AM', 540, 545, { size: 24, col: '#9fe6b0', k })
    pis(x, t, { x: 330, y: 960, s: 240 * k, mood: u < 1.4 ? 'sparkle' : 'happy', tears: 3, hops: [T.c4 + 1.6, T.c4 + 3.0, T.c4 + 4.6] })
    const ck = pop01(t, T.c4 + 1.4, 0.3, 2) * k
    if (ck > 0.01) sign(x, t, 'cancer', { x: 750, y: 960, s: 240 * ck, mood: u < 3.5 ? 'sleepy' : 'sparkle', tears: u > 3.5 ? 2 : 0, look: [-1, 0], hops: [T.c4 + 1.6, T.c4 + 3.6] })
    bubble(x, t, 750, 690, T.c4 + 1.8, T.c4 + 3.4, 'hey. I’m up. talk to me.', { size: 28 })
    bubble(x, t, 330, 690, T.c4 + 3.5, T.list - 0.1, 'I almost sent it (sob)', { size: 28, col: '#c9f2ff' })
    bubble(x, t, 750, 1260, T.c4 + 4.6, T.list - 0.1, 'but you called me. (now I’m crying)', { size: 26, col: '#c9f2ff' })
  }
}
const LIST_P = ['my plants (thriving)', 'that song. it’s mine now', 'Cancer, obviously']
const LIST_C = ['you’re funny at 1 a.m.', 'your soup is elite', 'you were brave tonight']
function list(x, t) {        // 62.0 → 75: the list
  roomBedroom(x, t, { lamp: true })
  const u = t - T.list
  const k = pop01(t, T.list + 0.1, 0.35, 1.6)
  x.save(); x.translate(540, 900); x.rotate(-0.02); x.scale(k, k)
  R(x, INK, -330, -380, 660, 760); R(x, '#fff6c8', -320, -370, 640, 740)
  for (let i = 0; i < 12; i++) R(x, '#eadc9a', -300, -250 + i * 54, 600, 3)
  x.font = `900 42px ${INTER}`; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('things I like about my life', -296, -310)
  x.font = `700 40px ${INTER}`
  LIST_P.forEach((l, i) => { const a = 0.6 + i * 1.1; if (u > a) { x.fillStyle = '#3a2d66'; x.fillText('♓︎ ' + l.slice(0, Math.round(l.length * prog(u, a, a + 0.8))), -296, -214 + i * 62) } })
  LIST_C.forEach((l, i) => { const a = 4.4 + i * 1.1; if (u > a) { x.fillStyle = '#2a6ab0'; x.fillText('♋︎ ' + l.slice(0, Math.round(l.length * prog(u, a, a + 0.8))), -296, -214 + (i + 3) * 62 + 24) } })
  x.restore()
  pis(x, t, { x: 170, y: 1430, s: 190, mood: 'happy', tears: 3, hops: [T.list + 0.6, T.list + 1.7, T.list + 2.8, T.list + 4.4, T.list + 5.5, T.list + 6.6] })
  sign(x, t, 'cancer', { x: 910, y: 1430, s: 190, mood: 'happy', tears: 1, look: [-1, -0.5], hops: [T.list + 4.4, T.list + 5.5, T.list + 6.6] })
  if (u > 7.8) hearts(x, t, T.list + 7.8, 540, 1300, { n: 7 })
  if (u > 7.8) sparkles(x, t, 540, 900, T.list + 7.8, 14, 300, 1, [GOLD, BONE, '#ff8fb1'])
}

// ── the episode
const CH = [
  { at: T.c1, out: [T.c2 - 0.3, T.c2 - 0.1], n: 1, title: '9 PM · THE SONG' },
  { at: T.c2, out: [T.c3 - 0.3, T.c3 - 0.1], n: 2, title: '11 PM · THE PHOTO' },
  { at: T.c3, out: [T.c4 - 0.3, T.c4 - 0.1], n: 3, title: '1:30 AM · THE BIG ONE' },
  { at: T.c4, out: [T.last - 0.3, T.last - 0.1], n: 4, title: 'WHAT THEY DID INSTEAD' },
].map(c => ({ ...c, x: 60, y: 130 }))
const room1 = (x, t) => roomCafe(x, t), room2 = (x, t) => roomBedroom(x, t), room3 = (x, t) => { roomBedroom(x, t, { lamp: false }); x.save(); x.fillStyle = 'rgba(5,4,16,0.35)'; x.fillRect(0, 430, 1080, 1490); x.restore() }
const HERO = { x: 175, y: 1250, s: 220, mood0: 'sparkle', mood: 'wide', look: [1, -0.5], tears: 3 }
const HEADS = { size: 84, top: 270 }

const EP = makeBX({
  id: 'kbxe16', sign: 'pisces', duration: D, T, ending: 'cut',
  hook: { text: 'Three almost-texts. | *Wait* for number three.', out: [4.3, 4.5], accentColor: '#ff8fb1', size: 100 },
  shakes: [{ at: T.s3a, len: 0.5, amp: 30 }, { at: T.s1, len: 0.45, amp: 24 }, { at: T.s2, len: 0.45, amp: 24 }, { at: T.s3, len: 0.6, amp: 36 }],
  recs: [{ at: T.s3a + 0.07, len: 1.25, sub: '1:30 AM · ALMOST-TEXT #3', caption: '*how* did we get here?' }, { at: T.s3 + 0.07, len: 1.3, sub: '1:31 AM', caption: 'here we are. *again.*' }],
  segments: [
    { kind: 'draft', t0: 0, t1: T.c1, stopAt: T.s3a, room: (x, t) => { room3(x, t); flyingPhones(x, t) }, contact: 'Avery', sub: 'last seen in August', clock: '1:30 AM', draft: 'i miss you', old: OLD, hero: HERO,
      extra: (x, t) => { if (t > T.rew) { x.save(); x.fillStyle = `rgba(255,255,255,${0.5 * (1 - prog(t, T.rew, T.rew + 0.5))})`; x.fillRect(0, 0, 1080, 1920); x.restore(); label(x, '◀◀ REWIND', 540, 960, { size: 90, col: BONE, k: pop01(t, T.rew, 0.2, 2), font: INTER, weight: 900 }) } } },
    { kind: 'scene', t0: T.c1, t1: T.s1 - 0.5, draw: song },
    { kind: 'draft', t0: T.s1 - 0.5, t1: T.q1, stopAt: T.s1, flipAt: T.s1 + 1.3, back: ['1 QUESTION', 'FIRST'], backN: '1', room: room1, contact: 'Avery', sub: 'last seen in August', clock: '9:04 PM', draft: 'this came on and i thought of you', old: OLD, hero: { ...HERO, tears: 2 } },
    { kind: 'check', t0: T.q1, t1: T.i1, room: (x, t) => roomCafe(x, t, { a: 0.7 }), hero: { x: 380, y: 1230, s: 250, bx: 540, by: 960, tears: 2 },
      qs: [{ q: 'Do I want them, or the song?', a: '…the song. it’s a good song.', at: T.q1 + 0.2, mood: 'sparkle', tick: 2.4 }] },
    { kind: 'scene', t0: T.i1, t1: T.c2, draw: hum },
    { kind: 'scene', t0: T.c2, t1: T.s2 - 0.5, draw: photoScene },
    { kind: 'draft', t0: T.s2 - 0.5, t1: T.q2, stopAt: T.s2, flipAt: T.s2 + 1.3, back: ['1 QUESTION', 'FIRST'], backN: '1', room: room2, contact: 'Avery', sub: 'last seen in August', clock: '11:12 PM', draft: 'remember this?', old: OLD, hero: { ...HERO, tears: 2 },
      extra: (x, t) => photo(x, 250, 790, 0.7, -0.1, 1) },
    { kind: 'check', t0: T.q2, t1: T.i2, room: (x, t) => roomBedroom(x, t, { a: 0.7 }), hero: { x: 380, y: 1230, s: 250, bx: 540, by: 960, tears: 2 },
      qs: [{ q: 'Will this text change the ending?', a: '…no. the ending’s the ending.', at: T.q2 + 0.2, mood: 'neutral', tick: 2.4 }] },
    { kind: 'scene', t0: T.i2, t1: T.c3, draw: saveScene },
    { kind: 'scene', t0: T.c3, t1: T.s3 - 0.5, draw: backTo3 },
    { kind: 'draft', t0: T.s3 - 0.5, t1: T.q3[0] - 0.2, stopAt: T.s3, flipAt: T.s3 + 1.6, room: room3, contact: 'Avery', sub: 'last seen in August', clock: '1:31 AM', draft: 'i miss you. i miss us. i know we said', old: OLD, hero: HERO },
    { kind: 'check', t0: T.q3[0] - 0.2, t1: T.c4, room: (x, t) => roomBedroom(x, t, { a: 0.6, lamp: false }), hero: { x: 380, y: 1230, s: 250, bx: 540, by: 960, tears: 3 },
      qs: [
        { q: 'What do I want from them?', a: '…for it to stop hurting.', at: T.q3[0], mood: 'sparkle', tick: 2.4 },
        { q: 'Can a text do that?', a: '…no. it can’t.', at: T.q3[1], mood: 'neutral', look: [0, 1], tick: 2.4 },
        { q: 'Who can sit with me instead?', a: 'Cancer. it’s late, but… Cancer.', at: T.q3[2], mood: 'happy', tick: 2.4 },
      ] },
    { kind: 'scene', t0: T.c4, t1: T.list, draw: call },
    { kind: 'scene', t0: T.list, t1: D + 0.1, draw: list },
  ],
  heads: [
    { text: 'A song from | *that* summer.', at: T.c1 + 0.3, out: [T.s1 - 0.7, T.s1 - 0.5], ...HEADS },
    { text: 'One question. | Just *one.*', at: T.q1 + 0.05, out: [T.i1 - 0.25, T.i1 - 0.05], ...HEADS },
    { text: 'Pisces kept | the *song.*', at: T.i1 + 0.05, out: [T.c2 - 0.25, T.c2 - 0.05], ...HEADS },
    { text: 'Then: | *the photo.*', at: T.c2 + 0.3, out: [T.s2 - 0.7, T.s2 - 0.5], ...HEADS },
    { text: 'Still *one* question.', at: T.q2 + 0.05, out: [T.i2 - 0.25, T.i2 - 0.05], ...HEADS },
    { text: 'Saved. | Not *sent.*', at: T.i2 + 0.05, out: [T.wake - 0.25, T.wake - 0.05], ...HEADS },
    { text: 'And now… | *number three.*', at: T.c3 + 0.2, out: [T.s3 - 0.7, T.s3 - 0.5], ...HEADS },
    { text: 'The big one gets | *all three.*', at: T.q3[0] - 0.1, out: [T.c4 - 0.25, T.c4 - 0.05], ...HEADS },
    { text: 'Pisces called | a *friend.*', at: T.c4 + 0.1, out: [T.list - 0.25, T.list - 0.05], ...HEADS },
    { text: 'Then they made | *a list.*', at: T.list + 0.1, out: [T.last - 0.25, T.last - 0.05], ...HEADS },
    { text: 'Cry it out. | Don’t *send* it out.', at: T.last, late: 1, lateAt: T.land, size: 100, top: 200, accent: '#ff8fb1' },
  ],
  boxes: [
    { lines: [{ t: 1.8, speaker: 'THE STARS', text: 'oh, Pisces. let’s *rewind.*' }, { t: 3.2, speaker: 'THE STARS', text: '9 p.m. it started small.' }], open: 1.65, close: T.c1 - 0.1 },
    { lines: [{ t: T.s1 + 0.7, speaker: 'THE STARS', text: 'small one. *one* question.' }], open: T.s1 + 0.55, close: T.q1 - 0.1 },
    { lines: [{ t: T.i1 + 0.4, speaker: 'THE STARS', text: 'a song can stay *yours.*' }], open: T.i1 + 0.25, close: T.c2 - 0.1 },
    { lines: [{ t: T.s2 + 0.7, speaker: 'THE STARS', text: 'a photo. still one question.' }], open: T.s2 + 0.55, close: T.q2 - 0.1 },
    { lines: [{ t: T.i2 + 0.4, speaker: 'THE STARS', text: 'keep the good. it *was* good.' }, { t: T.wake + 0.2, speaker: 'THE STARS', text: 'uh oh. 1:30 a.m.' }], open: T.i2 + 0.25, close: T.c3 - 0.1 },
    { lines: [{ t: T.s3 + 1.5, speaker: 'THE STARS', text: 'this one gets *all* three.' }], open: T.s3 + 1.35, close: T.q3[0] - 0.3 },
    { lines: [{ t: T.c4 + 5.0, speaker: 'THE STARS', text: 'big feelings need a *person,* not a send.' }], open: T.c4 + 4.85, close: T.list - 0.1 },
    { lines: [{ t: T.list + 8.2, speaker: 'THE STARS', text: 'that’s what you do with it.' }], open: T.list + 8.05, close: T.last - 0.1 },
  ],
  kit: CH.map(c => [chapter, c]),
  cues: [
    ['whoosh', T.rew, 0.5, 0.06], ['tick', T.rew + 0.05, 0.06], ['tick', T.rew + 0.12, 0.06], ['tick', T.rew + 0.19, 0.06],
    ['pluck', 1.1, 659.25, 0.035, 0.5, 0], ['pluck', 1.24, 587.33, 0.035, 0.5, 0],
    ['bell', T.c1 + 0.7, 1318.51, 0.02, 1.2, 0.3], ['bell', T.c1 + 1.1, 1567.98, 0.02, 1.2, 0.3],
    ['pop', T.i1 + 0.9, 1174.66, 0.045, 0], ['bell', T.i1 + 0.6, 1318.51, 0.02, 1, 0], ['bell', T.i1 + 1.2, 1174.66, 0.02, 1, 0],
    ['whoosh', T.c2 + 1.1, 0.4, 0.04], ['pop', T.c2 + 1.4, 880, 0.04, 0.3],
    ['whoosh', T.i2 + 0.7, 0.6, 0.035], ['pop', T.i2 + 1.5, 1174.66, 0.05, 0], ['bell', T.sleep, 987.77, 0.02, 1.6, 0], ['pop', T.wake, 1567.98, 0.05, 0], ['tom', T.wake, 110, { gain: 0.2, decay: 0.2 }],
    ...Array.from({ length: 12 }, (_, i) => ['tick', +(T.c3 + 0.6 + i * 0.2).toFixed(2), 0.02]),
    ['bell', T.c4 + 0.4, 880, 0.02, 0.4, 0], ['bell', T.c4 + 0.8, 880, 0.02, 0.4, 0], ['pop', T.c4 + 1.4, 1318.51, 0.05, 0.2],
    ['pluck', T.c4 + 3.5, 659.25, 0.035, 0.5, -0.3], ['pluck', T.c4 + 3.64, 587.33, 0.035, 0.5, -0.3],
    ...[0.6, 1.7, 2.8, 4.4, 5.5, 6.6].map((d, i) => ['pop', +(T.list + d).toFixed(2), [880, 987.77, 1174.66, 1318.51, 1479.98, 1760][i], 0.04, (i < 3 ? -0.3 : 0.3)]),
    ['glitter', T.list + 7.8, T.list + 8.6], ['bell', T.list + 7.9, 1760, 0.03, 1.4, 0],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PISC, glowAt, MONO]
