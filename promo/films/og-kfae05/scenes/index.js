// og-kfae05: social rework (static HOOK over a longer, slower BEFORE beat; no bug, no slam title, no shakes,
// gentler whip, hard cut on the last line; crazier lines). Was: kfae05: FAKE AD, "The 2 a.m. scroll" (10 s trial reel, synthwave · Fm, loops). Row: promo/films/month2/m31.md
//   0     B&W: Scorpio in bed mid-scroll at 2:07, the phone glow on its face, a profile photo; hook "Still scrolling them
//         *at 2 a.m.?*"   0.55 freeze, caught on the clock: 2:07 AM.   1.45 colour: SLEEP MODE FOR FEELINGS (tiny blanket)
//   tip "phone across the room. the feeling waits till morning."   demo: the phone charges across the room, Scorpio
//   sleeps, the moon slides down.   Pisces sobs "I SLEPT".   last line, then eases back into frame 0.
import { makeAd, star, drawPhone, motion, label, block, R, prog, ease, lerp, BONE, YEL, INK, MONO, INTER } from '../adkit.js'

function bed(x, k = 1) { block(x, 120, 1180, 840, 120, '#6a4a8a'); R(x, INK, 140, 1300, 30, 160); R(x, INK, 910, 1300, 30, 160); block(x, 150, 1110, 220, 80, BONE, { bw: 6 }) }
function clock(x, cx, cy, txt) { block(x, cx - 150, cy - 60, 300, 120, '#1a1230'); x.font = `700 74px ${MONO}`; x.fillStyle = '#ff3b4e'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, cx, cy + 4) }
const AD = makeAd({
  id: 'og-kfae05', sign: 'scorpio', dur: 12,
  times: { freeze: 1.6, flip: 3.0, intro: 3.04, box: 3.3, open: 4.15, tip: 4.27, after: 5.62 }, ending: 'cut', style: 'synthwave', key: 'Fm', seed: 3105,
  hook: 'Still scrolling them | *at 2 a.m.?*',
  caught: { x: 810, y: 640, r: 170, label: '2:07 AM', arrow: 'bl' },
  product: 'SLEEP MODE|FOR FEELINGS', sub: 'tiny blanket included', icon: 'zz', col: '#3a6cff', col2: '#c9a6ff', burst: ['#7a3cff', '#ff2f8a'],
  tip: 'phone across the room. the feeling waits till morning.',
  quote: 'I SLEPT. NINE HOURS. I’m a NEW fish',
  fine: '*THE FEELING WILL STILL BE THERE AT BREAKFAST. SMALLER.',
  last: 'The feeling waits. | *It’s smaller by morning.*',
  lastSize: 84,
  before(x, t, S) {
    clock(x, 810, 640, '2:07')
    label(x, 'their cousin’s wedding, 2019', 420, 540, { size: 32, col: BONE, rot: -0.03 })
    bed(x)
    S.hero(x, t, { x: 460, y: 1060, s: 300, mood: 'wide', look: [1, -0.2], rot: -0.15 })
    // the glow + the scroll
    x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(640, 980, 10, 640, 980, 300); g.addColorStop(0, 'rgba(200,230,255,0.35)'); g.addColorStop(1, 'rgba(200,230,255,0)'); x.fillStyle = g; x.fillRect(300, 680, 700, 600); x.restore()
    drawPhone(x, 690, 990, { w: 170, h: 290, rot: -0.2, screen: (c, W, H) => { const off = (t * 900) % 160; for (let i = -1; i < 4; i++) { R(c, '#3a3260', 10, i * 160 + off, W - 20, 130); R(c, '#9a7be0', 24, i * 160 + off + 14, 60, 60) } } })
    motion(x, t, 690, 990, { r0: 160, r1: 210, n: 8, alpha: 0.7 })
  },
  after(x, t, S) {
    const u = S.u
    bed(x)
    // the phone charging across the room
    block(x, 820, 1000, 120, 26, '#2a2148'); drawPhone(x, 880, 920, { w: 110, h: 180, rot: 0 })   // og: nudged left of the app buttons
    R(x, '#5a5470', 876, 1012, 8, 300); label(x, 'CHARGING. FAR AWAY.', 820, 790, { size: 26, col: '#7dffb0' })
    { const mx = lerp(200, 300, prog(t, S.T.after, S.D)), my = lerp(700, 860, prog(t, S.T.after, S.D)); x.save(); x.beginPath(); x.arc(mx, my, 46, 0, Math.PI * 2); x.clip(); x.globalAlpha = 0.8; x.fillStyle = YEL; x.beginPath(); x.arc(mx, my, 46, 0, Math.PI * 2, false); x.moveTo(mx + 22 + 42, my - 12); x.arc(mx + 22, my - 12, 42, 0, Math.PI * 2, true); x.fill(); x.restore() }   // og: drawn moon, no glyph
    S.hero(x, t, { x: 420, y: 1090, s: 290, mood: u > 0.4 ? 'sleepy' : 'happy', rot: -1.35 })
    block(x, 300, 1150, 380, 70, '#ff8fb1', { bw: 6 })
  },
  afterCues: [['pluck', 0.3, 659.25, 0.03, 0.8, 0], ['pluck', 0.6, 587.33, 0.03, 0.8, 0]],
})
export const HOOK = "Scrolled to 2019 | *on their profile.*"
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.95
export const DURATION = AD.DURATION, SCENES = AD.SCENES, CUES = AD.CUES, MUSIC = AD.music
void [star, ease, BONE, INTER]
