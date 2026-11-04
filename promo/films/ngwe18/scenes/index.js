// ngwe18 · Your Star Guide: Winter · ♍ Virgo · note 2 / 4 (your holiday blind spot) · 23 s (story 0–20.6, then the short end card)
//   0.00–2.85  "*Virgo,* put the | *ruler* down."  The ♍ guide, big, lantern lit, snow falling.
//   2.9–7.1    11:58 PM. A little decorated tree in the snow, its star tipped to one side. Virgo holds a long ruler up to
//              it, squinting ("2° OFF"). YOUR STAR: "you're fixing the tree at midnight."
//   7.15–10.8  Virgo hops up and straightens the star (click). The lavender star's face falls.
//              YOUR STAR: "that crooked star? they hung it."
//   10.85–14.5 YOUR STAR: "leave it. the crooked part is the love."  Virgo looks at them, tips the star back, and drops the
//              ruler in the snow. The star sparkles; both beam.
//   14.55      "Leave the star | *crooked.*"  Pisces sobs in the snow.
import { guideFilm } from '../../ngwe01/gwkit.js'

const F = guideFilm({
  id: 'ngwe18', sign: 'virgo', note: 2, len: 25,
  hook: '*Virgo,* put the | *ruler* down.',
  lines: ["you're fixing the tree *at midnight*.", 'that crooked star? *they* hung it.', 'leave it. the crooked part *is the love*.'],
  chip: 'VIRGO: SYMBOL, THE MAIDEN.|RULER OF THE 6TH HOUSE (ROUTINE)',
  last: 'Leave the star | *crooked.*', late: 1,
  gag: (T, K) => {
    const B = { clock: 3.2, measure: [3.7, 6.8], off: 4.8, fix: [7.6, 8.1], click: 8.15, fall: 8.6, look: 11.3, unfix: [11.8, 12.2], drop: [12.6, 13.0], beam: 12.3 }
    const TRX = 540, BASE = K.GROUND - 14, CROOK = 0.42
    const starRot = t => t < B.fix[0] ? CROOK : t < B.unfix[0] ? K.lerp(CROOK, 0, K.ease.outBack(K.prog(t, ...B.fix))) : K.lerp(0, CROOK, K.ease.outBack(K.prog(t, ...B.unfix)))
    const virX = t => t < B.fix[0] ? 300 : t < B.fix[1] + 0.6 ? K.lerp(300, 410, K.ease.inOutCubic(K.prog(t, B.fix[0] - 0.3, B.fix[0]))) - (t > B.fix[1] ? K.lerp(0, 110, K.prog(t, B.fix[1], B.fix[1] + 0.6)) : 0) : t < B.unfix[0] ? 300 : t < B.unfix[1] + 0.6 ? K.lerp(300, 410, K.ease.inOutCubic(K.prog(t, B.unfix[0] - 0.3, B.unfix[0]))) - (t > B.unfix[1] ? K.lerp(0, 110, K.prog(t, B.unfix[1], B.unfix[1] + 0.6)) : 0) : 300
    function tree(x, t, a) {
      x.save(); x.globalAlpha *= a
      x.fillStyle = K.INK; x.fillRect(TRX - 22, BASE - 40, 44, 54); x.fillStyle = '#6b4423'; x.fillRect(TRX - 16, BASE - 36, 32, 46)
      const tiers = [[BASE - 30, 150, 110], [BASE - 110, 120, 100], [BASE - 185, 88, 90]]
      for (const [y, w, h] of tiers) {
        x.fillStyle = K.INK; x.beginPath(); x.moveTo(TRX, y - h - 8); x.lineTo(TRX + w + 8, y + 4); x.lineTo(TRX - w - 8, y + 4); x.closePath(); x.fill()
        x.fillStyle = '#2a7a4b'; x.beginPath(); x.moveTo(TRX, y - h); x.lineTo(TRX + w, y); x.lineTo(TRX - w, y); x.closePath(); x.fill()
        x.fillStyle = '#3fae6a'; x.beginPath(); x.moveTo(TRX, y - h); x.lineTo(TRX - w * 0.2, y - h * 0.2); x.lineTo(TRX - w, y); x.closePath(); x.fill()
        x.fillStyle = K.SNOW; x.fillRect(TRX - w + 10, y - 6, w * 2 - 20, 6)
      }
      const balls = [[-80, -60, '#e2453c'], [60, -50, '#ffd34d'], [-30, -140, '#3ce6cf'], [50, -150, '#ff8fb1'], [-10, -220, '#e2453c'], [100, -20, '#3a6fd8']]
      for (const [dx, dy, c] of balls) { x.fillStyle = K.INK; x.fillRect(TRX + dx - 11, BASE + dy - 11, 22, 22); x.fillStyle = c; x.fillRect(TRX + dx - 8, BASE + dy - 8, 16, 16); x.fillStyle = '#ffffff'; x.fillRect(TRX + dx - 6, BASE + dy - 6, 5, 5) }
      x.restore()
      // the star on top
      x.save(); x.globalAlpha *= a; x.translate(TRX, BASE - 296); x.rotate(starRot(t))
      x.fillStyle = K.INK; x.beginPath(); for (let i = 0; i < 10; i++) { const r = i % 2 ? 18 : 42, an = i * Math.PI / 5 - Math.PI / 2; x.lineTo(Math.cos(an) * r, Math.sin(an) * r - 14) } x.closePath(); x.fill()
      x.fillStyle = K.GOLD; x.beginPath(); for (let i = 0; i < 10; i++) { const r = i % 2 ? 13 : 34, an = i * Math.PI / 5 - Math.PI / 2; x.lineTo(Math.cos(an) * r, Math.sin(an) * r - 14) } x.closePath(); x.fill()
      x.restore()
    }
    return {
      draw(x, t) {
        const a = K.appear(t, T.scene + 0.05)
        if (a <= 0.01) return
        tree(x, t, Math.min(1, a))
        const sad = t > B.fall && t < B.unfix[1]
        K.mini(x, t, { x: 800, size: 150, color: K.THEM, mood: t > B.beam ? 'heart' : sad ? 'neutral' : 'happy', look: sad ? [0, 1] : [-1, -0.5], seed: 9, pop: K.appear(t, T.scene + 0.3), squash: sad ? 0.12 : 0, hops: [B.unfix[1] + 0.1], bob: sad ? 0 : undefined })
        const vx = virX(t), measuring = t > B.measure[0] && t < B.measure[1]
        K.mini(x, t, { x: vx, size: 160, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.beam ? 'happy' : t > B.look && t < B.unfix[0] ? 'wide' : measuring ? 'squint' : 'neutral', look: t > B.look && t < B.unfix[0] ? [1, 0] : [1, -1], seed: 4, pop: a, hops: [B.fix[0] - 0.3, B.fix[0] + 0.1, B.unfix[0] - 0.3, B.unfix[0] + 0.1] })
        // the ruler: up against the tree, then dropped in the snow
        const rp = K.pop01(t, B.measure[0] - 0.3, 0.3, 2.4)
        if (rp > 0.01) {
          const dp = K.ease.inCubic(K.prog(t, ...B.drop))
          const rx = K.lerp(TRX - 175, 230, dp), ry = K.lerp(K.GROUND - 160, K.GROUND - 8, dp), rr = K.lerp(-0.08, Math.PI / 2, dp)
          x.save(); x.globalAlpha *= Math.min(1, rp) * K.popOut(t, T.out); x.translate(rx, ry); x.rotate(rr)
          x.fillStyle = K.INK; x.fillRect(-16, -170, 32, 340); x.fillStyle = '#ffd34d'; x.fillRect(-11, -165, 22, 330)
          x.fillStyle = K.INK; for (let i = 0; i < 16; i++) x.fillRect(-11, -160 + i * 21, i % 2 ? 7 : 12, 3)
          x.restore()
        }
        K.label(x, '11:58 PM', 860, 990, 36, K.ICE, K.pop01(t, B.clock, 0.3, 2.4) * (1 - K.prog(t, B.fix[0], B.fix[0] + 0.3)))
        K.label(x, '2° OFF', TRX + 120, K.GROUND - 300, 34, '#c42a3f', K.prog(t, B.off, B.off + 0.15) * (1 - K.prog(t, B.fix[0], B.fix[0] + 0.2)), 0.1)
        K.label(x, 'click.', TRX + 90, K.GROUND - 340, 34, K.BONE, K.prog(t, B.click, B.click + 0.1) * (1 - K.prog(t, B.click + 0.7, B.click + 0.9)))
        K.label(x, 'oh.', 800, K.ACT_Y - 130, 36, K.THEM, sad && t < B.look ? K.prog(t, B.fall, B.fall + 0.2) : 0)
        K.sparkles(x, t, TRX, K.GROUND - 310, B.unfix[1], 12, 110, 2)
      },
      cues: [
        ['pop', B.clock, 659.25, 0.03, 0.4], ['tick', B.measure[0], 0.03], ['tick', B.measure[0] + 0.8, 0.02], ['tick', B.measure[0] + 1.6, 0.02], ['pop', B.off, 1174.66, 0.035, 0.2],
        ['whoosh', B.fix[0], 0.3, 0.03], ['tick', B.click, 0.06], ['pluck', B.fall, 329.63, 0.035, 0.8, 0.4],
        ['pop', B.look, 880, 0.03, -0.2], ['whoosh', B.unfix[0], 0.3, 0.03], ['pop', B.unfix[1], 1567.98, 0.045, 0], ['glitter', B.unfix[1], B.unfix[1] + 0.6], ['boom', B.drop[1], 0.06],
      ],
    }
  },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, LINES_EXPORT = F.LINES_EXPORT
