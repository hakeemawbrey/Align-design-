// kfae12: FAKE AD, "Checking your compatibility again" (11 s trial reel, dreamy · Db, hard cut). Row: m31.md
//   0     B&W: Pisces mid-sob over a giant chart wheel, printouts flying ("MATCH??"); hook "Checking your compatibility
//         *again?*"   0.55 freeze, caught on a printout: CHART #12.   1.45 colour: THE ACTUAL CONVERSATION (two chairs)
//   tip "ask about their day. then really listen."   demo: Pisces and Aquarius on two chairs talking; the chart floats
//   away.   testimonial: a second, equally moved Pisces in the audience.   last line, hard cut.
import { makeAd, star, bubble, motion, label, block, R, prog, ease, lerp, BONE, INK, YEL, INTER } from '../../kfae01/adkit.js'

function wheel(x, cx, cy, r, rot, a = 1) {
  x.save(); x.globalAlpha *= a; x.translate(cx, cy); x.rotate(rot)
  x.strokeStyle = BONE; x.lineWidth = 8; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.stroke(); x.beginPath(); x.arc(0, 0, r * 0.7, 0, Math.PI * 2); x.stroke()
  for (let i = 0; i < 12; i++) { const q = i * Math.PI / 6; x.beginPath(); x.moveTo(Math.cos(q) * r * 0.7, Math.sin(q) * r * 0.7); x.lineTo(Math.cos(q) * r, Math.sin(q) * r); x.stroke() }
  x.lineWidth = 4; x.strokeStyle = YEL; x.beginPath(); x.moveTo(-r * 0.6, -r * 0.2); x.lineTo(r * 0.5, r * 0.4); x.lineTo(r * 0.1, -r * 0.6); x.closePath(); x.stroke()
  x.restore()
}
function paper(x, cx, cy, rot) { x.save(); x.translate(cx, cy); x.rotate(rot); block(x, -80, -100, 160, 200, '#ffffff', { bw: 5, hi: null }); x.font = `900 30px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText('MATCH??', 0, -50); for (let i = 0; i < 4; i++) R(x, '#c9bfae', -56, -20 + i * 28, 112, 10); x.restore() }
function chair(x, cx) { block(x, cx - 90, 1180, 180, 30, '#c45a9a'); block(x, cx - 90, 1000, 30, 180, '#c45a9a'); R(x, INK, cx - 80, 1210, 14, 160); R(x, INK, cx + 66, 1210, 14, 160) }
const AD = makeAd({
  id: 'kfae12', sign: 'pisces', dur: 11, ending: 'cut', style: 'dreamy', key: 'Db', seed: 3112,
  hook: 'Checking your compatibility | *again?*',
  hookSize: 96,
  caught: { x: 820, y: 740, r: 140, label: 'CHART #12', arrow: 'bl' },
  product: 'THE ACTUAL|CONVERSATION', sub: 'two chairs included', icon: 'bubble', col: '#ff6fb0', col2: '#fff1a8', burst: ['#7a3cff', '#ff6fb0'],
  tip: 'ask about their day. then really listen.',
  quote: 'they TALKED for hours',
  lowerLine: 'also Pisces, also crying',
  fine: '*CHARTS NOT INCLUDED. FEELINGS VERY INCLUDED.',
  last: 'The chart’s a lens. | *They’re the story.*',
  before(x, t, S) {
    wheel(x, 540, 1050, 330, t * 0.8, 0.8)
    paper(x, 820 + 20 * Math.sin(t * 6), 740 - 40 * t, 0.3 + t)
    paper(x, 230 - 30 * t, 820 + 20 * Math.sin(t * 5), -0.4 - t * 0.8)
    motion(x, t, 540, 1080, { r0: 170, r1: 230, n: 10 })
    S.hero(x, t, { x: 540, y: 1080, s: 290, mood: 'wide', look: [0, 1], tears: 3, rot: 0.1 * Math.sin(t * 10) })
  },
  after(x, t, S) {
    const u = S.u
    wheel(x, lerp(540, 900, prog(u, 0, 2.5)), lerp(1000, 640, prog(u, 0, 2.5)), 160, t * 0.5, 0.4 * (1 - prog(u, 1.5, 2.5)))
    chair(x, 300); chair(x, 780)
    S.hero(x, t, { x: 320, y: 1060, s: 250, mood: u > 1.0 ? 'happy' : 'sparkle', look: [1, 0], tears: u > 1.0 ? 1 : 0, hops: [S.T.after + 1.0] })
    star(x, t, { sign: 'aquarius', x: 760, y: 1060, s: 250, mood: 'happy', look: [-1, 0], seed: 5, hops: [S.T.after + 0.8] })
    bubble(x, t, 330, 830, S.T.after + 0.15, S.T.D + 1, 'how was your day?', { size: 36 })
    bubble(x, t, 760, 830, S.T.after + 0.8, S.T.D + 1, 'long! but better now.', { size: 36 })
  },
  afterCues: [['pop', 0.15, 880, 0.04, -0.3], ['pop', 0.8, 1174.66, 0.04, 0.3]],
})
export const DURATION = AD.DURATION, SCENES = AD.SCENES, CUES = AD.CUES, MUSIC = AD.music
void [star, label, ease]
