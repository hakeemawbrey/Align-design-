// kfae08: FAKE AD, "Single at the holiday dinner" (11 s trial reel, funk · G, hard cut). Row: promo/films/month2/m31.md
//   0     B&W: Taurus mid-bite as the whole table turns to stare, a bubble "SO… anyone special?"; hook "Single at the
//         table. *Again.*"   0.55 freeze, caught on the bubble: THE QUESTION.   1.45 colour: THE ANSWER CARD
//   tip "“I’m really happy, thanks. how’s your garden?”"   demo: Taurus says it; Virgo lights up about tomatoes;
//   Taurus eats in peace.   Pisces sobs "they ATE. literally."   last line, hard cut.
import { makeAd, star, bubble, motion, label, block, R, prog, ease, BONE, INK, RED, YEL, INTER } from '../../kfae01/adkit.js'

function dinner(x) { block(x, 60, 1180, 960, 60, '#8a5a3c'); R(x, '#f4f0e0', 60, 1180, 960, 22); for (const cx of [220, 540, 860]) { x.fillStyle = INK; x.beginPath(); x.ellipse(cx, 1172, 78, 20, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = BONE; x.beginPath(); x.ellipse(cx, 1170, 70, 16, 0, 0, Math.PI * 2); x.fill() } R(x, INK, 120, 1240, 24, 300); R(x, INK, 936, 1240, 24, 300) }
const AD = makeAd({
  id: 'kfae08', sign: 'taurus', dur: 11, ending: 'cut', style: 'funk', key: 'G', seed: 3108,
  hook: 'Single at the table. | *Again.*',
  caught: { x: 760, y: 720, r: 170, label: 'THE QUESTION', arrow: 'bl' },
  product: 'THE ANSWER|CARD', sub: 'pocket size. reusable.', icon: 'question', col: '#2f9a6a', col2: '#fff1a8', burst: ['#ff7a2f', '#2fbf8a'],
  tip: '“I’m really happy, thanks. how’s your garden?”',
  quote: 'they ATE. literally.',
  fine: '*WORKS ON AUNTS, UNCLES AND THAT ONE COUSIN.',
  last: 'Single isn’t | *a question to answer.*',
  before(x, t, S) {
    dinner(x)
    star(x, t, { sign: 'aries', x: 170, y: 1010, s: 190, mood: 'wide', look: [1, 0], seed: 2 })
    star(x, t, { sign: 'virgo', x: 900, y: 1010, s: 190, mood: 'wide', look: [-1, 0], seed: 5 })
    star(x, t, { sign: 'sagittarius', x: 760, y: 950, s: 150, mood: 'wide', look: [-1, 0.5], seed: 7 })
    bubble(x, t, 760, 720, -1, 99, 'SO… anyone special?', { size: 40 })
    motion(x, t, 480, 1040, { r0: 160, r1: 210, n: 8 })
    S.hero(x, t, { x: 480, y: 1040, s: 250, mood: 'wide', look: [1, -0.5], rot: 0.08 * Math.sin(t * 15) })
    x.save(); x.translate(560, 1000); x.rotate(-0.5); R(x, INK, -6, -90, 12, 100); R(x, '#c9cfd8', -3, -86, 6, 92); x.restore()
  },
  after(x, t, S) {
    const u = S.u
    dinner(x)
    star(x, t, { sign: 'virgo', x: 870, y: 1020, s: 200, mood: u > 0.9 ? 'sparkle' : 'neutral', look: [-1, 0], seed: 5, hops: [S.T.after + 0.9, S.T.after + 1.3] })
    S.hero(x, t, { x: 400, y: 1030, s: 250, mood: u > 1.4 ? 'happy' : 'neutral', look: [1, 0], hops: [S.T.after + 0.15] })
    bubble(x, t, 380, 800, S.T.after + 0.15, S.T.after + 1.6, 'I’m really happy, thanks. how’s your garden?', { size: 32, maxW: 400 })
    bubble(x, t, 800, 800, S.T.after + 0.9, S.T.D + 1, 'OH, the TOMATOES this year!!', { size: 32, maxW: 340 })
    if (u > 1.6) label(x, 'nom', 400, 870, { size: 44, col: YEL, k: ease.outBack(prog(t, S.T.after + 1.6, S.T.after + 1.9)), rot: -0.1 })
  },
  afterCues: [['pop', 0.15, 880, 0.04, -0.3], ['pop', 0.9, 1318.51, 0.05, 0.3], ['pop', 1.6, 659.25, 0.04, -0.2]],
})
export const DURATION = AD.DURATION, SCENES = AD.SCENES, CUES = AD.CUES, MUSIC = AD.music
void [RED, INTER]
