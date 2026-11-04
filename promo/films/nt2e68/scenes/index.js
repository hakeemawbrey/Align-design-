// nt2e68: PLOT TWIST, "Plot Twist: Friday got cancelled" (20 s vertical, Star Talk Trends Vol. 2 ep 68,
// promo/films/next30/b14.md; music: cinematic · Em). Story 0–15.6, then the shared end card. Format: ../../nt2e66/scenes/twist.js.
//   0.0–2.1    hook (frame 0, cold blue): "They *cancelled* Friday."  Cancer frozen over a phone; FRIDAY circled on the wall.
//   2.1–4.85   BEAT 1 "“can’t do friday, sorry.” *That’s it.*"  The text lands; Cancer deflates into a puddle of star.
//   4.8        card cut.
//   4.85–7.6   BEAT 2 "the spiral: *every* reason, worst first."  Three thought clouds: "is it me?" "was it the soup?"
//              "they found a cooler sign??"
//   7.6        PLOT TWIST slam.
//   8.75–11.35 BEAT 3 (warm) "they moved it to a *cozier* night."  The next text: "you said you were tired. saturday:
//              blanket fort, your soup, no alarms." Leo holds the fort's flap open.
//   11.95      THE STARS: "Cancelled plans, *upgraded*."  Pisces, sobbing happily: "aww."
import { makeTwist, drawStage, chatPhone, thought, mug, sfx, R, box, bubble, label, shadow, sparkles, hearts, drawBits, HEART, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, RED, PINK, INTER, MONO, T } from '../../nt2e66/scenes/twist.js'

const FLOOR = 1180

function fridayNote(x, t, cx, cy, circ = 1) {
  box(x, cx - 130, cy - 70, 260, 140, BONE, { b: 6 })
  x.font = `800 44px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('FRIDAY', cx, cy + 4)
  x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.ellipse(cx, cy + 4, 110, 46, -0.05, 0, Math.PI * 2 * circ); x.stroke()
  for (let i = 0; i < 2; i++) drawBits(x, HEART, { H: RED }, cx + 100 + i * 26, cy - 60 - i * 16, 4)
}
function room(x, t, warm) { drawStage(x, t, { warm, wall: '#26304e', floor: '#33405e', window: false }); fridayNote(x, t, 800, 520) }

function fort(x, t, cx, floorY, open) {
  // a blanket fort: chair posts, a draped quilt, fairy lights, a flap that opens
  R(x, INK, cx - 280, floorY - 330, 20, 330); R(x, INK, cx + 260, floorY - 330, 20, 330)
  x.fillStyle = INK; x.beginPath(); x.moveTo(cx - 310, floorY); x.lineTo(cx - 290, floorY - 360); x.lineTo(cx + 290, floorY - 360); x.lineTo(cx + 310, floorY); x.closePath(); x.fill()
  x.fillStyle = '#f2c75c'; x.beginPath(); x.moveTo(cx - 300, floorY); x.lineTo(cx - 282, floorY - 350); x.lineTo(cx + 282, floorY - 350); x.lineTo(cx + 300, floorY); x.closePath(); x.fill()
  for (let i = 0; i < 6; i++) R(x, '#ff8fb1', cx - 260 + i * 92, floorY - 350, 40, 350)
  for (let i = 0; i < 9; i++) { const on = Math.sin(t * 4 + i) > -0.3; R(x, on ? '#fff1a8' : '#8a7a40', cx - 260 + i * 66, floorY - 360 + 14 * Math.sin(i * 1.3), 14, 14) }
  // the opening: warm inside
  const w = 220 * open
  R(x, '#ffcf8a', cx - w / 2, floorY - 260, w, 260)
  if (open > 0.4) { mug(x, cx - 40, floorY - 60, { col: '#9fd8f6', s: 0.7, steam: 1, t }); R(x, '#c9a6ff', cx + 10, floorY - 50, 80, 50) }
}

function beat1(x, t, S) {
  const { u, hero } = S
  room(x, t, 0)
  chatPhone(x, t, 700, 900, [{ text: 'can’t do friday,\nsorry', at: S.t0 + 0.25, size: 30 }], { s: 1.1, rot: 0.05, name: 'LEO' })
  const sag = ease.inOutCubic(prog(u, 0.9, 1.6))
  hero(x, t, { x: 270, y: 1000 + 40 * sag, s: 230, mood: u > 0.6 ? 'wide' : 'neutral', look: [1, -0.4], squash: 0.25 * sag, hops: [S.t0 + 0.4] })
  if (u > 1.6) for (let i = 0; i < 3; i++) { const ph = (t * 1.2 + i / 3) % 1; x.save(); x.globalAlpha = 1 - ph; label(x, '.', 210 + i * 50, 880 - ph * 60, { size: 60, font: INTER, weight: 800 }); x.restore() }
}

function beat2(x, t, S) {
  const { hero } = S
  room(x, t, 0)
  hero(x, t, { x: 540, y: 1060, s: 230, mood: 'wide', look: [0, -1], squash: 0.03 * Math.sin(t * 20), hops: [S.t0 + 0.3, S.t0 + 0.9, S.t0 + 1.5] })
  thought(x, t, 300, 840, 'is it me?', S.t0 + 0.3, S.t1, { size: 34 })
  thought(x, t, 760, 740, 'was it the soup?', S.t0 + 0.9, S.t1, { size: 34 })
  thought(x, t, 540, 620, 'they found a cooler sign??', S.t0 + 1.5, S.t1, { size: 34 })
}

function beat3(x, t, S) {
  const { u, hero, date } = S
  drawStage(x, t, { warm: 1, wall: '#4a3050', floor: '#5a3c4a', window: false })
  const open = ease.outCubic(prog(u, 1.2, 1.6))
  fort(x, t, 740, FLOOR, open)
  date(x, t, { x: 920, y: 960, s: 190, mood: 'happy', look: [-1, 0], hops: [S.t0 + 1.25, S.t0 + 2.0] })
  chatPhone(x, t, 245, 700, [
    { text: 'can’t do friday,\nsorry', size: 24 },
    { text: 'you said you were\ntired. saturday:\nblanket fort, your\nsoup, no alarms.', at: S.t0 + 1.2, size: 26 },
  ], { s: 1.22, rot: -0.03, name: 'LEO' })
  hero(x, t, { x: 560, y: 1070, s: 190, mood: u > 1.9 ? 'heart' : 'wide', look: [1, -0.4], hops: [S.t0 + 1.95, S.t0 + 2.3] })
  if (u > 1.95) hearts(x, t, S.t0 + 2.0, 560, 960, { n: 5 })
}

const EP = makeTwist({
  id: 'nt2e68', sign: 'cancer', name: 'Cancer', date: 'leo', deep: '#2f7fb0', accent: '#7fd0ff',
  hookText: 'They *cancelled* Friday.',
  room: (x, t, warm) => { if (warm) { drawStage(x, t, { warm: 1, wall: '#4a3050', floor: '#5a3c4a', window: false }); fort(x, t, 540, FLOOR, 1) } else room(x, t, 0) },
  hook(x, t, S) {
    room(x, t, 0)
    S.hero(x, t, { x: 330, y: 960, s: 270, mood: 'wide', look: [1, -0.5], squash: 0.02 * Math.sin(t * 18), hops: [0.3] })
    chatPhone(x, t, 720, 960, [{ text: 'can’t do friday,\nsorry', size: 30 }], { s: 0.9, rot: 0.05, name: 'LEO' })
  },
  hookCues: [['pop', 0.3, 523.25, 0.03, 0]],
  tells: [
    { caption: '“can’t do friday, sorry.” *That’s it.*', draw: beat1, pis: { x: 120, y: 1660, look: [1, -0.6] },
      cues: [['pop', 0.25, 659.25, 0.04, 0.3], ['whoosh', 0.9, 0.7, 0.02], ['pop', 1.6, 392, 0.03, -0.3]] },
    { caption: 'the spiral: *every* reason, worst first.', draw: beat2, pis: { x: 960, y: 1660 },
      cues: [['pop', 0.3, 659.25, 0.035, -0.3], ['pop', 0.9, 622.25, 0.035, 0.3], ['pop', 1.5, 587.33, 0.04, 0], ['riser', 1.5, 1.0, 0.015]] },
    { caption: 'they moved it to a *cozier* night.', draw: beat3, pis: { x: 960, y: 1660 },
      cues: [['pop', 1.2, 987.77, 0.04, -0.3], ['whoosh', 1.2, 0.4, 0.02], ['glitter', 1.3, 1.9], ['pluck', 1.95, 1567.98, 0.035, 0, 0.3]] },
  ],
  finale(x, t, S) {
    const { hero, date, ok, HERO_FIN_HOPS } = S
    shadow(x, 420, 1070, 220 * ok); shadow(x, 680, 1080, 200 * ok)
    hero(x, t, { x: 420, y: 880, s: 240, pop: ok, mood: 'heart', look: [1, 0], hops: HERO_FIN_HOPS })
    date(x, t, { x: 680, y: 890, s: 230, pop: ok, mood: 'happy', look: [-1, 0], hops: [T.stamp + 0.1, T.last + 1.7] })
  },
  last: 'Cancelled plans, *upgraded*.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [outK, lerp, clamp, sparkles, bubble, sfx, PINK, GOLD, MONO]
