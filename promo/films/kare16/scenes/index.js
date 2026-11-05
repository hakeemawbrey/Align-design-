// kare16 — THE ALMOST RELATIONSHIP, Ep 16 (long): "Six months of almost" (90 s vertical, star_advice; lofi · E; hard cut).
// A mini-drama of one situationship (Scorpio + Taurus) in five chapter stickers; a new beat every 6–8 s.
//   0.0–6.0   COLD OPEN  the café: Scorpio mid-whip-turn, the kit's caught circle on Taurus' hand resting next to Scorpio's.
//             Hook "Six months. One question. | *Wait for it.*"
//   6.0–24    1 · THE VIBE      a shared umbrella in the rain · a second coffee ("you looked tired") · the inside joke ("THE GOAT")
//  24.0–40    2 · THE EVIDENCE  meeting the friends ("so THIS is Taurus!") · the spare mug with a T on it · the calendar: MONTH 6
//  40.0–58    3 · THE AVOIDING  almost-ask #1 (a waiter: "more water?") · #2 (a sneeze) · #3 (a bus roars past)
//  58.0–72    4 · THE ASK       THE STARS: "Say it *plainly.*" · "Ask. Then *listen* to the answer." · Scorpio: "I like you. are we dating?"
//  72.0–90    5 · THE ANSWER    Taurus: "I thought we already WERE?!" · OFFICIAL stamp · "I've been calling you my person for weeks"
//             · Scorpio faints onto the table · Pisces' fountain · THE STARS: "Six months of guessing. *One minute* of asking." HARD CUT.
// Pisces cries in every chapter (at the café window, at the party, behind the bus stop, at the answer).
import { makeAlmost, drawCafe, drawCafeTable, CAFE, drawLane, LANE, drawApartment, APT, partyRoom, calendarPage, star, stars, standY, say, tag, stamp, hearts, sparkles, prog, ease, pop01, outK, R, box, INK, BONE, RED, GOLD, CYAN, PINK, INTER } from '../../kare01/scenes/almostkit.js'

const D = 90
const CH = [[6, 24, 'THE VIBE'], [24, 40, 'THE EVIDENCE'], [40, 58, 'THE AVOIDING'], [58, 72, 'THE ASK'], [72, 90, 'THE ANSWER']]
const B = {
  umbrella: 6, coffee: 12.5, goat: 18.5,
  friends: 24, mug: 30, cal: 35,
  ask1: 40, ask2: 46, ask3: 52,
  stars: 58, s1: 58.8, s2: 61.6, breath: 64.8, ask: 66.2,
  answer: 72, ans: 72.8, official: 75.2, person: 77.4, faint: 80.6, fountain: 82.6, last: 86.4,
}
const S0 = CAFE.seats[0], S1 = CAFE.seats[1], SZ = 250

// ── helpers
const sc = (c, t, o = {}) => star(c, 'scorpio', o.x ?? S0.x, o.y ?? standY(SZ, S0.y), o.s ?? SZ, t, { look: [1, 0], ...o })
const ta = (c, t, o = {}) => star(c, 'taurus', o.x ?? S1.x, o.y ?? standY(SZ, S1.y), o.s ?? SZ, t, { look: [-1, 0], ...o })
function cafeScene(c, t, { cups = 2, sOpts = {}, tOpts = {}, pis = 2 } = {}) {
  drawCafe(c, t, {})
  star(c, 'pisces', 170, 640, 140, t, { tears: pis, mood: 'sparkle', look: [1, 0.5], box: false })    // at the café window, outside
  sc(c, t, sOpts); ta(c, t, tOpts)
  drawCafeTable(c, t, { cups, pastry: 'croissant' })
}
function rain(c, t, a = 1) { c.save(); c.globalAlpha *= a; c.fillStyle = 'rgba(190,210,255,0.55)'; for (let i = 0; i < 90; i++) { const x0 = (i * 97) % 1180 - 50, y0 = ((i * 211) % 1920 + t * 1400) % 1920; c.save(); c.translate(x0, y0); c.rotate(0.2); c.fillRect(0, 0, 4, 40); c.restore() } c.restore() }
function umbrella(c, cx, cy, w) { c.fillStyle = INK; c.beginPath(); c.arc(cx, cy, w / 2 + 8, Math.PI, 0); c.fill(); c.fillStyle = '#e8344e'; c.beginPath(); c.arc(cx, cy, w / 2, Math.PI, 0); c.fill(); for (let i = 1; i < 4; i++) { c.fillStyle = '#ff6b7f'; c.fillRect(cx - w / 2 + i * w / 4 - 4, cy - w / 2 * Math.sin(Math.acos((i * w / 4 - w / 2) / (w / 2))) + 6, 8, 20) } R(c, INK, cx - 5, cy, 10, 300) }
function mugT(c, cx, cy, s) { c.save(); c.translate(cx, cy); c.scale(s, s); box(c, -70, -80, 140, 160, BONE, { b: 6 }); R(c, INK, 70, -46, 44, 84); R(c, BONE, 70, -32, 26, 56); c.font = `800 80px ${INTER}`; c.fillStyle = RED; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('T', 0, 6); c.restore() }
function bus(c, t, t0) { const p = prog(t, t0, t0 + 1.0); if (p <= 0 || p >= 1) return; const x0 = 1400 - p * 3000; box(c, x0, 1000, 1500, 420, '#f2c75c', { b: 10, hi: '#ffe08a' }); for (let i = 0; i < 6; i++) R(c, '#7fd0ff', x0 + 60 + i * 230, 1060, 180, 140); R(c, INK, x0 + 200, 1400, 160, 60); R(c, INK, x0 + 1100, 1400, 160, 60) }

const shots = [
  // COLD OPEN
  { a: 0, b: B.umbrella, draw(c, t) {
    cafeScene(c, t, { sOpts: { mood: 'wide', look: [1, 0.6], rot: t < 1 ? -0.25 * (1 - t) : 0, hops: [0.05, 3.2] }, tOpts: { mood: 'happy', hops: [1.5, 4.0] } })
    say(c, t, 540, 960, 3.0, B.umbrella, 'six months ago…', { size: 34, col: '#ffe9b0' })
  } },
  // 1 · THE VIBE
  { a: B.umbrella, b: B.coffee, draw(c, t, S) {
    drawLane(c, t, { time: 'night', pan: 600 })
    const F = standY(240, LANE.feet), walk = S.u * 40
    sc(c, t, { x: 420 + walk, y: F, s: 240, mood: 'happy', look: [1, -0.3], hops: [S.a + 1, S.a + 2, S.a + 3, S.a + 4] })
    ta(c, t, { x: 640 + walk, y: F, s: 240, mood: 'sparkle', look: [-1, -0.3], hops: [S.a + 1.5, S.a + 2.5, S.a + 3.5] })
    umbrella(c, 530 + walk, F - 190, 520)
    rain(c, t)
    star(c, 'pisces', 900, 820, 120, t, { tears: 3, mood: 'sparkle', look: [-1, 0.5], box: false })
    tag(c, t, S.a + 0.6, 540, 640, 'ONE UMBRELLA', { size: 44, rot: -0.04 })
  } },
  { a: B.coffee, b: B.goat, draw(c, t, S) {
    cafeScene(c, t, { cups: S.u > 1.2 ? 2 : 1, sOpts: { mood: S.u > 2.2 ? 'heart' : 'sleepy', hops: [S.a + 2.2] }, tOpts: { mood: 'happy', hops: [S.a + 1.0] } })
    say(c, t, 760, 980, S.a + 1.2, S.b, 'you looked tired.', { size: 32 })
    tag(c, t, S.a + 2.6, 540, 520, 'A SECOND COFFEE', { size: 44, rot: 0.04 })
    hearts(c, t, S.a + 2.3, S0.x, 1050)
  } },
  { a: B.goat, b: B.friends, draw(c, t, S) {
    cafeScene(c, t, { sOpts: { mood: S.u > 1.4 ? 'happy' : 'neutral', hops: [S.a + 1.4, S.a + 1.7, S.a + 2.0, S.a + 2.3] }, tOpts: { mood: S.u > 1.4 ? 'happy' : 'neutral', hops: [S.a + 1.4, S.a + 1.7, S.a + 2.0, S.a + 2.3] }, pis: 3 })
    say(c, t, 330, 980, S.a + 1.2, S.b, 'THE GOAT', { size: 38 }); say(c, t, 760, 980, S.a + 1.3, S.b, 'THE GOAT', { size: 38 })
    tag(c, t, S.a + 2.6, 540, 520, 'AN INSIDE JOKE', { size: 44, rot: -0.03 })
  } },
  // 2 · THE EVIDENCE
  { a: B.friends, b: B.mug, draw(c, t, S) {
    partyRoom(c, t)
    const F = 1460
    star(c, 'leo', 180, standY(200, F), 200, t, { mood: 'happy', look: [1, 0], hops: [S.a + 0.8, S.a + 1.3] })
    star(c, 'gemini', 900, standY(200, F), 200, t, { mood: 'happy', look: [-1, 0], hops: [S.a + 1.0] })
    sc(c, t, { x: 420, y: standY(250, F), mood: 'happy', look: [1, 0] })
    ta(c, t, { x: 650, y: standY(250, F), mood: 'sparkle', look: [-1, 0], hops: [S.a + 2.2] })
    star(c, 'pisces', 960, standY(140, F - 260), 140, t, { tears: 3, mood: 'sparkle', look: [-1, 0], box: false })
    say(c, t, 260, 1020, S.a + 0.8, S.b, 'so THIS is Taurus!', { size: 32 })
    tag(c, t, S.a + 2.4, 540, 600, 'MET THE FRIENDS', { size: 44, rot: 0.03 })
  } },
  { a: B.mug, b: B.cal, draw(c, t, S) {
    drawApartment(c, t, { lamp: 0.9 })
    box(c, 560, 1000, 420, 20, '#7a4030', { b: 5 })     // a shelf
    mugT(c, 760, 920, 0.9 * pop01(t, S.a + 0.4, 0.3, 2.4))
    sc(c, t, { x: 330, y: standY(270, 1420), s: 270, mood: 'squint', look: [1, -0.6], hops: [S.a + 1.6] })
    star(c, 'pisces', 900, 1330, 150, t, { tears: 3, mood: 'wide', look: [-1, -0.6], box: false, hops: [S.a + 2.6] })
    say(c, t, 860, 1150, S.a + 2.6, S.b, 'they have a MUG.', { size: 30 })
    tag(c, t, S.a + 1.2, 540, 560, 'A SPARE MUG (T)', { size: 44, rot: -0.04 })
  } },
  { a: B.cal, b: B.ask1, draw(c, t, S) {
    drawApartment(c, t, { lamp: 0.8 })
    const months = ['MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV'], n = Math.min(6, Math.floor(S.u * 2.2))
    calendarPage(c, 540, 820, 340, { month: months[n], day: String(1 + n * 4), mark: n === 6 ? 'MONTH 6' : null, rot: 0.03 * Math.sin(t * 9) * (n < 6 ? 1 : 0) })
    sc(c, t, { x: 330, y: standY(250, 1420), mood: n === 6 ? 'wide' : 'neutral', look: [1, -0.8], hops: [S.a + 2.8] })
    ta(c, t, { x: 760, y: standY(250, 1420), mood: 'sleepy', look: [0, 0] })
  } },
  // 3 · THE AVOIDING
  { a: B.ask1, b: B.ask2, draw(c, t, S) {
    drawCafe(c, t, {})
    sc(c, t, { mood: S.u > 2.4 ? 'squint' : 'neutral', hops: [S.a + 0.6] }); ta(c, t, { mood: 'happy' })
    const wk = pop01(t, S.a + 1.8, 0.35, 2)
    if (wk > 0.01) star(c, 'virgo', 540, 900 + (1 - wk) * 500, 200, t, { mood: 'happy', look: [0, 0.5] })
    drawCafeTable(c, t, { cups: 2, pastry: null })
    say(c, t, 330, 1010, S.a + 0.6, S.a + 2.0, 'so… what are w—', { size: 32 })
    say(c, t, 640, 720, S.a + 2.0, S.b, 'more water?', { size: 32 })
    star(c, 'pisces', 170, 640, 140, t, { tears: 3, mood: 'wide', look: [1, 0.5], box: false })
  } },
  { a: B.ask2, b: B.ask3, draw(c, t, S) {
    drawCafe(c, t, {})
    const sn = S.u > 2.0 && S.u < 2.6
    sc(c, t, { mood: S.u > 2.6 ? 'squint' : 'neutral', hops: [S.a + 0.6] }); ta(c, t, { mood: sn ? 'wide' : 'happy', squash: sn ? -0.15 : 0 })
    drawCafeTable(c, t, { cups: 2, pastry: null })
    say(c, t, 330, 1010, S.a + 0.6, S.a + 2.0, 'okay. what are w—', { size: 32 })
    say(c, t, 750, 1010, S.a + 2.0, S.b, 'ACHOO!', { size: 46 })
    say(c, t, 330, 1010, S.a + 3.4, S.b, '…bless you.', { size: 30 })
    star(c, 'pisces', 170, 640, 140, t, { tears: 3, mood: 'wide', look: [1, 0.5], box: false })
  } },
  { a: B.ask3, b: B.stars, draw(c, t, S) {
    drawLane(c, t, { time: 'night', pan: 300 })
    const F = standY(250, LANE.feet)
    sc(c, t, { x: 400, y: F, mood: S.u > 2.6 ? 'squint' : 'neutral', hops: [S.a + 0.6], rot: S.u > 2.6 ? 0.15 : 0 }); ta(c, t, { x: 680, y: F, mood: 'happy' })
    star(c, 'pisces', 940, standY(150, LANE.feet), 150, t, { tears: 3, mood: 'sparkle', look: [-1, 0], box: false })
    say(c, t, 400, 1050, S.a + 0.6, S.a + 1.8, 'so what ar—', { size: 32 })
    bus(c, t, S.a + 1.8)
    say(c, t, 540, 820, S.a + 2.0, S.a + 2.8, 'VRRROOOM', { size: 54, col: '#ffe08a' })
    tag(c, t, S.a + 3.4, 540, 600, 'ALMOST-ASK #3', { size: 46, rot: 0.04, badge: RED })
  } },
  // 4 · THE ASK
  { a: B.stars, b: B.answer, draw(c, t, S) {
    drawLane(c, t, { time: 'night', pan: 300 })
    const F = standY(250, LANE.feet) - 150, asking = t > B.ask
    sc(c, t, { x: 380, y: F, mood: t > B.breath && !asking ? 'squint' : 'neutral', look: [1, -0.1], squash: t > B.breath && t < B.ask ? -0.06 * Math.sin(prog(t, B.breath, B.ask) * Math.PI) : 0, hops: [B.ask] })
    ta(c, t, { x: 700, y: F, mood: asking ? 'wide' : 'happy' })
    say(c, t, 400, 860, B.ask, B.answer, 'I like you. are we dating?', { size: 32 })
    stars(c, 540, 520, 170, t, { pop: pop01(t, B.stars, 0.38, 2.1) * outK(t, [B.ask - 0.4, B.ask]), mood: 'happy', look: [0, 0.6], hops: [B.s1, B.s2, B.s2 + 0.8] })
    star(c, 'pisces', 960, F + 50, 120, t, { tears: 2, mood: 'wide', look: [-1, 0], box: false })
    void S
  } },
  // 5 · THE ANSWER
  { a: B.answer, b: D + 1, draw(c, t, S) {
    cafeScene(c, t, { pis: t > B.fountain ? 3 : 2,
      sOpts: { y: standY(SZ, S0.y) - 150, mood: t > B.faint ? 'sleepy' : t > B.ans ? 'wide' : 'neutral', rot: t > B.faint ? -0.9 * ease.outBack(prog(t, B.faint, B.faint + 0.5)) : 0, hops: [B.official, B.person + 1.4] },
      tOpts: { y: standY(SZ, S1.y) - 150, mood: t > B.person ? 'heart' : 'wide', hops: [B.ans, B.ans + 0.4, B.person] } })
    say(c, t, 720, 880, B.ans, B.person, 'I thought we already WERE?!', { size: 32 })
    say(c, t, 680, 800, B.person, B.faint + 1.2, 'I’ve called you my person for weeks.', { size: 26 })
    say(c, t, 330, 960, B.faint + 0.3, B.last, 'six months of rehearsing…', { size: 28 })
    stamp(c, t, B.official, 540, 690, 'OFFICIAL', { size: 90, col: '#2f9a62' })
    hearts(c, t, B.person + 0.2, S1.x, 1000, { n: 7 }); hearts(c, t, B.last, 540, 1000, { n: 8 })
    if (t > B.fountain) { star(c, 'pisces', 540, 860, 230, t, { tears: 3, mood: 'sparkle', look: [0, 0.4], hops: [B.fountain, B.fountain + 0.5, B.fountain + 1.0], pop: pop01(t, B.fountain, 0.35, 2.2) }); sparkles(c, t, 540, 860, B.fountain + 0.1, 14, 300, 4) }
    void S
  } },
]
const HITS = [B.umbrella, B.coffee, B.goat, B.friends, B.mug, B.cal, B.ask1, B.ask2, B.ask3, B.stars, B.answer]
function cam(t) {
  if (t < B.umbrella) return { z: 1.3 - 0.05 * prog(t, 0, 6), fx: 560, fy: 1200, rot: -0.02 }
  const hit = HITS.reduce((m, c) => (t >= c && t - c < 0.3 ? c : m), null)
  const k = hit === null ? 0 : 1 - ease.outCubic(prog(t, hit, hit + 0.3))
  const drift = 0.03 * Math.sin(t * 0.5)
  return { z: 1.12 + drift + 0.1 * k, fx: 540, fy: 1200, dx: 50 * k * (HITS.indexOf(hit) % 2 ? 1 : -1) }
}
const E = makeAlmost({
  id: 'kare16', duration: D, ending: 'cut',
  hook: 'Six months. One question. | *Wait for it.*', hookOut: [5.4, 5.8], hookTop: 220, hookSize: 96, hookPlate: [180, 480],
  shots, cam,
  flash: t => HITS.reduce((m, c) => Math.max(m, t >= c && t < c + 0.1 ? 0.45 * (1 - (t - c) / 0.1) : 0), 0),
  fx: [
    ['whipZoom', { at: 0.08, from: 1.45, blur: 12 }],
    ['caught', { at: 0.5, x: 760, y: 1440, r: 120, ry: 90, out: [5.2, 5.5], label: '', arrow: null, rec: false }],
    ...CH.map(([a, b, title], i) => ['chapter', { at: a + 0.1, out: [b - 0.4, b - 0.1], n: i + 1, title, y: 230, color: [GOLD, PINK, CYAN, GOLD, '#7dffb0'][i] }]),
    ['screenShake', { at: B.ask3 + 1.8, len: 1.0, amp: 26 }], ['screenShake', { at: B.official, len: 0.5, amp: 22 }], ['screenShake', { at: B.fountain, len: 0.6, amp: 18 }],
  ],
  lines: [
    { t: B.s1, speaker: 'THE STARS', text: 'Six months in? Say it *plainly.*' },
    { t: B.s2, speaker: 'THE STARS', text: 'Ask. Then *listen* to the answer.' },
  ],
  box: { open: B.s1 - 0.22, close: B.s2 + 3.6, y: 1460 },
  boxes: [{ lines: [{ t: B.last, speaker: 'THE STARS', text: 'Six months of guessing. *One minute* of asking.' }], y: 1460 }],
  dom: null,
  cues: [
    ['pop', 3.0, 659.25, 0.03, 0], ['pop', B.coffee + 1.2, 880, 0.035, 0.3], ['pop', B.goat + 1.2, 1174.66, 0.04, -0.3], ['pop', B.goat + 1.3, 1174.66, 0.04, 0.3],
    ['pop', B.friends + 0.8, 987.77, 0.035, -0.4], ['pluck', B.mug + 0.4, 1567.98, 0.04, 0.5, 0.2], ['pop', B.mug + 2.6, 1318.51, 0.035, 0.4],
    ...Array.from({ length: 7 }, (_, i) => ['whoosh', B.cal + i / 2.2, 0.15, 0.02]), ['boom', B.cal + 2.8, 0.12],
    ['pop', B.ask1 + 0.6, 659.25, 0.03, -0.3], ['pop', B.ask1 + 2.0, 1318.51, 0.035, 0], ['pop', B.ask2 + 0.6, 659.25, 0.03, -0.3], ['boom', B.ask2 + 2.0, 0.12], ['pop', B.ask2 + 3.4, 587.33, 0.025, -0.3],
    ['pop', B.ask3 + 0.6, 659.25, 0.03, -0.3], ['riser', B.ask3 + 1.2, B.ask3 + 1.8, 0.015], ['whoosh', B.ask3 + 1.8, 1.0, 0.06], ['boom', B.ask3 + 2.2, 0.15],
    ['whoosh', B.stars - 0.1, 0.3, 0.03], ['pop', B.stars + 0.1, 739.99, 0.035, 0], ['riser', B.breath, B.ask, 0.012], ['pop', B.ask, 880, 0.04, -0.3],
    ['pop', B.ans, 1318.51, 0.045, 0.3], ['boom', B.official, 0.28], ['tom', B.official, 88, { gain: 0.3, decay: 0.3 }], ['bell', B.official + 0.08, 1760, 0.03, 1.2, 0],
    ['pluck', B.person, 1174.66, 0.04, 0.5, 0.3], ['tom', B.faint + 0.4, 110, { gain: 0.2, decay: 0.25 }], ['glitter', B.fountain, B.fountain + 0.8], ['pop', B.fountain, 1567.98, 0.04, 0],
  ],
})
export const DURATION = E.DURATION, SCENES = E.SCENES, CUES = E.CUES
void [APT]
