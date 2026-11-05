// kute21: THE UNSENT TEXT, "Their time: 4 a.m." (8 s vertical trial reel, music: dreamy · F).
// The series look lives in ../../kute01/unsentkit.js (shared, read-only). Rows: promo/films/month2/m36.md.
//   0.00 frame 0: Sagittarius mid-yawn under a moon / sun split, two clocks spinning, "u up?" mid-delete · 0.30 whip zoom
//   1.00 "call me?" ✗ · 2.40 "thinking of you. no rush." → SENT 4.30 (Pisces happy-cries) · 5.20 THE STARS
import { makeUnsent } from '../../kute01/unsentkit.js'
import { drawBits, box, R, label, hearts, sparkles, tissues, shadow, INK, GOLD, BONE, RED, PINK, BLUE, INTER, SERIF, MONO, ease, clamp, prog } from '../../kute01/unsentkit.js'
// two clocks behind the hero: YOU 7:02 PM (sun) and THEM 4:02 AM (moon); the hands spin at frame 0, then settle
function clocks(c, t) {
  const spin = t < 0.7 ? (1 - clamp(t / 0.7)) * 14 : 0
  ;[[110, 'YOU', 7.03, GOLD], [250, 'THEM', 4.03, '#7fd0ff']].forEach(([cx, lb, hr, col], i) => {
    const cy = 760 + i * 30
    box(c, cx - 62, cy - 62, 124, 124, BONE, { b: 6 }); R(c, col, cx - 62, cy - 62, 124, 14)
    const a = (hr % 12) / 12 * Math.PI * 2 + spin * (i ? 1.3 : 1)
    c.save(); c.translate(cx, cy); c.strokeStyle = INK; c.lineWidth = 8; c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.sin(a) * 30, -Math.cos(a) * 30); c.stroke()
    c.lineWidth = 5; c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.sin(a * 12) * 44, -Math.cos(a * 12) * 44); c.stroke(); c.restore()
    label(c, lb, cx, cy + 92, { size: 26, col })
  })
}
const EP = makeUnsent({
  id: 'kute21', duration: 8,
  sign: 'sagittarius', name: 'Sagittarius', to: 'Ines', status: 'their time: 4:02 am', statusCol: '#ffd36b', avatar: '#7fd0ff',
  hook: 'Their time: *4 a.m.* | Texting anyway?', ending: 'cut', draftBase: 1,
  msgs: [{ text: 'night!! talk tomorrow (your tomorrow)', at: -9, stamp: 'your time: 6:15 pm' }],
  drafts: [
    { text: 'u up?', at: -0.8, cps: 8, del: -0.1, delCps: 14 },
    { text: 'call me?', at: 1.0, cps: 12, del: 2.0, delCps: 26 },
    { text: 'thinking of you. no rush.', at: 2.4, cps: 16, send: 4.3 },
  ],
  breaks: [{ kind: 'whip', at: 0.3, from: 1.6 }],
  back: (c, t) => clocks(c, t),
  moods: [[-9, 'sleepy', [0, 0]], [1.0, 'squint', [1, -0.3]], [2.0, 'wide', [0, 0]], [2.4, 'sparkle', [1, -0.3]], [4.3, 'happy', [0, 0]]],
  sob: t => t > 4.35 ? 3 : 2, pisMood: t => t > 4.35 ? 'heart' : 'sparkle',
  lines: [{ t: 5.2, text: 'Send the *soft* one. It’ll keep.' }],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
