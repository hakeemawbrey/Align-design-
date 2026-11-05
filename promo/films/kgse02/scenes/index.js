// kgse02: GUESS THE SIGN, "The story posted for one viewer" (9 s vertical, star_advice trial, pop · E, loop).
//   0.00  frame 0: the silhouette mid-pose under a camera flash burst, framed as a phone story.
//         Hook: "Posted a story for *exactly one person.*"
//   0.35  whip zoom · then the phone: VIEWERS 48, refresh, refresh… one name still missing
//   C1 "a tiny crown" (a crown lands on its head) · C2 "a ring light" (one clicks on, left)
//   buzz "PISCES?" · 3·2·1 · reveal: LEO · last line · loop back to frame 0
import { makeGuess, box, R, phone, bubble, shadow, drawBits, sparkles, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, RED, CYAN, MINT, PINK, INTER, MONO } from '../../kgse01/scenes/guesskit.js'

const CROWN = ['G.G.G', 'GGGGG', 'GRGRG', 'GGGGG']
function viewers(u, S) {
  return (x, w, h) => {
    R(x, '#14102a', 0, 0, w, h)
    x.textBaseline = 'middle'; x.textAlign = 'left'
    x.font = `800 22px ${INTER}`; x.fillStyle = BONE; x.fillText(`VIEWERS ${40 + Math.min(8, Math.floor(u * 2.2))}`, 14, 26)
    // refresh arrow spinning
    x.save(); x.translate(w - 28, 26); x.rotate(u * 9); x.font = `900 28px ${INTER}`; x.textAlign = 'center'; x.fillStyle = CYAN; x.fillText('↻', 0, 2); x.restore()
    const names = ['mom', 'bestie', 'the gym friend', 'cousin', 'old roommate', 'neighbour']
    const off = (u * 60) % 40
    names.forEach((n, i) => { const y = 62 + i * 40 - off; if (y < 50) return; R(x, '#3a3160', 12, y, 22, 22); x.font = `700 20px ${INTER}`; x.fillStyle = BONE; x.fillText(n, 44, y + 12) })
    // the one name: not there
    R(x, '#4a1020', 0, h - 62, w, 62)
    x.font = `800 20px ${INTER}`; x.fillStyle = '#ff8a9a'; x.fillText('them: not yet', 14, h - 31)
  }
}
function ringLight(x, cx, cy, Rr, on) {
  R(x, INK, cx - 7, cy + Rr - 6, 14, 1250 - cy - Rr + 6); R(x, '#5a5470', cx - 3, cy + Rr, 6, 1250 - cy - Rr)
  if (on > 0) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(cx, cy, Rr * 0.4, cx, cy, Rr * 3); g.addColorStop(0, `rgba(255,248,225,${0.3 * on})`); g.addColorStop(1, 'rgba(255,248,225,0)'); x.fillStyle = g; x.fillRect(cx - Rr * 3, cy - Rr * 3, Rr * 6, Rr * 6); x.restore() }
  for (let p = 0; p < 2; p++) for (let i = 0; i < 36; i++) { const a = i / 36 * Math.PI * 2, px = cx + Math.cos(a) * Rr, py = cy + Math.sin(a) * Rr; if (p === 0) R(x, INK, px - 13, py - 13, 26, 26); else R(x, on > 0.5 ? '#fffbea' : '#6a6488', px - 9, py - 9, 18, 18) }
}

export const EP = makeGuess({
  id: 'kgse02', sign: 'leo', D: 9, ending: 'loop', brk: 'whip',
  hook: 'Posted a story for | *exactly one person.*',
  clues: ['a tiny crown', 'a ring light'],
  last: 'Just tell them you *thought of them.*',
  draw(x, S) {
    const { t, u, rv, T } = S
    const ringOn = clamp(prog(t, T.C2 + 0.05, T.C2 + 0.2))
    if (T.C2 != null && t > T.C2) ringLight(x, 180, 760, 110, ringOn)
    // frame 0: a camera flash burst + story frame around the pose
    const fl = Math.exp(-u * 2.5)
    if (fl > 0.03) {
      x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = fl
      const g = x.createRadialGradient(500, 900, 10, 500, 900, 520); g.addColorStop(0, 'rgba(255,255,255,0.9)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 300, 1080, 1200)
      for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + 0.2; x.fillStyle = 'rgba(255,255,240,0.5)'; x.save(); x.translate(500, 900); x.rotate(a); x.fillRect(120, -6, 380 * fl + 80, 12); x.restore() }
      x.restore()
    }
    // story progress bars + frame (fade out as the phone takes over)
    const sf = outK(t, [1.6, 2.0])
    if (sf > 0.01) {
      x.save(); x.globalAlpha = sf
      x.strokeStyle = BONE; x.lineWidth = 8; x.strokeRect(160, 520, 700, 780)
      for (let i = 0; i < 3; i++) { R(x, 'rgba(239,230,214,0.35)', 180 + i * 225, 540, 210, 8); R(x, BONE, 180 + i * 225, 540, i === 0 ? 210 * clamp(u / 1.5) : 0, 8) }
      x.restore()
    }
    const hops = [1.2, 2.3, 2.9, 3.6, 4.4, 5.2].filter(h => h < S.R)
    const pose = Math.exp(-u * 2)
    const slump = clamp(prog(u, 3.0, 4.2)) * (1 - rv)
    shadow(x, 520, 1240, 300)
    S.sil({ x: 500, y: 1010, s: 390, mood: rv > 0.5 ? 'sparkle' : slump > 0.5 ? 'sleepy' : 'wide', look: [1, 0.3], hops, rot: 0.18 * pose - 0.06 * slump, squash: -0.1 * pose + 0.1 * slump, zzz: false })
    // crown (clue 1)
    if (t > T.C1) { const k = pop01(t, T.C1 + 0.08, 0.3, 2.6); const bob = 4 * Math.sin(t * 5); drawBits(x, CROWN, { G: GOLD, R: RED }, 500 + 10 * Math.sin(t * 3), lerp(500, 835, ease.outCubic(k)) + bob, 16 * Math.min(1, k)) }
    // the phone with the viewer list
    const pk = pop01(t, 1.55, 0.35, 2.2)
    phone(x, 790, 890 + 6 * Math.sin(t * 3.5), { w: 240, h: 380, rot: 0.12, k: pk, fn: viewers(u, S) })
    if (rv > 0.5) bubble(x, t, 330, 700, S.R + 0.35, S.D + 1, '…I’ll just text them.', { size: 32, tail: 0.4 })
    if (t > S.R) sparkles(x, t, 500, 790, S.R + 0.05, 10, 160, 1, [GOLD, BONE, PINK])
  },
  cues: [['pop', 0.01, 1760, 0.05, 0], ['glitter', 0.0, 0.35], ['pop', 1.6, 987.77, 0.04, 0.3], ['whoosh', 1.55, 0.25, 0.03],
    ...[2.2, 2.9, 3.6, 4.3].map(c => ['tick', c, 0.05]), ['pop', 4.1, 330, 0.04, -0.2]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
