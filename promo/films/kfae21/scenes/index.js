// kfae21: FAKE AD, "Cancelling plans with yourself" (10 s trial reel, lofi · Bb, loops). Row: m31.md
//   0     B&W: Taurus mid-leap out of its own bubble bath to answer "can you help me move a couch tonight?" with "YES!!",
//         its ME TIME sign toppling; hook "Cancelling plans | *with yourself?*"   0.55 freeze, caught on the sign.
//   1.45  colour: DO NOT DISTURB: ME (a door hanger).   tip "plans with yourself count. keep them."   demo: Taurus stays
//   in the bath with a book and a snack, replies "can’t tonight! free saturday?"   Pisces sobs "you KEPT your plans".
//   last line, then eases back into frame 0.
import { makeAd, star, bubble, motion, label, block, R, prog, ease, BONE, INK, YEL, INTER } from '../../kfae01/adkit.js'

function tub(x, t) { block(x, 140, 1150, 560, 170, '#ffffff', { bw: 8, hi: null }); R(x, INK, 180, 1320, 24, 70); R(x, INK, 636, 1320, 24, 70); for (let i = 0; i < 9; i++) { const r = 36 + 10 * Math.sin(i * 2.1); x.fillStyle = INK; x.beginPath(); x.arc(180 + i * 60, 1150 + 6 * Math.sin(t * 3 + i), r + 5, 0, Math.PI * 2); x.fill(); x.fillStyle = '#eaf6ff'; x.beginPath(); x.arc(180 + i * 60, 1150 + 6 * Math.sin(t * 3 + i), r, 0, Math.PI * 2); x.fill() } }
function sign(x, cx, cy, rot, txt = 'ME TIME') { x.save(); x.translate(cx, cy); x.rotate(rot); R(x, INK, -8, 0, 16, 220); block(x, -140, -70, 280, 90, '#ff8fb1', { bw: 6 }); x.font = `900 40px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, -24); x.restore() }
const AD = makeAd({
  id: 'kfae21', sign: 'taurus', dur: 10, ending: 'loop', style: 'lofi', key: 'Bb', seed: 3121,
  hook: 'Cancelling plans | *with yourself?*',
  caught: { x: 830, y: 1150, r: 150, label: 'YOUR PLANS', arrow: 'tl' },
  product: 'DO NOT|DISTURB: ME', sub: 'door hanger, one size', icon: 'zz', col: '#2f9a6a', col2: '#ffd1e6', burst: ['#ff8fb1', '#2fbf8a'],
  tip: 'plans with yourself count. keep them.',
  quote: 'you KEPT your plans',
  fine: '*“NOT TONIGHT” IS A COMPLETE SENTENCE. SAY IT KINDLY.',
  last: 'You’re a plan | *worth keeping.*',
  before(x, t, S) {
    tub(x, t)
    sign(x, 830, 1190, 0.5 + t * 0.9)
    bubble(x, t, 760, 760, -1, 99, 'can you help me move a couch tonight?', { size: 30, maxW: 380 })
    motion(x, t, 420, 960, { r0: 160, r1: 220, n: 10 })
    S.hero(x, t, { x: 420, y: 960 - 40 * Math.sin(t * 4), s: 270, mood: 'wide', look: [1, -0.5], rot: 0.35 })
    label(x, 'YES!!', 300, 760, { size: 72, col: BONE, rot: -0.12 })
  },
  after(x, t, S) {
    const u = S.u
    tub(x, t)
    sign(x, 860, 1040, -0.04, 'BUSY: ME')
    S.hero(x, t, { x: 420, y: 1090, s: 240, mood: u > 0.5 ? 'happy' : 'sparkle', look: [1, 0], hops: [S.T.after + 0.5] })
    block(x, 520, 1040, 90, 60, '#ffd23a', { bw: 5 })
    bubble(x, t, 420, 830, S.T.after + 0.3, S.T.D + 1, 'can’t tonight! free saturday?', { size: 34, maxW: 380 })
  },
  afterCues: [['pop', 0.3, 880, 0.04, -0.3], ['pluck', 0.5, 1174.66, 0.04, 0.6, 0]],
})
export const DURATION = AD.DURATION, SCENES = AD.SCENES, CUES = AD.CUES, MUSIC = AD.music
void [star, prog, ease, YEL]
