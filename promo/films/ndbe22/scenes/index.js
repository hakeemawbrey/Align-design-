// ndbe22: DEALBREAKER OR NOT? E22, "They cancel plans | *every* time." (15 s vertical trial reel, music: screwed · Dm).
//   0.0–3.9   frame 0: an outdoor ice rink under string lights; ♑ Capricorn mid-wave by the rail, two pairs of skates in
//             hand. 0.8 its phone buzzes: "can't tonight, sorry!!" (the grey date). 1.6 a calendar pops up: three dates
//             already crossed out, a fourth X lands. 2.6 Capricorn hangs the second pair of skates on a hook.
//   3.9 the vote · 6.1 the stamp: DEALBREAKER. + "ADDED TO MY DEALBREAKERS".
//   finale    Capricorn on the ice with ♉ Taurus and ♌ Leo, who showed up; all three gliding, happy; hearts.
//             THE STARS: "Show up, or *say so.* Both are kind."
import { makeDeal, R, box, bubble, label, hearts, sparkles, glow, phoneProp, drawStarChar, signStar, drawBits, prog, lerp, ease, clamp, pop01, outK, INK, BONE, GOLD, PINK, RED, T } from '../../ndbe01/scenes/dealkit.js'

function rink(x, t) {
  R(x, INK, 0, 1044, 1080, 8); R(x, '#cfe8ff', 0, 1050, 1080, 370); R(x, '#e8f4ff', 0, 1050, 1080, 40)
  for (let i = 0; i < 5; i++) R(x, 'rgba(255,255,255,0.6)', (i * 230 + 40) % 1080, 1120 + (i % 3) * 70, 140, 6)
  box(x, 0, 970, 1080, 18, '#8a5a3c', { b: 5 }); for (let i = 0; i < 9; i++) R(x, INK, 40 + i * 125, 988, 12, 60)
  for (let i = 0; i < 12; i++) { const lx = 40 + i * 92, ly = 470 + 26 * Math.sin(i / 11 * Math.PI); R(x, INK, lx - 9, ly + 4, 18, 22); R(x, ['#ffd23a', '#ff8fb1', '#7fd0ff', '#9fe6b0'][i % 4], lx - 5, ly + 8, 10, 14) }
}
function skates(x, cx, cy, s = 1, col = BONE) { x.save(); x.translate(cx, cy); x.scale(s, s); for (const d of [-26, 26]) { box(x, d - 18, -40, 36, 50, col, { b: 4 }); R(x, INK, d - 26, 12, 52, 6); R(x, '#c8d0e0', d - 24, 14, 48, 3) } R(x, INK, -30, -50, 60, 4); x.restore() }
function calendar(x, cx, cy, k, xs) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -170, -120, 340, 240, BONE, { b: 7 }); R(x, RED, -170, -120, 340, 40)
  x.font = "800 24px Inter, sans-serif"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#fff'; x.fillText('PLANS', 0, -100)
  for (let i = 0; i < 8; i++) { const gx = -120 + (i % 4) * 80, gy = -40 + Math.floor(i / 4) * 80; R(x, '#d8d4e8', gx - 30, gy - 30, 60, 60) }
  xs.forEach((a, i) => { if (a <= 0) return; const gx = -120 + ([1, 2, 3, 5][i] % 4) * 80, gy = -40 + Math.floor([1, 2, 3, 5][i] / 4) * 80; x.save(); x.translate(gx, gy); x.scale(a, a); x.fillStyle = RED; x.rotate(0.785); x.fillRect(-34, -6, 68, 12); x.rotate(-1.57); x.fillRect(-34, -6, 68, 12); x.restore() })
  x.restore()
}
const BUZZ = 0.8, CAL = 1.6, X4 = 2.1, HANG = 2.6
const EP = makeDeal({
  id: 'ndbe22', sign: 'capricorn', date: 'grey', verdict: 'deal', accent: '#9fd8f6', voteMood: 'neutral',
  hook: 'They cancel plans | *every* time.',
  last: 'Show up, or *say so.* Both are kind.',
  scene(x, t, S) {
    const { u, hero } = S
    rink(x, t)
    hero(x, t, { x: 330, y: 880, s: 250, mood: u > BUZZ + 0.3 ? 'neutral' : 'happy', look: u > BUZZ ? [1, 0.5] : [0, 0], hops: [-0.2, BUZZ + 0.05, HANG] })
    skates(x, 200, 1000, 1.1)
    if (u < HANG) skates(x, 460, 1000, 1.1, '#ffd6e0')
    else { const p = ease.outCubic(prog(u, HANG, HANG + 0.4)); R(x, INK, 860, 760, 40, 14); skates(x, lerp(460, 880, p), lerp(1000, 820, p), 1.1, '#ffd6e0') }
    const buzz = u > BUZZ && u < BUZZ + 0.5 ? 6 * Math.sin(u * 80) : 0
    phoneProp(x, 520 + buzz, 780, 0.38, 0.1, p => { R(p, '#9a94b0', 20, 30, 50, 50); R(p, BONE, 20, 100, 160, 60) })
    bubble(x, t, 640, 600, BUZZ, 3.85, "can't tonight, sorry!!", { size: 32, col: '#e0dcef', tail: -0.4 })
    calendar(x, 790, 820, pop01(t, CAL, 0.3, 2.2) * outK(t, [HANG - 0.1, HANG + 0.1]), [1, 1, 1, pop01(t, X4, 0.2, 3)])
    label(x, '…', 330, 650, { size: 70, col: BONE, alpha: prog(u, HANG + 0.4, HANG + 0.6) })
  },
  sceneCues: [['tick', BUZZ, 0.05], ['tick', BUZZ + 0.1, 0.05], ['tick', BUZZ + 0.2, 0.05], ['pop', BUZZ + 0.05, 523.25, 0.045, 0.3], ['pop', CAL, 739.99, 0.04, 0.3], ['tom', X4, 90, { gain: 0.2, decay: 0.25 }], ['whoosh', HANG, 0.3, 0.025], ['pluck', HANG + 0.4, 220, 0.04, 0.8, 0]],
  pis: { x: 960, y: 1320, s: 130 },
  finale(x, t, S) {
    const { u, k, hero } = S
    rink(x, t)
    if (k <= 0.01) return
    const g = (ph, amp) => amp * Math.sin(u * 1.6 + ph)
    drawStarChar(x, 200 + g(0, 40), 900, 210, t, { ...signStar('taurus'), pop: k, mood: 'happy', look: [1, 0], seed: 71 })
    hero(x, t, { x: 540 + g(1, 40), y: 880, s: 240, pop: k, mood: u > 1.0 ? 'sparkle' : 'happy', look: [0, 0], hops: [T.stamp + 1.0] })
    drawStarChar(x, 870 + g(2, 40), 900, 210, t, { ...signStar('leo'), pop: k, mood: 'happy', look: [-1, 0], seed: 72 })
    for (let i = 0; i < 3; i++) R(x, 'rgba(255,255,255,0.7)', [200, 540, 870][i] + g(i, 40) - 80, 1060 + i * 6, 120, 5)
    hearts(x, t, T.stamp + 1.1, 540, 760, { n: 5 })
    sparkles(x, t, 540, 860, T.stamp + 1.0, 10, 200, 1, [GOLD, PINK, BONE])
    void [drawBits, clamp]
  },
  finaleCues: [['glitter', 1.0, 1.4], ['pluck', 1.1, 1174.66, 0.04, 0.5, 0]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
