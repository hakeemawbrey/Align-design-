// nhse05: HOLIDAY SURVIVAL GUIDE No. 5, "Out of Office." (28 s vertical, Next 30 · b29, music: house · A)
// The series look lives in ../../nhse01/survkit.js.
//   0.0–6.6    "*Out of office.* | Still in the office."  ♑ Capricorn types on a laptop at the holiday table while
//              the family eats around it; its paper crown slowly slips. Pisces sniffles at the end of the table.
//   6.6–13.9   "Ping. | *Ping.* Ping."  Notification badges pop, Capricorn ducks to type under the table, and the
//              potatoes get passed the long way round the laptop. ♑: "just one quick reply. or nine."
//   13.9       hard cut into the tip.
//   13.9–21.6  "Set it. | *Believe* it."  THE STARS: "set the auto-reply. then *believe* it." / "work will be there.
//              *so will they.*" AUTO-REPLY: ON, the lid clicks shut, the crown goes on straight, the pie arrives.
//   21.6–25.6  "Packed: | *an auto-reply.*"  THE STARS: "The inbox can wait. The pie can't."
import { makeSurv, R, box, ink, room, table, drawBits, sparkles, hearts, label, shadow, bubble, starFrame,
  pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, MINT, RED, INTER } from '../../nhse01/survkit.js'

const CAP = '#9fe6b0'
const FAM = [['taurus', 130], ['libra', 280], ['aries', 860], ['virgo', 990]]
function laptop(x, t, cx, by, { open = 1, screen = 'inbox', badges = 0, k = 1 } = {}) {
  x.save(); x.translate(cx, by); x.scale(k, k)
  box(x, -130, -16, 260, 20, '#8c86a8', { b: 5 })
  if (open > 0.02) {
    x.save(); x.scale(1, open)
    box(x, -116, -190, 232, 168, '#2a2148', { b: 6 })
    R(x, screen === 'auto' ? '#1f4a3a' : '#14102a', -104, -178, 208, 144)
    if (screen === 'inbox') { for (let i = 0; i < 5; i++) { R(x, i < 2 ? GOLD : '#4a3f7a', -92, -166 + i * 26, 18, 16); R(x, '#4a3f7a', -66, -164 + i * 26, 140 - (i * 23) % 50, 12) } }
    else { ink(x, 'AUTO-REPLY: ON', 0, -130, { size: 20, col: MINT }); ink(x, 'back on the 2nd', 0, -96, { size: 18, col: BONE }); ink(x, 'happy holidays!', 0, -68, { size: 18, col: BONE }) }
    x.restore()
  }
  for (let i = 0; i < badges; i++) { const bx = 120 - i * 34, byy = -200 - (i % 2) * 30; R(x, INK, bx - 18, byy - 18, 36, 36); R(x, RED, bx - 14, byy - 14, 28, 28); ink(x, '!', bx, byy, { size: 22, col: BONE, font: INTER, weight: 800 }) }
  x.restore()
}
function paperCrown(x, t, F, tilt, col = GOLD) {
  x.save(); x.translate(F.ox, F.cy - F.S * 0.42); x.rotate(tilt)
  drawBits(x, ['C...C...C', 'CC.CCC.CC', 'CCCCCCCCC', 'CCCCCCCCC'], { C: col }, 0, 0, F.cell * 1.3)
  x.restore()
}
function food(x, cx, cy, kind) {
  if (kind === 'pot') { box(x, cx - 60, cy - 20, 120, 40, BONE, { b: 5 }); for (let i = 0; i < 5; i++) R(x, '#e8c87a', cx - 46 + i * 20, cy - 34 - (i % 2) * 8, 18, 18) }
  if (kind === 'pie') { box(x, cx - 80, cy - 24, 160, 44, '#d49a4a', { b: 6, hi: '#f0c070' }); for (let i = 0; i < 4; i++) R(x, '#a8662a', cx - 60 + i * 36, cy - 14, 20, 8) }
}
function family(x, t, star, y, k = 1, mood = 'happy') {
  FAM.forEach(([c, fx], i) => star(c, x, t, { x: fx, y, s: 130, pop: k, mood, seed: i + 2, look: [fx < 540 ? 1 : -1, 0] }))
}

function act0(x, t, S) {
  const { u, hero, star } = S
  room(x, t, { win: { x: 390, y: 470, w: 300, h: 300 } })
  family(x, t, star, 1010)
  table(x, 540, 1080, 960)
  food(x, 220, 1066, 'pot'); food(x, 860, 1066, 'pot')
  const F = starFrame(450, 960, 200, t, { hops: [0.3, 0.9, 1.5, 2.1, 2.7, 3.3, 3.9, 4.5, 5.1] })
  hero(x, t, { x: 450, y: 960, s: 200, mood: 'neutral', look: [1, 0.6], hops: [0.3, 0.9, 1.5, 2.1, 2.7, 3.3, 3.9, 4.5, 5.1], squash: 0.03 * Math.sin(t * 22) })
  paperCrown(x, t, F, lerp(0.25, 0.9, ease.inQuad(prog(u, 0, 5.5))) + 0.03 * Math.sin(t * 6))
  laptop(x, t, 690, 1080, { badges: u > 4 ? 2 : 1 })
  // clack clack
  if (Math.floor(t * 8) % 2) label(x, 'clack', 400 + ((Math.floor(t * 8) * 47) % 240), 860, { size: 22, col: BONE, alpha: 0.7 })
}

function act1(x, t, S) {
  const { u, hero, star } = S
  room(x, t, { win: { x: 390, y: 470, w: 300, h: 300 } })
  family(x, t, star, 1010, 1, u > 3 ? 'neutral' : 'happy')
  table(x, 540, 1080, 960)
  const badges = Math.min(5, Math.floor(u * 1.2))
  laptop(x, t, 690, 1080, { badges })
  // Capricorn ducks under the table and types there
  const duck = ease.inOutCubic(prog(u, 1.2, 1.8))
  if (duck < 0.5) hero(x, t, { x: 450, y: lerp(960, 1100, duck * 2), s: 200, mood: 'wide', look: [1, 0.6] })
  else {
    R(x, 'rgba(6,4,18,0.4)', 300, 1180, 480, 100)
    hero(x, t, { x: 540, y: 1215, s: 150, mood: 'neutral', look: [0, 1], bob: 0, squash: 0.03 * Math.sin(t * 22) })
    R(x, '#c8d4ee', 500, 1240, 80, 30); glow2(x, 540, 1230)
  }
  // the potatoes travel the long way around the laptop
  const p = prog(u, 2.6, 5.6)
  if (p > 0) { const a = Math.PI * (1 + p); food(x, 540 + Math.cos(a) * 330, 1000 + Math.sin(a) * 200, 'pot') }
  if (u > 1.2) for (let i = 0; i < badges; i++) sparkles(x, t, 810 - i * 34, 870, S.t0 + (i + 1) / 1.2, 5, 40, i, [RED, BONE])
}
function glow2(x, cx, cy) { const g = x.createRadialGradient(cx, cy, 0, cx, cy, 120); g.addColorStop(0, 'rgba(160,200,255,0.35)'); g.addColorStop(1, 'rgba(160,200,255,0)'); x.fillStyle = g; x.fillRect(cx - 120, cy - 120, 240, 240) }

function act2(x, t, S) {
  const { u, hero, star } = S
  room(x, t, { win: { x: 390, y: 470, w: 300, h: 300 } })
  const cheer = u > 4.2
  family(x, t, star, 1010, 1, cheer ? 'happy' : 'neutral')
  table(x, 540, 1080, 960)
  const shut = ease.inCubic(prog(u, 3.6, 4.0))
  const F = starFrame(450, 960, 200, t, { hops: [S.t0 + 4.1, S.t0 + 4.6, S.t0 + 5.6] })
  hero(x, t, { x: 450, y: 960, s: 200, mood: cheer ? 'happy' : 'neutral', look: cheer ? undefined : [1, 0.6], hops: [S.t0 + 4.1, S.t0 + 4.6, S.t0 + 5.6] })
  paperCrown(x, t, F, lerp(0.9, 0, ease.outBack(prog(u, 4.3, 4.7))))
  laptop(x, t, 690, 1080, { open: 1 - shut, screen: u > 1.4 ? 'auto' : 'inbox', k: outK(t, [S.t0 + 5.4, S.t0 + 5.7]) })
  if (u > 1.4) sparkles(x, t, 690, 960, S.t0 + 1.42, 8, 120, 1, [MINT, BONE])
  // the pie arrives
  const pk = pop01(t, S.t0 + 5.6, 0.35, 2.4)
  if (pk > 0.01) { x.save(); x.translate(540, 1060); x.scale(pk, pk); food(x, 0, 0, 'pie'); x.restore(); hearts(x, t, S.t0 + 5.7, 540, 960, { n: 6 }) }
  if (cheer) label(x, 'CLICK.', 700, 900, { size: 34, col: GOLD, alpha: outK(t, [S.t0 + 4.6, S.t0 + 4.9]) * (u > 4.0 ? 1 : 0) })
}

function item(x, t, cx, cy, s) {
  x.save(); x.translate(cx, cy); x.scale(s, s); x.rotate(0.06)
  box(x, -150, -100, 300, 200, '#fff1a8', { b: 7 })
  R(x, '#f2dc70', -150, -100, 300, 30)
  ink(x, 'AUTO-REPLY', 0, -40, { size: 34, font: INTER, weight: 800 })
  ink(x, 'back on the 2nd', 0, 6, { size: 24 })
  ink(x, 'happy holidays!', 0, 50, { size: 24, col: RED })
  x.restore()
}

const EP = makeSurv({
  id: 'nhse05', ep: 5, hero: 'capricorn', accent: CAP,
  heads: ['*Out of office.* | Still in the office.', 'Ping. | *Ping.* Ping.', 'Set it. | *Believe* it.', 'Packed: | *an auto-reply.*'],
  headSize: [84, 100, 100, 92],
  acts: [act0, act1, act2],
  line1: { t: 9.9, speaker: '♑︎ CAPRICORN', color: CAP, text: 'just one quick reply. or *nine*.', close: 13.5 },
  tips: ['set the auto-reply. then *believe* it.', 'work will be there. *so will they.*'],
  last: 'The inbox can wait. The *pie* can’t.',
  item: { label: 'AN AUTO-REPLY', draw: item },
  pis: [{ x: 960, y: 560, s: 100, noTissues: true }, { x: 960, y: 560, s: 100, noTissues: true }, { x: 950, y: 520, s: 100, noTissues: true }],
  cues: [
    [...Array.from({ length: 26 }, (_, i) => ['tick', +(0.1 + i * 0.25).toFixed(2), 0.02]), ['pop', 4.0, 1567.98, 0.04, 0.3]],
    [...[0.83, 1.66, 2.5, 3.33, 4.16].map(a => ['pop', a, 1567.98, 0.04, 0.3]), ['whoosh', 1.2, 0.5, 0.03], ['whoosh', 2.6, 3, 0.02]],
    [['pop', 1.42, 1174.66, 0.04, 0], ['glitter', 1.42, 1.8], ['tick', 4.0, 0.09], ['tom', 4.0, 120, { gain: 0.2, decay: 0.15 }], ['pluck', 4.4, 1318.51, 0.04, 0.5, 0], ['pop', 5.62, 987.77, 0.045, 0], ['glitter', 5.7, 6.1]],
    [],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [bubble, shadow, PINK, clamp]
