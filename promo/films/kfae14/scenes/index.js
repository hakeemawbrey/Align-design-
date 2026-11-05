// kfae14: FAKE AD, "Waiting for them to text first" (9 s trial reel, funk · Bb, hard cut). Row: m31.md
//   0     B&W: Leo mid-stare at a silent phone, a cobweb grown between them, "DAY 3"; hook "Waiting for them | *to text
//         first?*"   0.55 freeze, caught on the cobweb.   1.45 colour: THE FIRST MOVE (one button, it says HI)
//   tip "just text first: “hey! was thinking of you.”"   demo: the reply pings back in a second.
//   Pisces sobs "SO romantic".   last line, hard cut.
import { makeAd, star, drawPhone, chat, motion, hearts, label, block, R, prog, ease, BONE, INK, RED, YEL, INTER } from '../../kfae01/adkit.js'

function web(x, cx, cy, r) { x.save(); x.strokeStyle = 'rgba(239,230,214,0.85)'; x.lineWidth = 3; for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); x.stroke() } for (let k = 1; k <= 3; k++) { x.beginPath(); for (let i = 0; i <= 8; i++) { const a = i * Math.PI / 4; x.lineTo(cx + Math.cos(a) * r * k / 3, cy + Math.sin(a) * r * k / 3) } x.stroke() } x.restore() }
function hiButton(x, cx, cy, press) { x.save(); x.translate(cx, cy); block(x, -120, 20, 240, 50, '#5a5470'); x.fillStyle = INK; x.beginPath(); x.ellipse(0, 20 - 8 + press * 16, 112, 56, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = RED; x.beginPath(); x.ellipse(0, 14 + press * 16, 104, 48, 0, 0, Math.PI * 2); x.fill(); x.font = `900 52px ${INTER}`; x.fillStyle = '#fff'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('HI', 0, 14 + press * 16); x.restore() }
const AD = makeAd({
  id: 'kfae14', sign: 'leo', dur: 9, ending: 'cut', style: 'funk', key: 'Bb', seed: 3114,
  hook: 'Waiting for them | *to text first?*',
  caught: { x: 640, y: 1150, r: 120, label: 'COBWEB', arrow: 'tl' },
  product: 'THE FIRST|MOVE', sub: 'one button. it says hi.', icon: 'spark', col: '#ff4f6d', col2: '#ffd23a', burst: ['#ff2f5a', '#ffb02f'],
  tip: 'just text first: “hey! was thinking of you.”',
  quote: 'SO romantic',
  fine: '*BOTH OF YOU WERE WAITING. SOMEBODY HAD TO GO FIRST.',
  last: 'Somebody goes first. | *Why not you?*',
  before(x, t, S) {
    drawPhone(x, 640, 1150, { w: 220, h: 360, rot: 0.1, screen: (c, W, H) => { c.fillStyle = '#3a3260'; c.fillRect(0, 0, W, H); c.font = `800 26px ${INTER}`; c.fillStyle = BONE; c.textAlign = 'center'; c.fillText('no new', W / 2, H / 2 - 16); c.fillText('messages', W / 2, H / 2 + 18) } })
    web(x, 640, 1150, 150)
    label(x, 'DAY 3', 830, 760, { size: 70, col: BONE, rot: 0.08 })
    S.hero(x, t, { x: 360, y: 1040, s: 300, mood: 'wide', look: [1, 1], blink: false })
    motion(x, t, 360, 1040, { r0: 170, r1: 200, n: 6, alpha: 0.5 })
  },
  after(x, t, S) {
    const u = S.u
    hiButton(x, 300, 1260, u > 0.15 && u < 0.35 ? 1 : 0)
    S.hero(x, t, { x: 300, y: 1020, s: 250, mood: u > 0.7 ? 'heart' : 'sparkle', look: [1, 0], hops: [S.T.after + 0.15, S.T.after + 0.75] })
    drawPhone(x, 760, 1000, { w: 400, h: 480, rot: 0.04, t, screen: (c, W, H, tt) => chat(c, tt, W, H, [
      { side: 'R', text: 'hey! was thinking of you', at: S.T.after + 0.2 },
      { side: 'L', text: 'omg I was JUST about to text you', at: S.T.after + 0.7 },
    ], { size: 32 }) })
    hearts(x, t, 300, 860, S.T.after + 0.75, { n: 5 })
  },
  afterCues: [['tom', 0.18, 140, { gain: 0.2, decay: 0.15 }], ['pop', 0.2, 880, 0.04, 0.3], ['pop', 0.7, 1318.51, 0.05, 0.3]],
})
export const DURATION = AD.DURATION, SCENES = AD.SCENES, CUES = AD.CUES, MUSIC = AD.music
void [star, R, prog, ease, YEL]
