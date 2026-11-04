// ngwe19 · Your Star Guide: Winter · ♎ Libra · note 2 / 4 (your holiday blind spot) · 25 s (story 0–20.6, then the end card)
//   0.00–2.85  "*Libra,* one night, | *two* dinners."  The ♎ guide, big, lantern lit, snow falling.
//   2.9–7.1    Two front doors in the snow, both lit, both "7 PM": YOUR FOLKS and THEIR FOLKS. Libra stretches between
//              them like taffy while a pair of scales tips back and forth over its head.
//              YOUR STAR: "yes to both families. same night. oh no."
//   7.15–10.8  Libra goes dizzy (little stars). YOUR STAR: "pleasing everyone pleases no one."
//   10.85–14.5 YOUR STAR: "pick one, say it kindly, plan the other."  Libra snaps back, walks to one door, and sends a heart
//              letter to the other: "NEXT WEEK?"  The other door answers with a heart. The scales settle level.
//   14.55      card flip · "Kind *and* clear."  Pisces sobs in the snow.
import { guideFilm } from '../../ngwe01/gwkit.js'

const F = guideFilm({
  id: 'ngwe19', sign: 'libra', note: 2, len: 25,
  hook: '*Libra,* one night, | *two* dinners.',
  lines: ['yes to both families. same night. *oh no*.', 'pleasing everyone pleases *no one*.', 'pick one, say it *kindly*, plan the other.'],
  chip: 'LIBRA: SYMBOL, THE SCALES.|RULER OF THE 7TH HOUSE (PARTNERS)',
  last: 'Kind *and* clear.', late: 1, lastSize: 108,
  gag: (T, K) => {
    const B = { lit: 3.3, stretch: [3.9, 11.2], dizzy: [8.0, 10.8], snap: 11.25, walk: [11.6, 12.3], letter: [12.6, 13.5], reply: 13.8 }
    const DL = 190, DR = 735, LX = 462
    const lean = t => t > B.stretch[0] && t < B.stretch[1] ? Math.sin((t - B.stretch[0]) * 2.4) : 0
    const libX = t => t < B.walk[0] ? LX + lean(t) * 60 : K.lerp(LX, DR - 150, K.ease.inOutCubic(K.prog(t, ...B.walk)))
    function door(x, cx, label, lit, a) {
      x.save(); x.globalAlpha *= a
      x.fillStyle = K.INK; x.fillRect(cx - 80, K.GROUND - 250, 160, 250); x.fillStyle = '#5a4a7a'; x.fillRect(cx - 74, K.GROUND - 244, 148, 244)
      x.fillStyle = K.INK; x.fillRect(cx - 54, K.GROUND - 200, 108, 200); x.fillStyle = lit ? '#ffd68c' : '#2b2350'; x.fillRect(cx - 48, K.GROUND - 194, 96, 194)
      x.fillStyle = K.SNOW; x.fillRect(cx - 90, K.GROUND - 262, 180, 16)
      x.fillStyle = K.INK; x.fillRect(cx - 78, K.GROUND - 300, 156, 36); x.fillStyle = K.GOLD; x.fillRect(cx - 74, K.GROUND - 296, 148, 28)
      x.fillStyle = K.INK; x.font = "800 18px Inter"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(label, cx, K.GROUND - 281)
      x.restore()
      if (lit) K.label(x, '7 PM', cx, K.GROUND - 150, 30, '#6c3a1a', a)
    }
    return {
      draw(x, t) {
        const a = K.appear(t, T.scene + 0.05)
        if (a <= 0.01) return
        const lit = t > B.lit
        door(x, DL, 'YOUR FOLKS', lit, Math.min(1, a)); door(x, DR, 'THEIR FOLKS', lit, Math.min(1, a))
        const lx = libX(t), stretching = t > B.stretch[0] && t < B.snap
        const st = stretching ? 0.28 + 0.14 * Math.abs(lean(t)) : 0
        // taffy bands to both doors
        if (stretching) { x.save(); x.strokeStyle = K.INK; x.lineWidth = 22; x.lineCap = 'round'; x.beginPath(); x.moveTo(DL + 50, K.ACT_Y); x.quadraticCurveTo((DL + lx) / 2, K.ACT_Y + 30, lx, K.ACT_Y); x.lineTo(DR - 50, K.ACT_Y); x.stroke(); x.strokeStyle = K.ME.color; x.lineWidth = 14; x.beginPath(); x.moveTo(DL + 50, K.ACT_Y); x.quadraticCurveTo((DL + lx) / 2, K.ACT_Y + 30, lx, K.ACT_Y); x.quadraticCurveTo((DR + lx) / 2, K.ACT_Y + 30, DR - 50, K.ACT_Y); x.stroke(); x.restore() }
        K.mini(x, t, { x: lx, size: 160, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.reply ? 'heart' : t > B.snap ? 'happy' : t > B.dizzy[0] ? 'squint' : stretching ? 'wide' : 'happy', look: [lean(t) > 0 ? 1 : -1, 0], seed: 4, pop: a, squash: st, hops: [B.snap, B.walk[1]] })
        if (t > B.dizzy[0] && t < B.dizzy[1]) for (let k = 0; k < 3; k++) { const an = t * 4 + k * 2.1; K.label(x, '★', lx + Math.cos(an) * 70, K.ACT_Y - 120 + Math.sin(an) * 18, 30, K.GOLD, 1) }
        // the scales over Libra's head
        const tilt = t < B.walk[1] ? lean(t) * 0.35 : 0.35 * lean(B.walk[1]) * (1 - K.ease.outCubic(K.prog(t, B.walk[1], B.walk[1] + 0.8)))
        const sp = K.pop01(t, B.stretch[0] - 0.4, 0.3, 2.4) * (1 - K.prog(t, B.reply, B.reply + 0.4))
        if (sp > 0.01) {
          x.save(); x.translate(lx, 1000); x.scale(sp, sp)
          x.fillStyle = K.INK; x.fillRect(-6, 0, 12, 60); x.fillStyle = K.GOLD; x.fillRect(-3, 2, 6, 56)
          x.rotate(tilt); x.fillStyle = K.INK; x.fillRect(-100, -6, 200, 12); x.fillStyle = K.GOLD; x.fillRect(-97, -3, 194, 6)
          for (const s of [-1, 1]) { x.save(); x.translate(s * 92, 0); x.rotate(-tilt); x.strokeStyle = K.GOLD; x.lineWidth = 3; x.beginPath(); x.moveTo(0, 0); x.lineTo(-24, 40); x.moveTo(0, 0); x.lineTo(24, 40); x.stroke(); x.fillStyle = K.INK; x.beginPath(); x.ellipse(0, 42, 32, 10, 0, 0, Math.PI); x.fill(); x.fillStyle = K.GOLD; x.beginPath(); x.ellipse(0, 42, 28, 7, 0, 0, Math.PI); x.fill(); x.restore() }
          x.restore()
        }
        // the heart letter to the other door
        if (t > B.letter[0]) {
          const p = K.ease.inOutCubic(K.prog(t, ...B.letter)), k = K.popOut(t, T.out)
          const ex = K.lerp(lx - 40, DL + 10, p), ey = K.ACT_Y - 60 - Math.sin(Math.PI * p) * 140
          if (p < 1) K.drawBits(x, K.BM.ENVELOPE, K.COL, ex, ey, 7 * k)
          K.label(x, 'NEXT WEEK?', K.lerp(lx, DL + 90, p), ey - 90, 32, '#ff8fb1', K.prog(t, B.letter[0], B.letter[0] + 0.2) * (1 - K.prog(t, B.reply + 1.2, B.reply + 1.5)))
          if (t > B.reply) K.heart(x, DL, K.GROUND - 330 - (t - B.reply) * 10, 8 * K.pop01(t, B.reply, 0.35, 3) * k)
        }
        K.label(x, 'oh no', lx, K.ACT_Y - 100, 36, K.BONE, K.prog(t, B.stretch[0] + 0.6, B.stretch[0] + 0.8) * (1 - K.prog(t, 6.6, 6.9)))
      },
      cues: [
        ['pop', B.lit, 880, 0.03, -0.4], ['pop', B.lit + 0.1, 880, 0.03, 0.4], ['whoosh', B.stretch[0], 0.6, 0.03],
        ...Array.from({ length: 6 }, (_, i) => ['pluck', +(B.stretch[0] + 0.65 + i * 1.31).toFixed(2), [659.25, 739.99][i % 2], 0.025, 0.5, i % 2 ? 0.4 : -0.4]),
        ['glitter', B.dizzy[0], B.dizzy[0] + 0.6], ['pop', B.snap, 1567.98, 0.045, 0], ['tick', B.walk[1], 0.04],
        ['whoosh', B.letter[0], 0.5, 0.03], ['pop', B.letter[1], 1174.66, 0.035, -0.4], ['pop', B.reply, 1318.51, 0.04, -0.4], ['glitter', B.reply, B.reply + 0.5],
      ],
    }
  },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, LINES_EXPORT = F.LINES_EXPORT
