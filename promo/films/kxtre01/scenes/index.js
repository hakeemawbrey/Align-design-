// kxtre01: STORYTIME, "Storytime: The Wrong Coffee Order" (118 s vertical, Trends: Extended ep 1, rows in
// promo/films/month2/m41.md; music: cinematic · Em). The episode engine is ./xkit.js (shared by all twelve), on the
// Month 2 hook kit. No end card, no card transition; it loops back into frame 0.
// ♊ Gemini tells it; ♎ Libra is "not-Sam"; ♓ Pisces cries in the café booth, then on the couch (the roommate).
//   0.0–3.6    frame 0: a coffee cup mid-flight across the café, Gemini mid-gasp; mid whip zoom; record scratch at 1.0
//              "storytime: *how we met.*"; slam "They handed me *the wrong* coffee." Promise: "the ending, *though.*"
//   3.6        1 THE CAFÉ     the wrong cup (OAT · EXTRA HOT · NO FOAM); a sip; record scratch "that was *not* my order."
//   17.6       2 THE SWAP     Libra walks over holding Gemini's cup; both: "I think this is—"; both laugh
//   31.6       3 THE NAME     both cups say SAM (caught in 4K); "I'm not Sam." "…me neither."
//   44.6       4 THE TALK     "just to swap": the clock spins two hours; soup, haircuts, moon signs
//   59.6       5 THE TEXT     that night: nine drafts; Pisces (roommate, crying): "SEND THE FIRST ONE"
//   74.6       6 LEFT ON READ? Read… loading bar "they hate me…" 99%; the notification: "same café tomorrow?"
//   89.6       7 TOMORROW     two cups, the right names this time; a clink; Pisces fountains in the booth
//   102.6      8 NOW          back on the couch: Libra walks in with two coffees, swapped on purpose.
//   112.1      "Wrong cup. *Right person.*"   117.6–118.0 the loop eases back into frame 0
import {
  makeEp, star, pisces, cafe, room, couch, table, cup, bubble, label, tag, sfx, shadow, hearts, sparkles, confetti, phone,
  clock, glowSpot, pop01, outK, win, prog, lerp, clamp, ease, R, box, FLOOR, GOLD, BONE, PINK, INK, RED, MINT, SKYB, INTER, MONO, r3,
} from './xkit.js'

const ACC = '#ffd27a'
const COUNTER_Y = 1040

// ── shared pieces
function counter(x) { box(x, 0, COUNTER_Y, 1080, 70, '#6b4a2f', { b: 6, hi: '#8a6440' }); R(x, '#4a3020', 0, COUNTER_Y + 76, 1080, FLOOR - COUNTER_Y - 76) }
function livingRoom(x, t, warm = 0) {
  room(x, t, { wall: '#2c2350', wall2: '#33295c', window: true, night: true, warm })
  couch(x, 540, 1180, { w: 700 })
}
// a cup in flight: spinning, with motion streaks, drops flying off
function flyingCup(x, t, cx, cy, rot, { col = BONE, lb = '' } = {}) {
  for (let i = 1; i <= 4; i++) { x.save(); x.globalAlpha = 0.18 * (5 - i) / 4; R(x, BONE, cx - 40 - i * 46, cy - 50 + i * 6, 34, 8); R(x, BONE, cx - 30 - i * 52, cy + 10 + i * 4, 40, 8); x.restore() }
  x.save(); x.translate(cx, cy); x.rotate(rot); cup(x, 0, 0, { col, label: lb, s: 1.3, steam: false, t }); x.restore()
  for (let i = 0; i < 5; i++) R(x, '#c98a5a', cx + 40 + i * 22, cy - 60 - (i % 2) * 30 + Math.sin(t * 9 + i) * 6, 12, 12)
}

// ── the hook (frame 0 = thumbnail): the wrong cup mid-flight, Gemini mid-gasp at the counter
function hook(x, t, S) {
  cafe(x, t)
  counter(x)
  const k = clamp(t / 3.6)
  const f = clamp((t + 0.6) / 3.2), cx = lerp(200, 640, ease.outCubic(f)), cy = 820 - 160 * Math.sin(Math.PI * f) * 0.5
  star(x, t, 'gemini', { x: 760, y: 900, s: 280, mood: 'wide', look: [-1, -0.4], hops: [0.05, 1.9, 2.6], squash: -0.04 })
  if (t < 2.6) flyingCup(x, t, cx, cy, -0.6 + t * 4, { lb: 'SAM' })
  else { cup(x, 640, 860, { label: 'SAM', s: 1.25, t }); sfx(x, t, 'CATCH!', 640, 700, 2.6, { size: 56, col: ACC }) }
  pisces(x, t, { x: 170, y: 960, s: 150, tears: 2, look: [1, -0.3] })
  void k; void S
}

// ── chapters
const C1 = {
  name: 'THE CAFÉ', dur: 14, stamp: '3:02 PM', caption: 'so I grab my coffee. *wrong coffee.*',
  bubbles: [
    { at: 3.6, end: 6.0, x: 640, y: 560, text: 'mmm. wait.', tail: 0.4 },
    { at: 9.4, end: 12.8, x: 600, y: 560, text: 'this is… oat? extra hot? NO FOAM?', tail: 0.4, size: 34 },
  ],
  fx: [['rec', { at: 6.6, len: 1.6, caption: 'that was *not* my order.', sub: 'I order the foamiest thing on earth', top: 1180 }]],
  cues: [['pop', 1.2, 523.25, 0.04, 0], ['pluck', 3.0, 392, 0.03, 0.3, 0.2], ['tick', 9.0, 0.05], ['pop', 11.4, 659.25, 0.04, 0.3]],
  draw(x, t, S) {
    cafe(x, t)
    counter(x)
    // the barista slides two cups; Gemini grabs the left one
    const slide = ease.outCubic(prog(S.u, 0.4, 1.2))
    cup(x, lerp(80, 360, slide), 980, { label: 'SAM', t })
    cup(x, lerp(0, 220, slide), 980, { label: 'SAM', col: '#ffe0c0', t })
    const grab = ease.inOutCubic(prog(S.u, 1.6, 2.4))
    star(x, t, 'gemini', { x: lerp(860, 540, grab), y: 900, s: 260, mood: S.u > 9.2 ? 'wide' : S.u > 3.5 ? 'squint' : 'happy', look: [-1, -0.2], hops: S.hops(1.6, 2.3, 3.6, 9.4, 10.0, 10.6) })
    if (S.u > 2.4) {
      const sip = Math.sin(Math.PI * prog(S.u, 3.0, 4.2))
      cup(x, 450, 900 - sip * 80, { label: 'SAM', s: 1.1, t })
    }
    // the cup's label, close: OAT · EXTRA HOT · NO FOAM
    const lk = S.w(8.6, 13.6)
    if (lk > 0.01) tag(x, 'OAT · EXTRA HOT · NO FOAM', 540, 470, lk, { bg: BONE, size: 40, rot: -0.04 })
    pisces(x, t, { x: 150, y: 960, s: 140, tears: 1, look: [1, -0.4], pop: S.w(0.6, 14) })
    if (S.u > 1) label(x, 'latte art: a heart', 150, 800, { size: 22, alpha: S.w(1.2, 5) })
  },
}
const C2 = {
  name: 'THE SWAP', dur: 14, stamp: '3:04 PM', caption: 'and then *they* walk over.',
  bubbles: [
    { at: 4.2, end: 7.0, x: 300, y: 600, text: 'I think this is—', tail: 0.3 },
    { at: 4.2, end: 7.0, x: 780, y: 520, text: 'I think this is—', tail: -0.3 },
    { at: 8.4, end: 11.2, x: 540, y: 560, text: '…yours!', size: 44 },
  ],
  cues: [['pop', 2.0, 587.33, 0.04, 0.4], ['pluck', 4.25, 659.25, 0.04, 0.3, -0.3], ['pluck', 4.25, 659.25, 0.04, 0.3, 0.3], ['glitter', 9.6, 10.4]],
  draw(x, t, S) {
    cafe(x, t)
    counter(x)
    const walk = ease.inOutCubic(prog(S.u, 0.6, 3.6))
    star(x, t, 'gemini', { x: 320, y: 900, s: 250, mood: S.u > 8.4 ? 'happy' : S.u > 4 ? 'wide' : 'squint', look: [1, -0.2], hops: S.hops(4.2, 8.4, 9.6, 10.2) })
    cup(x, 440, 900, { label: 'SAM', s: 1.0, t })
    star(x, t, 'libra', { x: lerp(1180, 760, walk), y: 900, s: 250, mood: S.u > 8.4 ? 'happy' : 'neutral', look: [-1, -0.2], hops: S.hops(1.0, 1.8, 2.6, 3.4, 4.2, 8.4, 9.6) })
    cup(x, lerp(1060, 640, walk), 900, { label: 'SAM', col: '#ffe0c0', s: 1.0, t })
    if (S.u > 9.6) hearts(x, t, S.at(9.6), 540, 760, { n: 6 })
    // the double-take: a tiny ⇄ swap arrow between the cups
    const ak = S.w(10.6, 13.8)
    if (ak > 0.01) tag(x, '⇄ SWAP', 540, 1010, ak, { bg: MINT, size: 38 })
    pisces(x, t, { x: 140, y: 1420, s: 120, tears: 2, look: [1, -1], pop: S.w(5.2, 14) })
  },
}
const C3 = {
  name: 'THE NAME', dur: 13, stamp: '3:05 PM', caption: 'plot twist: *neither of us* is Sam.',
  bubbles: [
    { at: 5.4, end: 8.2, x: 300, y: 560, text: "I'm not Sam.", tail: 0.3 },
    { at: 7.6, end: 10.6, x: 780, y: 500, text: '…me neither.', tail: -0.3 },
  ],
  fx: [['caught', { at: 1.4, x: 540, y: 880, r: 260, ry: 160, out: [4.6, 4.8], label: 'BOTH SAM?', arrow: 'tr', rec: false }]],
  cues: [['tick', 9.0, 0.05], ['pluck', 10.8, 523.25, 0.04, 0.3, 0], ['pluck', 11.0, 659.25, 0.04, 0.3, 0]],
  draw(x, t, S) {
    cafe(x, t)
    counter(x)
    // close-up: the two cups side by side, both SAM
    const zk = 1 - ease.inOutCubic(prog(S.u, 4.6, 5.4))
    if (zk > 0.01) {
      x.save(); x.globalAlpha = zk
      cup(x, 400, 880, { label: 'SAM', s: 2.1, t }); cup(x, 680, 880, { label: 'SAM', col: '#ffe0c0', s: 2.1, t })
      x.restore()
    }
    const ck = 1 - zk
    if (ck > 0.01) {
      x.save(); x.globalAlpha = ck
      star(x, t, 'gemini', { x: 320, y: 900, s: 250, mood: S.u > 10.6 ? 'happy' : 'squint', look: [1, -0.2], hops: S.hops(5.4, 10.8, 11.2) })
      star(x, t, 'libra', { x: 760, y: 900, s: 250, mood: S.u > 10.6 ? 'happy' : 'wide', look: [-1, -0.2], hops: S.hops(7.6, 10.8, 11.2) })
      x.restore()
    }
    if (S.u > 10.8) { sfx(x, t, 'ha!', 380, 640, S.at(10.8), { size: 50, col: ACC }); sfx(x, t, 'HA!', 720, 600, S.at(11.0), { size: 56, col: PINK }) }
    pisces(x, t, { x: 940, y: 1420, s: 120, tears: 2, look: [-1, -1], pop: S.w(6, 13) })
  },
}
const C4 = {
  name: 'THE TALK', dur: 15, caption: 'we sat down "just to swap." *two hours.*',
  bubbles: [
    { at: 2.0, end: 4.6, x: 300, y: 560, text: 'favourite soup?', tail: 0.3 },
    { at: 4.2, end: 6.8, x: 780, y: 520, text: 'tomato. obviously.', tail: -0.3 },
    { at: 7.0, end: 9.6, x: 300, y: 560, text: 'worst haircut?', tail: 0.3 },
    { at: 9.4, end: 12.0, x: 780, y: 520, text: 'we do NOT talk about 2019', tail: -0.3, size: 32 },
    { at: 12.0, end: 14.8, x: 540, y: 470, text: 'wait… what time is it?', size: 38 },
  ],
  cues: [['riser', 0.5, 2.0, 0.02], ...Array.from({ length: 12 }, (_, i) => ['tick', r3(0.6 + i * 0.95), 0.025]), ['bell', 12.2, 1318.51, 0.03, 0.8, 0]],
  draw(x, t, S) {
    cafe(x, t, { warm: prog(S.u, 0, 15) })
    // the clock: two hours spin by, the window goes from day to dusk
    const mins = 180 + 132 * ease.inOutCubic(prog(S.u, 0.4, 13))
    clock(x, 300, 720, 70, mins)
    const hh = Math.floor(mins / 60), mm = Math.floor(mins % 60)
    label(x, `${hh}:${String(mm).padStart(2, '0')} PM`, 300, 830, { size: 34, col: ACC })
    table(x, 540, 1060, { w: 480 })
    cup(x, 470, 1010, { label: 'SAM', s: 0.8, t }); cup(x, 610, 1010, { label: 'SAM', col: '#ffe0c0', s: 0.8, t })
    star(x, t, 'gemini', { x: 280, y: 930, s: 230, mood: S.u > 12 ? 'wide' : 'happy', look: [1, -0.1], hops: S.hops(2.0, 2.6, 7.0, 7.6, 12.0) })
    star(x, t, 'libra', { x: 800, y: 930, s: 230, mood: S.u > 12 ? 'wide' : 'happy', look: [-1, -0.1], hops: S.hops(4.2, 4.8, 9.4, 10.0) })
    if (S.u > 10.5 && S.u < 12) hearts(x, t, S.at(10.5), 540, 860, { n: 4 })
    pisces(x, t, { x: 150, y: 1430, s: 120, tears: 2, look: [1, -1], pop: S.w(3, 15) })
  },
}
const C5 = {
  name: 'THE TEXT', dur: 15, stamp: '11:48 PM', caption: 'that night: *nine* drafts.',
  bubbles: [
    { at: 9.0, end: 12.4, x: 800, y: 780, text: 'SEND THE FIRST ONE', tail: -0.3, size: 34, col: '#cfe9ff' },
  ],
  cues: [...Array.from({ length: 22 }, (_, i) => ['tick', r3(1.0 + i * 0.32), 0.02]), ['whoosh', 13.2, 0.3, 0.04], ['pop', 13.3, 1046.5, 0.05, 0]],
  draw(x, t, S) {
    room(x, t, { wall: '#262048', wall2: '#2d2654' })
    couch(x, 540, 1180, { w: 700 })
    star(x, t, 'gemini', { x: 330, y: 1000, s: 230, mood: S.u > 13.3 ? 'wide' : 'squint', look: [1, -0.6], hops: S.hops(13.3, 13.7) })
    // the drafts: each typed, then deleted (the counter climbs to nine)
    const drafts = ["hey it's not-Sam", 'hiii', 'so about the coffee…', 'hey :)']
    const di = Math.min(3, Math.floor(prog(S.u, 0.8, 12.6) * 4))
    const d0 = 0.8 + di * 2.95
    const isLast = di === 3
    phone(x, t, 760, 600, { w: 440, h: 620, title: 'not-Sam ☕', size: 28, msgs: S.u > 13.3 ? [{ at: S.at(13.3), me: true, text: "hey it's not-Sam :)" }] : [],
      typing: S.u > 13.3 ? null : { from: S.at(d0), to: S.at(d0 + 1.4), text: isLast ? "hey it's not-Sam :)" : drafts[di], del: isLast ? null : [S.at(d0 + 1.9), S.at(d0 + 2.6)] }, rot: 0.03, sent: S.at(13.3) })
    label(x, `DRAFT ${Math.min(9, 1 + Math.floor(prog(S.u, 0.8, 12.6) * 8.99))}/9`, 760, 250, { size: 32, col: PINK, alpha: S.w(0.8, 13.2) })
    pisces(x, t, { x: 800, y: 1050, s: 190, tears: S.u > 9 ? 3 : 2, look: [-1, -0.4], pop: S.w(0.3, 15), hops: S.hops(9.0, 9.5, 10.0) })
    if (S.u > 13.3) sparkles(x, t, 760, 600, S.at(13.3), 12, 220, 1)
  },
}
const C6 = {
  name: 'LEFT ON READ?', dur: 15, stamp: '1:30 AM', caption: 'Read. *No reply.* For hours.',
  fx: [
    ['load', { at: 3.2, len: 4.4, label: 'they hate me…', stallAt: 99, error: 'Error: too many feelings', y: 1180 }],
    ['notif', { at: 9.4, out: [13.6, 13.9], title: 'texts', body: 'not-Sam: sorry, was at work!! *same café tomorrow?*', glyph: '♎', time: '9:12 AM' }],
  ],
  cues: [['pop', 1.0, 392, 0.04, 0], ['tom', 2.2, 110, { gain: 0.14, decay: 0.2 }], ['glitter', 10.6, 11.4], ['pluck', 11.0, 783.99, 0.04, 0.4, 0]],
  draw(x, t, S) {
    room(x, t, { wall: '#1f1a40', wall2: '#251f4a', night: S.u < 9 })
    const spin = S.u > 10 ? Math.sin((S.u - 10) * 9) * 0.25 * outK(S.u, [12, 13]) : 0
    star(x, t, 'gemini', { x: 300, y: 1020, s: 240, mood: S.u > 9.6 ? 'heart' : S.u > 7.6 ? 'sleepy' : 'wide', look: [1, -0.6], hops: S.hops(9.8, 10.2, 10.6, 11.0, 11.4), squash: spin })
    phone(x, t, 760, 600, { w: 440, h: 620, title: 'not-Sam ☕', size: 28, msgs: [{ at: S.at(-20), me: true, text: "hey it's not-Sam :)" }, ...(S.u > 9.4 ? [{ at: S.at(9.6), me: false, text: 'same café tomorrow?' }] : [])], rot: -0.03 })
    if (S.u < 9.4) label(x, 'Read 11:52 PM', 860, 955, { size: 24, col: 'rgba(239,230,214,0.8)' })
    // the night passes: the clock in the corner
    clock(x, 900, 1340, 60, 90 + 420 * prog(S.u, 0, 9.4))
    pisces(x, t, { x: 150, y: 1430, s: 120, tears: 3, look: [1, -1], pop: S.w(6.2, 15) })
    if (S.u > 10) confetti(x, t, S.at(10), 300, 760)
  },
}
const C7 = {
  name: 'TOMORROW', dur: 13, stamp: '3:02 PM', caption: 'next day: *right names* this time.',
  bubbles: [
    { at: 6.4, end: 9.2, x: 300, y: 560, text: 'cheers, not-Sam.', tail: 0.3 },
    { at: 8.6, end: 11.6, x: 780, y: 520, text: 'cheers, also-not-Sam.', tail: -0.3 },
  ],
  cues: [['pop', 2.0, 659.25, 0.04, -0.3], ['pop', 2.3, 783.99, 0.04, 0.3], ['bell', 5.2, 1567.98, 0.04, 0.9, 0], ['glitter', 5.2, 5.8]],
  draw(x, t, S) {
    cafe(x, t, { warm: 1 })
    table(x, 540, 1060, { w: 480 })
    const cl = Math.sin(Math.PI * prog(S.u, 4.6, 5.6))
    cup(x, 470 + cl * 30, 1010 - cl * 60, { label: 'GEMINI', s: 0.9, t }); cup(x, 610 - cl * 30, 1010 - cl * 60, { label: 'LIBRA', col: '#ffe0c0', s: 0.9, t })
    if (S.u > 5.2) sfx(x, t, 'clink!', 540, 860, S.at(5.2), { size: 50, col: ACC })
    star(x, t, 'gemini', { x: 280, y: 930, s: 230, mood: 'happy', look: [1, -0.1], hops: S.hops(2.0, 5.2, 6.4, 7.0) })
    star(x, t, 'libra', { x: 800, y: 930, s: 230, mood: S.u > 9 ? 'heart' : 'happy', look: [-1, -0.1], hops: S.hops(2.3, 5.2, 8.6, 9.2) })
    if (S.u > 1.2) tag(x, 'NAMES: CORRECT', 540, 470, S.w(1.2, 4.4), { bg: MINT, size: 40 })
    // the booth: Pisces, full fountains, saw the whole thing
    pisces(x, t, { x: 920, y: 1420, s: 150, tears: 3, look: [-1, -1], pop: S.w(1.5, 13), hops: S.hops(5.4, 5.9) })
  },
}
const C8 = {
  name: 'NOW', dur: 15.4, caption: null,
  bubbles: [
    { at: 1.0, end: 3.6, x: 360, y: 640, text: '…and that is how we met.', tail: 0.3, size: 34 },
    { at: 4.6, end: 7.4, x: 820, y: 560, text: 'coffee? one oat. one foam.', tail: -0.3, size: 34 },
    { at: 7.0, end: 9.4, x: 360, y: 640, text: 'wait. this is yours.', tail: 0.3, size: 34 },
    { at: 8.8, end: 11.6, x: 820, y: 560, text: 'I know. swapped on purpose.', tail: -0.3, size: 32 },
  ],
  cues: [['pop', 3.6, 523.25, 0.04, 0.5], ['tick', 4.0, 0.04], ['pluck', 10.0, 659.25, 0.04, 0.4, 0.2], ['pluck', 10.15, 587.33, 0.04, 0.4, 0.2]],
  draw(x, t, S) {
    livingRoom(x, t, 0.6)
    const walk = ease.inOutCubic(prog(S.u, 3.6, 4.6))
    star(x, t, 'gemini', { x: 360, y: 1010, s: 240, mood: S.u > 9 ? 'heart' : S.u > 7 ? 'squint' : 'happy', look: [S.u > 3.6 ? 1 : 0, -0.1], hops: S.hops(1.0, 1.5, 7.0, 7.4, 9.4, 9.9) })
    star(x, t, 'libra', { x: lerp(1200, 800, walk), y: 1010, s: 230, mood: S.u > 8.8 ? 'wink' : 'happy', look: [-1, -0.1], hops: S.hops(4.0, 4.6, 8.8, 9.3) })
    if (S.u > 3.6) { cup(x, lerp(1080, 700, walk), 980, { label: 'FOAM', s: 0.8, t }); cup(x, lerp(1140, 760, walk), 990, { label: 'OAT', col: '#ffe0c0', s: 0.8, t }) }
    if (S.u > 9.4) hearts(x, t, S.at(9.4), 560, 820, { n: 6 })
    // Pisces, the roommate, on the armrest: happy fountains for the whole ending
    pisces(x, t, { x: 170, y: 1500, s: 140, tears: 3, look: [1, -1], pop: S.w(0.4, 16), hops: S.hops(9.6, 10.0) })
  },
}

const EP = makeEp({
  id: 'kxtre01', bug: 'STORYTIME', lead: 'gemini', accent: ACC, deep: '#b0487a',
  music: { style: 'cinematic', key: 'Em', seed: 4101, breakdown: [74.6], lift: [89.6] },
  hook: {
    text: 'They handed me | *the wrong* coffee.', len: 3.6, draw: hook, top: 250, size: 104,
    fx: [['whip', { at: -0.08, len: 0.45, from: 1.35, blur: 8 }], ['rec', { at: 1.0, len: 1.5, caption: 'storytime: *how we met.*', sub: 'you’re probably wondering' }]],
    cues: [['whoosh', 0.02, 0.4, 0.04], ['pop', 1.0, 783.99, 0.04, 0.2]],
  },
  promise: 'the ending, *though.*',
  chapters: [C1, C2, C3, C4, C5, C6, C7, C8],
  last: { text: 'Wrong cup. | *Right person.*', at: 9.5, top: 300, size: 100 },
  ending: 'loop',
  hits: [17.6, 89.6, 112.1],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
export const T = EP.T
void [shadow, glowSpot, RED, SKYB, INTER, MONO, GOLD, BONE, PINK, INK, lerp, outK, pop01, win, bubble]
