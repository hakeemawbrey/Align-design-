// ngwe23 · Your Star Guide: Winter · ♒ Aquarius · note 2 / 4 (your holiday blind spot) · 23 s (story 0–20.6, then the short end card)
//   0.00–2.85  "*Aquarius,* big | *family* dinner."  The ♒ guide, big, lantern lit, snow falling.
//   2.9–7.1    A long snowy table full of chatter (speech bubbles popping). At the far end, Aquarius sits inside its own
//              little snow-globe dome, quiet. YOUR STAR: "you go quiet at big family dinners."
//   7.15–10.8  Aquarius's eyes follow every story round the table. YOUR STAR: "you're not weird. you're just watching."
//   10.85–14.5 YOUR STAR: "find one person. ask one question."  Aquarius taps the glass (tap, tap): POP, the dome is gone. It
//              slides up next to the grandparent star (little glasses): "how did you two meet?" Both crack up (HA!).
//   14.55      "One question | *opens* the room."  Pisces sobs in the snow.
import { guideFilm } from '../../ngwe01/gwkit.js'

const GRAN = '#e8c9a0', MINT = '#9fe6b0'
const F = guideFilm({
  id: 'ngwe23', sign: 'aquarius', note: 2, len: 25,
  hook: '*Aquarius,* big | *family* dinner.',
  lines: ['you go *quiet* at big family dinners.', "you're not weird. you're *just watching*.", 'find one person. ask *one question*.'],
  chip: 'AQUARIUS: SYMBOL, THE WATER-BEARER.|RULER OF THE 11TH HOUSE (FRIENDS)',
  last: 'One question | *opens* the room.', late: 1, lastSize: 104,
  gag: (T, K) => {
    const B = { chat: [3.4, 11.0], tap: [11.2, 11.5], pop: 11.8, slide: [12.1, 12.6], ask: 12.7, laugh: 13.6 }
    const AX0 = 240, AX1 = 420, GRX = 560, M2 = 720, TOP = K.GROUND - 70, DY = K.ACT_Y - 40
    const bubbles = []; for (let b = 3.5; b < 11; b += 0.55) bubbles.push(+b.toFixed(2))
    const aqX = t => K.lerp(AX0, AX1, K.ease.inOutCubic(K.prog(t, ...B.slide)))
    return {
      draw(x, t) {
        const a = K.appear(t, T.scene + 0.05)
        if (a <= 0.01) return
        const laughing = t > B.laugh
        const lh = laughing ? [B.laugh, B.laugh + 0.45, B.laugh + 0.9] : []
        const watch = t > 7.2 && t < B.tap[0] ? [Math.sin(t * 1.6) > 0 ? 1 : 0.4, 0] : [1, 0]
        // family behind the table
        K.mini(x, t, { x: M2, y: K.ACT_Y - 52, size: 140, color: MINT, mood: laughing ? 'happy' : 'neutral', look: [Math.sin(t * 2) > 0 ? -1 : 0, 0], seed: 11, pop: K.appear(t, T.scene + 0.3), hops: [...bubbles.filter((_, i) => i % 3 === 1), ...lh] })
        const gr = K.mini(x, t, { x: GRX, y: K.ACT_Y - 52, size: 145, color: GRAN, mood: laughing ? 'happy' : t > B.ask ? 'sparkle' : 'neutral', look: t > B.slide[1] ? [-1, 0] : [1, 0], seed: 13, pop: K.appear(t, T.scene + 0.25), hops: [...bubbles.filter((_, i) => i % 3 === 0), B.ask + 0.4, ...lh] })
        // grandparent's little glasses
        { const k = K.appear(t, T.scene + 0.25); if (k > 0.01) { x.save(); x.globalAlpha *= Math.min(1, k); x.strokeStyle = K.INK; x.lineWidth = 5; const gy = gr.y + 2; x.strokeRect(GRX - 36, gy - 12, 28, 22); x.strokeRect(GRX + 8, gy - 12, 28, 22); x.beginPath(); x.moveTo(GRX - 8, gy - 2); x.lineTo(GRX + 8, gy - 2); x.stroke(); x.restore() } }
        if (t > B.slide[1]) K.mini(x, t, { x: aqX(t), y: K.ACT_Y - 52, size: 160, color: K.ME.color, glyph: K.ME.glyph, mood: laughing ? 'happy' : 'sparkle', look: [1, 0], seed: 4, pop: a, hops: [B.slide[1], ...lh] })
        // table
        x.save(); x.globalAlpha *= Math.min(1, a)
        x.fillStyle = K.INK; x.fillRect(120, TOP - 8, 760, 34); x.fillStyle = '#c08552'; x.fillRect(126, TOP - 2, 748, 22); x.fillStyle = '#ffffff'; x.fillRect(126, TOP - 2, 748, 6)
        x.fillStyle = K.INK; x.fillRect(160, TOP + 26, 22, 52); x.fillRect(830, TOP + 26, 22, 52); x.restore()
        // Aquarius in its dome at the end
        const domeA = 1 - K.prog(t, B.pop, B.pop + 0.15)
        if (t < B.slide[1]) {
          const shake = t > B.tap[0] && t < B.pop ? Math.sin(t * 60) * 3 : 0
          K.mini(x, t, { x: AX0 + shake, y: K.ACT_Y - 52, size: 150, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.pop ? 'wide' : t > B.tap[0] ? 'neutral' : 'neutral', look: watch, seed: 4, pop: a, hops: t > B.pop ? [B.pop] : [] })
          if (domeA > 0.01) {
            x.save(); x.globalAlpha *= domeA * Math.min(1, a)
            x.fillStyle = 'rgba(191,227,255,0.16)'; x.beginPath(); x.arc(AX0 + shake, DY, 118, Math.PI, 0); x.lineTo(AX0 + 118, TOP - 8); x.lineTo(AX0 - 118, TOP - 8); x.closePath(); x.fill()
            x.strokeStyle = K.INK; x.lineWidth = 10; x.stroke(); x.strokeStyle = '#bfe3ff'; x.lineWidth = 5; x.stroke()
            x.fillStyle = 'rgba(255,255,255,0.7)'; x.fillRect(AX0 - 80, DY - 70, 14, 30)
            x.fillStyle = '#ffffff'; for (let i = 0; i < 12; i++) { const ph = (t * 0.3 + i / 12) % 1; const sx = AX0 - 90 + ((i * 53) % 180), sy = DY - 100 + ph * 160; if (Math.hypot(sx - AX0, sy - DY) < 110) x.fillRect(sx, sy, 6, 6) }
            x.restore()
          }
        }
        K.burst(x, AX0, DY - 120, 90, t, B.pop, { word: 'POP!', size: 34, color: '#3ce6cf', life: 0.6 })
        K.sparkles(x, t, AX0, DY - 30, B.pop, 14, 150, 5, ['#bfe3ff', '#ffffff', K.GOLD])
        // chatter bubbles over the family
        bubbles.forEach((b, i) => { const p = K.prog(t, b, b + 0.9); if (p <= 0 || p >= 1) return; const bx = [GRX, M2, 640][i % 3] + (i % 2 ? 30 : -30), by = K.ACT_Y - 150 - p * 40; x.save(); x.globalAlpha *= Math.sin(Math.PI * p); x.fillStyle = K.INK; x.beginPath(); x.roundRect(bx - 44, by - 26, 88, 52, 20); x.fill(); x.fillStyle = K.BONE; x.beginPath(); x.roundRect(bx - 40, by - 22, 80, 44, 16); x.fill(); x.fillStyle = K.INK; for (let d = -1; d <= 1; d++) x.fillRect(bx + d * 20 - 5, by - 5, 10, 10); x.restore() })
        K.label(x, 'tap', AX0 + 100, DY - 90, 30, K.BONE, t > B.tap[0] && t < B.tap[0] + 0.3 ? 1 : 0, -0.15)
        K.label(x, 'tap', AX0 + 120, DY - 120, 30, K.BONE, t > B.tap[1] && t < B.tap[1] + 0.3 ? 1 : 0, 0.1)
        K.label(x, 'how did you two meet?', 450, K.ACT_Y - 190, 34, K.ME.color, K.prog(t, B.ask, B.ask + 0.15) * (1 - K.prog(t, B.laugh - 0.1, B.laugh + 0.2)))
        if (laughing && t < T.out[0]) { K.burst(x, aqX(t), K.ACT_Y - 190, 70, t, B.laugh, { word: 'HA!', size: 32, color: K.ME.color, life: 0.8 }); K.burst(x, GRX + 20, K.ACT_Y - 190, 70, t, B.laugh + 0.3, { word: 'HA!', size: 32, color: GRAN, life: 0.8 }) }
        if (t > B.laugh + 1) K.heart(x, (aqX(t) + GRX) / 2, K.ACT_Y - 180 + Math.sin(t * 2) * 6, 7 * K.pop01(t, B.laugh + 1, 0.35, 3) * K.popOut(t, T.out))
      },
      cues: [
        ...bubbles.map((b, i) => ['pop', b, [987.77, 1174.66, 880, 1318.51][i % 4], 0.018, i % 2 ? 0.3 : 0.1]),
        ['tick', B.tap[0], 0.05], ['tick', B.tap[1], 0.05], ['pop', B.pop, 1567.98, 0.05, -0.3], ['glitter', B.pop, B.pop + 0.5], ['whoosh', B.slide[0], 0.3, 0.03],
        ['pop', B.ask, 1174.66, 0.04, -0.1], ['pop', B.laugh, 1318.51, 0.04, -0.2], ['pop', B.laugh + 0.3, 1567.98, 0.04, 0.1], ['glitter', B.laugh + 1, B.laugh + 1.5],
      ],
    }
  },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, LINES_EXPORT = F.LINES_EXPORT
