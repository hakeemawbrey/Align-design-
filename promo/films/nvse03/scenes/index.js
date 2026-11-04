// nvse03: SIGN VS SIGN, "Who plans a first date better?" ♌ Leo vs ♍ Virgo (18 s trial reel, b46, music: funk · E).
// Story 0–13.6, then the shared end card. Format: ../../nvse01/scenes/versuskit.js.
//   hook: each holds a plan card (Leo's says SURPRISE, Virgo's says PLAN A/B/C).
//   ROUND 1 ♌ "plans a *surprise* with a spotlight." a banner, spotlights, confetti. "too much?" → "it’s never too much."
//   ROUND 2 ♍ "makes a *backup plan* for the backup." the checklist ticks, then gets laminated. "plan C: indoor picnic." → "I laminated it."
//   VERDICT "BOTH. | *Built around them.*" both plans carry the date's favourite thing.
//   THE STARS: "Big or small, plan it around them."
import { makeVersus, paper, spotlight, sparkles, pop01, prog, clamp, SW, T, RED } from '../../nvse01/scenes/versuskit.js'

const EP = makeVersus({
  id: 'nvse03', a: 'leo', b: 'virgo', accent: '#f39a3a',
  hook: 'Who plans | a *first date* better?',
  hookMoods: ['sparkle', 'neutral'],
  hookDraw(x, t) {
    paper(x, 230, 650, 200, 96, { title: 'SURPRISE!', titleSize: 30, rot: -0.12 + 0.04 * Math.sin(t * 5) })
    paper(x, 850, 640, 200, 150, { lines: ['plan A', 'plan B', 'plan C'], size: 24, rot: 0.1, ticks: 3 })
  },
  rounds: [
    {
      caption: 'plans a *surprise* with a spotlight.', deep: '#c45a12',
      set: 'room', tint: '#3a1f3a', setOpts: { window: false },
      moods: ['sparkle', 'happy'], fx: ['confetti', 'sparkle'],
      hero: { x: 540, y: 990, s: 290 },
      draw(x, t, S) {
        const on = clamp(prog(t, S.t0 + 0.2, S.t0 + 0.3)), on2 = clamp(prog(t, S.sw, S.sw + 0.1))
        spotlight(x, 540, 340, 540, 1160, 380, on)
        spotlight(x, 160, 340, 380, 1160, 260, on2, '255,190,220'); spotlight(x, 920, 340, 700, 1160, 260, on2, '190,220,255')
        paper(x, 540, 540, 640, 110, { title: 'SURPRISE!!', titleSize: 64, k: pop01(t, S.t0 + 0.35, 0.3, 2.4), accent: RED, rot: -0.03 })
      },
      bubbles: ['too much?', 'it’s never too much.'],
      bubblePos: [[300, 720, 0.4], [760, 790, -0.4]],
      cues: [['tick', 0.22, 0.08], ['pop', 0.36, 1567.98, 0.04, 0], ['tick', 1.76, 0.08], ['tick', 1.8, 0.06]],
    },
    {
      caption: 'makes a *backup plan* for the backup.', deep: '#3a7a4a',
      set: 'room', tint: '#1f3a3a',
      moods: ['neutral', 'sparkle'], fx: ['sparkle'],
      hero: { x: 790, y: 1000, s: 260 },
      draw(x, t, S) {
        const ticks = Math.min(3, Math.floor((S.u - 0.4) / 0.4) + 1)
        paper(x, 300, 820, 400, 340, { title: 'PLAN A, B, C', lines: ['A: picnic', 'B: museum', 'C: indoor picnic'], ticks: Math.max(0, ticks), size: 30, rot: -0.04, k: pop01(t, S.t0 + 0.1) })
        if (t > S.sw) { const g = clamp(prog(t, S.sw, S.sw + 0.5)); x.save(); x.globalAlpha = 0.35; x.fillStyle = '#ffffff'; x.translate(300, 820); x.rotate(-0.04); x.fillRect(-200 + 400 * g - 60, -170, 60, 340); x.restore(); sparkles(x, t, 300, 820, S.sw + 0.1, 10, 230, 2) }
      },
      bubbles: ['plan C: indoor picnic.', 'I laminated it.'],
      bubblePos: [[720, 600, 0.2], [760, 700, 0]],
      cues: [['tick', 0.45, 0.05], ['tick', 0.85, 0.05], ['tick', 1.25, 0.05], ['riser', 1.75, 2.25, 0.02]],
    },
  ],
  verdict: {
    who: 'both', text: 'BOTH. | *Built around them.*', late: 3,
    draw(x, t, S) {
      const k = pop01(t, T.crown + 0.4, 0.3, 2.2) * S.ok
      paper(x, 280, 660, 330, 74, { lines: ['★ their fave: dumplings'], size: 24, align: 'center', k, rot: -0.04 })
      paper(x, 800, 660, 330, 74, { lines: ['★ their fave: dumplings'], size: 24, align: 'center', k, rot: 0.04 })
    },
  },
  last: 'Big or small, plan it around them.',
  cues: [['pop', 10.5, 1174.66, 0.035, -0.3], ['pop', 10.55, 1174.66, 0.035, 0.3]],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
void SW
