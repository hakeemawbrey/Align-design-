// kxmle02 · MOONLIGHT LANE: SIDE STORIES · "The Odd Chair" (90 s vertical, star_advice; jazzy · Bb)
// Rows: promo/films/month2/m48.md. Engine: ../../kxmle01/scenes/sidekit.js (read-only).
//   0.0   frame 0: ♌ Leo mid-scream at Taurus' long dinner table, five couples, an empty chair, the place card
//         "LEO + ?" mid-flip in the air (caught); slam "Single at the | *couples’* dinner."; record scratch at 0.75
//   4.4   1 · THE INVITE: "bring your plus-one!" "my plus-one is *me.*" · 12.5 rehearsing "thriving" in the mirror, three
//         outfits · 20 two by two into the café… then Leo, with a bouquet bigger than them
//  26     2 · THE DINNER: game HUD "LEO · SURVIVE DINNER · ANY%", a split per "seeing anyone?" · 34 the thriving
//         speech, a bread roll goes flying, Pisces: "the couples are so *cute…*" · 41 the snowy step, the odd chair:
//         "why do I feel like the *missing* piece?"
//  48     3 · THE STARS ADVISE · 64 4 · THE TOAST: Taurus: "the chair's for your *coat,* hon." · 71 "single, and honestly
//         good. ask me about my *winter.*" · 80 LESSON · 83.5 the cocoa toast: "to everyone at this table. *whole.*"
//         hard cut on "Single isn't a | *missing* seat." Pisces cries throughout.
import { gameHud, gameHudCues, screenShake, shakeCues } from '../../hookkit.js'
import { drawLongTable } from '../../nml2e06/scenes/winter.js'
import {
  makeSide, lines, hopsOf, lane, cafe, apt, star, cry, pisces, sticker, drip,
  ML_GOLD, BONE, INK, PINK, MONO, INTER, r3, pop01, outK, bump, LANE, standY, drawSign, CAFE, APT,
  drawBubble, sparkles, drawPastry, drawMug, key, clamp, lerp, prog, ease,
} from '../../kxmle01/scenes/sidekit.js'

const L0 = lines([{ t: 2.3, who: 'leo', text: 'five couples. one me. and a *chair.*' }])
const L1 = lines([
  { t: 5.6, who: 'leo', text: 'plus-one? my plus-one is *me.*' },
  { t: 8.6, who: 'leo', text: 'and I am *great* company.' },
])
const L2 = lines([
  { t: 13.2, who: 'leo', text: 'single? by *choice,* darling.' },
  { t: 16.4, who: 'leo', text: 'single? *thriving,* actually.' },
])
const L3 = lines([{ t: 23.4, who: 'leo', text: 'I brought flowers! for the *table!*' }])
const L4 = lines([
  { t: 27.6, who: 'virgo', text: 'so, Leo… *seeing anyone?*' },
  { t: 29.6, who: 'aries', text: 'still single? *still?*' },
  { t: 31.6, who: 'gemini', text: 'what about that one from—' },
])
const L5 = lines([
  { t: 34.4, who: 'leo', text: 'single and THRIVING! never *better!*' },
  { t: 37.0, who: 'leo', text: 'LOOK AT ME *THRIVE!*' },
  { t: 39.0, who: 'pisces', text: 'the couples are so *cute…*' },
])
const L6 = lines([{ t: 42.4, who: 'leo', text: 'why do I feel like the *missing* piece?' }])
const L7 = lines([
  { t: 64.6, who: 'taurus', text: 'the chair’s for your *coat,* hon.' },
  { t: 67.0, who: 'taurus', text: 'come sit. we *saved* you soup.' },
])
const L8 = lines([
  { t: 71.6, who: 'capricorn', text: 'so… seeing anyone?' },
  { t: 73.6, who: 'leo', text: 'single, and honestly *good.*' },
  { t: 75.8, who: 'leo', text: 'ask me about my *winter.*' },
  { t: 77.8, who: 'libra', text: 'ok! how’s your *winter?*' },
])
const L9 = lines([
  { t: 83.8, who: 'leo', text: 'to everyone at this table.' },
  { t: 85.6, who: 'leo', text: '*whole.* every one of us.' },
])
const BOXES = [[L0, 2.1, 4.3], [L1, 5.4, 12.3], [L2, 13.0, 19.8], [L3, 23.2, 25.9], [L4, 27.4, 33.8], [L5, 34.2, 40.9], [L6, 42.2, 47.8], [L7, 64.4, 70.8], [L8, 71.4, 79.9], [L9, 83.6, 87.6]]
const ALL = BOXES.flatMap(b => b[0])
const H = s => hopsOf(ALL, s)
const T = { invite: 4.4, mirror: 12.5, arrive: 20.0, dinner: 26.0, speech: 34.0, step: 41.0, adv: 48.0, toast: 64.0, back: 71.0, lesson: 80.0, end: 83.5, raise: 85.5 }

// ── the dinner table: who sits where (feet 1190, behind the long table at 1185)
const SEATS = [['libra', 75], ['scorpio', 200], ['gemini', 330], ['aries', 455], ['leo', 600], ['chair', 740], ['virgo', 875], ['capricorn', 1000]]
function chair(x, cx, t, coat = false) {
  x.fillStyle = INK; x.fillRect(cx - 62, 960, 124, 230); x.fillStyle = '#8a5a3a'; x.fillRect(cx - 54, 968, 108, 222)
  x.fillStyle = '#6e4428'; for (let i = 0; i < 3; i++) x.fillRect(cx - 54, 1000 + i * 52, 108, 14)
  if (coat) { x.fillStyle = INK; x.fillRect(cx - 50, 990, 100, 150); x.fillStyle = '#c0392b'; x.fillRect(cx - 44, 996, 88, 138); x.fillStyle = ML_GOLD; x.fillRect(cx - 4, 1010, 8, 8); x.fillRect(cx - 4, 1040, 8, 8) }
}
function placeCard(x, cx, cy, rot, sx, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(sx * k, k)
  x.fillStyle = INK; x.fillRect(-150, -70, 300, 140); x.fillStyle = '#fff4dc'; x.fillRect(-142, -62, 284, 124)
  x.fillStyle = ML_GOLD; x.fillRect(-142, -62, 284, 10)
  x.fillStyle = INK; x.font = `800 54px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('LEO + ?', 0, 8)
  x.restore()
}
function dinner(x, t, o = {}) {
  const { leoMood = [[0, 'happy', undefined]], coat = false, mugs = 0, scream = false, leoSize = 240 } = o
  cafe(x, t, { snow: 0.7 })
  pisces(x, 990, 1010, 110, t, { tears: 3, look: [-1, 1], pull: bump(t, 39.4, 0.6) + bump(t, 87.6, 0.6) })
  for (const [s, cx] of SEATS) {
    if (s === 'chair') { chair(x, cx, t, coat); continue }
    const lead = s === 'leo', size = lead ? leoSize : 185
    const moods = lead ? leoMood : o.moods?.[s] || [[0, 'happy', [cx < 600 ? 1 : -1, 0]]]
    star(x, t, { sign: s, size, x: cx, y: 1190, seed: cx % 13, walk: false, hops: [...H(s), ...(lead && scream ? [0, 0.5, 2.4] : []), ...(mugs ? [T.raise + (cx % 5) * 0.05] : [])], moods })
    if (mugs) drawMug(x, cx + 40, 1040 - 70 * ease.outBack(prog(t, T.raise + (cx % 5) * 0.05, T.raise + 0.4 + (cx % 5) * 0.05)), 4, t, { col: ['#e8566e', '#7fe0ff', ML_GOLD, '#7dffb0'][cx % 4] })
  }
  drawLongTable(x, t, { y: 1185, x0: 20, x1: 1060, candles: true })
}

// ── scenes
function hook(x, t) {
  dinner(x, t, { scream: true, leoSize: 300, leoMood: [[-1, 'wide', [1, -1]], [2.3, 'squint', [1, 0]]],
    moods: { libra: [[0, 'heart', undefined]], scorpio: [[0, 'heart', undefined]], gemini: [[0, 'happy', [1, 0]]], aries: [[0, 'sparkle', [-1, 0]]], virgo: [[0, 'happy', [1, 0]]], capricorn: [[0, 'heart', undefined]] } })
  placeCard(x, 790, 800 + Math.sin(t * 3) * 14, -0.18 + t * 0.05, Math.cos((t - 0.75) * 1.6), 1.3)
  sparkles(x, t, 600, 900, -0.1, 10, 220, 2, [ML_GOLD, PINK, BONE])
}
function invite(x, t) {
  apt(x, t)
  star(x, t, { sign: 'leo', size: 240, x: APT.couch.seats[1], y: APT.couch.seatY, seed: 7, walk: false, hops: [4.9, ...H('leo')], moods: [[0, 'wide', [-1, -1]], [5.5, 'wink', [-1, -1]], [8.5, 'sparkle', [-1, -1]]] })
  const k = ease.outBack(prog(t, 4.5, 4.9)), wob = Math.sin(t * 2) * 0.02
  sticker(x, 430, 860, 'WINTER DINNER | at the café · Friday 7 PM | bring your plus-one!', { size: 40, k, rot: -0.05 + wob, bg: '#fff4dc' })
  if (t > 9.4) sticker(x, 760, 1000, 'PLUS-ONE: ME', { size: 36, k: pop01(t, 9.4, 0.3, 2.4), rot: 0.1, bg: ML_GOLD })
}
function mirror(x, t) {
  apt(x, t)
  const wear = t < 14.6 ? { hat: '#ff8fb1' } : t < 16.6 ? { scarf: '#ffd36e' } : { hat: '#7dffb0', scarf: '#c9a6ff' }
  // the mirror on the wall, Leo's reflection inside
  x.fillStyle = INK; x.fillRect(150, 520, 330, 520); x.fillStyle = ML_GOLD; x.fillRect(160, 530, 310, 500); x.fillStyle = '#bcd8f0'; x.fillRect(176, 546, 278, 468)
  x.save(); x.beginPath(); x.rect(176, 546, 278, 468); x.clip()
  star(x, t, { sign: 'leo', size: 240, x: 315, y: 1140, seed: 7, walk: false, hops: H('leo'), moods: [[0, 'wink', [1, 0]]], wear })
  x.fillStyle = 'rgba(255,255,255,0.25)'; x.fillRect(200, 560, 30, 440)
  x.restore()
  star(x, t, { sign: 'leo', size: 260, x: 700, y: 1440, seed: 7, walk: false, hops: [12.6, 14.6, 16.6, ...H('leo')], moods: [[0, 'wink', [-1, 0]], [16.3, 'sparkle', [-1, 0]]], wear })
  ;[12.6, 14.6, 16.6].forEach((a, i) => sticker(x, 830, 900, `OUTFIT ${i + 1}/3`, { size: 34, k: pop01(t, a, 0.25, 2.4) * outK(t, [a + 1.7, a + 1.95]), rot: 0.06, bg: ['#ffd2e0', ML_GOLD, '#c9f7e0'][i] }))
  sparkles(x, t, 700, 1200, 16.6, 12, 200, 5)
}
function flowers(c, cx, cy) {
  const cols = ['#ff6b9a', ML_GOLD, '#ff8a4a', '#c9a6ff', '#ffffff']
  c.fillStyle = '#3f8a4a'; c.fillRect(cx - 6, cy, 12, 90)
  for (let i = 0; i < 12; i++) { const a = i * 2.4, r = 30 + (i % 3) * 22; const fx = cx + Math.cos(a) * r, fy = cy - 30 + Math.sin(a) * r * 0.8; c.fillStyle = INK; c.fillRect(fx - 16, fy - 16, 32, 32); c.fillStyle = cols[i % 5]; c.fillRect(fx - 12, fy - 12, 24, 24); c.fillStyle = ML_GOLD; c.fillRect(fx - 4, fy - 4, 8, 8) }
}
function arrive(x, t) {
  lane(x, t, { pan: 520, depth: 0.7 }, c => {
    pisces(c, LANE.pisces.x, LANE.pisces.y + 8 + 52, 104, t, { tears: 3, look: [1, 1] })
    const pairs = [[20.2, 'libra', 'scorpio'], [21.2, 'gemini', 'aries'], [22.2, 'virgo', 'capricorn']]
    for (const [t0, a, b] of pairs) {
      for (const [s, dx] of [[a, 0], [b, 130]]) star(c, t, { sign: s, size: 180, x: [[t0, 1620 + dx], [t0 + 2.0, 975 + dx * 0.3]], on: [t0 - 1, t0 + 2.05], seed: dx + 3, moods: [[0, 'heart', [-1, 0]]] })
    }
    const lk = [[23.0, 1720], [25.2, 1200]]
    star(c, t, { sign: 'leo', size: 220, x: lk, seed: 7, hops: H('leo'), moods: [[0, 'sparkle', [-1, 0]], [25.2, 'happy', [-1, 0]]] })
    if (t > 23.0) flowers(c, key(t, lk) + 130, 1170)
  })
}
function dinnerHud(x, t) {
  dinner(x, t, { leoMood: [[0, 'happy', [1, 0]], [27.9, 'wide', [1, 0]], [29.9, 'squint', [1, 0]], [31.9, 'wide', [-1, 0]]],
    moods: { virgo: [[0, 'happy', [-1, 0]]], aries: [[0, 'sparkle', [1, 0]]], gemini: [[0, 'wink', [1, 0]]] } })
  for (const [a, cx] of [[27.6, 875], [29.6, 455], [31.6, 330]]) drawBubble(x, cx, 900, '?', { size: 44, col: '#ffd2e0', k: pop01(t, a, 0.25, 2.2) * outK(t, [a + 1.6, a + 1.8]) })
}
function speech(x, t) {
  dinner(x, t, { leoMood: [[0, 'sparkle', [0, -1]], [36.9, 'wide', [0, -1]], [38.8, 'squint', [1, 0]]],
    moods: { libra: [[0, 'wide', [1, 0]]], scorpio: [[0, 'neutral', [1, 0]]], virgo: [[0, 'wide', [-1, 0]]], capricorn: [[0, 'neutral', [-1, 0]]], aries: [[0, 'wide', [1, 0]]], gemini: [[0, 'happy', [1, 0]]] } })
  // a bread roll goes flying
  const p = prog(t, 37.5, 38.7)
  if (p > 0 && p < 1) drawPastry(x, lerp(600, 1180, p), 1000 - Math.sin(Math.PI * p) * 420, 7, 'bun')
  sticker(x, 820, 760, 'HA. HA. HA.', { size: 40, k: pop01(t, 35.6, 0.25, 2.2) * outK(t, [37.0, 37.2]), rot: 0.08, bg: ML_GOLD })
}
function step(x, t, toast = false) {
  lane(x, t, { pan: 520, depth: 0.8, time: 'late', lit: ['pisces', 'cafe', 'a4', 'c1'] }, c => {
    pisces(c, LANE.pisces.x, LANE.pisces.y + 60, 104, t, { tears: 3, look: [1, 1], pull: bump(t, 45.0, 0.6) })
    c.fillStyle = INK; c.fillRect(860, 1412, 260, 30); c.fillStyle = '#9a8aa8'; c.fillRect(864, 1416, 252, 22)
    chair(c, 1180, t, false)
    if (!toast) star(c, t, { sign: 'leo', size: 220, x: 960, seed: 7, walk: false, squash: 0.08, hops: H('leo'), moods: [[0, 'neutral', [0, 1]], [42.3, 'squint', [0, 1]]] })
    else {
      star(c, t, { sign: 'leo', size: 220, x: [[0, 900], [69.6, 900], [70.8, 980]], seed: 7, hops: [65.6, ...H('leo')], moods: [[0, 'neutral', [0, 1]], [64.4, 'wide', [1, 0]], [67.6, 'happy', [1, 0], 0.8]] })
      star(c, t, { sign: 'taurus', size: 210, x: [[64, 990], [64.6, 1060]], seed: 9, hops: H('taurus'), moods: [[0, 'happy', [-1, 0]]] })
      drawPastry(c, 1120, 1260, 7, 'bun')
      sparkles(c, t, 960, 1220, 67.6, 10, 160, 6)
    }
  })
  drip(x, LANE.pisces.x - 520, LANE.pisces.y + 120, 1380, t, toast ? 68.2 : 45.3)
}
function back(x, t) {
  dinner(x, t, { coat: true, leoMood: [[0, 'neutral', [1, 0]], [73.5, 'happy', [1, 0]], [75.7, 'sparkle', [1, 0]], [78.0, 'heart', undefined]],
    moods: { capricorn: [[0, 'happy', [-1, 0]]], libra: [[0, 'happy', [1, 0]], [77.6, 'sparkle', [1, 0]]], virgo: [[0, 'happy', [-1, 0]]] } })
  sparkles(x, t, 600, 1000, 78.0, 14, 230, 7, [ML_GOLD, PINK, BONE])
}
function ending(x, t) {
  dinner(x, t, { coat: true, mugs: 1, leoMood: [[0, 'sparkle', [0, -1]], [85.6, 'heart', undefined]],
    moods: Object.fromEntries(SEATS.map(([s, cx]) => [s, [[0, 'happy', [cx < 600 ? 1 : -1, 0]], [86.0, 'heart', undefined]]])) })
  sparkles(x, t, 540, 900, T.raise + 0.4, 18, 320, 9, [ML_GOLD, PINK, '#7fe0ff', BONE])
}

const HUD = { at: 26.3, out: [33.6, 33.9], title: 'LEO · SURVIVE DINNER · ANY%', splits: [{ at: 28.0, name: 'seeing anyone?' }, { at: 30.0, name: 'still single?' }, { at: 32.0, name: 'what about…?' }] }
const SHAKE = { at: 37.05, len: 0.5, amp: 22 }
const S = makeSide({
  id: 'kxmle02', duration: 90, lastAt: 88.3,
  music: { style: 'jazzy', key: 'Bb', seed: 4802, hits: [9.4, 37.5, 67.6, 85.5] },
  hook: { text: 'Single at the | *couples’* dinner.', size: 104 },
  rec: { at: 0.75, len: 1.4, caption: 'yep. that’s *Leo.*', sub: 'every chair comes in pairs' },
  caught: { x: 790, y: 805, r: 230, label: 'LEO + ?', arrow: 'br' },
  promise: 'wait for the *toast*',
  chapters: [{ at: T.invite, title: 'the invite' }, { at: T.dinner, title: 'the dinner', y: 300 }, { at: T.adv + 0.1, title: 'the stars advise', y: 1215 }, { at: T.toast, title: 'the toast' }],
  scenes: [[0, hook], [T.invite, invite], [T.mirror, mirror], [T.arrive, arrive], [T.dinner, dinnerHud], [T.speech, speech], [T.step, (x, t) => step(x, t, false)],
    [T.toast, (x, t) => step(x, t, true)], [T.back, back], [T.end, ending]],
  boxes: BOXES,
  caps: [
    { text: 'The invite says | *“plus one.”*', at: 4.6, out: [8.3, 8.6], late: 2, lateAt: 5.2 },
    { text: 'Rehearsing | *“thriving.”*', at: 12.7, out: [16.1, 16.4], late: 1, lateAt: 13.2 },
    { text: 'Two by two. | Then *Leo.*', at: 20.2, out: [25.5, 25.8], late: 1, lateAt: 22.9 },
    { text: 'The odd | *chair.*', kicker: 'FRIDAY · 9:40 PM', at: 41.2, out: [45.4, 45.7], size: 104, late: 1, lateAt: 41.8 },
    { text: 'One warm | *answer.*', at: 71.2, out: [73.3, 73.6], late: 1, lateAt: 71.7 },
    { text: 'Single isn’t a | *missing* seat.', at: 87.6, out: null, size: 100, late: 2, lateAt: 88.0 },
  ],
  advise: {
    at: T.adv, out: [63.55, 64.0],
    cards: [
      { at: 49.3, icon: 'heart', head: 'Single isn’t a *gap.*', body: 'Nobody at that table is half a person. Neither are you.' },
      { at: 54.3, icon: 'star', head: 'Drop the *performance.*', body: 'You don’t have to prove you’re happy. Just be there.' },
      { at: 59.3, icon: 'chat', head: 'Answer once, *warmly.*', body: '“Single, and honestly good. Ask me about my winter.”' },
    ],
    lines: [
      { t: 49.1, text: 'Leo, this one’s *yours.*' },
      { t: 51.6, text: 'a table of pairs isn’t a *test.*' },
      { t: 54.6, text: 'loud “thriving” is *tiring.*' },
      { t: 57.2, text: 'you can just… *be* there.' },
      { t: 59.6, text: 'one warm answer, then *move on.*' },
      { t: 61.6, text: 'and ask them something *back.*' },
    ],
  },
  lesson: { at: T.lesson, out: [83.25, 83.5], text: 'Nobody here | is *half.*', chip: '+1 WHOLE SEAT' },
  fx: [[gameHud, HUD, gameHudCues], [screenShake, SHAKE, shakeCues]],
  cues: [
    ['whoosh', T.invite, 0.4, 0.04], ['pop', 4.9, 1174.66, 0.045, 0], ['pop', 9.4, 1318.51, 0.045, 0.2], ['glitter', 9.4, 9.9],
    ['whoosh', T.mirror, 0.4, 0.04], ...[12.6, 14.6, 16.6].flatMap(a => [['whoosh', a, 0.25, 0.04], ['pop', r3(a + 0.1), 987.77, 0.04, 0.2]]), ['glitter', 16.6, 17.2],
    ['whoosh', T.arrive, 0.4, 0.04], ...[20.2, 21.2, 22.2, 23.0].map(a => ['pluck', a, 783.99, 0.03, 0.4, 0.2]), ['glitter', 23.4, 23.9],
    ['whoosh', T.dinner, 0.4, 0.04], ['pop', 35.6, 523.25, 0.04, 0.2], ['whoosh', 37.5, 0.5, 0.05], ['tick', 38.6, 0.05],
    ['whoosh', T.step, 0.45, 0.04], ['pluck', 45.3, 1567.98, 0.03, 0.5, -0.3],
    ['whoosh', T.toast, 0.4, 0.04], ['glitter', 67.6, 68.2], ['pluck', 68.2, 1567.98, 0.03, 0.5, -0.3],
    ['whoosh', T.back, 0.4, 0.04], ['bell', 78.0, 1567.98, 0.035, 1.4, 0], ['glitter', 78.0, 78.7],
    ['whoosh', T.end, 0.4, 0.04], ...[0, 1, 2, 3].map(i => ['pop', r3(T.raise + i * 0.06), [880, 987.77, 1174.66, 1318.51][i], 0.035, (i - 1.5) * 0.3]), ['bell', 85.9, 1760, 0.035, 1.6, 0], ['glitter', 85.9, 86.7],
  ],
})
export const { DURATION, SCENES, CUES, MUSIC, CHECK } = S
