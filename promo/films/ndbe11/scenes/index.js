// ndbe11: DEALBREAKER OR NOT? E11, "They read your phone | over your *shoulder.*" (15 s vertical trial reel, screwed · Ebm).
//   0.0–3.9   frame 0: ♒ Aquarius mid-text on a park bench under a streetlight; the grey date (no sign) leaning in behind,
//             eyes on the screen. 1.4 the date: "who's THAT?" 2.3 Aquarius turns the phone face down; 2.7 "hey. that's
//             mine." — the date shrinks back.
//   3.9 the vote · 6.1 the stamp: DEALBREAKER. + "ADDED TO MY DEALBREAKERS".
//   finale    Aquarius alone on the bench, snow falling, phone in its lap, at ease with a cocoa; a little sparkle of calm.
//             THE STARS: "Trust doesn't *peek.*"
import { makeDeal, R, box, bubble, hearts, sparkles, snowfall, snowGround, glow, phoneProp, prog, lerp, ease, clamp, pop01, outK, INK, BONE, GOLD, T } from '../../ndbe01/scenes/dealkit.js'
import { mug } from '../../ndbe01/scenes/index.js'

function bench(x, cx, y) { box(x, cx - 260, y - 120, 520, 30, '#8a5a3c', { b: 6 }); box(x, cx - 260, y, 520, 30, '#8a5a3c', { b: 6, hi: '#a87452' }); R(x, INK, cx - 230, y + 30, 18, 1150 - y - 30); R(x, INK, cx + 212, y + 30, 18, 1150 - y - 30) }
function streetlight(x, t, cx) { R(x, INK, cx - 10, 560, 20, 590); box(x, cx - 40, 530, 80, 40, '#4a4466', { b: 5 }); glow(x, cx, 600, 320, 0.22, '255,230,170'); R(x, '#fff1c8', cx - 30, 566, 60, 10) }
const SAY = 1.4, FLIP = 2.3, MINE = 2.7
const msgs = p => { R(p, '#7fd0ff', 20, 40, 130, 34); R(p, BONE, 50, 90, 130, 34); R(p, '#7fd0ff', 20, 140, 110, 34) }
const EP = makeDeal({
  id: 'ndbe11', sign: 'aquarius', date: 'grey', verdict: 'deal', accent: '#7fd0ff', voteMood: 'neutral',
  hook: 'They read your phone | over your *shoulder.*',
  last: "Trust doesn't *peek.*",
  scene(x, t, S) {
    const { u, hero, date } = S
    snowGround(x, 1150)
    streetlight(x, t, 900)
    bench(x, 460, 1020)
    // the date leans in behind
    const back = ease.outCubic(prog(u, MINE, MINE + 0.4))
    date(x, t, { x: lerp(560, 700, back), y: lerp(760, 800, back), s: 230, mood: u > MINE ? 'wide' : 'squint', look: u > MINE ? [-1, 0] : [-1, 1], hops: [SAY, MINE + 0.05] })
    hero(x, t, { x: 380, y: 900, s: 250, mood: u > FLIP ? 'neutral' : 'happy', look: u > SAY && u < FLIP ? [1, -0.6] : [0.5, 0.8], hops: [FLIP, MINE] })
    const fl = ease.inOutCubic(prog(u, FLIP, FLIP + 0.25))
    x.save(); x.translate(500, 960); x.scale(1, Math.abs(1 - 2 * fl) || 0.02); x.translate(-500, -960)
    phoneProp(x, 500, 960, 0.42, -0.1, fl < 0.5 ? msgs : null, { col: fl < 0.5 ? '#2a2148' : '#6a4fb0' })
    x.restore()
    bubble(x, t, 700, 580, SAY, MINE + 0.3, "who's THAT?", { size: 40, tail: -0.2 })
    bubble(x, t, 330, 640, MINE, 3.85, "hey. that's mine.", { size: 36, tail: 0.1 })
    snowfall(x, t, { top: 380, bottom: 1150, n: 30 })
  },
  sceneCues: [['tick', 0.1, 0.03], ['tick', 0.3, 0.03], ['tick', 0.5, 0.03], ['pop', SAY, 523.25, 0.045, 0.3], ['whoosh', FLIP, 0.25, 0.03], ['tick', FLIP + 0.25, 0.07], ['pop', MINE, 739.99, 0.04, -0.3]],
  pis: { x: 960, y: 1320, s: 130 },
  finale(x, t, S) {
    const { u, k, hero } = S
    snowGround(x, 1150)
    if (k <= 0.01) return
    streetlight(x, t, 900)
    bench(x, 460, 1020)
    hero(x, t, { x: 460, y: 900, s: 250, pop: k, mood: u > 1.0 ? 'happy' : 'neutral', look: [0, -0.5], hops: [T.stamp + 1.0] })
    mug(x, t, 600, 960, 1.3 * k)
    phoneProp(x, 300, 990, 0.3 * k, 1.4, null, { col: '#6a4fb0' })
    snowfall(x, t, { top: 620, bottom: 1150, n: 30 })
    sparkles(x, t, 460, 860, T.stamp + 1.0, 10, 170, 1, ['#7fd0ff', GOLD, BONE])
    void hearts
  },
  finaleCues: [['bell', 1.0, 1760, 0.025, 1.0, 0], ['glitter', 1.0, 1.4]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [clamp, pop01, outK]
