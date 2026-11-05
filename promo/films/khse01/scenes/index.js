// khse01: ZODIAC HOT SEAT, "Aries buzzed in before the question" (10 s vertical, star_advice trial reel).
// The format lives in ./hotkit.js (shared by khse01–khse24). No end card, no card cut. Hard cut on the last line.
//   0.00  frame 0: Aries mid-slam on a big podium buzzer (BZZT!), the question card still flying in BLANK; the hook
//         "Aries buzzed in *before* the question." is already landed. 0.30 record scratch + freeze.
//   1.05–1.5  Aries hops back into the chair. Q1 "Text first or wait?" → "already did." · Q2 "Patience, out of 10?" → "NEXT."
//   4.5   the last question, the music drops out: "What do you do when they don't text back?" → "…refresh. then
//         pretend I didn't."  Pisces sobs at the buzzer.  THE STARS: "Fast heart. *Let them catch up.*"
import { makeHotSeat, box, R, label, sparkles, ease, prog, lerp, INK, RED, BONE, GOLD, INTER, pop01 } from './hotkit.js'

// the podium buzzer Aries slams at frame 0
function podium(x, t, k) {
  const y = lerp(1500, 1130, k)
  box(x, 640, y, 150, 190, '#3a2d66', { b: 7, hi: '#4b3b84' })
  const press = t < 0.3 ? 1 : Math.max(0, 1 - (t - 0.3) * 4)
  x.save(); x.translate(715, y - 4); x.scale(1 + 0.1 * press, 1 - 0.45 * press)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 66, 60, 0, Math.PI, 0); x.fill()
  x.fillStyle = RED; x.beginPath(); x.ellipse(0, 0, 56, 50, 0, Math.PI, 0); x.fill()
  x.fillStyle = '#ff8a98'; x.fillRect(-30, -40, 18, 12)
  x.restore()
}
// the blank question card, still flying in
function blankCard(x, t, k) {
  const p = ease.outCubic(prog(t, 0, 1.2))
  x.save(); x.globalAlpha = k; x.translate(lerp(900, 800, p), lerp(720, 760, p)); x.rotate(lerp(0.5, 0.18, p))
  box(x, -150, -80, 300, 160, BONE, { b: 7 })
  R(x, RED, -130, -60, 60, 60); label(x, 'Q1', -100, -30, { size: 30, col: '#fff', font: INTER, weight: 800 })
  label(x, '. . .', 40, 10, { size: 54, col: 'rgba(27,18,54,0.5)', font: INTER, weight: 800 })
  x.restore()
}

const EP = makeHotSeat({
  id: 'khse01', sign: 'aries', name: 'Aries', accent: '#ff6a3d',
  hook: 'Aries buzzed in | *before* the question.',
  breakFx: 'scratch', scratch: 'the question isn’t *even out yet.*',
  hero0: { x: 650, y: 960, s: 300, rot: 0.22, mood: 'squint', look: [1, 1] },
  frame0(x, t, S) {
    podium(x, t, S.k)
    blankCard(x, t, S.k)
    const bz = pop01(t, -0.2, 0.3, 2.4) * S.k
    if (bz > 0.01) label(x, 'BZZZT!', 820, 980, { size: 70 * bz, col: GOLD, font: INTER, weight: 800, rot: -0.15 })
    sparkles(x, t + 0.3, 715, 1100, 0, 10, 160, 1, [GOLD, RED, BONE])
  },
  qs: [
    { q: 'Text first or *wait?*', a: 'already did.', mood: 'happy' },
    { q: 'Patience, *out of 10?*', a: 'NEXT.', mood: 'squint', size: 64 },
  ],
  final: { q: 'What do you do when they *don’t text back?*', a: '…refresh. then pretend I didn’t.', mood: 'squint', endMood: 'happy' },
  last: 'Fast heart. *Let them catch up.*',
  ending: 'cut',
  music: { style: 'chiptune', key: 'E', seed: 3501 },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
