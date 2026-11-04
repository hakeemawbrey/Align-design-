// ngwe13 · Your Star Guide: Winter · ♈ Aries · note 2 / 4 (your holiday blind spot) · 25 s (story 0–20.6, then the end card)
//   0.00–2.85  "*Aries,* about your | *holiday* plans…"  The ♈ guide, big, lantern lit, snow falling.
//   2.9–7.1    Three party invitations flutter in; Aries stamps each one YES! ×2 (KA-CHUNK). Over the lavender star, its
//              calendar fills: FRI · PARTY, SAT · PARTY, SUN · PARTY. It goes wide-eyed (sweat drop).
//              YOUR STAR: "you said yes to three parties. for two."
//   7.15–10.8  Aries freezes mid-stamp, looks at the calendar, looks at them. YOUR STAR: "their calendar isn't yours to fill."
//   10.85–14.5 YOUR STAR: "ask first. then say yes together."  The calendar clears; Aries fans the invitations out to them
//              ("you pick?"); the lavender star taps one: it glows and the calendar gets ONE party, in both colours.
//   14.55      card flip · "Ask, *then* RSVP."  Both hop. Pisces sobs in the snow.
import { guideFilm } from '../../ngwe01/gwkit.js'

const DAYS = ['FRI', 'SAT', 'SUN']
const F = guideFilm({
  id: 'ngwe13', sign: 'aries', note: 2, len: 25,
  hook: '*Aries,* about your | *holiday* plans…',
  lines: ['you said yes to *three* parties. for two.', "their calendar isn't *yours* to fill.", 'ask first. then say yes *together*.'],
  chip: 'ARIES: SYMBOL, THE RAM.|RULER OF THE 1ST HOUSE (SELF)',
  last: 'Ask, *then* RSVP.', late: 1, lastSize: 104,
  gag: (T, K) => {
    const B = { inv: [3.2, 4.0, 4.8], stamp: [3.5, 4.3, 5.1], gulp: 5.9, freeze: 7.6, look: [8.2, 9.3], clear: 11.2, fan: [11.6, 12.2], ask: 12.3, pick: 13.0, one: 13.4, hop: 13.8 }
    const AX = 250, CALX = 760, CALY = 1010
    const invPos = (t, i) => {
      const base = { x: 470 + i * 14, y: 1015 + i * 56, r: -0.12 + i * 0.1 }
      const fan = { x: 450 + i * 100, y: 1150 - (i === 1 ? 24 : 0), r: -0.16 + i * 0.16 }
      const p = K.ease.inOutCubic(K.prog(t, ...B.fan))
      return { x: K.lerp(base.x, fan.x, p), y: K.lerp(base.y, fan.y, p) - (i === 1 && t > B.pick ? 30 * K.ease.outBack(K.prog(t, B.pick, B.pick + 0.3)) : 0), r: K.lerp(base.r, fan.r, p) }
    }
    return {
      draw(x, t) {
        const a = K.appear(t, T.scene + 0.05)
        if (a <= 0.01) return
        // the calendar over them
        const cp = K.pop01(t, T.scene + 0.3, 0.35, 2.2) * K.popOut(t, T.out)
        if (cp > 0.01) {
          x.save(); x.translate(CALX, CALY); x.scale(cp, cp)
          x.fillStyle = K.INK; x.fillRect(-140, -78, 280, 156); x.fillStyle = '#f5eedf'; x.fillRect(-134, -72, 268, 144); x.fillStyle = '#c42a3f'; x.fillRect(-134, -72, 268, 30)
          x.fillStyle = '#ffffff'; x.font = "700 20px 'Space Mono', monospace"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THIS WEEKEND', 0, -57)
          DAYS.forEach((d, i) => {
            const dx = -88 + i * 88
            x.fillStyle = '#6c5a8a'; x.font = "800 18px Inter"; x.fillText(d, dx, -24)
            const on = t > B.stamp[i] + 0.15 && t < B.clear, one = i === 1 && t > B.one
            const k = one ? K.pop01(t, B.one, 0.3, 2.6) : on ? K.pop01(t, B.stamp[i] + 0.15, 0.3, 2.6) * (1 - K.prog(t, B.clear - 0.25, B.clear)) : 0
            if (k > 0.01) { x.save(); x.translate(dx, 22); x.scale(k, k); x.fillStyle = K.INK; x.fillRect(-38, -26, 76, 52); x.fillStyle = one ? K.ME.color : '#ff8fb1'; x.fillRect(-34, -22, 68, 44); if (one) { x.fillStyle = K.THEM; x.fillRect(0, -22, 34, 44) } x.fillStyle = K.INK; x.font = "800 15px Inter"; x.fillText('PARTY', 0, 1); x.restore() }
          })
          x.restore()
        }
        // the lavender star
        const panic = t > B.gulp && t < B.clear
        K.mini(x, t, { x: 800, size: 150, color: K.THEM, mood: t > B.pick ? 'happy' : t > B.ask ? 'sparkle' : panic ? 'wide' : 'neutral', look: t > B.fan[0] ? [-1, 0] : [0, -1], seed: 9, pop: K.appear(t, T.scene + 0.25), hops: [B.pick, B.hop + 0.1], squash: panic ? 0.04 * Math.sin(t * 40) : 0 })
        if (panic) { const ph = ((t - B.gulp) * 1.2) % 1; x.fillStyle = K.INK; x.fillRect(868, K.ACT_Y - 82 + ph * 30, 18, 26); x.fillStyle = '#8fe3ff'; x.fillRect(871, K.ACT_Y - 79 + ph * 30, 12, 20) }
        // Aries + the stamp
        const frozen = t > B.freeze && t < B.clear
        const stampI = B.stamp.findIndex(s => t > s - 0.3 && t < s + 0.25)
        K.mini(x, t, { x: AX, size: 160, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.pick ? 'heart' : t > B.ask ? 'sparkle' : frozen ? (t > B.look[0] ? 'wide' : 'squint') : 'happy', look: frozen ? (t < B.look[1] ? [1, -1] : [1, 0]) : [1, 0], seed: 4, pop: a, hops: [...B.stamp, B.ask, B.hop], blink: frozen ? false : undefined })
        // invitations
        B.inv.forEach((v, i) => {
          if (t < v) return
          const p = K.pop01(t, v, 0.35, 2.2) * K.popOut(t, T.out)
          const q = invPos(t, i)
          const dim = t > B.pick && i !== 1 ? 1 - 0.6 * K.prog(t, B.pick, B.pick + 0.3) : 1
          x.save(); x.globalAlpha *= dim; x.translate(q.x, q.y); x.rotate(q.r); x.scale(p, p)
          if (i === 1 && t > B.pick) { x.shadowColor = K.GOLD; x.shadowBlur = 30 }
          x.fillStyle = K.INK; x.fillRect(-74, -46, 148, 92); x.shadowBlur = 0; x.fillStyle = '#f5eedf'; x.fillRect(-68, -40, 136, 80)
          x.fillStyle = '#6c5a8a'; x.font = "800 18px Inter"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(['COCOA NIGHT', 'LIGHTS WALK', 'CARD PARTY'][i], 0, -18)
          if (t > B.stamp[i]) { const s = K.ease.outBack(K.prog(t, B.stamp[i], B.stamp[i] + 0.15)); x.save(); x.rotate(-0.2); x.scale(s, s); x.strokeStyle = '#c42a3f'; x.lineWidth = 4; x.strokeRect(-48, 2, 96, 34); x.fillStyle = '#c42a3f'; x.font = "800 22px Inter"; x.fillText('YES ×2', 0, 20); x.restore() }
          x.restore()
        })
        // the stamp itself
        if (stampI >= 0 && t < B.freeze) {
          const s = B.stamp[stampI], q = invPos(t, stampI), d = t < s ? 1 - K.prog(t, s - 0.3, s) : K.prog(t, s, s + 0.25)
          x.save(); x.translate(q.x, q.y - 20 - d * 90); x.fillStyle = K.INK; x.fillRect(-12, -70, 24, 50); x.fillRect(-34, -24, 68, 26); x.fillStyle = '#c96f2f'; x.fillRect(-8, -66, 16, 44); x.fillStyle = '#c42a3f'; x.fillRect(-30, -20, 60, 18); x.restore()
        }
        B.stamp.forEach(s => K.burst(x, 560, 900, 70, t, s, { word: 'YES!', size: 30, color: '#ff9a7a', life: 0.5 }))
        K.label(x, '…', AX + 70, K.ACT_Y - 130, 64, K.BONE, frozen ? 1 : 0)
        K.label(x, 'you pick?', AX + 120, K.ACT_Y - 160, 38, K.ME.color, K.prog(t, B.ask, B.ask + 0.15) * (1 - K.prog(t, B.pick + 0.5, B.pick + 0.8)))
      },
      cues: [
        ...B.inv.map(v => ['whoosh', v, 0.3, 0.025]), ...B.stamp.flatMap((s, i) => [['boom', s, 0.07], ['pop', s, [880, 987.77, 1174.66][i], 0.04, -0.2], ['pop', s + 0.15, 1318.51, 0.03, 0.4]]),
        ['pluck', B.gulp, 293.66, 0.04, 0.5, 0.4], ['tick', B.freeze, 0.05], ['pop', B.look[0], 659.25, 0.03, 0], ['whoosh', B.clear, 0.4, 0.03],
        ['whoosh', B.fan[0], 0.4, 0.03], ['pop', B.ask, 1174.66, 0.035, -0.2], ['pop', B.pick, 1567.98, 0.045, 0.2], ['glitter', B.pick, B.pick + 0.4], ['pop', B.one, 1318.51, 0.04, 0.4],
      ],
    }
  },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, LINES_EXPORT = F.LINES_EXPORT
