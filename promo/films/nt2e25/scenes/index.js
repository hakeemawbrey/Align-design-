// nt2e25 · THE BARE MINIMUM · "Aquarius Gets a Good Morning" (20 s vertical, Trends Vol. 2 ep 25, music: funk · Bb).
// The format lives in ../../nt2e21/scenes/barekit.js (eps 21–25) on ../../nt2e21/scenes/trendkit.js.
//   0.0   hook: "They did the *bare minimum.* | (I'm an Aquarius.)" ♒ mid-leap beside its whiteboard.
//   2.1   1 "they said *good morning.*"  ♐ hops the floor-level bar: "good morning!"  A statue rises, plaque
//         GOOD MORNING: "commissioning a statue."
//   4.85  2 "they *didn't* cancel."  ♐: "still on for tonight!"  The whiteboard: THEORY #1: LOVE??  "this changes
//         everything."
//   7.6   card cut. 3 "then THE STARS *raised the bar.*"  Sagittarius clears the high bar: "tell me your theory. i've
//         got all night."  Aquarius, quiet: "all… night?"
//   11.45 stamp "NEW *STANDARD.*"  12.0 THE STARS: "Curiosity is the *raised* bar."  Pisces: THEORY #2!, fountaining.
import { makeBare } from '../../nt2e21/scenes/barekit.js'
import { statueProp, whiteboardProp, pop01, outK, prog, ease } from '../../nt2e21/scenes/trendkit.js'

const EP = makeBare({
  id: 'nt2e25', sign: 'aquarius', date: 'sagittarius', deep: '#1a7a9a', accent: '#38c4ec',
  hookDraw(x, t) { whiteboardProp(x, 200, 640, 250, 150, 'GOOD|MORNING??', { size: 32 }) },
  beats: [
    { caption: 'they said *good morning.*', gesture: 'good morning!', reply: 'commissioning a statue.',
      draw(x, t, S) {
        if (S.under) return
        const k = pop01(t, S.a + 1.2, 0.4, 2) * outK(t, [S.b - 0.15, S.b])
        if (k > 0.01) { const r = ease.outCubic(prog(t, S.a + 1.2, S.a + 1.8)); x.save(); x.beginPath(); x.rect(600, 200, 480, 400); x.clip(); statueProp(x, 860, 640 - 170 * r, 'GOOD MORNING', { s: 0.9 }); x.restore() }
      },
      cues: [['riser', 1.2, 1.8, 0.015], ['bell', 1.85, 1567.98, 0.03, 1, 0.4]] },
    { caption: 'they *didn’t* cancel.', gesture: 'still on for tonight!', reply: 'this changes everything.',
      draw(x, t, S) {
        if (S.under) return
        const k = pop01(t, S.a + 1.15, 0.35, 2) * outK(t, [S.b - 0.15, S.b])
        if (k > 0.01) { x.save(); x.translate(820, 460); x.scale(k, k); whiteboardProp(x, 0, 0, 300, 170, 'THEORY #1:|LOVE??', { k: prog(t, S.a + 1.3, S.a + 2.0), size: 38 }); x.restore() }
      },
      cues: [['tick', 1.35, 0.03], ['tick', 1.5, 0.03], ['tick', 1.65, 0.03], ['tick', 1.8, 0.03]] },
    { caption: 'then THE STARS *raised the bar.*', gesture: 'tell me your theory. i’ve got all night.', gestureSize: 28, reply: 'all… night?' },
  ],
  last: 'Curiosity is the *raised* bar.',
  pisCard: 'THEORY #2!',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
