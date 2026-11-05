// kfae20: FAKE AD, ""We should hang out sometime"" (9 s trial reel, house · Gm, hard cut). Row: m31.md
//   0     B&W: Gemini mid-wave as a "sometime!!" bubble floats off forever, calendar pages flying; hook "“We should hang
//         out *sometime*”?"   0.55 freeze, caught on the bubble: WHEN??   1.45 colour: THE ACTUAL DAY (one circled square)
//   tip "name a day, a time and a place."   demo: "thursday? 7? the noodle place?" "YES. it’s a plan."
//   Pisces sobs "a PLAN!!".   last line, hard cut.
import { makeAd, star, bubble, drawPhone, chat, motion, label, block, R, prog, ease, BONE, INK, RED, YEL, INTER } from '../../kfae01/adkit.js'

function page(x, cx, cy, rot, n) { x.save(); x.translate(cx, cy); x.rotate(rot); block(x, -70, -80, 140, 160, '#ffffff', { bw: 5, hi: null }); R(x, RED, -70, -80, 140, 34); x.font = `900 54px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(String(n), 0, 20); x.restore() }
function cal(x, t, cx, cy, k) { if (k <= 0.01) return; x.save(); x.translate(cx, cy); x.scale(k, k); block(x, -200, -170, 400, 340, '#ffffff', { bw: 7, hi: null }); R(x, RED, -200, -170, 400, 56); x.font = `900 34px ${INTER}`; x.fillStyle = '#fff'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THIS WEEK', 0, -142); const D = ['M', 'T', 'W', 'T', 'F']; D.forEach((d, i) => { x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.fillText(d, -150 + i * 75, -70); R(x, '#e2dccc', -180 + i * 75, -40, 60, 150) }); x.strokeStyle = RED; x.lineWidth = 9; x.beginPath(); x.ellipse(-150 + 3 * 75, 35, 52, 96, 0, 0, Math.PI * 2 * Math.min(1, k * 1.2)); x.stroke(); x.restore() }
const AD = makeAd({
  id: 'kfae20', sign: 'gemini', dur: 9, ending: 'cut', style: 'house', key: 'Gm', seed: 3120,
  hook: '“We should hang out | *sometime*”?',
  caught: { x: 760, y: 720, r: 150, label: 'WHEN??', arrow: 'bl' },
  product: 'THE ACTUAL|DAY', sub: 'one circled square', icon: 'cal', col: '#ff4f6d', col2: '#ffffff', burst: ['#ff2f5a', '#2fbf8a'],
  tip: 'name a day, a time and a place.',
  quote: 'a PLAN!!',
  fine: '*“SOMETIME” IS NOT ON ANY CALENDAR.',
  last: '“Sometime” | *never comes.* | Thursday does.',
  lastSize: 88,
  before(x, t, S) {
    for (let i = 0; i < 4; i++) page(x, 180 + i * 230 + 40 * Math.sin(t * 3 + i), 1350 - ((t * 400 + i * 160) % 700), Math.sin(t * 4 + i) * 0.6, 12 + i * 7)
    bubble(x, t, 760 + 40 * t, 720 - 120 * t, -1, 99, 'sometime!!', { size: 44 })
    motion(x, t, 400, 1080, { r0: 160, r1: 220, n: 10 })
    S.hero(x, t, { x: 400, y: 1080, s: 290, mood: 'happy', look: [1, -1], rot: 0.3 * Math.sin(t * 14) })
  },
  after(x, t, S) {
    const u = S.u
    cal(x, t, 330, 1060, ease.outBack(prog(t, S.T.after, S.T.after + 0.35)) * 0.85)
    drawPhone(x, 790, 1000, { w: 360, h: 460, rot: 0.04, t, screen: (c, W, H, tt) => chat(c, tt, W, H, [
      { side: 'R', text: 'thursday? 7? the noodle place?', at: S.T.after + 0.3 },
      { side: 'L', text: 'YES. it’s a plan.', at: S.T.after + 0.85 },
    ], { size: 30 }) })
    S.hero(x, t, { x: 330, y: 1330, s: 170, mood: u > 0.85 ? 'sparkle' : 'happy', look: [1, -0.4], hops: [S.T.after + 0.9] })
  },
  afterCues: [['pop', 0.0, 659.25, 0.04, -0.3], ['pop', 0.3, 880, 0.04, 0.3], ['pop', 0.85, 1318.51, 0.05, 0.3]],
})
export const DURATION = AD.DURATION, SCENES = AD.SCENES, CUES = AD.CUES, MUSIC = AD.music
void [star, label, BONE, YEL]
