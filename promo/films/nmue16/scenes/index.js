// nmue16: THE MAKE-UP TALK, "Ask, don't accuse" (30 s vertical, promo/films/next30/b32.md, music: pop · D).
// ♌ Leo × ♑ Capricorn. The format lives in ../../nmue13/scenes/makeupkit.js (shared by nmue13–nmue24).
//   0–6.6     THE FIGHT  "“You *never* notice | anything!”" Leo mid-twirl in a new striped sweater; Capricorn behind a laptop:
//             "you NEVER notice anything!" / "that's not fair." / "NEVER!!"
//   6.6–12.8  UNDER IT   "What *“never”* | really means:" the words go into a pixel translator machine; it whirrs, shakes and
//             prints the real message: "I wanted you to see me."
//   12.8–21.6 THE TALK   "Ask. | Don’t *accuse.*" THE STARS: swap "you never" for "I'd love it if". TRY SAYING "I'd love it if
//             you told me when you like something." Capricorn: "I noticed. I didn't say it. it looks great."
//   21.6–25.5 MADE UP    the laptop shut, Capricorn says it again ("the stripes? perfect."), Leo glows and twirls.
//             "Say the wish, | not the *never*."
import { makeMakeUp, R, box, ink, label, glow, sparkles, bubble, inSprite, starFrame, pop01, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, PINK, MONO, INTER } from '../../nmue13/scenes/makeupkit.js'

const SWEATER = ['#7fd0ff', '#efe6d6']
function sweater(x, F) {
  inSprite(x, F, () => {
    x.fillStyle = INK; x.fillRect(9.5, 25.5, 17, 6)
    for (let j = 0; j < 3; j++) { x.fillStyle = SWEATER[j % 2]; x.fillRect(10, 26 + j * 1.7, 16, 1.7) }
  })
}
function laptop(x, cx, by, open = 1, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, by); x.scale(k, k)
  box(x, -130, -20, 260, 24, '#9aa6c8', { b: 6 })
  if (open > 0) { const h = 170 * open; box(x, -120, -20 - h, 240, h, '#2a2148', { b: 6 }); R(x, '#5a8ad8', -106, -8 - h, 212, h - 24); for (let i = 0; i < 4; i++) R(x, 'rgba(255,255,255,0.5)', -90, -h + 10 + i * 30, 120 + (i * 37) % 60, 8) }
  x.restore()
}
function machine(x, t, u) {
  const run = u > 1.2 && u < 2.9
  const sh = run ? 6 * Math.sin(t * 60) : 0
  x.save(); x.translate(540 + sh, 900)
  box(x, -260, -230, 520, 400, '#6b4fa8', { b: 9, hi: 'rgba(255,255,255,0.12)' })
  box(x, -200, -300, 140, 80, '#4a3680', { b: 7 })          // input chute
  R(x, INK, -190, -232, 120, 10)
  // gears
  for (const [gx, gy, r, d] of [[60, -100, 60, 1], [170, -20, 40, -1.5]]) {
    x.save(); x.translate(gx, gy); x.rotate((run ? t * 6 : 0.3) * d)
    for (let i = 0; i < 8; i++) { x.save(); x.rotate(i * Math.PI / 4); R(x, INK, -10, -r - 14, 20, 24); R(x, GOLD, -6, -r - 10, 12, 18); x.restore() }
    x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 4, 0, Math.PI * 2); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill(); R(x, INK, -8, -8, 16, 16)
    x.restore()
  }
  // dial + lights
  for (let i = 0; i < 4; i++) R(x, run && Math.floor(t * 8 + i) % 2 ? '#9fe6b0' : '#2a1f55', -220 + i * 46, 60, 30, 30)
  ink(x, 'TRANSLATOR', -130, 128, { size: 30, font: MONO, weight: 700, col: BONE })
  R(x, INK, -170, 170, 340, 16)     // output slot
  x.restore()
}

const EP = makeMakeUp({
  id: 'nmue16', a: 'leo', b: 'capricorn',
  hook: '“You *never* notice | anything!”', hookColor: '#ffb347',
  fight: {
    lines: [['a', 'you NEVER notice anything!'], ['b', "that's not fair."], ['a', 'NEVER!!']],
    bubbleAt: [[360, 860], [760, 750], [280, 640]],
    moods: { a: 'squint', b: 'wide' },
    front(x, t) {
      sweater(x, starFrame(285, 1130, 280, t, { hops: [-0.12, -0.3, 0.1, 3.9, 4.3], seed: 3 }))
      laptop(x, 795, 1420, 1, 0.75)
      sparkles(x, t, 285, 1100, -0.2, 8, 190, 1, [GOLD, BONE, '#7fd0ff'])
      label(x, 'NEW SWEATER', 285, 1340, { size: 26, col: '#7fd0ff' })
    },
    cues: [['glitter', 0.0, 0.3], ['tick', 1.1, 0.03], ['tick', 1.25, 0.03], ['tick', 1.4, 0.03]],
  },
  under: {
    head: 'What *“never”* | really means:', color: '#ffb347',
    draw(x, t, S) {
      const { u, drawA } = S
      machine(x, t, u)
      // the card going in
      const inK = ease.inCubic(prog(u, 0.4, 1.2))
      if (inK < 1) {
        x.save(); x.translate(lerp(250, 410, inK), lerp(500, 640, inK)); x.rotate(lerp(-0.2, 0, inK)); x.scale(1 - 0.5 * inK, 1 - 0.5 * inK)
        box(x, -170, -50, 340, 100, BONE, { b: 6 }); ink(x, 'YOU NEVER…', 0, 2, { size: 46, col: '#c0392b' })
        x.restore()
      }
      // the print-out
      const out = ease.outCubic(prog(u, 2.9, 3.5))
      if (out > 0) {
        x.save(); x.translate(540, 1070 + out * 170); x.rotate(0.02 * Math.sin(t * 2))
        box(x, -300, -60 * out, 600, 130 * out + 10, '#fff8e6', { b: 6 })
        if (out > 0.6) ink(x, 'I wanted you to see me.', 0, 10, { size: 42, col: INK, alpha: clamp(prog(out, 0.6, 1)) })
        x.restore()
        sparkles(x, t, 540, 1260, S.t0 + 3.4, 10, 300, 2, [GOLD, BONE, PINK])
      }
      drawA(x, t, { x: 170, y: 1460, s: 170, pop: pop01(t, S.t0 + 0.2, 0.3, 2), mood: u > 3.5 ? 'sparkle' : 'neutral', look: [1, -0.7], hops: [S.t0 + 3.6] })
      sweater(x, starFrame(170, 1460, 170, t, { hops: [S.t0 + 3.6], seed: 3 }))
    },
    cues: [['whoosh', 0.4, 0.8, 0.03], ['tick', 1.2, 0.06], ...Array.from({ length: 12 }, (_, i) => ['tick', +(1.3 + i * 0.13).toFixed(2), 0.025]), ['riser', 1.3, 2.9, 0.025], ['pop', 2.95, 880, 0.04, 0], ['bell', 3.45, 1760, 0.035, 1.0, 0], ['glitter', 3.4, 3.8]],
  },
  talk: {
    head: 'Ask. | Don’t *accuse.*', color: '#ffb347',
    stars: 'swap "you never" for "I\'d *love it* if."',
    script: 'I’d *love it* if you told me when you like something.',
    reply: ['b', "I noticed. I didn't say it. *it looks great.*"],
  },
  made: {
    draw(x, t, S) { x.save(); x.globalAlpha = S.ok; laptop(x, 900, 1300, 0, 0.8); x.restore(); glow(x, 410, 1060, 320, S.ok * clamp(prog(t, S.t0 + 0.8, S.t0 + 1.4)), '255,200,120') },
    front(x, t, S) {
      sweater(x, starFrame(410, 1060, 270 * S.ok, t, { hops: [S.t0 + 0.1, S.t0 + 1.6, S.t0 + 2.6], seed: 3 }))
      bubble(x, t, 720, 820, S.t0 + 0.6, S.t1, 'the stripes? perfect.', { size: 34, tail: -0.2 })
      sparkles(x, t, 410, 1040, S.t0 + 1.0, 10, 200, 1, [GOLD, BONE, '#7fd0ff'])
    },
    cues: [['pop', 0.6, 987.77, 0.04, 0.3], ['glitter', 1.0, 1.4], ['bell', 1.05, 2349.32, 0.02, 0.8, -0.2]],
  },
  last: 'Say the wish, | not the *never*.', lastColor: '#ffb347',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [INTER, easeOutBack]
