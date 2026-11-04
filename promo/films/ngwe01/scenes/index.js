// ngwe01 · Your Star Guide: Winter · ♈ Aries · note 1 / 4 (how you love in winter) · 22 s (story 0–17.6, then the end card)
//   0.00–2.85  "*Aries* in winter: | first one *outside*."  The ♈ guide, big, lantern lit, snow falling.
//   2.9–5.8    The guide lifts; its lantern lights a snowy hill. Aries ZOOMS past on a sled (WHOOSH!), then SKRRTs back.
//              The lavender star shivers on the left. YOUR STAR: "first snow and you're already out there."
//   7.45–10.3  YOUR STAR: "warm their hands before you race the hill."  Aries hops off, holds out red mittens, they fly
//              onto the lavender star's tips; a heart. Both hop onto the sled.
//   11.15      card flip · "Race the hill | *together*."  The sled glides off left with both aboard; Pisces (right) sobs.
import { guideFilm } from '../gwkit.js'

const SLED = ['Y..........', 'Y.CCCCCCCCC', '.YcccccccccY', '..R..R..R..', 'RRRRRRRRRRR.']
const SLED_C = { C: '#c08552', c: '#8a5a33', R: '#e2453c', Y: '#e2453c' }

const F = guideFilm({
  id: 'ngwe01', sign: 'aries', note: 1, len: 22,
  hook: '*Aries* in winter: | first one *outside*.',
  lines: ["first snow and you're *already* out there.", 'warm their hands *before* you race the hill.'],
  chip: 'ARIES: CARDINAL FIRE,|RULED BY MARS',
  last: 'Race the hill | *together*.',
  gag: (T, K) => {
    const B = { zoom: [3.0, 4.5], back: [5.0, 5.7], hopOff: [7.75, 8.25], hold: 8.5, give: [9.0, 9.4], heart: 9.45,
      board: [10.0, 10.45], glide: [11.4, 16.9] }
    const THEM_X0 = 300, STOP = 640
    const sledX = t => t < B.zoom[1] ? K.lerp(-220, 1320, K.prog(t, ...B.zoom))
      : t < B.back[0] ? 1400
      : t < B.glide[0] ? K.lerp(1320, STOP, K.ease.outCubic(K.prog(t, ...B.back)))
      : K.lerp(STOP, 330, K.ease.inOutCubic(K.prog(t, ...B.glide)))
    const dir = t => t < B.back[0] ? 1 : -1
    const ariesX = t => {
      const s = sledX(t)
      if (t < B.hopOff[0]) return s
      if (t < B.board[0]) return K.lerp(s, THEM_X0 + 130, K.ease.inOutCubic(K.prog(t, ...B.hopOff)))
      return K.lerp(THEM_X0 + 130, s - 85, K.ease.inOutCubic(K.prog(t, ...B.board))) + (t > B.board[1] ? (s - 85) - K.lerp(THEM_X0 + 130, s - 85, 1) : 0)
    }
    const themX = t => t < B.board[0] ? THEM_X0 : K.lerp(THEM_X0, sledX(t) + 95, K.ease.inOutCubic(K.prog(t, ...B.board)))
    const onSled = t => t < B.hopOff[0] || t > B.board[1]
    function drawSled(x, t, cx, d) {
      const y = K.GROUND - 16
      K.drawBits(x, SLED, SLED_C, cx, y + 4, 17, { flipX: d < 0 })
      const fast = (t > B.zoom[0] && t < B.zoom[1]) || (t > B.back[0] && t < B.back[1]) || (t > B.glide[0] && t < B.glide[1])
      if (fast) {
        x.save(); x.fillStyle = K.SNOW
        for (let i = 0; i < 8; i++) { const ph = (t * 3 + i / 8) % 1; x.globalAlpha = 0.8 * (1 - ph); x.fillRect(cx - d * (130 + ph * 120), y + 8 - ph * 50 - (i % 3) * 8, 10, 10) }
        x.restore()
      }
    }
    return {
      draw(x, t) {
        const a = K.appear(t, T.scene + 0.05)
        if (a <= 0.01) return
        const s = sledX(t), d = dir(t)
        // the lavender star: shivers until the mittens land
        const warm = t > B.give[1]
        const shiver = warm ? 0 : Math.sin(t * 46) * 2.5
        const tx = themX(t)
        if (t < B.zoom[1] || t > B.back[0]) drawSled(x, t, s, d)
        const themSit = t > B.board[1]
        K.mini(x, t, { x: tx + shiver, y: themSit ? K.ACT_Y - 18 : K.ACT_Y, size: 150, color: K.THEM, mood: warm ? 'happy' : t > B.zoom[0] && t < B.zoom[0] + 1.6 ? 'wide' : 'squint', look: t < B.back[1] ? [1, 0] : [1, 0], squash: themSit ? 0.15 : 0, seed: 9, pop: K.appear(t, T.scene + 0.2), hops: [B.board[0] + 0.05] })
        if (warm) for (const sd of [-1, 1]) K.drawBits(x, K.BM.MITTEN, K.COL, tx + sd * 64, (themSit ? K.ACT_Y - 18 : K.ACT_Y) - 4, 3.6, { flipX: sd > 0 })
        // Aries
        const ax = ariesX(t), sit = onSled(t)
        const zoom = (t > B.zoom[0] && t < B.zoom[1]) || (t > B.back[0] && t < B.back[1])
        K.mini(x, t, { x: ax, y: sit ? K.ACT_Y - 20 : K.ACT_Y, size: 160, color: K.ME.color, glyph: K.ME.glyph, mood: zoom ? 'squint' : t < B.hold ? 'happy' : t < B.heart ? 'neutral' : 'heart', look: zoom ? [d, 0] : t < B.board[0] ? [-1, 0] : [-1, 0], squash: sit ? 0.15 : 0, seed: 4, pop: a, hops: [B.hopOff[0], B.give[0], B.board[0]] })
        // the mittens: held out, then fly across
        if (t > B.hold && t < B.give[1]) {
          const p = K.prog(t, ...B.give), hx = K.lerp(ax - 70, tx + 20, K.ease.inOutCubic(p)), hy = K.ACT_Y - 30 - Math.sin(Math.PI * p) * 70
          K.drawBits(x, K.BM.MITTEN, K.COL, hx - 16, hy, 4.4 * K.pop01(t, B.hold, 0.3, 2.4)); K.drawBits(x, K.BM.MITTEN, K.COL, hx + 16, hy, 4.4 * K.pop01(t, B.hold, 0.3, 2.4), { flipX: true })
        }
        K.sparkles(x, t, tx, K.ACT_Y - 10, B.give[1], 8, 90, 2)
        if (t > B.heart && t < B.heart + 2.2) K.heart(x, (ax + tx) / 2, K.ACT_Y - 140 - (t - B.heart) * 24, 8 * K.pop01(t, B.heart, 0.35, 3), 1 - K.prog(t, B.heart + 1.6, B.heart + 2.2))
        K.burst(x, 760, K.ACT_Y - 170, 100, t, B.zoom[0] + 0.7, { word: 'WHOOSH!', size: 30, life: 0.9 })
        K.burst(x, 820, K.ACT_Y - 160, 90, t, B.back[1] - 0.1, { word: 'SKRRT!', size: 32, color: '#ff9a7a', life: 0.9 })
        K.burst(x, 470, K.ACT_Y - 170, 90, t, B.glide[0] + 0.2, { word: 'WHEE!', size: 36, color: '#9fe6b0', life: 1.0 })
      },
      cues: [
        ['whoosh', B.zoom[0] + 0.4, 0.6, 0.05], ['boom', B.zoom[0] + 0.7, 0.08], ['whoosh', B.back[0], 0.5, 0.045], ['tick', B.back[1] - 0.1, 0.05], ['pop', B.back[1] - 0.1, 587.33, 0.04, 0.3],
        ['pop', B.hopOff[0], 880, 0.03, -0.2], ['pop', B.hold, 1174.66, 0.035, -0.3], ['whoosh', B.give[0], 0.3, 0.03], ['glitter', B.give[1], B.give[1] + 0.4], ['pop', B.heart, 1318.51, 0.04, 0],
        ['pop', B.board[0], 739.99, 0.03, -0.2], ['pop', B.board[0] + 0.1, 987.77, 0.03, 0.2], ['whoosh', B.glide[0], 1.2, 0.035], ['pop', B.glide[0] + 0.2, 1567.98, 0.035, -0.3],
      ],
    }
  },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, LINES_EXPORT = F.LINES_EXPORT
