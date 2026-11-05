// kpre08 — PISCES REACTS: "A note in the coat pocket" (9.4 s vertical trial reel, star_advice; dreamy · F). Hard cut.
// Kit: ../../kpre07/scenes/prkit.js (read-only) on top of hookkit.js. No end card, no card cut.
//   0.0  frame 0: a folded note mid-pull from a coat pocket, Pisces mid-sniffle, hook "They left a note in my coat."
//   1.0  record scratch + freeze on the note · 2.6 it unfolds: "have a good day, you nerd <3"
//   3.0  Pisces' tears launch sideways · 4.4 Pisces clutches its own copy to the screen · 8.5 the last line, hard cut.
import { buildReact, sobCues, bits, PAL, INK, BONE, label, PINK } from '../../kpre07/scenes/prkit.js'
import { recordScratch, recordScratchCues } from '../../hookkit.js'

const REC = { at: 1.0, len: 1.4, sub: 'pisces, putting on their coat', caption: 'wait. *what’s this?*', top: 1700 }
function note(x, cx, cy, w, open, rot = 0) {
  const h = w * 0.72, sx = 0.25 + 0.75 * open
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(sx, 1)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = '#fff8ec'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = 'rgba(90,123,224,0.3)'; for (let i = 0; i < 4; i++) x.fillRect(-w / 2 + 20, -h / 2 + h * (0.3 + i * 0.18), w - 40, 3)
  if (open > 0.85) {
    x.fillStyle = '#2c2a7a'; x.font = `italic 500 ${Math.round(w * 0.1)}px 'EB Garamond', serif`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText('have a good day,', 0, -h * 0.12); x.fillText('you nerd <3', 0, h * 0.16)
  }
  x.restore()
}
const R = buildReact({
  id: 'kpre08', duration: 9.4, ending: 'cut',
  hook: 'They left a note | in *my coat.*',
  playing: 'monday · 7:41 AM',
  freeze: [REC],
  clip(x, t, H) {
    const W = H.WIN
    x.fillStyle = '#8a5a3a'; x.fillRect(W.x, W.y, W.w, W.h)                               // the coat
    x.fillStyle = '#7a4a2e'; for (let i = 0; i < 12; i++) x.fillRect(W.x + i * 84, W.y, 6, W.h)
    x.fillStyle = INK; x.fillRect(W.x + 260, W.y + 300, 440, 260); x.fillStyle = '#6a3e26'; x.fillRect(W.x + 270, W.y + 310, 420, 240)   // the pocket
    x.fillStyle = '#e8c06a'; x.beginPath(); x.arc(W.x + 160, W.y + 120, 26, 0, Math.PI * 2); x.fill(); x.beginPath(); x.arc(W.x + 160, W.y + 420, 26, 0, Math.PI * 2); x.fill()
    const pull = 0.45 + 0.55 * H.in(t, 0, 0.9), open = H.in(t, 2.5, 3.1)
    const cy = H.lerp(W.y + 380, W.y + 230, pull) - open * 20
    note(x, W.x + 480, cy, H.lerp(220, 560, open), open, -0.06 + 0.06 * open)
    if (t > 3.1) H.spark(t, W.x + 480, W.y + 210, 3.1, 12, 260, 3)
    H.stamp('KEEPING THIS FOREVER', W.x + 480, W.y + 470, H.pop(t, 6.0), { col: '#ff6fa8', size: 40, rot: -0.08 })
  },
  tears: t => (t < 2.9 ? 1 : 3),
  meter: t => (t < 2.9 ? 0.3 : Math.min(1, 0.3 + (t - 2.9) * 0.6)),
  mood: t => (t < 2.9 ? 'sparkle' : 'wide'),
  react(x, t, H) {
    if (t < 4.4) return
    const k = H.pop(t, 4.4, 0.35, 2.2)
    x.save(); x.translate(650, 1500); x.rotate(-0.15); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-86, -58, 172, 116); x.fillStyle = '#fff8ec'; x.fillRect(-80, -52, 160, 104)
    x.fillStyle = PINK; x.font = `800 30px Inter`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('<3', 0, 0)
    x.restore()
  },
  last: { at: 8.5, text: 'Being called a nerd has never felt this good.' },
  extra: [recordScratch(REC)],
  cues: [...recordScratchCues(REC), ['whoosh', 2.5, 0.4, 0.04], ['pop', 3.1, 1318.51, 0.05, 0], ['glitter', 3.1, 3.7], ...sobCues(3.2, 3), ['pop', 4.4, 987.77, 0.04, 0.3], ...sobCues(5.6, 3), ['riser', 3.0, 5.2, 0.025], ['tom', 6.0, 120, { gain: 0.2, decay: 0.2 }], ['tick', 6.0, 0.06]],
})
export const { DURATION, SCENES, CUES } = R
