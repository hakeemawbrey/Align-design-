// ncape01: CAPRICORN SEASON TAKEOVER, ep 1, "The Handover" (30 s vertical, music: cinematic · Cm). promo/films/next30/b10.md.
// Story 0–25.6, then the shared end card. Shared look: ../../nsage01/scenes/takekit.js.
//   0.0–2.6    hook "Sag hands Cap | the *keys.*"  Frame 0: the huge account keyring mid-air, tossed by Sag; Cap catches it
//              without looking up from its planner.
//   2.6–8.6    "The *password.*"  SAG: "the password is 'adventure'."  CAP: "it's now in a vault."  A vault door thunks shut.
//   8.6–14.6   "Capricorn season | starts at the *solstice.*"  Two chips: ASTROLOGY SAYS Capricorn season begins at the
//              December solstice · SKY FACT the longest night of the year, north of the equator.
//  14.6        card cut.
//  14.6–21.0   "Cap's *first* post:"  A tidy calendar. Sag yawns; Cap tucks Sag in with a blanket. Pisces cries at the
//              goodbye. SAG: "night, Cap. they're all yours."
//  21.0–25.6   CAP: "Longest night. *Earliest* bedtime."
import { makeTakeover, R, box, ink, floor, shadow, glow, sparkles, hearts, keyring, prog, lerp, clamp, ease, pop01, INK, BONE, GOLD, RED } from '../../nsage01/scenes/takekit.js'

const SAG = '#c58bff'
function planner(x, cx, cy, rot = 0, s = 1) { x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s); box(x, -55, -70, 110, 140, '#2e5f5a', { b: 6 }); for (let i = 0; i < 5; i++) R(x, BONE, -40, -50 + i * 22, 80, 6); R(x, GOLD, 40, -70, 10, 40); x.restore() }
function vault(x, cx, cy, shut) {
  x.save(); x.translate(cx, cy)
  box(x, -170, -170, 340, 340, '#5a5470', { b: 8 })
  x.scale(Math.max(0.05, shut), 1)
  box(x, -150, -150, 300, 300, '#8a85a0', { b: 6, hi: '#a8a3bd' })
  for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2 + shut * 2; R(x, INK, Math.cos(a) * 70 - 8, Math.sin(a) * 70 - 8, 16, 16) }
  box(x, -30, -30, 60, 60, GOLD, { b: 5 })
  x.restore()
}
function chip(x, cx, cy, k, tag, lines, col) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const w = 860, h = 70 + lines.length * 52
  box(x, -w / 2, -h / 2, w, h, 'rgba(16,9,38,0.95)', { b: 6 })
  R(x, col, -w / 2, -h / 2, w, 8)
  x.font = '700 24px Space Mono'
  const tw = x.measureText(tag).width + 28
  R(x, col, -w / 2 + 24, -h / 2 + 22, tw, 34); ink(x, tag, -w / 2 + 38, -h / 2 + 40, { size: 22, align: 'left' })
  lines.forEach((l, i) => ink(x, l, -w / 2 + 36, -h / 2 + 92 + i * 50, { size: 36, align: 'left', col: BONE, font: 'Inter', weight: 800 }))
  x.restore()
}
function calendar(x, t, u, cx, cy) {
  box(x, cx - 300, cy - 250, 600, 500, BONE, { b: 8 })
  R(x, '#2e5f5a', cx - 300, cy - 250, 600, 80); ink(x, 'DECEMBER', cx, cy - 210, { size: 36, col: BONE })
  for (let j = 0; j < 5; j++) for (let i = 0; i < 7; i++) {
    const X = cx - 280 + i * 80, Y = cy - 150 + j * 76
    R(x, '#d9cdb5', X, Y, 72, 68)
    const n = j * 7 + i
    if (n % 3 === 0 && u > 0.4 + n * 0.02) R(x, ['#5fb8ff', '#9fe6b0', GOLD][n % 9 === 0 ? 2 : (n % 2)], X + 8, Y + 30, 56, 14)
  }
}
function blanket(x, cx, cy, w, k) { if (k <= 0.01) return; x.save(); x.translate(cx, cy); x.scale(1, k); box(x, -w / 2, -40, w, 110, '#9fd3c7', { b: 6, hi: '#c4e8e0' }); for (let i = 0; i < 5; i++) R(x, '#e9f7f3', -w / 2 + 24 + i * (w - 48) / 5, 0, 22, 22); x.restore() }

const EP = makeTakeover({
  id: 'ncape01', host: 'cap', duration: 30, dy: 120,
  hook: {
    text: 'Sag hands Cap | the *keys.*', dur: 2.6, accent: SAG,
    draw(x, t, S) {
      floor(x, 1260)
      shadow(x, 240, 1255, 220); shadow(x, 800, 1255, 240)
      S.star(x, t, 'sagittarius', { x: 240, y: 1080, s: 240, mood: 'happy', look: [1, -1], squash: -0.06, hops: [0.15] })
      S.host(x, t, { x: 800, y: 1070, s: 260, mood: 'neutral', look: [-0.5, 1], hops: [0.85] })
      planner(x, 660, 1120, -0.15)
      const p = clamp(prog(t, -0.3, 0.85))
      const kx = lerp(240, 800, p), ky = lerp(900, 780, p) - 300 * Math.sin(Math.PI * p)
      keyring(x, kx, ky, 1.1, t < 0.85 ? t * 8 : 0.3 * Math.sin(t * 6) * Math.exp(-(t - 0.85) * 2))
      sparkles(x, t, 800, 800, 0.85, 8, 120, 1)
    },
    cues: [['whoosh', 0, 0.8, 0.04], ['pluck', 0.85, 2637, 0.03, 0.3, 0.4], ['pluck', 0.92, 3135.96, 0.025, 0.3, 0.4], ['tick', 0.86, 0.06]],
  },
  beats: [
    { dur: 6.0, head: 'The *password.*',
      draw(x, t, S) {
        const { u } = S
        floor(x, 1260)
        const vk = pop01(t, S.t0 + 2.6, 0.35, 2)
        if (vk > 0.01) { x.save(); x.translate(540, 760); x.scale(vk * 0.8, vk * 0.8); vault(x, 0, 0, clamp(prog(u, 2.9, 3.2))); x.restore() }
        shadow(x, 240, 1255, 220); shadow(x, 800, 1255, 240)
        S.star(x, t, 'sagittarius', { x: 240, y: 1080, s: 240, mood: u < 3.2 ? 'happy' : 'wide', look: [1, 0], hops: [S.t0 + 0.4, S.t0 + 0.8, S.t0 + 3.2] })
        S.host(x, t, { x: 800, y: 1070, s: 260, mood: u < 2.5 ? 'neutral' : 'squint', look: [-1, 0], hops: [S.t0 + 2.55, S.t0 + 3.2] })
        keyring(x, 900, 880, 0.7, 0.2 * Math.sin(t * 2))
      },
      says: [
        { at: 0.4, until: 2.5, text: "the password is 'adventure'.", x: 300, y: 840, who: 'sagittarius', tail: -0.3 },
        { at: 2.55, text: "it's now in a vault.", x: 820, y: 930, who: 'host', tail: 0.2 },
      ],
      pis: { x: 950, y: 1690, s: 115 },
      cues: [['pop', 2.6, 659.25, 0.04, 0], ['whoosh', 2.9, 0.25, 0.04], ['boom', 3.2, 0.25], ['tom', 3.2, 80, { gain: 0.25, decay: 0.3 }], ['tick', 3.25, 0.08], ['tick', 3.4, 0.05], ['tick', 3.55, 0.05]],
    },
    { dur: 6.0, head: 'Capricorn season | starts at the *solstice.*', size: 76, accentSize: 104,
      draw(x, t, S) {
        const { u } = S
        // a long dark night: the horizon, a low sun gone, the moon riding high
        R(x, 'rgba(5,4,12,0.35)', 0, 0, 1080, 1920)
        floor(x, 1260, '#14102a', '#221a44')
        x.fillStyle = '#fff1c8'; x.beginPath(); x.arc(855, 505, 38, 0, Math.PI * 2); x.fill(); x.fillStyle = '#1a1438'; x.beginPath(); x.arc(872, 495, 34, 0, Math.PI * 2); x.fill()
        glow(x, 850, 505, 200, 0.18, '255,241,200')
        chip(x, t, 0, 0, 0, '', [], GOLD)
        chip(x, 540, 690, pop01(t, S.t0 + 0.5, 0.35, 2), 'ASTROLOGY SAYS', ['Capricorn season begins', 'at the December solstice.'], '#9fd3c7')
        chip(x, 540, 950, pop01(t, S.t0 + 2.4, 0.35, 2), 'SKY FACT', ['the longest night of the year,', 'north of the equator.'], GOLD)
        shadow(x, 760, 1255, 230)
        S.host(x, t, { x: 760, y: 1110, s: 220, mood: 'happy', look: [-1, -1], hops: [S.t0 + 0.5, S.t0 + 2.4] })
        S.star(x, t, 'sagittarius', { x: 300, y: 1140, s: 180, mood: u > 3.5 ? 'sleepy' : 'neutral', look: [1, -1], zzz: u > 3.5 })
      },
      pis: { x: 950, y: 1690, s: 120 },
      cues: [['pop', 0.5, 880, 0.04, 0], ['bell', 0.55, 1760, 0.025, 1.0, 0], ['pop', 2.4, 987.77, 0.04, 0], ['bell', 2.45, 2093, 0.025, 1.0, 0]],
    },
    { dur: 6.4, head: "Cap's *first* post:",
      draw(x, t, S) {
        const { u } = S
        floor(x, 1260)
        const ck = pop01(t, S.t0 + 0.2, 0.4, 1.8)
        x.save(); x.translate(540, 630); x.scale(ck * 0.8, ck * 0.8); calendar(x, t, u, 0, 0); x.restore()
        const tuck = ease.inOutCubic(prog(u, 2.6, 3.4))
        shadow(x, 330, 1255, 230)
        S.star(x, t, 'sagittarius', { x: 330, y: 1120, s: 220, mood: u < 1.6 ? 'happy' : u < 2.4 ? 'squint' : 'sleepy', look: [1, -1], squash: u > 1.6 && u < 2.3 ? -0.1 * Math.sin((u - 1.6) * 4.5) : 0, hops: [S.t0 + 3.6] })
        blanket(x, 330, 1190, 300, tuck)
        S.host(x, t, { x: lerp(800, 560, tuck), y: 1090, s: 240, mood: u < 2.6 ? 'neutral' : 'happy', look: [-1, 0.5], hops: [S.t0 + 2.6, S.t0 + 3.4] })
        hearts(x, t, S.t0 + 3.5, 330, 1000, { n: 4, cols: ['#9fd3c7', '#c58bff', GOLD] })
      },
      says: [{ at: 3.8, text: "night, Cap. they're all yours.", x: 330, y: 930, who: 'sagittarius', tail: 0, size: 32 }],
      pis: { x: 950, y: 1690, s: 135, tears: 3 },
      cues: [['whoosh', 0.2, 0.4, 0.03], ['pluck', 1.6, 392, 0.03, 1.0, -0.3], ['whoosh', 2.6, 0.6, 0.02], ['bell', 3.4, 1318.51, 0.03, 1.2, -0.2]],
    },
  ],
  last: { who: 'host', text: 'Longest night. *Earliest* bedtime.' },
  finale(x, t, S) {
    const { ok } = S
    shadow(x, 360, 1120, 220 * ok); shadow(x, 700, 1120, 240 * ok)
    S.star(x, t, 'sagittarius', { x: 360, y: 950, s: 220, pop: ok, mood: 'sleepy', look: [0, 0] })
    blanket(x, 360, 1010, 300 * ok, 1)
    S.host(x, t, { x: 700, y: 920, s: 260, pop: ok, mood: 'happy', look: [-1, 0], hops: [S.t0 + 0.1, ...S.LAST_HOPS] })
    keyring(x, 860, 730, 0.8 * ok, 0.2 * Math.sin(t * 2))
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [RED]
