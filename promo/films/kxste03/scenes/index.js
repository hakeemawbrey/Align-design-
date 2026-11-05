// kxste03 · Single and Thriving: Extended, ep 3 · "Everyone Has a Dating Tip" (75 s vertical, star_advice post, funk · A)
// No end card, no card transition. Hard cut on the punchline. Engine: ../../kxmue01/scenes/m47kit.js (series 'single').
//   0.00   frame 0: ♊ Gemini mid-dodge at a dinner table, tip bubbles flying at it like darts, a bread roll mid-air.
//          Slam "Single at dinner. | *Five* tips incoming."  0.3 shake, 0.75 record scratch + caught on a bubble.
//   2.3    promise "wait for *Gemini's answer*"
//   3.0    1 · ARRIVAL         a friends' dinner, two couples, "so… anyone *special?*"
//  15.0    2 · THE MOMENT      the tips pile up (UNASKED TIPS: 1 → 9); loading "smiling politely…"
//  28.5    3 · THE STARS       "they mean well. you can still say *no thanks.*" / "then tell them what you're *excited* about."
//  37.5    4 · THE MOVE        "ask me about my pottery *class!*" — the wonky mug; everyone wants one
//  56.5    5 · THE WAY HOME    Taurus walks Gemini out: "I'm glad you said that."
//  68.6    "Gemini: *thriving.*"   73.6 last line "Thanks for the tips. | *I'm good.*"
import {
  makeM47, say, stars, star, box, R, label, hearts, sparkles, confetti, bubble, mug, dinnerTable, tally, stringLights,
  signStar, INK, BONE, GOLD, PINK, RED, MINT, MONO, INTER, ORANGE, prog, ease, clamp, lerp, pop01, outK, inR,
} from '../../kxmue01/scenes/m47kit.js'

const GEM = 'gemini', TAU = 'taurus', CAN = 'cancer', SAG = 'sagittarius', AQU = 'aquarius'
const TIPS = [
  [15.4, "you're too PICKY", 300, 520], [16.6, 'just put yourself OUT there', 700, 600], [17.8, 'my cousin is SINGLE!', 330, 680],
  [19.0, 'smile more on dates', 760, 760], [20.2, 'have you tried the GYM?', 290, 440], [21.4, "don't wait too long!", 770, 450],
  [22.6, 'lower your standards', 520, 800], [23.8, 'love finds you when…', 300, 860], [25.0, 'my friend met hers at…', 760, 900],
]
const tipsN = t => TIPS.filter(([a]) => t >= a).length

function roll(x, cx, cy, rot = 0) { x.save(); x.translate(cx, cy); x.rotate(rot); R(x, INK, -34, -22, 68, 44); R(x, '#d9a05a', -30, -18, 60, 36); R(x, '#f0c88a', -20, -14, 10, 28); R(x, '#f0c88a', 2, -14, 10, 28); x.restore() }
function wonkyMug(x, t, cx, cy, s = 1, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(s * k, s * k); x.rotate(-0.12 + 0.05 * Math.sin(t * 2))
  x.fillStyle = INK; x.beginPath(); x.moveTo(-60, -70); x.lineTo(54, -80); x.lineTo(66, 60); x.lineTo(-70, 66); x.closePath(); x.fill()
  x.fillStyle = '#7fd0c0'; x.beginPath(); x.moveTo(-52, -62); x.lineTo(46, -72); x.lineTo(58, 52); x.lineTo(-62, 58); x.closePath(); x.fill()
  R(x, '#5aa898', -50, -10, 100, 12)
  x.strokeStyle = INK; x.lineWidth = 16; x.beginPath(); x.arc(76, -4, 34, -1.3, 1.5); x.stroke(); x.strokeStyle = '#7fd0c0'; x.lineWidth = 8; x.stroke()
  x.restore()
}
function lights(x, t) { stringLights(x, t, -20, 260, 560, 300, { n: 9, sag: 50 }); stringLights(x, t, 520, 300, 1100, 260, { n: 9, sag: 50 }) }
function table5(x, t, S, moodG, lookG) {
  lights(x, t)
  star(x, t, TAU, { x: 140, y: 960, s: 170, mood: 'happy', look: [1, 0], hops: S.hopsFor(TAU) })
  star(x, t, CAN, { x: 310, y: 960, s: 170, mood: 'happy', look: [1, 0], hops: S.hopsFor(CAN) })
  star(x, t, GEM, { x: 540, y: 950, s: 230, mood: moodG, look: lookG, hops: S.hopsFor(GEM) })
  star(x, t, SAG, { x: 770, y: 960, s: 170, mood: 'happy', look: [-1, 0], hops: S.hopsFor(SAG) })
  star(x, t, AQU, { x: 940, y: 960, s: 170, mood: 'happy', look: [-1, 0], hops: [4.0, 9.8] })
}

const F = makeM47({
  id: 'kxste03', series: 'single', dur: 75, ending: 'cut',
  hook: { text: 'Single at dinner. | *Five* tips incoming.', out: 2.9, top: 200, size: 108 },
  promise: { at: 2.3, out: [6.0, 6.3], text: 'wait for *Gemini’s answer*', top: 1290 },
  chapters: [{ at: 3.0, title: 'arrival' }, { at: 15.0, title: 'the moment' }, { at: 28.5, title: 'the stars' }, { at: 37.5, title: 'the move' }, { at: 56.5, title: 'the way home' }],
  fx: [
    { k: 'whip', at: -0.1, len: 0.5, from: 1.55 },
    { k: 'shake', at: 0.3, len: 0.45, amp: 24 },
    { k: 'scratch', at: 0.75, len: 1.35, caption: 'they mean well. | they mean *a lot.*', top: 1500 },
    { k: 'caught', at: 0.85, x: 330, y: 560, r: 230, ry: 80, out: [2.2, 2.35], label: 'TIP #1', arrow: 'tr' },
    { k: 'loading', at: 22.6, len: 3.0, label: 'smiling politely…', error: 'Error: smile tired', y: 1100 },
    { k: 'ach', at: 53.8, out: [56.2, 56.45], title: 'ACHIEVEMENT UNLOCKED', text: 'changed the subject. *kindly.*', icon: '★', y: 1250 },
  ],
  lines: [
    say(3.4, GEM, 'hi!! I made *dessert!*'),
    say(6.4, TAU, 'GEMINI! sit next to *us!*'),
    say(9.4, CAN, 'so… anyone *special?*'),
    say(12.1, GEM, "just me! and I'm actually *great.*"),
    say(26.0, GEM, '…thanks? I *think?*'),
    stars(29.0, 'they mean well. you can still say *no thanks.*'),
    stars(33.0, "then tell them what you're *excited* about."),
    say(38.0, GEM, "thank you! I'm actually really *good.*"),
    say(41.6, GEM, 'ask me about my pottery *class!*'),
    say(45.0, SAG, 'wait. you do *POTTERY?*'),
    say(48.4, GEM, "it's wonky. it's *mine.* I love it."),
    say(51.6, CAN, 'can you make me *one?*'),
    say(57.0, TAU, "I'm glad you said that. we *overdo* it."),
    say(60.8, GEM, 'you love me. I *know.*'),
    say(63.8, GEM, 'next dinner: *I* ask the questions.'),
  ],
  boxes: [{ from: 0, to: 4, close: 15.1 }, { from: 4, to: 5, close: 28.3 }, { from: 5, to: 7, close: 37.3 }, { from: 7, to: 12, close: 56.2 }, { from: 12, to: 15, close: 68.3 }],
  meter: [[3.6, 0.4], [15.4, 0.25], [22.6, 0.1], [34.0, 0.35], [46.0, 0.6], [53.8, 0.8], [64.4, 1.0]],
  thrive: { at: 68.6, text: 'Gemini: | *thriving.*' },
  last: { at: 73.6, text: 'Thanks for the tips. | *I’m good.*', top: 300 },
  beats: [17.8, 20.2, 46.0],
  shots: [
    // A · the dodge (0–3)
    { at: 0, set: 'dinner', cam: [1.1, 540, 880], push: 0.03,
      draw(x, t) {
        lights(x, t)
        star(x, t, GEM, { x: 540, y: 960, s: 250, mood: 'wide', look: [-1, -1], hops: [-0.15], squash: 0.08 * Math.sin(t * 22) })
        star(x, t, TAU, { x: 180, y: 980, s: 170, mood: 'happy', look: [1, 0] }); star(x, t, SAG, { x: 900, y: 980, s: 170, mood: 'happy', look: [-1, 0] })
        roll(x, 700, 720 - 50 * Math.sin(t * 2), t * 4)
      },
      front(x, t) { dinnerTable(x, t, { dishes: true }) },
      pis: { x: 980, y: 1300, s: 100, tears: 2, mood: 'wide', look: [-1, -1] } },
    // B · arrival (3–15)
    { at: 3.0, set: 'dinner', cam: [1.06, 540, 880], push: 0.05,
      draw(x, t, S) { table5(x, t, S, t < 9.4 ? 'happy' : t < 12.2 ? 'wide' : 'sparkle', [0, 0]); hearts(x, t, 7.0, 225, 820, { n: 3, cell: 4, spread: 100 }); hearts(x, t, 8.0, 855, 820, { n: 3, cell: 4, spread: 100 }) },
      front(x, t) { dinnerTable(x, t, { dishes: true }) },
      pis: { x: 980, y: 1300, s: 100, tears: 1, mood: 'sparkle', look: [-1, -1] } },
    // C · the moment (15–28.5): the tips pile up
    { at: 15.0, set: 'dinner', cam: [1.06, 540, 880], push: 0.06,
      draw(x, t, S) { table5(x, t, S, t < 22.6 ? 'happy' : 'squint', [0, -1]) },
      front(x, t) { dinnerTable(x, t, { dishes: true }) },
      pis: t => ({ x: 980, y: 1300, s: 100, tears: t < 22 ? 1 : 2, mood: 'sparkle', look: [-1, -1] }) },
    // D · THE STARS (28.5–37.5)
    { at: 28.5, set: 'sky', push: 0.05,
      draw(x, t, S) {
        star(x, t, 'stars', { x: 540, y: 980, s: 380, mood: t > 32.6 ? 'happy' : 'neutral', look: [0, 0], hops: S.hopsFor('stars'), glow: 1.3 })
        star(x, t, GEM, { x: 190, y: 1210, s: 150, mood: t > 33.4 ? 'sparkle' : 'neutral', look: [1, -1], hops: [33.6] })
        wonkyMug(x, t, 860, 1150, 0.9, pop01(t, 33.6, 0.35, 2.2) * outK(t, [37.0, 37.4]))
      },
      pis: { x: 900, y: 1330, s: 90, tears: 1, mood: 'sparkle', look: [-1, -1], tissue: false } },
    // E · the move (37.5–56.5)
    { at: 37.5, set: 'dinner', cam: [1.08, 540, 880], push: 0.05,
      draw(x, t, S) {
        table5(x, t, S, t < 45 ? 'sparkle' : 'happy', [0, 0])
        if (inR(t, 45.6, 48.2)) ['ooh', 'ooh!', 'OOH'].forEach((s2, i) => label(x, s2, [200, 800, 920][i], 760 + 10 * Math.sin(t * 8 + i), { size: 32, col: GOLD }))
      },
      front(x, t) { dinnerTable(x, t, { dishes: true }); wonkyMug(x, t, 540, 1010, 0.8, pop01(t, 46.0, 0.35, 2.4)); sparkles(x, t, 540, 1000, 46.0, 10, 120, 2) },
      pis: t => ({ x: 980, y: 1300, s: 100, tears: t < 48 ? 2 : 3, mood: 'happy', look: [-1, -1] }) },
    // F · the way home (56.5–75)
    { at: 56.5, set: 'street', cam: [1.1, 540, 920], push: 0.05,
      draw(x, t, S) {
        const walk = prog(t, 56.5, 75)
        star(x, t, TAU, { x: lerp(200, 300, walk), y: 1050, s: 200, mood: 'happy', look: [1, 0], hops: S.hopsFor(TAU) })
        star(x, t, GEM, { x: lerp(430, 530, walk), y: 1040, s: 240, mood: 'happy', look: [-1, 0], hops: [...S.hopsFor(GEM), 68.9, 69.3, 74.0] })
        wonkyMug(x, t, lerp(560, 660, walk), 1080, 0.45)
        sparkles(x, t, 500, 1000, 68.9, 12, 260, 1, [ORANGE, GOLD, BONE])
      },
      pis: t => ({ x: 900, y: 1300, s: 110, tears: 3, mood: 'happy', look: [-1, -1], hops: [69.0, 74.0] }) },
  ],
  overlay(x, t) {
    for (const [a, txt, bx, by] of TIPS) if (inR(t, a, 27.8)) bubble(x, t, bx, by, a, 27.8, txt, { size: 30, col: ['#ffe0d0', '#e0ecff', '#fff1c8'][Math.round(bx) % 3] })
    if (inR(t, 15.2, 28.2)) tally(x, t, 820, 236, 'UNASKED TIPS', tipsN(t), { k: pop01(t, 15.2, 0.3, 2) * outK(t, [27.8, 28.2]), bumpAt: TIPS.map(q => q[0]).find(a => t >= a && t < a + 0.3) ?? -9 })
    // frame 0: the tip darts mid-flight
    if (t < 2.9) {
      const flying = ["you're too PICKY", 'just put yourself OUT there', 'my cousin is SINGLE!', 'smile more!', 'try the GYM?']
      flying.forEach((txt, i) => { const p = prog(t, -1.2 + i * 0.25, 2.2 + i * 0.1); bubble(x, t, lerp(i % 2 ? 1150 : -70, [330, 760, 300, 780, 520][i], ease.outCubic(p)), [560, 640, 760, 460, 840][i], -1, 2.9, txt, { size: 30, col: ['#ffe0d0', '#e0ecff', '#fff1c8'][i % 3] }) })
    }
  },
  cues: [
    ['whoosh', -0.0, 0.5, 0.04], ['whoosh', 0.2, 0.4, 0.03], ['whoosh', 0.4, 0.4, 0.03],
    ...TIPS.map(([a], i) => ['pop', a, [880, 987.77, 1174.66, 1318.51][i % 4], 0.035, i % 2 ? 0.3 : -0.3]),
    ['whoosh', 27.6, 0.6, 0.035],
    ['pop', 46.0, 1174.66, 0.04, 0], ['glitter', 46.0, 46.6],
  ],
})
export const { DURATION, SCENES, CUES } = F
export default F
