// ngwe16 · Your Star Guide: Winter · ♋ Cancer · note 2 / 4 (your holiday blind spot) · 23 s (story 0–20.6, then the short end card)
//   0.00–2.85  "*Cancer,* the dinner | can *wait.*"  The ♋ guide, big, lantern lit, snow falling.
//   2.9–7.1    A long snowy table: a mint star and the lavender star are seated. Cancer rushes in and out with plates,
//              then gravy. Its own plate, at its own empty chair, slowly freezes over (cold.). YOUR STAR: "you host it all,
//              and eat last. cold."
//   7.15–10.8  Cancer keeps rushing (gravy, more gravy). YOUR STAR: "they came for you, not the gravy."
//   10.85–14.5 YOUR STAR: "sit down. pass the plate. be a guest."  The lavender star stands and pulls out Cancer's chair.
//              Cancer stops, sits; the mint star slides a warm bowl down the table. Everyone cheers (YAY!).
//   14.55      "Sit at your | *own* table."  Pisces sobs in the snow.
import { guideFilm } from '../../ngwe01/gwkit.js'

const F = guideFilm({
  id: 'ngwe16', sign: 'cancer', note: 2, len: 25,
  hook: '*Cancer,* the dinner | can *wait.*',
  lines: ['you host it all, and eat *last*. cold.', 'they came for *you*, not the gravy.', 'sit down. pass the plate. *be a guest*.'],
  chip: 'CANCER: SYMBOL, THE CRAB.|RULER OF THE 4TH HOUSE (HOME)',
  last: 'Sit at your | *own* table.', late: 1,
  gag: (T, K) => {
    const B = { serve: [3.6, 4.6, 5.6, 8.2, 9.4], frost: [5.8, 6.8], pull: [11.1, 11.5], stop: 11.6, sit: [12.0, 12.5], bowl: [12.7, 13.3], yay: 13.6 }
    const CH = 290, MX = 560, TX = 760, TOP = K.GROUND - 70, MINT = '#9fe6b0'
    const run = t => { const p = (t - 3.2) / 0.5; return 470 + Math.sin(p * Math.PI) * 330 }
    const canX = t => t < 3.2 ? 140 : t < B.stop ? run(t) : t < B.sit[0] ? run(B.stop) : K.lerp(run(B.stop), CH, K.ease.inOutCubic(K.prog(t, ...B.sit)))
    const plate = (x, cx, cy, food = '#c96f2f', k = 1) => { if (k <= 0.01) return; x.save(); x.translate(cx, cy); x.scale(k, k); x.fillStyle = K.INK; x.beginPath(); x.ellipse(0, 0, 60, 18, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#ffffff'; x.beginPath(); x.ellipse(0, 0, 54, 14, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = K.INK; x.beginPath(); x.ellipse(0, -8, 32, 14, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = food; x.beginPath(); x.ellipse(0, -8, 28, 10, 0, 0, Math.PI * 2); x.fill(); x.restore() }
    return {
      draw(x, t) {
        const a = K.appear(t, T.scene + 0.05)
        if (a <= 0.01) return
        const sat = t > B.sit[1]
        const yayH = [B.yay, B.yay + 0.5]
        // Cancer's chair (pulled out a little)
        const pull = K.ease.outCubic(K.prog(t, ...B.pull)) * (1 - K.ease.inOutCubic(K.prog(t, ...B.sit))) * 40
        x.save(); x.globalAlpha *= Math.min(1, a); x.fillStyle = K.INK; x.fillRect(CH - 90 - pull, K.GROUND - 240, 180, 180); x.fillStyle = '#8a5a33'; x.fillRect(CH - 84 - pull, K.GROUND - 234, 168, 170); x.restore()
        K.mini(x, t, { x: MX, y: K.ACT_Y - 52, size: 140, color: MINT, mood: t > B.yay ? 'happy' : 'neutral', look: [-1, 0], seed: 11, pop: K.appear(t, T.scene + 0.25), hops: [B.bowl[0], ...yayH] })
        K.mini(x, t, { x: TX, y: K.ACT_Y - 52, size: 150, color: K.THEM, mood: t > B.yay ? 'heart' : t > B.pull[0] ? 'sparkle' : t > B.frost[1] ? 'wide' : 'neutral', look: [-1, 0], seed: 9, pop: K.appear(t, T.scene + 0.3), hops: [B.pull[0], ...yayH.map(v => v + 0.1)] })
        if (sat) K.mini(x, t, { x: CH, y: K.ACT_Y - 52, size: 160, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.yay ? 'heart' : 'sparkle', look: [1, 0], seed: 4, pop: a, hops: [B.sit[1], ...yayH], tears: t > B.yay ? 1 : 0 })
        // table
        x.save(); x.globalAlpha *= Math.min(1, a)
        x.fillStyle = K.INK; x.fillRect(150, TOP - 8, 730, 34); x.fillStyle = '#c08552'; x.fillRect(156, TOP - 2, 718, 22); x.fillStyle = '#ffffff'; x.fillRect(156, TOP - 2, 718, 6)
        x.fillStyle = K.INK; x.fillRect(190, TOP + 26, 22, 52); x.fillRect(830, TOP + 26, 22, 52); x.restore()
        // guests' plates
        plate(x, MX, TOP - 10, '#c96f2f', K.pop01(t, B.serve[0], 0.3, 2.6) * K.popOut(t, T.out))
        plate(x, TX, TOP - 10, '#c96f2f', K.pop01(t, B.serve[1], 0.3, 2.6) * K.popOut(t, T.out))
        // gravy boats pile up
        ;[B.serve[2], B.serve[3], B.serve[4]].forEach((g, i) => { const k = K.pop01(t, g, 0.3, 2.6) * K.popOut(t, T.out); if (k <= 0.01) return; x.save(); x.translate(640 + i * 30, TOP - 22 - i * 4); x.scale(k, k); x.fillStyle = K.INK; x.beginPath(); x.ellipse(0, 0, 30, 16, 0, 0, Math.PI); x.fill(); x.fillRect(22, -12, 22, 10); x.fillStyle = '#f5eedf'; x.beginPath(); x.ellipse(0, 0, 25, 12, 0, 0, Math.PI); x.fill(); x.fillStyle = '#7a4a2a'; x.fillRect(-22, -4, 44, 6); x.restore() })
        // Cancer's own plate: steaming → frozen → warm again (the bowl)
        const fr = K.prog(t, ...B.frost) * (1 - K.prog(t, B.bowl[1], B.bowl[1] + 0.5))
        plate(x, CH, TOP - 10, fr > 0.5 ? '#bfe3ff' : '#c96f2f', a)
        if (fr > 0.01) { x.save(); x.globalAlpha *= fr; x.fillStyle = K.INK; x.fillRect(CH - 26, TOP - 58, 52, 46); x.fillStyle = '#bfe3ff'; x.fillRect(CH - 22, TOP - 54, 44, 38); x.fillStyle = '#ffffff'; x.fillRect(CH - 18, TOP - 50, 12, 8); x.restore() }
        if (fr < 0.2 && t > B.bowl[1]) K.steam(x, t, CH, TOP - 40, K.popOut(t, T.out))
        if (t > B.bowl[0]) { const p = K.ease.outCubic(K.prog(t, ...B.bowl)); x.save(); x.translate(K.lerp(MX - 60, CH + 70, p), TOP - 24); x.fillStyle = K.INK; x.beginPath(); x.arc(0, 0, 30, 0, Math.PI); x.fill(); x.fillStyle = '#ff8fb1'; x.beginPath(); x.arc(0, 0, 25, 0, Math.PI); x.fill(); x.fillStyle = '#ffd34d'; x.fillRect(-24, -4, 48, 6); x.restore(); K.steam(x, t, K.lerp(MX - 60, CH + 70, p), TOP - 40, K.popOut(t, T.out) * 0.7) }
        // Cancer rushing (in front of the table) until it sits
        if (!sat) {
          const cx = canX(t), rushing = t > 3.2 && t < B.stop
          const vel = Math.cos((t - 3.2) / 0.5 * Math.PI)
          K.mini(x, t, { x: cx, size: 160, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.stop ? 'wide' : 'squint', look: rushing ? [vel > 0 ? 1 : -1, 0] : [1, 0], seed: 4, pop: a, squash: rushing ? 0.05 * Math.sin(t * 30) : 0 })
          if (rushing) { x.save(); x.fillStyle = 'rgba(255,255,255,0.6)'; for (let k = 0; k < 3; k++) x.fillRect(cx - (vel > 0 ? 1 : -1) * (110 + k * 26), K.ACT_Y - 30 + k * 26, 40, 6); x.restore()
            // the dish in Cancer's claws
            plate(x, cx + (vel > 0 ? 70 : -70), K.ACT_Y + 4, Math.floor((t - 3.2) / 0.5) % 2 ? '#7a4a2a' : '#c96f2f', 0.7) }
        }
        K.label(x, 'cold.', CH, TOP - 110, 40, K.ICE, K.prog(t, B.frost[1], B.frost[1] + 0.15) * (1 - K.prog(t, 9.6, 9.9)), -0.08)
        K.label(x, 'sit!', TX + 30, K.ACT_Y - 190, 38, K.THEM, K.prog(t, B.pull[0], B.pull[0] + 0.1) * (1 - K.prog(t, B.sit[1], B.sit[1] + 0.3)))
        K.burst(x, 540, 1000, 96, t, B.yay, { word: 'YAY!', size: 40, color: '#ffd34d', life: 1.0 })
        K.sparkles(x, t, 540, 1080, B.yay, 12, 240, 3)
      },
      cues: [
        ...Array.from({ length: 16 }, (_, i) => ['whoosh', +(3.2 + i * 0.5).toFixed(2), 0.18, 0.02]),
        ...B.serve.map((s, i) => ['pop', s, [880, 987.77, 659.25, 739.99, 783.99][i], 0.035, 0.2]), ['pluck', B.frost[1], 1975.53, 0.03, 0.6, -0.3],
        ['pop', B.pull[0], 1174.66, 0.04, 0.4], ['tick', B.pull[1], 0.05], ['tick', B.stop, 0.06], ['whoosh', B.sit[0], 0.3, 0.03], ['pop', B.sit[1], 659.25, 0.035, -0.3],
        ['whoosh', B.bowl[0], 0.5, 0.03], ['pop', B.bowl[1], 1318.51, 0.035, -0.2], ['glitter', B.yay, B.yay + 0.6], ['pop', B.yay, 1567.98, 0.045, 0],
      ],
    }
  },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, LINES_EXPORT = F.LINES_EXPORT
