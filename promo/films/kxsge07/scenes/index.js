// kxsge07 · Your Star Guide: Extended · ♎ The Libra Guide: Whatever You Want · hard cut
//   HOOK   Libra mid-spin on a spinning menu wheel, a scale swinging wildly, "where do you want to eat?" slamming; whip zoom.
//   ch1    HOW YOU LOVE: Libra lays out a pretty picnic: blanket, matching cups, a flower in the middle.
//   ch2    WHAT YOU NEED: two stars meet in the middle of a little bridge; a "no score" scoreboard switches off.
//   ch3    WHERE IT GETS HARD: the scale tips: their side full, Libra's side empty ("whatever you want").
//   ch4    TRY THIS WEEK: Libra points: "tacos. I want tacos." The scale levels; both cheer.
//   Last line: "Your vote counts too."
import { guideXFilm, HK } from '../../kxsge01/sgxkit.js'

const WHIP = { at: 0.5, from: 1.45 }
const OPTS = ['TACOS', 'SUSHI', 'PIZZA', 'NOODLES', 'SALAD', 'CURRY', 'BURGERS', 'SOUP']
function scale(K, x, t, cx, cy, tilt, a = 1, left = null, right = null) {
  if (a <= 0.01) return
  x.save(); x.globalAlpha *= a; x.translate(cx, cy)
  x.fillStyle = K.INK; x.fillRect(-10, -10, 20, 170); x.fillRect(-70, 150, 140, 20)
  x.fillStyle = '#e8b42c'; x.fillRect(-6, -6, 12, 160); x.fillRect(-64, 152, 128, 14)
  x.rotate(tilt)
  x.fillStyle = K.INK; x.fillRect(-220, -10, 440, 18); x.fillStyle = '#e8b42c'; x.fillRect(-216, -6, 432, 10)
  for (const s of [-1, 1]) {
    x.save(); x.translate(s * 210, 0); x.rotate(-tilt)
    x.strokeStyle = '#e8b42c'; x.lineWidth = 3; x.beginPath(); x.moveTo(0, 0); x.lineTo(-60, 80); x.moveTo(0, 0); x.lineTo(60, 80); x.stroke()
    x.fillStyle = K.INK; x.fillRect(-74, 78, 148, 18); x.fillStyle = '#e8b42c'; x.fillRect(-70, 80, 140, 12)
    const fn = s < 0 ? left : right; if (fn) fn(x)
    x.restore()
  }
  x.restore()
}
const F = guideXFilm({
  id: 'kxsge07', sign: 'libra',
  hook: 'LIBRA. *“WHATEVER YOU* | *WANT.”* AGAIN.',
  promise: 'STAY FOR CHAPTER 4',
  chip: 'LIBRA: CARDINAL AIR,|RULED BY VENUS', chipCh: 0,
  last: 'Your vote | counts *too.*', late: 1, ending: 'cut',
  hookScene: K => ({
    fx: [{ scene: HK.whipZoom(WHIP), cues: HK.whipZoomCues(WHIP) }],
    draw(x, t) {
      const spin = t * 5 + 0.4
      x.save(); x.translate(540, 1180)
      for (let i = 0; i < 8; i++) {
        const an = spin + i * Math.PI / 4
        x.fillStyle = i % 2 ? '#3a3168' : '#6f5bd6'; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 330, an, an + Math.PI / 4); x.closePath(); x.fill()
        x.save(); x.rotate(an + Math.PI / 8); x.font = '800 30px Inter'; x.fillStyle = '#efe6d6'; x.textAlign = 'right'; x.fillText(OPTS[i], 300, 10); x.restore()
      }
      x.strokeStyle = K.INK; x.lineWidth = 12; x.beginPath(); x.arc(0, 0, 334, 0, Math.PI * 2); x.stroke()
      x.restore()
      K.mini(x, t, { x: 540, y: 1180, size: 220, color: K.ME.color, glyph: K.ME.glyph, mood: 'wide', look: [Math.sin(t * 7), Math.cos(t * 7)], seed: 4, bob: 0, squash: 0.05 * Math.sin(t * 20) })
      K.bubble(x, 'where do you want to eat?', 540, 780, { size: 32, color: '#ff8fb1', ink: K.INK, s: 1 + 0.04 * Math.sin(t * 9) })
      K.drawBits(x, ['..R..', '.RRR.', 'RRRRR', '..R..'], K.COL, 540, 1500, 9)
    },
    cues: [...Array.from({ length: 10 }, (_, i) => ['tick', +(0.05 + i * 0.3).toFixed(2), 0.035])],
  }),
  chapters: [
    { lines: ['you love by making it *lovely* for them.', 'matching cups. a flower. the *good* blanket.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, blanket: C + 1.6, cups: C + 3.4, flower: C + 5.0, them: C + 7.6, sit: C + 9.6, out: C + 14.6 }
        return {
          draw(x, t) {
            const a = K.appear(t, B.in, B.out); if (a <= 0.01) return
            const bp = K.ease.outCubic(K.prog(t, B.blanket, B.blanket + 0.6))
            if (t > B.blanket) { x.save(); x.globalAlpha *= a; for (let i = 0; i < 8; i++) for (let j = 0; j < 2; j++) { x.fillStyle = (i + j) % 2 ? '#ff8fb1' : '#fff0f5'; x.fillRect(540 - 260 * bp + i * 65 * bp, K.GROUND - 40 + j * 20, 65 * bp, 20) } x.restore() }
            if (t > B.cups) { K.drawBits(x, K.BM.CUP, { ...K.COL, W: '#ffd1e0', M: '#6b4423' }, 470, K.GROUND - 70, 6 * K.pop01(t, B.cups, 0.3, 3) * a); K.drawBits(x, K.BM.CUP, { ...K.COL, W: '#ffd1e0', M: '#6b4423' }, 610, K.GROUND - 70, 6 * K.pop01(t, B.cups + 0.25, 0.3, 3) * a) }
            if (t > B.flower) K.drawBits(x, K.BM.ROSE, K.COL, 540, K.GROUND - 80, 8 * K.pop01(t, B.flower, 0.3, 3) * a)
            const sitP = K.ease.inOutCubic(K.prog(t, B.sit, B.sit + 0.6))
            K.mini(x, t, { x: K.lerp(240, 330, sitP), y: K.ACT_Y, size: 150, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.sit ? 'heart' : 'happy', look: [1, 0], seed: 4, pop: a, hops: [B.blanket, B.cups, B.flower] })
            const tx = t < B.them ? 1120 : K.lerp(1050, 760, K.ease.outCubic(K.prog(t, B.them, B.them + 0.8)))
            K.mini(x, t, { x: tx, y: K.ACT_Y, size: 145, color: K.THEM, mood: t > B.them + 0.8 ? 'sparkle' : 'neutral', look: [-1, 0], seed: 9, pop: a, hops: [B.them + 0.9, B.sit] })
            if (t > B.them + 0.9) K.label(x, 'you did all this?!', 760, 960, 38, '#ffd34d', K.pop01(t, B.them + 0.9, 0.3, 3) * a * (1 - K.prog(t, B.sit + 2, B.sit + 2.4)))
          },
          cues: [['whoosh', B.blanket, 0.4, 0.03], ['pop', B.cups, 987.77, 0.035, -0.2], ['pop', B.cups + 0.25, 1108.73, 0.035, 0.2], ['pop', B.flower, 1318.51, 0.04, 0], ['glitter', B.them + 0.9, B.them + 1.3], ['pop', B.sit, 880, 0.03, 0]],
        }
      } },
    { lines: ['you need someone who meets you *halfway*…', '…and doesn’t keep *score*.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, walk: C + 1.8, meet: C + 4.6, board: C + 7.0, off: C + 9.4, out: C + 14.6 }
        return {
          draw(x, t) {
            const a = K.appear(t, B.in, B.out); if (a <= 0.01) return
            // a little arched bridge
            x.save(); x.globalAlpha *= a; x.strokeStyle = K.INK; x.lineWidth = 22; x.beginPath(); x.moveTo(150, K.GROUND); x.quadraticCurveTo(540, K.GROUND - 180, 930, K.GROUND); x.stroke()
            x.strokeStyle = '#c08552'; x.lineWidth = 14; x.stroke(); x.restore()
            const p = K.ease.inOutCubic(K.prog(t, B.walk, B.meet))
            const bh = u => K.GROUND - 4 * 180 * 0.5 * u * (1 - u) - 70
            const u1 = K.lerp(0.12, 0.44, p), u2 = K.lerp(0.88, 0.56, p)
            K.mini(x, t, { x: 150 + 780 * u1, y: bh(u1), size: 140, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.meet ? 'heart' : 'happy', look: [1, 0], seed: 4, pop: a, hops: [B.walk + 0.6, B.walk + 1.4, B.walk + 2.2, B.meet] })
            K.mini(x, t, { x: 150 + 780 * u2, y: bh(u2), size: 135, color: K.THEM, mood: t > B.meet ? 'heart' : 'happy', look: [-1, 0], seed: 9, pop: a, hops: [B.walk + 1.0, B.walk + 1.8, B.meet] })
            if (t > B.meet) K.heart(x, 540, bh(0.5) - 120 - (t - B.meet) * 14, 8 * K.pop01(t, B.meet, 0.35, 3), (1 - K.prog(t, B.meet + 2.2, B.meet + 2.6)) * a)
            // the scoreboard that switches off
            if (t > B.board) {
              const on = t < B.off, sp = K.pop01(t, B.board, 0.35, 2.4) * a
              x.save(); x.translate(540, 910); x.scale(sp, sp); x.fillStyle = K.INK; x.fillRect(-180, -60, 360, 120); x.fillStyle = on ? '#1d1440' : '#0b0818'; x.fillRect(-172, -52, 344, 104)
              x.font = '700 40px Space Mono, monospace'; x.textAlign = 'center'; x.fillStyle = on ? '#ff4d6d' : '#3a3168'; x.fillText(on ? 'ME 7 : YOU 6' : 'NO SCORE', 0, 14); x.restore()
              if (!on) K.sparkles(x, t, 540, 910, B.off, 8, 160, 2)
            }
          },
          cues: [['tick', B.walk + 0.6, 0.03], ['tick', B.walk + 1.4, 0.03], ['tick', B.walk + 2.2, 0.03], ['glitter', B.meet, B.meet + 0.4], ['pop', B.meet, 1318.51, 0.04, 0], ['pop', B.board, 659.25, 0.03, 0], ['pop', B.off, 392, 0.035, 0], ['tick', B.off, 0.05]],
        }
      } },
    { lines: ['you agree so it stays nice. it gets *lonely*.', 'balance needs *two* sides on the scale.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, scale: C + 1.4, add: C + 2.6, tip: C + 5.4, look: C + 8.2, think: C + 10.0, out: C + 14.6 }
        return {
          draw(x, t) {
            const a = K.appear(t, B.in, B.out); if (a <= 0.01) return
            const nThem = t > B.add ? Math.min(4, 1 + Math.floor((t - B.add) * 1.4)) : 0
            const tilt = -0.32 * K.ease.outCubic(K.prog(t, B.tip - 1.6, B.tip))
            const sp = K.pop01(t, B.scale, 0.35, 2.4) * a
            scale(K, x, t, 540, 870, tilt + Math.sin(t * 2) * 0.02, sp, null, xx => { for (let i = 0; i < nThem; i++) K.drawBits(xx, K.BM.HEART, K.COL, -40 + (i % 2) * 70, 60 - Math.floor(i / 2) * 44, 5) })
            if (t > B.add) ['their pick', 'their movie', 'their plan'].forEach((w, i) => K.label(x, w, 790, 820 - i * 46, 26, '#c9b8f0', K.pop01(t, B.add + i * 0.7, 0.3, 3) * a * (1 - K.prog(t, B.look, B.look + 0.4))))
            if (t > B.tip) K.label(x, 'LIBRA: (empty)', 300, 1010, 30, '#ff8fb1', K.pop01(t, B.tip, 0.3, 3) * a)
            K.mini(x, t, { x: 300, y: K.ACT_Y, size: 150, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.look ? 'neutral' : 'happy', look: t > B.look ? [0, -1] : [1, 0], seed: 4, pop: a, hops: [B.look] })
            K.mini(x, t, { x: 780, y: K.ACT_Y, size: 145, color: K.THEM, mood: t > B.think ? 'neutral' : 'happy', look: [-1, 0], seed: 9, pop: a, hops: [B.think] })
            if (t > B.think) K.bubble(x, 'what do YOU want?', 760, K.ACT_Y - 170, { size: 24, color: '#6f5bd6', s: K.pop01(t, B.think, 0.3, 2.6) * a, tail: -1 })
          },
          cues: [['pop', B.scale, 659.25, 0.035, 0], ...[0, 1, 2].map(i => ['pop', +(B.add + i * 0.7).toFixed(2), 880 + i * 110, 0.03, 0.3]), ['boom', B.tip, 0.09], ['pop', B.tip, 440, 0.035, -0.3], ['pluck', B.look, 587.33, 0.03, 0.6, -0.3], ['pop', B.think, 1174.66, 0.035, 0.3]],
        }
      } },
    { lines: ['this week: say what *you* want. once.', 'small is fine. *“tacos”* counts.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, menu: C + 1.4, point: C + 3.6, level: C + 4.6, cheer: C + 7.4, eat: C + 9.6 }
        return {
          draw(x, t) {
            const a = K.appear(t, B.in); if (a <= 0.01) return
            const tilt = -0.32 * (1 - K.ease.outBack(K.prog(t, B.level, B.level + 0.8)))
            scale(K, x, t, 540, 870, tilt, K.pop01(t, B.in, 0.35, 2.4) * a, xx => { if (t > B.level) K.drawBits(xx, K.BM.HEART, K.COL, 0, 60, 6) }, xx => { K.drawBits(xx, K.BM.HEART, K.COL, -30, 60, 5); K.drawBits(xx, K.BM.HEART, K.COL, 30, 60, 5) })
            K.mini(x, t, { x: 300, y: K.ACT_Y, size: 155, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.cheer ? 'sparkle' : t > B.point ? 'happy' : 'neutral', look: [1, 0], seed: 4, pop: a, hops: [B.point, B.cheer, B.cheer + 0.5] })
            K.mini(x, t, { x: 780, y: K.ACT_Y, size: 145, color: K.THEM, mood: t > B.cheer ? 'sparkle' : 'happy', look: [-1, 0], seed: 9, pop: a, hops: [B.cheer + 0.25, B.cheer + 0.75] })
            if (t > B.point && t < B.eat + 1) K.bubble(x, 'tacos. I want tacos.', 360, K.ACT_Y - 180, { size: 28, color: K.ME.color, ink: K.INK, s: K.pop01(t, B.point, 0.3, 2.6) * a })
            if (t > B.cheer && t < B.eat + 1) K.bubble(x, 'YES. tacos!!', 760, K.ACT_Y - 180, { size: 28, color: '#6f5bd6', s: K.pop01(t, B.cheer, 0.3, 2.6) * a, tail: -1 })
            if (t > B.level + 0.8) K.label(x, 'BALANCED.', 540, 1060, 50, '#9fe6b0', K.pop01(t, B.level + 0.8, 0.3, 3) * a)
            if (t > B.eat) { for (let i = 0; i < 2; i++) K.drawBits(x, ['..YYYY..', '.YGRGRY.', 'YYYYYYYY'], K.COL, 470 + i * 140, K.GROUND - 40 - Math.sin(Math.PI * K.prog(t, B.eat + i * 0.2, B.eat + i * 0.2 + 0.5)) * 40, 7 * a); K.sparkles(x, t, 540, K.ACT_Y - 40, B.eat, 12, 200, 5) }
          },
          cues: [['pop', B.point, 1174.66, 0.04, -0.3], ['whoosh', B.level, 0.4, 0.03], ['pop', B.level + 0.8, 1318.51, 0.04, 0], ['glitter', B.cheer, B.cheer + 0.5], ['pop', B.cheer, 1567.98, 0.04, 0.3], ['pop', B.eat, 987.77, 0.035, -0.1], ['pop', B.eat + 0.2, 1108.73, 0.035, 0.1]],
        }
      } },
  ],
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, LINES_EXPORT = F.LINES_EXPORT
