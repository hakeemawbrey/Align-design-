// nsge18 · Remix: Snow Globe Cities · "Copenhagen: the coziest flat" (30 s vertical, music: lofi · Ab) · story 0–25.6, then
// the shared end card. Look: ../nsge15/globekit.js. Rows: promo/films/next30/b17.md.
//   0.00–5.2   "Copenhagen, in a | snow *globe.*"  Tall coloured harbour houses over a canal. ♋ Cancer at the door of a glowing
//              flat, lighting candle after candle in the window. CANCER: "my place is ready." → "…where's my person?"
//   5.4–13.0   "All the candles. | *No* visitors."  A blanket and a mug pop in. "blanket? check. cocoa? check." THE STARS:
//              "they can't find you if you never leave." Cancer gasps and steps out to the snowy bike lane.
//  13.4        card cut.
//  13.55–20.8 "Step *outside.*"  ♑ Capricorn wobbles in on a bike and stops: "sorry! the snow made me wobble." CANCER: "want
//              some cocoa?" They walk back to the window together.
//  21.0–25.5   "Cozy is better | *with company.*"  A talk card ("What's your comfort meal?"). Pisces fountains.
import { globeFilm, G, GOLD, BONE, INK, PINK, ICE, pop01, outK, popOut, inR, walk, drawBits, heart, sparkles, chip, drawCard } from '../../nsge15/globekit.js'
import { clamp, lerp, prog, ease } from '../../../src/lib.js'

const T = {
  h0Out: [5.0, 5.2], candles: [-1, -1, -1, 1.5, 2.1, 2.7, 3.9, 4.4],
  h1: 5.4, h1Out: [12.85, 13.05], blanket: 5.9, mug: 6.9, starsIn: 8.6, gasp: 10.4, out1: [11.1, 12.1], cut: 13.4,
  h2: 13.55, h2Out: [20.7, 20.9], bike: [14.1, 15.6], home: [20.0, 21.2],
  h3: 21.0, card: [21.6, 22.1], out: [25.1, 25.45],
}
const GY = G.ground - 62
const CAN_X = t => walk(t, [[T.out1[0], 300, 0], [T.out1[1], 520, 0], [T.home[0], 520, 0], [T.home[1], 330, 0]])[0]
const CAP_X = t => walk(t, [[T.bike[0], 1150, 0], [T.bike[1], 720, 0], [T.home[0] + 0.1, 720, 0], [T.home[1] + 0.1, 520, 0]])[0]
const SILL = { x: 300, y: 985 }
const CANDLE_X = [-96, -48, 0, 48, 96, -72, 72, -24]

function skyline(x, t) {
  // the canal with boats, the far row of houses
  x.fillStyle = '#16244c'; x.fillRect(140, 1080, 800, 40)
  for (let i = 0; i < 6; i++) { x.fillStyle = '#2c4a80'; x.fillRect(170 + i * 130 + 20 * Math.sin(t + i), 1094, 50, 4) }
  const COLS = ['#f2c75c', '#d8484a', '#3f7cf0', '#f29a4a', '#5fd38a', '#e8628a', '#c9a6ff', '#f2c75c']
  for (let i = 0; i < 8; i++) {
    const hx = 520 + i * 60, h = 180 + (i % 3) * 30, y0 = 1080, w = 58
    x.fillStyle = INK; x.fillRect(hx - w / 2 - 2, y0 - h - 2, w + 4, h + 2)
    x.fillStyle = COLS[i]; x.fillRect(hx - w / 2, y0 - h, w, h)
    x.fillStyle = COLS[i]; x.beginPath(); x.moveTo(hx - w / 2, y0 - h); x.lineTo(hx, y0 - h - 34); x.lineTo(hx + w / 2, y0 - h); x.fill()
    x.fillStyle = '#e9f2ff'; x.beginPath(); x.moveTo(hx - 14, y0 - h - 20); x.lineTo(hx, y0 - h - 34); x.lineTo(hx + 14, y0 - h - 20); x.fill()
    for (let r = 0; r < 3; r++) { x.fillStyle = (i + r) % 3 ? '#ffe08a' : '#4a3a2a'; x.fillRect(hx - 18, y0 - h + 22 + r * 50, 12, 20); x.fillRect(hx + 6, y0 - h + 22 + r * 50, 12, 20) }
  }
  // boats
  for (const [bx, col] of [[620, '#d8484a'], [820, '#3f7cf0']]) { x.fillStyle = INK; x.fillRect(bx - 44, 1088, 88, 18); x.fillStyle = col; x.fillRect(bx - 40, 1090, 80, 12); x.fillStyle = '#e9f2ff'; x.fillRect(bx - 4, 1040, 4, 50) }
  // Cancer's flat: a cream house front with a big glowing window
  x.fillStyle = INK; x.fillRect(150, 760, 310, 400); x.fillStyle = '#efe0bd'; x.fillRect(154, 764, 302, 396)
  x.fillStyle = '#c94f3a'; x.beginPath(); x.moveTo(140, 764); x.lineTo(305, 690); x.lineTo(470, 764); x.fill()
  x.fillStyle = '#e9f2ff'; x.fillRect(150, 756, 310, 10)
  const glow = clamp(0.45 + 0.07 * T.candles.filter(c => t > c).length)
  x.fillStyle = INK; x.fillRect(SILL.x - 120, 800, 240, 190)
  const g = x.createLinearGradient(0, 806, 0, 985); g.addColorStop(0, `rgba(255,190,110,${glow})`); g.addColorStop(1, `rgba(255,140,80,${glow})`)
  x.fillStyle = '#2a1c18'; x.fillRect(SILL.x - 114, 806, 228, 178); x.fillStyle = g; x.fillRect(SILL.x - 114, 806, 228, 178)
  x.fillStyle = INK; x.fillRect(SILL.x - 3, 806, 6, 178); x.fillRect(SILL.x - 114, 890, 228, 6)
  x.fillStyle = '#8c5638'; x.fillRect(SILL.x - 130, SILL.y, 260, 14)
}
function candles(x, t) {
  T.candles.forEach((c, i) => {
    const k = c < 0 ? 1 : pop01(t, c, 0.3, 2.6)
    if (k <= 0.01) return
    const cx = SILL.x + CANDLE_X[i] * 1.2, cy = SILL.y - 26 - (i >= 5 ? 44 : 0)
    const fl = Math.sin(t * 18 + i) > 0 ? '#ffb347' : '#ffd23a'
    drawBits(x, ['.F.', 'FYF', '.W.', '.W.', 'WWW'], { F: fl, Y: '#fff1c8', W: '#f4e8cc' }, cx, cy, 8 * k)
    if (c > 0) sparkles(x, t, cx, cy - 20, c, 5, 30, i, [GOLD, '#fff1c8'])
  })
}
function bike(x, t, bx, by) {
  const wob = inR(t, T.bike[0], T.bike[1] + 0.4) ? 0.12 * Math.sin(t * 14) * (1 - prog(t, T.bike[1] - 0.2, T.bike[1] + 0.4)) : 0
  x.save(); x.translate(bx, by); x.rotate(wob)
  x.strokeStyle = INK; x.lineWidth = 12; for (const wx of [-62, 62]) { x.beginPath(); x.arc(wx, 0, 34, 0, Math.PI * 2); x.stroke() }
  x.strokeStyle = '#cfd6ec'; x.lineWidth = 6; for (const wx of [-62, 62]) { x.beginPath(); x.arc(wx, 0, 34, 0, Math.PI * 2); x.stroke() }
  x.strokeStyle = '#3fb0a0'; x.lineWidth = 8; x.beginPath(); x.moveTo(-62, 0); x.lineTo(-10, -50); x.lineTo(40, -50); x.lineTo(62, 0); x.moveTo(-10, -50); x.lineTo(0, 0); x.lineTo(-62, 0); x.moveTo(40, -50); x.lineTo(50, -76); x.stroke()
  x.fillStyle = INK; x.fillRect(32, -84, 40, 10)
  x.restore()
}

export const { DURATION, SCENES, CUES, MUSIC } = globeFilm({
  id: 'nsge18', plate: 'Copenhagen', lead: 'cancer', partner: 'capricorn',
  sky: { top: '#0b0f30', bot: '#2b2652', glow: '#ffb070' },
  shakes: [-0.25],
  skyline(x, t) { skyline(x, t); candles(x, t) },
  back(x, t) {
    if (t > T.bike[0] && t < T.home[0] + 0.1) bike(x, t, CAP_X(t), G.ground - 20)
    else if (t >= T.home[0] + 0.1) bike(x, t, 760, G.ground - 20)
    chip(x, 800, G.ground + 40, 'BIKE LANE', pop01(t, T.out1[0], 0.3, 2.2) * outK(t, T.h2Out), { size: 22, col: ICE, bar: ICE })
  },
  cast(t, K) {
    let cm = 'happy', cl = [-1, -0.6]
    if (t > 3.2) { cm = 'neutral'; cl = [1, 0] }
    if (t > T.blanket) { cm = 'happy'; cl = [0, 0.6] }
    if (t > T.starsIn + 0.3) { cm = 'neutral'; cl = [1, -1] }
    if (t > T.gasp) { cm = 'wide'; cl = [1, 0] }
    if (t > T.out1[1]) cm = 'neutral'
    if (t > T.bike[1]) cm = 'wide'
    if (t > 17.0) cm = 'happy'
    if (t > T.home[0]) cm = 'heart'
    const capOn = t > T.bike[0]
    const capY = t < T.home[0] + 0.1 ? GY - 70 : lerp(GY - 70, GY, ease.inOutCubic(prog(t, T.home[0] - 0.4, T.home[0] + 0.1)))
    return [
      { sign: 'cancer', x: CAN_X(t), y: GY, s: 186, mood: cm, look: cl, hops: [0.0, 1.6, 2.8, T.blanket, T.mug, T.gasp, T.out1[1], T.home[1], 22.6, ...K.HOPS.lead], seed: 8, hat: '#ff8fb1' },
      capOn ? { sign: 'capricorn', x: t < T.home[0] + 0.1 ? CAP_X(t) + 20 : CAP_X(t), y: capY, s: 170, mood: t < T.bike[1] + 0.3 ? 'wide' : t < 18.4 ? 'squint' : 'happy', look: [-1, 0], hops: [T.bike[1] + 0.05, T.home[0] - 0.2, T.home[1] + 0.1, 22.8, ...K.HOPS.partner], seed: 12, hat: '#3fb0a0' } : null,
    ]
  },
  front(x, t) {
    // the blanket over Cancer's shoulders and the mug
    const bk = pop01(t, T.blanket, 0.3, 2.4) * outK(t, [T.gasp, T.gasp + 0.3])
    if (bk > 0.01) drawBits(x, ['RRRRRRRRRR', 'RWRWRWRWRW', 'RRRRRRRRRR', 'WRWRWRWRWR'], { R: '#c94f3a', W: '#f4e8cc' }, CAN_X(t), GY + 40, 10 * bk)
    const mk = t < T.home[0] ? pop01(t, T.mug, 0.3, 2.4) * outK(t, [T.gasp, T.gasp + 0.3]) + (t > 18.4 ? pop01(t, 18.6, 0.3, 2.4) : 0) : 1 - prog(t, 22.2, 22.4)
    if (mk > 0.01) { const mx = CAN_X(t) + 100, my = GY - 10; drawBits(x, ['.S.S.', 'MMMM.', 'MMMMH', 'MMMMH', 'MMMM.'], { M: '#f4f8ff', H: '#f4f8ff', S: 'rgba(255,255,255,0.6)' }, mx, my, 9 * clamp(mk)) }
    if (t > T.home[1] && t < T.out[1]) for (let i = 0; i < 3; i++) { const tt = t - T.home[1] - i * 0.4; if (tt > 0 && tt < 2.4) heart(x, 425 + 26 * Math.sin(tt * 3 + i), GY - 150 - tt * 70, 6, i % 2 ? '#ff4f86' : '#ff8fb1', { alpha: 1 - tt / 2.4 }) }
  },
  stars(t) {
    const k = pop01(t, T.starsIn, 0.4, 2.1) * popOut(t, T.out)
    return { x: 925, y: 650, s: 125, mood: t < T.cut ? 'squint' : t > T.home[0] ? 'sparkle' : 'happy', look: [-1, 0.7], pop: k }
  },
  pisces(t) {
    return { x: 126, y: 1200, s: 150, mood: inR(t, T.gasp, T.gasp + 1) ? 'wide' : t > T.home[0] ? 'happy' : 'sparkle', look: [1, -0.3], tears: t < 3.2 ? 1 : t < T.home[0] ? 2 : 3, hops: [T.gasp + 0.1, T.home[1]] }
  },
  over(x, t, K) {
    chip(x, 300, 1260, 'CHECK', pop01(t, 6.9, 0.25, 2.6) * outK(t, [8.4, 8.6]), { size: 26, col: '#9fe6b0', bar: '#5fd38a', rot: -0.06 })
    if (t > T.card[0]) {
      const k = ease.outBack(prog(t, ...T.card)), o = popOut(t, T.out)
      drawCard(x, K.img.talk5, 600, lerp(1400, 860, k) + 6 * Math.sin(t * 2), 180 * o, lerp(0.5, 0.05, k))
    }
    sparkles(x, t, 600, 860, T.card[1], 12, 140, 2, [GOLD, PINK, BONE])
  },
  heads: [
    { text: 'Copenhagen, in a | snow *globe.*', at: -1, lateAt: -0.6, out: T.h0Out, accentColor: '#ffb070' },
    { text: 'All the candles. | *No* visitors.', at: T.h1, lateAt: T.h1 + 0.35, out: T.h1Out, accentColor: GOLD },
    { text: 'Step | *outside.*', at: T.h2, lateAt: T.h2 + 0.3, out: T.h2Out, accentColor: ICE },
    { text: 'Cozy is better | *with company.*', at: T.h3, lateAt: T.h3 + 0.4, out: T.out, accentColor: PINK },
  ],
  boxes: [
    { open: 0.8, close: 12.8, lines: [
      { t: 1.0, who: 'lead', text: 'my place is *ready.*' },
      { t: 3.2, who: 'lead', text: "…where's my *person?*" },
      { t: 6.0, who: 'lead', text: 'blanket? check. cocoa? *check.*' },
      { t: 8.9, who: 'stars', text: "they can't find you if you *never leave.*" },
    ] },
    { open: 15.7, close: 22.2, lines: [
      { t: 15.9, who: 'partner', text: 'sorry! the snow made me *wobble.*' },
      { t: 18.4, who: 'lead', text: 'want some *cocoa?*' },
    ] },
  ],
  cuts: [T.h1Out[1] - 0.6, { t: T.cut, kind: 'flip' }, T.h2Out[1]],
  music: { style: 'lofi', key: 'Ab', seed: 1818, drop: T.h1, breakdown: [T.cut], lift: [T.bike[1]], hits: [T.h3] },
  cues: [
    ...T.candles.filter(c => c > 0).map((c, i) => ['pluck', c, [880, 987.77, 1174.66, 1318.51, 1567.98][i % 5], 0.035, 0.5, -0.3]),
    ['pop', T.blanket, 659.25, 0.04, 0], ['pop', T.mug, 880, 0.04, 0.2], ['pop', T.starsIn, 739.99, 0.035, 0.4],
    ['pluck', T.gasp, 1318.51, 0.04, 0.3, 0], ['whoosh', T.out1[0], 0.4, 0.03],
    ['whoosh', T.bike[0], 0.8, 0.04], ...[14.5, 14.8, 15.1].map(c => ['tick', c, 0.03]), ['bell', T.bike[1], 2093, 0.03, 0.6, 0.3],
    ['whoosh', T.home[0], 0.4, 0.025], ['whoosh', T.card[0], 0.4, 0.04], ['pluck', T.card[1], 1318.51, 0.04, 0.6, 0.2],
  ],
})
