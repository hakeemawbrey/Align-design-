// kfae11: FAKE AD, "Saying "I'm fine" when you're not" (10 s trial reel, dreamy · E, hard cut). Row: m31.md
//   0     B&W: Sagittarius mid-thumbs-up grin, "I’M FINE!!", a rain cloud pouring on its head only; hook "Saying “I’m fine”
//         *on repeat?*"   0.55 freeze, caught on the cloud: FORECAST: NOT FINE.   1.45 colour: HONEST-O (a spray bottle)
//   tip "“honestly? not great. can we talk?”"   demo: Cancer sits beside Sag ("always. I’m here."), the cloud shrinks
//   to a puff.   Pisces sobs "SAME, honestly".   last line, hard cut.
import { makeAd, star, bubble, motion, label, R, prog, ease, lerp, BONE, YEL } from '../../kfae01/adkit.js'

function cloud(x, t, cx, cy, k = 1, rain = 1) {
  if (k <= 0.02) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  if (rain > 0) { x.fillStyle = '#8fd0ff'; for (let i = 0; i < 14; i++) { const ph = (t * 2.4 + i * 0.37) % 1; x.globalAlpha = rain; x.fillRect(-120 + (i % 7) * 40, 40 + ph * 260, 8, 26) } x.globalAlpha = 1 }
  x.fillStyle = '#1b1236'; x.fillRect(-170, -50, 340, 110); x.fillRect(-110, -100, 200, 60)
  x.fillStyle = '#8c8aa8'; x.fillRect(-160, -40, 320, 90); x.fillRect(-100, -90, 180, 60)
  x.restore()
}
const AD = makeAd({
  id: 'kfae11', sign: 'sagittarius', dur: 10, ending: 'cut', style: 'dreamy', key: 'E', seed: 3111,
  hook: 'Saying “I’m fine” | *on repeat?*',
  caught: { x: 640, y: 760, r: 170, label: 'NOT FINE', arrow: 'bl' },
  product: 'HONEST-O', sub: 'spray-on honesty', icon: 'spark', col: '#7a3cff', col2: '#c9f2ff', burst: ['#ff2f8a', '#7a6cff'],
  tip: '“honestly? not great. can we talk?”',
  quote: 'SAME, honestly',
  fine: '*SAFE FOR USE WITH GOOD FRIENDS. APPLY OFTEN.',
  last: '“Not great” is | *allowed out loud.*',
  before(x, t, S) {
    cloud(x, t, 640, 760, 1, 1)
    S.hero(x, t, { x: 640, y: 1100, s: 300, mood: 'happy', look: [0, 0.3], rot: 0.04 * Math.sin(t * 12) })
    label(x, 'I’M FINE!!', 640, 1350, { size: 76, col: BONE, rot: -0.05 })
    motion(x, t, 640, 1100, { r0: 180, r1: 230, n: 8, alpha: 0.6 })
  },
  after(x, t, S) {
    const u = S.u
    const shrink = lerp(0.8, 0.25, ease.inOutCubic(prog(u, 1.0, 1.8)))
    cloud(x, t, 340, 720, shrink, u < 1.2 ? 0.8 : 0)
    S.hero(x, t, { x: 340, y: 1090, s: 260, mood: u > 1.4 ? 'happy' : 'neutral', look: [1, 0] })
    star(x, t, { sign: 'cancer', x: 760, y: 1090, s: 250, mood: 'happy', look: [-1, 0], seed: 3, pop: ease.outBack(prog(t, S.T.after + 0.6, S.T.after + 0.9)) })
    bubble(x, t, 370, 880, S.T.after + 0.1, S.T.D + 1, 'honestly? not great. can we talk?', { size: 32, maxW: 360 })
    bubble(x, t, 770, 880, S.T.after + 0.95, S.T.D + 1, 'always. I’m here.', { size: 36 })
  },
  afterCues: [['pop', 0.1, 880, 0.04, -0.3], ['pop', 0.6, 659.25, 0.04, 0.3], ['pop', 0.95, 1174.66, 0.04, 0.3], ['bell', 1.4, 1760, 0.03, 1, 0]],
})
export const DURATION = AD.DURATION, SCENES = AD.SCENES, CUES = AD.CUES, MUSIC = AD.music
void [R, YEL]
