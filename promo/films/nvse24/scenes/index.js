// nvse24: SIGN VS SIGN, "Who handles the countdown better?" ♍ Virgo vs ♏ Scorpio (16 s trial reel, b46,
// music: cinematic · Dm). Story 0–13.6, then the short end card. Format: ../../nvse01/scenes/versuskit.js.
// (No year and no sky claims: just a clock near midnight.)
//   hook: a clock near midnight between them, 11:59 PM.
//   ROUND 1 ♍ "runs the countdown *to the second.*" the plan ticks, the clock jumps. "11:59:50. positions." → "who moved the clock??"
//   ROUND 2 ♏ "skips the noise and makes a *quiet wish.*" soft sparkles, its partner beside it. "wish with me?" → "don’t tell me yours yet."
//   VERDICT "BOTH. | *Together at twelve.*" 12:00, confetti.  THE STARS: "Whatever the clock says, be with your people."
import { makeVersus, drawStarChar, drawProp, paper, label, confetti, drawPixelStar, pop01, SW, T, MINT, GOLD, BONE } from '../../nvse01/scenes/versuskit.js'

const PART = '#9fd8f6'

const EP = makeVersus({
  id: 'nvse24', a: 'virgo', b: 'scorpio', accent: '#ffe27a',
  hook: 'Who handles | the *countdown* better?',
  hookMoods: ['wide', 'neutral'],
  hookDraw(x, t) { drawProp(x, 'clock', 540, 670, 12); label(x, '11:59 PM', 540, 570, { size: 30, col: MINT }) },
  rounds: [
    {
      caption: 'runs the countdown *to the second.*', deep: '#c0306a',
      set: 'room', tint: '#1f1a3a',
      moods: ['wide', 'wide'], fx: ['sweat'],
      hero: { x: 790, y: 1000, s: 250 },
      draw(x, t, S) {
        const ticks = Math.max(0, Math.min(3, Math.floor((S.u - 0.2) / 0.45) + 1))
        paper(x, 310, 800, 420, 300, { title: 'COUNTDOWN PLAN', lines: [':50 positions', ':55 deep breath', ':00 cheer!'], ticks, size: 30, rot: -0.03, k: pop01(t, S.t0 + 0.1) })
        const sec = S.u < SW ? 50 + Math.floor(S.u * 2) : 58
        label(x, `11:59:${sec}`, 310, 1030, { size: 46, col: S.u < SW ? MINT : '#ff8fa0' })
        if (S.u > SW) label(x, '?!', 470, 1030, { size: 46, col: '#ff8fa0', font: 'Inter, sans-serif', weight: 800 })
      },
      bubbles: ['11:59:50. positions.', 'who moved the clock??'],
      bubblePos: [[760, 640, 0.2], [760, 750, 0.2]],
      cues: Array.from({ length: 7 }, (_, i) => ['tick', +(0.2 + i * 0.5).toFixed(2), 0.05]),
    },
    {
      caption: 'skips the noise and makes a *quiet wish.*', deep: '#8a1f3a',
      set: 'room', tint: '#141a3a', setOpts: { window: true },
      moods: ['neutral', 'sparkle'], fx: ['sparkle'],
      hero: { x: 380, y: 1000, s: 250 },
      look: [1, -0.4],
      draw(x, t, S) {
        drawStarChar(x, 700, 1010, 220, t, { color: PART, seed: 17, glow: 0.8, mood: S.u > SW ? 'sparkle' : 'happy', look: [-1, -0.4] })
        for (let i = 0; i < 10; i++) { const p = ((t * 0.25 + i / 10) % 1); x.save(); x.globalAlpha = Math.sin(Math.PI * p) * 0.9; drawPixelStar(x, 200 + (i * 83) % 700, 1150 - p * 600, 18, i % 2, i % 3 ? GOLD : BONE); x.restore() }
      },
      bubbles: ['wish with me?', 'don’t tell me yours yet.'],
      bubblePos: [[380, 660, 0], [600, 770, 0]],
      cues: [['bell', 0.6, 1760, 0.015, 1.2, 0], ['bell', 1.8, 2349.32, 0.015, 1.2, 0]],
    },
  ],
  verdict: {
    who: 'both', text: 'BOTH. | *Together at twelve.*', late: 3,
    draw(x, t, S) { const k = pop01(t, T.crown + 0.2, 0.3, 2.6) * S.ok; if (k > 0.01) label(x, '12:00', 540, 690, { size: 64 * k, col: GOLD, font: 'Inter, sans-serif', weight: 800 }); confetti(x, t, T.crown + 0.25, 540, 680) },
  },
  last: 'Whatever the clock says, be with your people.',
  cues: [['bell', 10.35, 1760, 0.03, 1.4, 0]],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
void SW
