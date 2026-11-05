// kdye13: DATE YOURSELF, "Cooking for Company" (21 s vertical, star_advice post, jazzy · G). Row: promo/films/month2/m16.md.
// Feeling: cooking for one feels sad. Engine: ../../kdye01/dykit.js · props: ../../kdye01/props.js.
//   0.0–3.2   FRAME 0: ♋ Cancer mid-gasp, a pancake mid-flip over a pan mid-toss. Record scratch + freeze at 0.35.
//             Hook "Cancer, cook like someone's | coming. *Someone is.*" Stamp at 1.8.
//   3.2–8.4   STOP 1 the family recipe: a handwritten card, a stirring pot.
//   8.4–13.6  STOP 2 set the table properly: cloth, candle, folded napkin, a flower in a glass.
//  13.6–19.2  STOP 3 the first bite: Cancer melts; Pisces at the window smells it and cries.
//  19.4–end   last line "You count | as *company.*", hard cut.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { makeDate } from '../../kdye01/dykit.js'
import {
  INK, BONE, GOLD, PINK, RED, INTER, MONO, R, box, room, table, plate, candle, shadow, glow, drawBits, windowFrame,
  sparkles, hearts, bubble, label, pop01, outK, r3,
} from '../../kdye01/props.js'

const D = 21.0
const S1 = [3.2, 8.4], S2 = [8.4, 13.6], S3 = [13.6, 19.2]
const CAN = '#b8f0ff'
function kitchen(x) {
  room(x, { wall: '#4a5a3a', wall2: '#435335', floor: '#3a2a2a', floorY: 1320, stripes: false })
  for (let i = 0; i < 10; i++) for (let j = 0; j < 3; j++) R(x, (i + j) % 2 ? '#e8e2d0' : '#d8d0b8', i * 108, 760 + j * 70, 104, 66)
  box(x, 40, 970, 1000, 40, '#c9b8a0', { b: 7 }); box(x, 60, 1010, 960, 310, '#7a5a3a', { b: 7 })
}
function pan(x, cx, cy, rot) { x.save(); x.translate(cx, cy); x.rotate(rot); box(x, -110, -20, 220, 40, '#4a4460', { b: 6 }); R(x, INK, 110, -8, 140, 16); x.restore() }
function pancake(x, cx, cy, rot, s = 1) { x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s); x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 96, 34, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#e8b060'; x.beginPath(); x.ellipse(0, 0, 88, 28, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#c88a40'; x.fillRect(-30, -8, 20, 8); x.fillRect(20, 2, 24, 8); x.restore() }

function opener(x, t, S) {
  kitchen(x)
  pan(x, 560, 930, -0.3)
  const tt = t + 0.4
  pancake(x, 600 + 30 * tt, 900 - 320 * Math.sin(Math.min(1, tt / 1.6) * Math.PI), tt * 5)
  S.hero(x, t, { x: 300, y: 860, s: 270, mood: 'wide', look: [1, -1], squash: -0.08 })
  S.pis(x, t, { x: 930, y: 1500, s: 130, mood: 'wide', look: [-1, -0.6] }, 1)
}

function recipe(x, t, S) {
  const { u } = S
  kitchen(x)
  // pot with steam
  box(x, 480, 820, 280, 150, '#c84a3a', { b: 7, hi: '#e86a5a' })
  for (let i = 0; i < 4; i++) { const p = ((t * 0.6 + i / 4) % 1); x.save(); x.globalAlpha = 0.6 * (1 - p); R(x, '#fff6ea', 530 + i * 50 + 10 * Math.sin(t * 3 + i), 780 - p * 220, 14, 30); x.restore() }
  const a = t * 4; x.save(); x.translate(620 + Math.cos(a) * 50, 760); x.rotate(0.3 + 0.2 * Math.sin(a)); R(x, INK, -8, -150, 16, 170); R(x, '#a87650', -4, -146, 8, 162); x.restore()
  // recipe card
  const ck = pop01(t, S.a + 0.4, 0.3, 2.2)
  if (ck > 0.01) {
    x.save(); x.translate(260, 600); x.rotate(-0.08); x.scale(ck, ck)
    box(x, -170, -110, 340, 220, '#f4e8cc', { b: 6 }); R(x, '#e8504a', -170, -110, 340, 14)
    x.font = `italic 500 40px 'EB Garamond', serif`; x.fillStyle = '#2c2a7a'; x.textAlign = 'center'; x.fillText('family soup', 0, -40)
    for (let i = 0; i < 3; i++) R(x, '#8a88c0', -130, -6 + i * 32, 260 - i * 40, 5)
    x.restore()
  }
  S.hero(x, t, { x: 300, y: 1140, s: 240, mood: u > 2.6 ? 'happy' : 'neutral', look: [1, -0.4], hops: [S.a + 2.6] })
}

function setTable(x, t, S) {
  const { u } = S
  room(x, { wall: '#5a3a4a', wall2: '#52343f', floor: '#3a2a3a', floorY: 1320, win: { x: 740, y: 600, w: 240, h: 220, sky: 'night' } })
  table(x, 540, 1160, 640, { cloth: '#e8504a' })
  const items = [
    [0.5, () => plate(x, 540, 1150, 220)],
    [1.2, () => { x.save(); x.translate(380, 1140); box(x, -40, -14, 80, 28, BONE, { b: 4 }); drawBits(x, ['.W.', 'WWW'], { W: BONE }, 0, -24, 10); x.restore() }],
    [1.9, () => candle(x, 720, 1160, t, { h: 80 })],
    [2.6, () => { box(x, 640, 1050, 50, 100, 'rgba(201,236,251,0.6)', { b: 4 }); R(x, '#5fd38a', 662, 960, 6, 100); drawBits(x, ['.P.', 'PYP', '.P.'], { P: PINK, Y: GOLD }, 665, 950, 12) }],
  ]
  for (const [at, f] of items) if (u > at) f()
  sparkles(x, t, 540, 1100, S.a + 2.6, 10, 220, 1)
  S.hero(x, t, { x: 220, y: 1000, s: 230, mood: u > 2.7 ? 'sparkle' : 'happy', look: [1, 0.4], hops: items.map(([a]) => S.a + a) })
}

function firstBite(x, t, S) {
  const { u } = S
  room(x, { wall: '#5a3a4a', wall2: '#52343f', floor: '#3a2a3a', floorY: 1320, stripes: false })
  windowFrame(x, { x: 700, y: 580, w: 300, h: 300, sky: 'night' })
  table(x, 460, 1200, 560, { cloth: '#e8504a' })
  plate(x, 460, 1190, 220, { food: (c, px, py) => drawBits(c, ['.SSSSS.', 'SOSSOSS', '.SSSSS.'], { S: '#f0a04a', O: '#ffd38a' }, px, py, 10) })
  candle(x, 650, 1200, t, { h: 80 })
  S.hero(x, t, { x: 400, y: 1040, s: 260, mood: u > 1.0 ? 'heart' : 'happy', look: [0, 1], hops: [S.a + 1.0], squash: u > 1.0 ? 0.1 : 0 })
  if (u > 1.0) { hearts(x, t, S.a + 1.0, 400, 880, { n: 6 }); label(x, 'mmm.', 300, 820, { size: 44, col: GOLD, font: INTER, weight: 800, alpha: outK(t, [S.a + 2.6, S.a + 3.0]) }) }
  // Pisces at the window, nose to the glass
  x.save(); x.beginPath(); x.rect(700, 580, 300, 300); x.clip()
  S.pis(x, t, { x: 850, y: 760, s: 170, mood: 'sparkle', look: [-1, 0.4] }, 3)
  x.restore()
  bubble(x, t, 850, 540, S.a + 1.6, S.b - 0.2, 'smells like HOME', { size: 28, col: '#c9ecfb' })
}

const EP = makeDate({
  id: 'kdye13', sign: 'cancer', name: 'Cancer', D, ending: 'cut',
  hook: "Cancer, cook like | someone's coming. | *Someone is.*", hookSize: 100, hookAccent: CAN,
  stampAt: 1.8,
  fx: [{ kind: 'scratch', o: { at: 0.35, len: 1.1, caption: 'yep. pancakes *for one.*', top: 1580 } }],
  opener,
  stops: [
    { a: S1[0], b: S1[1], sticker: 'the *family* recipe', draw: recipe,
      cues: [['pop', 0.4, 880, 0.04, -0.3], ['pluck', 2.6, 987.77, 0.03, 0.5, 0]] },
    { a: S2[0], b: S2[1], sticker: 'set the table *properly*', draw: setTable,
      cues: [['whoosh', 0.02, 0.4, 0.035], ...[0.5, 1.2, 1.9, 2.6].map((a, i) => ['pop', a, [659.25, 783.99, 987.77, 1318.51][i], 0.04, 0]), ['glitter', 2.6, 3.0]] },
    { a: S3[0], b: S3[1], sticker: 'the *first bite*', draw: firstBite,
      cues: [['whoosh', 0.02, 0.4, 0.035], ['pluck', 1.0, 1174.66, 0.045, 0.6, 0], ['pluck', 1.12, 1567.98, 0.04, 0.6, 0], ['pop', 1.6, 880, 0.03, 0.4]] },
  ],
  lines: [
    { t: 3.8, who: 'hero', text: 'cooking for one feels *silly.*' },
    { t: 6.1, who: 'stars', text: "you're not one. you're *the guest.*" },
    { t: 9.0, who: 'stars', text: 'napkin. candle. the *works.*' },
    { t: 11.2, who: 'hero', text: "for *me?* I'm honoured." },
    { t: 14.2, who: 'hero', text: "oh, I'm a *great* cook." },
    { t: 16.4, who: 'stars', text: 'and great *company.*' },
  ],
  boxes: [[3.6, 8.25, [0, 1]], [8.8, 13.45, [2, 3]], [14.0, 19.1, [4, 5]]],
  last: { t: 19.4, text: 'You count | as *company.*', top: 300, size: 110, accent: CAN },
  cues: [['tick', 0.0, 0.05]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [RED, MONO, shadow, glow, r3, clamp, lerp, ease, prog]
