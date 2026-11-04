// ngwe10 · Your Star Guide: Winter · ♑ Capricorn · note 1 / 4 (how you love in winter) · 20 s (story 0–17.6, then the short end card)
//   0.00–2.85  "*Capricorn,* you love | by *showing up.*"  The ♑ guide, big, lantern lit, snow falling.
//   2.9–7.4    Dawn. A deep drift blocks the way to a little front door. Capricorn shovels a clean path, chunk by chunk
//              (shff, shff), right up to the step. YOUR STAR: "you shovel their path before they wake up."
//   7.45–11.1  Capricorn tiptoes away (tiptoe…). YOUR STAR: "then knock. let them say thank you."  The guide clears its
//              throat (ahem.); Capricorn turns back and knocks (KNOCK KNOCK); the door opens on warm light, "thank you!"
//   11.15      "Stay for the | *thank you.*"  A hug in the doorway, a heart. Pisces sobs in the snow.
import { guideFilm } from '../../ngwe01/gwkit.js'

const F = guideFilm({
  id: 'ngwe10', sign: 'capricorn', note: 1, len: 22,
  hook: '*Capricorn,* you love | by *showing up.*', hookSize: 100,
  lines: ['you shovel their path *before* they wake up.', 'then knock. let them say *thank you*.'],
  chip: 'CAPRICORN: CARDINAL EARTH,|RULED BY SATURN',
  last: 'Stay for the | *thank you.*', late: 1,
  gag: (T, K) => {
    const B = { shovel: [3.2, 7.1], tiptoe: [7.6, 8.5], ahem: 8.6, back: [9.0, 9.7], knock: [9.95, 10.3], open: [10.6, 11.0], thanks: 11.0, hug: [11.6, 12.0] }
    const DX = 790, X0 = 190, X1 = 630
    const scoops = []; for (let s = B.shovel[0] + 0.3; s < B.shovel[1]; s += 0.55) scoops.push(+s.toFixed(2))
    const capX = t => t < B.shovel[1] ? K.lerp(X0, X1, K.prog(t, ...B.shovel))
      : t < B.back[0] ? K.lerp(X1, 330, K.ease.inOutCubic(K.prog(t, ...B.tiptoe)))
      : t < B.hug[0] ? K.lerp(330, 640, K.ease.inOutCubic(K.prog(t, ...B.back))) : K.lerp(640, 690, K.prog(t, ...B.hug))
    const doorOpen = t => K.ease.outCubic(K.prog(t, ...B.open))
    return {
      draw(x, t) {
        const a = K.appear(t, T.scene + 0.05)
        if (a <= 0.01) return
        // the house front + door
        const o = doorOpen(t)
        x.save(); x.globalAlpha *= Math.min(1, a)
        x.fillStyle = K.INK; x.fillRect(DX - 130, K.GROUND - 300, 260, 300); x.fillStyle = '#6b4a7a'; x.fillRect(DX - 124, K.GROUND - 294, 248, 294)
        x.fillStyle = K.SNOW; x.fillRect(DX - 140, K.GROUND - 312, 280, 22)
        x.fillStyle = K.INK; x.fillRect(DX - 80, K.GROUND - 240, 160, 240)
        x.fillStyle = `rgba(255,214,140,${0.2 + 0.8 * o})`; x.fillRect(DX - 74, K.GROUND - 234, 148, 234)
        x.restore()
        // them, in the doorway (only once it opens)
        const tx = t < B.hug[0] ? DX : K.lerp(DX, 760, K.prog(t, ...B.hug))
        if (o > 0) K.mini(x, t, { x: tx, size: 140, color: K.THEM, mood: t > B.hug[0] ? 'heart' : 'sparkle', look: [-1, 0], seed: 9, pop: K.ease.outBack(o) * K.popOut(t, T.out), hops: [B.thanks] })
        // the door panel swings in (narrows to the right)
        if (o < 1) { x.save(); x.globalAlpha *= Math.min(1, a); const w = 148 * (1 - o); x.fillStyle = '#c96f2f'; x.fillRect(DX - 74 + 148 - w, K.GROUND - 234, w, 234); x.fillStyle = '#9a4f1f'; if (w > 40) { x.fillRect(DX - 74 + 148 - w + 16, K.GROUND - 214, w - 32, 80); x.fillRect(DX - 74 + 148 - w + 16, K.GROUND - 116, w - 32, 90) } x.fillStyle = K.GOLD; if (w > 30) x.fillRect(DX - 74 + 148 - w + 18, K.GROUND - 120, 12, 12); x.restore() }
        // the drift: deep snow to the right of the shovel, cleared path to the left
        const cx = capX(t), cleared = t < B.shovel[0] ? X0 - 60 : Math.min(X1 + 70, K.lerp(X0, X1, K.prog(t, ...B.shovel)) + 70)
        x.save(); x.globalAlpha *= Math.min(1, a)
        for (let px = X0 - 60; px < DX - 74; px += 10) {
          if (px < cleared) continue
          const h = 58 + 10 * Math.sin(px * 0.05) + 6 * Math.sin(px * 0.13)
          x.fillStyle = K.INK; x.fillRect(px - 2, K.GROUND - h - 2, 14, h + 4); x.fillStyle = '#eef2ff'; x.fillRect(px, K.GROUND - h, 10, h)
        }
        x.fillStyle = 'rgba(120,130,190,0.45)'; for (let px = X0 - 60; px < cleared; px += 34) x.fillRect(px, K.GROUND + 2, 22, 6)
        x.restore()
        // Capricorn + shovel
        const shovelling = t > B.shovel[0] && t < B.shovel[1], tiptoe = t > B.tiptoe[0] && t < B.tiptoe[1]
        const ph = shovelling ? ((t - B.shovel[0]) / 0.55) % 1 : 0
        K.mini(x, t, { x: cx, size: 160, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.hug[0] ? 'heart' : t > B.open[0] ? 'sparkle' : tiptoe ? 'squint' : shovelling ? 'neutral' : t > B.ahem && t < B.back[0] ? 'wide' : 'neutral', look: tiptoe ? [-1, 0] : [1, 0], seed: 4, pop: a, squash: tiptoe ? -0.08 : shovelling ? 0.06 * Math.sin(ph * Math.PI * 2) : 0, bob: tiptoe ? 0 : undefined, hops: tiptoe ? [7.7, 8.0, 8.3] : [B.ahem + 0.2, ...(t > B.knock[0] ? [B.knock[0], B.knock[1]] : [])] })
        if (t < B.tiptoe[0] + 0.2) {
          const sa = 1 - K.prog(t, B.tiptoe[0], B.tiptoe[0] + 0.2)
          x.save(); x.globalAlpha *= sa * a; x.translate(cx + 70, K.ACT_Y + 10); x.rotate(-0.5 + Math.sin(ph * Math.PI * 2) * 0.4)
          x.fillStyle = K.INK; x.fillRect(-6, -90, 12, 110); x.fillStyle = '#8a5a33'; x.fillRect(-3, -86, 6, 104); x.fillStyle = K.INK; x.fillRect(-26, 16, 52, 40); x.fillStyle = '#9aa3b8'; x.fillRect(-22, 20, 44, 32); x.restore()
        }
        // flying snow chunks (thrown back over the shoulder)
        scoops.forEach(s => { const p = K.prog(t, s, s + 0.6); if (p <= 0 || p >= 1) return; const sx = cx + 60 - p * 260, sy = K.ACT_Y - 20 - Math.sin(Math.PI * p) * 160; x.fillStyle = K.INK; x.fillRect(sx - 14, sy - 14, 28, 28); x.fillStyle = K.SNOW; x.fillRect(sx - 11, sy - 11, 22, 22) })
        K.label(x, 'shff', cx - 90, K.ACT_Y - 150, 34, K.ICE, shovelling ? 0.4 + 0.6 * Math.abs(Math.sin(ph * Math.PI)) : 0, -0.1)
        K.label(x, 'tiptoe…', cx, K.ACT_Y - 150, 36, K.BONE, tiptoe ? 1 : 0)
        K.label(x, 'ahem.', 700, 690, 44, K.ME.color, K.prog(t, B.ahem, B.ahem + 0.15) * (1 - K.prog(t, B.back[0] + 0.4, B.back[0] + 0.7)), 0.08)
        K.burst(x, DX - 10, K.GROUND - 330, 90, t, B.knock[0], { word: 'KNOCK', size: 28, color: '#ffd34d', life: 0.5 })
        K.burst(x, DX + 20, K.GROUND - 300, 90, t, B.knock[1], { word: 'KNOCK', size: 28, color: '#ff9a7a', life: 0.5 })
        K.label(x, 'thank you!', DX - 30, K.GROUND - 340, 44, K.THEM, K.prog(t, B.thanks, B.thanks + 0.15) * (1 - K.prog(t, B.hug[1] + 1.2, B.hug[1] + 1.5)))
        if (t > B.hug[1]) K.heart(x, (cx + tx) / 2, K.ACT_Y - 170 + Math.sin(t * 2) * 6, 8 * K.pop01(t, B.hug[1], 0.35, 3) * K.popOut(t, T.out))
      },
      cues: [
        ...scoops.map((s, i) => ['whoosh', s, 0.25, i % 2 ? 0.025 : 0.03]), ...scoops.map(s => ['tick', s + 0.55, 0.02]),
        ['tick', 7.7, 0.02], ['tick', 8.0, 0.02], ['tick', 8.3, 0.02], ['pluck', B.ahem, 392, 0.04, 0.4, 0], ['pluck', B.ahem + 0.18, 349.23, 0.04, 0.4, 0],
        ['boom', B.knock[0], 0.08], ['boom', B.knock[1], 0.08], ['whoosh', B.open[0], 0.5, 0.035], ['glitter', B.open[0] + 0.1, B.open[1]],
        ['pop', B.thanks, 1318.51, 0.04, 0.3], ['pop', B.hug[1], 1567.98, 0.04, 0.1], ['glitter', B.hug[1], B.hug[1] + 0.5],
      ],
    }
  },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, LINES_EXPORT = F.LINES_EXPORT
