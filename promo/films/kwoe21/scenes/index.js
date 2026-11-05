// kwoe21: WHICH ONE ARE YOU? · "They Finally Texted Back" (trial reel, synthwave · A, loop). Format: kwoe01/scenes/wokit.js.
//   frame 0  a notification "hey :)" slamming down over the grid, Cancer mid-scream into a pillow (whip out of 2).
//   1 Scorpio waits exactly as long to reply · 2 Cancer screams into a pillow · 3 Aries replies before the buzz ends ·
//   4 Taurus finishes dinner first.  5 Pisces: cries "they said HEY!!"  Loops.
import { makeWhich, slam0, phone, chat, bubble, label, glow, floor, bed, pillow, desk, clock, actionLines, drawBits, HEART, R, box, osc, saw, prog, clamp, lerp, ease, BONE, GOLD, PINK, INK, MINT, INTER } from '../../kwoe01/scenes/wokit.js'

function fx(x, t) {
  const { a } = slam0(t, [0.85, 1.05])
  if (a <= 0.01) return
  const y = lerp(440, 560, 1 - Math.pow(1 - Math.min(1, t / 0.25), 3))
  x.save(); x.globalAlpha = a; x.translate(540, y + 6 * Math.sin(t * 50) * Math.exp(-t * 4))
  box(x, -400, -66, 800, 132, 'rgba(36,28,70,0.96)', { b: 6 })
  R(x, MINT, -372, -40, 80, 80); drawBits(x, HEART, { H: INK }, -332, 0, 7)
  x.font = `700 24px 'Space Mono', monospace`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = 'rgba(239,230,214,0.7)'; x.fillText('MESSAGES · now', -270, -24)
  x.font = `800 46px ${INTER}`; x.fillStyle = BONE; x.fillText('hey :)', -270, 20)
  x.restore()
}

function p1(x, t, P) {   // Scorpio: waits exactly as long
  floor(x)
  clock(x, 340, 90, `-${String(59 - Math.floor(t * 4) % 60).padStart(2, '0')}:00`, { col: '#ff6b7f', s: 0.8 })
  P.star(x, t, { x: 170, y: 330, s: 180, mood: 'squint', look: [1, 0], blink: false })
  phone(x, 350, 330, { s: 0.95, screen: (x, w, h) => chat(x, w, h, [{ me: false, text: 'hey :)' }]) })
  bubble(x, t, 200, 470, P.turn[0] + 0.3, Infinity, 'they took 3 hours. so…', { size: 23 })
}

function p2(x, t, P) {   // Cancer: screams into a pillow (frame-0 panel)
  bed(x, 10, 480, 460, { col: '#3f7cf0' })
  const sq = 0.1 * Math.sin(t * 20)
  P.star(x, t, { x: 220, y: 330, s: 190, mood: 'heart', look: [0, 0.5], squash: sq })
  pillow(x, 230, 405, 220, 80, BONE, 0.05 * Math.sin(t * 20))
  actionLines(x, t, 230, 330, 140, 190, 12, PINK, 0.7)
  label(x, 'AAAAAAA!!', 240, 110, { size: 40, col: PINK, rot: -0.05 + 0.03 * Math.sin(t * 20) })
}

function p3(x, t, P) {   // Aries: replies before the buzz ends
  floor(x)
  const ph = saw(t, 1.0)
  P.star(x, t, { x: 160, y: 330, s: 180, mood: 'wide', look: [1, 0.2], squash: ph < 0.1 ? 0.1 : 0 })
  phone(x, 350 + (ph < 0.3 ? 6 * Math.sin(t * 60) : 0), 300, { s: 1.15, glowA: 0.3, screen: (x, w, h) => chat(x, w, h, [{ me: false, text: 'hey :)' }, ...(ph > 0.12 ? [{ me: true, text: 'HEY!! hi!!' }] : [])]) })
  label(x, 'reply time: 0.2s', 330, 470, { size: 22, col: MINT })
}

function p4(x, t, P) {   // Taurus: finishes dinner first
  desk(x, 30, 410, 420, '#5a3a2a')
  // a plate with a shrinking dinner
  const eat = P.u < 0 ? 0.3 : clamp(P.u / 1.4)
  x.save(); x.translate(260, 395); R(x, INK, -80, -14, 160, 22); R(x, BONE, -76, -10, 152, 14); R(x, '#e9b24a', -50, -30, 100 * (1 - eat), 22); R(x, MINT, -40, -40, 40 * (1 - eat), 12); x.restore()
  phone(x, 410, 400, { s: 0.45, rot: 1.5, glowA: 0.15 })
  P.star(x, t, { x: 140, y: 300, s: 170, mood: 'happy', look: [1, 0.5] })
  bubble(x, t, 240, 100, P.turn[0] + 0.35, Infinity, 'pasta first. then love.', { size: 24 })
}

const EP = makeWhich({
  id: 'kwoe21', hero: 1, flash: '#9fe6b0', deep: '#c0587a', fx,
  hook: 'They *finally* | texted back.',
  freeze: 'it’s *them.*',
  panels: [
    { sign: 'scorpio', bg: 'dark', caption: 'waits *exactly as long* to reply', draw: p1, cues: [['tick', 0.25, 0.04], ['tick', 0.5, 0.04], ['tick', 0.75, 0.04], ['tick', 1.0, 0.04]] },
    { sign: 'cancer', bg: 'bedroom', caption: 'screams *into a pillow*', draw: p2, cues: [['whoosh', 0.1, 0.5, 0.04]] },
    { sign: 'aries', bg: 'night', caption: 'replies *before the buzz ends*', draw: p3, cues: [['tick', 0.0, 0.06], ['pop', 0.12, 1318.51, 0.04, 0], ['tick', 1.0, 0.06], ['pop', 1.12, 1318.51, 0.04, 0]] },
    { sign: 'taurus', bg: 'kitchen', caption: 'finishes *dinner* first', draw: p4, cues: [['pluck', 0.4, 587.33, 0.03, 0.4, 0]] },
  ],
  pisces: 'cries *"they said HEY!!"*',
  ending: 'loop',
  cues: [['pop', 0.02, 1318.51, 0.05, 0], ['pop', 0.14, 1760, 0.05, 0]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [glow, osc, prog, ease, GOLD]
