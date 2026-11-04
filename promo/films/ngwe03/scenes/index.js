// ngwe03 · Your Star Guide: Winter · ♊ Gemini · note 1 / 4 (how you love in winter) · 20 s (story 0–17.6, then the short end card)
//   0.00–2.85  "*Gemini,* snowed in | means *more texts.*"  The ♊ guide, big, lantern lit, snow falling.
//   2.9–7.4    A phone floats up between Gemini (left) and the lavender star (right). Gemini's bubbles pop in, faster and
//              faster, until they pile over the top. YOUR STAR: "snowed in? you'd text them a whole novel."
//   7.45–11.1  The bubbles turn to snow and slide off into a drift. YOUR STAR: "send one. then call. let them hear you laugh."
//              Gemini taps CALL; the screen rings; the lavender star's phone goes RING!, it answers.
//   11.15      "Trade the thread | for a *voice*."  Sound rings pulse between them; both laugh (HA!). Pisces sobs.
import { guideFilm } from '../../ngwe01/gwkit.js'

const MSGS = ['hiii', 'snow!!', 'u up?', 'ok wait', 'look out', 'ur window', 'SO MUCH', 'snow lol', 'also', 'hi again', 'one more', 'ok last']
const F = guideFilm({
  id: 'ngwe03', sign: 'gemini', note: 1, len: 22,
  hook: '*Gemini,* snowed in | means *more texts.*', hookSize: 100,
  lines: ["snowed in? you'd text them a *whole novel*.", 'send one. then *call*. let them hear you laugh.'],
  chip: 'GEMINI: MUTABLE AIR,|RULED BY MERCURY',
  last: 'Trade the thread | for a *voice*.',
  gag: (T, K) => {
    const B = { phone: 3.1, msg0: 3.6, freeze: 7.85, melt: [7.95, 8.6], tap: 8.85, ring: 9.25, answer: 9.9, ha: [10.4, 12.0, 13.6] }
    const PX = 540, PY = 1075, PW = 200, PH = 300
    const msgT = i => B.msg0 + i * 0.36 - i * i * 0.008
    function phoneBody(x, cx, cy, w, h, a, glow = 0) {
      x.save(); x.globalAlpha *= a
      if (glow > 0) { x.shadowColor = '#9fe6b0'; x.shadowBlur = 40 * glow }
      x.fillStyle = K.INK; x.beginPath(); x.roundRect(cx - w / 2 - 8, cy - h / 2 - 8, w + 16, h + 16, 30); x.fill()
      x.shadowBlur = 0
      x.fillStyle = '#d6d0ec'; x.beginPath(); x.roundRect(cx - w / 2 - 2, cy - h / 2 - 2, w + 4, h + 4, 26); x.fill()
      x.fillStyle = '#1d1840'; x.beginPath(); x.roundRect(cx - w / 2 + 8, cy - h / 2 + 10, w - 16, h - 20, 18); x.fill()
      x.fillStyle = K.INK; x.fillRect(cx - 22, cy - h / 2 + 14, 44, 8)
      x.restore()
    }
    return {
      draw(x, t) {
        const a = K.appear(t, T.scene + 0.05)
        if (a <= 0.01) return
        const answered = t > B.answer
        const laughing = t > B.ha[0]
        const laughHop = [B.ha[0], B.ha[0] + 0.55, B.ha[1], B.ha[1] + 0.55, B.ha[2], B.ha[2] + 0.55]
        K.mini(x, t, { x: 250, size: 160, color: K.ME.color, glyph: K.ME.glyph, mood: laughing ? 'happy' : t < B.freeze ? 'squint' : t < B.tap ? 'wide' : 'neutral', look: [1, -0.5], seed: 4, pop: a, squash: t < B.freeze && t > B.msg0 ? 0.04 * Math.sin(t * 30) : 0, hops: [B.tap, ...(laughing ? laughHop : [])] })
        K.mini(x, t, { x: 800, size: 150, color: K.THEM, mood: laughing ? 'happy' : t > B.ring && t < B.answer ? 'wide' : 'neutral', look: [-1, -0.5], seed: 9, pop: K.appear(t, T.scene + 0.25), hops: [B.answer, ...(laughing ? laughHop.map(v => v + 0.12) : [])] })
        // the big phone
        const pp = K.pop01(t, B.phone, 0.4, 2.2) * K.popOut(t, [T.close - 0.2, T.close + 0.2])
        if (pp > 0.01) {
          const shake = t > B.msg0 && t < B.freeze ? Math.sin(t * 50) * Math.min(4, (t - B.msg0) * 1.2) : 0
          const cx = PX + shake, cy = PY
          phoneBody(x, cx, cy, PW * pp, PH * pp, 1, t > B.tap && t < B.answer ? 0.5 + 0.5 * Math.sin(t * 14) : 0)
          if (pp > 0.9) {
            x.save(); x.beginPath(); x.rect(cx - PW / 2 - 60, cy - PH / 2 - 44, PW + 120, PH + 400); x.clip()
            // the message bubbles stack upward from the bottom of the screen; past the top they keep piling
            const melt = K.ease.inCubic(K.prog(t, ...B.melt))
            MSGS.forEach((m, i) => {
              const t0 = msgT(i); if (t < t0) return
              const p = K.pop01(t, t0, 0.25, 2.6)
              const n = MSGS.filter((_, j) => msgT(j) <= t).length
              const row = n - 1 - i
              const bx = cx + 18 - (i % 2) * 20 + (row > 6 ? (row % 2 ? 1 : -1) * 22 : 0), by = cy + PH / 2 - 48 - Math.min(row, 7.4) * 42 + melt * (420 + i * 30)
              const w = 40 + m.length * 13
              x.save(); x.globalAlpha *= 1 - K.prog(t, B.melt[0] + 0.3, B.melt[1])
              x.translate(bx, by); x.scale(p, p)
              x.fillStyle = K.INK; x.beginPath(); x.roundRect(-w / 2 - 4, -20, w + 8, 40, 18); x.fill()
              x.fillStyle = t > B.freeze ? K.SNOW : '#ffd34d'; x.beginPath(); x.roundRect(-w / 2, -16, w, 32, 14); x.fill()
              x.fillStyle = K.INK; x.font = "800 20px Inter"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(t > B.freeze ? '' : m, 0, 1)
              x.restore()
            })
            x.restore()
            // CALL screen
            if (t > B.tap) {
              const c = K.pop01(t, B.tap, 0.3, 2.4)
              x.save(); x.globalAlpha *= c
              for (let r = 0; r < 3; r++) { const ph = ((t - B.tap) * 1.3 + r / 3) % 1; x.strokeStyle = `rgba(159,230,176,${1 - ph})`; x.lineWidth = 5; x.beginPath(); x.arc(cx, cy - 10, 30 + ph * 70, 0, Math.PI * 2); x.stroke() }
              x.fillStyle = K.INK; x.beginPath(); x.arc(cx, cy - 10, 38, 0, Math.PI * 2); x.fill()
              x.fillStyle = '#3fae6a'; x.beginPath(); x.arc(cx, cy - 10, 32, 0, Math.PI * 2); x.fill()
              K.label(x, answered ? '0:0' + Math.min(9, Math.floor(t - B.answer)) : 'calling…', cx, cy + 70, 26, K.BONE, 1)
              x.restore()
              K.drawBits(x, ['.RR...', 'RRR...', 'RR....', '.RR..R', '..RRRR', '...RR.'], { R: K.SNOW }, cx, cy - 10, 6 * c, { outline: null })
            }
          }
        }
        // the snowdrift the bubbles became
        const drift = K.ease.outCubic(K.prog(t, B.melt[0] + 0.3, B.melt[1] + 0.3)) * K.popOut(t, T.out)
        if (drift > 0.01) {
          x.save(); x.fillStyle = K.INK; x.beginPath(); x.ellipse(PX, K.GROUND - 6, 170 * drift + 6, 46 * drift + 6, 0, Math.PI, 0); x.fill()
          x.fillStyle = K.SNOW; x.beginPath(); x.ellipse(PX, K.GROUND - 6, 170 * drift, 46 * drift, 0, Math.PI, 0); x.fill(); x.restore()
        }
        // their little phone: RING!
        if (t > B.ring - 0.2) {
          const lp = K.pop01(t, B.ring - 0.2, 0.3, 2.4) * K.popOut(t, T.out)
          const r = t < B.answer ? Math.sin(t * 60) * 0.12 : 0
          x.save(); x.translate(728, K.ACT_Y + 4); x.rotate(r); phoneBody(x, 0, 0, 44 * lp, 74 * lp, 1, t < B.answer ? 1 : 0.3); x.restore()
        }
        K.burst(x, 840, K.ACT_Y - 170, 84, t, B.ring, { word: 'RING!', size: 30, color: '#9fe6b0', life: 0.6 })
        K.burst(x, 800, K.ACT_Y - 170, 80, t, B.ring + 0.35, { word: 'RING!', size: 30, color: '#9fe6b0', life: 0.5 })
        // sound rings between them once they talk
        if (answered) {
          const sa = K.popOut(t, T.out)
          for (let i = 0; i < 4; i++) {
            const ph = ((t - B.answer) * 0.8 + i / 4) % 1
            x.save(); x.globalAlpha = sa * Math.sin(Math.PI * ph) * 0.9; x.strokeStyle = i % 2 ? K.ME.color : K.THEM; x.lineWidth = 6
            x.beginPath(); x.arc(K.lerp(330, 720, ph), K.ACT_Y - 60, 26, -1.1, 1.1); x.stroke()
            x.beginPath(); x.arc(K.lerp(720, 330, ph), K.ACT_Y - 100, 22, Math.PI - 1.1, Math.PI + 1.1); x.stroke(); x.restore()
          }
        }
        B.ha.forEach((h, i) => { K.burst(x, 250, K.ACT_Y - 175, 74, t, h, { word: 'HA!', size: 34, color: K.ME.color, life: 0.8 }); K.burst(x, 800, K.ACT_Y - 170, 74, t, h + 0.25, { word: 'HA!', size: 34, color: K.THEM, life: 0.8 }) })
      },
      cues: [
        ['whoosh', B.phone, 0.3, 0.03], ['pop', B.phone + 0.1, 880, 0.03, 0],
        ...MSGS.map((_, i) => ['pop', +(msgT(i)).toFixed(3), [987.77, 1174.66, 1318.51, 1567.98][i % 4], 0.022, i % 2 ? 0.2 : -0.2]),
        ['tick', B.freeze, 0.04], ['whoosh', B.melt[0], 0.6, 0.04], ['pop', B.tap, 659.25, 0.04, -0.3],
        ['pluck', B.ring, 1318.51, 0.04, 0.3, 0.4], ['pluck', B.ring + 0.18, 1567.98, 0.04, 0.3, 0.4], ['pluck', B.ring + 0.36, 1318.51, 0.04, 0.3, 0.4], ['pluck', B.ring + 0.54, 1567.98, 0.04, 0.3, 0.4],
        ['pop', B.answer, 1174.66, 0.04, 0.4], ...B.ha.flatMap(h => [['pop', h, 1318.51, 0.035, -0.4], ['pop', h + 0.25, 1567.98, 0.035, 0.4]]),
      ],
    }
  },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, LINES_EXPORT = F.LINES_EXPORT
