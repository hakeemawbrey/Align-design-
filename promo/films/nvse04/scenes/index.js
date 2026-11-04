// nvse04: SIGN VS SIGN, "Who handles a cancelled date better?" ♎ Libra vs ♏ Scorpio (18 s trial reel, b46,
// music: lofi · Dm). Story 0–13.6, then the shared end card. Format: ../../nvse01/scenes/versuskit.js.
//   hook: a message pops between them: "so sorry, I'm sick :("
//   ROUND 1 ♎ "can’t pick the *right reply.*" drafts pile up around the phone. "is ‘feel better’ too short?" → "is ‘feel better!!!’ too long?"
//   ROUND 2 ♏ "answers once and *means it.*" the reply sends, a calendar card: FRIDAY, rain check. "rest. I’ll be here." → "rain check friday?"
//   VERDICT "SCORPIO. | *Meant it.*" Libra sends its draft anyway, happy.  THE STARS: "When they cancel to rest, answer with care."
import { makeVersus, bubble, label, phone, paper, drawProp, pop01, prog, ease, lerp, SW, T, RED } from '../../nvse01/scenes/versuskit.js'

const DRAFTS = ['feel better', 'feel better!!!', 'get well soon :)', 'oh no!! rest up', 'sending soup vibes']

const EP = makeVersus({
  id: 'nvse04', a: 'libra', b: 'scorpio', accent: '#9fd8f6',
  hook: 'Who handles | a *cancelled date* better?',
  hookMoods: ['wide', 'neutral'],
  hookDraw(x, t) {
    label(x, 'NEW MESSAGE', 540, 560, { size: 26, col: '#9fe6b0' })
    bubble(x, t, 540, 625, -1, 2.6, 'so sorry, I’m sick :(', { size: 40, col: '#c9f2d4', tail: 0 })
    drawProp(x, 'mug', 540, 740, 7)
  },
  rounds: [
    {
      caption: 'can’t pick the *right reply.*', deep: '#7a4ab0',
      set: 'room', tint: '#2a2a55',
      moods: ['neutral', 'wide'], fx: ['sweat'],
      hero: { x: 340, y: 1000, s: 270 },
      draw(x, t, S) {
        DRAFTS.forEach((d, i) => {
          const k = pop01(t, S.t0 + 0.3 + i * 0.32, 0.3, 2.2)
          if (k > 0.01) paper(x, 790 + (i % 2 ? 30 : -30), 470 + i * 88, 270, 64, { lines: [d], size: 24, align: 'center', k, rot: ((i % 3) - 1) * 0.12, strike: [0] })
        })
      },
      front(x, t, S) { phone(x, 790, 1050, 0.8, { title: 'DRAFT', msgs: [{ text: t > S.sw ? 'feel better!!!' : 'feel better' }], rot: 0.06 }) },
      bubbles: ['is ‘feel better’ too short?', 'is ‘feel better!!!’ too long?'],
      bubblePos: [[330, 620, 0], [330, 740, 0]],
      cues: [0.3, 0.62, 0.94, 1.26, 1.58].map(c => ['pop', c, 880, 0.025, 0.3]),
    },
    {
      caption: 'answers once and *means it.*', deep: '#8a1f3a',
      set: 'room', tint: '#2a1a3a',
      moods: ['happy', 'sparkle'], fx: ['hearts'],
      hero: { x: 340, y: 1000, s: 270 },
      front(x, t, S) {
        phone(x, 790, 980, 0.8, { title: 'SENT', msgs: [{ text: 'rest. I’ll be here.', col: '#5a3a8a' }, ...(t > S.sw ? [{ text: 'rain check friday?', col: '#5a3a8a' }] : [])] })
        paper(x, 760, 600, 280, 170, { title: 'FRIDAY', lines: ['rain check ♥'], align: 'center', accent: RED, k: pop01(t, S.sw + 0.2, 0.3, 2.4), rot: 0.08 })
      },
      bubbles: ['rest. I’ll be here.', 'rain check friday?'],
      bubblePos: [[340, 640, 0], [360, 740, 0]],
      cues: [['whoosh', 0.45, 0.2, 0.02], ['pop', 1.96, 1318.51, 0.04, 0.3]],
    },
  ],
  verdict: {
    who: 'b', text: 'SCORPIO. | *Meant it.*', late: 2,
    draw(x, t) { bubble(x, t, 300, 690, T.crown + 0.7, 13.4, 'sent: feel better!!', { size: 28, col: '#c9f2d4', tail: 0 }) },
  },
  last: 'When they cancel to rest, answer with care.',
  cues: [['pop', 10.8, 1318.51, 0.035, -0.3]],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
void [ease, lerp, prog, SW]
