// ksge13 · SPOT THE GREEN FLAG: "Aries Loses at Mini Golf" (trial reel, ≈ 10 s, chiptune · E). Format: ../../ksge01/scenes/greenkit.js.
//   frame 0  both takes: your golf ball mid-flight into the hole, Aries mid-scream. Scoreboard YOU 3 · ARIES 9.
//   TAKE A   "rematch. NOW. that hole was rigged."  stomp, stomp.    TAKE B   "okay that shot was unreal. teach me?"  clap.
//   freeze, 3-2-1, GREEN FLAG: Take B. THE STARS: "Lost the game. *Won the date.*"  Hard cut.
import { makeGreen, R, box, pbubble, hearts, sparkles, drawBits, prog, clamp, lerp, ease, INK, BONE, GOLD, RED, INTER, MONO } from '../../ksge01/scenes/greenkit.js'
import { park, balloonText } from '../../ksge02/scenes/sets.js'

function course(x, tk) {
  // the putting green, the hole with a little red pennant (not a green flag!), a windmill
  x.fillStyle = INK; x.beginPath(); x.ellipse(250, 650, 230, 70, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#5fc07a'; x.beginPath(); x.ellipse(250, 646, 222, 62, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.beginPath(); x.ellipse(250, 640, 22, 9, 0, 0, Math.PI * 2); x.fill()
  R(x, INK, 248, 520, 5, 120); drawBits(x, ['RRRR', 'RRR.', 'RR..'], { R: RED }, 268, 528, 8)
  box(x, 40, 300, 60, 200, '#d08a8a', { b: 5 }); x.save(); x.translate(70, 300); x.rotate(tk * 2); for (let i = 0; i < 4; i++) { x.rotate(Math.PI / 2); R(x, INK, -6, -90, 12, 90); R(x, BONE, -3, -86, 6, 84) } x.restore()
}
function board(x) {
  box(x, 290, 100, 190, 76, BONE, { b: 6 }); x.font = `700 22px ${MONO}`; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText('YOU    3', 306, 124); x.fillText('ARIES  9', 306, 154)
}
function scene(x, tk, S, mode) {
  const { hero, you } = S
  const f = S.focus[mode]
  park(x, tk)
  course(x, tk)
  board(x)
  // the ball: mid-flight at frame 0, drops in the hole
  const b = clamp(prog(tk, -0.4, 0.3))
  if (b < 1) drawBits(x, ['.WW.', 'WWWW', 'WWWW', '.WW.'], { W: '#ffffff' }, lerp(140, 250, b), lerp(520, 636, b) - 120 * Math.sin(Math.PI * b), 6)
  sparkles(x, tk, 250, 630, 0.3, 8, 60, 1)
  you(x, tk, { x: 120, y: 480, s: 160, mood: 'sparkle', look: [1, 0.3], hops: [0.35] })
  const aMood = tk < 0.5 ? 'wide' : mode === 'A' ? 'eyeroll' : 'happy'
  hero(x, tk, { x: 390, y: 470, s: 190, mood: aMood, look: [-1, 0.3], hops: mode === 'A' ? [f[0] + 0.4, f[0] + 0.75, f[0] + 1.1] : [0.9, 1.15] })
  if (tk < 0.5) balloonText(x, 'NOOO!', 390, 330, { size: 40, col: RED, rot: 0.1 })
  if (mode === 'A') pbubble(x, tk, 270, 250, f[0] + 0.3, 99, 'rematch. NOW.\nthat hole was rigged.', { size: 30, tail: 0.6 })
  else { pbubble(x, tk, 270, 250, f[0] + 0.3, 99, 'okay that shot was\nunreal. teach me?', { size: 30, tail: 0.6, col: '#c9f2d4' }); hearts(x, tk, f[0] + 0.8, 130, 400, { n: 4, cell: 4 }); if (tk > f[0] + 0.6 && tk < f[0] + 1.4) balloonText(x, 'CLAP CLAP', 390, 340, { size: 28, col: GOLD }) }
  void INTER
}
const EP = makeGreen({
  id: 'ksge13', sign: 'aries', name: 'Aries', win: 'B', ending: 'cut',
  hook: 'YOU BEAT AN ARIES | *AT MINI GOLF.*',
  premise: 'You won. *By a lot.*',
  takes: { A: { draw: (x, tk, S) => scene(x, tk, S, 'A') }, B: { draw: (x, tk, S) => scene(x, tk, S, 'B') } },
  last: 'Lost the game. *Won the date.*',
  cues: [['tick', 0.3, 0.07], ['pop', 0.32, 1567.98, 0.04, 0], ['glitter', 0.3, 0.6], ['pop', 0.6, 523.25, 0.035, -0.4], ['tom', 0.7, 90, { gain: 0.12, decay: 0.15 }], ['tom', 1.05, 90, { gain: 0.12, decay: 0.15 }], ['clap', 2.7, { gain: 0.12, pan: 0.3 }], ['clap', 2.95, { gain: 0.12, pan: 0.3 }]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
