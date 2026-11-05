// kfae02: FAKE AD, "Left on read? The Phone Down" (9 s trial reel, pop · C, loops). Row: promo/films/month2/m31.md
//   0     B&W: Gemini mid-lunge at a phone face-up on the table, "Read 9:41 PM" glowing; hook "Left on read… *again?*"
//   0.55  scratch + freeze, caught circle on the phone: READ 9:41.   1.45 whip into colour: THE PHONE DOWN (a velvet pillow)
//   tip: "phone face down. go live your evening."   demo: the phone sleeps face down on its pillow, Gemini laughs over a
//   board game with Sagittarius.   Pisces sobs "I finished a whole BOOK".   last line, then eases back into frame 0.
import { makeAd, star, bubble, drawPhone, chat, motion, hearts, sparkles, label, R, block, prog, ease, BONE, YEL, INK, MONO } from '../../kfae01/adkit.js'

function table(x) { block(x, 120, 1260, 840, 40, '#8a5a3c'); R(x, INK, 180, 1300, 26, 300); R(x, INK, 874, 1300, 26, 300) }
function pillow(x, cx, cy, k = 1) { x.save(); x.translate(cx, cy); x.scale(k, k); block(x, -170, -40, 340, 80, '#b0306a', { bw: 7, hi: 'rgba(255,255,255,0.3)' }); for (const d of [-1, 1]) { R(x, YEL, d * 170 - 10, -46, 20, 20); R(x, YEL, d * 170 - 10, 26, 20, 20) } x.restore() }
const AD = makeAd({
  id: 'kfae02', sign: 'gemini', dur: 9, ending: 'loop', style: 'pop', key: 'C', seed: 3102,
  hook: 'Left on read… | *again?*',
  caught: { x: 760, y: 1170, r: 150, label: 'READ 9:41', arrow: 'tl' },
  product: 'THE PHONE|DOWN', sub: 'velvet pillow included', icon: 'zz', col: '#3a6cff', col2: '#ffd23a', burst: ['#ff2f8a', '#7a3cff'],
  tip: 'phone face down. go live your evening.',
  quote: 'I finished a whole BOOK',
  fine: '*REPLIES ARRIVE OR THEY DON’T. YOUR NIGHT IS STILL YOURS.',
  last: 'Your night isn’t | *on hold.*',
  before(x, t, S) {
    table(x)
    drawPhone(x, 760, 1170, { w: 220, h: 170 * 2.1, rot: -0.12 + 0.03 * Math.sin(t * 20), glow: 1, screen: (c, W, H) => {
      chat(c, 9, W, H, [{ side: 'R', text: 'so are we still on for friday?', at: 0 }], { size: 22, read: { at: 0, text: 'Read 9:41 PM' } })
    } })
    motion(x, t, 380, 980, { r0: 170, r1: 250, n: 12 })
    S.hero(x, t, { x: 380, y: 980, s: 310, mood: 'wide', look: [1, 0.6], rot: 0.35 + 0.05 * Math.sin(t * 14) })
  },
  after(x, t, S) {
    const u = S.u
    table(x)
    pillow(x, 820, 1230, 0.7); drawPhone(x, 820, 1196, { w: 200, h: 90, k: 1 })
    label(x, 'FACE DOWN', 820, 1120, { size: 30, col: YEL, k: ease.outBack(prog(t, S.T.after + 0.2, S.T.after + 0.5)) })
    // the board game
    block(x, 300, 1200, 300, 50, '#2f9a6a'); for (let i = 0; i < 6; i++) R(x, i % 2 ? BONE : '#ff4f6d', 312 + i * 48, 1210, 36, 30)
    S.hero(x, t, { x: 300, y: 1060, s: 260, mood: u > 0.6 ? 'happy' : 'sparkle', look: [1, 0], hops: [S.T.after + 0.6, S.T.after + 1.5, S.T.after + 2.4] })
    star(x, t, { sign: 'sagittarius', x: 590, y: 1070, s: 220, mood: 'happy', look: [-1, 0], seed: 8, hops: [S.T.after + 0.7, S.T.after + 1.6] })
    bubble(x, t, 450, 860, S.T.after + 0.6, S.T.D + 1, 'your turn!!', { size: 38 })
    sparkles(x, t, 450, 1220, S.T.after + 0.65, 8, 120, 2)
  },
  afterCues: [['pop', 0.6, 987.77, 0.04, -0.2], ['clap', 0.62, { gain: 0.1 }], ['pop', 1.5, 1174.66, 0.03, 0.2]],
})
export const DURATION = AD.DURATION, SCENES = AD.SCENES, CUES = AD.CUES, MUSIC = AD.music
void [hearts, MONO]
