// kfae22: FAKE AD, "They stopped typing. Now what?" (9 s trial reel, synthwave · Cm, hard cut). Row: m31.md
//   0     B&W: Scorpio mid-gasp as the typing dots vanish and a huge "…" crashes to the floor; hook "They *stopped
//         typing.* | Now what?"   0.55 freeze, caught on the dots.   1.45 colour: THE KETTLE OF PEACE (a teapot)
//   tip "phone down. make tea. call a friend."   demo: Scorpio sips tea, the reply arrives anyway: "sorry! was cooking.
//   YES!!"   Pisces sobs into its own tea: "I made TEA too".   last line, hard cut.
import { makeAd, star, bubble, drawPhone, chat, motion, label, block, bits, ICON, ICOL, R, prog, ease, BONE, INK, YEL } from '../../kfae01/adkit.js'

function dots(x, cx, cy, k, cell = 26) { for (let i = 0; i < 3; i++) { R(x, INK, cx - cell * 2.6 + i * cell * 2 - 5, cy - cell / 2 - 5, cell + 10, cell + 10); R(x, BONE, cx - cell * 2.6 + i * cell * 2, cy - cell / 2, cell, cell) } void k }
function teapot(x, cx, cy) { block(x, cx - 90, cy - 70, 180, 130, '#ff8fb1', { bw: 7 }); block(x, cx - 30, cy - 100, 60, 30, '#ff8fb1', { bw: 6 }); block(x, cx + 90, cy - 50, 60, 24, '#ff8fb1', { bw: 6 }); block(x, cx - 130, cy - 40, 40, 70, '#ff8fb1', { bw: 6 }) }
const AD = makeAd({
  id: 'kfae22', sign: 'scorpio', dur: 9, ending: 'cut', style: 'synthwave', key: 'Cm', seed: 3122,
  hook: 'They *stopped typing.* | Now what?',
  caught: { x: 760, y: 1000, r: 130, label: 'GONE', arrow: 'tl' },
  product: 'THE KETTLE|OF PEACE', sub: 'boils in three minutes', icon: 'tea', col: '#7a3cff', col2: '#ffd1e6', burst: ['#7a3cff', '#ff2f8a'],
  tip: 'phone down. make tea. call a friend.',
  quote: 'I made TEA too',
  fine: '*TYPING DOTS ARE NOT A FORECAST.',
  last: 'Go live. | *The reply will find you.*', lastSize: 80,
  before(x, t, S) {
    drawPhone(x, 760, 1000, { w: 320, h: 500, rot: 0.08, glow: 0.7, screen: (c, W, H) => { c.save(); c.globalAlpha = Math.max(0, 1 - t * 1.6); dots(c, W / 2, H - 60, 1, 18); c.restore() } })
    dots(x, 560 + 30 * Math.sin(t * 12), 760 + t * 900, 1, 40)
    motion(x, t, 330, 1080, { r0: 160, r1: 220, n: 10 })
    S.hero(x, t, { x: 330, y: 1080, s: 290, mood: 'wide', look: [1, 0], rot: -0.25 + 0.05 * Math.sin(t * 16) })
  },
  after(x, t, S) {
    const u = S.u
    teapot(x, 560, 1200)
    S.hero(x, t, { x: 300, y: 1080, s: 260, mood: u > 1.2 ? 'sparkle' : 'happy', look: [1, 0], hops: [S.T.after + 1.25] })
    bits(x, ICON.mug, 400, 1130, 10, { ...ICOL, H: '#c98a4a' })
    drawPhone(x, 830, 1010, { w: 300, h: 420, rot: 0.05, t, screen: (c, W, H, tt) => chat(c, tt, W, H, [{ side: 'L', text: 'sorry! was cooking. YES!!', at: S.T.after + 1.2 }], { size: 30 }) })
    label(x, 'sip', 300, 880, { size: 44, col: YEL, k: ease.outBack(prog(t, S.T.after + 0.3, S.T.after + 0.6)) })
  },
  afterCues: [['pluck', 0.3, 659.25, 0.03, 0.5, -0.3], ['pop', 1.2, 1318.51, 0.05, 0.3]],
})
export const DURATION = AD.DURATION, SCENES = AD.SCENES, CUES = AD.CUES, MUSIC = AD.music
void [star, bubble]
