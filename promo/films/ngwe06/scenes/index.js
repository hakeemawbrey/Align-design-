// ngwe06 · Your Star Guide: Winter · ♍ Virgo · note 1 / 4 (how you love in winter) · 20 s (story 0–17.6, then the short end card)
//   0.00–2.85  "*Virgo*'s winter love | has a *checklist.*"  The ♍ guide, big, lantern lit, snow falling.
//   2.9–7.4    A clipboard floats between Virgo (pencil) and the lavender star. Tick: a red scarf appears on them. Tick:
//              mittens. Tick: a backup scarf (very bundled). YOUR STAR: "scarf, gloves, a backup scarf. for them."
//   7.45–11.1  YOUR STAR: "the list is love. say the words too."  Virgo writes a fourth line, "tell them", ticks it, and a
//              speech bubble with a heart floats over to the lavender star.
//   11.15      "Pack the scarf. | *Say* the thing."  The bundled star beams. Pisces sobs in the snow.
import { guideFilm } from '../../ngwe01/gwkit.js'

const ITEMS = ['scarf', 'gloves', 'backup scarf', 'tell them']
const F = guideFilm({
  id: 'ngwe06', sign: 'virgo', note: 1, len: 22,
  hook: "*Virgo*'s winter love | has a *checklist.*",
  lines: ['scarf, gloves, a *backup* scarf. for them.', 'the list is love. *say the words* too.'],
  chip: 'VIRGO: MUTABLE EARTH,|RULED BY MERCURY',
  last: 'Pack the scarf. | *Say* the thing.', late: 0, lastSize: 104,
  gag: (T, K) => {
    const B = { board: 3.1, tick: [3.9, 4.9, 5.9, 9.3], write: [8.2, 9.0], bubble: [9.6, 10.6] }
    const CBX = 545, CBY = 1100, TX = 800
    function clipboard(x, t, a) {
      x.save(); x.globalAlpha *= a; x.translate(CBX, CBY); x.rotate(-0.04 + 0.015 * Math.sin(t * 1.8))
      x.fillStyle = K.INK; x.fillRect(-128, -158, 256, 316)
      x.fillStyle = '#8a5a33'; x.fillRect(-122, -152, 244, 304)
      x.fillStyle = '#f5eedf'; x.fillRect(-108, -128, 216, 270)
      x.fillStyle = K.INK; x.fillRect(-46, -170, 92, 34); x.fillStyle = '#9aa3b8'; x.fillRect(-40, -164, 80, 22)
      x.font = "800 22px 'Space Mono', monospace"; x.textAlign = 'left'; x.textBaseline = 'middle'
      x.fillStyle = '#6c5a8a'; x.fillText('FOR THEM:', -96, -104)
      ITEMS.forEach((it, i) => {
        const y = -56 + i * 52
        let shown = it
        if (i === 3) { const p = K.prog(t, ...B.write); if (p <= 0) return; shown = it.slice(0, Math.ceil(p * it.length)) }
        x.strokeStyle = K.INK; x.lineWidth = 3; x.strokeRect(-96, y - 13, 26, 26)
        x.fillStyle = i === 3 ? '#c42a3f' : '#2c2a7a'; x.font = `800 ${i === 2 ? 22 : 25}px Inter`; x.fillText(shown, -58, y + 1)
        const tk = K.prog(t, B.tick[i], B.tick[i] + 0.18)
        if (tk > 0) { x.strokeStyle = '#3fae6a'; x.lineWidth = 6; x.beginPath(); x.moveTo(-94, y); x.lineTo(-86, y + 10); if (tk > 0.5) x.lineTo(-86 + (tk - 0.5) * 2 * 22, y + 10 - (tk - 0.5) * 2 * 26); x.stroke() }
      })
      x.restore()
    }
    return {
      draw(x, t) {
        const a = K.appear(t, T.scene + 0.05)
        if (a <= 0.01) return
        const ticking = B.tick.some(k => t > k - 0.25 && t < k + 0.25) || (t > B.write[0] && t < B.write[1])
        const vx = 250
        K.mini(x, t, { x: vx, size: 160, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.bubble[1] ? 'happy' : ticking ? 'squint' : 'neutral', look: [1, -0.4], seed: 4, pop: a, hops: B.tick, squash: ticking ? 0.05 * Math.sin(t * 30) : 0 })
        // the pencil
        const px = vx + 86 + (ticking ? Math.sin(t * 32) * 8 : 0), py = K.ACT_Y - 40
        x.save(); x.translate(px, py); x.rotate(-0.6); x.fillStyle = K.INK; x.fillRect(-9, -50, 18, 92); x.fillStyle = '#ffd34d'; x.fillRect(-5, -46, 10, 70); x.fillStyle = '#ff8fb1'; x.fillRect(-5, -46, 10, 12); x.fillStyle = '#e8b47c'; x.fillRect(-5, 24, 10, 10); x.fillStyle = K.INK; x.fillRect(-2, 34, 4, 6); x.restore()
        clipboard(x, t, K.pop01(t, B.board, 0.4, 2.2) * K.popOut(t, [T.close - 0.2, T.close + 0.2]))
        // the lavender star, getting bundled
        const thy = K.ACT_Y, bundled = t > B.tick[2]
        K.mini(x, t, { x: TX, y: thy, size: 150, color: K.THEM, mood: t > B.bubble[1] ? 'heart' : bundled ? 'wide' : 'neutral', look: [-1, 0], seed: 9, pop: K.appear(t, T.scene + 0.3), hops: B.tick.slice(0, 3).map(v => v + 0.1), squash: bundled ? 0.06 : 0 })
        const sc1 = K.pop01(t, B.tick[0] + 0.1, 0.3, 2.6) * K.popOut(t, T.out)
        if (sc1 > 0.01) { x.save(); x.fillStyle = K.INK; x.fillRect(TX - 62 * sc1, thy + 36, 124 * sc1, 30); x.fillStyle = '#e2453c'; x.fillRect(TX - 58 * sc1, thy + 40, 116 * sc1, 22); x.fillStyle = '#f5eedf'; for (let i = -2; i <= 2; i++) x.fillRect(TX + i * 24 * sc1 - 4, thy + 40, 8, 22); x.fillStyle = K.INK; x.fillRect(TX + 24, thy + 60, 26, 40 * sc1); x.fillStyle = '#e2453c'; x.fillRect(TX + 28, thy + 60, 18, 36 * sc1); x.restore() }
        const mt = K.pop01(t, B.tick[1] + 0.1, 0.3, 2.6) * K.popOut(t, T.out)
        if (mt > 0.01) for (const s of [-1, 1]) K.drawBits(x, K.BM.MITTEN, { ...K.COL, R: '#3fae6a' }, TX + s * 66, thy - 6, 3.8 * mt, { flipX: s > 0 })
        const sc2 = K.pop01(t, B.tick[2] + 0.1, 0.3, 2.6) * K.popOut(t, T.out)
        if (sc2 > 0.01) { x.save(); x.fillStyle = K.INK; x.fillRect(TX - 66 * sc2, thy + 16, 132 * sc2, 26); x.fillStyle = '#3ce6cf'; x.fillRect(TX - 62 * sc2, thy + 20, 124 * sc2, 18); x.fillStyle = '#23a796'; for (let i = -2; i <= 2; i++) x.fillRect(TX + i * 24 * sc2 - 4, thy + 20, 8, 18); x.restore() }
        // the speech bubble with a heart
        if (t > B.bubble[0]) {
          const p = K.ease.inOutCubic(K.prog(t, ...B.bubble)), k = K.pop01(t, B.bubble[0], 0.3, 2.4) * K.popOut(t, T.out)
          const bx = K.lerp(vx + 40, TX - 40, p), by = K.ACT_Y - 170 - Math.sin(Math.PI * p) * 50
          x.save(); x.translate(bx, by); x.scale(k, k); x.fillStyle = K.INK; x.beginPath(); x.roundRect(-58, -42, 116, 84, 30); x.fill(); x.fillRect(-30, 30, 22, 26)
          x.fillStyle = K.BONE; x.beginPath(); x.roundRect(-52, -36, 104, 72, 26); x.fill(); x.fillRect(-26, 30, 14, 18); x.restore()
          K.heart(x, bx, by, 7 * k)
        }
      },
      cues: [
        ['pop', B.board, 880, 0.03, 0], ...B.tick.map((k, i) => ['pluck', k, [1174.66, 1318.51, 1567.98, 1760][i], 0.04, 0.3, -0.1]),
        ...B.tick.slice(0, 3).map((k, i) => ['pop', k + 0.1, [659.25, 739.99, 880][i], 0.03, 0.4]),
        ['tick', B.write[0], 0.03], ['tick', B.write[0] + 0.25, 0.03], ['tick', B.write[0] + 0.5, 0.03], ['tick', B.write[0] + 0.75, 0.03],
        ['whoosh', B.bubble[0], 0.5, 0.03], ['pop', B.bubble[1], 1318.51, 0.04, 0.3], ['glitter', B.bubble[1], B.bubble[1] + 0.4],
      ],
    }
  },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, LINES_EXPORT = F.LINES_EXPORT
