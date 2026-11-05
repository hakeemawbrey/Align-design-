// kwme20: WAIT, THAT'S ME, "Pretending I'm mysterious. I'm just shy." (8 s loop, star_advice trial, music: cinematic · F♯m).
//   0.00  frame 0: ♏ Scorpio mid-brood behind a dramatic high collar, a fog machine mid-puff; hook on.  0.32 scratch + freeze.
//   1.2   the crush pops in: "hi!!"   2.0 Scorpio goes bright red… 2.4 a teeny "hi" (tiny type). The fog sputters out.
//   4.3–5.8  the slow turn.  5.9  last line: "the fog was a lot."   7.55–8 loop back.
import { makeWM, wmMusic, box, bubble, inSprite, drawStarChar, signStar, glow, prog, ease, clamp, INK, BONE } from '../../kwme01/wmkit.js'

const H = { x: 360, y: 1200, s: 420, face: 1 }
const HI = 1.2, RED_AT = 2.0, SMALL = 2.4, SPUTTER = 3.2, TURN = 4.3
const CR = signStar('sagittarius')
function fog(x, t) {
  const k = 1 - clamp(prog(t, SPUTTER, SPUTTER + 0.8))
  box(x, 60, 1340, 160, 110, '#3a3458', { bw: 6 })
  for (let i = 0; i < 10; i++) {
    const ph = ((t * 0.35 + i / 10) % 1 + 1) % 1
    x.globalAlpha = 0.28 * (1 - ph) * (k * 0.9 + 0.1); x.fillStyle = '#d9d4ff'
    const r = 60 + ph * 140
    x.beginPath(); x.arc(220 + ph * 700 + 40 * Math.sin(i), 1360 - ph * 260, r, 0, Math.PI * 2); x.fill(); x.globalAlpha = 1
  }
  if (t > SPUTTER && t < SPUTTER + 0.8) { x.fillStyle = '#d9d4ff'; x.fillRect(230, 1360 - ((t * 9) % 1) * 30, 18, 18) }
}
const EP = makeWM({
  id: 'kwme20', dur: 8, sign: 'scorpio', turn: TURN, brk: 'scratch',
  hook: 'Pretending I’m mysterious. | I’m just *shy.*',
  last: 'the fog was a lot.',
  hero: H, wash: '#5a2fb0',
  heroOpts: (t) => ({ mood: t < HI ? 'squint' : t < RED_AT ? 'wide' : 'happy', look: t < HI ? [1, 1] : [1, 0], hops: [HI + 0.1, SMALL], blush: t > RED_AT ? 1 : 0, tilt: 0.04 }),
  heroAfter(x, t, a, F) {
    // the dramatic collar, and the full-face blush once the crush says hi
    inSprite(x, F, () => {
      x.fillStyle = INK; x.beginPath(); x.moveTo(5, 32); x.lineTo(2, 18); x.lineTo(12, 28); x.closePath(); x.fill(); x.beginPath(); x.moveTo(31, 32); x.lineTo(34, 18); x.lineTo(24, 28); x.closePath(); x.fill()
      x.fillStyle = '#7a1a3a'; x.beginPath(); x.moveTo(6, 30); x.lineTo(4, 21); x.lineTo(11, 28); x.closePath(); x.fill(); x.beginPath(); x.moveTo(30, 30); x.lineTo(32, 21); x.lineTo(25, 28); x.closePath(); x.fill()
      const r = ease.outCubic(prog(t, RED_AT, RED_AT + 0.4)) * (t < TURN + 2 ? 1 : 1)
      if (r > 0) { x.globalAlpha = 0.45 * r; x.fillStyle = '#ff2a4a'; x.fillRect(8, 15, 20, 12); x.globalAlpha = 1 }
    })
  },
  back(x, t) {
    const p = ease.outBack(prog(t, HI - 0.3, HI + 0.1))
    if (p > 0.01) drawStarChar(x, 820, 1160, 300, t, { color: CR.color, glyph: CR.glyph, mood: 'happy', look: [-1, 0], seed: 9, pop: p, hops: [HI, HI + 0.3] })
    if (t > RED_AT) glow(x, H.x, H.y - 40, 300, '#ff2a4a', 0.25 * clamp(prog(t, RED_AT, RED_AT + 0.4)))
  },
  front(x, t) {
    fog(x, t)
    bubble(x, t, 840, 900, HI, TURN - 0.2, 'hi!!', { size: 56, tail: 0.1 })
    bubble(x, t, 470, 900, SMALL, TURN - 0.2, 'hi', { size: 18, tail: -0.3 })
    void BONE
  },
  cues: [['pop', HI, 1174.66, 0.05, 0.3], ['pop', HI + 0.08, 1567.98, 0.04, 0.3], ['riser', RED_AT, RED_AT + 0.4, 0.02], ['pop', SMALL, 2349.32, 0.015, -0.2], ...Array.from({ length: 4 }, (_, i) => ['tick', +(SPUTTER + i * 0.2).toFixed(2), 0.04])],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
export const MUSIC = wmMusic(EP, { style: 'cinematic', key: 'F#', seed: 2620 })
