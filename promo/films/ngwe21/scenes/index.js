// ngwe21 · Your Star Guide: Winter · ♐ Sagittarius · note 2 / 4 (your holiday blind spot) · 25 s (story 0–20.6, then the end card)
//   0.00–2.85  "*Sagittarius,* | *before* you go…"  The ♐ guide, big, lantern lit, snow falling.
//   2.9–7.1    Sag hops up onto a packed suitcase at the edge of a snowy road, waving (bye!). Over the mint star, a calendar
//              page: 19, with a sticky note: "sag leaves TOMORROW?!" It goes wide-eyed.
//              YOUR STAR: "you leave on the 20th. they heard the 19th."
//   7.15–10.8  Sag stops mid-wave and turns round. YOUR STAR: "they care where you'll be. tell them early."
//   10.85–14.5 YOUR STAR: "share the dates. send a postcard."  Sag walks back, hands over a card (20 → 27); the dates light up
//              on the calendar. Sag heads off waving, and a postcard flutters in from the road. Heart.
//   14.55      card flip · "Tell them | *before* you go."  Pisces sobs in the snow.
import { guideFilm } from '../../ngwe01/gwkit.js'

const MINT = '#9fe6b0'
const F = guideFilm({
  id: 'ngwe21', sign: 'sagittarius', note: 2, len: 25,
  hook: '*Sagittarius,* | *before* you go…',
  lines: ['you leave on the 20th. they heard *the 19th*.', "they care *where you'll be*. tell them early.", 'share the dates. send a *postcard*.'],
  chip: 'SAGITTARIUS: SYMBOL, THE ARCHER.|RULER OF THE 9TH HOUSE (TRAVEL)',
  last: 'Tell them | *before* you go.', late: 1,
  gag: (T, K) => {
    const B = { hopOn: 3.3, bye: [3.8, 7.6], note: 4.4, gasp: 4.9, turn: 7.9, walk: [11.1, 11.7], give: [11.8, 12.2], mark: 12.3, leave: [12.7, 13.4], card: [13.6, 14.5], heart: 14.6 }
    const SUIT = 230, TX = 790, CALX = 760, CALY = 1032
    const sagX = t => t < B.walk[0] ? SUIT : t < B.leave[0] ? K.lerp(SUIT, 580, K.ease.inOutCubic(K.prog(t, ...B.walk))) : K.lerp(580, SUIT, K.ease.inOutCubic(K.prog(t, ...B.leave)))
    const onSuit = t => t < B.walk[0] || t > B.leave[1]
    return {
      draw(x, t) {
        const a = K.appear(t, T.scene + 0.05)
        if (a <= 0.01) return
        // the road
        x.save(); x.globalAlpha *= Math.min(1, a); x.fillStyle = 'rgba(120,130,190,0.35)'; for (let i = 0; i < 6; i++) x.fillRect(20 + i * 70, K.GROUND + 4, 40, 6); x.restore()
        // suitcase
        x.save(); x.globalAlpha *= Math.min(1, a); x.fillStyle = K.INK; x.fillRect(SUIT - 80, K.GROUND - 96, 160, 96); x.fillRect(SUIT - 30, K.GROUND - 116, 60, 24); x.fillStyle = '#c96f2f'; x.fillRect(SUIT - 74, K.GROUND - 90, 148, 86); x.fillStyle = '#9a4f1f'; x.fillRect(SUIT - 74, K.GROUND - 52, 148, 10); x.fillStyle = K.GOLD; x.fillRect(SUIT - 50, K.GROUND - 90, 10, 86); x.fillRect(SUIT + 40, K.GROUND - 90, 10, 86); x.restore()
        // calendar over them
        const cp = K.pop01(t, T.scene + 0.3, 0.35, 2.2) * K.popOut(t, T.out)
        if (cp > 0.01) {
          x.save(); x.translate(CALX, CALY); x.scale(cp, cp)
          x.fillStyle = K.INK; x.fillRect(-120, -84, 240, 168); x.fillStyle = '#f5eedf'; x.fillRect(-114, -78, 228, 156); x.fillStyle = '#c42a3f'; x.fillRect(-114, -78, 228, 30)
          x.fillStyle = '#ffffff'; x.font = "700 18px 'Space Mono', monospace"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('DECEMBER', 0, -63)
          for (let d = 0; d < 7; d++) {
            const n = 19 + d, cx = -96 + d * 32, on = t > B.mark && n >= 20
            if (on) { x.fillStyle = K.ME.color; x.fillRect(cx - 14, -32, 28, 28) }
            x.fillStyle = n === 19 ? '#c42a3f' : '#2c2a7a'; x.font = "800 18px Inter"; x.fillText(String(n), cx, -18)
          }
          if (t > B.note && t < B.mark) { const k = K.pop01(t, B.note, 0.3, 2.6) * (1 - K.prog(t, B.mark - 0.3, B.mark)); x.save(); x.translate(0, 34); x.rotate(-0.05); x.scale(k, k); x.fillStyle = K.INK; x.fillRect(-104, -30, 208, 60); x.fillStyle = '#ffd34d'; x.fillRect(-100, -26, 200, 52); x.fillStyle = K.INK; x.font = "800 19px Inter"; x.fillText('sag leaves', 0, -8); x.fillText('TOMORROW?!', 0, 14); x.restore() }
          if (t > B.mark) { x.fillStyle = K.INK; x.font = "800 22px Inter"; x.fillText('20 → 27: away', 0, 38) }
          x.restore()
        }
        K.mini(x, t, { x: TX, size: 150, color: MINT, mood: t > B.heart ? 'heart' : t > B.mark ? 'happy' : t > B.gasp ? 'wide' : 'neutral', look: [-1, 0], seed: 9, pop: K.appear(t, T.scene + 0.3), hops: [B.gasp, B.mark, B.heart] })
        const sx = sagX(t), waving = t > B.bye[0] && t < B.bye[1]
        K.mini(x, t, { x: sx, y: onSuit(t) ? K.ACT_Y - 92 : K.ACT_Y, size: 160, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.give[1] ? 'happy' : t > B.turn ? 'wide' : 'happy', look: t > B.turn && t < B.leave[0] ? [1, 0] : [-1, 0], seed: 4, pop: a, hops: [B.hopOn, B.turn, B.walk[0], B.leave[1]], squash: waving ? 0.04 * Math.sin(t * 12) : 0 })
        if (waving) K.label(x, 'bye!', sx + 110, K.ACT_Y - 200, 40, K.ME.color, K.prog(t, B.bye[0], B.bye[0] + 0.15) * (1 - K.prog(t, B.turn - 0.3, B.turn)), Math.sin(t * 6) * 0.1)
        K.label(x, '…oh.', sx + 110, K.ACT_Y - 200, 38, K.BONE, K.prog(t, B.turn, B.turn + 0.15) * (1 - K.prog(t, B.walk[0], B.walk[0] + 0.3)))
        // the dates card
        if (t > B.give[0] - 0.3 && t < B.mark + 0.4) { const p = K.ease.inOutCubic(K.prog(t, ...B.give)), k = K.pop01(t, B.give[0] - 0.3, 0.3, 2.4) * (1 - K.prog(t, B.mark, B.mark + 0.4)); x.save(); x.translate(K.lerp(sx + 70, TX - 70, p), K.ACT_Y - 20 - Math.sin(Math.PI * p) * 60); x.scale(k, k); x.fillStyle = K.INK; x.fillRect(-56, -32, 112, 64); x.fillStyle = '#f5eedf'; x.fillRect(-52, -28, 104, 56); x.fillStyle = K.INK; x.font = "800 22px Inter"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('20 → 27', 0, 1); x.restore() }
        // the postcard
        if (t > B.card[0]) { const p = K.ease.outCubic(K.prog(t, ...B.card)), k = K.popOut(t, T.out); x.save(); x.translate(K.lerp(-80, TX - 110, p), K.lerp(900, K.ACT_Y - 40, p) + Math.sin(p * 12) * 14 * (1 - p)); x.rotate(Math.sin(p * 9) * 0.3 * (1 - p) - 0.08); x.scale(k, k); x.fillStyle = K.INK; x.fillRect(-64, -42, 128, 84); x.fillStyle = '#6fd3ff'; x.fillRect(-60, -38, 120, 76); x.fillStyle = '#ffffff'; x.beginPath(); x.moveTo(-60, 30); x.lineTo(-20, -18); x.lineTo(10, 14); x.lineTo(30, -6); x.lineTo(60, 30); x.closePath(); x.fill(); x.fillStyle = '#3fae6a'; x.fillRect(-60, 30, 120, 8); x.fillStyle = K.INK; x.font = "800 16px Inter"; x.textAlign = 'center'; x.fillText('miss you!', 0, -22); x.restore() }
      },
      cues: [
        ['pop', B.hopOn, 880, 0.035, -0.4], ...Array.from({ length: 5 }, (_, i) => ['tick', +(B.bye[0] + i * 0.7).toFixed(2), 0.02]), ['pop', B.note, 1318.51, 0.035, 0.4], ['pluck', B.gasp, 293.66, 0.035, 0.5, 0.4],
        ['tick', B.turn, 0.05], ['pop', B.turn, 659.25, 0.035, -0.3], ['whoosh', B.walk[0], 0.4, 0.025], ['whoosh', B.give[0], 0.3, 0.025], ['pop', B.mark, 1567.98, 0.04, 0.4], ['glitter', B.mark, B.mark + 0.4],
        ['whoosh', B.leave[0], 0.4, 0.025], ['whoosh', B.card[0], 0.7, 0.03], ['pop', B.card[1], 1174.66, 0.035, 0.3], ['pop', B.heart, 1318.51, 0.04, 0.4],
      ],
    }
  },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, LINES_EXPORT = F.LINES_EXPORT
