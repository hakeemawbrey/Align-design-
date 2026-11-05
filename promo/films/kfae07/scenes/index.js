// kfae07: FAKE AD, "Great advice for everyone but you" (9 s trial reel, house · D, hard cut). Row: promo/films/month2/m31.md
//   0     B&W: Leo mid-lecture on a phone call, pointer stick on a whiteboard (ADVICE 101), a little "…and me?" thought
//         bubble getting swatted away; hook "Great advice. | *For everyone else.*"   0.55 freeze, caught on the bubble.
//   1.45  colour: THE MIRROR SWITCH.   tip "talk to yourself like you’d talk to your best friend."   demo: the mirror
//   Leo says "you need rest too." Leo: "…ok. I’ll rest."   Pisces sobs "you deserve it TOO".   last line, hard cut.
import { makeAd, star, bubble, drawPhone, motion, label, block, R, prog, ease, BONE, INK, RED, YEL, INTER } from '../../kfae01/adkit.js'

function board(x) { block(x, 560, 640, 440, 300, '#f4f4ec', { bw: 7, hi: null }); x.font = `900 40px ${INTER}`; x.fillStyle = RED; x.textAlign = 'center'; x.fillText('ADVICE 101', 780, 700); x.fillStyle = INK; x.font = `700 28px ${INTER}`; ['1. rest', '2. say no', '3. you matter'].forEach((l, i) => x.fillText(l, 780, 760 + i * 52)) }
function mirror(x, cx, cy) { block(x, cx - 170, cy - 260, 340, 520, '#c9a24a', { bw: 8 }); R(x, '#9fd8f0', cx - 145, cy - 235, 290, 470); x.save(); x.globalAlpha = 0.35; R(x, '#ffffff', cx - 120, cy - 220, 30, 200); x.restore() }
const AD = makeAd({
  id: 'kfae07', sign: 'leo', dur: 9, ending: 'cut', style: 'house', key: 'D', seed: 3107,
  hook: 'Great advice. | *For everyone else.*',
  caught: { x: 290, y: 760, r: 130, label: 'ME??', arrow: 'br' },
  product: 'THE MIRROR|SWITCH', sub: 'flip it. be your own friend.', icon: 'spark', col: '#ffb02f', col2: '#fff1a8', burst: ['#ff7a2f', '#ffd23a'],
  tip: 'talk to yourself like you’d talk to your best friend.',
  quote: 'you deserve it TOO',
  fine: '*SIDE EFFECTS: ACTUALLY RESTING.',
  last: 'Take your *own* advice. | It’s good.',
  before(x, t, S) {
    board(x)
    bubble(x, t, 290 + 20 * Math.sin(t * 12), 760 - 30 * t, -1, 99, '…and me?', { size: 32 })
    motion(x, t, 420, 1100, { r0: 170, r1: 230, n: 10 })
    S.hero(x, t, { x: 420, y: 1100, s: 300, mood: 'sparkle', look: [1, -0.4], rot: 0.15 * Math.sin(t * 11) })
    x.save(); x.translate(560, 1000); x.rotate(-0.9 + 0.3 * Math.sin(t * 12)); R(x, INK, -6, -180, 12, 190); R(x, '#a07850', -3, -176, 6, 182); x.restore()
    drawPhone(x, 250, 1300, { w: 130, h: 220, rot: -0.3 })
  },
  after(x, t, S) {
    const u = S.u
    mirror(x, 760, 1050)
    star(x, t, { sign: 'leo', x: 760, y: 1070, s: 230, mood: 'happy', look: [-1, 0], seed: 4, alpha: 0.85 })
    S.hero(x, t, { x: 320, y: 1070, s: 270, mood: u > 1.0 ? 'happy' : 'wide', look: [1, 0], hops: [S.T.after + 1.0] })
    bubble(x, t, 760, 760, S.T.after + 0.2, S.T.D + 1, 'you need rest too.', { size: 36, col: '#c9f2ff' })
    bubble(x, t, 330, 830, S.T.after + 1.0, S.T.D + 1, '…ok. I’ll rest.', { size: 36 })
  },
  afterCues: [['bell', 0.2, 1567.98, 0.03, 0.8, 0.3], ['pop', 1.0, 880, 0.04, -0.3]],
})
export const DURATION = AD.DURATION, SCENES = AD.SCENES, CUES = AD.CUES, MUSIC = AD.music
void [label, prog, ease, BONE, YEL]
