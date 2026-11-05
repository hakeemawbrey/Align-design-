// kfbe15: FIRST DATE BINGO E15, "Video call first date" (vertical, star_talk post, music: house · Am).
// No end card, no card transition; hard cut on the last line.
//   0.0   frame 0: a two-tile video call; ♊ Gemini frozen mid-laugh, smeared into pixel streaks; the dauber mid-slam
//         on FROZEN MID-LAUGH. Hook: "First date. | *Video call.* Of course."  0.35 glitch: "CALL.EXE is unstable"
//   2.4   ♐ Sagittarius talks with the mute icon on: "YOU'RE ON MUTE" (3.0) · 3.6 "can you hear me now?"
//   4.6   Sag's cat walks across the keyboard: "kkkkkkkkk" floods the chat → A CAT WALKS ON THE KEYBOARD (5.2)
//   6.0   the signal drops to one bar, the picture goes blocky, and they both keep laughing → KEPT LAUGHING ANYWAY
//         (7.4) → BINGO (7.65) · 8.6 the host cries at its own screen · 9.2 "Bad signal. | *Good connection.*"
import { makeBingo, star, label, shadow, hearts, drawBits, R, box, glow, prog, lerp, ease, outK, pop01, inK, win01, r3, HK, INK, BONE, GOLD, RED, INTER, MONO } from '../../kfbe01/scenes/bingokit.js'

const D = 12.0
const T = { glitch: 0.35, thaw: 1.3, mute: [2.4, 3.6], s1: 3.0, cat: [4.4, 5.6], s2: 5.2, drop: 6.0, s3: 7.4, bingo: 7.65, sob: 8.6, last: 9.2 }
const GL = { at: T.glitch, len: 0.9, text: 'CALL.EXE is unstable', buttons: ['WAIT', 'WAIT'] }
const L = { x: 70, y: 470, w: 450, h: 560 }, Rt = { x: 560, y: 470, w: 450, h: 560 }

function tile(x, t, P, name, bg, bars, fn) {
  box(x, P.x, P.y, P.w, P.h, bg, { b: 8 })
  x.save(); x.beginPath(); x.rect(P.x, P.y, P.w, P.h); x.clip(); fn(); x.restore()
  // name + signal bars
  R(x, 'rgba(6,4,18,0.7)', P.x + 14, P.y + P.h - 58, 220, 44)
  x.font = `800 24px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText(name, P.x + 28, P.y + P.h - 36)
  for (let i = 0; i < 4; i++) R(x, i < bars ? '#7dffb0' : 'rgba(255,255,255,0.2)', P.x + P.w - 80 + i * 16, P.y + 40 - i * 8, 10, 14 + i * 8)
}
function room(x, P, wall, lamp) { R(x, wall, P.x, P.y, P.w, P.h); R(x, 'rgba(0,0,0,0.2)', P.x, P.y + P.h * 0.72, P.w, P.h * 0.28); if (lamp) { glow(x, P.x + 70, P.y + 120, 160, 0.25); box(x, P.x + 40, P.y + 90, 60, 40, '#ffe9a8', { b: 5 }) } }

const EP = makeBingo({
  id: 'kfbe15', D, n: 3, ink: '#7a5af0', cardTag: '♊ × ♐',
  squares: [
    { text: 'FROZEN MID-LAUGH', at: -0.04 }, { text: 'CAMERA ONLY SHOWS FOREHEAD' }, { text: 'A CAT WALKS ON THE KEYBOARD', at: T.s2 },
    { text: '"YOU’RE ON MUTE"', at: T.s1 }, { free: true }, { text: 'TALK AT THE SAME TIME' },
    { text: 'KEPT LAUGHING ANYWAY', at: T.s3 }, { text: 'A PLANT DOING ALL THE WORK' }, { text: 'TOUR OF THE FRIDGE' },
  ],
  win: [0, 3, 6], bingoAt: T.bingo,
  hook: { text: 'First date. | *Video call.* Of course.', out: [2.2, 2.4], accentColor: '#a890ff' },
  heads: [{ text: 'Bad signal. | *Good connection.*', at: T.last, accent: '#a890ff', late: 2, lateAt: T.last + 0.4, wobble: true }],
  effects: [[HK.glitch, HK.glitchCues, GL]],
  host: { x: 940, y: 1080, s: 110 },
  scene(x, t) {
    R(x, '#120d26', 0, 430, 1080, 760)
    const low = t > T.drop
    const frozen = t < T.thaw
    // Gemini's tile
    tile(x, t, L, '♊ GEMINI', '#2a2048', low ? 1 : 4, () => {
      room(x, L, '#3a2e5a', true)
      const gm = frozen ? 'happy' : t > T.mute[0] && t < T.mute[1] ? 'wide' : 'happy'
      const gy = L.y + 330
      star(x, frozen ? 1.0 : t, 'gemini', { x: L.x + L.w / 2, y: gy, s: 260, mood: gm, look: undefined, hops: [T.s1, T.s2 + 0.2, T.drop + 0.4, T.drop + 0.8, T.s3], seed: 5, glyph: false })
      if (frozen) for (let i = 0; i < 9; i++) R(x, ['#ffe27a', '#ffd23a', '#fff3a0'][i % 3], L.x + L.w / 2 + 40 + i * 14, gy - 100 + i * 22, 180 - i * 12, 14)
      if (low) { x.save(); x.globalAlpha = 0.5; for (let j = 0; j < 7; j++) for (let i = 0; i < 6; i++) R(x, (i + j) % 2 ? 'rgba(255,226,122,0.25)' : 'rgba(58,46,90,0.25)', L.x + i * 75, L.y + j * 80, 75, 80); x.restore() }
    })
    // Sag's tile
    tile(x, t, Rt, '♐ SAGITTARIUS', '#2a2048', low ? 1 : 3, () => {
      room(x, Rt, '#2e3a5a', false)
      const sm = t > T.mute[0] && t < T.mute[1] ? 'happy' : t > T.cat[0] && t < T.s2 + 0.4 ? 'wide' : 'happy'
      star(x, t, 'sagittarius', { x: Rt.x + Rt.w / 2, y: Rt.y + 330, s: 250, mood: sm, hops: t > T.mute[0] && t < T.mute[1] ? [2.5, 2.8, 3.1, 3.4] : [T.mute[1], T.drop + 0.5, T.drop + 0.9], seed: 9, glyph: false })
      // the cat strolls across the bottom of the frame
      const cp = prog(t, ...T.cat)
      if (cp > 0 && cp < 1) drawBits(x, ['K...K....', 'KK.KK....', 'KKKKK...K', '.KKKKKKKK', '.KKKKKKK.', '.K.K.K.K.'], { K: '#f0a050' }, lerp(Rt.x + Rt.w + 80, Rt.x - 80, cp), Rt.y + 470, 14)
      if (low) { x.save(); x.globalAlpha = 0.5; for (let j = 0; j < 7; j++) for (let i = 0; i < 6; i++) R(x, (i + j) % 2 ? 'rgba(200,140,255,0.25)' : 'rgba(46,58,90,0.25)', Rt.x + i * 75, Rt.y + j * 80, 75, 80); x.restore() }
    })
    // mute icon on Sag
    if (t > T.mute[0] && t < T.mute[1]) { const k = pop01(t, T.mute[0], 0.25, 2.4); x.save(); x.translate(Rt.x + 60, Rt.y + 60); x.scale(k, k); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 36, 0, Math.PI * 2); x.fill(); x.fillStyle = RED; x.beginPath(); x.arc(0, 0, 30, 0, Math.PI * 2); x.fill(); R(x, '#fff', -8, -18, 16, 26); R(x, '#fff', -20, 14, 40, 5); x.save(); x.rotate(0.8); R(x, '#fff', -3, -30, 6, 60); x.restore(); x.restore() }
    // the "kkkk" chat flood
    const kk = win01(t, T.cat[0] + 0.3, T.drop, 0.15)
    if (kk > 0.01) { x.save(); x.globalAlpha = kk; box(x, 100, 900, 780, 70, BONE, { b: 6 }); x.font = `700 34px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('k'.repeat(Math.min(33, Math.floor((t - T.cat[0] - 0.3) * 30))), 120, 937); x.restore() }
    if (low) label(x, 'POOR CONNECTION', 540, 445, { size: 30, col: '#ff6177', font: MONO, alpha: win01(t, T.drop, T.last, 0.2) })
    if (t > T.s3) hearts(x, t, T.s3, 540, 760, { n: 6 })
  },
  bubbles: [
    { t0: T.mute[0] + 0.4, t1: T.mute[1], x: 300, y: 560, text: 'you’re on mute!', size: 40, tail: 0 },
    { t0: T.mute[1], t1: T.cat[0], x: 780, y: 560, text: 'can you hear me now?', size: 34, tail: 0 },
    { t0: T.drop + 0.3, t1: T.last - 0.1, x: 540, y: 1000, text: 'HAHAHA wait you froze again', size: 34, tail: 0 },
    { t0: T.sob, t1: D + 1, x: 820, y: 990, text: 'I’M CRYING AT MY SCREEN', size: 26, tail: 0.5, col: '#cfe8ff' },
  ],
  cues: [['tick', T.thaw, 0.05], ['pop', T.mute[1], 1174.66, 0.035, 0.3], ...Array.from({ length: 10 }, (_, i) => ['tick', r3(T.cat[0] + 0.3 + i * 0.07), 0.025]), ['pluck', T.drop, 293.66, 0.04, 0.6, 0], ['pop', T.drop + 0.4, 1318.51, 0.03, 0], ['pop', T.drop + 0.6, 1567.98, 0.03, 0]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [shadow, lerp, ease, outK, inK, GOLD]
