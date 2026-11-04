// nhse10: HOLIDAY SURVIVAL GUIDE No. 10, "Plans Cancelled." (30 s vertical, Next 30 · b29, music: jazzy · F)
// The series look lives in ../../nhse01/survkit.js.
//   0.0–6.6    "Plans *cancelled.* | Now what?"  ♏ Scorpio, in a party hat and bow tie, stares at a phone: "so sorry,
//              can't make it tonight". Pisces sniffles.
//   6.6–13.9   "Totally *fine.* | Totally."  Scorpio sits down in the outfit, the party horn droops (pffft), then on
//              go the sunglasses, indoors. ♏: "I'm fine. this is my fine face."
//   13.9       card cut.
//   13.9–21.6  "Then a | *tiny* new plan."  THE STARS: "you're allowed to be *disappointed*." / "then make a *tiny*
//              new plan." Pajamas, cocoa, a jigsaw puzzle on the rug, and a text: "rain check? I'd love that".
//   21.6–25.6  "Packed: | *one puzzle piece.*"  THE STARS: "Plan B, but make it cozy."
import { makeSurv, R, box, ink, room, phone, mug, wear, drawBits, sparkles, hearts, label, shadow, bubble, starFrame, inSprite,
  pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, MINT, RED, INTER } from '../../nhse01/survkit.js'

const SCO = '#c45a7a'
function partyHat(x, F, droop = 0) {
  x.save(); x.translate(F.ox + F.S * 0.04, F.cy - F.S * 0.44); x.rotate(0.15 + droop * 0.6)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-36, 10); x.lineTo(36, 10); x.lineTo(0, -90); x.closePath(); x.fill()
  x.fillStyle = '#7fd0ff'; x.beginPath(); x.moveTo(-28, 4); x.lineTo(28, 4); x.lineTo(0, -78); x.closePath(); x.fill()
  R(x, GOLD, -18, -30, 36, 8); R(x, PINK, -24, -6, 48, 8)
  drawBits(x, ['.G.', 'GGG', '.G.'], { G: GOLD }, 0, -96, 7)
  x.restore()
}
function bowTie(x, F) { drawBits(x, ['RR...RR', 'RRRBRRR', 'RR...RR'], { R: RED, B: GOLD }, F.ox, F.cy + F.S * 0.24, F.cell * 1.6) }
function horn(x, F, droop) {
  x.save(); x.translate(F.ox + F.S * 0.12, F.cy + F.S * 0.08); x.rotate(droop * 1.2)
  R(x, INK, 0, -10, 150 - droop * 40, 20); R(x, '#ff8fb1', 4, -6, 142 - droop * 40, 12); R(x, GOLD, 4, -6, 24, 12)
  x.restore()
}
function puzzle(x, cx, cy, n) {
  box(x, cx - 220, cy - 70, 440, 140, '#2a2148', { b: 6 })
  const C = ['#9fe6b0', '#7fd0ff', '#ff8fb1', GOLD, '#c9a6ff', '#ffb070', '#9fe6b0', '#7fd0ff']
  for (let i = 0; i < Math.min(8, n); i++) { const X = cx - 200 + (i % 4) * 100, Y = cy - 58 + Math.floor(i / 4) * 60; R(x, C[i], X, Y, 94, 54); R(x, C[i], X + 94, Y + 18, 10, 16) }
}

function act0(x, t, S) {
  const { u, hero } = S
  room(x, t, { win: { x: 120, y: 470, w: 240, h: 280 } })
  const hops = [0.3, 2.4]
  const F = starFrame(560, 1040, 300, t, { hops })
  shadow(x, 560, 1250, 280)
  hero(x, t, { x: 560, y: 1040, s: 300, mood: u < 2.4 ? 'wide' : 'neutral', look: [0.6, 0.6], hops })
  partyHat(x, F, 0); bowTie(x, F)
  phone(x, t, { cx: 830, cy: 840, w: 380, h: 440, title: 'BESTIE', rot: 0.08, size: 30, msgs: [{ at: -1, side: 'L', text: 'so sorry, can’t make it tonight' }] })
  if (u > 2.4) label(x, '…oh.', 380, 820, { size: 34, col: BONE, alpha: clamp(prog(u, 2.4, 2.7)) })
}

function act1(x, t, S) {
  const { u, hero } = S
  room(x, t, { win: { x: 120, y: 470, w: 240, h: 280 } })
  // the armchair
  box(x, 340, 1040, 400, 200, '#6a3a5a', { b: 7, hi: '#8a4a6a' }); box(x, 300, 980, 60, 260, '#6a3a5a', { b: 7 }); box(x, 720, 980, 60, 260, '#6a3a5a', { b: 7 })
  const droop = ease.inOutCubic(prog(u, 0.6, 1.6))
  const F = starFrame(540, 1000, 250, t, { bob: 0, squash: 0.08 })
  hero(x, t, { x: 540, y: 1000, s: 250, mood: u < 2.8 ? 'neutral' : 'neutral', look: [0, 0.3], bob: 0, squash: 0.08 })
  partyHat(x, F, droop); bowTie(x, F); horn(x, F, droop)
  if (u > 0.6 && u < 2.2) label(x, 'pffft…', 780, 960, { size: 32, col: BONE, alpha: Math.sin(Math.PI * prog(u, 0.6, 2.2)) })
  // on go the shades
  const sh = prog(u, 2.8, 3.2)
  if (sh > 0) inSprite(x, F, () => { x.save(); x.translate(0, -(1 - ease.outBack(sh)) * 20); wear(x, 'shades'); x.restore() })
  // one tiny tear sneaks out from under the shades
  if (u > 5.4) { const p = ((t * 0.8) % 1); R(x, '#8fe3ff', F.ox - F.S * 0.14, F.cy + p * 70, 10, 14) }
}

function act2(x, t, S) {
  const { u, hero } = S
  room(x, t, { win: { x: 120, y: 470, w: 240, h: 280 } })
  // the rug + puzzle
  x.fillStyle = INK; x.beginPath(); x.ellipse(560, 1200, 420, 70, 0, 0, 7); x.fill(); x.fillStyle = '#5a3a6a'; x.beginPath(); x.ellipse(560, 1200, 410, 62, 0, 0, 7); x.fill()
  const n = Math.floor(prog(u, 1.4, 5.0) * 8)
  if (u > 1.0) puzzle(x, 560, 1190, n)
  const F = starFrame(330, 1050, 220, t, { hops: [S.t0 + 0.8, S.t0 + 5.1] })
  hero(x, t, { x: 330, y: 1050, s: 220, mood: u > 1.0 ? 'happy' : 'neutral', look: [1, 0.6], hops: [S.t0 + 0.8, S.t0 + 5.1] })
  if (u > 0.8) inSprite(x, F, () => { for (let j = 0; j < 4; j++) { x.fillStyle = 'rgba(159,230,176,0.55)'; x.fillRect(8, 22 + j * 3, 20, 1.2) } })      // pajama stripes
  if (u > 0.8) mug(x, t, 180, 1130, 0.9)
  phone(x, t, { cx: 820, cy: 720, w: 320, h: 420, title: 'BESTIE', size: 22, alpha: clamp(prog(u, 3.6, 3.8)), msgs: [{ at: S.t0 + 3.9, side: 'R', col: '#3fa88a', text: 'rain check? I’d love that' }, { at: S.t0 + 4.8, side: 'L', text: 'YES. next week ♥' }] })
  if (u > 4.8) hearts(x, t, S.t0 + 4.9, 820, 560, { n: 5 })
  if (u > 5.0) sparkles(x, t, 560, 1190, S.t0 + 5.02, 10, 200, 1, [GOLD, MINT, BONE])
}

function item(x, t, cx, cy, s) {
  x.save(); x.translate(cx, cy); x.scale(s, s); x.rotate(-0.12)
  drawBits(x, ['....PP....', '...PPPP...', '.PPPPPPPP.', '.PPPPPPPPPP', '.PPPPPPPPPP', '.PPPPPPPP.', '.PPPPPPPP.', '..........'].map(r => r.padEnd(11, '.')), { P: '#c9a6ff' }, 0, 0, 22)
  R(x, 'rgba(255,255,255,0.35)', -60, -40, 30, 14)
  x.restore()
}

const EP = makeSurv({
  id: 'nhse10', ep: 10, hero: 'scorpio', accent: '#ff8fa0',
  heads: ['Plans *cancelled.* | Now what?', 'Totally *fine.* | Totally.', 'Then a | *tiny* new plan.', 'Packed: | *one puzzle piece.*'],
  acts: [act0, act1, act2],
  line1: { t: 10.0, speaker: '♏︎ SCORPIO', color: '#ff8fa0', text: 'I’m fine. this is my *fine face*.', close: 13.6 },
  tips: ['you’re allowed to be *disappointed*.', 'then make a *tiny* new plan.'],
  last: 'Plan B, but make it *cozy.*',
  item: { label: 'ONE PUZZLE PIECE', draw: item },
  pis: [{ x: 960, y: 1250, s: 110 }, { x: 960, y: 1250, s: 110, tears: 3 }, { x: 950, y: 1080, s: 100, noTissues: true, mood: 'happy', tears: 2 }],
  cues: [
    [['pop', 0.3, 880, 0.035, 0.3], ['pluck', 2.4, 174.61, 0.04, 0.8, 0]],
    [['whoosh', 0.6, 1.2, 0.03], ['pluck', 0.8, 349.23, 0.03, 0.6, 0.2], ['pluck', 1.2, 293.66, 0.03, 0.6, 0.2], ['pop', 2.95, 1318.51, 0.04, 0], ['tick', 3.1, 0.05]],
    [['pop', 0.85, 987.77, 0.035, -0.3], ...Array.from({ length: 8 }, (_, i) => ['tick', +(1.4 + i * 0.45).toFixed(2), 0.035]), ['pop', 3.9, 1174.66, 0.04, 0.3], ['pop', 4.8, 1318.51, 0.045, 0.3], ['pluck', 4.9, 1567.98, 0.035, 0.5, 0.3], ['glitter', 5.02, 5.4]],
    [],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [SCO, bubble, ink, lerp, outK, pop01, INTER]
