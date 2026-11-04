// nt2e73: IF THE SIGNS WERE WEATHER, "If the Air Signs Were Weather" (18 s vertical, Star Talk Trends Vol. 2 ep 73,
// promo/films/next30/b14.md; music: dreamy · F#). Story 0–15.6, then the shared short end card. Format: ../../nt2e71/scenes/weather.js.
//   0.0–2.1    hook (frame 0): "If the *air* signs were weather…"  Gemini under a sky split down the middle: sun | cloud.
//   2.1–4.85   1 "*Gemini:* partly sunny, partly cloudy, fully chatty."  The split sky flips sides as Gemini talks:
//              "and another thing—" "oh! also—"
//   4.85–7.6   2 "*Libra:* the perfect breeze."  Wind chimes, a kite at rest, a scarf fluttering just so; Libra: "not too
//              much. not too little."
//   7.6–10.95  3 (the twist) "*Aquarius:* a cloud shaped like a question mark."  A cloud drifts in and curls into "?";
//              everyone below stares up; Aquarius: "great question, right?"
//   11.35      the three air signs together; Pisces: "aww."
//   11.95      THE STARS: "Mostly sunny, *always* talking."
import { makeWeather, skyGrad, sun, cloud, wind, kite, R, box, bubble, label, shadow, sparkles, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, INTER, T } from '../../nt2e71/scenes/weather.js'

const G = 1240

function splitSky(x, t, flip) {
  const L = flip ? ['#8a96b8', '#c8cce0'] : ['#3a9cff', '#bfe6ff'], Rr = flip ? ['#3a9cff', '#bfe6ff'] : ['#8a96b8', '#c8cce0']
  skyGrad(x, L, { ground: '#6ab86a' })
  x.save(); x.beginPath(); x.rect(540, 0, 540, G); x.clip(); skyGrad(x, Rr, { ground: '#6ab86a' }); x.restore()
  R(x, INK, 536, 0, 8, G)
  const sx = flip ? 810 : 270, cx = flip ? 270 : 810
  sun(x, t, sx, 580, 90)
  cloud(x, cx, 580, 0.9)
  if (true) { x.save(); x.beginPath(); x.rect(flip ? 0 : 540, 520, 540, G - 520); x.clip(); x.fillStyle = 'rgba(170,200,255,0.6)'; for (let i = 0; i < 18; i++) { const ph = (t * 1.1 + i * 0.37) % 1; x.fillRect((flip ? 60 : 600) + (i * 53) % 420, 520 + ph * 600, 5, 26) } x.restore() }
}

function chimes(x, t, cx, cy) {
  R(x, INK, cx - 120, cy - 6, 240, 14)
  for (let i = 0; i < 5; i++) { const sw = 0.12 * Math.sin(t * 2 + i * 0.8); x.save(); x.translate(cx - 96 + i * 48, cy + 8); x.rotate(sw); R(x, BONE, -1, 0, 3, 40); box(x, -9, 40, 18, 90 + (i % 3) * 30, ['#ffd23f', '#7fd0ff', '#ff8fb1', '#9fe6b0', '#c9a6ff'][i], { b: 4 }); x.restore() }
}

function qCloud(x, t, k) {
  // a cloud that curls into a question mark (k 0…1)
  const pts = [[0, -150], [60, -170], [115, -130], [120, -70], [80, -20], [30, 10], [10, 60], [10, 100]]
  const blob = [[-110, 0], [-40, -30], [40, -20], [110, 10], [0, 30], [-60, 30], [60, 40], [0, 70]]
  const P = pts.map((p, i) => [lerp(blob[i][0], p[0], k), lerp(blob[i][1], p[1], k)])
  x.save(); x.translate(560 + (1 - k) * 160, 560)
  x.fillStyle = INK; for (const [px, py] of P) { x.beginPath(); x.arc(px, py, 58, 0, Math.PI * 2); x.fill() }
  if (k > 0.5) { x.beginPath(); x.arc(10, 200, 58 * clamp((k - 0.5) * 2), 0, Math.PI * 2); x.fill() }
  x.fillStyle = '#f4f0ff'; for (const [px, py] of P) { x.beginPath(); x.arc(px, py, 50, 0, Math.PI * 2); x.fill() }
  if (k > 0.5) { x.beginPath(); x.arc(10, 200, 50 * clamp((k - 0.5) * 2), 0, Math.PI * 2); x.fill() }
  x.restore()
}

const tells = [
  { caption: '*Gemini:* partly sunny, partly cloudy, fully chatty.', stickerSize: 46,
    backdrop(x, t, S) { splitSky(x, t, S.u > 1.35) },
    draw(x, t, S) {
      const { u, star } = S
      shadow(x, 540, G + 30, 220)
      star('gemini', x, t, { x: 540, y: 1040, s: 250, mood: 'happy', look: [u > 1.35 ? 1 : -1, -0.3], hops: [0.3, 0.6, 0.9, 1.2, 1.5, 1.8, 2.1, 2.4].map(v => S.t0 + v) })
      bubble(x, t, 300, 780, S.t0 + 0.35, S.t0 + 1.4, 'and another thing—', { size: 32, tail: 0.5 })
      bubble(x, t, 780, 780, S.t0 + 1.45, S.t1, 'oh! also—', { size: 36, tail: -0.5 })
    },
    pis: { x: 960, y: 1660 },
    cues: [['pop', 0.35, 880, 0.03, -0.3], ['whoosh', 1.35, 0.3, 0.03], ['pop', 1.45, 987.77, 0.03, 0.3]] },
  { caption: '*Libra:* the perfect breeze.',
    backdrop(x, t) { skyGrad(x, ['#7ab8ff', '#f0d8f0'], { ground: '#7ac87a' }); cloud(x, 250 + 20 * Math.sin(t * 0.5), 420, 0.6) },
    draw(x, t, S) {
      const { u, star } = S
      wind(x, t, { n: 4, speed: 0.4, col: 'rgba(255,255,255,0.5)' })
      chimes(x, t, 820, 560)
      kite(x, t, 260, 640, { col: '#c9a6ff', rot: -0.2 })
      shadow(x, 540, G + 30, 220)
      star('libra', x, t, { x: 540, y: 1040, s: 250, mood: 'sparkle', look: [0, 0], hops: [S.t0 + 0.4, S.t0 + 1.6] })
      // a scarf fluttering just so
      x.save(); x.translate(640, 1050); for (let i = 0; i < 4; i++) { const w = 8 * Math.sin(t * 4 - i * 0.7); box(x, i * 36, -10 + w, 34, 24, i % 2 ? '#ff8fb1' : '#ffd23f', { b: 3 }) } x.restore()
      bubble(x, t, 540, 790, S.t0 + 0.7, S.t1, 'not too much. not too little.', { size: 32, tail: 0 })
    },
    pis: { x: 120, y: 1660, look: [1, -0.6] },
    cues: [['bell', 0.3, 1567.98, 0.02, 1.2, 0.4], ['bell', 0.9, 1975.53, 0.018, 1.2, 0.4], ['bell', 1.5, 1760, 0.02, 1.2, 0.4], ['pop', 0.7, 880, 0.03, 0]] },
  { caption: '*Aquarius:* a cloud shaped like a *question mark.*', stickerSize: 46,
    backdrop(x, t) { skyGrad(x, ['#3a9cff', '#bfe6ff'], { ground: '#6ab86a' }) },
    draw(x, t, S) {
      const { u, star } = S
      const k = ease.inOutCubic(prog(u, 0.3, 1.5))
      qCloud(x, t, k)
      ;[['gemini', 220], ['libra', 860]].forEach(([id, px], i) => { shadow(x, px, G + 30, 150); star(id, x, t, { x: px, y: 1110, s: 150, mood: k > 0.8 ? 'wide' : 'neutral', look: [i ? -0.6 : 0.6, -1], hops: [S.t0 + 1.5 + i * 0.1] }) })
      shadow(x, 540, G + 30, 200)
      star('aquarius', x, t, { x: 540, y: 1060, s: 220, mood: u > 1.9 ? 'wink' : 'happy', look: [0, -0.6], hops: [S.t0 + 1.9, S.t0 + 2.3] })
      bubble(x, t, 540, 840, S.t0 + 1.9, S.t1, 'great question, right?', { size: 32, tail: 0 })
    },
    pis: { x: 960, y: 1660 },
    cues: [['whoosh', 0.3, 1.2, 0.02], ['riser', 0.3, 1.2, 0.012], ['pop', 1.5, 1318.51, 0.04, 0], ['glitter', 1.5, 1.9], ['pop', 1.9, 880, 0.03, 0]] },
]

const EP = makeWeather({
  id: 'nt2e73', sign: 'gemini', name: 'Gemini', date: 'libra', deep: '#2f7fb0', accent: '#ffe27a',
  hookText: 'If the *air* signs | were weather…',
  hookBg(x, t) { splitSky(x, t, false) },
  hook(x, t, S) {
    shadow(x, 540, G + 30, 240)
    S.hero(x, t, { x: 540, y: 1020, s: 290, mood: 'happy', look: [Math.sin(t * 3) > 0 ? 1 : -1, -0.3], hops: [0.15, 0.5, 0.85, 1.2, 1.55, 1.9] })
  },
  hookCues: [['pop', 0.15, 880, 0.02, -0.3], ['pop', 0.5, 987.77, 0.02, 0.3], ['pop', 0.85, 880, 0.02, -0.3]],
  tells,
  finaleBg(x, t) { skyGrad(x, ['#5ab0ff', '#e0f0ff'], { ground: '#6ab86a' }); sun(x, t, 860, 440, 90, { rays: 0.6 }); cloud(x, 220, 420, 0.6) },
  finale(x, t, S) {
    const { ok, star, hero } = S
    shadow(x, 300, 1070, 180 * ok); shadow(x, 540, 1060, 200 * ok); shadow(x, 780, 1070, 180 * ok)
    star('libra', x, t, { x: 300, y: 900, s: 200, pop: ok, mood: 'happy', look: [1, 0], hops: [T.stamp + 0.1, T.last + 1.2] })
    hero(x, t, { x: 540, y: 860, s: 240, pop: ok, mood: 'sparkle', look: [0, 0], hops: [T.stamp + 0.05, T.last + 0.4, T.last + 0.8, T.last + 1.6] })
    star('aquarius', x, t, { x: 780, y: 900, s: 200, pop: ok, mood: 'happy', look: [-1, 0], hops: [T.stamp + 0.15, T.last + 2.0] })
  },
  last: 'Mostly sunny, *always* talking.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [label, sparkles, pop01, outK, GOLD, PINK, INTER]
