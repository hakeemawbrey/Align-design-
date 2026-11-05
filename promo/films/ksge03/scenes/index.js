// ksge03 · SPOT THE GREEN FLAG: "Gemini, Left on Read" (trial reel, ≈ 10 s, funk · Bb). Format: ../../ksge01/scenes/greenkit.js.
//   frame 0  Take A: a giant "Read 3:12 PM" receipt mid-slam on your phone; Take B: Gemini mid-juggle, a call button flying.
//   TAKE A   read… "3 HOURS LATER" … "lol".        TAKE B   "chaotic day!! can I call tonight and hear yours?"
//   freeze, 3-2-1, GREEN FLAG: Take B. THE STARS: "Busy is fine. *Saying so* is the flag."  Hard cut.
import { makeGreen, R, box, pbubble, hearts, phone, chat, pop01, prog, clamp, lerp, ease, INK, BONE, GOLD, RED, GREEN, INTER, MONO } from '../../ksge01/scenes/greenkit.js'
import { living, stamp, balloonText } from '../../ksge02/scenes/sets.js'

function yourPhone(x, tk, msgs, { receipt = 0, typing = false } = {}) {
  phone(x, 160, 360, { w: 250, h: 430, rot: -0.04, glow: 0.8, screen: (q, w, h) => {
    R(q, '#211a3e', 0, 0, w, h); R(q, '#2e2656', 0, 0, w, 40)
    q.font = `800 18px ${INTER}`; q.fillStyle = BONE; q.textAlign = 'center'; q.textBaseline = 'middle'; q.fillText('GEMINI', w / 2, 21)
    let y = 56
    for (const m of msgs) if (tk >= m.at) y = chat(q, m.text, y, w, { me: m.me, size: 19 })
    if (receipt > 0) { q.font = `700 15px ${MONO}`; q.fillStyle = 'rgba(239,230,214,0.7)'; q.textAlign = 'right'; q.fillText('Read 3:12 PM', w - 10, y + 4) }
    if (typing) for (let i = 0; i < 3; i++) R(q, BONE, 16 + i * 16, y + 8 + 4 * Math.sin(tk * 10 + i), 9, 9)
  } })
}
function takeA(x, tk, S) {
  const { hero, you } = S
  living(x)
  yourPhone(x, tk, [{ at: -9, text: 'how was your day?', me: true }, { at: 1.55, text: 'lol' }], { receipt: 1 })
  // the receipt slams in at frame 0
  const k = clamp(prog(tk, -0.15, 0.25))
  stamp(x, 'READ 3:12 PM', 200, 440, k, { col: '#ff9aa6', rot: -0.12, size: 40 })
  you(x, tk, { x: 110, y: 640, s: 120, mood: tk > 1.6 ? 'wide' : 'neutral', look: [0, -1], tag: false })
  hero(x, tk, { x: 400, y: 470, s: 170, mood: 'neutral', look: [1, 0] })
  pbubble(x, tk, 360, 200, 1.55, 99, 'lol', { size: 52, tail: 0.5 })
  const lk = pop01(tk, 0.75, 0.25, 2.4) * (1 - prog(tk, 1.45, 1.6))
  if (lk > 0.01) balloonText(x, '3 HOURS LATER…', 252, 140, { size: 38 * lk, col: GOLD, rot: -0.05 })
}
function takeB(x, tk, S) {
  const { hero, you } = S
  living(x, { wall: '#3d3463', wall2: '#372e5b' })
  const f = S.focus.B
  yourPhone(x, tk, [{ at: -9, text: 'how was your day?', me: true }, { at: f[0] + 0.25, text: 'chaotic day!!\ncan I call tonight\nand hear yours?' }], { typing: tk < f[0] + 0.25 })
  you(x, tk, { x: 110, y: 640, s: 120, mood: tk > f[0] + 0.5 ? 'happy' : 'neutral', look: [0, -1], tag: false, hops: [f[0] + 0.6] })
  // Gemini juggling: two phones and a call button in the air
  const j = tk * 5
  hero(x, tk, { x: 400, y: 470, s: 170, mood: tk < f[0] ? 'wide' : 'happy', look: [0, -1] })
  if (tk < f[0] + 0.2) for (let i = 0; i < 3; i++) {
    const a = j + i * 2.1, px = 400 + Math.cos(a) * 70, py = 300 - Math.abs(Math.sin(a)) * 90
    if (i === 2) { x.fillStyle = INK; x.beginPath(); x.arc(px, py, 26, 0, Math.PI * 2); x.fill(); x.fillStyle = GREEN; x.beginPath(); x.arc(px, py, 20, 0, Math.PI * 2); x.fill(); R(x, INK, px - 8, py - 3, 16, 6) }
    else box(x, px - 16, py - 26, 32, 52, '#2a2148', { b: 4 })
  }
  pbubble(x, tk, 280, 150, f[0] + 0.3, 99, 'chaotic day!! can I\ncall tonight and\nhear yours?', { size: 30, tail: 0.8, col: '#c9f2d4' })
  if (tk >= f[0] + 0.5) hearts(x, tk, f[0] + 0.55, 130, 560, { n: 4, cell: 4 })
}
const EP = makeGreen({
  id: 'ksge03', sign: 'gemini', name: 'Gemini', win: 'B', ending: 'cut',
  hook: 'LEFT ON READ | OR *LOOKED AFTER?*',
  premise: 'You asked about *their* day.',
  takes: { A: { draw: takeA }, B: { draw: takeB } },
  last: 'Busy is fine. *Saying so* is the flag.',
  cues: [['tick', 0.02, 0.06], ['boom', 0.05, 0.12], ['whoosh', 0.75, 0.4, 0.03], ['pop', 1.55, 523.25, 0.04, -0.4], ['pop', 2.3, 1318.51, 0.04, 0.4], ['pop', 2.37, 1760, 0.03, 0.4]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [RED, lerp, ease]
