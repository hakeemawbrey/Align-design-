// kxmle06 · MOONLIGHT LANE: SIDE STORIES · "The No-Cry Week" (90 s vertical, star_advice; chiptune · C)
// Rows: promo/films/month2/m48.md. Engine: ../../kxmle01/scenes/sidekit.js (read-only).
//   0.0   frame 0: ♓ Pisces mid-sob behind huge sunglasses on the lane at night, a game HUD "PISCES · NO-CRY WEEK"
//         four seconds in, a red FAILED stamp mid-slam; caught circle on one tear sneaking out; slam "A whole week of |
//         *not crying.*"; record scratch at 0.75
//   4.4   1 · WHAT THEY HEARD: Leo: "Pisces cries at *literally* everything!" · 12.5 the rules poster + HUD splits
//         (no sad films · no sunsets · no puppies) · 20 day 1: the sunset, sunglasses on, "it's *allergies.*"
//  26     2 · THE WEEK: day 3, Libra's flower, holding it in · 34 day 5: "movie night! your seat's saved" → "can't. busy."
//         · 41 alone upstairs, laughter through the floor: Pisces finally cries, the sad kind
//  48     3 · THE STARS ADVISE · 64 4 · MOVIE NIGHT: "did you mean that as a joke? it *stuck* with me." Leo: "it's my
//         *favourite* thing about you." · 72 the sad part: everyone cries; Pisces passes the tissue box down the row
//  80     LESSON · 83.5 the HUD returns: NO-CRY WEEK · ABANDONED, best run · hard cut on "Not too much. | *Just enough.*"
import { gameHud, gameHudCues, notification, notificationCues } from '../../hookkit.js'
import { starFrame, inSprite } from '../../mlpilot/scenes/mlkit.js'
import {
  makeSide, lines, hopsOf, lane, cafe, apt, star, cry, pisces, sticker, phone,
  ML_GOLD, BONE, INK, PINK, MONO, INTER, r3, pop01, outK, bump, LANE, standY, drawSign, CAFE, APT,
  drawCafeTable, drawBubble, sparkles, drawBlanket, key, clamp, lerp, prog, ease, signStar,
} from '../../kxmle01/scenes/sidekit.js'

const TAU_S = signStar('taurus')
const L0 = lines([{ t: 2.3, who: 'pisces', text: 'I cry at *everything.* is that… too *much?*' }])
const L1 = lines([
  { t: 5.4, who: 'leo', text: 'Pisces cries at *literally* everything!' },
  { t: 8.6, who: 'pisces', text: '(…is that *bad?*)' },
])
const L2 = lines([{ t: 18.0, who: 'pisces', text: 'day one. I can *do* this.' }])
const L3 = lines([{ t: 23.4, who: 'pisces', text: 'it’s… *allergies.*' }])
const L4 = lines([
  { t: 27.0, who: 'libra', text: 'for you! just *because.*' },
  { t: 30.0, who: 'pisces', text: '(mmmMMMPH.)' },
])
const L5 = lines([
  { t: 36.6, who: 'pisces', text: 'can’t. *busy.*' },
  { t: 38.6, who: 'pisces', text: '(busy… not crying.)' },
])
const L6 = lines([{ t: 43.6, who: 'pisces', text: 'I miss them. and I’m *so* tired.' }])
const L7 = lines([
  { t: 64.8, who: 'pisces', text: 'was that a joke? it *stuck* with me.' },
  { t: 67.4, who: 'leo', text: 'Pisces. it’s my *favourite* thing about you.' },
  { t: 69.9, who: 'leo', text: 'you cry so we’re not sad *alone.*' },
])
const L8 = lines([
  { t: 76.6, who: 'virgo', text: '…tissue?' },
  { t: 78.0, who: 'pisces', text: 'always *ready.*' },
])
const L9 = lines([{ t: 84.2, who: 'pisces', text: 'no-cry week? *cancelled.*' }])
const BOXES = [[L0, 2.1, 4.3], [L1, 5.2, 12.3], [L2, 17.8, 19.8], [L3, 23.2, 25.9], [L4, 26.8, 33.8], [L5, 36.4, 40.9], [L6, 43.4, 47.8], [L7, 64.6, 71.8], [L8, 76.4, 79.9], [L9, 84.0, 87.4]]
const ALL = BOXES.flatMap(b => b[0])
const H = s => hopsOf(ALL, s)
const T = { heard: 4.4, rules: 12.5, day1: 20.0, day3: 26.0, day5: 34.0, alone: 41.0, adv: 48.0, ask: 64.0, movie: 72.0, sad: 74.0, lesson: 80.0, end: 83.5 }

/** huge sunglasses on a star sprite (36-cell grid, eyes ≈ row 20) */
function shades(c, x, y, size, t, opts = {}) {
  const F = starFrame(x, y, size, t, opts)
  inSprite(c, F, () => {
    c.fillStyle = INK; c.fillRect(6.5, 16.5, 10.5, 7); c.fillRect(19, 16.5, 10.5, 7); c.fillRect(16, 17.5, 4, 1.6)
    c.fillStyle = '#2a2050'; c.fillRect(7.5, 17.5, 8.5, 5); c.fillRect(20, 17.5, 8.5, 5)
    c.fillStyle = 'rgba(255,255,255,0.55)'; c.fillRect(8.5, 18.2, 2, 1.2); c.fillRect(21, 18.2, 2, 1.2)
  })
}
function tissueBox(x, cx, cy, s = 6) { x.fillStyle = INK; x.fillRect(cx - 6 * s, cy - 4 * s, 12 * s, 8 * s); x.fillStyle = '#9fd8ff'; x.fillRect(cx - 5 * s, cy - 3 * s, 10 * s, 6 * s); x.fillStyle = INK; x.fillRect(cx - 2 * s, cy - 7 * s, 4 * s, 4 * s); x.fillStyle = '#fffaf2'; x.fillRect(cx - 1.5 * s, cy - 6.5 * s, 3 * s, 3.5 * s) }
const PIS = (c, t, spec) => star(c, t, { sign: 'pisces', seed: 12, ...spec })

function hook(x, t) {
  lane(x, t, { pan: 640, depth: 0.6, moon: { x: 820, y: 460, r: 120 } }, c => {
    PIS(c, t, { size: 330, x: 1180, walk: false, tears: 3, box: false, hops: [0, 0.35, 2.3, 2.9], moods: [[-1, 'squint', undefined]] })
    shades(c, 1180, standY(330, LANE.feet), 330, t, { hops: [0, 0.35, 2.3, 2.9], seed: 12 })
  })
  const k = ease.outBack(prog(t, -0.35, 0.05))
  sticker(x, 300, 1100, 'FAILED', { size: 84, bg: '#ff3b3b', fg: '#ffffff', rot: -0.16, k: 1 + 0.8 * (1 - k) })
}
function heard(x, t) {
  cafe(x, t, { behind: c => drawSign(c, 'taurus', CAFE.counter.x + 80, standY(200, CAFE.counter.y), 200, t, { mood: t > 5.6 ? 'happy' : 'neutral', look: [-1, 1], seed: 9, hops: [6.2, 6.6] }) })
  const S0 = CAFE.seats[0], S1 = CAFE.seats[1]
  PIS(x, t, { size: 220, x: S0.x, y: S0.y, walk: false, tears: t > 8.4 ? 1 : 0, hops: H('pisces'), moods: [[0, 'happy', [1, 0]], [6.6, 'wide', [1, 0]], [8.4, 'squint', [0, 1]]] })
  star(x, t, { sign: 'leo', size: 220, x: S1.x, y: S1.y, seed: 7, walk: false, hops: [6.4, 6.8, 7.2, ...H('leo')], moods: [[0, 'happy', [-1, 0]], [6.2, 'sparkle', undefined]] })
  drawCafeTable(x, t, { cups: 2, pastry: 'bun' })
  ;[[6.3, 760, 'HAHA'], [6.6, 900, 'haha!'], [6.9, 640, 'so true!']].forEach(([a, bx, s]) => drawBubble(x, bx, 980 - (bx % 3) * 40, s, { size: 32, col: '#ffe27a', k: pop01(t, a, 0.25, 2.2) * outK(t, [a + 1.8, a + 2.0]) }))
  sticker(x, S0.x, 1000, 'too much?', { size: 34, bg: '#c9b8ff', rot: -0.06, k: pop01(t, 9.6, 0.3, 2.2) })
}
function rules(x, t) {
  apt(x, t)
  x.fillStyle = INK; x.fillRect(120, 470, 520, 640); x.fillStyle = '#fff4dc'; x.fillRect(130, 480, 500, 620)
  x.fillStyle = '#d8455f'; x.font = `800 52px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('NO-CRY WEEK', 380, 550)
  ;[[14.6, 'no sad films'], [15.8, 'no sunsets'], [17.0, 'no puppies']].forEach(([a, s], i) => {
    if (t < a) return
    x.fillStyle = INK; x.font = `700 40px ${INTER}`; x.fillText(`${i + 1}. ${s}`, 380, 680 + i * 120)
    x.strokeStyle = '#d8455f'; x.lineWidth = 6; x.strokeRect(170, 650 + i * 120, 60 * clamp((t - a) / 0.3), 0.1)
  })
  PIS(x, t, { size: 250, x: 820, y: 1440, walk: false, tears: 0, hops: [14.6, 15.8, 17.0, ...H('pisces')], moods: [[0, 'squint', [-1, -1]], [18.0, 'sparkle', [-1, 0]]] })
}
function day1(x, t) {
  lane(x, t, { pan: 640, time: 'dusk', depth: 0.5, flakes: 50 }, c => {
    const B = LANE.bench
    PIS(c, t, { size: 220, x: B.seats[1], y: B.seatY, walk: false, tears: t > 22.6 ? 1 : 0, box: false, hops: [22.6, ...H('pisces')], moods: [[0, 'neutral', [0, -1]], [22.6, 'squint', undefined]] })
    shades(c, B.seats[1], standY(220, B.seatY), 220, t, { hops: [22.6, ...H('pisces')], seed: 12 })
  })
  sticker(x, 300, 1100, 'SUNSET: 0 · PISCES: 1', { size: 30, bg: '#ffd2a8', rot: -0.05, k: pop01(t, 23.0, 0.3, 2.2) })
}
function day3(x, t) {
  lane(x, t, { pan: 1080, time: 'night', depth: 0.6 }, c => {
    star(c, t, { sign: 'libra', size: 220, x: 1760, seed: 10, walk: false, hops: [27.2, ...H('libra')], moods: [[0, 'happy', [1, 0]], [29.0, 'wide', [1, 0]]], wear: { hat: '#7dffb0' } })
    const puff = key(t, [[28.4, 1], [31.0, 1.14], [33.0, 1.2]], ease.inOutQuad)
    PIS(c, t, { size: 220 * puff, x: 1960, walk: false, tears: 0, blush: clamp((t - 28.4) / 2), squash: -0.04, moods: [[0, 'sparkle', [-1, 0]], [28.4, 'squint', undefined]] })
    const fk = pop01(t, 27.4, 0.3, 2)
    if (fk > 0.01) { c.fillStyle = INK; c.fillRect(1860, 1150, 50, 50); c.fillStyle = '#ffb3d9'; c.fillRect(1864, 1154, 42, 42); c.fillStyle = ML_GOLD; c.fillRect(1878, 1168, 14, 14); c.fillStyle = '#3f8a4a'; c.fillRect(1881, 1200, 8, 70) }
  })
  sticker(x, 300, 860, `HOLDING IT IN… ${Math.min(99, Math.floor(clamp((t - 28.4) / 4.5) * 99))}%`, { size: 32, bg: '#ffd2e0', rot: -0.05, k: pop01(t, 28.6, 0.3, 2) })
}
function day5(x, t) {
  apt(x, t)
  PIS(x, t, { size: 240, x: APT.couch.seats[1], y: APT.couch.seatY, walk: false, tears: t > 38.4 ? 1 : 0, hops: [34.5, ...H('pisces')], moods: [[0, 'neutral', [-1, -1]], [34.5, 'wide', [-1, -1]], [36.4, 'squint', [-1, 0]]] })
  phone(x, 360, 900, 380, 560, t, { title: `${TAU_S.glyph}︎ Taurus`, msgs: [{ at: 34.6, side: 'L', text: 'movie night! your seat’s saved :)' }, { at: 36.8, side: 'R', text: 'can’t. busy.' }], alpha: clamp((t - 35.0) / 0.25) })
}
function alone(x, t) {
  apt(x, t, { lamp: 0.35, time: 'late' })
  for (let i = 0; i < 6; i++) { const a = 41.6 + i * 1.0, p = prog(t, a, a + 2.4); if (p > 0 && p < 1) { x.save(); x.globalAlpha = 1 - p; drawBubble(x, 200 + (i * 173) % 700, 1700 - p * 700, i % 2 ? 'haha!' : 'HAHA', { size: 28, col: '#ffe27a' }); x.restore() } }
  PIS(x, t, { size: 250, x: 560, y: 1440, walk: false, squash: 0.08, tears: t > 43.4 ? 3 : 1, pull: bump(t, 45.6, 0.6), hops: H('pisces'), moods: [[0, 'neutral', [0, 1]], [43.4, 'squint', undefined]] })
  sticker(x, 860, 1100, 'the real kind', { size: 28, bg: '#c9b8ff', rot: 0.06, k: pop01(t, 44.6, 0.3, 2) })
}
function ask(x, t) {
  cafe(x, t, { lights: 0.8, behind: c => drawSign(c, 'taurus', CAFE.counter.x + 80, standY(200, CAFE.counter.y), 200, t, { mood: 'happy', look: [-1, 1], seed: 9 }) })
  const S0 = CAFE.seats[0], S1 = CAFE.seats[1]
  PIS(x, t, { size: 220, x: [[64, 120], [64.5, S0.x]], y: S0.y, tears: t > 67.6 ? 3 : 1, hops: H('pisces'), moods: [[0, 'neutral', [1, 0]], [67.6, 'wide', [1, 0]], [70.0, 'happy', undefined]] })
  star(x, t, { sign: 'leo', size: 220, x: S1.x, y: S1.y, seed: 7, walk: false, hops: H('leo'), moods: [[0, 'happy', [-1, 0]], [66.6, 'wide', [-1, 0]], [67.4, 'sparkle', [-1, 0]], [69.9, 'heart', undefined]] })
  drawCafeTable(x, t, { cups: 2, pastry: null })
  sparkles(x, t, 540, 1100, 70.0, 14, 230, 3, [PINK, ML_GOLD, BONE])
}
const ROW = [['libra', 110], ['virgo', 270], ['leo', 430], ['pisces', 590], ['taurus', 760], ['gemini', 930]]
function movie(x, t, end = false) {
  cafe(x, t, { lights: 0.3, view: 'late' })
  // the film's light on everyone
  const hue = (Math.sin(t * 1.7) + 1) / 2
  x.fillStyle = `rgba(${Math.round(120 + 100 * hue)},${Math.round(140 + 60 * (1 - hue))},255,0.12)`; x.fillRect(0, 0, 1080, 1920)
  const sad = end || t > T.sad
  for (const [s, cx] of ROW) {
    const isP = s === 'pisces'
    star(x, t, { sign: s, size: 175, x: cx, y: 1410, seed: cx % 11, walk: false, tears: isP ? 3 : undefined, box: false, hops: isP ? [...H('pisces'), ...(end ? [84.4, 85.0, 86.0, 87.9] : [])] : H(s),
      moods: [[0, end ? 'happy' : 'neutral', [0, -1]], ...(sad ? [[T.sad, isP && end ? 'happy' : 'squint', undefined]] : [])] })
    if (!isP && sad) cry(x, cx, standY(175, 1410), 175, t, end ? 1 : 2, { seed: cx % 11 })
  }
  drawBlanket(x, 30, 1395, 1020, 70, t, { col: '#5a3a7a' })
  if (!end) { const bx = key(t, [[75.0, 590], [76.4, 270], [78.0, 270], [79.2, 760]]); tissueBox(x, bx, 1370 - 30 * Math.abs(Math.sin(t * 6)) * (t > 75 && t < 79.4 ? 1 : 0)) }
  else tissueBox(x, 590 + 90, 1370)
}

const HUD0 = { at: -1, out: [3.3, 3.5], start: -4.06, title: 'PISCES · NO-CRY WEEK', splits: [{ at: 0.6, name: 'one tear', best: false }], color: '#ff8fb1' }
const HUD1 = { at: 13.2, out: [19.6, 19.9], title: 'NO-CRY WEEK · ANY%', splits: [{ at: 14.6, name: 'no sad films' }, { at: 15.8, name: 'no sunsets' }, { at: 17.0, name: 'no puppies' }] }
const HUD2 = { at: 84.0, out: [87.3, 87.55], title: 'NO-CRY WEEK · ABANDONED', splits: [{ at: 84.8, name: 'best run' }], color: ML_GOLD }
const NOTIF = { at: 34.4, out: [36.2, 36.5], title: 'texts', body: 'Taurus: movie night! your seat’s *saved.*', glyph: TAU_S.glyph }
const S = makeSide({
  id: 'kxmle06', duration: 90, lastAt: 88.3,
  music: { style: 'chiptune', key: 'C', seed: 4806, hits: [6.3, 43.4, 67.4, 74.0] },
  hook: { text: 'A whole week of | *not crying.*', size: 108, top: 330 },
  rec: { at: 0.75, len: 1.4, caption: 'yep. that’s *Pisces.*', sub: 'four seconds in' },
  caught: { x: 640, y: 1200, r: 120, label: 'ONE TEAR', arrow: 'br' },
  promise: 'wait for movie *night*',
  chapters: [{ at: T.heard, title: 'what they heard' }, { at: T.day3, title: 'the week', y: 1215 }, { at: T.adv + 0.1, title: 'the stars advise', y: 1215 }, { at: T.ask, title: 'movie night' }],
  scenes: [[0, hook], [T.heard, heard], [T.rules, rules], [T.day1, day1], [T.day3, day3], [T.day5, day5], [T.alone, alone], [T.adv, alone], [T.ask, ask], [T.movie, (x, t) => movie(x, t, false)], [T.end, (x, t) => movie(x, t, true)]],
  boxes: BOXES,
  caps: [
    { text: 'What they | *heard.*', kicker: 'EARLIER · THE CAFÉ', at: 4.6, out: [8.2, 8.5], late: 1, lateAt: 5.1 },
    { text: 'The *rules.*', at: 12.7, out: [14.4, 14.7], size: 104, late: 1, lateAt: 13.0 },
    { text: 'The *sunset.*', kicker: 'DAY 1', at: 20.2, out: [23.2, 23.5], size: 104, late: 1, lateAt: 20.6 },
    { text: 'Holding | *it in.*', kicker: 'DAY 3', at: 26.2, out: [29.6, 29.9], late: 1, lateAt: 26.8 },
    { text: 'The empty | *seat.*', kicker: 'DAY 5 · 9 PM', at: 41.2, out: [43.2, 43.5], late: 1, lateAt: 41.8 },
    { text: 'The *sad* part.', kicker: 'MOVIE NIGHT', at: 72.2, out: [75.8, 76.1], size: 100, late: 0 },
    { text: 'Not too much. | *Just enough.*', at: 87.6, out: null, size: 100, late: 2, lateAt: 88.0 },
  ],
  advise: {
    at: T.adv, out: [63.55, 64.0],
    cards: [
      { at: 49.3, icon: 'heart', head: 'Your soft isn’t *too much.*', body: 'Feeling deeply is a gift, not a flaw to manage.' },
      { at: 54.3, icon: 'door', head: 'Don’t shrink to *fit.*', body: 'Hiding the real you means they miss the real you.' },
      { at: 59.3, icon: 'chat', head: 'Check what they *meant.*', body: '“Was that a joke? It stuck with me.”' },
    ],
    lines: [
      { t: 49.1, text: 'Pisces, this one’s *yours.*' },
      { t: 51.6, text: 'big feelings aren’t a *problem.*' },
      { t: 54.6, text: 'a week of hiding is *lonely.*' },
      { t: 57.2, text: 'your friends want *you,* tears too.' },
      { t: 59.6, text: 'one line isn’t the *whole* story.' },
      { t: 61.6, text: 'ask them what they *meant.*' },
    ],
  },
  lesson: { at: T.lesson, out: [83.25, 83.5], text: 'Feel it *all.* | Out loud.', chip: '+1 TISSUE BOX (SHARED)' },
  fx: [[gameHud, HUD0, null], [gameHud, HUD1, gameHudCues], [notification, NOTIF, notificationCues], [gameHud, HUD2, gameHudCues]],
  cues: [
    ['boom', 0.0, 0.08], ['chip', 0.6, 220, 0.25, { gain: 0.03 }],
    ['whoosh', T.heard, 0.4, 0.04], ...[6.3, 6.6, 6.9].map((a, i) => ['pop', a, [880, 987.77, 1174.66][i], 0.035, (i - 1) * 0.3]), ['pop', 9.6, 392, 0.04, -0.2],
    ['whoosh', T.rules, 0.4, 0.04], ['whoosh', T.day1, 0.45, 0.04], ['pop', 22.6, 1567.98, 0.03, 0.2], ['pop', 23.0, 523.25, 0.035, -0.2],
    ['whoosh', T.day3, 0.4, 0.04], ['pop', 27.4, 1318.51, 0.04, 0.2], ['riser', 28.4, 33.0, 0.012],
    ['whoosh', T.day5, 0.4, 0.04], ['pop', 36.8, 880, 0.04, 0.25],
    ['whoosh', T.alone, 0.45, 0.035], ...[41.6, 42.6, 43.6, 44.6, 45.6, 46.6].map(a => ['pop', a, 1046.5, 0.02, 0.2]), ['pluck', 43.6, 1567.98, 0.03, 0.5, -0.2],
    ['whoosh', T.ask, 0.4, 0.04], ['bell', 69.9, 1760, 0.035, 1.4, 0], ['glitter', 70.0, 70.7],
    ['whoosh', T.movie, 0.45, 0.04], ['pluck', T.sad, 1567.98, 0.03, 0.6, -0.3], ['pluck', T.sad + 0.3, 1396.91, 0.03, 0.6, 0.3], ['whoosh', 75.0, 0.3, 0.03], ['whoosh', 78.0, 0.3, 0.03],
    ['whoosh', T.end, 0.4, 0.04], ['glitter', 84.8, 85.4], ['pluck', 87.9, 1567.98, 0.03, 0.5, 0.3],
  ],
})
export const { DURATION, SCENES, CUES, MUSIC, CHECK } = S
