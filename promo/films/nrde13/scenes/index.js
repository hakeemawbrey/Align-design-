// nrde13: RATE MY DATE IDEA, "Aries plans a ranked snowball fight" (16 s vertical trial reel, music: funk · A).
// Story 0–13.6, then the short 2.4 s end card. The format lives in ../../nrde01/scenes/datekit.js.
//   0.0–2.6   hook: “Snowball fight. *Ranked.*”  ♈ Aries pops up behind a snow wall next to a little scoreboard.
//   2.6–5.8   THE PLAN "Aries keeps *score.* loudly."  Aries lobs snowballs; the scoreboard flips ARIES 1… 9, DATE 0.
//   5.8       jump cut (flash + zoom punch; no card transition).
//   5.8–9.3   BUT… "one snowball. *Right* on Aries."  The ♐ Sagittarius date's snowball lands POOF on Aries; Aries
//             bursts out laughing, the scoreboard topples, and they flop into snow angels side by side.
//   9.32      THE STARS RATE IT 8/10 *forgot the score*.  Pisces: 10/10.   9.8 THE STARS: "You don't win a date. You *share* it."
import { makeDate, R, box, bubble, shadow, hearts, card, snow, sparkles, pop01, prog, lerp, ease, INK, BONE, GOLD, PINK, MONO } from '../../nrde01/scenes/datekit.js'

function ground(x, y, bot = 1320) { R(x, '#e8f2ff', 0, y, 1080, bot - y); R(x, '#ffffff', 0, y, 1080, 10); for (let i = 0; i < 6; i++) R(x, '#cfe0f5', i * 190 + 40, y + 50 + (i % 2) * 60, 90, 8) }
function wall(x, cx, by, w = 360, h = 150) {
  for (let r = 0; r < 3; r++) for (let i = 0; i < 4 - (r % 2); i++) { const bw = w / 4, bx = cx - w / 2 + i * bw + (r % 2) * bw / 2, byy = by - (r + 1) * (h / 3); box(x, bx + 3, byy + 3, bw - 6, h / 3 - 6, '#f4f9ff', { b: 4, hi: '#ffffff' }) }
}
function board(x, cx, cy, a, d, rot = 0, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  R(x, INK, -8, 60, 16, 140)
  box(x, -150, -70, 300, 140, '#2a2148', { b: 6 })
  x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE
  x.fillText('ARIES', -70, -40); x.fillText('DATE', 70, -40)
  x.font = `700 64px ${MONO}`; x.fillStyle = '#ff6b5a'; x.fillText(String(a), -70, 20); x.fillStyle = '#9fe6b0'; x.fillText(String(d), 70, 20)
  x.restore()
}
function ball(x, cx, cy, r = 26) { x.beginPath(); x.arc(cx, cy, r + 5, 0, Math.PI * 2); x.fillStyle = INK; x.fill(); x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fillStyle = '#ffffff'; x.fill() }
function poof(x, t, cx, cy, t0) { sparkles(x, t, cx, cy, t0, 10, 110, 0.3, ['#ffffff', '#dff2ff', BONE]) }
function angel(x, cx, cy, t, col) {
  const f = Math.sin(t * 6) * 0.25
  x.save(); x.translate(cx, cy); x.fillStyle = '#cfe0f5'
  x.beginPath(); x.ellipse(0, 0, 150, 60, 0, 0, Math.PI * 2); x.fill()
  for (const d of [-1, 1]) { x.save(); x.rotate(d * (0.5 + f)); x.beginPath(); x.ellipse(d * 120, -30, 90, 30, 0, 0, Math.PI * 2); x.fill(); x.restore() }
  x.restore(); void col
}

const EP = makeDate({
  id: 'nrde13', sign: 'aries', date: 'sagittarius', accent: '#ff8a6b', deep: '#c0362e',
  idea: 'Snowball fight. *Ranked.*',
  hook(x, t, S) {
    snow(x, t, { n: 26, a: 0.6, y0: 520, y1: 1500 })
    ground(x, 1300, 1520)
    board(x, 820, 1040, 0, 0, 0.05)
    const o = { x: 430, y: 1080, s: 300, mood: 'squint', look: [1, 0], hops: S.HOOK_HOPS }
    S.hero(x, t, o)
    wall(x, 430, 1330, 420, 170)
    ball(x, 640, 1000 - 60 * Math.abs(Math.sin(t * 3)), 30)
  },
  beats: [
    { caption: 'Aries keeps *score.* Loudly.', draw(x, t, S) {
      const { u, hero, date } = S
      snow(x, t, { n: 20, a: 0.5, y0: 520, y1: 1320 })
      ground(x, 1150)
      const a = Math.min(9, Math.floor(u / 0.3))
      board(x, 540, 720, a, 0, -0.03, pop01(t, S.t0 + 0.05, 0.3, 2))
      hero(x, t, { x: 230, y: 1000, s: 190, mood: 'happy', look: [1, -0.3], hops: Array.from({ length: 9 }, (_, i) => S.t0 + i * 0.3) })
      wall(x, 230, 1180, 300, 120)
      // a stream of lobbed snowballs
      for (let i = 0; i < 9; i++) { const p = (u - i * 0.3) / 0.45; if (p > 0 && p < 1) ball(x, lerp(330, 860, p), 980 - 220 * Math.sin(Math.PI * p), 20) }
      date(x, t, { x: 860, y: 1010, s: 180, mood: 'wide', look: [-1, 0], squash: 0.05 * Math.sin(t * 20) })
      wall(x, 860, 1180, 280, 110)
      bubble(x, t, 230, 790, S.t0 + 1.4, S.t1, 'NINE TO ZERO!!', { size: 34 })
    }, cues: Array.from({ length: 9 }, (_, i) => ['tick', +(i * 0.3 + 0.44).toFixed(2), 0.05]).concat([['pop', 1.42, 1318.51, 0.04, -0.3]]) },
    { caption: 'one snowball. *Right* on Aries.', draw(x, t, S) {
      const { u, hero, date } = S
      snow(x, t, { n: 20, a: 0.5, y0: 520, y1: 1320 })
      ground(x, 1150)
      const p = prog(u, 0.15, 0.6)
      const fall = ease.inCubic(prog(u, 0.9, 1.2))
      if (fall < 1) board(x, 540 + 160 * fall, 720 + 900 * fall, 9, 1, -0.03 + fall * 1.4, 1)
      if (u < 1.4) {
        if (p > 0 && p < 1) ball(x, lerp(860, 300, p), 960 - 200 * Math.sin(Math.PI * p), 22)
        poof(x, t, 300, 960, S.t0 + 0.6)
        hero(x, t, { x: 300, y: 1000, s: 190, mood: u < 0.6 ? 'squint' : u < 0.9 ? 'wide' : 'happy', look: [1, 0], hops: [S.t0 + 0.62, S.t0 + 0.95, S.t0 + 1.2] })
        if (u > 0.6) R(x, '#ffffff', 270, 920, 70, 30)
        date(x, t, { x: 840, y: 1010, s: 180, mood: 'happy', look: [-1, 0], hops: [S.t0 + 0.15, S.t0 + 0.7] })
        bubble(x, t, 300, 790, S.t0 + 0.95, S.t0 + 1.4, 'HAHAHA', { size: 38 })
      } else {
        // snow angels
        const k = pop01(t, S.t0 + 1.4, 0.3, 2)
        angel(x, 360, 1150, t, 0); angel(x, 720, 1150, t + 1, 0)
        hero(x, t, { x: 360, y: 1080, s: 170 * k, mood: 'happy', look: [1, -1] })
        date(x, t, { x: 720, y: 1080, s: 170 * k, mood: 'happy', look: [-1, -1] })
        hearts(x, t, S.t0 + 1.6, 540, 1000, { n: 6 })
        card(x, 540, 860, 300, 80, 'SCORE: ???', { size: 40, k: pop01(t, S.t0 + 1.7, 0.3, 2.4), rot: -0.04 })
      }
    }, cues: [['whoosh', 0.15, 0.45, 0.03], ['tick', 0.6, 0.08], ['boom', 0.6, 0.14], ['pop', 0.97, 987.77, 0.04, -0.3], ['tom', 1.2, 120, { gain: 0.18, decay: 0.2 }], ['whoosh', 1.4, 0.3, 0.03], ['pluck', 1.7, 1567.98, 0.035, 0, 0.3]] },
  ],
  score: '8/10', word: 'forgot the score',
  last: 'You don’t win a date. You *share* it.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [GOLD, PINK]
