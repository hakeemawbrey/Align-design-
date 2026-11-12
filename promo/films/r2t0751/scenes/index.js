// r2t0751: star_talk, SOLO, "Aries red flags | *we love.*" (~51 s vertical, signs3kit social cut, music: lofi · C).
// One sign the whole way: nine "red flags" that are really just Aries at full speed, each pushed to the extreme.
//   matched at 9:00, asked you out at 9:01 · first date, said "I love you" at minute six · huge fight, forgot it by lunch
//   · lost a board game, rematch fourteen · vending machine stuck, fought it and won · planned a surprise, told you
//   instantly · bored on a Tuesday, adopted three cats · microwave said 1:00, too long · you said "I'm fine", already at
//   your door with soup
//  37.8  "Red flags? | *Red hearts.*"   41.0  LESSON "Aries loves fast | *and loves for real.*" STATUS: SMITTEN
//  46.9  "Matched at 9:00. | *Engaged by 9:05.*" over the match card: Aries + Libra (card 1's match, paid off).
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, phone, bits, swapLabel, gift, boxy, CAT, CAT_C, RED, CREAM, STEEL, PLUM, NIGHT, clamp, lerp, ease, prog } from './props.js'

const S = 'aries', ACC = '#ff6b5a', ST = { x: -170 }

// a little board-game board with two pawns
function board(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  boxy(x, cx, cy, 300, 300, CREAM, { rot: -0.05, k })
  for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) if ((i + j) % 2) { x.fillStyle = (i * j) % 3 ? '#ffb0b0' : '#ffe27a'; x.fillRect(-150 + i * 50, -150 + j * 50, 50, 50) }
  x.fillStyle = INK; x.fillRect(-82, 28, 34, 54); x.fillStyle = MINT; x.fillRect(-76, 34, 22, 42)
  x.fillStyle = INK; x.fillRect(48, -78, 34, 54); x.fillStyle = ACC; x.fillRect(54, -72, 22, 42)
  x.restore()
  // a die tumbling in
  const r = ease.outCubic(prog(lt, 0.3, 0.9))
  x.save(); x.translate(cx + 120, cy + 160 - Math.sin(Math.PI * r) * 60); x.rotate((1 - r) * 4)
  x.fillStyle = INK; x.fillRect(-40, -40, 80, 80); x.fillStyle = '#ffffff'; x.fillRect(-34, -34, 68, 68)
  x.fillStyle = INK; for (const [a, b] of [[-18, -18], [18, 18], [0, 0]]) x.fillRect(a - 7, b - 7, 14, 14)
  x.restore()
}
// a vending machine with one snack stuck, then shaken loose
function vending(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const shake = lt > 0.7 && lt < 1.4 ? Math.sin(t * 60) * 0.05 : 0
  boxy(x, cx, cy, 260, 400, '#4a7fd0', { rot: shake, k })
  x.fillStyle = NIGHT; x.fillRect(-110, -170, 160, 280)
  const SN = ['#ffd23a', PINK, MINT, '#ffb34a']
  for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) {
    const stuck = r === 1 && c === 1
    if (stuck && lt > 1.4) continue
    x.fillStyle = SN[(r + c) % 4]; x.fillRect(-98 + c * 50, -158 + r * 68 + (stuck ? 18 : 0), 36, 44)
  }
  x.fillStyle = STEEL; x.fillRect(66, -150, 30, 120); x.fillStyle = INK; x.fillRect(-110, 130, 160, 46)
  // the snack lands in the tray
  if (lt > 1.4) { const d = ease.outBounce ? ease.outBounce(prog(lt, 1.4, 1.8)) : prog(lt, 1.4, 1.8); x.fillStyle = PINK; x.fillRect(-48, lerp(-72, 136, d), 44, 30) }
  x.restore()
}
// a microwave with a counting-down clock
function microwave(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  boxy(x, cx, cy, 330, 220, '#d8dbe8', { rot: 0.04, k })
  x.fillStyle = NIGHT; x.fillRect(-150, -90, 210, 180)
  x.fillStyle = '#ffe27a'; x.globalAlpha = 0.25 + 0.1 * Math.sin(lt * 8); x.fillRect(-140, -80, 190, 160); x.globalAlpha = 1
  x.fillStyle = INK; x.fillRect(70, -90, 80, 44)
  const sec = Math.max(0, 60 - Math.floor(lt * 4))
  x.fillStyle = lt > 1.5 ? RED : MINT; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(lt > 1.5 ? 'STOP' : sec >= 60 ? '1:00' : `0:${String(sec).padStart(2, '0')}`, 110, -67)
  x.fillStyle = STEEL; for (let i = 0; i < 3; i++) x.fillRect(86, -26 + i * 36, 48, 24)
  x.restore()
}
// a front door that swings open
function door(x, cx, cy, k, open) {
  if (k <= 0.01) return
  boxy(x, cx, cy, 220, 380, '#2a1d4a', { k })
  x.fillStyle = '#ffe7a8'; x.globalAlpha = 0.35 * open; x.fillRect(-110, -190, 220, 380); x.globalAlpha = 1
  const w = 220 * (1 - 0.75 * open)
  x.fillStyle = '#c98f5a'; x.fillRect(-110, -190, w, 380)
  x.fillStyle = '#a8703a'; x.fillRect(-110 + w * 0.15, -160, w * 0.7, 130); x.fillRect(-110 + w * 0.15, 0, w * 0.7, 150)
  x.fillStyle = GOLD; x.fillRect(-110 + w - 30, 0, 14, 14)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Matched at 9:00. | *Asked you out 9:01.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      phone(x, t, 800, 850, 1.3 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: lt > 1.0 ? '9:01' : '✦ MATCHED 9:00', headCol: lt > 1.0 ? ACC : MINT, lines: [['hi!', BONE, pop01(t, P.t0 + 0.6, 0.2, 2), true], ['dinner? tonight?', '#ffb0a0', pop01(t, P.t0 + 1.0, 0.2, 2), true], ['7pm. be there', '#ffb0a0', pop01(t, P.t0 + 1.3, 0.2, 2), true]], size: 24 })
      L(x, 810, 1130, 'PATIENCE: 60 SEC', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'First date. | Said *“I love you.”*', mood: lt => lt > 0.9 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [0.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'i love you!!', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 56, col: '#ffb0a0', tail: 'bl' })
      L(x, 790, 960, 'DATE TIME: 6 MIN', pop01(t, P.t0 + 1.3, 0.3, 2.2), LAV, -0.04, 32)
      hearts(x, t, 560, 820, P.t0 + 0.9, { n: 6, life: 1.8, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Huge fight. | *Forgot it by lunch.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      if (lt < 1.2) bubble(x, 790, 700, 'GRRR!!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 60, col: '#ff8a7a', tail: 'bl' })
      else bubble(x, 790, 700, 'lunch? :)', pop01(t, P.t0 + 1.25, 0.25, 2.2), { size: 56, col: MINT, tail: 'bl' })
      swapLabel(x, 790, 950, lt, 1.0, 'GRUDGE: HUGE', 'GRUDGE: 0 MIN', { size: 34, fromBg: RED, toBg: MINT })
    } },
  { sign: S, cap: 'Lost a board game. | *Rematch fourteen.*', mood: lt => lt > 1.0 ? 'squint' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      board(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      const n = 1 + Math.floor(clamp((lt - 0.6) / 1.4) * 13)
      L(x, 790, 640, `REMATCH #${n}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), ACC, 0.05, 40)
    } },
  { sign: S, cap: 'Snack got stuck. | *Aries won.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [0.8, 1.1, 1.5],
    front(x, t, lt, P) {
      vending(x, t, 800, 840, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      L(x, 800, 1110, 'ARIES 1 · MACHINE 0', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, -0.04, 30)
      sparkles(x, t, 790, 960, P.t0 + 1.5, 6, 140, 0.4)
    } },
  { sign: S, cap: 'Planned a surprise. | *Told you instantly.*', mood: lt => lt > 0.9 ? 'wide' : 'wink', look: [1, 0], star: ST, hops: [0.9],
    front(x, t, lt, P) {
      gift(x, 800, 920, 1.1 * pop01(t, P.t0 + 0.2, 0.35, 2), { col: '#ffb0a0', rib: GOLD })
      bubble(x, 790, 650, 'IT’S A CAKE!!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 50, tail: 'bl' })
      L(x, 800, 1120, 'SECRET KEPT: 2 SEC', pop01(t, P.t0 + 1.5, 0.3, 2.2), LAV, 0.04, 30)
    } },
  { sign: S, cap: 'Bored on a Tuesday. | *Adopted three cats.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, CAT, CAT_C, 700 + i * 110, 960 - (i % 2) * 30, 13 * pop01(t, P.t0 + 0.5 + i * 0.35, 0.3, 2.2))
      L(x, 800, 690, 'TUESDAY: FIXED', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, -0.04, 34)
      hearts(x, t, 800, 880, P.t0 + 1.3, { n: 4, life: 1.5, spread: 200, cell: 6, seed: 7 })
    } },
  { sign: S, cap: 'Microwave says 1:00. | *Way too long.*', mood: lt => lt > 1.5 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      microwave(x, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      bubble(x, 800, 650, 'hurry UP', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 46, col: '#ff8a7a', tail: 'bl' })
      L(x, 800, 1060, 'ATE IT COLD', pop01(t, P.t0 + 1.7, 0.3, 2.2), SKYB, 0.04, 34)
    } },
  { sign: S, cap: 'You said “I’m fine.” | *Aries is at the door.*', mood: lt => lt > 1.1 ? 'heart' : 'wide', look: [1, 0], star: { x: -200 }, hops: [0.5, 0.8],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      door(x, 800, 860, k, ease.outCubic(prog(lt, 0.8, 1.3)))
      if (lt > 1.1) bits(x, 'BOWL', 800, 940, 12 * pop01(t, P.t0 + 1.1, 0.3, 2.2))
      L(x, 800, 650, 'ARRIVED IN 4 MIN', pop01(t, P.t0 + 0.6, 0.3, 2.2), ACC, -0.04, 32)
      bubble(x, 800, 1130, 'soup. now.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, col: MINT, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'r2t0751', key: 'C', accent: ACC, solo: S, ending: 'card',
  title: 'Aries red flags | *we love.*',
  cameos: CAMEOS,
  card: { a: 'aries', b: 'libra', chip: 'IT’S A MATCH' },
  group: { cap: 'Red flags? | *Red hearts.*', mood: 'sparkle' },
  lesson: { text: 'Aries loves fast | *and loves for real.*', chip: 'STATUS: SMITTEN' },
  last: {
    text: 'Matched at 9:00. | *Engaged by 9:05.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
