// nvse09: SIGN VS SIGN, "Who handles their partner's bad day better?" ♋ Cancer vs ♎ Libra (16 s trial reel, b46,
// music: dreamy · Ab). Story 0–13.6, then the short end card. Format: ../../nvse01/scenes/versuskit.js.
//   hook: a slumped partner star under a little rain cloud between them.
//   ROUND 1 ♋ "builds a *blanket fort* in five minutes." the partner peeks out, cocoa. "get in. there’s cocoa." → "nobody leaves till you smile."
//   ROUND 2 ♎ "asks *one question* first." two cards, ADVICE and HUG; HUG wins, the cloud clears. "advice or a hug?" → "hug. got it."
//   VERDICT "LIBRA. | *Asked what helps.*" (Cancer's fort is still the best fort.)  THE STARS: "Ask what they need before you fix it."
import { makeVersus, drawStarChar, drawProp, paper, label, R, INK, pop01, prog, lerp, ease, clamp, outK, SW, T, GOLD } from '../../nvse01/scenes/versuskit.js'

const PART = '#9fd8f6'
const partner = (x, t, o) => drawStarChar(x, o.x, o.y, o.s, t, { color: PART, seed: 17, glow: 0.7, ...o })
function fort(x, cx, by, w, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, by); x.scale(k, k)
  const h = w * 0.8
  x.fillStyle = INK; x.beginPath(); x.moveTo(-w / 2 - 10, 6); x.lineTo(0, -h - 12); x.lineTo(w / 2 + 10, 6); x.closePath(); x.fill()
  for (let i = 0; i < 6; i++) { x.fillStyle = i % 2 ? '#f59cc4' : '#fff1c8'; x.beginPath(); const a = -w / 2 + (i / 6) * w, b = -w / 2 + ((i + 1) / 6) * w; x.moveTo(a, 0); x.lineTo(lerp(a, 0, 1) * 0 + a * (1 - 1) , 0); x.lineTo(0, -h); x.lineTo(b, 0); x.closePath(); x.fill() }
  R(x, '#2a1f4a', -w * 0.16, -h * 0.42, w * 0.32, h * 0.42)
  x.restore()
}
function cloud(x, t, cx, cy, a) { if (a > 0.01) drawProp(x, 'cloud', cx + 6 * Math.sin(t * 2), cy, 9, { alpha: a }) }

const EP = makeVersus({
  id: 'nvse09', a: 'cancer', b: 'libra', accent: '#9fd8f6',
  hook: 'Who handles | their partner’s *bad day?*',
  hookMoods: ['wide', 'wide'],
  hookDraw(x, t) { partner(x, t, { x: 540, y: 690, s: 100, mood: 'sleepy', zzz: false, look: [0, 1], bob: 1 }); cloud(x, t, 540, 590, 1) },
  rounds: [
    {
      caption: 'builds a *blanket fort* in five minutes.', deep: '#2f6fb0',
      set: 'room', tint: '#2a2a50', setOpts: { lampX: 120 },
      moods: ['wide', 'happy'], fx: ['hearts'],
      hero: { x: 300, y: 980, s: 250 },
      look: [1, 0],
      draw(x, t, S) {
        const k = ease.outBack(prog(t, S.t0 + 0.3, S.t0 + 0.8))
        fort(x, 750, 1180, 420, k)
        partner(x, t, { x: 750, y: 1080, s: 140, mood: S.u > SW ? 'happy' : 'neutral', look: [-1, 0], bob: 2 })
        cloud(x, t, 750, 760, outK(t, [S.sw, S.sw + 0.4]))
      },
      front(x, t) { drawProp(x, 'mug', 430, 1080, 8) },
      bubbles: ['get in. there’s cocoa.', 'nobody leaves till you smile.'],
      bubblePos: [[330, 620, 0], [600, 710, -0.3]],
      cues: [['whoosh', 0.3, 0.3, 0.03], ['pop', 0.8, 880, 0.04, 0.3]],
    },
    {
      caption: 'asks *one question* first.', deep: '#a03a8a',
      set: 'room', tint: '#2a2a50', setOpts: { lampX: 120 },
      moods: ['neutral', 'happy'], fx: ['hearts'],
      hero: { x: 300, y: 980, s: 250 },
      look: [1, 0],
      pose: (u) => ({ x: lerp(300, 560, ease.inOutCubic(clamp((u - SW - 0.2) / 0.5))) }),
      draw(x, t, S) {
        partner(x, t, { x: 760, y: 990, s: 220, mood: S.u > SW + 0.6 ? 'happy' : 'neutral', look: [-1, 0.4] })
        cloud(x, t, 760, 760, outK(t, [S.sw + 0.3, S.sw + 0.8]))
        const ck = pop01(t, S.t0 + 0.45, 0.3, 2.4) * outK(t, [S.sw + 0.1, S.sw + 0.35])
        paper(x, 230, 760, 200, 90, { title: 'ADVICE', titleSize: 34, k: ck, rot: -0.1 })
        const hk = pop01(t, S.t0 + 0.55, 0.3, 2.4)
        paper(x, 440, 740, 170, 90, { title: 'HUG', titleSize: 34, k: hk * (t > S.sw ? 1.15 : 1), rot: 0.08, accent: '#d23a7a' })
        if (t > S.sw) label(x, '✓', 520, 690, { size: 56, col: GOLD })
      },
      bubbles: ['advice or a hug?', 'hug. got it.'],
      bubblePos: [[300, 590, 0], [560, 620, 0]],
      cues: [['pop', 0.47, 987.77, 0.04, -0.3], ['pop', 0.57, 1174.66, 0.04, -0.2], ['pop', 1.76, 1567.98, 0.045, 0]],
    },
  ],
  verdict: {
    who: 'b', text: 'LIBRA. | *Asked what helps.*', late: 3,
    back(x, t, S) { fort(x, 440, 1090, 150, pop01(t, T.crown + 0.5, 0.3, 2) * S.ok); if (t > T.crown + 0.6) label(x, 'best fort ★', 430, 1120, { size: 22, col: GOLD, alpha: S.ok }) },
  },
  last: 'Ask what they need before you fix it.',
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
