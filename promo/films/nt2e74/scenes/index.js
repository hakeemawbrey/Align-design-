// nt2e74: IF THE SIGNS WERE WEATHER, "If the Water Signs Were Weather" (18 s vertical, Star Talk Trends Vol. 2 ep 74,
// promo/films/next30/b14.md; music: dreamy · G). Story 0–15.6, then the shared short end card. Format: ../../nt2e71/scenes/weather.js.
//   0.0–2.1    hook (frame 0): "If the *water* signs were weather…"  Cancer at a night window in the rain, cocoa in hand.
//   2.1–4.85   1 "*Cancer:* the rainy night you stay in."  Rain on the glass, a blanket, two mugs; Cancer: "stay?"
//   4.85–7.6   2 "*Scorpio:* fog. Mysterious… then it lifts."  Only two eyes in the fog; it lifts and there's Scorpio,
//              heart wide open, holding a hand-drawn heart: "okay. all of it."
//   7.6–10.95  3 (the twist) "*Pisces:* a sun shower. Crying and glowing at once."  Sun and rain together; a rainbow;
//              Pisces fountains happy tears and glows.
//   11.35      the three water signs together; a tiny Pisces in the corner, still crying: "aww."
//   11.95      THE STARS: "Feelings in the *forecast*."
import { makeWeather, rainyWindow, blanket, skyGrad, sun, cloud, rain, fog, rainbow, R, box, bubble, label, shadow, sparkles, hearts, drawBits, HEART, tearsCells, inSprite, starFrame, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, INTER, T } from '../../nt2e71/scenes/weather.js'
import { mug } from '../../nt2e61/scenes/house.js'

const G = 1240

const tells = [
  { caption: '*Cancer:* the rainy night you stay in.',
    backdrop(x, t) { rainyWindow(x, t, { night: true }) },
    draw(x, t, S) {
      const { u, star } = S
      star('cancer', x, t, { x: 470, y: 1000, s: 230, mood: u > 1.2 ? 'happy' : 'sparkle', look: [1, 0.2], hops: [S.t0 + 0.4, S.t0 + 1.25] })
      blanket(x, t, 540, 1180, 1.2)
      mug(x, 700, 1150, { col: '#9fd8f6', s: 0.9, steam: 1, t }); mug(x, 810, 1150, { col: '#ff8fb1', s: 0.9, steam: 1, t })
      bubble(x, t, 470, 760, S.t0 + 1.3, S.t1, 'stay?', { size: 44, tail: 0 })
    },
    pis: { x: 960, y: 1660, look: [-1, -0.8] },
    cues: [['pluck', 0.4, 987.77, 0.03, 0, 0.3], ['pop', 1.3, 880, 0.035, 0]] },
  { caption: '*Scorpio:* fog. Mysterious… *then it lifts.*', stickerSize: 46,
    backdrop(x, t) { skyGrad(x, ['#6a6a9a', '#b8b8d0'], { ground: '#4a6a5a' }) },
    draw(x, t, S) {
      const { u, star } = S
      const lift = ease.inOutCubic(prog(u, 1.0, 1.9))
      star('scorpio', x, t, { x: 540, y: 960, s: 260, mood: lift > 0.6 ? 'heart' : 'neutral', look: [0, 0], hops: [S.t0 + 1.9, S.t0 + 2.3] })
      if (lift > 0.5) { const k = pop01(t, S.t0 + 1.8, 0.3, 2.4); x.save(); x.translate(760, 900); x.rotate(0.1); x.scale(k, k); box(x, -70, -60, 140, 120, BONE, { b: 5 }); drawBits(x, HEART, { H: '#ff5c8a' }, 0, 0, 12); x.restore() }
      fog(x, t, lift, { alpha: 0.95 })
      if (lift < 0.3) { x.save(); x.globalAlpha = 1 - lift / 0.3; R(x, INK, 480, 900, 30, 30); R(x, INK, 570, 900, 30, 30); R(x, '#fff', 486, 904, 10, 10); R(x, '#fff', 576, 904, 10, 10); x.restore() }
      bubble(x, t, 540, 700, S.t0 + 2.0, S.t1, 'okay. all of it.', { size: 36, tail: 0 })
    },
    pis: { x: 120, y: 1660, look: [1, -0.6] },
    cues: [['riser', 0.2, 0.8, 0.012], ['whoosh', 1.0, 0.9, 0.03], ['pop', 1.8, 1174.66, 0.04, 0.2], ['pop', 2.0, 880, 0.03, 0]] },
  { caption: '*Pisces:* a sun shower. Crying and *glowing* at once.', stickerSize: 44,
    backdrop(x, t, S) {
      skyGrad(x, ['#5ab0ff', '#d8f0ff'], { ground: '#6ab86a' })
      rainbow(x, 540, 1000, 520, ease.outCubic(prog(S.u, 0.8, 1.8)))
      sun(x, t, 880, 600, 80)
      cloud(x, 220, 600, 0.7)
      rain(x, t, { n: 40, col: 'rgba(120,170,255,0.6)', speed: 1.1, area: [0, 500, 1080, G - 500] })
    },
    draw(x, t, S) {
      const { u, pisces } = S
      x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(540, 980, 30, 540, 980, 360); g.addColorStop(0, `rgba(255,230,180,${0.4 * clamp(u)})`); g.addColorStop(1, 'rgba(255,230,180,0)'); x.fillStyle = g; x.fillRect(100, 600, 880, 760); x.restore()
      pisces(x, t, { x: 540, y: 1000, s: 280, hops: [S.t0 + 0.5, S.t0 + 1.4, S.t0 + 2.2] }, u > 1.2 ? 3 : 2, 'sparkle', [0, -0.3])
      sparkles(x, t, 540, 960, S.t0 + 1.3, 12, 230, 2, [GOLD, BONE, '#8fe3ff'])
      bubble(x, t, 540, 740, S.t0 + 1.6, S.t1, 'I’m just SO happy', { size: 34, tail: 0 })
    },
    pis: { none: true },
    cues: [['glitter', 0.8, 1.8], ['bell', 1.3, 1567.98, 0.03, 1.2, 0], ['pop', 1.6, 880, 0.03, 0]] },
]

const EP = makeWeather({
  id: 'nt2e74', sign: 'cancer', name: 'Cancer', date: 'scorpio', deep: '#2f6fb0', accent: '#8fe3ff',
  hookText: 'If the *water* signs | were weather…',
  hookBg(x, t) { rainyWindow(x, t, { night: true }) },
  hook(x, t, S) {
    S.hero(x, t, { x: 480, y: 990, s: 280, mood: 'sparkle', look: [1, -0.6], hops: [0.3, 1.3] })
    mug(x, 650, 1060, { col: '#9fd8f6', s: 1.2, steam: 1, t })
  },
  hookCues: [['pluck', 0.3, 987.77, 0.03, 0, 0.3]],
  tells,
  finaleBg(x, t) { skyGrad(x, ['#5ab0ff', '#d8f0ff'], { ground: '#6ab86a' }); rainbow(x, 540, 1000, 520, 1); sun(x, t, 900, 560, 70, { rays: 0.6 }) },
  noFinalePisces: true,
  finale(x, t, S) {
    const { ok, star, hero, pisces } = S
    shadow(x, 300, 1070, 180 * ok); shadow(x, 540, 1060, 200 * ok); shadow(x, 780, 1070, 180 * ok)
    hero(x, t, { x: 300, y: 900, s: 200, pop: ok, mood: 'happy', look: [1, 0], hops: [T.stamp + 0.1, T.last + 1.2] })
    star('scorpio', x, t, { x: 540, y: 870, s: 220, pop: ok, mood: 'heart', look: [0, 0], hops: [T.stamp + 0.05, T.last + 1.6] })
    pisces(x, t, { x: 780, y: 900, s: 200, pop: ok, hops: [T.stamp + 0.15, T.last + 2.0] }, 2, 'sparkle', [-1, 0])
  },
  last: 'Feelings in the *forecast*.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [label, hearts, tearsCells, inSprite, starFrame, outK, lerp, PINK, INTER]
