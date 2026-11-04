// nf16e21: MEET THE FAMILY, "The Family Photo" (30 s vertical, star_advice post, music: jazzy · D).
// Story 0–25.6, then the shared end card. Series look: ../../nf16e13/famkit.js.
//   0.0–4.8    HOOK "Their family photo. | Am I *in it?*"  ♊ Gemini's family lines up by the tree; a dashed viewfinder frame;
//              ♐ Sagittarius hovers half in it, one foot in. MOM: "everybody *squeeze in!*"
//   4.8–9.8    "In. Out. | *In?*"  Sag steps in, out, in; the camera timer blinks. SAG: "wait, am I… *in this one?*"
//   9.8        card cut → NOTES: not sure? just ask · "in or out?" is a kind question · both answers are fine.
//   17.8–25.6  "Ask, then | *say cheese.*"  GEMINI: "we want you *in it.*" Sag hops in, FLASH, the photo prints: everyone in it,
//              Grandpa ♓ Pisces crying. THE STARS: "Ask, then *say cheese.*"
import { makeFamily, mark, hearts, sparkles, drawStarChar, signStar, label, R, box, prog, clamp, ease, lerp, BONE, GOLD, PINK, INK } from '../../nf16e13/famkit.js'

// the viewfinder: dashed white corners around the group
function viewfinder(x, t, X0, Y0, X1, Y1, a = 1) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a
  const L = 60, W = 8
  for (const [cx, cy, dx, dy] of [[X0, Y0, 1, 1], [X1, Y0, -1, 1], [X0, Y1, 1, -1], [X1, Y1, -1, -1]]) { R(x, BONE, cx - (dx < 0 ? W : 0), cy - (dy < 0 ? W : 0), L * dx, W); R(x, BONE, cx - (dx < 0 ? W : 0), cy - (dy < 0 ? W : 0), W, L * dy) }
  if (Math.sin(t * 6) > 0) { R(x, '#ff5c5c', X0 + 24, Y0 + 24, 18, 18); label(x, 'REC', X0 + 80, Y0 + 34, { size: 22, col: BONE }) }
  x.restore()
}
function camera(x, cx, cy) {
  for (const d of [-1, 0, 1]) { x.save(); x.translate(cx, cy + 40); x.rotate(d * 0.35); R(x, INK, -6, 0, 12, 200); R(x, '#5a5470', -3, 0, 6, 196); x.restore() }
  box(x, cx - 60, cy - 40, 120, 80, '#2a2148', { b: 6 }); box(x, cx - 24, cy - 24, 48, 48, '#14102a', { b: 4 }); R(x, '#7fd0ff', cx - 12, cy - 12, 14, 14)
}
const GROUP = [['mom', 300], ['dad', 470], ['you', 640]]
function group(x, t, S, { ok = 1, moods = {}, hops = [] } = {}) {
  for (const [k, gx] of GROUP) S.cast(x, t, k, { x: gx, y: 1080, s: 180, mood: moods[k] || 'happy', look: [0, 0.2], pop: ok, hops })
}
// the printed photo (polaroid) with the whole family, Sag included, Grandpa Pisces crying
function print(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  box(x, -230, -170, 460, 360, '#fffaf0', { b: 7 })
  R(x, '#553760', -205, -145, 410, 260)
  const sg = [['cancer', -150], ['taurus', -75], ['gemini', 0], ['sagittarius', 75], ['pisces', 150]]
  for (const [id, ox] of sg) drawStarChar(x, ox, -10, 80, t, { color: signStar(id).color, mood: id === 'pisces' ? 'happy' : 'happy', seed: ox, glow: 0.3, tips: false, bob: 0 })
  for (let i = 0; i < 3; i++) R(x, '#8fe3ff', 150 - 20 + ((t * 40 + i * 9) % 10), -6 + ((t * 60 + i * 13) % 40), 5, 8)
  x.fillStyle = INK; x.font = "italic 500 34px 'EB Garamond', serif"; x.textAlign = 'center'; x.fillText('everyone ♥', 0, 160)
  x.restore()
}
const LIV = { couch: false, treeX: 860, winX: 220, frames: false }
const EP = makeFamily({
  id: 'nf16e21', key: 'D',
  cast: {
    you: { sign: 'gemini', role: 'GEMINI', acc: { scarf: '#7fd0ff' }, text: '#fff1a8' },
    them: { sign: 'sagittarius', role: 'SAG', acc: { beanie: '#ff8a2a' }, text: '#ffe0b0' },
    mom: { sign: 'cancer', role: 'MOM', acc: { pearls: 1 }, text: '#cfe8ff' },
    dad: { sign: 'taurus', role: 'DAD', acc: { glasses: 1, bow: '#e8344e' } },
  },
  beats: [
    { len: 4.8, room: 'living', roomOpts: LIV, head: 'Their family photo. | Am I *in it?*',
      lines: [{ u: 0.6, who: 'mom', text: 'everybody *squeeze in!*' }],
      draw(x, t, S) {
        const u = S.u
        group(x, t, S, { hops: [S.t0 + 0.6] })
        S.pisces(x, t, { x: 140, y: 1080, s: 160, mood: 'happy', tears: 2, acc: { glasses: 1, bow: '#c9a6ff' } })
        // Sag straddling the viewfinder's right edge
        S.cast(x, t, 'them', { x: 860 + 14 * Math.sin(t * 3), y: 1090, s: 180, mood: 'wide', look: [-1, 0], squash: -0.03 })
        viewfinder(x, t, 70, 820, 860, 1220)
        mark(x, t, 860, 900, S.t0 - 1, S.t0 + 4.7, '?', GOLD)
      } },
    { len: 5.0, room: 'living', roomOpts: LIV, head: 'In. Out. | *In?*',
      lines: [{ u: 1.2, who: 'them', text: 'wait, am I… *in this one?*' }],
      draw(x, t, S) {
        const u = S.u
        group(x, t, S)
        S.pisces(x, t, { x: 140, y: 1080, s: 160, mood: 'happy', tears: 2, acc: { glasses: 1, bow: '#c9a6ff' } })
        const st = Math.floor(u / 0.7) % 2, sx = st ? 960 : 790
        S.cast(x, t, 'them', { x: lerp(sx, sx, 1), y: 1090, s: 180, mood: 'wide', look: [-1, 0], hops: [0, 0.7, 1.4, 2.1, 2.8, 3.5].map(a => S.t0 + a) })
        viewfinder(x, t, 70, 820, 860, 1220)
        const n = 5 - Math.floor(u)
        if (n > 0) label(x, String(n), 860, 640, { size: 90, col: '#ff6b7f', font: "Inter, sans-serif", weight: 800, alpha: 0.4 + 0.6 * (1 - (u % 1)) })
      },
      cues: [['tick', 0.0, 0.05], ['tick', 0.7, 0.05], ['tick', 1.4, 0.05], ['tick', 2.1, 0.05], ['tick', 2.8, 0.05], ['tick', 3.5, 0.05], ['pluck', 1.0, 2349.32, 0.02, 0.2, 0.4], ['pluck', 2.0, 2349.32, 0.02, 0.2, 0.4], ['pluck', 3.0, 2349.32, 0.02, 0.2, 0.4], ['pluck', 4.0, 2349.32, 0.02, 0.2, 0.4]] },
    { len: 8.0, kind: 'notes',
      tips: ['Not sure? *Just ask.*', '“In or out?” is a *kind* question.', 'Both answers *are fine.*'],
      draw(x, t, S) {
        S.cast(x, t, 'you', { x: 560, y: 1150, s: 170, mood: 'happy', look: [1, 0], hops: [S.t0 + 0.9] })
        S.cast(x, t, 'them', { x: 800, y: 1150, s: 170, mood: 'happy', look: [-1, 0], hops: [S.t0 + 3.2, S.t0 + 5.5] })
      } },
    { len: 7.8, room: 'living', roomOpts: LIV, head: 'Ask, then | *say cheese.*', pis: false,
      lines: [{ u: 0.3, who: 'you', text: 'we want you *in it.*' }],
      lastU: 3.6, last: 'Ask, then *say cheese.*',
      draw(x, t, S) {
        const u = S.u, ok = S.out
        const fl = u > 2.2 && u < 2.5 ? 1 : 0
        group(x, t, S, { ok, moods: { you: u > 0.3 ? 'happy' : 'happy', mom: u > 2.3 ? 'sparkle' : 'happy' } })
        S.pisces(x, t, { x: 140, y: 1080, s: 160, mood: 'happy', tears: 3, acc: { glasses: 1, bow: '#c9a6ff' }, pop: ok })
        const inK = ease.inOutCubic(prog(u, 1.0, 1.6))
        S.cast(x, t, 'them', { x: lerp(860, 780, inK), y: 1080, s: 180, mood: u > 1.0 ? 'heart' : 'sparkle', look: [-1, 0], pop: ok, hops: [S.t0 + 1.0] })
        viewfinder(x, t, 70, 820, 940, 1220, 1 - prog(u, 2.2, 2.4))
        if (fl) { x.fillStyle = 'rgba(255,250,235,0.85)'; x.fillRect(40, 400, 1000, 960) }
        print(x, t, 540, 680, ease.outBack(prog(u, 2.6, 3.1)) * ok)
        hearts(x, t, S.t0 + 1.1, 780, 900, { n: 5 })
        sparkles(x, t, 540, 680, S.t0 + 2.6, 12, 260, 1, [GOLD, BONE, PINK])
      },
      cues: [['pop', 1.0, 1318.51, 0.035, 0.3], ['tick', 2.2, 0.08], ['boom', 2.2, 0.12], ['bell', 2.25, 2349.32, 0.03, 0.8, 0], ['whoosh', 2.6, 0.3, 0.035], ['glitter', 2.6, 3.1]] },
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [camera, clamp]
