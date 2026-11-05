// kfae16: FAKE AD, "Everyone's coupled up but you" (11 s trial reel, jazzy · F, hard cut). Row: m31.md
//   0     B&W: Sagittarius mid-dodge as pairs of hearts streak past like a meteor shower; hook "Everyone’s coupled up.
//         *But you?*"   0.55 freeze, caught on a heart pair: ANOTHER ONE.   1.45 colour: YOUR OWN CLOCK (it only says NOW)
//   tip "your timeline isn’t late. it’s yours."   demo: three cards pop: BOOKED THE TRIP · DRUM LESSON #1 · FRIENDS
//   NIGHT; Sag beams.   Pisces sobs "they’re THRIVING".   last line, hard cut.
import { makeAd, star, motion, label, block, R, bits, ICON, ICOL, prog, ease, BONE, INK, YEL, INTER } from '../../kfae01/adkit.js'

function card(x, t, cx, cy, t0, txt, rot) { const k = ease.outBack(prog(t, t0, t0 + 0.3)); if (k <= 0.01) return; x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k); block(x, -170, -50, 340, 100, '#ffffff', { bw: 6, hi: null }); x.font = `900 34px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 2); x.restore() }
const AD = makeAd({
  id: 'kfae16', sign: 'sagittarius', dur: 11, ending: 'cut', style: 'jazzy', key: 'F', seed: 3116,
  hook: 'Everyone’s coupled up. | *But you?*',
  caught: { x: 760, y: 780, r: 130, label: 'ANOTHER ONE', arrow: 'bl' },
  product: 'YOUR OWN|CLOCK', sub: 'it only says “now”', icon: 'clock', col: '#2f6aff', col2: '#ffd23a', burst: ['#ff7a2f', '#2f9aff'],
  tip: 'your timeline isn’t late. it’s yours.',
  quote: 'they’re THRIVING',
  fine: '*NO TWO CLOCKS MATCH. THAT’S BY DESIGN.',
  last: 'Nobody else’s clock | *sets yours.*',
  before(x, t, S) {
    for (let i = 0; i < 5; i++) {
      const ph = ((t * 0.9 + i * 0.23) % 1), cx = 1180 - ph * 1400, cy = 640 + i * 150 + ph * 220
      x.save(); x.globalAlpha = 0.5; R(x, BONE, cx + 40, cy - 6, 220, 12); x.restore()
      bits(x, ICON.heart, cx, cy, 8, ICOL); bits(x, ICON.heart, cx + 60, cy + 6, 8, ICOL)
    }
    bits(x, ICON.heart, 730, 780, 9, ICOL); bits(x, ICON.heart, 795, 786, 9, ICOL)
    motion(x, t, 440, 1150, { r0: 160, r1: 220, n: 10 })
    S.hero(x, t, { x: 440, y: 1150, s: 290, mood: 'wide', look: [1, -1], rot: -0.45 + 0.08 * Math.sin(t * 10) })
  },
  after(x, t, S) {
    const u = S.u
    card(x, t, 720, 760, S.T.after + 0.1, 'BOOKED THE TRIP', 0.06)
    card(x, t, 720, 900, S.T.after + 0.55, 'DRUM LESSON #1', -0.05)
    card(x, t, 720, 1040, S.T.after + 1.0, 'FRIENDS NIGHT', 0.04)
    S.hero(x, t, { x: 300, y: 1080, s: 270, mood: u > 1.0 ? 'sparkle' : 'happy', look: [1, 0], hops: [S.T.after + 0.15, S.T.after + 0.6, S.T.after + 1.05] })
    label(x, 'NOW', 300, 880, { size: 60, col: YEL, k: ease.outBack(prog(t, S.T.after, S.T.after + 0.3)), rot: -0.08 })
  },
  afterCues: [['pop', 0.1, 880, 0.04, 0.3], ['pop', 0.55, 1174.66, 0.04, 0.3], ['pop', 1.0, 1318.51, 0.05, 0.3]],
})
export const DURATION = AD.DURATION, SCENES = AD.SCENES, CUES = AD.CUES, MUSIC = AD.music
void [star]
