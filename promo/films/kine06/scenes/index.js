// kine06: IS THIS NORMAL?, "I actually like being single" (16.8 s vertical, star_advice post, music: house · A).
// The format lives in ../../kine01/normalkit.js. No end card, no card cut. Loop ending (back into frame 0).
//   0.00       frame 0: "Single and *loving* it? | Is that bad?" landed; ♐ Sagittarius mid-cartwheel across a huge bed.
//   0.60       whip zoom out: the WHOLE bed, the WHOLE pizza, the WHOLE blanket. "ALL MINE" stamps.
//   1.8–5.2    "The whole bed. | The whole *pizza.*"  Achievement: "slept diagonally". Record scratch at 3.3: a relative
//              pops in: "so… anyone *special?*" ♓ Pisces cries at how peaceful the room is.
//   5.3–9.0    NORMAL-O-METER: SO NORMAL.
//   9.1–15.0   THE STARS: "loving your own company is a *skill*, not a phase." → "the right person adds to your life.
//              they don't *start* it."  A WAITING ROOM ticket gets crossed out; Sag paints, plants, dances.
//  15.0–16.8   last line: "A full life isn't | a *waiting room.*"  Then the loop back into frame 0.
import {
  makeNormal, hook, GOLD, BONE, PINK, INK, RED, MINT, CYAN, LAV, INTER, MONO, R, box, drawBits, HEART, sparkles, confetti, hearts, bubble, label, shadow, glowAt,
  room, pop01, outK, prog, lerp, clamp, ease, r3, signStar, drawStarChar,
} from '../../kine01/normalkit.js'

const D = 16.8, FLOOR = 1440
const SAG = signStar('sagittarius')
const T = {
  whip: 0.6, stamps: [1.0, 1.3, 1.6], h0Out: [1.65, 1.8], h1: 1.8, h1Out: [5.0, 5.2], ach: 2.2, rec: 3.3, pisIn: 2.4,
  meter: 5.3, mOut: [8.9, 9.15],
  starsIn: 9.05, l1: 9.3, l2: 12.0, boxClose: 14.9, ticket: 11.0, cross: 11.5,
  last: 15.0,
}
const ACH = { at: T.ach, out: [3.15, 3.3], text: 'slept *diagonally.*', y: 1300 }
const REC = { at: T.rec, len: 1.3, caption: 'then: “so… anyone *special?*”', top: 1600 }

function bedroom(x, t) {
  room(x, { y: FLOOR, wall: '#22183f', floor: '#33264f' })
  box(x, 90, 480, 260, 300, '#24406e', { b: 8 }); glowAt(x, 220, 600, 140, '200,220,255', 0.25)
  // plants and a little shelf of books
  box(x, 860, 640, 70, 80, '#c86b4a', { b: 5 }); drawBits(x, ['G.G.G', 'GGGGG', '.GGG.', '..G..'], { G: '#5fd38a' }, 895, 600, 14)
}
function bigBed(x, t) {
  box(x, 60, 1130, 960, 80, '#5a4a9a', { b: 8, hi: '#6d5cb0' })
  box(x, 80, 1210, 920, 200, '#2e2458', { b: 8 })
  x.save(); x.fillStyle = '#ff9f6a'; x.fillRect(80, 1250, 920, 150); x.fillStyle = 'rgba(255,255,255,0.18)'; for (let i = 0; i < 8; i++) x.fillRect(110 + i * 115, 1290 + (i % 2) * 40, 60, 12); x.restore()
}
function pizza(x, cx, cy, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 96, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#e9b24a'; x.beginPath(); x.arc(0, 0, 88, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#ffcf5a'; x.beginPath(); x.arc(0, 0, 72, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 7; i++) { x.fillStyle = RED; x.beginPath(); x.arc(Math.cos(i * 0.9) * 46, Math.sin(i * 0.9) * 46, 12, 0, Math.PI * 2); x.fill() }
  x.restore()
}
function stamp(x, t, cx, cy, t0, text, rot) {
  const k = pop01(t, t0, 0.18, 3)
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * 1.3 - 0.3 * k, k * 1.3 - 0.3 * k)
  x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  const w = x.measureText(text).width + 36
  x.strokeStyle = MINT; x.lineWidth = 6; x.strokeRect(-w / 2, -32, w, 64); x.fillStyle = MINT; x.fillText(text, 0, 2)
  x.restore()
}
function ticket(x, t, cx, cy, k, crossed) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.08); x.scale(k, k)
  box(x, -170, -90, 340, 180, BONE, { b: 7 })
  x.font = `800 26px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('WAITING ROOM', 0, -50); x.font = `700 22px ${MONO}`; x.fillText('now serving: love', 0, -8); x.fillText('your number: 47', 0, 26)
  if (crossed > 0) { x.strokeStyle = RED; x.lineWidth = 14; x.lineCap = 'round'; x.beginPath(); x.moveTo(-160, 70); x.lineTo(-160 + 320 * crossed, 70 - 150 * crossed); x.stroke() }
  x.restore()
}

const EP = makeNormal({
  id: 'kine06', D, ending: 'loop', hero: 'sagittarius',
  hook: { text: 'Single and *loving* it? | Is that bad?', out: T.h0Out, accentColor: '#c79bf2' },
  whips: [{ at: T.whip, len: 0.45, from: 1.8, cx: 540, cy: 1100 }],
  rec: REC,
  fx: [[hook.achievement, hook.achievementCues, ACH]],
  heads: [{ text: 'The whole bed. | The whole *pizza.*', at: T.h1, out: T.h1Out, size: 96, accent: GOLD, late: 1, lateAt: T.h1 + 0.5 }],
  meter: { at: T.meter, land: 'so', out: T.mOut, cy: 1000 },
  lines: [
    { t: T.l1, text: 'loving your own company is a *skill,* not a phase.' },
    { t: T.l2, text: "the right person adds to your life. they don't *start* it." },
  ],
  box: { y: 1450, close: T.boxClose },
  stars: { in: T.starsIn },
  last: { text: 'A full life isn’t | a *waiting room.*', at: T.last, lateAt: T.last + 0.45, accent: GOLD, size: 94 },
  punches: [T.h1, ...T.stamps, T.meter + 1.75, T.cross],
  scene(x, t, S) {
    if (t < T.meter) {
      bedroom(x, t)
      bigBed(x, t)
      // Sag: mid-cartwheel at frame 0 (spinning across the bed), landing starfish at 0.55
      const sp = prog(t, -0.3, 0.55)
      const rot = lerp(-2.2, 0, ease.outCubic(sp)) + (t > 0.55 ? 0.05 * Math.sin(t * 3) : 0)
      const hx = lerp(360, 540, ease.outCubic(sp)), hy = lerp(1000, 1180, ease.outCubic(sp))
      x.save(); x.translate(hx, hy); x.rotate(rot); x.translate(-hx, -hy)
      S.hero(x, t, { x: hx, y: hy, s: 380, mood: t < 0.55 ? 'wide' : t > T.rec && t < T.rec + 1.3 ? 'wide' : 'happy', look: [0, 0], squash: t < 0.55 ? -0.1 : 0.1, hops: [0.55] })
      x.restore()
      pizza(x, 840, 1300, 0.9)
      if (t > T.stamps[0]) {
        stamp(x, t, 840, 1180, T.stamps[0], 'ALL MINE', -0.12)
        stamp(x, t, 300, 1120, T.stamps[1], 'ALL MINE', 0.1)
        stamp(x, t, 540, 860, T.stamps[2], 'ALL MINE', -0.05)
      }
      // the relative (record scratch beat)
      if (t > T.rec - 0.05 && t < T.meter) {
        const k = pop01(t, T.rec - 0.05, 0.2, 2.6) * outK(t, [T.meter - 0.3, T.meter])
        drawStarChar(x, 880, 900, 210, t, { color: '#e9b24a', mood: 'sparkle', look: [-1, 0.3], pop: k, seed: 9, glyph: null })
        bubble(x, t, 760, 720, T.rec + 0.05, T.meter - 0.2, 'so… anyone special?', { size: 32, tail: 0.5 })
      }
      S.pis(x, t, { x: 900, y: 1640, s: 170, pop: pop01(t, T.pisIn, 0.35, 2.2), tears: 3, mood: 'sparkle', look: [-1, -0.6], tissues: 'left', say: [T.pisIn + 0.4, T.rec, 'it’s so peaceful'], sayDx: -120, saySize: 28 })
      return
    }
    if (t < T.mOut[1]) {
      const k = outK(t, T.mOut), land = T.meter + 1.75
      S.hero(x, t, { x: 230, y: 1560, s: 170, mood: t > land ? 'sparkle' : 'wide', look: [1, -1], pop: k, hops: [land] })
      S.pis(x, t, { x: 850, y: 1560, s: 170, mood: t > land ? 'happy' : 'wide', look: [-1, -1], pop: k, tears: 3, hops: [land, land + 0.4] })
    }
    if (t >= T.mOut[0]) {
      bedroom(x, t)
      // an easel, a guitar-shaped… no: a plant, an easel with a sunset, a dancing Sag
      box(x, 660, 760, 280, 220, BONE, { b: 7 }); R(x, '#ff9f6a', 674, 774, 252, 100); R(x, '#c79bf2', 674, 874, 252, 92)
      x.save(); x.fillStyle = GOLD; x.beginPath(); x.arc(800, 874, 40, Math.PI, 0); x.fill(); x.restore()
      R(x, INK, 700, 980, 10, 200); R(x, INK, 890, 980, 10, 200)
      const k = pop01(t, T.mOut[0] + 0.1, 0.35, 2.1)
      shadow(x, 400, FLOOR - 40, 300 * k)
      const dance = t > T.cross ? 0.12 * Math.sin(t * 9) : 0
      x.save(); x.translate(400, 1150); x.rotate(dance); x.translate(-400, -1150)
      S.hero(x, t, { x: 400, y: 1150, s: 340, pop: k, mood: t > T.cross ? 'happy' : 'sparkle', look: [0.6, -0.4], hops: [T.mOut[0] + 0.2, T.cross, T.cross + 0.5, T.cross + 1.0, T.cross + 1.5, T.cross + 2.0, T.cross + 2.5] })
      x.restore()
      ticket(x, t, 540, 640, 1.4 * pop01(t, T.ticket, 0.3, 2.2) * outK(t, [T.cross + 1.2, T.cross + 1.5]), ease.outCubic(prog(t, T.cross, T.cross + 0.25)))
      if (t > T.cross) confetti(x, t, T.cross + 0.1, 540, 640)
      S.pis(x, t, { x: 890, y: 1300, s: 160, pop: pop01(t, T.mOut[0] + 0.3, 0.35, 2.2), tears: 3, mood: t > T.cross ? 'happy' : 'sparkle', look: [-1, -0.4], tissues: 'left', hops: [T.cross + 0.2, T.last + 0.4] })
      S.stars(x, t, { x: 150, y: 1280, s: 140, pop: pop01(t, T.starsIn, 0.35, 2.1), mood: t > T.cross ? 'happy' : 'neutral', look: [1, -0.3] })
    }
  },
  cues: [
    ['whoosh', 0.0, 0.4, 0.05], ['tom', 0.55, 100, { gain: 0.22, decay: 0.25 }], ['pop', 0.6, 1318.51, 0.035, 0],
    ...T.stamps.map((s, i) => ['tom', s, 140 + i * 20, { gain: 0.16, decay: 0.15 }]),
    ['pop', T.pisIn + 0.05, 987.77, 0.035, -0.4], ['pluck', T.pisIn + 0.45, 1174.66, 0.03, 0.4, -0.4],
    ['pop', T.rec + 0.05, 659.25, 0.04, 0.4],
    ['pop', T.ticket, 880, 0.035, 0], ['whoosh', T.cross, 0.25, 0.05], ['tick', T.cross + 0.2, 0.07], ['glitter', T.cross + 0.1, T.cross + 0.6],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, CYAN, LAV, HEART, sparkles, hearts, label, clamp, SAG]
