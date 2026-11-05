// kxgne05: STAR TALK GAME NIGHT: FULL GAMES, Ep 5, "Scorpio vs Aquarius: The Ex Is Typing" (≈ 115 s vertical,
// music: synthwave · Dm). The feeling: missing an ex. Set + timeline: ../../kxgne01/fullgame.js.
//   0.0    frame 0: the marquee is a giant phone chat, "ex is typing…" with bouncing dots, glitching; Scorpio mid-lunge
//          at its buzzer; Aquarius mid-yank on the screen's plug. Hook: "Your ex is typing. *Buzz.*"  0.5 record scratch.
//   10 R1 → Scorpio · 30 R2 → both · 50 R3 → Scorpio · 70 LIGHTNING (Scorpio 3, Aquarius 4) · 90 FINAL ×2 → both
//   110    Scorpio 8–7. THE STARS: "Miss them. *Don't* dial."  Hard cut.
import { makeFullGame, R, box, label, INK, BONE, MONO, INTER, prog, clamp } from '../../kxgne01/fullgame.js'
import { glitch, glitchCues } from '../../hookkit.js'

const GL = { at: -0.25, len: 0.7, dialog: false, amp: 0.55 }
const VIOLET = '#b48cff'

function chatScreen(x, t) {
  if (t >= 6.0) return
  const o = clamp(1 - prog(t, 5.6, 6.0))
  const { x0, x1, y0, y1 } = { x0: 44, x1: 1036, y0: 360, y1: 662 }
  x.save(); x.globalAlpha = o
  R(x, '#0d0920', x0, y0, x1 - x0, y1 - y0)
  R(x, '#1d1640', x0, y0, x1 - x0, 64)
  x.fillStyle = VIOLET; x.beginPath(); x.arc(x0 + 54, y0 + 32, 20, 0, Math.PI * 2); x.fill()
  x.font = `800 34px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText('ex', x0 + 90, y0 + 33)
  x.font = `700 22px ${MONO}`; x.fillStyle = 'rgba(239,230,214,0.6)'; x.fillText('last seen: just now', x0 + 140, y0 + 35)
  // old messages, then the typing bubble
  box(x, x0 + 30, y0 + 90, 380, 62, '#2c2458', { b: 4 }); x.font = `700 28px ${MONO}`; x.fillStyle = BONE; x.fillText('take care.', x0 + 52, y0 + 122)
  label(x, '8 MONTHS AGO', 540, y0 + 176, { size: 20, col: 'rgba(239,230,214,0.55)' })
  box(x, x0 + 30, y0 + 206, 210, 66, '#2c2458', { b: 4 })
  for (let i = 0; i < 3; i++) { const b = Math.max(0, Math.sin(t * 9 - i * 0.8)) * 12; x.fillStyle = BONE; x.beginPath(); x.arc(x0 + 90 + i * 46, y0 + 240 - b, 11, 0, Math.PI * 2); x.fill() }
  x.font = `800 40px ${INTER}`; x.textAlign = 'right'; x.fillStyle = VIOLET; x.fillText('ex is typing…', x1 - 40, y0 + 240)
  // glitch bars
  if (t < 0.5 || (t > 3.0 && t < 3.15)) for (let i = 0; i < 5; i++) R(x, i % 2 ? 'rgba(255,60,90,0.35)' : 'rgba(80,220,255,0.35)', x0, y0 + ((i * 71 + Math.floor(t * 40) * 37) % 300), x1 - x0, 10)
  x.restore()
}
function plug(x, t) {
  if (t >= 6.0) return
  const o = clamp(1 - prog(t, 5.6, 6.0))
  const hx = 700, hy = 1010 + 8 * Math.sin(t * 20)   // Aquarius' yanking hand
  x.save(); x.globalAlpha = o; x.strokeStyle = INK; x.lineWidth = 14
  x.beginPath(); x.moveTo(760, 664); x.quadraticCurveTo(640, 840, hx, hy); x.stroke()
  x.strokeStyle = '#5a5470'; x.lineWidth = 7; x.beginPath(); x.moveTo(760, 664); x.quadraticCurveTo(640, 840, hx, hy); x.stroke()
  box(x, hx - 22, hy - 16, 44, 32, '#cfd3e6', { b: 4 }); R(x, '#cfd3e6', hx - 30, hy - 10, 8, 6); R(x, '#cfd3e6', hx - 30, hy + 4, 8, 6)
  x.restore()
  if (t < 3.5) label(x, 'YANK!', hx - 40, hy - 90, { size: 48, col: '#7fd0ff', font: INTER, weight: 800, alpha: o * (1 - prog(t, 3.0, 3.5)), rot: -0.12 })
}

const EP = makeFullGame({
  id: 'kxgne05',
  A: { sign: 'scorpio', stat: 'profile checks: 0 (lie)', intro: { mood: 'wide', look: [0.3, -0.6], buzz: true, squash: 0.12 } },
  B: { sign: 'aquarius', stat: 'feelings: analysed', intro: { mood: 'squint', look: [-1, -0.6] } },
  hook: 'Your ex is typing. | *Buzz.*',
  accent: VIOLET,
  scratch: 'eight months of silence. *then this.*',
  welcome: 'game night. *full game!*',
  rounds: [
    { prompt: 'the ex texts: “hey… it’s been a while.” you: ___', first: 'A', buzzAt: 1.4,
      a: { text: 'it has. hope you’re well. take care.' },
      b: { text: 'new phone who dis. (it’s a bit.)', lose: 'squint' },
      point: 'A', gag: 'AUDIENCE: (gasps)', host: 'kind, and a *closed* door. point, Scorpio!', cam: '(sobbing) TAKE CARE' },
    { prompt: 'You check their profile “by accident.”', first: 'B',
      a: { text: 'I never…', flag: 'G', mood: 'neutral', then: { at: 7.6, text: '(checks) …RED.', flag: 'R', mood: 'squint' } },
      b: { text: 'RED. mute, don’t scroll.', flag: 'R' },
      point: 'both', host: 'mute *is* kind. to you. both!', cam: '(sobbing) we’ve all done it' },
    { prompt: 'A song comes on. You miss them hard.', first: 'A',
      a: { text: 'let it hurt. call a friend, not them.' },
      b: { text: 'analyse the chords. distract.', lose: 'neutral' },
      point: 'A', gag: 'AUDIENCE: (sniffles)', host: 'feel it, *with* a friend. point, Scorpio!', cam: '(sobbing) THAT song' },
  ],
  lightning: [
    { prompt: 'Keep their hoodie?', a: { text: 'GREEN. it’s warm.', flag: 'G' }, b: { text: 'GREEN. or donate it.', flag: 'G' }, point: 'both' },
    { prompt: 'Text them at 2 a.m.?', a: { text: 'RED. sleep.', flag: 'R' }, b: { text: 'RED. text me instead.', flag: 'R' }, point: 'both' },
    { prompt: 'Wish them well?', a: { text: 'GREEN. quietly.', flag: 'G' }, b: { text: 'GREEN. genuinely.', flag: 'G' }, point: 'both' },
    { prompt: 'Reread the old chats tonight?', a: { text: '…just once?', flag: 'GR', mood: 'squint' }, b: { text: 'RED. future you says thanks.', flag: 'R' }, point: 'B' },
  ],
  final: { prompt: 'Your friend asks: “I miss my ex. Is that weird?”', first: 'B',
    a: { text: 'normal. miss them. just don’t reopen the door.', mood: 'happy' },
    b: { text: 'not weird. it means it mattered.' },
    point: 'both', gag: 'AUDIENCE: (nods)', host: 'missing is *normal.* double, both!', cam: '(sobbing) it MATTERED' },
  last: 'Miss them. *Don’t* dial.',
  talk: 'card-talk-6.png',
  ending: 'cut',
  scenes: [glitch(GL)],
  cues: glitchCues(GL),
  draw(x, t) { chatScreen(x, t); plug(x, t) },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
