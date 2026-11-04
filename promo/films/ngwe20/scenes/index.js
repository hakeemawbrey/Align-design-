// ngwe20 · Your Star Guide: Winter · ♏ Scorpio · note 2 / 4 (your holiday blind spot) · 25 s (story 0–20.6, then the end card)
//   0.00–2.85  "*Scorpio,* it's | *just* a gift."  The ♏ guide, big, lantern lit, snow falling.
//   2.9–7.1    An opened gift box in the snow: a plain mug with a tag ("to: S"). Scorpio leans in with a magnifying glass,
//              question marks swirling. YOUR STAR: "you're reading the gift tag like a clue."
//   7.15–10.8  Scorpio flips the mug over, checks the bottom for a secret: nothing. The lavender star shrugs: "it's… a mug?"
//              YOUR STAR: "it's a mug, love. not a hidden message."
//   10.85–14.5 YOUR STAR: "if you wonder, ask. don't decode."  Scorpio puts the glass down: "why a mug?"  "your hands get
//              cold." Scorpio melts (heart eyes), fills it, sips (steam).
//   14.55      card flip · "Sometimes it's | *just* *a* *mug.*"  Pisces sobs in the snow.
import { guideFilm } from '../../ngwe01/gwkit.js'

const F = guideFilm({
  id: 'ngwe20', sign: 'scorpio', note: 2, len: 25,
  hook: '*Scorpio,* it’s | *just* a gift.',
  lines: ["you're reading the gift tag *like a clue*.", "it's a mug, love. *not* a hidden message.", "if you wonder, *ask*. don't decode."],
  chip: 'SCORPIO: SYMBOL, THE SCORPION.|RULER OF THE 8TH HOUSE (DEPTH)',
  last: "Sometimes it's | *just* *a* *mug.*", late: 3, lastSize: 104,
  gag: (T, K) => {
    const B = { lens: [3.4, 10.9], flip: [7.8, 8.3], bottom: 8.4, unflip: [9.0, 9.4], shrug: 9.6, ask: 11.3, answer: 12.2, melt: 12.9, sip: 13.5 }
    const MX = 560, MY = K.GROUND - 70, SX = 300, TX = 800
    const mugRot = t => K.lerp(0, Math.PI, K.ease.inOutCubic(K.prog(t, ...B.flip))) * (1 - K.ease.inOutCubic(K.prog(t, ...B.unflip)))
    const lensPos = t => { const u = t - B.lens[0]; return { x: MX - 20 + Math.sin(u * 1.3) * 70, y: MY - 40 + Math.cos(u * 1.7) * 40 } }
    return {
      draw(x, t) {
        const a = K.appear(t, T.scene + 0.05)
        if (a <= 0.01) return
        // the opened box
        x.save(); x.globalAlpha *= Math.min(1, a)
        x.fillStyle = K.INK; x.fillRect(MX - 110, K.GROUND - 70, 220, 70); x.fillStyle = '#c42a3f'; x.fillRect(MX - 104, K.GROUND - 64, 208, 64); x.fillStyle = K.GOLD; x.fillRect(MX - 12, K.GROUND - 64, 24, 64)
        x.fillStyle = K.INK; x.fillRect(MX + 120, K.GROUND - 40, 120, 40); x.fillStyle = '#c42a3f'; x.fillRect(MX + 126, K.GROUND - 34, 108, 30); x.restore()
        // the mug (rotates when flipped) + its tag
        const lifted = t > B.flip[0] - 0.2 && t < B.unflip[1] + 0.2 ? 60 : 0
        x.save(); x.translate(MX, MY - lifted); x.rotate(mugRot(t)); K.drawBits(x, K.BM.MUG, K.COL, 0, 0, 13 * Math.min(1, a)); x.restore()
        if (t > B.bottom && t < B.unflip[0]) K.label(x, 'NO SECRETS', MX, MY - 160, 32, K.BONE, K.prog(t, B.bottom, B.bottom + 0.15), -0.05)
        if (!lifted) { x.save(); x.globalAlpha *= Math.min(1, a); x.strokeStyle = K.BONE; x.lineWidth = 3; x.beginPath(); x.moveTo(MX + 40, MY - 30); x.lineTo(MX + 80, MY + 10); x.stroke(); x.translate(MX + 92, MY + 28); x.rotate(0.2); x.fillStyle = K.INK; x.fillRect(-36, -20, 72, 40); x.fillStyle = '#f5eedf'; x.fillRect(-32, -16, 64, 32); x.fillStyle = K.INK; x.font = "800 18px Inter"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('to: S', 0, 1); x.restore() }
        if (t > B.sip) K.steam(x, t, MX - 20, MY - 90, K.popOut(t, T.out))
        // stars
        const sleuth = t > B.lens[0] && t < B.ask
        K.mini(x, t, { x: TX, size: 150, color: K.THEM, mood: t > B.melt ? 'happy' : t > B.answer ? 'sparkle' : t > B.shrug ? 'wide' : 'neutral', look: [-1, 0], seed: 9, pop: K.appear(t, T.scene + 0.25), hops: [B.shrug, B.answer], squash: t > B.shrug && t < B.shrug + 1 ? -0.08 : 0 })
        K.mini(x, t, { x: SX + (t > B.melt ? K.ease.outCubic(K.prog(t, B.melt, B.melt + 0.5)) * 60 : 0), size: 160, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.melt ? 'heart' : t > B.ask ? 'neutral' : sleuth ? 'squint' : 'neutral', look: sleuth ? [1, 0.5] : [1, 0], seed: 4, pop: a, hops: [B.ask, B.melt] })
        // magnifying glass + swirling question marks
        if (t > B.lens[0] - 0.3 && t < B.lens[1] + 0.4) {
          const p = K.pop01(t, B.lens[0] - 0.3, 0.3, 2.4) * (1 - K.prog(t, B.lens[1], B.lens[1] + 0.4))
          const q = lensPos(t)
          x.save(); x.globalAlpha *= p; x.strokeStyle = K.INK; x.lineWidth = 22; x.lineCap = 'round'; x.beginPath(); x.moveTo(q.x - 50, q.y + 50); x.lineTo(SX + 70, K.ACT_Y + 10); x.stroke(); x.strokeStyle = '#8a5a33'; x.lineWidth = 14; x.stroke()
          x.fillStyle = 'rgba(191,227,255,0.3)'; x.strokeStyle = K.INK; x.lineWidth = 16; x.beginPath(); x.arc(q.x, q.y, 58, 0, Math.PI * 2); x.fill(); x.stroke(); x.strokeStyle = '#9aa3b8'; x.lineWidth = 8; x.stroke()
          x.fillStyle = 'rgba(255,255,255,0.6)'; x.fillRect(q.x - 30, q.y - 34, 14, 14); x.restore()
          for (let k = 0; k < 4; k++) { const an = t * 1.8 + k * Math.PI / 2; K.label(x, '?', SX + 10 + Math.cos(an) * 110, K.ACT_Y - 130 + Math.sin(an) * 30, 44, K.ME.color, p * 0.9) }
        }
        K.label(x, 'it’s… a mug?', TX - 10, K.ACT_Y - 160, 36, K.THEM, K.prog(t, B.shrug, B.shrug + 0.15) * (1 - K.prog(t, B.ask - 0.4, B.ask - 0.1)))
        K.label(x, 'why a mug?', SX + 40, K.ACT_Y - 170, 38, K.ME.color, K.prog(t, B.ask, B.ask + 0.15) * (1 - K.prog(t, B.answer, B.answer + 0.3)))
        K.label(x, 'your hands get cold.', TX - 120, K.ACT_Y - 170, 34, K.THEM, K.prog(t, B.answer, B.answer + 0.15) * (1 - K.prog(t, B.answer + 2.2, B.answer + 2.5)))
      },
      cues: [
        ['whoosh', B.lens[0], 0.4, 0.03], ...Array.from({ length: 5 }, (_, i) => ['pluck', +(B.lens[0] + 0.6 + i * 0.8).toFixed(2), [293.66, 349.23][i % 2], 0.025, 0.4, -0.2]),
        ['whoosh', B.flip[0], 0.3, 0.03], ['pop', B.bottom, 659.25, 0.035, 0], ['whoosh', B.unflip[0], 0.3, 0.025], ['pop', B.shrug, 1174.66, 0.035, 0.4],
        ['tick', B.ask - 0.4, 0.04], ['pop', B.ask, 880, 0.04, -0.3], ['pop', B.answer, 1318.51, 0.04, 0.3], ['glitter', B.melt, B.melt + 0.5], ['pop', B.melt, 1567.98, 0.04, -0.2], ['pluck', B.sip, 659.25, 0.03, 0.4, 0],
      ],
    }
  },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, LINES_EXPORT = F.LINES_EXPORT
