// kpsae12 · Planet Talk: Saturn · "Saturn Slows Pisces Down, Gently" (30 s vertical, hard cut) · dreamy · E
// In this one Pisces is the sign (usually Saturn's intern): it cries the whole way through, happy tears included.
//   0      Saturn looming up over the horizon, its ring lassoing Pisces mid-twirl in a wedding veil, rose petals
//          mid-air, Pisces already crying. "PISCES. | Put the veil *down.*"  · 0.8 the landing
//   2.6    "date *two.*" · 3.0 the speech (DRAFT 4) · the dog's name · the first-dance song, picked
//   4.0    ♓ "I've already named our *dog!*" · 6.2 loading bar "planning forever…" → ERROR: it's date two
//   9.4    ♄ "falling fast is a *gift.*" · 11.4 "let them *earn* the speech." · 13.6 ♓ "but what if they're *the one?*"
//   15.8   ♄ "then they'll still be the one on date *ten.*" · 18.4 "get to know who they *are.* not who you hope."
//   21.0   the speech + the veil go in a drawer labelled LATER · 23.2 Saturn's tissue · ♓ "these are *happy* tears. mostly."
//   25.8   ♄ "falling slow is *still* falling." · 27.9 ♓ "Date three. *Then* the speech." · hard cut 30
import { saFilm, HK } from '../../kpsae01/sakit.js'
import { prog, ease, lerp, clamp, rng } from '../../../src/lib.js'

const D = 30
const PI = { x: 540, y: 1250 }
const ITEMS = [['THE SPEECH · DRAFT 4', 3.0, 250, 900, -0.08], ['OUR DOG: BISCUIT', 3.6, 830, 1010, 0.07], ['FIRST DANCE: picked ♪', 4.2, 270, 1110, 0.05]]
const DRAWER = 21.0, TISSUE = 23.2
const F = saFilm({
  id: 'kpsae12', sign: 'pisces', dur: D, ending: 'cut',
  hook: 'PISCES.|Put the veil *down.*', hookY: 210, hookSize: 96, hookOut: 2.5,
  arrive: { kind: 'rise', at: -0.8, x: 540, y: 600, size: 440 },
  shots: [
    { at: 0, cam: [1, 540, 960] },
    { at: 13.5, cam: [1.14, 540, 1080] },
    { at: 15.7, cam: [1, 540, 960] },
    { at: 21.0, cam: [1.1, 600, 1080] },
    { at: 23.1, cam: [1, 540, 960] },
    { at: 27.8, cam: [1.12, 540, 1060] },
  ],
  says: [
    { t0: 4.0, t1: 5.9, who: 'pisces', text: "I've already named our *dog!*", x: 540, y: 1720, tailUp: true },
    { t0: 9.4, t1: 11.2, who: 'saturn', text: 'falling fast is a *gift.*', x: 540, y: 185 },
    { t0: 11.4, t1: 13.4, who: 'saturn', text: 'let them *earn* the speech.', x: 540, y: 185 },
    { t0: 13.6, t1: 15.6, who: 'pisces', text: "but what if they're *the one?*", x: 540, y: 1720, tailUp: true },
    { t0: 15.8, t1: 18.2, who: 'saturn', text: "then they'll still be the one on date *ten.*", x: 540, y: 185 },
    { t0: 18.4, t1: 20.8, who: 'saturn', text: 'get to know who they *are.* not who you hope.', x: 540, y: 200, size: 42 },
    { t0: 21.2, t1: 23.0, who: 'pisces', text: "…filed under *'LATER'.*", x: 540, y: 1720, tailUp: true },
    { t0: 23.6, t1: 25.6, who: 'pisces', text: 'these are *happy* tears. mostly.', x: 540, y: 1720, tailUp: true },
    { t0: 25.8, t1: 27.6, who: 'saturn', text: 'falling slow is *still* falling.', x: 540, y: 185 },
    { t0: 27.9, who: 'pisces', text: 'Date three. *Then* the speech.', x: 540, y: 1720, tailUp: true, size: 50 },
  ],
  heads: [{ text: 'date *two.*', at: 2.6, out: [4.8, 5.05], top: 760, size: 110 }],
  paint(x, t, K) {
    K.drawSpace(x, t, { planet: 'venus', tint: '#ff8fb1', seed: 12, horizon: { y: 1520, color: '#2a1438', rim: '#ff8fb1' } })
    // Saturn looms up over the horizon (rings off at first: one is the lasso)
    const P = K.pose(t), sr = P.size / 2
    const back = ease.inOutCubic(prog(t, 2.4, 3.0))
    const ringOn = back >= 1
    const sMood = t < 2.5 ? 'wide' : t < 9.3 ? 'sly' : t < 21 ? 'neutral' : t < 25.8 ? 'happy' : 'proud'
    K.aboveHorizon(x, 1520, () => K.arriving(x, t, { mood: sMood, look: [0, 1], rings: ringOn }))
    // rose petals (mid-air at frame 0)
    const R = rng(5)
    for (let i = 0; i < 26; i++) {
      const sx = R() * 1080, ph = R(), d = t + 0.8 + ph, sway = Math.sin(d * 2 + i) * 60
      const Y = -100 + ((d * (160 + R() * 120)) % 2100)
      if (t > 3 && i % 2) continue
      x.save(); x.translate(sx + sway, Y); x.rotate(d * 2 + i); x.fillStyle = K.INK; x.beginPath(); x.ellipse(0, 0, 20, 13, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = i % 3 ? '#ff6f9a' : '#ffb3c6'; x.beginPath(); x.ellipse(0, 0, 15, 9, 0, 0, Math.PI * 2); x.fill(); x.restore()
    }
    // the drawer labelled LATER (appears for the filing)
    const dk = K.inOut(t, DRAWER - 0.3, D + 1)
    if (dk > 0.01) { x.save(); x.translate(860, 1440); x.scale(dk, dk); K.box(x, -130, -90, 260, 180, '#8a6a4a', { o: 6 }); K.box(x, -100, -60, 200, 70, '#a07a5a', { o: 4 }); K.box(x, -60, 30, 120, 40, '#fffaf0', { o: 3 }); K.txt(x, 'LATER', 0, 51, { size: 24, color: K.INK }); x.restore() }
    // Pisces: mid-twirl at frame 0, lassoed
    const twirl = 1 - ease.outCubic(prog(t, -0.8, 0.9))
    const pMood = t < 2.5 ? 'wide' : t < 9.3 ? 'sparkle' : t < 13.5 ? 'wide' : t < 15.7 ? 'sad' : t < 21 ? 'neutral' : 'sparkle'
    const tears = t < 9.3 ? 3 : t < 13.5 ? 2 : t < 15.7 ? 3 : t < 21 ? 2 : 3
    const veil = 1 - ease.inOutCubic(prog(t, DRAWER, DRAWER + 0.8))
    // the veil (behind)
    if (veil > 0.01) {
      const vx = lerp(860, PI.x, veil), vy = lerp(1400, PI.y - 150, veil), vs = veil
      x.save(); x.translate(vx, vy); x.rotate(Math.sin(t * 2) * 0.05 + twirl * 0.6); x.scale(vs, vs)
      x.scale(0.8, 0.8); x.fillStyle = 'rgba(255,255,255,0.2)'; x.strokeStyle = 'rgba(255,255,255,0.75)'; x.lineWidth = 6
      x.beginPath(); x.moveTo(-60, -40); x.quadraticCurveTo(-260, 200, -180 - 40 * Math.sin(t * 3), 380); x.lineTo(180 + 40 * Math.sin(t * 3.4), 380); x.quadraticCurveTo(260, 200, 60, -40); x.closePath(); x.fill(); x.stroke()
      x.fillStyle = '#fffaf0'; for (let i = 0; i < 5; i++) { x.beginPath(); x.arc(-48 + i * 24, -40, 12, 0, Math.PI * 2); x.fill() }
      x.restore()
    }
    K.sign(x, t, 'pisces', { x: PI.x, y: PI.y, s: 340, mood: pMood, rot: twirl * Math.sin(t * 14) * 0.5, look: t > 9 ? [0, -1] : [0, -0.4], tears, squash: -0.1 * twirl })
    // the lasso ring round Pisces' middle → back onto Saturn
    if (!ringOn) {
      const tight = ease.outCubic(prog(t, -0.8, 0.6))
      const rx = lerp(lerp(360, 220, tight), 1.85 * sr, back), ry = lerp(lerp(120, 60, tight), 0.42 * sr, back)
      const cx = lerp(PI.x, P.x, back), cy = lerp(PI.y + 30, P.y, back), rot = lerp(Math.sin(t * 9) * 0.15 * (1 - tight), -0.32, back)
      K.ring(x, cx, cy, rx, ry, { rot, half: back < 0.5 ? 'front' : 'both', w: 0.2, t, spin: 3 })
      if (back < 0.5) { x.save(); x.strokeStyle = '#e2c27e'; x.lineWidth = 10; x.setLineDash([22, 14]); x.beginPath(); x.moveTo(cx + rx * 0.7, cy - ry * 0.5); x.quadraticCurveTo(800, 900, P.x + sr * 0.6, P.y + sr * 0.6); x.stroke(); x.restore() }
    }
    // the three over-planned things → filed in the drawer at DRAWER
    for (const [s, at, ix, iy, r] of ITEMS) {
      const k = K.pop01(t, at, 0.3)
      if (k <= 0.01) continue
      const f = ease.inOutCubic(prog(t, DRAWER + 0.2, DRAWER + 1.0))
      if (f >= 1) continue
      x.save(); x.translate(lerp(ix, 860, f), lerp(iy, 1400, f)); x.rotate(r + f * 2); x.scale(k * (1 - 0.6 * f), k * (1 - 0.6 * f))
      x.font = `700 30px ${K.MONO}`; const w = x.measureText(s).width + 50
      K.box(x, -w / 2, -34, w, 68, '#fffaf0', { o: 5 }); K.txt(x, s, 0, 2, { size: 30, color: '#a04a6a' })
      x.restore()
    }
    // Saturn's tissue
    if (t > TISSUE) {
      const p = ease.inOutCubic(prog(t, TISSUE, TISSUE + 0.6))
      K.tissue(x, lerp(P.x + 120, PI.x + 170, p), lerp(P.y + 160, PI.y - 20, p) - Math.sin(Math.PI * p) * 120, 1.3, { rot: -0.2 + 0.1 * Math.sin(t * 5) })
    }
  },
  over(x, t, K) {
    K.loading(x, t, { at: 6.2, out: 9.2, label: 'planning forever…', pct: tt => 0.1 + 0.9 * ease.outCubic(prog(tt, 6.3, 8.2)), Y: 960, color: '#ff8fb1', err: "ERROR: it's date two" })
  },
  cues: [
    ['glitter', 0.0, 1.2], ['whoosh', 0.0, 0.4, 0.04],
    ['whoosh', 2.4, 0.3, 0.04], ['pop', 3.0, 659.25, 0.05, 0],
    ...ITEMS.map(([, at], i) => ['pop', at, [783.99, 987.77, 1174.66][i], 0.05, 0]),
    ...[6.4, 6.8, 7.2, 7.6, 8.0].map(t => ['tick', t, 0.03]),
    ['whoosh', DRAWER, 0.5, 0.05], ['tom', DRAWER + 1.0, 120, { gain: 0.22 }], ['tick', DRAWER + 1.0, 0.05],
    ['whoosh', TISSUE, 0.4, 0.04], ['pop', TISSUE + 0.6, 1318.51, 0.05, 0], ['glitter', 23.6, 25.0], ['bell', 28.0, 1318.51, 0.045, 1.4, 0],
  ],
  music: { style: 'dreamy', key: 'E', seed: 7112, sections: { breakdown: 9.4, lift: [21.0] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
