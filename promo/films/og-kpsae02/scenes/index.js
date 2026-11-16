// og-kpsae02: social rework of kpsae02 (static HOOK box 0–3.0 replaces the kit hook; kit copy ../sakit.js: no series bug,
// no flash / shake / whip; Saturn has already crashed in on frame 0; crazier Taurus; bubbles in the safe zone; ends on
// Saturn's last line). Was: kpsae02 · Planet Talk: Saturn · "Saturn Gets Taurus Off the Couch" (28 s vertical, hard cut) · jazzy · F
//   0      Saturn crashing down through the ceiling onto the couch, popcorn mid-air, Taurus mid-flinch under a blanket.
//          "TAURUS. | Off the couch. *Talk.*"  · ~0.1 the landing: flash, shake, whip zoom
//   0.8    ♄ "TAURUS. We need to *talk.*" · 2.8 "52 movie nights. *Zero* labels." · ♉ "it's comfy! why *ruin* it?"
//   5.5    loading bar "waiting for them to say it…" → ERROR: nobody said it
//   9.1    ♄ "comfy is lovely. *clear* is kinder." · 11.9 ♉ "what if I'm *too much?*"
//   14.1   ♄ "wanting to know isn't *too much.* it's honest." · 17.0 ♉ types "I like us. what *are* we?"
//   19.8   notification: "me too. I was scared to ask." · Pisces the intern sobbing into the blanket
//   23.2   notification: "movie night tomorrow? our 53rd" · 25.9 ♄ "Cosy *and* clear. That's home." · hard cut 28
import { saFilm, HK } from '../sakit.js'

export const HOOK = '52 movie nights. | Still *no label.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.0
import { prog, ease, lerp, clamp, rng } from '../../../src/lib.js'

const D = 28
const N1 = { at: 19.8, out: [22.9, 23.15], title: 'texts', body: 'me too. I was *scared* to ask.', glyph: '♡', y: 500 }
const N2 = { at: 23.2, out: [25.5, 25.75], title: 'texts', body: 'movie night tomorrow? *officially* our 53rd', glyph: '♡', y: 500 }
const F = saFilm({
  id: 'og-kpsae02', sign: 'taurus', dur: D, ending: 'cut',
  hook: 'TAURUS.|Off the couch. *Talk.*', hookY: 1720, hookSize: 92, hookOut: 2.5,
  arrive: { kind: 'crash', at: -1.0, x: 700, y: 900, size: 440 },
  shots: [
    { at: 0, cam: [1, 540, 960] },
    { at: 11.8, cam: [1.18, 420, 1100] },
    { at: 14.0, cam: [1, 540, 960] },
    { at: 19.8, cam: [1.12, 460, 1080] },
    { at: 25.8, cam: [1, 540, 960] },
  ],
  punch: [{ at: 20.0, dur: 1.4, z: 0.1, x: 380, y: 1200 }],
  says: [
    { t0: 3.1, t1: 5.3, who: 'saturn', text: 'TAURUS. 52 movie nights. *Zero* labels.', x: 540, y: 600 },
    { t0: 5.5, t1: 8.8, who: 'taurus', text: "it's comfy! I have *fused* with this couch.", x: 460, y: 1440, tailUp: true, tail: -100 },
    { t0: 9.1, t1: 11.6, who: 'saturn', text: 'Same blanket for a *year.* Clear is kinder.', x: 540, y: 600 },
    { t0: 11.9, t1: 13.9, who: 'taurus', text: "what if asking makes me *too much?* I'll eat more popcorn.", x: 460, y: 1440, tailUp: true, tail: -100 },
    { t0: 14.1, t1: 16.8, who: 'saturn', text: "wanting to know isn't *too much.* it's honest.", x: 540, y: 600 },
    { t0: 17.0, t1: 19.6, who: 'taurus', text: 'sending: "I like us. what *are* we?"', x: 460, y: 1440, tailUp: true, tail: -100 },
    { t0: 20.6, t1: 22.9, who: 'pisces', text: "I'm sobbing into the *popcorn.*", x: 560, y: 1440, tailUp: true, tail: 260 },
    { t0: 25.9, who: 'saturn', text: 'Cosy *and* clear. That’s home.', x: 540, y: 600, size: 50 },
  ],
  fx: [
    { f: HK.notification, c: HK.notificationCues, o: N1 },
    { f: HK.notification, c: HK.notificationCues, o: N2 },
  ],
  paint(x, t, K) {
    K.room(x, t, { wall: '#3a2a1e', wall2: '#1e140e', floor: '#2b1e16', floorY: 1460, warm: 0.6, frame: '#6a4a2a' })
    // the TV glow on the left wall
    const tv = 0.5 + 0.2 * Math.sin(t * 7) + 0.1 * Math.sin(t * 19)
    const g = x.createRadialGradient(-60, 1000, 20, -60, 1000, 600); g.addColorStop(0, `rgba(140,190,255,${0.25 * tv})`); g.addColorStop(1, 'rgba(140,190,255,0)'); x.fillStyle = g; x.fillRect(-200, 400, 900, 1200)
    // the ceiling hole (Saturn came through it)
    x.fillStyle = '#0d0a1a'; x.beginPath(); x.ellipse(700, 0, 260, 70, 0, 0, Math.PI * 2); x.fill()
    // falling plaster (frame 0 mid-air)
    const R = rng(77)
    for (let i = 0; i < 14; i++) {
      const vx = (R() - 0.5) * 500, t0 = -0.7 + R() * 0.3, s = 14 + R() * 26, d = t - t0
      if (d < 0 || d > 1.6) continue
      K.box(x, 700 + (R() - 0.5) * 300 + vx * d, 20 + 400 * d + 900 * d * d, s, s * 0.8, '#d9cbb8', { o: 3 })
    }
    // the couch
    K.box(x, 80, 1180, 920, 120, '#7a4a3a'); K.box(x, 60, 1280, 960, 150, '#9a5a44'); K.box(x, 40, 1200, 90, 240, '#7a4a3a'); K.box(x, 950, 1200, 90, 240, '#7a4a3a')
    // Taurus under the blanket (left cushion)
    const flinch = 1 - ease.outCubic(prog(t, 0.05, 0.6))
    const tMood = t < 1 ? 'wide' : t < 3 ? 'wide' : t < 9 ? 'happy' : t < 14 ? 'neutral' : t < 19.8 ? 'squint' : t < 25.8 ? 'heart' : 'happy'
    K.sign(x, t, 'taurus', { x: 330, y: 1090 - 60 * flinch, s: 330, mood: tMood, look: t < 9 ? [0.8, -0.6] : [0.6, -1], squash: -0.12 * flinch, tears: t > 19.9 && t < 23 ? 1 : 0 })
    // the blanket
    x.save(); x.translate(330, 1270); x.rotate(-0.06)
    K.box(x, -190, -40, 380, 150, '#c96a8a'); for (let i = 0; i < 6; i++) K.rect(x, -190 + i * 64, -40, 28, 150, 'rgba(255,255,255,0.12)')
    x.restore()
    // the popcorn bowl + popcorn (mid-air at frame 0, a second burst of joy at 19.9)
    K.box(x, 470, 1250, 130, 50, '#e9d8c0')
    for (const [b0, n] of [[-0.35, 22], [19.9, 16]]) {
      const P = rng(b0 > 0 ? 9 : 5)
      for (let i = 0; i < n; i++) {
        const vx = (P() - 0.5) * 700, vy = -600 - P() * 700, d = t - b0
        if (d < 0 || d > 2.4) continue
        const yy = 1240 + vy * d + 1100 * d * d
        if (yy > 1260 && d > 0.3) continue
        x.fillStyle = '#140c28'; x.fillRect(530 + vx * d - 2, yy - 2, 22, 22); x.fillStyle = '#fff6dc'; x.fillRect(530 + vx * d, yy, 18, 18)
      }
    }
    // Saturn: crash-lands on the right cushion, then floats up to talk
    const lift = ease.inOutCubic(prog(t, 0.6, 1.6))
    const sMood = t < 1 ? 'wide' : t < 9 ? 'neutral' : t < 14 ? 'sly' : t < 19.8 ? 'neutral' : t < 25.8 ? 'happy' : 'proud'
    if (t < 0.6) K.arriving(x, t, { mood: 'wide', look: [-0.6, 0.6] })
    else K.saturn(x, t, { x: lerp(700, 640, lift), y: lerp(900, 780, lift), size: 440, mood: sMood, look: [-0.7, 0.5] })
    // Pisces the intern, wrapped in the blanket's corner
    K.intern(x, t, { x: 790, y: 1470, s: 220, pop: K.pop01(t, 1.4, 0.4), tears: t > 19.9 ? 3 : 2, mood: t > 19.9 ? 'wide' : 'sparkle' })
  },
  over(x, t, K) {
    K.loading(x, t, { at: 5.5, out: 8.9, label: 'waiting for the other one to say it…', pct: tt => 0.2 + 0.8 * ease.outCubic(prog(tt, 5.6, 7.8)), Y: 600, err: 'ERROR: both too comfy' })
  },
  cues: [
    ['chip', 7.85, 1318.51, 0.25, { gain: 0.03 }],
    ['pop', 19.92, 880, 0.04, 0], ['glitter', 19.95, 21.0], ['bell', 26.0, 1046.5, 0.04, 1.2, 0],
  ],
  music: { style: 'jazzy', key: 'F', seed: 7102, sections: { lift: [19.8] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
