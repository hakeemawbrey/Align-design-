// npve22 · POV: You're Dating a ___ · ep 22 · "POV: you're dating a Capricorn. The card." (15 s vertical, pop · G)
// Story 0–12.6, then the short end card. Rows: promo/films/next30/b43.md. Look: ../../npve01/scenes/datekit.js.
//   0.0–2.3   hook: ♑ CAPRICORN in the kitchen, proudly holding out an ice scraper with a big bow on it.
//   2.3–6.0   (1) CAPRICORN: "for your windshield. *very* useful."  Sticker: "the most *practical* gift".
//   6.2       card cut.
//   6.3–9.8   (2, the turn) the camera finds the bin behind it: overflowing with crumpled drafts. The card on top:
//             "I'm really glad it's you." CAPRICORN: "the card took *six drafts.*"  Sticker: "draft *six* made it".
//   10.0      Last line: "*Practical* gift. Six drafts of feelings."  Pisces, outside the window, cries happy tears all film.
import { makePOV, drawStarChar, signStar, drawBits, HEART, sparkles, pisces, R, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, HOT, INTER, SERIF, r3 } from '../../npve01/scenes/datekit.js'
import { talkHops } from '../../startalk.js'

const CP = signStar('capricorn'), PN = `${CP.glyph}︎ CAPRICORN`
const T = { cut: 6.2, pan: [6.3, 7.0], card: [7.2, 7.8], last: 10.0 }
const LINES = [
  { t: 2.4, speaker: PN, text: 'for your windshield. *very* useful.', color: '#b9e0c8' },
  { t: 7.9, speaker: PN, text: 'the card took *six drafts.*', color: '#b9e0c8' },
]
const HOPS = [0.2, ...talkHops(LINES, PN), T.card[1], T.last + 0.3, T.last + 0.8]

function scraper(x, t, cx, cy, rot) {
  // a wide, thin plastic ice scraper (blade up), a bow on the handle and a gift tag that says what it is
  x.save(); x.translate(cx, cy); x.rotate(rot)
  R(x, INK, -24, -20, 48, 190); R(x, '#3a6ad8', -18, -14, 36, 178)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-40, -10); x.lineTo(40, -10); x.lineTo(150, -80); x.lineTo(150, -100); x.lineTo(-150, -100); x.lineTo(-150, -80); x.fill()
  x.fillStyle = '#8fc8ff'; x.beginPath(); x.moveTo(-36, -16); x.lineTo(36, -16); x.lineTo(142, -82); x.lineTo(142, -94); x.lineTo(-142, -94); x.lineTo(-142, -82); x.fill()
  R(x, '#e4f4ff', -142, -94, 284, 5)
  drawBits(x, ['RR...RR', 'RRR.RRR', '.RRRRR.', '..R.R..', '.R...R.'], { R: '#e8283c' }, 0, 60, 11)
  x.strokeStyle = INK; x.lineWidth = 3; x.beginPath(); x.moveTo(20, 70); x.lineTo(70, 130); x.stroke()
  x.save(); x.translate(70, 150); x.rotate(-0.2); R(x, INK, -84, -26, 168, 52); R(x, '#fff8ef', -80, -22, 160, 44); x.fillStyle = INK; x.font = `800 20px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('ICE SCRAPER', 0, 1); x.restore()
  x.restore()
}
function bin(x, t, cx, by) {
  // crumpled drafts piled high
  for (let i = 0; i < 9; i++) { const px = cx - 90 + (i % 4) * 60 + (i > 3 ? 30 : 0), py = by - 230 - Math.floor(i / 4) * 50; x.fillStyle = INK; x.beginPath(); x.arc(px, py, 38, 0, Math.PI * 2); x.fill(); x.fillStyle = '#fff8ef'; x.beginPath(); x.arc(px, py, 32, 0, Math.PI * 2); x.fill(); x.strokeStyle = '#c9c3e6'; x.lineWidth = 4; x.beginPath(); x.moveTo(px - 18, py - 6); x.lineTo(px + 4, py + 10); x.lineTo(px + 18, py - 12); x.stroke() }
  R(x, INK, cx - 130, by - 240, 260, 246); R(x, '#5a5470', cx - 122, by - 232, 244, 232); for (let i = 0; i < 5; i++) R(x, '#4a4466', cx - 110 + i * 50, by - 220, 12, 210)
  x.fillStyle = BONE; x.font = `700 26px 'Space Mono', monospace`; x.textAlign = 'center'; x.fillText('DRAFTS 1–5', cx, by - 100)
}
function card(x, t) {
  const k = ease.outBack(prog(t, ...T.card))
  if (t < T.card[0]) return
  x.save(); x.translate(lerp(820, 640, k), lerp(1100, 960, k)); x.rotate(lerp(0.3, -0.05, k)); x.scale(k, k)
  R(x, INK, -170, -120, 340, 240); R(x, '#fff8ef', -164, -114, 328, 228)
  x.fillStyle = '#c8283c'; x.font = `italic 500 42px ${SERIF}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('I’m really glad', 0, -34); x.fillText('it’s you.', 0, 16)
  x.fillStyle = '#7a7494'; x.font = `700 20px 'Space Mono', monospace`; x.fillText('(draft 6)', 0, 74)
  x.restore()
}

const EP = makePOV({
  id: 'npve22', duration: 15, set: 'kitchen',
  caption: 'you’re dating a *Capricorn.* The card.',
  captionSize: 46,
  lines: LINES,
  boxes: [{ from: 0, to: 2, open: 2.2, close: 9.8 }],
  stickers: [
    { at: 3.6, out: [5.95, 6.1], text: 'the most *practical* gift', x: 540, y: 330, rot: -2.5, size: 46, kind: 'light' },
    { at: 8.7, out: [9.6, 9.8], text: 'draft *six* made it', x: 540, y: 330, rot: 2, size: 48, kind: 'you' },
  ],
  last: { at: T.last, text: '*Practical* gift. Six drafts of feelings.', color: '#ffd36a', size: 104, accentSize: 140 },
  cuts: [T.cut],
  punch: [{ at: T.pan[0], dur: 3.4, z: 0.14, x: 760, y: 1000 }],
  pitch: { [PN]: 440 },
  scene(x, t) {
    pisces(x, t, { x: 650, y: 560, s: 110, tears: t > T.last ? 3 : t > T.card[1] ? 2 : 1, mood: t > T.card[1] ? 'happy' : 'sparkle', look: [-0.6, 0.5], pop: pop01(t, -1) })
    bin(x, t, 830, 1150)
    let mood = 'sparkle', look = [0, 0]
    if (t > 3.0) mood = 'happy'
    if (t > T.pan[0]) { mood = 'neutral'; look = [1, 0] }
    if (t > T.card[1]) { mood = 'happy'; look = [0, 0] }
    if (t > T.last) mood = 'heart'
    drawStarChar(x, 380, 1000, 340, t, { color: CP.color, glyph: CP.glyph, mood, look, hops: HOPS, seed: 12, glow: 1.1, blush: t > T.card[0] ? 1 : 0 })
    if (t < T.card[0]) scraper(x, t, 600, 1050 - 6 * Math.sin(t * 3), 0.08 + 0.04 * Math.sin(t * 2))
    card(x, t)
    if (t > T.card[1]) sparkles(x, t, 640, 960, T.card[1], 12, 220, 1, [GOLD, BONE, HOT])
    if (t > T.last) for (let i = 0; i < 6; i++) { const ph = t - T.last - 0.3 - i * 0.12; if (ph > 0) drawBits(x, HEART, { H: i % 2 ? HOT : GOLD }, 480 + (i - 2.5) * 110 + Math.sin(ph * 4 + i) * 20, 860 - ph * 160, 9, { alpha: clamp(1 - ph / 2.2) }) }
  },
  cues: [
    ['pop', 0.2, 1174.66, 0.04, 0.3], ['clap', 3.0, { gain: 0.06 }],
    ['whoosh', r3(T.pan[0]), 0.7, 0.03], ['tick', r3(T.pan[1]), 0.04], ['pop', r3(T.card[0] + 0.1), 987.77, 0.04, 0], ['bell', r3(T.card[1]), 1567.98, 0.03, 1.2, 0], ['glitter', r3(T.card[1]), r3(T.card[1] + 0.6)],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
