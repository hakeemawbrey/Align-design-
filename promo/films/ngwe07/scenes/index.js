// ngwe07 · Your Star Guide: Winter · ♎ Libra · note 1 / 4 (how you love in winter) · 20 s (story 0–17.6, then the short end card)
//   0.00–2.85  "*Libra,* you love | in *matching* mittens."  The ♎ guide, big, lantern lit, snow falling.
//   2.9–7.4    Libra and the lavender star in matching pink mittens ("matching!") at a snowy signpost: PARK ← / → LAKE.
//              Libra sways left, right, left (hmm…). YOUR STAR: "you'd plan the prettiest winter walk."
//   7.45–11.1  YOUR STAR: "let them pick the path this time."  Libra turns: "you pick?" The lavender star points: PARK
//              lights up. Libra beams; they set off together, footprints in the snow.
//   11.15      "Let them | *choose* the path."  A heart over the pair. Pisces sobs by the lake sign.
import { guideFilm } from '../../ngwe01/gwkit.js'

const F = guideFilm({
  id: 'ngwe07', sign: 'libra', note: 1, len: 22,
  hook: '*Libra,* you love | in *matching* mittens.', hookSize: 98,
  lines: ["you'd plan the *prettiest* winter walk.", 'let *them* pick the path this time.'],
  chip: 'LIBRA: CARDINAL AIR,|RULED BY VENUS',
  last: 'Let them | *choose* the path.', late: 0, lastSize: 108,
  gag: (T, K) => {
    const B = { match: 3.5, sway: [4.4, 7.3], ask: 7.95, point: 8.7, beam: 9.15, walk: [9.7, 11.0], heart: 11.2 }
    const SP = 540, MIT = { ...K.COL, R: '#3ce6cf' }
    const libX = t => t < B.walk[0] ? 400 + (t > B.sway[0] && t < B.sway[1] ? Math.sin((t - B.sway[0]) * 2.6) * 34 : 0) : K.lerp(400, 230, K.ease.inOutCubic(K.prog(t, ...B.walk)))
    const themX = t => K.lerp(700, 380, K.ease.inOutCubic(K.prog(t, ...B.walk)))
    function sign(x, t, a) {
      const lit = K.prog(t, B.point, B.point + 0.2)
      x.save(); x.globalAlpha *= a
      x.fillStyle = K.INK; x.fillRect(SP - 12, 960, 24, K.GROUND - 950); x.fillStyle = '#8a5a33'; x.fillRect(SP - 7, 965, 14, K.GROUND - 960)
      const board = (y, dir, txt, glow) => {
        x.save(); x.translate(SP + dir * 20, y)
        if (glow > 0) { x.shadowColor = '#ffd34d'; x.shadowBlur = 36 * glow }
        x.fillStyle = K.INK; x.beginPath(); x.moveTo(-dir * 10, -32); x.lineTo(dir * 150, -32); x.lineTo(dir * 186, 0); x.lineTo(dir * 150, 32); x.lineTo(-dir * 10, 32); x.closePath(); x.fill()
        x.shadowBlur = 0
        x.fillStyle = glow > 0.5 ? '#ffd34d' : '#c08552'; x.beginPath(); x.moveTo(-dir * 4, -26); x.lineTo(dir * 148, -26); x.lineTo(dir * 178, 0); x.lineTo(dir * 148, 26); x.lineTo(-dir * 4, 26); x.closePath(); x.fill()
        x.fillStyle = '#ffffff'; x.fillRect(-dir * 4, -30, dir * 150, 7)
        x.fillStyle = K.INK; x.font = "800 34px Inter"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, dir * 82, 2)
        x.restore()
      }
      board(1000, -1, 'PARK', lit); board(1078, 1, 'LAKE', 0)
      x.restore()
    }
    return {
      draw(x, t) {
        const a = K.appear(t, T.scene + 0.05)
        if (a <= 0.01) return
        // footprints behind them as they go
        if (t > B.walk[0]) {
          const p = K.prog(t, ...B.walk)
          x.save(); x.fillStyle = 'rgba(120,130,190,0.7)'
          for (let i = 0; i < 12; i++) { const fx = K.lerp(700, 230, i / 11); if (fx < K.lerp(700, 230, p)) continue; x.globalAlpha = K.popOut(t, T.out); x.fillRect(fx - 10, K.GROUND - 2 + (i % 2) * 8, 18, 7) }
          x.restore()
        }
        sign(x, t, Math.min(1, a))
        const lx = libX(t), tx = themX(t), going = t > B.walk[0]
        const lk = t < B.sway[0] ? [1, 0] : t < B.sway[1] ? [Math.sin((t - B.sway[0]) * 2.6) > 0 ? 1 : -1, -0.6] : [1, 0]
        K.mini(x, t, { x: tx, size: 150, color: K.THEM, mood: t > B.beam ? 'happy' : t > B.ask ? 'sparkle' : 'neutral', look: t > B.point && t < B.walk[0] ? [-1, -1] : [-1, 0], seed: 9, pop: K.appear(t, T.scene + 0.25), hops: [B.point, ...(going ? [B.walk[0] + 0.3, B.walk[0] + 0.8] : [])] })
        K.mini(x, t, { x: lx, size: 160, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.heart ? 'heart' : t > B.beam ? 'sparkle' : t > B.sway[0] && t < B.sway[1] ? 'squint' : 'happy', look: lk, seed: 4, pop: a, hops: [B.match, B.beam, ...(going ? [B.walk[0] + 0.15, B.walk[0] + 0.65] : [])] })
        const mp = K.pop01(t, T.scene + 0.4, 0.35, 2.6) * K.popOut(t, T.out)
        for (const [cx, sz] of [[lx, 160], [tx, 150]]) for (const s of [-1, 1]) K.drawBits(x, K.BM.MITTEN, MIT, cx + s * sz * 0.43, K.ACT_Y - 4, 3.6 * mp, { flipX: s > 0 })
        // the pointing mitten
        if (t > B.point && t < B.walk[0]) { const pp = K.pop01(t, B.point, 0.25, 2.6); K.drawBits(x, K.BM.MITTEN, MIT, tx - 90 - 30 * pp, K.ACT_Y - 40 - 20 * pp, 4.2 * pp, { rot: -1.2 }) }
        K.sparkles(x, t, (lx + tx) / 2, K.ACT_Y - 30, B.match, 10, 160, 2, ['#3ce6cf', K.BONE, K.GOLD])
        K.label(x, 'matching!', lx - 20, K.ACT_Y - 140, 40, '#3ce6cf', K.prog(t, B.match, B.match + 0.15) * (1 - K.prog(t, B.match + 1.0, B.match + 1.3)))
        K.label(x, 'hmm…', lx, K.ACT_Y - 150, 38, K.BONE, K.prog(t, B.sway[0] + 0.3, B.sway[0] + 0.45) * (1 - K.prog(t, B.sway[1] - 0.3, B.sway[1])), Math.sin(t * 2.6) * 0.15)
        K.label(x, 'you pick?', lx + 30, K.ACT_Y - 160, 38, K.ME.color, K.prog(t, B.ask, B.ask + 0.15) * (1 - K.prog(t, B.point + 0.4, B.point + 0.7)))
        if (t > B.heart) K.heart(x, (lx + tx) / 2, K.ACT_Y - 160 + Math.sin(t * 2) * 6, 8 * K.pop01(t, B.heart, 0.35, 3) * K.popOut(t, T.out))
      },
      cues: [
        ['pop', T.scene + 0.4, 1174.66, 0.03, 0], ['glitter', B.match, B.match + 0.5], ['pop', B.match, 1318.51, 0.035, 0],
        ['tick', B.sway[0] + 0.6, 0.025], ['tick', B.sway[0] + 1.8, 0.025], ['tick', B.sway[0] + 3.0, 0.025],
        ['pop', B.ask, 880, 0.035, -0.3], ['pop', B.point, 1567.98, 0.04, 0.2], ['pluck', B.point + 0.05, 1174.66, 0.04, 0.5, -0.2], ['glitter', B.beam, B.beam + 0.4],
        ['tick', B.walk[0] + 0.15, 0.03], ['tick', B.walk[0] + 0.45, 0.03], ['tick', B.walk[0] + 0.75, 0.03], ['tick', B.walk[0] + 1.05, 0.03], ['pop', B.heart, 1318.51, 0.035, -0.2],
      ],
    }
  },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, LINES_EXPORT = F.LINES_EXPORT
