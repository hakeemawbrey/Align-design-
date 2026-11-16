// og-kfae15: social rework (static HOOK outline over a longer, slower BEFORE beat; no bug, no slam title, no shakes,
// gentler whip; 12 s story; Libra judging every take). Was: kfae15: FAKE AD, "The voice note, take nine" (10 s trial reel, house · Am, hard cut). Row: m31.md
//   0     B&W: Libra mid-recording into a phone mic, a clapperboard TAKE 9 snapping, deleted takes flying; hook
//         "Recorded that voice note | *nine times?*"   0.55 freeze, caught on the clapperboard.   1.45 colour: TAKE ONE™
//   tip "send the first take. the “um”s are cute."   demo: the imperfect voice note goes ("um… hi!"), a laughing reply
//   lands.   Pisces sobs "the um was CUTE".   last line, hard cut.
import { makeAd, star, bubble, drawPhone, chat, motion, label, block, R, prog, ease, BONE, INK, RED, YEL, INTER, MONO } from '../adkit.js'

function clapper(x, cx, cy, open, txt) { x.save(); x.translate(cx, cy); block(x, -140, -40, 280, 170, '#2a2148'); x.font = `900 46px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 50); x.save(); x.translate(-140, -40); x.rotate(-open); block(x, 0, -44, 280, 40, BONE, { bw: 6, hi: null }); for (let i = 0; i < 5; i++) { x.save(); x.translate(20 + i * 56, -44); x.transform(1, 0, -0.5, 1, 0, 0); R(x, INK, 0, 0, 26, 40); x.restore() } x.restore(); x.restore() }
function wave(x, cx, cy, w, t, col) { for (let i = 0; i < 16; i++) { const h = 12 + 40 * Math.abs(Math.sin(t * 8 + i * 1.3)); R(x, col, cx - w / 2 + i * (w / 16), cy - h / 2, w / 16 - 6, h) } }
const AD = makeAd({
  id: 'og-kfae15', sign: 'libra', dur: 12, times: { freeze: 1.6, flip: 3.0, intro: 3.04, box: 3.3, open: 4.15, tip: 4.27, after: 5.62 }, ending: 'cut', style: 'house', key: 'Am', seed: 3115,
  hook: 'Recorded that voice note | *nine times?*',
  hookSize: 98,
  caught: { x: 780, y: 760, r: 160, label: 'TAKE 9', arrow: 'bl' },
  product: 'TAKE|ONE™', sub: 'works exactly once', icon: 'spark', col: '#7a3cff', col2: '#ffd23a', burst: ['#7a3cff', '#ff2f8a'],
  tip: 'send take one. the “um”s are cute.',
  quote: 'the um made me CRY. TWICE.',
  fine: '*NO RE-RECORDINGS WERE HARMED IN THIS AD.',
  last: 'The *ums* are | the charming part.',
  before(x, t, S) {
    clapper(x, 780, 760, 0.5 * Math.abs(Math.sin(t * 9)), 'TAKE 9')
    for (let i = 0; i < 4; i++) label(x, ['TOO PERKY', 'TOO FLAT', 'TOO MUCH UM', 'TOO HONEST'][i], 620 + i * 25 + t * 30, 1530 - i * 65 - t * 20, { size: 30, col: RED, rot: 0.3 * i - 0.4, stroke: INK })
    drawPhone(x, 620, 1130, { w: 160, h: 270, rot: 0.25, screen: (c, W, H) => wave(c, W / 2, H / 2, W - 20, t, '#ff3b4e') })
    motion(x, t, 380, 1060, { r0: 160, r1: 220, n: 10 })
    S.hero(x, t, { x: 380, y: 1060, s: 290, mood: 'squint', rot: 0.1 * Math.sin(t * 10) })
  },
  after(x, t, S) {
    const u = S.u
    S.hero(x, t, { x: 290, y: 1060, s: 260, mood: u > 0.9 ? 'happy' : 'wide', look: [1, 0], hops: [S.T.after + 0.95] })
    drawPhone(x, 760, 1000, { w: 400, h: 480, rot: 0.04, t, screen: (c, W, H, tt) => {
      if (tt > S.T.after + 0.15) { R(c, '#4f7cff', W - 300, H - 330, 280, 80); wave(c, W - 160, H - 290, 240, Math.min(tt, S.T.after + 0.9), BONE) }
      chat(c, tt, W, H, [{ side: 'L', text: 'HAHA the “um… hi!” play it again', at: S.T.after + 0.85 }], { size: 30 })
    } })
    bubble(x, t, 300, 840, S.T.after + 0.15, S.T.after + 0.9, 'um… hi!', { size: 40 })
  },
  afterCues: [['pop', 0.15, 880, 0.04, 0.3], ['pop', 0.85, 1318.51, 0.05, 0.3]],
})
export const HOOK = 'Voice note, take 9. | *Still says um.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.95
export const DURATION = AD.DURATION, SCENES = AD.SCENES, CUES = AD.CUES, MUSIC = AD.music
void [star, prog, ease, YEL, MONO]
