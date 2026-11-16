// og-kpte05: social rework of kpte05 ("Gemini, close some tabs"). Static HOOK (outline) 0–2.9 replaces the slam title;
// kit copy ../pepkit.js (no bug / glitch / flashes, safe-zone layout); crazier Gemini; tabs and props below the pep head.
//   0.0–3.0    frame 0: ♋ Cancer mid-lunge, Gemini behind with a thought cloud spilling browser tabs · "Gemini. Your brain. |
//              *Too many* tabs." · glitch at 0.42 · chip "first-date nerves | *the night before*".
//   3.0–5.4    the spiral: the tabs pile up: WHAT IF I'M BORING · WHAT TO WEAR · FIRST LINE?? · WHAT IF THEY'RE LATE.
//   5.4–15.4   "you don't need a *script.*" (a script gets tossed) · "curious is your best *outfit.*" (a CURIOUS sash)
//              · "ask them one *real* question." (one card: "what made you smile today?"). The tabs close one by one.
//   15.4–17.2  "Close the tabs. | *Open* up."  Hard cut.
export const HOOK = 'Gemini: one date. | *47 tabs open.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.9
import { makePep, room, note, label, R, box, INK, BONE, RED, PEP, GOLD, MINT, prog, ease, lerp, pop01, outK } from '../pepkit.js'

const TABS = ['WHAT IF I’M BORING', 'OUTFIT 14 OF 30', 'FIRST LINE?? (v9)', 'WHAT IF THEY’RE A TWIN', 'WHICH OF MY 5 SELVES', 'PRACTISE LAUGH']
function tab(x, cx, cy, text, k, rot = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.font = "800 26px Inter"; const w = x.measureText(text).width + 70
  box(x, -w / 2, -26, w, 52, '#e9e4f7', { b: 5 }); R(x, '#5fa8ff', -w / 2, -26, w, 8)
  x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(text, -w / 2 + 16, 3)
  x.fillStyle = RED; x.fillText('x', w / 2 - 30, 3)
  x.restore()
}
function bedroom(x, t) { room(x, t, { wall: '#2a2252', wall2: '#251d4c', floor: '#36294a', win: { x: 700, y: 520, w: 260, h: 280 }, floorY: 1330 }) }
function hook(x, t, S) {
  bedroom(x, t)
  S.L(x, t, { x: 760, y: 1000, s: 230, mood: 'wide', look: [0, -1], blink: false })
  TABS.slice(0, 5).forEach((s, i) => tab(x, 640 + Math.sin(i * 2.1 + t * 2) * 160, 720 + i * 48 - ((t * 60 + i * 30) % 60), s, 0.8, 0.12 * Math.sin(i * 3 + t * 3)))
}
function spiral(x, t, S) {
  bedroom(x, t)
  x.fillStyle = 'rgba(5,4,12,0.45)'; x.fillRect(0, 0, 1080, 1920)
  TABS.forEach((s, i) => tab(x, 560 + (i % 2 ? 90 : -60), 640 + i * 95, s, pop01(t, 3.05 + i * 0.32, 0.25, 2.4), (i % 2 ? 0.05 : -0.05)))
  S.L(x, t, { x: 200, y: 1250, s: 200, mood: 'wide', look: [1, -1], blink: false, squash: 0.04 * Math.sin(t * 30) })
  label(x, `${47 + Math.floor((t - 3) * 31)} tabs open`, 200, 1400, { size: 28, col: '#ff8fa0' })
}
function pep(x, t, S) {
  const [w0, w1, w2] = S.T.lines
  // the leftover tabs close one by one over the whole pep
  TABS.slice(0, 3).forEach((s, i) => { const c = S.T.lines[i] + 0.5; tab(x, 540, 700 + i * 60, s, (t < c ? 0.8 : 0.8 * (1 - ease.inCubic(prog(t, c, c + 0.25)))), 0) })
  if (t > w0 + 0.6 && t < w1) {
    const p = prog(t, w0 + 1.2, w0 + 2.0), k = pop01(t, w0 + 0.6, 0.3, 2.4)
    x.save(); x.translate(560 + p * 600, 900 - p * 300 + p * p * 300); x.rotate(p * 6); x.scale(k, k)
    box(x, -80, -100, 160, 200, BONE, { b: 6 }); x.font = "800 30px Inter"; x.fillStyle = INK; x.textAlign = 'center'; x.fillText('SCRIPT', 0, -50); for (let i = 0; i < 4; i++) R(x, '#b9b0c8', -56, -20 + i * 26, 112, 10)
    x.restore()
  }
  if (t > w1 + 0.5 && t < w2) note(x, 540, 900, 'CURIOUS', { w: 330, h: 90, col: GOLD, size: 46, rot: -0.12, k: pop01(t, w1 + 0.5, 0.3, 2.4) * outK(t, [w2 - 0.25, w2]) })
  if (t > w2 + 0.5) note(x, 540, 905, '“what made you | smile today?”', { w: 440, h: 150, col: '#ffd0e4', size: 36, rot: 0.04, k: pop01(t, w2 + 0.5, 0.3, 2.4) })
}
const EP = makePep({
  id: 'og-kpte05', sign: 'gemini', coach: 'cancer', end: 'cut', brk: 'glitch',
  premise: 'first-date nerves | *the night before*',
  lines: ['you don’t need a 9-page *script.*', 'curious is your best *outfit.*', 'ask them one *real* question.'],
  last: 'Close the tabs. | *Open* up.', lastLate: 2,
  hook, spiral, pep,
  pepSet: (x, t) => bedroom(x, t),
  cues: [...[0, 1, 2, 3, 4, 5].map(i => ['pop', 3.05 + i * 0.32, [659.25, 739.99, 880, 987.77, 1174.66, 1318.51][i], 0.03, i % 2 ? 0.3 : -0.3]),
    ['tick', 6.25, 0.05], ['tick', 9.45, 0.05], ['tick', 12.65, 0.05], ['whoosh', 7.0, 0.5, 0.04], ['pop', 9.2, 1318.51, 0.04, 0], ['pop', 12.7, 1174.66, 0.04, 0]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PEP, MINT, lerp]
