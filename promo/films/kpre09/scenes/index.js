// kpre09 — PISCES REACTS: "They split the last croissant" (8 s vertical trial reel, star_advice; funk · G). LOOPS.
// Kit: ../../kpre07/scenes/prkit.js (read-only) on top of hookkit.js. No end card, no card cut.
//   0.0  frame 0: two hands mid-grab on the last pastry in a bakery case, Pisces already screaming.
//        Hook "Two strangers. ONE last pastry." · whip zoom
//   1.0  sudden silence (tape stop) · they look at each other · 2.6 they split it in half, perfectly
//   2.9  the CRY-O-METER pegs · Pisces wails · 5.0 "Half a pastry. Full heart." · 7.6–8.0 eases back into frame 0.
import { buildReact, sobCues, bits, PAL, INK, BONE, GOLD } from '../../kpre07/scenes/prkit.js'

const CROISSANT = ['....KKKK......', '..KKOOOOKK....', '.KOOYOOYOOK...', 'KOYOOYOOYOOK..', 'KOOYOOYOOYOK..', '.KOOOOOOOOK...', '..KKKKKKKK....']
const HALF_L = CROISSANT.map(r => r.slice(0, 7) + 'K'), HALF_R = CROISSANT.map(r => 'K' + r.slice(7))
function hand(x, cx, cy, cell, flip, col) {
  bits(x, ['KKKKKKKK....', 'KSSSSSSKKKK.', 'KSSSSSSSSSSK', 'KSSSSSSKKKK.', 'KSSSSSSK....', 'KKKKKKKK....'].map(r => (flip ? [...r].reverse().join('') : r)), { K: INK, S: col }, cx, cy, cell)
}
const R = buildReact({
  id: 'kpre09', duration: 8, ending: 'loop',
  hook: 'Two strangers. | *ONE* last pastry.',
  playing: 'the corner bakery · 9:15 AM',
  clip(x, t, H) {
    const W = H.WIN
    // the bakery case
    x.fillStyle = '#f4e8cc'; x.fillRect(W.x, W.y, W.w, W.h)
    x.fillStyle = INK; x.fillRect(W.x + 60, W.y + 250, W.w - 120, 300); x.fillStyle = '#cfe8f2'; x.fillRect(W.x + 70, W.y + 260, W.w - 140, 280)
    x.fillStyle = '#e9dcc4'; x.fillRect(W.x + 70, W.y + 470, W.w - 140, 70)
    for (let i = 0; i < 5; i++) { x.fillStyle = INK; x.fillRect(W.x + 120 + i * 160, W.y + 440, 120, 12) }
    x.fillStyle = '#c42a3f'; x.fillRect(W.x, W.y, W.w, 80); x.fillStyle = BONE; x.font = `800 40px Inter`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('FRESH TODAY', W.x + W.w / 2, W.y + 42)
    const split = H.in(t, 2.6, 3.2) * (1 - H.in(t, 7.4, 7.9))
    const cx = W.x + W.w / 2, cy = W.y + 400
    if (split < 0.02) bits(x, CROISSANT, PAL, cx, cy, 20)
    else { bits(x, HALF_L, PAL, cx - 80 - split * 120, cy - split * 40, 20); bits(x, HALF_R, PAL, cx + 80 + split * 120, cy - split * 40, 20) }
    // two hands (reach in at frame 0; pull back with a half each)
    const reach = 1 - 0.6 * split
    hand(x, H.lerp(W.x + 120, cx - 230, reach), cy - 10 - split * 40, 14, false, '#e8a87c')
    hand(x, H.lerp(W.x + W.w - 120, cx + 230, reach), cy - 10 - split * 40, 14, true, '#8a5a3a')
    // the two strangers above the case
    H.person(W.x + 150, W.y + 190, 10, { col: '#e8a87c', shirt: '#3fb88a', wave: t > 3.2 && t < 7.4 ? t * 8 : 0 }); H.person(W.x + W.w - 150, W.y + 190, 10, { col: '#8a5a3a', shirt: '#e163d6', wave: t > 3.2 && t < 7.4 ? t * 8 + 1 : 0, flip: true })
    // the look
    if (t > 1.0 && t < 2.6) { x.fillStyle = INK; x.font = `800 60px Inter`; x.fillText('…', cx, W.y + 170) }
    if (split > 0.9 && t < 7.4) H.spark(t, cx, cy - 60, 3.2, 12, 260, 5)
  },
  tears: t => (t < 2.9 ? 2 : 3),
  meter: t => (t < 1.0 ? 0.7 : t < 2.9 ? 0.55 : Math.min(1, 0.55 + (t - 2.9) * 2) - (t > 7.4 ? (t - 7.4) * 0.8 : 0)),
  mood: t => 'wide',
  last: { at: 5.0, text: 'Half a pastry. Full heart.' },
  cues: [['tapeStop', 1.0, 0.35], ['tick', 1.05, 0.06], ['whoosh', 2.6, 0.35, 0.04], ['pop', 3.0, 1174.66, 0.05, -0.3], ['pop', 3.05, 1318.51, 0.05, 0.3], ['glitter', 3.0, 3.6], ['crash', 3.0, { gain: 0.05 }], ...sobCues(3.2, 3, 0.035), ...sobCues(5.6, 2)],
})
export const { DURATION, SCENES, CUES } = R
