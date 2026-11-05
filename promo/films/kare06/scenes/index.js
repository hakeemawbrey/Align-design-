// kare06 — THE ALMOST RELATIONSHIP, Ep 6: "Do I get them a holiday gift?" (22 s vertical, star_advice; jazzy · G; hard cut).
//   0.0–4.0   a gift-shop aisle: Virgo frozen mid-reach for a shelf, the kit's loading bar over its head already at 64 %:
//             "overthinking…" → 99 % → "Error: it's been five weeks". Hook "Gift? No gift? | *Small gift??* Help."
//   4.0–10.0  the options pop up one by one: a SWEATER (too much?) · a MUG (too little?) · a CARD (…?)
//  10.0–13.0  the next aisle: Pisces sobbing at a snow globe: "it's so TINY."
//  13.0–22.0  THE STARS: "Ask what they're doing for the *holidays.*" · "When in doubt, ask about *their plans*, not
//             the price."  20.6 Virgo holds the card up, decided: "card. and a question." HARD CUT.
import { makeAlmost, shopAisle, star, stars, standY, say, tag, stamp, sparkles, snow, prog, ease, pop01, outK, R, box, INK, BONE, RED, GOLD, MINT, CYAN, PINK } from '../../kare01/scenes/almostkit.js'

const D = 22
const T = { bar: -2.2, opts: [4.0, 6.0, 8.0], pis: 10.0, tiny: 10.5, stars: 13.0, l1: 13.4, l2: 16.0, pick: 20.6 }
const FEET = 1640

function sweater(x, cx, cy, s) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -110, -90, 220, 190, RED, { b: 6 }); box(x, -170, -90, 60, 150, RED, { b: 6 }); box(x, 110, -90, 60, 150, RED, { b: 6 })
  for (let i = 0; i < 9; i++) R(x, BONE, -100 + i * 24, -10 + (i % 2) * 12, 14, 12)
  R(x, INK, -36, -96, 72, 20); R(x, '#ffd0d6', -30, -92, 60, 12)
  x.restore()
}
function mug(x, cx, cy, s) { x.save(); x.translate(cx, cy); x.scale(s, s); box(x, -70, -80, 140, 160, BONE, { b: 6 }); R(x, INK, 70, -46, 44, 84); R(x, BONE, 70, -32, 26, 56); R(x, RED, -50, -20, 100, 16); x.restore() }
function card(x, cx, cy, s, rot = 0) { x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s); box(x, -90, -120, 180, 240, '#fbf6ea', { b: 6 }); R(x, MINT, -70, -100, 140, 90); for (let i = 0; i < 3; i++) R(x, '#b9b0d0', -60, 20 + i * 26, 120 - i * 30, 10); R(x, RED, -16, -70, 32, 32); x.restore() }
function globe(x, t, cx, cy) {
  box(x, cx - 70, cy + 40, 140, 40, '#6b4a2f', { b: 5 })
  x.save(); x.fillStyle = INK; x.beginPath(); x.arc(cx, cy - 20, 76, 0, Math.PI * 2); x.fill(); x.fillStyle = '#a8d8ff'; x.beginPath(); x.arc(cx, cy - 20, 68, 0, Math.PI * 2); x.fill()
  x.beginPath(); x.arc(cx, cy - 20, 68, 0, Math.PI * 2); x.clip(); snow(x, t, { n: 16, y0: cy - 90, y1: cy + 50, seed: 7 }); R(x, '#eef', cx - 70, cy + 20, 140, 30); R(x, '#3f8a5a', cx - 14, cy - 30, 28, 50); x.restore()
}

const shots = [
  { a: 0, b: T.pis, draw(x, t, S) {
    shopAisle(x, t)
    const reach = t < T.opts[0]
    R(x, 'rgba(10,6,30,0.3)', 0, 0, 1080, 1920)
    star(x, 'virgo', 540, standY(400, FEET), 400, t, { mood: reach ? 'wide' : 'neutral', look: reach ? [0.8, -1] : [0, -0.6], rot: reach ? 0.2 : 0, squash: reach ? -0.08 : 0, hops: T.opts })
    const items = [['TOO MUCH?', sweater], ['TOO LITTLE?', mug], ['…JUST RIGHT?', card]]
    items.forEach(([v, draw], i) => {
      const a = T.opts[i], b = i < 2 ? T.opts[i + 1] : T.pis
      if (t < a || t >= b) return
      const k = pop01(t, a, 0.32, 2.2)
      draw(x, 540, 800, 1.6 * k)
      stamp(x, t, a + 0.55, 540, 1080, v, { size: 60, col: i === 2 ? '#2f9a62' : RED, rot: [-0.1, 0.08, -0.06][i] })
    })
    void S
  } },
  { a: T.pis, b: T.stars, draw(x, t) {
    shopAisle(x, t)
    R(x, 'rgba(10,6,30,0.3)', 0, 0, 1080, 1920)
    x.save(); x.translate(330, 1150); x.scale(1.7, 1.7); x.translate(-330, -1150); globe(x, t, 330, 1150); x.restore()
    star(x, 'pisces', 720, standY(300, FEET), 300, t, { tears: 3, mood: 'sparkle', look: [-1, -0.3], hops: [T.tiny, T.tiny + 0.6] })
    say(x, t, 620, 880, T.tiny, T.stars, 'it’s so TINY.', { size: 42 })
    sparkles(x, t, 330, 1100, T.tiny, 8, 140, 3)
  } },
  { a: T.stars, b: D + 1, draw(x, t) {
    shopAisle(x, t)
    const pick = t > T.pick
    star(x, 'virgo', 420, standY(270, FEET) - 220, 270, t, { mood: pick ? 'happy' : 'neutral', look: pick ? [1, -0.4] : [0.3, -0.8], hops: [T.pick] })
    if (pick) { card(x, 640, 1020, 0.8 * pop01(t, T.pick, 0.3, 2.4), 0.12); say(x, t, 470, 870, T.pick + 0.15, D + 1, 'card. and a question.', { size: 32 }) }
    star(x, 'pisces', 930, standY(140, FEET) - 220, 140, t, { tears: 2, mood: 'sparkle', look: [-1, -0.3], box: false })
    stars(x, 640, 560, 180, t, { pop: pop01(t, T.stars, 0.38, 2.1), mood: t > T.l2 + 1.8 ? 'happy' : 'neutral', look: [-0.3, 0.6], hops: [T.l1, T.l2, T.l2 + 0.7] })
  } },
]
function cam(t) {
  if (t < T.opts[0]) return { z: 1.12, fx: 540, fy: 1100, rot: -0.02 }
  const hit = [...T.opts, T.pis, T.stars].reduce((m, c) => (t >= c && t - c < 0.3 ? c : m), null)
  const k = hit === null ? 0 : 1 - ease.outCubic(prog(t, hit, hit + 0.3))
  return { z: 1 + 0.1 * k, dx: 50 * k }
}
const BAR = { at: T.bar, len: 6.0, label: 'overthinking…', stallAt: 99, error: 'Error: it’s been five weeks', y: 760 }
const E = makeAlmost({
  id: 'kare06', duration: D, ending: 'cut',
  hook: 'Gift? No gift? | *Small gift??* Help.', hookOut: [3.6, 3.8], hookTop: 210, hookSize: 104, hookPlate: [170, 480],
  shots, cam,
  fx: [['loadingBar', BAR], ...T.opts.map(a => ['whipZoom', { at: a, len: 0.3, from: 1.18, blur: 12, flash: 0.15 }]), ['screenShake', { at: T.tiny, len: 0.5, amp: 18 }]],
  lines: [
    { t: T.l1, speaker: 'THE STARS', text: 'Ask what they’re doing for the *holidays.*' },
    { t: T.l2, speaker: 'THE STARS', text: 'When in doubt, ask about *their plans*, not the price.' },
  ],
  cues: [
    ...T.opts.flatMap((a, i) => [['pop', a + 0.05, [1174.66, 1318.51, 1567.98][i], 0.045, 0], ['boom', a + 0.55, 0.1], ['tick', a + 0.55, 0.05]]),
    ['pop', T.tiny, 1318.51, 0.035, 0.3], ['glitter', T.tiny, T.tiny + 0.5],
    ['whoosh', T.stars - 0.1, 0.3, 0.03], ['pop', T.stars + 0.1, 739.99, 0.035, 0], ['pluck', T.pick, 1174.66, 0.04, 0.5, -0.2],
  ],
})
export const DURATION = E.DURATION, SCENES = E.SCENES, CUES = E.CUES
void [tag, outK, GOLD, CYAN, PINK]
