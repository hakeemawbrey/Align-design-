// yrsigns: THEN vs NOW, "Asking their sign in 2016 / 2026" (20 s vertical, Star Talk Then vs Now §17, music: funk · F)
// Story 0–15.6, then the shared end card. The format engine is ./yrkit.js (identical in every Block D film).
//   THEN (old-phone footage, 10·21·2016, a house party under a disco ball): ♊ Gemini leans on the wall with finger
//     guns. Rule of three: "what's your sign? ;)" → ♍ "…Virgo."  "knew it."  → ♈ "ARIES!"  "knew it."  → the potted
//     plant: "…"  "knew it."  GEMINI (box): "works every time. (it has never worked.)"  ♓ Pisces sniffles by the wall.
//   6.71 card cut → NOW: a quiet café table under the stars, two mugs; the same ♍ Virgo. Gemini: "wait. what's your
//     *moon*?"  Virgo: "…Cancer moon."  The little moon overhead blushes. Gemini writes it down in a tiny notebook,
//     then (box): "so what helps you feel *at home*?"  Virgo melts; Pisces cries into a napkin.
//   12.27 payoff: the 2016 polaroid (finger guns) drops in. THE STARS: "same question. *deeper* answer."
//   13.38 last line: "*Moon* first."
import { makeThenNow, drawBits, bubble, label, star, pisces, heart, sparkles, R, INK, BONE, GOLD, CREAM, INTER, SERIF,
  signStar, prog, ease, lerp, clamp, r3, BEAT, pop01, outK, easeOutBack } from './yrkit.js'

const GEM = signStar('gemini'), VIR = signStar('virgo'), ARI = signStar('aries')
const ASK = 'what\'s your sign? ;)'
const PLANT = ['..GG.G..', '.GGGGGG.', 'GGLGGLGG', '.GGGGGG.', '..GGGG..', '...GG...', '.PPPPPP.', '.PPPPPP.', '..PPPP..', '..PPPP..']
const MUG = ['.KKKK..', 'WWWWWK.', 'WCCCWKK', 'WWWWW.K', 'WWWWWKK', 'WWWWWK.', '.WWW...']
const STEAM = ['.S.', 'S..', '.S.', '..S']
const MOON = ['...MMMM...', '.MMMM.....', '.MMM......', 'MMMM......', 'MME.......', 'MMM.......', 'MMMM......', '.MMM......', '.MMMM.....', '...MMMM...']
const GUN = ['KKKKK', 'K....', 'KK...']

// THEN beats
const V1 = BEAT(2), V2 = BEAT(5), V3 = BEAT(8)
const GEM0 = { x: 300, y: 980, s: 300 }, VIS = { x: 790, y: 990, s: 270 }, PL = { x: 860, y: 1170 }

function discoBall(x, t, cx, cy) {
  x.strokeStyle = '#1b1236'; x.lineWidth = 4; x.beginPath(); x.moveTo(cx, 0); x.lineTo(cx, cy - 70); x.stroke()
  for (let j = -7; j <= 7; j++) for (let i = -7; i <= 7; i++) {
    if (i * i + j * j > 52) continue
    const v = (Math.sin(t * 4 + i * 1.3 + j * 0.7) + 1) / 2
    R(x, `rgb(${150 + 100 * v | 0},${150 + 90 * v | 0},${180 + 70 * v | 0})`, cx + i * 10 - 4, cy + j * 10 - 4, 9, 9)
  }
  // light specks swirling on the wall
  for (let k = 0; k < 26; k++) {
    const a = t * 0.6 + k * 2.39, rr = 220 + (k * 53) % 420
    const px = cx + Math.cos(a) * rr * 1.2, py = cy + 380 + Math.sin(a) * rr * 0.7
    R(x, ['#ffd36a', '#ff9ec4', '#9fe6ff'][k % 3] + 'aa', px, py, 10, 10)
  }
}

const EP = makeThenNow({
  thing: 'Asking their sign', thenYear: '2016', stamp: '10·21·2016', clock: 'PM 11:58',
  thenBack(x, t) {
    const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#1d2148'); g.addColorStop(0.6, '#33265e'); g.addColorStop(1, '#170f2c')
    x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
    discoBall(x, t, 560, 560)
    R(x, '#120b22', 0, 1240, 1080, 700); R(x, '#4a3a7a', 0, 1236, 1080, 8)
  },
  then(x, t) {
    // ♓ Pisces by the wall, moved by the romance of it all
    pisces(x, t, 150, 1230, 120, { tears: t > V3 ? 3 : 2, mood: 'sparkle', look: [1, -1] })
    // the potted plant (the third "date")
    drawBits(x, PLANT, { G: '#5fbf6a', L: '#9fe6a0', P: '#c9744a' }, PL.x, PL.y, 13)
    // visitors slide in and out on the right
    const vis = [[V1, VIR, '…Virgo.', 'squint'], [V2, ARI, 'ARIES!', 'happy']]
    vis.forEach(([t0, S, ans, md], i) => {
      const inK = ease.outCubic(prog(t, t0, t0 + 0.3)), outV = ease.inCubic(prog(t, t0 + 1.45, t0 + 1.68))
      if (inK <= 0 || outV >= 1) return
      const vx = lerp(1250, VIS.x, inK) + outV * 500
      star(x, vx, VIS.y, VIS.s, t, { color: S.color, glyph: S.glyph, mood: t > t0 + 0.45 ? md : 'neutral', look: [-1, 0], seed: 7 + i, glow: 0.9, hops: i ? [t0 + 0.55] : [] })
      if (t > t0 + 0.5) bubble(x, vx, VIS.y - 210, ans, { k: pop01(t, t0 + 0.5, 0.25, 2.2), size: 36, tail: -1 })
    })
    if (t > V3 + 0.55) bubble(x, PL.x, PL.y - 130, '…', { k: pop01(t, V3 + 0.55, 0.25, 2.2), size: 40, tail: 0 })
    // Gemini, leaning, finger guns; turns to the plant on beat three
    const turn = ease.inOutCubic(prog(t, V3 - 0.1, V3 + 0.3))
    const gx = lerp(GEM0.x, 420, turn), gy = lerp(GEM0.y, 1060, turn)
    const ask = [V1 + 0.12, V2 + 0.12, V3 + 0.15], knew = [V1 + 0.95, V2 + 0.95, V3 + 0.95]
    const F = star(x, gx, gy, GEM0.s, t, { color: GEM.color, glyph: GEM.glyph, mood: 'wink', look: [1, 0], seed: 3, glow: 1, squash: -0.04, hops: [0.4, ...ask] })
    // finger guns
    const recoil = ask.reduce((m, a) => Math.max(m, Math.exp(-Math.max(0, t - a) * 10) * (t > a ? 1 : 0)), 0)
    drawBits(x, GUN, { K: GEM.color }, gx + 150, F.cy - 10 - recoil * 14, 10, { rot: -0.2 - recoil * 0.4 })
    drawBits(x, GUN, { K: GEM.color }, gx - 150, F.cy - 10 - recoil * 14, 10, { rot: 0.2 + recoil * 0.4, sx: -1 })
    let cur = -1
    ask.forEach((a, i) => { if (t > a) cur = i })
    if (cur >= 0) {
      const a = ask[cur], k = knew[cur]
      if (t < k) bubble(x, gx + 40, gy - 230, ASK, { k: pop01(t, a, 0.25, 2.2), size: 38, tail: 1 })
      else if (t < k + 0.62 || cur === 2) bubble(x, gx + 10, gy - 230, 'knew it.', { k: pop01(t, k, 0.25, 2.4), size: 40, tail: 1, col: GOLD })
    }
  },
  snap: { at: 2.45, cx: 545, cy: 900, size: 720 },
  now(x, t, lt, P) {
    const T = EP.T
    const ask = r3(T.cut + 0.55), ans = r3(T.cut + 1.45), write = r3(T.cut + 2.1), melt = r3(T.cut + 4.0)
    const ok = 1
    // the little moon overhead, blushing once asked about
    const mk = pop01(t, T.cut + 0.2, 0.4, 1.8)
    drawBits(x, MOON, { M: '#ffe9a8', E: INK }, 540, 600, 11 * mk, { rot: 0.12 * Math.sin(t * 2) })
    if (t > ans) { R(x, '#ff8fb1', 510, 622, 16, 7); sparkles(x, t, 540, 600, ans, 8, 120, 0.2, ['#ffe9a8', BONE]) }
    // ♓ Pisces at the next table, crying into a napkin
    pisces(x, t, 940, 1290, 120, { tears: t > melt ? 3 : 2, mood: 'happy', pop: pop01(t, T.cut + 0.3, 0.3, 2) })
    // the two of them behind a café table
    const gm = t > melt ? 'happy' : t > ans ? 'sparkle' : 'neutral'
    star(x, 300, 1000, 290, t, { color: GEM.color, glyph: GEM.glyph, mood: gm, look: t < melt ? [1, 0] : undefined, seed: 3, glow: 1, hops: [T.cut + 0.2, ask, melt + 0.1] })
    const vm = t > melt ? 'heart' : t > ask + 0.2 && t < ans ? 'wide' : t > ans ? 'sparkle' : 'happy'
    star(x, 780, 1000, 290, t, { color: VIR.color, glyph: VIR.glyph, mood: vm, look: [-1, 0], seed: 8, glow: 1, hops: [ask + 0.25, melt, melt + 0.4] })
    // table + mugs
    R(x, INK, 150, 1108, 780, 34); R(x, '#8a5e40', 154, 1112, 772, 26); R(x, '#a8774f', 154, 1112, 772, 6)
    R(x, INK, 520, 1140, 40, 230); R(x, '#6b4630', 526, 1140, 28, 230)
    for (const [mx, sx] of [[400, 1], [680, -1]]) {
      drawBits(x, MUG, { K: INK, W: '#f6efe2', C: '#a8774f' }, mx, 1072, 8, { sx })
      for (let i = 0; i < 2; i++) { const ph = (t * 0.6 + i * 0.5) % 1; drawBits(x, STEAM, { S: 'rgba(255,255,255,0.7)' }, mx - 8 + i * 16, 1010 - ph * 60, 5, { alpha: Math.sin(Math.PI * ph), outline: null }) }
    }
    // the tiny notebook
    const nk = pop01(t, write, 0.3, 2) * outK(t, [T.pay - 0.15, T.pay + 0.15])
    if (nk > 0.01) {
      x.save(); x.translate(300, 780); x.rotate(-0.08); x.scale(nk, nk)
      R(x, INK, -126, -74, 252, 148); R(x, CREAM, -120, -68, 240, 136); R(x, '#d8c6a0', -120, -68, 240, 12)
      x.font = `italic 400 34px ${SERIF}`; x.fillStyle = '#3a2a5a'; x.textAlign = 'left'; x.textBaseline = 'middle'
      const n1 = 'moon: Cancer', n2 = 'needs: cozy ♡︎'
      const c1 = Math.floor(clamp((t - write - 0.2) / 0.6) * n1.length), c2 = Math.floor(clamp((t - write - 0.9) / 0.6) * n2.length)
      x.fillText(n1.slice(0, c1), -104, -16); x.fillText(n2.slice(0, c2), -104, 30)
      x.restore()
    }
    // the exchange
    if (t > ask && t < ans + 0.3) bubble(x, 330, 760, 'wait. what\'s your moon?', { k: pop01(t, ask, 0.25, 2.2), size: 36, tail: -1 })
    if (t > ans && t < write + 1.6) bubble(x, 760, 760, '…Cancer moon.', { k: pop01(t, ans, 0.25, 2.2), size: 36, tail: 1 })
    if (t > melt && t < T.pay + 0.5) for (let i = 0; i < 3; i++) { const ph = ((t - melt) * 0.6 + i / 3) % 1; heart(x, 700 + i * 50, 860 - ph * 200, 4, { alpha: Math.sin(Math.PI * ph) }) }
    sparkles(x, t, 780, 1000, melt, 12, 220, 1, [GOLD, VIR.color, BONE])
    void lt; void P; void ok; void label; void INTER; void easeOutBack
  },
  lines: [
    { t: 2.2, speaker: `${GEM.glyph}︎ GEMINI`, color: '#ffe27a', text: 'works every time. *(it has never worked.)*' },
    { t: 9.15, speaker: `${GEM.glyph}︎ GEMINI`, color: '#ffe27a', text: 'so what helps you feel *at home*?' },
  ],
  starsLine: 'same question. *deeper* answer.',
  last: '*Moon* first.', lastAccent: '#ffe9a8',
  cues: T => [
    // finger-gun asks (pew) + the answers
    ...[V1, V2, V3].flatMap((v, i) => [['pop', r3(v + 0.12), 1567.98, 0.035, -0.3], ['pop', r3(v + 0.18), 1975.53, 0.025, -0.3], ['whoosh', v, 0.25, 0.02]]),
    ['pop', r3(V1 + 0.5), 659.25, 0.035, 0.4], ['pop', r3(V2 + 0.5), 1318.51, 0.045, 0.4], ['tom', r3(V2 + 0.55), 120, { gain: 0.15, decay: 0.15 }],
    ['pluck', r3(V3 + 0.6), 2637, 0.012, 0.1, 0.4], ['pluck', r3(V3 + 0.7), 2637, 0.012, 0.1, 0.4],
    ...[V1, V2, V3].map(v => ['pluck', r3(v + 0.95), 783.99, 0.035, 0.4, -0.3]),
    // NOW: the moon question, the blush, the notebook scribble, the melt
    ['pop', r3(T.cut + 0.55), 987.77, 0.035, -0.3], ['pop', r3(T.cut + 1.45), 1318.51, 0.035, 0.3], ['bell', r3(T.cut + 1.5), 2093, 0.025, 1.1, 0],
    ...Array.from({ length: 14 }, (_, i) => ['tick', r3(T.cut + 2.3 + i * 0.085), 0.011]),
    ['bell', r3(T.cut + 4.0), 1760, 0.03, 1.0, 0.3], ['glitter', r3(T.cut + 4.0), r3(T.cut + 4.5)],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const TIMES = EP.T
