// nt2e15: SOFT LAUNCH vs HARD LAUNCH: the nickname (20 s vertical, Trends Vol. 2 format 3; row in
// promo/films/next30/b11.md; music house · Eb). Format look: ../../nt2e11/scenes/launchkit.js.
//   0.0        hook (frame 0): "Capricorn: *the nickname*", the split screen, Capricorn mid-think with a notepad.
//   2.1        SOFT: "hey… you." Virgo: "…hi?"
//   5.6        HARD: a cake rolls in, iced "MY SWEETPEA", candles; Virgo blinks.
//   9.1        card cut · THE REAL LAUNCH: Capricorn puts the notepad away and just asks: "what do you like to be
//              called?" Virgo: "just my name. said like that." Both blush.
//   12.75      THE STARS: "Ask what they *want* to be called."
import { makeLaunch, starOf, box, R, bubble, label, hearts, shadow, sparkles, pop01, prog, ease, lerp, INK, BONE, GOLD, PINK, INTER, MONO } from '../../nt2e11/scenes/launchkit.js'

const CAP = starOf('capricorn', 3, 1.1), VIR = starOf('virgo', 9)

function notepad(x, cx, cy, lines, k = 1, rot = 0.1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  box(x, -80, -100, 160, 200, '#fff1a8', { b: 6 }); for (let i = 0; i < 5; i++) R(x, '#d8c66a', -64, -64 + i * 34, 128, 3)
  x.font = `700 20px ${MONO}`; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, -62, -76 + i * 34))
  x.restore()
}
function cake(x, cx, cy, t, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -150, -40, 300, 110, '#ffc0d2', { b: 7 }); R(x, BONE, -150, -40, 300, 22)
  for (let i = -120; i <= 120; i += 40) R(x, BONE, i, -18, 14, 16)
  box(x, -200, 70, 400, 18, '#eef0f8', { b: 5 })
  x.font = `800 30px ${INTER}`; x.fillStyle = '#c0284a'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MY SWEETPEA', 0, 28)
  for (const c of [-80, 0, 80]) { R(x, INK, c - 7, -96, 14, 58); R(x, '#7fd0ff', c - 4, -92, 8, 52); R(x, GOLD, c - 5, -114 - 4 * Math.sin(t * 14 + c), 10, 16) }
  x.restore()
}

const EP = makeLaunch({
  id: 'nt2e15', sign: 'capricorn', name: 'Capricorn', topic: 'the nickname', accent: '#2fc79a',
  hook(x, t) { notepad(x, 760, 900, ['babe?', 'love?', 'pal?'], 1, 0.1 + 0.05 * Math.sin(t * 3)) },
  soft: { caption: 'soft: *“hey… you”*',
    draw(x, t, S) {
      CAP(x, t, { x: 170, y: 960, s: 160, mood: 'neutral', look: [1, 0], hops: [S.t0 + 0.4] })
      VIR(x, t, { x: 400, y: 960, s: 150, mood: S.u > 1.4 ? 'wide' : 'neutral', look: [-1, 0], hops: [S.t0 + 1.4] })
      bubble(x, t, 210, 740, S.t0 + 0.4, S.t0 + 1.5, 'hey… you.', { size: 30 })
      bubble(x, t, 380, 760, S.t0 + 1.5, S.t1, '…hi?', { size: 30, col: '#c9f2d4' })
    },
    cues: [['pop', 0.4, 659.25, 0.03, -0.4], ['pop', 1.5, 587.33, 0.03, -0.3]] },
  hard: { caption: 'hard: *a nickname* on a cake',
    draw(x, t, S) {
      const roll = ease.outCubic(prog(S.u, 0.2, 0.8))
      cake(x, lerp(1200, 800, roll), 760, t, 1)
      sparkles(x, t, 800, 700, S.t0 + 0.82, 8, 180, 2)
      CAP(x, t, { x: 680, y: 1060, s: 150, mood: 'sparkle', look: [1, -0.4], hops: [S.t0 + 0.85, S.t0 + 1.3] })
      VIR(x, t, { x: 930, y: 1060, s: 140, mood: S.u > 1.2 ? 'wide' : 'neutral', look: [-1, -0.4] })
      if (S.u > 1.5) label(x, 'blink.', 930, 940, { size: 28, col: BONE })
    },
    cues: [['whoosh', 0.2, 0.6, 0.03], ['pop', 0.82, 1318.51, 0.045, 0.4], ['glitter', 0.85, 1.3], ['tick', 1.5, 0.05]] },
  real: { caption: '',
    draw(x, t, S) {
      shadow(x, 400, 1120, 200); shadow(x, 680, 1120, 200)
      CAP(x, t, { x: 400, y: 960, s: 200, mood: S.u > 2.0 ? 'happy' : 'neutral', look: [1, 0], hops: [S.t0 + 0.4, S.t0 + 2.0], blush: S.u > 2.0 ? 1 : 0 })
      VIR(x, t, { x: 680, y: 960, s: 200, mood: S.u > 1.5 ? 'happy' : 'sparkle', look: [-1, 0], hops: [S.t0 + 1.5], blush: S.u > 1.5 ? 1 : 0 })
      notepad(x, lerp(400, 200, ease.inCubic(prog(S.u, 0.1, 0.5))), lerp(780, 1300, ease.inCubic(prog(S.u, 0.1, 0.5))), ['babe?', 'love?', 'pal?'], 1 - prog(S.u, 0.4, 0.5), 0.4)
      bubble(x, t, 400, 690, S.t0 + 0.5, S.t0 + 1.6, 'what do you like to be called?', { size: 28 })
      bubble(x, t, 640, 690, S.t0 + 1.6, S.t1, 'just my name. said like that.', { size: 28, col: '#c9f2d4' })
      hearts(x, t, S.t0 + 2.05, 540, 820, { n: 7 })
    },
    cues: [['whoosh', 0.1, 0.4, 0.02], ['pop', 0.5, 880, 0.03, -0.2], ['pop', 1.6, 1174.66, 0.035, 0.3], ['pluck', 2.05, 1318.51, 0.04, 0, 0.3], ['pluck', 2.17, 1567.98, 0.035, 0, 0.3]] },
  last: 'Ask what they *want* to be called.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK]
