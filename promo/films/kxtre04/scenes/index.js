// kxtre04: MAIN CHARACTER MOMENT, "Main Character Moment: The Scarf Incident" (118 s vertical, Trends: Extended ep 4,
// rows in promo/films/month2/m41.md; music: cinematic · D). Engine: ../../kxtre01/scenes/xkit.js. No end card; loops.
// ♌ Leo's walk home becomes a movie in Leo's head (letterbox bars, a serif title card, slow-mo snow, strings) until the
// scarf snags on a fence. ♍ Virgo untangles it; they walk the same way and talk about soup; no movie kiss, a soup plan.
// ♓ Pisces watches from a tiny cinema seat with popcorn, crying at every chapter.
//   0.0–3.6   frame 0: letterbox bars slamming in, Leo mid-slow-mo turn under the street lamp, snow frozen; whip + scratch
//   1 OPENING CREDITS · 2 THE SOUNDTRACK (a pigeon joins) · 3 THE MONTAGE · 4 THE FLASHBACK (sepia: "you'll find your
//   person") · 5 REALITY (the scarf is stuck on a fence; the bars slide away) · 6 THE CO-STAR (Virgo untangles it)
//   7 THE CONVERSATION (soup) · 8 THE NON-MOVIE ENDING (numbers swapped for soup Sunday). Loops back into frame 0.
import {
  makeEp, star, pisces, street, room, tag, sfx, hearts, sparkles, confetti, phone, label, glowSpot, drawBits,
  prog, lerp, clamp, ease, R, box, GOLD, BONE, PINK, INK, MINT, SKYB, RED, INTER, SERIF, MONO, r3, FLOOR,
} from '../../kxtre01/scenes/xkit.js'

const ACC = '#f2c75c'
const LEO = 'leo', VIR = 'virgo'
const PIGEON = ['...DD.....', '..DDDD....', '..DWKD....', '.ODDDD....', '...PPG....', '...PPGG...', '...GGGGGGD', '..GGGGGGDD', '..GGGGGDD.', '...GGGG...', '....O.O...']
const PIG_C = { D: '#5d6680', W: '#ffffff', K: INK, O: '#e0a050', P: '#6fd3a8', G: '#a7afc4' }
const pigeon = (x, t, cx, cy, cell = 9, flip = false) => drawBits(x, PIGEON, PIG_C, cx, cy - Math.abs(Math.sin(t * 5)) * cell * 0.8, cell, { sx: flip ? -1 : 1, rot: 0.08 * Math.sin(t * 5) })

function bars(x, k) { if (k <= 0) return; const h = 230 * k; R(x, '#000', -200, -200, 1480, h + 200); R(x, '#000', -200, 1920 - h, 1480, h + 200) }
function scarf(x, t, cx, cy, { flyK = 0, len = 1 } = {}) {
  x.save(); x.translate(cx, cy)
  for (let i = 0; i < 9 * len; i++) { const wv = Math.sin(t * 4 + i * 0.7) * (6 + i * 2) * (1 - flyK * 0.5); R(x, INK, i * 18 - 4, wv - 4 - flyK * i * 10, 22, 30); R(x, i % 2 ? '#e8344e' : '#f2c75c', i * 18, wv - flyK * i * 10, 18, 22) }
  x.restore()
}
function fence(x, X, Y, w) { for (let i = 0; i < w / 40; i++) { R(x, INK, X + i * 40 - 3, Y - 3, 20, 210); R(x, '#8a7a9a', X + i * 40, Y, 14, 204) } R(x, INK, X - 6, Y + 40, w + 12, 18); R(x, '#8a7a9a', X - 3, Y + 43, w + 6, 12) }
function cinemaSeat(x, t, S, tears = 2, pop = 1) {
  if (pop <= 0.01) return
  box(x, 840, 1440, 200, 120, '#8a2a3a', { b: 6, hi: '#a83a4a' })
  pisces(x, t, { x: 930, y: 1400, s: 140, tears, look: [-1, -1], noBox: true, pop })
  box(x, 990, 1420, 60, 70, '#e8344e', { b: 4 }); for (let i = 0; i < 5; i++) R(x, '#fff2c0', 994 + i * 11, 1404 - (i % 2) * 8, 12, 14)
  void S
}
function sepia(x, k) { if (k <= 0) return; x.fillStyle = `rgba(150,110,60,${0.45 * k})`; x.fillRect(-200, -200, 1480, 2320) }

function hook(x, t, S) {
  street(x, t, { snow: false, lampX: 600 })
  for (let i = 0; i < 40; i++) R(x, '#ffffff', (i * 131) % 1080, ((i * 211) % 1500) + 200 + t * 6, 8, 8)
  star(x, t, LEO, { x: 520, y: 1000, s: 290, mood: 'wink', look: [1, -0.2], squash: -0.05, bob: 0 })
  scarf(x, t * 0.3, 580, 1000, { flyK: 0.6 })
  cinemaSeat(x, t, S, 2)
}

const C = []
C.push({ name: 'OPENING CREDITS', dur: 14, caption: 'the walk home: *a film.*', stamp: '9:40 PM',
  cues: [['bell', 1.0, 587.33, 0.04, 2.0, 0], ['bell', 4.6, 880, 0.04, 2.0, 0], ['riser', 7.0, 9.0, 0.02]],
  draw(x, t, S) {
    street(x, t, { snow: true, lampX: 780 })
    const walk = S.u * 22
    star(x, t, LEO, { x: 200 + walk, y: 1120, s: 250, mood: 'wink', look: [1, 0], bob: 4 })
    scarf(x, t, 240 + walk, 1120)
    const c1 = S.w(1.0, 4.4), c2 = S.w(4.6, 9.2)
    if (c1 > 0.01) { x.globalAlpha = c1; x.font = `italic 500 72px ${SERIF}`; x.fillStyle = BONE; x.textAlign = 'center'; x.fillText('a Leo production', 540, 520); x.globalAlpha = 1 }
    if (c2 > 0.01) { x.globalAlpha = c2; x.font = `italic 600 120px ${SERIF}`; x.fillStyle = ACC; x.textAlign = 'center'; x.fillText('Walk Home', 540, 540); x.font = `700 34px ${MONO}`; x.fillStyle = BONE; x.fillText('starring: LEO · also LEO', 540, 620); x.globalAlpha = 1 }
    cinemaSeat(x, t, S, S.u > 5 ? 3 : 2, S.w(0.5, 14))
  } })
C.push({ name: 'THE SOUNDTRACK', dur: 14, caption: 'it has *a theme song.*',
  bubbles: [{ at: 1.4, end: 4.4, x: 420, y: 700, text: 'dun… dun… DUNNN', size: 40 }, { at: 9.2, end: 12.4, x: 420, y: 700, text: 'a duet. iconic.', size: 38 }],
  cues: [['pluck', 1.4, 587.33, 0.05, 0.6, 0], ['pluck', 2.4, 587.33, 0.05, 0.6, 0], ['pluck', 3.3, 880, 0.06, 0.9, 0], ['pop', 6.0, 659.25, 0.04, 0.4], ['pop', 6.5, 783.99, 0.04, 0.4], ['pluck', 8.0, 1174.66, 0.04, 0.4, 0.4]],
  draw(x, t, S) {
    street(x, t, { snow: true, lampX: 780 })
    star(x, t, LEO, { x: 420, y: 1120, s: 250, mood: 'happy', look: [1, -0.3], hops: S.hops(1.4, 2.4, 3.3, 9.2) })
    scarf(x, t, 460, 1120)
    for (let i = 0; i < 6; i++) { const ph = (S.u * 0.5 + i / 6) % 1; label(x, i % 2 ? '♪' : '♫', 480 + ph * 300, 960 - ph * 400, { size: 60, col: ACC, alpha: Math.sin(Math.PI * ph), font: INTER }) }
    const pin = ease.outCubic(prog(S.u, 5.6, 6.8))
    pigeon(x, t, lerp(1200, 700, pin), 1180, 10, true)
    if (S.u > 7.8) { for (let i = 0; i < 3; i++) { const ph = (S.u * 0.6 + i / 3) % 1; label(x, '♪', 700 + ph * 120, 1080 - ph * 200, { size: 44, col: SKYB, alpha: Math.sin(Math.PI * ph), font: INTER }) } }
    cinemaSeat(x, t, S, 2, S.w(0.5, 14))
  } })
C.push({ name: 'THE MONTAGE', dur: 15, caption: 'cue *the montage.*',
  cues: [['whoosh', 0.1, 0.3, 0.04], ['whoosh', 5.0, 0.3, 0.04], ['tick', 5.0, 0.05], ['whoosh', 10.0, 0.3, 0.04], ['tick', 10.0, 0.05], ['pop', 7.2, 392, 0.05, 0], ['whoosh', 11.8, 0.6, 0.04], ['glitter', 12.0, 12.8]],
  draw(x, t, S) {
    const shot = S.u < 5 ? 0 : S.u < 10 ? 1 : 2, v = S.u - shot * 5
    street(x, t, { snow: true, lampX: shot === 1 ? 300 : 860 })
    if (shot === 0) {
      box(x, 160, 700, 760, 420, '#ffd98a', { b: 10 }); R(x, '#fff2c8', 180, 720, 720, 380)
      ;[[300, 'mittens'], [540, 'a tiny lamp'], [780, 'socks (12)']].forEach(([px, l], i) => { box(x, px - 60, 960, 120, 100, ['#ff8fb1', '#8fd8ff', '#9fe6b0'][i], { b: 5 }); label(x, l, px, 1090, { size: 22, col: INK, font: INTER, weight: 800 }) })
      star(x, t, LEO, { x: 260 + v * 110, y: 1240, s: 220, mood: 'sparkle', look: [0, -1] })
    } else if (shot === 1) {
      R(x, '#6a7ab8', 360, 1290, 360, 30)
      const step = prog(v, 1.8, 2.4)
      star(x, t, LEO, { x: 540, y: 1180 - Math.sin(Math.PI * step) * 120, s: 230, mood: v > 2.2 ? 'wide' : 'wink', look: [0, 1] })
      if (v > 2.2) { for (let i = 0; i < 12; i++) { const f = v - 2.2; R(x, '#9fc6ff', 540 + Math.cos(i) * 260 * Math.min(1, f), 1290 - 300 * f + 400 * f * f + (i % 3) * 10, 12, 12) } sfx(x, t, 'SPLASH', 540, 900, S.at(7.2), { size: 60, col: SKYB }) }
    } else {
      const toss = ease.outCubic(prog(v, 1.6, 2.6))
      star(x, t, LEO, { x: 500, y: 1180, s: 250, mood: 'wink', look: [1, -0.4], squash: -0.06 * toss })
      scarf(x, t, 540, 1180 - toss * 180, { flyK: toss })
      sparkles(x, t, 600, 1000, S.at(11.8), 12, 200, 1)
    }
    tag(x, `SHOT ${shot + 1}/3`, 860, 300, S.w(shot * 5 + 0.2, shot * 5 + 4.8), { bg: BONE, size: 30 })
    cinemaSeat(x, t, S, 3, S.w(1, 15))
  } })
C.push({ name: 'THE FLASHBACK', dur: 14, caption: 'a *flashback*, obviously.',
  bubbles: [{ at: 2.6, end: 6.6, x: 760, y: 620, text: "you'll find your person, you know.", tail: -0.3, size: 36 }, { at: 7.0, end: 10.4, x: 330, y: 680, text: '…you think?', tail: 0.2, size: 38 }, { at: 9.8, end: 13.4, x: 760, y: 620, text: 'when you stop looking for a movie.', tail: -0.3, size: 34 }],
  cues: [['riser', 0.1, 1.2, 0.03], ['bell', 1.2, 1174.66, 0.03, 1.4, 0]],
  draw(x, t, S) {
    room(x, t, { warm: 1 })
    star(x, t, LEO, { x: 330, y: 1100, s: 230, mood: S.u > 10 ? 'squint' : 'neutral', look: [1, -0.2], hops: S.hops(7.0) })
    star(x, t, 'sagittarius', { x: 760, y: 1100, s: 230, mood: 'happy', look: [-1, -0.2], hops: S.hops(2.6, 3.2, 9.8, 10.4) })
    sepia(x, 1)
    tag(x, 'LAST WINTER', 540, 420, S.w(0.4, 13.8), { bg: '#e8d4a8', size: 36 })
    cinemaSeat(x, t, S, 3, S.w(1, 14))
  } })
C.push({ name: 'REALITY', dur: 13, caption: 'reality: *the scarf is stuck.*', captionAt: 5.0,
  fx: [['rec', { at: 1.6, len: 1.6, caption: '*REALITY.*', top: 1180 }]],
  bubbles: [{ at: 6.0, end: 9.0, x: 330, y: 660, text: 'this is fine. very cinematic.', size: 34 }],
  cues: [...[3.6, 4.6, 5.6, 9.4, 10.4].map(v => ['tom', v, 140, { gain: 0.16, decay: 0.12 }])],
  draw(x, t, S) {
    street(x, t, { snow: true, lampX: 860 })
    fence(x, 560, 1050, 480)
    const tug = Math.max(0, Math.sin((S.u - 3.4) * 6)) * (S.u > 3.4 ? 1 : 0)
    star(x, t, LEO, { x: 330 - tug * 30, y: 1180, s: 240, mood: S.u > 3.4 ? 'squint' : 'wink', look: [1, 0], squash: tug * 0.08 })
    x.save(); x.strokeStyle = INK; x.lineWidth = 8; x.beginPath(); x.moveTo(380 - tug * 30, 1170); x.lineTo(600, 1110); x.stroke(); x.restore()
    scarf(x, t * 0.2, 590, 1100, { len: 0.5 })
    if (S.u > 3.6) sfx(x, t, 'tug', 420, 980, S.at(3.6 + Math.floor((S.u - 3.6)) ), { size: 44, col: ACC })
    cinemaSeat(x, t, S, 3, S.w(1, 13))
  } })
C.push({ name: 'THE CO-STAR', dur: 14, caption: 'enter: *a stranger.*',
  bubbles: [{ at: 2.6, end: 5.4, x: 760, y: 640, text: 'hold still.', tail: -0.3, size: 40 }, { at: 6.4, end: 9.0, x: 330, y: 700, text: '…thank you?', tail: 0.2, size: 40 }, { at: 8.8, end: 13.2, x: 760, y: 620, text: 'it was going to rip. I could not watch.', tail: -0.3, size: 32 }],
  cues: [['pop', 5.6, 1046.5, 0.05, 0.3], ['glitter', 5.6, 6.2]],
  draw(x, t, S) {
    street(x, t, { snow: true, lampX: 860 })
    fence(x, 560, 1050, 480)
    const walk = ease.inOutCubic(prog(S.u, 0.4, 2.4)), free = ease.outCubic(prog(S.u, 5.0, 5.8))
    star(x, t, LEO, { x: 300, y: 1180, s: 230, mood: S.u > 6.4 ? 'sparkle' : 'wide', look: [1, -0.2], hops: S.hops(5.6, 6.4) })
    star(x, t, VIR, { x: lerp(1180, 720, walk), y: 1180, s: 230, mood: S.u > 8.8 ? 'happy' : 'squint', look: [-1, 0.2], hops: S.hops(2.6, 5.4, 8.8) })
    scarf(x, t * (0.2 + free), lerp(590, 340, free), lerp(1100, 1160, free), { len: lerp(0.5, 1, free) })
    if (S.u > 5.6) sparkles(x, t, 340, 1100, S.at(5.6), 10, 140, 1)
    cinemaSeat(x, t, S, 2, S.w(1, 14))
  } })
C.push({ name: 'THE CONVERSATION', dur: 15, caption: 'same way home. *soup* talk.',
  bubbles: [
    { at: 1.4, end: 4.0, x: 760, y: 640, text: 'which way are you going?', tail: -0.3, size: 36 },
    { at: 3.8, end: 6.4, x: 330, y: 700, text: 'the soup place.', tail: 0.2, size: 38 },
    { at: 6.2, end: 8.8, x: 760, y: 640, text: 'THE soup place?', tail: -0.3, size: 40 },
    { at: 8.6, end: 11.2, x: 330, y: 700, text: 'tomato basil.', tail: 0.2, size: 38 },
    { at: 11.0, end: 14.6, x: 760, y: 640, text: 'obviously.', tail: -0.3, size: 42 },
  ],
  draw(x, t, S) {
    x.save(); x.translate(-(S.u * 40) % 1080 * 0, 0)
    street(x, t, { snow: true, lampX: 860 - S.u * 30 })
    x.restore()
    star(x, t, LEO, { x: 340, y: 1180, s: 230, mood: S.u > 6 ? 'heart' : 'happy', look: [1, -0.2], hops: S.hops(3.8, 4.4, 6.4, 8.6, 9.2) })
    scarf(x, t, 380, 1180)
    star(x, t, VIR, { x: 740, y: 1180, s: 230, mood: S.u > 11 ? 'happy' : 'neutral', look: [-1, -0.2], hops: S.hops(1.4, 6.2, 6.8, 11.0) })
    if (S.u > 11.2) hearts(x, t, S.at(11.2), 540, 1000)
    cinemaSeat(x, t, S, 3, S.w(1, 15))
  } })
C.push({ name: 'THE NON-MOVIE ENDING', dur: 15.4, caption: null,
  bubbles: [
    { at: 1.0, end: 3.6, x: 760, y: 620, text: 'soup sunday?', tail: -0.3, size: 42 },
    { at: 3.4, end: 6.4, x: 330, y: 700, text: 'soup sunday.', tail: 0.2, size: 42 },
  ],
  cues: [['pop', 4.0, 1046.5, 0.05, 0], ['bell', 4.2, 1318.51, 0.04, 1.0, 0], ['glitter', 4.2, 4.8]],
  draw(x, t, S) {
    street(x, t, { snow: true, lampX: 540 })
    star(x, t, LEO, { x: 320, y: 1180, s: 230, mood: S.u > 3.4 ? 'heart' : 'happy', look: [1, -0.2], hops: S.hops(3.4, 4.0, 7.0) })
    scarf(x, t, 360, 1180)
    star(x, t, VIR, { x: 760, y: 1180, s: 230, mood: 'happy', look: [-1, -0.2], hops: S.hops(1.0, 4.0) })
    tag(x, 'NEW CONTACT: VIRGO (SOUP)', 540, 860, S.w(4.0, 9.0), { bg: MINT, size: 34 })
    tag(x, 'NO KISS. NO RAIN. JUST SOUP.', 540, 960, S.w(5.2, 9.0), { bg: BONE, size: 32, rot: 0.04 })
    if (S.u > 4) confetti(x, t, S.at(4.2), 540, 900)
    cinemaSeat(x, t, S, 3, 1)
    if (S.u > 4.4) for (let i = 0; i < 8; i++) { const f = ((S.u - 4.4) * 0.8 + i / 8) % 1; R(x, '#fff2c0', 1010 + Math.cos(i * 2) * 120 * f, 1400 - 260 * f + 200 * f * f, 12, 14) }
  } })

const EP = makeEp({
  id: 'kxtre04', bug: 'MAIN CHARACTER MOMENT', lead: LEO, accent: ACC, deep: '#b06a10',
  music: { style: 'cinematic', key: 'D', seed: 4104, breakdown: [60.6], lift: [73.6] },
  hook: {
    text: "Leo's walk home | became *a movie.*", len: 3.6, draw: hook, top: 300, size: 100,
    fx: [['whip', { at: -0.08, len: 0.45, from: 1.3, blur: 6 }], ['rec', { at: 1.0, len: 1.5, caption: 'my walk home: *a film.*', top: 1180 }]],
  },
  promiseAt: 2.6,
  promise: 'the ending *isn’t* the movie one.',
  chapters: C,
  overlay(tx, t) {
    const R5 = EP.T.CH[4].a
    bars(tx, t < R5 + 3.2 ? 1 : 1 - ease.inOutCubic(prog(t, R5 + 3.2, R5 + 4.4)))
  },
  last: { text: 'Best scene: | *the unscripted one.*', at: 9.4, top: 300, size: 96 },
  ending: 'loop',
  hits: [60.6, 106.8],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
export const T = EP.T
void [phone, glowSpot, GOLD, PINK, RED, FLOOR, r3]
