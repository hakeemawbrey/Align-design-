// ngwe09 · Your Star Guide: Winter · ♐ Sagittarius · note 1 / 4 (how you love in winter) · 20 s (story 0–17.6, then the short end card)
//   0.00–2.85  "*Sagittarius,* you | love on the *move.*"  The ♐ guide, big, lantern lit, snow falling.
//   2.9–7.4    Sag bounces in the snow under a huge stuffed backpack ("PACKED: 0:04"). The lavender star is curled in a
//              cozy armchair with a mug. YOUR STAR: "a snow trip? you packed in four seconds."
//   7.45–11.1  YOUR STAR: "ask if they want the trip or the sofa."  Sag looks over, drops the bag (THUNK), flops down by
//              the chair; a map unfolds over them both and a sticky note slaps on: "NEXT WEEKEND".
//   11.15      "The trip can wait | a *weekend.*"  Both cozy, one mug each. Pisces sobs in the snow.
import { guideFilm } from '../../ngwe01/gwkit.js'

const PACK = ['..GGGG..', '.GggggG.', 'GGGGGGGG', 'GgYYYYgG', 'GgYggYgG', 'GGGGGGGG', 'GgggggggG'.slice(0, 8), 'GGGGGGGG', '.B....B.']
const F = guideFilm({
  id: 'ngwe09', sign: 'sagittarius', note: 1, len: 22,
  hook: '*Sagittarius,* you | love on the *move.*', hookSize: 100,
  lines: ['a snow trip? you packed in *four seconds*.', 'ask if they want *the trip* or the sofa.'],
  chip: 'SAGITTARIUS: MUTABLE FIRE,|RULED BY JUPITER',
  last: 'The trip can wait | a *weekend.*', late: 0, lastSize: 104,
  gag: (T, K) => {
    const B = { packed: 3.6, look: 7.95, drop: 8.4, flop: [8.7, 9.3], map: [9.5, 9.95], note: 10.35, mug2: 10.9 }
    const CHX = 760
    const bounces = []; for (let b = 3.3; b < 7.8; b += 0.5) bounces.push(+b.toFixed(2))
    const sagX = t => K.lerp(300, 560, K.ease.inOutCubic(K.prog(t, ...B.flop)))
    function chair(x, a, front) {
      x.save(); x.globalAlpha *= a
      if (!front) { x.fillStyle = K.INK; x.fillRect(CHX - 110, K.GROUND - 190, 220, 170); x.fillStyle = '#23a796'; x.fillRect(CHX - 104, K.GROUND - 184, 208, 160); x.fillStyle = '#3ce6cf'; x.fillRect(CHX - 104, K.GROUND - 184, 208, 14) }
      else {
        x.fillStyle = K.INK; x.fillRect(CHX - 130, K.GROUND - 70, 260, 66); x.fillRect(CHX - 140, K.GROUND - 120, 50, 116); x.fillRect(CHX + 90, K.GROUND - 120, 50, 116)
        x.fillStyle = '#1f8f80'; x.fillRect(CHX - 124, K.GROUND - 64, 248, 54)
        x.fillStyle = '#2bbfac'; x.fillRect(CHX - 134, K.GROUND - 114, 38, 104); x.fillRect(CHX + 96, K.GROUND - 114, 38, 104)
      }
      x.restore()
    }
    return {
      draw(x, t) {
        const a = K.appear(t, T.scene + 0.05)
        if (a <= 0.01) return
        chair(x, Math.min(1, a), false)
        K.mini(x, t, { x: CHX, y: K.ACT_Y - 34, size: 150, color: '#9fe6b0', mood: t > B.note ? 'happy' : t > B.look ? 'sparkle' : 'sleepy', zzz: false, look: [-1, 0], seed: 9, pop: K.appear(t, T.scene + 0.25), bob: 2, hops: [B.note + 0.1] })
        chair(x, Math.min(1, a), true)
        K.drawBits(x, K.BM.MUG, K.COL, CHX - 58, K.ACT_Y - 8, 5 * a, { flipX: true }); K.steam(x, t, CHX - 62, K.ACT_Y - 36, a * 0.7)
        const sx = sagX(t), flopped = t > B.flop[1], bouncing = t < B.look
        // the backpack: on Sag's back while bouncing, then THUNK on the snow
        const dropP = K.prog(t, B.drop, B.drop + 0.25)
        const bx = t < B.drop ? sx - 80 : K.lerp(sx - 80, 200, dropP), byBounce = bouncing ? -Math.abs(Math.sin((t - 3.3) * Math.PI * 2)) * 14 : 0
        const by = t < B.drop ? K.ACT_Y - 30 + byBounce : K.lerp(K.ACT_Y - 30, K.GROUND - 70, K.ease.inCubic(dropP))
        K.drawBits(x, PACK, { G: '#c96f2f', g: '#9a4f1f', Y: '#ffd34d', B: '#55331f' }, bx, by, 13 * a)
        K.mini(x, t, { x: sx, y: flopped ? K.ACT_Y + 10 : K.ACT_Y, size: 160, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.note ? 'heart' : t > B.look ? 'wide' : 'happy', look: t > B.look ? [1, 0] : [0, -0.5], seed: 4, pop: a, squash: flopped ? 0.16 : 0, hops: bouncing ? bounces : [B.drop, B.flop[1]] })
        K.burst(x, 200, K.GROUND - 160, 84, t, B.drop + 0.25, { word: 'THUNK', size: 30, life: 0.7 })
        K.label(x, 'PACKED: 0:04', 330, K.ACT_Y - 175, 38, K.ME.color, K.prog(t, B.packed, B.packed + 0.15) * (1 - K.prog(t, B.look - 0.4, B.look)), -0.06)
        // the map + sticky note
        if (t > B.map[0]) {
          const mp = K.ease.outBack(K.prog(t, ...B.map)) * K.popOut(t, T.out)
          const mx = 660, my = 1035
          x.save(); x.translate(mx, my); x.scale(mp, 1)
          x.fillStyle = K.INK; x.fillRect(-176, -76, 352, 152)
          ;['#e8dcb8', '#d9cba1', '#e8dcb8', '#d9cba1'].forEach((c, i) => { x.fillStyle = c; x.fillRect(-170 + i * 85, -70, 85, 140) })
          x.strokeStyle = '#3fae6a'; x.lineWidth = 6; x.beginPath(); x.moveTo(-150, 40); x.quadraticCurveTo(-60, -60, 30, 10); x.quadraticCurveTo(90, 50, 140, -40); x.stroke()
          x.strokeStyle = '#c42a3f'; x.setLineDash([10, 10]); x.lineWidth = 5; x.beginPath(); x.moveTo(-120, -40); x.lineTo(120, 30); x.stroke(); x.setLineDash([])
          x.restore()
          const np = K.pop01(t, B.note, 0.3, 2.8) * K.popOut(t, T.out)
          if (np > 0.01) {
            x.save(); x.translate(mx + 60, my - 30); x.rotate(0.08); x.scale(np, np)
            x.fillStyle = K.INK; x.fillRect(-104, -46, 208, 92); x.fillStyle = '#ffd34d'; x.fillRect(-98, -40, 196, 80)
            x.fillStyle = K.INK; x.font = "800 30px Inter"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('NEXT', 0, -14); x.fillText('WEEKEND', 0, 18); x.restore()
          }
        }
        if (t > B.mug2) { const p2 = K.pop01(t, B.mug2, 0.3, 2.6) * K.popOut(t, T.out); K.drawBits(x, K.BM.MUG, { ...K.COL, M: '#ff8fb1' }, sx + 62, K.ACT_Y + 14, 5 * p2); K.steam(x, t, sx + 58, K.ACT_Y - 14, p2 * 0.7) }
      },
      cues: [
        ...bounces.map((b, i) => ['tick', b, i % 2 ? 0.022 : 0.03]), ['pop', B.packed, 1318.51, 0.035, -0.3],
        ['pop', B.look, 987.77, 0.035, -0.2], ['boom', B.drop + 0.25, 0.1], ['whoosh', B.flop[0], 0.4, 0.03], ['pop', B.flop[1], 659.25, 0.035, 0],
        ['whoosh', B.map[0], 0.35, 0.035], ['tick', B.map[1], 0.04], ['pop', B.note, 1567.98, 0.045, 0.2], ['pluck', B.note, 1174.66, 0.04, 0.5, 0.2], ['pop', B.mug2, 1318.51, 0.03, -0.2],
      ],
    }
  },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, LINES_EXPORT = F.LINES_EXPORT
