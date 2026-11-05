// kfae03: FAKE AD, "Scared to double text?" (8 s trial reel, chiptune · E, hard cut). Row: promo/films/month2/m31.md
//   0     B&W: Aries mid-faint backwards, thumb over SEND on a second text; hook "Scared to *double text?*"
//   0.55  freeze, caught circle on SEND: TEXT #2.   1.45 colour: ONE KIND FOLLOW-UP (one envelope in a huge box)
//   tip "“no rush! just checking this didn’t get buried”"   demo: Aries sends it once, a happy reply lands.
//   Pisces sobs "so BRAVE".   last line, hard cut.
import { makeAd, star, bubble, drawPhone, chat, motion, hearts, label, R, prog, ease, BONE, RED, INTER } from '../../kfae01/adkit.js'

const AD = makeAd({
  id: 'kfae03', sign: 'aries', dur: 8, ending: 'cut', style: 'chiptune', key: 'E', seed: 3103,
  hook: 'Scared to | *double text?*',
  caught: { x: 760, y: 1180, r: 120, label: 'TEXT #2', arrow: 'tl' },
  product: 'ONE KIND|FOLLOW-UP', sub: 'only one per box', icon: 'envelope', col: '#ff8a2f', col2: '#fff1a8', burst: ['#ff2f5a', '#ffb02f'],
  tip: '“no rush! just checking this didn’t get buried”',
  tipSize: 54,
  quote: 'so BRAVE',
  fine: '*ONE FOLLOW-UP. AFTER THAT, SILENCE IS AN ANSWER TOO.',
  last: 'One follow-up. | *Then let it be.*',
  before(x, t, S) {
    drawPhone(x, 760, 1000, { w: 380, h: 600, rot: 0.06, glow: 0.8, screen: (c, W, H) => {
      chat(c, 9, W, H - 110, [{ side: 'R', text: 'had so much fun today!', at: 0 }], { size: 30 })
      R(c, '#2a2148', 0, H - 110, W, 110); R(c, '#3a3260', 14, H - 94, W - 140, 78)
      c.font = `600 26px ${INTER}`; c.fillStyle = BONE; c.textBaseline = 'middle'; c.fillText('hey again!!', 30, H - 55)
      const pulse = 1 + 0.08 * Math.sin(9 * 6)
      c.save(); c.translate(W - 62, H - 55); c.scale(pulse, pulse); R(c, RED, -46, -36, 92, 72); c.font = `800 22px ${INTER}`; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('SEND', 0, 2); c.restore()
    } })
    motion(x, t, 300, 1080, { r0: 160, r1: 230, n: 10 })
    S.hero(x, t, { x: 300, y: 1080, s: 300, mood: 'wide', look: [1, -0.3], rot: -0.6 - 0.15 * Math.sin(t * 6) })
  },
  after(x, t, S) {
    const u = S.u
    drawPhone(x, 760, 1000, { w: 400, h: 520, rot: 0.04, t, screen: (c, W, H, tt) => chat(c, tt, W, H, [
      { side: 'R', text: 'had so much fun today!', at: 0 },
      { side: 'R', text: 'no rush! just checking this didn’t get buried', at: S.T.after + 0.2 },
      { side: 'L', text: 'omg it DID get buried. yes!! saturday?', at: S.T.after + 0.9 },
    ], { size: 30 }) })
    S.hero(x, t, { x: 290, y: 1060, s: 290, mood: u > 0.9 ? 'sparkle' : 'happy', look: [1, 0], hops: [S.T.after + 0.95] })
    hearts(x, t, 290, 900, S.T.after + 0.95, { n: 4 })
  },
  afterCues: [['pop', 0.2, 880, 0.04, 0.3], ['pop', 0.9, 1318.51, 0.05, 0.3]],
})
export const DURATION = AD.DURATION, SCENES = AD.SCENES, CUES = AD.CUES, MUSIC = AD.music
void [star, bubble, label, prog, ease]
