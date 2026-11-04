// nt2e67: PLOT TWIST, "Plot Twist: the hummed tune" (20 s vertical, Star Talk Trends Vol. 2 ep 67, promo/films/next30/b14.md;
// music: cinematic · Dm). Story 0–15.6, then the shared end card. Format: ../../nt2e66/scenes/twist.js.
//   0.0–2.1    hook (frame 0, cold blue): "You hummed a tune on date one. | They went *quiet.*"  Taurus hums over a cup
//              (notes drifting); Cancer beside it, perfectly still.
//   2.1–4.85   BEAT 1 "they stared. *for a while.*"  Cancer frozen, eyes wide; a lonely "…"
//   4.8        card cut.
//   4.85–7.6   BEAT 2 "three days of *short* replies."  "busy!" · "busy!!" · "so busy!!!"  Taurus: "was it the humming?"
//   7.6        PLOT TWIST slam.
//   8.75–11.35 BEAT 3 (warm) "they were learning *your* tune."  Cancer at a tiny keyboard plays it back, one note
//              wrong (plonk), all heart: "it goes like this, right?" Taurus melts.
//   11.95      THE STARS: "They were *listening* the whole time."  Pisces, sobbing happily: "aww."
import { makeTwist, drawStage, chatPhone, thought, couch, mug, sfx, R, box, bubble, label, shadow, sparkles, hearts, drawBits, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, RED, INTER, T } from '../../nt2e66/scenes/twist.js'

const FLOOR = 1180
const NOTE = ['.NN', '.N.', '.N.', 'NN.', 'NN.']

function notes(x, t, cx, cy, { n = 4, col = GOLD, rate = 0.6, spread = 60 } = {}) {
  for (let i = 0; i < n; i++) { const ph = (t * rate + i / n) % 1; drawBits(x, NOTE, { N: col }, cx + Math.sin(ph * 6 + i) * spread * 0.4 + i * 14, cy - ph * 220, 12, { alpha: 1 - ph }) }
}
function room(x, t, warm) { drawStage(x, t, { warm, wall: '#2c2a50', floor: '#3a3060' }); couch(x, 540, 1110, { col: warm ? '#c85a6e' : '#4a4f7a', w: 600 }) }

function keyboard(x, t, cx, cy, press) {
  box(x, cx - 200, cy - 50, 400, 100, '#2a2148', { b: 7 })
  for (let i = 0; i < 10; i++) { const down = press === i; R(x, down ? '#ffd27a' : BONE, cx - 186 + i * 38, cy - 34 + (down ? 4 : 0), 32, 74) }
  for (const i of [0, 1, 3, 4, 5, 7, 8]) R(x, INK, cx - 162 + i * 38, cy - 34, 20, 44)
  R(x, INK, cx - 150, cy + 50, 16, 80); R(x, INK, cx + 134, cy + 50, 16, 80)
}

function beat1(x, t, S) {
  const { u, hero, date } = S
  room(x, t, 0)
  hero(x, t, { x: 360, y: 960, s: 220, mood: u > 1.6 ? 'neutral' : 'happy', look: [1, 0], hops: [S.t0 + 0.3, S.t0 + 0.7] })
  mug(x, 440, 990, { col: '#9fe6b0', s: 0.9 })
  if (u < 1.4) notes(x, t, 360, 820)
  date(x, t, { x: 740, y: 960, s: 220, mood: 'wide', look: [-1, 0], bob: 0, blink: false })
  const k = pop01(t, S.t0 + 1.3, 0.3, 2)
  if (k > 0.01) label(x, '…', 740, 740, { size: 120 * k, font: INTER, weight: 800, col: BONE })
}

function beat2(x, t, S) {
  const { u, hero } = S
  room(x, t, 0)
  chatPhone(x, t, 700, 760, [
    { text: 'MON: busy!', at: S.t0 + 0.2, size: 28 }, { text: 'TUE: busy!!', at: S.t0 + 0.6, size: 28 }, { text: 'WED: so busy!!!', at: S.t0 + 1.0, size: 28 },
  ], { s: 1.15, rot: 0.04, name: 'CANCER' })
  hero(x, t, { x: 280, y: 1000, s: 220, mood: u > 1.0 ? 'wide' : 'neutral', look: [1, -0.6], hops: [S.t0 + 0.2, S.t0 + 0.6, S.t0 + 1.0] })
  thought(x, t, 400, 1250 - 450, 'was it the humming?', S.t0 + 1.4, S.t1, { size: 32 })
}

function beat3(x, t, S) {
  const { u, hero, date } = S
  room(x, t, 1)
  const seq = [0, 2, 4, 5, 7, 6, 4, 9], i = Math.floor((u - 1.2) / 0.2)
  const press = u > 1.2 && i < seq.length ? seq[i] : -1
  keyboard(x, t, 690, 1000, press)
  date(x, t, { x: 690, y: 820, s: 210, mood: press === 9 ? 'wide' : 'happy', look: [0, 0.8], hops: seq.map((_, j) => S.t0 + 1.2 + j * 0.2) })
  if (u > 1.2 && u < 2.9) notes(x, t, 690, 700, { col: '#ffd27a', rate: 0.9 })
  sfx(x, t, 'plonk.', 860, 700, S.t0 + 1.2 + 7 * 0.2, { size: 40, col: RED, rot: 0.15, life: 0.6 })
  bubble(x, t, 640, 540, S.t0 + 1.5, S.t1, 'it goes like this, right?', { size: 32, tail: 0.1 })
  hero(x, t, { x: 270, y: 980, s: 220, mood: u > 1.8 ? 'heart' : 'wide', look: [1, -0.2], hops: [S.t0 + 1.9, S.t0 + 2.4] })
  if (u > 1.9) hearts(x, t, S.t0 + 1.95, 270, 870, { n: 5 })
}

const EP = makeTwist({
  id: 'nt2e67', sign: 'taurus', name: 'Taurus', date: 'cancer', deep: '#2f8a5a', accent: '#7fd0ff',
  hookText: 'You hummed a tune on date one. | They went *quiet.*', hookSize: 64, hookAccent: 100,
  room,
  hook(x, t, S) {
    room(x, t, 0)
    S.hero(x, t, { x: 360, y: 950, s: 250, mood: 'happy', look: [1, 0], hops: [0.3, 0.75, 1.2, 1.65] })
    mug(x, 460, 990, { col: '#9fe6b0', s: 1 })
    notes(x, t, 380, 800, { n: 5 })
    S.date(x, t, { x: 760, y: 960, s: 220, mood: 'wide', look: [-1, 0], bob: 0, blink: false })
  },
  hookCues: [['pluck', 0.3, 659.25, 0.03, -0.3, 0.3], ['pluck', 0.75, 783.99, 0.03, -0.3, 0.3], ['pluck', 1.2, 880, 0.03, -0.3, 0.3], ['pluck', 1.65, 783.99, 0.03, -0.3, 0.3]],
  tells: [
    { caption: 'they stared. *for a while.*', draw: beat1, pis: { x: 960, y: 1660 },
      cues: [['pluck', 0.3, 659.25, 0.03, -0.3, 0.3], ['pluck', 0.7, 783.99, 0.03, -0.3, 0.3], ['tick', 1.3, 0.04]] },
    { caption: 'three days of *short* replies.', draw: beat2, pis: { x: 120, y: 1660, look: [1, -0.6] },
      cues: [['pop', 0.2, 659.25, 0.035, 0.3], ['pop', 0.6, 622.25, 0.035, 0.3], ['pop', 1.0, 587.33, 0.04, 0.3]] },
    { caption: 'they were learning *your* tune.', draw: beat3, pis: { x: 960, y: 1660 },
      cues: [0, 2, 4, 5, 7, 6, 4].map((n, j) => ['pluck', 1.2 + j * 0.2, [523.25, 587.33, 659.25, 698.46, 783.99, 880, 987.77, 1046.5][n % 8], 0.035, 0.2, 0.3])
        .concat([['pop', 2.6, 277.18, 0.05, 0.3], ['glitter', 1.95, 2.4]]) },
  ],
  finale(x, t, S) {
    const { hero, date, ok, HERO_FIN_HOPS } = S
    shadow(x, 420, 1070, 220 * ok); shadow(x, 680, 1080, 200 * ok)
    hero(x, t, { x: 420, y: 880, s: 250, pop: ok, mood: 'heart', look: [1, 0], hops: HERO_FIN_HOPS })
    date(x, t, { x: 680, y: 890, s: 230, pop: ok, mood: 'happy', look: [-1, 0], hops: [T.stamp + 0.1, T.last + 1.7] })
    notes(x, t, 550, 760, { n: 4, col: '#ffd27a' })
  },
  last: 'They were *listening* the whole time.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [outK, prog, lerp, clamp, ease, sparkles, chatPhone, box]
