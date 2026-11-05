// kfae17: FAKE AD, "Ghosting because "no" feels mean" (10 s trial reel, lofi · C, hard cut). Row: m31.md
//   0     B&W: Aquarius mid-tiptoe away, a "seen" bubble chasing it; Taurus waits with a "?" phone; hook "Ghosting
//         because | *“no” feels mean?*"   0.55 freeze, caught on Aquarius: EXIT, STAGE LEFT.   1.45 colour: THE KIND CLOSE
//   tip "“I had fun, but I don’t feel it. take care!”"   demo: the message goes; Taurus: "thanks for telling me. you
//   too!", relieved.   Pisces sobs "so RESPECTFUL".   last line, hard cut.
import { makeAd, star, bubble, drawPhone, chat, motion, label, prog, ease, BONE } from '../../kfae01/adkit.js'

const AD = makeAd({
  id: 'kfae17', sign: 'aquarius', dur: 10, ending: 'cut', style: 'lofi', key: 'C', seed: 3117,
  hook: 'Ghosting because | *“no” feels mean?*',
  caught: { x: 330, y: 1060, r: 170, label: 'BYE??', arrow: 'tr' },
  product: 'THE KIND|CLOSE', sub: 'ribbon included', icon: 'heart', col: '#ff6fb0', col2: '#ffffff', burst: ['#ff6fb0', '#7a6cff'],
  tip: '“I had fun, but I don’t feel it. take care!”',
  quote: 'so RESPECTFUL',
  fine: '*A KIND “NO” LETS EVERYONE MOVE ON.',
  last: 'Closure is | *the kind thing.*',
  before(x, t, S) {
    star(x, t, { sign: 'taurus', x: 820, y: 1080, s: 230, mood: 'neutral', look: [-1, 0], seed: 9 })
    bubble(x, t, 820, 860, -1, 99, '?', { size: 60 })
    bubble(x, t, 560 - t * 120, 900 + 20 * Math.sin(t * 9), -1, 99, 'seen', { size: 36 })
    motion(x, t, 330 - t * 60, 1060, { r0: 160, r1: 200, n: 6, alpha: 0.6 })
    S.hero(x, t, { x: 330 - t * 60, y: 1060 - 30 * Math.abs(Math.sin(t * 8)), s: 280, mood: 'squint', look: [-1, 0], rot: -0.2 })
  },
  after(x, t, S) {
    const u = S.u
    S.hero(x, t, { x: 300, y: 1060, s: 250, mood: u > 1.0 ? 'happy' : 'neutral', look: [1, 0], hops: [S.T.after + 1.0] })
    drawPhone(x, 760, 1000, { w: 400, h: 480, rot: 0.04, t, screen: (c, W, H, tt) => chat(c, tt, W, H, [
      { side: 'R', text: 'I had fun, but I don’t feel it. take care!', at: S.T.after + 0.15 },
      { side: 'L', text: 'thanks for telling me. you too!', at: S.T.after + 0.8 },
    ], { size: 30 }) })
    label(x, 'phew', 300, 860, { size: 48, col: BONE, k: ease.outBack(prog(t, S.T.after + 1.0, S.T.after + 1.3)) })
  },
  afterCues: [['pop', 0.15, 880, 0.04, 0.3], ['pop', 0.8, 1174.66, 0.04, 0.3], ['pluck', 1.0, 659.25, 0.03, 0.6, -0.3]],
})
export const DURATION = AD.DURATION, SCENES = AD.SCENES, CUES = AD.CUES, MUSIC = AD.music
void [star]
