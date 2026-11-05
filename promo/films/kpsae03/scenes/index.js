// kpsae03 · Planet Talk: Saturn · "Saturn vs Gemini's Four Maybes" (22 s vertical, loop) · pop · G
//   0      Saturn spiralling in; its ring spinning round Gemini like a slot reel, four phones flying out of its hands.
//          "GEMINI. | Pick *one.* Today."  · ~0.4 the landing: flash, shake, whip zoom
//   0.7    ♄ "four plans. *one* Saturday." · 2.8 four chats, four "maybe!" · 3.9 ♊ "I keep my *options* open!"
//   6.0    the commitment form: ONE box · ♄ "one box. *one.*" · 8.2 Gemini ticks it twice and draws a second box
//   9.8    ♄ "showing up beats *keeping options.*" · 12.3 three chats fade · ♊ "the besties asked *first.*"
//   14.7   Pisces the intern, sobbing: "you *CHOSE!!*" · 16.8 ♄ "…see? that felt *good.*"
//   18.8   ♊ "One plan. *Two* outfits. Deal." · 21.55 eases back into the frame-0 spin (loop)
import { saFilm, HK } from '../../kpsae01/sakit.js'
import { prog, ease, lerp, clamp } from '../../../src/lib.js'

const D = 22
const FORM = [6.0, 9.75]
const CHATS = [
  { name: 'the besties', msg: 'you coming sat?', hx: 230, hy: 860 },
  { name: 'work crew', msg: 'trivia night sat?', hx: 850, hy: 860 },
  { name: 'cousin', msg: 'help me move sat?', hx: 230, hy: 1620 },
  { name: 'gym buddy', msg: 'sat 7am run?', hx: 850, hy: 1620 },
]
const CAUGHT = { at: 9.0, X: 471, Y: 929, r: 100, out: 9.75 }
const F = saFilm({
  id: 'kpsae03', sign: 'gemini', dur: D, ending: 'loop',
  hook: 'GEMINI.|Pick *one.* Today.', hookY: 200, hookSize: 96, hookOut: 1.6,
  arrive: { kind: 'spin', at: -0.6, x: 540, y: 470, size: 380 },
  shots: [{ at: 0, cam: [1, 540, 960] }, { at: 8.1, cam: [1.25, 640, 820] }, { at: 9.8, cam: [1, 540, 960] }],
  shakes: [8.9],
  says: [
    { t0: 1.65, t1: 3.7, who: 'saturn', text: 'four plans. *one* Saturday.', x: 540, y: 185 },
    { t0: 3.9, t1: 5.8, who: 'gemini', text: 'I keep my *options* open!', x: 540, y: 1840, tailUp: true },
    { t0: 6.2, t1: 7.9, who: 'saturn', text: 'one box. *one.*', x: 320, y: 330 },
    { t0: 9.8, t1: 12.1, who: 'saturn', text: 'showing up beats *keeping options.*', x: 540, y: 185 },
    { t0: 12.5, t1: 14.5, who: 'gemini', text: 'the besties asked *first.*', x: 540, y: 1840, tailUp: true },
    { t0: 14.7, t1: 16.6, who: 'pisces', text: 'you *CHOSE!!*', x: 760, y: 1480, tail: 120 },
    { t0: 16.8, t1: 18.6, who: 'saturn', text: '…see? that felt *good.*', x: 540, y: 185 },
    { t0: 18.8, t1: 21.45, who: 'gemini', text: 'One plan. *Two* outfits. Deal.', x: 540, y: 1840, tailUp: true, size: 48 },
  ],
  paint(x, t, K) {
    K.drawSpace(x, t, { planet: 'saturn', seed: 3 })
    // the stage floor
    x.fillStyle = '#241743'; x.fillRect(0, 1500, 1080, 420)
    // Gemini, centre, mid-spin at frame 0
    const spin = 1 - ease.outCubic(prog(t, -0.6, 0.8))
    const gMood = t < 3.8 ? 'wide' : t < 8.1 ? 'happy' : t < 9.8 ? 'wink' : t < 12.3 ? 'neutral' : t < 14.6 ? 'squint' : 'happy'
    K.sign(x, t, 'gemini', { x: 540, y: 1260, s: 300, mood: gMood, rot: 0.5 * Math.sin(t * 12) * spin, look: t < 12.3 ? [0, -1] : [-1, -0.4], squash: -0.1 * spin, sweat: t > 8.6 && t < 9.8 })
    // the four phones: flying out of its hands at frame 0, then settled round it with "maybe!"
    const fade = i => i === 0 ? 1 : 1 - ease.inQuad(prog(t, 12.3, 12.8))
    CHATS.forEach((c, i) => {
      const fly = ease.outBack ? ease.outCubic(prog(t, -0.5 + i * 0.05, 0.9)) : 0
      const a = i * Math.PI / 2 + t * 6 * (1 - fly)
      const X = lerp(540 + Math.cos(a) * 200, c.hx, fly), Y = lerp(1260 + Math.sin(a) * 160, c.hy, fly)
      const k = fade(i)
      if (k <= 0.01) return
      x.save(); x.globalAlpha *= k; x.translate(X, Y); x.rotate((1 - fly) * a * 0.3 + (i % 2 ? 0.05 : -0.05))
      K.rrect(x, -150, -170, 300, 340, 36, K.INK); K.rrect(x, -140, -160, 280, 320, 30, '#1a1236')
      K.txt(x, c.name, 0, -120, { size: 22, color: K.BONE })
      K.rrect(x, -120, -80, 240, 56, 18, '#efe6d6'); K.txt(x, c.msg, 0, -52, { size: 19, color: K.INK })
      const mk = K.pop01(t, 2.8 + i * 0.22, 0.3)
      if (mk > 0.01) { x.save(); x.translate(40, 40); x.scale(mk, mk); K.rrect(x, -90, -28, 180, 56, 18, K.PINK); K.txt(x, 'maybe!', 0, 0, { size: 26, color: K.INK }); x.restore() }
      if (i === 0 && t > 13.0) { const sk = K.pop01(t, 13.0, 0.3); x.save(); x.translate(0, 110); x.scale(sk, sk); K.rrect(x, -110, -28, 220, 56, 18, '#7dffb0'); K.txt(x, "I'm in. for real.", 0, 0, { size: 20, color: K.INK }); x.restore() }
      x.restore()
    })
    // the ring: a slot reel round Gemini at frame 0, then back onto Saturn
    const P = K.pose(t), sr = P.size / 2
    const back = ease.inOutCubic(prog(t, 1.2, 1.8))
    const ringOn = back >= 1
    const sMood = t < 3.8 ? 'angry' : t < 8.1 ? 'neutral' : t < 9.8 ? 'wide' : t < 14.6 ? 'neutral' : 'happy'
    K.arriving(x, t, { mood: sMood, look: [0, 1], rings: ringOn })
    if (!ringOn) {
      const wob = Math.sin(t * 20) * 0.25 * (1 - back)
      K.ring(x, lerp(540, P.x, back), lerp(1260, P.y, back), lerp(260, 1.85 * sr, back), lerp(90 + 60 * Math.abs(Math.sin(t * 9)), 0.42 * sr, back), { rot: lerp(wob, -0.32, back), w: 0.25, t, spin: 4 })
    }
    // the commitment form Saturn holds
    const fk = K.inOut(t, FORM[0], FORM[1])
    if (fk > 0.01) {
      x.save(); x.translate(700, 760); x.rotate(0.05); x.scale(fk, fk)
      K.box(x, -170, -200, 340, 400, '#fffaf0', { o: 6 })
      K.txt(x, 'COMMITMENT FORM', 0, -160, { size: 24, color: K.INK })
      K.rect(x, -140, -135, 280, 4, K.INK)
      const box = (bx, by, drawn) => { x.strokeStyle = K.INK; x.lineWidth = drawn ? 5 : 7; x.strokeRect(bx, by, 50, 50) }
      box(-140, -90, false); K.txt(x, "I'll be there", 30, -64, { size: 22, color: K.INK })
      const tick = (bx, by, at) => { const p = prog(t, at, at + 0.2); if (p <= 0) return; x.strokeStyle = '#2aa86a'; x.lineWidth = 9; x.lineCap = 'round'; x.beginPath(); x.moveTo(bx + 8, by + 26); x.lineTo(bx + 20, by + 40); if (p > 0.5) x.lineTo(bx + 20 + 30 * (p - 0.5) * 2, by + 40 - 40 * (p - 0.5) * 2); x.stroke() }
      tick(-140, -90, 8.2); tick(-128, -98, 8.5)
      // the hand-drawn second box
      const dp = prog(t, 8.8, 9.2)
      if (dp > 0) { x.save(); x.strokeStyle = '#ff6fa8'; x.lineWidth = 5; x.setLineDash([180 * dp, 400]); x.strokeRect(-140, 10, 50, 50); x.restore(); if (dp >= 1) K.txt(x, 'also maybe', 30, 36, { size: 22, color: '#ff6fa8' }) }
      x.restore()
    }
    // Pisces the intern
    K.intern(x, t, { x: 930, y: 1350, s: 200, pop: K.pop01(t, 1.6, 0.4), tears: t > 14.6 ? 3 : 2, mood: t > 14.6 ? 'wide' : 'sparkle' })
  },
  over(x, t, K) { K.caught(x, t, CAUGHT) },
  cues: [
    ...[2.8, 3.02, 3.24, 3.46].map((t, i) => ['pop', t, [659.25, 783.99, 880, 1046.5][i], 0.04, 0]),
    ['whoosh', 1.2, 0.3, 0.04], ['pop', 1.8, 659.25, 0.05, 0],
    ['tick', 8.22, 0.06], ['tick', 8.52, 0.06], ['tick', 8.9, 0.04], ['tick', 9.0, 0.05],
    ['whoosh', 12.3, 0.3, 0.04], ['pop', 13.0, 987.77, 0.05, 0], ['glitter', 14.7, 16.0],
  ],
  music: { style: 'pop', key: 'G', seed: 7103, sections: { lift: [12.3] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
