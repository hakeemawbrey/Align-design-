// ngwe08 · Your Star Guide: Winter · ♏ Scorpio · note 1 / 4 (how you love in winter) · 22 s (story 0–17.6, then the end card)
//   0.00–2.85  "*Scorpio,* you love | by *candlelight.*"  The ♏ guide, big, lantern lit, snow falling.
//   2.9–7.4    A candle lights in the snow between Scorpio (bundled in FIVE scarves, up to the eyes) and the lavender
//              star. Scorpio gives a long, mysterious side-eye. YOUR STAR: "long nights suit you. deep talk, low light."
//   7.45–11.1  YOUR STAR: "let them past the first layer. slowly."  One, two, three: a scarf at a time comes off Scorpio
//              and wraps round the lavender star. They lean in over the candle.
//   11.15      card flip · "One *layer* | at a time."  A heart rises from the flame. Pisces sobs in the snow.
import { guideFilm } from '../../ngwe01/gwkit.js'

const BANDS = ['#7a2a4a', '#3a2f63', '#c42a3f', '#2a7a4b', '#d9694f']
const F = guideFilm({
  id: 'ngwe08', sign: 'scorpio', note: 1, len: 22,
  hook: '*Scorpio,* you love | by *candlelight.*',
  lines: ['long nights suit you. *deep talk*, low light.', 'let them past the *first layer*. slowly.'],
  chip: 'SCORPIO: FIXED WATER,|RULED BY MARS (MODERN: PLUTO)',
  last: 'One *layer* | at a time.', late: 0,
  gag: (T, K) => {
    const B = { light: 3.3, eye: [4.4, 6.6], give: [8.0, 8.85, 9.7], lean: [10.5, 11.0], heart: T.h2Land + 0.1 }
    const SX = 320, CX = 545, TX = 770
    const given = t => B.give.filter(g => t > g + 0.5).length
    function bands(x, cx, n, w, from = 0) {
      for (let i = from; i < from + n; i++) {
        const y = K.ACT_Y + 52 - (i - from) * 9
        x.fillStyle = K.INK; x.fillRect(cx - w / 2 - 4, y - 3, w + 8, 17)
        x.fillStyle = BANDS[i % 5]; x.fillRect(cx - w / 2, y, w, 11)
        x.fillStyle = 'rgba(255,255,255,0.25)'; for (let k = -w / 2 + 8; k < w / 2; k += 22) x.fillRect(cx + k, y, 6, 11)
      }
    }
    const lean = t => K.ease.inOutCubic(K.prog(t, ...B.lean)) * 40
    return {
      draw(x, t) {
        const a = K.appear(t, T.scene + 0.05)
        if (a <= 0.01) return
        // the candle + its glow
        const cp = K.pop01(t, T.scene + 0.15, 0.4, 2.2) * K.popOut(t, T.out)
        const fl = K.prog(t, B.light, B.light + 0.2)
        if (cp > 0.01) {
          const g = x.createRadialGradient(CX, K.GROUND - 90, 10, CX, K.GROUND - 90, 300); g.addColorStop(0, `rgba(255,190,90,${0.35 * fl})`); g.addColorStop(1, 'rgba(255,190,90,0)')
          x.fillStyle = g; x.fillRect(CX - 300, K.GROUND - 390, 600, 500)
          K.drawBits(x, ['.WWW.', '.WWW.', '.WWW.', '.WWW.', '.WWW.', 'BBBBB'], K.COL, CX, K.GROUND - 40, 9 * cp)
          if (fl > 0) { const f = 1 + 0.15 * Math.sin(t * 17); x.save(); x.fillStyle = '#ff9a4a'; x.beginPath(); x.ellipse(CX, K.GROUND - 108, 11 * f * fl, 22 * f * fl, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#ffe9a8'; x.beginPath(); x.ellipse(CX, K.GROUND - 102, 5 * fl, 11 * fl, 0, 0, Math.PI * 2); x.fill(); x.restore() }
        }
        const n = given(t), ln = lean(t)
        const side = t > B.eye[0] && t < B.eye[1]
        K.mini(x, t, { x: TX - ln, size: 150, color: K.THEM, mood: n >= 3 ? 'happy' : n > 0 ? 'sparkle' : side ? 'wide' : 'neutral', look: [-1, 0], seed: 9, pop: K.appear(t, T.scene + 0.25), hops: B.give.map(g => g + 0.5) })
        K.mini(x, t, { x: SX + ln, size: 160, color: K.ME.color, glyph: null, mood: t > B.heart ? 'heart' : side ? 'squint' : n > 0 ? 'happy' : 'neutral', look: side ? [1, 0] : [1, 0], seed: 4, pop: a, hops: B.give })
        const bp = Math.min(a, K.popOut(t, T.out))
        x.save(); x.globalAlpha *= bp
        bands(x, SX + ln, 5 - n, 120, 0)
        bands(x, TX - ln, n, 112, 2)
        x.restore()
        // the scarf in flight
        B.give.forEach((g, i) => {
          const p = K.prog(t, g, g + 0.5); if (p <= 0 || p >= 1) return
          const fx = K.lerp(SX + 40, TX - 20, K.ease.inOutCubic(p)), fy = K.ACT_Y + 20 - Math.sin(Math.PI * p) * 170
          x.save(); x.translate(fx, fy); x.rotate(Math.sin(p * 9) * 0.5); x.fillStyle = K.INK; x.fillRect(-64, -10, 128, 20); x.fillStyle = BANDS[(4 - i) % 5]; x.fillRect(-60, -6, 120, 12); x.restore()
        })
        K.label(x, ['one', 'two', 'three'][Math.max(0, Math.min(2, B.give.findIndex(g => t < g + 0.75)))], CX, K.ACT_Y - 190, 40, K.ME.color, t > B.give[0] && t < B.give[2] + 0.75 ? 1 : 0)
        K.label(x, '…', SX + 70, K.ACT_Y - 120, 60, K.BONE, side ? 1 : 0)
        if (t > B.heart) { const hp = K.prog(t, B.heart, B.heart + 2.5); K.heart(x, CX, K.GROUND - 150 - hp * 60, 7 * K.pop01(t, B.heart, 0.35, 3) * K.popOut(t, T.out)) }
      },
      cues: [
        ['pop', B.light, 587.33, 0.035, 0], ['glitter', B.light, B.light + 0.3], ['pluck', B.eye[0], 220, 0.035, 1.0, -0.3],
        ...B.give.flatMap((g, i) => [['whoosh', g, 0.4, 0.03], ['pop', g + 0.5, [880, 987.77, 1174.66][i], 0.035, 0.3]]),
        ['pop', B.heart, 1318.51, 0.04, 0], ['glitter', B.heart, B.heart + 0.5],
      ],
    }
  },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, LINES_EXPORT = F.LINES_EXPORT
