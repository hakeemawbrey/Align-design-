// kxmue01 · The Make-Up Talk: Extended, ep 1 · "The Phone at Dinner" (90 s vertical, star_advice post, lofi · Dm)
// No end card, no card transition. Hard cut on the punchline. Engine: ./m47kit.js (shared by all of batch m47).
//   0.00   frame 0: ♋ Cancer mid-scream across a candlelit table, a phone mid-flight out of ♊ Gemini's hand, spaghetti
//          flying, the cracked heart over the table. Slam "I was *talking* to you."  0.7 record scratch + caught circle.
//   2.3    promise "wait for the news, *take two*"
//   3.0    1 · THE FIGHT       "I got the job. I *told* you." / "you said 'nice'… to your *screen.*"
//  19.5    2 · THE TIME-OUT    split: Cancer on the step, Gemini alone; loading bar "pretending I wasn't scrolling…"
//  27.8    THE STARS           "being *ignored* stings more than the words." / "come back with *nothing* in your hands."
//  36.0    3 · THE OPENER      the phone goes in a drawer: "can you tell me again? I'm *here* now." (the drawer buzzes)
//  52.0    4 · THE HARD PART   "it felt like I wasn't worth looking *up* for." / "that's on me. no 'but'."
//  68.0    5 · THE MEND        take two: "I GOT THE JOB!"; the heart mends 74.5; the phone basket house rule
//  88.6    last line "Phone down. | *Eyes* up."
import {
  makeM47, say, stars, star, box, R, label, hearts, sparkles, confetti, phoneSmall, dinnerTable, mendHeart, bubble,
  signStar, INK, BONE, GOLD, PINK, RED, MINT, MONO, INTER, prog, ease, clamp, lerp, pop01, outK, inR, ROSE,
} from './m47kit.js'

const CAN = 'cancer', GEM = 'gemini'
const CANC = signStar(CAN), GEMC = signStar(GEM)
const MEND = 74.5

function noodles(x, t, cx, cy, p) {
  for (let i = 0; i < 7; i++) {
    const a = -1.2 + i * 0.4, r = 40 + p * 260
    const nx = cx + Math.cos(a) * r, ny = cy + Math.sin(a) * r * 0.7 - 120 * Math.sin(Math.PI * clamp(p)) + 40 * p * p
    x.save(); x.translate(nx, ny); x.rotate(t * 3 + i)
    R(x, INK, -24, -7, 48, 14); R(x, '#f2d27a', -21, -4, 42, 8)
    x.restore()
  }
}
function plate(x, cx, y, { pasta = true } = {}) {
  R(x, INK, cx - 70, y - 16, 140, 20); R(x, '#f4f0ff', cx - 64, y - 13, 128, 12)
  if (pasta) { R(x, INK, cx - 40, y - 34, 80, 22); R(x, '#f2d27a', cx - 36, y - 30, 72, 16); R(x, '#e0553a', cx - 14, y - 34, 26, 10) }
}
function drawer(x, t, cx, y, { open = 0, buzz = 0 } = {}) {
  const bz = buzz ? Math.sin(t * 70) * 5 * buzz : 0
  box(x, cx - 110, y, 220, 170, '#7a5a48', { b: 6, hi: 'rgba(255,255,255,0.15)' })
  x.save(); x.translate(bz + open * 60, 0)
  box(x, cx - 90, y + 30, 180, 60, '#8e6a54', { b: 5 }); R(x, INK, cx - 20, y + 56, 40, 10)
  x.restore()
  if (buzz > 0.1) { label(x, 'bzzt', cx + 120, y + 10 - 6 * Math.sin(t * 20), { size: 30, col: '#8fd8f6', rot: 0.2 }); label(x, 'bzzt', cx - 140, y + 40, { size: 24, col: '#8fd8f6', rot: -0.2, alpha: 0.7 }) }
}
function basket(x, t, cx, cy, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -120, -40, 240, 90, '#c98a4a', { b: 6 })
  for (let i = -100; i < 110; i += 30) R(x, '#a86c34', i, -40, 10, 90)
  phoneSmall(x, t, -40, -60, { rot: -0.25, s: 0.55, glowA: 0.2 }); phoneSmall(x, t, 40, -56, { rot: 0.2, s: 0.55, glowA: 0.2 })
  x.font = `800 22px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  R(x, BONE, -84, 6, 168, 34); x.fillStyle = INK; x.fillText('PHONES', 0, 24)
  x.restore()
}

const F = makeM47({
  id: 'kxmue01', series: 'makeup', dur: 90, ending: 'cut',
  hook: { text: 'I was *talking* | to you.', out: 2.9, top: 200, size: 118 },
  promise: { at: 2.3, out: [6.0, 6.3], text: 'wait for the news, *take two*', top: 1290 },
  chapters: [{ at: 3.0, title: 'the fight' }, { at: 19.5, title: 'the time-out' }, { at: 36.0, title: 'the opener' }, { at: 52.0, title: 'the hard part' }, { at: 68.0, title: 'the mend' }],
  fx: [
    { k: 'whip', at: -0.1, len: 0.5, from: 1.55 },
    { k: 'scratch', at: 0.7, len: 1.4, caption: 'big news. | they were *scrolling.*', top: 1500 },
    { k: 'caught', at: 0.8, x: 790, y: 640, r: 120, out: [2.2, 2.35], label: 'THE PHONE', arrow: 'tr' },
    { k: 'shake', at: 15.4, len: 0.45, amp: 20 },
    { k: 'loading', at: 21.2, len: 3.4, label: 'not scrolling. totally…', error: 'Error: was scrolling.', y: 520 },
    { k: 'caught', at: 47.6, x: 820, y: 1060, r: 150, out: [50.4, 50.6], label: 'IGNORED: THE PHONE', arrow: 'tl', rec: false, color: '#7dffb0' },
    { k: 'shake', at: 68.5, len: 0.4, amp: 16 },
  ],
  lines: [
    say(3.5, CAN, 'I got the job. I *told* you.'),
    say(6.9, CAN, "you said 'nice'… to your *screen.*"),
    say(10.4, GEM, 'I was listening! *mostly!*'),
    say(13.6, CAN, "mostly isn't *listening.*"),
    say(24.8, GEM, '…okay. I really was *scrolling.*'),
    stars(28.4, 'being *ignored* stings more than the words.'),
    stars(32.0, 'come back with *nothing* in your hands.'),
    say(38.8, GEM, "can you tell me again? I'm *here* now."),
    say(42.4, CAN, '…you really want to hear it?'),
    say(45.4, GEM, "phone's in the drawer. *all* yours."),
    say(52.6, CAN, "it felt like I wasn't worth looking *up* for."),
    say(57.0, GEM, "that's on me. no 'but'."),
    say(60.2, GEM, 'you matter more than any *screen.*'),
    say(64.0, CAN, 'thank you for saying it *plain.*'),
    say(68.6, CAN, 'okay. take two. I GOT THE *JOB!*'),
    say(71.8, GEM, 'YOU GOT THE JOB! tell me *everything.*'),
    say(81.4, CAN, 'and the basket rule goes for *me* too.'),
  ],
  boxes: [{ from: 0, to: 4, close: 18.6 }, { from: 4, to: 5, close: 27.7 }, { from: 5, to: 7, close: 35.8 }, { from: 7, to: 10, close: 51.8 }, { from: 10, to: 14, close: 67.8 }, { from: 14, to: 16, close: 75.6 }, { from: 16, to: 17, close: 85.6 }],
  cards: [{ at: 76.2, out: [80.6, 81.0], label: 'HOUSE RULE', text: 'dinner = *no phones.* | the basket holds them.', top: 470, size: 60 }],
  last: { at: 88.6, text: 'Phone down. | *Eyes* up.', top: 300 },
  beats: [17.0, 47.6, 56.0, 62.0, 74.5, 84.0],
  shots: [
    // A · the scream (0–3): the phone flies, noodles everywhere
    { at: 0, set: 'dinner', cam: [1.12, 540, 880], push: 0.03,
      draw(x, t) {
        mendHeart(x, t, 540, 600, 12, MEND)
        const p = prog(t, -0.7, 2.9)
        star(x, t, CAN, { x: 280, y: 1000, s: 260, mood: 'wide', look: [1, 0], hops: [-0.15, 1.3], squash: 0.05 * Math.sin(t * 26) })
        star(x, t, GEM, { x: 800, y: 1000, s: 250, mood: 'wide', look: [-1, -1], hops: [-0.1] })
        phoneSmall(x, t, lerp(830, 720, p), 700 - 140 * Math.sin(Math.PI * p), { rot: -0.4 + 4 * p, s: 0.9 })
        noodles(x, t, 600, 1000, p)
      },
      front(x, t) { dinnerTable(x, t, { dishes: false }); plate(x, 330, 1080); plate(x, 760, 1080) },
      pis: { x: 960, y: 1290, s: 110, tears: 2, mood: 'wide', look: [-1, -1] } },
    // B · the fight (3–19.5)
    { at: 3.0, set: 'dinner', cam: [1.12, 540, 880], push: 0.05,
      draw(x, t, S) {
        mendHeart(x, t, 540, 600, 12, MEND, { wobble: t > 15 ? 1.6 : 1 })
        const leave = ease.inOutCubic(prog(t, 16.0, 18.4))
        star(x, t, CAN, { x: lerp(280, -160, leave), y: 1000, s: 250, mood: t < 6.8 ? 'sparkle' : t < 13.4 ? 'squint' : 'wide', look: leave > 0 ? [-1, 0] : [1, 0], hops: S.hopsFor(CAN) })
        const scroll = t < 10.2
        star(x, t, GEM, { x: 800, y: 1000, s: 240, mood: scroll ? 'neutral' : t < 13.4 ? 'happy' : 'wide', look: scroll ? [0, 1] : [-1, 0], hops: S.hopsFor(GEM) })
        if (scroll) {
          phoneSmall(x, t, 690, 1040, { rot: 0.2, s: 0.75, text: 'scroll|scroll' })
          for (let i = 0; i < 3; i++) { const q = ((t * 1.4 + i / 3) % 1); R(x, '#8fd8f6', 700 - 20, 960 - q * 70, 40, 6) }
        } else phoneSmall(x, t, 700, 1050, { rot: 1.4, s: 0.7, glowA: 0.4 })
        if (t > 13.4 && t < 18.4) bubble(x, t, 280, 760, 15.4, 18.0, '*sigh*', { size: 34, col: '#ffd0c4' })
      },
      front(x, t) { dinnerTable(x, t, { dishes: false }); plate(x, 330, 1080); plate(x, 760, 1080) },
      pis: t => ({ x: 960, y: 1290, s: 110, tears: t < 15 ? 1 : 2, mood: 'wide', look: [-1, -1] }) },
    // C · the time-out (19.5–27.8): split, Cancer on the step (left), Gemini alone with the phone (right)
    { at: 19.5, set: 'split', cam: [1.1, 540, 900], push: 0.04,
      draw(x, t, S) {
        label(x, 'THE STEP', 270, 380, { size: 26, col: CANC.color }); label(x, 'THE TABLE', 810, 380, { size: 26, col: GEMC.color })
        box(x, 90, 1120, 360, 40, '#8c86a8', { b: 6 })
        star(x, t, CAN, { x: 270, y: 990, s: 220, mood: 'sleepy', look: [0, 1], zzz: false, hops: [20.2] })
        mendHeart(x, t, 270, 640, 8, MEND)
        star(x, t, GEM, { x: 810, y: 990, s: 220, mood: t < 25 ? 'squint' : 'wide', look: [0, 1], hops: S.hopsFor(GEM) })
        phoneSmall(x, t, 900, 1040, { rot: 0.3, s: 0.6, glowA: 0.6 })
      },
      pis: t => ({ x: 120, y: 1290, s: 90, tears: 2, mood: 'sparkle', look: [1, -1], tissue: false }) },
    // D · THE STARS (27.8–36)
    { at: 27.8, set: 'sky', push: 0.05,
      draw(x, t, S) {
        star(x, t, 'stars', { x: 540, y: 980, s: 380, mood: t > 32 ? 'happy' : 'neutral', look: [0, 0], hops: S.hopsFor('stars'), glow: 1.3 })
        star(x, t, GEM, { x: 190, y: 1210, s: 150, mood: 'neutral', look: [1, -1] })
        const k = pop01(t, 32.4, 0.3, 2) * outK(t, [35.4, 35.8])
        if (k > 0.01) { x.save(); x.translate(860, 1150); x.scale(k, k); for (const sgn of [-1, 1]) { R(x, INK, sgn * 56 - 26, -26, 52, 52); R(x, BONE, sgn * 56 - 20, -20, 40, 40) } x.restore(); label(x, 'empty hands', 860, 1230, { size: 24, col: GOLD, alpha: k }) }
      },
      pis: { x: 900, y: 1300, s: 110, tears: 1, mood: 'sparkle', look: [-1, -1] } },
    // E · the opener (36–52): the room; Gemini drops the phone in the drawer, sits down
    { at: 36.0, set: 'room', setOpts: { couchX: 470, couchW: 600 }, rug: { y: 1240 }, cam: [1.1, 540, 920], push: 0.05,
      draw(x, t, S) {
        drawer(x, t, 880, 1000, { open: 1 - ease.inOutCubic(prog(t, 37.4, 37.9)), buzz: inR(t, 47.6, 50.4) ? 1 : 0 })
        const p = prog(t, 36.4, 37.4)
        if (p < 1) phoneSmall(x, t, lerp(760, 900, p), lerp(900, 1010, ease.inQuad(p)), { rot: p * 2, s: 0.6 })
        const walk = ease.inOutCubic(prog(t, 36.2, 38.0))
        star(x, t, CAN, { x: 300, y: 1010, s: 240, mood: t < 42.2 ? 'sleepy' : t < 45.2 ? 'neutral' : 'sparkle', zzz: false, look: [1, 0], hops: S.hopsFor(CAN) })
        star(x, t, GEM, { x: lerp(820, 600, walk), y: 1010, s: 240, mood: t > 48.4 ? 'happy' : 'sparkle', look: t > 48 && t < 50.4 ? [1, 0] : [-1, 0], hops: [37.0, 37.5, ...S.hopsFor(GEM)] })
        if (t > 49.0) bubble(x, t, 600, 800, 49.0, 51.6, 'not looking.', { size: 30 })
        mendHeart(x, t, 450, 640, 11, MEND)
      },
      pis: t => ({ x: 120, y: 1300, s: 100, tears: t < 45 ? 1 : 2, mood: 'sparkle', look: [1, -1] }) },
    // F · the hard part (52–68): close, on the rug
    { at: 52.0, set: 'room', setOpts: { couchX: 540, couchW: 600 }, rug: { y: 1240 }, cam: [1.28, 540, 960], push: 0.06,
      draw(x, t, S) {
        star(x, t, CAN, { x: 380, y: 1030, s: 250, mood: t < 56.8 ? 'neutral' : t < 63.8 ? 'sparkle' : 'happy', look: [1, 0], hops: S.hopsFor(CAN) })
        star(x, t, GEM, { x: 700, y: 1030, s: 250, mood: t < 56.8 ? 'wide' : 'sparkle', look: [-1, 0], hops: S.hopsFor(GEM) })
        mendHeart(x, t, 540, 720, 12, MEND, { wobble: 0.5 })
        if (t > 64.6) hearts(x, t, 64.8, 540, 760, { n: 4, cell: 5, spread: 200 })
      },
      pis: t => ({ x: 900, y: 1290, s: 100, tears: t < 60 ? 2 : 3, mood: 'sparkle', look: [-1, -1] }) },
    // G · the mend (68–90): take two at the table, the heart mends, the basket, the last line
    { at: 68.0, set: 'dinner', cam: [1.12, 540, 880], push: 0.05,
      draw(x, t, S) {
        mendHeart(x, t, 540, 600, 13, MEND)
        sparkles(x, t, 540, 600, MEND, 14, 200, 1, [GOLD, '#fff1c8', PINK])
        hearts(x, t, MEND + 0.2, 540, 560, { n: 6, cell: 7, spread: 260 })
        star(x, t, CAN, { x: 280, y: 1000, s: 250, mood: t < 71.6 ? 'sparkle' : 'happy', look: [1, 0], hops: [68.7, 69.0, ...S.hopsFor(CAN), 74.6, 89.0] })
        star(x, t, GEM, { x: 800, y: 1000, s: 250, mood: t < 71.6 ? 'wide' : 'happy', look: [-1, 0], hops: [71.9, 72.2, 72.5, ...S.hopsFor(GEM), 74.7, 89.05] })
        if (inR(t, 69.0, 73.4)) label(x, 'JOB!', 540, 470, { size: 70, col: GOLD, font: INTER, weight: 800, rot: -0.08, alpha: outK(t, [73.0, 73.4]) })
        confetti(x, t, 72.0, 540, 600)
      },
      front(x, t) {
        dinnerTable(x, t, { dishes: false }); plate(x, 330, 1080); plate(x, 760, 1080)
        basket(x, t, 540, 1050, pop01(t, 77.0, 0.35, 2.2))
      },
      pis: t => ({ x: 960, y: 1290, s: 110, tears: t < MEND ? 2 : 3, mood: t < MEND ? 'sparkle' : 'happy', look: [-1, -1], hops: t > MEND ? [MEND + 0.1, 89.0] : null }) },
  ],
  cues: [
    ['whoosh', 0.05, 0.4, 0.04], ['pop', 0.3, 659.25, 0.03, 0.3],
    ['tick', 4.0, 0.02], ['tick', 4.4, 0.02], ['tick', 4.8, 0.02], ['tick', 8.2, 0.02], ['tick', 8.6, 0.02],
    ['whoosh', 16.0, 0.6, 0.03], ['tick', 18.2, 0.06],
    ['pop', 32.5, 880, 0.03, 0.3],
    ['whoosh', 36.4, 0.4, 0.03], ['tick', 37.5, 0.06], ['tick', 37.85, 0.05],
    ['pluck', 69.0, 1174.66, 0.04, 0.5, 0], ['pluck', 69.15, 1567.98, 0.035, 0.5, 0], ['glitter', 72.0, 72.6],
    ['riser', 74.0, 74.5, 0.025], ['tick', 74.5, 0.07], ['pop', 74.5, 1174.66, 0.05, 0], ['bell', 74.55, 1760, 0.035, 1.3, 0], ['glitter', 74.5, 75.1],
    ['pop', 77.0, 987.77, 0.035, 0],
  ],
})
export const { DURATION, SCENES, CUES } = F
export default F
