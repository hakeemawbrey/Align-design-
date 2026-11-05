// kwme17: WAIT, THAT'S ME, "Posting for an audience of one" (9 s loop, star_advice trial, music: funk · B♭).
//   0.00  frame 0: the camera mid-whip, ♌ Leo mid-pose, the camera flash mid-pop; hook on.
//   1.2   the photo posts.  1.5–3.2 likes pour in (♥ 1 … 40), names scroll past.  3.4 Leo, scanning for ONE name…
//   4.8–6.3  the slow turn.  6.4  last line: "the other 40 are lovely. too."   8.55–9 loop back.
import { makeWM, wmMusic, phone, label, drawBits, drawStarChar, signStar, glow, prog, pop01, clamp, HEART, GOLD, BONE, INK } from '../../kwme01/wmkit.js'

const H = { x: 320, y: 1200, s: 400, face: 1 }
const POST = 1.2, LIKES = [1.5, 3.2], SCAN = 3.4, TURN = 4.8
const NAMES = ['♈︎', '♉︎', '♊︎', '♋︎', '♍︎', '♎︎', '♏︎', '♐︎', '♑︎', '♒︎', '♓︎']
function scr(t) {
  return (c, w, h) => {
    c.fillStyle = '#2a2148'; c.fillRect(20, 20, w - 40, w - 40)
    drawStarChar(c, w / 2, w / 2 + 10, 200, 0.6, { color: signStar('leo').color, mood: 'sparkle', look: [0, 0], seed: 3, tips: false, bob: 0 })
    const n = t < POST ? 0 : Math.round(40 * clamp(prog(t, ...LIKES)))
    drawBits(c, HEART, { H: '#ff5c8e' }, 50, w + 20, 5)
    c.font = "700 30px 'Space Mono', monospace"; c.fillStyle = BONE; c.textAlign = 'left'; c.fillText(`${n}`, 80, w + 30)
    if (t > LIKES[0]) { c.font = "700 22px 'Space Mono', monospace"; for (let i = 0; i < 4; i++) { const k = Math.floor(t * 6) + i; c.fillStyle = 'rgba(239,230,214,0.8)'; c.fillText(`${NAMES[k % 11]} liked this`, 30, w + 80 + i * 34) } }
  }
}
const EP = makeWM({
  id: 'kwme17', dur: 9, sign: 'leo', turn: TURN, brk: 'whip',
  hook: 'Posting for an | *audience of one*',
  last: 'the other 40 are lovely. too.',
  hero: H, wash: '#b0802f',
  heroOpts: (t) => ({ mood: t < POST ? 'sparkle' : t < SCAN ? 'happy' : 'squint', look: t < POST ? [0, -1] : [1, 0.4], hops: [-0.1, POST, 2.0, 2.6], squash: t < POST ? -0.06 : 0, tilt: t < POST ? -0.12 : 0.05 }),
  back(x, t) {
    const f = 1 - prog(t, -0.25, 0.35)
    if (f > 0) glow(x, H.x, H.y - 60, 520, '#fffbea', 0.9 * f)
  },
  front(x, t) {
    phone(x, 790, 1060, { w: 400, h: 680, rot: 0.04, draw: scr(t) })
    const k = pop01(t, SCAN, 0.25, 2.4)
    if (k > 0.01 && t < TURN + 0.2) label(x, 'seen by: …not them', 760, 640, { size: 40 * k, col: GOLD })
    void INK
  },
  cues: [['tick', 0.0, 0.08], ['glitter', 0.0, 0.4], ['whoosh', POST, 0.3, 0.04], ...Array.from({ length: 12 }, (_, i) => ['pop', +(LIKES[0] + i * 0.14).toFixed(2), 987.77 + (i % 4) * 110, 0.02, 0.3]), ['pluck', SCAN, 440, 0.03, 0.5, 0.3]],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
export const MUSIC = wmMusic(EP, { style: 'funk', key: 'Bb', seed: 2617 })
