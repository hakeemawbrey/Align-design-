// kxmue02 · The Make-Up Talk: Extended, ep 2 · "Can't Unsay It" (90 s vertical, star_advice post, cinematic · Fm)
// No end card, no card transition. Hard cut on the punchline. Engine: ../../kxmue01/scenes/m47kit.js.
//   0.00   frame 0: ♈ Aries mid-gasp, red words "you're SO DRAMATIC" mid-flight across the room, ♎ Libra mid-flinch.
//          Slam "Said it. | *Can't* unsay it."  0.35 shake + RGB glitch flash, caught circle on the words.
//   2.3    promise "the apology at the end is *the good kind*"
//   3.0    1 · THE FIGHT       the tickets nobody booked → "ugh, you're SO *dramatic.*" → the word sticks to Libra (14.6)
//  19.0    2 · THE TIME-OUT    Aries tries to vacuum the words back up; the vacuum sputters
//  27.0    THE STARS           "you can't take words *back.*" / "but you can *own* them. out loud."
//  35.5    3 · THE OPENER      knock knock; "can I say something about what I *said?*"; loading "finding the brave words…"
//  50.0    4 · THE HARD PART   "I called you dramatic. it wasn't *fair.*" … "you're *exactly* enough."
//  68.5    5 · THE MEND        the sticker peels off, the heart mends 72.0, the plan card, two tickets booked together
//  88.6    last line "Take it back. | *Out loud.*"
import {
  makeM47, say, stars, star, box, R, label, hearts, sparkles, confetti, phoneSmall, mendHeart, bubble, tissues,
  signStar, INK, BONE, GOLD, PINK, RED, MINT, MONO, INTER, prog, ease, clamp, lerp, pop01, outK, inR,
} from '../../kxmue01/scenes/m47kit.js'

const ARI = 'aries', LIB = 'libra'
const ARIC = signStar(ARI), LIBC = signStar(LIB)
const MEND = 72.0
const WORDS = "you're SO DRAMATIC"

// the red words flying from (ax, ay) to (bx, by), p 0…1
function flyingWords(x, t, ax, ay, bx, by, p, { size = 54 } = {}) {
  x.save(); x.font = `800 ${size}px ${INTER}`; x.textBaseline = 'middle'; x.textAlign = 'center'
  const chars = [...WORDS]
  chars.forEach((ch, i) => {
    const q = clamp(p * 1.4 - i * 0.025)
    if (q <= 0) return
    const cx = lerp(ax, bx, q) + (i - chars.length / 2) * size * 0.42 * (1 - q * 0.6)
    const cy = lerp(ay, by, q) - 140 * Math.sin(Math.PI * q) + Math.sin(t * 9 + i) * 6
    x.save(); x.translate(cx, cy); x.rotate(Math.sin(t * 5 + i) * 0.25)
    x.fillStyle = INK; x.fillText(ch, 3, 4); x.fillStyle = RED; x.fillText(ch, 0, 0)
    x.restore()
  })
  x.restore()
}
function sticker(x, t, cx, cy, { k = 1, rot = -0.12, peel = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx + peel * 260, cy - peel * 380 * (1 - peel * 0.4)); x.rotate(rot + peel * 2.4); x.scale(k * (1 - peel * 0.5), k * (1 - peel * 0.5))
  R(x, INK, -118, -36, 236, 72); R(x, RED, -112, -30, 224, 60)
  x.font = `800 34px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('DRAMATIC', 0, 2)
  x.restore()
}
function door(x, t, cx, open = 0, knock = 0) {
  const kx = knock ? Math.sin(t * 60) * 3 * knock : 0
  R(x, INK, cx - 104, 690, 208, 490); R(x, '#2a1f40', cx - 96, 698, 192, 480)
  const w = lerp(192, 40, ease.inOutCubic(open))
  box(x, cx - 96 + kx, 698, w, 474, '#8a4a3a', { b: 0, hi: 'rgba(255,255,255,0.12)' })
  if (open < 0.5) { R(x, GOLD, cx + 60 + kx, 940, 16, 16); R(x, '#6e3a2e', cx - 70 + kx, 740, 140, 150); R(x, '#6e3a2e', cx - 70 + kx, 920 - 0, 0, 0) }
}
function vacuum(x, t, cx, cy, on) {
  const j = on ? Math.sin(t * 50) * 3 : 0
  box(x, cx - 70 + j, cy - 40, 140, 80, '#5fa8ff', { b: 6, hi: '#9fd0ff' })
  R(x, INK, cx - 50, cy + 40, 26, 26); R(x, INK, cx + 24, cy + 40, 26, 26)
  x.save(); x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.moveTo(cx - 60, cy - 30); x.quadraticCurveTo(cx - 160, cy - 120, cx - 220, cy + 40); x.stroke()
  x.strokeStyle = '#3a3170'; x.lineWidth = 7; x.stroke(); x.restore()
  box(x, cx - 270, cy + 34, 100, 24, '#3a3170', { b: 5 })
}
function tickets(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (const [dx, rot] of [[-70, -0.15], [70, 0.12]]) {
    x.save(); x.translate(dx, 0); x.rotate(rot + 0.04 * Math.sin(t * 3 + dx))
    R(x, INK, -86, -50, 172, 100); R(x, GOLD, -80, -44, 160, 88); R(x, INK, 30, -44, 4, 88)
    x.font = `800 22px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('ADMIT', -24, -10); x.fillText('ONE', -24, 18)
    x.restore()
  }
  x.restore()
}

const F = makeM47({
  id: 'kxmue02', series: 'makeup', dur: 90, ending: 'cut',
  hook: { text: 'Said it. | *Can’t* unsay it.', out: 2.9, top: 200, size: 118 },
  promise: { at: 2.3, out: [6.0, 6.3], text: 'the apology at the end is *the good kind*', top: 1290 },
  chapters: [{ at: 3.0, title: 'the fight' }, { at: 19.0, title: 'the time-out' }, { at: 35.5, title: 'the opener' }, { at: 50.0, title: 'the hard part' }, { at: 68.5, title: 'the mend' }],
  fx: [
    { k: 'whip', at: -0.1, len: 0.5, from: 1.5 },
    { k: 'shake', at: 0.3, len: 0.5, amp: 26 },
    { k: 'glitch', at: 0.55, len: 0.5, dialog: false, amp: 0.8 },
    { k: 'caught', at: 1.05, x: 560, y: 610, r: 230, ry: 120, out: [2.5, 2.65], label: 'THE LINE', arrow: 'bl' },
    { k: 'shake', at: 14.5, len: 0.45, amp: 22 },
    { k: 'loading', at: 46.6, len: 2.8, label: 'brave words…', stallAt: 100, error: null, y: 520 },
    { k: 'ach', at: 80.2, out: [83.0, 83.3], title: 'REPAIR COMPLETE', text: 'booked it *together*', icon: '♥', y: 1250 },
  ],
  lines: [
    say(3.4, LIB, 'you were supposed to book the *tickets.*'),
    say(6.8, ARI, 'and YOU were supposed to *remind* me!'),
    say(10.0, LIB, "I did. *twice.* I'm just upset, okay?"),
    say(13.2, ARI, "ugh, you're SO *dramatic.*"),
    say(16.0, LIB, '…wow.'),
    say(23.4, ARI, 'come back in, words. *please.*'),
    stars(27.6, "you can't take words *back.*"),
    stars(31.0, 'but you can *own* them. out loud.'),
    say(37.6, ARI, 'can I say something about what I *said?*'),
    say(41.0, LIB, "…okay. I'm listening."),
    say(43.8, ARI, 'no excuses first. *promise.*'),
    say(50.6, ARI, "I called you dramatic. it wasn't *fair.*"),
    say(54.4, ARI, "and it wasn't true. I'm *sorry.*"),
    say(58.0, LIB, "it hurt because I worry I'm *too much.*"),
    say(62.0, ARI, "you're not. you're *exactly* enough."),
    say(65.4, LIB, '…thank you. I needed that one.'),
    say(69.0, LIB, "and I'll say 'I'm upset' *sooner.*"),
    say(79.0, ARI, 'tickets: *booked.* by both of us.'),
  ],
  boxes: [{ from: 0, to: 5, close: 18.7 }, { from: 5, to: 6, close: 26.8 }, { from: 6, to: 8, close: 35.2 }, { from: 8, to: 11, close: 46.4 }, { from: 11, to: 16, close: 68.2 }, { from: 16, to: 17, close: 73.6 }, { from: 17, to: 18, close: 85.8 }],
  cards: [{ at: 74.0, out: [78.2, 78.6], label: 'NEW PLAN', text: 'we book it *together.* | tonight. ten minutes.', top: 470, size: 60 }],
  last: { at: 88.6, text: 'Take it back. | *Out loud.*', top: 300 },
  beats: [84.0],
  shots: [
    // A · the line flies (0–3)
    { at: 0, set: 'room', setOpts: { couch: false }, rug: true, cam: [1.1, 540, 900], push: 0.03,
      draw(x, t) {
        mendHeart(x, t, 540, 470, 11, MEND, { wobble: 1.6 })
        star(x, t, ARI, { x: 260, y: 1020, s: 260, mood: 'wide', look: [1, 0], hops: [-0.2], squash: 0.06 * Math.sin(t * 30) })
        star(x, t, LIB, { x: 820, y: 1040, s: 250, mood: 'squint', look: [-1, 0], hops: [-0.05, 1.6], squash: -0.05 })
        flyingWords(x, t, 330, 900, 760, 820, prog(t, -1.0, 1.6))
      },
      pis: { x: 960, y: 1300, s: 110, tears: 2, mood: 'wide', look: [-1, -1] } },
    // B · the fight (3–19)
    { at: 3.0, set: 'room', setOpts: { couch: false }, rug: true, cam: [1.1, 540, 900], push: 0.05,
      draw(x, t, S) {
        mendHeart(x, t, 540, 600, 11, MEND, { wobble: t > 13 ? 1.8 : 1 })
        star(x, t, ARI, { x: 280, y: 1020, s: 250, mood: t < 13.2 ? 'squint' : t < 15.5 ? 'wide' : 'neutral', look: [1, 0], hops: S.hopsFor(ARI) })
        const turn = t > 16.6
        star(x, t, LIB, { x: lerp(800, 860, ease.inOutCubic(prog(t, 16.6, 18.0))), y: 1020, s: 240, mood: t < 13.6 ? 'squint' : turn ? 'sleepy' : 'wide', zzz: false, look: turn ? [1, 1] : [-1, 0], hops: S.hopsFor(LIB) })
        if (inR(t, 13.6, 14.6)) flyingWords(x, t, 330, 900, 800, 1000, prog(t, 13.6, 14.6), { size: 44 })
        sticker(x, t, lerp(800, 860, ease.inOutCubic(prog(t, 16.6, 18.0))), 1040, { k: pop01(t, 14.6, 0.25, 2.6) })
        if (t > 14.6 && t < 18) label(x, 'thwack', 920, 900, { size: 30, col: '#ffd0c4', rot: 0.2, alpha: outK(t, [15.6, 16.0]) })
      },
      pis: t => ({ x: 960, y: 1300, s: 110, tears: t < 14.6 ? 1 : 2, mood: 'wide', look: [-1, -1] }) },
    // C · the time-out (19–27): the vacuum gag
    { at: 19.0, set: 'room', setOpts: { couch: false, lamp: false }, rug: true, cam: [1.16, 540, 980], push: 0.05,
      draw(x, t, S) {
        // red letters scattered on the rug
        x.save(); x.font = `800 46px ${INTER}`; x.textAlign = 'center'
        ;[...'DRAMATIC'].forEach((ch, i) => {
          const pull = inR(t, 20.0, 26.5) ? 0.5 + 0.5 * Math.sin(t * 7 + i) : 0
          const lx = 520 + i * 52 - pull * 30, ly = 1200 + Math.sin(i * 1.7) * 20 - pull * 14
          x.save(); x.translate(lx, ly); x.rotate(Math.sin(i * 2.1) * 0.5 + pull * 0.3); x.fillStyle = INK; x.fillText(ch, 3, 4); x.fillStyle = RED; x.fillText(ch, 0, 0); x.restore()
        })
        x.restore()
        vacuum(x, t, 380, 1150, inR(t, 20.0, 26.5))
        if (inR(t, 21.2, 26.5)) label(x, ['vrrr…', 'pfft.', 'vrrrRR…', 'pfft.'][Math.floor((t - 21.2) / 1.3) % 4], 300, 1040, { size: 36, col: BONE, rot: -0.15 })
        star(x, t, ARI, { x: 200, y: 990, s: 220, mood: t < 23.2 ? 'squint' : 'wide', look: [1, 1], hops: [20.0, 22.5, ...S.hopsFor(ARI)] })
        mendHeart(x, t, 700, 640, 10, MEND)
      },
      pis: { x: 960, y: 1300, s: 110, tears: 2, mood: 'sparkle', look: [-1, -1] } },
    // D · THE STARS (27–35.5)
    { at: 27.0, set: 'sky', push: 0.05,
      draw(x, t, S) {
        star(x, t, 'stars', { x: 540, y: 980, s: 380, mood: t > 31 ? 'happy' : 'neutral', look: [0, 0], hops: S.hopsFor('stars'), glow: 1.3 })
        star(x, t, ARI, { x: 190, y: 1210, s: 150, mood: t > 31.5 ? 'sparkle' : 'neutral', look: [1, -1], hops: [31.8] })
        const k = pop01(t, 31.4, 0.3, 2) * outK(t, [34.8, 35.2])
        if (k > 0.01) { label(x, 'OWN IT', 860, 1150, { size: 44, col: GOLD, font: INTER, weight: 800, rot: -0.1, alpha: k }) }
      },
      pis: { x: 900, y: 1300, s: 110, tears: 1, mood: 'sparkle', look: [-1, -1] } },
    // E · the opener (35.5–50): the door
    { at: 35.5, set: 'room', setOpts: { couch: false, lampX: 120 }, rug: { y: 1230 }, cam: [1.1, 540, 920], push: 0.05,
      draw(x, t, S) {
        const open = prog(t, 40.2, 40.9)
        door(x, t, 800, open, inR(t, 35.8, 37.2) ? 1 : 0)
        if (inR(t, 35.8, 37.4)) { label(x, 'knock', 660, 820, { size: 30, col: BONE, rot: -0.2 }); label(x, 'knock', 690, 880, { size: 26, col: BONE, rot: 0.15, alpha: 0.8 }) }
        if (open > 0.2) star(x, t, LIB, { x: 820, y: 1040, s: 220, pop: ease.outCubic(open), mood: t < 43.6 ? 'neutral' : 'sparkle', look: [-1, 0], hops: S.hopsFor(LIB) })
        if (open > 0.2) sticker(x, t, 820, 1060, { k: 0.8 })
        star(x, t, ARI, { x: 420, y: 1030, s: 240, mood: t < 41 ? 'squint' : 'sparkle', look: [1, 0], hops: [36.0, 36.4, ...S.hopsFor(ARI)] })
        mendHeart(x, t, 600, 600, 10, MEND)
      },
      pis: t => ({ x: 130, y: 1300, s: 100, tears: t < 44 ? 1 : 2, mood: 'sparkle', look: [1, -1] }) },
    // F · the hard part (50–68.5)
    { at: 50.0, set: 'room', setOpts: { couchX: 540, couchW: 640 }, rug: { y: 1240 }, cam: [1.28, 540, 960], push: 0.06,
      draw(x, t, S) {
        star(x, t, ARI, { x: 380, y: 1030, s: 250, mood: t < 57.8 ? 'neutral' : t < 61.8 ? 'wide' : 'sparkle', look: [1, 0], hops: S.hopsFor(ARI) })
        star(x, t, LIB, { x: 700, y: 1030, s: 250, mood: t < 57.8 ? 'sparkle' : t < 64.8 ? 'neutral' : 'happy', look: [-1, 0], hops: S.hopsFor(LIB) })
        sticker(x, t, 700, 1050, { k: 0.8, rot: -0.12 + 0.03 * Math.sin(t * 2) })
        mendHeart(x, t, 540, 720, 12, MEND, { wobble: 0.5 })
        if (t > 62.6) hearts(x, t, 62.8, 540, 780, { n: 4, cell: 5, spread: 200 })
      },
      pis: t => ({ x: 900, y: 1290, s: 100, tears: t < 58 ? 2 : 3, mood: 'sparkle', look: [-1, -1] }) },
    // G · the mend (68.5–90)
    { at: 68.5, set: 'room', setOpts: { couchX: 540, couchW: 640 }, rug: { y: 1240 }, cam: [1.12, 540, 920], push: 0.05,
      draw(x, t, S) {
        mendHeart(x, t, 540, 560, 13, MEND)
        sparkles(x, t, 540, 560, MEND, 14, 200, 1, [GOLD, '#fff1c8', PINK])
        hearts(x, t, MEND + 0.2, 540, 520, { n: 6, cell: 7, spread: 260 })
        star(x, t, ARI, { x: 330, y: 1020, s: 250, mood: 'happy', look: [1, 0], hops: [...S.hopsFor(ARI), MEND + 0.1, 81.0, 89.0] })
        star(x, t, LIB, { x: 750, y: 1020, s: 250, mood: t < 70.6 ? 'sparkle' : 'happy', look: [-1, 0], hops: [...S.hopsFor(LIB), MEND + 0.15, 81.1, 89.05] })
        sticker(x, t, 750, 1040, { k: t < 71.6 ? 0.8 : 0, peel: ease.inCubic(prog(t, 70.3, 71.6)) })
        tickets(x, t, 540, 1150, pop01(t, 79.6, 0.35, 2.2))
        confetti(x, t, 80.2, 540, 900)
        if (t > 83.4) { tissues(x, 860, 1330, 70); for (let i = 0; i < 4; i++) tissues(x, 800 + i * 40, 1360 - (i % 2) * 30, 50) }
      },
      pis: t => ({ x: 960, y: 1270, s: t > 83.4 ? 130 : 110, tears: 3, mood: t < MEND ? 'sparkle' : 'happy', look: [-1, -1], hops: t > MEND ? [MEND + 0.2, 84.0, 89.0] : null }) },
  ],
  overlay(x, t) {
    if (t > 83.6 && t < 87.6) bubble(x, t, 820, 1150, 83.8, 87.4, "I'm FINE. (sob)", { size: 32, col: '#cfe4ff' })
  },
  cues: [
    ['whoosh', 0.05, 0.5, 0.04], ['pop', 0.6, 220, 0.04, 0],
    ['whoosh', 13.6, 0.8, 0.035], ['pop', 14.6, 196, 0.06, 0.3], ['tick', 14.62, 0.07],
    ['riser', 20.0, 21.2, 0.015], ['tick', 21.3, 0.04], ['tick', 22.6, 0.04], ['tick', 23.9, 0.04], ['tick', 25.2, 0.04],
    ['tick', 35.9, 0.07], ['tick', 36.25, 0.07], ['tick', 36.6, 0.07], ['whoosh', 40.2, 0.5, 0.03],
    ['whoosh', 70.3, 0.6, 0.035], ['pop', 71.6, 880, 0.03, 0.4],
    ['riser', 71.5, 72.0, 0.025], ['tick', 72.0, 0.07], ['pop', 72.0, 1174.66, 0.05, 0], ['bell', 72.05, 1760, 0.035, 1.3, 0], ['glitter', 72.0, 72.6],
    ['pop', 79.6, 987.77, 0.035, 0], ['pop', 79.75, 1318.51, 0.035, 0],
    ['pluck', 84.0, 2349.32, 0.015, 0.3, 0.6], ['pluck', 84.6, 2349.32, 0.015, 0.3, 0.6],
  ],
})
export const { DURATION, SCENES, CUES } = F
export default F
