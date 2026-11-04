// ngwe02 · Your Star Guide: Winter · ♉ Taurus · note 1 / 4 (how you love in winter) · 22 s (story 0–17.6, then the end card)
//   0.00–2.85  "*Taurus*, you love | like a *blanket*."  The ♉ guide, big, lantern lit, snow falling.
//   2.9–7.4    The lantern lights a little pixel couch in the snow. Taurus is a blanket burrito with a mug (sip… steam).
//              The lavender star shivers on the right. YOUR STAR: "you love in blankets, soup and slow sundays."
//   7.45–11.1  YOUR STAR: "invite them in. the couch has room."  Taurus spots them, scoots over (scoot, scoot), the blanket
//              opens like a wing, the lavender star hops in; a second mug pops into its hands.
//   11.15      card flip · "Make *room* | on the couch."  Two mugs, one steam heart. Pisces (right) sobs into its hat.
import { guideFilm } from '../../ngwe01/gwkit.js'

const F = guideFilm({
  id: 'ngwe02', sign: 'taurus', note: 1, len: 22,
  hook: '*Taurus,* you love | like a *blanket*.',
  lines: ['you love in blankets, soup and *slow sundays*.', 'invite them in. the couch has *room*.'],
  chip: 'TAURUS: FIXED EARTH,|RULED BY VENUS',
  last: 'Make *room* | on the couch.', late: 0,
  gag: (T, K) => {
    const B = { sip: 4.4, spot: 7.9, scoot: [8.35, 8.9], wing: [9.0, 9.35], hop: [9.5, 9.95], wrap: [10.0, 10.35], mug2: 10.45, heart: T.h2Land + 0.2 }
    const CX = 470, SEAT = K.ACT_Y + 6
    const tauX = t => K.lerp(420, 360, K.ease.outCubic(K.prog(t, ...B.scoot))) + (t > B.scoot[0] && t < B.scoot[1] ? Math.sin(t * 40) * 3 : 0)
    const themX = t => K.lerp(810, 560, K.ease.inOutCubic(K.prog(t, ...B.hop)))
    const themY = t => { const p = K.prog(t, ...B.hop); return K.lerp(K.ACT_Y, SEAT - 52, p) - Math.sin(Math.PI * p) * 90 }
    function couchBack(x, a) {
      x.save(); x.globalAlpha *= a
      x.fillStyle = K.INK; x.fillRect(CX - 254, SEAT - 106, 508, 120)
      x.fillStyle = '#8a4f86'; x.fillRect(CX - 248, SEAT - 100, 496, 110)
      x.fillStyle = '#a5649f'; x.fillRect(CX - 248, SEAT - 100, 496, 14)
      x.restore()
    }
    function couchFront(x, a) {
      x.save(); x.globalAlpha *= a
      x.fillStyle = K.INK; x.fillRect(CX - 276, SEAT + 24, 552, 64); x.fillRect(CX - 290, SEAT - 40, 56, 128); x.fillRect(CX + 234, SEAT - 40, 56, 128)
      x.fillStyle = '#7a4377'; x.fillRect(CX - 270, SEAT + 30, 540, 52)
      x.fillStyle = '#9b5c95'; x.fillRect(CX - 284, SEAT - 34, 44, 116); x.fillRect(CX + 240, SEAT - 34, 44, 116)
      x.fillStyle = '#b77ab0'; x.fillRect(CX - 284, SEAT - 34, 44, 10); x.fillRect(CX + 240, SEAT - 34, 44, 10)
      x.fillStyle = K.INK; x.fillRect(CX - 262, SEAT + 88, 18, 14); x.fillRect(CX + 244, SEAT + 88, 18, 14)
      x.restore()
    }
    /** the plaid blanket from x0 to x1, over the stars' lower halves */
    function blanket(x, x0, x1, a, lift = 0) {
      if (a <= 0.01) return
      const y0 = SEAT - 2 - lift, y1 = SEAT + 52
      x.save(); x.globalAlpha *= a
      x.fillStyle = K.INK; x.beginPath(); x.roundRect(x0 - 6, y0 - 6, x1 - x0 + 12, y1 - y0 + 12, 22); x.fill()
      x.fillStyle = '#d9694f'; x.beginPath(); x.roundRect(x0, y0, x1 - x0, y1 - y0, 18); x.fill()
      x.save(); x.beginPath(); x.roundRect(x0, y0, x1 - x0, y1 - y0, 18); x.clip()
      x.fillStyle = 'rgba(242,199,92,0.75)'
      for (let i = x0 + 18; i < x1; i += 44) x.fillRect(i, y0, 8, y1 - y0)
      for (let j = y0 + 16; j < y1; j += 26) x.fillRect(x0, j, x1 - x0, 6)
      x.restore(); x.restore()
    }
    return {
      draw(x, t) {
        const a = K.appear(t, T.scene + 0.05)
        if (a <= 0.01) return
        couchBack(x, a)
        const tx = tauX(t), cozy = t > B.wrap[1]
        // the lavender star: outside in the snow, then on the couch
        const thx = themX(t), thy = themY(t)
        K.mini(x, t, { x: thx + (cozy ? 0 : Math.sin(t * 46) * 2.5), y: thy, size: 150, color: K.THEM, mood: cozy ? 'happy' : t > B.wing[0] ? 'sparkle' : 'squint', look: [-1, 0], squash: cozy ? 0.12 : 0, seed: 9, pop: K.appear(t, T.scene + 0.3), bob: cozy ? 2 : undefined })
        K.mini(x, t, { x: tx, y: SEAT - 52, size: 160, color: K.ME.color, glyph: K.ME.glyph, mood: t < B.spot ? (t > B.sip && t < B.sip + 1.4 ? 'happy' : 'sleepy') : t < B.wrap[1] ? 'wide' : t < B.heart ? 'happy' : 'heart', zzz: false, look: t < B.spot ? [0, 0] : [1, 0], squash: 0.12, seed: 4, pop: a, bob: 2, hops: [B.scoot[0], B.wing[0]] })
        // blanket: Taurus's burrito → a wing → around both
        const wing = K.ease.outBack(K.prog(t, ...B.wing))
        const wrapP = K.ease.inOutCubic(K.prog(t, ...B.wrap))
        const right = K.lerp(tx + 92, tx + 92 + 150 * wing, 1) + (themX(t) + 95 - (tx + 92 + 150)) * wrapP
        blanket(x, tx - 92, Math.max(tx + 92, right), a, wing * (1 - wrapP) * 30)
        // mugs + steam
        const m1x = tx + 30, m1y = SEAT - 22 - (t > B.sip && t < B.sip + 1.4 ? 18 : 0)
        K.drawBits(x, K.BM.MUG, K.COL, m1x, m1y, 5 * a)
        K.steam(x, t, m1x - 4, m1y - 26, a * (cozy ? 0.5 : 1))
        if (t > B.mug2) {
          const p2 = K.pop01(t, B.mug2, 0.35, 2.6) * K.popOut(t, T.out)
          K.drawBits(x, K.BM.MUG, K.COL, thx - 34, SEAT - 22, 5 * p2, { flipX: true })
          K.steam(x, t, (m1x + thx - 34) / 2, SEAT - 56, p2 * 0.6, K.ease.outCubic(K.prog(t, B.heart, B.heart + 0.5)))
          K.sparkles(x, t, thx - 34, SEAT - 20, B.mug2, 8, 70, 3)
        }
        couchFront(x, a)
        K.label(x, 'scoot', tx - 70, SEAT - 130, 34, '#9fe6b0', K.prog(t, B.scoot[0], B.scoot[0] + 0.1) * (1 - K.prog(t, B.scoot[0] + 0.5, B.scoot[0] + 0.7)), -0.15)
        K.label(x, 'scoot', tx - 20, SEAT - 160, 34, '#9fe6b0', K.prog(t, B.scoot[0] + 0.3, B.scoot[0] + 0.4) * (1 - K.prog(t, B.scoot[1] + 0.2, B.scoot[1] + 0.4)), 0.1)
        K.label(x, 'sip…', m1x + 40, m1y - 70, 30, K.BONE, K.prog(t, B.sip, B.sip + 0.15) * (1 - K.prog(t, B.sip + 1.1, B.sip + 1.4)))
      },
      cues: [
        ['pluck', T.scene + 0.2, 587.33, 0.03, 0.6, 0], ['pop', B.sip, 659.25, 0.03, -0.2], ['tick', B.sip + 0.4, 0.02],
        ['pop', B.spot, 1318.51, 0.035, 0.2], ['tick', B.scoot[0], 0.04], ['tick', B.scoot[0] + 0.3, 0.04],
        ['whoosh', B.wing[0], 0.35, 0.035], ['pop', B.hop[0], 880, 0.035, 0.3], ['pop', B.hop[1], 1174.66, 0.035, 0], ['whoosh', B.wrap[0], 0.3, 0.03],
        ['pop', B.mug2, 1567.98, 0.035, 0.2], ['glitter', B.mug2, B.mug2 + 0.4], ['pop', B.heart, 1318.51, 0.035, 0],
      ],
    }
  },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, LINES_EXPORT = F.LINES_EXPORT
