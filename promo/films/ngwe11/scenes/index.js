// ngwe11 · Your Star Guide: Winter · ♒ Aquarius · note 1 / 4 (how you love in winter) · 20 s (story 0–17.6, then the short end card)
//   0.00–2.85  "*Aquarius,* you love | in *big ideas.*"  The ♒ guide, big, lantern lit, snow falling.
//   2.9–7.4    Aquarius builds a snow robot, piece by piece (base, body, a boxy head, an antenna, a sign: HI), then
//              hides behind it. YOUR STAR: "you'd build a snow robot just to say hi."
//   7.45–11.1  The robot waves its sign (beep boop). The lavender star giggles (hehe) and peeks round the back.
//              YOUR STAR: "they'd love a plain hello, too."  Aquarius steps out and waves: "hi."
//   11.15      "Sometimes | *hello* is enough."  Two waving stars, a heart; the robot keeps waving. Pisces sobs.
import { guideFilm } from '../../ngwe01/gwkit.js'

const F = guideFilm({
  id: 'ngwe11', sign: 'aquarius', note: 1, len: 22,
  hook: '*Aquarius,* you love | in *big ideas.*',
  lines: ["you'd build a *snow robot* just to say hi.", "they'd love a *plain hello*, too."],
  chip: 'AQUARIUS: FIXED AIR, RULED BY|SATURN (MODERN: URANUS)',
  last: 'Sometimes | *hello* is enough.', late: 0,
  gag: (T, K) => {
    const B = { part: [3.5, 4.4, 5.3, 6.0, 6.6], hide: [6.9, 7.4], wave: 7.95, hehe: 8.6, peek: [9.1, 9.5], out: [9.7, 10.2], hi: 10.25, heart: T.h2Land + 0.1 }
    const RX = 540, GY = K.GROUND
    const aqX = t => t < B.hide[0] ? 360 + Math.sin(t * 3) * 20 : t < B.out[0] ? K.lerp(380, RX, K.ease.inOutCubic(K.prog(t, ...B.hide))) : K.lerp(RX, 690, K.ease.outCubic(K.prog(t, ...B.out)))
    const part = (t, i) => K.pop01(t, B.part[i], 0.35, 2.4) * K.popOut(t, T.out)
    function robot(x, t) {
      const ball = (cy, r, p) => { if (p <= 0.01) return; x.fillStyle = K.INK; x.beginPath(); x.arc(RX, cy, r * p + 6, 0, Math.PI * 2); x.fill(); x.fillStyle = '#eef2ff'; x.beginPath(); x.arc(RX, cy, r * p, 0, Math.PI * 2); x.fill(); x.fillStyle = '#c9d4ff'; x.beginPath(); x.arc(RX + r * 0.25 * p, cy + r * 0.25 * p, r * 0.6 * p, 0, Math.PI * 2); x.fill() }
      ball(GY - 62, 70, part(t, 0)); ball(GY - 168, 52, part(t, 1))
      const hp = part(t, 2)
      if (hp > 0.01) {
        x.save(); x.translate(RX, GY - 252); x.scale(hp, hp)
        x.fillStyle = K.INK; x.fillRect(-56, -46, 112, 92); x.fillStyle = '#eef2ff'; x.fillRect(-50, -40, 100, 80)
        x.fillStyle = K.INK; x.fillRect(-40, -18, 80, 30); const blink = Math.sin(t * 5) > 0.92
        x.fillStyle = '#3ce6cf'; if (!blink) { x.fillRect(-32, -12, 20, 18); x.fillRect(12, -12, 20, 18) }
        x.fillStyle = '#c42a3f'; x.fillRect(-14, 20, 28, 8)
        x.restore()
      }
      const ap = part(t, 3)
      if (ap > 0.01) { x.fillStyle = K.INK; x.fillRect(RX - 5, GY - 330 * 1, 10, 34 * ap); x.fillStyle = Math.sin(t * 8) > 0 ? '#ff5c8e' : '#ffd34d'; x.fillRect(RX - 10, GY - 342, 20 * ap, 20 * ap) }
      // stick arms + the HI sign (waves)
      const sp = part(t, 4)
      if (sp > 0.01) {
        const wv = t > B.wave ? Math.sin((t - B.wave) * 7) * 0.35 : 0
        x.save(); x.strokeStyle = '#6b4423'; x.lineWidth = 9; x.lineCap = 'round'
        x.beginPath(); x.moveTo(RX - 48, GY - 175); x.lineTo(RX - 120, GY - 215 + Math.sin(t * 7) * (t > B.wave ? 18 : 0)); x.stroke()
        x.beginPath(); x.moveTo(RX + 48, GY - 175); x.lineTo(RX + 110, GY - 200); x.stroke(); x.restore()
        x.save(); x.translate(RX + 120, GY - 220); x.rotate(wv); x.scale(sp, sp)
        x.fillStyle = K.INK; x.fillRect(-6, -10, 12, 90); x.fillStyle = '#8a5a33'; x.fillRect(-3, -8, 6, 86)
        x.fillStyle = K.INK; x.fillRect(-66, -96, 132, 92); x.fillStyle = '#c08552'; x.fillRect(-60, -90, 120, 80)
        x.fillStyle = K.INK; x.font = '800 54px Inter'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('HI', 0, -48); x.restore()
      }
    }
    return {
      draw(x, t) {
        const a = K.appear(t, T.scene + 0.05)
        if (a <= 0.01) return
        const ax = aqX(t), behind = t > B.hide[1] && t < B.out[0]
        const peekP = K.ease.inOutCubic(K.prog(t, ...B.peek)) * (1 - K.prog(t, B.out[0], B.out[1]))
        const aqDraw = () => K.mini(x, t, { x: ax, size: 160, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.heart ? 'heart' : t > B.out[0] ? 'happy' : behind ? 'wink' : 'squint', look: t > B.out[0] ? [1, 0] : [0, -1], seed: 4, pop: a, hops: [...B.part, B.hi] })
        if (t > B.hide[0] && t < B.out[1]) aqDraw()
        robot(x, t)
        if (!(t > B.hide[0] && t < B.out[1])) aqDraw()
        K.mini(x, t, { x: 830 - peekP * 110, size: 150, color: K.THEM, mood: t > B.heart ? 'heart' : t > B.hi ? 'sparkle' : t > B.hehe ? 'happy' : t > B.wave ? 'wide' : 'neutral', look: [-1, 0], seed: 9, pop: K.appear(t, T.scene + 0.3), squash: t > B.hehe && t < B.peek[0] ? 0.05 * Math.sin(t * 30) : 0, hops: [B.wave + 0.1, B.hi + 0.2] })
        B.part.forEach((p, i) => K.sparkles(x, t, RX, K.GROUND - [62, 168, 252, 330, 220][i], p, 6, 70, i))
        K.label(x, 'beep boop', RX - 150, K.GROUND - 330, 34, '#3ce6cf', K.prog(t, B.wave, B.wave + 0.15) * (1 - K.prog(t, B.wave + 1.2, B.wave + 1.4)), -0.1)
        K.label(x, 'hehe', 830, K.ACT_Y - 130, 36, K.THEM, K.prog(t, B.hehe, B.hehe + 0.15) * (1 - K.prog(t, B.peek[1], B.peek[1] + 0.2)), 0.1)
        K.label(x, 'hi.', ax, K.ACT_Y - 140, 46, K.ME.color, K.prog(t, B.hi, B.hi + 0.15) * (1 - K.prog(t, B.hi + 1.6, B.hi + 1.9)))
        if (t > B.heart) K.heart(x, 760, K.ACT_Y - 175 + Math.sin(t * 2) * 6, 8 * K.pop01(t, B.heart, 0.35, 3) * K.popOut(t, T.out))
      },
      cues: [
        ...B.part.map((p, i) => ['pop', p, [523.25, 659.25, 783.99, 1046.5, 1318.51][i], 0.035, 0]), ['glitter', B.part[3], B.part[3] + 0.3],
        ['whoosh', B.hide[0], 0.35, 0.03], ['pluck', B.wave, 1567.98, 0.03, 0.15, 0], ['pluck', B.wave + 0.16, 1174.66, 0.03, 0.15, 0], ['pluck', B.wave + 0.4, 1567.98, 0.03, 0.15, 0], ['pluck', B.wave + 0.56, 1174.66, 0.03, 0.15, 0],
        ['pop', B.hehe, 1318.51, 0.03, 0.4], ['pop', B.hehe + 0.15, 1567.98, 0.025, 0.4], ['whoosh', B.out[0], 0.3, 0.03], ['pop', B.hi, 987.77, 0.045, 0.1], ['pop', B.heart, 1318.51, 0.035, 0.1],
      ],
    }
  },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, LINES_EXPORT = F.LINES_EXPORT
