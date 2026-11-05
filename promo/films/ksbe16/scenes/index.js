// ksbe16: SAY IT BETTER ep 16 (long), "The Dishes, Played Twice" (♍ Virgo and ♉ Taurus, the kitchen). house · F. Hard cut.
// One argument played twice (promo/films/ksbe01/scenes/sblong.js): ROUND 1 the bad way (a tower of dishes mid-topple at
// frame 0, "You NEVER do the dishes!", the DAMAGE meter fills, last summer gets dragged up, both stomp off, Pisces sobbing
// in the middle) → ◀◀ REWIND → ROUND 2 the better way ("Can we talk about the dishes? …", wash / dry, a chore chart,
// a talk card) → THE VERDICT: 2/10 vs 10/10.
import { makeLong } from '../../ksbe01/scenes/sblong.js'
import { rect, INK, BONE } from '../../ksbe01/scenes/sbkit.js'
import { prog, ease } from '../../../src/lib.js'
const PLATES = ['#efe6d6', '#7fd0f0', '#ff8fb1', '#efe6d6', '#f2c75c', '#9fe6b0', '#efe6d6']
const L = makeLong({
  ep: 16, room: 'kitchen',
  A: { sign: 'virgo' }, B: { sign: 'taurus' }, P: { x: 940, y: 820, s: 120, look: [-1, 1] },
  hook: 'Same fight, *twice.* | Wait for round two.',
  r1: [
    { who: 'A', text: 'You *never* do the dishes!' },
    { who: 'B', text: 'And *you* always nag!' },
    { who: 'A', text: 'I do *everything* here!' },
    { who: 'B', text: 'Like *last summer?* Really?' },
    { who: 'A', text: 'Forget it. *I’ll* do them.' },
  ],
  r1Caption: 'NOBODY WON.',
  r2: [
    { who: 'A', text: 'Hey, can we talk about the dishes? I feel like I’m doing most of it, and I’m *tired*.' },
    { who: 'B', text: 'You’re right. Honestly? I *hate* drying.', kind: 'better' },
    { who: 'A', text: 'I don’t mind drying. What if *you* wash, *I* dry?' },
    { who: 'B', text: 'Deal. And thanks for saying it *nicely*.', kind: 'better' },
    { who: 'A', text: 'chore chart? *with stickers?*', kind: 'say' },
  ],
  stars: ['the dishes were never the *fight*.', 'feeling *alone* in it was.'],
  starsAfter: 1,
  card: { text: 'What’s one chore you secretly don’t mind?', after: 3 },
  scores: ['2/10', '10/10'],
  last: 'Same sink. | *Kinder* words.',
  draw(x, w, K) {
    // the tower of dishes on the counter: mid-topple at frame 0, a neat rack in round 2
    const T = L ? L.TIMES : null
    const r2 = T && w >= T.R2 - 0.05
    if (!r2) {
      const tip = ease.inCubic(prog(w, -0.6, 0.9)) * 0.55
      PLATES.forEach((c, i) => { x.save(); x.translate(640 + Math.sin(tip * 3) * i * 14, 1004 - i * 26); x.rotate(tip * (i / 6)); rect(x, -70, -12, 140, 24, INK); rect(x, -64, -8, 128, 16, c); x.restore() })
    } else {
      rect(x, 560, 940, 200, 70, INK); for (let i = 0; i < 6; i++) { rect(x, 574 + i * 30, 900, 18, 100, INK); rect(x, 578 + i * 30, 904, 10, 92, PLATES[i]) }
      if (T && w > T.r2[2].at + 1.5) { // the chore chart on the fridge
        const k = ease.outBack(prog(w, T.r2[2].at + 1.5, T.r2[2].at + 1.9))
        x.save(); x.translate(945, 820); x.scale(k, k); rect(x, -80, -100, 160, 200, INK); rect(x, -72, -92, 144, 184, BONE)
        x.font = '800 22px Inter'; x.fillStyle = INK; x.textAlign = 'center'; x.fillText('WASH  ·  DRY', 0, -60)
        for (let j = 0; j < 4; j++) { rect(x, -50, -36 + j * 34, 22, 22, '#9fe6b0'); rect(x, 26, -36 + j * 34, 22, 22, '#ff8fb1') }
        x.restore()
      }
    }
  },
  keys: { P: [[0, { y: 820 }]] },
})
export const { DURATION, SCENES, CUES, TIMES } = L
