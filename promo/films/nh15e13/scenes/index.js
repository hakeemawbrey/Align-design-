// nh15e13: HOME FOR THE HOLIDAYS, "The seating chart." (28 s vertical, Star Talk Season 15 ep 13, music: jazzy · Bb)
// Story 0–25.6, then the shared end card. The season's look lives in ./holikit.js (imported by nh15e14 … nh15e24).
//   0.0–3.0    hook "Who sits *where?*"  Libra mid-hop at a corkboard seating chart, Taurus's place card in hand,
//              Taurus (the date) beside it, nervous.
//   3.0–6.6    "Option 1: by | *Grandma.*"  Taurus at the table next to GRANDMA, who opens the baby-photo album.
//   6.6–10.0   "Option 2: by the | *loud* uncle."  UNCLE laughs; sound rings knock Taurus's place card over.
//   10.0–13.4  "Option 3: by the | *drum* cousin."  The little cousin got a toy drum. Taurus vibrates.
//   13.4       card cut. Back at the board. TAURUS: "can i sit by you? i don't know *anyone.*"
//              Libra flies its OWN card down beside Taurus's. THE STARS: "the new person sits by someone they *know.*"
//   20.0       the table, side by side. Pisces fountains over its glitter place card. "Sit them next to *you.*"
import { makeEp, room, table, plate, candle, pie, mug, placeCard, tissues, rel, sign, pisces, theStars, shadow, sparkles, hearts, bubble, label, box, R, glow,
  tagOf, colOf, pop01, outK, prog, lerp, clamp, ease, easeOutBack, talkHops, INK, BONE, GOLD, PINK, RED, CPS } from './holikit.js'

const LIB = 'libra', TAU = 'taurus'
const LINES = [
  { t: 13.8, speaker: tagOf(TAU), color: '#9fe6b0', text: "can i sit by you? i don't know *anyone.*" },
  { t: 16.6, speaker: 'THE STARS', text: 'the new person sits by someone they *know.*' },
]
const BOXES = [{ open: 13.58, close: 19.85, from: 0, to: 2 }]
const TAU_HOPS = [0.0, 1.2, ...talkHops(LINES, tagOf(TAU), { cps: CPS }), 20.15]
const LIB_HOPS = [-0.12, 0.55, 1.45, 2.3, 17.9, 18.4, 20.1, 21.0]

// ── the corkboard seating chart
const SEATS = { g: [380, 712], u: [540, 712], l: [700, 712], c: [380, 968], m: [540, 968], e: [700, 968], k: [262, 840], t: [818, 840] }
const NAMES = { g: 'GRANDMA', u: 'UNCLE', l: 'LIBRA', c: 'COUSIN', m: 'MOM', k: 'LIL BEE' }
function board(x, t) {
  box(x, 150, 560, 780, 560, '#c08a50', { b: 10, hi: '#d29c62' })
  for (let i = 0; i < 60; i++) R(x, 'rgba(90,50,20,0.35)', 170 + (i * 97) % 740, 580 + (i * 53) % 520, 6, 6)
  box(x, 196, 584, 300, 54, BONE, { b: 5 }); label(x, 'SEATING PLAN ♡', 346, 612, { size: 26, col: INK, shadow: false })
  box(x, 330, 776, 420, 128, '#f3ead8', { b: 6 }); R(x, RED, 500, 776, 80, 128)
  for (const [k, [sx, sy]] of Object.entries(SEATS)) { R(x, INK, sx - 34, sy - 34, 68, 68); R(x, k === 'e' || k === 't' ? '#7a5a3a' : '#9a7650', sx - 28, sy - 28, 56, 56) }
}
function boardCards(x, t, { libMove = 0, tauSeat = null, holdTau = null }) {
  for (const [k, n] of Object.entries(NAMES)) {
    if (k === 'l') continue
    const [sx, sy] = SEATS[k]; placeCard(x, sx, sy - 6, n, { w: 128, k: 0.78 })
  }
  // Libra's own card: flies from the top row down beside Taurus
  const p = ease.inOutCubic(libMove), [ax, ay] = SEATS.l, [bx, by] = SEATS.e
  placeCard(x, lerp(ax, bx, p), lerp(ay, by, p) - 6 - Math.sin(Math.PI * p) * 160, 'LIBRA', { w: 128, k: 0.78 + 0.2 * Math.sin(Math.PI * p), col: '#ffe1ef', rot: Math.sin(Math.PI * p) * 0.4 })
  if (p >= 1) sparkles(x, t, bx, by, 18.25, 10, 70, 1)
  if (tauSeat) { const [sx, sy] = SEATS[tauSeat]; placeCard(x, sx, sy - 6, 'TAURUS', { w: 128, k: 0.78, col: '#d9f5df' }) }
  if (holdTau) placeCard(x, holdTau[0], holdTau[1], 'TAURUS', { w: 150, k: 1, col: '#d9f5df', rot: holdTau[2] ?? 0 })
}

// ── the dining room, Taurus seated with one neighbour (options 1–3)
function dining(x, t, S, who) {
  room(x, t, { wall: '#5e3448', winX: 640, winY: 520, winW: 280, winH: 300, wreathX: 300, wreathY: 600 })
  const k = pop01(t, S.at + 0.05, 0.3, 2)
  if (who === 'GRANDMA') {
    rel(x, t, 'GRANDMA', { x: 330, y: 1020, s: 300, pop: k, mood: 'happy', look: [1, 0], hops: [S.at + 0.6, S.at + 1.6] })
  } else if (who === 'UNCLE') {
    const laugh = Math.max(0, Math.sin((t - S.at) * 9)) * prog(t, S.at + 0.6, S.at + 0.8)
    rel(x, t, 'UNCLE', { x: 320, y: 1010, s: 320, pop: k, mood: 'happy', look: [1, -1], squash: -0.06 * laugh, hops: [S.at + 0.7, S.at + 1.3, S.at + 1.9, S.at + 2.5] })
    for (let i = 0; i < 3; i++) { const ph = ((t - S.at) * 1.4 + i / 3) % 1; if (t < S.at + 0.6) break; x.save(); x.globalAlpha = 1 - ph; x.strokeStyle = GOLD; x.lineWidth = 10; x.beginPath(); x.arc(330, 900, 120 + ph * 320, -0.7, 0.7); x.stroke(); x.restore() }
  } else {
    rel(x, t, 'KID', { x: 360, y: 1080, s: 220, pop: k, mood: 'sparkle', look: [1, 0], hops: Array.from({ length: 12 }, (_, i) => S.at + 0.5 + i * 0.26) })
    // the toy drum + sticks
    const hit = Math.abs(Math.sin((t - S.at) * 12))
    box(x, 260, 1140, 200, 90, RED, { b: 6, hi: '#ff6b7f' }); for (let i = 0; i < 5; i++) R(x, GOLD, 270 + i * 40, 1150, 8, 70); R(x, BONE, 260, 1134, 200, 14)
    for (const d of [-1, 1]) { x.save(); x.translate(360 + d * 60, 1110); x.rotate(d * (0.4 + 0.5 * hit)); R(x, INK, -6, -110, 12, 110); R(x, '#e6c08a', -3, -106, 6, 104); x.restore() }
  }
  // Taurus, nervous; vibrates on option 3
  const vib = who === 'KID' ? Math.sin(t * 90) * 6 : 0
  sign(x, t, TAU, { x: 740 + vib, y: 1020, s: 300, pop: pop01(t, S.at, 0.28, 2), mood: who === 'GRANDMA' ? 'wide' : who === 'UNCLE' ? 'squint' : 'wide', look: [-1, 0], hops: [S.at + 0.1] })
  table(x, 540, 1130, 900, {})
  plate(x, 330, 1122); plate(x, 740, 1122); candle(x, t, 540, 1122, 80)
  placeCard(x, 740, 1104, 'TAURUS', { w: 140, k: 0.8, col: '#d9f5df', rot: who === 'UNCLE' ? clamp((t - S.at - 1.4) * 3, 0, 1) * 1.3 : 0 })
  // the gag props
  if (who === 'GRANDMA') {
    const ak = pop01(t, S.at + 0.9, 0.3, 2.2)
    if (ak > 0.01) { x.save(); x.translate(560, 930); x.scale(ak, ak); x.rotate(-0.06); box(x, -150, -100, 300, 200, '#7a3a5a', { b: 6 }); box(x, -130, -80, 120, 150, BONE, { b: 4 }); box(x, 10, -80, 120, 150, BONE, { b: 4 }); sign(x, t, LIB, { x: -70, y: -5, s: 90, mood: 'happy', glow: 0 }); sign(x, t, LIB, { x: 70, y: -5, s: 90, mood: 'wink', glow: 0 }); x.restore() }
    bubble(x, t, 380, 720, S.at + 1.3, S.end, 'Libra at age four!!', { size: 34, tail: -0.4 })
  } else if (who === 'UNCLE') bubble(x, t, 330, 700, S.at + 0.7, S.end, 'HA HA HA HA!', { size: 40, col: '#fff3a8', tail: -0.3 })
  else bubble(x, t, 360, 760, S.at + 0.6, S.end, 'BOOM BOOM BOOM', { size: 36, col: '#ffd1de', tail: -0.3 })
  // Pisces in the doorway, sniffling more each option
  const pk = pop01(t, S.at + 0.3, 0.3, 2)
  tissues(x, 930, 1240, 70)
  pisces(x, t, { x: 960, y: 1300, s: 140, pop: pk, look: [-1, -1] }, who === 'KID' ? 2 : 1)
}

const shots = [
  { at: 0, cam: [1.1, 540, 1000], draw(x, t) {
    room(x, t, { wall: '#4e3050', window: false, wreath: false })
    board(x, t)
    // Libra flits the Taurus card over three seats while it decides
    const seq = [[SEATS.k, 0], [SEATS.t, 0.9], [SEATS.c, 1.8], [SEATS.t, 2.6]]
    let pos = seq[0][0]
    for (let i = 1; i < seq.length; i++) if (t >= seq[i][1]) pos = seq[i][0]
    boardCards(x, t, { holdTau: [pos[0] + 40 * Math.sin(t * 6), pos[1] - 60, Math.sin(t * 5) * 0.15] })
    sign(x, t, LIB, { x: 300, y: 1290, s: 310, mood: 'sparkle', look: [1, -1], hops: LIB_HOPS, squash: -0.04 })
    sign(x, t, TAU, { x: 790, y: 1310, s: 270, mood: 'wide', look: [-1, -1], hops: TAU_HOPS })
    bubble(x, t, 780, 1100, 0.9, 3.0, 'um…', { size: 34, tail: 0.2 })
  } },
  { at: 3.0, cam: [1.16, 540, 1020], draw: (x, t, S) => dining(x, t, S, 'GRANDMA') },
  { at: 6.6, cam: [1.16, 540, 1020], draw: (x, t, S) => dining(x, t, S, 'UNCLE') },
  { at: 10.0, cam: [1.16, 540, 1020], draw: (x, t, S) => dining(x, t, S, 'KID') },
  { at: 13.4, cam: [1.1, 540, 1000], draw(x, t, S) {
    room(x, t, { wall: '#4e3050', window: false, wreath: false })
    board(x, t)
    boardCards(x, t, { tauSeat: 't', libMove: prog(t, 17.6, 18.25) })
    const tug = t > 13.7 && t < 15.6 ? Math.sin(t * 14) * 8 : 0
    sign(x, t, LIB, { x: 300 + (t > 17.4 ? 60 * ease.inOutCubic(prog(t, 17.4, 17.9)) : 0), y: 1290, s: 310, mood: t > 16.4 ? (t > 18.2 ? 'heart' : 'happy') : 'neutral', look: [1, 0], hops: LIB_HOPS })
    sign(x, t, TAU, { x: 790 + tug, y: 1310, s: 270, mood: t > 18.3 ? 'sparkle' : 'neutral', look: [-1, -0.5], hops: TAU_HOPS })
    if (t > 18.25) hearts(x, t, 18.3, 760, 1150, { n: 5 })
    tissues(x, 980, 1420, 60); pisces(x, t, { x: 990, y: 1490, s: 110, pop: pop01(t, 13.6, 0.3, 2), look: [-1, -1] }, t > 18.3 ? 3 : 2)
    theStars(x, t, { x: 140, y: 470 + 6 * Math.sin(t * 2), s: 130, pop: pop01(t, 16.3, 0.34, 2.2), mood: t > 18.2 ? 'happy' : 'neutral', look: [1, 0], hops: [16.4, 16.9, 17.6] })
  } },
  { at: 20.0, cam: [1.14, 540, 1040], draw(x, t, S) {
    room(x, t, { wall: '#5e3448', winX: 380, winY: 500, winW: 320, winH: 320, wreathX: 860, wreathY: 600, wreath: true })
    rel(x, t, 'GRANDMA', { x: 150, y: 1060, s: 210, mood: 'happy', look: [1, 0], hops: [20.4] })
    rel(x, t, 'UNCLE', { x: 930, y: 1060, s: 220, mood: 'happy', look: [-1, 0], hops: [20.6] })
    sign(x, t, LIB, { x: 420, y: 1000, s: 290, mood: 'heart', look: [1, 0], hops: [20.1, 21.0, 23.2] })
    sign(x, t, TAU, { x: 660, y: 1000, s: 290, mood: 'sparkle', look: [-1, 0], hops: [20.15, 22.6] })
    table(x, 540, 1130, 1040, {})
    plate(x, 420, 1122); plate(x, 660, 1122); pie(x, 540, 1100, 130); candle(x, t, 250, 1122, 70); candle(x, t, 830, 1122, 70); mug(x, 930, 1110, '#3a7fd0')
    placeCard(x, 420, 1078, 'LIBRA', { w: 128, k: 0.8, col: '#ffe1ef' }); placeCard(x, 660, 1078, 'TAURUS', { w: 128, k: 0.8, col: '#d9f5df' })
    // Pisces' own place card glitters; it fountains
    placeCard(x, 900, 1420, 'PISCES', { w: 150, k: 1, col: '#e5f6ff', glitter: true, t, rot: 0.06 })
    pisces(x, t, { x: 920, y: 1300, s: 150, pop: pop01(t, 20.3, 0.3, 2), look: [-1, -1] }, 3)
    hearts(x, t, 20.6, 540, 900, { n: 6 })
  } },
]

const CUTS = [6.6, { t: 13.4, kind: 'flip' }, 20.0]
export const { DURATION, SCENES, CUES } = makeEp({
  duration: 30,
  hook: { text: 'Who sits *where?*', out: [2.75, 2.95], color: '#ffb3d0', size: 96, accentSize: 150 },
  heads: [
    { at: 3.15, out: [6.4, 6.6], text: 'Option 1: by | *Grandma.*', color: '#d8c6f2' },
    { at: 6.75, out: [9.8, 10.0], text: 'Option 2: by the | *loud* uncle.', color: '#a9e2c6' },
    { at: 10.15, out: [13.2, 13.4], text: 'Option 3: by the | *drum* cousin.', color: '#ffc6e0' },
    { at: 13.55, out: [19.8, 20.0], text: 'Option 4: | *beside you.*', color: '#ffb3d0' },
  ],
  shots, lines: LINES, boxes: BOXES,
  last: { at: 20.7, text: 'Sit them next to *you.*', color: '#ffb3d0' },
  punch: [{ at: 8.0, dur: 1.4, z: 0.12, x: 400, y: 900 }, { at: 11.2, dur: 1.3, z: 0.1, x: 600, y: 1050 }],
  cuts: CUTS,
  pitch: { [tagOf(TAU)]: 659.25 },
  cues: [
    ['whoosh', 0.9, 0.2, 0.02], ['whoosh', 1.8, 0.2, 0.02], ['whoosh', 2.6, 0.2, 0.02],
    ['pluck', 4.3, 1318.51, 0.03, 0.5, -0.2], ['pop', 3.95, 880, 0.035, -0.3],
    ...[7.3, 7.6, 7.9, 8.2].map(t => ['pop', t, 1174.66, 0.04, -0.3]), ['tick', 8.05, 0.05],
    ...Array.from({ length: 10 }, (_, i) => ['tom', 10.5 + i * 0.26, 110 + (i % 2) * 30, { gain: 0.12, decay: 0.12 }]),
    ['whoosh', 17.6, 0.5, 0.035], ['pop', 18.25, 1174.66, 0.05, 0.2], ['glitter', 18.25, 18.7], ['bell', 18.3, 1760, 0.025, 1.0, 0],
    ['pop', 16.35, 739.99, 0.03, -0.4], ['glitter', 20.6, 21.2],
  ],
})
