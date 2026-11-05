// kfae19: FAKE AD, "Waiting for the perfect moment" (10 s trial reel, dreamy · F, hard cut). Row: m31.md
//   0     B&W: Cancer mid-rehearsal in a candle-lit set-up, music notes swirling, while its crush (Scorpio) walks right
//         past; hook "Waiting for | *the perfect moment?*"   0.55 freeze, caught on the crush: THEY’RE LEAVING.
//   1.45  colour: THE NOW.   tip "say it on an ordinary tuesday. it counts."   demo: at a bus stop Cancer says "I really
//   like spending time with you." Scorpio: "me too."   Pisces sobs "at a BUS STOP".   last line, hard cut.
import { makeAd, star, bubble, motion, hearts, label, block, R, prog, ease, BONE, INK, YEL, INTER } from '../../kfae01/adkit.js'

function candle(x, cx, cy, t) { block(x, cx - 14, cy - 60, 28, 60, BONE, { bw: 5, hi: null }); const f = 1 + 0.15 * Math.sin(t * 20 + cx); R(x, '#ffb02f', cx - 8, cy - 86 * f, 16, 26 * f); R(x, '#fff1a8', cx - 4, cy - 78 * f, 8, 14) }
function busStop(x) { R(x, INK, 880, 640, 16, 700); block(x, 800, 600, 180, 110, '#2f6aff'); x.font = `900 40px ${INTER}`; x.fillStyle = '#fff'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BUS', 890, 656); block(x, 120, 1260, 840, 30, '#8c86a8') }
const AD = makeAd({
  id: 'kfae19', sign: 'cancer', dur: 10, ending: 'cut', style: 'dreamy', key: 'F', seed: 3119,
  hook: 'Waiting for | *the perfect moment?*',
  caught: { x: 820, y: 1080, r: 140, label: 'LEAVING', arrow: 'tl' },
  product: 'THE NOW', sub: 'no candles required', icon: 'clock', col: '#ff6fb0', col2: '#fff1a8', burst: ['#ff6fb0', '#ffb02f'],
  tip: 'say it on an ordinary tuesday. it counts.',
  quote: 'at a BUS STOP',
  fine: '*THE PERFECT MOMENT IS SOLD SEPARATELY. AND NOT NEEDED.',
  last: 'Perfect moments | are *made, not found.*', lastSize: 86,
  before(x, t, S) {
    for (const cx of [150, 250, 560]) candle(x, cx, 1290, t)
    for (let i = 0; i < 5; i++) { const a = t * 3 + i * 1.25; label(x, '♪', 330 + Math.cos(a) * 240, 980 + Math.sin(a) * 200, { size: 54, col: BONE, stroke: INK }) }
    S.hero(x, t, { x: 330, y: 1060, s: 280, mood: 'squint', look: [0, -1], rot: 0.06 * Math.sin(t * 6) })
    bubble(x, t, 330, 800, -1, 99, '“so… I’ve been meaning to…”', { size: 30, maxW: 380 })
    motion(x, t, 820 + t * 90, 1080, { r0: 130, r1: 170, n: 6, alpha: 0.5 })
    star(x, t, { sign: 'scorpio', x: 820 + t * 90, y: 1080, s: 220, mood: 'neutral', look: [1, 0], seed: 7 })
  },
  after(x, t, S) {
    const u = S.u
    busStop(x)
    S.hero(x, t, { x: 330, y: 1100, s: 250, mood: u > 1.0 ? 'happy' : 'wide', look: [1, 0], blush: 1, hops: [S.T.after + 0.15, S.T.after + 1.0] })
    star(x, t, { sign: 'scorpio', x: 700, y: 1100, s: 240, mood: u > 0.9 ? 'happy' : 'neutral', look: [-1, 0], seed: 7, blush: u > 0.9 ? 1 : 0 })
    bubble(x, t, 340, 870, S.T.after + 0.15, S.T.D + 1, 'I really like spending time with you.', { size: 32, maxW: 360 })
    bubble(x, t, 690, 890, S.T.after + 0.9, S.T.D + 1, 'me too.', { size: 40 })
    hearts(x, t, 520, 1040, S.T.after + 1.0, { n: 6 })
  },
  afterCues: [['pop', 0.15, 880, 0.04, -0.3], ['pop', 0.9, 1174.66, 0.05, 0.3], ['bell', 1.0, 1760, 0.03, 1.2, 0]],
})
export const DURATION = AD.DURATION, SCENES = AD.SCENES, CUES = AD.CUES, MUSIC = AD.music
void [prog, ease, YEL]
