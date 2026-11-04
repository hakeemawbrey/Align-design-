// ngwe14 · Your Star Guide: Winter · ♉ Taurus · note 2 / 4 (your holiday blind spot) · 23 s (story 0–20.6, then the short end card)
//   0.00–2.85  "*Taurus,* it's | *tradition* time."  The ♉ guide, big, lantern lit, snow falling.
//   2.9–7.1    A long snowy table. Taurus in its own chair ("TAURUS'S CHAIR") with the same roast; a little sign flips
//              the years over its head (same plate every time). YOUR STAR: "same dinner, same chair, every single year."
//   7.15–10.8  The lavender star sets down a covered dish and lifts the lid: little steaming buns. Taurus pulls its plate
//              closer and side-eyes. YOUR STAR: "they've got traditions too, you know."
//   10.85–14.5 YOUR STAR: "try one of theirs. just one bite."  One bun hops over; nom. Taurus's eyes go sparkly; it holds
//              out its plate: "seconds?"
//   14.55      "Add *their* | tradition."  Both plates full of both. Pisces sobs in the snow.
import { guideFilm } from '../../ngwe01/gwkit.js'

const YEARS = ['2023', '2024', '2025', '2026']
const F = guideFilm({
  id: 'ngwe14', sign: 'taurus', note: 2, len: 25,
  hook: '*Taurus,* it’s | *tradition* time.',
  lines: ['same dinner, same chair, *every single* year.', "they've got traditions *too*, you know.", 'try one of theirs. *just one* bite.'],
  chip: 'TAURUS: SYMBOL, THE BULL.|RULER OF THE 2ND HOUSE (VALUES)',
  last: 'Add *their* | tradition.', late: 0,
  gag: (T, K) => {
    const B = { years: [3.9, 4.6, 5.3, 6.0], dish: [7.5, 8.1], lid: 8.7, guard: 9.2, hop: [11.3, 11.8], nom: 11.85, wow: 12.3, seconds: 12.9, share: 14.1 }
    const TX = 300, OX = 760, TOP = K.GROUND - 70
    function bun(x, cx, cy, s = 1) { x.fillStyle = K.INK; x.beginPath(); x.ellipse(cx, cy, 24 * s, 18 * s, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#fff6e0'; x.beginPath(); x.ellipse(cx, cy, 20 * s, 14 * s, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#e8d8b0'; x.fillRect(cx - 6 * s, cy - 10 * s, 12 * s, 4 * s) }
    function roast(x, cx, cy) { x.fillStyle = K.INK; x.beginPath(); x.ellipse(cx, cy - 10, 38, 24, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#9a4f1f'; x.beginPath(); x.ellipse(cx, cy - 10, 34, 20, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#c96f2f'; x.fillRect(cx - 18, cy - 24, 22, 6) }
    function plate(x, cx, cy) { x.fillStyle = K.INK; x.beginPath(); x.ellipse(cx, cy, 70, 20, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#ffffff'; x.beginPath(); x.ellipse(cx, cy, 64, 16, 0, 0, Math.PI * 2); x.fill() }
    return {
      draw(x, t) {
        const a = K.appear(t, T.scene + 0.05)
        if (a <= 0.01) return
        // Taurus's chair back
        x.save(); x.globalAlpha *= Math.min(1, a)
        x.fillStyle = K.INK; x.fillRect(TX - 100, K.GROUND - 270, 200, 210); x.fillStyle = '#8a5a33'; x.fillRect(TX - 94, K.GROUND - 264, 188, 200)
        x.fillStyle = K.INK; x.fillRect(TX - 86, K.GROUND - 300, 172, 40); x.fillStyle = K.GOLD; x.fillRect(TX - 82, K.GROUND - 296, 164, 32)
        x.fillStyle = K.INK; x.font = "800 17px Inter"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText("TAURUS'S CHAIR", TX, K.GROUND - 280); x.restore()
        const guard = t > B.guard && t < B.hop[0]
        const pull = guard ? -30 : 0
        K.mini(x, t, { x: TX, y: K.ACT_Y - 52, size: 160, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.wow ? (t > B.share ? 'heart' : 'sparkle') : t > B.nom ? 'happy' : guard ? 'squint' : t > B.lid ? 'wide' : 'happy', look: guard || t > B.lid ? [1, 0] : [0, 0], seed: 4, pop: a, hops: [...B.years, B.nom, B.wow, B.seconds] })
        K.mini(x, t, { x: OX, y: K.ACT_Y - 52, size: 150, color: K.THEM, mood: t > B.wow ? 'heart' : t > B.lid ? 'sparkle' : 'neutral', look: [-1, 0], seed: 9, pop: K.appear(t, T.scene + 0.3), hops: [B.lid, B.wow + 0.2] })
        // the table
        x.save(); x.globalAlpha *= Math.min(1, a)
        x.fillStyle = K.INK; x.fillRect(150, TOP - 8, 730, 34); x.fillStyle = '#c08552'; x.fillRect(156, TOP - 2, 718, 22); x.fillStyle = '#ffffff'; x.fillRect(156, TOP - 2, 718, 6)
        x.fillStyle = K.INK; x.fillRect(190, TOP + 26, 22, 52); x.fillRect(830, TOP + 26, 22, 52); x.restore()
        // Taurus's plate + roast
        const tp = TX + 70 + pull
        plate(x, tp, TOP - 10); roast(x, tp, TOP - 10)
        if (t > B.wow) bun(x, tp + 30, TOP - 26, K.pop01(t, B.wow, 0.3, 2.6))
        // their covered dish
        if (t > B.dish[0]) {
          const dp = K.ease.outCubic(K.prog(t, ...B.dish)), dx = K.lerp(OX, 560, dp), dy = TOP - 12
          plate(x, dx, dy)
          const n = t > B.hop[0] ? 4 : 5
          if (t > B.lid) for (let i = 0; i < n; i++) bun(x, dx - 40 + (i % 3) * 40, dy - 14 - Math.floor(i / 3) * 22)
          if (t > B.lid) K.steam(x, t, dx, dy - 50, K.popOut(t, T.out) * 0.8)
          const lid = K.ease.outBack(K.prog(t, B.lid, B.lid + 0.35))
          if (lid < 1 || t < B.lid + 1.2) { const la = 1 - K.prog(t, B.lid + 0.6, B.lid + 1.0); x.save(); x.globalAlpha *= la; x.translate(dx + lid * 60, dy - 30 - lid * 90); x.rotate(lid * 0.5); x.fillStyle = K.INK; x.beginPath(); x.arc(0, 10, 66, Math.PI, 0); x.fill(); x.fillStyle = '#c9d4ff'; x.beginPath(); x.arc(0, 10, 60, Math.PI, 0); x.fill(); x.fillStyle = K.INK; x.fillRect(-8, -64, 16, 14); x.restore() }
          // the one bun that hops over
          if (t > B.hop[0] && t < B.nom) { const p = K.prog(t, ...B.hop); bun(x, K.lerp(dx, TX + 40, p), dy - 30 - Math.sin(Math.PI * p) * 130) }
          if (t > B.share) bun(x, K.lerp(tp, OX - 60, K.prog(t, B.share, B.share + 0.5)), TOP - 40 - Math.sin(Math.PI * K.prog(t, B.share, B.share + 0.5)) * 80, 1)
        }
        // the year flipper
        const yi = B.years.filter(y => t > y).length - 1
        if (yi >= 0 && t < B.dish[0]) { const k = K.pop01(t, B.years[yi], 0.25, 2.8) * (1 - K.prog(t, B.dish[0] - 0.4, B.dish[0])); K.label(x, YEARS[yi], 580, 1010, 56 * k, K.GOLD, k); K.label(x, 'same plate.', 580, 1066, 32, K.BONE, k * (yi > 0 ? 1 : 0), 0.06) }
        K.label(x, 'nom', TX + 90, K.ACT_Y - 170, 40, K.ME.color, K.prog(t, B.nom, B.nom + 0.1) * (1 - K.prog(t, B.nom + 0.6, B.nom + 0.8)), -0.1)
        K.label(x, 'seconds?', TX + 70, K.ACT_Y - 180, 40, K.ME.color, K.prog(t, B.seconds, B.seconds + 0.15) * (1 - K.prog(t, T.close - 0.2, T.close + 0.1)), 0.06)
        K.label(x, '…mine.', TX + 40, K.ACT_Y - 170, 36, K.BONE, guard ? K.prog(t, B.guard, B.guard + 0.2) : 0)
      },
      cues: [
        ...B.years.map((y, i) => ['pop', y, [587.33, 659.25, 739.99, 880][i], 0.035, -0.2]), ['whoosh', B.dish[0], 0.4, 0.03], ['tick', B.dish[1], 0.04],
        ['pluck', B.lid, 1318.51, 0.04, 0.5, 0.2], ['glitter', B.lid, B.lid + 0.5], ['pluck', B.guard, 220, 0.035, 0.6, -0.3],
        ['whoosh', B.hop[0], 0.3, 0.025], ['pop', B.nom, 659.25, 0.04, -0.3], ['pop', B.nom + 0.15, 587.33, 0.035, -0.3], ['glitter', B.wow, B.wow + 0.5], ['pop', B.wow, 1567.98, 0.04, -0.2],
        ['pop', B.seconds, 1174.66, 0.04, -0.2], ['whoosh', B.share, 0.3, 0.025], ['pop', B.share + 0.5, 1318.51, 0.035, 0.3],
      ],
    }
  },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, LINES_EXPORT = F.LINES_EXPORT
