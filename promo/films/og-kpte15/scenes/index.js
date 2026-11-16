// og-kpte15: social rework of kpte15 ("Gemini, you deserve a definitely"). Static HOOK (outline) 0–3.0 replaces the slam
// title and the premise chip; kit copy ../pepkit.js (no series bug, no glitch, no flashes); crazier lines. Original notes:
//   0.0–3.0    frame 0: ♐ Sagittarius mid-lunge, a WE'LL SEE sign mid-yank out of Gemini's hands · "Gemini. You deserve |
//              a *sure* thing." · glitch at 0.42 · chip "stuck in a | *situationship*".
//   3.0–5.4    the spiral: "so… what are we?" → "we'll see :)" (Mon) · (Wed) "we'll see :)" · (Fri) "we'll see :)"
//   5.4–15.4   "‘we'll see’ isn't an *answer.*" (NOT AN ANSWER stamp) · "ask once, clearly. then *believe them.*" (the
//              clear question) · "you're allowed to want *sure.*" (a SURE ✓ stamp).
//   15.4–17.6  "You deserve a | *definitely.*"  Loop.
import { makePep, room, phone, note, stamp, label, R, box, INK, BONE, RED, PEP, GOLD, MINT, prog, ease, lerp, pop01, outK } from '../pepkit.js'

function den(x, t) { room(x, t, { wall: '#28204e', wall2: '#231b48', floor: '#32274a', win: { x: 120, y: 500, w: 240, h: 280 }, floorY: 1330 }) }
function sign(x, cx, cy, rot, text, col = '#ffe27a') { x.save(); x.translate(cx, cy); x.rotate(rot); R(x, INK, -8, 40, 16, 160); R(x, '#a07850', -4, 40, 8, 156); box(x, -150, -60, 300, 110, col, { b: 7 }); x.font = "800 46px Inter"; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, -4); x.restore() }
function hook(x, t, S) {
  den(x, t)
  S.L(x, t, { x: 840, y: 930, s: 220, mood: 'wide', look: [-1, -0.8], blink: false })
  sign(x, 620 + 30 * Math.sin(t * 6), 660, -0.6 + 0.15 * Math.sin(t * 7), 'WE’LL SEE')
}
const MSGS = [
  { at: 3.05, side: 'R', text: 'so… what are we?' },
  { at: 3.45, side: 'L', text: 'we’ll see :)', read: 'mon' },
  { at: 4.05, side: 'L', text: 'we’ll seeee :)', read: 'wed' },
  { at: 4.65, side: 'L', text: 'we’ll see :) ;)', read: 'fri' },
]
function spiral(x, t, S) {
  den(x, t)
  x.fillStyle = 'rgba(5,4,12,0.45)'; x.fillRect(0, 0, 1080, 1920)
  phone(x, t, { cx: 620, top: 620, w: 600, h: 620, title: '♊︎ them', msgs: MSGS, size: 36, glowA: 1 })
  S.L(x, t, { x: 200, y: 1250, s: 200, mood: t > 4.6 ? 'squint' : 'wide', look: [1, -0.6], blink: false })
}
function pep(x, t, S) {
  const [w0, w1, w2] = S.T.lines
  if (t > w0 + 0.3 && t < w1) { const k = outK(t, [w1 - 0.25, w1]); x.save(); x.globalAlpha = k; sign(x, 560, 640, 0.05, 'WE’LL SEE'); stamp(x, t, 'NOT AN ANSWER', 560, 640, w0 + 1.2, { size: 46 }); x.restore() }
  if (t > w1 + 0.4 && t < w2) note(x, 560, 660, '“what are we? | I’d like something real.”', { w: 520, h: 150, col: '#cfe6ff', size: 34, k: pop01(t, w1 + 0.4, 0.3, 2.4) * outK(t, [w2 - 0.25, w2]), rot: 0.03 })
  if (t > w2 + 0.4) stamp(x, t, 'SURE.', 560, 660, w2 + 0.5, { col: '#2a8a5a', size: 70, rot: -0.1 })
}
export const HOOK = '‘We’ll see :)’ | is *not an answer.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.0
const EP = makePep({
  id: 'og-kpte15', sign: 'gemini', coach: 'sagittarius', end: 'loop', brk: 'glitch',
  hookLine: 'Gemini. You deserve | a *sure* thing.',
  premise: 'stuck in a | *situationship*',
  lines: ['‘we’ll see’ is a forecast. not an *answer.*', 'ask once. not twice. not *both of you.*', 'you’re allowed to want *SURE.* in caps.'],
  last: 'You deserve a | *definitely.*', lastLate: 1,
  hook, spiral, pep,
  pepSet: (x, t) => den(x, t),
  cues: [['pop', 3.05, 880, 0.04, 0.3], ['pop', 3.45, 659.25, 0.04, -0.3], ['pop', 4.05, 659.25, 0.04, -0.3], ['pop', 4.65, 659.25, 0.04, -0.3], ['pluck', 4.8, 220, 0.03, 0.5, 0],
    ['boom', 6.95, 0.15], ['tick', 6.95, 0.07], ['pop', 9.35, 1174.66, 0.04, 0], ['boom', 12.65, 0.15], ['bell', 12.7, 1760, 0.03, 0.8, 0]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [label, RED, PEP, GOLD, MINT, ease, lerp, R, box, BONE]
