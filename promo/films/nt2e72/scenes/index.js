// nt2e72: IF THE SIGNS WERE WEATHER, "If the Earth Signs Were Weather" (20 s vertical, Star Talk Trends Vol. 2 ep 72,
// promo/films/next30/b14.md; music: dreamy · E). Story 0–15.6, then the shared end card. Format: ../../nt2e71/scenes/weather.js.
//   0.0–2.1    hook (frame 0): "If the *earth* signs were weather…"  Taurus wrapped in a blanket by a rainy window.
//   2.1–4.85   1 "*Taurus:* a slow, cozy drizzle."  Soft rain on the glass, a mug steaming; Taurus sinks deeper: "perfect."
//   4.85–7.6   2 "*Virgo:* clear skies, as planned."  A spotless blue sky; Virgo ticks the forecast… and still holds an
//              umbrella over Libra: "just in case."
//   7.6        card cut.
//   7.6–10.95  3 (the twist) "*Capricorn:* frost that melts by noon."  A frosted window; Capricorn behind it, stiff:
//              "…hello." The sun climbs, the frost melts, and Capricorn beams: "HI!!"
//   11.35      the three earth signs together under a soft sky; Pisces: "aww."
//   11.95      THE STARS: "Slow weather, *steady* love."
import { makeWeather, rainyWindow, blanket, skyGrad, sun, cloud, rain, frostFrame, umbrella, R, box, bubble, label, shadow, sparkles, hearts, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, INTER, T } from '../../nt2e71/scenes/weather.js'
import { mug, couch } from '../../nt2e61/scenes/house.js'

const G = 1240

const tells = [
  { caption: '*Taurus:* a slow, cozy drizzle.',
    backdrop(x, t) { rainyWindow(x, t) },
    draw(x, t, S) {
      const { u, star } = S
      const sink = ease.inOutCubic(prog(u, 1.0, 1.6))
      star('taurus', x, t, { x: 540, y: 1000 + 30 * sink, s: 240, mood: u > 1.0 ? 'sleepy' : 'happy', look: [0, 0], zzz: false, hops: [S.t0 + 0.4] })
      blanket(x, t, 540, 1180, 1.1)
      mug(x, 800, 1180, { col: '#9fe6b0', s: 1, steam: 1, t })
      bubble(x, t, 540, 760, S.t0 + 1.4, S.t1, 'perfect.', { size: 40, tail: 0 })
    },
    pis: { x: 960, y: 1660, look: [-1, -0.8] },
    cues: [['pluck', 0.4, 987.77, 0.03, 0, 0.3], ['whoosh', 1.0, 0.5, 0.015], ['pop', 1.4, 880, 0.03, 0]] },
  { caption: '*Virgo:* clear skies, as planned.',
    backdrop(x, t) { skyGrad(x, ['#3a9cff', '#bfe6ff'], { ground: '#5aa85a' }); sun(x, t, 860, 560, 100) },
    draw(x, t, S) {
      const { u, star } = S
      // a clipboard forecast with a tick
      x.save(); x.translate(260, 760); x.rotate(-0.06)
      box(x, -130, -160, 260, 320, BONE, { b: 6 }); box(x, -50, -184, 100, 40, '#8a8aa0', { b: 4 })
      x.font = `800 30px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillText('FORECAST', 0, -100); x.fillText('CLEAR', -10, -20)
      const tk = clamp(prog(u, 0.5, 0.75))
      if (tk > 0) { x.strokeStyle = '#2f8a5a'; x.lineWidth = 12; x.beginPath(); x.moveTo(-60, 60); x.lineTo(lerp(-60, -20, Math.min(1, tk * 2)), lerp(60, 100, Math.min(1, tk * 2))); if (tk > 0.5) x.lineTo(lerp(-20, 70, (tk - 0.5) * 2), lerp(100, 20, (tk - 0.5) * 2)); x.stroke() }
      x.restore()
      shadow(x, 560, G + 30, 200); shadow(x, 820, G + 30, 180)
      const up = ease.outCubic(prog(u, 1.1, 1.4))
      star('virgo', x, t, { x: 560, y: 1080, s: 220, mood: u > 0.75 ? 'happy' : 'squint', look: [1, -0.3], hops: [S.t0 + 0.75, S.t0 + 1.1] })
      if (up > 0) umbrella(x, 760, 880 - 40 * (1 - up), { col: '#7fd0ff', s: 0.85 * up, rot: 0.1 })
      star('libra', x, t, { x: 820, y: 1090, s: 180, mood: u > 1.5 ? 'heart' : 'wide', look: [-1, -0.6], hops: [S.t0 + 1.5] })
      bubble(x, t, 560, 1260 - 380, S.t0 + 1.5, S.t1, 'just in case.', { size: 34, tail: -0.1 })
    },
    pis: { x: 120, y: 1660, look: [1, -0.6] },
    cues: [['tick', 0.5, 0.05], ['pop', 0.75, 1318.51, 0.04, -0.3], ['whoosh', 1.1, 0.3, 0.025], ['pop', 1.2, 987.77, 0.035, 0.3], ['pop', 1.5, 880, 0.03, 0]] },
  { caption: '*Capricorn:* frost that melts by noon.',
    backdrop(x, t, S) {
      const m = ease.inOutCubic(prog(S.u, 1.3, 2.4))
      skyGrad(x, [m > 0.5 ? '#5ab8ff' : '#9ab0d0', '#e6f2ff'], { ground: '#eef4ff' })
      sun(x, t, 960, lerp(1100, 330, m), 80, { rays: m })
    },
    draw(x, t, S) {
      const { u, star } = S
      const m = ease.inOutCubic(prog(u, 1.3, 2.4))
      star('capricorn', x, t, { x: 540, y: 800, s: 260, mood: m > 0.7 ? 'happy' : 'neutral', look: [0, 0], bob: m > 0.7 ? undefined : 0, hops: [S.t0 + 2.45, S.t0 + 2.75] })
      frostFrame(x, t, { melt: m, x0: 200, y0: 440, w: 680, h: 720 })
      bubble(x, t, 540, 1240, S.t0 + 0.5, S.t0 + 1.9, '…hello.', { size: 34, tail: 0, col: '#e8f6ff' })
      bubble(x, t, 540, 1240, S.t0 + 2.45, S.t1, 'HI!!', { size: 46, tail: 0 })
      if (u > 2.45) sparkles(x, t, 540, 780, S.t0 + 2.45, 10, 220, 3, [GOLD, BONE, '#7fd0ff'])
    },
    stickerTop: 1440,
    pis: { x: 960, y: 1680 },
    cues: [['pop', 0.5, 659.25, 0.03, 0], ['riser', 1.3, 1.1, 0.012], ['glitter', 1.6, 2.4], ['pop', 2.45, 1318.51, 0.045, 0], ['pluck', 2.5, 1567.98, 0.035, 0, 0.3]] },
]

const EP = makeWeather({
  id: 'nt2e72', sign: 'taurus', name: 'Taurus', date: 'virgo', deep: '#2f8a5a', accent: '#9fe6b0',
  hookText: 'If the *earth* signs | were weather…',
  hookBg(x, t) { rainyWindow(x, t) },
  hook(x, t, S) {
    S.hero(x, t, { x: 540, y: 990, s: 270, mood: 'happy', look: [0, 0], hops: [0.3, 1.2] })
    blanket(x, t, 540, 1190, 1.2)
    mug(x, 820, 1190, { col: '#9fe6b0', s: 1.1, steam: 1, t })
  },
  hookCues: [['pluck', 0.3, 987.77, 0.03, 0, 0.3]],
  tells,
  finaleBg(x, t) { skyGrad(x, ['#6ab0e8', '#f0e0c8'], { ground: '#5aa85a' }); cloud(x, 220, 420, 0.7); sun(x, t, 860, 440, 90, { rays: 0.5 }) },
  finale(x, t, S) {
    const { ok, star, hero } = S
    shadow(x, 300, 1070, 180 * ok); shadow(x, 540, 1060, 200 * ok); shadow(x, 780, 1070, 180 * ok)
    star('virgo', x, t, { x: 300, y: 900, s: 200, pop: ok, mood: 'happy', look: [1, 0], hops: [T.stamp + 0.1, T.last + 1.2] })
    hero(x, t, { x: 540, y: 860, s: 240, pop: ok, mood: 'sparkle', look: [0, 0], hops: [T.stamp + 0.05, T.last + 1.6] })
    star('capricorn', x, t, { x: 780, y: 900, s: 200, pop: ok, mood: 'happy', look: [-1, 0], hops: [T.stamp + 0.15, T.last + 2.0] })
  },
  last: 'Slow weather, *steady* love.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [label, hearts, couch, pop01, outK, PINK]
