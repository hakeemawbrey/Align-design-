// kare18 — THE ALMOST RELATIONSHIP, Ep 18 (long): "The talk, from both sides" (75 s vertical, star_advice; house · Bb minor; loop).
// Gemini (left) and Libra (right), same fear, two apartments. Five chapter stickers; a new beat every 2–6 s.
//   0.0–6.0   COLD OPEN  split screen: both mid-scream into pillows. Record scratch + freeze 0.5: "two people. *same* scream."
//             Hook "Two people. Same fear. | *Different apartments.*"  3.2: "(they meet in the middle. wait for it.)"
//   6.0–20    1 · THEIR SIDE / THEIR SIDE  evidence tags on both halves · both think: "just me?"
//  20.0–34    2 · BOTH AVOID  "it's not the right time" · "after the holidays" · AVOIDED stamps · Pisces between: "you're SO close"
//  34.0–50    3 · BOTH REHEARSE  two mirrors · Pisces coaching both on a video call, crying · both rehearse the SAME words ·
//             "THE SAME WORDS" · THE STARS: "You're not the only one *scared.*"
//  50.0–60    4 · THE SAME NIGHT  both out the door at once; the split slides shut as they walk toward each other
//  60.0–75    5 · THE MIDDLE  on the street, together: "I like you." ×2 · "JINX" · Pisces' fountain ·
//             THE STARS: "Your 'almost' is *their* 'almost* too." The last 0.45 s blend back into frame 0.
import { makeAlmost, bedroom, drawApartment, drawLane, LANE, split, mirror, star, stars, standY, say, tag, stamp, thought, hearts, sparkles, snow, prog, ease, pop01, outK, R, box, INK, BONE, RED, GOLD, PINK, CYAN, MINT } from '../../kare01/scenes/almostkit.js'

const D = 75
const CH = [[6, 20, 'THEIR SIDE / THEIR SIDE'], [20, 34, 'BOTH AVOID'], [34, 50, 'BOTH REHEARSE'], [50, 60, 'THE SAME NIGHT'], [60, 75, 'THE MIDDLE']]
const B = {
  rec: 0.5, wait: 3.2, ev: [7.0, 8.6, 10.4, 12.0], what: 14.6,
  ex1: 22, ex2: 24, avoid: 27, sigh: 29.5, close: 31,
  call: 34, coach: 36, say1: 39.2, say2: 40.2, same: 43, s1: 45.4,
  out: 50, walk: [51, 59],
  meet: 60, both: 61.4, jinx: 63.4, fountain: 65.2, last: 67.2,
}
const pillow = (c, cx, cy) => box(c, cx - 150, cy - 70, 300, 140, '#efe6f6', { b: 7, hi: '#ffffff' })
function half(c, t, sign, ox, set, o = {}) {
  set(c, t)
  if (o.pillow) { pillow(c, 270 + ox, 1300); star(c, sign, 270 + ox, 1180, 260, t, { mood: 'squint', rot: ox ? -1.0 : 1.0, squash: 0.08 * Math.sin(t * 28), ...o.star }) }
  else star(c, sign, 270 + ox, o.y ?? 1380, o.s ?? 260, t, { look: [ox ? -0.4 : 0.4, -0.3], ...o.star })
}
const setL = (c, t) => bedroom(c, t, { lamp: 0.4 })
const setR = (c, t) => drawApartment(c, t, { lamp: 0.5 })
function both(c, t, oL = {}, oR = {}, at = 540) { split(c, x => half(x, t, 'gemini', 0, setL, oL), x => half(x, t, 'libra', 540, setR, oR), { at }) }

const EV = [['L', 'laughs at my jokes'], ['R', 'they text first'], ['L', 'knew my mom’s name'], ['R', 'saved me the window seat']]
const shots = [
  { a: 0, b: CH[0][0], draw(c, t) {
    both(c, t, { pillow: true }, { pillow: true })
    say(c, t, 540, 1620, B.wait, CH[0][0], '(they meet in the middle. wait for it.)', { size: 28, col: '#ffe9b0' })
  } },
  { a: CH[0][0], b: CH[1][0], draw(c, t) {
    both(c, t, { star: { mood: t > B.what ? 'neutral' : 'sparkle', hops: [B.ev[0], B.ev[2]] } }, { star: { mood: t > B.what ? 'neutral' : 'sparkle', hops: [B.ev[1], B.ev[3]] } })
    EV.forEach(([s, txt], i) => tag(c, t, B.ev[i], s === 'L' ? 270 : 810, 600 + (i >> 1) * 130, txt, { size: 32, n: i + 1, rot: s === 'L' ? -0.04 : 0.04, out: [B.what - 0.2, B.what] }))
    thought(c, t, 270, 1000, B.what, CH[1][0], 'just me?', { size: 40 })
    thought(c, t, 810, 1000, B.what + 0.2, CH[1][0], 'just me?', { size: 40 })
  } },
  { a: CH[1][0], b: CH[2][0], draw(c, t) {
    both(c, t, { star: { mood: t > B.sigh ? 'sleepy' : 'neutral', hops: [B.ex1] } }, { star: { mood: t > B.sigh ? 'sleepy' : 'neutral', hops: [B.ex2] } })
    say(c, t, 270, 1050, B.ex1, B.close + 2, 'not the right time.', { size: 32 })
    say(c, t, 810, 1050, B.ex2, B.close + 2, 'after the holidays.', { size: 32 })
    stamp(c, t, B.avoid, 270, 720, 'AVOIDED', { size: 54, rot: -0.12 }); stamp(c, t, B.avoid + 0.25, 810, 720, 'AVOIDED', { size: 54, rot: 0.1 })
    if (t > B.close) { star(c, 'pisces', 540, 1560, 200, t, { tears: 3, mood: 'wide', look: [0, -0.5], pop: pop01(t, B.close, 0.35, 2.2), hops: [B.close + 0.5, B.close + 1] }); say(c, t, 540, 1380, B.close + 0.4, CH[2][0], 'you’re SO close', { size: 32 }) }
  } },
  { a: CH[2][0], b: CH[3][0], draw(c, t) {
    split(c, x => { setL(x, t); mirror(x, 380, 980, 200, 420, null); star(x, 'gemini', 200, 1320, 230, t, { mood: t > B.say1 ? 'happy' : 'neutral', look: [1, -0.3], hops: [B.say1] }) },
      x => { setR(x, t); mirror(x, 700, 980, 200, 420, null); star(x, 'libra', 880, 1320, 230, t, { mood: t > B.say2 ? 'happy' : 'neutral', look: [-1, -0.3], hops: [B.say2] }) })
    // Pisces on a video call, between the two halves
    const ck = pop01(t, B.call, 0.35, 2)
    if (ck > 0.01) {
      c.save(); c.translate(540, 560); c.scale(ck, ck)
      box(c, -170, -150, 340, 300, '#1d1540', { b: 8 }); R(c, '#3b3b8f', -158, -138, 316, 276)
      c.restore()
      star(c, 'pisces', 540, 590, 190 * ck, t, { tears: 3, mood: t > B.same ? 'wide' : 'sparkle', look: [0, 0.3], box: false, hops: [B.coach, B.same, B.same + 0.4] })
    }
    say(c, t, 540, 820, B.coach, B.say1 - 0.2, 'say it PLAINLY!', { size: 32 })
    say(c, t, 230, 1080, B.say1, B.s1, 'I like you.', { size: 32 })
    say(c, t, 850, 1080, B.say2, B.s1, 'I like you.', { size: 32 })
    say(c, t, 540, 820, B.same, B.s1 + 1, 'THE SAME WORDS', { size: 38 })
  } },
  { a: CH[3][0], b: B.meet, draw(c, t) {
    const p = ease.inOutCubic(prog(t, ...B.walk)), at = 540
    const ox = p * 540     // the halves slide together
    split(c, x => { drawLane(x, t, { time: 'night', pan: 200 }); snow(x, t, { n: 40 }); star(x, 'gemini', 200 + p * 160, standY(240, LANE.feet), 240, t, { mood: 'neutral', look: [1, 0], hops: [51.5, 52.5, 53.5, 54.5, 55.5, 56.5] }) },
      x => { drawLane(x, t, { time: 'night', pan: 1400 }); snow(x, t, { n: 40, seed: 5 }); star(x, 'libra', 880 - p * 160, standY(240, LANE.feet), 240, t, { mood: 'neutral', look: [-1, 0], hops: [52, 53, 54, 55, 56] }) },
      { at: at + (p < 1 ? 0 : 0) })
    if (p > 0) { c.save(); c.globalAlpha = p; drawLane(c, t, { time: 'night', pan: 800 }); snow(c, t, { n: 60 }); star(c, 'gemini', 200 + p * 230, standY(240, LANE.feet), 240, t, { mood: 'neutral', look: [1, 0] }); star(c, 'libra', 880 - p * 230, standY(240, LANE.feet), 240, t, { mood: 'neutral', look: [-1, 0] }); c.restore() }
    void ox
  } },
  { a: B.meet, b: D + 1, draw(c, t) {
    const back = ease.inOutCubic(prog(t, D - 1.2, D - 0.5))
    drawLane(c, t, { time: 'night', pan: 800 }); snow(c, t, { n: 60 })
    const F = standY(250, LANE.feet) - 160 * (1 - back)
    star(c, 'gemini', 430, F, 250, t, { mood: t > B.jinx ? 'happy' : t > B.both ? 'wide' : 'neutral', look: [1, 0], hops: [B.both, B.jinx, B.jinx + 0.3] })
    star(c, 'libra', 650, F, 250, t, { mood: t > B.jinx ? 'heart' : t > B.both ? 'wide' : 'neutral', look: [-1, 0], hops: [B.both, B.jinx + 0.15, B.jinx + 0.45] })
    say(c, t, 330, F - 230, B.both, B.jinx, 'I like you.', { size: 32 }); say(c, t, 750, F - 230, B.both, B.jinx, 'I like you.', { size: 32 })
    say(c, t, 540, F - 260, B.jinx, D - 1, 'JINX!!', { size: 48 })
    hearts(c, t, B.jinx + 0.2, 540, F - 100, { n: 8 })
    if (t > B.fountain) { star(c, 'pisces', 900, standY(170, LANE.feet) - 160 * (1 - back), 170, t, { tears: 3, mood: 'sparkle', look: [-1, 0], pop: pop01(t, B.fountain, 0.35, 2.2), alpha: 1 - back, hops: [B.fountain + 0.3, B.fountain + 0.8] }); sparkles(c, t, 900, F, B.fountain + 0.1, 12, 220, 3) }
  } },
]
const HITS = [CH[0][0], CH[1][0], CH[2][0], CH[3][0], B.meet, B.avoid, B.same]
function cam(t) {
  const hit = HITS.reduce((m, c) => (t >= c && t - c < 0.3 ? c : m), null)
  const k = hit === null ? 0 : 1 - ease.outCubic(prog(t, hit, hit + 0.3))
  return { z: 1.06 + 0.02 * Math.sin(t * 0.5) * (t > 1 ? 1 : t) + 0.08 * k, fx: 540, fy: 1150, dx: 40 * k * (HITS.indexOf(hit) % 2 ? 1 : -1) }
}
const E = makeAlmost({
  id: 'kare18', duration: D, ending: 'loop',
  hook: 'Two people. Same fear. | *Different apartments.*', hookOut: [5.4, 5.8], hookTop: 220, hookSize: 96, hookPlate: [180, 480],
  shots, cam,
  flash: t => HITS.slice(0, 5).reduce((m, c) => Math.max(m, t >= c && t < c + 0.1 ? 0.4 * (1 - (t - c) / 0.1) : 0), 0),
  fx: [
    ['recordScratch', { at: B.rec, len: 1.8, caption: 'two people. *same* scream.', top: 1640 }],
    ...CH.map(([a, b, title], i) => ['chapter', { at: a + 0.1, out: [b - 0.4, b - 0.1], n: i + 1, title, y: 230, color: [GOLD, PINK, CYAN, GOLD, MINT][i] }]),
    ['screenShake', { at: B.avoid, len: 0.5, amp: 18 }], ['screenShake', { at: B.same, len: 0.5, amp: 18 }], ['screenShake', { at: B.jinx, len: 0.5, amp: 16 }],
  ],
  lines: [{ t: B.s1, speaker: 'THE STARS', text: 'You’re not the only one *scared.*' }],
  box: { open: B.s1 - 0.22, close: CH[3][0] - 0.3, y: 1460 },
  boxes: [{ lines: [{ t: B.last, speaker: 'THE STARS', text: 'Your ‘almost’ is *their* ‘almost’ too.' }], close: D - 1.0, y: 1460 }],
  cues: [
    ['pop', B.wait, 659.25, 0.03, 0], ...B.ev.map((a, i) => ['pop', a, [1174.66, 1318.51, 1567.98, 1760][i], 0.04, i % 2 ? 0.4 : -0.4]), ['pop', B.what, 659.25, 0.03, 0],
    ['pop', B.ex1, 880, 0.03, -0.4], ['pop', B.ex2, 880, 0.03, 0.4], ['boom', B.avoid, 0.14], ['boom', B.avoid + 0.25, 0.1], ['pop', B.close + 0.4, 1318.51, 0.035, 0],
    ['pop', B.call, 987.77, 0.035, 0], ['pop', B.coach, 1318.51, 0.035, 0], ['pop', B.say1, 880, 0.035, -0.4], ['pop', B.say2, 880, 0.035, 0.4], ['boom', B.same, 0.12], ['glitter', B.same, B.same + 0.6],
    ['riser', B.walk[0], B.walk[1], 0.012], ['pluck', B.both, 1174.66, 0.045, 0.5, -0.3], ['pluck', B.both, 1174.66, 0.045, 0.5, 0.3], ['pop', B.jinx, 1567.98, 0.045, 0], ['glitter', B.fountain, B.fountain + 0.8],
  ],
})
export const DURATION = E.DURATION, SCENES = E.SCENES, CUES = E.CUES
void [outK, BONE, RED]
