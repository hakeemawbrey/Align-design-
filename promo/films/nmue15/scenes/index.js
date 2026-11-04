// nmue15: THE MAKE-UP TALK, "Keep the point, drop the edge" (28 s vertical, promo/films/next30/b32.md, music: lofi · Eb).
// ♈ Aries × ♋ Cancer. The format lives in ../../nmue13/scenes/makeupkit.js (shared by nmue13–nmue24).
//   0–6.6     THE FIGHT  "“I was *right!*” | (I was also yelling.)" Aries mid-stomp behind a megaphone; Cancer hides behind a
//             cushion: "YOU FORGOT MY MOM'S DINNER!" / "you don't have to SHOUT." / "I'M NOT SHOUTING!"
//   6.6–12.8  UNDER IT   "The point got lost | in the *spikes.*" The message flies over as a spiky red parcel; Cancer catches
//             only the spikes (OUCH); a cutaway shows the actual point inside: "the dinner matters to me."
//   12.8–21.6 THE TALK   "Keep the point. | Sorry for *the tone.*" TRY SAYING "I'm sorry I yelled. The dinner still matters
//             to me." Cancer: "that I can hear. I'm sorry I forgot."
//   21.6–25.5 MADE UP    the parcel comes back soft and pink and opens on a little heart; the megaphone is put away.
//             "Keep the point. | *Drop* the edge."
import { makeMakeUp, R, box, ink, label, glow, sparkles, drawBits, HEART, inSprite, starFrame, pop01, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, PINK, MONO, INTER } from '../../nmue13/scenes/makeupkit.js'

function megaphone(x, cx, cy, rot, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-50, -34); x.lineTo(70, -80); x.lineTo(70, 80); x.lineTo(-50, 34); x.closePath(); x.fill()
  x.fillStyle = '#ff7a3a'; x.beginPath(); x.moveTo(-42, -26); x.lineTo(62, -70); x.lineTo(62, 70); x.lineTo(-42, 26); x.closePath(); x.fill()
  box(x, -80, -22, 34, 44, BONE, { b: 6 }); R(x, INK, -70, 22, 14, 40)
  x.restore()
}
function cushion(x, F) {
  inSprite(x, F, () => { x.fillStyle = INK; x.fillRect(5.5, 19.5, 25, 14); x.fillStyle = '#ffb3c8'; x.fillRect(6, 20, 24, 13); x.fillStyle = '#ffd6e2'; x.fillRect(6, 20, 24, 3); x.fillStyle = INK; x.fillRect(17.5, 25.5, 1, 1) })
}
// the parcel: spiky (the tone) or soft (the point)
function parcel(x, t, cx, cy, s, { spiky = 1, open = 0, rot = 0 } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  if (spiky > 0) {
    x.fillStyle = INK
    for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + 0.2; x.save(); x.rotate(a); x.beginPath(); x.moveTo(-22, -70); x.lineTo(0, -70 - 60 * spiky); x.lineTo(22, -70); x.fill(); x.restore() }
    x.fillStyle = '#ff4f5e'
    for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + 0.2; x.save(); x.rotate(a); x.beginPath(); x.moveTo(-15, -66); x.lineTo(0, -66 - 50 * spiky); x.lineTo(15, -66); x.fill(); x.restore() }
  }
  const col = spiky > 0 ? '#e8344e' : '#ffb3c8'
  box(x, -80, -70 + open * -40, 160, 140, col, { b: 8, hi: 'rgba(255,255,255,0.18)' })
  R(x, spiky > 0 ? '#ffd23a' : BONE, -10, -70 + open * -40, 20, 140)
  x.restore()
}

const EP = makeMakeUp({
  id: 'nmue15', a: 'aries', b: 'cancer',
  hook: '“I was *right!*” | (I was also yelling.)', hookColor: '#ff6b5e',
  fight: {
    lines: [['a', "YOU FORGOT MY MOM'S DINNER!"], ['b', "you don't have to SHOUT."], ['a', "I'M NOT SHOUTING!"]],
    bubbleAt: [[400, 860], [760, 750], [330, 640]],
    posA: { x: 240, y: 1130, s: 270 }, posB: { x: 830, y: 1150, s: 240 },
    moods: { a: 'squint', b: 'wide' },
    noSquiggle: true,
    front(x, t) {
      megaphone(x, 430, 1090 + 6 * Math.sin(t * 18), -0.08)
      for (let i = 0; i < 3; i++) { const p = ((t * 1.6 + i / 3) % 1); x.save(); x.globalAlpha = 1 - p; x.strokeStyle = '#ff7a3a'; x.lineWidth = 8; x.beginPath(); x.arc(500, 1090, 40 + p * 140, -0.6, 0.6); x.stroke(); x.restore() }
      cushion(x, starFrame(830, 1150, 240, t, { seed: 7 }))
    },
    cues: [['whoosh', 0.1, 0.4, 0.02], ['whoosh', 2.0, 0.4, 0.02], ['whoosh', 4.0, 0.4, 0.02]],
  },
  under: {
    head: 'The point got lost | in the *spikes.*', color: '#ff7a6b',
    draw(x, t, S) {
      const { u, drawA, drawB } = S
      drawA(x, t, { x: 170, y: 1250, s: 200, mood: 'squint', look: [1, -0.3], hops: [S.t0 + 0.3] })
      drawB(x, t, { x: 900, y: 1250, s: 200, mood: u > 1.6 ? 'wide' : 'neutral', look: [-1, -0.3], hops: [S.t0 + 1.62, S.t0 + 1.9] })
      const fly = ease.inOutCubic(prog(u, 0.3, 1.6))
      const px = lerp(260, 820, fly), py = lerp(1080, 1060, fly) - Math.sin(Math.PI * fly) * 380
      if (u < 2.4) parcel(x, t, px, py, 0.9, { rot: fly * 6 })
      if (u > 1.6 && u < 2.6) label(x, 'OUCH!', 880, 960, { size: 56, col: '#ff4f5e', font: INTER, weight: 800, rot: 0.15 })
      // the cutaway: what was inside the whole time
      const ck = easeOutBack(prog(u, 2.5, 2.9), 2.2)
      if (ck > 0.01) {
        x.save(); x.translate(540, 760); x.scale(ck, ck)
        parcel(x, t, 0, 60, 1.25, { spiky: 0.5, open: 1 })
        box(x, -250, -170, 500, 130, '#fff8e6', { b: 7 })
        ink(x, 'the dinner', 0, -128, { size: 46, col: INK }); ink(x, 'matters to me.', 0, -80, { size: 46, col: INK })
        x.restore()
        label(x, 'the actual point ↑', 540, 1010, { size: 32, col: GOLD, alpha: clamp(prog(u, 3.0, 3.3)) })
        sparkles(x, t, 540, 640, S.t0 + 2.7, 10, 280, 1, [GOLD, BONE, PINK])
      }
    },
    pis: { x: 960, y: 1660, s: 120 },
    cues: [['whoosh', 0.3, 1.3, 0.04], ['tom', 1.6, 100, { gain: 0.3, decay: 0.25 }], ['tick', 1.6, 0.08], ['pop', 2.55, 880, 0.045, 0], ['bell', 2.7, 1318.51, 0.03, 1.0, 0], ['glitter', 2.7, 3.1]],
  },
  talk: {
    head: 'Keep the point. | Sorry for *the tone.*', color: '#ffb3c8',
    stars: 'you can keep the point and still say sorry for the *tone.*',
    script: 'I’m sorry I yelled. The dinner *still matters* to me.',
    reply: ['b', "that I can hear. *I'm sorry I forgot.*"],
  },
  made: {
    front(x, t, S) {
      const k = pop01(t, S.t0 + 0.3, 0.35, 2.2) * S.ok, open = ease.outBack(prog(t, S.t0 + 1.2, S.t0 + 1.6))
      if (k > 0.01) {
        parcel(x, t, 540, 1450, 0.8 * k, { spiky: 0, open })
        if (open > 0.3) drawBits(x, HEART, { H: '#ff5c8a' }, 540, 1330 - 30 * open, 12 * open * k)
        sparkles(x, t, 540, 1320, S.t0 + 1.3, 10, 170, 1, [PINK, GOLD, BONE])
      }
      megaphone(x, 150, 1560, -1.4, 0.7 * S.ok)
      label(x, 'put away', 150, 1460, { size: 32, col: BONE, alpha: S.ok * 0.8 })
    },
    cues: [['pop', 0.3, 659.25, 0.04, 0], ['pop', 1.2, 987.77, 0.04, 0], ['pluck', 1.3, 1318.51, 0.04, 0.8, 0], ['glitter', 1.3, 1.7]],
  },
  last: 'Keep the point. | *Drop* the edge.', lastColor: '#ffb3c8',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [glow, MONO]
