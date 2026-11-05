// kbxe20: BEFORE YOU TEXT YOUR EX, Ep 20 (long), "When your friend is texting their ex" (60 s, star_advice post, funk · F).
// Series look: ../../kbxe01/bxkit.js (read-only). No end card: the last 0.45 s loop back into frame 0.
//   0.0   frame 0: Sagittarius mid-dive across the couch, phone held high, Virgo mid-gasp reaching, the STOP sign mid-drop
//         between Virgo's hand and the phone. Hook "Your friend is texting their *ex.*"  0.35 STOP + freeze ("Virgo's hand:
//         *mid-air.*")  THE STARS: "how to help without grabbing the phone."
//   CHAPTER 1 · THE DRAFT (5–15): Sag reads it out ("i saw your dog's new haircut and i'm not ok"); Pisces cries.
//   CHAPTER 2 · DON'T GRAB (15–25): Virgo's hand creeps toward the phone → freeze ("rule one: *don't* grab.") → the hand
//         goes back; Virgo sits beside Sag. IT'S THEIR PHONE. THEIR CHOICE.
//   CHAPTER 3 · THE QUESTIONS (25–41): Virgo asks, Sag answers: 1 What are you hoping happens? 2 And if they don't reply?
//         3 Want to decide in the morning?
//   CHAPTER 4 · SAG'S CALL (41–49): "not tonight." The phone goes in the fruit bowl. Virgo: "your call. proud of you."
//   CHAPTER 5 · INSTEAD (49–60): noodles arrive; Pisces bursts in crying with dessert.  57.0 "Be the friend with the
//         *questions.*"
import {
  makeBX, chapter, roomLiving, sign, pisces, drawPhone, R, box, bubble, sparkles, label, tag, glowAt, hearts, drawBits,
  pop01, outK, prog, ease, clamp, lerp, easeOutBack, INK, BONE, GOLD, INTER, MONO,
} from '../../kbxe01/bxkit.js'

const D = 60
const T = { s0: 0.35, c1: 5.0, c2: 15.0, reach: [15.6, 17.2], rec: 17.2, back: 18.6, c3: 25.0, q: [25.4, 30.6, 35.8], c4: 41.4, bowl: 43.6, c5: 49.0, door: 51.6, last: 57.0, land: 58.05 }
const DRAFT = 'hey stranger. i saw your dog’s new haircut and i’m not ok'
const OLD = [{ stamp: 'SEP 2' }, { side: 'L', text: 'this is the right thing. for both of us' }, { side: 'R', text: 'i know' }]

const sag = (x, t, o) => sign(x, t, 'sagittarius', { seed: 4, ...o })
const virgo = (x, t, o) => sign(x, t, 'virgo', { seed: 7, ...o })
function hand(x, hx, hy, rot = -0.4) {
  x.save(); x.translate(hx, hy); x.rotate(rot)
  R(x, INK, -40, -40, 300, 80); R(x, '#e8628a', -34, -34, 288, 68); R(x, INK, -60, -46, 60, 92); R(x, '#f2b48a', -54, -40, 48, 80)
  x.restore()
}
const couch = (x, t) => roomLiving(x, t, { couch: '#4a6aa8' })

function coldExtra(x, t) {
  // Sag mid-dive (tilted), the phone held high; Virgo reaching from the right
  sag(x, t, { x: 260, y: 1180, s: 220, mood: 'happy', look: [0, -1], squash: -0.08 })
  R(x, INK, 214, 860, 84, 150); R(x, '#2b2350', 220, 866, 72, 138)
  virgo(x, t, { x: 860, y: 1230, s: 220, mood: 'wide', look: [-1, -0.4] })
  hand(x, 700, 980, -2.6)
}

// ── chapters
function draftCh(x, t) {
  couch(x, t)
  const u = t - T.c1
  const k = pop01(t, T.c1 + 0.1, 0.3, 1.6)
  x.save(); x.translate(560, 880); x.scale(0.82 * k, 0.82 * k); x.translate(-560, -880)
  drawPhone(x, t, { cx: 560, cy: 880, contact: 'Kit', sub: 'last seen in September', clock: '10:41 PM', old: OLD, draft: DRAFT, typedK: 1 })
  x.restore()
  sag(x, t, { x: 220, y: 1260, s: 220, mood: u < 4 ? 'sparkle' : 'wide', look: [1, -0.8], hops: [T.c1 + 1.0, T.c1 + 2.0, T.c1 + 3.0, T.c1 + 4.5] })
  virgo(x, t, { x: 880, y: 1270, s: 200, mood: u < 4.5 ? 'neutral' : 'squint', look: [-1, -0.6] })
  bubble(x, t, 250, 1020, T.c1 + 1.0, T.c1 + 4.8, '“hey stranger…” good, right??', { size: 30 })
  bubble(x, t, 860, 1050, T.c1 + 5.0, T.c2 - 0.1, 'the dog’s haircut?', { size: 30, col: '#ffe0ec' })
  pisces(x, t, { x: 540, y: 1460, s: 150, tears: u > 5.5 ? 3 : 2, mood: 'sparkle', look: [0, -1], role: 'ON THE ARMCHAIR' })
}
function grabCh(x, t) {
  couch(x, t)
  const reach = ease.inOutCubic(prog(t, ...T.reach)), back = ease.inOutCubic(prog(t, T.back, T.back + 1.2))
  const r = reach * (1 - back)
  sag(x, t, { x: 300, y: 1230, s: 230, mood: 'neutral', look: [0.6, 0.8], hops: [T.c2 + 0.5] })
  R(x, INK, 400, 1100, 70, 120); R(x, '#2b2350', 406, 1106, 58, 108)
  const sit = ease.inOutCubic(prog(t, T.back + 1.0, T.back + 2.0))
  virgo(x, t, { x: lerp(840, 640, sit), y: 1240, s: 220, mood: r > 0.5 ? 'squint' : sit > 0.5 ? 'happy' : 'neutral', look: [-1, 0.2], hops: [T.back + 1.0, T.back + 2.0] })
  hand(x, lerp(780, 480, r), lerp(1140, 1130, r), -3.1)
  if (t > T.back + 2.2) tag(x, 'IT’S THEIR PHONE. THEIR CHOICE.', 540, 820, { size: 30, bg: GOLD, k: pop01(t, T.back + 2.2, 0.3, 2) })
  pisces(x, t, { x: 980, y: 1460, s: 130, tears: 3, mood: 'wide', look: [-1, -0.6] })
}
function callCh(x, t) {
  couch(x, t)
  const u = t - T.c4
  sag(x, t, { x: 330, y: 1230, s: 240, mood: u < 1.2 ? 'neutral' : 'happy', look: [1, -0.2], hops: [T.c4 + 1.0, T.bowl + 0.1] })
  virgo(x, t, { x: 700, y: 1240, s: 220, mood: 'happy', look: [-1, 0], hops: [T.bowl + 0.6] })
  bubble(x, t, 330, 1000, T.c4 + 1.0, T.bowl - 0.1, 'not tonight.', { size: 40 })
  // the fruit bowl, and the phone dropping into it
  box(x, 440, 1330, 200, 70, '#c49a6a', { b: 6 }); for (let i = 0; i < 3; i++) R(x, ['#ff8f5a', '#9fe6b0', '#ffe27a'][i], 470 + i * 50, 1300, 40, 40)
  const drop = easeOutBack(prog(t, T.bowl - 0.4, T.bowl), 1.2)
  if (t > T.bowl - 0.4) { x.save(); x.translate(540, lerp(1050, 1300, drop)); x.rotate(lerp(0.3, 1.4, drop)); R(x, INK, -40, -66, 80, 132); R(x, '#2b2350', -34, -60, 68, 120); x.restore() }
  if (t > T.bowl) { sparkles(x, t, 540, 1300, T.bowl, 10, 120, 1, [GOLD, BONE]); tag(x, 'SAG’S CHOICE: NOT TONIGHT', 540, 820, { size: 30, bg: GOLD, k: pop01(t, T.bowl + 0.1, 0.3, 2) }) }
  bubble(x, t, 720, 1000, T.bowl + 0.6, T.c5 - 0.1, 'your call. proud of you.', { size: 30, col: '#ffe0ec' })
  pisces(x, t, { x: 980, y: 1460, s: 130, tears: 3, mood: 'happy', look: [-1, -0.6] })
}
function insteadCh(x, t) {
  couch(x, t)
  const u = t - T.c5
  // noodles
  const nk = pop01(t, T.c5 + 0.4, 0.35, 2)
  if (nk > 0.01) for (const [cx, rot] of [[430, -0.1], [640, 0.1]]) { x.save(); x.translate(cx, 1180); x.rotate(rot); x.scale(nk, nk); R(x, INK, -50, -60, 100, 110); R(x, '#f4eee4', -44, -54, 88, 98); R(x, '#c42a3f', -20, -30, 40, 40); R(x, INK, 10, -110, 6, 70); R(x, INK, 24, -110, 6, 70); x.restore() }
  sag(x, t, { x: 220, y: 1230, s: 220, mood: 'happy', hops: [T.c5 + 0.8, T.c5 + 1.6, T.door + 0.4] })
  virgo(x, t, { x: 860, y: 1240, s: 210, mood: 'happy', look: [-1, 0], hops: [T.c5 + 1.0, T.door + 0.5] })
  // Pisces bursts in with dessert, crying
  const pk = pop01(t, T.door, 0.35, 2)
  if (pk > 0.01) {
    pisces(x, t, { x: 540, y: 950, s: 240, pop: pk, tears: 3, mood: 'happy', role: 'BROUGHT DESSERT', hops: [T.door + 0.3, T.door + 1.2] })
    x.save(); x.translate(540, 1110); x.scale(pk, pk); R(x, INK, -90, -40, 180, 80); R(x, '#ffb3c8', -84, -34, 168, 68); R(x, BONE, -84, -34, 168, 18); R(x, '#c42a3f', -10, -56, 20, 20); x.restore()
    bubble(x, t, 540, 730, T.door + 0.6, D + 1, 'I heard there was a NIGHT (sob)', { size: 30, col: '#c9f2ff' })
    hearts(x, t, T.door + 0.4, 540, 1000, { n: 6 })
  }
  if (u < 2.6 && u > 0.3) label(x, 'ding dong: noodles', 540, 820, { size: 34, col: GOLD, k: pop01(t, T.c5 + 0.3, 0.25, 2) * outK(t, [T.c5 + 2.3, T.c5 + 2.6]) })
  glowAt(x, 540, 1100, 560, '255,214,150', 0.12)
}

const CH = [
  { at: 4.75, out: [T.c2 - 0.3, T.c2 - 0.1], n: 1, title: 'THE DRAFT' },
  { at: T.c2, out: [T.c3 - 0.3, T.c3 - 0.1], n: 2, title: 'DON’T GRAB' },
  { at: T.c3, out: [T.c4 - 0.3, T.c4 - 0.1], n: 3, title: 'THE QUESTIONS' },
  { at: T.c4, out: [T.c5 - 0.3, T.c5 - 0.1], n: 4, title: 'SAG’S CALL' },
  { at: T.c5, out: [T.last - 0.3, T.last - 0.1], n: 5, title: 'INSTEAD' },
].map(c => ({ ...c, x: 60, y: 130 }))
const HEADS = { size: 84, top: 270 }

const EP = makeBX({
  id: 'kbxe20', sign: 'sagittarius', duration: D, T, ending: 'loop',
  hook: { text: 'Your friend is texting | their *ex.*', out: [4.5, 4.7], accentColor: GOLD, size: 104 },
  shakes: [{ at: T.s0, len: 0.5, amp: 30 }, { at: T.bowl, len: 0.35, amp: 16 }],
  recs: [{ at: T.s0 + 0.07, len: 1.25, sub: 'FRIDAY · 10:40 PM', caption: 'Virgo’s hand: *mid-air.*' }, { at: T.rec, len: 1.3, sub: 'SLOW DOWN', caption: 'rule one: *don’t* grab.' }],
  segments: [
    { kind: 'draft', t0: 0, t1: T.c1, stopAt: T.s0, flipAt: 3.6, room: couch, contact: 'Kit', sub: 'last seen in September', clock: '10:40 PM', draft: DRAFT, old: OLD,
      phone: { cx: 560, cy: 900, w: 500, h: 760, rot: -0.06 }, stop: { x: 600, y: 1060, r: 200 }, extra: coldExtra },
    { kind: 'scene', t0: T.c1, t1: T.c2, draw: draftCh },
    { kind: 'scene', t0: T.c2, t1: T.c3, draw: grabCh },
    { kind: 'check', t0: T.c3, t1: T.c4, room: (x, t) => roomLiving(x, t, { a: 0.7, couch: '#4a6aa8' }), hero: { x: 300, y: 1240, s: 240, bx: 540, by: 960 },
      extra: (x, t) => { virgo(x, t, { x: 800, y: 1240, s: 220, mood: 'happy', look: [-1, -0.2], hops: T.q.map(q => q + 0.1) }); tag(x, 'VIRGO ASKS', 800, 1400, { size: 22, bg: BONE }) },
      qs: [
        { q: 'What are you hoping happens?', a: 'they say “me too.” instantly.', at: T.q[0], mood: 'sparkle', tick: 3.4, aAt: 1.2 },
        { q: 'And if they don’t reply?', a: '…oof. I’d be wrecked.', at: T.q[1], mood: 'wide', look: [0, 1], tick: 3.4, aAt: 1.2 },
        { q: 'Want to decide in the morning?', a: '…yeah. morning me is smart.', at: T.q[2], mood: 'happy', tick: 3.4, aAt: 1.2 },
      ] },
    { kind: 'scene', t0: T.c4, t1: T.c5, draw: callCh },
    { kind: 'scene', t0: T.c5, t1: D + 0.1, draw: insteadCh },
  ],
  pis: (x, t) => {
    if (t < T.c1) pisces(x, t, { x: 985, y: 700, s: 140, tears: 2, mood: 'wide', look: [-1, 0.3], role: 'ARMCHAIR' })
    else if (t > T.c3 && t < T.c4) pisces(x, t, { x: 540, y: 1470, s: 120, tears: 3, mood: 'sparkle', look: [0, -1] })
  },
  heads: [
    { text: 'Step one: | *listen.*', at: T.c1 + 0.3, out: [T.c2 - 0.25, T.c2 - 0.05], ...HEADS },
    { text: 'Step two: | hands *off.*', at: T.c2 + 0.2, out: [T.c3 - 0.25, T.c3 - 0.05], ...HEADS },
    { text: 'Step three: | *ask.*', at: T.c3 + 0.05, out: [T.c4 - 0.25, T.c4 - 0.05], ...HEADS },
    { text: 'Step four: | it’s *their* call.', at: T.c4 + 0.1, out: [T.c5 - 0.25, T.c5 - 0.05], ...HEADS },
    { text: 'Step five: | *noodles.*', at: T.c5 + 0.1, out: [T.last - 0.25, T.last - 0.05], ...HEADS },
    { text: 'Be the friend | with the *questions.*', at: T.last, late: 1, lateAt: T.land, size: 100, top: 200, accent: GOLD },
  ],
  boxes: [
    { lines: [{ t: 1.8, speaker: 'THE STARS', text: 'Virgo. hands down. we got this.' }, { t: 3.4, speaker: 'THE STARS', text: 'how to help *without* the grab.' }], open: 1.65, close: T.c1 - 0.1 },
    { lines: [{ t: T.c1 + 7.0, speaker: 'THE STARS', text: 'hear the whole draft first. no faces.' }], open: T.c1 + 6.85, close: T.c2 - 0.1 },
    { lines: [{ t: T.back + 3.2, speaker: 'THE STARS', text: 'grabbing ends the talk. *sitting* starts it.' }], open: T.back + 3.05, close: T.c3 - 0.1 },
    { lines: [{ t: T.c5 + 2.4, speaker: 'THE STARS', text: 'questions, then snacks. *classic.*' }], open: T.c5 + 2.25, close: T.last - 0.1 },
  ],
  kit: CH.map(c => [chapter, c]),
  cues: [
    ['pluck', 0.6, 659.25, 0.03, 0.5, 0.4], ['pluck', 0.74, 587.33, 0.03, 0.5, 0.4],
    ['pop', T.c1 + 1.0, 987.77, 0.04, -0.3], ['pop', T.c1 + 5.0, 739.99, 0.04, 0.3], ['pluck', T.c1 + 5.6, 659.25, 0.03, 0.5, 0], ['pluck', T.c1 + 5.74, 587.33, 0.03, 0.5, 0],
    ['riser', T.reach[0], T.reach[1], 0.03], ['whoosh', T.back, 1.0, 0.03], ['pop', T.back + 2.2, 1174.66, 0.05, 0], ['bell', T.back + 2.25, 1760, 0.025, 0.9, 0],
    ...T.q.flatMap(q => [['pop', +(q + 0.1).toFixed(2), 880, 0.03, 0.3]]),
    ['pop', T.c4 + 1.0, 1318.51, 0.05, -0.2], ['whoosh', T.bowl - 0.4, 0.4, 0.04], ['tom', T.bowl, 120, { gain: 0.22, decay: 0.2 }], ['glitter', T.bowl, T.bowl + 0.5],
    ['bell', T.c5 + 0.3, 1318.51, 0.03, 0.6, 0], ['bell', T.c5 + 0.5, 1046.5, 0.03, 0.8, 0], ['whoosh', T.door - 0.1, 0.35, 0.04], ['pop', T.door + 0.1, 1567.98, 0.05, 0],
    ['pluck', T.door + 0.6, 659.25, 0.035, 0.5, 0], ['pluck', T.door + 0.74, 587.33, 0.035, 0.5, 0], ['glitter', T.door + 0.4, T.door + 1.2],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [drawBits, MONO, INTER]
