// nvse14: SIGN VS SIGN, "Who handles cooking together better?" ♉ Taurus vs ♍ Virgo (16 s trial reel, b46,
// music: funk · F). Story 0–13.6, then the short end card. Format: ../../nvse01/scenes/versuskit.js.
//   hook: one pot between them, steaming.
//   ROUND 1 ♉ "tastes *every single step.*" a spoon to the pot, then a block of butter. "for quality." → "more butter. trust me."
//   ROUND 2 ♍ "labels *every spice* mid-recipe." a row of labelled jars, 2 g. "two grams. TWO." → "oh. we’re having fun?"
//   VERDICT "BOTH. | *Ate well.*" two full bowls (and one slightly burnt bit).  THE STARS: "Cook together. Laugh at the burnt bit."
import { makeVersus, drawProp, label, paper, box, R, pop01, SW, T, BONE, INTER } from '../../nvse01/scenes/versuskit.js'

function steam(x, t, cx, cy) { for (let i = 0; i < 4; i++) { const p = ((t * 0.8 + i / 4) % 1); x.save(); x.globalAlpha = 0.5 * (1 - p); R(x, BONE, cx - 40 + i * 26 + 10 * Math.sin(t * 3 + i), cy - p * 160, 12, 22); x.restore() } }

const EP = makeVersus({
  id: 'nvse14', a: 'taurus', b: 'virgo', accent: '#ffe27a',
  hook: 'Who handles | *cooking together* better?',
  hookMoods: ['happy', 'neutral'],
  hookDraw(x, t) { steam(x, t, 540, 600); drawProp(x, 'pot', 540, 680, 11) },
  rounds: [
    {
      caption: 'tastes *every single step.*', deep: '#2f8a5a',
      set: 'kitchen',
      moods: ['happy', 'sparkle'], fx: ['hearts'],
      hero: { x: 360, y: 880, s: 260 },
      look: [1, 0.4],
      front(x, t, S) {
        steam(x, t, 720, 880); drawProp(x, 'pot', 720, 960, 12)
        const dip = Math.max(0, Math.sin(S.u * 5))
        box(x, 490 + 60 * dip, 900 + 30 * dip, 120, 12, '#c9b48a', { b: 4 })
        const k = pop01(t, S.sw + 0.1, 0.3, 2.4)
        if (k > 0.01) { x.save(); x.translate(860, 930); x.scale(k, k); box(x, -60, -26, 120, 52, '#ffe27a', { b: 6 }); x.font = `800 20px ${INTER}`; x.fillStyle = '#7a5a10'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BUTTER', 0, 2); x.restore() }
      },
      bubbles: ['for quality.', 'more butter. trust me.'],
      bubblePos: [[340, 600, 0], [700, 700, -0.3]],
      cues: [['pop', 0.6, 880, 0.03, 0], ['pop', 1.25, 880, 0.03, 0], ['pop', 1.86, 1174.66, 0.04, 0.3]],
    },
    {
      caption: 'labels *every spice* mid-recipe.', deep: '#a03a6a',
      set: 'kitchen',
      moods: ['squint', 'happy'], fx: ['sparkle'],
      hero: { x: 760, y: 880, s: 260 },
      look: [-1, 0.4],
      draw(x, t, S) {
        const L = ['SALT', 'PEPPER', '2 g', 'ZEST']
        L.forEach((l, i) => { const k = pop01(t, S.t0 + 0.3 + i * 0.25, 0.25, 2.4); if (k <= 0.01) return; drawProp(x, 'jar', 170 + i * 105, 520, 12 * k); label(x, l, 170 + i * 105, 470, { size: 18 * k, col: BONE }) })
      },
      front(x, t, S) {
        steam(x, t, 400, 880); drawProp(x, 'pot', 400, 960, 12)
        paper(x, 330, 760, 210, 70, { lines: ['TWO. GRAMS.'], align: 'center', size: 26, k: pop01(t, S.t0 + 0.9), rot: -0.08, col: '#fff1c8' })
      },
      bubbles: ['two grams. TWO.', 'oh. we’re having fun?'],
      bubblePos: [[760, 640, 0], [720, 740, 0.1]],
      cues: [0.3, 0.55, 0.8, 1.05].map(c => ['tick', c, 0.05]).concat([['pluck', 1.8, 1318.51, 0.035, 0.4, 0]]),
    },
  ],
  verdict: {
    who: 'both', text: 'BOTH. | *Ate well.*', late: 2,
    draw(x, t, S) {
      const k = pop01(t, T.crown + 0.5, 0.3, 2.2) * S.ok
      if (k > 0.01) { drawProp(x, 'pasta', 280, 1110, 8 * k); drawProp(x, 'pasta', 800, 1110, 8 * k); label(x, 'the burnt bit: shared', 540, 1190, { size: 28 * k, col: '#ffe27a' }) }
    },
  },
  last: 'Cook together. Laugh at the burnt bit.',
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
void SW
