// kxmue06 · The Make-Up Talk: Extended, ep 6 · "The Savings Jar" (90 s vertical, star_advice post, pop · C)
// No end card, no card transition. LOOP: the last 0.45 s eases back into the frame-0 gift tower. Engine: kxmue01/m47kit.js.
//   0.00   frame 0: ♓ Pisces mid-trip under a falling tower of wrapped gifts, ♏ Scorpio mid-gasp holding an EMPTY jar
//          labelled TRIP, coins mid-air. Slam "The trip jar. *Empty.* | Twelve gifts."  0.3 shake, 0.7 record scratch.
//   2.3    promise "wait for *the new jar*"
//   3.0    1 · THE FIGHT       "that was OUR trip *money.*" / "I wanted everyone to feel *loved!*"
//  19.5    2 · THE TIME-OUT    split: three coins left; Pisces ties and unties a bow
//  27.5    THE STARS           "money fights are usually *feeling* fights." / "ask what money *means* to them."
//  35.5    3 · THE OPENER      talk card "What does money *mean* to you?" → a coin rolls out from the couch
//  51.0    4 · THE HARD PART   "giving is how I say *I love you.*" / "saving is how I feel *safe.* with you."
//  69.0    5 · THE MEND        two jars (TRIP + GIFTS), the heart mends 73.0, the plan, coins clink back in
//  87.6    last line "Two jars. | *Same* team." → loop back into frame 0 (89.55–90)
import {
  makeM47, say, stars, star, box, R, label, hearts, sparkles, confetti, mendHeart, bubble, tally, gift,
  signStar, INK, BONE, GOLD, PINK, RED, MINT, MONO, INTER, prog, ease, clamp, lerp, pop01, outK, inR,
} from '../../kxmue01/scenes/m47kit.js'

const SCO = 'scorpio', PIS = 'pisces'
const SCOC = signStar(SCO), PISC = signStar(PIS)
const MEND = 73.0
const GCOLS = ['#3fb08a', '#c0577a', '#5fa8ff', '#e9b24a', '#9a7ad8', '#e8344e']

function jar(x, t, cx, cy, labelText, fillK = 0, { s = 1, col = '#cfe8ff' } = {}) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  R(x, INK, -66, -96, 132, 186); R(x, 'rgba(207,232,255,0.35)', -60, -90, 120, 174)
  if (fillK > 0) { const h = 160 * clamp(fillK); R(x, GOLD, -56, 80 - h, 112, h); for (let i = 0; i < h / 18; i++) R(x, '#c99a2e', -50 + (i * 23) % 90, 74 - i * 18, 20, 6) }
  box(x, -50, -116, 100, 22, '#8a5a3a', { b: 5 })
  R(x, INK, -54, -30, 108, 44); R(x, BONE, -50, -26, 100, 36)
  x.font = `800 24px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(labelText, 0, -7)
  R(x, 'rgba(255,255,255,0.5)', -48, -84, 12, 120)
  x.restore()
}
function coin(x, cx, cy, s = 1) { R(x, INK, cx - 16 * s, cy - 16 * s, 32 * s, 32 * s); R(x, GOLD, cx - 12 * s, cy - 12 * s, 24 * s, 24 * s); R(x, '#fff1c8', cx - 8 * s, cy - 8 * s, 6 * s, 6 * s) }
// the gift tower; fall 0…1 (0 = standing, 1 = scattered)
function tower(x, t, cx, by, n, fall) {
  for (let i = 0; i < n; i++) {
    const w = 150 - (i % 3) * 20, h = 90 - (i % 2) * 14
    const sx = cx + (i % 2 ? 20 : -20), sy = by - i * 78
    const ang = (i % 2 ? 1 : -1) * (0.3 + i * 0.15)
    const fx = sx + fall * (i % 2 ? 1 : -1) * (60 + i * 40), fy = sy + fall * (i * 60 - 60 * Math.sin(i))
    x.save(); x.translate(fx, Math.min(by + 40, fy)); x.rotate(ang * fall)
    gift(x, 0, 0, { w, h, col: GCOLS[i % GCOLS.length], rib: i % 2 ? GOLD : BONE })
    x.restore()
  }
}

const F = makeM47({
  id: 'kxmue06', series: 'makeup', dur: 90, ending: 'loop', loopLen: 0.45,
  hook: { text: 'The trip jar. *Empty.* | Twelve gifts.', out: 2.9, top: 200, size: 104 },
  promise: { at: 2.3, out: [6.0, 6.3], text: 'wait for *the new jar*', top: 1290 },
  chapters: [{ at: 3.0, title: 'the fight' }, { at: 19.5, title: 'the time-out' }, { at: 35.5, title: 'the opener' }, { at: 51.0, title: 'the hard part' }, { at: 69.0, title: 'the mend' }],
  fx: [
    { k: 'whip', at: -0.1, len: 0.5, from: 1.5 },
    { k: 'shake', at: 0.25, len: 0.5, amp: 26 },
    { k: 'scratch', at: 0.75, len: 1.35, caption: 'the trip money. | *now* gifts.', top: 1500 },
    { k: 'caught', at: 0.85, x: 800, y: 790, r: 120, out: [2.2, 2.35], label: 'EMPTY', arrow: 'tr' },
    { k: 'shake', at: 16.6, len: 0.4, amp: 18 },
  ],
  lines: [
    say(3.4, SCO, 'that was OUR trip *money.*'),
    say(6.8, PIS, 'I wanted everyone to feel *loved!*'),
    say(10.2, SCO, "you didn't even *ask* me."),
    say(13.4, PIS, 'it was a *surprise!*'),
    say(16.2, SCO, "surprise. *I'm* surprised."),
    say(23.4, PIS, 'I just love *giving.* (sob)'),
    stars(28.0, 'money fights are usually *feeling* fights.'),
    stars(31.6, 'ask what money *means* to them.'),
    say(41.2, SCO, "…you go first. I'll *listen.*"),
    say(44.4, PIS, 'okay. no crying. (*crying*)'),
    say(51.6, PIS, 'giving is how I say *I love you.*'),
    say(55.2, SCO, 'saving is how I feel *safe.* with you.'),
    say(59.0, PIS, "I should've asked first. I'm *sorry.*"),
    say(62.6, SCO, "and I'm sorry I made it all *numbers.*"),
    say(66.0, PIS, 'so… how do we do *both?*'),
    say(69.4, SCO, 'two jars. TRIP, and a little *GIFTS* one.'),
    say(79.4, PIS, "I'm knitting EVERYONE a *scarf.*"),
    say(82.8, SCO, "…I'll hold the *yarn.*"),
  ],
  boxes: [{ from: 0, to: 5, close: 19.2 }, { from: 5, to: 6, close: 27.3 }, { from: 6, to: 8, close: 35.2 }, { from: 8, to: 10, close: 50.6 }, { from: 10, to: 15, close: 68.8 }, { from: 15, to: 16, close: 74.2 }, { from: 16, to: 18, close: 86.6 }],
  cards: [
    { at: 36.0, out: [40.4, 40.8], label: 'TALK CARD', text: 'What does money | *mean* to you?', top: 470, size: 66 },
    { at: 74.4, out: [78.6, 79.0], label: 'THE PLAN', text: 'return two gifts *together.* | make the rest by hand.', top: 470, size: 58 },
  ],
  last: { at: 87.6, text: 'Two jars. | *Same* team.', top: 300 },
  beats: [21.0, 47.6, 80.4, 84.0],
  shots: [
    // A · the tower falls (0–3) — frame 0 and the loop target
    { at: 0, set: 'room', setOpts: { couch: false, lamp: false }, rug: true, cam: [1.1, 540, 900], push: 0.03,
      draw(x, t) {
        mendHeart(x, t, 540, 470, 10, MEND)
        tower(x, t, 330, 1140, 7, 0.35 + 0.5 * prog(t, 0, 3))
        star(x, t, PIS, { x: 300, y: 1040, s: 240, mood: 'wide', look: [1, -1], hops: [-0.2], squash: 0.07 * Math.sin(t * 24), tears: 3 })
        star(x, t, SCO, { x: 780, y: 1020, s: 240, mood: 'wide', look: [-1, 0], hops: [-0.05] })
        jar(x, t, 800, 790, 'TRIP', 0, { s: 0.8 })
        for (let i = 0; i < 4; i++) { const p = prog(t, -0.6 + i * 0.1, 2.6); coin(x, 780 + (i - 1.5) * 70 * p * 2, 820 - 260 * Math.sin(Math.PI * p) + 300 * p * p, 1) }
      } },
    // B · the fight (3–19.5)
    { at: 3.0, set: 'room', setOpts: { couch: false, lamp: false }, rug: true, cam: [1.1, 540, 900], push: 0.05,
      draw(x, t, S) {
        mendHeart(x, t, 540, 560, 11, MEND, { wobble: t > 16 ? 1.6 : 1 })
        tower(x, t, 330, 1140, 7, 0.85)
        star(x, t, PIS, { x: 300, y: 1020, s: 240, mood: t < 13 ? 'sparkle' : 'wide', look: [1, 0], hops: S.hopsFor(PIS), tears: t < 13 ? 2 : 3 })
        star(x, t, SCO, { x: 780, y: 1020, s: 240, mood: t < 9.8 ? 'squint' : t < 16 ? 'neutral' : 'wide', look: [-1, 0], hops: S.hopsFor(SCO) })
        jar(x, t, 900, 1150, 'TRIP', 0, { s: 0.7 })
      } },
    // C · the time-out (19.5–27.5): split
    { at: 19.5, set: 'split', cam: [1.1, 540, 900], push: 0.04,
      draw(x, t, S) {
        label(x, "SCORPIO'S DESK", 270, 380, { size: 24, col: SCOC.color }); label(x, 'THE GIFT PILE', 810, 380, { size: 24, col: PISC.color })
        R(x, INK, 40, 1100, 460, 20); R(x, '#8a5a3a', 40, 1106, 460, 14)
        for (let i = 0; i < 3; i++) if (t > 20.4 + i * 0.6) coin(x, 300 + i * 50, 1080, 1)
        star(x, t, SCO, { x: 170, y: 1000, s: 200, mood: 'squint', look: [1, 1], hops: [20.4, 21.0, 21.6] })
        jar(x, t, 420, 990, 'TRIP', 0, { s: 0.55 })
        tower(x, t, 880, 1150, 4, 0.1)
        const bow = 0.5 + 0.5 * Math.sin(t * 2.4)
        x.save(); x.translate(720, 900); x.scale(1 + 0.3 * bow, 1); R(x, INK, -40, -16, 80, 32); R(x, PINK, -36, -12, 72, 24); x.restore()
        star(x, t, PIS, { x: 700, y: 1000, s: 200, mood: 'sparkle', look: [0, -1], hops: S.hopsFor(PIS), tears: 2 })
      } },
    // D · THE STARS (27.5–35.5)
    { at: 27.5, set: 'sky', push: 0.05,
      draw(x, t, S) {
        star(x, t, 'stars', { x: 540, y: 980, s: 380, mood: t > 31.4 ? 'happy' : 'neutral', look: [0, 0], hops: S.hopsFor('stars'), glow: 1.3 })
        star(x, t, SCO, { x: 180, y: 1210, s: 150, mood: 'neutral', look: [1, -1], hops: [32.0] })
        const k = pop01(t, 31.8, 0.3, 2) * outK(t, [34.8, 35.2])
        if (k > 0.01) { coin(x, 820, 1130, 2 * k); label(x, '= a feeling', 860, 1230, { size: 30, col: GOLD, alpha: k }) }
      },
      pis: { x: 900, y: 1300, s: 110, tears: 2, mood: 'sparkle', look: [-1, -1] } },
    // E · the opener (35.5–51): the couch, a coin rolls out
    { at: 35.5, set: 'room', setOpts: { couchX: 540, couchW: 640 }, rug: { y: 1240 }, cam: [1.1, 540, 930], push: 0.05,
      draw(x, t, S) {
        star(x, t, PIS, { x: 360, y: 1010, s: 240, mood: t < 44 ? 'neutral' : 'sparkle', look: [1, 0], hops: S.hopsFor(PIS), tears: t < 44 ? 1 : 3 })
        star(x, t, SCO, { x: 720, y: 1010, s: 240, mood: t < 41 ? 'neutral' : 'happy', look: [-1, 0], hops: S.hopsFor(SCO) })
        const p = prog(t, 47.6, 48.8)
        if (p > 0) { coin(x, lerp(300, 620, ease.outCubic(p)), 1210 - 30 * Math.abs(Math.sin(p * 9)) * (1 - p), 1.2); if (t > 48.8 && t < 51) label(x, 'one more!', 640, 1140, { size: 28, col: GOLD }) }
        mendHeart(x, t, 540, 560, 10, MEND)
      } },
    // F · the hard part (51–69)
    { at: 51.0, set: 'room', setOpts: { couchX: 540, couchW: 640 }, rug: { y: 1240 }, cam: [1.26, 540, 960], push: 0.06,
      draw(x, t, S) {
        star(x, t, PIS, { x: 380, y: 1030, s: 250, mood: t < 58.8 ? 'sparkle' : t < 62.4 ? 'neutral' : 'happy', look: [1, 0], hops: S.hopsFor(PIS), tears: 3 })
        star(x, t, SCO, { x: 700, y: 1030, s: 250, mood: t < 55 ? 'neutral' : t < 62.4 ? 'sparkle' : 'happy', look: [-1, 0], hops: S.hopsFor(SCO) })
        mendHeart(x, t, 540, 720, 12, MEND, { wobble: 0.5 })
        if (t > 62.8) hearts(x, t, 63.0, 540, 780, { n: 4, cell: 5, spread: 200 })
      } },
    // G · the mend (69–90): back in the frame-0 room, two jars
    { at: 69.0, set: 'room', setOpts: { couch: false, lamp: false }, rug: true, cam: [1.1, 540, 900], push: 0.0,
      draw(x, t, S) {
        const z = ease.inOutCubic(prog(t, 87.0, 89.55))
        mendHeart(x, t, 540, lerp(560, 470, z), lerp(13, 10, z), MEND)
        sparkles(x, t, 540, 560, MEND, 14, 200, 1, [GOLD, '#fff1c8', PINK])
        hearts(x, t, MEND + 0.2, 540, 520, { n: 6, cell: 7, spread: 260 })
        tower(x, t, lerp(150, 330, z), 1140, 5, lerp(0, 0.35, z))
        star(x, t, PIS, { x: 300, y: lerp(1020, 1040, z), s: 240, mood: z > 0.5 ? 'wide' : 'happy', look: [1, -1], hops: [...S.hopsFor(PIS), MEND + 0.1, 84.2], tears: 3 })
        star(x, t, SCO, { x: 780, y: 1020, s: 240, mood: z > 0.5 ? 'wide' : 'happy', look: [-1, 0], hops: [...S.hopsFor(SCO), MEND + 0.15] })
        const jk = pop01(t, 70.4, 0.35, 2.2)
        if (jk > 0.01) { jar(x, t, 600, 1150, 'TRIP', 0.15 + 0.35 * prog(t, 80.4, 84.0), { s: 0.85 * jk }); jar(x, t, 960, 1170, 'GIFTS', 0.2, { s: 0.7 * jk }) }
        for (let i = 0; i < 5; i++) { const at = 80.4 + i * 0.7, p = prog(t, at, at + 0.5); if (p > 0 && p < 1) coin(x, 600, lerp(880, 1090, ease.inQuad(p)), 0.9) }
      } },
  ],
  cues: [
    ['whoosh', 0.05, 0.5, 0.04], ['pop', 0.3, 196, 0.05, 0], ['tick', 0.5, 0.05], ['tick', 0.7, 0.05],
    ['pop', 20.4, 1567.98, 0.03, -0.3], ['pop', 21.0, 1567.98, 0.03, -0.3], ['pop', 21.6, 1567.98, 0.03, -0.3],
    ['pop', 47.6, 1567.98, 0.03, 0], ['tick', 48.0, 0.03], ['tick', 48.3, 0.03], ['tick', 48.55, 0.03], ['pop', 48.9, 1318.51, 0.035, 0.3],
    ['pop', 70.4, 987.77, 0.035, 0], ['pop', 70.6, 1174.66, 0.035, 0.3],
    ['riser', 72.5, 73.0, 0.025], ['tick', 73.0, 0.07], ['pop', 73.0, 1174.66, 0.05, 0], ['bell', 73.05, 1760, 0.035, 1.3, 0], ['glitter', 73.0, 73.6],
    ...[0, 1, 2, 3, 4].map(i => ['pop', +(80.9 + i * 0.7).toFixed(2), 1567.98 + i * 100, 0.03, -0.2]),
  ],
})
export const { DURATION, SCENES, CUES } = F
export default F
