// nt2e63: IN THIS HOUSE WE…, "In This House: Aquarius rules" (20 s vertical, Star Talk Trends Vol. 2 ep 63,
// promo/films/next30/b14.md; music: jazzy · A). Story 0–15.6, then the shared end card. Format: ../../nt2e61/scenes/house.js.
//   0.0–2.1    hook (frame 0): the sampler "In this house *we…*"; Aquarius on a ladder, screwing a robot arm to the wall.
//   2.1–4.85   RULE 1 "every chore gets a *gadget.*"  The arm whirs out and hands Sagittarius the remote. BEEP.
//   4.85–7.6   RULE 2 "Thursday is *weird hobby* night."  Capricorn shows a rock collection; Aquarius and Sag go wild.
//   7.6        card cut.
//   7.6–10.95  RULE 3 (the twist) "we say “I love you” out *loud.*"  Aquarius hands over a note in binary; Sag: "…?";
//              Aquarius drops the note and just says it: "I love you." Sag melts.
//   11.35      the stamp "HOUSE *RULES.*"  Pisces holds up a 10/10, fountaining.
//   11.95      THE STARS: "Weird house, *warm* hearts."
import { makeHouse, couch, table, rug, sfx, R, box, bubble, label, shadow, sparkles, hearts, drawBits, HEART, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, INTER, MONO, T } from '../../nt2e61/scenes/house.js'

const FLOOR = 1180

// a chunky robot arm bolted to the wall at (mx, my), its claw at (cx, cy)
function robotArm(x, t, mx, my, cx, cy, { grip = null, open = 0 } = {}) {
  const ex = (mx + cx) / 2 - 40, ey = Math.min(my, cy) - 90
  const seg = (ax, ay, bx, by, w) => { const a = Math.atan2(by - ay, bx - ax), L = Math.hypot(bx - ax, by - ay); x.save(); x.translate(ax, ay); x.rotate(a); box(x, 0, -w / 2, L, w, '#b8c4d8', { b: 6, hi: '#e2e8f2' }); x.restore() }
  box(x, mx - 40, my - 60, 50, 120, '#7a86a0', { b: 6 })
  seg(mx, my, ex, ey, 40); seg(ex, ey, cx, cy, 32)
  for (const [px, py] of [[mx, my], [ex, ey]]) { box(x, px - 22, py - 22, 44, 44, '#5a6680', { b: 5 }); R(x, '#ff5c8a', px - 6, py - 6, 12, 12) }
  // claw
  x.save(); x.translate(cx, cy)
  box(x, -26, -20, 52, 40, '#7a86a0', { b: 5 })
  R(x, INK, -34 - open * 10, 14, 14, 40); R(x, INK, 20 + open * 10, 14, 14, 40)
  if (grip) grip(x)
  x.restore()
  // a blinking light
  if (Math.sin(t * 8) > 0) R(x, '#9fe6b0', mx - 30, my - 50, 10, 10)
}
const remote = x => { box(x, -18, 34, 36, 90, '#2a2148', { b: 4 }); R(x, RED, -8, 46, 16, 14); for (let i = 0; i < 4; i++) R(x, BONE, -10 + (i % 2) * 12, 70 + Math.floor(i / 2) * 16, 8, 8) }

function rock(x, cx, cy, s, col, tag) {
  x.save(); x.translate(cx, cy)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, s + 6, s * 0.7 + 6, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = col; x.beginPath(); x.ellipse(0, 0, s, s * 0.7, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.25)'; x.fillRect(-s * 0.5, -s * 0.4, s * 0.4, s * 0.15)
  if (tag) { x.font = `700 18px ${MONO}`; const w = x.measureText(tag).width + 14; R(x, INK, -w / 2 - 3, s * 0.7 + 6, w + 6, 30); R(x, BONE, -w / 2, s * 0.7 + 9, w, 24); x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(tag, 0, s * 0.7 + 22) }
  x.restore()
}

function ladder(x, cx, top) {
  for (const d of [-60, 60]) { R(x, INK, cx + d - 8, top, 16, FLOOR - top); R(x, '#b07a4e', cx + d - 4, top, 8, FLOOR - top) }
  for (let y = top + 40; y < FLOOR; y += 90) { R(x, INK, cx - 60, y - 6, 120, 14); R(x, '#b07a4e', cx - 56, y - 3, 112, 8) }
}

function rule1(x, t, S) {
  const { u, hero, date } = S
  rug(x, 620, FLOOR + 70, 640, '#7fd0ff')
  couch(x, 660, 1110, { col: '#c85a6e', w: 460 })
  const reach = ease.inOutCubic(prog(u, 0.3, 1.1)), back = ease.inOutCubic(prog(u, 1.5, 2.1))
  const cx = lerp(180, 620, reach), cy = lerp(700, 830, reach)
  date(x, t, { x: 690, y: 960, s: 210, mood: u > 1.2 ? 'sparkle' : 'wide', look: [-1, -0.5], hops: [S.t0 + 1.15] })
  robotArm(x, t, 60, 620, cx, cy, { grip: u < 1.2 ? remote : null, open: u > 1.1 ? 1 : 0 })
  if (u > 1.2) { x.save(); x.translate(620, 830); remote(x); x.restore() }
  hero(x, t, { x: 260, y: 1010, s: 190, mood: 'happy', look: [1, -0.3], hops: [S.t0 + 0.3, S.t0 + 1.2, S.t0 + 1.6] })
  sfx(x, t, 'BEEP.', 420, 660, S.t0 + 0.4, { size: 44, col: '#9fe6b0', life: 0.7 })
  sfx(x, t, 'BOOP.', 560, 620, S.t0 + 1.15, { size: 44, col: '#9fe6b0', life: 0.7, rot: 0.1 })
  bubble(x, t, 690, 580, S.t0 + 1.6, S.t1, 'living the dream.', { size: 34, tail: 0.1 })
  void back
}

function rule2(x, t, S) {
  const { u, hero, date, star } = S
  rug(x, 540, FLOOR + 70, 760, '#f2c75c')
  table(x, 540, FLOOR, { w: 460, h: 190 })
  const rocks = [[400, '#9a8f86', 'GARY'], [540, '#c9a6ff', 'SHINY'], [680, '#7a9a86', 'GARY II']]
  rocks.forEach(([rx, c, tg], i) => { const k = pop01(t, S.t0 + 0.3 + i * 0.25, 0.25, 2.4); if (k > 0.01) { x.save(); x.translate(rx, 940); x.scale(k, k); rock(x, 0, 0, 54, c, tg); x.restore() } })
  star('capricorn', x, t, { x: 540, y: 740, s: 190, mood: 'sparkle', look: [0, 0.4], hops: [S.t0 + 0.3, S.t0 + 0.55, S.t0 + 0.8] })
  hero(x, t, { x: 190, y: 1000, s: 190, mood: u > 1.1 ? 'heart' : 'wide', look: [1, -0.5], hops: [S.t0 + 1.2, S.t0 + 1.5, S.t0 + 1.8, S.t0 + 2.1] })
  date(x, t, { x: 890, y: 1000, s: 190, mood: u > 1.1 ? 'sparkle' : 'wide', look: [-1, -0.5], hops: [S.t0 + 1.3, S.t0 + 1.6, S.t0 + 1.9, S.t0 + 2.2] })
  bubble(x, t, 540, 560, S.t0 + 0.7, S.t1, 'this one is also Gary.', { size: 32, tail: 0 })
  sfx(x, t, 'CLAP!', 180, 780, S.t0 + 1.2, { size: 44, rot: -0.15 }); sfx(x, t, 'CLAP!', 900, 780, S.t0 + 1.5, { size: 44, rot: 0.15 }); sfx(x, t, 'CLAP!', 220, 720, S.t0 + 1.8, { size: 44, rot: 0.1 })
}

function rule3(x, t, S) {
  const { u, hero, date } = S
  rug(x, 540, FLOOR + 70, 700, '#c9a6ff')
  shadow(x, 330, FLOOR + 30, 200); shadow(x, 760, FLOOR + 30, 200)
  const drop = prog(u, 1.15, 1.6)
  hero(x, t, { x: 330, y: 990, s: 230, mood: u < 1.15 ? 'happy' : u < 1.7 ? 'neutral' : 'sparkle', look: [1, -0.2], hops: [S.t0 + 0.2, S.t0 + 1.7, S.t0 + 2.0] })
  // the note in binary: held out, then dropped
  x.save(); x.translate(lerp(520, 470, drop), lerp(880, 1150, ease.inQuad(drop))); x.rotate(-0.08 + drop * 1.2)
  box(x, -110, -70, 220, 140, BONE, { b: 5 })
  x.font = `700 24px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('01001001', 0, -30); x.fillText('01001100', 0, 0); x.fillText('01011001', 0, 30)
  x.restore()
  date(x, t, { x: 760, y: 990, s: 230, mood: u < 1.7 ? 'wide' : 'heart', look: [-1, u < 1.1 ? 0.6 : -0.2], hops: [S.t0 + 0.9, S.t0 + 1.9] })
  if (u > 0.6 && u < 1.6) label(x, '…?', 800, 760, { size: 70, font: INTER, weight: 800, col: BONE })
  bubble(x, t, 380, 640, S.t0 + 1.7, S.t1, 'I love you.', { size: 46, col: '#ffe1ea', tail: -0.3 })
  if (u > 1.9) hearts(x, t, S.t0 + 1.95, 760, 860, { n: 6 })
}

const EP = makeHouse({
  id: 'nt2e63', sign: 'aquarius', name: 'Aquarius', date: 'sagittarius', deep: '#2f7fb0', accent: '#d94a63',
  wall: ['#2a4a52', '#30555e'],
  hook(x, t, S) {
    ladder(x, 380, 640)
    const k = clamp(prog(t, 0, 1.8))
    robotArm(x, t, 60, 620, 210 + 20 * Math.sin(t * 3), 760 + 10 * Math.sin(t * 2.3), { open: Math.sin(t * 5) > 0 ? 1 : 0 })
    S.hero(x, t, { x: 300, y: 650, s: 250, mood: 'squint', look: [-1, 0], hops: S.HOPS })
    // a screwdriver twisting at the bolt
    x.save(); x.translate(130, 640); x.rotate(-0.3 + 0.25 * Math.sin(t * 12)); R(x, INK, -6, -6, 90, 16); R(x, '#ff9a5c', 30, -10, 60, 24); R(x, '#dfe6f0', -4, -2, 40, 8); x.restore()
    sparkles(x, t, 90, 620, 0.5, 6, 60, 1, [GOLD, BONE]); sparkles(x, t, 90, 620, 1.4, 6, 60, 2, [GOLD, BONE])
    S.date(x, t, { x: 780, y: 1000, s: 210, mood: 'wide', look: [-1, -0.6], hops: [1.4] })
    void k
  },
  hookCues: [['tick', 0.5, 0.05], ['tick', 0.75, 0.05], ['tick', 1.4, 0.05]],
  tells: [
    { caption: 'every chore gets a *gadget.*', draw: rule1, pis: { x: 960, y: 1660 },
      cues: [['riser', 0.3, 0.8, 0.012], ['pop', 0.4, 1567.98, 0.035, -0.3], ['pop', 1.15, 1318.51, 0.035, 0.1], ['tick', 1.2, 0.06]] },
    { caption: 'Thursday is *weird hobby* night.', draw: rule2, pis: { x: 960, y: 1660, look: [-1, -0.8] },
      cues: [['pop', 0.3, 880, 0.035, -0.2], ['pop', 0.55, 987.77, 0.035, 0], ['pop', 0.8, 1174.66, 0.035, 0.2], ['clap', 1.2, { gain: 0.13, pan: -0.4 }], ['clap', 1.5, { gain: 0.13, pan: 0.4 }], ['clap', 1.8, { gain: 0.14 }]] },
    { caption: 'we say “I love you” out *loud.*', draw: rule3, pis: { x: 960, y: 1660 },
      cues: [['pop', 0.9, 659.25, 0.03, 0.4], ['whoosh', 1.15, 0.4, 0.02], ['tick', 1.55, 0.05], ['pluck', 1.72, 1174.66, 0.035, 0.4, 0.3], ['pluck', 1.86, 1567.98, 0.03, 0.4, 0.3], ['glitter', 1.95, 2.4]] },
  ],
  finale(x, t, S) {
    const { hero, date, ok, HERO_FIN_HOPS } = S
    robotArm(x, t, 60, 620, 250, 640 + 10 * Math.sin(t * 3), { grip: g => drawBits(g, HEART, { H: '#ff5c8a' }, 0, 70, 9) })
    shadow(x, 440, 1070, 220 * ok); shadow(x, 700, 1080, 200 * ok)
    hero(x, t, { x: 440, y: 880, s: 250, pop: ok, mood: t > T.stamp + 0.15 ? 'happy' : 'wide', look: [1, 0], hops: HERO_FIN_HOPS })
    date(x, t, { x: 700, y: 900, s: 220, pop: ok, mood: 'heart', look: [-1, 0], hops: [T.stamp + 0.1, T.last + 1.7] })
  },
  last: 'Weird house, *warm* hearts.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [outK, PINK, GOLD]
