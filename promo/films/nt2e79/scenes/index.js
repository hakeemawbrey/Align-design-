// nt2e79: LITTLE TREAT, "Little Treat: Gemini focused" (20 s vertical, Star Talk Trends Vol. 2 ep 79,
// promo/films/next30/b14.md; music: chiptune · F). Story 0–15.6, then the shared end card. Format: ../../nt2e76/scenes/treat.js.
//   0.0–2.1    hook (frame 0): "Little treat for | *paying attention.*"  Gemini juggling five chat bubbles.
//   2.1–4.85   WIN 1 "kept *one* conversation going (not five)."  Four bubbles drop away; Gemini turns to Sagittarius.
//              → a donut.
//   4.85–7.6   WIN 2 "remembered their *dog's* name."  A little pixel dog trots in; Gemini: "BISCUIT!" → a lollipop.
//   7.6        card cut.
//   7.6–10.95  WIN 3 (the twist) "asked a talk card question and heard the *whole* answer."  The card: "What's something
//              that made you brave?" Sag talks… and talks; Gemini nods the whole way. → a sundae.
//   11.35      the stamp "TREAT *EARNED.*"  Pisces holds up a 10/10, fountaining.
//   11.95      THE STARS: "Focus looks *cute* on you."
import { makeTreat, FLOOR, R, box, bubble, label, shadow, sparkles, hearts, drawBits, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, INTER, SERIF, MONO, T } from '../../nt2e76/scenes/treat.js'

const DOG = ['E....E..', 'EE..EE..', '.BBBB...', 'BKBBKB..', 'BBNNBB..', '.BBBB.BT', '.BBBBBBT', '.BBBBBB.', '.L.L.L.L']
function dog(x, t, cx, cy, s = 18) { drawBits(x, DOG, { E: '#a06a3a', B: '#e8b070', K: INK, N: '#5a3420', T: '#e8b070', L: '#a06a3a' }, cx, cy + 4 * Math.abs(Math.sin(t * 8)), s) }
function chatBubble(x, cx, cy, col, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -60, -36, 120, 72, col, { b: 5 }); R(x, INK, -30, 36, 14, 14)
  for (let i = 0; i < 3; i++) R(x, INK, -34 + i * 26, -6, 14, 14)
  x.restore()
}
const COLS = ['#7fd0ff', '#ff8fb1', '#9fe6b0', '#ffd23f', '#c9a6ff']
function juggle(x, t, cx, cy, n, drop = 0) {
  for (let i = 0; i < 5; i++) {
    const a = t * 3 + i * (Math.PI * 2 / 5)
    let bx = cx + Math.cos(a) * 230, by = cy - 120 + Math.sin(a) * 110
    if (i >= n) { by += drop * 900; bx += (i - 2) * drop * 80 }
    chatBubble(x, bx, by, COLS[i], i >= n ? 1 - drop : 1)
  }
}
function talkCard(x, t, cx, cy, k, lines) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  box(x, -230, -130, 460, 260, '#1e1540', { b: 8 }); x.strokeStyle = GOLD; x.lineWidth = 4; x.strokeRect(-212, -112, 424, 224)
  x.font = `700 22px ${MONO}`; x.fillStyle = GOLD; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TALK CARD', 0, -82)
  x.font = `italic 500 42px ${SERIF}`; x.fillStyle = BONE; lines.forEach((l, i) => x.fillText(l, 0, -20 + i * 50))
  x.restore()
}

const tells = [
  { caption: 'kept *one* conversation going (not five).', treat: 'donut',
    draw(x, t, S) {
      const { u, hero, date } = S
      const drop = ease.inCubic(prog(u, 0.2, 0.9))
      shadow(x, 330, FLOOR + 30, 200); shadow(x, 780, FLOOR + 30, 190)
      hero(x, t, { x: 330, y: 1000, s: 230, mood: u > 0.9 ? 'sparkle' : 'wide', look: u > 0.9 ? [1, 0] : [0, -1], hops: [S.t0 + 0.9] })
      juggle(x, t, 330, 960, 1, drop)
      date(x, t, { x: 780, y: 1010, s: 210, mood: u > 1.0 ? 'happy' : 'neutral', look: [-1, 0], hops: [S.t0 + 1.0, S.t0 + 1.3] })
    },
    treatPos: [560, 560], pis: { x: 960, y: 1660 },
    cues: [['whoosh', 0.2, 0.7, 0.03], ['tick', 0.6, 0.04], ['tick', 0.7, 0.04], ['tick', 0.8, 0.04], ['tick', 0.9, 0.04], ['pop', 1.0, 987.77, 0.03, 0.3]] },
  { caption: 'remembered their *dog’s* name.', treat: 'lollipop',
    draw(x, t, S) {
      const { u, hero, date } = S
      shadow(x, 300, FLOOR + 30, 200); shadow(x, 800, FLOOR + 30, 190)
      date(x, t, { x: 800, y: 1010, s: 210, mood: 'happy', look: [-1, 0.4], hops: [S.t0 + 0.3] })
      dog(x, t, lerp(1200, 590, ease.outCubic(prog(u, 0.1, 0.8))), 1110, 18)
      bubble(x, t, 780, 780, S.t0 + 0.4, S.t0 + 1.1, 'this is my dog—', { size: 32, tail: 0.1 })
      hero(x, t, { x: 300, y: 1000, s: 230, mood: u > 1.0 ? 'sparkle' : 'neutral', look: [1, 0.4], squash: u > 1.0 && u < 1.2 ? -0.1 : 0, hops: [S.t0 + 1.05, S.t0 + 1.35] })
      bubble(x, t, 320, 760, S.t0 + 1.1, S.t1, 'BISCUIT!', { size: 48, tail: 0 })
    },
    treatPos: [560, 560], pis: { x: 120, y: 1660, look: [1, -0.6] },
    cues: [['pop', 0.4, 880, 0.03, 0.3], ['pop', 1.1, 1567.98, 0.045, -0.3], ['pop', 1.2, 1760, 0.03, 0.3]] },
  { caption: 'asked a talk card question and heard the *whole* answer.', treat: 'sundae', treatAt: 2.05, stickerSize: 44,
    draw(x, t, S) {
      const { u, hero, date } = S
      shadow(x, 300, FLOOR + 30, 200); shadow(x, 780, FLOOR + 30, 200)
      talkCard(x, t, 540, 640, 1.25 * pop01(t, S.t0 + 0.2, 0.3, 2.2) * outK(t, [S.t0 + 1.85, S.t0 + 2.0]), ['What’s something', 'that made you brave?'])
      date(x, t, { x: 780, y: 1000, s: 220, mood: 'happy', look: [-1, 0], hops: Array.from({ length: 8 }, (_, i) => S.t0 + 0.6 + i * 0.25) })
      if (u > 0.6) for (let i = 0; i < 3; i++) { const ph = (t * 1.5 + i / 3) % 1; x.save(); x.globalAlpha = 1 - ph; label(x, '…', 820 + ph * 40, 830 - ph * 90 - i * 10, { size: 50, font: INTER, weight: 800 }); x.restore() }
      const nod = Math.sin(u * 9)
      hero(x, t, { x: 300, y: 1000 + 6 * nod, s: 220, mood: u > 2.0 ? 'heart' : 'sparkle', look: [1, 0.2 + 0.4 * nod], hops: [S.t0 + 2.05] })
    },
    treatPos: [540, 600], pis: { x: 960, y: 1660 },
    cues: [['pop', 0.2, 1174.66, 0.04, 0], ['glitter', 0.25, 0.7], ...Array.from({ length: 6 }, (_, i) => ['pop', 0.6 + i * 0.25, 880 + (i % 3) * 110, 0.018, 0.3])] },
]

const EP = makeTreat({
  id: 'nt2e79', sign: 'gemini', name: 'Gemini', date: 'sagittarius', deep: '#b0487a', accent: '#ffd23f',
  hookText: 'Little treat for | *paying attention.*',
  hook(x, t, S) {
    shadow(x, 540, FLOOR + 30, 240)
    S.hero(x, t, { x: 540, y: 1010, s: 260, mood: 'wide', look: [Math.sin(t * 3), -1], hops: [0.2, 0.6, 1.0, 1.4, 1.8] })
    juggle(x, t, 540, 980, 5)
  },
  hookCues: [['pop', 0.2, 880, 0.02, -0.3], ['pop', 0.6, 987.77, 0.02, 0.3], ['pop', 1.0, 1174.66, 0.02, -0.3], ['pop', 1.4, 987.77, 0.02, 0.3]],
  tells,
  finale(x, t, S) {
    const { hero, date, ok, HERO_FIN_HOPS } = S
    hero(x, t, { x: 420, y: 700, s: 230, pop: ok, mood: 'sparkle', look: [1, 0], hops: HERO_FIN_HOPS })
    date(x, t, { x: 680, y: 710, s: 210, pop: ok, mood: 'happy', look: [-1, 0], hops: [T.stamp + 0.1, T.last + 1.7] })
    dog(x, t, 880, 1100, 12)
  },
  last: 'Focus looks *cute* on you.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [sparkles, hearts, clamp, PINK, RED]
