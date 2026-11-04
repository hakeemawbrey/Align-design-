// ngwe12 · Your Star Guide: Winter · ♓ Pisces · note 1 / 4 (how you love in winter) · 22 s (story 0–17.6, then the end card)
//   0.00–2.85  "*Pisces,* you love | like *first snow.*"  The ♓ guide, big, lantern lit, snow falling.
//   2.9–7.4    One big snowflake drifts down and lands on Pisces' tip. Pisces stares… and fountains happy tears
//              ("it's so PRETTY"). YOUR STAR: "first snowflake and you're in tears. again."
//   7.45–11.1  YOUR STAR: "that soft heart is the gift. bring it."  The lavender star hops over with a tissue (honk).
//              Then both look up: flakes land on both of them, and now the lavender star is crying too.
//   11.15      card flip · "Feel it all. | *Out loud.*"  Two stars in the snow, both happily sobbing.
import { guideFilm } from '../../ngwe01/gwkit.js'

const F = guideFilm({
  id: 'ngwe12', sign: 'pisces', note: 1, len: 22, pisces: false,
  hook: '*Pisces,* you love | like *first snow.*',
  lines: ["first snowflake and you're *in tears*. again.", 'that soft heart is *the gift*. bring it.'],
  chip: 'PISCES: MUTABLE WATER, RULED BY|JUPITER (MODERN: NEPTUNE)',
  last: 'Feel it all. | *Out* *loud.*', late: 2,
  gag: (T, K) => {
    const B = { fall: [3.2, 4.7], stare: 4.7, sob: 5.3, pretty: 5.6, hop: [8.1, 8.6], tissue: 8.75, take: 9.3, honk: 9.6, up: 10.1, flakes: [10.3, 10.6, 10.9], themCry: 11.0 }
    const PX = 400, TX0 = 760, TX1 = 590
    const themX = t => K.lerp(TX0, TX1, K.ease.inOutCubic(K.prog(t, ...B.hop)))
    const flake = t => { const p = K.prog(t, ...B.fall); return { x: PX + 40 * Math.sin(p * 7) * (1 - p), y: K.lerp(880, K.ACT_Y - 92, K.ease.inOutCubic(p)), rot: p * 3 } }
    return {
      draw(x, t) {
        const a = K.appear(t, T.scene + 0.05)
        if (a <= 0.01) return
        const tears = t < B.sob ? (t > B.stare + 0.3 ? 1 : 0) : t < B.take ? 3 : t < B.up ? 1 : t < B.flakes[0] + 0.3 ? 2 : 3
        K.mini(x, t, { x: PX, size: 170, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.up ? 'happy' : t > B.stare ? 'sparkle' : 'neutral', look: t < B.stare ? [0, -1] : t < B.hop[0] ? [0, -1] : t < B.up ? [1, 0] : [0, -1], seed: 4, pop: a, hops: [B.sob, B.take, B.honk, B.flakes[0]], tears })
        const tx = themX(t)
        K.mini(x, t, { x: tx, size: 150, color: '#9fe6b0', mood: t > B.themCry ? 'happy' : t > B.hop[0] ? 'sparkle' : t > B.sob ? 'wide' : 'neutral', look: t < B.up ? [-1, 0] : [0, -1], seed: 9, pop: K.appear(t, T.scene + 0.3), hops: [B.hop[0], B.tissue, B.themCry], tears: t > B.themCry ? 3 : t > B.flakes[1] ? 1 : 0 })
        // the big snowflake
        if (t > B.fall[0]) {
          const f = flake(t), fa = (t < B.take ? 1 : 1 - K.prog(t, B.take, B.take + 0.4)) * K.pop01(t, B.fall[0], 0.3, 2)
          if (fa > 0.01) { K.drawBits(x, K.BM.SNOWFLAKE, { S: '#ffffff' }, f.x, f.y, 12, { rot: f.rot, alpha: fa }); if (t > B.fall[1]) K.sparkles(x, t, f.x, f.y, B.fall[1], 8, 70, 1, ['#ffffff', K.ICE, K.GOLD]) }
        }
        // the tissue
        if (t > B.tissue && t < B.honk + 0.6) {
          const p = K.pop01(t, B.tissue, 0.3, 2.4), hp = K.ease.inOutCubic(K.prog(t, B.tissue + 0.1, B.take))
          const sx = K.lerp(tx - 70, PX + 60, hp), sy = K.ACT_Y - 10 - Math.sin(Math.PI * hp) * 40
          const fade = 1 - K.prog(t, B.honk + 0.3, B.honk + 0.6)
          x.save(); x.globalAlpha *= fade; x.translate(sx, sy); x.rotate(0.15); x.scale(p, p); x.fillStyle = K.INK; x.fillRect(-30, -30, 60, 60); x.fillStyle = '#ffffff'; x.fillRect(-26, -26, 52, 52); x.fillStyle = '#dfe7ff'; x.fillRect(-26, 6, 52, 6); x.restore()
        }
        // flakes landing on both
        B.flakes.forEach((f, i) => { const p = K.prog(t, f - 0.6, f); if (p <= 0) return; const fx = [PX - 30, tx + 20, PX + 40][i], fy = K.lerp(950, K.ACT_Y - 90, p); K.drawBits(x, K.BM.SNOWFLAKE, { S: '#ffffff' }, fx, fy, 6, { rot: p * 2, alpha: K.popOut(t, T.out) }) })
        K.label(x, "it's so PRETTY", PX + 40, K.ACT_Y - 175, 42, K.ME.color, K.prog(t, B.pretty, B.pretty + 0.15) * (1 - K.prog(t, B.hop[0] - 0.3, B.hop[0])), -0.05)
        K.label(x, 'honk', PX + 110, K.ACT_Y - 120, 38, K.BONE, K.prog(t, B.honk, B.honk + 0.1) * (1 - K.prog(t, B.honk + 0.6, B.honk + 0.8)), 0.15)
        K.label(x, 'oh no. me too', tx + 30, K.ACT_Y - 170, 36, '#9fe6b0', K.prog(t, B.themCry, B.themCry + 0.15) * (1 - K.prog(t, B.themCry + 1.8, B.themCry + 2.1)), 0.05)
      },
      cues: [
        ['glitter', B.fall[0], B.fall[0] + 0.6], ['pluck', B.fall[1], 1975.53, 0.03, 0.8, -0.2], ['pop', B.stare, 1318.51, 0.03, -0.2],
        ['pluck', B.sob, 659.25, 0.03, 0.6, -0.2], ['pluck', B.sob + 0.2, 587.33, 0.03, 0.6, -0.2], ['pop', B.pretty, 1567.98, 0.03, -0.2],
        ['pop', B.hop[0], 880, 0.03, 0.3], ['pop', B.tissue, 1174.66, 0.035, 0.2], ['whoosh', B.take - 0.3, 0.3, 0.025], ['pluck', B.honk, 196, 0.05, 0.25, -0.2],
        ...B.flakes.map((f, i) => ['pluck', f, [1567.98, 1760, 1975.53][i], 0.025, 0.6, 0]), ['pluck', B.themCry, 783.99, 0.03, 0.6, 0.3],
      ],
    }
  },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, LINES_EXPORT = F.LINES_EXPORT
