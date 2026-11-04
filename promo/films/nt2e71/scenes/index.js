// nt2e71: IF THE SIGNS WERE WEATHER, "If the Fire Signs Were Weather" (20 s vertical, Star Talk Trends Vol. 2 ep 71,
// promo/films/next30/b14.md; music: dreamy · D). Story 0–15.6, then the shared end card. Format: ./weather.js.
//   0.0–2.1    hook (frame 0): "If the *fire* signs were weather…"  Aries bursts through a grey sky, clouds parting.
//   2.1–4.85   1 "*Aries:* a sudden sunny day in winter."  Snow on the ground, the sun pops; three bundled-up stars fling
//              their scarves off at once: "wait, it's WARM?"
//   4.85–7.6   2 "*Leo:* golden hour, all day long."  A low gold sun, long shadows, everyone glowing; Leo takes a bow.
//   7.6        card cut.
//   7.6–10.95  3 (the twist) "*Sagittarius:* a tailwind, taking your kite somewhere new."  Sag *is* the breeze: it
//              whooshes past and the kite (and its flyer) sail off: "where to?" "anywhere!"
//   11.35      the three fire signs together in the sunshine; Pisces, in sunglasses and happy tears: "aww."
//   11.95      THE STARS: "Forecast: *bright* all week."
import { makeWeather, skyGrad, sun, cloud, wind, kite, R, box, bubble, label, shadow, sparkles, hearts, shadesCells, inSprite, starFrame, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, INTER, T } from './weather.js'

const G = 1240

function scarf(x, cx, cy, col, fly, dir = 1) {
  x.save(); x.translate(cx + dir * fly * 160, cy - fly * 420); x.rotate(fly * 5)
  box(x, -60, -12, 120, 24, col, { b: 4 }); R(x, col, 40, -12, 22, 60); R(x, INK, 40, 48, 22, 4)
  x.restore()
}

const tells = [
  { caption: '*Aries:* a sudden sunny day in winter.',
    backdrop(x, t, S) {
      const k = ease.outCubic(prog(S.u, 0.2, 0.7))
      skyGrad(x, [k > 0.5 ? '#4aa8ff' : '#8a90a8', k > 0.5 ? '#bfe6ff' : '#c4c4d0'], { ground: '#eef4ff' })
      sun(x, t, 820, 380, 110 * pop01(t, S.t0 + 0.2, 0.4, 2.2), { rays: k })
      cloud(x, lerp(700, 1300, k), 420, 1.1, { alpha: 1 - k * 0.6 }); cloud(x, lerp(300, -300, k), 520, 1, { alpha: 1 - k * 0.6 })
    },
    draw(x, t, S) {
      const { u, star } = S
      const fly = ease.outCubic(prog(u, 1.15, 1.9))
      ;[['gemini', 220, '#ff5c7a'], ['virgo', 540, '#7fd0ff'], ['capricorn', 860, '#ffd23f']].forEach(([id, px, col], i) => {
        shadow(x, px, G + 30, 160)
        star(id, x, t, { x: px, y: 1090, s: 150, mood: u > 1.15 ? 'sparkle' : 'squint', look: [0, -0.8], hops: [S.t0 + 1.15 + i * 0.06, S.t0 + 1.6] })
        scarf(x, px, 1110, col, fly * (1 + i * 0.15), [-1, 0.3, 1][i])
      })
      star('aries', x, t, { x: 540, y: 700, s: 230, mood: 'happy', look: [0, 0.6], hops: [S.t0 + 0.25, S.t0 + 0.9] })
      bubble(x, t, 540, 880, S.t0 + 1.3, S.t1, 'wait, it’s WARM?', { size: 36, tail: 0 })
    },
    pis: { x: 960, y: 1660 },
    cues: [['pop', 0.2, 1174.66, 0.045, 0.3], ['glitter', 0.25, 0.8], ['whoosh', 1.15, 0.4, 0.03], ['pop', 1.3, 880, 0.03, 0]] },
  { caption: '*Leo:* golden hour, all day long.',
    backdrop(x, t) {
      skyGrad(x, ['#ff9a5c', '#ffd27a'], { ground: '#c8903a' })
      sun(x, t, 540, G - 30, 150, { col: '#ffcf4a', rays: 0.6 })
      x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(540, G, 50, 540, G, 900); g.addColorStop(0, 'rgba(255,200,120,0.35)'); g.addColorStop(1, 'rgba(255,200,120,0)'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920); x.restore()
    },
    draw(x, t, S) {
      const { u, star } = S
      // long golden shadows streaming toward the viewer
      for (const px of [200, 880]) { x.save(); x.globalAlpha = 0.35; x.fillStyle = '#5a2a10'; x.beginPath(); x.moveTo(px - 40, G + 40); x.lineTo(px + 40, G + 40); x.lineTo(px + 160, 1900); x.lineTo(px - 160, 1900); x.closePath(); x.fill(); x.restore() }
      star('libra', x, t, { x: 200, y: 1100, s: 160, mood: 'sparkle', look: [1, -0.4], hops: [S.t0 + 0.5] })
      star('cancer', x, t, { x: 880, y: 1100, s: 160, mood: 'sparkle', look: [-1, -0.4], hops: [S.t0 + 0.8] })
      const bow = u > 1.3 && u < 2.2 ? Math.sin(Math.PI * prog(u, 1.3, 2.2)) : 0
      star('leo', x, t, { x: 540, y: 820 + bow * 40, s: 250, mood: u > 1.3 ? 'happy' : 'sparkle', look: [0, bow * 0.8], squash: bow * 0.18, hops: [S.t0 + 0.3, S.t0 + 2.3] })
      bubble(x, t, 220, 900, S.t0 + 0.7, S.t1, 'my angles!!', { size: 32, tail: -0.1 })
      sparkles(x, t, 540, 800, S.t0 + 1.4, 10, 200, 2, [GOLD, BONE])
      if (u > 1.4) label(x, '*bows*', 540, 600, { size: 40, font: INTER, weight: 800, col: BONE, alpha: clamp((u - 1.4) * 4) })
    },
    pis: { x: 960, y: 1660, look: [-1, -0.8] },
    cues: [['pluck', 0.3, 1174.66, 0.03, 0, 0.3], ['pop', 0.7, 987.77, 0.03, -0.3], ['glitter', 1.4, 1.9], ['pluck', 1.4, 1567.98, 0.035, 0, 0.3]] },
  { caption: '*Sagittarius:* a tailwind to somewhere new.',
    backdrop(x, t) { skyGrad(x, ['#5ab8ff', '#cfeeff'], { ground: '#5aa85a' }); cloud(x, 220 + ((t * 40) % 1300) - 200, 360, 0.7); cloud(x, 820 + ((t * 30) % 1300) - 900, 520, 0.6) },
    draw(x, t, S) {
      const { u, star } = S
      wind(x, t, { n: 11 })
      const go = ease.inOutCubic(prog(u, 1.1, 3.3))
      const fx = lerp(330, 880, go), fy = 1080 - 40 * Math.sin(go * Math.PI)
      kite(x, t, lerp(560, 900, go), lerp(560, 420, go), { col: '#ff5c7a', string: [fx + 50, fy - 40] })
      shadow(x, fx, G + 30, 160)
      star('libra', x, t, { x: fx, y: fy, s: 170, mood: go > 0.1 ? 'sparkle' : 'neutral', look: [1, -0.8], hops: [S.t0 + 1.1, S.t0 + 1.6, S.t0 + 2.1] })
      // Sagittarius whooshes through as the breeze
      const sx = lerp(-200, 1300, ease.inOutCubic(prog(u, 0.4, 1.4)))
      if (u > 0.3 && u < 1.5) { for (let i = 0; i < 5; i++) R(x, 'rgba(255,255,255,0.7)', sx - 260 - i * 40, 760 + i * 30 - 60, 200, 10); star('sagittarius', x, t, { x: sx, y: 780, s: 220, mood: 'happy', look: [1, 0], squash: -0.12 }) }
      if (u > 1.5) star('sagittarius', x, t, { x: 220, y: 700, s: 200, mood: 'wink', look: [1, 0], hops: [S.t0 + 1.6] })
      bubble(x, t, 600, 1260 - 350 + 0, S.t0 + 1.7, S.t1, 'where to?', { size: 32, col: '#fff1c8', tail: 0.3 })
      bubble(x, t, 240, 520, S.t0 + 2.2, S.t1, 'anywhere!', { size: 36, tail: -0.2 })
    },
    pis: { x: 960, y: 1660 },
    cues: [['whoosh', 0.4, 1.0, 0.05], ['pop', 1.1, 1318.51, 0.035, 0.3], ['pop', 1.7, 880, 0.03, 0.3], ['pop', 2.2, 1567.98, 0.04, -0.3], ['glitter', 2.2, 2.6]] },
]

const EP = makeWeather({
  id: 'nt2e71', sign: 'aries', name: 'Aries', date: 'leo', deep: '#c0392b', accent: '#ffb340',
  hookText: 'If the *fire* signs | were weather…',
  hookBg(x, t) {
    const k = ease.outCubic(prog(t, -0.3, 1.6))
    skyGrad(x, ['#5a6a90', '#9aa6c0'], { ground: '#eef4ff' })
    sun(x, t, 540, 760, 120 + 20 * k, { rays: k })
    cloud(x, lerp(380, 120, k), 760, 1.3); cloud(x, lerp(700, 960, k), 800, 1.3)
  },
  hook(x, t, S) {
    S.hero(x, t, { x: 540, y: 1000, s: 290, mood: 'happy', look: [0, 0], squash: -0.08, hops: [0.2, 0.8, 1.4] })
    sparkles(x, t, 540, 900, 0.3, 10, 230, 1, [GOLD, '#ffb340', BONE])
  },
  hookCues: [['whoosh', 0.1, 0.5, 0.03], ['pluck', 0.3, 1174.66, 0.03, 0, 0.3]],
  tells,
  finaleBg(x, t) { skyGrad(x, ['#4aa8ff', '#bfe6ff'], { ground: '#5aa85a' }); sun(x, t, 860, 420, 110) },
  finale(x, t, S) {
    const { ok, star, hero } = S
    shadow(x, 300, 1070, 180 * ok); shadow(x, 540, 1060, 200 * ok); shadow(x, 780, 1070, 180 * ok)
    star('leo', x, t, { x: 300, y: 900, s: 200, pop: ok, mood: 'happy', look: [1, 0], hops: [T.stamp + 0.1, T.last + 1.2] })
    hero(x, t, { x: 540, y: 860, s: 240, pop: ok, mood: 'sparkle', look: [0, 0], hops: [T.stamp + 0.05, T.last + 1.6] })
    star('sagittarius', x, t, { x: 780, y: 900, s: 200, pop: ok, mood: 'happy', look: [-1, 0], hops: [T.stamp + 0.15, T.last + 2.0] })
  },
  last: 'Forecast: *bright* all week.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [hearts, shadesCells, inSprite, starFrame, outK, PINK]
