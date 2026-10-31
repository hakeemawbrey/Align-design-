// sxdebatephone (30 s vertical, Star Talk Shows · TWO STARS DISAGREE · EP 3) "Phone face-up, or face-down?" · lofi Cm.
// Same set as EP 1 (the shared debate look lives in ../../sxdebatetext/scenes/debate.js). Story 0–25.6, then the end card.
//   hook   "Phone face-up, | or *face-down?*"  ♊ GEMINI (FACE-UP, air blue) vs ♉ TAURUS (FACE-DOWN, earth green; both
//          signs are gold in wheel.js, so they get colour overrides to read apart from each other and THE STARS). GONG.
//   v1     GEMINI: "face-UP. what if it's *urgent?*" (its phone face-up, a badge climbing) · TAURUS: "mine's in the *bread
//          basket.*" (a pixel bread basket on the podium, a phone corner poking out from under a loaf)
//   v2     "It's getting | *buzzy.*"  GEMINI: "it's buzzed *seventeen* times!" (the basket rattles, ×17) · TAURUS: "let it
//          buzz. i'm *buttering.*" (a roll with a butter pat, crumbs, bliss)
//   v3     card cut → "Final | *round.*"  GEMINI: "but WHO keeps texting you??" · TAURUS: "…you. from *across the table.*"
//          (Gemini's own phone: "u there?" "taurus" "TAURUS" … 17 sent). Pisces sobs.
//   turn   BIG GONG. "The stars | *interrupt.*"  THE STARS: "you're *both* right. just *say it* out loud."
//   end    Gemini puts its phone face-down; they bump, a heart. "Face-down. | *Face* last."  + "Which side are *you* on?"
import { prog, ease, clamp } from '../../../src/lib.js'
import { makeDebate, DURATION, INK, POS } from '../../sxdebatetext/scenes/debate.js'

export { DURATION }
export const KEY = 'Cm'
const BASKET = ['.BBBBBBBBBBB.', 'BbBbBbBbBbBbB', 'bBbBbBbBbBbBb', '.BbBbBbBbBbB.', '..BBBBBBBBB..']
const LOAF = ['..LLLLLL..', '.LlLlLlLL.', 'LLLLLLLLLL', 'LLLLLLLLLL']
const ROLL = ['..rrrr..', '.rRRRRr.', 'rRRyyRRr', 'rRRRRRRr', '.rrrrrr.']

const cfg = {
  id: 'sxdebatephone', ep: 3, key: KEY, accent: '#9fe0ff',
  signs: [{ id: 'gemini', name: 'GEMINI', stance: 'FACE-UP', color: '#7fd0f0' }, { id: 'taurus', name: 'TAURUS', stance: 'FACE-DOWN', color: '#6fd08a' }],
  heads: {
    hook: 'Phone face-up, | or *face-down?*',
    r2: 'It’s getting | *buzzy.*',
    r3: 'Final | *round.*',
    stars: 'The stars | *interrupt.*',
    last: 'Face-down. | *Face* last.',
  },
  lines: [
    { who: 0, text: 'face-UP. what if it’s *urgent?*', moods: ['wide', 'eyeroll'] },
    { who: 1, text: 'mine’s in the *bread basket.*', moods: ['happy', 'wide'] },
    { who: 0, text: 'it’s buzzed *seventeen* times!', moods: ['wide', 'happy'] },
    { who: 1, text: 'let it buzz. i’m *buttering.*', moods: ['sparkle', 'squint'] },
    { who: 0, text: 'but WHO keeps texting you??', moods: ['squint', 'happy'] },
    { who: 1, text: '…you. from *across the table.*', moods: ['squint', 'wide'] },
  ],
  star: 'you’re *both* right. just *say it* out loud.',
  props(x, t, H) {
    const { L, T, px, bits, txt, phone, bubble, pop01, ok } = H
    const until = (i, end) => pop01(t, L[i].t - 0.05, 0.3, 2) * (1 - ease.inQuad(prog(t, end - 0.25, end))) * ok
    // Gemini's phone, face-up, the whole debate (flips face-down after THE STARS)
    const kg = until(0, T.out[0] + 0.3)
    if (kg > 0.01) {
      const down = ease.inOutCubic(prog(t, T.turn + 0.1, T.turn + 0.5))
      const v3 = t > L[5].t + 0.3
      const badge = Math.min(17, Math.floor(prog(t, L[0].t + 0.2, L[2].t + 0.4) * 17) + 1)
      const buzz = t < T.stars && (t * 6) % 1 < 0.25 ? 0.04 : 0
      if (down < 0.5) {
        phone(110, 920, 116, { k: kg * (1 - down * 2 * 0.0), rot: -0.1 + buzz * Math.sin(t * 80), draw: (sl, st, sw, sh) => {
          if (v3) {
            txt('SENT → ♉', sl + sw / 2, st + 16, { size: 13, color: '#9a96b0', shadow: false })
            let y = st + 32
            for (const m of ['u there?', 'taurus', 'TAURUS', 'hello??']) y += bubble(m, sl + sw - 4, y, sw - 8, { size: 15, color: '#e9b24a', ink: INK }) + 6
            txt('17 sent', sl + sw / 2, st + sh - 16, { size: 14, color: '#e9b24a', shadow: false })
          } else {
            let y = st + 10
            for (let i = 0; i < Math.min(5, badge); i++) { px(sl + 6, y, sw - 12, 22, '#2a2450'); px(sl + 10, y + 6, 10, 10, ['#ff8fb1', '#7fd0f0', '#e9b24a'][i % 3]); px(sl + 26, y + 8, sw - 46, 6, '#6a6490'); y += 28 }
          }
        } })
        if (!v3 && t < T.stars) {
          const bx = 168, by = 812
          px(bx - 24, by - 20, 48, 40, INK); px(bx - 20, by - 16, 40, 32, '#ff4f5e')
          txt(String(badge), bx, by + 1, { size: 22, color: '#ffffff', shadow: false })
        }
      } else {
        // face-down on Gemini's podium
        px(70, 1000, 120, 22, INK); px(76, 1004, 108, 14, '#3a3456')
        txt('face-down ✓', 130, 972, { size: 22, color: '#7dffb0', alpha: kg * clamp((down - 0.5) * 4) })
      }
    }
    // Taurus' bread basket (the phone under a loaf), all debate long
    const kb = until(1, T.out[0] + 0.3)
    if (kb > 0.01) {
      const rattle = t > L[2].t && t < L[3].t + 0.2 && (t * 7) % 1 < 0.3 ? Math.sin(t * 90) * 0.06 : 0
      const cx = 968, cy = 960
      // the phone corner poking out
      x.save(); x.translate(cx + 30, cy - 44); x.rotate(0.5 + rattle); x.scale(kb, kb); px(-14, -30, 28, 50, INK); px(-10, -26, 20, 42, '#2c2550'); px(-6, -22, 12, 8, '#ffcf5a'); x.restore()
      bits(LOAF, { L: '#d99a4a', l: '#f2c27a' }, cx - 10, cy - 40, 9, { sx: kb, sy: kb, rot: -0.1 + rattle })
      bits(BASKET, { B: '#a8703a', b: '#7a4e26' }, cx, cy, 10, { sx: kb, sy: kb, rot: rattle })
      if (rattle) for (let n = 0; n < 2; n++) txt(n ? ')' : '(', cx + (n ? 84 : -84), cy - 30, { size: 34, color: '#ffcf5a' })
      if (t > L[2].t + 0.2 && t < L[4].t) txt('×17', cx, cy + 56, { size: 26, color: '#ffcf5a', alpha: kb })
    }
    // v2: Taurus butters a roll (crumbs, bliss)
    const kr = until(3, L[4].t + 0.6)
    if (kr > 0.01) {
      const tau = H.pos[1]
      bits(ROLL, { r: '#c98a3a', R: '#f2c27a', y: '#fff1a0' }, tau.x - 120, tau.y + 30 + 4 * Math.sin(t * 6), 10, { sx: kr, sy: kr })
      for (let i = 0; i < 5; i++) { const p = (t * 1.2 + i / 5) % 1; px(tau.x - 150 + i * 14, tau.y + 60 + p * 80, 6, 6, `rgba(242,194,122,${(1 - p) * kr})`) }
    }
  },
}
const deb0 = makeDebate(cfg)
cfg.sobAt = [deb0.L[5].t + 0.7]
cfg.cues = (T) => {
  const L = deb0.L
  const buzz = (t0, n) => Array.from({ length: n }, (_, i) => ['tick', +(t0 + i * 0.167).toFixed(3), 0.03])
  return [
    ...buzz(L[0].t + 0.2, 6), ['pop', L[1].t + 0.2, 523.25, 0.03, 0.4], ['tick', L[1].t + 0.5, 0.02],
    ...buzz(L[2].t + 0.1, 10), ['pop', L[2].t + 0.6, 1567.98, 0.03, 0.4],
    ['pluck', L[3].t + 0.3, 783.99, 0.03, 0.6, 0.3], ['pluck', L[3].t + 0.6, 987.77, 0.03, 0.6, 0.3],
    ...[0, 1, 2, 3].map(i => ['pop', +(L[5].t + 0.5 + i * 0.15).toFixed(3), 1174.66 + i * 100, 0.025, -0.4]),
    ['whoosh', T.turn + 0.1, 0.3, 0.03], ['tom', T.turn + 0.45, 110, { gain: 0.18 }],
  ]
}
const deb = makeDebate(cfg)
export const T = deb.T
export const SCENES = deb.SCENES
export const CUES = deb.CUES
export const CUTS = deb.CUTS
