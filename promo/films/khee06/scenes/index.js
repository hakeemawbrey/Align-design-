// khee06: HEALING ERA, Ep 6 "The breakup spreadsheet" (24 s vertical, Month 2 boost m15, star_advice post, chiptune · G).
// Engine: ../../khee01/healkit.js (sets: ../../khee01/healset.js). Rows: promo/films/month2/m15.md. Hard cut.
//   0.0    frame 0: Virgo mid-slide across the kitchen floor on a rolling chair, laptop open to a giant spreadsheet
//          "WHAT WENT WRONG (v14)", speed lines, DAY 6 on the wall. Hook: "Day 6. A spreadsheet of *what went wrong.*"
//   0.6    whip zoom into the cells ("tue: said 'ok' (bad?)", "colour: ??"); the kit's loading bar: "finding the answer…"
//          stalls at 99 % → "Error: some things have no answer".  Pisces tears up at the save icon.
//   6.4    THE STARS: "it's not a puzzle you *failed.*" / "some answers never come. you can still *move.*"
//   15.0   Virgo closes the laptop and goes for a walk (scarf on); the calendar tears to DAY 12; a new sheet:
//          "THINGS I LIKE" (walks ✓, soup ✓, me ✓).
//   21.7   Last line: "Close the file, not your *heart.*"  (accent lands at 23.05, holds to the last frame)
import { makeHeal, lerp, prog, ease, shadow, pop01, R, INK, BONE, ink, MINT, GOLD } from '../../khee01/healkit.js'
import { kitchen, laptop } from '../../khee01/healset.js'
import { loadingBar, loadingBarCues } from '../../hookkit.js'

const FLOOR = 1420, fy = s => FLOOR - 0.44 * s
const LOAD = { at: 1.6, len: 2.6, label: 'finding the answer…', stallAt: 99, error: 'Error: some things have no answer', y: 740 }

function sheet(rows, title, tint = '#e8f4e8') {
  return (x, X, Y, W, H) => {
    R(x, tint, X, Y, W, H)
    R(x, '#2f8a5e', X, Y, W, 26); ink(x, title, X + W / 2, Y + 13, { size: 15, col: BONE, font: "'Space Mono', monospace", weight: 700 })
    for (let i = 0; i < rows.length; i++) {
      const y = Y + 34 + i * 26
      R(x, 'rgba(27,18,54,0.18)', X, y + 22, W, 2)
      ink(x, rows[i], X + 10, y + 11, { size: 15, align: 'left', col: INK, font: "'Space Mono', monospace", weight: 700 })
    }
    for (let c = 1; c < 3; c++) R(x, 'rgba(27,18,54,0.12)', X + c * W / 3, Y + 26, 2, H - 26)
  }
}
const WRONG = sheet(['tue: said "ok" (bad?)', 'colour: ??', 'sun: late (7 min)', 'vibe: ??????'], 'WHAT WENT WRONG (v14)', '#f4eee0')
const LIKE = sheet(['walks ✓', 'soup ✓', 'my friends ✓', 'me ✓'], 'THINGS I LIKE', '#e4f6ea')

function chair(x, cx, cy) { R(x, INK, cx - 90, cy - 20, 180, 30); R(x, '#4a5a8a', cx - 84, cy - 16, 168, 22); R(x, INK, cx - 8, cy + 10, 16, 60); R(x, INK, cx - 80, cy + 66, 160, 12); for (const d of [-74, 0, 74]) { R(x, INK, cx + d - 12, cy + 74, 24, 24); R(x, '#8a8aa8', cx + d - 8, cy + 78, 16, 16) } }

function s1(x, t, S) {
  const { u, hero } = S
  kitchen(x, t, { cal: { day: 6 }, stoveClock: '1:30' })
  // the roll across the floor: frame 0 mid-slide
  const roll = ease.outCubic(prog(u, -0.6, 0.6))
  const cx = lerp(120, 420, roll)
  if (u < 0.6) for (let i = 0; i < 5; i++) R(x, 'rgba(239,230,214,0.5)', cx - 260 - i * 30, 1240 + i * 30, 120 + i * 20, 8)
  shadow(x, cx, FLOOR + 4, 280)
  chair(x, cx, 1310)
  hero(x, t, { x: cx, y: 1200, s: 270, mood: u < 0.6 ? 'wide' : u < 4.4 ? 'squint' : 'wide', look: [1, 0], blink: false, squash: u < 0.6 ? -0.06 : 0 })
  laptop(x, cx + 250, 1260, { s: 1.15, open: 1, screen: WRONG })
}
function s2(x, t, S) {
  const { u, hero } = S
  kitchen(x, t, { cal: { day: 6 }, stoveClock: '1:36', dim: 0.5 })
  shadow(x, 540, 1300, 260)
  hero(x, t, { x: 540, y: 1185, s: 260, mood: u > 4 ? 'sparkle' : 'neutral', look: [0, -1] })
  laptop(x, 780, 1290, { s: 0.7, open: 1, screen: WRONG })
}
function s3(x, t, S) {
  const { u, hero } = S
  kitchen(x, t, { cal: { day: 12 }, stoveClock: u < 1.4 ? '1:40' : '10:20', morning: lerp(0, 0.6, prog(u, 1.2, 2.4)) })
  const close = ease.inOutCubic(prog(u, 0.2, 0.8))
  const like = u > 3.2
  shadow(x, 360, FLOOR + 4, 280)
  hero(x, t, { x: 360, y: fy(280), s: 280, mood: u < 0.8 ? 'neutral' : 'happy', look: [1, -0.2], hops: [S.t0 + 0.9, S.t0 + 1.3, S.t0 + 1.7, S.t0 + 2.1] })
  // the scarf for the walk
  if (u > 1.0) { R(x, INK, 270, 1350, 180, 30); R(x, '#e8344e', 274, 1354, 172, 22); R(x, INK, 400, 1350, 30, 70); R(x, '#e8344e', 404, 1354, 22, 62) }
  laptop(x, 680, 1300, { s: 1.0, open: like ? 1 : 1 - close, screen: like ? LIKE : WRONG })
  // footsteps of the walk, crossing the floor
  if (u > 1.0 && u < 3.2) for (let i = 0; i < 6; i++) { const p = prog(u, 1.0 + i * 0.25, 1.3 + i * 0.25); if (p > 0) { R(x, INK, 120 + i * 140, 1500 + (i % 2) * 40, 40, 24); R(x, MINT, 124 + i * 140, 1504 + (i % 2) * 40, 32, 16) } }
}
function fin(x, t, S) {
  const { u, hero } = S
  kitchen(x, t, { cal: { day: 12 }, stoveClock: '10:25', morning: 0.6, dim: 0.3 })
  shadow(x, 440, 1290, 290)
  hero(x, t, { x: 440, y: 1160, s: 300, mood: u > 1 ? 'happy' : 'sparkle', look: [0, 0], hops: [S.t0 + 0.1, S.T.lastAt + 0.05] })
  laptop(x, 740, 1270, { s: 0.85, open: 1, screen: LIKE })
}

const EP = makeHeal({
  id: 'khee06', sign: 'virgo', name: 'Virgo', len: 24, ending: 'cut',
  hook: 'Day 6. A spreadsheet of | *what went wrong.*',
  brk: { kind: 'whip', at: 0.6, x: 760, y: 1120 },
  whip: { x: 420, y: 1150 },
  kit: [loadingBar(LOAD)], kitCues: loadingBarCues(LOAD),
  h1: 'You didn’t *fail* a test.', h2: 'Close it. *Go outside.*',
  lines: ['it’s not a puzzle you *failed.*', 'some answers never come. you can still *move.*'],
  last: 'Close the file, | not your *heart.*', day: 6, dayTo: 12,
  bubbles: [
    { t0: 4.4, t1: 6.2, x: 420, y: 960, text: 'one more tab. then i’ll know.', size: 36, tail: -0.1 },
    { t0: 18.6, t1: 20.6, x: 440, y: 930, text: 'new sheet. better data.', size: 40, tail: -0.3 },
  ],
  pis1: { x: 925, y: 1350, s: 150 }, pis3: { x: 940, y: 1352, s: 150 },
  s1, s2, s3, fin,
  cues: [['whoosh', 0.0, 0.6, 0.04], ...Array.from({ length: 10 }, (_, i) => ['tick', 4.4 + i * 0.18, 0.02]), ['pop', 15.3, 330, 0.05, 0.3], ['tick', 15.75, 0.07], ...Array.from({ length: 6 }, (_, i) => ['tick', 16.0 + i * 0.25, 0.03]), ['bell', 18.2, 1567.98, 0.03, 0.8, 0.3], ['glitter', 18.2, 18.6]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [GOLD, pop01]
