// nste21: SINGLE AND THRIVING, Ep 21 "The Midnight Hug" (23 s vertical, Next 30 b33, music: synthwave · Bm).
// Format kit: ../../nste01/singlekit.js (story 0–20.6, then the short end card). Rows: promo/films/next30/b33.md.
//   0.0–6.8    hook "Countdown's coming. | *No* midnight hug?" Sagittarius at the window in a party hat, the wall clock
//              creeping towards twelve: "the countdown's soon…" → "who do I hug at twelve?"  Pisces sniffles.
//   6.8        beat cut → THE STARS: "midnight hugs come in *friend* sizes." / "make the plan with the people you *love.*"
//   13.6       the friends in party hats (Aries, Leo, Gemini) count down with Sag: 3… 2… 1… GROUP HUG, confetti.
//              Meter fills.
//   17.4       "Sagittarius: *thriving.*" Last line: "Hug the people who *showed up.*"
import { makeSingle, room, box, R, ink, note, shadow, sparkles, confetti, starFrame, inSprite, partyHatCells, drawStarChar, signStar, pop01, prog, lerp, ease, T, INK, BONE, GOLD, PINK, SKYB, MINT } from '../../nste01/singlekit.js'

function hatted(x, t, sign, o, hat = [PINK, GOLD]) {
  const s = signStar(sign)
  drawStarChar(x, o.x, o.y, o.s, t, { color: s.color, glyph: o.s >= 150 && o.glyph !== false ? s.glyph : null, seed: o.seed ?? 5, glow: 1, ...o })
  const F = starFrame(o.x, o.y, o.s, t, o)
  inSprite(x, F, () => partyHatCells(x, hat[0], hat[1]))
}
function clock(x, cx, cy, mins) {
  x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, 86, 0, Math.PI * 2); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(cx, cy, 76, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; R(x, INK, cx + Math.sin(a) * 62 - 4, cy - Math.cos(a) * 62 - 4, 8, 8) }
  const am = mins / 60 * Math.PI * 2, ah = (11 + mins / 60) / 12 * Math.PI * 2
  x.strokeStyle = INK; x.lineWidth = 10; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.sin(ah) * 40, cy - Math.cos(ah) * 40); x.stroke()
  x.lineWidth = 6; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.sin(am) * 60, cy - Math.cos(am) * 60); x.stroke()
}
const HOME = (x, t) => room(x, t, { wall: '#1f1a40', wall2: '#1b163a', floor: '#28214a', win: { x: 560, y: 480, w: 380, h: 380 } })

function s1(x, t, S) {
  const { u } = S
  HOME(x, t)
  clock(x, 260, 600, 52 + u * 0.4)
  hatted(x, t, 'sagittarius', { x: 700, y: 1170, s: 280, mood: u > 3.8 ? 'neutral' : 'sparkle', look: u > 3.8 ? [-0.6, 0.6] : [0.4, -1], hops: [0.6, 3.85], seed: 3, glow: 1.1 })
}
function s2(x, t, S) {
  const { hero } = S
  HOME(x, t); clock(x, 260, 600, 55)
  x.fillStyle = 'rgba(5,4,12,0.5)'; x.fillRect(0, 420, 1080, 1500)
  hero(x, t, { x: 250, y: 1170, s: 200, mood: t > T.B + 1.6 ? 'happy' : 'neutral', look: [1, -1], hops: [T.A + 0.4, T.B + 1.8] })
  note(x, 790, 1170, 'hugs come in|friend sizes', { w: 380, h: 150, col: '#ffe27a', rot: 0.05, size: 38, k: pop01(t, T.A + 1.5, 0.3, 2.4) })
  sparkles(x, t, 790, 1170, T.B + 1.3, 8, 180, 1)
}
const CREW = [['aries', 170, [SKYB, GOLD]], ['sagittarius', 400, [PINK, GOLD]], ['leo', 650, [MINT, PINK]], ['gemini', 900, [GOLD, SKYB]]]
function s3(x, t, S) {
  const { u } = S
  HOME(x, t)
  clock(x, 260, 600, 59 + Math.min(1, u / 2.2))
  const hug = ease.inOutCubic(prog(u, 2.25, 2.6))
  CREW.forEach(([sg, cx, hat], i) => {
    const hx = lerp(cx, 540 + (i - 1.5) * 120, hug)
    hatted(x, t, sg, { x: hx, y: 1180, s: sg === 'sagittarius' ? 250 : 210, mood: u > 2.25 ? 'happy' : 'sparkle', look: [0, 0], seed: 90 + i, glyph: sg === 'sagittarius' ? undefined : false, hops: [0.6, 1.1, 1.6, 2.3].map(v => S.t0 + v + i * 0.03), squash: hug * 0.08 }, hat)
  })
  ;['3', '2', '1'].forEach((n, i) => { const a = S.t0 + 0.6 + i * 0.5; if (t > a && t < a + 0.48) ink(x, n, 540, 820, { size: 160 * (1 + 0.2 * (1 - (t - a) / 0.48)), col: GOLD }) })
  confetti(x, t, S.t0 + 2.25, 540, 900, { n: 40 })
  sparkles(x, t, 540, 1100, S.t0 + 2.3, 14, 300, 1)
}
function fin(x, t, S) {
  const { ok, u } = S
  shadow(x, 540, 1150, 260 * ok)
  hatted(x, t, 'sagittarius', { x: 540, y: 960, s: 300, pop: ok, mood: u > 1.6 ? 'happy' : 'sparkle', look: [0, 0], hops: [S.t0 + 0.1, S.t0 + 0.6, T.last + 1.5], seed: 3, glow: 1.1 })
}

const EP = makeSingle({
  id: 'nste21', sign: 'sagittarius', name: 'Sagittarius',
  hook: 'Countdown’s coming. | *No* midnight hug?',
  h1: 'Hugs come in *sizes.*', h2: 'Three. Two. *One.*',
  lines: ['midnight hugs come in *friend* sizes.', 'make the plan with the people you *love.*'],
  last: 'Hug the people who *showed up.*',
  bubbles: [
    { t0: 1.0, t1: 3.6, x: 660, y: 950, text: 'the countdown’s soon…', size: 40, tail: 0.1 },
    { t0: 3.85, t1: 6.6, x: 660, y: 950, text: 'who do I hug at twelve?', size: 40, tail: 0.1 },
    { t0: 15.95, t1: 17.3, x: 540, y: 980, text: 'GROUP HUG!!', size: 46, tail: 0, col: '#ffe2c4' },
  ],
  pis1: { x: 960, y: 1610, s: 120 }, pis3: { x: 960, y: 1630, s: 110 },
  meter: { x: 450, y: 1620 },
  s1, s2, s3, fin,
  cues: [['tick', 14.2, 0.06], ['tick', 14.7, 0.06], ['tick', 15.2, 0.06], ['pop', 14.2, 880, 0.04, 0], ['pop', 14.7, 987.77, 0.04, 0], ['pop', 15.2, 1174.66, 0.045, 0], ['bell', 15.85, 1760, 0.035, 1.2, 0], ['glitter', 15.85, 16.6]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
