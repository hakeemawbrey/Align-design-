// og-kfae01: social rework (static HOOK box over a longer, slower BEFORE beat; no bug, no slam title, no shakes, gentler
// whip; 12 s story). Was: FAKE AD, "Overthink every text? Try asking" (10 s vertical trial reel, music: funk · A). Row: promo/films/month2/m31.md
//   0.00  frame 0 (thumbnail): B&W BEFORE footage, Virgo mid-spiral, draft bubbles flying, the phone mid-air;
//         hook "Do YOU overthink | *every text?*" slammed.
//   0.55  record scratch + freeze ("sound *familiar?*"), caught circle: DRAFT #41.
//   1.45  whip zoom + flash into the infomercial set: INTRODUCING… JUST ASK™ slams in, opens: “hey, what did you mean?”
//   4.07  demo: Virgo sends it, the reply pops ("oh! I meant I want to see you again"), Virgo melts.
//   6.45  Pisces testimonial, fountaining: "it changed my LIFE".   7.8 fine print.   8.14 last line, hard cut at 10.
import { makeAd, star, bubble, drawPhone, chat, motion, flyer, hearts, sparkles, ICON, bits, ICOL, label, lerp, prog, ease, BONE, YEL } from '../adkit.js'

const DRAFTS = ['hey!', 'heyyy', 'hi :)', 'so about earlier', 'ok but', 'nvm', 'haha', 'wait', 'lol ok', 'hey (final v9)']
const AD = makeAd({
  id: 'og-kfae01', sign: 'virgo', dur: 12,
  times: { freeze: 1.6, flip: 3.0, intro: 3.04, box: 3.3, open: 4.15, tip: 4.27, after: 5.62 }, ending: 'cut', style: 'funk', key: 'A', seed: 3101,
  hook: 'Do YOU overthink | *every text?*',
  caught: { x: 811, y: 712, r: 150, label: 'DRAFT #41', arrow: 'bl' },
  product: 'JUST ASK™', sub: 'one honest question', icon: 'bubble', col: '#ff4f6d', col2: '#ffd23a',
  tip: '“hey, what did you mean by that?”',
  quote: 'I cried. TWICE. it changed my LIFE',
  fine: '*PRICE: FREE. SIDE EFFECTS: SLEEP.',
  last: 'One question beats | *forty drafts.*',
  before(x, t, S) {
    // the spiral: Virgo spins mid-panic, drafts orbit and fly off
    for (let i = 0; i < DRAFTS.length; i++) {
      const a = t * 2.4 + i * (Math.PI * 2 / DRAFTS.length), r = 300 + 40 * Math.sin(t * 3 + i)
      bubble(x, t, 540 + Math.cos(a) * r, 1040 + Math.sin(a) * r * 0.9, -1, 99, DRAFTS[i], { size: 30, maxW: 300 })
    }
    motion(x, t, 540, 1040, { r0: 190, r1: 260, n: 16 })
    S.hero(x, t, { mood: 'wide', look: [Math.sin(t * 7), -0.5], rot: Math.sin(t * 8) * 0.25 + 0.15 })
    // the phone, mid-air
    flyer(x, t, tt => ({ x: 800 + 30 * Math.sin(tt * 5), y: 760 - 60 * Math.sin(tt * 4), rot: 0.5 + tt * 2.2 }),
      xx => drawPhone(xx, 0, 0, { w: 170, h: 300, screen: (c, W, H) => { c.fillStyle = '#4f7cff'; c.fillRect(10, H - 70, W - 20, 50) } }))
  },
  after(x, t, S) {
    const u = S.u
    S.hero(x, t, { x: 330, y: 1060, s: 300, mood: u > 1.0 ? 'heart' : 'happy', look: [1, 0], hops: [S.T.after + 0.1, S.T.after + 1.0] })
    drawPhone(x, 740, 900, { w: 400, h: 500, rot: 0.05, k: ease.outBack(prog(t, S.T.after, S.T.after + 0.3)), t, screen: (c, W, H, tt) => chat(c, tt, W, H, [
      { side: 'R', text: 'hey, what did you mean by that?', at: S.T.after + 0.25 },
      { side: 'L', text: 'oh! I meant I want to see you again', at: S.T.after + 0.95 },
    ], { size: 34 }) })
    hearts(x, t, 330, 900, S.T.after + 1.0, { n: 5 })
  },
  afterCues: [['pop', 0.25, 880, 0.04, 0.3], ['pop', 0.95, 1174.66, 0.05, 0.3], ['pluck', 1.0, 1567.98, 0.04, 0.5, -0.2]],
})
export const HOOK = 'Typing “hey” for | *45 minutes* straight.'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.95
export const DURATION = AD.DURATION
export const SCENES = AD.SCENES
export const CUES = AD.CUES
export const MUSIC = AD.music
void [star, sparkles, ICON, bits, ICOL, label, lerp, BONE, YEL]
