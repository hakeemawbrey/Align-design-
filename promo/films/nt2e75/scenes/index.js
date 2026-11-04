// nt2e75: IF THE SIGNS WERE WEATHER, "If the Signs Were Winter Weather" (20 s vertical, Star Talk Trends Vol. 2 ep 75,
// promo/films/next30/b14.md; music: dreamy · A). Story 0–15.6, then the shared end card. Format: ../../nt2e71/scenes/weather.js.
// No dates on screen (no solstice or season-change claims).
//   0.0–2.1    hook (frame 0): "If the signs were *winter* weather…"  Sagittarius mid-sprint into the first flakes.
//   2.1–4.85   1 "*Sagittarius:* the first snow."  A front door bursts open and everyone tumbles outside: "SNOW!!"
//   4.85–7.6   2 "*Capricorn:* a crisp, clear night. Every star out."  Capricorn in a scarf, looking up at a sky full of
//              stars: "worth the cold."
//   7.6        card cut.
//   7.6–10.95  3 (the twist) "*Cancer:* frost on the window you draw hearts in."  Frost creeps in; Cancer draws a heart…
//              and someone on the other side draws one back.
//   11.35      the three of them in the snow; Pisces, crying at the snowflakes: "aww."
//   11.95      THE STARS: "Cold out. *Warm* in."
import { makeWeather, skyGrad, snow, nightStars, frostFrame, R, box, bubble, label, shadow, sparkles, hearts, drawBits, HEART, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, INTER, T } from '../../nt2e71/scenes/weather.js'
import { door } from '../../nt2e61/scenes/house.js'

const G = 1240

function snowyDay(x, t) { skyGrad(x, ['#4a5a8e', '#aebee0'], { ground: '#f4f8ff' }); snow(x, t, { n: 70 }) }
function scarf(x, cx, cy, col = '#ff5c7a', t = 0) { box(x, cx - 70, cy - 14, 140, 28, col, { b: 4 }); x.save(); x.translate(cx + 50, cy + 10); x.rotate(0.2 * Math.sin(t * 3)); box(x, -12, 0, 24, 60, col, { b: 4 }); x.restore() }

const tells = [
  { caption: '*Sagittarius:* the first snow.',
    backdrop(x, t) { snowyDay(x, t) },
    draw(x, t, S) {
      const { u, star } = S
      box(x, 640, 640, 440, G - 640, '#7a5a8a', { b: 8 }); R(x, INK, 620, 610, 480, 30)
      door(x, 830, G, { open: ease.outCubic(prog(u, 0.25, 0.5)), col: '#4f7cd8', h: 380, w: 200 })
      const out = ['sagittarius', 'gemini', 'leo']
      out.forEach((id, i) => {
        const p = ease.outCubic(prog(u, 0.4 + i * 0.22, 1.0 + i * 0.22))
        if (p <= 0) return
        const px = lerp(830, [200, 420, 600][i], p), py = 1120 - 160 * Math.sin(Math.PI * p)
        star(id, x, t, { x: px, y: py, s: [210, 170, 170][i], mood: 'happy', look: [-1, -0.6], squash: -0.08 * Math.sin(Math.PI * p), hops: [S.t0 + 1.3 + i * 0.2, S.t0 + 1.9 + i * 0.2] })
      })
      bubble(x, t, 260, 840, S.t0 + 1.2, S.t1, 'SNOW!!', { size: 50, tail: 0 })
    },
    pis: { x: 960, y: 1660, look: [-1, -0.8] },
    cues: [['tick', 0.25, 0.06], ['whoosh', 0.3, 0.4, 0.03], ['pop', 0.6, 880, 0.03, 0], ['pop', 0.82, 987.77, 0.03, -0.2], ['pop', 1.04, 1174.66, 0.03, -0.4], ['pop', 1.2, 1567.98, 0.045, -0.3], ['glitter', 1.2, 1.7]] },
  { caption: '*Capricorn:* a crisp, clear night. *Every star out.*', stickerSize: 46,
    backdrop(x, t) { skyGrad(x, ['#080a24', '#1a2250'], { ground: '#dfe8f8' }); nightStars(x, t, 110) },
    draw(x, t, S) {
      const { u, star } = S
      shadow(x, 540, G + 30, 220)
      star('capricorn', x, t, { x: 540, y: 1060, s: 250, mood: u > 1.0 ? 'sparkle' : 'neutral', look: [0, -1], hops: [S.t0 + 1.0] })
      scarf(x, 540, 1120, '#ffd23f', t)
      for (let i = 0; i < 3; i++) { const ph = (t * 0.8 + i / 3) % 1; x.save(); x.globalAlpha = 0.6 * (1 - ph); R(x, BONE, 520 + i * 14, 990 - ph * 60, 14, 14); x.restore() }
      sparkles(x, t, 540, 500, S.t0 + 0.9, 12, 300, 1, [BONE, GOLD])
      bubble(x, t, 540, 830, S.t0 + 1.3, S.t1, 'worth the cold.', { size: 36, tail: 0 })
    },
    pis: { x: 120, y: 1660, look: [1, -0.8] },
    cues: [['bell', 0.9, 1760, 0.03, 1.4, 0], ['glitter', 0.9, 1.6], ['pop', 1.3, 880, 0.03, 0]] },
  { caption: '*Cancer:* frost on the window you draw hearts in.', stickerSize: 46, stickerTop: 1440,
    backdrop(x, t) { skyGrad(x, ['#1a2250', '#3a4a80'], { ground: '#dfe8f8' }); snow(x, t, { n: 40 }) },
    draw(x, t, S) {
      const { u, star } = S
      // the other side of the glass: a warm room with Taurus
      x.save(); x.beginPath(); x.rect(200, 440, 680, 720); x.clip()
      R(x, '#ffcf8a', 200, 440, 680, 720)
      star('taurus', x, t, { x: 700, y: 900, s: 190, mood: u > 2.0 ? 'heart' : 'happy', look: [-1, 0], hops: [S.t0 + 1.9] })
      x.restore()
      frostFrame(x, t, { melt: 0, x0: 200, y0: 440, w: 680, h: 720 })
      // the hearts drawn in the frost
      const h1 = clamp(prog(u, 0.9, 1.5)), h2 = clamp(prog(u, 1.9, 2.5))
      if (h1 > 0) { x.save(); x.globalAlpha = 0.85; drawBits(x, HEART, { H: '#ffe3b0' }, 400, 700, 16 * h1, { outline: 'rgba(120,170,210,0.8)' }); x.restore() }
      if (h2 > 0) { x.save(); x.globalAlpha = 0.85; drawBits(x, HEART, { H: '#ffe3b0' }, 690, 760, 14 * h2, { outline: 'rgba(120,170,210,0.8)' }); x.restore() }
      star('cancer', x, t, { x: 360, y: 1130, s: 230, mood: u > 2.1 ? 'heart' : 'happy', look: [0.4, -1], hops: [S.t0 + 0.9, S.t0 + 2.1] })
      if (u > 2.1) hearts(x, t, S.t0 + 2.15, 360, 1000, { n: 4 })
    },
    pis: { x: 960, y: 1680 },
    cues: [['riser', 0.2, 0.7, 0.01], ['pluck', 1.2, 1174.66, 0.03, -0.3, 0.3], ['pluck', 2.2, 1567.98, 0.035, 0.3, 0.3], ['glitter', 2.2, 2.6]] },
]

const EP = makeWeather({
  id: 'nt2e75', sign: 'sagittarius', name: 'Sagittarius', date: 'capricorn', deep: '#5e4a9a', accent: '#bfe6ff',
  hookText: 'If the signs were | *winter* weather…',
  hookBg(x, t) { snowyDay(x, t) },
  hook(x, t, S) {
    const px = 540 + 60 * Math.sin(t * 2)
    shadow(x, px, G + 30, 240)
    S.hero(x, t, { x: px, y: 1040, s: 290, mood: 'happy', look: [0, -0.8], squash: -0.06, hops: [0.15, 0.5, 0.85, 1.2, 1.55, 1.9] })
    sparkles(x, t, 540, 900, 0.2, 10, 220, 1, ['#ffffff', '#bfe6ff', GOLD])
  },
  hookCues: [['pop', 0.15, 987.77, 0.02, 0], ['pop', 0.5, 1174.66, 0.02, 0], ['glitter', 0.2, 0.7]],
  tells,
  finaleBg(x, t) { snowyDay(x, t) },
  finale(x, t, S) {
    const { ok, star, hero } = S
    shadow(x, 300, 1070, 180 * ok); shadow(x, 540, 1060, 200 * ok); shadow(x, 780, 1070, 180 * ok)
    star('capricorn', x, t, { x: 300, y: 900, s: 200, pop: ok, mood: 'happy', look: [1, 0], hops: [T.stamp + 0.1, T.last + 1.2] })
    scarf(x, 300, 950, '#ffd23f', t)
    hero(x, t, { x: 540, y: 860, s: 240, pop: ok, mood: 'sparkle', look: [0, 0], hops: [T.stamp + 0.05, T.last + 1.6] })
    star('cancer', x, t, { x: 780, y: 900, s: 200, pop: ok, mood: 'happy', look: [-1, 0], hops: [T.stamp + 0.15, T.last + 2.0] })
    scarf(x, 780, 950, '#ff5c7a', t)
  },
  last: 'Cold out. *Warm* in.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [label, pop01, outK, PINK, INTER]
