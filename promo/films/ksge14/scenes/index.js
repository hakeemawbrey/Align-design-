// ksge14 · SPOT THE GREEN FLAG: "Taurus at 2 A.M." (trial reel, ≈ 10 s, lofi · Db). Format: ../../ksge01/scenes/greenkit.js.
//   frame 0  both takes: Taurus asleep, the phone mid-buzz in the dark, the clock flicking to 2:04 AM; your text "can't sleep".
//   TAKE A   the clock jumps to 8:02 AM, morning light: "just saw this, you okay? coffee later?"
//   TAKE B   the clock jumps to 12:00 PM: "lol why were you up"
//   freeze, 3-2-1, GREEN FLAG: Take A. THE STARS: "Asleep at 2. *Checked in at 8.*"  Hard cut.
import { makeGreen, R, box, pbubble, hearts, phone, chat, prog, clamp, lerp, ease, INK, BONE, GOLD, MONO } from '../../ksge01/scenes/greenkit.js'
import { bedroomDark, wallClock } from '../../ksge02/scenes/sets.js'

function scene(x, tk, S, mode) {
  const { hero } = S
  const f = S.focus[mode]
  const jump = mode === 'A' ? 1.0 : f[0] + 0.2
  const morning = tk > jump
  bedroomDark(x, tk, { glow: morning ? 0 : 1 })
  if (morning) { x.save(); x.globalCompositeOperation = 'lighter'; R(x, mode === 'A' ? 'rgba(255,214,140,0.22)' : 'rgba(255,240,200,0.18)', 0, 0, 504, 770); x.restore() }
  // the clock flicks (2:03 → 2:04 at frame 0), then jumps
  const flick = tk < 0.15 && Math.floor(tk * 40) % 2 === 0
  wallClock(x, 40, 110, morning ? (mode === 'A' ? '8:02' : '12:00') : (flick ? '2:03' : '2:04'))
  x.font = `700 20px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'center'; x.fillText(morning ? (mode === 'A' ? 'AM' : 'PM') : 'AM', 115, 205)
  // Taurus asleep in bed, wakes in the morning
  hero(x, tk, { x: 300, y: 420, s: 180, mood: morning ? (mode === 'A' ? 'wide' : 'neutral') : 'sleepy', look: morning ? [1, 0.5] : [0, 0], hops: morning ? [jump + 0.1] : [] })
  box(x, 130, 450, 300, 90, '#c9a070', { b: 6, hi: '#e0b98a' })
  // the phone on the nightstand
  const buzz = !morning && tk < 0.9 ? 4 * Math.sin(tk * 80) : 0
  box(x, 360, 560, 110, 70, '#5a3f2a', { b: 5 })
  phone(x, 415 + buzz, 500, { w: 80, h: 120, rot: -0.15, glow: 1, screen: (q, w, h) => { R(q, '#211a3e', 0, 0, w, h); chat(q, 'can’t\nsleep :(', 10, w, { me: true, size: 11 }) } })
  pbubble(x, tk, 170, 290, -1, jump, 'can’t sleep :(', { size: 28, col: '#7fd0ff', tail: 0.8 })
  if (mode === 'A') { pbubble(x, tk, 250, 290, jump + 0.25, 99, 'just saw this, you okay?\ncoffee later?', { size: 26, tail: 0.4, col: '#c9f2d4' }); hearts(x, tk, jump + 0.7, 300, 380, { n: 4, cell: 4 }) }
  else pbubble(x, tk, 250, 290, jump + 0.25, 99, 'lol why were you up', { size: 30, tail: 0.4 })
  void GOLD; void ease; void lerp; void clamp; void prog
}
const EP = makeGreen({
  id: 'ksge14', sign: 'taurus', name: 'Taurus', win: 'A', ending: 'cut',
  hook: 'YOU TEXTED THEM | *AT 2 A.M.*',
  premise: 'You texted “can’t sleep” at *2 a.m.*',
  takes: { A: { draw: (x, tk, S) => scene(x, tk, S, 'A') }, B: { draw: (x, tk, S) => scene(x, tk, S, 'B') } },
  last: 'Asleep at 2. *Checked in at 8.*',
  cues: [['pop', 0.0, 880, 0.035, 0.3], ['pop', 0.2, 880, 0.03, 0.3], ['whoosh', 0.95, 0.3, 0.03], ['bell', 1.0, 1318.51, 0.025, 0.8, -0.3], ['pop', 1.25, 1174.66, 0.035, -0.4], ['whoosh', 2.2, 0.3, 0.03], ['pop', 2.5, 523.25, 0.035, 0.4]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
