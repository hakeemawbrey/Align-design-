// ngwe04 · Your Star Guide: Winter · ♋ Cancer · note 1 / 4 (how you love in winter) · 22 s (story 0–17.6, then the end card)
//   0.00–2.85  "*Cancer,* your love | comes in a *mug.*"  The ♋ guide, big, lantern lit, snow falling.
//   2.9–7.4    Cancer hurries in with a tray of three cocoas and hands them out: one to the lavender star, one to a mint
//              star, one all the way to Pisces (who sobs harder). YOUR STAR: "cocoa, extra blanket, socks you knitted."
//   7.45–11.1  The tray is empty; Cancer shivers (brr). YOUR STAR: "this time, let them bring you the mug."  The lavender
//              star walks over with a fourth mug, for Cancer.
//   11.15      card flip · "Let someone | warm *you* back."  Cancer holds the mug; the steam curls into a heart.
import { guideFilm } from '../../ngwe01/gwkit.js'

const F = guideFilm({
  id: 'ngwe04', sign: 'cancer', note: 1, len: 22,
  hook: '*Cancer,* your love | comes in a *mug.*',
  lines: ['cocoa, extra blanket, *socks* you knitted.', 'this time, let *them* bring you the mug.'],
  chip: 'CANCER: CARDINAL WATER,|RULED BY THE MOON',
  last: 'Let someone | warm *you* back.',
  gag: (T, K) => {
    const B = { enter: [3.0, 3.9], give: [4.5, 5.4, 6.3], brr: 8.0, fetch: 8.4, walk: [8.7, 9.6], hand: [9.75, 10.2], heart: T.h2Land + 0.3 }
    const CX = 300, MINT = '#9fe6b0'
    const RECV = [{ x: 590, y: K.ACT_Y }, { x: 790, y: K.ACT_Y }, { x: 968, y: K.ACT_Y + 4 }]
    const canX = t => K.lerp(-120, CX, K.ease.outCubic(K.prog(t, ...B.enter))) + (t < B.enter[1] ? Math.sin(t * 30) * 4 : 0)
    const themX = t => K.lerp(RECV[0].x, CX + 175, K.ease.inOutCubic(K.prog(t, ...B.walk)))
    return {
      draw(x, t) {
        const a = K.appear(t, T.scene + 0.05)
        if (a <= 0.01) return
        const cx = canX(t), got = t > B.hand[1], cold = t > B.brr && !got
        const tx = themX(t)
        K.mini(x, t, { x: RECV[1].x, size: 140, color: MINT, mood: t > B.give[1] + 0.3 ? 'happy' : 'neutral', look: [-1, 0], seed: 11, pop: K.appear(t, T.scene + 0.35) })
        K.mini(x, t, { x: tx, size: 150, color: K.THEM, mood: t > B.give[0] + 0.3 && t < B.fetch ? 'happy' : t < B.walk[1] ? 'neutral' : 'happy', look: [-1, 0], seed: 9, pop: K.appear(t, T.scene + 0.25), hops: [B.fetch, B.hand[0]] })
        K.mini(x, t, { x: cx + (cold ? Math.sin(t * 46) * 3 : 0), size: 160, color: K.ME.color, glyph: K.ME.glyph, mood: got ? (t > B.heart ? 'heart' : 'sparkle') : cold ? 'squint' : 'happy', look: [1, 0], seed: 4, pop: a, hops: B.give, tears: got && t > B.heart ? 1 : 0 })
        // the tray + the three mugs waiting on it
        const trayA = 1 - K.prog(t, B.give[2] + 0.6, B.give[2] + 1.0)
        if (trayA > 0.01) {
          x.save(); x.globalAlpha *= trayA; x.fillStyle = K.INK; x.fillRect(cx + 40, K.ACT_Y - 14, 160, 18); x.fillStyle = '#c08552'; x.fillRect(cx + 44, K.ACT_Y - 10, 152, 10); x.restore()
        }
        B.give.forEach((g, i) => {
          const R = RECV[i], p = K.ease.inOutCubic(K.prog(t, g, g + 0.55))
          const sx = cx + 70 + i * 46, sy = K.ACT_Y - 36
          const ex = R.x - 58, ey = R.y + 8
          const mx = K.lerp(sx, ex, p), my = K.lerp(sy, ey, p) - Math.sin(Math.PI * p) * 120
          const pa = Math.min(a, K.popOut(t, T.out))
          K.drawBits(x, K.BM.MUG, K.COL, mx, my, 5.2 * pa, { flipX: i > 0 })
          K.steam(x, t, mx - 2, my - 22, pa * 0.6)
        })
        // the fourth mug, brought to Cancer
        if (t > B.fetch) {
          const pm = K.pop01(t, B.fetch, 0.35, 2.6) * K.popOut(t, T.out)
          const hp = K.ease.inOutCubic(K.prog(t, ...B.hand))
          const mx = K.lerp(tx - 58, cx + 58, hp), my = K.ACT_Y + 8 - Math.sin(Math.PI * hp) * 40
          K.drawBits(x, K.BM.MUG, { ...K.COL, M: "#ff8fb1" }, mx, my, 6 * pm)
          K.steam(x, t, mx - 2, my - 26, pm, got ? K.ease.outCubic(K.prog(t, B.heart, B.heart + 0.6)) : 0)
          K.sparkles(x, t, mx, my, B.hand[1], 8, 70, 3)
        }
        K.label(x, 'brr…', cx - 60, K.ACT_Y - 130, 36, K.ICE, K.prog(t, B.brr, B.brr + 0.15) * (1 - K.prog(t, B.walk[1], B.walk[1] + 0.3)), -0.12)
        K.label(x, 'for you', tx + 10, K.ACT_Y - 140, 34, '#ff8fb1', K.prog(t, B.fetch + 0.2, B.fetch + 0.35) * (1 - K.prog(t, B.hand[1], B.hand[1] + 0.3)))
      },
      cues: [
        ['whoosh', B.enter[0], 0.4, 0.035], ['tick', B.enter[0] + 0.3, 0.025], ['tick', B.enter[0] + 0.6, 0.025],
        ...B.give.flatMap((g, i) => [['whoosh', g, 0.3, 0.025], ['pop', g + 0.55, [880, 987.77, 1174.66][i], 0.035, -0.2 + i * 0.3]]),
        ['pluck', B.brr, 440, 0.03, 0.4, -0.3], ['pop', B.fetch, 1318.51, 0.035, 0.1], ['tick', B.walk[0] + 0.2, 0.02], ['tick', B.walk[0] + 0.5, 0.02],
        ['pop', B.hand[1], 1567.98, 0.04, -0.2], ['glitter', B.hand[1], B.hand[1] + 0.4], ['pop', B.heart, 1318.51, 0.035, -0.2],
      ],
    }
  },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, LINES_EXPORT = F.LINES_EXPORT
