// nrde14: RATE MY DATE IDEA, "Taurus plans a cheese tasting" (16 s vertical trial reel, music: jazzy · Eb).
// Story 0–13.6, then the short 2.4 s end card. The format lives in ../../nrde01/scenes/datekit.js.
//   0.0–2.6   hook: “A tasting. *Twelve* cheeses.”  ♉ Taurus presents a wooden board of cheeses, little flags in each.
//   2.6–5.8   THE PLAN "twelve cheeses. *twelve* little flags."  The board fills, flag by flag; Taurus is in heaven.
//   5.8       jump cut (flash + zoom punch; no card transition).
//   5.8–9.3   BUT… "their date *can't* do dairy."  The ♋ Cancer date winces: "oh no… I can't do dairy."  Taurus:
//             "I know! you told me." and slides out a second board: fruit, crackers, olives — just for them.
//   9.32      THE STARS RATE IT 10/10 *you asked first*.  Pisces: 11/10.   9.8 THE STARS: "Ask what they *love* before you plan."
import { makeDate, R, box, bubble, shadow, hearts, card, table, sparkles, pop01, prog, lerp, ease, INK, BONE, GOLD, PINK } from '../../nrde01/scenes/datekit.js'

const CH = ['#f6d36b', '#fff1c8', '#f2a63c', '#ffe9a8', '#e9d9a6', '#f8c66a']
function cheese(x, cx, cy, i, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  if (i % 3 === 0) { x.fillStyle = INK; x.beginPath(); x.moveTo(-40, 20); x.lineTo(40, 20); x.lineTo(30, -26); x.closePath(); x.fill(); x.fillStyle = CH[i % 6]; x.beginPath(); x.moveTo(-32, 14); x.lineTo(32, 14); x.lineTo(25, -18); x.closePath(); x.fill(); R(x, '#d9a63a', 0, 0, 8, 8) }
  else if (i % 3 === 1) { x.beginPath(); x.arc(0, 0, 30, 0, Math.PI * 2); x.fillStyle = INK; x.fill(); x.beginPath(); x.arc(0, 0, 24, 0, Math.PI * 2); x.fillStyle = CH[i % 6]; x.fill() }
  else box(x, -30, -20, 60, 40, CH[i % 6], { b: 5 })
  x.restore()
}
function flag(x, cx, cy, n, k) { if (k <= 0.01) return; x.save(); x.translate(cx, cy); x.scale(k, k); R(x, INK, -2, -60, 4, 60); R(x, BONE, 2, -60, 34, 22); x.fillStyle = INK; x.font = "800 16px Inter"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(String(n), 19, -48); x.restore() }
function board(x, cx, cy, w, h) { box(x, cx - w / 2, cy - h / 2, w, h, '#b07a48', { b: 6, hi: '#c99260' }); R(x, INK, cx + w / 2, cy - 12, 50, 24); R(x, '#b07a48', cx + w / 2 + 4, cy - 8, 42, 16) }
const SPOTS = Array.from({ length: 12 }, (_, i) => [((i % 4) - 1.5) * 150, (Math.floor(i / 4) - 1) * 100])

const EP = makeDate({
  id: 'nrde14', sign: 'taurus', date: 'cancer', accent: '#ffd36b', deep: '#a7740f',
  idea: 'A tasting. *Twelve* cheeses.',
  hook(x, t, S) {
    table(x, 540, 1330, 960, '#6b4a2f')
    board(x, 690, 1240, 520, 150)
    for (let i = 0; i < 8; i++) { cheese(x, 690 + ((i % 4) - 1.5) * 115, 1210 + Math.floor(i / 4) * 60, i, 0.8) }
    shadow(x, 280, 1340, 200)
    S.hero(x, t, { x: 280, y: 1110, s: 280, mood: 'heart', look: [1, 0.5], hops: S.HOOK_HOPS })
    sparkles(x, t, 690, 1180, 0.05, 8, 200, 1)
  },
  beats: [
    { caption: 'twelve cheeses. *Twelve* little flags.', draw(x, t, S) {
      const { u, hero } = S
      table(x, 540, 1190, 1000, '#6b4a2f')
      board(x, 540, 1040, 680, 330)
      SPOTS.forEach(([dx, dy], i) => { const k = pop01(t, S.t0 + i * 0.2, 0.25, 2.4); if (k > 0.01) { cheese(x, 540 + dx, 1050 + dy, i, k); flag(x, 540 + dx + 10, 1040 + dy, i + 1, k) } })
      hero(x, t, { x: 540, y: 720, s: 190, mood: u > 1.5 ? 'heart' : 'sparkle', look: [0, 1], hops: [S.t0 + 0.8, S.t0 + 1.6, S.t0 + 2.4] })
    }, cues: Array.from({ length: 12 }, (_, i) => ['pop', +(i * 0.2).toFixed(2), [659.25, 739.99, 880, 987.77][i % 4] * (i > 7 ? 2 : 1), 0.025, (i % 2 ? 0.3 : -0.3)]) },
    { caption: 'their date *can’t* do dairy.', draw(x, t, S) {
      const { u, hero, date } = S
      table(x, 540, 1190, 1000, '#6b4a2f')
      board(x, 280, 1110, 360, 120)
      for (let i = 0; i < 6; i++) cheese(x, 280 + ((i % 3) - 1) * 100, 1095 + Math.floor(i / 3) * 40, i, 0.6)
      // the second board slides in: fruit, crackers, olives
      const sl = ease.outCubic(prog(u, 1.4, 1.9))
      const bx = lerp(1300, 760, sl)
      board(x, bx, 1110, 380, 120)
      for (let i = 0; i < 5; i++) { const cx = bx - 140 + i * 70; if (i % 2) { box(x, cx - 24, 1088, 48, 34, '#e9cf9a', { b: 4 }) } else { x.beginPath(); x.arc(cx, 1104, 20, 0, Math.PI * 2); x.fillStyle = INK; x.fill(); x.beginPath(); x.arc(cx, 1104, 15, 0, Math.PI * 2); x.fillStyle = i === 2 ? '#3f8a3a' : '#e8344e'; x.fill() } }
      shadow(x, 300, 1190, 160); shadow(x, 800, 1190, 160)
      hero(x, t, { x: 300, y: 890, s: 180, mood: u < 1.3 ? 'happy' : 'sparkle', look: [1, 0], hops: [S.t0 + 1.25, S.t0 + 1.9] })
      date(x, t, { x: 790, y: 880, s: 180, mood: u < 1.9 ? 'wide' : 'heart', look: [-1, 0.2], hops: [S.t0 + 0.2, S.t0 + 2.0] })
      bubble(x, t, 760, 680, S.t0 + 0.25, S.t0 + 1.3, 'oh no… I can’t do dairy.', { size: 30, tail: 0.3 })
      bubble(x, t, 320, 680, S.t0 + 1.3, S.t1, 'I know! you told me.', { size: 32, tail: -0.2 })
      card(x, bx, 990, 220, 60, 'JUST FOR YOU', { size: 26, col: GOLD, k: pop01(t, S.t0 + 1.95, 0.3, 2.4), rot: -0.05 })
      hearts(x, t, S.t0 + 2.0, 790, 820, { n: 5 })
    }, cues: [['pop', 0.27, 659.25, 0.03, 0.3], ['pop', 1.32, 987.77, 0.035, -0.3], ['whoosh', 1.4, 0.5, 0.035], ['pop', 1.97, 1318.51, 0.045, 0.3], ['pluck', 2.05, 1567.98, 0.035, 0.3, 0.3]] },
  ],
  score: '10/10', word: 'you asked first',
  last: 'Ask what they *love* before you plan.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK]
