// kfae06: FAKE AD, "Missing your ex at the worst moment" (10 s trial reel, dreamy · Ab, hard cut). Row: m31.md
//   0     B&W: Cancer mid-sob at the open fridge, holding an old takeaway menu with a heart drawn on it; hook "Missing
//         your ex *at the fridge?*"   0.55 freeze, caught on the menu: EXHIBIT A.   1.45 colour: THE FEELING HOLDER (a mug)
//   tip "feel it. don’t act on it tonight. call a friend."   demo: a friend calls ("I’m coming over. bringing soup."),
//   Cancer laughs with the mug.   Pisces sobs louder than Cancer did.   last line, hard cut.
import { makeAd, star, bubble, drawPhone, motion, label, block, R, bits, ICON, ICOL, prog, ease, BONE, INK, RED, INTER } from '../../kfae01/adkit.js'

function fridge(x, open) { block(x, 600, 640, 380, 820, '#d8dde6', { bw: 8, hi: null }); R(x, INK, 600, 1000, 380, 8); if (open) { R(x, '#fff8d8', 620, 660, 340, 330); R(x, '#c9bfae', 620, 820, 340, 10); block(x, 660, 880, 70, 100, '#7dffb0'); block(x, 780, 900, 120, 80, '#ff8fb1') } }
function menu(x, cx, cy, rot) { x.save(); x.translate(cx, cy); x.rotate(rot); block(x, -90, -120, 180, 240, '#fff1c8', { bw: 6, hi: null }); x.font = `800 26px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText('NOODLES', 0, -80); for (let i = 0; i < 4; i++) R(x, '#c9bfae', -60, -50 + i * 30, 120, 10); bits(x, ICON.heart, 30, 80, 7); x.restore() }
const AD = makeAd({
  id: 'kfae06', sign: 'cancer', dur: 10, ending: 'cut', style: 'dreamy', key: 'Ab', seed: 3106,
  hook: 'Missing your ex | *at the fridge?*',
  caught: { x: 330, y: 900, r: 140, label: 'EXHIBIT A', arrow: 'br' },
  product: 'THE FEELING|HOLDER', sub: 'holds any feeling. hot.', icon: 'mug', col: '#ff4f6d', col2: '#fff1a8', burst: ['#ff2f8a', '#ff9a4a'],
  tip: 'feel it. don’t act on it tonight. call a friend.',
  quote: 'I’m crying MORE than Cancer',
  fine: '*MISSING SOMEONE IS NORMAL. MIDNIGHT TEXTS ARE OPTIONAL.', recTop: 1580,
  last: 'Missing them is allowed. | *Texting can wait.*',
  lastSize: 80,
  before(x, t, S) {
    fridge(x, true)
    S.hero(x, t, { x: 400, y: 1110, s: 300, mood: 'wide', look: [1, -0.5], tears: 3, rot: 0.1 * Math.sin(t * 9) })
    menu(x, 330, 900, -0.2 + 0.08 * Math.sin(t * 8))
    motion(x, t, 400, 1080, { r0: 170, r1: 220, n: 8 })
  },
  after(x, t, S) {
    const u = S.u
    S.hero(x, t, { x: 330, y: 1080, s: 290, mood: u > 0.9 ? 'happy' : 'neutral', look: [1, 0], hops: [S.T.after + 0.9, S.T.after + 1.3] })
    bits(x, ICON.mug, 470, 1120, 12, { ...ICOL, H: '#c98a4a' })
    drawPhone(x, 790, 960, { w: 300, h: 460, rot: 0.05, k: ease.outBack(prog(t, S.T.after + 0.1, S.T.after + 0.4)), screen: (c, W, H) => {
      c.fillStyle = '#7dffb0'; c.font = `800 30px ${INTER}`; c.textAlign = 'center'; c.fillText('BEST FRIEND', W / 2, 80); c.fillStyle = BONE; c.font = `600 24px ${INTER}`; c.fillText('calling…', W / 2, 120)
      R(c, '#2fbf6a', W / 2 - 50, H - 120, 100, 80)
    } })
    bubble(x, t, 700, 680, S.T.after + 0.5, S.T.D + 1, 'I’m coming over. bringing soup.', { size: 34, maxW: 380, col: '#c9f2d4' })
  },
  afterCues: [['bell', 0.15, 1318.51, 0.03, 0.4, 0.3], ['bell', 0.4, 1318.51, 0.03, 0.4, 0.3], ['pop', 0.5, 880, 0.04, 0.3]],
})
export const DURATION = AD.DURATION, SCENES = AD.SCENES, CUES = AD.CUES, MUSIC = AD.music
void [star, motion, label, RED]
