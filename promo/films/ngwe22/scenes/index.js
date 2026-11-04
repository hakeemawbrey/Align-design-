// ngwe22 · Your Star Guide: Winter · ♑ Capricorn · note 2 / 4 (your holiday blind spot) · 25 s (story 0–20.6, then the end card)
//   0.00–2.85  "*Capricorn,* it's a | *holiday.*"  The ♑ guide, big, lantern lit, snow falling.
//   2.9–7.1    Capricorn types at a laptop on a snow block ("just one email."); envelopes fly out of the screen and
//              swirl up into the snowfall. YOUR STAR: "\"just one email.\" it's the holidays."
//   7.15–10.8  The lavender star waits by a board game on the snow, then yawns. More envelopes.
//              YOUR STAR: "the laptop can close for a day."
//   10.85–14.5 YOUR STAR: "they miss you. not your inbox."  Capricorn looks over, shuts the laptop (THUNK), hops to the
//              board and rolls: the dice tumble… 6! Both cheer.
//   14.55      card flip · "Close the laptop. | *Open* the game."  Pisces sobs in the snow.
import { guideFilm } from '../../ngwe01/gwkit.js'

const F = guideFilm({
  id: 'ngwe22', sign: 'capricorn', note: 2, len: 25,
  hook: '*Capricorn,* it’s a | *holiday.*',
  lines: ["\"just one email.\" it's *the holidays*.", 'the laptop can *close* for a day.', 'they miss *you*. not your inbox.'],
  chip: 'CAPRICORN: SYMBOL, THE SEA-GOAT.|RULER OF THE 10TH HOUSE (CAREER)',
  last: 'Close the laptop. | *Open* the game.', late: 0, lastSize: 100,
  gag: (T, K) => {
    const B = { type: [3.2, 11.4], one: 3.6, yawn: [8.3, 9.6], look: 11.3, shut: [11.6, 11.85], hop: [12.2, 12.7], roll: [12.9, 13.6], six: 13.65 }
    const CX = 230, LX = 390, GX = 650, TX = 820
    const mails = []; for (let m = 3.5; m < 11.4; m += 0.42) mails.push(+m.toFixed(2))
    const capX = t => K.lerp(CX, GX - 165, K.ease.inOutCubic(K.prog(t, ...B.hop)))
    return {
      draw(x, t) {
        const a = K.appear(t, T.scene + 0.05)
        if (a <= 0.01) return
        // snow block + laptop
        x.save(); x.globalAlpha *= Math.min(1, a)
        x.fillStyle = K.INK; x.fillRect(LX - 74, K.GROUND - 64, 148, 64); x.fillStyle = '#eef2ff'; x.fillRect(LX - 68, K.GROUND - 58, 136, 58)
        const lid = 1 - K.ease.inCubic(K.prog(t, ...B.shut))
        x.fillStyle = K.INK; x.fillRect(LX - 70, K.GROUND - 78, 140, 16); x.fillStyle = '#9aa3b8'; x.fillRect(LX - 66, K.GROUND - 74, 132, 8)
        if (lid > 0.02) { const h = 100 * lid; x.fillStyle = K.INK; x.fillRect(LX - 64, K.GROUND - 74 - h, 128, h); x.fillStyle = t < B.shut[0] ? '#6fd3ff' : '#2b2350'; x.fillRect(LX - 58, K.GROUND - 68 - h, 116, h - 6); if (lid > 0.8) { x.fillStyle = '#ffffff'; for (let r = 0; r < 4; r++) x.fillRect(LX - 48, K.GROUND - 160 + r * 18, 60 + ((r * 37 + Math.floor(t * 6)) % 40), 6) } }
        else { x.fillStyle = K.INK; x.fillRect(LX - 70, K.GROUND - 90, 140, 14); x.fillStyle = '#6c7489'; x.fillRect(LX - 66, K.GROUND - 86, 132, 6) }
        x.restore()
        // the board game on the snow
        x.save(); x.globalAlpha *= Math.min(1, a); x.translate(GX, K.GROUND - 10); x.scale(1, 0.45)
        x.fillStyle = K.INK; x.fillRect(-96, -96, 192, 192)
        for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) { x.fillStyle = (i + j) % 2 ? '#ffd34d' : '#3fae6a'; x.fillRect(-90 + i * 30, -90 + j * 30, 30, 30) }
        x.restore()
        // envelopes flying up into the snow
        mails.forEach((m, i) => { const p = K.prog(t, m, m + 1.6); if (p <= 0 || p >= 1) return; const ex = LX + Math.sin(i * 2.3) * 60 + p * (i % 2 ? 160 : -120), ey = K.GROUND - 160 - p * 640; K.drawBits(x, K.BM.ENVELOPE, K.COL, ex, ey, 5, { rot: Math.sin(t * 3 + i) * 0.3, alpha: 1 - p }) })
        const yawn = t > B.yawn[0] && t < B.yawn[1], cheer = t > B.six
        K.mini(x, t, { x: TX, size: 150, color: K.THEM, mood: cheer ? 'heart' : t > B.shut[1] ? 'sparkle' : yawn ? 'sleepy' : 'neutral', zzz: false, look: [-1, 0.5], seed: 9, pop: K.appear(t, T.scene + 0.25), hops: [B.shut[1] + 0.1, B.six, B.six + 0.5] })
        const typing = t > B.type[0] && t < B.shut[0]
        K.mini(x, t, { x: capX(t), size: 160, color: K.ME.color, glyph: K.ME.glyph, mood: cheer ? 'happy' : t > B.look ? 'wide' : typing ? 'squint' : 'neutral', look: t > B.look ? [1, 0] : [1, 0.6], seed: 4, pop: a, squash: typing ? 0.03 * Math.sin(t * 40) : 0, hops: [B.hop[0], B.six, B.six + 0.5] })
        // dice
        if (t > B.roll[0]) {
          const p = K.prog(t, ...B.roll), k = K.popOut(t, T.out)
          for (const d of [0, 1]) { const dx = K.lerp(GX - 60, GX - 20 + d * 50, K.ease.outCubic(p)), dy = K.GROUND - 40 - Math.abs(Math.sin(p * Math.PI * 3)) * 80 * (1 - p); K.drawBits(x, d === 0 ? ['WWWWW', 'WKWKW', 'WWWWW', 'WKWKW', 'WWWWW'] : K.BM.DICE, { W: '#ffffff', K: K.INK }, dx, dy, 7 * k, { rot: (1 - p) * 6 + d }) }
        }
        K.label(x, '"just one email."', CX + 40, K.ACT_Y - 190, 34, K.ME.color, K.prog(t, B.one, B.one + 0.15) * (1 - K.prog(t, 6.6, 6.9)))
        K.label(x, 'yawn', TX, K.ACT_Y - 130, 34, K.BONE, yawn ? 1 : 0)
        K.burst(x, LX, K.GROUND - 190, 90, t, B.shut[1], { word: 'THUNK', size: 30, life: 0.7 })
        K.label(x, '6!', GX + 10, K.GROUND - 150, 56, K.GOLD, K.prog(t, B.six, B.six + 0.1) * (1 - K.prog(t, B.six + 1.6, B.six + 1.9)))
        K.sparkles(x, t, GX, K.GROUND - 60, B.six, 12, 160, 4)
      },
      cues: [
        ...Array.from({ length: 24 }, (_, i) => ['tick', +(B.type[0] + i * 0.33).toFixed(2), 0.015]), ...mails.map((m, i) => ['pop', m, [1174.66, 1318.51, 1567.98][i % 3], 0.015, i % 2 ? 0.3 : -0.3]),
        ['pluck', B.yawn[0], 293.66, 0.03, 0.8, 0.4], ['pop', B.look, 880, 0.035, -0.3], ['boom', B.shut[1], 0.1], ['whoosh', B.hop[0], 0.3, 0.03],
        ['tick', B.roll[0] + 0.1, 0.05], ['tick', B.roll[0] + 0.3, 0.05], ['tick', B.roll[0] + 0.5, 0.04], ['pop', B.six, 1567.98, 0.045, 0], ['glitter', B.six, B.six + 0.6],
      ],
    }
  },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, LINES_EXPORT = F.LINES_EXPORT
