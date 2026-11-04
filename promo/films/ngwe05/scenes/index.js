// ngwe05 · Your Star Guide: Winter · ♌ Leo · note 1 / 4 (how you love in winter) · 20 s (story 0–17.6, then the short end card)
//   0.00–2.85  "*Leo,* you love | like a *fireplace.*"  The ♌ guide, big, lantern lit, snow falling.
//   2.9–7.4    A pixel fireplace crackles in the snow; Leo sits on the warm cushion beside it, glowing, posing. The
//              lavender star shivers out in the cold. YOUR STAR: "you light up every cold room you walk into."
//   7.45–11.1  YOUR STAR: "save the warmest seat for them."  Leo hops up and pats the cushion (pat, pat); the lavender
//              star hops on; Leo sits beside it and both glow.
//   11.15      "Glow *with* them."  Two stars glowing by the fire. Pisces sobs in the snow.
import { guideFilm } from '../../ngwe01/gwkit.js'

const F = guideFilm({
  id: 'ngwe05', sign: 'leo', note: 1, len: 22,
  hook: '*Leo,* you love | like a *fireplace.*',
  lines: ['you light up every *cold room* you walk into.', 'save the *warmest seat* for them.'],
  chip: 'LEO: FIXED FIRE,|RULED BY THE SUN',
  last: 'Glow *with* them.', late: 1, lastSize: 104,
  gag: (T, K) => {
    const B = { pose: [3.6, 5.2, 6.6], up: 8.0, pat: [8.5, 8.85], hop: [9.25, 9.75], sit: [9.9, 10.35] }
    const FX = 240, FY = K.GROUND - 110, CUSH = 520
    const leoX = t => t < B.up ? CUSH : t < B.sit[0] ? K.lerp(CUSH, 700, K.ease.outCubic(K.prog(t, B.up, B.up + 0.35))) : K.lerp(700, 690, K.prog(t, ...B.sit))
    const themX = t => K.lerp(820, CUSH, K.ease.inOutCubic(K.prog(t, ...B.hop)))
    function fireplace(x, t, a) {
      x.save(); x.globalAlpha *= a
      const g = x.createRadialGradient(FX, FY + 30, 20, FX, FY + 30, 420); g.addColorStop(0, 'rgba(255,150,60,0.35)'); g.addColorStop(1, 'rgba(255,150,60,0)')
      x.fillStyle = g; x.fillRect(FX - 420, FY - 400, 840, 700)
      x.fillStyle = K.INK; x.fillRect(FX - 136, FY - 124, 272, 236)
      for (let j = 0; j < 7; j++) for (let i = 0; i < 6; i++) { x.fillStyle = (i + j) % 3 ? '#a8423a' : '#8c332e'; x.fillRect(FX - 130 + i * 44 + (j % 2) * 22 - (j % 2 && i === 5 ? 22 : 0), FY - 118 + j * 32, 40, 28) }
      x.fillStyle = '#5a4a3a'; x.fillRect(FX - 150, FY - 134, 300, 22)
      x.fillStyle = '#140c1e'; x.fillRect(FX - 70, FY - 40, 140, 150)
      // flames
      for (let i = 0; i < 7; i++) {
        const h = 50 + 34 * Math.abs(Math.sin(t * 7 + i * 1.7)) + 10 * Math.sin(t * 13 + i)
        const fx = FX - 56 + i * 18
        x.fillStyle = '#ff7a2a'; x.fillRect(fx, FY + 100 - h, 16, h)
        x.fillStyle = '#ffd34d'; x.fillRect(fx + 3, FY + 100 - h * 0.6, 10, h * 0.6)
      }
      x.fillStyle = '#6b4423'; x.fillRect(FX - 60, FY + 92, 120, 16)
      x.restore()
    }
    function cushion(x, a) {
      x.save(); x.globalAlpha *= a; x.fillStyle = K.INK; x.beginPath(); x.roundRect(CUSH - 104, K.GROUND - 42, 208, 50, 20); x.fill()
      x.fillStyle = '#d9694f'; x.beginPath(); x.roundRect(CUSH - 98, K.GROUND - 36, 196, 38, 16); x.fill()
      x.fillStyle = '#f2c75c'; x.fillRect(CUSH - 98, K.GROUND - 22, 196, 6); x.restore()
    }
    return {
      draw(x, t) {
        const a = K.appear(t, T.scene + 0.05)
        if (a <= 0.01) return
        fireplace(x, t, Math.min(1, a))
        cushion(x, Math.min(1, a))
        const seated = t > B.hop[1], lx = leoX(t), tx = themX(t)
        const posing = t < B.up
        const glowL = posing ? 1.6 + 0.3 * Math.sin(t * 4) : 1.1
        K.mini(x, t, { x: tx + (seated ? 0 : Math.sin(t * 46) * 2.5), y: seated ? K.ACT_Y - 24 : K.ACT_Y, size: 150, color: K.THEM, mood: seated ? 'happy' : t > B.pat[0] ? 'sparkle' : 'squint', look: [-1, 0], seed: 9, pop: K.appear(t, T.scene + 0.3), glow: seated ? 1.2 : 0.5 })
        K.mini(x, t, { x: lx, y: t < B.up ? K.ACT_Y - 24 : t < B.sit[0] ? K.ACT_Y : K.lerp(K.ACT_Y, K.ACT_Y - 10, K.prog(t, ...B.sit)), size: 160, color: K.ME.color, glyph: K.ME.glyph, mood: posing ? (Math.floor(t * 0.7) % 2 ? 'wink' : 'sparkle') : t < B.hop[1] ? 'happy' : 'heart', look: posing ? [0, 0] : [-1, 0], seed: 4, pop: a, glow: glowL, hops: [...B.pose, B.up, ...B.pat, B.sit[0]] })
        B.pose.forEach(p => K.sparkles(x, t, lx, K.ACT_Y - 60, p, 8, 110, p))
        K.label(x, 'pat', CUSH + 40, K.GROUND - 90, 34, K.GOLD, K.prog(t, B.pat[0], B.pat[0] + 0.1) * (1 - K.prog(t, B.pat[0] + 0.6, B.pat[0] + 0.8)), -0.15)
        K.label(x, 'pat', CUSH + 110, K.GROUND - 120, 34, K.GOLD, K.prog(t, B.pat[1], B.pat[1] + 0.1) * (1 - K.prog(t, B.pat[1] + 0.6, B.pat[1] + 0.8)), 0.12)
        K.label(x, 'brr', 850, K.ACT_Y - 120, 32, K.ICE, K.prog(t, 3.6, 3.75) * (1 - K.prog(t, B.hop[0], B.hop[0] + 0.2)), 0.1)
        if (t > B.sit[1]) K.heart(x, (lx + tx) / 2, K.ACT_Y - 170 - Math.sin(t * 2) * 6, 7 * K.pop01(t, B.sit[1], 0.35, 3) * K.popOut(t, T.out))
      },
      cues: [
        ['pluck', T.scene + 0.1, 293.66, 0.03, 0.8, -0.3], ...B.pose.map(p => ['glitter', p, p + 0.3]),
        ['pop', B.up, 880, 0.035, 0], ...B.pat.map(p => ['tick', p, 0.05]), ['pop', B.hop[0], 987.77, 0.035, 0.3], ['pop', B.hop[1], 1318.51, 0.035, 0],
        ['pop', B.sit[1], 1567.98, 0.035, 0.1], ['glitter', B.sit[1], B.sit[1] + 0.5],
      ],
    }
  },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, LINES_EXPORT = F.LINES_EXPORT
