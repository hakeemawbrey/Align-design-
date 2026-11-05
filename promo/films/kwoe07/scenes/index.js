// kwoe07: WHICH ONE ARE YOU? · "The Ex Liked Your Photo" (trial reel, synthwave · Bb, hard cut). Format: kwoe01/scenes/wokit.js.
//   frame 0  a notification banner slamming in, "your ex liked your photo", Leo mid-spin in panel 2 (whip out of 2).
//   1 Scorpio raises one eyebrow and closes the app · 2 Leo posts another photo · 3 Virgo is too busy colour-coding a
//   calendar to notice · 4 Libra screenshots it for the friends.  5 Pisces: cries at our old playlist.  Hard cut.
import { makeWhich, slam0, phone, chat, bubble, label, glow, floor, desk, sparkles, actionLines, drawBits, HEART, R, box, osc, saw, prog, clamp, lerp, BONE, GOLD, PINK, INK, MINT, BLUE, INTER } from '../../kwoe01/scenes/wokit.js'

function fx(x, t) {
  const { a } = slam0(t, [0.85, 1.05])
  if (a <= 0.01) return
  const y = lerp(440, 560, Math.min(1, ease_(t / 0.25)))
  x.save(); x.globalAlpha = a; x.translate(540, y + 6 * Math.sin(t * 50) * Math.exp(-t * 4))
  box(x, -440, -70, 880, 140, 'rgba(36,28,70,0.96)', { b: 6 })
  R(x, PINK, -410, -42, 84, 84); drawBits(x, HEART, { H: BONE }, -368, 0, 8)
  x.font = `700 26px 'Space Mono', monospace`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = 'rgba(239,230,214,0.7)'; x.fillText('PHOTOS · now', -300, -26)
  x.font = `800 40px ${INTER}`; x.fillStyle = BONE; x.fillText('your ex liked your photo', -300, 20)
  x.restore()
}
const ease_ = p => 1 - Math.pow(1 - Math.max(0, p), 3)

function p1(x, t, P) {   // Scorpio: one eyebrow, app closed
  floor(x)
  const closed = P.u > 0.7
  P.star(x, t, { x: 170, y: 330, s: 190, mood: 'squint', look: [1, 0] })
  // the one raised brow
  R(x, INK, 175, 245 - (P.u > 0.2 ? 12 : 0), 40, 9)
  phone(x, 360, 300, { s: 1.1, glowA: closed ? 0 : 0.3, screen: (x, w, h) => { if (closed) return; R(x, '#3a2d66', 0, 0, w, h); R(x, PINK, 10, 20, w - 20, 70); drawBits(x, HEART, { H: '#ff5c8a' }, w / 2, 112, 5) } })
  bubble(x, t, 220, 100, P.turn[0] + 0.4, Infinity, 'interesting.', { size: 30 })
}

function p2(x, t, P) {   // Leo: posts another one (frame-0 panel)
  for (let i = 0; i < 6; i++) glow(x, 40 + i * 80, 60, 70, '255,200,140', 0.15 + 0.1 * osc(t, 1, i * 0.2))
  const spin = osc(t, 1.4)
  P.star(x, t, { x: 220, y: 330, s: 200, mood: spin > 0 ? 'wink' : 'sparkle', look: [spin, -0.3], squash: 0.12 * spin })
  actionLines(x, t, 220, 310, 120, 160, 10, GOLD, 0.5)
  phone(x, 390, 200, { s: 0.85, rot: -0.3, col: '#f39a3a' })
  const f = saw(t, 0.9); if (f < 0.12) glow(x, 390, 200, 260, '255,255,240', 0.6 * (1 - f / 0.12))
  if (P.u > 0.4) { box(x, 120, 470, 240, 46, MINT, { b: 5 }); x.font = `800 24px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('POSTED. AGAIN.', 240, 494) }
  bubble(x, t, 220, 100, P.turn[0] + 0.3, Infinity, 'oh, they’re looking?', { size: 25 })
}

function p3(x, t, P) {   // Virgo: colour-coding the calendar
  box(x, 200, 60, 260, 230, BONE, { b: 6 })
  const cols = [PINK, MINT, BLUE, GOLD, '#c9a6ff']
  const n = Math.floor(clamp(P.u + 1.5, 0, 3) * 7)
  for (let i = 0; i < 20; i++) { const cx = 214 + (i % 5) * 48, cy = 76 + Math.floor(i / 5) * 52; R(x, 'rgba(27,18,54,0.12)', cx, cy, 42, 44); if (i < n) R(x, cols[(i * 3) % 5], cx + 4, cy + 4, 34, 36) }
  desk(x, 20, 430, 440)
  P.star(x, t, { x: 120, y: 340, s: 170, mood: 'happy', look: [1, -0.4] })
  phone(x, 360, 415, { s: 0.5, rot: 1.5, glowA: 0.15 * (0.5 + 0.5 * osc(t, 3)) })
  label(x, 'bzz', 400, 380, { size: 20, alpha: 0.5 + 0.5 * osc(t, 3) })
  bubble(x, t, 160, 150, P.turn[0] + 0.4, Infinity, 'busy. very busy.', { size: 24 })
}

function p4(x, t, P) {   // Libra: screenshot for the group
  floor(x)
  P.star(x, t, { x: 160, y: 330, s: 180, mood: 'wide', look: [1, 0], hops: [P.turn[0] + 0.3] })
  phone(x, 350, 290, { s: 1.15, screen: (x, w, h) => chat(x, w, h, [{ me: false, text: '!!!' }, { me: false, text: 'NO WAY' }, { me: true, text: 'look 👀'.replace('👀', '>>') }]) })
  const f = P.u - 0.3; if (f > 0 && f < 0.2) { x.save(); x.globalAlpha = 1 - f / 0.2; R(x, '#ffffff', 0, 0, 480, 560); x.restore() }
  sparkles(x, t, 350, 290, P.turn[0] + 0.3, 8, 110, 0.4)
  bubble(x, t, 220, 100, P.turn[0] + 0.5, Infinity, 'sending to the group', { size: 25 })
}

const EP = makeWhich({
  id: 'kwoe07', hero: 1, flash: '#ff6b7f', deep: '#c0587a', fx,
  hook: 'Your *ex* just | liked your photo.',
  freeze: 'from *2019?*',
  panels: [
    { sign: 'scorpio', bg: 'dark', caption: 'one eyebrow up. *App closed.*', draw: p1, cues: [['tick', 0.2, 0.05], ['tom', 0.7, 160, { gain: 0.12, decay: 0.1 }]] },
    { sign: 'leo', bg: 'party', caption: 'posts *another* photo', draw: p2, cues: [['pop', 0.4, 1760, 0.04, 0.3], ['glitter', 0.4, 0.7]] },
    { sign: 'virgo', bg: 'office', caption: 'too busy colour-coding *to notice*', draw: p3, cues: [['tick', 0.1, 0.03], ['tick', 0.3, 0.03], ['tick', 0.5, 0.03], ['tick', 0.7, 0.03]] },
    { sign: 'libra', bg: 'night', caption: 'screenshots it *for the friends*', draw: p4, cues: [['tick', 0.3, 0.1], ['pop', 0.32, 1760, 0.03, 0], ['pop', 0.6, 987.77, 0.03, 0]] },
  ],
  pisces: 'cries at *our old playlist.*',
  ending: 'cut',
  cues: [['pop', 0.02, 1318.51, 0.05, 0], ['pop', 0.14, 1760, 0.05, 0]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [chat, sparkles, prog, lerp, GOLD, BLUE]
