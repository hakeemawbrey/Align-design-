// kpre05: PISCES REACTS, "They remembered the interview" (8.5 s vertical trial reel, star_advice, music: house · A). Hard cut.
// The look lives in ../../kpre01/scenes/reactkit.js.
//   0.00   frame 0: Virgo's phone, two texts glowing; Pisces behind it mid-scream-cry, tears spraying the screen.
//          Hook: "They *remembered* the interview." · 0.38 record scratch, freeze · 0.72 rewind "◀◀ 10 HOURS EARLIER"
//   1.12   8:00 AM "good luck today!! you've got this" · the clock spins to 6:00 PM · "how did it go??" · Virgo's whole
//          face softens · 6.32 Pisces: "THEY REMEMBERED." · 6.82 last line · hard cut 8.5.
import { makeReact, R, box, drawStarChar, signStar, sparkles, pop01, prog, clamp, lerp, ease, INK, BONE, GOLD, INTER } from '../../kpre01/scenes/reactkit.js'

const VIR = signStar('virgo')
const U = { am: 0.25, spin: [1.6, 2.6], pm: 2.8, soft: 3.7, END: 5.2 }

function set(x, c) {
  R(x, '#1d1636', 0, 0, 1080, 1920)
  for (let i = 0; i < 10; i++) R(x, 'rgba(255,255,255,0.025)', i * 120, 480, 50, 1440)
  void c
}
function moment(x, c, u) {
  x.save(); x.translate(540, 940); x.rotate(0.03)
  box(x, -270, -430, 540, 840, '#2a2148', { b: 10 }); R(x, '#121026', -244, -390, 488, 760)
  // the clock at the top of the phone
  const spin = ease.inOutCubic(prog(u, ...U.spin))
  const hr = Math.round(lerp(8, 18, spin)), h12 = ((hr + 11) % 12) + 1, ap = hr < 12 ? 'AM' : 'PM'
  x.font = `700 64px 'Space Mono', monospace`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(`${h12}:00 ${ap}`, 0, -320 + (u > U.spin[0] && u < U.spin[1] ? 6 * Math.sin(u * 50) : 0))
  x.font = `700 28px 'Space Mono', monospace`; x.fillStyle = '#9fe6b0'; x.fillText('♌︎ them', 0, -250)
  const msg = (y, text, t0, col = '#3a3160') => { const k = pop01(u, t0, 0.22, 2.4); if (k <= 0.01) return; x.save(); x.font = `800 40px ${INTER}`; const w = Math.min(440, x.measureText(text).width + 44); x.translate(-220 + w / 2, y); x.scale(k, k); R(x, col, -w / 2, -40, w, 80); x.fillStyle = BONE; x.textAlign = 'center'; x.fillText(text, 0, 2); x.restore() }
  msg(-150, 'good luck today!!', U.am)
  msg(-55, 'you’ve got this', U.am + 0.25)
  msg(90, 'how did it go??', U.pm, '#4f6fd8')
  x.restore()
  if (u > U.spin[0] && u < U.spin[1]) { x.save(); x.globalAlpha = Math.sin(Math.PI * prog(u, ...U.spin)); x.font = `900 54px ${INTER}`; x.fillStyle = GOLD; x.textAlign = 'center'; x.fillText('10 hours later…', 540, 1300); x.restore() }
  drawStarChar(x, 220, 1400, 340, c, { color: VIR.color, glyph: VIR.glyph, mood: u < U.pm ? 'neutral' : u < U.soft ? 'wide' : 'sparkle', look: [1, -1], seed: 3, blush: u > U.soft ? 1 : 0 })
  if (u > U.soft) sparkles(x, u, 220, 1320, U.soft, 10, 190, 2)
}
// tears spraying the screen in the sob state
function front(x, c, u) {
  if (u < U.END) return
  for (let i = 0; i < 12; i++) { const px = 300 + ((i * 137) % 480), py = 600 + ((i * 251) % 560), r = 10 + (i % 3) * 6; x.globalAlpha = 0.7; R(x, '#8fe3ff', px - r, py - r, r * 2, r * 2.4); R(x, '#fff', px - r, py - r, r * 0.8, r * 0.8) }
  x.globalAlpha = 1; void c
}

const EP = makeReact({
  id: 'kpre05', D: 8.5, loop: false, END: U.END, accent: '#a8e6a0', label: '10 HOURS EARLIER',
  hook: 'They *remembered* | the interview.',
  set, moment, front,
  pis: { x: 860, y: 1390, s: 360, look: [-1, -1] },
  react: [[0, 0, 'neutral'], [U.am, 1, 'wide'], [U.pm, 2, 'wide'], [U.soft, 3, 'sparkle']],
  line: { text: 'THEY REMEMBERED.', x: 560, y: 1140, size: 52, col: '#ffe9a8', tail: 0.6 },
  last: 'They *remembered.* That’s the whole thing.',
  cues: T => [
    ['pop', T.u(U.am), 880, 0.04, -0.2], ['pop', T.u(U.am) + 0.25, 987.77, 0.04, -0.2],
    ['riser', T.u(U.spin[0]), T.u(U.spin[1]), 0.03], ...[0, 1, 2, 3, 4, 5].map(i => ['tick', +(T.u(U.spin[0]) + i * 0.16).toFixed(3), 0.03]),
    ['pop', T.u(U.pm), 1318.51, 0.05, 0], ['pluck', T.u(U.soft), 1174.66, 0.04, 0.5, -0.3], ['pluck', T.u(U.soft) + 0.12, 1567.98, 0.035, 0.5, -0.3],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [clamp]
