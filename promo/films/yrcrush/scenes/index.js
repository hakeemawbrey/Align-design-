// yrcrush: THEN vs NOW, "Crush slideshows in 2016 / 2026" (20 s vertical, Star Talk Then vs Now §18, music: funk · G)
// Story 0–15.6, then the shared end card. The format engine is ./yrkit.js (identical in every Block D film).
//   THEN (old-phone footage, 06·03·2016, a sleepover): ♌ Leo presents a crush slideshow on a bedsheet pinned to the
//     wall, lit by a propped-up phone. Rule of three: "1 / 30 · their hand ♡" → "9 / 30 · their shoe" → "23 / 30 · back
//     of their head (blurry)". LEO: "and THIS is how they hold a *pencil*."  In sleeping bags: ♈ Aries asleep (zzz),
//     ♓ Pisces in tears.
//   6.71 card cut → NOW: brunch. Same friends, same Leo, a tablet on a stand: "1 / 30 · their dog" → "9 / 30 · their
//     shoe (again)". Aries asleep in the pancakes (callback). The twist: the crush, ♎ Libra, is at the table now:
//     "wait. is slide 9 *my shoe*?"  → "30 / 30 · us ♡". Libra melts.
//   12.27 payoff: the 2016 polaroid (the bedsheet slideshow) drops in. THE STARS: "new table. *same* heart."
//   13.38 last line: "Some things *never change*."
import { makeThenNow, drawBits, bubble, label, star, pisces, heart, sparkles, R, INK, BONE, GOLD, CREAM, INTER, MONO,
  signStar, prog, ease, lerp, clamp, r3, BEAT, pop01, outK } from './yrkit.js'

const LEO = signStar('leo'), ARI = signStar('aries'), LIB = signStar('libra')
const SHOE = ['..WWWW....', '.WWBBWW...', 'WWWWWWWWW.', 'WWWWWWWWWW', 'RRRRRRRRRR']
const DOG = ['BB.........', 'BBBB.......', 'BEBBBBBBBBT', 'BBBBBBBBBB.', 'N..BBBBBBB.', '...B.B.B.B.', '...B.B.B.B.']
const HAND = ['..F.F.F..', '..F.F.F.F', 'F.FFFFFFF', 'FFFFFFFFF', '.FFFFFFF.', '..FFFFF..', '..FFFFF..']
const PANCAKE = ['..YYYYYY..', '.CCCCCCCC.', 'BBBBBBBBBB', 'CCCCCCCCCC', 'BBBBBBBBBB']
const SCR = { cx: 560, cy: 790, w: 560, h: 380 }

// slide pictures, drawn in a 560×380 box centred on 0,0
const PICS = {
  hand(x) { drawBits(x, HAND, { F: LIB.color }, 0, -10, 24) },
  shoe(x) { drawBits(x, SHOE, { W: '#f6efe2', B: LIB.color, R: '#c9b28a' }, 0, -6, 26) },
  head(x, t) { x.save(); x.filter = 'blur(9px)'; star(x, 30, 40, 300, t, { color: LIB.color, mood: 'neutral', look: [1, -1], seed: 5, glow: 0.4, tips: false }); x.restore(); x.filter = 'none' },
  dog(x) { drawBits(x, DOG, { B: '#c98a52', E: INK, N: INK, T: '#c98a52' }, 0, -4, 24) },
  us(x, t) {
    star(x, -90, 30, 190, t, { color: LEO.color, mood: 'happy', seed: 3, glow: 0.6, tips: false })
    star(x, 90, 30, 190, t, { color: LIB.color, mood: 'happy', seed: 5, glow: 0.6, tips: false })
    heart(x, 0, -110, 6)
  },
}
function slide(x, t, cx, cy, s, sl, k, { sheet = false } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(s, s)
  const { w, h } = SCR
  x.save(); x.beginPath(); x.rect(-w / 2, -h / 2, w, h); x.clip()
  x.fillStyle = sheet ? '#3a2f5a' : '#241a4a'; x.fillRect(-w / 2, -h / 2, w, h)
  x.globalAlpha *= k
  x.save(); x.translate(0, -24); PICS[sl.pic](x, t); x.restore()
  x.restore()
  x.globalAlpha *= k
  x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  const cw = x.measureText(sl.cap).width; if (cw > w - 40) x.font = `800 ${Math.floor(34 * (w - 40) / cw)}px ${INTER}`
  x.fillStyle = 'rgba(6,4,18,0.75)'; x.fillRect(-w / 2, h / 2 - 66, w, 66)
  x.fillStyle = BONE; x.fillText(sl.cap, 0, h / 2 - 32)
  x.font = `700 26px ${MONO}`; x.textAlign = 'left'; x.fillStyle = GOLD; x.fillText(sl.n, -w / 2 + 14, -h / 2 + 24)
  x.restore()
}
function curSlide(t, list) { let c = null; for (const s of list) if (t >= s.at) c = s; return c }
function sleepingBag(x, cx, cy, col) { R(x, INK, cx - 130, cy - 10, 260, 150); R(x, col, cx - 124, cy - 4, 248, 138); R(x, 'rgba(255,255,255,0.25)', cx - 124, cy - 4, 248, 18); R(x, '#f6efe2', cx - 124, cy + 22, 248, 6) }

const THEN_SL = [
  { at: BEAT(2), pic: 'hand', cap: 'their hand ♡︎', n: '1 / 30' },
  { at: BEAT(5), pic: 'shoe', cap: 'their shoe', n: '9 / 30' },
  { at: BEAT(8), pic: 'head', cap: 'back of their head (blurry)', n: '23 / 30' },
]

const EP = makeThenNow({
  thing: 'Crush slideshows', thenYear: '2016', stamp: '06·03·2016', clock: 'AM 1:14',
  thenBack(x, t) {
    const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#2a1d4e'); g.addColorStop(1, '#140c28')
    x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
    // the bedsheet screen, pinned up, a little wrinkled
    R(x, '#d9d0e6', SCR.cx - 300, SCR.cy - 210, 600, 420)
    for (let i = 0; i < 6; i++) R(x, 'rgba(120,100,150,0.18)', SCR.cx - 300 + i * 100 + 30 * Math.sin(i), SCR.cy - 210, 6, 420)
    for (const px of [SCR.cx - 290, SCR.cx + 284]) { R(x, INK, px - 4, SCR.cy - 220, 14, 14); R(x, '#ff6f8e', px - 1, SCR.cy - 217, 8, 8) }
    // the floor
    R(x, '#1c1230', 0, 1150, 1080, 800)
    // the projector beam from the propped-up phone
    x.fillStyle = 'rgba(255,240,210,0.08)'; x.beginPath(); x.moveTo(540, 1180); x.lineTo(SCR.cx - 280, SCR.cy + 190); x.lineTo(SCR.cx + 280, SCR.cy + 190); x.closePath(); x.fill()
    R(x, INK, 520, 1160, 44, 30); R(x, '#5a5a6a', 524, 1164, 36, 22); R(x, '#fff3c0', 536, 1166, 10, 6)
  },
  then(x, t) {
    const sl = curSlide(t, THEN_SL)
    if (sl) slide(x, t, SCR.cx, SCR.cy, 1, sl, clamp((t - sl.at) / 0.12), { sheet: true })
    else { label(x, 'CRUSH: A PRESENTATION', SCR.cx, SCR.cy, { size: 34, col: '#3a2f5a', alpha: pop01(t, 0.6, 0.3, 2) }) }
    // the friends in sleeping bags
    star(x, 700, 1210, 190, t, { color: ARI.color, glyph: ARI.glyph, mood: 'sleepy', seed: 9, glow: 0.7 })
    sleepingBag(x, 700, 1250, '#4f8fd6')
    pisces(x, t, 940, 1210, 170, { tears: t > BEAT(8) ? 3 : 2, mood: 'sparkle', look: [-1, -1] })
    sleepingBag(x, 940, 1250, '#d66fa8')
    // Leo presenting with a pointer
    const hops = [0.5, ...THEN_SL.map(s => s.at)]
    star(x, 190, 1010, 250, t, { color: LEO.color, glyph: LEO.glyph, mood: t > BEAT(8) ? 'heart' : 'sparkle', look: [1, -1], seed: 3, glow: 1, hops })
    const wig = Math.sin(t * 7) * 0.08 + (THEN_SL.some(s => t > s.at && t < s.at + 0.2) ? -0.3 : 0)
    x.save(); x.translate(270, 960); x.rotate(-0.75 + wig); R(x, INK, -3, -4, 190, 10); R(x, '#c9a06a', 0, -1, 184, 4); R(x, GOLD, 178, -4, 12, 10); x.restore()
    if (t > BEAT(8) + 0.5) bubble(x, 700, 1060, 'zzz', { k: pop01(t, BEAT(8) + 0.5, 0.25, 2), size: 24, tail: -1 })
  },
  snap: { at: 4.3, cx: 560, cy: 900, size: 780 },
  now(x, t, lt, P) {
    const T = EP.T
    const S = [
      { at: r3(T.cut + 0.5), pic: 'dog', cap: 'their dog', n: '1 / 30' },
      { at: r3(T.cut + 1.75), pic: 'shoe', cap: 'their shoe (again)', n: '9 / 30' },
      { at: r3(T.cut + 4.25), pic: 'us', cap: 'us ♡︎', n: '30 / 30' },
    ]
    const ask = 9.15, melt = S[2].at
    // the tablet on a stand
    const tk = pop01(t, T.cut + 0.15, 0.35, 1.8)
    x.save(); x.translate(SCR.cx, SCR.cy + 30); x.scale(tk, tk); x.translate(-SCR.cx, -SCR.cy - 30)
    R(x, INK, SCR.cx - 300, SCR.cy - 210, 600, 420); R(x, '#3a3550', SCR.cx - 294, SCR.cy - 204, 588, 408)
    const sl = curSlide(t, S)
    if (sl) slide(x, t, SCR.cx, SCR.cy, 0.98, sl, clamp((t - sl.at) / 0.12))
    R(x, INK, SCR.cx - 20, SCR.cy + 210, 40, 120); R(x, '#5a5a6a', SCR.cx - 14, SCR.cy + 210, 28, 116)
    x.restore()
    // brunch table
    R(x, INK, 40, 1200, 1000, 30); R(x, '#f6efe2', 44, 1204, 992, 22); R(x, '#ff9ec4', 44, 1220, 992, 6)
    // the friends: Aries asleep in the pancakes, Pisces still in tears
    star(x, 700, 1140, 190, t, { color: ARI.color, glyph: ARI.glyph, mood: 'sleepy', seed: 9, glow: 0.7, squash: 0.05 })
    drawBits(x, PANCAKE, { Y: '#ffe36a', C: '#e8b46a', B: '#b8783a' }, 700, 1190, 12)
    pisces(x, t, 940, 1140, 170, { tears: t > melt ? 3 : 2, mood: 'happy', look: [-1, -1] })
    // Leo presenting, and the crush, ♎ Libra, at the table now
    star(x, 190, 1060, 240, t, { color: LEO.color, glyph: LEO.glyph, mood: t > melt ? 'heart' : 'sparkle', look: [1, -1], seed: 3, glow: 1, hops: [T.cut + 0.2, ...S.map(s => s.at)] })
    x.save(); x.translate(260, 1010); x.rotate(-0.8 + Math.sin(t * 7) * 0.06); R(x, INK, -3, -4, 170, 10); R(x, '#c9a06a', 0, -1, 164, 4); R(x, GOLD, 158, -4, 12, 10); x.restore()
    const lk = pop01(t, T.cut + 0.35, 0.35, 2)
    star(x, 440, 1130, 200, t, { color: LIB.color, glyph: LIB.glyph, mood: t > melt ? 'heart' : t > ask - 0.3 ? 'wide' : 'happy', look: t > ask - 0.3 && t < melt ? [1, -1] : undefined, seed: 5, glow: 1, pop: lk, hops: [ask - 0.3, melt + 0.1, melt + 0.5] })
    if (t > melt) { sparkles(x, t, SCR.cx, SCR.cy, melt + 0.05, 12, 300, 0.5, [GOLD, LIB.color, BONE]); for (let i = 0; i < 3; i++) { const ph = ((t - melt) * 0.6 + i / 3) % 1; heart(x, 380 + i * 60, 980 - ph * 160, 4, { alpha: Math.sin(Math.PI * ph) * outK(t, [T.pay, T.pay + 0.3]) }) } }
    if (t > 8.2) bubble(x, 700, 990, 'zzz', { k: pop01(t, 8.2, 0.25, 2), size: 24, tail: -1 })
    void lt; void P; void CREAM; void lerp; void ease
  },
  lines: [
    { t: 2.5, speaker: `${LEO.glyph}︎ LEO`, color: '#ffcf7a', text: 'and THIS is how they hold a *pencil*.' },
    { t: 9.15, speaker: `${LIB.glyph}︎ THE CRUSH`, color: '#ffc6e6', text: 'wait. is slide 9 *my shoe*?' },
  ],
  starsLine: 'new table. *same* heart.',
  last: 'Some things *never change*.', lastAccent: '#ffcf7a',
  cues: T => [
    // slide clicks (the old projector clunk, then the tablet tap)
    ...THEN_SL.flatMap((s, i) => [['tick', r3(s.at - 0.02), 0.07], ['tom', r3(s.at), 150, { gain: 0.1, decay: 0.1 }], ['pop', r3(s.at + 0.05), [987.77, 1174.66, 1318.51][i], 0.03, -0.2]]),
    ['pluck', r3(BEAT(8) + 0.5), 523.25, 0.02, 0.6, 0.3],
    ...[0.5, 1.75, 4.25].map((d, i) => ['pop', r3(T.cut + d), [1318.51, 1567.98, 1975.53][i], 0.035, -0.1]),
    ['pluck', 8.95, 659.25, 0.035, 0.4, 0], ['bell', r3(T.cut + 4.3), 1760, 0.03, 1.0, 0], ['glitter', r3(T.cut + 4.25), r3(T.cut + 4.8)],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const TIMES = EP.T
