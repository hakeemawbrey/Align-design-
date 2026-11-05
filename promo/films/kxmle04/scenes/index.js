// kxmle04 · MOONLIGHT LANE: SIDE STORIES · "The 3 A.M. Bakery" (90 s vertical, star_advice; dreamy · Db)
// Rows: promo/films/month2/m48.md. Engine: ../../kxmle01/scenes/sidekit.js (read-only).
//   0.0   frame 0: ♒ Aquarius mid-scroll in the dark at 3:02 AM, the phone full of old photos of "them" (a blurred
//         silhouette), a thumb hovering over MESSAGE (caught); slam "3 A.M. | Do *not* text them."; record scratch at 0.75
//   4.4   1 · 3:02 A.M.: the photos slide by (the rooftop, the café, the scarf) · 12.5 "hey. random, but I miss—" …stop.
//         · 20 the lane at 3 AM: one light still on, the café kitchen
//  26     2 · THE NIGHT SHIFT: ♏ Scorpio, the night baker: "nobody's up at 3 for a *good* reason." · 34 kneading it out,
//         a ball of dough goes flying, Scorpio catches it · 41 the flour sack: "I just miss… *it.*" (a tear drips from
//         upstairs: Pisces)
//  48     3 · THE STARS ADVISE · 64 4 · SUNRISE: a text to a friend → Leo: "yes. 8 AM. I'm buying." · 72 dawn, the first
//         loaves: "*you* made that." · 80 LESSON · 83.5 8 AM, Leo gets the loaf · hard cut on "Missing isn't | *going back.*"
import { screenShake, shakeCues } from '../../hookkit.js'
import {
  makeSide, lines, hopsOf, lane, cafe, apt, star, cry, pisces, sticker, drip, phone,
  ML_GOLD, BONE, INK, PINK, MONO, INTER, r3, pop01, outK, bump, LANE, standY, drawSign, CAFE, APT,
  drawCafeTable, drawBubble, sparkles, drawPastry, key, clamp, lerp, prog, ease, signStar,
} from '../../kxmle01/scenes/sidekit.js'

const LEO = signStar('leo')
const L0 = lines([{ t: 2.3, who: 'aquarius', text: 'I’m *over* it. I’m just… *checking.*' }])
const L1 = lines([{ t: 9.0, who: 'aquarius', text: 'they kept the good *scarf,* too.' }])
const L2 = lines([{ t: 16.4, who: 'aquarius', text: 'nope. *walk.* I need a walk.' }])
const L4 = lines([
  { t: 26.6, who: 'aquarius', text: 'can’t sleep.' },
  { t: 28.2, who: 'scorpio', text: 'nobody’s up at 3 for a *good* reason.' },
  { t: 31.0, who: 'scorpio', text: 'here. apron. *knead.*' },
])
const L5 = lines([
  { t: 34.6, who: 'aquarius', text: 'they kept the *good* scarf.' },
  { t: 36.6, who: 'aquarius', text: 'and our *song* is ruined!' },
  { t: 39.2, who: 'scorpio', text: '…nice *throw.*' },
])
const L6 = lines([
  { t: 42.0, who: 'aquarius', text: 'I don’t even want them *back.*' },
  { t: 44.6, who: 'aquarius', text: 'I just miss… *it.*' },
])
const L7 = lines([{ t: 69.0, who: 'aquarius', text: '…ok. that *helped.*' }])
const L8 = lines([
  { t: 72.6, who: 'scorpio', text: 'first batch. *you* made that.' },
  { t: 74.9, who: 'scorpio', text: 'at *3 A.M.*' },
  { t: 76.6, who: 'aquarius', text: 'it’s… actually *good?*' },
  { t: 78.4, who: 'scorpio', text: 'it’s *warm.* that’s the point.' },
])
const L9 = lines([
  { t: 83.8, who: 'leo', text: 'you look *tired.* and *better.*' },
  { t: 85.8, who: 'aquarius', text: 'I baked. long *story.*' },
])
const BOXES = [[L0, 2.1, 4.3], [L1, 8.8, 12.3], [L2, 16.2, 19.8], [L4, 26.4, 33.8], [L5, 34.4, 40.9], [L6, 41.8, 47.8], [L7, 68.8, 71.8], [L8, 72.4, 79.9], [L9, 83.6, 87.6]]
const ALL = BOXES.flatMap(b => b[0])
const H = s => hopsOf(ALL, s)
const T = { photos: 4.4, draft: 12.5, walk: 20.0, shift: 26.0, knead: 34.0, sack: 41.0, adv: 48.0, text: 64.0, dawn: 72.0, lesson: 80.0, end: 83.5, fly: 37.6 }

// a photo of "them": a soft, blurred silhouette (never a face), with a place behind
function photo(x, cx, cy, w, place, t) {
  const h = w * 1.05
  x.save(); x.translate(cx, cy)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 70); x.fillStyle = '#f7efdd'; x.fillRect(-w / 2, -h / 2, w, h + 54)
  const bg = { ROOFTOP: '#2a3a7a', 'THE CAFÉ': '#c9784a', SCARF: '#5a3a7a' }[place] || '#2a3a7a'
  x.fillStyle = bg; x.fillRect(-w / 2 + 12, -h / 2 + 12, w - 24, h - 24)
  if (place === 'ROOFTOP') for (let i = 0; i < 9; i++) { x.fillStyle = ['#ffe27a', '#ff8fb1', '#7fe0ff'][i % 3]; x.fillRect(-w / 2 + 20 + i * (w - 40) / 9, -h / 2 + 30 + (i % 2) * 10, 10, 10) }
  x.filter = 'blur(10px)'; x.fillStyle = 'rgba(240,230,255,0.75)'
  x.beginPath(); x.arc(0, -h * 0.08, w * 0.16, 0, Math.PI * 2); x.fill(); x.fillRect(-w * 0.2, h * 0.08, w * 0.4, h * 0.3); x.filter = 'none'
  if (place === 'SCARF') { x.fillStyle = '#ffd36e'; x.fillRect(-w * 0.22, h * 0.05, w * 0.44, 22) }
  x.fillStyle = INK; x.font = `700 ${Math.round(w * 0.075)}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(place, 0, h / 2 + 22)
  x.restore()
}
function phoneFrame(x, cx, cy, w, h) {
  x.fillStyle = INK; x.fillRect(cx - w / 2 - 10, cy - h / 2 - 10, w + 20, h + 20)
  x.shadowColor = '#bfe9ff'; x.shadowBlur = 50; x.fillStyle = '#120c2a'; x.fillRect(cx - w / 2, cy - h / 2, w, h); x.shadowBlur = 0
}
function thumb(x, cx, cy, s = 1) {
  x.fillStyle = INK; x.fillRect(cx - 44 * s, cy - 10 * s, 88 * s, 260 * s); x.fillStyle = '#ffd2b0'; x.fillRect(cx - 36 * s, cy - 2 * s, 72 * s, 250 * s); x.fillStyle = '#ffe8d6'; x.fillRect(cx - 24 * s, cy + 8 * s, 48 * s, 40 * s)
}
const dark = (x, a = 0.4) => { x.fillStyle = `rgba(4,3,20,${a})`; x.fillRect(0, 0, 1080, 1920) }
const winPisces = (x, t, k = 3, mood) => { x.save(); x.beginPath(); x.rect(APT.window.x + 20, APT.window.y + 300, 150, 190); x.clip(); pisces(x, APT.window.x + 95, APT.window.y + 520, 90, t, { tears: k, mood }); x.restore() }

function hook(x, t) {
  apt(x, t, { lamp: 0, time: 'late' }); dark(x, 0.45)
  winPisces(x, t, 3)
  star(x, t, { sign: 'aquarius', size: 270, x: 260, y: 1460, seed: 4, walk: false, hops: [0, 2.3, 2.8], moods: [[-1, 'wide', [1, -1]], [2.2, 'squint', [1, -1]]] })
  phoneFrame(x, 680, 960, 520, 820)
  photo(x, 680 - (t % 1.2) * 60, 880, 380, 'ROOFTOP', t)
  sticker(x, 680, 1290, 'MESSAGE', { size: 40, bg: '#7fe0ff', rot: 0 })
  thumb(x, 700 + Math.sin(t * 9) * 12, 1360 + Math.sin(t * 7) * 10, 1)
  sticker(x, 250, 1130, '3:02 AM', { size: 50, bg: '#1b1236', fg: '#7dffb0', font: MONO, weight: 700, rot: 0.03 })
}
function photos(x, t) {
  apt(x, t, { lamp: 0.1, time: 'late' }); dark(x, 0.4)
  phoneFrame(x, 600, 1000, 600, 860)
  x.save(); x.beginPath(); x.rect(300, 570, 600, 860); x.clip()
  const places = ['ROOFTOP', 'THE CAFÉ', 'SCARF']
  places.forEach((p, i) => { const off = key(t, [[4.4, 0], [6.6, 0], [7.0, 1], [9.2, 1], [9.6, 2]]) ; photo(x, 600 + (i - off) * 640, 960, 440, p, t) })
  x.restore()
  star(x, t, { sign: 'aquarius', size: 220, x: 170, y: 1460, seed: 4, walk: false, hops: [6.8, 9.4, ...H('aquarius')], moods: [[0, 'neutral', [1, -1]], [9.0, 'squint', [1, -1]]] })
  cry(x, 170, standY(220, 1460), 220, t, t > 9.6 ? 1 : 0)
}
function draft(x, t) {
  apt(x, t, { lamp: 0.1, time: 'late' }); dark(x, 0.35)
  winPisces(x, t, 3)
  phoneFrame(x, 640, 980, 560, 760)
  const txt = 'hey. random, but I miss—', n = Math.floor(clamp((t - 13.0) / 2.4) * txt.length)
  const gone = t > 15.9
  x.fillStyle = '#2a2050'; x.fillRect(400, 1240, 480, 80); x.fillStyle = BONE; x.font = `600 30px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText(gone ? '' : txt.slice(0, n) + (Math.floor(t * 3) % 2 ? '|' : ''), 420, 1280)
  if (t > 15.5) { const k = pop01(t, 15.5, 0.3, 2.4) * outK(t, [17.6, 17.9]); sticker(x, 640, 980, 'NOT TONIGHT', { size: 54, k, rot: -0.08, bg: '#ffd2e0' }) }
  star(x, t, { sign: 'aquarius', size: 230, x: [[0, 190], [17.4, 190], [19.6, 1150]], seed: 4, hops: [15.6, ...H('aquarius')], moods: [[0, 'neutral', [1, -1]], [15.5, 'wide', [1, 0]], [16.4, 'squint', [1, 0]]] })
}
function walk(x, t) {
  lane(x, t, { pan: 440, time: 'late', lit: ['pisces', 'cafe'], depth: 0.8, flakes: 80 }, c => {
    pisces(c, LANE.pisces.x, LANE.pisces.y + 60, 104, t, { tears: 3, look: [1, 1] })
    star(c, t, { sign: 'aquarius', size: 210, x: [[20, 500], [25.4, 900]], seed: 4, step: 0.5, moods: [[0, 'neutral', [1, 0]], [23.6, 'wide', [1, -1]]], wear: { scarf: '#7fe0ff' } })
  })
}
function kitchen(x, t, mode) {
  cafe(x, t, { lights: 0.55, view: 'late', behind: c => star(c, t, { sign: 'scorpio', size: 210, x: mode === 'knead' ? [[0, CAFE.counter.x + 80], [T.fly + 0.4, CAFE.counter.x + 80], [T.fly + 0.9, CAFE.counter.x + 210]] : CAFE.counter.x + 80, y: CAFE.counter.y, seed: 11, walk: false,
    hops: [...H('scorpio'), ...(mode === 'knead' ? [T.fly + 1.0] : [27.0, 27.8, 28.6])], moods: [[0, 'neutral', [-1, 1]], [T.fly + 0.9, 'wide', [-1, 0]], [39.1, 'wink', [-1, 0]]] }) })
  dark(x, 0.15)
  const S1 = CAFE.seats[1]
  if (mode === 'shift') {
    star(x, t, { sign: 'aquarius', size: 220, x: [[26, 1180], [26.5, CAFE.seats[0].x]], y: CAFE.seats[0].y, seed: 4, hops: H('aquarius'), moods: [[0, 'neutral', [1, -1]], [31.2, 'wide', [1, -1]]], wear: { scarf: '#7fe0ff' } })
    drawCafeTable(x, t, { cups: 1, pastry: null })
    const k = pop01(t, 31.3, 0.3, 2.2); if (k > 0.01) sticker(x, 760, 1150, 'APRON', { size: 40, k, rot: 0.08, bg: '#fff4dc' })
    drawPastry(x, CAFE.counter.x + 40, 930, 8, 'loaf')
  } else {
    star(x, t, { sign: 'aquarius', size: 240, x: 420, y: 1440, seed: 4, walk: false, squash: 0.06 * Math.sin(t * 9), hops: H('aquarius'), moods: [[0, 'squint', [1, 1]], [36.6, 'wide', [1, -1]], [T.fly + 0.2, 'wide', [1, -1]], [39.2, 'happy', [1, -1]]], wear: { scarf: '#7fe0ff' } })
    // the dough on a floury board, punched
    x.fillStyle = INK; x.fillRect(560, 1300, 320, 40); x.fillStyle = '#c9a070'; x.fillRect(566, 1306, 308, 28)
    const sq = 1 + 0.25 * Math.abs(Math.sin(t * 9))
    if (t < T.fly) { x.fillStyle = INK; x.fillRect(720 - 70 * sq - 6, 1244, 140 * sq + 12, 62); x.fillStyle = '#f5e3c0'; x.fillRect(720 - 70 * sq, 1250, 140 * sq, 52) }
    const p = prog(t, T.fly, T.fly + 1.0)
    if (p > 0 && p < 1) { const fx = lerp(720, CAFE.counter.x + 210, p), fy = 1250 - Math.sin(Math.PI * p) * 560 - p * 250; x.fillStyle = INK; x.fillRect(fx - 46, fy - 30, 92, 60); x.fillStyle = '#f5e3c0'; x.fillRect(fx - 40, fy - 24, 80, 48) }
    if (t >= T.fly + 1.0) drawPastry(x, CAFE.counter.x + 210, 960, 6, 'bun')
    sparkles(x, t, 720, 1260, 34.4, 8, 120, 3, ['#ffffff', '#f5e3c0'])
  }
}
function sack(x, t) {
  cafe(x, t, { lights: 0.45, view: 'late', behind: c => drawSign(c, 'scorpio', CAFE.counter.x + 80, standY(210, CAFE.counter.y), 210, t, { mood: 'neutral', look: [-1, 1], seed: 11 }) })
  dark(x, 0.2)
  x.fillStyle = INK; x.fillRect(380, 1330, 320, 130); x.fillStyle = '#e8dcc8'; x.fillRect(388, 1338, 304, 116); x.fillStyle = '#b8a888'; x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.fillText('FLOUR', 540, 1404)
  star(x, t, { sign: 'aquarius', size: 230, x: 540, y: 1345, seed: 4, walk: false, squash: 0.08, hops: H('aquarius'), moods: [[0, 'neutral', [0, 1]], [44.4, 'squint', [0, 1]]], wear: { scarf: '#7fe0ff' } })
  cry(x, 540, standY(230, 1345), 230, t, t > 44.5 ? 1 : 0, { squash: 0.08, seed: 4 })
  x.fillStyle = INK; x.fillRect(800, 1380, 120, 60); x.fillStyle = '#7fe0ff'; x.fillRect(806, 1386, 108, 48)
  drip(x, 860, 0, 1380, t, 46.0, 1.0); drip(x, 860, 0, 1380, t, 47.0, 1.0)
  sticker(x, 860, 420, '(Pisces, upstairs)', { size: 30, k: pop01(t, 45.8, 0.3, 2) * outK(t, [47.6, 47.9]), rot: 0.05, bg: '#c9b8ff' })
}
function textFriend(x, t) {
  cafe(x, t, { lights: 0.6, view: 'late' }); dark(x, 0.2)
  star(x, t, { sign: 'aquarius', size: 220, x: 180, y: 1460, seed: 4, walk: false, hops: [66.9, 67.3, ...H('aquarius')], moods: [[0, 'neutral', [1, -1]], [66.9, 'sparkle', [1, -1]], [69.0, 'happy', [1, -1]]], wear: { scarf: '#7fe0ff' } })
  const msgs = [{ at: 64.8, side: 'R', text: 'Can’t sleep. Missing someone. Breakfast tomorrow?' }, { at: 66.9, side: 'L', text: 'yes. 8 AM. I’m buying.' }, { at: 67.9, side: 'L', text: 'also: go to sleep' }]
  phone(x, 640, 960, 560, 800, t, { title: `${LEO.glyph}︎ Leo`, msgs, typing: [65.7, 66.9] })
  sparkles(x, t, 640, 1100, 66.9, 12, 220, 5, [ML_GOLD, PINK, BONE])
}
function dawn(x, t) {
  lane(x, t, { pan: 440, time: 'dusk', lights: 0, lit: ['pisces', 'cafe', 'a1'], depth: 0.8, flakes: 40 }, c => {
    pisces(c, LANE.pisces.x, LANE.pisces.y + 60, 104, t, { tears: 3, mood: 'happy', look: [1, 1], pull: bump(t, 76.8, 0.6) })
    star(c, t, { sign: 'scorpio', size: 210, x: [[72, 980], [72.6, 1080]], seed: 11, hops: H('scorpio'), moods: [[0, 'happy', [-1, 0]], [78.4, 'wink', [-1, 0]]] })
    star(c, t, { sign: 'aquarius', size: 220, x: 860, seed: 4, walk: false, hops: [74.9, ...H('aquarius')], moods: [[0, 'wide', [1, 0]], [76.4, 'sparkle', [0, 1]], [78.6, 'happy', [1, 0]]], wear: { scarf: '#7fe0ff' } })
    drawPastry(c, 1080, 1250, 7, 'loaf'); drawPastry(c, 860, 1270, 8, 'loaf')
    for (let i = 0; i < 3; i++) { const ph = (t * 0.8 + i / 3) % 1; c.fillStyle = `rgba(255,255,255,${0.6 * (1 - ph)})`; c.fillRect(840 + i * 18, 1220 - ph * 120, 8, 22) }
    sparkles(c, t, 860, 1220, 76.5, 12, 200, 6, [ML_GOLD, '#ffd2b0', BONE])
  })
}
function ending(x, t) {
  cafe(x, t, { view: 'night', behind: c => drawSign(c, 'taurus', CAFE.counter.x + 80, standY(200, CAFE.counter.y), 200, t, { mood: 'happy', look: [-1, 1], seed: 9 }) })
  pisces(x, 92, 1250, 120, t, { tears: 3, mood: 'happy', look: [1, 0], pull: bump(t, 87.9, 0.6) })
  const S0 = CAFE.seats[0], S1 = CAFE.seats[1]
  star(x, t, { sign: 'aquarius', size: 220, x: S0.x, y: S0.y, seed: 4, walk: false, hops: [85.0, ...H('aquarius')], moods: [[0, 'happy', [1, 0]], [86.8, 'sparkle', [1, 0]]], wear: { scarf: '#7fe0ff' } })
  star(x, t, { sign: 'leo', size: 220, x: [[83.5, 1180], [84.2, S1.x]], y: S1.y, seed: 7, hops: H('leo'), moods: [[0, 'happy', [-1, 0]], [85.2, 'heart', undefined]] })
  drawCafeTable(x, t, { cups: 2, pastry: null })
  drawPastry(x, lerp(S0.x + 60, 560, ease.outCubic(prog(t, 85.0, 85.5))), 1240, 8, 'loaf')
  sticker(x, 900, 1010, '8:00 AM', { size: 46, bg: '#fff4dc', font: MONO, weight: 700, rot: 0.04 })
}

const SHAKE = { at: T.fly, len: 0.45, amp: 18 }
const S = makeSide({
  id: 'kxmle04', duration: 90, lastAt: 88.3,
  music: { style: 'dreamy', key: 'Db', seed: 4804, hits: [15.5, T.fly, 66.9, 76.5] },
  hook: { text: '3 A.M. | Do *not* text them.', size: 112 },
  rec: { at: 0.75, len: 1.4, caption: 'yep. that’s *Aquarius.*', sub: 'the ex’s photos. again.' },
  caught: { x: 700, y: 1330, r: 170, label: 'DON’T', arrow: 'bl' },
  promise: 'wait for the *bread*',
  chapters: [{ at: T.photos, title: '3:02 a.m.' }, { at: T.shift, title: 'the night shift' }, { at: T.adv + 0.1, title: 'the stars advise', y: 1215 }, { at: T.text, title: 'sunrise' }],
  scenes: [[0, hook], [T.photos, photos], [T.draft, draft], [T.walk, walk], [T.shift, (x, t) => kitchen(x, t, 'shift')], [T.knead, (x, t) => kitchen(x, t, 'knead')], [T.sack, sack], [T.adv, sack],
    [T.text, textFriend], [T.dawn, dawn], [T.end, ending]],
  boxes: BOXES,
  caps: [
    { text: 'Missing someone | at *3 A.M.*', at: 4.6, out: [8.4, 8.7], late: 2, lateAt: 5.3 },
    { text: 'Only one light | *still on.*', kicker: '3:19 AM', at: 20.2, out: [25.5, 25.8], late: 2, lateAt: 21.0 },
    { text: 'Someone’s | *awake.*', kicker: '3:41 AM', at: 64.3, out: [66.6, 66.9], late: 1, lateAt: 64.9 },
    { text: 'Missing isn’t | *going back.*', at: 87.6, out: null, size: 104, late: 2, lateAt: 88.0 },
  ],
  advise: {
    at: T.adv, out: [63.55, 64.0],
    cards: [
      { at: 49.3, icon: 'heart', head: 'You can *miss* it.', body: 'Missing someone doesn’t mean you should go back.' },
      { at: 54.3, icon: 'moon', head: '3 A.M. makes it *bigger.*', body: 'Night turns every feeling up. Big choices can wait for daylight.' },
      { at: 59.3, icon: 'chat', head: 'Text a *friend* instead.', body: '“Can’t sleep. Missing someone. Breakfast tomorrow?”' },
    ],
    lines: [
      { t: 49.1, text: 'Aquarius, this one’s *yours.*' },
      { t: 51.6, text: 'missing is a feeling, not a *plan.*' },
      { t: 54.6, text: '3 A.M. turns the volume *up.*' },
      { t: 57.2, text: 'decide nothing until *daylight.*' },
      { t: 59.6, text: 'you don’t need *them* tonight.' },
      { t: 61.6, text: 'you need a *friend.*' },
    ],
  },
  lesson: { at: T.lesson, out: [83.25, 83.5], text: 'Daylight decides. | *Not* 3 A.M.', chip: '+1 WARM LOAF' },
  fx: [[screenShake, SHAKE, shakeCues]],
  cues: [
    ['whoosh', T.photos, 0.4, 0.04], ['whoosh', 6.7, 0.3, 0.03], ['whoosh', 9.3, 0.3, 0.03],
    ['whoosh', T.draft, 0.4, 0.035], ...Array.from({ length: 12 }, (_, i) => ['tick', r3(13.0 + i * 0.2), 0.015]), ['pop', 15.5, 392, 0.05, 0], ['crash', 15.5, { gain: 0.012, len: 0.4 }],
    ['whoosh', T.walk, 0.4, 0.035], ...Array.from({ length: 8 }, (_, i) => ['tick', r3(20.4 + i * 0.6), 0.012]),
    ['whoosh', T.shift, 0.4, 0.04], ['pop', 31.3, 987.77, 0.04, 0.2],
    ...Array.from({ length: 8 }, (_, i) => ['tom', r3(34.2 + i * 0.35), 130, { gain: 0.12 }]), ['whoosh', T.fly, 0.6, 0.05], ['pop', T.fly + 1.0, 1318.51, 0.045, 0.3],
    ['whoosh', T.sack, 0.4, 0.035], ['pluck', 46.9, 1567.98, 0.03, 0.5, 0.3], ['pluck', 47.9, 1567.98, 0.03, 0.5, 0.3], ['pop', 45.8, 783.99, 0.03, 0.2],
    ['whoosh', T.text, 0.4, 0.04], ['pop', 64.8, 1174.66, 0.04, 0.25], ['pop', 66.9, 880, 0.05, -0.25], ['glitter', 66.9, 67.6], ['pop', 67.9, 880, 0.04, -0.25],
    ['whoosh', T.dawn, 0.5, 0.04], ['bell', 76.5, 1760, 0.035, 1.6, 0], ['glitter', 76.5, 77.3],
    ['whoosh', T.end, 0.4, 0.04], ['pop', 85.2, 1318.51, 0.045, 0], ['glitter', 85.2, 85.8], ['pluck', 87.9, 1567.98, 0.03, 0.5, -0.3],
  ],
})
export const { DURATION, SCENES, CUES, MUSIC, CHECK } = S
