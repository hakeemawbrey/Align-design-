// kpre10 — PISCES REACTS: "Grandpa sent his first heart" (11 s vertical trial reel, star_advice; lofi · C). Hard cut.
// Kit: ../../kpre07/scenes/prkit.js (read-only) on top of hookkit.js. No end card, no card cut.
//   0.0  frame 0: a phone mid-buzz, "Grandpa is typing…" for 3:58, Pisces mid-lean. Hook "Grandpa is typing… for four minutes."
//   1.0  loading bar "grandpa is typing… 99%" · 4.0 the text lands: one giant heart + "is this how"
//   4.2  Pisces bawls into a tissue, the CRY-O-METER pegs · 9.9 the last line, hard cut.
import { buildReact, sobCues, bits, PAL, PIX, INK, BONE, GOLD, PINK, INTER } from '../../kpre07/scenes/prkit.js'
import { loadingBar, loadingBarCues } from '../../hookkit.js'

const BAR = { at: 1.0, len: 2.7, label: 'grandpa is typing…', stallAt: 99, error: null, y: 640 }
const R = buildReact({
  id: 'kpre10', duration: 11, ending: 'cut',
  hook: 'Grandpa is typing… | for *four minutes.*',
  playing: 'family chat · sunday',
  clip(x, t, H) {
    const W = H.WIN
    x.fillStyle = '#120c2a'; x.fillRect(W.x, W.y, W.w, W.h)
    x.fillStyle = '#2a2050'; x.fillRect(W.x, W.y, W.w, 90)
    x.fillStyle = BONE; x.font = `800 40px Inter`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('Grandpa', W.x + 120, W.y + 45)
    bits(x, ['..KKK..', '.KSSSK.', 'KSWSWSK', 'KSSSSSK', '.KSKSK.', '..KKK..'], { K: INK, S: '#d8c8b0', W: INK }, W.x + 60, W.y + 45, 8)
    const m = Math.floor(Math.min(t, 4) * 15 + 238), mm = Math.floor(m / 60), ss = String(m % 60).padStart(2, '0')
    if (t < 4.0) {
      x.fillStyle = '#e9e2f5'; x.fillRect(W.x + 40, W.y + 420, 170, 80)
      for (let i = 0; i < 3; i++) { x.fillStyle = INK; x.globalAlpha = 0.35 + 0.65 * (Math.floor(t * 6) % 3 === i ? 1 : 0); x.fillRect(W.x + 70 + i * 44, W.y + 450, 22, 22) } x.globalAlpha = 1
      x.fillStyle = 'rgba(239,230,214,0.7)'; x.font = `700 26px 'Space Mono'`; x.fillText(`typing for ${mm}:${ss}`, W.x + 240, W.y + 460)
    } else {
      const k = H.pop(t, 4.0, 0.4, 2.6)
      bits(x, PIX.bigheart, PAL, W.x + 250, W.y + 300, 26 * k)
      x.fillStyle = '#e9e2f5'; x.fillRect(W.x + 40, W.y + 440, 300 * Math.min(1, k), 70)
      if (k > 0.8) { x.fillStyle = INK; x.font = `800 36px ${INTER}`; x.fillText('is this how', W.x + 64, W.y + 476) }
      H.spark(t, W.x + 250, W.y + 300, 4.05, 14, 280, 4)
      const k2 = H.pop(t, 6.2, 0.3, 2.2)
      if (k2 > 0.01) { x.fillStyle = '#e9e2f5'; x.fillRect(W.x + 420, W.y + 440, 330 * Math.min(1, k2), 70); if (k2 > 0.8) { x.fillStyle = INK; x.fillText('did it send??', W.x + 444, W.y + 476) } }
      for (let i = 0; i < 3; i++) bits(x, PIX.bigheart, PAL, W.x + 520 + i * 150, W.y + 250 - (i % 2) * 40, 11 * H.pop(t, 7.6 + i * 0.25, 0.3, 2.6))
    }
    // the phone buzz on frame 0
    if (t < 1.0) { x.strokeStyle = 'rgba(188,182,255,0.6)'; x.lineWidth = 6; for (let i = 0; i < 3; i++) { const o = ((t * 3 + i / 3) % 1) * 40; x.strokeRect(W.x + 10 - o, W.y + 10 - o, W.w - 20 + 2 * o, W.h - 20 + 2 * o) } }
  },
  pisces: t => (t < 4.0 ? { squash: -0.08, y: 1400 } : {}),
  tears: t => (t < 4.1 ? 1 : 3),
  meter: t => (t < 4.1 ? 0.25 + t * 0.06 : Math.min(1, 0.5 + (t - 4.1) * 1.4)),
  mood: t => (t < 4.1 ? 'wide' : 'wide'),
  last: { at: 9.9, text: '“is this how” — yes, Grandpa. It is.' },
  extra: [loadingBar(BAR)],
  cues: [...loadingBarCues(BAR), ['pop', 4.0, 1174.66, 0.06, 0], ['bell', 4.05, 1760, 0.035, 1.2, 0], ['glitter', 4.0, 4.7], ...sobCues(4.3, 3, 0.035), ...sobCues(6.4, 3), ...sobCues(8.4, 2, 0.025), ['pop', 6.2, 880, 0.045, 0.2], ['pop', 7.6, 1174.66, 0.04, 0.3], ['pop', 7.85, 1318.51, 0.04, 0.3], ['pop', 8.1, 1567.98, 0.04, 0.3], ['tick', 0.1, 0.04], ['tick', 0.4, 0.04], ['tick', 0.7, 0.04]],
})
export const { DURATION, SCENES, CUES } = R
