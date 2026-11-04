// nvse20: SIGN VS SIGN, "Who handles a change of plans better?" ♉ Taurus vs ♒ Aquarius (16 s trial reel, b46,
// music: pop · F). Story 0–13.6, then the short end card. Format: ../../nvse01/scenes/versuskit.js.
//   hook: a plan card flips over and over between them.
//   ROUND 1 ♉ "had the night *mapped out.*" TONIGHT: pasta, then it's crossed out. "but… the pasta." → "ok. pasta tomorrow."
//   ROUND 2 ♒ "loves *any* new plan, instantly." NEW PLAN?, confetti, then question marks. "new plan? I live for new plans." → "…what is the new plan?"
//   VERDICT "TAURUS. | *Said how it felt.*" (pasta tomorrow).  THE STARS: "It's okay to be thrown. Say so, then roll with it."
import { makeVersus, paper, drawProp, questions, pop01, SW, T, RED } from '../../nvse01/scenes/versuskit.js'

const EP = makeVersus({
  id: 'nvse20', a: 'taurus', b: 'aquarius', accent: '#9fe6b0',
  hook: 'Who handles | a *change of plans* better?',
  hookMoods: ['wide', 'sparkle'],
  hookDraw(x, t) { const c = Math.cos(t * 3); x.save(); x.translate(540, 650); x.scale(Math.max(0.05, Math.abs(c)), 1); paper(x, 0, 0, 190, 120, { title: c > 0 ? 'PLAN A' : 'PLAN ?', titleSize: 30 }); x.restore() },
  rounds: [
    {
      caption: 'had the night *mapped out.*', deep: '#2f8a5a',
      set: 'room', tint: '#2a1f3a',
      moods: ['wide', 'happy'], fx: ['hearts'],
      hero: { x: 790, y: 1000, s: 260 },
      draw(x, t, S) {
        paper(x, 320, 760, 420, 300, { title: 'TONIGHT', lines: ['7:00 pasta', '7:45 more pasta', '8:30 dessert'], size: 30, k: pop01(t, S.t0 + 0.1), rot: -0.04, strike: S.u > 1.2 ? [0, 1, 2] : [], accent: RED })
        drawProp(x, 'pasta', 320, 1020, 10)
        if (S.u > SW) paper(x, 320, 1100, 280, 70, { lines: ['→ tomorrow ♥'], align: 'center', size: 28, k: pop01(t, S.sw + 0.1), rot: 0.05, col: '#fff1c8' })
      },
      bubbles: ['but… the pasta.', 'ok. pasta tomorrow.'],
      bubblePos: [[760, 620, 0.2], [760, 730, 0.2]],
      cues: [['tick', 1.2, 0.07], ['pluck', 1.3, 330, 0.03, 0.6, 0], ['pop', 1.86, 1174.66, 0.04, -0.3]],
    },
    {
      caption: 'loves *any* new plan, instantly.', deep: '#2a7ab0',
      set: 'room', tint: '#1f2f4a',
      moods: ['sparkle', 'wide'], fx: ['confetti', 'questions'],
      hero: { x: 540, y: 990, s: 280 },
      draw(x, t, S) { paper(x, 540, 560, 420, 110, { title: 'NEW PLAN?', titleSize: 56, k: pop01(t, S.t0 + 0.2, 0.3, 2.6), rot: -0.03 }) },
      bubbles: ['new plan? I live for new plans.', '…what is the new plan?'],
      bubblePos: [[540, 700, 0], [540, 800, 0]],
      cues: [['pop', 0.22, 1567.98, 0.045, 0]],
    },
  ],
  verdict: {
    who: 'a', text: 'TAURUS. | *Said how it felt.*', late: 4,
    draw(x, t, S) { const k = pop01(t, T.crown + 0.5, 0.3, 2.2) * S.ok; if (k > 0.01) drawProp(x, 'pasta', 280, 1110, 8 * k) },
  },
  last: 'It’s okay to be thrown. Say so, then roll with it.',
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
void [questions, SW]
