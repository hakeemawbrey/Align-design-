// ngwe17 · Your Star Guide: Winter · ♌ Leo · note 2 / 4 (your holiday blind spot) · 25 s (story 0–20.6, then the end card)
//   0.00–2.85  "*Leo,* about the | *holiday photo…*"  The ♌ guide, big, lantern lit, snow falling.
//   2.9–7.1    A camera on a tripod in the snow. FLASH: TAKE 4. FLASH: TAKE 11. Leo strikes a new pose every time; the
//              lavender star smiles politely. YOUR STAR: "take nineteen. still not the one."
//   7.15–10.8  FLASH: TAKE 19. The lavender star yawns. YOUR STAR: "they just wanted to be in it with you."
//   10.85–14.5 YOUR STAR: "keep the blurry one. it's the real one."  Leo catches the yawn, they both crack up, the camera
//              goes off mid-laugh (FLASH); the print slides out, blurry, two stars laughing, and lands in a gold frame.
//   14.55      card flip · "Frame the | *blurry* one."  Pisces sobs in the snow.
import { guideFilm } from '../../ngwe01/gwkit.js'

const F = guideFilm({
  id: 'ngwe17', sign: 'leo', note: 2, len: 25,
  hook: '*Leo,* about the | *holiday* *photo…*',
  lines: ['take nineteen. *still* not the one.', 'they just wanted to be *in it* with you.', "keep the *blurry* one. it's the real one."],
  chip: 'LEO: SYMBOL, THE LION.|RULER OF THE 5TH HOUSE (JOY)',
  last: 'Frame the | *blurry* one.', late: 1,
  gag: (T, K) => {
    const B = { flash: [3.8, 5.0, 6.3], takes: ['TAKE 4', 'TAKE 11', 'TAKE 19'], yawn: [8.6, 10.0], laugh: 11.2, snap: 11.7, print: [12.0, 12.6], up: [12.7, 13.5], frame: 13.6 }
    const CX = 540, LX = 290, TX = 790
    const poses = [3.5, 4.4, 5.6, 6.0, 7.1, 7.6]
    function camera(x, t, a) {
      x.save(); x.globalAlpha *= a; x.strokeStyle = K.INK; x.lineWidth = 12; x.lineCap = 'round'
      for (const d of [-1, 0, 1]) { x.beginPath(); x.moveTo(CX, 1110); x.lineTo(CX + d * 60, K.GROUND); x.stroke() }
      x.strokeStyle = '#9aa3b8'; x.lineWidth = 6; for (const d of [-1, 0, 1]) { x.beginPath(); x.moveTo(CX, 1110); x.lineTo(CX + d * 60, K.GROUND - 4); x.stroke() }
      x.fillStyle = K.INK; x.fillRect(CX - 70, 1030, 140, 90); x.fillStyle = '#3a2f63'; x.fillRect(CX - 64, 1036, 128, 78); x.fillStyle = K.INK; x.fillRect(CX - 40, 1018, 40, 18)
      x.fillStyle = K.INK; x.beginPath(); x.arc(CX, 1075, 30, 0, Math.PI * 2); x.fill(); x.fillStyle = '#6fd3ff'; x.beginPath(); x.arc(CX, 1075, 22, 0, Math.PI * 2); x.fill(); x.fillStyle = '#ffffff'; x.fillRect(CX - 10, 1066, 8, 8)
      x.fillStyle = '#ffd34d'; x.fillRect(CX + 34, 1042, 20, 12); x.restore()
    }
    return {
      draw(x, t) {
        const a = K.appear(t, T.scene + 0.05)
        if (a <= 0.01) return
        camera(x, t, Math.min(1, a) * (1 - K.prog(t, B.up[0], B.up[0] + 0.4)))
        const laughing = t > B.laugh, yawn = t > B.yawn[0] && t < B.yawn[1]
        const pi = poses.filter(p => t > p).length
        const laughH = laughing ? [B.laugh, B.laugh + 0.45, B.laugh + 0.9, B.laugh + 1.35] : []
        K.mini(x, t, { x: TX, size: 150, color: K.THEM, mood: laughing ? 'happy' : yawn ? 'sleepy' : t > B.flash[1] + 0.5 ? 'squint' : 'happy', zzz: false, look: [-1, 0], seed: 9, pop: K.appear(t, T.scene + 0.25), hops: laughH.map(v => v + 0.1) })
        K.mini(x, t, { x: LX + (laughing ? 0 : (pi % 2 ? 18 : -18)), size: 165, color: K.ME.color, glyph: K.ME.glyph, mood: laughing ? 'happy' : ['sparkle', 'wink', 'sparkle', 'wink', 'heart', 'sparkle', 'wink'][pi % 7], look: [pi % 2 ? 1 : 0, 0], seed: 4, pop: a, squash: laughing ? 0 : (pi % 3 === 1 ? -0.1 : pi % 3 === 2 ? 0.1 : 0), hops: [...poses, ...laughH], glow: laughing ? 0.8 : 1.4 })
        // flashes + take counter
        for (const f of [...B.flash, B.snap]) { const k = 1 - K.prog(t, f, f + 0.35); if (t > f && k > 0) { x.save(); x.fillStyle = `rgba(255,255,255,${0.75 * k})`; x.fillRect(0, 900, 1080, 420); x.restore() } }
        const ti = B.flash.filter(f => t > f).length - 1
        if (ti >= 0 && t < B.laugh) K.label(x, B.takes[ti], CX, 975, 44 * K.pop01(t, B.flash[ti], 0.25, 2.8), K.GOLD, 1)
        if (yawn) K.label(x, 'yawn', TX + 10, K.ACT_Y - 130, 34, K.BONE, K.prog(t, B.yawn[0], B.yawn[0] + 0.2) * (1 - K.prog(t, B.yawn[1] - 0.2, B.yawn[1])))
        if (laughing && t < B.frame + 1) { K.burst(x, LX, K.ACT_Y - 170, 70, t, B.laugh, { word: 'HA!', size: 32, color: K.ME.color, life: 0.8 }); K.burst(x, TX, K.ACT_Y - 170, 70, t, B.laugh + 0.3, { word: 'HA!', size: 32, color: K.THEM, life: 0.8 }) }
        // the print: slides out of the camera, floats up, lands in a gold frame
        if (t > B.print[0]) {
          const sp = K.ease.outCubic(K.prog(t, ...B.print)), up = K.ease.inOutCubic(K.prog(t, ...B.up))
          const px = CX, py = K.lerp(1060 + sp * 70, 1080, up), s = K.lerp(0.55, 1, up), k = K.popOut(t, T.out)
          x.save(); x.translate(px, py); x.scale(s * k, s * k); x.rotate(K.lerp(0.1, -0.04, up))
          const fr = K.prog(t, B.frame, B.frame + 0.3)
          if (fr > 0) { x.shadowColor = K.GOLD; x.shadowBlur = 30 * fr; x.fillStyle = K.INK; x.fillRect(-150, -128, 300, 256); x.shadowBlur = 0; x.fillStyle = '#d9a73a'; x.fillRect(-144, -122, 288, 244); x.fillStyle = K.GOLD; x.fillRect(-144, -122, 288, 10) }
          x.fillStyle = K.INK; x.fillRect(-120, -100, 240, 200); x.fillStyle = '#ffffff'; x.fillRect(-114, -94, 228, 188)
          x.fillStyle = '#2b2350'; x.fillRect(-100, -80, 200, 136)
          x.save(); x.filter = 'blur(6px)'
          x.fillStyle = K.ME.color; x.beginPath(); x.arc(-40, -10, 38, 0, Math.PI * 2); x.fill(); x.beginPath(); x.arc(-26, -6, 34, 0, Math.PI * 2); x.fill()
          x.fillStyle = K.THEM; x.beginPath(); x.arc(42, -8, 34, 0, Math.PI * 2); x.fill(); x.beginPath(); x.arc(54, -2, 30, 0, Math.PI * 2); x.fill()
          x.restore()
          x.fillStyle = '#6c5a8a'; x.font = "800 20px Inter"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('us, laughing', 0, 74)
          x.restore()
          K.sparkles(x, t, px, py, B.frame, 12, 200, 2)
        }
      },
      cues: [
        ...poses.map((p, i) => ['pop', p, [880, 987.77, 1174.66, 1318.51, 1174.66, 987.77][i], 0.03, -0.3]),
        ...B.flash.flatMap(f => [['tick', f, 0.06], ['glitter', f, f + 0.25]]), ['pluck', B.yawn[0], 293.66, 0.03, 0.8, 0.4],
        ['pop', B.laugh, 1318.51, 0.04, -0.3], ['pop', B.laugh + 0.3, 1567.98, 0.04, 0.3], ['tick', B.snap, 0.07], ['glitter', B.snap, B.snap + 0.3],
        ['whoosh', B.print[0], 0.4, 0.025], ['whoosh', B.up[0], 0.5, 0.03], ['pop', B.frame, 1318.51, 0.045, 0], ['glitter', B.frame, B.frame + 0.6],
      ],
    }
  },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, LINES_EXPORT = F.LINES_EXPORT
