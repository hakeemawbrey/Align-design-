// kxtre06: A DAY IN THE LIFE, "A Day in the Life: The Read Receipt" (115 s vertical, Trends: Extended ep 6, rows in
// promo/films/month2/m41.md; music: lofi · Db). Engine: ../../kxtre01/scenes/xkit.js. No end card; loops.
// A vlog starring the little "Read" label on ♈ Aries' phone. Aries sends a meme to ♐ Sagittarius at 9:30; it's read at
// 2:14 and then… nothing, for hours. The secret: Sagittarius was writing a long, careful reply. ♌ Leo and ♊ Gemini
// analyse; ♓ Pisces cries through it (and as the tissue-box widget on the home screen).
//   0.0–3.6   frame 0: a giant "Read 2:14 PM" stamp mid-slam onto the phone, the phone mid-wobble; freeze frame
//   1 7:00 AM (wakes up) · 2 9:30 AM (the meme; "Delivered" waits) · 3 2:14 PM (READ!) · 4 2:20 PM (Aries panics)
//   5 4:00 PM (the friends and the magnifying glass) · 6 6:00 PM (Read tries to tell Aries; labels can't talk)
//   7 THE SECRET (inside Sagittarius' phone: the careful reply) · 8 9:12 PM (the paragraph lands). Loops to frame 0.
import {
  makeEp, star, pisces, room, couch, tag, sfx, hearts, sparkles, confetti, label, drawBits, glowSpot, bubble,
  prog, lerp, clamp, ease, R, box, GOLD, BONE, PINK, INK, MINT, SKYB, RED, INTER, MONO, r3,
} from '../../kxtre01/scenes/xkit.js'

const ACC = '#ff9a6a'
const ARI = 'aries', SAG = 'sagittarius'
// the star of the vlog: a little "Read" label with eyes and legs
function readGuy(x, t, cx, cy, { k = 1, mood = 'happy', text = 'Read', s = 1, walk = 0, sleepy = false, col = BONE, rot = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy + Math.abs(Math.sin(t * 6)) * -8 * walk); x.rotate(rot); x.scale(k * s, k * s)
  x.font = `800 46px ${INTER}`; const w = x.measureText(text).width + 50
  R(x, INK, -w / 2 + 16, 30, 10, 34); R(x, INK, w / 2 - 26, 30, 10, 34)
  if (walk) { R(x, INK, -w / 2 + 16 + Math.sin(t * 12) * 8, 56, 20, 10); R(x, INK, w / 2 - 26 - Math.sin(t * 12) * 8, 56, 20, 10) }
  box(x, -w / 2, -40, w, 74, col, { b: 6 })
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  // eyes on top
  for (const ex of [-22, 22]) {
    box(x, ex - 14, -86, 28, 34, '#ffffff', { b: 4 })
    if (sleepy) R(x, INK, ex - 12, -70, 24, 6)
    else if (mood === 'happy') { R(x, INK, ex - 10, -72, 20, 6); R(x, INK, ex - 12, -66, 6, 6); R(x, INK, ex + 6, -66, 6, 6) }
    else R(x, INK, ex - 6 + (mood === 'look' ? 6 : 0), -76, 12, 16)
  }
  x.restore()
}
// a phone screen filling the frame (the inside of the phone): header, thread, input
function screen(x, t, title, msgs, { tint = '#14102c' } = {}) {
  R(x, tint, 0, 0, 1080, 1920); R(x, '#221b4a', 0, 0, 1080, 360)
  x.font = `800 48px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 540, 300)
  let y = 1200
  for (const m of msgs.slice().reverse()) {
    if (t < m.at) continue
    x.font = `700 50px ${INTER}`
    const lines = m.lines || [m.text], bw = Math.max(...lines.map(l => x.measureText(l).width)) + 60, bh = lines.length * 64 + 44
    const pk = Math.min(1, (t - m.at) / 0.2)
    const bx = m.me ? 1000 - bw : 80
    x.save(); x.globalAlpha = pk
    R(x, m.me ? PINK : BONE, bx, y - bh, bw, bh)
    if (m.img) { R(x, '#3a3070', bx + 20, y - bh + 20, bw - 40, bh - 40) }
    x.fillStyle = INK; x.textAlign = 'left'
    lines.forEach((l, i) => x.fillText(l, bx + 30, y - bh + 54 + i * 64))
    x.restore()
    y -= bh + 30
  }
  R(x, '#221b4a', 0, 1400, 1080, 140); x.font = `700 34px ${MONO}`; x.fillStyle = 'rgba(239,230,214,0.4)'; x.textAlign = 'left'; x.fillText('message…', 60, 1470)
}
const MEME = { me: true, lines: ['[meme: a cat', 'in a tiny hat]'] }
function homeWidget(x, t, S, tears = 2) {
  box(x, 820, 1560, 200, 200, '#2a2058', { b: 6 })
  x.save(); x.beginPath(); x.rect(820, 1560, 200, 200); x.clip()
  pisces(x, t, { x: 920, y: 1650, s: 120, tears, look: [-1, 0], noBox: true }); x.restore()
  label(x, 'tissues ♓', 920, 1790, { size: 22, col: SKYB })
  void S
}

function hook(x, t, S) {
  room(x, t, { wall: '#2a2350', wall2: '#30295a' })
  x.save(); x.translate(540, 980); x.rotate(-0.06 + 0.04 * Math.sin(t * 20)); box(x, -260, -420, 520, 840, '#14102c', { b: 10 })
  R(x, PINK, -20, -100, 250, 120); x.font = `700 30px ${INTER}`; x.fillStyle = INK; x.textAlign = 'left'; x.fillText('[a cat in a', 0, -60); x.fillText('tiny hat]', 0, -24)
  x.restore()
  x.save(); x.translate(560, 1180); x.rotate(-0.12); x.scale(1.9, 1.9); box(x, -150, -40, 300, 80, RED, { b: 8 }); x.font = `800 40px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('Read 2:14 PM', 0, 3); x.restore()
  for (let i = 0; i < 6; i++) { const a = i * 1.05; R(x, BONE, 560 + Math.cos(a) * 380, 1180 + Math.sin(a) * 200, 30, 10) }
  star(x, t, ARI, { x: 200, y: 1420, s: 200, mood: 'wide', look: [1, -1] })
  pisces(x, t, { x: 900, y: 1480, s: 140, tears: 2, look: [-1, -1] })
  void S
}

const C = []
C.push({ name: '7:00 AM', dur: 13, stamp: '7:00 AM', caption: 'meet *Read.* lives in a phone.', noCam: true, capTop: 400,
  bubbles: [{ at: 5.0, end: 8.0, x: 540, y: 1000, text: 'big day today. I can feel it.', size: 36 }],
  cues: [['pluck', 1.0, 523.25, 0.03, 0.8, 0], ['whoosh', 3.4, 0.6, 0.02], ['pop', 9.0, 783.99, 0.04, 0]],
  draw(x, t, S) {
    screen(x, t, '♐ SAGITTARIUS', [{ at: -1, me: false, text: 'goodnight!! :)' }, { at: -1, me: true, text: 'night :)' }])
    box(x, 300, 1290, 480, 70, '#c9a6ff', { b: 6 })
    const up = ease.inOutCubic(prog(S.u, 3.0, 4.4)), str = Math.sin(Math.PI * prog(S.u, 4.4, 5.4))
    readGuy(x, t, 540, 1240 - up * 30, { sleepy: S.u < 3.4, s: 2.0, rot: (1 - up) * -1.4, mood: S.u > 9 ? 'happy' : 'look' })
    if (str > 0) sfx(x, t, 'streeetch', 540, 1080, S.at(4.4), { size: 40, col: GOLD, life: 1.2 })
    homeWidget(x, t, S, 1)
  } })
C.push({ name: '9:30 AM', dur: 13, stamp: '9:30 AM', caption: 'Aries sends *a meme.*', noCam: true, capTop: 400,
  bubbles: [{ at: 4.6, end: 8.2, x: 300, y: 1000, text: 'Delivered… waiting…', size: 34 }, { at: 9.0, end: 12.6, x: 300, y: 1000, text: 'any minute now', size: 34 }],
  cues: [['whoosh', 1.4, 0.3, 0.04], ['pop', 1.6, 1046.5, 0.05, 0.4], ...Array.from({ length: 8 }, (_, i) => ['tick', r3(4.2 + i), 0.02])],
  draw(x, t, S) {
    screen(x, t, '♐ SAGITTARIUS', [{ at: -1, me: true, text: 'night :)' }, { ...MEME, at: S.at(1.6) }])
    const pace = Math.sin(S.u * 1.2)
    readGuy(x, t, 540 + pace * 220, 1300, { text: 'Delivered', walk: 1, s: 1.6, mood: 'look', col: '#d8d0e8' })
    homeWidget(x, t, S, 1)
  } })
C.push({ name: '2:14 PM', dur: 14, stamp: '2:14 PM', caption: 'they *opened it.*', noCam: true, capTop: 400,
  bubbles: [{ at: 2.6, end: 6.0, x: 540, y: 1060, text: "I'M ON!! I'M READ!!", size: 44 }, { at: 7.4, end: 11.0, x: 540, y: 1060, text: 'now they reply. obviously.', size: 36 }],
  cues: [['bell', 1.8, 1318.51, 0.04, 1.0, 0], ['glitter', 1.8, 2.6], ['pop', 2.0, 1567.98, 0.05, 0]],
  draw(x, t, S) {
    screen(x, t, '♐ SAGITTARIUS', [{ at: -1, me: true, text: 'night :)' }, { ...MEME, at: -1 }])
    const pop = ease.outBack ? 1 : 1
    readGuy(x, t, 540, 1300, { k: clamp(prog(S.u, 1.6, 2.0) * 1.2) * pop, s: 2.2, mood: 'happy' })
    if (S.u > 1.8) { sparkles(x, t, 540, 1280, S.at(1.8), 14, 220, 1); confetti(x, t, S.at(2.0), 540, 1200) }
    label(x, '2:14 PM', 800, 1350, { size: 30, col: 'rgba(239,230,214,0.7)', alpha: S.u > 2 ? 1 : 0 })
    homeWidget(x, t, S, 2)
  } })
C.push({ name: '2:20 PM', dur: 14, stamp: '2:20 PM', caption: 'meanwhile, *Aries.*',
  fx: [['load', { at: 5.4, len: 4.8, label: 'they saw it…', stallAt: 99, error: 'Error: no reply detected', y: 600 }]],
  bubbles: [{ at: 1.0, end: 4.2, x: 540, y: 640, text: 'READ. at 2:14. and NOTHING?', size: 38 }, { at: 10.8, end: 13.8, x: 540, y: 640, text: 'was the cat too much', size: 38 }],
  cues: [...Array.from({ length: 10 }, (_, i) => ['whoosh', r3(0.6 + i * 1.1), 0.15, 0.02])],
  draw(x, t, S) {
    room(x, t, { wall: '#3a2440', wall2: '#432a4a', night: false })
    const pace = Math.sin(S.u * 2.8)
    star(x, t, ARI, { x: 540 + pace * 260, y: 1080, s: 240, mood: S.u > 10.6 ? 'squint' : 'wide', look: [Math.cos(S.u * 2.8) > 0 ? 1 : -1, 0], hops: S.hops(...Array.from({ length: 10 }, (_, i) => 0.6 + i * 1.1)) })
    box(x, 540 + pace * 260 + 70, 1060, 50, 80, '#14102c', { b: 5 })
    pisces(x, t, { x: 930, y: 1420, s: 120, tears: 2, look: [-1, -1], pop: S.w(2, 14) })
  } })
C.push({ name: '4:00 PM', dur: 14, stamp: '4:00 PM', caption: 'the friends *investigate.*',
  bubbles: [
    { at: 1.6, end: 4.6, x: 300, y: 620, text: 'maybe they hate cats', tail: 0.2, size: 34 },
    { at: 4.2, end: 7.2, x: 780, y: 560, text: 'nobody hates cats', tail: -0.3, size: 34 },
    { at: 7.0, end: 10.2, x: 540, y: 720, text: 'zoom in on the "R"', size: 36 },
    { at: 10.4, end: 13.6, x: 860, y: 960, text: 'I am so worried for you', tail: -0.3, size: 30, col: '#cfe9ff' },
  ],
  cues: [['whoosh', 7.0, 0.4, 0.03], ['pop', 8.2, 659.25, 0.04, 0]],
  draw(x, t, S) {
    room(x, t, { wall: '#2c2350', wall2: '#33295c', night: false })
    couch(x, 540, 1220, { w: 760 })
    star(x, t, 'leo', { x: 280, y: 1060, s: 210, mood: 'squint', look: [1, -0.4], hops: S.hops(1.6, 7.0) })
    star(x, t, ARI, { x: 540, y: 1060, s: 210, mood: 'wide', look: [0, -1], hops: S.hops(8.2) })
    star(x, t, 'gemini', { x: 800, y: 1060, s: 210, mood: 'neutral', look: [-1, -0.4], hops: S.hops(4.2) })
    const zm = ease.inOutCubic(prog(S.u, 7.0, 8.2))
    box(x, 470, 820, 140, 230, '#14102c', { b: 5 }); label(x, 'Read', 540, 980, { size: 24, col: BONE, font: INTER, weight: 800 })
    x.save(); x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.arc(560, 960 - zm * 20, 60 + zm * 60, 0, Math.PI * 2); x.stroke(); x.strokeStyle = GOLD; x.lineWidth = 8; x.stroke()
    R(x, INK, 600 + zm * 50, 1010 + zm * 30, 20, 90); x.restore()
    if (zm > 0.9) label(x, 'R', 560, 950, { size: 120, col: BONE, font: INTER, weight: 800 })
    pisces(x, t, { x: 960, y: 1420, s: 140, tears: 3, look: [-1, -1], hops: S.hops(10.4) })
  } })
C.push({ name: '6:00 PM', dur: 13, stamp: '6:00 PM', caption: 'Read *tries to say something.*', noCam: true, capTop: 400,
  bubbles: [{ at: 1.4, end: 4.4, x: 540, y: 1080, text: 'HEY. ARIES. LISTEN.', size: 40 }, { at: 4.6, end: 8.0, x: 540, y: 1080, text: 'they are WRITING you something!!', size: 36 }, { at: 8.6, end: 12.6, x: 540, y: 1080, text: '…labels cannot talk. right.', size: 36 }],
  cues: [...Array.from({ length: 12 }, (_, i) => ['tom', r3(1.4 + i * 0.5), 160, { gain: 0.1, decay: 0.08 }])],
  draw(x, t, S) {
    screen(x, t, '♐ SAGITTARIUS', [{ at: -1, me: true, text: 'night :)' }, { ...MEME, at: -1 }])
    const jump = S.u < 8.2 ? Math.abs(Math.sin(S.u * 6)) : 0
    readGuy(x, t, 540, 1300 - jump * 60, { s: 2.0, mood: S.u > 8.6 ? 'look' : 'happy', rot: S.u > 8.6 ? 0.2 : 0 })
    // Aries' giant face behind the glass, not hearing
    x.save(); x.globalAlpha = 0.35; star(x, t, ARI, { x: 540, y: 700, s: 520, mood: 'neutral', look: [0, 0.4], glyph: false }); x.restore()
    homeWidget(x, t, S, 2)
  } })
C.push({ name: 'THE SECRET', dur: 14, caption: 'meanwhile, *their* phone.', noCam: true, capTop: 400,
  cues: [...Array.from({ length: 30 }, (_, i) => ['tick', r3(0.8 + i * 0.4), 0.018])],
  draw(x, t, S) {
    screen(x, t, '♈ ARIES', [{ at: -1, ...MEME, me: false }], { tint: '#1a1430' })
    const full = ["ok so I've been thinking all day", 'how to say this right.', 'I love the cat. I love that', 'you sent it. coffee saturday?']
    const n = clamp(prog(S.u, 0.8, 12.6)) * full.join('').length
    let left = n
    x.save(); box(x, 80, 1560, 920, 300, '#221b4a', { b: 6 })
    full.forEach((l, i) => { const s = l.slice(0, Math.max(0, Math.floor(left))); left -= l.length; x.font = `700 38px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'left'; x.fillText(s, 110, 1620 + i * 56) })
    x.restore()
    label(x, 'DRAFT · 47 min', 840, 1530, { size: 26, col: GOLD })
    star(x, t, SAG, { x: 860, y: 600, s: 220, mood: 'squint', look: [-1, 1], hops: S.hops(3, 6, 9, 12) })
    tag(x, 'REWRITING IT. AGAIN.', 360, 600, S.w(5.4, 9.6), { bg: GOLD, size: 34 })
  } })
C.push({ name: '9:12 PM', dur: 14.4, stamp: '9:12 PM', caption: null, noCam: true, capTop: 400,
  bubbles: [{ at: 4.0, end: 7.4, x: 330, y: 1540, text: 'TOLD YOU. thinking.', size: 40 }],
  cues: [['pop', 1.0, 1046.5, 0.05, 0], ['bell', 1.2, 1567.98, 0.04, 1.0, 0], ['glitter', 1.2, 2.0], ['pluck', 3.0, 659.25, 0.04, 0.5, 0], ['pluck', 3.2, 783.99, 0.04, 0.5, 0]],
  draw(x, t, S) {
    screen(x, t, '♐ SAGITTARIUS', [{ ...MEME, at: -1 }, { at: S.at(1.0), me: false, lines: ["ok so I've been thinking all day", 'how to say this right. I love', 'the cat. I love that you sent it.', 'coffee saturday?'] }])
    readGuy(x, t, 300, 1700 - Math.abs(Math.sin(S.u * 3)) * 40, { s: 1.4, mood: 'happy', rot: 0.15 * Math.sin(S.u * 3) })
    star(x, t, ARI, { x: 820, y: 1700, s: 220, mood: S.u > 1.4 ? 'heart' : 'wide', look: [0, -1], hops: S.hops(1.4, 1.9, 2.4, 5, 6.5, 8, 9.5, 11, 12.5) })
    if (S.u > 1.4) hearts(x, t, S.at(1.4 + Math.floor((S.u - 1.4) / 2) * 2), 820, 1560, { n: 5 })
    pisces(x, t, { x: 120, y: 1500, s: 120, tears: 3, look: [1, -1], noBox: true })
  } })

const EP = makeEp({
  id: 'kxtre06', bug: 'A DAY IN THE LIFE', lead: ARI, accent: ACC, deep: '#b0482a',
  music: { style: 'lofi', key: 'Db', seed: 4106, breakdown: [57.6], lift: [84.6] },
  hook: {
    text: 'A day in the life | of *“Read.”*', len: 3.6, draw: hook, top: 250, size: 104, noCam: true,
    fx: [['whip', { at: -0.08, len: 0.45, from: 1.3, blur: 6 }], ['rec', { at: 0.9, len: 1.5, caption: 'yep. *left on read.*', top: 1180 }]],
  },
  promiseAt: 2.5,
  promise: 'Read has *a secret.* wait for it.',
  chapters: C,
  last: { text: 'Read means | *they’re still thinking.*', at: 10.4, top: 300, size: 96 },
  ending: 'loop',
  hits: [17.6, 98.6],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
export const T = EP.T
void [glowSpot, bubble, lerp, MINT, RED]
