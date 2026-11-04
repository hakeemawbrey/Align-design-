// ngwe24 · Your Star Guide: Winter · ♓ Pisces · note 2 / 4 (your holiday blind spot) · 25 s (story 0–20.6, then the end card)
//   0.00–2.85  "*Pisces,* what do | *you* want?"  The ♓ guide, big, lantern lit, snow falling.
//   2.9–7.1    Gifts drop onto a wobbling tower in Pisces' arms, one after another. One flies off to a little cat in the
//              snow ("for the cat!", mrrp). YOUR STAR: "gifts for everyone. even the neighbour's cat."
//   7.15–10.8  The mint star asks "and you?"; Pisces freezes, the tower wobbles. A blank list floats down: "PISCES WANTS:"
//              YOUR STAR: "and you forgot to ask for anything."
//   10.85–14.5 YOUR STAR: "make your own list this year. we'll wait."  Pisces sets the tower down and writes: "a hug."
//              The mint star hops over and hugs it. Pisces fountains.
//   14.55      card flip · "Your *wishes* | count too."  Two stars hugging in the snow.
import { guideFilm } from '../../ngwe01/gwkit.js'

const MINT = '#9fe6b0'
const CAT = ['K...K..', 'KK.KK..', 'KKKKK..', 'KWKWK..', 'KKKKK.K', '.KKKKKK', '.KKKKK.', '.K.K.K.']
const GIFTC = [{ R: '#e2453c', Y: '#ffd34d' }, { R: '#3a6fd8', Y: '#ffffff' }, { R: '#3fae6a', Y: '#e2453c' }, { R: '#ff8fb1', Y: '#ffd34d' }, { R: '#c96f2f', Y: '#3ce6cf' }]
const F = guideFilm({
  id: 'ngwe24', sign: 'pisces', note: 2, len: 25, pisces: false,
  hook: '*Pisces,* what do | *you* want?',
  lines: ["gifts for everyone. even the *neighbour's cat*.", 'and you forgot to ask for *anything*.', "make your *own list* this year. we'll wait."],
  chip: 'PISCES: SYMBOL, THE FISH.|RULER OF THE 12TH HOUSE (DREAMS)',
  last: 'Your *wishes* | count too.', late: 0,
  gag: (T, K) => {
    const B = { drops: [3.3, 3.75, 4.2, 4.65, 5.1], cat: [5.7, 6.3], ask: 7.7, list: [8.4, 9.2], down: [11.1, 11.5], write: [11.7, 12.6], hop: [12.9, 13.4], hug: 13.45 }
    const PX = 360, TX0 = 820, CATX = 640, LX = 590, LY = 1020
    const themX = t => K.lerp(TX0, PX + 140, K.ease.inOutCubic(K.prog(t, ...B.hop)))
    return {
      draw(x, t) {
        const a = K.appear(t, T.scene + 0.05)
        if (a <= 0.01) return
        const hugging = t > B.hug
        const tears = hugging ? 3 : t > B.ask ? 1 : t > B.cat[1] ? 2 : 1
        const wob = t > B.drops[0] && t < B.down[0] ? Math.sin(t * 5) * (t > B.ask && t < B.list[1] ? 0.12 : 0.05) : 0
        // the cat
        const cp = K.appear(t, T.scene + 0.4)
        K.drawBits(x, CAT, { K: '#7a68b8', W: '#ffd34d' }, CATX, K.GROUND - 40, 10 * cp)
        if (t > B.cat[1]) K.drawBits(x, ['..Y.Y..', '...Y...', 'RRRYRRR', 'RRRYRRR', 'RRRYRRR'], { R: '#e2453c', Y: '#ffd34d' }, CATX + 66, K.GROUND - 26, 6 * K.pop01(t, B.cat[1], 0.3, 2.6) * K.popOut(t, T.out))
        K.label(x, 'mrrp', CATX, K.GROUND - 110, 30, K.BONE, K.prog(t, B.cat[1] + 0.1, B.cat[1] + 0.25) * (1 - K.prog(t, B.cat[1] + 1.1, B.cat[1] + 1.3)))
        // stars
        const tx = themX(t)
        K.mini(x, t, { x: tx, size: 150, color: MINT, mood: hugging ? 'heart' : t > B.write[1] ? 'sparkle' : t > B.ask ? 'neutral' : 'happy', look: [-1, 0], seed: 9, pop: K.appear(t, T.scene + 0.3), hops: [B.ask, B.hop[0]], squash: hugging ? 0.1 : 0 })
        K.mini(x, t, { x: PX, size: 170, color: K.ME.color, glyph: K.ME.glyph, mood: hugging ? 'happy' : t > B.write[0] ? 'neutral' : t > B.ask ? 'wide' : 'sparkle', look: t > B.ask && t < B.down[0] ? [1, 0] : t > B.write[0] && t < B.write[1] ? [1, -0.6] : [0, -1], seed: 4, pop: a, hops: [...B.drops, B.hug], squash: hugging ? 0.1 : 0, tears })
        // the gift tower (in Pisces' arms, then set down in a pile)
        const downP = K.ease.inOutCubic(K.prog(t, ...B.down))
        B.drops.forEach((d, i) => {
          if (t < d - 0.4) return
          if (i === 4 && t > B.cat[0]) {
            const p = K.prog(t, ...B.cat); if (p >= 1) return
            K.drawBits(x, K.BM.GIFT, GIFTC[i], K.lerp(PX, CATX + 60, p), K.lerp(K.ACT_Y - 150 - i * 0, K.GROUND - 30, p) - Math.sin(Math.PI * p) * 150, 7, { rot: p * 4 })
            return
          }
          const fall = K.ease.inCubic(K.prog(t, d - 0.4, d))
          const sx = PX + Math.sin(wob * 3 + i) * i * 8 + wob * i * 40, sy = K.lerp(880, K.ACT_Y - 70 - i * 56, fall)
          const px = K.lerp(sx, 170 + (i % 2) * 60, downP), py = K.lerp(sy, K.GROUND - 28 - Math.floor(i / 2) * 56, downP)
          K.drawBits(x, K.BM.GIFT, GIFTC[i], px, py, 7 * Math.min(a, K.popOut(t, T.out)), { rot: (wob * (i + 1)) * (1 - downP) })
        })
        // the list
        if (t > B.list[0]) {
          const p = K.ease.outCubic(K.prog(t, ...B.list)), k = K.popOut(t, T.out)
          x.save(); x.translate(LX, K.lerp(860, LY, p) + Math.sin(t * 2) * 4); x.rotate(Math.sin(p * 8) * 0.12 * (1 - p) + 0.03); x.scale(k, k)
          x.fillStyle = K.INK; x.fillRect(-140, -70, 280, 140); x.fillStyle = '#f5eedf'; x.fillRect(-134, -64, 268, 128)
          x.fillStyle = '#c42a3f'; x.font = "800 26px Inter"; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('PISCES WANTS:', -116, -34)
          x.fillStyle = '#c9b8f0'; x.fillRect(-116, 26, 232, 4)
          const w = 'a hug.', n = Math.ceil(K.prog(t, ...B.write) * w.length)
          if (n > 0) { x.fillStyle = '#2c2a7a'; x.font = "italic 600 44px 'EB Garamond', Georgia, serif"; x.fillText(w.slice(0, n), -100, 6) }
          x.restore()
        }
        K.label(x, 'for the cat!', PX + 40, K.ACT_Y - 360, 34, K.ME.color, K.prog(t, B.cat[0], B.cat[0] + 0.15) * (1 - K.prog(t, B.cat[1] + 0.6, B.cat[1] + 0.9)))
        K.label(x, 'and you?', TX0 - 10, K.ACT_Y - 150, 38, MINT, K.prog(t, B.ask, B.ask + 0.15) * (1 - K.prog(t, B.list[1], B.list[1] + 0.3)))
        if (hugging) K.heart(x, (PX + tx) / 2, K.ACT_Y - 190 + Math.sin(t * 2) * 6, 9 * K.pop01(t, B.hug, 0.35, 3) * K.popOut(t, T.out))
      },
      cues: [
        ...B.drops.map((d, i) => ['pop', d, [587.33, 659.25, 739.99, 880, 987.77][i], 0.035, -0.2]), ['whoosh', B.cat[0], 0.4, 0.03], ['pop', B.cat[1], 1567.98, 0.035, 0.2], ['pluck', B.cat[1] + 0.1, 1318.51, 0.025, 0.3, 0.2],
        ['pop', B.ask, 1174.66, 0.04, 0.4], ['whoosh', B.list[0], 0.6, 0.03], ['tick', B.list[1], 0.04], ['whoosh', B.down[0], 0.3, 0.03],
        ...Array.from({ length: 6 }, (_, i) => ['tick', +(B.write[0] + i * 0.15).toFixed(2), 0.025]), ['whoosh', B.hop[0], 0.3, 0.03], ['pop', B.hug, 1318.51, 0.045, 0], ['glitter', B.hug, B.hug + 0.6],
        ['pluck', B.hug + 0.3, 659.25, 0.03, 0.6, -0.2],
      ],
    }
  },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, LINES_EXPORT = F.LINES_EXPORT
