// r2a0653: star_advice, ADVICE SOLO, "How to give | *a Pisces space.*" (~45 s vertical, signs3kit social cut,
// music: lofi · C). One sign the whole way (makeFilm solo mode, 9 cards), Pisces in tears (happy and sad) in every card:
//   text once, then let them float (inner tube) · leave snacks outside the blanket fort · sad song on repeat, let it play
//   · quiet isn't mad, it's recharging · staring at the moon, don't interrupt · cancel plans guilt-free · crying at an
//   ad, pass the tissues · painting alone, admire it later · back from the clouds? hug ready
//  37.8  "Soft heart. | *Big ocean.*"
//  41.2  callback: "They floated back. | *With snacks.*"  The inner tube from card one returns, a cookie on board.
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, notes, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, friend, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const S = 'pisces', ACC = '#b7a6ff', ST = { x: -170 }
const SEA = '#3a6fc0'

// an inner tube ring with little water ripples (cx, cy = the ring's centre)
function tube(x, t, cx, cy, k, w = 170) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < 3; i++) { const ph = (t * 0.6 + i / 3) % 1; x.globalAlpha = 0.6 * (1 - ph); x.strokeStyle = SKYB; x.lineWidth = 6; x.beginPath(); x.ellipse(0, 10, w * (1 + ph * 0.6), 30 * (1 + ph * 0.6), 0, 0, Math.PI * 2); x.stroke() }
  x.globalAlpha = 1
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, w + 8, 52, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = PINK; x.beginPath(); x.ellipse(0, 0, w, 44, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#ffffff'; for (let a = 0; a < 4; a++) { x.save(); x.rotate(0); x.fillRect(-w + a * (w / 2) + 10, -40, 34, 80); x.restore() }
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, -4, w * 0.62, 18, 0, 0, Math.PI * 2); x.fill()
  x.restore()
}
// a blanket fort: a draped triangle with a doorway
function fort(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(0, -200); x.lineTo(230, 140); x.lineTo(-230, 140); x.closePath(); x.fill()
  x.fillStyle = LAV; x.beginPath(); x.moveTo(0, -186); x.lineTo(214, 132); x.lineTo(-214, 132); x.closePath(); x.fill()
  x.fillStyle = PINK; for (let i = 0; i < 5; i++) x.fillRect(-150 + i * 70, 40 - (i % 2) * 40, 22, 22)
  x.fillStyle = '#140c30'; x.beginPath(); x.moveTo(0, -40); x.lineTo(80, 132); x.lineTo(-80, 132); x.closePath(); x.fill()
  x.restore()
}
// a little easel with a fish painting
function easel(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = WOOD; x.fillRect(-90, 100, 16, 180); x.fillRect(74, 100, 16, 180)
  x.fillStyle = INK; x.fillRect(-150, -150, 300, 270)
  x.fillStyle = CREAM; x.fillRect(-140, -140, 280, 250)
  x.fillStyle = SKYB; x.fillRect(-140, -10, 280, 120)
  x.fillStyle = '#ffb34a'; x.beginPath(); x.ellipse(-20, 40, 60, 30, 0, 0, Math.PI * 2); x.fill()
  x.beginPath(); x.moveTo(30, 40); x.lineTo(80, 10); x.lineTo(80, 70); x.closePath(); x.fill()
  x.fillStyle = INK; x.fillRect(-56, 30, 10, 10)
  x.fillStyle = GOLD; x.beginPath(); x.arc(80, -80, 34, 0, Math.PI * 2); x.fill()
  x.restore()
}

const T1 = lt => lt > 1.2 ? 2 : 1
const CAMEOS = [
  { sign: S, cap: 'Text once. | *Then let them float.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', tears: 1, star: { x: -170, y: -20 },
    back(x, t, lt, P, F) { tube(x, t, 370, 1010, pop01(t, P.t0 + 0.15, 0.35, 2)) },
    front(x, t, lt, P) {
      phone(x, t, 800, 840, pop01(t, P.t0 + 0.3, 0.3, 2), { head: 'YOU', headCol: LAV, lines: [['here if', MINT, pop01(t, P.t0 + 0.5, 0.25, 2.2), true], ['you need me ♡', MINT, pop01(t, P.t0 + 0.7, 0.25, 2.2), true]] })
      L(x, 800, 1100, 'SENT. THAT’S IT.', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Leave snacks | *outside the fort.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', tears: T1, look: [1, 0], star: { x: -170, y: 40, s: 230 },
    back(x, t, lt, P) { fort(x, 370, 960, pop01(t, P.t0 + 0.1, 0.35, 2)) },
    front(x, t, lt, P) {
      bits(x, 'COOKIE', 760, 1060, 16 * pop01(t, P.t0 + 0.6, 0.3, 2))
      bits(x, 'MUG', 880, 1050, 12 * pop01(t, P.t0 + 0.8, 0.3, 2))
      L(x, 810, 760, 'DELIVERY ♡', pop01(t, P.t0 + 0.9, 0.3, 2.2), PINK, 0.05, 38)
      bubble(x, 810, 900, 'no knocking', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Sad song on repeat? | *Let it play.*', mood: 'sleepy', tears: 2, star: ST,
    front(x, t, lt, P) {
      notes(x, t, 760, 900, { n: 5, cell: 9, col: SKYB, seed: 2 })
      const n = 3 + Math.floor(clamp((lt - 0.3) / 1.6) * 11)
      L(x, 800, 680, `PLAY #${n}`, pop01(t, P.t0 + 0.3, 0.3, 2.2), LAV, 0.05, 44)
      L(x, 800, 1090, 'SAME SONG. IT’S FINE.', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  { sign: S, cap: 'Quiet isn’t mad. | *It’s recharging.*', mood: lt => lt > 1.4 ? 'happy' : 'sleepy', tears: 1, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'BATT', 800, 870, 24 * k)
      const n = Math.floor(clamp((lt - 0.4) / 1.4) * 5)
      if (k > 0.9) for (let i = 0; i < n; i++) { x.fillStyle = MINT; x.fillRect(800 - 120 + 6 + i * 46, 870 - 36, 38, 72) }
      L(x, 800, 690, 'DO NOT DISTURB', pop01(t, P.t0 + 0.6, 0.3, 2.2), LAV, 0.05, 34)
      L(x, 800, 1060, 'BACK SOON ♡', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: S, cap: 'Staring at the moon? | *Don’t interrupt.*', mood: 'sparkle', tears: 1, look: [1, -1], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MOON', 820, 740, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      sparkles(x, t, 820, 740, P.t0 + 0.8, 6, 160, 0.2, [GOLD, BONE, LAV])
      L(x, 800, 1060, 'BUSY: WONDERING', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: S, cap: 'Need a day off? | *Cancel, guilt-free.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', tears: 1, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.25, 0.35, 2), { w: 320, h: 300, head: 'SATURDAY', headBg: RED, lines: [lt > 1.2 ? ['brunch ✗', '#a02a38'] : 'brunch', lt > 1.4 ? ['party ✗', '#a02a38'] : 'party', ['nap ✓', '#2f8a48']], size: 34, progress: clamp((lt - 0.4) / 0.6) })
      L(x, 800, 1100, 'GUILT: NONE ♡', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, -0.04, 32)
    } },
  { sign: S, cap: 'Crying at an ad? | *Pass the tissues.*', mood: 'wide', tears: 3, star: ST,
    front(x, t, lt, P) {
      bits(x, 'TV', 800, 760, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 0.3) hearts(x, t, 800, 760, P.t0 + 0.5, { n: 3, life: 1.6, spread: 80, cell: 6, seed: 8 })
      bits(x, 'TISSUE', 800, 1000, 16 * pop01(t, P.t0 + 1.1, 0.3, 2))
      L(x, 800, 1130, 'IT WAS A DOG', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Painting alone? | *Admire it later.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', tears: 1, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      easel(x, 800, 820, pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 1130, 'MASTERPIECE (FISH)', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  { sign: S, cap: 'Back from the clouds? | *Hug ready.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', tears: 2, look: [1, 0], star: { x: -170, y: -40 }, hops: [1.2],
    back(x, t, lt, P) { bits(x, 'CLOUD', 370, 1000, 22 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 790, 950, 210, pop01(t, P.t0 + 0.5, 0.35, 2), { mood: 'heart', look: [-1, 0], hops: [P.t0 + 1.3] })
      bubble(x, 790, 680, 'welcome back ♡', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'bl' })
      hearts(x, t, 600, 860, P.t0 + 1.3, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'r2a0653', key: 'C', accent: ACC, solo: S, ending: 'callback',
  title: 'How to give | *a Pisces space.*',
  cameos: CAMEOS,
  group: { cap: 'Soft heart. | *Big ocean.*', mood: 'heart' },
  last: {
    text: 'They floated back. | *With snacks.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.2, 0.45, 1.8)
      tube(x, t, 540, 1150, k, 200)
      if (k > 0.01) signChar(x, t, S, 540, 1050, 280 * k, { mood: lt > 1.2 ? 'heart' : 'happy', seed: 9, hops: [t0 + 1.3], tears: 2 })
      bits(x, 'COOKIE', 760, 1080, 14 * pop01(t, t0 + 0.9, 0.3, 2))
      bits(x, 'COOKIE', 330, 1090, 14 * pop01(t, t0 + 1.1, 0.3, 2))
      hearts(x, t, 540, 960, t0 + 1.3, { n: 6, life: 2.0, spread: 400, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
