// og-kpte11: social rework of kpte11 ("Aquarius, your weird is the point"). Static HOOK (outline) 0–2.9 replaces the slam
// title; kit copy ../pepkit.js (no bug / glitch / flashes, safe-zone layout); crazier Aquarius; props below the pep head.
export const HOOK = 'Aquarius brought | *octopus facts. Again.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.9
import { makePep, room, note, label, R, box, INK, BONE, RED, PEP, GOLD, MINT, prog, ease, lerp, pop01, outK } from '../pepkit.js'

function party(x, t) { room(x, t, { wall: '#2b2050', wall2: '#261b4a', floor: '#352848', win: { x: 120, y: 500, w: 240, h: 280 }, floorY: 1330 }); for (let i = 0; i < 9; i++) { const c = [GOLD, '#ff8fb1', '#7fd0ff', '#9fe6b0'][i % 4]; R(x, INK, 60 + i * 115, 480 + 12 * Math.sin(i), 26, 30); R(x, c, 64 + i * 115, 484 + 12 * Math.sin(i), 18, 22) } }
function greyBox(x, cx, cy, s) { box(x, cx - s / 2, cy - s / 2, s, s, '#8f8aa0', { b: 6, hi: '#a8a3b8' }) }
function hook(x, t, S) {
  party(x, t)
  const sh = 0.55 + 0.1 * Math.sin(t * 7)
  greyBox(x, 800, 960, 230)
  S.L(x, t, { x: 800, y: 900, s: 260 * sh, mood: 'wide', look: [-1, -0.5], blink: false })
  R(x, INK, 680, 840, 240, 12); R(x, '#a8a3b8', 686, 846, 228, 6)
}
function spiral(x, t, S) {
  party(x, t)
  S.L(x, t, { x: 280, y: 1150, s: 240, mood: t < 4.3 ? 'sparkle' : 'neutral', look: [1, 0], hops: [3.1, 3.4, 3.7], squash: t > 4.4 ? 0.08 : 0 })
  S.star(x, t, 'taurus', { x: 680, y: 1160, s: 190, mood: 'neutral', look: [-1, 0], seed: 11 })
  S.star(x, t, 'libra', { x: 900, y: 1170, s: 180, mood: t > 4.3 ? 'squint' : 'neutral', look: [-1, 0], seed: 12 })
}
function pep(x, t, S) {
  const [w0, w1, w2] = S.T.lines
  if (t > w0 + 0.4 && t < w1) {
    const k = outK(t, [w1 - 0.25, w1])
    ;['virgo', 'gemini', 'sagittarius', 'cancer'].forEach((s, i) => { const kk = pop01(t, w0 + 0.5 + i * 0.15, 0.3, 2.4) * k; if (kk > 0.01) S.star(x, t, s, { x: 380 + i * 120, y: 860, s: 110 * kk, mood: i % 2 ? 'wink' : 'happy', hops: [w0 + 1 + i * 0.2, w0 + 1.6 + i * 0.2], seed: 20 + i, glyph: false }) })
    label(x, 'your people', 560, 970, { size: 30, col: GOLD, alpha: k * prog(t, w0 + 0.6, w0 + 0.9) })
  }
  if (t > w1 + 0.4 && t < w2) {
    const k = pop01(t, w1 + 0.4, 0.3, 2.4) * outK(t, [w2 - 0.25, w2])
    note(x, 560, 840, 'SANDPAPER', { w: 340, h: 120, col: '#d9b27a', size: 40, k, rot: 0.05 })
    const xk = pop01(t, w1 + 1.2, 0.2, 3) * outK(t, [w2 - 0.25, w2])
    if (xk > 0.01) { x.save(); x.translate(560, 840); x.scale(xk, xk); for (const r of [0.5, -0.5]) { x.save(); x.rotate(r); R(x, INK, -170, -14, 340, 28); R(x, RED, -164, -8, 328, 16); x.restore() } x.restore() }
  }
  if (t > w2 + 0.4) {
    const k = pop01(t, w2 + 0.4, 0.3, 2.4)
    x.save(); x.translate(560, 930); x.scale(k, k)
    box(x, -100, -170, 200, 300, '#6a4fa8', { b: 7 }); R(x, GOLD, 60, -20, 16, 16)
    box(x, -150, -230, 300, 54, MINT, { b: 6 }); x.font = "800 32px Inter"; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('WEIRD WELCOME', 0, -202)
    x.restore()
  }
}
function fin(x, t, S) {
  const k = pop01(t, S.t0 + 0.6, 0.3, 2.4)
  if (k > 0.01) { x.save(); x.translate(330, 1300); x.rotate(0.1 * Math.sin(t * 5)); x.scale(k, k); R(x, INK, -4, -150, 8, 170); box(x, 4, -150, 170, 80, '#c9a6ff', { b: 5 }); x.font = "800 22px Inter"; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('WEIRD +', 89, -126); x.fillText('PROUD', 89, -96); x.restore() }
}
const EP = makePep({
  id: 'og-kpte11', sign: 'aquarius', coach: 'scorpio', end: 'cut', brk: 'glitch',
  premise: 'feeling like | *nobody gets you*',
  lines: ['your people are out there, being *weird* too.', 'don’t sand yourself *down* to fit a room.', 'go where your weird is *welcome.*'],
  last: 'The right one *loves* | the weird first.', lastLate: 0,
  hook, spiral, pep, fin,
  premiseTop: 530, pepHeadTop: 525,
  pepSet: (x, t) => party(x, t),
  bubbles: [{ t0: 3.1, t1: 5.3, x: 400, y: 930, text: 'octopuses have 3 hearts!! and blue blood!!', size: 30, tail: -0.4 }, { t0: 4.3, t1: 5.3, x: 790, y: 1000, text: '…cool.', size: 36, tail: 0, col: '#cfcad9' }],
  cues: [['pluck', 4.35, 196, 0.03, 0.6, 0], ['pop', 6.4, 1318.51, 0.03, -0.2], ['pop', 6.55, 1567.98, 0.03, 0], ['pop', 6.7, 1760, 0.03, 0.2], ['tick', 9.95, 0.06], ['pop', 12.55, 1174.66, 0.04, 0]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PEP, ease, lerp]
