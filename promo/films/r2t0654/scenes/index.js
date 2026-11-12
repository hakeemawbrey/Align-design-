// r2t0654: star_talk, SOLO, "Virgo roommates | *be like.*" (topic: your Virgo roommate; ~45 s vertical, signs3kit
// social cut, music: lofi · D). One sign the whole way, nine cards:
//   labelled the fridge, even the eggs · you left one fork, they wrote a memo · the chore chart has a chore chart
//   · swept at midnight, twice · alphabetised the spices and your snacks · moved your mug two inches (better)
//   · movie night, coasters for everyone · you got a cold: soup with a schedule · said "relax", then cleaned your room
// Ending: group. "Strict? Yes. | *Best roommate ever.*".
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, bits, steam, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const S = 'virgo', ACC = '#7dffb0', ST = { x: -170 }

// a fridge with its door open, every shelf labelled
function fridge(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -220, 300, 460)
  x.fillStyle = INK; x.fillRect(-152, -232, 304, 464)
  x.fillStyle = '#e6eef8'; x.fillRect(-144, -224, 288, 448)
  x.fillStyle = '#cfe2f5'; x.fillRect(-128, -208, 256, 416)
  x.fillStyle = STEEL; for (let i = 1; i < 4; i++) x.fillRect(-128, -208 + i * 104, 256, 8)
  // eggs on the bottom shelf, each with a tiny tag
  for (let i = 0; i < 4; i++) { x.fillStyle = '#fff4e2'; x.beginPath(); x.ellipse(-90 + i * 60, 150, 20, 26, 0, 0, Math.PI * 2); x.fill() }
  const n = Math.floor(clamp((lt - 0.4) / 1.2) * 4)
  const TAG = ['MILK', 'JAM', 'LEFTOVERS', 'EGGS']
  x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  for (let i = 0; i < n; i++) { const w = x.measureText(TAG[i]).width + 20; x.fillStyle = MINT; x.fillRect(-w / 2, -176 + i * 104 + (i === 3 ? 30 : 0), w, 32); x.fillStyle = INK; x.fillText(TAG[i], 0, -160 + i * 104 + (i === 3 ? 30 : 0)) }
  x.restore()
}
// three spice jars with A B C lids
function jars(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const COL = ['#e23d4e', '#ffb34a', '#5fd068', '#c98f2a']
  for (let i = 0; i < 4; i++) {
    const px = -150 + i * 100
    x.fillStyle = INK; x.fillRect(px - 40, -70, 80, 150)
    x.fillStyle = '#d8f4ff'; x.fillRect(px - 34, -40, 68, 114)
    x.fillStyle = COL[i]; x.fillRect(px - 34, 0, 68, 74)
    x.fillStyle = STEEL; x.fillRect(px - 36, -66, 72, 28)
    if (lt > 0.5 + i * 0.25) { x.fillStyle = CREAM; x.fillRect(px - 26, 10, 52, 40); x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('ABCD'[i], px, 32) }
  }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Labelled the fridge. | *Even the eggs.*', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      fridge(x, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      L(x, 800, 1140, 'EGG 7 OF 12', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'You left one fork. | *They wrote a memo.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.25, 0.35, 2), { w: 330, h: 330, head: 'MEMO', headBg: STEEL, headInk: INK, lines: ['RE: the fork', 'page 1 of 4', 'kind regards ♡'], size: 30, align: 'left', progress: clamp((lt - 0.4) / 1.0) })
      bits(x, 'FORK', 380, 1110, 10 * pop01(t, P.t0 + 0.1, 0.3, 2), { rot: 1.2 })
      L(x, 800, 1110, 'CC: THE FRIDGE', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'The chore chart | has *a chore chart.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 360, h: 380, head: 'CHORES', headBg: MINT, headInk: INK, lines: ['dishes: you', 'floors: you', 'chart: me'], size: 30, align: 'left', progress: clamp((lt - 0.3) / 0.7) })
      sheet(x, 880, 960, pop01(t, P.t0 + 1.1, 0.3, 2.2), { w: 170, h: 150, rot: 0.1, head: 'CHART', headBg: PINK, headInk: INK, lines: ['update ✓'], size: 24 })
    } },
  { sign: S, cap: 'Swept at midnight. | *Twice.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [0, 1], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      bits(x, 'MOON', 820, 680, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'BROOM', 560, 980, 16 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.4 * Math.sin(lt * 7) })
      L(x, 800, 900, '12:00 A.M.', pop01(t, P.t0 + 0.5, 0.3, 2.2), LAV, 0.05, 40)
      L(x, 800, 1060, lt > 1.3 ? 'SWEEP 2/2' : 'SWEEP 1/2', pop01(t, P.t0 + 0.9, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: S, cap: 'Alphabetised the spices. | *And your snacks.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      jars(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      bits(x, 'COOKIE', 680, 1080, 10 * pop01(t, P.t0 + 1.4, 0.3, 2))
      L(x, 840, 1080, 'C: COOKIES', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Moved your mug | *two inches.* Better.', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const p = ease.inOutCubic(prog(lt, 0.6, 1.1))
      x.fillStyle = WOOD; x.fillRect(600, 960, 380, 24)
      bits(x, 'MUG', lerp(740, 830, p), 900, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 720, p >= 1 ? 'ALIGNED ✓' : 'OFF BY 2 IN', pop01(t, P.t0 + 0.4, 0.3, 2.2), p >= 1 ? MINT : RED, 0.05, 36)
      L(x, 800, 1080, 'PEACE RESTORED', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Movie night? | *Coasters for everyone.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) { const k = pop01(t, P.t0 + 0.3 + i * 0.18, 0.3, 2); if (k <= 0.01) continue; x.save(); x.translate(700 + (i % 3) * 100, 820 + Math.floor(i / 3) * 140); x.scale(k, k); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 50, 0, 7); x.fill(); x.fillStyle = WOOD; x.beginPath(); x.arc(0, 0, 44, 0, 7); x.fill(); x.fillStyle = '#c98f5a'; x.beginPath(); x.arc(0, 0, 30, 0, 7); x.fill(); x.restore() }
      L(x, 800, 650, 'POPCORN: IN BOWLS', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, 0.05, 28)
      L(x, 800, 1100, 'SPILLS: ZERO', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'You got a cold? | *Soup with a schedule.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'BOWL', 700, 1030, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 700, 970, { n: 3, h: 100 })
      sheet(x, 840, 800, pop01(t, P.t0 + 0.5, 0.35, 2), { w: 250, h: 260, rot: 0.06, head: 'GET WELL', headBg: PINK, headInk: INK, lines: ['8:00 soup', '9:00 tea', '9:05 nap'], size: 28, align: 'left', progress: clamp((lt - 0.7) / 0.8) })
      hearts(x, t, 700, 950, P.t0 + 1.5, { n: 4, life: 1.6, spread: 120, cell: 7, seed: 6 })
    } },
  { sign: S, cap: 'Said “relax.” | Then *cleaned your room.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'relax, I got it', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      bits(x, 'BROOM', 800, 900, 18 * pop01(t, P.t0 + 0.7, 0.3, 2), { rot: -0.3 })
      sparkles(x, t, 800, 900, P.t0 + 1.2, 8, 180, 0.4, [MINT, BONE, GOLD])
      L(x, 800, 1100, 'YOUR ROOM: SPARKLING', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 28)
    } },
]

const F = makeFilm({
  id: 'r2t0654', key: 'D', accent: ACC, solo: S, ending: 'group',
  title: 'Virgo roommates | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Strict? Yes. | *Best roommate ever.*', mood: 'sparkle' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
