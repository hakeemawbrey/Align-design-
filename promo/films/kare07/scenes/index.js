// kare07 — THE ALMOST RELATIONSHIP, Ep 7: "Everyone else already calls it a relationship" (18 s vertical, star_advice;
// lofi · Bb; loop).
//   0.0–3.8   the café: Aquarius mid-slurp of soup across from Taurus; the kit's news desk is already on air:
//             BREAKING "Friends *confirm:* it's a thing". Hook "Your friends think | you're *together.*"
//   3.8–8.6   notifications drop from the group chat: "how's your person?" · "bring your person saturday!!"
//             Aquarius: "we're not… labelled."  Taurus, mid-sip: "…we're not?"
//   8.6–11.6  Pisces pops up at the window with a homemade SHIP IT sign, crying.
//  11.6–18.0  THE STARS: "Your friends see *something.*" · "If everyone sees it, *you two* can say it."
//             The last 0.45 s blend back into frame 0.
import { makeAlmost, drawCafe, drawCafeTable, CAFE, star, stars, standY, say, sparkles, prog, ease, pop01, R, box, INK, BONE, RED, PINK, GOLD, INTER, label } from '../../kare01/scenes/almostkit.js'

const D = 18
const T = { n1: 4.0, n2: 6.0, lab: 4.9, huh: 6.9, pis: 8.6, ship: 9.1, stars: 11.6, l1: 12.0, l2: 14.2 }
const S0 = CAFE.seats[0], S1 = CAFE.seats[1], SZ = 260

function soup(x, t, cx, cy, slurp) {
  box(x, cx - 70, cy - 20, 140, 50, BONE, { b: 5 }); R(x, '#e8a040', cx - 62, cy - 16, 124, 12)
  for (let i = 0; i < 3; i++) { const p = ((t * 0.8 + i / 3) % 1); x.save(); x.globalAlpha = 0.5 * (1 - p); R(x, '#fff', cx - 30 + i * 24, cy - 40 - p * 70, 10, 26); x.restore() }
  if (slurp) { R(x, INK, cx - 8, cy - 160, 16, 150); R(x, '#d8d0e8', cx - 4, cy - 156, 8, 142) }
}
function shipSign(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy - 10 * Math.abs(Math.sin(t * 6))); x.rotate(0.08 * Math.sin(t * 6)); x.scale(k, k)
  R(x, INK, -8, 40, 16, 170); R(x, '#a07850', -4, 40, 8, 166)
  box(x, -150, -70, 300, 120, BONE, { b: 7 })
  x.font = `800 58px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = RED; x.fillText('SHIP IT', 0, -6)
  x.restore()
}
const shots = [
  { a: 0, b: T.stars, draw(x, t) {
    drawCafe(x, t, {})
    const slurp = t < 3.0
    star(x, 'aquarius', S0.x, standY(SZ, S0.y), SZ, t, { mood: t > T.lab ? 'squint' : slurp ? 'wide' : 'neutral', look: slurp ? [1, -0.5] : [0.5, 0.6], squash: slurp ? 0.06 * Math.sin(t * 18) : 0, hops: [T.n1, T.lab] })
    star(x, 'taurus', S1.x, standY(SZ, S1.y), SZ, t, { mood: t > T.huh ? 'wide' : 'happy', look: [-1, 0], hops: [T.huh] })
    drawCafeTable(x, t, { cups: 1, pastry: null })
    soup(x, t, S0.x + 120, 1335, slurp)
    say(x, t, 360, 1000, T.lab, T.pis, 'we’re not… labelled.', { size: 32 })
    say(x, t, 760, 1040, T.huh, T.pis, '…we’re not?', { size: 32 })
    if (t > T.pis) {
      const pk = pop01(t, T.pis, 0.35, 2.2)
      star(x, 'pisces', 270, 700 + (1 - pk) * 300, 220, t, { tears: 3, mood: 'sparkle', look: [1, 0.3], hops: [T.ship, T.ship + 0.5], box: false })
      shipSign(x, t, 520, 640, pop01(t, T.ship, 0.3, 2.4))
      sparkles(x, t, 400, 640, T.ship, 10, 220, 6)
    }
  } },
  { a: T.stars, b: D + 1, draw(x, t) {
    drawCafe(x, t, {})
    star(x, 'aquarius', S0.x, standY(SZ, S0.y), SZ, t, { mood: t > T.l2 + 1.5 ? 'happy' : 'neutral', look: [1, -0.3], hops: [T.l2 + 1.5] })
    star(x, 'taurus', S1.x, standY(SZ, S1.y), SZ, t, { mood: t > T.l2 + 1.7 ? 'heart' : 'happy', look: [-1, -0.3] })
    drawCafeTable(x, t, { cups: 1, pastry: null })
    soup(x, t, S0.x + 120, 1335, false)
    star(x, 'pisces', 270, 700, 150, t, { tears: 2, mood: 'sparkle', look: [1, 0.3], box: false })
    stars(x, 640, 760, 180, t, { pop: pop01(t, T.stars, 0.38, 2.1), mood: t > T.l2 + 1.6 ? 'happy' : 'neutral', look: [-0.3, 0.6], hops: [T.l1, T.l2, T.l2 + 0.7] })
  } },
]
function cam(t) {
  const hit = [T.n1, T.pis, T.stars].reduce((m, c) => (t >= c && t - c < 0.3 ? c : m), null)
  const k = hit === null ? 0 : 1 - ease.outCubic(prog(t, hit, hit + 0.3))
  const up = -400 * (1 - ease.inOutCubic(prog(t, 3.5, 4.1))) + -170 * ease.inOutCubic(prog(t, T.stars, T.stars + 0.5))
  return { z: 1.22 + 0.08 * k, fx: 540, fy: 1250, dx: 40 * k, dy: up }
}
const NEWS = { at: -1, out: [3.5, 3.8], headline: 'Friends *confirm:* it’s a thing', tag: 'BREAKING', channel: 'STAR NEWS', ticker: ['Aquarius: “we’re not labelled”', 'soup was shared', 'more at eleven'], clock: '7:41' }
const E = makeAlmost({
  id: 'kare07', duration: D, ending: 'loop',
  hook: 'Your friends think | you’re *together.*', hookOut: [3.5, 3.8], hookTop: 300, hookSize: 104, hookPlate: [260, 560],
  shots, cam,
  fx: [
    ['newsDesk', NEWS],
    ['notification', { at: T.n1, out: [T.n1 + 1.9, T.n1 + 2.1], title: 'the group chat', body: 'how’s your *person?*', glyph: '♓', time: 'now' }],
    ['notification', { at: T.n2, out: [T.pis - 0.3, T.pis - 0.1], title: 'the group chat', body: 'bring your person saturday!!', glyph: '♌', time: 'now' }],
    ['screenShake', { at: T.ship, len: 0.45, amp: 16 }],
  ],
  lines: [
    { t: T.l1, speaker: 'THE STARS', text: 'Your friends see *something.*' },
    { t: T.l2, speaker: 'THE STARS', text: 'If everyone sees it, *you two* can say it.' },
  ],
  cues: [['pop', T.lab, 659.25, 0.035, -0.3], ['pop', T.huh, 880, 0.035, 0.3], ['pop', T.pis, 987.77, 0.04, -0.3], ['pop', T.ship, 1318.51, 0.045, -0.2], ['glitter', T.ship, T.ship + 0.5],
    ['whoosh', T.stars - 0.1, 0.3, 0.03], ['pop', T.stars + 0.1, 739.99, 0.035, 0]],
})
export const DURATION = E.DURATION, SCENES = E.SCENES, CUES = E.CUES
void [PINK, GOLD, label]
