// kare20 — THE ALMOST RELATIONSHIP, Ep 20 (long): "Pisces finally asks" (90 s vertical, star_advice; dreamy · Ab; loop).
// Pisces (crying, always) and Aquarius. Five chapter stickers; a new beat every 4–7 s.
//   0.0–6.0   COLD OPEN  Pisces mid-sob, tears flying sideways, a phone with the draft "us??". Whip zoom.
//             Hook "Pisces is asking. | *Bring tissues.*"  3.2: "(the answer is worth it.)"
//   6.0–24    1 · THE ALMOST       stargazing on the bench · shared headphones · "you're my favourite weirdo." → "I'M FINE" (sobbing)
//  24.0–42    2 · THE TISSUE COUNT  a counter climbs: almost-ask at the café (sob) · on the bench (sob) · by text ("us??" deleted)
//  42.0–56    3 · THE PEP TALK     THE STARS: "Say it *plainly.*" · "One breath. One sentence. Then *listen.*" · IN… 2… 3…
//  56.0–68    4 · THE ASK          under the lamp: one breath · "I like you. could we be… us?" · a drumroll
//  68.0–90    5 · THE ANSWER       Aquarius: "I was hoping you'd ask." · the happy-tear fountain · TISSUES: ∞ ·
//             "for the happy ones." (a tissue) · THE STARS: "Ask it plainly. Cry about it *after*. (Happy tears.)" ·
//             stargazing again. The last 0.45 s blend back into frame 0.
import { makeAlmost, drawLane, LANE, bench, drawCafe, drawCafeTable, CAFE, bedroom, star, stars, standY, say, tag, hearts, sparkles, lockPhone, prog, ease, pop01, outK, R, box, INK, BONE, GOLD, PINK, CYAN, MINT, LAV, INTER, label } from '../../kare01/scenes/almostkit.js'

const D = 90
const CH = [[6, 24, 'THE ALMOST'], [24, 42, 'THE TISSUE COUNT'], [42, 56, 'THE PEP TALK'], [56, 68, 'THE ASK'], [68, 90, 'THE ANSWER']]
const B = {
  worth: 3.2, gaze: 6, phones: 12, weird: 18.4, fine: 20.2,
  cafe: 24, sob1: 26.6, benchA: 30, sob2: 32.6, text: 36, del: 39.0,
  pep: 42, s1: 43.2, s2: 46.0, breathe: 50.5,
  ask: 56, inhale: 57, askSay: 60.4, drum: [63.6, 67.6],
  ans: 68, ansSay: 68.4, fountain: 70.2, inf: 72.4, tissue: 75, last: 79.4, gaze2: 83,
}
const SEAT = 1340
const counterAt = t => t < B.cafe ? 0 : t < B.sob1 ? 3 : t < B.sob2 ? 3 + Math.min(11, Math.floor((t - B.sob1) * 8)) : t < B.del ? 14 + Math.min(12, Math.floor((t - B.sob2) * 6)) : t < B.pep ? 26 + Math.min(11, Math.floor((t - B.del) * 6)) : 37
function notes(c, t, cx, cy) { for (let i = 0; i < 4; i++) { const p = ((t * 0.6 + i / 4) % 1); c.save(); c.globalAlpha = 1 - p; R(c, INK, cx - 40 + i * 30 - 3, cy - p * 200 - 3, 18, 18); R(c, [GOLD, PINK, CYAN, MINT][i], cx - 40 + i * 30, cy - p * 200, 12, 12); R(c, INK, cx - 40 + i * 30 + 10, cy - p * 200 - 30, 4, 30); c.restore() } }
function benchScene(c, t, { pis = {}, aq = {}, lift = 0, pan = 700 } = {}) {
  drawLane(c, t, { time: 'night', pan })
  bench(c, 540, SEAT + 20 - lift, 720)
  star(c, 'aquarius', 700, SEAT - 110 - lift, 250, t, { look: [-1, -0.3], ...aq })
  star(c, 'pisces', 380, SEAT - 110 - lift, 250, t, { tears: 3, look: [1, -0.3], box: false, ...pis })
}
const shots = [
  { a: 0, b: B.gaze, draw(c, t) {
    bedroom(c, t, { lamp: 0.3 })
    star(c, 'pisces', 360, 1260, 340, t, { tears: 3, mood: 'wide', look: [1, -0.3], squash: 0.05 * Math.sin(t * 14), hops: [0.4, 1.4, 2.4, 3.4] })
    lockPhone(c, t, 780, 1080, { w: 300, h: 540, time: 'us??', rot: 0.08, glow: 1 })
    say(c, t, 540, 1620, B.worth, B.gaze, '(the answer is worth it.)', { size: 32, col: '#ffe9b0' })
  } },
  // 1 · THE ALMOST
  { a: B.gaze, b: B.phones, draw(c, t, S) {
    benchScene(c, t, { pis: { mood: 'sparkle', look: [0.3, -1], tears: 2 }, aq: { mood: 'happy', look: [-0.3, -1] } })
    sparkles(c, t, 540, 500, S.a + 0.8, 14, 300, 2, [GOLD, BONE, CYAN])
    tag(c, t, S.a + 0.4, 540, 640, 'STARGAZING', { size: 46, rot: -0.03 })
  } },
  { a: B.phones, b: B.cafe, draw(c, t) {
    const fine = t > B.fine
    benchScene(c, t, { pis: { mood: fine ? 'wide' : 'sparkle', hops: [B.fine, B.fine + 0.4, B.fine + 0.8], tears: t > B.weird ? 3 : 2 }, aq: { mood: 'happy', hops: [B.weird] } })
    c.strokeStyle = INK; c.lineWidth = 6; c.beginPath(); c.moveTo(420, 1130); c.quadraticCurveTo(540, 1320, 660, 1130); c.stroke()
    notes(c, t, 540, 1050)
    tag(c, t, B.phones + 0.3, 540, 640, 'SHARED HEADPHONES', { size: 44, rot: 0.03, out: [B.weird - 0.3, B.weird] })
    say(c, t, 720, 900, B.weird, B.cafe, 'you’re my favourite weirdo.', { size: 30 })
    say(c, t, 360, 1010, B.fine, B.cafe, 'I’M FINE', { size: 40 })
  } },
  // 2 · THE TISSUE COUNT
  { a: B.cafe, b: B.benchA, draw(c, t) {
    drawCafe(c, t, {})
    star(c, 'pisces', CAFE.seats[0].x, standY(250, CAFE.seats[0].y), 250, t, { tears: 3, mood: t > B.sob1 ? 'wide' : 'neutral', look: [1, 0], box: true, hops: [B.sob1, B.sob1 + 0.4] })
    star(c, 'aquarius', CAFE.seats[1].x, standY(250, CAFE.seats[1].y), 250, t, { mood: 'happy', look: [-1, 0] })
    drawCafeTable(c, t, { cups: 2, pastry: 'bun' })
    say(c, t, 360, 1010, B.cafe + 1.2, B.sob1, 'so I was wonder—', { size: 30 })
    say(c, t, 360, 1010, B.sob1, B.benchA, '*sob*', { size: 44 })
  } },
  { a: B.benchA, b: B.text, draw(c, t) {
    benchScene(c, t, { pis: { mood: t > B.sob2 ? 'wide' : 'neutral', hops: [B.sob2, B.sob2 + 0.4] }, aq: { mood: 'happy' } })
    say(c, t, 380, 1010, B.benchA + 1.0, B.sob2, 'do you ever think abou—', { size: 30 })
    say(c, t, 380, 1010, B.sob2, B.text, '*SOB*', { size: 50 })
  } },
  { a: B.text, b: B.pep, draw(c, t) {
    bedroom(c, t, { lamp: 0.3 })
    const draft = t < B.del ? 'us??'.slice(0, Math.floor((t - B.text) * 3)) : 'us??'.slice(0, Math.max(0, 4 - Math.floor((t - B.del) * 6)))
    lockPhone(c, t, 700, 980, { w: 320, h: 560, time: draft || '…', glow: 0.8 })
    star(c, 'pisces', 330, 1300, 300, t, { tears: 3, mood: t > B.del ? 'squint' : 'neutral', look: [1, -0.4], hops: [B.del] })
    tag(c, t, B.del + 0.2, 540, 560, 'DELETED', { size: 52, rot: -0.04, badge: '#e8344e', n: '✗' })
  } },
  // 3 · THE PEP TALK
  { a: B.pep, b: B.ask, draw(c, t) {
    bedroom(c, t, { lamp: 0.6 })
    const br = t > B.breathe ? Math.sin((t - B.breathe) * 1.6) : 0
    star(c, 'pisces', 360, 1200, 300, t, { tears: 2, mood: t > B.breathe ? 'squint' : 'wide', look: [1, -0.6], squash: -0.08 * br })
    stars(c, 760, 900, 190, t, { pop: pop01(t, B.pep + 0.3, 0.38, 2.1), mood: 'happy', look: [-1, 0.4], hops: [B.s1, B.s2, B.s2 + 0.8] })
    if (t > B.breathe) { const n = Math.floor((t - B.breathe) / 1.3) % 3; tag(c, t, B.breathe, 540, 560, ['IN…', '2…', '3…'][n], { size: 64, rot: -0.03 }) }
  } },
  // 4 · THE ASK
  { a: B.ask, b: B.ans, draw(c, t) {
    const inh = t > B.inhale && t < B.askSay ? Math.sin(prog(t, B.inhale, B.askSay) * Math.PI) : 0
    drawLane(c, t, { time: 'night', pan: 1050 })
    const F = standY(260, LANE.feet)
    star(c, 'aquarius', 700, F, 260, t, { mood: t > B.drum[0] ? 'wide' : 'neutral', look: [-1, 0], blink: t > B.drum[0] ? false : undefined })
    star(c, 'pisces', 380, F, 260, t, { tears: 3, mood: t > B.askSay ? 'sparkle' : 'squint', look: [1, 0], squash: -0.12 * inh, hops: [B.askSay] })
    say(c, t, 400, 900, B.askSay, B.ans, 'I like you. could we be… us?', { size: 32 })
    if (t > B.drum[0]) label(c, 'drumroll…', 540, 640, { size: 48, col: GOLD, font: INTER, weight: 800, alpha: 0.6 + 0.4 * Math.sin(t * 20) })
  } },
  // 5 · THE ANSWER
  { a: B.ans, b: D + 1, draw(c, t) {
    const back = ease.inOutCubic(prog(t, D - 1.2, D - 0.5)), gaze2 = t > B.gaze2
    if (!gaze2) {
      drawLane(c, t, { time: 'night', pan: 1050 })
      const F = standY(260, LANE.feet) - 160
      star(c, 'aquarius', 700, F, 260, t, { mood: t > B.fountain ? 'heart' : 'happy', look: [-1, 0], hops: [B.ansSay, B.tissue] })
      star(c, 'pisces', 380, F, 260, t, { tears: 3, mood: 'sparkle', look: [1, 0], hops: [B.fountain, B.fountain + 0.4, B.fountain + 0.8, B.fountain + 1.2], box: t > B.tissue, pull: t > B.tissue ? prog(t, B.tissue, B.tissue + 0.5) : 0 })
      say(c, t, 700, 760, B.ansSay, B.tissue, 'I was hoping you’d ask.', { size: 32 })
      say(c, t, 700, 760, B.tissue, B.gaze2, 'for the happy ones.', { size: 30 })
      hearts(c, t, B.fountain + 0.2, 540, 1000, { n: 9 })
      for (let i = 0; i < 4; i++) sparkles(c, t, 380, 1000, B.fountain + i * 0.5, 14, 260 + i * 80, i + 1, [CYAN, BONE, PINK, LAV])
    } else {
      benchScene(c, t, { lift: 160 * (1 - back), pis: { mood: 'sparkle', look: [0.3, -1], tears: 2 }, aq: { mood: 'happy', look: [-0.3, -1] } })
      sparkles(c, t, 540, 500, B.gaze2 + 0.5, 14, 300, 2, [GOLD, BONE, CYAN])
    }
  } },
]
function ui(c, t) {
  // the tissue counter (chapter 2 on, until the answer)
  const on = t > B.cafe && t < D - 1.2
  if (!on) return
  const k = pop01(t, B.cafe + 0.4, 0.3, 2) * outK(t, [D - 1.6, D - 1.2])
  c.save(); c.translate(840, 440); c.scale(k, k)
  box(c, -170, -50, 340, 100, '#1d1540', { b: 7 })
  const v = t > B.inf ? '∞' : String(counterAt(t))
  label(c, `TISSUES: ${v}`, 0, 2, { size: 40, col: t > B.inf ? PINK : BONE, font: INTER, weight: 800 })
  c.restore()
}
const HITS = [B.gaze, B.phones, B.cafe, B.benchA, B.text, B.pep, B.ask, B.ans, B.gaze2]
function cam(t) {
  if (t < B.gaze) return { z: 1.2, fx: 540, fy: 1150, rot: 0.02 }
  const hit = HITS.reduce((m, c) => (t >= c && t - c < 0.3 ? c : m), null)
  const k = hit === null ? 0 : 1 - ease.outCubic(prog(t, hit, hit + 0.3))
  const back = ease.inOutCubic(prog(t, D - 1.2, D - 0.5))
  return { z: 1.1 + 0.1 * back + 0.02 * Math.sin(t * 0.5) + 0.08 * k, fx: 540, fy: 1150 + 0 * back, dx: 40 * k * (HITS.indexOf(hit) % 2 ? 1 : -1), rot: 0.02 * back }
}
const E = makeAlmost({
  id: 'kare20', duration: D, ending: 'loop',
  hook: 'Pisces is asking. | *Bring tissues.*', hookOut: [5.4, 5.8], hookTop: 220, hookSize: 108, hookPlate: [180, 480],
  shots, cam, ui,
  flash: t => HITS.reduce((m, c) => Math.max(m, t >= c && t < c + 0.1 ? 0.4 * (1 - (t - c) / 0.1) : 0), 0),
  fx: [
    ['whipZoom', { at: 0.1, from: 1.5, blur: 12, cx: 780, cy: 1080 }],
    ...CH.map(([a, b, title], i) => ['chapter', { at: a + 0.1, out: [b - 0.4, b - 0.1], n: i + 1, title, y: 230, color: [GOLD, PINK, CYAN, LAV, MINT][i] }]),
    ['screenShake', { at: B.sob1, len: 0.5, amp: 18 }], ['screenShake', { at: B.sob2, len: 0.6, amp: 24 }], ['screenShake', { at: B.fountain, len: 0.8, amp: 20 }],
  ],
  lines: [
    { t: B.s1, speaker: 'THE STARS', text: 'Say it *plainly.*' },
    { t: B.s2, speaker: 'THE STARS', text: 'One breath. One sentence. Then *listen.*' },
  ],
  box: { open: B.s1 - 0.22, close: B.ask - 0.3, y: 1460 },
  boxes: [{ lines: [{ t: B.last, speaker: 'THE STARS', text: 'Ask it plainly. Cry about it *after*. (Happy tears.)' }], close: B.gaze2 + 3.5, y: 1460 }],
  cues: [
    ['pop', B.worth, 659.25, 0.03, 0], ['glitter', B.gaze + 0.8, B.gaze + 1.5], ['pop', B.weird, 880, 0.035, 0.3], ['pop', B.fine, 1318.51, 0.04, -0.3],
    ['pop', B.cafe + 1.2, 659.25, 0.03, -0.3], ['boom', B.sob1, 0.12], ['pop', B.benchA + 1.0, 659.25, 0.03, -0.3], ['boom', B.sob2, 0.16],
    ...Array.from({ length: 4 }, (_, i) => ['tick', B.text + i / 3, 0.03]), ['tick', B.del, 0.05], ['boom', B.del + 0.2, 0.1],
    ['pop', B.pep + 0.3, 739.99, 0.035, 0.3], ['whoosh', B.breathe, 1.3, 0.015], ['whoosh', B.breathe + 2.6, 1.3, 0.015],
    ['riser', B.inhale, B.askSay, 0.012], ['pop', B.askSay, 880, 0.04, -0.3],
    ...Array.from({ length: 20 }, (_, i) => ['tom', B.drum[0] + i * 0.2, 140, { gain: 0.08 + i * 0.006, decay: 0.12 }]),
    ['pluck', B.ansSay, 1174.66, 0.045, 0.5, 0.3], ['pluck', B.ansSay + 0.12, 1567.98, 0.04, 0.5, 0.3], ['glitter', B.fountain, B.fountain + 2], ['pop', B.inf, 1760, 0.04, 0.4],
    ['pop', B.tissue, 987.77, 0.035, 0.3], ['glitter', B.gaze2 + 0.5, B.gaze2 + 1.2],
  ],
})
export const DURATION = E.DURATION, SCENES = E.SCENES, CUES = E.CUES
void [MINT]
