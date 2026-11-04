// nf16e01: MEET THE FAMILY, Ep 1, "Do I bring them home this year?" (38 s vertical, star_advice, music: jazzy · Bb).
// Story 0–35.6, then the short 2.4 s end card (no card-cut transition). The series look lives in ./familykit.js (shared by nf16e01–nf16e12).
//   0.0–3.4    DEAR STARS: "“Do I bring them | home *this year?*”" — a Libra, two weeks out. ♎ Libra mid-hop, an
//              invitation flipping YES / NOT YET in its hand. Pisces sniffles at the invitation (bottom right).
//   3.4–11.0   "Pros. Cons. | *Vibes.*"  Libra under a giant balance that won't settle (PROS / CONS, then a third sign
//              VIBES?? bonks onto the beam). THE STARS: "sweetie, you're weighing this *alone.*" → "it's *their*
//              holiday too. ask them."
//  11.0–19.6   "Just *ask.*"  The couch, the pine. LIBRA: "would you want to come home with me?" ♉ Taurus goes heart-eyed:
//              "I'd *love* to. can we leave by nine?" LIBRA: "deal. *nine* it is." Pisces fountains behind the tree.
//  19.6–26.0   "One plan, | *two* names on it."  A December calendar: GO 4 PM and HOME BY 9 stickers, a heart.
//              THE STARS: "plan it *together:* when you go, when you leave." → "then nobody's guessing at the *door.*"
//  26.2        ★ LESSON UNLOCKED: "Invite them | *in on* the plan."  +1 TEAMWORK
//  30.2–35.6   "Start with a | *talk card.*"  A talk card ("What's your comfort meal?") lands between them.
//              THE STARS: "Ask them before you ask the family."
import { makeFamily, K, R, box, ink, label, bubble, sparkles, hearts, shadow, balance, livingRoom, calendar, invite, drawBits,
  pop01, outK, prog, lerp, clamp, ease, easeOutBack, GOLD, BONE, PINK, INK, BERRY, MINT, INTER, QMARK, r3 } from './familykit.js'

const LIB = K.tag('libra'), TAU = K.tag('taurus')
const T = {
  b1: 3.4, b2: 11.0, b3: 19.6, b4: 30.2, lesson: 26.2,
  vibes: 6.9, scale: 3.6,
  ask: 11.6, love: 14.4, deal: 17.2,
  go: 21.0, home: 21.9, heart: 23.2,
}
const BOXES = [
  { open: 4.95, close: 10.75, lines: [
    { t: 5.15, speaker: K.STARS, text: "sweetie, you're weighing this *alone.*" },
    { t: 7.9, speaker: K.STARS, text: "it's *their* holiday too. ask them." },
  ] },
  { open: 11.45, close: 19.35, lines: [
    { t: T.ask, speaker: LIB, color: '#ffc6e0', text: 'would you want to come *home* with me?' },
    { t: T.love, speaker: TAU, color: MINT, text: "I'd *love* to. can we leave by nine?" },
    { t: T.deal, speaker: LIB, color: '#ffc6e0', text: 'deal. *nine* it is.' },
  ] },
  { open: 20.0, close: 25.9, lines: [
    { t: 20.2, speaker: K.STARS, text: 'plan it *together:* when you go, when you leave.' },
    { t: 23.3, speaker: K.STARS, text: "then nobody's guessing at the *door.*" },
  ] },
  { open: 30.75, close: 35.1, lines: [
    { t: 30.95, speaker: K.STARS, text: 'Ask them before you ask the family.' },
  ] },
]

// ── hook: Libra flips the invitation YES / NOT YET
function hook(x, t, S) {
  shadow(x, 540, 1290, 300)
  const flip = Math.cos(t * 5.2), yes = flip >= 0
  S.asker(x, t, { x: 470, y: 1080, s: 320, mood: yes ? 'sparkle' : 'squint', look: [1, -0.3], hops: [-0.12, 1.2, 2.4] })
  invite(x, 800, 930 + 8 * Math.sin(t * 5), { w: 300 * Math.max(0.08, Math.abs(flip)), h: 200, text: yes ? 'YES!' : 'NOT YET', rot: 0.12, col: yes ? BONE : '#e6dcff' })
  if (Math.abs(flip) < 0.2) sparkles(x, t, 800, 930, Math.floor(t * 5.2 / Math.PI) * Math.PI / 5.2 + Math.PI / 10.4, 6, 120, 1)
}

// ── beat 1: the balance that won't settle
function beat1(x, t, S) {
  const u = t - S.t0
  const tilt = Math.sin(u * 2.4) * (0.9 - 0.35 * clamp((u - 4.5) / 2))
  balance(x, 540, 640, tilt, { L: 'PROS', Rr: 'CONS', s: 0.95 })
  // the third sign bonks onto the beam
  const vk = easeOutBack(prog(t, T.vibes, T.vibes + 0.35), 2.2)
  if (vk > 0.01) {
    const y = lerp(380, 600, vk)
    x.save(); x.translate(540, y); x.rotate(0.12 * Math.sin((t - T.vibes) * 9) * Math.exp(-(t - T.vibes) * 2)); x.scale(vk, vk)
    box(x, -120, -40, 240, 76, PINK, { b: 6 }); ink(x, 'VIBES??', 0, 0, { size: 40, font: INTER, weight: 800 })
    x.restore()
  }
  shadow(x, 540, 1290, 250)
  const mood = t > T.vibes ? 'wide' : 'neutral'
  S.asker(x, t, { x: 540, y: 1130, s: 230, mood, look: [Math.sign(tilt) * -1, -0.8], hops: [S.t0 + 0.2, T.vibes + 0.05] })
  if (t > T.vibes) drawBits(x, QMARK, { Q: GOLD }, 700, 980 - 10 * Math.sin(t * 6), 7)
}

// ── beat 2: just ask (the couch)
function beat2(x, t, S) {
  livingRoom(x, t, { top: 420, floor: 1330, couchX: 470, couchW: 560 })
  const lv = t > T.love - 0.1
  S.asker(x, t, { x: 340, y: 1080, s: 220, mood: t > T.deal ? 'happy' : t > T.love ? 'sparkle' : 'neutral', look: [1, 0] })
  S.partner(x, t, { x: 610, y: 1080, s: 220, mood: lv ? (t > T.deal ? 'happy' : 'heart') : t > T.ask + 0.8 ? 'wide' : 'neutral', look: [-1, 0], hops: [T.love - 0.05, T.love + 0.4, T.deal + 1.0] })
  hearts(x, t, T.love - 0.05, 610, 900, { n: 6 })
  sparkles(x, t, 610, 1000, T.love - 0.05, 10, 170, 2)
}

// ── beat 3: one calendar, two names
function beat3(x, t, S) {
  const ck = pop01(t, S.t0 + 0.1, 0.4, 2)
  const fills = [
    { i: 25, col: MINT, mark: '4PM', k: easeOutBack(prog(t, T.go, T.go + 0.3), 2.4) },
    { i: 26, col: PINK, mark: '9PM', k: easeOutBack(prog(t, T.home, T.home + 0.3), 2.4) },
  ]
  x.save(); x.translate(540, 760); x.scale(ck, ck); x.translate(-540, -760)
  calendar(x, 540, 760, { w: 560, h: 470, fills, rot: -0.02 })
  x.restore()
  // the two stickers, written in big
  const s1 = pop01(t, T.go, 0.3, 2.4), s2 = pop01(t, T.home, 0.3, 2.4)
  if (s1 > 0.01) { x.save(); x.translate(300, 1000); x.rotate(-0.08); x.scale(s1, s1); box(x, -120, -40, 240, 80, MINT, { b: 6 }); ink(x, 'GO · 4 PM', 0, 2, { size: 34, font: INTER, weight: 800 }); x.restore() }
  if (s2 > 0.01) { x.save(); x.translate(780, 1000); x.rotate(0.07); x.scale(s2, s2); box(x, -140, -40, 280, 80, PINK, { b: 6 }); ink(x, 'HOME BY 9', 0, 2, { size: 34, font: INTER, weight: 800 }); x.restore() }
  const hk = pop01(t, T.heart, 0.3, 2.6)
  if (hk > 0.01) drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff5c8a' }, 540, 1000 - 6 * Math.sin(t * 5), 9 * hk)
  shadow(x, 330, 1300, 180); shadow(x, 750, 1300, 180)
  S.asker(x, t, { x: 330, y: 1190, s: 170, mood: t > T.go ? 'happy' : 'neutral', look: [1, -1], hops: [T.go + 0.02, T.heart] })
  S.partner(x, t, { x: 750, y: 1190, s: 170, mood: t > T.home ? 'happy' : 'neutral', look: [-1, -1], hops: [T.home + 0.02, T.heart + 0.1] })
}

// ── beat 4: the talk card, the last line
function beat4(x, t, S) {
  shadow(x, 360, 1290, 230); shadow(x, 720, 1290, 230)
  S.asker(x, t, { x: 360, y: 1130, s: 220, mood: 'happy', look: [1, -0.5], hops: [S.t0 + 0.6, 33.4] })
  S.partner(x, t, { x: 720, y: 1130, s: 220, mood: t > 33.0 ? 'heart' : 'happy', look: [-1, -0.5], hops: [S.t0 + 0.75, 33.0] })
  hearts(x, t, 33.0, 720, 960, { n: 5 })
}

const EP = makeFamily({
  id: 'nf16e01', D: 40, key: 'Bb', asker: 'libra', partner: 'taurus',
  partnerAcc: [['scarf', '#3fb08a']],
  q: { text: '“Do I bring them | home *this year?*”', sign: '— a Libra, two weeks out', out: [3.1, 3.4] },
  hook,
  hookPis: { x: 930, y: 1300, s: 130, at: 0.6, tears: 1, mood: 'sparkle', look: [-1, -1] },
  beats: [
    { t0: T.b1, t1: T.b2, head: 'Pros. Cons. | *Vibes.*', accent: PINK, draw: beat1, stars: { x: 150, y: 1290, s: 150, mood: 'happy' }, pis: { x: 940, y: 1280, s: 135, tears: 2, look: [-1, -1] } },
    { t0: T.b2, t1: T.b3, head: 'Just *ask.*', accent: GOLD, size: 104, accentSize: 150, draw: beat2, stars: null, pis: { x: 960, y: 1210, s: 105, tears: 3, mood: 'sparkle', look: [-1, 0], at: 3.2, noTissues: true } },
    { t0: T.b3, t1: T.lesson, head: 'One plan, | *two* names on it.', accent: MINT, draw: beat3, stars: { x: 540, y: 1290, s: 120, mood: 'happy' }, pis: { x: 950, y: 530, s: 120, tears: 2, mood: 'sparkle', look: [-1, 1] } },
    { t0: T.lesson, t1: T.b4, head: null, draw: beat3, stars: null, pis: null, punch: false },
    { t0: T.b4, t1: 35.61, head: 'Start with a | *talk card.*', accent: GOLD, draw: beat4, stars: { x: 140, y: 1300, s: 140, mood: 'happy' }, pis: { x: 940, y: 1300, s: 130, tears: 3, mood: 'sparkle', look: [-1, -1], at: 0.5 } },
  ],
  boxes: BOXES,
  lesson: { at: T.lesson, out: [30.0, 30.2], text: 'Invite them | *in on* the plan.', chip: '+1 TEAMWORK', accentColor: PINK, dim: 0.55 },
  tie: { img: 'card-talk-5.png', at: 30.55, out: [35.1, 35.5], x: 540, y: 700, w: 340, rot: 0.05 },
  cuts: [T.b2, { t: T.b3, kind: 'flip' }, T.b4],
  flashes: [T.b1, T.b2],
  cues: [
    ['riser', T.b1 + 0.1, T.vibes - 0.1, 0.012],
    ['tick', 4.05, 0.03], ['tick', 5.35, 0.03], ['tick', 6.65, 0.03],
    ['tom', T.vibes + 0.2, 110, { gain: 0.22, decay: 0.25 }], ['pop', T.vibes + 0.2, 1318.51, 0.04, 0], ['pluck', T.vibes + 0.4, 659.25, 0.03, 0.4, 0.3],
    ['pluck', T.love - 0.05, 1174.66, 0.045, 0.5, 0.2], ['pluck', T.love + 0.07, 1567.98, 0.04, 0.5, 0.2], ['glitter', T.love, T.love + 0.4],
    ['pop', T.go, 1174.66, 0.045, -0.3], ['pop', T.home, 1318.51, 0.045, 0.3], ['bell', T.heart, 1760, 0.03, 1.0, 0],
    ['pop', 33.0, 1567.98, 0.03, 0.2],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [R, label, bubble, BERRY, BONE, INK, r3, lerp]
