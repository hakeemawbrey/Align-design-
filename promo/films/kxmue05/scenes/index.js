// kxmue05 · The Make-Up Talk: Extended, ep 5 · "The Ex Keeps Coming Up" (90 s vertical, star_advice post, funk · E)
// No end card, no card transition. Hard cut on the punchline. Engine: ../../kxmue01/scenes/m47kit.js.
//   0.00   frame 0: ♍ Virgo mid-choke on cocoa in a café, cocoa mid-splash, ♐ Sagittarius mid-sentence, a ghostly "EX"
//          silhouette in the third chair. Slam "“My ex *loved* | this place.”"  0.7 record scratch + caught on the ghost.
//   2.3    promise "wait for the *tally* to stop"   (EX MENTIONS tally top-right, 4 → 7)
//   3.0    1 · THE FIGHT       café → bookshop → rink, the ex comes up each time → "can we NOT, for *once?*"
//  21.5    2 · THE TIME-OUT    split: Virgo counts sugar cubes, Sag on a bench, confused
//  28.5    THE STARS           "feeling *compared* is real." / "say it without the *scoreboard.*"
//  36.5    3 · THE OPENER      the bench: "can I tell you how it *lands*…?" the tally stops
//  51.5    4 · THE HARD PART   "I feel like I'm in a *rerun.*" / "…the only other time I felt this *happy.*"
//  70.0    5 · THE MEND        the map of new places, the heart mends 74.0, the ghost fades, the tally resets to 0
//  88.6    last line "You're not a | *rerun.*"
import {
  makeM47, say, stars, star, box, R, label, hearts, sparkles, confetti, mendHeart, bubble, mug, tally, glow,
  signStar, INK, BONE, GOLD, PINK, RED, MINT, MONO, INTER, prog, ease, clamp, lerp, pop01, outK, inR,
} from '../../kxmue01/scenes/m47kit.js'

const VIR = 'virgo', SAG = 'sagittarius'
const VIRC = signStar(VIR), SAGC = signStar(SAG)
const MEND = 74.0

function chair(x, cx, y) { box(x, cx - 70, y - 150, 24, 230, '#6a4a3a', { b: 5 }); box(x, cx - 70, y + 30, 150, 22, '#8a5a3a', { b: 5 }); R(x, INK, cx + 60, y + 52, 14, 90); R(x, INK, cx - 66, y + 52, 14, 90) }
function ghost(x, t, cx, cy, a = 1) {
  if (a <= 0.01) return
  x.save(); x.globalAlpha = 0.45 * a
  star(x, t, 'stars', { x: cx, y: cy + 8 * Math.sin(t * 2), s: 200, mood: 'sleepy', zzz: false, color: '#c9c4e0', tips: false })
  x.restore()
  label(x, 'EX', cx, cy - 130 + 6 * Math.sin(t * 2), { size: 34, col: '#c9c4e0', alpha: 0.8 * a, font: INTER, weight: 800 })
}
function cafeTable(x, cy = 1130) { box(x, 300, cy, 480, 30, '#8a5a3a', { b: 6, hi: '#a8704a' }); R(x, INK, 520, cy + 36, 40, 120) }
function shelves(x) {
  for (let r = 0; r < 4; r++) {
    const y = 420 + r * 170
    box(x, 60, y + 120, 960, 20, '#6a4a3a', { b: 5 })
    for (let i = 0; i < 18; i++) { const h = 80 + ((i * 37 + r * 11) % 40), c = ['#c0577a', '#5fa8ff', '#e9b24a', '#3fb08a', '#9a7ad8'][(i + r) % 5]; R(x, INK, 70 + i * 52, y + 120 - h - 4, 46, h + 4); R(x, c, 74 + i * 52, y + 120 - h, 38, h) }
  }
}
function rink(x, t) {
  R(x, '#cfe6ff', 0, 1080, 1080, 840); R(x, INK, 0, 1072, 1080, 10)
  for (let i = 0; i < 6; i++) R(x, 'rgba(255,255,255,0.5)', ((i * 210 + t * 80) % 1300) - 200, 1160 + i * 60, 160, 6)
  box(x, 0, 1010, 1080, 50, '#c0577a', { b: 6 })
}
function sugar(x, t, cx, cy, n) {
  for (let i = 0; i < n; i++) { const col = i % 4, row = Math.floor(i / 4); box(x, cx + col * 46, cy - row * 42, 36, 34, '#ffffff', { b: 4 }) }
}
function map(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.translate(540, 800); x.scale(k, k); x.rotate(-0.03)
  box(x, -400, -260, 800, 520, '#efe3c4', { b: 8 })
  x.strokeStyle = '#c9b48a'; x.lineWidth = 10
  for (const [a, b, c, d] of [[-400, -100, 400, -40], [-200, -260, -140, 260], [100, -260, 180, 260], [-400, 140, 400, 180]]) { x.beginPath(); x.moveTo(a, b); x.lineTo(c, d); x.stroke() }
  const pins = [[-260, -170, 'OUR CAFÉ', 72.6], [40, 30, 'OUR RINK', 73.2], [270, -150, 'OUR BOOKSHOP', 73.8]]
  for (const [px, py, txt, at] of pins) {
    const pk = pop01(t, at, 0.3, 2.6)
    if (pk <= 0.01) continue
    x.save(); x.translate(px, py); x.scale(pk, pk)
    R(x, INK, -16, -50, 32, 32); R(x, RED, -12, -46, 24, 24); R(x, INK, -3, -18, 6, 24)
    x.font = `800 24px ${INTER}`; x.textAlign = 'center'; x.fillStyle = INK; x.fillText(txt, 0, 30)
    x.restore()
  }
  x.restore()
}
// the tally value over time
const TALLY = [[-9, 4], [4.4, 5], [9.4, 6], [13.8, 7]]
const tallyN = t => { let n = 4; for (const [a, v] of TALLY) if (t >= a) n = v; return n }

const F = makeM47({
  id: 'kxmue05', series: 'makeup', dur: 90, ending: 'cut',
  hook: { text: '“My ex *loved* | this place.”', out: 2.9, top: 200, size: 118 },
  promise: { at: 2.3, out: [6.0, 6.3], text: 'wait for the *tally* to stop', top: 1290 },
  chapters: [{ at: 3.0, title: 'the fight' }, { at: 21.5, title: 'the time-out' }, { at: 36.5, title: 'the opener' }, { at: 51.5, title: 'the hard part' }, { at: 70.0, title: 'the mend' }],
  fx: [
    { k: 'whip', at: -0.1, len: 0.5, from: 1.55 },
    { k: 'scratch', at: 0.7, len: 1.4, caption: 'every. single. | *outing.*', top: 1500 },
    { k: 'caught', at: 0.8, x: 820, y: 960, r: 140, out: [2.2, 2.35], label: 'NOT EVEN HERE', arrow: 'tr' },
    { k: 'shake', at: 17.0, len: 0.45, amp: 22 },
  ],
  lines: [
    say(3.4, SAG, 'my ex loved this *cocoa!*'),
    say(8.2, SAG, 'oh! my ex read this *one!*'),
    say(12.7, SAG, 'my ex was SO good at *skating.*'),
    say(16.6, VIR, 'can we NOT, for *once?*'),
    say(19.0, SAG, '…what did I *do?*'),
    say(24.6, VIR, 'seven. I *counted.*'),
    stars(29.0, 'feeling *compared* is real.'),
    stars(32.4, 'say it without the *scoreboard.*'),
    say(37.0, VIR, 'can I tell you how it *lands*… the ex stuff?'),
    say(40.8, SAG, 'yes. tell me. *please.*'),
    say(44.0, VIR, 'no counting. just the *feeling.*'),
    say(52.0, VIR, "I feel like I'm in a *rerun.*"),
    say(55.6, SAG, "oh. I bring it up 'cause it's the only other time…"),
    say(59.8, SAG, '…I felt this *happy.* I never said that part.'),
    say(63.8, VIR, "…that's a *very* different sentence."),
    say(67.0, SAG, "I'll say the *whole* sentence from now on."),
    say(70.6, SAG, 'new rule: we find our *own* places.'),
    say(81.2, VIR, 'table for *two.* not three.'),
  ],
  boxes: [{ from: 0, to: 1, close: 8.0 }, { from: 1, to: 2, close: 12.5 }, { from: 2, to: 5, close: 21.2 }, { from: 5, to: 6, close: 28.3 }, { from: 6, to: 8, close: 36.2 }, { from: 8, to: 11, close: 51.2 }, { from: 11, to: 16, close: 69.8 }, { from: 16, to: 17, close: 75.6 }, { from: 17, to: 18, close: 86.0 }],
  cards: [{ at: 76.0, out: [80.4, 80.8], label: 'FIRST DATE, AGAIN', text: 'a café *neither of us* | has been to.', top: 470, size: 62 }],
  last: { at: 88.6, text: 'You’re not a | *rerun.*', top: 300 },
  beats: [4.4, 9.4, 13.8, 44.6, 47.6, 74.6, 84.0],
  shots: [
    // A · the choke (0–3): café, the ghost in the third chair
    { at: 0, set: 'cafe', cam: [1.1, 540, 900], push: 0.03,
      draw(x, t) {
        chair(x, 820, 1000); ghost(x, t, 820, 960)
        star(x, t, VIR, { x: 260, y: 1000, s: 250, mood: 'wide', look: [1, 0], hops: [-0.15], squash: 0.06 * Math.sin(t * 28) })
        star(x, t, SAG, { x: 560, y: 1000, s: 230, mood: 'happy', look: [1, -0.5], hops: [-0.05, 1.5] })
        cafeTable(x)
        mug(x, t, 380, 1100, 1)
        const p = prog(t, -0.6, 2.4)
        for (let i = 0; i < 9; i++) { const a = -2.4 + i * 0.25, r = 30 + p * 200; R(x, '#8a4f2a', 380 + Math.cos(a) * r - 9, 1050 + Math.sin(a) * r - 80 * Math.sin(Math.PI * p) - 9, 18, 18) }
        mendHeart(x, t, 540, 600, 10, MEND)
      },
      pis: { x: 980, y: 1300, s: 100, tears: 2, mood: 'wide', look: [-1, -1] } },
    // B · café (3–8)
    { at: 3.0, set: 'cafe', cam: [1.1, 540, 900], push: 0.05,
      draw(x, t, S) {
        chair(x, 820, 1000); ghost(x, t, 820, 960)
        star(x, t, VIR, { x: 260, y: 1000, s: 250, mood: t < 4.4 ? 'neutral' : 'squint', look: [1, 0], hops: S.hopsFor(VIR) })
        star(x, t, SAG, { x: 560, y: 1000, s: 230, mood: 'happy', look: [1, -0.5], hops: S.hopsFor(SAG) })
        cafeTable(x); mug(x, t, 380, 1100, 1); mug(x, t, 640, 1100, 1, '#5fa8ff')
        mendHeart(x, t, 540, 600, 10, MEND)
      },
      pis: { x: 980, y: 1300, s: 100, tears: 1, mood: 'wide', look: [-1, -1] } },
    // C · bookshop (8–12.5)
    { at: 8.0, set: 'sky', setOpts: { bank: 0 }, cam: [1.08, 540, 900], push: 0.05,
      draw(x, t, S) {
        R(x, '#3a2a40', 0, 380, 1080, 1540); shelves(x)
        ghost(x, t, 820, 1020, 0.9)
        star(x, t, VIR, { x: 260, y: 1040, s: 240, mood: 'squint', look: [1, 0] })
        star(x, t, SAG, { x: 540, y: 1040, s: 230, mood: 'sparkle', look: [-1, 0], hops: S.hopsFor(SAG) })
        x.save(); x.translate(560, 1180); x.rotate(-0.2); box(x, -50, -64, 100, 128, '#c0577a', { b: 6 }); x.restore()
      },
      pis: { x: 980, y: 1300, s: 100, tears: 2, mood: 'wide', look: [-1, -1] } },
    // D · the rink (12.5–21.5), Virgo snaps
    { at: 12.5, set: 'sky', setOpts: { bank: 0 }, cam: [1.08, 540, 900], push: 0.05,
      draw(x, t, S) {
        rink(x, t)
        const glide = Math.sin(t * 1.4) * 140
        ghost(x, t, 540 + glide, 980, 0.8)
        star(x, t, VIR, { x: 260, y: 1150, s: 240, mood: t < 16.4 ? 'squint' : t < 18.6 ? 'wide' : 'sleepy', zzz: false, look: [1, 0], hops: S.hopsFor(VIR), squash: t > 16.6 && t < 17.4 ? 0.08 : 0 })
        star(x, t, SAG, { x: 780, y: 1150, s: 230, mood: t < 16.6 ? 'happy' : 'wide', look: [-1, 0], hops: S.hopsFor(SAG) })
        mendHeart(x, t, 540, 600, 10, MEND, { wobble: t > 16.6 ? 1.8 : 1 })
      },
      pis: t => ({ x: 980, y: 1330, s: 100, tears: t < 17 ? 1 : 2, mood: 'wide', look: [-1, -1] }) },
    // E · the time-out (21.5–28.5): split
    { at: 21.5, set: 'split', cam: [1.1, 540, 900], push: 0.04,
      draw(x, t, S) {
        label(x, 'THE CAFÉ', 270, 380, { size: 24, col: VIRC.color }); label(x, 'THE PARK', 810, 380, { size: 24, col: SAGC.color })
        R(x, INK, 40, 1100, 460, 20); R(x, '#8a5a3a', 40, 1106, 460, 14)
        sugar(x, t, 300, 1060, Math.min(7, 1 + Math.floor((t - 21.6) * 1.4)))
        star(x, t, VIR, { x: 180, y: 1000, s: 200, mood: 'squint', look: [1, 1], hops: S.hopsFor(VIR) })
        box(x, 620, 1080, 400, 26, '#8a5a3a', { b: 5 }); R(x, INK, 650, 1110, 16, 60); R(x, INK, 980, 1110, 16, 60)
        star(x, t, SAG, { x: 810, y: 980, s: 200, mood: 'wide', look: [0, -1], hops: [23, 25.5] })
        label(x, '?', 900, 820 - 8 * Math.sin(t * 3), { size: 60, col: SAGC.color, font: INTER, weight: 800 })
      },
      pis: { x: 120, y: 1300, s: 90, tears: 2, mood: 'sparkle', look: [1, -1], tissue: false } },
    // F · THE STARS (28.5–36.5)
    { at: 28.5, set: 'sky', push: 0.05,
      draw(x, t, S) {
        star(x, t, 'stars', { x: 540, y: 980, s: 380, mood: t > 32.2 ? 'happy' : 'neutral', look: [0, 0], hops: S.hopsFor('stars'), glow: 1.3 })
        star(x, t, VIR, { x: 190, y: 1210, s: 150, mood: 'neutral', look: [1, -1], hops: [33.0] })
        const k = pop01(t, 32.8, 0.3, 2) * outK(t, [35.8, 36.2])
        if (k > 0.01) { tally(x, t, 860, 1150, 'SCORE', '—', { k, col: '#6a6a8a' }); R(x, RED, 740, 1146, 240 * k, 10) }
      },
      pis: { x: 900, y: 1300, s: 110, tears: 1, mood: 'sparkle', look: [-1, -1] } },
    // G · the opener (36.5–51.5): the bench
    { at: 36.5, set: 'park', cam: [1.12, 540, 960], push: 0.05,
      draw(x, t, S) {
        const sit = ease.inOutCubic(prog(t, 36.6, 37.6))
        star(x, t, VIR, { x: lerp(-100, 400, sit), y: 990, s: 230, mood: t < 44 ? 'neutral' : 'sparkle', look: [1, 0], hops: S.hopsFor(VIR) })
        star(x, t, SAG, { x: 690, y: 990, s: 230, mood: t < 40.6 ? 'wide' : 'happy', look: [-1, 0], hops: S.hopsFor(SAG) })
        if (t > 47.6) { mug(x, t, 520, 1050, 0.8); mug(x, t, 580, 1052, 0.8, '#5fa8ff'); sparkles(x, t, 550, 1040, 47.6, 8, 90, 2) }
        mendHeart(x, t, 540, 640, 10, MEND)
      },
      pis: t => ({ x: 960, y: 1300, s: 100, tears: t < 45 ? 1 : 2, mood: 'sparkle', look: [-1, -1] }) },
    // H · the hard part (51.5–70)
    { at: 51.5, set: 'park', cam: [1.28, 540, 980], push: 0.06,
      draw(x, t, S) {
        star(x, t, VIR, { x: 400, y: 990, s: 240, mood: t < 55.4 ? 'neutral' : t < 63.6 ? 'sparkle' : 'happy', look: [1, 0], hops: S.hopsFor(VIR) })
        star(x, t, SAG, { x: 690, y: 990, s: 240, mood: t < 55.4 ? 'wide' : 'sparkle', look: [-1, 0], hops: S.hopsFor(SAG) })
        mendHeart(x, t, 540, 700, 12, MEND, { wobble: 0.5 })
        if (t > 60.4) hearts(x, t, 60.6, 540, 760, { n: 4, cell: 5, spread: 200 })
      },
      pis: t => ({ x: 920, y: 1300, s: 100, tears: t < 60 ? 2 : 3, mood: 'sparkle', look: [-1, -1] }) },
    // I · the mend (70–90): back in a café, two chairs, the ghost fades
    { at: 70.0, set: 'cafe', cam: [1.1, 540, 900], push: 0.05,
      draw(x, t, S) {
        mendHeart(x, t, 540, 560, 13, MEND)
        sparkles(x, t, 540, 560, MEND, 14, 200, 1, [GOLD, '#fff1c8', PINK])
        hearts(x, t, MEND + 0.2, 540, 520, { n: 6, cell: 7, spread: 260 })
        const g = 1 - prog(t, 74.0, 75.4)
        if (g > 0) { chair(x, 820, 1000); ghost(x, t, 820, 960, g) }
        star(x, t, VIR, { x: 280, y: 1000, s: 250, mood: t < MEND ? 'sparkle' : 'happy', look: [1, 0], hops: [...S.hopsFor(VIR), MEND + 0.1, 89.0] })
        star(x, t, SAG, { x: 620, y: 1000, s: 240, mood: 'happy', look: [-1, 0], hops: [...S.hopsFor(SAG), MEND + 0.15, 89.05] })
        cafeTable(x); mug(x, t, 400, 1100, 1); mug(x, t, 640, 1100, 1, '#5fa8ff')
        if (t > 83.4) sugar(x, t, 700, 1330, 8)
      },
      pis: t => ({ x: 960, y: 1250, s: 120, tears: 3, mood: t < MEND ? 'sparkle' : 'happy', look: [-1, 1], hops: t > MEND ? [MEND + 0.2, 84.0, 89.0] : null }) },
  ],
  overlay(x, t) {
    if (t < 46.0) tally(x, t, 820, 236, 'EX MENTIONS', tallyN(t), { k: outK(t, [45.4, 46.0]), bumpAt: [4.4, 9.4, 13.8].find(a => t >= a && t < a + 0.3) ?? -9 })
    if (t >= 44.6 && t < 46.0) label(x, 'STOPPED', 820, 300, { size: 26, col: MINT, alpha: outK(t, [45.4, 46.0]) })
    if (t >= 75.0 && t < 88.4) tally(x, t, 820, 236, 'EX MENTIONS', 0, { col: '#3fb08a', k: pop01(t, 75.0, 0.3, 2.4) * outK(t, [88.0, 88.4]) })
    if (inR(t, 71.6, 75.9)) map(x, t, pop01(t, 71.6, 0.35, 2) * outK(t, [75.5, 75.9]))
    if (inR(t, 83.8, 87.6)) bubble(x, t, 820, 1150, 84.0, 87.4, 'the sugar cubes… (sob)', { size: 30, col: '#cfe4ff' })
  },
  cues: [
    ['whoosh', 0.05, 0.5, 0.04], ['pop', 0.4, 330, 0.03, 0],
    ['pop', 4.4, 1318.51, 0.04, 0.4], ['tick', 4.42, 0.05], ['pop', 9.4, 1318.51, 0.04, 0.4], ['tick', 9.42, 0.05], ['pop', 13.8, 1318.51, 0.045, 0.4], ['tick', 13.82, 0.06],
    ['tick', 22.3, 0.03], ['tick', 23.0, 0.03], ['tick', 23.7, 0.03], ['tick', 24.4, 0.03], ['tick', 25.1, 0.03], ['tick', 25.8, 0.03],
    ['whoosh', 36.6, 0.5, 0.03], ['pop', 44.6, 659.25, 0.035, 0.4], ['pop', 47.6, 880, 0.03, 0],
    ['whoosh', 71.6, 0.4, 0.035], ['pop', 72.6, 987.77, 0.03, -0.3], ['pop', 73.2, 1174.66, 0.03, 0], ['pop', 73.8, 1318.51, 0.03, 0.3],
    ['riser', 73.5, 74.0, 0.025], ['tick', 74.0, 0.07], ['pop', 74.0, 1174.66, 0.05, 0], ['bell', 74.05, 1760, 0.035, 1.3, 0], ['glitter', 74.0, 74.6],
    ['whoosh', 74.2, 0.8, 0.02], ['pop', 75.0, 1567.98, 0.035, 0.4],
    ['pluck', 84.0, 2349.32, 0.015, 0.3, 0.6], ['pluck', 84.6, 2349.32, 0.015, 0.3, 0.6],
  ],
})
export const { DURATION, SCENES, CUES } = F
export default F
