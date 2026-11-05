// kwme15: WAIT, THAT'S ME, "Starting a reply, finishing it next week" (9 s loop, star_advice trial, music: chiptune · E).
//   0.00  frame 0: ♊ Gemini mid-type, the draft half full, a tear-off calendar on MON; hook on.  0.32 scratch + freeze.
//   1.2–3.0  the calendar pages whip off (TUE … SUN, MON), cobwebs grow on the phone, the draft hasn't moved.
//   3.3   it finally sends: "omg yes, I’d love to!!"  4.6–6.1 the slow turn.  6.2 last line: "I was thinking about it."
import { makeWM, wmMusic, box, phone, sms, label, prog, ease, clamp, lerp, BONE, INK, RED } from '../../kwme01/wmkit.js'

const H = { x: 330, y: 1200, s: 400, face: 1 }
const FLIP = [1.2, 3.0], SEND = 3.3, TURN = 4.6
const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN', 'MON']
const DRAFT = 'omg yes, I’d love t'
function cal(x, t) {
  const p = prog(t, ...FLIP), n = Math.min(7, Math.floor(p * 7.99)), f = (p * 7.99) % 1
  box(x, 690, 420, 260, 230, '#ffffff', { bw: 6 }); x.fillStyle = RED; x.fillRect(690, 420, 260, 56)
  label(x, DAYS[n + (p > 0 && p < 1 ? 1 : 0)] || 'MON', 820, 570, { size: 80, col: INK, stroke: null })
  label(x, DAYS[n], 820, 570, { size: 80, col: INK, stroke: null, alpha: p > 0 && p < 1 ? 1 - f : 0 })
  if (p > 0 && p < 1) { x.save(); x.translate(820, 420); x.rotate(-f * 1.4); x.globalAlpha = 1 - f; box(x, -130, 0, 260, 230, '#f4f0e6', { bw: 4 }); x.restore() }
  if (t > FLIP[1]) label(x, 'next week', 820, 690, { size: 34, col: '#ffe27a' })
}
function scr(t) {
  return (c, w, h) => {
    c.fillStyle = '#1d1838'; c.fillRect(0, 0, w, 60); c.font = "700 26px 'Space Mono', monospace"; c.fillStyle = '#d9d4ff'; c.textAlign = 'center'; c.fillText('♐︎ them', w / 2, 40)
    sms(c, 'want to get dinner friday?', 'L', 90, w, { size: 28 })
    if (t < SEND) { c.fillStyle = '#2a2148'; c.fillRect(10, h - 120, w - 20, 100); c.font = "700 26px 'Space Mono', monospace"; c.fillStyle = BONE; c.textAlign = 'left'; c.fillText(DRAFT + (Math.floor(t * 3) % 2 ? '|' : ''), 22, h - 62) }
    else sms(c, 'omg yes, I’d love to!!', 'R', 240 + 160 * (1 - clamp((t - SEND) * 4)), w, { size: 30 })
    // cobwebs creep into the corner while it waits
    const k = clamp(prog(t, FLIP[0] + 0.4, FLIP[1]))
    if (k > 0 && t < SEND + 0.3) { c.strokeStyle = 'rgba(239,230,214,0.75)'; c.lineWidth = 3; for (let i = 0; i < 4; i++) { c.beginPath(); c.moveTo(w, 60); c.lineTo(w - 150 * k * Math.cos(i * 0.45), 60 + 150 * k * Math.sin(i * 0.45)); c.stroke() } for (let r = 1; r <= 3; r++) { c.beginPath(); c.arc(w, 60, 45 * r * k, Math.PI / 2, Math.PI); c.stroke() } }
  }
}
const EP = makeWM({
  id: 'kwme15', dur: 9, sign: 'gemini', turn: TURN, brk: 'scratch',
  hook: 'Starting a reply, | *finishing it* next week',
  last: 'I was thinking about it.',
  hero: H, wash: '#2f6ab0',
  heroOpts: (t) => ({ mood: t < FLIP[0] ? 'squint' : t < SEND ? 'sleepy' : 'wide', look: [1, 0.3], hops: [SEND], tilt: 0.05 }),
  back(x, t) { cal(x, t) },
  front(x, t) { phone(x, 780, 1130, { w: 420, h: 620, rot: -0.05, draw: scr(t) }) },
  cues: [...Array.from({ length: 8 }, (_, i) => ['whoosh', +(FLIP[0] + i * 0.225).toFixed(2), 0.12, 0.03]), ['whoosh', SEND, 0.25, 0.05], ['pop', SEND + 0.05, 1174.66, 0.045, 0.3]],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
export const MUSIC = wmMusic(EP, { style: 'chiptune', key: 'E', seed: 2615 })
void [ease, lerp]
